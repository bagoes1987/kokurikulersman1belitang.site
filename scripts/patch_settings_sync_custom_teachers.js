const fs = require('fs');

let code = fs.readFileSync('api/settings.php', 'utf8');

const fnCode = `
function syncMentorshipCustomTeachersToDatabase($pdo) {
    try {
        $state = getMentorshipState($pdo);
        $customs = $state['custom_teachers'] ?? [];
        if (!is_array($customs) || empty($customs)) return;

        $stmtT = $pdo->prepare("
            INSERT INTO \`teachers\` (\`kode_guru\`, \`nama_guru\`, \`nip\`, \`mata_pelajaran\`, \`jabatan\`, \`tugas_tambahan\`, \`username\`, \`password\`, \`created_at\`, \`updated_at\`)
            VALUES (:k, :n, :nip, :m, :j, :t, :u, :p, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
                \`nama_guru\`       = VALUES(\`nama_guru\`),
                \`nip\`             = VALUES(\`nip\`),
                \`mata_pelajaran\`  = VALUES(\`mata_pelajaran\`),
                \`jabatan\`         = VALUES(\`jabatan\`),
                \`tugas_tambahan\`  = VALUES(\`tugas_tambahan\`),
                \`username\`        = VALUES(\`username\`),
                \`password\`        = VALUES(\`password\`),
                \`updated_at\`      = NOW()
        ");

        $stmtU = $pdo->prepare("
            INSERT INTO \`users\` (\`identifier\`, \`nis\`, \`password_hash\`, \`name\`, \`role\`, \`grade_level\`, \`class_name\`, \`gender\`, \`zone\`)
            VALUES (:u, '', :p, :n, 'fasilitator', '-', '-', 'L', 'FINCESTEM OKU TIMUR')
            ON DUPLICATE KEY UPDATE
                \`password_hash\` = VALUES(\`password_hash\`),
                \`name\`          = VALUES(\`name\`),
                \`role\`          = IF(\`role\` = 'admin', 'admin', 'fasilitator')
        ");

        foreach ($customs as $ct) {
            if (!is_array($ct)) continue;
            $kode = trim($ct['kode_guru'] ?? '');
            $nama = trim($ct['nama_guru'] ?? '');
            $nip  = trim($ct['nip'] ?? '-') ?: '-';
            $mapel= trim($ct['mata_pelajaran'] ?? 'Fasilitator Kokurikuler') ?: 'Fasilitator Kokurikuler';
            $jab  = trim($ct['jabatan'] ?? 'Guru Pendamping') ?: 'Guru Pendamping';
            $tgs  = trim($ct['tugas_tambahan'] ?? '-') ?: '-';
            $user = trim($ct['username'] ?? '');
            $pass = trim($ct['password'] ?? 'Fincestem2026!') ?: 'Fincestem2026!';

            if (!$kode || !$nama || !$user) continue;

            $stmtT->execute([
                ':k'   => $kode,
                ':n'   => $nama,
                ':nip' => $nip,
                ':m'   => $mapel,
                ':j'   => $jab,
                ':t'   => $tgs,
                ':u'   => $user,
                ':p'   => $pass
            ]);

            try {
                $stmtU->execute([
                    ':u' => $user,
                    ':p' => $pass,
                    ':n' => $nama
                ]);
            } catch (Exception $eU) {}
        }
    } catch (Exception $e) {}
}
`;

// Insert after getMentorshipState
const marker = 'return $result;\n}';
const altMarker = 'return $result;\r\n}';
if (code.includes(altMarker)) {
  code = code.replace(altMarker, altMarker + '\r\n' + fnCode);
} else if (code.includes(marker)) {
  code = code.replace(marker, marker + '\n' + fnCode);
} else {
  console.error('Marker not found!');
  process.exit(1);
}

// In get_teachers
code = code.replace(
  /if \(\$action === 'get_teachers'\) \{\s*seedMasterTeachersIfEmpty\(\$pdo\);/,
  "if ($action === 'get_teachers') {\n            seedMasterTeachersIfEmpty($pdo);\n            syncMentorshipCustomTeachersToDatabase($pdo);"
);

// In save_mentorship_data
code = code.replace(
  /\$current\['custom_teachers'\] = array_values\(\$customMap\);\s*\}/,
  "$current['custom_teachers'] = array_values($customMap);\n                }\n                syncMentorshipCustomTeachersToDatabase($pdo);"
);

fs.writeFileSync('api/settings.php', code, 'utf8');
console.log('api/settings.php successfully patched!');
