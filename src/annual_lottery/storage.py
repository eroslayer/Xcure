from __future__ import annotations

import logging
import os
import sqlite3
from pathlib import Path
from typing import Iterable

APP_NAME = "AnnualLottery"
DB_FILE_NAME = "lottery.db"
LOG_FILE_NAME = "app.log"


def get_user_data_dir() -> Path:
    """Return a writable per-user directory for runtime data."""
    if os.name == "nt":
        base = os.getenv("APPDATA") or str(Path.home() / "AppData" / "Roaming")
        path = Path(base) / APP_NAME
    else:
        path = Path.home() / f".{APP_NAME.lower()}"
    path.mkdir(parents=True, exist_ok=True)
    return path


def get_export_dir() -> Path:
    export_dir = get_user_data_dir() / "exports"
    export_dir.mkdir(parents=True, exist_ok=True)
    return export_dir


def get_database_path() -> Path:
    return get_user_data_dir() / DB_FILE_NAME


def get_log_path() -> Path:
    return get_user_data_dir() / LOG_FILE_NAME


def configure_logging() -> None:
    log_path = get_log_path()
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_path, encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )


class LotteryRepository:
    def __init__(self, db_path: Path | None = None):
        self.db_path = db_path or get_database_path()
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self) -> None:
        self.conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS participants (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                department TEXT,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS draws (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                participant_id INTEGER NOT NULL,
                prize TEXT NOT NULL,
                drawn_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(participant_id) REFERENCES participants(id)
            );
            """
        )
        self.conn.commit()

    def clear_participants(self) -> None:
        self.conn.execute("DELETE FROM participants")
        self.conn.execute("DELETE FROM draws")
        self.conn.commit()

    def add_participants(self, rows: Iterable[tuple[str, str]]) -> int:
        inserted = 0
        for name, department in rows:
            name = name.strip()
            if not name:
                continue
            try:
                self.conn.execute(
                    "INSERT INTO participants(name, department) VALUES (?, ?)",
                    (name, department.strip()),
                )
                inserted += 1
            except sqlite3.IntegrityError:
                continue
        self.conn.commit()
        return inserted

    def list_participants(self, include_drawn: bool = True) -> list[sqlite3.Row]:
        if include_drawn:
            sql = (
                "SELECT p.id, p.name, COALESCE(p.department, '') AS department, "
                "d.id AS draw_id, d.prize, d.drawn_at "
                "FROM participants p "
                "LEFT JOIN draws d ON d.participant_id = p.id "
                "ORDER BY p.id"
            )
            return list(self.conn.execute(sql))

        sql = (
            "SELECT p.id, p.name, COALESCE(p.department, '') AS department "
            "FROM participants p "
            "LEFT JOIN draws d ON d.participant_id = p.id "
            "WHERE d.id IS NULL "
            "ORDER BY p.id"
        )
        return list(self.conn.execute(sql))

    def record_draw(self, participant_id: int, prize: str) -> None:
        self.conn.execute(
            "INSERT INTO draws(participant_id, prize) VALUES (?, ?)",
            (participant_id, prize),
        )
        self.conn.commit()

    def list_draw_history(self) -> list[sqlite3.Row]:
        sql = (
            "SELECT d.id, p.name, COALESCE(p.department, '') AS department, d.prize, d.drawn_at "
            "FROM draws d "
            "JOIN participants p ON p.id = d.participant_id "
            "ORDER BY d.id DESC"
        )
        return list(self.conn.execute(sql))

    def close(self) -> None:
        self.conn.close()
