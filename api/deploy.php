<?php
/**
 * FINCESTEM 2026 - GitHub Auto-Deployment & Synchronization Engine
 * Endpoint untuk auto-deployment via GitHub Webhook atau 1-Click Update dari Admin Portal
 */
require_once __DIR__ . '/db.php';

// Konfigurasi Token Rahasia
define('DEPLOY_SECRET', 'fincestem_deploy_secret_2026');
define('REPO_OWNER', 'bagoes1987');
define('REPO_NAME', 'kokurikulersman1belitang.site');
define('BRANCH', 'main');

// Ambil parameter & header
$action = $_GET['action'] ?? 'deploy';
$secret = $_GET['secret'] ?? '';

// Verifikasi rahasia (via query param, HTTP header, atau body)
$headerSecret = $_SERVER['HTTP_X_DEPLOY_SECRET'] ?? $_SERVER['HTTP_X_GIT_SECRET'] ?? '';
$isAuthorized = ($secret === DEPLOY_SECRET || $headerSecret === DEPLOY_SECRET);

// GitHub Webhook Signature Verification (jika ada X-Hub-Signature-256)
$githubSignature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
if (!empty($githubSignature)) {
    $payload = file_get_contents('php://input');
    $expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, DEPLOY_SECRET);
    if (hash_equals($expectedSignature, $githubSignature)) {
        $isAuthorized = true;
    }
}

// Jika request berasal dari portal admin dengan token admin aktif
if (!$isAuthorized && isset($_GET['from_admin'])) {
    $adminToken = $_GET['from_admin'];
    if ($adminToken === 'fincestem_admin_session_auth') {
        $isAuthorized = true;
    }
}

if (!$isAuthorized) {
    jsonResponse(false, 'Akses ditolak! Token otentikasi deployment tidak valid.', null, 403);
}

// -------------------------------------------------------------
// 1. ACTION: CHECK STATUS (Cek Commit Terbaru di GitHub)
// -------------------------------------------------------------
if ($action === 'check') {
    $url = "https://api.github.com/repos/" . REPO_OWNER . "/" . REPO_NAME . "/commits/" . BRANCH;
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => [
                'User-Agent: FINCESTEM-Deployer/1.0',
                'Accept: application/vnd.github.v3+json'
            ],
            'timeout' => 8
        ]
    ];
    $ctx = stream_context_create($opts);
    $res = @file_get_contents($url, false, $ctx);
    if ($res) {
        $data = json_decode($res, true);
        if ($data && isset($data['sha'])) {
            jsonResponse(true, 'Informasi rilis GitHub berhasil diambil', [
                'sha'       => substr($data['sha'], 0, 7),
                'full_sha'  => $data['sha'],
                'message'   => $data['commit']['message'] ?? '',
                'author'    => $data['commit']['author']['name'] ?? '',
                'date'      => $data['commit']['author']['date'] ?? '',
                'repo'      => REPO_OWNER . '/' . REPO_NAME,
                'branch'    => BRANCH
            ]);
        }
    }
    jsonResponse(false, 'Gagal terhubung ke GitHub API. Periksa koneksi server atau batas kuota API.', null, 500);
}

