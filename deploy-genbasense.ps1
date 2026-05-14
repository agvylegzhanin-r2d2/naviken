# Deploy GenbaSense as a standalone GitHub Pages site
# Repo: https://github.com/agvylegzhanin-r2d2/genbasense
# Live:  https://agvylegzhanin-r2d2.github.io/genbasense/

$ErrorActionPreference = "Stop"
$repo = "https://github.com/agvylegzhanin-r2d2/genbasense.git"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$build = Join-Path $env:TEMP "genbasense-site"

$imgs = @(
    "imgs/logo_nabi_ken.png",
    "imgs/crane_UWB_expl.png",
    "imgs/crane_cabin_view.png",
    "imgs/mvp_1.jpg",
    "imgs/constr sites.png",
    "imgs/warehouses.png",
    "imgs/logistics centers.png",
    "imgs/heavy indusrt.png",
    "imgs/Alex .png",
    "imgs/Sergey.png",
    "imgs/Chris.png",
    "imgs/oist_inno.png",
    "imgs/genbasense_images/logo_genbasense_2.0.png",
    "imgs/genbasense_images/top_picture_genba.png",
    "imgs/genbasense_images/problem.png",
    "imgs/genbasense_images/forklift case.png",
    "imgs/genbasense_images/crane case.png",
    "imgs/genbasense_images/buldozer case.png",
    "imgs/genbasense_images/hot zones map.png"
)

Write-Host "Building GenbaSense site in $build" -ForegroundColor Cyan
if (Test-Path $build) { Remove-Item $build -Recurse -Force }
New-Item -ItemType Directory -Path $build | Out-Null
New-Item -ItemType Directory -Path (Join-Path $build "imgs/genbasense_images") -Force | Out-Null

Copy-Item (Join-Path $root "genbasense-i18n.js") $build
foreach ($img in $imgs) {
    $src = Join-Path $root $img
    $dst = Join-Path $build $img
    $dstDir = Split-Path $dst -Parent
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    Copy-Item $src $dst
}

$index = Get-Content (Join-Path $root "genbasense.html") -Raw -Encoding UTF8
$index = $index -replace 'genbasense-contact\.html', 'contact.html'
Set-Content (Join-Path $build "index.html") $index -Encoding UTF8 -NoNewline

$contact = Get-Content (Join-Path $root "genbasense-contact.html") -Raw -Encoding UTF8
$contact = $contact -replace 'genbasense\.html', 'index.html'
Set-Content (Join-Path $build "contact.html") $contact -Encoding UTF8 -NoNewline

@"
# GenbaSense

Standalone site for GenbaSense — real-time collision prevention for industrial operations.

**Live:** https://agvylegzhanin-r2d2.github.io/genbasense/
"@ | Set-Content (Join-Path $build "README.md") -Encoding UTF8

Push-Location $build
try {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "ERROR: Git is not installed." -ForegroundColor Red
        exit 1
    }

    git init
    git branch -M main
    git add .
    git commit -m "Deploy GenbaSense standalone site"

    git remote remove origin 2>$null | Out-Null
    git remote add origin $repo

    git push -u origin main --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "Push failed. If the repo does not exist yet:" -ForegroundColor Yellow
        Write-Host "  1. Open https://github.com/new" -ForegroundColor Yellow
        Write-Host "  2. Repository name: genbasense (Public, no README)" -ForegroundColor Yellow
        Write-Host "  3. Run this script again" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "Done: https://agvylegzhanin-r2d2.github.io/genbasense/" -ForegroundColor Green
}
finally {
    Pop-Location
}
