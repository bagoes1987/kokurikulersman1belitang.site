const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let content = fs.readFileSync(filePath, 'utf8');

// Update header text in sector card
content = content.replace(
  /\$\{dayNum === 4 \? 'Sektor Eksplorasi Peralatan &amp; Perlengkapan Kerja:' : 'Pilih Sektor Riset Unggulan OKU Timur:'\}/g,
  "${dayNum === 6 ? 'Sektor Video Mandiri: Rekayasa &amp; Finansial (5–10 Menit):' : (dayNum === 5 ? 'Sektor Video Mandiri: Sains &amp; Teknologi (5–10 Menit):' : (dayNum === 4 ? 'Sektor Eksplorasi Peralatan &amp; Perlengkapan Kerja:' : 'Pilih Sektor Riset Unggulan OKU Timur:'))}"
);

content = content.replace(
  /\$\{dayNum === 4 \? 'Pilih salah satu sektor di dropdown untuk menelaah peralatan kerjanya melalui 4 pilar STEM\.' : 'Pilih salah satu sektor di menu dropdown di bawah\. Kartu sektor terpilih akan otomatis tampil di bawahnya\.'\}/g,
  "${dayNum >= 5 ? 'Pilih salah satu sektor di dropdown untuk menampilkan panduan urutan naskah video presentasi HP (5–10 menit tanpa wawancara).' : (dayNum === 4 ? 'Pilih salah satu sektor di dropdown untuk menelaah peralatan kerjanya melalui 4 pilar STEM.' : 'Pilih salah satu sektor di menu dropdown di bawah. Kartu sektor terpilih akan otomatis tampil di bawahnya.')}"
);

// Update allSecs badge and desc for perkebunan to formal
const oldAllSecs = `              const allSecs = [
                { key: 'pertanian', name: 'Pertanian Padi Sawah', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Sawah & Saluran Irigasi' : 'Lumbung Pangan Komering'))), icon: 'agriculture', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Padi' : (dayNum === 4 ? 'Akses Jalan Usaha Tani, Hamparan Sawah Irigasi, Pasokan Pupuk & Angkutan Panen' : 'Padi Sawah, Saluran Irigasi BK, Traktor/Combine & Ubinan HPP')) },
                { key: 'perkebunan', name: 'Perkebunan Rakyat', badge: dayNum === 4 ? 'Jelajah Kebun & Rute Angkut' : 'Karet & Kelapa Sawit', icon: 'forest', desc: dayNum === 4 ? 'Rute Akses Kebun Karet/Sawit, Lingkungan Alam, Pasokan Bibit & Pengiriman Hasil' : 'Lateks Karet, Panen TBS Sawit, Rorak Lahan & Laba Pekebun' },
                { key: 'peternakan', name: 'Peternakan Rakyat OKU Timur', badge: dayNum === 4 ? 'Jelajah Kandang & Lingkungan' : 'Sapi, Kambing & Unggas', icon: 'pets', desc: dayNum === 4 ? 'Akses Lokasi Peternakan, Jarak dari Pemukiman, Pasokan Pakan & Distribusi Ternak' : 'Peternakan Sapi, Kambing, Unggas/Ayam, Chopper & Silase' },
                { key: 'perikanan', name: 'Perikanan Air Tawar', badge: dayNum === 4 ? 'Jelajah Kolam & Sumber Air' : 'Sentra Patin & Lele Belitang', icon: 'phishing', desc: dayNum === 4 ? 'Letak Kolam, Aliran Air Sungai/Irigasi, Pasokan Pakan Pelet & Penjualan Ikan' : 'Budidaya Patin/Lele, Kualitas Air, Kincir Aerasi & FCR Pakan' },
                { key: 'industri', name: 'Agro-Industri Pangan', badge: dayNum === 4 ? 'Jelajah Pengolahan & Distribusi' : 'Pabrik RMU, Tahu & Kemplang', icon: 'precision_manufacturing', desc: dayNum === 4 ? 'Akses Pabrik RMU/Tahu/Kemplang, Pasokan Bahan Baku & Pengiriman Produk ke Pasar' : 'Rendemen Beras RMU, Fermentasi Kedelai, Pemanggangan Kemplang & IPAL' },
                { key: 'perdagangan', name: 'Perdagangan & Saprotan', badge: dayNum === 4 ? 'Jelajah Letak Kios & Pasar' : 'Kios Saprotan & Grosir', icon: 'storefront', desc: dayNum === 4 ? 'Lokasi Kios di Pinggir Jalan, Alur Kiriman Distributor & Penjualan ke Warga' : 'Distribusi Pupuk Bersubsidi, Aplikasi i-Pubers, Ergonomi Gudang & Margin ITO' },
                { key: 'formal', name: 'Jasa Keuangan Mikro', badge: dayNum === 4 ? 'Jelajah Layanan & Akses Warga' : 'Agen BRILink & BUMDes', icon: 'account_balance', desc: dayNum === 4 ? 'Titik Lokasi Agen BRILink/BUMDes, Keramaian Lalu Lintas Warga & Akses Sinyal' : 'Transmisi 4G/LTE, Kriptografi Chip Kartu, Likuiditas Panen & Inklusi Desa' }
              ];`;

