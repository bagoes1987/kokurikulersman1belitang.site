<?php
/**
 * FINCESTEM 2026 - Configuration File
 * Konfigurasi Koneksi Database MySQL & Folder Penyimpanan cPanel
 */

// Aktifkan laporan error selama pengembangan (bisa di-false saat live produksi)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Set header JSON & CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------------------------------------------------------------------
// 1. KREDENSIAL DATABASE MYSQL CPANEL
// Silakan sesuaikan dengan nama database & user yang Anda buat di cPanel
// ----------------------------------------------------------------------
define('DB_HOST', 'localhost');
define('DB_NAME', 'n1667321_fincestem');
define('DB_USER', 'n1667321_admin_fincestem');
define('DB_PASS', 'Fincestem2026!'); // Pastikan ini sesuai password yang Anda masukkan tadi
define('DB_CHARSET', 'utf8mb4');

// ----------------------------------------------------------------------
// 2. KONFIGURASI PENYIMPANAN FILE (FOTO, VIDEO, MATERI)
// ----------------------------------------------------------------------
define('BASE_DIR', dirname(__DIR__));
define('UPLOAD_DIR', BASE_DIR . DIRECTORY_SEPARATOR . 'uploads');
define('UPLOAD_URL', '../uploads/');

// Batas ukuran file (sesuaikan juga di cPanel > Select PHP Version > Options)
define('MAX_PHOTO_SIZE', 10 * 1024 * 1024);   // Maksimal 10 MB per Foto
define('MAX_VIDEO_SIZE', 100 * 1024 * 1024);  // Maksimal 100 MB per Video
define('MAX_DOC_SIZE', 25 * 1024 * 1024);     // Maksimal 25 MB per Dokumen PDF

// Pastikan subfolder upload ada
$subdirs = ['foto', 'video', 'materi', 'tugas'];
foreach ($subdirs as $dir) {
    $path = UPLOAD_DIR . DIRECTORY_SEPARATOR . $dir;
    if (!file_exists($path)) {
        @mkdir($path, 0755, true);
    }
}
