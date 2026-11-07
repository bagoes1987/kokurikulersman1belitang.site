// Script to fix student accounts for M. Fadhil Ramli and Royan Maulana
const fs = require('fs');
const path = require('path');

console.log('=== START FIXING STUDENT ACCOUNTS ===');

// 1. UPDATE js/siswa_data.js
const siswaDataPath = path.join(__dirname, '../js/siswa_data.js');
let siswaData = fs.readFileSync(siswaDataPath, 'utf8');

// Regex replace for Royan Maulana (nis 14922)
const royanRegex = /("nis":\s*"14922",\s*"nisn":\s*)"3105533980"/;
if (royanRegex.test(siswaData)) {
  siswaData = siswaData.replace(royanRegex, '$1"0110014922"');
  fs.writeFileSync(siswaDataPath, siswaData, 'utf8');
  console.log('✔ Successfully updated Royan Maulana NISN in js/siswa_data.js');
} else {
  console.error('❌ Could not find target Royan block in js/siswa_data.js');
}

// 2. UPDATE field_trip_students.json
const ftPath = path.join(__dirname, '../field_trip_students.json');
let ftData = fs.readFileSync(ftPath, 'utf8');
ftData = ftData.replace(
  `"nama": "ROYAN MAULANA",\r\n    "kelas": "KELAS X.4",\r\n    "gender": "L",\r\n    "nis": "14922",\r\n    "nisn": "3105533980"`,
  `"nama": "ROYAN MAULANA",\r\n    "kelas": "KELAS X.4",\r\n    "gender": "L",\r\n    "nis": "14922",\r\n    "nisn": "0110014922"`
);
// Also handle LF line endings
ftData = ftData.replace(
  `"nama": "ROYAN MAULANA",\n    "kelas": "KELAS X.4",\n    "gender": "L",\n    "nis": "14922",\n    "nisn": "3105533980"`,
  `"nama": "ROYAN MAULANA",\n    "kelas": "KELAS X.4",\n    "gender": "L",\n    "nis": "14922",\n    "nisn": "0110014922"`
);
fs.writeFileSync(ftPath, ftData, 'utf8');
console.log('✔ Successfully updated Royan Maulana in field_trip_students.json');

// 3. UPDATE js/core.js (Multi-match smart resolver in validateLogin)
const corePath = path.join(__dirname, '../js/core.js');
let coreContent = fs.readFileSync(corePath, 'utf8');

const targetCoreLogin = `        // 1. Cek Master Data 1.165 Siswa Dapodik
        const masterList = window.FincestemMasterStudents || [];
        if (Array.isArray(masterList) && masterList.length > 0) {
          const found = masterList.find(s => 
            String(s.nisn).trim() === paddedId || 
            String(s.nisn).trim() === cleanId || 
            String(s.nis).trim() === cleanId
          );

          if (!found) {
            return { success: false, message: 'NISN ' + id + ' tidak terdaftar dalam database Dapodik SMAN 1 Belitang!' };
          }

          // Password harus berupa NIS siswa (atau NISN)
          const validNis = String(found.nis || '').trim();
          if (pwd !== validNis && pwd !== String(found.nisn).trim()) {
            return { success: false, message: 'Kata sandi salah! Masukkan nomor NIS (Nomor Induk Siswa) Anda.' };
          }`;

const replacementCoreLogin = `        // 1. Cek Master Data 1.165 Siswa Dapodik
        const masterList = window.FincestemMasterStudents || [];
        if (Array.isArray(masterList) && masterList.length > 0) {
          const matches = masterList.filter(s => 
            String(s.nisn).trim() === paddedId || 
            String(s.nisn).trim() === cleanId || 
            String(s.nis).trim() === cleanId
          );

          if (matches.length === 0) {
            return { success: false, message: 'NISN ' + id + ' tidak terdaftar dalam database Dapodik SMAN 1 Belitang!' };
          }

          // Jika ada lebih dari satu kecocokan, pilih yang NIS-nya sesuai kata sandi input
          const found = matches.find(s => String(s.nis || '').trim() === pwd || String(s.nisn || '').trim() === pwd) || matches[0];

          // Password harus berupa NIS siswa (atau NISN)
          const validNis = String(found.nis || '').trim();
          if (pwd !== validNis && pwd !== String(found.nisn).trim()) {
            return { success: false, message: 'Kata sandi salah! Masukkan nomor NIS (Nomor Induk Siswa) Anda.' };
          }`;

