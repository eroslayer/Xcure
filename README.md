# AnnualLottery（Windows 年会抽奖程序）

基于 **PySide6 + SQLite + pandas/openpyxl + PyInstaller + Inno Setup** 的桌面抽奖程序。

## 功能特性

- 支持导入 Excel/CSV 名单（至少包含 `name` 列，可选 `department` 列）
- 支持按奖项进行随机抽奖，且同一人员不会重复中奖
- 抽奖记录可导出为 Excel
- 运行数据保存到用户目录（非安装目录）
- 支持通过安装包安装、卸载、创建桌面/开始菜单快捷方式

## 项目结构

```text
.
├─ app.py
├─ src/annual_lottery/
│  ├─ __init__.py
│  ├─ main.py
│  └─ storage.py
├─ requirements.txt
├─ annual_lottery.spec
├─ installer.iss
├─ build.bat
└─ README.md
```

## 运行环境

- Windows 10/11 64位
- Python 3.10+
- Inno Setup 6

## 开发运行

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
set PYTHONPATH=src
python app.py
```

## 一键打包（生成可安装 EXE）

在项目根目录双击或命令行执行：

```bat
build.bat
```

执行成功后生成：

- `dist\AnnualLottery\AnnualLottery.exe`（PyInstaller 产物）
- `installer_output\AnnualLottery_Setup.exe`（安装包）

## 安装包能力

- 可自定义安装目录
- 可选创建桌面快捷方式
- 自动创建开始菜单快捷方式
- 支持标准卸载

## 数据持久化目录

为避免安装目录写入权限问题，程序数据默认保存到用户目录：

- 数据库：`%APPDATA%\AnnualLottery\lottery.db`
- 日志：`%APPDATA%\AnnualLottery\app.log`
- 导出文件：`%APPDATA%\AnnualLottery\exports\`

因此，程序关闭后再次打开，历史数据仍可恢复。

## 导入模板示例

Excel/CSV 示例列：

| name | department |
| --- | --- |
| 张三 | 研发部 |
| 李四 | 财务部 |

> `name` 为必填列，`department` 可选。