// -------------------------------------------------------------
// 2. ACTION: DEPLOY (Tarik Pembaruan dan Pasang Otomatis)
// -------------------------------------------------------------
if ($action === 'deploy') {
    $baseDir = realpath(__DIR__ . '/..');
    $logs = [];

    // METODE 1: Coba jalankan Git CLI bawaan jika tersedia di server
    $gitSuccess = false;
    if (function_exists('exec') && is_dir($baseDir . '/.git')) {
        $output = [];
        $returnCode = 0;
        @exec("cd " . escapeshellarg($baseDir) . " && git fetch origin " . BRANCH . " 2>&1 && git reset --hard origin/" . BRANCH . " 2>&1", $output, $returnCode);
        if ($returnCode === 0) {
            $gitSuccess = true;
            $logs[] = "Git CLI berhasil menarik branch " . BRANCH;
            $logs = array_merge($logs, $output);
        } else {
            $logs[] = "Git CLI gagal / tidak diizinkan di hosting (return code: $returnCode). Mengalihkan ke Metode 2 (GitHub Archive Pull)...";
        }
    }

    // METODE 2: Unduh ZIP arsip dari GitHub dan ekstrak langsung (Bekerja di SEMUA cPanel Shared Hosting)
    if (!$gitSuccess) {
        if (!class_exists('ZipArchive')) {
            jsonResponse(false, 'Modul PHP ZipArchive tidak aktif di hosting. Harap aktifkan di cPanel -> Select PHP Version -> Extensions.', ['logs' => $logs], 500);
        }

        $archiveUrl = "https://github.com/" . REPO_OWNER . "/" . REPO_NAME . "/archive/refs/heads/" . BRANCH . ".zip";
        $tempZip = $baseDir . '/temp_update_' . time() . '.zip';

        // Unduh berkas ZIP via cURL atau file_get_contents
        $downloadSuccess = false;
        if (function_exists('curl_init')) {
            $ch = curl_init($archiveUrl);
            $fp = fopen($tempZip, 'wb');
            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'FINCESTEM-Deployer/1.0');
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            fclose($fp);
            if ($httpCode === 200 && filesize($tempZip) > 1000) {
                $downloadSuccess = true;
                $logs[] = "Berhasil mengunduh paket arsip dari GitHub (" . round(filesize($tempZip) / 1024) . " KB)";
            }
        }

        if (!$downloadSuccess) {
            $ctx = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => "User-Agent: FINCESTEM-Deployer/1.0\r\n",
                    'follow_location' => 1,
                    'timeout' => 60
                ]
            ]);
            $zipContent = @file_get_contents($archiveUrl, false, $ctx);
            if ($zipContent && strlen($zipContent) > 1000) {
                file_put_contents($tempZip, $zipContent);
                $downloadSuccess = true;
                $logs[] = "Berhasil mengunduh paket arsip via stream (" . round(strlen($zipContent) / 1024) . " KB)";
            }
        }

        if (!$downloadSuccess || !file_exists($tempZip)) {
            @unlink($tempZip);
            jsonResponse(false, 'Gagal mengunduh arsip kode dari GitHub. Periksa koneksi internet server hosting.', ['logs' => $logs], 500);
        }

        // Buka dan ekstrak ZIP
        $zip = new ZipArchive();
        if ($zip->open($tempZip) === true) {
            // ZIP dari GitHub memiliki root folder di dalamnya, misal: "kokurikulersman1belitang.site-main/"
            $rootInZip = $zip->getNameIndex(0);
            $prefix = rtrim($rootInZip, '/') . '/';

            $extractedFiles = 0;
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $entryName = $zip->getNameIndex($i);
                
                // Lewati berkas di luar prefix
                if (strpos($entryName, $prefix) !== 0) continue;

                // Ambil path relatif
                $relPath = substr($entryName, strlen($prefix));
                if ($relPath === '' || $relPath === false) continue;

                // PROTEKSI PENTING: JANGAN PERNAH menimpa data upload foto atau config database aktif
                if (strpos($relPath, 'uploads/') === 0) continue;
                if ($relPath === 'api/config.php' && file_exists($baseDir . '/api/config.php')) continue;
                if (strpos($relPath, '.git') === 0) continue;

                $targetPath = $baseDir . '/' . $relPath;

                // Jika folder
                if (substr($entryName, -1) === '/') {
                    if (!is_dir($targetPath)) {
                        @mkdir($targetPath, 0755, true);
                    }
                    continue;
                }

                // Pastikan direktori induk ada
                $targetDir = dirname($targetPath);
                if (!is_dir($targetDir)) {
                    @mkdir($targetDir, 0755, true);
                }

                // Tulis berkas
                $stream = $zip->getStream($entryName);
                if ($stream) {
                    $content = stream_get_contents($stream);
                    fclose($stream);
                    if (@file_put_contents($targetPath, $content) !== false) {
                        $extractedFiles++;
                    }
                }
            }
            $zip->close();
            @unlink($tempZip);
            $logs[] = "Berhasil memperbarui $extractedFiles berkas sistem tanpa mengganggu data uploads/ atau config.php.";
        } else {
            @unlink($tempZip);
            jsonResponse(false, 'Gagal membuka berkas arsip ZIP.', ['logs' => $logs], 500);
        }
    }

    // Catat riwayat log deployment
    $deployLogFile = __DIR__ . '/deploy_history.log';
    $logEntry = "[" . date('Y-m-d H:i:s') . "] DEPLOY SUCCESS | IP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . " | " . implode('; ', $logs) . "\n";
    @file_put_contents($deployLogFile, $logEntry, FILE_APPEND);

    jsonResponse(true, 'Sistem FINCESTEM berhasil disinkronkan dan diperbarui dari GitHub!', [
        'logs'       => $logs,
        'timestamp'  => date('Y-m-d H:i:s'),
        'branch'     => BRANCH
    ]);
}

jsonResponse(false, 'Aksi tidak dikenal', null, 400);
