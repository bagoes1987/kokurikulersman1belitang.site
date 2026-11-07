// Replace all occurrences of "sapi potong" with "peternakan sapi" / "ternak sapi"
const fs = require('fs');
const path = require('path');

console.log('=== START REPLACING SAPI POTONG ===');

// 1. js/data/bank-soal-nonfieldtrip.js
const bPath = path.join(__dirname, '../js/data/bank-soal-nonfieldtrip.js');
let bContent = fs.readFileSync(bPath, 'utf8');

bContent = bContent.replace(
  'ruminansia (sapi potong Bali/PO, kambing/domba)',
  'ruminansia (peternakan sapi Bali/PO, kambing/domba)'
);
bContent = bContent.replace(
  'Peternak ruminansia (sapi potong dan kambing) di OKU Timur',
  'Peternak ruminansia (peternakan sapi dan kambing) di OKU Timur'
);
bContent = bContent.replace(
  'sehingga nilai jual sapi potong berumur 2 tahun mencapai di atas Rp 30-40 juta',
  'sehingga nilai jual hasil peternakan sapi berumur 2 tahun mencapai di atas Rp 30-40 juta'
);
fs.writeFileSync(bPath, bContent, 'utf8');
console.log('✔ Updated js/data/bank-soal-nonfieldtrip.js');

// 2. js/modules/lkpd-nonfieldtrip.js
const lPath = path.join(__dirname, '../js/modules/lkpd-nonfieldtrip.js');
let lContent = fs.readFileSync(lPath, 'utf8');

lContent = lContent.replace(
  "Jenis ternak apa yang dipelihara (sapi potong/perah, kambing/domba",
  "Jenis ternak apa yang dipelihara (peternakan sapi, kambing/domba"
);
lContent = lContent.replace(
  "badge: 'Sapi Potong, Kambing, Ayam & Bebek',",
  "badge: 'Peternakan Sapi, Kambing, Ayam & Bebek',"
);
lContent = lContent.replace(
  "examples: 'Kandang Sapi Potong/Penggemukan, Kandang Kambing/Domba",
  "examples: 'Peternakan Sapi, Kandang Kambing/Domba"
);
fs.writeFileSync(lPath, lContent, 'utf8');
console.log('✔ Updated js/modules/lkpd-nonfieldtrip.js');

// 3. js/modules/materi-nonfieldtrip.js
const mPath = path.join(__dirname, '../js/modules/materi-nonfieldtrip.js');
let mContent = fs.readFileSync(mPath, 'utf8');