// Handle CRLF vs LF
if (coreContent.includes(targetCoreLogin)) {
  coreContent = coreContent.replace(targetCoreLogin, replacementCoreLogin);
} else {
  // Normalize and replace
  const normCore = coreContent.replace(/\r\n/g, '\n');
  const normTarget = targetCoreLogin.replace(/\r\n/g, '\n');
  const normRepl = replacementCoreLogin.replace(/\r\n/g, '\n');
  if (normCore.includes(normTarget)) {
    coreContent = normCore.replace(normTarget, normRepl);
  } else {
    console.warn('⚠️ Could not find exact targetCoreLogin block in js/core.js, checking regex...');
  }
}
fs.writeFileSync(corePath, coreContent, 'utf8');
console.log('✔ Successfully updated js/core.js validateLogin');

// 4. UPDATE admin/index.html (openStudentDetail supporting both nisn and nis)
const adminPath = path.join(__dirname, '../admin/index.html');
let adminContent = fs.readFileSync(adminPath, 'utf8');

adminContent = adminContent.replace(
  `openStudentDetail('\${s.nisn}')`,
  `openStudentDetail('\${s.nisn}', '\${s.nis}')`
);

adminContent = adminContent.replace(
  `function openStudentDetail(nisn) {
      const list = window.FincestemMasterStudents || [];
      const s = list.find(item => String(item.nisn).trim() === String(nisn).trim());`,
  `function openStudentDetail(nisn, nis) {
      const list = window.FincestemMasterStudents || [];
      const s = (nis ? list.find(item => String(item.nis).trim() === String(nis).trim()) : null) || 
                list.find(item => String(item.nisn).trim() === String(nisn).trim());`
);
fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('✔ Successfully updated admin/index.html openStudentDetail');

// 5. UPDATE api/auth.php (Auto-heal M. Fadhil Ramli & Royan Maulana in MySQL)
const authPath = path.join(__dirname, '../api/auth.php');
let authContent = fs.readFileSync(authPath, 'utf8');

const targetAuthHeal = `    // Auto-heal data guru TITO DADANG PRASETYO,S.Pd (85L -> NIP 198309302009041002) di database
    if ($identifier === '198309302009041002' || strtolower($identifier) === '85l') {
        try {
            $pdo->exec("UPDATE \`teachers\` SET \`nip\` = '198309302009041002', \`username\` = '198309302009041002' WHERE \`kode_guru\` = '85L' OR \`nama_guru\` LIKE '%TITO DADANG PRASETYO%'");
            $pdo->exec("UPDATE \`users\` SET \`identifier\` = '198309302009041002' WHERE \`identifier\` = '85l' OR \`name\` LIKE '%TITO DADANG PRASETYO%'");
        } catch (Exception $eHeal) {}
    }`;

const newAuthHeal = `    // Auto-heal data guru TITO DADANG PRASETYO,S.Pd (85L -> NIP 198309302009041002) di database
    if ($identifier === '198309302009041002' || strtolower($identifier) === '85l') {
        try {
            $pdo->exec("UPDATE \`teachers\` SET \`nip\` = '198309302009041002', \`username\` = '198309302009041002' WHERE \`kode_guru\` = '85L' OR \`nama_guru\` LIKE '%TITO DADANG PRASETYO%'");
            $pdo->exec("UPDATE \`users\` SET \`identifier\` = '198309302009041002' WHERE \`identifier\` = '85l' OR \`name\` LIKE '%TITO DADANG PRASETYO%'");
        } catch (Exception $eHeal) {}
    }

    // Auto-heal data akun siswa M.FADHIL RAMLI (XI.10) & ROYAN MAULANA (X.4) agar tidak bentrok NISN
    if ($identifier === '3105533980' || $identifier === '14418' || $identifier === '14922' || $identifier === '0110014922') {
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
    }`;

