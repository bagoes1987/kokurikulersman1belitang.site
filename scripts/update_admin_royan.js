const fs = require('fs');
let html = fs.readFileSync('admin/index.html', 'utf8');

// Update openStudentDetail
html = html.replace(
  'function openStudentDetail(nisn) {',
  'function openStudentDetail(nisn, nis) {'
);
html = html.replace(
  'const s = list.find(item => String(item.nisn).trim() === String(nisn).trim());',
  'const s = list.find(item => (nis && String(item.nis).trim() === String(nis).trim()) || String(item.nisn).trim() === String(nisn).trim());'
);

// Update handleLoginAsTesterStudent
html = html.replace(
  'function handleLoginAsTesterStudent(nisn) {',
  'function handleLoginAsTesterStudent(nisn, nis) {'
);
html = html.replace(
  'const stu = list.find(s => String(s.nisn).trim() === cleanNisn || String(s.nisn).trim().replace(/^0+/, \'\') === cleanNisn.replace(/^0+/, \'\'));',
  'const cleanNis = String(nis || \'\').trim();\r\n        const stu = list.find(s => (cleanNis && String(s.nis).trim() === cleanNis) || String(s.nisn).trim() === cleanNisn || String(s.nisn).trim().replace(/^0+/, \'\') === cleanNisn.replace(/^0+/, \'\'));'
);

// Also update caller in card
html = html.replace(
  "handleLoginAsTesterStudent('${nisn}')",
  "handleLoginAsTesterStudent('${nisn}', '${s.nis}')"
);

fs.writeFileSync('admin/index.html', html, 'utf8');
console.log('admin/index.html updated successfully');