mContent = mContent.replace(
  "peternakan rakyat terpadu (sapi potong/perah, kambing, domba, unggas ayam & bebek)",
  "peternakan rakyat terpadu (peternakan sapi, kambing, domba, unggas ayam & bebek)"
);
mContent = mContent.replace(
  "perikanan kolam air tawar (patin/lele) dan peternakan sapi potong sebagai pilar stabilitas",
  "perikanan kolam air tawar (patin/lele) dan peternakan sapi sebagai pilar stabilitas"
);
mContent = mContent.replace(
  "Balai Penelitian Ternak (Balitnak) Ciawi, Pedoman Nutrisi dan Pakan Sapi Potong",
  "Balai Penelitian Ternak (Balitnak) Ciawi, Pedoman Nutrisi dan Pakan Peternakan Sapi"
);
mContent = mContent.replace(
  "Petunjuk Teknis Konstruksi Kandang Sapi Potong Sehat dan Ramah Lingkungan",
  "Petunjuk Teknis Konstruksi Kandang Peternakan Sapi Sehat dan Ramah Lingkungan"
);
mContent = mContent.replace(
  "subtitle: 'Rumus ADG Sapi Potong (kg/hari)",
  "subtitle: 'Rumus ADG Peternakan Sapi (kg/hari)"
);
mContent = mContent.replace(
  "(target ideal sapi potong 0,8 - 1,2 kg/hari)",
  "(target ideal peternakan sapi 0,8 - 1,2 kg/hari)"
);
mContent = mContent.replace(
  "Buku Analisis Finansial Usaha Peternakan Sapi Potong dan Unggas Pedesaan",
  "Buku Analisis Finansial Usaha Peternakan Sapi dan Unggas Pedesaan"
);
mContent = mContent.replace(
  "Kalkulasi matematis pada usaha penggemukan sapi potong di Belitang",
  "Kalkulasi matematis pada usaha peternakan sapi di Belitang"
);
mContent = mContent.replace(
  "Peralatan pengolahan pakan dan pemeliharaan sapi potong di OKU Timur:",
  "Peralatan pengolahan pakan dan pemeliharaan pada peternakan sapi di OKU Timur:"
);
mContent = mContent.replace(
  "Pedoman Teknis Sarana dan Peralatan Peternakan Sapi Potong & Unggas",
  "Pedoman Teknis Sarana dan Peralatan Peternakan Sapi & Unggas"
);
mContent = mContent.replace(
  "Sektor peternakan sapi potong dan unggas di Kabupaten OKU Timur",
  "Sektor peternakan sapi dan unggas di Kabupaten OKU Timur"
);
mContent = mContent.replace(
  "mutu genetik sapi potong lokal menjadi sapi unggul",
  "mutu genetik ternak sapi lokal menjadi sapi unggul"
);
mContent = mContent.replace(
  "Pedoman Perhitungan Ransum dan Evaluasi Produktivitas Sapi Potong",
  "Pedoman Perhitungan Ransum dan Evaluasi Produktivitas Peternakan Sapi"
);
mContent = mContent.replace(
  "badge: dayNum === 4 ? 'Mesin Chopper & Biogas' : 'Sapi Potong & Unggas',",
  "badge: dayNum === 4 ? 'Mesin Chopper & Biogas' : 'Peternakan Sapi & Unggas',"
);
mContent = mContent.replace(
  "desc: dayNum === 4 ? 'Mesin Chopper Pakan, Drum Silase, Nipple Drinker, Brooder & Biogas dalam Analisis STEM' : 'Sapi Potong, Unggas, Silase Pakan, Chopper, Biogas & ADG'",
  "desc: dayNum === 4 ? 'Mesin Chopper Pakan, Drum Silase, Nipple Drinker, Brooder & Biogas dalam Analisis STEM' : 'Peternakan Sapi, Unggas, Silase Pakan, Chopper, Biogas & ADG'"
);
mContent = mContent.replace(
  "badge: 'Sapi Potong, Kambing, Ayam & Bebek',",
  "badge: 'Peternakan Sapi, Kambing, Ayam & Bebek',"
);
mContent = mContent.replace(
  "objectExamples: 'Kandang Sapi Potong/Penggemukan, Kandang Kambing/Domba",
  "objectExamples: 'Peternakan Sapi, Kandang Kambing/Domba"
);
mContent = mContent.replace(
  "dan jenis hewan ternak yang Anda amati (sapi potong, kambing, ayam petelur/pedaging, atau bebek)",
  "dan jenis hewan ternak yang Anda amati (peternakan sapi, kambing, ayam petelur/pedaging, atau bebek)"
);
fs.writeFileSync(mPath, mContent, 'utf8');
console.log('✔ Updated js/modules/materi-nonfieldtrip.js');

// 4. siswa/dashboard.html
const dPath = path.join(__dirname, '../siswa/dashboard.html');
let dContent = fs.readFileSync(dPath, 'utf8');

dContent = dContent.replace(
  "heading: 'Refleksi Analisis STEM: Sektor Peternakan Sapi Potong & Unggas',",
  "heading: 'Refleksi Analisis STEM: Sektor Peternakan Sapi & Unggas',"
);
dContent = dContent.replace(
  "badge: 'Sektor: Peternakan Sapi Potong & Unggas',",
  "badge: 'Sektor: Peternakan Sapi & Unggas',"
);
fs.writeFileSync(dPath, dContent, 'utf8');
console.log('✔ Updated siswa/dashboard.html');

// 5. siswa/dokumentasi.html
const dokPath = path.join(__dirname, '../siswa/dokumentasi.html');
let dokContent = fs.readFileSync(dokPath, 'utf8');

dokContent = dokContent.replace(
  "title: 'Day 3: Observasi Lapangan Sektor Peternakan Sapi Potong & Unggas',",
  "title: 'Day 3: Observasi Lapangan Sektor Peternakan Sapi & Unggas',"
);
dokContent = dokContent.replace(
  "title: 'Dokumentasi Observasi: Peternakan Sapi Potong & Unggas',",
  "title: 'Dokumentasi Observasi: Peternakan Sapi & Unggas',"
);
fs.writeFileSync(dokPath, dokContent, 'utf8');
console.log('✔ Updated siswa/dokumentasi.html');

console.log('=== ALL REPLACEMENTS COMPLETED ===');
