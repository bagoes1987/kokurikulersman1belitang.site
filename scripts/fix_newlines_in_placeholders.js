// scripts/fix_newlines_in_placeholders.js
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let code = fs.readFileSync(targetFile, 'utf8');

// Perbaiki sourcePlaceholder agar \\n tersimpan sebagai karakter \n di dalam string
code = code.replace(/sourcePlaceholder:\s*'Tuliskan sumber rujukan materi Anda \(Bisa lebih dari 1 sumber, tekan tombol "\+ Tambah Sumber Rujukan Lain"\):\r?\n1\.\s*/g, "sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\\n1. ");
code = code.replace(/sourcePlaceholder:\s*'Tuliskan sumber rujukan data Anda \(Bisa lebih dari 1 sumber, tekan tombol "\+ Tambah Sumber Rujukan Lain"\):\r?\n1\.\s*/g, "sourcePlaceholder: 'Tuliskan sumber rujukan data Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\\n1. ");

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Fixed newlines in placeholders.');
