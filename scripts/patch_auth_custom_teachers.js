const fs = require('fs');

let code = fs.readFileSync('api/auth.php', 'utf8');

const patchCode = `
                // Lookup dari mentorship_state_v1 custom_teachers
                if (!$user) {
                    try {
                        $mStmt = $pdo->prepare("SELECT \`value\` FROM \`app_settings\` WHERE \`key_name\` = 'mentorship_state_v1' LIMIT 1");
                        $mStmt->execute();
                        $mRaw = $mStmt->fetchColumn();
                        if ($mRaw) {
                            $mDec = json_decode($mRaw, true);
                            if (isset($mDec['custom_teachers']) && is_array($mDec['custom_teachers'])) {
                                foreach ($mDec['custom_teachers'] as $ct) {
                                    $ctUser = strtolower(trim($ct['username'] ?? ''));
                                    $ctKode = strtolower(trim($ct['kode_guru'] ?? ''));
                                    $ctNip  = strtolower(trim($ct['nip'] ?? ''));
                                    if ($cleanIdLower === $ctUser || $cleanIdLower === $ctKode || ($ctNip !== '-' && $cleanIdLower === $ctNip)) {
                                        $user = [
                                            'id'            => 2000 + (int)($ct['no'] ?? 1),
                                            'identifier'    => $ct['username'],
                                            'nis'           => '',
                                            'name'          => $ct['nama_guru'],
                                            'role'          => $role ?: 'fasilitator',
                                            'password_hash' => $ct['password'] ?? 'Fincestem2026!',
                                            'assignment'    => ($ct['tugas_tambahan'] ?? '-') !== '-' ? $ct['tugas_tambahan'] : "Fasilitator {$ct['mata_pelajaran']} ({$ct['kode_guru']})",
                                            'zone'          => 'FINCESTEM OKU TIMUR'
                                        ];
                                        // Auto-insert ke MySQL teachers & users
                                        try {
                                            $inT = $pdo->prepare("INSERT INTO \`teachers\` (\`kode_guru\`, \`nama_guru\`, \`nip\`, \`mata_pelajaran\`, \`jabatan\`, \`tugas_tambahan\`, \`username\`, \`password\`, \`created_at\`, \`updated_at\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE \`nama_guru\` = VALUES(\`nama_guru\`), \`password\` = VALUES(\`password\`)");
                                            $inT->execute([$ct['kode_guru'], $ct['nama_guru'], $ct['nip'] ?? '-', $ct['mata_pelajaran'] ?? 'Fasilitator Kokurikuler', $ct['jabatan'] ?? 'Guru Pendamping', $ct['tugas_tambahan'] ?? '-', $ct['username'], $ct['password'] ?? 'Fincestem2026!']);
                                            $inU = $pdo->prepare("INSERT INTO \`users\` (\`identifier\`, \`nis\`, \`password_hash\`, \`name\`, \`role\`, \`grade_level\`, \`class_name\`, \`gender\`, \`zone\`) VALUES (?, '', ?, ?, 'fasilitator', '-', '-', 'L', 'FINCESTEM OKU TIMUR') ON DUPLICATE KEY UPDATE \`password_hash\` = VALUES(\`password_hash\`), \`name\` = VALUES(\`name\`)");
                                            $inU->execute([$ct['username'], $ct['password'] ?? 'Fincestem2026!', $ct['nama_guru']]);
                                        } catch (Exception $eIn) {}
                                        break;
                                    }
                                }
                            }
                        }
                    } catch (Exception $eM) {}
                }
`;

const target = '                        break;\n                    }\n                }\n            }';
const altTarget = '                        break;\r\n                    }\r\n                }\r\n            }';

if (code.includes(altTarget)) {
  code = code.replace(altTarget, altTarget + '\r\n' + patchCode);
} else if (code.includes(target)) {
  code = code.replace(target, target + '\n' + patchCode);
} else {
  console.error('Target not found in api/auth.php');
  process.exit(1);
}

fs.writeFileSync('api/auth.php', code, 'utf8');
console.log('api/auth.php patched successfully!');
