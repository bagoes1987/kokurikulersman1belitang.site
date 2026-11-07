// Patch Non-Field Trip LKPD, Bank Soal, and Materi to generalize Peternakan
// and enrich Pertanian, Perkebunan, Peternakan, Perdagangan & UMKM, Koperasi, and Agen BRILink di OKU Timur.
const fs = require('fs');
const path = require('path');

console.log('=== START PATCHING NON-FIELD TRIP CURRICULUM ===');

// 1. PATCH js/modules/lkpd-nonfieldtrip.js
const lkpdPath = path.join(__dirname, '../js/modules/lkpd-nonfieldtrip.js');
let lkpd = fs.readFileSync(lkpdPath, 'utf8');

// A. Update NFT_DAY2_SECTOR_DATA peternakan
const newPeternakanD2 = `peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba & Unggas: Ayam/Bebek)',
      cultureTheme: 'Pengetahuan pemeliharaan terpadu, keterampilan keluarga, dan etos kerja peternak',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      questions: [
        { id: 1, text: 'Jenis ternak apa yang dipelihara (sapi potong/perah, kambing/domba, ayam broiler/petelur/kampung, atau bebek/itik) dan apa tujuan pemeliharaannya?', hint: 'Kaji jenis komoditas ternak lokal OKU Timur, tujuan budidaya (penggemukan/fattening, tabungan Idul Adha, produksi telur konsumsi harian, kemitraan broiler, atau bibit)...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu menentukan jenis ransum pakan dan manajemen perawatan ternak harian?', hint: 'Kaji mencari rumput hijauan odot/gajah, fermentasi amoniasi jerami padi sawah melimpah Belitang, konsentrat dedak padi lokal, pakan pelet, jadwal minum, dan sanitasi kandang...' },
        { id: 3, text: 'Apakah keterampilan beternak diperoleh dari tradisi keluarga turun-temurun, kelompok ternak, atau bimbingan penyuluh/mantri peternakan?', hint: 'Kaji kebiasaan beternak keluarga, kemitraan peternakan ayam, paguyuban peternak, atau bimbingan poskeswan/mantri inseminator OKU Timur...' },
        { id: 4, text: 'Bagaimana pembagian tugas keluarga dalam memberi pakan, membersihkan kandang, dan menjaga biosekuriti kesehatan ternak?', hint: 'Kaji peran ayah/ibu/anak dalam mencari pakan hijauan, pemberian makan terjadwal, pembersihan kotoran ternak, dan pencegahan wabah penyakit (seperti PMK atau flu burung)...' },
        { id: 5, text: 'Apakah ada peralatan atau teknologi yang digunakan untuk meningkatkan efisiensi dan kesehatan ternak?', hint: 'Kaji teknologi mesin perajang chopper pakan, kawin suntik (Inseminasi Buatan/IB), kandang panggung kambing, instalasi nipple drinker ayam, penghangat brooder, atau pemanfaatan kotoran jadi biogas/pupuk bokashi sawah...' }
      ]
    },
    perdagangan:`;

lkpd = lkpd.replace(/peternakan:\s*\{\s*key:\s*'peternakan',\s*name:\s*'Peternakan \(Sapi Potong, Kambing & Unggas\)'[\s\S]*?\}\s*,\s*perdagangan:/, newPeternakanD2);

