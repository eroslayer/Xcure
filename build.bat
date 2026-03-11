@echo off
setlocal enabledelayedexpansion

REM 一键打包脚本（需在 Windows 下执行）

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] 未找到 python，请先安装 Python 3.10+ 并加入 PATH。
  exit /b 1
)

python -m pip install --upgrade pip
if errorlevel 1 exit /b 1

python -m pip install -r requirements.txt
if errorlevel 1 exit /b 1

if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist installer_output rmdir /s /q installer_output

python -m PyInstaller --clean annual_lottery.spec
if errorlevel 1 (
  echo [ERROR] PyInstaller 打包失败。
  exit /b 1
)

set ISCC_PATH=%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe
if not exist "%ISCC_PATH%" set ISCC_PATH=%ProgramFiles%\Inno Setup 6\ISCC.exe
if not exist "%ISCC_PATH%" (
  echo [ERROR] 未找到 Inno Setup 编译器 ISCC.exe，请安装 Inno Setup 6。
  exit /b 1
)

"%ISCC_PATH%" installer.iss
if errorlevel 1 (
  echo [ERROR] Inno Setup 打包失败。
  exit /b 1
)

echo [OK] 打包完成：installer_output\AnnualLottery_Setup.exe
endlocal
