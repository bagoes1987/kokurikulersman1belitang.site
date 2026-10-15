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

    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `identifier` = :id OR `identifier` = :padded OR `nis` = :nis LIMIT 1");
    $stmt->execute([':id' => $identifier, ':padded' => $paddedId, ':nis' => $identifier]);
    $user = $stmt->fetch();

    // Fallback: jika tidak ditemukan di tabel users, cek tabel teachers
    if (!$user && ($role === 'fasilitator' || $role === 'koordinator' || $role === 'guru' || empty($role))) {
        try {
            $tStmt = $pdo->prepare("SELECT * FROM `teachers` WHERE `username` = :id OR `nip` = :id OR `kode_guru` = :id LIMIT 1");
            $tStmt->execute([':id' => $identifier]);
            $tRow = $tStmt->fetch();
            if ($tRow) {
                $user = [
                    'id'            => (int)$tRow['id'],
                    'identifier'    => $tRow['username'],
                    'nis'           => '',
                    'name'          => $tRow['nama_guru'],
                    'role'          => $role ?: 'guru',
                    'password_hash' => $tRow['password'],
                    'assignment'    => $tRow['tugas_tambahan'] !== '-' ? $tRow['tugas_tambahan'] : "Guru {$tRow['mata_pelajaran']} ({$tRow['kode_guru']})",
                    'zone'          => 'FINCESTEM OKU TIMUR'
                ];
            }
        } catch (Exception $et) {}
    }

    if (!$user) {
        jsonResponse(false, 'Akun atau NISN "' . htmlspecialchars($identifier) . '" tidak ditemukan dalam sistem Dapodik SMAN 1 Belitang!');
    }

    // Role check if specified
    $isTeacherRole = in_array($role, ['fasilitator', 'koordinator', 'guru']);
    $userIsTeacher = in_array($user['role'], ['fasilitator', 'koordinator', 'guru']);
    if ($role && $user['role'] !== $role && $user['role'] !== 'admin' && !($isTeacherRole && $userIsTeacher)) {
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

    // Ambil info kelompok & penugasan koordinator/fasilitator jika siswa
    $groupInfo = null;
    $coordName = !empty($user['coordinator_name']) ? $user['coordinator_name'] : '';
    $fasilName = !empty($user['facilitator_name']) ? $user['facilitator_name'] : '';

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

        // Cari koordinator dari tabel class_coordinators berdasarkan rombel siswa (cocokkan format 'KELAS X.1' maupun 'X.1')
        if (!empty($user['class_name'])) {
            $rawCls = trim($user['class_name']);
            $clsWithout = trim(preg_replace('/^KELAS\s+/i', '', $rawCls));
            $clsWith = 'KELAS ' . $clsWithout;

            try {
                $cStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_coordinators` WHERE `class_name` = :c OR `class_name` = :cWith OR `class_name` = :cWithout ORDER BY `teacher_name` ASC");
                $cStmt->execute([':c' => $rawCls, ':cWith' => $clsWith, ':cWithout' => $clsWithout]);
                $coords = $cStmt->fetchAll(PDO::FETCH_COLUMN);
                if (!empty($coords)) {
                    $coordName = implode(', ', array_unique(array_filter($coords)));
                }
            } catch (Exception $eC) {}

            // Cari fasilitator dari tabel class_facilitators berdasarkan rombel siswa
            try {
                $fStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_facilitators` WHERE `class_name` = :c OR `class_name` = :cWith OR `class_name` = :cWithout ORDER BY `teacher_name` ASC");
                $fStmt->execute([':c' => $rawCls, ':cWith' => $clsWith, ':cWithout' => $clsWithout]);
                $fasils = $fStmt->fetchAll(PDO::FETCH_COLUMN);
                if (!empty($fasils)) {
                    $fasilName = implode(', ', array_unique(array_filter($fasils)));
                }
            } catch (Exception $eF) {}
        }
    }

    if (empty($coordName)) {
        $coordName = 'Drs. H. Koordinator FINCESTEM';
    }
    if (empty($fasilName)) {
        $fasilName = 'Tim Fasilitator SMAN 1 Belitang';
    }

    // Periksa apakah ada override zona khusus dari admin di tabel student_custom_zones
    $studentZone = !empty($user['zone']) ? $user['zone'] : 'FINCESTEM OKU TIMUR';
    if ($user['role'] === 'siswa') {
        try {
            $zStmt = $pdo->prepare("SELECT `zone` FROM `student_custom_zones` WHERE `nisn` = :n1 OR `nisn` = :n2 LIMIT 1");
            $zStmt->execute([':n1' => $user['identifier'], ':n2' => $user['nis'] ?? '']);
            $customZone = $zStmt->fetchColumn();
            if ($customZone) {
                $studentZone = $customZone;
            }
        } catch (Exception $eZ) {}
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
        'zone'             => $studentZone,
        'coordinator_name' => $coordName,
        'facilitator_name' => $fasilName,
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

    // SINGLE DEVICE LOCK KHUSUS SISWA
    if ($user['role'] === 'siswa') {
        $deviceId   = trim($input['device_id'] ?? '');
        $deviceInfo = trim($input['device_info'] ?? '');

        $currentDbDeviceId = $user['device_id'] ?? null;
        $currentDbDeviceInfo = $user['device_info'] ?? null;

        if ($deviceId) {
            if (empty($currentDbDeviceId)) {
                // Perangkat pertama kali login -> Kunci ke perangkat ini
                try {
                    $stmtLock = $pdo->prepare("UPDATE `users` SET `device_id` = :did, `device_info` = :dinfo, `device_locked_at` = NOW() WHERE `id` = :uid");
                    $stmtLock->execute([
                        ':did'   => $deviceId,
                        ':dinfo' => $deviceInfo ?: 'HP Android (Google Chrome)',
                        ':uid'   => $user['id']
                    ]);
                } catch (Exception $eLock) {
                    // Jika kolom belum ada di database, buat kolom lalu simpan
                    try {
                        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_id` VARCHAR(100) DEFAULT NULL AFTER `zone`");
                        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_info` VARCHAR(255) DEFAULT NULL AFTER `device_id`");
                        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_locked_at` DATETIME DEFAULT NULL AFTER `device_info`");
                        $stmtLock = $pdo->prepare("UPDATE `users` SET `device_id` = :did, `device_info` = :dinfo, `device_locked_at` = NOW() WHERE `id` = :uid");
                        $stmtLock->execute([
                            ':did'   => $deviceId,
                            ':dinfo' => $deviceInfo ?: 'HP Android (Google Chrome)',
                            ':uid'   => $user['id']
                        ]);
                    } catch (Exception $e2) {}
                }
            } elseif ($currentDbDeviceId === $deviceId) {
                // Perangkat sama -> Perbarui device_info jika sebelumnya masih generik (misal 'K')
                if ($deviceInfo && (!str_contains($currentDbDeviceInfo, ' ') || $currentDbDeviceInfo === 'K (Google Chrome)')) {
                    try {
                        $stmtUp = $pdo->prepare("UPDATE `users` SET `device_info` = :dinfo WHERE `id` = :uid");
                        $stmtUp->execute([':dinfo' => $deviceInfo, ':uid' => $user['id']]);
                    } catch (Exception $eUp) {}
                }
            } else {
                // Mencoba login di perangkat kedua yang berbeda -> TOLAK LOGIN
                $lockedInfo = $currentDbDeviceInfo ? " ({$currentDbDeviceInfo})" : "";
                jsonResponse(
                    false,
                    "Akun Anda sudah terkunci di perangkat lain{$lockedInfo}! Anda tidak diizinkan login di perangkat ini kecuali telah di-reset / disetujui oleh Admin.",
                    [
                        'error_code'     => 'DEVICE_LOCKED',
                        'locked_device'  => $currentDbDeviceInfo ?: 'Perangkat Sebelumnya',
                        'student_name'   => $user['name'],
                        'student_nisn'   => $user['identifier']
                    ],
                    403
                );
            }
        }
    }

    jsonResponse(true, 'Login berhasil! Selamat datang, ' . $user['name'], [
        'user'  => $userData,
        'token' => bin2hex(random_bytes(16))
    ]);
}

// AKSI ADMIN: Reset Kunci Device Siswa
if ($action === 'reset_device') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode HTTP harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $nisn = trim($input['nisn'] ?? $input['identifier'] ?? '');
    $mode = trim($input['mode'] ?? 'single'); // 'single' atau 'all'

    $pdo = getDB();

    // Pastikan kolom ada
    try {
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_id` VARCHAR(100) DEFAULT NULL AFTER `zone`");
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_info` VARCHAR(255) DEFAULT NULL AFTER `device_id`");
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_locked_at` DATETIME DEFAULT NULL AFTER `device_info`");
    } catch (Exception $eDev) {}

    if ($mode === 'all') {
        $stmtResetAll = $pdo->prepare("UPDATE `users` SET `device_id` = NULL, `device_info` = NULL, `device_locked_at` = NULL WHERE `role` = 'siswa'");
        $stmtResetAll->execute();
        jsonResponse(true, 'Kunci perangkat seluruh siswa berhasil di-reset. Semua siswa kini dapat login di perangkat baru.');
    }

    if (!$nisn) {
        jsonResponse(false, 'NISN siswa target reset wajib diisi!', null, 400);
    }

    $cleanId = preg_replace('/\D/', '', $nisn);
    $paddedId = (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) ? str_pad($cleanId, 10, '0', STR_PAD_LEFT) : $nisn;

    $stmtReset = $pdo->prepare("
        UPDATE `users` 
        SET `device_id` = NULL, `device_info` = NULL, `device_locked_at` = NULL 
        WHERE (`identifier` = :id OR `identifier` = :padded OR `nis` = :nis) AND `role` = 'siswa'
    ");
    $stmtReset->execute([':id' => $nisn, ':padded' => $paddedId, ':nis' => $nisn]);

    jsonResponse(true, "Kunci perangkat siswa (NISN {$nisn}) berhasil di-reset! Siswa sekarang dapat login di perangkat baru.");
}

// AKSI VERIFIKASI SESI PERANGKAT AKTIF (REMOTE AUTO-LOGOUT)
if ($action === 'check_session') {
    $nisn     = trim($_GET['nisn'] ?? '');
    $deviceId = trim($_GET['device_id'] ?? '');

    if (!$nisn || !$deviceId) {
        jsonResponse(true, 'OK', ['valid' => true]);
    }

    $pdo = getDB();
    $cleanId = preg_replace('/\D/', '', $nisn);
    $paddedId = (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) ? str_pad($cleanId, 10, '0', STR_PAD_LEFT) : $nisn;

    try {
        $stmt = $pdo->prepare("SELECT `device_id`, `device_info` FROM `users` WHERE (`identifier` = :id OR `identifier` = :padded OR `nis` = :nis) AND `role` = 'siswa' LIMIT 1");
        $stmt->execute([':id' => $nisn, ':padded' => $paddedId, ':nis' => $nisn]);
        $row = $stmt->fetch();

        if ($row) {
            $currentDbDev = $row['device_id'];
            // Jika ada device_id di database dan TIDAK SAMA dengan device ini -> HP/device ini harus di-LOGOUT!
            if (!empty($currentDbDev) && $currentDbDev !== $deviceId) {
                jsonResponse(false, 'Akun Anda telah login di perangkat lain (' . ($row['device_info'] ?: 'Perangkat Baru') . '). Sesi pada perangkat ini telah dinonaktifkan.', [
                    'kicked'       => true,
                    'new_device'   => $row['device_info'] ?: 'Perangkat Baru'
                ], 403);
            }
        }
    } catch (Exception $e) {}

    jsonResponse(true, 'Sesi aktif dan valid', ['valid' => true]);
}

// AKSI CEK STATUS DEVICE SISWA
if ($action === 'get_device_status') {
    $nisn = trim($_GET['nisn'] ?? '');
    if (!$nisn) {
        jsonResponse(false, 'NISN siswa wajib diisi!', null, 400);
    }

    $pdo = getDB();
    $cleanId = preg_replace('/\D/', '', $nisn);
    $paddedId = (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) ? str_pad($cleanId, 10, '0', STR_PAD_LEFT) : $nisn;

    try {
        $stmt = $pdo->prepare("
            SELECT `identifier`, `name`, `device_id`, `device_info`, `device_locked_at` 
            FROM `users` 
            WHERE (`identifier` = :id OR `identifier` = :padded OR `nis` = :nis) AND `role` = 'siswa' 
            LIMIT 1
        ");
        $stmt->execute([':id' => $nisn, ':padded' => $paddedId, ':nis' => $nisn]);
        $row = $stmt->fetch();

        if ($row) {
            $isLocked = !empty($row['device_id']);
            jsonResponse(true, 'Status perangkat siswa berhasil dimuat', [
                'nisn'             => $row['identifier'],
                'name'             => $row['name'],
                'is_locked'        => $isLocked,
                'device_id'        => $row['device_id'],
                'device_info'      => $row['device_info'] ?: ($isLocked ? 'Perangkat Terdaftar' : 'Belum Terkunci'),
                'device_locked_at' => $row['device_locked_at']
            ]);
        }
    } catch (Exception $e) {}

    jsonResponse(false, 'Data siswa tidak ditemukan', null, 404);
}

jsonResponse(false, 'Aksi tidak dikenali', null, 400);
