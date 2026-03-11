from __future__ import annotations

import logging
import random
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd
from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QApplication,
    QFileDialog,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QMainWindow,
    QMessageBox,
    QPushButton,
    QTableWidget,
    QTableWidgetItem,
    QVBoxLayout,
    QWidget,
)

from annual_lottery.storage import LotteryRepository, configure_logging, get_export_dir, get_user_data_dir


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.repo = LotteryRepository()
        self.setWindowTitle("年会抽奖程序")
        self.resize(960, 640)

        self.file_label = QLabel("未导入名单")
        self.prize_input = QLineEdit()
        self.prize_input.setPlaceholderText("请输入奖项名称，例如：一等奖")

        import_btn = QPushButton("导入名单（Excel/CSV）")
        import_btn.clicked.connect(self.import_participants)

        draw_btn = QPushButton("开始抽奖")
        draw_btn.clicked.connect(self.draw_winner)

        export_btn = QPushButton("导出抽奖记录")
        export_btn.clicked.connect(self.export_history)

        reset_btn = QPushButton("清空名单与记录")
        reset_btn.clicked.connect(self.reset_all)

        self.result_label = QLabel("点击“开始抽奖”后显示中奖结果")
        self.result_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.result_label.setStyleSheet("font-size: 18px; font-weight: bold; color: #0a4f9c;")

        self.table = QTableWidget(0, 4)
        self.table.setHorizontalHeaderLabels(["姓名", "部门", "奖项", "抽奖时间"])
        self.table.horizontalHeader().setStretchLastSection(True)

        top_layout = QHBoxLayout()
        top_layout.addWidget(import_btn)
        top_layout.addWidget(self.file_label, stretch=2)

        prize_layout = QHBoxLayout()
        prize_layout.addWidget(QLabel("奖项："))
        prize_layout.addWidget(self.prize_input)
        prize_layout.addWidget(draw_btn)
        prize_layout.addWidget(export_btn)
        prize_layout.addWidget(reset_btn)

        layout = QVBoxLayout()
        layout.addLayout(top_layout)
        layout.addLayout(prize_layout)
        layout.addWidget(self.result_label)
        layout.addWidget(self.table)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        self.refresh_table()
        logging.info("Application started. user_data_dir=%s", get_user_data_dir())

    def import_participants(self) -> None:
        path, _ = QFileDialog.getOpenFileName(
            self,
            "选择名单文件",
            "",
            "Data Files (*.xlsx *.xls *.csv)",
        )
        if not path:
            return

        try:
            source = Path(path)
            if source.suffix.lower() == ".csv":
                df = pd.read_csv(source)
            else:
                df = pd.read_excel(source)

            if "name" not in [col.lower() for col in df.columns]:
                raise ValueError("文件必须包含 name 列（可额外包含 department 列）")

            normalized = {c.lower(): c for c in df.columns}
            name_col = normalized["name"]
            dept_col = normalized.get("department")

            rows: list[tuple[str, str]] = []
            for _, row in df.iterrows():
                name = str(row[name_col]).strip()
                if not name or name.lower() == "nan":
                    continue
                department = ""
                if dept_col:
                    department = str(row[dept_col]).strip()
                    if department.lower() == "nan":
                        department = ""
                rows.append((name, department))

            inserted = self.repo.add_participants(rows)
            self.file_label.setText(f"已导入：{source.name}（新增 {inserted} 人）")
            self.refresh_table()
            QMessageBox.information(self, "导入成功", f"导入完成，新增 {inserted} 人。")
            logging.info("Imported %s participants from %s", inserted, source)
        except Exception as exc:  # noqa: BLE001
            logging.exception("Import failed")
            QMessageBox.critical(self, "导入失败", str(exc))

    def draw_winner(self) -> None:
        prize = self.prize_input.text().strip() or "幸运奖"
        available = self.repo.list_participants(include_drawn=False)
        if not available:
            QMessageBox.warning(self, "提示", "没有可抽取人员，请先导入名单或已全部抽完。")
            return

        winner = random.choice(available)
        self.repo.record_draw(participant_id=winner["id"], prize=prize)
        message = f"恭喜 {winner['name']}（{winner['department']}）获得 {prize}！"
        self.result_label.setText(message)
        self.refresh_table()
        logging.info("Winner drawn: %s prize=%s", winner["name"], prize)

    def export_history(self) -> None:
        history = self.repo.list_draw_history()
        if not history:
            QMessageBox.information(self, "提示", "暂无抽奖记录可导出。")
            return

        export_dir = get_export_dir()
        filename = f"draw_history_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        target = export_dir / filename

        df = pd.DataFrame(
            [
                {
                    "姓名": r["name"],
                    "部门": r["department"],
                    "奖项": r["prize"],
                    "抽奖时间": r["drawn_at"],
                }
                for r in history
            ]
        )
        df.to_excel(target, index=False)
        QMessageBox.information(self, "导出成功", f"已导出到：\n{target}")
        logging.info("History exported to %s", target)

    def reset_all(self) -> None:
        confirmed = QMessageBox.question(
            self,
            "确认清空",
            "将清空所有参与者和抽奖记录，是否继续？",
        )
        if confirmed != QMessageBox.StandardButton.Yes:
            return

        self.repo.clear_participants()
        self.result_label.setText("数据已清空")
        self.file_label.setText("未导入名单")
        self.refresh_table()
        logging.info("All participants and draws cleared")

    def refresh_table(self) -> None:
        rows = self.repo.list_participants(include_drawn=True)
        self.table.setRowCount(len(rows))
        for i, row in enumerate(rows):
            self.table.setItem(i, 0, QTableWidgetItem(row["name"]))
            self.table.setItem(i, 1, QTableWidgetItem(row["department"]))
            self.table.setItem(i, 2, QTableWidgetItem(row["prize"] or "-"))
            self.table.setItem(i, 3, QTableWidgetItem(row["drawn_at"] or "-"))

    def closeEvent(self, event) -> None:  # noqa: N802
        self.repo.close()
        super().closeEvent(event)


def main() -> int:
    configure_logging()
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    return app.exec()


if __name__ == "__main__":
    raise SystemExit(main())
