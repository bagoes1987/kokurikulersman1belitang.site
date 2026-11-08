/**
 * FINCESTEM 2026 - Bank Soal Digital Asesmen Khusus Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur
 * Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)
 * Day 2: 200 Soal Pilihan Ganda (5 Modul x 40 Soal: Bloom C1-C5)
 * Standar Kognitif Taksonomi Bloom Berimbang: C1 (25%), C2 (25%), C3 (25%), C4 (25%)
 * Keseimbangan & Homogenitas Panjang Opsi Jawaban (Tanpa Bocoran Tanda Kurung)
 * Distribusi Kunci Jawaban Proporsional Merata (A: 40, B: 40, C: 40, D: 40, E: 40)
 * Terkunci & Terisolasi Total (Bebas Konflik dengan Field Trip)
 * Versi: 20261029_nft_bs2
 */

(function(window) {
  'use strict';

    window.NFT_BANK_SOAL_INDICATORS = [
  {
    "code": "A",
    "key": "ind_kegiatan_ekonomi",
    "name": "A. Kegiatan Ekonomi",
    "desc": "Pengertian Kegiatan Ekonomi, Produksi, Distribusi, Konsumsi, serta Sektor Primer, Sekunder, dan Tersier."
  },
  {
    "code": "B",
    "key": "ind_literasi_finansial",
    "name": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "desc": "Empat Jenis Finansial (Pribadi, Bisnis, Publik, Internasional) & Lima Aspek Pengelolaan Keuangan (Arus Kas, Anggaran, Dana Darurat, Investasi, Utang)."
  },
  {
    "code": "C",
    "key": "ind_kebanksentralan",
    "name": "C. Kebanksentralan",
    "desc": "Pengertian Kebanksentralan, Tugas & Fungsi Bank Sentral, Bank Indonesia, Sistem Pembayaran QRIS/BI-FAST & Stabilitas Rupiah."
  },
  {
    "code": "D",
    "key": "ind_badan_usaha_koperasi",
    "name": "D. Badan Usaha dan Koperasi",
    "desc": "Pengertian Badan Usaha, BUMN, BUMS, BUMDes, Pengertian Koperasi, Dasar Hukum UU 25/1992, Prinsip & Peran Koperasi Rakyat."
  },
  {
    "code": "E",
    "key": "ind_potensi_oku_timur",
    "name": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "desc": "Pertanian Padi & Perkebunan Karet/Sawit, Peternakan Sapi & Perikanan Patin, Perdagangan Pasar Gumawang/UMKM, Persebaran Wilayah & Produk Unggulan Daerah."
  }
];

  window.NFT_BANK_SOAL_INDICATORS_DAY2 = [
  {
    "code": "A",
    "key": "modul_a_hakikat_budaya",
    "name": "Modul A: Hakikat Budaya & 7 Unsur Kebudayaan Universal",
    "desc": "Pengertian budaya (Koentjaraningrat/Tylor), wujud kebudayaan, 7 unsur universal, dan akulturasi multikultural di OKU Timur."
  },
  {
    "code": "B",
    "key": "modul_b_budaya_ekonomi_umkm",
    "name": "Modul B: Hubungan Budaya dengan Kegiatan Ekonomi, UMKM & Pekerjaan Formal",
    "desc": "Etos kerja, modal sosial gotong royong sambatan, Pasar Gumawang, UMKM pangan kemplang/rengginang, dan tenaga kerja formal."
  },
  {
    "code": "C",
    "key": "modul_c_agrikultur_unggulan",
    "name": "Modul C: Ragam Mata Pencaharian Sektor Agrikultur Unggulan",
    "desc": "Lumbung pangan padi sawah, rotasi palawija, perkebunan karet & sawit, budidaya patin, dan peternakan sapi perdesaan."
  },
  {
    "code": "D",
    "key": "modul_d_alsintan_irigasi",
    "name": "Modul D: Sistem Teknologi Alsintan Modern & Jaringan Irigasi",
    "desc": "Peralihan perkakas manual ke alsintan (traktor, transplanter, combine), efisiensi biaya, dan jaringan irigasi Bendung Perjaya."
  },
  {
    "code": "E",
    "key": "modul_e_inovasi_smart_farming",
    "name": "Modul E: Inovasi Penanaman, Pascapanen, Otomatisasi & Petani Cerdas",
    "desc": "Sistem jajar legowo, RMU modern/bed dryer, penekanan susut panen, adopsi drone sprayer, Katam BMKG, dan smart farming."
  }
];
  window.NFT_BANK_SOAL_INDICATORS_DAY3 = [
  {
    "code": "A",
    "key": "pilar_science",
    "name": "Pilar Science: Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas",
    "desc": "Kondisi fisik alam, parameter kualitas air/tanah, siklus fisiologis dan kesehatan komoditas unggulan OKU Timur."
  },
  {
    "code": "B",
    "key": "pilar_technology",
    "name": "Pilar Technology: Mesin, Peralatan Alsintan & Audit Efisiensi Kerja",
    "desc": "Identifikasi mesin kerja, alsintan modern/tradisional, mekanisasi hulu-hilir, dan audit efisiensi teknologi lapangan."
  },
  {
    "code": "C",
    "key": "pilar_engineering",
    "name": "Pilar Engineering: Troubleshooting Kendala & Rekayasa Solusi Praktis Lapangan",
    "desc": "Analisis problem teknis operasional narasumber dan modifikasi rekayasa kreatif solusi tepat guna yang diterapkan praktisi."
  },
  {
    "code": "D",
    "key": "pilar_mathematics",
    "name": "Pilar Mathematics: Analisis Finansial, HPP, Pendapatan & Kalkulasi Laba-Rugi",
    "desc": "Kalkulasi modal operasional, volume panen, HPP, FCR/efisiensi pakan, dan analisis laba-rugi agribisnis riil."
  },
  {
    "code": "E",
    "key": "pilar_stem_integration",
    "name": "Pilar STEM Integration: Sintesis Solusi Terpadu, Produktivitas & Keberlanjutan",
    "desc": "Keterpaduan 4 pilar STEM dalam meningkatkan produktivitas, ketahanan ekonomi, dan keberlanjutan usaha agro-maritim OKU Timur."
  }
];


    window.NFT_BANK_SOAL_CONFIG = {
    totalQuestionsInBank: 200,
    questionsPerStudent: 50,
    questionsPerIndicator: 10,
    durationMinutes: 60,
    totalIndicators: 5,
    cognitiveDistribution: {
      C1: 40, // 20%
      C2: 40, // 20%
      C3: 40, // 20%
      C4: 40, // 20%
      C5: 40  // 20%
    },
    keyDistribution: {
      A: 40, // 20%
      B: 40, // 20%
      C: 40, // 20%
      D: 40, // 20%
      E: 40  // 20%
    }
  };

window.NFT_BANK_SOAL_DAYS = {
    0: [
  {
    "id": 1,
    "day": 0,
    "indicatorCode": "A",
    "indicatorKey": "ind_tema_kokurikuler",
    "indicatorName": "Tema Resmi Kokurikuler 2026",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Pada halaman beranda web resmi FINCESTEM 2026 SMAN 1 Belitang, apa tema utama kegiatan kokurikuler yang diusung oleh sekolah?",
    "options": [
      {
        "key": "A",
        "text": "FINCESTEM SMAN 1 BELITANG : “BELAJAR MELAMPAUI RUANG KELAS”"
      },
      {
        "key": "B",
        "text": "FINCESTEM 2026 : “MENJELAJAHI CAKRAWALA SAINS NUSANTARA”"
      },
      {
        "key": "C",
        "text": "KOKURIKULER BELITANG : “MENGUKIR PRESTASI MENUJU INDONESIA EMAS”"
      },
      {
        "key": "D",
        "text": "FINCESTEM DIGITAL : “TRANSFORMASI PENDIDIKAN GENERASI MILENIAL”"
      },
      {
        "key": "E",
        "text": "SMAN 1 BELITANG : “MERDEKA BELAJAR BERBASIS RISET LABORATORIUM”"
      }
    ],
    "correct": "A",
    "explanation": "Pada judul utama beranda web tertulis jelas: FINCESTEM SMAN 1 BELITANG : “BELAJAR MELAMPAUI RUANG KELAS”."
  },
  {
    "id": 2,
    "day": 0,
    "indicatorCode": "A",
    "indicatorKey": "ind_akronim_fincestem",
    "indicatorName": "Kepanjangan Akronim FINCESTEM",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Berdasarkan penjelasan pada beranda web, kepanjangan resmi dari akronim tema FINCESTEM yang dikembangkan oleh SMA Negeri 1 Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Financial, Culture, Ecology, Social, Technology, Education, and Mechanics"
      },
      {
        "key": "B",
        "text": "Financial, Culture, Exploration, and STEM (Science, Technology, Engineering, and Mathematics)"
      },
      {
        "key": "C",
        "text": "Fiscal, Communication, Environment, Science, Tourism, Economy, and Mathematics"
      },
      {
        "key": "D",
        "text": "Finance, Creative, Exploration, Science, Technique, Environment, and Management"
      },
      {
        "key": "E",
        "text": "Formal, Culture, Education, Social, Technology, Engineering, and Mathematics"
      }
    ],
    "correct": "B",
    "explanation": "Di beranda web tertulis: SMA Negeri 1 Belitang mengembangkan kegiatan kokurikuler bertema FINCESTEM (Financial, Culture, Exploration, and STEM)."
  },
  {
    "id": 3,
    "day": 0,
    "indicatorCode": "B",
    "indicatorKey": "ind_ruang_pembelajaran",
    "indicatorName": "Dua Ruang Pembelajaran",
    "cognitiveLevel": "C2",
    "numberInIndicator": 3,
    "question": "Menurut informasi resmi di beranda web, pelaksanaan kegiatan FINCESTEM SMAN 1 Belitang dibagi menjadi dua ruang pembelajaran, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "FINCESTEM di Dalam Ruang Kelas dan FINCESTEM di Perpustakaan Sekolah"
      },
      {
        "key": "B",
        "text": "FINCESTEM Tatap Muka Teori dan FINCESTEM Ujian Praktik Sekolah"
      },
      {
        "key": "C",
        "text": "FINCESTEM di Kabupaten OKU Timur dan FINCESTEM di Luar Kabupaten OKU Timur"
      },
      {
        "key": "D",
        "text": "FINCESTEM Tingkat Kabupaten OKU Timur dan FINCESTEM Tingkat Provinsi Sumatera Selatan"
      },
      {
        "key": "E",
        "text": "FINCESTEM Ekstrakurikuler Wajib dan FINCESTEM Pembinaan Minat Bakat Siswa"
      }
    ],
    "correct": "C",
    "explanation": "Di beranda web dijelaskan: Pelaksanaannya dibagi menjadi dua ruang pembelajaran, yaitu FINCESTEM di Kabupaten OKU Timur dan FINCESTEM di luar Kabupaten OKU Timur."
  },
  {
    "id": 4,
    "day": 0,
    "indicatorCode": "B",
    "indicatorKey": "ind_4_dimensi_profil",
    "indicatorName": "4 Dimensi Profil Lulusan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 4,
    "question": "Pada bagian 'Pendekatan Pembelajaran Mendalam' di beranda web, empat dimensi Profil Lulusan yang dikembangkan secara terintegrasi melalui kegiatan FINCESTEM 2026 adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kejujuran, Kedisiplinan, Tanggung Jawab, dan Kesopanan"
      },
      {
        "key": "B",
        "text": "Literasi Numerasi, Penguasaan Bahasa Asing, Keterampilan Digital, dan Olahraga"
      },
      {
        "key": "C",
        "text": "Kepemimpinan, Jiwa Wirausaha, Bela Negara, dan Kebugaran Jasmani"
      },
      {
        "key": "D",
        "text": "Penalaran Kritis, Kreativitas, Kewargaan, dan Kemandirian"
      },
      {
        "key": "E",
        "text": "Ketaqwaan, Wawasan Kebangsaan, Kemampuan Berhitung, dan Kesenian Tradisional"
      }
    ],
    "correct": "D",
    "explanation": "Beranda web menegaskan 4 dimensi Profil Lulusan yang dikembangkan meliputi: Penalaran Kritis, Kreativitas, Kewargaan, dan Kemandirian."
  },
  {
    "id": 5,
    "day": 0,
    "indicatorCode": "C",
    "indicatorKey": "ind_fokus_asesmen",
    "indicatorName": "Fokus Utama Asesmen",
    "cognitiveLevel": "C2",
    "numberInIndicator": 5,
    "question": "Di antara dimensi Profil Lulusan yang tercantum pada kartu rincian beranda web, dua dimensi yang ditetapkan secara khusus sebagai 'Fokus Utama Asesmen' adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kemandirian dan Komunikasi Siswa"
      },
      {
        "key": "B",
        "text": "Kewargaan dan Kepedulian Lingkungan"
      },
      {
        "key": "C",
        "text": "Ketaqwaan dan Toleransi Budaya"
      },
      {
        "key": "D",
        "text": "Kebugaran Jasmani dan Ketangkasan Logistik"
      },
      {
        "key": "E",
        "text": "Penalaran Kritis dan Kreativitas"
      }
    ],
    "correct": "E",
    "explanation": "Pada kartu dimensi beranda web, dimensi Penalaran Kritis dan Kreativitas secara eksplisit memuat label lencana: 'Fokus Utama Asesmen'."
  },
  {
    "id": 6,
    "day": 0,
    "indicatorCode": "C",
    "indicatorKey": "ind_pendekatan_pembelajaran",
    "indicatorName": "Pendekatan Pembelajaran Mendalam",
    "cognitiveLevel": "C2",
    "numberInIndicator": 6,
    "question": "Berdasarkan narasi kurikulum pada beranda web, seluruh rangkaian kegiatan FINCESTEM diperkuat melalui pendekatan pedagogis...",
    "options": [
      {
        "key": "A",
        "text": "Pembelajaran Klasikal Menghafal Teori (Rote Memorization Approach)"
      },
      {
        "key": "B",
        "text": "Pembelajaran Individual Berbasis Penugasan Rumah (Homework Drill)"
      },
      {
        "key": "C",
        "text": "Pendekatan Pembelajaran Mendalam (Deep Learning Approach) berbasis pengalaman nyata"
      },
      {
        "key": "D",
        "text": "Pembelajaran Bersyarat Berorientasi Ujian Akhir Tulis Sekolah semata"
      },
      {
        "key": "E",
        "text": "Pendekatan Tutorial Tatap Muka Ceramah Satu Arah oleh Dewan Guru"
      }
    ],
    "correct": "C",
    "explanation": "Di beranda web disebutkan: Seluruh rangkaian FINCESTEM diperkuat melalui Pendekatan Pembelajaran Mendalam (Deep Learning) dengan menempatkan siswa sebagai subjek aktif."
  },
  {
    "id": 7,
    "day": 0,
    "indicatorCode": "D",
    "indicatorKey": "ind_rute_luar_daerah",
    "indicatorName": "Rute Eksplorasi Luar OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Sesuai deskripsi ruang pembelajaran di beranda web, rute perjalanan pembelajaran bagi peserta didik yang melaksanakan kegiatan di luar Kabupaten OKU Timur meliputi jalur...",
    "options": [
      {
        "key": "A",
        "text": "Belitang – Palembang – Lampung – Jakarta – Bandung – Belitang"
      },
      {
        "key": "B",
        "text": "Belitang – Medan – Danau Toba – Bukittinggi – Padang – Belitang"
      },
      {
        "key": "C",
        "text": "Belitang – Jakarta – Surabaya – Denpasar Bali – Lombok – Belitang"
      },
      {
        "key": "D",
        "text": "Belitang – Semarang – Malang – Bromo – Yogyakarta – Belitang"
      },
      {
        "key": "E",
        "text": "Belitang – Solo – Surabaya – Banyuwangi – Bali – Belitang"
      }
    ],
    "correct": "D",
    "explanation": "Beranda web menyebutkan jalur perjalanan: Belitang–Semarang–Malang–Bromo–Yogyakarta–Belitang."
  },
  {
    "id": 8,
    "day": 0,
    "indicatorCode": "D",
    "indicatorKey": "ind_lab_alam_oku_timur",
    "indicatorName": "Laboratorium Riset OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 8,
    "question": "Di beranda web dijelaskan bahwa FINCESTEM di Kabupaten OKU Timur menjadikan potensi daerah sebagai laboratorium pembelajaran nyata. Sektor-sektor lokal yang diobservasi peserta didik meliputi...",
    "options": [
      {
        "key": "A",
        "text": "Pertanian, perkebunan, perikanan, kebanksentralan, koperasi, perbankan mini, dan UMKM lokal"
      },
      {
        "key": "B",
        "text": "Industri pertambangan minyak lepas pantai, eksplorasi batubara, dan manufaktur berat"
      },
      {
        "key": "C",
        "text": "Perdagangan ekspor-impor kontainer pelabuhan samudra dan galangan kapal internasional"
      },
      {
        "key": "D",
        "text": "Pusat bursa efek komoditas global, pasar saham luar negeri, dan korporasi multinasional"
      },
      {
        "key": "E",
        "text": "Industri penerbangan komersial dan perakitan satelit telekomunikasi antariksa"
      }
    ],
    "correct": "A",
    "explanation": "Di beranda web tertulis: Peserta didik mengkaji aspek finansial melalui kebanksentralan, koperasi, perbankan mini, ekonomi lokal, serta observasi terhadap pertanian, perkebunan, dan perikanan."
  },
  {
    "id": 9,
    "day": 0,
    "indicatorCode": "E",
    "indicatorKey": "ind_makna_kewargaan",
    "indicatorName": "Makna Dimensi Kewargaan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Menurut rincian kartu dimensi Profil Lulusan pada beranda web, peserta didik yang memiliki dimensi 'Kewargaan' ditandai dengan kemampuan...",
    "options": [
      {
        "key": "A",
        "text": "Menghafal seluruh nama pejabat daerah dan pasal undang-undang secara tepat"
      },
      {
        "key": "B",
        "text": "Menginternalisasi kearifan lokal, menghargai keberagaman budaya, serta aktif menjaga kelestarian lingkungan"
      },
      {
        "key": "C",
        "text": "Memenangkan pemilihan ketua organisasi kesiswaan tingkat kabupaten secara mutlak"
      },
      {
        "key": "D",
        "text": "Membayar pajak penghasilan usaha secara tepat waktu setiap awal bulan kalender"
      },
      {
        "key": "E",
        "text": "Mengutamakan kepentingan kelompok pribadi di atas ketertiban masyarakat umum"
      }
    ],
    "correct": "B",
    "explanation": "Pada kartu Kewargaan tertulis: Mampu menginternalisasi kearifan lokal, menghargai keberagaman budaya nusantara, serta aktif menjaga kelestarian lingkungan eksplorasi."
  },
  {
    "id": 10,
    "day": 0,
    "indicatorCode": "E",
    "indicatorKey": "ind_makna_kemandirian",
    "indicatorName": "Makna Dimensi Kemandirian",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Berdasarkan rincian kartu dimensi Profil Lulusan pada beranda web, penguasaan dimensi 'Kemandirian' peserta didik tercermin dari kemampuan...",
    "options": [
      {
        "key": "A",
        "text": "Mengerjakan seluruh tugas kelompok seorang diri tanpa melibatkan rekan satu tim"
      },
      {
        "key": "B",
        "text": "Membawa perlengkapan logistik mewah secara berlebihan saat kegiatan observasi"
      },
      {
        "key": "C",
        "text": "Menolak menerima saran perbaikan ataupun bimbingan dari guru fasilitator"
      },
      {
        "key": "D",
        "text": "Menuntut nilai sempurna tanpa perlu menunjukkan bukti catatan pengamatan riil"
      },
      {
        "key": "E",
        "text": "Mengelola waktu, regulasi diri, kedisiplinan logistik, serta bertanggung jawab penuh atas tugas"
      }
    ],
    "correct": "E",
    "explanation": "Pada kartu Kemandirian tertulis: Mampu mengelola waktu, regulasi diri, kedisiplinan logistik, serta bertanggung jawab penuh atas tugas individu maupun kelompok."
  }
],
    1: [
  {
    "id": 1,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Aktivitas manusia yang dilakukan untuk menghasilkan atau menambah nilai guna suatu barang dan jasa disebut...",
    "options": [
      {
        "key": "A",
        "text": "Kegiatan produksi barang dan jasa"
      },
      {
        "key": "B",
        "text": "Kegiatan konsumsi kebutuhan primer"
      },
      {
        "key": "C",
        "text": "Kegiatan distribusi produk ke pasar"
      },
      {
        "key": "D",
        "text": "Kegiatan investasi aset masa depan"
      },
      {
        "key": "E",
        "text": "Kegiatan spekulasi valuta asing"
      }
    ],
    "correct": "A",
    "explanation": "Produksi adalah aktivitas menghasilkan atau menambah nilai guna barang/jasa untuk memenuhi kebutuhan manusia."
  },
  {
    "id": 2,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Tujuan pokok dari kegiatan konsumsi yang dilakukan oleh rumah tangga keluarga dalam perekonomian adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menciptakan barang modal baru bagi industri"
      },
      {
        "key": "B",
        "text": "Memenuhi kebutuhan hidup secara langsung"
      },
      {
        "key": "C",
        "text": "Memperoleh keuntungan maksimal dari pasar"
      },
      {
        "key": "D",
        "text": "Menyalurkan komoditas ke pedagang grosir"
      },
      {
        "key": "E",
        "text": "Menimbun stok bahan pangan di lumbung desa"
      }
    ],
    "correct": "B",
    "explanation": "Konsumsi bertujuan menghabiskan atau mengurangi nilai guna barang/jasa secara langsung guna memenuhi kebutuhan hidup."
  },
  {
    "id": 3,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Kios Sarana Pertanian Resmi (Kios Pupuk & Obat Tani) dan UMKM Dagang & Jasa Perorangan yang menyalurkan sarana produksi tani kepada petani di desa menjalankan fungsi...",
    "options": [
      {
        "key": "A",
        "text": "Produksi ekstraktif bahan mentah tambang"
      },
      {
        "key": "B",
        "text": "Konsumsi akhir barang kebutuhan pribadi"
      },
      {
        "key": "C",
        "text": "Distribusi barang dan jasa pada sektor tersier"
      },
      {
        "key": "D",
        "text": "Pengolahan bahan mentah menjadi beras giling"
      },
      {
        "key": "E",
        "text": "Eksplorasi sumber daya alam perkebunan"
      }
    ],
    "correct": "C",
    "explanation": "Kios sarana pertanian dan UMKM dagang bertindak sebagai distributor pada sektor tersier yang menyalurkan barang dari produsen ke petani/konsumen."
  },
  {
    "id": 4,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Di Kabupaten OKU Timur, unit usaha yang tergolong dalam Sektor Primer karena menghasilkan atau mengambil bahan mentah langsung dari alam adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pabrik Penggilingan Padi (RMU) dan pabrik tepung"
      },
      {
        "key": "B",
        "text": "Layanan Agen BRILink dan Koperasi Simpan Pinjam"
      },
      {
        "key": "C",
        "text": "Kios Sarana Pertanian Resmi dan Toko Kelontong"
      },
      {
        "key": "D",
        "text": "Peternakan Sapi Mandiri, Peternakan Kambing, dan Kelompok Usaha Tani Mandiri / Petani Padi"
      },
      {
        "key": "E",
        "text": "BUMDes Unit Pengolahan Pangan dan Industri Kerupuk Ikan"
      }
    ],
    "correct": "D",
    "explanation": "Sektor primer mencakup budidaya pertanian padi, Peternakan Sapi Mandiri, Peternakan Kambing, dan perikanan yang menghasilkan bahan baku mentah."
  },
  {
    "id": 5,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Aktivitas ekonomi di OKU Timur yang mengolah bahan mentah menjadi bahan bernilai tambah lebih tinggi (Sektor Sekunder) dicontohkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Peternakan Kambing rakyat dan kolam bibit ikan patin"
      },
      {
        "key": "B",
        "text": "Kios pupuk bersubsidi dan Agen Laku Pandai BRILink"
      },
      {
        "key": "C",
        "text": "Pedagang sayur keliling di pasar tradisional Gumawang"
      },
      {
        "key": "D",
        "text": "Petani padi sawah irigasi teknis Belitang saat panen"
      },
      {
        "key": "E",
        "text": "Pabrik Penggilingan Padi (Rice Milling Unit / RMU) dan UMKM Industri Pengolahan Tahu & Tempe"
      }
    ],
    "correct": "E",
    "explanation": "Sektor sekunder berfokus pada industri pengolahan seperti Pabrik Penggilingan Padi (RMU) dan UMKM Industri Tahu & Tempe yang mengolah bahan mentah menjadi barang jadi."
  },
  {
    "id": 6,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Contoh badan usaha atau kelembagaan di pedesaan OKU Timur yang beroperasi di Sektor Tersier (Jasa, Perdagangan, dan Keuangan) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Layanan Keuangan Tanpa Kantor (Agen BRILink / Mandiri / BNI) dan Koperasi Simpan Pinjam (KSP)"
      },
      {
        "key": "B",
        "text": "Peternakan Sapi Mandiri dan kebun karet rakyat"
      },
      {
        "key": "C",
        "text": "Pabrik Penggilingan Padi (RMU) dan pengrajin tahu-tempe"
      },
      {
        "key": "D",
        "text": "Kelompok Tani / Gapoktan budidaya benih padi sawah"
      },
      {
        "key": "E",
        "text": "Kolam pembibitan ikan patin dan lele air tawar"
      }
    ],
    "correct": "A",
    "explanation": "Sektor tersier menyediakan jasa transaksi perbankan (Agen BRILink/BNI/Mandiri), Koperasi Simpan Pinjam (KSP), dan perdagangan langsung ke masyarakat."
  },
  {
    "id": 7,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Dorongan batin atau alasan yang mendasari seseorang melakukan suatu tindakan ekonomi dalam kehidupannya disebut...",
    "options": [
      {
        "key": "A",
        "text": "Hukum ekonomi pasar"
      },
      {
        "key": "B",
        "text": "Motif ekonomi perilaku"
      },
      {
        "key": "C",
        "text": "Prinsip ekonomi efisien"
      },
      {
        "key": "D",
        "text": "Politik ekonomi daerah"
      },
      {
        "key": "E",
        "text": "Sistem ekonomi nasional"
      }
    ],
    "correct": "B",
    "explanation": "Motif ekonomi adalah dorongan internal atau eksternal yang menyebabkan manusia melakukan suatu tindakan ekonomi."
  },
  {
    "id": 8,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Pedoman dasar bertindak dengan pengorbanan tertentu untuk memperoleh hasil yang sebesar-besarnya disebut...",
    "options": [
      {
        "key": "A",
        "text": "Motif ekonomi produsen"
      },
      {
        "key": "B",
        "text": "Hukum penawaran pasar"
      },
      {
        "key": "C",
        "text": "Prinsip ekonomi rasional"
      },
      {
        "key": "D",
        "text": "Biaya peluang alternatif"
      },
      {
        "key": "E",
        "text": "Skala prioritas belanja"
      }
    ],
    "correct": "C",
    "explanation": "Prinsip ekonomi adalah panduan bertindak rasional dengan pengorbanan tertentu untuk mencapai hasil optimal."
  },
  {
    "id": 9,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Dalam diagram interaksi antarpelaku ekonomi, peran utama rumah tangga konsumen dalam pasar faktor produksi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membeli barang jadi di pasar"
      },
      {
        "key": "B",
        "text": "Memungut pajak dari pedagang"
      },
      {
        "key": "C",
        "text": "Mencetak uang kartal kertas"
      },
      {
        "key": "D",
        "text": "Menyediakan tenaga dan tanah"
      },
      {
        "key": "E",
        "text": "Menetapkan harga acuan beras"
      }
    ],
    "correct": "D",
    "explanation": "Rumah tangga konsumen bertindak sebagai pemilik dan penyedia faktor produksi (tanah, tenaga kerja, modal, dan kewirausahaan)."
  },
  {
    "id": 10,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Unsur benda nyata buatan manusia seperti traktor, cangkul, dan gedung penggilingan yang digunakan untuk kelancaran produksi tergolong...",
    "options": [
      {
        "key": "A",
        "text": "Faktor produksi alam"
      },
      {
        "key": "B",
        "text": "Faktor tenaga kerja"
      },
      {
        "key": "C",
        "text": "Faktor keahlian wirausaha"
      },
      {
        "key": "D",
        "text": "Faktor lingkungan sosial"
      },
      {
        "key": "E",
        "text": "Faktor produksi modal"
      }
    ],
    "correct": "E",
    "explanation": "Faktor produksi modal mencakup alat, mesin, gedung, dan sarana buatan manusia yang digunakan untuk proses produksi lanjutan."
  },
  {
    "id": 11,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Perbedaan mendasar antara sektor primer dan sektor sekunder dalam rantai perekonomian beras di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sektor primer memanen gabah, sedangkan sektor sekunder mengolahnya jadi beras"
      },
      {
        "key": "B",
        "text": "Sektor primer menjual nasi matang, sedangkan sektor sekunder memasok benih"
      },
      {
        "key": "C",
        "text": "Sektor primer mendistribusikan karung, sedangkan sektor sekunder menyemai padi"
      },
      {
        "key": "D",
        "text": "Sektor primer mengekspor beras, sedangkan sektor sekunder membeli gabah petani"
      },
      {
        "key": "E",
        "text": "Sektor primer mengelola kredit bank, sedangkan sektor sekunder menanam jagung"
      }
    ],
    "correct": "A",
    "explanation": "Petani yang memanen gabah berada di sektor primer, sementara kilang padi yang menggilingnya menjadi beras berada di sektor sekunder."
  },
  {
    "id": 12,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Kelompok Tani / Gapoktan (Gabungan Kelompok Tani) dan Kelompok Usaha Tani Mandiri / Petani Padi di Belitang merupakan kelembagaan sektor primer yang berfungsi...",
    "options": [
      {
        "key": "A",
        "text": "Mengorganisasi budidaya padi, pembagian air irigasi, dan pengadaan sarana produksi bersama"
      },
      {
        "key": "B",
        "text": "Membangun jaringan perbankan internasional untuk transaksi valuta asing"
      },
      {
        "key": "C",
        "text": "Menggantikan peran seluruh agen ekspedisi dan transportasi antarpulau"
      },
      {
        "key": "D",
        "text": "Memonopoli penjualan sembako eceran di seluruh pasar tradisional"
      },
      {
        "key": "E",
        "text": "Mengimpor beras premium dari luar negeri untuk menekan harga lokal"
      }
    ],
    "correct": "A",
    "explanation": "Kelompok Tani / Gapoktan mengoordinasikan kegiatan budidaya di tingkat lapangan (sektor primer), jadwal tanam, irigasi, dan sarana produksi."
  },
  {
    "id": 13,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Peningkatan nilai guna suatu komoditas karena dipindahkan dari tempat surplus ke tempat yang kekurangan disebut sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Nilai guna bentuk barang olahan"
      },
      {
        "key": "B",
        "text": "Nilai guna kepemilikan hak usaha"
      },
      {
        "key": "C",
        "text": "Nilai guna tempat dalam distribusi"
      },
      {
        "key": "D",
        "text": "Nilai guna waktu simpan gudang"
      },
      {
        "key": "E",
        "text": "Nilai guna pelayanan konsumen"
      }
    ],
    "correct": "C",
    "explanation": "Nilai guna tempat (place utility) muncul ketika barang dibawa dari daerah surplus ke daerah yang kekurangan sehingga nilainya naik."
  },
  {
    "id": 14,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Peran agen penyalur perantara dalam rantai perdagangan sayur mayur dari desa ke pasar kota adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan biaya pengangkutan barang bagi petani"
      },
      {
        "key": "B",
        "text": "Mengurangi risiko kerusakan komoditas selama tanam"
      },
      {
        "key": "C",
        "text": "Menentukan subsidi pupuk yang diberikan pemerintah"
      },
      {
        "key": "D",
        "text": "Menjembatani perbedaan jarak produsen dan konsumen"
      },
      {
        "key": "E",
        "text": "Mengganti seluruh modal petani saat terjadi puso"
      }
    ],
    "correct": "D",
    "explanation": "Pedagang perantara mengatasi kendala jarak geografis antara petani di desa dengan konsumen yang berada di pusat perkotaan."
  },
  {
    "id": 15,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Karakteristik penting yang membedakan faktor produksi kewirausahaan dari faktor produksi tenaga kerja biasa adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kemampuan fisik dalam mengangkat beban di ladang"
      },
      {
        "key": "B",
        "text": "Ketersediaan waktu luang untuk bekerja lembur"
      },
      {
        "key": "C",
        "text": "Kepemilikan sertifikat tanah warisan keluarga"
      },
      {
        "key": "D",
        "text": "Kepatuhan penuh pada instruksi atasan pabrik"
      },
      {
        "key": "E",
        "text": "Keahlian mengelola risiko dan memadukan sumber daya"
      }
    ],
    "correct": "E",
    "explanation": "Kewirausahaan melibatkan kecakapan manajerial, inovasi, dan keberanian menanggung risiko untuk mengorganisasi faktor produksi lainnya."
  },
  {
    "id": 16,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Munculnya konsep biaya peluang dalam pengambilan keputusan ekonomi keluarga petani disebabkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Keharusan memilih dari sumber daya yang terbatas"
      },
      {
        "key": "B",
        "text": "Melimpahnya sumber daya modal tanpa batas"
      },
      {
        "key": "C",
        "text": "Rendahnya tarif bunga pinjaman bank daerah"
      },
      {
        "key": "D",
        "text": "Kepastian harga komoditas panen di masa depan"
      },
      {
        "key": "E",
        "text": "Banyaknya bantuan hibah gratis dari pemerintah"
      }
    ],
    "correct": "A",
    "explanation": "Biaya peluang timbul karena kelangkaan sumber daya, sehingga saat memilih satu opsi, opsi terbaik lainnya harus dikorbankan."
  },
  {
    "id": 17,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Pasar mingguan di kecamatan yang mempertemukan langsung penjual dan pembeli secara tatap muka fisik tergolong...",
    "options": [
      {
        "key": "A",
        "text": "Pasar abstrak bursa efek"
      },
      {
        "key": "B",
        "text": "Pasar konkret barang konsumsi"
      },
      {
        "key": "C",
        "text": "Pasar monopoli tunggal"
      },
      {
        "key": "D",
        "text": "Pasar oligopsoni korporasi"
      },
      {
        "key": "E",
        "text": "Pasar input tenaga kerja"
      }
    ],
    "correct": "B",
    "explanation": "Pasar konkret adalah pasar tempat penjual, pembeli, dan barang dagangan bertemu serta diperjualbelikan secara langsung."
  },
  {
    "id": 18,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Mengapa kenaikan pendapatan riil seorang pedagang sembako cenderung mengubah pola konsumsi keluarganya...",
    "options": [
      {
        "key": "A",
        "text": "Karena seluruh uangnya dihabiskan untuk membeli komoditas beras"
      },
      {
        "key": "B",
        "text": "Karena kebutuhan sekunder menjadi hilang sama sekali dari belanja"
      },
      {
        "key": "C",
        "text": "Karena porsi pengeluaran makanan pokok menurun dan non-pangan naik"
      },
      {
        "key": "D",
        "text": "Karena pedagang tidak lagi memerlukan tabungan dan dana darurat"
      },
      {
        "key": "E",
        "text": "Karena harga barang di pasar otomatis turun mengikuti pendapatan"
      }
    ],
    "correct": "C",
    "explanation": "Menurut hukum Engel, semakin tinggi pendapatan, persentase belanja pangan menurun dan persentase belanja barang sekunder/tersier meningkat."
  },
  {
    "id": 19,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Keterkaitan antara rumah tangga produsen dan pemerintah dalam arus lingkar ekonomi tiga sektor adalah...",
    "options": [
      {
        "key": "A",
        "text": "Produsen mencetak mata uang dan pemerintah membeli seluruh saham"
      },
      {
        "key": "B",
        "text": "Pemerintah bekerja sebagai buruh di pabrik milik produsen swasta"
      },
      {
        "key": "C",
        "text": "Pemerintah menetapkan larangan jual beli bagi pengusaha daerah"
      },
      {
        "key": "D",
        "text": "Produsen membayar pajak dan pemerintah menyediakan fasilitas publik"
      },
      {
        "key": "E",
        "text": "Produsen memberikan pinjaman tanpa bunga kepada bendahara negara"
      }
    ],
    "correct": "D",
    "explanation": "Perusahaan menyetor pajak kepada pemerintah, dan sebagai imbalannya pemerintah membangun sarana prasarana serta regulasi usaha."
  },
  {
    "id": 20,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Aktivitas industri pembuatan pupuk organik dari kotoran sapi peternakan lokal di Belitang merupakan contoh keterkaitan antara...",
    "options": [
      {
        "key": "A",
        "text": "Sektor kuartener teknologi dengan sektor jasa pariwisata"
      },
      {
        "key": "B",
        "text": "Sektor tersier perbankan dengan sektor informal pemulung"
      },
      {
        "key": "C",
        "text": "Sektor perdagangan impor dengan sektor pertambangan batu bara"
      },
      {
        "key": "D",
        "text": "Sektor perikanan laut dengan sektor transportasi udara"
      },
      {
        "key": "E",
        "text": "Sektor primer peternakan dengan sektor sekunder pengolahan"
      }
    ],
    "correct": "E",
    "explanation": "Peternakan sapi (sektor primer) menyediakan bahan baku kotoran ternak yang diolah pabrik pupuk (sektor sekunder) menjadi pupuk organik."
  },
  {
    "id": 21,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Seorang petani memiliki 1 hektare lahan. Jika ditanami padi laba bersihnya Rp15.000.000, jika ditanami jagung labanya Rp12.000.000. Jika ia memilih menanam padi, maka besarnya biaya peluang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp12.000.000 nilai jagung"
      },
      {
        "key": "B",
        "text": "Rp3.000.000 selisih laba"
      },
      {
        "key": "C",
        "text": "Rp15.000.000 nilai padi"
      },
      {
        "key": "D",
        "text": "Rp27.000.000 jumlah total"
      },
      {
        "key": "E",
        "text": "Rp0 karena tetap untung"
      }
    ],
    "correct": "A",
    "explanation": "Biaya peluang adalah nilai kesempatan terbaik yang dikorbankan, yaitu laba menanam jagung sebesar Rp12.000.000."
  },
  {
    "id": 22,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Penggilingan padi mengeluarkan biaya tetap Rp5.000.000 per bulan dan biaya variabel Rp6.000 per kg beras. Jika bulan ini memproduksi 2.000 kg beras, total biaya produksinya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp12.000.000 total biaya"
      },
      {
        "key": "B",
        "text": "Rp17.000.000 total biaya"
      },
      {
        "key": "C",
        "text": "Rp22.000.000 total biaya"
      },
      {
        "key": "D",
        "text": "Rp11.000.000 total biaya"
      },
      {
        "key": "E",
        "text": "Rp7.000.000 total biaya"
      }
    ],
    "correct": "B",
    "explanation": "Total Biaya = Biaya Tetap + (Biaya Variabel x Jumlah) = Rp5.000.000 + (Rp6.000 x 2.000) = Rp5.000.000 + Rp12.000.000 = Rp17.000.000."
  },
  {
    "id": 23,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Koperasi tani menjual 50 karung beras kualitas premium dengan harga Rp320.000 per karung. Penerimaan total yang diperoleh koperasi tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp14.500.000 hasil penjualan"
      },
      {
        "key": "B",
        "text": "Rp18.500.000 hasil penjualan"
      },
      {
        "key": "C",
        "text": "Rp16.000.000 hasil penjualan"
      },
      {
        "key": "D",
        "text": "Rp20.000.000 hasil penjualan"
      },
      {
        "key": "E",
        "text": "Rp22.500.000 hasil penjualan"
      }
    ],
    "correct": "C",
    "explanation": "Penerimaan Total (Total Revenue) = Harga x Kuantitas = Rp320.000 x 50 karung = Rp16.000.000."
  },
  {
    "id": 24,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Pak Budi memanen 4 ton semangka yang cepat membusuk. Strategi distribusi yang paling rasional untuk meminimalkan kerugian akibat kerusakan buah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyimpan di lumbung terbuka selama dua bulan menunggu harga naik"
      },
      {
        "key": "B",
        "text": "Mengirimkan seluruhnya ke luar negeri melalui perantara kapal laut"
      },
      {
        "key": "C",
        "text": "Menunggu pembeli dari kota besar datang menawar di kebun sendiri"
      },
      {
        "key": "D",
        "text": "Menjual langsung ke pasar lokal dan pedagang pengumpul setempat"
      },
      {
        "key": "E",
        "text": "Menghentikan pemetikan buah sampai ada kontrak harga resmi"
      }
    ],
    "correct": "D",
    "explanation": "Komoditas hortikultura yang mudah rusak memerlukan rantai distribusi pendek dan cepat ke pasar lokal terdekat untuk menghindari pembusukan."
  },
  {
    "id": 25,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Seorang perajin rengginang di Belitang memperoleh penerimaan Rp8.000.000 dengan menghabiskan biaya total Rp5.500.000. Besarnya laba bersih yang diperoleh perajin tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp1.500.000 laba bersih"
      },
      {
        "key": "B",
        "text": "Rp3.500.000 laba bersih"
      },
      {
        "key": "C",
        "text": "Rp4.000.000 laba bersih"
      },
      {
        "key": "D",
        "text": "Rp13.500.000 laba bersih"
      },
      {
        "key": "E",
        "text": "Rp2.500.000 laba bersih"
      }
    ],
    "correct": "E",
    "explanation": "Laba Bersih = Penerimaan Total - Biaya Total = Rp8.000.000 - Rp5.500.000 = Rp2.500.000."
  },
  {
    "id": 26,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Keluarga Pak Joko memiliki penghasilan bulanan terbatas. Tindakan penerapan skala prioritas konsumsi yang paling bijak adalah mendahulukan pengeluaran untuk...",
    "options": [
      {
        "key": "A",
        "text": "Membayar beras, tagihan listrik, dan iuran sekolah anak"
      },
      {
        "key": "B",
        "text": "Membeli ponsel keluaran terbaru secara tunai di toko"
      },
      {
        "key": "C",
        "text": "Mengganti perabotan ruang tamu dengan sofa mewah"
      },
      {
        "key": "D",
        "text": "Berlibur ke luar kota bersama keluarga besar desa"
      },
      {
        "key": "E",
        "text": "Membeli pakaian pesta bermerek di pusat perbelanjaan"
      }
    ],
    "correct": "A",
    "explanation": "Skala prioritas mendahulukan kebutuhan primer mendesak (makanan, listrik, pendidikan) sebelum kebutuhan sekunder atau tersier."
  },
  {
    "id": 27,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Sebuah bengkel alsintan di Martapura melayani servis traktor tangan milik petani. Dalam klasifikasi sektor ekonomi, usaha bengkel tersebut berada pada...",
    "options": [
      {
        "key": "A",
        "text": "Sektor agrikultur budidaya"
      },
      {
        "key": "B",
        "text": "Sektor jasa perbaikan tersier"
      },
      {
        "key": "C",
        "text": "Sektor manufaktur perakitan"
      },
      {
        "key": "D",
        "text": "Sektor ekstraktif logam"
      },
      {
        "key": "E",
        "text": "Sektor pembiayaan modal"
      }
    ],
    "correct": "B",
    "explanation": "Jasa perbaikan dan perawatan mesin pertanian tergolong dalam sektor tersier (layanan jasa)."
  },
  {
    "id": 28,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Toko sembako membeli minyak goreng Rp14.000 per liter dan menjualnya seharga Rp16.500 per liter. Jika dalam sepekan terjual 200 liter, keuntungan kotor pedagang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp300.000 keuntungan kotor"
      },
      {
        "key": "B",
        "text": "Rp700.000 keuntungan kotor"
      },
      {
        "key": "C",
        "text": "Rp500.000 keuntungan kotor"
      },
      {
        "key": "D",
        "text": "Rp900.000 keuntungan kotor"
      },
      {
        "key": "E",
        "text": "Rp1.100.000 keuntungan kotor"
      }
    ],
    "correct": "C",
    "explanation": "Margin per liter = Rp16.500 - Rp14.000 = Rp2.500. Total keuntungan kotor = Rp2.500 x 200 liter = Rp500.000."
  },
  {
    "id": 29,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Dalam upaya menekan biaya operasional tanpa menurunkan kualitas gabah, langkah efisiensi produksi yang tepat bagi pemilik kilang padi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mematikan saringan pembersih batu agar proses giling lebih cepat"
      },
      {
        "key": "B",
        "text": "Mengurangi upah tenaga kerja angkut di bawah standar kewajaran"
      },
      {
        "key": "C",
        "text": "Mencampur beras patah ke dalam karung kemasan beras premium"
      },
      {
        "key": "D",
        "text": "Melakukan perawatan berkala mesin giling agar konsumsi solar hemat"
      },
      {
        "key": "E",
        "text": "Mengganti karung pembungkus dengan kantong kresek daur ulang"
      }
    ],
    "correct": "D",
    "explanation": "Pemeliharaan rutin mesin meningkatkan efisiensi energi dan performa tanpa mengorbankan mutu produk akhir."
  },
  {
    "id": 30,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Pak Anton menginvestasikan modal Rp10.000.000 untuk budidaya ikan lele kolam terpal. Setelah 3 bulan panen terjual Rp13.500.000 dengan biaya pakan Rp1.500.000. Keuntungan bersihnya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp1.000.000 laba bersih"
      },
      {
        "key": "B",
        "text": "Rp3.000.000 laba bersih"
      },
      {
        "key": "C",
        "text": "Rp4.000.000 laba bersih"
      },
      {
        "key": "D",
        "text": "Rp5.000.000 laba bersih"
      },
      {
        "key": "E",
        "text": "Rp2.000.000 laba bersih"
      }
    ],
    "correct": "E",
    "explanation": "Total biaya operasional dan modal = Rp10.000.000 + Rp1.500.000 = Rp11.500.000. Laba bersih = Rp13.500.000 - Rp11.500.000 = Rp2.000.000."
  },
  {
    "id": 31,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Kenaikan harga bahan bakar minyak nonsubsidi menyebabkan ongkos truk pengangkut gabah dari sawah ke penggilingan meningkat. Dampak ekonomi lanjutan yang paling mungkin terjadi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kenaikan harga jual beras di pasar konsumen atau tertekannya harga gabah petani"
      },
      {
        "key": "B",
        "text": "Penurunan biaya pokok produksi beras di tingkat kilang penggilingan"
      },
      {
        "key": "C",
        "text": "Peningkatan daya beli buruh tani secara otomatis di pedesaan"
      },
      {
        "key": "D",
        "text": "Penurunan volume konsumsi karbohidrat masyarakat secara mendadak"
      },
      {
        "key": "E",
        "text": "Terhapusnya peran distributor dalam tata niaga pangan daerah"
      }
    ],
    "correct": "A",
    "explanation": "Kenaikan biaya logistik ditransmisikan menjadi harga jual beras lebih mahal di konsumen atau beban pengurangan harga beli gabah di tingkat petani."
  },
  {
    "id": 32,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Saat panen raya cabai di Belitang, pasokan melimpah namun harga anjlok drastis hingga Rp8.000 per kg. Analisis penyebab utama terjadinya fenomena penurunan harga tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pemerintah memberlakukan tarif batas atas penjualan cabai di tingkat petani"
      },
      {
        "key": "B",
        "text": "Penawaran komoditas melonjak tinggi melampaui kapasitas serap permintaan pasar"
      },
      {
        "key": "C",
        "text": "Konsumen beralih total mengonsumsi makanan instan tanpa bumbu cabai"
      },
      {
        "key": "D",
        "text": "Biaya sewa lahan pertanian mengalami kenaikan ganda menjelang panen"
      },
      {
        "key": "E",
        "text": "Seluruh pedagang pengecer serentak menutup kios usahanya di pasar"
      }
    ],
    "correct": "B",
    "explanation": "Sesuai hukum penawaran dan permintaan, kelebihan pasokan (oversupply) yang tidak diimbangi kenaikan serapan pasar menekan harga turun tajam."
  },
  {
    "id": 33,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Praktik rantai distribusi pangan yang terlalu panjang dengan melibatkan banyak tengkulak berlapis berakibat negatif terhadap kesejahteraan petani karena...",
    "options": [
      {
        "key": "A",
        "text": "Petani terpaksa membeli kembali beras hasil panennya dengan harga murah"
      },
      {
        "key": "B",
        "text": "Waktu panen menjadi terhambat akibat banyaknya jadwal pertemuan pedagang"
      },
      {
        "key": "C",
        "text": "Margin keuntungan terbesar terserap oleh perantara sementara harga di petani ditekan"
      },
      {
        "key": "D",
        "text": "Kualitas kesuburan tanah sawah mengalami penurunan secara biologis"
      },
      {
        "key": "E",
        "text": "Petani tidak diperbolehkan menanam komoditas selain padi dan jagung"
      }
    ],
    "correct": "C",
    "explanation": "Rantai pasok panjang menyebabkan disparitas harga besar antara produsen dan konsumen, di mana sebagian besar margin dinikmati pedagang perantara."
  },
  {
    "id": 34,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Pergeseran sebagian tenaga kerja muda di pedesaan OKU Timur dari sektor pertanian primer ke sektor jasa dan perdagangan disebabkan oleh faktor pendorong...",
    "options": [
      {
        "key": "A",
        "text": "Tingginya kepastian hasil panen sawah sepanjang tahun tanpa risiko cuaca"
      },
      {
        "key": "B",
        "text": "Larangan kepemilikan lahan pertanian bagi generasi muda pedesaan"
      },
      {
        "key": "C",
        "text": "Ketiadaan sarana teknologi komunikasi dan internet di sentra pertanian"
      },
      {
        "key": "D",
        "text": "Persepsi pendapatan harian yang lebih pasti dan kenyamanan kerja di sektor non-tani"
      },
      {
        "key": "E",
        "text": "Penurunan kebutuhan pangan pokok beras di kota-kota besar Indonesia"
      }
    ],
    "correct": "D",
    "explanation": "Sektor jasa dipandang menawarkan kepastian penghasilan rutin dan lingkungan kerja yang lebih nyaman dibanding risiko fluktuasi pertanian."
  },
  {
    "id": 35,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Ketika terjadi kelangkaan pupuk subsidi, petani terpaksa membeli pupuk nonsubsidi dengan harga dua kali lipat. Dampak analisis terhadap kurva penawaran beras petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kurva penawaran bergeser ke kanan karena produktivitas panen meningkat"
      },
      {
        "key": "B",
        "text": "Kurva penawaran tetap mendatar karena harga beras dikendalikan pasar"
      },
      {
        "key": "C",
        "text": "Kurva penawaran menjadi vertikal sempurna tanpa terpengaruh biaya"
      },
      {
        "key": "D",
        "text": "Kurva penawaran berputar searah jarum jam mendekati sumbu kuantitas"
      },
      {
        "key": "E",
        "text": "Kurva penawaran bergeser ke kiri atas karena kenaikan biaya produksi"
      }
    ],
    "correct": "E",
    "explanation": "Kenaikan biaya input (pupuk) menggeser kurva penawaran ke kiri atas, menandakan produsen bersedia menawarkan barang lebih sedikit pada tingkat harga lama."
  },
  {
    "id": 36,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Evaluasi terhadap efektivitas pasar lelang komoditas karet di tingkat desa menunjukkan bahwa keunggulan sistem lelang dibanding menjual ke tengkulak perorangan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Terciptanya transparansi harga dan persaingan sehat antarpenawar pabrik"
      },
      {
        "key": "B",
        "text": "Petani dapat menentukan harga sepihak tanpa memperhatikan mutu lateks"
      },
      {
        "key": "C",
        "text": "Pembeli diwajibkan membayar komisi lelang kepada aparat desa setempat"
      },
      {
        "key": "D",
        "text": "Karet yang memiliki kadar air tinggi tetap dibayar dengan harga tertinggi"
      },
      {
        "key": "E",
        "text": "Waktu penimbangan karet menjadi lebih lambat dari hari biasanya"
      }
    ],
    "correct": "A",
    "explanation": "Sistem lelang meningkatkan posisi tawar petani melalui transparansi harga dan kompetisi terbuka antarpembeli berdasarkan standar mutu getah karet."
  },
  {
    "id": 37,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Jika sebuah kilang padi di Belitang memutuskan untuk mengolah limbah sekam menjadi briket bahan bakar alternatif, analisis manfaat ekonominya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan kebutuhan tenaga kerja operator mesin penggilingan"
      },
      {
        "key": "B",
        "text": "Menciptakan diversifikasi pendapatan baru sekaligus mengatasi limbah"
      },
      {
        "key": "C",
        "text": "Menurunkan harga jual beras kemasan premium di pasar konsumen"
      },
      {
        "key": "D",
        "text": "Mengubah status badan usaha kilang menjadi lembaga perbankan"
      },
      {
        "key": "E",
        "text": "Menghilangkan keharusan membayar retribusi daerah kepada dinas"
      }
    ],
    "correct": "B",
    "explanation": "Pemanfaatan limbah sekam menjadi briket menghasilkan nilai tambah ekonomi (added value) baru sekaligus menyelesaikan isu pencemaran limbah industri."
  },
  {
    "id": 38,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Mendiagnosis dampak penurunan daya beli masyarakat perkotaan terhadap permintaan buah-buahan lokal seperti duku dan semangka menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Permintaan buah lokal meningkat karena dianggap sebagai makanan pokok pengganti"
      },
      {
        "key": "B",
        "text": "Harga buah lokal di tingkat pedagang otomatis naik berlipat ganda"
      },
      {
        "key": "C",
        "text": "Permintaan buah lokal menurun karena sifatnya yang relatif elastis dibanding beras"
      },
      {
        "key": "D",
        "text": "Petani buah beralih menanam komoditas ekspor bernilai mata uang dolar"
      },
      {
        "key": "E",
        "text": "Sistem panen buah dihentikan total sampai situasi ekonomi pulih"
      }
    ],
    "correct": "C",
    "explanation": "Buah-buahan memiliki elastisitas permintaan lebih elastis dibanding beras; saat daya beli turun, masyarakat memprioritaskan makanan pokok utama."
  },
  {
    "id": 39,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Korelasi antara pembangunan infrastruktur jalan aspal mulus di sentra produksi padi dengan efisiensi kegiatan ekonomi pedesaan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatnya biaya operasional kendaraan angkut gabah petani"
      },
      {
        "key": "B",
        "text": "Menurunnya minat pedagang luar daerah untuk berbelanja di sentra desa"
      },
      {
        "key": "C",
        "text": "Meningkatnya waktu tempuh pengiriman hasil panen menuju pasar kota"
      },
      {
        "key": "D",
        "text": "Menurunnya biaya logistik transportasi dan mempercepat perputaran barang"
      },
      {
        "key": "E",
        "text": "Terjadinya monopoli perdagangan oleh pemilik kendaraan roda empat"
      }
    ],
    "correct": "D",
    "explanation": "Infrastruktur jalan yang baik memangkas biaya transportasi, meminimalkan kerusakan barang, dan mempercepat arus perputaran komoditas ekonomi."
  },
  {
    "id": 40,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "A. Kegiatan Ekonomi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Analisis terhadap kegagalan koordinasi antara kelompok tani dan pedagang pengumpul saat panen serentak yang memicu anjloknya harga menunjukkan perlunya...",
    "options": [
      {
        "key": "A",
        "text": "Penghentian seluruh kegiatan produksi pangan selama kurun waktu tertentu"
      },
      {
        "key": "B",
        "text": "Penetapan harga semaunya oleh masing-masing petani secara individual"
      },
      {
        "key": "C",
        "text": "Pelarangan masuk bagi pedagang perantara dari luar kabupaten"
      },
      {
        "key": "D",
        "text": "Pemberian sanksi denda bagi petani yang hasil panennya melebihi target"
      },
      {
        "key": "E",
        "text": "Penguatan peran kelembagaan koperasi tani dan sistem resi gudang terpadu"
      }
    ],
    "correct": "E",
    "explanation": "Kelembagaan koperasi tani dan sistem resi gudang (warehouse receipt) mampu menampung stok saat panen raya sehingga harga tidak jatuh bebas."
  },
  {
    "id": 41,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Kecakapan dan keyakinan seseorang dalam memahami serta mengelola sumber daya keuangan guna mencapai kesejahteraan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Literasi keuangan mandiri"
      },
      {
        "key": "B",
        "text": "Inklusi keuangan nasional"
      },
      {
        "key": "C",
        "text": "Sistem perbankan syariah"
      },
      {
        "key": "D",
        "text": "Investasi modal ventura"
      },
      {
        "key": "E",
        "text": "Kebijakan fiskal daerah"
      }
    ],
    "correct": "A",
    "explanation": "Literasi keuangan adalah pengetahuan, keterampilan, dan keyakinan yang memengaruhi sikap serta perilaku untuk meningkatkan kualitas pengambilan keputusan finansial."
  },
  {
    "id": 42,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Bidang pengelolaan keuangan yang berfokus pada perencanaan anggaran, tabungan, dan kebutuhan belanja individu atau keluarga disebut...",
    "options": [
      {
        "key": "A",
        "text": "Keuangan publik kenegaraan"
      },
      {
        "key": "B",
        "text": "Keuangan pribadi perorangan"
      },
      {
        "key": "C",
        "text": "Keuangan korporasi multinasional"
      },
      {
        "key": "D",
        "text": "Keuangan moneter perbankan"
      },
      {
        "key": "E",
        "text": "Keuangan internasional antarnegara"
      }
    ],
    "correct": "B",
    "explanation": "Personal finance (keuangan pribadi) mempelajari pengelolaan uang, aset, utang, tabungan, dan risiko seorang individu atau rumah tangga."
  },
  {
    "id": 43,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Sejumlah uang yang disisihkan secara khusus dan hanya boleh digunakan ketika terjadi peristiwa tak terduga disebut sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Dana hibah pemerintah"
      },
      {
        "key": "B",
        "text": "Dana pensiun hari tua"
      },
      {
        "key": "C",
        "text": "Dana darurat likuid"
      },
      {
        "key": "D",
        "text": "Dana modal kerja usaha"
      },
      {
        "key": "E",
        "text": "Dana investasi saham"
      }
    ],
    "correct": "C",
    "explanation": "Dana darurat adalah simpanan likuid yang disiapkan untuk menghadapi situasi mendesak seperti sakit, kecelakaan, atau kehilangan penghasilan tiba-tiba."
  },
  {
    "id": 44,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Rencana tertulis mengenai perkiraan penerimaan dan batas alokasi pengeluaran dalam jangka waktu tertentu disebut...",
    "options": [
      {
        "key": "A",
        "text": "Neraca saldo akhir"
      },
      {
        "key": "B",
        "text": "Faktur penjualan toko"
      },
      {
        "key": "C",
        "text": "Kuitansi bukti kas"
      },
      {
        "key": "D",
        "text": "Anggaran belanja berkala"
      },
      {
        "key": "E",
        "text": "Rekening koran bank"
      }
    ],
    "correct": "D",
    "explanation": "Anggaran belanja (budget) adalah rencana kuantitatif penerimaan dan pengeluaran keuangan untuk periode tertentu."
  },
  {
    "id": 45,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Laporan catatan pergerakan masuk dan keluarnya uang tunai dalam suatu periode tertentu dikenal dengan istilah...",
    "options": [
      {
        "key": "A",
        "text": "Laba kotor penjualan"
      },
      {
        "key": "B",
        "text": "Nilai buku perusahaan"
      },
      {
        "key": "C",
        "text": "Modal setor pemilik"
      },
      {
        "key": "D",
        "text": "Piutang dagang lancar"
      },
      {
        "key": "E",
        "text": "Arus kas penerimaan"
      }
    ],
    "correct": "E",
    "explanation": "Arus kas (cash flow) mencatat mutasi riil aliran kas masuk (cash inflow) dan kas keluar (cash outflow) dalam operasional."
  },
  {
    "id": 46,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Konsep dasar keuangan yang menyatakan bahwa nilai uang saat ini lebih berharga dibandingkan nilai uang yang sama di masa depan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Nilai waktu dari uang"
      },
      {
        "key": "B",
        "text": "Hukum nilai guna batas"
      },
      {
        "key": "C",
        "text": "Paritas daya beli mata uang"
      },
      {
        "key": "D",
        "text": "Tingkat pengembalian modal"
      },
      {
        "key": "E",
        "text": "Efisiensi pasar modal"
      }
    ],
    "correct": "A",
    "explanation": "Time value of money menyatakan uang bernilai lebih tinggi saat ini karena potensi menghasilkan keuntungan (earning capacity) dan terhindar inflasi."
  },
  {
    "id": 47,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Kepemilikan barang atau harta berharga yang mampu menghasilkan arus pemasukan tambahan secara berkala dikelompokkan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Aset konsumtif hobi"
      },
      {
        "key": "B",
        "text": "Aset produktif usaha"
      },
      {
        "key": "C",
        "text": "Beban operasional tetap"
      },
      {
        "key": "D",
        "text": "Utang jangka pendek"
      },
      {
        "key": "E",
        "text": "Kewajiban kontinjensi"
      }
    ],
    "correct": "B",
    "explanation": "Aset produktif adalah harta yang mampu menghasilkan arus kas masuk atau mengalami apresiasi nilai (seperti lahan sawah produktif, ternak, saham)."
  },
  {
    "id": 48,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Kewajiban pinjaman yang diambil untuk membiayai pembelian alat kerja atau modal yang menghasilkan pendapatan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Utang konsumtif pribadi"
      },
      {
        "key": "B",
        "text": "Utang macet tahunan"
      },
      {
        "key": "C",
        "text": "Utang produktif modal"
      },
      {
        "key": "D",
        "text": "Utang kartu belanja"
      },
      {
        "key": "E",
        "text": "Utang sewa pakaian"
      }
    ],
    "correct": "C",
    "explanation": "Utang produktif digunakan untuk kegiatan yang menambah penghasilan atau nilai kekayaan bersih, seperti membeli mesin penggiling gabah."
  },
  {
    "id": 49,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Aktivitas menempatkan sejumlah dana pada instrumen usaha atau aset dengan harapan memperoleh imbal hasil di masa depan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Belanja konsumsi harian"
      },
      {
        "key": "B",
        "text": "Pembagian sisa hasil usaha"
      },
      {
        "key": "C",
        "text": "Peminjaman kredit lunak"
      },
      {
        "key": "D",
        "text": "Investasi pemupukan modal"
      },
      {
        "key": "E",
        "text": "Penyusutan peralatan mesin"
      }
    ],
    "correct": "D",
    "explanation": "Investasi adalah komitmen menaruh dana pada aset produktif untuk memperoleh pertumbuhan nilai atau pendapatan dividen/bagi hasil di masa mendatang."
  },
  {
    "id": 50,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Fenomena kenaikan harga barang dan jasa secara umum dan terus-menerus yang menurunkan daya beli mata uang disebut...",
    "options": [
      {
        "key": "A",
        "text": "Deflasi harga barang"
      },
      {
        "key": "B",
        "text": "Devaluasi kurs resmi"
      },
      {
        "key": "C",
        "text": "Resesi ekonomi daerah"
      },
      {
        "key": "D",
        "text": "Stagflasi industri baja"
      },
      {
        "key": "E",
        "text": "Inflasi moneter pasar"
      }
    ],
    "correct": "E",
    "explanation": "Inflasi adalah kenaikan harga-harga barang secara umum dan berkepanjangan yang menyebabkan berkurangnya daya beli nilai riil uang."
  },
  {
    "id": 51,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Perbedaan mendasar antara kebutuhan pokok dan keinginan konsumtif dalam pengelolaan keuangan rumah tangga adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kebutuhan harus dipenuhi demi kelangsungan hidup, keinginan bersifat pemuas tambahan"
      },
      {
        "key": "B",
        "text": "Kebutuhan selalu membutuhkan biaya besar, keinginan selalu bernilai sangat murah"
      },
      {
        "key": "C",
        "text": "Kebutuhan dapat ditunda tanpa batas waktu, keinginan harus dipenuhi saat itu juga"
      },
      {
        "key": "D",
        "text": "Kebutuhan hanya dialami masyarakat miskin, keinginan hanya dimiliki kalangan kaya"
      },
      {
        "key": "E",
        "text": "Kebutuhan ditetapkan oleh undang-undang, keinginan diatur oleh peraturan desa"
      }
    ],
    "correct": "A",
    "explanation": "Kebutuhan mutlak diperlukan untuk bertahan hidup sehat dan layak, sedangkan keinginan adalah hasrat subjektif yang pemenuhannya dapat ditunda."
  },
  {
    "id": 52,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Prinsip pengalokasian penghasilan bulanan menggunakan aturan 50-30-20 secara bijak mengatur pembagian berupa...",
    "options": [
      {
        "key": "A",
        "text": "50% cicilan utang, 30% liburan keluarga, dan 20% biaya operasional usaha"
      },
      {
        "key": "B",
        "text": "50% kebutuhan hidup, 30% keinginan pribadi, dan 20% tabungan masa depan"
      },
      {
        "key": "C",
        "text": "50% modal investasi saham, 30% sewa rumah, dan 20% belanja pakaian pesta"
      },
      {
        "key": "D",
        "text": "50% sumbangan sosial, 30% makanan mewah, dan 20% perbaikan kendaraan"
      },
      {
        "key": "E",
        "text": "50% tabungan pensiun, 30% kebutuhan dapur, dan 20% tagihan listrik air"
      }
    ],
    "correct": "B",
    "explanation": "Aturan 50-30-20 mengalokasikan 50% untuk kebutuhan pokok (needs), 30% untuk keinginan (wants), dan 20% untuk tabungan/investasi (savings)."
  },
  {
    "id": 53,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Hubungan timbal balik antara risiko dan tingkat keuntungan investasi tercermin dalam prinsip dasar finansial berupa...",
    "options": [
      {
        "key": "A",
        "text": "Instrumen yang paling aman dari kerugian selalu memberikan imbal hasil tertinggi"
      },
      {
        "key": "B",
        "text": "Investasi berisiko tinggi dijamin penuh oleh pemerintah dari ancaman kebangkrutan"
      },
      {
        "key": "C",
        "text": "Semakin tinggi potensi keuntungan suatu aset, semakin tinggi pula risiko kerugiannya"
      },
      {
        "key": "D",
        "text": "Tingkat bunga tabungan bank selalu bergerak berbanding terbalik dengan laju inflasi"
      },
      {
        "key": "E",
        "text": "Risiko investasi dapat dihilangkan sepenuhnya dengan membeli aset emas perhiasan"
      }
    ],
    "correct": "C",
    "explanation": "Prinsip 'high risk, high return' menegaskan bahwa imbal hasil yang lebih tinggi selalu berjalan seiring dengan potensi risiko kegagalan yang lebih besar."
  },
  {
    "id": 54,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Penerapan strategi diversifikasi portofolio keuangan pada keluarga petani diwujudkan melalui tindakan...",
    "options": [
      {
        "key": "A",
        "text": "Menaruh seluruh simpanan uang tunai di bawah kasur kamar tidur"
      },
      {
        "key": "B",
        "text": "Meminjam modal usaha secara bersamaan dari lima rentenir keliling"
      },
      {
        "key": "C",
        "text": "Menjual seluruh hewan ternak untuk membeli tiket lotre berhadiah"
      },
      {
        "key": "D",
        "text": "Membagi aset ke dalam sawah, ternak sapi, dan tabungan bank resmi"
      },
      {
        "key": "E",
        "text": "Menolak pembukaan rekening tabungan karena takut biaya administrasi"
      }
    ],
    "correct": "D",
    "explanation": "Diversifikasi menyebarkan penempatan kekayaan ke berbagai jenis aset (sawah, ternak, tabungan) untuk meminimalkan risiko kerugian total."
  },
  {
    "id": 55,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Kelebihan utama menabung di lembaga perbankan resmi dibandingkan menyimpan uang tunai di celengan rumah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bebas dari segala bentuk pencatatan transaksi oleh petugas"
      },
      {
        "key": "B",
        "text": "Nasabah tidak diperbolehkan menarik saldo sebelum sepuluh tahun"
      },
      {
        "key": "C",
        "text": "Nilai nominal saldo otomatis berlipat ganda setiap awal pekan"
      },
      {
        "key": "D",
        "text": "Bank membebaskan seluruh nasabah dari kewajiban berbelanja"
      },
      {
        "key": "E",
        "text": "Keamanan terjamin dan simpanan dilindungi Lembaga Penjamin Simpanan"
      }
    ],
    "correct": "E",
    "explanation": "Bank resmi menjamin keamanan fisik uang dari pencurian/kerusakan dan dijamin oleh LPS hingga batas nominal tertentu sesuai undang-undang."
  },
  {
    "id": 56,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Mekanisme kerja bunga majemuk atau bunga berbunga dalam tabungan jangka panjang memberikan manfaat berupa...",
    "options": [
      {
        "key": "A",
        "text": "Bunga yang diperoleh turut menghasilkan tambahan bunga pada periode berikutnya"
      },
      {
        "key": "B",
        "text": "Biaya administrasi bulanan dipotong secara eksponensial oleh pihak bank"
      },
      {
        "key": "C",
        "text": "Pajak penghasilan atas bunga tabungan dihapuskan sepenuhnya oleh kas negara"
      },
      {
        "key": "D",
        "text": "Saldo pokok simpanan dibekukan dan dialihkan menjadi kepemilikan saham"
      },
      {
        "key": "E",
        "text": "Nasabah diwajibkan menyetor uang baru dalam jumlah dua kali lipat tiap bulan"
      }
    ],
    "correct": "A",
    "explanation": "Bunga majemuk (compound interest) menghitung bunga atas pokok ditambah akumulasi bunga sebelumnya, mempercepat pertumbuhan nilai simpanan."
  },
  {
    "id": 57,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Pemisahan antara uang kas operasional usaha warung kelontong dan dompet uang pribadi rumah tangga bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menghindari pembayaran pajak penjualan kepada pemerintah daerah"
      },
      {
        "key": "B",
        "text": "Mengetahui secara akurat laba bersih usaha dan mencegah modal tergerus"
      },
      {
        "key": "C",
        "text": "Mempercepat pengajuan kredit tanpa perlu melampirkan identitas KTP"
      },
      {
        "key": "D",
        "text": "Mempermudah pemilik warung mengambil barang dagangan untuk pesta"
      },
      {
        "key": "E",
        "text": "Menyamarkan jumlah kekayaan keluarga dari pengawasan tetangga"
      }
    ],
    "correct": "B",
    "explanation": "Pemisahan rekening usaha dan pribadi mencegah terpakainya modal kerja untuk konsumsi sehari-hari serta menjaga akurasi laporan keuntungan."
  },
  {
    "id": 58,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Peran keikutsertaan program jaminan kesehatan BPJS dalam manajemen risiko keuangan keluarga adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyediakan pinjaman uang tunai tanpa agunan saat paceklik tiba"
      },
      {
        "key": "B",
        "text": "Menjamin seluruh anggota keluarga memperoleh pekerjaan di rumah sakit"
      },
      {
        "key": "C",
        "text": "Melindungi aset keluarga dari kebangkrutan akibat biaya pengobatan besar"
      },
      {
        "key": "D",
        "text": "Mengganti seluruh kerugian panen padi sawah yang terserang hama wereng"
      },
      {
        "key": "E",
        "text": "Memberikan dividen tunai bulanan dari hasil pengelolaan dana kesehatan"
      }
    ],
    "correct": "C",
    "explanation": "Asuransi kesehatan berfungsi sebagai transfer risiko yang melindungi tabungan keluarga agar tidak ludes saat anggota keluarga jatuh sakit parah."
  },
  {
    "id": 59,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Mengapa pinjaman dari rentenir atau pinjaman online ilegal sangat berbahaya bagi keuangan petani di pedesaan...",
    "options": [
      {
        "key": "A",
        "text": "Karena mewajibkan petani menanam bibit tanaman impor bersertifikat"
      },
      {
        "key": "B",
        "text": "Karena uang pinjaman hanya boleh dibelanjakan di pasar swalayan kota"
      },
      {
        "key": "C",
        "text": "Karena nasabah diwajibkan hadir di kantor pusat bank setiap awal pekan"
      },
      {
        "key": "D",
        "text": "Karena mengenakan bunga sangat tinggi dan denda harian yang mencekik"
      },
      {
        "key": "E",
        "text": "Karena jangka waktu pengembalian dana berlangsung terlalu lama hingga 30 tahun"
      }
    ],
    "correct": "D",
    "explanation": "Pinjaman ilegal menerapkan suku bunga eksorbitan, biaya tersembunyi, dan denda harian yang dapat menjerat peminjam dalam lingkaran utang abadi."
  },
  {
    "id": 60,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Korelasi positif antara tingkat literasi keuangan yang tinggi dan kesejahteraan ekonomi masyarakat tercermin pada...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatnya jumlah pembelian barang mewah secara kredit konsumtif"
      },
      {
        "key": "B",
        "text": "Penolakan terhadap seluruh layanan perbankan dan teknologi transaksi baru"
      },
      {
        "key": "C",
        "text": "Ketergantungan penuh pada program bantuan sembako gratis pemerintah"
      },
      {
        "key": "D",
        "text": "Keinginan menghabiskan seluruh penghasilan dalam sekejap tanpa menabung"
      },
      {
        "key": "E",
        "text": "Kemampuan membuat keputusan finansial bijak dan ketahanan menghadapi krisis"
      }
    ],
    "correct": "E",
    "explanation": "Masyarakat melek finansial mampu menyusun anggaran, mengelola risiko, berinvestasi produktif, dan memiliki ketahanan kuat saat krisis."
  },
  {
    "id": 61,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Pak Rahmat memiliki penghasilan bersih Rp6.000.000 per bulan. Berdasarkan formula anggaran 50-30-20, porsi yang harus disisihkan untuk tabungan dan investasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp1.200.000 tabungan investasi"
      },
      {
        "key": "B",
        "text": "Rp600.000 tabungan investasi"
      },
      {
        "key": "C",
        "text": "Rp1.800.000 tabungan investasi"
      },
      {
        "key": "D",
        "text": "Rp3.000.000 tabungan investasi"
      },
      {
        "key": "E",
        "text": "Rp2.400.000 tabungan investasi"
      }
    ],
    "correct": "A",
    "explanation": "Porsi tabungan/investasi (20%) = 20% x Rp6.000.000 = Rp1.200.000."
  },
  {
    "id": 62,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Keluarga Pak Herman memiliki pengeluaran rutin Rp4.000.000 per bulan. Standar ideal dana darurat minimum yang harus dimiliki untuk mengantisipasi risiko 6 bulan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp12.000.000 dana darurat"
      },
      {
        "key": "B",
        "text": "Rp24.000.000 dana darurat"
      },
      {
        "key": "C",
        "text": "Rp36.000.000 dana darurat"
      },
      {
        "key": "D",
        "text": "Rp48.000.000 dana darurat"
      },
      {
        "key": "E",
        "text": "Rp8.000.000 dana darurat"
      }
    ],
    "correct": "B",
    "explanation": "Dana darurat 6 bulan = 6 x pengeluaran bulanan = 6 x Rp4.000.000 = Rp24.000.000."
  },
  {
    "id": 63,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Siti menabung Rp10.000.000 di bank dengan bunga sederhana 6% per tahun. Total bunga yang diterima Siti setelah menyimpan selama 2 tahun adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp600.000 total bunga"
      },
      {
        "key": "B",
        "text": "Rp1.800.000 total bunga"
      },
      {
        "key": "C",
        "text": "Rp1.200.000 total bunga"
      },
      {
        "key": "D",
        "text": "Rp2.400.000 total bunga"
      },
      {
        "key": "E",
        "text": "Rp3.000.000 total bunga"
      }
    ],
    "correct": "C",
    "explanation": "Bunga Sederhana = Pokok x Suku Bunga x Waktu = Rp10.000.000 x 6% x 2 tahun = Rp1.200.000."
  },
  {
    "id": 64,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Pak Joko memiliki total aset senilai Rp150.000.000 (tanah sawah dan tabungan) serta memiliki utang bank sebesar Rp40.000.000. Nilai kekayaan bersih Pak Joko adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp190.000.000 nilai bersih"
      },
      {
        "key": "B",
        "text": "Rp150.000.000 nilai bersih"
      },
      {
        "key": "C",
        "text": "Rp75.000.000 nilai bersih"
      },
      {
        "key": "D",
        "text": "Rp110.000.000 nilai bersih"
      },
      {
        "key": "E",
        "text": "Rp40.000.000 nilai bersih"
      }
    ],
    "correct": "D",
    "explanation": "Kekayaan Bersih (Net Worth) = Total Aset - Total Liabilitas = Rp150.000.000 - Rp40.000.000 = Rp110.000.000."
  },
  {
    "id": 65,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Pendapatan bulanan Ibu Dewi adalah Rp5.000.000. Batas aman maksimal total cicilan utang bulanan yang dianjurkan dalam kesehatan finansial (debt service ratio 30%) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp1.000.000 batas cicilan"
      },
      {
        "key": "B",
        "text": "Rp2.000.000 batas cicilan"
      },
      {
        "key": "C",
        "text": "Rp2.500.000 batas cicilan"
      },
      {
        "key": "D",
        "text": "Rp3.000.000 batas cicilan"
      },
      {
        "key": "E",
        "text": "Rp1.500.000 batas cicilan"
      }
    ],
    "correct": "E",
    "explanation": "Batas aman cicilan utang bulanan = 30% x Pendapatan Bulanan = 30% x Rp5.000.000 = Rp1.500.000."
  },
  {
    "id": 66,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Keluarga Pak Aris mendapati arus kas bulanan mengalami defisit Rp800.000. Langkah perbaikan anggaran yang paling tepat dan tidak membahayakan kesehatan keluarga adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memangkas pos belanja hiburan dan langganan video berbayar"
      },
      {
        "key": "B",
        "text": "Menghentikan konsumsi beras dan beralih ke air putih saja"
      },
      {
        "key": "C",
        "text": "Menolak membayar iuran sekolah anak di awal semester"
      },
      {
        "key": "D",
        "text": "Meminjam uang ke pinjaman online berbunga harian 1%"
      },
      {
        "key": "E",
        "text": "Menjual sertifikat rumah tinggal utama kepada tetangga"
      }
    ],
    "correct": "A",
    "explanation": "Mengatasi defisit dilakukan dengan memangkas pos keinginan non-esensial (hiburan, langganan streaming) tanpa mengorbankan kebutuhan pokok dasar."
  },
  {
    "id": 67,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Seorang petani menerima pembayaran gabah Rp20.000.000. Rencana pembagian yang mencerminkan pemenuhan kewajiban, tabungan, dan kebutuhan tanam musim depan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghabiskan seluruh uang untuk membeli sepeda motor baru secara tunai"
      },
      {
        "key": "B",
        "text": "Menyisihkan modal benih pupuk, membayar utang saprodi, dan menabung sisanya"
      },
      {
        "key": "C",
        "text": "Menyimpan seluruh uang dalam bentuk valuta asing di laci lemari pakaian"
      },
      {
        "key": "D",
        "text": "Membagi uang sama rata kepada seluruh kerabat yang datang berkunjung"
      },
      {
        "key": "E",
        "text": "Menyerahkan uang kepada calo pengganda dana investasi tanpa kuitansi"
      }
    ],
    "correct": "B",
    "explanation": "Pengelolaan hasil panen bijak mendahulukan modal produksi musim berikutnya, pelunasan kewajiban utang saprodi, dan tabungan masa depan."
  },
  {
    "id": 68,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Toko peralatan tani mencatat arus kas masuk bulan ini Rp45.000.000 dan arus kas keluar Rp38.000.000. Besarnya arus kas bersih (net cash flow) toko tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp5.000.000 surplus kas"
      },
      {
        "key": "B",
        "text": "Rp9.000.000 surplus kas"
      },
      {
        "key": "C",
        "text": "Rp7.000.000 surplus kas"
      },
      {
        "key": "D",
        "text": "Rp11.000.000 surplus kas"
      },
      {
        "key": "E",
        "text": "Rp83.000.000 total arus"
      }
    ],
    "correct": "C",
    "explanation": "Net Cash Flow = Kas Masuk - Kas Keluar = Rp45.000.000 - Rp38.000.000 = Rp7.000.000 (Surplus)."
  },
  {
    "id": 69,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Budi ingin membeli laptop seharga Rp6.000.000 dalam waktu 10 bulan ke depan. Jumlah uang yang wajib disisihkan Budi secara disiplin setiap bulannya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp400.000 per bulan"
      },
      {
        "key": "B",
        "text": "Rp800.000 per bulan"
      },
      {
        "key": "C",
        "text": "Rp1.000.000 per bulan"
      },
      {
        "key": "D",
        "text": "Rp600.000 per bulan"
      },
      {
        "key": "E",
        "text": "Rp1.200.000 per bulan"
      }
    ],
    "correct": "D",
    "explanation": "Target Tabungan Bulanan = Total Kebutuhan / Jumlah Bulan = Rp6.000.000 / 10 bulan = Rp600.000 per bulan."
  },
  {
    "id": 70,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Laju inflasi tahun ini sebesar 5%. Jika seseorang menyimpan uang tunai Rp10.000.000 di dalam lemari tanpa bunga, perkiraan daya beli riil uang tersebut setahun kemudian adalah...",
    "options": [
      {
        "key": "A",
        "text": "Setara Rp10.500.000"
      },
      {
        "key": "B",
        "text": "Setara Rp9.000.000"
      },
      {
        "key": "C",
        "text": "Setara Rp10.000.000"
      },
      {
        "key": "D",
        "text": "Setara Rp8.500.000"
      },
      {
        "key": "E",
        "text": "Setara Rp9.500.000"
      }
    ],
    "correct": "E",
    "explanation": "Daya beli riil berkurang sebesar tingkat inflasi: Rp10.000.000 - (5% x Rp10.000.000) = Rp9.500.000."
  },
  {
    "id": 71,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Mendiagnosis penyebab banyak petani terlilit utang menahun pada pelepas uang tidak resmi menunjukkan akar masalah finansial berupa...",
    "options": [
      {
        "key": "A",
        "text": "Ketiadaan dana darurat dan ketergantungan pada pendapatan musiman panen"
      },
      {
        "key": "B",
        "text": "Tingginya kebiasaan mencatat arus kas pemasukan dan pengeluaran secara tertib"
      },
      {
        "key": "C",
        "text": "Keberadaan lembaga perbankan yang memberikan kredit bunga nol persen"
      },
      {
        "key": "D",
        "text": "Penolakan petani terhadap pembelian alat mesin pertanian modern"
      },
      {
        "key": "E",
        "text": "Kelebihan simpanan emas murni di brankas kantor pegadaian desa"
      }
    ],
    "correct": "A",
    "explanation": "Ketiadaan dana cadangan likuid saat jeda antarmusim panen memaksa petani mengambil utang darurat berbunga tinggi dari pelepas uang."
  },
  {
    "id": 72,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Seseorang tergiur tawaran investasi yang menjanjikan keuntungan pasti 30% per bulan tanpa risiko. Analisis kritis terhadap penawaran tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Peluang emas yang harus diambil dengan menggadaikan seluruh aset sawah"
      },
      {
        "key": "B",
        "text": "Indikasi kuat skema penipuan ponzi karena tidak ada bisnis riil tanpa risiko"
      },
      {
        "key": "C",
        "text": "Program resmi pemerintah untuk mengentaskan kemiskinan warga pedesaan"
      },
      {
        "key": "D",
        "text": "Produk simpanan perbankan konvensional yang dijamin penuh lembaga penjamin"
      },
      {
        "key": "E",
        "text": "Instrumen pasar modal yang diawasi langsung oleh kementerian keuangan"
      }
    ],
    "correct": "B",
    "explanation": "Janji imbal hasil sangat tinggi tanpa risiko merupakan ciri klasik skema Ponzi/investasi bodong yang menggunakan uang anggota baru untuk membayar anggota lama."
  },
  {
    "id": 73,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Analisis dampak psikologis gaya hidup konsumtif 'fear of missing out' terhadap ketahanan finansial generasi muda pedesaan menunjukkan ancaman...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatnya aset produktif berupa kepemilikan saham perusahaan agribisnis"
      },
      {
        "key": "B",
        "text": "Menurunnya suku bunga pinjaman perumahan rakyat di bank daerah"
      },
      {
        "key": "C",
        "text": "Terganggunya tabungan jangka panjang akibat memaksakan belanja gengsi"
      },
      {
        "key": "D",
        "text": "Terciptanya kemandirian finansial lebih awal sebelum memasuki usia kerja"
      },
      {
        "key": "E",
        "text": "Bertambahnya alokasi dana darurat yang tersimpan di rekening bank"
      }
    ],
    "correct": "C",
    "explanation": "Perilaku FOMO mendorong pengeluaran impulsif demi pengakuan sosial yang mengikis dana tabungan dan memperbesar risiko jeratan utang konsumtif."
  },
  {
    "id": 74,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Perbandingan antara membeli sepeda motor secara tunai Rp18.000.000 dengan kredit angsuran Rp900.000 per bulan selama 3 tahun menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Skema kredit lebih menguntungkan karena total uang yang dibayar menjadi lebih sedikit"
      },
      {
        "key": "B",
        "text": "Skema tunai merugikan pembeli karena menghabiskan modal kerja secara sekaligus"
      },
      {
        "key": "C",
        "text": "Skema kredit membebaskan pembeli dari kewajiban servis berkala kendaraan"
      },
      {
        "key": "D",
        "text": "Skema kredit membebani biaya bunga total Rp14.400.000 lebih mahal dari harga tunai"
      },
      {
        "key": "E",
        "text": "Kedua skema memiliki nilai pengeluaran uang yang persis sama hingga akhir periode"
      }
    ],
    "correct": "D",
    "explanation": "Total cicilan kredit = 36 bulan x Rp900.000 = Rp32.400.000. Selisih bunga = Rp32.400.000 - Rp18.000.000 = Rp14.400.000 lebih mahal."
  },
  {
    "id": 75,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Evaluasi terhadap fenomena 'gali lubang tutup lubang' pada pinjaman konsumtif menunjukkan bahwa strategi tersebut...",
    "options": [
      {
        "key": "A",
        "text": "Merupakan solusi cerdas untuk meningkatkan skor kelayakan kredit di perbankan"
      },
      {
        "key": "B",
        "text": "Membantu nasabah melunasi seluruh kewajiban pokok tanpa perlu mengeluarkan uang"
      },
      {
        "key": "C",
        "text": "Menghapuskan catatan riwayat utang pada sistem informasi debitur nasional"
      },
      {
        "key": "D",
        "text": "Meningkatkan nilai kekayaan bersih keluarga dalam laporan neraca keuangan"
      },
      {
        "key": "E",
        "text": "Memicu efek bola salju utang yang semakin membesar akibat akumulasi bunga"
      }
    ],
    "correct": "E",
    "explanation": "Membayar utang lama dengan utang baru tidak menyelesaikan pokok masalah, melainkan memperbesar beban akumulasi bunga dan biaya administrasi."
  },
  {
    "id": 76,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Menganalisis dampak inflasi pangan berkepanjangan terhadap struktur anggaran belanja keluarga berpenghasilan upah minimum menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Porsi belanja makanan pokok membengkak dan menekan pos tabungan masa depan"
      },
      {
        "key": "B",
        "text": "Keluarga memiliki sisa dana lebih banyak untuk berinvestasi reksa dana saham"
      },
      {
        "key": "C",
        "text": "Harga komoditas pangan di pasar otomatis kembali stabil dalam waktu singkat"
      },
      {
        "key": "D",
        "text": "Keluarga beralih membeli barang sekunder bermerek untuk mempertahankan status"
      },
      {
        "key": "E",
        "text": "Terjadi surplus kas masuk yang signifikan pada laporan anggaran keluarga"
      }
    ],
    "correct": "A",
    "explanation": "Inflasi pangan memukul golongan berpenghasilan tetap karena porsi biaya makan primer meningkat drastis sehingga mengorbankan pos tabungan."
  },
  {
    "id": 77,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Ketika seorang pedagang sembako mencampur uang pendapatan toko dengan uang belanja dapur pribadi, dampak akuntansi yang terjadi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Toko terbebas dari keharusan menghitung persediaan barang dagangan di gudang"
      },
      {
        "key": "B",
        "text": "Laporan laba rugi menjadi bias dan modal usaha rentan terpakai tanpa disadari"
      },
      {
        "key": "C",
        "text": "Pedagang memperoleh keringanan bunga kredit dari bank perkreditan rakyat"
      },
      {
        "key": "D",
        "text": "Toko memperoleh status badan hukum resmi dari kementerian hukum dan HAM"
      },
      {
        "key": "E",
        "text": "Arus kas penerimaan toko otomatis bertambah dua kali lipat setiap pekan"
      }
    ],
    "correct": "B",
    "explanation": "Pencampuran kas mengaburkan kinerja riil usaha, menyulitkan evaluasi profitabilitas, dan sering memicu kebangkrutan akibat modal modal tergerus kebutuhan konsumtif."
  },
  {
    "id": 78,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Mendiagnosis kegagalan rencana anggaran tabungan bulanan yang telah disusun rapi sering kali disebabkan oleh faktor kelemahan...",
    "options": [
      {
        "key": "A",
        "text": "Tingginya disiplin diri dalam menahan pengeluaran belanja yang tidak perlu"
      },
      {
        "key": "B",
        "text": "Terlalu banyaknya dana darurat yang tersimpan di rekening tabungan resmi"
      },
      {
        "key": "C",
        "text": "Ketiadaan komitmen dan pengeluaran impulsif yang tidak tercatat dalam rencana"
      },
      {
        "key": "D",
        "text": "Rendahnya harga barang-barang kebutuhan pokok yang dijual di pasar desa"
      },
      {
        "key": "E",
        "text": "Bantuan subsidi pupuk yang disalurkan secara tepat waktu oleh dinas"
      }
    ],
    "correct": "C",
    "explanation": "Kegagalan anggaran umumnya bersumber dari perilaku emosional (impulse buying), pengeluaran mikro yang tidak dicatat, dan inkonsistensi eksekusi."
  },
  {
    "id": 79,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Menelaah keputusan seorang petani yang menjual seluruh tanah sawahnya untuk membeli mobil mewah pribadi menunjukkan kesalahan finansial berupa...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatkan kemampuan daya tawar harga gabah di depan para tengkulak desa"
      },
      {
        "key": "B",
        "text": "Menghapuskan risiko gagal panen akibat serangan hama pada musim penghujan"
      },
      {
        "key": "C",
        "text": "Membantu pemerintah mempercepat program modernisasi alat transportasi daerah"
      },
      {
        "key": "D",
        "text": "Menukar aset produktif berpenghasilan rutin dengan aset konsumtif bernilai susut"
      },
      {
        "key": "E",
        "text": "Mengamankan kekayaan keluarga dari ancaman laju inflasi jangka panjang"
      }
    ],
    "correct": "D",
    "explanation": "Menjual sawah (aset produktif penghasil arus kas) untuk mobil (aset konsumtif dengan depresiasi nilai dan biaya perawatan tinggi) adalah kesalahan fatal manajemen kekayaan."
  },
  {
    "id": 80,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "B. Literasi dan Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Merumuskan strategi pemulihan keuangan keluarga petani pasca-bencana gagal panen banjir memerlukan langkah prioritas berupa...",
    "options": [
      {
        "key": "A",
        "text": "Mengajukan pinjaman konsumtif baru untuk merenovasi teras rumah tinggal"
      },
      {
        "key": "B",
        "text": "Menolak berkomunikasi dengan pihak bank pemberi pinjaman modal kerja"
      },
      {
        "key": "C",
        "text": "Membeli polis asuransi jiwa baru dengan premi bulanan yang sangat mahal"
      },
      {
        "key": "D",
        "text": "Menjual seluruh pakaian seragam sekolah anak demi menutup biaya makan"
      },
      {
        "key": "E",
        "text": "Menggunakan dana darurat, menunda belanja tersier, dan merestrukturisasi kredit"
      }
    ],
    "correct": "E",
    "explanation": "Pemulihan pascakrisis mengandalkan dana darurat, penghentian belanja non-pokok, dan negosiasi restrukturisasi jadwal angsuran pinjaman dengan pihak bank."
  },
  {
    "id": 81,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Kedudukan Bank Indonesia sebagai bank sentral Republik Indonesia berdasarkan undang-undang adalah lembaga negara yang bersifat...",
    "options": [
      {
        "key": "A",
        "text": "Independen bebas dari campur tangan pihak lain"
      },
      {
        "key": "B",
        "text": "Tunduk di bawah kementerian keuangan"
      },
      {
        "key": "C",
        "text": "Bawahan langsung dewan perwakilan rakyat"
      },
      {
        "key": "D",
        "text": "BUMN yang berorientasi mencari laba sebesar-besarnya"
      },
      {
        "key": "E",
        "text": "Lembaga swasta pemegang hak monopoli cetak uang"
      }
    ],
    "correct": "A",
    "explanation": "Pasal 4 UU Bank Indonesia menetapkan BI sebagai lembaga negara yang independen dalam melaksanakan tugas dan wewenangnya, bebas dari campur tangan pemerintah/pihak lain."
  },
  {
    "id": 82,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Tujuan tunggal yang diamanatkan oleh undang-undang kepada Bank Indonesia dalam perekonomian nasional adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membagi dividen tunai kepada seluruh warga negara"
      },
      {
        "key": "B",
        "text": "Mencapai dan memelihara kestabilan nilai rupiah"
      },
      {
        "key": "C",
        "text": "Menyalurkan kredit mikro langsung ke pedagang pasar"
      },
      {
        "key": "D",
        "text": "Mengambil alih seluruh pengelolaan kas daerah provinsi"
      },
      {
        "key": "E",
        "text": "Menentukan harga patokan komoditas pangan pokok"
      }
    ],
    "correct": "B",
    "explanation": "Tujuan tunggal Bank Indonesia adalah mencapai dan memelihara kestabilan nilai rupiah (terhadap barang/jasa atau inflasi, serta terhadap mata uang asing)."
  },
  {
    "id": 83,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Tiga pilar utama tugas Bank Indonesia untuk mencapai dan memelihara kestabilan nilai rupiah mencakup bidang...",
    "options": [
      {
        "key": "A",
        "text": "Pajak daerah, retribusi pasar, dan bea cukai impor"
      },
      {
        "key": "B",
        "text": "Ekspor minyak, subsidi pupuk, dan cetak sertifikat tanah"
      },
      {
        "key": "C",
        "text": "Moneter, sistem pembayaran, dan stabilitas keuangan"
      },
      {
        "key": "D",
        "text": "Kredit perumahan, asuransi tenaga kerja, dan bursa saham"
      },
      {
        "key": "E",
        "text": "Anggaran belanja negara, utang luar negeri, dan dividen BUMN"
      }
    ],
    "correct": "C",
    "explanation": "Tiga pilar tugas BI: (1) Menetapkan dan melaksanakan kebijakan moneter, (2) Mengatur dan menjaga kelancaran sistem pembayaran, (3) Menjaga stabilitas sistem keuangan."
  },
  {
    "id": 84,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Kebijakan yang ditetapkan dan dilaksanakan oleh Bank Indonesia untuk mengendalikan jumlah uang yang beredar disebut...",
    "options": [
      {
        "key": "A",
        "text": "Kebijakan fiskal pajak"
      },
      {
        "key": "B",
        "text": "Kebijakan tarif cukai"
      },
      {
        "key": "C",
        "text": "Kebijakan perdagangan luar"
      },
      {
        "key": "D",
        "text": "Kebijakan moneter sentral"
      },
      {
        "key": "E",
        "text": "Kebijakan upah minimum"
      }
    ],
    "correct": "D",
    "explanation": "Kebijakan moneter adalah kebijakan bank sentral untuk mengontrol jumlah uang beredar dan suku bunga guna mencapai stabilitas ekonomi."
  },
  {
    "id": 85,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Bentuk uang fisik berupa uang kertas dan uang logam yang berlaku sebagai alat pembayaran sah di Indonesia disebut...",
    "options": [
      {
        "key": "A",
        "text": "Uang giral simpanan"
      },
      {
        "key": "B",
        "text": "Uang kuasi deposito"
      },
      {
        "key": "C",
        "text": "Uang kripto digital"
      },
      {
        "key": "D",
        "text": "Uang komoditas emas"
      },
      {
        "key": "E",
        "text": "Uang kartal resmi"
      }
    ],
    "correct": "E",
    "explanation": "Uang kartal terdiri atas uang kertas dan uang logam yang diterbitkan oleh bank sentral dan wajib diterima sebagai alat pembayaran sah."
  },
  {
    "id": 86,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Alat pembayaran yang dikeluarkan oleh bank umum berupa saldo rekening koran yang dapat ditarik dengan cek disebut...",
    "options": [
      {
        "key": "A",
        "text": "Uang giral perbankan"
      },
      {
        "key": "B",
        "text": "Uang kartal kertas"
      },
      {
        "key": "C",
        "text": "Uang tanda logam"
      },
      {
        "key": "D",
        "text": "Uang intrisik mulia"
      },
      {
        "key": "E",
        "text": "Uang bernilai penuh"
      }
    ],
    "correct": "A",
    "explanation": "Uang giral adalah saldo dana simpanan pada rekening giro di bank umum yang dapat digunakan sewaktu-waktu dengan cek atau bilyet giro."
  },
  {
    "id": 87,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Dua fungsi asli dari uang dalam ilmu ekonomi moneter adalah sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Alat penimbun kekayaan dan alat bayar utang"
      },
      {
        "key": "B",
        "text": "Alat tukar umum dan alat satuan hitung"
      },
      {
        "key": "C",
        "text": "Alat pendorong status sosial dan prestise pribadi"
      },
      {
        "key": "D",
        "text": "Alat pemindah kekayaan dan jaminan kredit bank"
      },
      {
        "key": "E",
        "text": "Alat investasi saham dan sarana spekulasi modal"
      }
    ],
    "correct": "B",
    "explanation": "Fungsi asli uang adalah sebagai alat tukar (medium of exchange) dan satuan hitung (unit of account)."
  },
  {
    "id": 88,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Satu-satunya lembaga yang memiliki hak tunggal (hak oktroi) untuk mencetak dan mengedarkan uang Rupiah di Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Otoritas Jasa Keuangan"
      },
      {
        "key": "B",
        "text": "Lembaga Penjamin Simpanan"
      },
      {
        "key": "C",
        "text": "Bank Indonesia"
      },
      {
        "key": "D",
        "text": "Kementerian BUMN Republik Indonesia"
      },
      {
        "key": "E",
        "text": "Bank Rakyat Indonesia"
      }
    ],
    "correct": "C",
    "explanation": "Hak oktroi (hak tunggal mencetak dan mengedarkan uang kartal) dipegang secara eksklusif oleh Bank Indonesia selaku bank sentral."
  },
  {
    "id": 89,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Suku bunga kebijakan acuan yang ditetapkan oleh Bank Indonesia sebagai sinyal arah kebijakan moneter nasional disebut...",
    "options": [
      {
        "key": "A",
        "text": "Suku bunga deposito bank"
      },
      {
        "key": "B",
        "text": "Suku bunga kredit usaha"
      },
      {
        "key": "C",
        "text": "Suku bunga pasar antarbank"
      },
      {
        "key": "D",
        "text": "Suku bunga acuan BI-Rate"
      },
      {
        "key": "E",
        "text": "Suku bunga margin koperasi"
      }
    ],
    "correct": "D",
    "explanation": "BI-Rate (atau BI 7-Day Reverse Repo Rate) adalah suku bunga kebijakan moneter yang merefleksikan sikap moneter yang ditetapkan Bank Indonesia."
  },
  {
    "id": 90,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Standar kode respon cepat nasional yang diluncurkan Bank Indonesia untuk mengintegrasikan pembayaran digital di seluruh Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sistem kliring warkat debet"
      },
      {
        "key": "B",
        "text": "Kartu debit berlogo gerbang"
      },
      {
        "key": "C",
        "text": "Mesin gesek EDC perbankan"
      },
      {
        "key": "D",
        "text": "Dompet elektronik prabayar"
      },
      {
        "key": "E",
        "text": "Standar kode QRIS nasional"
      }
    ],
    "correct": "E",
    "explanation": "QRIS (Quick Response Code Indonesian Standard) adalah standar nasional pembayaran kode QR yang diatur dan diawasi oleh Bank Indonesia."
  },
  {
    "id": 91,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Perbedaan fungsi mendasar antara Bank Indonesia dan bank umum komersial dalam sistem perbankan nasional adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bank Indonesia menjaga stabilitas rupiah, bank umum menghimpun dan menyalurkan dana"
      },
      {
        "key": "B",
        "text": "Bank Indonesia melayani rekening perorangan, bank umum mengatur stabilitas moneter"
      },
      {
        "key": "C",
        "text": "Bank Indonesia meminjamkan uang ke pedagang pasar, bank umum mencetak uang kartal"
      },
      {
        "key": "D",
        "text": "Bank Indonesia berada di bawah bank umum, bank umum bertanggung jawab ke presiden"
      },
      {
        "key": "E",
        "text": "Bank Indonesia mencari profit maksimal, bank umum berorientasi sosial nirlaba"
      }
    ],
    "correct": "A",
    "explanation": "Bank Indonesia berfokus pada stabilitas moneter dan sistem pembayaran tanpa mencari keuntungan, sedangkan bank umum melayani transaksi masyarakat dan mencari laba."
  },
  {
    "id": 92,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Pembagian tugas pengawasan sektor perbankan antara Otoritas Jasa Keuangan dan Bank Indonesia pasca-reformasi keuangan adalah...",
    "options": [
      {
        "key": "A",
        "text": "OJK mengawasi moneter negara, sedangkan BI mengawasi kesehatan operasional cabang bank"
      },
      {
        "key": "B",
        "text": "OJK mengawasi kesehatan individual bank, sedangkan BI mengawasi makroprudensial sistem"
      },
      {
        "key": "C",
        "text": "OJK mencetak mata uang kertas, sedangkan BI menetapkan pajak bunga simpanan tabungan"
      },
      {
        "key": "D",
        "text": "OJK melayani penukaran uang rusak, sedangkan BI memberikan pinjaman kepada pedagang"
      },
      {
        "key": "E",
        "text": "OJK mengaudit kinerja presiden, sedangkan BI mengawasi seluruh kantor dinas daerah"
      }
    ],
    "correct": "B",
    "explanation": "OJK bertugas pada pengawasan mikroprudensial (kesehatan bank individual), sementara BI mengawasi makroprudensial (kestabilan sistem keuangan secara keseluruhan)."
  },
  {
    "id": 93,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Mekanisme transmisi kenaikan suku bunga acuan BI-Rate dalam meredam laju inflasi yang terlalu tinggi bekerja melalui cara...",
    "options": [
      {
        "key": "A",
        "text": "Mempercepat pencetakan uang kertas baru untuk dibagikan secara gratis ke warga"
      },
      {
        "key": "B",
        "text": "Menurunkan syarat cadangan kas minimum di seluruh kantor cabang bank umum"
      },
      {
        "key": "C",
        "text": "Menaikkan bunga simpanan dan kredit sehingga masyarakat menahan belanja konsumsi"
      },
      {
        "key": "D",
        "text": "Memaksa pedagang menurunkan harga jual barang secara sepihak di pasar desa"
      },
      {
        "key": "E",
        "text": "Melarang peredaran uang kartal fisik di seluruh transaksi perdagangan daerah"
      }
    ],
    "correct": "C",
    "explanation": "Kenaikan BI-Rate mendorong kenaikan bunga simpanan dan pinjaman, memicu masyarakat lebih giat menabung dan mengerem konsumsi sehingga inflasi mereda."
  },
  {
    "id": 94,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Peran Bank Indonesia sebagai 'lender of the last resort' dalam menjaga stabilitas sistem perbankan nasional adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memberikan bantuan modal cuma-cuma kepada pengusaha yang mengalami kerugian usaha"
      },
      {
        "key": "B",
        "text": "Mengambil alih kepemilikan aset tanah petani yang menunggak cicilan kredit mikro"
      },
      {
        "key": "C",
        "text": "Menetapkan batas harga sewa kios pasar bagi seluruh pedagang kebutuhan pokok"
      },
      {
        "key": "D",
        "text": "Penyedia likuiditas pinjaman darurat bagi bank yang mengalami kesulitan likuiditas"
      },
      {
        "key": "E",
        "text": "Menjadi tempat belanja kebutuhan barang pokok paling murah bagi warga miskin"
      }
    ],
    "correct": "D",
    "explanation": "Sebagai lender of last resort, BI dapat memberikan Fasilitas Pembiayaan Darurat kepada bank yang mengalami krisis likuiditas agar tidak memicu krisis sistemik."
  },
  {
    "id": 95,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Kelebihan utama implementasi sistem QRIS bagi pedagang warung UMKM di pedesaan Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pedagang tidak lagi dikenakan biaya pembelian bahan baku dagangan di pasar grosir"
      },
      {
        "key": "B",
        "text": "Warung otomatis memperoleh pasokan barang dagangan gratis setiap awal pekan dari dinas"
      },
      {
        "key": "C",
        "text": "Pedagang dibebaskan dari kewajiban menjaga kebersihan dan keamanan lingkungan toko"
      },
      {
        "key": "D",
        "text": "Saldo rekening pedagang otomatis berlipat ganda setiap kali terjadi transaksi masuk"
      },
      {
        "key": "E",
        "text": "Satu kode stiker dapat menerima pembayaran dari seluruh aplikasi bank dan dompet digital"
      }
    ],
    "correct": "E",
    "explanation": "Interoperabilitas QRIS memungkinkan satu QR code menerima pembayaran dari seluruh penyelenggara jasa pembayaran (PJP) bank maupun non-bank."
  },
  {
    "id": 96,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Operasi pasar terbuka yang dilakukan Bank Indonesia dengan cara menjual Surat Berharga Negara kepada bank umum bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menyerap kelebihan likuiditas uang beredar guna menahan laju lonjakan inflasi"
      },
      {
        "key": "B",
        "text": "Menambah peredaran uang di masyarakat guna mendorong belanja konsumsi berlebih"
      },
      {
        "key": "C",
        "text": "Menurunkan suku bunga simpanan deposito di seluruh kantor cabang bank daerah"
      },
      {
        "key": "D",
        "text": "Membagikan deviden tunai secara merata kepada seluruh nasabah pemilik rekening"
      },
      {
        "key": "E",
        "text": "Membiayai pembangunan gedung perkantoran dinas kependudukan di kabupaten"
      }
    ],
    "correct": "A",
    "explanation": "Menjual surat berharga (kebijakan kontraktif) menarik uang dari perbankan ke bank sentral, mengurangi jumlah uang beredar untuk menekan inflasi."
  },
  {
    "id": 97,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Kewajiban bank umum memelihara Giro Wajib Minimum di Bank Indonesia memiliki fungsi regulasi berupa...",
    "options": [
      {
        "key": "A",
        "text": "Memberikan komisi tambahan bagi pimpinan cabang perbankan yang berprestasi tinggi"
      },
      {
        "key": "B",
        "text": "Memastikan tersedianya cadangan likuiditas dan mengendalikan daya ekspansi kredit bank"
      },
      {
        "key": "C",
        "text": "Menghapuskan biaya administrasi pengelolaan rekening simpanan nasabah perorangan"
      },
      {
        "key": "D",
        "text": "Menyamarkan jumlah kerugian operasional perbankan dari pemeriksaan dewan komisaris"
      },
      {
        "key": "E",
        "text": "Menentukan kuota penerimaan pegawai baru di lingkungan kantor perbankan umum"
      }
    ],
    "correct": "B",
    "explanation": "GWM menetapkan persentase simpanan masyarakat yang wajib disimpan di BI, berfungsi sebagai penyangga likuiditas dan pengatur ekspansi kredit perbankan."
  },
  {
    "id": 98,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Prinsip 3D yang disosialisasikan oleh Bank Indonesia kepada masyarakat pedesaan untuk mengenali keaslian uang rupiah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dihitung, Disimpan, dan Digunakan dalam kegiatan berbelanja kebutuhan"
      },
      {
        "key": "B",
        "text": "Dicatat, Digandakan, dan Ditukarkan ke kantor cabang bank terdekat"
      },
      {
        "key": "C",
        "text": "Dilihat, Diraba, dan Diterawang tanda air serta benang pengamannya"
      },
      {
        "key": "D",
        "text": "Dicuci, Dijemur, dan Dilipat rapi di dalam dompet tempat penyimpanan"
      },
      {
        "key": "E",
        "text": "Ditimbang, Diukur, dan Difoto sebagai bukti kepemilikan harta keluarga"
      }
    ],
    "correct": "C",
    "explanation": "Metode 3D: Dilihat (perubahan warna/gambar), Diraba (cetak timbul/kasar), Diterawang (tanda air/watermark dan rectoverso) untuk memverifikasi keaslian uang."
  },
  {
    "id": 99,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Kebijakan moneter ekspansif (easy money policy) yang ditempuh bank sentral dengan menurunkan suku bunga acuan bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mengerem pertumbuhan penyaluran kredit dan menghentikan pembukaan lapangan kerja"
      },
      {
        "key": "B",
        "text": "Menarik seluruh mata uang rupiah yang beredar di tangan masyarakat perorangan"
      },
      {
        "key": "C",
        "text": "Membatasi impor bahan pangan pokok demi keuntungan eksklusif importir besar"
      },
      {
        "key": "D",
        "text": "Mendorong penyaluran kredit dan menggairahkan aktivitas perekonomian yang lesu"
      },
      {
        "key": "E",
        "text": "Menghapuskan keberadaan instrumen transaksi nontunai digital di pedesaan"
      }
    ],
    "correct": "D",
    "explanation": "Kebijakan ekspansif menurunkan suku bunga dan melonggarkan kredit guna memacu investasi, konsumsi, dan pertumbuhan ekonomi saat lesu."
  },
  {
    "id": 100,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Layanan penukaran uang kas keliling Bank Indonesia hingga ke pelosok kecamatan di OKU Timur bertujuan untuk mewujudkan prinsip...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan transaksi perdagangan di pasar tradisional setempat"
      },
      {
        "key": "B",
        "text": "Memungut biaya sewa penggunaan mata uang kepada masyarakat umum"
      },
      {
        "key": "C",
        "text": "Menggantikan seluruh mata uang kertas dengan mata uang logam mulia"
      },
      {
        "key": "D",
        "text": "Mengharuskan warga desa membuka rekening simpanan valuta asing"
      },
      {
        "key": "E",
        "text": "Menyediakan uang layak edar dalam jumlah dan pecahan yang sesuai"
      }
    ],
    "correct": "E",
    "explanation": "Program Clean Money Policy BI memastikan uang rupiah yang beredar di masyarakat berkualitas baik, layak edar, dan mencukupi kebutuhan pecahan."
  },
  {
    "id": 101,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Tingkat inflasi tahunan melonjak tajam melampaui sasaran target nasional. Berdasarkan instrumen kebijakan moneter, tindakan yang harus diambil oleh Bank Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menaikkan suku bunga acuan BI-Rate dan menyerap likuiditas"
      },
      {
        "key": "B",
        "text": "Menurunkan suku bunga acuan BI-Rate serendah-rendahnya"
      },
      {
        "key": "C",
        "text": "Mencetak uang kartal baru dalam jumlah berlipat ganda"
      },
      {
        "key": "D",
        "text": "Menghapus ketentuan giro wajib minimum bagi bank umum"
      },
      {
        "key": "E",
        "text": "Membagikan bantuan dana tunai tanpa syarat ke nasabah"
      }
    ],
    "correct": "A",
    "explanation": "Saat inflasi melonjak, BI menaikkan suku bunga acuan untuk meredam permintaan agregat dan menstabilkan tingkat harga umum."
  },
  {
    "id": 102,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Perekonomian daerah mengalami kelesuan akibat daya beli menurun pasca-musim paceklik. Kebijakan moneter akomodatif yang tepat diterapkan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menaikkan rasio cadangan kas minimum bank umum di kas sentral"
      },
      {
        "key": "B",
        "text": "Menurunkan suku bunga acuan guna mempermudah akses kredit modal"
      },
      {
        "key": "C",
        "text": "Menjual surat berharga negara dalam jumlah besar ke masyarakat"
      },
      {
        "key": "D",
        "text": "Memperketat syarat penyaluran kredit usaha mikro di perbankan"
      },
      {
        "key": "E",
        "text": "Melarang bank umum memberikan fasilitas pinjaman kepada petani"
      }
    ],
    "correct": "B",
    "explanation": "Menurunkan suku bunga mempermudah pelaku usaha dan masyarakat mengakses kredit perbankan dengan bunga terjangkau untuk menggerakkan perekonomian."
  },
  {
    "id": 103,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Seorang pedagang toko pupuk di Belitang menerima pembayaran nontunai QRIS sebesar Rp500.000 dengan tarif Merchant Discount Rate 0,3%. Besarnya potongan fee transaksi tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp500 potongan transaksi"
      },
      {
        "key": "B",
        "text": "Rp3.000 potongan transaksi"
      },
      {
        "key": "C",
        "text": "Rp1.500 potongan transaksi"
      },
      {
        "key": "D",
        "text": "Rp5.000 potongan transaksi"
      },
      {
        "key": "E",
        "text": "Rp15.000 potongan transaksi"
      }
    ],
    "correct": "C",
    "explanation": "Potongan MDR = 0,3% x Rp500.000 = Rp1.500."
  },
  {
    "id": 104,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Bank Indonesia menaikkan Giro Wajib Minimum dari 5% menjadi 8%. Dampak langsung penerapan ketentuan tersebut terhadap daya ekspansi kredit bank umum adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kapasitas penyaluran kredit bank umum semakin meningkat pesat"
      },
      {
        "key": "B",
        "text": "Bank umum dibebaskan dari kewajiban memelihara cadangan kas"
      },
      {
        "key": "C",
        "text": "Jumlah dana simpanan nasabah di bank otomatis terhapus lunas"
      },
      {
        "key": "D",
        "text": "Kapasitas penyaluran kredit bank umum mengalami penurunan"
      },
      {
        "key": "E",
        "text": "Suku bunga simpanan tabungan otomatis diturunkan menjadi nol"
      }
    ],
    "correct": "D",
    "explanation": "Kenaikan GWM mengunci lebih banyak dana bank di bank sentral, sehingga sisa dana yang dapat disalurkan sebagai kredit menjadi berkurang."
  },
  {
    "id": 105,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Saat bertransaksi di pasar, pedagang mendapati uang kertas Rp100.000 yang terasa licin halus tanpa tekstur kasar dan benang pengamannya tidak berubah warna. Tindakan yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tetap menerima uang tersebut dan segera membelanjakannya ke warung lain"
      },
      {
        "key": "B",
        "text": "Merobek uang tersebut di hadapan pembeli tanpa memberikan penjelasan"
      },
      {
        "key": "C",
        "text": "Menyimpan uang palsu tersebut sebagai koleksi pribadi di rumah tinggal"
      },
      {
        "key": "D",
        "text": "Menggandakan uang tersebut menggunakan mesin fotokopi berwarna toko"
      },
      {
        "key": "E",
        "text": "Menolak uang tersebut dengan sopan dan menyarankan konfirmasi ke bank"
      }
    ],
    "correct": "E",
    "explanation": "Indikasi uang palsu harus ditolak secara sopan dan pembeli disarankan memeriksa keasliannya ke kantor perbankan atau kepolisian terdekat."
  },
  {
    "id": 106,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Seorang petani memiliki uang kertas rupiah pecahan Rp50.000 yang robek terbelah menjadi dua. Agar uang tersebut dapat diganti dengan uang baru oleh Bank Indonesia, syarat fisiknya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Luas sisa fisik uang kertas masih lebih dari dua pertiga ukuran aslinya"
      },
      {
        "key": "B",
        "text": "Petani wajib menunjukkan surat keterangan tanda lapor kehilangan dari desa"
      },
      {
        "key": "C",
        "text": "Uang yang rusak harus dicat ulang menggunakan tinta anti-air khusus"
      },
      {
        "key": "D",
        "text": "Penggantian hanya dilayani jika disertai pembelian surat berharga negara"
      },
      {
        "key": "E",
        "text": "Petani diwajibkan membayar biaya cetak sebesar setengah dari nilai nominal"
      }
    ],
    "correct": "A",
    "explanation": "Syarat penukaran uang rusak: fisik uang kertas lebih besar dari 2/3 (dua pertiga) ukuran asli dan ciri keasliannya masih dapat dikenali."
  },
  {
    "id": 107,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Koperasi Unit Desa ingin menyediakan layanan transfer uang bagi anggotanya tanpa membuka kantor cabang bank. Solusi kemitraan pembayaran yang diatur oleh regulasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mencetak warkat cek mandiri atas nama pengurus koperasi desa"
      },
      {
        "key": "B",
        "text": "Menjadi agen bank resmi penyedia layanan keuangan tanpa kantor"
      },
      {
        "key": "C",
        "text": "Menggunakan mata uang asing sebagai alat penyelesaian transaksi"
      },
      {
        "key": "D",
        "text": "Membeli mesin cetak uang kartal untuk operasional internal anggota"
      },
      {
        "key": "E",
        "text": "Menghapuskan pencatatan identitas pengirim dan penerima kiriman"
      }
    ],
    "correct": "B",
    "explanation": "Menjadi Agen Laku Pandai (Layanan Keuangan Tanpa Kantor) memungkinkan koperasi melayani transaksi transfer, setor, dan tarik tunai secara legal."
  },
  {
    "id": 108,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Dalam upaya menstabilkan nilai tukar Rupiah terhadap Dolar AS yang mengalami depresiasi tajam, intervensi pasar yang dapat diterapkan bank sentral adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membeli valuta asing dalam jumlah besar dari pasar valas domestik"
      },
      {
        "key": "B",
        "text": "Menurunkan suku bunga acuan perbankan menjadi nol persen setahun"
      },
      {
        "key": "C",
        "text": "Melakukan intervensi dengan menjual pasokan valas di pasar domestik"
      },
      {
        "key": "D",
        "text": "Melarang penggunaan mata uang rupiah di seluruh transaksi dalam negeri"
      },
      {
        "key": "E",
        "text": "Menarik seluruh pasokan beras cadangan dari gudang logistik daerah"
      }
    ],
    "correct": "C",
    "explanation": "Menjual pasokan valas (Dolar AS) ke pasar meningkatkan ketersediaan valas, sehingga meredam depresiasi dan memperkuat kembali nilai tukar Rupiah."
  },
  {
    "id": 109,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "UMKM keripik pisang di Martapura ingin memperluas pangsa pasar ke luar kota. Pemanfaatan infrastruktur sistem pembayaran digital BI-FAST memberikan efisiensi berupa...",
    "options": [
      {
        "key": "A",
        "text": "Pembebasan seluruh pajak bumi dan bangunan tempat usaha keripik"
      },
      {
        "key": "B",
        "text": "Bahan baku pisang disuplai gratis oleh kementerian perdagangan"
      },
      {
        "key": "C",
        "text": "Jaminan pembelian seluruh produk keripik oleh aparatur sipil negara"
      },
      {
        "key": "D",
        "text": "Biaya transfer antarbank real-time yang murah dan tersedia 24 jam"
      },
      {
        "key": "E",
        "text": "Penghapusan kewajiban memiliki nomor induk berusaha dari dinas"
      }
    ],
    "correct": "D",
    "explanation": "BI-FAST menyediakan infrastruktur pembayaran ritel nasional yang cepat, murah (maksimal Rp2.500), aman, dan beroperasi penuh 24/7 seketika."
  },
  {
    "id": 110,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Siswa menabung uang saku di bank dengan saldo awal Rp1.000.000. Kebijakan perlindungan penjaminan LPS memastikan simpanan tersebut aman dengan syarat...",
    "options": [
      {
        "key": "A",
        "text": "Siswa wajib membeli polis asuransi jiwa berjangka seharga tabungan"
      },
      {
        "key": "B",
        "text": "Saldo tabungan tidak boleh ditarik sebelum siswa lulus perguruan tinggi"
      },
      {
        "key": "C",
        "text": "Penjaminan hanya berlaku untuk simpanan dalam pecahan mata uang dolar"
      },
      {
        "key": "D",
        "text": "Siswa harus menyerahkan fotokopi sertifikat tanah milik orang tua"
      },
      {
        "key": "E",
        "text": "Tercatat di pembukuan bank, bunga wajar, dan tidak merugikan bank"
      }
    ],
    "correct": "E",
    "explanation": "Syarat 3T penjaminan LPS: (1) Tercatat dalam pembukuan bank, (2) Tingkat bunga tidak melebihi bunga penjaminan, (3) Tidak melakukan tindakan merugikan bank."
  },
  {
    "id": 111,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Kenaikan suku bunga acuan BI-Rate yang diikuti kenaikan suku bunga kredit perbankan berdampak pada sektor riil pertanian berupa...",
    "options": [
      {
        "key": "A",
        "text": "Beban biaya cicilan kredit alsintan meningkat sehingga ekspansi usaha tertahan"
      },
      {
        "key": "B",
        "text": "Petani berbondong-bondong menambah pinjaman modal untuk ekspansi sawah"
      },
      {
        "key": "C",
        "text": "Harga pupuk dan pestisida di kios pertanian otomatis turun setengah harga"
      },
      {
        "key": "D",
        "text": "Seluruh bank umum menghapuskan syarat agunan sertifikat tanah sawah"
      },
      {
        "key": "E",
        "text": "Nilai tukar mata uang dolar terhadap rupiah mengalami lonjakan drastis"
      }
    ],
    "correct": "A",
    "explanation": "Kenaikan suku bunga kredit perbankan meningkatkan beban bunga pinjaman mesin pertanian/modal kerja, sehingga menahan laju investasi sektor riil."
  },
  {
    "id": 112,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Menganalisis kendala lambatnya adopsi pembayaran digital QRIS pada pedagang sayur lanjut usia di pasar tradisional Gumawang menunjukkan faktor...",
    "options": [
      {
        "key": "A",
        "text": "Tingginya keahlian pedagang dalam mengoperasikan aplikasi teknologi keuangan"
      },
      {
        "key": "B",
        "text": "Keterbatasan literasi digital, ketergantungan uang tunai, dan kekhawatiran sinyal"
      },
      {
        "key": "C",
        "text": "Larangan resmi dari pengelola pasar bagi pedagang yang memakai kode stiker"
      },
      {
        "key": "D",
        "text": "Mahalnya harga pembuatan stiker barcode yang mencapai jutaan rupiah"
      },
      {
        "key": "E",
        "text": "Keharusan menyetor seluruh modal dagang ke kantor perwakilan bank sentral"
      }
    ],
    "correct": "B",
    "explanation": "Kendala utama adopsi QRIS di pedesaan adalah literasi digital pedagang senior, preferensi uang tunai untuk kulakan harian, serta stabilitas jaringan internet."
  },
  {
    "id": 113,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Sinergi antara Bank Indonesia dan Pemerintah Daerah melalui Tim Pengendalian Inflasi Daerah di OKU Timur memprioritaskan stabilitas harga pangan melalui...",
    "options": [
      {
        "key": "A",
        "text": "Menutup seluruh akses perdagangan komoditas pangan dengan daerah tetangga"
      },
      {
        "key": "B",
        "text": "Mewajibkan warga mengurangi porsi konsumsi beras harian secara sepihak"
      },
      {
        "key": "C",
        "text": "Menjaga keterjangkauan harga, ketersediaan pasokan, dan kelancaran distribusi"
      },
      {
        "key": "D",
        "text": "Memberikan sanksi pidana kepada petani yang menolak menjual hasil panennya"
      },
      {
        "key": "E",
        "text": "Menetapkan harga jual gabah di bawah biaya pokok produksi petani sawah"
      }
    ],
    "correct": "C",
    "explanation": "Kerangka 4K TPID: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi efektif guna mengendalikan inflasi pangan bergejolak."
  },
  {
    "id": 114,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Menelaah dampak peredaran uang palsu terhadap sendi perekonomian daerah pedesaan menunjukkan bahaya paling merusak berupa...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatnya pasokan bahan pangan pokok di gudang logistik kecamatan"
      },
      {
        "key": "B",
        "text": "Menurunnya suku bunga pinjaman modal usaha di bank perkreditan rakyat"
      },
      {
        "key": "C",
        "text": "Mempercepat penyelesaian pembayaran transaksi internasional antarnegara"
      },
      {
        "key": "D",
        "text": "Hilangnya kepercayaan publik terhadap mata uang dan kerugian riil pedagang"
      },
      {
        "key": "E",
        "text": "Bertambahnya jumlah cadangan devisa emas di brankas kas bank sentral"
      }
    ],
    "correct": "D",
    "explanation": "Uang palsu merugikan masyarakat secara finansial dan mengikis kepercayaan (trust) terhadap uang kartal yang menjadi fondasi utama sistem moneter."
  },
  {
    "id": 115,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Evaluasi terhadap transisi transaksi tunai menuju non-tunai di sentra pertanian padi Belitang menunjukkan manfaat efisiensi ekonomi berupa...",
    "options": [
      {
        "key": "A",
        "text": "Membebaskan pedagang dari kewajiban memeriksa kualitas mutu fisik gabah"
      },
      {
        "key": "B",
        "text": "Menjamin seluruh petani terbebas dari ancaman gagal panen akibat cuaca"
      },
      {
        "key": "C",
        "text": "Mengubah status lahan pertanian sawah menjadi kawasan industri manufaktur"
      },
      {
        "key": "D",
        "text": "Menghapuskan kebutuhan saluran irigasi teknis dalam proses bercocok tanam"
      },
      {
        "key": "E",
        "text": "Mengurangi biaya pengelolaan uang tunai dan meminimalkan risiko pencurian"
      }
    ],
    "correct": "E",
    "explanation": "Pembayaran non-tunai memangkas biaya cetak, angkut, dan hitung uang tunai fisik (cash handling cost) serta menurunkan risiko kejahatan begal/pencurian tunai."
  },
  {
    "id": 116,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Ketika bank sentral melonggarkan rasio Loan to Value untuk kredit perumahan rakyat, analisis terhadap sektor riil menunjukkan dampak...",
    "options": [
      {
        "key": "A",
        "text": "Terdorongnya permintaan kredit rumah yang menggerakkan industri bahan bangunan"
      },
      {
        "key": "B",
        "text": "Menurunnya minat masyarakat berpenghasilan rendah untuk memiliki rumah"
      },
      {
        "key": "C",
        "text": "Terhentinya seluruh proyek konstruksi perumahan subsidi di kawasan daerah"
      },
      {
        "key": "D",
        "text": "Meningkatnya uang muka pembelian rumah menjadi delapan puluh persen nilai"
      },
      {
        "key": "E",
        "text": "Penurunan produksi semen dan batu bata di industri manufaktur sekunder"
      }
    ],
    "correct": "A",
    "explanation": "Pelonggaran LTV (down payment lebih ringan) memicu gairah sektor properti yang memiliki dampak berganda (multiplier effect) ke industri semen, batu bata, dan tenaga kerja."
  },
  {
    "id": 117,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Mendiagnosis dampak volatilitas nilai tukar rupiah terhadap pengusaha kilang padi yang menggunakan mesin pengering berbahan bakar impor adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pendapatan pengusaha kilang padi otomatis berlipat ganda tanpa pengeluaran"
      },
      {
        "key": "B",
        "text": "Biaya suku cadang dan operasional mesin membengkak akibat pelemahan kurs"
      },
      {
        "key": "C",
        "text": "Pengusaha dibebaskan dari keharusan menyetor pajak penghasilan tahunan"
      },
      {
        "key": "D",
        "text": "Mesin pengering gabah menjadi lebih hemat bahan bakar secara mekanis"
      },
      {
        "key": "E",
        "text": "Seluruh pasokan gabah petani dapat dibeli dengan mata uang rupiah lama"
      }
    ],
    "correct": "B",
    "explanation": "Pelemahan rupiah menaikkan biaya impor komponen suku cadang dan bahan bakar industri, menaikkan biaya pokok pengolahan kilang padi."
  },
  {
    "id": 118,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Peran kebijakan makroprudensial Bank Indonesia dalam mencegah terjadinya krisis perbankan sistemik difokuskan pada...",
    "options": [
      {
        "key": "A",
        "text": "Menetapkan harga tiket angkutan umum antarprovinsi pada musim mudik"
      },
      {
        "key": "B",
        "text": "Memungut biaya retribusi kebersihan di kawasan pasar tradisional kecamatan"
      },
      {
        "key": "C",
        "text": "Membatasi pertumbuhan kredit berlebih dan memitigasi risiko sistemik finansial"
      },
      {
        "key": "D",
        "text": "Mewajibkan seluruh bank umum membagikan saham gratis kepada nasabah"
      },
      {
        "key": "E",
        "text": "Menutup seluruh transaksi ekspor komoditas perkebunan karet ke luar negeri"
      }
    ],
    "correct": "C",
    "explanation": "Kebijakan makroprudensial menjaga ketahanan seluruh sistem keuangan dari akumulasi risiko sistemik, siklus kredit berlebih (booms and busts), dan penularan krisis."
  },
  {
    "id": 119,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Analisis terhadap independensi Bank Indonesia yang bebas dari intervensi kekuasaan politik bertujuan fundamental untuk...",
    "options": [
      {
        "key": "A",
        "text": "Memisahkan bank sentral dari koordinasi dengan kementerian bidang ekonomi"
      },
      {
        "key": "B",
        "text": "Membebaskan dewan gubernur dari tanggung jawab pelaporan kinerja kepada publik"
      },
      {
        "key": "C",
        "text": "Menjamin bank sentral dapat menaikkan gaji pegawai tanpa batasan regulasi"
      },
      {
        "key": "D",
        "text": "Mencegah pencetakan uang berlebihan demi kepentingan pembiayaan politik sesaat"
      },
      {
        "key": "E",
        "text": "Menghapuskan fungsi pengawasan anggaran oleh badan pemeriksa keuangan"
      }
    ],
    "correct": "D",
    "explanation": "Independensi bank sentral krusial untuk mencegah godaan politik mencetak uang demi belanja populis yang dapat menghancurkan stabilitas nilai mata uang (hiperinflasi)."
  },
  {
    "id": 120,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "C. Kebanksentralan",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Kritisi terhadap pengembangan mata uang digital bank sentral (Central Bank Digital Currency / Digital Rupiah) bagi masyarakat pedesaan menunjukkan tantangan pada...",
    "options": [
      {
        "key": "A",
        "text": "Hilangnya kebutuhan manusia terhadap komoditas beras dan hasil panen pangan"
      },
      {
        "key": "B",
        "text": "Penolakan mutlak dari seluruh lembaga perbankan umum di kota metropolitan"
      },
      {
        "key": "C",
        "text": "Kewajiban menukar seluruh hewan ternak dengan token kripto luar negeri"
      },
      {
        "key": "D",
        "text": "Pemberhentian seluruh aktivitas pengolahan lahan sawah irigasi teknis"
      },
      {
        "key": "E",
        "text": "Kesiapan infrastruktur internet, keamanan data siber, dan inklusi digital warga"
      }
    ],
    "correct": "E",
    "explanation": "Penerapan CBDC (Rupiah Digital) menghadapi tantangan pemerataan sinyal internet, keamanan siber, dan kesiapan literasi digital masyarakat pedesaan."
  },
  {
    "id": 121,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Kesatuan yuridis dan ekonomis dari faktor-faktor produksi yang bertujuan mencari laba atau memberi layanan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Badan usaha berbadan hukum"
      },
      {
        "key": "B",
        "text": "Yayasan sosial kemanusiaan"
      },
      {
        "key": "C",
        "text": "Organisasi kemasyarakatan"
      },
      {
        "key": "D",
        "text": "Lembaga swadaya mandiri"
      },
      {
        "key": "E",
        "text": "Dinas perizinan terpadu"
      }
    ],
    "correct": "A",
    "explanation": "Badan usaha adalah kesatuan yuridis (hukum) dan ekonomis dari faktor produksi yang menggunakan modal dan tenaga kerja untuk mencari laba atau melayani masyarakat."
  },
  {
    "id": 122,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Landasan hukum pokok yang mengatur tentang Perkoperasian di Negara Republik Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Undang-Undang Nomor 10 Tahun 1998"
      },
      {
        "key": "B",
        "text": "Undang-Undang Nomor 25 Tahun 1992"
      },
      {
        "key": "C",
        "text": "Undang-Undang Nomor 40 Tahun 2007"
      },
      {
        "key": "D",
        "text": "Undang-Undang Nomor 6 Tahun 2014"
      },
      {
        "key": "E",
        "text": "Undang-Undang Nomor 1 Tahun 2004"
      }
    ],
    "correct": "B",
    "explanation": "Undang-Undang Nomor 25 Tahun 1992 adalah undang-undang dasar yang mengatur prinsip, kelembagaan, dan tata kelola perkoperasian di Indonesia."
  },
  {
    "id": 123,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Berdasarkan Pasal 33 Ayat 1 UUD 1945, perekonomian Indonesia disusun sebagai usaha bersama berdasar atas asas...",
    "options": [
      {
        "key": "A",
        "text": "Keuntungan modal pemegang saham"
      },
      {
        "key": "B",
        "text": "Persaingan bebas antarpelaku pasar"
      },
      {
        "key": "C",
        "text": "Kekeluargaan dan kebersamaan"
      },
      {
        "key": "D",
        "text": "Monopoli usaha milik negara"
      },
      {
        "key": "E",
        "text": "Kepemilikan mutlak perorangan"
      }
    ],
    "correct": "C",
    "explanation": "Pasal 33 ayat (1) UUD 1945 menegaskan: 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan', yang menjadi dasar filosofis koperasi."
  },
  {
    "id": 124,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh negara melalui penyertaan secara langsung disebut...",
    "options": [
      {
        "key": "A",
        "text": "Badan Usaha Milik Swasta"
      },
      {
        "key": "B",
        "text": "Badan Usaha Milik Desa"
      },
      {
        "key": "C",
        "text": "Koperasi Unit Simpan Pinjam"
      },
      {
        "key": "D",
        "text": "Badan Usaha Milik Negara"
      },
      {
        "key": "E",
        "text": "Firma persekutuan dagang"
      }
    ],
    "correct": "D",
    "explanation": "BUMN adalah badan usaha yang modalnya berasal dari kekayaan negara yang dipisahkan, minimal 51% dimiliki oleh pemerintah Indonesia."
  },
  {
    "id": 125,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Badan usaha yang modal pendiriannya bersumber dari kekayaan pemerintah daerah yang dipisahkan dinamakan...",
    "options": [
      {
        "key": "A",
        "text": "Badan Usaha Milik Negara"
      },
      {
        "key": "B",
        "text": "Perseroan Terbatas Swasta"
      },
      {
        "key": "C",
        "text": "Koperasi Primer Perkotaan"
      },
      {
        "key": "D",
        "text": "Persekutuan Komanditer CV"
      },
      {
        "key": "E",
        "text": "Badan Usaha Milik Daerah"
      }
    ],
    "correct": "E",
    "explanation": "BUMD (Badan Usaha Milik Daerah) didirikan oleh pemerintah daerah dengan modal dari APBD yang dipisahkan untuk pelayanan publik dan pendapatan asli daerah."
  },
  {
    "id": 126,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Pemegang kekuasaan tertinggi dalam struktur tatanan kelembagaan koperasi di Indonesia berada pada forum...",
    "options": [
      {
        "key": "A",
        "text": "Rapat Anggota Tahunan"
      },
      {
        "key": "B",
        "text": "Dewan Pengawas Koperasi"
      },
      {
        "key": "C",
        "text": "Ketua Pengurus Koperasi"
      },
      {
        "key": "D",
        "text": "Dinas Koperasi Kabupaten"
      },
      {
        "key": "E",
        "text": "Manajer Pengelola Usaha"
      }
    ],
    "correct": "A",
    "explanation": "Rapat Anggota merupakan pemegang kekuasaan tertinggi dalam koperasi yang menetapkan anggaran dasar, kebijakan umum, serta memilih pengurus dan pengawas."
  },
  {
    "id": 127,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Pendapatan koperasi yang diperoleh dalam satu tahun buku dikurangi dengan biaya penyusutan dan kewajiban lainnya disebut...",
    "options": [
      {
        "key": "A",
        "text": "Dividen pemegang saham"
      },
      {
        "key": "B",
        "text": "Sisa Hasil Usaha koperasi"
      },
      {
        "key": "C",
        "text": "Royalti penemuan merek"
      },
      {
        "key": "D",
        "text": "Bunga pinjaman anggota"
      },
      {
        "key": "E",
        "text": "Retribusi pelayanan desa"
      }
    ],
    "correct": "B",
    "explanation": "Sisa Hasil Usaha (SHU) adalah selisih pendapatan koperasi dikurangi biaya, penyusutan, dan kewajiban lain dalam satu tahun buku."
  },
  {
    "id": 128,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Simpanan yang wajib dibayarkan oleh seseorang hanya satu kali pada saat pertama kali mendaftar menjadi anggota koperasi disebut...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan sukarela berkala"
      },
      {
        "key": "B",
        "text": "Simpanan wajib bulanan"
      },
      {
        "key": "C",
        "text": "Simpanan pokok pendaftaran"
      },
      {
        "key": "D",
        "text": "Simpanan deposito berjangka"
      },
      {
        "key": "E",
        "text": "Simpanan modal penyertaan"
      }
    ],
    "correct": "C",
    "explanation": "Simpanan pokok adalah sejumlah uang yang sama banyaknya yang wajib dibayarkan saat resmi mendaftar menjadi anggota koperasi dan tidak dapat diambil selama masih anggota."
  },
  {
    "id": 129,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Badan usaha pedesaan yang dapat memiliki berbagai unit seperti BUMDes - Unit Budidaya Pertanian / Perikanan Desa, BUMDes - Unit Pengolahan Pangan & Industri Desa, dan BUMDes - Unit Pasar Desa & Jasa Keuangan Mikro adalah...",
    "options": [
      {
        "key": "A",
        "text": "Badan Penanaman Modal Asing"
      },
      {
        "key": "B",
        "text": "Perseroan Terbatas Terbuka"
      },
      {
        "key": "C",
        "text": "Lembaga Keuangan Mikro Syariah Internasional"
      },
      {
        "key": "D",
        "text": "Badan Usaha Milik Desa (BUMDes)"
      },
      {
        "key": "E",
        "text": "Bursa Komoditas Nusantara"
      }
    ],
    "correct": "D",
    "explanation": "BUMDes adalah badan usaha milik desa yang modalnya bersumber dari desa dan dapat mengelola unit usaha primer, sekunder, maupun tersier secara terpadu."
  },
  {
    "id": 130,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Bentuk badan usaha swasta yang didirikan oleh dua orang atau lebih dengan sebagian sekutu aktif dan sebagian sekutu pasif adalah...",
    "options": [
      {
        "key": "A",
        "text": "Perusahaan perseorangan"
      },
      {
        "key": "B",
        "text": "Perusahaan jawatan negara"
      },
      {
        "key": "C",
        "text": "Koperasi konsumsi primer"
      },
      {
        "key": "D",
        "text": "Yayasan pengelola panti"
      },
      {
        "key": "E",
        "text": "Persekutuan Komanditer"
      }
    ],
    "correct": "E",
    "explanation": "Commanditaire Vennootschap (CV) adalah persekutuan modal dengan sekutu aktif (pengelola usaha) dan sekutu pasif (penanam modal tidur)."
  },
  {
    "id": 131,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Perbedaan mendasar antara prinsip kepemilikan suara dalam Koperasi dan Perseroan Terbatas tercermin pada...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi menerapkan satu anggota satu suara, PT berdasarkan porsi kepemilikan saham"
      },
      {
        "key": "B",
        "text": "Koperasi membagi suara berdasarkan usia anggota, PT membagi suara berdasarkan jenis kelamin"
      },
      {
        "key": "C",
        "text": "Koperasi hanya mengizinkan pengurus memilih, PT memberi hak suara kepada seluruh karyawan"
      },
      {
        "key": "D",
        "text": "Koperasi melarang voting dalam musyawarah, PT tidak memerlukan rapat umum pemegang saham"
      },
      {
        "key": "E",
        "text": "Koperasi dipimpin mutlak oleh dewan direksi, PT dikendalikan langsung oleh kepala desa"
      }
    ],
    "correct": "A",
    "explanation": "Koperasi berprinsip demokratis 'one man one vote' tanpa melihat besaran simpanan, sedangkan PT memberikan hak suara proporsional dengan jumlah lembar saham."
  },
  {
    "id": 132,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Alasan mengapa koperasi dinobatkan sebagai 'soko guru' perekonomian Indonesia adalah karena...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi menghasilkan devisa ekspor terbesar melampaui sektor pertambangan migas"
      },
      {
        "key": "B",
        "text": "Koperasi berlandaskan semangat kebersamaan dan mengangkat kesejahteraan rakyat kecil"
      },
      {
        "key": "C",
        "text": "Koperasi memiliki kewenangan mencetak mata uang rupiah bersama bank sentral"
      },
      {
        "key": "D",
        "text": "Koperasi diwajibkan menguasai seluruh cabang produksi strategis milik negara"
      },
      {
        "key": "E",
        "text": "Koperasi membebaskan anggotanya dari segala kewajiban membayar utang dagang"
      }
    ],
    "correct": "B",
    "explanation": "Sebagai soko guru, koperasi berakar pada budaya gotong royong dan bertujuan memajukan kesejahteraan anggota serta masyarakat, bukan menumpuk kekayaan segelintir pemodal."
  },
  {
    "id": 133,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Perbedaan karakteristik antara simpanan wajib dan simpanan sukarela dalam koperasi terletak pada...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan wajib hanya dibayar pengurus, simpanan sukarela diwajibkan bagi anggota baru"
      },
      {
        "key": "B",
        "text": "Simpanan wajib bernilai jutaan rupiah, simpanan sukarela dibayar dengan hasil panen gabah"
      },
      {
        "key": "C",
        "text": "Simpanan wajib disetor rutin dan tak bisa diambil sewaktu-waktu, sukarela fleksibel"
      },
      {
        "key": "D",
        "text": "Simpanan wajib mendapat bunga dari kas negara, simpanan sukarela dipotong pajak daerah"
      },
      {
        "key": "E",
        "text": "Simpanan wajib hangus saat keluar, simpanan sukarela dihibahkan ke kas desa setempat"
      }
    ],
    "correct": "C",
    "explanation": "Simpanan wajib dibayarkan rutin dalam jumlah tertentu dan tidak dapat ditarik selama masih anggota, sedangkan simpanan sukarela dapat disetor dan ditarik kapan saja."
  },
  {
    "id": 134,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Fungsi utama Rapat Anggota Tahunan dalam menjamin tata kelola koperasi yang transparan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menentukan tarif sewa traktor bagi petani yang bukan merupakan anggota koperasi"
      },
      {
        "key": "B",
        "text": "Mengubah status badan hukum koperasi menjadi perseroan perbankan terbuka"
      },
      {
        "key": "C",
        "text": "Menghapuskan seluruh pinjaman anggota yang mengalami kesulitan keuangan keluarga"
      },
      {
        "key": "D",
        "text": "Meminta pertanggungjawaban pengurus dan mengesahkan pembagian sisa hasil usaha"
      },
      {
        "key": "E",
        "text": "Memilih bupati dan kepala dinas koperasi kabupaten untuk masa jabatan baru"
      }
    ],
    "correct": "D",
    "explanation": "RAT adalah media pertanggungjawaban kinerja pengurus dan pengawas di hadapan anggota serta pengesahan laporan keuangan dan penetapan alokasi SHU."
  },
  {
    "id": 135,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Perbedaan tujuan utama antara BUMN Persero dan BUMN Perum adalah...",
    "options": [
      {
        "key": "A",
        "text": "Persero dikelola pihak asing, Perum dikelola langsung oleh aparatur sipil negara"
      },
      {
        "key": "B",
        "text": "Persero beroperasi di desa terpencil, Perum hanya beroperasi di ibu kota negara"
      },
      {
        "key": "C",
        "text": "Persero tidak membayar pajak usaha, Perum wajib menyetor seluruh laba ke daerah"
      },
      {
        "key": "D",
        "text": "Persero dipimpin dewan menteri, Perum dipimpin langsung oleh gubernur provinsi"
      },
      {
        "key": "E",
        "text": "Persero berorientasi mencari laba, Perum berorientasi kemanfaatan pelayanan umum"
      }
    ],
    "correct": "E",
    "explanation": "BUMN Persero bertujuan mengejar keuntungan komersial, sedangkan BUMN Perum mengutamakan pelayanan dan kemanfaatan umum bagi masyarakat luas."
  },
  {
    "id": 136,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Peran strategis Badan Usaha Milik Desa (BUMDes) di OKU Timur yang mengelola unit usaha Sektor Primer dan Sektor Tersier secara terpadu terlihat pada...",
    "options": [
      {
        "key": "A",
        "text": "BUMDes - Unit Budidaya Pertanian / Perikanan Desa dan BUMDes - Unit Pasar Desa & Jasa Keuangan Mikro"
      },
      {
        "key": "B",
        "text": "Pengambilalihan seluruh tanah persawahan produktif milik petani perorangan desa"
      },
      {
        "key": "C",
        "text": "Pemberlakuan pajak perdagangan baru bagi setiap warga yang berbelanja di warung"
      },
      {
        "key": "D",
        "text": "Penetapan larangan bagi pedagang keliling luar desa untuk masuk ke wilayah desa"
      },
      {
        "key": "E",
        "text": "Pembatasan penggunaan alat mesin pertanian modern bagi kelompok petani muda"
      }
    ],
    "correct": "A",
    "explanation": "BUMDes di desa-desa OKU Timur dapat mengembangkan unit budidaya (sektor primer) sekaligus unit pengelolaan pasar desa dan jasa keuangan mikro (sektor tersier)."
  },
  {
    "id": 137,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Kelemahan mendasar dari bentuk badan usaha perseorangan dalam menjalankan operasional bisnis adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pengambilan keputusan berlangsung sangat berbelit-belit dan memakan waktu lama"
      },
      {
        "key": "B",
        "text": "Tanggung jawab pemilik bersifat tidak terbatas hingga mengorbankan harta pribadi"
      },
      {
        "key": "C",
        "text": "Laba bersih wajib dibagi rata kepada seluruh tetangga di sekitar tempat usaha"
      },
      {
        "key": "D",
        "text": "Pemilik diwajibkan menerbitkan laporan keuangan berkala di media massa nasional"
      },
      {
        "key": "E",
        "text": "Pendirian usaha membutuhkan persetujuan resmi dari dewan perwakilan rakyat"
      }
    ],
    "correct": "B",
    "explanation": "Pada usaha perseorangan, pemisahan harta tidak ada sehingga jika terjadi utang usaha macet, harta kekayaan pribadi pemilik dapat disita untuk pelunasan."
  },
  {
    "id": 138,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Koperasi Simpan Pinjam (KSP) sebagai bagian dari Sektor Tersier di OKU Timur memberdayakan pelaku usaha mikro dengan cara...",
    "options": [
      {
        "key": "A",
        "text": "Mewajibkan petani menggadaikan sertifikat tanah sebelum membeli benih padi"
      },
      {
        "key": "B",
        "text": "Menentukan harga sewa lahan sawah bagi seluruh warga masyarakat desa tetangga"
      },
      {
        "key": "C",
        "text": "Menyediakan akses pembiayaan modal usaha dan likuiditas dengan bunga adil dan terjangkau"
      },
      {
        "key": "D",
        "text": "Menyita hasil panen gabah petani yang terlambat menyetor simpanan sukarela"
      },
      {
        "key": "E",
        "text": "Melarang petani menjual beras kemasan sendiri langsung ke pasar konsumen"
      }
    ],
    "correct": "C",
    "explanation": "KSP pada sektor tersier berperan vital memperkuat permodalan petani, peternak, dan pedagang pasar dengan bunga adil dan prosedur kekeluargaan."
  },
  {
    "id": 139,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Prinsip kemandirian dalam jati diri koperasi Indonesia mengandung pengertian bahwa koperasi...",
    "options": [
      {
        "key": "A",
        "text": "Menolak segala bentuk kerja sama kemitraan usaha dengan badan usaha swasta"
      },
      {
        "key": "B",
        "text": "Hanya melayani transaksi jual beli dengan anggota keluarga pengurus inti saja"
      },
      {
        "key": "C",
        "text": "Membebaskan pengurus dari keharusan menyampaikan laporan pertanggungjawaban"
      },
      {
        "key": "D",
        "text": "Mampu berdiri sendiri dalam pengambilan keputusan tanpa bergantung intervensi luar"
      },
      {
        "key": "E",
        "text": "Tidak memerlukan modal awal uang tunai dalam menjalankan kegiatan usahanya"
      }
    ],
    "correct": "D",
    "explanation": "Kemandirian berarti koperasi berpijak pada kekuatan swadaya anggota, berotonomi penuh, dan tidak tunduk pada tekanan pihak luar."
  },
  {
    "id": 140,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Koperasi Unit Desa (KUD) - Unit Budidaya Pertanian yang bermitra dengan Pabrik Penggilingan Padi (Rice Milling Unit / RMU) di Belitang menciptakan dampak positif berupa...",
    "options": [
      {
        "key": "A",
        "text": "Pedagang pasar tradisional dilarang menjual beras kualitas premium kemasan"
      },
      {
        "key": "B",
        "text": "Seluruh buruh panen digantikan secara serentak oleh robot kecerdasan buatan"
      },
      {
        "key": "C",
        "text": "Harga beras di tingkat warung eceran mengalami lonjakan hingga tiga kali lipat"
      },
      {
        "key": "D",
        "text": "Petani tidak lagi diperbolehkan menanam komoditas hortikultura di pekarangan"
      },
      {
        "key": "E",
        "text": "Petani memiliki kepastian pasar penjualan gabah dengan standar timbangan adil dan harga stabil"
      }
    ],
    "correct": "E",
    "explanation": "Kemitraan KUD budidaya (sektor primer) dan pabrik penggilingan padi RMU (sektor sekunder) menjamin kepastian pasar dan harga stabil bagi petani."
  },
  {
    "id": 141,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Koperasi Makmur memperoleh SHU tahun ini sebesar Rp40.000.000. Sesuai AD/ART, alokasi jasa modal ditetapkan 20%. Besarnya dana SHU untuk jasa modal anggota adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp8.000.000 dana jasa modal"
      },
      {
        "key": "B",
        "text": "Rp4.000.000 dana jasa modal"
      },
      {
        "key": "C",
        "text": "Rp12.000.000 dana jasa modal"
      },
      {
        "key": "D",
        "text": "Rp16.000.000 dana jasa modal"
      },
      {
        "key": "E",
        "text": "Rp20.000.000 dana jasa modal"
      }
    ],
    "correct": "A",
    "explanation": "SHU Jasa Modal = 20% x Total SHU = 20% x Rp40.000.000 = Rp8.000.000."
  },
  {
    "id": 142,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Pak Joko memiliki simpanan di koperasi sebesar Rp2.000.000 dari total simpanan seluruh anggota Rp40.000.000. Jika alokasi SHU jasa modal adalah Rp8.000.000, bagian SHU yang diterima Pak Joko adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp200.000 bagian SHU"
      },
      {
        "key": "B",
        "text": "Rp400.000 bagian SHU"
      },
      {
        "key": "C",
        "text": "Rp600.000 bagian SHU"
      },
      {
        "key": "D",
        "text": "Rp800.000 bagian SHU"
      },
      {
        "key": "E",
        "text": "Rp1.000.000 bagian SHU"
      }
    ],
    "correct": "B",
    "explanation": "Bagian SHU Pak Joko = (Simpanan Pribadi / Total Simpanan) x Alokasi Jasa Modal = (Rp2.000.000 / Rp40.000.000) x Rp8.000.000 = 5% x Rp8.000.000 = Rp400.000."
  },
  {
    "id": 143,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Syarat minimal jumlah orang yang diperlukan untuk mendirikan Koperasi Primer berdasarkan regulasi perkoperasian yang berlaku di Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "3 orang warga ber-KTP"
      },
      {
        "key": "B",
        "text": "20 orang anggota awal"
      },
      {
        "key": "C",
        "text": "9 orang pendiri resmi"
      },
      {
        "key": "D",
        "text": "50 orang perwakilan desa"
      },
      {
        "key": "E",
        "text": "100 orang nasabah simpanan"
      }
    ],
    "correct": "C",
    "explanation": "Berdasarkan regulasi terkini (UU Cipta Kerja klaster perkoperasian), pendirian koperasi primer kini mensyaratkan minimal 9 (sembilan) orang."
  },
  {
    "id": 144,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Koperasi Tani menetapkan simpanan pokok Rp200.000 sekali bayar dan simpanan wajib Rp50.000 per bulan. Total simpanan Pak Dedi yang telah menjadi anggota selama 12 bulan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp600.000 total simpanan"
      },
      {
        "key": "B",
        "text": "Rp1.000.000 total simpanan"
      },
      {
        "key": "C",
        "text": "Rp1.200.000 total simpanan"
      },
      {
        "key": "D",
        "text": "Rp800.000 total simpanan"
      },
      {
        "key": "E",
        "text": "Rp1.400.000 total simpanan"
      }
    ],
    "correct": "D",
    "explanation": "Total simpanan = Simpanan Pokok + (12 x Simpanan Wajib) = Rp200.000 + (12 x Rp50.000) = Rp200.000 + Rp600.000 = Rp800.000."
  },
  {
    "id": 145,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Total penjualan toko koperasi kepada seluruh anggota mencapai Rp100.000.000. Jika Ibu Rini berbelanja sebesar Rp5.000.000 dan alokasi SHU jasa anggota adalah Rp10.000.000, hak SHU belanja Ibu Rini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp250.000 hak belanja"
      },
      {
        "key": "B",
        "text": "Rp750.000 hak belanja"
      },
      {
        "key": "C",
        "text": "Rp1.000.000 hak belanja"
      },
      {
        "key": "D",
        "text": "Rp1.250.000 hak belanja"
      },
      {
        "key": "E",
        "text": "Rp500.000 hak belanja"
      }
    ],
    "correct": "E",
    "explanation": "SHU Jasa Anggota Ibu Rini = (Belanja Pribadi / Total Belanja Anggota) x Alokasi Jasa Anggota = (Rp5.000.000 / Rp100.000.000) x Rp10.000.000 = 5% x Rp10.000.000 = Rp500.000."
  },
  {
    "id": 146,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Tiga pemuda di Belitang sepakat mendirikan usaha penggilingan kopi. Mereka ingin membagi peran antara pengelola aktif harian dan penanam modal pasif. Bentuk badan usaha yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Persekutuan Komanditer CV"
      },
      {
        "key": "B",
        "text": "Perusahaan Umum Negara"
      },
      {
        "key": "C",
        "text": "Yayasan Dana Pensiun"
      },
      {
        "key": "D",
        "text": "Badan Usaha Milik Daerah"
      },
      {
        "key": "E",
        "text": "Perusahaan Jawatan Daerah"
      }
    ],
    "correct": "A",
    "explanation": "CV (Persekutuan Komanditer) sangat tepat karena mengakomodasi sekutu aktif (pengelola operasional) dan sekutu pasif (pemodal tidur)."
  },
  {
    "id": 147,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Pengurus koperasi mendapati seorang anggota terlambat membayar angsuran pinjaman modal tanam. Tindakan penanganan awal yang mencerminkan asas kekeluargaan koperasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyita langsung peralatan dapur rumah tangga anggota secara paksa"
      },
      {
        "key": "B",
        "text": "Melakukan musyawarah dan restrukturisasi penjadwalan masa angsuran panen"
      },
      {
        "key": "C",
        "text": "Mengumumkan identitas anggota di papan pengumuman balai desa setempat"
      },
      {
        "key": "D",
        "text": "Menjual sertifikat keanggotaan koperasi kepada pelepas uang keliling"
      },
      {
        "key": "E",
        "text": "Menuntut anggota ke pengadilan niaga tanpa proses mediasi internal"
      }
    ],
    "correct": "B",
    "explanation": "Asas kekeluargaan koperasi mengutamakan pendekatan persuasif, musyawarah kekeluargaan, dan restrukturisasi angsuran menyesuaikan siklus panen petani."
  },
  {
    "id": 148,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "BUMDes Sumber Rejeki mengelola unit usaha air bersih dengan pendapatan kotor Rp30.000.000 dan biaya operasional Rp18.000.000. Sisa laba bersih yang disetor ke kas Pendapatan Asli Desa adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp8.000.000 laba disetor"
      },
      {
        "key": "B",
        "text": "Rp15.000.000 laba disetor"
      },
      {
        "key": "C",
        "text": "Rp12.000.000 laba disetor"
      },
      {
        "key": "D",
        "text": "Rp18.000.000 laba disetor"
      },
      {
        "key": "E",
        "text": "Rp30.000.000 laba disetor"
      }
    ],
    "correct": "C",
    "explanation": "Laba bersih operasional BUMDes = Pendapatan Kotor - Biaya Operasional = Rp30.000.000 - Rp18.000.000 = Rp12.000.000."
  },
  {
    "id": 149,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Koperasi Konsumsi SMAN 1 Belitang memiliki 40 anggota guru dan staf. Dalam rapat pengambilan keputusan penetapan jenis seragam baru, mekanisme voting yang sah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kepala sekolah memiliki 20 suara, guru senior 5 suara, staf lainnya 1 suara"
      },
      {
        "key": "B",
        "text": "Jumlah suara dihitung berdasarkan besaran simpanan sukarela masing-masing"
      },
      {
        "key": "C",
        "text": "Pengurus inti menentukan keputusan tanpa perlu melibatkan kehadiran anggota"
      },
      {
        "key": "D",
        "text": "Setiap anggota memiliki satu hak suara yang setara tanpa memandang jabatan"
      },
      {
        "key": "E",
        "text": "Voting hanya boleh diikuti oleh anggota yang berstatus pegawai negeri sipil"
      }
    ],
    "correct": "D",
    "explanation": "Prinsip demokrasi koperasi menegaskan bahwa setiap anggota memiliki satu hak suara yang setara (one man one vote) dalam rapat anggota."
  },
  {
    "id": 150,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Koperasi membeli pupuk bersubsidi langsung dari pabrik seharga Rp120.000 per karung dan menjual ke anggota Rp125.000 per karung. Jika sebulan terjual 400 karung, surplus margin koperasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp1.000.000 surplus margin"
      },
      {
        "key": "B",
        "text": "Rp3.000.000 surplus margin"
      },
      {
        "key": "C",
        "text": "Rp4.000.000 surplus margin"
      },
      {
        "key": "D",
        "text": "Rp5.000.000 surplus margin"
      },
      {
        "key": "E",
        "text": "Rp2.000.000 surplus margin"
      }
    ],
    "correct": "E",
    "explanation": "Margin per karung = Rp125.000 - Rp120.000 = Rp5.000. Total margin = Rp5.000 x 400 karung = Rp2.000.000."
  },
  {
    "id": 151,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Mendiagnosis faktor internal utama yang menyebabkan kebangkrutan banyak Koperasi Simpan Pinjam di pedesaan menunjukkan kelemahan pada...",
    "options": [
      {
        "key": "A",
        "text": "Manajemen kredit yang lemah, intervensi pengurus, dan tingginya kredit macet"
      },
      {
        "key": "B",
        "text": "Kelebihan jumlah simpanan sukarela dari anggota pedagang pasar"
      },
      {
        "key": "C",
        "text": "Ketatnya pengawasan pembukuan keuangan oleh dewan pengawas terpilih"
      },
      {
        "key": "D",
        "text": "Pemberian pinjaman berbunga sangat rendah kepada kelompok petani sayur"
      },
      {
        "key": "E",
        "text": "Kewajiban menyampaikan laporan pertanggungjawaban tahunan kepada dinas"
      }
    ],
    "correct": "A",
    "explanation": "Penyebab keruntuhan koperasi umumnya adalah analisis kredit yang longgar (nepotisme pengurus), lemahnya mitigasi risiko, dan penumpukan kredit macet (non-performing loans)."
  },
  {
    "id": 152,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Analisis dampak tata kelola pengurus koperasi yang tertutup dan menolak menggelar Rapat Anggota Tahunan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tingkat partisipasi dan loyalitas anggota meningkat pesat dalam bertransaksi"
      },
      {
        "key": "B",
        "text": "Hilangnya kepercayaan anggota dan risiko penyelewengan dana kas simpanan"
      },
      {
        "key": "C",
        "text": "Koperasi otomatis mendapatkan kenaikan predikat akreditasi dari kementerian"
      },
      {
        "key": "D",
        "text": "Sisa hasil usaha yang dibagikan kepada anggota meningkat berlipat ganda"
      },
      {
        "key": "E",
        "text": "Bank umum berlomba-lomba menyuntikkan dana hibah tanpa jaminan agunan"
      }
    ],
    "correct": "B",
    "explanation": "Tanpa RAT, transparansi hilang, memicu ketidakpercayaan anggota (rush), penurunan partisipasi transaksi, dan peluang kecurangan (fraud) pengurus."
  },
  {
    "id": 153,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Mengevaluasi efektivitas BUMDes dalam menggerakkan perekonomian desa menunjukkan bahwa unit usaha yang paling berdaya tahan adalah unit yang...",
    "options": [
      {
        "key": "A",
        "text": "Bersaing langsung mematikan warung kelontong milik warga kecil desa"
      },
      {
        "key": "B",
        "text": "Mengalokasikan seluruh modal desa untuk kegiatan seremonial studi banding"
      },
      {
        "key": "C",
        "text": "Mengembangkan potensi sumber daya unik desa dan menyelesaikan problem warga"
      },
      {
        "key": "D",
        "text": "Menolak inovasi teknologi pembayaran digital dalam pelayanan transaksi"
      },
      {
        "key": "E",
        "text": "Mempekerjakan tenaga kerja ahli dari luar negeri dengan gaji sangat tinggi"
      }
    ],
    "correct": "C",
    "explanation": "BUMDes sukses berfokus pada potensi unik desa (seperti pengolahan gabah, air bersih desa, pengelolaan wisata desa) yang memberi solusi nyata bagi warga."
  },
  {
    "id": 154,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Perbandingan skema permodalan Koperasi dan Korporasi Perseroan Terbatas dalam merespons kebutuhan ekspansi kilang padi besar adalah...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi memperoleh pinjaman tanpa bunga, korporasi dilarang meminjam modal bank"
      },
      {
        "key": "B",
        "text": "Koperasi diwajibkan membeli saham korporasi sebelum melakukan ekspansi mesin"
      },
      {
        "key": "C",
        "text": "Korporasi hanya mengandalkan dana kas sumbangan dari yayasan nirlaba sosial"
      },
      {
        "key": "D",
        "text": "Koperasi terbatas pada simpanan anggota, korporasi dapat menerbitkan saham publik"
      },
      {
        "key": "E",
        "text": "Kedua badan usaha memiliki akses pembiayaan modal yang identik tanpa perbedaan"
      }
    ],
    "correct": "D",
    "explanation": "Koperasi mengandalkan modal sendiri anggota yang relatif terbatas, sedangkan PT dapat menghimpun modal raksasa melalui bursa efek (IPO) atau obligasi korporasi."
  },
  {
    "id": 155,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Menelaah keengganan generasi muda milenial dan Gen-Z pedesaan bergabung dalam keanggotaan KUD menunjukkan faktor penyebab...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi memberikan sisa hasil usaha yang terlalu besar setiap akhir tahun"
      },
      {
        "key": "B",
        "text": "Generasi muda diwajibkan menyerahkan seluruh hasil gajinya ke kas koperasi"
      },
      {
        "key": "C",
        "text": "Kantor koperasi dibangun terlalu megah sehingga membuat warga sungkan masuk"
      },
      {
        "key": "D",
        "text": "Kementerian koperasi melarang warga berusia di bawah tiga puluh tahun bergabung"
      },
      {
        "key": "E",
        "text": "Koperasi dipandang kuno, birokrasi kaku, dan belum memanfaatkan platform digital"
      }
    ],
    "correct": "E",
    "explanation": "Citra konvensional, minimnya digitalisasi layanan, dan tata kelola yang belum modern menjadi penyebab utama rendahnya minat generasi muda terhadap koperasi."
  },
  {
    "id": 156,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Analisis dampak intervensi politik birokrasi daerah yang berlebihan terhadap pemilihan pengurus koperasi tani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rusaknya asas kemandirian dan terancamnya aset koperasi untuk kepentingan politik"
      },
      {
        "key": "B",
        "text": "Meningkatnya profesionalisme dan kemandirian pengambilan keputusan koperasi"
      },
      {
        "key": "C",
        "text": "Koperasi otomatis terbebas dari pemeriksaan dinas perdagangan dan industri"
      },
      {
        "key": "D",
        "text": "Terciptanya efisiensi biaya operasional penggilingan padi di sentra pertanian"
      },
      {
        "key": "E",
        "text": "Menurunnya suku bunga simpanan pinjaman anggota menjadi nol persen setahun"
      }
    ],
    "correct": "A",
    "explanation": "Intervensi politik melanggar prinsip otonomi dan kemandirian koperasi, membuat pengurus tidak profesional dan rawan penyalahgunaan aset demi agenda kekuasaan."
  },
  {
    "id": 157,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Mengevaluasi peran koperasi pertanian dalam meningkatkan posisi tawar harga gabah petani di depan para tengkulak swasta menunjukkan keberhasilan jika...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi menghentikan seluruh aktivitas panen padi di wilayah desa setempat"
      },
      {
        "key": "B",
        "text": "Koperasi mampu membeli gabah anggota sesuai standar HPP dan mengolahnya mandiri"
      },
      {
        "key": "C",
        "text": "Petani dipaksa menjual seluruh gabahnya di bawah biaya operasional tanam"
      },
      {
        "key": "D",
        "text": "Pengurus koperasi mengambil margin keuntungan lima puluh persen per kilogram"
      },
      {
        "key": "E",
        "text": "Seluruh beras hasil gilingan disimpan di gudang hingga membusuk berjamur"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi yang kuat bertindak sebagai off-taker penjamin pembelian gabah sesuai Harga Pembelian Pemerintah (HPP), membebaskan petani dari jeratan harga murah tengkulak."
  },
  {
    "id": 158,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Kritisi terhadap praktik rentenir berkedok koperasi yang beroperasi di pasar tradisional kecamatan di OKU Timur menunjukkan ciri penyimpangan berupa...",
    "options": [
      {
        "key": "A",
        "text": "Pemberian pinjaman hanya kepada anggota sah yang terdaftar dalam buku induk"
      },
      {
        "key": "B",
        "text": "Pelaksanaan Rapat Anggota Tahunan secara tertib dan transparan setiap awal tahun"
      },
      {
        "key": "C",
        "text": "Bunga pinjaman sangat mencekik, tanpa rapat anggota, dan nasabah tidak memiliki suara"
      },
      {
        "key": "D",
        "text": "Pembagian sisa hasil usaha secara adil berdasarkan porsi jasa transaksi belanja"
      },
      {
        "key": "E",
        "text": "Penetapan simpanan pokok dan simpanan wajib sesuai hasil musyawarah bersama"
      }
    ],
    "correct": "C",
    "explanation": "Koperasi bodong/kedok rentenir menyalurkan dana ke non-anggota dengan bunga mencekik, memungut biaya potong di depan, dan menafikan musyawarah RAT."
  },
  {
    "id": 159,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Penerapan transformasi digital pada Koperasi Pegawai Republik Indonesia melalui aplikasi mobile banking koperasi berdampak pada...",
    "options": [
      {
        "key": "A",
        "text": "Menurunnya jumlah simpanan sukarela yang masuk ke rekening kas perbankan"
      },
      {
        "key": "B",
        "text": "Terhapusnya kewajiban membayar kembali sisa pokok pinjaman lunak anggota"
      },
      {
        "key": "C",
        "text": "Kewajiban seluruh anggota membeli telepon seluler baru berharga puluhan juta"
      },
      {
        "key": "D",
        "text": "Meningkatnya efisiensi layanan simpan pinjam dan transparansi saldo anggota"
      },
      {
        "key": "E",
        "text": "Penutupan seluruh operasional toko serba ada milik unit usaha koperasi"
      }
    ],
    "correct": "D",
    "explanation": "Digitalisasi koperasi mempermudah pengecekan saldo, pengajuan pinjaman, pembayaran tagihan, dan meningkatkan akuntabilitas laporan secara real-time."
  },
  {
    "id": 160,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "D. Badan Usaha dan Koperasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Merumuskan strategi penguatan permodalan KUD di Belitang agar mampu bersaing dengan korporasi penggilingan padi swasta memerlukan langkah...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan modal penyertaan pihak ketiga dan menolak kerja sama perbankan"
      },
      {
        "key": "B",
        "text": "Membebankan iuran tambahan harian yang memberatkan anggota keluarga petani"
      },
      {
        "key": "C",
        "text": "Menjual seluruh gedung kantor dan gudang lumbung padi milik badan usaha"
      },
      {
        "key": "D",
        "text": "Memaksa pemerintah daerah menanggung seluruh utang operasional pengurus"
      },
      {
        "key": "E",
        "text": "Memperkuat simpanan anggota, kemitraan lembaga pembiayaan, dan hilirisasi produk"
      }
    ],
    "correct": "E",
    "explanation": "Penguatan koperasi ditempuh lewat penumbuhan simpanan anggota, sinergi dengan LPDB/perbankan, dan investasi pada pengolahan hilir beras kemasan bermerek."
  },
  {
    "id": 161,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Kedudukan Kabupaten OKU Timur dalam peta ketahanan pangan Provinsi Sumatera Selatan diakui secara nasional sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Kawasan lumbung padi dan pangan utama"
      },
      {
        "key": "B",
        "text": "Sentra pertambangan batu bara utama"
      },
      {
        "key": "C",
        "text": "Pusat industri perakitan otomotif berat"
      },
      {
        "key": "D",
        "text": "Pelabuhan perdagangan ekspor peti kemas"
      },
      {
        "key": "E",
        "text": "Kawasan pariwisata bahari kepulauan"
      }
    ],
    "correct": "A",
    "explanation": "OKU Timur adalah lumbung pangan dan produsen beras terbesar di Sumatera Selatan dengan hamparan sawah irigasi teknis terluas."
  },
  {
    "id": 162,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Infrastruktur pengairan utama yang membendung Sungai Komering untuk mengairi puluhan ribu hektare sawah di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bendungan Karangkates Malang"
      },
      {
        "key": "B",
        "text": "Bendung Perjaya Martapura"
      },
      {
        "key": "C",
        "text": "Waduk Gajah Mungkur Wonogiri"
      },
      {
        "key": "D",
        "text": "Pintu Air Manggarai Jakarta"
      },
      {
        "key": "E",
        "text": "Bendungan Jatiluhur Purwakarta"
      }
    ],
    "correct": "B",
    "explanation": "Bendung Perjaya di Martapura adalah hulu utama jaringan irigasi Komering yang mendistribusikan air ke saluran induk dan sekunder di Belitang dan sekitarnya."
  },
  {
    "id": 163,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Pusat perdagangan grosir dan sirkulasi perputaran uang terbesar di kawasan Belitang Kabupaten OKU Timur berada di...",
    "options": [
      {
        "key": "A",
        "text": "Pasar Cinde Palembang"
      },
      {
        "key": "B",
        "text": "Pasar Bawah Lahat"
      },
      {
        "key": "C",
        "text": "Pasar Gumawang Belitang"
      },
      {
        "key": "D",
        "text": "Pasar Atas Muara Enim"
      },
      {
        "key": "E",
        "text": "Pasar Megang Lubuklinggau"
      }
    ],
    "correct": "C",
    "explanation": "Pasar Gumawang di Belitang adalah pusat perniagaan, grosir sembako, dan pertokoan tersibuk dengan perputaran ekonomi tinggi di OKU Timur."
  },
  {
    "id": 164,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Dua komoditas perkebunan rakyat yang paling banyak diusahakan oleh masyarakat Kabupaten OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Teh hitam dan tembakau cerutu"
      },
      {
        "key": "B",
        "text": "Cengkih kering dan pala wangi"
      },
      {
        "key": "C",
        "text": "Tebu kristal dan kopi arabika"
      },
      {
        "key": "D",
        "text": "Karet alam dan kelapa sawit"
      },
      {
        "key": "E",
        "text": "Kakao fermentasi dan kapas tenun"
      }
    ],
    "correct": "D",
    "explanation": "Karet alam dan kelapa sawit adalah dua komoditas perkebunan primadona yang menopang penghasilan masyarakat perkebunan di OKU Timur."
  },
  {
    "id": 165,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Komoditas perikanan budidaya air tawar unggulan yang memasok kebutuhan pasar lokal dan kota tetangga dari OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ikan tuna laut dalam"
      },
      {
        "key": "B",
        "text": "Udang lobster air asin"
      },
      {
        "key": "C",
        "text": "Kepiting bakau muara"
      },
      {
        "key": "D",
        "text": "Cumi cumi perairan karang"
      },
      {
        "key": "E",
        "text": "Ikan patin dan lele sangkuriang"
      }
    ],
    "correct": "E",
    "explanation": "OKU Timur terkenal sebagai sentra budidaya perikanan air tawar, khususnya ikan patin dan lele yang dibudidayakan di kolam-kolam tanah/irigasi."
  },
  {
    "id": 166,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Tingkat intensitas penanaman padi dalam satu tahun pada sebidang sawah irigasi teknis di Belitang dikenal dengan istilah...",
    "options": [
      {
        "key": "A",
        "text": "Indeks Pertanaman satu tahun"
      },
      {
        "key": "B",
        "text": "Indeks Pembangunan Manusia"
      },
      {
        "key": "C",
        "text": "Indeks Harga Perdagangan Besar"
      },
      {
        "key": "D",
        "text": "Indeks Gini pemerataan lahan"
      },
      {
        "key": "E",
        "text": "Indeks Kualitas Air irigasi"
      }
    ],
    "correct": "A",
    "explanation": "Indeks Pertanaman (IP) menggambarkan frekuensi penanaman padi dalam setahun, di mana sawah irigasi Belitang rata-rata mencapai IP 200 hingga IP 300."
  },
  {
    "id": 167,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Sistem penomoran pintu bagi air di sepanjang saluran irigasi sekunder Komering Belitang dikenal warga dengan sebutan...",
    "options": [
      {
        "key": "A",
        "text": "Titik Pos Pantau Jembatan"
      },
      {
        "key": "B",
        "text": "Titik Bangunan Komering BK"
      },
      {
        "key": "C",
        "text": "Titik Kilometer Jalan Lintas"
      },
      {
        "key": "D",
        "text": "Titik Pal Batas Kecamatan"
      },
      {
        "key": "E",
        "text": "Titik Koordinat Satelit Desa"
      }
    ],
    "correct": "B",
    "explanation": "Bangunan Komering (BK) adalah sistem penomoran pintu air dan saluran sekunder irigasi (seperti BK 0, BK 1, BK 10, BK 16) yang menjadi patokan wilayah di Belitang."
  },
  {
    "id": 168,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Jenis usaha peternakan rakyat di Sektor Primer yang banyak diusahakan masyarakat pedesaan OKU Timur sebagai aset produktif dan pupuk hayati adalah...",
    "options": [
      {
        "key": "A",
        "text": "Peternakan unta padang pasir dan keledai impor"
      },
      {
        "key": "B",
        "text": "Penangkaran buaya muara dan ular sanca"
      },
      {
        "key": "C",
        "text": "Peternakan Sapi Mandiri dan Peternakan Kambing"
      },
      {
        "key": "D",
        "text": "Peternakan kuda pacuan impor Eropa"
      },
      {
        "key": "E",
        "text": "Peternakan rusa kutub salju"
      }
    ],
    "correct": "C",
    "explanation": "Peternakan Sapi Mandiri dan Peternakan Kambing merupakan komoditas peternakan rakyat utama di OKU Timur yang bernilai ekonomi tinggi."
  },
  {
    "id": 169,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Pabrik pengolahan gabah menjadi beras putih kemasan di Sektor Sekunder yang dilengkapi mesin pembersih, pengering (dryer), dan pemoles di OKU Timur dikenal sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Sentra Bengkel Mesin Traktor"
      },
      {
        "key": "B",
        "text": "Lumbung Pangan Tradisional"
      },
      {
        "key": "C",
        "text": "Unit Pengolahan Karet Alam"
      },
      {
        "key": "D",
        "text": "Pabrik Penggilingan Padi (Rice Milling Unit / RMU)"
      },
      {
        "key": "E",
        "text": "Balai Karantina Pertanian"
      }
    ],
    "correct": "D",
    "explanation": "Pabrik Penggilingan Padi (RMU) adalah pilar industri sekunder di OKU Timur yang mengolah gabah hasil panen menjadi beras siap konsumsi."
  },
  {
    "id": 170,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Usaha pengolahan pangan Sektor Sekunder skala mikro di OKU Timur yang memanfaatkan hasil perikanan dan pertanian lokal meliputi...",
    "options": [
      {
        "key": "A",
        "text": "Dodol apel dan sari apel Malang"
      },
      {
        "key": "B",
        "text": "Gudeg nangka dan bakpia kacang Jogja"
      },
      {
        "key": "C",
        "text": "Bika ambon dan bolu meranti Medan"
      },
      {
        "key": "D",
        "text": "Asinan sayur dan manisan pala Bogor"
      },
      {
        "key": "E",
        "text": "Industri Rumah Tangga Pangan (Kerupuk Ikan / Keripik) dan UMKM Industri Pengolahan Tahu & Tempe"
      }
    ],
    "correct": "E",
    "explanation": "Industri Rumah Tangga Pangan (Kerupuk Ikan/Keripik) dan UMKM Tahu-Tempe mengolah bahan mentah perikanan/kedelai menjadi produk bernilai tambah di OKU Timur."
  },
  {
    "id": 171,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Keterkaitan langsung antara jaringan irigasi teknis Bendung Perjaya dengan tingginya produktivitas padi sawah di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memungkinkan petani menanam padi 2 hingga 3 kali setahun tanpa bergantung hujan"
      },
      {
        "key": "B",
        "text": "Menghapuskan kebutuhan pemupukan dan penyiangan gulma di petak sawah petani"
      },
      {
        "key": "C",
        "text": "Menjamin harga beras di pasaran tidak akan pernah mengalami penurunan harga"
      },
      {
        "key": "D",
        "text": "Mengharuskan seluruh petani beralih menanam komoditas kelapa sawit hibrida"
      },
      {
        "key": "E",
        "text": "Menggantikan seluruh tenaga kerja manusia dengan sistem pompa air otomatis"
      }
    ],
    "correct": "A",
    "explanation": "Jaringan irigasi teknis menjamin kepastian ketersediaan air sepanjang tahun, memungkinkan petani menanam padi secara terjadwal (IP 200 hingga IP 300)."
  },
  {
    "id": 172,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Penerapan sistem integrasi sapi dan kelapa sawit (SISKA) di perkebunan OKU Timur memberikan manfaat simbiosis berupa...",
    "options": [
      {
        "key": "A",
        "text": "Daun kelapa sawit menjadi makanan pokok manusia dan kotoran sapi dibuang ke sungai"
      },
      {
        "key": "B",
        "text": "Limbah pelepah dan bungkil sawit jadi pakan sapi, kotoran ternak jadi pupuk organik"
      },
      {
        "key": "C",
        "text": "Pohon kelapa sawit tumbuh lebih cepat saat digembalakan hewan buas hutan lindung"
      },
      {
        "key": "D",
        "text": "Petani tidak lagi memerlukan tenaga pemanen tandan buah segar di perkebunan"
      },
      {
        "key": "E",
        "text": "Harga jual minyak kelapa sawit mentah menjadi naik berlipat ganda di pasar ekspor"
      }
    ],
    "correct": "B",
    "explanation": "Sistem integrasi sapi-sawit (SISKA) memanfaatkan gulma dan bungkil sawit untuk pakan sapi, sementara kotoran sapi diolah menjadi pupuk organik kebun."
  },
  {
    "id": 173,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Peran kelompok Unit Pengolahan dan Pemasaran Bokar (UPPB) bagi petani karet di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mewajibkan petani mencampur tatal getah karet dengan tanah agar timbangan berat"
      },
      {
        "key": "B",
        "text": "Menyita seluruh kebun karet milik petani yang menolak menjual ke tengkulak"
      },
      {
        "key": "C",
        "text": "Meningkatkan kebersihan getah karet dan menjual lelang bersama dengan harga lebih adil"
      },
      {
        "key": "D",
        "text": "Mengharuskan petani menebang pohon karet untuk diganti dengan tanaman singkong"
      },
      {
        "key": "E",
        "text": "Menetapkan potongan kadar air karet setinggi-tingginya demi keuntungan pengurus"
      }
    ],
    "correct": "C",
    "explanation": "UPPB menjaga mutu bahan olah karet (bokar) bersih tanpa tatal dan menyelenggarakan lelang bersama untuk memotong rantai tengkulak."
  },
  {
    "id": 174,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Mengapa budidaya ikan patin kolam air tenang di Belitang memiliki prospek ekonomi yang stabil...",
    "options": [
      {
        "key": "A",
        "text": "Karena ikan patin tidak memerlukan pakan pelet dan dapat dipanen dalam sehari"
      },
      {
        "key": "B",
        "text": "Karena pemerintah menjamin pembelian seluruh hasil panen dengan harga tetap"
      },
      {
        "key": "C",
        "text": "Karena ikan patin kebal terhadap segala jenis penyakit jamur dan parasit air"
      },
      {
        "key": "D",
        "text": "Karena permintaan pasar lokal dan luar kota tinggi serta didukung pasokan air irigasi"
      },
      {
        "key": "E",
        "text": "Karena budidaya patin dibebaskan dari keharusan merawat kebersihan kolam"
      }
    ],
    "correct": "D",
    "explanation": "Ketersediaan air saluran irigasi yang melimpah dan tingginya permintaan pasar (kuliner pindang, industri fillet) menjadikan patin komoditas unggulan stabil."
  },
  {
    "id": 175,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Fungsi keberadaan mesin pengering gabah (dryer) pada kilang padi modern saat musim penghujan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menggantikan seluruh proses pemutihan beras pecah kulit di dalam pabrik"
      },
      {
        "key": "B",
        "text": "Menurunkan berat timbangan gabah petani secara curang demi laba kilang"
      },
      {
        "key": "C",
        "text": "Mengubah butiran gabah biasa menjadi benih padi unggul bersertifikat"
      },
      {
        "key": "D",
        "text": "Mempercepat proses pengemasan beras ke dalam karung berlogo resmi"
      },
      {
        "key": "E",
        "text": "Mencegah gabah basah berkecambah dan menjaga kualitas mutu beras tetap prima"
      }
    ],
    "correct": "E",
    "explanation": "Saat musim hujan tanpa panas matahari, mesin dryer mengeringkan gabah basah secara cepat dan higienis, mencegah kerusakan butir dan jamur."
  },
  {
    "id": 176,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Layanan Keuangan Tanpa Kantor (Agen BRILink / Mandiri / BNI) di pelosok desa OKU Timur tergolong ke dalam Sektor Tersier karena berperan dalam...",
    "options": [
      {
        "key": "A",
        "text": "Mendekatkan layanan setor, tarik tunai, dan transfer perbankan tanpa harus pergi ke kantor bank kota"
      },
      {
        "key": "B",
        "text": "Memaksa warga meminjam dana dengan bunga harian untuk keperluan belanja"
      },
      {
        "key": "C",
        "text": "Menutup seluruh operasional kantor cabang bank umum di wilayah kecamatan"
      },
      {
        "key": "D",
        "text": "Membatasi transaksi keuangan hanya untuk nasabah yang memiliki kendaraan mobil"
      },
      {
        "key": "E",
        "text": "Menghapuskan kewajiban membawa kartu tanda penduduk dalam pembukaan rekening"
      }
    ],
    "correct": "A",
    "explanation": "Agen BRILink/Mandiri/BNI adalah agen Laku Pandai pada sektor tersier yang menyediakan akses layanan perbankan formal langsung di desa-desa OKU Timur."
  },
  {
    "id": 177,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Pedagang Pasar Tradisional / Toko Kelontong Grosir di sentra pasar Gumawang OKU Timur tergolong Sektor Tersier yang berperan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Tempat penyimpanan seluruh cadangan beras nasional milik perum bulog"
      },
      {
        "key": "B",
        "text": "Titik temu distribusi barang antara produsen hasil bumi, distributor grosir, dan konsumen akhir"
      },
      {
        "key": "C",
        "text": "Kawasan industri manufaktur perakitan mesin mobil dan kapal laut"
      },
      {
        "key": "D",
        "text": "Lokasi penukaran mata uang asing resmi bagi wisatawan mancanegara"
      },
      {
        "key": "E",
        "text": "Pusat pelelangan kayu hutan lindung dari pegunungan bukit barisan"
      }
    ],
    "correct": "B",
    "explanation": "Pedagang pasar tradisional dan toko grosir di Gumawang menjalankan fungsi distribusi dan perdagangan (sektor tersier) terbesar di OKU Timur."
  },
  {
    "id": 178,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Fungsi perkumpulan petani pemakai air (P3A) dalam pengelolaan pintu air di tingkat tersier sawah Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjual air irigasi secara lelang kepada penawar tertinggi di desa"
      },
      {
        "key": "B",
        "text": "Membendung saluran induk agar air hanya mengalir ke sawah milik pengurus"
      },
      {
        "key": "C",
        "text": "Mengatur jadwal gilir air secara adil dan merawat saluran tersier bersama"
      },
      {
        "key": "D",
        "text": "Menetapkan denda bagi petani yang menanam varietas padi lokal daerah"
      },
      {
        "key": "E",
        "text": "Mengganti fungsi dinas pekerjaan umum dalam pembangunan bendung sungai"
      }
    ],
    "correct": "C",
    "explanation": "P3A mengorganisasi jadwal pembagian air irigasi yang adil di tingkat petak sawah dan memelihara kebersihan saluran tersier dari endapan lumpur."
  },
  {
    "id": 179,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Dampak positif ketersediaan jalur kereta api stasiun Martapura bagi perekonomian Kabupaten OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan seluruh moda angkutan barang truk di jalan raya lintas tengah"
      },
      {
        "key": "B",
        "text": "Membatasi arus masuk komoditas sayur dan buah dari daerah luar provinsi"
      },
      {
        "key": "C",
        "text": "Mengharuskan seluruh petani mengirim gabah panen menggunakan gerbong kereta"
      },
      {
        "key": "D",
        "text": "Mendukung kelancaran mobilitas warga dan logistik antarkota di Sumatera Selatan"
      },
      {
        "key": "E",
        "text": "Menutup seluruh akses jalan pedesaan yang melintasi jalur rel kereta api"
      }
    ],
    "correct": "D",
    "explanation": "Stasiun kereta api Martapura menjadi urat nadi transportasi penumpang dan pengiriman logistik strategis yang menghubungkan OKU Timur dengan Palembang dan Lampung."
  },
  {
    "id": 180,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Keberadaan lumbung pangan beras di OKU Timur memberikan kontribusi signifikan terhadap ketahanan pangan nasional berupa...",
    "options": [
      {
        "key": "A",
        "text": "Menghilangkan seluruh kebutuhan beras impor di seluruh benua Asia Tenggara"
      },
      {
        "key": "B",
        "text": "Menetapkan harga acuan beras internasional di bursa komoditas berjangka"
      },
      {
        "key": "C",
        "text": "Mewajibkan seluruh penduduk perkotaan beralih mengonsumsi jagung hibrida"
      },
      {
        "key": "D",
        "text": "Menyediakan subsidi beras gratis tanpa batas bagi seluruh negara tetangga"
      },
      {
        "key": "E",
        "text": "Memasok kebutuhan beras bagi wilayah Sumatera Selatan, Lampung, dan sekitarnya"
      }
    ],
    "correct": "E",
    "explanation": "Surplus beras OKU Timur menopang cadangan pangan strategis regional Sumatera Bagian Selatan dan menyuplai kebutuhan pangan ke provinsi tetangga."
  },
  {
    "id": 181,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Seorang petani memanen 5.000 kg Gabah Kering Panen. Setelah digiling di RMU lokal dengan rendemen 64%, berat beras siap jual yang diperoleh adalah...",
    "options": [
      {
        "key": "A",
        "text": "3.200 kg beras giling"
      },
      {
        "key": "B",
        "text": "2.800 kg beras giling"
      },
      {
        "key": "C",
        "text": "3.600 kg beras giling"
      },
      {
        "key": "D",
        "text": "4.000 kg beras giling"
      },
      {
        "key": "E",
        "text": "4.400 kg beras giling"
      }
    ],
    "correct": "A",
    "explanation": "Berat Beras = Rendemen x Berat Gabah = 64% x 5.000 kg = 3.200 kg beras."
  },
  {
    "id": 182,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Pak Joko menyadap getah karet dan memperoleh 300 kg bekuan lateks bersih. Jika harga lelang UPPB adalah Rp12.000 per kg, total penerimaan kotor Pak Joko adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp2.400.000 hasil karet"
      },
      {
        "key": "B",
        "text": "Rp3.600.000 hasil karet"
      },
      {
        "key": "C",
        "text": "Rp4.800.000 hasil karet"
      },
      {
        "key": "D",
        "text": "Rp5.400.000 hasil karet"
      },
      {
        "key": "E",
        "text": "Rp6.000.000 hasil karet"
      }
    ],
    "correct": "B",
    "explanation": "Total Penerimaan = 300 kg x Rp12.000 = Rp3.600.000."
  },
  {
    "id": 183,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Pembudidaya patin menebar 2.000 ekor benih. Setelah 6 bulan panen menghasilkan 1.500 kg ikan patin dan dijual Rp18.000 per kg. Penerimaan total panen patin tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp21.000.000 hasil patin"
      },
      {
        "key": "B",
        "text": "Rp30.000.000 hasil patin"
      },
      {
        "key": "C",
        "text": "Rp27.000.000 hasil patin"
      },
      {
        "key": "D",
        "text": "Rp36.000.000 hasil patin"
      },
      {
        "key": "E",
        "text": "Rp42.000.000 hasil patin"
      }
    ],
    "correct": "C",
    "explanation": "Total Penerimaan = 1.500 kg x Rp18.000 = Rp27.000.000."
  },
  {
    "id": 184,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Dinas Pengairan menjadwalkan penutupan saluran irigasi Komering untuk pembersihan lumpur pada bulan Oktober. Tindakan penyesuaian tanam yang bijak bagi petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memaksakan menyemai bibit padi pada awal bulan Oktober"
      },
      {
        "key": "B",
        "text": "Merusak pintu air agar air tetap mengalir ke petak sawahnya"
      },
      {
        "key": "C",
        "text": "Menuntut dinas pengairan membatalkan perawatan saluran"
      },
      {
        "key": "D",
        "text": "Menanam tanaman palawija tahan kering atau mengosongkan lahan"
      },
      {
        "key": "E",
        "text": "Menjual seluruh traktor tangan karena putus asa ketiadaan air"
      }
    ],
    "correct": "D",
    "explanation": "Saat jadwal pengeringan rutin saluran, petani beradaptasi dengan menanam palawija (jagung/kedelai) yang hemat air atau melakukan pembenahan lahan."
  },
  {
    "id": 185,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Kilang beras di Belitang mengirim 10 ton beras kemasan ke Palembang dengan ongkos truk Rp2.500.000. Jika harga jual beras Rp13.000 per kg, persentase biaya angkut terhadap penjualan adalah...",
    "options": [
      {
        "key": "A",
        "text": "0,5% dari penjualan"
      },
      {
        "key": "B",
        "text": "5,5% dari penjualan"
      },
      {
        "key": "C",
        "text": "8,2% dari penjualan"
      },
      {
        "key": "D",
        "text": "12% dari penjualan"
      },
      {
        "key": "E",
        "text": "1,92% dari penjualan"
      }
    ],
    "correct": "E",
    "explanation": "Nilai Penjualan = 10.000 kg x Rp13.000 = Rp130.000.000. Persentase Ongkos Angkut = (Rp2.500.000 / Rp130.000.000) x 100% = 1,92%."
  },
  {
    "id": 186,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Uji kadar air gabah kering giling menggunakan moisture meter menunjukkan angka 13,5%. Standar kadar air aman untuk penggilingan beras premium adalah maksimal 14%. Tindakan yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Gabah sudah memenuhi standar mutu aman dan siap diproses giling"
      },
      {
        "key": "B",
        "text": "Menjemur kembali gabah selama tiga hari berturut-turut di lapangan"
      },
      {
        "key": "C",
        "text": "Menyiramkan air ke tumpukan karung gabah agar beratnya bertambah"
      },
      {
        "key": "D",
        "text": "Menolak membeli gabah tersebut karena dianggap terlalu kering"
      },
      {
        "key": "E",
        "text": "Menjual gabah tersebut dengan harga diskon potongan setengah harga"
      }
    ],
    "correct": "A",
    "explanation": "Kadar air 13,5% berada di bawah batas maksimal 14%, menandakan gabah sudah cukup kering, aman disimpan, dan siap digiling tanpa hancur."
  },
  {
    "id": 187,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Kolam ikan patin menghabiskan 1.200 kg pakan pelet dan menghasilkan pertambahan bobot ikan total 1.000 kg. Nilai rasio konversi pakan (FCR) budidaya tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "0,8 nilai rasio pakan"
      },
      {
        "key": "B",
        "text": "1,2 nilai rasio pakan"
      },
      {
        "key": "C",
        "text": "1,5 nilai rasio pakan"
      },
      {
        "key": "D",
        "text": "2,0 nilai rasio pakan"
      },
      {
        "key": "E",
        "text": "2,4 nilai rasio pakan"
      }
    ],
    "correct": "B",
    "explanation": "FCR (Feed Conversion Ratio) = Total Pakan / Total Bobot Ikan = 1.200 kg / 1.000 kg = 1,2."
  },
  {
    "id": 188,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Petani karet ingin meningkatkan mutu bekuan lateks agar lolos lelang harga tertinggi di UPPB. Bahan pembeku yang dianjurkan sesuai standar teknis adalah...",
    "options": [
      {
        "key": "A",
        "text": "Asam sulfat air aki bekas"
      },
      {
        "key": "B",
        "text": "Pupuk urea dicampur garam dapur"
      },
      {
        "key": "C",
        "text": "Asam format atau asam semut"
      },
      {
        "key": "D",
        "text": "Minyak solar dicampur tatal kayu"
      },
      {
        "key": "E",
        "text": "Air sabun detergen pencuci piring"
      }
    ],
    "correct": "C",
    "explanation": "Asam semut (asam format) menghasilkan bekuan karet yang bersih, kenyal, tidak berbau busuk, dan tidak merusak elastisitas karet di pabrik."
  },
  {
    "id": 189,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Industri rumah tangga kemplang di Belitang mengolah 40 kg daging ikan patin seharga Rp20.000 per kg menjadi 100 bungkus kemplang matang seharga Rp15.000 per bungkus. Nilai tambah yang tercipta adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp500.000 nilai tambah"
      },
      {
        "key": "B",
        "text": "Rp900.000 nilai tambah"
      },
      {
        "key": "C",
        "text": "Rp1.100.000 nilai tambah"
      },
      {
        "key": "D",
        "text": "Rp700.000 nilai tambah"
      },
      {
        "key": "E",
        "text": "Rp1.500.000 nilai tambah"
      }
    ],
    "correct": "D",
    "explanation": "Biaya Bahan Baku Ikan = 40 kg x Rp20.000 = Rp800.000. Nilai Produk Olahan = 100 bungkus x Rp15.000 = Rp1.500.000. Nilai tambah kotor = Rp1.500.000 - Rp800.000 = Rp700.000."
  },
  {
    "id": 190,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Seekor sapi bakalan milik peternak rakyat di OKU Timur dibeli dengan modal bibit Rp12.000.000. Setelah digemukkan selama 8 bulan dengan pakan fermentasi jerami sawah dan ampas tahu dedak Belitang, sapi laku Rp20.000.000 dengan total biaya pakan Rp3.500.000. Berapakah keuntungan bersih peternak tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp3.500.000 keuntungan usaha"
      },
      {
        "key": "B",
        "text": "Rp5.500.000 keuntungan usaha"
      },
      {
        "key": "C",
        "text": "Rp6.500.000 keuntungan usaha"
      },
      {
        "key": "D",
        "text": "Rp8.000.000 keuntungan usaha"
      },
      {
        "key": "E",
        "text": "Rp4.500.000 keuntungan usaha"
      }
    ],
    "correct": "E",
    "explanation": "Total Biaya = Rp12.000.000 + Rp3.500.000 = Rp15.500.000. Keuntungan = Rp20.000.000 - Rp15.500.000 = Rp4.500.000."
  },
  {
    "id": 191,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Mendiagnosis dampak sedimentasi lumpur yang menebal pada saluran sekunder irigasi Belitang terhadap petani di ujung hilir saluran menunjukkan masalah...",
    "options": [
      {
        "key": "A",
        "text": "Debit air mengecil sehingga petak sawah hilir terancam kekeringan saat tanam"
      },
      {
        "key": "B",
        "text": "Kecepatan arus air di saluran hilir menjadi terlalu deras meluap ke tanggul"
      },
      {
        "key": "C",
        "text": "Kualitas kesuburan tanah sawah di bagian hilir meningkat berlipat ganda"
      },
      {
        "key": "D",
        "text": "Petani hilir dibebaskan dari keharusan menyiangi rumput liar di sawah"
      },
      {
        "key": "E",
        "text": "Pintu air otomatis terbuka sendiri tanpa perlu pengoperasian petugas"
      }
    ],
    "correct": "A",
    "explanation": "Sedimentasi lumpur menurunkan kapasitas tampung dan menghambat laju air, menyebabkan sawah di ujung hilir tidak kebagian air yang cukup."
  },
  {
    "id": 192,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Analisis terhadap penyebab tingginya fluktuasi harga getah karet di tingkat petani swadaya OKU Timur menunjukkan keterkaitan erat dengan...",
    "options": [
      {
        "key": "A",
        "text": "Penetapan tarif batas atas harga getah oleh kepala desa di setiap kecamatan"
      },
      {
        "key": "B",
        "text": "Permintaan industri otomotif global dan dinamika harga karet sintetis dunia"
      },
      {
        "key": "C",
        "text": "Jumlah curah hujan harian yang turun di kawasan pegunungan bukit barisan"
      },
      {
        "key": "D",
        "text": "Banyaknya pohon karet yang ditebang untuk kayu bakar pabrik genteng"
      },
      {
        "key": "E",
        "text": "Pergantian kepengurusan dewan pimpinan perbankan nasional di ibu kota"
      }
    ],
    "correct": "B",
    "explanation": "Karet adalah komoditas ekspor global; harganya ditentukan oleh permintaan pabrik ban dunia dan harga substitusi karet sintetis berbasis minyak bumi."
  },
  {
    "id": 193,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Mengevaluasi strategi hilirisasi komoditas beras di Belitang dari sekadar menjual gabah mentah menjadi beras kemasan premium bermerek menunjukkan manfaat...",
    "options": [
      {
        "key": "A",
        "text": "Membatasi peredaran beras lokal agar tidak dikonsumsi masyarakat daerah sendiri"
      },
      {
        "key": "B",
        "text": "Menghapuskan kebutuhan tenaga kerja pemanen di lahan persawahan irigasi"
      },
      {
        "key": "C",
        "text": "Meningkatkan nilai tambah ekonomi dan memperkuat posisi tawar produk di pasar kota"
      },
      {
        "key": "D",
        "text": "Mengganti fungsi saluran irigasi teknis menjadi kolam pemancingan wisata"
      },
      {
        "key": "E",
        "text": "Mewajibkan toko modern hanya menjual beras bermerek dari luar negeri"
      }
    ],
    "correct": "C",
    "explanation": "Hilirisasi beras kemasan bermerek mengangkat nilai jual produk, menciptakan loyalitas merek konsumen, dan meningkatkan pendapatan pengusaha lokal."
  },
  {
    "id": 194,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Analisis dampak alih fungsi lahan sawah produktif beririgasi teknis menjadi kawasan ruko dan perumahan di Belitang terhadap ketahanan pangan daerah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatkan kapasitas produksi beras tahunan karena bertambahnya pertokoan"
      },
      {
        "key": "B",
        "text": "Mempercepat aliran air irigasi menuju petak-petak persawahan di desa hilir"
      },
      {
        "key": "C",
        "text": "Menjamin ketersediaan beras cadangan di gudang logistik tetap melimpah ruah"
      },
      {
        "key": "D",
        "text": "Menurunkan potensi luas tanam dan mengancam status OKU Timur sebagai lumbung pangan"
      },
      {
        "key": "E",
        "text": "Menghilangkan kebutuhan pupuk urea bersubsidi bagi seluruh kelompok tani"
      }
    ],
    "correct": "D",
    "explanation": "Konversi lahan sawah beririgasi teknis secara permanen menggerus luasan panen, menurunkan produksi gabah, dan mengancam keberlanjutan lumbung pangan."
  },
  {
    "id": 195,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Kritisi terhadap kendala tingginya biaya pakan pabrikan pada budidaya ikan patin di OKU Timur memunculkan solusi strategis berupa...",
    "options": [
      {
        "key": "A",
        "text": "Mengurangi frekuensi pemberian makan menjadi satu kali dalam sepekan"
      },
      {
        "key": "B",
        "text": "Memanen ikan patin saat masih berukuran benih kecil tanpa menunggu besar"
      },
      {
        "key": "C",
        "text": "Membuang limbah kotoran kimia ke dalam kolam agar lumut tumbuh subur"
      },
      {
        "key": "D",
        "text": "Menjual seluruh kolam tanah kepada perusahaan pengembang perumahan"
      },
      {
        "key": "E",
        "text": "Memproduksi pakan mandiri memanfaatkan bahan baku lokal dedak bekatul dan ikan rucah"
      }
    ],
    "correct": "E",
    "explanation": "Inovasi pakan mandiri berbasis dedak padi lokal (by-product RMU) dan bahan baku protein lokal mampu memangkas biaya operasional budidaya patin hingga 30%."
  },
  {
    "id": 196,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Menganalisis perbandingan risiko petani yang menjual tebasan padi di sawah kepada tengkulak dibanding memanen mandiri lalu menggiling ke kilang menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Sistem tebasan praktis namun petani menerima harga lebih rendah dari nilai pasar riil"
      },
      {
        "key": "B",
        "text": "Sistem tebasan memberikan laba bersih maksimal tanpa risiko potongan timbangan"
      },
      {
        "key": "C",
        "text": "Memanen mandiri selalu menyebabkan kerugian besar akibat biaya sewa karung"
      },
      {
        "key": "D",
        "text": "Tengkulak tebasan selalu membagikan dividen keuntungan kepada keluarga petani"
      },
      {
        "key": "E",
        "text": "Kedua sistem memberikan hasil penerimaan uang tunai yang persis identik sama"
      }
    ],
    "correct": "A",
    "explanation": "Sistem tebasan dipilih petani karena butuh uang cepat dan menghindari repot panen, tetapi konsekuensinya taksiran borongan tengkulak jauh di bawah harga pasar riil."
  },
  {
    "id": 197,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Evaluasi terhadap keberadaan jalan tol Trans Sumatera yang terhubung dengan jalan lintas Komering terhadap daya saing beras OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menaikkan waktu tempuh pengiriman logistik menjadi dua kali lebih lambat"
      },
      {
        "key": "B",
        "text": "Memangkas waktu dan ongkos angkut distribusi beras menuju pelabuhan dan pasar Jawa"
      },
      {
        "key": "C",
        "text": "Menyebabkan kendaraan truk pengangkut gabah dilarang melintas di jalan raya"
      },
      {
        "key": "D",
        "text": "Menurunkan minat pedagang grosir Jakarta untuk memesan beras Belitang"
      },
      {
        "key": "E",
        "text": "Mengharuskan petani membayar biaya tol sebelum memanen padi di sawah"
      }
    ],
    "correct": "B",
    "explanation": "Konektivitas jalan tol memangkas durasi logistik pengiriman beras ke Pulau Jawa dan kota besar, meningkatkan efisiensi biaya dan daya saing komoditas."
  },
  {
    "id": 198,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Mendiagnosis kendala umum peternak rakyat (ruminansia sapi/kambing dan unggas ayam/bebek) di pedesaan OKU Timur dalam mengembangkan skala usaha menjadi peternakan modern komersial adalah...",
    "options": [
      {
        "key": "A",
        "text": "Keterbatasan pakan limbah jerami yang melimpah ruah di kawasan persawahan"
      },
      {
        "key": "B",
        "text": "Larangan konsumsi daging sapi oleh pemerintah kabupaten dan dinas terkait"
      },
      {
        "key": "C",
        "text": "Keterbatasan modal awal, pemeliharaan tradisional, dan minimnya teknologi inseminasi"
      },
      {
        "key": "D",
        "text": "Tingginya harga jual daging sapi segar di pasar tradisional kecamatan"
      },
      {
        "key": "E",
        "text": "Ketiadaan lahan kosong untuk pembuatan kandang kelompok di pedesaan"
      }
    ],
    "correct": "C",
    "explanation": "Peternakan rakyat umumnya masih bersifat sambilan (tabungan), terkendala akses kredit perbankan, dan adopsi manajemen pakan/inseminasi buatan yang belum merata."
  },
  {
    "id": 199,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Analisis dampak keberhasilan inovasi pertanian organik berbasis pupuk hayati lokal di Belitang terhadap kelestarian lingkungan dan nilai jual beras adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menurunkan kualitas kesuburan biologi tanah dan merusak ekosistem cacing tanah"
      },
      {
        "key": "B",
        "text": "Mengharuskan petani menyemprotkan pestisida kimia dalam dosis berlipat ganda"
      },
      {
        "key": "C",
        "text": "Menyebabkan beras berbau asam dan ditolak oleh seluruh konsumen perkotaan"
      },
      {
        "key": "D",
        "text": "Memulihkan kesuburan tanah, ramah lingkungan, dan meraih premi harga jual lebih tinggi"
      },
      {
        "key": "E",
        "text": "Menutup akses petani untuk mendapatkan sertifikasi pangan organik resmi"
      }
    ],
    "correct": "D",
    "explanation": "Pertanian organik memperbaiki struktur tanah yang jenuh kimia, menjaga keanekaragaman hayati sawah, dan produknya memiliki nilai jual premium di pasar modern."
  },
  {
    "id": 200,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Merumuskan grand design pembangunan ekonomi berkelanjutan di Kabupaten OKU Timur untuk masa depan berbasis potensi daerah memerlukan integrasi antara...",
    "options": [
      {
        "key": "A",
        "text": "Penghentian seluruh kegiatan pertanian dan alih profesi total ke sektor jasa"
      },
      {
        "key": "B",
        "text": "Eksploitasi pertambangan batubara besar-besaran di areal sawah irigasi teknis"
      },
      {
        "key": "C",
        "text": "Penutupan seluruh bendung saluran air demi penghematan anggaran pemeliharaan"
      },
      {
        "key": "D",
        "text": "Ketergantungan penuh pada pasokan komoditas pangan dari kabupaten tetangga"
      },
      {
        "key": "E",
        "text": "Modernisasi pertanian hulu-hilir, agroindustri pengolahan, dan inklusi keuangan digital"
      }
    ],
    "correct": "E",
    "explanation": "Visi masa depan OKU Timur berpusat pada pertanian cerdas (smart agriculture), hilirisasi industri pengolahan pangan, dan penguatan ekosistem keuangan pedesaan."
  }
    ],

2: [
  {
    "id": 201,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Kata kebudayaan secara etimologis berakar dari bahasa Sanskerta 'buddhayah', yang merupakan bentuk jamak dari perkataan 'buddhi' dengan arti...",
    "options": [
      {
        "key": "A",
        "text": "Budi atau akal pikiran manusia"
      },
      {
        "key": "B",
        "text": "Kekuatan fisik dan ketangkasan jiwa"
      },
      {
        "key": "C",
        "text": "Kumpulan aturan hukum perdata desa"
      },
      {
        "key": "D",
        "text": "Kekayaan materi dan harta benda"
      },
      {
        "key": "E",
        "text": "Hubungan kekerabatan sedarah seketurunan"
      }
    ],
    "correct": "A",
    "explanation": "Secara etimologis, kebudayaan berasal dari bahasa Sanskerta buddhayah (jamak dari buddhi) yang berarti akal atau budi manusia."
  },
  {
    "id": 202,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Antropolog kenamaan E.B. Tylor merumuskan kebudayaan sebagai suatu keseluruhan kompleks yang mencakup komponen berikut, kecuali...",
    "options": [
      {
        "key": "A",
        "text": "Pengetahuan, kepercayaan, dan kesenian"
      },
      {
        "key": "B",
        "text": "Naluri biologis murni tanpa proses belajar"
      },
      {
        "key": "C",
        "text": "Hukum, moral, dan adat kebiasaan"
      },
      {
        "key": "D",
        "text": "Keterampilan yang diperoleh anggota masyarakat"
      },
      {
        "key": "E",
        "text": "Norma-norma yang disepakati bersama kelompok"
      }
    ],
    "correct": "B",
    "explanation": "Kebudayaan menurut E.B. Tylor mencakup segala pengetahuan, kepercayaan, seni, moral, hukum, dan adat yang didapat manusia melalui proses belajar sosial, bukan naluri biologis bawaan lahir."
  },
  {
    "id": 203,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Koentjaraningrat mengelompokkan wujud kebudayaan ke dalam tiga gejala kultural utama, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Cita-cita politik, doktrin ekonomi, dan partai"
      },
      {
        "key": "B",
        "text": "Teknologi digital, mesin pabrik, dan industri"
      },
      {
        "key": "C",
        "text": "Gagasan, tindakan berpola, dan benda fisik"
      },
      {
        "key": "D",
        "text": "Keturunan biologis, wilayah daratan, dan iklim"
      },
      {
        "key": "E",
        "text": "Peraturan undang-undang, militer, dan pengadilan"
      }
    ],
    "correct": "C",
    "explanation": "Tiga wujud kebudayaan menurut Koentjaraningrat adalah: sistem gagasan (ide/nilai), sistem aktivitas (tindakan berpola manusia), dan sistem artefak (benda fisik hasil karya manusia)."
  },
  {
    "id": 204,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Di antara tujuh unsur kebudayaan universal, unsur yang umumnya paling cepat dan mudah mengalami pembaruan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sistem religi dan keyakinan spiritual"
      },
      {
        "key": "B",
        "text": "Sistem nilai moral dan falsafah hidup"
      },
      {
        "key": "C",
        "text": "Struktur kekerabatan klan keluarga besar"
      },
      {
        "key": "D",
        "text": "Sistem peralatan hidup dan teknologi kerja"
      },
      {
        "key": "E",
        "text": "Kosakata inti bahasa ibu daerah setempat"
      }
    ],
    "correct": "D",
    "explanation": "Sistem peralatan hidup dan teknologi bersifat praktis serta material, sehingga paling terbuka dan cepat mengadopsi perubahan dibanding sistem religi atau nilai moral."
  },
  {
    "id": 205,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Suku asli yang mendiami wilayah pedalaman sepanjang aliran sungai utama di Kabupaten OKU Timur adalah suku...",
    "options": [
      {
        "key": "A",
        "text": "Pasemah dan Besemah dataran tinggi"
      },
      {
        "key": "B",
        "text": "Rejang dan Serawai pesisir barat"
      },
      {
        "key": "C",
        "text": "Rawas dan Musi hilir pedalaman"
      },
      {
        "key": "D",
        "text": "Kubu dan Anak Dalam perbatasan hutan"
      },
      {
        "key": "E",
        "text": "Komering dengan ragam marga klan lokal"
      }
    ],
    "correct": "E",
    "explanation": "Masyarakat asli wilayah OKU Timur adalah suku Komering yang mendiami sepanjang daerah aliran Sungai Komering dengan berbagai marga adat."
  },
  {
    "id": 206,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Program penempatan transmigran pertama kali di kawasan Belitang pada masa kolonial Belanda dimulai pada tahun...",
    "options": [
      {
        "key": "A",
        "text": "1937 dengan rombongan perintis asal Jawa"
      },
      {
        "key": "B",
        "text": "1905 di kawasan pesisir teluk Lampung"
      },
      {
        "key": "C",
        "text": "1945 bersamaan proklamasi kemerdekaan"
      },
      {
        "key": "D",
        "text": "1965 menjelang pembentukan orde baru"
      },
      {
        "key": "E",
        "text": "1980 masa swasembada beras nasional"
      }
    ],
    "correct": "A",
    "explanation": "Kolonisasi (cikal bakal transmigrasi) di Belitang pertama kali dibuka oleh pemerintah Hindia Belanda pada tahun 1937 untuk pembukaan persawahan irigasi."
  },
  {
    "id": 207,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Contoh wujud kebudayaan fisik (artefak) peninggalan masyarakat tradisional Komering yang masih lestari adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tata susila penghormatan tokoh adat desa"
      },
      {
        "key": "B",
        "text": "Rumah panggung kayu berukir ornamen lokal"
      },
      {
        "key": "C",
        "text": "Pantun lisan nasihat dalam upacara pinangan"
      },
      {
        "key": "D",
        "text": "Keyakinan tentang pantangan waktu malam"
      },
      {
        "key": "E",
        "text": "Aturan pembagian warisan antar-ahli waris"
      }
    ],
    "correct": "B",
    "explanation": "Rumah panggung kayu berukir merupakan wujud fisik (kebudayaan material/artefak) hasil karya arsitektur tradisional masyarakat Komering."
  },
  {
    "id": 208,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Prinsip kekerabatan yang lazim dianut dalam sistem adat masyarakat suku Komering di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Matrilineal berdasarkan garis keturunan ibu"
      },
      {
        "key": "B",
        "text": "Bilateral seimbang kedua pihak tanpa marga"
      },
      {
        "key": "C",
        "text": "Patrilineal menarik garis silsilah ayah"
      },
      {
        "key": "D",
        "text": "Matrilokal mutlak menetap di kerabat istri"
      },
      {
        "key": "E",
        "text": "Avunkulokal menetap di kediaman paman ibu"
      }
    ],
    "correct": "C",
    "explanation": "Masyarakat Komering menganut garis kekerabatan patrilineal, di mana garis keturunan dan nama marga ditarik melalui garis ayah/pria."
  },
  {
    "id": 209,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Keberadaan komunitas transmigran asal Bali di Belitang dengan ciri bangunan pura dan upacara keagamaan menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Masyarakat lokal menolak perubahan sosial"
      },
      {
        "key": "B",
        "text": "Terjadi asimilasi total meleburkan semua adat"
      },
      {
        "key": "C",
        "text": "Pemerintah melarang interaksi antarsuku bangsa"
      },
      {
        "key": "D",
        "text": "Terjadi pluralisme kultural yang harmonis"
      },
      {
        "key": "E",
        "text": "Kebudayaan pendatang mendominasi warga asli"
      }
    ],
    "correct": "D",
    "explanation": "Keberadaan warga Bali dengan kebudayaan dan pura di Belitang merupakan bukti nyata kemajemukan budaya (pluralisme) yang hidup berdampingan secara harmonis."
  },
  {
    "id": 210,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Perbedaan mendasar antara proses asimilasi dan akulturasi dalam dinamika masyarakat multikultural Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Akulturasi menghilangkan sama sekali ciri lama"
      },
      {
        "key": "B",
        "text": "Asimilasi selalu menimbulkan perpecahan sosial"
      },
      {
        "key": "C",
        "text": "Akulturasi hanya terjadi di bidang perekonomian"
      },
      {
        "key": "D",
        "text": "Asimilasi tidak melibatkan interaksi tatap muka"
      },
      {
        "key": "E",
        "text": "Akulturasi memadukan budaya tanpa hilang jati diri"
      }
    ],
    "correct": "E",
    "explanation": "Akulturasi adalah perpaduan dua budaya atau lebih di mana unsur asli masing-masing budaya tetap bertahan, sedangkan asimilasi melebur menjadi kebudayaan baru."
  },
  {
    "id": 211,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Sikap saling menjaga ketertiban saat perayaan hari besar keagamaan di wilayah Belitang mencerminkan pemahaman nilai...",
    "options": [
      {
        "key": "A",
        "text": "Toleransi dan penghormatan kebebasan beragama"
      },
      {
        "key": "B",
        "text": "Eksklusivisme kelompok masyarakat tertutup"
      },
      {
        "key": "C",
        "text": "Kepatuhan semata karena ancaman aparat hukum"
      },
      {
        "key": "D",
        "text": "Keseragaman keyakinan seluruh warga desa"
      },
      {
        "key": "E",
        "text": "Keengganan bertegur sapa antarumat beragama"
      }
    ],
    "correct": "A",
    "explanation": "Ketertiban bersama saat peringatan hari besar keagamaan adalah perwujudan sikap toleransi aktif dan saling menghormati di tengah keberagaman keyakinan."
  },
  {
    "id": 212,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Tradisi 'sambatan' dalam masyarakat perdesaan di OKU Timur dipahami oleh warga sebagai wujud gotong royong yang bertujuan...",
    "options": [
      {
        "key": "A",
        "text": "Mengumpulkan laba tunai untuk kas perorangan"
      },
      {
        "key": "B",
        "text": "Meringankan pekerjaan berat demi kepentingan bersama"
      },
      {
        "key": "C",
        "text": "Menghindari keterlibatan dalam kegiatan desa"
      },
      {
        "key": "D",
        "text": "Menggantikan seluruh upacara adat dengan kerja fisik"
      },
      {
        "key": "E",
        "text": "Menyeragamkan mata pencaharian seluruh warga"
      }
    ],
    "correct": "B",
    "explanation": "Sambatan adalah pranata tolong-menolong tradisional tanpa upah untuk menyelesaikan pekerjaan besar seperti membangun rumah, mengolah lahan, atau hajatan."
  },
  {
    "id": 213,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Penggunaan frasa bahasa daerah Komering yang dipadukan dengan bahasa Jawa dalam pergaulan harian di pasar Belitang membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Bahasa Indonesia dilarang digunakan di pasar"
      },
      {
        "key": "B",
        "text": "Warga mengalami penurunan kemampuan berbahasa"
      },
      {
        "key": "C",
        "text": "Bahasa berfungsi jembatan integrasi sosial budaya"
      },
      {
        "key": "D",
        "text": "Pedagang menolak pembeli yang berbeda bahasa"
      },
      {
        "key": "E",
        "text": "Terjadi kepunahan total kosakata bahasa ibu"
      }
    ],
    "correct": "C",
    "explanation": "Pencampuran kosakata lokal dalam interaksi pasar membuktikan bahasa berperan penting sebagai sarana komunikasi inklusif dan jembatan pemersatu antarsuku."
  },
  {
    "id": 214,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Kearifan lokal pranata mangsa yang diwariskan petani transmigran di Belitang merupakan bagian dari unsur kebudayaan universal...",
    "options": [
      {
        "key": "A",
        "text": "Sistem persenjataan bela diri tradisional"
      },
      {
        "key": "B",
        "text": "Sistem hukum pidana adat perdesaan"
      },
      {
        "key": "C",
        "text": "Sistem stratifikasi kasta kebangsawanan"
      },
      {
        "key": "D",
        "text": "Sistem pengetahuan lingkungan dan astronomi"
      },
      {
        "key": "E",
        "text": "Sistem kesenian vokal tembang macapat"
      }
    ],
    "correct": "D",
    "explanation": "Pranata mangsa adalah sistem pengetahuan tradisional tentang peredaran musim dan astronomi untuk memandu jadwal kegiatan pertanian."
  },
  {
    "id": 215,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Tari Tanggai yang sering ditarikan pada pembukaan acara resmi di Kabupaten OKU Timur memiliki fungsi utama sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Sarana perang tanding memperebutkan wilayah"
      },
      {
        "key": "B",
        "text": "Ritual pengusiran wabah penyakit menular"
      },
      {
        "key": "C",
        "text": "Tarian pemanggil hujan di musim kemarau panjang"
      },
      {
        "key": "D",
        "text": "Simbol penobatan raja baru di istana kesultanan"
      },
      {
        "key": "E",
        "text": "Tarian penyambutan ungkapan rasa hormat tamu"
      }
    ],
    "correct": "E",
    "explanation": "Tari Tanggai merupakan tarian tradisional persembahan khas Sumatera Selatan untuk menyambut tamu kehormatan dengan penuh ketulusan dan keramahan."
  },
  {
    "id": 216,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Masyarakat multikultural di OKU Timur dapat menjaga kerukunan antaretnis dalam jangka panjang terutama karena didukung oleh...",
    "options": [
      {
        "key": "A",
        "text": "Modal sosial kesadaran nasib senasib sepenanggungan"
      },
      {
        "key": "B",
        "text": "Pemisahan ketat kompleks pemukiman per suku"
      },
      {
        "key": "C",
        "text": "Larangan perkawinan silang antarsuku berbeda"
      },
      {
        "key": "D",
        "text": "Pemberian hak istimewa hukum bagi suku mayoritas"
      },
      {
        "key": "E",
        "text": "Ketergantungan ekonomi mutlak pada bantuan luar"
      }
    ],
    "correct": "A",
    "explanation": "Kerukunan masyarakat OKU Timur bertumpu pada modal sosial gotong royong dan kesadaran historis saling membutuhkan dalam membangun daerah pertanian lumbung pangan."
  },
  {
    "id": 217,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Ketika pemuda desa di Belitang bergotong royong membersihkan lingkungan tempat ibadah umat lain menjelang perayaan agamanya, tindakan tersebut menerapkan...",
    "options": [
      {
        "key": "A",
        "text": "Prinsip asimilasi budaya tanpa pertimbangan"
      },
      {
        "key": "B",
        "text": "Prinsip kerukunan dan moderasi beragama nyata"
      },
      {
        "key": "C",
        "text": "Kewajiban administratif dari dinas ketenagakerjaan"
      },
      {
        "key": "D",
        "text": "Keharusan formal demi mendapatkan insentif dana"
      },
      {
        "key": "E",
        "text": "Penyeragaman ajaran semua agama di perdesaan"
      }
    ],
    "correct": "B",
    "explanation": "Aksi gotong royong lintas agama merupakan implementasi nyata moderasi beragama dan toleransi dalam kehidupan bermasyarakat sehari-hari."
  },
  {
    "id": 218,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Seorang pelajar SMAN 1 Belitang memiliki darah campuran Komering dan Jawa. Cara paling tepat bagi pelajar tersebut menerapkan nilai keberagaman adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menolak mempelajari salah satu bahasa orang tuanya"
      },
      {
        "key": "B",
        "text": "Hanya bergaul dengan teman yang bersuku serupa"
      },
      {
        "key": "C",
        "text": "Mempelajari dan menghargai kekayaan kedua budaya"
      },
      {
        "key": "D",
        "text": "Menganggap sukunya lebih unggul daripada suku lain"
      },
      {
        "key": "E",
        "text": "Mengabaikan seluruh tradisi lokal di lingkungannya"
      }
    ],
    "correct": "C",
    "explanation": "Pelajar yang berlatar belakang multikultural sebaiknya bangga dan mempelajari kedua budaya warisan keluarganya sebagai wujud apresiasi keberagaman."
  },
  {
    "id": 219,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Menghadapi musim tanam serentak, kelompok tani di Buay Madang menyepakati jadwal pengolahan tanah secara musyawarah mufakat. Praktik ini menerapkan unsur...",
    "options": [
      {
        "key": "A",
        "text": "Sistem peralatan fisik persenjataan tradisional"
      },
      {
        "key": "B",
        "text": "Sistem kesenian musik instrumen gamelan Jawa"
      },
      {
        "key": "C",
        "text": "Sistem kepercayaan ritual magis penolak bala"
      },
      {
        "key": "D",
        "text": "Sistem organisasi sosial kemasyarakatan desa"
      },
      {
        "key": "E",
        "text": "Sistem bahasa rahasia internal kelompok klan"
      }
    ],
    "correct": "D",
    "explanation": "Musyawarah kelompok tani untuk menetapkan kesepakatan bersama merupakan implementasi dari sistem kemasyarakatan/organisasi sosial."
  },
  {
    "id": 220,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Ketika bertamu ke rumah sesepuh suku Komering, seorang siswa membungkukkan badan sedikit dan menyapa dengan tutur santun setempat. Tindakan ini mencerminkan...",
    "options": [
      {
        "key": "A",
        "text": "Kepatuhan mutlak terhadap perintah undang-undang"
      },
      {
        "key": "B",
        "text": "Keterikatan semata karena hubungan kekerabatan darah"
      },
      {
        "key": "C",
        "text": "Rasa takut dikenai sanksi denda material perdata"
      },
      {
        "key": "D",
        "text": "Ketiadaan kebebasan berekspresi di masyarakat"
      },
      {
        "key": "E",
        "text": "Penerapan etika sopan santun sesuai norma adat"
      }
    ],
    "correct": "E",
    "explanation": "Sikap hormat kepada sesepuh adalah wujud penerapan tata krama dan etika kesopanan yang dijunjung tinggi dalam adat istiadat Komering."
  },
  {
    "id": 221,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Komunitas siswa membuat siniar (podcast) daring yang mewawancarai maestro musik kelintang Komering. Tindakan siswa tersebut menerapkan prinsip...",
    "options": [
      {
        "key": "A",
        "text": "Pemanfaatan teknologi digital untuk pelestarian budaya"
      },
      {
        "key": "B",
        "text": "Komersialisasi penuh hak cipta lagu tradisional"
      },
      {
        "key": "C",
        "text": "Penggantian alat musik akustik dengan suara sintesis"
      },
      {
        "key": "D",
        "text": "Penutupan akses budaya lokal dari publik luas"
      },
      {
        "key": "E",
        "text": "Penolakan terhadap perkembangan teknologi informasi"
      }
    ],
    "correct": "A",
    "explanation": "Mendokumentasikan seni musik kelintang lewat podcast merupakan pemanfaatan teknologi digital untuk pelestarian warisan budaya lokal bagi generasi muda."
  },
  {
    "id": 222,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Seorang pemilik warung makan di Belitang menyajikan menu nasi liwet Jawa bersanding dengan pindang patin khas Komering. Inovasi kuliner ini menerapkan...",
    "options": [
      {
        "key": "A",
        "text": "Penolakan terhadap cita rasa kuliner nusantara"
      },
      {
        "key": "B",
        "text": "Perpaduan akulturatif potensi kuliner antarsuku"
      },
      {
        "key": "C",
        "text": "Kewajiban menu seragam oleh dinas pariwisata"
      },
      {
        "key": "D",
        "text": "Larangan menjual kuliner tradisional daerah lain"
      },
      {
        "key": "E",
        "text": "Penghilangan resep bumbu rempah asli leluhur"
      }
    ],
    "correct": "B",
    "explanation": "Penyajian menu berdampingan antara kuliner Jawa dan Komering merupakan contoh akulturasi kuliner yang memperkaya daya tarik ekonomi lokal."
  },
  {
    "id": 223,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Di sekolah multikultural, peringatan bulan bahasa diisi lomba pidato dalam tiga bahasa: Indonesia, Komering, dan Jawa. Kegiatan ini menerapkan fungsi bahasa sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Pembeda derajat status sosial antarsiswa sekolah"
      },
      {
        "key": "B",
        "text": "Penentu kelulusan ujian nasional akademik siswa"
      },
      {
        "key": "C",
        "text": "Sarana edukasi apresiasi keberagaman dan ekspresi"
      },
      {
        "key": "D",
        "text": "Alat membatasi interaksi antarkelompok kelas"
      },
      {
        "key": "E",
        "text": "Media kampanye politik praktis di lingkungan sekolah"
      }
    ],
    "correct": "C",
    "explanation": "Lomba pidato dwibahasa lokal mengedukasi siswa untuk menghargai kekayaan linguistik dan mengekspresikan jati diri budayanya secara positif."
  },
  {
    "id": 224,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Apabila terjadi perselisihan batas parit sawah antarpetani berbeda suku di pedesaan Belitang, langkah awal yang paling sesuai dengan budaya lokal adalah...",
    "options": [
      {
        "key": "A",
        "text": "Melakukan pengerahan massa untuk unjuk kekuatan"
      },
      {
        "key": "B",
        "text": "Langsung mengajukan gugatan perdata ke pengadilan"
      },
      {
        "key": "C",
        "text": "Memutus aliran air parit secara sepihak di hulu"
      },
      {
        "key": "D",
        "text": "Bermusyawarah difasilitasi sesepuh adat dan P3A"
      },
      {
        "key": "E",
        "text": "Menolak bertemu dan membiarkan lahan sawah terbengkalai"
      }
    ],
    "correct": "D",
    "explanation": "Penyelesaian sengketa melalui musyawarah dengan mediasi tokoh adat dan pengurus P3A mencerminkan nilai kearifan lokal gotong royong dan mufakat."
  },
  {
    "id": 225,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Banyak generasi muda di pedesaan OKU Timur saat ini lebih fasih menggunakan bahasa gaul media sosial dibanding bahasa daerahnya. Analisis kausalitas menunjukkan faktor utama pemicunya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bahasa daerah secara resmi dilarang oleh pemerintah"
      },
      {
        "key": "B",
        "text": "Bahasa daerah memiliki struktur tata bahasa yang kaku"
      },
      {
        "key": "C",
        "text": "Seluruh sekolah mewajibkan bahasa asing internasional"
      },
      {
        "key": "D",
        "text": "Jumlah penutur asli di pedesaan sudah habis total"
      },
      {
        "key": "E",
        "text": "Dominasi paparan konten digital dan gengsi sosial"
      }
    ],
    "correct": "E",
    "explanation": "Intensitas konsumsi media sosial digital serta persepsi bahwa bahasa daerah kurang modern menjadi penyebab utama pergeseran bahasa di kalangan remaja."
  },
  {
    "id": 226,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Meskipun memiliki latar belakang etnis dan agama yang sangat majemuk, Belitang dikenal sangat kondusif. Analisis sosiologis menunjukkan faktor integratif terkuat bertumpu pada...",
    "options": [
      {
        "key": "A",
        "text": "Keterikatan kepentingan ekonomi agraria bersama"
      },
      {
        "key": "B",
        "text": "Dominasi tunggal salah satu kelompok etnis dominan"
      },
      {
        "key": "C",
        "text": "Ketiadaan sarana komunikasi antarsuku di perdesaan"
      },
      {
        "key": "D",
        "text": "Pemisahan zona pemukiman yang terisolasi total"
      },
      {
        "key": "E",
        "text": "Pengawasan militer bersenjata secara berkelanjutan"
      }
    ],
    "correct": "A",
    "explanation": "Kebutuhan mengelola persawahan, irigasi, dan perputaran ekonomi pasar secara kolektif menciptakan ketergantungan fungsional yang merekatkan masyarakat."
  },
  {
    "id": 227,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Perbedaan karakteristik antara gotong royong di pedesaan agraris OKU Timur dengan tolong-menolong di kawasan perkotaan terletak pada...",
    "options": [
      {
        "key": "A",
        "text": "Kawasan pedesaan selalu menuntut upah harian tinggi"
      },
      {
        "key": "B",
        "text": "Pedesaan bersifat ikatan batiniah, kota kontraktual"
      },
      {
        "key": "C",
        "text": "Masyarakat perkotaan menolak transaksi keuangan tunai"
      },
      {
        "key": "D",
        "text": "Pedesaan tidak mengenal pembagian kerja sama sekali"
      },
      {
        "key": "E",
        "text": "Masyarakat kota tidak memiliki kepedulian kemanusiaan"
      }
    ],
    "correct": "B",
    "explanation": "Gotong royong desa berakar pada solidaritas mekanik (gemeinschaft/paguyuban batiniah), sedangkan kerja sama perkotaan cenderung bersifat pamrih kontraktual (gesellschaft)."
  },
  {
    "id": 228,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Larangan adat membuang bangkai atau meracuni ikan di aliran sungai Komering mengandung fungsi laten kultural, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Menjaga monopoli tangkapan bagi tetua adat semata"
      },
      {
        "key": "B",
        "text": "Menghalangi nelayan luar memasuki kawasan sungai"
      },
      {
        "key": "C",
        "text": "Konservasi ekosistem air dan kelangsungan hayati"
      },
      {
        "key": "D",
        "text": "Menghentikan seluruh pemanfaatan air untuk irigasi"
      },
      {
        "key": "E",
        "text": "Mengharuskan warga membeli ikan impor kemasan kaleng"
      }
    ],
    "correct": "C",
    "explanation": "Fungsi tersembunyi (laten) dari pantangan adat sungai adalah menjaga keseimbangan ekologis perairan agar sumber protein ikan dan air tetap lestari."
  },
  {
    "id": 229,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Fenomena percampuran kosakata bahasa Komering, Jawa, dan Melayu Palembang dalam obrolan remaja Belitang dianalisis secara linguistik sebagai wujud...",
    "options": [
      {
        "key": "A",
        "text": "Kerusakan fatal sistem tata bahasa nasional"
      },
      {
        "key": "B",
        "text": "Kegagalan kurikulum pendidikan formal di sekolah"
      },
      {
        "key": "C",
        "text": "Ketidakmampuan remaja memahami makna kosakata"
      },
      {
        "key": "D",
        "text": "Dinamika kontak bahasa membentuk register unik"
      },
      {
        "key": "E",
        "text": "Tuntutan resmi dari pemerintah daerah kabupaten"
      }
    ],
    "correct": "D",
    "explanation": "Alih kode dan campur kode merupakan fenomena kontak bahasa wajar dalam masyarakat multilingual yang melahirkan dialek sosial pergaulan khas daerah."
  },
  {
    "id": 230,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Pergeseran bentuk tempat tinggal warga dari rumah panggung kayu ke rumah tembok semen lantai keramik di Belitang dianalisis terutama disebabkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Larangan resmi membangun rumah panggung dari camat"
      },
      {
        "key": "B",
        "text": "Musnahnya seluruh tukang kayu tradisional setempat"
      },
      {
        "key": "C",
        "text": "Keyakinan mistis bahwa kayu membawa nasib sial"
      },
      {
        "key": "D",
        "text": "Ketiadaan lahan persawahan di sekitar pemukiman"
      },
      {
        "key": "E",
        "text": "Kelangkaan bahan kayu berkualitas dan faktor praktis"
      }
    ],
    "correct": "E",
    "explanation": "Kenaikan harga kayu keras, kelangkaan bahan baku hutan, serta kemudahan perawatan material bata/semen mendorong modernisasi bentuk rumah hunian."
  },
  {
    "id": 231,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Ketiadaan konflik etnis terbuka dalam sejarah Kabupaten OKU Timur jika dianalisis dari teori struktur sosial disebabkan oleh adanya...",
    "options": [
      {
        "key": "A",
        "text": "Interseksi keanggotaan silang dalam berbagai pranata"
      },
      {
        "key": "B",
        "text": "Sistem pemerintahan otoriter yang menekan warga"
      },
      {
        "key": "C",
        "text": "Ketiadaan perbedaan kepentingan antarkelompok desa"
      },
      {
        "key": "D",
        "text": "Kesamaan menyeluruh dalam hal keyakinan agama"
      },
      {
        "key": "E",
        "text": "Kekayaan alam yang berlimpah tanpa perlu bekerja"
      }
    ],
    "correct": "A",
    "explanation": "Interseksi sosial (persilangan keanggotaan dalam kelompok tani, pasar, sekolah, organisasi) mempertemukan berbagai suku sehingga meredam potensi konflik antar-etnis."
  },
  {
    "id": 232,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Pemekaran Kabupaten OKU Timur dari kabupaten induk OKU pada tahun 2004 terhadap perkembangan kebudayaan daerah secara kritis dianalisis telah...",
    "options": [
      {
        "key": "A",
        "text": "Menghapuskan eksistensi seluruh marga adat asli"
      },
      {
        "key": "B",
        "text": "Mendorong revitalisasi identitas budaya dan aset lokal"
      },
      {
        "key": "C",
        "text": "Menutup pergaulan budaya dengan daerah kabupaten lain"
      },
      {
        "key": "D",
        "text": "Menjadikan kebudayaan seragam tanpa ada variasi"
      },
      {
        "key": "E",
        "text": "Mengurangi alokasi anggaran pelestarian kesenian"
      }
    ],
    "correct": "B",
    "explanation": "Otonomi daerah hasil pemekaran memberi ruang kebijakan mandiri untuk memajukan, mendokumentasikan, dan merevitalisasi seni budaya lokal OKU Timur."
  },
  {
    "id": 233,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Untuk mengevaluasi keberhasilan program pelestarian bahasa daerah Komering di tingkat SMA se-OKU Timur, indikator penilaian paling valid adalah...",
    "options": [
      {
        "key": "A",
        "text": "Jumlah sertifikat lomba pidato yang dicetak panitia"
      },
      {
        "key": "B",
        "text": "Anggaran dana hibah yang terserap habis dalam satu tahun"
      },
      {
        "key": "C",
        "text": "Frekuensi siswa bertutur bahasa daerah dalam keseharian"
      },
      {
        "key": "D",
        "text": "Banyaknya spanduk slogan pelestarian bahasa di jalan"
      },
      {
        "key": "E",
        "text": "Jumlah buku tata bahasa yang tersimpan rapi di gudang"
      }
    ],
    "correct": "C",
    "explanation": "Tolok ukur keberhasilan pelestarian bahasa yang paling nyata adalah vitalitas penggunaannya dalam komunikasi lisan sehari-hari oleh generasi muda."
  },
  {
    "id": 234,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Sebuah wacana mengusulkan penggantian penuh rumah panggung kayu bersejarah dengan ruko modern di pusat kota Martapura. Penilaian kritis atas usulan tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sangat tepat karena rumah kayu tidak lagi memiliki nilai guna"
      },
      {
        "key": "B",
        "text": "Perlu segera dibongkar demi mengejar kemajuan metropolitan"
      },
      {
        "key": "C",
        "text": "Rumah kayu panggung mencerminkan keterbelakangan arsitektur"
      },
      {
        "key": "D",
        "text": "Keliru karena menghilangkan warisan cagar budaya bernilai tinggi"
      },
      {
        "key": "E",
        "text": "Bagus karena bangunan ruko lebih disukai turis asing modern"
      }
    ],
    "correct": "D",
    "explanation": "Membongkar total rumah panggung historis mengorbankan cagar budaya dan identitas arsitektur lokal yang tidak tergantikan oleh ruko komersial."
  },
  {
    "id": 235,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Menghadapi pergeseran gotong royong menjadi hubungan kerja upahan di perdesaan Belitang, evaluasi strategi terbaik yang dapat diambil adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghukum petani yang mempekerjakan buruh panen mesin"
      },
      {
        "key": "B",
        "text": "Melarang seluruh mekanisasi pertanian modern di perdesaan"
      },
      {
        "key": "C",
        "text": "Memaksa pemuda bekerja sukarela tanpa diberi uang saku"
      },
      {
        "key": "D",
        "text": "Menghapus tradisi sambatan karena dianggap kuno dan lambat"
      },
      {
        "key": "E",
        "text": "Mengadaptasi gotong royong ke kegiatan sosial non-ekonomi"
      }
    ],
    "correct": "E",
    "explanation": "Mekanisasi sawah tak terelakkan, sehingga semangat gotong royong perlu direvitalisasi pada ranah fasilitas publik desa, kebersihan lingkungan, dan kebencanaan."
  },
  {
    "id": 236,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Ketika menilai efektivitas aturan adat mengenai larangan perburuan burung dan satwa langka di hutan desa OKU Timur, pertimbangan utama adalah...",
    "options": [
      {
        "key": "A",
        "text": "Konsistensi sanksi sosial dan kepatuhan warga lokal"
      },
      {
        "key": "B",
        "text": "Jumlah pendapatan denda yang masuk ke kantong pribadi ketua"
      },
      {
        "key": "C",
        "text": "Tingkat persetujuan dari para pemburu satwa komersial"
      },
      {
        "key": "D",
        "text": "Kemampuan aturan adat menggantikan hukum pidana formal"
      },
      {
        "key": "E",
        "text": "Seberapa sering aturan tersebut diliput stasiun televisi"
      }
    ],
    "correct": "A",
    "explanation": "Kekuatan norma adat bertumpu pada wibawa sosial, konsistensi penegakan sanksi moral, dan kesadaran kolektif warga untuk melaksanakannya."
  },
  {
    "id": 237,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Sebuah sekolah hendak menyusun kebijakan penguatan profil pelajar Pancasila berbasis kearifan lokal OKU Timur. Evaluasi terhadap pilihan program paling bermakna adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghafal nama marga Komering tanpa memahami filosofinya"
      },
      {
        "key": "B",
        "text": "Proyek kolaboratif lintas budaya meneliti kearifan lokal"
      },
      {
        "key": "C",
        "text": "Mewajibkan seragam adat setiap hari sepanjang tahun pelajaran"
      },
      {
        "key": "D",
        "text": "Membatasi siswa untuk hanya mempelajari budaya sukunya sendiri"
      },
      {
        "key": "E",
        "text": "Menonton film komersial bertema budaya asing dari luar negeri"
      }
    ],
    "correct": "B",
    "explanation": "Proyek riset dan aksi nyata lintas budaya melatih siswa berpikir kritis, berempati terhadap kemajemukan, dan menerapkan nilai kearifan lokal secara mendalam."
  },
  {
    "id": 238,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Menilai arah kebijakan pemajuan kebudayaan daerah Kabupaten OKU Timur ke depan, strategi penganggaran yang paling berdampak jangka panjang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membeli pakaian adat seragam untuk pejabat daerah semata"
      },
      {
        "key": "B",
        "text": "Mengadakan pesta kembang api pada malam pergantian tahun"
      },
      {
        "key": "C",
        "text": "Pemberdayaan sanggar seni generasi muda dan riset cagar budaya"
      },
      {
        "key": "D",
        "text": "Menutup seluruh objek wisata budaya dari kunjungan masyarakat"
      },
      {
        "key": "E",
        "text": "Membubarkan komunitas pemuda penggiat sejarah lokal perdesaan"
      }
    ],
    "correct": "C",
    "explanation": "Investasi pada pembinaan regenerasi pelaku seni muda dan penelitian cagar budaya menjamin kelangsungan transmisi nilai kebudayaan secara berkesinambungan."
  },
  {
    "id": 239,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Evaluasi terhadap fenomena akulturasi tradisi sedekah bumi pada masyarakat petani transmigran di Belitang menunjukkan bahwa upacara ini berhasil...",
    "options": [
      {
        "key": "A",
        "text": "Menghapus seluruh pengaruh ajaran agama samawi di desa"
      },
      {
        "key": "B",
        "text": "Mewajibkan seluruh petani beralih ke komoditas kelapa sawit"
      },
      {
        "key": "C",
        "text": "Memisahkan pergaulan antara petani kaya dengan petani penggarap"
      },
      {
        "key": "D",
        "text": "Menjadi ruang kohesi sosial ungkapan syukur panen bersama"
      },
      {
        "key": "E",
        "text": "Menimbulkan ketergantungan pangan dari daerah kabupaten lain"
      }
    ],
    "correct": "D",
    "explanation": "Sedekah bumi bertransformasi menjadi sarana kohesi sosial, doa bersama lintas warga, dan ungkapan syukur atas anugerah hasil panen bumi OKU Timur."
  },
  {
    "id": 240,
    "day": 2,
    "indicatorCode": "A",
    "indicatorKey": "modul_a_hakikat_budaya",
    "indicatorName": "Hakikat Budaya dan Tujuh Unsur Kebudayaan Universal di Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Menilai kedudukan hukum lembaga adat Pembina Adat Komering dalam era tata kelola pemerintahan modern saat ini, peran ideal lembaga adat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengambil alih fungsi penegakan hukum kepolisian dan jaksa"
      },
      {
        "key": "B",
        "text": "Menolak berlakunya hukum positif Republik Indonesia di daerah"
      },
      {
        "key": "C",
        "text": "Menjadi badan usaha bisnis profit untuk keuntungan pengurus"
      },
      {
        "key": "D",
        "text": "Membatasi diri hanya pada urusan seremonial tanpa pengaruh"
      },
      {
        "key": "E",
        "text": "Mitra strategis pemerintah dalam mediasi damai dan budaya"
      }
    ],
    "correct": "E",
    "explanation": "Lembaga adat berfungsi paling ideal sebagai mitra strategis pemda dalam menjaga kearifan lokal, melestarikan nilai moral, dan mediator musyawarah damai warga."
  },
  {
    "id": 241,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Konsep etos kerja dalam sosiologi ekonomi diartikan sebagai sikap mendasar dan pandangan hidup seseorang terhadap...",
    "options": [
      {
        "key": "A",
        "text": "Kemenangan mutlak dalam persaingan politik lokal"
      },
      {
        "key": "B",
        "text": "Kerja sebagai panggilan moral bernilai luhur"
      },
      {
        "key": "C",
        "text": "Penghindaran tanggung jawab demi kenyamanan pribadi"
      },
      {
        "key": "D",
        "text": "Pemuasan nafsu konsumtif tanpa perencanaan masa depan"
      },
      {
        "key": "E",
        "text": "Ketergantungan nasib pada belas kasihan orang lain"
      }
    ],
    "correct": "B",
    "explanation": "Etos kerja adalah seperangkat nilai, keyakinan, dan sikap mental positif yang memandang kerja sebagai ibadah, kewajiban moral, dan jalan meraih martabat hidup."
  },
  {
    "id": 242,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Pusat pasar tradisional paling ramai yang menjadi urat nadi perdagangan dan distribusi komoditas pangan di kawasan Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pasar Cinde Palembang dermaga sungai"
      },
      {
        "key": "B",
        "text": "Pasar 16 Ilir pusat kain konveksi grosir"
      },
      {
        "key": "C",
        "text": "Pasar Gumawang Belitang sentra hasil bumi"
      },
      {
        "key": "D",
        "text": "Pasar Kertapati stasiun persimpangan rel"
      },
      {
        "key": "E",
        "text": "Pasar Baturaja pusat batu akik mineral"
      }
    ],
    "correct": "C",
    "explanation": "Pasar Gumawang di Kecamatan Belitang merupakan pasar induk tradisional terbesar yang menggerakkan roda perputaran ekonomi komoditas pertanian dan perdagangan di OKU Timur."
  },
  {
    "id": 243,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Berdasarkan regulasi resmi perundang-undangan di Indonesia, kriteria utama yang digunakan untuk mengklasifikasikan skala UMKM adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tingkat pendidikan formal pemilik dan manajer"
      },
      {
        "key": "B",
        "text": "Luas tanah tempat tinggal keluarga pengusaha"
      },
      {
        "key": "C",
        "text": "Jumlah akun media sosial dan pengikut promosi"
      },
      {
        "key": "D",
        "text": "Modal usaha atau hasil penjualan tahunan bersih"
      },
      {
        "key": "E",
        "text": "Usia kendaraan bermotor operasional pengiriman"
      }
    ],
    "correct": "D",
    "explanation": "Berdasarkan PP No. 7 Tahun 2021, klasifikasi UMKM ditentukan berdasarkan modal usaha (aset di luar tanah/bangunan) atau omzet hasil penjualan tahunan."
  },
  {
    "id": 244,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Salah satu produk olahan pangan bernilai ekonomi tinggi yang banyak diproduksi oleh UMKM rumahan di wilayah OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Keju fermentasi susu kambing etawa impor"
      },
      {
        "key": "B",
        "text": "Gudeg nangka manis kalengan steril kemasan"
      },
      {
        "key": "C",
        "text": "Rendang daging sapi kering bumbu kelapa sangrai"
      },
      {
        "key": "D",
        "text": "Dodol rumput laut pesisir pantai selatan"
      },
      {
        "key": "E",
        "text": "Kerupuk kemplang ikan patin dan rengginang ketan"
      }
    ],
    "correct": "E",
    "explanation": "Kerupuk kemplang berbahan baku ikan patin lokal dan rengginang dari beras ketan Belitang merupakan produk unggulan UMKM khas OKU Timur."
  },
  {
    "id": 245,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Profesi di sektor formal yang bertugas menyelenggarakan fungsi birokrasi, regulasi, dan pelayanan publik bagi masyarakat daerah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Aparatur Sipil Negara di dinas pemerintahan"
      },
      {
        "key": "B",
        "text": "Tengkulak pengepul gabah sawah musiman"
      },
      {
        "key": "C",
        "text": "Pedagang kelontong keliling antar-desa"
      },
      {
        "key": "D",
        "text": "Buruh lepas pemanen kebun karet harian"
      },
      {
        "key": "E",
        "text": "Pengemudi ojek pangkalan tanpa paguyuban"
      }
    ],
    "correct": "A",
    "explanation": "Aparatur Sipil Negara (PNS dan PPPK) merupakan tenaga kerja sektor formal yang menjalankan tata kelola administrasi pemerintahan dan pelayanan umum."
  },
  {
    "id": 246,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Ciri khas yang menonjol dari unit usaha ekonomi di sektor informal perdesaan OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Wajib memiliki sertifikat saham di bursa efek"
      },
      {
        "key": "B",
        "text": "Operasional fleksibel tanpa badan hukum formal kaku"
      },
      {
        "key": "C",
        "text": "Mewajibkan rekrutmen pegawai melalui seleksi CPNS"
      },
      {
        "key": "D",
        "text": "Seluruh transaksi diawasi langsung oleh menteri keuangan"
      },
      {
        "key": "E",
        "text": "Memiliki kantor cabang resmi di berbagai negara"
      }
    ],
    "correct": "B",
    "explanation": "Sektor informal memiliki karakteristik fleksibel, modal mandiri sederhana, prosedur mudah, dan umumnya belum berbadan hukum perseroan."
  },
  {
    "id": 247,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Lembaga perbankan milik pemerintah daerah yang memiliki kantor cabang di Martapura dan Belitang untuk mengelola keuangan kas daerah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bank Central Asia kantor perwakilan bursa"
      },
      {
        "key": "B",
        "text": "Bank Mandiri unit syariah investasi luar negeri"
      },
      {
        "key": "C",
        "text": "Bank Sumsel Babel mitra kas daerah pemkab"
      },
      {
        "key": "D",
        "text": "Bank Tabungan Negara pembiayaan apartemen kota"
      },
      {
        "key": "E",
        "text": "Bank Perkreditan Rakyat swasta tanpa penjamin LPS"
      }
    ],
    "correct": "C",
    "explanation": "Bank Sumsel Babel adalah Bank Pembangunan Daerah (BPD) resmi yang bertindak sebagai pemegang kas daerah dan mitra utama keuangan Pemkab OKU Timur."
  },
  {
    "id": 248,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Standar pembayaran kode batang nasional yang distandardisasi oleh Bank Indonesia dan banyak digunakan pedagang di Gumawang adalah...",
    "options": [
      {
        "key": "A",
        "text": "SWIFT transfer antar-negara valuta asing"
      },
      {
        "key": "B",
        "text": "BI-RTGS transaksi triliunan antar-korporasi"
      },
      {
        "key": "C",
        "text": "EDC mesin gesek kartu magnetik pita kawat"
      },
      {
        "key": "D",
        "text": "QRIS kode pembayaran terpadu satu pintu"
      },
      {
        "key": "E",
        "text": "Cek bilyet giro kertas bertanda tangan basah"
      }
    ],
    "correct": "D",
    "explanation": "QRIS (Quick Response Code Indonesian Standard) menyatukan berbagai penyedia jasa pembayaran digital dalam satu stiker kode QR praktis bagi UMKM."
  },
  {
    "id": 249,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Tradisi gotong royong dan tolong-menolong di kalangan produsen kemplang Belitang berkontribusi positif terhadap kelangsungan usaha karena...",
    "options": [
      {
        "key": "A",
        "text": "Menghilangkan keharusan membeli bahan baku bumbu"
      },
      {
        "key": "B",
        "text": "Memungkinkan perajin menaikkan harga tanpa batas"
      },
      {
        "key": "C",
        "text": "Mewajibkan warga mengonsumsi kerupuk setiap jam makan"
      },
      {
        "key": "D",
        "text": "Melarang pengusaha lain membuka usaha serupa di desa"
      },
      {
        "key": "E",
        "text": "Membantu proses penjemuran massal saat cuaca terik"
      }
    ],
    "correct": "E",
    "explanation": "Gotong royong saling meminjamkan tempat penjemuran atau tenaga saat musim panas mempercepat kapasitas produksi kemplang tanpa beban biaya upah tinggi."
  },
  {
    "id": 250,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Peranan strategis Pasar Gumawang bagi kehidupan perekonomian masyarakat petani pedesaan di sekitarnya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjadi saluran perjumpaan pasokan panen dan kebutuhan harian"
      },
      {
        "key": "B",
        "text": "Tempat penentuan kurs mata uang dolar Amerika setiap pagi"
      },
      {
        "key": "C",
        "text": "Satu-satunya lokasi penyimpanan cadangan emas batangan daerah"
      },
      {
        "key": "D",
        "text": "Tempat penyelenggaraan pemilihan bupati dan wakil bupati"
      },
      {
        "key": "E",
        "text": "Kawasan khusus perakitan komponen pesawat antariksa modern"
      }
    ],
    "correct": "A",
    "explanation": "Pasar Gumawang berfungsi fungsional mempertemukan hasil bumi dari desa (beras, sayur, ikan) dengan pasokan kebutuhan sandang-pangan dari luar wilayah."
  },
  {
    "id": 251,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Keberadaan tenaga kerja formal (guru, tenaga medis, ASN) mempengaruhi stabilitas ekonomi di pedesaan OKU Timur terutama karena...",
    "options": [
      {
        "key": "A",
        "text": "Mereka mengambil alih seluruh lahan garapan sawah desa"
      },
      {
        "key": "B",
        "text": "Memiliki penghasilan rutin penopang daya beli pasar lokal"
      },
      {
        "key": "C",
        "text": "Diberikan kewenangan memungut pajak pribadi secara mandiri"
      },
      {
        "key": "D",
        "text": "Dilarang berbelanja kebutuhan pokok di pasar tradisional"
      },
      {
        "key": "E",
        "text": "Mewajibkan seluruh pedagang menjual barang dengan harga modal"
      }
    ],
    "correct": "B",
    "explanation": "Gaji tetap bulanan pekerja formal menjaga sirkulasi uang dan daya beli konsumen di toko, pasar, dan UMKM lokal tetap berputar stabil."
  },
  {
    "id": 252,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Kebiasaan pemilik UMKM rengginang di Belitang membeli bahan baku beras ketan dari petani setempat mencerminkan pemahaman nilai...",
    "options": [
      {
        "key": "A",
        "text": "Keterpaksaan karena ketiadaan jalur transportasi luar"
      },
      {
        "key": "B",
        "text": "Penolakan terhadap teknologi pengolahan pangan modern"
      },
      {
        "key": "C",
        "text": "Solidaritas rantai pasok ekonomi sirkular komunitas"
      },
      {
        "key": "D",
        "text": "Monopoli pasar untuk mematikan pedagang beras keliling"
      },
      {
        "key": "E",
        "text": "Kepatuhan mutlak pada aturan adat masa penjajahan"
      }
    ],
    "correct": "C",
    "explanation": "Membeli bahan baku lokal menciptakan sinergi rantai pasok ekonomi sirkular yang saling menguntungkan petani dan produsen olahan makanan."
  },
  {
    "id": 253,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Urgensi pengurusan sertifikasi halal dan izin edar P-IRT bagi produsen UMKM olahan pangan di OKU Timur adalah untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menghindari pemeriksaan pajak penghasilan tahunan badan"
      },
      {
        "key": "B",
        "text": "Memperoleh pinjaman bank tanpa kewajiban mengembalikan dana"
      },
      {
        "key": "C",
        "text": "Menjamin produk tidak akan pernah mengalami basi atau rusak"
      },
      {
        "key": "D",
        "text": "Meningkatkan jaminan mutu, higienitas, dan kepercayaan pasar"
      },
      {
        "key": "E",
        "text": "Membatasi penjualan produk hanya untuk warga satu desa saja"
      }
    ],
    "correct": "D",
    "explanation": "Izin P-IRT dan sertifikasi halal memberikan jaminan keamanan konsumsi dan kepatuhan syariah, sehingga memperluas pasar hingga ke swalayan modern."
  },
  {
    "id": 254,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Bagi pedagang sayur dan sembako di pasar tradisional OKU Timur, manfaat praktis penyediaan opsi bayar QRIS adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mendapatkan subsidi pupuk gratis langsung dari pemerintah"
      },
      {
        "key": "B",
        "text": "Menaikkan timbangan sayur secara digital otomatis di lapak"
      },
      {
        "key": "C",
        "text": "Membebaskan lapak dari retribusi kebersihan pasar selamanya"
      },
      {
        "key": "D",
        "text": "Menghentikan seluruh pencatatan pembukuan harian pedagang"
      },
      {
        "key": "E",
        "text": "Mencegah peredaran uang palsu dan repot mencari kembalian"
      }
    ],
    "correct": "E",
    "explanation": "Pembayaran digital QRIS memitigasi risiko uang palsu, mempercepat antrean transaksi, dan meniadakan kesulitan mencari uang receh kembalian."
  },
  {
    "id": 255,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Kepercayaan (trust) antar-pedagang di Pasar Gumawang yang memungkinkan penitipan barang dagangan tanpa khawatir hilang dikategorikan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Modal sosial yang memperlancar efisiensi transaksi ekonomi"
      },
      {
        "key": "B",
        "text": "Kelemahan sistem pengamanan pasar yang membahayakan aset"
      },
      {
        "key": "C",
        "text": "Tindakan ceroboh yang melanggar hukum perdata formal negara"
      },
      {
        "key": "D",
        "text": "Bukti ketiadaan persaingan usaha di lingkungan perbelanjaan"
      },
      {
        "key": "E",
        "text": "Kewajiban paksa yang diatur dalam peraturan daerah pasar"
      }
    ],
    "correct": "A",
    "explanation": "Rasa saling percaya (trust) adalah elemen utama modal sosial yang menurunkan biaya transaksi (transaction cost) dan menciptakan rasa aman bersama."
  },
  {
    "id": 256,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Keberadaan agen bank laku pandai (seperti BRILink) di pedesaan terpencil OKU Timur dipahami oleh masyarakat luas sebagai sarana...",
    "options": [
      {
        "key": "A",
        "text": "Penghapus seluruh utang piutang petani sawah seketika"
      },
      {
        "key": "B",
        "text": "Inklusi keuangan mendekatkan layanan perbankan ke pelosok"
      },
      {
        "key": "C",
        "text": "Pengganti fungsi pengadilan agama dalam sengketa warisan"
      },
      {
        "key": "D",
        "text": "Tempat penyitaan agunan tanah bagi debitur yang menunggak"
      },
      {
        "key": "E",
        "text": "Satu-satunya tempat pembagian bantuan sosial tunai pusat"
      }
    ],
    "correct": "B",
    "explanation": "Agen laku pandai memperluas inklusi keuangan, sehingga petani dan pedagang kecil dapat mentransfer uang, menabung, atau bayar tagihan tanpa jauh ke kota."
  },
  {
    "id": 257,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Produsen kerupuk kemplang ikan di Belitang ingin memasarkan produknya ke pasar luar kota. Langkah pemasaran digital paling aplikatif yang harus diterapkan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyebarkan selebaran fotokopi di tiang listrik jalan desa"
      },
      {
        "key": "B",
        "text": "Menitipkan produk di warung tetangga dengan sistem konsinyasi"
      },
      {
        "key": "C",
        "text": "Mengemas rapi vacuum pack dan menjual di lokapasar daring"
      },
      {
        "key": "D",
        "text": "Memasang pengeras suara di depan rumah produksi setiap hari"
      },
      {
        "key": "E",
        "text": "Menolak pembeli daring karena khawatir merepotkan pengiriman"
      }
    ],
    "correct": "C",
    "explanation": "Pengemasan kedap udara (vacuum pack) mempertahankan kerenyahan dan daya tahan produk selama ekspedisi, ideal untuk penjualan di marketplace online."
  },
  {
    "id": 258,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Kelompok usaha keripik pisang di Madang Suku menghadapi kenaikan harga minyak goreng. Penerapan efisiensi produksi yang tepat tanpa menurunkan mutu adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menggunakan minyak goreng jelantah yang sudah berbau tengik"
      },
      {
        "key": "B",
        "text": "Mengurangi bobot timbangan kemasan secara diam-diam tanpa label"
      },
      {
        "key": "C",
        "text": "Mencampur adonan pisang dengan bahan pengisi tepung murahan"
      },
      {
        "key": "D",
        "text": "Menggunakan mesin spinner peniris minyak dan kontrol api presisi"
      },
      {
        "key": "E",
        "text": "Menghentikan seluruh produksi dan memecat anggota kelompok tani"
      }
    ],
    "correct": "D",
    "explanation": "Penggunaan mesin spinner peniris minyak menghemat penggunaan minyak, memperpanjang masa simpan keripik, dan menjaga kualitas produk tetap renyah."
  },
  {
    "id": 259,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Agar keuangan usaha warung kelontong tidak bangkrut tergerus kebutuhan keluarga, penerapan literasi keuangan dasar yang wajib dijalankan pemilik adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengambil uang kas warung kapan saja saat hendak berbelanja"
      },
      {
        "key": "B",
        "text": "Menolak mencatat transaksi karena merasa sudah hafal di ingatan"
      },
      {
        "key": "C",
        "text": "Memberikan utang tanpa batas kepada seluruh tetangga sekitar"
      },
      {
        "key": "D",
        "text": "Menyimpan seluruh modal di dompet pribadi tanpa pembukuan kas"
      },
      {
        "key": "E",
        "text": "Memisahkan rekening kas usaha dengan keuangan rumah tangga"
      }
    ],
    "correct": "E",
    "explanation": "Pemisahan rekening dan pencatatan kas antara modal usaha dengan belanja pribadi adalah fondasi tata kelola keuangan yang sehat untuk kelangsungan UMKM."
  },
  {
    "id": 260,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Seorang wirausahawan muda di Martapura ingin melegalkan usaha kopi seduh lokalnya. Langkah praktis pendaftaran izin usaha mikro melalui sistem OSS adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengajukan Nomor Induk Berusaha secara elektronik di laman OSS"
      },
      {
        "key": "B",
        "text": "Membayar upeti tunai kepada petugas ronda malam perumahan"
      },
      {
        "key": "C",
        "text": "Memasang plang nama kafe besar di perempatan jalan raya protokol"
      },
      {
        "key": "D",
        "text": "Membuat akun media sosial kafe dengan ribuan pengikut palsu"
      },
      {
        "key": "E",
        "text": "Meminta surat izin lisan kepada tetangga sebelah kedai kopi"
      }
    ],
    "correct": "A",
    "explanation": "Pendaftaran NIB (Nomor Induk Berusaha) melalui Online Single Submission (OSS) merupakan prosedur resmi dan mudah untuk melegalkan izin usaha UMKM."
  },
  {
    "id": 261,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Produsen rengginang di Belitang menerapkan ketentuan uang muka 40% saat menerima pesanan pesta hajatan. Penerapan kebijakan ini bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menakut-nakuti calon pembeli agar membatalkan pesanan hajatan"
      },
      {
        "key": "B",
        "text": "Menjamin ketersediaan modal bahan baku dan mitigasi pembatalan"
      },
      {
        "key": "C",
        "text": "Menghindari pencatatan bukti transaksi pada buku kas penjualan"
      },
      {
        "key": "D",
        "text": "Membiayai liburan keluarga pemilik usaha sebelum pesanan selesai"
      },
      {
        "key": "E",
        "text": "Menyerahkan risiko kenaikan harga beras ketan kepada pembeli"
      }
    ],
    "correct": "B",
    "explanation": "Penerapan uang muka (DP) memberikan kepastian permodalan untuk membeli bahan baku serta melindungi pelaku usaha dari risiko kerugian akibat pesanan fiktif."
  },
  {
    "id": 262,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Seorang guru SMA di Belitang menerima gaji bulanan dan mengalokasikannya ke dalam tabungan pensiun, belanja warung sekitar, dan infak. Guru tersebut menerapkan...",
    "options": [
      {
        "key": "A",
        "text": "Pola konsumsi spekulatif berisiko tinggi di pasar komoditas"
      },
      {
        "key": "B",
        "text": "Prinsip penimbunan uang tunai tanpa perputaran produktif"
      },
      {
        "key": "C",
        "text": "Manajemen anggaran seimbang berorientasi masa depan dan sosial"
      },
      {
        "key": "D",
        "text": "Perilaku hidup boros memamerkan gaya hidup mewah di medsos"
      },
      {
        "key": "E",
        "text": "Penolakan terhadap sistem perbankan nasional yang sah"
      }
    ],
    "correct": "C",
    "explanation": "Membagi pos penghasilan untuk tabungan, kebutuhan konsumsi lokal, dan filantropi sosial mencerminkan literasi perencanaan keuangan pribadi yang bijak."
  },
  {
    "id": 263,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Pemilik bengkel las alat mesin pertanian di Belitang mengizinkan petani membayar biaya perbaikan setelah panen padi (sistem yarnen). Pelayanan ini menerapkan...",
    "options": [
      {
        "key": "A",
        "text": "Kecerobohan finansial yang pasti membangkrutkan usaha bengkel"
      },
      {
        "key": "B",
        "text": "Praktik riba terselubung yang dilarang norma agama setempat"
      },
      {
        "key": "C",
        "text": "Tuntutan sepihak dari gabungan kelompok tani desa sebelah"
      },
      {
        "key": "D",
        "text": "Kemitraan berbasis kearifan lokal siklus pendapatan musiman"
      },
      {
        "key": "E",
        "text": "Penolakan terhadap uang kartal resmi rupiah dari pemerintah"
      }
    ],
    "correct": "D",
    "explanation": "Sistem 'bayar panen' (yarnen) merupakan bentuk adaptasi ekonomi kultural yang memperhitungkan likuiditas arus kas petani yang bersifat musiman."
  },
  {
    "id": 264,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Koperasi sekolah SMAN 1 Belitang bekerja sama dengan kelompok UMKM kue tradisional setempat untuk mengisi etalase kantin. Praktik ini menerapkan...",
    "options": [
      {
        "key": "A",
        "text": "Monopoli perdagangan yang mematikan kantin guru sekolah"
      },
      {
        "key": "B",
        "text": "Pemaksaan konsumsi makanan manis berlebih pada siswa"
      },
      {
        "key": "C",
        "text": "Pelanggaran aturan kebersihan makanan higienis di sekolah"
      },
      {
        "key": "D",
        "text": "Pengurangan alokasi waktu belajar kurikulum akademik siswa"
      },
      {
        "key": "E",
        "text": "Sinergi kelembagaan ekonomi edukatif dan pemberdayaan UMKM"
      }
    ],
    "correct": "E",
    "explanation": "Kemitraan koperasi sekolah dengan produsen lokal mengedukasi siswa berwirausaha sekaligus memberdayakan rantai pasok ekonomi warga sekitar sekolah."
  },
  {
    "id": 265,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Di tengah menjamurnya minimarket modern di Belitang, toko kelontong tradisional tetap mampu bertahan. Analisis keunggulan komparatif toko kelontong adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kedekatan personal emosional dan fleksibilitas eceran kecil"
      },
      {
        "key": "B",
        "text": "Kelengkapan sistem pendingin udara dan kasir komputer otomatis"
      },
      {
        "key": "C",
        "text": "Dukungan dana talangan modal tanpa batas dari investor asing"
      },
      {
        "key": "D",
        "text": "Kewajiban warga desa untuk hanya belanja di toko kelontong"
      },
      {
        "key": "E",
        "text": "Harga barang kelontong yang disubsidi penuh oleh APBD daerah"
      }
    ],
    "correct": "A",
    "explanation": "Toko kelontong memiliki modal relasi sosial personal yang akrab, melayani pembelian eceran kecil, serta terkadang memberi kemudahan kasbon darurat."
  },
  {
    "id": 266,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Banyak produk keripik pisang lokal OKU Timur kesulitan menembus gerai swalayan modern di Palembang. Analisis kendala internal utama menunjukkan kelemahan pada...",
    "options": [
      {
        "key": "A",
        "text": "Rasa keripik pisang lokal yang tidak disukai lidah konsumen"
      },
      {
        "key": "B",
        "text": "Konsistensi mutu kemasan, legalitas izin, dan pasokan kontinu"
      },
      {
        "key": "C",
        "text": "Jarak geografis jalan darat antara OKU Timur dan Palembang"
      },
      {
        "key": "D",
        "text": "Larangan membawa produk hasil pertanian keluar dari kabupaten"
      },
      {
        "key": "E",
        "text": "Ketiadaan pisang berkualitas di seluruh perkebunan lokal"
      }
    ],
    "correct": "B",
    "explanation": "Ritel modern mensyaratkan standar kemasan berlabel barcode, izin edar resmi, informasi nilai gizi, serta jaminan ketersediaan stok yang stabil."
  },
  {
    "id": 267,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Saat komoditas perkebunan karet dan sawit mengalami penurunan harga drastis, perputaran ekonomi di Belitang tidak mati total. Analisis makroekonomi menunjukkan...",
    "options": [
      {
        "key": "A",
        "text": "Pemerintah pusat membagikan uang tunai kepada setiap warga"
      },
      {
        "key": "B",
        "text": "Petani beralih mencetak uang sendiri untuk memenuhi kebutuhan"
      },
      {
        "key": "C",
        "text": "Sektor pangan padi sawah dan gaji pekerja formal jadi penyangga"
      },
      {
        "key": "D",
        "text": "Seluruh warga OKU Timur berhenti mengonsumsi bahan makanan"
      },
      {
        "key": "E",
        "text": "Harga beras di pasar Gumawang langsung anjlok mendekati nol"
      }
    ],
    "correct": "C",
    "explanation": "Struktur ekonomi OKU Timur memiliki diversifikasi kuat: ketahanan panen padi sawah irigasi dan gaji tetap sektor formal berfungsi sebagai penstabil guncangan ekonomi."
  },
  {
    "id": 268,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Mengapa skema arisan kelompok pedagang di Pasar Gumawang tetap lestari meski banyak tawaran pinjaman daring instan? Analisis komparatif menunjukkan faktor penentunya...",
    "options": [
      {
        "key": "A",
        "text": "Pinjaman daring memberikan bunga pinjaman nol persen mutlak"
      },
      {
        "key": "B",
        "text": "Pedagang pasar dilarang memiliki gawai pintar telepon seluler"
      },
      {
        "key": "C",
        "text": "Arisan pasar diawasi langsung oleh satuan polisi pamong praja"
      },
      {
        "key": "D",
        "text": "Arisan mengedepankan modal sosial kepercayaan tanpa jeratan bunga"
      },
      {
        "key": "E",
        "text": "Seluruh peserta arisan wajib membayar iuran setiap jam kerja"
      }
    ],
    "correct": "D",
    "explanation": "Arisan pasar mengintegrasikan fungsi tabungan bergulir dengan silaturahmi sosial, bebas biaya bunga tinggi, dan terhindar dari teror penagihan pinjol ilegal."
  },
  {
    "id": 269,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Analisis dampak perluasan jaringan internet dan agen bank digital di pedesaan OKU Timur terhadap perilaku ekonomi keluarga petani menunjukkan adanya...",
    "options": [
      {
        "key": "A",
        "text": "Penurunan drastis minat anak petani untuk melanjutkan kuliah"
      },
      {
        "key": "B",
        "text": "Hilangnya kebutuhan transportasi jalan raya antar-kecamatan"
      },
      {
        "key": "C",
        "text": "Kenaikan biaya hidup tanpa diimbangi kemudahan transaksi"
      },
      {
        "key": "D",
        "text": "Pemusatan seluruh uang petani ke bank-bank di luar negeri"
      },
      {
        "key": "E",
        "text": "Efisiensi waktu transfer transaksi dan akses modal lebih terbuka"
      }
    ],
    "correct": "E",
    "explanation": "Digitalisasi memangkas jarak dan waktu perjalanan ke kantor bank di kota kecamatan, mempercepat pembayaran belanja usaha, dan memperluas literasi tabungan."
  },
  {
    "id": 270,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "UMKM olahan pangan perdesaan OKU Timur terbukti tangguh saat terjadi goncangan ekonomi nasional. Analisis ketahanan tersebut membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Bertumpu pada bahan baku lokal dan pasar kebutuhan pokok nyata"
      },
      {
        "key": "B",
        "text": "Mendapat suntikan dana talangan devisa dari bank internasional"
      },
      {
        "key": "C",
        "text": "Mempekerjakan tenaga ahli asing dengan gaji standar dunia"
      },
      {
        "key": "D",
        "text": "Tidak terikat sama sekali dengan mata uang rupiah Indonesia"
      },
      {
        "key": "E",
        "text": "Memiliki kekebalan hukum khusus dari kementerian perdagangan"
      }
    ],
    "correct": "A",
    "explanation": "Ketahanan UMKM berbasis agribisnis bertumpu pada kemandirian bahan baku lokal dan memproduksi komoditas pangan yang selalu dibutuhkan masyarakat setiap hari."
  },
  {
    "id": 271,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Ketergantungan sebagian pedagang kecil pasar terhadap rentenir keliling (bank harian) dianalisis secara struktural bersumber dari...",
    "options": [
      {
        "key": "A",
        "text": "Bunga pinjaman rentenir yang jauh lebih rendah daripada bank"
      },
      {
        "key": "B",
        "text": "Proses pencairan rentenir cepat tanpa syarat agunan sertifikat"
      },
      {
        "key": "C",
        "text": "Kewajiban pemerintah daerah untuk meminjam kepada rentenir"
      },
      {
        "key": "D",
        "text": "Larangan bagi pedagang kecil untuk membuka rekening tabungan"
      },
      {
        "key": "E",
        "text": "Ketiadaan uang kartal rupiah di kantor perbankan resmi daerah"
      }
    ],
    "correct": "B",
    "explanation": "Pedagang mikro sering terpaksa meminjam ke rentenir karena butuh uang tunai saat itu juga untuk belanja subuh, sedangkan prosedur kredit bank formal membutuhkan waktu verifikasi."
  },
  {
    "id": 272,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Analisis posisi tawar petani padi OKU Timur yang sering lebih lemah dibanding pedagang perantara (tengkulak) menunjukkan akar masalah pada...",
    "options": [
      {
        "key": "A",
        "text": "Kualitas gabah beras Belitang yang tidak memenuhi selera pasar"
      },
      {
        "key": "B",
        "text": "Jumlah petani padi yang terlalu sedikit di seluruh kabupaten"
      },
      {
        "key": "C",
        "text": "Keterdesakan likuiditas tunai dan ketiadaan sarana pengeringan"
      },
      {
        "key": "D",
        "text": "Peraturan dinas pertanian yang mewajibkan penjualan ke tengkulak"
      },
      {
        "key": "E",
        "text": "Larangan bagi petani untuk menggiling gabahnya di pabrik sendiri"
      }
    ],
    "correct": "C",
    "explanation": "Petani sering harus segera melunasi utang saprodi atau biaya hidup pascapanen dan tidak memiliki lumbung/lantai jemur sendiri, sehingga terpaksa menjual gabah basah dengan harga rendah."
  },
  {
    "id": 273,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Ketika mengevaluasi proposal permodalan bagi koperasi produsen kemplang di Belitang, kriteria kelayakan finansial yang paling krusial dinilai adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kedekatan hubungan kekerabatan ketua dengan camat setempat"
      },
      {
        "key": "B",
        "text": "Desain logo koperasi yang dibuat dengan warna menyolok"
      },
      {
        "key": "C",
        "text": "Banyaknya janji keuntungan tanpa dasar perhitungan rasional"
      },
      {
        "key": "D",
        "text": "Analisis arus kas rasional, kapasitas bayar, dan rekam jejak"
      },
      {
        "key": "E",
        "text": "Kemegahan gedung kantor sekretariat koperasi di jalan raya"
      }
    ],
    "correct": "D",
    "explanation": "Kelayakan pembiayaan usaha diukur dari proyeksi arus kas riil, rasio kemampuan membayar kewajiban, dan integritas rekam jejak usaha para pengurusnya."
  },
  {
    "id": 274,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Pemerintah daerah merencanakan penataan pedagang kaki lima di sekitar Pasar Gumawang ke sentra kuliner modern. Evaluasi dampak kebijakan ini menunjukkan...",
    "options": [
      {
        "key": "A",
        "text": "Pasti mematikan seluruh usaha kuliner warga dalam waktu singkat"
      },
      {
        "key": "B",
        "text": "Menimbulkan kemacetan lalu lintas yang lebih parah di jalan utama"
      },
      {
        "key": "C",
        "text": "Mewajibkan pedagang menjual makanan khas luar negeri yang mahal"
      },
      {
        "key": "D",
        "text": "Menghapuskan fungsi pasar tradisional sebagai sarana interaksi"
      },
      {
        "key": "E",
        "text": "Meningkatkan higienitas, kenyamanan pembeli, dan ketertiban jalan"
      }
    ],
    "correct": "E",
    "explanation": "Relokasi tertata ke sentra kuliner yang bersih meningkatkan daya tarik wisata kuliner, mempermudah pengawasan sanitasi, dan melancarkan arus lalu lintas."
  },
  {
    "id": 275,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Menilai strategi penetapan harga produk olahan UMKM lokal OKU Timur saat memasuki etalase pasar daring nasional, strategi paling sehat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Berbasis biaya produksi riil ditambah margin wajar dan mutu"
      },
      {
        "key": "B",
        "text": "Perang tarif banting harga serendah mungkin di bawah biaya modal"
      },
      {
        "key": "C",
        "text": "Menetapkan harga sepuluh kali lipat untuk menjerat pembeli awam"
      },
      {
        "key": "D",
        "text": "Mengubah-ubah harga setiap jam mengikuti suasana hati penjual"
      },
      {
        "key": "E",
        "text": "Menjual gratis seluruh stok produk demi mengejar jumlah ulasan"
      }
    ],
    "correct": "A",
    "explanation": "Penetapan harga berbasis nilai (value-based pricing) dan kalkulasi HPP yang akurat memastikan kelangsungan operasional tanpa terjebak perang harga yang merugikan."
  },
  {
    "id": 276,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Evaluasi terhadap program pelatihan akuntansi buku kas digital bagi ibu-ibu pengrajin rengginang di Belitang berhasil apabila terbukti...",
    "options": [
      {
        "key": "A",
        "text": "Seluruh peserta mendapatkan bingkisan cinderamata saat penutupan"
      },
      {
        "key": "B",
        "text": "Peserta mampu mengontrol pengeluaran dan mengetahui laba riil"
      },
      {
        "key": "C",
        "text": "Ruang pelatihan berpendingin udara dan dihadiri pejabat daerah"
      },
      {
        "key": "D",
        "text": "Peserta membeli telepon genggam termahal setelah selesai acara"
      },
      {
        "key": "E",
        "text": "Pengrajin berhenti memproduksi rengginang dan membuka usaha lain"
      }
    ],
    "correct": "B",
    "explanation": "Indikator keberhasilan pelatihan literasi keuangan adalah keterampilan praktis peserta dalam mencatat arus kas masuk-keluar secara mandiri dan disiplin."
  },
  {
    "id": 277,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Menghadapi persaingan camilan pabrikan modern berkemasan menarik, penilaian strategi terbaik untuk memperkuat daya saing camilan UMKM lokal adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meniru persis merek dan logo pabrikan terkenal secara ilegal"
      },
      {
        "key": "B",
        "text": "Menuntut pemerintah melarang peredaran semua camilan modern"
      },
      {
        "key": "C",
        "text": "Meningkatkan estetika kemasan, legalitas, dan narasi lokalitas"
      },
      {
        "key": "D",
        "text": "Mengurangi takaran bumbu asli dan mengganti pemanis buatan"
      },
      {
        "key": "E",
        "text": "Memaksa warung-warung desa menyembunyikan produk pabrikan"
      }
    ],
    "correct": "C",
    "explanation": "Peningkatan mutu kemasan (packaging), higienitas, dan kekuatan narasi budaya (storytelling) kearifan lokal memberikan nilai tambah yang membedakan produk UMKM."
  },
  {
    "id": 278,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Kebijakan pemerintah daerah yang mewajibkan konsumsi kudapan rapat dinas bersumber dari UMKM lokal perdesaan dinilai secara ekonomi telah...",
    "options": [
      {
        "key": "A",
        "text": "Memboroskan anggaran daerah tanpa ada dampak ekonomi positif"
      },
      {
        "key": "B",
        "text": "Menurunkan kualitas gizi para pegawai birokrasi pemerintahan"
      },
      {
        "key": "C",
        "text": "Melanggar prinsip persaingan usaha terbuka di bursa nasional"
      },
      {
        "key": "D",
        "text": "Menciptakan captive market yang menggerakkan ekonomi mikro lokal"
      },
      {
        "key": "E",
        "text": "Menyebabkan kelangkaan beras ketan di pasar tradisional Gumawang"
      }
    ],
    "correct": "D",
    "explanation": "Kebijakan pengadaan lokal (local procurement) menciptakan pasar pasti (captive market) yang menyuntikkan likuiditas APBD langsung ke kas produsen makanan kecil."
  },
  {
    "id": 279,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Menilai keberhasilan program kredit lunak ultra mikro bagi pedagang lapak sayur di pasar tradisional Martapura, tolok ukur utamanya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Seberapa megah baliho promosi bank yang dipasang di pintu pasar"
      },
      {
        "key": "B",
        "text": "Tingkat suku bunga kredit yang dinaikkan berkala setiap bulan"
      },
      {
        "key": "C",
        "text": "Banyaknya pedagang yang meminjam dana untuk berlibur ke luar kota"
      },
      {
        "key": "D",
        "text": "Keharusan pedagang menyerahkan akta tanah rumah tempat tinggal"
      },
      {
        "key": "E",
        "text": "Kelancaran pengembalian modal dan lepasnya pedagang dari rentenir"
      }
    ],
    "correct": "E",
    "explanation": "Tujuan pembiayaan mikro adalah membebaskan pedagang kecil dari jerat bunga rentenir dan meningkatkan modal kerja mandiri secara berkesinambungan."
  },
  {
    "id": 280,
    "day": 2,
    "indicatorCode": "B",
    "indicatorKey": "modul_b_budaya_ekonomi_umkm",
    "indicatorName": "Hubungan Budaya dengan Kegiatan Ekonomi, UMKM, dan Pekerjaan Formal",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Evaluasi terhadap rencana pengembangan sentra pandai besi di Belitang menjadi produsen alat pertanian modern regional menyimpulkan prioritas utama berupa...",
    "options": [
      {
        "key": "A",
        "text": "Standardisasi kualitas logam, pelatihan mekanik, dan sertifikasi"
      },
      {
        "key": "B",
        "text": "Membongkar seluruh bengkel tradisional dan mengganti toko impor"
      },
      {
        "key": "C",
        "text": "Melarang petani menggunakan alat pertanian buatan pabrik besar"
      },
      {
        "key": "D",
        "text": "Mewajibkan para empu pandai besi bekerja tanpa menggunakan mesin"
      },
      {
        "key": "E",
        "text": "Menetapkan harga jual perkakas besi setinggi mungkin di pasaran"
      }
    ],
    "correct": "A",
    "explanation": "Peningkatan kapabilitas pandai besi lokal menuju produsen alsintan membutuhkan standardisasi metalurgi, pelatihan teknik permesinan presisi, dan uji kelayakan SNI."
  },
  {
    "id": 281,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Predikat lumbung pangan utama Provinsi Sumatera Selatan yang disandang oleh Kabupaten OKU Timur terutama ditopang oleh keunggulan produksi komoditas...",
    "options": [
      {
        "key": "A",
        "text": "Kopi robusta dataran tinggi pegunungan"
      },
      {
        "key": "B",
        "text": "Garam kristal tambak pesisir laut dangkal"
      },
      {
        "key": "C",
        "text": "Padi sawah irigasi teknis terhampar luas"
      },
      {
        "key": "D",
        "text": "Bawang merah umbi dataran tinggi dingin"
      },
      {
        "key": "E",
        "text": "Tembakau kering bahan baku rokok kretek"
      }
    ],
    "correct": "C",
    "explanation": "Kabupaten OKU Timur adalah salah satu penghasil beras terbesar di Pulau Sumatera berkat hamparan puluhan ribu hektar sawah irigasi Komering."
  },
  {
    "id": 282,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Istilah pola musim tanam padi sawah di Belitang yang dimulai pada awal musim penghujan (musim basah) lazim disebut musim tanam...",
    "options": [
      {
        "key": "A",
        "text": "Gadu kedua di puncak kemarau kering"
      },
      {
        "key": "B",
        "text": "Palawija selingan tanah bera kosong"
      },
      {
        "key": "C",
        "text": "Labuhan menjelang pasang air muara"
      },
      {
        "key": "D",
        "text": "Rendengan dengan ketersediaan air melimpah"
      },
      {
        "key": "E",
        "text": "Tumpang sari bedengan sayuran hijau"
      }
    ],
    "correct": "D",
    "explanation": "Musim rendengan (rendeng) adalah musim tanam utama pada periode musim hujan di mana pasokan air irigasi dan curah hujan sangat melimpah."
  },
  {
    "id": 283,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Praktik pergiliran tanaman palawija (seperti jagung atau kedelai) di lahan sawah setelah dua musim tanam padi secara agronomis bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mempercepat penurunan harga jual gabah di pasar"
      },
      {
        "key": "B",
        "text": "Menghilangkan genangan air selamanya dari persawahan"
      },
      {
        "key": "C",
        "text": "Mengundang hama tikus sawah berpindah ke pemukiman"
      },
      {
        "key": "D",
        "text": "Menghentikan seluruh penggunaan pupuk kompos organik"
      },
      {
        "key": "E",
        "text": "Memutus daur hidup hama dan memulihkan hara tanah"
      }
    ],
    "correct": "E",
    "explanation": "Rotasi tanaman dengan palawija memutus rantai hidup serangga/hama padi serta mengembalikan unsur hara (seperti nitrogen lewat tanaman legum)."
  },
  {
    "id": 284,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Cairan getah kental berwarna putih susu hasil penyadapan kulit batang pohon karet rakyat di OKU Timur secara teknis disebut...",
    "options": [
      {
        "key": "A",
        "text": "Lateks getah alami pohon hevea"
      },
      {
        "key": "B",
        "text": "Resin damar wangi getah pinus"
      },
      {
        "key": "C",
        "text": "Nira manis cairan tandan enau"
      },
      {
        "key": "D",
        "text": "Minyak atsiri daun serai wangi"
      },
      {
        "key": "E",
        "text": "Terpentin pelarut cat industri"
      }
    ],
    "correct": "A",
    "explanation": "Getah hasil sadapan pohon karet (Hevea brasiliensis) berupa cairan emulsi hidrokarbon polimer yang disebut lateks."
  },
  {
    "id": 285,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Bahan koagulan pembeku getah karet yang dianjurkan dinas perkebunan agar menghasilkan bokar berkualitas tinggi dan tidak berbau busuk adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tawas penjernih air dan pupuk urea"
      },
      {
        "key": "B",
        "text": "Asam format atau asam semut standar"
      },
      {
        "key": "C",
        "text": "Air cuka dapur sintetis kadar rendah"
      },
      {
        "key": "D",
        "text": "Limbah air aki bekas kendaraan bermotor"
      },
      {
        "key": "E",
        "text": "Bubuk deterjen pencuci pakaian berbusa"
      }
    ],
    "correct": "B",
    "explanation": "Asam format (asam semut) adalah bahan pembeku lateks standar yang menghasilkan karet bekuan (bokar) elastis, berbobot kering tinggi, dan tidak merusak mutu."
  },
  {
    "id": 286,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Komoditas perikanan air tawar budidaya kolam tanah yang menjadi sentra produksi unggulan dan bahan baku industri pangan di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ikan salmon laut dingin atlantik utara"
      },
      {
        "key": "B",
        "text": "Kepiting bakau tambak air payau muara"
      },
      {
        "key": "C",
        "text": "Ikan patin siam dan lele sangkuriang"
      },
      {
        "key": "D",
        "text": "Udang lobster mutiara terumbu karang"
      },
      {
        "key": "E",
        "text": "Ikan bandeng presto duri lunak pesisir"
      }
    ],
    "correct": "C",
    "explanation": "Belitang dikenal sebagai sentra budidaya kolam ikan patin dan lele air tawar terbesar yang memasok kebutuhan pasar ikan dan bahan baku kemplang di Sumsel."
  },
  {
    "id": 287,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Bangsa ternak sapi pedaging yang paling adaptif dan banyak dipelihara secara turun-temurun oleh peternak di pedesaan Belitang OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sapi perah Frisian Holstein belang hitam"
      },
      {
        "key": "B",
        "text": "Sapi kerdil pegunungan dataran tinggi Dieng"
      },
      {
        "key": "C",
        "text": "Sapi yak berbulu tebal pegunungan Himalaya"
      },
      {
        "key": "D",
        "text": "Sapi Bali dan peranakan ongole tahan panas"
      },
      {
        "key": "E",
        "text": "Sapi wagyu pemakan gandum fermentasi khusus"
      }
    ],
    "correct": "D",
    "explanation": "Sapi Bali dan Sapi Peranakan Ongole (PO) sangat populer di OKU Timur karena adaptif terhadap iklim tropis, pakannya mudah, dan daya tahan penyakitnya kuat."
  },
  {
    "id": 288,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Bagian buah kelapa sawit yang dipanen dari pohon dan diangkut menggunakan truk menuju Pabrik Kelapa Sawit (PKS) dikenal dengan singkatan...",
    "options": [
      {
        "key": "A",
        "text": "BBM bahan bakar minyak diesel nabati"
      },
      {
        "key": "B",
        "text": "CPO minyak mentah sawit olahan tangki"
      },
      {
        "key": "C",
        "text": "PKO minyak inti kelapa sawit murni"
      },
      {
        "key": "D",
        "text": "PKP pengusaha kena pajak hasil perkebunan"
      },
      {
        "key": "E",
        "text": "TBS tandan buah segar hasil panen kebun"
      }
    ],
    "correct": "E",
    "explanation": "TBS (Tandan Buah Segar) adalah bentuk fisik panen kelapa sawit segar yang langsung dipotong dari pelepah pohon dan dikirim ke pabrik pengolahan."
  },
  {
    "id": 289,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Petani perkebunan karet rakyat di OKU Timur menyadap pohon karet pada waktu subuh dini hari (pukul 04.30–06.30 WIB) karena alasan fisiologis, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Tekanan turgor sel pembuluh lateks tertinggi saat pagi"
      },
      {
        "key": "B",
        "text": "Harga getah karet di pasar lelang turun saat matahari terbit"
      },
      {
        "key": "C",
        "text": "Pohon karet tidak dapat mengeluarkan getah di siang hari"
      },
      {
        "key": "D",
        "text": "Menghindari pemeriksaan petugas dinas kehutanan setempat"
      },
      {
        "key": "E",
        "text": "Kulit pohon karet hanya melunak ketika malam hari saja"
      }
    ],
    "correct": "A",
    "explanation": "Pada pagi hari suhu masih sejuk dan kelembapan tinggi, menyebabkan tekanan turgor sel lateks maksimal sehingga getah mengalir lebih deras dan lama."
  },
  {
    "id": 290,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Sistem integrasi tanaman pangan padi sawah dan peternakan rakyat (crop-livestock integration) di Belitang OKU Timur memberikan keuntungan simbiosis berupa...",
    "options": [
      {
        "key": "A",
        "text": "Sapi dapat dipelihara langsung di dalam petak sawah basah"
      },
      {
        "key": "B",
        "text": "Jerami padi jadi pakan sapi, kotoran jadi pupuk organik"
      },
      {
        "key": "C",
        "text": "Padi sawah tidak lagi membutuhkan air irigasi sama sekali"
      },
      {
        "key": "D",
        "text": "Petani dibebaskan dari seluruh biaya pajak bumi bangunan"
      },
      {
        "key": "E",
        "text": "Daging sapi otomatis memiliki aroma wangi beras pandan"
      }
    ],
    "correct": "B",
    "explanation": "Integrasi pertanian dan peternakan menciptakan sistem pertanian sirkular: limbah jerami dimanfaatkan untuk pakan sapi, dan kotoran sapi difermentasi menjadi pupuk kandang."
  },
  {
    "id": 291,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Ketika harga getah karet di pasar dunia mengalami penurunan drastis, dampak ekonomi langsung yang dialami keluarga petani karet di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Keluarga petani beralih membeli mobil mewah tunai"
      },
      {
        "key": "B",
        "text": "Jumlah pohon karet di kebun mati secara serentak"
      },
      {
        "key": "C",
        "text": "Penurunan pendapatan harian dan pengetatan belanja"
      },
      {
        "key": "D",
        "text": "Kenaikan drastis upah buruh sadap di perkebunan"
      },
      {
        "key": "E",
        "text": "Pasar tradisional Gumawang kehabisan stok beras"
      }
    ],
    "correct": "C",
    "explanation": "Karena pendapatan petani karet sangat bergantung pada harga lelang mingguan, anjloknya harga karet menekan likuiditas belanja harian keluarga petani."
  },
  {
    "id": 292,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Pembudidaya ikan patin kolam tanah di Belitang sangat bergantung pada jaringan saluran irigasi teknis Komering karena...",
    "options": [
      {
        "key": "A",
        "text": "Ikan patin hanya dapat hidup pada air asin laut lepas"
      },
      {
        "key": "B",
        "text": "Irigasi digunakan untuk membuang bangkai ikan ke sungai"
      },
      {
        "key": "C",
        "text": "Saluran irigasi merupakan tempat penjualan tiket wisata"
      },
      {
        "key": "D",
        "text": "Membutuhkan pasokan air segar kontinu penyuplai oksigen"
      },
      {
        "key": "E",
        "text": "Ikan patin diberi makan lumut dasar saluran bendung"
      }
    ],
    "correct": "D",
    "explanation": "Sirkulasi air mengalir dari saluran irigasi menjaga kualitas air kolam, membuang sisa amonia pakan, dan mencukupi kadar oksigen terlarut bagi pertumbuhan ikan."
  },
  {
    "id": 293,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Perbedaan karakteristik masa panen antara tanaman perkebunan kelapa sawit dengan tanaman pangan padi sawah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Padi sawah dipanen setiap minggu sepanjang tahun"
      },
      {
        "key": "B",
        "text": "Kelapa sawit hanya dipanen sekali seumur hidup pohon"
      },
      {
        "key": "C",
        "text": "Padi sawah menghasilkan buah berupa tandan berbobot berat"
      },
      {
        "key": "D",
        "text": "Kelapa sawit dipanen setelah menunggu seratus tahun tanam"
      },
      {
        "key": "E",
        "text": "Sawit dipanen berkala 10–14 hari, padi musiman 110 hari"
      }
    ],
    "correct": "E",
    "explanation": "Kelapa sawit merupakan tanaman tahunan yang dapat dipanen rutin setiap putaran dua minggu, sedangkan padi adalah tanaman semusim dengan siklus sekitar 3,5–4 bulan."
  },
  {
    "id": 294,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Penanaman kacang-kacangan di pematang sawah atau saat jeda tanam oleh petani Belitang secara ilmiah menyuburkan tanah karena...",
    "options": [
      {
        "key": "A",
        "text": "Bintil akar bersimbiosis dengan Rhizobium pengikat N2"
      },
      {
        "key": "B",
        "text": "Akar kacang menyerap seluruh air tanah hingga sangat kering"
      },
      {
        "key": "C",
        "text": "Daun kacang mengeluarkan zat racun pembunuh cacing tanah"
      },
      {
        "key": "D",
        "text": "Tanaman kacang menghasilkan pupuk urea kimia pabrikan"
      },
      {
        "key": "E",
        "text": "Batang kacang dapat menyerap logam berat berbahaya tanah"
      }
    ],
    "correct": "A",
    "explanation": "Bakteri Rhizobium pada bintil akar legum mampu mengikat nitrogen bebas di udara dan mengubahnya menjadi nitrat penyubur tanah alami."
  },
  {
    "id": 295,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Alasan utama mengapa sebagian petani di Belitang memilih menjual hasil panennya dalam bentuk Gabah Kering Panen (GKP) di petak sawah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dilarang membawa gabah keluar melintasi batas pematang"
      },
      {
        "key": "B",
        "text": "Ketiadaan sarana penjemuran dan kebutuhan uang tunai segera"
      },
      {
        "key": "C",
        "text": "Harga gabah basah di sawah selalu lebih tinggi dari beras"
      },
      {
        "key": "D",
        "text": "Tengkulak mewajibkan gabah dibeli sebelum mesin panen tiba"
      },
      {
        "key": "E",
        "text": "Beras Belitang tidak laku jika dijual dalam bentuk beras giling"
      }
    ],
    "correct": "B",
    "explanation": "Ketiadaan lantai jemur luas saat panen raya dan kebutuhan mendesak melunasi biaya sewa alat/saprodi mendorong petani menjual gabah segar (GKP)."
  },
  {
    "id": 296,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Tradisi menggembalakan itik di petak sawah pascapanen (sistem angon) di pedesaan Belitang memberikan manfaat ekologis dan ekonomis, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Itik merusak seluruh saluran irigasi tersier persawahan"
      },
      {
        "key": "B",
        "text": "Petani tidak perlu lagi menanam bibit padi pada musim depan"
      },
      {
        "key": "C",
        "text": "Itik memakan sisa gabah dan hama keong, kotoran jadi pupuk"
      },
      {
        "key": "D",
        "text": "Daging itik secara otomatis berubah menjadi pupuk urea sawah"
      },
      {
        "key": "E",
        "text": "Menghilangkan kebutuhan air irigasi sepanjang musim tanam"
      }
    ],
    "correct": "C",
    "explanation": "Itik memakan gabah rontok dan memangsa hama keong mas serta serangga sawah, sementara kotoran itik menyuburkan tanah sawah secara alami."
  },
  {
    "id": 297,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Seorang petani Belitang memanen lahan 1 hektar dengan hasil 6 ton GKP. Jika harga jual GKP Rp6.000/kg dan total biaya operasional Rp16.000.000, laba bersih petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp10.000.000 dari hasil panen"
      },
      {
        "key": "B",
        "text": "Rp12.000.000 dari hasil panen"
      },
      {
        "key": "C",
        "text": "Rp15.000.000 dari hasil panen"
      },
      {
        "key": "D",
        "text": "Rp20.000.000 dari hasil panen"
      },
      {
        "key": "E",
        "text": "Rp36.000.000 dari hasil panen"
      }
    ],
    "correct": "D",
    "explanation": "Penerimaan total = 6.000 kg x Rp6.000 = Rp36.000.000. Laba bersih = Rp36.000.000 - Rp16.000.000 = Rp20.000.000."
  },
  {
    "id": 298,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Pembudidaya ikan patin di Belitang ingin menghemat biaya pakan pelet pabrikan yang mahal. Penerapan formulasi pakan alternatif yang tepat dan bergizi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memberikan sampah plastik kemasan yang dicacah sangat halus"
      },
      {
        "key": "B",
        "text": "Memberikan potongan rumput liar lapangan tanpa campuran gizi"
      },
      {
        "key": "C",
        "text": "Menghentikan pemberian pakan total selama dua bulan budidaya"
      },
      {
        "key": "D",
        "text": "Memberikan bahan kimia pengawet deterjen ke dalam kolam"
      },
      {
        "key": "E",
        "text": "Mengolah maggot BSF dan limbah ikan rucah terfermentasi"
      }
    ],
    "correct": "E",
    "explanation": "Maggot lalat tentara hitam (BSF) kaya protein tinggi dan limbah ikan fermentasi merupakan pakan alternatif bermutu yang menekan FCR dan biaya produksi."
  },
  {
    "id": 299,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Menghadapi musim kemarau saat debit air saluran irigasi Komering menyusut, keputusan pola tanam paling tepat yang harus diterapkan petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Beralih menanam komoditas palawija hemat air seperti jagung"
      },
      {
        "key": "B",
        "text": "Tetap memaksa menanam padi sawah genangan air tinggi tiga kali"
      },
      {
        "key": "C",
        "text": "Membongkar seluruh tanggul pintu air bendung secara ilegal"
      },
      {
        "key": "D",
        "text": "Menjual seluruh lahan sawah produktif kepada pengembang kota"
      },
      {
        "key": "E",
        "text": "Membiarkan lahan sawah ditumbuhi semak belukar liar tandus"
      }
    ],
    "correct": "A",
    "explanation": "Menanam palawija (jagung, kedelai, kacang hijau) adalah strategi adaptif saat kemarau karena tanaman tersebut membutuhkan air jauh lebih sedikit dibanding padi."
  },
  {
    "id": 300,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Peternak sapi di Belitang memiliki 8 ekor sapi dan menghadapi keluhan bau kotoran kandang dari warga. Penerapan solusi bioteknologi yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuang seluruh kotoran sapi ke dalam aliran sungai Komering"
      },
      {
        "key": "B",
        "text": "Membangun instalasi digester biogas dan fermentasi kompos"
      },
      {
        "key": "C",
        "text": "Menyemprotkan parfum kimia ruangan secara massal di kandang"
      },
      {
        "key": "D",
        "text": "Mengurangi jatah makan sapi agar kotorannya menjadi sedikit"
      },
      {
        "key": "E",
        "text": "Memindahkan kandang sapi ke dalam hutan lindung terlarang"
      }
    ],
    "correct": "B",
    "explanation": "Instalasi digester biogas mengubah kotoran sapi menjadi gas metana untuk memasak serta menghasilkan pupuk organik padat dan cair yang tidak berbau."
  },
  {
    "id": 301,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Pada musim hujan di OKU Timur, getah karet hasil sadapan sering hanyut tersapu air hujan sebelum membeku. Penerapan alat pelindung yang efektif adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyalakan api unggun di bawah setiap pohon karet kebun"
      },
      {
        "key": "B",
        "text": "Membungkus seluruh batang pohon karet dengan terpal plastik"
      },
      {
        "key": "C",
        "text": "Memasang talang pelindung hujan di atas alur bidang sadap"
      },
      {
        "key": "D",
        "text": "Menyadap pohon karet pada saat hujan lebat sedang turun"
      },
      {
        "key": "E",
        "text": "Mengoleskan minyak goreng ke seluruh kulit batang pohon"
      }
    ],
    "correct": "C",
    "explanation": "Pemasangan talang pelindung hujan (rain gutter/rain collar) di atas irisan sadap mengalirkan air hujan menjauhi mangkok sadap, mencegah lateks hanyut."
  },
  {
    "id": 302,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Pekebun kelapa sawit rakyat di Semendawai mendapati daun tua pohon sawitnya menguning merata (gejala klorosis). Penerapan pemupukan yang harus dilakukan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyiram pohon sawit dengan air garam konsentrasi pekat"
      },
      {
        "key": "B",
        "text": "Memberikan herbisida racun rumput di sekitar piringan pohon"
      },
      {
        "key": "C",
        "text": "Memotong seluruh pelepah daun pohon sawit yang menguning"
      },
      {
        "key": "D",
        "text": "Menambahkan pupuk nitrogen (Urea/ZA) dan magnesium (Kieserit)"
      },
      {
        "key": "E",
        "text": "Mengganti tanah perkebunan dengan pasir pantai putih"
      }
    ],
    "correct": "D",
    "explanation": "Klorosis pada daun sawit mengindikasikan defisiensi hara Nitrogen dan Magnesium, yang dapat diatasi dengan aplikasi pupuk Urea dan Kieserit secara berimbang."
  },
  {
    "id": 303,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Ketika terjadi ledakan populasi hama wereng batang cokelat di persawahan Belitang, langkah Pengendalian Hama Terpadu (PHT) yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyemprotkan pestisida dosis sepuluh kali lipat setiap hari"
      },
      {
        "key": "B",
        "text": "Membakar seluruh tanaman padi yang sedang bunting serentak"
      },
      {
        "key": "C",
        "text": "Menutup petak sawah dengan jaring kain hitam sepanjang masa"
      },
      {
        "key": "D",
        "text": "Mengalirkan air hingga merendam seluruh malai padi sawah"
      },
      {
        "key": "E",
        "text": "Pengeringan sawah berkala dan konservasi musuh alami wereng"
      }
    ],
    "correct": "E",
    "explanation": "Prinsip PHT wereng meliputi pengeringan lahan berkala (intermittent irrigation), pelestarian laba-laba predator alami, dan insektisida selektif bila di atas ambang kendali."
  },
  {
    "id": 304,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Peternak ruminansia (peternakan sapi dan kambing) di OKU Timur yang menyiapkan hewan ternaknya untuk momen penjualan Idul Adha menerapkan program penggemukan (fattening) dengan cara...",
    "options": [
      {
        "key": "A",
        "text": "Pemberian hijauan berkualitas dipadu konsentrat dedak terukur"
      },
      {
        "key": "B",
        "text": "Memaksa sapi meminum air garam dalam jumlah berlebihan"
      },
      {
        "key": "C",
        "text": "Mengandangkan sapi di tempat gelap tanpa sirkulasi udara"
      },
      {
        "key": "D",
        "text": "Melarang sapi berbaring sepanjang siang dan malam hari"
      },
      {
        "key": "E",
        "text": "Memberikan pakan bangkai ayam tiren setiap pagi hari"
      }
    ],
    "correct": "A",
    "explanation": "Penggemukan sapi yang sehat dan memenuhi kaidah syariat qurban dilakukan melalui ransum seimbang antara rumput hijauan segar dan pakan penguat (konsentrat dedak/bungkil)."
  },
  {
    "id": 305,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Sebagian petani mengonversi sawah irigasi teknis menjadi kebun kelapa sawit di OKU Timur. Analisis dampak jangka panjang terhadap ketahanan pangan daerah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatkan produksi beras lokal secara berkelanjutan"
      },
      {
        "key": "B",
        "text": "Mengancam status lumbung pangan dan merusak saluran irigasi"
      },
      {
        "key": "C",
        "text": "Membuat harga pupuk subsidi sawah menjadi gratis di kios"
      },
      {
        "key": "D",
        "text": "Menjadikan seluruh petani sawah menjadi jutawan seketika"
      },
      {
        "key": "E",
        "text": "Menghilangkan kebutuhan air minum bagi warga perkotaan"
      }
    ],
    "correct": "B",
    "explanation": "Alih fungsi lahan sawah beririgasi teknis mengurangi luas baku sawah, menurunkan produksi beras daerah, serta mengganggu sistem hidrologi jaringan irigasi persawahan sekitarnya."
  },
  {
    "id": 306,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Mengapa usaha budidaya ikan patin di Belitang sangat rentan terhadap fluktuasi harga pakan pelet pabrikan? Analisis struktur biaya produksi menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Pakan pelet hanya dibutuhkan saat ikan patin sedang sakit"
      },
      {
        "key": "B",
        "text": "Pakan pelet impor dilarang masuk oleh kementerian kelautan"
      },
      {
        "key": "C",
        "text": "Komponen pakan menyerap 65–75% dari total biaya operasional"
      },
      {
        "key": "D",
        "text": "Harga jual ikan patin di pasar ditentukan langsung oleh pembeli"
      },
      {
        "key": "E",
        "text": "Ikan patin memakan pelet hanya pada malam pergantian tahun"
      }
    ],
    "correct": "C",
    "explanation": "Biaya pakan merupakan komponen terbesar (65-75%) dalam budidaya ikan patin, sehingga kenaikan harga pelet tanpa kenaikan harga jual ikan langsung memangkas margin keuntungan petambak."
  },
  {
    "id": 307,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Analisis hubungan antara curah hujan ekstrem dengan hasil produksi perkebunan karet di OKU Timur membuktikan bahwa hari hujan lebat berkepanjangan justru...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatkan kualitas bekuan getah karet menjadi sangat murni"
      },
      {
        "key": "B",
        "text": "Mempercepat pertumbuhan cabang daun pohon karet baru"
      },
      {
        "key": "C",
        "text": "Menaikkan harga lelang getah karet di pasar mingguan desa"
      },
      {
        "key": "D",
        "text": "Menurunkan produksi karena bidang sadap basah dan lateks hanyut"
      },
      {
        "key": "E",
        "text": "Menyebabkan pohon karet menghasilkan minyak kelapa sawit"
      }
    ],
    "correct": "D",
    "explanation": "Batang karet yang basah tidak dapat disadap karena dapat memicu jamur bidang sadap, dan air hujan yang masuk ke mangkok mengencerkan atau menghanyutkan lateks."
  },
  {
    "id": 308,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Penerapan diversifikasi usaha tani (padi sawah, kolam ikan patin, dan ternak sapi) di pedesaan Belitang dianalisis memiliki resiliensi ekonomi tinggi karena...",
    "options": [
      {
        "key": "A",
        "text": "Memungkinkan petani tidak perlu bekerja lagi di sawah kebun"
      },
      {
        "key": "B",
        "text": "Membebaskan keluarga dari seluruh kewajiban membayar utang"
      },
      {
        "key": "C",
        "text": "Seluruh hasil panen dibeli dengan harga dua kali lipat oleh dinas"
      },
      {
        "key": "D",
        "text": "Mewajibkan anak petani bekerja di pabrik penggilingan beras"
      },
      {
        "key": "E",
        "text": "Menyebarkan risiko gagal panen dan menjaga stabilitas arus kas"
      }
    ],
    "correct": "E",
    "explanation": "Diversifikasi usaha tani membagi risiko pasar: jika harga salah satu komoditas anjlok atau terserang hama, komoditas lain tetap menopang pendapatan keluarga."
  },
  {
    "id": 309,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Kelangkaan pupuk kimia bersubsidi yang kerap terjadi saat musim tanam serentak di OKU Timur jika dianalisis dari tata kelola distribusi disebabkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Kesenjangan kuota e-RDKK dengan pasokan riil dan rembesan pasar"
      },
      {
        "key": "B",
        "text": "Pabrik pupuk menghentikan seluruh produksi pupuk nasional"
      },
      {
        "key": "C",
        "text": "Petani sawah menolak menggunakan pupuk kimia di lahannya"
      },
      {
        "key": "D",
        "text": "Petani membuang seluruh jatah pupuk subsidi ke saluran irigasi"
      },
      {
        "key": "E",
        "text": "Harga pupuk subsidi dinaikkan sepuluh kali lipat oleh kelompok"
      }
    ],
    "correct": "A",
    "explanation": "Akar persoalan pupuk subsidi bersumber dari keterbatasan alokasi APBN dibanding kebutuhan riil usulan e-RDKK, kendala penebusan kartu tani, dan potensi penyimpangan distribusi."
  },
  {
    "id": 310,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Analisis perbandingan profil likuiditas antara berkebun kelapa sawit dan bersawah padi bagi petani OKU Timur menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Bersawah padi memberikan uang tunai harian secara kontinu"
      },
      {
        "key": "B",
        "text": "Sawit memberi arus kas rutin dwi-mingguan, padi panen berkala"
      },
      {
        "key": "C",
        "text": "Berkebun kelapa sawit membutuhkan air genangan setinggi satu meter"
      },
      {
        "key": "D",
        "text": "Tanaman kelapa sawit mati setelah berbuah selama tiga bulan"
      },
      {
        "key": "E",
        "text": "Petani padi sawah dilarang menjual gabahnya ke pedagang pasar"
      }
    ],
    "correct": "B",
    "explanation": "Sawit menghasilkan TBS yang dipanen dan diuangkan setiap 10-14 hari, sedangkan padi sawah menghasilkan pendapatan besar secara musiman setiap 3-4 bulan sekali."
  },
  {
    "id": 311,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Wabah penyakit gugur daun Pestalotiopsis pada perkebunan karet di OKU Timur dianalisis menyebabkan penurunan produksi lateks secara drastis karena...",
    "options": [
      {
        "key": "A",
        "text": "Menghancurkan seluruh sistem perakaran pohon karet di tanah"
      },
      {
        "key": "B",
        "text": "Mengubah getah lateks menjadi cairan minyak kelapa sawit"
      },
      {
        "key": "C",
        "text": "Mengganggu fotosintesis sehingga pembentukan lateks anjlok"
      },
      {
        "key": "D",
        "text": "Menyebabkan batang pohon karet patah menjadi serpihan kayu"
      },
      {
        "key": "E",
        "text": "Mewajibkan pohon karet disiram dengan air kopi panas mendidih"
      }
    ],
    "correct": "C",
    "explanation": "Gugurnya daun akibat infeksi jamur menurunkan tajuk hijau klorofil secara signifikan, sehingga proses fotosintesis terhambat dan biosintesis getah lateks menurun drastis."
  },
  {
    "id": 312,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Analisis pola kemitraan usaha ternak ayam pedaging broiler sistem inti-plasma di OKU Timur memperlihatkan bahwa kelemahan posisi peternak plasma terletak pada...",
    "options": [
      {
        "key": "A",
        "text": "Kewajiban membeli tanah perkantoran perusahaan inti di Jakarta"
      },
      {
        "key": "B",
        "text": "Ketiadaan bantuan bibit anak ayam (DOC) dan pakan dari inti"
      },
      {
        "key": "C",
        "text": "Larangan menjual kotoran ayam kandang sebagai pupuk kompos"
      },
      {
        "key": "D",
        "text": "Ketergantungan harga sapronak dan risiko kematian ayam di plasma"
      },
      {
        "key": "E",
        "text": "Kewajiban memelihara ayam broiler di dalam kolam ikan patin"
      }
    ],
    "correct": "D",
    "explanation": "Dalam skema inti-plasma, harga bibit dan pakan ditentukan oleh perusahaan inti, sementara risiko kematian ternak dan fluktuasi indeks performa kandang ditanggung peternak plasma."
  },
  {
    "id": 313,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Untuk mengevaluasi efektivitas program diversifikasi pangan lokal berbasis ubi dan jagung di Kabupaten OKU Timur, indikator penilaian paling tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Banyaknya pameran kuliner yang diadakan di halaman pemkab"
      },
      {
        "key": "B",
        "text": "Jumlah spanduk promosi makanan sehat di sepanjang jalan raya"
      },
      {
        "key": "C",
        "text": "Kenaikan harga beras di pasar tradisional Gumawang Belitang"
      },
      {
        "key": "D",
        "text": "Besaran anggaran belanja perjalanan dinas penyuluh pertanian"
      },
      {
        "key": "E",
        "text": "Penurunan angka konsumsi beras per kapita dan ragam menu harian"
      }
    ],
    "correct": "E",
    "explanation": "Keberhasilan diversifikasi pangan dinilai dari penurunan ketergantungan konsumsi beras per kapita dan meningkatnya proporsi pangan karbohidrat lokal di meja makan keluarga."
  },
  {
    "id": 314,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Sebuah kebijakan daerah menetapkan Peraturan Daerah tentang Lahan Pertanian Pangan Berkelanjutan (LP2B) di OKU Timur. Evaluasi terhadap kebijakan ini menyimpulkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Strategis melindungi sawah teknis dari alih fungsi non-pertanian"
      },
      {
        "key": "B",
        "text": "Menghambat pembangunan jalan tol dan gedung perkantoran daerah"
      },
      {
        "key": "C",
        "text": "Merugikan para pengembang perumahan komersial di kawasan Belitang"
      },
      {
        "key": "D",
        "text": "Menurunkan harga jual gabah petani sawah di hadapan tengkulak"
      },
      {
        "key": "E",
        "text": "Menghapuskan hak kepemilikan sertifikat tanah sawah milik petani"
      }
    ],
    "correct": "A",
    "explanation": "Perda LP2B memberikan kepastian hukum untuk mengunci areal persawahan irigasi produktif agar tidak dialihfungsikan menjadi perumahan, industri, atau perkebunan sawit."
  },
  {
    "id": 315,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Ketika mengevaluasi pembentukan Unit Pengolahan dan Pemasaran Bokar (UPPB) di sentra perkebunan karet OKU Timur, keunggulan model kelembagaan ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Petani dilarang menjual getah karetnya kepada pihak manapun"
      },
      {
        "key": "B",
        "text": "Memotong rantai tengkulak lewat sistem lelang terbuka bermutu"
      },
      {
        "key": "C",
        "text": "Mewajibkan petani membayar iuran keanggotaan sebesar gaji camat"
      },
      {
        "key": "D",
        "text": "Pemerintah membeli seluruh getah karet dengan harga emas murni"
      },
      {
        "key": "E",
        "text": "Menghapuskan fungsi pabrik ban kendaraan di tingkat nasional"
      }
    ],
    "correct": "B",
    "explanation": "UPPB mengorganisasi petani karet untuk menghasilkan bekuan karet bersih dan menjualnya serentak melalui lelang pasar mingguan, sehingga posisi tawar petani meningkat signifikan."
  },
  {
    "id": 316,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Evaluasi terhadap program Asuransi Usaha Tani Padi (AUTP) yang difasilitasi pemerintah bagi petani sawah di OKU Timur membuktikan bahwa asuransi ini berfungsi sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Beban tambahan pengeluaran premi tanpa memberikan manfaat riil"
      },
      {
        "key": "B",
        "text": "Pengganti seluruh fungsi pupuk dan obat-obatan hama persawahan"
      },
      {
        "key": "C",
        "text": "Jaring pengaman modal kerja saat gagal panen banjir atau OPT"
      },
      {
        "key": "D",
        "text": "Alat bagi perbankan untuk menyita lahan sawah milik kelompok"
      },
      {
        "key": "E",
        "text": "Jaminan bahwa harga beras di pasar tidak akan pernah berubah"
      }
    ],
    "correct": "C",
    "explanation": "AUTP memberikan ganti rugi klaim (Rp6 juta/ha) apabila sawah terdampak banjir, kekeringan, atau serangan hama di atas 75%, menjamin modal petani untuk musim tanam berikutnya."
  },
  {
    "id": 317,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Menilai kebiasaan petani membakar jerami pascapanen vs memanfaatkannya sebagai pakan silase ternak dan kompos, penilaian ilmiah yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membakar jerami adalah metode terbaik menyuburkan biologi tanah"
      },
      {
        "key": "B",
        "text": "Jerami padi beracun dan tidak boleh disentuh oleh hewan ternak"
      },
      {
        "key": "C",
        "text": "Membakar jerami menghasilkan gas oksigen segar bagi lingkungan"
      },
      {
        "key": "D",
        "text": "Fermentasi jerami bernilai ekologis tinggi dan menekan polusi"
      },
      {
        "key": "E",
        "text": "Pemanfaatan jerami membutuhkan biaya lebih besar dari harga sawah"
      }
    ],
    "correct": "D",
    "explanation": "Membakar jerami membunuh mikroba tanah dan memicu polusi asap, sedangkan fermentasi silase jerami dan pengomposan menjaga struktur bahan organik tanah dan menyediakan pakan."
  },
  {
    "id": 318,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Sebuah usulan program mendorong penggantian seluruh kolam tanah patin Belitang dengan tambak terpal bundar bioflok. Evaluasi kritis terhadap usulan tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sangat mendesak karena kolam tanah sudah dilarang oleh undang-undang"
      },
      {
        "key": "B",
        "text": "Sistem bioflok tidak memerlukan pemberian pakan sama sekali"
      },
      {
        "key": "C",
        "text": "Tambak terpal bundar otomatis menghasilkan ikan patin tanpa duri"
      },
      {
        "key": "D",
        "text": "Ikan patin menolak hidup di dalam air kolam tanah tradisional"
      },
      {
        "key": "E",
        "text": "Biaya listrik aerasi tinggi dan kolam tanah lokal sudah efisien"
      }
    ],
    "correct": "E",
    "explanation": "Kolam tanah di Belitang memanfaatkan gravitasi saluran irigasi alami dengan biaya energi rendah, sedangkan bioflok memerlukan aerasi listrik kontinu dan investasi awal yang mahal."
  },
  {
    "id": 319,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Menilai keberhasilan program Inseminasi Buatan (IB) kawin suntik pada ternak sapi dan kambing di OKU Timur, faktor kunci keberhasilan di tingkat peternak adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ketepatan deteksi masa birahi betina dan kecepatan inseminator"
      },
      {
        "key": "B",
        "text": "Pemberian pakan konsentrat impor seharga jutaan rupiah per sak"
      },
      {
        "key": "C",
        "text": "Penggunaan kandang sapi bertingkat dengan lantai marmer putih"
      },
      {
        "key": "D",
        "text": "Mewajibkan induk sapi betina melahirkan anak setiap tiga bulan"
      },
      {
        "key": "E",
        "text": "Melarang peternak menyentuh anak sapi hasil kawin suntik IB"
      }
    ],
    "correct": "A",
    "explanation": "Keberhasilan konsepsi kebuntingan IB sangat ditentukan oleh kejelian peternak mendeteksi tanda birahi ternak dan respons cepat petugas inseminator melakukan deposisi semen beku."
  },
  {
    "id": 320,
    "day": 2,
    "indicatorCode": "C",
    "indicatorKey": "modul_c_agrikultur_unggulan",
    "indicatorName": "Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Evaluasi terhadap ketergantungan petani padi pada pestisida kimia sintetis secara berlebihan di OKU Timur menghasilkan kesimpulan bahwa praktik tersebut...",
    "options": [
      {
        "key": "A",
        "text": "Merupakan bukti kemajuan teknologi pertanian paling ramah lingkungan"
      },
      {
        "key": "B",
        "text": "Memicu resistensi hama, matinya musuh alami, dan residu kimia"
      },
      {
        "key": "C",
        "text": "Menjamin hasil panen padi sawah terbebas dari serangan jamur selamanya"
      },
      {
        "key": "D",
        "text": "Menyebabkan harga beras Belitang naik menjadi sepuluh kali lipat"
      },
      {
        "key": "E",
        "text": "Meningkatkan kesuburan populasi mikroorganisme pengurai di dalam tanah"
      }
    ],
    "correct": "B",
    "explanation": "Aplikasi pestisida berlebihan membunuh predator alami (laba-laba, capung), memicu ledakan resistensi hama sekunder, serta meninggalkan residu berbahaya bagi ekosistem sawah."
  },
  {
    "id": 321,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Perkakas pertanian tradisional berupa pisau kecil berpenampang kayu yang digunakan memotong tangkai malai padi satu per satu adalah...",
    "options": [
      {
        "key": "A",
        "text": "Arit bergerigi pemotong semak tebal"
      },
      {
        "key": "B",
        "text": "Parang panjang penebas dahan pohon"
      },
      {
        "key": "C",
        "text": "Cangkul baja pembalik tanah liat"
      },
      {
        "key": "D",
        "text": "Ani-ani atau ketam pemetik malai"
      },
      {
        "key": "E",
        "text": "Sabit lengkung pemotong rumput gajah"
      }
    ],
    "correct": "D",
    "explanation": "Ani-ani (ketam) adalah pisau tradisional kecil yang disembunyikan di telapak tangan untuk memotong tangkai malai padi satu demi satu pada masa lampau."
  },
  {
    "id": 322,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Mesin pemanen modern yang mengintegrasikan fungsi memotong batang padi, merontokkan bulir gabah, dan membersihkannya secara serentak adalah...",
    "options": [
      {
        "key": "A",
        "text": "Power thresher mesin perontok stasioner"
      },
      {
        "key": "B",
        "text": "Traktor roda empat bajak piringan tanah"
      },
      {
        "key": "C",
        "text": "Rice transplanter penanam bibit muda"
      },
      {
        "key": "D",
        "text": "Mist blower penyemprot butiran pestisida"
      },
      {
        "key": "E",
        "text": "Combine harvester mesin pemanen terpadu"
      }
    ],
    "correct": "E",
    "explanation": "Combine harvester adalah alsintan pemanen terpadu yang memotong, merontokkan gabah, memisahkan jerami, dan menyaring kotoran dalam satu lintasan kerja."
  },
  {
    "id": 323,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Nama bendung gerak teknis utama di Martapura yang menjadi hulu pengatur suplesi debit air bagi jaringan irigasi Komering di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bendung Perjaya pengatur intake irigasi"
      },
      {
        "key": "B",
        "text": "Bendungan Jatiluhur pembangkit listrik"
      },
      {
        "key": "C",
        "text": "Bendung Katulampa pengukur debit ciliwung"
      },
      {
        "key": "D",
        "text": "Bendung Karangkates waduk pengendali lahar"
      },
      {
        "key": "E",
        "text": "Bendungan Gajah Mungkur hulu bengawan"
      }
    ],
    "correct": "A",
    "explanation": "Bendung Perjaya di Martapura adalah infrastruktur hidrolik utama yang membendung Sungai Komering untuk memasok air ke Saluran Induk Komering."
  },
  {
    "id": 324,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Sumber air alami yang mengaliri Sungai Komering dan menjadi pasokan baku abadi bagi jaringan irigasi di persawahan Belitang berhulu dari...",
    "options": [
      {
        "key": "A",
        "text": "Danau Toba di pegunungan Sumatera Utara"
      },
      {
        "key": "B",
        "text": "Danau Ranau di perbatasan OKU Selatan"
      },
      {
        "key": "C",
        "text": "Danau Singkarak di dataran tinggi Minang"
      },
      {
        "key": "D",
        "text": "Rawa Pening di lembah pegunungan Jawa"
      },
      {
        "key": "E",
        "text": "Danau Matano di perbukitan Sulawesi"
      }
    ],
    "correct": "B",
    "explanation": "Sungai Komering berhulu dari Danau Ranau di Kabupaten OKU Selatan, menjamin ketersediaan debit air yang stabil sepanjang tahun bagi irigasi Komering."
  },
  {
    "id": 325,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Mesin mekanis modern yang digunakan untuk menanam bibit padi muda dari baki semai (dapog) langsung ke lumpur sawah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Corn seeder penugal benih jagung pipil"
      },
      {
        "key": "B",
        "text": "Cultivator pencacah gulma tanah kering"
      },
      {
        "key": "C",
        "text": "Rice transplanter penanam bibit padi"
      },
      {
        "key": "D",
        "text": "Bed dryer pengering gabah lorong udara"
      },
      {
        "key": "E",
        "text": "Color sorter penyortir butir beras patah"
      }
    ],
    "correct": "C",
    "explanation": "Rice transplanter adalah mesin tanam pindah yang menancapkan bibit padi persemaian dapog dengan jarak tanam teratur dan kecepatan tinggi."
  },
  {
    "id": 326,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Saluran pembagi air irigasi yang membawa air langsung dari saluran tersier menuju petak-petak persawahan milik petani disebut saluran...",
    "options": [
      {
        "key": "A",
        "text": "Saluran induk primer antar-kabupaten"
      },
      {
        "key": "B",
        "text": "Saluran sekunder penghubung antar-kecamatan"
      },
      {
        "key": "C",
        "text": "Saluran pembuang banjir menuju laut"
      },
      {
        "key": "D",
        "text": "Saluran kuarter atau cacing petak sawah"
      },
      {
        "key": "E",
        "text": "Saluran pipa bawah tanah limbah industri"
      }
    ],
    "correct": "D",
    "explanation": "Saluran kuarter (sering disebut saluran cacing) adalah saluran terkecil di tingkat usaha tani yang mendistribusikan air langsung ke tiap petak sawah."
  },
  {
    "id": 327,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Kelembagaan swadaya petani yang bertugas mengelola pembagian air, iuran, dan pemeliharaan parit irigasi di tingkat tersier adalah...",
    "options": [
      {
        "key": "A",
        "text": "Lembaga Swadaya Masyarakat hak konsumen"
      },
      {
        "key": "B",
        "text": "Satuan Polisi Pamong Praja penegak perda"
      },
      {
        "key": "C",
        "text": "Dinas Kebersihan dan Pertamanan kota"
      },
      {
        "key": "D",
        "text": "Badan Pusat Statistik pendata sensus"
      },
      {
        "key": "E",
        "text": "P3A Perkumpulan Petani Pemakai Air desa"
      }
    ],
    "correct": "E",
    "explanation": "P3A (Perkumpulan Petani Pemakai Air) adalah wadah resmi petani pemanfaat air irigasi untuk mengatur giliran air dan merawat saluran tersier."
  },
  {
    "id": 328,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Alat pengolah tanah tradisional berupa rangka kayu berujung besi yang ditarik sapi untuk membalik bongkahan tanah sawah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bajak singkal atau luku tradisional sapi"
      },
      {
        "key": "B",
        "text": "Garpu tanah penggembur gulma pekarangan"
      },
      {
        "key": "C",
        "text": "Cangkul lempang pemotong tebing parit"
      },
      {
        "key": "D",
        "text": "Beliung kayu pembelah batang pohon"
      },
      {
        "key": "E",
        "text": "Kored rumput pembersih bedengan cabai"
      }
    ],
    "correct": "A",
    "explanation": "Bajak singkal (luku) tradisional ditarik hewan ternak (sapi/kerbau) untuk memotong dan membalik tanah sawah sebelum ditemukannya traktor mesin."
  },
  {
    "id": 329,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Keunggulan mekanis traktor besar roda empat dibanding traktor tangan roda dua saat mengolah hamparan sawah luas di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dapat diterbangkan melintasi sungai tanpa jembatan"
      },
      {
        "key": "B",
        "text": "Kapasitas kerja lebih luas, cepat, dan nyaman bagi operator"
      },
      {
        "key": "C",
        "text": "Tidak memerlukan bahan bakar solar maupun minyak pelumas"
      },
      {
        "key": "D",
        "text": "Dapat memanen gabah sekaligus mengemasnya ke dalam karung"
      },
      {
        "key": "E",
        "text": "Bebas dari risiko terjebak dalam kubangan lumpur sawah"
      }
    ],
    "correct": "B",
    "explanation": "Traktor roda empat memiliki tenaga horse-power (HP) besar, lebar kerja bajak lebih luas, waktu olah lebih singkat, dan operator duduk di kabin kemudi."
  },
  {
    "id": 330,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Pemanenan padi menggunakan combine harvester dapat mempercepat mulainya musim tanam berikutnya di Belitang karena...",
    "options": [
      {
        "key": "A",
        "text": "Mesin combine secara otomatis menanam benih padi baru"
      },
      {
        "key": "B",
        "text": "Mesin mengeringkan seluruh petak sawah menjadi tanah padat"
      },
      {
        "key": "C",
        "text": "Panen tuntas dalam hitungan jam dan jerami tercacah cepat busuk"
      },
      {
        "key": "D",
        "text": "Menghilangkan kebutuhan membajak tanah untuk musim berikutnya"
      },
      {
        "key": "E",
        "text": "Mewajibkan petani segera menaburkan pupuk urea ke jerami"
      }
    ],
    "correct": "C",
    "explanation": "Pemanenan dengan combine harvester berlangsung sangat cepat (2–3 jam/ha) dan jerami langsung tercacah rata di sawah, sehingga pengolahan tanah musim berikutnya segera dimulai."
  },
  {
    "id": 331,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Fungsi utama bangunan bagi-sadap (pintu air) pada saluran sekunder jaringan irigasi Komering adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menampung limbah deterjen cair dari pemukiman warga"
      },
      {
        "key": "B",
        "text": "Tempat pembibitan ikan patin secara liar tanpa pakan"
      },
      {
        "key": "C",
        "text": "Menghambat aliran air agar persawahan mengalami banjir"
      },
      {
        "key": "D",
        "text": "Mengatur dan membagi debit aliran air secara proporsional"
      },
      {
        "key": "E",
        "text": "Tempat perhentian perahu wisata penumpang antar-kota"
      }
    ],
    "correct": "D",
    "explanation": "Bangunan bagi-sadap dilengkapi pintu sorong pengatur debit untuk membagi pasokan air secara terukur ke saluran sekunder dan tersier sesuai luas areal layanan."
  },
  {
    "id": 332,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Perbedaan mendasar antara sistem pengaliran air terus-menerus (continuous) dengan sistem gilir-giring (rotational) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sistem terus-menerus hanya diterapkan saat musim kemarau parah"
      },
      {
        "key": "B",
        "text": "Sistem gilir-giring menghentikan pasokan air ke sawah selamanya"
      },
      {
        "key": "C",
        "text": "Sistem terus-menerus mewajibkan petani membeli air botol kemasan"
      },
      {
        "key": "D",
        "text": "Sistem gilir-giring hanya mengalirkan air pada waktu tengah malam"
      },
      {
        "key": "E",
        "text": "Gilir-giring menjatah jadwal buka pintu air saat debit berkurang"
      }
    ],
    "correct": "E",
    "explanation": "Sistem gilir-giring diterapkan saat debit air mengecil di musim kemarau dengan membagi giliran alokasi air per blok secara terjadwal agar pembagian adil."
  },
  {
    "id": 333,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Penggunaan mesin perontok padi bermotor (power thresher) dibanding cara gebot tradisional menguntungkan petani karena...",
    "options": [
      {
        "key": "A",
        "text": "Menekan butir gabah yang tertinggal di jerami dan hemat tenaga"
      },
      {
        "key": "B",
        "text": "Membuat beras menjadi otomatis beraroma pandan wangi"
      },
      {
        "key": "C",
        "text": "Menghilangkan seluruh bulir gabah hampa tanpa mesin penggiling"
      },
      {
        "key": "D",
        "text": "Menyebabkan jerami padi berubah menjadi abu pembasmi hama"
      },
      {
        "key": "E",
        "text": "Mengurangi bobot timbangan gabah panen saat ditimbang"
      }
    ],
    "correct": "A",
    "explanation": "Power thresher memiliki silinder perontok berkecepatan putar stabil yang merontokkan bulir gabah secara tuntas dengan susut rontok (losses) jauh lebih rendah."
  },
  {
    "id": 334,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Tanggung jawab teknis Balai Besar Wilayah Sungai (BBWS) Sumatera VIII dalam pengelolaan irigasi Komering mencakup...",
    "options": [
      {
        "key": "A",
        "text": "Menentukan harga gabah kering panen di tingkat tengkulak"
      },
      {
        "key": "B",
        "text": "Operasi dan pemeliharaan bendung serta saluran primer-sekunder"
      },
      {
        "key": "C",
        "text": "Membeli seluruh hasil panen beras petani di kawasan Belitang"
      },
      {
        "key": "D",
        "text": "Menjual traktor dan suku cadang mesin panen kepada petani"
      },
      {
        "key": "E",
        "text": "Memungut pajak penghasilan dari buruh tani pemanen sawah"
      }
    ],
    "correct": "B",
    "explanation": "Pemerintah pusat melalui BBWS Sumatera VIII bertanggung jawab atas infrastruktur utama irigasi teknis (bendung, saluran induk primer, dan saluran sekunder lintas wilayah)."
  },
  {
    "id": 335,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Saluran primer dan sekunder irigasi Komering perlu dikeruk endapan lumpurnya secara berkala karena sedimentasi dapat...",
    "options": [
      {
        "key": "A",
        "text": "Mengubah air tawar irigasi menjadi air asin laut lepas"
      },
      {
        "key": "B",
        "text": "Mempercepat pertumbuhan bibit padi sawah secara tidak terkendali"
      },
      {
        "key": "C",
        "text": "Mendangkalkan penampang saluran dan mengurangi kapasitas debit"
      },
      {
        "key": "D",
        "text": "Menaikkan harga sewa traktor bajak di tingkat perdesaan"
      },
      {
        "key": "E",
        "text": "Menghilangkan seluruh ikan patin yang hidup di kolam warga"
      }
    ],
    "correct": "C",
    "explanation": "Sedimentasi lumpur mempersempit luas penampang basah saluran, memperlambat kecepatan aliran air, dan memicu luapan banjir saat musim hujan lebat."
  },
  {
    "id": 336,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Peralatan perata tanah berpemandu sinar laser (laser land leveler) yang diaplikasikan pada traktor sawah modern berfungsi untuk...",
    "options": [
      {
        "key": "A",
        "text": "Membakar gulma sawah menggunakan pancaran panas sinar laser"
      },
      {
        "key": "B",
        "text": "Mendeteksi letak emas batangan yang terpendam di dalam lumpur"
      },
      {
        "key": "C",
        "text": "Menghitung jumlah cacing tanah yang hidup di lahan sawah"
      },
      {
        "key": "D",
        "text": "Mencapai kerataan tanah presisi sehingga efisiensi air optimal"
      },
      {
        "key": "E",
        "text": "Menggantikan seluruh fungsi benih padi bersertifikat unggul"
      }
    ],
    "correct": "D",
    "explanation": "Perataan tanah presisi memastikan ketinggian muka air genangan merata di seluruh petak sawah, menghemat kebutuhan air hingga 25%, dan menekan pertumbuhan gulma."
  },
  {
    "id": 337,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Petani di Belitang memanen sawah 1 ha secara manual butuh 25 buruh harian upah Rp100.000/orang (Rp2,5 juta). Jika sewa combine harvester Rp1,8 juta, penghematan biayanya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rp300.000 per hektar panen"
      },
      {
        "key": "B",
        "text": "Rp400.000 per hektar panen"
      },
      {
        "key": "C",
        "text": "Rp500.000 per hektar panen"
      },
      {
        "key": "D",
        "text": "Rp600.000 per hektar panen"
      },
      {
        "key": "E",
        "text": "Rp700.000 per hektar panen"
      }
    ],
    "correct": "E",
    "explanation": "Biaya panen manual = Rp2.500.000. Biaya sewa combine = Rp1.800.000. Penghematan biaya tunai = Rp2.500.000 - Rp1.800.000 = Rp700.000."
  },
  {
    "id": 338,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Ketika debit air saluran tersier menyusut drastis pada musim kemarau, langkah operasional yang harus diterapkan oleh pengurus P3A desa adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menerapkan sistem rotasi gilir-giring pembagian air antar-blok"
      },
      {
        "key": "B",
        "text": "Membendung seluruh saluran air hanya untuk petak milik ketua"
      },
      {
        "key": "C",
        "text": "Membiarkan petani saling berebut air dengan kekerasan fisik"
      },
      {
        "key": "D",
        "text": "Menutup permanen pintu air tersier menggunakan adukan semen"
      },
      {
        "key": "E",
        "text": "Membuang air irigasi ke saluran pembuang tanpa dialirkan ke sawah"
      }
    ],
    "correct": "A",
    "explanation": "Penerapan sistem gilir-giring menjamin keadilan distribusi air bagi seluruh anggota blok tersier, menghindari kekeringan petak di ujung hilir saluran."
  },
  {
    "id": 339,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Operator traktor tangan roda dua yang mengolah petak sawah dengan kedalaman lumpur melebihi 30 cm harus mengganti roda karetnya dengan...",
    "options": [
      {
        "key": "A",
        "text": "Roda kayu jati berukir tanpa sirip cakar"
      },
      {
        "key": "B",
        "text": "Roda besi bersirip tapak lebar anti-slip lumpur"
      },
      {
        "key": "C",
        "text": "Roda sepeda motor modifikasi ban gundul"
      },
      {
        "key": "D",
        "text": "Roda katrol besi pemutar kawat baja lift"
      },
      {
        "key": "E",
        "text": "Roda bantalan rel kereta api bermuatan baja"
      }
    ],
    "correct": "B",
    "explanation": "Roda besi dengan sirip tapak lebar (cage wheel) memberikan daya apung dan traksi cengkeram di lahan berlumpur dalam, mencegah traktor ambles."
  },
  {
    "id": 340,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Petani di Belitang yang menggunakan mesin rice transplanter harus menyiapkan bibit tanaman padi dengan teknik persemaian modern berupa...",
    "options": [
      {
        "key": "A",
        "text": "Bibit disemai di atas tumpukan jerami busuk tanpa tanah"
      },
      {
        "key": "B",
        "text": "Bibit ditebar langsung di sungai Komering yang mengalir deras"
      },
      {
        "key": "C",
        "text": "Sistem baki plastik dapog dengan kerapatan akar anyam"
      },
      {
        "key": "D",
        "text": "Bibit direndam dalam minyak kelapa selama satu bulan penuh"
      },
      {
        "key": "E",
        "text": "Sistem cabut akar manual dari lumpur sawah tua (kocoran)"
      }
    ],
    "correct": "C",
    "explanation": "Rice transplanter mensyaratkan bibit semai sistem dapog (baki/tray) dengan gulungan karpet akar teratur agar jari-jari penjepit mesin dapat mencengkeram bibit secara presisi."
  },
  {
    "id": 341,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Ketika saluran pembuang (drainase) persawahan tersumbat eceng gondok menjelang musim hujan lebat, tindakan kelompok tani yang tepat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyemprotkan herbisida berbahaya yang mencemari kolam patin"
      },
      {
        "key": "B",
        "text": "Membiarkan gulma berkembang biak agar air meluap ke sawah"
      },
      {
        "key": "C",
        "text": "Membangun tanggul beton menutup seluruh saluran drainase"
      },
      {
        "key": "D",
        "text": "Gotong royong membersihkan gulma agar aliran air lancar"
      },
      {
        "key": "E",
        "text": "Menghentikan seluruh aktivitas pertanian hingga musim berganti"
      }
    ],
    "correct": "D",
    "explanation": "Pembersihan saluran drainase secara gotong royong mencegah genangan air berlebih yang dapat menenggelamkan tanaman padi muda saat musim hujan."
  },
  {
    "id": 342,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Pengelola Unit Pengelola Jasa Alsintan (UPJA) di Belitang rutin melumasi rantai konveyor dan memeriksa ketegangan sabuk v-belt combine harvester dengan tujuan...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatkan kecepatan laju mesin hingga menyamai mobil balap"
      },
      {
        "key": "B",
        "text": "Menghilangkan kebutuhan pengisian solar mesin saat beroperasi"
      },
      {
        "key": "C",
        "text": "Mengubah warna pisau pemotong gabah menjadi mengilap kuning"
      },
      {
        "key": "D",
        "text": "Memperpanjang masa garansi dari pabrik pembuat mesin selamanya"
      },
      {
        "key": "E",
        "text": "Mencegah slip transmisi dan menghindari kerusakan mendadak"
      }
    ],
    "correct": "E",
    "explanation": "Perawatan preventif transmisi mekanik (v-belt dan rantai) mencegah slip daya perontok dan meminimalkan risiko macet (breakdown) di tengah hamparan sawah."
  },
  {
    "id": 343,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Sepuluh hari menjelang pemanenan padi menggunakan combine harvester, tindakan manajemen air yang harus diterapkan petani di petak sawahnya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuka pintu pembuang untuk mengeringkan hamparan sawah"
      },
      {
        "key": "B",
        "text": "Menggenangi petak sawah setinggi satu meter dari pematang"
      },
      {
        "key": "C",
        "text": "Menutup saluran drainase agar tanah menjadi lumpur sangat lembek"
      },
      {
        "key": "D",
        "text": "Mengalirkan air keruh dari kolam limbah kotoran ternak sapi"
      },
      {
        "key": "E",
        "text": "Menaburkan garam dapur untuk mempercepat proses panen padi"
      }
    ],
    "correct": "A",
    "explanation": "Pengeringan lahan sebelum panen memadatkan daya dukung tanah sawah sehingga combine harvester berbobot berat dapat melintas lincah tanpa risiko terperosok."
  },
  {
    "id": 344,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Dalam pembagian air irigasi gilir-giring di blok tersier, ketua P3A menentukan durasi jam buka pintu air untuk tiap kelompok petak sawah berdasarkan...",
    "options": [
      {
        "key": "A",
        "text": "Kekerabatan keluarga terdekat dengan kepala desa setempat"
      },
      {
        "key": "B",
        "text": "Proporsi luas areal lahan garapan dan fase pertumbuhan padi"
      },
      {
        "key": "C",
        "text": "Jumlah traktor modern yang dimiliki oleh pemilik petak sawah"
      },
      {
        "key": "D",
        "text": "Besaran uang tip rahasia yang diserahkan kepada penjaga pintu"
      },
      {
        "key": "E",
        "text": "Urutan abjad nama pemilik sawah di kartu tanda penduduk"
      }
    ],
    "correct": "B",
    "explanation": "Penjatahan waktu gilir air dihitung proporsional berbasis luas lahan efektif dan tingkat kebutuhan air tanaman (misalnya fase pembungaan butuh air lebih banyak dibanding fase pematangan)."
  },
  {
    "id": 345,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Masuknya mesin combine harvester secara masif di Belitang mengubah struktur tenaga kerja perdesaan. Analisis perubahan sosial menunjukkan terjadinya...",
    "options": [
      {
        "key": "A",
        "text": "Peningkatan kebutuhan buruh pemotong padi wanita secara besar"
      },
      {
        "key": "B",
        "text": "Kepunahan total seluruh jenis varietas benih padi lokal unggul"
      },
      {
        "key": "C",
        "text": "Pergeseran buruh derep manual menjadi tenaga mekanik operator"
      },
      {
        "key": "D",
        "text": "Penutupan seluruh kios penjual pupuk dan bibit di kecamatan"
      },
      {
        "key": "E",
        "text": "Keharusan bagi pemilik sawah untuk pindah domisili ke perkotaan"
      }
    ],
    "correct": "C",
    "explanation": "Mekanisasi panen menggeser tradisi buruh derep manual (terutama kaum perempuan) dan membuka lapangan kerja baru bagi generasi muda sebagai operator mesin dan teknisi bengkel alsintan."
  },
  {
    "id": 346,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Mengapa persawahan Belitang mampu berproduksi IP (Indeks Pertanaman) 200 hingga 300, sementara sawah tadah hujan hanya 100? Analisis teknis menunjukkan faktornya...",
    "options": [
      {
        "key": "A",
        "text": "Tanah di Belitang tidak memerlukan pemupukan sama sekali"
      },
      {
        "key": "B",
        "text": "Petani Belitang bekerja selama 24 jam tanpa pernah tidur"
      },
      {
        "key": "C",
        "text": "Belitang memiliki sinar matahari yang bersinar sepanjang malam"
      },
      {
        "key": "D",
        "text": "Ketersediaan air irigasi teknis terjamin sepanjang tahun"
      },
      {
        "key": "E",
        "text": "Sawah di Belitang ditanami pohon padi raksasa usia puluhan tahun"
      }
    ],
    "correct": "D",
    "explanation": "Jaringan irigasi teknis Bendung Perjaya menjamin ketersediaan air secara kontinu di luar ketergantungan air hujan, memungkinkan petani menanam padi 2-3 kali setahun."
  },
  {
    "id": 347,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Terjadinya pendangkalan cepat pada saluran sekunder Belitang jika dianalisis dari dinamika daerah aliran sungai (DAS) di kawasan hulu disebabkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Pemasangan pipa air minum milik perusahaan daerah di dasar sungai"
      },
      {
        "key": "B",
        "text": "Banyaknya petani yang menanam rumput gajah di pematang sawah"
      },
      {
        "key": "C",
        "text": "Penggunaan combine harvester secara serentak di petak sawah"
      },
      {
        "key": "D",
        "text": "Ketiadaan pintu air di seluruh percabangan saluran tersier"
      },
      {
        "key": "E",
        "text": "Degradasi tutupan hutan hulu memicu erosi tanah terbawa arus"
      }
    ],
    "correct": "E",
    "explanation": "Alih fungsi lahan dan penggundulan hutan di hulu DAS Sungai Komering memicu erosi permukaan tanah, menghasilkan muatan sedimen lumpur tinggi yang mengendap di saluran irigasi."
  },
  {
    "id": 348,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Analisis perbandingan waktu kerja penanaman manual (tandur benang) vs mesin rice transplanter untuk lahan 1 hektar membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Transplanter memangkas waktu kerja dari 20 hari-orang jadi 3 jam"
      },
      {
        "key": "B",
        "text": "Penanaman manual selalu lebih cepat daripada menggunakan mesin"
      },
      {
        "key": "C",
        "text": "Penggunaan mesin transplanter mewajibkan tanam malam hari"
      },
      {
        "key": "D",
        "text": "Bibit padi yang ditanam mesin menghasilkan bulir beras hitam"
      },
      {
        "key": "E",
        "text": "Mesin transplanter membutuhkan tenaga tarik empat ekor kerbau"
      }
    ],
    "correct": "A",
    "explanation": "Rice transplanter mampu menanam 1 hektar sawah dalam waktu sekitar 2-4 jam dengan 2 operator, jauh lebih efisien dibanding cara manual yang butuh 20-25 orang tenaga kerja/hari."
  },
  {
    "id": 349,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Mengapa petani di petak sawah sempit dengan pematang tinggi masih lebih memilih traktor tangan roda dua? Analisis teknis operasional menunjukkan faktor...",
    "options": [
      {
        "key": "A",
        "text": "Traktor roda dua memiliki kecepatan kerja sepuluh kali lipat"
      },
      {
        "key": "B",
        "text": "Akses manuver belok dan transportasi jalan sempit lebih fleksibel"
      },
      {
        "key": "C",
        "text": "Traktor tangan dilarang menggunakan bahan bakar minyak bumi"
      },
      {
        "key": "D",
        "text": "Harga beli traktor tangan lebih mahal daripada traktor roda empat"
      },
      {
        "key": "E",
        "text": "Traktor roda empat dilarang melintasi sawah oleh peraturan adat"
      }
    ],
    "correct": "B",
    "explanation": "Pada lahan berpetak kecil dengan jalan usaha tani sempit, traktor tangan roda 2 lebih mudah dipindahkan antarpematang dan memiliki radius putar belok yang lincah."
  },
  {
    "id": 350,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Analisis dampak pemadatan lapisan tanah bawah (hardpan) akibat mobilitas traktor dan combine harvester berbobot berat di persawahan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyebabkan tanah sawah hancur menjadi abu debu kering"
      },
      {
        "key": "B",
        "text": "Menghilangkan seluruh kebutuhan unsur hara pupuk kimia sawah"
      },
      {
        "key": "C",
        "text": "Bagus menahan rembesan air, namun perakaran dalam bisa terhambat"
      },
      {
        "key": "D",
        "text": "Mewajibkan tanah sawah dibongkar menggunakan dinamit tambang"
      },
      {
        "key": "E",
        "text": "Menjadikan tanah sawah berubah menjadi batu karang laut padat"
      }
    ],
    "correct": "C",
    "explanation": "Lapisan hardpan bermanfaat mencegah perkolasi air yang berlebihan pada tanah sawah, namun pemadatan berlebih dapat membatasi aerasi dan kedalaman penetrasi akar tanaman."
  },
  {
    "id": 351,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Sengketa pembagian air irigasi yang kerap muncul antar-blok tersier saat puncak kemarau dianalisis secara sosial-kelembagaan berakar pada...",
    "options": [
      {
        "key": "A",
        "text": "Petani di hilir memiliki penghasilan yang jauh lebih melimpah"
      },
      {
        "key": "B",
        "text": "Seluruh pintu air irigasi rusak total tersambar petir halilintar"
      },
      {
        "key": "C",
        "text": "Saluran irigasi Komering beralih fungsi menjadi jalan raya tol"
      },
      {
        "key": "D",
        "text": "Pelanggaran jadwal gilir dan ego sektoral petak di bagian hulu"
      },
      {
        "key": "E",
        "text": "Petani sawah diwajibkan menyiram tanaman menggunakan air laut"
      }
    ],
    "correct": "D",
    "explanation": "Konflik air sering dipicu oleh oknum petani di hulu yang membendung parit secara liar di luar jadwal gilirnya, mengakibatkan petak sawah di bagian hilir mengalami defisit air."
  },
  {
    "id": 352,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Ketergantungan petani kecil pada Unit Pengelola Jasa Alsintan (UPJA) di Belitang dianalisis menciptakan relasi sosial-ekonomi berupa...",
    "options": [
      {
        "key": "A",
        "text": "Perbudakan tenaga kerja petani oleh pengurus brigade alsintan"
      },
      {
        "key": "B",
        "text": "Penutupan seluruh toko kelontong di sekitar kawasan persawahan"
      },
      {
        "key": "C",
        "text": "Keharusan petani menjual sertifikat sawahnya kepada pihak UPJA"
      },
      {
        "key": "D",
        "text": "Larangan bagi petani untuk memiliki telepon seluler pintar"
      },
      {
        "key": "E",
        "text": "Komersialisasi jasa mekanisasi menggantikan gotong royong kerja"
      }
    ],
    "correct": "E",
    "explanation": "Kebutuhan efisiensi waktu mendorong peralihan dari sistem tolong-menolong kerja fisik tradisional menjadi transaksi jasa sewa alat mesin pertanian komersial."
  },
  {
    "id": 353,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Ketika mengevaluasi kelayakan investasi pembelian mesin combine harvester seharga Rp450 juta oleh Gapoktan di Belitang, kriteria penilaian prioritas adalah...",
    "options": [
      {
        "key": "A",
        "text": "Luas hamparan layanan, tarif sewa, dan periode pengembalian modal"
      },
      {
        "key": "B",
        "text": "Warna cat bodi mesin combine harvester yang paling disukai warga"
      },
      {
        "key": "C",
        "text": "Banyaknya stiker sponsor iklan yang tertempel di dinding mesin"
      },
      {
        "key": "D",
        "text": "Kemampuan mesin combine melaju kencang di jalan raya aspal tol"
      },
      {
        "key": "E",
        "text": "Suara raungan knalpot mesin combine yang terdengar paling garang"
      }
    ],
    "correct": "A",
    "explanation": "Kelayakan investasi alsintan dievaluasi dari kecukupan luas areal kerja musiman (minimal 80–100 ha/musim), margin tarif sewa, serta Payback Period (periode balik modal)."
  },
  {
    "id": 354,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Sebuah gagasan mengusulkan penerapan pintu air irigasi otomatis berbasis sensor telemetri di jaringan Komering. Evaluasi terhadap gagasan tersebut menyimpulkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Pasti gagal karena pintu air tidak dapat digerakkan oleh motor listrik"
      },
      {
        "key": "B",
        "text": "Sangat efektif meningkatkan presisi pembagian air dan data debit"
      },
      {
        "key": "C",
        "text": "Mewajibkan seluruh petani beralih menjadi ahli pemrograman komputer"
      },
      {
        "key": "D",
        "text": "Menghilangkan seluruh aliran air yang mengalir menuju saluran sekunder"
      },
      {
        "key": "E",
        "text": "Mengharuskan persawahan Belitang dipagari kawat berduri beraliran listrik"
      }
    ],
    "correct": "B",
    "explanation": "Telemetri hidrologi otomatis memantau fluktuasi muka air secara real-time dan mengatur bukaan pintu air secara akurat, meminimalkan kehilangan air akibat human error."
  },
  {
    "id": 355,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Menilai keberhasilan tata kelola kelembagaan P3A di tingkat perdesaan OKU Timur, indikator kinerja paling valid dan objektif adalah...",
    "options": [
      {
        "key": "A",
        "text": "Banyaknya piala penghargaan lomba desa yang dipajang di kantor"
      },
      {
        "key": "B",
        "text": "Besaran saldo kas iuran air yang tidak pernah digunakan sama sekali"
      },
      {
        "key": "C",
        "text": "Kelancaran pembagian air hingga petak hilir dan minimnya sengketa"
      },
      {
        "key": "D",
        "text": "Kemampuan pengurus P3A membeli mobil dinas operasional mewah"
      },
      {
        "key": "E",
        "text": "Jumlah anggota P3A yang pindah bekerja ke sektor pertambangan"
      }
    ],
    "correct": "C",
    "explanation": "Keberhasilan P3A tercermin dari kepuasan anggota, pemerataan distribusi air hingga petak tersier paling ujung, serta terpeliharanya fungsi fisik saluran tanpa konflik."
  },
  {
    "id": 356,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Bantuan alsintan traktor dari pemerintah dievaluasi sering cepat rusak dan terbengkalai di beberapa desa. Penilaian terhadap penyebab utama kelemahan ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Traktor buatan pabrik dalam negeri selalu berkualitas sangat jelek"
      },
      {
        "key": "B",
        "text": "Petani di perdesaan menolak seluruh bantuan alat mesin modern"
      },
      {
        "key": "C",
        "text": "Traktor sengaja dirusak oleh petugas penyuluh pertanian setempat"
      },
      {
        "key": "D",
        "text": "Lemahnya manajemen pemeliharaan, ketiadaan suku cadang, dan operator"
      },
      {
        "key": "E",
        "text": "Harga solar bahan bakar traktor disubsidi penuh oleh pemerintah"
      }
    ],
    "correct": "D",
    "explanation": "Kerusakan alsintan bantuan umumnya berakar dari ketiadaan alokasi dana perawatan rutin, minimnya keterampilan operator, serta kesulitan memperoleh suku cadang di desa."
  },
  {
    "id": 357,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Menilai solusi konflik penggunaan air antara petambak kolam patin dan petani sawah di Belitang saat kemarau, rekomendasi kebijakan paling berkeadilan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menutup seluruh kolam patin dan menimbunnya dengan tanah sawah"
      },
      {
        "key": "B",
        "text": "Melarang petani sawah menanam padi selama sepuluh tahun ke depan"
      },
      {
        "key": "C",
        "text": "Mengharuskan petambak ikan membeli air tangki dari luar provinsi"
      },
      {
        "key": "D",
        "text": "Membiarkan kelompok yang memiliki massa terbanyak menguasai air"
      },
      {
        "key": "E",
        "text": "Pengaturan kuota terjadwal dan optimalisasi resirkulasi air kolam"
      }
    ],
    "correct": "E",
    "explanation": "Solusi win-win solution dicapai melalui alokasi kuota air bergilir yang tertib serta mendorong petambak menerapkan sistem sirkulasi/filter air kolam tertutup."
  },
  {
    "id": 358,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Evaluasi terhadap usulan pelarangan mesin combine harvester demi melindungi buruh panen tradisional di persawahan OKU Timur menyimpulkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Langkah mundur yang merugikan efisiensi dan daya saing beras daerah"
      },
      {
        "key": "B",
        "text": "Keputusan sangat cerdas yang akan memajukan perekonomian daerah"
      },
      {
        "key": "C",
        "text": "Mewajibkan seluruh petani sawah menggiling padinya secara manual"
      },
      {
        "key": "D",
        "text": "Meningkatkan produksi gabah kering panen menjadi dua kali lipat"
      },
      {
        "key": "E",
        "text": "Mencegah terjadinya banjir kiriman dari kawasan hulu sungai"
      }
    ],
    "correct": "A",
    "explanation": "Melarang mekanisasi akan menaikkan biaya panen, memperlambat masa tanam, dan memicu susut hasil tinggi; solusinya adalah alih profesi buruh ke sektor pengolahan dan jasa alsintan."
  },
  {
    "id": 359,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Menghadapi anomali iklim global El Nino kering, evaluasi strategi infrastruktur irigasi paling adaptif bagi ketahanan pangan OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghentikan seluruh penanaman komoditas pertanian di persawahan"
      },
      {
        "key": "B",
        "text": "Pembangunan embung suplesi, sumur pantek surya, dan rehabilitasi saluran"
      },
      {
        "key": "C",
        "text": "Menjual seluruh air Sungai Komering ke pabrik industri minuman botol"
      },
      {
        "key": "D",
        "text": "Membongkar seluruh tanggul penahan banjir di sepanjang bantaran sungai"
      },
      {
        "key": "E",
        "text": "Mengharuskan warga berdoa meminta hujan tanpa melakukan ikhtiar fisik"
      }
    ],
    "correct": "B",
    "explanation": "Adaptasi iklim menuntut kombinasi rehabilitasi saluran kedap air, pembuatan kantong embung penampung limpasan hujan, dan sumur dangkal bertenaga panel surya."
  },
  {
    "id": 360,
    "day": 2,
    "indicatorCode": "D",
    "indicatorKey": "modul_d_alsintan_irigasi",
    "indicatorName": "Sistem Teknologi Peralatan Pertanian (dari Tradisional ke Alsintan Modern) dan Jaringan Irigasi",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Evaluasi terhadap keberlanjutan unit usaha jasa alsintan (UPJA) mandiri di Belitang menunjukkan faktor penentu utama kelangsungan usahanya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ketiadaan pembukuan keuangan agar terhindar dari audit pajak"
      },
      {
        "key": "B",
        "text": "Ketergantungan abadi pada hibah mesin gratis dari pemerintah daerah"
      },
      {
        "key": "C",
        "text": "Disiplin alokasi dana penyusutan aset untuk peremajaan mesin baru"
      },
      {
        "key": "D",
        "text": "Penetapan tarif sewa mesin yang jauh lebih tinggi daripada harga beras"
      },
      {
        "key": "E",
        "text": "Menolak melayani petani yang memiliki sawah kurang dari satu hektar"
      }
    ],
    "correct": "C",
    "explanation": "Bisnis jasa alsintan berkelanjutan jika menyisihkan dana depresiasi penyusutan mesin dari setiap pendapatan sewa untuk biaya overhaul dan regenerasi armada baru."
  },
  {
    "id": 361,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 1,
    "question": "Rekayasa teknologi penanaman padi sawah berselang baris teratur yang menciptakan lorong terbuka memanjang di antara barisan rumpun disebut...",
    "options": [
      {
        "key": "A",
        "text": "Sistem tumpang sari tanaman keras perkebunan"
      },
      {
        "key": "B",
        "text": "Pola tanam acak tanpa jarak pematang beraturan"
      },
      {
        "key": "C",
        "text": "Metode tebar benih langsung di genangan air dalam"
      },
      {
        "key": "D",
        "text": "Sistem tanam tegel bujur sangkar rapat konvensional"
      },
      {
        "key": "E",
        "text": "Sistem tanam jajar legowo tipe dua atau empat satu"
      }
    ],
    "correct": "E",
    "explanation": "Sistem tanam jajar legowo adalah teknik menata barisan rumpun padi dengan menyisipkan satu baris kosong memanjang untuk memanipulasi tata kelola tanaman."
  },
  {
    "id": 362,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 2,
    "question": "Standar kadar air gabah kering giling (GKG) yang ditetapkan oleh Perum Bulog untuk penyimpanan aman jangka panjang di gudang adalah maksimal...",
    "options": [
      {
        "key": "A",
        "text": "14 persen agar bebas dari pertumbuhan jamur dan kutu"
      },
      {
        "key": "B",
        "text": "25 persen agar gabah tetap basah dan berbobot berat"
      },
      {
        "key": "C",
        "text": "35 persen seperti kondisi gabah baru selesai dipotong"
      },
      {
        "key": "D",
        "text": "50 persen dengan rendaman air di dalam karung goni"
      },
      {
        "key": "E",
        "text": "0 persen tanpa ada kandungan molekul air sama sekali"
      }
    ],
    "correct": "A",
    "explanation": "Standar kadar air Gabah Kering Giling (GKG) adalah maksimal 14% untuk mencegah pembusukan mikroorganisme dan respirasi yang merusak mutu simpan beras."
  },
  {
    "id": 363,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Mesin pengering gabah mekanis tipe hamparan datar berdaya hembus udara panas sekam yang digunakan saat panen musim hujan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Vertical dryer silinder putar bertingkat tinggi"
      },
      {
        "key": "B",
        "text": "Flat bed dryer bak hamparan datar lorong pemanas"
      },
      {
        "key": "C",
        "text": "Continuous flow dryer pipa aliran berjalan otomatis"
      },
      {
        "key": "D",
        "text": "Rotary dryer tabung putar pengering tepung tapioka"
      },
      {
        "key": "E",
        "text": "Solar dryer dome kubah kaca penangkap sinar surya"
      }
    ],
    "correct": "B",
    "explanation": "Flat bed dryer adalah mesin pengering gabah dengan lantai berlubang dan blower penghembus udara panas yang sangat populer di penggilingan padi Belitang."
  },
  {
    "id": 364,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Instalasi pabrik penggilingan padi terpadu yang memadukan mesin pemecah kulit, pemisah batu, dan penyosoh poles beras dikenal dengan istilah...",
    "options": [
      {
        "key": "A",
        "text": "UPJA unit pengelola jasa sewa alsintan perdesaan"
      },
      {
        "key": "B",
        "text": "BUMDes badan usaha milik desa bidang perdagangan"
      },
      {
        "key": "C",
        "text": "RMU Rice Milling Unit penggilingan beras modern"
      },
      {
        "key": "D",
        "text": "PKS pabrik pengolahan kelapa sawit minyak mentah"
      },
      {
        "key": "E",
        "text": "KUD koperasi unit desa simpan pinjam permodalan"
      }
    ],
    "correct": "C",
    "explanation": "Rice Milling Unit (RMU) modern mengintegrasikan tahapan pengolahan gabah menjadi beras putih bersih berkualitas tinggi dengan rendemen optimal."
  },
  {
    "id": 365,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Kehilangan atau penyusutan hasil panen gabah akibat tercecer, rontok di tanah, atau patah saat proses pengeringan dan penggilingan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Deflasi penurunan harga komoditas pasar umum"
      },
      {
        "key": "B",
        "text": "Stagnasi ketiadaan pertumbuhan volume panen"
      },
      {
        "key": "C",
        "text": "Depresiasi penyusutan nilai buku aset mesin"
      },
      {
        "key": "D",
        "text": "Losses susut hasil panen dan pascapanen gabah"
      },
      {
        "key": "E",
        "text": "Fluktuasi naik turunnya nilai kurs valuta asing"
      }
    ],
    "correct": "D",
    "explanation": "Losses (susut pascapanen) merujuk pada persentase gabah/beras yang hilang kuantitas atau kualitasnya sepanjang rantai panen hingga siap konsumsi."
  },
  {
    "id": 366,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Wahana pesawat terbang tanpa awak berbaling-baling yang diadopsi petani milenial di OKU Timur untuk menyemprot pupuk cair secara presisi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Helikopter kargo bermesin jet angkut logistik"
      },
      {
        "key": "B",
        "text": "Pesawat layang gantung olahraga paralayang udara"
      },
      {
        "key": "C",
        "text": "Balon udara panas bertenaga gas elpiji tabung"
      },
      {
        "key": "D",
        "text": "Satelit komunikasi orbit rendah pemancar sinyal"
      },
      {
        "key": "E",
        "text": "Drone agrikultur sprayer penyemprot otomatis"
      }
    ],
    "correct": "E",
    "explanation": "Drone sprayer agrikultur adalah wahana terbang nirawak (UAV) berpengendali GPS yang menyemprotkan cairan pupuk/pestisida dengan radius dan droplet mikro terukur."
  },
  {
    "id": 367,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 7,
    "question": "Sistem informasi berbasis data spasial iklim dari Kementerian Pertanian dan BMKG untuk memandu penetapan awal musim tanam di Belitang disebut...",
    "options": [
      {
        "key": "A",
        "text": "Katam Kalender Tanam Terpadu digital spasial"
      },
      {
        "key": "B",
        "text": "Simpatika sistem informasi pendidik madrasah"
      },
      {
        "key": "C",
        "text": "Dapodik data pokok pendidikan sekolah nasional"
      },
      {
        "key": "D",
        "text": "Siadin sistem informasi administrasi perizinan"
      },
      {
        "key": "E",
        "text": "PeduliLindungi aplikasi pemantau mobilitas warga"
      }
    ],
    "correct": "A",
    "explanation": "Katam Terpadu (Kalender Tanam Terpadu) menyajikan prediksi awal musim tanam, potensi luas tanam, estimasi curah hujan, dan rekomendasi varietas benih per kecamatan."
  },
  {
    "id": 368,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Konsep 'smart farming' (pertanian pintar) dalam modernisasi agribisnis di Kabupaten OKU Timur bertumpu pada pemanfaatan...",
    "options": [
      {
        "key": "A",
        "text": "Tenaga kerja hewan ternak sapi dalam jumlah ribuan"
      },
      {
        "key": "B",
        "text": "Teknologi digital, sensor IoT, dan otomatisasi data"
      },
      {
        "key": "C",
        "text": "Pemberian mantra gaib penolak hama oleh pawang desa"
      },
      {
        "key": "D",
        "text": "Penutupan seluruh akses persawahan dari dunia internet"
      },
      {
        "key": "E",
        "text": "Penebangan seluruh pepohonan di sepanjang pinggir jalan"
      }
    ],
    "correct": "B",
    "explanation": "Smart farming memadukan teknologi kecerdasan buatan, Internet of Things (IoT), drone, dan sensor tanah untuk pengambilan keputusan budidaya presisi dan efisien."
  },
  {
    "id": 369,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 9,
    "question": "Penerapan sistem tanam jajar legowo (tipe 2:1) meningkatkan produktivitas panen padi sawah di Belitang terutama karena memanfaatkan fenomena...",
    "options": [
      {
        "key": "A",
        "text": "Efek penenggelaman akar padi di lumpur paling dalam"
      },
      {
        "key": "B",
        "text": "Penyinaran lampu listrik tenaga surya di malam hari"
      },
      {
        "key": "C",
        "text": "Efek tanaman pinggir border effect menyerap surya"
      },
      {
        "key": "D",
        "text": "Pengurangan jumlah rumpun tanaman hingga separuh lahan"
      },
      {
        "key": "E",
        "text": "Pencegahan angin agar tidak berhembus melintasi sawah"
      }
    ],
    "correct": "C",
    "explanation": "Lorong legowo membuat setiap baris tanaman berperilaku sebagai tanaman pinggir (border effect) yang menerima fotosintesis sinar matahari dan sirkulasi CO2 maksimal."
  },
  {
    "id": 370,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 10,
    "question": "Peranan penting mesin destoner (pemisah batu) pada pabrik penggilingan padi (RMU) modern bagi kualitas beras Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengubah butir beras biasa menjadi berbentuk mutiara"
      },
      {
        "key": "B",
        "text": "Menambahkan zat pemutih kimia klorin ke dalam butir"
      },
      {
        "key": "C",
        "text": "Mewajibkan beras dimasak menggunakan air mendidih murni"
      },
      {
        "key": "D",
        "text": "Memisahkan butiran kerikil berat jenis sama dari gabah"
      },
      {
        "key": "E",
        "text": "Mengurangi kandungan karbohidrat beras hingga nol persen"
      }
    ],
    "correct": "D",
    "explanation": "Destoner menggunakan perbedaan berat jenis dan getaran hembusan udara untuk menyaring butiran batu/kerikil kecil yang lolos dari pembersihan awal gabah."
  },
  {
    "id": 371,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 11,
    "question": "Gabah basah hasil panen musim hujan yang menumpuk lebih dari 24 jam tanpa dikeringkan akan mengalami kerusakan mutu serius berupa...",
    "options": [
      {
        "key": "A",
        "text": "Batang jerami padi berubah menjadi logam tembaga murni"
      },
      {
        "key": "B",
        "text": "Butir gabah mengecil menjadi butiran pasir pantai halus"
      },
      {
        "key": "C",
        "text": "Beras berubah warna menjadi hijau terang berbau wangi"
      },
      {
        "key": "D",
        "text": "Kadar amilosa beras meningkat menjadi seratus persen"
      },
      {
        "key": "E",
        "text": "Fermentasi panas memicu butir kuning, berkecambah, dan busuk"
      }
    ],
    "correct": "E",
    "explanation": "Respirasi aktif gabah basah yang tertumpuk padat menimbulkan kenaikan suhu lokal (self-heating), memicu jamur, perubahan warna butir kuning/rusak, dan perkecambahan."
  },
  {
    "id": 372,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Keunggulan penggunaan drone sprayer dibanding alat semprot manual knapsack dalam pemupukan daun di hamparan sawah Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Penyemprotan super cepat, sebaran merata, dan bebas lelah"
      },
      {
        "key": "B",
        "text": "Drone tidak memerlukan baterai isi ulang maupun bensin"
      },
      {
        "key": "C",
        "text": "Drone dapat memanen bulir gabah langsung dari udara"
      },
      {
        "key": "D",
        "text": "Menghilangkan keharusan membeli pupuk cair tanaman"
      },
      {
        "key": "E",
        "text": "Drone bekerja otomatis tanpa perlu dikemudikan operator"
      }
    ],
    "correct": "A",
    "explanation": "Drone mampu menyelesaikan 1 hektar sawah dalam waktu 10-15 menit dengan butiran kabut (droplet) halus merata terdorong angin baling-baling, tanpa menginjak tanaman."
  },
  {
    "id": 373,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 13,
    "question": "Pemanfaatan sensor pH meter digital tanah portabel membantu petani sawah di Belitang dalam mengambil keputusan agronomis berupa...",
    "options": [
      {
        "key": "A",
        "text": "Menentukan waktu keberangkatan bus perjalanan field trip"
      },
      {
        "key": "B",
        "text": "Menakar kebutuhan kapur dolomit untuk atasi kemasaman tanah"
      },
      {
        "key": "C",
        "text": "Mengetahui ramalan nasib keberuntungan panen musim depan"
      },
      {
        "key": "D",
        "text": "Memeriksa keaslian uang kertas hasil penjualan beras"
      },
      {
        "key": "E",
        "text": "Menghentikan seluruh pemakaian pupuk kompos kandang sapi"
      }
    ],
    "correct": "B",
    "explanation": "Sensor pH menunjukkan tingkat keasaman tanah sawah; jika pH di bawah 5,5, petani perlu mengaplikasikan kapur pertanian (dolomit) untuk menetralkan tanah."
  },
  {
    "id": 374,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 14,
    "question": "Penurunan angka susut panen (losses) padi dari 10% menjadi di bawah 3% berkat modernisasi alsintan pascapanen secara makro berdampak pada...",
    "options": [
      {
        "key": "A",
        "text": "Kenaikan drastis impor beras dari negara tetangga"
      },
      {
        "key": "B",
        "text": "Penurunan drastis jumlah penduduk di Kabupaten OKU Timur"
      },
      {
        "key": "C",
        "text": "Penyelamatan ribuan ton beras penopang cadangan nasional"
      },
      {
        "key": "D",
        "text": "Penutupan seluruh penggilingan padi swasta di Belitang"
      },
      {
        "key": "E",
        "text": "Kenaikan angka pengangguran terbuka di sektor perkotaan"
      }
    ],
    "correct": "C",
    "explanation": "Penurunan susut panen sebesar 7% pada skala produksi OKU Timur setara dengan menyelamatkan puluhan ribu ton beras yang langsung menambah pasokan pangan nasional."
  },
  {
    "id": 375,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 15,
    "question": "Mesin pemilah warna optik (color sorter) pada pabrik penggilingan beras modern bekerja dengan bantuan kamera sensor canggih untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mewarnai butir beras putih menjadi merah atau ungu"
      },
      {
        "key": "B",
        "text": "Membuat butir beras mengeluarkan aroma wangi melati"
      },
      {
        "key": "C",
        "text": "Menghitung berat kotor karung beras saat ditimbang"
      },
      {
        "key": "D",
        "text": "Menolak dan meniup butir beras kuning, hitam, atau kapur"
      },
      {
        "key": "E",
        "text": "Mengemas beras ke dalam karung plastik secara otomatis"
      }
    ],
    "correct": "D",
    "explanation": "Color sorter mendeteksi diskolorisasi butiran beras cacat (beras kuning, hitam, berbintik, atau berkapur) menggunakan kamera optik dan menyemprotnya keluar dengan hembusan angin pneumatik."
  },
  {
    "id": 376,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Faktor psikososial utama yang menyebabkan sebagian generasi muda di perdesaan Belitang masih enggan menjadi petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ketiadaan lahan persawahan subur di Kabupaten OKU Timur"
      },
      {
        "key": "B",
        "text": "Harga beras Belitang yang tidak laku dijual di pasaran"
      },
      {
        "key": "C",
        "text": "Larangan bagi anak muda untuk mengoperasikan traktor mesin"
      },
      {
        "key": "D",
        "text": "Kewajiban seluruh sarjana untuk menjadi pegawai negeri sipil"
      },
      {
        "key": "E",
        "text": "Stigma bahwa profesi petani identik kotor, berat, dan kuno"
      }
    ],
    "correct": "E",
    "explanation": "Citra pertanian konvensional yang melelahkan fisik dan berlumpur menimbulkan persepsi negatif; modernisasi melalui smart farming dan agribisnis digital menjadi kunci memulihkan minat generasi muda."
  },
  {
    "id": 377,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 17,
    "question": "Petani di Belitang menerapkan sistem jajar legowo 2:1 (jarak tanam 20 cm x 10 cm x 40 cm). Perhitungan populasi rumpun padi per hektar dibanding tegel 20 cm x 20 cm menunjukkan...",
    "options": [
      {
        "key": "A",
        "text": "Populasi meningkat sekitar 33 persen menjadi 333 ribu rumpun"
      },
      {
        "key": "B",
        "text": "Populasi tanaman berkurang separuh menjadi 125 ribu rumpun"
      },
      {
        "key": "C",
        "text": "Populasi tetap sama persis tanpa ada perubahan sedikitpun"
      },
      {
        "key": "D",
        "text": "Jumlah rumpun menurun karena lorong tengah dibiarkan kosong"
      },
      {
        "key": "E",
        "text": "Sawah hanya dapat ditanami 50 ribu rumpun tanaman padi saja"
      }
    ],
    "correct": "A",
    "explanation": "Sistem legowo 2:1 merapatkan jarak tanam dalam barisan (10 cm), sehingga meskipun ada lorong kosong 40 cm, populasi rumpun meningkat sekitar 33% (dari 250.000 menjadi 333.300 rumpun/ha)."
  },
  {
    "id": 378,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 18,
    "question": "Ketika panen padi bertepatan dengan hujan lebat berturut-turut di Belitang, langkah operasional pascapanen paling tepat yang harus diterapkan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membiarkan gabah terendam air di dalam karung plastik rapat"
      },
      {
        "key": "B",
        "text": "Memasukkan gabah ke mesin flat bed dryer pengering mekanis"
      },
      {
        "key": "C",
        "text": "Menjemur gabah di bawah rintik hujan tanpa pelindung atap"
      },
      {
        "key": "D",
        "text": "Membakar separuh gabah basah untuk mengeringkan sisanya"
      },
      {
        "key": "E",
        "text": "Menjual gabah dengan harga gratis kepada siapa saja yang lewat"
      }
    ],
    "correct": "B",
    "explanation": "Penggunaan flat bed dryer mekanis memutus ketergantungan pada sinar matahari, mengeringkan gabah basah secara cepat dan menyelamatkan mutu butir beras dari kerusakan."
  },
  {
    "id": 379,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 19,
    "question": "Operator drone agrikultur yang hendak melakukan penyemprotan pupuk cair di hamparan sawah Belitang wajib menerapkan prosedur keselamatan K3 berupa...",
    "options": [
      {
        "key": "A",
        "text": "Menerbangkan drone di bawah kabel jaringan listrik tegangan tinggi"
      },
      {
        "key": "B",
        "text": "Menyemprotkan pupuk cair tepat di atas kerumunan warga yang menonton"
      },
      {
        "key": "C",
        "text": "Mengecek arah angin, baterai, kalibrasi GPS, dan memakai APD"
      },
      {
        "key": "D",
        "text": "Menutup mata saat drone sedang terbang melintasi persawahan"
      },
      {
        "key": "E",
        "text": "Menerbangkan drone saat terjadi badai petir dan angin kencang"
      }
    ],
    "correct": "C",
    "explanation": "SOP operasional drone mencakup pra-terbang (cek kalibrasi kompas/GPS, baterai), pengamatan cuaca/kecepatan angin, serta penggunaan Alat Pelindung Diri (masker, kacamata pelindung)."
  },
  {
    "id": 380,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 20,
    "question": "Pengelola RMU mendapati persentase beras patah (broken rice) terlalu tinggi saat menggiling gabah. Tindakan teknis perbaikan mesin yang harus diterapkan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menambahkan oli pelumas mesin langsung ke dalam corong gabah"
      },
      {
        "key": "B",
        "text": "Menaikkan putaran mesin husker melebihi batas kecepatan aman"
      },
      {
        "key": "C",
        "text": "Mengganti saringan beras dengan kawat berduri penusuk"
      },
      {
        "key": "D",
        "text": "Menyetel ulang celah rol karet husker dan tekanan silinder poles"
      },
      {
        "key": "E",
        "text": "Menggiling gabah yang kadar airnya masih di atas 22 persen"
      }
    ],
    "correct": "D",
    "explanation": "Celah rubber roll (rol karet) yang terlalu sempit atau tekanan batu penyosoh (polisher) yang berlebihan menimbulkan gesekan keras yang meremukkan butiran beras."
  },
  {
    "id": 381,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 21,
    "question": "Ketika petani hendak menyebarkan pupuk urea susulan pada pertanaman padi fase anakan, pemanfaatan informasi Katam digital BMKG memandu petani untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menabur pupuk saat prakiraan cuaca menunjukkan badai hujan lebat"
      },
      {
        "key": "B",
        "text": "Menghentikan seluruh pemberian pupuk sepanjang hidup tanaman"
      },
      {
        "key": "C",
        "text": "Membuang seluruh persediaan pupuk urea ke dalam saluran primer"
      },
      {
        "key": "D",
        "text": "Menabur pupuk saat kondisi tanah tergenang banjir meluap"
      },
      {
        "key": "E",
        "text": "Memilih hari cerah berawan agar pupuk terserap tanpa tercuci"
      }
    ],
    "correct": "E",
    "explanation": "Menabur pupuk saat curah hujan ekstrem memicu hanyutnya hara nitrogen (leaching) terbawa aliran limpasan air sawah sebelum sempat diserap perakaran tanaman."
  },
  {
    "id": 382,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 22,
    "question": "Lulusan muda di Belitang ingin mengemas beras premium kemasan 5 kg berlabel mandiri. Langkah penerapan penjaminan mutu yang harus dipenuhi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Uji derajat sosoh minimal 95 persen, kadar air 14 persen, dan izin Kementan"
      },
      {
        "key": "B",
        "text": "Mencampur beras menir patah dengan beras ketan tanpa merek"
      },
      {
        "key": "C",
        "text": "Menyemprotkan parfum melati agar beras harum sepanjang masa"
      },
      {
        "key": "D",
        "text": "Menjual beras tanpa mencantumkan berat netto kemasan pada kantong"
      },
      {
        "key": "E",
        "text": "Mengemas beras basah berkadar air 20 persen langsung ke karung"
      }
    ],
    "correct": "A",
    "explanation": "Standar beras premium mensyaratkan derajat sosoh minimal 95%, butir patah maksimal 15%, kadar air maksimal 14%, bebas butir gabah/batu, dan registrasi kemasan PSAT Kementan."
  },
  {
    "id": 383,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 23,
    "question": "Petani padi di Belitang menggunakan alat Bagan Warna Daun (BWD) 4 skala untuk memandu pemupukan nitrogen. Cara penerapannya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menempelkan BWD ke tanah sawah untuk mengukur kelembaban"
      },
      {
        "key": "B",
        "text": "Mencocokkan warna daun teratas dengan skala warna di bawah naungan tubuh"
      },
      {
        "key": "C",
        "text": "Mencelupkan BWD ke dalam air saluran irigasi selama 24 jam"
      },
      {
        "key": "D",
        "text": "Mewarnai daun padi menggunakan cat hijau sesuai warna skala BWD"
      },
      {
        "key": "E",
        "text": "Mematahkan batang padi lalu membakarnya bersama alat BWD"
      }
    ],
    "correct": "B",
    "explanation": "Pembacaan BWD dilakukan pada daun teratas yang telah membuka penuh, di bawah naungan tubuh agar tidak bias sinar matahari langsung, untuk menentukan perlu tidaknya tambahan urea."
  },
  {
    "id": 384,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 24,
    "question": "Pengelola penggilingan padi di Belitang mengonversi sekam sisa giling menjadi briket arang sekam dan abu silika. Penerapan teknologi ini merupakan wujud...",
    "options": [
      {
        "key": "A",
        "text": "Pemborosan biaya produksi yang membebani harga jual beras"
      },
      {
        "key": "B",
        "text": "Pelanggaran aturan kebersihan lingkungan pabrik penggilingan"
      },
      {
        "key": "C",
        "text": "Pemanfaatan biomassa limbah menjadi produk bernilai tambah sirkular"
      },
      {
        "key": "D",
        "text": "Penggantian beras makan warga dengan briket sekam padi bakar"
      },
      {
        "key": "E",
        "text": "Penutupan jalur distribusi beras menuju pasar tradisional"
      }
    ],
    "correct": "C",
    "explanation": "Pemanfaatan sekam padi menjadi briket bahan bakar atau arang media tanam (zero waste agriculture) mengubah limbah pengganggu menjadi pendapatan ekonomi baru."
  },
  {
    "id": 385,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 25,
    "question": "Mengapa beras hasil olahan RMU modern di Belitang memiliki harga jual lebih tinggi dibanding beras gilingan keliling? Analisis mutu menunjukkan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Beras gilingan keliling diberi pewarna makanan buatan pabrik"
      },
      {
        "key": "B",
        "text": "RMU modern disubsidi dana devisa internasional luar negeri"
      },
      {
        "key": "C",
        "text": "Beras keliling memiliki kadar racun pestisida mematikan"
      },
      {
        "key": "D",
        "text": "RMU modern menghasilkan beras mengkilap, minim patah, dan bebas batu"
      },
      {
        "key": "E",
        "text": "Gilingan keliling dilarang beroperasi oleh peraturan kepolisian"
      }
    ],
    "correct": "D",
    "explanation": "RMU modern dilengkapi separator bertingkat, polisher pengkilap (tanpa kimia), dan destoner sehingga berasnya masuk kategori premium yang berharga jual tinggi."
  },
  {
    "id": 386,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 26,
    "question": "Analisis faktor penghambat adopsi teknologi drone pertanian di kalangan petani pedesaan usia lanjut di OKU Timur menunjukkan akar masalah pada...",
    "options": [
      {
        "key": "A",
        "text": "Larangan membawa gawai pengendali drone di kawasan persawahan"
      },
      {
        "key": "B",
        "text": "Ketiadaan udara terbuka di atas persawahan wilayah Belitang"
      },
      {
        "key": "C",
        "text": "Baterai drone hanya dapat diisi ulang di negara produsen asalnya"
      },
      {
        "key": "D",
        "text": "Tanaman padi akan mati seketika jika dilintasi oleh bayangan drone"
      },
      {
        "key": "E",
        "text": "Biaya investasi awal tinggi dan keterbatasan literasi digital mekanik"
      }
    ],
    "correct": "E",
    "explanation": "Tingginya harga unit drone (puluhan juta rupiah), kebutuhan keterampilan pemrograman jalur terbang (mission planner), dan literasi digital menjadi kendala bagi petani senior."
  },
  {
    "id": 387,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 27,
    "question": "Mengapa penerapan sistem jajar legowo mampu menekan tingkat serangan hama tikus sawah di Belitang? Analisis agronomis membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Lorong legowo yang terang dan terbuka tidak disukai tikus bersarang"
      },
      {
        "key": "B",
        "text": "Tanaman padi legowo mengeluarkan gelombang ultrasonik pengusir"
      },
      {
        "key": "C",
        "text": "Tikus sawah memakan pupuk urea yang diletakkan di lorong tanaman"
      },
      {
        "key": "D",
        "text": "Lorong legowo selalu dialiri air panas mendidih sepanjang malam"
      },
      {
        "key": "E",
        "text": "Tikus sawah hanya menyerang tanaman padi yang ditanam secara acak"
      }
    ],
    "correct": "A",
    "explanation": "Tikus menyukai lingkungan yang rimbun, lembap, dan gelap; lorong legowo yang terbuka mempermudah masuknya cahaya matahari dan pergerakan predator alami (burung hantu/ular)."
  },
  {
    "id": 388,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 28,
    "question": "Analisis dampak keberadaan mesin pengering mekanis (bed dryer) terhadap stabilitas harga gabah petani saat musim hujan di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuat harga gabah anjlok hingga mencapai titik nol rupiah"
      },
      {
        "key": "B",
        "text": "Mencegah anjloknya harga gabah basah akibat tengkulak beralasan rusak"
      },
      {
        "key": "C",
        "text": "Mengharuskan petani membuang gabahnya ke saluran irigasi teknis"
      },
      {
        "key": "D",
        "text": "Menaikkan biaya transportasi pengiriman beras ke luar kota"
      },
      {
        "key": "E",
        "text": "Menjadikan seluruh petani sawah beralih menanam komoditas jagung"
      }
    ],
    "correct": "B",
    "explanation": "Dengan adanya fasilitas pengeringan mekanis, tengkulak tidak lagi dapat mempermainkan harga beli gabah basah petani dengan dalih risiko busuk akibat cuaca hujan."
  },
  {
    "id": 389,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 29,
    "question": "Fenomena pergeseran minat pemuda desa OKU Timur yang lebih memilih merantau ke kawasan industri Jawa dianalisis secara sosio-kultural didorong oleh...",
    "options": [
      {
        "key": "A",
        "text": "Ketiadaan pasokan listrik dan internet di perdesaan Belitang"
      },
      {
        "key": "B",
        "text": "Larangan bagi pemuda untuk memiliki tabungan uang di bank desa"
      },
      {
        "key": "C",
        "text": "Daya tarik upah bulanan pasti di pabrik dan gengsi sosial kota"
      },
      {
        "key": "D",
        "text": "Seluruh lahan persawahan di OKU Timur musnah akibat bencana gempa"
      },
      {
        "key": "E",
        "text": "Kewajiban seluruh pemuda untuk merantau sebelum usia dua puluh"
      }
    ],
    "correct": "C",
    "explanation": "Kepastian penerimaan gaji bulanan di sektor industri formal kota serta prestise sosial modern menjadi faktor pendorong utama arus urbanisasi tenaga kerja muda desa."
  },
  {
    "id": 390,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 30,
    "question": "Analisis efisiensi penggunaan bahan kimia pupuk/pestisida menggunakan drone dibanding penyemprotan konvensional menunjukkan bahwa drone mampu...",
    "options": [
      {
        "key": "A",
        "text": "Menghilangkan kebutuhan air pelarut pestisida menjadi nol liter"
      },
      {
        "key": "B",
        "text": "Meningkatkan dosis racun kimia hingga sepuluh kali lipat takaran"
      },
      {
        "key": "C",
        "text": "Mengubah cairan pestisida kimia menjadi pupuk organik murni"
      },
      {
        "key": "D",
        "text": "Menghemat volume air hingga 80 persen dengan partikel kabut ultra-low"
      },
      {
        "key": "E",
        "text": "Menyemprotkan benih padi secara otomatis ke dalam buah malai"
      }
    ],
    "correct": "D",
    "explanation": "Teknologi ultra-low volume (ULV) pada nozzle drone memecah larutan menjadi droplet mikro yang menempel lekat pada daun, menghemat volume air dari 200–300 L/ha menjadi hanya 20–30 L/ha."
  },
  {
    "id": 391,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 31,
    "question": "Fenomena tanah sawah di Belitang yang 'bantat' dan mengeras saat kering jika dianalisis dari riwayat pemupukan disebabkan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Air saluran irigasi Komering yang mengandung terlalu banyak ikan"
      },
      {
        "key": "B",
        "text": "Pemberian pupuk kandang sapi yang melebihi takaran satu ton"
      },
      {
        "key": "C",
        "text": "Penanaman varietas padi unggul Inpari secara berulang-ulang"
      },
      {
        "key": "D",
        "text": "Pemasangan mesin combine harvester yang berputar di atas pematang"
      },
      {
        "key": "E",
        "text": "Penurunan bahan organik akibat pupuk kimia terus-menerus tanpa kompos"
      }
    ],
    "correct": "E",
    "explanation": "Pemupukan anorganik kimia tanpa asupan bahan organik (kompos/jerami) merusak struktur biologi tanah, memadatkan partikel lempung, dan menurunkan populasi mikrob perombak hara."
  },
  {
    "id": 392,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 32,
    "question": "Analisis dampak integrasi pemasaran beras kemasan Belitang di platform perdagangan elektronik (e-commerce) terhadap rantai pasok membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Memangkas perantara tengkulak dan menghubungkan produsen ke konsumen"
      },
      {
        "key": "B",
        "text": "Mengharuskan beras Belitang dikirim menggunakan pesawat antariksa"
      },
      {
        "key": "C",
        "text": "Mewajibkan konsumen membeli beras dengan mata uang dolar Amerika"
      },
      {
        "key": "D",
        "text": "Menutup seluruh pasar tradisional di wilayah Kabupaten OKU Timur"
      },
      {
        "key": "E",
        "text": "Menaikkan biaya produksi pertanian sawah menjadi sepuluh kali lipat"
      }
    ],
    "correct": "A",
    "explanation": "Digitalisasi rantai pasok (direct-to-consumer) meniadakan rantai calo/tengkulak panjang, sehingga petani/RMU memperoleh margin harga lebih adil dan konsumen mendapat beras segar."
  },
  {
    "id": 393,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 33,
    "question": "Ketika mengevaluasi efektivitas modernisasi fasilitas RMU milik Gapoktan di Belitang terhadap pendapatan anggota, indikator penilaian utama adalah...",
    "options": [
      {
        "key": "A",
        "text": "Banyaknya spanduk peresmian pabrik yang dipasang di tepi jalan"
      },
      {
        "key": "B",
        "text": "Kenaikan rendemen giling gabah dan harga beli gabah di petani"
      },
      {
        "key": "C",
        "text": "Kemampuan ketua Gapoktan berpidato di hadapan menteri pertanian"
      },
      {
        "key": "D",
        "text": "Kenyamanan ruang tunggu ber-AC di dalam gedung penggilingan padi"
      },
      {
        "key": "E",
        "text": "Jumlah pegawai kantoran yang dipekerjakan di bagian administrasi"
      }
    ],
    "correct": "B",
    "explanation": "Kinerja RMU modern berhasil jika mampu meningkatkan angka rendemen beras kepala (dari 60% menjadi 65–68%) dan mampu membeli gabah petani dengan harga lebih menguntungkan."
  },
  {
    "id": 394,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 34,
    "question": "Sebuah usulan program mendorong pembentukan brigade drone semprot pertanian perdesaan di OKU Timur. Evaluasi terhadap prasyarat keberlanjutannya menyimpulkan perlunya...",
    "options": [
      {
        "key": "A",
        "text": "Mengharuskan drone diterbangkan tanpa panduan peta satelit GPS"
      },
      {
        "key": "B",
        "text": "Membubarkan seluruh kelompok tani yang anggotanya berusia tua"
      },
      {
        "key": "C",
        "text": "Pelatihan pilot bersertifikat, ketersediaan bengkel suku cadang, dan baterai"
      },
      {
        "key": "D",
        "text": "Melarang penyemprotan pupuk dilakukan pada pagi dan sore hari"
      },
      {
        "key": "E",
        "text": "Menetapkan tarif sewa drone lebih mahal daripada harga tanah sawah"
      }
    ],
    "correct": "C",
    "explanation": "Keberlanjutan unit layanan drone memerlukan pilot yang terampil mengoperasikan software penerbangan, manajemen perawatan baterai LiPo, dan jaminan ketersediaan suku cadang motor/propeller."
  },
  {
    "id": 395,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 35,
    "question": "Menilai strategi penekanan susut panen (losses) padi nasional di bawah 5%, kebijakan investasi infrastruktur pascapanen paling tepat di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membangun tugu patung petani raksasa di setiap persimpangan jalan"
      },
      {
        "key": "B",
        "text": "Melarang pengangkutan gabah menggunakan kendaraan truk bermotor"
      },
      {
        "key": "C",
        "text": "Mewajibkan pemotongan padi menggunakan pisau ani-ani tradisional"
      },
      {
        "key": "D",
        "text": "Masifikasi combine harvester prima dan dryer mekanis berkapasitas besar"
      },
      {
        "key": "E",
        "text": "Menghentikan seluruh penanaman padi sawah saat musim penghujan"
      }
    ],
    "correct": "D",
    "explanation": "Kombinasi penggunaan combine harvester yang terkalibrasi presisi dan flat/vertical dryer berkapasitas besar merupakan solusi terbukti menurunkan angka susut dari sawah hingga gudang."
  },
  {
    "id": 396,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 36,
    "question": "Evaluasi terhadap program pembinaan wirausaha muda pertanian (petani milenial) di Kabupaten OKU Timur membuktikan bahwa faktor pengungkit keberhasilannya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pemberian cangkul dan caping tradisional berbahan anyaman bambu"
      },
      {
        "key": "B",
        "text": "Kewajiban tinggal di gubuk sawah tanpa fasilitas komunikasi"
      },
      {
        "key": "C",
        "text": "Larangan bagi pemuda tani untuk menggunakan media sosial promosi"
      },
      {
        "key": "D",
        "text": "Pembatasan pasar penjualan produk hanya di lingkungan keluarga"
      },
      {
        "key": "E",
        "text": "Akses pembiayaan modal, pendampingan inovasi agritech, dan pasar pasti"
      }
    ],
    "correct": "E",
    "explanation": "Petani milenial membutuhkan ekosistem pendukung: akses permodalan usaha tanpa agunan rumit, bimbingan teknis agriteknologi modern, dan kepastian akses pasar (offtaker)."
  },
  {
    "id": 397,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 37,
    "question": "Menilai kelayakan pengembangan persawahan padi organik bersertifikat di Belitang, tantangan teknis ekologis terbesar yang harus diantisipasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Rembesan residu pestisida kimia dari air irigasi sawah tetangga hulu"
      },
      {
        "key": "B",
        "text": "Ketiadaan sinar matahari yang cukup di kawasan persawahan Belitang"
      },
      {
        "key": "C",
        "text": "Harga beras organik yang tidak diminati oleh masyarakat perkotaan"
      },
      {
        "key": "D",
        "text": "Larangan dari dinas pertanian daerah untuk memproduksi beras sehat"
      },
      {
        "key": "E",
        "text": "Tanaman padi organik menolak menyerap pupuk kompos daun hijau"
      }
    ],
    "correct": "A",
    "explanation": "Sertifikasi organik menuntut isolasi buffer zone ketat agar air irigasi yang masuk tidak terkontaminasi residu pupuk kimia sintetis atau pestisida dari petak sawah konvensional di sekitarnya."
  },
  {
    "id": 398,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 38,
    "question": "Sebuah program daerah merencanakan pembangunan fasilitas penyimpanan silo berudara dingin (chilled silo) di Belitang. Evaluasi terhadap dampak strategisnya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menimbulkan pemborosan anggaran tanpa ada nilai manfaat ekonomis"
      },
      {
        "key": "B",
        "text": "Menjaga kesegaran gabah, memperpanjang masa simpan, dan stabilkan pasokan"
      },
      {
        "key": "C",
        "text": "Mengharuskan seluruh petani sawah menjual gabahnya ke luar pulau"
      },
      {
        "key": "D",
        "text": "Menyebabkan beras berubah menjadi butiran es beku yang keras"
      },
      {
        "key": "E",
        "text": "Menghentikan seluruh kegiatan penggilingan padi swasta di pedesaan"
      }
    ],
    "correct": "B",
    "explanation": "Silo penyimpanan berpendingin menjaga kualitas fisiologis benih/gabah, mencegah serangan kutu gudang (Sitophilus oryzae), dan memungkinkan pelepasan stok pangan secara teratur."
  },
  {
    "id": 399,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 39,
    "question": "Menilai arah transformasi sektor pertanian OKU Timur di era digital Society 5.0, pergeseran paradigma paling mendasar yang harus dibangun di sekolah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mewajibkan seluruh siswa belajar mencangkul tanah tanpa menggunakan sepatu"
      },
      {
        "key": "B",
        "text": "Melarang siswa membawa gawai telepon pintar ke laboratorium sekolah"
      },
      {
        "key": "C",
        "text": "Memandang agribisnis sebagai profesi presisi berbasis sains dan teknologi"
      },
      {
        "key": "D",
        "text": "Mengajarkan bahwa kekayaan hanya bisa didapatkan melalui sektor pertambangan"
      },
      {
        "key": "E",
        "text": "Menghapus pelajaran biologi dan fisika dari kurikulum pendidikan sekolah"
      }
    ],
    "correct": "C",
    "explanation": "Pendidikan modern harus mereposisi citra pertanian dari sekadar kerja fisik tradisional menjadi industri agriteknologi cerdas bernilai tambah tinggi yang menarik bagi generasi digital."
  },
  {
    "id": 400,
    "day": 2,
    "indicatorCode": "E",
    "indicatorKey": "modul_e_inovasi_smart_farming",
    "indicatorName": "Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian, dan Keterampilan Teknis Petani Ogan Komering Ulu Timur",
    "cognitiveLevel": "C5",
    "numberInIndicator": 40,
    "question": "Evaluasi komprehensif terhadap integrasi mekanisasi hulu-hilir (transplanter, combine, dryer, dan RMU) di Belitang menghasilkan kesimpulan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Mekanisasi pertanian hanya menguntungkan pabrik pembuat mesin di luar negeri"
      },
      {
        "key": "B",
        "text": "Mekanisasi modern mematikan seluruh aktivitas gotong royong warga desa selamanya"
      },
      {
        "key": "C",
        "text": "Mekanisasi sawah menimbulkan polusi suara yang mengganggu ketenangan pedesaan"
      },
      {
        "key": "D",
        "text": "Modernisasi hulu-hilir adalah pilar ketahanan pangan dan kesejahteraan petani"
      },
      {
        "key": "E",
        "text": "Penggunaan alat mesin pertanian modern mewajibkan harga beras dinaikkan drastis"
      }
    ],
    "correct": "D",
    "explanation": "Modernisasi terintegrasi dari olah tanah hingga pascapanen menekan biaya usaha tani, menekan susut panen, melipatgandakan indeks pertanaman, dan memperkokoh kedaulatan pangan nasional."
  }
],
    3: [
  {
    "id": 1,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Kondisi tanah sawah di sepanjang jaringan irigasi Belitang didominasi oleh tanah aluvial dan glei humus. Mengapa tekstur tanah lempung berdebu (silty clay loam) sangat ideal bagi budidaya padi sawah di OKU Timur?",
    "options": [
      {
        "key": "A",
        "text": "Karena memiliki permeabilitas sangat tinggi sehingga air cepat hilang meresap ke dalam tanah"
      },
      {
        "key": "B",
        "text": "Karena mampu menahan air (water holding capacity) dan mengikat unsur hara pupuk dengan sangat baik pada kondisi tergenang"
      },
      {
        "key": "C",
        "text": "Karena tanah tersebut tidak membutuhkan pemupukan nitrogen dan fosfat sama sekali sepanjang musim tanam"
      },
      {
        "key": "D",
        "text": "Karena tekstur berpasirnya mempermudah akar padi menembus hingga kedalaman 3 meter di bawah tanah"
      },
      {
        "key": "E",
        "text": "Karena struktur tanahnya selalu kering dan retak sehingga memicu pembungaan padi lebih cepat"
      }
    ],
    "correct": "B",
    "explanation": "Tanah aluvial dan lempung glei humus di Belitang memiliki pori mikro melimpah yang mampu menahan air dan kapasitas tukar kation (KTK) tinggi, sangat cocok untuk padi sawah yang membutuhkan genangan air macak-macak."
  },
  {
    "id": 2,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Air irigasi primer Belitang berasal dari Sungai Komering yang dibendung di Bendung Perjaya. Mengapa endapan lumpur halus (sedimen) yang terbawa aliran air irigasi Komering berdampak positif bagi kesuburan fisik dan kimia tanah sawah?",
    "options": [
      {
        "key": "A",
        "text": "Lumpur sedimen sungai mengendapkan mineral kaya hara alami yang menyuburkan dan memperkaya lapisan olah tanah"
      },
      {
        "key": "B",
        "text": "Lumpur sedimen berfungsi menaikkan pH tanah hingga mencapai kondisi sangat basa (pH > 9.0)"
      },
      {
        "key": "C",
        "text": "Endapan lumpur membuat saluran irigasi cepat dangkal sehingga aliran air berhenti permanen"
      },
      {
        "key": "D",
        "text": "Lumpur sedimen mematikan seluruh mikroorganisme tanah sehingga sawah steril dari bakteri"
      },
      {
        "key": "E",
        "text": "Sedimen lumpur menghilangkan kebutuhan pengolahan tanah bajak pada musim tanam berikutnya"
      }
    ],
    "correct": "A",
    "explanation": "Air Sungai Komering membawa sedimen vulkanik halus dari hulu pegunungan Bukit Barisan dan Danau Ranau yang kaya unsur hara mineral alami, membantu menyuburkan lapisan top-soil sawah Belitang."
  },
  {
    "id": 3,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 3,
    "question": "Pada fase vegetatif aktif (umur 15-35 HST), tanaman padi membutuhkan unsur nitrogen (N) dalam jumlah tinggi. Namun jika petani di OKU Timur memupuk urea secara berlebihan saat musim hujan, dampak biologis apa yang paling rentan terjadi pada tanaman padi?",
    "options": [
      {
        "key": "A",
        "text": "Batang padi menjadi sangat kaku dan bulir gabah menjadi hampa"
      },
      {
        "key": "B",
        "text": "Jaringan dinding sel tanaman menjadi sukulen (lunak dan berair), sehingga rentan rebah dan mudah diserang jamur blas serta wereng"
      },
      {
        "key": "C",
        "text": "Akar padi berhenti menyerap air dan tanah menjadi sangat gembur seketika"
      },
      {
        "key": "D",
        "text": "Tanaman padi langsung memasuki fase pematangan bulir dalam waktu 5 hari"
      },
      {
        "key": "E",
        "text": "Daun padi berubah warna menjadi ungu kehitaman akibat keracunan klorofil"
      }
    ],
    "correct": "B",
    "explanation": "Pemupukan Nitrogen (Urea) berlebih menyebabkan pembelahan sel cepat dengan dinding sel tipis (sukulen), mengundang ledakan hama wereng coklat dan infeksi jamur blas (Pyricularia oryzae), serta memicu tanaman mudah roboh (rebah)."
  },
  {
    "id": 4,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 4,
    "question": "Dalam siklus hidup padi, fase pengisian bulir gabah (generatif matang susu hingga matang penuh) sangat dipengaruhi oleh intensitas radiasi sinar matahari. Proses fisiologis apa yang paling dominan berlangsung pada fase ini?",
    "options": [
      {
        "key": "A",
        "text": "Respirasi anaerobik di dalam perakaran untuk memecah lignin batang"
      },
      {
        "key": "B",
        "text": "Translokasi hasil fotosintesis (fotosintat berupa glukosa dan pati) dari daun bendera ke dalam bulir gabah"
      },
      {
        "key": "C",
        "text": "Pembentukan anakan produktif baru di pangkal batang bawah"
      },
      {
        "key": "D",
        "text": "Penyerapan unsur hara mikro boron untuk memperpanjang pelepah daun"
      },
      {
        "key": "E",
        "text": "Penguapan kutikula daun untuk mendinginkan suhu air sawah di sekitarnya"
      }
    ],
    "correct": "B",
    "explanation": "Daun bendera bertindak sebagai produsen utama fotosintat pada fase generatif, di mana karbohidrat hasil fotosintesis ditranslokasikan secara masif untuk mengisi bulir gabah hingga padat berisi."
  },
  {
    "id": 5,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Petani di Belitang sering mengamati serangan hama penggerek batang padi (Scirpophaga incertulas). Jika serangan larva hama ini terjadi pada fase generatif (saat malai keluar), gejala kerusakan spesifik yang tampak di sawah disebut...",
    "options": [
      {
        "key": "A",
        "text": "Sundep, di mana pucuk tanaman padi menguning dan mati pada fase anakan"
      },
      {
        "key": "B",
        "text": "Beluk, di mana malai padi keluar berwarna putih hampa dan mudah dicabut karena pangkalnya terpotong gerekan larva"
      },
      {
        "key": "C",
        "text": "Hawar daun bakteri, di mana tepi daun mengering bergelombang seperti terbakar"
      },
      {
        "key": "D",
        "text": "Kerdil rumput, di mana tanaman menjadi kerdil dan anakan tumbuh menyerupai rumput liar"
      },
      {
        "key": "E",
        "text": "Tungro, di mana daun padi berubah warna menjadi jingga kekuningan"
      }
    ],
    "correct": "B",
    "explanation": "Serangan penggerek batang pada fase anakan disebut 'sundep' (daun tengah mati), sedangkan pada fase keluarnya malai disebut 'beluk' (malai putih hampa, tegak, dan mudah dicabut)."
  },
  {
    "id": 6,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Kondisi pH tanah sawah ideal untuk penyerapan unsur hara makro (N, P, K) secara optimum pada tanaman padi di Belitang berkisar antara...",
    "options": [
      {
        "key": "A",
        "text": "pH 3.0 - 4.0 (sangat masam ekstrem)"
      },
      {
        "key": "B",
        "text": "pH 5.5 - 6.8 (agak masam hingga netral)"
      },
      {
        "key": "C",
        "text": "pH 8.5 - 10.0 (sangat basa)"
      },
      {
        "key": "D",
        "text": "pH 1.0 - 2.5 (asam sulfat pekat)"
      },
      {
        "key": "E",
        "text": "pH tanah tidak memiliki pengaruh apapun terhadap ketersediaan hara bagi akar tanaman"
      }
    ],
    "correct": "B",
    "explanation": "Pada rentang pH 5.5 - 6.8, ketersediaan hara esensial seperti Nitrogen, Fosfor, dan Kalium berada dalam bentuk ion terlarut yang paling mudah diserap oleh bulu akar padi tanpa terfiksasi logam berat."
  },
  {
    "id": 7,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Suhu udara dan kelembaban nisbi tinggi (>85%) saat musim penghujan di OKU Timur memicu ledakan penyakit jamur blas (Pyricularia oryzae). Bagian tanaman padi manakah yang menjadi sasaran utama spora jamur ini saat menyerang malai?",
    "options": [
      {
        "key": "A",
        "text": "Tudung akar primer di bawah lapisan lumpur"
      },
      {
        "key": "B",
        "text": "Leher malai (blas leher / neck blast), yang menyebabkan pembuluh nutrisi membusuk dan bulir patah atau hampa"
      },
      {
        "key": "C",
        "text": "Ujung serbuk sari sebelum terjadi penyerbukan"
      },
      {
        "key": "D",
        "text": "Stomata batang terbawah yang terendam air"
      },
      {
        "key": "E",
        "text": "Lapisan lilin pada pelepah daun terluar"
      }
    ],
    "correct": "B",
    "explanation": "Blas leher menyerang nodus/leher malai padi sehingga jaringan pengangkut menghitam membusuk, mengakibatkan pasokan nutrisi ke bulir terputus total dan malai menjadi hampa rebah."
  },
  {
    "id": 8,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 8,
    "question": "Penggenangan air sawah secara terus-menerus (continuous flooding) sedalam 15 cm tanpa jeda pengeringan dapat menyebabkan kondisi anaerobik ekstrem pada tanah. Apa akibat negatif fenomena reduksi kimia ini terhadap akar padi?",
    "options": [
      {
        "key": "A",
        "text": "Akar padi membesar dan menyerap nitrogen dalam bentuk nitrat lebih banyak"
      },
      {
        "key": "B",
        "text": "Terbentuknya gas beracun asam sulfida (H2S) dan keracunan besi (Fe2+), yang ditandai dengan perakaran membusuk berwarna hitam pekat"
      },
      {
        "key": "C",
        "text": "Tanah menjadi cepat kering dan memadat menyerupai batu"
      },
      {
        "key": "D",
        "text": "Pertumbuhan lumut sawah terhenti secara total"
      },
      {
        "key": "E",
        "text": "Jumlah anakan produktif meningkat hingga 80 anakan per rumpun"
      }
    ],
    "correct": "B",
    "explanation": "Genangan air terlalu dalam tanpa drainase memicu penurunan potensial redoks tanah, menghasilkan senyawa reduksi toksik (H2S dan Fe2+) yang meracuni dan mematikan sistem perakaran padi."
  },
  {
    "id": 9,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Varietas unggul Inpari 32 HDB banyak dibudidayakan petani Belitang karena memiliki ketahanan terhadap salah satu penyakit bakteri mematikan. Penyakit apakah yang dimaksud dengan kode HDB?",
    "options": [
      {
        "key": "A",
        "text": "Hawar Daun Bakteri (bacterial leaf blight) yang disebabkan oleh kuman Xanthomonas oryzae"
      },
      {
        "key": "B",
        "text": "Hama Penggerek Batang Hitam"
      },
      {
        "key": "C",
        "text": "Hibrida Daun Bergaris"
      },
      {
        "key": "D",
        "text": "Hama Wereng Coklat Biotipe 4"
      },
      {
        "key": "E",
        "text": "Hawar Jamur Bulir Beras"
      }
    ],
    "correct": "A",
    "explanation": "HDB merupakan singkatan dari Hawar Daun Bakteri (kresek) yang disebabkan oleh Xanthomonas oryzae pv. oryzae, patogen bakteri paling merusak daun padi pada musim penghujan."
  },
  {
    "id": 10,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Dalam konsep ekologi pertanian sawah di OKU Timur, mengapa keberadaan laba-laba serigala (Lycosa pseudoannulata) dan kepik mirid (Cyrtorhinus lividipennis) di petakan sawah sangat dijaga oleh petani terlatih PHT?",
    "options": [
      {
        "key": "A",
        "text": "Karena keduanya merupakan musuh alami predator yang memangsa wereng batang coklat dan telurnya"
      },
      {
        "key": "B",
        "text": "Karena serangga tersebut memakan gulma teki yang tumbuh di pematang sawah"
      },
      {
        "key": "C",
        "text": "Karena serangga tersebut menghasilkan kotoran yang dapat menjadi pupuk urea alami"
      },
      {
        "key": "D",
        "text": "Karena keberadaannya menjadi indikator bahwa air sawah mengandung pestisida dosis tinggi"
      },
      {
        "key": "E",
        "text": "Karena kedua serangga tersebut membantu proses penyerbukan malai padi di pagi hari"
      }
    ],
    "correct": "A",
    "explanation": "Lycosa pseudoannulata (laba-laba pemburu) dan Cyrtorhinus lividipennis merupakan agen hayati pengendali alami yang sangat efektif memangsa nimfa dan telur wereng coklat di ekosistem sawah."
  },
  {
    "id": 11,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Traktor roda dua (hand tractor) tipe rotary sangat populer di kalangan petani sawah Belitang pada tahap pengolahan tanah kedua. Apa fungsi mekanis utama dari pisau rotary pada traktor tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Membalik bongkahan tanah lapisan bawah ke permukaan sedalam 50 cm"
      },
      {
        "key": "B",
        "text": "Mencacah, menghaluskan gumpalan tanah, dan melumpurkan tanah (puddling) agar siap ditanami bibit padi"
      },
      {
        "key": "C",
        "text": "Menyedot air keluar dari saluran drainase pembuang"
      },
      {
        "key": "D",
        "text": "Menancapkan bibit padi secara otomatis pada jarak tanam 20 cm"
      },
      {
        "key": "E",
        "text": "Menyemprotkan herbisida cair ke seluruh hamparan gulma"
      }
    ],
    "correct": "B",
    "explanation": "Pisau rotary berputar cepat mencacah bongkahan tanah hasil bajak singkal dan mencampurnya dengan air sehingga tercipta lapisan lumpur homogen (puddling) yang sempurna untuk persemaian dan tanam bibit."
  },
  {
    "id": 12,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Penggunaan mesin panen combine harvester di sentra padi OKU Timur telah merevolusi proses panen. Tiga tahapan panen apa sajakah yang diintegrasikan secara serentak oleh mesin combine harvester dalam satu kali jalan?",
    "options": [
      {
        "key": "A",
        "text": "Membajak sawah, menanam bibit, dan menyiram air"
      },
      {
        "key": "B",
        "text": "Memotong batang padi (reaping), merontokkan bulir gabah (threshing), dan membersihkan gabah dari kotoran jerami (cleaning)"
      },
      {
        "key": "C",
        "text": "Menggiling gabah menjadi beras, memoles beras, dan mengemas karung 50 kg"
      },
      {
        "key": "D",
        "text": "Menyemprot pestisida, memupuk urea, dan mengukur kadar asam tanah"
      },
      {
        "key": "E",
        "text": "Mengeringkan gabah, memisahkan dedak, dan membakar sekam sisa"
      }
    ],
    "correct": "B",
    "explanation": "Combine harvester menggabungkan 3 fungsi utama: pemotongan tegakan jerami padi (reaper), perontokan bulir gabah dari malai (thresher), dan pembersihan dari sekam/debu kotoran (cleaner) langsung di sawah."
  },
  {
    "id": 13,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 3,
    "question": "Secara teknologis, salah satu keunggulan terbesar penggunaan combine harvester dibandingkan metode panen manual sabit dan gebot di Belitang adalah penurunan tingkat kehilangan hasil (losses). Berapa penurunan susut panen tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Dari susut manual 8% - 11% berhasil ditekan menjadi di bawah 2% - 3%"
      },
      {
        "key": "B",
        "text": "Dari susut 50% berhasil ditekan menjadi 45%"
      },
      {
        "key": "C",
        "text": "Sama sekali tidak ada perbedaan tingkat kehilangan hasil gabah"
      },
      {
        "key": "D",
        "text": "Combine harvester justru meningkatkan susut panen hingga mencapai 25%"
      },
      {
        "key": "E",
        "text": "Susut panen hanya berkurang apabila panen dilakukan saat malam hari"
      }
    ],
    "correct": "A",
    "explanation": "Penelitian Litbang Pertanian membuktikan panen manual (sabit, tumpuk, angkut, gebot terpal) menimbulkan losses 8-11%, sedangkan combine harvester modern mampu menekan losses hingga <2-3%."
  },
  {
    "id": 14,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Alat mesin transplanter (jarwo transplanter) menggunakan teknologi penanaman pola Jajar Legowo secara otomatis. Apa keunggulan agronomis dan mekanis dari pola tanam jajar legowo 2:1 atau 4:1?",
    "options": [
      {
        "key": "A",
        "text": "Menghilangkan populasi tanaman hingga 75% dari luasan lahan"
      },
      {
        "key": "B",
        "text": "Menciptakan efek tanaman pinggir (border effect) yang memaksimalkan penyerapan cahaya matahari dan mempermudah pemeliharaan"
      },
      {
        "key": "C",
        "text": "Mengharuskan petani menambah kebutuhan air genangan setinggi 40 cm"
      },
      {
        "key": "D",
        "text": "Mencegah traktor roda empat masuk ke petakan sawah"
      },
      {
        "key": "E",
        "text": "Mengharuskan jarak tanam seragam tanpa adanya lorong kosong"
      }
    ],
    "correct": "B",
    "explanation": "Pola jajar legowo memberikan ruang terbuka (lorong) yang memberikan efek border effect bagi rumpun pinggir sehingga fotosintesis maksimal, anakan lebih produktif, dan sirkulasi udara baik untuk menekan hama."
  },
  {
    "id": 15,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 5,
    "question": "Pompa air sentrifugal (alkon) berbahan bakar bensin sering diandalkan petani sawah tadah hujan di OKU Timur saat kemarau. Komponen mekanis apakah yang berputar di dalam rumah pompa untuk menghasilkan gaya sentrifugal penghisap air?",
    "options": [
      {
        "key": "A",
        "text": "Klep hisap karet (foot valve)"
      },
      {
        "key": "B",
        "text": "Impeller (kipas sudu putar)"
      },
      {
        "key": "C",
        "text": "Busi pemantik api"
      },
      {
        "key": "D",
        "text": "Karburator membran"
      },
      {
        "key": "E",
        "text": "Piston silinder blok"
      }
    ],
    "correct": "B",
    "explanation": "Impeller yang diputar poros motor penggerak menciptakan tekanan rendah di pusat dan gaya sentrifugal yang melempar cairan ke tepi rumah pompa (volute), menghasilkan aliran hisap dan dorong air yang deras."
  },
  {
    "id": 16,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Sprayer elektrik bertenaga baterai litium kini hampir sepenuhnya menggantikan sprayer pompa punggung manual di kalangan petani Belitang. Apa keunggulan teknologi sprayer elektrik terhadap efisiensi kerja petani?",
    "options": [
      {
        "key": "A",
        "text": "Tekanan semprotan konstan dan stabil tanpa perlu menguras tenaga pemompaan tangan, menghasilkan droplet butiran semprot yang merata"
      },
      {
        "key": "B",
        "text": "Dapat beroperasi tanpa perlu menggunakan cairan air pelarut"
      },
      {
        "key": "C",
        "text": "Membuat cairan racun pestisida dapat bertahan di udara selama berminggu-minggu"
      },
      {
        "key": "D",
        "text": "Menambah bobot tangki semprot menjadi 5 kali lebih berat"
      },
      {
        "key": "E",
        "text": "Mengubah racun kimia sintetis menjadi pupuk organik cair seketika"
      }
    ],
    "correct": "A",
    "explanation": "Pompa diafragma elektrik berdaya baterai menjaga tekanan semprotan tetap stabil (3-4 bar), menghasilkan ukuran droplet homogen sehingga persebaran larutan obat lebih efektif dan tenaga petani hemat."
  },
  {
    "id": 17,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Pada traktor roda empat (four-wheel tractor) yang digunakan untuk pembajakan sawah skala luas di Belitang, alat tambahan (implement) apa yang dipasang di bagian belakang untuk membalik tanah keras pertama kali?",
    "options": [
      {
        "key": "A",
        "text": "Bajak piringan (disc plow) atau bajak singkal (moldboard plow)"
      },
      {
        "key": "B",
        "text": "Mesin perontok padi (power thresher)"
      },
      {
        "key": "C",
        "text": "Pompa alkon hisap 2 dim"
      },
      {
        "key": "D",
        "text": "Gergaji rantai pemotong kayu"
      },
      {
        "key": "E",
        "text": "Blower pengering gabah berbahan bakar sekam"
      }
    ],
    "correct": "A",
    "explanation": "Disc plow atau moldboard plow yang disambungkan pada 3-point hitch traktor roda 4 berfungsi memotong, mengangkat, dan membalik lapisan tanah keras sedalam 20-30 cm pada pengolahan tanah primer."
  },
  {
    "id": 18,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Di pabrik penggilingan padi modern (RMU) di Belitang, teknologi pemisah kotoran dan batu berdasarkan perbedaan berat jenis gabah dengan partikel asing dinamakan mesin...",
    "options": [
      {
        "key": "A",
        "text": "Destoner separator"
      },
      {
        "key": "B",
        "text": "Rotary tiller"
      },
      {
        "key": "C",
        "text": "Husker rubber roll"
      },
      {
        "key": "D",
        "text": "Rice polisher mist"
      },
      {
        "key": "E",
        "text": "Color sorter laser"
      }
    ],
    "correct": "A",
    "explanation": "Destoner memisahkan kerikil, batu kecil, dan pasir dari butiran gabah menggunakan prinsip getaran ayakan dan aliran hembusan udara berdasarkan perbedaan massa jenis partikel."
  },
  {
    "id": 19,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Alat pengukur kadar air gabah digital (grain moisture meter) adalah teknologi wajib bagi bakul gabah dan petani di OKU Timur sebelum transaksi. Mengapa gabah kering panen (GKP) harus dikeringkan hingga kadar air 14% (GKG)?",
    "options": [
      {
        "key": "A",
        "text": "Agar butiran gabah hancur menjadi tepung saat digiling"
      },
      {
        "key": "B",
        "text": "Agar gabah aman disimpan lama tanpa ditumbuhi jamur Aspergillus dan menghasilkan rendemen beras utuh yang tinggi saat digiling"
      },
      {
        "key": "C",
        "text": "Agar bobot timbangan gabah bertambah berat secara signifikan"
      },
      {
        "key": "D",
        "text": "Agar beras yang dihasilkan berubah warna menjadi kuning keemasan"
      },
      {
        "key": "E",
        "text": "Karena pada kadar air 14% seluruh hama wereng hidup subur di karung"
      }
    ],
    "correct": "B",
    "explanation": "Kadar air 14% adalah standar baku Gabah Kering Giling (GKG): mencegah pertumbuhan jamur mikotoksin, menghentikan perkecambahan biji, dan membuat beras tidak mudah patah saat dikuliti di mesin huller."
  },
  {
    "id": 20,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Beberapa kelompok tani maju di Belitang mulai mengadopsi teknologi drone pertanian (agricultural drone). Fungsi utama drone tersebut dalam efisiensi operasional usaha tani padi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengangkut karung gabah seberat 1 ton langsung dari sawah ke rumah"
      },
      {
        "key": "B",
        "text": "Penyemprotan pupuk cair/pestisida presisi tinggi dalam waktu singkat (1 hektar hanya 10-15 menit) dan pemetaan multispektral kesehatan daun"
      },
      {
        "key": "C",
        "text": "Membajak tanah sawah pada malam hari"
      },
      {
        "key": "D",
        "text": "Memompa air dari dalam tanah sedalam 100 meter"
      },
      {
        "key": "E",
        "text": "Menggantikan seluruh peranan sinar matahari untuk proses fotosintesis"
      }
    ],
    "correct": "B",
    "explanation": "Agricultural drone mampu menyemprotkan larutan pupuk/pestisida secara ultra-low volume (ULV) dengan ketinggian dan kecepatan presisi, menghemat waktu (1 ha hanya ~10 menit), air, dan mencegah paparan racun ke petani."
  },
  {
    "id": 21,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 1,
    "question": "Pada petakan sawah yang letaknya jauh di ujung saluran tersier (petak hilir) dan sering terlambat menerima air, rekayasa pintu air sederhana yang paling efektif dilakukan petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuat sodetan pipa paralon (PVC) bertingkat dengan klep buka-tutup fleksibel di tanggul tersier untuk mengatur debit gravitasi"
      },
      {
        "key": "B",
        "text": "Menjebol seluruh tanggul saluran sekunder agar air meluap ke jalan raya"
      },
      {
        "key": "C",
        "text": "Menutup rapat petakan sawah dengan semen cor permanen"
      },
      {
        "key": "D",
        "text": "Menebang semua pohon pelindung di pinggir jalan raya"
      },
      {
        "key": "E",
        "text": "Mengganti tanaman padi dengan pohon jati berakar tunjang"
      }
    ],
    "correct": "A",
    "explanation": "Pemasangan pipa PVC intake dengan sistem stop-log atau penutup klep fleksibel memungkinkan pembagian air berbasis gravitasi yang teratur tanpa merusak struktur tanggul tanah saluran irigasi."
  },
  {
    "id": 22,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Ketika tanah sawah di Belitang terlalu becek dan berlumpur dalam (>40 cm) saat musim hujan, roda karet combine harvester atau traktor rentan terperosok (ambles). Trik rekayasa mekanis apa yang diterapkan operator alsintan di lapangan?",
    "options": [
      {
        "key": "A",
        "text": "Memasang roda sirip besi tambahan (cage wheel) atau memperlebar tapak roda rantai crawler karet (wide track) untuk memperluas bidang kontak beban"
      },
      {
        "key": "B",
        "text": "Mengurangi oli mesin hingga mesin traktor berjalan lambat"
      },
      {
        "key": "C",
        "text": "Menambah beban pemberat semen pada moncong depan traktor"
      },
      {
        "key": "D",
        "text": "Mengempeskan seluruh ban traktor hingga velg menyentuh lumpur"
      },
      {
        "key": "E",
        "text": "Menarik traktor dengan mobil sedan dari jalan aspal"
      }
    ],
    "correct": "A",
    "explanation": "Sesuai hukum fisika tekanan (P = F/A), memperlebar tapak roda (wide track crawler atau cage wheel) akan memperbesar luas permukaan (A), sehingga tekanan beban traktor ke lumpur mengecil dan mesin tidak mudah ambles."
  },
  {
    "id": 23,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Metode rekayasa pengairan berselang (Alternate Wetting and Drying / AWD) dianjurkan di kawasan irigasi Belitang. Bagaimana rancangan instalasi sederhana alat pemantau air AWD (tabung pipa pengamat) di petakan sawah?",
    "options": [
      {
        "key": "A",
        "text": "Pipa paralon berlubang diameter 4 inch ditancapkan sedalam 15-20 cm ke dalam lumpur sawah untuk mengamati kedalaman muka air di bawah permukaan tanah"
      },
      {
        "key": "B",
        "text": "Pipa besi ditanam sedalam 10 meter dan dihubungkan ke menara air desa"
      },
      {
        "key": "C",
        "text": "Menggunakan gelas ukur laboratorium yang diletakkan mengapung di atas daun padi"
      },
      {
        "key": "D",
        "text": "Memasang termometer air raksa di tengah pematang sawah"
      },
      {
        "key": "E",
        "text": "Membuat sumur bor beton selebar 2 meter di setiap sudut petakan"
      }
    ],
    "correct": "A",
    "explanation": "Teknologi AWD menggunakan pipa paralon berpohon lubang pori (pani pipe) yang ditancapkan sedalam 15-20 cm. Petani hanya mengairi kembali jika air di dalam pipa surut hingga 15 cm di bawah permukaan tanah, hemat air hingga 25%."
  },
  {
    "id": 24,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Untuk menanggulangi serangan hama tikus sawah (Rattus argentiventer) secara ramah lingkungan tanpa racun berbahaya, kelompok tani di Belitang menerapkan rekayasa Trap Barrier System (TBS). Bagian rancangan apakah yang menjadi penarik tikus ke perangkap?",
    "options": [
      {
        "key": "A",
        "text": "Petak tanaman perangkap yang ditanam 2-3 minggu lebih awal dari hamparan utama dan dikelilingi pagar plastik berpasang bubu perangkap satu arah"
      },
      {
        "key": "B",
        "text": "Lampu petromaks berkekuatan 1000 watt yang dinyalakan sepanjang malam"
      },
      {
        "key": "C",
        "text": "Penebaran bangkai tikus yang dibakar di sekeliling pematang"
      },
      {
        "key": "D",
        "text": "Pemasangan kawat beraliran listrik tegangan tinggi dari kabel PLN rumah"
      },
      {
        "key": "E",
        "text": "Parit yang diisi solar dan oli bekas setinggi 10 cm"
      }
    ],
    "correct": "A",
    "explanation": "TBS memanfaatkan sifat alami tikus yang tertarik pada tanaman padi stadium bunting/generatif lebih awal. Pagar plastik memblokir akses tikus dan mengarahkannya masuk ke perangkap bubu kawat satu arah (multi-catch trap)."
  },
  {
    "id": 25,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Setelah panen padi, petani sering dihadapkan pada limbah jerami yang menumpuk di petakan sawah. Rekayasa pengolahan limbah jerami yang paling berkelanjutan dan meningkatkan bahan organik tanah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membakar seluruh jerami di tengah sawah hingga menimbulkan asap tebal dan abu hangus"
      },
      {
        "key": "B",
        "text": "Pencacahan jerami dan aplikasi dekomposer mikroba selulolitik (pengomposan in-situ) saat pengolahan tanah pertama"
      },
      {
        "key": "C",
        "text": "Membuang seluruh tumpukan jerami ke dalam saluran irigasi sekunder BK"
      },
      {
        "key": "D",
        "text": "Menimbun jerami dengan aspal cair agar tidak terurai"
      },
      {
        "key": "E",
        "text": "Menyemprotkan herbisida dosis mematikan ke tumpukan jerami"
      }
    ],
    "correct": "B",
    "explanation": "Pengomposan jerami in-situ menggunakan dekomposer mikroba mengembalikan hara Kalium (K) dan silika organik ke tanah, memperbaiki struktur agregat tanah sawah, dan menghindari polusi asap pembakaran."
  },
  {
    "id": 26,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 6,
    "question": "Untuk mengatasi kendala pengeringan gabah saat cuaca mendung atau musim hujan di OKU Timur, rekayasa alat pengering gabah tepat guna (flat-bed dryer) memanfaatkan sumber energi biomassa lokal berupa...",
    "options": [
      {
        "key": "A",
        "text": "Sekam padi kering sisa penggilingan yang dibakar dalam tungku pembakar siklon hemat asap"
      },
      {
        "key": "B",
        "text": "Batu bara curah impor"
      },
      {
        "key": "C",
        "text": "Tenaga nuklir mikro portabel"
      },
      {
        "key": "D",
        "text": "Bahan bakar minyak tanah murni"
      },
      {
        "key": "E",
        "text": "Kompor gas elpiji 3 kg bersubsidi sebanyak 100 tabung sekaligus"
      }
    ],
    "correct": "A",
    "explanation": "Tungku biomassa flat-bed dryer memanfaatkan sekam padi (husk) yang melimpah dan gratis di sentra penggilingan Belitang sebagai bahan bakar pemanas udara hembus blower, sangat ekonomis dan efisien."
  },
  {
    "id": 27,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Saluran irigasi cacing (parit drainase internal di petak sawah) sengaja dibuat melintang di tengah sawah berlumpur sebelum pengeringan menjelang panen. Apa tujuan rekayasa hidrologis parit cacing ini?",
    "options": [
      {
        "key": "A",
        "text": "Mempercepat pembuangan air permukaan sehingga tanah sawah mengeras merata dan aman dilalui roda combine harvester saat panen"
      },
      {
        "key": "B",
        "text": "Menenggelamkan tanaman padi ke dalam lumpur sedalam 1 meter"
      },
      {
        "key": "C",
        "text": "Tempat membiakkan keong mas agar memakan batang padi"
      },
      {
        "key": "D",
        "text": "Menahan air setinggi mungkin agar gabah tetap basah kuyup"
      },
      {
        "key": "E",
        "text": "Menghalangi sinar matahari agar tidak mengenai permukaan tanah"
      }
    ],
    "correct": "A",
    "explanation": "Parit cacing (internal field drain) mengeringkan kelebihan air petakan 7-10 hari sebelum panen, memadatkan daya dukung tanah (bearing capacity) agar mesin combine harvester tidak ambles dan pematangan gabah serentak."
  },
  {
    "id": 28,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 8,
    "question": "Petani kreatif di Belitang sering memodifikasi stang sprayer elektrik dengan memasang 'double nozzle' atau '4 nozzle boom'. Tujuan rekayasa teknis modifikasi ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menambah lebar bentang semprotan sehingga cakupan areal per langkah kaki petani menjadi lebih luas dan waktu kerja lebih cepat"
      },
      {
        "key": "B",
        "text": "Membuat cairan semprotan keluar berwujud es beku"
      },
      {
        "key": "C",
        "text": "Menguras baterai aki sprayer dalam waktu 1 menit"
      },
      {
        "key": "D",
        "text": "Mengurangi tekanan pompa hingga air berhenti mengalir"
      },
      {
        "key": "E",
        "text": "Mengubah arah semprotan hanya mengarah ke wajah penyemprot"
      }
    ],
    "correct": "A",
    "explanation": "Boom multi-nozzle memperluas swath width semprotan (dari 1 meter menjadi 2-2.5 meter), menghemat waktu aplikasi hingga 50% dan menjaga dosis semprotan tetap merata pada hamparan kanopi padi."
  },
  {
    "id": 29,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 9,
    "question": "Pada sawah lebak peralihan di tepian Sungai Belitang yang rentan luapan banjir mendadak, rekayasa pertanaman apa yang diterapkan petani adaptif?",
    "options": [
      {
        "key": "A",
        "text": "Mengatur waktu tanam mundur mengikuti surutnya air lebak dan menggunakan varietas toleran rendaman seperti Inpara atau Inpari 30 Ciherang Sub-1"
      },
      {
        "key": "B",
        "text": "Membangun tembok beton setinggi 10 meter mengelilingi setiap petak sawah"
      },
      {
        "key": "C",
        "text": "Menanam padi di dalam karung goni yang digantung di tiang bambu"
      },
      {
        "key": "D",
        "text": "Menyedot habis seluruh air sungai Komering menggunakan selang plastik"
      },
      {
        "key": "E",
        "text": "Membiarkan sawah telantar dan beralih menambang pasir"
      }
    ],
    "correct": "A",
    "explanation": "Varietas Sub-1 (seperti Inpari 30 Ciherang Sub-1) memiliki gen SUB1A yang mampu menahan dormansi respirasi saat terendam total hingga 14 hari, dipadukan penyesuaian kalender pola tanam pasang-surut lebak."
  },
  {
    "id": 30,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 10,
    "question": "Pemasangan jaring kasa plastik biru di sekeliling persemaian bibit padi di Belitang merupakan rekayasa proteksi fisik sederhana. Fungsi utama penghalang fisik ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mencegah migrasi vektor hama wereng batang coklat dan serangan burung gereja pada bibit muda"
      },
      {
        "key": "B",
        "text": "Menghalangi masuknya oksigen ke bibit padi"
      },
      {
        "key": "C",
        "text": "Menyerap panas matahari agar tanah persemaian mendidih"
      },
      {
        "key": "D",
        "text": "Membuat bibit padi tumbuh berwarna biru"
      },
      {
        "key": "E",
        "text": "Mencegah petani lain melihat varietas padi yang ditanam"
      }
    ],
    "correct": "A",
    "explanation": "Penyekatan fisik dengan jaring waring/kasa mesh halus melindungi bibit muda dari serangan serangga vektor virus (wereng hijau/coklat), tikus, dan burung gereja saat cadangan makanan biji masih rentan."
  },
  {
    "id": 31,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 1,
    "question": "Seorang petani di BK 10 Belitang melakukan ubinan sebelum panen dengan petak ukur standar BPS seluas 2,5 m × 2,5 m (luas 6,25 m²). Dari petak ubinan tersebut diperoleh gabah bersih seberat 4,5 kg. Berapakah estimasi produktivitas panen per hektar (1 ha = 10.000 m²)?",
    "options": [
      {
        "key": "A",
        "text": "4,5 ton / ha"
      },
      {
        "key": "B",
        "text": "7,2 ton / ha"
      },
      {
        "key": "C",
        "text": "9,0 ton / ha"
      },
      {
        "key": "D",
        "text": "5,8 ton / ha"
      },
      {
        "key": "E",
        "text": "11,2 ton / ha"
      }
    ],
    "correct": "B",
    "explanation": "Rumus produktivitas ubinan: (Hasil ubinan × 10.000) / Luas ubinan = (4,5 kg × 10.000) / 6,25 m² = 45.000 / 6,25 = 7.200 kg = 7,2 ton/ha."
  },
  {
    "id": 32,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Pak Joko menggarap 1 hektar sawah dengan rincian biaya operasional: olah tanah traktor Rp 1.200.000, benih 25 kg Rp 350.000, pupuk NPK & Urea Rp 2.200.000, pestisida Rp 850.000, tenaga kerja tanam & rawat Rp 2.400.000, dan sewa combine harvester Rp 1.500.000. Berapakah total modal pengeluaran Pak Joko?",
    "options": [
      {
        "key": "A",
        "text": "Rp 6.500.000"
      },
      {
        "key": "B",
        "text": "Rp 8.500.000"
      },
      {
        "key": "C",
        "text": "Rp 10.200.000"
      },
      {
        "key": "D",
        "text": "Rp 7.800.000"
      },
      {
        "key": "E",
        "text": "Rp 12.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Total Modal = 1.200.000 + 350.000 + 2.200.000 + 850.000 + 2.400.000 + 1.500.000 = Rp 8.500.000."
  },
  {
    "id": 33,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Dari lahan 1 hektar tersebut, Pak Joko berhasil memanen 6.000 kg Gabah Kering Panen (GKP) dan menjualnya langsung ke tengkulak dengan harga Rp 6.500 per kg. Berapakah total pendapatan kotor yang diterima Pak Joko?",
    "options": [
      {
        "key": "A",
        "text": "Rp 32.500.000"
      },
      {
        "key": "B",
        "text": "Rp 39.000.000"
      },
      {
        "key": "C",
        "text": "Rp 45.000.000"
      },
      {
        "key": "D",
        "text": "Rp 28.000.000"
      },
      {
        "key": "E",
        "text": "Rp 52.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Total Pendapatan Kotor = Volume Hasil Panen × Harga Jual = 6.000 kg × Rp 6.500/kg = Rp 39.000.000."
  },
  {
    "id": 34,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Berdasarkan data soal nomor 32 dan 33 (Total Modal Rp 8.500.000 dan Pendapatan Kotor Rp 39.000.000), berapakah laba bersih (keuntungan) yang diperoleh Pak Joko dalam satu musim tanam?",
    "options": [
      {
        "key": "A",
        "text": "Rp 30.500.000"
      },
      {
        "key": "B",
        "text": "Rp 25.000.000"
      },
      {
        "key": "C",
        "text": "Rp 39.000.000"
      },
      {
        "key": "D",
        "text": "Rp 18.500.000"
      },
      {
        "key": "E",
        "text": "Rp 32.000.000"
      }
    ],
    "correct": "A",
    "explanation": "Laba Bersih = Pendapatan Kotor - Total Modal = Rp 39.000.000 - Rp 8.500.000 = Rp 30.500.000."
  },
  {
    "id": 35,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Harga Pokok Produksi (HPP) per kg gabah menggambarkan modal riil yang dikeluarkan petani untuk memproduksi 1 kg gabah. Jika total biaya modal Rp 8.500.000 dan hasil panen 6.000 kg, berapakah HPP per kg gabah Pak Joko?",
    "options": [
      {
        "key": "A",
        "text": "Rp 1.417 per kg"
      },
      {
        "key": "B",
        "text": "Rp 3.500 per kg"
      },
      {
        "key": "C",
        "text": "Rp 5.200 per kg"
      },
      {
        "key": "D",
        "text": "Rp 850 per kg"
      },
      {
        "key": "E",
        "text": "Rp 2.100 per kg"
      }
    ],
    "correct": "A",
    "explanation": "HPP per kg = Total Biaya Produksi / Total Volume Panen = Rp 8.500.000 / 6.000 kg = Rp 1.416,67 (dibulatkan Rp 1.417/kg). Karena harga jual Rp 6.500/kg, petani menikmati margin keuntungan yang sangat sehat."
  },
  {
    "id": 36,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Kebutuhan pupuk Urea (46% N) rekomendasi dinas pertanian untuk sawah irigasi Belitang adalah 200 kg/ha. Jika harga pupuk Urea bersubsidi Rp 2.250 per kg dan pupuk nonsubsidi Rp 7.500 per kg, berapa selisih penghematan biaya pupuk yang dinikmati petani jika mendapatkan alokasi pupuk subsidi secara penuh?",
    "options": [
      {
        "key": "A",
        "text": "Rp 450.000"
      },
      {
        "key": "B",
        "text": "Rp 1.050.000"
      },
      {
        "key": "C",
        "text": "Rp 1.500.000"
      },
      {
        "key": "D",
        "text": "Rp 800.000"
      },
      {
        "key": "E",
        "text": "Rp 2.250.000"
      }
    ],
    "correct": "B",
    "explanation": "Biaya nonsubsidi: 200 kg × Rp 7.500 = Rp 1.500.000. Biaya subsidi: 200 kg × Rp 2.250 = Rp 450.000. Selisih penghematan = Rp 1.500.000 - Rp 450.000 = Rp 1.050.000."
  },
  {
    "id": 37,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Sistem sewa combine harvester di pedesaan OKU Timur ada dua skema: (1) Sewa tunai Rp 1.300.000/ha atau (2) Sistem bagi hasil gabah (bawon) 1 karung untuk operator setiap 10 karung panen (1:10). Jika total hasil panen adalah 80 karung gabah (nilai per karung Rp 350.000), skema mana yang lebih hemat bagi petani?",
    "options": [
      {
        "key": "A",
        "text": "Skema bawon 1:10 lebih hemat Rp 1.500.000"
      },
      {
        "key": "B",
        "text": "Skema sewa tunai lebih hemat Rp 1.500.000 (biaya tunai Rp 1.300.000 vs bawon Rp 2.800.000)"
      },
      {
        "key": "C",
        "text": "Kedua skema menghasilkan biaya yang sama persis"
      },
      {
        "key": "D",
        "text": "Skema bawon lebih hemat karena tidak memerlukan uang tunai di awal panen"
      },
      {
        "key": "E",
        "text": "Skema tunai lebih boros Rp 500.000"
      }
    ],
    "correct": "B",
    "explanation": "Biaya bawon 1:10 dari 80 karung = 8 karung untuk mesin. Nilai uang bawon: 8 karung × Rp 350.000 = Rp 2.800.000. Dibanding sewa tunai Rp 1.300.000, petani berhemat Rp 1.500.000 jika memilih sewa tunai."
  },
  {
    "id": 38,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 8,
    "question": "Pada proses penggilingan padi di RMU Belitang, 5.000 kg Gabah Kering Giling (GKG) menghasilkan 3.250 kg beras putih kualitas medium. Berapakah persentase rendemen beras giling tersebut?",
    "options": [
      {
        "key": "A",
        "text": "55%"
      },
      {
        "key": "B",
        "text": "65%"
      },
      {
        "key": "C",
        "text": "75%"
      },
      {
        "key": "D",
        "text": "60%"
      },
      {
        "key": "E",
        "text": "70%"
      }
    ],
    "correct": "B",
    "explanation": "Rendemen beras = (Total Beras / Total GKG) × 100% = (3.250 / 5.000) × 100% = 65%."
  },
  {
    "id": 39,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 9,
    "question": "Rasio Penerimaan terhadap Biaya (R/C Ratio) digunakan untuk mengukur kelayakan finansial usaha tani padi. Jika Total Penerimaan Rp 39.000.000 dan Total Biaya Rp 8.500.000, berapakah nilai R/C rasionya dan apa kesimpulannya?",
    "options": [
      {
        "key": "A",
        "text": "R/C = 0,22 (Usaha tani merugi dan tidak layak dilanjutkan)"
      },
      {
        "key": "B",
        "text": "R/C = 4,59 (Usaha tani sangat menguntungkan dan sangat layak secara ekonomis karena R/C > 1)"
      },
      {
        "key": "C",
        "text": "R/C = 1,00 (Usaha tani berada pada titik impas tanpa untung rugi)"
      },
      {
        "key": "D",
        "text": "R/C = 2,50 (Usaha tani defisit modal)"
      },
      {
        "key": "E",
        "text": "R/C tidak dapat dihitung karena tidak ada data penyusutan traktor"
      }
    ],
    "correct": "B",
    "explanation": "R/C Ratio = Total Revenue / Total Cost = 39.000.000 / 8.500.000 = 4,59. Karena nilai R/C jauh di atas 1, usaha tani padi ini menghasilkan Rp 4,59 penerimaan untuk setiap Rp 1,00 modal yang diinvestasikan."
  },
  {
    "id": 40,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 10,
    "question": "Seorang petani membeli benih bersertifikat label biru isi 5 kg sebanyak 5 kantong dengan harga Rp 75.000 per kantong. Luas sawah 1 hektar membutuhkan 25 kg benih. Jika daya kecambah benih pada label tertera 90%, berapa butir benih yang diperkirakan berkecambah normal dari setiap 100 butir benih yang disemai?",
    "options": [
      {
        "key": "A",
        "text": "50 butir"
      },
      {
        "key": "B",
        "text": "75 butir"
      },
      {
        "key": "C",
        "text": "90 butir"
      },
      {
        "key": "D",
        "text": "100 butir"
      },
      {
        "key": "E",
        "text": "10 butir"
      }
    ],
    "correct": "C",
    "explanation": "Daya kecambah 90% menunjukkan secara matematis bahwa dari 100 benih yang diuji/disemai, 90 butir dijamin tumbuh normal menjadi kecambah berakar sehat."
  },
  {
    "id": 41,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Kecamatan Belitang dikenal dengan program Indeks Pertanaman (IP) Padi 300 (tanam dan panen padi 3 kali setahun). Bagaimana keterpaduan 4 pilar STEM memungkinkan penerapan IP 300 berjalan sukses tanpa mengeringkan saluran irigasi?",
    "options": [
      {
        "key": "A",
        "text": "Sains varietas genjah (100 hari) + Teknologi mekanisasi traktor & combine panen cepat + Rekayasa jadwal giliran air saluran BK + Matematika manajemen kas modal tanam"
      },
      {
        "key": "B",
        "text": "Menghilangkan penggunaan pupuk dan membiarkan rumput liar tumbuh lebat"
      },
      {
        "key": "C",
        "text": "Hanya mengandalkan doa tanpa menggunakan traktor dan benih unggul"
      },
      {
        "key": "D",
        "text": "Menggunakan pestisida kimia berdosis 10 kali lipat setiap hari"
      },
      {
        "key": "E",
        "text": "Mengganti padi dengan jagung manis pada musim ketiga"
      }
    ],
    "correct": "A",
    "explanation": "IP 300 adalah mahakarya integrasi STEM: Sains (varietas umur pendek 100-105 HST), Teknologi (mekanisasi percepatan olah tanah dan panen), Rekayasa (manajemen hidrologi gilir air BK), dan Matematika (kalkulasi cash-flow perputaran panen)."
  },
  {
    "id": 42,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Dalam mewujudkan pertanian presisi (precision agriculture) di OKU Timur, data ubinan matematika, citra sensor drone (teknologi), uji kesuburan tanah (sains), dan saluran irigasi otomatis (rekayasa) disatukan untuk mencapai tujuan...",
    "options": [
      {
        "key": "A",
        "text": "Memaksimalkan efisiensi input pupuk/air, meminimalkan biaya modal, dan melipatgandakan keuntungan bersih petani secara berkelanjutan"
      },
      {
        "key": "B",
        "text": "Menghapuskan tenaga kerja manusia sepenuhnya dari seluruh desa"
      },
      {
        "key": "C",
        "text": "Menaikkan harga beras di pasar hingga tidak terjangkau masyarakat"
      },
      {
        "key": "D",
        "text": "Membuat seluruh sawah menjadi objek wisata swafoto"
      },
      {
        "key": "E",
        "text": "Mengubah lahan persawahan menjadi kawasan perumahan"
      }
    ],
    "correct": "A",
    "explanation": "Pertanian presisi berbasis STEM memastikan setiap kilogram pupuk dan liter air diaplikasikan sesuai kebutuhan nyata tanaman di lapangan, menekan biaya produksi dan menjaga kelestarian agroekosistem."
  },
  {
    "id": 43,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 3,
    "question": "Kombinasi antara budidaya padi sawah dengan pemeliharaan ikan nila/mas di sela tanaman padi dikenal dengan sistem 'Mina Padi'. Mengapa sistem terpadu STEM ini menguntungkan secara ekologis dan finansial di Belitang?",
    "options": [
      {
        "key": "A",
        "text": "Ikan memakan hama wereng yang jatuh ke air, kotoran ikan menjadi pupuk organik, gulma berkurang, dan petani mendapat panen ganda (padi dan ikan)"
      },
      {
        "key": "B",
        "text": "Ikan memakan seluruh batang dan daun padi hingga habis tak tersisa"
      },
      {
        "key": "C",
        "text": "Air sawah menjadi kering karena diserap oleh tubuh ikan"
      },
      {
        "key": "D",
        "text": "Tanaman padi berubah menjadi tanaman air yang tidak berbunga"
      },
      {
        "key": "E",
        "text": "Petani tidak perlu lagi mengairi sawah dari saluran irigasi"
      }
    ],
    "correct": "A",
    "explanation": "Mina Padi adalah simbiotik mutualisme STEM: ikan memangsa hama/wereng dan mengaerasi air dengan pergerakannya, feses ikan menjadi pupuk organik hayati, menekan biaya pestisida dan memberi pendapatan ganda."
  },
  {
    "id": 44,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Penerapan sistem PHT (Pengendalian Hama Terpadu) berbasis STEM mengajarkan petani untuk tidak menyemprot racun kimia saat populasi predator alami masih mencukupi. Manfaat ekonomi-matematis langsung bagi petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghemat pengeluaran modal pembelian pestisida hingga jutaan rupiah dan mencegah resistensi hama"
      },
      {
        "key": "B",
        "text": "Membuat harga gabah turun drastis di tingkat penebas"
      },
      {
        "key": "C",
        "text": "Mengharuskan petani menyewa satpam sawah untuk menjaga predator"
      },
      {
        "key": "D",
        "text": "Menambah durasi kerja petani di sawah menjadi 24 jam sehari"
      },
      {
        "key": "E",
        "text": "Menghilangkan hak petani mendapatkan kuota pupuk bersubsidi"
      }
    ],
    "correct": "A",
    "explanation": "PHT rasional mengeliminasi semprotan pestisida yang sia-sia, menghemat jutaan rupiah modal tunai petani, melindungi kesehatan petani, dan mencegah ledakan resistensi hama sekunder."
  },
  {
    "id": 45,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Upaya stabilisasi harga gabah saat panen raya di OKU Timur dilakukan melalui integrasi teknologi lumbung pangan modern (Food Estate) dan resi gudang. Keuntungan sistem resi gudang bagi petani kecil adalah...",
    "options": [
      {
        "key": "A",
        "text": "Petani dapat menyimpan gabah keringnya di gudang berstandar saat harga anjlok, memperoleh surat bukti simpan (resi), dan menggunakannya sebagai jaminan pinjaman modal di bank"
      },
      {
        "key": "B",
        "text": "Gabah petani disita tanpa ganti rugi oleh dinas perdagangan"
      },
      {
        "key": "C",
        "text": "Petani dipaksa membagikan gabahnya secara gratis kepada tengkulak"
      },
      {
        "key": "D",
        "text": "Gudang menahan gabah hingga membusuk dan berjamur"
      },
      {
        "key": "E",
        "text": "Petani dilarang menanam padi kembali pada musim berikutnya"
      }
    ],
    "correct": "A",
    "explanation": "Sistem Resi Gudang (SRG) melindungi petani dari jebakan harga jatuh saat panen raya: gabah disimpan aman di fasilitas drying & storage terstandar, dan sertifikat resi dapat diagunkan ke bank untuk likuiditas tunai."
  },
  {
    "id": 46,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 6,
    "question": "Pemanfaatan sekam padi sebagai bahan baku pembuatan biochar (arang sekam berpori) yang dicampur pupuk kandang sapi merupakan sintesis rekayasa dan sains tanah. Apa fungsi biochar bagi tanah sawah Belitang?",
    "options": [
      {
        "key": "A",
        "text": "Berfungsi sebagai pembenah tanah (soil conditioner) penyimpan air dan hara dalam jangka panjang serta tempat hidup mikroba bermanfaat"
      },
      {
        "key": "B",
        "text": "Membuat tanah menjadi keras seperti batu bata bangunan"
      },
      {
        "key": "C",
        "text": "Menghilangkan seluruh kandungan hara nitrogen dalam tanah"
      },
      {
        "key": "D",
        "text": "Menaikkan suhu tanah hingga mencapai 80 derajat Celcius"
      },
      {
        "key": "E",
        "text": "Membuat air irigasi berubah warna menjadi hitam pekat beracun"
      }
    ],
    "correct": "A",
    "explanation": "Biochar sekam padi memiliki luas permukaan spesifik sangat tinggi dan pori mikro stabil yang menjadi 'rumah' bagi mikroba pengurai hara dan menahan air di zona perakaran, memulihkan kesehatan tanah sawah intensif."
  },
  {
    "id": 47,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Kemitraan antara Gabungan Kelompok Tani (Gapoktan) Belitang dengan BUMDes dalam pengelolaan alsintan bersama (UPJA / Unit Pelayanan Jasa Alsintan) bertujuan memecahkan masalah matematika ekonomi petani berupa...",
    "options": [
      {
        "key": "A",
        "text": "Tingginya biaya investasi pembelian alat traktor/combine yang tidak terjangkau petani perseorangan dengan menyediakan jasa sewa murah dan terkoordinasi"
      },
      {
        "key": "B",
        "text": "Kewajiban petani membayar pajak alsintan ke luar negeri"
      },
      {
        "key": "C",
        "text": "Pembagian utang traktor kepada seluruh warga desa secara merata"
      },
      {
        "key": "D",
        "text": "Pemberian sanksi denda jika petani tidak menyewa traktor Gapoktan"
      },
      {
        "key": "E",
        "text": "Pelarangan petani membeli alat semprot tangan sendiri"
      }
    ],
    "correct": "A",
    "explanation": "UPJA membagi biaya modal investasi mesin mahal (capital expenditure) melalui layanan sewa bersama yang terjangkau bagi petani gurem, memaksimalkan utilisasi alat dan mendatangkan pendapatan bagi kas kelompok."
  },
  {
    "id": 48,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Penggunaan varietas padi aromatik lokal atau beras khusus (beras merah dan beras hitam organik) yang dikembangkan di sebagian kawasan Belitang memiliki orientasi nilai tambah pasar karena...",
    "options": [
      {
        "key": "A",
        "text": "Memiliki harga jual per kg 2 hingga 3 kali lebih tinggi dibanding beras medium biasa, membuka segmen pasar kesehatan bernilai ekonomi tinggi"
      },
      {
        "key": "B",
        "text": "Tidak memerlukan air dan sinar matahari sama sekali saat ditanam"
      },
      {
        "key": "C",
        "text": "Hanya boleh dikonsumsi oleh keluarga petani itu sendiri"
      },
      {
        "key": "D",
        "text": "Dapat dipanen setiap 10 hari sekali sepanjang tahun"
      },
      {
        "key": "E",
        "text": "Menghasilkan rendemen beras sebesar 100% tanpa adanya sekam"
      }
    ],
    "correct": "A",
    "explanation": "Diversifikasi ke beras organik dan fungsional (beras merah/hitam indeks glikemik rendah) menerapkan kalkulasi margin tinggi: meski perawatan lebih teliti, harga jualnya mencapai Rp 20.000-25.000/kg dibanding beras biasa."
  },
  {
    "id": 49,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Jaringan irigasi Belitang memiliki pintu pembagi air di setiap bangunan bagi (BK 1 s.d. BK 32). Bagaimana integrasi matematika dan rekayasa hidrolika diterapkan oleh petugas PPA (Petugas Operasi & Pemeliharaan Air)?",
    "options": [
      {
        "key": "A",
        "text": "Membuka pintu air berdasarkan rumus debit Q = A × V (Luas bukaan pintu × Kecepatan aliran) disesuaikan dengan luas hektar sawah yang membutuhkan air di petak tersier"
      },
      {
        "key": "B",
        "text": "Membuka seluruh pintu air setinggi-tingginya setiap hari tanpa pengukuran"
      },
      {
        "key": "C",
        "text": "Menutup rapat semua pintu air selama musim kemarau berlangsung"
      },
      {
        "key": "D",
        "text": "Mengalirkan air hanya ke sawah milik kerabat petugas irigasi"
      },
      {
        "key": "E",
        "text": "Mengukur debit air hanya menggunakan perkiraan pandangan mata tanpa mistar ukur"
      }
    ],
    "correct": "A",
    "explanation": "Petugas irigasi membaca peilschaal (papan duga muka air) dan mengalkulasi debit Q (m3/detik) sesuai bukaan pintu dan luas baku sawah hilir, memastikan distribusi air proporsional dan adil."
  },
  {
    "id": 50,
    "day": 3,
    "sector": "pertanian",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Sebagai lumbung pangan utama Provinsi Sumatera Selatan dan penopang pangan nasional, Kabupaten OKU Timur menerapkan pendekatan STEM berkelanjutan untuk menghadapi tantangan perubahan iklim global. Langkah strategis manakah yang paling mencerminkan keterpaduan 4 pilar STEM tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Modernisasi irigasi hemat air (AWD) + Alsintan ramah emisi + Pupuk berimbang berbasis uji tanah + Sistem peringatan dini iklim digital"
      },
      {
        "key": "B",
        "text": "Mengalihkan seluruh lahan sawah irigasi teknis menjadi kawasan tambang pasir"
      },
      {
        "key": "C",
        "text": "Menghentikan seluruh penggunaan mesin dan kembali ke metode bertani seratus tahun lalu"
      },
      {
        "key": "D",
        "text": "Mengimpor seluruh beras dari luar negeri dan membiarkan sawah mengering"
      },
      {
        "key": "E",
        "text": "Membakar jerami sawah secara massal setiap akhir musim panen"
      }
    ],
    "correct": "A",
    "explanation": "Kedaulatan pangan OKU Timur berkelanjutan dibangun di atas 4 pilar STEM: Sains (iklim & varietas adaptif), Teknologi (alsintan presisi & IoT cuaca), Rekayasa (modernisasi tata kelola air irigasi Komering), dan Matematika (kalkulasi efisiensi input & margin petani)."
  },
  {
    "id": 51,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Mengapa penyadapan pohon karet (Hevea brasiliensis) di perkebunan rakyat OKU Timur dianjurkan dilakukan pada pagi hari buta antara pukul 05.00 hingga 07.30 WIB?",
    "options": [
      {
        "key": "A",
        "text": "Karena pada siang hari getah karet membeku di dalam batang dan tidak bisa mengalir"
      },
      {
        "key": "B",
        "text": "Karena tekanan turgor sel tanaman dan pembuluh lateks mencapai titik tertinggi pada pagi hari saat transpirasi daun masih rendah, menghasilkan aliran getah paling deras"
      },
      {
        "key": "C",
        "text": "Karena serangga penyerbuk karet hanya aktif sebelum matahari terbit"
      },
      {
        "key": "D",
        "text": "Karena pohon karet menyerap sinar matahari hanya pada malam hari"
      },
      {
        "key": "E",
        "text": "Agar petani terhindar dari panas terik matahari tanpa alasan fisiologis tanaman"
      }
    ],
    "correct": "B",
    "explanation": "Pada pagi hari, pohon karet memiliki tekanan turgor sel maksimal karena serapan air malam hari tinggi dan kehilangan air lewat transpirasi belum terjadi, sehingga getah mengalir lebih lancar dan volume lateks maksimal."
  },
  {
    "id": 52,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Dalam pembekuan getah karet mangkok di OKU Timur, penggunaan asam format (asam semut) sangat disarankan dibandingkan tawas atau cuka para oplosan. Mengapa asam semut lebih unggul secara sains kimia bahan?",
    "options": [
      {
        "key": "A",
        "text": "Karena asam semut menjaga elastisitas, kekuatan tarik polimer karet (koagulasi sempurna), dan tidak merusak molekul karet alam saat diolah di pabrik crumb rubber"
      },
      {
        "key": "B",
        "text": "Karena asam semut membuat bobot getah bertambah menjadi 5 kali lipat lebih berat"
      },
      {
        "key": "C",
        "text": "Karena asam semut mengubah getah karet menjadi senyawa plastik keras"
      },
      {
        "key": "D",
        "text": "Karena asam semut memiliki aroma harum bunga mawar yang disukai pabrik"
      },
      {
        "key": "E",
        "text": "Karena asam semut memutihkan getah karet seketika tanpa proses pengeringan"
      }
    ],
    "correct": "A",
    "explanation": "Asam format menurunkan pH lateks ke titik isoelektrik (pH 4.7) secara alami dan bersih, mempertahankan integritas rantai polimer poliisoprena, sedangkan tawas/asam sulfat merusak elastisitas dan menyebabkan karet rapuh/busuk."
  },
  {
    "id": 53,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 3,
    "question": "Pada tanaman kelapa sawit (Elaeis guineensis), kriteria panen matang fisiologis Tandan Buah Segar (TBS) yang siap dipanen oleh pekebun di OKU Timur ditandai dengan...",
    "options": [
      {
        "key": "A",
        "text": "Seluruh pelepah daun sawit mengering dan jatuh ke tanah"
      },
      {
        "key": "B",
        "text": "Lepasnya (membrondol) minimal 5 butir buah sawit dari tandannya ke piringan pohon secara alami"
      },
      {
        "key": "C",
        "text": "Warna kulit buah sawit masih berwarna hijau pekat mengkilap"
      },
      {
        "key": "D",
        "text": "Tandan buah berbau harum seperti minyak wangi"
      },
      {
        "key": "E",
        "text": "Batang pohon sawit mengeluarkan getah putih dari kulitnya"
      }
    ],
    "correct": "B",
    "explanation": "Standar kematangan fraksi 2 TBS adalah terlepasnya (brondol) 5-10 butir buah di piringan, menandakan kandungan asam lemak bebas (FFA) masih rendah dan rendemen minyak sawit (CPO) mencapai titik optimum."
  },
  {
    "id": 54,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Penyakit jamur akar putih (Rigidoporus microporus) pada tanaman karet di OKU Timur sering menyebar melalui kontak akar antar-pohon di dalam tanah. Gejala visual awal apa yang tampak pada tajuk kanopi pohon karet yang terserang?",
    "options": [
      {
        "key": "A",
        "text": "Daun berubah menjadi biru terang dan batang mengeluarkan busa"
      },
      {
        "key": "B",
        "text": "Daun menjadi kusam, layu menguning perlahan, cabang ranting mati pucuk (die back), dan pembuluh lateks mengering"
      },
      {
        "key": "C",
        "text": "Pohon langsung berbuah lebat sebanyak 10 kali lipat"
      },
      {
        "key": "D",
        "text": "Kulit batang mengelupas menyerupai kertas putih tanpa kerusakan akar"
      },
      {
        "key": "E",
        "text": "Akar pohon memanjang menembus permukaan tanah hingga setinggi 1 meter"
      }
    ],
    "correct": "B",
    "explanation": "Jamur akar putih merusak jaringan korteks perakaran sehingga penyerapan air dan hara terhenti, mengakibatkan kanopi daun menguning kusam, rontok, ranting mati pucuk, dan aliran getah berhenti drastis."
  },
  {
    "id": 55,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Jenis tanah di perkebunan karet dan sawit rakyat OKU Timur umumnya berjenis Podsolik Merah Kuning (Ultisol). Sifat kimia utama tanah Ultisol yang harus diperbaiki oleh pekebun dengan pengapuran (dolomit) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tingkat kemasaman tanah tinggi (pH < 4.5) disertai kejenuhan aluminium (Al) yang tinggi dan ketersediaan fosfat rendah"
      },
      {
        "key": "B",
        "text": "Kandungan garam dapur (NaCl) yang sangat pekat seperti air laut"
      },
      {
        "key": "C",
        "text": "Kandungan hara kalsium yang terlalu berlebihan hingga meracuni akar"
      },
      {
        "key": "D",
        "text": "Tanah tidak mampu menyerap pupuk kandang sama sekali"
      },
      {
        "key": "E",
        "text": "Kondisi tanah yang selalu tergenang air setinggi 1 meter sepanjang tahun"
      }
    ],
    "correct": "A",
    "explanation": "Tanah Ultisol bereaksi masam dengan fiksasi Fosfat tinggi oleh Al dan Fe. Pemberian kapur dolomit (CaMg(CO3)2) menaikkan pH tanah, mengendapkan racun aluminium bebas, serta memasok hara Kalsium dan Magnesium."
  },
  {
    "id": 56,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Ketika musim hujan lebat berlangsung terus-menerus di OKU Timur, petani karet sering terpaksa meliburkan penyadapan. Alasan sains biologi dan ekonomi di balik tindakan ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Air hujan yang mengalir di batang akan menghanyutkan lateks keluar mangkok dan memicu infeksi penyakit bidang sadap (mouldy rot / Ceratocystis fimbriata)"
      },
      {
        "key": "B",
        "text": "Pohon karet tidak dapat menghasilkan getah sama sekali saat cuaca dingin"
      },
      {
        "key": "C",
        "text": "Getah karet akan mengeras menjadi batu di dalam pembuluh kulit"
      },
      {
        "key": "D",
        "text": "Air hujan menyebabkan daun karet rontok secara permanen"
      },
      {
        "key": "E",
        "text": "Pisau sadap akan berkarat dalam hitungan detik jika terkena air hujan"
      }
    ],
    "correct": "A",
    "explanation": "Menyadap saat batang basah kuyup menyebabkan lateks meluber keluar alur terbuang bersama air hujan, serta air yang menggenangi irisan sadap membuka pintu masuk spora jamur kanker garis (mouldy rot) yang merusak kulit pulihan."
  },
  {
    "id": 57,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 7,
    "question": "Kedalaman irisan penyadapan kulit pohon karet yang benar adalah berkisar 1 hingga 1,5 mm sebelum menyentuh kambium. Apa bahaya fisiologis jika irisan sadap terlalu dalam melukai lapisan kambium?",
    "options": [
      {
        "key": "A",
        "text": "Kulit pulihan akan tumbuh bergelombang, berbenjol-benjol, dan merusak bidang sadap berikutnya sehingga pohon tidak dapat disadap kembali"
      },
      {
        "key": "B",
        "text": "Getah lateks akan berubah warna menjadi merah pekat"
      },
      {
        "key": "C",
        "text": "Pohon karet akan langsung tumbang ke tanah"
      },
      {
        "key": "D",
        "text": "Kambium yang terluka akan memicu tumbuhnya buah kelapa sawit"
      },
      {
        "key": "E",
        "text": "Pohon karet menjadi kebal terhadap semua jenis penyakit jamur"
      }
    ],
    "correct": "A",
    "explanation": "Kambium adalah jaringan meristematik pembentuk kulit baru. Jika kambium teriris luka, proses regenerasi kulit terganggu dan membentuk tonjolan kayu (burr/benjol) yang membuat bidang sadap masa depan rusak total."
  },
  {
    "id": 58,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Pada tanaman kelapa sawit, penyakit busuk pangkal batang yang paling ditakuti pekebun di Sumatera Selatan disebabkan oleh infeksi jamur patogen tular-tanah bernama...",
    "options": [
      {
        "key": "A",
        "text": "Ganoderma boninense"
      },
      {
        "key": "B",
        "text": "Escherichia coli"
      },
      {
        "key": "C",
        "text": "Saccharomyces cerevisiae"
      },
      {
        "key": "D",
        "text": "Rhizopus oryzae"
      },
      {
        "key": "E",
        "text": "Lactobacillus bulgaricus"
      }
    ],
    "correct": "A",
    "explanation": "Ganoderma boninense adalah jamur basidiomisetes penyebab busuk pangkal batang kelapa sawit yang mendegradasi lignin batang, mengakibatkan pohon roboh dan kematian tanaman sawit."
  },
  {
    "id": 59,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Pohon karet mengalami fenomena alamiah 'gugur daun semu' pada musim kemarau di OKU Timur. Apa fungsi adaptasi fisiologis pengguguran daun tersebut bagi kelangsungan hidup pohon karet?",
    "options": [
      {
        "key": "A",
        "text": "Mengurangi laju transpirasi (penguapan air) secara drastis untuk menghemat cadangan air tanah yang menipis"
      },
      {
        "key": "B",
        "text": "Mempercepat pembusukan batang bawah pohon"
      },
      {
        "key": "C",
        "text": "Menghilangkan seluruh cadangan getah lateks di dalam batang"
      },
      {
        "key": "D",
        "text": "Memancing serangga rayap memakan daun kering di tanah"
      },
      {
        "key": "E",
        "text": "Mencegah sinar matahari mengenai batang pohon"
      }
    ],
    "correct": "A",
    "explanation": "Pengguguran daun saat kemarau (wintering) merupakan strategi adaptasi morfofisiologis tanaman karet untuk meminimalkan luas permukaan transpirasi sehingga pohon terhindar dari kematian akibat kekeringan (water stress)."
  },
  {
    "id": 60,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 10,
    "question": "Unsur hara Kalium (K) dan Magnesium (Mg) sangat krusial bagi pohon kelapa sawit yang sudah menghasilkan (TM). Gejala defisiensi Magnesium pada daun sawit di lapangan tampak sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Bercak oranye kekuningan cerah pada anak daun tua yang terkena sinar matahari penuh (orange spotting)"
      },
      {
        "key": "B",
        "text": "Batang sawit membengkok membentuk huruf S"
      },
      {
        "key": "C",
        "text": "Akar sawit membusuk dan mengeluarkan bau minyak tanah"
      },
      {
        "key": "D",
        "text": "Daun muda tumbuh melingkar seperti spiral obat nyamuk"
      },
      {
        "key": "E",
        "text": "Seluruh tandan buah rontok sebelum berbunga"
      }
    ],
    "correct": "A",
    "explanation": "Defisiensi Magnesium (Mg) menyebabkan klorosis kuning-oranye terang pada daun-daun tua pelepah bawah yang terkena sinar matahari, menurunkan laju fotosintesis dan pembentukan minyak pada TBS."
  },
  {
    "id": 61,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Pisau sadap karet memiliki desain bilah melengkung khusus dengan alur pembuka kulit. Mengapa sudut kemiringan irisan sadap pada bidang sadap karet direkomendasikan sebesar 30° hingga 40° terhadap garis horizontal?",
    "options": [
      {
        "key": "A",
        "text": "Agar cairan lateks dapat mengalir lancar mengikuti alur irisan menuju talang dan mangkok tanpa meluber ke sisi lain batang"
      },
      {
        "key": "B",
        "text": "Agar pisau sadap tidak cepat aus terkena getah"
      },
      {
        "key": "C",
        "text": "Agar getah lateks menguap ke udara sebelum sampai mangkok"
      },
      {
        "key": "D",
        "text": "Agar kulit pohon karet terkelupas habis dalam satu kali sadap"
      },
      {
        "key": "E",
        "text": "Hanya sebagai gaya pemotongan tanpa pengaruh aliran cairan"
      }
    ],
    "correct": "A",
    "explanation": "Kemiringan alur 30°-40° ke arah talang memanfaatkan gaya gravitasi secara optimal agar lateks mengalir cepat ke mangkok tanpa tercecer ke kulit pohon, serta memotong jumlah pembuluh lateks maksimal yang tersusun spiral 3,7° ke kanan."
  },
  {
    "id": 62,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Untuk memanen Tandan Buah Segar (TBS) kelapa sawit pada pohon muda berumur 3-7 tahun dengan ketinggian di bawah 3 meter, alat panen mekanis yang paling tepat dan efisien digunakan pekebun adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dodos (alat pahat pemotong bertangkai pipa baja pendek bermata tajam lebar)"
      },
      {
        "key": "B",
        "text": "Egrek bergagang pipa teleskopik 12 meter"
      },
      {
        "key": "C",
        "text": "Gergaji mesin pembelah kayu (chainsaw)"
      },
      {
        "key": "D",
        "text": "Traktor roda empat bajak singkal"
      },
      {
        "key": "E",
        "text": "Cangkul tanah bergagang kayu"
      }
    ],
    "correct": "A",
    "explanation": "Dodos adalah alat dorong berbilah baja tajam dengan gagang pendek (1.5 - 2.5 m) yang sangat lincah untuk memotong tangkai TBS dan pelepah penyangga pada tanaman sawit muda (umur <7-8 tahun)."
  },
  {
    "id": 63,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Ketika pohon sawit sudah berumur tua (>10 tahun) dengan ketinggian tajuk mencapai 8 hingga 14 meter, pekebun beralih menggunakan teknologi panen berupa...",
    "options": [
      {
        "key": "A",
        "text": "Egrek (pisau sabit melengkung) yang disambung dengan pipa aluminium/fiberglass teleskopik ringan yang dapat diatur panjangnya"
      },
      {
        "key": "B",
        "text": "Memanjat pohon menggunakan tali tambang setiap kali panen"
      },
      {
        "key": "C",
        "text": "Menembak tangkai buah sawit menggunakan senapan angin"
      },
      {
        "key": "D",
        "text": "Menebang pohon sawit tersebut agar buahnya jatuh"
      },
      {
        "key": "E",
        "text": "Menunggu tandan sawit busuk dan jatuh sendiri ke tanah"
      }
    ],
    "correct": "A",
    "explanation": "Egrek bergagang galah sambung aluminium atau karbon/fiberglass ringan memungkinkan tenaga pemanen menjangkau dan mengait tangkai buah sawit tinggi dari permukaan tanah dengan cepat dan aman."
  },
  {
    "id": 64,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 4,
    "question": "Alat angkut gerobak sorong dorong roda satu (angkong) sangat vital di dalam kebun sawit dan karet OKU Timur. Komponen apa yang paling menentukan keandalan angkong saat melintasi jalan rintisan kebun yang bertanah lunak atau berakar?",
    "options": [
      {
        "key": "A",
        "text": "Ban angin/karet bervolume lebar dengan bantalan bearing roda yang kokoh untuk meredam goncangan dan menahan beban berat"
      },
      {
        "key": "B",
        "text": "Cat bodi angkong yang berwarna mengkilap"
      },
      {
        "key": "C",
        "text": "Klakson listrik bertenaga baterai"
      },
      {
        "key": "D",
        "text": "Spion belakang pada pegangan tangan"
      },
      {
        "key": "E",
        "text": "Layar GPS digital pada bak angkut"
      }
    ],
    "correct": "A",
    "explanation": "Ban karet pneumatik bertapak lebar dan as roda ber-bearing presisi mendistribusikan beban 100-150 kg TBS/getah di jalan rintisan bertanah liat tanpa membuat roda selip atau amblas."
  },
  {
    "id": 65,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Untuk menimbang hasil sadap karet atau TBS sawit di tempat penimbangan hasil (TPH) kebun, pekebun OKU Timur mengandalkan timbangan gantung dacin atau timbangan digital gantung crane scale. Mengapa timbangan digital gantung semakin diminati?",
    "options": [
      {
        "key": "A",
        "text": "Hasil timbang angka presisi langsung tampil di layar LCD, meminimalkan potensi kecurangan atau salah baca bandul timbangan manual"
      },
      {
        "key": "B",
        "text": "Dapat menambah bobot getah secara otomatis tanpa diketahui pembeli"
      },
      {
        "key": "C",
        "text": "Dapat menimbang benda gaib di dalam kebun"
      },
      {
        "key": "D",
        "text": "Tidak membutuhkan gaya gravitasi bumi saat bekerja"
      },
      {
        "key": "E",
        "text": "Membuat getah karet langsung kering seketika saat ditimbang"
      }
    ],
    "correct": "A",
    "explanation": "Timbangan digital gantung dengan sensor load cell presisi tinggi memberikan kepastian data angka riil (transparansi), mencegah perdebatan antara pekebun dan pedagang pengumpul terkait posisi bandul dacin."
  },
  {
    "id": 66,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Pada mangkok sadap karet, penggunaan mangkok berbahan plastik tebal polipropilena (PP) atau aluminium kini menggantikan mangkok batok kelapa tradisional di OKU Timur. Apa keunggulan teknologi mangkok sadap plastik PP?",
    "options": [
      {
        "key": "A",
        "text": "Permukaan dalam licin dan tidak berpori sehingga gumpalan karet beku (lump) sangat mudah dilepaskan dan mangkok mudah dibersihkan"
      },
      {
        "key": "B",
        "text": "Dapat mengeluarkan bau wangi yang menarik serangga"
      },
      {
        "key": "C",
        "text": "Dapat meleleh saat terkena getah karet panas"
      },
      {
        "key": "D",
        "text": "Mangkok plastik dapat menyerap air hujan secara otomatis"
      },
      {
        "key": "E",
        "text": "Mengubah getah karet menjadi bahan baku ban mobil seketika"
      }
    ],
    "correct": "A",
    "explanation": "Mangkok plastik PP berpermukaan halus antilengket dan higienis, mencegah getah meresap ke pori-pori (seperti pada batok kelapa berjamur), menghasilkan bekuan mangkok (lump) yang bersih dan kadar kotoran rendah."
  },
  {
    "id": 67,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Pekebun sawit modern di OKU Timur memanfaatkan gancu (kait tarik) besi baja bertangkai pendek. Fungsi mekanis alat gancu dalam proses panen sawit adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menancapkan ujung kait runcing ke tandan buah berduri untuk mengangkat dan melempar TBS ke dalam angkong tanpa melukai telapak tangan pemanen"
      },
      {
        "key": "B",
        "text": "Menebang pelepah sawit kering di atas pohon"
      },
      {
        "key": "C",
        "text": "Menggali lubang tanam bibit kelapa sawit"
      },
      {
        "key": "D",
        "text": "Mengukur kadar minyak sawit di laboratorium pabrik"
      },
      {
        "key": "E",
        "text": "Menyemprotkan herbisida gulma piringan"
      }
    ],
    "correct": "A",
    "explanation": "Gancu panen sawit (loading hook) berfungsi sebagai pengungkit ergonomis untuk mengangkat dan memindahkan TBS berduri tajam seberat 15-30 kg dengan aman, cepat, dan mencegah cedera tangan pemanen."
  },
  {
    "id": 68,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 8,
    "question": "Dalam pengendalian gulma gulma berdaun lebar dan alang-alang di piringan sawit, pekebun menggunakan nozzle semprot khusus tipe 'deflector' atau 'polijet'. Keunggulan teknologi nozzle deflector ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghasilkan semprotan berbentuk kipas lebar bertekanan rendah dengan butiran droplet besar (kasar) sehingga herbisida tidak melayang terbawa angin ke daun sawit (anti-drift)"
      },
      {
        "key": "B",
        "text": "Menghasilkan semprotan berputar menyerupai angin tornado"
      },
      {
        "key": "C",
        "text": "Mengubah cairan herbisida menjadi uap panas mendidih"
      },
      {
        "key": "D",
        "text": "Membuat gulma alang-alang tumbuh lebih lebat"
      },
      {
        "key": "E",
        "text": "Menyemprotkan cairan hanya dalam jarak 1 centimeter"
      }
    ],
    "correct": "A",
    "explanation": "Nozzle deflector/VLV menghasilkan droplet besar pada tekanan rendah (1 bar), mencegah melayangnya butiran kabut racun ke pelepah bawah sawit muda (drift), sehingga aman bagi tanaman pokok."
  },
  {
    "id": 69,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 9,
    "question": "Aplikasi ponsel pintar (smartphone) pemantau harga lelang komoditas karet harian yang dikembangkan kelompok UPPB di OKU Timur merupakan adopsi teknologi digital. Manfaat utama teknologi informasi ini bagi pekebun rakyat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memberikan transparansi harga pasar lelang resmi pabrik sehingga pekebun tidak mudah dipermainkan harga oleh tengkulak nakal"
      },
      {
        "key": "B",
        "text": "Menyadap getah karet dari jarak jauh secara otomatis"
      },
      {
        "key": "C",
        "text": "Mengisi baterai ponsel menggunakan getah karet"
      },
      {
        "key": "D",
        "text": "Menghilangkan kewajiban petani merawat kebunnya"
      },
      {
        "key": "E",
        "text": "Mengubah mata uang rupiah menjadi mata uang asing"
      }
    ],
    "correct": "A",
    "explanation": "Transparansi harga lelang karet bokar harian melalui WhatsApp/aplikasi digital memperkuat posisi tawar (bargaining position) pekebun, memastikan mereka menjual dengan harga wajar sesuai kadar karet kering (KKK)."
  },
  {
    "id": 70,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 10,
    "question": "Pada pabrik pengolahan kelapa sawit (PKS) tempat petani OKU Timur menjual TBS, teknologi pemisahan minyak sawit kasar (CPO) dari serabut dan cangkang menggunakan mesin pemeras bertekanan ulir raksasa yang disebut...",
    "options": [
      {
        "key": "A",
        "text": "Screw press machine"
      },
      {
        "key": "B",
        "text": "Thresher combine"
      },
      {
        "key": "C",
        "text": "Huller roll"
      },
      {
        "key": "D",
        "text": "Rotary dryer"
      },
      {
        "key": "E",
        "text": "Stone crusher"
      }
    ],
    "correct": "A",
    "explanation": "Screw press bekerja dengan poros ulir ganda yang menekan massa brondolan sawit yang telah dilumatkan (digester), memeras keluar cairan minyak CPO dan memisahkan serat sabut serta biji/inti sawit (kernel)."
  },
  {
    "id": 71,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Untuk mengatasi kendala getah karet hanyut dan rusak saat hujan pagi hari, pekebun inovatif di OKU Timur memasang rekayasa pelindung bidang sadap (rain gutter). Bahan sederhana apa yang digunakan untuk membuat talang pelindung ini?",
    "options": [
      {
        "key": "A",
        "text": "Plastik lembaran fleksibel atau ban dalam bekas yang ditempelkan di atas alur sadap melingkari batang dengan lem aspal/perekat khusus sebagai penepis air hujan"
      },
      {
        "key": "B",
        "text": "Membungkus seluruh pohon dengan kain terpal tebal"
      },
      {
        "key": "C",
        "text": "Menebang pohon karet hingga tersisa tingginya 1 meter"
      },
      {
        "key": "D",
        "text": "Memasang payung besi permanen di atas setiap puncak tajuk pohon karet"
      },
      {
        "key": "E",
        "text": "Mengalirkan listrik kawat panas ke permukaan batang pohon"
      }
    ],
    "correct": "A",
    "explanation": "Rain gutter (talang tudung hujan) dari plastik sintetis/karet yang dilekatkan di atas bidang irisan sadap berfungsi membelokkan aliran air batang (stemflow) ke sisi lain pohon, menjaga mangkok sadap tetap kering saat hujan rintik."
  },
  {
    "id": 72,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Di kebun karet dan sawit yang memiliki kemiringan lahan (lereng bergelombang), pekebun membuat parit rorak (silt pit) di antara barisan pohon. Apa fungsi teknik rekayasa konservasi tanah dan air rorak tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Menjebak aliran air permukaan (runoff), menampung sedimen hara tanah yang tererosi, dan meresapkan air hujan ke dalam profil perakaran tanaman"
      },
      {
        "key": "B",
        "text": "Tempat membuang limbah plastik dan sampah beracun kebun"
      },
      {
        "key": "C",
        "text": "Membuat tanah lereng longsor dan terbawa banjir"
      },
      {
        "key": "D",
        "text": "Mencegah sinar matahari masuk ke dalam permukaan kebun"
      },
      {
        "key": "E",
        "text": "Sebagai saluran pembuang agar kebun menjadi kering kerontang"
      }
    ],
    "correct": "A",
    "explanation": "Rorak (parit buntu berukuran 2 m × 0.4 m × 0.5 m) memotong panjang lereng, memperlambat kecepatan limpasan air hujan, mengendapkan pupuk dan tanah subur yang hanyut, serta menjadi kantong resapan air tanah saat kemarau."
  },
  {
    "id": 73,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Pada kebun sawit rakyat di lahan gambut dangkal atau rawa pasang surut OKU Timur, rekayasa drainase tata air mikro dilakukan dengan membuat parit primer, sekunder, dan tersier yang dilengkapi pintu air (water gate). Tujuan pemasangan pintu air tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjaga tinggi muka air tanah konstan pada kedalaman 50-70 cm di bawah permukaan tanah agar akar sawit tidak tergenang membusuk dan tanah tidak kering terbakar"
      },
      {
        "key": "B",
        "text": "Mengeringkan seluruh air hingga tanah gambut retak dan ambles"
      },
      {
        "key": "C",
        "text": "Menenggelamkan tanaman sawit hingga setinggi pucuk daun"
      },
      {
        "key": "D",
        "text": "Membiarkan air laut masuk mencemari sumur warga"
      },
      {
        "key": "E",
        "text": "Mencegah buah sawit dipanen oleh pemiliknya"
      }
    ],
    "correct": "A",
    "explanation": "Pengaturan pintu air (water control) menjaga batas ambang muka air tanah 50-70 cm: mencegah subsidensi gambut dan bahaya kebakaran saat kemarau, sekaligus mencegah anoksia (kebusukan akar) saat musim penghujan."
  },
  {
    "id": 74,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Kendala umum pengangkutan panen TBS sawit dari dalam blok kebun ke TPH adalah jalan rintisan yang becek dan licin saat hujan. Rekayasa jalan panen ramah lingkungan berbiaya murah yang diterapkan pekebun adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pemasangan titi panen dari batang kayu bulat lokal atau susunan pelepah sawit kering di sepanjang alur lintasan angkong sorong"
      },
      {
        "key": "B",
        "text": "Mengecor seluruh jalan kebun dengan aspal hotmix tebal"
      },
      {
        "key": "C",
        "text": "Menggali jurang sedalam 5 meter di sepanjang jalan kebun"
      },
      {
        "key": "D",
        "text": "Menghamparkan garam dapur di atas tanah becek"
      },
      {
        "key": "E",
        "text": "Membakar ban bekas di sepanjang jalan rintisan"
      }
    ],
    "correct": "A",
    "explanation": "Titi panen kayu dan penataan tumpukan pelepah sawit kering (pruning pile) di alur pikul/lintasan berfungsi sebagai bantalan roda angkong, mendistribusikan beban angkut dan mencegah roda terbenam ke dalam tanah becek."
  },
  {
    "id": 75,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Untuk menghasilkan bekuan getah karet mangkok (lump) yang bersih dan bernilai jual tinggi, rekayasa bak pembeku berpetak sekat aluminium diterapkan oleh kelompok tani UPPB di Belitang. Apa keunggulan teknis bak bersekat ini?",
    "options": [
      {
        "key": "A",
        "text": "Lateks membeku dengan ketebalan dan ukuran seragam, bebas dari serpihan kayu dan kotoran tanah, serta mudah diangin-anginkan"
      },
      {
        "key": "B",
        "text": "Dapat membekukan getah karet tanpa menggunakan asam koagulan sama sekali"
      },
      {
        "key": "C",
        "text": "Membuat getah karet berubah menjadi logam perak"
      },
      {
        "key": "D",
        "text": "Mencegah getah karet dijual ke pabrik pengolahan"
      },
      {
        "key": "E",
        "text": "Mengurangi kadar karet kering menjadi di bawah 10%"
      }
    ],
    "correct": "A",
    "explanation": "Bak koagulasi bersekat membagi lateks cair menjadi lempengan beku berukuran standar dan ketebalan merata (uniform), mempermudah pengeluaran serum air dan menghasilkan bokar bersih berstandar SNI."
  },
  {
    "id": 76,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 6,
    "question": "Pekebun sawit di OKU Timur melakukan penyusunan pelepah sisa pangkasan (pruning) secara teratur pada gawangan mati membentuk tumpukan memanjang (letter U atau L). Manfaat rekayasa penataan biomassa pelepah ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Biomassa pelepah terurai lambat menjadi pupuk organik kompos alami, menahan kelembaban tanah, dan jalur gawangan hidup tetap bersih untuk jalan panen"
      },
      {
        "key": "B",
        "text": "Mengundang hama tikus dan babi hutan bersarang di dalam kebun"
      },
      {
        "key": "C",
        "text": "Mencegah petani lain memasuki kebun sawit"
      },
      {
        "key": "D",
        "text": "Membuat tanah kebun menjadi tandus dan gersang"
      },
      {
        "key": "E",
        "text": "Mempercepat tumbuhnya tanaman ilalang di antara pohon sawit"
      }
    ],
    "correct": "A",
    "explanation": "Susunan pelepah di gawangan mati (pruning heap) menyumbang hara Kalium organik saat lapuk, mengendalikan erosi tanah, dan menjaga gawangan hidup (jalur panen) tetap leluasa untuk pengangkutan TBS."
  },
  {
    "id": 77,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Dalam peremajaan pohon karet tua (replanting), rekayasa lubang tanam standar perkebunan berukuran 60 cm × 60 cm × 60 cm sengaja dipersiapkan sebulan sebelum tanam bibit okulasi. Mengapa tanah galian lapisan atas (top soil) dipisahkan dari lapisan bawah (sub soil)?",
    "options": [
      {
        "key": "A",
        "text": "Tanah top soil yang kaya bahan organik akan dicampur pupuk dasar kandang dan dimasukkan kembali terlebih dahulu ke dasar lubang untuk zona perakaran bibit muda"
      },
      {
        "key": "B",
        "text": "Tanah top soil akan dibuang keluar kebun karena mengandung racun"
      },
      {
        "key": "C",
        "text": "Agar lubang tanam terisi air hujan hingga meluap"
      },
      {
        "key": "D",
        "text": "Tanah sub soil akan digunakan untuk membuat batu bata bangunan"
      },
      {
        "key": "E",
        "text": "Pemisahan tanah hanya tradisi tanpa tujuan agronomis"
      }
    ],
    "correct": "A",
    "explanation": "Pemisahan top soil (tanah hitam subur) bertujuan menempatkannya kembali di zona jelajah akar bibit setelah dicampur pupuk dasar fosfat/kandang, merangsang perakaran tunggang dan lateral menembus tanah tanpa hambatan."
  },
  {
    "id": 78,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Modifikasi sudut kemiringan mata dodos panen sawit oleh pandai besi lokal di Belitang disesuaikan dengan kelengkungan tangkai tandan TBS. Efek mekanis rancangan bilah melengkung sedikit cekung ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Gaya dorong pemanen terpusat tepat pada tangkai buah dengan sekali hentak tanpa melukai pangkal pelepah mahkota pohon yang masih produktif"
      },
      {
        "key": "B",
        "text": "Membuat dodos patah saat membentur pelepah sawit"
      },
      {
        "key": "C",
        "text": "Menambah beban berat dodos menjadi 20 kilogram"
      },
      {
        "key": "D",
        "text": "Mencegah tandan buah sawit terpotong dari pohon"
      },
      {
        "key": "E",
        "text": "Membuat bilah dodos memantul dan melukai kaki pemanen"
      }
    ],
    "correct": "A",
    "explanation": "Bilah dodos berprofil semi-cekung (hollow curve) mengunci tangkai tandan saat didorong, memotong serat tangkai dengan efisiensi gaya geser maksimal dan mencegah rusaknya pelepah penyangga buah muda berikutnya."
  },
  {
    "id": 79,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Untuk merangsang pemulihan kulit pohon karet yang telah disadap, pekebun mengoleskan formula pasta pelindung luka bidang sadap berbahan ter atau fungisida sistemik. Rekayasa perawatan ini bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mencegah infeksi spora jamur pada sel meristem kambium dan mempercepat pembentukan kulit pulihan yang mulus rata"
      },
      {
        "key": "B",
        "text": "Membuat getah karet berhenti mengalir selamanya"
      },
      {
        "key": "C",
        "text": "Mengubah batang karet menjadi pohon berkayu jati"
      },
      {
        "key": "D",
        "text": "Mencegah getah karet diambil oleh petani tetangga"
      },
      {
        "key": "E",
        "text": "Menghilangkan kulit pohon karet agar kayunya gundul"
      }
    ],
    "correct": "A",
    "explanation": "Aplikasi fungisida pasta penutup luka bidang sadap (wound dressing) bertindak sebagai plester antiseptik pelindung kambium dari jamur Ceratocystis, memicu regenerasi kambium menghasilkan kulit pulihan berkualitas prima."
  },
  {
    "id": 80,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Pada perkebunan kelapa sawit rakyat di OKU Timur, penanaman tanaman kacangan penutup tanah (Legume Cover Crop / LCC seperti Mucuna bracteata) di antara gawangan pohon sawit muda merupakan rekayasa biologi tanah. Apa manfaat integratif LCC tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Menambat nitrogen bebas dari udara melalui bintil akar Rhizobium, menekan pertumbuhan gulma alang-alang, mencegah erosi tanah, dan menjaga kelembaban lahan"
      },
      {
        "key": "B",
        "text": "Menghisap seluruh cadangan air kebun hingga tanah retak"
      },
      {
        "key": "C",
        "text": "Membuat pohon sawit terlilit hingga mati kekeringan"
      },
      {
        "key": "D",
        "text": "Mengundang hama babi hutan berkembang biak massal"
      },
      {
        "key": "E",
        "text": "Menghalangi pekebun masuk ke dalam kebunnya sendiri"
      }
    ],
    "correct": "A",
    "explanation": "Mucuna bracteata menutupi tanah secara rapat (biomulsa hidup), menyumbang ratusan kg Nitrogen organik per hektar lewat fiksasi simbiotik bintil akar, menghemat biaya pupuk urea dan biaya pembersihan herbisida."
  },
  {
    "id": 81,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 1,
    "question": "Pak Wayan memiliki 2 hektar kebun karet produktif di OKU Timur. Dalam satu minggu penyadapan (4 kali sadap), diperoleh getah mangkok beku (lump basah) seberat 320 kg. Berapakah estimasi produksi getah lump basah Pak Wayan dalam waktu satu bulan (4 minggu)?",
    "options": [
      {
        "key": "A",
        "text": "640 kg"
      },
      {
        "key": "B",
        "text": "1.280 kg"
      },
      {
        "key": "C",
        "text": "960 kg"
      },
      {
        "key": "D",
        "text": "1.600 kg"
      },
      {
        "key": "E",
        "text": "2.400 kg"
      }
    ],
    "correct": "B",
    "explanation": "Produksi bulanan = 320 kg/minggu × 4 minggu = 1.280 kg getah lump basah."
  },
  {
    "id": 82,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Getah lump basah Pak Wayan seberat 1.280 kg memiliki Kadar Karet Kering (KKK) sebesar 50% setelah diangin-anginkan. Jika harga lelang karet resmi di UPPB adalah Rp 12.000 per kg getah beku KKK 50%, berapakah total pendapatan kotor Pak Wayan bulan tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 7.680.000"
      },
      {
        "key": "B",
        "text": "Rp 15.360.000"
      },
      {
        "key": "C",
        "text": "Rp 12.000.000"
      },
      {
        "key": "D",
        "text": "Rp 18.500.000"
      },
      {
        "key": "E",
        "text": "Rp 9.200.000"
      }
    ],
    "correct": "B",
    "explanation": "Pendapatan Kotor = Total Volume (kg) × Harga per kg = 1.280 kg × Rp 12.000 = Rp 15.360.000."
  },
  {
    "id": 83,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Untuk merawat kebun karet 2 hektar tersebut, Pak Wayan mengeluarkan biaya bulanan: asam semut pembeku Rp 240.000, pembersihan piringan herbisida Rp 350.000, pupuk NPK berimbang Rp 1.200.000, dan upah buruh sadap bagi hasil 1/3 bagian dari pendapatan kotor (Rp 15.360.000 : 3 = Rp 5.120.000). Berapakah total biaya pengeluaran modal Pak Wayan?",
    "options": [
      {
        "key": "A",
        "text": "Rp 1.790.000"
      },
      {
        "key": "B",
        "text": "Rp 6.910.000"
      },
      {
        "key": "C",
        "text": "Rp 5.120.000"
      },
      {
        "key": "D",
        "text": "Rp 8.200.000"
      },
      {
        "key": "E",
        "text": "Rp 4.500.000"
      }
    ],
    "correct": "B",
    "explanation": "Total Modal Pengeluaran = 240.000 + 350.000 + 1.200.000 + 5.120.000 = Rp 6.910.000."
  },
  {
    "id": 84,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Berdasarkan data soal nomor 82 dan 83 (Pendapatan Kotor Rp 15.360.000 dan Total Biaya Rp 6.910.000), berapakah laba bersih (keuntungan) yang diterima Pak Wayan sebagai pemilik kebun dalam bulan tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 8.450.000"
      },
      {
        "key": "B",
        "text": "Rp 10.240.000"
      },
      {
        "key": "C",
        "text": "Rp 6.910.000"
      },
      {
        "key": "D",
        "text": "Rp 7.500.000"
      },
      {
        "key": "E",
        "text": "Rp 12.000.000"
      }
    ],
    "correct": "A",
    "explanation": "Laba Bersih = Pendapatan Kotor - Total Pengeluaran = Rp 15.360.000 - Rp 6.910.000 = Rp 8.450.000."
  },
  {
    "id": 85,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Seorang pekebun kelapa sawit di OKU Timur memanen 2 hektar kebun sawitnya dengan rotasi panen setiap 2 minggu sekali (2 kali panen per bulan). Pada putaran panen pertama diperoleh 2,4 ton TBS dan putaran kedua diperoleh 2,8 ton TBS. Jika harga TBS di pabrik kelapa sawit adalah Rp 2.500 per kg (1 ton = 1.000 kg), berapakah pendapatan kotor pekebun dalam satu bulan?",
    "options": [
      {
        "key": "A",
        "text": "Rp 6.000.000"
      },
      {
        "key": "B",
        "text": "Rp 13.000.000"
      },
      {
        "key": "C",
        "text": "Rp 10.500.000"
      },
      {
        "key": "D",
        "text": "Rp 15.200.000"
      },
      {
        "key": "E",
        "text": "Rp 18.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Total TBS bulanan = 2,4 ton + 2,8 ton = 5,2 ton = 5.200 kg. Pendapatan Kotor = 5.200 kg × Rp 2.500/kg = Rp 13.000.000."
  },
  {
    "id": 86,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Dari pendapatan kotor panen sawit Rp 13.000.000 tersebut, pekebun mengeluarkan biaya: upah dodos pemanen Rp 200 per kg (Rp 1.040.000), ongkos sewa truk pikap angkut TBS ke pabrik Rp 250 per kg (Rp 1.300.000), dan alokasi tabungan pupuk NPK bulanan Rp 1.500.000. Berapakah laba bersih yang diterima pekebun sawit tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 9.160.000"
      },
      {
        "key": "B",
        "text": "Rp 8.000.000"
      },
      {
        "key": "C",
        "text": "Rp 10.460.000"
      },
      {
        "key": "D",
        "text": "Rp 7.500.000"
      },
      {
        "key": "E",
        "text": "Rp 11.200.000"
      }
    ],
    "correct": "A",
    "explanation": "Total Biaya = 1.040.000 + 1.300.000 + 1.500.000 = Rp 3.840.000. Laba Bersih = Rp 13.000.000 - Rp 3.840.000 = Rp 9.160.000."
  },
  {
    "id": 87,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Pekebun sawit menimbang 100 tandan TBS dan mencatat total berat timbangan sebesar 1.800 kg. Berapakah Berat Janjang Rata-rata (BJR) kelapa sawit tersebut dan kategori apakah tandan tersebut?",
    "options": [
      {
        "key": "A",
        "text": "BJR = 18 kg / tandan (Kategori TBS kelas prima dan matang optimal)"
      },
      {
        "key": "B",
        "text": "BJR = 1,8 kg / tandan (Kategori tandan buah pasir)"
      },
      {
        "key": "C",
        "text": "BJR = 50 kg / tandan (Kategori buah raksasa)"
      },
      {
        "key": "D",
        "text": "BJR = 8 kg / tandan (Kategori buah belum layak panen)"
      },
      {
        "key": "E",
        "text": "BJR tidak dapat ditentukan tanpa data kadar air minyak"
      }
    ],
    "correct": "A",
    "explanation": "BJR = Total Berat / Jumlah Tandan = 1.800 kg / 100 tandan = 18 kg/tandan. BJR 18 kg merupakan bobot ideal tanaman sawit umur prima (8-14 tahun) dengan rendemen minyak tinggi."
  },
  {
    "id": 88,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Jika seorang pekebun karet menjual getah beku langsung ke pedagang perantara desa dengan kadar karet kotor dihargai Rp 8.000/kg, sedangkan jika menjual lewat UPPB lelang resmi dihargai Rp 12.000/kg. Berapa selisih keuntungan yang hilang jika pekebun menjual 1.280 kg getahnya ke pedagang perantara desa?",
    "options": [
      {
        "key": "A",
        "text": "Rp 2.500.000"
      },
      {
        "key": "B",
        "text": "Rp 5.120.000"
      },
      {
        "key": "C",
        "text": "Rp 4.000.000"
      },
      {
        "key": "D",
        "text": "Rp 3.840.000"
      },
      {
        "key": "E",
        "text": "Rp 6.200.000"
      }
    ],
    "correct": "B",
    "explanation": "Selisih harga = Rp 12.000 - Rp 8.000 = Rp 4.000 per kg. Selisih keuntungan yang hilang = 1.280 kg × Rp 4.000 = Rp 5.120.000 dalam satu bulan."
  },
  {
    "id": 89,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Dosis pupuk NPK kebun sawit adalah 2,5 kg per pohon per tahun. Jika kerapatan populasi tanaman sawit adalah 136 pohon per hektar dan kebun Pak Ahmad seluas 2 hektar, berapa total kebutuhan pupuk NPK Pak Ahmad dalam satu tahun?",
    "options": [
      {
        "key": "A",
        "text": "340 kg"
      },
      {
        "key": "B",
        "text": "680 kg"
      },
      {
        "key": "C",
        "text": "500 kg"
      },
      {
        "key": "D",
        "text": "1.000 kg"
      },
      {
        "key": "E",
        "text": "272 kg"
      }
    ],
    "correct": "B",
    "explanation": "Total pohon = 2 ha × 136 pohon/ha = 272 pohon. Kebutuhan pupuk per tahun = 272 pohon × 2,5 kg/pohon = 680 kg NPK."
  },
  {
    "id": 90,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Nilai Return on Investment (ROI) kebun sawit Pak Ahmad dengan total keuntungan bersih tahunan Rp 110.000.000 dari total modal operasional tahunan sebesar Rp 46.000.000 adalah sebesar...",
    "options": [
      {
        "key": "A",
        "text": "ROI = 239% (Investasi menghasilkan keuntungan lebih dari dua kali lipat modal operasional)"
      },
      {
        "key": "B",
        "text": "ROI = 41% (Investasi merugi)"
      },
      {
        "key": "C",
        "text": "ROI = 100% (Titik impas)"
      },
      {
        "key": "D",
        "text": "ROI = 50% (Kurang menguntungkan)"
      },
      {
        "key": "E",
        "text": "ROI tidak dapat dihitung tanpa nilai beli tanah"
      }
    ],
    "correct": "A",
    "explanation": "ROI = (Laba Bersih / Total Biaya Modal) × 100% = (110.000.000 / 46.000.000) × 100% = 239,13%."
  },
  {
    "id": 91,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Program Integrasi Sapi-Sawit (SISKA) di perkebunan rakyat OKU Timur merupakan sintesis ekologis dan ekonomis berbasis STEM. Bagaimana hubungan mutualisme antara ternak sapi dan kebun kelapa sawit dalam sistem ini?",
    "options": [
      {
        "key": "A",
        "text": "Sapi memakan gulma rumput di sela pohon sawit (menghemat herbisida), kotoran sapi difermentasi menjadi pupuk organik tanah, dan pelepah sawit dicacah menjadi pakan ternak"
      },
      {
        "key": "B",
        "text": "Sapi merusak seluruh akar sawit dan memakan tandan buah sawit hingga habis"
      },
      {
        "key": "C",
        "text": "Kotoran sapi membuat pohon sawit mati terbakar gas amonia"
      },
      {
        "key": "D",
        "text": "Sapi digunakan untuk menarik dodos pemotong buah sawit dari atas pohon"
      },
      {
        "key": "E",
        "text": "Pohon sawit menghasilkan racun yang mematikan sapi seketika"
      }
    ],
    "correct": "A",
    "explanation": "SISKA menerapkan prinsip sirkular ekonomi: gulma piringan dimanfaatkan sebagai pakan grazing sapi, kotoran sapi dikembalikan sebagai pupuk organik penyubur tanah, dan pelepah/bungkil inti sawit (BIS) menjadi konsentrat pakan sapi."
  },
  {
    "id": 92,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Untuk memutus rantai tengkulak dan sistem 'ijon' yang merugikan pekebun karet di pedesaan OKU Timur, solusi kelembagaan berbasis matematika dan teknologi yang paling efektif adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mendirikan Unit Pengolahan dan Pemasaran Bokar (UPPB) yang mengumpulkan getah bersih berstandar, melakukan uji KKK laboratorium, dan menggelar lelang terbuka langsung ke pabrik ban"
      },
      {
        "key": "B",
        "text": "Melarang seluruh pabrik pengolahan karet beroperasi di Sumatera Selatan"
      },
      {
        "key": "C",
        "text": "Menebang seluruh pohon karet dan membiarkan lahan menjadi semak belukar"
      },
      {
        "key": "D",
        "text": "Mewajibkan petani meminjam uang rentenir dengan bunga 50% per bulan"
      },
      {
        "key": "E",
        "text": "Menimbun getah karet di dasar sungai Komering"
      }
    ],
    "correct": "A",
    "explanation": "UPPB mengonsolidasikan pasokan bokar bersih petani dalam volume skala industri, melakukan uji KKK objektif, dan mengadakan sistem lelang mingguan yang menciptakan harga kompetitif tertinggi langsung dari pabrik crumb rubber."
  },
  {
    "id": 93,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Pada masa Tanaman Belum Menghasilkan (TBM usia 1-3 tahun) di kebun sawit/karet baru, bagaimana pendekatan rekayasa agronomis dan matematika finansial untuk menjaga arus kas (cash flow) pekebun tetap positif?",
    "options": [
      {
        "key": "A",
        "text": "Menerapkan tumpangsari tanaman sela semusim bernilai ekonomi seperti jagung pipil, kedelai, atau semangka di sela gawangan lebar sebelum kanopi sawit menutup"
      },
      {
        "key": "B",
        "text": "Menjual seluruh tanah kebun kepada investor asing"
      },
      {
        "key": "C",
        "text": "Membiarkan kebun tanpa perawatan hingga pohon berbuah sendiri"
      },
      {
        "key": "D",
        "text": "Mengambil pinjaman bank tanpa ada rencana usaha yang jelas"
      },
      {
        "key": "E",
        "text": "Menyemprotkan zat pengatur tumbuh agar sawit berbuah dalam 2 minggu"
      }
    ],
    "correct": "A",
    "explanation": "Sistem tumpangsari intercropping pada masa TBM memanfaatkan intensitas sinar matahari di sela barisan 9 m × 9 m, mendatangkan pemasukan kas berkala dari panen jagung/palawija, sekaligus membersihkan gulma."
  },
  {
    "id": 94,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Praktek pembekuan karet mangkok menggunakan tawas (aluminium sulfat) masih sering ditemukan pada sebagian petani tradisional karena murah. Mengapa pabrik industri ban menolak atau memberikan potongan harga drastis (denda potongan timbangan) pada getah ber-tawas?",
    "options": [
      {
        "key": "A",
        "text": "Ion aluminium dan sulfat merusak elastisitas polimer, membuat karet berbau busuk menyengat, menyerap air berlebihan (bobot semu), dan merusak mesin vulkanisasi ban"
      },
      {
        "key": "B",
        "text": "Karena tawas membuat getah karet menjadi terlalu lunak dan berwujud cair selamanya"
      },
      {
        "key": "C",
        "text": "Karena tawas merupakan racun mematikan yang dilarang oleh dinas kesehatan"
      },
      {
        "key": "D",
        "text": "Karena getah ber-tawas memicu ledakan di dalam oven pabrik"
      },
      {
        "key": "E",
        "text": "Penolakan pabrik hanya alasan sepihak tanpa dasar pengujian sains polimer"
      }
    ],
    "correct": "A",
    "explanation": "Tawas menahan kadar air tinggi (bobot palsu), menimbulkan bau busuk amonia/sulfur, dan menurunkan plastisitas retensi (PRI) karet alam, sehingga mutu Standard Indonesian Rubber (SIR 20) anjlok."
  },
  {
    "id": 95,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Sertifikasi Indonesian Sustainable Palm Oil (ISPO) kini diwajibkan bagi pekebun kelapa sawit rakyat di OKU Timur. Aspek kepatuhan STEM manakah yang menjadi syarat mutlak dalam audit ISPO?",
    "options": [
      {
        "key": "A",
        "text": "Legalitas lahan bukan kawasan hutan, konservasi sempadan sungai, penolakan pembukaan lahan dengan membakar (zero burning), dan pengelolaan limbah serta keselamatan kerja"
      },
      {
        "key": "B",
        "text": "Kewajiban menanam pohon sawit di pinggir ruang kelas sekolah"
      },
      {
        "key": "C",
        "text": "Kewajiban menjual seluruh hasil panen secara barter dengan beras"
      },
      {
        "key": "D",
        "text": "Larangan menggunakan alat timbangan digital di kebun"
      },
      {
        "key": "E",
        "text": "Kewajiban menebang seluruh pohon sawit setiap 5 tahun sekali"
      }
    ],
    "correct": "A",
    "explanation": "ISPO memastikan pengelolaan sawit berkelanjutan: legalitas SHM/STDB, larangan membuka lahan dengan membakar (zero burning), proteksi sempadan sungai dari pestisida, dan penggunaan APD keselamatan kerja."
  },
  {
    "id": 96,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Pemanfaatan tandan kosong kelapa sawit (tankos / EFB) dari pabrik PKS sebagai mulsa organik di sekeliling piringan pohon sawit di OKU Timur merupakan penerapan bioteknologi tanah. Manfaat utama mulsa tankos adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memasok hara Kalium organik dalam jumlah masif, mempertahankan kelembaban tanah saat kemarau, dan menekan pertumbuhan gulma piringan"
      },
      {
        "key": "B",
        "text": "Membuat pohon sawit berhenti menghasilkan buah"
      },
      {
        "key": "C",
        "text": "Menimbulkan kebakaran lahan secara spontan di musim hujan"
      },
      {
        "key": "D",
        "text": "Mengubah tanah kebun menjadi rawa gambut dalam"
      },
      {
        "key": "E",
        "text": "Membuat buah sawit berukuran sekecil biji jagung"
      }
    ],
    "correct": "A",
    "explanation": "Tankos kaya unsur K (hingga 1.5-2.0% K2O setara pupuk MOP), berfungsi sebagai insulasi kelembaban tanah di piringan, dan melepaskan bahan organik hara lambat (slow release) bagi akar sawit."
  },
  {
    "id": 97,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Dalam program Peremajaan Sawit Rakyat (PSR) di OKU Timur, petani menggunakan bibit sawit unggul kultur jaringan bersertifikat (seperti Dami Mas, Topaz, atau Marihat). Mengapa penggunaan bibit bersertifikat sangat menentukan nasib finansial pekebun selama 25 tahun ke depan?",
    "options": [
      {
        "key": "A",
        "text": "Bibit unggul tenera bersertifikat menjamin produktivitas CPO tinggi (>25-30 ton TBS/ha/tahun) dengan tempurung tipis dan daging buah tebal, sedangkan bibit liar 'cabutan' menghasilkan buah dura berkadar minyak rendah dan sering mandul"
      },
      {
        "key": "B",
        "text": "Karena bibit bersertifikat dapat menghasilkan buah emas murni"
      },
      {
        "key": "C",
        "text": "Karena bibit bersertifikat tidak perlu diberi pupuk dan air selama hidupnya"
      },
      {
        "key": "D",
        "text": "Hanya sebagai formalitas dokumen tanpa ada perbedaan produksi buah di lapangan"
      },
      {
        "key": "E",
        "text": "Bibit bersertifikat dapat langsung dipanen pada umur 3 bulan setelah tanam"
      }
    ],
    "correct": "A",
    "explanation": "Kelapa sawit adalah investasi jangka panjang 25 tahun: bibit palsu (dura/ilegal) berpotensi menghasilkan janjang kosong atau rendemen minyak <14%, memicu kerugian ratusan juta rupiah dibanding bibit unggul tenera bersertifikat."
  },
  {
    "id": 98,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Penerapan sistem sadap bertahap d/3 (sadap tiga hari sekali) dengan stimulan gas etilen pada pohon karet klon unggul di OKU Timur merupakan inovasi manajemen penyadapan. Keunggulan kombinasi ini terhadap pohon dan ekonomi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memperpanjang umur ekonomis pohon (kulit awet), menghemat biaya upah buruh sadap, dan mempertahankan produksi getah tetap tinggi"
      },
      {
        "key": "B",
        "text": "Membuat getah karet menyemprot keluar seperti air mancur tanpa henti"
      },
      {
        "key": "C",
        "text": "Mengakibatkan pohon karet mengalami kekeringan alur sadap (KAS) secara instan"
      },
      {
        "key": "D",
        "text": "Mengharuskan penyadapan dilakukan pada tengah hari tepat pukul 12.00"
      },
      {
        "key": "E",
        "text": "Menghentikan pertumbuhan daun karet secara permanen"
      }
    ],
    "correct": "A",
    "explanation": "Sistem frekuensi rendah (d/3 atau d/4) dengan stimulan etefon menghemat pemakaian kulit pohon hingga 30%, mencegah stres metabolik KAS (Kering Alur Sadap), dan memangkas waktu kerja petani."
  },
  {
    "id": 99,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Diversifikasi hilirisasi karet di tingkat kelompok pemuda desa OKU Timur, seperti pembuatan paving block karet atau bantalan dermaga perahu, bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menciptakan nilai tambah industri olahan di desa, menyerap tenaga kerja lokal, dan mengurangi ketergantungan pada fluktuasi harga ekspor mentah dunia"
      },
      {
        "key": "B",
        "text": "Menghilangkan industri crumb rubber di perkotaan"
      },
      {
        "key": "C",
        "text": "Mewajibkan seluruh jalan desa diganti dengan karet mentah"
      },
      {
        "key": "D",
        "text": "Membuat harga beras di pasar menjadi turun drastis"
      },
      {
        "key": "E",
        "text": "Mencegah getah karet diekspor ke luar wilayah Sumatera"
      }
    ],
    "correct": "A",
    "explanation": "Hilirisasi produk karet di pedesaan mengonversi lateks mentah berharga rendah menjadi produk manufaktur bernilai tambah tinggi, mengamankan pendapatan ekonomi lokal dari guncangan pasar global."
  },
  {
    "id": 100,
    "day": 3,
    "sector": "perkebunan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Sebagai sektor perkebunan penopang ekonomi keluarga pedesaan di OKU Timur, pengelolaan kebun karet dan kelapa sawit rakyat yang tangguh terhadap tantangan ekonomi masa depan menuntut integrasi 4 pilar STEM berupa...",
    "options": [
      {
        "key": "A",
        "text": "Sains pemuliaan klon/pupuk presisi + Teknologi panen mekanis ergonomis + Rekayasa konservasi rorak/rain gutter + Matematika analisis cash-flow & lelang UPPB transparan"
      },
      {
        "key": "B",
        "text": "Penebangan seluruh kebun sawit dan karet untuk dijadikan arena balap motor"
      },
      {
        "key": "C",
        "text": "Bergantung sepenuhnya pada bantuan pinjaman utang tengkulak tanpa pencatatan keuangan"
      },
      {
        "key": "D",
        "text": "Menghentikan pemupukan dan membiarkan pohon bersaing dengan semak belukar"
      },
      {
        "key": "E",
        "text": "Membakar lahan perkebunan setiap pergantian musim panen"
      }
    ],
    "correct": "A",
    "explanation": "Ketahanan perkebunan rakyat OKU Timur bertumpu pada STEM terpadu: Sains (klon unggul dan agronomi nutrisi), Teknologi (dodos/egrek presisi), Rekayasa (konservasi rorak dan rain gutter), dan Matematika (kalkulasi KKK dan efisiensi lelang kolektif)."
  },
  {
    "id": 101,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Di sentra budidaya perikanan air tawar Belitang, kadar Oksigen Terlarut (Dissolved Oxygen / DO) di kolam patin sangat dipantau oleh pembudidaya. Berapa batas ambang DO minimum yang aman untuk pertumbuhan optimal ikan patin (Pangasianodon hypophthalmus)?",
    "options": [
      {
        "key": "A",
        "text": "DO < 0,5 mg/L (kondisi anoksia)"
      },
      {
        "key": "B",
        "text": "DO minimal 3,0 hingga 5,0 mg/L (ppm)"
      },
      {
        "key": "C",
        "text": "DO harus tepat 0 mg/L karena patin tidak bernapas menggunakan insang"
      },
      {
        "key": "D",
        "text": "DO minimal 80 mg/L hingga air berbuih putih pekat"
      },
      {
        "key": "E",
        "text": "Kadar oksigen air kolam tidak berpengaruh terhadap nafsu makan dan metabolisme ikan"
      }
    ],
    "correct": "B",
    "explanation": "Ikan patin membutuhkan konsentrasi oksigen terlarut (DO) minimal 3.0-5.0 ppm untuk menjaga laju metabolisme, pencernaan pakan, dan respirasi insang. Jika DO < 2.0 ppm, patin akan stres, mogok makan, dan menggantung di permukaan."
  },
  {
    "id": 102,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Pada subuh hari (pukul 04.00 - 05.30 WIB), ikan patin di kolam tanah sering terlihat berenang menggantung di permukaan air dan megap-megap menghirup udara. Fenomena penurunan DO air kolam secara drastis saat fajar ini terjadi karena...",
    "options": [
      {
        "key": "A",
        "text": "Pada malam hari fitoplankton, ikan, dan bakteri lumpur dasar sama-sama mengonsumsi oksigen untuk respirasi tanpa adanya fotosintesis penghasil oksigen"
      },
      {
        "key": "B",
        "text": "Air saluran irigasi membeku menjadi kristal es di malam hari"
      },
      {
        "key": "C",
        "text": "Ikan patin sengaja tidur di atas permukaan air untuk menghangatkan badan"
      },
      {
        "key": "D",
        "text": "Suhu udara dingin mengubah air kolam menjadi gas nitrogen"
      },
      {
        "key": "E",
        "text": "Kandungan garam air kolam tiba-tiba meningkat drastis saat fajar"
      }
    ],
    "correct": "A",
    "explanation": "Pada malam hari, reaksi fotosintesis berhenti karena tidak ada sinar matahari, sementara respirasi seluruh biomassa kolam (plankton, ikan, bakteri pengurai) berjalan terus menyerap oksigen, memicu DO drop di titik terendah saat subuh."
  },
  {
    "id": 103,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Penumpukan sisa pakan pelet dan feses di dasar kolam tanah memicu terbentuknya senyawa amonia toksik (NH3). Hubungan antara nilai pH air kolam dengan tingkat toksisitas amonia bebas (un-ionized ammonia / NH3) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Semakin tinggi pH air (semakin basa > 8.5), proporsi amonia bebas beracun (NH3) semakin besar dan berbahaya bagi insang ikan dibanding ion amonium (NH4+)"
      },
      {
        "key": "B",
        "text": "Semakin tinggi pH air, amonia akan berubah menjadi oksigen murni"
      },
      {
        "key": "C",
        "text": "Tingkat pH tidak memiliki hubungan apapun dengan keberadaan amonia"
      },
      {
        "key": "D",
        "text": "Amonia hanya beracun apabila pH air berada pada angka netral 7.0"
      },
      {
        "key": "E",
        "text": "Pada pH basa, seluruh amonia mengkristal menjadi garam meja"
      }
    ],
    "correct": "A",
    "explanation": "Kesetimbangan kimia: NH4+ + OH- <-> NH3 + H2O. Saat pH air meningkat (basa), ion OH- berlebih menggeser reaksi ke kanan membentuk gas amonia bebas (NH3) yang sangat toksik dan merusak lamela insang ikan."
  },
  {
    "id": 104,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 4,
    "question": "Ikan lele (Clarias gariepinus) mampu bertahan hidup pada kolam dengan kadar oksigen terlarut relatif rendah dibandingkan ikan patin atau mas. Organ adaptasi biologis apa yang memungkinkan lele menghirup oksigen langsung dari udara?",
    "options": [
      {
        "key": "A",
        "text": "Paru-paru ganda"
      },
      {
        "key": "B",
        "text": "Organ arboresen (labirin tambahan di rongga insang atas)"
      },
      {
        "key": "C",
        "text": "Kantung udara di dalam lambung"
      },
      {
        "key": "D",
        "text": "Kumis sungut peraba di moncong bibir"
      },
      {
        "key": "E",
        "text": "Sisik lendir tebal di sekujur tubuh"
      }
    ],
    "correct": "B",
    "explanation": "Ikan lele memiliki organ pernapasan tambahan berupa arborescent organ (struktur bercabang mirip karang pada lengkung insang kedua dan keempat) yang mampu menyerap oksigen langsung dari atmosfer udara bebas."
  },
  {
    "id": 105,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Warna air kolam patin yang ideal di Belitang umumnya berwarna hijau muda kecoklatan terang. Warna ini mengindikasikan dominasi mikroalga fitoplankton yang menguntungkan ekosistem kolam, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Chlorella sp. dan Scenedesmus sp. yang memproduksi oksigen terlarut dan menstabilkan suhu air"
      },
      {
        "key": "B",
        "text": "Ganggang biru beracun Microcystis yang mematikan ikan"
      },
      {
        "key": "C",
        "text": "Bakteri pembusuk bangkai Clostridium tetani"
      },
      {
        "key": "D",
        "text": "Endapan karat besi akibat pipa karatan"
      },
      {
        "key": "E",
        "text": "Pewarna buatan tekstil yang sengaja dituang petani"
      }
    ],
    "correct": "A",
    "explanation": "Dominasi alga hijau (Chlorophyceae seperti Chlorella) menjaga rantai makanan alami, mengasimilasi amonia berlebih, dan menyuplai oksigen fotosintesis siang hari tanpa menghasilkan toksin geosmin berbau tanah."
  },
  {
    "id": 106,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Bau lumpur / bau tanah (off-flavor / muddy flavor) yang terkadang muncul pada daging ikan patin kolam diakibatkan oleh penyerapan senyawa kimia organik bernama geosmin dan 2-methylisoborneol (MIB). Senyawa ini diproduksi secara alami oleh...",
    "options": [
      {
        "key": "A",
        "text": "Bakteri Actinomycetes dan Cyanobacteria (Blue-Green Algae / BGA) yang tumbuh subur di dasar kolam berlumpur pekat dengan sirkulasi buruk"
      },
      {
        "key": "B",
        "text": "Pakan pelet pabrikan berkualitas prima"
      },
      {
        "key": "C",
        "text": "Air hujan murni yang turun dari langit"
      },
      {
        "key": "D",
        "text": "Vitamin penggemuk ikan yang larut di air"
      },
      {
        "key": "E",
        "text": "Sinar ultraviolet matahari di siang hari"
      }
    ],
    "correct": "A",
    "explanation": "Geosmin diproduksi oleh mikroorganisme tanah (Actinomycetes dan BGA seperti Oscillatoria/Anabaena) yang terakumulasi di jaringan lemak ikan patin melalui insang dan sistem pencernaan jika lumpur organik dasar kolam tebal."
  },
  {
    "id": 107,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 7,
    "question": "Rentang suhu air kolam yang paling optimal untuk laju pencernaan dan metabolisme pertumbuhan ikan patin dan lele di kawasan tropis OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "10°C - 15°C (suhu dingin pegunungan salju)"
      },
      {
        "key": "B",
        "text": "27°C - 30°C (suhu hangat tropis stabil)"
      },
      {
        "key": "C",
        "text": "45°C - 50°C (suhu air panas mendidih)"
      },
      {
        "key": "D",
        "text": "0°C - 4°C (suhu lemari es)"
      },
      {
        "key": "E",
        "text": "Suhu air kolam tidak memiliki pengaruh terhadap aktivitas enzim pencernaan ikan"
      }
    ],
    "correct": "B",
    "explanation": "Pada rentang suhu 27-30°C, aktivitas enzim protease, amilase, dan lipase di dalam usus ikan bekerja pada laju tertinggi, mengoptimalkan penyerapan asam amino pakan menjadi daging tanpa memicu stres termal."
  },
  {
    "id": 108,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Sifat kanibalisme pada budidaya ikan lele sering menyebabkan tingkat kematian (mortalitas) tinggi pada fase pendederan benih. Faktor lingkungan dan biologis apa yang paling memicu terjadinya kanibalisme lele?",
    "options": [
      {
        "key": "A",
        "text": "Ukuran benih yang tidak seragam (kurang penyortiran/grading berkala) serta keterlambatan pemberian pakan pelet"
      },
      {
        "key": "B",
        "text": "Kadar oksigen kolam yang terlalu jenuh melimpah"
      },
      {
        "key": "C",
        "text": "Pemberian air irigasi yang terlalu jernih"
      },
      {
        "key": "D",
        "text": "Penggunaan kolam terpal bundar"
      },
      {
        "key": "E",
        "text": "Pencahayaan lampu malam di atas kolam"
      }
    ],
    "correct": "A",
    "explanation": "Ikan lele adalah karnivora oportunis bergigi pemotong; jika ukuran tubuh berbeda dan pakan terlambat, lele yang berukuran lebih besar akan memangsa lele yang lebih kecil (kanibalisme dipicu disparitas bobot dan kelaparan)."
  },
  {
    "id": 109,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Penyakit bercak putih (White Spot) yang sering menyerang bibit ikan patin saat pergantian musim di Belitang disebabkan oleh infeksi ektoparasit protozoa bersilia bernama...",
    "options": [
      {
        "key": "A",
        "text": "Ichthyophthirius multifiliis"
      },
      {
        "key": "B",
        "text": "Xanthomonas oryzae"
      },
      {
        "key": "C",
        "text": "Rigidoporus microporus"
      },
      {
        "key": "D",
        "text": "Aedes aegypti"
      },
      {
        "key": "E",
        "text": "Anopheles sundaicus"
      }
    ],
    "correct": "A",
    "explanation": "Ichthyophthirius multifiliis (parasit 'Ich') menembus lendir epidermis dan insang ikan, membentuk bintik kista putih (trofont) yang memicu iritasi hebat, napas terengah-engah, dan kematian massal pada benih."
  },
  {
    "id": 110,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Dalam uji kualitas air kimia sederhana, nilai pH air kolam yang tiba-tiba anjlok di bawah 6.0 saat hujan deras pertama di awal musim hujan disebabkan oleh fenomena...",
    "options": [
      {
        "key": "A",
        "text": "Limpasan air hujan yang membawa senyawa asam dari atmosfer dan oksidasi pirit (FeS2) dari tanggul tanah kolam yang terpapar udara kering"
      },
      {
        "key": "B",
        "text": "Air hujan mengandung kalsium karbonat berkonsentrasi tinggi"
      },
      {
        "key": "C",
        "text": "Ikan patin mengeluarkan racun asam dari dalam insangnya"
      },
      {
        "key": "D",
        "text": "Fitoplankton membelah diri menjadi 100 kali lipat dalam satu detik"
      },
      {
        "key": "E",
        "text": "Bakteri pengurai berhenti bernapas selamanya"
      }
    ],
    "correct": "A",
    "explanation": "Tanggul tanah yang mengandung pirit (senyawa besi sulfida) yang teroksidasi saat kemarau akan tercuci air hujan menghasilkan asam sulfat (H2SO4), menurunkan pH kolam secara mendadak (acid shock)."
  },
  {
    "id": 111,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Kincir air tambak (paddle wheel aerator) bertenaga motor listrik banyak dipasang di kolam patin intensif Belitang. Bagaimana prinsip kerja mekanis kincir air dalam meningkatkan kadar oksigen terlarut (DO)?",
    "options": [
      {
        "key": "A",
        "text": "Sudu-sudu daun kincir berputar memecah permukaan air kolam menjadi cipratan butiran halus (droplet) dan mengaduk massa air, memperluas kontak udara-air untuk transfer difusi oksigen"
      },
      {
        "key": "B",
        "text": "Kincir menghasilkan gas oksigen murni melalui reaksi fusi nuklir"
      },
      {
        "key": "C",
        "text": "Kincir mendinginkan air kolam hingga mendekati titik beku 0°C"
      },
      {
        "key": "D",
        "text": "Kincir menyedot kotoran ikan dan mengeluarkannya ke awan"
      },
      {
        "key": "E",
        "text": "Kincir berfungsi sebagai hiasan lampu air di malam hari"
      }
    ],
    "correct": "A",
    "explanation": "Paddle wheel menciptakan turbulensi dan cipratan air masif ke udara bebas, meningkatkan luas bidang kontak antarmuka udara-cairan sehingga difusi transfer molekul oksigen (O2) dari udara ke air berlangsung cepat."
  },
  {
    "id": 112,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Mesin pembuat pakan pelet mandiri (pelletizer extruder) mulai banyak dioperasikan kelompok pembudidaya ikan di Belitang. Bagian komponen mesin apakah yang bertugas memadatkan, memanaskan (cooking), dan mencetak adonan pakan menjadi butiran pelet apung?",
    "options": [
      {
        "key": "A",
        "text": "Ulir sekrup tekan (screw barrel) dan cetakan berpori (die cutter)"
      },
      {
        "key": "B",
        "text": "Klep ban dalam mobil"
      },
      {
        "key": "C",
        "text": "Tangki bensin karburator"
      },
      {
        "key": "D",
        "text": "Baling-baling kipas angin"
      },
      {
        "key": "E",
        "text": "Saringan kain kasa nyamuk"
      }
    ],
    "correct": "A",
    "explanation": "Sistem screw extruder menghasilkan tekanan mekanik dan panas gesekan tinggi yang menggelatinisasi pati pakan, lalu adonan ditekan keluar melalui die plate berlubang dan dipotong pisau putar (cutter) menjadi pelet apung."
  },
  {
    "id": 113,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 3,
    "question": "Pompa air celup (submersible pump) banyak dipilih pembudidaya kolam terpal dibandingkan pompa hisap di atas tanggul. Keunggulan mekanis pompa submersible adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bekerja langsung di dalam cairan tanpa membutuhkan pancingan air awal (self-priming), bebas resiko kavitasi, dan suara putaran motor sangat hening di bawah air"
      },
      {
        "key": "B",
        "text": "Dapat memompa air tanpa membutuhkan kabel aliran listrik"
      },
      {
        "key": "C",
        "text": "Mampu memanaskan air kolam hingga mendidih"
      },
      {
        "key": "D",
        "text": "Membuat ikan lele berenang lebih cepat"
      },
      {
        "key": "E",
        "text": "Mengubah air keruh menjadi air sirup manis"
      }
    ],
    "correct": "A",
    "explanation": "Pompa submersible terendam langsung di dasar cairan sehingga tekanan hisap selalu positif (tidak butuh pancingan/foot valve) dan air sekitar berfungsi sebagai pendingin alami motor listrik, menjadikannya sangat efisien."
  },
  {
    "id": 114,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Alat digital DO Meter (Dissolved Oxygen Meter) portabel dengan sensor probe polarografik digunakan pembudidaya ikan maju di Belitang untuk mengukur...",
    "options": [
      {
        "key": "A",
        "text": "Kadar oksigen terlarut dalam satuan mg/L (ppm) secara cepat dan akurat di berbagai kedalaman air kolam"
      },
      {
        "key": "B",
        "text": "Jumlah ekor ikan yang ada di dalam kolam tanah"
      },
      {
        "key": "C",
        "text": "Berat timbangan pakan pelet di dalam karung"
      },
      {
        "key": "D",
        "text": "Kadar gula darah ikan patin"
      },
      {
        "key": "E",
        "text": "Kandungan minyak tanah di dasar lumpur"
      }
    ],
    "correct": "A",
    "explanation": "Sensor membran DO meter mengukur arus listrik mikro hasil reduksi elektrokimia gas oksigen yang berdifusi menembus membran Teflon elektroda, menampilkan konsentrasi O2 terlarut secara digital dalam hitungan detik."
  },
  {
    "id": 115,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Pemberian pakan otomatis berbasis pengatur waktu digital (automatic fish feeder timer) mulai diterapkan pada kolam patin pembesaran. Keuntungan teknologi otomasi pakan ini terhadap efisiensi budidaya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Jadwal dan takaran pelet keluar tepat waktu secara merata dengan frekuensi teratur, menekan pakan terbuang (overfeeding) dan memperbaiki FCR"
      },
      {
        "key": "B",
        "text": "Menggandakan nafsu makan ikan hingga 100 kali lipat"
      },
      {
        "key": "C",
        "text": "Menghilangkan kebutuhan air di dalam kolam"
      },
      {
        "key": "D",
        "text": "Membuat ikan patin tumbuh tanpa perlu mengonsumsi protein"
      },
      {
        "key": "E",
        "text": "Menggantikan seluruh peranan pembersihan kolam tanah"
      }
    ],
    "correct": "A",
    "explanation": "Auto-feeder melontarkan pelet dalam porsi presisi dan frekuensi terjadwal (misal 4-6 kali/hari), mencegah lonjakan sisa pakan mengendap di dasar kolam, menjaga stabilitas kualitas air, dan meningkatkan konversi pakan (FCR)."
  },
  {
    "id": 116,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Alat grading (ayakan sortasi benih lele berbahan aluminium berlubang bulat presisi) digunakan peternak lele di Belitang secara berkala. Apa fungsi teknologi sortasi ini?",
    "options": [
      {
        "key": "A",
        "text": "Memisahkan benih lele ke dalam kelompok ukuran seragam (misal ukuran 5-7 cm, 7-9 cm) untuk mencegah kanibalisme dan memastikan pertumbuhan merata"
      },
      {
        "key": "B",
        "text": "Membersihkan kotoran lendir pada kumis lele"
      },
      {
        "key": "C",
        "text": "Menghitung berat badan ikan secara otomatis"
      },
      {
        "key": "D",
        "text": "Mewarnai kulit ikan lele menjadi kuning keemasan"
      },
      {
        "key": "E",
        "text": "Memotong duri patil ikan lele agar tidak menyengat"
      }
    ],
    "correct": "A",
    "explanation": "Bak sortir berpori (grader) menyaring lele berdasarkan diameter kepala dan tubuh secara mekanis dalam air, mengelompokkan benih dalam fraksi ukuran homogen untuk mengeliminasi pemangsaan sesama lele (kanibalisme)."
  },
  {
    "id": 117,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Pada kolam terpal bioflok, teknologi Root Blower atau Pompa Udara Diafragma (aerator hi-blow) dipadukan dengan selang berpori (uniring / diffuser hose) di dasar kolam. Apa keunggulan aerasi uniring dibanding batu aerasi bulat biasa?",
    "options": [
      {
        "key": "A",
        "text": "Menghasilkan gelembung udara mikro (micro-bubble) dalam jumlah sangat padat yang melayang lebih lama di air, memaksimalkan transfer oksigen dan mengaduk flok bakteri"
      },
      {
        "key": "B",
        "text": "Menghisap air kolam keluar hingga habis"
      },
      {
        "key": "C",
        "text": "Mengeluarkan gelembung gas elpiji pembakar"
      },
      {
        "key": "D",
        "text": "Membuat air kolam membeku menjadi es balok"
      },
      {
        "key": "E",
        "text": "Menangkap ikan lele langsung ke daratan"
      }
    ],
    "correct": "A",
    "explanation": "Diffuser selang pori uniring menghasilkan gelembung mikro (diameter <1 mm) dengan luas permukaan kontak sangat besar dan laju apung lambat, mentransfer oksigen dengan efisiensi tinggi serta menjaga bioflok tetap melayang."
  },
  {
    "id": 118,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Dalam penanganan panen ikan patin hidup untuk pasar luar kota (Palembang atau Lampung), teknologi sistem transportasi basah menggunakan tong beroksigen murni (live fish transport system). Fungsi penambahan es batu dalam dosis terkontrol saat pengangkutan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menurunkan suhu air ke 18-20°C untuk membius ikan secara metabolik (hipotermia ringan), memperlambat respirasi dan ekskresi amonia sehingga kelangsungan hidup tinggi"
      },
      {
        "key": "B",
        "text": "Membekukan ikan agar menjadi ikan asin"
      },
      {
        "key": "C",
        "text": "Mengubah air menjadi air sirup buah"
      },
      {
        "key": "D",
        "text": "Menambah bobot timbangan ikan menjadi 3 kali lipat"
      },
      {
        "key": "E",
        "text": "Membunuh seluruh bakteri saluran pencernaan manusia"
      }
    ],
    "correct": "A",
    "explanation": "Suhu dingin (18-20°C) menidurkan ikan secara fisiologis (anestesi suhu), menekan konsumsi oksigen basal hingga 50%, dan meminimalkan ekskresi feses serta amonia beracun selama perjalanan darat jarak jauh."
  },
  {
    "id": 119,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Refraktometer salinitas atau TDS Meter digital (Total Dissolved Solids) di kolam pembenihan patin berfungsi untuk mengukur...",
    "options": [
      {
        "key": "A",
        "text": "Konsentrasi total padatan zat terlarut dan mineral elektrolit di dalam air kolam pemijahan"
      },
      {
        "key": "B",
        "text": "Panjang kumis induk ikan patin jantan"
      },
      {
        "key": "C",
        "text": "Kadar minyak goreng pada pelet pakan"
      },
      {
        "key": "D",
        "text": "Kedalaman lumpur tanah kolam"
      },
      {
        "key": "E",
        "text": "Kecepatan renang ikan patin dewasa"
      }
    ],
    "correct": "A",
    "explanation": "TDS meter mengukur konduktivitas listrik larutan yang dikonversi ke satuan ppm zat padat terlarut (garam mineral, elektrolit), parameter penting untuk mengontrol osmoregulasi telur dan larva benih ikan."
  },
  {
    "id": 120,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Di industri pengolahan ikan patin Belitang, mesin skinning machine (alat pengupas kulit patin otomatis) dan mesin fillet digunakan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Memisahkan daging putih patin bebas duri dari kulit dan lemak secara higienis berstandar ekspor dalam hitungan detik per ekor"
      },
      {
        "key": "B",
        "text": "Menghidupkan kembali ikan patin yang sudah mati"
      },
      {
        "key": "C",
        "text": "Menggiling seluruh ikan beserta tulangnya menjadi tepung terigu"
      },
      {
        "key": "D",
        "text": "Menyuntikkan cairan pengawet berbahaya ke dalam daging ikan"
      },
      {
        "key": "E",
        "text": "Mencetak pelet pakan dari kulit ikan mentah"
      }
    ],
    "correct": "A",
    "explanation": "Skinning machine mengupas lapisan kulit berlendir dan lemak bawah kulit patin secara presisi, menghasilkan produk fillet daging putih (dori lokal) berkualitas tinggi untuk industri restoran dan pasar swalayan."
  },
  {
    "id": 121,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Untuk menghemat biaya listrik dan pengadaan kincir mekanik yang mahal, pembudidaya kreatif di Belitang merakit sistem aerasi venturi pipa paralon (venturi injector). Prinsip rekayasa fluida apakah yang mendasari alat ini?",
    "options": [
      {
        "key": "A",
        "text": "Penyempitan pipa (leher venturi) meningkatkan kecepatan aliran air dari pompa dan menurunkan tekanan statis, sehingga udara luar terhisap otomatis melalui lubang selang dan bercampur menjadi gelembung oksigen"
      },
      {
        "key": "B",
        "text": "Pipa paralon dipanaskan dengan kompor hingga memancarkan gas oksigen"
      },
      {
        "key": "C",
        "text": "Menggunakan magnet buatan untuk menarik partikel udara dari awan"
      },
      {
        "key": "D",
        "text": "Pipa paralon berputar menyerupai kincir angin"
      },
      {
        "key": "E",
        "text": "Menyumbat aliran air agar tekanan pompa meledak di dalam kolam"
      }
    ],
    "correct": "A",
    "explanation": "Hukum Bernoulli dan efek Venturi: ketika cairan bertekanan melewati nozzle konstriksi sempit, kecepatan fluida meningkat drastis menyebabkan penurunan tekanan (vakum parsial) yang menghisap udara atmosfer masuk ke air."
  },
  {
    "id": 122,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Pada kolam tanah tradisional patin di Belitang, pembudidaya membuat saluran 'kemalir' (parit dasar kolam yang melandai ke arah pintu pengeluaran monik). Apa fungsi rekayasa hidrologis kemalir tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Mempermudah pengeringan dasar kolam, pengendapan limbah lumpur ke titik tengah, dan mempermudah pemanenan ikan karena ikan terkonsentrasi di parit saat air disurutkan"
      },
      {
        "key": "B",
        "text": "Tempat ikan patin bertelur di atas batu karang"
      },
      {
        "key": "C",
        "text": "Mencegah air saluran irigasi masuk ke dalam kolam"
      },
      {
        "key": "D",
        "text": "Menyembunyikan ikan dari pandangan pembudidaya"
      },
      {
        "key": "E",
        "text": "Sebagai saluran pembuang agar ikan hanyut ke sungai"
      }
    ],
    "correct": "A",
    "explanation": "Kemalir adalah cekungan parit di dasar kolam dengan kemiringan 1-2% menuju kobakan panen (catch basin), memfasilitasi pengurasan lumpur endapan amonia dan memudahkan penangkapan ikan secara efisien tanpa melukai fisik ikan."
  },
  {
    "id": 123,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 3,
    "question": "Penerapan sistem Bioflok pada kolam bundar terpal lele di Belitang mengintegrasikan mikroba heterotrof dengan penambahan sumber karbon organik (molase tetes tebu / bekatul). Tujuan rekayasa bioproses ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mendorong bakteri heterotrof mengubah limbah amonia beracun menjadi gumpalan protein flok sel tunggal yang dapat dimakan kembali oleh lele sebagai pakan alami (daur ulang pakan)"
      },
      {
        "key": "B",
        "text": "Membuat air kolam berubah menjadi manis seperti sirup tebu"
      },
      {
        "key": "C",
        "text": "Membunuh seluruh bakteri menguntungkan di dalam kolam terpal"
      },
      {
        "key": "D",
        "text": "Menghilangkan kebutuhan aerasi oksigen di kolam bundar"
      },
      {
        "key": "E",
        "text": "Menghentikan pertumbuhan ikan lele agar berukuran mini"
      }
    ],
    "correct": "A",
    "explanation": "Rasio C:N dinaikkan (>10:1) dengan molase sehingga bakteri aerob mengasimilasi amonium terlarut menjadi protein sel mikroba (flok). Ini mengendalikan amonia tanpa pergantian air (zero-water exchange) dan menghemat biaya pakan pelet."
  },
  {
    "id": 124,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Untuk melindungi kolam budidaya dari serangan hama pemangsa seperti berang-berang (lutra), biawak, dan ular air di pedesaan Belitang, rekayasa pagar pengaman fisik yang paling efektif adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pemasangan pagar jaring waring nilon keliling setinggi 1 meter dengan bagian bawah ditanam ke dalam tanah dan dipasangi jaring penutup atas anti-burung"
      },
      {
        "key": "B",
        "text": "Menebarkan racun sianida ke seluruh saluran irigasi desa"
      },
      {
        "key": "C",
        "text": "Menyalakan petasan sepanjang malam tanpa henti"
      },
      {
        "key": "D",
        "text": "Membiarkan kolam tanpa air selama pemeliharaan"
      },
      {
        "key": "E",
        "text": "Menimbun pematang kolam dengan pecahan kaca tajam"
      }
    ],
    "correct": "A",
    "explanation": "Pagar waring tertanam (fencing net) memblokir lintasan merayap predator air (biawak, linsang) dan jaring atas (bird net) mencegah serangan burung bangau pemangsa benih ikan."
  },
  {
    "id": 125,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Pintu pengeluaran air sistem 'Monik' bersekat papan kayu ganda (double board gate) sering dibangun pada kolam tanah perikanan Belitang. Ruang di antara kedua papan diisi tanah liat padat. Apa keunggulan rekayasa pintu monik ini?",
    "options": [
      {
        "key": "A",
        "text": "Memungkinkan pengaturan ketinggian air kolam secara fleksibel dan pembuangan air dasar kolam yang kotor (bottom drainage) tanpa menguras lapisan air atas yang kaya oksigen"
      },
      {
        "key": "B",
        "text": "Pintu monik dapat membuka sendiri menggunakan tenaga surya tanpa operator"
      },
      {
        "key": "C",
        "text": "Mengubah air tawar menjadi air payau secara instan"
      },
      {
        "key": "D",
        "text": "Menahan seluruh air kolam agar tidak pernah surut selamanya"
      },
      {
        "key": "E",
        "text": "Mencegah pembudidaya melihat dasar kolamnya sendiri"
      }
    ],
    "correct": "A",
    "explanation": "Pintu monik dengan papan celah bawah membuang endapan lumpur hipolimnion dasar yang miskin oksigen dan kaya gas beracun, sementara lapisan air permukaan (epilimnion) yang beroksigen tetap terjaga di dalam kolam."
  },
  {
    "id": 126,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Dalam budidaya lele intensif sistem Resirkulasi (Recirculating Aquaculture System / RAS) skala pembenihan, air kolam dilewatkan melalui filter mekanis dan filter biologis. Komponen apakah yang menjadi media tumbuh bakteri nitrifikasi pada filter biologis?",
    "options": [
      {
        "key": "A",
        "text": "Bioball plastik berpori, batu apung, atau jaring nelayan bekas yang memiliki luas permukaan spesifik tinggi untuk koloni bakteri Nitrosomonas dan Nitrobacter"
      },
      {
        "key": "B",
        "text": "Kepingan kaca cermin datar"
      },
      {
        "key": "C",
        "text": "Lumpur limbah septic tank"
      },
      {
        "key": "D",
        "text": "Logam seng atap rumah"
      },
      {
        "key": "E",
        "text": "Minyak goreng bekas kemasan"
      }
    ],
    "correct": "A",
    "explanation": "Bioball atau biomedia kaldnes berstruktur kisi-kisi menyediakan area permukaan luas (specific surface area) bagi biofilm bakteri nitrifikasi pengoksidasi amonia menjadi nitrit lalu nitrat yang relatif tidak berbahaya."
  },
  {
    "id": 127,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Untuk mengatasi kekeruhan lumpur pekat akibat pasokan air irigasi yang baru dialirkan dari saluran primer, rekayasa kolam pengendapan (sedimentation pond / tandon air) dibuat sebelum air masuk ke kolam budidaya. Fungsi tandon pengendapan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengendapkan lumpur suspensi kasar, menstabilkan suhu air, dan melakukan sterilisasi air awal sebelum dialirkan ke kolam pembesaran"
      },
      {
        "key": "B",
        "text": "Menghilangkan seluruh volume air hingga kolam kering"
      },
      {
        "key": "C",
        "text": "Memanaskan air kolam menjadi uap panas"
      },
      {
        "key": "D",
        "text": "Tempat memelihara buaya muara"
      },
      {
        "key": "E",
        "text": "Mewajibkan air kolam diberi deterjen busa"
      }
    ],
    "correct": "A",
    "explanation": "Kolam tandon sedimentasi memperlambat kecepatan aliran (laminar) sehingga partikel lumpur dan suspended solids mengendap secara gravitasi, menyuplai air jernih stabil dan higienis ke kolam budidaya."
  },
  {
    "id": 128,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Pada kolam terpal bulat bioflok lele, pipa pembuangan tengah (central drain) dirancang dengan kemiringan dasar kolam kerucut 5-10° ke arah tengah. Apa tujuan rancangan hidrodinamika kerucut dasar ini?",
    "options": [
      {
        "key": "A",
        "text": "Gaya pusaran air aerasi mendorong seluruh kotoran padat dan feses ikan mengumpul otomatis tepat di lubang pembuangan tengah (self-cleaning effect)"
      },
      {
        "key": "B",
        "text": "Membuat ikan lele terperangkap dan tidak bisa berenang"
      },
      {
        "key": "C",
        "text": "Mencegah kolam terpal bocor di bagian sambungan"
      },
      {
        "key": "D",
        "text": "Mengharuskan petani menyedot kotoran dengan mulut"
      },
      {
        "key": "E",
        "text": "Mengurangi volume kapasitas air kolam hingga tersisa 10%"
      }
    ],
    "correct": "A",
    "explanation": "Dasar konikal (v-shape conical bottom) dipadukan putaran arus aerator menghasilkan gaya sentripetal (teacups effect) yang mengkonsentrasikan endapan feses ke central drain untuk diflushing harian dengan cepat."
  },
  {
    "id": 129,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Pembuatan pakan pelet mandiri sering terkendala daya apung (buoyancy) yang rendah sehingga pelet cepat tenggelam dan membusuk di dasar kolam. Trik rekayasa formulasi pakan lokal agar pelet dapat mengapung lebih lama adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menambahkan bahan perekat tinggi karbohidrat (tepung tapioka/onggok) yang dimasak matang (gelatinisasi) dan pemanasan tekanan pada proses pencetakan"
      },
      {
        "key": "B",
        "text": "Mencampurkan batu kerikil ke dalam adonan pelet"
      },
      {
        "key": "C",
        "text": "Merendam pelet di dalam air es sebelum ditebar"
      },
      {
        "key": "D",
        "text": "Mengurangi kandungan protein pelet menjadi 0%"
      },
      {
        "key": "E",
        "text": "Mencampur adonan pakan dengan minyak pelumas oli mesin"
      }
    ],
    "correct": "A",
    "explanation": "Gelatinisasi pati dari tepung tapioka membentuk matriks polimer pengikat berpori udara mikro saat mengalami ekspansi suhu tinggi di extruder, menurunkan densitas pelet sehingga mampu mengapung stabil."
  },
  {
    "id": 130,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Pemasangan tanaman air eceng gondok (Eichhornia crassipes) atau kangkung air dalam kurungan bambu terapung di sudut kolam tanah patin merupakan rekayasa fitoremediasi. Fungsi ekologis tanaman air tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyerap kelebihan unsur hara nitrogen (amonia/nitrat) dan fosfat terlarut, menekan pertumbuhan alga beracun, dan menjadi peneduh alami bagi ikan saat siang terik"
      },
      {
        "key": "B",
        "text": "Menghabiskan seluruh oksigen air kolam hingga ikan mati"
      },
      {
        "key": "C",
        "text": "Menghalangi pergerakan perahu panen petani"
      },
      {
        "key": "D",
        "text": "Mengeluarkan getah beracun yang mematikan ikan lele"
      },
      {
        "key": "E",
        "text": "Mengubah air tawar menjadi air laut asin"
      }
    ],
    "correct": "A",
    "explanation": "Fitoremediasi terkendali (dalam sekat kurungan maks 10% luas kolam) memanfaatkan akar tanaman air untuk menyerap nitrat dan fosfat organik berlebih (biofilter alami), menjaga air tetap segar dan tidak berbau."
  },
  {
    "id": 131,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 1,
    "question": "Seorang pembudidaya ikan patin di Belitang menebar 10.000 ekor benih patin di kolam tanah seluas 400 m². Selama 6 bulan masa pemeliharaan, total pakan pelet pabrikan yang dihabiskan adalah 6.500 kg. Saat panen diperoleh total bobot ikan patin seberat 5.000 kg. Berapakah nilai Feed Conversion Ratio (FCR) budidaya tersebut?",
    "options": [
      {
        "key": "A",
        "text": "FCR = 0,77"
      },
      {
        "key": "B",
        "text": "FCR = 1,30"
      },
      {
        "key": "C",
        "text": "FCR = 2,50"
      },
      {
        "key": "D",
        "text": "FCR = 1,85"
      },
      {
        "key": "E",
        "text": "FCR = 3,10"
      }
    ],
    "correct": "B",
    "explanation": "Rumus FCR = Total Pakan Diberikan (kg) / Total Pertambahan Bobot Ikan (kg) = 6.500 kg / 5.000 kg = 1,30. FCR 1,30 tergolong sangat efisien (dibutuhkan 1,3 kg pakan untuk menghasilkan 1 kg daging patin)."
  },
  {
    "id": 132,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Dari penebaran awal 10.000 ekor benih patin tersebut, saat panen diperoleh 9.000 ekor ikan hidup dengan rata-rata bobot 0,55 kg per ekor (total 5.000 kg). Berapakah Tingkat Kelangsungan Hidup (Survival Rate / SR) ikan patin tersebut?",
    "options": [
      {
        "key": "A",
        "text": "SR = 70%"
      },
      {
        "key": "B",
        "text": "SR = 80%"
      },
      {
        "key": "C",
        "text": "SR = 90%"
      },
      {
        "key": "D",
        "text": "SR = 95%"
      },
      {
        "key": "E",
        "text": "SR = 60%"
      }
    ],
    "correct": "C",
    "explanation": "Rumus Survival Rate (SR) = (Jumlah Ikan Panen / Jumlah Benih Awal) × 100% = (9.000 / 10.000) × 100% = 90%."
  },
  {
    "id": 133,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Rincian biaya modal operasional satu siklus pemeliharaan patin 5.000 kg: pembelian 10.000 benih Rp 2.500.000, pakan pelet 6.500 kg @ Rp 10.500/kg (Rp 68.250.000), token listrik & solar aerasi Rp 3.000.000, probiotik & kapur Rp 1.500.000, serta upah tenaga kerja Rp 4.000.000. Berapakah total modal pengeluaran pembudidaya?",
    "options": [
      {
        "key": "A",
        "text": "Rp 79.250.000"
      },
      {
        "key": "B",
        "text": "Rp 70.750.000"
      },
      {
        "key": "C",
        "text": "Rp 85.000.000"
      },
      {
        "key": "D",
        "text": "Rp 68.250.000"
      },
      {
        "key": "E",
        "text": "Rp 92.500.000"
      }
    ],
    "correct": "A",
    "explanation": "Total Biaya Modal = 2.500.000 + 68.250.000 + 3.000.000 + 1.500.000 + 4.000.000 = Rp 79.250.000."
  },
  {
    "id": 134,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Jika seluruh hasil panen patin seberat 5.000 kg tersebut dijual langsung ke pedagang pengumpul pasar Palembang dengan harga Rp 19.000 per kg, berapakah total pendapatan kotor yang diperoleh pembudidaya?",
    "options": [
      {
        "key": "A",
        "text": "Rp 85.000.000"
      },
      {
        "key": "B",
        "text": "Rp 95.000.000"
      },
      {
        "key": "C",
        "text": "Rp 100.000.000"
      },
      {
        "key": "D",
        "text": "Rp 79.250.000"
      },
      {
        "key": "E",
        "text": "Rp 110.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Pendapatan Kotor = Volume Hasil Panen × Harga Jual = 5.000 kg × Rp 19.000/kg = Rp 95.000.000."
  },
  {
    "id": 135,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Berdasarkan data soal nomor 133 dan 134 (Total Modal Rp 79.250.000 dan Pendapatan Kotor Rp 95.000.000), berapakah laba bersih yang dinikmati pembudidaya patin tersebut dalam satu siklus panen?",
    "options": [
      {
        "key": "A",
        "text": "Rp 15.750.000"
      },
      {
        "key": "B",
        "text": "Rp 25.000.000"
      },
      {
        "key": "C",
        "text": "Rp 12.500.000"
      },
      {
        "key": "D",
        "text": "Rp 18.250.000"
      },
      {
        "key": "E",
        "text": "Rp 30.000.000"
      }
    ],
    "correct": "A",
    "explanation": "Laba Bersih = Pendapatan Kotor - Total Modal = Rp 95.000.000 - Rp 79.250.000 = Rp 15.750.000."
  },
  {
    "id": 136,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 6,
    "question": "Harga Pokok Produksi (HPP) per kg ikan patin mencerminkan biaya modal riil per kilogram ikan yang dihasilkan. Berapakah HPP per kg ikan patin pembudidaya di atas (Total Modal Rp 79.250.000 / Hasil Panen 5.000 kg)?",
    "options": [
      {
        "key": "A",
        "text": "Rp 15.850 per kg"
      },
      {
        "key": "B",
        "text": "Rp 19.000 per kg"
      },
      {
        "key": "C",
        "text": "Rp 12.500 per kg"
      },
      {
        "key": "D",
        "text": "Rp 10.500 per kg"
      },
      {
        "key": "E",
        "text": "Rp 17.500 per kg"
      }
    ],
    "correct": "A",
    "explanation": "HPP per kg = Total Biaya Modal / Total Panen = Rp 79.250.000 / 5.000 kg = Rp 15.850 per kg. Karena harga jual Rp 19.000/kg, pembudidaya menikmati marjin keuntungan Rp 3.150 per kg."
  },
  {
    "id": 137,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Berapa persentase kontribusi biaya pakan pelet pabrikan (Rp 68.250.000) terhadap total modal pengeluaran budidaya patin (Rp 79.250.000)?",
    "options": [
      {
        "key": "A",
        "text": "50,0%"
      },
      {
        "key": "B",
        "text": "86,1%"
      },
      {
        "key": "C",
        "text": "25,5%"
      },
      {
        "key": "D",
        "text": "60,0%"
      },
      {
        "key": "E",
        "text": "98,0%"
      }
    ],
    "correct": "B",
    "explanation": "Proporsi Biaya Pakan = (68.250.000 / 79.250.000) × 100% = 86,11%. Fakta matematis ini membuktikan pakan adalah komponen biaya terbesar (>80%) dalam agribisnis perikanan."
  },
  {
    "id": 138,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Jika pembudidaya berhasil menekan FCR dari 1,30 menjadi 1,10 berkat pembuatan pakan pelet mandiri lokal yang bermutu, berapa kilogram pakan pelet yang berhasil dihemat untuk menghasilkan 5.000 kg ikan patin?",
    "options": [
      {
        "key": "A",
        "text": "500 kg pakan"
      },
      {
        "key": "B",
        "text": "1.000 kg pakan (senilai lebih dari Rp 10.000.000 penghematan modal)"
      },
      {
        "key": "C",
        "text": "2.000 kg pakan"
      },
      {
        "key": "D",
        "text": "250 kg pakan"
      },
      {
        "key": "E",
        "text": "100 kg pakan"
      }
    ],
    "correct": "B",
    "explanation": "Kebutuhan pakan pada FCR 1,30 = 5.000 × 1,30 = 6.500 kg. Kebutuhan pakan pada FCR 1,10 = 5.000 × 1,10 = 5.500 kg. Penghematan pakan = 6.500 - 5.500 = 1.000 kg pakan."
  },
  {
    "id": 139,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Kepadatan tebar benih lele di kolam bioflok bulat diameter 3 meter (luas alas 7,06 m² dengan tinggi air 1 meter = volume ~7 m³) adalah 1.000 ekor per m³. Berapa total benih lele yang ditebar di dalam kolam terpal bulat tersebut?",
    "options": [
      {
        "key": "A",
        "text": "2.000 ekor"
      },
      {
        "key": "B",
        "text": "7.000 ekor"
      },
      {
        "key": "C",
        "text": "14.000 ekor"
      },
      {
        "key": "D",
        "text": "5.000 ekor"
      },
      {
        "key": "E",
        "text": "1.000 ekor"
      }
    ],
    "correct": "B",
    "explanation": "Volume air kolam = 7 m³. Kepadatan tebar = 1.000 ekor/m³. Total benih = 7 m³ × 1.000 ekor/m³ = 7.000 ekor benih lele."
  },
  {
    "id": 140,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Titik Impas Produksi (BEP Unit dalam kg) menunjukkan volume panen minimal yang harus dihasilkan agar pembudidaya tidak merugi. Jika Total Biaya Tetap & Variabel adalah Rp 79.250.000 dan harga jual pasar Rp 19.000/kg, berapa BEP volume panen patin tersebut?",
    "options": [
      {
        "key": "A",
        "text": "2.500 kg"
      },
      {
        "key": "B",
        "text": "4.171 kg"
      },
      {
        "key": "C",
        "text": "5.000 kg"
      },
      {
        "key": "D",
        "text": "6.200 kg"
      },
      {
        "key": "E",
        "text": "3.000 kg"
      }
    ],
    "correct": "B",
    "explanation": "BEP (Volume) = Total Biaya / Harga Jual per Satuan = Rp 79.250.000 / Rp 19.000 = 4.171,05 kg (dibulatkan 4.171 kg). Panen di atas 4.171 kg memberikan laba bersih bagi pembudidaya."
  },
  {
    "id": 141,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Kecamatan Belitang dan sekitarnya telah ditetapkan sebagai kawasan Kampung Perikanan Budidaya Patin Nasional di Sumatera Selatan. Bagaimana keterpaduan 4 pilar STEM memperkuat daya saing kawasan perikanan patin Belitang?",
    "options": [
      {
        "key": "A",
        "text": "Sains biologi kualitas air + Teknologi kincir aerasi & mesin pelet apung + Rekayasa kolam sirkulasi monik + Matematika analisis efisiensi FCR dan rantai pasok industri fillet"
      },
      {
        "key": "B",
        "text": "Menghentikan budidaya kolam dan beralih menangkap ikan liar di sungai"
      },
      {
        "key": "C",
        "text": "Membuang seluruh limbah kolam langsung ke pemukiman penduduk"
      },
      {
        "key": "D",
        "text": "Hanya mengandalkan pakan bangkai ayam tanpa pengujian gizi"
      },
      {
        "key": "E",
        "text": "Menjual seluruh kolam tanah untuk dijadikan lapangan parkir"
      }
    ],
    "correct": "A",
    "explanation": "Kemajuan Kampung Patin Belitang ditopang integrasi STEM menyeluruh: formulasi pakan sains lokal, teknologi aerasi hemat listrik, rekayasa tata air irigasi BK, dan perhitungan manajemen bisnis FCR yang ketat."
  },
  {
    "id": 142,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Untuk mengatasi ketergantungan pembudidaya pada pakan pelet pabrikan yang mahal, kelompok perikanan mandiri di OKU Timur memproduksi 'Pakan Mandiri Berbasis Bahan Baku Lokal'. Bahan baku pertanian lokal apa saja yang diintegrasikan secara sains nutrisi?",
    "options": [
      {
        "key": "A",
        "text": "Dedak bekatul padi Belitang (sumber karbohidrat), bungkil kedelai/kelapa, tepung ikan rucah lokal, dan limbah ampas tahu hasil industri rumah tangga"
      },
      {
        "key": "B",
        "text": "Serbuk gergaji kayu dan semen bangunan"
      },
      {
        "key": "C",
        "text": "Batu bata merah yang ditumbuk halus"
      },
      {
        "key": "D",
        "text": "Minyak tanah dan oli bekas traktor"
      },
      {
        "key": "E",
        "text": "Daun karet kering yang dibakar"
      }
    ],
    "correct": "A",
    "explanation": "Formulasi pakan mandiri memadukan potensi agrikultur lokal OKU Timur: dedak padi penggilingan Belitang (energi), ampas tahu/kedelai (protein nabati), dan tepung ikan (protein hewani) dengan kadar protein total 28-30%."
  },
  {
    "id": 143,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 3,
    "question": "Hilirisasi produk perikanan patin di Belitang tidak hanya menjual ikan segar berkepala, tetapi diolah menjadi produk olahan bernilai tambah tinggi. Bentuk produk olahan turunan patin tersebut meliputi...",
    "options": [
      {
        "key": "A",
        "text": "Fillet daging putih dori, kerupuk kemplang ikan khas Belitang, abon ikan patin, dan keripik kulit ikan krispi"
      },
      {
        "key": "B",
        "text": "Batu bata bangunan dan genteng atap rumah"
      },
      {
        "key": "C",
        "text": "Bahan bakar bensin oktan 98"
      },
      {
        "key": "D",
        "text": "Cat dinding tembok tahan air"
      },
      {
        "key": "E",
        "text": "Kain tenun sutra alami"
      }
    ],
    "correct": "A",
    "explanation": "Hilirisasi patin (zero waste processing) mengolah daging menjadi fillet dan abon, kulit menjadi keripik renyah, dan sisa tulang diolah menjadi tepung kalsium pupuk/pakan, melipatgandakan margin ekonomi UMKM desa."
  },
  {
    "id": 144,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Pemanfaatan lumpur dasar kolam patin yang kaya endapan bahan organik setelah masa panen sebagai pupuk tanaman sayuran dan sawah di sekitarnya merupakan penerapan konsep...",
    "options": [
      {
        "key": "A",
        "text": "Ekonomi sirkular terpadu (Integrated Agri-Aquaculture) yang menghemat pupuk kimia dan mencegah pencemaran lingkungan sungai"
      },
      {
        "key": "B",
        "text": "Pemborosan tenaga kerja yang tidak memiliki nilai ilmiah"
      },
      {
        "key": "C",
        "text": "Pencemaran lahan sawah dengan racun mematikan"
      },
      {
        "key": "D",
        "text": "Tindakan melanggar hukum perikanan"
      },
      {
        "key": "E",
        "text": "Penyebab tanaman sayuran mati kekeringan"
      }
    ],
    "correct": "A",
    "explanation": "Lumpur kolam (fish pond sediment) mengandung Nitrogen, Fosfor, dan bahan organik tinggi dari sisa pakan/feses, menjadikannya pupuk bioslurry alami penyubur tanaman pangan tanpa biaya."
  },
  {
    "id": 145,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Dalam mengatasi bau lumpur (geosmin) pada ikan patin sebelum dipasarkan ke restoran bintang lima, rekayasa penanganan pascapanen yang wajib dilakukan pembudidaya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pemberokan (purging) ikan di dalam bak air mengalir bersih dan jernih selama 24-48 jam tanpa pakan agar kotoran lumpur di insang dan pencernaan terbilas tuntas"
      },
      {
        "key": "B",
        "text": "Merendam ikan hidup di dalam cairan pemutih pakaian"
      },
      {
        "key": "C",
        "text": "Menjemur ikan patin hidup di bawah terik matahari hingga layu"
      },
      {
        "key": "D",
        "text": "Menyemprotkan parfum wangi ke dalam insang ikan"
      },
      {
        "key": "E",
        "text": "Merebus ikan hidup di air mendidih"
      }
    ],
    "correct": "A",
    "explanation": "Pemberokan (depuration/purging) di kolam air mengalir bersih (aerasi tinggi tanpa pakan) memfasilitasi pelepasan molekul geosmin/MIB dari jaringan lemak dan insang ikan lewat osmoregulasi alami."
  },
  {
    "id": 146,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Penerapan sistem sertifikasi Cara Budidaya Ikan yang Baik (CBIB) dari Kementerian Kelautan dan Perikanan di sentra kolam OKU Timur mewajibkan kepatuhan terhadap...",
    "options": [
      {
        "key": "A",
        "text": "Keamanan pangan (bebas residu antibiotik terlarang dan logam berat), biosekuriti kolam, kelestarian lingkungan, dan kesejahteraan hewan"
      },
      {
        "key": "B",
        "text": "Kewajiban memberi pakan ikan dengan daging sapi impor"
      },
      {
        "key": "C",
        "text": "Larangan menjual ikan di pasar lokal Belitang"
      },
      {
        "key": "D",
        "text": "Kewajiban mengganti air kolam setiap 1 jam sekali"
      },
      {
        "key": "E",
        "text": "Penggunaan kolam dari kaca akuarium raksasa"
      }
    ],
    "correct": "A",
    "explanation": "Sertifikasi CBIB menjamin mutu produk perikanan: melarang antibiotik berbahaya (seperti chloramphenicol), menjamin sumber air tidak tercemar pestisida sawah, dan menerapkan standar sanitasi peralatan."
  },
  {
    "id": 147,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Integrasi teknologi budidaya Aquaponik (memadukan kolam lele terpal dengan instalasi hidroponik sayuran kangkung/selada di atasnya) di pekarangan rumah pedesaan Belitang menerapkan siklus nitrogen sains berupa...",
    "options": [
      {
        "key": "A",
        "text": "Amonia air kolam diubah bakteri nitrifikasi menjadi nitrat yang diserap akar sayuran sebagai pupuk cair alami, dan air yang bersih kembali mengalir ke kolam ikan"
      },
      {
        "key": "B",
        "text": "Sayuran kangkung memakan anak ikan lele yang berenang di bawahnya"
      },
      {
        "key": "C",
        "text": "Akar sayuran mengeluarkan racun yang mematikan ikan lele"
      },
      {
        "key": "D",
        "text": "Ikan lele melompat memakan daun selada di atas pipa"
      },
      {
        "key": "E",
        "text": "Air kolam menguap habis dalam waktu 5 menit"
      }
    ],
    "correct": "A",
    "explanation": "Aquaponik menyatukan resirkulasi tertutup: limbah amonia feses ikan dikonversi biofilter menjadi nitrat (NO3-) yang diserap akar tanaman sayuran, menghasilkan panen protein ikan dan sayuran segar hemat air."
  },
  {
    "id": 148,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Penggunaan aplikasi digital pencatat kualitas air dan logbook pakan berbasis Internet of Things (IoT) pada sentra patin modern membantu pembudidaya dalam...",
    "options": [
      {
        "key": "A",
        "text": "Pemantauan real-time kadar DO, suhu, dan pH kolam dari ponsel pintar serta pemberian peringatan dini (alarm) saat aerator padam"
      },
      {
        "key": "B",
        "text": "Menangkap ikan patin secara otomatis ke dalam ember"
      },
      {
        "key": "C",
        "text": "Mengisi air kolam tanpa menggunakan pipa"
      },
      {
        "key": "D",
        "text": "Mengubah ikan lele menjadi ikan hias koi"
      },
      {
        "key": "E",
        "text": "Menghilangkan kebutuhan listrik pompa air"
      }
    ],
    "correct": "A",
    "explanation": "Smart aquaculture IoT dengan sensor online mendeteksi penurunan DO berbahaya secara real-time dan memicu sakelar otomatis menyalakan kincir aerator cadangan, mencegah insiden kematian massal ikan di malam hari."
  },
  {
    "id": 149,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Pembentukan Koperasi Perikanan Terpadu di Belitang yang mengelola pasokan pakan pabrik secara grosir, pabrik es balok bersama, dan armada truk pendingin bertujuan memecahkan masalah matematika finansial berupa...",
    "options": [
      {
        "key": "A",
        "text": "Menekan harga beli pakan pelet eceran yang mahal dan memotong biaya logistik pemasaran agar margin keuntungan pembudidaya meningkat"
      },
      {
        "key": "B",
        "text": "Mewajibkan pembudidaya menyumbangkan seluruh ikan hasil panennya"
      },
      {
        "key": "C",
        "text": "Melarang warga makan ikan patin di rumah"
      },
      {
        "key": "D",
        "text": "Mengambil alih kepemilikan tanah warga desa secara paksa"
      },
      {
        "key": "E",
        "text": "Mengharuskan transaksi ikan menggunakan mata uang emas murni"
      }
    ],
    "correct": "A",
    "explanation": "Koperasi perikanan menciptakan economies of scale (skala ekonomi): pembelian pakan skala kontainer mendapatkan diskon pabrik, fasilitas cold chain bersama menjaga kesegaran ikan, dan negosiasi pasar lebih solid."
  },
  {
    "id": 150,
    "day": 3,
    "sector": "perikanan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Keberlanjutan sentra perikanan patin dan lele di Kabupaten OKU Timur di masa depan ditentukan oleh sinergi 4 pilar STEM yang harmonis dengan lingkungan sekitarnya. Indikator keberhasilan utama dari sinergi ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Produktivitas tinggi dengan FCR rendah, efisiensi air saluran irigasi BK, bebas residu kimia, dan peningkatan kesejahteraan ekonomi keluarga pembudidaya"
      },
      {
        "key": "B",
        "text": "Menutup seluruh saluran irigasi pertanian demi kepentingan kolam ikan semata"
      },
      {
        "key": "C",
        "text": "Mencemari sungai Komering dengan limbah bangkai ikan"
      },
      {
        "key": "D",
        "text": "Menjual seluruh kolam ikan kepada pihak luar daerah"
      },
      {
        "key": "E",
        "text": "Menghentikan inovasi mesin dan kembali ke metode penangkapan liar"
      }
    ],
    "correct": "A",
    "explanation": "Keberhasilan perikanan STEM OKU Timur mencakup efisiensi biokonversi pakan (FCR < 1.2), kepatuhan tata air irigasi bersama petani padi, kemandirian bahan baku lokal, dan profitabilitas finansial yang berkelanjutan."
  },
  {
    "id": 151,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Ternak ruminansia (seperti sapi dan kambing/domba) tergolong hewan memamah biak dengan lambung majemuk terdiri dari 4 bagian. Bagian lambung manakah yang berfungsi sebagai ruang fermentasi utama tempat hidup miliaran mikroba pengurai serat selulosa hijauan pakan?",
    "options": [
      {
        "key": "A",
        "text": "Abomasum (lambung sejati tempat sekresi enzim asam lambung)"
      },
      {
        "key": "B",
        "text": "Rumen (perut handuk berkapasitas terbesar tempat fermentasi mikroba anaerobik)"
      },
      {
        "key": "C",
        "text": "Omasum (perut buku tempat penyerapan air)"
      },
      {
        "key": "D",
        "text": "Retikulum (perut jala tempat penyaring partikel kasar)"
      },
      {
        "key": "E",
        "text": "Kantung empedu penyimpan cairan hati"
      }
    ],
    "correct": "B",
    "explanation": "Rumen adalah kompartemen terbesar (mencapai 80% volume lambung) yang menyediakan lingkungan anaerobik ideal bagi koloni bakteri selulolitik dan protozoa untuk mencerna serat kasar pakan (selulosa dan hemiselulosa) menjadi Volatile Fatty Acids (VFA) sebagai energi utama sapi."
  },
  {
    "id": 152,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Dalam ilmu nutrisi ternak ruminansia (sapi dan kambing) di OKU Timur, kebutuhan pakan hijauan segar (seperti rumput gajah odot) per hari dihitung berdasarkan persentase bobot badan hidup ternak, yaitu sebesar...",
    "options": [
      {
        "key": "A",
        "text": "1% - 2% dari bobot badan hidup"
      },
      {
        "key": "B",
        "text": "10% - 12% dari bobot badan hidup"
      },
      {
        "key": "C",
        "text": "50% dari bobot badan hidup"
      },
      {
        "key": "D",
        "text": "100% (sama dengan berat badannya sendiri)"
      },
      {
        "key": "E",
        "text": "Sapi tidak membutuhkan pakan hijauan apabila sudah diberi air minum"
      }
    ],
    "correct": "B",
    "explanation": "Standar fisiologis ruminansia: konsumsi pakan hijauan segar adalah 10-12% dari bobot badan ternak (atau setara 2.5-3.0% bahan kering / dry matter) ditambah konsentrat penguat 1-2% bobot badan untuk mengoptimalkan penggemukan."
  },
  {
    "id": 153,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 3,
    "question": "Rumput Gajah Odot (Pennisetum purpureum cv. Mott) menjadi pakan hijauan favorit peternak sapi dan kambing di Belitang. Keunggulan sains agronomis rumput odot dibanding rumput liar lapangan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kadar protein kasar tinggi (12-14%), tekstur batang lunak dan daun lebat tanpa bulu tajam sehingga sangat disukai ternak (palatabilitas tinggi)"
      },
      {
        "key": "B",
        "text": "Dapat tumbuh subur di dalam ruangan tanpa sinar matahari"
      },
      {
        "key": "C",
        "text": "Mengandung racun sianida yang membius sapi"
      },
      {
        "key": "D",
        "text": "Hanya dapat dipanen sekali seumur hidup lalu mati"
      },
      {
        "key": "E",
        "text": "Mengubah air kencing sapi menjadi susu murni"
      }
    ],
    "correct": "A",
    "explanation": "Rumput odot memiliki ruas batang pendek dan empuk, rasio daun-batang tinggi, bebas bulu gatal, palatabilitas istimewa, serta protein kasar mencapai 14%, jauh melampaui rumput alam (6-8% PK)."
  },
  {
    "id": 154,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Pemberian daun leguminosa seperti Gamal (Gliricidia sepium) atau Lamtoro (Leucaena leucocephala) pada ternak ruminansia (sapi dan kambing) sangat penting dalam ransum pakan karena berfungsi sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Sumber protein nabati tinggi (20-25% PK) dan asam amino esensial yang meningkatkan sintesis protein daging sapi"
      },
      {
        "key": "B",
        "text": "Pewarna alami agar kotoran sapi berwarna hijau"
      },
      {
        "key": "C",
        "text": "Bahan pengawet kimia sintetis"
      },
      {
        "key": "D",
        "text": "Pengganti air minum ternak"
      },
      {
        "key": "E",
        "text": "Obat penenang agar sapi tertidur lelap"
      }
    ],
    "correct": "A",
    "explanation": "Leguminosa pohon (gamal/lamtoro/kaliandra) bertindak sebagai konsentrat hijau alami kaya protein (20-25% Crude Protein) dan mineral, memacu perkembangbiakan mikroba rumen dan mempercepat pertambahan bobot badan harian."
  },
  {
    "id": 155,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Penyakit Mulut dan Kuku (PMK / Foot and Mouth Disease) pada sapi disebabkan oleh infeksi virus dari famili Picornaviridae (Aphthovirus). Gejala klinis spesifik apa yang tampak pada sapi yang terjangkit di lapangan?",
    "options": [
      {
        "key": "A",
        "text": "Bulu sapi rontok seluruhnya dan mata memancarkan cahaya merah"
      },
      {
        "key": "B",
        "text": "Hipersalivasi (air liur berbusa menggantung berlebihan), luka lepuh vesikel pada lidah, gusi, dan celah kuku yang menyebabkan sapi pincang dan enggan berdiri"
      },
      {
        "key": "C",
        "text": "Sapi melompat-lompat setinggi 3 meter tanpa henti"
      },
      {
        "key": "D",
        "text": "Tanduk sapi memanjang dan membengkok ke belakang"
      },
      {
        "key": "E",
        "text": "Sapi tidak dapat buang air kencing selamanya"
      }
    ],
    "correct": "B",
    "explanation": "Virus PMK menyerang epitelial mukosa mulut (vesikel/lepuh pada lidah, bibir, gusi) yang memicu hipersalivasi (drooling) hebat dan lesi pada koronet celah teracak kuku yang menyebabkan kepincangan parah."
  },
  {
    "id": 156,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Pemberian pakan konsentrat berbutir halus (seperti dedak bekatul dan jagung giling) dalam jumlah berlebihan tanpa diimbangi pakan hijauan berserat kasar dapat memicu gangguan pencernaan mematikan pada sapi, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Asidosis rumen (penurunan drastis pH cairan rumen di bawah 5.5 akibat produksi asam laktat berlebih)"
      },
      {
        "key": "B",
        "text": "Penyakit rabies anjing gila"
      },
      {
        "key": "C",
        "text": "Pembesaran kantung empedu"
      },
      {
        "key": "D",
        "text": "Patah tulang rusuk"
      },
      {
        "key": "E",
        "text": "Pertumbuhan gigi taring karnivora"
      }
    ],
    "correct": "A",
    "explanation": "Pati fermentable berlebih difermentasi cepat oleh Streptococcus bovis menghasilkan asam laktat masif, menjatuhkan pH rumen (asidosis), mematikan flora rumen pengurai serat, dan dapat memicu kematian mendadak."
  },
  {
    "id": 157,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 7,
    "question": "Pada unggas (ayam pedaging / broiler), pakan yang ditelan utuh tanpa dikunyah akan dicerna secara mekanik di dalam organ pencernaan berlapis otot tebal yang sering dibantu oleh butiran kerikil (grit), yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Tembolok (crop)"
      },
      {
        "key": "B",
        "text": "Gizzard (empedal / ampela)"
      },
      {
        "key": "C",
        "text": "Proventrikulus (lambung kelenjar)"
      },
      {
        "key": "D",
        "text": "Sekum (usus buntu ganda)"
      },
      {
        "key": "E",
        "text": "Kloaka (saluran pembuangan akhir)"
      }
    ],
    "correct": "B",
    "explanation": "Gizzard (ampela) memiliki dinding otot polos tebal berkontraksi kuat dan lapisan keratin koilin yang menggilas dan menghancurkan butiran biji pakan secara mekanik dengan bantuan partikel grit keras."
  },
  {
    "id": 158,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Parasit cacing hati (Fasciola gigantica) dapat menyerang ternak ruminansia (sapi, kerbau, kambing) yang digembalakan di areal persawahan atau rawa lebak OKU Timur. Mengapa keberadaan siput air tawar kecil (Lymnaea rubiginosa) menjadi kunci penularan cacing hati ini?",
    "options": [
      {
        "key": "A",
        "text": "Siput bertindak sebagai inang perantara (intermediate host) tempat larva cacing berkembang biak sebelum membentuk kista metaserkaria yang menempel pada rumput air"
      },
      {
        "key": "B",
        "text": "Siput memakan hati sapi secara langsung dari dalam tanah"
      },
      {
        "key": "C",
        "text": "Siput mengeluarkan racun kimia yang mengubah rumput menjadi beracun"
      },
      {
        "key": "D",
        "text": "Siput menyuntikkan telur cacing ke dalam pembuluh darah sapi lewat gigitan"
      },
      {
        "key": "E",
        "text": "Siput hanya memakan kotoran sapi tanpa ada kaitan siklus cacing"
      }
    ],
    "correct": "A",
    "explanation": "Fasciola gigantica membutuhkan siput Lymnaea sebagai inang perantara untuk siklus miracidium -> sporokista -> redia -> serkaria. Serkaria berenang keluar dan mengenkistasi menjadi metaserkaria infektif pada rumput hijauan."
  },
  {
    "id": 159,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Pemberian garam dapur (NaCl) dan mineral blok jilat (mineral lick block) di dalam kandang ternak ruminansia (sapi dan kambing) di Belitang bertujuan untuk memenuhi kebutuhan sains faal berupa...",
    "options": [
      {
        "key": "A",
        "text": "Keseimbangan elektrolit tubuh, merangsang nafsu makan, dan mencukupi kebutuhan mineral mikro (Kalsium, Fosfor, Seng, Selenium)"
      },
      {
        "key": "B",
        "text": "Membuat daging sapi berasa asin saat disembelih"
      },
      {
        "key": "C",
        "text": "Menghentikan sistem pencernaan sapi"
      },
      {
        "key": "D",
        "text": "Mencegah sapi meminum air"
      },
      {
        "key": "E",
        "text": "Mengubah warna kulit sapi menjadi belang putih"
      }
    ],
    "correct": "A",
    "explanation": "Mineral blok memasok natrium, klorida, kalsium, dan mikromineral esensial yang memelihara tekanan osmotik sel, memacu sekresi saliva penyangga pH rumen, dan mencegah defisiensi mineral (pica/jilat kandang)."
  },
  {
    "id": 160,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "A",
    "indicatorKey": "pilar_science",
    "indicatorName": "Pilar Science (Sains Terapan Tanah, Air, Cuaca & Biologi Komoditas)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Ketika sapi betina mengalami masa birahi (estrus), peternak harus segera melapor ke petugas mantri inseminator untuk dilakukan kawin suntik. Tanda-tanda fisiologis birahi 3A pada sapi betina adalah...",
    "options": [
      {
        "key": "A",
        "text": "Abang (vulva memerah), Abu (vulva bengkak/hangat), dan Anget (keluar lendir bening kental serta sapi gelisah diam dinaiki sapi lain)"
      },
      {
        "key": "B",
        "text": "Ambles, Amuk, dan Anjlok"
      },
      {
        "key": "C",
        "text": "Aman, Adem, dan Anteng tanpa bergerak"
      },
      {
        "key": "D",
        "text": "Anak, Ayah, dan Asuh"
      },
      {
        "key": "E",
        "text": "Asin, Asem, dan Amis pada kencing sapi"
      }
    ],
    "correct": "A",
    "explanation": "Tanda birahi klasik pada sapi adalah '3A' (Abang, Abuh, Anget): vulva merah membengkak dan hangat, sekresi lendir estrus serviks yang jernih elastis, serta refleks diam saat dinaiki (standing heat)."
  },
  {
    "id": 161,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 1,
    "question": "Mesin perajang rumput (chopper pakan) bertenaga motor bensin 6,5 HP sangat banyak digunakan kelompok peternak sapi di Belitang. Apa fungsi teknologi mekanik mesin chopper dalam penyediaan pakan ternak?",
    "options": [
      {
        "key": "A",
        "text": "Mencacah batang rumput gajah, jerami, dan pelepah menjadi ukuran pendek (2-5 cm) agar mudah dikunyah ternak dan meminimalkan pakan terbuang"
      },
      {
        "key": "B",
        "text": "Memasak rumput hingga matang mendidih"
      },
      {
        "key": "C",
        "text": "Menghilangkan seluruh kandungan serat dari dalam rumput"
      },
      {
        "key": "D",
        "text": "Mengubah rumput menjadi butiran beras putih"
      },
      {
        "key": "E",
        "text": "Menyemprotkan pakan langsung ke dalam mulut sapi"
      }
    ],
    "correct": "A",
    "explanation": "Pisau putar chopper berkecepatan tinggi merajang batang hijauan berserat kasar menjadi fraksi seragam (2-5 cm), memperluas luas permukaan untuk fermentasi mikroba rumen dan menekan pakan tercecer dari palung pakan."
  },
  {
    "id": 162,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Teknologi Inseminasi Buatan (IB / Kawin Suntik) pada ternak sapi di OKU Timur menggunakan sperma beku (straw semen). Di dalam wadah apa straw semen beku tersebut disimpan agar sel sperma tetap hidup dorman selama bertahun-tahun?",
    "options": [
      {
        "key": "A",
        "text": "Tabung termos cryogenic berisi nitrogen cair pada suhu -196°C"
      },
      {
        "key": "B",
        "text": "Kotak styrofoam berisi es batu biasa pada suhu 0°C"
      },
      {
        "key": "C",
        "text": "Kulkas rumah tangga pada suhu 4°C"
      },
      {
        "key": "D",
        "text": "Minyak goreng panas pada suhu 100°C"
      },
      {
        "key": "E",
        "text": "Botol kaca kedap udara pada suhu kamar"
      }
    ],
    "correct": "A",
    "explanation": "Nitrogen cair cair pada suhu kriogenik ekstrem (-196°C) menghentikan seluruh aktivitas metabolisme sel sperma (vitrifikasi dorman total) tanpa merusak membran sel, sehingga spermatozoa hidup kembali saat di-thawing."
  },
  {
    "id": 163,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Sebelum straw semen beku dimasukkan ke dalam uterus sapi menggunakan alat insemination gun, tahapan teknologi apakah yang wajib dilakukan oleh mantri IB?",
    "options": [
      {
        "key": "A",
        "text": "Thawing (pencairan kembali) di dalam wadah air hangat bersuhu 37°C selama 30 detik untuk mengaktifkan kembali motilitas sperma"
      },
      {
        "key": "B",
        "text": "Membakar straw di atas api kompor selama 5 menit"
      },
      {
        "key": "C",
        "text": "Merendam straw di dalam cairan alkohol 70%"
      },
      {
        "key": "D",
        "text": "Menjemur straw di bawah terik sinar matahari selama 2 jam"
      },
      {
        "key": "E",
        "text": "Mengocok straw hingga cairan semen berbuih putih"
      }
    ],
    "correct": "A",
    "explanation": "Thawing terstandar dalam penangas air suhu fisiologis tubuh sapi (37°C selama 30 detik) mencairkan kristal krioprotektan secara cepat dan aman, mengembalikan motilitas progresif spermatozoa secara optimum."
  },
  {
    "id": 164,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C2",
    "numberInIndicator": 4,
    "question": "Untuk memperkirakan bobot badan sapi hidup tanpa timbangan jembatan yang mahal, peternak di pedesaan Belitang menggunakan teknologi pita ukur ternak (rondo meter / weight tape). Bagian tubuh sapi manakah yang diukur lingkarannya?",
    "options": [
      {
        "key": "A",
        "text": "Lingkar dada tepat di belakang sendi bahu siku kaki depan sapi"
      },
      {
        "key": "B",
        "text": "Panjang ekor sapi dari pangkal ke ujung rambut"
      },
      {
        "key": "C",
        "text": "Lingkar leher di bawah daun telinga"
      },
      {
        "key": "D",
        "text": "Jarak antara ujung tanduk kanan dan kiri"
      },
      {
        "key": "E",
        "text": "Lingkar pergelangan kaki belakang sapi"
      }
    ],
    "correct": "A",
    "explanation": "Lingkar dada (heart girth) memiliki korelasi matematis-biometris paling kuat (r > 0.95) dengan massa total tubuh ruminansia besar (rumus Schoorl atau Winter), dikonversi langsung pada skala pita ukur menjadi kg."
  },
  {
    "id": 165,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Pada kandang ayam broiler modern semi-closed house di OKU Timur, sistem tempat minum otomatis menggunakan teknologi 'nipple drinker'. Apa keunggulan teknologi nipple drinker dibanding mangkok minum terbuka?",
    "options": [
      {
        "key": "A",
        "text": "Air minum selalu tertutup higienis di dalam pipa, air hanya menetes saat disentuh paruh ayam, sehingga litter sekam lantai kandang tetap kering dan bebas bau amonia"
      },
      {
        "key": "B",
        "text": "Dapat mengeluarkan minuman jus buah secara otomatis"
      },
      {
        "key": "C",
        "text": "Membuat ayam berhenti minum air selamanya"
      },
      {
        "key": "D",
        "text": "Mengharuskan peternak menuang air satu per satu dengan tangan"
      },
      {
        "key": "E",
        "text": "Mengalirkan air mendidih untuk merebus bulu ayam"
      }
    ],
    "correct": "A",
    "explanation": "Nipple valve stainless steel menyuplai air secara higienis saat ditekan paruh ayam tanpa tumpahan (drip-free), mencegah litter sekam basah, dan menekan pembentukan gas amonia dari kotoran ayam."
  },
  {
    "id": 166,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Mesin penetas telur otomatis (egg incubator) bertenaga listrik yang dirakit peternak unggas lokal Belitang dilengkapi sistem 'automatic egg turner'. Mengapa telur unggas harus diputar posisinya secara berkala setiap 2-4 jam sekali?",
    "options": [
      {
        "key": "A",
        "text": "Mencegah embrio anak ayam menempel pada selaput cangkang dalam dan memastikan distribusi panas merata ke seluruh permukaan telur"
      },
      {
        "key": "B",
        "text": "Agar telur matang seperti telur rebus"
      },
      {
        "key": "C",
        "text": "Membuat anak ayam pusing saat menetas"
      },
      {
        "key": "D",
        "text": "Mengubah telur ayam menjadi telur bebek"
      },
      {
        "key": "E",
        "text": "Mempercepat cangkang telur pecah dalam waktu 1 hari"
      }
    ],
    "correct": "A",
    "explanation": "Pembalikan telur (tilting 45°) meniru perilaku alami induk ayam mengerami telur, mencegah adhesi membran korioalantois ke dinding cangkang bagian dalam, dan menjamin perkembangan vaskular embrio normal."
  },
  {
    "id": 167,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Timbangan ternak digital portabel jenis 'bars scale' (dua batang sensor load cell yang diletakkan di bawah lantai kandang jepit) memudahkan penimbangan sapi di Belitang. Keunggulan fitur 'animal lock filter' pada timbangan digital tersebut adalah...",
    "options": [
      {
        "key": "A",
        "text": "Algoritma mikrokontroler mampu mengunci angka bobot riil sapi secara stabil dan akurat meskipun sapi bergerak-gerak aktif di atas lantai timbangan"
      },
      {
        "key": "B",
        "text": "Mengikat kaki sapi dengan medan magnet kuat"
      },
      {
        "key": "C",
        "text": "Menambah timbangan sapi secara otomatis sebesar 50 kg"
      },
      {
        "key": "D",
        "text": "Mengeluarkan sengatan listrik jika sapi melangkah keluar"
      },
      {
        "key": "E",
        "text": "Membuat sapi pingsan saat ditimbang"
      }
    ],
    "correct": "A",
    "explanation": "Fitur hold/animal lock menggunakan filter rata-rata bergerak digital (moving average algorithm) yang mengeliminasi fluktuasi sinyal getaran dinamis akibat pergerakan kaki sapi, menghasilkan pembacaan massa statis yang presisi."
  },
  {
    "id": 168,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 8,
    "question": "Dalam program vaksinasi massal PMK dan pemberian vitamin ternak sapi di OKU Timur, petugas peternakan menggunakan alat suntik otomatis (automatic repeat syringe). Keuntungan teknologi ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dosis obat/vaksin terisi ulang otomatis dari botol dengan takaran mililiter yang sama persis untuk ratusan ekor ternak secara cepat dan steril"
      },
      {
        "key": "B",
        "text": "Dapat menyuntik sapi dari jarak jauh 100 meter"
      },
      {
        "key": "C",
        "text": "Menyuntik sapi tanpa menggunakan jarum logam"
      },
      {
        "key": "D",
        "text": "Mengubah cairan vaksin menjadi gas udara"
      },
      {
        "key": "E",
        "text": "Membuat sapi kebal terhadap semua jenis penyakit seumur hidup dalam satu detik"
      }
    ],
    "correct": "A",
    "explanation": "Continuous repeat syringe dengan selang hisap langsung dari botol ampul memastikan akurasi kalibrasi volume dosis (misal 5 ml per ekor) secara konsisten dan mempercepat operasional vaksinasi populasi ratusan sapi."
  },
  {
    "id": 169,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Pada peternakan ayam petelur (layer) di OKU Timur, lampu penerangan kandang diatur menggunakan sensor pengatur waktu otomatis (photoperiod light timer) selama 16 jam terang. Tujuan sains teknologi pencahayaan ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Merangsang kelenjar hipofisis otak ayam memproduksi hormon gonadotropin untuk mempertahankan ovulasi dan produksi telur yang stabil setiap hari"
      },
      {
        "key": "B",
        "text": "Mencegah ayam tidur sepanjang malam agar ayam lelah"
      },
      {
        "key": "C",
        "text": "Memanaskan kandang hingga ayam berkeringat"
      },
      {
        "key": "D",
        "text": "Membuat warna cangkang telur menjadi warna-warni"
      },
      {
        "key": "E",
        "text": "Sebagai lampu penerangan jalan bagi warga desa"
      }
    ],
    "correct": "A",
    "explanation": "Fotoperiodisme 16 jam cahaya merangsang fotoreseptor retina mata ayam, mentransmisikan sinyal ke hipotalamus untuk mensekresikan GnRH yang memicu pelepasan FSH dan LH dari kelenjar pituitari untuk pembentukan kuning telur."
  },
  {
    "id": 170,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "B",
    "indicatorKey": "pilar_technology",
    "indicatorName": "Pilar Technology (Mekanisasi, Alat Mesin & Efisiensi Energi)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Alat Dehorner elektrik (cautery dehorner) digunakan peternak sapi modern untuk menghilangkan kuncup tanduk pada pedet (anak sapi) usia di bawah 1 bulan. Manfaat teknologi dehorning ini terhadap manajemen pemeliharaan sapi di kandang komunal adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mencegah luka cedera akibat saling seruduk antar-sapi, mempermudah penanganan ternak, dan menghemat ruang palung pakan"
      },
      {
        "key": "B",
        "text": "Mengurangi berat badan sapi menjadi lebih ringan"
      },
      {
        "key": "C",
        "text": "Menghentikan pertumbuhan bulu sapi selamanya"
      },
      {
        "key": "D",
        "text": "Mengubah sapi jantan menjadi sapi betina"
      },
      {
        "key": "E",
        "text": "Membuat sapi tidak membutuhkan pakan hijauan"
      }
    ],
    "correct": "A",
    "explanation": "Kauterisasi kuncup tanduk (debudding) secara higienis pada pedet muda menghilangkan bahaya trauma luka tanduk pada ternak lain dan peternak, menurunkan agresivitas saat makan bersama di palung pakan."
  },
  {
    "id": 171,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Untuk mengantisipasi kelangkaan rumput hijauan segar di musim kemarau, peternak sapi di Belitang menerapkan rekayasa pembuatan silase rumput odot dalam drum plastik kedap udara (silo). Kondisi anaerobik mutlak dan penambahan molase diperlukan agar...",
    "options": [
      {
        "key": "A",
        "text": "Bakteri Asam Laktat (BAL) memfermentasi gula menjadi asam laktat, menurunkan pH ke 3.8-4.2 sehingga pakan awet berbulan-bulan tanpa membusuk"
      },
      {
        "key": "B",
        "text": "Jamur pembusuk tumbuh subur menghancurkan pakan"
      },
      {
        "key": "C",
        "text": "Rumput odot berubah menjadi bahan bakar solar"
      },
      {
        "key": "D",
        "text": "Kadar air rumput menguap habis dalam waktu 1 menit"
      },
      {
        "key": "E",
        "text": "Drum plastik meleleh karena reaksi kimia panas"
      }
    ],
    "correct": "A",
    "explanation": "Fermentasi silase anaerobik menstimulasi bakteri Lactobacillus plantarum mengubah karbohidrat terlarut menjadi asam laktat. Asam ini mengawetkan biomassa pakan pada pH asam stabil (3.8-4.2) dan mencegah jamur pembusuk."
  },
  {
    "id": 172,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Limbah jerami padi kering melimpah ruah di Belitang saat panen raya namun memiliki kecernaan rendah (kadar lignin tinggi). Rekayasa biokimia 'Amoniasi Jerami' menggunakan larutan urea (4% bobot jerami) dalam kantong plastik tertutup bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Memutus ikatan lignoselulosa dan lignohemiselulosa pada dinding sel jerami serta meningkatkan kandungan nitrogen (protein kasar setara 8-10%)"
      },
      {
        "key": "B",
        "text": "Membakar jerami menjadi abu pupuk hitam"
      },
      {
        "key": "C",
        "text": "Membuat jerami berubah menjadi biji beras utuh"
      },
      {
        "key": "D",
        "text": "Menghilangkan seluruh aroma jerami agar tidak dimakan sapi"
      },
      {
        "key": "E",
        "text": "Mengeringkan jerami hingga rapuh seperti kerupuk"
      }
    ],
    "correct": "A",
    "explanation": "Gas amonia (NH3) yang terhidrolisis dari urea meregangkan dan merenggangkan ikatan lignoselulosa dinding sel jerami yang keras, melunakkan tekstur jerami, meningkatkan kecernaan rumen, dan mendongkrak protein kasar."
  },
  {
    "id": 173,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Instalasi biodigester kubah beton (fixed dome biogas) dibangun peternak sapi di pedesaan OKU Timur untuk mengolah kotoran feses sapi. Gas utama apa yang dihasilkan oleh bakteri metanogen dalam reaktor anaerobik tersebut dan dapat dimanfaatkan sebagai bahan bakar kompor memasak?",
    "options": [
      {
        "key": "A",
        "text": "Gas Oksigen (O2)"
      },
      {
        "key": "B",
        "text": "Gas Metana (CH4 sekitar 55-65%) dan Karbondioksida (CO2)"
      },
      {
        "key": "C",
        "text": "Gas Karbon Monoksida (CO beracun)"
      },
      {
        "key": "D",
        "text": "Gas Helium pengisi balon udara"
      },
      {
        "key": "E",
        "text": "Gas Klorin pemutih air"
      }
    ],
    "correct": "B",
    "explanation": "Bakteri metanogenik (Methanobacterium) merombak asam asetat dan hidrogen dari feses dalam kondisi anaerob menghasilkan biogas yang didominasi gas metana (CH4 60%) yang memiliki nilai kalor tinggi untuk bahan bakar api biru."
  },
  {
    "id": 174,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Produk sampingan berupa lumpur keluaran dari instalasi biodigester biogas (bio-slurry) memiliki nilai guna agronomis tinggi bagi petani OKU Timur karena...",
    "options": [
      {
        "key": "A",
        "text": "Merupakan pupuk organik cair dan padat berkualitas prima yang kaya hara makro (NPK), bebas patogen penyakit, dan tidak berbau menyengat untuk memupuk sawah dan sayuran"
      },
      {
        "key": "B",
        "text": "Merupakan racun berbahaya yang harus ditimbun di bawah semen"
      },
      {
        "key": "C",
        "text": "Hanya dapat dibuang ke dalam saluran irigasi primer"
      },
      {
        "key": "D",
        "text": "Dapat mengeras menjadi bahan pembuat semen cor"
      },
      {
        "key": "E",
        "text": "Mengandung zat asam sulfat pekat yang mematikan tanaman"
      }
    ],
    "correct": "A",
    "explanation": "Bio-slurry (lumpur biogas) telah terfermentasi sempurna sehingga bebas biji gulma dan bakteri fekal patogen, kaya asam amino dan unsur N-P-K terlarut yang sangat siap diserap perakaran tanaman sawah."
  },
  {
    "id": 175,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Rancangan lantai kandang ternak (sapi dan kambing) yang ideal di Belitang dibuat dengan kemiringan lereng 2° hingga 3° (kemiringan 2-3 cm per 1 meter panjang lantai) ke arah parit pembuangan belakang. Apa fungsi rekayasa sipil kandang ini?",
    "options": [
      {
        "key": "A",
        "text": "Memastikan air kencing (urin) dan air pencucian kandang mengalir gravitasi secara cepat ke saluran pembuangan, menjaga lantai tempat sapi tidur tetap kering dan bersih"
      },
      {
        "key": "B",
        "text": "Membuat sapi terpeleset dan jatuh ke parit"
      },
      {
        "key": "C",
        "text": "Mencegah sapi berdiri tegak saat malam hari"
      },
      {
        "key": "D",
        "text": "Agar palung pakan sapi terendam air kencing"
      },
      {
        "key": "E",
        "text": "Hanya variasi estetika tukang bangunan tanpa fungsi sanitasi"
      }
    ],
    "correct": "A",
    "explanation": "Kemiringan lantai kandang 2-3% menjamin drainase urin dan air feses bekerja gravitasi dengan sempurna, mencegah lantai becek berbau yang memicu kuku busuk (foot rot) dan menjaga kenyamanan istirahat ternak."
  },
  {
    "id": 176,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Palung pakan (manger) sapi yang dirancang dengan bibir pembatas depan lebih tinggi 40-50 cm dari dasar lantai tempat berdiri sapi dan dinding melengkung memiliki tujuan ergonomis...",
    "options": [
      {
        "key": "A",
        "text": "Mencegah rumput cacahan terlempar tercecer ke lantai terinjak kaki sapi dan memudahkan pembersihan sisa pakan"
      },
      {
        "key": "B",
        "text": "Menghalangi kepala sapi agar tidak bisa menjangkau pakan"
      },
      {
        "key": "C",
        "text": "Tempat sapi meletakkan kakinya saat makan"
      },
      {
        "key": "D",
        "text": "Menampung air hujan dari atap kandang"
      },
      {
        "key": "E",
        "text": "Mencegah peternak memberi pakan konsentrat"
      }
    ],
    "correct": "A",
    "explanation": "Desain palung pakan semi-cekung dengan bibir pembatas proporsional menahan rumput cacahan agar tidak tercecer keluar oleh kibasan moncong sapi, menekan waste pakan hingga <5%."
  },
  {
    "id": 177,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 7,
    "question": "Orientasi membujur bangunan kandang ternak (sapi, kambing, maupun unggas) yang benar di daerah beriklim tropis seperti OKU Timur adalah menghadap ke arah Barat - Timur. Alasan rekayasa termal arsitektur kandang ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meminimalkan paparan radiasi panas langsung sinar matahari siang terik ke dalam badan kandang, sekaligus memungkinkan sinar matahari pagi masuk untuk membunuh kuman lantai"
      },
      {
        "key": "B",
        "text": "Mengikuti arah tiupan angin badai topan"
      },
      {
        "key": "C",
        "text": "Membuat kandang menjadi gelap gulita sepanjang hari"
      },
      {
        "key": "D",
        "text": "Agar atap kandang cepat berkarat"
      },
      {
        "key": "E",
        "text": "Hanya sebagai adat kebiasaan warga tanpa pengaruh mikroklimat"
      }
    ],
    "correct": "A",
    "explanation": "Sumbu memanjang Timur-Barat membatasi bidang atap dan dinding kandang yang terpapar sinar matahari terik zenith (siang hari), menjaga kandang tetap sejuk dan mencegah stres panas (heat stress) pada sapi."
  },
  {
    "id": 178,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 8,
    "question": "Untuk mengatasi bau kotoran kandang ayam broiler yang mengganggu pemukiman di pedesaan, peternak mencampurkan serbuk gergaji/sekam padi dengan kultur probiotik bakteri dekomposer (seperti EM4 peternakan) pada alas sekam (litter). Apa fungsi rekayasa biokimia litter tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Bakteri probiotik mengurai asam urat feses secara aerobik sehingga konversi menjadi gas amonia berbau menyengat terhambat dan litter tetap kering"
      },
      {
        "key": "B",
        "text": "Membuat kotoran ayam berubah menjadi serbuk emas"
      },
      {
        "key": "C",
        "text": "Membuat ayam berhenti buang kotoran"
      },
      {
        "key": "D",
        "text": "Membakar sekam menjadi bara api pemanas"
      },
      {
        "key": "E",
        "text": "Menimbulkan uap parfum sintetis dari kotoran"
      }
    ],
    "correct": "A",
    "explanation": "Probiotik fermentatif mengasimilasi nitrogen feses dan menurunkan aktivitas enzim urease yang merombak asam urat menjadi gas amonia, menekan bau busuk kandang hingga 80% dan mencegah penyakit pernapasan unggas (CRD)."
  },
  {
    "id": 179,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 9,
    "question": "Penyekatan kandang jepit (crush chute / handling crate) berbahan pipa besi galvanis kokoh dirancang peternak sapi dan ruminansia di Belitang. Fungsi utama fasilitas kandang jepit ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengunci pergerakan tubuh sapi secara aman tanpa melukai ternak saat pelaksanaan Inseminasi Buatan, vaksinasi, pemasangan eartag, dan pemeriksaan kebuntingan"
      },
      {
        "key": "B",
        "text": "Menjepit sapi hingga kurus dan tidak bisa makan"
      },
      {
        "key": "C",
        "text": "Tempat memotong daging sapi menjadi kemasan kaleng"
      },
      {
        "key": "D",
        "text": "Menghukum sapi yang tidak mau memakan rumput odot"
      },
      {
        "key": "E",
        "text": "Menahan sapi agar tidak bisa tidur selama pemeliharaan"
      }
    ],
    "correct": "A",
    "explanation": "Kandang jepit dengan pintu pengunci leher (head bail) memfiksasi posisi tubuh sapi dengan aman dan tenang, melindungi petugas medis hewan dari tendangan/serudukan sapi saat tindakan rektal IB atau vaksinasi."
  },
  {
    "id": 180,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "C",
    "indicatorKey": "pilar_engineering",
    "indicatorName": "Pilar Engineering (Rekayasa Solusi Praktis & Penanganan Kendala Lapangan)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 10,
    "question": "Dalam penampungan air minum ternak (sapi dan kambing), pemasangan bak air otomatis berpengapung pelampung (automatic float waterer) memastikan ketersediaan air minum secara 'ad libitum' (tak terbatas). Mengapa air minum ternak wajib ad libitum?",
    "options": [
      {
        "key": "A",
        "text": "Sapi membutuhkan 40-60 liter air per hari untuk proses metabolisme rumen, produksi saliva pencernaan, dan pembentukan jaringan daging; kekurangan air langsung menurunkan konsumsi pakan"
      },
      {
        "key": "B",
        "text": "Agar perut sapi membesar terisi air tanpa perlu makan rumput"
      },
      {
        "key": "C",
        "text": "Untuk mendinginkan tubuh sapi agar tidak berkeringat"
      },
      {
        "key": "D",
        "text": "Membuat sapi buang air kecil setiap 5 menit sekali"
      },
      {
        "key": "E",
        "text": "Air minum hanya pelengkap yang tidak wajib disediakan setiap hari"
      }
    ],
    "correct": "A",
    "explanation": "Air adalah 60-70% komponen tubuh ternak dan medium fermentasi rumen. Akses air bersih ad-libitum (sepanjang waktu) via katup pelampung menjaga efisiensi metabolisme ransum dan mencegah dehidrasi."
  },
  {
    "id": 181,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 1,
    "question": "Pak Sugeng membeli seekor sapi bakalan jantan peranakan Simmental seberat 300 kg seharga Rp 14.000.000. Setelah dipelihara selama 180 hari (6 bulan), bobot sapi mencapai 480 kg saat dijual menjelang Idul Adha. Berapakah Pertambahan Bobot Badan Harian (Average Daily Gain / ADG) sapi Pak Sugeng?",
    "options": [
      {
        "key": "A",
        "text": "ADG = 0,50 kg / hari"
      },
      {
        "key": "B",
        "text": "ADG = 1,00 kg / hari"
      },
      {
        "key": "C",
        "text": "ADG = 1,80 kg / hari"
      },
      {
        "key": "D",
        "text": "ADG = 2,50 kg / hari"
      },
      {
        "key": "E",
        "text": "ADG = 0,30 kg / hari"
      }
    ],
    "correct": "B",
    "explanation": "Pertambahan total bobot = 480 kg - 300 kg = 180 kg. Durasi pemeliharaan = 180 hari. ADG = 180 kg / 180 hari = 1,00 kg per hari (pencapaian penggemukan unggul)."
  },
  {
    "id": 182,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 2,
    "question": "Sapi seberat 480 kg tersebut laku terjual sebagai hewan kurban dengan harga Rp 55.000 per kg bobot hidup. Berapakah total pendapatan kotor yang diterima Pak Sugeng dari penjualan sapi tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 21.000.000"
      },
      {
        "key": "B",
        "text": "Rp 26.400.000"
      },
      {
        "key": "C",
        "text": "Rp 24.000.000"
      },
      {
        "key": "D",
        "text": "Rp 28.500.000"
      },
      {
        "key": "E",
        "text": "Rp 32.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Pendapatan Kotor = Bobot Sapi (kg) × Harga per kg = 480 kg × Rp 55.000/kg = Rp 26.400.000."
  },
  {
    "id": 183,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Total rincian biaya modal pengeluaran Pak Sugeng selama 180 hari: harga beli bakalan Rp 14.000.000, konsentrat dedak & ampas tahu Rp 4.500.000, pakan hijauan & silase jerami Rp 1.800.000, vitamin, obat cacing & vaksin Rp 400.000, dan upah tenaga rawat Rp 1.200.000. Berapakah total modal pengeluaran Pak Sugeng?",
    "options": [
      {
        "key": "A",
        "text": "Rp 18.500.000"
      },
      {
        "key": "B",
        "text": "Rp 21.900.000"
      },
      {
        "key": "C",
        "text": "Rp 24.200.000"
      },
      {
        "key": "D",
        "text": "Rp 20.000.000"
      },
      {
        "key": "E",
        "text": "Rp 26.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Total Modal Pengeluaran = 14.000.000 + 4.500.000 + 1.800.000 + 400.000 + 1.200.000 = Rp 21.900.000."
  },
  {
    "id": 184,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 4,
    "question": "Berdasarkan data soal nomor 182 dan 183 (Pendapatan Kotor Rp 26.400.000 dan Total Modal Rp 21.900.000), berapakah laba bersih yang diperoleh Pak Sugeng dari seekor sapi kurban tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 4.500.000"
      },
      {
        "key": "B",
        "text": "Rp 6.400.000"
      },
      {
        "key": "C",
        "text": "Rp 5.200.000"
      },
      {
        "key": "D",
        "text": "Rp 7.500.000"
      },
      {
        "key": "E",
        "text": "Rp 8.000.000"
      }
    ],
    "correct": "A",
    "explanation": "Laba Bersih = Pendapatan Kotor - Total Modal = Rp 26.400.000 - Rp 21.900.000 = Rp 4.500.000 per ekor sapi."
  },
  {
    "id": 185,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 5,
    "question": "Jika Pak Sugeng memelihara 5 ekor sapi dengan performa dan perhitungan biaya yang sama persis, berapa total keuntungan bersih yang dikantongi Pak Sugeng dalam waktu 6 bulan pemeliharaan?",
    "options": [
      {
        "key": "A",
        "text": "Rp 15.000.000"
      },
      {
        "key": "B",
        "text": "Rp 22.500.000"
      },
      {
        "key": "C",
        "text": "Rp 20.000.000"
      },
      {
        "key": "D",
        "text": "Rp 32.500.000"
      },
      {
        "key": "E",
        "text": "Rp 25.000.000"
      }
    ],
    "correct": "B",
    "explanation": "Total Keuntungan Bersih (5 ekor) = 5 ekor × Rp 4.500.000 = Rp 22.500.000."
  },
  {
    "id": 186,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 6,
    "question": "Biaya pakan per penambahan bobot (Feed Cost per Kilogram Gain) mengukur biaya pakan yang dikeluarkan untuk menaikkan 1 kg bobot badan sapi. Jika total biaya pakan selama 180 hari adalah Rp 6.300.000 dan penambahan bobot sapi adalah 180 kg, berapakah Feed Cost per kg gain sapi tersebut?",
    "options": [
      {
        "key": "A",
        "text": "Rp 25.000 per kg"
      },
      {
        "key": "B",
        "text": "Rp 35.000 per kg"
      },
      {
        "key": "C",
        "text": "Rp 45.000 per kg"
      },
      {
        "key": "D",
        "text": "Rp 55.000 per kg"
      },
      {
        "key": "E",
        "text": "Rp 18.000 per kg"
      }
    ],
    "correct": "B",
    "explanation": "Feed Cost per kg Gain = Total Biaya Pakan / Penambahan Bobot = Rp 6.300.000 / 180 kg = Rp 35.000/kg. Karena harga jual daging hidup Rp 55.000/kg, peternak untung Rp 20.000 dari setiap kilogram daging yang ditambahkan."
  },
  {
    "id": 187,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Seorang peternak ayam pedaging (broiler) memelihara 1.000 ekor ayam selama 35 hari. Total pakan yang dihabiskan adalah 3.200 kg dan menghasilkan total berat panen ayam hidup sebesar 2.000 kg. Berapakah nilai FCR ayam broiler tersebut?",
    "options": [
      {
        "key": "A",
        "text": "FCR = 1,20"
      },
      {
        "key": "B",
        "text": "FCR = 1,60"
      },
      {
        "key": "C",
        "text": "FCR = 2,10"
      },
      {
        "key": "D",
        "text": "FCR = 1,85"
      },
      {
        "key": "E",
        "text": "FCR = 0,95"
      }
    ],
    "correct": "B",
    "explanation": "FCR Broiler = Total Pakan / Total Bobot Panen = 3.200 kg / 2.000 kg = 1,60 (standar efisiensi prima ayam pedaging komersial)."
  },
  {
    "id": 188,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Dalam usaha pemotongan sapi di RPH Belitang, seekor sapi jantan seberat 450 kg menghasilkan karkas daging dan tulang sebesar 52% dari bobot hidup. Berapakah berat karkas yang diperoleh dari sapi tersebut?",
    "options": [
      {
        "key": "A",
        "text": "180 kg"
      },
      {
        "key": "B",
        "text": "234 kg"
      },
      {
        "key": "C",
        "text": "285 kg"
      },
      {
        "key": "D",
        "text": "310 kg"
      },
      {
        "key": "E",
        "text": "200 kg"
      }
    ],
    "correct": "B",
    "explanation": "Persentase karkas 52%: Berat Karkas = 450 kg × 52% = 234 kg karkas daging-tulang."
  },
  {
    "id": 189,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 9,
    "question": "Biaya jasa mantri inseminator untuk kawin suntik (Inseminasi Buatan) sapi di OKU Timur adalah Rp 100.000 per kali suntik. Jika seekor sapi betina bunting dalam sekali suntik (service per conception / S/C = 1,0), berapa biaya pembuahan yang dikeluarkan peternak?",
    "options": [
      {
        "key": "A",
        "text": "Rp 100.000"
      },
      {
        "key": "B",
        "text": "Rp 300.000"
      },
      {
        "key": "C",
        "text": "Rp 500.000"
      },
      {
        "key": "D",
        "text": "Rp 50.000"
      },
      {
        "key": "E",
        "text": "Gratis bersubsidi total"
      }
    ],
    "correct": "A",
    "explanation": "S/C = 1,0 berarti sapi berhasil bunting hanya dengan 1 kali dosis IB, sehingga biaya perkawinan sangat efisien yaitu tepat Rp 100.000 tanpa perlu suntik ulang."
  },
  {
    "id": 190,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "D",
    "indicatorKey": "pilar_mathematics",
    "indicatorName": "Pilar Mathematics (Kalkulasi Modal, Penjualan, HPP/FCR & Laba Bersih)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Kalkulasi Revenue-Cost Ratio (R/C) penggemukan sapi Pak Sugeng dengan Total Penerimaan Rp 26.400.000 dan Total Biaya Rp 21.900.000 menghasilkan nilai R/C sebesar...",
    "options": [
      {
        "key": "A",
        "text": "R/C = 0,83 (Usaha merugi)"
      },
      {
        "key": "B",
        "text": "R/C = 1,21 (Usaha efisien dan menguntungkan secara finansial karena R/C > 1)"
      },
      {
        "key": "C",
        "text": "R/C = 2,50"
      },
      {
        "key": "D",
        "text": "R/C = 1,00 (Titik impas)"
      },
      {
        "key": "E",
        "text": "R/C tidak dapat dihitung"
      }
    ],
    "correct": "B",
    "explanation": "R/C Ratio = Total Penerimaan / Total Biaya = 26.400.000 / 21.900.000 = 1,205 (dibulatkan 1,21). Setiap Rp 1 modal menghasilkan Rp 1,21 penerimaan, menunjukkan profitabilitas positif."
  },
  {
    "id": 191,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 1,
    "question": "Konsep Sistem Integrasi Tanaman-Ternak (Crop-Livestock Integration System / CLS) berbasis Zero Waste di Belitang menghubungkan secara langsung sawah padi dan kandang sapi. Bagaimana siklus materi hara berputar dalam ekosistem STEM ini?",
    "options": [
      {
        "key": "A",
        "text": "Limbah jerami sawah diolah menjadi pakan silase sapi -> kotoran sapi diolah di biodigester menjadi energi biogas dan pupuk organik bioslurry -> pupuk diaplikasikan kembali menyuburkan sawah padi"
      },
      {
        "key": "B",
        "text": "Sapi memakan gabah yang baru dipanen hingga habis di lumbung"
      },
      {
        "key": "C",
        "text": "Petani membakar kotoran sapi dan membuang jerami ke sungai"
      },
      {
        "key": "D",
        "text": "Sawah dipenuhi kotoran mentah hingga padi mati layu"
      },
      {
        "key": "E",
        "text": "Sapi dilarang diberi makan sisa tanaman pertanian"
      }
    ],
    "correct": "A",
    "explanation": "Sistem bio-siklus tertutup (zero waste CLS) mengubah limbah menjadi sumber daya: jerami padi menjadi pakan serat ternak, dan limbah kotoran sapi diproses menjadi energi biogas ramah lingkungan serta pupuk bioslurry penyubur tanah sawah."
  },
  {
    "id": 192,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 2,
    "question": "Penggunaan semen beku sapi Belgian Blue atau Simmental pada program Inseminasi Buatan di OKU Timur bertujuan menghasilkan pedet silangan berotot ganda (double muscling). Apa dampak ekonomi-matematis bagi peternak rakyat?",
    "options": [
      {
        "key": "A",
        "text": "Pertambahan bobot harian (ADG) meningkat tajam (>1,2-1,5 kg/hari) dan persentase karkas daging naik hingga 60%, sehingga nilai jual hasil peternakan sapi berumur 2 tahun mencapai di atas Rp 30-40 juta"
      },
      {
        "key": "B",
        "text": "Membuat harga jual pedet menjadi anjlok di pasar hewan"
      },
      {
        "key": "C",
        "text": "Mengharuskan sapi diberi pakan roti manis setiap hari"
      },
      {
        "key": "D",
        "text": "Sapi silangan tidak bisa menghasilkan kotoran biogas"
      },
      {
        "key": "E",
        "text": "Sapi menjadi bertubuh kerdil seperti kambing"
      }
    ],
    "correct": "A",
    "explanation": "Genetik sapi unggul eksotis hasil IB melipatgandakan efisiensi konversi pakan menjadi massa otot daging (muscling), mendongkrak ADG dan persentase karkas kualitatif yang bernilai jual sangat tinggi."
  },
  {
    "id": 193,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 3,
    "question": "Pengolahan kotoran puyuh atau ayam (manure) menjadi pakan maggot lalat Black Soldier Fly (BSF / Hermetia illucens) di pedesaan Belitang merupakan penerapan biokonversi STEM. Larva maggot BSF yang dipanen berfungsi sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Pakan sumber protein hewani tinggi (40-45% PK) untuk ikan dan unggas lokal yang menghemat biaya pakan pelet komersial secara signifikan"
      },
      {
        "key": "B",
        "text": "Racun pembasmi hama serangga di sawah"
      },
      {
        "key": "C",
        "text": "Bahan pembuat batu bata bangunan"
      },
      {
        "key": "D",
        "text": "Pewarna buatan minuman sirup"
      },
      {
        "key": "E",
        "text": "Pengganti air minum ternak sapi"
      }
    ],
    "correct": "A",
    "explanation": "Maggot BSF mendegradasi kotoran unggas secara higienis dan cepat, mengonversi limbah bau menjadi biomassa larva berprotein tinggi (42% protein kasar) yang sangat ideal sebagai pakan subtitusi ikan dan ayam."
  },
  {
    "id": 194,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 4,
    "question": "Penerapan biosekuriti 3 zona (zona merah/kotor, zona kuning/peralihan, dan zona hijau/bersih) pada peternakan sapi dan unggas di OKU Timur bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mencegah masuk dan menyebarnya agen penyakit menular (seperti virus PMK dan flu burung) ke dalam kawanan ternak melalui desinfeksi kendaraan, alas kaki, dan isolasi tamu luar"
      },
      {
        "key": "B",
        "text": "Mewajibkan warna dinding kandang dicat tiga warna berbeda"
      },
      {
        "key": "C",
        "text": "Melarang peternak memberi pakan di zona hijau"
      },
      {
        "key": "D",
        "text": "Mengharuskan ternak berpindah kandang setiap 10 menit sekali"
      },
      {
        "key": "E",
        "text": "Membagi jatah pakan sapi berdasarkan warna kulit"
      }
    ],
    "correct": "A",
    "explanation": "Sistem zonasi biosekuriti membatasi transmisi patogen: kendaraan dan tamu disemprot desinfektan di zona merah, pekerja berganti alas kaki/sepatu boot di zona kuning, dan area kandang steril berada di zona hijau."
  },
  {
    "id": 195,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 5,
    "question": "Pembuatan 'Bank Pakan Hijauan' (Fodder Bank) di kawasan kelompok peternak Belitang dengan menanam kebun rumput odot dan pakchong di sepanjang tanggul saluran tersier irigasi bertujuan memecahkan masalah...",
    "options": [
      {
        "key": "A",
        "text": "Krisis pakan saat musim kemarau dan memangkas waktu kerja peternak dalam mencari rumput (ngarit) dari 4 jam menjadi hanya 30 menit per hari"
      },
      {
        "key": "B",
        "text": "Kewajiban peternak menjual tanah sawah miliknya"
      },
      {
        "key": "C",
        "text": "Menyumbat saluran air irigasi dengan rumput"
      },
      {
        "key": "D",
        "text": "Mewajibkan sapi digembalakan di jalan raya"
      },
      {
        "key": "E",
        "text": "Menghilangkan rumput liar di seluruh wilayah Sumatera Selatan"
      }
    ],
    "correct": "A",
    "explanation": "Kebun hijauan terpadu (bank pakan) di lahan marjinal/tanggul irigasi menjamin ketersediaan hijauan berkualitas sepanjang tahun (year-round feed supply) dekat kandang, menghemat drastis tenaga dan waktu ngarit peternak."
  },
  {
    "id": 196,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 6,
    "question": "Penggunaan probiotik bakteri asam laktat dalam air minum ayam broiler (seperti Lactobacillus acidophilus) terbukti mampu menggantikan fungsi Antibiotik Growth Promoter (AGP) yang telah dilarang pemerintah. Keuntungan sains kesehatan pangan dari sistem ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyehatkan mikroflora usus ayam, meningkatkan penyerapan nutrisi, dan menghasilkan daging ayam sehat yang bebas residu kimia antibiotik bagi konsumen"
      },
      {
        "key": "B",
        "text": "Membuat ayam pedaging dapat terbang tinggi ke angkasa"
      },
      {
        "key": "C",
        "text": "Menghilangkan bulu ayam secara otomatis sebelum disembelih"
      },
      {
        "key": "D",
        "text": "Membuat daging ayam terasa pedas secara alami"
      },
      {
        "key": "E",
        "text": "Mengharuskan ayam diberi makan es krim"
      }
    ],
    "correct": "A",
    "explanation": "Probiotik melakukan kompetisi eksklusi (competitive exclusion) melawan patogen Salmonella/E. coli di usus unggas, menjaga vili usus tetap sehat tanpa memicu resistensi antimikroba (AMR) pada manusia pemakan daging."
  },
  {
    "id": 197,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C3",
    "numberInIndicator": 7,
    "question": "Hilirisasi limbah kotoran sapi menjadi pupuk organik butiran granul (bokashi granul) yang dikemas karung 25 kg berlabel oleh kelompok pemuda tani Belitang menciptakan peluang bisnis berupa...",
    "options": [
      {
        "key": "A",
        "text": "Pemberian nilai tambah ekonomi limbah kandang menjadi produk komersial siap pakai yang diminati pekebun sawit dan petani hortikultura"
      },
      {
        "key": "B",
        "text": "Kewajiban membagikan pupuk secara gratis ke luar pulau"
      },
      {
        "key": "C",
        "text": "Penyebab tanah pertanian menjadi beracun"
      },
      {
        "key": "D",
        "text": "Larangan petani menggunakan pupuk kandang"
      },
      {
        "key": "E",
        "text": "Menghentikan produksi gas elpiji nasional"
      }
    ],
    "correct": "A",
    "explanation": "Granulasi pupuk kompos kotoran sapi (bokashi granul) mempermudah aplikasi mekanis di kebun sawit/sayuran, menaikkan harga jual dari Rp 200/kg mentah menjadi Rp 1.500-2.000/kg olahan berlabel."
  },
  {
    "id": 198,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 8,
    "question": "Penerapan sistem kandang koloni baterai vs kandang umbaran (free-range) pada ayam petelur lokal di OKU Timur dianalisis menggunakan matematika efisiensi pakan dan mortalitas. Keunggulan sistem baterai teratur dalam produksi telur komersial adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pencatatan produksi telur per ekor lebih akurat (culling ayam afkir mudah), konsumsi pakan terukur hemat, dan telur tidak kotor terkena kotoran lantai"
      },
      {
        "key": "B",
        "text": "Membuat ayam menghasilkan telur setiap 10 menit sekali"
      },
      {
        "key": "C",
        "text": "Ayam tidak membutuhkan sinar matahari dan udara"
      },
      {
        "key": "D",
        "text": "Mengharuskan ayam bertelur di luar kandang"
      },
      {
        "key": "E",
        "text": "Menghilangkan kebutuhan vaksinasi ayam"
      }
    ],
    "correct": "A",
    "explanation": "Kandang baterai individu/sekat memfasilitasi seleksi matematis ayam afkir (kurang produktif), mencegah telur terinjak/kanibalisme telur, dan membatasi pemborosan energi kinetik ayam sehingga pakan terkonversi maksimal ke telur."
  },
  {
    "id": 199,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 9,
    "question": "Pembentukan Koperasi Peternak Rakyat (Sapi, Kambing & Unggas) di OKU Timur yang terhubung dengan lembaga perbankan mikro / program KUR Peternakan memecahkan kendala permodalan pengadaan bibit dan pakan melalui...",
    "options": [
      {
        "key": "A",
        "text": "Penyediaan akses pembiayaan berbunga rendah dengan jaminan ternak dan asuransi sapi (AUTS / Asuransi Usaha Ternak Sapi) dari risiko kematian penyakit"
      },
      {
        "key": "B",
        "text": "Kewajiban peternak menyerahkan seluruh sapinya tanpa imbalan"
      },
      {
        "key": "C",
        "text": "Pemberian pinjaman uang palsu"
      },
      {
        "key": "D",
        "text": "Larangan peternak menjual sapi saat hari raya qurban"
      },
      {
        "key": "E",
        "text": "Penyitaan kandang sapi milik warga desa"
      }
    ],
    "correct": "A",
    "explanation": "Skema KUR Klaster Peternakan dipadukan asuransi AUTS memproteksi modal peternak dari risiko kematian ternak akibat PMK/bisa racun, membuka akses pembiayaan skala 5-10 ekor bakalan penggemukan per keluarga."
  },
  {
    "id": 200,
    "day": 3,
    "sector": "peternakan",
    "indicatorCode": "E",
    "indicatorKey": "sintesis_stem_terpadu",
    "indicatorName": "Sintesis Solusi STEM Terpadu (Inovasi & Keberlanjutan Sektor Unggulan OKU Timur)",
    "cognitiveLevel": "C4",
    "numberInIndicator": 10,
    "question": "Visi OKU Timur sebagai lumbung pangan dan sentra protein hewani berkelanjutan menuntut lulusan generasi muda SMAN 1 Belitang menguasai 4 pilar STEM dalam dunia peternakan modern. Kombinasi pilar manakah yang paling menjamin kemandirian peternak masa depan?",
    "options": [
      {
        "key": "A",
        "text": "Sains fisiologi nutrisi & IB + Teknologi chopper & milking/grading + Rekayasa silase pakan & biodigester biogas + Matematika kalkulasi ADG, FCR & margin laba kurban"
      },
      {
        "key": "B",
        "text": "Menghentikan peternakan sapi dan menggantinya dengan ternak dinosaurus"
      },
      {
        "key": "C",
        "text": "Menyerahkan seluruh hewan ternak ke negara asing"
      },
      {
        "key": "D",
        "text": "Hanya mengandalkan rumput liar pinggir jalan tanpa pencatatan bobot timbangan"
      },
      {
        "key": "E",
        "text": "Membakar kandang sapi saat terjadi wabah penyakit"
      }
    ],
    "correct": "A",
    "explanation": "Masa depan peternakan mandiri bertumpu pada generasi melek STEM: menguasai sains biologi dan bioteknologi reproduksi IB, memanfaatkan teknologi alsintan peternakan, menerapkan rekayasa pakan awet dan energi biogas, serta menguasai akuntansi kalkulasi finansial bisnis ternak."
  }
]
  };

  /**
   * Helper: Mengambil bank soal berdasarkan day
   */
  window.NFT_BANK_SOAL_INDICATORS_DAY4 = [
  {
    "code": "A",
    "key": "eksplorasi_peralatan_apd",
    "name": "Eksplorasi Peralatan, Perlengkapan Kerja & APD Sektor Pilihan",
    "desc": "Identifikasi fungsi peralatan utama, perkakas pendukung, dan Alat Pelindung Diri (APD) pada sektor unggulan OKU Timur."
  },
  {
    "code": "B",
    "key": "analisis_science_alat",
    "name": "Analisis Science: Prinsip Fisika, Kimia & Biologi pada Peralatan",
    "desc": "Prinsip tekanan permukaan, mekanika fluida, gaya sentrifugal, reaksi kimia, dan biologi pada cara kerja peralatan."
  },
  {
    "code": "C",
    "key": "analisis_technology_alat",
    "name": "Analisis Technology: Sistem Penggerak, Material & Sensor Alat",
    "desc": "Mesin penggerak diesel/bensin/listrik, sistem transmisi, metalurgi material baja/aluminium, dan instrumentasi digital."
  },
  {
    "code": "D",
    "key": "analisis_engineering_alat",
    "name": "Analisis Engineering: Rancang Bangun Mekanis, Ergonomi & Perawatan",
    "desc": "Geometri sudut mata pisau/bajak/kincir, konstruksi mekanis, desain ergonomi operator, dan pemeliharaan teknis alat."
  },
  {
    "code": "E",
    "key": "analisis_mathematics_alat",
    "name": "Analisis Mathematics: Kalkulasi Kapasitas Kerja, Energi & Efisiensi Biaya",
    "desc": "Perhitungan kapasitas kerja per jam/hektar, konsumsi BBM/listrik, penurunan susut panen, dan efisiensi biaya operasional."
  }
];

  window.NFT_BANK_SOAL_INDICATORS_DAY5 = [
  {
    "code": "A",
    "key": "video_science_observasi",
    "name": "Analisis Video Science: Prinsip Fisika, Kimia & Biologi pada Sektor Pilihan",
    "desc": "Pemahaman ilmiah proses biologi, kimia, dan fisika pada objek serta peralatan kerja yang ditampilkan dalam video observasi."
  },
  {
    "code": "B",
    "key": "video_technology_exploration",
    "name": "Analisis Video Technology & Exploration: Peralatan Kerja, Mesin & Digitalisasi",
    "desc": "Identifikasi fungsi peralatan, mesin mekanisasi, perangkat transaksi/ukur digital, dan APD keselamatan kerja di lapangan."
  },
  {
    "code": "C",
    "key": "video_engineering_rekayasa",
    "name": "Analisis Video Engineering: Rancang Bangun, Tata Ruang & Rekayasa Teknis",
    "desc": "Evaluasi desain konstruksi, tata letak operasional, rekayasa alat, serta pemecahan masalah teknis di lapangan."
  },
  {
    "code": "D",
    "key": "video_mathematics_kalkulasi",
    "name": "Analisis Video Mathematics: Kalkulasi Ukuran, Kapasitas & Produktivitas",
    "desc": "Perhitungan matematis dimensi lahan/wadah, takaran input, kapasitas kerja per jam, dan produktivitas hasil usaha."
  },
  {
    "code": "E",
    "key": "video_culture_sintesis",
    "name": "Pilar Culture & Alur Penyajian Video Observasi STEM Mandiri",
    "desc": "Nilai etos kerja, kearifan budaya lokal OKU Timur, serta ketepatan urutan penyajian video observasi STEM berdurasi 5–10 menit."
  }
];

  window.NFT_BANK_SOAL_INDICATORS_DAY6 = [
  {
    "code": "A",
    "key": "video_fin_modal_biaya",
    "name": "Analisis Video Financial: Struktur Modal Awal, Biaya Tetap & Biaya Operasional",
    "desc": "Perhitungan kebutuhan modal investasi, biaya variabel bahan baku/pakan/stok, serta efisiensi pengeluaran usaha."
  },
  {
    "code": "B",
    "key": "video_fin_hpp_omzet_laba",
    "name": "Analisis Video Financial: Kalkulasi HPP, Harga Jual, Omzet & Laba Bersih",
    "desc": "Penentuan Harga Pokok Produksi/Penjualan (HPP), margin keuntungan, fee layanan, R/C ratio, dan laba bersih bulanan."
  },
  {
    "code": "C",
    "key": "video_evaluasi_kendala_risiko",
    "name": "Evaluasi Kendala Teknis, Risiko Usaha & Keamanan Operasional",
    "desc": "Diagnosis kendala lapangan, risiko fluktuasi harga/cuaca/penyakit, pencegahan kerugian/uang palsu, dan mitigasi risiko."
  },
  {
    "code": "D",
    "key": "video_solusi_inovasi_fincestem",
    "name": "Gagasan Solusi & Inovasi Nilai Tambah Berbasis STEM + Finansial",
    "desc": "Perumusan solusi kreatif pengolahan limbah (zero-waste), hilirisasi kemasan produk, serta digitalisasi pembayaran/pembukuan."
  },
  {
    "code": "E",
    "key": "video_kelayakan_keberlanjutan",
    "name": "Sintesis Kelayakan Bisnis & Pengembangan Ekonomi Lokal OKU Timur",
    "desc": "Integrasi 4 pilar FINCESTEM dalam membangun kemandirian usaha masyarakat di Kabupaten OKU Timur."
  }
];

  window.NFT_BANK_SOAL_INDICATORS_DAY7 = [
  {
    "code": "A",
    "key": "sintesis_pilar_financial",
    "name": "Evaluasi Komprehensif Pilar Financial & Rekonsiliasi Kas Riset",
    "desc": "Audit anggaran riset mandiri, perhitungan laba-rugi usaha, inklusi keuangan, dan manajemen kas."
  },
  {
    "code": "B",
    "key": "sintesis_pilar_culture",
    "name": "Evaluasi Komprehensif Pilar Culture & Etos Kerja Multikultural",
    "desc": "Harmoni sosial budaya Komering dan transmigran, etika pelayanan, serta gotong royong ekonomi desa."
  },
  {
    "code": "C",
    "key": "sintesis_pilar_exploration",
    "name": "Evaluasi Komprehensif Pilar Exploration, Geospasial & Peralatan",
    "desc": "Pemetaan potensi wilayah OKU Timur, jaringan irigasi, serta eksplorasi peralatan dan keselamatan kerja."
  },
  {
    "code": "D",
    "key": "sintesis_pilar_stem",
    "name": "Evaluasi Komprehensif 4 Dimensi STEM (Sains, Teknologi, Rekayasa, Matematika)",
    "desc": "Penerapan terpadu Science, Technology, Engineering, dan Mathematics pada 7 sektor ekonomi lokal."
  },
  {
    "code": "E",
    "key": "portofolio_video_dokumenter",
    "name": "Karya Portofolio Video YouTube & Solusi Inovasi Berkelanjutan",
    "desc": "Standar penyajian karya video observasi-analisis YouTube dan rekomendasi inovasi bagi kemajuan OKU Timur."
  }
];

  // Bank Soal Tambahan Khusus Sektor Non-Agrikultur (Perdagangan/UMKM, Koperasi/BRI-Link, Jasa Teknik/Kerajinan)
  // untuk melengkapi pilihan 7 sektor di Day 5 dan Day 6
  const EXTRA_SECTOR_QUESTIONS_D56 = [
    // --- SEKTOR PERDAGANGAN / TOKO / UMKM KULINER (12 SOAL) ---
    {
      id: 5001, day: 5, sector: 'perdagangan', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Dalam video observasi STEM pada usaha toko sembako dan UMKM kuliner, penyimpanan bahan pangan segar di dalam lemari pendingin (chiller) bersuhu 2°C hingga 4°C menerapkan prinsip Sains berupa...',
      options: [
        { key: 'A', text: 'Menghambat aktivitas enzim dan laju pembelahan bakteri pembusuk secara termodinamika' },
        { key: 'B', text: 'Mengubah kandungan air di dalam makanan menjadi lemak jenuh secara permanen' },
        { key: 'C', text: 'Menghilangkan seluruh massa karbohidrat dan protein dari bahan makanan' },
        { key: 'D', text: 'Mempercepat proses fermentasi pembusukan oleh jamur udara terbuka' },
        { key: 'E', text: 'Menaikkan suhu titik didih minyak goreng di dalam kemasan plastik' }
      ],
      correct: 'A',
      explanation: 'Suhu dingin (0–4°C) memperlambat metabolisme mikroorganisme patogen dan reaksi enzimatik sehingga kesegaran pangan bertahan lebih lama.'
    },
    {
      id: 5002, day: 5, sector: 'perdagangan', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Produk UMKM kerupuk kemplang dan rengginang khas OKU Timur wajib dikemas rapat menggunakan plastik tebal kedap udara. Secara kimia pangan, tujuan utama penutupan rapat tersebut adalah...',
      options: [
        { key: 'A', text: 'Mencegah penyerapan uap air udara (higroskopis) dan oksidasi minyak penyebab bau tengik' },
        { key: 'B', text: 'Menambah berat timbangan kerupuk melalui penguapan udara panas matahari' },
        { key: 'C', text: 'Mengubah warna kerupuk menjadi gelap akibat pantulan cahaya lampu toko' },
        { key: 'D', text: 'Mempercepat pelunakan tekstur kerupuk sebelum dibeli oleh konsumen' },
        { key: 'E', text: 'Menurunkan kandungan kalsium dan protein ikan pada adonan kerupuk' }
      ],
      correct: 'A',
      explanation: 'Paparan oksigen dan uap air memicu reaksi oksidasi lipid (ketengikan) serta menurunkan kerenyahan produk kering.'
    },
    {
      id: 5003, day: 5, sector: 'perdagangan', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Saat menyorot peralatan toko pada segmen Exploration video Day 5, penggunaan timbangan digital meja bekerja menggunakan komponen sensor teknologi yang disebut...',
      options: [
        { key: 'A', text: 'Sensor Load Cell yang mengubah gaya tekan beban barang menjadi sinyal listrik digital' },
        { key: 'B', text: 'Tabung kapiler raksa yang memuai karena perubahan suhu ruangan toko' },
        { key: 'C', text: 'Bandul batu timbangan kuningan yang digeser secara manual pada lengan besi' },
        { key: 'D', text: 'Turbin angin mini yang berputar mengikuti hembusan kipas angin etalase' },
        { key: 'E', text: 'Kertas lakmus indikator yang berubah warna saat terkena bungkus plastik' }
      ],
      correct: 'A',
      explanation: 'Timbangan elektronik modern menggunakan strain gauge load cell untuk mengukur massa barang secara presisi hingga satuan gram.'
    },
    {
      id: 5004, day: 5, sector: 'perdagangan', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Alat Impulse Heat Sealer yang digunakan pelaku UMKM kuliner di Belitang untuk merekatkan ujung kantong plastik kemasan bekerja dengan prinsip teknologi...',
      options: [
        { key: 'A', text: 'Konversi energi listrik menjadi impuls panas sesaat pada pita elemen nikelin untuk melelehkan dan menyatukan polimer plastik' },
        { key: 'B', text: 'Penyemprotan cairan lem kayu secara otomatis di sepanjang mulut kantong kemasan' },
        { key: 'C', text: 'Pendinginan ekstrem menggunakan gas nitrogen cair untuk membekukan plastik' },
        { key: 'D', text: 'Penjahitan benang nilon secara mekanis menggunakan jarum berkecepatan tinggi' },
        { key: 'E', text: 'Pemotongan plastik menggunakan gelombang suara ultrasonik tanpa daya listrik' }
      ],
      correct: 'A',
      explanation: 'Impulse sealer mengalirkan arus listrik singkat ke kawat pemanas nikelin sehingga lapisan plastik meleleh sesaat dan menyatu kedap udara.'
    },
    {
      id: 5005, day: 5, sector: 'perdagangan', indicatorCode: 'C', cognitiveLevel: 'C4',
      question: 'Dalam rekayasa tata letak (Layout Engineering) barang di rak toko sembako, penerapan metode FIFO (First In First Out) dilakukan dengan cara...',
      options: [
        { key: 'A', text: 'Meletakkan stok barang yang masuk lebih awal di barisan paling depan agar terjual lebih dulu sebelum mendekati masa kedaluwarsa' },
        { key: 'B', text: 'Menyimpan barang lama di gudang terkunci sampai seluruh barang baru habis terjual' },
        { key: 'C', text: 'Mencampur barang pangan dengan bahan kimia deterjen di dalam satu wadah terbuka' },
        { key: 'D', text: 'Menumpuk barang berukuran paling berat di atas barang kemasan kaca yang rapuh' },
        { key: 'E', text: 'Menjual barang yang baru datang dengan harga dua kali lipat dari barang lama' }
      ],
      correct: 'A',
      explanation: 'Rekayasa display FIFO memastikan rotasi stok berjalan sehat sehingga meminimalkan kerugian akibat produk kedaluwarsa (expired).'
    },
    {
      id: 5006, day: 5, sector: 'perdagangan', indicatorCode: 'C', cognitiveLevel: 'C3',
      question: 'Desain etalase kaca tertutup pada warung kuliner dan pemakaian penjepit makanan (food tongs) merupakan rekayasa higienitas yang berfungsi untuk...',
      options: [
        { key: 'A', text: 'Melindungi makanan matang dari kontaminasi silang debu jalanan, lalat vektor penyakit, dan bakteri tangan' },
        { key: 'B', text: 'Menyembunyikan makanan agar tidak terlihat oleh pembeli yang lewat di depan warung' },
        { key: 'C', text: 'Membuat porsi makanan terlihat dua kali lebih besar karena efek cermin cekung' },
        { key: 'D', text: 'Mengurangi berat bersih makanan agar pedagang memperoleh keuntungan ganda' },
        { key: 'E', text: 'Menggantikan fungsi kompor gas dalam memasak bahan makanan mentah' }
      ],
      correct: 'A',
      explanation: 'Rekayasa pelindung fisik etalase dan alat penjepit mencegah paparan patogen lingkungan pada makanan siap saji.'
    },
    {
      id: 5007, day: 6, sector: 'perdagangan', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Seorang pedagang toko sembako membeli 1 karung gula pasir (50 kg) seharga Rp750.000 dan plastik kemasannya Rp25.000. Jika gula tersebut dikemas ukuran 1 kg dan dijual Rp17.500 per kg, berapakah laba bersih yang diperoleh dari 1 karung tersebut?',
      options: [
        { key: 'A', text: 'Rp100.000 laba bersih per karung' },
        { key: 'B', text: 'Rp125.000 laba bersih per karung' },
        { key: 'C', text: 'Rp75.000 laba bersih per karung' },
        { key: 'D', text: 'Rp150.000 laba bersih per karung' },
        { key: 'E', text: 'Rp50.000 laba bersih per karung' }
      ],
      correct: 'A',
      explanation: 'Total Modal = Rp750.000 + Rp25.000 = Rp775.000. Total Penjualan = 50 kg x Rp17.500 = Rp875.000. Laba Bersih = Rp875.000 - Rp775.000 = Rp100.000.'
    },
    {
      id: 5008, day: 6, sector: 'perdagangan', indicatorCode: 'B', cognitiveLevel: 'C4',
      question: 'Sebuah UMKM kuliner memproduksi 100 bungkus keripik pisang per hari dengan biaya bahan baku dan kemasan Rp8.000 per bungkus serta biaya operasional harian tetap Rp100.000. Jika harga jual ditetapkan Rp12.000 per bungkus dan terjual habis, berapakah keuntungan bersih hariannya?',
      options: [
        { key: 'A', text: 'Rp300.000 keuntungan bersih per hari' },
        { key: 'B', text: 'Rp400.000 keuntungan bersih per hari' },
        { key: 'C', text: 'Rp200.000 keuntungan bersih per hari' },
        { key: 'D', text: 'Rp500.000 keuntungan bersih per hari' },
        { key: 'E', text: 'Rp150.000 keuntungan bersih per hari' }
      ],
      correct: 'A',
      explanation: 'Total Biaya = (100 x Rp8.000) + Rp100.000 = Rp900.000. Total Omzet = 100 x Rp12.000 = Rp1.200.000. Laba Bersih = Rp1.200.000 - Rp900.000 = Rp300.000.'
    },
    {
      id: 5009, day: 6, sector: 'perdagangan', indicatorCode: 'C', cognitiveLevel: 'C4',
      question: 'Dalam video analisis Day 6 pada sektor perdagangan/warung, salah satu kesalahan manajemen keuangan paling fatal yang sering membuat modal kulakan pedagang habis tanpa disadari adalah...',
      options: [
        { key: 'A', text: 'Mencampuradukkan uang kas perputaran modal toko dengan pengeluaran konsumsi pribadi rumah tangga tanpa pencatatan' },
        { key: 'B', text: 'Mencatat setiap barang yang keluar dan masuk ke dalam buku inventaris harian' },
        { key: 'C', text: 'Menyediakan fasilitas pembayaran non-tunai QRIS di meja kasir toko' },
        { key: 'D', text: 'Memisahkan rekening tabungan khusus modal kulakan dengan uang belanja dapur' },
        { key: 'E', text: 'Memeriksa tanggal kedaluwarsa barang secara rutin setiap akhir pekan' }
      ],
      correct: 'A',
      explanation: 'Ketidakjelasan batas antara kas usaha dan uang pribadi menyebabkan modal kerja tergerus untuk konsumsi rumah tangga (prive tak terkontrol).'
    },
    {
      id: 5010, day: 6, sector: 'perdagangan', indicatorCode: 'D', cognitiveLevel: 'C4',
      question: 'Solusi inovasi berbasis STEM dan Finansial yang paling tepat diusulkan dalam video Day 6 untuk meningkatkan daya saing produk UMKM kuliner lokal OKU Timur adalah...',
      options: [
        { key: 'A', text: 'Menerapkan pengemasan kedap udara (standing pouch ber-seal) lengkap dengan label komposisi/PIRT, pencatatan HPP digital, dan pembayaran QRIS' },
        { key: 'B', text: 'Mengurangi takaran bahan baku utama secara diam-diam tanpa mengubah harga jual' },
        { key: 'C', text: 'Membungkus produk dengan kertas koran bekas agar biaya produksi lebih murah' },
        { key: 'D', text: 'Menolak pembeli yang ingin memesan secara grosir melalui aplikasi pesan singkat' },
        { key: 'E', text: 'Menjual produk hanya pada satu jam tertentu di malam hari tanpa papan nama' }
      ],
      correct: 'A',
      explanation: 'Inovasi kemasan food-grade berlabel meningkatkan masa simpan (shelf-life) dan nilai jual, sementara QRIS & pembukuan digital merapikan arus kas.'
    },

    // --- SEKTOR KOPERASI / AGEN BRI-LINK / JASA KEUANGAN (12 SOAL) ---
    {
      id: 5011, day: 5, sector: 'keuangan', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Pada video observasi Day 5 di gerai Agen BRI-Link / Koperasi, alat pendeteksi keaslian uang kertas menggunakan lampu khusus yang bekerja berdasarkan prinsip Fisika Optik, yaitu...',
      options: [
        { key: 'A', text: 'Memancarkan gelombang sinar Ultraviolet (UV) yang memendarkan tinta fosfor dan benang pengaman khusus pada uang Rupiah asli' },
        { key: 'B', text: 'Menggunakan sinar-X berenergi tinggi untuk menembus dompet kulit milik nasabah' },
        { key: 'C', text: 'Memanaskan lembaran uang kertas hingga suhu 200°C untuk menguji kekuatan serat kapas' },
        { key: 'D', text: 'Menimbang berat satu lembar uang kertas menggunakan neraca pegas mekanik' },
        { key: 'E', text: 'Mencelupkan uang kertas ke dalam larutan asam kuat untuk melihat perubahan warna' }
      ],
      correct: 'A',
      explanation: 'Uang Rupiah asli memiliki fitur keamanan tak kasatmata berupa tinta fluorescent yang berpendar terang di bawah paparan sinar UV (panjang gelombang ~365 nm).'
    },
    {
      id: 5012, day: 5, sector: 'keuangan', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Printer struk bukti transaksi di gerai Agen BRI-Link dapat mencetak tulisan hitam dengan cepat tanpa menggunakan pita tinta maupun katrid tinta cair. Prinsip Sains Kimia yang bekerja pada kertas struk tersebut adalah...',
      options: [
        { key: 'A', text: 'Kertas berlapis senyawa kimia termokromik (thermal paper) yang bereaksi berubah warna menjadi hitam saat disentuh kepala pemanas (thermal head)' },
        { key: 'B', text: 'Kertas menyerap partikel karbon hitam secara magnetis dari udara di sekitar mesin EDC' },
        { key: 'C', text: 'Mesin menyemprotkan serbuk arang kayu mikroskopis dari baterai internal printer' },
        { key: 'D', text: 'Tulisan terbentuk akibat goresan pisau baja tajam yang mengelupas lapisan kertas' },
        { key: 'E', text: 'Sinar lampu ruangan membakar permukaan kertas secara merata melalui lensa kaca' }
      ],
      correct: 'A',
      explanation: 'Kertas termal dilapisi leuco dye dan asam pengembang yang bereaksi kimia menghasilkan warna gelap ketika dipanaskan secara selektif oleh elemen thermal printhead.'
    },
    {
      id: 5013, day: 5, sector: 'keuangan', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Perangkat mesin EDC (Electronic Data Capture) dan aplikasi BRILink Mobile yang ditunjukkan pada video Day 5 menerapkan teknologi keamanan informasi perbankan berupa...',
      options: [
        { key: 'A', text: 'Pembacaan chip kartu terenkripsi, otentikasi PIN nasabah, dan transmisi data real-time melalui jaringan seluler/internet ke server bank' },
        { key: 'B', text: 'Penyimpanan seluruh nomor PIN nasabah secara terbuka di layar spanduk depan gerai' },
        { key: 'C', text: 'Pengiriman uang fisik melalui pipa bawah tanah dari desa menuju kantor pusat bank' },
        { key: 'D', text: 'Pencatatan saldo tabungan nasabah hanya di atas selembar kertas karton tanpa sistem server' },
        { key: 'E', text: 'Penggunaan gelombang radio AM terbuka yang dapat disadap oleh televisi warga sekitar' }
      ],
      correct: 'A',
      explanation: 'Transaksi elektronik agen perbankan dilindungi enkripsi kriptografi ujung-ke-ujung (end-to-end encryption), verifikasi chip EMV, dan PIN 6 digit.'
    },
    {
      id: 5014, day: 5, sector: 'keuangan', indicatorCode: 'C', cognitiveLevel: 'C4',
      question: 'Dalam aspek Engineering (Rekayasa Keamanan & Layanan) pada gerai Agen BRI-Link atau Koperasi Simpan Pinjam, desain tata letak loket yang baik wajib menerapkan...',
      options: [
        { key: 'A', text: 'Penempatan kamera CCTV yang mengawasi area serah-terima uang, laci brankas terkunci aman, dan privasi keypad saat nasabah menekan PIN' },
        { key: 'B', text: 'Meletakkan tumpukan uang tunai puluhan juta rupiah di meja luar tanpa pengawasan' },
        { key: 'C', text: 'Memasang cermin besar tepat di belakang nasabah agar orang lain melihat PIN yang diketik' },
        { key: 'D', text: 'Menempatkan mesin EDC di ruang gelap tanpa penerangan lampu dan sinyal internet' },
        { key: 'E', text: 'Mengizinkan siapa saja membuka laci brankas kas tanpa izin pengelola gerai' }
      ],
      correct: 'A',
      explanation: 'Rekayasa ruang layanan keuangan mikro harus mengutamakan keamanan fisik kas (brankas/teralis), pemantauan visual (CCTV), dan perlindungan privasi PIN nasabah.'
    },
    {
      id: 5015, day: 6, sector: 'keuangan', indicatorCode: 'A', cognitiveLevel: 'C4',
      question: 'Dalam analisis Pilar Financial video Day 6 pada usaha Agen BRI-Link, yang dimaksud dengan manajemen keseimbangan modal likuiditas ganda adalah...',
      options: [
        { key: 'A', text: 'Menjaga ketersediaan saldo uang elektronik di rekening bank (untuk melayani transfer/setor tunai) sekaligus uang tunai fisik di laci kas (untuk melayani tarik tunai)' },
        { key: 'B', text: 'Menukarkan seluruh modal uang tunai menjadi barang sembako yang disimpan di gudang' },
        { key: 'C', text: 'Mengosongkan saldo rekening bank hingga nol rupiah setiap pagi saat membuka gerai' },
        { key: 'D', text: 'Menolak seluruh nasabah yang ingin melakukan penarikan uang tunai hasil panen' },
        { key: 'E', text: 'Meminjamkan seluruh modal kerja agen kepada satu orang tanpa batas waktu pengembalian' }
      ],
      correct: 'A',
      explanation: 'Agen Laku Pandai/BRI-Link harus memutar modal secara seimbang antara saldo digital di rekening dan uang kartal fisik di laci agar kedua jenis transaksi (setor & tarik) tidak terhambat.'
    },
    {
      id: 5016, day: 6, sector: 'keuangan', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Sebuah gerai Agen BRI-Link di Belitang melayani rata-rata 60 transaksi per hari dengan keuntungan bersih (fee agen setelah bagi hasil bank) rata-rata Rp2.500 per transaksi. Jika biaya kuota internet, listrik, dan kertas struk adalah Rp600.000 per bulan (30 hari kerja), berapakah laba bersih bulanan agen tersebut?',
      options: [
        { key: 'A', text: 'Rp3.900.000 laba bersih per bulan' },
        { key: 'B', text: 'Rp4.500.000 laba bersih per bulan' },
        { key: 'C', text: 'Rp2.800.000 laba bersih per bulan' },
        { key: 'D', text: 'Rp5.100.000 laba bersih per bulan' },
        { key: 'E', text: 'Rp1.500.000 laba bersih per bulan' }
      ],
      correct: 'A',
      explanation: 'Pendapatan Fee Harian = 60 x Rp2.500 = Rp150.000. Pendapatan 30 hari = Rp4.500.000. Laba Bersih = Rp4.500.000 - Rp600.000 = Rp3.900.000.'
    },
    {
      id: 5017, day: 6, sector: 'keuangan', indicatorCode: 'C', cognitiveLevel: 'C4',
      question: 'Modus penipuan yang sering mengincar gerai transaksi keuangan adalah pelaku menunjukkan tangkapan layar (screenshot) bukti transfer palsu hasil editan lalu meminta uang tunai segera diserahkan. Prosedur rekayasa keamanan (SOP) yang wajib dilakukan agen adalah...',
      options: [
        { key: 'A', text: 'Wajib memeriksa mutasi saldo masuk secara langsung di aplikasi/mesin resmi milik agen sendiri sebelum menyerahkan uang tunai sepeser pun' },
        { key: 'B', text: 'Langsung memberikan uang tunai karena pelaku terlihat terburu-buru dan berpakaian rapi' },
        { key: 'C', text: 'Mempercayai foto bukti transfer di layar HP pelaku tanpa mengecek rekening agen' },
        { key: 'D', text: 'Mematikan kamera CCTV saat melayani transaksi penarikan tunai dalam jumlah besar' },
        { key: 'E', text: 'Menyerahkan kartu ATM dan PIN milik agen kepada pelanggan untuk dicek sendiri' }
      ],
      correct: 'A',
      explanation: 'Prinsip verifikasi mutasi real-time di perangkat milik agen sendiri adalah benteng utama mencegah penipuan struk/screenshot palsu.'
    },
    {
      id: 5018, day: 6, sector: 'keuangan', indicatorCode: 'D', cognitiveLevel: 'C4',
      question: 'Pada Koperasi Simpan Pinjam atau KUD di OKU Timur, inovasi berbasis STEM dan Finansial yang dapat diterapkan untuk mencegah kredit macet dan meningkatkan kepercayaan anggota adalah...',
      options: [
        { key: 'A', text: 'Digitalisasi pembukuan simpanan dan angsuran anggota secara transparan, analisis kelayakan usaha peminjam (5C), serta pengingat jadwal angsuran otomatis' },
        { key: 'B', text: 'Memberikan pinjaman besar tanpa mencatat identitas dan kemampuan bayar peminjam' },
        { key: 'C', text: 'Menghapuskan pelaksanaan Rapat Anggota Tahunan (RAT) dan laporan keuangan' },
        { key: 'D', text: 'Menetapkan bunga pinjaman harian setinggi mungkin seperti pinjaman online ilegal' },
        { key: 'E', text: 'Menyimpan seluruh catatan utang-piutang hanya berdasarkan ingatan pengurus' }
      ],
      correct: 'A',
      explanation: 'Transparansi pencatatan digital dan penilaian kelayakan kredit menjaga kesehatan arus kas koperasi dan meningkatkan partisipasi anggota.'
    },

    // --- SEKTOR JASA TEKNIK / BENGKEL / PRODUKSI KERAJINAN (12 SOAL) ---
    {
      id: 5019, day: 5, sector: 'jasa', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Ketika seorang mekanik bengkel motor/alsintan menggunakan kunci bergagang panjang untuk membuka baut mesin yang sangat keras, mekanik tersebut menerapkan prinsip Fisika Mekanika yaitu...',
      options: [
        { key: 'A', text: 'Momen gaya (Torsi = Gaya x Lengan Kuasa), di mana semakin panjang gagang kunci maka gaya tangan yang dibutuhkan semakin ringan' },
        { key: 'B', text: 'Hukum pemantulan cahaya cermin datar pada permukaan logam kunci pas' },
        { key: 'C', text: 'Perpindahan kalor secara radiasi elektromagnetik tanpa melalui zat perantara' },
        { key: 'D', text: 'Tekanan osmotik cairan di dalam ban karet kendaraan bermotor' },
        { key: 'E', text: 'Reaksi fotosintesis pengubahan gas karbon dioksida di ruang bengkel' }
      ],
      correct: 'A',
      explanation: 'Rumus torsi (tau = F . r) membuktikan bahwa perpanjangan lengan kuasa (r) melipatgandakan momen putar untuk membuka baut berkarat/keras.'
    },
    {
      id: 5020, day: 5, sector: 'jasa', indicatorCode: 'A', cognitiveLevel: 'C3',
      question: 'Pada bengkel las listrik di OKU Timur, pekerja wajib mengenakan topeng/kacamata las gelap dan sarung tangan kulit tebal. Secara Sains Fisika dan Kesehatan Kerja (K3), alat pelindung diri tersebut melindungi pekerja dari...',
      options: [
        { key: 'A', text: 'Radiasi sinar Ultraviolet (UV) dan Inframerah intensitas tinggi dari busur listrik yang dapat membakar kornea mata (arc eye) serta percikan logam cair' },
        { key: 'B', text: 'Tiupan angin sepoi-sepoi dari halaman depan bengkel saat cuaca cerah' },
        { key: 'C', text: 'Getaran suara musik dari radio yang dinyalakan di ruang tunggu pelanggan' },
        { key: 'D', text: 'Penurunan suhu ruangan akibat penggunaan kipas angin dinding' },
        { key: 'E', text: 'Pantulan warna cat tembok bengkel yang berwarna hijau muda' }
      ],
      correct: 'A',
      explanation: 'Busur las listrik menghasilkan suhu ribuan derajat Celsius serta radiasi UV/IR kuat yang berbahaya bagi retina/kornea mata dan kulit.'
    },
    {
      id: 5021, day: 5, sector: 'jasa', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Penggunaan Mesin Las Inverter modern berbasis transistor IGBT pada usaha bengkel las di pedesaan memiliki keunggulan teknologi dibandingkan trafo las gulungan tembaga kuno, yaitu...',
      options: [
        { key: 'A', text: 'Konsumsi daya listrik (Watt) jauh lebih hemat, ukuran mesin ringan portabel, dan nyala busur api pengelasan lebih stabil' },
        { key: 'B', text: 'Dapat menyala tanpa menggunakan sumber energi listrik maupun genset sama sekali' },
        { key: 'C', text: 'Memiliki bobot mesin lebih dari 200 kilogram sehingga tidak bisa dipindahkan' },
        { key: 'D', text: 'Menggunakan bahan bakar kayu bakar untuk melelehkan besi baja tebal' },
        { key: 'E', text: 'Hanya bisa digunakan untuk menyambung bahan kertas dan kain tekstil' }
      ],
      correct: 'A',
      explanation: 'Teknologi inverter switching frekuensi tinggi (IGBT) meningkatkan efisiensi daya listrik secara drastis dan memangkas bobot trafo.'
    },
    {
      id: 5022, day: 5, sector: 'jasa', indicatorCode: 'D', cognitiveLevel: 'C3',
      question: 'Seorang pengrajin teralis besi dan meubel kayu di Belitang hendak membuat bingkai persegi panjang berukuran panjang 120 cm dan lebar 80 cm dengan sambungan sudut potong miring (miter). Berapakah sudut kemiringan potong pada setiap ujung batang agar membentuk sudut siku-siku 90° yang presisi?',
      options: [
        { key: 'A', text: '45 derajat pada masing-masing ujung batang yang bertemu' },
        { key: 'B', text: '15 derajat pada masing-masing ujung batang yang bertemu' },
        { key: 'C', text: '75 derajat pada masing-masing ujung batang yang bertemu' },
        { key: 'D', text: '120 derajat pada masing-masing ujung batang yang bertemu' },
        { key: 'E', text: '180 derajat sejajar lurus tanpa kemiringan potong' }
      ],
      correct: 'A',
      explanation: 'Dua ujung batang yang dipotong miring 45° apabila dipertemukan akan membentuk sudut siku-siku tepat 90° (45° + 45° = 90°).'
    },
    {
      id: 5023, day: 6, sector: 'jasa', indicatorCode: 'B', cognitiveLevel: 'C3',
      question: 'Sebuah bengkel las menerima pesanan pembuatan kanopi besi dengan nilai kontrak Rp6.500.000. Biaya pembelian besi hollow, atap spandek, kawat las, cat, dan listrik menghabiskan Rp4.200.000, serta upah pembantu tukang Rp800.000. Berapakah laba bersih pemilik bengkel dari proyek tersebut?',
      options: [
        { key: 'A', text: 'Rp1.500.000 laba bersih proyek' },
        { key: 'B', text: 'Rp2.300.000 laba bersih proyek' },
        { key: 'C', text: 'Rp1.000.000 laba bersih proyek' },
        { key: 'D', text: 'Rp3.100.000 laba bersih proyek' },
        { key: 'E', text: 'Rp800.000 laba bersih proyek' }
      ],
      correct: 'A',
      explanation: 'Total Biaya = Rp4.200.000 + Rp800.000 = Rp5.000.000. Laba Bersih = Rp6.500.000 - Rp5.000.000 = Rp1.500.000.'
    },
    {
      id: 5024, day: 6, sector: 'jasa', indicatorCode: 'D', cognitiveLevel: 'C4',
      question: 'Dalam video analisis Day 6 pada sektor jasa bengkel/kerajinan, inovasi pengelolaan tempat kerja metode 5R (Ringkas, Rapi, Resik, Rawat, Rajin) dan pemanfaatan limbah potongan bahan (scrap) memberikan dampak positif berupa...',
      options: [
        { key: 'A', text: 'Mempercepat waktu pencarian kunci/perkakas kerja, mencegah kecelakaan kerja K3, dan menghasilkan pendapatan tambahan dari produk kerajinan sisa bahan' },
        { key: 'B', text: 'Membuat mekanik kesulitan menemukan kunci pas karena semua alat disembunyikan' },
        { key: 'C', text: 'Mengharuskan bengkel membeli peralatan baru setiap hari meskipun alat lama masih bagus' },
        { key: 'D', text: 'Membuang seluruh oli bekas ke saluran irigasi sawah di belakang bengkel' },
        { key: 'E', text: 'Menurunkan kepercayaan pelanggan karena bengkel terlihat terlalu bersih dan rapi' }
      ],
      correct: 'A',
      explanation: 'Manajemen bengkel 5R memangkas waktu terbuang (motion waste), meningkatkan keselamatan K3, dan ekonomi sirkular (scrap craft) menambah laba.'
    }
  ];

  window.getNftBankSoalByDay = function(dayNum, sectorKey) {
    dayNum = (dayNum !== undefined && dayNum !== null && !isNaN(dayNum) && Number(dayNum) === 0) ? 0 : (parseInt(dayNum) || 1);
    let dayQuestions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[dayNum]) || [];

    // KHUSUS DAY 2 (SEKTOR ADAPTIF: MODUL A [40] + MODUL B [40] + SPESIFIK SEKTOR [35 / 120])
    if (dayNum === 2 && sectorKey) {
      let sec = String(sectorKey).toLowerCase().trim();
      if (sec === 'pertanian') sec = 'pangan';
      if (sec === 'jasa') sec = 'industri';
      if (sec === 'keuangan') sec = 'formal';

      const d2All = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[2]) || [];
      const poolA = d2All.filter(q => q.indicatorCode === 'A');
      const poolB = d2All.filter(q => q.indicatorCode === 'B');

      if (sec === 'pangan') {
        return d2All;
      } else if (window.NFT_DAY2_SECTOR_QUESTIONS && window.NFT_DAY2_SECTOR_QUESTIONS[sec]) {
        const secQuestions = window.NFT_DAY2_SECTOR_QUESTIONS[sec];
        return [...poolA, ...poolB, ...secQuestions];
      }
    }

    if (dayNum === 4 && (!dayQuestions || dayQuestions.length === 0)) {
      const d3Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[3]) || [];
      const indMap4 = {
        'A': 'Analisis Science: Prinsip Fisika, Kimia & Biologi pada Peralatan',
        'B': 'Analisis Technology: Sistem Penggerak, Material & Mekanisasi Alat',
        'C': 'Analisis Engineering: Rancang Bangun Mekanis, Ergonomi & Perawatan Alat',
        'D': 'Analisis Mathematics: Kalkulasi Kapasitas Kerja, Energi & Efisiensi Biaya Alat',
        'E': 'Integrasi 4 Dimensi STEM pada Peralatan & Perlengkapan Sektor Pilihan'
      };
      dayQuestions = d3Questions.map(q => Object.assign({}, q, {
        day: 4,
        indicatorName: indMap4[q.indicatorCode] || q.indicatorName
      }));
    }

    // KHUSUS DAY 5 (VIDEO OBSERVASI CULTURE, EXPLORATION ALAT & 4 UNSUR STEM 7 SEKTOR)
    if (dayNum === 5 && (!dayQuestions || dayQuestions.length === 0)) {
      const d3Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[3]) || [];
      const d1Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[1]) || [];
      const d2Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[2]) || [];
      const indMap5 = {
        'A': 'Analisis Video Science: Prinsip Fisika, Kimia & Biologi pada Sektor Pilihan',
        'B': 'Analisis Video Technology & Exploration: Peralatan Kerja, Mesin & Digitalisasi',
        'C': 'Analisis Video Engineering: Rancang Bangun, Tata Ruang & Rekayasa Teknis',
        'D': 'Analisis Video Mathematics: Kalkulasi Ukuran, Kapasitas & Produktivitas',
        'E': 'Pilar Culture & Alur Penyajian Video Observasi STEM Mandiri'
      };

      if (sectorKey && ['pertanian', 'perkebunan', 'perikanan', 'peternakan'].includes(sectorKey)) {
        const secPool = d3Questions.filter(q => q.sector === sectorKey);
        dayQuestions = secPool.map(q => Object.assign({}, q, {
          day: 5,
          indicatorName: indMap5[q.indicatorCode] || q.indicatorName
        }));
      } else if (sectorKey && ['perdagangan', 'keuangan', 'jasa'].includes(sectorKey)) {
        const extraSec = EXTRA_SECTOR_QUESTIONS_D56.filter(q => q.sector === sectorKey);
        // Padukan soal khusus sektor (Perdagangan/BRI-Link/Jasa) dengan soal ekonomi/teknologi/budaya OKU Timur agar genap >= 50 soal
        const econPool = [
          ...d1Questions.filter(q => q.indicatorCode === 'A' || q.indicatorCode === 'C' || q.indicatorCode === 'D' || q.indicatorCode === 'E').slice(0, 35),
          ...d2Questions.filter(q => q.indicatorCode === 'B' || q.indicatorCode === 'D').slice(0, 25)
        ];
        const combined = [...extraSec, ...econPool];
        const codes = ['A', 'B', 'C', 'D', 'E'];
        dayQuestions = combined.map((q, idx) => {
          const code = q.indicatorCode && indMap5[q.indicatorCode] ? q.indicatorCode : codes[idx % 5];
          return Object.assign({}, q, {
            id: 5100 + idx,
            day: 5,
            sector: sectorKey,
            indicatorCode: code,
            indicatorName: indMap5[code]
          });
        });
      } else {
        dayQuestions = d3Questions.map(q => Object.assign({}, q, {
          day: 5,
          indicatorName: indMap5[q.indicatorCode] || q.indicatorName
        }));
      }
    }

    // KHUSUS DAY 6 (VIDEO ANALISIS FINANCIAL, EVALUASI KENDALA & SOLUSI INOVASI 7 SEKTOR)
    if (dayNum === 6 && (!dayQuestions || dayQuestions.length === 0)) {
      const d3Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[3]) || [];
      const d1Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[1]) || [];
      const indMap6 = {
        'A': 'Analisis Video Financial: Struktur Modal Awal, Biaya Tetap & Biaya Operasional',
        'B': 'Analisis Video Financial: Kalkulasi HPP, Harga Jual, Omzet & Laba Bersih',
        'C': 'Evaluasi Kendala Teknis, Risiko Usaha & Keamanan Operasional',
        'D': 'Gagasan Solusi & Inovasi Nilai Tambah Berbasis STEM + Finansial',
        'E': 'Sintesis Kelayakan Bisnis & Pengembangan Ekonomi Lokal OKU Timur'
      };

      if (sectorKey && ['pertanian', 'perkebunan', 'perikanan', 'peternakan'].includes(sectorKey)) {
        const secPool = d3Questions.filter(q => q.sector === sectorKey);
        const finPool = d1Questions.filter(q => q.indicatorCode === 'A' || q.indicatorCode === 'B').slice(0, 20);
        const combined = [...secPool, ...finPool];
        dayQuestions = combined.map((q, idx) => {
          const code = q.indicatorCode && indMap6[q.indicatorCode] ? q.indicatorCode : ['A', 'B', 'C', 'D', 'E'][idx % 5];
          return Object.assign({}, q, {
            id: 6100 + idx,
            day: 6,
            sector: sectorKey,
            indicatorCode: code,
            indicatorName: indMap6[code]
          });
        });
      } else if (sectorKey && ['perdagangan', 'keuangan', 'jasa'].includes(sectorKey)) {
        const extraSec = EXTRA_SECTOR_QUESTIONS_D56.filter(q => q.sector === sectorKey);
        const finPool = d1Questions.filter(q => q.indicatorCode === 'A' || q.indicatorCode === 'B' || q.indicatorCode === 'C' || q.indicatorCode === 'D' || q.indicatorCode === 'E').slice(0, 50);
        const combined = [...extraSec, ...finPool];
        dayQuestions = combined.map((q, idx) => {
          const code = q.indicatorCode && indMap6[q.indicatorCode] ? q.indicatorCode : ['A', 'B', 'C', 'D', 'E'][idx % 5];
          return Object.assign({}, q, {
            id: 6500 + idx,
            day: 6,
            sector: sectorKey,
            indicatorCode: code,
            indicatorName: indMap6[code]
          });
        });
      } else {
        const combined = [...d1Questions.slice(0, 100), ...d3Questions.slice(0, 100)];
        dayQuestions = combined.map((q, idx) => {
          const code = ['A', 'B', 'C', 'D', 'E'][idx % 5];
          return Object.assign({}, q, {
            id: 6800 + idx,
            day: 6,
            indicatorCode: code,
            indicatorName: indMap6[code]
          });
        });
      }
    }

    // KHUSUS DAY 7 (SINTESIS 4 PILAR FINCESTEM & REKONSILIASI KAS)
    if (dayNum === 7 && (!dayQuestions || dayQuestions.length === 0)) {
      const d1Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[1]) || [];
      const d2Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[2]) || [];
      const d3Questions = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[3]) || [];
      const indMap7 = {
        'A': 'Evaluasi Komprehensif Pilar Financial & Rekonsiliasi Kas Riset',
        'B': 'Evaluasi Komprehensif Pilar Culture & Etos Kerja Multikultural',
        'C': 'Evaluasi Komprehensif Pilar Exploration, Geospasial & Peralatan',
        'D': 'Evaluasi Komprehensif 4 Dimensi STEM (Sains, Teknologi, Rekayasa, Matematika)',
        'E': 'Karya Portofolio Video YouTube & Solusi Inovasi Berkelanjutan'
      };
      const poolA = d1Questions.slice(0, 40).map(q => Object.assign({}, q, { day: 7, indicatorCode: 'A', indicatorName: indMap7.A }));
      const poolB = d2Questions.slice(0, 40).map(q => Object.assign({}, q, { day: 7, indicatorCode: 'B', indicatorName: indMap7.B }));
      const poolC = d2Questions.slice(120, 160).map(q => Object.assign({}, q, { day: 7, indicatorCode: 'C', indicatorName: indMap7.C }));
      const poolD = d3Questions.slice(0, 40).map(q => Object.assign({}, q, { day: 7, indicatorCode: 'D', indicatorName: indMap7.D }));
      const poolE = d1Questions.slice(160, 200).map(q => Object.assign({}, q, { day: 7, indicatorCode: 'E', indicatorName: indMap7.E }));
      dayQuestions = [...poolA, ...poolB, ...poolC, ...poolD, ...poolE];
    }

    if ((dayNum === 3 || dayNum === 4) && sectorKey) {
      const filtered = dayQuestions.filter(q => q.sector === sectorKey);
      return filtered.length ? filtered : dayQuestions;
    }
    return dayQuestions;
  };

  /**
   * Helper: Mengambil daftar indikator resmi
   */
  window.getNftBankSoalIndicators = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (dayNum === 2 && window.NFT_BANK_SOAL_INDICATORS_DAY2) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY2;
    }
    if (dayNum === 3 && window.NFT_BANK_SOAL_INDICATORS_DAY3) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY3;
    }
    if (dayNum === 4 && window.NFT_BANK_SOAL_INDICATORS_DAY4) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY4;
    }
    if (dayNum === 5 && window.NFT_BANK_SOAL_INDICATORS_DAY5) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY5;
    }
    if (dayNum === 6 && window.NFT_BANK_SOAL_INDICATORS_DAY6) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY6;
    }
    if (dayNum === 7 && window.NFT_BANK_SOAL_INDICATORS_DAY7) {
      return window.NFT_BANK_SOAL_INDICATORS_DAY7;
    }
    return window.NFT_BANK_SOAL_INDICATORS || [];
  };

})(window);
