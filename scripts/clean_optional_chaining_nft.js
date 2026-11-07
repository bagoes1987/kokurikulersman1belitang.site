// scripts/clean_optional_chaining_nft.js
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let code = fs.readFileSync(targetFile, 'utf8');

console.log('Target file length before:', code.length);

// Bersihkan semua pola ?. di materi-nonfieldtrip.js
// Contoh:
// document.getElementById('nftD0CardAAnswer')?.value
// document.getElementById('nftD0CardAAnswer')?.focus()
// document.querySelector('.input-source-a')?.focus()

code = code.replace(/document\.getElementById\('([^']+)'\)\?\.value/g, "(document.getElementById('$1') ? document.getElementById('$1').value : '')");
code = code.replace(/document\.getElementById\(`([^`]+)`\)\?\.value/g, "(document.getElementById(`$1`) ? document.getElementById(`$1`).value : '')");
code = code.replace(/document\.getElementById\('([^']+)'\)\?\.focus\(\)/g, "var _el1 = document.getElementById('$1'); if (_el1) _el1.focus();");
code = code.replace(/document\.querySelector\('([^']+)'\)\?\.focus\(\)/g, "var _el2 = document.querySelector('$1'); if (_el2) _el2.focus();");

// Ganti pola umum x?.y menjadi safe access jika ada sisa
const countBefore = (code.match(/\?\./g) || []).length;
console.log('Remaining ?. before regex replace:', countBefore);

code = code.replace(/(\w+)\?\.(\w+)/g, '($1 && $1.$2)');

const countAfter = (code.match(/\?\./g) || []).length;
console.log('Remaining ?. after regex replace:', countAfter);

fs.writeFileSync(targetFile, code, 'utf8');
console.log('File materi-nonfieldtrip.js cleaned.');
