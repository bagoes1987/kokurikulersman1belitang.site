const fs = require('fs');

const files = [
  'admin/index.html',
  'guru/fasilitator.html',
  'guru/koordinator.html',
  'siswa/asesmen.html',
  'siswa/dashboard.html',
  'siswa/dokumentasi.html',
  'siswa/index.html',
  'siswa/lkpd.html',
  'siswa/materi.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/core\.js\?v=[^"'\s]+/g, 'core.js?v=20261107_v13_windi_custom_teachers');
  fs.writeFileSync(f, content, 'utf8');
  console.log(f + ': updated cache buster to v=20261107_v13_windi_custom_teachers');
});