// B. Update NFT_DAY2_SECTOR_DATA perdagangan
const newPerdaganganD2 = `perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan & UMKM (Pasar Gumawang/Martapura, Toko Sembako, Kios Saprotan & Kuliner Lokal)',
      cultureTheme: 'Kepercayaan, komunikasi, etika niaga, dan modal sosial pelanggan',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      questions: [
        { id: 1, text: 'Barang dagangan atau produk apa yang Bapak/Ibu sediakan kepada pelanggan di wilayah ini?', hint: 'Kaji jenis dagangan sembako, sarana produksi tani/pupuk/benih (saprotan), hasil bumi pasar Gumawang/Martapura, kuliner olahan lokal, atau pakaian/jasa...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu membangun kepercayaan dan menjaga hubungan langganan dengan para pembeli?', hint: 'Kaji kejujuran timbangan/takaran, keramahan tegur sapa khas warga, kepastian ketersediaan stok barang, dan harga bersahabat...' },
        { id: 3, text: 'Apakah musim panen padi/sawit/karet memengaruhi omzet penjualan toko atau kios Bapak/Ibu?', hint: 'Kaji lonjakan daya beli petani saat panen raya rendeng/gadu, sistem tempo/kredit bayar saat panen padi, dan perputaran arus kas pedagang...' },
        { id: 4, text: 'Apakah Bapak/Ibu sudah menggunakan media sosial, layanan transaksi nontunai (QRIS), atau layanan perbankan digital?', hint: 'Kaji transaksi QRIS bank, pemesanan via WhatsApp, kerja sama agen perbankan, atau pembukuan keuangan toko...' },
        { id: 5, text: 'Bagaimana cara Bapak/Ibu menghadapi persaingan dagang dan perubahan kebutuhan belanja konsumen saat ini?', hint: 'Kaji strategi melengkapi varian barang, pelayanan antar pesanan ke rumah, kenyamanan toko, dan adaptasi harga...' }
      ]
    },
    industri:`;

lkpd = lkpd.replace(/perdagangan:\s*\{\s*key:\s*'perdagangan',\s*name:\s*'Perdagangan & Jasa \(Pasar Tradisional, Toko, Bengkel & Transportasi\)'[\s\S]*?\}\s*,\s*industri:/, newPerdaganganD2);

// C. Update NFT_DAY2_SECTOR_DATA formal (Lembaga Keuangan Mikro, Koperasi, Agen BRILink & Layanan Publik)
const newFormalD2 = `formal: {
      key: 'formal',
      name: 'Lembaga Keuangan Mikro, Koperasi, Agen BRILink & Layanan Publik',
      cultureTheme: 'Integritas, etika pelayanan, inklusi keuangan desa, dan tanggung jawab profesional',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
      questions: [
        { id: 1, text: 'Apa tugas, peranan pokok, atau layanan utama yang Bapak/Ibu sediakan bagi masyarakat pedesaan OKU Timur?', hint: 'Kaji layanan inklusi perbankan (tarik tunai bansos/transfer hasil panen via Agen BRILink/Laku Pandai, permodalan Koperasi Tani/KUD, simpan pinjam desa, atau pelayanan administrasi/pendidikan/kesehatan)...' },
        { id: 2, text: 'Nilai, etika, dan prinsip kejujuran apa yang wajib dijaga dalam melayani transaksi keuangan atau kebutuhan warga?', hint: 'Kaji ketelitian nominal uang, keamanan PIN/data nasabah, transparansi biaya administrasi, keramahan pelayanan 5S, dan integritas...' },
        { id: 3, text: 'Bagaimana peran layanan ini dalam membantu petani dan warga desa yang tempat tinggalnya jauh dari kantor cabang bank di kota?', hint: 'Kaji penghematan ongkos dan waktu transportasi warga desa ke Belitang/Martapura, pencairan cepat bantuan pemerintah, dan kemudahan modal...' },
        { id: 4, text: 'Bagaimana pengelolaan likuiditas uang kas, pembukuan harian, dan koordinasi dengan lembaga induk perbankan/pemerintah?', hint: 'Kaji ketersediaan modal tunai agen/koperasi saat masa panen raya atau bantuan cair, penggunaan mesin EDC/aplikasi digital, dan rekonsiliasi saldo...' },
        { id: 5, text: 'Bagaimana perkembangan teknologi digital (EDC, mobile banking, sistem informasi online) mengubah kecepatan dan kemudahan layanan Bapak/Ibu?', hint: 'Kaji keandalan sinyal internet di pedesaan, kemudahan transaksi digital 24 jam, pencatatan otomatis transaksi, dan tantangan teknis lapangan...' }
      ]
    }
  };`;

lkpd = lkpd.replace(/formal:\s*\{\s*key:\s*'formal',\s*name:\s*'Pekerjaan Formal \(Aparatur Sipil Negara, Guru, Nakes, BUMN\/Bank & Swasta\)'[\s\S]*?\}\s*\}\s*;/, newFormalD2);

