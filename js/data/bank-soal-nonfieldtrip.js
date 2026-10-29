/**
 * FINCESTEM 2026 - Bank Soal Digital Asesmen Khusus Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur
 * Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)
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
    "name": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "desc": "Produksi, Distribusi, Konsumsi, Sektor Primer, Sekunder, Tersier, dan Pelaku Ekonomi."
  },
  {
    "code": "B",
    "key": "ind_literasi_finansial",
    "name": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "desc": "4 Jenis Finansial, Manajemen Arus Kas, Anggaran, Tabungan, Investasi, dan Mitigasi Risiko."
  },
  {
    "code": "C",
    "key": "ind_kebanksentralan",
    "name": "Kebanksentralan & Bank Indonesia (BI)",
    "desc": "Independensi Bank Sentral, Tugas Pokok, Stabilitas Nilai Rupiah, Kebijakan Moneter, dan Sistem Pembayaran QRIS."
  },
  {
    "code": "D",
    "key": "ind_badan_usaha_koperasi",
    "name": "Badan Usaha & Koperasi Indonesia",
    "desc": "BUMN, BUMS, BUMD, Landasan UU 25/1992, Asas Kekeluargaan, Pengelolaan SHU, dan Soko Guru Ekonomi."
  },
  {
    "code": "E",
    "key": "ind_potensi_oku_timur",
    "name": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "desc": "Lumbung Padi Sumsel, Irigasi Komering, Perkebunan Karet/Sawit, Peternakan Sapi, Patin, UMKM Gumawang, BRILink/BUMDes."
  }
];

  window.NFT_BANK_SOAL_CONFIG = {
    totalQuestionsInBank: 200,
    questionsPerStudent: 50,
    questionsPerIndicator: 10,
    durationMinutes: 60,
    totalIndicators: 5,
    cognitiveDistribution: {
      C1: 50, // 25%
      C2: 50, // 25%
      C3: 50, // 25%
      C4: 50  // 25%
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
    1: [
  {
    "id": 1,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
    "numberInIndicator": 3,
    "question": "Lembaga atau perorangan yang menjalankan fungsi menyampaikan barang dari produsen kepada konsumen disebut...",
    "options": [
      {
        "key": "A",
        "text": "Konsumen pemakai produk"
      },
      {
        "key": "B",
        "text": "Produsen pembuat barang"
      },
      {
        "key": "C",
        "text": "Distributor penyalur barang"
      },
      {
        "key": "D",
        "text": "Investor penanam modal"
      },
      {
        "key": "E",
        "text": "Fasilitator pendamping desa"
      }
    ],
    "correct": "C",
    "explanation": "Distributor adalah pihak atau lembaga yang bertugas menyalurkan barang/jasa dari produsen hingga sampai ke konsumen."
  },
  {
    "id": 4,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
    "numberInIndicator": 4,
    "question": "Sektor perekonomian yang kegiatannya mengambil dan mengelola sumber daya alam secara langsung tanpa pengolahan pabrik adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sektor industri sekunder"
      },
      {
        "key": "B",
        "text": "Sektor pelayanan tersier"
      },
      {
        "key": "C",
        "text": "Sektor teknologi kuartener"
      },
      {
        "key": "D",
        "text": "Sektor ekstraktif primer"
      },
      {
        "key": "E",
        "text": "Sektor keuangan perbankan"
      }
    ],
    "correct": "D",
    "explanation": "Sektor primer mencakup pemanfaatan langsung sumber daya alam seperti pertanian, perikanan, kehutanan, dan pertambangan."
  },
  {
    "id": 5,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
    "numberInIndicator": 5,
    "question": "Kelompok aktivitas ekonomi yang bertugas mengolah bahan mentah menjadi bahan setengah jadi atau barang jadi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sektor pertanian primer"
      },
      {
        "key": "B",
        "text": "Sektor perdagangan tersier"
      },
      {
        "key": "C",
        "text": "Sektor agribisnis hulu"
      },
      {
        "key": "D",
        "text": "Sektor pertambangan migas"
      },
      {
        "key": "E",
        "text": "Sektor manufaktur sekunder"
      }
    ],
    "correct": "E",
    "explanation": "Sektor sekunder berfokus pada industri manufaktur dan pengolahan bahan mentah menjadi barang setengah jadi atau barang jadi."
  },
  {
    "id": 6,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
    "numberInIndicator": 6,
    "question": "Aktivitas usaha yang bergerak di bidang penyediaan layanan, transportasi, dan kenyamanan tanpa menghasilkan barang fisik tergolong...",
    "options": [
      {
        "key": "A",
        "text": "Sektor jasa layanan tersier"
      },
      {
        "key": "B",
        "text": "Sektor agraris pedesaan"
      },
      {
        "key": "C",
        "text": "Sektor industri kerajinan"
      },
      {
        "key": "D",
        "text": "Sektor ekstraktif tambang"
      },
      {
        "key": "E",
        "text": "Sektor perkebunan rakyat"
      }
    ],
    "correct": "A",
    "explanation": "Sektor tersier adalah sektor yang menyediakan layanan atau jasa non-fisik seperti perbankan, transportasi, pariwisata, dan perdagangan."
  },
  {
    "id": 7,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C2",
    "numberInIndicator": 12,
    "question": "Keterkaitan erat antara proses produksi dan distribusi dalam sistem pasar bahan pangan pokok tercermin pada kenyataan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Distribusi dapat berjalan mandiri tanpa memerlukan pasokan barang dari produsen"
      },
      {
        "key": "B",
        "text": "Barang yang diproduksi tidak akan bernilai guna jika tidak disalurkan ke konsumen"
      },
      {
        "key": "C",
        "text": "Produsen selalu menerima pembayaran tunai sebelum proses pengiriman berlangsung"
      },
      {
        "key": "D",
        "text": "Konsumen hanya membeli barang yang diproduksi langsung di pekarangan rumahnya"
      },
      {
        "key": "E",
        "text": "Proses produksi baru dimulai setelah seluruh barang di tangan pengecer habis terjual"
      }
    ],
    "correct": "B",
    "explanation": "Produksi dan distribusi saling bergantung; tanpa distribusi yang efektif, barang produksi tidak sampai ke konsumen dan kehilangan nilai guna."
  },
  {
    "id": 13,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Literasi & Pengelolaan Keuangan (Financial Literacy)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Kebanksentralan & Bank Indonesia (BI)",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C1",
    "numberInIndicator": 9,
    "question": "Lembaga usaha yang seluruh atau sebagian modalnya dimiliki oleh pemerintah desa dan masyarakat desa adalah...",
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
        "text": "Lembaga Keuangan Mikro Syariah"
      },
      {
        "key": "D",
        "text": "Badan Usaha Milik Desa"
      },
      {
        "key": "E",
        "text": "Bursa Komoditas Nusantara"
      }
    ],
    "correct": "D",
    "explanation": "BUMDes (Badan Usaha Milik Desa) adalah badan usaha yang modalnya dimiliki desa untuk mendayagunakan potensi ekonomi dan meningkatkan kesejahteraan warga desa."
  },
  {
    "id": 130,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C1",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Peran strategis Badan Usaha Milik Desa dalam perekonomian pedesaan Belitang diwujudkan melalui...",
    "options": [
      {
        "key": "A",
        "text": "Pengelolaan unit usaha desa seperti air bersih, pasar desa, dan persewaan alsintan"
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
    "explanation": "BUMDes mengoptimalkan aset desa dan potensi lokal (pengelolaan air, kios pasar, persewaan alat mesin pertanian) guna menambah Pendapatan Asli Desa."
  },
  {
    "id": 137,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C2",
    "numberInIndicator": 18,
    "question": "Peran koperasi simpan pinjam dalam memberdayakan petani kecil di pedesaan OKU Timur adalah...",
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
        "text": "Menyediakan akses pembiayaan modal musim tanam dengan bunga adil dan terjangkau"
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
    "explanation": "Koperasi simpan pinjam menyediakan likuiditas modal dengan prosedur ramah dan bunga wajar, melindungi petani dari pemerasan rentenir berkedok calo."
  },
  {
    "id": 139,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C2",
    "numberInIndicator": 20,
    "question": "Keberadaan Koperasi Unit Desa yang bermitra dengan kilang padi modern menciptakan dampak positif berupa...",
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
        "text": "Petani memiliki kepastian pasar penjualan gabah dengan standar timbangan adil"
      }
    ],
    "correct": "E",
    "explanation": "Kemitraan KUD dan kilang padi memastikan kepastian serapan hasil panen, akurasi timbangan, dan harga jual wajar bagi petani anggota."
  },
  {
    "id": 141,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 8,
    "question": "Jenis hewan ternak berkaki empat yang banyak dibudidayakan oleh masyarakat pedesaan OKU Timur sebagai tabungan hidup adalah...",
    "options": [
      {
        "key": "A",
        "text": "Unta padang pasir"
      },
      {
        "key": "B",
        "text": "Kuda pacuan impor"
      },
      {
        "key": "C",
        "text": "Sapi potong dan kambing"
      },
      {
        "key": "D",
        "text": "Rusa kutub kutub"
      },
      {
        "key": "E",
        "text": "Zebra padang rumput"
      }
    ],
    "correct": "C",
    "explanation": "Peternakan sapi potong (seperti sapi PO dan Bali) serta kambing merupakan komoditas ternak utama pedesaan di OKU Timur."
  },
  {
    "id": 169,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 9,
    "question": "Pabrik penggilingan padi terintegrasi yang dilengkapi mesin pembersih gabah, pengeringan, dan pengemasan beras disebut...",
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
        "text": "Rice Milling Unit terpadu"
      },
      {
        "key": "E",
        "text": "Balai Karantina Pertanian"
      }
    ],
    "correct": "D",
    "explanation": "Rice Milling Unit (RMU) adalah unit penggilingan padi modern yang memproses gabah kering giling menjadi beras kemasan berkualitas."
  },
  {
    "id": 170,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C1",
    "numberInIndicator": 10,
    "question": "Produk olahan makanan khas dari perikanan dan pertanian yang banyak diproduksi industri rumah tangga di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dodol apel dan sari apel"
      },
      {
        "key": "B",
        "text": "Gudeg nangka dan bakpia kacang"
      },
      {
        "key": "C",
        "text": "Bika ambon dan bolu meranti"
      },
      {
        "key": "D",
        "text": "Asinan sayur dan manisan pala"
      },
      {
        "key": "E",
        "text": "Kemplang ikan dan rengginang"
      }
    ],
    "correct": "E",
    "explanation": "Industri rumah tangga di OKU Timur menghasilkan kemplang/kerupuk ikan patin, rengginang beras ketan, dan sale pisang."
  },
  {
    "id": 171,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 16,
    "question": "Peran agen perbankan Laku Pandai di pelosok desa Belitang dalam mendorong inklusi keuangan masyarakat adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mendekatkan layanan setor, tarik tunai, dan transfer tanpa harus pergi ke kantor bank kota"
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
    "explanation": "Agen bank di desa menghemat waktu dan ongkos transportasi warga desa untuk menabung, membayar tagihan, atau menarik uang tunai secara aman."
  },
  {
    "id": 177,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C2",
    "numberInIndicator": 17,
    "question": "Keterkaitan antara keberadaan sentra pasar Gumawang dengan kelancaran rantai pasok barang di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sebagai tempat penyimpanan seluruh cadangan beras nasional milik perum bulog"
      },
      {
        "key": "B",
        "text": "Sebagai titik temu pedagang pengumpul hasil bumi dan distributor sembako antarkota"
      },
      {
        "key": "C",
        "text": "Sebagai kawasan industri pengolahan baja dan perakitan mesin kapal laut"
      },
      {
        "key": "D",
        "text": "Sebagai lokasi penukaran mata uang asing resmi bagi wisatawan mancanegara"
      },
      {
        "key": "E",
        "text": "Sebagai pusat pelelangan kayu hutan lindung dari pegunungan bukit barisan"
      }
    ],
    "correct": "B",
    "explanation": "Pasar Gumawang berfungsi sebagai simpul distribusi utama di mana komoditas pertanian dikumpulkan untuk dikirim ke luar daerah, dan barang pabrik disalurkan ke warung-warung desa."
  },
  {
    "id": 178,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C2",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C3",
    "numberInIndicator": 30,
    "question": "Sapi potong milik peternak di OKU Timur dibeli dengan harga bibit Rp12.000.000. Setelah digemukkan selama 8 bulan dengan pakan jerami fermentasi dan ampas tahu, sapi laku Rp20.000.000 dengan biaya pakan Rp3.500.000. Keuntungan peternak adalah...",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
    "numberInIndicator": 38,
    "question": "Mendiagnosis kendala peternak sapi potong pedesaan dalam mengembangkan skala usaha menjadi peternakan modern komersial adalah...",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
    "indicatorName": "Potensi Sektor Ekonomi Kabupaten OKU Timur",
    "cognitiveLevel": "C4",
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
]
  };

  /**
   * Helper: Mengambil bank soal berdasarkan day
   */
  window.getNftBankSoalByDay = function(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    return (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[dayNum]) || [];
  };

  /**
   * Helper: Mengambil daftar indikator resmi
   */
  window.getNftBankSoalIndicators = function() {
    return window.NFT_BANK_SOAL_INDICATORS || [];
  };

})(window);