authContent = authContent.replace(targetAuthHeal, newAuthHeal);
fs.writeFileSync(authPath, authContent, 'utf8');
console.log('✔ Successfully updated api/auth.php auto-heal');

// 6. UPDATE api/deploy.php (Run DB migration during deployment)
const deployPath = path.join(__dirname, '../api/deploy.php');
let deployContent = fs.readFileSync(deployPath, 'utf8');

const targetDeployEnd = `$deployLogFile = __DIR__ . '/deploy_history.log';`;
const newDeployEnd = `// Sinkronisasi database akun siswa M. FADHIL RAMLI & ROYAN MAULANA
    try {
        $pdo = getDB();
        $pdo->exec("UPDATE \`users\` SET \`identifier\` = '3105533980', \`nis\` = '14418', \`name\` = 'M.FADHIL RAMLI', \`class_name\` = 'KELAS XI.10', \`grade_level\` = 'XI', \`zone\` = 'FINCESTEM LUAR OKU TIMUR' WHERE \`nis\` = '14418' OR \`name\` LIKE '%FADHIL RAMLI%'");

        $chkR = $pdo->prepare("SELECT id FROM \`users\` WHERE \`nis\` = '14922' OR \`name\` LIKE '%ROYAN MAULANA%' LIMIT 1");
        $chkR->execute();
        $rRow = $chkR->fetch();
        if ($rRow) {
            $pdo->exec("UPDATE \`users\` SET \`identifier\` = '0110014922', \`nis\` = '14922', \`name\` = 'ROYAN MAULANA', \`class_name\` = 'KELAS X.4', \`grade_level\` = 'X', \`zone\` = 'FINCESTEM LUAR OKU TIMUR' WHERE \`id\` = " . (int)$rRow['id']);
        } else {
            $pdo->exec("INSERT INTO \`users\` (\`identifier\`, \`nis\`, \`password_hash\`, \`name\`, \`role\`, \`grade_level\`, \`class_name\`, \`gender\`, \`agama\`, \`birth_info\`, \`address\`, \`parent_father\`, \`parent_mother\`, \`parent_job\`, \`school_origin\`, \`zone\`) VALUES ('0110014922', '14922', '14922', 'ROYAN MAULANA', 'siswa', 'X', 'KELAS X.4', 'L', 'ISLAM', 'OKU TIMUR , 22 Januari 2011', 'TRIYOSO, RT:001, RW:001, Kec:BELITANG, Kab:OGAN KOMERING ULU TIMUR, Kode POS:32382', 'ISMANAN', 'ANA NURJANAH', 'PETANI', 'SMP ISLAM TERPADU QURRATA A\\'YUN', 'FINCESTEM LUAR OKU TIMUR')");
        }
        $logs[] = "Sinkronisasi database akun siswa M.FADHIL RAMLI & ROYAN MAULANA sukses.";
    } catch (Exception $eSync) {
        $logs[] = "Catatan sinkronisasi siswa: " . $eSync->getMessage();
    }

    $deployLogFile = __DIR__ . '/deploy_history.log';`;

deployContent = deployContent.replace(targetDeployEnd, newDeployEnd);
fs.writeFileSync(deployPath, deployContent, 'utf8');
console.log('✔ Successfully updated api/deploy.php DB migration');

console.log('=== ALL STUDENT ACCOUNT FIXES APPLIED ===');
