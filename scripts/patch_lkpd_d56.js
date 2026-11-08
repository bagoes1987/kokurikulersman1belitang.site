// FinCESTem 2026 - Patch LKPD Day 5 & Day 6 Non-Field Trip
// Video Presentasi Mandiri (5-10 Menit) - 7 Sektor Unggulan OKU Timur - Tanpa Wawancara

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'modules', 'lkpd-nonfieldtrip.js');
let content = fs.readFileSync(filePath, 'utf8');

const NEW_NFT_LKPD_VIDEO_SECTORS = {
  pertanian: {
    key: 'pertanian',
    name: 'Pertanian Padi Sawah',
    shortName: '🌾 Pertanian Padi',
    badge: 'Padi Sawah, Irigasi & Alsintan',
    icon: 'agriculture',
    examples: 'Lahan Sawah Padi Irigasi BK, Traktor Pembajak, Pompa Alkon, atau Mesin Combine Harvester',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Lokasi Sawah di Belitang',
      '01:30–04:30 | Penjelasan Pilar Sains: Karakteristik Tanah Aluvial, Air Irigasi BK & Kebutuhan Nutrisi Pupuk Padi',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Traktor Rotari, Sprayer Elektrik & Combine Harvester',
      '07:30–10:00 | Analisis Pengaruh Teknologi terhadap Efisiensi Kerja Tani, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (sains tanah aluvial, peran air irigasi BK, nutrisi N-P-K bagi vegetatif/generatif padi, fotosintesis, dan biologi hama tanaman)',
      tech: 'Teknologi pertanian yang ditunjukkan di video (traktor roda dua/empat, tangki semprot elektrik nozzle flat fan, pompa alkon, atau mesin combine harvester)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (pola tanam Jajar Legowo, rekayasa pintu air parit irigasi, atau desain mata pisau traktor)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (luas petak sawah, dosis takaran pupuk per hektar, atau kecepatan kerja combine harvester per jam)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Persawahan yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Trik Praktis Jajar Legowo, Pintu Air Parit & Perangkap Hama Tikus TBS',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Rincian Modal BOP 1 Ha, Bagi Hasil Panen, Omzet Gabah & Laba Bersih',
      '07:30–10:00 | Gagasan Solusi Inovasi Nilai Tambah (Hilirisasi Beras Kemasan 5 Kg), Prospek Masa Depan & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian modal operasional prapanen (olah tanah, benih, pupuk, upah tanam/semprot), bagi hasil mesin panen, harga jual gabah per kg, omzet, dan laba bersih per musim',
      constraints: 'Kendala utama di lapangan (serangan hama tikus/wereng, harga pupuk non-subsidi, cuaca ekstrem, atau harga gabah anjlok saat panen raya)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (hilirisasi gabah menjadi beras kemasan 5 kg berlabel desa, pengomposan jerami dengan trichoderma, dan pencatatan kas tani)'
    }
  },
  perkebunan: {
    key: 'perkebunan',
    name: 'Perkebunan Rakyat',
    shortName: '🌴 Perkebunan',
    badge: 'Karet, Kelapa Sawit & Komoditas',
    icon: 'forest',
    desc: 'Lateks Karet, Panen Sawit, Pisau Sadap, Galah Egrek & Laba Pekebun',
    examples: 'Kebun Karet Rakyat Desa, Perkebunan Kelapa Sawit, Lahan Singkong/Tebu, atau Kebun Buah Lokal',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Perkebunan Karet/Sawit di OKU Timur',
      '01:30–04:30 | Penjelasan Pilar Sains: Tekanan Turgor Sel Lateks Pagi Hari, Kimia Asam Format & Pematangan Sawit',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Pisau Sadap Lengkung, Talang Seng, Galah Egrek & Rorak Resapan',
      '07:30–10:00 | Analisis Pengaruh Presisi Alat terhadap Umur Produktif Pohon, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (tekanan turgor pembuluh getah saat fajar, reaksi asam format/semut menggumpalkan lateks, etilen pematangan buah sawit, dan kesuburan tanah)',
      tech: 'Teknologi perkebunan yang ditunjukkan di video (pisau sadap dorong/tarik bersudut 30°, talang seng getah, mangkok gantung kawat, atau galah aluminium egrek sawit)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (sudut kemiringan sayatan sadap, jarak tanam mata lima sawit, atau parit rorak penampung air hujan)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (populasi pohon per hektar, volume mangkok sadap, estimasi kilogram getah harian, atau tonase panen TBS sawit)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Perkebunan yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Talang Plastik Penahan Hujan, Konservasi Rorak & Tumpukan Pelepah Sawit',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Biaya Perawatan Kebun, Bagi Hasil Sadap 50:50, Harga UPPB & Laba Bersih',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Bokar Bersih Lelang UPPB Bebas Tatal/Air), Prospek Komoditas & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian biaya pemeliharaan bulanan (pupuk NPK/dolomit, herbisida), pembagian hasil sadap 50:50 antara pemilik dan penyadap, harga jual bokar/TBS, dan laba bersih bulanan',
      constraints: 'Kendala lapangan (hujan membasahi bidang sadap sehingga getah meluber, daun gugur saat kemarau, potongan timbangan kadar air tinggi oleh tengkulak, atau penyakit jamur)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (pemasangan talang pelindung hujan rain gutter, penjualan lelang bersama via UPPB kelompok tani, dan bokar bersih)'
    }
  },
  peternakan: {
    key: 'peternakan',
    name: 'Peternakan Rakyat OKU Timur',
    shortName: '🐄 Peternakan',
    badge: 'Sapi, Kambing, Ayam & Bebek',
    icon: 'pets',
    desc: 'Peternakan Sapi Potong, Kambing, Ayam, Mesin Chopper & Silase',
    examples: 'Kandang Sapi Penggemukan Desa, Peternakan Kambing/Domba, Kandang Ayam Broiler/Petelur, atau Bebek',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Lokasi Peternakan Desa',
      '01:30–04:30 | Penjelasan Pilar Sains: Sistem Lambung Rumen Sapi, Bakteri Pencerna Serat & Biokimia Silase Pakan',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Chopper Pencacah Rumput, Nipple Drinker & Desain Lantai Miring',
      '07:30–10:00 | Analisis Efisiensi Mekanisasi terhadap Pertambahan Bobot Ternak, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (biologi lambung ruminansia sapi, fermentasi anaerob bakteri asam laktat pakan silase, metabolisme protein konsentrat, dan sanitasi pencegahan PMK)',
      tech: 'Teknologi peternakan yang ditunjukkan di video (mesin chopper bertenaga motor bensin, drum kedap udara silase, sistem minum puting nipple drinker, atau pemanas kandang)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (kemiringan lantai kandang 2-5° untuk drainase feses/urin, ventilasi atap bertingkat monitor roof, atau palung pakan semen)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (kebutuhan pakan hijauan 10% bobot badan, takaran konsentrat dedak per hari, atau estimasi pertambahan bobot ADG)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Peternakan yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Ventilasi Atap Kandang Monitor, Pengolahan Jerami Amoniasi & Reaktor Biogas',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Bakalan Sapi, Biaya Konsentrat 100 Hari, Omzet Idul Adha & Laba Bersih',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Monetisasi Pupuk Bokashi Kemasan 20 Kg), Potensi Desa & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian modal pembelian bakalan (pedet), akumulasi biaya pakan konsentrat/obat selama 100 hari, harga jual sapi saat Idul Adha, omzet, dan laba bersih per ekor',
      constraints: 'Kendala utama peternak (sulit mencari rumput segar saat musim kemarau panjang, lonjakan harga pakan pabrikan, risiko penyakit menular, atau limbah bau kotoran kandang)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (pembuatan biogas rumah tangga dari limbah feses sapi, pengolahan ampas padat menjadi pupuk bokashi kemasan, dan amoniasi jerami)'
    }
  },
  perikanan: {
    key: 'perikanan',
    name: 'Perikanan Air Tawar',
    shortName: '🐟 Perikanan',
    badge: 'Kolam Patin, Lele & Nila Belitang',
    icon: 'phishing',
    desc: 'Budidaya Patin/Lele, Mutu Air, Kincir Aerasi & Rasio Pakan FCR',
    examples: 'Kolam Tanah Ikan Patin, Kolam Terpal Bioflok Lele/Nila, Pembenihan Ikan, atau Balai Benih Air Tawar',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Sentra Kolam Ikan Air Tawar Belitang',
      '01:30–04:30 | Penjelasan Pilar Sains: Parameter Mutu Air (DO, pH, Suhu), Bahaya Amonia & Kebutuhan Protein Pelet',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Kincir Air Aerator Elektrik, Pompa Alkon, Pipa Central Drain & Bak Sortir',
      '07:30–10:00 | Analisis Hubungan Oksigen Terlarut dengan Nafsu Makan Ikan, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (kadar oksigen terlarut DO minimal 3 mg/L, stabilitas pH air 6,5-8, bahaya amonia dari sisa pakan, dan protein pelet terapung 30-32%)',
      tech: 'Teknologi perikanan yang ditunjukkan di video (kincir aerator paddle wheel bertenaga listrik, pompa air alkon, pipa tengah central drain, atau ember grader sortir ukuran)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (kemiringan dasar kolam ke arah pipa pembuangan tengah, konstruksi talud tanggul penahan erosi kincir, atau paranet peneduh)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (luas dan volume kubikasi air kolam, padat tebar bibit per m2, takaran pakan harian 3-5% biomassa, atau persentase hidup SR)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Kolam Ikan yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Saluran Central Drain Penguras Lumpur & Budidaya Pakan Alternatif Maggot BSF',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Benih 3.000 Ekor, Biaya Pakan Pelet FCR, Omzet Panen & Laba Bersih',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Hilirisasi Fillet Patin Beku & Kemplang Ikan), Prospek Bisnis & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian biaya pengadaan benih, total belanja sak pelet selama 6 bulan, perhitungan rasio pakan FCR, harga jual ikan patin per kg, omzet panen, dan laba bersih per siklus',
      constraints: 'Kendala budidaya (mahalnya pakan pelet pabrik yang menguras 70% biaya, kematian mendadak akibat air hujan asam yang menurunkan pH, atau harga anjlok dipermainkan tengkulak)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (budidaya maggot BSF untuk menekan biaya pakan hingga 30%, aplikasi probiotik penjaga air, dan pembuatan produk olahan fillet/kemplang)'
    }
  },
  industri: {
    key: 'industri',
    name: 'Agro-Industri Pangan',
    shortName: '🏭 Agro-Industri',
    badge: 'Pabrik RMU, Tahu & Kemplang',
    icon: 'precision_manufacturing',
    desc: 'Penggilingan Padi RMU, Tahu-Tempe, Kemplang, Rendemen & Mesin',
    examples: 'Pabrik Penggilingan Padi (RMU) Beras, Pabrik Tahu-Tempe Kedelai, Rumah Produksi Kemplang Panggang/Goreng',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Pabrik Agro-Industri Pangan Desa',
      '01:30–04:30 | Penjelasan Pilar Sains: Struktur Anatomi Butir Padi (Sekam, Aleuron Bekatul, Endosperma) atau Kimia Fermentasi',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Husker Rol Karet, Polisher Pemutih, Boiler Uap & Continuous Sealer',
      '07:30–10:00 | Analisis Mekanisme Mesin terhadap Rendemen dan Kualitas Produk Pangan, Kesimpulan & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (anatomi bulir gabah, lapisan aleuron bekatul agar beras tidak tengik, gelatinisasi pati kemplang, atau koagulasi protein tahu oleh asam)',
      tech: 'Teknologi industri yang ditunjukkan di video (mesin pemecah kulit husker rol karet, polisher penyosoh, mesin color sorter optic, boiler ketel uap sekam, atau sealer perekat kemasan)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (konveyor mangkok vertikal bucket elevator, siklon pengendali debu cerobong, atau penataan ruang produksi higienis)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (persentase rendemen beras giling 65%, kapasitas giling mesin per jam, takaran bahan adonan, atau gramasi kemasan produk)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Pabrik Agro-Industri yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Elevator Konveyor Otomatis, Siklon Pemisah Debu Sekam & Pengering Sirkulasi',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Beli 4 Ton Gabah, Biaya Solar/Operator, Omzet Beras/Bekatul & Laba Harian',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Briket Arang dari Limbah Sekam Padi), Efisiensi Pabrik & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian biaya harian pembelian bahan baku gabah mentah, biaya bahan bakar solar/listrik, upah tenaga operator, kemasan karung, omzet penjualan beras dan bekatul, serta laba bersih harian',
      constraints: 'Kendala operasional (beras patah tinggi jika gabah basah saat musim hujan, debu sekam yang beterbangan, mahalnya suku cadang rol karet mesin giling, atau fluktuasi harga gabah)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (pemanfaatan mesin pengering flat-bed dryer suhu rendah, pengolahan limbah sekam menjadi briket arang biomassa, dan kemasan kedap udara)'
    }
  },
  perdagangan: {
    key: 'perdagangan',
    name: 'Perdagangan & Saprotan',
    shortName: '🏪 Perdagangan & Toko',
    badge: 'Kios Saprotan, Sembako & Grosir',
    icon: 'storefront',
    desc: 'Kios Pupuk Bersubsidi, Toko Sembako, Grosir, Timbangan & POS',
    examples: 'Kios Pupuk & Obat Pertanian Resmi, Toko Sembako Grosir/Eceran, Kios Pasar Tradisional, atau Toko Bangunan',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Kios Saprotan atau Toko Sembako Desa',
      '01:30–04:30 | Penjelasan Pilar Sains: Sifat Higroskopis Pupuk Urea, Penyimpanan Terigu/Beras & Pita Toksisitas Pestisida',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Timbangan Sensor Digital Load Cell, Aplikasi i-Pubers & Sistem Kasir',
      '07:30–10:00 | Analisis Peran Alat Ukur Presisi terhadap Kepercayaan Pembeli, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (sifat higroskopis urea yang menyerap air dari lantai dingin sehingga butuh palet kayu, pencegahan kutu beras/kapang pada kelembaban terkontrol, dan pita toksisitas racun)',
      tech: 'Teknologi perdagangan yang ditunjukkan di video (timbangan digital elektronik load cell, smartphone pemindai barcode / e-KTP i-Pubers pupuk subsidi, kalkulator POS, atau perekat sealer)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (tata letak lorong gudang penyimpanan, sirkulasi udara ventilasi toko, atau sistem antrean satu arah meja kasir)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (akurasi gramasi timbangan digital, konversi satuan grosir sak/dus ke eceran kg/liter, atau kalkulasi kuota e-Alokasi pupuk)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Toko Perdagangan yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Penataan Rak Sistem FIFO (First In First Out) & Repacking Kemasan Ritel Higienis',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Kulakan Mingguan Rp16 Juta, Margin Laba 15%, Omzet & Laba Bersih',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Layanan Pesan Antar WhatsApp Desa & Pembayaran QRIS), Prospek Toko & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian perputaran modal kulakan barang mingguan (HPP beras, minyak, pupuk), biaya operasional toko (listrik, kemasan, transportasi), penentuan margin laba 10-20%, omzet, dan laba bersih mingguan/bulanan',
      constraints: 'Kendala operasional toko (risiko barang kedaluwarsa jika stok lama tertimbun di belakang, modal macet akibat piutang kasbon pembeli, persaingan harga distributor, atau susut timbangan)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (penerapan SOP penataan stok FIFO, pembatasan batas plafon piutang kasbon, layanan pesan antar WhatsApp desa, dan adopsi QRIS digital)'
    }
  },
  formal: {
    key: 'formal',
    name: 'Jasa Keuangan Mikro',
    shortName: '🏦 Keuangan Mikro',
    badge: 'Agen BRILink, BUMDes & Jasa',
    icon: 'account_balance',
    desc: 'Agen BRILink, BUMDes Keuangan, Mesin EDC, Enkripsi & Fee Admin',
    examples: 'Gerai Agen BRILink Desa, Unit Keuangan BUMDes Simpan Pinjam, Koperasi Simpan Pinjam Desa, atau Loket Keuangan Mikro',
    day5Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Gerai Agen Keuangan Mikro di Desa',
      '01:30–04:30 | Penjelasan Pilar Sains: Fisika Optik Sinar UV Detektor Uang Palsu & Kimia Kertas Struk Termal',
      '04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin EDC Portabel, Microchip Kriptografi Kartu ATM & Router 4G LTE',
      '07:30–10:00 | Analisis Kecepatan dan Keamanan Transaksi Digital Perbankan, Kesimpulan Sains-Teknologi & Penutup'
    ],
    day5Prompts: {
      science: 'Prinsip Sains yang dijelaskan di video (pendaran fluoresensi serat fosfor uang asli di bawah radiasi sinar Ultraviolet 365 nm, dan reaksi termokimia kertas struk termal yang menghitam saat terkena panas jarum print)',
      tech: 'Teknologi perbankan yang ditunjukkan di video (mesin EDC nirkabel dengan slot baca kartu chip EMV, jaringan data seluler 4G terenkripsi TLS/SSL ke server perbankan, UPS cadangan listrik, atau mesin hitung uang)',
      eng: 'Rekayasa Engineering yang Anda singgung di video (desain sekat loket kasir akrilik dengan celah baki geser, sudut pandang kamera CCTV pengawas, brankas baja tahan api, atau alur SOP verifikasi transfer)',
      math: 'Perhitungan Matematika yang Anda jelaskan di video (ketelitian hitung lembaran uang kas, struktur tarif fee administrasi per transaksi Rp3.000–Rp5.000, atau rekonsiliasi saldo kasir harian)'
    },
    day6Segments: [
      '00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Agen Keuangan Mikro yang Dianalisis',
      '01:30–04:30 | Penjelasan Pilar Rekayasa: Loket Meja Transaksi Bersekat Akrilik, SOP Anti Struk Palsu & Dual-SIM Failover Router',
      '04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Likuiditas Rp60 Juta (Bank & Kas), 40 Transaksi/Hari, Fee Bersih & Laba',
      '07:30–10:00 | Gagasan Inovasi Nilai Tambah (Manajemen Likuiditas Kas Terjadwal Musim Panen Raya), Inklusi Keuangan & Penutup'
    ],
    day6Prompts: {
      financial: 'Rincian manajemen modal likuiditas perputaran (saldo rekening giro bank vs uang tunai di brankas), perhitungan pendapatan fee administrasi bersih x volume transaksi harian, biaya operasional, dan laba bersih bulanan',
      constraints: 'Kendala & risiko operasional (gangguan sinyal internet di desa, kehabisan kas tunai saat musim panen raya, ancaman penipuan modus struk transfer palsu via WA, atau risiko selisih hitung kasir)',
      innovation: 'Gagasan solusi & inovasi STEM-Finansial (SOP wajib cek mutasi saldo masuk sebelum serahkan uang tunai, pemasangan router Dual-SIM dengan koneksi cadangan, dan penjadwalan kas panen raya)'
    }
  }
};

