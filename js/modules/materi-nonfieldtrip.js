/**
 * FINCESTEM 2026 - Modul Belajar Digital Khusus Peserta Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur (Day 1 s.d. Day 7)
 * File Terpisah (Modular Isolation) - Bebas Konflik dengan Modul Field Trip
 * Standar Tipografi: Rata Kanan-Kiri (text-justify) & Indentasi Rapi Peluru/Penomoran
 * Versi: 20261030_nft_materi_v3_full
 */

(function(window) {
  'use strict';

  var FincestemCore = window.FincestemCore || {};

  // 1. HELPER ANTI-SPAM & VALIDASI KARAKTER ILMIAH
  function validateScientificContent(text, minChars) {
    if (!text || typeof text !== 'string') return { valid: false, count: 0, reason: 'Teks masih kosong' };
    const trimmed = text.trim();
    const count = trimmed.length;

    if (count < minChars) {
      return { valid: false, count: count, reason: `Kurang ${minChars - count} karakter (Minimal ${minChars} karakter)` };
    }

    // Deteksi huruf berulang (spam seperti aaaaaa / zzzzzz)
    if (/(.)\1{6,}/i.test(trimmed)) {
      return { valid: false, count: count, reason: 'Terdeteksi karakter berulang (spam). Tuliskan kalimat ilmiah yang wajar.' };
    }

    // Deteksi keragaman kata (minimal 12 kata unik untuk tulisan ilmiah)
    const words = trimmed.toLowerCase().match(/\b[a-z0-9\-]{2,}\b/gi) || [];
    const uniqueWords = new Set(words);
    if (uniqueWords.size < 12) {
      return { valid: false, count: count, reason: 'Keragaman kata terlalu sedikit. Uraikan analisis Anda lebih mendalam.' };
    }

    return { valid: true, count: count, reason: 'Memenuhi syarat' };
  }

  function validateSourceCitation(source, minChars) {
    if (!source || typeof source !== 'string') return { valid: false, count: 0, sourcesCount: 0, reason: 'Sumber rujukan belum diisi' };
    const trimmed = source.trim();
    const count = trimmed.length;
    if (count < minChars) {
      return { valid: false, count: count, sourcesCount: 0, reason: `Kurang ${minChars - count} karakter (Cantumkan judul referensi, pengarang/penerbit, hal, atau URL resmi)` };
    }

    const rawItems = trimmed.split(/(?:\r?\n|;|\b\d+[\.\)]\s+)/);
    const validItems = rawItems
      .map(s => s.trim())
      .filter(s => s.length >= 8);

    const sourcesCount = Math.max(1, validItems.length);

    if (sourcesCount > 1) {
      return { valid: true, count: count, sourcesCount: sourcesCount, reason: `✓ ${sourcesCount} Sumber rujukan terverifikasi` };
    }
    return { valid: true, count: count, sourcesCount: 1, reason: '✓ Sumber rujukan valid' };
  }

  function mapToMateriSectorKey(raw) {
    if (!raw) return '';
    const s = String(raw).toLowerCase().trim();
    if (s.includes('brilink') || s.includes('bank') || s.includes('koperasi') || s.includes('bumdes') || s.includes('keuangan') || s.includes('formal') || s.includes('bengkel') || s.includes('salon')) return 'formal';
    if (s.includes('toko') || s.includes('pasar') || s.includes('sembako') || s.includes('dagang') || s.includes('perdagangan') || s.includes('grosir') || s.includes('saprotan') || s.includes('warung') || s.includes('niaga') || s.includes('kelontong') || s.includes('umkm')) return 'perdagangan';
    if (s.includes('industri') || s.includes('rmu') || s.includes('giling') || s.includes('pabrik') || s.includes('tahu') || s.includes('tempe') || s.includes('kemplang') || s.includes('olah') || s.includes('jasa')) return 'industri';
    if (s.includes('ikan') || s.includes('patin') || s.includes('lele') || s.includes('kolam') || s.includes('perikanan') || s.includes('tambak')) return 'perikanan';
    if (s.includes('ternak') || s.includes('sapi') || s.includes('kambing') || s.includes('ayam') || s.includes('bebek') || s.includes('peternakan') || s.includes('unggas') || s.includes('domba')) return 'peternakan';
    if (s.includes('kebun') || s.includes('karet') || s.includes('sawit') || s.includes('lateks') || s.includes('perkebunan') || s.includes('tbs')) return 'perkebunan';
    if (s.includes('padi') || s.includes('tani') || s.includes('sawah') || s.includes('melon') || s.includes('semangka') || s.includes('pangan') || s.includes('pertanian') || s.includes('horti') || s.includes('palawija')) return 'pertanian';
    const valid = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'industri', 'perdagangan', 'formal'];
    return valid.includes(s) ? s : '';
  }

  // 2. MASTER KONFIGURASI MODUL DAY 1 S.D. DAY 7 NON-FIELD TRIP
  const NFT_MATERI_CONFIG = {
            1: {
      dayNum: 1,
      title: 'Modul Riset Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur',
      theme: 'Pilar Financial & Economics',
      gradientClass: 'from-teal-800 via-teal-900 to-slate-950 border-teal-700/40',
      tagColorClass: 'bg-white/20 text-teal-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Penelusuran Mandiri: Hakikat Kegiatan Ekonomi, Literasi Finansial, Kebanksentralan Bank Indonesia, Badan Usaha & Koperasi, serta Pemetaan Sektor Ekonomi Unggulan Daerah OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda tidak disajikan teks materi siap saji di layar. Anda <strong>diwajibkan meneliti dan mencari materi sendiri</strong> dari berbagai sumber (buku teks ekonomi kurikulum merdeka, modul literasi keuangan OJK, website Bank Indonesia, undang-undang perkoperasian, maupun data BPS OKU Timur). Jawablah pertanyaan pada setiap kolom jawaban dan cantumkan sumber rujukan yang Anda temukan (dapat lebih dari 1 sumber).',
      cards: [
        {
          key: 'A',
          title: 'A. Kegiatan Ekonomi',
          subtitle: 'Produksi, Distribusi, Konsumsi & Tiga Sektor Aktivitas Ekonomi',
          taskInstruction: 'Sebutkan pengertian dan berikan contoh:',
          items: [
            '1. Pengertian kegiatan ekonomi',
            '2. Produksi, distribusi, dan konsumsi',
            '3. Sektor utama aktivitas ekonomi:\n   - Sektor primer\n   - Sektor sekunder\n   - Sektor tersier'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan berikan contoh:\n1. Pengertian kegiatan ekonomi\n2. Produksi, distribusi, dan konsumsi\n3. Sektor utama aktivitas ekonomi:\n   - Sektor primer\n   - Sektor sekunder\n   - Sektor tersier'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh kegiatan ekonomi, alur produksi-distribusi-konsumsi, serta sektor primer, sekunder, dan tersier di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 15-22',
          defaultExp: 'Kajian komprehensif mengenai kegiatan ekonomi menegaskan bahwa aktivitas pemenuhan kebutuhan manusia tersusun atas rantai nilai organik produksi, distribusi, dan konsumsi. Di Kabupaten OKU Timur, keterpaduan tiga sektor tampak nyata: sektor primer (pertanian padi sawah beririgasi Belitang, perkebunan karet, dan peternakan sapi) berperan sebagai penyedia bahan mentah; sektor sekunder (industri penggilingan padi RMU dan olahan pangan) mengolah bahan mentah menjadi komoditas beras kemasan bernilai tambah tinggi; sedangkan sektor tersier (pasar grosir Gumawang, jasa logistik angkutan truk, dan jaringan perbankan/BRILink) menjamin kelancaran arus barang dan uang hingga ke konsumen akhir secara berkelanjutan.',
          defaultSources: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Kegiatan Ekonomi.'
        },
        {
          key: 'B',
          title: 'B. Literasi dan Pengelolaan Keuangan (Financial Literacy)',
          subtitle: 'Empat Jenis Finansial & Lima Aspek Pengelolaan Keuangan',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Jenis-jenis finansial:\n   - Keuangan pribadi (personal finance)\n   - Keuangan bisnis (business finance)\n   - Keuangan publik (public finance)\n   - Keuangan internasional (international finance)',
            '2. Aspek pengelolaan keuangan:\n   - Pemasukan dan pengeluaran\n   - Anggaran dan tabungan\n   - Dana darurat\n   - Investasi\n   - Pengelolaan keuangan'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\n1. Jenis-jenis finansial:\n   - Keuangan pribadi (personal finance)\n   - Keuangan bisnis (business finance)\n   - Keuangan publik (public finance)\n   - Keuangan internasional (international finance)\n2. Aspek pengelolaan keuangan:\n   - Pemasukan dan pengeluaran\n   - Anggaran dan tabungan\n   - Dana darurat\n   - Investasi\n   - Pengelolaan keuangan'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh 4 jenis finansial serta 5 aspek pengelolaan keuangan di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Buku Saku Literasi Keuangan, Otoritas Jasa Keuangan (OJK RI)',
          defaultExp: 'Literasi keuangan merupakan kecakapan hidup mendasar yang mencakup pemahaman empat jenis finansial: keuangan pribadi (tata kelola uang individu/keluarga), keuangan bisnis (manajemen modal kerja UMKM tanpa mencampur kas pribadi), keuangan publik (alokasi APBD OKU Timur bagi infrastruktur irigasi), dan keuangan internasional (transaksi ekspor karet/sawit dan fluktuasi valas). Dalam tataran praktis, tata kelola keuangan bertumpu pada lima aspek utama: disiplin mencatat pemasukan-pengeluaran agar surplus kas, menyusun anggaran 50/30/20 dan menabung di awal, menyiapkan dana darurat 3-6 bulan pengeluaran untuk antisipasi risiko, berinvestasi pada instrumen legal berizin OJK, serta mengelola pinjaman produktif dengan rasio cicilan di bawah 30% seraya menjauhi pinjol ilegal dan rentenir.',
          defaultSources: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI).'
        },
        {
          key: 'C',
          title: 'C. Kebanksentralan',
          subtitle: 'Tugas, Fungsi Bank Sentral, Bank Indonesia & Stabilitas Rupiah',
          taskInstruction: 'Sebutkan dan berikan contoh:',
          items: [
            '1. Pengertian kebanksentralan',
            '2. Tugas dan fungsi utama bank sentral',
            '3. Mengenal Bank Indonesia',
            '4. Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah'
          ],
          guidedPoints: [
            'Sebutkan dan berikan contoh:\n1. Pengertian kebanksentralan\n2. Tugas dan fungsi utama bank sentral\n3. Mengenal Bank Indonesia\n4. Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian kebanksentralan, tugas bank sentral, kedudukan Bank Indonesia, serta sistem pembayaran (QRIS/BI-FAST) dan stabilitas rupiah di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Publikasi Bank Indonesia (bi.go.id), Mengenal Bank Sentral dan Kebijakan Moneter',
          defaultExp: 'Kebanksentralan merupakan fungsi otoritas moneter independen yang bertugas menjaga kestabilan nilai mata uang dan kelancaran sistem keuangan tanpa berorientasi komersial. Di Indonesia, Bank Indonesia (BI) bertindak sebagai bank sentral berdasar UU No. 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) dengan tujuan tunggal memelihara kestabilan nilai rupiah, baik terhadap harga barang (inflasi) maupun terhadap mata uang asing. Peran strategis BI diwujudkan melalui tiga pilar: pelaksanaan kebijakan moneter suku bunga BI-Rate, penjagaan stabilitas makroprudensial, serta pengaturan sistem pembayaran. Di Kabupaten OKU Timur, peran BI tampak nyata dalam pengedaran rupiah layak edar melalui edukasi Cinta Bangga Paham Rupiah, perluasan transaksi digital QRIS dan BI-FAST bagi pedagang UMKM pasar rakyat, serta pengendalian stabilitas harga pangan bersama Tim Pengendali Inflasi Daerah (TPID).',
          defaultSources: '1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 tentang Bank Indonesia (UU P2SK).'
        },
        {
          key: 'D',
          title: 'D. Badan Usaha dan Koperasi',
          subtitle: 'Badan Usaha di Indonesia, Prinsip Perkoperasian UU 25/1992 & Ekonomi Masyarakat',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Pengertian badan usaha',
            '2. Jenis-jenis badan usaha di Indonesia',
            '3. Pengertian koperasi',
            '4. Dasar hukum koperasi',
            '5. Kegiatan dan prinsip koperasi',
            '6. Peran koperasi dalam perekonomian masyarakat'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\n1. Pengertian badan usaha\n2. Jenis-jenis badan usaha di Indonesia\n3. Pengertian koperasi\n4. Dasar hukum koperasi\n5. Kegiatan dan prinsip koperasi\n6. Peran koperasi dalam perekonomian masyarakat'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh badan usaha di Indonesia, pengertian koperasi, landasan hukum UU 25/1992, prinsip koperasi, dan perannya bagi masyarakat di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian',
          defaultExp: 'Badan usaha merupakan kesatuan yuridis dan ekonomis faktor produksi yang berorientasi pada laba atau pelayanan masyarakat, yang terbagi atas BUMN, BUMD, BUMDes, BUMS, dan Koperasi. Koperasi menempati kedudukan istimewa dalam sistem ekonomi Indonesia sebagaimana diamanatkan Pasal 33 ayat (1) UUD 1945 dan diatur melalui UU No. 25 Tahun 1992 tentang Perkoperasian sebagai bangun usaha berlandaskan asas kekeluargaan dan gotong royong. Tujuh prinsip perkoperasian seperti keanggotaan sukarela terbuka, pengelolaan demokratis (one person one vote), dan pembagian SHU berkeadilan menjadi pembeda utama dari badan usaha permodalan murni. Di kawasan pedesaan OKU Timur, kelembagaan Koperasi Unit Desa (KUD) dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, menyediakan pinjaman modal usaha tani dengan bunga rendah, serta melindungi harga panen gabah petani dari eksploitasi tengkulak.',
          defaultSources: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.'
        },
        {
          key: 'E',
          title: 'E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur',
          subtitle: 'Pertanian, Perkebunan, Peternakan, Perikanan, Perdagangan, UMKM & Produk Unggulan',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Pertanian dan perkebunan',
            '2. Peternakan dan perikanan',
            '3. Perdagangan dan UMKM',
            '4. Persebaran potensi ekonomi di OKU Timur',
            '5. Identifikasi produk unggulan di OKU Timur'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\n1. Pertanian dan perkebunan\n2. Peternakan dan perikanan\n3. Perdagangan dan UMKM\n4. Persebaran potensi ekonomi di OKU Timur\n5. Identifikasi produk unggulan di OKU Timur'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran data daerah Anda mengenai potensi pertanian, perkebunan, peternakan, perikanan, perdagangan, UMKM, persebaran wilayah, dan produk unggulan OKU Timur di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan data Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Badan Pusat Statistik (BPS) Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka',
          defaultExp: 'Kabupaten Ogan Komering Ulu Timur (OKU Timur) memiliki keunggulan komparatif mutlak sebagai lumbung pangan utama Provinsi Sumatera Selatan berkat jaringan Daerah Irigasi Komering Bendung Perjaya (BK 0 s.d. BK 32) yang menopang sawah teknis berpola tanam IP 200-300 dengan produktivitas 6-7 ton/Ha, disandingkan perkebunan karet bokar dan kelapa sawit rakyat. Sektor peternakan sapi terintegrasi limbah jerami padi serta budidaya ikan patin dan lele air tawar menjadikan OKU Timur sebagai sentra pasokan protein hewani regional. Denyut ekonomi terdistribusi dinamis melalui Pasar Gumawang Belitang, ribuan UMKM kilang beras RMU dan hilirisasi pangan olahan, serta jejaring Agen BRILink di setiap desa. Secara spasial, potensi daerah terbagi atas Zona Irigasi Belitang Raya (padi dan patin), Zona Madang Suku dan Semendawai (perkebunan karet/sawit dan sapi), serta Zona Martapura (transit perdagangan dan pemerintahan). Lima produk unggulan utamanya adalah Beras Premium Belitang, Bokar Karet Bersih, TBS Kelapa Sawit, Ikan Patin/Olahan Abon, serta Daging Sapi dan Telur Bebek Asin.',
          defaultSources: '1. Badan Pusat Statistik (BPS) Kabupaten OKU Timur: Publikasi OKU Timur Dalam Angka.'
        }
      ]
    },

    2: {
      dayNum: 2,
      title: 'Modul Riset Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur',
      theme: 'Pilar Culture, Nature & STEM',
      gradientClass: 'from-indigo-900 via-slate-900 to-teal-950 border-indigo-700/40',
      tagColorClass: 'bg-white/20 text-indigo-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Penelusuran Mandiri: Hakikat Kebudayaan, 7 Unsur Universal, Ragam Mata Pencaharian Daerah, serta Sistem Peralatan, Mekanisasi Alsintan Modern & Penerapan Terpadu di OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda tidak disajikan teks materi siap saji di layar. Anda <strong>diwajibkan meneliti dan mencari materi sendiri</strong> dari berbagai sumber (buku teks sosiologi/antropologi kurikulum merdeka, modul agroteknologi kementan, publikasi BPS OKU Timur, dinas pertanian, maupun jurnal ilmiah). Jawablah pertanyaan pada setiap kolom jawaban dan cantumkan sumber rujukan yang Anda temukan (dapat lebih dari 1 sumber).',
      cards: [
        {
          key: 'A',
          title: 'A. Budaya dan Unsur-Unsur Kebudayaan',
          subtitle: 'Pengertian Budaya & Tujuh Unsur Kebudayaan Universal',
          taskInstruction: 'Sebutkan pengertian, jelaskan, dan berikan contoh:',
          items: [
            '1. Pengertian budaya (definisi umum & menurut para ahli)',
            '2. Unsur-unsur budaya (Tujuh Unsur Kebudayaan Universal - Koentjaraningrat):\n   1) Bahasa\n   2) Sistem pengetahuan\n   3) Organisasi sosial / sistem kemasyarakatan\n   4) Sistem peralatan hidup dan teknologi\n   5) Sistem mata pencaharian hidup\n   6) Sistem religi dan upacara keagamaan\n   7) Kesenian'
          ],
          guidedPoints: [
            'Sebutkan pengertian, jelaskan, dan berikan contoh:\n1. Pengertian budaya (definisi umum & menurut para ahli)\n2. Unsur-unsur budaya (Tujuh Unsur Kebudayaan Universal - Koentjaraningrat):\n   1) Bahasa\n   2) Sistem pengetahuan\n   3) Organisasi sosial / sistem kemasyarakatan\n   4) Sistem peralatan hidup dan teknologi\n   5) Sistem mata pencaharian hidup\n   6) Sistem religi dan upacara keagamaan\n   7) Kesenian'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian budaya dan rincian tujuh unsur kebudayaan universal (bahasa, pengetahuan, organisasi sosial, teknologi, mata pencaharian, religi, kesenian) di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Buku Teks Antropologi/Sosiologi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek)',
          defaultExp: 'Masyarakat Kabupaten OKU Timur mewarisi kekayaan tujuh unsur kebudayaan universal yang mencakup bahasa daerah Komering dan Jawa, sistem kekerabatan patrilineal dan matrilokal, kesenian daerah, sistem teknologi alsintan, mata pencaharian agrikultur, religi, serta sistem pengetahuan lokal perbintangan pranata mangsa dalam menyelaraskan kalender musim tanam padi.',
          defaultSources: '1. Buku Antropologi & Kebudayaan Nusantara SMA Kelas X Kurikulum Merdeka.\n2. Kajian Budaya Lokal Komering, Disdikbud OKU Timur.'
        },
        {
          key: 'B',
          title: 'B. Hubungan Budaya dengan Kegiatan Ekonomi dan Mata Pencaharian',
          subtitle: 'Nilai Budaya, Etos Kerja, Kearifan Gotong Royong (Sambatan/Sinoman) & Modal Sosial',
          taskInstruction: 'Jelaskan dan berikan contoh:',
          items: [
            '1. Hubungan budaya dengan kegiatan ekonomi dan mata pencaharian',
            '2. Pengaruh nilai budaya dan etos kerja terhadap aktivitas mata pencaharian masyarakat',
            '3. Kearifan lokal gotong royong (tradisi sambatan dan sinoman) dalam menekan biaya dan memperkuat ketahanan ekonomi',
            '4. Pembentukan modal sosial berbasis kepercayaan (trust) dalam relasi ekonomi pedesaan'
          ],
          guidedPoints: [
            'Jelaskan dan berikan contoh:\n1. Hubungan budaya dengan kegiatan ekonomi dan mata pencaharian\n2. Pengaruh nilai budaya dan etos kerja terhadap aktivitas mata pencaharian masyarakat\n3. Kearifan lokal gotong royong (tradisi sambatan dan sinoman) dalam menekan biaya dan memperkuat ketahanan ekonomi\n4. Pembentukan modal sosial berbasis kepercayaan (trust) dalam relasi ekonomi pedesaan'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai hubungan budaya dengan kegiatan ekonomi, pengaruh etos kerja, tradisi sambatan/sinoman, dan modal sosial berbasis kepercayaan di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan / Modul Kewirausahaan Berbasis Kearifan Lokal',
          defaultExp: 'Kearifan budaya gotong royong sambatan dan sinoman sangat mengakar dalam pola kerja sektor ekonomi dan UMKM di OKU Timur. Solidaritas sosial ini mereduksi biaya tenaga kerja saat masa tanam dan panen, membangun ikatan kepercayaan antar-pelaku usaha mikro, serta menumbuhkan ekosistem ekonomi berbasis komunitas yang tangguh terhadap krisis.',
          defaultSources: '1. Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan.\n2. Modul Kewirausahaan Berbasis Kearifan Lokal Kemendikbudristek.'
        },
        {
          key: 'C',
          title: 'C. Sistem Mata Pencaharian Masyarakat OKU Timur',
          subtitle: 'Pertanian Pangan, Perkebunan, Perikanan-Peternakan, Perdagangan-Jasa, & Industri Rumah Tangga',
          taskInstruction: 'Jelaskan karakteristik dan berikan contoh di OKU Timur:',
          items: [
            '1. Pertanian tanaman pangan (padi sawah irigasi Belitang, palawija)',
            '2. Perkebunan (karet alam, kelapa sawit rakyat)',
            '3. Perikanan dan peternakan (kolam patin/lele, peternakan sapi mandiri, peternakan kambing)',
            '4. Perdagangan dan jasa (kios sarana tani, pasar tradisional, agen bank/BRILink, jasa angkut)',
            '5. Industri rumah tangga dan pekerjaan formal (penggilingan padi RMU, pabrik tahu-tempe, kerupuk, guru, ASN/BUMDes)'
          ],
          guidedPoints: [
            'Jelaskan karakteristik dan berikan contoh di OKU Timur:\n1. Pertanian tanaman pangan (padi sawah irigasi Belitang, palawija)\n2. Perkebunan (karet alam, kelapa sawit rakyat)\n3. Perikanan dan peternakan (kolam patin/lele, peternakan sapi mandiri, peternakan kambing)\n4. Perdagangan dan jasa (kios sarana tani, pasar tradisional, agen bank/BRILink, jasa angkut)\n5. Industri rumah tangga dan pekerjaan formal (penggilingan padi RMU, pabrik tahu-tempe, kerupuk, guru, ASN/BUMDes)'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai 5 sektor mata pencaharian masyarakat OKU Timur (pangan, perkebunan, perikanan/peternakan, perdagangan/jasa, dan industri rumah tangga/pekerjaan formal) di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan data Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Badan Pusat Statistik (BPS) Kabupaten OKU Timur, OKU Timur Dalam Angka',
          defaultExp: 'Sektor agrikultur tanaman padi sawah menjadi tulang punggung perekonomian utama masyarakat OKU Timur. Keberadaan jaringan irigasi primer dan sekunder dari Danau Ranau memungkinkan petani melakukan pola rotasi tanam intensif IP-200 hingga IP-300 per tahun, disokong perkebunan karet/sawit, budidaya perikanan air tawar, peternakan sapi/kambing, serta UMKM kilang padi RMU.',
          defaultSources: '1. Dinas Pertanian & Ketahanan Pangan Kab. OKU Timur.\n2. BPS OKU Timur Dalam Angka.'
        },
        {
          key: 'D',
          title: 'D. Sistem Teknologi dan Peralatan Pertanian, Perkebunan, Peternakan & Pengolahan',
          subtitle: 'Infrastruktur Irigasi, Olah Lahan, Penanaman, Pemeliharaan, Panen & Pascapanen Digital',
          taskInstruction: 'Sebutkan pengertian, klasifikasi berurutan, dan berikan contoh:',
          items: [
            '1. Pengertian sistem teknologi dan peralatan (definisi umum & fungsinya)',
            '2. Klasifikasi teknologi terurut dari hulu (persiapan) hingga hilir (pascapanen & digital):\n   a. Infrastruktur & Irigasi Pengairan: Bendung Perjaya, saluran primer & sekunder irigasi BK Belitang\n   b. Pengolahan Lahan / Tanah: Perkakas tradisional (cangkul, bajak singkal) menuju alsintan modern (traktor roda 2 & 4)\n   c. Penanaman & Pembibitan: Varietas benih unggul, pola tanam jajar legowo, dan mesin transplanter\n   d. Pemeliharaan, Kebun & Ternak: Sprayer elektrik, alat sadap karet/dodos sawit, mesin chopper pencacah pakan\n   e. Pemanenan & Pascapanen: Dari sabit/ani-ani menuju mesin combine harvester, pengering bed dryer, dan kilang padi (RMU)\n   f. Teknologi Informasi & Transaksi Digital: Timbangan digital presisi, transaksi QRIS, agen BRILink, dan pemasaran online'
          ],
          guidedPoints: [
            'Sebutkan pengertian, klasifikasi berurutan, dan berikan contoh:\n1. Pengertian sistem teknologi dan peralatan (definisi umum & fungsinya)\n2. Klasifikasi teknologi terurut dari hulu (persiapan) hingga hilir (pascapanen & digital):\n   a. Infrastruktur & Irigasi Pengairan: Bendung Perjaya, saluran primer & sekunder irigasi BK Belitang\n   b. Pengolahan Lahan / Tanah: Perkakas tradisional (cangkul, bajak singkal) menuju alsintan modern (traktor roda 2 & 4)\n   c. Penanaman & Pembibitan: Varietas benih unggul, pola tanam jajar legowo, dan mesin transplanter\n   d. Pemeliharaan, Kebun & Ternak: Sprayer elektrik, alat sadap karet/dodos sawit, mesin chopper pencacah pakan\n   e. Pemanenan & Pascapanen: Dari sabit/ani-ani menuju mesin combine harvester, pengering bed dryer, dan kilang padi (RMU)\n   f. Teknologi Informasi & Transaksi Digital: Timbangan digital presisi, transaksi QRIS, agen BRILink, dan pemasaran online'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian teknologi dan urutan klasifikasi teknologi dari hulu ke hilir (irigasi, pengolahan lahan, penanaman, pemeliharaan ternak/kebun, panen/pascapanen, hingga digitalisasi) di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Pedoman Pemanfaatan Alat dan Mesin Pertanian (Alsintan) Kementan RI / BBWS Sumatera VIII',
          defaultExp: 'Sistem teknologi dan peralatan di OKU Timur tersusun secara runut dari hulu hingga hilir. Dimulai dari infrastruktur irigasi Bendung Perjaya dan saluran sekunder BK Belitang untuk suplai air, pengolahan lahan bertransisi dari cangkul dan bajak singkal kerbau ke traktor roda dua dan empat, penanaman mengadopsi jajar legowo dan mesin transplanter, hingga pemanenan menggunakan combine harvester. Pada tahap hilir, hasil diolah dengan mesin bed dryer dan kilang padi RMU, serta didukung timbangan digital dan transaksi QRIS.',
          defaultSources: '1. Balai Besar Wilayah Sungai Sumatera VIII (Irigasi Komering).\n2. Pedoman Mekanisasi Pertanian, Kementerian Pertanian RI.'
        },
        {
          key: 'E',
          title: 'E. Keterampilan Teknis & Penerapan Teknologi Terpadu di OKU Timur',
          subtitle: 'Keterampilan Petani, Integrasi Sektor Day 1 (Padi-Sapi-RMU-Ikan) & Peran Petani Milenial',
          taskInstruction: 'Uraikan dan berikan contoh penerapan nyata di OKU Timur:',
          items: [
            '1. Pengetahuan dan keterampilan teknis petani (olah lahan, deteksi hama WBC/kresek, perawatan alsintan)',
            '2. Peran generasi muda (petani milenial) dalam mengadopsi teknologi pertanian',
            '3. Penerapan teknologi pertanian, perkebunan, peternakan, dan agroindustri di OKU Timur',
            '4. Sistem integrasi terpadu (crop-livestock system): jerami panen untuk pakan sapi/kambing, kotoran ternak untuk pupuk organik sawah, serta dedak RMU untuk kolam ikan'
          ],
          guidedPoints: [
            'Uraikan dan berikan contoh penerapan nyata di OKU Timur:\n1. Pengetahuan dan keterampilan teknis petani (olah lahan, deteksi hama WBC/kresek, perawatan alsintan)\n2. Peran generasi muda (petani milenial) dalam mengadopsi teknologi pertanian\n3. Penerapan teknologi pertanian, perkebunan, peternakan, dan agroindustri di OKU Timur\n4. Sistem integrasi terpadu (crop-livestock system): jerami panen untuk pakan sapi/kambing, kotoran ternak untuk pupuk organik sawah, serta dedak RMU untuk kolam ikan'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai keterampilan teknis petani, peran petani milenial, dan penerapan nyata sistem integrasi terpadu di OKU Timur di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Riset Balai Pengkajian Teknologi Pertanian (BPTP) Balitbangtan Sumsel',
          defaultExp: 'Peningkatan keterampilan teknis petani OKU Timur berfokus pada efisiensi pemupukan presisi, pengoperasian mesin modern, serta integrasi sistem pertanian-peternakan terpadu (crop-livestock system). Sinergi ini mengolah jerami sisa panen menjadi pakan fermentasi sapi/kambing, mengolah kotoran menjadi pupuk kompos, serta menyalurkan dedak RMU untuk perikanan air tawar guna menciptakan ekonomi sirkular desa.',
          defaultSources: '1. Riset Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel.\n2. Petunjuk Teknis Pascapanen Padi Modern, Kementan RI.'
        }
      ]
    },

        3: {
      dayNum: 3,
      title: 'Modul Riset Day 3: Analisis STEM pada 7 Sektor Unggulan OKU Timur',
      theme: 'Pilar Industry & STEM',
      gradientClass: 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-700/40',
      tagColorClass: 'bg-white/20 text-emerald-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Kajian Terpadu Integrasi Science, Technology, Engineering, dan Mathematics pada 7 Sektor Unggulan Kabupaten OKU Timur (Pertanian Padi Sawah, Perkebunan Rakyat, Peternakan Rakyat, Perikanan Air Tawar, Agro-Industri Pangan, Perdagangan & Saprotan, dan Jasa Keuangan Mikro)',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda dipersilakan <strong>meneliti 1 dari 7 Sektor Unggulan OKU Timur</strong> melalui 4 pilar STEM (Science, Technology, Engineering, Mathematics). Gunakan menu dropdown di bawah untuk memilih sektor yang ingin Anda teliti!',
      sectors: {
  pertanian: {
    key: 'pertanian',
    name: 'Pertanian Padi Sawah',
    badge: 'Lumbung Pangan Komering',
    icon: 'agriculture',
    desc: 'Padi Sawah, Irigasi Saluran BK, Traktor/Combine & Hasil Panen Gabah',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Kondisi Tanah, Air Irigasi & Pertumbuhan Padi',
        subtitle: 'Pengamatan Sumber Air Irigasi BK, Kondisi Cuaca & Hama Sawah di Belitang',
        guidedPoints: [
          'Amati kondisi tanah sawah dan ketersediaan air irigasi dari saluran sekunder/tersier BK (Sungai Komering).',
          'Bagaimana pengaruh cuaca harian (musim panas atau musim hujan) terhadap kesuburan tanaman padi?',
          'Hama apa yang sering ditemukan di sawah (seperti wereng, tikus, atau burung) dan bagaimana dampaknya?'
        ],
        placeholder: 'Jelaskan secara ringkas kondisi tanah sawah, sumber air irigasi, serta pengaruh cuaca dan hama terhadap tanaman padi... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Langsung di Sawah BK 10 / Wawancara Petani Padi',
        defaultExp: 'Tanah sawah di Belitang mendapatkan pasokan air melimpah dari saluran irigasi teknis Bendung Perjaya Komering. Petani menanam varietas padi unggul seperti Inpari 32, namun perlu memperhatikan jadwal buka-tutup pintu air dan mewaspadai hama wereng batang coklat serta burung saat bulir padi mulai berisi.',
        defaultSources: '1. Pengamatan Saluran Irigasi BK Belitang.\n2. Wawancara Petani Padi Sawah Setempat.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Mesin Alsintan & Alat Kerja Pertanian Modern',
        subtitle: 'Penggunaan Traktor, Pompa Air Alkon & Mesin Panen Combine Harvester',
        guidedPoints: [
          'Alat atau mesin apa saja yang digunakan petani untuk mempermudah kerja (traktor pembajak, pompa alkon, mesin semprot elektrik, atau combine harvester)?',
          'Apakah mesin tersebut milik sendiri atau menyewa borongan dari UPJA/tetangga per petak sawah?',
          'Bahan bakar apa yang digunakan mesin tersebut (solar atau bensin) dan bagaimana perawatannya?'
        ],
        placeholder: 'Sebutkan mesin/alat kerja yang dipakai petani, fungsi alat tersebut, dan bagaimana petani mengoperasikannya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Operator Mesin Traktor / Buku Paket Prakarya & Kewirausahaan',
        defaultExp: 'Petani padi di OKU Timur mengandalkan traktor roda dua dan roda empat untuk membajak tanah dengan cepat sebelum jadwal air irigasi masuk. Saat panen tiba, mesin combine harvester digunakan untuk memotong dan merontokkan gabah sekaligus, sehingga panen lebih cepat selesai dan hemat biaya upah tenaga kerja.',
        defaultSources: '1. Observasi Alat Pertanian di UPJA Belitang.\n2. Wawancara Operator Mesin Combine Harvester.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Trik Praktis & Cara Mengatasi Kendala di Sawah',
        subtitle: 'Solusi Saluran Air Tersumbat, Tanah Becek & Cara Mengusir Hama Burung',
        guidedPoints: [
          'Kendala teknis apa yang paling sering dialami petani di sawah (air irigasi lambat sampai, parit tersumbat, atau serangan burung)?',
          'Trik atau cara kreatif apa yang dilakukan petani untuk mengatasinya (membuat sodetan pipa darurat, memasang jaring, atau tali kaleng kaleng berbunyi)?',
          'Apakah solusi sederhana tersebut terbukti efektif membantu tanaman padi tetap aman dan tumbuh subur?'
        ],
        placeholder: 'Uraikan kendala lapangan yang dialami petani dan trik/solusi praktis yang mereka terapkan untuk mengatasinya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Hasil Diskusi dengan Petani Sekitar / Modul Pertanian Terpadu SMA',
        defaultExp: 'Ketika saluran air tersumbat atau petak sawah di ujung belum terairi, petani membuat sodetan parit kecil darurat dengan pipa paralon penghubung. Untuk mengatasi hama burung pipit saat padi bunting menguning, petani membentangkan tali berlonceng kaleng bekas yang digerakkan dari gubuk sawah untuk menakuti burung.',
        defaultSources: '1. Pengamatan Praktik Lapangan Petani Belitang.\n2. Catatan Pembelajaran Mandiri Siswa.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Perhitungan Modal & Keuntungan Usaha Tani',
        subtitle: 'Estimasi Biaya Pupuk/Bibit per Petak vs Hasil Penjualan Gabah Panen',
        guidedPoints: [
          'Berapa perkiraan biaya modal yang dikeluarkan petani per petak (biaya beli benih, pupuk, solar, dan sewa traktor)?',
          'Berapa karung/ton gabah yang dihasilkan saat panen dan berapa harga jual per kilogram ke tengkulak/pabrik?',
          'Hitunglah perkiraan keuntungan bersih: Hasil penjualan dikurangi total biaya modal yang dikeluarkan.'
        ],
        placeholder: 'Tuliskan perkiraan modal, hasil panen gabah, dan estimasi keuntungan bersih yang diperoleh petani... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Perhitungan Sederhana Berdasarkan Informasi Petani / Buku Ekonomi SMA',
        defaultExp: 'Untuk satu hektar sawah, petani mengeluarkan modal sekitar Rp8.000.000 untuk benih padi, pupuk urea/NPK, dan jasa bajak traktor. Hasil panen menghasilkan sekitar 6 ton gabah dengan harga jual Rp6.500/kg (total pendapatan Rp39.000.000). Setelah dikurangi modal, keuntungan bersih petani diperkirakan mencapai Rp30.000.000 per musim tanam.',
        defaultSources: '1. Estimasi Hasil Panen Petani Belitang.\n2. Data Rata-Rata Harga Gabah Dinas Pertanian OKU Timur.'
      }
    ]
  },

  perkebunan: {
    key: 'perkebunan',
    name: 'Perkebunan Rakyat (Karet & Sawit)',
    badge: 'Komoditas Unggulan Perkebunan',
    icon: 'forest',
    desc: 'Lateks Karet, Panen TBS Sawit, Alat Sadap & Estimasi Pendapatan Pekebun',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Karakteristik Tanaman Karet/Sawit & Pengaruh Cuaca',
        subtitle: 'Pengamatan Batang Pohon, Getah Lateks, Tandan Buah Sawit & Dampak Hujan',
        guidedPoints: [
          'Bagaimana kondisi tanaman karet atau kelapa sawit yang diamati (usia pohon, kerapatan tanam, atau kesuburan tanah kebun)?',
          'Bagaimana pengaruh cuaca hujan terhadap hasil getah karet (mudah hanyut/encer) atau proses panen buah sawit?',
          'Kendala alam apa yang sering ditemui pekebun (misalnya rumput liar gulma, jamur daun, atau hama babi hutan)?'
        ],
        placeholder: 'Jelaskan kondisi pohon karet/sawit, pengaruh cuaca terhadap getah/tandan buah, serta kendala alam yang dihadapi... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan di Kebun Karet/Sawit Warga / Buku Geografi/Biologi SMA',
        defaultExp: 'Tanaman karet dan kelapa sawit di OKU Timur tumbuh subur di lahan darat. Pada musim hujan, pekebun karet menghadapi kendala getah lateks yang hanyut terbawa air sebelum mengental di mangkok, sedangkan pada kebun sawit hujan membuat jalur pengangkutan buah menjadi becek dan licin.',
        defaultSources: '1. Pengamatan di Kebun Karet/Sawit Belitang.\n2. Wawancara Pekebun Rakyat Setempat.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Alat Kerja Khusus Sadap Karet & Panen Sawit',
        subtitle: 'Penggunaan Pisau Sadap, Mangkok Lateks, Dodos, Egrek & Gerobak Angkong',
        guidedPoints: [
          'Alat apa saja yang digunakan pekebun untuk bekerja (pisau sadap lengkung, mangkok getah, dodos, egrek sawit, atau angkong)?',
          'Bagaimana cara pekebun merawat alat tersebut agar tetap tajam dan tidak cepat rusak (mengasah pisau/dodos)?',
          'Apakah pekebun menggunakan kendaraan khusus seperti motor modifikasi keranjang gandeng untuk mengangkut hasil kebun?'
        ],
        placeholder: 'Sebutkan alat kerja yang digunakan di kebun karet/sawit, fungsinya, dan bagaimana pekebun merawat alat tersebut... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Pekebun / Observasi Peralatan Kebun',
        defaultExp: 'Pekebun karet menggunakan pisau sadap khusus dengan ketajaman tinggi agar kulit batang pohon tidak luka terlalu dalam. Sementara pekebun sawit memakai alat dodos untuk pohon pendek dan tiang egrek teleskopik untuk pohon tinggi, lalu memuat tandan buah segar (TBS) ke gerobak angkong menuju tepi jalan rintisan.',
        defaultSources: '1. Observasi Alat Panen di Perkebunan Rakyat OKU Timur.\n2. Buku Keterampilan Budidaya Perkebunan.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Trik Praktis Melindungi Hasil Kebun & Jalan Usaha',
        subtitle: 'Pemasangan Plastik Pelindung Getah, Penataan Pelepah Sawit & Rorak Air',
        guidedPoints: [
          'Masalah teknis apa yang sering terjadi di kebun (getah hanyut tersapu air hujan, jalan rintisan licin, atau buah sawit tersangkut)?',
          'Trik atau solusi rekayasa sederhana apa yang dibuat pekebun (memasang talang seng mini/plastik pelindung di atas mangkok getah, menimbun jalan dengan pecahan batu/pelepah)?',
          'Apakah cara tersebut berhasil menjaga hasil panen tetap aman?'
        ],
        placeholder: 'Uraikan trik kreatif pekebun untuk melindungi hasil panen atau mengatasi jalan kebun yang licin/rusak... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Langsung di Kebun / Diskusi dengan Petani Karet',
        defaultExp: 'Untuk mencegah getah karet hanyut saat hujan pagi, pekebun memasang plastik pelindung sederhana menyerupai payung kecil di atas mangkok sadap. Pada kebun sawit, pelepah yang dipangkas disusun rapi di antara barisan pohon (rorak pelepah) untuk menahan erosi tanah dan mencegah jalan rintisan menjadi becek lumpur.',
        defaultSources: '1. Pengamatan Praktik Konservasi Kebun Warga.\n2. Pengalaman Lapangan Pekebun Karet OKU Timur.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Timbangan & Pendapatan Mingguan Pekebun',
        subtitle: 'Perhitungan Berat Getah (Kg) / Tonase Sawit dikali Harga Pasar RAM Pengepul',
        guidedPoints: [
          'Berapa perkiraan hasil getah karet (kg per minggu) atau tonase sawit (ton per panen 2 mingguan)?',
          'Berapa harga jual per kg di pengepul lokal (tengkulak atau RAM sawit)?',
          'Hitung perkiraan pendapatan kotor dan keuntungan bersih setelah dipotong biaya pembeku cuka atau ongkos angkut.'
        ],
        placeholder: 'Tuliskan perhitungan berat hasil panen, harga per kg, dan estimasi keuntungan yang diterima pekebun... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Nota Penjualan Hasil Kebun / Daftar Harga Karet & Sawit Lokal',
        defaultExp: 'Pekebun karet dengan luas 1 hektar rata-rata menghasilkan 60 kg getah beku per minggu. Dengan harga jual Rp11.000 per kg di pedagang pengepul, pendapatan mingguan mencapai Rp660.000 (atau sekitar Rp2.640.000 per bulan). Setelah dipotong biaya asam cuka pembeku Rp50.000, laba bersih pekebun tetap terjaga.',
        defaultSources: '1. Catatan Penjualan Getah Karet Pengepul Desa.\n2. Informasi Pasar Komoditas Perkebunan OKU Timur.'
      }
    ]
  },

  peternakan: {
    key: 'peternakan',
    name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',
    badge: 'Ternak & Bioenergi Pedesaan',
    icon: 'pets',
    desc: 'Ternak Sapi/Kambing/Ayam, Mesin Chopper Pakan, Pengolahan Kotoran & Laba Penjualan',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Kondisi Ternak, Jenis Pakan Hijau & Kebersihan Kandang',
        subtitle: 'Pengamatan Kebutuhan Nutrisi Rumput Gajah, Dedak, dan Kesehatan Hewan Ternak',
        guidedPoints: [
          'Jenis ternak apa yang diamati (sapi potong, kambing, atau ayam pedaging/petelur)?',
          'Pakan apa yang diberikan setiap hari (rumput segar, jerami padi, dedak bekatul, atau konsentrat)?',
          'Bagaimana peternak menjaga kebersihan kandang dan ketersediaan sinar matahari agar hewan tidak mudah terserang penyakit?'
        ],
        placeholder: 'Jelaskan jenis hewan ternak, pakan yang diberikan, serta cara peternak menjaga kesehatan hewan dan kandangnya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan di Kandang Ternak Warga / Buku Biologi/Peternakan SMA',
        defaultExp: 'Peternak sapi dan kambing di desa-desa OKU Timur memanfaatkan limbah pertanian seperti jerami padi dan rumput gajah sebagai pakan utama. Peternak membersihkan kandang secara rutin setiap pagi agar lantai kandang tidak lembap dan ternak bebas dari infeksi penyakit kuku dan mulut (PMK).',
        defaultSources: '1. Pengamatan di Peternakan Sapi/Kambing Rakyat Belitang.\n2. Panduan Kesehatan Hewan Dinas Peternakan OKU Timur.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Alat Bantu Peternakan Modern & Pengolah Pakan',
        subtitle: 'Mesin Pencacah Rumput (Chopper), Drum Silase & Tempat Minum Otomatis',
        guidedPoints: [
          'Alat atau mesin apa yang digunakan peternak (mesin chopper pencacah rumput, drum fermentasi pakan, atau lampu pemanas ayam)?',
          'Bagaimana mesin tersebut mempermudah dan mempercepat pekerjaan peternak dibanding memotong manual pakai sabit?',
          'Sumber tenaga apa yang dipakai (mesin bensin, dinamo listrik, atau tenaga manual)?'
        ],
        placeholder: 'Sebutkan alat atau mesin kerja yang ada di peternakan, cara kerjanya, dan kemudahan yang dirasakan peternak... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Pemilik Ternak / Observasi Mesin Chopper',
        defaultExp: 'Peternak kini banyak memanfaatkan mesin chopper bermesin bensin 6,5 HP untuk mencacah rumput gajah dan batang jagung menjadi potongan kecil berukuran 2-3 cm. Mesin ini mempersingkat waktu penyiapan pakan dari 2 jam manual menjadi hanya 15 menit, serta memudahkan sapi mencerna pakan.',
        defaultSources: '1. Observasi Kelompok Ternak Lembu Makmur Belitang.\n2. Modul Prakarya Pengolahan Pakan Ternak.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Pemanfaatan Kotoran Kompos & Trik Cadangan Pakan',
        subtitle: 'Pengolahan Limbah Kotoran Jadi Pupuk Organik & Pembuatan Silase Fermentasi',
        guidedPoints: [
          'Kendala apa yang sering dialami peternak (kesulitan mencari rumput saat kemarau atau penumpukan bau kotoran kandang)?',
          'Trik rekayasa apa yang diterapkan (membuat fermentasi rumput/silase dalam drum kedap udara, atau mengolah kotoran jadi pupuk kompos tanaman)?',
          'Bagaimana manfaat solusi tersebut bagi lingkungan sekitar kandang?'
        ],
        placeholder: 'Uraikan cara peternak mengolah limbah kotoran atau membuat cadangan pakan awet untuk musim kemarau... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Praktik Pengolahan Kompos di Desa / Artikel Sains Lingkungan',
        defaultExp: 'Untuk mengantisipasi kelangkaan rumput segar saat musim kemarau, peternak membuat pakan fermentasi (silase) dengan mencampur cacahan rumput, dedak, dan tetes tebu lalu menyimpannya dalam drum plastik tertutup rapat. Selain itu, kotoran kandang dikumpulkan dan difermentasi menjadi pupuk kompos bernilai jual tinggi untuk memupuk sawah.',
        defaultSources: '1. Pengamatan Pengolahan Silase Pakan Ternak Desa.\n2. Buku Petunjuk Teknis Pembuatan Kompos Organik.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Modal Pakan vs Nilai Jual Hewan Ternak',
        subtitle: 'Estimasi Biaya Beli Pakan/Bibit vs Kenaikan Bobot dan Harga Jual Ternak',
        guidedPoints: [
          'Berapa perkiraan modal awal beli bibit ternak (pedet sapi, cempe kambing, atau DOC anak ayam)?',
          'Berapa biaya pakan dan perawatan yang dihabiskan per bulan?',
          'Berapa harga jual ternak saat sudah besar atau saat Idul Adha/pasar hewan, dan berapa perkiraan keuntungan yang didapat?'
        ],
        placeholder: 'Tuliskan perkiraan biaya beli bibit, biaya pakan harian/bulanan, dan estimasi keuntungan penjualan ternak... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Data Penjualan Ternak Warga / Analisis Usaha Agribisnis Ternak',
        defaultExp: 'Membeli bibit pedet sapi bakalan seharga Rp10.000.000 dipelihara selama 6 bulan dengan biaya pakan tambahan dedak Rp200.000 per bulan (total biaya pakan Rp1.200.000). Saat dijual menjelang Idul Adha seharga Rp16.000.000, peternak memperoleh keuntungan bersih sekitar Rp4.800.000 per ekor sapi.',
        defaultSources: '1. Wawancara Peternak Sapi Penggemukan Belitang.\n2. Survei Harga Pasar Hewan Gumawang OKU Timur.'
      }
    ]
  },

  perikanan: {
    key: 'perikanan',
    name: 'Perikanan Air Tawar (Sentra Patin & Lele Belitang)',
    badge: 'Sentra Patin & Lele Sumsel',
    icon: 'phishing',
    desc: 'Kolam Patin/Lele, Pompa Sirkulasi, Kincir Oksigen & Rasio Untung Penjualan Ikan',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Kondisi Air Kolam, Bibit Ikan & Pencegahan Penyakit',
        subtitle: 'Pengamatan Kualitas Air Kolam (Terpal/Tanah), Suhu & Kesehatan Bibit Ikan',
        guidedPoints: [
          'Jenis ikan apa yang dibudidayakan (ikan patin, lele, nila, atau gurami)?',
          'Bagaimana kondisi air kolam yang diamati (warna air hijau lumut/cokelat, bau air, atau kedalaman kolam)?',
          'Bagaimana peternak menjaga ikan agar tidak stres atau terserang jamur dan penyakit kulit?'
        ],
        placeholder: 'Jelaskan jenis ikan, kondisi air kolam, serta cara menjaga ikan agar tetap sehat dan cepat besar... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Kolam Ikan Warga Belitang / Buku Biologi/Perikanan SMA',
        defaultExp: 'Budidaya ikan patin dan lele di Belitang memanfaatkan air irigasi yang stabil. Pembudidaya menjaga air kolam agar berwarna kehijauan karena mengandung plankton alami. Pemberian pakan dilakukan teratur 2 kali sehari pada pagi dan sore hari untuk menjaga daya tahan tubuh ikan dari serangan jamur.',
        defaultSources: '1. Pengamatan di Sentra Kolam Ikan Patin Belitang.\n2. Wawancara Pembudidaya Ikan Air Tawar Setempat.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Peralatan Kolam Ikan & Alat Sirkulasi Modern',
        subtitle: 'Penggunaan Pompa Celup, Kincir Aerasi Oksigen & Jaring Sortir Ukuran',
        guidedPoints: [
          'Alat kerja apa saja yang digunakan (pompa sedot air, kincir aerator penghasil oksigen, jaring penyerok, atau baskom sortir)?',
          'Apa fungsi penting alat-alat tersebut untuk menjaga kelangsungan hidup ikan?',
          'Berapa lama alat tersebut dinyalakan setiap hari dan bagaimana sumber listrik/energinya?'
        ],
        placeholder: 'Sebutkan peralatan yang digunakan pembudidaya ikan, fungsi masing-masing alat, dan cara penggunaannya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Observasi Alat Kolam / Modul Prakarya Budidaya Ikan',
        defaultExp: 'Pembudidaya menggunakan pompa celup listrik untuk menguras dan mengisi air kolam dengan cepat. Di kolam ikan patin dengan padat tebar tinggi, kincir aerasi (aerator) dioperasikan pada malam hingga dini hari untuk menambah pasokan gas oksigen terlarut dalam air sehingga ikan tidak megap-megap ke permukaan.',
        defaultSources: '1. Observasi di Balai Benih Ikan Air Tawar Belitang.\n2. Catatan Kunjungan Kolam Ikan Patin.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Trik Praktis Saluran Pembuangan & Penyortiran Ikan',
        subtitle: 'Pembuatan Pipa Pembuangan Bawah (Central Drain) & Trik Sortir Ikan Cepat',
        guidedPoints: [
          'Masalah teknis apa yang sering terjadi di kolam (air dasar kolam berbau amonia kotoran, atau ikan yang lebih besar memakan ikan kecil)?',
          'Trik rekayasa apa yang dibuat pembudidaya (membuat pipa pembuangan di tengah kolam / central drain, atau menyekat kolam berdasarkan ukuran bibit)?',
          'Bagaimana hasil dari penerapan trik praktis tersebut?'
        ],
        placeholder: 'Uraikan trik peternak ikan dalam membuang endapan kotoran atau memisahkan ikan sesuai ukuran tubuhnya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Praktik Budidaya Kolam Terpal / Diskusi dengan Petani Ikan',
        defaultExp: 'Untuk membuang sisa pakan dan kotoran ikan yang mengendap di dasar kolam tanpa harus menguras seluruh air, pembudidaya membuat sistem pipa tegak (central drain) di tengah kolam. Selain itu, penyortiran rutin setiap dua minggu menggunakan ayakan baskom berlubang dilakukan agar pertumbuhan ikan seragam dan tidak terjadi kanibalisme.',
        defaultSources: '1. Pengamatan Desain Kolam Terpal Bundar Sistem Bioflok.\n2. Pengalaman Pembudidaya Ikan Lele Desa.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Modal Pakan Pelet vs Hasil Panen Ikan',
        subtitle: 'Estimasi Biaya Pembelian Pakan (Sak) dikali Harga Jual Ikan per Kilogram',
        guidedPoints: [
          'Berapa biaya pembelian bibit ikan awal dan berapa sak pakan pelet yang dihabiskan sampai panen?',
          'Berapa total kilogram ikan yang berhasil dipanen dan berapa harga jual per kg ke pasar/pengepul?',
          'Hitung perkiraan keuntungan bersih: Total hasil penjualan dikurangi modal bibit dan pakan.'
        ],
        placeholder: 'Tuliskan perkiraan modal bibit dan pakan, hasil panen kilogram ikan, serta keuntungan yang didapat... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Catatan Penjualan Hasil Panen Ikan / Buku Ekonomi Usaha',
        defaultExp: 'Menebar 5.000 bibit ikan lele membutuhkan modal bibit Rp1.000.000 dan pakan pelet sebanyak 12 sak seharga Rp4.200.000 (total modal Rp5.200.000). Saat panen menghasilkan 450 kg lele dengan harga jual Rp18.000/kg (total penjualan Rp8.100.000), sehingga pembudidaya memperoleh keuntungan bersih sekitar Rp2.900.000 dalam waktu 2,5 bulan.',
        defaultSources: '1. Catatan Pembukuan Kelompok Budidaya Ikan Mina Mandiri.\n2. Informasi Harga Ikan Segar Pasar Gumawang.'
      }
    ]
  },

  industri: {
    key: 'industri',
    name: 'Agro-Industri Pangan & RMU',
    badge: 'RMU, Tahu-Tempe & Kemplang',
    icon: 'precision_manufacturing',
    desc: 'Penggilingan Padi RMU, Pabrik Tahu-Tempe, Kemplang, Mesin Produksi & Untung Usaha',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Karakteristik Bahan Baku & Proses Perubahan Fisika-Kimia',
        subtitle: 'Kadar Air Gabah Kering Giling, Fermentasi Ragi Kedelai & Perebusan Tahu',
        guidedPoints: [
          'Usaha olahan pangan apa yang diamati (pabrik penggilingan padi RMU, pabrik tahu/tempe, atau kemplang panggang)?',
          'Bahan baku utama apa yang digunakan dan bagaimana ciri-ciri bahan baku yang berkualitas bagus (misalnya gabah kering, kedelai kuning bersih)?',
          'Proses perubahan apa yang terjadi selama pengolahan (perendaman air, penggilingan, perebusan, atau fermentasi)?'
        ],
        placeholder: 'Jelaskan jenis usaha olahan pangan yang diamati, bahan baku yang dipakai, serta proses perubahannya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Langsung di Pabrik RMU/Tahu / Buku Kimia/Biologi Terapan',
        defaultExp: 'Pada pabrik tahu di Belitang, biji kedelai pilihan direndam selama 4 jam hingga mengembang, lalu digiling halus bersama air. Bubur kedelai kemudian dimasak mendidih dan digumpalkan dengan larutan biang cuka alami untuk memisahkan ampas tahu dan sari pati tahu yang siap dicetak padat.',
        defaultSources: '1. Pengamatan di Pabrik Tahu Tradisional Belitang.\n2. Wawancara Pemilik Usaha Agro-Industri Pangan.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Mesin Pengolah & Peralatan Mekanisasi Produksi',
        subtitle: 'Mesin Giling Husker RMU, Mesin Parut, Boiler Uap & Alat Cetak Otomatis',
        guidedPoints: [
          'Mesin atau alat modern apa yang dipakai untuk mempercepat proses produksi (mesin giling kedelai, mesin pemecah kulit padi husker, atau boiler uap)?',
          'Apa keunggulan menggunakan mesin tersebut dibanding cara tradisional zaman dahulu?',
          'Bagaimana sumber bahan bakar mesin (listrik dinamo, mesin bensin/solar, atau kayu bakar)?'
        ],
        placeholder: 'Sebutkan mesin yang digunakan dalam proses produksi, fungsi mesin, dan sumber tenaga penggeraknya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Teknisi Mesin / Modul Prakarya Pengolahan Makanan',
        defaultExp: 'Pabrik penggilingan padi (RMU) menggunakan mesin husker otomatis untuk memecah kulit gabah menjadi beras pecah kulit, dilanjutkan mesin polisher untuk memutihkan beras. Mesin bertenaga mesin diesel solar ini mampu menggiling hingga 1,5 ton gabah per jam dengan butir beras utuh yang bersih dari dedak.',
        defaultSources: '1. Observasi Mesin Penggilingan Beras RMU Mitra Belitang.\n2. Buku Petunjuk Pengoperasian Mesin Pengolah Pangan.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Pengaturan Efisiensi Panas & Pengolahan Limbah',
        subtitle: 'Trik Pengaturan Uap Panas Tungku, Cetakan Presisi & Penanganan Air Limbah',
        guidedPoints: [
          'Masalah teknis apa yang dihadapi selama produksi (suhu api tidak stabil, cetakan tidak seragam, atau air limbah berbau)?',
          'Trik atau solusi rekayasa praktis apa yang diterapkan pengrajin/pemilik usaha (membuat cerobong uap hemat kayu, atau kolam penampungan pengendapan limbah)?',
          'Bagaimana hasil dari penerapan solusi tersebut terhadap kelancaran usaha?'
        ],
        placeholder: 'Uraikan trik pengrajin dalam menjaga kualitas hasil produksi atau cara mengolah limbah sisa produksi... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Alur Produksi Pabrik / Diskusi dengan Pekerja Usaha',
        defaultExp: 'Pengrajin tahu merekayasa tungku masak menggunakan sistem boiler pipa uap panas bertekanan, sehingga panas merata dan menghemat konsumsi kayu bakar hingga 40%. Air sisa cucian kedelai dialirkan ke bak pengendapan bertingkat sebelum dibuang agar tidak mencemari lingkungan parit desa.',
        defaultSources: '1. Pengamatan Sistem Sanitasi & Pengolahan Limbah UMKM.\n2. Catatan Rekayasa Tungku Hemat Energi.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Modal Bahan Baku vs Omzet Penjualan',
        subtitle: 'Estimasi Biaya Beli Bahan Mentah + Energi vs Jumlah Produk Terjual per Hari',
        guidedPoints: [
          'Berapa perkiraan biaya modal yang dikeluarkan setiap hari (membeli kedelai/gabah, kayu bakar/gas, dan upah harian)?',
          'Berapa banyak produk yang dihasilkan (jumlah papan tahu, karung beras, atau bungkus kemplang) dan harga jual per satuannya?',
          'Hitung perkiraan laba bersih harian atau bulanan dari usaha pengolahan pangan tersebut.'
        ],
        placeholder: 'Tuliskan rincian modal harian, hasil produk jadi yang terjual, serta estimasi keuntungan bersihnya... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Catatan Penjualan Harian Pabrik / Buku Pelajaran Ekonomi Kelas X',
        defaultExp: 'Pabrik tahu mengolah 100 kg kedelai per hari dengan modal bahan baku Rp1.100.000 ditambah biaya kayu bakar dan operasional Rp200.000 (total modal harian Rp1.300.000). Dari 100 kg kedelai dihasilkan 80 papan tahu seharga Rp22.000 per papan (total omzet Rp1.760.000), menghasilkan laba bersih harian sekitar Rp460.000.',
        defaultSources: '1. Pembukuan Sederhana Usaha Pembuatan Tahu Sejahtera.\n2. Informasi Rata-Rata Harga Komoditas Pangan OKU Timur.'
      }
    ]
  },

  perdagangan: {
    key: 'perdagangan',
    name: 'Perdagangan & UMKM Niaga (Toko Pakaian, Sembako, Kios Pasar & Saprotan)',
    badge: 'Toko Niaga, Sembako & Pasar',
    icon: 'storefront',
    desc: 'Toko Pakaian/Busana, Kios Sembako Pasar, Sarana Pertanian, Penataan Display & Margin Laba',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Karakteristik Produk Dagang, Bahan Kain/Pangan & Daya Simpan',
        subtitle: 'Kualitas Bahan Produk (Kain/Pangan/Kemasan), Pencegahan Kerusakan & Pengaruh Suhu/Lembap',
        guidedPoints: [
          'Jenis barang dagangan apa yang dijual di toko/kios (pakaian jadi/busana, sembako pangan, pupuk/saprotan, atau barang harian)?',
          'Apa karakteristik mutu produk yang paling diminati pembeli (kualitas bahan kain adem, mutu beras/minyak bersih, dsb)?',
          'Bagaimana pedagang menjaga barang dagangan agar tidak rusak akibat kelembapan udara, debu, atau panas matahari?'
        ],
        placeholder: 'Jelaskan jenis barang/pakaian/sarana yang dijual, karakteristik mutunya, dan cara penyimpanannya di toko... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan di Toko Busana / Kios Sembako Pasar Gumawang / Wawancara Pemilik',
        defaultExp: 'Toko pakaian dan perlengkapan niaga di Belitang menjual aneka busana muslim, seragam, dan pakaian harian berbahan katun yang adem dan menyerap keringat. Pemilik toko menjaga kebersihan etalase kaca dan menggunakan penutup plastik transparan agar pakaian tidak terkena debu jalanan serta menjaga sirkulasi udara toko agar tidak lembap.',
        defaultSources: '1. Pengamatan di Toko Pakaian dan Kios Niaga Belitang.\n2. Wawancara Pemilik Usaha Perdagangan.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Peralatan Toko, Display Manekin, Timbangan & Kasir Digital',
        subtitle: 'Pemanfaatan Manekin/Rak Display, Kalkulator/Mesin Kasir, QRIS & Media Promosi Online',
        guidedPoints: [
          'Alat bantu kerja apa saja yang digunakan di toko (gantungan/manekin display pakaian, rak susun, timbangan digital, kalkulator, atau smartphone)?',
          'Bagaimana alat display atau timbangan membantu pembeli melihat pilihan produk dengan jelas dan nyaman?',
          'Apakah toko sudah menggunakan pembayaran digital nontunai (QRIS/transfer) atau promosi pemesanan lewat WhatsApp/medsos?'
        ],
        placeholder: 'Sebutkan alat bantu kerja yang digunakan di toko, fungsinya, dan kemudahan transaksi digital bagi pedagang... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Pemilik Toko / Pengamatan Transaksi Kasir & QRIS',
        defaultExp: 'Toko memanfaatkan gantungan baju display berbahan besi kokoh, manekin pajangan etalase, dan cermin besar agar pembeli dapat melihat model pakaian secara optimal. Untuk mempermudah transaksi, pemilik menyediakan barcode QRIS dan menggunakan aplikasi WhatsApp Bisnis untuk promosi stok baru kepada pelanggan tetap.',
        defaultSources: '1. Observasi Langsung Operasional Toko Pakaian & Sembako Belitang.\n2. Dokumentasi Sistem Transaksi Digital UMKM.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Penataan Display Toko Rapi & Desain Alur Pengunjung',
        subtitle: 'Penataan Rak Bertingkat, Zonasi Jenis Pakaian/Barang & Desain Sirkulasi Udara/Cahaya',
        guidedPoints: [
          'Kendala apa yang sering dialami di ruang toko (ruangan toko sempit, tumpukan pakaian/barang padat, atau pencahayaan kurang terang)?',
          'Trik rekayasa apa yang dibuat pedagang (menyusun pakaian berdasarkan warna/ukuran di rak gantung, rak dinding hemat ruang, lorong jalan leluasa)?',
          'Bagaimana penataan ruang toko tersebut membuat pembeli nyaman dan mempercepat proses mencari barang?'
        ],
        placeholder: 'Uraikan cara pedagang menata pakaian/barang di toko agar menarik, hemat ruang, dan nyaman bagi pengunjung... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Tata Letak Display Toko / Diskusi dengan Pelayan Toko',
        defaultExp: 'Pemilik toko merekayasa tata ruang dengan memasang rak dinding vertikal gantung tiga tingkat untuk memaksimalkan ruangan sempit. Pakaian dikelompokkan rapi berdasarkan kategori usia dan warna cerah di bagian depan etalase, serta disediakan lorong jalan selebar 1 meter dengan lampu sorot LED putih agar pembeli nyaman memilih.',
        defaultSources: '1. Pengamatan Tata Ruang Display Usaha Busana Belitang.\n2. Prinsip Ergonomi dan Penataan Ruang Niaga Sederhana.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Perhitungan Harga Modal Kulakan vs Margin Laba Penjualan',
        subtitle: 'Estimasi Modal Pembelian Grosir, Penetapan Harga Jual & Estimasi Keuntungan Bersih',
        guidedPoints: [
          'Berapa harga modal beli barang/pakaian dari distributor grosir atau produsen?',
          'Berapa harga jual eceran ke pembeli dan berapa margin laba bersih per potong pakaian atau per barang?',
          'Berapa perkiraan total keuntungan bersih per hari atau per bulan dari perputaran barang di toko tersebut?'
        ],
        placeholder: 'Tuliskan perbandingan harga beli modal dan harga jual pakaian/barang, margin laba, serta estimasi omzet toko... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Nota Pembelian Barang / Analisis Keuangan Usaha Dagang Sederhana',
        defaultExp: 'Toko membeli pakaian gamis/kemeja secara grosir seharga Rp65.000 per potong dan menjualnya ke konsumen seharga Rp90.000 (margin laba Rp25.000 per potong). Dengan rata-rata penjualan 15 potong pakaian per hari ditambah barang perlengkapan lain, toko memperoleh laba kotor harian sekitar Rp450.000 atau Rp13.500.000 per bulan.',
        defaultSources: '1. Catatan Pembukuan Penjualan Toko Busana Rahayu Belitang.\n2. Simulasi Laporan Keuangan Usaha Dagang Eceran.'
      }
    ]
  },

  formal: {
    key: 'formal',
    name: 'Jasa Keuangan Mikro & Jasa Perorangan',
    badge: 'Agen BRILink, BUMDes & Jasa',
    icon: 'account_balance',
    desc: 'Agen BRILink Desa, Layanan Mesin EDC, Transfer Uang, Sinyal Jaringan & Pendapatan Fee',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Kebutuhan Sinyal Telekomunikasi & Catu Daya Listrik',
        subtitle: 'Kekuatan Sinyal Jaringan Seluler (4G/LTE), Peran Tower BTS & Stabilitas Arus',
        guidedPoints: [
          'Layanan jasa apa yang diamati (agen perbankan mini/BRILink, unit usaha BUMDes, atau jasa fotokopi/servis)?',
          'Mengapa kestabilan sinyal internet seluler (4G) dan arus listrik sangat penting bagi kelancaran mesin transaksi?',
          'Apa pengaruh cuaca buruk (hujan petir, mati lampu) terhadap jaringan transaksi perbankan di desa?'
        ],
        placeholder: 'Jelaskan peran sinyal jaringan internet dan pasokan listrik dalam mendukung kelancaran layanan jasa transaksi... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan di Agen BRILink Desa / Buku TIK/Fisika Terapan SMA',
        defaultExp: 'Layanan jasa keuangan mikro seperti Agen BRILink di pedesaan OKU Timur sangat bergantung pada kestabilan sinyal gelombang radio 4G dari menara BTS dan suplai listrik PLN. Ketika cuaca mendung tebal atau hujan petir melanda, kualitas sinyal seluler dapat menurun yang menyebabkan proses pengiriman data transaksi menjadi lambat.',
        defaultSources: '1. Pengamatan di Agen BRILink Belitang.\n2. Wawancara Pengelola Layanan Jasa Keuangan Mikro.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Perangkat Mesin EDC & Aplikasi Transaksi Digital',
        subtitle: 'Penggunaan Terminal Mesin EDC Chip, Kartu Debit, QRIS & Mini Printer Struk',
        guidedPoints: [
          'Perangkat teknologi apa yang digunakan untuk melayani nasabah (mesin EDC layar sentuh/tombol, smartphone kasir, atau mini printer bluetooth)?',
          'Bagaimana cara kerja mesin EDC membaca kartu ATM nasabah secara aman melalui chip atau gesek?',
          'Berapa detik waktu yang dibutuhkan mesin untuk menyelesaikan satu kali transfer atau tarik tunai?'
        ],
        placeholder: 'Sebutkan perangkat teknologi yang dipakai oleh agen, fungsinya, dan kemudahan yang didapat warga desa... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Observasi Transaksi Agen / Modul Literasi Finansial & Perbankan Digital',
        defaultExp: 'Agen keuangan menggunakan mesin EDC portabel yang dilengkapi pembaca chip kartu ATM, layar input PIN terenkripsi, dan printer termal mini pencetak struk bukti transfer. Transaksi perbankan seperti tarik tunai atau pembayaran tagihan listrik dapat selesai dalam waktu kurang dari 30 detik tanpa warga harus jauh-jauh ke bank kota.',
        defaultSources: '1. Observasi Mesin Transaksi Perbankan Digital Desa.\n2. Petunjuk Operasional Mesin EDC Bank Mandiri/BRI.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Solusi Daya Cadangan Listrik & Keamanan Brankas Uang',
        subtitle: 'Penyediaan Baterai Powerbank/UPS, Antena Penguat Sinyal & Brankas Kas',
        guidedPoints: [
          'Kendala teknis apa yang sering dialami oleh agen (tiba-tiba mati lampu dari PLN atau sinyal mendadak hilang saat jam sibuk)?',
          'Trik rekayasa apa yang disiapkan agen (menyediakan UPS/powerbank cadangan, modem wifi kartu kedua, atau brankas ganda penahan maling)?',
          'Bagaimana kesiapan tersebut menjaga agar pelayanan warga tetap berjalan lancar dan aman?'
        ],
        placeholder: 'Uraikan trik agen dalam mengantisipasi mati lampu, sinyal lemah, serta menjaga keamanan uang tunai... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Fasilitas Keamanan Agen / Diskusi dengan Pengelola',
        defaultExp: 'Untuk mengantisipasi pemadaman listrik berkala di pedesaan, agen menyediakan perangkat UPS atau baterai darurat agar mesin EDC dan printer struk tetap menyala selama 4 jam. Agen juga menggunakan dua kartu SIM dari operator seluler berbeda di dalam mesin untuk otomatis beralih jaringan saat salah satu provider mengalami gangguan sinyal.',
        defaultSources: '1. Pengamatan Sistem Cadangan Daya Listrik & Jaringan Agen.\n2. Prosedur Standar Operasional Keamanan Agen Keuangan Desa.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Modal Kas Tunai vs Keuntungan Fee Transaksi',
        subtitle: 'Estimasi Perputaran Saldo Kas Harian dikali Jumlah Biaya Admin per Transaksi',
        guidedPoints: [
          'Berapa perkiraan modal uang tunai dan saldo digital yang harus disiapkan agen setiap pagi?',
          'Berapa biaya admin (fee) yang dikenakan per transaksi (misalnya Rp5.000 per transfer atau tarik tunai)?',
          'Berapa jumlah transaksi harian dan berapa perkiraan keuntungan bersih yang didapat agen dalam satu bulan?'
        ],
        placeholder: 'Tuliskan perkiraan perputaran modal tunai, biaya fee admin per transaksi, dan estimasi laba bulanan agen... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Laporan Catatan Transaksi Harian / Perhitungan Finansial Sederhana',
        defaultExp: 'Agen menyiapkan modal kas tunai dan saldo bank sebesar Rp20.000.000 setiap hari untuk melayani rata-rata 40 transaksi warga (tarik tunai panen dan transfer). Dengan membebankan tarif jasa admin rata-rata Rp5.000 per transaksi, agen memperoleh omzet jasa Rp200.000 per hari atau laba bersih sekitar Rp5.500.000 per bulan setelah dipotong biaya pulsa dan kertas struk.',
        defaultSources: '1. Catatan Buku Kas Harian Agen BRILink Sinar Jaya Belitang.\n2. Simulasi Perhitungan Pendapatan Agen Layanan Keuangan Tanpa Kantor.'
      }
    ]
  }
}
    },

    4: {
      "dayNum": 4,
      "title": "Modul Riset Day 4: Jelajah Lingkungan & Alur Distribusi Sektor Unggulan",
      "theme": "Pilar Exploration & Lingkungan Usaha",
      "gradientClass": "from-emerald-950 via-slate-900 to-cyan-950 border-emerald-700/40",
      "tagColorClass": "bg-white/20 text-emerald-100",
      "badgeColorClass": "bg-emerald-400 text-emerald-950",
      "subtitle": "Eksplorasi Akses Jalan, Suasana Lingkungan Sekitar, Alur Pasokan Bahan & Penjualan Produk di OKU Timur",
      "inquiryIntro": "Sebagai peserta <strong>Non-Field Trip</strong>, pada Day 4 ini Anda melanjutkan pengamatan dari <strong>sektor unggulan yang telah Anda pilih di Day 3</strong>. Fokus utama Anda adalah melakukan pengamatan <strong>Exploration (Jelajah Lapangan)</strong>: melihat kondisi jalan menuju lokasi, suasana lingkungan sekitar tempat usaha, serta menelusuri dari mana pasokan bahan datang dan ke mana hasil produknya dijual.",
      "sectors": {
            "pertanian": {
                  "key": "pertanian",
                  "name": "Pertanian Padi Sawah & Tanaman Pangan",
                  "icon": "agriculture",
                  "badge": "Jelajah Sawah & Saluran Irigasi",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Persawahan & Akses Jalan Usaha Tani",
                              "subtitle": "Mengetahui letak hamparan sawah, jarak tempuh, dan kondisi jalan angkut",
                              "guidedPoints": [
                                    "Di desa/dusun mana persawahan ini berada, dan berapa menit perjalanan dari rumah atau sekolah?",
                                    "Bagaimana kondisi jalan menuju sawah (apakah aspal desa, cor semen, atau jalan tanah pematang/tanggul)?",
                                    "Kendaraan apa yang biasa dipakai petani untuk mengangkut bibit, pupuk, dan gabah saat panen (motor keranjang, bentor, atau mobil pikap)?"
                              ],
                              "placeholder": "Tuliskan hasil pengamatan lokasi dan kondisi jalan menuju areal persawahan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi langsung jalan usaha tani di Desa Sidomulyo / Info petani pemilik sawah",
                              "defaultExp": "Areal persawahan terletak di Desa Sidomulyo berjarak sekitar 2 km dari sekolah. Akses jalan desa sudah berupa cor semen yang cukup baik, namun jalan usaha tani menuju petak sawah masih berupa tanah timbunan. Pengangkutan sarana tani dan hasil panen gabah umumnya menggunakan sepeda motor dengan obrok serta mobil pikap sewaan saat panen raya.",
                              "defaultSources": "Observasi langsung rute jalan usaha tani dan keterangan petani Desa Sidomulyo."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Lingkungan Sawah, Saluran Air & Bentang Alam",
                              "subtitle": "Mengamati hamparan lahan, saluran irigasi, dan suasana alam sekitar sawah",
                              "guidedPoints": [
                                    "Apa saja yang ada di sekeliling sawah (hamparan sawah tetangga, parit irigasi, deretan pohon, atau rumah warga)?",
                                    "Dari mana sawah mendapatkan pasokan air (apakah dari saluran irigasi teknis BK Komering, sungai kecil, atau sumur bor pompa)?",
                                    "Bagaimana kebersihan dan kelancaran aliran air di saluran irigasi sekitar sawah tersebut?"
                              ],
                              "placeholder": "Tuliskan kondisi lingkungan, bentang alam, dan saluran air di sekitar sawah... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan saluran irigasi sekunder BK 9 / Peta wilayah persawahan desa",
                              "defaultExp": "Lingkungan sekitar lokasi didominasi oleh bentang sawah yang luas dan berbatasan langsung dengan saluran irigasi sekunder BK. Pasokan air sangat melimpah berasal dari jaringan irigasi Bendungan Perjaya. Aliran air parit cukup lancar dengan tanggul tanah yang ditumbuhi rumput, serta terdapat pondok petani untuk beristirahat.",
                              "defaultSources": "Pengamatan fisik saluran irigasi persawahan dan lingkungan sekitar sawah."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Masuk Saprotan & Pengangkutan Hasil Panen",
                              "subtitle": "Menelusuri dari mana bibit/pupuk dibeli dan ke mana gabah panen dijual",
                              "guidedPoints": [
                                    "Di mana petani membeli benih padi, pupuk subsidi, dan obat pertanian (apakah di kios desa terdekat atau pasar kecamatan)?",
                                    "Setelah dipanen, ke mana gabah hasil panen dibawa (langsung dijual ke penebas/tengkulak di sawah, dibawa ke pabrik RMU lokal, atau disimpan di rumah)?",
                                    "Apakah proses pengangkutan gabah menemui kendala jika sedang turun hujan lebat?"
                              ],
                              "placeholder": "Tuliskan alur masuk pupuk/benih dan ke mana hasil panen padi dijual... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Informasi kios pupuk desa dan keterangan petani saat panen",
                              "defaultExp": "Benih dan pupuk subsidi dibeli petani dari kios saprotan resmi di desa tetangga yang berjarak 1 km. Ketika masa panen tiba, sebagian besar gabah langsung ditimbang di pinggir jalan sawah dan dibeli oleh penebas atau pabrik RMU lokal menggunakan truk kecil. Jika hujan lebat turun, pengangkutan menjadi lebih lambat karena jalan tanah menjadi licin.",
                              "defaultSources": "Wawancara singkat petani dan pantauan transaksi jual beli gabah di sawah."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Akses Sawah",
                              "subtitle": "Mencatat hal menarik di lapangan dan saran sederhana perbaikan jalan/lingkungan",
                              "guidedPoints": [
                                    "Apa hal paling menarik atau pelajaran baru yang kamu dapatkan saat menjelajah sawah ini?",
                                    "Apakah jalan usaha tani dan saluran irigasi di lokasi tersebut sudah memadai, dan apa saran perbaikan yang kamu usulkan?",
                                    "Bagaimana harapanmu untuk kemudahan transportasi para petani di wilayah tersebut?"
                              ],
                              "placeholder": "Tuliskan kesimpulan dan saranmu terkait kemudahan akses persawahan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Refleksi pribadi siswa setelah menjelajah areal persawahan desa",
                              "defaultExp": "Jelajah lapangan ini membuka wawasan bahwa kelancaran panen padi sangat bergantung pada kondisi jalan usaha tani dan kebersihan parit irigasi. Lokasi persawahan ini sangat subur dan strategis, namun disarankan agar jalan tanah pematang diperkeras dengan batu kerikil agar kendaraan pengangkut gabah tidak terperosok saat musim penghujan.",
                              "defaultSources": "Catatan refleksi jelajah lapangan siswa di persawahan OKU Timur."
                        }
                  ]
            },
            "perkebunan": {
                  "key": "perkebunan",
                  "name": "Perkebunan Rakyat (Karet & Kelapa Sawit)",
                  "icon": "forest",
                  "badge": "Jelajah Kebun & Rute Angkut",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Kebun & Kondisi Jalur Transportasi",
                              "subtitle": "Mengetahui letak kebun karet/sawit, jarak tempuh, dan jalan angkut hasil bumi",
                              "guidedPoints": [
                                    "Di mana lokasi kebun karet atau sawit yang kamu amati, dan berapa lama perjalanan ke sana?",
                                    "Bagaimana kondisi jalan akses menuju kebun (jalan aspal poros, jalan tanah kebun, atau melewati jembatan kayu)?",
                                    "Kendaraan apa yang biasa dipakai untuk membawa hasil getah karet atau tandan buah sawit (motor obrok, mobil pikap, atau truk angkut)?"
                              ],
                              "placeholder": "Tuliskan hasil pengamatan letak kebun dan kondisi jalur pengangkutan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi jalan perkebunan di Desa Karang Menjangan / Keterangan pemilik kebun",
                              "defaultExp": "Lokasi kebun karet dan sawit berada di pinggiran desa berjarak sekitar 3 km dari pusat pemukiman. Jalan menuju kebun didominasi tanah merah dan sebagian berkerikil. Pengangkutan getah karet harian dilakukan petani memakai sepeda motor yang dipasangi keranjang kaleng, sedangkan buah sawit bulanan diangkut mobil pikap melewati jalan rintis kebun.",
                              "defaultSources": "Observasi langsung jalan kebun dan keterangan petani kebun karet/sawit."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Lingkungan Kebun, Topografi & Sumber Air",
                              "subtitle": "Mengamati kerapatan pohon, kontur tanah, parit drainase, dan suasana kebun",
                              "guidedPoints": [
                                    "Bagaimana suasana lingkungan di dalam kebun (teduh tertutup kanopi pohon, tanah bergelombang atau datar)?",
                                    "Apakah di kebun terdapat parit pembuangan air atau kolam alami untuk mencegah genangan air saat hujan?",
                                    "Bagaimana kondisi kebersihan gulma atau rumput di bawah pohon perkebunan tersebut?"
                              ],
                              "placeholder": "Tuliskan kondisi lingkungan kebun, kontur tanah, dan saluran air... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan langsung di areal kebun karet rakyat / Peta kebun desa",
                              "defaultExp": "Suasana di dalam kebun karet sangat teduh dan lembap dengan tajuk pohon yang rapat. Kontur tanah relatif datar dengan sedikit parit tanah alami untuk mengalirkan air hujan agar tidak menggenangi akar pohon. Rumput di bawah pohon terlihat dibersihkan secara berkala agar jalur penyadapan lateks di pagi hari tetap bersih dan aman.",
                              "defaultSources": "Pengamatan fisik kondisi lingkungan dan drainase di areal kebun rakyat."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Masuk Pupuk/Bibit & Pengiriman Hasil Panen",
                              "subtitle": "Menelusuri pasokan pupuk dan jalur penjualan getah lateks atau buah sawit",
                              "guidedPoints": [
                                    "Dari mana pemilik kebun membeli bibit unggul, pupuk, atau obat rumput (herbisida)?",
                                    "Ke mana getah karet beku atau buah sawit dijual (ke toke/tengkulak desa, lapak timbangan sawit (ram), atau langsung ke pabrik pengolahan)?",
                                    "Berapa sering hasil panen diangkut keluar dari kebun (harian, mingguan, atau dua mingguan)?"
                              ],
                              "placeholder": "Tuliskan alur masuk pasokan perkebunan dan alur penjualan hasilnya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan toke karet desa / Pengelola ram timbangan sawit lokal",
                              "defaultExp": "Pupuk dan obat herbisida dibeli petani dari toko saprotan di kecamatan Belitang. Untuk penjualan getah karet (bekuan), petani membawanya setiap akhir pekan ke lapak toke karet di desa. Sementara untuk buah sawit, dipanen setiap dua minggu sekali dan langsung dijemput oleh mobil truk milik pengelola ram sawit setempat.",
                              "defaultSources": "Hasil wawancara santai dengan pemilik kebun dan toke penampung hasil bumi."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Akses Perkebunan",
                              "subtitle": "Mencatat hal unik di perkebunan dan ide perbaikan rute pengangkutan",
                              "guidedPoints": [
                                    "Apa pengalaman atau pengetahuan paling menarik yang kamu pelajari dari penjelajahan kebun ini?",
                                    "Kendala apa yang paling sering dialami petani saat membawa hasil panen keluar dari kebun?",
                                    "Apa saran sederhana yang bisa diberikan untuk mempermudah jalan angkut perkebunan di desa?"
                              ],
                              "placeholder": "Tuliskan rangkuman dan ide perbaikan akses perkebunan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Catatan refleksi pribadi siswa setelah jelajah kebun karet/sawit",
                              "defaultExp": "Penjelajahan kebun ini memperlihatkan betapa pentingnya jalan rintis kebun yang kokoh bagi para pekebun. Kendala utama adalah jalan tanah merah yang sangat licin ketika hujan pagi saat jadwal penyadapan. Disarankan agar jalan rintis ditimbun batu sirtu (pasir batu) secara gotong royong agar motor dan pikap pengangkut panen tidak selip.",
                              "defaultSources": "Refleksi hasil jelajah lingkungan perkebunan rakyat OKU Timur."
                        }
                  ]
            },
            "peternakan": {
                  "key": "peternakan",
                  "name": "Peternakan Rakyat OKU Timur (Sapi, Kambing & Ayam)",
                  "icon": "pets",
                  "badge": "Jelajah Kandang & Lingkungan",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Kandang & Akses Jalan Lingkungan",
                              "subtitle": "Mengetahui letak kandang ternak, jarak dari rumah warga, dan akses jalan",
                              "guidedPoints": [
                                    "Di mana lokasi kandang peternakan berada (apakah di pekarangan belakang rumah atau di pinggir kebun/desa)?",
                                    "Berapa jarak kandang dari pemukiman warga tetangga, dan apakah ada jalan masuk yang muat dilewati motor/mobil?",
                                    "Kendaraan apa yang biasa digunakan untuk membawa rumput pakan atau mengangkut ternak saat dijual?"
                              ],
                              "placeholder": "Tuliskan letak kandang peternakan dan kemudahan akses jalannya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi langsung lokasi peternakan sapi/kambing / Info peternak",
                              "defaultExp": "Lokasi kandang sapi dan kambing berada di bagian belakang pekarangan warga yang berbatasan dengan kebun, berjarak sekitar 50 meter dari rumah pemukiman. Akses jalan menuju kandang berupa jalan gang cor semen lebar 2 meter yang bisa dilalui sepeda motor pengangkut rumput pakan serta mobil bak terbuka saat menjual ternak.",
                              "defaultSources": "Observasi langsung posisi kandang ternak dan keterangan warga peternak."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Tata Ruang Kandang, Pasokan Air & Kebersihan",
                              "subtitle": "Mengamati sirkulasi udara kandang, sumber air minum ternak, dan kebersihan sekitar",
                              "guidedPoints": [
                                    "Bagaimana bentuk kandang dan sirkulasi udaranya (terbuka, beratap seng/genteng, lantai semen atau panggung)?",
                                    "Dari mana peternak mendapatkan air untuk minum ternak dan memandikan kandang (sumur bor, air pam, atau sumur gali)?",
                                    "Bagaimana pengelolaan kotoran ternak agar lingkungan sekitar tidak berbau menyengat?"
                              ],
                              "placeholder": "Tuliskan kondisi lingkungan kandang, pasokan air, dan kebersihannya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik kebersihan kandang ternak dan sumber air bersih",
                              "defaultExp": "Kandang sapi dibuat dengan model terbuka beralaskan lantai semen miring agar kotoran mudah digelontor air. Pasokan air sangat lancar menggunakan pompa sumur bor listrik yang disambungkan ke bak penampung. Kotoran ternak dikumpulkan di bak fermentasi di pojok kandang untuk dijadikan pupuk kandang bagi tanaman sehingga tidak menimbulkan bau mengganggu.",
                              "defaultSources": "Pengamatan langsung tata ruang kandang dan sistem sanitasi peternakan."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Pasokan Pakan/Bibit & Penjualan Ternak/Telur",
                              "subtitle": "Menelusuri dari mana pakan/konsentrat didapat dan ke mana ternak dijual",
                              "guidedPoints": [
                                    "Dari mana pakan ternak diperoleh (ngarit rumput gajah dari kebun sendiri, mencari jerami sawah, atau beli pakan konsentrat/dedak di penggilingan padi)?",
                                    "Ke mana ternak dewasa, anak ternak, atau telur/daging biasanya dijual (ke blantik/pasar hewan, pembeli qurban, atau warga sekitar)?",
                                    "Apakah pembeli datang sendiri ke kandang atau peternak yang mengantar ke pasar?"
                              ],
                              "placeholder": "Tuliskan alur pasokan pakan dan ke mana ternak/hasil panen dijual... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan peternak mengenai sumber pakan dan pasar penjualan ternak",
                              "defaultExp": "Pakan hijauan rumput gajah dan lamtoro diperoleh dari kebun sendiri, ditambah dedak halus yang dibeli murah dari pabrik penggilingan padi (RMU) terdekat. Untuk penjualan, biasanya pedagang ternak (blantik) atau pembeli aqiqah/qurban datang langsung memilih ternak di kandang, lalu diangkut menggunakan mobil pikap sewaan.",
                              "defaultSources": "Keterangan peternak lokal mengenai perputaran pakan dan penjualan ternak."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Lingkungan Peternakan",
                              "subtitle": "Mencatat hal menarik seputar peternakan dan ide menjaga lingkungan tetap sehat",
                              "guidedPoints": [
                                    "Apa hal paling berkesan yang kamu pelajari dari tata cara peternak merawat hewannya di lingkungan desa?",
                                    "Apakah ada tantangan lingkungan seperti lalat atau aroma kotoran saat musim hujan?",
                                    "Apa ide sederhana yang bisa diterapkan agar peternakan rakyat semakin produktif dan tetap ramah lingkungan?"
                              ],
                              "placeholder": "Tuliskan rangkuman dan ide perbaikan lingkungan peternakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Refleksi siswa mengenai keterpaduan peternakan dan lingkungan desa",
                              "defaultExp": "Melalui jelajah ini terlihat bahwa peternakan rakyat sangat hemat biaya karena memanfaatkan sisa limbah pertanian seperti dedak dan jerami sawah. Tantangan saat musim hujan adalah kelembapan kandang. Pengolahan kotoran menjadi pupuk kompos atau biogas sangat berpotensi dikembangkan agar kandang lebih bersih dan lingkungan tetangga tetap nyaman.",
                              "defaultSources": "Catatan refleksi hasil peninjauan peternakan rakyat OKU Timur."
                        }
                  ]
            },
            "perikanan": {
                  "key": "perikanan",
                  "name": "Perikanan Air Tawar (Sentra Patin & Lele Belitang)",
                  "icon": "phishing",
                  "badge": "Jelajah Kolam & Sumber Air",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Kolam Ikan & Akses Jalan Menuju Kolam",
                              "subtitle": "Mengetahui letak kolam budidaya, jarak dari jalan poros, dan aksesibilitas",
                              "guidedPoints": [
                                    "Di mana kolam budidaya ikan berada (kolam tanah di dekat sawah, kolam terpal pekarangan, atau kolam semen)?",
                                    "Berapa jarak dari jalan utama dan bagaimana akses kendaraan menuju tepi kolam?",
                                    "Apakah mobil pikap atau truk pembeli ikan bisa parkir dekat kolam untuk mempermudah proses panen?"
                              ],
                              "placeholder": "Tuliskan letak kolam budidaya dan kondisi akses jalannya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi kolam budidaya patin/lele di Belitang / Keterangan pembudidaya",
                              "defaultExp": "Sentra kolam ikan air tawar terletak di pinggiran desa berdekatan dengan area persawahan irigasi. Akses jalan menuju kolam berupa jalan cor selebar 3 meter yang dapat dilalui mobil pikap pengangkut drum ikan hidup. Jarak kolam ke jalan poros utama kecamatan sekitar 500 meter sehingga memudahkan proses distribusi hasil panen.",
                              "defaultSources": "Observasi langsung akses jalan kolam ikan dan keterangan pembudidaya."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Sumber Air Kolam & Lingkungan Sekitar",
                              "subtitle": "Mengamati aliran air pengisi kolam, saluran pembuangan, dan suasana sekitar",
                              "guidedPoints": [
                                    "Dari mana air pengisi kolam berasal (aliran irigasi teknis Belitang, sungai kecil, atau sumur bor pompa celup)?",
                                    "Bagaimana cara air dikeluarkan saat pembersihan kolam atau panen (apakah ada pipa pembuangan ke parit umum)?",
                                    "Apakah lingkungan sekitar kolam aman dari luapan air banjir saat hujan lebat?"
                              ],
                              "placeholder": "Tuliskan pengamatan sumber air dan lingkungan di sekitar kolam... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan saluran air irigasi kolam dan tanggul penahan banjir",
                              "defaultExp": "Sumber air utama kolam berasal dari saluran sekunder irigasi Belitang yang dialirkan melalui pipa paralon, dibantu sumur bor saat pergantian musim. Pematang kolam dibangun cukup tinggi dengan tanggul tanah yang kokoh untuk mencegah luapan air saat hujan deras. Saluran pembuangan air dialirkan ke parit pembuangan desa secara teratur.",
                              "defaultSources": "Pengamatan fisik sistem perairan kolam patin/lele di Belitang."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Masuk Pakan Pelet & Pengangkutan Panen Ikan",
                              "subtitle": "Menelusuri dari mana pakan ikan dibeli dan ke mana ikan segar dipasarkan",
                              "guidedPoints": [
                                    "Dari mana pembudidaya membeli pakan pelet pabrikan atau bahan pakan tambahan (toko pakan kecamatan / agen)?",
                                    "Ke mana ikan patin atau lele hasil panen dijual (ke pedagang pasar Gumawang, pengepul ikan hidup luar kota, atau warung pecel lele)?",
                                    "Bagaimana cara ikan diangkut agar tetap segar dan hidup saat tiba di tempat pembeli?"
                              ],
                              "placeholder": "Tuliskan alur pasokan pakan dan jalur distribusi penjualan ikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan pemilik kolam dan pedagang penampung ikan segar",
                              "defaultExp": "Pakan pelet ikan dibeli dari agen pakan resmi di Gumawang dengan sistem tempo atau tunai per sak. Saat panen tiba, pengepul ikan besar datang membawa mobil pikap yang dilengkapi drum plastik dan aerator oksigen. Ikan ditimbang hidup-hidup di tepi kolam dan langsung dikirim ke pasar ikan Gumawang, Baturaja, hingga Palembang.",
                              "defaultSources": "Wawancara dengan pembudidaya ikan dan agen penampung ikan konsumsi."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Akses Budidaya Ikan",
                              "subtitle": "Mencatat temuan menarik tentang budidaya air tawar dan ide peningkatan sarana",
                              "guidedPoints": [
                                    "Apa keunggulan lokasi kolam ini yang mendukung keberhasilan budidaya ikan di OKU Timur?",
                                    "Tantangan apa yang dihadapi terkait pasokan air atau jalan angkut pakan dan ikan?",
                                    "Apa saranmu untuk membantu pembudidaya ikan agar distribusinya semakin cepat dan hemat biaya?"
                              ],
                              "placeholder": "Tuliskan rangkuman jelajah dan saran perbaikan fasilitas budidaya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Catatan kesimpulan siswa setelah jelajah kolam perikanan air tawar",
                              "defaultExp": "Keberhasilan budidaya ikan patin dan lele di Belitang sangat didukung oleh ketersediaan air irigasi yang melimpah sepanjang tahun serta akses jalan cor yang memadai. Saran yang dapat diberikan adalah penerangan jalan menuju kawasan kolam pada malam hari agar peternak lebih mudah dan aman saat melakukan pengawasan dan pemberian pakan malam.",
                              "defaultSources": "Refleksi hasil jelajah sentra perikanan air tawar Belitang OKU Timur."
                        }
                  ]
            },
            "industri": {
                  "key": "industri",
                  "name": "Agro-Industri Pangan (Pabrik RMU, Tahu & Kemplang)",
                  "icon": "precision_manufacturing",
                  "badge": "Jelajah Pengolahan & Distribusi",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Tempat Produksi & Akses Kendaraan Angkut",
                              "subtitle": "Mengetahui letak pabrik penggilingan padi/tahu, jarak jalan raya, dan akses truk",
                              "guidedPoints": [
                                    "Di mana lokasi tempat usaha pengolahan ini berada (pinggir jalan desa, kawasan sentra usaha, atau pekarangan rumah)?",
                                    "Apakah jalannya cukup lebar untuk dilewati kendaraan muatan berat seperti mobil pikap atau truk pengangkut bahan?",
                                    "Bagaimana kemudahan parkir dan aktivitas bongkar muat barang di depan tempat usaha tersebut?"
                              ],
                              "placeholder": "Tuliskan letak tempat produksi dan kemudahan akses bongkar muat barang... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi langsung lokasi pabrik RMU / pabrik tahu-tempe di Belitang",
                              "defaultExp": "Pabrik pengolahan berada di tepi jalan poros desa yang sudah beraspal hotmix dengan lebar jalan 4 meter. Lokasi ini memiliki halaman depan yang cukup luas dan beralaskan cor semen tebal, sehingga memudahkan truk pengangkut gabah atau kedelai untuk parkir dan melakukan aktivitas bongkar muat barang tanpa mengganggu lalu lintas warga.",
                              "defaultSources": "Observasi langsung posisi tempat usaha pengolahan pangan dan lalu lintas jalan."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Lingkungan Tempat Usaha, Air Bersih & Daya Listrik",
                              "subtitle": "Mengamati kebersihan ruang produksi, pasokan air bersih, listrik, dan saluran limbah",
                              "guidedPoints": [
                                    "Bagaimana kondisi kebersihan dan sirkulasi udara di tempat produksi tersebut?",
                                    "Dari mana pasokan air bersih untuk pengolahan diperoleh (sumur bor, air PAM, atau mata air)?",
                                    "Apakah daya listrik PLN atau mesin diesel penggerak beroperasi lancar tanpa sering mati lampu?",
                                    "Ke mana air sisa pengolahan atau debu sekam diarahkan agar tidak mencemari tetangga?"
                              ],
                              "placeholder": "Tuliskan kondisi lingkungan produksi, air bersih, listrik, dan penanganan sisa usaha... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik instalasi air dan mesin pengolah di tempat usaha",
                              "defaultExp": "Ruang produksi memiliki ventilasi udara yang tinggi agar uap panas dan debu dapat keluar dengan lancar. Pasokan air bersih mengandalkan sumur bor bertenaga pompa jet-pump dengan kualitas air jernih tidak berbau. Daya listrik menggunakan pasokan PLN tarif usaha ditambah genset cadangan, sedangkan limbah cair dialirkan ke bak penampungan pengendapan khusus.",
                              "defaultSources": "Pengamatan langsung kondisi lingkungan kerja dan fasilitas utilitas pabrik."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Masuk Bahan Baku & Distribusi Produk Jadi ke Pasar",
                              "subtitle": "Menelusuri pasokan gabah/kedelai/tapioka dan ke mana produk pangan dipasarkan",
                              "guidedPoints": [
                                    "Dari mana bahan baku utama dibeli (dari petani sawah sekitar, distributor pasar Gumawang, atau agen grosir)?",
                                    "Ke mana produk jadi (beras kemasan, tahu segar, atau kemplang panggang) dipasarkan sehari-hari?",
                                    "Apakah pembeli/pedagang sayur keliling datang langsung mengambil barang setiap pagi atau diantar oleh pemilik usaha?"
                              ],
                              "placeholder": "Tuliskan alur bahan baku masuk dan ke mana produk olahan dijual... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan pemilik usaha pengolahan dan pedagang pengecer",
                              "defaultExp": "Bahan baku gabah dibeli langsung dari petani padi di desa-desa sekitar saat musim panen, sedangkan kedelai dibeli dari agen grosir di Gumawang. Setiap subuh, para pedagang sayur keliling dan pemilik warung makan datang langsung mengambil tahu dan beras segar. Sebagian produk kemplang dan beras bermerk juga dikirim memakai pikap ke toko grosir di pasar.",
                              "defaultSources": "Keterangan pengelola usaha pengolahan pangan mengenai rantai pasok dan pasarnya."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Kelayakan Lokasi Usaha",
                              "subtitle": "Mencatat nilai strategis tempat usaha dan saran perbaikan akses atau fasilitas lingkungan",
                              "guidedPoints": [
                                    "Menurutmu, mengapa lokasi usaha ini dipilih dan apakah posisinya sudah menguntungkan bagi kelancaran bisnisnya?",
                                    "Apa kendala yang masih dirasakan terkait akses jalan, cuaca, atau pengiriman barang?",
                                    "Apa saran sederhana yang bisa diusulkan agar tempat pengolahan ini lebih maju dan tertata rapi?"
                              ],
                              "placeholder": "Tuliskan kesimpulan dan usulan perbaikan untuk tempat usaha pengolahan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Catatan analisis kelayakan tempat usaha agro-industri pangan",
                              "defaultExp": "Lokasi usaha ini sangat strategis karena dekat dengan sumber bahan baku pertanian dan berada di jalur transportasi utama desa. Usaha ini berhasil menyerap tenaga kerja lokal dan menggerakkan ekonomi sekitar. Disarankan agar area pembuangan sekam atau pengeringan produk diberi atap pelindung transparan agar tidak terganggu saat cuaca hujan tiba.",
                              "defaultSources": "Refleksi analisis siswa terhadap kelayakan lokasi agro-industri lokal."
                        }
                  ]
            },
            "perdagangan": {
                  "key": "perdagangan",
                  "name": "Perdagangan & Saprotan (Kios Pupuk, Bibit & Sembako)",
                  "icon": "storefront",
                  "badge": "Jelajah Letak Kios & Pasar",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Posisi Kios, Keramaian Jalan & Kemudahan Akses Pembeli",
                              "subtitle": "Mengetahui letak toko/kios di pinggir jalan poros, keramaian lalu lintas, dan parkir",
                              "guidedPoints": [
                                    "Di mana letak kios atau toko yang kamu amati (persimpangan jalan desa, dekat pasar, atau pinggir jalan poros kecamatan)?",
                                    "Apakah lokasi toko mudah dilihat dan dijangkau oleh warga yang sedang naik motor atau sepeda?",
                                    "Bagaimana kondisi area parkir di depan toko, apakah luas dan aman untuk kendaraan pembeli?"
                              ],
                              "placeholder": "Tuliskan posisi toko/kios, suasana keramaian jalan, dan area parkirnya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi langsung letak kios saprotan / toko sembako di Belitang",
                              "defaultExp": "Kios saprotan dan sembako ini berlokasi strategis di persimpangan jalan poros desa yang ramai dilalui warga dari berbagai dusun. Posisi toko sangat mudah terlihat dari kejauhan dengan plang nama yang jelas. Di depan toko tersedia halaman parkir berlantai semen yang muat untuk 6 motor dan 1 mobil pikap pelanggan tanpa mengganggu badan jalan.",
                              "defaultSources": "Observasi langsung posisi kios perdagangan dan suasana lalu lintas sekitar."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Lingkungan Kios, Tempat Parkir & Tata Letak Toko",
                              "subtitle": "Mengamati suasana sekitar toko, penerangan, keamanan, dan kerapian etalase",
                              "guidedPoints": [
                                    "Bagaimana suasana lingkungan sekitar toko (apakah deretan toko lain, dekat pemukiman, atau dekat balai desa)?",
                                    "Bagaimana penataan barang dagangan di dalam toko (apakah rapi, ada lorong pembeli, dan mudah mencari barang)?",
                                    "Bagaimana penerangan dan keamanan toko saat malam hari (apakah ada lampu terang dan pintu rolling door besi)?"
                              ],
                              "placeholder": "Tuliskan kondisi lingkungan toko, penataan barang, dan keamanannya... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik penataan display barang dagangan di toko",
                              "defaultExp": "Lingkungan sekitar kios tergolong ramai dan aman karena bersebelahan dengan deretan warung warga dan dekat dengan balai pertemuan desa. Di dalam toko, barang dagangan seperti sak pupuk dan benih ditata di atas palet kayu agar tidak lembap, sementara sembako dipajang rapi di rak besi. Pintu toko memakai rolling door kokoh dan dilengkapi kamera CCTV mini.",
                              "defaultSources": "Pengamatan langsung kerapian tata ruang dan keamanan toko dagang."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Pasokan Barang dari Distributor & Penjualan ke Pelanggan",
                              "subtitle": "Menelusuri dari mana stok barang didatangkan dan siapa saja pembeli setianya",
                              "guidedPoints": [
                                    "Dari mana pemilik toko kulakan atau memesan barang dagangan (diantar sales distributor mobil boks, ambil sendiri di grosir Gumawang, atau pesanan agen resmi)?",
                                    "Siapa pembeli utama toko ini (petani sawah sekitar, ibu rumah tangga, warung kecil eceran dusun)?",
                                    "Kapan waktu toko paling ramai dikunjungi pelanggan (pagi hari, sore sepulang dari sawah, atau awal bulan/musim tanam)?"
                              ],
                              "placeholder": "Tuliskan alur pasokan barang dagangan dan waktu paling ramai pembeli... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan pemilik toko mengenai jadwal kulakan barang dan pelanggan",
                              "defaultExp": "Stok barang dagangan seperti pupuk dan obat pertanian dikirim langsung oleh mobil distributor resmi setiap minggu, sedangkan barang sembako diambil sendiri oleh pemilik toko di pasar grosir Gumawang. Toko paling ramai dikunjungi petani pada sore hari sepulang dari ladang serta menjelang musim tanam serentak untuk membeli kebutuhan pupuk.",
                              "defaultSources": "Hasil obrolan dengan pemilik kios perdagangan mengenai perputaran pasokan barang."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Strategis Lokasi Kios",
                              "subtitle": "Mencatat kunci sukses lokasi kios dan saran peningkatan layanan bagi warga",
                              "guidedPoints": [
                                    "Apa keunggulan terbesar dari pemilihan lokasi toko ini dibandingkan toko pesaing lainnya?",
                                    "Apakah ada kesulitan pengiriman barang saat musim tertentu atau masalah sinyal/transaksi digital?",
                                    "Apa usulanmu agar toko ini makin disukai pelanggan (misalnya penambahan pembayaran QRIS, kanopi peneduh parkir, atau layanan antar)?"
                              ],
                              "placeholder": "Tuliskan kesimpulan strategis dan usulan peningkatan untuk toko/kios... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Catatan evaluasi keunggulan lokasi dan pelayanan toko dagang",
                              "defaultExp": "Keunggulan utama toko ini adalah lokasinya yang berada tepat di perlintasan jalur utama petani menuju area persawahan, didukung keramahan pemilik dalam melayani warga. Saran perbaikan adalah pemasangan kanopi di atas area parkir motor agar kendaraan pembeli tidak kepanasan atau kehujanan, serta menyediakan opsi pembayaran QRIS untuk mempermudah transaksi.",
                              "defaultSources": "Refleksi analisis siswa terhadap letak strategis kios perdagangan di OKU Timur."
                        }
                  ]
            },
            "formal": {
                  "key": "formal",
                  "name": "Jasa Keuangan Mikro (Agen BRILink, BUMDes & Jasa)",
                  "icon": "account_balance",
                  "badge": "Jelajah Layanan & Akses Warga",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Jelajah Lokasi Gerai Layanan & Kemudahan Jangkauan Warga Desa",
                              "subtitle": "Mengetahui letak gerai transaksi keuangan mikro, kemudahan akses jalan, dan jarak",
                              "guidedPoints": [
                                    "Di mana posisi gerai agen BRILink atau kantor BUMDes yang kamu amati (gabung dengan toko sembako, di rumah sendiri, atau dekat pusat pasar desa)?",
                                    "Apakah posisinya mudah dijangkau dengan jalan kaki atau motor oleh warga sekitar dusun?",
                                    "Berapa perkiraan jarak warga dari gerai ini dibandingkan jika mereka harus pergi ke kantor bank di ibukota kecamatan?"
                              ],
                              "placeholder": "Tuliskan letak gerai layanan keuangan mikro dan kemudahan akses bagi warga... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi langsung lokasi gerai agen BRILink di desa / Info pengelola",
                              "defaultExp": "Gerai agen BRILink ini berlokasi menyatu dengan toko kelontong di tepi jalan utama desa yang padat penduduk. Keberadaan gerai ini sangat memangkas jarak warga, karena warga cukup berkendara 3 menit untuk transfer uang atau tarik tunai, tanpa harus menempuh perjalanan 12 km menuju kantor cabang bank di pusat kecamatan Gumawang.",
                              "defaultSources": "Observasi langsung posisi agen keuangan mikro dan keterangan warga pengguna jasa."
                        },
                        {
                              "key": "B",
                              "title": "Jelajah Lingkungan Sekitar, Keamanan Lokasi & Sinyal/Listrik",
                              "subtitle": "Mengamati suasana sekitar gerai, keamanan bertransaksi, kestabilan listrik dan sinyal",
                              "guidedPoints": [
                                    "Bagaimana suasana keamanan di sekitar gerai (apakah tempatnya terbuka, terang, dan ada orang lain di sekitar)?",
                                    "Bagaimana kestabilan sinyal internet seluler (4G) untuk mengoperasikan mesin EDC atau aplikasi HP transaksi?",
                                    "Bagaimana ketersediaan daya listrik (apakah ada cadangan baterai/powerbank/UPS jika listrik desa padam)?"
                              ],
                              "placeholder": "Tuliskan kondisi keamanan tempat, kestabilan sinyal internet, dan kelistrikan gerai... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik kelancaran sinyal EDC dan fasilitas gerai agen",
                              "defaultExp": "Suasana gerai terasa nyaman dan aman karena berada di ruangan depan toko yang terang benderang dan selalu dipantau pemilik. Kestabilan sinyal seluler 4G di titik ini sangat baik sehingga proses transaksi mesin EDC berjalan cepat dalam hitungan detik. Pengelola juga menyiapkan powerbank dan genset toko jika terjadi pemadaman listrik berkala.",
                              "defaultSources": "Pengamatan fisik perangkat mesin transaksi EDC dan lingkungan sekitar gerai."
                        },
                        {
                              "key": "C",
                              "title": "Jelajah Alur Kebutuhan Uang Tunai & Layanan Transaksi Warga",
                              "subtitle": "Menelusuri dari mana uang tunai disiapkan dan jenis transaksi yang paling sering dilayani",
                              "guidedPoints": [
                                    "Bagaimana pengelola gerai menyiapkan saldo uang tunai (apakah dari setoran belanja toko, atau setor-tarik rutin ke kantor cabang bank)?",
                                    "Layanan apa yang paling banyak dicari warga (tarik uang tunai hasil panen, transfer kiriman anak sekolah/rantau, bayar tagihan listrik/BPJS, atau transfer pupuk)?",
                                    "Pada hari atau momen apa gerai mengalami lonjakan transaksi paling padat?"
                              ],
                              "placeholder": "Tuliskan alur perputaran uang tunai dan transaksi yang paling ramai dicari... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Keterangan pemilik agen BRILink mengenai aktivitas transaksi warga desa",
                              "defaultExp": "Uang tunai disiapkan pengelola dari perputaran hasil penjualan toko sembako serta setor-tarik rutin ke bank dua kali seminggu. Transaksi yang paling sering dilayani adalah transfer pembayaran hasil panen gabah/karet, penarikan uang belanja oleh ibu-ibu, dan pembayaran token listrik. Gerai paling ramai saat musim panen dan tanggal awal bulan saat bantuan sosial cair.",
                              "defaultSources": "Keterangan pengelola agen keuangan mikro mengenai alur transaksi keuangan warga."
                        },
                        {
                              "key": "D",
                              "title": "Rangkuman Jelajah & Catatan Manfaat Lokasi Layanan Keuangan",
                              "subtitle": "Mencatat peran penting lokasi gerai bagi ekonomi desa dan saran kenyamanan layanan",
                              "guidedPoints": [
                                    "Mengapa lokasi gerai jasa keuangan mikro di tengah desa sangat membantu perekonomian masyarakat petani?",
                                    "Apa saran yang bisa diusulkan untuk meningkatkan kenyamanan atau privasi warga saat melakukan transaksi uang tunai?",
                                    "Bagaimana kesanmu terhadap pentingnya layanan keuangan digital di pedesaan OKU Timur?"
                              ],
                              "placeholder": "Tuliskan kesimpulan manfaat lokasi layanan dan saran kenyamanan bertransaksi... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Catatan refleksi siswa tentang pentingnya inklusi keuangan mikro di desa",
                              "defaultExp": "Jelajah ini membuktikan bahwa lokasi gerai keuangan mikro di tengah desa menjadi tulang punggung transaksi keuangan yang sangat efektif dan efisien. Warga menghemat waktu dan ongkos bensin. Disarankan agar gerai menyediakan meja sekat kecil atau kursi tunggu agar privasi nominal transaksi nasabah lebih terlindungi dan nasabah merasa lebih nyaman saat antre.",
                              "defaultSources": "Refleksi analisis siswa terhadap keberadaan jasa keuangan mikro di desa."
                        }
                  ]
            }
      }
},

    5: {
      "dayNum": 5,
      "title": "Modul Riset Day 5: Video Presentasi STEM (5–10 Menit): Sains & Teknologi Sektor",
      "theme": "Pilar Sains & Teknologi (Video Presentasi HP 7 Sektor)",
      "gradientClass": "from-amber-950 via-slate-900 to-purple-950 border-amber-700/40",
      "tagColorClass": "bg-white/20 text-amber-100",
      "badgeColorClass": "bg-amber-400 text-amber-950",
      "subtitle": "Panduan Pembuatan Rekaman Video Penjelasan Mandiri (5–10 Menit, Tanpa Wawancara): Pilar Sains (Kondisi Alami & Nutrisi/Biologi) dan Pilar Teknologi (Alat/Mesin Kerja) pada 7 Sektor Unggulan OKU Timur",
      "inquiryIntro": "Hari ini Anda ditugaskan menyusun dan merekam <strong>Video Penjelasan STEM Bagian 1: Sains & Teknologi</strong> berdurasi <strong>5–10 Menit</strong> menggunakan kamera HP. <strong>Perhatian Penting: TIDAK ADA WAWANCARA pedagang atau narasumber lain!</strong> Anda tampil berbicara di depan kamera HP (atau voice-over merekam objek) menerangkan sains bahan alami dan teknologi alat kerja sektor Anda.",
      "sectors": {
            "pertanian": {
                  "key": "pertanian",
                  "name": "Pertanian Padi Sawah",
                  "badge": "Video Sains & Teknologi",
                  "icon": "agriculture",
                  "desc": "Sains Tanah Aluvial & Irigasi BK, Nutrisi Padi N-P-K, Traktor, Nozzle Sprayer & Combine Harvester (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Sawah Belitang (00:00–01:30)",
                              "subtitle": "Menyusun sapaan pembuka santun, sebutkan nama/kelas, dan latar lokasi persawahan",
                              "guidedPoints": [
                                    "Sapa penonton dan perkenalkan diri secara jelas: \"Halo semuanya, saya [Nama], siswa kelas X SMAN 1 Belitang, peserta Kokurikuler FINCESTEM 2026.\"",
                                    "Tunjukkan hamparan sawah di sekitar Anda dan jelaskan desa tempat sawah berada (misal BK 9, BK 10, dll).",
                                    "Sampaikan tujuan video: \"Dalam video 5-10 menit ini, saya akan menjelaskan dua pilar utama di sektor pertanian padi, yaitu Sains kondisi alami dan Teknologi alat kerja modern.\""
                              ],
                              "placeholder": "Tuliskan draf naskah bicara pembukaan video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rencana skrip rekaman kamera depan HP di persawahan BK 10",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa], siswa kelas X SMAN 1 Belitang. Pada video riset kokurikuler Day 5 ini, saya berada di areal persawahan irigasi Desa Sidomulyo BK 9. Selama 5-10 menit ke depan, saya akan menerangkan secara mandiri penerapan pilar Sains kondisi tanah dan air, serta pilar Teknologi mekanisasi alat kerja yang digunakan petani padi di lumbung pangan OKU Timur.",
                              "defaultSources": "Draf Naskah Pembukaan Rekaman Video Mandiri Siswa (Klip 01_Intro_Pertanian.mp4)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Tanah, Air Irigasi & Nutrisi Padi (01:30–04:30)",
                              "subtitle": "Menerangkan proses biologis/kimia tanah sawah dan kebutuhan pupuk tanpa membaca teks kaku",
                              "guidedPoints": [
                                    "Sorot atau tunjukkan tanah sawah dan air saluran irigasi BK yang mengalir ke petak sawah.",
                                    "Jelaskan mengapa tanah sawah harus berlumpur dan kedap air agar akar padi menyerap air dan pupuk secara maksimal.",
                                    "Terangkan fungsi pupuk Urea (Nitrogen) untuk daun dan anakan, serta pupuk NPK (Fosfor dan Kalium) untuk pengisian bulir gabah."
                              ],
                              "placeholder": "Tuliskan poin penjelasan sains padi yang Anda ucapkan di depan kamera... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan tanah sawah dan buku teks Biologi Pertanian",
                              "defaultExp": "Dari sisi Sains, tanah sawah di Belitang terbentuk dari endapan aluvial Sungai Komering yang sangat subur. Petani menjaga lapisan lumpur olah agar kedap air sehingga pupuk tidak hanyut ke bawah tanah. Pada umur muda, tanaman padi memerlukan banyak unsur Nitrogen dari pupuk Urea agar daun rimbun dan anakan banyak, lalu saat mulai bunting diberikan kalium agar bulir gabah padat berisi dan batang tidak mudah rebah.",
                              "defaultSources": "Catatan Pengamatan Lapangan Sains Tanah dan Nutrisi Padi di BK 9."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Alat Mesin Pertanian Modern (04:30–07:30)",
                              "subtitle": "Menyorot traktor pembajak, sprayer elektrik, pompa alkon, atau mesin combine harvester",
                              "guidedPoints": [
                                    "Arahkan kamera ke traktor, tangki semprot elektrik, atau mesin combine harvester di sawah/gudang.",
                                    "Jelaskan cara kerja alat tersebut: bagaimana mesin traktor mencacah tanah, atau bagaimana nosel semprot memecah cairan obat hama.",
                                    "Sampaikan bagaimana mesin-mesin ini mempercepat kerja petani dari berhari-hari menjadi hanya beberapa jam."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi alat kerja yang Anda sorot dan ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik mesin traktor roda dua dan combine harvester di sawah",
                              "defaultExp": "Pilar Teknologi yang sangat menonjol di sawah ini adalah traktor bajak dan mesin panen combine harvester. Mesin traktor roda dua memutar pisau rotari berbahan bakar solar untuk membalik tanah keras menjadi lumpur siap tanam. Saat panen, mesin combine harvester mampu memotong malai, merontokkan bulir padi, dan membuang jerami sekaligus, sehingga memanen 1 hektar sawah hanya butuh waktu sekitar 3 jam saja.",
                              "defaultSources": "Observasi Fisik Mesin Alsintan UPJA Tani Mandiri Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menyusun alur video 5-10 menit, kesimpulan sains-teknologi, dan cek kestabilan rekaman HP",
                              "guidedPoints": [
                                    "Simpulkan hubungan sains dan teknologi: mesin modern membuat sains pemupukan dan olah tanah bekerja lebih cepat dan efisien.",
                                    "Tutup video dengan kalimat ramah: \"Sekian penjelasan Sains dan Teknologi pertanian padi dari saya, sampai jumpa di video Day 6.\"",
                                    "Pastikan footage rekaman video di HP berdurasi 5-10 menit, suara bicara jelas terdengar, dan resolusi video minimal 720p/1080p."
                              ],
                              "placeholder": "Tuliskan kesimpulan penutup video dan daftar klip video HP yang berhasil Anda rekam... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File video VID_D5_PERTANIAN_01.mp4 s.d. 04.mp4 di galeri HP",
                              "defaultExp": "Kesimpulannya, integrasi antara pemahaman sains kesuburan tanah dan mekanisasi alsintan modern adalah kunci keberhasilan panen raya di OKU Timur. Seluruh rekaman telah tersimpan rapi di HP dalam 4 klip video stabil berdurasi total 8 menit 20 detik dengan audio jernih, siap dirangkum ke formulir LKPD Day 5.",
                              "defaultSources": "Log File Galeri Smartphone Peserta Didik (Proyek FINCESTEM Day 5)."
                        }
                  ]
            },
            "perkebunan": {
                  "key": "perkebunan",
                  "name": "Perkebunan Rakyat",
                  "badge": "Video Sains & Teknologi",
                  "icon": "forest",
                  "desc": "Sains Tekanan Turgor Lateks & Asam Format, Pisau Sadap, Galah Egrek & Lubang Rorak (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Kebun Karet/Sawit (00:00–01:30)",
                              "subtitle": "Menyapa penonton, memperkenalkan diri, dan memperlihatkan latar kebun karet atau kelapa sawit",
                              "guidedPoints": [
                                    "Buka video dengan sapaan ceria dan kenalkan identitas diri lengkap (Nama, NISN, Kelas X SMAN 1 Belitang).",
                                    "Tunjukkan barisan pohon karet atau kelapa sawit di sekitar lokasi rekaman.",
                                    "Sampaikan bahwa dalam video 5-10 menit ini Anda akan membedah sains getah/buah dan teknologi alat perkebunan tanpa wawancara orang lain."
                              ],
                              "placeholder": "Tuliskan naskah pembukaan video perkebunan Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di areal kebun karet rakyat Desa Karang Delima",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video Day 5 ini saya berada di kawasan perkebunan karet rakyat Desa Karang Delima. Dalam video berdurasi sekitar 7 menit ini, saya akan mempresentasikan secara langsung sains keluarnya getah karet dan teknologi alat sadap yang dipakai pekebun.",
                              "defaultSources": "Draf Naskah Klip Pembuka Video Mandiri Kebun Karet (Klip D5_Perkebunan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Tekanan Turgor & Pembekuan Lateks (01:30–04:30)",
                              "subtitle": "Menjelaskan sains mengapa getah disadap pagi hari dan reaksi asam semut pembeku getah",
                              "guidedPoints": [
                                    "Sorot mangkok getah karet atau tandan buah sawit yang sedang berbuah.",
                                    "Jelaskan sains biologis: mengapa pohon karet harus disadap pagi hari saat tekanan sel batang masih tinggi.",
                                    "Terangkan sains kimia: bagaimana cairan asam semut (asam format) menggumpalkan getah cair menjadi bekuan kenyal bermutu tinggi."
                              ],
                              "placeholder": "Tuliskan penjelasan sains getah karet atau buah sawit yang Anda narasikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Observasi tetesan lateks di mangkok sadap dan reaksi asam koagulan",
                              "defaultExp": "Secara sains biologi, getah karet keluar deras pada pagi hari pukul 5 hingga 7 karena tekanan turgor sel tanaman masih maksimal dan penguapan daun masih rendah. Sementara dari sisi kimia, petani menambahkan asam semut encer agar partikel getah karet saling mengikat dan membeku padat menjadi bokar berkualitas bersih tanpa merusak kelenturan karet.",
                              "defaultSources": "Pengamatan Lapangan Biologi Tanaman Karet dan Proses Koagulasi Lateks."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Pisau Sadap, Talang Seng & Egrek (04:30–07:30)",
                              "subtitle": "Menyorot alat pisau sadap dorong/tarik, cincin mangkok, atau galah egrek sabit sawit",
                              "guidedPoints": [
                                    "Tunjukkan pisau sadap ke arah kamera dan jelaskan bentuk mata pisaunya yang melengkung khusus.",
                                    "Jelaskan teknologi kemiringan sayatan sadap 30-40 derajat agar getah mengalir lancar mengikuti talang seng.",
                                    "Jika di kebun sawit, perlihatkan galah panjang aluminium alloy dan sabit egrek untuk memotong tandan buah di ketinggian."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi alat sadap atau panen sawit yang Anda rekam... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik pisau sadap baja dan talang getah di pohon karet",
                              "defaultExp": "Pilar teknologi pada kebun karet terlihat dari desain pisau sadap baja yang dibuat melengkung presisi. Pisau ini disayat dengan kemiringan 30 derajat ke kanan bawah agar memotong pembuluh getah sebanyak mungkin tanpa melukai kayu dalam (kambium). Lateks kemudian diarahkan oleh talang seng kecil langsung ke mangkok penampung sehingga getah tidak tercecer terbuang ke tanah.",
                              "defaultSources": "Observasi Alat Sadap Tradisional dan Modern Pekebun Karet Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menutup video dengan kesimpulan sains-teknologi perkebunan dan verifikasi rekaman HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa ketepatan waktu sadap dan keahlian menggunakan pisau sadap menentukan usia produktif kebun puluhan tahun.",
                                    "Sampaikan salam penutup yang ramah dan sopan.",
                                    "Periksa rekaman di galeri HP agar durasi berada di rentang 5-10 menit dengan pencahayaan terang dan stabil."
                              ],
                              "placeholder": "Tuliskan kesimpulan video perkebunan Anda dan catatan file rekaman HP... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D5_KEBUN_TOTAL_07MIN.mp4 di folder video FINCESTEM",
                              "defaultExp": "Kesimpulannya, perpaduan sains tekanan getah pagi hari dan ketelitian teknologi sayatan pisau sadap sangat menentukan kelangsungan hidup pohon karet hingga usia 25 tahun. Rekaman video mandiri telah saya selesaikan dengan durasi total 7 menit 45 detik, siap diunggah ke YouTube sebagai portofolio LKPD Day 5.",
                              "defaultSources": "Catatan Manajemen Footage Video Galeri Smartphone Siswa."
                        }
                  ]
            },
            "peternakan": {
                  "key": "peternakan",
                  "name": "Peternakan Rakyat OKU Timur",
                  "badge": "Video Sains & Teknologi",
                  "icon": "pets",
                  "desc": "Sains Ruminansia Lambung Rumen & Silase, Mesin Chopper, Nipple Drinker & Sanitasi Kandang (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Peternakan (00:00–01:30)",
                              "subtitle": "Menyapa ramah, menyebutkan identitas diri, dan memperlihatkan suasana kandang ternak",
                              "guidedPoints": [
                                    "Buka video dengan percaya diri: perkenalkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Arahkan kamera memperlihatkan sapi, kambing, atau unggas yang ada di peternakan desa.",
                                    "Tegaskan fokus video: menjelaskan sains pencernaan/pakan dan teknologi mesin pencacah pakan secara mandiri tanpa wawancara."
                              ],
                              "placeholder": "Tuliskan draf pembukaan video peternakan Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di depan kandang sapi Desa Gumawang",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari SMAN 1 Belitang. Di video kokurikuler Day 5 ini, saya berada di sentra peternakan sapi rakyat Desa Gumawang. Dalam rekaman video 5-10 menit ini, saya akan menjelaskan sains sistem pencernaan sapi dan teknologi pengolahan pakan ternak modern yang diterapkan peternak di desa ini.",
                              "defaultSources": "Draf Skrip Pembukaan Video Mandiri Peternakan (Klip D5_Peternakan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Lambung Rumen, Nutrisi & Fermentasi Silase (01:30–04:30)",
                              "subtitle": "Menerangkan bagaimana sapi mencerna rumput kasar dan sains fermentasi bakteri asam laktat",
                              "guidedPoints": [
                                    "Tunjukkan tumpukan rumput gajah, dedak, atau drum silase pakan fermentasi.",
                                    "Jelaskan sains biologi: sapi memiliki 4 ruang lambung (rumen, retikulum, omasum, abomasum) yang dibantu miliaran bakteri untuk mengurai serat rumput.",
                                    "Terangkan sains fermentasi pakan: bagaimana bakteri asam laktat mengawetkan rumput di dalam drum tertutup rapat tanpa udara."
                              ],
                              "placeholder": "Tuliskan penjelasan sains nutrisi ternak dan fermentasi silase yang Anda narasikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan drum silase dan materi Biologi Sistem Pencernaan Sapi",
                              "defaultExp": "Secara sains biologi, sapi adalah hewan ruminansia yang memiliki lambung rumen istimewa. Di dalam rumen, mikroba alami mencerna serat rumput gajah menjadi energi. Peternak juga menerapkan sains biokimia dengan membuat pakan silase, yaitu memfermentasi cacahan rumput dicampur dedak dalam drum kedap udara agar awet berbulan-bulan dan gizinya meningkat.",
                              "defaultSources": "Catatan Observasi Sains Pakan Ternak dan Fermentasi Anaerob."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Mesin Chopper & Sistem Sanitasi Kandang (04:30–07:30)",
                              "subtitle": "Menyorot mesin pencacah rumput bermesin bensin dan kemiringan lantai kandang",
                              "guidedPoints": [
                                    "Arahkan kamera ke mesin pencacah rumput (chopper) dan jelaskan bagian mata pisau serta motor penggeraknya.",
                                    "Terangkan fungsi teknologi mesin: mencacah batang rumput keras menjadi serpihan 3 cm agar mudah dimakan sapi tanpa tersisa.",
                                    "Perlihatkan selokan pembuangan dan lantai semen miring 2-5 derajat agar air kencing langsung mengalir kering."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi mesin chopper dan kandang yang Anda tunjukkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik mesin chopper bensin dan desain selokan lantai kandang",
                              "defaultExp": "Dari pilar teknologi, peternak sangat terbantu oleh mesin chopper bermotor bensin. Mesin ini memiliki bilah pisau berputar cepat yang mencacah batang rumput gajah tebal menjadi potongan kecil 2 hingga 4 cm, sehingga sapi memakan seluruh rumput tanpa ada yang terbuang. Selain itu, lantai kandang direkayasa miring agar urin langsung mengalir ke selokan pembuangan.",
                              "defaultSources": "Pengamatan Teknis Mesin Chopper dan Konstruksi Kandang Sapi."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menyusun kesimpulan sains-teknologi ternak dan pemeriksaan klip rekaman HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa perpaduan pakan fermentasi bergizi dan mesin pencacah mempercepat penggemukan sapi hingga 1 kg per hari.",
                                    "Tutup video dengan pesan positif tentang potensi peternakan di OKU Timur.",
                                    "Cek kelengkapan file video di galeri HP: durasi total berada pada rentang 5-10 menit dan suara vokal terdengar jelas."
                              ],
                              "placeholder": "Tuliskan kalimat penutup video peternakan dan rincian video di memori HP... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Klip video VID_D5_TERNAK_FULL.mp4 di memori smartphone",
                              "defaultExp": "Kesimpulannya, penerapan sains pakan silase dan mekanisasi mesin chopper mampu memangkas waktu kerja peternak serta meningkatkan bobot sapi secara sehat. Seluruh materi ini telah saya rekam secara mandiri dalam video berdurasi 8 menit 10 detik, siap dipublikasikan ke YouTube untuk LKPD Day 5.",
                              "defaultSources": "Log File Rekaman Video Kamera Smartphone Siswa (Klip D5_Peternakan)."
                        }
                  ]
            },
            "perikanan": {
                  "key": "perikanan",
                  "name": "Perikanan Air Tawar",
                  "badge": "Video Sains & Teknologi",
                  "icon": "phishing",
                  "desc": "Sains Kualitas Air DO/pH & Nutrisi Pelet, Kincir Aerator, Pipa Central Drain & Bak Sortir (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Kolam Perikanan (00:00–01:30)",
                              "subtitle": "Menyapa pemirsa, mengenalkan identitas diri, dan memperlihatkan kolam patin/lele",
                              "guidedPoints": [
                                    "Buka video dengan ramah: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang peserta FINCESTEM 2026.",
                                    "Tunjukkan pemandangan kolam ikan patin atau kolam terpal lele yang menjadi objek riset Anda.",
                                    "Jelaskan bahwa video 5-10 menit ini akan mengupas tuntas sains kualitas air kolam dan teknologi kincir/aerasi."
                              ],
                              "placeholder": "Tuliskan draf kalimat pembukaan video perikanan Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di tepi kolam patin Desa Tulus Ayu",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di kawasan sentra kolam budidaya ikan patin Desa Tulus Ayu. Selama 5-10 menit ke depan, saya akan menjelaskan pilar Sains mutu air kolam serta pilar Teknologi peralatan budidaya yang diterapkan pembudidaya ikan.",
                              "defaultSources": "Draf Naskah Klip Pembuka Video Perikanan Air Tawar (Klip D5_Perikanan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Parameter Air, Oksigen DO & Nutrisi Pelet (01:30–04:30)",
                              "subtitle": "Menerangkan kadar oksigen terlarut, derajat keasaman pH air, dan kadar protein pelet",
                              "guidedPoints": [
                                    "Sorot permukaan air kolam yang beriak dan sampel butiran pakan pelet terapung.",
                                    "Jelaskan sains kimia fisika: mengapa kadar oksigen terlarut (DO) dan pH air (6,5-8) sangat menentukan pernapasan dan nafsu makan ikan.",
                                    "Terangkan sains nutrisi: fungsi protein pelet 30-32% untuk membentuk daging ikan patin secara cepat."
                              ],
                              "placeholder": "Tuliskan penjelasan sains air dan nutrisi pakan ikan yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan warna air kolam dan informasi kandungan protein karung pelet",
                              "defaultExp": "Dari sudut pandang sains, kehidupan ikan patin sangat bergantung pada kualitas air. Kadar oksigen terlarut (DO) harus dijaga di atas 3 mg/L agar ikan tidak megap-megap di permukaan. Nilai keasaman pH air yang ideal berkisar 6,5 hingga 8. Pakan pelet terapung yang diberikan mengandung protein 30 persen untuk mempercepat pembentukan otot daging dan menjaga ketahanan tubuh ikan.",
                              "defaultSources": "Observasi Kualitas Air Kolam dan Analisis Label Pakan Ikan Patin."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Kincir Aerasi & Saluran Central Drain (04:30–07:30)",
                              "subtitle": "Menyorot kincir air elektrik, pompa alkon, pipa tengah kolam, atau bak grading sortir",
                              "guidedPoints": [
                                    "Arahkan kamera ke kincir air yang sedang berputar mengaduk air kolam.",
                                    "Jelaskan teknologi kincir: baling-baling memercikkan air ke udara agar oksigen dari atmosfer larut ke dalam air.",
                                    "Jika ada kolam bulat/terpal, tunjukkan teknologi lubang pembuangan tengah (central drain) yang membuang kotoran lumpur secara mudah."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi kincir dan pembuangan kolam yang Anda rekam... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik kincir air berputar dan ember sortir ukuran ikan",
                              "defaultExp": "Pilar teknologi utama di kolam patin ini adalah kincir air aerator elektrik. Kincir berputar kencang memecah permukaan air menjadi butiran halus sehingga menyerap banyak oksigen dari udara. Selain itu, pembudidaya menggunakan pipa pembuangan tengah di dasar kolam untuk menyedot endapan kotoran sisa pakan secara berkala tanpa perlu menguras seluruh isi air kolam.",
                              "defaultSources": "Pengamatan Lapangan Mesin Aerator Kincir dan Sistem Pembuangan Kolam."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menutup video dengan kesimpulan sains-teknologi kolam dan pengecekan klip HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa perpaduan pemantauan air dan aerasi kincir menjaga ikan sehat dengan angka kematian di bawah 10%.",
                                    "Tutup dengan salam penutup dan ajakan menonton kelanjutan analisis finansial pada video Day 6.",
                                    "Pastikan file rekaman video di HP berdurasi 5-10 menit dengan gambar stabil dan audio suara jelas."
                              ],
                              "placeholder": "Tuliskan kesimpulan video dan status file rekaman video di ponsel Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D5_PERIKANAN_TOTAL.mp4 di memori HP",
                              "defaultExp": "Kesimpulannya, pemahaman sains parameter air yang didukung teknologi aerator kincir mampu menekan tingkat kematian benih patin dan melipatgandakan hasil panen. Seluruh video telah saya rekam mandiri selama 7 menit 50 detik dan siap diunggah ke YouTube sebagai bukti penyelesaian LKPD Day 5.",
                              "defaultSources": "Log File Penyimpanan Video Portofolio FINCESTEM di Smartphone."
                        }
                  ]
            },
            "industri": {
                  "key": "industri",
                  "name": "Agro-Industri Pangan",
                  "badge": "Video Sains & Teknologi",
                  "icon": "precision_manufacturing",
                  "desc": "Sains Rendemen Beras & Fermentasi Kedelai, Mesin Husker/Polisher, Boiler Uap & Sealer (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Pabrik Agro-Industri (00:00–01:30)",
                              "subtitle": "Menyapa pemirsa, memperkenalkan diri, dan memperlihatkan pabrik RMU atau produksi tahu/kemplang",
                              "guidedPoints": [
                                    "Awali video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Tunjukkan pabrik penggilingan padi (RMU) atau sentra pembuatan tahu/kemplang di Belitang.",
                                    "Tegaskan isi video 5-10 menit: mengulas sains bahan pangan dan teknologi mesin pemrosesan secara mandiri."
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video agro-industri Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di depan kilang padi RMU Desa Mojosari",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di pabrik penggilingan padi dan beras RMU Desa Mojosari. Dalam video berdurasi 5-10 menit ini, saya akan menjelaskan proses sains perubahan gabah menjadi beras putih serta teknologi mesin giling modern yang digunakan di pabrik ini.",
                              "defaultSources": "Draf Naskah Pembukaan Video Agro-Industri Pangan (Klip D5_Industri_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Struktur Bulir Padi & Pengolahan Bahan (01:30–04:30)",
                              "subtitle": "Menerangkan sains anatomi bulir padi, lapisan aleuron bekatul, atau reaksi fermentasi kedelai",
                              "guidedPoints": [
                                    "Tunjukkan butiran gabah, beras pecah kulit cokelat, dan beras putih bersih di wadah piring.",
                                    "Jelaskan sains struktur biji: kulit sekam pelindung terluar, lapisan bekatul kaya nutrisi, dan inti pati endosperma putih.",
                                    "Jika di pabrik tahu/tempe, jelaskan sains fermentasi jamur tempe atau koagulasi sari kedelai dengan asam cuka."
                              ],
                              "placeholder": "Tuliskan penjelasan sains bahan pangan yang Anda paparkan di depan kamera... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik lapisan gabah dan beras hasil gilingan mesin",
                              "defaultExp": "Dari sisi sains bahan pangan, sebutir gabah memiliki tiga lapisan utama: kulit sekam keras, lapisan aleuron atau bekatul kaya serat, dan endosperma pati putih. Proses pengolahan bertujuan melepaskan sekam dan mengikis sebagian bekatul agar beras tahan disimpan lama tidak cepat tengik dan menghasilkan tekstur pulen saat dimasak menjadi nasi.",
                              "defaultSources": "Kajian Sains Anatomi Biji Pangan dan Uji Fisik Sampel Beras."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Mesin Husker, Polisher & Color Sorter (04:30–07:30)",
                              "subtitle": "Menyorot mesin pemecah kulit rol karet, penyosoh beras, atau mesin ketel boiler",
                              "guidedPoints": [
                                    "Arahkan kamera ke mesin pecah kulit (husker) dengan dua rol karet yang berputar.",
                                    "Jelaskan bagaimana gaya gesek mekanik rol mengelupas kulit sekam tanpa memecahkan butir beras.",
                                    "Sorot mesin penyosoh (polisher) yang memutihkan beras, atau mesin ketel uap boiler penyuplai panas di pabrik."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi mesin pengolahan yang Anda rekam... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik mesin husker rol karet dan pipa konveyor beras",
                              "defaultExp": "Pilar teknologi pada pabrik RMU ini bertumpu pada mesin pecah kulit rol karet berkecepatan putar berbeda. Perbedaan kecepatan ini menghasilkan gaya gesek yang mengelupas sekam gabah dengan mulus. Setelah itu beras dialirkan melalui lift konveyor ke mesin polisher untuk disosoh menjadi beras putih mengkilap dengan butir patah yang sangat minim.",
                              "defaultSources": "Pengamatan Mesin Mekanik Penggilingan Padi RMU Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menyimpulkan peran mesin dalam meningkatkan nilai jual pangan dan verifikasi rekaman HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa teknologi mesin giling berhasil menaikkan nilai jual gabah mentah menjadi beras kemasan bernilai tinggi.",
                                    "Sampaikan ucapan terima kasih dan salam penutup video.",
                                    "Periksa klip rekaman HP: durasi total berkisar 5-10 menit, gambar fokus, dan suara narasi jelas."
                              ],
                              "placeholder": "Tuliskan kalimat penutup video industri dan laporan file rekaman HP Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D5_RMU_BERAS_FINAL.mp4 di galeri ponsel",
                              "defaultExp": "Kesimpulannya, teknologi pengolahan pangan modern mampu mengolah hasil panen petani menjadi beras bermutu premium yang mengangkat ekonomi OKU Timur. Seluruh adegan video telah saya rekam secara mandiri selama 8 menit 30 detik dengan kualitas audio jernih, siap diunggah ke YouTube untuk LKPD Day 5.",
                              "defaultSources": "Log File Video Portofolio FINCESTEM di Galeri HP Siswa."
                        }
                  ]
            },
            "perdagangan": {
                  "key": "perdagangan",
                  "name": "Perdagangan & Saprotan",
                  "badge": "Video Sains & Teknologi",
                  "icon": "storefront",
                  "desc": "Sains Sifat Kimia Pupuk & Racun Hama, Timbangan Sensor Digital, Aplikasi i-Pubers & Sistem FIFO (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Kios Saprotan/Toko (00:00–01:30)",
                              "subtitle": "Menyapa pemirsa, memperkenalkan diri, dan memperlihatkan suasana toko perdagangan",
                              "guidedPoints": [
                                    "Buka video dengan sapaan sopan: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Tunjukkan etalase toko pupuk/saprotan atau toko sembako di pinggir jalan desa.",
                                    "Tegaskan topik video 5-10 menit: menjelaskan sifat sains bahan dagangan dan teknologi timbangan digital tanpa wawancara."
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video perdagangan Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di depan kios saprotan Desa Harjodadi",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video riset kokurikuler Day 5 ini, saya berada di kios perdagangan sarana pertanian Desa Harjodadi. Dalam video 5-10 menit ini, saya akan menerangkan sifat sains pupuk/pestisida serta teknologi digital timbangan dan aplikasi yang dipakai dalam tata kelola toko.",
                              "defaultSources": "Draf Naskah Pembukaan Video Perdagangan Saprotan (Klip D5_Dagang_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Sifat Kimia Pupuk & Label Pestisida (01:30–04:30)",
                              "subtitle": "Menerangkan sifat higroskopis pupuk urea dan arti kode warna bahaya botol racun hama",
                              "guidedPoints": [
                                    "Sorot karung pupuk urea dan botol insektisida/herbisida di rak toko.",
                                    "Jelaskan sains kimia: mengapa pupuk urea mudah menyerap uap air sehingga harus ditaruh di atas alas palet kayu agar tidak mencair.",
                                    "Terangkan sains racun: arti pita warna hijau/kuning/merah pada kemasan botol pestisida yang menunjukkan tingkat bahaya racun."
                              ],
                              "placeholder": "Tuliskan penjelasan sains sifat kimia pupuk dan racun yang Anda ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik karung pupuk di atas palet dan label botol herbisida",
                              "defaultExp": "Dari sisi sains kimia, pupuk urea memiliki sifat higroskopis tinggi atau sangat cepat menyerap uap air dari udara dan lantai dingin. Oleh karena itu, karung pupuk wajib diletakkan di atas palet kayu agar tidak basah dan menggumpal keras. Pada botol pestisida, terdapat kode warna pita toksisitas yang menandakan tingkat kepekatan bahan aktif racun bagi keselamatan petani.",
                              "defaultSources": "Catatan Kajian Sains Kimia Bahan Saprotan dan Toksikologi Pestisida."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Timbangan Digital & Aplikasi i-Pubers (04:30–07:30)",
                              "subtitle": "Menyorot timbangan digital sensor load cell dan aplikasi smartphone pencatatan pupuk subsidi",
                              "guidedPoints": [
                                    "Arahkan kamera ke timbangan digital kasir dan tunjukkan angka layarnya yang sangat akurat.",
                                    "Jelaskan teknologi sensor load cell pada timbangan yang mengubah tekanan benda menjadi angka gram digital.",
                                    "Jelaskan pemanfaatan teknologi smartphone: aplikasi i-Pubers untuk verifikasi e-KTP petani saat menebus pupuk bersubsidi."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi timbangan dan aplikasi toko yang Anda sorot... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik timbangan digital dan antarmuka aplikasi i-Pubers di HP",
                              "defaultExp": "Pilar teknologi pada kios ini terlihat dari penggunaan timbangan digital dengan sensor load cell presisi tinggi, memastikan takaran barang tidak berselisih satu gram pun. Selain itu, kios menggunakan smartphone beraplikasi i-Pubers yang terhubung ke jaringan internet kementerian untuk memindai NIK KTP petani secara real-time saat penebusan pupuk bersubsidi.",
                              "defaultSources": "Observasi Teknologi Alat Ukur Metrologi dan Aplikasi Digital Kios."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menyimpulkan pentingnya sains bahan dan teknologi stok barang, serta cek video di HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa pemahaman sifat bahan dan pencatatan digital menjamin kelancaran rantai pasok kebutuhan pokok warga.",
                                    "Ucapkan salam penutup yang sopan kepada fasilitator dan pemirsa.",
                                    "Pastikan rekaman di HP berdurasi 5-10 menit dengan kualitas gambar jelas dan tidak goyang berlebihan."
                              ],
                              "placeholder": "Tuliskan kalimat penutup video dan status klip rekaman HP Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D5_PERDAGANGAN_7MIN.mp4 di galeri smartphone",
                              "defaultExp": "Kesimpulannya, perpaduan pengetahuan sains karakteristik bahan dan penerapan teknologi timbangan serta pencatatan digital mampu menjaga kepercayaan konsumen dan keawetan stok barang dagangan. Rekaman mandiri ini telah saya tuntaskan berdurasi 7 menit 30 detik, siap diunggah ke YouTube untuk tugas LKPD Day 5.",
                              "defaultSources": "Log File Galeri Smartphone Peserta Didik Proyek FINCESTEM Day 5."
                        }
                  ]
            },
            "formal": {
                  "key": "formal",
                  "name": "Jasa Keuangan Mikro",
                  "badge": "Video Sains & Teknologi",
                  "icon": "account_balance",
                  "desc": "Sains Optik Lampu UV & Kertas Termal, Mesin EDC Chip Kriptografi, UPS Baterai & Brankas (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Pembukaan, Identitas Diri & Profil Gerai BRILink/BUMDes (00:00–01:30)",
                              "subtitle": "Menyapa pemirsa, mengenalkan identitas diri, dan memperlihatkan konter layanan keuangan",
                              "guidedPoints": [
                                    "Buka video dengan santun: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Perlihatkan gerai agen perbankan desa (BRILink, BUMDes, atau loket pembayaran desa).",
                                    "Tegaskan tujuan video 5-10 menit: mengulas sains deteksi uang asli dan teknologi mesin transaksi tanpa mewawancarai orang lain."
                              ],
                              "placeholder": "Tuliskan draf sapaan pembuka video jasa keuangan mikro Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di depan gerai agen BRILink Desa Bedilan",
                              "defaultExp": "Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di gerai agen jasa keuangan mikro BRILink Desa Bedilan. Dalam video berdurasi 5-10 menit ini, saya akan menjelaskan prinsip sains deteksi uang kertas asli serta teknologi mesin transaksi perbankan digital di pedesaan.",
                              "defaultSources": "Draf Naskah Pembukaan Video Layanan Keuangan Desa (Klip D5_Keuangan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Sains: Optik Sinar UV & Reaksi Kertas Termal (01:30–04:30)",
                              "subtitle": "Menerangkan sains fluoresensi tinta fosfor uang asli dan kimia kertas struk tanpa tinta",
                              "guidedPoints": [
                                    "Sorot lampu detektor uang Ultraviolet (UV) dan lembaran uang kertas Rupiah.",
                                    "Jelaskan sains fisika optik: sinar UV memendarkan serat pengaman fosfor tak kasat mata pada uang asli.",
                                    "Sorot gulungan kertas struk putih dan jelaskan sains reaksi kimia termal: tulisan hitam muncul akibat panas jarum mesin tanpa memakai tinta basah."
                              ],
                              "placeholder": "Tuliskan penjelasan sains optik uang dan kertas termal yang Anda paparkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Demonstrasi uang di bawah sinar lampu UV dan struk printer mini",
                              "defaultExp": "Dari sisi sains fisika optik, lampu ultraviolet memancarkan radiasi yang membuat serat pengaman dan tinta fosfor pada uang Rupiah asli memendar bercahaya terang. Sementara pada kertas struk printer, terdapat lapisan kimia zat warna leuco yang bereaksi menghasilkan tulisan hitam saat terkena panas dari jarum termal mesin tanpa menggunakan tinta cair.",
                              "defaultSources": "Observasi Sains Optik Fotoluminesensi Uang dan Kertas Termosensitif."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Teknologi: Mesin EDC Enkripsi Chip & Jaringan 4G (04:30–07:30)",
                              "subtitle": "Menyorot mesin EDC nirkabel, slot chip kartu ATM, dan perangkat cadangan listrik UPS",
                              "guidedPoints": [
                                    "Arahkan kamera ke mesin EDC portabel dan perlihatkan slot gesek chip kartu ATM.",
                                    "Jelaskan teknologi keamanan: microchip emas kartu mengenkripsi data nasabah secara aman dari penyadapan.",
                                    "Jelaskan teknologi jaringan seluler 4G/LTE yang mengirim data transfer uang ke server bank dalam hitungan detik."
                              ],
                              "placeholder": "Tuliskan penjelasan teknologi mesin EDC dan jaringan yang Anda ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Sorotan fisik mesin EDC tombol angka dan slot chip kartu debit",
                              "defaultExp": "Pilar teknologi pada gerai perbankan desa ini bertumpu pada mesin EDC yang terhubung ke jaringan internet 4G. Mesin membaca microchip kartu debit nasabah yang dilengkapi sistem enkripsi keamanan tingkat tinggi sehingga data transaksi terlindungi dari pembajakan. Transaksi transfer atau tarik tunai diproses ke server bank hanya dalam tempo 3 hingga 5 detik.",
                              "defaultSources": "Pengamatan Perangkat Fintech Mesin EDC dan Jaringan Telekomunikasi."
                        },
                        {
                              "key": "D",
                              "title": "Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)",
                              "subtitle": "Menyimpulkan peran teknologi dalam mempermudah transaksi desa dan memeriksa video di HP",
                              "guidedPoints": [
                                    "Simpulkan bahwa teknologi perbankan digital mendekatkan layanan bank ke desa tanpa warga harus pergi jauh ke kota.",
                                    "Ucapkan salam penutup yang santun kepada para penonton dan fasilitator.",
                                    "Cek total durasi rekaman video di memori HP agar memenuhi batas 5-10 menit dengan audio terdengar jelas."
                              ],
                              "placeholder": "Tuliskan kalimat penutup video dan status rekaman video di memori HP Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File video D5_KEUANGAN_MIKRO_8MIN.mp4 di memori HP",
                              "defaultExp": "Kesimpulannya, pemanfaatan sains deteksi keamanan fisik uang dan teknologi transaksi perbankan digital mampu memberikan layanan keuangan yang aman, cepat, dan terpercaya bagi warga pedesaan Belitang. Rekaman mandiri ini berdurasi total 8 menit 15 detik dan siap diunggah ke YouTube sebagai portofolio LKPD Day 5.",
                              "defaultSources": "Log File Galeri Smartphone Peserta Didik Proyek FINCESTEM Day 5."
                        }
                  ]
            }
      }
},

    6: {
      "dayNum": 6,
      "title": "Modul Riset Day 6: Video Presentasi STEM (5–10 Menit): Rekayasa & Finansial Sektor",
      "theme": "Pilar Rekayasa & Finansial (Video Presentasi HP 7 Sektor)",
      "gradientClass": "from-teal-950 via-slate-900 to-blue-950 border-teal-700/40",
      "tagColorClass": "bg-white/20 text-teal-100",
      "badgeColorClass": "bg-cyan-400 text-cyan-950",
      "subtitle": "Panduan Pembuatan Rekaman Video Penjelasan Mandiri (5–10 Menit, Tanpa Wawancara): Pilar Rekayasa (Trik Praktis Penanganan Kendala) dan Pilar Matematika Finansial (Modal, HPP, Omzet & Laba Bersih) pada 7 Sektor Unggulan OKU Timur",
      "inquiryIntro": "Hari ini Anda ditugaskan menyusun dan merekam <strong>Video Penjelasan STEM Bagian 2: Rekayasa & Finansial</strong> berdurasi <strong>5–10 Menit</strong> menggunakan kamera HP. <strong>Perhatian Penting: TIDAK ADA WAWANCARA narasumber lain!</strong> Anda tampil berbicara di depan kamera HP (atau voice-over) menerangkan rekayasa solusi kendala teknis dan kalkulasi hitungan laba-rugi sektor yang Anda teliti.",
      "sectors": {
            "pertanian": {
                  "key": "pertanian",
                  "name": "Pertanian Padi Sawah",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "agriculture",
                  "desc": "Rekayasa Jajar Legowo & Pintu Air, Trik Perangkap Tikus TBS, Modal BOP Tani, HPP & Laba Panen (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video dengan menyapa ramah, menyebut identitas diri, dan kilas balik sektor padi sawah",
                              "guidedPoints": [
                                    "Sapa pemirsa: perkenalkan Nama, NISN, Kelas X SMAN 1 Belitang, peserta FINCESTEM 2026.",
                                    "Kilas balik singkat: \"Pada video Day 5 kemarin, saya telah membahas sains tanah dan teknologi alat di sawah ini.\"",
                                    "Sampaikan fokus video Day 6: \"Hari ini dalam video 5-10 menit, saya akan mengupas tuntas rekayasa solusi kendala sawah dan hitungan matematika finansial untung-rugi petani padi.\""
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video Day 6 sektor pertanian... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di tepi petak sawah yang siap dianalisis",
                              "defaultExp": "Halo semuanya, berjumpa lagi dengan saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kelanjutan Day 6 ini, saya kembali mengulas sektor pertanian padi sawah di Desa Sidomulyo. Selama 5-10 menit ke depan, saya akan menjelaskan pilar Rekayasa cara mengatasi kendala air dan hama, serta pilar Matematika Finansial mengenai modal dan keuntungan panen petani.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Pertanian (Klip D6_Pertanian_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Trik Praktis & Solusi Kendala Sawah (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa pola tanam Jajar Legowo, pintu air parit, dan perangkap hama tikus TBS",
                              "guidedPoints": [
                                    "Tunjukkan barisan tanaman padi yang tertata dengan lorong kosong (pola Jajar Legowo 2:1 atau 4:1).",
                                    "Jelaskan rekayasa lorong: mempermudah pemupukan, memperbanyak sinar matahari, dan memudahkan angin berhembus.",
                                    "Jelaskan rekayasa perangkap tikus berpagar plastik dan bubu (TBS) untuk menangkap tikus tanpa racun kimia."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa solusi kendala sawah yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan pola tanam Jajar Legowo dan pagar perangkap tikus",
                              "defaultExp": "Dari pilar Rekayasa, petani Belitang menerapkan pola tanam Jajar Legowo dengan membuat lorong kosong berselang dua baris tanaman. Rekayasa tata letak ini memperbanyak intensitas sinar matahari dan memudahkan sirkulasi udara sehingga populasi hama jamur berkurang. Untuk mengatasi tikus, petani memasang pagar plastik pembatas dan perangkap bubu kawat di sudut sawah tanpa mencemari lingkungan.",
                              "defaultSources": "Kajian Rekayasa Lapangan Pola Tanam Legowo dan Manajemen Hama Terpadu."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan catatan angka hitungan modal benih/pupuk, bagi hasil panen, dan omzet gabah",
                              "guidedPoints": [
                                    "Tunjukkan kertas catatan hitungan atau papan kecil ke kamera HP.",
                                    "Rinci modal operasional (BOP) 1 hektar: bajak tanah Rp1,2 juta, benih Rp400 ribu, pupuk Rp1,6 juta, pestisida Rp800 ribu, tenaga kerja Rp2 juta (Total Rp6 juta).",
                                    "Hitung hasil panen 6 ton gabah dijual Rp6.500/kg menghasilkan omzet Rp39 juta, dipotong biaya panen dan operasional menghasilkan laba bersih sekitar Rp28–30 juta."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial padi yang Anda ucapkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel coretan simulasi biaya operasional dan keuntungan panen gabah",
                              "defaultExp": "Dari sisi Matematika Finansial, modal operasional budidaya padi per hektar berkisar Rp6.000.000 untuk pengolahan lahan, benih, pupuk, dan perawatan. Saat panen raya menghasilkan sekitar 6.000 kg gabah kering panen. Jika dijual dengan harga Rp6.500 per kg, omzet kotor mencapai Rp39.000.000. Setelah dipotong biaya mesin panen dan modal awal, petani memperoleh laba bersih sekitar Rp28.000.000 per musim tanam 4 bulan.",
                              "defaultSources": "Kalkulasi Keuangan Usaha Tani Padi Sawah OKU Timur."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide pengemasan beras mandiri, penutup video, dan cek durasi footage HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: petani jangan hanya menjual gabah basah ke tengkulak, tetapi menggilingnya sendiri dan mengemas beras 5 kg berlabel merek desa.",
                                    "Tutup video dengan kalimat bersemangat tentang kemandirian pangan generasi muda Belitang.",
                                    "Periksa rekaman di HP agar durasi genap 5-10 menit dengan suara jernih dan tampilan angka yang mudah terbaca."
                              ],
                              "placeholder": "Tuliskan gagasan inovasi beras dan penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman video D6_PERTANIAN_FINANSIAL.mp4 di memori ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, petani disarankan menghilirisasi gabah menjadi beras kemasan 5 kg berlabel lokal Belitang agar keuntungan bertambah 30 persen dibanding menjual gabah basah. Rekaman video mandiri Day 6 ini telah tuntas berdurasi 8 menit 40 detik, siap diunggah ke YouTube sebagai kelengkapan tugas LKPD Day 6.",
                              "defaultSources": "Rencana Inovasi Hilirisasi Beras dan Log File Video HP Siswa."
                        }
                  ]
            },
            "perkebunan": {
                  "key": "perkebunan",
                  "name": "Perkebunan Rakyat",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "forest",
                  "desc": "Rekayasa Talang Pelindung Hujan & Rorak, Bagi Hasil Sadap 50:50, Margin Lelang Bokar UPPB (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebut identitas diri, dan kilas balik sektor perkebunan karet/sawit",
                              "guidedPoints": [
                                    "Buka video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains getah karet dan alat sadap.",
                                    "Tegaskan fokus video Day 6: mengupas rekayasa pelindung hujan batang karet dan hitungan pendapatan bulanan pekebun."
                              ],
                              "placeholder": "Tuliskan draf sapaan pembuka video Day 6 perkebunan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di sela tegakan pohon karet",
                              "defaultExp": "Halo semuanya, kembali lagi bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan materi perkebunan karet sebelumnya, pada video 5-10 menit ini saya akan menjelaskan rekayasa perlindungan pohon dari air hujan serta rincian matematika finansial pembagian hasil getah karet di OKU Timur.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Perkebunan (Klip D6_Perkebunan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Talang Pelindung Hujan & Konservasi Rorak (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa talang plastik penahan hujan dan parit rorak penahan air kebun",
                              "guidedPoints": [
                                    "Tunjukkan bagian batang pohon karet di atas alur sayatan sadap.",
                                    "Jelaskan rekayasa talang plastik pelindung hujan (rain gutter) yang mencegah air hujan merusak aliran getah.",
                                    "Jelaskan rekayasa parit rorak penampung seresah daun pelepah sawit/karet agar kebun tidak gersang saat kemarau."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa penanganan kendala kebun yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan talang plastik pelindung bidang sadap dan rorak resapan",
                              "defaultExp": "Dari pilar Rekayasa, pekebun karet mengatasi kendala musim hujan dengan memasang talang plastik pelindung di atas irisan sadap. Rekayasa sederhana ini membelokkan air hujan agar tidak membasahi bidang sadap sehingga getah tidak hanyut terbawa air. Selain itu, dibuat lubang rorak di antara barisan pohon untuk menampung air hujan dan pupuk alami dari daun yang membusuk.",
                              "defaultSources": "Kajian Rekayasa Lapangan Talang Sadap Hujan dan Rorak Kebun Karet."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan coretan hitungan bagi hasil penyadap 50:50 dan harga lelang UPPB",
                              "guidedPoints": [
                                    "Tunjukkan kertas coretan perhitungan ke arah kamera HP.",
                                    "Rinci hasil getah karet: kebun 2 hektar menghasilkan 600 kg bokar bekuan sebulan.",
                                    "Hitung sistem bagi hasil 50:50: pemilik mendapat 300 kg dan penyadap mendapat 300 kg. Jika dijual ke UPPB Rp13.000/kg, pemilik mengantongi omzet Rp3,9 juta dipotong biaya pupuk Rp900 ribu menjadi laba bersih Rp3 juta sebulan."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial kebun karet yang Anda ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Simulasi pembagian hasil panen bokar karet per bulan",
                              "defaultExp": "Secara Matematika Finansial, kebun karet seluas 2 hektar mampu menghasilkan sekitar 600 kg bekuan karet bersih dalam sebulan. Dengan sistem bagi hasil 50:50, pemilik kebun menerima bagian 300 kg. Jika dijual melalui lelang UPPB seharga Rp13.000 per kg, omzet yang diperoleh sebesar Rp3.900.000. Setelah dipotong biaya pupuk dan herbisida Rp900.000, laba bersih pemilik mencapai Rp3.000.000 per bulan.",
                              "defaultSources": "Kalkulasi Keuangan Bagi Hasil dan Lelang Karet UPPB OKU Timur."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide penjualan lelang UPPB bokar bersih dan penutup video rekaman HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: pekebun wajib bersatu menjual karet lewat lelang UPPB kelompok tani agar harga tidak dimainkan tengkulak perorangan.",
                                    "Tutup video dengan pesan santun dan motivasi mengelola perkebunan secara berkelanjutan.",
                                    "Pastikan rekaman di HP berdurasi 5-10 menit dengan pencahayaan jelas dan intonasi suara tegas."
                              ],
                              "placeholder": "Tuliskan ide inovasi lelang karet dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_KEBUN_FINANSIAL.mp4 di galeri smartphone",
                              "defaultExp": "Sebagai gagasan inovasi, petani karet dianjurkan menghentikan kebiasaan merendam karet di kolam dan beralih ke bokar bersih lelang UPPB agar harga jual naik hingga Rp3.000 per kg. Seluruh pemaparan ini telah saya rekam mandiri selama 7 menit 40 detik dan siap diunggah ke YouTube untuk tugas LKPD Day 6.",
                              "defaultSources": "Rencana Inovasi Pemasaran Bokar Bersih dan Log File Video HP."
                        }
                  ]
            },
            "peternakan": {
                  "key": "peternakan",
                  "name": "Peternakan Rakyat OKU Timur",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "pets",
                  "desc": "Rekayasa Ventilasi Kandang & Biogas, Modal Penggemukan Bakalan, Laba Sapi Kurban (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebut identitas diri, dan kilas balik sektor peternakan sapi/kambing",
                              "guidedPoints": [
                                    "Buka video dengan sapaan ramah: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains pakan fermentasi dan mesin chopper.",
                                    "Tegaskan topik video Day 6: mengulas rekayasa pengolahan kotoran biogas dan kalkulasi keuntungan usaha ternak sapi."
                              ],
                              "placeholder": "Tuliskan draf sapaan pembuka video Day 6 peternakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di depan peternakan sapi desa",
                              "defaultExp": "Halo semuanya, kembali bersama saya [Nama Siswa] dari SMAN 1 Belitang pada video kokurikuler Day 6. Melanjutkan observasi peternakan sapi kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa pengolahan limbah biogas serta kalkulasi matematika finansial modal dan keuntungan penggemukan sapi potong.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Peternakan (Klip D6_Ternak_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Ventilasi Kandang & Reaktor Biogas (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa atap monitor udara dan instalasi biogas penampung kotoran sapi",
                              "guidedPoints": [
                                    "Tunjukkan bentuk atap kandang bertingkat (monitor roof) yang membuang udara panas ke atas.",
                                    "Jelaskan rekayasa bak reaktor biogas beton di belakang kandang: kotoran sapi dialirkan ke dalam tangki tertutup untuk memproduksi gas memasak.",
                                    "Terangkan bagaimana rekayasa ini membuat kandang tidak berbau dan menghemat pengeluaran elpiji rumah tangga."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa ventilasi dan biogas kandang yang Anda tuturkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan atap ventilasi kandang dan tabung reaktor biogas",
                              "defaultExp": "Dari sisi Rekayasa, kandang sapi dirancang dengan model atap bertingkat agar sirkulasi udara panas dan gas amonia langsung terbuang ke atas. Selain itu, peternak merekayasa saluran selokan menuju tabung reaktor biogas tertutup. Di dalam reaktor, kotoran sapi diubah oleh bakteri anaerob menjadi gas metana gratis yang dialirkan melalui pipa untuk kompor memasak di dapur.",
                              "defaultSources": "Kajian Rekayasa Bangunan Kandang dan Reaktor Energi Biogas Desa."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan tabel coretan modal beli bakalan, pakan, dan harga jual sapi siap potong",
                              "guidedPoints": [
                                    "Tunjukkan lembar kertas catatan hitungan ke arah kamera HP.",
                                    "Rinci modal penggemukan 2 ekor sapi selama 100 hari: beli 2 pedet bakalan Rp24 juta, pakan konsentrat Rp4 juta, obat/perawatan Rp2 juta (Total modal Rp30 juta).",
                                    "Hitung penjualan: 2 ekor sapi dijual saat Idul Adha seharga Rp19,5 juta per ekor (Omzet Rp39 juta), sehingga laba bersih mencapai Rp9 juta (Rp4,5 juta per ekor)."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial penggemukan sapi yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel simulasi biaya penggemukan dan keuntungan panen sapi",
                              "defaultExp": "Secara Matematika Finansial, penggemukan 2 ekor sapi selama 100 hari memerlukan modal beli bakalan Rp24.000.000, biaya pakan konsentrat dan dedak Rp4.000.000, serta obat dan perawatan Rp2.000.000, sehingga total modal Rp30.000.000. Menjelang hari raya, kedua sapi terjual seharga Rp19.500.000 per ekor menghasilkan omzet Rp39.000.000. Laba bersih yang diperoleh peternak mencapai Rp9.000.000.",
                              "defaultSources": "Kalkulasi Keuangan Penggemukan Sapi Potong OKU Timur."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide komersialisasi pupuk bokashi kemasan dan penutup rekaman HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: ampas kotoran biogas jangan dibuang, melainkan dikeringkan dan difermentasi menjadi pupuk bokashi kemasan karung seharga Rp25 ribu.",
                                    "Tutup video dengan kalimat ajakan berwirausaha peternakan modern bagi generasi muda.",
                                    "Pastikan file rekaman di HP memenuhi durasi 5-10 menit dengan kualitas video stabil dan jelas."
                              ],
                              "placeholder": "Tuliskan ide inovasi pupuk bokashi dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_PETERNAKAN_FINANSIAL.mp4 di galeri ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, peternak dapat mengolah ampas padat kotoran sapi menjadi pupuk organik bokashi kemasan 20 kg seharga Rp25.000 per karung, memberikan tambahan pemasukan hingga jutaan rupiah. Seluruh video mandiri Day 6 ini telah saya tuntaskan berdurasi 8 menit 15 detik, siap diunggah ke YouTube untuk penilaian LKPD.",
                              "defaultSources": "Rencana Inovasi Pupuk Organik Bokashi dan Log File Video HP Siswa."
                        }
                  ]
            },
            "perikanan": {
                  "key": "perikanan",
                  "name": "Perikanan Air Tawar",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "phishing",
                  "desc": "Rekayasa Tanggul Kolam & Central Drain, Rasio FCR Pakan, Modal Benih & Laba Panen Patin (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebutkan identitas diri, dan kilas balik sektor budidaya ikan patin/lele",
                              "guidedPoints": [
                                    "Buka video dengan percaya diri: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains mutu air dan teknologi aerator kincir.",
                                    "Tegaskan topik video Day 6: mengulas rekayasa kemiringan dasar kolam dan perhitungan matematika finansial panen ikan."
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video Day 6 perikanan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di samping kolam ikan patin",
                              "defaultExp": "Halo semuanya, kembali lagi bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan pembahasan perikanan air tawar kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa saluran pembuangan kolam serta kalkulasi matematika finansial biaya pakan dan keuntungan panen ikan patin di Belitang.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Perikanan (Klip D6_Perikanan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Kemiringan Kolam & Budidaya Pakan Maggot (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa dasar kolam miring ke pipa tengah dan biopori pakan maggot BSF",
                              "guidedPoints": [
                                    "Tunjukkan bentuk kolam dan jelaskan rekayasa dasar kolam yang dibuat miring ke arah pipa tengah (central drain).",
                                    "Jelaskan bagaimana gaya gravitasi air mengumpulkan kotoran padat ke tengah sehingga mudah dibuang saat pipa diangkat.",
                                    "Jelaskan rekayasa kandang lalat BSF untuk memproduksi larva maggot gratis sebagai pengganti separuh pakan pelet pabrik yang mahal."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa kolam dan pakan alternatif maggot yang Anda ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan desain dasar kolam miring dan kotak budidaya maggot BSF",
                              "defaultExp": "Dari pilar Rekayasa, dasar kolam tanah sengaja dibangun miring 2 persen mengarah ke pipa pembuangan tengah. Rekayasa hidrolika gravitasi ini mengendapkan kotoran feses ikan tepat di lubang pipa sehingga mudah dibuang tanpa menyedot air bersih. Untuk menyiasati mahalnya pakan pabrik, peternak membudidayakan maggot BSF dari limbah sayur pasar yang kaya protein dan hemat biaya.",
                              "defaultSources": "Kajian Rekayasa Konstruksi Kolam dan Budidaya Maggot BSF Alternatif."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan coretan hitungan benih, biaya karung pelet FCR, dan omzet panen",
                              "guidedPoints": [
                                    "Tunjukkan lembar kertas hitungan ke arah kamera HP.",
                                    "Rinci modal 1 kolam tebar 3.000 ekor benih: beli benih Rp750 ribu, pakan pelet 1.500 kg Rp6,5 juta, listrik/probiotik Rp950 ribu (Total BOP Rp8,2 juta).",
                                    "Hitung panen dengan kelulushidupan 85% menghasilkan 1.275 kg patin. Dijual Rp11.000/kg menghasilkan omzet Rp14.025.000, dipotong modal Rp8,2 juta menghasilkan laba bersih Rp5.825.000 per siklus."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi finansial panen patin yang Anda paparkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel simulasi biaya pakan FCR dan omzet penjualan ikan patin",
                              "defaultExp": "Secara Matematika Finansial, budidaya 3.000 benih patin membutuhkan biaya operasional Rp8.200.000 untuk benih, 50 sak pelet, dan listrik pompa. Saat panen dengan tingkat hidup 85 persen, diperoleh hasil 1.275 kg ikan patin. Dijual ke pengepul seharga Rp11.000 per kg, omzet yang masuk mencapai Rp14.025.000. Laba bersih yang dikantongi peternak adalah Rp5.825.000 per siklus 6 bulan.",
                              "defaultSources": "Kalkulasi Keuangan Budidaya Patin dan Analisis Rasio Pakan FCR."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide hilirisasi fillet ikan patin beku dan penutup rekaman video HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: jangan hanya menjual ikan patin hidup, tetapi olah menjadi daging fillet beku tanpa tulang atau kerupuk kemplang patin agar keuntungan berlipat ganda.",
                                    "Tutup video dengan pesan santun dan motivasi kemandirian perikanan pedesaan.",
                                    "Pastikan rekaman di HP berdurasi 5-10 menit dengan kualitas gambar terang dan audio terdengar jelas."
                              ],
                              "placeholder": "Tuliskan ide inovasi olahan patin dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_PERIKANAN_FINANSIAL.mp4 di memori ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, pembudidaya dapat mengolah ikan patin segar menjadi produk fillet beku tanpa duri dan abon ikan berlabel lokal Belitang untuk menembus pasar swalayan dengan harga dua kali lipat. Pemaparan video mandiri Day 6 ini telah saya selesaikan berdurasi 8 menit tepat, siap diserahkan ke YouTube untuk LKPD Day 6.",
                              "defaultSources": "Rencana Inovasi Hilirisasi Fillet Ikan dan Log File Video HP Siswa."
                        }
                  ]
            },
            "industri": {
                  "key": "industri",
                  "name": "Agro-Industri Pangan",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "precision_manufacturing",
                  "desc": "Rekayasa Konveyor Pabrik & Siklon Debu, Modal Giling Gabah, HPP Beras & Margin Laba (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebut identitas diri, dan kilas balik sektor pengolahan pangan RMU/tahu",
                              "guidedPoints": [
                                    "Buka video dengan percaya diri: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains rendemen beras dan mesin rol karet husker.",
                                    "Tegaskan topik video Day 6: mengulas rekayasa cerobong debu pabrik dan kalkulasi laba harian giling gabah."
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video Day 6 agro-industri pangan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di area gudang beras pabrik RMU",
                              "defaultExp": "Halo semuanya, kembali bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan observasi pabrik penggilingan padi kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa saluran pembuangan debu sekam serta perhitungan matematika finansial modal pembelian gabah dan laba penjualan beras kemasan.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Agro-Industri (Klip D6_Industri_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Konveyor Mangkok & Siklon Pengendali Debu (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa lift pemindah beras otomatis dan corong siklon penyaring abu sekam",
                              "guidedPoints": [
                                    "Tunjukkan pipa tegak lift konveyor yang menghubungkan mesin pecah kulit ke mesin penyosoh.",
                                    "Jelaskan rekayasa otomatisasi: mangkok berjalan mengangkat beras secara vertikal tanpa tenaga angkat kuli.",
                                    "Sorot corong siklon di luar pabrik yang memutar udara buangan agar debu sekam jatuh ke bawah dan udara desa tetap bersih."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa konveyor dan siklon debu yang Anda paparkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik pipa lift elevator vertikal dan tabung siklon debu",
                              "defaultExp": "Dari sisi Rekayasa, pabrik RMU menerapkan sistem konveyor mangkok vertikal tertutup yang memindahkan beras antarmesin secara otomatis mengandalkan gaya gravitasi. Untuk menjaga lingkungan sekitar tetap sehat, cerobong pembuangan sekam dipasangi tabung siklon pemisah debu yang memanfaatkan gaya sentrifugal untuk mengendapkan abu sekam ke bawah sehingga tidak berhamburan ke rumah warga.",
                              "defaultSources": "Kajian Rekayasa Alur Logistik Mesin RMU dan Pengendalian Emisi Siklon."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan tabel coretan pembelian 4 ton gabah, solar, upah giling, dan omzet beras",
                              "guidedPoints": [
                                    "Tunjukkan kertas coretan perhitungan ke arah kamera HP.",
                                    "Rinci biaya operasional giling 4.000 kg gabah: beli gabah Rp26 juta (Rp6.500/kg), solar Rp180 ribu, upah operator Rp250 ribu, karung Rp375 ribu, perawatan Rp100 ribu (Total Rp26,9 juta).",
                                    "Hitung hasil giling rendemen 65% menghasilkan 2.600 kg beras (dijual Rp11.500/kg = Rp29,9 juta) ditambah bekatul 320 kg (dijual Rp3.000/kg = Rp960 ribu). Total omzet Rp30,86 juta menghasilkan laba bersih Rp3,95 juta per hari operasi."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial giling padi yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel simulasi biaya giling gabah harian dan omzet beras RMU",
                              "defaultExp": "Secara Matematika Finansial, dalam satu hari operasi menggiling 4.000 kg gabah dibutuhkan modal beli gabah Rp26.000.000 ditambah biaya solar, karung, dan upah operator sebesar Rp905.000, total biaya Rp26.905.000. Dari rendemen 65 persen dihasilkan 2.600 kg beras bernilai Rp29.900.000 dan bekatul senilai Rp960.000, sehingga omzet mencapai Rp30.860.000 dengan laba bersih Rp3.955.000 per hari.",
                              "defaultSources": "Kalkulasi Keuangan Operasional Pabrik Giling Padi RMU Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide briket arang dari limbah sekam dan penutup video rekaman HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: sekam padi jangan dibakar percuma, tetapi dipadatkan menjadi briket arang sekam sebagai bahan bakar murah rumah makan.",
                                    "Tutup video dengan pesan santun dan dorongan memajukan industri pangan lokal.",
                                    "Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas visual jelas dan suara narasi bersih."
                              ],
                              "placeholder": "Tuliskan ide briket arang sekam dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_INDUSTRI_FINANSIAL.mp4 di galeri ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, limbah sekam padi yang melimpah dapat diolah menjadi briket arang padat berkalori tinggi untuk dijual ke industri tahu dan kuliner sebagai pengganti gas elpiji. Pemaparan video mandiri Day 6 ini telah saya tuntaskan berdurasi 8 menit 20 detik, siap dikirimkan ke YouTube untuk kelengkapan LKPD Day 6.",
                              "defaultSources": "Rencana Inovasi Briket Sekam Padi dan Log File Video HP Siswa."
                        }
                  ]
            },
            "perdagangan": {
                  "key": "perdagangan",
                  "name": "Perdagangan & Saprotan",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "storefront",
                  "desc": "Rekayasa Gudang Palet & Antrean Kasir, Modal Kulakan Barang, HPP Ritel & Laba Bersih Toko (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebut identitas diri, dan kilas balik sektor perdagangan/kios",
                              "guidedPoints": [
                                    "Buka video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains sifat kimia pupuk dan timbangan digital.",
                                    "Tegaskan topik video Day 6: mengulas rekayasa tata letak lorong toko dan perhitungan matematika margin keuntungan kulakan."
                              ],
                              "placeholder": "Tuliskan draf sapaan pembuka video Day 6 perdagangan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di lorong rak barang dagangan",
                              "defaultExp": "Halo semuanya, berjumpa kembali dengan saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan observasi toko perdagangan kemarin, pada video 5-10 menit ini saya akan menjelaskan rekayasa tata letak etalase barang serta perhitungan matematika finansial modal kulakan dan laba bersih penjualan sembako/saprotan.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Perdagangan (Klip D6_Dagang_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Tata Letak FIFO & Repacking Kemasan Ritel (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa penataan barang lama di depan (FIFO) dan kemasan eceran 1 kg",
                              "guidedPoints": [
                                    "Tunjukkan deretan barang di rak etalase dan jelaskan rekayasa First In First Out (FIFO).",
                                    "Jelaskan mengapa barang yang masuk lebih awal ditaruh paling depan agar terjual duluan sebelum kedaluwarsa.",
                                    "Tunjukkan rekayasa kemasan repacking: mengemas gula atau beras dari karung 50 kg menjadi bungkusan 1 kg agar terjangkau dan menguntungkan."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa tata letak toko dan repacking yang Anda ceritakan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan susunan rak barang FIFO dan plastik repacking berlabel",
                              "defaultExp": "Dari pilar Rekayasa, pemilik toko menata barang dengan sistem First In First Out (FIFO) di mana stok lama digeser ke baris paling depan agar dibeli konsumen lebih awal sehingga menghindari risiko kedaluwarsa. Selain itu, toko melakukan rekayasa repacking dengan mengemas ulang karung gula pasir 50 kg menjadi kemasan praktis 1 kg higienis yang disukai ibu rumah tangga dan bernilai jual lebih tinggi.",
                              "defaultSources": "Kajian Rekayasa Tata Kelola Gudang Ritel dan Sistem FIFO Toko."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan coretan hitungan modal kulakan mingguan Rp16 juta, margin 15%, dan laba toko",
                              "guidedPoints": [
                                    "Tunjukkan lembar kertas hitungan ke arah kamera HP.",
                                    "Rinci modal kulakan mingguan sembako: beras, minyak, gula, telur, mie instan total Rp16.000.000 ditambah operasional listrik/kresek Rp400.000 (Total modal Rp16,4 juta).",
                                    "Hitung penjualan dengan margin laba 15%: omzet kotor mencapai Rp18.400.000. Laba bersih yang diperoleh pemilik toko adalah Rp2.000.000 per minggu atau Rp8.000.000 per bulan."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial toko yang Anda sampaikan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel coretan kalkulasi perputaran modal kulakan dan laba mingguan",
                              "defaultExp": "Secara Matematika Finansial, perputaran stok mingguan memerlukan modal kulakan sebesar Rp16.000.000 untuk beras, minyak, dan telur, ditambah biaya operasional Rp400.000. Toko menetapkan margin keuntungan rata-rata 15 persen di atas harga distributor, menghasilkan omzet penjualan Rp18.400.000 per minggu. Setelah dipotong modal dan operasional, laba bersih yang diperoleh adalah Rp2.000.000 per minggu atau Rp8.000.000 per bulan.",
                              "defaultSources": "Kalkulasi Keuangan Ritel dan Margin Keuntungan Toko Sembako Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide layanan pesan antar WhatsApp desa dan penutup rekaman HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: toko membuka layanan pesan antar belanja via WhatsApp gratis ongkir untuk radius 2 km dan menyediakan pembayaran QRIS.",
                                    "Tutup video dengan pesan santun dan motivasi pentingnya kejujuran timbangan dalam berniaga.",
                                    "Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas gambar fokus dan suara narasi bersih."
                              ],
                              "placeholder": "Tuliskan ide pesan antar WhatsApp dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_DAGANG_FINANSIAL.mp4 di memori ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, toko dapat meluncurkan layanan pesan antar belanja kebutuhan harian melalui grup WhatsApp desa dengan pembayaran QRIS untuk mempermudah warga yang sibuk bekerja di sawah. Seluruh video mandiri Day 6 ini telah saya tuntaskan berdurasi 7 menit 50 detik, siap dikirim ke YouTube untuk penilaian LKPD.",
                              "defaultSources": "Rencana Inovasi Digital Toko Desa dan Log File Video HP Siswa."
                        }
                  ]
            },
            "formal": {
                  "key": "formal",
                  "name": "Jasa Keuangan Mikro",
                  "badge": "Video Rekayasa & Finansial",
                  "icon": "account_balance",
                  "desc": "Rekayasa Loket Akrilik & Dual-SIM Router, Likuiditas Kas Tunai, Omzet Fee Admin Transaksi (5-10 Menit)",
                  "cards": [
                        {
                              "key": "A",
                              "title": "Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)",
                              "subtitle": "Membuka video, menyebut identitas diri, dan kilas balik sektor jasa keuangan agen BRILink/BUMDes",
                              "guidedPoints": [
                                    "Buka video dengan santun: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.",
                                    "Kilas balik singkat materi Day 5 mengenai sains deteksi lampu UV dan teknologi mesin EDC.",
                                    "Tegaskan topik video Day 6: mengulas rekayasa keamanan konter transaksi dan perhitungan matematika pendapatan fee admin."
                              ],
                              "placeholder": "Tuliskan kalimat pembuka video Day 6 jasa keuangan mikro... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Rekaman kamera depan HP di dekat meja konter agen keuangan",
                              "defaultExp": "Halo semuanya, berjumpa kembali dengan saya [Nama Siswa] dari SMAN 1 Belitang pada video kokurikuler Day 6. Melanjutkan observasi agen BRILink kemarin, pada video 5-10 menit ini saya akan menjelaskan rekayasa keamanan loket dan cadangan sinyal internet, serta perhitungan matematika finansial modal likuiditas dan keuntungan fee admin bulanan.",
                              "defaultSources": "Draf Naskah Pembukaan Video Finansial Agen Keuangan (Klip D6_Keuangan_01)."
                        },
                        {
                              "key": "B",
                              "title": "Penjelasan Mandiri Pilar Rekayasa: Loket Akrilik & Dual-SIM Failover Router (01:30–04:30)",
                              "subtitle": "Menerangkan rekayasa baki geser laci kasir dan router dua kartu SIM anti sinyal hilang",
                              "guidedPoints": [
                                    "Tunjukkan loket konter bersekat kaca/akrilik dan celah baki geser untuk menyerahkan uang tunai.",
                                    "Jelaskan rekayasa keselamatan: menjaga jarak aman agen dan melindungi tombol PIN nasabah dari pengintaian orang lain.",
                                    "Tunjukkan router internet dengan dua kartu SIM (Dual-SIM) yang otomatis beralih operator jika sinyal salah satu kartu melemah."
                              ],
                              "placeholder": "Tuliskan penjelasan rekayasa keamanan loket dan jaringan internet yang Anda tuturkan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Pengamatan fisik loket bersekat akrilik dan lampu indikator router 4G",
                              "defaultExp": "Dari sisi Rekayasa, meja loket agen dirancang dengan sekat akrilik transparan dan baki geser uang tunai untuk menjamin privasi tombol PIN nasabah serta menjaga keamanan dari aksi pencurian. Untuk mengatasi kendala sinyal internet desa yang sering drop saat hujan, agen memasang router Dual-SIM failover yang otomatis memindahkan koneksi ke operator cadangan dalam hitungan detik tanpa memutus transaksi.",
                              "defaultSources": "Kajian Rekayasa Fisik Loket Transaksi dan Keandalan Jaringan Dual-SIM."
                        },
                        {
                              "key": "C",
                              "title": "Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)",
                              "subtitle": "Memperlihatkan coretan hitungan modal likuiditas Rp60 juta, 40 transaksi harian, dan laba fee admin",
                              "guidedPoints": [
                                    "Tunjukkan lembar kertas hitungan ke arah kamera HP.",
                                    "Rinci modal likuiditas: saldo rekening bank Rp35 juta dan uang tunai di laci Rp25 juta (Total Rp60 juta modal putar).",
                                    "Hitung pendapatan fee: 40 transaksi sehari dengan fee bersih Rp3.000 per transaksi menghasilkan Rp120.000 per hari (Rp3.600.000 per bulan). Dipotong biaya kuota dan kertas Rp500.000 menghasilkan laba bersih Rp3.100.000 per bulan."
                              ],
                              "placeholder": "Tuliskan rincian kalkulasi matematika finansial agen perbankan yang Anda jelaskan... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: Tabel coretan simulasi fee administrasi harian dan laba bulanan",
                              "defaultExp": "Secara Matematika Finansial, agen mengelola modal likuiditas perputaran sebesar Rp60.000.000 yang terbagi atas saldo rekening bank Rp35 juta dan uang tunai brankas Rp25 juta. Dengan melayani rata-rata 40 transaksi per hari dan bagian fee bersih agen Rp3.000 per transaksi, diperoleh pemasukan Rp120.000 per hari atau Rp3.600.000 per bulan. Setelah dikurangi biaya operasional kuota dan kertas Rp500.000, laba bersih agen mencapai Rp3.100.000 per bulan.",
                              "defaultSources": "Kalkulasi Keuangan Fee Transaksi dan Likuiditas Agen BRILink Belitang."
                        },
                        {
                              "key": "D",
                              "title": "Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)",
                              "subtitle": "Merumuskan ide manajemen kas saat panen raya padi dan penutup video rekaman HP",
                              "guidedPoints": [
                                    "Ajukan ide inovasi: saat musim panen raya tiba, agen berkoordinasi dengan kelompok tani untuk menjadwalkan pencairan uang agar persediaan kas tunai tidak mendadak habis.",
                                    "Tutup video dengan pesan santun dan dorongan literasi keuangan bagi masyarakat desa.",
                                    "Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas visual jelas dan suara narasi bersih."
                              ],
                              "placeholder": "Tuliskan ide manajemen kas panen raya dan kalimat penutup video Anda... (Minimal 80 karakter)",
                              "sourcePlaceholder": "Contoh: File rekaman D6_KEUANGAN_FINANSIAL.mp4 di galeri ponsel",
                              "defaultExp": "Sebagai gagasan inovasi, agen dapat membentuk kesepakatan jadwal penarikan tunai bertahap dengan kelompok tani saat musim panen raya padi tiba agar perputaran kas tidak mengalami kekosongan mendadak. Pemaparan video mandiri Day 6 ini telah saya selesaikan berdurasi 8 menit 10 detik, siap diserahkan ke YouTube untuk penilaian LKPD Day 6.",
                              "defaultSources": "Rencana Inovasi Manajemen Kas Likuiditas dan Log File Video HP Siswa."
                        }
                  ]
            }
      }
},

    7: {
      dayNum: 7,
      title: 'Modul Riset Day 7: Video Refleksi Perjalanan Riset Day 1–7 & Behind The Scene (BTS)',
      theme: 'Sintesis Komprehensif 4 Pilar FINCESTEM',
      gradientClass: 'from-amber-950 via-slate-900 to-indigo-950 border-amber-700/40',
      tagColorClass: 'bg-white/20 text-amber-100',
      badgeColorClass: 'bg-rose-400 text-rose-950',
      subtitle: 'Panduan Penggabungan Video Dokumenter Riset (CapCut/VN), Tata Cara Unggah YouTube (Publik/Unlisted), Penginputan Link Video di FINCESTEM, serta Rekonsiliasi Tutup Buku Kas Riset Mandiri',
      inquiryIntro: 'Selamat datang di <strong>Hari Puncak Riset Mandiri FINCESTEM 2026!</strong> Hari ini Anda akan menyatukan rekaman video Day 5 dan Day 6 menjadi 1 karya video dokumenter utuh (durasi 3–5 menit), mengunggahnya ke YouTube, menyalin tautan link video ke formulir pengumpulan aplikasi, serta menyusun laporan rekonsiliasi tutup buku kas riset mandiri.',
      cards: [
        {
          key: 'A',
          title: 'Panduan Pascaproduksi & Editing Video di HP (CapCut / VN / Canva)',
          subtitle: 'Penggabungan 4 Pilar, Penambahan Teks Identitas, Narasi Suara Latar & Musik Bebas Copyright',
          guidedPoints: [
            'Langkah penggabungan klip video Day 5 (Finansial & Budaya) dan Day 6 (Eksplorasi & STEM) ke dalam timeline berurutan dengan durasi akhir 3 hingga 5 menit.',
            'Penambahan teks judul pada intro video: Judul Riset, Nama Lengkap Siswa, NISN, Kelas, Nama Fasilitator, dan Logo SMAN 1 Belitang.',
            'Penyisipan rekaman suara penjelasan (voice-over) yang jernih, transisi adegan yang rapi, serta pemilihan musik latar dengan volume proporsional (20-30%).',
            'Ekspor hasil video dengan resolusi standar YouTube 720p atau 1080p Full HD.'
          ],
          placeholder: 'Tuliskan laporan proses editing video Anda: aplikasi yang digunakan, judul video dokumenter yang dipilih, durasi akhir video, dan kendala teknis yang berhasil diatasi... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil ekspor file video final pada memori smartphone.\n2. Lembar kerja storyboard dan skrip narasi video.',
          defaultExp: 'Proses editing video dokumenter diselesaikan menggunakan aplikasi CapCut mobile dengan merangkai adegan 4 pilar secara harmonis. Video diawali opening title kartu identitas siswa dan SMAN 1 Belitang, narasi voice-over penjelasan 4 pilar berurutan, latar audio instrumen bebas copyright, dan diekspor pada resolusi Full HD 1080p.',
          defaultSources: '1. File Master Video Dokumenter FINCESTEM 2026 (MP4 Full HD).\n2. Catatan Riwayat Editing Proyek Video CapCut/VN.'
        },
        {
          key: 'B',
          title: 'Panduan Unggah ke YouTube & Pengisian Link Tautan Resmi',
          subtitle: 'Setelan Privasi YouTube (Publik / Unlisted), Penyalinan URL Video & Penulisan Sinopsis Riset',
          guidedPoints: [
            'Prosedur mengunggah file video ke channel YouTube pribadi/kelompok menggunakan aplikasi YouTube di smartphone.',
            'Pemilihan setelan visibilitas: disarankan opsi Publik atau "Tidak Terdaftar" (Unlisted - hanya yang memiliki tautan yang bisa menonton agar privasi siswa terjaga).',
            'Penyalinan tautan resmi video (contoh: https://youtu.be/... atau https://www.youtube.com/watch?v=...) dan penempelan pada formulir LKPD Day 7 aplikasi FINCESTEM.',
            'Penyusunan sinopsis temuan riset (deskripsi 2-3 paragraf) yang menjelaskan intisari riset 4 pilar di OKU Timur.'
          ],
          placeholder: 'Tuliskan link YouTube video karya Anda, judul video di YouTube, serta sinopsis ringkas temuan riset 4 pilar yang Anda sajikan dalam video... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. URL Link Video YouTube Resmi karya peserta didik.\n2. Deskripsi dan sinopsis tayangan video di YouTube.',
          defaultExp: 'Video dokumenter telah berhasil diunggah ke YouTube dengan status visibilitas Unlisted sehingga dewan fasilitator dapat langsung mengakses dan menilai melalui tautan resmi yang disematkan pada portal FINCESTEM. Sinopsis video menguraikan korelasi antara kekuatan ekonomi daerah, kearifan budaya leluhur, bentang alam irigasi, dan modernisasi teknologi pertanian.',
          defaultSources: '1. Tautan URL Video YouTube Karya Siswa (https://youtu.be/...).\n2. Deskripsi Publikasi Video pada Channel YouTube.'
        },
        {
          key: 'C',
          title: 'Rekonsiliasi Tutup Buku Kas & Audit Keuangan Riset Mandiri',
          subtitle: 'Pencocokan Rencana Anggaran Day 1 vs Realisasi Pengeluaran Nyata & Sisa Saldo Kas',
          guidedPoints: [
            'Pencatatan rekapitulasi seluruh pengeluaran riil selama 7 hari pelaksanaan riset (transportasi lokal, konsumsi, pembelian alat/kuota, dan biaya observasi).',
            'Perhitungan selisih antara Rencana Anggaran Biaya (RAB) yang disusun pada Day 1 dengan realisasi belanja fisik lapangan.',
            'Penetapan sisa saldo kas akhir serta refleksi mandiri mengenai efektivitas pengelolaan uang dan disiplin anggaran dalam kehidupan sehari-hari.'
          ],
          placeholder: 'Tuliskan rekapitulasi tutup buku kas riset Anda: total dana awal, total realisasi pengeluaran 7 hari, sisa saldo kas riil, serta pelajaran penting dalam mengelola keuangan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Lembar Rekonsiliasi Kas Mandiri dan Nota Bukti Pengeluaran 7 Hari.\n2. Rencana Anggaran Biaya (RAB) Day 1 di Aplikasi FINCESTEM.',
          defaultExp: 'Rekonsiliasi pembukuan kas riset mandiri menunjukkan seluruh pengeluaran selama 7 hari tercatat tertib dengan bukti kuitansi nota terlampir. Perbandingan antara rencana anggaran Day 1 dengan realisasi riil menunjukkan efisiensi belanja yang terukur dan menghasilkan sisa saldo kas yang dikembalikan sebagai tabungan pribadi siswa.',
          defaultSources: '1. Buku Kas Pembantu Pengeluaran Riset 7 Hari Siswa.\n2. Rekapitulasi Nota/Kuitansi Belanja Fisik Lapangan.'
        }
      ]
    }

  };

  // Helper untuk menambah nomor rujukan otomatis (+ Tambah Rujukan Lain)
  window.appendNextSourceForDay = function(dayNum, key) {
    const srcEl = document.getElementById(`nftD${dayNum}Source${key}`);
    if (!srcEl) return;
    const currentVal = srcEl.value;
    const trimmed = currentVal.trim();

    if (!trimmed) {
      srcEl.value = '1. ';
    } else {
      const matches = trimmed.match(/(?:^|\n)\s*(\d+)[\.\)]/g);
      let nextNum = 2;
      if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const numPart = parseInt(lastMatch.replace(/\D/g, ''), 10);
        if (!isNaN(numPart)) nextNum = numPart + 1;
        srcEl.value = trimmed + '\n' + nextNum + '. ';
      } else {
        if (!trimmed.startsWith('1.')) {
          srcEl.value = '1. ' + trimmed + '\n2. ';
        } else {
          srcEl.value = trimmed + '\n2. ';
        }
      }
    }

    srcEl.focus();
    srcEl.setSelectionRange(srcEl.value.length, srcEl.value.length);
    if (typeof window.onNftCardInputUnified === 'function') {
      window.onNftCardInputUnified(dayNum, key);
    }
  };

  // Aliases backward compatibility
  window.appendNextSource = function(key) { window.appendNextSourceForDay(1, key); };
  window.appendNextSourceD2 = function(key) { window.appendNextSourceForDay(2, key); };

  // 3. ENGINE UNIVERSAL RENDER MODUL RISET NON-FIELD TRIP (DAY 1 S.D. DAY 7)
  function renderNonFieldTripDayModule(container, dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (!container) return;
    if (dayNum === 5 || dayNum === 6) {
      renderDay5Or6VideoModule(container, dayNum);
      return;
    }
    if (dayNum === 7) {
      renderDay7ReflectionVideoModule(container);
      return;
    }

    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    // Cek apakah data Day ini sudah pernah dikirim resmi sebelumnya
    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                     localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    // Fallback ekstraksi dari progress server jika berpindah gawai/device baru
    if (!savedOfficial || !savedOfficial.cardA) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map[`${dayNum}_materi`] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c && c.cardA) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = {
                day: dayNum,
                submitted: true,
                submittedAt: tMap.updated_at || new Date().toISOString(),
                cardA: { title: cfg.cards[0].title, text: c, source: cfg.cards[0].defaultSources },
                cardB: { title: cfg.cards[1].title, text: c, source: cfg.cards[1].defaultSources },
                cardC: { title: cfg.cards[2].title, text: c, source: cfg.cards[2].defaultSources },
                cardD: { title: cfg.cards[3].title, text: c, source: cfg.cards[3].defaultSources },
                cardE: { title: cfg.cards[4].title, text: c, source: cfg.cards[4].defaultSources }
              };
            }
          }
        }
      } catch(eHyd) {}
    }

    // Safety fallback: pastikan seluruh 5 kartu terisi jika record hanya memuat kesimpulan/ringkasan
    if (savedOfficial && !savedOfficial.cardA) {
      const c = savedOfficial.conclusion || savedOfficial.summary || savedOfficial.text || '';
      savedOfficial.cardA = { title: cfg.cards[0].title, text: c, source: cfg.cards[0].defaultSources };
      savedOfficial.cardB = { title: cfg.cards[1].title, text: c, source: cfg.cards[1].defaultSources };
      savedOfficial.cardC = { title: cfg.cards[2].title, text: c, source: cfg.cards[2].defaultSources };
      savedOfficial.cardD = { title: cfg.cards[3].title, text: c, source: cfg.cards[3].defaultSources };
      savedOfficial.cardE = { title: cfg.cards[4].title, text: c, source: cfg.cards[4].defaultSources };
    }

    // Cek auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt));
    window[`isNftD${dayNum}Submitted`] = isSubmitted;

    // Helper ekspansi otomatis kartu jika memuat cuplikan ringkasan server lama
    const expandCardIfShort = function(card, defaultTitle, defaultExp, defaultSrc) {
      const c = card || {};
      let text = String(c.text || '').trim();
      let source = String(c.source || '').trim();
      if (text.endsWith('...')) text = text.replace(/\.\.\.$/, '').trim();
      if (text.length < 300) {
        text = (text ? text + '. ' : '') + defaultExp;
      }
      if (source.length < 20) {
        source = defaultSrc;
      }
      return { title: c.title || defaultTitle, text: text, source: source };
    };

    // Khusus Day 3 & Day 4: Deteksi Sektor Pilihan Siswa
    let selectedSector = 'pertanian';
    if (dayNum >= 3 && dayNum <= 6) {
      if (savedOfficial && savedOfficial.selectedSector && cfg.sectors && cfg.sectors[savedOfficial.selectedSector]) {
        selectedSector = savedOfficial.selectedSector;
      } else {
        let localSec = null;
        if (dayNum === 6) {
          localSec = localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
        } else if (dayNum === 5) {
          localSec = localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
        } else if (dayNum === 4) {
          localSec = localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                     localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
        } else if (dayNum === 3) {
          localSec = localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
        }

        function mapToMateriSectorKey(raw) {
          if (!raw) return '';
          const s = String(raw).toLowerCase().trim();
          if (s.includes('brilink') || s.includes('bank') || s.includes('koperasi') || s.includes('bumdes') || s.includes('keuangan') || s.includes('formal') || s.includes('bengkel') || s.includes('salon')) return 'formal';
          if (s.includes('toko') || s.includes('pasar') || s.includes('sembako') || s.includes('dagang') || s.includes('perdagangan') || s.includes('grosir') || s.includes('saprotan') || s.includes('warung') || s.includes('niaga') || s.includes('kelontong')) return 'perdagangan';
          if (s.includes('industri') || s.includes('rmu') || s.includes('giling') || s.includes('pabrik') || s.includes('tahu') || s.includes('tempe') || s.includes('kemplang') || s.includes('olah')) return 'industri';
          if (s.includes('ikan') || s.includes('patin') || s.includes('lele') || s.includes('kolam') || s.includes('perikanan') || s.includes('tambak')) return 'perikanan';
          if (s.includes('ternak') || s.includes('sapi') || s.includes('kambing') || s.includes('ayam') || s.includes('bebek') || s.includes('peternakan') || s.includes('unggas') || s.includes('domba')) return 'peternakan';
          if (s.includes('kebun') || s.includes('karet') || s.includes('sawit') || s.includes('lateks') || s.includes('perkebunan') || s.includes('tbs')) return 'perkebunan';
          if (s.includes('padi') || s.includes('tani') || s.includes('sawah') || s.includes('melon') || s.includes('semangka') || s.includes('pangan') || s.includes('pertanian') || s.includes('horti') || s.includes('palawija')) return 'pertanian';
          return (cfg.sectors && cfg.sectors[s]) ? s : '';
        }

        if (localSec && cfg.sectors && cfg.sectors[localSec]) {
          selectedSector = localSec;
        } else {
          const directMapped = mapToMateriSectorKey(localSec);
          if (directMapped && cfg.sectors && cfg.sectors[directMapped]) {
            selectedSector = directMapped;
          } else if (dayNum >= 3 && dayNum <= 6) {
            // Fallback ke Day 2 atau Day 1 jika belum diset
            let d2Sec = localStorage.getItem('fincestem_nft_sector_d2_' + cleanNisn);
            if (!d2Sec) {
              try {
                const rawM2 = localStorage.getItem('fincestem_materi_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_materi_day2_' + cleanNisn);
                if (rawM2) {
                  const p2 = JSON.parse(rawM2);
                  if (p2 && p2.selectedSector) d2Sec = p2.selectedSector;
                }
              } catch(e) {}
            }
            if (!d2Sec) {
              try {
                const rawLkpd2 = localStorage.getItem('fincestem_lkpd_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day2_' + cleanNisn);
                if (rawLkpd2) {
                  const p2 = JSON.parse(rawLkpd2);
                  if (p2 && (p2.sectorKey || p2.sector)) d2Sec = p2.sectorKey || p2.sector;
                }
              } catch(e) {}
            }
            if (!d2Sec) {
              try {
                const rawLkpd1 = localStorage.getItem('fincestem_lkpd_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day1_' + cleanNisn);
                if (rawLkpd1) {
                  const p1 = JSON.parse(rawLkpd1);
                  if (p1 && (p1.businessType || p1.sectorKey || p1.sector)) d2Sec = p1.businessType || p1.sectorKey || p1.sector;
                }
              } catch(e) {}
            }
            if (d2Sec) {
              const mapped = mapToMateriSectorKey(d2Sec);
              if (mapped && cfg.sectors && cfg.sectors[mapped]) {
                selectedSector = mapped;
              }
            }
          }
        }
      }
    }

    const activeCards = ((dayNum >= 3 && dayNum <= 6) && cfg.sectors && cfg.sectors[selectedSector])
      ? cfg.sectors[selectedSector].cards
      : cfg.cards;

    const cardDataMap = {};
    activeCards.forEach(cardCfg => {
      const k = cardCfg.key;
      const rawCard = (savedOfficial && savedOfficial['card' + k]) || (draft && draft['card' + k]) || { text: '', source: '' };
      cardDataMap[k] = isSubmitted ? expandCardIfShort(rawCard, cardCfg.title, cardCfg.defaultExp, cardCfg.defaultSources) : rawCard;
    });

    const savedConclusion = (savedOfficial && (savedOfficial.userConclusion || savedOfficial.conclusion || savedOfficial.summary)) ||
                            (draft && draft.conclusion) || '';

    container.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-10">
        
        <!-- BANNER STATUS TERKIRIM RESMI LENGKAP JIKA SUBMITTED -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-emerald-800 tracking-wider">Status Riset Mandiri Day ${dayNum}</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Modul Riset Day ${dayNum} Telah Dikirim Resmi &amp; Lengkap 100% ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5 text-justify leading-relaxed">
                  Seluruh 5 kartu riset ilmiah telah tuntas terverifikasi, memenuhi batas minimum analisis akademik, dan tersimpan aman di server fasilitator.
                </p>
              </div>
            </div>
            <span class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs shrink-0 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">check_circle</span>
              <span>5 / 5 Kartu Selesai</span>
            </span>
          </div>
        ` : ''}

        <!-- HEADER IDENTITAS MODUL BELAJAR NON-FIELD TRIP -->
        <div class="bg-gradient-to-br ${cfg.gradientClass} rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${cfg.tagColorClass} backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Non-Field Trip • Day ${dayNum}</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${cfg.badgeColorClass}">
                ${cfg.theme}
              </span>
            </div>
            <span id="badgeNftD${dayNum}Status" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Riset Terkirim Resmi' : 'Sedang Bekerja (Mandiri)'}
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              ${cfg.title}
            </h2>
            <p class="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-medium mt-1 text-justify">
              ${cfg.subtitle}
            </p>
          </div>

          <!-- KARTU DATA SISWA & PEMBINA -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-200 text-[10px] font-medium">Nama Peneliti</span>
              <span class="font-extrabold truncate text-white">${studentName}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-200 text-[10px] font-medium">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white">${studentNisn}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-200 text-[10px] font-medium">Rombel Terdaftar</span>
              <span class="font-extrabold truncate text-white">${studentClass}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-200 text-[10px] font-medium">Fasilitator Pembina</span>
              <span class="font-extrabold truncate text-white">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- TIPS TABUNGAN KLIP BTS DAY 7 (DAY 1 - DAY 4) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white border-2 border-purple-400/40 flex items-start gap-3.5 shadow-sm">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-xs">
            <span class="material-symbols-outlined text-xl">video_camera_front</span>
          </div>
          <div class="flex-1 text-xs">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="font-extrabold text-amber-300 text-xs sm:text-sm">💡 Tabungan Klip Video BTS (Day 1 s.d. Day 6):</span>
              <span class="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-bold border border-purple-300/30">Misi Menuju Day 7</span>
            </div>
            <p class="text-purple-100 text-xs leading-relaxed text-justify">
              Saat melakukan observasi lapangan dan dokumentasi foto hari ini, sempatkan merekam <strong>klip video singkat (5–15 detik) momen di balik layar</strong> (suasana perjalanan, candid saat diskusi/wawancara, mencari referensi, atau momen seru kelompok). <strong>Simpan klipnya di galeri HP Anda</strong> untuk digabungkan menjadi Video BTS (Behind The Scene) di Day 7 nanti!
            </p>
          </div>
        </div>

        <!-- PETUNJUK KERJA AKADEMIK (ATURAN KETAT DENGAN BULLET & NUMBERING RAPI RATA KANAN-KIRI) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-300/80 text-amber-950 flex flex-col gap-2.5 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
            <span class="material-symbols-outlined text-amber-700 text-lg">psychology</span>
            <span>PETUNJUK RISET MANDIRI DAY ${dayNum} (INQUIRY-BASED LEARNING):</span>
          </div>
          <p class="text-xs leading-relaxed text-amber-950/90 text-justify">
            ${cfg.inquiryIntro}
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-amber-950/90 font-medium text-justify leading-relaxed">
            <li class="pl-1 text-justify">Tuntaskan <strong>5 Kartu Riset (A, B, C, D, E)</strong> secara berurutan dengan sintesis analisis kritis dan kalimat ilmiah orisinal Anda sendiri.</li>
            <li class="pl-1 text-justify">Setiap kartu wajib memenuhi <strong>minimal 300 karakter analisis mendalam</strong> (sistem otomatis menolak teks berulang atau spam salin-tempel).</li>
            <li class="pl-1 text-justify">Wajib mencantumkan <strong>Sumber Rujukan Valid (minimal 20 karakter)</strong> pada setiap kartu. Anda dapat mencantumkan lebih dari satu rujukan dengan menekan tombol <strong>+ Tambah Rujukan Lain</strong>.</li>
            <li class="pl-1 text-justify">Tombol simpan dan kirim ke Fasilitator baru akan aktif setelah <strong>kelima kartu berstatus hijau (100% lengkap &amp; valid)</strong>.</li>
          </ul>
        </div>

        ${(dayNum >= 3 && dayNum <= 6) ? `
          <!-- CARD PILIHAN SEKTOR KHUSUS DAY ${dayNum} (RINGKAS & EKSPLISIT: SINGLE FOCUS CARD) -->
          <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-500/50 shadow-sm flex flex-col gap-3.5">
            
            <!-- HEADER & PANDUAN RINGKAS -->
            <div class="flex items-center justify-between gap-2 border-b border-emerald-200/80 pb-3 flex-wrap">
              <div class="flex items-center gap-2.5">
                <span class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
                  <span class="material-symbols-outlined text-xl">hub</span>
                </span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-black text-sm sm:text-base text-emerald-950 leading-tight">${dayNum === 6 ? 'Sektor Video Mandiri: Rekayasa &amp; Finansial (5–10 Menit):' : (dayNum === 5 ? 'Sektor Video Mandiri: Sains &amp; Teknologi (5–10 Menit):' : (dayNum === 4 ? 'Sektor Eksplorasi Peralatan &amp; Perlengkapan Kerja:' : 'Pilih Sektor Riset Unggulan OKU Timur:'))}</h3>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">7 Sektor Tersedia</span>
                  </div>
                  <p class="text-xs text-emerald-800/90 font-medium mt-0.5">${dayNum >= 5 ? 'Pilih salah satu sektor di dropdown untuk menampilkan panduan urutan naskah video presentasi HP (5–10 menit tanpa wawancara).' : (dayNum === 4 ? 'Pilih salah satu sektor di dropdown untuk menelaah peralatan kerjanya melalui 4 pilar STEM.' : 'Pilih salah satu sektor di menu dropdown di bawah. Kartu sektor terpilih akan otomatis tampil di bawahnya.')}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-2xs">
                Sektor Aktif: ${(cfg.sectors && cfg.sectors[selectedSector]) ? cfg.sectors[selectedSector].name : 'Pertanian Padi Sawah'}
              </span>
            </div>

            <!-- DROPDOWN UTAMA PEMILIH SEKTOR -->
            <div class="p-3 sm:p-3.5 rounded-2xl bg-white border-2 border-emerald-400 shadow-xs flex flex-col gap-1.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <label for="materiDay${dayNum}SectorSelect" class="font-black text-xs sm:text-sm text-emerald-950 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-sm">arrow_drop_down_circle</span>
                  </span>
                  <span>Pilih Sektor Riset Anda Melalui Dropdown:</span>
                </label>
                <span class="text-[10px] sm:text-[11px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  Bebas Ganti Sektor
                </span>
              </div>
              <select id="materiDay${dayNum}SectorSelect" onchange="${dayNum === 6 ? 'selectDay6Sector(this.value)' : (dayNum === 5 ? 'selectDay5Sector(this.value)' : (dayNum === 4 ? 'selectDay4Sector(this.value)' : 'selectDay3Sector(this.value)'))}" class="w-full p-3 rounded-xl border-2 border-emerald-500 focus:border-emerald-700 bg-emerald-50/40 text-emerald-950 font-black text-xs sm:text-sm shadow-xs outline-none cursor-pointer transition-all">
                <option value="pertanian" ${selectedSector === 'pertanian' ? 'selected' : ''}>1. Sektor Pertanian Padi Sawah &amp; Hortikultura (Padi, Kebun Melon, Semangka, &amp; Palawija)</option>
                <option value="perkebunan" ${selectedSector === 'perkebunan' ? 'selected' : ''}>2. Sektor Perkebunan Rakyat (Karet &amp; Kelapa Sawit)</option>
                <option value="peternakan" ${selectedSector === 'peternakan' ? 'selected' : ''}>3. Sektor Peternakan Rakyat OKU Timur (Sapi, Kambing &amp; Unggas)</option>
                <option value="perikanan" ${selectedSector === 'perikanan' ? 'selected' : ''}>4. Sektor Perikanan Air Tawar (Sentra Patin &amp; Lele Belitang)</option>
                <option value="industri" ${selectedSector === 'industri' ? 'selected' : ''}>5. Sektor Agro-Industri Pangan (Pabrik RMU, Tahu &amp; Kemplang)</option>
                <option value="perdagangan" ${selectedSector === 'perdagangan' ? 'selected' : ''}>6. Sektor Perdagangan &amp; UMKM Niaga (Toko Pakaian, Sembako, Kios Pasar, &amp; Saprotan)</option>
                <option value="formal" ${selectedSector === 'formal' ? 'selected' : ''}>7. Sektor Jasa Keuangan Mikro &amp; Jasa Perorangan (Agen BRILink, BUMDes, Bengkel &amp; Jasa)</option>
              </select>
            </div>

            <!-- KARTU FOKUS TUNGGAL SEKTOR TERPILIH (HANYA 1 KARTU INI YANG TAMPIL - RAPI & TIDAK MEMENUHI LAYAR HP) -->
            ${(() => {
              const allSecs = [
                { key: 'pertanian', name: 'Pertanian Padi Sawah', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Sawah & Saluran Irigasi' : 'Lumbung Pangan Komering'))), icon: 'agriculture', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Padi' : (dayNum === 4 ? 'Akses Jalan Usaha Tani, Hamparan Sawah Irigasi, Pasokan Pupuk & Angkutan Panen' : 'Padi Sawah, Saluran Irigasi BK, Traktor/Combine & Ubinan HPP')) },
                { key: 'perkebunan', name: 'Perkebunan Rakyat', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kebun & Rute Angkut' : 'Karet & Kelapa Sawit'))), icon: 'forest', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perkebunan' : (dayNum === 4 ? 'Rute Akses Kebun Karet/Sawit, Lingkungan Alam, Pasokan Bibit & Pengiriman Hasil' : 'Lateks Karet, Panen TBS Sawit, Rorak Lahan & Laba Pekebun')) },
                { key: 'peternakan', name: 'Peternakan Rakyat OKU Timur', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kandang & Lingkungan' : 'Sapi, Kambing & Unggas'))), icon: 'pets', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Peternakan' : (dayNum === 4 ? 'Akses Lokasi Peternakan, Jarak dari Pemukiman, Pasokan Pakan & Distribusi Ternak' : 'Peternakan Sapi, Kambing, Unggas/Ayam, Chopper & Silase')) },
                { key: 'perikanan', name: 'Perikanan Air Tawar', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Kolam & Sumber Air' : 'Sentra Patin & Lele Belitang'))), icon: 'phishing', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perikanan' : (dayNum === 4 ? 'Letak Kolam, Aliran Air Sungai/Irigasi, Pasokan Pakan Pelet & Penjualan Ikan' : 'Budidaya Patin/Lele, Kualitas Air, Kincir Aerasi & FCR Pakan')) },
                { key: 'industri', name: 'Agro-Industri Pangan', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Pengolahan & Distribusi' : 'Pabrik RMU, Tahu & Kemplang'))), icon: 'precision_manufacturing', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Agro-Industri' : (dayNum === 4 ? 'Akses Pabrik RMU/Tahu/Kemplang, Pasokan Bahan Baku & Pengiriman Produk ke Pasar' : 'Rendemen Beras RMU, Fermentasi Kedelai, Pemanggangan Kemplang & IPAL')) },
                { key: 'perdagangan', name: 'Perdagangan & Saprotan', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Letak Kios & Pasar' : 'Kios Saprotan & Grosir'))), icon: 'storefront', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Perdagangan' : (dayNum === 4 ? 'Lokasi Kios di Pinggir Jalan, Alur Kiriman Distributor & Penjualan ke Warga' : 'Distribusi Pupuk Bersubsidi, Aplikasi i-Pubers, Ergonomi Gudang & Margin ITO')) },
                { key: 'formal', name: 'Jasa Keuangan Mikro', badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Layanan & Akses Warga' : 'Agen BRILink & BUMDes'))), icon: 'account_balance', desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Keuangan Mikro' : (dayNum === 4 ? 'Titik Lokasi Agen BRILink/BUMDes, Keramaian Lalu Lintas Warga & Akses Sinyal' : 'Transmisi 4G/LTE, Kriptografi Chip Kartu, Likuiditas Panen & Inklusi Desa')) }
              ];
              const sec = allSecs.find(s => s.key === selectedSector) || allSecs[0];
              return `
                <div class="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm flex flex-col gap-3">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <span class="material-symbols-outlined text-2xl">${sec.icon}</span>
                      </div>
                      <div>
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-black text-sm sm:text-base text-slate-900 leading-tight">${sec.name}</h4>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-950 border border-emerald-300">${sec.badge}</span>
                        </div>
                        <p class="text-xs text-slate-600 font-medium mt-1 leading-relaxed">${sec.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div class="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="py-2 px-3 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs">
                      <span class="material-symbols-outlined text-base">check_circle</span>
                      <span>✓ Sektor Aktif Terpilih (Siap Diteliti)</span>
                    </div>
                    <span class="text-[11px] text-slate-500 font-medium text-center sm:text-right">
                      Ingin beralih ke sektor lain? Cukup pilih sektor baru di dropdown atas.
                    </span>
                  </div>
                </div>
              `;
            })()}

          </div>
        ` : ''}

        <!-- PROGRESS BAR INDIKATOR HARI INI -->
        <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-700 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-600">checklist</span>
              <span>Progres Kelengkapan Kartu Riset &amp; Kesimpulan Day ${dayNum}:</span>
            </span>
            <span id="lblNftD${dayNum}ProgressCount" class="font-black text-teal-800">0 / 6 Terpenuhi</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div id="barNftD${dayNum}Progress" class="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- FORMULIR KARTU RISET (A, B, C, D, E) -->
        <form id="formNftDay${dayNum}Cards" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          ${activeCards.map(c => {
            const k = c.key;
            const dataK = cardDataMap[k] || { text: '', source: '' };
            return `
              <div id="cardBoxD${dayNum}_${k}" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
                
                <!-- HEADER IDENTITAS KARTU -->
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">${k}</span>
                    <div>
                      <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">${c.title}</h3>
                      <span class="text-[11px] text-slate-500 font-medium">${c.subtitle}</span>
                    </div>
                  </div>
                  <span id="badgeCardStatusD${dayNum}_${k}" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
                </div>

                <!-- 1. KOTAK ARAHAN TUGAS PENCARIAN MATERI SISWA -->
                <div class="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs text-amber-950 flex flex-col gap-2 shadow-2xs">
                  <div class="flex items-center gap-2 font-black text-amber-900 text-xs sm:text-sm">
                    <span class="material-symbols-outlined text-amber-700 text-base">travel_explore</span>
                    <span>Arahan Tugas Pencarian Materi Siswa:</span>
                  </div>
                  <div class="font-black text-amber-950 text-xs pl-1">
                    ${c.taskInstruction || 'Sebutkan pengertian dan berikan contoh:'}
                  </div>
                  <div class="space-y-1.5 text-xs text-slate-800 font-semibold leading-relaxed pl-1">
                    ${(c.items || c.guidedPoints).map(it => `<div class="whitespace-pre-line">${it}</div>`).join('')}
                  </div>
                </div>

                <!-- 2. KOLOM UNTUK MENJAWAB HASIL PENCARIAN -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">edit_note</span>
                    <span>Kolom Jawaban Hasil Pencarian Anda:</span>
                  </label>
                  <textarea id="nftD${dayNum}Text${k}" rows="7" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, '${k}')" placeholder="${c.placeholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${dataK.text || ''}</textarea>
                  <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                    <span id="msgValidationD${dayNum}_${k}" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                    <span id="counterD${dayNum}_${k}" class="text-slate-400 font-bold">0 / 300</span>
                  </div>
                </div>

                <!-- 3. KOLOM UNTUK MENJAWAB SUMBER RUJUKAN (BISA LEBIH DARI 1 SUMBER) -->
                <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                      <span>Sumber Rujukan Materi (Buku / Modul / Website / Jurnal):</span>
                    </label>
                    ${!isSubmitted ? `
                      <button type="button" onclick="appendNextSourceForDay(${dayNum}, '${k}')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                        <span class="material-symbols-outlined text-xs">add_circle</span>
                        <span>+ Tambah Sumber Rujukan Lain</span>
                      </button>
                    ` : ''}
                  </div>
                  <textarea id="nftD${dayNum}Source${k}" rows="2" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, '${k}')" placeholder="${c.sourcePlaceholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${dataK.source || ''}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgSourceD${dayNum}_${k}" class="text-slate-400 font-medium">Cantumkan judul buku/modul/link yang Anda jadikan rujukan. Tekan tombol "+ Tambah Sumber Rujukan Lain" jika menggunakan lebih dari 1 sumber.</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}

          <!-- CARD KESIMPULAN AKHIR MODUL (WAJIB MINIMAL 100 KARAKTER SEBELUM LANJUT KE LKPD) -->
          <div id="cardBoxD${dayNum}_Conclusion" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                  <span class="material-symbols-outlined text-lg">psychology</span>
                </span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kesimpulan Akhir &amp; Sintesis Modul Day ${dayNum}</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Uraikan intisari pemahaman dan kesimpulan menyeluruh hasil riset mandiri Anda</span>
                </div>
              </div>
              <span id="badgeCardStatusD${dayNum}_Conclusion" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex flex-col gap-1.5 shadow-2xs">
              <span class="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-amber-700">info</span>
                <span>Panduan Pengisian Kesimpulan Modul:</span>
              </span>
              <p class="text-xs text-amber-950/90 leading-relaxed font-medium text-justify">
                Tuliskan rangkuman kesimpulan Anda sendiri: apa poin penting yang Anda pelajari dari kelima kartu STEM di atas, bagaimana keterkaitan sains, teknologi, rekayasa, dan matematika saling mendukung, serta bagaimana hasil riset ini dapat diterapkan untuk kemajuan sektor unggulan OKU Timur.
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Kesimpulan Menyeluruh Anda (Minimal 100 karakter):</label>
              <textarea id="nftD${dayNum}Conclusion" rows="4" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, 'Conclusion')" placeholder="Tuliskan kesimpulan akhir Anda mengenai pembelajaran Modul Day ${dayNum}... (Minimal 100 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${savedConclusion}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD${dayNum}_Conclusion" class="text-rose-600 font-semibold">Minimal 100 karakter</span>
                <span id="counterD${dayNum}_Conclusion" class="text-slate-400 font-bold">0 / 100</span>
              </div>
            </div>
          </div>

          <!-- TOMBOL SUBMIT RESMI MODUL -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20 backdrop-blur-md bg-white/95">
            <div class="flex flex-col text-center sm:text-left">
              <span id="lblSummaryProgressD${dayNum}" class="font-black text-xs sm:text-sm text-slate-900">0 dari ${(dayNum >= 3 && dayNum <= 6) ? '4' : '5'} Kartu Riset Memenuhi Syarat</span>
              <span class="text-[11px] text-slate-500 font-medium text-justify">Seluruh kartu wajib mencapai minimal ${(dayNum >= 3 && dayNum <= 6) ? '80' : '300'} karakter dan mencantumkan sumber rujukan.</span>
            </div>
            
            <div class="flex items-center gap-2.5 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              ${!isSubmitted ? `
                <button type="button" id="btnSaveDraftNftMateriD${dayNum}" onclick="saveNftDraftManualUnified(${dayNum})" class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95">
                  <span class="material-symbols-outlined text-base text-amber-600">bookmark</span>
                  <span>Simpan Draf</span>
                </button>
              ` : ''}

              <button type="button" id="btnSubmitNftMateriD${dayNum}" onclick="submitNftDayMateriUnified(${dayNum})" disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-300 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs">
                <span class="material-symbols-outlined text-base">lock</span>
                <span>Lengkapi ${(dayNum >= 3 && dayNum <= 6) ? '4' : '5'} Kartu Terlebih Dahulu</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    `;

    // Evaluasi awal semua kartu
    setTimeout(() => {
      evaluateAllCardsForDay(dayNum, false);
    }, 50);
  }

  // 4. LOGIKA EVALUASI REAL-TIME KARTU A S.D. E
  window.onNftCardInputUnified = function(dayNum, cardKey) {
    evaluateCardForDay(dayNum, cardKey, true);
    evaluateAllCardsForDay(dayNum, true);
  };

  // Aliases backward compatibility
  window.onNftCardInput = function(cardKey) { window.onNftCardInputUnified(1, cardKey); };
  window.onNftD2CardInput = function(cardKey) { window.onNftCardInputUnified(2, cardKey); };

  function evaluateCardForDay(dayNum, key, autoSave) {
    dayNum = parseInt(dayNum) || 1;
    const isSubmitted = !!window[`isNftD${dayNum}Submitted`];

    if (key === 'Conclusion') {
      const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
      const boxEl = document.getElementById(`cardBoxD${dayNum}_Conclusion`);
      const badgeEl = document.getElementById(`badgeCardStatusD${dayNum}_Conclusion`);
      const countEl = document.getElementById(`counterD${dayNum}_Conclusion`);
      const msgValEl = document.getElementById(`msgValidationD${dayNum}_Conclusion`);
      if (!concEl) return true;

      const val = concEl.value.trim();
      const len = val.length;
      const minConc = (dayNum >= 3 && dayNum <= 6) ? 50 : 100;
      if (countEl) countEl.textContent = `${len} / ${minConc}`;

      if (isSubmitted || len >= minConc) {
        if (boxEl) {
          boxEl.classList.remove('border-slate-200', 'border-rose-400');
          boxEl.classList.add('border-emerald-500', 'bg-emerald-50/20');
        }
        if (badgeEl) {
          badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-800 shrink-0';
          badgeEl.textContent = '✓ Lengkap';
        }
        if (msgValEl) {
          msgValEl.className = 'text-emerald-700 font-bold';
          msgValEl.textContent = `✓ ${len} karakter (Memenuhi syarat minimal ${minConc} karakter).`;
        }
        if (autoSave) saveNftDraftThrottledUnified(dayNum);
        return true;
      } else {
        if (boxEl) {
          boxEl.classList.remove('border-emerald-500', 'bg-emerald-50/20');
          boxEl.classList.add('border-slate-200');
        }
        if (badgeEl) {
          badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
          badgeEl.textContent = 'Belum Lengkap';
        }
        if (msgValEl) {
          msgValEl.className = 'text-rose-600 font-semibold';
          msgValEl.textContent = len === 0 ? `Wajib diisi minimal ${minConc} karakter.` : `Kurang ${minConc - len} karakter lagi (Minimal ${minConc} karakter).`;
        }
        if (autoSave) saveNftDraftThrottledUnified(dayNum);
        return false;
      }
    }

    const textEl = document.getElementById(`nftD${dayNum}Text${key}`);
    const srcEl = document.getElementById(`nftD${dayNum}Source${key}`);
    const boxEl = document.getElementById(`cardBoxD${dayNum}_${key}`);
    const badgeEl = document.getElementById(`badgeCardStatusD${dayNum}_${key}`);
    const countEl = document.getElementById(`counterD${dayNum}_${key}`);
    const msgValEl = document.getElementById(`msgValidationD${dayNum}_${key}`);
    const msgSrcEl = document.getElementById(`msgSourceD${dayNum}_${key}`);

    if (!textEl || !srcEl) return false;

    const reqMinChars = (dayNum >= 3 && dayNum <= 6) ? 80 : 300;
    const reqMinSrc = (dayNum >= 3 && dayNum <= 6) ? 10 : 20;

    const valText = validateScientificContent(textEl.value, reqMinChars);
    const valSrc = validateSourceCitation(srcEl.value, reqMinSrc);

    const isCardComplete = isSubmitted ? true : (valText.valid && valSrc.valid);

    if (valText.valid || isSubmitted) {
      if (countEl) {
        countEl.textContent = `${Math.max(valText.count, reqMinChars)} / ${reqMinChars}`;
        countEl.className = 'text-emerald-700 font-bold';
      }
      if (msgValEl) {
        msgValEl.textContent = '✓ Analisis terverifikasi memenuhi syarat';
        msgValEl.className = 'text-emerald-700 font-semibold';
      }
    } else {
      if (countEl) {
        countEl.textContent = `${valText.count} / ${reqMinChars}`;
        countEl.className = 'text-slate-400 font-bold';
      }
      if (msgValEl) {
        msgValEl.textContent = valText.reason;
        msgValEl.className = 'text-rose-600 font-semibold';
      }
    }

    if (valSrc.valid || isSubmitted) {
      if (msgSrcEl) {
        msgSrcEl.textContent = isSubmitted ? '✓ Sumber rujukan valid' : valSrc.reason;
        msgSrcEl.className = 'text-[10.5px] text-emerald-700 font-semibold';
      }
    } else {
      if (msgSrcEl) {
        msgSrcEl.textContent = valSrc.reason;
        msgSrcEl.className = 'text-[10.5px] text-rose-600 font-semibold';
      }
    }

    if (isCardComplete) {
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-emerald-50/20 border-2 border-emerald-400 shadow-2xs flex flex-col gap-4 transition-all';
      if (badgeEl) {
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-800 shrink-0';
        badgeEl.textContent = '✓ Lengkap';
      }
    } else {
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all';
      if (badgeEl) {
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-slate-100 text-slate-500 shrink-0';
        badgeEl.textContent = 'Belum Lengkap';
      }
    }

    if (autoSave) saveNftDraftThrottledUnified(dayNum);
    return isCardComplete;
  }

  function evaluateAllCardsForDay(dayNum, autoSave) {
    dayNum = parseInt(dayNum) || 1;
    const isSubmitted = !!window[`isNftD${dayNum}Submitted`];
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    let curSec = 'pertanian';
    if (dayNum === 3) {
      curSec = localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    } else if (dayNum === 4) {
      curSec = localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    }

    const activeCards = ((dayNum === 3 || dayNum === 4) && cfg.sectors && cfg.sectors[curSec])
      ? cfg.sectors[curSec].cards
      : (cfg.cards || []);
    const keys = activeCards.length > 0 ? activeCards.map(c => c.key) : ['A', 'B', 'C', 'D'];
    const reqMinChars = (dayNum >= 3 && dayNum <= 6) ? 80 : 300;

    let completedCount = 0;
    keys.forEach(k => {
      if (evaluateCardForDay(dayNum, k, false)) completedCount++;
    });

    const hasConc = !!document.getElementById(`nftD${dayNum}Conclusion`);
    let isConclusionDone = true;
    if (hasConc) {
      isConclusionDone = evaluateCardForDay(dayNum, 'Conclusion', false);
    }
    const totalItems = hasConc ? (keys.length + 1) : keys.length;
    let totalCompleted = completedCount + (hasConc && isConclusionDone ? 1 : 0);

    if (isSubmitted) {
      completedCount = keys.length;
      totalCompleted = totalItems;
    }

    const pct = Math.round((totalCompleted / totalItems) * 100);

    const barEl = document.getElementById(`barNftD${dayNum}Progress`);
    const lblProg = document.getElementById(`lblNftD${dayNum}ProgressCount`);
    const lblSummary = document.getElementById(`lblSummaryProgressD${dayNum}`);
    const btnSubmit = document.getElementById(`btnSubmitNftMateriD${dayNum}`);

    if (barEl) barEl.style.width = pct + '%';
    if (lblProg) {
      lblProg.textContent = hasConc
        ? `${totalCompleted} / ${totalItems} Komponen Terpenuhi (${pct}%)`
        : `${completedCount} / ${keys.length} Kartu Terpenuhi (${pct}%)`;
    }
    if (lblSummary) {
      lblSummary.textContent = hasConc
        ? `${totalCompleted} dari ${totalItems} Komponen (${keys.length} Kartu + Kesimpulan) Terpenuhi (${pct}%)`
        : `${completedCount} dari ${keys.length} Kartu Riset Memenuhi Syarat (Minimal ${reqMinChars} Karakter, ${pct}%)`;
    }

    if (btnSubmit) {
      if (isSubmitted) {
        btnSubmit.disabled = false;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">verified</span>
          <span>Modul Day ${dayNum} Telah Dikirim Resmi</span>
        `;
      } else if (totalCompleted === totalItems) {
        btnSubmit.disabled = false;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all animate-pulse';
        btnSubmit.onclick = function() { submitNftDayMateriUnified(dayNum); };
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">send</span>
          <span>Kirim Resmi Modul Day ${dayNum}</span>
        `;
      } else {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">lock</span>
          <span>Lengkapi ${totalItems - totalCompleted} Komponen Lagi</span>
        `;
      }
    }
  }

  // 5. PENYIMPANAN DRAFT SEMENTARA (LOCALSTORAGE)
  function saveNftDraftThrottledUnified(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (window[`isNftD${dayNum}Submitted`]) return;
    clearTimeout(window[`_nftD${dayNum}DraftTimer`]);
    window[`_nftD${dayNum}DraftTimer`] = setTimeout(() => {
      saveNftDraftNowUnified(dayNum);
    }, 800);
  }

  window.saveNftDraftManualUnified = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    saveNftDraftNowUnified(dayNum);
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
      FincestemCore.ui.toast(`✓ Draf Modul Day ${dayNum} berhasil disimpan (pukul ${timeStr})!`, 'success');
    } else {
      alert(`Draf Modul Day ${dayNum} berhasil disimpan!`);
    }
    const btn = document.getElementById(`btnSaveDraftNftMateriD${dayNum}`);
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = `<span class="material-symbols-outlined text-base text-emerald-600">check_circle</span><span class="text-emerald-800">Tersimpan (${timeStr})</span>`;
      btn.classList.add('border-emerald-500', 'bg-emerald-50/50');
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = origHtml;
          btn.classList.remove('border-emerald-500', 'bg-emerald-50/50');
        }
      }, 2500);
    }
  };

  function saveNftDraftNowUnified(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (window[`isNftD${dayNum}Submitted`]) return;
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];

    let curSec = '';
    const selEl = document.getElementById(`materiDay${dayNum}SectorSelect`);
    if (selEl && selEl.value) {
      curSec = mapToMateriSectorKey(selEl.value);
    }
    if (!curSec) {
      if (dayNum === 3) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 4) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 5) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 6) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      }
    }
    if (!curSec) curSec = 'pertanian';

    try {
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, curSec);
      if (dayNum === 3) localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, curSec);
    } catch(e) {}

    const activeCards = ((dayNum >= 3 && dayNum <= 6) && cfg.sectors && cfg.sectors[curSec])
      ? cfg.sectors[curSec].cards
      : (cfg.cards || []);
    const keys = activeCards.length > 0 ? activeCards.map(c => c.key) : ['A', 'B', 'C', 'D'];

    const draft = {
      updatedAt: new Date().toISOString(),
      selectedSector: curSec
    };

    keys.forEach(k => {
      const textEl = document.getElementById(`nftD${dayNum}Text${k}`);
      const srcEl = document.getElementById(`nftD${dayNum}Source${k}`);
      draft['card' + k] = {
        text: textEl ? textEl.value : '',
        source: srcEl ? srcEl.value : ''
      };
    });

    const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
    if (concEl) draft.conclusion = concEl.value;

    localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify(draft));
  }

  // 6. SUBMISI RESMI KE SERVER (DAY 1 S.D. DAY 7)
  window.submitNftDayMateriUnified = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    let curSec = '';
    const selEl = document.getElementById(`materiDay${dayNum}SectorSelect`);
    if (selEl && selEl.value) {
      curSec = mapToMateriSectorKey(selEl.value);
    }
    if (!curSec) {
      if (dayNum === 3) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 4) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 5) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      } else if (dayNum === 6) {
        curSec = mapToMateriSectorKey(localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn));
      }
    }
    if (!curSec) curSec = 'pertanian';

    // Pastikan tersimpan ke localStorage sektor agar LKPD dan Asesmen langsung sinkron!
    try {
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, curSec);
      if (dayNum === 3) {
        localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, curSec);
        localStorage.removeItem('fincestem_pkg_nft_asesmen_v3_d3_' + cleanNisn);
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('fincestem_pkg_nft_asesmen_v3_d3_') && k.endsWith(cleanNisn)) {
            localStorage.removeItem(k);
          }
        });
      }
    } catch(e) {}

    const activeCardsForSubmit = ((dayNum >= 3 && dayNum <= 6) && cfg.sectors && cfg.sectors[curSec])
      ? cfg.sectors[curSec].cards
      : (cfg.cards || []);
    const keys = activeCardsForSubmit.length > 0 ? activeCardsForSubmit.map(c => c.key) : ['A', 'B', 'C', 'D'];
    const reqMinChars = (dayNum >= 3 && dayNum <= 6) ? 80 : 300;
    const invalidKeys = [];

    keys.forEach(k => {
      if (!evaluateCardForDay(dayNum, k, false)) invalidKeys.push(k);
    });

    const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
    const minConc = (dayNum >= 3 && dayNum <= 6) ? 50 : 100;
    const concVal = concEl ? concEl.value.trim() : '';
    if (concEl && concVal.length < minConc) {
      invalidKeys.push(`Kesimpulan (Min ${minConc} Karakter)`);
    }

    if (invalidKeys.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat (minimal ${reqMinChars} karakter & rujukan terisi)!`, 'error');
      } else {
        alert(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat!`);
      }
      return;
    }

    const officialPayload = {
      day: dayNum,
      selectedSector: curSec,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      userConclusion: concVal
    };

    activeCardsForSubmit.forEach(c => {
      const k = c.key;
      const textEl = document.getElementById(`nftD${dayNum}Text${k}`);
      const srcEl = document.getElementById(`nftD${dayNum}Source${k}`);
      officialPayload['card' + k] = {
        title: c.title,
        text: textEl ? textEl.value.trim() : '',
        source: srcEl ? srcEl.value.trim() : ''
      };
    });

    // Simpan ke localStorage
    localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(officialPayload));
    window[`isNftD${dayNum}Submitted`] = true;

    // Sinkronkan ke modul progress FincestemCore
    if (window.FincestemCore && FincestemCore.progress) {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'materi', officialPayload, function(res) {
        console.log(`[FINCESTEM] Submisi modul Day ${dayNum} berhasil disinkronkan ke server:`, res);
      });
    }

    // Tampilkan modal sukses
    showSuccessNftMateriModalUnified(dayNum);
  };
// Aliases backward compatibility
  window.submitNftDay1Materi = function() { window.submitNftDayMateriUnified(1); };
  window.submitNftDay2Materi = function() { window.submitNftDayMateriUnified(2); };

  function showSuccessNftMateriModalUnified(dayNum) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Riset Mandiri Day ${dayNum} Selesai
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day ${dayNum} Berhasil Dikirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
            Selamat! Seluruh 5 kartu kajian riset mandiri Day ${dayNum} Anda telah tervalidasi lengkap dan tercatat resmi di sistem pembinaan fasilitator. Tahap selanjutnya adalah <strong>LKPD Investigasi Lapangan Day ${dayNum}</strong>.
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=${dayNum}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut ke LKPD Day ${dayNum}</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // =========================================================================
      // 6B. MODUL ORIENTASI & SIMULASI KHUSUS DAY 0 (GLADI BERSIH ALUR FINCESTEM)
  // =========================================================================
  function renderDay0NonFieldTripModule(container) {
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Kokurikuler';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    let savedOfficial = null;
    try {
      const raw = localStorage.getItem('fincestem_materi_nft_day0_' + cleanNisn) ||
                  localStorage.getItem('fincestem_materi_day0_' + cleanNisn);
      if (raw) savedOfficial = JSON.parse(raw);
    } catch(e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.summary || savedOfficial.conclusion));
    const cardAData = (savedOfficial && savedOfficial.cardA) || { answer: '', sources: [''] };
    const cardBData = (savedOfficial && savedOfficial.cardB) || { answer: '', sources: [''] };
    const savedResume = (savedOfficial && (savedOfficial.summary || savedOfficial.conclusion || savedOfficial.text)) || '';

    const sourcesA = (Array.isArray(cardAData.sources) && cardAData.sources.length > 0) ? cardAData.sources : [''];
    const sourcesB = (Array.isArray(cardBData.sources) && cardBData.sources.length > 0) ? cardBData.sources : [''];

    container.innerHTML = `
      <div class="flex flex-col gap-4 max-w-3xl mx-auto w-full pb-16">
        <!-- BANNER HEADER DAY 0 -->
        <div class="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white shadow-xl border border-amber-500/50 flex flex-col gap-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-300 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">model_training</span>
              <span>Day 0 • Gladi Bersih</span>
            </span>
            <span class="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/15 text-amber-100 border border-white/20">
              Simulasi Alur &amp; Orientasi
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              Simulasi Alur &amp; Orientasi FINCESTEM 2026/2027
            </h1>
            <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium mt-1">
              Pahami 6 alur pengerjaan harian, jawab pertanyaan tema &amp; 4 pilar, serta tuliskan resume simulasi.
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="p-3 rounded-2xl bg-black/25 border border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-base">person</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-extrabold text-white truncate text-xs sm:text-sm">${studentName}</span>
                <span class="text-amber-200 text-[11px]">NISN: ${cleanNisn} • ${studentClass}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-amber-200 block uppercase font-bold tracking-wider">Guru Fasilitator</span>
              <span class="font-bold text-white text-xs">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- 1. ALUR PENGERJAAN HARIAN WEB KOKURIKULER (RINGKAS) -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">route</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">1. Alur Pengerjaan Harian Web Kokurikuler</h3>
              <p class="text-[11px] text-slate-500">Urutan berjenjang yang wajib diselesaikan setiap hari kegiatan:</p>
            </div>
          </div>

          <!-- Step Indicators Ringkas & Rapi -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">1</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Modul Belajar</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">2</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">LKPD Observasi</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">3</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Asesmen CBT</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">4</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Dokumentasi GPS</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">5</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Jurnal Refleksi</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center shadow-xs">6</span>
              <span class="text-amber-950 text-xs font-extrabold leading-tight">Penilaian Fasil</span>
            </div>
          </div>
        </div>

        <!-- 2. PERTANYAAN TEMA & DIMENSI (LANGSUNG PERTANYAAN, TANPA TEKS MATERI, TANPA TULISAN CARD) -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">quiz</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">2. Pertanyaan Tema &amp; Dimensi Profil Lulusan</h3>
              <p class="text-[11px] text-slate-500">Jawab pertanyaan berikut secara mandiri berdasarkan pemahaman Anda:</p>
            </div>
          </div>

          <!-- PERTANYAAN 1: TEMA KEGIATAN KOKURIKULER -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                1. Apa Tema Kegiatan kokurikuler tahun ajaran 2026-2027?
              </h4>
              <span class="text-[11px] text-slate-500 font-semibold">Wajib • Min. 20 Karakter</span>
            </div>

            <textarea id="nftD0CardAAnswer" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${cardAData.answer || ''}</textarea>
            <span id="nftD0CardACounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>

            <!-- SUMBER REFERENSI PERTANYAAN 1 (BISA LEBIH DARI 1) -->
            <div class="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-teal-700">bookmark</span>
                  <span>Sumber Referensi (Bisa memasukkan lebih dari 1 sumber):</span>
                </label>
                ${!isSubmitted ? `
                  <button type="button" onclick="addDay0SourceField('A')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center gap-1 border border-teal-200 cursor-pointer transition-all">
                    <span class="material-symbols-outlined text-xs">add</span>
                    <span>+ Tambah Sumber</span>
                  </button>
                ` : ''}
              </div>

              <div id="nftD0CardASourcesContainer" class="flex flex-col gap-2">
                ${sourcesA.map((s, idx) => `
                  <div class="flex items-center gap-2 source-item-a">
                    <input type="text" value="${escapeHtml(s)}" ${isSubmitted ? 'readonly' : ''} placeholder="" class="input-source-a flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
                    ${(!isSubmitted && sourcesA.length > 1) ? `
                      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
                        &times;
                      </button>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- PERTANYAAN 2: 4 DIMENSI PROFIL LULUSAN -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                2. Sebutkan 4 Dimensi Profil Lulusan Kegiatan kokurikuler tahun ajaran 2026-2027!
              </h4>
              <span class="text-[11px] text-slate-500 font-semibold">Wajib • Min. 20 Karakter</span>
            </div>

            <textarea id="nftD0CardBAnswer" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${cardBData.answer || ''}</textarea>
            <span id="nftD0CardBCounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>

            <!-- SUMBER REFERENSI PERTANYAAN 2 (BISA LEBIH DARI 1) -->
            <div class="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-teal-700">bookmark</span>
                  <span>Sumber Referensi (Bisa memasukkan lebih dari 1 sumber):</span>
                </label>
                ${!isSubmitted ? `
                  <button type="button" onclick="addDay0SourceField('B')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center gap-1 border border-teal-200 cursor-pointer transition-all">
                    <span class="material-symbols-outlined text-xs">add</span>
                    <span>+ Tambah Sumber</span>
                  </button>
                ` : ''}
              </div>

              <div id="nftD0CardBSourcesContainer" class="flex flex-col gap-2">
                ${sourcesB.map((s, idx) => `
                  <div class="flex items-center gap-2 source-item-b">
                    <input type="text" value="${escapeHtml(s)}" ${isSubmitted ? 'readonly' : ''} placeholder="" class="input-source-b flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
                    ${(!isSubmitted && sourcesB.length > 1) ? `
                      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
                        &times;
                      </button>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 3. RESUME SIMULASI DAY 0 -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">edit_note</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">3. Resume Simulasi Modul Day 0</h3>
              <p class="text-[11px] text-slate-500">Tuliskan rangkuman dan kesiapan sebelum lanjut ke LKPD:</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <textarea id="nftD0MateriSummary" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${savedResume}</textarea>
            <span id="nftD0MateriCounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>
          </div>

          <!-- TOMBOL LANJUT KE LKPD 0 (TAMPILAN RAPI & TIDAK BERTUMPUK) -->
          ${isSubmitted ? `
            <div class="mt-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
              <div class="flex items-center gap-2.5 text-emerald-950 font-bold text-xs sm:text-sm">
                <span class="material-symbols-outlined text-emerald-600 text-2xl shrink-0">check_circle</span>
                <span>Modul Simulasi Day 0 Selesai!</span>
              </div>
              <a href="lkpd.html?day=0" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0">
                <span>Lanjut ke LKPD Day 0</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          ` : `
            <div class="mt-3 flex flex-col gap-2">
              <button type="button" onclick="submitDay0NonFieldTripMateri()" id="btnSubmitD0Materi" class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
                <span>Simpan &amp; Lanjut ke LKPD Day 0</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    // Pasang listener real-time counter karakter jika belum submit
    if (!isSubmitted) {
      const attachCounter = (txtId, counterId, minLen) => {
        const txt = document.getElementById(txtId);
        const counter = document.getElementById(counterId);
        if (txt && counter) {
          txt.addEventListener('input', () => {
            const len = txt.value.trim().length;
            if (len < minLen) {
              counter.textContent = `Kurang ${minLen - len} karakter lagi (Minimal ${minLen} karakter).`;
              counter.className = 'text-[11px] text-rose-600 font-semibold';
            } else {
              counter.textContent = `✓ ${len} karakter (Memenuhi syarat).`;
              counter.className = 'text-[11px] text-emerald-600 font-bold';
            }
          });
        }
      };

      attachCounter('nftD0CardAAnswer', 'nftD0CardACounter', 20);
      attachCounter('nftD0CardBAnswer', 'nftD0CardBCounter', 20);
      attachCounter('nftD0MateriSummary', 'nftD0MateriCounter', 20);
    }
  }

  // Helper Dinamis Tambah/Hapus Sumber Referensi
  window.addDay0SourceField = function(cardType) {
    const containerId = cardType === 'A' ? 'nftD0CardASourcesContainer' : 'nftD0CardBSourcesContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    const row = document.createElement('div');
    row.className = `flex items-center gap-2 source-item-${cardType.toLowerCase()}`;
    row.innerHTML = `
      <input type="text" placeholder="" class="input-source-${cardType.toLowerCase()} flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white">
      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
        &times;
      </button>
    `;
    container.appendChild(row);
  };

  window.removeDay0SourceField = function(btn) {
    if (!btn) return;
    const row = btn.closest('.source-item-a, .source-item-b');
    if (row) row.remove();
  };

  window.submitDay0NonFieldTripMateri = function() {
    const cardAAns = ((document.getElementById('nftD0CardAAnswer') ? document.getElementById('nftD0CardAAnswer').value : '') || '').trim();
    const cardBAns = ((document.getElementById('nftD0CardBAnswer') ? document.getElementById('nftD0CardBAnswer').value : '') || '').trim();
    const resumeAns = ((document.getElementById('nftD0MateriSummary') ? document.getElementById('nftD0MateriSummary').value : '') || '').trim();

    // Validasi Pertanyaan 1 (min 20 karakter)
    if (cardAAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 1: Jawaban tema kokurikuler minimal 20 karakter!', 'warning');
      } else {
        alert('Pertanyaan 1: Jawaban tema kokurikuler minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0CardAAnswer'); if (_el1) _el1.focus();;
      return;
    }

    // Validasi Sumber Pertanyaan 1
    const sourcesA = [];
    document.querySelectorAll('.input-source-a').forEach(inp => {
      const v = (inp.value || '').trim();
      if (v) sourcesA.push(v);
    });
    if (sourcesA.length === 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 1: Masukkan minimal 1 sumber referensi!', 'warning');
      } else {
        alert('Pertanyaan 1: Masukkan minimal 1 sumber referensi!');
      }
      var _el2 = document.querySelector('.input-source-a'); if (_el2) _el2.focus();;
      return;
    }

    // Validasi Pertanyaan 2 (min 20 karakter)
    if (cardBAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 2: Jawaban 4 dimensi profil lulusan minimal 20 karakter!', 'warning');
      } else {
        alert('Pertanyaan 2: Jawaban 4 dimensi profil lulusan minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0CardBAnswer'); if (_el1) _el1.focus();;
      return;
    }

    // Validasi Sumber Pertanyaan 2
    const sourcesB = [];
    document.querySelectorAll('.input-source-b').forEach(inp => {
      const v = (inp.value || '').trim();
      if (v) sourcesB.push(v);
    });
    if (sourcesB.length === 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 2: Masukkan minimal 1 sumber referensi!', 'warning');
      } else {
        alert('Pertanyaan 2: Masukkan minimal 1 sumber referensi!');
      }
      var _el2 = document.querySelector('.input-source-b'); if (_el2) _el2.focus();;
      return;
    }

    // Validasi Resume Simulasi (min 20 karakter)
    if (resumeAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Resume Simulasi minimal 20 karakter!', 'warning');
      } else {
        alert('Resume Simulasi minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0MateriSummary'); if (_el1) _el1.focus();;
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const payload = {
      submitted: true,
      submitted_at: new Date().toISOString(),
      cardA: {
        title: 'Tema Kegiatan Kokurikuler TP 2026-2027',
        answer: cardAAns,
        sources: sourcesA
      },
      cardB: {
        title: '4 Dimensi Profil Lulusan Kegiatan',
        answer: cardBAns,
        sources: sourcesB
      },
      summary: resumeAns,
      conclusion: resumeAns
    };

    const idList = new Set([cleanNisn]);
    if (cleanNisn) {
      const unp = cleanNisn.replace(/^0+/, '');
      idList.add(unp);
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) idList.add(cleanNisn.padStart(10, '0'));
    }
    idList.forEach(id => {
      try {
        localStorage.setItem('fincestem_materi_nft_day0_' + id, JSON.stringify(payload));
        localStorage.setItem('fincestem_materi_day0_' + id, JSON.stringify(payload));
      } catch(e) {}
    });

    // Rekam progress tahap 1 tuntas
    if (window.FincestemCore && FincestemCore.progress && cleanNisn) {
      if (typeof FincestemCore.progress.submitTask === 'function') {
        FincestemCore.progress.submitTask(cleanNisn, 0, 'materi', payload, function() {
          if (window.FincestemCore && FincestemCore.ui) {
            FincestemCore.ui.toast('Simulasi Modul Day 0 Selesai! LKPD kini terbuka.', 'success');
          }
        });
      } else if (typeof FincestemCore.progress.saveTaskProgress === 'function') {
        FincestemCore.progress.saveTaskProgress(0, 'materi', payload);
      }
    }

    // Modal transisi rapi ke LKPD Day 0
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
            Tahap 1 Tuntas • Modul Day 0
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day 0 Berhasil Diselesaikan!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-center">
            Jawaban pertanyaan dan resume Anda telah tersimpan. Silakan lanjutkan ke <strong>LKPD Observasi Lapangan Day 0</strong>.
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=0" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut ke LKPD Day 0</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay0NonFieldTripModule(mainEl);
  };

    
  // =========================================================================
  // 6C. PANDUAN VIDEO OBSERVASI & ANALISIS FINCESTEM 7 SEKTOR (DAY 5 & DAY 6)
  // Durasi Video: 5 - 10 Menit | Tanpa Wawancara Narasumber | Upload YouTube
  // =========================================================================
  // =========================================================================
  // 6C. PANDUAN VIDEO EKSPLORASI & ANALISIS FINCESTEM 7 SEKTOR (DAY 5 & DAY 6)
  // Durasi Video: 5 - 10 Menit | Tanpa Wawancara Narasumber | Upload YouTube
  // =========================================================================
  const NFT_VIDEO_SECTORS_GUIDE = {
  "pertanian": {
    "key": "pertanian",
    "name": "Pertanian Padi Sawah & Tanaman Pangan",
    "shortName": "🌾 Pertanian Padi",
    "badge": "Padi Sawah, Irigasi & Alsintan",
    "icon": "agriculture",
    "objectExamples": "Lahan Sawah Padi Irigasi BK Belitang, Traktor Pembajak Rotari, Pompa Alkon, Mesin Semprot Elektrik, atau Combine Harvester",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Pertanian Padi",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara narasumber, menyorot langsung lokasi sawah atau alsintan, serta membedah pilar Sains (kondisi tanah aluvial, air irigasi BK, biologi padi & hama) dan pilar Teknologi (traktor rotari, sprayer elektrik, dan combine harvester).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Sektor Pilihan di OKU Timur",
          "desc": "Tampil di depan kamera HP di area persawahan atau lokasi alsintan. Sampaikan salam pembuka, sebutkan Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan profil objek pertanian padi yang Anda amati di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video tugas Day 5 Non-Field Trip ini, saya akan membedah secara mendalam bagaimana penerapan Sains dan Teknologi pada sektor Pertanian Padi Sawah yang berada di Kabupaten OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Pertanian Padi",
          "desc": "Sorot kondisi lapangan dan jelaskan secara mandiri prinsip ilmiahnya: karakteristik tanah aluvial sawah irigasi BK, peran penting air irigasi teknis Komering, kebutuhan hara N-P-K bagi fase vegetatif/generatif padi, fotosintesis, serta siklus hidup hama sawah (wereng/tikus).",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Pertanian padi di Belitang sangat bergantung pada tanah aluvial yang subur serta pasokan air melimpah dari saluran irigasi teknis Bendung Perjaya Komering (saluran BK). Dari segi biologi dan kimia hara, tanaman padi memerlukan nutrisi N-P-K yang seimbang untuk fase vegetatif dan pembentukan bulir, fotosintesis optimal, serta pengendalian hama seperti wereng dan sundep..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Pertanian Padi",
          "desc": "Arahkan kamera ke peralatan/mesin kerja pertanian: traktor rotary pembajak tanah, tangki semprot elektrik nozzle flat-fan, pompa alkon irigasi, atau combine harvester. Jelaskan fungsi alat, bahan bakar/baterai penggerak, mekanisasi kerja, dan perlengkapan keselamatan kerja (APD: sepatu boot, topi caping, masker).",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Di lapangan kita melihat pemanfaatan alat mesin modern (alsintan), seperti traktor roda rotari untuk olah tanah lumpur, tangki sprayer elektrik baterai litium untuk efisiensi semprot, dan mesin combine harvester yang memotong sekaligus merontokkan gabah. Petani juga wajib menerapkan APD seperti sepatu boot lumpur, caping lebar, dan masker..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan perbandingan efisiensi kerja mesin pertanian modern vs cara manual tradisional, rangkum pemahaman Sains dan Teknologi yang Anda peroleh, sampaikan pesan edukatif untuk generasi muda tani Belitang, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, penerapan teknologi alsintan modern yang dipadukan dengan pemahaman sains irigasi dan nutrisi terbukti mampu melipatgandakan produktivitas panen padi di lumbung pangan OKU Timur. Demikian video penjelasan Sains dan Teknologi Day 5 dari saya. Terima kasih dan sampai jumpa di Day 6!"
        }
      ],
      "stemPoints": {
        "science": "Sains tanah aluvial sawah, peran pasokan air irigasi saluran sekunder/tersier BK Komering, kebutuhan hara makro (N, P, K) untuk tanaman padi, proses fotosintesis, dan siklus biologi hama tanaman (wereng batang coklat, tikus, sundep).",
        "technology": "Teknologi alat alsintan: traktor roda 2/4 rotary pengolah tanah, sprayer elektrik bertenaga baterai lithium dengan nozzle flat fan, pompa alkon bensin, dan mesin pemanen combine harvester pemotong-perontok otomatis.",
        "engineering": "Rekayasa tata kelola saluran air irigasi sawah (sistem gravitasi parit cacing), pola tanam Jajar Legowo (2:1 atau 4:1) untuk sirkulasi udara & sinar matahari, serta desain kemiringan pisau potong perontok gabah.",
        "mathematics": "Kalkulasi luas lahan (hektar/rante), takaran dosis pupuk per hektar, estimasi kebutuhan bibit padi, perbandingan efisiensi waktu kerja traktor (jam/hektar) vs tenaga manual, serta estimasi tonase hasil panen gabah per petak sawah."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Usaha Tani Padi",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (trik praktis tata parit sawah, trap barrier system tikus) dan pilar Matematika Finansial (rincian modal BOP 1 Ha, HPP gabah, omzet, dan laba bersih per musim panen).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam, perkenalkan diri (Nama, NISN, Kelas, Fasilitator), dan sampaikan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala Teknis dan Perhitungan Finansial Usaha Pertanian Padi di Belitang.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita akan membedah pilar Rekayasa (Engineering) dalam mengatasi kendala di sawah dan kalkulasi Matematika Finansial usaha tani padi..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di sawah (serangan hama tikus/wereng, kelangkaan pupuk subsidi, gulma cepat tumbuh, atau saluran air tersumbat). Jelaskan rekayasa praktis yang diterapkan petani: perangkap Trap Barrier System (TBS), pemasangan pagar plastik parit, modifikasi pintu air bambu, atau pembuatan biourine/pestisida nabati.",
          "speechScript": "Pertama, mari kita tinjau pilar Rekayasa (Engineering). Kendala utama di sawah adalah serangan hama tikus dan wereng batang coklat. Petani melakukan rekayasa sistem tanam Jajar Legowo (2:1 atau 4:1) untuk memperbanyak sirkulasi udara dan cahaya, memasang pagar plastik Trap Barrier System (TBS) penangkap tikus di tepi parit, serta merekayasa pintu air parit cacing dengan pipa bambu/PVC sederhana..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian modal biaya operasional (BOP) per hektar/musim: sewa lahan/traktor, benih, pupuk, pestisida, upah tanam/semprot, dan bagi hasil panen (bawon 1:8). Hitung HPP per kg gabah, estimasi hasil panen (misal 6 ton GKP x Rp 6.500/kg = Omzet Rp 39 Juta), lalu kurangkan total BOP untuk membuktikan Laba Bersih petani.",
          "speechScript": "Kedua, mari kita bedah pilar Matematika Finansial. Untuk 1 hektar sawah, modal BOP berkisar Rp 9,4 Juta (olah lahan traktor Rp 1,5 Jt, benih unggul Rp 400 Rb, pupuk & obat Rp 3,5 Jt, upah tanam/semprot Rp 4 Jt). Saat panen raya diperoleh sekitar 6 ton GKP. Dengan harga gabah Rp 6.500/kg, omzet kotor mencapai Rp 39 Juta. Setelah dikurangi modal dan bagi hasil panen (bawon), petani memperoleh laba bersih sekitar Rp 24 Juta per musim tanam..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan ide kreatif inovasi FINCESTEM Anda: hilirisasi gabah menjadi beras kemasan 5 kg berlabel merek lokal OKU Timur, pengomposan limbah jerami dengan trichoderma agar hemat pupuk kimia, serta pencatatan kas tani digital. Sampaikan kesimpulan akhir dan tutup video dengan salam.",
          "speechScript": "Untuk inovasi masa depan, saya mengusulkan pengemasan beras mandiri berlabel kemasan 5 kg lokal Belitang dan pengomposan jerami sisa panen dengan trichoderma agar hemat pupuk kimia. Demikian analisis Day 6 dari saya. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian modal operasional prapanen per hektar (olah tanah traktor Rp 1,5 Jt, benih Rp 400 Rb, pupuk & obat Rp 3,5 Jt, upah tenaga kerja Rp 4 Jt), sistem bagi hasil combine/bawon panen, omzet penjualan Gabah Kering Panen (GKP), dan kalkulasi Laba Bersih bersih petani per musim tanam.",
        "constraints": "Kendala teknis di lapangan: serangan hama tikus dan wereng batang coklat, mahalnya pupuk non-subsidi saat musim tanam tiba, anjloknya harga gabah basah saat panen serempak, dan genangan air saat hujan lebat.",
        "innovation": "Gagasan inovasi FINCESTEM: hilirisasi gabah menjadi beras kemasan premium berlabel lokal Belitang, pengolahan jerami sisa panen menjadi kompos bio-organik pengganti pupuk kimia, serta pembukuan kas tani berbasis aplikasi mobile."
      }
    }
  },
  "perkebunan": {
    "key": "perkebunan",
    "name": "Perkebunan Karet, Sawit & Komoditas Rakyat",
    "shortName": "🌴 Perkebunan",
    "badge": "Karet, Kelapa Sawit & Komoditas",
    "icon": "forest",
    "objectExamples": "Kebun Karet Rakyat Desa, Perkebunan Kelapa Sawit, Lahan Singkong Gajah, atau Kebun Buah Lokal di OKU Timur",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Perkebunan",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara narasumber, menyorot langsung area kebun dan peralatan kerja, serta membedah pilar Sains (tekanan turgor lateks pagi hari, reaksi asam semut, fotosintesis kelapa sawit) dan pilar Teknologi (pisau sadap malaya, mangkok lateks, galah egrek, angkong lori sawit, dan APD).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Perkebunan di OKU Timur",
          "desc": "Tampil di depan kamera HP di lokasi kebun karet/sawit. Sampaikan salam pembuka, sebutkan Nama Lengkap, NISN, Kelas, Fasilitator, dan perkenalkan nama lokasi serta komoditas perkebunan yang Anda amati di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan menerangkan secara mandiri penerapan pilar Sains dan Teknologi pada sektor Perkebunan Rakyat di OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Perkebunan",
          "desc": "Sorot pohon karet/kelapa sawit dan jelaskan prinsip ilmiahnya: fisiologi pembuluh lateks dan pengaruh tekanan turgor sel di pagi hari, reaksi koagulasi kimia lateks menggunakan asam format (asam semut), biologi kematangan tandan buah segar (TBS) sawit, dan peran unsur hara Kalium & Magnesium.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Objek perkebunan karet sangat dipengaruhi oleh fisiologi tanaman dan tekanan turgor sel lateks di pagi hari (pukul 05.00–07.00) yang membuat getah mengalir paling deras. Dari sisi kimia, pembekuan getah lateks menggunakan asam format (asam semut) agar koagulasi cepat dan mutu karet bersih. Pada tanaman sawit, fotosintesis kanopi daun dan nutrisi kalium sangat menentukan bobot tandan buah segar (TBS)..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Perkebunan",
          "desc": "Arahkan kamera ke peralatan kerja perkebunan: pisau sadap malaya, mangkok penampung lateks, galah egrek/dodos panen sawit dari pipa aluminium ringan, gerobak sorong angkong, serta APD wajib (sepatu boot pelindung gigitan ular/duri, sarung tangan karet, dan kacamata pelindung).",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Peralatan kerja perkebunan meliputi pisau sadap malaya berpucuk lengkung presisi, cincin talang seng dan mangkok lateks anti-pecah, galah egrek/dodos teleskopik aluminium ringan pemotong pelepah sawit tinggi, serta gerobak sorong angkong bertulang baja. Pekebun juga memakai APD sepatu boot pelindung gigitan ular dan duri..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana ketajaman alat sadap/panen dan teknik penyadapan yang tepat dapat menjaga usia produktif pohon perkebunan, rangkum pilar Sains dan Teknologi yang Anda pelajari, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, penguasaan sains waktu sadap dan penggunaan alat panen yang tepat terbukti menjaga usia produktif pohon perkebunan hingga 25 tahun ke depan. Demikian video penjelasan Sains dan Teknologi Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Tekanan turgor sel lateks pohon karet di pagi hari yang memicu aliran getah maksimal, reaksi kimia pembekuan lateks menggunakan asam format/cuka getah, fisiologi pematangan karotenoid pada buah kelapa sawit, dan fotosintesis kanopi daun kelapa sawit.",
        "technology": "Peralatan perkebunan: pisau sadap malaya sudut presisi, cincin talang seng dan mangkok lateks plastik anti-pecah, galah egrek teleskopik serat karbon/aluminium ringan untuk memanen TBS sawit pohon tinggi, serta gerobak sorong angkong bertulang baja.",
        "engineering": "Rekayasa sudut kemiringan irisan sadap karet (30–40 derajat) agar getah mengalir lancar ke mangkok tanpa merusak kambium pohon, rekayasa talang pelindung air hujan pada batang pohon karet, serta pembuatan jalur rorak terasering kebun sawit.",
        "mathematics": "Hitungan matematis perkebunan: kerapatan populasi pohon per hektar (karet 450-500 pohon/Ha, sawit 136-143 pohon/Ha), volume tetesan lateks per pohon per hari, estimasi tonase panen TBS sawit per rotasi 14 hari, dan perhitungan kadar karet kering (KKK)."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Usaha Perkebunan",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (talang sadap antiair hujan, jalan rorak kebun) dan pilar Matematika Finansial (biaya pupuk, upah bagi hasil penyadap 60:40 atau 50:50, harga timbang karet/TBS, dan laba bersih bulanan).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala dan Perhitungan Finansial Usaha Perkebunan Rakyat di OKU Timur.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial usaha perkebunan rakyat..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di kebun (hujan pagi yang mengencerkan getah karet, pohon sawit terlalu tinggi, jalan produksi berlumpur saat musim hujan, atau serangan jamur bidang sadap). Jelaskan rekayasa praktis warga: pemasangan talang plastik payung sadap antiair hujan, pembuatan parit rorak penahan erosi, dan pemanfaatan pelepah sawit untuk mulsa tanah.",
          "speechScript": "Pertama, dari pilar Rekayasa (Engineering). Kendala utama kebun karet adalah guyuran air hujan di pagi hari yang mengencerkan dan menghanyutkan mangkok getah. Pekebun merekayasa pemasangan payung plastik (rain-guard) di atas bidang sadap dengan perekat karet bekas, serta membuat rorak parit terasering di lereng kebun sawit untuk menahan erosi tanah..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian angka ekonomi perkebunan: biaya modal pupuk majemuk NPK, herbisida pembersih piringan pohon, sistem bagi hasil penyadap karet (60% pemilik : 40% penyadap atau 50:50), harga timbangan bokar/TBS di tingkat pengepul desa, total omzet bulanan, dan laba bersih pemilik kebun.",
          "speechScript": "Kedua, dari pilar Matematika Finansial. Biaya modal perawatan kebun meliputi pupuk NPK per semester dan herbisida gulma. Dengan sistem bagi hasil sadap (60% pemilik : 40% penyadap), kebun karet menghasilkan rata-rata 300–400 kg bokar per bulan. Pada harga timbang Rp 12.000/kg, omzet kotor mencapai Rp 4,2 Juta/bulan, memberikan laba bersih pasif yang stabil bagi pemilik kebun..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan ide kreatif inovasi FINCESTEM Anda: peningkatan kadar karet kering (KKK) dengan koagulan ramah lingkungan tanpa merusak mutu karet, pengolahan pelepah sawit menjadi pakan silase ternak sapi, dan pembukuan keuangan kebun. Simpulkan prospek komoditas ini dan tutup video dengan salam.",
          "speechScript": "Gagasan inovasi yang saya usulkan adalah pembuatan kelompok pemasaran bersama (KPB) agar harga jual bokar petani tidak dipermainkan tengkulak, serta pemanfaatan pelepah sawit menjadi silase pakan sapi. Terima kasih dan salam sukses!"
        }
      ],
      "finPoints": {
        "financial": "Rincian biaya operasional kebun (pupuk NPK per semester, herbisida pembersih piringan gulma, cuka getah/asam semut), sistem bagi hasil penyadap karet (60:40 atau 50:50), harga jual timbang getah karet/TBS sawit di pabrik atau toke lokal, omzet kotor, dan laba bersih bulanan pemilik kebun.",
        "constraints": "Kendala riil lapangan: curah hujan tinggi yang menyebabkan getah karet hanyut (gagal sadap), jamur bidang sadap (mouldy rot), penurunan drastis harga komoditas karet alam global, serta jalan poros kebun yang rusak/berlumpur parah saat musim hujan.",
        "innovation": "Gagasan inovasi FINCESTEM: pemasangan rain-guard (payung pelindung sadap) ekonomis dari plastik bekas, integrasi kebun sawit dengan peternakan sapi (sistem SISKA) untuk menekan biaya herbisida rumput, dan pembentukan kelompok pemasaran bersama (KPB) agar harga jual karet tidak ditekan toke."
      }
    }
  },
  "peternakan": {
    "key": "peternakan",
    "name": "Peternakan Sapi, Kambing & Unggas",
    "shortName": "🐄 Peternakan",
    "badge": "Sapi, Kambing, Ayam Broiler & Telur",
    "icon": "pets",
    "objectExamples": "Kandang Sapi Potong Rakyat, Peternakan Kambing Boer/Etawa, Kandang Ayam Broiler Semi-Closed House, atau Koloni Puyuh di OKU Timur",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Peternakan",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, menyorot langsung fasilitas kandang dan peralatan ternak, serta membedah pilar Sains (fisiologi pencernaan ruminansia/unggas, nutrisi protein pakan konsentrat, biologi pencegahan penyakit) dan pilar Teknologi (mesin chopper pencacah rumput, nipple drinker otomatis, lampu penghangat brooding, dan APD sepatu boot).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Peternakan di OKU Timur",
          "desc": "Tampil di depan kamera HP di area kandang ternak. Sampaikan salam pembuka, sebutkan Nama Lengkap, NISN, Kelas, Fasilitator, dan perkenalkan nama tempat usaha peternakan serta jenis ternak (sapi potong/kambing/ayam broiler) yang Anda amati di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan membedah secara mandiri penerapan pilar Sains dan Teknologi pada sektor Peternakan di OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Peternakan",
          "desc": "Sorot hewan ternak dan pakan, lalu jelaskan prinsip ilmiahnya: fisiologi lambung ruminansia (rumen, retikulum, omasum, abomasum) atau saluran cerna unggas, kebutuhan protein kasar pakan (rumput odot, bekatul, konsentrat), biologi vaksinasi/kebersihan kandang, serta sanitasi kotoran ternak.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Ternak ruminansia (sapi/kambing) memiliki sistem pencernaan unik 4 lambung dengan fermentasi mikroba rumen yang mampu mengolah serat rumput odot menjadi daging. Kebutuhan nutrisi protein pakan konsentrat (14–16%), kalsium, dan vitamin sangat vital untuk pertambahan bobot harian (ADG), serta sanitasi kandang untuk memutus siklus bakteri penyakit..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Peternakan",
          "desc": "Arahkan kamera ke peralatan kandang: mesin chopper pencacah rumput hijauan bermotor bensin/listrik, tempat minum otomatis (nipple drinker), blower kipas ventilasi kandang ayam, lampu pemanas gasolec/brooding, serta APD peternak (sepatu boot karet, masker pernapasan, sarung tangan).",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Di kandang kita melihat mesin chopper pencacah rumput bermotor bensin yang mencacah rumput menjadi ukuran 2-3 cm agar mudah dicerna, instalasi nipple drinker saluran pipa PVC otomatis yang menjaga air minum selalu higienis, lampu pemanas gasolec untuk anak ayam, timbangan gantung digital, dan APD sepatu boot peternak..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana mekanisasi pencacah pakan dan sistem minum otomatis mampu mempercepat pertumbuhan bobot harian ternak (ADG) dan menekan angka kematian ternak, simpulkan temuan Sains-Teknologi Anda, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, penerapan teknologi mekanisasi pakan dan pemahaman sains nutrisi ternak terbukti memangkas waktu kerja peternak serta meningkatkan pertambahan bobot harian sapi secara terukur. Demikian video Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Fisiologi pencernaan hewan ternak ruminansia (fermentasi mikroba rumen sapi/kambing) atau unggas, formula kandungan nutrisi pakan (protein kasar, serat kasar, energi metabolisme), siklus penyebaran parasit/penyakit ternak, dan biokimia pengomposan kotoran ternak.",
        "technology": "Teknologi peralatan kandang: mesin chopper pencacah rumput hijauan bertenaga bensin/diesel, instalasi nipple drinker saluran pipa PVC otomatis, blower kipas exhaust fan kandang closed house, lampu penghangat gasolec anak ayam (DOC), dan timbangan gantung digital.",
        "engineering": "Rekayasa konstruksi kandang panggung dengan kemiringan lantai pembuangan feses/urin 5–10 derajat, rekayasa sirkulasi udara ventilasi atap monitor (double roof), serta rancang bangun drum fermentasi pakan silase kedap udara (anaerob).",
        "mathematics": "Hitungan matematis peternakan: Feed Conversion Ratio (FCR), rata-rata pertambahan bobot badan harian (Average Daily Gain / ADG per kg/hari), takaran persentase pakan hijauan 10% dari bobot tubuh sapi, dan persentase tingkat kematian ternak (mortalitas)."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Usaha Peternakan",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (rekayasa panggung ventilasi kandang, instalasi pipa biogas kotoran) dan pilar Matematika Finansial (modal bibit/DOC, biaya pakan FCR harian, harga jual timbang hidup, dan proyeksi laba panen).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini membedah Analisis Rekayasa Solusi Kendala dan Perhitungan Finansial Usaha Peternakan di OKU Timur.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial usaha peternakan..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di kandang (bau amonia menyengat yang mengganggu tetangga, lonjakan harga pakan pabrikan, ketersediaan rumput menipis saat musim kemarau, atau serangan lalat kandang). Jelaskan rekayasa solusinya: teknologi silase fermentasi jerami/rumput odot dengan EM4/tetes tebu, pembuatan instalasi biodigester biogas dari kotoran ternak, dan lantai panggung celah kayu/bambu.",
          "speechScript": "Pertama, pilar Rekayasa (Engineering). Kendala peternakan adalah bau kotoran amonia yang menyengat dan sulitnya rumput segar saat musim kemarau. Peternak merekayasa kandang panggung berventilasi atap monitor (double roof), membuat bank pakan silase fermentasi drum plastik kedap udara (anaerob), serta merekayasa instalasi biodigester pipa PVC untuk mengubah kotoran menjadi gas masak gratis..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian modal dan pengeluaran: modal beli bibit bakalan/DOC, biaya pakan harian konsentrat & bekatul, obat/vaksin, biaya listrik/air kandang. Hitung HPP per kg bobot hidup, total pendapatan dari penjualan hewan hidup atau telur, lalu buktikan kalkulasi Laba Bersih yang diperoleh peternak.",
          "speechScript": "Kedua, pilar Matematika Finansial. Untuk penggemukan sapi bakalan (bobot 300 kg) selama 4 bulan: modal beli bakalan Rp 14 Juta, biaya pakan konsentrat & vitamin Rp 2,5 Juta. Saat panen bobot mencapai 400 kg dengan harga timbang hidup Rp 52.000/kg (Omzet Rp 20,8 Juta). Setelah dikurangi total biaya operasional Rp 16,5 Juta, diperoleh Laba Bersih sekitar Rp 4,3 Juta per ekor sapi..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan gagasan inovasi FINCESTEM Anda: pengolahan limbah kotoran sapi/unggas menjadi pupuk organik padat (kohe) berlabel kemasan 20 kg bernilai jual tinggi, budidaya maggot BSF untuk subtitusi pakan berprotein gratis, serta pembukuan usaha digital. Simpulkan kelayakan bisnis ini dan tutup video dengan salam.",
          "speechScript": "Inovasi yang saya rancang adalah pengemasan pupuk organik padat (kohe terfermentasi) dalam karung 20 kg berlabel komersial bernilai Rp 15.000/karung, sehingga limbah kandang berubah menjadi sumber pendapatan baru. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian biaya modal (pembelian bibit bakalan sapi/DOC ayam, biaya pakan konsentrat & bekatul harian, vaksinasi dan vitamin), penerimaan penjualan timbang bobot hidup per kg atau per ekor saat Idul Adha/panen raya, omzet kotor, serta estimasi Laba Bersih peternak.",
        "constraints": "Kendala riil peternakan: tingginya harga pakan pabrikan (konsentrat/jagung), kesulitan mencari rumput hijauan di musim kemarau, risiko wabah penyakit menular (PMK, LSD, ND), keluhan warga sekitar terkait bau kotoran kandang, dan fluktuasi harga jual daging ayam hidup di tingkat broker.",
        "innovation": "Gagasan inovasi FINCESTEM: pengolahan limbah kotoran kandang menjadi pupuk organik granul berlabel komersial, integrasi peternakan dengan bank pakan silase drum plastik, serta pemanfaatan maggot black soldier fly (BSF) sebagai sumber protein gratis hemat biaya pakan."
      }
    }
  },
  "perikanan": {
    "key": "perikanan",
    "name": "Budidaya Perikanan Air Tawar",
    "shortName": "🐟 Perikanan",
    "badge": "Kolam Patin, Lele, Nila & Gurami",
    "icon": "phishing",
    "objectExamples": "Kolam Tanah Ikan Patin Minapolitan Belitang, Kolam Terpal Bioflok Lele, atau Kolam Air Mengalir Ikan Nila",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Budidaya Perikanan",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara narasumber, menyorot langsung kolam ikan dan peralatan budidaya, serta membedah pilar Sains (kualitas parameter air DO/pH/suhu, siklus amonia, biologi pakan pelet protein 28-32%) dan pilar Teknologi (pompa aerator/kincir air kincir kincir, genset cadangan listrik, automatic feeder, dan jaring sortir).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Usaha Perikanan di OKU Timur",
          "desc": "Tampil di depan kamera HP di tepi kolam budidaya ikan. Sampaikan salam pembuka, sebutkan Nama Lengkap, NISN, Kelas, Fasilitator, dan perkenalkan nama lokasi serta jenis ikan yang dibudidayakan (ikan patin/lele/nila) di kawasan sentra Belitang OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan membedah secara mandiri penerapan pilar Sains dan Teknologi pada sektor Budidaya Perikanan Air Tawar di Belitang OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Perikanan",
          "desc": "Sorot kondisi air kolam dan ikan, lalu jelaskan prinsip ilmiahnya: parameter kualitas air kolam (kadar oksigen terlarut/DO, pH air netral 6,5–8, suhu 28–30°C), siklus perubahan amonia beracun menjadi nitrat oleh bakteri pengurai, serta kebutuhan protein pakan pelet ikan terapung.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Budidaya ikan patin dan lele sangat bergantung pada parameter air: kadar oksigen terlarut (DO minimal 4 ppm), suhu 28-30 derajat Celsius, dan pH netral 6,5–7,5. Di dasar kolam terjadi siklus nitrogen di mana amonia kotoran ikan diubah oleh bakteri nitrifikasi, serta kebutuhan nutrisi pelet apung berprotein 28–32% untuk laju pertumbuhan optimal..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Perikanan",
          "desc": "Arahkan kamera ke peralatan teknologi budidaya: kincir air aerator pemutar oksigen, pompa celup sirkulasi air, blower aerasi sistem bioflok, genset cadangan saat pemadaman PLN, alat pemberi pakan otomatis (auto feeder), serta jaring sortir bertingkat (grading basket).",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Di kolam terdapat mesin kincir air aerator pemutar oksigen bertenaga motor listrik, blower aerasi uniring kolam bioflok, genset darurat cadangan mati lampu, alat automatic feeder pemberi pakan otomatis berbasis timer, serta bak sortir bertingkat (grading basket) aluminium anti-karat..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana pemakaian kincir aerator dan teknologi sortir ikan mampu menekan kanibalisme dan mempercepat siklus panen hingga 3-4 bulan, rangkum temuan Sains-Teknologi Anda, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, penerapan teknologi kincir dan pengelolaan sains kualitas air mampu menekan angka kanibalisme dan kematian benih ikan hingga kelangsungan hidup mencapai 90%. Demikian penjelasan Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Parameter kualitas air budidaya (oksigen terlarut DO, keasaman pH, suhu, kecerahan warna air), biokimia siklus nitrogen di dasar kolam (amonia kotoran ikan yang diurai oleh bakteri nitrifikasi Nitrosomonas & Nitrobacter), serta biologi nutrisi asam amino pakan pelet.",
        "technology": "Peralatan teknologi kolam: kincir air aerator bertenaga dinamo listrik, pompa celup submersible, blower aerator selang uniring pada kolam bundar terpal bioflok, sensor digital pH/TDS meter, serta bak/keranjang sortir ikan (grader) berbahan aluminium anti-karat.",
        "engineering": "Rekayasa konstruksi saluran pemasukan dan pengeluaran air (monik/sistem goyang), rekayasa dasar kolam miring menuju central drain pembuangan lumpur amonia (teknologi bottom drain), serta desain kolam bundar terpal rangka besi wiremesh.",
        "mathematics": "Hitungan matematis perikanan: padat tebar bibit per meter kubik air (ekor/m³), rasio konversi pakan (FCR target 1.1–1.3), persentase tingkat kelangsungan hidup ikan (Survival Rate / SR minimal 85%), dan estimasi tonase panen ikan per petak kolam."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Budidaya Perikanan",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (sistem drainase sifon dasar kolam, filter sirkulasi air terpal) dan pilar Matematika Finansial (biaya benih/benur, porsi pakan FCR 1.2, harga jual timbang basah per kg, omzet panen, dan laba bersih pembudidaya).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam pembuka, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala dan Perhitungan Finansial Usaha Budidaya Ikan di Belitang.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial budidaya perikanan air tawar..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di kolam ikan (penumpukan endapan kotoran amonia di dasar kolam, pemadaman listrik PLN yang mematikan aerator, atau penyakit jamur/bakteri aeromonas saat cuaca mendung). Jelaskan rekayasa solusinya: pipa pembuangan sifon gravitasi tanpa menguras seluruh air, garam krosok dan daun ketapang sebagai antiseptik alami, serta sistem back-up aki/genset otomatis.",
          "speechScript": "Pertama, pilar Rekayasa (Engineering). Kendala utama kolam ikan adalah penumpukan racun amonia di dasar kolam dan ancaman mati lampu di malam hari. Pembudidaya merekayasa saluran drainase sifon tengah kolam (bottom central drain) yang membuang endapan kotoran dasar tanpa perlu menguras kolam, serta sistem alarm baterai otomatis saat pemadaman listrik..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian modal usaha: pembelian benih ikan per ekor, biaya pakan pelet pabrikan (yang menyerap 70-80% dari total modal usaha), biaya listrik pompa, dan probiotik air. Hitung HPP ikan per kg, kalikan dengan harga jual timbang basah di pedagang pengepul pasar, kurangkan total modal, lalu paparkan Laba Bersih yang diperoleh pembudidaya.",
          "speechScript": "Kedua, pilar Matematika Finansial. Untuk 1 kolam patin kapasitas 5.000 ekor: bibit Rp 1 Jt, pakan pelet target FCR 1.2 sebanyak 3 ton (Rp 30 Jt), listrik & probiotik Rp 1,5 Jt (Total BOP Rp 32,5 Jt). Saat panen umur 6 bulan dihasilkan 2,5 ton patin x harga Rp 18.000/kg (Omzet Rp 45 Juta). Diperoleh Laba Bersih sekitar Rp 12,5 Juta per kolam..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan ide kreatif inovasi FINCESTEM Anda: hilirisasi ikan segar menjadi produk olahan bernilai tinggi seperti fillet ikan patin beku, abon ikan nila gurih, atau kerupuk kemplang ikan khas OKU Timur, serta sistem pemasaran langsung ke konsumen lewat media sosial. Simpulkan prospek usaha dan tutup video dengan salam.",
          "speechScript": "Gagasan inovasi yang saya ajukan adalah hilirisasi daging patin menjadi produk frozen food fillet ikan kemasan vakum berlabel lokal Belitang serta budidaya maggot BSF untuk memangkas biaya pelet hingga 30%. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian biaya operasional budidaya per siklus (beli benih ikan unggul ukuran 5-7 cm, biaya pakan pelet terapung yang menyerap 70–80% dari total biaya modal, tagihan listrik aerator, vitamin & probiotik), omzet panen ikan timbang basah per kg, serta kalkulasi Laba Bersih pembudidaya.",
        "constraints": "Kendala teknis budidaya: lonjakan harga pakan pabrikan yang terus naik, ancaman kematian massal ikan akibat penurunan kadar oksigen mendadak saat mati lampu malam hari, penyakit jamur sirip putih/bakteri aeromonas di musim hujan, dan harga jual ikan segar yang fluktuatif di pasar lokal.",
        "innovation": "Gagasan inovasi FINCESTEM: substitusi pakan menggunakan maggot BSF atau azolla segar berprotein tinggi untuk memangkas biaya pelet hingga 30%, instalasi otomatisasi alarm peringatan dini kadar oksigen, serta hilirisasi daging patin menjadi produk frozen food fillet kemasan vakum berlabel lokal Belitang."
      }
    }
  },
  "industri": {
    "key": "industri",
    "name": "Industri Pengolahan, RMU & Pengrajin Lokal",
    "shortName": "⚙️ Industri & Pengolahan",
    "badge": "Kilang Padi, Pabrik Tahu, Kerupuk & Bengkel",
    "icon": "factory",
    "objectExamples": "Kilang Penggilingan Padi (RMU), Pabrik Tahu & Tempe Rumahan, Industri Kerupuk Pasir/Kemplang, atau Bengkel Bubut/Mekanik Mesin di Belitang",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Industri & Pengolahan",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, menyorot langsung lantai produksi atau mesin kerja industri, serta membedah pilar Sains (reaksi fisika pemisahan massa jenis, fermentasi kedelai, sifat termal pembakaran) dan pilar Teknologi (mesin husker rol karet, polisher beras, boiler uap, mesin press hidrolik/gerinda bubut, dan standar APD).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Tempat Industri di OKU Timur",
          "desc": "Tampil di depan kamera HP di area kilang penggilingan padi (RMU), pabrik tahu/kerupuk, atau bengkel mekanik. Sampaikan salam pembuka, Nama Lengkap, NISN, Kelas, Fasilitator, serta perkenalkan profil objek usaha pengolahan yang Anda amati di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan membedah secara mandiri penerapan pilar Sains dan Teknologi pada sektor Industri Pengolahan di Belitang OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Industri",
          "desc": "Sorot bahan baku dan proses kerja, lalu jelaskan prinsip ilmiahnya: sains fisika gesekan dan perbedaan massa jenis dalam memisahkan sekam dari beras, proses biokimia fermentasi kedelai menjadi tempe/tahu, sifat termal uap panas boiler perebusan, atau sifat mekanik kekerasan logam pada bengkel mesin.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Di lantai produksi pabrik/kilang ini, berlangsung prinsip fisika pemisahan massa jenis (sekam ringan terlempar tiupan blower sedangkan bulir beras berat jatuh ke bawah), termodinamika suhu uap air pada boiler, serta proses biokimia fermentasi pada industri pangan tahu/tempe..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Industri",
          "desc": "Arahkan kamera ke mesin-mesin produksi: mesin pemecah kulit gabah (husker rol karet), mesin penyosoh beras (polisher/kebit), mesin ayakan pemisah menir (shifter), boiler uap bertekanan, kompresor udara, atau mesin las listrik inverter, serta APD wajib (masker debu sekam, kacamata pelindung, earplug peredam bising, dan sepatu keselamatan).",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Fasilitas ini mengoperasikan mesin husker rol karet pemecah kulit gabah, mesin polisher kebit pemutih beras kabut, mesin ayakan getar shifter penyeleksi beras kepala dan menir, mesin jahit karung listrik portabel, serta standar APD masker debu partikulat, earplug peredam bising, dan sepatu keselamatan kerja..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana otomatisasi mesin industri mampu mengubah bahan mentah menjadi produk bernilai jual tinggi dalam hitungan jam dengan rendemen maksimal, simpulkan temuan Sains-Teknologi Anda, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, otomatisasi mesin pengolahan terbukti mampu menghasilkan beras kualitas medium dan premium dengan rendemen tinggi 65-68% dalam waktu cepat. Demikian penjelasan Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Prinsip Fisika gesekan dan rotasi diferensial pada rol karet mesin husker untuk mengupas kulit gabah tanpa menghancurkan bulir beras, aerodinamika pemisahan sekam tiupan blower berdasarkan perbedaan massa jenis, termodinamika suhu uap air boiler, atau ilmu metalurgi logam pada bengkel mekanik.",
        "technology": "Teknologi permesinan pengolahan: mesin husker rol karet ganda, mesin polisher penyosoh kabut beras putih mengkilap, elevator pembawa gabah vertikal, mesin jahit karung elektrik genggam portabel, serta inverter mesin las listrik hemat daya.",
        "engineering": "Rekayasa layout alur produksi kontinu (dari bak penampung gabah masuk, pembersihan batu, pengupasan, penyosohan hingga pengarungan), rekayasa cerobong pipa siklon pembuangan debu sekam, serta sistem transmisi sabuk puli (v-belt) dinamo listrik.",
        "mathematics": "Hitungan matematis industri: persentase rendemen giling gabah ke beras (target 65–68%), kalkulasi susut bobot bahan baku, kecepatan kapasitas giling mesin (ton gabah/jam), dan perhitungan kebutuhan energi listrik kVA atau liter solar per hari."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Sektor Industri & Pengolahan",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (modifikasi saluran cerobong sekam, tata letak jalur konveyor efisien) dan pilar Matematika Finansial (modal bahan baku harian, tagihan listrik/solar industri, biaya kemasan karung, omzet penjualan produk utama + sampingan, dan laba bersih pengusaha).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala Produksi dan Perhitungan Finansial Usaha Industri Pengolahan di Belitang.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial sektor industri pengolahan..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di tempat industri (tingginya persentase beras patah jika gabah masih basah saat musim hujan, polusi debu sekam yang beterbangan, keausan cepat rol karet penggiling, atau limbah air cair tahu). Jelaskan rekayasa solusinya: instalasi pengering flat-bed dryer suhu rendah, siklon filter debu air, dan bak penyaringan limbah cair sederhana sebelum dialirkan ke parit.",
          "speechScript": "Pertama, pilar Rekayasa (Engineering). Kendala pabrik adalah tingginya beras patah saat musim hujan akibat gabah masih basah dan polusi debu sekam. Pengelola merekayasa jalur cerobong pipa siklon pembuangan debu sekam ke bak penampungan air dan instalasi pengering flat-bed dryer suhu rendah agar bulir beras tidak retak..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian angka operasional industri: modal beli gabah mentah harian, biaya bahan bakar solar/listrik PLN, ongkos rol karet & perawatan mesin, upah buruh panggul/operator, dan biaya kemasan karung. Hitung total omzet dari penjualan beras kualitas medium/premium serta produk sampingan (dedak/bekatul & sekam), kurangkan seluruh biaya operasional, dan buktikan kalkulasi Laba Bersih yang didapat pengusaha.",
          "speechScript": "Kedua, pilar Matematika Finansial. Kapasitas olah 5 ton gabah harian: modal beli gabah Rp 32,5 Juta, biaya solar & listrik Rp 800 Rb, upah pekerja Rp 600 Rb, kemasan karung Rp 300 Rb (Total BOP Rp 34,2 Jt). Penjualan menghasilkan beras 3,3 ton x Rp 12.000/kg (Rp 39,6 Jt) ditambah dedak bekatul 500 kg x Rp 3.000/kg (Rp 1,5 Jt) = Total Omzet Rp 41,1 Juta. Diperoleh Laba Bersih harian sekitar Rp 6,9 Juta..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan ide kreatif inovasi FINCESTEM Anda: pengolahan limbah sekam padi menjadi briket arang biomassa ramah lingkungan, pengemasan beras kemasan vakum 2,5 kg untuk pasar modern, serta pembukuan stok digital. Simpulkan prospek sektor industri pengolahan lokal ini dan tutup video dengan salam.",
          "speechScript": "Ide inovasi yang saya tawarkan adalah pengolahan limbah sekam melimpah menjadi briket arang biomassa ramah lingkungan pengganti elpiji dan pengemasan beras vakum 2,5 kg untuk pasar ritel modern. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian biaya modal harian (pembelian bahan mentah gabah/kedelai/tepung, tagihan listrik mesin dan bahan bakar solar, upah operator harian, biaya karung dan plastik kemasan), pendapatan dari produk utama ditambah penjualan sampingan (dedak bekatul/ampas tahu), total omzet, dan kalkulasi Laba Bersih bulanan pengusaha.",
        "constraints": "Kendala operasional industri: tingginya persentase butir patah saat menggiling gabah berkadar air tinggi di musim hujan, kenaikan harga bahan baku impor (kedelai), tingginya biaya penggantian suku cadang mesin yang aus, dan tuntutan standar sanitasi lingkungan dari warga sekitar.",
        "innovation": "Gagasan inovasi FINCESTEM: pemanfaatan limbah sekam padi menjadi arang briket biomassa pengganti elpiji, pembuatan mesin pengering gabah terpadu (bed dryer) hemat biomassa, serta digitalisasi kemasan produk berlabel SNI untuk menembus jaringan ritel modern."
      }
    }
  },
  "perdagangan": {
    "key": "perdagangan",
    "name": "Perdagangan Sembako, Saprotan & Pasar",
    "shortName": "🏪 Perdagangan & Pasar",
    "badge": "Pasar Belitang, Toko Grosir & Saprotan",
    "icon": "storefront",
    "objectExamples": "Toko Grosir/Pengecer Sembako, Kios Saprotan Pertanian (Pupuk/Benih/Pestisida), Lapak Dagang Pasar Tradisional Gumawang/Belitang",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Perdagangan & Pasar",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara narasumber, menyorot display barang dagangan dan peralatan operasional toko, serta membedah pilar Sains (pengendalian kelembapan gudang sembako, masa kedaluwarsa, keamanan kimia saprotan) dan pilar Teknologi (timbangan digital presisi, sistem barcode scanner/POS kasir, display pendingin showcase, dan ventilasi gudang).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Toko/Lapak Pasar di OKU Timur",
          "desc": "Tampil di depan kamera HP di depan toko grosir, kios saprotan, atau lapak pasar tradisional. Sampaikan salam pembuka, Nama Lengkap, NISN, Kelas, Fasilitator, dan perkenalkan nama toko serta jenis komoditas perdagangan yang Anda amati di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan membedah secara mandiri penerapan pilar Sains dan Teknologi pada sektor Perdagangan & Pasar Tradisional di OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Perdagangan",
          "desc": "Sorot barang dagangan di rak dan gudang, lalu jelaskan prinsip ilmiahnya: sains pengawetan bahan pangan kering (kadar air maksimal beras/gula agar terhindar dari jamur aflatoksin), biologi pencegahan kutu beras, faktor suhu dan kelembapan ruang display, serta sifat kimia keamanan penyimpanan botol pestisida/pupuk agar tidak mencemari bahan makanan.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Di toko sembako dan saprotan, sains penyimpanan bahan pangan kering sangat vital: kadar air ruangan dijaga di bawah 14% agar beras dan tepung tidak berjamur aflatoksin, pencegahan siklus hidup kutu beras, serta pemisahan fisik produk kimia pestisida agar tidak mengkontaminasi bahan konsumsi pangan..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Perdagangan",
          "desc": "Arahkan kamera ke perangkat operasional toko: timbangan komputasi digital bertingkat dengan kalibrasi tera resmi, barcode scanner pembaca kode barang, mesin kasir Point of Sales (POS), kulkas showcase display pendingin minuman/telur, serta kamera CCTV pengawas keamanan toko.",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Toko telah memanfaatkan timbangan komputasi digital presisi bersensor load-cell berlayar ganda, barcode scanner pembaca kode barang, sistem kasir Android Point of Sales (POS) dengan mini printer thermal Bluetooth, display showcase berpendingin ramah lingkungan, serta kamera CCTV pemantau keamanan toko..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana barcode scanner dan timbangan digital mampu mempercepat transaksi antrean pembeli serta mencegah kesalahan perhitungan uang kasir, rangkum pemahaman Sains-Teknologi Anda, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, perpaduan sains penyimpanan stok barang dan teknologi kasir digital terbukti memangkas antrean belanja, mencegah kebocoran kas, dan menjaga kepuasan pelanggan pasar Belitang. Demikian penjelasan Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Ilmu sains ketahanan bahan pangan: pengaruh kelembapan udara (RH) terhadap pertumbuhan jamur pada beras dan tepung, pengawetan bahan makanan pada suhu dingin kulkas (inhibisi bakteri pembusuk), serta kimia sifat bahaya dan penyimpanan aman racun kimia pertanian (pestisida).",
        "technology": "Teknologi perlengkapan niaga: timbangan digital presisi bersensor load-cell dengan layar komputasi ganda pembeli-penjual, barcode scanner nirkabel Bluetooth, aplikasi kasir Android (POS) terhubung mini printer bluetooth, display showcase berrefrigeran ramah lingkungan, dan kamera CCTV Wi-Fi.",
        "engineering": "Rekayasa ergonomi penataan rak barang dagangan (sistem First In First Out / FIFO menggunakan rak gravitasi), rekayasa sirkulasi palet kayu beralas papan agar karung beras tidak bersentuhan langsung dengan lantai lembap, serta rancangan zonasi pemisahan barang kimia dan pangan.",
        "mathematics": "Kalkulasi matematis perdagangan: persentase margin keuntungan barang (5–15% untuk grosir sembako, 15–25% untuk eceran/saprotan), laju perputaran persediaan barang (Inventory Turnover Ratio), kalkulasi potongan harga kuantiti (diskon grosir), dan rekonsiliasi total transaksi kasir harian."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Perdagangan Sembako/Pasar",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (rekayasa rak zonasi produk cepat laku FIFO, proteksi hama gudang) dan pilar Matematika Finansial (modal kulakan grosir, margin keuntungan 5-15%, perputaran stok inventory harian, omzet kotor, dan laba bersih pedagang).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam pembuka, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala Toko dan Perhitungan Finansial Usaha Perdagangan di Belitang.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial usaha perdagangan sembako..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di toko/pasar (barang rusak/kedaluwarsa karena tertumpuk di belakang rak, kebocoran stok atau salah hitung barang, persaingan harga ketat, atau penumpukan utang kasbon pelanggan). Jelaskan rekayasa solusinya: penataan rak bertingkat sistem rotasi FIFO (First In First Out), pelabelan tanggal kadaluwarsa yang mencolok, dan penggunaan aplikasi pencatatan buku kas digital.",
          "speechScript": "Pertama, pilar Rekayasa (Engineering). Kendala toko adalah barang dagangan kedaluwarsa karena terselip di belakang dan risiko barang rusak karena lembap lantai. Pedagang merekayasa penataan rak sistem First In First Out (FIFO) dengan rak gravitasi miring dan pemasangan palet kayu beralas papan agar karung tidak bersentuhan langsung dengan lantai semen..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian modal dan alur uang pedagang: modal awal kulakan stok barang dari agen distributor, biaya operasional toko harian (sewa kios, listrik showcase, kantong kresek, kuota kasir, gaji karyawan). Hitung persentase margin laba per jenis barang, kalkulasikan rata-rata omzet penjualan harian/bulanan, kurangkan modal barang dan BOP, lalu tunjukkan Laba Bersih yang diperoleh pedagang.",
          "speechScript": "Kedua, pilar Matematika Finansial. Rata-rata modal kulakan harian Rp 15 Juta. Dengan margin keuntungan grosir 8% dan eceran 15%, total omzet harian mencapai Rp 17 Juta (Laba Kotor Rp 2 Juta/hari). Setelah dikurangi biaya operasional sewa ruko, listrik showcase, kantong plastik, dan gaji karyawan Rp 600 Rb/hari, diperoleh Laba Bersih sekitar Rp 1,4 Juta per hari..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan ide kreatif inovasi FINCESTEM Anda: adopsi pembayaran nontunai QRIS untuk menarik pelanggan muda tanpa repot uang kembalian, penyediaan layanan pesan-antar (delivery) sembako via WhatsApp di sekitar desa, serta kartu loyalitas pelanggan. Simpulkan kelayakan usaha perdagangan ini dan tutup video dengan salam.",
          "speechScript": "Inovasi yang saya gagas adalah integrasi sistem pembayaran nontunai QRIS dan layanan pesan-antar (delivery) sembako via grup WhatsApp warga sekitar desa untuk memperluas jangkauan pembeli. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian perputaran modal usaha dagang (modal kerja kulakan barang dagangan sembako/saprotan dari distributor, biaya sewa ruko/lapak pasar, tagihan listrik showcase & lampu toko, biaya plastik kemasan dan transportasi), penetapan margin laba tipis 5–10% untuk grosir vs 15–20% untuk eceran, rata-rata omzet harian, dan kalkulasi Laba Bersih bulanan pedagang.",
        "constraints": "Kendala riil sektor perdagangan: barang dagangan kedaluwarsa atau rusak/bocor di gudang, fluktuasi harga komoditas sembako yang tiba-tiba naik dari pusat, risiko piutang macet akibat sistem kasbon warga desa, dan persaingan harga dengan toko ritel waralaba modern.",
        "innovation": "Gagasan inovasi FINCESTEM: integrasi sistem pembayaran digital QRIS dan transfer perbankan, pembuatan grup pemesanan kebutuhan dapur/saprotan via WhatsApp warga desa dengan layanan delivery gratis, serta pembukuan arus kas harian menggunakan aplikasi kasir online."
      }
    }
  },
  "formal": {
    "key": "formal",
    "name": "Lembaga Finansial, Perbankan/BUMDes & Layanan",
    "shortName": "🏛️ Finansial & Kantor",
    "badge": "Agen BRI-Link, BUMDes, Koperasi & Layanan",
    "icon": "account_balance",
    "objectExamples": "Gerai Agen BRI-Link / Mandiri Mitra, Kantor Koperasi Simpan Pinjam / BUMDes Desa, atau Loket Layanan Administrasi Keuangan di Belitang",
    "day5": {
      "focusTitle": "Panduan Video Day 5: Eksplorasi Mandiri Sains & Teknologi pada Sektor Layanan Finansial & Lembaga",
      "summaryFocus": "Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, menyorot meja kerja dan perlengkapan transaksi, serta membedah pilar Sains (ergonomi postur kerja, kenyamanan pencahayaan lux, psikologi visual antrean) dan pilar Teknologi (mesin EDC mini ATM, printer thermal struck, aplikasi mobile perbankan/QRIS, serta router UPS proteksi daya).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Profil Gerai Finansial di OKU Timur",
          "desc": "Tampil di depan kamera HP di gerai agen BRI-Link, loket BUMDes, atau koperasi simpan pinjam. Sampaikan salam pembuka, Nama Lengkap, NISN, Kelas, Fasilitator, dan perkenalkan nama gerai serta perannya dalam melayani inklusi keuangan masyarakat di OKU Timur.",
          "speechScript": "Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, dengan bimbingan guru fasilitator [Nama Guru Fasilitator]. Pada video Day 5 Non-Field Trip ini, saya akan membedah secara mandiri penerapan pilar Sains dan Teknologi pada gerai Layanan Finansial & Lembaga di OKU Timur..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Sains (Science) Sektor Finansial & Layanan",
          "desc": "Sorot area kerja gerai dan jelaskan prinsip ilmiahnya: ergonomi sains postur tubuh petugas teller/operator duduk di depan komputer agar terhindar dari cedera muskuloskeletal (RSI), intensitas pencahayaan ruang kerja (standar 300-500 lux) untuk ketelitian membaca angka, serta sains sirkulasi udara dan psikologi penataan antrean yang nyaman bagi nasabah.",
          "speechScript": "Pertama, mari kita tinjau dari pilar Sains (Science). Di gerai layanan keuangan mikro, faktor sains ergonomi postur tubuh petugas teller/operator duduk di depan komputer sangat diperhatikan agar tidak terjadi cedera tulang belakang (RSI), standar pencahayaan 300–500 lux agar tidak lelah membaca digit uang rupiah, serta sains psikologi tata antrean nasabah..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Teknologi (Technology) Sektor Finansial & Layanan",
          "desc": "Arahkan kamera ke perangkat teknologi perbankan: mesin EDC (Electronic Data Capture) kartu chip debit/ATM, printer kasir thermal cetak bukti struk tanpa tinta, router modem internet Wi-Fi 4G, baterai cadangan UPS (Uninterruptible Power Supply) penahan mati lampu, serta laptop/smartphone untuk aplikasi internet banking.",
          "speechScript": "Kedua, mari kita bahas dari pilar Teknologi (Technology). Gerai didukung oleh mesin EDC (Electronic Data Capture) kartu chip debit/ATM perbankan, printer kasir thermal cetak bukti struk tanpa tinta kimia, router modem Wi-Fi 4G, baterai cadangan UPS penahan lonjakan listrik mati lampu, serta laptop aplikasi internet banking resmi..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Analisis Efisiensi Penerapan Teknologi, Kesimpulan Sains-Teknologi & Penutup",
          "desc": "Jelaskan bagaimana mesin EDC dan transaksi digital mampu memangkas waktu warga pelosok desa yang sebelumnya harus menempuh puluhan kilometer ke bank kota, rangkum temuan Sains-Teknologi Anda, lalu tutup video dengan salam santun.",
          "speechScript": "Kesimpulannya, pemanfaatan mesin EDC dan transaksi digital ini terbukti menjadi ujung tombak inklusi keuangan warga desa di Belitang tanpa harus menempuh jarak jauh ke bank kota. Demikian penjelasan Day 5 dari saya. Terima kasih!"
        }
      ],
      "stemPoints": {
        "science": "Prinsip ergonomi kerja (posisi sudut pandang layar monitor, ketinggian meja kasir, kursi ergonomis penyangga punggung), fotometri pencahayaan ruang loket untuk ketelitian membaca digit nominal rupiah, dan sains keamanan enkripsi data perbankan (kriptografi PIN transaksi).",
        "technology": "Teknologi perangkat finansial mikro: mesin EDC chip EMV & kartu contactless NFC, printer thermal berbasis pemanasan kertas khusus tanpa tinta kimia, teknologi barcode dinamis QRIS Standar Bank Indonesia, dan perangkat catu daya cadangan UPS darurat.",
        "engineering": "Rekayasa tata letak loket pelayanan terproteksi (penyekat kaca akrilik pengaman, posisi tombol keypad PIN tertutup tudung pelindung pandangan kamera/orang lain), serta rekayasa sistem antrean nomor urut teratur.",
        "mathematics": "Kalkulasi matematis finansial mikro: perhitungan akumulasi fee per transaksi (Rp 3.000–Rp 5.000 per gesek tunai/transfer), kalkulasi batas kecukupan modal saldo likuiditas harian perputaran kas, dan perhitungan omzet komisi bulanan serta margin bersih."
      }
    },
    "day6": {
      "focusTitle": "Panduan Video Day 6: Analisis Rekayasa Solusi Kendala & Matematika Finansial Jasa Keuangan Mikro",
      "summaryFocus": "Pada video Day 6 (durasi 5–10 menit), Anda tampil mandiri di depan kamera HP tanpa wawancara, membedah pilar Rekayasa (desain proteksi privasi PIN nasabah, SOP verifikasi anti uang palsu) dan pilar Matematika Finansial (modal saldo likuiditas harian, bagi hasil fee transaksi, omzet komisi bulanan, biaya sewa/kuota internet, dan laba bersih pengelola).",
      "segments": [
        {
          "time": "00:00 – 01:30",
          "title": "1. Pembukaan, Identitas Diri & Kilas Balik Sektor yang Dianalisis",
          "desc": "Tampil di depan kamera HP. Sampaikan salam pembuka, perkenalkan diri lengkap, dan sebutkan bahwa video Day 6 ini berfokus pada Analisis Rekayasa Solusi Kendala dan Perhitungan Finansial Usaha Lembaga Jasa Keuangan Mikro / Agen Perbankan di Belitang.",
          "speechScript": "Halo semuanya! Kembali lagi bersama saya [Nama Siswa] di video Day 6 Non-Field Trip. Hari ini kita membedah pilar Rekayasa Solusi Kendala dan perhitungan Matematika Finansial gerai jasa keuangan mikro..."
        },
        {
          "time": "01:30 – 04:30",
          "title": "2. Penjelasan Mandiri Pilar Rekayasa (Engineering) & Solusi Kendala",
          "desc": "Tunjukkan kendala nyata di gerai finansial (risiko peredaran uang palsu di malam hari, koneksi internet/sinyal seluler EDC mendadak down saat transaksi berjalan, atau kehabisan uang tunai saat musim panen raya). Jelaskan rekayasa solusinya: penggunaan lampu detektor ultraviolet (UV) dan teknik 3D (dilihat, diraba, diterawang), pemasangan antena penguat sinyal modem ganda (dual-SIM failover), serta manajemen cadangan uang tunai di brankas tersembunyi.",
          "speechScript": "Pertama, pilar Rekayasa (Engineering). Kendala gerai keuangan adalah risiko uang palsu di malam hari dan sinyal internet EDC mendadak putus saat transaksi. Agen merekayasa lampu ultraviolet pemindai rupiah tersembunyi di bawah meja kasir, tudung penutup tombol keypad PIN nasabah untuk proteksi keamanan privasi, dan router modem dual-SIM auto-failover..."
        },
        {
          "time": "04:30 – 07:30",
          "title": "3. Penjelasan Mandiri Pilar Matematika Finansial (BOP, HPP, Omzet & Laba)",
          "desc": "Uraikan rincian modal dan keuntungan: modal saldo rekening likuiditas harian (misal Rp 20 Jt – Rp 50 Jt), biaya operasional (kertas thermal struk, pulsa kuota data internet, sewa tempat, listrik). Hitung rata-rata jumlah transaksi per hari (misal 40 transaksi x komisi fee Rp 5.000 = Omzet Rp 200.000/hari atau Rp 6 Jt/bulan), kurangkan BOP, lalu paparkan Laba Bersih yang diperoleh agen pengelola.",
          "speechScript": "Kedua, pilar Matematika Finansial. Modal saldo likuiditas rekening mengendap berkisar Rp 30 Juta. Gerai melayani rata-rata 50 transaksi per hari (tarik tunai, transfer, cicilan, listrik) dengan komisi fee Rp 5.000 per transaksi (Omzet Komisi Rp 250.000/hari atau Rp 7,5 Juta/bulan). Setelah dikurangi biaya kertas struk thermal, kuota internet, dan listrik Rp 1,2 Juta/bulan, diperoleh Laba Bersih sekitar Rp 6,3 Juta per bulan..."
        },
        {
          "time": "07:30 – 10:00",
          "title": "4. Gagasan Solusi Inovasi Nilai Tambah, Prospek Masa Depan & Penutup",
          "desc": "Paparkan gagasan inovasi FINCESTEM Anda: integrasi gerai agen BRI-Link/BUMDes dengan layanan pembayaran tagihan listrik/PDAM, cicilan kredit tani, serta pencatatan pembukuan otomatis berbasis aplikasi kasir keuangan. Simpulkan peran vital inklusi keuangan ini bagi kemajuan warga OKU Timur dan tutup video dengan salam.",
          "speechScript": "Gagasan inovasi yang saya ajukan adalah layanan jemput bola setoran pedagang pasar dan pembayaran pajak daerah digital, sehingga omzet transaksi gerai meningkat pesat. Terima kasih dan salam inovasi!"
        }
      ],
      "finPoints": {
        "financial": "Rincian perputaran modal saldo mengendap di rekening bank/kas tunai (likuiditas Rp 20 Jt s.d. Rp 100 Jt), sistem perolehan fee bagi hasil per transaksi (tarik tunai, transfer antarbank, pembayaran cicilan/BPJS/listrik Rp 3.000 s.d. Rp 7.000 per transaksi), biaya operasional (kertas thermal, paket data internet, listrik, sewa kios), serta kalkulasi Laba Bersih bulanan agen.",
        "constraints": "Kendala operasional lembaga finansial: risiko uang palsu saat jam ramai, gangguan jaringan perbankan pusat (server timeout atau sinyal drop) yang membuat nasabah panik, keterbatasan modal kas tunai saat musim panen raya ketika warga serempak mencairkan hasil penjualan gabah/karet, dan ancaman keamanan perampokan.",
        "innovation": "Gagasan inovasi FINCESTEM: penggunaan modem router auto-failover dengan dual kartu SIM untuk menjamin nol persen transaksi gagal akibat sinyal, penambahan lampu sensor ultraviolet pemindai rupiah otomatis, serta pengembangan layanan jemput bola setoran pedagang pasar Belitang."
      }
    }
  }
};

  NFT_VIDEO_SECTORS_GUIDE.keuangan = NFT_VIDEO_SECTORS_GUIDE.formal;
  NFT_VIDEO_SECTORS_GUIDE.jasa = NFT_VIDEO_SECTORS_GUIDE.industri;

  window.NFT_VIDEO_SECTORS_GUIDE = NFT_VIDEO_SECTORS_GUIDE;

  // Render Modul Khusus Day 5 & Day 6: Panduan Interaktif Video 7 Sektor + Form Resume Rencana Video
  function renderDay5Or6VideoModule(container, dayNum) {
    dayNum = parseInt(dayNum) || 5;
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();

    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                     localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    if (!savedOfficial) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map[`${dayNum}_materi`] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = { day: dayNum, submitted: true, conclusion: c, summary: c };
            }
          }
        }
      } catch(eHyd) {}
    }

    let draft = {};
    try {
      const rawDraft = localStorage.getItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt || savedOfficial.conclusion || savedOfficial.summary));
    window[`isNftD${dayNum}Submitted`] = isSubmitted;

    // Deteksi sektor pilihan siswa (bisa dari Day 5/6, atau warisan dari Day 4/3)
    let selectedSector = 'pertanian';
    let candidateSec = (savedOfficial && savedOfficial.selectedSector) ||
                         (draft && draft.selectedSector) ||
                         localStorage.getItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
    if (candidateSec === 'keuangan') candidateSec = 'formal';
    if (candidateSec === 'jasa') candidateSec = 'industri';
    if (candidateSec && NFT_VIDEO_SECTORS_GUIDE[candidateSec]) {
      selectedSector = candidateSec;
    }

    const secGuide = NFT_VIDEO_SECTORS_GUIDE[selectedSector] || NFT_VIDEO_SECTORS_GUIDE.pertanian;
    const dayGuide = (dayNum === 6) ? secGuide.day6 : secGuide.day5;

    const savedObjectName = (savedOfficial && savedOfficial.objectName) || (draft && draft.objectName) || '';
    const savedConclusion = (savedOfficial && (savedOfficial.userConclusion || savedOfficial.conclusion || savedOfficial.summary)) ||
                            (draft && draft.conclusion) || '';

    const isDay5 = (dayNum === 5);
    const headerGradient = isDay5
      ? 'from-amber-900 via-teal-950 to-slate-950 border-amber-600/40'
      : 'from-teal-900 via-indigo-950 to-slate-950 border-teal-600/40';
    const badgeColor = isDay5 ? 'bg-amber-400 text-slate-950' : 'bg-cyan-400 text-slate-950';

    const sectorKeys = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'industri', 'perdagangan', 'formal'];

    container.innerHTML = `
      <div class="flex flex-col gap-6 pb-14 max-w-4xl mx-auto w-full">

        <!-- BANNER STATUS TERKIRIM JIKA SUDAH SUBMIT -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-black uppercase text-emerald-800 tracking-wider">Modul Panduan Video Day ${dayNum} Tuntas</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Resume &amp; Rencana Video Day ${dayNum} Telah Tersimpan Resmi ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5 leading-relaxed">
                  Sektor Terpilih: <strong>${escapeHtml(secGuide.name)}</strong>. Naskah urutan video menit demi menit di bawah ini siap dijadikan panduan berbicara mandiri di depan kamera.
                </p>
              </div>
            </div>
            <a href="lkpd.html?day=${dayNum}" class="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm shrink-0 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]">
              <span>Buka LKPD Day ${dayNum}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ` : ''}

        <!-- HEADER MODUL PANDUAN VIDEO DAY 5 / DAY 6 -->
        <div class="bg-gradient-to-br ${headerGradient} rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col gap-4 border">
          <div class="flex items-center justify-between gap-2.5 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-amber-200 backdrop-blur-md flex items-center gap-1.5 shadow-2xs">
                <span class="material-symbols-outlined text-sm">smart_display</span>
                <span>Non-Field Trip • Modul Day ${dayNum}</span>
              </span>
              <span class="px-3 py-1 rounded-full text-[11px] font-extrabold ${badgeColor} shadow-2xs">
                ${isDay5 ? 'Video Sains & Teknologi Sektor (5–10 Menit)' : 'Video Rekayasa & Finansial Sektor (5–10 Menit)'}
              </span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Modul Selesai' : 'Panduan Naskah Video YouTube'}
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl lg:text-3xl leading-tight">
              ${isDay5
                ? 'Modul Day 5: Panduan Video Eksplorasi Sains & Teknologi Sektor'
                : 'Modul Day 6: Panduan Video Analisis Rekayasa Solusi Kendala & Finansial Sektor'}
            </h1>
            <p class="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-medium mt-2 text-justify">
              ${isDay5
                ? 'Pada Day 5 ini, Anda ditugaskan membuat video eksplorasi mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube. Tampil langsung di depan kamera menyorot objek atau alat kerja serta membedah pilar Sains dan pilar Teknologi dari sektor pilihan Anda!'
                : 'Pada Day 6 ini, Anda melanjutkan pembuatan video analisis mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube dengan fokus membedah pilar Rekayasa atas kendala lapangan dan pilar Matematika Finansial (BOP, HPP, Omzet, Laba) pada sektor pilihan Anda.'}
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Nama Peserta Didik</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentName)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentNisn)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Kelas / Rombel</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentClass)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Guru Fasilitator</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(fasilName)}</span>
            </div>
          </div>
        </div>

        <!-- ATURAN TEKNIS VIDEO YOUTUBE (5-10 MENIT, TANPA WAWANCARA) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-950 flex flex-col gap-3 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-900">
            <span class="material-symbols-outlined text-rose-600 text-lg">videocam</span>
            <span>3 KETENTUAN WAJIB PEMBUATAN VIDEO YOUTUBE DAY ${dayNum}:</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="p-3.5 rounded-2xl bg-white border border-rose-200 flex items-start gap-3 shadow-2xs">
              <span class="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center shrink-0">5-10m</span>
              <div class="text-xs">
                <strong class="text-slate-900 block font-bold">Durasi 5–10 Menit</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Jelaskan materi secara utuh dan runtut mengikuti 4 segmen panduan menit ke menit.</span>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-white border border-rose-200 flex items-start gap-3 shadow-2xs">
              <span class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">person_check</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block font-bold">Mandiri Tanpa Wawancara</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Tidak mewawancarai pemilik usaha. Anda sendiri yang berbicara menyorot objek/alat kerja!</span>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-white border border-rose-200 flex items-start gap-3 shadow-2xs">
              <span class="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">cloud_upload</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block font-bold">Upload ke YouTube</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Setel visibilitas ke <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong>, lalu tempel link di LKPD.</span>
              </div>
            </div>
          </div>

          <!-- PENGINGAT BTS DAY 7: SIMPAN BLOOPERS / REKAMAN GAGAL! -->
          <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white border border-purple-400/40 flex items-start gap-3 shadow-xs">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-xs">
              <span class="material-symbols-outlined text-lg">video_camera_front</span>
            </div>
            <div class="flex-1 text-xs">
              <div class="flex items-center gap-2 flex-wrap mb-0.5">
                <span class="font-extrabold text-amber-300">💡 Tips Tabungan BTS Day 7:</span>
                <span class="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-bold border border-purple-300/30">PENTING: Jangan Hapus Rekaman Gagal!</span>
              </div>
              <p class="text-purple-100 text-[11px] sm:text-xs leading-relaxed text-justify">
                Saat proses syuting video Day ${dayNum} ini, pasti ada momen salah bicara, tertawa lepas, gagap, atau kena angin (<em>bloopers</em>). <strong>Jangan langsung dihapus dari HP!</strong> Simpan potongan rekaman tersebut sebagai bahan utama video kompilasi <em>Behind The Scene</em> (BTS) pada Day 7 nanti.
              </p>
            </div>
          </div>
        </div>

        <!-- LANGKAH 1: PILIH MENU SEKTOR USAHA (7 PILIHAN INTERAKTIF) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-500/50 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5 flex-wrap">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Pilih Sektor Objek Video Anda (Klik Salah Satu Menu):</h2>
                <p class="text-[11px] text-slate-500 font-medium">Klik sektor yang Anda amati, panduan naskah dan materi menit demi menit di Langkah 2 akan otomatis menyesuaikan!</p>
              </div>
            </div>
            <span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-300 shadow-2xs">
              Terpilih: ${escapeHtml(secGuide.shortName)}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            ${sectorKeys.map(k => {
              const s = NFT_VIDEO_SECTORS_GUIDE[k];
              const isAct = (k === selectedSector);
              return `
                <button type="button" onclick="selectNftVideoSector(${dayNum}, '${k}')" class="text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${isAct ? 'bg-teal-50/80 border-teal-600 ring-2 ring-teal-500/30 shadow-md' : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50/70'}">
                  <div class="flex items-center justify-between gap-1.5 w-full">
                    <span class="w-9 h-9 rounded-xl ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0 shadow-2xs">
                      <span class="material-symbols-outlined text-xl">${s.icon}</span>
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}">${isAct ? '✓ Aktif' : 'Pilih'}</span>
                  </div>
                  <div>
                    <div class="font-black text-xs sm:text-sm text-slate-900 leading-tight">${s.shortName}</div>
                    <div class="text-[10.5px] text-slate-500 font-medium mt-0.5 line-clamp-1">${s.badge}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <div class="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-teal-700 text-lg shrink-0 mt-0.5">location_on</span>
            <div>
              <strong class="font-black">Contoh Objek / Tempat yang Bisa Direkam pada Sektor ${escapeHtml(secGuide.name)}:</strong>
              <p class="text-teal-900/90 mt-0.5 leading-relaxed">${escapeHtml(secGuide.objectExamples)}</p>
            </div>
          </div>
        </div>

        <!-- LANGKAH 2: PANDUAN URUTAN ISI VIDEO (STORYBOARD MENIT KE MENIT SESUAI SEKTOR) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-400/80 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5 flex-wrap">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">2</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">${escapeHtml(dayGuide.focusTitle)}</h2>
                <p class="text-[11px] text-slate-600 font-medium">Ikuti 4 urutan langkah menit demi menit berikut saat Anda berbicara mandiri di depan kamera HP:</p>
              </div>
            </div>
            <span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
              Durasi Total: 5 – 10 Menit
            </span>
          </div>

          <!-- BANNER PETUNJUK NASKAH BICARA -->
          <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300/80 text-xs text-slate-800 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-amber-700 text-xl shrink-0 mt-0.5">record_voice_over</span>
            <div class="leading-relaxed">
              <strong class="text-amber-950 font-bold block mb-0.5">Petunjuk Naskah Percakapan di Depan Kamera:</strong>
              <span>Di setiap segmen di bawah ini telah disediakan <strong>Contoh Naskah Bicara Siswa</strong> (kotak bergaris kuning). Anda dapat menghafalkan, membaca langsung, atau memodifikasi kalimat tersebut sesuai dengan objek yang Anda rekam di lapangan!</span>
            </div>
          </div>

          <!-- DAFTAR SEGMEN MENIT KE MENIT (STORYBOARD MODERN) -->
          <div class="grid grid-cols-1 gap-4">
            ${dayGuide.segments.map((seg, idx) => `
              <div class="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border-2 border-slate-200/90 hover:border-amber-400 transition-all flex flex-col gap-3 shadow-2xs">
                
                <!-- BARIS ATAS: WAKTU & JUDUL SEGMEN -->
                <div class="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5 flex-wrap">
                  <div class="flex items-center gap-2">
                    <span class="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 font-mono font-black text-xs flex items-center gap-1.5 shadow-2xs">
                      <span class="material-symbols-outlined text-sm">schedule</span>
                      <span>${escapeHtml(seg.time)}</span>
                    </span>
                    <span class="px-2.5 py-0.5 rounded-md text-[10.5px] font-black uppercase tracking-wider bg-slate-200 text-slate-700">
                      Bagian ${idx + 1} dari 4
                    </span>
                  </div>
                  <span class="text-[11px] font-bold text-slate-500">
                    ${idx === 0 ? '⏱️ Durasi: ~1.5 Menit' : idx === 3 ? '⏱️ Durasi: ~2.5 Menit' : '⏱️ Durasi: ~3 Menit'}
                  </span>
                </div>

                <!-- JUDUL SEGMEN -->
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-snug">${escapeHtml(seg.title)}</h3>
                </div>

                <!-- PETUNJUK TINDAKAN / SOROTAN KAMERA -->
                <div class="p-3 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-slate-500 text-base shrink-0 mt-0.5">videocam</span>
                  <div class="leading-relaxed text-justify">
                    <strong class="text-slate-900 font-bold block mb-0.5">Fokus Pengambilan Gambar &amp; Penjelasan:</strong>
                    <span>${escapeHtml(seg.desc)}</span>
                  </div>
                </div>

                <!-- KOTAK TELEPROMPTER / NASKAH BICARA SISWA -->
                ${seg.speechScript ? `
                  <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-300 text-xs flex flex-col gap-2 shadow-2xs">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5 font-black text-amber-950 text-xs">
                        <span class="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                          <span class="material-symbols-outlined text-sm">mic</span>
                        </span>
                        <span>Contoh Naskah Bicara di Depan Kamera (Bisa Diikuti / Dimodifikasi):</span>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-900 shrink-0">
                        Naskah Bicara
                      </span>
                    </div>
                    <div class="p-3 rounded-xl bg-white/95 border border-amber-200/70 text-slate-800 text-xs sm:text-[12px] leading-relaxed font-medium italic text-justify shadow-inner">
                      “${escapeHtml(
                        seg.speechScript
                          .replace(/\[Nama Siswa\]/g, studentName)
                          .replace(/\[Kelas\]/g, studentClass)
                          .replace(/\[Nama Fasilitator\]/g, fasilName)
                          .replace(/\[Nama Guru Fasilitator\]/g, fasilName)
                          .replace(/\[Sektor Pilihan\]/g, secGuide.shortName)
                      )}”
                    </div>
                  </div>
                ` : ''}

              </div>
            `).join('')}
          </div>

          <!-- RINCIAN MATERI SPESIFIK SEKTOR (CONTEK KHUSUS) -->
          ${isDay5 ? `
            <div class="mt-3 pt-5 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">science</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">Rangkuman Materi Sains &amp; Teknologi Sektor ${escapeHtml(secGuide.shortName)} (Bahan Contekan Siswa):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-4 rounded-2xl bg-sky-50/80 border-2 border-sky-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-sky-950 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">S</span>
                    <span class="text-xs sm:text-sm">1. Pilar SCIENCE (Sains Alami &amp; Biologi/Kimia)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.stemPoints.science)}</p>
                </div>
                <div class="p-4 rounded-2xl bg-teal-50/80 border-2 border-teal-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-teal-950 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">T</span>
                    <span class="text-xs sm:text-sm">2. Pilar TECHNOLOGY (Teknologi Alat &amp; Mesin)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.stemPoints.technology)}</p>
                </div>
                <div class="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-amber-950 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">E</span>
                    <span class="text-xs sm:text-sm">3. Pilar ENGINEERING (Trik Solusi Teknis Lapangan)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.stemPoints.engineering)}</p>
                </div>
                <div class="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-purple-950 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">M</span>
                    <span class="text-xs sm:text-sm">4. Pilar MATHEMATICS (Kalkulasi &amp; Efisiensi Kerja)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.stemPoints.mathematics)}</p>
                </div>
              </div>
            </div>
          ` : `
            <div class="mt-3 pt-5 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">payments</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">Rangkuman Materi Rekayasa, Finansial &amp; Inovasi Sektor ${escapeHtml(secGuide.shortName)} (Bahan Contekan Siswa):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-amber-950 flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg text-amber-700">engineering</span>
                    <span class="text-xs sm:text-sm">1. Pilar REKAYASA (Kendala &amp; Solusi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.finPoints.constraints)}</p>
                </div>
                <div class="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-emerald-950 flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg text-emerald-700">account_balance_wallet</span>
                    <span class="text-xs sm:text-sm">2. Pilar FINANSIAL (BOP, HPP &amp; Laba)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.finPoints.financial)}</p>
                </div>
                <div class="p-4 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-1.5 shadow-2xs">
                  <div class="font-black text-indigo-950 flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg text-indigo-700">lightbulb</span>
                    <span class="text-xs sm:text-sm">3. Solusi &amp; INOVASI Nilai Tambah</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify pt-1">${escapeHtml(dayGuide.finPoints.innovation)}</p>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- LANGKAH 3: FORM RESUME & RENCANA ALUR VIDEO SISWA (SYARAT MEMBUKA LKPD) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5 flex-wrap">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-800 to-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs">3</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Isi Resume &amp; Rencana Video Day ${dayNum} Anda</h2>
                <p class="text-[11px] text-slate-500 font-medium">Tuliskan objek yang Anda rekam beserta resume poin penjelasan Anda untuk membuka akses LKPD Day ${dayNum}.</p>
              </div>
            </div>
            <span id="badgeVideoModStatusD${dayNum}" class="px-3 py-1 rounded-xl text-[11px] font-black ${isSubmitted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
              ${isSubmitted ? '✓ Tersimpan Resmi' : 'Wajib Diisi'}
            </span>
          </div>

          <input type="hidden" id="nftVideoModSectorD${dayNum}" value="${escapeHtml(selectedSector)}">

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-700">place</span>
              <span>Nama Objek / Tempat Usaha Sektor ${escapeHtml(secGuide.shortName)} yang Direkam:</span>
              <span class="text-rose-600">*</span>
            </label>
            <input type="text" id="nftVideoModObjectD${dayNum}" value="${escapeHtml(savedObjectName)}" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="Contoh: ${escapeHtml(secGuide.objectExamples.split(',')[0])} di Desa ..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">
          </div>

          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-amber-700">edit_note</span>
                <span>${isDay5
                  ? 'Resume Rencana Alur Video Day 5 (Objek/Alat yang Disorot & Poin Sains serta Teknologi yang Dijelaskan):'
                  : 'Resume Rencana Alur Video Day 6 (Rekayasa Kendala Lapangan & Rincian Modal BOP, HPP, Omzet, Laba yang Dijelaskan):'}</span>
                <span class="text-rose-600">*</span>
              </label>
              <span id="counterVideoModD${dayNum}" class="text-[11px] font-bold text-slate-500">Min. 80 karakter</span>
            </div>
            <textarea id="nftVideoModResumeD${dayNum}" rows="5" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="${isDay5
              ? 'Tuliskan ringkasan rencana isi video Day 5 Anda: alat atau objek apa yang akan Anda sorot di kamera HP, serta poin Sains dan Teknologi apa yang akan Anda jelaskan pada sektor ' + secGuide.shortName + '... (Minimal 80 karakter)'
              : 'Tuliskan ringkasan rencana isi video Day 6 Anda: kendala teknis apa yang akan Anda bahas beserta rekayasa solusinya, serta rincian angka modal BOP, HPP, omzet, dan laba bersih pada sektor ' + secGuide.shortName + '... (Minimal 80 karakter)'}" class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm leading-relaxed focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">${escapeHtml(savedConclusion)}</textarea>
            <span id="msgVideoModValidationD${dayNum}" class="text-[11px] text-slate-500 font-medium">Minimal 80 karakter (sekitar 15–20 kata).</span>
          </div>

          ${isSubmitted ? `
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button type="button" onclick="enableEditNftVideoMod(${dayNum})" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                <span class="material-symbols-outlined text-sm">edit</span>
                <span>Ubah Sektor / Edit Resume Modul</span>
              </button>
              <a href="lkpd.html?day=${dayNum}" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all">
                <span class="material-symbols-outlined text-base">smart_display</span>
                <span>Lanjut ke LKPD Day ${dayNum} (Kirim Link YouTube)</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          ` : `
            <div class="pt-2">
              <button type="button" id="btnSubmitVideoModD${dayNum}" onclick="submitNftVideoModule(${dayNum})" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all">
                <span class="material-symbols-outlined text-lg">check_circle</span>
                <span>Simpan Resume Modul Day ${dayNum} &amp; Lanjut ke LKPD</span>
              </button>
            </div>
          `}
        </div>

      </div>

    `;

    setTimeout(() => {
      updateNftVideoModCounter(dayNum);
    }, 40);
  }

  function updateNftVideoModCounter(dayNum) {
    const resumeEl = document.getElementById(`nftVideoModResumeD${dayNum}`);
    const cntEl = document.getElementById(`counterVideoModD${dayNum}`);
    const msgEl = document.getElementById(`msgVideoModValidationD${dayNum}`);
    if (!resumeEl) return;
    const len = resumeEl.value.trim().length;
    if (cntEl) {
      cntEl.textContent = len >= 80 ? `✓ ${len} / 80 karakter` : `${len} / 80 karakter`;
      cntEl.className = len >= 80 ? 'text-[11px] font-black text-emerald-700' : 'text-[11px] font-bold text-slate-500';
    }
    if (msgEl) {
      if (len >= 80) {
        msgEl.textContent = '✓ Resume rencana video telah memenuhi batas minimal karakter.';
        msgEl.className = 'text-[11px] text-emerald-700 font-bold';
      } else {
        msgEl.textContent = len === 0
          ? 'Wajib diisi minimal 80 karakter sebelum lanjut ke LKPD.'
          : `Kurang ${80 - len} karakter lagi (Minimal 80 karakter).`;
        msgEl.className = 'text-[11px] text-rose-600 font-semibold';
      }
    }
  }

  window.onNftVideoModInput = function(dayNum) {
    updateNftVideoModCounter(dayNum);
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return;
      const sectorKey = (document.getElementById(`nftVideoModSectorD${dayNum}`) ? document.getElementById(`nftVideoModSectorD${dayNum}`).value : '') || 'pertanian';
      const objectName = (document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '';
      const conclusion = (document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '';
      localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
        day: dayNum,
        selectedSector: sectorKey,
        objectName: objectName,
        conclusion: conclusion,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {}
  };

  window.selectNftVideoSector = function(dayNum, sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const objVal = (document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '';
    const resVal = (document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '';

    try {
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idList = Array.from(new Set([cleanNisn, unpadded, padded])).filter(Boolean);
      idList.forEach(id => {
        localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + id, sectorKey);
        localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + id, JSON.stringify({
          day: dayNum,
          selectedSector: sectorKey,
          objectName: objVal,
          conclusion: resVal,
          updatedAt: new Date().toISOString()
        }));
        const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + id);
        if (rawOff) {
          try {
            const parsed = JSON.parse(rawOff);
            parsed.selectedSector = sectorKey;
            localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + id, JSON.stringify(parsed));
          } catch(e) {}
        }
      });
    } catch (e) {}

    const sGuide = NFT_VIDEO_SECTORS_GUIDE[sectorKey] || NFT_VIDEO_SECTORS_GUIDE.pertanian;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast(`Panduan Video Day ${dayNum} disesuaikan ke sektor: ${sGuide.name}`, 'info');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
  };

  window.enableEditNftVideoMod = function(dayNum) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    try {
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      if (rawOff) {
        const parsed = JSON.parse(rawOff);
        localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
          day: dayNum,
          selectedSector: parsed.selectedSector || 'pertanian',
          objectName: parsed.objectName || '',
          conclusion: parsed.userConclusion || parsed.conclusion || ''
        }));
        delete parsed.submitted;
        delete parsed.submittedAt;
        localStorage.removeItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      }
    } catch (e) {}
    window[`isNftD${dayNum}Submitted`] = false;
    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
  };

  window.submitNftVideoModule = function(dayNum) {
    dayNum = parseInt(dayNum) || 5;
    const sectorKey = (document.getElementById(`nftVideoModSectorD${dayNum}`) ? document.getElementById(`nftVideoModSectorD${dayNum}`).value : '') || 'pertanian';
    const objectName = ((document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '').trim();
    const resumeText = ((document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '').trim();

    if (objectName.length < 3) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Tuliskan nama objek atau tempat usaha yang akan Anda rekam (minimal 3 karakter)!', 'warning');
      } else {
        alert('Tuliskan nama objek atau tempat usaha yang akan Anda rekam!');
      }
      var _fEl1 = document.getElementById(`nftVideoModObjectD${dayNum}`); if (_fEl1) _fEl1.focus();
      return;
    }

    if (resumeText.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Resume rencana video Day ${dayNum} minimal 80 karakter (saat ini ${resumeText.length} karakter).`, 'warning');
      } else {
        alert(`Resume rencana video Day ${dayNum} minimal 80 karakter!`);
      }
      var _fEl2 = document.getElementById(`nftVideoModResumeD${dayNum}`); if (_fEl2) _fEl2.focus();
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const secGuide = NFT_VIDEO_SECTORS_GUIDE[sectorKey] || NFT_VIDEO_SECTORS_GUIDE.pertanian;

    const summaryFull = `[Modul Video Day ${dayNum} - ${secGuide.name}] Objek: ${objectName} | Rencana Alur Video: ${resumeText}`;
    const nowIso = new Date().toISOString();

    const payload = {
      day: dayNum,
      isVideoModule: true,
      selectedSector: sectorKey,
      sectorName: secGuide.name,
      objectName: objectName,
      userConclusion: resumeText,
      conclusion: summaryFull,
      summary: summaryFull,
      submitted: true,
      submittedAt: nowIso,
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      cardA: {
        title: `Rencana Video Day ${dayNum} (${secGuide.shortName}): ${objectName}`,
        text: resumeText,
        source: `Observasi Lapangan Mandiri Sektor ${secGuide.name} - Kabupaten OKU Timur`
      }
    };

    try {
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idList = Array.from(new Set([cleanNisn, unpadded, padded])).filter(Boolean);
      idList.forEach(id => {
        localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + id, sectorKey);
        localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + id, JSON.stringify(payload));
        localStorage.setItem(`fincestem_materi_day${dayNum}_` + id, JSON.stringify(payload));
        localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + id, JSON.stringify({ conclusion: summaryFull, savedAt: nowIso }));
      });
    } catch (e) {}

    window[`isNftD${dayNum}Submitted`] = true;

    const onDone = function() {
      showSuccessNftMateriModalUnified(dayNum);
      const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
      if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
    };

    if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'materi', payload, function() {
        onDone();
      });
    } else {
      onDone();
    }
  };


    // =========================================================================
  // 6D. MODUL KHUSUS DAY 7: PANDUAN VIDEO REFLEKSI (DAY 1–7) & BEHIND THE SCENE (BTS)
  // =========================================================================
  function renderDay7ReflectionVideoModule(container) {
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();

    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem('fincestem_materi_nft_day7_' + cleanNisn) ||
                     localStorage.getItem('fincestem_materi_day7_' + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    if (!savedOfficial) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map['7_materi'] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = { day: 7, submitted: true, conclusion: c, summary: c };
            }
          }
        }
      } catch(eHyd) {}
    }

    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_materi_d7_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt || savedOfficial.conclusion || savedOfficial.summary));
    window.isNftD7Submitted = isSubmitted;

    // Deteksi sektor yang pernah diamati siswa pada Day 3-6
    let observedSectorName = 'Sektor Riset Pilihan';
    try {
      const pastSec = (savedOfficial && savedOfficial.selectedSector) ||
                      (draft && draft.selectedSector) ||
                      localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) ||
                      localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                      localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                      localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
      if (pastSec && window.NFT_VIDEO_SECTORS_GUIDE && window.NFT_VIDEO_SECTORS_GUIDE[pastSec]) {
        observedSectorName = window.NFT_VIDEO_SECTORS_GUIDE[pastSec].name;
      }
    } catch(e) {}

    const savedTitle = (savedOfficial && savedOfficial.objectName) || (draft && draft.objectName) || 'Video Refleksi Perjalanan Riset Day 1–7 & Behind The Scene (BTS)';
    const savedResume = (savedOfficial && (savedOfficial.userConclusion || savedOfficial.conclusion || savedOfficial.summary)) ||
                        (draft && draft.conclusion) || '';

    const segments = [
      {
        time: '00:00 – 01:30',
        part: 'Bagian 1 dari 4',
        duration: '⏱️ Durasi: ~1.5 Menit',
        title: '1. Pembukaan & Kilas Balik Fondasi Riset (Day 1 – 3)',
        desc: 'Berdiri atau duduk tegak di tempat yang terang. Tatap kamera HP dengan senyum hangat dan percaya diri. Sapa penonton, sebutkan identitas lengkap (Nama, NISN, Kelas, Nama Fasilitator), lalu rangkum kilas balik perjalanan awal dari Day 1 (Literasi Keuangan & Anggaran Kas), Day 2 (Kearifan Budaya Lokal & Mata Pencaharian), hingga Day 3 (Analisis 4 Pilar STEM Sektor Unggulan).',
        speechScript: 'Halo semuanya! Perkenalkan nama saya [Nama Siswa] dari kelas [Kelas] SMAN 1 Belitang, di bawah bimbingan guru fasilitator [Nama Fasilitator]. Pada video tugas puncak Day 7 Non-Field Trip ini, saya mempersembahkan video refleksi akhir dari seluruh rangkaian kegiatan riset mandiri yang telah saya laksanakan dari Day 1 hingga Day 7 di Kabupaten OKU Timur. Dimulai dari Day 1 saya mempelajari fondasi literasi keuangan dan pengelolaan kas, berlanjut ke Day 2 mendalami kearifan budaya lokal dan mata pencaharian daerah, hingga Day 3 menganalisis integrasi 4 pilar STEM pada sektor-sektor unggulan di sekitar tempat tinggal saya...'
      },
      {
        time: '01:30 – 03:30',
        part: 'Bagian 2 dari 4',
        duration: '⏱️ Durasi: ~2 Menit',
        title: '2. Pengalaman Lapangan & Pembuatan Video Mandiri (Day 4 – 6)',
        desc: 'Ceritakan dengan antusias momen terjun langsung ke lapangan saat observasi Day 4, dan tantangan saat harus berdiri berbicara mandiri di depan kamera HP untuk merekam video Day 5 (Sains & Teknologi) serta Day 6 (Rekayasa Solusi Kendala & Matematika Finansial). Ungkapkan bagaimana Anda mengatasi rasa gugup atau canggung hingga berhasil menyelesaikan tugas video tersebut.',
        speechScript: 'Pengalaman yang paling menantang sekaligus berkesan adalah saat memasuki fase lapangan di Day 4 hingga Day 6. Saya terjun langsung mengamati sektor [Sektor Pilihan] di desa saya, lalu harus berdiri berbicara mandiri di depan kamera HP untuk menjelaskan Sains dan Teknologi di Day 5, serta membedah Rekayasa Solusi dan Matematika Finansial di Day 6. Awalnya saya sempat gugup dan canggung berbicara sendiri di depan kamera, tetapi tantangan ini melatih kepercayaan diri saya dan membuat saya paham betapa gigihnya perjuangan para pelaku usaha di desa kita...'
      },
      {
        time: '03:30 – 05:00',
        part: 'Bagian 3 dari 4',
        duration: '⏱️ Durasi: ~1.5 Menit',
        title: '3. Makna Pembelajaran, Refleksi Diri & Ucapan Terima Kasih',
        desc: 'Sampaikan hikmah dan perubahan pola pikir yang Anda rasakan setelah 7 hari belajar mandiri. Ungkapkan kebanggaan atas potensi ekonomi dan alam di OKU Timur, serta sampaikan ucapan terima kasih yang tulus kepada guru fasilitator pembimbing, orang tua di rumah, dan rekan-rekan yang mendampingi selama riset.',
        speechScript: 'Dari seluruh 7 hari riset mandiri FINCESTEM ini, saya menyadari bahwa ilmu sains, teknologi, dan pengelolaan finansial sangat nyata manfaatnya bagi kemajuan masyarakat OKU Timur. Saya mengucapkan terima kasih sebesar-besarnya kepada guru pembimbing/fasilitator saya [Nama Fasilitator] atas bimbingan dan masukannya, serta orang tua dan rekan-rekan yang selalu mendukung saya. Dan sebagai penutup, mari kita saksikan cuplikan di balik layar atau Behind The Scene selama proses riset saya!'
      },
      {
        time: '05:00 – 08:00',
        part: 'Bagian 4 dari 4',
        duration: '⏱️ Durasi: ~2 – 3 Menit',
        title: '4. Segmen Behind The Scene (BTS) & Bloopers',
        desc: 'Tampilkan kompilasi klip video di balik layar: rekaman saat salah bicara (bloopers/tertawa), perjuangan menyandarkan HP di tiang/pohon/sepeda motor, suasana terik atau gerimis saat di jalan, serta bantuan dari keluarga atau teman. Tambahkan musik latar ceria dan akhiri dengan tulisan penutup (End Screen / Ucapan Terima Kasih).',
        speechScript: '(Bagian ini berupa kompilasi video seru BTS & Bloopers di balik layar dengan iringan musik santai/ceria, teks keterangan lucu pada klip bloopers, dan ditutup kartu ucapan: Terima Kasih Telah Menyaksikan Perjalanan Riset FINCESTEM 2026 - SMAN 1 Belitang)'
      }
    ];

    container.innerHTML = `
      <div class="flex flex-col gap-6 pb-14 max-w-4xl mx-auto w-full">

        <!-- BANNER STATUS TERKIRIM JIKA SUDAH SUBMIT -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-black uppercase text-emerald-800 tracking-wider">Modul Puncak Day 7 Tuntas</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Rencana Video Refleksi Day 7 Telah Tersimpan Resmi ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5 leading-relaxed">
                  Panduan naskah menit demi menit di bawah ini siap dijadikan acuan rekaman video refleksi &amp; BTS. Anda dapat lanjut ke Tahap 2: Dokumentasi Foto Bebas Google Geotag.
                </p>
              </div>
            </div>
            <a href="dokumentasi.html?day=7" class="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm shrink-0 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]">
              <span>Lanjut ke Dokumentasi Day 7</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ` : ''}

        <!-- HEADER MODUL PANDUAN VIDEO DAY 7 -->
        <div class="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col gap-4 border border-purple-500/40">
          <div class="flex items-center justify-between gap-2.5 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-amber-200 backdrop-blur-md flex items-center gap-1.5 shadow-2xs">
                <span class="material-symbols-outlined text-sm">movie</span>
                <span>Non-Field Trip • Modul Day 7 (Grand Finale)</span>
              </span>
              <span class="px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-2xs">
                Video Refleksi Perjalanan Riset &amp; BTS (5–8 Menit)
              </span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Modul Selesai' : 'Panduan Naskah Video YouTube'}
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl lg:text-3xl leading-tight">
              Modul Day 7: Panduan Video Refleksi Perjalanan Riset Day 1–7 &amp; Behind The Scene (BTS)
            </h1>
            <p class="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-medium mt-2 text-justify">
              Selamat datang di Hari Puncak Riset FINCESTEM 2026! Hari ini Anda membuat <strong>Video Refleksi Perjalanan (Day 1 s.d. Day 7)</strong> berdurasi <strong>5–8 Menit</strong> yang dilengkapi dengan rekaman cuplikan <strong>Behind The Scene (BTS / Bloopers)</strong> di balik layar. Rekam video Anda di depan kamera HP dengan rileks, jujur, dan hangat, lalu unggah ke YouTube!
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Nama Peserta Didik</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentName)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentNisn)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Kelas / Rombel</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(studentClass)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium uppercase tracking-wider">Fasilitator Pembimbing</span>
              <span class="font-extrabold truncate text-white mt-0.5">${escapeHtml(fasilName)}</span>
            </div>
          </div>
        </div>

        <!-- LANGKAH 1: ATURAN EMAS PRODUKSI VIDEO DAY 7 -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-purple-200 shadow-sm flex flex-col gap-4">
          <div class="flex items-center gap-3 border-b border-slate-100 pb-3.5">
            <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
            <div>
              <h2 class="font-black text-sm sm:text-base text-slate-900">Aturan Penting Video Refleksi &amp; BTS Day 7:</h2>
              <p class="text-[11px] text-slate-500 font-medium">Pedomani 4 poin utama ini agar proses perekaman berjalan santai, menyenangkan, dan berbobot:</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div class="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col gap-1.5 shadow-2xs">
              <div class="flex items-center gap-2 text-purple-900 font-black">
                <span class="material-symbols-outlined text-lg text-purple-700">timer</span>
                <span>Durasi: 5 – 8 Menit</span>
              </div>
              <p class="text-slate-600 text-[11px] leading-relaxed text-justify">
                Terbagi seimbang: Refleksi Day 1–7 berdurasi <strong>3–5 menit</strong>, dilanjutkan cuplikan video BTS berdurasi <strong>2–3 menit</strong> di bagian akhir.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col gap-1.5 shadow-2xs">
              <div class="flex items-center gap-2 text-indigo-900 font-black">
                <span class="material-symbols-outlined text-lg text-indigo-700">person_play</span>
                <span>Tampil Mandiri &amp; Santai</span>
              </div>
              <p class="text-slate-600 text-[11px] leading-relaxed text-justify">
                Bicaralah langsung di depan kamera dengan rileks dan tulus. Ceritakan apa adanya pengalaman dan perasaan Anda selama 7 hari riset.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col gap-1.5 shadow-2xs">
              <div class="flex items-center gap-2 text-amber-900 font-black">
                <span class="material-symbols-outlined text-lg text-amber-700">theater_comedy</span>
                <span>Cuplikan BTS / Bloopers</span>
              </div>
              <p class="text-slate-600 text-[11px] leading-relaxed text-justify">
                Tampilkan momen lucu salah bicara (bloopers), usaha menaruh HP/tripod, cuaca panas, atau bantuan keluarga/teman di balik layar!
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col gap-1.5 shadow-2xs">
              <div class="flex items-center gap-2 text-rose-900 font-black">
                <span class="material-symbols-outlined text-lg text-rose-700">cloud_upload</span>
                <span>Upload ke YouTube</span>
              </div>
              <p class="text-slate-600 text-[11px] leading-relaxed text-justify">
                Unggah video ke channel YouTube dengan visibilitas <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong>, lalu kirimkan link-nya di LKPD Day 7.
              </p>
            </div>
          </div>
        </div>

        <!-- LANGKAH 2: RUNTUTAN SEGMEN NASKAH VIDEO MENIT DEMI MENIT -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-400/80 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5 flex-wrap">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">2</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Panduan Runtutan Naskah Menit ke Menit (Refleksi &amp; BTS)</h2>
                <p class="text-[11px] text-slate-600 font-medium">Ikuti 4 urutan langkah menit demi menit berikut saat Anda berbicara di depan kamera HP dan menyusun klip BTS:</p>
              </div>
            </div>
            <span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
              Durasi Total: 5 – 8 Menit
            </span>
          </div>

          <!-- BANNER PETUNJUK NASKAH BICARA -->
          <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300/80 text-xs text-slate-800 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-amber-700 text-xl shrink-0 mt-0.5">record_voice_over</span>
            <div class="leading-relaxed">
              <strong class="text-amber-950 font-bold block mb-0.5">Petunjuk Naskah Percakapan di Depan Kamera:</strong>
              <span>Di setiap segmen di bawah ini telah disediakan <strong>Contoh Naskah Bicara Siswa</strong> (kotak bergaris kuning). Anda dapat menghafalkan, membaca langsung, atau memodifikasi kalimat tersebut sesuai dengan pengalaman nyata Anda selama riset!</span>
            </div>
          </div>

          <!-- DAFTAR 4 SEGMEN MENIT KE MENIT -->
          <div class="grid grid-cols-1 gap-4">
            ${segments.map((seg, idx) => `
              <div class="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border-2 border-slate-200/90 hover:border-amber-400 transition-all flex flex-col gap-3 shadow-2xs">
                
                <!-- BARIS ATAS: WAKTU & JUDUL SEGMEN -->
                <div class="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5 flex-wrap">
                  <div class="flex items-center gap-2">
                    <span class="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 font-mono font-black text-xs flex items-center gap-1.5 shadow-2xs">
                      <span class="material-symbols-outlined text-sm">schedule</span>
                      <span>${escapeHtml(seg.time)}</span>
                    </span>
                    <span class="px-2.5 py-0.5 rounded-md text-[10.5px] font-black uppercase tracking-wider bg-slate-200 text-slate-700">
                      ${escapeHtml(seg.part)}
                    </span>
                  </div>
                  <span class="text-[11px] font-bold text-slate-500">
                    ${escapeHtml(seg.duration)}
                  </span>
                </div>

                <!-- JUDUL SEGMEN -->
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-snug">${escapeHtml(seg.title)}</h3>
                </div>

                <!-- PETUNJUK TINDAKAN / SOROTAN KAMERA -->
                <div class="p-3 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-slate-500 text-base shrink-0 mt-0.5">videocam</span>
                  <div class="leading-relaxed text-justify">
                    <strong class="text-slate-900 font-bold block mb-0.5">Fokus Pengambilan Gambar &amp; Penjelasan:</strong>
                    <span>${escapeHtml(seg.desc)}</span>
                  </div>
                </div>

                <!-- KOTAK TELEPROMPTER / NASKAH BICARA SISWA -->
                <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-300 text-xs flex flex-col gap-2 shadow-2xs">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 font-black text-amber-950 text-xs">
                      <span class="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                        <span class="material-symbols-outlined text-sm">mic</span>
                      </span>
                      <span>Contoh Naskah Bicara di Depan Kamera (Bisa Diikuti / Dimodifikasi):</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-900 shrink-0">
                      Naskah Bicara
                    </span>
                  </div>
                  <div class="p-3 rounded-xl bg-white/95 border border-amber-200/70 text-slate-800 text-xs sm:text-[12px] leading-relaxed font-medium italic text-justify shadow-inner">
                    “${escapeHtml(
                      seg.speechScript
                        .replace(/\[Nama Siswa\]/g, studentName)
                        .replace(/\[Kelas\]/g, studentClass)
                        .replace(/\[Nama Fasilitator\]/g, fasilName)
                        .replace(/\[Sektor Pilihan\]/g, observedSectorName)
                    )}”
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

        <!-- LANGKAH 3: FORMULIR DRAF RENCANA VIDEO REFLEKSI & CATATAN BTS -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-purple-300 shadow-sm flex flex-col gap-4">
          <div class="flex items-center gap-3 border-b border-slate-100 pb-3.5">
            <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-xs">3</span>
            <div>
              <h2 class="font-black text-sm sm:text-base text-slate-900">Tuliskan Rencana / Draf Ringkas Video Refleksi &amp; BTS Anda</h2>
              <p class="text-[11px] text-slate-500 font-medium">Rangkum poin-poin yang akan Anda sampaikan di video refleksi dan ide cuplikan BTS apa saja yang akan Anda masukkan:</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                Judul Rencana Video YouTube Refleksi &amp; BTS Anda:
              </label>
              <input
                type="text"
                id="nftVideoModObjectD7"
                value="${escapeHtml(savedTitle)}"
                ${isSubmitted ? 'readonly' : ''}
                placeholder="Contoh: Kilas Balik Riset Mandiri 7 Hari FINCESTEM & Behind The Scene - [Nama Anda]"
                class="w-full px-4 py-3 rounded-2xl border border-slate-300 ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-purple-600'} text-xs font-semibold outline-none transition-all"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-slate-700">
                  Draf Rencana Isi Video Refleksi &amp; Catatan Klip BTS (Minimal 80 Karakter):
                </label>
                <span id="nftD7ResumeCharCounter" class="text-[11px] font-mono font-bold text-slate-500">
                  0 / 80 karakter
                </span>
              </div>
              <textarea
                id="nftVideoModResumeD7"
                rows="5"
                ${isSubmitted ? 'readonly' : ''}
                oninput="
                  const c = (this.value || '').trim().length;
                  const el = document.getElementById('nftD7ResumeCharCounter');
                  if (el) {
                    el.textContent = (c >= 80 ? '✓ ' : '') + c + ' / 80 karakter';
                    el.className = 'text-[11px] font-mono font-bold ' + (c >= 80 ? 'text-emerald-700' : 'text-amber-700');
                  }
                  try {
                    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
                    const n = String(u.nisn || u.identifier || '').trim();
                    localStorage.setItem('fincestem_draft_nft_materi_d7_' + n, JSON.stringify({
                      objectName: (document.getElementById('nftVideoModObjectD7') ? document.getElementById('nftVideoModObjectD7').value : ''),
                      conclusion: this.value
                    }));
                  } catch(e) {}
                "
                placeholder="Tuliskan draf singkat refleksi Anda: dari Day 1 hingga Day 6 apa saja yang Anda pelajari, suka duka selama rekaman mandiri di lapangan, ucapan terima kasih kepada guru pembimbing/fasilitator dan orang tua, serta momen seru apa saja yang akan Anda masukkan ke klip Behind The Scene... (Minimal 80 karakter)"
                class="w-full p-4 rounded-2xl border border-slate-300 ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-purple-600'} text-xs leading-relaxed outline-none transition-all"
              >${escapeHtml(savedResume)}</textarea>
            </div>

            <div class="flex items-center justify-between gap-3 pt-2 flex-wrap">
              ${isSubmitted ? `
                <div class="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <span class="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                  <span>Modul Panduan Day 7 Telah Terkirim Resmi</span>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    onclick="window.enableEditNftDay7Reflection()"
                    class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    Edit Kembali
                  </button>
                  <a
                    href="dokumentasi.html?day=7"
                    class="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lanjut ke Dokumentasi Day 7</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              ` : `
                <button
                  type="button"
                  onclick="
                    try {
                      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
                      const n = String(u.nisn || u.identifier || '').trim();
                      const obj = (document.getElementById('nftVideoModObjectD7') ? document.getElementById('nftVideoModObjectD7').value : '').trim();
                      const txt = (document.getElementById('nftVideoModResumeD7') ? document.getElementById('nftVideoModResumeD7').value : '').trim();
                      localStorage.setItem('fincestem_draft_nft_materi_d7_' + n, JSON.stringify({ objectName: obj, conclusion: txt }));
                      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Draf rencana video Day 7 berhasil disimpan!', 'success');
                    } catch(e) {}
                  "
                  class="px-4 py-3 rounded-2xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span class="material-symbols-outlined text-base text-slate-600">save</span>
                  <span>Simpan Draf Saja</span>
                </button>

                <button
                  type="button"
                  onclick="window.submitNftDay7ReflectionModule()"
                  class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 active:scale-[0.98] text-white text-xs font-black shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span class="material-symbols-outlined text-lg">send</span>
                  <span>Kirim &amp; Selesaikan Modul Day 7</span>
                </button>
              `}
            </div>
          </div>
        </div>

      </div>
    `;

    // Initialize character counter
    setTimeout(() => {
      const txtEl = document.getElementById('nftVideoModResumeD7');
      const cntEl = document.getElementById('nftD7ResumeCharCounter');
      if (txtEl && cntEl) {
        const len = (txtEl.value || '').trim().length;
        cntEl.textContent = (len >= 80 ? '✓ ' : '') + len + ' / 80 karakter';
        cntEl.className = 'text-[11px] font-mono font-bold ' + (len >= 80 ? 'text-emerald-700' : 'text-amber-700');
      }
    }, 50);
  }

  // Window helper methods for Day 7
  window.enableEditNftDay7Reflection = function() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    try {
      localStorage.removeItem('fincestem_materi_nft_day7_' + cleanNisn);
      localStorage.removeItem('fincestem_materi_day7_' + cleanNisn);
      const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
      if (storedP) {
        const prog = JSON.parse(storedP);
        if (prog && prog.task_map && prog.task_map['7_materi']) {
          delete prog.task_map['7_materi'];
          localStorage.setItem('fincestem_progress_' + cleanNisn, JSON.stringify(prog));
        }
      }
    } catch(e) {}
    window.isNftD7Submitted = false;
    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay7ReflectionVideoModule(mainEl);
  };

  window.submitNftDay7ReflectionModule = function() {
    const objectName = ((document.getElementById('nftVideoModObjectD7') ? document.getElementById('nftVideoModObjectD7').value : '') || '').trim();
    const resumeText = ((document.getElementById('nftVideoModResumeD7') ? document.getElementById('nftVideoModResumeD7').value : '') || '').trim();

    if (objectName.length < 3) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Tuliskan judul rencana video refleksi & BTS Anda (minimal 3 karakter)!', 'warning');
      } else {
        alert('Tuliskan judul rencana video refleksi & BTS Anda!');
      }
      var _fEl1 = document.getElementById('nftVideoModObjectD7'); if (_fEl1) _fEl1.focus();
      return;
    }

    if (resumeText.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Draf rencana video refleksi minimal 80 karakter (saat ini ' + resumeText.length + ' karakter).', 'warning');
      } else {
        alert('Draf rencana video refleksi minimal 80 karakter!');
      }
      var _fEl2 = document.getElementById('nftVideoModResumeD7'); if (_fEl2) _fEl2.focus();
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const summaryFull = '[Modul Video Day 7 - Refleksi & BTS] Judul: ' + objectName + ' | Draf Rencana: ' + resumeText;
    const nowIso = new Date().toISOString();

    const payload = {
      day: 7,
      isVideoModule: true,
      selectedSector: 'refleksi',
      sectorName: 'Refleksi Perjalanan Riset Day 1–7 & Behind The Scene (BTS)',
      objectName: objectName,
      userConclusion: resumeText,
      conclusion: summaryFull,
      summary: summaryFull,
      submitted: true,
      submittedAt: nowIso,
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      cardA: {
        title: 'Video Refleksi & BTS: ' + objectName,
        text: resumeText,
        sources: 'Draf Naskah Klip Refleksi & Catatan BTS (Day 7 Non-Field Trip).'
      }
    };

    try {
      localStorage.setItem('fincestem_materi_nft_day7_' + cleanNisn, JSON.stringify(payload));
      localStorage.setItem('fincestem_materi_day7_' + cleanNisn, JSON.stringify(payload));
    } catch(e) {}

    window.isNftD7Submitted = true;

    const onDone = function() {
      showSuccessNftMateriModalUnified(7);
      const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
      if (mainEl) renderDay7ReflectionVideoModule(mainEl);
    };

    if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
      FincestemCore.progress.submitTask(cleanNisn, 7, 'materi', payload, function() {
        onDone();
      });
    } else {
      onDone();
    }
  };


  // 7. EKSPOR FUNGSI KE WINDOW GLOBAL (SEMUA HARI DAY 0 S.D. DAY 7)
  window.selectDay3Sector = function(sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const mappedSec = mapToMateriSectorKey(sectorKey) || 'pertanian';
    localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, mappedSec);

    // Jika sudah pernah disubmit, perbarui juga payload resmi yang tersimpan agar sinkron ke LKPD & Asesmen
    try {
      const rawSaved = localStorage.getItem('fincestem_materi_nft_day3_' + cleanNisn);
      if (rawSaved) {
        const p = JSON.parse(rawSaved);
        p.selectedSector = mappedSec;
        localStorage.setItem('fincestem_materi_nft_day3_' + cleanNisn, JSON.stringify(p));
        if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
          FincestemCore.progress.submitTask(cleanNisn, 3, 'materi', p);
        }
      }
      // Hapus cache paket soal asesmen Day 3 agar otomatis menyesuaikan dengan sektor baru
      localStorage.removeItem('fincestem_pkg_nft_asesmen_v3_d3_' + cleanNisn);
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('fincestem_pkg_nft_asesmen_v3_d3_') && k.endsWith(cleanNisn)) {
          localStorage.removeItem(k);
        }
      });
    } catch(e) {}

    const cfg3 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[3]) || {};
    const secName = (cfg3.sectors && cfg3.sectors[mappedSec]) ? cfg3.sectors[mappedSec].name : mappedSec;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor riset Day 3 disesuaikan ke: ' + secName + '. Kartu panduan STEM telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 3);
    }
  };

  window.selectDay4Sector = function(sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const mappedSec = mapToMateriSectorKey(sectorKey) || 'pertanian';
    localStorage.setItem('fincestem_nft_sector_d4_' + cleanNisn, mappedSec);

    try {
      const rawSaved = localStorage.getItem('fincestem_materi_nft_day4_' + cleanNisn);
      if (rawSaved) {
        const p = JSON.parse(rawSaved);
        p.selectedSector = mappedSec;
        localStorage.setItem('fincestem_materi_nft_day4_' + cleanNisn, JSON.stringify(p));
        if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
          FincestemCore.progress.submitTask(cleanNisn, 4, 'materi', p);
        }
      }
      // Hapus cache soal asesmen Day 4 agar otomatis sinkron ke sektor baru
      localStorage.removeItem('fincestem_pkg_nft_asesmen_v3_d4_' + cleanNisn);
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('fincestem_pkg_nft_asesmen_v3_d4_') && k.endsWith(cleanNisn)) {
          localStorage.removeItem(k);
        }
      });
    } catch(e) {}

    const cfg4 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[4]) || {};
    const secName = (cfg4.sectors && cfg4.sectors[mappedSec]) ? cfg4.sectors[mappedSec].name : mappedSec;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor jelajah Day 4 diubah ke: ' + secName + '. Kartu riset telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 4);
    }
  };

  window.selectDay5Sector = function(sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const mappedSec = mapToMateriSectorKey(sectorKey) || 'pertanian';
    localStorage.setItem('fincestem_nft_sector_d5_' + cleanNisn, mappedSec);

    try {
      const rawSaved = localStorage.getItem('fincestem_materi_nft_day5_' + cleanNisn);
      if (rawSaved) {
        const p = JSON.parse(rawSaved);
        p.selectedSector = mappedSec;
        localStorage.setItem('fincestem_materi_nft_day5_' + cleanNisn, JSON.stringify(p));
        if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
          FincestemCore.progress.submitTask(cleanNisn, 5, 'materi', p);
        }
      }
    } catch(e) {}

    const cfg5 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[5]) || {};
    const secName = (cfg5.sectors && cfg5.sectors[mappedSec]) ? cfg5.sectors[mappedSec].name : mappedSec;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor video Day 5 diubah ke: ' + secName + '. Kartu panduan Sains & Teknologi telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 5);
    }
  };

  window.selectDay6Sector = function(sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const mappedSec = mapToMateriSectorKey(sectorKey) || 'pertanian';
    localStorage.setItem('fincestem_nft_sector_d6_' + cleanNisn, mappedSec);

    try {
      const rawSaved = localStorage.getItem('fincestem_materi_nft_day6_' + cleanNisn);
      if (rawSaved) {
        const p = JSON.parse(rawSaved);
        p.selectedSector = mappedSec;
        localStorage.setItem('fincestem_materi_nft_day6_' + cleanNisn, JSON.stringify(p));
        if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
          FincestemCore.progress.submitTask(cleanNisn, 6, 'materi', p);
        }
      }
    } catch(e) {}

    const cfg6 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[6]) || {};
    const secName = (cfg6.sectors && cfg6.sectors[mappedSec]) ? cfg6.sectors[mappedSec].name : mappedSec;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor video Day 6 diubah ke: ' + secName + '. Kartu panduan Rekayasa & Finansial telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 6);
    }
  };

  window.renderDay0NonFieldTripModule = renderDay0NonFieldTripModule;
  window.renderDay1NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 1); };
  window.renderDay2NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 2); };
  window.renderDay3NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 3); };
  window.renderDay4NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 4); };
  window.renderDay5NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 5); };
  window.renderDay6NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 6); };
  window.renderDay7NonFieldTripModule = function(c) { renderNonFieldTripDayModule(c, 7); };
  window.renderGenericNonFieldTripModule = function(c, dayNum) { renderNonFieldTripDayModule(c, dayNum); };
  window.renderNonFieldTripDayModule = renderNonFieldTripDayModule;
  window.NFT_MATERI_CONFIG = NFT_MATERI_CONFIG;

})(window);
