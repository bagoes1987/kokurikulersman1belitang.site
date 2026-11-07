const fs = require('fs');

let code = fs.readFileSync('api/auth.php', 'utf8');

// Replace lines 38 to 81
const startMarker = "// Auto-heal data akun siswa M.FADHIL RAMLI";
const endMarker = "$user = $stmt->fetch();";

const sIdx = code.indexOf(startMarker);
const eIdx = code.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1) {
  const before = code.substring(0, sIdx);
  const after = code.substring(eIdx + endMarker.length);

  const replacement = `// Auto-heal data akun siswa M.FADHIL RAMLI (XI.10) & ROYAN MAULANA (X.4) agar tidak bentrok NISN
    if ($identifier === '3105533980' || $identifier === '14418' || $identifier === '14922' || $identifier === '0110014922' || $password === '14922' || $password === '14418') {
        try {
            // Pastikan M. FADHIL RAMLI (XI.10): NISN 3105533980, NIS 14418
            $pdo->exec("UPDATE \`users\` SET \`identifier\` = '3105533980', \`nis\` = '14418', \`name\` = 'M.FADHIL RAMLI', \`class_name\` = 'KELAS XI.10', \`grade_level\` = 'XI', \`zone\` = 'FINCESTEM LUAR OKU TIMUR' WHERE \`nis\` = '14418' OR \`name\` LIKE '%FADHIL RAMLI%'");

            // Pastikan ROYAN MAULANA (X.4): NISN 0110014922, NIS 14922
            $chkR = $pdo->prepare("SELECT id FROM \`users\` WHERE \`nis\` = '14922' OR \`name\` LIKE '%ROYAN MAULANA%' LIMIT 1");
            $chkR->execute();
            $rRow = $chkR->fetch();
            if ($rRow) {
                $pdo->exec("UPDATE \`users\` SET \`identifier\` = '0110014922', \`nis\` = '14922', \`name\` = 'ROYAN MAULANA', \`class_name\` = 'KELAS X.4', \`grade_level\` = 'X', \`zone\` = 'FINCESTEM LUAR OKU TIMUR' WHERE \`id\` = " . (int)$rRow['id']);
            } else {
                $pdo->exec("INSERT INTO \`users\` (\`identifier\`, \`nis\`, \`password_hash\`, \`name\`, \`role\`, \`grade_level\`, \`class_name\`, \`gender\`, \`agama\`, \`birth_info\`, \`address\`, \`parent_father\`, \`parent_mother\`, \`parent_job\`, \`school_origin\`, \`zone\`) VALUES ('0110014922', '14922', '14922', 'ROYAN MAULANA', 'siswa', 'X', 'KELAS X.4', 'L', 'ISLAM', 'OKU TIMUR , 22 Januari 2011', 'TRIYOSO, RT:001, RW:001, Kec:BELITANG, Kab:OGAN KOMERING ULU TIMUR, Kode POS:32382', 'ISMANAN', 'ANA NURJANAH', 'PETANI', 'SMP ISLAM TERPADU QURRATA A\\'YUN', 'FINCESTEM LUAR OKU TIMUR')");
            }
        } catch (Exception $eSiswaHeal) {}
    }

    // Query user by identifier (mendukung NISN 10 digit padded, atau NIS)
    $cleanId = preg_replace('/\\D/', '', $identifier);
    $paddedId = (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) ? str_pad($cleanId, 10, '0', STR_PAD_LEFT) : $identifier;

    // Resolusi cerdas untuk NISN duplikat Dapodik 3105533980 (M.FADHIL RAMLI & ROYAN MAULANA):
    if (($identifier === '3105533980' || $cleanId === '3105533980' || $identifier === '14922' || $identifier === '0110014922') && ($password === '14922' || $password === '3105533980' || $password === '0110014922')) {
        $rStmt = $pdo->prepare("SELECT * FROM \`users\` WHERE \`nis\` = '14922' OR \`name\` LIKE '%ROYAN MAULANA%' LIMIT 1");
        $rStmt->execute();
        $user = $rStmt->fetch();
    } elseif (($identifier === '3105533980' || $cleanId === '3105533980' || $identifier === '14418') && ($password === '14418' || $password === '3105533980')) {
        $fStmt = $pdo->prepare("SELECT * FROM \`users\` WHERE \`nis\` = '14418' OR \`name\` LIKE '%FADHIL RAMLI%' LIMIT 1");
        $fStmt->execute();
        $user = $fStmt->fetch();
    } else {
        $stmt = $pdo->prepare("SELECT * FROM \`users\` WHERE \`identifier\` = :id OR \`identifier\` = :padded OR \`nis\` = :nis LIMIT 1");
        $stmt->execute([':id' => $identifier, ':padded' => $paddedId, ':nis' => $identifier]);
        $user = $stmt->fetch();
    }`;

  code = before + replacement + after;
  fs.writeFileSync('api/auth.php', code, 'utf8');
  console.log('api/auth.php updated successfully!');
} else {
  console.error('Markers not found in api/auth.php', sIdx, eIdx);
}

// Update password check
let code2 = fs.readFileSync('api/auth.php', 'utf8');
code2 = code2.replace(
  "} elseif ($user['role'] === 'siswa' && $password === $user['identifier']) {",
  "} elseif ($user['role'] === 'siswa' && ($password === $user['identifier'] || ($user['nis'] === '14922' && ($password === '3105533980' || $password === '0110014922')))) {"
);
fs.writeFileSync('api/auth.php', code2, 'utf8');
console.log('Password check in api/auth.php updated!');
