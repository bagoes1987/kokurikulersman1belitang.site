/**
 * FINCESTEM 2026 - Bank Soal Digital Asesmen Khusus Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur
 * Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)
 * Terkunci & Terisolasi Total (Bebas Konflik dengan Field Trip)
 * Versi: 20261029_nft_bs1
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
    totalIndicators: 5
  };

  window.NFT_BANK_SOAL_DAYS = {
    1: [
  {
    "id": 1,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 1,
    "question": "Kegiatan manusia yang dilakukan untuk menghasilkan barang atau jasa guna memenuhi kebutuhan hidup disebut...",
    "options": [
      {
        "key": "A",
        "text": "Konsumsi"
      },
      {
        "key": "B",
        "text": "Produksi"
      },
      {
        "key": "C",
        "text": "Distribusi"
      },
      {
        "key": "D",
        "text": "Investasi"
      },
      {
        "key": "E",
        "text": "Spekulasi"
      }
    ],
    "correct": "B",
    "explanation": "Produksi adalah kegiatan menciptakan atau menambah nilai guna suatu barang/jasa untuk memenuhi kebutuhan manusia."
  },
  {
    "id": 2,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 2,
    "question": "Tujuan utama kegiatan konsumsi dalam kehidupan ekonomi keluarga adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memperoleh laba maksimal"
      },
      {
        "key": "B",
        "text": "Mengurangi nilai guna barang/jasa secara bertahap guna memenuhi kebutuhan"
      },
      {
        "key": "C",
        "text": "Menyalurkan barang dari produsen ke pasar"
      },
      {
        "key": "D",
        "text": "Menciptakan lapangan kerja baru"
      },
      {
        "key": "E",
        "text": "Menimbun kekayaan untuk masa depan"
      }
    ],
    "correct": "B",
    "explanation": "Konsumsi bertujuan menghabiskan atau mengurangi nilai guna barang/jasa secara langsung untuk memenuhi kebutuhan hidup."
  },
  {
    "id": 3,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 3,
    "question": "Seorang petani di Belitang menjual langsung hasil panen sayurnya kepada tetangga di desanya tanpa perantara pedagang. Pola distribusi ini termasuk...",
    "options": [
      {
        "key": "A",
        "text": "Distribusi tidak langsung"
      },
      {
        "key": "B",
        "text": "Distribusi semi langsung"
      },
      {
        "key": "C",
        "text": "Distribusi langsung"
      },
      {
        "key": "D",
        "text": "Distribusi selektif"
      },
      {
        "key": "E",
        "text": "Distribusi eksklusif"
      }
    ],
    "correct": "C",
    "explanation": "Distribusi langsung adalah penyaluran barang dari produsen langsung kepada konsumen akhir tanpa perantara pihak ketiga."
  },
  {
    "id": 4,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 4,
    "question": "Aktivitas ekonomi yang memanfaatkan sumber daya alam secara langsung tanpa mengubah bentuk aslinya, seperti menanam padi atau menangkap ikan, tergolong dalam...",
    "options": [
      {
        "key": "A",
        "text": "Sektor Sekunder"
      },
      {
        "key": "B",
        "text": "Sektor Tersier"
      },
      {
        "key": "C",
        "text": "Sektor Primer"
      },
      {
        "key": "D",
        "text": "Sektor Kuartener"
      },
      {
        "key": "E",
        "text": "Sektor Informal"
      }
    ],
    "correct": "C",
    "explanation": "Sektor primer mencakup pemanfaatan langsung sumber daya alam alami, seperti pertanian, perikanan, perkebunan, dan pertambangan."
  },
  {
    "id": 5,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 5,
    "question": "Pabrik penggilingan padi (Rice Milling Unit) di OKU Timur yang mengolah gabah basah menjadi beras kemasan siap konsumsi merupakan contoh kegiatan di...",
    "options": [
      {
        "key": "A",
        "text": "Sektor Primer"
      },
      {
        "key": "B",
        "text": "Sektor Sekunder"
      },
      {
        "key": "C",
        "text": "Sektor Tersier"
      },
      {
        "key": "D",
        "text": "Sektor Publik"
      },
      {
        "key": "E",
        "text": "Sektor Moneter"
      }
    ],
    "correct": "B",
    "explanation": "Sektor sekunder bergerak dalam pengolahan bahan mentah menjadi barang jadi atau barang setengah jadi (manufaktur/industri pengolahan)."
  },
  {
    "id": 6,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 6,
    "question": "Jasa transportasi truk pengangkut gabah dari sawah ke gudang Bulog dan layanan kasir toko kelontong di Belitang tergolong dalam...",
    "options": [
      {
        "key": "A",
        "text": "Sektor Primer"
      },
      {
        "key": "B",
        "text": "Sektor Sekunder"
      },
      {
        "key": "C",
        "text": "Sektor Tersier"
      },
      {
        "key": "D",
        "text": "Sektor Ekstraktif"
      },
      {
        "key": "E",
        "text": "Sektor Agraris"
      }
    ],
    "correct": "C",
    "explanation": "Sektor tersier adalah sektor yang menyediakan jasa dan layanan pendukung, seperti transportasi, perdagangan, dan perbankan."
  },
  {
    "id": 7,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 7,
    "question": "Di bawah ini yang merupakan faktor produksi asli (primer) dalam teori ekonomi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Modal dan Kewirausahaan"
      },
      {
        "key": "B",
        "text": "Alam (Tanah) dan Tenaga Kerja"
      },
      {
        "key": "C",
        "text": "Mesin dan Uang"
      },
      {
        "key": "D",
        "text": "Teknologi dan Manajemen"
      },
      {
        "key": "E",
        "text": "Bangunan dan Kendaraan"
      }
    ],
    "correct": "B",
    "explanation": "Faktor produksi asli terdiri dari Sumber Daya Alam (tanah/air) dan Tenaga Kerja manusia. Modal dan kewirausahaan adalah faktor turunan."
  },
  {
    "id": 8,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 8,
    "question": "Upaya seorang petani meningkatkan hasil panen padi dengan cara mengoptimalkan pemupukan berimbang, benih unggul, dan irigasi teratur tanpa memperluas lahan sawah disebut...",
    "options": [
      {
        "key": "A",
        "text": "Ekstensifikasi"
      },
      {
        "key": "B",
        "text": "Intensifikasi"
      },
      {
        "key": "C",
        "text": "Diversifikasi"
      },
      {
        "key": "D",
        "text": "Mekanisasi"
      },
      {
        "key": "E",
        "text": "Rasionalisasi"
      }
    ],
    "correct": "B",
    "explanation": "Intensifikasi adalah upaya meningkatkan hasil produksi dengan mengoptimalkan faktor produksi yang ada tanpa menambah luas lahan."
  },
  {
    "id": 9,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 9,
    "question": "Seorang pekebun di Buay Madang menambah penghasilan dengan menanam jagung dan cabai di sela-sela pohon karet mudanya. Metode perluasan produksi ini disebut...",
    "options": [
      {
        "key": "A",
        "text": "Intensifikasi"
      },
      {
        "key": "B",
        "text": "Ekstensifikasi"
      },
      {
        "key": "C",
        "text": "Diversifikasi"
      },
      {
        "key": "D",
        "text": "Standardisasi"
      },
      {
        "key": "E",
        "text": "Spesialisasi"
      }
    ],
    "correct": "C",
    "explanation": "Diversifikasi adalah penganekaragaman jenis produk atau komoditas yang dihasilkan untuk meminimalkan risiko kerugian."
  },
  {
    "id": 10,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 10,
    "question": "Hukum Gossen I mengenai perilaku konsumsi menyatakan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Jika pemenuhan kebutuhan dilakukan terus-menerus, kenikmatannya mula-mula tinggi dan makin lama makin berkurang hingga mencapai titik jenuh"
      },
      {
        "key": "B",
        "text": "Manusia akan memenuhi berbagai macam kebutuhan hingga mencapai tingkat intensitas yang sama"
      },
      {
        "key": "C",
        "text": "Setiap manusia selalu bertindak rasional dalam mengalokasikan pendapatannya"
      },
      {
        "key": "D",
        "text": "Permintaan akan naik jika harga barang turun"
      },
      {
        "key": "E",
        "text": "Semua kebutuhan pokok harus dipenuhi sebelum kebutuhan sekunder"
      }
    ],
    "correct": "A",
    "explanation": "Hukum Gossen I (Hukum Utilitas Marjinal yang Menurun) menjelaskan bahwa konsumsi berulang atas barang yang sama akan mengalami penurunan kepuasan marginal."
  },
  {
    "id": 11,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 11,
    "question": "Peran Rumah Tangga Konsumen (RTK) dalam diagram arus melingkar kegiatan ekonomi (circular flow) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyediakan faktor produksi dan menerima balas jasa pendapatan"
      },
      {
        "key": "B",
        "text": "Memproduksi barang dan jasa publik untuk masyarakat"
      },
      {
        "key": "C",
        "text": "Menarik pajak dari perusahaan swasta"
      },
      {
        "key": "D",
        "text": "Mengatur peredaran uang kartal di pasar"
      },
      {
        "key": "E",
        "text": "Mengimpor bahan baku dari luar negeri"
      }
    ],
    "correct": "A",
    "explanation": "RTK berperan sebagai penyedia faktor produksi (tanah, tenaga kerja, modal) kepada RTP dan sebagai konsumen barang/jasa."
  },
  {
    "id": 12,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 12,
    "question": "Balas jasa yang diterima oleh Rumah Tangga Konsumen (RTK) atas penyerahan faktor produksi berupa tenaga kerja disebut...",
    "options": [
      {
        "key": "A",
        "text": "Sewa (Rent)"
      },
      {
        "key": "B",
        "text": "Upah/Gaji (Wage)"
      },
      {
        "key": "C",
        "text": "Bunga modal (Interest)"
      },
      {
        "key": "D",
        "text": "Laba/Keuntungan (Profit)"
      },
      {
        "key": "E",
        "text": "Dividen"
      }
    ],
    "correct": "B",
    "explanation": "Balas jasa tenaga kerja adalah upah/gaji (wage). Sewa untuk tanah, bunga untuk modal, dan laba untuk kewirausahaan."
  },
  {
    "id": 13,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 13,
    "question": "Pemerintah memberikan subsidi pupuk dan membangun bendungan irigasi untuk petani di OKU Timur. Dalam hal ini pemerintah bertindak sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Konsumen murni"
      },
      {
        "key": "B",
        "text": "Pengatur (Regulator) dan Penyedia Fasilitas Publik"
      },
      {
        "key": "C",
        "text": "Distributor tunggal"
      },
      {
        "key": "D",
        "text": "Investor spekulatif"
      },
      {
        "key": "E",
        "text": "Pemilik faktor produksi swasta"
      }
    ],
    "correct": "B",
    "explanation": "Pemerintah berperan sebagai regulator (pengatur) dan produsen fasilitas publik guna mensejahterakan masyarakat."
  },
  {
    "id": 14,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 14,
    "question": "Ciri utama dari benda konsumsi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Digunakan untuk menghasilkan barang modal lain"
      },
      {
        "key": "B",
        "text": "Diperlukan pengorbanan untuk memperolehnya dan nilai gunanya habis/berkurang saat dipakai"
      },
      {
        "key": "C",
        "text": "Tersedia melimpah di alam tanpa perlu dibeli"
      },
      {
        "key": "D",
        "text": "Hanya bisa dimiliki oleh badan usaha resmi"
      },
      {
        "key": "E",
        "text": "Harganya selalu naik setiap tahun"
      }
    ],
    "correct": "B",
    "explanation": "Benda konsumsi didapat melalui pengorbanan ekonomi dan nilai guna atau manfaatnya habis/berkurang saat digunakan memenuhi kebutuhan."
  },
  {
    "id": 15,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 15,
    "question": "Fungsi pokok distribusi yang berkaitan dengan perpindahan barang secara fisik dari tempat produksi ke tempat konsumen yang membutuhkan disebut...",
    "options": [
      {
        "key": "A",
        "text": "Fungsi penyimpanan (storage)"
      },
      {
        "key": "B",
        "text": "Fungsi pengangkutan (transportation)"
      },
      {
        "key": "C",
        "text": "Fungsi penstandaran kualitas"
      },
      {
        "key": "D",
        "text": "Fungsi penanggung risiko"
      },
      {
        "key": "E",
        "text": "Fungsi promosi"
      }
    ],
    "correct": "B",
    "explanation": "Fungsi pengangkutan (transportasi) memindahkan barang dari sentra produksi ke sentra konsumsi."
  },
  {
    "id": 16,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 16,
    "question": "Contoh saluran distribusi semi langsung dalam perdagangan hasil bumi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Petani memakan hasil panen padinya sendiri"
      },
      {
        "key": "B",
        "text": "Petani menjual beras kepada konsumen melalui toko resmi milik kelompok taninya sendiri"
      },
      {
        "key": "C",
        "text": "Petani menjual gabah ke tengkulak, lalu ke pedagang besar, ke pengecer, baru ke konsumen"
      },
      {
        "key": "D",
        "text": "Pabrik menjual mesin ke agen luar negeri"
      },
      {
        "key": "E",
        "text": "Pedagang keliling membeli sayur di pasar induk"
      }
    ],
    "correct": "B",
    "explanation": "Distribusi semi langsung menggunakan perantara yang merupakan bagian dari organisasi atau milik produsen itu sendiri."
  },
  {
    "id": 17,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 17,
    "question": "Pernyataan yang paling tepat mengenai keterkaitan antara kegiatan produksi, distribusi, dan konsumsi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Produksi dapat berjalan lancar meskipun tidak ada kegiatan distribusi"
      },
      {
        "key": "B",
        "text": "Ketiganya merupakan siklus yang saling bergantung; tanpa distribusi, barang produksi tidak akan bernilai guna bagi konsumen"
      },
      {
        "key": "C",
        "text": "Konsumsi selalu mendahului produksi dan tidak memerlukan saluran distribusi"
      },
      {
        "key": "D",
        "text": "Distribusi adalah kegiatan yang berdiri sendiri tanpa dipengaruhi oleh daya beli konsumen"
      },
      {
        "key": "E",
        "text": "Produksi hanya bertumpu pada sektor jasa tersier"
      }
    ],
    "correct": "B",
    "explanation": "Ketiga kegiatan ekonomi membentuk rantai nilai terpadu: produksi menciptakan barang, distribusi mengantarkan, dan konsumsi memanfaatkannya."
  },
  {
    "id": 18,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 18,
    "question": "Seorang perajin anyaman bambu di Martapura membutuhkan modal usaha, bahan baku bambu, dan tenaga kerja pembantu. Seluruh unsur tersebut dikategorikan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Faktor konsumsi"
      },
      {
        "key": "B",
        "text": "Input / Faktor produksi"
      },
      {
        "key": "C",
        "text": "Output produksi"
      },
      {
        "key": "D",
        "text": "Komoditas tersier"
      },
      {
        "key": "E",
        "text": "Barang bebas"
      }
    ],
    "correct": "B",
    "explanation": "Bahan baku, modal, tenaga kerja, dan keahlian merupakan input atau faktor-faktor yang digunakan dalam proses produksi."
  },
  {
    "id": 19,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 19,
    "question": "Perilaku konsumen yang rasional ditunjukkan oleh tindakan...",
    "options": [
      {
        "key": "A",
        "text": "Membeli barang karena tergiur potongan harga sesaat meskipun barang tersebut tidak dibutuhkan"
      },
      {
        "key": "B",
        "text": "Menyusun skala prioritas kebutuhan dan membandingkan harga serta kualitas barang sebelum membeli"
      },
      {
        "key": "C",
        "text": "Membeli barang mewah demi gengsi dan status sosial di lingkungan pergaulan"
      },
      {
        "key": "D",
        "text": "Menghabiskan seluruh uang saku untuk jajan di hari pertama"
      },
      {
        "key": "E",
        "text": "Memilih barang impor yang mahal daripada produk lokal yang mutunya sama"
      }
    ],
    "correct": "B",
    "explanation": "Konsumen rasional bertindak berdasarkan pertimbangan kebutuhan nyata, skala prioritas, serta perbandingan manfaat dan biaya."
  },
  {
    "id": 20,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 20,
    "question": "Salah satu indikator yang membedakan barang ekonomi dengan barang bebas adalah...",
    "options": [
      {
        "key": "A",
        "text": "Barang ekonomi memiliki wujud fisik, barang bebas tidak berwujud"
      },
      {
        "key": "B",
        "text": "Barang ekonomi memerlukan pengorbanan untuk memperolehnya, barang bebas tersedia melimpah dari alam"
      },
      {
        "key": "C",
        "text": "Barang ekonomi hanya diproduksi oleh BUMN, barang bebas oleh swasta"
      },
      {
        "key": "D",
        "text": "Barang ekonomi harganya tetap, barang bebas selalu berubah"
      },
      {
        "key": "E",
        "text": "Barang ekonomi tidak memiliki nilai guna sama sekali"
      }
    ],
    "correct": "B",
    "explanation": "Barang ekonomi jumlahnya terbatas dan butuh pengorbanan untuk mendapatkannya, sedangkan barang bebas (seperti udara/sinar matahari) tersedia melimpah."
  },
  {
    "id": 21,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 21,
    "question": "Di sebuah desa di Madang Suku II, limbah sekam padi dari penggilingan diolah menjadi briket bahan bakar ramah lingkungan. Nilai guna yang tercipta pada peristiwa ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Form Utility (Nilai guna bentuk)"
      },
      {
        "key": "B",
        "text": "Place Utility (Nilai guna tempat)"
      },
      {
        "key": "C",
        "text": "Time Utility (Nilai guna waktu)"
      },
      {
        "key": "D",
        "text": "Ownership Utility (Nilai guna kepemilikan)"
      },
      {
        "key": "E",
        "text": "Element Utility (Nilai guna unsur)"
      }
    ],
    "correct": "A",
    "explanation": "Form utility terjadi ketika suatu benda ditingkatkan nilai gunanya setelah diubah bentuk dan fungsinya (dari sekam menjadi briket)."
  },
  {
    "id": 22,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 22,
    "question": "Gabah kering giling yang disimpan di lumbung desa saat musim panen raya lalu dijual beberapa bulan kemudian saat harga membaik memiliki keunggulan nilai guna...",
    "options": [
      {
        "key": "A",
        "text": "Form utility"
      },
      {
        "key": "B",
        "text": "Place utility"
      },
      {
        "key": "C",
        "text": "Time utility (Nilai guna waktu)"
      },
      {
        "key": "D",
        "text": "Service utility"
      },
      {
        "key": "E",
        "text": "Ownership utility"
      }
    ],
    "correct": "C",
    "explanation": "Time utility adalah peningkatan nilai guna barang karena digunakan atau dijual pada waktu yang tepat."
  },
  {
    "id": 23,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 23,
    "question": "Agen pupuk resmi di kecamatan menyalurkan pupuk bersubsidi dari gudang produsen pupuk ke kelompok tani. Peran agen dalam alur distribusi ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Konsumen perantara"
      },
      {
        "key": "B",
        "text": "Lembaga perantara distribusi pedagang besar/khusus"
      },
      {
        "key": "C",
        "text": "Produsen pupuk nasional"
      },
      {
        "key": "D",
        "text": "Pengecer eceran mikro"
      },
      {
        "key": "E",
        "text": "Regulator sistem pasar"
      }
    ],
    "correct": "B",
    "explanation": "Agen bertindak sebagai perantara yang menyalurkan barang atas nama produsen kepada pembeli atau kelompok tani."
  },
  {
    "id": 24,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 24,
    "question": "Jika pendapatan masyarakat di suatu daerah meningkat, kecenderungan yang umumnya terjadi pada pola konsumsi makanan pokok adalah...",
    "options": [
      {
        "key": "A",
        "text": "Porsi pengeluaran untuk makanan pokok akan melonjak jauh melebihi barang tersier"
      },
      {
        "key": "B",
        "text": "Persentase pengeluaran untuk kebutuhan makanan cenderung menurun, sedangkan pengeluaran untuk barang sekunder/tersier meningkat (Hukum Engel)"
      },
      {
        "key": "C",
        "text": "Masyarakat berhenti mengonsumsi beras sama sekali"
      },
      {
        "key": "D",
        "text": "Pola konsumsi tidak terpengaruh oleh pendapatan"
      },
      {
        "key": "E",
        "text": "Pengeluaran tabungan menjadi nol"
      }
    ],
    "correct": "B",
    "explanation": "Hukum Engel menyatakan bahwa seiring naiknya pendapatan, proporsi belanja untuk makanan cenderung menurun sedangkan proporsi untuk non-makanan meningkat."
  },
  {
    "id": 25,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 25,
    "question": "Seorang wirausahawan pemula memproduksi keripik tempe. Yang termasuk biaya tetap (fixed cost) dalam usaha produksinya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kedelai dan ragi"
      },
      {
        "key": "B",
        "text": "Minyak goreng"
      },
      {
        "key": "C",
        "text": "Biaya sewa tempat dan penyusutan mesin pemotong"
      },
      {
        "key": "D",
        "text": "Kemasan plastik"
      },
      {
        "key": "E",
        "text": "Upah lembur harian pekerja"
      }
    ],
    "correct": "C",
    "explanation": "Fixed cost adalah biaya yang jumlahnya tidak berubah meskipun volume produksi naik atau turun, seperti sewa tempat dan penyusutan alat."
  },
  {
    "id": 26,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 26,
    "question": "Biaya variabel (variable cost) dalam operasional usaha jasa cuci motor di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sewa ruko tahunan"
      },
      {
        "key": "B",
        "text": "Gaji manajer tetap"
      },
      {
        "key": "C",
        "text": "Shampo motor, air, dan sabun pembersih"
      },
      {
        "key": "D",
        "text": "Biaya izin usaha"
      },
      {
        "key": "E",
        "text": "Penyusutan kompresor angin"
      }
    ],
    "correct": "C",
    "explanation": "Biaya variabel berubah sebanding dengan volume jasa/barang yang dikerjakan (makin banyak motor dicuci, makin banyak shampo/air dipakai)."
  },
  {
    "id": 27,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 27,
    "question": "Hukum pertambahan hasil yang semakin berkurang (The Law of Diminishing Marginal Returns) dikemukakan oleh...",
    "options": [
      {
        "key": "A",
        "text": "Adam Smith"
      },
      {
        "key": "B",
        "text": "David Ricardo"
      },
      {
        "key": "C",
        "text": "John Maynard Keynes"
      },
      {
        "key": "D",
        "text": "Alfred Marshall"
      },
      {
        "key": "E",
        "text": "Karl Marx"
      }
    ],
    "correct": "B",
    "explanation": "David Ricardo mengemukakan The Law of Diminishing Returns, di mana penambahan input variabel terus-menerus pada input tetap akhirnya menurunkan hasil marjinal."
  },
  {
    "id": 28,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 28,
    "question": "Sektor ekonomi yang berperan sebagai 'jembatan' yang mempertemukan produsen bahan baku dan industri manufaktur dengan konsumen pemakai akhir adalah...",
    "options": [
      {
        "key": "A",
        "text": "Sektor primer"
      },
      {
        "key": "B",
        "text": "Sektor sekunder"
      },
      {
        "key": "C",
        "text": "Sektor tersier"
      },
      {
        "key": "D",
        "text": "Sektor tradisional"
      },
      {
        "key": "E",
        "text": "Sektor agrikultur"
      }
    ],
    "correct": "C",
    "explanation": "Sektor tersier (perdagangan, transportasi, logistik) menjembatani arus barang dari hulu (produsen) ke hilir (konsumen)."
  },
  {
    "id": 29,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 29,
    "question": "Suatu kegiatan ekonomi dikatakan efektif dan efisien apabila...",
    "options": [
      {
        "key": "A",
        "text": "Menghasilkan barang sebanyak-banyaknya tanpa memedulikan biaya yang terbuang"
      },
      {
        "key": "B",
        "text": "Mencapai target output yang direncanakan dengan pengorbanan biaya dan waktu seminimal mungkin"
      },
      {
        "key": "C",
        "text": "Hanya menggunakan tenaga kerja manual tanpa bantuan teknologi"
      },
      {
        "key": "D",
        "text": "Menjual produk dengan harga setinggi mungkin kepada konsumen miskin"
      },
      {
        "key": "E",
        "text": "Menghabiskan modal usaha dalam waktu singkat"
      }
    ],
    "correct": "B",
    "explanation": "Efisien berarti meminimalkan pemborosan sumber daya (biaya/waktu), sedangkan efektif berarti tepat mencapai tujuan atau target yang ditentukan."
  },
  {
    "id": 30,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 30,
    "question": "Karakteristik utama barang substitusi dalam konsumsi sehari-hari adalah...",
    "options": [
      {
        "key": "A",
        "text": "Barang yang saling melengkapi pemakaiannya (seperti kopi dan gula)"
      },
      {
        "key": "B",
        "text": "Barang yang dapat saling menggantikan fungsinya (seperti jagung menggantikan beras)"
      },
      {
        "key": "C",
        "text": "Barang yang hanya bisa dikonsumsi oleh kalangan elit"
      },
      {
        "key": "D",
        "text": "Barang yang tidak memiliki nilai jual di pasar"
      },
      {
        "key": "E",
        "text": "Barang yang harus dibeli bersamaan"
      }
    ],
    "correct": "B",
    "explanation": "Barang substitusi adalah barang pengganti yang memiliki fungsi serupa (misal: beras dan jagung, teh dan kopi)."
  },
  {
    "id": 31,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 31,
    "question": "Berikut ini yang merupakan contoh barang komplementer adalah...",
    "options": [
      {
        "key": "A",
        "text": "Beras dengan singkong"
      },
      {
        "key": "B",
        "text": "Bensin dengan sepeda motor"
      },
      {
        "key": "C",
        "text": "Pulpen dengan pensil"
      },
      {
        "key": "D",
        "text": "Ikan nila dengan ikan patin"
      },
      {
        "key": "E",
        "text": "Minyak goreng dengan mentega"
      }
    ],
    "correct": "B",
    "explanation": "Barang komplementer adalah barang yang saling melengkapi; sepeda motor tidak dapat berjalan tanpa bensin."
  },
  {
    "id": 32,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 32,
    "question": "Tindakan spekulasi ekonomi seperti menimbun beras saat panen raya demi menaikkan harga secara tidak wajar merupakan tindakan yang...",
    "options": [
      {
        "key": "A",
        "text": "Menciptakan efisiensi pasar yang sempurna"
      },
      {
        "key": "B",
        "text": "Merugikan konsumen, melanggar etika bisnis, dan mengacaukan stabilitas distribusi pangan"
      },
      {
        "key": "C",
        "text": "Sangat dianjurkan dalam teori ekonomi modern"
      },
      {
        "key": "D",
        "text": "Membantu petani kecil meningkatkan kesejahteraan"
      },
      {
        "key": "E",
        "text": "Merupakan bagian dari sektor primer resmi"
      }
    ],
    "correct": "B",
    "explanation": "Penimbunan spekulatif merusak mekanisme distribusi yang adil, menciptakan kelangkaan semu, dan merugikan masyarakat luas."
  },
  {
    "id": 33,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 33,
    "question": "Peran Rumah Tangga Produsen (RTP) dalam kaitannya dengan penerimaan pemerintah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menerima gaji dari kas negara"
      },
      {
        "key": "B",
        "text": "Membayar pajak badan usaha / pajak penghasilan perusahaan ke kas negara"
      },
      {
        "key": "C",
        "text": "Menyusun undang-undang ketenagakerjaan"
      },
      {
        "key": "D",
        "text": "Mencetak uang kertas Rupiah"
      },
      {
        "key": "E",
        "text": "Mengatur suku bunga acuan kredit"
      }
    ],
    "correct": "B",
    "explanation": "RTP memberikan kontribusi penerimaan negara melalui pembayaran pajak badan, pajak ekspor, dan retribusi usaha."
  },
  {
    "id": 34,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 34,
    "question": "Di era digital saat ini, saluran distribusi online melalui marketplace dan media sosial terbukti...",
    "options": [
      {
        "key": "A",
        "text": "Menambah panjang rantai perantara sehingga harga barang makin mahal"
      },
      {
        "key": "B",
        "text": "Memperpendek rantai distribusi, mempercepat transaksi, dan menghubungkan produsen desa langsung ke konsumen nasional"
      },
      {
        "key": "C",
        "text": "Menghilangkan kegiatan produksi pangan secara total"
      },
      {
        "key": "D",
        "text": "Hanya menguntungkan pihak luar negeri"
      },
      {
        "key": "E",
        "text": "Membuat barang produksi kehilangan kualitas aslinya"
      }
    ],
    "correct": "B",
    "explanation": "Digitalisasi memotong mata rantai distribusi yang berliku (disintermediasi), sehingga produsen mendapat margin lebih baik dan konsumen harga wajar."
  },
  {
    "id": 35,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 35,
    "question": "Prinsip ekonomi yang benar menyatakan bahwa manusia bertindak ekonomi dengan...",
    "options": [
      {
        "key": "A",
        "text": "Pengorbanan sekecil-kecilnya untuk memperoleh hasil yang sebesar-besarnya tanpa batas"
      },
      {
        "key": "B",
        "text": "Pengorbanan tertentu untuk memperoleh hasil yang maksimal, atau hasil tertentu dengan pengorbanan seminimal mungkin"
      },
      {
        "key": "C",
        "text": "Menghamburkan seluruh modal demi laba instan"
      },
      {
        "key": "D",
        "text": "Menghindari segala macam bentuk risiko dengan tidak bekerja"
      },
      {
        "key": "E",
        "text": "Membeli barang mewah agar dihormati masyarakat"
      }
    ],
    "correct": "B",
    "explanation": "Prinsip ekonomi yang tepat adalah: dengan pengorbanan tertentu untuk memperoleh hasil maksimal, atau hasil tertentu dengan pengorbanan rasional seminimal mungkin."
  },
  {
    "id": 36,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 36,
    "question": "Seorang pengusaha penggilingan padi merekrut 10 tenaga kerja lokal dan membeli mesin pemisah batu modern. Kombinasi faktor produksi ini bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menurunkan kualitas beras agar cepat laku"
      },
      {
        "key": "B",
        "text": "Meningkatkan produktivitas, mutu produk, dan efisiensi waktu kerja"
      },
      {
        "key": "C",
        "text": "Menghentikan peredaran gabah di pasar"
      },
      {
        "key": "D",
        "text": "Menambah biaya produksi setinggi mungkin"
      },
      {
        "key": "E",
        "text": "Menghindari pencatatan pembukuan kas"
      }
    ],
    "correct": "B",
    "explanation": "Perpaduan teknologi mesin dan tenaga kerja terlatih meningkatkan efisiensi dan kualitas output yang dihasilkan."
  },
  {
    "id": 37,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 37,
    "question": "Aktivitas pemeliharaan ikan patin dalam kolam tanah di Desa Karang Anyar OKU Timur termasuk dalam subsektor...",
    "options": [
      {
        "key": "A",
        "text": "Perikanan tangkap laut"
      },
      {
        "key": "B",
        "text": "Perikanan budidaya air tawar (Akuakultur)"
      },
      {
        "key": "C",
        "text": "Pertambangan air"
      },
      {
        "key": "D",
        "text": "Industri kimia"
      },
      {
        "key": "E",
        "text": "Sektor pariwisata bahari"
      }
    ],
    "correct": "B",
    "explanation": "Pemeliharaan ikan di kolam/tambak darat tergolong perikanan budidaya air tawar (akuakultur) di sektor primer."
  },
  {
    "id": 38,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 38,
    "question": "Hubungan timbal balik antara rumah tangga konsumen dan rumah tangga produsen di pasar faktor produksi melibatkan...",
    "options": [
      {
        "key": "A",
        "text": "Arus barang jadi dari produsen ke konsumen"
      },
      {
        "key": "B",
        "text": "Arus penyerahan tenaga kerja/lahan dari konsumen dan arus uang balas jasa (gaji/sewa) dari produsen"
      },
      {
        "key": "C",
        "text": "Arus ekspor impor barang luar negeri"
      },
      {
        "key": "D",
        "text": "Arus penarikan pajak oleh bank sentral"
      },
      {
        "key": "E",
        "text": "Arus pembagian dividen koperasi"
      }
    ],
    "correct": "B",
    "explanation": "Di pasar faktor produksi, RTK menawarkan tanah/tenaga kerja dan RTP membayar upah/sewa sebagai balas jasanya."
  },
  {
    "id": 39,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 39,
    "question": "Dampak positif dari kelancaran jalur distribusi pangan dari OKU Timur ke kota Palembang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Terjadinya inflasi tinggi di sentra produksi"
      },
      {
        "key": "B",
        "text": "Harga beras di kota tetap stabil dan hasil panen petani desa terserap dengan harga yang layak"
      },
      {
        "key": "C",
        "text": "Petani dilarang menjual hasil panennya ke luar daerah"
      },
      {
        "key": "D",
        "text": "Terjadi penumpukan gabah yang membusuk di gudang desa"
      },
      {
        "key": "E",
        "text": "Biaya logistik melonjak tanpa kendali"
      }
    ],
    "correct": "B",
    "explanation": "Distribusi yang lancar menjaga stabilitas pasokan pangan di perkotaan dan kepastian harga bagi petani di pedesaan."
  },
  {
    "id": 40,
    "day": 1,
    "indicatorCode": "A",
    "indicatorKey": "ind_kegiatan_ekonomi",
    "indicatorName": "Kegiatan Ekonomi & 3 Sektor Aktivitas",
    "numberInIndicator": 40,
    "question": "Karakteristik penting dari seorang produsen yang memiliki etika bisnis yang baik adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengurangi timbangan demi mengejar keuntungan pribadi"
      },
      {
        "key": "B",
        "text": "Menjaga kualitas kejujuran produk, ramah lingkungan, dan adil terhadap pekerja serta konsumen"
      },
      {
        "key": "C",
        "text": "Menggunakan zat pewarna berbahaya agar produk tampak cerah"
      },
      {
        "key": "D",
        "text": "Memaksa pembeli membeli dalam jumlah banyak"
      },
      {
        "key": "E",
        "text": "Menolak mencatat transaksi pemasukan dan pengeluaran"
      }
    ],
    "correct": "B",
    "explanation": "Etika produsen mencakup kejujuran timbangan, keamanan pangan bagi konsumen, serta kelestarian lingkungan dan keadilan tenaga kerja."
  },
  {
    "id": 41,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 1,
    "question": "Menurut Otoritas Jasa Keuangan (OJK), yang dimaksud dengan literasi keuangan (financial literacy) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kemampuan mencetak uang kertas sendiri"
      },
      {
        "key": "B",
        "text": "Pengetahuan, keterampilan, dan keyakinan yang mempengaruhi sikap untuk meningkatkan kualitas pengambilan keputusan keuangan demi mencapai kesejahteraan"
      },
      {
        "key": "C",
        "text": "Kemampuan meminjam uang sebanyak-banyaknya dari bank"
      },
      {
        "key": "D",
        "text": "Kegiatan menimbun uang tunai di bawah kasur"
      },
      {
        "key": "E",
        "text": "Keahlian berdagang saham spekulatif tanpa izin"
      }
    ],
    "correct": "B",
    "explanation": "Literasi keuangan mencakup pengetahuan, keyakinan, dan keterampilan dalam mengelola keuangan untuk mencapai stabilitas dan kesejahteraan finansial."
  },
  {
    "id": 42,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 2,
    "question": "Klasifikasi keuangan yang berfokus pada perencanaan anggaran belanja keluarga, tabungan pendidikan, dan proteksi asuransi anggota rumah tangga tergolong...",
    "options": [
      {
        "key": "A",
        "text": "Public Finance (Keuangan Negara)"
      },
      {
        "key": "B",
        "text": "Corporate Finance (Keuangan Korporasi)"
      },
      {
        "key": "C",
        "text": "Personal Finance (Keuangan Pribadi/Keluarga)"
      },
      {
        "key": "D",
        "text": "International Finance"
      },
      {
        "key": "E",
        "text": "Fiscal Policy"
      }
    ],
    "correct": "C",
    "explanation": "Personal Finance (keuangan pribadi) mengatur manajemen uang individu dan rumah tangga, mencakup anggaran, tabungan, dan proteksi."
  },
  {
    "id": 43,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 3,
    "question": "Pengelolaan keuangan yang berhubungan dengan penerimaan APBD, pajak daerah, dan alokasi anggaran pembangunan jalan oleh Pemerintah Daerah OKU Timur tergolong...",
    "options": [
      {
        "key": "A",
        "text": "Personal Finance"
      },
      {
        "key": "B",
        "text": "Public Finance (Keuangan Publik/Negara)"
      },
      {
        "key": "C",
        "text": "Corporate Finance"
      },
      {
        "key": "D",
        "text": "Micro Finance"
      },
      {
        "key": "E",
        "text": "Household Finance"
      }
    ],
    "correct": "B",
    "explanation": "Public Finance mempelajari pendapatan, belanja, dan utang pemerintah dalam rangka pelayanan publik dan pembangunan wilayah."
  },
  {
    "id": 44,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 4,
    "question": "Seorang siswa SMA menerima uang saku mingguan sebesar Rp 100.000. Penerimaan ini dikategorikan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Arus kas keluar (Cash Outflow)"
      },
      {
        "key": "B",
        "text": "Arus kas masuk (Cash Inflow)"
      },
      {
        "key": "C",
        "text": "Utang jangka panjang"
      },
      {
        "key": "D",
        "text": "Beban penyusutan"
      },
      {
        "key": "E",
        "text": "Aset tidak lancar"
      }
    ],
    "correct": "B",
    "explanation": "Cash inflow adalah seluruh penerimaan uang tunai yang menambah saldo kas."
  },
  {
    "id": 45,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 5,
    "question": "Dalam metode penganggaran populer 50/30/20, alokasi 50% dari pemasukan bersih idealnya digunakan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Kebutuhan pokok sehari-hari (Needs)"
      },
      {
        "key": "B",
        "text": "Keinginan dan hiburan (Wants)"
      },
      {
        "key": "C",
        "text": "Tabungan dan investasi masa depan (Savings)"
      },
      {
        "key": "D",
        "text": "Membayar denda keterlambatan"
      },
      {
        "key": "E",
        "text": "Membeli barang bermerek"
      }
    ],
    "correct": "A",
    "explanation": "Aturan 50/30/20: 50% untuk kebutuhan dasar (makan, transportasi, tagihan), 30% untuk keinginan, dan 20% untuk tabungan/investasi/dana darurat."
  },
  {
    "id": 46,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 6,
    "question": "Alokasi 20% dalam formula budgeting 50/30/20 difokuskan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Jajan makanan cepat saji"
      },
      {
        "key": "B",
        "text": "Membeli pakaian pesta model terbaru"
      },
      {
        "key": "C",
        "text": "Membangun dana darurat, tabungan, dan investasi masa depan"
      },
      {
        "key": "D",
        "text": "Membayar ongkos nongkrong bersama teman"
      },
      {
        "key": "E",
        "text": "Membeli skin game online"
      }
    ],
    "correct": "C",
    "explanation": "Porsi 20% adalah pos pembentukan ketahanan masa depan: dana darurat, cicilan utang produktif, tabungan, dan investasi."
  },
  {
    "id": 47,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 7,
    "question": "Fungsi utama dari pembentukan Dana Darurat (Emergency Fund) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Untuk modal liburan mewah di akhir tahun"
      },
      {
        "key": "B",
        "text": "Sebagai penyangga finansial saat terjadi musibah tak terduga (sakit mendadak, kehilangan pekerjaan, bencana)"
      },
      {
        "key": "C",
        "text": "Untuk membeli gadget baru yang sedang viral"
      },
      {
        "key": "D",
        "text": "Dihabiskan saat ada diskon besar di toko daring"
      },
      {
        "key": "E",
        "text": "Sebagai jaminan pinjaman konsumtif"
      }
    ],
    "correct": "B",
    "explanation": "Dana darurat dirancang khusus untuk membiayai situasi krisis tak terduga tanpa harus berutang atau menjual aset berharga."
  },
  {
    "id": 48,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 8,
    "question": "Besaran ideal dana darurat bagi seorang individu yang belum berkeluarga umumnya berkisar antara...",
    "options": [
      {
        "key": "A",
        "text": "1 kali gaji harian"
      },
      {
        "key": "B",
        "text": "3 sampai 6 kali pengeluaran rutin bulanan"
      },
      {
        "key": "C",
        "text": "10 kali pendapatan kotor tahunan"
      },
      {
        "key": "D",
        "text": "Tidak memerlukan dana darurat sama sekali"
      },
      {
        "key": "E",
        "text": "Cukup Rp 50.000 saja"
      }
    ],
    "correct": "B",
    "explanation": "Standar perencana keuangan merekomendasikan dana darurat sebesar 3-6 kali pengeluaran bulanan bagi lajang, dan 6-12 kali bagi yang berkeluarga."
  },
  {
    "id": 49,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 9,
    "question": "Perbedaan mendasar antara 'Kebutuhan' (Needs) dan 'Keinginan' (Wants) dalam pengelolaan keuangan pribadi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kebutuhan jika tidak dipenuhi akan mengganggu kelangsungan hidup, sedangkan keinginan jika tidak dipenuhi hidup tetap berjalan baik"
      },
      {
        "key": "B",
        "text": "Kebutuhan harganya selalu mahal, keinginan selalu murah"
      },
      {
        "key": "C",
        "text": "Kebutuhan hanya dimiliki orang tua, keinginan hanya dimiliki remaja"
      },
      {
        "key": "D",
        "text": "Keduanya memiliki prioritas yang sama persis"
      },
      {
        "key": "E",
        "text": "Kebutuhan tidak perlu dianggarkan"
      }
    ],
    "correct": "A",
    "explanation": "Kebutuhan esensial untuk bertahan hidup dan bekerja (makan, tempat tinggal, kesehatan), sedangkan keinginan bersifat pelengkap kepuasan diri."
  },
  {
    "id": 50,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 10,
    "question": "Seorang petani karet di Semendawai Barat menyisihkan sebagian hasil sadapan setiap minggu ke rekening bank. Manfaat menabung di lembaga perbankan resmi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Uang dijamin oleh LPS (Lembaga Penjamin Simpanan), aman dari risiko pencurian/kebakaran, dan tercatat rapi"
      },
      {
        "key": "B",
        "text": "Uang akan berlipat ganda menjadi 100 kali dalam sebulan"
      },
      {
        "key": "C",
        "text": "Bebas dari segala macam potongan administrasi selamanya"
      },
      {
        "key": "D",
        "text": "Dapat ditarik oleh siapa saja tanpa kartu identitas"
      },
      {
        "key": "E",
        "text": "Tidak memiliki bunga simpanan"
      }
    ],
    "correct": "A",
    "explanation": "Menabung di bank resmi dijamin oleh LPS hingga Rp 2 miliar per nasabah per bank, aman dari bahaya fisik, dan mempermudah rekam jejak keuangan."
  },
  {
    "id": 51,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 11,
    "question": "Kenaikan harga barang dan jasa secara umum dan terus-menerus yang menyebabkan penurunan daya beli uang disebut...",
    "options": [
      {
        "key": "A",
        "text": "Deflasi"
      },
      {
        "key": "B",
        "text": "Inflasi"
      },
      {
        "key": "C",
        "text": "Devaluasi"
      },
      {
        "key": "D",
        "text": "Apresiasi"
      },
      {
        "key": "E",
        "text": "Depresiasi"
      }
    ],
    "correct": "B",
    "explanation": "Inflasi adalah kecenderungan naiknya harga-harga secara umum dan berkelanjutan, yang mengikis nilai riil uang dari waktu ke waktu."
  },
  {
    "id": 52,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 12,
    "question": "Jika laju inflasi rata-rata 4% per tahun dan bunga tabungan biasa hanya 1% per tahun, maka nilai riil uang tabungan Anda setelah dipotong pajak dan inflasi akan...",
    "options": [
      {
        "key": "A",
        "text": "Mengalami peningkatan daya beli yang tinggi"
      },
      {
        "key": "B",
        "text": "Mengalami penurunan daya beli secara riil (tergerus inflasi)"
      },
      {
        "key": "C",
        "text": "Tetap stabil tidak terpengaruh"
      },
      {
        "key": "D",
        "text": "Menggandakan kekayaan secara instan"
      },
      {
        "key": "E",
        "text": "Menjadi nol dalam setahun"
      }
    ],
    "correct": "B",
    "explanation": "Jika imbal hasil simpanan lebih rendah dari tingkat inflasi, daya beli uang tabungan secara riil akan menurun seiring waktu."
  },
  {
    "id": 53,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 13,
    "question": "Prinsip dasar investasi 'High Risk, High Return' memiliki makna bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Instrumen investasi yang berpotensi menghasilkan keuntungan tinggi umumnya juga disertai risiko kerugian yang tinggi pula"
      },
      {
        "key": "B",
        "text": "Investasi yang aman dari risiko pasti memberikan keuntungan paling besar"
      },
      {
        "key": "C",
        "text": "Semua jenis investasi pasti menghasilkan keuntungan tanpa risiko"
      },
      {
        "key": "D",
        "text": "Risiko tinggi dapat dihilangkan dengan meminjam uang di rentenir"
      },
      {
        "key": "E",
        "text": "Investor pemula sebaiknya langsung memilih instrumen berisiko tertinggi"
      }
    ],
    "correct": "A",
    "explanation": "High Risk High Return menyatakan hubungan searah antara potensi laba dan risiko: peluang laba besar sebanding dengan potensi rugi yang besar."
  },
  {
    "id": 54,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 14,
    "question": "Contoh instrumen investasi yang tergolong berisiko rendah dan cocok untuk pemula adalah...",
    "options": [
      {
        "key": "A",
        "text": "Saham gorengan di pasar spekulatif"
      },
      {
        "key": "B",
        "text": "Kripto aset yang fluktuatif"
      },
      {
        "key": "C",
        "text": "Deposito perbankan dan Surat Berharga Negara (SBN) ritel"
      },
      {
        "key": "D",
        "text": "Trading valas ilegal dengan leverage tinggi"
      },
      {
        "key": "E",
        "text": "Arisan berantai tanpa legalitas"
      }
    ],
    "correct": "C",
    "explanation": "Deposito bank yang dijamin LPS dan SBN yang dijamin negara merupakan contoh instrumen berisiko sangat rendah yang aman bagi pemula."
  },
  {
    "id": 55,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 15,
    "question": "Tindakan mendiversifikasi investasi dengan pepatah 'Jangan menaruh semua telur dalam satu keranjang' bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mempercepat proses transaksi"
      },
      {
        "key": "B",
        "text": "Meminimalkan risiko kerugian total jika salah satu instrumen mengalami kejatuhan"
      },
      {
        "key": "C",
        "text": "Membayar pajak lebih banyak ke pemerintah"
      },
      {
        "key": "D",
        "text": "Menghindari pencatatan pembukuan kas"
      },
      {
        "key": "E",
        "text": "Menghabiskan modal usaha sekaligus"
      }
    ],
    "correct": "B",
    "explanation": "Diversifikasi menyebarkan dana ke berbagai jenis aset (misal: emas, reksadana, deposito) agar kerugian di satu aset dapat ditutup oleh keuntungan di aset lain."
  },
  {
    "id": 56,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 16,
    "question": "Perbedaan mendasar antara 'Utang Produktif' dan 'Utang Konsumtif' adalah...",
    "options": [
      {
        "key": "A",
        "text": "Utang produktif digunakan untuk menghasilkan arus kas/keuntungan baru, sedangkan utang konsumtif digunakan untuk membeli barang yang nilainya menyusut tanpa menghasilkan pendapatan"
      },
      {
        "key": "B",
        "text": "Utang produktif bunganya lebih tinggi dari utang rentenir"
      },
      {
        "key": "C",
        "text": "Utang konsumtif selalu dijamin oleh pemerintah"
      },
      {
        "key": "D",
        "text": "Utang produktif hanya boleh dipinjam oleh pejabat"
      },
      {
        "key": "E",
        "text": "Keduanya memiliki dampak yang sama bagi kekayaan"
      }
    ],
    "correct": "A",
    "explanation": "Utang produktif menghasilkan nilai tambah atau pendapatan (misal modal beli mesin panen), sedangkan utang konsumtif menghabiskan uang untuk kepuasan sesaat (misal beli HP terbaru demi gaya)."
  },
  {
    "id": 57,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 17,
    "question": "Batas aman rasio cicilan utang bulanan terhadap total pendapatan bulanan (Debt Service Ratio) yang dianjurkan perencana keuangan adalah maksimal...",
    "options": [
      {
        "key": "A",
        "text": "100% dari penghasilan"
      },
      {
        "key": "B",
        "text": "70% dari penghasilan"
      },
      {
        "key": "C",
        "text": "30% sampai 35% dari penghasilan"
      },
      {
        "key": "D",
        "text": "Tidak ada batas maksimal"
      },
      {
        "key": "E",
        "text": "10% dari tabungan darurat"
      }
    ],
    "correct": "C",
    "explanation": "Rasio beban cicilan utang maksimal yang sehat adalah 30-35% dari total pemasukan rutin agar arus kas tidak terancam macet."
  },
  {
    "id": 58,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 18,
    "question": "Bahaya utama dari jeratan Pinjaman Online Ilegal (Pinjol Ilegal) bagi masyarakat desa adalah...",
    "options": [
      {
        "key": "A",
        "text": "Bunga sangat rendah dan tenor sangat panjang"
      },
      {
        "key": "B",
        "text": "Bunga harian mencekik, biaya administrasi tersembunyi, teror penagihan kasar, dan penyebaran data pribadi"
      },
      {
        "key": "C",
        "text": "Diawasi ketat oleh OJK dan Bank Indonesia"
      },
      {
        "key": "D",
        "text": "Memberikan modal usaha gratis tanpa perlu dikembalikan"
      },
      {
        "key": "E",
        "text": "Membantu meningkatkan skor kredit perbankan"
      }
    ],
    "correct": "B",
    "explanation": "Pinjol ilegal tidak terdaftar di OJK, menetapkan bunga tinggi tanpa batas, melakukan teror psikologis, dan menyalahgunakan kontak HP nasabah."
  },
  {
    "id": 59,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 19,
    "question": "Lembaga resmi di Indonesia yang bertugas mengawasi, mengatur, dan melindungi konsumen sektor jasa keuangan (perbankan, pasar modal, asuransi, leasing) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Badan Pusat Statistik (BPS)"
      },
      {
        "key": "B",
        "text": "Otoritas Jasa Keuangan (OJK)"
      },
      {
        "key": "C",
        "text": "Kementerian Hukum dan HAM"
      },
      {
        "key": "D",
        "text": "Komisi Pemilihan Umum (KPU)"
      },
      {
        "key": "E",
        "text": "Kementerian Perdagangan"
      }
    ],
    "correct": "B",
    "explanation": "OJK (Otoritas Jasa Keuangan) adalah lembaga independen yang berwenang mengatur, mengawasi, memeriksa, dan melindungi konsumen di sektor jasa keuangan."
  },
  {
    "id": 60,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 20,
    "question": "Untuk memastikan apakah sebuah entitas penawaran investasi atau pinjaman daring itu legal, masyarakat dapat memeriksa status perizinannya melalui kanal resmi...",
    "options": [
      {
        "key": "A",
        "text": "Media sosial tanpa centang biru"
      },
      {
        "key": "B",
        "text": "Kontak OJK 157 dan situs resmi www.ojk.go.id"
      },
      {
        "key": "C",
        "text": "Brosur yang ditempel di tiang listrik"
      },
      {
        "key": "D",
        "text": "Grup obrolan WhatsApp yang menjanjikan keuntungan kilat"
      },
      {
        "key": "E",
        "text": "Komentar akun anonim di internet"
      }
    ],
    "correct": "B",
    "explanation": "Masyarakat dapat mengecek legalitas lembaga keuangan melalui Kontak OJK 157, WhatsApp resmi OJK 081157157157, atau web resmi OJK."
  },
  {
    "id": 61,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 21,
    "question": "Pernyataan berikut ini yang merupakan ciri-ciri investasi bodong / penipuan finansial adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjanjikan imbal hasil keuntungan sangat tinggi dalam waktu singkat dan bebas risiko sama sekali"
      },
      {
        "key": "B",
        "text": "Memiliki izin edar resmi dari OJK dan Bappebti"
      },
      {
        "key": "C",
        "text": "Menjelaskan potensi risiko kerugian secara transparan"
      },
      {
        "key": "D",
        "text": "Memiliki kantor operasional dan pengurus yang jelas"
      },
      {
        "key": "E",
        "text": "Imbal hasil yang ditawarkan masuk akal sesuai suku bunga pasar"
      }
    ],
    "correct": "A",
    "explanation": "Investasi bodong selalu memikat korban dengan prinsip 2L palsu (tidak Logis dan tidak Legal): janji untung besar instan tanpa risiko."
  },
  {
    "id": 62,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 22,
    "question": "Seorang siswa yang bijak dalam mengelola uang sakunya akan melakukan langkah pertama, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Membeli barang yang sedang tren di media sosial"
      },
      {
        "key": "B",
        "text": "Mencatat pemasukan dan membuat rencana anggaran belanja mingguan sebelum uang dibelanjakan"
      },
      {
        "key": "C",
        "text": "Meminjamkan uang kepada teman tanpa batas"
      },
      {
        "key": "D",
        "text": "Menghabiskan uang saku untuk jajan di hari Senin"
      },
      {
        "key": "E",
        "text": "Mengabaikan sisa uang kembalian belanja"
      }
    ],
    "correct": "B",
    "explanation": "Langkah awal literasi keuangan pribadi adalah mencatat arus kas dan merencanakan alokasi anggaran (budgeting) sebelum berbelanja."
  },
  {
    "id": 63,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 23,
    "question": "Pencatatan pembukuan kas sederhana bagi pelaku UMKM memiliki manfaat penting, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Membuat usaha terlihat rumit dan menambah beban pikiran"
      },
      {
        "key": "B",
        "text": "Mengetahui posisi keuntungan bersih riil usaha dan memisahkan uang pribadi dengan uang operasional bisnis"
      },
      {
        "key": "C",
        "text": "Menghindari kewajiban membayar utang dagang"
      },
      {
        "key": "D",
        "text": "Agar bisa menarik modal usaha untuk foya-foya"
      },
      {
        "key": "E",
        "text": "Menolak konsumen yang ingin membayar tunai"
      }
    ],
    "correct": "B",
    "explanation": "Pembukuan memisahkan keuangan pribadi vs usaha, memberikan data laba rugi riil, dan menjadi syarat penting saat mengajukan kredit bank."
  },
  {
    "id": 64,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 24,
    "question": "Seorang pedagang kelontong di Belitang mencampurkan uang hasil penjualan warung dengan uang belanja dapur rumah tangganya di satu dompet yang sama. Risiko dari kebiasaan ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "Usaha akan berkembang sangat cepat"
      },
      {
        "key": "B",
        "text": "Modal usaha tanpa sadar terpakai untuk konsumsi pribadi sehingga bisnis terancam kekurangan modal kulakan (bubar)"
      },
      {
        "key": "C",
        "text": "Pencatatan pembukuan menjadi sangat rapi"
      },
      {
        "key": "D",
        "text": "Mendapat kemudahan pinjaman tanpa bunga dari bank"
      },
      {
        "key": "E",
        "text": "Tidak ada risiko sama sekali"
      }
    ],
    "correct": "B",
    "explanation": "Mencampur aduk keuangan pribadi dan bisnis adalah penyebab utama bangkrutnya UMKM karena modal kerja tergerus untuk konsumsi pribadi."
  },
  {
    "id": 65,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 25,
    "question": "Salah satu bentuk mitigasi risiko keuangan terhadap aset berharga (seperti rumah atau kendaraan bermotor) dari ancaman kebakaran atau kecelakaan adalah dengan...",
    "options": [
      {
        "key": "A",
        "text": "Menyimpan uang di brankas baja"
      },
      {
        "key": "B",
        "text": "Mengikutsertakan aset dalam program asuransi kerugian resmi"
      },
      {
        "key": "C",
        "text": "Menghindari pemakaian aset selamanya"
      },
      {
        "key": "D",
        "text": "Menjual aset dengan harga murah"
      },
      {
        "key": "E",
        "text": "Meminjamkan aset kepada tetangga"
      }
    ],
    "correct": "B",
    "explanation": "Asuransi adalah mekanisme pengalihan risiko finansial dari tertanggung kepada perusahaan asuransi dengan membayar premi berkala."
  },
  {
    "id": 66,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 26,
    "question": "Dalam transaksi perbankan digital, kode rahasia satu kali pakai yang dikirimkan melalui SMS/WhatsApp untuk otentikasi transaksi disebut...",
    "options": [
      {
        "key": "A",
        "text": "PIN Kartu"
      },
      {
        "key": "B",
        "text": "OTP (One-Time Password)"
      },
      {
        "key": "C",
        "text": "CVV/CVC"
      },
      {
        "key": "D",
        "text": "User ID"
      },
      {
        "key": "E",
        "text": "Nomor Rekening"
      }
    ],
    "correct": "B",
    "explanation": "OTP (One-Time Password) adalah kode verifikasi dinamis sekali pakai yang bersifat sangat rahasia untuk memvalidasi transaksi digital."
  },
  {
    "id": 67,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 27,
    "question": "Sikap keamanan digital yang paling tepat ketika menerima pesan dari nomor tak dikenal yang meminta kode OTP atau tautan APK dengan dalih kurir paket adalah...",
    "options": [
      {
        "key": "A",
        "text": "Segera mengirimkan kode OTP tersebut agar paket cepat sampai"
      },
      {
        "key": "B",
        "text": "Mengabaikan, memblokir nomor tersebut, dan tidak pernah membagikan OTP kepada siapa pun"
      },
      {
        "key": "C",
        "text": "Mengklik tautan APK dan memasukkan password akun bank"
      },
      {
        "key": "D",
        "text": "Meneruskan pesan ke seluruh grup keluarga"
      },
      {
        "key": "E",
        "text": "Menghubungi nomor tersebut dan memberikan nomor kartu ATM"
      }
    ],
    "correct": "B",
    "explanation": "Kode OTP, PIN, dan password bersifat rahasia mutlak. Membagikan OTP atau menginstal APK bodong memicu peretasan rekening (phishing/sniffing)."
  },
  {
    "id": 68,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 28,
    "question": "Skor kredit (credit score) yang tercatat dalam Sistem Layanan Informasi Keuangan (SLIK OJK) akan dinilai buruk apabila debitur...",
    "options": [
      {
        "key": "A",
        "text": "Selalu membayar cicilan pinjaman tepat waktu sebelum jatuh tempo"
      },
      {
        "key": "B",
        "text": "Mengalami keterlambatan atau menunggak pembayaran cicilan pokok dan bunga kredit"
      },
      {
        "key": "C",
        "text": "Tidak pernah berutang kepada rentenir"
      },
      {
        "key": "D",
        "text": "Menyimpan uang tabungan dalam jumlah besar"
      },
      {
        "key": "E",
        "text": "Memiliki usaha produktif yang menguntungkan"
      }
    ],
    "correct": "B",
    "explanation": "SLIK OJK mencatat riwayat kelancaran pembayaran kredit nasabah. Riwayat menunggak (kolektibilitas macet) merusak reputasi kredit di masa depan."
  },
  {
    "id": 69,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 29,
    "question": "Dampak buruk dari perilaku konsumtif yang berlebihan (*impulsive buying*) bagi masa depan generasi muda adalah...",
    "options": [
      {
        "key": "A",
        "text": "Memiliki aset produktif yang melimpah"
      },
      {
        "key": "B",
        "text": "Sulit membangun tabungan, rentan terjebak utang berbunga tinggi, dan tidak memiliki kesiapan finansial jangka panjang"
      },
      {
        "key": "C",
        "text": "Meningkatkan daya tahan terhadap inflasi"
      },
      {
        "key": "D",
        "text": "Mendapat penghargaan sebagai konsumen teladan"
      },
      {
        "key": "E",
        "text": "Menjadi investor yang sukses"
      }
    ],
    "correct": "B",
    "explanation": "Perilaku konsumtif impulsif menguras pendapatan untuk barang yang nilainya terdepresiasi, menyebabkan ketiadaan tabungan dan jeratan utang."
  },
  {
    "id": 70,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 30,
    "question": "Pernyataan yang tepat mengenai konsep 'Waktu adalah Uang' (*Time Value of Money*) dalam literasi keuangan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Nilai uang Rp 100.000 saat ini lebih berharga daripada nilai uang Rp 100.000 sepuluh tahun mendatang karena potensi pertumbuhan dan pengaruh inflasi"
      },
      {
        "key": "B",
        "text": "Nilai uang tidak pernah berubah sepanjang masa"
      },
      {
        "key": "C",
        "text": "Uang di masa depan selalu lebih tinggi daya belinya daripada uang hari ini"
      },
      {
        "key": "D",
        "text": "Waktu tidak memiliki pengaruh terhadap bunga pinjaman"
      },
      {
        "key": "E",
        "text": "Membeli barang hari ini pasti lebih rugi daripada menunda selamanya"
      }
    ],
    "correct": "A",
    "explanation": "Nilai waktu dari uang menyatakan bahwa sejumlah uang saat ini bernilai lebih tinggi dibanding jumlah yang sama di masa depan karena potensi hasil dan inflasi."
  },
  {
    "id": 71,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 31,
    "question": "Seorang petani padi membeli alat perontok padi (power thresher) seharga Rp 15.000.000 dengan memanfaatkan kredit usaha rakyat (KUR) berbunga rendah. Keputusan ini tergolong utang produktif karena...",
    "options": [
      {
        "key": "A",
        "text": "Menaikkan gengsi petani di mata warga desa"
      },
      {
        "key": "B",
        "text": "Mempercepat proses panen, menekan kehilangan gabah, dan menghasilkan pendapatan sewa jasa perontokan bagi petani lain"
      },
      {
        "key": "C",
        "text": "Dapat dibiarkan macet tanpa ditagih bank"
      },
      {
        "key": "D",
        "text": "Harga mesin akan turun drastis dalam setahun"
      },
      {
        "key": "E",
        "text": "Tidak memerlukan biaya perawatan"
      }
    ],
    "correct": "B",
    "explanation": "Utang tersebut menghasilkan efisiensi kerja dan pemasukan baru yang mampu membayar kembali cicilan pokok sekaligus memberi laba bersih."
  },
  {
    "id": 72,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 32,
    "question": "Seorang pelajar SMA membeli sepatu bermerek seharga Rp 2.500.000 menggunakan fasilitas PayLater (bayar nanti) padahal uang sakunya sebulan hanya Rp 400.000. Tindakan ini mencerminkan...",
    "options": [
      {
        "key": "A",
        "text": "Keputusan finansial yang cerdas dan visioner"
      },
      {
        "key": "B",
        "text": "Ketidakseimbangan literasi keuangan, terjebak utang konsumtif di luar kemampuan bayar, dan ancaman gagal bayar"
      },
      {
        "key": "C",
        "text": "Penerapan formula budgeting 50/30/20 yang tepat"
      },
      {
        "key": "D",
        "text": "Langkah investasi jangka panjang yang menguntungkan"
      },
      {
        "key": "E",
        "text": "Tindakan pencegahan inflasi yang efektif"
      }
    ],
    "correct": "B",
    "explanation": "Mengambil pinjaman konsumtif dengan cicilan melampaui kemampuan pendapatan adalah jebakan finansial yang memicu tunggakan dan denda tinggi."
  },
  {
    "id": 73,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 33,
    "question": "Berikut ini yang merupakan contoh pemasukan pasif (passive income) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Gaji bulanan dari bekerja sebagai buruh tani harian"
      },
      {
        "key": "B",
        "text": "Upah lembur mengemudikan traktor sawah"
      },
      {
        "key": "C",
        "text": "Bagi hasil dividen dari penyertaan modal di Koperasi dan imbal hasil bunga obligasi"
      },
      {
        "key": "D",
        "text": "Pendapatan dari menjual tenaga fisik seharian"
      },
      {
        "key": "E",
        "text": "Hadiah undian berhadiah sesaat"
      }
    ],
    "correct": "C",
    "explanation": "Pemasukan pasif diperoleh dari aset atau modal yang bekerja (dividen koperasi, royalti, sewa properti) tanpa menuntut kehadiran fisik aktif harian."
  },
  {
    "id": 74,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 34,
    "question": "Tujuan utama seseorang melakukan perencanaan pensiun (dana hari tua) sejak usia muda adalah...",
    "options": [
      {
        "key": "A",
        "text": "Agar bisa pensiun dan bermalas-malasan tanpa beribadah"
      },
      {
        "key": "B",
        "text": "Memastikan kemandirian finansial di masa tua tanpa menjadi beban generasi penerus (memutus rantai sandwich generation)"
      },
      {
        "key": "C",
        "text": "Menghindari pembayaran pajak penghasilan"
      },
      {
        "key": "D",
        "text": "Menghabiskan seluruh uang sebelum hari tua tiba"
      },
      {
        "key": "E",
        "text": "Membeli tanah di setiap desa"
      }
    ],
    "correct": "B",
    "explanation": "Perencanaan dana pensiun mandiri mencegah ketergantungan hidup pada anak/keluarga di masa depan sehingga memutus rantai generasi roti lapis."
  },
  {
    "id": 75,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 35,
    "question": "Dalam istilah perbankan, agunan atau jaminan kebendaan (seperti sertifikat tanah atau BPKB) yang diserahkan nasabah saat meminjam dana berfungsi untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menjadi milik bank secara otomatis begitu akad ditandatangani"
      },
      {
        "key": "B",
        "text": "Memberikan jaminan kepastian pelunasan kredit bagi bank apabila nasabah melakukan wanprestasi/gagal bayar"
      },
      {
        "key": "C",
        "text": "Sebagai syarat formalitas yang tidak memiliki nilai hukum"
      },
      {
        "key": "D",
        "text": "Dihibahkan kepada nasabah lain yang membutuhkan"
      },
      {
        "key": "E",
        "text": "Dilelang tanpa pemberitahuan kepada peminjam"
      }
    ],
    "correct": "B",
    "explanation": "Agunan adalah jaminan pelunasan kewajiban debitur kepada kreditur (bank) jika debitur tidak melunasi pinjaman sesuai perjanjian."
  },
  {
    "id": 76,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 36,
    "question": "Manfaat utama dari memiliki rekening tabungan khusus yang terpisah antara 'Rekening Harian' dan 'Rekening Tabungan Masa Depan' adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menambah biaya administrasi bank sebanyak-banyaknya"
      },
      {
        "key": "B",
        "text": "Mencegah uang tabungan terpakai tanpa sadar untuk pengeluaran belanja harian"
      },
      {
        "key": "C",
        "text": "Membuat pemilik bingung mengingat nomor rekening"
      },
      {
        "key": "D",
        "text": "Agar kartu ATM sering hilang"
      },
      {
        "key": "E",
        "text": "Menghindari verifikasi data identitas"
      }
    ],
    "correct": "B",
    "explanation": "Memisahkan rekening belanja rutin dan tabungan komitmen menjaga kedisiplinan finansial agar tabungan tidak bocor untuk keperluan sesaat."
  },
  {
    "id": 77,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 37,
    "question": "Seseorang yang memiliki tingkat literasi keuangan 'Well Literate' menurut standar OJK ditandai dengan...",
    "options": [
      {
        "key": "A",
        "text": "Hanya memiliki pengetahuan tentang lembaga keuangan tanpa pernah menggunakan produknya"
      },
      {
        "key": "B",
        "text": "Memiliki pengetahuan, keyakinan, dan keterampilan menggunakan produk serta layanan jasa keuangan secara bijak dan bertanggung jawab"
      },
      {
        "key": "C",
        "text": "Sama sekali tidak tahu tentang produk perbankan"
      },
      {
        "key": "D",
        "text": "Hanya percaya pada sistem pinjaman uang tunai informal"
      },
      {
        "key": "E",
        "text": "Menolak bertransaksi dengan bank"
      }
    ],
    "correct": "B",
    "explanation": "Kategori 'Well Literate' memiliki pengetahuan lengkap dan keterampilan aplikatif dalam memanfaatkan produk jasa keuangan secara aman dan terukur."
  },
  {
    "id": 78,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 38,
    "question": "Kebiasaan memeriksa struk belanja dan mutasi rekening secara berkala bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Mencari kesalahan kasir agar mendapat ganti rugi"
      },
      {
        "key": "B",
        "text": "Memantau ketepatan transaksi, mendeteksi potensi pemotongan liar/keliru, dan mengontrol pengeluaran"
      },
      {
        "key": "C",
        "text": "Menyimpan kertas struk sebagai koleksi"
      },
      {
        "key": "D",
        "text": "Mengetahui saldo teman yang bertransaksi"
      },
      {
        "key": "E",
        "text": "Menolak membayar pajak pertambahan nilai"
      }
    ],
    "correct": "B",
    "explanation": "Mengecek mutasi rekening secara rutin adalah kebiasaan pengawasan mandiri untuk memastikan tidak ada transaksi mencurigakan atau kekeliruan sistem."
  },
  {
    "id": 79,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 39,
    "question": "Jika seseorang terlanjur memiliki beberapa utang berbunga tinggi, strategi penyelesaian utang dengan metode 'Debt Snowball' dilakukan dengan cara...",
    "options": [
      {
        "key": "A",
        "text": "Membayar utang dari saldo yang paling kecil terlebih dahulu hingga lunas agar terbangun motivasi psikologis, baru beralih ke utang yang lebih besar"
      },
      {
        "key": "B",
        "text": "Mengabaikan seluruh utang sampai penagih lelah datang"
      },
      {
        "key": "C",
        "text": "Mengambil pinjaman baru yang lebih besar di pinjol lain untuk menutup utang lama (gali lubang tutup lubang)"
      },
      {
        "key": "D",
        "text": "Membayar utang dengan bunga terbesar terlebih dahulu tanpa peduli saldo pokok"
      },
      {
        "key": "E",
        "text": "Melarikan diri ke luar kota"
      }
    ],
    "correct": "A",
    "explanation": "Metode Debt Snowball melunasi utang dari nominal saldo terkecil lebih dulu untuk menciptakan momentum keberhasilan psikologis menuju utang yang lebih besar."
  },
  {
    "id": 80,
    "day": 1,
    "indicatorCode": "B",
    "indicatorKey": "ind_literasi_finansial",
    "indicatorName": "Literasi & Pengelolaan Keuangan",
    "numberInIndicator": 40,
    "question": "Tujuan hakiki dari belajar literasi finansial bagi pelajar SMA di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjadi pribadi yang kikir dan pelit terhadap sesama manusia"
      },
      {
        "key": "B",
        "text": "Mampu mengambil keputusan keuangan yang cerdas, bertanggung jawab, mandiri secara ekonomi, dan berkontribusi bagi masyarakat"
      },
      {
        "key": "C",
        "text": "Mencari cara cepat kaya tanpa perlu bekerja keras"
      },
      {
        "key": "D",
        "text": "Menghitung kekayaan orang lain"
      },
      {
        "key": "E",
        "text": "Membeli barang mewah untuk pamer di media sosial"
      }
    ],
    "correct": "B",
    "explanation": "Tujuan utama literasi keuangan adalah membangun pola pikir bijak, mandiri, dan berintegritas dalam mengelola sumber daya ekonomi untuk masa depan yang sejahtera."
  },
  {
    "id": 81,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 1,
    "question": "Kedudukan Bank Indonesia (BI) dalam struktur ketatanegaraan Republik Indonesia berdasarkan UU No. 23 Tahun 1999 adalah sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Kementerian di bawah Presiden langsung"
      },
      {
        "key": "B",
        "text": "Lembaga negara independen yang bebas dari campur tangan pemerintah dan pihak lain dalam melaksanakan tugasnya"
      },
      {
        "key": "C",
        "text": "Perusahaan BUMN pencetak laba"
      },
      {
        "key": "D",
        "text": "Lembaga peradilan perbankan"
      },
      {
        "key": "E",
        "text": "Bagian dari DPR RI"
      }
    ],
    "correct": "B",
    "explanation": "Bank Indonesia adalah lembaga negara yang independen dalam melaksanakan tugas dan wewenangnya, bebas dari campur tangan pihak luar."
  },
  {
    "id": 82,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 2,
    "question": "Tujuan tunggal (single objective) Bank Indonesia sebagaimana diamanatkan undang-undang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mencari laba devisa setinggi-tingginya"
      },
      {
        "key": "B",
        "text": "Mencapai dan memelihara kestabilan nilai Rupiah"
      },
      {
        "key": "C",
        "text": "Menjadi bank umum penyedia kredit konsumsi terbesar"
      },
      {
        "key": "D",
        "text": "Menentukan harga kebutuhan pokok di pasar tradisional"
      },
      {
        "key": "E",
        "text": "Membayar utang luar negeri swasta"
      }
    ],
    "correct": "B",
    "explanation": "Tujuan tunggal BI adalah mencapai dan memelihara kestabilan nilai Rupiah, baik terhadap harga barang/jasa (inflasi) maupun terhadap valuta asing (kurs)."
  },
  {
    "id": 83,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 3,
    "question": "Kestabilan nilai Rupiah yang menjadi tanggung jawab Bank Indonesia memiliki dua aspek penting, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Kestabilan terhadap harga emas dan perak"
      },
      {
        "key": "B",
        "text": "Kestabilan terhadap barang dan jasa (inflasi) serta kestabilan terhadap mata uang negara lain (kurs/nilai tukar)"
      },
      {
        "key": "C",
        "text": "Kestabilan harga beras di desa dan kota"
      },
      {
        "key": "D",
        "text": "Kestabilan jumlah ATM dan buku tabungan"
      },
      {
        "key": "E",
        "text": "Kestabilan gaji PNS dan TNI"
      }
    ],
    "correct": "B",
    "explanation": "Dua dimensi kestabilan Rupiah: internal (daya beli terhadap barang/jasa tercermin dari inflasi) dan eksternal (nilai tukar terhadap mata uang asing)."
  },
  {
    "id": 84,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 4,
    "question": "Berikut ini yang BUKAN merupakan salah satu dari 3 pilar tugas utama Bank Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menetapkan dan melaksanakan kebijakan moneter"
      },
      {
        "key": "B",
        "text": "Mengatur dan menjaga kelancaran sistem pembayaran"
      },
      {
        "key": "C",
        "text": "Memelihara stabilitas sistem keuangan (makroprudensial)"
      },
      {
        "key": "D",
        "text": "Memberikan pinjaman kredit modal langsung kepada masyarakat umum"
      },
      {
        "key": "E",
        "text": "Mengelola cadangan devisa negara"
      }
    ],
    "correct": "D",
    "explanation": "Bank Indonesia adalah bank sentral (bank of issue & bankers' bank) dan TIDAK melayani simpan-pinjam masyarakat umum seperti bank umum komersial."
  },
  {
    "id": 85,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 5,
    "question": "Kebijakan yang ditetapkan dan dilaksanakan oleh Bank Indonesia untuk mengendalikan jumlah uang yang beredar di masyarakat guna mencapai kestabilan nilai Rupiah disebut...",
    "options": [
      {
        "key": "A",
        "text": "Kebijakan fiskal"
      },
      {
        "key": "B",
        "text": "Kebijakan moneter"
      },
      {
        "key": "C",
        "text": "Kebijakan perdagangan internasional"
      },
      {
        "key": "D",
        "text": "Kebijakan upah minimum"
      },
      {
        "key": "E",
        "text": "Kebijakan tarif impor"
      }
    ],
    "correct": "B",
    "explanation": "Kebijakan moneter adalah wewenang eksklusif bank sentral untuk mengontrol pasokan uang dan tingkat suku bunga demi kestabilan ekonomi."
  },
  {
    "id": 86,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 6,
    "question": "Ketika terjadi inflasi tinggi (kenaikan harga barang-barang secara tajam), langkah kebijakan moneter kontraktif (tight money policy) yang diambil Bank Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menurunkan suku bunga acuan BI-Rate"
      },
      {
        "key": "B",
        "text": "Menaikkan suku bunga acuan (BI-Rate) dan menaikkan giro wajib minimum perbankan"
      },
      {
        "key": "C",
        "text": "Mencetak uang kertas sebanyak-banyaknya"
      },
      {
        "key": "D",
        "text": "Membeli surat berharga dari masyarakat"
      },
      {
        "key": "E",
        "text": "Membebaskan bank dari cadangan kas"
      }
    ],
    "correct": "B",
    "explanation": "Untuk mengerem inflasi, BI menaikkan suku bunga acuan agar masyarakat terdorong menabung, menekan laju kredit, dan mengurangi peredaran uang."
  },
  {
    "id": 87,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 7,
    "question": "Instrumen kebijakan moneter berupa kewajiban bagi bank umum untuk memelihara sejumlah saldo kas minimal di Bank Indonesia disebut...",
    "options": [
      {
        "key": "A",
        "text": "Operasi Pasar Terbuka"
      },
      {
        "key": "B",
        "text": "Fasilitas Diskonto"
      },
      {
        "key": "C",
        "text": "Giro Wajib Minimum (GWM)"
      },
      {
        "key": "D",
        "text": "Moral Suasion (Himbauan Moral)"
      },
      {
        "key": "E",
        "text": "Plafon Kredit"
      }
    ],
    "correct": "C",
    "explanation": "GWM (Giro Wajib Minimum) adalah jumlah dana cadangan likuiditas minimum yang wajib dipelihara oleh bank umum di Bank Indonesia."
  },
  {
    "id": 88,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 8,
    "question": "Operasi Pasar Terbuka (Open Market Operation) dilakukan oleh Bank Indonesia dengan cara...",
    "options": [
      {
        "key": "A",
        "text": "Menjual atau membeli Surat Berharga Bank Indonesia (SBBI/SBN) di pasar uang"
      },
      {
        "key": "B",
        "text": "Membuka pasar murah sembako di balai desa"
      },
      {
        "key": "C",
        "text": "Menutup kantor cabang bank umum yang bermasalah"
      },
      {
        "key": "D",
        "text": "Mengatur jam operasional pasar tradisional"
      },
      {
        "key": "E",
        "text": "Menetapkan harga jual gabah di penggilingan"
      }
    ],
    "correct": "A",
    "explanation": "Operasi pasar terbuka mengendalikan likuiditas perbankan melalui jual/beli surat berharga pasar uang."
  },
  {
    "id": 89,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 9,
    "question": "Bank Indonesia berperan sebagai 'Lender of Last Resort', yang memiliki arti...",
    "options": [
      {
        "key": "A",
        "text": "Pemberi pinjaman pertama bagi nasabah yang ingin membeli mobil"
      },
      {
        "key": "B",
        "text": "Penyedia likuiditas darurat terakhir bagi bank umum yang mengalami krisis likuiditas jangka pendek guna mencegah keruntuhan sistemik"
      },
      {
        "key": "C",
        "text": "Satu-satunya lembaga yang berhak menyita aset debitur macet"
      },
      {
        "key": "D",
        "text": "Tempat penggadaian barang berharga milik negara"
      },
      {
        "key": "E",
        "text": "Pemberi hibah tanpa syarat kepada perusahaan swasta"
      }
    ],
    "correct": "B",
    "explanation": "Lender of last resort adalah fungsi bank sentral sebagai benteng pertahanan terakhir penyedia pinjaman darurat bagi bank yang solvent namun illiquid."
  },
  {
    "id": 90,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 10,
    "question": "Satu-satunya lembaga negara yang memiliki hak tunggal untuk mencetak, menerbitkan, dan mengedarkan uang Rupiah di wilayah Negara Kesatuan Republik Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kementerian Keuangan"
      },
      {
        "key": "B",
        "text": "Otoritas Jasa Keuangan (OJK)"
      },
      {
        "key": "C",
        "text": "Bank Indonesia (BI)"
      },
      {
        "key": "D",
        "text": "PT Perum Peruri"
      },
      {
        "key": "E",
        "text": "Lembaga Penjamin Simpanan (LPS)"
      }
    ],
    "correct": "C",
    "explanation": "Sesuai UU Mata Uang, Bank Indonesia adalah satu-satunya otoritas yang berhak mengeluarkan dan mengedarkan uang Rupiah sebagai alat pembayaran sah."
  },
  {
    "id": 91,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 11,
    "question": "Uang kertas dan uang logam yang kita gunakan dalam transaksi sehari-hari di pasar tradisional Belitang dikategorikan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Uang giral"
      },
      {
        "key": "B",
        "text": "Uang kartal"
      },
      {
        "key": "C",
        "text": "Uang kuasi"
      },
      {
        "key": "D",
        "text": "Uang komoditas"
      },
      {
        "key": "E",
        "text": "Uang kripto"
      }
    ],
    "correct": "B",
    "explanation": "Uang kartal adalah alat pembayaran tunai sah yang terdiri atas uang kertas dan uang logam yang diterbitkan oleh bank sentral."
  },
  {
    "id": 92,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 12,
    "question": "Uang yang tersimpan dalam bentuk saldo rekening giro di bank yang penarikannya dapat dilakukan sewaktu-waktu menggunakan cek atau bilyet giro disebut...",
    "options": [
      {
        "key": "A",
        "text": "Uang kartal"
      },
      {
        "key": "B",
        "text": "Uang giral"
      },
      {
        "key": "C",
        "text": "Uang barang"
      },
      {
        "key": "D",
        "text": "Uang tanda"
      },
      {
        "key": "E",
        "text": "Uang dinar"
      }
    ],
    "correct": "B",
    "explanation": "Uang giral adalah saldo dana simpanan di bank yang dapat dipindahtangankan sewaktu-waktu menggunakan cek, bilyet giro, atau transfer elektronik."
  },
  {
    "id": 93,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 13,
    "question": "Metode mengenali keaslian uang kertas Rupiah yang disosialisasikan secara resmi oleh Bank Indonesia kepada masyarakat adalah gerakan...",
    "options": [
      {
        "key": "A",
        "text": "3M (Melihat, Memegang, Meraba)"
      },
      {
        "key": "B",
        "text": "3D (Dilihat, Diraba, Diterawang)"
      },
      {
        "key": "C",
        "text": "4T (Tanya, Tawar, Timbang, Tolak)"
      },
      {
        "key": "D",
        "text": "5S (Senyum, Salam, Sapa, Sopan, Santun)"
      },
      {
        "key": "E",
        "text": "2B (Bersih, Benar)"
      }
    ],
    "correct": "B",
    "explanation": "Metode 3D: Dilihat (perubahan warna & benang pengaman), Diraba (cetak kasar/tactile effect), Diterawang (tanda air/watermark pahlawan)."
  },
  {
    "id": 94,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 14,
    "question": "Saat meraba uang kertas Rupiah asli pecahan Rp 100.000, sensasi tekstur kasar yang terasa pada gambar pahlawan dan angka nominal dibuat menggunakan teknologi...",
    "options": [
      {
        "key": "A",
        "text": "Cetak sablon biasa"
      },
      {
        "key": "B",
        "text": "Intaglio printing (cetak dalam khusus)"
      },
      {
        "key": "C",
        "text": "Cetak offset digital"
      },
      {
        "key": "D",
        "text": "Fotokopi laser beresolusi tinggi"
      },
      {
        "key": "E",
        "text": "Stempel timbul manual"
      }
    ],
    "correct": "B",
    "explanation": "Intaglio printing adalah teknik cetak uang resmi yang menghasilkan permukaan tinta timbul dan kasar saat diraba, sulit ditiru pemalsu."
  },
  {
    "id": 95,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 15,
    "question": "Slogan edukasi Bank Indonesia yang mengajak seluruh warga negara untuk menghormati, menjaga, dan memperlakukan Rupiah dengan bijak adalah...",
    "options": [
      {
        "key": "A",
        "text": "Gemar Menabung Pangkal Kaya"
      },
      {
        "key": "B",
        "text": "Cinta, Bangga, Paham Rupiah (CBP)"
      },
      {
        "key": "C",
        "text": "Kedaulatan Finansial Merdeka"
      },
      {
        "key": "D",
        "text": "Satu Nusa Satu Uang"
      },
      {
        "key": "E",
        "text": "Rupiah Kuat Indonesia Jaya"
      }
    ],
    "correct": "B",
    "explanation": "Gerakan CBP (Cinta, Bangga, Paham Rupiah) menanamkan rasa cinta (merawat fisik uang), bangga (simbol kedaulatan negara), dan paham (bijak bertransaksi)."
  },
  {
    "id": 96,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 16,
    "question": "Salah satu perilaku yang melanggar prinsip 'Cinta Rupiah' karena dapat merusak fisik uang kertas adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyimpan uang secara rapi dan tidak dilipat di dalam dompet"
      },
      {
        "key": "B",
        "text": "Melipat-lipat, mencoret, menstapler, membasahi, dan meremas uang kertas Rupiah"
      },
      {
        "key": "C",
        "text": "Menyetorkan uang tabungan ke bank"
      },
      {
        "key": "D",
        "text": "Menukarkan uang lusuh di loket resmi Bank Indonesia"
      },
      {
        "key": "E",
        "text": "Menggunakan Rupiah dalam setiap transaksi di NKRI"
      }
    ],
    "correct": "B",
    "explanation": "Perilaku '5 Jangan': Jangan dilipat, jangan dicoret, jangan distapler, jangan diremas, dan jangan dibasahi untuk menjaga usia edar uang Rupiah."
  },
  {
    "id": 97,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 17,
    "question": "Inovasi sistem pembayaran non-tunai berbasis barcode dua dimensi yang distandardisasi oleh Bank Indonesia dan dapat digunakan lintas aplikasi dompet digital adalah...",
    "options": [
      {
        "key": "A",
        "text": "ATM Bersama"
      },
      {
        "key": "B",
        "text": "EDC Mini"
      },
      {
        "key": "C",
        "text": "QRIS (Quick Response Code Indonesian Standard)"
      },
      {
        "key": "D",
        "text": "NFC Tap"
      },
      {
        "key": "E",
        "text": "SWIFT Code"
      }
    ],
    "correct": "C",
    "explanation": "QRIS menyatukan berbagai penyedia jasa pembayaran (GoPay, OVO, Dana, mobile banking) dalam satu kode QR standar nasional terpadu."
  },
  {
    "id": 98,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 18,
    "question": "Karakteristik utama dari transaksi pembayaran menggunakan QRIS bagi pedagang UMKM di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pedagang harus memiliki mesin kasir komputer super mahal"
      },
      {
        "key": "B",
        "text": "Cukup satu kode QR di meja kasir, dapat menerima pembayaran dari seluruh aplikasi bank dan dompet digital mana pun tanpa uang kembalian"
      },
      {
        "key": "C",
        "text": "Konsumen dikenakan potongan uang tunai yang sangat besar"
      },
      {
        "key": "D",
        "text": "Uang baru masuk ke rekening pedagang satu bulan kemudian"
      },
      {
        "key": "E",
        "text": "Transaksi hanya bisa dilakukan pada malam hari"
      }
    ],
    "correct": "B",
    "explanation": "Konsep QRIS adalah 'Satu QR untuk Semua'. Pedagang cukup memajang satu QRIS untuk menerima pembayaran dari puluhan aplikasi bank dan e-wallet."
  },
  {
    "id": 99,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 19,
    "question": "Infrastruktur sistem transfer dana antar-bank ritel yang diluncurkan Bank Indonesia dengan biaya transfer murah Rp 2.500 dan beroperasi 24 jam sehari secara real-time adalah...",
    "options": [
      {
        "key": "A",
        "text": "RTGS (Real Time Gross Settlement)"
      },
      {
        "key": "B",
        "text": "SKNBI Kliring Nasional"
      },
      {
        "key": "C",
        "text": "BI-FAST"
      },
      {
        "key": "D",
        "text": "Western Union"
      },
      {
        "key": "E",
        "text": "Wesel Pos"
      }
    ],
    "correct": "C",
    "explanation": "BI-FAST adalah infrastruktur pembayaran ritel nasional yang memfasilitasi transfer dana antar-bank cepat, murah (Rp 2.500), aman, dan melayani 24/7."
  },
  {
    "id": 100,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 20,
    "question": "Sistem penyelesaian transaksi pembayaran bernilai besar (di atas Rp 100 juta) yang bersifat segera dan seketika antar-bank di Bank Indonesia disebut...",
    "options": [
      {
        "key": "A",
        "text": "BI-RTGS (Real Time Gross Settlement)"
      },
      {
        "key": "B",
        "text": "QRIS Mikro"
      },
      {
        "key": "C",
        "text": "Tabungan Simpel"
      },
      {
        "key": "D",
        "text": "Uang Elektronik Chip"
      },
      {
        "key": "E",
        "text": "Cek Tunai Antar-Kecamatan"
      }
    ],
    "correct": "A",
    "explanation": "BI-RTGS melayani transfer dana bernilai besar (high value payment) dan bersifat urgen/kritis secara real-time bruto antar-bank."
  },
  {
    "id": 101,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 21,
    "question": "Tujuan Bank Indonesia gencar menggalakkan Gerakan Nasional Non-Tunai (GNNT) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menghilangkan sama sekali peredaran uang kertas di seluruh Indonesia dalam sehari"
      },
      {
        "key": "B",
        "text": "Menciptakan sistem pembayaran yang efisien, aman, transparan, higienis, dan mempercepat perputaran roda ekonomi"
      },
      {
        "key": "C",
        "text": "Memaksa masyarakat membeli smartphone mahal"
      },
      {
        "key": "D",
        "text": "Mengurangi pendapatan pedagang pasar tradisional"
      },
      {
        "key": "E",
        "text": "Meniadakan peran bank umum"
      }
    ],
    "correct": "B",
    "explanation": "Transaksi non-tunai meningkatkan efisiensi nasional (menghemat biaya cetak/distribusi uang kartal), mencegah uang palsu, dan lebih transparan."
  },
  {
    "id": 102,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 22,
    "question": "Bank Indonesia mengemban tugas dalam menjaga stabilitas makroprudensial, yang fokus pada...",
    "options": [
      {
        "key": "A",
        "text": "Pemeriksaan operasional harian satu per satu kantor cabang bank"
      },
      {
        "key": "B",
        "text": "Mencegah dan memitigasi risiko sistemik pada keseluruhan sistem keuangan nasional agar krisis keuangan tidak melumpuhkan ekonomi"
      },
      {
        "key": "C",
        "text": "Menetapkan besaran gaji karyawan swasta"
      },
      {
        "key": "D",
        "text": "Menentukan tarif tiket bus antarkota"
      },
      {
        "key": "E",
        "text": "Menyusun APBN bersama DPR"
      }
    ],
    "correct": "B",
    "explanation": "Kebijakan makroprudensial menjaga kesehatan sistem keuangan secara makro/keseluruhan untuk mencegah penularan krisis finansial sistemik."
  },
  {
    "id": 103,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 23,
    "question": "Ketika rupiah mengalami pelemahan drastis terhadap Dolar Amerika Serikat, langkah intervensi pasar yang dapat dilakukan Bank Indonesia adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjual cadangan devisa Dolar AS ke pasar valas domestik dan instrumen moneter valas untuk menyeimbangkan penawaran dan permintaan"
      },
      {
        "key": "B",
        "text": "Melarang perdagangan impor selamanya"
      },
      {
        "key": "C",
        "text": "Menutup seluruh bank di perbatasan"
      },
      {
        "key": "D",
        "text": "Membeli sebanyak-banyaknya mata uang asing di pasar gelap"
      },
      {
        "key": "E",
        "text": "Menghentikan peredaran uang Rupiah"
      }
    ],
    "correct": "A",
    "explanation": "Intervensi valuta asing dengan melepas cadangan devisa (intervensi triple intervention) bertujuan menstabilkan fluktuasi nilai tukar Rupiah."
  },
  {
    "id": 104,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 24,
    "question": "Dalam melaksanakan tugasnya, Dewan Gubernur Bank Indonesia dipimpin oleh seorang...",
    "options": [
      {
        "key": "A",
        "text": "Menteri Koordinator Bidang Perekonomian"
      },
      {
        "key": "B",
        "text": "Gubernur Bank Indonesia"
      },
      {
        "key": "C",
        "text": "Ketua Dewan Komisioner OJK"
      },
      {
        "key": "D",
        "text": "Direktur Utama Bank Mandiri"
      },
      {
        "key": "E",
        "text": "Menteri Keuangan"
      }
    ],
    "correct": "B",
    "explanation": "Bank Indonesia dipimpin oleh Dewan Gubernur yang terdiri dari Gubernur BI, Deputi Gubernur Senior, dan minimal 4 Deputi Gubernur."
  },
  {
    "id": 105,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 25,
    "question": "Masa jabatan Gubernur Bank Indonesia dan anggota Dewan Gubernur lainnya sesuai undang-undang adalah...",
    "options": [
      {
        "key": "A",
        "text": "2 tahun tanpa perpanjangan"
      },
      {
        "key": "B",
        "text": "5 tahun dan dapat diangkat kembali dalam jabatan yang sama paling banyak 1 kali masa jabatan berikutnya"
      },
      {
        "key": "C",
        "text": "Seumur hidup"
      },
      {
        "key": "D",
        "text": "Mengikuti masa jabatan kabinet menteri"
      },
      {
        "key": "E",
        "text": "10 tahun sekaligus"
      }
    ],
    "correct": "B",
    "explanation": "Masa jabatan anggota Dewan Gubernur BI adalah 5 tahun dan dapat dipilih kembali maksimal untuk satu kali masa jabatan berikutnya."
  },
  {
    "id": 106,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 26,
    "question": "Alasan mengapa Bank Indonesia harus independen dan bebas dari intervensi politik kekuasaan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Agar pejabat bank sentral tidak perlu membayar pajak"
      },
      {
        "key": "B",
        "text": "Agar kebijakan moneter dapat diambil secara objektif demi kestabilan jangka panjang tanpa tergoda kepentingan politik populis jangka pendek (seperti mencetak uang sembarangan)"
      },
      {
        "key": "C",
        "text": "Supaya Bank Indonesia tidak diaudit oleh Badan Pemeriksa Keuangan"
      },
      {
        "key": "D",
        "text": "Agar bank sentral bisa menguasai seluruh aset negara"
      },
      {
        "key": "E",
        "text": "Supaya BI tidak perlu bekerja sama dengan pemerintah"
      }
    ],
    "correct": "B",
    "explanation": "Independensi mencegah pemerintah mencetak uang berlebihan untuk membiayai defisit anggaran yang terbukti memicu hiperinflasi di banyak negara."
  },
  {
    "id": 107,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 27,
    "question": "Bentuk akuntabilitas dan transparansi Bank Indonesia kepada publik dan lembaga perwakilan rakyat diwujudkan melalui...",
    "options": [
      {
        "key": "A",
        "text": "Menyembunyikan laporan keuangan tahunan dari masyarakat"
      },
      {
        "key": "B",
        "text": "Penyampaian laporan tahunan dan triwulanan pelaksanaan tugas kepada Presiden dan DPR serta dipublikasikan di media massa"
      },
      {
        "key": "C",
        "text": "Menghentikan rilis data statistik ekonomi"
      },
      {
        "key": "D",
        "text": "Hanya memberi laporan secara lisan tanpa bukti"
      },
      {
        "key": "E",
        "text": "Melarang media meliput konferensi pers Dewan Gubernur"
      }
    ],
    "correct": "B",
    "explanation": "Meski independen, BI wajib transparan dan akuntabel dengan menyampaikan laporan resmi berkala kepada DPR, Presiden, dan masyarakat."
  },
  {
    "id": 108,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 28,
    "question": "Di wilayah pedesaan OKU Timur yang belum terjangkau kantor cabang bank, Bank Indonesia dan OJK mendorong inklusi keuangan melalui program...",
    "options": [
      {
        "key": "A",
        "text": "Penutupan seluruh akses transaksi keuangan"
      },
      {
        "key": "B",
        "text": "Layanan Keuangan Digital (LKD) dan Agen Laku Pandai (seperti Agen BRILink / Agen Bank)"
      },
      {
        "key": "C",
        "text": "Mewajibkan warga desa datang ke kantor pusat di Jakarta"
      },
      {
        "key": "D",
        "text": "Mengharuskan transaksi barter barang komoditas"
      },
      {
        "key": "E",
        "text": "Melarang penggunaan smartphone di desa"
      }
    ],
    "correct": "B",
    "explanation": "Inklusi keuangan di desa diperluas lewat keagenan perbankan tanpa kantor (Laku Pandai / LKD) yang melayani setor-tarik tunai dan transfer di warung warga."
  },
  {
    "id": 109,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 29,
    "question": "Salah satu fungsi uang sebagai 'Alat Tukar Umum' (Medium of Exchange) dapat dilihat dari peristiwa...",
    "options": [
      {
        "key": "A",
        "text": "Pak Budi menggunakan uang Rp 50.000 untuk membeli 3 kg beras di pasar Gumawang"
      },
      {
        "key": "B",
        "text": "Bu Siti mencatat harga tanahnya senilai Rp 200.000.000"
      },
      {
        "key": "C",
        "text": "Pak Wayan menabung uang di bank untuk biaya kuliah anaknya 5 tahun lagi"
      },
      {
        "key": "D",
        "text": "Pak RT meminjamkan motor dengan jaminan BPKB"
      },
      {
        "key": "E",
        "text": "Pemerintah menetapkan tarif pajak"
      }
    ],
    "correct": "A",
    "explanation": "Sebagai alat tukar (medium of exchange), uang mempermudah transaksi jual beli barang/jasa tanpa kerumitan sistem barter."
  },
  {
    "id": 110,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 30,
    "question": "Ketika uang digunakan untuk menyatakan harga seekor sapi di pasar hewan Belitang seharga Rp 18.000.000, uang tersebut menjalankan fungsinya sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Alat tukar"
      },
      {
        "key": "B",
        "text": "Satuan hitung / Pengukur nilai (Unit of Account)"
      },
      {
        "key": "C",
        "text": "Alat penimbun kekayaan"
      },
      {
        "key": "D",
        "text": "Alat pembayaran utang masa lalu"
      },
      {
        "key": "E",
        "text": "Alat spekulasi"
      }
    ],
    "correct": "B",
    "explanation": "Satuan hitung (unit of account) menetapkan nilai atau harga suatu barang/jasa dalam besaran angka mata uang secara seragam."
  },
  {
    "id": 111,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 31,
    "question": "Tindakan merusak uang Rupiah (seperti merobek, menggunting, atau membakar) diancam dengan sanksi pidana dalam UU No. 7 Tahun 2011 tentang Mata Uang karena...",
    "options": [
      {
        "key": "A",
        "text": "Biaya kertas uang sangat mahal bagi swasta"
      },
      {
        "key": "B",
        "text": "Rupiah adalah simbol kedaulatan negara dan identitas kehormatan bangsa yang dilindungi hukum"
      },
      {
        "key": "C",
        "text": "Uang rusak tidak bisa dibakar dengan api biasa"
      },
      {
        "key": "D",
        "text": "Hanya bank umum yang boleh merusak uang"
      },
      {
        "key": "E",
        "text": "Membakar uang mencemari udara"
      }
    ],
    "correct": "B",
    "explanation": "Rupiah adalah lambang kedaulatan NKRI. Merusak uang secara sengaja adalah pelanggaran hukum pidana dengan ancaman denda dan penjara."
  },
  {
    "id": 112,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 32,
    "question": "Uang Rupiah yang mengalami kerusakan fisik (robek, berlubang, atau terbakar) sebagian dapat ditukarkan di loket resmi Bank Indonesia dengan syarat...",
    "options": [
      {
        "key": "A",
        "text": "Harus dalam kondisi 100% utuh tanpa lecet sedikit pun"
      },
      {
        "key": "B",
        "text": "Tanda keaslian uang masih dapat dikenali dan fisik uang kertas yang tersisa lebih besar dari 2/3 (dua pertiga) ukuran aslinya"
      },
      {
        "key": "C",
        "text": "Wajib membawa surat pengantar dari kepolisian pusat"
      },
      {
        "key": "D",
        "text": "Uang rusak diganti dengan potongan biaya 50%"
      },
      {
        "key": "E",
        "text": "Hanya dilayani setahun sekali"
      }
    ],
    "correct": "B",
    "explanation": "BI melayani penukaran uang rusak secara gratis selama keasliannya terverifikasi dan sisa fisik uang kertas minimal lebih dari 2/3 (67%)."
  },
  {
    "id": 113,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 33,
    "question": "Layanan kas keliling Bank Indonesia yang masuk ke pelosok daerah terpencil, perbatasan, dan kepulauan bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menarik kembali seluruh kekayaan warga desa"
      },
      {
        "key": "B",
        "text": "Menjaga kualitas uang beredar (Clean Money Policy) dan menjamin ketersediaan uang layak edar bagi masyarakat"
      },
      {
        "key": "C",
        "text": "Membagikan bantuan uang tunai cuma-cuma"
      },
      {
        "key": "D",
        "text": "Memaksa pedagang mengganti sistem uang kartal"
      },
      {
        "key": "E",
        "text": "Mencatat nama-nama pemilik rekening"
      }
    ],
    "correct": "B",
    "explanation": "Kas keliling menjamin implementasi 'Clean Money Policy' agar masyarakat di pelosok mendapatkan uang layak edar dan menukar uang lusuh."
  },
  {
    "id": 114,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 34,
    "question": "Faktor yang menyebabkan inflasi dari sisi dorongan biaya produksi (Cost-Push Inflation) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Meningkatnya permintaan belanja masyarakat saat hari raya Idulfitri"
      },
      {
        "key": "B",
        "text": "Kenaikan harga bahan bakar minyak (BBM), tarif listrik, dan pupuk yang mendongkrak biaya produksi barang"
      },
      {
        "key": "C",
        "text": "Jumlah uang beredar yang berkurang drastis di perbankan"
      },
      {
        "key": "D",
        "text": "Penurunan harga barang-barang impor"
      },
      {
        "key": "E",
        "text": "Banjir bantuan beras gratis dari pemerintah"
      }
    ],
    "correct": "B",
    "explanation": "Cost-push inflation dipicu oleh lonjakan ongkos produksi (kenaikan harga bahan baku, energi, logistik) yang memaksa produsen menaikkan harga jual."
  },
  {
    "id": 115,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 35,
    "question": "Perbedaan fungsi antara Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) pasca pembagian kewenangan adalah...",
    "options": [
      {
        "key": "A",
        "text": "BI mengatur kebijakan moneter dan stabilitas makroprudensial sistem keuangan, sedangkan OJK mengawasi lembaga jasa keuangan individual (mikroprudensial) dan perlindungan konsumen"
      },
      {
        "key": "B",
        "text": "BI mengawasi nasabah pinjol, OJK mencetak uang kertas"
      },
      {
        "key": "C",
        "text": "Keduanya memiliki tugas dan kewenangan yang sama tanpa perbedaan"
      },
      {
        "key": "D",
        "text": "BI berada di bawah naungan OJK"
      },
      {
        "key": "E",
        "text": "OJK bertanggung jawab mengendalikan inflasi daerah"
      }
    ],
    "correct": "A",
    "explanation": "BI fokus pada stabilitas moneter dan makro (sistem keuangan menyeluruh & pembayaran), sedangkan OJK fokus pada mikro (kesehatan bank/lembaga keuangan perorangan)."
  },
  {
    "id": 116,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 36,
    "question": "Keuntungan utama menggunakan dompet digital berbasis QRIS bagi seorang pelajar saat membeli makanan di kantin sekolah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Pasti mendapat diskon 90% setiap hari"
      },
      {
        "key": "B",
        "text": "Praktis tanpa repot membawa uang kembalian receh, higienis, dan pengeluaran tercatat otomatis di riwayat aplikasi"
      },
      {
        "key": "C",
        "text": "Uang saku di dompet digital tidak akan pernah berkurang"
      },
      {
        "key": "D",
        "text": "Dapat berutang tanpa perlu membayar kembali"
      },
      {
        "key": "E",
        "text": "Bisa digunakan meski HP dalam keadaan mati"
      }
    ],
    "correct": "B",
    "explanation": "QRIS menawarkan kepraktisan tanpa repot uang kembalian, aman dari risiko kecopetan fisik, higienis, dan tercatat otomatis dalam histori transaksi."
  },
  {
    "id": 117,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 37,
    "question": "Jika sebuah negara terlalu banyak mencetak uang tunai untuk membayar utang pemerintah tanpa diimbangi peningkatan produksi barang, dampak ekonomi yang akan terjadi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Masyarakat menjadi makmur dan kaya raya seketika"
      },
      {
        "key": "B",
        "text": "Terjadinya hiperinflasi di mana nilai mata uang jatuh bebas dan harga barang melambung tinggi tak terkendali (seperti di Zimbabwe atau Venezuela)"
      },
      {
        "key": "C",
        "text": "Nilai tukar mata uang akan menguat tajam terhadap dolar"
      },
      {
        "key": "D",
        "text": "Suku bunga bank menjadi nol persen"
      },
      {
        "key": "E",
        "text": "Produksi pangan meningkat berlipat ganda"
      }
    ],
    "correct": "B",
    "explanation": "Mencetak uang tanpa sokongan pertumbuhan output riil barang/jasa hanya akan memicu hiperinflasi yang menghancurkan daya beli uang masyarakat."
  },
  {
    "id": 118,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 38,
    "question": "Peran Bank Indonesia dalam Tim Pengendalian Inflasi Daerah (TPID) di tingkat kabupaten seperti di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menentukan vonis hukuman bagi pedagang nakal"
      },
      {
        "key": "B",
        "text": "Bekerja sama dengan Pemerintah Daerah menjaga ketersediaan pasokan pangan, kelancaran distribusi logistik, dan keterjangkauan harga sembako (Strategi 4K)"
      },
      {
        "key": "C",
        "text": "Menutup pasar yang menjual cabai mahal"
      },
      {
        "key": "D",
        "text": "Membeli seluruh hasil panen petani secara paksa"
      },
      {
        "key": "E",
        "text": "Menjadi pengawas pemilu kepala daerah"
      }
    ],
    "correct": "B",
    "explanation": "TPID bersama BI menjaga inflasi daerah lewat strategi 4K: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi efektif."
  },
  {
    "id": 119,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 39,
    "question": "Konsep 'Uang Elektronik' (Electronic Money) berbeda dengan 'Uang Digital Bank Sentral' (Central Bank Digital Currency / CBDC / Digital Rupiah) dalam hal...",
    "options": [
      {
        "key": "A",
        "text": "Uang elektronik diterbitkan oleh bank umum/lembaga non-bank atas dasar simpanan dana tunai, sedangkan Digital Rupiah merupakan uang digital berdaulat yang diterbitkan langsung oleh Bank Indonesia sebagai kewajiban langsung bank sentral"
      },
      {
        "key": "B",
        "text": "Uang elektronik memiliki wujud kertas, CBDC tidak berwujud"
      },
      {
        "key": "C",
        "text": "Digital Rupiah hanya berlaku di luar negeri"
      },
      {
        "key": "D",
        "text": "Uang elektronik tidak memiliki nilai nominal"
      },
      {
        "key": "E",
        "text": "Keduanya tidak diakui oleh undang-undang"
      }
    ],
    "correct": "A",
    "explanation": "CBDC (Proyek Garuda / Digital Rupiah) adalah representasi digital dari mata uang resmi yang diterbitkan dan dijamin langsung oleh Bank Indonesia."
  },
  {
    "id": 120,
    "day": 1,
    "indicatorCode": "C",
    "indicatorKey": "ind_kebanksentralan",
    "indicatorName": "Kebanksentralan & Bank Indonesia",
    "numberInIndicator": 40,
    "question": "Sebagai generasi muda di Belitang, wujud nyata sikap mencerminkan pilar 'Paham Rupiah' dalam kehidupan sehari-hari adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membeli barang secara berlebihan mumpung punya uang"
      },
      {
        "key": "B",
        "text": "Menggunakan Rupiah untuk konsumsi bijak, berbelanja sesuai kebutuhan, rajin menabung, dan berinvestasi pada hal produktif"
      },
      {
        "key": "C",
        "text": "Menukarkan seluruh tabungan rupiah ke mata uang asing untuk disimpan di rumah"
      },
      {
        "key": "D",
        "text": "Menolak bertransaksi dengan pedagang yang memakai QRIS"
      },
      {
        "key": "E",
        "text": "Menghabiskan uang untuk bermain judi online"
      }
    ],
    "correct": "B",
    "explanation": "Paham Rupiah tercermin dari kecakapan berperilaku bijak: berbelanja bijak (mengendalikan inflasi), berhemat menabung, dan berinvestasi produktif."
  },
  {
    "id": 121,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 1,
    "question": "Landasan konstitusional perekonomian Indonesia dan keberadaan Koperasi termaktub secara tegas dalam UUD 1945 Pasal...",
    "options": [
      {
        "key": "A",
        "text": "Pasal 27 ayat (2)"
      },
      {
        "key": "B",
        "text": "Pasal 33 ayat (1)"
      },
      {
        "key": "C",
        "text": "Pasal 34 ayat (1)"
      },
      {
        "key": "D",
        "text": "Pasal 31 ayat (3)"
      },
      {
        "key": "E",
        "text": "Pasal 28E ayat (1)"
      }
    ],
    "correct": "B",
    "explanation": "Pasal 33 ayat (1) UUD 1945 menyatakan: 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan'."
  },
  {
    "id": 122,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 2,
    "question": "Undang-Undang Republik Indonesia yang menjadi landasan hukum utama penyelenggaraan perkoperasian di Indonesia saat ini adalah...",
    "options": [
      {
        "key": "A",
        "text": "UU No. 25 Tahun 1992"
      },
      {
        "key": "B",
        "text": "UU No. 5 Tahun 1999"
      },
      {
        "key": "C",
        "text": "UU No. 40 Tahun 2007"
      },
      {
        "key": "D",
        "text": "UU No. 19 Tahun 2003"
      },
      {
        "key": "E",
        "text": "UU No. 7 Tahun 2014"
      }
    ],
    "correct": "A",
    "explanation": "UU No. 25 Tahun 1992 tentang Perkoperasian adalah undang-undang dasar operasional koperasi di Indonesia."
  },
  {
    "id": 123,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 3,
    "question": "Tokoh proklamator bangsa yang dikenal dan dihormati sebagai 'Bapak Koperasi Indonesia' atas gagasannya membangun ekonomi kerakyatan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ir. Soekarno"
      },
      {
        "key": "B",
        "text": "Drs. Mohammad Hatta"
      },
      {
        "key": "C",
        "text": "Ki Hadjar Dewantara"
      },
      {
        "key": "D",
        "text": "Sutan Sjahrir"
      },
      {
        "key": "E",
        "text": "Mr. Mohammad Yamin"
      }
    ],
    "correct": "B",
    "explanation": "Drs. Mohammad Hatta adalah Bapak Koperasi Indonesia yang gigih memperjuangkan koperasi sebagai soko guru perekonomian nasional."
  },
  {
    "id": 124,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 4,
    "question": "Asas fundamental yang mendasari seluruh kegiatan operasional dan relasi keanggotaan dalam koperasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Asas kapitalisme murni"
      },
      {
        "key": "B",
        "text": "Asas kekeluargaan dan gotong royong"
      },
      {
        "key": "C",
        "text": "Asas persaingan bebas"
      },
      {
        "key": "D",
        "text": "Asas kepemilikan modal terbesar"
      },
      {
        "key": "E",
        "text": "Asas monopoli pasar"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi berlandaskan asas kekeluargaan dan gotong royong demi kesejahteraan bersama anggotanya, bukan semata-mata mencari laba individu."
  },
  {
    "id": 125,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 5,
    "question": "Perbedaan mendasar antara tujuan Koperasi dengan Perseroan Terbatas (PT) swasta terletak pada...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi bertujuan memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya, sedangkan PT bertujuan memaksimalisasi keuntungan (laba) pemegang saham"
      },
      {
        "key": "B",
        "text": "Koperasi hanya bergerak di bidang keagamaan, PT di bidang perdagangan"
      },
      {
        "key": "C",
        "text": "Koperasi tidak memerlukan modal uang, PT memerlukan uang"
      },
      {
        "key": "D",
        "text": "Koperasi dimiliki oleh pemerintah, PT dimiliki oleh warga desa"
      },
      {
        "key": "E",
        "text": "Koperasi tidak memiliki izin usaha resmi"
      }
    ],
    "correct": "A",
    "explanation": "Tujuan utama koperasi adalah melayani dan menyejahterakan anggota, sedangkan PT berorientasi mencari laba maksimal bagi pemilik modal."
  },
  {
    "id": 126,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 6,
    "question": "Kekuasaan tertinggi dalam tata kelola dan pengambilan keputusan strategis sebuah koperasi berada di tangan...",
    "options": [
      {
        "key": "A",
        "text": "Ketua Pengurus Koperasi"
      },
      {
        "key": "B",
        "text": "Dewan Pengawas Koperasi"
      },
      {
        "key": "C",
        "text": "Rapat Anggota (RAT)"
      },
      {
        "key": "D",
        "text": "Kepala Dinas Koperasi Kabupaten"
      },
      {
        "key": "E",
        "text": "Manajer Operasional"
      }
    ],
    "correct": "C",
    "explanation": "Rapat Anggota merupakan pemegang kekuasaan tertinggi dalam koperasi yang mencerminkan kedaulatan demokratis seluruh anggota."
  },
  {
    "id": 127,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 7,
    "question": "Prinsip demokrasi dalam pengambilan suara pada Rapat Anggota Koperasi menganut sistem...",
    "options": [
      {
        "key": "A",
        "text": "Satu lembar saham satu suara (One share one vote)"
      },
      {
        "key": "B",
        "text": "Satu anggota satu suara (One man one vote) tanpa memandang besar kecilnya simpanan modal"
      },
      {
        "key": "C",
        "text": "Jumlah suara ditentukan oleh tingkat pendidikan anggota"
      },
      {
        "key": "D",
        "text": "Hanya pengurus yang memiliki hak suara"
      },
      {
        "key": "E",
        "text": "Suara terbanyak ditentukan oleh pejabat desa"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi menjunjung kesetaraan: 'One man one vote' (setiap anggota punya 1 hak suara yang setara, tidak peduli berapa besar simpanannya)."
  },
  {
    "id": 128,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 8,
    "question": "Modal sendiri (ekuitas internal) yang dimiliki oleh sebuah koperasi terdiri atas...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan pokok, simpanan wajib, dana cadangan, dan hibah"
      },
      {
        "key": "B",
        "text": "Pinjaman bank umum dan obligasi swasta"
      },
      {
        "key": "C",
        "text": "Penyertaan modal modal ventura asing"
      },
      {
        "key": "D",
        "text": "Kredit usaha rakyat dan pinjol"
      },
      {
        "key": "E",
        "text": "Uang titipan pedagang pasar"
      }
    ],
    "correct": "A",
    "explanation": "Menurut UU 25/1992, modal sendiri koperasi terdiri dari simpanan pokok, simpanan wajib, dana cadangan, dan hibah."
  },
  {
    "id": 129,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 9,
    "question": "Simpanan sejumlah uang yang sama banyaknya dan wajib dibayarkan oleh setiap anggota pada saat pertama kali resmi masuk menjadi anggota koperasi disebut...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan wajib"
      },
      {
        "key": "B",
        "text": "Simpanan pokok"
      },
      {
        "key": "C",
        "text": "Simpanan sukarela"
      },
      {
        "key": "D",
        "text": "Dana cadangan"
      },
      {
        "key": "E",
        "text": "Sisa hasil usaha"
      }
    ],
    "correct": "B",
    "explanation": "Simpanan pokok dibayar sekali di awal saat masuk menjadi anggota dengan nominal sama rata, dan tidak dapat ditarik selama masih menjadi anggota."
  },
  {
    "id": 130,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 10,
    "question": "Simpanan yang wajib dibayarkan oleh anggota koperasi secara rutin dalam jangka waktu tertentu (misalnya setiap bulan sekali) disebut...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan pokok"
      },
      {
        "key": "B",
        "text": "Simpanan wajib"
      },
      {
        "key": "C",
        "text": "Simpanan sukarela"
      },
      {
        "key": "D",
        "text": "Investasi modal"
      },
      {
        "key": "E",
        "text": "Hadiah undian"
      }
    ],
    "correct": "B",
    "explanation": "Simpanan wajib dibayarkan secara teratur dalam jangka waktu tertentu (misal tiap bulan) dan tidak dapat ditarik selama masih berstatus anggota."
  },
  {
    "id": 131,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 11,
    "question": "Simpanan yang dapat disetorkan dan ditarik kembali sewaktu-waktu oleh anggota sesuai perjanjian yang disepakati disebut...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan pokok"
      },
      {
        "key": "B",
        "text": "Simpanan wajib"
      },
      {
        "key": "C",
        "text": "Simpanan sukarela"
      },
      {
        "key": "D",
        "text": "Dana hibah"
      },
      {
        "key": "E",
        "text": "Cadangan kerugian"
      }
    ],
    "correct": "C",
    "explanation": "Simpanan sukarela bersifat fleksibel, besarannya bebas, dan dapat disetor maupun ditarik kembali sewaktu-waktu sesuai ketentuan koperasi."
  },
  {
    "id": 132,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 12,
    "question": "Pendapatan koperasi yang diperoleh dalam satu tahun buku dikurangi dengan biaya operasional, penyusutan, dan kewajiban lainnya termasuk pajak disebut...",
    "options": [
      {
        "key": "A",
        "text": "Dividen pemegang saham"
      },
      {
        "key": "B",
        "text": "Sisa Hasil Usaha (SHU)"
      },
      {
        "key": "C",
        "text": "Laba ditahan murni"
      },
      {
        "key": "D",
        "text": "Bunga pinjaman"
      },
      {
        "key": "E",
        "text": "Omzet kotor"
      }
    ],
    "correct": "B",
    "explanation": "SHU (Sisa Hasil Usaha) adalah laba bersih operasional koperasi dalam satu tahun buku setelah dikurangi seluruh beban kewajiban."
  },
  {
    "id": 133,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 13,
    "question": "Pembagian Sisa Hasil Usaha (SHU) kepada anggota koperasi dilakukan secara adil berdasarkan prinsip...",
    "options": [
      {
        "key": "A",
        "text": "Dibagi rata sama banyak kepada seluruh warga desa"
      },
      {
        "key": "B",
        "text": "Sebanding dengan besarnya jasa usaha dan kontribusi transaksi masing-masing anggota kepada koperasi"
      },
      {
        "key": "C",
        "text": "Diberikan seluruhnya kepada pengurus koperasi"
      },
      {
        "key": "D",
        "text": "Hanya diberikan kepada anggota yang paling kaya"
      },
      {
        "key": "E",
        "text": "Ditentukan secara acak oleh panitia"
      }
    ],
    "correct": "B",
    "explanation": "SHU dibagikan proporsional berdasarkan kontribusi jasa modal (simpanan) dan jasa transaksi/belanja anggota kepada koperasi."
  },
  {
    "id": 134,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 14,
    "question": "Pak Joko memiliki simpanan di Koperasi Tani Makmur sebesar 5% dari total simpanan anggota dan aktif berbelanja pupuk sebesar 10% dari total omzet penjualan koperasi. Pembagian SHU yang diterima Pak Joko akan dihitung dari...",
    "options": [
      {
        "key": "A",
        "text": "Hanya dari simpanannya saja tanpa melihat belanja"
      },
      {
        "key": "B",
        "text": "Gabungan SHU Jasa Modal (atas simpanan) dan SHU Jasa Usaha (atas transaksi belanjanya)"
      },
      {
        "key": "C",
        "text": "Diberikan nilai tetap Rp 100.000"
      },
      {
        "key": "D",
        "text": "Ditentukan oleh ketua koperasi secara pribadi"
      },
      {
        "key": "E",
        "text": "Tidak mendapatkan SHU karena petani"
      }
    ],
    "correct": "B",
    "explanation": "SHU anggota terdiri dari SHU Jasa Modal (porsi simpanan) ditambah SHU Jasa Anggota/Usaha (porsi keaktifan berbelanja/meminjam)."
  },
  {
    "id": 135,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 15,
    "question": "Koperasi Unit Desa (KUD) di OKU Timur yang menyediakan pupuk, benih padi, pestisida, dan membeli gabah petani anggota dikategorikan sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi simpan pinjam murni"
      },
      {
        "key": "B",
        "text": "Koperasi produsen dan konsumsi serba usaha (KSU)"
      },
      {
        "key": "C",
        "text": "Koperasi jasa asuransi"
      },
      {
        "key": "D",
        "text": "Koperasi perumahan"
      },
      {
        "key": "E",
        "text": "Koperasi impor barang mewah"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi serba usaha (KSU) melayani penyediaan sarana produksi (konsumsi/produksi) sekaligus pemasaran hasil panen anggotanya."
  },
  {
    "id": 136,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 16,
    "question": "Di sebuah sekolah di Belitang, Koperasi Siswa (Kopsis) menjual buku tulis, seragam, alat tulis, dan makanan sehat. Manfaat utama Koperasi Siswa adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mencari keuntungan pribadi bagi pengurus kelas"
      },
      {
        "key": "B",
        "text": "Menyediakan kebutuhan sekolah siswa dengan harga wajar serta menjadi sarana pendidikan karakter dan praktik wirausaha siswa"
      },
      {
        "key": "C",
        "text": "Menggantikan peran kantin swasta secara paksa"
      },
      {
        "key": "D",
        "text": "Mengharuskan siswa meminjam uang berbunga"
      },
      {
        "key": "E",
        "text": "Menjadikan siswa pedagang keliling"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi siswa melayani kebutuhan perlengkapan belajar peserta didik sekaligus menjadi laboratorium pendidikan ekonomi dan kerja sama."
  },
  {
    "id": 137,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 17,
    "question": "Badan Usaha Milik Negara (BUMN) yang berbentuk 'Persero' (seperti PT Bank Rakyat Indonesia Tbk atau PT Pupuk Sriwidjaja) memiliki karakteristik utama, yaitu...",
    "options": [
      {
        "key": "A",
        "text": "Berorientasi murni memberikan layanan gratis tanpa memperhitungkan untung rugi"
      },
      {
        "key": "B",
        "text": "Modal terbagi dalam saham yang minimal 51% dimiliki oleh Negara RI, dan bertujuan mengejar keuntungan (profit oriented) sekaligus pelayanan publik"
      },
      {
        "key": "C",
        "text": "100% modal dimiliki oleh pihak swasta asing"
      },
      {
        "key": "D",
        "text": "Tidak berbadan hukum"
      },
      {
        "key": "E",
        "text": "Bebas dari kewajiban perpajakan"
      }
    ],
    "correct": "B",
    "explanation": "BUMN Persero berbadan hukum PT, saham mayoritas (>=51%) milik negara, dan berorientasi mencari laba profesional selain mendukung program negara."
  },
  {
    "id": 138,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 18,
    "question": "Perum BULOG yang mengelola cadangan beras pemerintah dan menjaga harga dasar gabah di tingkat petani merupakan contoh BUMN yang berstatus...",
    "options": [
      {
        "key": "A",
        "text": "Persero murni pencari laba"
      },
      {
        "key": "B",
        "text": "Perum (Perusahaan Umum) yang mengutamakan kemanfaatan umum bagi masyarakat luas"
      },
      {
        "key": "C",
        "text": "Koperasi simpan pinjam"
      },
      {
        "key": "D",
        "text": "Persekutuan Komanditer (CV)"
      },
      {
        "key": "E",
        "text": "Badan Usaha Milik Swasta Asing"
      }
    ],
    "correct": "B",
    "explanation": "Perum (Perusahaan Umum) adalah BUMN yang seluruh modalnya milik negara dan mengutamakan kemanfaatan umum penyediaan barang/jasa berkualitas."
  },
  {
    "id": 139,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 19,
    "question": "Badan Usaha Milik Daerah (BUMD) di Kabupaten OKU Timur (seperti Bank Sumsel Babel atau Perumda Air Minum Way Komering) didirikan dengan tujuan...",
    "options": [
      {
        "key": "A",
        "text": "Menyaingi usaha pedagang kecil di pasar tradisional"
      },
      {
        "key": "B",
        "text": "Menyumbang Pendapatan Asli Daerah (PAD), mendorong pertumbuhan ekonomi daerah, dan melayani kebutuhan air bersih/perbankan warga"
      },
      {
        "key": "C",
        "text": "Menghabiskan dana APBD kabupaten"
      },
      {
        "key": "D",
        "text": "Menciptakan monopoli perdagangan beras swasta"
      },
      {
        "key": "E",
        "text": "Menjual aset daerah kepada pihak luar"
      }
    ],
    "correct": "B",
    "explanation": "BUMD dibentuk oleh Pemerintah Daerah untuk memberi kontribusi terhadap PAD, menggerakkan roda ekonomi lokal, dan melayani utilitas publik."
  },
  {
    "id": 140,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 20,
    "question": "Bentuk Badan Usaha Milik Swasta (BUMS) yang didirikan oleh dua orang atau lebih, di mana terdapat sekutu aktif (pengelola) dan sekutu pasif (penanam modal saja) disebut...",
    "options": [
      {
        "key": "A",
        "text": "Firma (Fa)"
      },
      {
        "key": "B",
        "text": "Persekutuan Komanditer (CV - Commanditaire Vennootschap)"
      },
      {
        "key": "C",
        "text": "Perseroan Terbatas (PT)"
      },
      {
        "key": "D",
        "text": "Perusahaan Perseorangan"
      },
      {
        "key": "E",
        "text": "Yayasan"
      }
    ],
    "correct": "B",
    "explanation": "CV memiliki sekutu aktif/komplementer (menjalankan usaha dengan tanggung jawab penuh) dan sekutu pasif/komanditer (hanya setor modal)."
  },
  {
    "id": 141,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 21,
    "question": "Karakteristik penting dari bentuk badan usaha Perseroan Terbatas (PT) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tanggung jawab pemilik modal/pemegang saham bersifat terbatas sebesar modal saham yang disetor"
      },
      {
        "key": "B",
        "text": "Jika perusahaan bangkrut, harta pribadi pemegang saham akan ikut disita bank"
      },
      {
        "key": "C",
        "text": "Hanya boleh didirikan oleh satu keluarga sedarah"
      },
      {
        "key": "D",
        "text": "Tidak memerlukan akta notaris resmi"
      },
      {
        "key": "E",
        "text": "Keuntungan dibagi rata kepada seluruh karyawan"
      }
    ],
    "correct": "A",
    "explanation": "Ciri khas PT adalah 'Limited Liability' (tanggung jawab terbatas). Pemegang saham hanya bertanggung jawab sebatas nominal saham yang dimilikinya."
  },
  {
    "id": 142,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 22,
    "question": "Di desa-desa di OKU Timur, lembaga ekonomi desa yang modalnya sebagian besar dimiliki oleh pemerintah desa dan warga untuk mengelola potensi lokal disebut...",
    "options": [
      {
        "key": "A",
        "text": "BUMN"
      },
      {
        "key": "B",
        "text": "BUMD"
      },
      {
        "key": "C",
        "text": "BUMDes (Badan Usaha Milik Desa)"
      },
      {
        "key": "D",
        "text": "Kadin"
      },
      {
        "key": "E",
        "text": "Holding Company"
      }
    ],
    "correct": "C",
    "explanation": "BUMDes (Badan Usaha Milik Desa) adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh desa guna meningkatkan PADesa."
  },
  {
    "id": 143,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 23,
    "question": "Peran utama Koperasi Simpan Pinjam (KSP) yang sehat dalam membantu UMKM mikro di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Mengenakan bunga harian berlipat ganda seperti rentenir"
      },
      {
        "key": "B",
        "text": "Menyediakan akses pinjaman modal usaha yang mudah, terjangkau, dan mendidik anggota agar terbebas dari jeratan lintah darat"
      },
      {
        "key": "C",
        "text": "Memaksa anggota membeli barang dagangan pengurus"
      },
      {
        "key": "D",
        "text": "Menyita barang jaminan tanpa proses musyawarah"
      },
      {
        "key": "E",
        "text": "Menyalurkan dana ke judi online"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi simpan pinjam melindungi anggotanya dari rentenir dengan menyediakan pembiayaan yang mudah, bunga wajar, dan berasas tolong-menolong."
  },
  {
    "id": 144,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 24,
    "question": "Prinsip kemandirian dalam jati diri koperasi internasional dan nasional berarti bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi tidak boleh menerima bantuan atau bekerja sama dengan pihak luar sama sekali"
      },
      {
        "key": "B",
        "text": "Koperasi dapat berdiri sendiri, berpijak pada kekuatan swadaya anggota, dan tidak bergantung pada belas kasihan pihak luar"
      },
      {
        "key": "C",
        "text": "Pengurus koperasi bebas berbuat semaunya tanpa aturan"
      },
      {
        "key": "D",
        "text": "Anggota dilarang mengikuti rapat tahunan"
      },
      {
        "key": "E",
        "text": "Koperasi tidak perlu membayar pajak"
      }
    ],
    "correct": "B",
    "explanation": "Prinsip kemandirian berarti koperasi mampu mengelola organisasinya secara otonom dengan mengandalkan partisipasi aktif modal dan usaha anggota."
  },
  {
    "id": 145,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 25,
    "question": "Perangkat organisasi koperasi yang bertugas menjalankan roda operasional harian, menyusun rencana kerja anggaran, dan mewakili koperasi di dalam dan di luar pengadilan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Dewan Pengawas"
      },
      {
        "key": "B",
        "text": "Pengurus Koperasi"
      },
      {
        "key": "C",
        "text": "Rapat Anggota Luar Biasa"
      },
      {
        "key": "D",
        "text": "Auditor Independen"
      },
      {
        "key": "E",
        "text": "Kepala Desa"
      }
    ],
    "correct": "B",
    "explanation": "Pengurus koperasi dipilih oleh anggota untuk mengelola kegiatan operasional, memimpin organisasi, dan bertanggung jawab kepada Rapat Anggota."
  },
  {
    "id": 146,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 26,
    "question": "Tugas utama dari Pengawas Koperasi adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menyetujui pinjaman untuk keluarga sendiri"
      },
      {
        "key": "B",
        "text": "Melakukan pengawasan terhadap pelaksanaan kebijakan dan pengelolaan koperasi serta membuat laporan tertulis untuk Rapat Anggota"
      },
      {
        "key": "C",
        "text": "Menjual sembako di gerai koperasi"
      },
      {
        "key": "D",
        "text": "Menggantikan ketua pengurus jika rapat berlangsung"
      },
      {
        "key": "E",
        "text": "Menetapkan besaran simpanan pokok baru"
      }
    ],
    "correct": "B",
    "explanation": "Pengawas bertugas mengawasi jalannya roda organisasi dan keuangan koperasi agar transparan dan sesuai dengan keputusan Rapat Anggota."
  },
  {
    "id": 147,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 27,
    "question": "Alasan mengapa Koperasi disebut sebagai 'Soko Guru Perekonomian Indonesia' adalah...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi merupakan satu-satunya badan usaha yang boleh berdiri di Indonesia"
      },
      {
        "key": "B",
        "text": "Koperasi mencerminkan kepribadian bangsa Indonesia (gotong royong) dan menempatkan kemakmuran bersama di atas kemakmuran orang-seorang"
      },
      {
        "key": "C",
        "text": "Koperasi menyumbang pajak terbesar melebihi seluruh BUMN"
      },
      {
        "key": "D",
        "text": "Koperasi hanya ada di Indonesia dan tidak ada di negara lain"
      },
      {
        "key": "E",
        "text": "Gedung koperasi selalu bertingkat tinggi"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi dianggap soko guru (tiang penyangga utama) karena strukturnya berakar pada asas kekeluargaan dan gotong royong asli bangsa Indonesia."
  },
  {
    "id": 148,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 28,
    "question": "Jika seorang anggota koperasi mengundurkan diri secara resmi dan tidak lagi menjadi anggota, maka hak keuangannya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Seluruh simpanan pokok dan simpanan wajibnya hangus disita pengurus"
      },
      {
        "key": "B",
        "text": "Dapat menarik kembali simpanan pokok, simpanan wajib, dan simpanan sukarela miliknya setelah dipotong kewajiban utang (jika ada)"
      },
      {
        "key": "C",
        "text": "Mendapat ganti rugi 10 kali lipat dari pemerintah"
      },
      {
        "key": "D",
        "text": "Wajib membayar denda pengunduran diri yang besar"
      },
      {
        "key": "E",
        "text": "Tidak boleh keluar dari koperasi selamanya"
      }
    ],
    "correct": "B",
    "explanation": "Anggota yang keluar berhak menerima kembali simpanan pokok, wajib, dan sukarela miliknya setelah menyelesaikan kewajiban pinjamannya."
  },
  {
    "id": 149,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 29,
    "question": "Dana Cadangan dalam pembagian SHU koperasi dialokasikan dengan tujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Dibagikan sebagai bonus tunai rahasia bagi ketua pengurus"
      },
      {
        "key": "B",
        "text": "Memupuk modal sendiri koperasi dan menutup kemungkinan kerugian usaha di masa mendatang"
      },
      {
        "key": "C",
        "text": "Membeli kado ulang tahun anggota"
      },
      {
        "key": "D",
        "text": "Dihabiskan saat acara rekreasi pengurus"
      },
      {
        "key": "E",
        "text": "Diserahkan ke kas desa"
      }
    ],
    "correct": "B",
    "explanation": "Dana cadangan disisihkan dari SHU untuk menambah modal sendiri dan mengantisipasi risiko kerugian usaha agar koperasi tetap stabil."
  },
  {
    "id": 150,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 30,
    "question": "Koperasi Konsumsi memiliki fungsi utama melayani anggotanya dalam bentuk...",
    "options": [
      {
        "key": "A",
        "text": "Membeli gabah basah dari sawah"
      },
      {
        "key": "B",
        "text": "Menyediakan kebutuhan barang konsumsi sehari-hari dengan mutu terjamin dan harga yang wajar bagi anggotanya"
      },
      {
        "key": "C",
        "text": "Memproduksi mesin traktor tangan"
      },
      {
        "key": "D",
        "text": "Menyalurkan tenaga kerja ke luar negeri"
      },
      {
        "key": "E",
        "text": "Menyediakan kredit perumahan mewah"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi konsumsi berfokus menyediakan barang kebutuhan pokok sehari-hari (sembako, alat tulis) bagi kenyamanan anggotanya."
  },
  {
    "id": 151,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 31,
    "question": "Salah satu tantangan umum yang sering dihadapi oleh koperasi konvensional di era digital adalah...",
    "options": [
      {
        "key": "A",
        "text": "Terlalu banyak anak muda yang mendaftar menjadi pengurus"
      },
      {
        "key": "B",
        "text": "Manajemen masih manual, pembukuan belum transparan berbasis aplikasi, dan regenerasi anggota muda yang lambat"
      },
      {
        "key": "C",
        "text": "Bunga tabungan yang terlalu tinggi"
      },
      {
        "key": "D",
        "text": "Aturan pemerintah yang terlalu bebas"
      },
      {
        "key": "E",
        "text": "Banyaknya gerai minimarket yang bergabung menjadi anggota"
      }
    ],
    "correct": "B",
    "explanation": "Tantangan koperasi masa kini adalah modernisasi tata kelola digital, akuntabilitas laporan real-time, dan menarik minat generasi muda (Gen-Z)."
  },
  {
    "id": 152,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 32,
    "question": "Koperasi Produksi adalah jenis koperasi yang anggotanya terdiri dari para produsen, contoh nyatanya di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Koperasi pegawai negeri yang berbelanja pakaian"
      },
      {
        "key": "B",
        "text": "Koperasi Peternak Sapi Potong yang mengolah pakan ternak bersama dan memasarkan daging sapi"
      },
      {
        "key": "C",
        "text": "Koperasi simpan pinjam di pasar"
      },
      {
        "key": "D",
        "text": "Koperasi jasa fotokopi kampus"
      },
      {
        "key": "E",
        "text": "Koperasi perumahan rakyat"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi produksi menampung produsen mandiri (peternak, petani, perajin) untuk memproduksi dan memasarkan komoditas secara kolektif."
  },
  {
    "id": 153,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 33,
    "question": "Jika Koperasi Tani di Belitang berhasil melakukan pembelian bersama (bulk buying) pupuk dan obat pertanian langsung dari pabrik pupuk BUMN, keuntungan bagi petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Harga beli pupuk menjadi jauh lebih murah, terhindar dari kelangkaan, dan keaslian produk terjamin"
      },
      {
        "key": "B",
        "text": "Petani diwajibkan membeli pupuk palsu"
      },
      {
        "key": "C",
        "text": "Keuntungan pabrik pupuk menurun drastis"
      },
      {
        "key": "D",
        "text": "Petani tidak boleh menanam padi lagi"
      },
      {
        "key": "E",
        "text": "Pupuk disimpan di gudang tanpa dibagikan"
      }
    ],
    "correct": "A",
    "explanation": "Pembelian kolektif skala besar memangkas rantai calo perantara, menurunkan harga beli netto, dan menjamin keaslian saprotan."
  },
  {
    "id": 154,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 34,
    "question": "Ciri khas badan usaha Firma (Fa) dalam pembagian tanggung jawab hukum adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tanggung jawab sekutu terbatas hanya pada modal yang disetor"
      },
      {
        "key": "B",
        "text": "Setiap anggota sekutu bertanggung jawab secara pribadi dan solider (tanggung renteng tak terbatas) hingga ke harta pribadi atas seluruh perikatan firma"
      },
      {
        "key": "C",
        "text": "Firma dimiliki oleh minimal 100 orang pemegang saham"
      },
      {
        "key": "D",
        "text": "Tidak ada anggota yang boleh mengelola usaha"
      },
      {
        "key": "E",
        "text": "Firma dibubarkan setiap akhir tahun"
      }
    ],
    "correct": "B",
    "explanation": "Dalam Firma, tanggung jawab anggotanya bersifat tanggung renteng dan tidak terbatas, hingga menyentuh harta pribadi jika terjadi kerugian utang."
  },
  {
    "id": 155,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 35,
    "question": "Kriteria Usaha Mikro menurut regulasi perundang-undangan di Indonesia didasarkan pada...",
    "options": [
      {
        "key": "A",
        "text": "Kekayaan bersih (aset) dan hasil penjualan tahunan (omzet) yang berada di bawah ambang batas skala usaha kecil/menengah"
      },
      {
        "key": "B",
        "text": "Jumlah gedung kantor yang dimiliki"
      },
      {
        "key": "C",
        "text": "Tingkat pendidikan pemilik usaha"
      },
      {
        "key": "D",
        "text": "Keberadaan rekening valas di luar negeri"
      },
      {
        "key": "E",
        "text": "Jumlah cabang di seluruh provinsi"
      }
    ],
    "correct": "A",
    "explanation": "Kategori UMKM diukur berdasarkan kriteria modal usaha/aset bersih di luar tanah/bangunan dan hasil penjualan tahunan (omzet)."
  },
  {
    "id": 156,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 36,
    "question": "Peran BUMN strategis seperti PT PLN (Persero) dalam perekonomian Indonesia sesuai amanat Pasal 33 ayat (2) UUD 1945 adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menguasai cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak agar dikelola demi sebesar-besarnya kemakmuran rakyat"
      },
      {
        "key": "B",
        "text": "Menjual listrik dengan harga setinggi-tingginya kepada rakyat miskin"
      },
      {
        "key": "C",
        "text": "Menyerahkan pengelolaan listrik kepada investor asing secara bebas"
      },
      {
        "key": "D",
        "text": "Menghambat pembangunan industri di daerah"
      },
      {
        "key": "E",
        "text": "Hanya menyuplai listrik di ibu kota saja"
      }
    ],
    "correct": "A",
    "explanation": "Pasal 33 ayat (2) UUD 1945 menegaskan cabang produksi penting yang menguasai hajat hidup publik dikuasai negara demi kesejahteraan rakyat."
  },
  {
    "id": 157,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 37,
    "question": "Koperasi yang modern saat ini mulai menerapkan digitalisasi dengan meluncurkan aplikasi 'Koperasi Mobile', manfaatnya bagi anggota di pedesaan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Anggota dapat melihat saldo simpanan, mengajukan pinjaman, dan membayar tagihan listrik/air secara mudah dari ponsel pintar tanpa antre di kantor"
      },
      {
        "key": "B",
        "text": "Menghilangkan silaturahmi antar-warga desa selamanya"
      },
      {
        "key": "C",
        "text": "Menaikkan bunga pinjaman secara sepihak"
      },
      {
        "key": "D",
        "text": "Membatasi hak suara anggota saat rapat"
      },
      {
        "key": "E",
        "text": "Menolak pendaftaran anggota baru"
      }
    ],
    "correct": "A",
    "explanation": "Aplikasi koperasi digital mempermudah transaksi, meningkatkan transparansi saldo anggota, dan memperluas layanan PPOB di desa."
  },
  {
    "id": 158,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 38,
    "question": "Di sebuah koperasi simpan pinjam, modal pinjaman yang diperoleh dari pihak luar dapat bersumber dari...",
    "options": [
      {
        "key": "A",
        "text": "Simpanan pokok anggota sendiri"
      },
      {
        "key": "B",
        "text": "Pinjaman bank, pinjaman dari koperasi lain, penerbitan obligasi surat utang, atau bantuan perkuatan permodalan pemerintah"
      },
      {
        "key": "C",
        "text": "Simpanan wajib bulanan"
      },
      {
        "key": "D",
        "text": "Penyusutan inventaris kantor"
      },
      {
        "key": "E",
        "text": "Dana cadangan modal sendiri"
      }
    ],
    "correct": "B",
    "explanation": "Modal pinjaman berasal dari pihak eksternal, seperti kredit perbankan, pinjaman dari koperasi sekunder, atau lembaga pembiayaan pemerintah."
  },
  {
    "id": 159,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 39,
    "question": "Tindakan pengurus koperasi yang menggunakan uang kas simpanan anggota untuk kepentingan pribadi tanpa izin Rapat Anggota merupakan tindakan...",
    "options": [
      {
        "key": "A",
        "text": "Pelanggaran hukum pidana penggelapan dalam jabatan yang dapat dituntut ke pengadilan"
      },
      {
        "key": "B",
        "text": "Tindakan inovatif yang patut dicontoh"
      },
      {
        "key": "C",
        "text": "Bagian dari hak istimewa ketua pengurus"
      },
      {
        "key": "D",
        "text": "Bentuk kebebasan berkoperasi"
      },
      {
        "key": "E",
        "text": "Diperbolehkan asalkan diganti dalam 10 tahun"
      }
    ],
    "correct": "A",
    "explanation": "Penyalahgunaan dana simpanan anggota oleh pengurus adalah tindak pidana korupsi/penggelapan yang melanggar hukum dan AD/ART koperasi."
  },
  {
    "id": 160,
    "day": 1,
    "indicatorCode": "D",
    "indicatorKey": "ind_badan_usaha_koperasi",
    "indicatorName": "Badan Usaha & Koperasi Indonesia",
    "numberInIndicator": 40,
    "question": "Hubungan kemitraan yang ideal antara Badan Usaha Milik Negara (BUMN), Swasta (BUMS), dan Koperasi dalam sistem Demokrasi Ekonomi Pancasila adalah...",
    "options": [
      {
        "key": "A",
        "text": "Saling membunuh dan mematikan usaha satu sama lain dalam persaingan bebas"
      },
      {
        "key": "B",
        "text": "Saling bekerja sama dan bersinergi harmonis di mana BUMN memegang sektor strategis, Swasta menggerakkan dinamika pasar, dan Koperasi memperkuat ekonomi rakyat"
      },
      {
        "key": "C",
        "text": "BUMN harus menguasai seluruh warung kecil"
      },
      {
        "key": "D",
        "text": "Swasta dilarang beroperasi di Indonesia"
      },
      {
        "key": "E",
        "text": "Koperasi dibubarkan dan diganti menjadi BUMN"
      }
    ],
    "correct": "B",
    "explanation": "Tiga pilar ekonomi Indonesia (BUMN, BUMS, dan Koperasi) dirancang bersinergi harmonis saling menopang dalam sistem ekonomi kerakyatan."
  },
  {
    "id": 161,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 1,
    "question": "Kabupaten OKU Timur secara luas dikenal di tingkat provinsi Sumatera Selatan dan nasional dengan julukan utama sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Kota Tambang Batubara Terbesar"
      },
      {
        "key": "B",
        "text": "Lumbung Padi dan Sentra Pangan Sumatera Selatan"
      },
      {
        "key": "C",
        "text": "Kota Industri Tekstil Modern"
      },
      {
        "key": "D",
        "text": "Kawasan Wisata Bahari Kepulauan"
      },
      {
        "key": "E",
        "text": "Pusat Kilang Minyak Lepas Pantai"
      }
    ],
    "correct": "B",
    "explanation": "OKU Timur adalah lumbung pangan utama Sumsel dengan surplus produksi beras ratusan ribu ton per tahun yang menyuplai berbagai provinsi."
  },
  {
    "id": 162,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 2,
    "question": "Keberhasilan sektor pertanian padi sawah di kawasan Belitang tidak terlepas dari keberadaan sistem irigasi teknis yang bersumber dari aliran sungai...",
    "options": [
      {
        "key": "A",
        "text": "Sungai Musi"
      },
      {
        "key": "B",
        "text": "Sungai Komering (Jaringan Irigasi Upper Komering)"
      },
      {
        "key": "C",
        "text": "Sungai Ogan"
      },
      {
        "key": "D",
        "text": "Sungai Lematang"
      },
      {
        "key": "E",
        "text": "Sungai Batanghari"
      }
    ],
    "correct": "B",
    "explanation": "Sistem irigasi teknis Belitang bersumber dari Bendung Perjaya di Sungai Komering yang mengairi puluhan ribu hektare sawah teknis."
  },
  {
    "id": 163,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 3,
    "question": "Dalam penamaan saluran irigasi di Belitang, kode 'BK' yang sangat familiar bagi warga masyarakat setempat (seperti BK 0, BK 9, BK 16) merupakan singkatan dari...",
    "options": [
      {
        "key": "A",
        "text": "Belitang Kulon"
      },
      {
        "key": "B",
        "text": "Bendung Komering / Bangunan Komering"
      },
      {
        "key": "C",
        "text": "Batas Kecamatan"
      },
      {
        "key": "D",
        "text": "Bumi Kencana"
      },
      {
        "key": "E",
        "text": "Banjir Kanal"
      }
    ],
    "correct": "B",
    "explanation": "Kode 'BK' adalah singkatan teknis dari Bangunan Komering / Saluran Sekunder Belitang yang menandai titik pintu bagi air irigasi."
  },
  {
    "id": 164,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 4,
    "question": "Dengan adanya jaringan irigasi teknis yang teratur, pola indeks pertanaman (IP) padi di sawah irigasi Belitang dapat mencapai...",
    "options": [
      {
        "key": "A",
        "text": "IP 100 (Hanya panen 1 kali setahun)"
      },
      {
        "key": "B",
        "text": "IP 200 hingga IP 300 (Dapat panen 2 sampai 3 kali dalam satu tahun)"
      },
      {
        "key": "C",
        "text": "Hanya mengandalkan musim hujan (tadah hujan)"
      },
      {
        "key": "D",
        "text": "Tidak bisa ditanami padi sawah"
      },
      {
        "key": "E",
        "text": "Panen sekali setiap 3 tahun"
      }
    ],
    "correct": "B",
    "explanation": "Irigasi teknis memungkinkan petani menanam padi 2 kali (IP 200) bahkan hingga 3 kali (IP 300) setahun diselingi palawija."
  },
  {
    "id": 165,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 5,
    "question": "Selain tanaman pangan padi, komoditas perkebunan rakyat yang menjadi sumber penghasilan utama warga di kawasan non-irigasi OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Karet alam dan Kelapa Sawit"
      },
      {
        "key": "B",
        "text": "Cengkeh dan Pala"
      },
      {
        "key": "C",
        "text": "Apel dan Stroberi"
      },
      {
        "key": "D",
        "text": "Tembakau dan Gandum"
      },
      {
        "key": "E",
        "text": "Kopi Robusta dataran tinggi"
      }
    ],
    "correct": "A",
    "explanation": "Perkebunan rakyat di OKU Timur didominasi oleh karet alam dan kelapa sawit yang menjadi penopang pendapatan di luar sentra sawah padi."
  },
  {
    "id": 166,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 6,
    "question": "Kecamatan di Kabupaten OKU Timur yang menjadi pusat perdagangan grosir, perbankan, dan denyut nadi ekonomi paling ramai di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Kecamatan Martapura"
      },
      {
        "key": "B",
        "text": "Kecamatan Belitang (Kawasan Pasar Gumawang)"
      },
      {
        "key": "C",
        "text": "Kecamatan Cempaka"
      },
      {
        "key": "D",
        "text": "Kecamatan Semendawai Suku III"
      },
      {
        "key": "E",
        "text": "Kecamatan Jayapura"
      }
    ],
    "correct": "B",
    "explanation": "Pasar Gumawang di Kecamatan Belitang adalah pusat perniagaan, jasa keuangan, dan distribusi barang terbesar bagi kawasan Belitang raya."
  },
  {
    "id": 167,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 7,
    "question": "Potensi sektor peternakan yang berkembang pesat dan menjadi komoditas unggulan di OKU Timur hingga menyuplai kebutuhan luar daerah adalah...",
    "options": [
      {
        "key": "A",
        "text": "Peternakan unta"
      },
      {
        "key": "B",
        "text": "Peternakan Sapi Potong (penggemukan dan pembibitan)"
      },
      {
        "key": "C",
        "text": "Peternakan kuda pacu"
      },
      {
        "key": "D",
        "text": "Peternakan burung unta"
      },
      {
        "key": "E",
        "text": "Peternakan babi hutan"
      }
    ],
    "correct": "B",
    "explanation": "OKU Timur merupakan salah satu sentra populasi sapi potong terbesar di Sumsel dengan sistem integrasi sapi-sawit dan pakan jerami fermentasi."
  },
  {
    "id": 168,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 8,
    "question": "Di sektor perikanan air tawar, komoditas ikan budidaya yang banyak dikembangkan di kolam-kolam air tenang warga OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Ikan Salmon dan Tuna"
      },
      {
        "key": "B",
        "text": "Ikan Patin, Lele, dan Nila"
      },
      {
        "key": "C",
        "text": "Ikan Kerapu dan Kakap Merah"
      },
      {
        "key": "D",
        "text": "Ikan Bandeng air payau"
      },
      {
        "key": "E",
        "text": "Ikan Hiu martil"
      }
    ],
    "correct": "B",
    "explanation": "Ikan patin, lele, dan nila adalah komoditas perikanan air tawar unggulan di OKU Timur yang dibudidayakan di kolam air tenang dan bioflok."
  },
  {
    "id": 169,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 9,
    "question": "Keberadaan Rice Milling Unit (RMU) modern skala besar di Belitang memberikan nilai tambah bagi ekonomi lokal karena...",
    "options": [
      {
        "key": "A",
        "text": "Membuat beras menjadi cepat busuk"
      },
      {
        "key": "B",
        "text": "Meningkatkan kualitas beras giling menjadi mutu premium/medium kemasan dan menyerap tenaga kerja lokal"
      },
      {
        "key": "C",
        "text": "Mencegah beras dijual ke luar Belitang"
      },
      {
        "key": "D",
        "text": "Menurunkan harga jual gabah petani"
      },
      {
        "key": "E",
        "text": "Menghilangkan limbah sekam secara instan"
      }
    ],
    "correct": "B",
    "explanation": "RMU modern mengolah gabah menjadi beras kemasan standar premium/medium yang memiliki harga jual lebih tinggi dan daya simpan lebih tahan lama."
  },
  {
    "id": 170,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 10,
    "question": "Layanan perbankan tanpa kantor (Branchless Banking) seperti Agen BRILink, Agen Mandiri, dan BSI Smart yang menjamur di desa-desa OKU Timur berperan penting dalam...",
    "options": [
      {
        "key": "A",
        "text": "Menyulitkan warga desa saat ingin mentransfer uang"
      },
      {
        "key": "B",
        "text": "Memudahkan warga desa melakukan transaksi setor tunai, tarik tunai, transfer, dan pembayaran tagihan tanpa perlu jauh-jauh ke kota kecamatan"
      },
      {
        "key": "C",
        "text": "Menggantikan peran pasar tradisional secara paksa"
      },
      {
        "key": "D",
        "text": "Mewajibkan warga membayar sewa toko bulanan"
      },
      {
        "key": "E",
        "text": "Menolak peredaran uang Rupiah"
      }
    ],
    "correct": "B",
    "explanation": "Agen bank di desa mendekatkan akses keuangan, memangkas ongkos transportasi warga ke kota kecamatan, dan meningkatkan perputaran uang di desa."
  },
  {
    "id": 171,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 11,
    "question": "Salah satu tantangan utama yang kerap dihadapi petani padi di OKU Timur pada saat puncak Panen Raya adalah...",
    "options": [
      {
        "key": "A",
        "text": "Harga gabah melonjak terlalu tinggi tidak terjangkau"
      },
      {
        "key": "B",
        "text": "Penurunan harga gabah di tingkat petani (anjlok) akibat melimpahnya pasokan dan keterbatasan kapasitas pengeringan saat musim hujan"
      },
      {
        "key": "C",
        "text": "Kekurangan benih padi di kios resmi"
      },
      {
        "key": "D",
        "text": "Dilarang memanen padi oleh pemerintah"
      },
      {
        "key": "E",
        "text": "Tidak ada pembeli yang datang"
      }
    ],
    "correct": "B",
    "explanation": "Saat panen raya serentak, pasokan gabah membludak sehingga harga di tingkat petani rentan jatuh jika tidak didukung pengering (dryer) dan serapan Bulog."
  },
  {
    "id": 172,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 12,
    "question": "Pemanfaatan jerami sisa panen padi di OKU Timur untuk pakan ternak sapi dan pembuatan pupuk kompos merupakan contoh penerapan prinsip...",
    "options": [
      {
        "key": "A",
        "text": "Perekonomian linier buang sekali pakai"
      },
      {
        "key": "B",
        "text": "Ekonomi Sirkular (Circular Economy) dan integrasi tanaman-ternak ramah lingkungan"
      },
      {
        "key": "C",
        "text": "Eksploitasi lahan secara berlebihan"
      },
      {
        "key": "D",
        "text": "Pertanian monokultur tertutup"
      },
      {
        "key": "E",
        "text": "Pemborosan sumber daya lokal"
      }
    ],
    "correct": "B",
    "explanation": "Ekonomi sirkular memanfaatkan limbah jerami pertanian menjadi pakan sapi, kotoran sapi menjadi biogas/pupuk organik sawah tanpa terbuang percuma."
  },
  {
    "id": 173,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 13,
    "question": "Produk olahan pangan khas lokal berbasis hasil panen pertanian yang banyak diproduksi oleh UMKM rumahan di Belitang antara lain...",
    "options": [
      {
        "key": "A",
        "text": "Keripik pisang, sale pisang, rengginang beras ketan, dan kerupuk beras"
      },
      {
        "key": "B",
        "text": "Cokelat batang Swiss"
      },
      {
        "key": "C",
        "text": "Keju cheddar impor"
      },
      {
        "key": "D",
        "text": "Kue pie apel impor"
      },
      {
        "key": "E",
        "text": "Kurma madu"
      }
    ],
    "correct": "A",
    "explanation": "Hilirisasi pangan lokal Belitang melahirkan UMKM rengginang ketan, keripik pisang, sale pisang, dan aneka camilan berbasis panen setempat."
  },
  {
    "id": 174,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 14,
    "question": "Pusat pemerintahan Kabupaten OKU Timur (kantor Bupati dan instansi dinas daerah) berlokasi di kecamatan...",
    "options": [
      {
        "key": "A",
        "text": "Kecamatan Belitang"
      },
      {
        "key": "B",
        "text": "Kecamatan Martapura"
      },
      {
        "key": "C",
        "text": "Kecamatan Buay Madang"
      },
      {
        "key": "D",
        "text": "Kecamatan Madang Suku I"
      },
      {
        "key": "E",
        "text": "Kecamatan Belitang Madang Raya"
      }
    ],
    "correct": "B",
    "explanation": "Kecamatan Martapura adalah ibu kota dan pusat administrasi pemerintahan resmi Kabupaten Ogan Komering Ulu Timur (OKU Timur)."
  },
  {
    "id": 175,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 15,
    "question": "Peran jalur transportasi Jalan Lintas Tengah Sumatera dan jalur kereta api yang melintasi Martapura bagi perekonomian OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Hanya sebagai jalur penyeberangan pejalan kaki"
      },
      {
        "key": "B",
        "text": "Memperlancar arus logistik komoditas pertanian dan barang niaga menuju Palembang, Lampung, dan Pulau Jawa"
      },
      {
        "key": "C",
        "text": "Menghambat pergerakan pedagang antar-provinsi"
      },
      {
        "key": "D",
        "text": "Menaikkan tarif distribusi sembako"
      },
      {
        "key": "E",
        "text": "Mengisolasi desa-desa di pedalaman"
      }
    ],
    "correct": "B",
    "explanation": "Konektivitas jalan lintas dan stasiun kereta api Martapura mempermudah pengiriman hasil bumi dan mobilitas penumpang ke sentra ekonomi luar daerah."
  },
  {
    "id": 176,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 16,
    "question": "Koperasi Unit Desa (KUD) di OKU Timur dapat membantu petani anggotanya dari permainan harga tengkulak dengan cara...",
    "options": [
      {
        "key": "A",
        "text": "Menolak membeli hasil panen anggota"
      },
      {
        "key": "B",
        "text": "Menampung hasil panen gabah anggota dengan harga acuan pemerintah (HAP/HPP) yang adil dan transparan"
      },
      {
        "key": "C",
        "text": "Meminjamkan uang dengan bunga harian"
      },
      {
        "key": "D",
        "text": "Menutup akses jalan menuju sawah"
      },
      {
        "key": "E",
        "text": "Menjual gabah ke luar negeri tanpa izin"
      }
    ],
    "correct": "B",
    "explanation": "Koperasi menjadi penstabil harga (buffer stock) yang membeli gabah petani sesuai harga acuan resmi sehingga petani terhindar dari pemerasan harga calo."
  },
  {
    "id": 177,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 17,
    "question": "Keberadaan BUMDes di desa-desa OKU Timur yang mengelola unit usaha air bersih perdesaan (PAMSIMAS) dan sewa tenda pernikahan berkontribusi nyata dalam...",
    "options": [
      {
        "key": "A",
        "text": "Menciptakan perselisihan antar-warga desa"
      },
      {
        "key": "B",
        "text": "Meningkatkan Pendapatan Asli Desa (PADesa), membuka lapangan kerja pemuda desa, dan memenuhi kebutuhan fasilitas warga"
      },
      {
        "key": "C",
        "text": "Mengharuskan warga membayar upeti kepada perangkat desa"
      },
      {
        "key": "D",
        "text": "Menghentikan dana transfer desa dari pusat"
      },
      {
        "key": "E",
        "text": "Menjual aset tanah desa kepada swasta"
      }
    ],
    "correct": "B",
    "explanation": "BUMDes berorientasi ganda: memfasilitasi kebutuhan air/jasa warga sekaligus mencetak laba bersih yang disetor ke kas desa (PADesa)."
  },
  {
    "id": 178,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 18,
    "question": "Hama tanaman padi yang sering menjadi ancaman serius bagi petani sawah di OKU Timur jika tidak dikendalikan secara terpadu adalah...",
    "options": [
      {
        "key": "A",
        "text": "Hama wereng batang coklat dan tikus sawah"
      },
      {
        "key": "B",
        "text": "Hama kepiting laut"
      },
      {
        "key": "C",
        "text": "Hama ulat sutera"
      },
      {
        "key": "D",
        "text": "Hama lalat buah apel"
      },
      {
        "key": "E",
        "text": "Hama rayap kayu jati"
      }
    ],
    "correct": "A",
    "explanation": "Wereng batang coklat (WBC) dan tikus sawah adalah dua organisme pengganggu tanaman (OPT) utama yang sering mengancam produktivitas padi sawah."
  },
  {
    "id": 179,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 19,
    "question": "Peluang wirausaha digital (agripreneur) yang sangat prospektif bagi generasi muda di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Menjadi penonton pasif saat panen raya tiba"
      },
      {
        "key": "B",
        "text": "Membangun platform pemasaran beras organik lokal secara daring, jasa sewa drone semprot pertanian, dan konten kreator edukasi agribisnis"
      },
      {
        "key": "C",
        "text": "Meninggalkan desa dan menganggur di kota besar"
      },
      {
        "key": "D",
        "text": "Menjual pupuk subsidi di atas harga eceran tertinggi"
      },
      {
        "key": "E",
        "text": "Menolak pemanfaatan internet di pedesaan"
      }
    ],
    "correct": "B",
    "explanation": "Generasi muda dapat memanfaatkan teknologi: pemasaran beras online langsung ke konsumen, jasa mekanisasi drone semprot pupuk, dan hilirisasi pangan."
  },
  {
    "id": 180,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 20,
    "question": "Dalam manajemen keuangan usaha tani padi di Belitang, yang tergolong sebagai modal kerja musiman (biaya operasional per musim tanam) adalah...",
    "options": [
      {
        "key": "A",
        "text": "Biaya pembelian traktor roda empat"
      },
      {
        "key": "B",
        "text": "Biaya pembuatan sertifikat tanah sawah"
      },
      {
        "key": "C",
        "text": "Biaya pembelian benih, pupuk, obat hama, dan upah tenaga kerja tanam/panen"
      },
      {
        "key": "D",
        "text": "Biaya pembangunan gedung rumah tinggal"
      },
      {
        "key": "E",
        "text": "Pajak bumi dan bangunan tahunan"
      }
    ],
    "correct": "C",
    "explanation": "Modal kerja per musim tanam habis dalam satu siklus budidaya: benih, pupuk, pestisida, dan upah olah tanah/tanam/panen."
  },
  {
    "id": 181,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 21,
    "question": "Keunggulan komparatif komoditas beras asal Belitang di pasaran dibandingkan beras dari daerah lain adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tekstur nasi yang pulen, aroma alami yang wangi, dan jaminan pasokan yang melimpah"
      },
      {
        "key": "B",
        "text": "Harganya selalu paling mahal sedunia"
      },
      {
        "key": "C",
        "text": "Berasnya berwarna hitam pekat dan berbau apek"
      },
      {
        "key": "D",
        "text": "Hanya bisa dimasak dengan tungku kayu kuno"
      },
      {
        "key": "E",
        "text": "Beras tidak bisa dikonsumsi oleh anak-anak"
      }
    ],
    "correct": "A",
    "explanation": "Beras Belitang dikenal luas di Sumsel dan Lampung karena kualitas rasa yang pulen, putih bersih, dan ketersediaan stok yang stabil."
  },
  {
    "id": 182,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 22,
    "question": "Peranan perempuan pedesaan dalam menopang ekonomi keluarga di OKU Timur sangat nyata, antara lain terlihat pada aktivitas...",
    "options": [
      {
        "key": "A",
        "text": "Menghalangi suami bekerja di ladang"
      },
      {
        "key": "B",
        "text": "Keterlibatan dalam buruh tanam padi (tandur), pengolahan UMKM keripik rumahan, dan pengelolaan warung kelontong"
      },
      {
        "key": "C",
        "text": "Hanya berdiam diri tanpa aktivitas produktif"
      },
      {
        "key": "D",
        "text": "Melarang anak menuntut ilmu ke sekolah"
      },
      {
        "key": "E",
        "text": "Menolak penggunaan uang rupiah di pasar"
      }
    ],
    "correct": "B",
    "explanation": "Perempuan pedesaan berkontribusi besar dalam penanaman padi (tandur), penyiangan, industri rumahan pangan, dan pengelolaan warung belanja keluarga."
  },
  {
    "id": 183,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 23,
    "question": "Fasilitas perbankan yang memberikan kredit dengan subsidi bunga dari pemerintah untuk membantu permodalan petani dan UMKM di Belitang disebut...",
    "options": [
      {
        "key": "A",
        "text": "Kredit Konsumtif Tanpa Agunan"
      },
      {
        "key": "B",
        "text": "Kredit Usaha Rakyat (KUR)"
      },
      {
        "key": "C",
        "text": "Pinjaman Online Fintech Ilegal"
      },
      {
        "key": "D",
        "text": "Kredit Valas Luar Negeri"
      },
      {
        "key": "E",
        "text": "Pinjaman Rentenir Keliling"
      }
    ],
    "correct": "B",
    "explanation": "KUR (Kredit Usaha Rakyat) adalah program pembiayaan modal kerja/investasi pemerintah bersubsidi bunga untuk UMKM dan petani produktif."
  },
  {
    "id": 184,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 24,
    "question": "Tindakan membakar jerami sisa panen padi di sawah secara sembarangan sangat tidak dianjurkan karena berdampak buruk terhadap...",
    "options": [
      {
        "key": "A",
        "text": "Membuat tanah sawah menjadi sangat subur seketika"
      },
      {
        "key": "B",
        "text": "Mematikan mikroorganisme tanah yang bermanfaat, memicu polusi kabut asap di jalan desa, dan membuang potensi bahan pupuk organik"
      },
      {
        "key": "C",
        "text": "Meningkatkan kandungan air dalam tanah"
      },
      {
        "key": "D",
        "text": "Mempercepat pertumbuhan bibit padi berikutnya"
      },
      {
        "key": "E",
        "text": "Membuat udara desa menjadi sejuk"
      }
    ],
    "correct": "B",
    "explanation": "Pembakaran jerami merusak struktur hara mikroorganisme tanah, mencemari udara, dan memboroskan biomassa yang harusnya dikembalikan ke tanah."
  },
  {
    "id": 185,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 25,
    "question": "Pemanfaatan sistem pembayaran QRIS pada lapak pedagang sayur dan sembako di pasar Belitang membuktikan bahwa...",
    "options": [
      {
        "key": "A",
        "text": "Digitalisasi keuangan hanya cocok untuk mal mewah di kota metropolitan"
      },
      {
        "key": "B",
        "text": "Masyarakat dan UMKM di tingkat pedesaan OKU Timur semakin melek teknologi finansial (fintech) dan siap bertransaksi modern"
      },
      {
        "key": "C",
        "text": "Pedagang tradisional menolak sistem perbankan"
      },
      {
        "key": "D",
        "text": "Uang tunai dilarang beredar di seluruh wilayah OKU Timur"
      },
      {
        "key": "E",
        "text": "Koneksi internet di OKU Timur sudah tidak diperlukan lagi"
      }
    ],
    "correct": "B",
    "explanation": "Penggunaan QRIS di pasar rakyat membuktikan inklusi keuangan dan adaptasi digital telah merambah UMKM pedesaan secara nyata."
  },
  {
    "id": 186,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 26,
    "question": "Lembaga penyedia bibit unggul, pupuk, dan penyuluhan pertanian yang mendampingi kelompok tani di tingkat kecamatan di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Balai Penyuluhan Pertanian (BPP) Dinas Pertanian"
      },
      {
        "key": "B",
        "text": "Kantor Urusan Agama"
      },
      {
        "key": "C",
        "text": "Dinas Perhubungan Laut"
      },
      {
        "key": "D",
        "text": "Kantor Pajak Pratama Luar Negeri"
      },
      {
        "key": "E",
        "text": "Pengadilan Tata Usaha Negara"
      }
    ],
    "correct": "A",
    "explanation": "BPP (Balai Penyuluhan Pertanian) di kecamatan mendampingi petani terkait teknologi budidaya, hama penyakit, dan tata kelola kelompok tani."
  },
  {
    "id": 187,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 27,
    "question": "Konsep 'Hilirisasi Pertanian' (Agro-industry Downstreaming) di OKU Timur bertujuan untuk...",
    "options": [
      {
        "key": "A",
        "text": "Menjual gabah basah langsung secepatnya tanpa diolah"
      },
      {
        "key": "B",
        "text": "Mengolah komoditas mentah hasil panen menjadi produk olahan bernilai ekonomi lebih tinggi sebelum dipasarkan ke konsumen akhir"
      },
      {
        "key": "C",
        "text": "Menghentikan seluruh aktivitas bercocok tanam"
      },
      {
        "key": "D",
        "text": "Mengimpor beras dari luar negeri sebanyak-banyaknya"
      },
      {
        "key": "E",
        "text": "Menurunkan harga jual produk lokal"
      }
    ],
    "correct": "B",
    "explanation": "Hilirisasi meningkatkan nilai tambah komoditas di dalam daerah (misal gabah jadi beras premium, jagung jadi pakan ternak, pisang jadi keripik)."
  },
  {
    "id": 188,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 28,
    "question": "Kelompok Tani (Poktan) dan Gabungan Kelompok Tani (Gapoktan) di desa-desa Belitang memiliki fungsi ekonomi strategis sebagai...",
    "options": [
      {
        "key": "A",
        "text": "Tempat berkumpul tanpa tujuan yang jelas"
      },
      {
        "key": "B",
        "text": "Wadah kerja sama pengelolaan air irigasi, pengajuan alokasi pupuk bersubsidi, dan pengorganisasian panen serentak"
      },
      {
        "key": "C",
        "text": "Badan hukum yang berhak mencetak uang"
      },
      {
        "key": "D",
        "text": "Lembaga penegak hukum peradilan desa"
      },
      {
        "key": "E",
        "text": "Panitia pemilihan lurah"
      }
    ],
    "correct": "B",
    "explanation": "Poktan dan Gapoktan mengorganisasi petani dalam jadwal tanam serentak, pembagian air irigasi, dan usulan e-RDKK pupuk subsidi."
  },
  {
    "id": 189,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 29,
    "question": "Sebuah keluarga petani di Belitang mengalokasikan hasil panen padinya: 60% dijual untuk biaya operasional dan sekolah anak, 30% disimpan di lumbung untuk makan 6 bulan ke depan, dan 10% untuk zakat serta dana darurat. Pola alokasi ini mencerminkan...",
    "options": [
      {
        "key": "A",
        "text": "Ketidakmampuan mengatur masa depan"
      },
      {
        "key": "B",
        "text": "Manajemen keuangan pertanian yang bijak, seimbang antara kebutuhan produktif, ketahanan pangan keluarga, dan tanggung jawab sosial"
      },
      {
        "key": "C",
        "text": "Pola hidup konsumtif yang berlebihan"
      },
      {
        "key": "D",
        "text": "Pelanggaran aturan kelompok tani"
      },
      {
        "key": "E",
        "text": "Tindakan spekulasi harga pasar"
      }
    ],
    "correct": "B",
    "explanation": "Pola pembagian ini mencerminkan kearifan lokal yang cerdas: menjaga likuiditas tunai, mengamankan pangan keluarga, dan mitigasi risiko."
  },
  {
    "id": 190,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 30,
    "question": "Sektor pariwisata edukasi pertanian (Agrowisata) yang potensial dikembangkan di Belitang berbasis potensi lokal adalah...",
    "options": [
      {
        "key": "A",
        "text": "Wisata selancar ombak tsunami"
      },
      {
        "key": "B",
        "text": "Wisata edukasi petik buah melon/semangka, budidaya ikan patin, dan pengenalan mekanisasi panen padi bagi pelajar"
      },
      {
        "key": "C",
        "text": "Wisata ski salju musim dingin"
      },
      {
        "key": "D",
        "text": "Wisata safari gurun pasir"
      },
      {
        "key": "E",
        "text": "Wisata kapal selam samudra"
      }
    ],
    "correct": "B",
    "explanation": "Agrowisata sawah, petik buah hortikultura, dan edukasi mina-padi sangat relevan dengan keunggulan bentang alam agraris OKU Timur."
  },
  {
    "id": 191,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 31,
    "question": "Keberadaan pabrik pupuk organik berbahan baku kotoran sapi dan sekam padi di OKU Timur dapat memberikan solusi atas permasalahan...",
    "options": [
      {
        "key": "A",
        "text": "Kelangkaan pupuk kimia dan mahalnya biaya pemupukan tanaman petani"
      },
      {
        "key": "B",
        "text": "Kurangnya pasokan air irigasi di musim kemarau"
      },
      {
        "key": "C",
        "text": "Kekurangan tenaga kerja pemanen padi"
      },
      {
        "key": "D",
        "text": "Tingginya tarif angkutan kereta api"
      },
      {
        "key": "E",
        "text": "Macetnya jalan raya perkotaan"
      }
    ],
    "correct": "A",
    "explanation": "Pupuk organik lokal mengurangi ketergantungan pada pupuk kimia bersubsidi, memperbaiki struktur biologi tanah, dan menekan biaya produksi petani."
  },
  {
    "id": 192,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 32,
    "question": "Persebaran geografis kecamatan di OKU Timur yang berbatasan langsung dengan Provinsi Lampung (seperti Martapura dan Way Tuba) memberikan keuntungan ekonomi berupa...",
    "options": [
      {
        "key": "A",
        "text": "Mudahnya penyelundupan barang terlarang"
      },
      {
        "key": "B",
        "text": "Posisi strategis sebagai pintu gerbang transit arus barang dan orang antar-provinsi Sumsel dan Lampung"
      },
      {
        "key": "C",
        "text": "Rawan terjadi pemadaman listrik berkepanjangan"
      },
      {
        "key": "D",
        "text": "Warga dilarang berbelanja ke luar desa"
      },
      {
        "key": "E",
        "text": "Mata uang yang digunakan bukan Rupiah"
      }
    ],
    "correct": "B",
    "explanation": "Letak perbatasan strategis menjadikan kawasan tersebut simpul transit perdagangan dan jasa logistik lintas provinsi Sumsel–Lampung."
  },
  {
    "id": 193,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 33,
    "question": "Dalam perencanaan investasi alat mesin pertanian (Alsintan) seperti mesin Combine Harvester (mesin pemanen padi terpadu), hal utama yang harus dihitung adalah...",
    "options": [
      {
        "key": "A",
        "text": "Warna cat bodi mesin agar menarik perhatian tetangga"
      },
      {
        "key": "B",
        "text": "Perhitungan Break Even Point (titik impas balik modal), biaya bahan bakar, biaya perawatan rutin, dan tarif sewa per hektare sawah"
      },
      {
        "key": "C",
        "text": "Berapa banyak orang yang bisa diajak berfoto di atas mesin"
      },
      {
        "key": "D",
        "text": "Kecepatan mesin melaju di jalan tol"
      },
      {
        "key": "E",
        "text": "Nama merek mesin buatan luar negeri"
      }
    ],
    "correct": "B",
    "explanation": "Investasi alsintan bernilai ratusan juta rupiah menuntut analisis finansial: BEP, biaya penyusutan, solar, suku cadang, dan luas lahan garapan."
  },
  {
    "id": 194,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 34,
    "question": "Limbah dedak padi hasil pemisahan kulit gabah di penggilingan padi Belitang memiliki nilai ekonomi tinggi karena menjadi bahan baku utama pembuatan...",
    "options": [
      {
        "key": "A",
        "text": "Bahan bangunan beton bertulang"
      },
      {
        "key": "B",
        "text": "Pakan konsentrat ternak unggas (ayam/bebek) dan pakan ikan air tawar"
      },
      {
        "key": "C",
        "text": "Bahan bakar roket antariksa"
      },
      {
        "key": "D",
        "text": "Minyak wangi sintetis"
      },
      {
        "key": "E",
        "text": "Kertas cetak uang"
      }
    ],
    "correct": "B",
    "explanation": "Dedak/bekatul padi kaya nutrisi dan karbohidrat sehingga menjadi komoditas pakan utama bagi industri peternakan ayam, bebek, dan ikan."
  },
  {
    "id": 195,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 35,
    "question": "Sikap mental wirausaha yang harus dimiliki pelajar OKU Timur agar mampu memajukan ekonomi daerah kelahirannya di masa depan adalah...",
    "options": [
      {
        "key": "A",
        "text": "Selalu mengeluh dan menunggu bantuan cuma-cuma dari pemerintah"
      },
      {
        "key": "B",
        "text": "Kreatif, ulet, melek literasi teknologi dan finansial, serta bangga mengembangkan potensi agraris lokal menjadi produk unggulan berdaya saing"
      },
      {
        "key": "C",
        "text": "Merasa rendah diri karena tinggal di daerah kabupaten agraris"
      },
      {
        "key": "D",
        "text": "Menolak belajar teknologi modern"
      },
      {
        "key": "E",
        "text": "Menjual seluruh tanah warisan untuk membeli gaya hidup konsumtif"
      }
    ],
    "correct": "B",
    "explanation": "Masa depan ketahanan pangan dan ekonomi OKU Timur bergantung pada pemuda yang kreatif, tangguh, adaptif digital, dan bangga pada potensi lokalnya."
  },
  {
    "id": 196,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 36,
    "question": "Dampak positif dari adanya program sertifikasi tanah gratis (PTSL) dari pemerintah bagi para petani pemilik sawah di Belitang adalah...",
    "options": [
      {
        "key": "A",
        "text": "Tanah petani disita oleh kantor pertanahan"
      },
      {
        "key": "B",
        "text": "Petani memiliki kepastian hukum atas hak milik tanahnya dan sertifikat dapat menjadi agunan resmi yang sah untuk mengakses modal perbankan"
      },
      {
        "key": "C",
        "text": "Petani tidak boleh lagi menjual beras ke pasar"
      },
      {
        "key": "D",
        "text": "Pajak tanah naik seratus kali lipat"
      },
      {
        "key": "E",
        "text": "Sawah petani wajib diserahkan kepada pihak asing"
      }
    ],
    "correct": "B",
    "explanation": "Sertifikat tanah memberi kepastian hukum kepemilikan dan dapat dijaminkan ke bank resmi untuk mendapatkan modal kerja produktif berbunga rendah."
  },
  {
    "id": 197,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 37,
    "question": "Salah satu indikator keberhasilan pembangunan ekonomi inklusif di Kabupaten OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Hanya sedikit pejabat yang bertambah kaya raya"
      },
      {
        "key": "B",
        "text": "Menurunnya angka kemiskinan, meningkatnya pendapatan riil petani, dan meratanya akses fasilitas pendidikan, kesehatan, dan perbankan di seluruh kecamatan"
      },
      {
        "key": "C",
        "text": "Seluruh sawah diubah menjadi perumahan mewah"
      },
      {
        "key": "D",
        "text": "Masyarakat dilarang membentuk kelompok tani"
      },
      {
        "key": "E",
        "text": "Menutup akses pedagang luar daerah masuk ke Belitang"
      }
    ],
    "correct": "B",
    "explanation": "Pertumbuhan inklusif ditandai dengan penurunan kemiskinan dan pemerataan kesejahteraan yang dirasakan langsung oleh petani dan warga perdesaan."
  },
  {
    "id": 198,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 38,
    "question": "Fungsi utama pasar lelang komoditas karet (Bokar - Bahan Olah Karet) yang dikelola kelompok tani di OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuat petani karet saling bermusuhan"
      },
      {
        "key": "B",
        "text": "Memotong perantara tengkulak sehingga petani memperoleh harga lelang karet yang transparan, kompetitif, dan mutu karet terjaga"
      },
      {
        "key": "C",
        "text": "Menyimpan karet hingga rusak di gudang"
      },
      {
        "key": "D",
        "text": "Melarang pabrik ban membeli karet lokal"
      },
      {
        "key": "E",
        "text": "Menetapkan harga karet secara sepihak tanpa musyawarah"
      }
    ],
    "correct": "B",
    "explanation": "Pasar lelang UPPB (Unit Pengolahan dan Pemasaran Bokar) memberi kepastian timbangan jujur dan harga jual lebih tinggi bagi petani karet."
  },
  {
    "id": 199,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 39,
    "question": "Korelasi antara pembangunan infrastruktur jalan cor beton antar-desa di OKU Timur dengan efisiensi biaya ekonomi petani adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membuat biaya angkut hasil panen makin mahal"
      },
      {
        "key": "B",
        "text": "Mempercepat waktu tempuh pengangkutan gabah dari sawah ke penggilingan dan menekan ongkos angkut logistik secara signifikan"
      },
      {
        "key": "C",
        "text": "Menyebabkan kendaraan pengangkut gabah cepat rusak"
      },
      {
        "key": "D",
        "text": "Mendorong petani pindah profesi"
      },
      {
        "key": "E",
        "text": "Tidak ada pengaruhnya terhadap biaya ekonomi"
      }
    ],
    "correct": "B",
    "explanation": "Jalan desa yang mulus memperlancar truk/motor pengangkut gabah, menurunkan biaya perawatan kendaraan, dan menekan ongkos angkut panen."
  },
  {
    "id": 200,
    "day": 1,
    "indicatorCode": "E",
    "indicatorKey": "ind_potensi_oku_timur",
    "indicatorName": "Potensi Sektor Ekonomi OKU Timur",
    "numberInIndicator": 40,
    "question": "Sebagai generasi penerus di SMAN 1 Belitang, kontribusi nyata yang dapat Anda lakukan saat ini untuk mendukung ketahanan pangan dan ekonomi OKU Timur adalah...",
    "options": [
      {
        "key": "A",
        "text": "Membeli beras impor dari luar negeri"
      },
      {
        "key": "B",
        "text": "Belajar sungguh-sungguh menguasai sains, teknologi, dan literasi finansial FINCESTEM agar kelak mampu memajukan ekosistem pertanian lokal dengan inovasi modern"
      },
      {
        "key": "C",
        "text": "Membiarkan lahan pekarangan rumah terbengkalai dipenuhi semak belukar"
      },
      {
        "key": "D",
        "text": "Menyepelekan profesi mulia petani"
      },
      {
        "key": "E",
        "text": "Mengabaikan kegiatan kokurikuler riset lapangan"
      }
    ],
    "correct": "B",
    "explanation": "Belajar tekun dalam program FINCESTEM membekali siswa dengan kompetensi sains, teknologi, rekayasa, dan literasi finansial untuk membangun OKU Timur."
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
