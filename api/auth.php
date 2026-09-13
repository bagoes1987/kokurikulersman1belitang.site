<?php
/**
 * FINCESTEM 2026 - Authentication API Endpoint
 * Handles login & session check for Siswa, Fasilitator, Koordinator, and Admin
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'login';

if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode HTTP harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $identifier = trim($input['identifier'] ?? '');
    $password   = trim($input['password'] ?? '');
    $role       = trim($input['role'] ?? '');

    if (!$identifier || !$password) {
        jsonResponse(false, 'Pengguna / NISN dan Kata Sandi wajib diisi!');
    }

    $pdo = getDB();

    // Query user by identifier (mendukung NISN 10 digit padded, atau NIS)
    $cleanId = preg_replace('/\D/', '', $identifier);
    $paddedId = (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) ? str_pad($cleanId, 10, '0', STR_PAD_LEFT) : $identifier;

    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `identifier` = :id OR `identifier` = :padded OR `nis` = :id LIMIT 1");
    $stmt->execute([':id' => $identifier, ':padded' => $paddedId]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(false, 'Akun atau NISN "' . htmlspecialchars($identifier) . '" tidak ditemukan dalam sistem Dapodik SMAN 1 Belitang!');
    }

    // Role check if specified
    if ($role && $user['role'] !== $role && $user['role'] !== 'admin') {
        jsonResponse(false, 'Akun ini terdaftar sebagai peran "' . $user['role'] . '", bukan "' . $role . '"!');
    }

    // Verify Password: Password siswa adalah nomor NIS (atau password_hash)
    $validPassword = false;
    if ($user['password_hash'] === $password) {
        $validPassword = true;
    } elseif (isset($user['nis']) && (string)$user['nis'] === $password) {
        $validPassword = true;
    } elseif (password_verify($password, $user['password_hash'])) {
        $validPassword = true;
    } elseif ($user['role'] === 'siswa' && $password === $user['identifier']) {
        $validPassword = true;
    }

    if (!$validPassword) {
        $msg = ($user['role'] === 'siswa') ? 'Kata sandi (NIS) tidak sesuai!' : 'Kata sandi tidak sesuai!';
        jsonResponse(false, $msg);
    }

    // Ambil info kelompok jika siswa
    $groupInfo = null;
    if ($user['role'] === 'siswa') {
        $gStmt = $pdo->prepare("
            SELECT g.*, gm.role_in_group 
            FROM `groups` g
            JOIN `group_members` gm ON g.id = gm.group_id
            WHERE gm.student_nisn = :nisn
            LIMIT 1
        ");
        $gStmt->execute([':nisn' => $user['identifier']]);
        $groupInfo = $gStmt->fetch();
    }

    // Siapkan data user publik yang aman (tanpa password_hash)
    $userData = [
        'id'               => (int)$user['id'],
        'identifier'       => $user['identifier'],
        'nisn'             => $user['identifier'],
        'nis'              => $user['nis'] ?? '',
        'name'             => $user['name'],
        'role'             => $user['role'],
        'grade_level'      => $user['grade_level'] ?? '',
        'class'            => $user['class_name'] ?? '',
        'gender'           => $user['gender'] ?? '',
        'photo_url'        => $user['photo_url'] ?? null,
        'zone'             => !empty($user['zone']) ? $user['zone'] : 'FINCESTEM OKU TIMUR',
        'coordinator_name' => !empty($user['coordinator_name']) ? $user['coordinator_name'] : 'Drs. H. Koordinator FINCESTEM',
        'facilitator_name' => !empty($user['facilitator_name']) ? $user['facilitator_name'] : 'Tim Fasilitator SMAN 1 Belitang',
        'agama'            => $user['agama'] ?? '',
        'birth_info'       => $user['birth_info'] ?? '',
        'address'          => $user['address'] ?? '',
        'parent_father'    => $user['parent_father'] ?? '',
        'parent_mother'    => $user['parent_mother'] ?? '',
        'parent_job'       => $user['parent_job'] ?? '',
        'school_origin'    => $user['school_origin'] ?? '',
        'phone'            => $user['phone'] ?? '',
        'assignment'       => $user['assignment'] ?? '',
        'group'            => $groupInfo ? $groupInfo['name'] : 'Belum Terdaftar Kelompok',
        'groupId'          => $groupInfo ? (int)$groupInfo['id'] : null,
        'groupRole'        => $groupInfo ? $groupInfo['role_in_group'] : 'Anggota',
        'routeStatus'      => $groupInfo ? $groupInfo['route_status'] : null
    ];

    jsonResponse(true, 'Login berhasil! Selamat datang, ' . $user['name'], [
        'user'  => $userData,
        'token' => bin2hex(random_bytes(16))
    ]);
}

jsonResponse(false, 'Aksi tidak dikenali', null, 400);
