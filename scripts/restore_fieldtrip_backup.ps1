# =====================================================================
# FINCESTEM 2026 - EMERGENCY RESTORE SCRIPT FIELD TRIP DAY 1-7
# Jalankan skrip ini jika sewaktu-waktu ingin memulihkan seluruh kodingan 
# ke kondisi Field Trip Day 1-7 yang sudah 100% stabil & terverifikasi.
# =====================================================================

$ErrorActionPreference = "Stop"

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  MEMULIHKAN DARI CADANGAN FIELD TRIP DAY 1 - 7 STABIL  " -ForegroundColor Yellow
Write-Host "========================================================`n" -ForegroundColor Cyan

$snapshotDir = Join-Path $PSScriptRoot "..\_snapshots\fieldtrip_day1_7_stable_20261028"
$targetDir = Join-Path $PSScriptRoot ".."

if (-not (Test-Path $snapshotDir)) {
    Write-Host "ERROR: Folder snapshot tidak ditemukan di: $snapshotDir" -ForegroundColor Red
    exit 1
}

Write-Host "1. Menyalin berkas siswa, guru, js, dan api dari snapshot..." -ForegroundColor White
Copy-Item -Recurse -Force (Join-Path $snapshotDir "siswa") $targetDir
Copy-Item -Recurse -Force (Join-Path $snapshotDir "guru") $targetDir
Copy-Item -Recurse -Force (Join-Path $snapshotDir "js") $targetDir
Copy-Item -Recurse -Force (Join-Path $snapshotDir "api") $targetDir

if (Test-Path (Join-Path $snapshotDir "admin_index.html")) {
    Copy-Item -Force (Join-Path $snapshotDir "admin_index.html") (Join-Path $targetDir "admin\index.html")
}

Write-Host "2. Menjalankan verifikasi integritas sistem..." -ForegroundColor White
node (Join-Path $PSScriptRoot "verify_fieldtrip_guard.js")

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "🎉 SUKSES! Seluruh sistem telah dipulihkan ke versi stabil." -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green
