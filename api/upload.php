<?php
/**
 * FINCESTEM 2026 - Secure File & Media Upload API
 * Mendukung unggah Foto Kegiatan, Video Tugas Lapangan, Modul Materi PDF
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Metode harus POST', null, 405);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['file']['error'] ?? 'Tidak ada file';
    jsonResponse(false, 'Gagal mengunggah file. Kode error: ' . $errCode);
}

$category = $_POST['category'] ?? 'tugas'; // foto, video, materi, tugas
$validCategories = ['foto', 'video', 'materi', 'tugas'];
if (!in_array($category, $validCategories)) {
    $category = 'tugas';
}

$file = $_FILES['file'];
$fileName = $file['name'];
$fileSize = $file['size'];
$tmpPath  = $file['tmp_name'];

// Deteksi ekstensi & mime type
$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

// Daftar ekstensi yang diizinkan
$allowedPhoto = ['jpg', 'jpeg', 'png', 'webp', 'heic'];
$allowedVideo = ['mp4', 'mov', 'webm', 'mkv', '3gp'];
$allowedDoc   = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

$targetFolder = 'tugas';
$maxSize = MAX_DOC_SIZE;

if (in_array($ext, $allowedPhoto)) {
    $targetFolder = 'foto';
    $maxSize = MAX_PHOTO_SIZE;
} elseif (in_array($ext, $allowedVideo)) {
    $targetFolder = 'video';
    $maxSize = MAX_VIDEO_SIZE;
} elseif (in_array($ext, $allowedDoc)) {
    $targetFolder = ($category === 'materi') ? 'materi' : 'tugas';
    $maxSize = MAX_DOC_SIZE;
} else {
    jsonResponse(false, 'Tipe file ".' . htmlspecialchars($ext) . '" tidak diizinkan! Harap unggah format gambar, video, atau PDF yang valid.');
}

// Cek ukuran file
if ($fileSize > $maxSize) {
    $maxMB = round($maxSize / (1024 * 1024));
    jsonResponse(false, 'Ukuran file melebihi batas maksimal (' . $maxMB . ' MB)!');
}

// Buat nama file unik dan aman
$safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
$destDir = UPLOAD_DIR . DIRECTORY_SEPARATOR . $targetFolder;

if (!file_exists($destDir)) {
    @mkdir($destDir, 0755, true);
}

$destPath = $destDir . DIRECTORY_SEPARATOR . $safeName;

if (!move_uploaded_file($tmpPath, $destPath)) {
    jsonResponse(false, 'Gagal memindahkan file ke server.');
}

// Return relative URL untuk diakses web
$publicUrl = 'uploads/' . $targetFolder . '/' . $safeName;

jsonResponse(true, 'File berhasil diunggah!', [
    'original_name' => $fileName,
    'file_url'      => $publicUrl,
    'file_type'     => $targetFolder,
    'file_size'     => $fileSize
]);