// Aliases
NEW_NFT_LKPD_VIDEO_SECTORS.keuangan = NEW_NFT_LKPD_VIDEO_SECTORS.formal;
NEW_NFT_LKPD_VIDEO_SECTORS.jasa = NEW_NFT_LKPD_VIDEO_SECTORS.industri;

// Replace NFT_LKPD_VIDEO_SECTORS in lkpd-nonfieldtrip.js
const oldSecRegex = /const NFT_LKPD_VIDEO_SECTORS = \{[\s\S]*?\};\r?\n(?=\s*function extractYoutubeVideoId)/;
const newSecCode = `const NFT_LKPD_VIDEO_SECTORS = ${JSON.stringify(NEW_NFT_LKPD_VIDEO_SECTORS, null, 2)};\r\n\r\n`;

if (oldSecRegex.test(content)) {
  content = content.replace(oldSecRegex, newSecCode);
  console.log('NFT_LKPD_VIDEO_SECTORS replaced successfully.');
} else {
  console.error('Could not match oldSecRegex in lkpd-nonfieldtrip.js');
  process.exit(1);
}

// Replace sectorKeys and sector normalization in renderNonFieldTripVideoDayLKPD
content = content.replace(
  /const sectorKeys = \['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'perdagangan', 'keuangan', 'jasa'\];/,
  "const sectorKeys = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'industri', 'perdagangan', 'formal'];"
);

// Normalize sectorKey in renderNonFieldTripVideoDayLKPD
const oldSecNorm = /let selectedSector = saved\.sectorKey \|\|\r?\n\s*\(materiObj && materiObj\.selectedSector\) \|\|\r?\n\s*localStorage\.getItem\(\`fincestem_nft_sector_d\$\{dayNum\}_\` \+ cleanNisn\) \|\|\r?\n\s*localStorage\.getItem\('fincestem_nft_sector_d5_' \+ cleanNisn\) \|\|\r?\n\s*localStorage\.getItem\('fincestem_nft_sector_d4_' \+ cleanNisn\) \|\|\r?\n\s*localStorage\.getItem\('fincestem_nft_sector_d3_' \+ cleanNisn\) \|\|\r?\n\s*'pertanian';\r?\n\s*if \(!NFT_LKPD_VIDEO_SECTORS\[selectedSector\]\) selectedSector = 'pertanian';/;

const newSecNorm = `let selectedSector = saved.sectorKey ||
                         (materiObj && materiObj.selectedSector) ||
                         localStorage.getItem(\`fincestem_nft_sector_d\${dayNum}_\` + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) ||
                         'pertanian';
    if (selectedSector === 'jasa') selectedSector = 'industri';
    if (selectedSector === 'keuangan') selectedSector = 'formal';
    if (!NFT_LKPD_VIDEO_SECTORS[selectedSector]) selectedSector = 'pertanian';`;

if (oldSecNorm.test(content)) {
  content = content.replace(oldSecNorm, newSecNorm);
  console.log('Replaced selectedSector normalization in LKPD.');
}

// In collectNftVideoDayData:
content = content.replace(
  /const sectorKey = document\.getElementById\(\`nftVideoLkpdSectorD\$\{dayNum\}\`\)\?\.value \|\| 'pertanian';/,
  "let sectorKey = document.getElementById(`nftVideoLkpdSectorD${dayNum}`)?.value || 'pertanian';\r\n    if (sectorKey === 'jasa') sectorKey = 'industri';\r\n    if (sectorKey === 'keuangan') sectorKey = 'formal';"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('lkpd-nonfieldtrip.js updated and written successfully!');