// D. Update Day 2 Select Options
lkpd = lkpd.replace(
  '<option value="peternakan" ${selSector === \'peternakan\' ? \'selected\' : \'\'}>4. Peternakan (Sapi Potong, Kambing, Unggas)</option>',
  '<option value="peternakan" ${selSector === \'peternakan\' ? \'selected\' : \'\'}>4. Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba, Ayam Broiler/Petelur &amp; Bebek)</option>'
);
lkpd = lkpd.replace(
  '<option value="perdagangan" ${selSector === \'perdagangan\' ? \'selected\' : \'\'}>5. Perdagangan &amp; Jasa (Pasar Gumawang / Martapura, Toko, Bengkel Alsintan, Logistik)</option>',
  '<option value="perdagangan" ${selSector === \'perdagangan\' ? \'selected\' : \'\'}>5. Perdagangan &amp; UMKM (Pasar Gumawang / Martapura, Toko Sembako, Kios Saprotan &amp; Kuliner Lokal)</option>'
);
lkpd = lkpd.replace(
  '<option value="formal" ${selSector === \'formal\' ? \'selected\' : \'\'}>7. Pekerjaan Formal (Aparatur Sipil Negara/ASN, Guru, Nakes, BUMN/Bank/Swasta)</option>',
  '<option value="formal" ${selSector === \'formal\' ? \'selected\' : \'\'}>7. Lembaga Keuangan Mikro, Koperasi, Agen BRILink &amp; Layanan Publik</option>'
);

// E. Update NFT_DAY3_SECTOR_DATA peternakan
const newD3Peternakan = `peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba & Unggas/Ayam/Bebek)',
      badge: 'Sektor Peternakan Umum OKU Timur',
      icon: 'pets',
      colorClass: 'amber',
      scalePlaceholder: 'Contoh: 6 Ekor Sapi / 20 Ekor Kambing / 1.000 Ekor Ayam Broiler / 250 Ekor Bebek Petelur',
      scaleLabel: 'Populasi Ternak yang Dikelola (Jumlah Ekor):',
      sainsA1Label: '1. Kondisi Kandang, Sirkulasi Udara, Sanitasi & Biosekuriti Lingkungan:',
      sainsA1Hint: 'Amati dan tanyakan: konstruksi lantai kandang (semen bersekat untuk sapi, panggung kayu/bambu untuk kambing, sistem postal sekam/baterai untuk unggas ayam/bebek), kelancaran sirkulasi udara dan sinar matahari pagi, kebersihan tempat pakan/minum, serta pengelolaan limbah kotoran...',
      sainsA2Label: '2. Kondisi Fisik Ternak, Laju Pertumbuhan/Produksi & Manajemen Nutrisi Pakan:',
      sainsA2Hint: 'Amati dan tanyakan: postur dan bobot ternak, kebersihan bulu, nafsu makan, produksi harian (daging, telur, susu), serta formula ransum pakan (rumput gajah odot, jerami padi sawah fermentasi, dedak bekatul Belitang, konsentrat, ampas tahu)...',
      tekB1Label: '1. Identifikasi Peralatan Kerja, Mesin & Teknologi Peternakan yang Digunakan:',
      tekB1Hint: 'Catat peralatan dan teknologi yang diamati: mesin pencacah rumput/chopper bertenaga bensin/listrik, teknologi kawin suntik (Inseminasi Buatan/IB), drum/silase fermentasi anaerob pakan, instalasi nipple drinker unggas, pemanas gasolec/brooder, timbangan gantung/palet digital, atau instalasi biogas kotoran ternak...',
      tekB2Label: '2. Status Kepemilikan Peralatan/Mesin, Sumber Energi & Biaya Operasional:',
      tekB2Hint: 'Tanyakan ke peternak: biaya operasional BBM/listrik untuk mesin chopper atau pemanas DOC, biaya jasa mantri inseminator suntik IB / vaksinasi, atau biaya pengadaan konsentrat dedak/pelet pakan per periode pemeliharaan...',
      engC1Label: '1. Kendala Teknis Lapangan yang Dihadapi Peternak di OKU Timur:',
      engC1Hint: 'Tanyakan ke peternak: Kendala teknis apa yang paling menantang? (Misal: pasokan rumput hijauan menipis saat kemarau sawah, bau kotoran kandang dekat permukiman, penyakit musiman seperti PMK sapi atau ND/flu burung ayam, fluktuasi harga pakan konsentrat, atau bibit bakalan mahal)...',
      engC2Label: '2. Solusi Rekayasa Praktis & Inovasi yang Diterapkan oleh Peternak:',
      engC2Hint: 'Tanyakan dan catat solusinya: Bagaimana rekayasa praktis yang diterapkan peternak? (Misal: mengolah amoniasi jerami padi melimpah sisa panen sawah Belitang menjadi silase awet, mencampur probiotik pada sekam/litter kandang penekan amonia bau kotoran, merakit instalasi pembuangan kotoran ke bak biogas/kompos pupuk sawah, atau merancang palung pakan anti-cecer)...',
      engC3Label: '3. Evaluasi & Catatan Siswa terhadap Solusi Rekayasa Peternak:',
      engC3Hint: 'Tuliskan catatan analisis Anda: Apakah teknik pengolahan pakan silase, rekayasa kandang sehat, atau pemanfaatan limbah kotoran menjadi pupuk/biogas terbukti efektif memangkas biaya pemeliharaan dan ramah lingkungan?'
    }
  };`;

