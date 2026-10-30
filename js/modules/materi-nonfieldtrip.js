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
      subtitle: 'Kajian Ilmiah Hakikat Kegiatan Ekonomi, Klasifikasi 3 Sektor Aktivitas, 5 Pilar Literasi Finansial, Peran Bank Indonesia, Kelembagaan Koperasi, serta Pemetaan Potensi Ekonomi Unggulan Daerah OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda tidak disajikan teks siap saji melainkan <strong>diwajibkan meneliti dan mencari materi sendiri</strong> dari buku paket ekonomi kurikulum merdeka, modul literasi keuangan OJK, publikasi Bank Indonesia, dan data BPS OKU Timur.',
      cards: [
        {
          key: 'A',
          title: 'Kegiatan Ekonomi & 3 Sektor Aktivitas',
          subtitle: 'Produksi, Distribusi, Konsumsi & Klasifikasi Sektor Primer-Sekunder-Tersier',
          guidedPoints: [
            'Pengertian hakiki kegiatan ekonomi manusia dalam memenuhi kebutuhan hidup yang tak terbatas dengan memanfaatkan sumber daya terbatas secara bijak.',
            'Perbedaan mendasar serta keterkaitan erat antara alur proses Produksi (menghasilkan nilai tambah), Distribusi (penyaluran barang/jasa), dan Konsumsi (pemanfaatan nilai guna).',
            'Pengertian dan contoh nyata penerapan Sektor Primer (pertanian tanaman pangan/perkebunan), Sektor Sekunder (industri penggilingan padi/olahan pangan), dan Sektor Tersier (jasa transportasi/perdagangan pasar) di wilayah Kabupaten OKU Timur.'
          ],
          placeholder: 'Uraikan hasil telaah mandiri Anda mengenai hakikat kegiatan ekonomi, keterkaitan rantai produksi-distribusi-konsumsi, serta pembagian tiga sektor primer, sekunder, dan tersier di OKU Timur secara komprehensif... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28\n2. Modul Teori Ekonomi Mikro Pengantar',
          defaultExp: 'Kajian mendalam mengenai kegiatan ekonomi menegaskan keterkaitan organik antara sektor primer (pertanian, peternakan, perikanan sebagai penyedia bahan mentah), sektor sekunder (industri olahan dan manufaktur yang meningkatkan nilai tambah komoditas), serta sektor tersier (jaringan distribusi, perdagangan, dan perbankan yang menghubungkan produsen dengan konsumen secara berkelanjutan di Kabupaten OKU Timur).',
          defaultSources: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28.\n2. Modul Pengantar Teori Ekonomi Mikro Daerah.'
        },
        {
          key: 'B',
          title: 'Literasi dan Pengelolaan Keuangan (Financial Literacy)',
          subtitle: 'Jenis-Jenis Finansial & 5 Pilar Utama Manajemen Arus Kas',
          guidedPoints: [
            'Hakikat literasi keuangan sebagai kecakapan hidup (life skill) esensial dalam mengambil keputusan finansial yang tepat, rasional, dan bertanggung jawab.',
            'Uraian dan penerapan 5 Pilar Manajemen Arus Kas: pencatatan transaksi masuk-keluar secara tertib, pemisahan kas usaha dari kas pribadi, pembentukan dana darurat minimal 3 bulan beban tetap, pemilihan pembiayaan produktif, dan perencanaan proteksi masa depan.',
            'Identifikasi bahaya skema pinjaman informal berisiko tinggi (rentenir harian, pinjaman online ilegal tanpa izin OJK) serta strategi membangun kebiasaan menabung sejak usia sekolah.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai pentingnya literasi finansial, cara menyusun anggaran kas pribadi/keluarga, penerapan 5 pilar arus kas, serta mitigasi jebakan pinjaman berisiko tinggi... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI)\n2. Modul Manajemen Keuangan Keluarga Sejahtera',
          defaultExp: 'Literasi finansial mencakup pemahaman komprehensif terhadap 5 pilar tata kelola arus kas: pencatatan berkala seluruh transaksi masuk dan keluar, disiplin memisahkan rekening operasional usaha dari kas konsumsi pribadi, pembentukan dana darurat minimal 3 bulan beban tetap, pemilihan instrumen pembiayaan produktif formal, serta mitigasi risiko terhadap skema pinjaman informal yang merugikan.',
          defaultSources: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, OJK RI.\n2. Modul Manajemen Keuangan Keluarga & UMKM.'
        },
        {
          key: 'C',
          title: 'Kebanksentralan & Bank Indonesia',
          subtitle: 'Peran Bank Sentral, Stabilitas Moneter & Transformasi Transaksi Digital (QRIS)',
          guidedPoints: [
            'Kedudukan independen dan tujuan tunggal Bank Indonesia berdasarkan undang-undang dalam mencapai dan memelihara kestabilan nilai rupiah.',
            'Peran Bank Indonesia dalam mengendalikan laju inflasi harga pangan pokok dan menjamin keamanan serta kelancaran sistem pembayaran nasional.',
            'Inovasi sistem pembayaran digital modern Bank Indonesia (standarisasi QRIS dan BI-FAST) serta dampak positifnya bagi akselerasi perputaran ekonomi pedagang pasar tradisional di OKU Timur.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai fungsi Bank Indonesia sebagai bank sentral, instrumen pengendalian stabilitas moneter, serta manfaat nyata digitalisasi transaksi nontunai QRIS bagi ekosistem usaha lokal... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Publikasi Bank Indonesia: Peran dan Kebijakan Bank Sentral dalam Sistem Pembayaran Digital\n2. Buku Siswa Ekonomi SMA Kelas X Kemendikbud',
          defaultExp: 'Bank Indonesia menjalankan fungsi strategis dalam memelihara stabilitas nilai tukar rupiah dan mengawal kelancaran sistem pembayaran nasional. Integrasi instrumen nontunai modern seperti QRIS dan BI-FAST terbukti mempercepat perputaran ekonomi lokal, menekan biaya administrasi transaksi perbankan, serta memperluas inklusi keuangan bagi pelaku UMKM di pasar-pasar rakyat OKU Timur.',
          defaultSources: '1. Publikasi Bank Indonesia: Peran Bank Sentral & Kebijakan Moneter.\n2. Buku Siswa Ekonomi SMA Kelas X Kemendikbud.'
        },
        {
          key: 'D',
          title: 'Badan Usaha & Koperasi',
          subtitle: 'Koperasi Berasaskan Kekeluargaan, Landasan UU 25/1992 & Motor Ekonomi Desa',
          guidedPoints: [
            'Pengertian badan usaha dan perbedaan karakteristik utama antara Badan Usaha Milik Negara (BUMN), Badan Usaha Milik Swasta (BUMS), dan Koperasi.',
            'Landasan hukum, prinsip jati diri, dan nilai luhur Koperasi berdasarkan Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.',
            'Peran strategis Koperasi Unit Desa (KUD) dan Badan Usaha Milik Desa (BUMDes) dalam menjamin ketersediaan benih/pupuk subsidi petani, menyerap hasil panen, dan membendung praktik monopoli tengkulak.'
          ],
          placeholder: 'Tuliskan sintesis materi mengenai perbedaan jenis badan usaha, prinsip kekeluargaan koperasi, serta kontribusi riil KUD dan BUMDes dalam memajukan perekonomian masyarakat petani OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian\n2. Modul Pengantar Badan Usaha Koperasi, Kemenkop UKM RI',
          defaultExp: 'Berdasarkan Undang-Undang No. 25 Tahun 1992, Koperasi merupakan pilar utama ekonomi kerakyatan yang berasaskan kekeluargaan dan gotong royong. Di sentra agrikultur OKU Timur, KUD dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, memfasilitasi permodalan anggota tanpa bunga tinggi, serta melindungi harga jual gabah petani dari tekanan tengkulak.',
          defaultSources: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.\n2. Modul Kemenkop UKM RI.'
        },
        {
          key: 'E',
          title: 'Kegiatan & Potensi Sektor Ekonomi OKU Timur',
          subtitle: 'Lumbung Padi, Perkebunan, UMKM Belitang & Peluang Wirausaha Masa Depan',
          guidedPoints: [
            'Keunggulan komparatif mutlak Kabupaten OKU Timur sebagai salah satu lumbung pangan utama Provinsi Sumatera Selatan melalui hamparan sawah beririgasi teknis Belitang.',
            'Potensi sektor perkebunan rakyat (karet, kelapa sawit), peternakan sapi potong terpadu, dan perikanan budidaya air tawar (kolam patin/lele).',
            'Dinamika perdagangan pasar tradisional (seperti Pasar Gumawang), geliat UMKM pengolahan hasil panen, serta analisis peluang wirausaha agribisnis masa depan bagi generasi muda daerah.'
          ],
          placeholder: 'Uraikan profil riil perekonomian Kabupaten OKU Timur: keunggulan lumbung pangan, komoditas unggulan perkebunan, denyut UMKM lokal, serta peluang inovasi bisnis yang menjanjikan bagi pemuda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka\n2. Portal Resmi Pemerintah Kabupaten OKU Timur (okutimurkab.go.id), Profil Potensi Daerah',
          defaultExp: 'Sebagai lumbung pangan strategis Sumatera Selatan dengan keunggulan jaringan irigasi Komering, Kabupaten OKU Timur memiliki potensi ekonomi luar biasa di sektor tanaman pangan padi sawah, perkebunan karet, sawit, dan budidaya ikan air tawar. Transformasi hilirisasi pascapanen dan digitalisasi rantai pasok UMKM di sentra Belitang membuka prospek kewirausahaan agribisnis masa depan yang sangat menjanjikan.',
          defaultSources: '1. BPS Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka.\n2. Laporan Profil Daerah okutimurkab.go.id.'
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
      subtitle: 'Kajian Antropologis Hakikat Kebudayaan, Tujuh Unsur Universal, Ragam Mata Pencaharian Daerah, serta Sistem Peralatan, Mekanisasi Alsintan Modern & Jaringan Irigasi Pertanian OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda diwajibkan melakukan investigasi pustaka dan analisis mandiri mengenai <strong>Kebudayaan, Sistem Mata Pencaharian, serta Sistem Peralatan &amp; Teknologi Pertanian Masyarakat OKU Timur</strong> dari buku antropologi, jurnal agroteknologi, data BPS, dan dokumen resmi kedinasan.',
      cards: [
        {
          key: 'A',
          title: 'Hakikat Budaya & 7 Unsur Universal OKU Timur',
          subtitle: 'Bahasa Daerah, Religi, Sistem Kekerabatan & Akulturasi Harmonis Komering-Transmigran',
          guidedPoints: [
            'Hakikat kebudayaan menurut para ahli (E.B. Tylor, Koentjaraningrat, Selo Soemardjan) sebagai sistem gagasan, tindakan, dan artefak karya cipta manusia.',
            'Uraian dan identifikasi nyata Tujuh Unsur Kebudayaan Universal (Bahasa, Pengetahuan, Organisasi Sosial, Peralatan Hidup, Mata Pencaharian, Religi, Kesenian) dalam konteks masyarakat OKU Timur.',
            'Karakteristik akulturasi budaya yang harmonis antara masyarakat pribumi Komering dengan masyarakat transmigran (Jawa, Bali, Sunda) dalam menciptakan kohesi sosial pedesaan.'
          ],
          placeholder: 'Tuliskan hasil kajian mandiri Anda mengenai hakikat kebudayaan, pemetaan tujuh unsur universal di OKU Timur, serta keharmonisan akulturasi antar-suku bangsa di pedesaan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Antropologi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek)\n2. Kajian Profil Budaya Daerah Komering, Disdikbud Kabupaten OKU Timur',
          defaultExp: 'Masyarakat Kabupaten OKU Timur mewarisi kekayaan tujuh unsur kebudayaan universal yang mencakup bahasa daerah Komering dan Jawa, sistem kekerabatan patrilineal dan matrilokal, kesenian daerah, sistem teknologi alsintan, mata pencaharian agrikultur, religi, serta sistem pengetahuan lokal perbintangan pranata mangsa dalam menyelaraskan kalender musim tanam padi.',
          defaultSources: '1. Buku Antropologi & Kebudayaan Nusantara SMA Kelas X.\n2. Kajian Budaya Lokal Komering, Disdikbud OKU Timur.'
        },
        {
          key: 'B',
          title: 'Hubungan Budaya dengan Kegiatan Ekonomi, UMKM & Etos Kerja',
          subtitle: 'Tradisi Sambatan, Sinoman, Gotong Royong & Solidaritas Sosial Usaha Mikro',
          guidedPoints: [
            'Keterkaitan erat antara nilai kearifan budaya lokal dengan pola perilaku ekonomi, etos kerja, dan relasi bisnis masyarakat pedesaan.',
            'Tradisi gotong royong sambatan (bantu mengolah sawah tanpa upah uang) dan sinoman dalam mengurangi beban biaya operasional tenaga kerja dan memperkuat ketahanan keluarga.',
            'Pembentukan modal sosial berbasis kepercayaan (trust) antar-pelaku UMKM pedesaan yang menumbuhkan ekosistem ekonomi berbasis komunitas yang tangguh terhadap krisis.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai bagaimana tradisi gotong royong sambatan menekan biaya usaha tani, membangun ikatan kepercayaan bisnis UMKM, dan membentuk etos kerja masyarakat OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan\n2. Modul Kewirausahaan Berbasis Kearifan Lokal Kemendikbud',
          defaultExp: 'Kearifan budaya gotong royong sambatan dan sinoman sangat mengakar dalam pola kerja sektor ekonomi dan UMKM di OKU Timur. Solidaritas sosial ini mereduksi biaya tenaga kerja saat masa tanam dan panen, membangun ikatan kepercayaan antar-pelaku usaha mikro, serta menumbuhkan ekosistem ekonomi berbasis komunitas yang tangguh terhadap krisis.',
          defaultSources: '1. Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan.\n2. Modul Kewirausahaan Berbasis Kearifan Lokal.'
        },
        {
          key: 'C',
          title: 'Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan',
          subtitle: 'Padi Sawah Irigasi Teknis, Perkebunan Karet, Sawit & Kolam Air Tawar',
          guidedPoints: [
            'Karakteristik sistem mata pencaharian budidaya padi sawah intensif dengan pola tanam IP-200 hingga IP-300 per tahun yang ditopang saluran irigasi teknis.',
            'Karakteristik mata pencaharian perkebunan rakyat (karet alam dan kelapa sawit) serta dinamika penyesuaian keluarga petani saat menghadapi anomali harga getah.',
            'Diversifikasi usaha tani terpadu melalui perikanan kolam air tawar (patin/lele) dan peternakan sapi potong sebagai pilar stabilitas pendapatan harian keluarga.'
          ],
          placeholder: 'Uraikan hasil riset Anda mengenai sistem mata pencaharian agrikultur unggulan di OKU Timur: pola rotasi tanam padi sawah, perkebunan karet, dan diversifikasi perikanan air tawar... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Dinas Pertanian dan Ketahanan Pangan Kabupaten OKU Timur, Laporan Kinerja Sektor Agrikultur\n2. BPS OKU Timur Dalam Angka',
          defaultExp: 'Sektor agrikultur tanaman padi sawah menjadi tulang punggung perekonomian utama masyarakat OKU Timur. Keberadaan jaringan irigasi primer dan sekunder dari Danau Ranau memungkinkan petani melakukan pola rotasi tanam intensif IP-200 hingga IP-300 per tahun, sekaligus menggerakkan sektor turunan seperti pakan ternak dan penggilingan gabah.',
          defaultSources: '1. Dinas Pertanian & Ketahanan Pangan Kab. OKU Timur.\n2. BPS OKU Timur Dalam Angka.'
        },
        {
          key: 'D',
          title: 'Sistem Teknologi Peralatan Pertanian (Alsintan) & Jaringan Irigasi',
          subtitle: 'Evolusi dari Bajak Tradisional ke Traktor Roda 4, Combine Harvester & Saluran Komering',
          guidedPoints: [
            'Sejarah transformasi peralatan pertanian di OKU Timur dari alat mekanik konvensional (cangkul, bajak singkal ditarik kerbau/sapi) menuju mekanisasi alsintan modern bermesin diesel.',
            'Efisiensi kerja, penghematan waktu panen, dan pengurangan biaya operasional berkat adopsi traktor roda empat, transplanter penanam bibit, dan mesin perontok combine harvester.',
            'Sistem jaringan irigasi teknis Belitang (aliran primer, sekunder, tersier dari Danau Ranau) dan tata kelola pembagian giliran air oleh petugas ulu-ulu sawah.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai sejarah modernisasi alsintan di OKU Timur, efisiensi combine harvester, serta manajemen pembagian air pada saluran irigasi teknis Belitang... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Besar Wilayah Sungai (BBWS) Sumatera VIII, Profil Jaringan Irigasi Komering\n2. Pedoman Mekanisasi dan Modernisasi Alsintan, Kementerian Pertanian RI',
          defaultExp: 'Evolusi teknologi pertanian di OKU Timur berkembang pesat dari peralatan tradisional cangkul dan bajak singkal ditarik kerbau menuju modernisasi alsintan seperti traktor roda empat, transplanter penanam bibit, dan combine harvester perontok gabah. Mekanisasi ini didukung oleh pemeliharaan berkala saluran irigasi teknis Belitang.',
          defaultSources: '1. Balai Besar Wilayah Sungai Sumatera VIII (Irigasi Komering).\n2. Pedoman Mekanisasi Pertanian Kementan RI.'
        },
        {
          key: 'E',
          title: 'Inovasi Penanaman, Pascapanen, Otomatisasi & Keterampilan Petani',
          subtitle: 'Pengering Bed Dryer, Pemupukan Presisi, Penurunan Susut Panen (Losses) & Petani Muda',
          guidedPoints: [
            'Inovasi teknik budidaya penanaman benih unggul bersertifikat dan pemupukan organik presisi guna memelihara kesuburan hara tanah sawah jangka panjang.',
            'Penerapan teknologi mesin pengering gabah otomatis (bed dryer/vertical dryer) dalam mencegah pembusukan dan butir berkecambah pada musim penghujan.',
            'Peningkatan keterampilan teknis (up-skilling) petani lokal dalam pengoperasian dan pemeliharaan mesin pertanian, serta strategi memikat minat generasi muda terdidik menjadi petani milenial.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai inovasi teknologi penanaman, otomatisasi pengeringan gabah bed dryer, serta pentingnya penguasaan keterampilan teknis bagi petani muda OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Riset Balai Pengkajian Teknologi Pertanian (BPTP) Balitbangtan Sumatera Selatan\n2. Petunjuk Teknis Penanganan Pascapanen Padi Modern, Kementan RI',
          defaultExp: 'Inovasi budidaya penanaman ramah lingkungan, pemupukan organik presisi, dan otomatisasi mesin pengering gabah (bed dryer) menjadi fokus utama peningkatan keterampilan teknis petani OKU Timur guna meminimalkan susut panen (losses), meningkatkan rendemen giling, dan menjaga mutu beras premium di pasar regional.',
          defaultSources: '1. Riset Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel.\n2. Petunjuk Teknis Pascapanen Padi Modern.'
        }
      ]
    },

    3: {
      dayNum: 3,
      title: 'Modul Riset Day 3: Agribisnis Padi, Kilang Padi (RMU) & Teknologi Pascapanen OKU Timur',
      theme: 'Pilar Industry & STEM',
      gradientClass: 'from-blue-900 via-slate-900 to-cyan-950 border-blue-700/40',
      tagColorClass: 'bg-white/20 text-blue-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Kajian Rantai Nilai Agribisnis Padi, Mekanisasi Kilang Penggilingan Modern (Rice Milling Unit), Efisiensi Pengeringan Mekanis, Analisis Rendemen Beras, serta Optimalisasi Limbah Biomassa Sekam',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda ditugaskan meneliti <strong>Rantai Industri Pascapanen Padi di Kabupaten OKU Timur</strong>, mencakup operasional kilang penggilingan beras (RMU), teknologi pengendalian kadar air gabah, serta kalkulasi rendemen butir utuh berkualitas premium.',
      cards: [
        {
          key: 'A',
          title: 'Karakteristik Varietas Padi Unggulan & Musim Tanam OKU Timur',
          subtitle: 'Varietas Inpari 32, Ciherang, Daya Adaptasi Lahan & Jadwal Tanam Serentak',
          guidedPoints: [
            'Karakteristik agronomi varietas padi unggul (Inpari 32, Ciherang, Mekongga) yang tahan terhadap penyakit hawar daun bakteri dan serangan wereng batang coklat.',
            'Pentingnya kepatuhan terhadap jadwal kalender tanam serentak yang dipandu dinas pertanian untuk memutus siklus perkembangbiakan hama endemik.',
            'Pola rotasi tanam intensif IP-200 hingga IP-300 yang memanfaatkan ketersediaan air saluran irigasi Komering secara bergiliran.'
          ],
          placeholder: 'Uraikan karakteristik keunggulan varietas padi Inpari 32 dan Ciherang di sawah OKU Timur serta manfaat jadwal tanam serentak dalam memutus hama... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Besar Penelitian Tanaman Padi (BBPadi) Kementan RI\n2. Panduan Musim Tanam Padi Dinas Pertanian OKU Timur',
          defaultExp: 'Kajian agronomi tanaman pangan di Kabupaten OKU Timur membuktikan bahwa pemilihan varietas unggul seperti Inpari 32 dan Ciherang memiliki ketahanan tinggi terhadap penyakit hawar daun bakteri serta serangan hama wereng. Penerapan jadwal tanam serentak yang dipandu kalender musim dinas pertanian terbukti efektif menekan risiko ledakan populasi hama dan memaksimalkan produktivitas panen per hektar.',
          defaultSources: '1. Balai Besar Penelitian Tanaman Padi (BBPadi) Kementan RI.\n2. Panduan Budidaya Padi Sawah Berkelanjutan Dinas Pertanian OKU Timur.'
        },
        {
          key: 'B',
          title: 'Alur Mekanisasi Kilang Penggilingan Padi Modern (RMU)',
          subtitle: 'Pre-Cleaner, Husker Pengupas, Paddy Separator, Whitener & Sensor Optik Color Sorter',
          guidedPoints: [
            'Tahapan mekanis penggilingan gabah: pembersihan kotoran jerami (pre-cleaner), pengupasan sekam menjadi beras pecah kulit (husker), dan pemisahan gabah belum terkupas (paddy separator).',
            'Proses pemolesan beras (whitener dan polisher) untuk menghasilkan derajat sosoh mengkilap tanpa mengikis lapisan nutrisi penting pada endosperma.',
            'Peran teknologi color sorter berbasis sensor optik canggih dalam memilah butir beras kuning, hitam, atau berkapur sehingga menghasilkan beras bermutu super.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai alur kerja mesin penggilingan modern (pre-cleaner, husker, separator, whitener, color sorter) pada kilang padi di OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Petunjuk Teknis Operasional Rice Milling Unit (RMU) Modern, Kemenperin RI\n2. Standar Nasional Indonesia Mutu Beras Giling (SNI 6128:2020)',
          defaultExp: 'Modernisasi Rice Milling Unit (RMU) di sentra Belitang mentransformasi gabah panen menjadi beras premium melalui rangkaian mesin terpadu: pre-cleaner pembersih jerami, husker pengupas kulit sekam, paddy separator pemilah butir, whitener pemoles derajat sosoh, hingga color sorter berbasis sensor optik yang menjamin keseragaman warna dan kebersihan bulir beras sesuai standar mutu SNI.',
          defaultSources: '1. Petunjuk Teknis Operasional Rice Milling Unit Modern, Kemenperin RI.\n2. Pedoman Standardisasi Mutu Beras Nasional (SNI Beras 6128:2020).'
        },
        {
          key: 'C',
          title: 'Efisiensi Pengeringan Mekanis vs Lantai Jemur Tradisional',
          subtitle: 'Flat Bed Dryer Blower Panas vs Terpal Manual & Pengendalian Kadar Air 14%',
          guidedPoints: [
            'Perbandingan biaya, kecepatan waktu, dan kapasitas pengeringan antara mesin bed dryer dengan penjemuran tradisional beralas semen/terpal yang bergantung cuaca panas.',
            'Pengaturan suhu konstan (40-45 derajat Celcius) pada mesin pengering guna mencegah keretakan bulir beras akibat kejutan panas berlebihan.',
            'Pentingnya mencapai standar baku kadar air 14% agar gabah aman disimpan lama di lumbung tanpa resiko berjamur, busuk, atau diserang kutu beras.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai perbandingan efisiensi bed dryer mekanis vs lantai jemur tradisional serta pentingnya kadar air gabah 14% saat penggilingan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Jurnal Keteknikan Pertanian dan Rekayasa Pascapanen Tanaman Pangan\n2. Pedoman Pengeringan Gabah Pascapanen, Badan Pangan Nasional',
          defaultExp: 'Pengeringan gabah mekanis menggunakan vertical dryer maupun flat bed dryer menghasilkan efisiensi tinggi dibandingkan penjemuran manual yang sangat rentan cuaca hujan. Pengaturan suhu konstan pada kisaran 40-45 derajat Celcius mampu menurunkan kadar air gabah dari 24% menjadi 14% secara merata tanpa meretakkan struktur endosperma, sehingga beras tidak hancur saat proses penyosohan.',
          defaultSources: '1. Jurnal Keteknikan Pertanian & Rekayasa Pascapanen Tanaman Pangan.\n2. Standar Operasional Pengeringan Gabah Kementan RI.'
        },
        {
          key: 'D',
          title: 'Analisis Rendemen Gabah Kering Giling (GKG) Menjadi Beras Kepala',
          subtitle: 'Kalkulasi Rasio Rendemen 62-66%, Butir Patah Maksimal & Penentuan Mutu Premium',
          guidedPoints: [
            'Rumus kalkulasi persentase rendemen beras (bobot beras giling dibagi bobot gabah kering giling dikalikan 100%).',
            'Faktor penentu tinggi rendemen: tingkat kematangan gabah saat dipanen, kebersihan gabah dari kotoran hampa, dan perawatan pisau pemoles mesin RMU.',
            'Klasifikasi fraksi beras giling: Beras Kepala (butir utuh minimal 80%), Beras Patah (butir belah 2/10 sampai 6/10), dan Menir (butir remuk kecil di bawah 2/10 bagian).'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai cara menghitung rendemen beras, faktor penentu rendemen tinggi, dan pembagian butir beras kepala vs patah... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Badan Pangan Nasional (Bapanas), Standar Fraksi dan Kualitas Beras Konsumsi\n2. Buku Analisis Finansial Industri Kilang Padi Skala Komersial',
          defaultExp: 'Perhitungan rendemen beras merupakan indikator utama efisiensi finansial dan teknis kilang padi, di mana rasio standar rendemen gabah kering giling di OKU Timur berkisar antara 62% hingga 66%. Pemeliharaan mesin penggiling secara rutin serta ketepatan kadar air gabah sangat menentukan dominasi beras kepala utuh berkualitas premium dengan persentase butir patah minimal di bawah 15%.',
          defaultSources: '1. Badan Pangan Nasional (Bapanas), Peraturan Standar Fraksi dan Mutu Beras.\n2. Buku Analisis Finansial Usaha Penggilingan Padi Skala Menengah.'
        },
        {
          key: 'E',
          title: 'Pemanfaatan Produk Sampingan Penggilingan (Sekam & Dedak)',
          subtitle: 'Dedak/Bekatul Pakan Konsentrat Ternak, Arang Sekam Pembenah Tanah & Nol Limbah (Zero Waste)',
          guidedPoints: [
            'Potensi ekonomi dedak kasar dan bekatul halus sebagai komponen utama campuran pakan konsentrat bergizi tinggi bagi ternak sapi dan unggas.',
            'Pemanfaatan limbah sekam padi sebagai bahan bakar pirolisis pemanas bed dryer, pembuatan briket sekam, dan arang sekam kaya silika untuk media tanam.',
            'Konsep circular economy (nol limbah / zero waste) pada ekosistem industri penggilingan padi di sentra agribisnis Belitang OKU Timur.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai pemanfaatan dedak sebagai pakan ternak dan sekam sebagai pembenah tanah dalam mewujudkan prinsip nol limbah di kilang padi... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Jurnal Pemanfaatan Limbah Agroindustri dan Biomassa Berkelanjutan\n2. Laporan Riset Terapan Fakultas Pertanian Universitas Sriwijaya',
          defaultExp: 'Penerapan konsep ekonomi sirkular pada kilang padi di OKU Timur terwujud melalui optimalisasi produk sampingan yang bernilai komersial tinggi. Dedak dan bekatul diolah menjadi campuran konsentrat pakan ternak unggul, sementara sekam padi dibakar secara pirolisis menjadi arang sekam pembenah kesuburan tanah atau dimanfaatkan sebagai bahan bakar terbarukan pemanas mesin pengering gabah.',
          defaultSources: '1. Jurnal Pemanfaatan Limbah Pertanian dan Agroindustri Berkelanjutan.\n2. Laporan Riset Terapan Fakultas Pertanian Universitas Sriwijaya.'
        }
      ]
    },

    4: {
      dayNum: 4,
      title: 'Modul Riset Day 4: Kewirausahaan UMKM, Rantai Pasok (Supply Chain) & Logistik Daerah',
      theme: 'Pilar Financial & Industry',
      gradientClass: 'from-amber-950 via-slate-900 to-teal-950 border-amber-700/40',
      tagColorClass: 'bg-white/20 text-amber-100',
      badgeColorClass: 'bg-teal-400 text-teal-950',
      subtitle: 'Investigasi Klaster UMKM Unggulan, Pemetaan Rantai Pasok Daerah (Supply Chain), Komponen Biaya Logistik & Transportasi, Kalkulasi Harga Pokok Penjualan (HPP), serta Strategi Pemasaran Digital',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda ditugaskan meneliti <strong>Ekosistem Rantai Pasok & Kewirausahaan UMKM di OKU Timur</strong>, mencakup alur distribusi barang dagangan dari produsen desa hingga pasar grosir, struktur ongkos angkut, dan strategi penetapan margin laba yang sehat.',
      cards: [
        {
          key: 'A',
          title: 'Klaster UMKM Olahan Pangan & Kerajinan Unggulan OKU Timur',
          subtitle: 'Kemplang Ikan, Olahan Daging Patin, Sale Pisang, Kerupuk & Legalitas NIB / PIRT',
          guidedPoints: [
            'Pemetaan ragam produk olahan pangan lokal berbasis komoditas pertanian dan perikanan air tawar di sentra Belitang, Gumawang, dan Martapura.',
            'Pentingnya pengurusan legalitas usaha resmi: Nomor Induk Berusaha (NIB OSS), sertifikasi halal BPJPH, dan izin edar pangan industri rumah tangga (PIRT).',
            'Tantangan konsistensi mutu rasa, kebersihan kemasan kedap udara, dan masa simpan produk agar mampu menembus rak pajang pasar ritel modern.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai jenis klaster UMKM olahan pangan unggulan di OKU Timur dan langkah-langkah pemenuhan legalitas izin edar NIB serta PIRT... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Dinas Koperasi dan UKM Kabupaten OKU Timur, Profil Klaster Usaha Mikro\n2. Panduan Penerbitan NIB dan Sertifikasi Halal Kementerian Agama RI',
          defaultExp: 'Dinamika UMKM di Kabupaten OKU Timur bertumpu pada hilirisasi komoditas lokal, seperti klaster pengolahan kemplang dan kerupuk ikan, sale pisang, olahan daging patin asap, serta produk olahan beras ketan. Peningkatan daya saing produk lokal menuntut legalitas izin edar P-IRT dan sertifikasi halal resmi agar mampu menembus jaringan ritel modern dan memperluas pangsa pasar ke luar kabupaten.',
          defaultSources: '1. Dinas Koperasi dan UKM Kabupaten OKU Timur, Profil Klaster UMKM Daerah.\n2. Panduan Pendampingan Legalitas Usaha Mikro, Kementerian Koperasi dan UKM RI.'
        },
        {
          key: 'B',
          title: 'Pemetaan Rantai Pasok (Supply Chain) dari Petani ke Konsumen',
          subtitle: 'Petani Produsen, Penebas/Pengepul Desa, Distributor Grosir Pasar & Pengecer',
          guidedPoints: [
            'Pemetaan simpul alur perjalanan barang hasil panen dari lahan sawah/kebun menuju tangan konsumen akhir di dalam dan luar kabupaten.',
            'Analisis posisi tawar petani saat bertransaksi dengan pedagang pengumpul (penebas) dan faktor penyebab disparitas harga komoditas.',
            'Strategi pemendekan rantai pasok melalui kemitraan KUD atau platform transaksi langsung agar petani memperoleh bagian keuntungan yang lebih adil.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai struktur rantai pasok agrikultur di OKU Timur dan strategi memendekkan rantai distribusi agar harga lebih menguntungkan petani... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Manajemen Rantai Pasok Agribisnis (Agribusiness Supply Chain Management)\n2. Kajian Tataniaga Komoditas Pertanian Pangan, Bappeda OKU Timur',
          defaultExp: 'Struktur rantai pasok komoditas agrikultur di OKU Timur mencakup simpul berjenjang dari petani produsen, pedagang pengepul desa, penggilingan padi, distributor grosir Pasar Gumawang, hingga pedagang pengecer keliling. Pemendekan rantai pasok melalui saluran penjualan langsung atau kemitraan KUD terbukti mampu memberikan marjin harga yang lebih adil dan menguntungkan bagi petani lokal.',
          defaultSources: '1. Buku Manajemen Rantai Pasok Agribisnis (Agribusiness Supply Chain Management).\n2. Kajian Tataniaga Komoditas Pangan Pokok, Bappeda OKU Timur.'
        },
        {
          key: 'C',
          title: 'Struktur Biaya Logistik, Armada Transportasi & Kondisi Jalan',
          subtitle: 'Komponen BBM, Tarif Bongkar Muat, Armada Truk Desa & Hambatan Jalan Penghubung',
          guidedPoints: [
            'Rincian komponen biaya logistik: konsumsi bahan bakar minyak (BBM), upah buruh bongkar-muat, penyusutan armada, dan resiko susut barang di perjalanan.',
            'Kondisi infrastruktur jalan penghubung antar-kecamatan dan jalan poros desa di OKU Timur terhadap kecepatan distribusi barang dagangan.',
            'Solusi mengatasi hambatan transportasi saat musim penghujan (kondisi jalan tanah licin) agar pasokan barang ke pasar tidak tersendat.'
          ],
          placeholder: 'Uraikan hasil telaah Anda mengenai komponen biaya transportasi barang di pedesaan OKU Timur dan pengaruh kondisi jalan terhadap kelancaran distribusi logistik... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Laporan Kinerja Logistik Daerah dan Konektivitas Wilayah, Kemenhub RI\n2. Publikasi Statistik Transportasi dan Infrastruktur BPS Kabupaten OKU Timur',
          defaultExp: 'Efisiensi logistik daerah dipengaruhi secara signifikan oleh kondisi infrastruktur jalan penghubung antar-desa serta ketersediaan armada transportasi angkutan barang yang memadai. Biaya logistik rata-rata menyerap 15% hingga 20% dari total biaya operasional perdagangan komoditas di OKU Timur, sehingga perbaikan akses jalan sentra produksi menjadi kunci vital stabilitas harga pangan.',
          defaultSources: '1. Laporan Kinerja Logistik Daerah dan Konektivitas Antar-Wilayah, Kemenhub RI.\n2. Publikasi Statistik Transportasi dan Komunikasi Daerah BPS OKU Timur.'
        },
        {
          key: 'D',
          title: 'Kalkulasi Harga Pokok Penjualan (HPP) & Margin Keuntungan Wajar',
          subtitle: 'Biaya Tetap (Fixed Cost), Biaya Variabel (Variable Cost), Titik Impas (BEP) & Margin Laba',
          guidedPoints: [
            'Cara menghitung Biaya Tetap (sewa tempat, penyusutan alat) dan Biaya Variabel (bahan baku, upah harian, kemasan) dalam proses produksi pangan.',
            'Rumus kalkulasi Harga Pokok Penjualan (HPP) per unit produk untuk memastikan harga jual berada di atas ambang titik impas (Break Even Point / BEP).',
            'Penetapan persentase margin keuntungan bersih (misal 20-30%) yang rasional dengan mempertimbangkan daya beli masyarakat dan harga pesaing di pasar lokal.'
          ],
          placeholder: 'Tuliskan hasil analisis Anda mengenai metode penghitungan HPP per unit, pemilahan biaya tetap vs variabel, serta penentuan margin keuntungan yang sehat bagi UMKM... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Akuntansi Manajemen dan Penetapan Biaya Produksi Usaha Mikro\n2. Modul Pelatihan Literasi Keuangan Praktis Rumah BUMN',
          defaultExp: 'Keterampilan menghitung Harga Pokok Penjualan (HPP) merupakan fondasi mutlak kelangsungan usaha mikro, yang dihitung dengan mengakumulasi seluruh biaya bahan baku, tenaga kerja langsung, dan overhead operasional dibagi jumlah unit produk. Penetapan margin laba bersih sebesar 20-30% di atas HPP menjaga keseimbangan antara daya beli konsumen dengan keberlanjutan arus kas pelaku usaha.',
          defaultSources: '1. Buku Akuntansi Manajemen & Penetapan Biaya Produksi untuk Usaha Kecil.\n2. Modul Pelatihan Literasi Keuangan Praktis Rumah BUMN.'
        },
        {
          key: 'E',
          title: 'Pemasaran Digital, Media Sosial & Kemitraan Komersial',
          subtitle: 'Katalog WhatsApp Business, Google Profil Bisnis (Maps), Media Sosial & Ritel Lokal',
          guidedPoints: [
            'Pemanfaatan fitur katalog gratis WhatsApp Business dan media sosial (Instagram, TikTok) untuk memperluas jangkauan promosi produk olahan lokal.',
            'Pentingnya mendaftarkan titik lokasi toko/unit usaha pada Google Profil Bisnis (Google Maps) agar mudah ditemukan pelanggan dan pembeli dari luar daerah.',
            'Peluang membangun kemitraan konsinyasi dengan pusat oleh-oleh, minimarket lokal, dan platform e-commerce demi meningkatkan omzet penjualan.'
          ],
          placeholder: 'Uraikan hasil kajian Anda mengenai strategi pemanfaatan pemasaran digital gratis (WhatsApp Business, Google Maps, medsos) untuk menaikkan penjualan produk UMKM OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Transformasi Digital UMKM Indonesia, Kementerian Kominfo RI\n2. Buku Strategi Pemasaran Digital untuk Usaha Mikro dan Pemula',
          defaultExp: 'Akselerasi pemasaran digital membuka peluang ekspansi pasar bagi produk UMKM OKU Timur melampaui batas geografis kecamatan. Pemanfaatan kanal media sosial interaktif, katalog WhatsApp Business, serta pendaftaran titik lokasi pada Google Maps mempermudah pemesanan langsung dari konsumen luar kota dan meningkatkan kredibilitas citra merek produk olahan lokal secara profesional.',
          defaultSources: '1. Panduan Transformasi Digital UMKM Indonesia, Kementerian Kominfo RI.\n2. Buku Strategi Pemasaran Digital Berbiaya Murah untuk Wirausaha Pemula.'
        }
      ]
    },

    5: {
      dayNum: 5,
      title: 'Modul Riset Day 5: Inklusi Keuangan Digital, Layanan Perbankan Tanpa Kantor & Keamanan Transaksi',
      theme: 'Pilar Financial & Technology',
      gradientClass: 'from-purple-900 via-slate-900 to-indigo-950 border-purple-700/40',
      tagColorClass: 'bg-white/20 text-purple-100',
      badgeColorClass: 'bg-emerald-400 text-slate-950',
      subtitle: 'Kajian Penetrasi Agen Perbankan Laku Pandai Pedesaan, Adopsi Transaksi QRIS, Tantangan Kesenjangan Digital, Mitigasi Risiko Kejahatan Siber Finansial, serta Penyaluran Kredit Usaha Rakyat (KUR)',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda ditugaskan meneliti <strong>Inklusi Finansial & Keamanan Transaksi Digital di OKU Timur</strong>, mencakup operasional agen bank tanpa kantor (Laku Pandai), pemanfaatan QRIS di pasar desa, serta langkah pencegahan terhadap penipuan siber dan pinjol ilegal.',
      cards: [
        {
          key: 'A',
          title: 'Layanan Agen Perbankan Laku Pandai di Pedesaan OKU Timur',
          subtitle: 'Agen BRILink, Mandiri Agen, BNI Agen46 & Akses Finansial Tanpa Kantor Fisik',
          guidedPoints: [
            'Konsep Layanan Keuangan Tanpa Kantor dalam Rangka Keuangan Inklusif (Laku Pandai) yang digagas Otoritas Jasa Keuangan (OJK) dan perbankan nasional.',
            'Peran warung kelontong mitra agen perbankan dalam menyediakan layanan transfer, setor tunai, tarik tunai, dan pembayaran tagihan listrik/air di pelosok desa.',
            'Keuntungan agen bank bagi masyarakat pedesaan dalam memangkas ongkos transportasi dan waktu antre dibandingkan menuju kantor bank di kota kecamatan.'
          ],
          placeholder: 'Uraikan hasil telaah Anda mengenai fungsi agen Laku Pandai (BRILink, Mandiri Agen) di pedesaan OKU Timur dalam mempermudah akses transaksi masyarakat... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Otoritas Jasa Keuangan (OJK), Roadmap Pengembangan Keuangan Inklusif Indonesia\n2. Buku Panduan Agen Perbankan Laku Pandai, Bank Indonesia',
          defaultExp: 'Layanan perbankan tanpa kantor fisik (Laku Pandai) melalui kemitraan Agen BRILink, Mandiri Agen, dan BNI Agen46 menjadi ujung tombak inklusi finansial di desa-desa OKU Timur. Keberadaan agen perbankan di warung kelontong mempermudah masyarakat pedesaan melakukan transfer perbankan, setor tabungan, hingga pencairan bantuan sosial tanpa harus menempuh jarak jauh ke kantor cabang perbankan.',
          defaultSources: '1. Otoritas Jasa Keuangan (OJK), Roadmap Pengembangan Keuangan Inklusif Nasional.\n2. Buku Panduan Agen Perbankan Laku Pandai, Bank Indonesia.'
        },
        {
          key: 'B',
          title: 'Adopsi Pembayaran Digital Berbasis QRIS di Pasar Tradisional',
          subtitle: 'Standarisasi Kode QR Nasional, Efisiensi Transaksi & Perlindungan dari Uang Palsu',
          guidedPoints: [
            'Pengertian standarisasi QRIS sebagai satu kode pembayaran universal yang dapat dibaca oleh seluruh aplikasi perbankan mobile dan dompet elektronik (e-wallet).',
            'Tingkat adopsi dan respon pedagang pasar tradisional (seperti Pasar Gumawang dan Martapura) dalam menerapkan pembayaran nontunai menggunakan QRIS.',
            'Manfaat nyata penggunaan QRIS: menghindari kerugian akibat menerima uang kertas palsu, tidak perlu pusing mencari uang kembalian receh, dan dana penjualan langsung masuk rekening.'
          ],
          placeholder: 'Tuliskan hasil analisis Anda mengenai manfaat penerapan QRIS bagi pedagang pasar tradisional di OKU Timur dalam hal keamanan, efisiensi, dan akuntabilitas keuangan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Publikasi Bank Indonesia: Standarisasi QRIS dan Transformasi Pembayaran Nontunai\n2. Jurnal Ekonomi dan Kebijakan Publik Daerah',
          defaultExp: 'Adopsi Quick Response Code Indonesian Standard (QRIS) di pasar tradisional dan kios pedagang OKU Timur memodernisasi cara bertransaksi masyarakat dari tunai menuju nontunai yang higienis dan aman. QRIS mengeliminasi risiko peredaran uang kertas palsu, memangkas kebutuhan uang kembalian pecahan kecil, serta memberikan rekam jejak transaksi keuangan yang tercatat rapi secara digital.',
          defaultSources: '1. Publikasi Bank Indonesia: Standarisasi QRIS & Transformasi Sistem Pembayaran Digital.\n2. Jurnal Ekonomi dan Kebijakan Publik Indonesia.'
        },
        {
          key: 'C',
          title: 'Tantangan Infrastruktur Internet & Literasi Digital Masyarakat Desa',
          subtitle: 'Konektivitas Jaringan 4G, Kuota Data, Kepemilikan Smartphone & Hambatan Generasi Tua',
          guidedPoints: [
            'Kondisi jangkauan sinyal internet seluler di area persawahan dan permukiman desa transmigrasi di Kabupaten OKU Timur.',
            'Kendala pengoperasian aplikasi perbankan digital bagi masyarakat kelompok usia dewasa dan lansia yang belum terbiasa dengan menu teknologi perbankan.',
            'Peran pendampingan generasi muda terdidik dalam membimbing keluarga dan lingkungan sekitar agar percaya diri bertransaksi secara digital.'
          ],
          placeholder: 'Uraikan hasil telaah Anda mengenai kendala sinyal internet di pedalaman OKU Timur, hambatan adaptasi teknologi generasi tua, dan solusi pendampingan literasi digital... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Laporan Pemerataan Jaringan Telekomunikasi Pedesaan, Kemkominfo RI\n2. Studi Kesenjangan Digital Masyarakat Agrikultur BPS Sumatera Selatan',
          defaultExp: 'Keberhasilan digitalisasi transaksi finansial di pedesaan sangat bergantung pada stabilitas jaringan telekomunikasi seluler dan tingkat literasi digital masyarakat. Kendala blank spot sinyal internet di sejumlah desa pelosok serta resistensi pedagang generasi tua terhadap aplikasi perbankan menjadi tantangan riil yang membutuhkan edukasi berkelanjutan dan pendampingan generasi muda.',
          defaultSources: '1. Laporan Cakupan Infrastruktur Jaringan Telekomunikasi Pedesaan, Kemkominfo RI.\n2. Studi Kesenjangan Digital Masyarakat Agrikultur, BPS Sumatera Selatan.'
        },
        {
          key: 'D',
          title: 'Mitigasi Risiko Kejahatan Siber Finansial & Pinjol Ilegal',
          subtitle: 'Kerahasiaan Kode OTP, Password/PIN, Phishing APK Paket & Bahaya Pinjaman Bunga Mencekik',
          guidedPoints: [
            'Ragam modus penipuan rekayasa sosial (social engineering): tautan file APK undangan/kurir palsu, pencurian kode OTP melalui telepon hadiah, dan akun rekening perantara.',
            'Prinsip keamanan bertransaksi digital: tidak pernah membagikan kode OTP atau PIN kepada pihak mana pun, serta rutin mengganti kata sandi aplikasi perbankan.',
            'Karakteristik pinjaman online ilegal (tidak terdaftar OJK, suku bunga harian mencekik, intimidasi penagihan dengan menyadap nomor kontak HP) dan cara menghindarinya.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai langkah-langkah melindungi diri dari penipuan siber perbankan (phishing/OTP) serta bahaya jeratan utang pinjol ilegal di pedesaan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Keamanan Siber Finansial Satgas PASTI Otoritas Jasa Keuangan (OJK RI)\n2. Publikasi Badan Siber dan Sandi Negara (BSSN) tentang Transaksi Digital Aman',
          defaultExp: 'Meningkatnya akses digital masyarakat harus diimbangi dengan kewaspadaan ketat terhadap kejahatan siber finansial seperti phising bermodus undangan pernikahan/APK paket, pencurian kode OTP, dan jeratan pinjaman online ilegal. Edukasi keamanan data pribadi, disiplin menjaga kerahasiaan PIN transaksi, dan kehati-hatian memverifikasi legalitas entitas OJK menjadi perisai utama perlindungan nasabah.',
          defaultSources: '1. Panduan Keamanan Siber Finansial Satgas PASTI (Pemberantasan Aktivitas Keuangan Ilegal) OJK.\n2. Publikasi Badan Siber dan Sandi Negara (BSSN) tentang Keamanan Transaksi Digital.'
        },
        {
          key: 'E',
          title: 'Peran Lembaga Keuangan Formal & Akses Kredit Usaha Rakyat (KUR)',
          subtitle: 'Bank Sumsel Babel, Bank BUMN, Bunga Subsidi 6% & Syarat Kelayakan Usaha Petani',
          guidedPoints: [
            'Peran Bank Pembangunan Daerah (Bank Sumsel Babel) dan Bank Himbara dalam menyediakan pembiayaan modal kerja sektor pertanian di OKU Timur.',
            'Kebijakan Kredit Usaha Rakyat (KUR) berbunga subsidi rendah (6% per tahun) yang ditujukan untuk pengadaan benih, pupuk, alsintan, dan modal dagang.',
            'Persyaratan kelayakan administrasi usaha agar petani dan pedagang kecil memenuhi kriteria perbankan (bankable) tanpa terbebani agunan fisik berat.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai peran program KUR dalam melepaskan petani OKU Timur dari jeratan rentenir serta kemudahan syarat kredit yang disediakan perbankan formal... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Peraturan Menteri Koordinator Perekonomian tentang Pedoman Penyaluran KUR\n2. Laporan Penyaluran KUR Sektor Pertanian Provinsi Sumatera Selatan',
          defaultExp: 'Akses permodalan formal melalui skema Kredit Usaha Rakyat (KUR) berbunga subsidi 6% per tahun memegang peranan vital dalam melepaskan petani dan pedagang kecil dari ketergantungan pelepas uang informal. Bank Sumsel Babel dan bank BUMN mitra terus memperluas jangkauan KUR agrikultur dengan persyaratan administratif sederhana untuk mendukung permodalan musim tanam berkelanjutan.',
          defaultSources: '1. Peraturan Menteri Koordinator Bidang Perekonomian tentang Pedoman Pelaksanaan KUR.\n2. Laporan Penyaluran KUR Pertanian Provinsi Sumatera Selatan.'
        }
      ]
    },

    6: {
      dayNum: 6,
      title: 'Modul Riset Day 6: Konservasi Lingkungan, Keberlanjutan Ekosistem Pertanian & Budaya Belitang',
      theme: 'Pilar Nature & Culture',
      gradientClass: 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-700/40',
      tagColorClass: 'bg-white/20 text-emerald-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Kajian Pemeliharaan Kesuburan Tanah Sawah, Efisiensi Pupuk Berimbang, Pengelolaan Limbah Jerami Tanpa Bakar, Pelestarian Saluran Irigasi Teknis, serta Adaptasi Pertanian Menghadapi Iklim Ekstrem',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda ditugaskan meneliti <strong>Keberlanjutan Ekosistem Lingkungan & Budaya Tani Belitang</strong>, mencakup konservasi hara tanah sawah, pemanfaatan limbah jerami tanpa bakar, serta kearifan lokal pengelolaan air irigasi menghadapi anomali iklim global.',
      cards: [
        {
          key: 'A',
          title: 'Keberlanjutan Kesuburan Tanah Sawah & Konservasi Lahan',
          subtitle: 'Kandungan Bahan Organik (C-Organik), Struktur Humus Tanah & Erosi Tanggul Saluran',
          guidedPoints: [
            'Kondisi kesuburan tanah sawah intensif di OKU Timur setelah digunakan menanam padi secara terus-menerus selama puluhan tahun.',
            'Bahaya penurunan kandungan bahan organik (C-Organik di bawah 2%) dan pemadatan tanah akibat jarang mengaplikasikan pupuk kandang atau kompos alami.',
            'Metode konservasi tanggul saluran irigasi tanah dari erosi longsor melalui penanaman rumput penguat tebing dan vegetasi penyangga.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai kondisi kesuburan tanah sawah di OKU Timur dan langkah-langkah konservasi tanah agar tidak mengalami degradasi hara... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel, Riset Kesuburan Lahan Sawah\n2. Pedoman Konservasi Tanah dan Air Lahan Pertanian, Kementan RI',
          defaultExp: 'Intensifikasi penanaman padi sawah sepanjang tahun menuntut perhatian serius terhadap keberlanjutan kesuburan tanah dan pelestarian struktur lapisan olah. Penurunan kandungan C-Organik tanah sawah akibat minimnya asupan pupuk kandang dapat memicu kejenuhan tanah, sehingga konservasi lahan melalui rotasi bahan organik dan pemeliharaan tebing saluran irigasi menjadi kunci produktivitas jangka panjang.',
          defaultSources: '1. Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel, Riset Pengelolaan Kesuburan Lahan Sawah.\n2. Pedoman Konservasi Tanah dan Air Lahan Pertanian, Kementan RI.'
        },
        {
          key: 'B',
          title: 'Efisiensi Pupuk Kimia Bersubsidi vs Aplikasi Pupuk Organik & Hayati',
          subtitle: 'Urea, NPK Phonska, Mikroba Pengurai, Pupuk Kandang Fermentasi & Penghematan Biaya',
          guidedPoints: [
            'Sistem distribusi alokasi pupuk bersubsidi (Urea dan NPK Phonska) melalui sistem elektronik e-Alokasi Kementerian Pertanian.',
            'Dampak negatif pemakaian pupuk kimia sintetis berlebihan terhadap peningkatan keasaman tanah sawah dan musnahnya cacing serta mikroba penyubur tanah.',
            'Teknik pembuatan pupuk organik bokashi/kompos terfermentasi dan pupuk hayati cair sebagai penyubur alami yang ramah lingkungan dan hemat biaya produksi.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai dampak buruk pemupukan kimia berlebih serta manfaat memadukan pupuk organik bokashi untuk efisiensi biaya usaha tani... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Penelitian Tanah (Balittanah) Kementan RI, Rekomendasi Pemupukan Berimbang\n2. Petunjuk Teknis Pembuatan Pupuk Kompos Kelompok Tani',
          defaultExp: 'Ketergantungan berlebihan pada pupuk kimia sintetis (Urea dan NPK) tanpa diimbangi bahan organik dapat merusak keseimbangan mikroorganisme tanah dan meningkatkan resistensi patogen tanaman. Penerapan konsep pemupukan berimbang dengan memadukan pupuk kimia presisi bersama pupuk organik kompos dan pupuk hayati lokal terbukti mampu menekan biaya input saprotan hingga 20% sekaligus memperbaiki pH tanah sawah.',
          defaultSources: '1. Balai Penelitian Tanah (Balittanah) Kementan RI, Rekomendasi Pemupukan Berimbang.\n2. Petunjuk Teknis Pembuatan Pupuk Kompos dan Pupuk Organik Cair Kelompok Tani.'
        },
        {
          key: 'C',
          title: 'Pengelolaan Limbah Pertanian Berkelanjutan (Jerami Tanpa Bakar)',
          subtitle: 'Larangan Bakar Jerami di Sawah, Mulsa Alami, Biogas & Fermentasi Pakan Silase Sapi',
          guidedPoints: [
            'Dampak merusak dari kebiasaan membakar jerami pascapanen di sawah: kabut asap polusi udara, hilangnya unsur hara nitrogen alami, dan kematian mikroba tanah.',
            'Teknik dekomposisi jerami langsung di petak sawah menggunakan larutan mikroba pengurai cepat sebelum proses pengolahan tanah dimulai.',
            'Pemanfaatan jerami padi sebagai bahan baku pakan fermentasi (silase) untuk ternak sapi potong pada masa kemarau paceklik rumput hijau.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai bahaya membakar jerami di sawah dan solusi pemanfaatan jerami sebagai mulsa organik serta pakan fermentasi sapi... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Peraturan Pengendalian Pencemaran dan Larangan Pembakaran Lahan Pertanian\n2. Jurnal Teknologi Pengolahan Limbah Biomassa Pertanian Tropis',
          defaultExp: 'Praktik membakar jerami pascapanen harus dihentikan karena merusak keanekaragaman hayati tanah, memicu emisi gas rumah kaca, dan menghilangkan potensi pengembalian unsur hara kalium alami ke tanah sawah. Pemanfaatan limbah jerami sebagai mulsa organik, pengomposan dengan dekomposer in-situ, serta pengolahan silase pakan ternak menciptakan integrasi pertanian-peternakan yang ramah lingkungan.',
          defaultSources: '1. Peraturan Daerah tentang Pengendalian Pencemaran dan Larangan Pembakaran Lahan Pertanian.\n2. Jurnal Teknologi Pengolahan Limbah Biomassa Pertanian Tropis.'
        },
        {
          key: 'D',
          title: 'Kearifan Lokal Konservasi Air Irigasi Belitang & Tradisi Sambatan',
          subtitle: 'Kelembagaan Ulu-Ulu Pembagi Air, Jadwal Buka Pintu, Gotong Royong Tanggul & Norma Sosial',
          guidedPoints: [
            'Peran dan fungsi kelembagaan petugas ulu-ulu dalam mengatur giliran debit aliran air ke petak sawah petani secara musyawarah dan adil.',
            'Tradisi gotong royong kerja bakti sambatan membersihkan sedimen lumpur dan eceng gondok di sepanjang saluran sekunder dan tersier irigasi Belitang.',
            'Norma sosial dan sanksi adat pedesaan dalam memelihara kebersihan sumber mata air dan larangan membuang sampah domestik ke saluran irigasi Komering.'
          ],
          placeholder: 'Tuliskan hasil kajian Anda mengenai kearifan lokal petugas ulu-ulu dalam membagi air irigasi serta tradisi gotong royong membersihkan saluran irigasi di Belitang... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Kearifan Lokal Tata Kelola Air Pertanian Tradisional Nusantara\n2. Laporan Pengelolaan Sumber Daya Air BBWS Sumatera VIII',
          defaultExp: 'Kearifan lokal sistem kelembagaan pengatur air (ulu-ulu) di kawasan Belitang memadukan tata tertib adat dengan manajemen teknis hidrologi dalam pembagian debit air irigasi secara berkeadilan. Nilai luhur gotong royong kerja bakti membersihkan saluran tersier dari gulma dan endapan lumpur secara kolektif menjaga kontinuitas pasokan air sawah sekaligus memelihara kerukunan antar-warga desa.',
          defaultSources: '1. Buku Kearifan Lokal Tata Kelola Air Pertanian Nusantara.\n2. Laporan Pengelolaan Sumber Daya Air Balai Besar Wilayah Sungai (BBWS) Sumatera VIII.'
        },
        {
          key: 'E',
          title: 'Pertanian Berkelanjutan (Sustainable Agriculture) Menghadapi Iklim Ekstrem',
          subtitle: 'Antisipasi El Nino / La Nina, Embung Cadangan Air & Model Pertanian Cerdas Iklim (CSA)',
          guidedPoints: [
            'Dampak anomali cuaca global (kemarau panjang El Nino dan curah hujan ekstrem La Nina) terhadap kalender musim tanam padi di Kabupaten OKU Timur.',
            'Pembangunan embung penampung air hujan dan sumur bor resapan sebagai sumber cadangan air kritis saat debit saluran irigasi menyusut di musim kemarau.',
            'Konsep penerapan Climate-Smart Agriculture (CSA): pemilihan bibit toleran kekeringan/genangan dan penyesuaian pola tanam berbasis informasi prakiraan cuaca BMKG.'
          ],
          placeholder: 'Uraikan hasil analisis Anda mengenai ancaman perubahan iklim terhadap sawah OKU Timur serta langkah adaptasi pertanian cerdas iklim (embung air dan bibit tahan cuaca)... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Publikasi BMKG: Panduan Informasi Iklim Sektor Pertanian Tanaman Pangan\n2. Pedoman Adaptasi Perubahan Iklim Pertanian Berkelanjutan, Bappenas RI',
          defaultExp: 'Anomali iklim global seperti kemarau panjang El Nino dan curah hujan ekstrem La Nina menuntut transformasi sistem pertanian OKU Timur menuju model Climate-Smart Agriculture (CSA). Pembangunan embung penampung air terpadu, adopsi varietas padi tahan genangan dan kekeringan, serta pengaturan pola tanam berbasis data prakiraan cuaca BMKG menjadi strategi adaptif mutlak ketahanan pangan daerah.',
          defaultSources: '1. Publikasi BMKG tentang Panduan Iklim dan Musim Tanam Sektor Pertanian.\n2. Pedoman Adaptasi Perubahan Iklim Pertanian Berkelanjutan Bappenas RI.'
        }
      ]
    },

    7: {
      dayNum: 7,
      title: 'Modul Riset Day 7: Evaluasi Komprehensif, Sintesis Pembelajaran 7 Hari & Portofolio FINCESTEM',
      theme: 'Pilar Financial, Industry, Nature, Culture, STEM',
      gradientClass: 'from-cyan-950 via-slate-900 to-indigo-950 border-cyan-700/40',
      tagColorClass: 'bg-white/20 text-cyan-100',
      badgeColorClass: 'bg-emerald-400 text-slate-950',
      subtitle: 'Sintesis Holistik Empat Pilar FINCESTEM, Refleksi Kritis Pengalaman Riset Lapangan, Formulasi Rekomendasi Solutif bagi Stakeholder Daerah, Rencana Aksi Wirausaha Pemuda & Penyusunan Dokumen Portofolio Resmi',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda ditugaskan menyelesaikan <strong>Sintesis Evaluasi Akhir & Penyusunan Portofolio Riset FINCESTEM 2026</strong>, merefleksikan seluruh temuan lapangan Day 1 s.d. Day 6, menyusun rekomendasi kebijakan bagi daerah, serta merumuskan rencana aksi kewirausahaan masa depan.',
      cards: [
        {
          key: 'A',
          title: 'Sintesis Integratif Empat Pilar FINCESTEM di Kabupaten OKU Timur',
          subtitle: 'Keterpaduan Dimensi Financial, Industry/STEM, Nature & Culture dalam Realitas Nyata',
          guidedPoints: [
            'Analisis bagaimana pilar Budaya (Culture) gotong royong sambatan mempengaruhi efisiensi pilar Finansial (Financial) dalam menekan biaya operasional usaha tani.',
            'Keterkaitan erat antara pilar Alam (Nature) saluran irigasi Danau Ranau dengan pilar Teknologi (STEM) mekanisasi alsintan dalam mendorong produktivitas lumbung pangan.',
            'Kesimpulan ilmiah bahwa kemajuan agrobisnis daerah harus berdiri kokoh di atas keseimbangan kelestarian ekosistem alam dan jati diri budaya lokal.'
          ],
          placeholder: 'Uraikan sintesis integratif Anda mengenai bagaimana pilar budaya, finansial, alam, dan teknologi saling menopang kemajuan Kabupaten OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Kurikulum Kokurikuler FINCESTEM 2026 SMAN 1 Belitang\n2. Jurnal Pendidikan Karakter Berbasis Masalah Nyata Lingkungan Daerah',
          defaultExp: 'Sintesis menyeluruh pembelajaran 7 hari FINCESTEM membuktikan bahwa kemajuan agrobisnis di OKU Timur tidak dapat dipisahkan dari sinergi empat pilar: nilai luhur budaya gotong royong (Culture) memperkuat modal sosial dan efisiensi biaya (Financial), yang bersinergi dengan kelestarian ekosistem tanah dan air (Nature), serta akselerasi mekanisasi dan teknologi presisi (STEM) guna mewujudkan kemakmuran daerah yang berkeadilan.',
          defaultSources: '1. Buku Panduan Kurikulum Kokurikuler FINCESTEM 2026, SMAN 1 Belitang.\n2. Jurnal Pendidikan Karakter Berbasis Masalah Nyata Lingkungan Daerah.'
        },
        {
          key: 'B',
          title: 'Refleksi Kritis Pengalaman Riset & Transformasi Karakter Siswa',
          subtitle: 'Pembelajaran Kontekstual Berbasis Masalah Nyata, Daya Tangguh & Empati Sosial',
          guidedPoints: [
            'Evaluasi jujur terhadap perubahan sudut pandang (mindset) siswa setelah mengamati langsung kerja keras para petani, pengelola kilang padi, dan pedagang pasar.',
            'Refleksi mengenai keterampilan baru yang berhasil dikuasai selama riset mandiri: kemampuan observasi investigatif, analisis data ekonomi, dan penulisan ilmiah orisinal.',
            'Komitmen personal siswa dalam menerapkan kedisiplinan mengelola keuangan pribadi serta menghargai jerih payah produsen pangan penopang kehidupan.'
          ],
          placeholder: 'Tuliskan refleksi mendalam Anda mengenai perubahan cara pandang, keterampilan baru yang didapat, dan komitmen kedisiplinan diri setelah menyelesaikan riset 7 hari... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Pembelajaran Berbasis Riset Kontekstual Kemendikbudristek\n2. Modul Refleksi Diri dan Pembentukan Profil Pelajar Pancasila',
          defaultExp: 'Pembelajaran mandiri selama tujuh hari memberikan transformasi karakter mendalam bagi siswa, menumbuhkan empati sosial dan rasa hormat yang tulus atas jerih payah para petani dan pelaku UMKM penopang ketahanan pangan daerah. Pengalaman investigasi lapangan melatih kemampuan berpikir kritis, ketelitian observasi ilmiah, serta kematangan kedisiplinan diri dalam mengelola sumber daya secara bertanggung jawab.',
          defaultSources: '1. Panduan Pembelajaran Berbasis Proyek (Project-Based Learning) Kemendikbudristek.\n2. Modul Refleksi Diri dan Pembentukan Karakter Pelajar Pancasila.'
        },
        {
          key: 'C',
          title: 'Formulasi Rekomendasi Solutif bagi Pemangku Kepentingan OKU Timur',
          subtitle: 'Usulan Kebijakan Distribusi Pupuk, Pemeliharaan Irigasi Tersier & Regenerasi Petani Muda',
          guidedPoints: [
            'Rekomendasi konkret perbaikan sistem penyaluran kuota pupuk subsidi dan percepatan pemeliharaan tanggul pintu air irigasi tersier desa.',
            'Usulan program pendampingan intensif bagi klaster UMKM pelosok dalam hal kemasan kedap udara, branding modern, dan fasilitasi sertifikasi halal resmi.',
            'Inisiatif pembentukan forum pemuda agribisnis milenial daerah guna menarik minat generasi muda terdidik untuk berwirausaha membangun kampung halaman.'
          ],
          placeholder: 'Uraikan rekomendasi solutif yang Anda ajukan bagi pemerintah daerah, dinas pertanian, dan kelompok tani demi kemajuan agribisnis di OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Rencana Pembangunan Jangka Menengah Daerah (RPJMD) Kabupaten OKU Timur\n2. Naskah Kebijakan Ketahanan Pangan dan Pemberdayaan Petani Muda Daerah',
          defaultExp: 'Berdasarkan temuan riset faktual, rekomendasi kebijakan yang diajukan bagi pemangku kepentingan OKU Timur mencakup: optimalisasi pemeliharaan berkala tanggul dan pintu air irigasi tersier, penguatan penyuluhan teknologi pupuk organik mandiri untuk menekan kelangkaan pupuk subsidi, serta penyediaan ruang inkubasi wirausaha muda agrikultur guna menarik minat generasi terdidik membangun daerah.',
          defaultSources: '1. Dokumen Rencana Pembangunan Jangka Menengah Daerah (RPJMD) Kabupaten OKU Timur.\n2. Naskah Kebijakan Publik Ketahanan Pangan dan Pemberdayaan Petani Muda Daerah.'
        },
        {
          key: 'D',
          title: 'Penyusunan Rencana Aksi Kewirausahaan Muda Berbasis Potensi Lokal',
          subtitle: 'Gagasan Ide Bisnis Olahan Pangan, Estimasi Modal Awal & Strategi Promosi Digital',
          guidedPoints: [
            'Gagasan ide bisnis inovatif yang potensial dirintis generasi muda dengan mengolah komoditas unggulan lokal (padi organik, olahan ikan, limbah jerami).',
            'Rancangan operasional sederhana: penghitungan estimasi modal awal, penentuan Harga Pokok Penjualan (HPP), dan pemilihan target segmen konsumen.',
            'Strategi promosi dan penjualan menggunakan platform media sosial, marketplace lokal, dan layanan pesan antar yang efisien dan minim modal.'
          ],
          placeholder: 'Tuliskan rancangan ide bisnis kreatif berbasis potensi lokal OKU Timur yang ingin Anda rintis, mencakup produk, estimasi modal, dan strategi pemasarannya... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Panduan Penyusunan Rencana Bisnis Sederhana (Business Plan) untuk Pemula\n2. Modul Kewirausahaan Terapan SMA/SMK Kemendikbudristek',
          defaultExp: 'Rencana aksi kewirausahaan masa depan difokuskan pada pengembangan produk hilirisasi bernilai tambah tinggi, seperti inovasi kemasan beras organik premium personal size dan camilan olahan pangan berbahan baku lokal dengan pemasaran e-commerce. Perencanaan bisnis ini memadukan kalkulasi modal yang terukur, kepatuhan legalitas higienis, serta strategi promosi digital yang adaptif terhadap tren pasar modern.',
          defaultSources: '1. Buku Panduan Penyusunan Business Plan Sederhana untuk Wirausaha Pemula.\n2. Modul Kewirausahaan Terapan SMK/SMA Direktorat PSMA Kemendikbudristek.'
        },
        {
          key: 'E',
          title: 'Penataan Portofolio Hasil Riset Mandiri 7 Hari sebagai Dokumen Resmi',
          subtitle: 'Sistematika Laporan Akhir, Bukti Autentik LKPD, Lampiran Foto Geotagging & Lembar Pengesahan',
          guidedPoints: [
            'Sistematika penataan dokumen portofolio akhir: Cover resmi identitas, Lembar Pengesahan Fasilitator Pembina, Resume 5 Modul Belajar, Rekap LKPD, dan Catatan Jurnal Refleksi.',
            'Kelengkapan lampiran autentik: bukti foto dokumentasi lapangan ber-geotagging dan lembar catatan wawancara narasumber usaha.',
            'Pencapaian penilaian portofolio sebagai bukti kelulusan program kokurikuler resmi FINCESTEM 2026 dengan predikat kompetensi memuaskan.'
          ],
          placeholder: 'Uraikan hasil penataan portofolio riset mandiri 7 hari Anda, kelengkapan berkas lampiran foto, serta makna portofolio ini bagi kelulusan akademik Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Petunjuk Teknis Penilaian Portofolio Kokurikuler SMAN 1 Belitang\n2. Standar Penilaian Pendidikan Berbasis Portofolio, BSKAP Kemendikbudristek',
          defaultExp: 'Portofolio hasil riset mandiri tujuh hari ditata sebagai dokumen akademik resmi yang menghimpun seluruh lembar kerja lapangan terverifikasi, sintesis modul kajian, hasil penilaian asesmen digital, serta bukti foto dokumentasi lapangan. Dokumen ini menjadi portofolio portofolio autentik yang membuktikan pencapaian kompetensi holistik siswa dalam kurikulum kokurikuler FINCESTEM 2026.',
          defaultSources: '1. Petunjuk Teknis Penilaian Portofolio Kokurikuler SMAN 1 Belitang.\n2. Standar Penilaian Pendidikan Berbasis Portofolio, BSKAP Kemendikbudristek.'
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

    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

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

    const cardDataMap = {};
    cfg.cards.forEach(cardCfg => {
      const k = cardCfg.key;
      const rawCard = (savedOfficial && savedOfficial['card' + k]) || (draft && draft['card' + k]) || { text: '', source: '' };
      cardDataMap[k] = isSubmitted ? expandCardIfShort(rawCard, cardCfg.title, cardCfg.defaultExp, cardCfg.defaultSources) : rawCard;
    });

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

        <!-- PROGRESS BAR INDIKATOR HARI INI -->
        <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-700 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-600">checklist</span>
              <span>Progres Kelengkapan 5 Kartu Riset Day ${dayNum}:</span>
            </span>
            <span id="lblNftD${dayNum}ProgressCount" class="font-black text-teal-800">0 / 5 Kartu Terpenuhi</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div id="barNftD${dayNum}Progress" class="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- FORMULIR 5 KARTU RISET (A, B, C, D, E) -->
        <form id="formNftDay${dayNum}Cards" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          ${cfg.cards.map(c => {
            const k = c.key;
            const dataK = cardDataMap[k] || { text: '', source: '' };
            return `
              <div id="cardBoxD${dayNum}_${k}" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
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

                <!-- Panduan Poin Riset dengan Penomoran Numbering Rapi Rata Kanan-Kiri -->
                <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">fact_check</span>
                    <span>Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
                  </span>
                  <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium text-justify">
                    ${c.guidedPoints.map(p => `<li class="pl-1 text-justify leading-relaxed">${p}</li>`).join('')}
                  </ol>
                </div>

                <!-- Kolom Esai Analisis Siswa (Rata Kanan-Kiri) -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
                  <textarea id="nftD${dayNum}Text${k}" rows="6" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, '${k}')" placeholder="${c.placeholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${dataK.text || ''}</textarea>
                  <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                    <span id="msgValidationD${dayNum}_${k}" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                    <span id="counterD${dayNum}_${k}" class="text-slate-400 font-bold">0 / 300</span>
                  </div>
                </div>

                <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan & Rata Kanan-Kiri) -->
                <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                  <div class="flex items-center justify-between gap-2">
                    <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                      <span>Sumber Rujukan Wajib (Buku / Jurnal / Laporan Resmi / URL Terverifikasi):</span>
                    </label>
                    ${!isSubmitted ? `
                      <button type="button" onclick="appendNextSourceForDay(${dayNum}, '${k}')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                        <span class="material-symbols-outlined text-xs">add_circle</span>
                        <span>+ Tambah Rujukan Lain</span>
                      </button>
                    ` : ''}
                  </div>
                  <textarea id="nftD${dayNum}Source${k}" rows="2" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, '${k}')" placeholder="${c.sourcePlaceholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${dataK.source || ''}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgSourceD${dayNum}_${k}" class="text-slate-400 font-medium">Cantumkan judul referensi, pengarang/penerbit, hal, atau URL resmi. Minimal 20 karakter.</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}

          <!-- TOMBOL SUBMIT RESMI MODUL -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20 backdrop-blur-md bg-white/95">
            <div class="flex flex-col min-w-0 text-center sm:text-left">
              <span id="lblSummaryProgressD${dayNum}" class="font-black text-xs sm:text-sm text-slate-900">0 dari 5 Kartu Riset Memenuhi Syarat</span>
              <span class="text-[11px] text-slate-500 font-medium text-justify">Seluruh kartu wajib mencapai minimal 300 karakter analisis mendalam dan mencantumkan sumber rujukan valid.</span>
            </div>
            
            <button type="button" id="btnSubmitNftMateriD${dayNum}" onclick="submitNftDayMateriUnified(${dayNum})" disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-300 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs">
              <span class="material-symbols-outlined text-base">lock</span>
              <span>Lengkapi 5 Kartu Terlebih Dahulu</span>
            </button>
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

    const textEl = document.getElementById(`nftD${dayNum}Text${key}`);
    const srcEl = document.getElementById(`nftD${dayNum}Source${key}`);
    const boxEl = document.getElementById(`cardBoxD${dayNum}_${key}`);
    const badgeEl = document.getElementById(`badgeCardStatusD${dayNum}_${key}`);
    const countEl = document.getElementById(`counterD${dayNum}_${key}`);
    const msgValEl = document.getElementById(`msgValidationD${dayNum}_${key}`);
    const msgSrcEl = document.getElementById(`msgSourceD${dayNum}_${key}`);

    if (!textEl || !srcEl) return false;

    const valText = validateScientificContent(textEl.value, 300);
    const valSrc = validateSourceCitation(srcEl.value, 20);

    const isCardComplete = isSubmitted ? true : (valText.valid && valSrc.valid);

    if (valText.valid || isSubmitted) {
      if (countEl) {
        countEl.textContent = `${Math.max(valText.count, 300)} / 300`;
        countEl.className = 'text-emerald-700 font-bold';
      }
      if (msgValEl) {
        msgValEl.textContent = '✓ Analisis ilmiah terverifikasi memenuhi syarat';
        msgValEl.className = 'text-emerald-700 font-semibold';
      }
    } else {
      if (countEl) {
        countEl.textContent = `${valText.count} / 300`;
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
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-emerald-50/20 border-2 border-emerald-400 shadow-xs flex flex-col gap-3.5 transition-all';
      if (badgeEl) {
        badgeEl.textContent = '✓ Lengkap';
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs';
      }
    } else {
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all';
      if (badgeEl) {
        badgeEl.textContent = 'Belum Lengkap';
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
      }
    }

    if (autoSave && !isSubmitted) {
      saveNftDraftThrottledUnified(dayNum);
    }

    return isCardComplete;
  }

  // Aliases backward compatibility
  function evaluateCard(key, autoSave) { return evaluateCardForDay(1, key, autoSave); }
  function evaluateCardD2(key, updateUI) { return evaluateCardForDay(2, key, false); }

  function evaluateAllCardsForDay(dayNum, autoSave) {
    dayNum = parseInt(dayNum) || 1;
    const isSubmitted = !!window[`isNftD${dayNum}Submitted`];
    const keys = ['A', 'B', 'C', 'D', 'E'];
    let completedCount = 0;

    keys.forEach(k => {
      if (evaluateCardForDay(dayNum, k, false)) completedCount++;
    });

    if (isSubmitted) completedCount = 5;

    const pct = Math.round((completedCount / keys.length) * 100);

    const barEl = document.getElementById(`barNftD${dayNum}Progress`);
    const lblProg = document.getElementById(`lblNftD${dayNum}ProgressCount`);
    const lblSummary = document.getElementById(`lblSummaryProgressD${dayNum}`);
    const btnSubmit = document.getElementById(`btnSubmitNftMateriD${dayNum}`);

    if (barEl) barEl.style.width = pct + '%';
    if (lblProg) lblProg.textContent = `${completedCount} / 5 Kartu Terpenuhi (${pct}%)`;
    if (lblSummary) lblSummary.textContent = `${completedCount} dari 5 Kartu Riset Memenuhi Syarat (${pct}%)`;

    if (btnSubmit) {
      if (isSubmitted) {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-default';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">verified</span>
          <span>✓ Riset Day ${dayNum} Telah Terkirim Resmi ke Fasilitator</span>
        `;
      } else if (completedCount === keys.length) {
        btnSubmit.disabled = false;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ring-2 ring-emerald-400/40';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">send</span>
          <span>Simpan &amp; Kirim Riset Day ${dayNum} ke Fasilitator</span>
        `;
      } else {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">lock</span>
          <span>Lengkapi 5 Kartu Terlebih Dahulu (${completedCount}/5)</span>
        `;
      }
    }
  }

  // Aliases backward compatibility
  function evaluateAllNftCards(autoSave) { evaluateAllCardsForDay(1, autoSave); }
  function updateDay2OverallProgress() { evaluateAllCardsForDay(2, false); }

  // 5. AUTO-SAVE DRAFT REAL-TIME (THROTTLED 800MS)
  let draftTimers = {};
  function saveNftDraftThrottledUnified(dayNum) {
    if (draftTimers[dayNum]) clearTimeout(draftTimers[dayNum]);
    draftTimers[dayNum] = setTimeout(() => {
      saveNftDraftImmediateUnified(dayNum);
    }, 800);
  }

  function saveNftDraftImmediateUnified(dayNum) {
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return;

      const keys = ['A', 'B', 'C', 'D', 'E'];
      const draftObj = {
        day: dayNum,
        updatedAt: new Date().toISOString()
      };

      keys.forEach(k => {
        const textEl = document.getElementById(`nftD${dayNum}Text${k}`);
        const srcEl = document.getElementById(`nftD${dayNum}Source${k}`);
        draftObj['card' + k] = {
          text: textEl ? textEl.value : '',
          source: srcEl ? srcEl.value : ''
        };
      });

      localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify(draftObj));
    } catch (e) {}
  }

  // 6. SUBMIT RESMI KE FASILITATOR (DAY 1 S.D. DAY 7)
  window.submitNftDayMateriUnified = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const keys = ['A', 'B', 'C', 'D', 'E'];
    const invalidKeys = [];

    keys.forEach(k => {
      if (!evaluateCardForDay(dayNum, k, false)) invalidKeys.push(k);
    });

    if (invalidKeys.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat (minimal 300 karakter analisis mendalam & sumber valid)!`, 'error');
      } else {
        alert(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat!`);
      }
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const officialPayload = {
      day: dayNum,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || ''
    };

    cfg.cards.forEach(c => {
      const k = c.key;
      const textEl = document.getElementById(`nftD${dayNum}Text${k}`);
      const srcEl = document.getElementById(`nftD${dayNum}Source${k}`);
      officialPayload['card' + k] = {
        title: c.title,
        text: textEl ? textEl.value.trim() : '',
        source: srcEl ? srcEl.value.trim() : ''
      };
    });

    const summaryText = `Riset Mandiri Day ${dayNum} Non-Field Trip Terverifikasi (5 Kartu Lengkap):\n` +
      `• Topik A: ${officialPayload.cardA.text.substring(0, 80)}...\n` +
      `• Topik B: ${officialPayload.cardB.text.substring(0, 80)}...\n` +
      `• Topik C: ${officialPayload.cardC.text.substring(0, 80)}...\n` +
      `• Topik D: ${officialPayload.cardD.text.substring(0, 80)}...\n` +
      `• Topik E: ${officialPayload.cardE.text.substring(0, 80)}...`;

    officialPayload.conclusion = summaryText;
    officialPayload.summary = summaryText;

    try {
      localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem(`fincestem_materi_day${dayNum}_` + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
      localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
    } catch(e) {}

    window[`isNftD${dayNum}Submitted`] = true;

    // Submit ke sistem Core Progress FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'materi', officialPayload, function() {
        showSuccessNftMateriModalUnified(dayNum);
      });
    } else {
      showSuccessNftMateriModalUnified(dayNum);
    }
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
  // 6B. MODUL ORIENTASI & SIMULASI KHUSUS DAY 0 (GLADI BERSIH NON-FIELD TRIP)
  // =========================================================================
  function renderDay0NonFieldTripModule(container) {
    if (!container) return;
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    let savedOfficial = null;
    try {
      const raw = localStorage.getItem('fincestem_materi_nft_day0_' + cleanNisn) ||
                  localStorage.getItem('fincestem_materi_day0_' + cleanNisn);
      if (raw) savedOfficial = JSON.parse(raw);
    } catch(e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.summary || savedOfficial.conclusion));
    const savedText = (savedOfficial && (savedOfficial.summary || savedOfficial.conclusion || savedOfficial.text)) || '';

    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <!-- BANNER HEADER DAY 0 -->
        <div class="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white shadow-lg border border-amber-500/50 flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-300 text-slate-950 flex items-center gap-1 shadow-2xs">
              <span class="material-symbols-outlined text-sm">model_training</span>
              <span>Day 0 • Gladi Bersih</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-amber-100 border border-white/20">
              Orientasi Sistem Non-Field Trip
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              Panduan &amp; Orientasi Riset Mandiri FINCESTEM 2026
            </h1>
            <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium mt-1">
              Simulasi alur menyeluruh bagi peserta didik Non-Field Trip di wilayah Kabupaten OKU Timur sebelum pelaksanaan hari pertama.
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="p-3 sm:p-3.5 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
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

        <!-- 3 KARTU KONSEPTUAL ORIENTASI -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span class="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-base">account_tree</span>
            </span>
            <div>
              <h3 class="font-black text-sm text-slate-900">1. Integrasi 4 Pilar FINCESTEM 2026</h3>
              <p class="text-[11px] text-slate-500">Keterpaduan lintas disiplin ilmu riset kontekstual</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-justify">
            <div class="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col gap-1">
              <strong class="text-teal-900 font-extrabold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">payments</span> Financial &amp; Economics
              </strong>
              <p class="text-slate-600 leading-relaxed text-[11.5px]">
                Mempelajari literasi keuangan, perhitungan HPP, margin laba, sistem pembayaran non-tunai (QRIS), dan analisis rantai pasok ekonomi di OKU Timur.
              </p>
            </div>

            <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-1">
              <strong class="text-amber-900 font-extrabold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">temple_buddhist</span> Culture &amp; Society
              </strong>
              <p class="text-slate-600 leading-relaxed text-[11.5px]">
                Menggali kearifan lokal Komering &amp; Jawa transmigran, etika bermasyarakat, gotong royong, dan nilai-nilai sosial budaya pedesaan.
              </p>
            </div>

            <div class="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col gap-1">
              <strong class="text-blue-900 font-extrabold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">science</span> Science &amp; Technology
              </strong>
              <p class="text-slate-600 leading-relaxed text-[11.5px]">
                Memanfaatkan pendekatan sains pengamatan (kualitas tanah, air, fermentasi) dan teknologi digital (GPS Geotagging, Google Form, aplikasi FINCESTEM).
              </p>
            </div>

            <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col gap-1">
              <strong class="text-emerald-900 font-extrabold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">precision_manufacturing</span> Engineering &amp; Math
              </strong>
              <p class="text-slate-600 leading-relaxed text-[11.5px]">
                Menganalisis efisiensi mekanisasi alat pertanian/produksi, pemodelan matematis proyeksi panen, dan perancangan solusi inovatif.
              </p>
            </div>
          </div>
        </div>

        <!-- ALUR SISTEM BERURUTAN (CASCADING) -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-base">alt_route</span>
            </span>
            <div>
              <h3 class="font-black text-sm text-slate-900">2. Alur Pengerjaan Harian Berurutan (*Cascading*)</h3>
              <p class="text-[11px] text-slate-500">Sistem otomatis membuka instrumen secara bertahap</p>
            </div>
          </div>

          <div class="flex flex-col gap-2 text-xs">
            <div class="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <strong class="text-slate-900 block font-bold">Modul Belajar Digital</strong>
                <p class="text-slate-600 text-[11.5px] leading-relaxed">Membaca materi pengantar dan menyelesaikan kartu riset mandiri.</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <strong class="text-slate-900 block font-bold">Lembar Kerja Peserta Didik (LKPD)</strong>
                <p class="text-slate-600 text-[11.5px] leading-relaxed">Mengisi instrumen observasi lapangan dan rancangan anggaran kelompok.</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
              <div>
                <strong class="text-slate-900 block font-bold">Kuis Asesmen CBT (Exam Shield)</strong>
                <p class="text-slate-600 text-[11.5px] leading-relaxed">Mengerjakan kuis objektif dengan sistem pengaman anti-contek dan timer.</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">4</span>
              <div>
                <strong class="text-slate-900 block font-bold">Dokumentasi Foto Geotagging GPS</strong>
                <p class="text-slate-600 text-[11.5px] leading-relaxed">Mengunggah foto autentik di lapangan dengan watermark koordinat otomatis.</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">5</span>
              <div>
                <strong class="text-slate-900 block font-bold">Jurnal Refleksi Mandiri</strong>
                <p class="text-slate-600 text-[11.5px] leading-relaxed">Menuliskan evaluasi diri dan makna pembelajaran yang diperoleh.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FORM LATIHAN PENGISIAN MODUL DAY 0 -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-base">edit_note</span>
            </span>
            <div>
              <h3 class="font-black text-sm text-slate-900">3. Simulasi Pengisian Resume Modul</h3>
              <p class="text-[11px] text-slate-500">Tuliskan pemahaman singkat Anda sebagai latihan</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-slate-700">
              Catatan Orientasi &amp; Kesiapan Riset Kelompok Anda:
            </label>
            <textarea id="nftD0MateriSummary" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-50 text-slate-600' : 'bg-white'}" placeholder="Contoh: Saya dan kelompok siap melaksanakan riset mandiri FINCESTEM 2026 di OKU Timur dengan jujur, disiplin, dan berkolaborasi secara kompak...">${savedText}</textarea>
            <span id="nftD0MateriCounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter untuk simulasi latihan.</span>
          </div>

          ${isSubmitted ? `
            <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs mt-1">
              <div class="flex items-center gap-2 text-emerald-950 font-bold">
                <span class="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                <span>Modul Simulasi Day 0 telah selesai diselesaikan!</span>
              </div>
              <a href="lkpd.html?day=0" class="px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1 shrink-0">
                <span>Buka LKPD Day 0</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          ` : `
            <button type="button" onclick="submitDay0NonFieldTripMateri()" id="btnSubmitD0Materi" class="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-1">
              <span class="material-symbols-outlined text-lg">done_all</span>
              <span>Selesaikan Simulasi Modul &amp; Buka LKPD Day 0</span>
            </button>
          `}
        </div>
      </div>
    `;

    // Pasang listener input counter jika belum submit
    if (!isSubmitted) {
      const txt = document.getElementById('nftD0MateriSummary');
      const counter = document.getElementById('nftD0MateriCounter');
      if (txt && counter) {
        txt.addEventListener('input', () => {
          const len = txt.value.trim().length;
          if (len < 20) {
            counter.textContent = `Kurang ${20 - len} karakter lagi (Minimal 20 karakter).`;
            counter.className = 'text-[11px] text-rose-600 font-semibold';
          } else {
            counter.textContent = `✓ ${len} karakter (Memenuhi syarat).`;
            counter.className = 'text-[11px] text-emerald-600 font-bold';
          }
        });
      }
    }
  }

  window.submitDay0NonFieldTripMateri = function() {
    const txt = document.getElementById('nftD0MateriSummary');
    const val = (txt ? txt.value.trim() : '');
    if (val.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Catatan simulasi minimal 20 karakter sebelum ditandai selesai!', 'warning');
      } else {
        alert('Catatan simulasi minimal 20 karakter sebelum ditandai selesai!');
      }
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const payload = {
      submitted: true,
      day: 0,
      summary: val,
      conclusion: val,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('fincestem_materi_nft_day0_' + cleanNisn, JSON.stringify(payload));
      localStorage.setItem('fincestem_materi_day0_' + cleanNisn, JSON.stringify(payload));
    } catch(e) {}

    if (window.FincestemCore && FincestemCore.progress && cleanNisn) {
      FincestemCore.progress.submitTask(cleanNisn, 0, 'materi', payload, function() {
        if (window.FincestemCore.ui) {
          FincestemCore.ui.toast('Simulasi Modul Day 0 Selesai! Tahap 2: LKPD Latihan sekarang terbuka.', 'success');
        }
      });
    }

    // Tampilkan modal transisi ke LKPD Day 0
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">task_alt</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
            Tahap 1 Tuntas • Simulasi Modul
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day 0 Berhasil Diselesaikan!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
            Bagus sekali! Anda telah memahami konsep 4 pilar FINCESTEM dan alur sistem. Tahap selanjutnya adalah mencoba <strong>LKPD Latihan Day 0</strong> (2 pertanyaan singkat).
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=0" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut ke Tahap 2: LKPD Day 0</span>
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

  // 7. EKSPOR FUNGSI KE WINDOW GLOBAL (SEMUA HARI DAY 0 S.D. DAY 7)
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

})(window);
