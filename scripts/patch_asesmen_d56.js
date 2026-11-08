const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'modules', 'asesmen-nonfieldtrip.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /\? `Asesmen Video Observasi &amp; STEM: \$\{currentSectorName\}`\r?\n\s*: \(isDay6\r?\n\s*\? `Asesmen Video Finansial &amp; Inovasi: \$\{currentSectorName\}`/,
  '? `Asesmen Sains &amp; Teknologi Sektor: ${currentSectorName}`\r\n                      : (isDay6\r\n                          ? `Asesmen Rekayasa &amp; Finansial Sektor: ${currentSectorName}`'
);

content = content.replace(
  /\: \(isDay5\r?\n\s*\? `Uji pemahaman observasi lapangan[\s\S]*?video sektor \$\{currentSectorName\}\.`\r?\n\s*: \(isDay6\r?\n\s*\? `Uji kemampuan analisis kelayakan[\s\S]*?video sektor \$\{currentSectorName\}\.`/,
  `: (isDay5\r\n                      ? \`Uji pemahaman penerapan sains bahan alami, nutrisi/biologi, dan teknologi alat kerja/mekanisasi pada sektor \${currentSectorName} di OKU Timur (10 Soal PG).\`\r\n                      : (isDay6\r\n                          ? \`Uji pemahaman rekayasa teknis penanganan kendala, analisis biaya operasional, HPP, omzet, dan laba bersih pada sektor \${currentSectorName} di OKU Timur (10 Soal PG).\``
);

content = content.replace(
  /<span>Paket 50 butir soal spesifik otomatis diambil dari sektor observasi LKPD Day \$\{examState\.dayNum\} yang telah Anda pilih\.<\/span>/,
  '<span>Paket ${(isDay0 || isDay4 || isDay5 || isDay6) ? "10" : "50"} butir soal spesifik otomatis diambil dari sektor observasi LKPD Day ${examState.dayNum} yang telah Anda pilih.</span>'
);

content = content.replace(
  /\$\{\(isDay0 \|\| isDay4\) \? "10 Soal PG" : "50 Soal PG"\}/g,
  '${(isDay0 || isDay4 || isDay5 || isDay6) ? "10 Soal PG" : "50 Soal PG"}'
);

content = content.replace(
  /\$\{\(isDay0 \|\| isDay4\) \? \(isDay0 \? "15 Menit" : "20 Menit"\) : "60 Menit"\}/g,
  '${(isDay0 || isDay4 || isDay5 || isDay6) ? (isDay0 ? "15 Menit" : "20 Menit") : "60 Menit"}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('asesmen-nonfieldtrip.js patched successfully!');
