/**
 * FINCESTEM 2026 - Modul Belajar Digital Khusus Peserta Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur (Day 1 s.d. Day 7)
 * File Terpisah (Modular Isolation) - Bebas Konflik dengan Modul Field Trip
 * Standar Tipografi: Rata Kanan-Kiri (text-justify) & Indentasi Rapi Peluru/Penomoran
 * Versi: 20261030_nft_materi_v3_full
 */

(function(window) {
  'use strict';

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
            '2. Unsur-unsur budaya (Tujuh Unsur Kebudayaan Universal):\n   - Bahasa\n   - Sistem pengetahuan\n   - Organisasi sosial\n   - Sistem mata pencaharian\n   - Sistem teknologi dan peralatan\n   - Sistem religi dan kepercayaan\n   - Kesenian'
          ],
          guidedPoints: [
            'Sebutkan pengertian, jelaskan, dan berikan contoh:\n1. Pengertian budaya (definisi umum & menurut para ahli)\n2. Unsur-unsur budaya (Tujuh Unsur Kebudayaan Universal):\n   - Bahasa\n   - Sistem pengetahuan\n   - Organisasi sosial\n   - Sistem mata pencaharian\n   - Sistem teknologi dan peralatan\n   - Sistem religi dan kepercayaan\n   - Kesenian'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian budaya dan rincian tujuh unsur kebudayaan universal (bahasa, pengetahuan, organisasi sosial, mata pencaharian, teknologi, religi, kesenian) di sini... (Minimal 300 karakter)',
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
          subtitle: 'Peralatan Tradisional, Mekanisasi Alsintan, Irigasi, Pascapanen & Otomatisasi IT',
          taskInstruction: 'Sebutkan pengertian, klasifikasi, dan berikan contoh:',
          items: [
            '1. Pengertian sistem teknologi dan peralatan',
            '2. Jenis teknologi pada sektor pertanian, perkebunan, peternakan, dan agroindustri/pengolahan:\n   - Peralatan dan perkakas tradisional (cangkul, sabit, bajak singkal, ani-ani)\n   - Mesin dan mekanisasi pertanian (traktor roda 2 & 4, mesin transplanter)\n   - Infrastruktur dan jaringan irigasi (Bendung Perjaya, saluran primer & sekunder BK Belitang)\n   - Teknologi penanaman padi (benih unggul, jajar legowo, pemupukan presisi)\n   - Teknologi panen dan pascapanen (combine harvester, bed dryer, penggilingan RMU)\n   - Teknologi informasi dan otomatisasi pertanian (timbangan digital, QRIS/BRILink, pemasaran digital)'
          ],
          guidedPoints: [
            'Sebutkan pengertian, klasifikasi, dan berikan contoh:\n1. Pengertian sistem teknologi dan peralatan\n2. Jenis teknologi pada sektor pertanian, perkebunan, peternakan, dan agroindustri/pengolahan:\n   - Peralatan dan perkakas tradisional (cangkul, sabit, bajak singkal, ani-ani)\n   - Mesin dan mekanisasi pertanian (traktor roda 2 & 4, mesin transplanter)\n   - Infrastruktur dan jaringan irigasi (Bendung Perjaya, saluran primer & sekunder BK Belitang)\n   - Teknologi penanaman padi (benih unggul, jajar legowo, pemupukan presisi)\n   - Teknologi panen dan pascapanen (combine harvester, bed dryer, penggilingan RMU)\n   - Teknologi informasi dan otomatisasi pertanian (timbangan digital, QRIS/BRILink, pemasaran digital)'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian sistem teknologi dan peralatan serta 6 klasifikasi teknologi dari tradisional hingga otomatisasi modern di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol "+ Tambah Sumber Rujukan Lain"):\n1. Contoh: Pedoman Pemanfaatan Alat dan Mesin Pertanian (Alsintan) Kementan RI / BBWS Sumatera VIII',
          defaultExp: 'Evolusi teknologi pertanian di OKU Timur berkembang pesat dari peralatan tradisional cangkul dan bajak singkal ditarik kerbau menuju modernisasi alsintan seperti traktor roda empat, transplanter penanam bibit, dan combine harvester perontok gabah. Mekanisasi ini didukung oleh pemeliharaan berkala saluran irigasi teknis Belitang dan inovasi pengeringan gabah bed dryer.',
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
    name: 'Perdagangan Sarana Pertanian & Sembako',
    badge: 'Kios Saprotan & Grosir',
    icon: 'storefront',
    desc: 'Kios Pupuk Bersubsidi, Toko Obat Pertanian, Sembako, Timbangan Digital & Margin Untung',
    cards: [
      {
        key: 'A',
        title: 'Science (Sains): Pengetahuan Jenis Pupuk, Obat Hama & Daya Simpan Barang',
        subtitle: 'Klasifikasi Pupuk Kimia/Organik, Obat Pembasmi Gulma/Hama & Pengaruh Kelembapan',
        guidedPoints: [
          'Jenis barang dagangan apa yang dijual di kios (pupuk bersubsidi urea/NPK, benih bersertifikat, obat semprot pestisida, atau sembako)?',
          'Apa fungsi dasar dari jenis pupuk atau obat tanaman yang paling laris dibeli petani?',
          'Bagaimana pedagang menjaga barang dagangan agar tidak rusak akibat kelembapan udara atau panas matahari?'
        ],
        placeholder: 'Jelaskan jenis pupuk/sarana pertanian yang dijual, fungsinya bagi tanaman, dan cara penyimpanannya di toko... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan di Kios Saprotan Desa / Buku Paket Kimia/Pertanian SMA',
        defaultExp: 'Kios sarana pertanian di Belitang melayani kebutuhan pupuk urea untuk pertumbuhan daun dan pupuk NPK Phonska untuk pembentukan buah padi. Pemilik kios menjaga gudang agar tetap kering dengan sirkulasi udara baik supaya karung pupuk tidak menyerap uap air dan tidak menggumpal keras.',
        defaultSources: '1. Pengamatan di Kios Pupuk Resmi Saprotan Belitang.\n2. Buku Petunjuk Penggunaan Pupuk dan Pestisida Pertanian.'
      },
      {
        key: 'B',
        title: 'Technology (Teknologi): Peralatan Toko, Timbangan Digital & Aplikasi Kasir',
        subtitle: 'Penggunaan Timbangan Digital Platform, Troli Angkut & Aplikasi Catatan Penjualan',
        guidedPoints: [
          'Alat bantu kerja apa saja yang digunakan di kios/toko (timbangan digital gantung/duduk, troli roda dorong karung, atau mesin kasir/HP)?',
          'Bagaimana timbangan digital membantu memastikan berat timbangan barang akurat dan tidak merugikan pembeli?',
          'Apakah toko sudah menggunakan aplikasi pembukuan atau aplikasi i-Pubers untuk menebus pupuk bersubsidi?'
        ],
        placeholder: 'Sebutkan alat bantu kerja yang digunakan di toko, fungsinya, dan kemudahan yang diberikan bagi pedagang... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Wawancara Pemilik Toko / Pengamatan Transaksi Kasir',
        defaultExp: 'Kios saprotan memanfaatkan timbangan digital platform berkapasitas 300 kg untuk menimbang karung pupuk dan benih secara cepat dan presisi. Dalam penyaluran pupuk bersubsidi, pemilik kios memakai smartphone dengan aplikasi i-Pubers berbasis barcode KTP petani yang terhubung langsung ke kementerian.',
        defaultSources: '1. Observasi Kios Pengecer Pupuk Resmi Bersubsidi Belitang.\n2. Modul Aplikasi Digital Penyaluran Pupuk Kementan.'
      },
      {
        key: 'C',
        title: 'Engineering (Rekayasa): Penataan Gudang Rapi & Sistem Bongkar Muat Barang',
        subtitle: 'Penyusunan Palet Kayu Penahan Lembap, Penataan Rak Barang & Jalur Angkut',
        guidedPoints: [
          'Kendala apa yang sering dialami di toko atau gudang (ruang sempit, karung pupuk berat sulit dipindahkan, atau risiko barang tertindih rusak)?',
          'Trik penataan apa yang dibuat pedagang (menyusun karung di atas palet kayu agar tidak menempel lantai semen, membuat rak bertingkat rapi)?',
          'Bagaimana trik tersebut membuat alur melayani pembeli menjadi lebih cepat dan aman?'
        ],
        placeholder: 'Uraikan cara pedagang menata barang di toko/gudang agar rapi, mudah diambil, dan aman dari kerusakan... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Pengamatan Tata Letak Gudang Toko / Diskusi dengan Pekerja Toko',
        defaultExp: 'Pemilik toko menyusun karung pupuk dengan pola saling mengunci di atas palet kayu setinggi 10 cm dari lantai agar terhindar dari rembesan air tanah. Jalur lorong selebar 1 meter dibuat di tengah gudang agar gerobak sorong dapat keluar-masuk membawa barang tanpa menyenggol tumpukan lain.',
        defaultSources: '1. Pengamatan Manajemen Pergudangan Toko Pertanian Belitang.\n2. Pedoman Praktis Tata Kelola Kios Dagang.'
      },
      {
        key: 'D',
        title: 'Mathematics (Matematika): Hitungan Modal Kulakan vs Margin Laba Penjualan',
        subtitle: 'Estimasi Modal Pembelian Barang Grosir dikali Margin Keuntungan Eceran',
        guidedPoints: [
          'Berapa harga modal beli barang dagangan dari distributor grosir pabrik?',
          'Berapa harga jual eceran ke petani dan berapa selisih keuntungan (margin laba) per karung atau per botol obat?',
          'Berapa perkiraan total keuntungan bersih per hari atau per bulan yang didapatkan dari toko tersebut?'
        ],
        placeholder: 'Tuliskan perbandingan harga beli dan harga jual barang, margin keuntungan, serta estimasi laba toko... (Minimal 80 karakter)',
        sourcePlaceholder: 'Contoh: Nota Pembelian Barang / Analisis Keuangan Usaha Dagang Sederhana',
        defaultExp: 'Kios membeli pupuk non-subsidi seharga Rp280.000 per karung isi 50 kg dan menjualnya kembali seharga Rp305.000 per karung (margin keuntungan Rp25.000 per karung). Jika dalam sehari terjual rata-rata 20 karung ditambah aneka obat pertanian, laba kotor harian mencapai Rp700.000 atau sekitar Rp18.000.000 per bulan.',
        defaultSources: '1. Catatan Penjualan Kios Pertanian Mitra Tani Belitang.\n2. Simulasi Laporan Laba Rugi Usaha Dagang SMA.'
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
      title: 'Modul Riset Day 7: Final Editing, Link Video YouTube & Audit Kas',
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

        if (localSec && cfg.sectors && cfg.sectors[localSec]) {
          selectedSector = localSec;
        } else if (dayNum >= 3 && dayNum <= 6) {
          // Fallback ke Day 2 jika belum diset
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
          if (d2Sec) {
            let mapped = String(d2Sec).toLowerCase().trim();
            if (mapped === 'pangan') mapped = 'pertanian';
            if (mapped === 'jasa') mapped = 'industri';
            if (mapped === 'keuangan') mapped = 'formal';
            if (cfg.sectors && cfg.sectors[mapped]) {
              selectedSector = mapped;
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
                <option value="pertanian" ${selectedSector === 'pertanian' ? 'selected' : ''}>1. Sektor Pertanian Padi Sawah (Lumbung Pangan Komering)</option>
                <option value="perkebunan" ${selectedSector === 'perkebunan' ? 'selected' : ''}>2. Sektor Perkebunan Rakyat (Karet &amp; Kelapa Sawit)</option>
                <option value="peternakan" ${selectedSector === 'peternakan' ? 'selected' : ''}>3. Sektor Peternakan Rakyat OKU Timur (Sapi, Kambing &amp; Unggas)</option>
                <option value="perikanan" ${selectedSector === 'perikanan' ? 'selected' : ''}>4. Sektor Perikanan Air Tawar (Sentra Patin &amp; Lele Belitang)</option>
                <option value="industri" ${selectedSector === 'industri' ? 'selected' : ''}>5. Sektor Agro-Industri Pangan (Pabrik RMU, Tahu &amp; Kemplang)</option>
                <option value="perdagangan" ${selectedSector === 'perdagangan' ? 'selected' : ''}>6. Sektor Perdagangan &amp; Saprotan (Kios Pupuk Bersubsidi, Grosir)</option>
                <option value="formal" ${selectedSector === 'formal' ? 'selected' : ''}>7. Sektor Jasa Keuangan Mikro (Agen BRILink, BUMDes, Jasa Usaha)</option>
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

    let curSec = 'pertanian';
    if (dayNum === 3) {
      curSec = localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    } else if (dayNum === 4) {
      curSec = localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    }

    const activeCardsForSubmit = ((dayNum === 3 || dayNum === 4) && cfg.sectors && cfg.sectors[curSec])
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
  const NFT_VIDEO_SECTORS_GUIDE = {
    pertanian: {
      key: 'pertanian',
      name: 'Pertanian Tanaman Pangan & Hortikultura',
      shortName: '🌾 Pertanian',
      badge: 'Sawah Padi, Jagung & Sayuran',
      icon: 'agriculture',
      objectExamples: 'Lahan Sawah Padi Irigasi BK, Kebun Jagung/Cabai/Sayuran, Gudang Alsintan atau Kilang Padi (RMU) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Pertanian',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera tanpa mewawancarai petani/pemilik lahan. Anda menyorot lokasi persawahan/pertanian dan peralatan kerja, lalu menjelaskan langsung kaitan Culture, Exploration Alat, serta 4 Unsur STEM (Science, Technology, Engineering, Mathematics).',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Pertanian',
            desc: 'Tampil di depan kamera di area persawahan/lahan tani atau tempat alat pertanian. Sebutkan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama lokasi lahan/tempat pertanian dan komoditas yang diamati (misal: padi sawah irigasi Belitang).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kerja & Kearifan Lokal Tani)',
            desc: 'Sorot suasana sekitar lahan sawah dan jelaskan secara mandiri budaya kerja petani di OKU Timur: tradisi gotong royong (sambatan/rewang), disiplin waktu turun ke sawah pagi hari, pembagian air irigasi bersama (P3A/Mitra Cai), atau sistem tanam serempak.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan, Mesin & APD Pertanian)',
            desc: 'Arahkan kamera menyorot langsung peralatan/mesin pertanian yang ada di lokasi (seperti cangkul, sabit bergerigi, sprayer elektrik, traktor tangan/rotary, pompa air, combine harvester, atau mesin giling RMU) beserta perlengkapan keselamatan kerja (APD: sepatu boot lumpur, caping/topi lebar, masker, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Pertanian (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk tanaman dan peralatan di lapangan, jelaskan keempat unsur STEM secara berurutan sesuai panduan di bawah ini (Sains biologi/fisika/kimia lahan & alat, Teknologi mekanisasi/benih, Rekayasa irigasi/jajar legowo/desain alat, dan Matematika kapasitas kerja & hasil panen).'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Produksi Pertanian dari Hulu ke Hilir',
            desc: 'Jelaskan secara ringkas tahapan proses kerja di lokasi tersebut: mulai dari pengolahan tanah, penyemaian, penanaman, pemupukan, pengendalian hama, hingga pemanenan dan penggilingan gabah menjadi beras.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum manfaat penerapan ilmu STEM dan peralatan modern dalam meringankan beban kerja petani di OKU Timur, lalu tutup video dengan salam santun.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan proses fotosintesis tanaman padi/sayuran, peran unsur hara pupuk (N, P, K) dan pH tanah sawah, siklus biologi hama/gulma, serta prinsip Fisika tekanan permukaan (P = F/A) pada roda besi traktor/crawler combine agar tidak amblas di lumpur dan tekanan udara/fluida pada nozzle sprayer.',
          technology: 'Jelaskan teknologi alat dan budidaya yang diamati: peralihan dari sabit/cangkul manual ke mesin Traktor Tangan, Sprayer Elektrik baterai Lithium, Combine Harvester, atau Mesin Penggilingan Padi (RMU), serta penggunaan varietas benih unggul bersertifikat (Inpari/Ciherang).',
          engineering: 'Jelaskan rekayasa tata ruang dan rancang bangun alat: rekayasa pola tanam Jajar Legowo (2:1 atau 4:1) untuk ruang tumbuh dan cahaya matahari, rekayasa saluran irigasi gravitasi (tersier/kuarter), serta desain kemiringan mata bajak/pisau pemotong mesin panen.',
          mathematics: 'Jelaskan hitungan matematis di lapangan: luas lahan (hektar atau rante), jarak tanam (misal 25 cm x 25 cm), takaran dosis pupuk per hektar, perbandingan kecepatan kerja mesin vs tenaga manual (jam/hektar), serta estimasi tonase hasil panen gabah per hektar.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Pertanian',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda kembali menjelaskan mandiri di depan kamera (tanpa wawancara narasumber) dengan memfokuskan bahasan pada perhitungan ekonomi/finansial usaha tani, analisis risiko/kendala lapangan, serta gagasan inovasi berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Pertanian yang Diamati',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah kelayakan Finansial, Kendala Risiko, dan Solusi Inovasi FINCESTEM pada objek pertanian yang Anda amati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Awal, Biaya Operasional, HPP & Keuntungan)',
            desc: 'Jelaskan di depan kamera rincian perputaran uang usaha tani per musim tanam: estimasi modal beli benih, pupuk, pestisida, BBM/sewa alsintan, upah panen, hingga perhitungan total penjualan gabah/beras (Omzet) dikurangi total biaya untuk mendapatkan Laba Bersih petani.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Alam & Masalah Pemasaran',
            desc: 'Tunjukkan kondisi di lapangan dan analisis kendala nyata yang dihadapi usaha pertanian tersebut: serangan hama wereng/tikus/jamur, cuaca ekstrem (banjir/kekeringan), kelangkaan/mahalnya pupuk, kerusakan mesin alsintan, atau anjloknya harga gabah basah saat panen raya.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan ide solusi kreatif Anda sebagai pelajar SMAN 1 Belitang: pemanfaatan jerami/sekam menjadi kompos/arang sekam (biochar), penggunaan pestisida nabati ramah lingkungan, pengeringan gabah/hilirisasi beras kemasan berlabel untuk menaikkan nilai jual, serta pencatatan pembukuan keuangan tani.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir Kelayakan Usaha & Penutup',
            desc: 'Simpulkan apakah usaha pertanian tersebut layak dan menguntungkan secara finansial jika dikelola dengan inovasi STEM yang tepat, lalu tutup video dengan salam.'
          }
        ],
        finPoints: {
          financial: 'Uraikan estimasi biaya tetap & biaya variabel per hektar/musim (benih, pupuk, obat pertanian, sewa traktor/combine, tenaga kerja), harga jual Gabah Kering Panen (GKP) vs Beras per kg, serta perhitungan Laba Bersih dan R/C Ratio.',
          constraints: 'Identifikasi masalah utama: penyusutan hasil panen (losses), serangan organisme pengganggu tanaman (OPT), ketergantungan pada tengkulak saat panen raya, atau tingginya biaya perawatan mesin.',
          innovation: 'Usulkan inovasi nilai tambah (added value): pengolahan gabah menjadi beras premium kemasan 5 kg/10 kg berlabel lokal OKU Timur, pemanfaatan limbah sekam/bekatul untuk pakan/pupuk organik, serta adopsi pembayaran/pencatatan kas digital.'
        }
      }
    },

    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Karet, Sawit & Komoditas',
      shortName: '🌴 Perkebunan',
      badge: 'Karet, Kelapa Sawit, Singkong & Buah',
      icon: 'forest',
      objectExamples: 'Kebun Karet Rakyat, Kebun Kelapa Sawit, Lahan Singkong/Tebu, atau Kebun Buah (Duku/Jeruk/Semangka) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perkebunan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda menjelaskan secara mandiri di area kebun (karet/sawit/buah) tanpa wawancara narasumber. Sorot pohon/tanaman kebun dan peralatan sadap/panen, lalu kupas aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Perkebunan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta tunjukkan lokasi kebun yang diamati (misal: kebun karet atau kelapa sawit rakyat di kecamatan Anda).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etos Kerja Pekebun & Tradisi Lokal)',
            desc: 'Jelaskan budaya kerja pekebun di OKU Timur: disiplin menyadap karet sejak subuh agar aliran lateks maksimal, budaya merawat piringan pohon, sistem bagi hasil kebun, atau kebersamaan saat panen dan penimbangan komoditas.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Sadap/Panen & APD Kebun)',
            desc: 'Sorot langsung peralatan kerja perkebunan: pisau sadap karet, talang dan mangkok lateks, bak pembeku, dodos, egrek bergalah aluminium/teleskopik, tojok besi, dan gerobak angkong, beserta APD pekebun (helm pelindung kepala, sepatu boot tinggi anti-duri/ular, sarung tangan karet/kulit, senter kepala).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perkebunan (Science, Technology, Engineering, Mathematics)',
            desc: 'Tunjukkan pohon dan alat perkebunan sambil memaparkan analisis Science, Technology, Engineering, dan Mathematics secara sistematis sesuai panduan sektor perkebunan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Proses Pemeliharaan, Panen & Pascapanen Kebun',
            desc: 'Jelaskan alur kerja di kebun: mulai dari pembersihan gulma piringan, pemupukan, proses penyadapan getah lateks / pemotongan tandan buah segar (TBS) sawit, pembekuan getah, hingga pengangkutan ke tempat pengumpulan.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Simpulkan peran penting pemahaman sains tanaman dan ketepatan rekayasa alat panen dalam menjaga umur tanaman perkebunan, lalu tutup dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan biologi pembuluh lateks dan tekanan turgor sel pohon karet yang tinggi di pagi hari (serta keharusan menjaga lapisan kambium batang), kriteria kematangan fisiologis buah sawit (brondolan merah-oranye kaya minyak CPO), kimia pembekuan (koagulasi) lateks dengan asam semut/asap cair, serta fisika tuas pengungkit pada angkong/tojok.',
          technology: 'Jelaskan teknologi peralatan kebun: penggunaan galah Egrek berbahan pipa Aluminium Alloy / Carbon Fiber yang ringan dan kaku dibanding bambu tradisional, baja karbon tinggi (per baja) pada mata dodos/pisau sadap, serta penggunaan bibit klon karet unggul (PB 260/IRR) atau bibit sawit bersertifikat.',
          engineering: 'Jelaskan rekayasa teknik di kebun: desain sudut kemiringan alur sadap karet (30°–45°) agar getah mengalir lancar ke mangkok tanpa merusak kayu, pola tanam segitiga sama sisi (mata lima) pada sawit agar tajuk daun mendapat cahaya merata, serta pembuatan lubang rorak penahan air dan kompos.',
          mathematics: 'Jelaskan perhitungan matematis kebun: populasi jumlah pohon per hektar (misal 130–143 pohon sawit/ha atau 450–500 pohon karet/ha), siklus rotasi panen (sadap 2 hari sekali atau panen sawit tiap 10–14 hari), berat rata-rata per tandan (kg), serta estimasi tonase hasil per bulan.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perkebunan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda membedah secara mandiri perhitungan biaya perawatan & pendapatan kebun, kendala fluktuasi harga/mutu komoditas, serta gagasan inovasi nilai tambah berbasis STEM dan Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perkebunan',
            desc: 'Sampaikan salam, identitas lengkap (Nama, NISN, Kelas, Fasilitator), dan tujuan video Day 6 untuk menganalisis aspek Finansial, Kendala, dan Solusi Inovasi pada kebun yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Biaya Perawatan, Panen, Harga Jual & Laba Bersih)',
            desc: 'Uraikan di depan kamera perhitungan ekonomi kebun per bulan: biaya pupuk NPK/Dolomit, herbisida, asam pembeku karet, upah penyadap/pemanen dan angkut, dibandingkan dengan hasil penjualan bokar/TBS sawit (kg x harga per kg) hingga diperoleh pendapatan bersih pekebun.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Lapangan & Risiko Usaha Perkebunan',
            desc: 'Jelaskan kendala nyata di kebun tersebut: penyakit gugur daun/jamur akar putih pada karet, penurunan produksi saat musim gugur daun/kemarau (trek), potongan timbangan (refraksi kadar air), kerusakan alat panen, atau fluktuasi harga karet/sawit dunia.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: penerapan bokar bersih (tanpa tatal/tanah) dengan pembeku asap cair agar kadar karet kering (KKK) tinggi dan dihargai mahal melalui Unit Pengolahan dan Pemasaran Bokar (UPPB/Lelang), pemanfaatan pelepah sawit cacah untuk pakan ternak/kompos, serta pola tumpang sari (intercropping).'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Rangkum bagaimana kombinasi manajemen mutu STEM dan tata kelola keuangan yang sehat mampu meningkatkan kesejahteraan pekebun OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Jelaskan rincian biaya pemeliharaan kebun (pupuk, perawatan piringan, perawatan alat), sistem bagi hasil atau upah panen, pengaruh persentase Kadar Karet Kering (KKK) / rendemen sawit terhadap harga jual per kg, serta hitungan laba bersih bulanan.',
          constraints: 'Analisis masalah utama: harga jual rendah akibat mutu bokar basah/kotor, serangan penyakit kulit sadap (kering alur sadap / KAS), mahalnya pupuk kimia, atau jalan kebun rusak saat musim hujan.',
          innovation: 'Gagasan inovasi: penggunaan koagulan ramah lingkungan (asap cair/asam format) untuk menghasilkan bokar bersih bernilai jual premium, penjualan kolektif lewat UPPB/Koperasi Desa, serta diversifikasi pendapatan kebun.'
        }
      }
    },

    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Sapi, Kambing & Unggas',
      shortName: '🐄 Peternakan',
      badge: 'Peternakan Sapi, Kambing, Ayam & Bebek',
      icon: 'pets',
      objectExamples: 'Peternakan Sapi, Kandang Kambing/Domba, Peternakan Ayam Petelur/Pedaging (Broiler), atau Budidaya Bebek/Itik di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Peternakan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di area kandang/peternakan tanpa wawancara pemilik. Sorot ternak, konstruksi kandang, dan peralatan pakan/sanitasi, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Peternakan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan lokasi kandang dan jenis hewan ternak yang Anda amati (peternakan sapi, kambing, ayam petelur/pedaging, atau bebek).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kerja Peternak & Etika Pemeliharaan)',
            desc: 'Jelaskan kebiasaan dan budaya kerja peternak di OKU Timur: kedisiplinan jadwal pemberian pakan dan minum pagi-sore, kebersihan sanitasi kandang agar tidak mengganggu warga sekitar, serta tradisi tabungan ternak keluarga untuk masa depan/hari raya.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Pakan, Kandang & APD Peternak)',
            desc: 'Sorot langsung peralatan peternakan di lokasi: sabit rumput, mesin pencacah rumput (chopper), tong/drum fermentasi silase, tempat pakan/minum otomatis (nipple drinker), pemanas brooder/kipas kandang, sprayer desinfektan, sekop kotoran, serta APD (sepatu boot kandang, masker penahan bau amonia, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Peternakan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjukkan kondisi kandang dan pakan, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor peternakan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Manajemen Pemeliharaan Harian di Kandang',
            desc: 'Jelaskan alur perawatan ternak harian: penyediaan/pencacahan pakan, pemberian air minum dan vitamin, pembersihan lantai kandang, hingga pengelolaan limbah kotoran ternak.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penerapan sains nutrisi dan rekayasa kandang sehat membuat ternak tumbuh optimal dan bebas penyakit, lalu tutup video dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan biologi sistem pencernaan dan nutrisi ternak (kebutuhan serat hijauan dan protein konsentrat), proses biokimia fermentasi anaerob oleh bakteri asam laktat (Lactobacillus) pada pembuatan pakan silase/fermentasi, pengendalian gas amonia (NH3) dari kotoran, serta biosekuriti pencegahan virus/bakteri.',
          technology: 'Jelaskan teknologi peternakan yang diamati: Mesin Chopper pencacah rumput berpenggerak motor bensin/diesel, instalasi air minum otomatis (Nipple Drinker), alat pengatur suhu pemanas (Brooder/Thermostat), teknologi Inseminasi Buatan (IB/kawin suntik) bibit unggul, atau reaktor Biogas.',
          engineering: 'Jelaskan rekayasa konstruksi kandang dan alat: desain kemiringan lantai kandang (2°–5°) agar urine dan air cucian langsung mengalir ke saluran pembuangan sehingga kuku/lantai tetap kering, rekayasa ventilasi atap (monitor) untuk sirkulasi udara segar, serta desain pisau putar pada mesin chopper.',
          mathematics: 'Jelaskan perhitungan matematis di kandang: takaran pakan harian (misal hijauan 10% dari bobot badan sapi, atau gram pakan per ekor ayam), kapasitas kandang (jumlah ekor per meter persegi), estimasi pertambahan bobot harian (ADG) atau persentase produksi telur harian (Hen Day Production).'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Peternakan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri struktur modal bibit/bakalan, biaya pakan harian, potensi keuntungan penjualan ternak/telur, kendala penyakit/pakan, serta solusi inovasi Zero-Waste berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Peternakan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan jelaskan fokus video Day 6 yaitu membedah analisis Finansial, Risiko Usaha, dan Inovasi Nilai Tambah pada peternakan yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Bibit, Biaya Pakan, Harga Jual & Laba Bersih)',
            desc: 'Paparkan di depan kamera perhitungan ekonomi peternakan: harga beli bibit/bakalan (DOC/pedet/bakalan sapi), biaya pakan harian (komponen biaya terbesar 60–70%), biaya obat/vaksin & listrik, dibandingkan dengan harga jual panen ternak/telur hingga didapat Laba Bersih.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Penyakit & Fluktuasi Harga Pakan',
            desc: 'Analisis tantangan nyata yang dihadapi peternak: mahalnya harga pakan konsentrat/pelet pabrikan, kesulitan mencari rumput segar saat musim kemarau, risiko penyakit ternak (PMK, kembung/bloat, tetelo/flu burung), atau bau limbah kotoran kandang.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Sampaikan ide inovasi Anda: pembuatan Bank Pakan Silase/Fermentasi dari limbah jerami padi atau pelepah sawit lokal OKU Timur untuk memangkas biaya pakan, pengolahan kotoran ternak menjadi Pupuk Organik Kompos/Bokashi Granul bernilai jual atau Biogas, serta budidaya Maggot BSF sebagai pakan alternatif unggas.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha peternakan tersebut dan bagaimana inovasi pengolahan pakan/limbah mampu melipatgandakan keuntungan peternak, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Hitung rincian modal pembelian bibit/bakalan, total biaya pakan selama satu siklus pemeliharaan, biaya kesehatan/operasional, rasio konversi pakan (FCR), total penerimaan penjualan, serta keuntungan bersih peternak.',
          constraints: 'Identifikasi kendala kritis: kenaikan harga pakan pabrikan yang menggerus margin laba, risiko kematian (mortalitas) akibat cuaca/penyakit, serta belum optimalnya pengolahan limbah kotoran.',
          innovation: 'Usulkan inovasi konkret: substitusi pakan dengan silase/fermentasi bahan baku lokal (jerami/dedak/bungkil), komersialisasi pupuk kandang bokashi kemasan karung untuk petani kebun, dan manajemen pencatatan keuangan kandang.'
        }
      }
    },

    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Budidaya Air Tawar',
      shortName: '🐟 Perikanan',
      badge: 'Kolam Patin, Lele, Nila & Gurame',
      icon: 'phishing',
      objectExamples: 'Kolam Tanah/Terpal Budidaya Ikan Patin, Lele, Nila, Gurame, Tempat Pembenihan Ikan, atau Usaha Pengolahan Ikan (Pindang/Asap/Kemplang) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perikanan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda menjelaskan mandiri di tepi kolam perikanan tanpa mewawancarai pemilik kolam. Sorot konstruksi kolam, air, ikan, dan peralatan perikanan, lalu uraikan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Kolam Perikanan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan lokasi kolam budidaya dan jenis ikan air tawar yang diamati (patin, lele, nila, atau gurame).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Budidaya Ikan & Kuliner Khas Komering)',
            desc: 'Jelaskan budaya masyarakat OKU Timur dalam memelihara ikan air tawar sebagai sumber protein utama dan bahan baku kuliner khas daerah (seperti pindang patin, tempoyak, pempek, dan kerupuk kemplang ikan), serta ketekunan pembudidaya menjaga kualitas air kolam.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Kolam, Aerasi, Pakan & APD)',
            desc: 'Sorot langsung peralatan perikanan di lokasi: pompa air listrik/alkon, pipa pemasukan (inlet) dan pembuangan (outlet/central drain), kincir air/blower aerator, jaring waring/hapa, bak sortir ukuran ikan (grading), timbangan pakan, alat ukur pH/suhu air, serta APD (sepatu boot air, topi/wearpack, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perikanan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk air kolam dan peralatan budidaya, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor perikanan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Tahapan Budidaya Ikan dari Tebar Benih hingga Panen',
            desc: 'Jelaskan siklus kerja di kolam: pengeringan dan pengapuran dasar kolam, pengisian air dan penumbuhan plankton, penebaran benih (bibit), jadwal pemberian pelet harian, penyortiran ukuran (grading), hingga pemanenan.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum betapa pentingnya pengendalian kualitas air berbasis sains dan rekayasa kolam bagi keberhasilan panen ikan di OKU Timur, lalu tutup dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan parameter fisika, kimia, dan biologi ekosistem kolam: kadar oksigen terlarut (DO > 5 ppm), derajat keasaman air (pH ideal 6,5–8,0), bahaya racun gas amonia (NH3) dari sisa pakan dan kotoran ikan di dasar kolam, peran fitoplankton/probiotik, serta sifat biologis ikan (seperti kanibalisme pada lele jika ukuran tidak seragam).',
          technology: 'Jelaskan teknologi akuakultur yang diamati: pompa air submersible/sentrifugal, kincir air atau aerator blower untuk menyuplai oksigen, teknologi pelet terapung hasil mesin ekstruder (agar pakan tidak tenggelam membusuk di lumpur), sensor pH/TDS meter digital, atau mesin pencetak pelet mandiri.',
          engineering: 'Jelaskan rekayasa rancang bangun kolam: konstruksi pematang/tanggul kolam tanah atau rangka kolam terpal bundar/persegi, desain kemiringan dasar kolam menuju pipa pembuangan tengah (central drain / pipa sifon standpipe) yang memanfaatkan tekanan hidrostatis untuk membuang endapan lumpur kotor, serta desain keranjang grading ramah lendir ikan.',
          mathematics: 'Jelaskan perhitungan matematis kolam: rumus volume air kolam (Panjang x Lebar x Kedalaman air, atau phi x r^2 x t), kepadatan tebar benih per meter persegi (misal 20–30 ekor patin/m2 atau 100 ekor lele/m2), persentase takaran pakan harian (3%–5% dari biomassa bobot ikan), serta tingkat kelulushidupan (Survival Rate / SR).'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perikanan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri modal benih, biaya pakan pelet, perhitungan FCR & keuntungan panen ikan, kendala kualitas air/harga pakan, serta gagasan inovasi pakan mandiri dan hilirisasi olahan ikan.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perikanan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini memfokuskan analisis pada Pilar Financial, Kendala Risiko, dan Solusi Inovasi FINCESTEM di sektor perikanan.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Benih, Biaya Pakan/FCR, Omzet Panen & Laba Bersih)',
            desc: 'Jelaskan di depan kamera rincian finansial satu siklus panen (3–6 bulan): biaya pembelian ribuan ekor benih ikan, total karung pakan pelet yang dihabiskan (beserta nilai FCR), biaya listrik pompa/kapur/probiotik, dibandingkan dengan hasil penjualan tonase ikan segar (kg x harga per kg) hingga diperoleh Laba Bersih.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Lapangan & Risiko Budidaya Ikan',
            desc: 'Analisis kendala nyata yang dihadapi pembudidaya: tingginya harga pelet pabrikan yang mencapai 70% dari biaya produksi, perubahan pH air mendadak saat hujan deras yang memicu stres/kematian ikan, penyakit jamur/bakteri Aeromonas, atau harga jual ikan mentah yang ditekan tengkulak.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: pembuatan pelet mandiri berbahan baku lokal (dedak halus, tepung ikan rucah, bungkil kedelai/ampas tahu, atau budidaya Maggot BSF & Azolla) untuk menghemat biaya pakan hingga 30%, aplikasi sistem Bioflok/Probiotik EM4 perikanan, serta pengolahan hasil panen menjadi produk bernilai tambah tinggi (fillet patin beku, bakso ikan, abon, atau kemplang).'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan usaha perikanan tersebut dan bagaimana efisiensi FCR pakan serta hilirisasi produk olahan mampu mendongkrak keuntungan pembudidaya di OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan perhitungan biaya benih, total biaya pakan pelet, perhitungan Feed Conversion Ratio (FCR = Total Pakan kg / Total Bobot Panen Ikan kg), Harga Pokok Produksi (HPP) per kg ikan vs harga jual pasar, serta Laba Bersih per siklus.',
          constraints: 'Identifikasi masalah utama: mahalnya harga pakan komersial, kematian benih di awal tebar, penurunan kualitas air (amonia tinggi/DO rendah), serta fluktuasi harga jual ikan konsumsi.',
          innovation: 'Usulkan inovasi STEM-Finansial: pakan alternatif berprotein tinggi (Maggot BSF / Azolla / pelet mandiri), manajemen air probiotik/central drain untuk menekan FCR ke angka 1,0–1,2, serta diversifikasi produk olahan ikan khas OKU Timur.'
        }
      }
    },

    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan, Pasar, Toko & UMKM Kuliner',
      shortName: '🏪 Perdagangan & UMKM',
      badge: 'Pasar, Toko Sembako, Warung & Kuliner',
      icon: 'storefront',
      objectExamples: 'Toko Sembako/Grosir, Kios Pasar Tradisional (Gumawang/Martapura/Belitang), Warung Makan/UMKM Kuliner, Toko Bangunan, atau Toko Sarana Pertanian di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perdagangan / UMKM',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi toko/warung/tempat usaha UMKM tanpa mewawancarai pemilik/pedagang. Sorot penataan barang, peralatan dagang/produksi, dan fasilitas pembayaran, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Toko / UMKM',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama toko/warung/unit UMKM, lokasi desa/kecamatan, dan jenis barang dagangan atau produk kuliner yang dijual.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etika Pelayanan, Kejujuran Dagang & Budaya Konsumen Lokal)',
            desc: 'Jelaskan budaya pelayanan di tempat usaha tersebut: keramahan menyapa pembeli (senyum, sapa, santun adat lokal), kejujuran takaran timbangan, keunikan cita rasa kuliner lokal yang disukai warga OKU Timur, serta hubungan saling percaya antara pedagang dan pelanggan tetap.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Ukur, Display, Kemasan & Higienitas)',
            desc: 'Sorot langsung peralatan kerja di toko/UMKM: timbangan digital/mekanik, mesin kasir/kalkulator, barcode QRIS, etalase kaca/rak display barang, lemari pendingin (showcase/freezer), alat pengemas (hand sealer/vacuum sealer), kompor/alat masak UMKM, serta perlengkapan kebersihan/APD (celemek/apron, sarung tangan plastik makanan, penjepit makanan, masker).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perdagangan & UMKM (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk produk dan peralatan toko/UMKM, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor perdagangan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Pengadaan Stok, Penyimpanan & Pelayanan Pembeli',
            desc: 'Jelaskan bagaimana alur operasional usaha tersebut berjalan setiap hari: mulai dari belanja bahan baku/stok barang dari distributor, pemeriksaan kualitas, penataan di rak/etalase, hingga proses melayani transaksi pembeli.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penerapan sains pengawetan produk, teknologi timbangan/kasir digital, dan tata ruang toko membuat usaha perdagangan/UMKM berjalan higienis dan profesional, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan aspek Sains pada produk dan penyimpanan: pengendalian suhu dingin (termodinamika lemari pendingin/freezer 0°–4°C) untuk menghambat pertumbuhan bakteri pembusuk pada bahan pangan/minuman, perlindungan produk kering (beras/tepung/kerupuk) dari kelembaban udara dan jamur (oksidasi/ketengikan minyak), serta standar higienitas pangan.',
          technology: 'Jelaskan teknologi perdagangan yang digunakan: pemakaian Timbangan Digital bersensor Load Cell yang akurat hingga satuan gram, mesin perekat kemasan plastik (Impulse Heat Sealer), penggunaan kode pembayaran digital QRIS / aplikasi kasir POS di smartphone, serta pemanfaatan media sosial (WhatsApp/Facebook/Instagram) untuk katalog dan pesan-antar.',
          engineering: 'Jelaskan rekayasa tata letak (Layout Engineering) dan kemasan: rekayasa penataan rak barang dengan prinsip FIFO (First In First Out — barang yang masuk lebih dulu diletakkan di bagian depan agar terjual lebih dulu sebelum kedaluwarsa), pengelompokan barang sesuai kategori, sirkulasi udara/pencahayaan ruang toko, serta desain kemasan kedap udara.',
          mathematics: 'Jelaskan penerapan Matematika di toko/UMKM: konversi satuan berat dan volume (ton, kuintal, karung 50 kg, lusin, gros ke eceran kilogram/ons/liter), perhitungan stok persediaan minimum (reorder point) agar barang laris tidak kehabisan, serta kecepatan perputaran barang harian.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perdagangan / UMKM',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda membedah secara mandiri perputaran modal kulakan/bahan baku, perhitungan Harga Pokok Penjualan (HPP), margin keuntungan per produk, kendala persaingan/barang rusak, serta inovasi digitalisasi dan kemasan UMKM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perdagangan / UMKM',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini mengupas tuntas analisis Finansial, Risiko Usaha, dan Inovasi Pengembangan pada toko/UMKM yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Kulakan, HPP, Margin Keuntungan & Omzet Harian)',
            desc: 'Jelaskan di depan kamera perhitungan keuangan toko/UMKM: modal belanja stok barang/bahan baku (HPP), biaya operasional (listrik freezer/lampu, plastik kemasan, gas, transportasi), cara menentukan harga jual (persentase markup/margin laba per item, misal 10%–30%), hingga estimasi omzet kotor dan Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Usaha, Risiko Barang Rusak & Persaingan Pasar',
            desc: 'Analisis kendala nyata yang dihadapi usaha tersebut: risiko barang kedaluwarsa/ penyusutan (shrinkage) atau makanan basi jika tidak habis terjual, kenaikan harga bahan baku pokok dari distributor, piutang pembeli yang kasbon/macet, pencatatan uang usaha yang masih tercampur dengan uang dapur keluarga, atau persaingan dengan ritel modern/toko online.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan gagasan solusi Anda: pemisahan tegas antara rekening/kas usaha dengan keuangan pribadi rumah tangga, penerapan pembukuan kas harian digital, inovasi pengemasan modern berlabel merek dan izin PIRT/Halal agar tahan lama dan bernilai jual lebih tinggi, penyediaan pembayaran non-tunai QRIS, serta layanan pesan-antar (delivery order) via WhatsApp Bisnis.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial toko/UMKM tersebut dan bagaimana inovasi manajemen stok STEM serta disiplin pembukuan keuangan dapat membuat usaha naik kelas, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Jelaskan perhitungan Harga Pokok Penjualan (HPP), selisih harga beli grosir vs harga jual eceran (Margin Laba Kotor), biaya operasional bulanan, perhitungan titik impas (Break Even Point / BEP), serta estimasi Laba Bersih usaha.',
          constraints: 'Identifikasi masalah utama: tercampurnya uang modal usaha dengan pengeluaran pribadi keluarga, barang rusak/kedaluwarsa karena kurang kontrol stok, piutang/bon pelanggan yang menghambat perputaran kas, atau kemasan produk yang masih sederhana.',
          innovation: 'Usulkan inovasi konkret: manajemen stok FIFO terstruktur, redesain kemasan kedap udara berlabel menarik untuk memperpanjang masa simpan (shelf-life), adopsi pembayaran QRIS, dan promosi digital lokal.'
        }
      }
    },

    keuangan: {
      key: 'keuangan',
      name: 'Koperasi, Agen BRI-Link & Jasa Keuangan',
      shortName: '🏦 Koperasi & BRI-Link',
      badge: 'Agen BRI-Link, Koperasi, BUMDes & Bank',
      icon: 'account_balance',
      objectExamples: 'Gerai Agen BRI-Link / Agen Laku Pandai Perbankan, Koperasi Simpan Pinjam / KUD / Koperasi Sekolah, atau Unit Jasa Keuangan BUMDes di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Koperasi / BRI-Link',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi gerai Agen BRI-Link / Koperasi / BUMDes tanpa mewawancarai pengelola/nasabah. Sorot ruang layanan, spanduk tarif/informasi, dan perangkat transaksi, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Koperasi / Agen BRI-Link',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama gerai Agen BRI-Link / Koperasi / BUMDes, lokasi desa/kecamatan, dan jenis layanan keuangan yang tersedia bagi warga.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kepercayaan, Inklusi Keuangan & Kekeluargaan)',
            desc: 'Jelaskan nilai budaya di lembaga keuangan mikro/agen perbankan desa: pentingnya integritas dan kepercayaan (trust) dalam memegang amanah uang masyarakat, asas kekeluargaan dan gotong royong pada koperasi, serta bagaimana kehadiran Agen BRI-Link/Koperasi membantu petani dan warga desa bertransaksi dekat rumah tanpa harus jauh ke bank di pusat kota.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Perangkat Transaksi, Keamanan & Sarana Layanan)',
            desc: 'Sorot langsung peralatan kerja di gerai (tanpa merekam data rahasia/PIN nasabah): mesin EDC (Electronic Data Capture) / Android POS, printer struk termal Bluetooth, mesin penghitung uang (money counter), lampu UV pendeteksi uang asli/palsu, brankas/laci kas berpelindung, kamera pengawas CCTV, papan informasi tarif resmi, serta buku/aplikasi register transaksi.'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Koperasi & BRI-Link (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk perangkat layanan di lokasi, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics pada jasa keuangan sesuai panduan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Layanan Transaksi Keuangan Masyarakat',
            desc: 'Jelaskan ragam layanan yang berjalan setiap hari: setor dan tarik tunai tabungan, transfer antarbank, pembayaran tagihan listrik PLN/token, BPJS, cicilan, top-up dompet digital, penyaluran bantuan pemerintah, atau layanan simpanan dan pinjaman modal usaha di koperasi.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Simpulkan peran teknologi finansial (fintech) dan sains pengamanan uang dalam mempercepat perputaran ekonomi masyarakat pedesaan OKU Timur, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan prinsip Sains (Fisika Optik & Kimia Material) pada peralatan keuangan: pemanfaatan gelombang sinar Ultraviolet (UV) untuk memendarkan tinta fosfor dan benang pengaman saat menguji keaslian uang kertas Rupiah (3D: Dilihat, Diraba, Diterawang), serta reaksi kimia pemanasan pada kertas struk termal (thermal paper) yang mencetak tulisan tanpa tinta cair.',
          technology: 'Jelaskan Teknologi Finansial (Fintech & Telekomunikasi) yang bekerja: sistem mesin EDC dan aplikasi mobile banking agen yang membaca chip kartu ATM/debit, transmisi data transaksi terenkripsi secara real-time melalui jaringan seluler 4G/Wi-Fi ke server pusat bank, pemindaian kode matriks QRIS, serta printer termal nirkabel (Bluetooth).',
          engineering: 'Jelaskan Rekayasa Sistem Keamanan & Tata Ruang Layanan (Security & Service Engineering): desain tata letak meja loket berteralis/kaca pelindung, penempatan sudut pandang kamera CCTV yang mengawasi area transaksi, penyimpanan brankas kas yang aman, serta rekayasa alur antrean dan verifikasi berlapis (kartu + PIN + bukti struk cetak) agar bebas salah kirim.',
          mathematics: 'Jelaskan penerapan Matematika Keuangan di gerai: ketelitian menghitung nominal pecahan uang tunai dengan cepat, perhitungan struktur biaya administrasi (fee) per tingkatan nominal transaksi, perhitungan persentase jasa simpan-pinjam atau pembagian Sisa Hasil Usaha (SHU) di koperasi, serta rekonsiliasi pencocokan saldo kas fisik vs saldo mutasi digital.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Koperasi / BRI-Link',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri manajemen modal likuiditas (saldo rekening vs uang tunai di laci), perhitungan pendapatan dari fee transaksi/SHU, evaluasi risiko uang palsu/penipuan/kredit macet, serta solusi inovasi literasi keuangan.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Koperasi / Agen BRI-Link',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah model bisnis Finansial, Manajemen Risiko, dan Inovasi Layanan pada Agen BRI-Link / Koperasi yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Manajemen Modal Likuiditas, Fee Transaksi/SHU & Laba Bersih)',
            desc: 'Jelaskan di depan kamera bagaimana usaha jasa keuangan memperoleh keuntungan: keseimbangan modal kerja antara Saldo Mengendap di Rekening Bank (untuk melayani setor tunai/transfer) dan Uang Tunai Fisik di Laci (untuk melayani tarik tunai), perhitungan pendapatan dari biaya admin (fee per transaksi x jumlah transaksi harian, dikurangi bagi hasil fee ke bank pusat), serta biaya operasional (kuota internet, kertas struk, listrik) hingga didapat Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Operasional & Risiko Keamanan Keuangan',
            desc: 'Analisis risiko dan kendala nyata di lapangan: gangguan sinyal internet/server bank saat jam sibuk, kehabisan uang tunai (likuiditas) saat musim panen raya ketika banyak petani tarik tunai besar, risiko peredaran uang palsu, modus penipuan bukti transfer palsu (struk editan), atau risiko kredit macet (NPL) pada pinjaman koperasi.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: penerapan SOP ketat "Cek Mutasi Masuk di Aplikasi Sebelum Serahkan Uang Tunai" dan wajib uji lampu UV pada setiap uang masuk, penyediaan koneksi internet cadangan (dual-provider), sistem pencatatan buku kas ganda (digital & manual) untuk tutup buku harian, serta edukasi literasi keuangan dan tabungan hasil panen bagi warga desa.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha Agen BRI-Link/Koperasi tersebut dan perannya sebagai penggerak inklusi keuangan di Kabupaten OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan manajemen perputaran modal likuiditas (kas tunai vs saldo rekening), rata-rata jumlah transaksi harian dikalikan tarif jasa (fee admin) atau margin jasa simpan-pinjam koperasi, biaya operasional bulanan, serta estimasi Laba Bersih.',
          constraints: 'Identifikasi risiko utama: ketidakseimbangan kas saat penarikan tunai membludak, gangguan jaringan internet/EDC error, ancaman uang palsu dan penipuan rekayasa sosial (social engineering), atau tunggakan angsuran anggota koperasi.',
          innovation: 'Usulkan inovasi STEM-Finansial: protokol verifikasi mutasi real-time & detektor UV wajib, integrasi layanan pembayaran berbagai tagihan satu pintu (one-stop payment), pembukuan rekonsiliasi kas harian otomatis, dan program edukasi gemar menabung/anti-pinjol ilegal.'
        }
      }
    },

    jasa: {
      key: 'jasa',
      name: 'Jasa Teknik, Bengkel & Produksi Kerajinan',
      shortName: '🔧 Jasa & Kerajinan',
      badge: 'Bengkel Motor/Alsintan, Las & Kerajinan',
      icon: 'build',
      objectExamples: 'Bengkel Sepeda Motor/Mobil/Alsintan, Bengkel Las & Bubut, Usaha Pertukangan/Meubel Kayu, Percetakan/Fotokopi, Barbershop/Salon, atau Produksi Kerajinan/Batu Bata di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Jasa Teknik / Kerajinan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi bengkel/tempat jasa teknik/produksi kerajinan tanpa mewawancarai mekanik/pemilik. Sorot peralatan kerja, mesin, dan proses pengerjaan, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Usaha Jasa / Kerajinan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama bengkel/usaha jasa teknik/kerajinan, lokasi desa/kecamatan, dan jenis layanan atau produk yang dikerjakan.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etos Kerja Ketelitian, Kejujuran Servis & Kepuasan Pelanggan)',
            desc: 'Jelaskan budaya kerja pada usaha jasa/teknik tersebut: ketelitian dan kesabaran dalam mendiagnosis kerusakan atau merakit produk, kejujuran mengganti suku cadang asli (tidak membohongi pelanggan), ketepatan waktu pengerjaan, serta budaya menjaga kerapian tempat kerja.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Perkakas Kerja, Mesin & APD Keselamatan Kerja K3)',
            desc: 'Sorot langsung peralatan kerja di lokasi: kunci pas/ring/shock (torsi), kompresor udara, mesin las listrik (inverter), gerinda tangan, mesin bor/gergaji ukir, alat ukur (jangka sorong/mikrometer/multimeter/meteran), serta Alat Pelindung Diri (APD K3: topeng/kacamata las, kacamata pelindung percikan gerinda, sarung tangan kulit, sepatu safety/tertutup, masker debu/asap).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Jasa Teknik & Kerajinan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk peralatan bengkel/produksi, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor jasa teknik di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Pengerjaan Servis / Produksi dari Awal hingga Selesai',
            desc: 'Jelaskan tahapan kerja di tempat tersebut: mulai dari penerimaan pesanan/pemeriksaan keluhan pelanggan, pengukuran bahan/pembongkaran komponen, proses perbaikan/perakitan/pengelasan, hingga uji coba akhir (quality control).'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penguasaan ilmu fisika mekanika, teknologi mesin perkakas, dan keselamatan kerja K3 menjadi kunci utama keberhasilan usaha jasa teknik/kerajinan di OKU Timur, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan prinsip Sains (Fisika & Kimia) yang bekerja: hukum momen gaya/torsi (tau = F x r) saat mengencangkan baut dengan kunci bergagang panjang, hukum Boyle dan tekanan udara pada tabung kompresor, perpindahan panas dan peleburan logam (metalurgi) oleh busur listrik pada mesin las, fungsi kimia oli pelumas untuk mengurangi gaya gesek dan keausan mesin, serta bahaya sinar UV/percikan api tanpa APD.',
          technology: 'Jelaskan Teknologi Peralatan yang digunakan: mesin las inverter hemat daya berbasis komponen elektronika IGBT, perkakas listrik putaran tinggi (power tools: gerinda, bor listrik, impact wrench baterai), kompresor otomatis ber-pressure switch, atau alat scanner injeksi/multimeter digital.',
          engineering: 'Jelaskan Rekayasa Teknik (Mechanical & Structural Engineering): proses troubleshooting (mencari sumber kerusakan mesin secara sistematis), rekayasa penyambungan rangka besi/kayu dengan sudut siku presisi agar konstruksi kuat menahan beban, serta penataan papan perkakas (tool rack) yang ergonomis.',
          mathematics: 'Jelaskan perhitungan Matematika Teknik di lapangan: ketelitian pengukuran dimensi bahan dalam satuan milimeter (mm), sentimeter, atau inci menggunakan meteran/jangka sorong, perhitungan sudut potong (45° atau 90°), rasio perbandingan campuran bahan (misal cat dengan tiner atau semen dengan pasir), serta estimasi waktu pengerjaan per unit.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Jasa Teknik / Kerajinan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri struktur biaya investasi alat, biaya bahan habis pakai/suku cadang, tarif jasa keahlian, kendala operasional/K3, serta gagasan inovasi layanan berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Jasa Teknik / Kerajinan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah analisis Finansial, Evaluasi Kendala, dan Solusi Inovasi pada usaha jasa teknik/bengkel/kerajinan yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Peralatan, Biaya Bahan/Suku Cadang, Tarif Jasa & Laba)',
            desc: 'Jelaskan di depan kamera perhitungan keuangan usaha jasa/kerajinan: investasi awal pembelian mesin/perkakas kerja (dan biaya penyusutan/perawatannya), biaya variabel bahan habis pakai (kawat las, mata gerinda, oli, suku cadang, kayu/besi, tagihan listrik), cara menentukan tarif ongkos jasa servis/harga jual produk, hingga estimasi pendapatan kotor dan Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Kecelakaan Kerja (K3) & Pemasaran',
            desc: 'Analisis kendala nyata yang dihadapi usaha tersebut: pemadaman listrik atau daya listrik tidak stabil saat mengelas/mengoperasikan mesin, keausan/kerusakan mata perkakas, kenaikan harga bahan baku besi/suku cadang, kurangnya kesadaran memakai APD lengkap (risiko sakit mata/terluka), atau fluktuasi jumlah pelanggan harian.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan gagasan solusi Anda: penerapan standar Keselamatan dan Kesehatan Kerja (K3) wajib dan penataan bengkel metode 5R (Ringkas, Rapi, Resik, Rawat, Rajin) agar kerja lebih cepat dan aman, daur ulang sisa potongan besi/kayu (scrap) menjadi produk kerajinan bernilai jual tambahan, pemberian garansi servis dan pengingat servis berkala via WhatsApp, serta pencatatan nota digital.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha jasa teknik/kerajinan tersebut dan bagaimana kombinasi keahlian STEM, disiplin K3, serta manajemen keuangan yang rapi dapat mengembangkan usaha, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan pemisahan antara harga modal suku cadang/bahan baku dengan pendapatan murni Ongkos Jasa Keahlian, perhitungan biaya listrik & perawatan alat (penyusutan), serta kalkulasi Laba Bersih bulanan.',
          constraints: 'Identifikasi masalah utama: risiko kecelakaan kerja akibat abai memakai APD (kacamata las/gerinda), penumpukan limbah sisa bahan/oli bekas, keterbatasan peralatan modern, atau pencatatan keuangan yang belum rapi.',
          innovation: 'Usulkan inovasi STEM-Finansial: tata kelola bengkel standar 5R & K3, pemanfaatan limbah potongan bahan menjadi produk kreatif bernilai ekonomis, katalog portofolio hasil karya/jasa di media sosial, serta sistem kartu pelanggan/pengingat servis.'
        }
      }
    }
  };

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
    const candidateSec = (savedOfficial && savedOfficial.selectedSector) ||
                         (draft && draft.selectedSector) ||
                         localStorage.getItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
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

    const sectorKeys = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'perdagangan', 'keuangan', 'jasa'];

    container.innerHTML = `
      <div class="flex flex-col gap-5 pb-12 max-w-4xl mx-auto w-full">

        <!-- BANNER STATUS TERKIRIM JIKA SUDAH SUBMIT -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-emerald-800 tracking-wider">Modul Panduan Video Day ${dayNum} Tuntas</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Resume &amp; Rencana Video Day ${dayNum} Telah Tersimpan Resmi ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5 leading-relaxed">
                  Sektor Pilihan: <strong>${escapeHtml(secGuide.name)}</strong>. Anda tetap dapat membaca panduan urutan video di bawah ini atau langsung menuju LKPD Day ${dayNum} untuk mengumpulkan link YouTube.
                </p>
              </div>
            </div>
            <a href="lkpd.html?day=${dayNum}" class="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer transition-all">
              <span>Buka LKPD Day ${dayNum}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ` : ''}

        <!-- HEADER MODUL PANDUAN VIDEO DAY 5 / DAY 6 -->
        <div class="bg-gradient-to-br ${headerGradient} rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col gap-3.5 border">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-amber-200 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">smart_display</span>
                <span>Non-Field Trip • Modul Day ${dayNum}</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeColor}">
                ${isDay5 ? 'Video Observasi Lapangan & 4 Unsur STEM (5–10 Menit)' : 'Video Analisis Finansial, Risiko & Inovasi (5–10 Menit)'}
              </span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Modul Selesai' : 'Panduan Produksi Video YouTube'}
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              ${isDay5
                ? 'Modul Day 5: Panduan Pembuatan Video Observasi Culture, Exploration Alat & Penerapan STEM'
                : 'Modul Day 6: Panduan Pembuatan Video Analisis Financial, Evaluasi Kendala & Inovasi Solusi'}
            </h1>
            <p class="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-medium mt-1.5 text-justify">
              ${isDay5
                ? 'Pada Day 5 ini, Anda ditugaskan membuat video observasi lapangan berdurasi minimal 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube. Pilih salah satu dari 7 sektor usaha di bawah ini untuk memunculkan panduan urutan isi video menit demi menit!'
                : 'Pada Day 6 ini, Anda melanjutkan pembuatan video analisis berdurasi minimal 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube dengan fokus membedah perputaran modal/keuntungan (Financial), kendala usaha, dan solusi inovasi FINCESTEM pada sektor pilihan Anda.'}
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Nama Peserta Didik</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentName)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentNisn)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Kelas / Rombel</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentClass)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Guru Fasilitator</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(fasilName)}</span>
            </div>
          </div>
        </div>

        <!-- ATURAN TEKNIS VIDEO YOUTUBE (5-10 MENIT, TANPA WAWANCARA) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-950 flex flex-col gap-2.5 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-900">
            <span class="material-symbols-outlined text-rose-600 text-lg">videocam</span>
            <span>KETENTUAN WAJIB PEMBUATAN VIDEO YOUTUBE DAY ${dayNum}:</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center shrink-0">5-10m</span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Durasi Minimal 5–10 Menit</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Rekam penjelasan secara utuh dan runtut mengikuti panduan menit ke menit.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-base">person_Check</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Tanpa Wawancara Narasumber</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Tidak perlu mewawancarai pemilik usaha. Anda sendiri yang menjelaskan &amp; menyorot objek/alat!</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-base">cloud_upload</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Upload ke YouTube</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Setel visibilitas ke <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong>, lalu kirim link-nya di LKPD.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- LANGKAH 1: PILIH MENU SEKTOR USAHA (7 PILIHAN INTERAKTIF) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-500/50 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Pilih Sektor Objek Video Anda (Klik Salah Satu Menu):</h2>
                <p class="text-[11px] text-slate-500 font-medium">Begitu Anda memilih menu sektor di bawah ini, panduan urutan video dan materi bahasan akan otomatis menyesuaikan!</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-300">
              Terpilih: ${escapeHtml(secGuide.shortName)}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            ${sectorKeys.map(k => {
              const s = NFT_VIDEO_SECTORS_GUIDE[k];
              const isAct = (k === selectedSector);
              return `
                <button type="button" onclick="selectNftVideoSector(${dayNum}, '${k}')" class="text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${isAct ? 'bg-teal-50/70 border-teal-600 ring-2 ring-teal-500/30 shadow-md' : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50/60'}">
                  <div class="flex items-center justify-between gap-1.5 w-full">
                    <span class="w-9 h-9 rounded-xl ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0">
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
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-400/70 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">2</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">${escapeHtml(dayGuide.focusTitle)}</h2>
                <p class="text-[11px] text-slate-600 font-medium">Ikuti urutan langkah menit demi menit berikut saat Anda berbicara dan mengambil gambar di lapangan:</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300">
              Durasi Total: 5 – 10 Menit
            </span>
          </div>

          <p class="text-xs text-slate-700 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 leading-relaxed font-medium text-justify">
            💡 <strong>Intisari Tugas Video Day ${dayNum}:</strong> ${escapeHtml(dayGuide.summaryFocus)}
          </p>

          <!-- Daftar Segmen Menit ke Menit -->
          <div class="grid grid-cols-1 gap-3">
            ${dayGuide.segments.map((seg, idx) => `
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-start gap-3 hover:border-amber-400 transition-all">
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono font-black text-xs shrink-0 self-start flex items-center gap-1.5 shadow-2xs">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>${escapeHtml(seg.time)}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-black text-xs sm:text-sm text-slate-900">${escapeHtml(seg.title)}</h4>
                  <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">${escapeHtml(seg.desc)}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Rincian Materi Spesifik Sektor yang Harus Dijelaskan di Dalam Video -->
          ${isDay5 ? `
            <div class="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">science</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">ConTek / Panduan Materi 4 Unsur STEM Sektor ${escapeHtml(secGuide.shortName)} (Untuk Dijelaskan pada Menit 03:45 – 06:30):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                  <div class="font-black text-sky-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-sky-600 text-white flex items-center justify-center text-[11px]">S</span>
                    <span>SCIENCE (Sains — Fisika, Kimia, Biologi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.science)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
                  <div class="font-black text-teal-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[11px]">T</span>
                    <span>TECHNOLOGY (Teknologi Alat &amp; Digital)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.technology)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <div class="font-black text-amber-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px]">E</span>
                    <span>ENGINEERING (Rekayasa Desain &amp; Konstruksi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.engineering)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <div class="font-black text-purple-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[11px]">M</span>
                    <span>MATHEMATICS (Kalkulasi &amp; Efisiensi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.mathematics)}</p>
                </div>
              </div>
            </div>
          ` : `
            <div class="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">payments</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">ConTek / Panduan Materi Analisis Finansial &amp; Inovasi Sektor ${escapeHtml(secGuide.shortName)} (Untuk Dijelaskan di Video Day 6):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div class="font-black text-emerald-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-emerald-700">account_balance_wallet</span>
                    <span>1. Analisis Pilar Financial</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.financial)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                  <div class="font-black text-rose-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-rose-700">warning</span>
                    <span>2. Evaluasi Kendala &amp; Risiko</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.constraints)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <div class="font-black text-indigo-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-indigo-700">lightbulb</span>
                    <span>3. Solusi &amp; Inovasi FINCESTEM</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.innovation)}</p>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- LANGKAH 3: FORM RESUME & RENCANA ALUR VIDEO SISWA (SYARAT MEMBUKA LKPD) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-black text-sm shadow-xs">3</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Isi Resume &amp; Rencana Video Day ${dayNum} Anda</h2>
                <p class="text-[11px] text-slate-500 font-medium">Tuliskan objek yang akan Anda rekam beserta ringkasan poin penjelasan Anda untuk membuka LKPD Day ${dayNum}.</p>
              </div>
            </div>
            <span id="badgeVideoModStatusD${dayNum}" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black ${isSubmitted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
              ${isSubmitted ? '✓ Tersimpan Resmi' : 'Wajib Diisi'}
            </span>
          </div>

          <input type="hidden" id="nftVideoModSectorD${dayNum}" value="${escapeHtml(selectedSector)}">

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-800">
              Nama Objek / Tempat Usaha pada Sektor ${escapeHtml(secGuide.shortName)} yang Akan/Telah Anda Rekam: <span class="text-rose-600">*</span>
            </label>
            <input type="text" id="nftVideoModObjectD${dayNum}" value="${escapeHtml(savedObjectName)}" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="Contoh: ${escapeHtml(secGuide.objectExamples.split(',')[0])} di Desa ..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">
          </div>

          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <label class="text-xs font-bold text-slate-800">
                ${isDay5
                  ? 'Resume Rencana Alur Video Day 5 (Peralatan yang Disorot & Poin Science, Technology, Engineering, Mathematics yang Dijelaskan):'
                  : 'Resume Rencana Alur Video Day 6 (Rincian Modal/Laba Financial, Kendala Usaha & Ide Solusi Inovasi yang Dijelaskan):'} <span class="text-rose-600">*</span>
              </label>
              <span id="counterVideoModD${dayNum}" class="text-[11px] font-bold text-slate-500">Min. 80 karakter</span>
            </div>
            <textarea id="nftVideoModResumeD${dayNum}" rows="5" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="${isDay5
              ? 'Tuliskan ringkasan rencana isi video Day 5 Anda: peralatan apa saja yang akan Anda tunjukkan di kamera, serta apa poin Sains, Teknologi, Rekayasa (Engineering), dan Matematika yang akan Anda jelaskan pada sektor ' + secGuide.shortName + '... (Minimal 80 karakter)'
              : 'Tuliskan ringkasan rencana isi video Day 6 Anda: bagaimana gambaran modal, biaya operasional, dan keuntungan usaha tersebut, apa kendala utamanya, serta apa ide inovasi STEM & Finansial yang Anda tawarkan... (Minimal 80 karakter)'}" class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm leading-relaxed focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">${escapeHtml(savedConclusion)}</textarea>
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
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, sectorKey);
      localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
        day: dayNum,
        selectedSector: sectorKey,
        objectName: objVal,
        conclusion: resVal,
        updatedAt: new Date().toISOString()
      }));
      // Jika sudah pernah submit, perbarui juga pilihan sektor di record tersimpan agar tampilan langsung berubah
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      if (rawOff) {
        const parsed = JSON.parse(rawOff);
        parsed.selectedSector = sectorKey;
        localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(parsed));
      }
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
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, sectorKey);
      localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(payload));
      localStorage.setItem(`fincestem_materi_day${dayNum}_` + cleanNisn, JSON.stringify(payload));
      localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + cleanNisn, JSON.stringify({ conclusion: summaryFull, savedAt: nowIso }));
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


  // 7. EKSPOR FUNGSI KE WINDOW GLOBAL (SEMUA HARI DAY 0 S.D. DAY 7)
  window.selectDay3Sector = function(sectorKey) {
    if (window[`isNftD3Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, sectorKey);

    const cfg3 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[3]) || {};
    const secName = (cfg3.sectors && cfg3.sectors[sectorKey]) ? cfg3.sectors[sectorKey].name : sectorKey;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor riset Day 3 diubah ke: ' + secName + '. Kartu panduan STEM telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 3);
    }
  };

  window.selectDay4Sector = function(sectorKey) {
    if (window[`isNftD4Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Day 4 Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d4_' + cleanNisn, sectorKey);

    const cfg4 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[4]) || {};
    const secName = (cfg4.sectors && cfg4.sectors[sectorKey]) ? cfg4.sectors[sectorKey].name : sectorKey;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor jelajah lingkungan Day 4 diubah ke: ' + secName + '. Kartu riset telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 4);
    }
  };

  
  window.selectDay5Sector = function(sectorKey) {
    if (window[`isNftD5Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Day 5 Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d5_' + cleanNisn, sectorKey);

    const cfg5 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[5]) || {};
    const secName = (cfg5.sectors && cfg5.sectors[sectorKey]) ? cfg5.sectors[sectorKey].name : sectorKey;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor video Day 5 diubah ke: ' + secName + '. Kartu panduan Sains & Teknologi telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 5);
    }
  };

  window.selectDay6Sector = function(sectorKey) {
    if (window[`isNftD6Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Day 6 Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d6_' + cleanNisn, sectorKey);

    const cfg6 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[6]) || {};
    const secName = (cfg6.sectors && cfg6.sectors[sectorKey]) ? cfg6.sectors[sectorKey].name : sectorKey;
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