lkpd = lkpd.replace(/peternakan:\s*\{\s*key:\s*'peternakan',\s*name:\s*'Peternakan Pedesaan \(Sapi Potong & Unggas\)'[\s\S]*?\}\s*\}\s*;/, newD3Peternakan);

// F. Update Day 3 Select Option
lkpd = lkpd.replace(
  '<option value="peternakan" ${selSector === \'peternakan\' ? \'selected\' : \'\'}>4. Peternakan Pedesaan (Sapi Potong &amp; Unggas, Silase Pakan, Chopper &amp; Biogas)</option>',
  '<option value="peternakan" ${selSector === \'peternakan\' ? \'selected\' : \'\'}>4. Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba, Ayam Broiler/Petelur &amp; Bebek, Silase Pakan, Chopper &amp; Biogas)</option>'
);

// G. Update NFT_DAY4_TOOL_GUIDE peternakan
const newD4Peternakan = `peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba & Unggas: Ayam/Bebek)',
      icon: 'pets',
      badge: 'Alat & Mesin Peternakan Terpadu OKU Timur',
      examples: 'Mesin Pencacah Rumput/Hijauan (Chopper Machine), Drum Fermentasi Silase, Timbangan Palet Sapi / Timbangan Gantung Digital Unggas, Pita Ukur Bobot (Rondo), Instalasi Minum Otomatis (Nipple Drinker Unggas & Automatic Waterer Sapi/Kambing), Pemanas Anak Ayam (Brooder Gasolec/Listrik), Kandang Panggung Kambing, Reaktor Biogas, Tempat Telur (Egg Tray), atau Spuit Vaksin Ternak Socorex & Gun Inseminasi Buatan (IB)',
      apdExamples: 'Sepatu boot kandang anti-slip, masker respirator penangkal gas amonia & debu pakan, sarung tangan lateks/karet, wearpack biosekuriti, kacamata pelindung saat mencacah rumput',
      sciencePrompt: 'Jelaskan prinsip Fisika, Kimia, dan Biologi pada alat peternakan yang Anda amati! (Contoh: biologi perluasan permukaan serat rumput hasil cacahan mesin chopper agar mudah dicerna mikroba rumen sapi atau tembolok ayam, biokimia fermentasi anaerob bakteri asam laktat di drum silase jerami padi, fisika katup tekanan air nipple drinker agar sekam kering bebas amonia, termodinamika radiasi pemanas brooder DOC, atau biokimia metanogenesis CH4 pada reaktor biogas kotoran ternak).',
      techPrompt: 'Jelaskan teknologi mesin penggerak, sistem otomasi, atau bioteknologi pada peralatan tersebut! (Contoh: motor bensin/diesel 5,5–7 HP dengan transmisi puli V-belt pada mesin chopper, regulator tekanan air & medikator otomatis pada perpipaan nipple drinker, thermostat pengatur kipas exhaust kandang, atau termos kriogenik nitrogen cair -196°C pada peralatan Inseminasi Buatan).',
      engPrompt: 'Jelaskan rancang bangun mekanis (Engineering), konstruksi pisau/kandang/reaktor, ergonomi, serta cara perawatannya! (Contoh: susunan pisau baja karbon miring pada roda gila/flywheel mesin chopper dan corong lontar sentrifugal, desain lantai panggung bilah kayu/bambu kandang kambing berjarak 1,5 cm agar kotoran jatuh, kemiringan lantai kandang sapi 2°–5° menuju selokan bio-slurry, pengaturan tinggi pipa nipple sesuai umur ayam, atau konstruksi kubah beton kedap gas pada biodigester).',
      mathPrompt: 'Tuliskan perhitungan Matematika kapasitas kerja alat, kebutuhan ransum/ADG, dan perbandingan efisiensi biaya memakai alat tersebut! (Contoh: kapasitas cacah mesin chopper [600–1.000 kg rumput/jam dengan ±1 liter bensin] dibandingkan sabit manual, perhitungan ransum harian 10% bobot badan sapi atau FCR ayam broiler 1,5–1,6, estimasi bobot dengan rumus Schrool & ADG, atau penghematan tabung LPG dari instalasi biogas).'
    }
  };`;

