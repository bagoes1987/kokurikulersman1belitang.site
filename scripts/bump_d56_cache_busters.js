const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'siswa', 'materi.html'),
  path.join(__dirname, '..', 'siswa', 'lkpd.html'),
  path.join(__dirname, '..', 'siswa', 'asesmen.html')
];

const newVersion = '20261108_d56_video_v1';

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  console.log('Checking', path.basename(f));
  // Update nonfieldtrip js references
  content = content.replace(/(materi-nonfieldtrip\.js\?v=)[^"']+/g, `$1${newVersion}`);
  content = content.replace(/(lkpd-nonfieldtrip\.js\?v=)[^"']+/g, `$1${newVersion}`);
  content = content.replace(/(asesmen-nonfieldtrip\.js\?v=)[^"']+/g, `$1${newVersion}`);
  content = content.replace(/(bank-soal-nonfieldtrip\.js\?v=)[^"']+/g, `$1${newVersion}`);
  fs.writeFileSync(f, content, 'utf8');
  console.log('Updated cache busters in', path.basename(f));
});