const newAllSecs = `              const allSecs = [
                { key: 'pertanian', name: 'Pertanian Padi Sawah', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Sawah & Saluran Irigasi' : 'Lumbung Pangan Komering'))), icon: 'agriculture', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Padi' : (dayNum === 4 ? 'Akses Jalan Usaha Tani, Hamparan Sawah Irigasi, Pasokan Pupuk & Angkutan Panen' : 'Padi Sawah, Saluran Irigasi BK, Traktor/Combine & Ubinan HPP')) },
                { key: 'perkebunan', name: 'Perkebunan Rakyat', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kebun & Rute Angkut' : 'Karet & Kelapa Sawit'))), icon: 'forest', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perkebunan' : (dayNum === 4 ? 'Rute Akses Kebun Karet/Sawit, Lingkungan Alam, Pasokan Bibit & Pengiriman Hasil' : 'Lateks Karet, Panen TBS Sawit, Rorak Lahan & Laba Pekebun')) },
                { key: 'peternakan', name: 'Peternakan Rakyat OKU Timur', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kandang & Lingkungan' : 'Sapi, Kambing & Unggas'))), icon: 'pets', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Peternakan' : (dayNum === 4 ? 'Akses Lokasi Peternakan, Jarak dari Pemukiman, Pasokan Pakan & Distribusi Ternak' : 'Peternakan Sapi, Kambing, Unggas/Ayam, Chopper & Silase')) },
                { key: 'perikanan', name: 'Perikanan Air Tawar', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kolam & Sumber Air' : 'Sentra Patin & Lele Belitang'))), icon: 'phishing', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perikanan' : (dayNum === 4 ? 'Letak Kolam, Aliran Air Sungai/Irigasi, Pasokan Pakan Pelet & Penjualan Ikan' : 'Budidaya Patin/Lele, Kualitas Air, Kincir Aerasi & FCR Pakan')) },
                { key: 'industri', name: 'Agro-Industri Pangan', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Pengolahan & Distribusi' : 'Pabrik RMU, Tahu & Kemplang'))), icon: 'precision_manufacturing', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Agro-Industri' : (dayNum === 4 ? 'Akses Pabrik RMU/Tahu/Kemplang, Pasokan Bahan Baku & Pengiriman Produk ke Pasar' : 'Rendemen Beras RMU, Fermentasi Kedelai, Pemanggangan Kemplang & IPAL')) },
                { key: 'perdagangan', name: 'Perdagangan & Saprotan', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Letak Kios & Pasar' : 'Kios Saprotan & Grosir'))), icon: 'storefront', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perdagangan' : (dayNum === 4 ? 'Lokasi Kios di Pinggir Jalan, Alur Kiriman Distributor & Penjualan ke Warga' : 'Distribusi Pupuk Bersubsidi, Aplikasi i-Pubers, Ergonomi Gudang & Margin ITO')) },
                { key: 'formal', name: 'Jasa Keuangan Mikro', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Layanan & Akses Warga' : 'Agen BRILink & BUMDes'))), icon: 'account_balance', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Keuangan Mikro' : (dayNum === 4 ? 'Titik Lokasi Agen BRILink/BUMDes, Keramaian Lalu Lintas Warga & Akses Sinyal' : 'Transmisi 4G/LTE, Kriptografi Chip Kartu, Likuiditas Panen & Inklusi Desa')) }
              ];`;

if (content.includes(oldAllSecs)) {
  content = content.replace(oldAllSecs, newAllSecs);
  console.log('Updated allSecs badges and descriptions.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('UI text in materi-nonfieldtrip.js patched successfully!');