lkpd = lkpd.replace(/peternakan:\s*\{\s*key:\s*'peternakan',\s*name:\s*'Peternakan Sapi Potong & Unggas'[\s\S]*?\}\s*\}\s*;/, newD4Peternakan);

fs.writeFileSync(lkpdPath, lkpd, 'utf8');
console.log('✔ Successfully patched js/modules/lkpd-nonfieldtrip.js');

// 2. PATCH js/modules/asesmen-nonfieldtrip.js
const asesmenPath = path.join(__dirname, '../js/modules/asesmen-nonfieldtrip.js');
let asesmen = fs.readFileSync(asesmenPath, 'utf8');
asesmen = asesmen.replace(
  "'peternakan': 'Peternakan Sapi Potong & Unggas',",
  "'peternakan': 'Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba & Unggas)',"
);
asesmen = asesmen.replace(
  "'keuangan': 'Koperasi, Agen BRI-Link & Jasa Keuangan',",
  "'keuangan': 'Koperasi, Agen BRILink & Keuangan Mikro OKU Timur',"
);
fs.writeFileSync(asesmenPath, asesmen, 'utf8');
console.log('✔ Successfully patched js/modules/asesmen-nonfieldtrip.js');

// 3. PATCH js/modules/materi-nonfieldtrip.js
const materiPath = path.join(__dirname, '../js/modules/materi-nonfieldtrip.js');
let materi = fs.readFileSync(materiPath, 'utf8');

// Day 1 Card E
materi = materi.replace(
  "'Potensi sektor perkebunan rakyat (karet, kelapa sawit), peternakan sapi potong terpadu, dan perikanan budidaya air tawar (kolam patin/lele).',",
  "'Potensi sektor perkebunan rakyat (karet, kelapa sawit), peternakan rakyat terpadu (sapi potong/perah, kambing, domba, unggas ayam & bebek), perikanan budidaya air tawar (kolam patin/lele), serta jaringan perdagangan UMKM, Koperasi, dan Agen BRILink pedesaan.',"
);

// Day 3 Peternakan
materi = materi.replace(
  "name: 'Peternakan Sapi & Unggas',",
  "name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',"
);
materi = materi.replace(
  "desc: 'Sapi Potong, Unggas, Fermentasi Jerami Silase, Chopper Pakan, Reaktor Biogas & ADG',",
  "desc: 'Sapi, Kambing, Unggas Ayam & Bebek, Fermentasi Jerami Silase, Chopper Pakan, Reaktor Biogas & ADG/FCR',"
);

