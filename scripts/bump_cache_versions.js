const fs = require('fs');
const path = require('path');

const NEW_VERSION = '20261107_v9_fadhil_royan';

const filesToUpdate = [
  'siswa/index.html',
  'siswa/dashboard.html',
  'siswa/materi.html',
  'siswa/lkpd.html',
  'siswa/asesmen.html',
  'siswa/dokumentasi.html',
  'admin/index.html',
  'guru/fasilitator.html',
  'guru/koordinator.html'
];

filesToUpdate.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace siswa_data.js?v=...
  content = content.replace(/(siswa_data\.js(?:\?v=[a-zA-Z0-9_-]+)?)/g, `siswa_data.js?v=${NEW_VERSION}`);
  // Replace core.js?v=...
  content = content.replace(/(core\.js(?:\?v=[a-zA-Z0-9_-]+)?)/g, `core.js?v=${NEW_VERSION}`);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated cache versions in ${file}`);
});
