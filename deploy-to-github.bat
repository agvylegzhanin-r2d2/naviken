@echo off
REM Deploy Nabi-ken to https://github.com/agvylegzhanin-r2d2/naviken
REM Double-click or run from cmd after installing Git.

cd /d "%~dp0"

where git >nul 2>&1
if errorlevel 1 (
    echo Git is not installed or not in PATH.
    echo Install from: https://git-scm.com/download/win
    pause
    exit /b 1
)

if not exist .git (
    git init
    git branch -M main
    git remote add origin https://github.com/agvylegzhanin-r2d2/naviken.git
)

git add .
git status
set /p msg="Commit message (Enter = Update site): "
if "%msg%"=="" set msg=Update site
git commit -m "%msg%"
git push -u origin main

echo.
echo Done. Site: https://agvylegzhanin-r2d2.github.io/naviken/
pause