// Day 4 Peternakan
materi = materi.replace(
  "name: 'Peternakan Sapi Potong & Unggas',",
  "name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',"
);
materi = materi.replace(
  "title: 'Eksplorasi Peralatan, Perlengkapan & Mesin Peternakan Sapi dan Unggas',",
  "title: 'Eksplorasi Peralatan, Perlengkapan & Mesin Peternakan Terpadu (Sapi, Kambing & Unggas)',"
);

fs.writeFileSync(materiPath, materi, 'utf8');
console.log('✔ Successfully patched js/modules/materi-nonfieldtrip.js');

// 4. PATCH js/data/bank-soal-nonfieldtrip.js
const bankSoalPath = path.join(__dirname, '../js/data/bank-soal-nonfieldtrip.js');
let bankSoal = fs.readFileSync(bankSoalPath, 'utf8');

// Day 1 Q168
bankSoal = bankSoal.replace(
  '"text": "Sapi potong dan kambing"',
  '"text": "Sapi (potong/perah), kambing/domba, serta unggas (ayam/bebek)"'
);
bankSoal = bankSoal.replace(
  '"explanation": "Peternakan sapi potong (seperti sapi PO dan Bali) serta kambing merupakan komoditas ternak utama pedesaan di OKU Timur."',
  '"explanation": "Peternakan rakyat di OKU Timur mencakup ruminansia (sapi potong Bali/PO, kambing/domba) serta unggas (ayam broiler/petelur dan bebek/itik sawah komering)."'
);

// Day 1 Q190
bankSoal = bankSoal.replace(
  '"question": "Sapi potong milik peternak di OKU Timur dibeli dengan harga bibit Rp12.000.000. Setelah digemukkan selama 8 bulan dengan pakan jerami fermentasi dan ampas tahu, sapi laku Rp20.000.000 dengan biaya pakan Rp3.500.000. Keuntungan peternak adalah...",',
  '"question": "Seekor sapi bakalan milik peternak rakyat di OKU Timur dibeli dengan modal bibit Rp12.000.000. Setelah digemukkan selama 8 bulan dengan pakan fermentasi jerami sawah dan ampas tahu dedak Belitang, sapi laku Rp20.000.000 dengan total biaya pakan Rp3.500.000. Berapakah keuntungan bersih peternak tersebut?",'
);

// Day 1 Q198
bankSoal = bankSoal.replace(
  '"question": "Mendiagnosis kendala peternak sapi potong pedesaan dalam mengembangkan skala usaha menjadi peternakan modern komersial adalah...",',
  '"question": "Mendiagnosis kendala umum peternak rakyat (ruminansia sapi/kambing dan unggas ayam/bebek) di pedesaan OKU Timur dalam mengembangkan skala usaha menjadi peternakan modern komersial adalah...",'
);

// Day 1 Q176: Sharpen Agen BRILink
bankSoal = bankSoal.replace(
  '"question": "Peran agen perbankan Laku Pandai di pelosok desa Belitang dalam mendorong inklusi keuangan masyarakat petani adalah...",',
  '"question": "Peran strategis Agen BRILink dan agen Laku Pandai di pelosok pedesaan OKU Timur dalam mendorong inklusi keuangan masyarakat petani dan pedagang kecil adalah...",'
);

// Day 2 Q287
bankSoal = bankSoal.replace(
  '"question": "Bangsa sapi potong pedaging yang paling banyak dipelihara secara turun-temurun oleh para petani di pedesaan Belitang adalah...",',
  '"question": "Bangsa ternak sapi pedaging yang paling adaptif dan banyak dipelihara secara turun-temurun oleh peternak di pedesaan Belitang OKU Timur adalah...",'
);

// Day 2 Q290
bankSoal = bankSoal.replace(
  '"question": "Sistem integrasi tanaman padi sawah dan ternak sapi potong (crop-livestock integration) di Belitang memberikan keuntungan simbiosis berupa...",',
  '"question": "Sistem integrasi tanaman pangan padi sawah dan peternakan rakyat (crop-livestock integration) di Belitang OKU Timur memberikan keuntungan simbiosis berupa...",'
);

