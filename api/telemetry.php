<?php
/**
 * FINCESTEM 2026 - Central Error & Diagnostic Telemetry Logger
 * Automatically logs mobile JS errors & network issues from 1,500 students
 */
require_once __DIR__ . '/db.php';

$input = getJsonInput();
$action = $input['action'] ?? ($_GET['action'] ?? 'log');

// Pastikan tabel fincestem_error_logs ada
try {
    $pdo = getDB();
    $pdo->exec("CREATE TABLE IF NOT EXISTS fincestem_error_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_identifier VARCHAR(100) NULL,
        role VARCHAR(50) DEFAULT 'siswa',
        page VARCHAR(255) NULL,
        error_message TEXT NOT NULL,
        error_stack TEXT NULL,
        user_agent VARCHAR(500) NULL,
        device_info VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
} catch (Exception $e) {
    // Fail silently so student experience is never disrupted
}

if ($action === 'log') {
    $msg = trim($input['error_message'] ?? ($input['msg'] ?? ''));
    if (!$msg) {
        jsonResponse(true, 'Empty error ignored');
    }

    $identifier = substr(trim($input['user_identifier'] ?? ($input['nisn'] ?? '')), 0, 100);
    $role = substr(trim($input['role'] ?? 'siswa'), 0, 50);
    $page = substr(trim($input['page'] ?? ($input['url'] ?? '')), 0, 255);
    $stack = substr(trim($input['error_stack'] ?? ($input['stack'] ?? '')), 0, 2000);
    $device = substr(trim($input['device_info'] ?? ''), 0, 255);
    $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);

    try {
        $stmt = $pdo->prepare("INSERT INTO fincestem_error_logs (user_identifier, role, page, error_message, error_stack, user_agent, device_info) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$identifier, $role, $page, $msg, $stack, $userAgent, $device]);
        jsonResponse(true, 'Error logged successfully');
    } catch (Exception $e) {
        jsonResponse(false, $e->getMessage());
    }
} elseif ($action === 'list') {
    // Khusus Admin untuk melihat log kendala siswa
    try {
        $stmt = $pdo->query("SELECT * FROM fincestem_error_logs ORDER BY id DESC LIMIT 50");
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse(true, 'Logs retrieved', $logs);
    } catch (Exception $e) {
        jsonResponse(false, $e->getMessage(), []);
    }
} elseif ($action === 'clear') {
    // Khusus Admin untuk membersihkan log lama
    try {
        $pdo->exec("TRUNCATE TABLE fincestem_error_logs");
        jsonResponse(true, 'Semua log kendala berhasil dibersihkan');
    } catch (Exception $e) {
        jsonResponse(false, $e->getMessage());
    }
} else {
    jsonResponse(false, 'Invalid action');
}
