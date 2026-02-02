# Deploy Nabi-ken to GitHub (https://github.com/agvylegzhanin-r2d2/naviken)
# Run this script from the project folder after installing Git.

$ErrorActionPreference = "Stop"
$repo = "https://github.com/agvylegzhanin-r2d2/naviken.git"

Write-Host "Deploying to GitHub: $repo" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Only init if no .git
if (-not (Test-Path .git)) {
    git init
    git branch -M main
}

git add .
git status

$msg = Read-Host "Commit message (or press Enter for 'Update site')"
if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "Update site" }

git commit -m $msg

# Add remote only if not already added
$rem = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin $repo
}

# Push (use main; create upstream if needed)
git push -u origin main

Write-Host "Done. Your site will be at: https://agvylegzhanin-r2d2.github.io/naviken/" -ForegroundColor Green