// Day 2 Q304
bankSoal = bankSoal.replace(
  '"question": "Peternak sapi potong di OKU Timur yang menyiapkan sapinya untuk penjualan Idul Adha menerapkan program penggemukan (fattening) dengan cara...",',
  '"question": "Peternak ruminansia (sapi potong dan kambing) di OKU Timur yang menyiapkan hewan ternaknya untuk momen penjualan Idul Adha menerapkan program penggemukan (fattening) dengan cara...",'
);

// Day 2 Q319
bankSoal = bankSoal.replace(
  '"question": "Menilai keberhasilan program Inseminasi Buatan (IB) kawin suntik pada sapi potong di OKU Timur, faktor kunci keberhasilan di tingkat peternak adalah...",',
  '"question": "Menilai keberhasilan program Inseminasi Buatan (IB) kawin suntik pada ternak sapi dan kambing di OKU Timur, faktor kunci keberhasilan di tingkat peternak adalah...",'
);

// Day 3 Peternakan Questions (Q151, Q152, Q154, Q158, Q159, Q162, Q175, Q177, Q179, Q180, Q199)
bankSoal = bankSoal.replace(
  '"question": "Sapi potong tergolong hewan ruminansia (memamah biak) dengan lambung majemuk terdiri dari 4 bagian. Bagian lambung manakah yang berfungsi sebagai ruang fermentasi utama tempat hidup miliaran bakteri dan protozoa pengurai serat selulosa pakan hijauan?",',
  '"question": "Ternak ruminansia (seperti sapi dan kambing/domba) tergolong hewan memamah biak dengan lambung majemuk terdiri dari 4 bagian. Bagian lambung manakah yang berfungsi sebagai ruang fermentasi utama tempat hidup miliaran mikroba pengurai serat selulosa hijauan pakan?",'
);

bankSoal = bankSoal.replace(
  '"question": "Dalam ilmu nutrisi ternak sapi potong di OKU Timur, kebutuhan pakan hijauan segar (seperti rumput gajah odot) per hari dihitung berdasarkan persentase bobot badan hidup ternak, yaitu sebesar...",',
  '"question": "Dalam ilmu nutrisi ternak ruminansia (sapi dan kambing) di OKU Timur, kebutuhan pakan hijauan segar (seperti rumput gajah odot) per hari dihitung berdasarkan persentase bobot badan hidup ternak, yaitu sebesar...",'
);

bankSoal = bankSoal.replace(
  '"question": "Pemberian daun leguminosa seperti Gamal (Gliricidia sepium) atau Lamtoro (Leucaena leucocephala) pada ternak sapi potong sangat penting dalam ransum pakan karena berfungsi sebagai...",',
  '"question": "Pemberian daun leguminosa seperti Gamal (Gliricidia sepium) atau Lamtoro (Leucaena leucocephala) pada ternak ruminansia (sapi dan kambing) sangat penting dalam ransum pakan karena berfungsi sebagai...",'
);

bankSoal = bankSoal.replace(
  '"question": "Parasit cacing hati (Fasciola gigantica) sering menyerang sapi potong yang digembalakan di areal persawahan atau rawa lebak OKU Timur. Mengapa keberadaan siput air tawar kecil (Lymnaea rubiginosa) menjadi kunci penularan cacing hati ini?",',
  '"question": "Parasit cacing hati (Fasciola gigantica) dapat menyerang ternak ruminansia (sapi, kerbau, kambing) yang digembalakan di areal persawahan atau rawa lebak OKU Timur. Mengapa keberadaan siput air tawar kecil (Lymnaea rubiginosa) menjadi kunci penularan cacing hati ini?",'
);

bankSoal = bankSoal.replace(
  '"question": "Pemberian garam dapur (NaCl) dan mineral blok jilat (mineral lick block) di dalam kandang sapi potong di Belitang bertujuan untuk memenuhi kebutuhan sains faal berupa...",',
  '"question": "Pemberian garam dapur (NaCl) dan mineral blok jilat (mineral lick block) di dalam kandang ternak ruminansia (sapi dan kambing) di Belitang bertujuan untuk memenuhi kebutuhan sains faal berupa...",'
);

