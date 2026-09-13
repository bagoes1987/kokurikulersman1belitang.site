<?php
/**
 * FINCESTEM 2026 - Database Connector (PDO)
 */
require_once __DIR__ . '/config.php';

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            jsonResponse(false, 'Gagal terhubung ke basis data MySQL: ' . $e->getMessage(), null, 500);
            exit;
        }
    }
    return $pdo;
}

/**
 * Standard JSON Response Helper
 */
function jsonResponse($success, $message = '', $data = null, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success'   => (bool)$success,
        'message'   => $message,
        'data'      => $data,
        'timestamp' => date('c')
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Helper to get JSON input body
 */
function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