bankSoal = bankSoal.replace(
  '"question": "Teknologi Inseminasi Buatan (IB / Kawin Suntik) pada sapi potong di OKU Timur menggunakan sperma beku (straw semen). Di dalam wadah apa straw semen beku tersebut disimpan agar sel sperma tetap hidup dorman selama bertahun-tahun?",',
  '"question": "Teknologi Inseminasi Buatan (IB / Kawin Suntik) pada ternak sapi di OKU Timur menggunakan sperma beku (straw semen). Di dalam wadah apa straw semen beku tersebut disimpan agar sel sperma tetap hidup dorman selama bertahun-tahun?",'
);

bankSoal = bankSoal.replace(
  '"question": "Rancangan lantai kandang sapi potong yang ideal di Belitang dibuat dengan kemiringan lereng 2° hingga 3° (kemiringan 2-3 cm per 1 meter panjang lantai) ke arah parit pembuangan belakang. Apa fungsi rekayasa sipil kandang ini?",',
  '"question": "Rancangan lantai kandang ternak (sapi dan kambing) yang ideal di Belitang dibuat dengan kemiringan lereng 2° hingga 3° (kemiringan 2-3 cm per 1 meter panjang lantai) ke arah parit pembuangan belakang. Apa fungsi rekayasa sipil kandang ini?",'
);

bankSoal = bankSoal.replace(
  '"question": "Orientasi membujur bangunan kandang sapi potong yang benar di daerah beriklim tropis seperti OKU Timur adalah menghadap ke arah Barat - Timur. Alasan rekayasa termal arsitektur kandang ini adalah...",',
  '"question": "Orientasi membujur bangunan kandang ternak (sapi, kambing, maupun unggas) yang benar di daerah beriklim tropis seperti OKU Timur adalah menghadap ke arah Barat - Timur. Alasan rekayasa termal arsitektur kandang ini adalah...",'
);

bankSoal = bankSoal.replace(
  '"question": "Penyekatan kandang jepit (crush chute / handling crate) berbahan pipa besi galvanis kokoh dirancang peternak sapi potong di Belitang. Fungsi utama fasilitas kandang jepit ini adalah...",',
  '"question": "Penyekatan kandang jepit (crush chute / handling crate) berbahan pipa besi galvanis kokoh dirancang peternak sapi dan ruminansia di Belitang. Fungsi utama fasilitas kandang jepit ini adalah...",'
);

bankSoal = bankSoal.replace(
  '"question": "Dalam penampungan air minum sapi potong, pemasangan bak air otomatis berpengapung pelampung (automatic float water trough) memastikan ketersediaan air minum secara \'ad libitum\' (tak terbatas). Mengapa air minum sapi wajib ad libitum?",',
  '"question": "Dalam penampungan air minum ternak (sapi dan kambing), pemasangan bak air otomatis berpengapung pelampung (automatic float waterer) memastikan ketersediaan air minum secara \'ad libitum\' (tak terbatas). Mengapa air minum ternak wajib ad libitum?",'
);

bankSoal = bankSoal.replace(
  '"question": "Pembentukan Koperasi Peternak Sapi Potong di OKU Timur yang terhubung dengan lembaga perbankan syariah / KUR (Kredit Usaha Rakyat) Peternakan memecahkan kendala permodalan pengadaan bakalan sapi melalui...",',
  '"question": "Pembentukan Koperasi Peternak Rakyat (Sapi, Kambing & Unggas) di OKU Timur yang terhubung dengan lembaga perbankan mikro / program KUR Peternakan memecahkan kendala permodalan pengadaan bibit dan pakan melalui...",'
);

fs.writeFileSync(bankSoalPath, bankSoal, 'utf8');
console.log('✔ Successfully patched js/data/bank-soal-nonfieldtrip.js');

console.log('=== ALL NON-FIELD TRIP PATCHES COMPLETED ===');
