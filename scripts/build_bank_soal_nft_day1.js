/**
 * Script Pembina Data: Menghasilkan 200 Soal Lengkap Pilihan Ganda (PG)
 * Asesmen Day 1 Non-Field Trip FINCESTEM 2026
 * 5 Indikator x 40 Soal = 200 Soal
 */

const fs = require('fs');
const path = require('path');

const INDICATORS = [
  {
    code: 'A',
    key: 'ind_kegiatan_ekonomi',
    name: 'Kegiatan Ekonomi & 3 Sektor Aktivitas',
    desc: 'Produksi, Distribusi, Konsumsi, Sektor Primer, Sekunder, Tersier, dan Pelaku Ekonomi.'
  },
  {
    code: 'B',
    key: 'ind_literasi_finansial',
    name: 'Literasi & Pengelolaan Keuangan (Financial Literacy)',
    desc: '4 Jenis Finansial, Manajemen Arus Kas, Anggaran, Tabungan, Investasi, dan Mitigasi Risiko.'
  },
  {
    code: 'C',
    key: 'ind_kebanksentralan',
    name: 'Kebanksentralan & Bank Indonesia (BI)',
    desc: 'Independensi Bank Sentral, Tugas Pokok, Stabilitas Nilai Rupiah, Kebijakan Moneter, dan Sistem Pembayaran QRIS.'
  },
  {
    code: 'D',
    key: 'ind_badan_usaha_koperasi',
    name: 'Badan Usaha & Koperasi Indonesia',
    desc: 'BUMN, BUMS, BUMD, Landasan UU 25/1992, Asas Kekeluargaan, Pengelolaan SHU, dan Soko Guru Ekonomi.'
  },
  {
    code: 'E',
    key: 'ind_potensi_oku_timur',
    name: 'Potensi Sektor Ekonomi Kabupaten OKU Timur',
    desc: 'Lumbung Padi Sumsel, Irigasi Komering, Perkebunan Karet/Sawit, Peternakan Sapi, Patin, UMKM Gumawang, BRILink/BUMDes.'
  }
];

// DATA BUTIR SOAL DAY 1 (200 SOAL)
// Disusun secara spesifik, kontekstual, dan memiliki 5 pilihan (A, B, C, D, E) serta pembahasan.
const questions = [];

// ==========================================
// INDIKATOR A: SOAL 1 s.d. 40
// ==========================================
const indA_topics = [
  {
    q: "Kegiatan manusia yang dilakukan untuk menghasilkan barang atau jasa guna memenuhi kebutuhan hidup disebut...",
    opts: ["Konsumsi", "Produksi", "Distribusi", "Investasi", "Spekulasi"],
    c: "B",
    exp: "Produksi adalah kegiatan menciptakan atau menambah nilai guna suatu barang/jasa untuk memenuhi kebutuhan manusia."
  },
  {
    q: "Tujuan utama kegiatan konsumsi dalam kehidupan ekonomi keluarga adalah...",
    opts: ["Memperoleh laba maksimal", "Mengurangi nilai guna barang/jasa secara bertahap guna memenuhi kebutuhan", "Menyalurkan barang dari produsen ke pasar", "Menciptakan lapangan kerja baru", "Menimbun kekayaan untuk masa depan"],
    c: "B",
    exp: "Konsumsi bertujuan menghabiskan atau mengurangi nilai guna barang/jasa secara langsung untuk memenuhi kebutuhan hidup."
  },
  {
    q: "Seorang petani di Belitang menjual langsung hasil panen sayurnya kepada tetangga di desanya tanpa perantara pedagang. Pola distribusi ini termasuk...",
    opts: ["Distribusi tidak langsung", "Distribusi semi langsung", "Distribusi langsung", "Distribusi selektif", "Distribusi eksklusif"],
    c: "C",
    exp: "Distribusi langsung adalah penyaluran barang dari produsen langsung kepada konsumen akhir tanpa perantara pihak ketiga."
  },
  {
    q: "Aktivitas ekonomi yang memanfaatkan sumber daya alam secara langsung tanpa mengubah bentuk aslinya, seperti menanam padi atau menangkap ikan, tergolong dalam...",
    opts: ["Sektor Sekunder", "Sektor Tersier", "Sektor Primer", "Sektor Kuartener", "Sektor Informal"],
    c: "C",
    exp: "Sektor primer mencakup pemanfaatan langsung sumber daya alam alami, seperti pertanian, perikanan, perkebunan, dan pertambangan."
  },
  {
    q: "Pabrik penggilingan padi (Rice Milling Unit) di OKU Timur yang mengolah gabah basah menjadi beras kemasan siap konsumsi merupakan contoh kegiatan di...",
    opts: ["Sektor Primer", "Sektor Sekunder", "Sektor Tersier", "Sektor Publik", "Sektor Moneter"],
    c: "B",
    exp: "Sektor sekunder bergerak dalam pengolahan bahan mentah menjadi barang jadi atau barang setengah jadi (manufaktur/industri pengolahan)."
  },
  {
    q: "Jasa transportasi truk pengangkut gabah dari sawah ke gudang Bulog dan layanan kasir toko kelontong di Belitang tergolong dalam...",
    opts: ["Sektor Primer", "Sektor Sekunder", "Sektor Tersier", "Sektor Ekstraktif", "Sektor Agraris"],
    c: "C",
    exp: "Sektor tersier adalah sektor yang menyediakan jasa dan layanan pendukung, seperti transportasi, perdagangan, dan perbankan."
  },
  {
    q: "Di bawah ini yang merupakan faktor produksi asli (primer) dalam teori ekonomi adalah...",
    opts: ["Modal dan Kewirausahaan", "Alam (Tanah) dan Tenaga Kerja", "Mesin dan Uang", "Teknologi dan Manajemen", "Bangunan dan Kendaraan"],
    c: "B",
    exp: "Faktor produksi asli terdiri dari Sumber Daya Alam (tanah/air) dan Tenaga Kerja manusia. Modal dan kewirausahaan adalah faktor turunan."
  },
  {
    q: "Upaya seorang petani meningkatkan hasil panen padi dengan cara mengoptimalkan pemupukan berimbang, benih unggul, dan irigasi teratur tanpa memperluas lahan sawah disebut...",
    opts: ["Ekstensifikasi", "Intensifikasi", "Diversifikasi", "Mekanisasi", "Rasionalisasi"],
    c: "B",
    exp: "Intensifikasi adalah upaya meningkatkan hasil produksi dengan mengoptimalkan faktor produksi yang ada tanpa menambah luas lahan."
  },
  {
    q: "Seorang pekebun di Buay Madang menambah penghasilan dengan menanam jagung dan cabai di sela-sela pohon karet mudanya. Metode perluasan produksi ini disebut...",
    opts: ["Intensifikasi", "Ekstensifikasi", "Diversifikasi", "Standardisasi", "Spesialisasi"],
    c: "C",
    exp: "Diversifikasi adalah penganekaragaman jenis produk atau komoditas yang dihasilkan untuk meminimalkan risiko kerugian."
  },
  {
    q: "Hukum Gossen I mengenai perilaku konsumsi menyatakan bahwa...",
    opts: ["Jika pemenuhan kebutuhan dilakukan terus-menerus, kenikmatannya mula-mula tinggi dan makin lama makin berkurang hingga mencapai titik jenuh", "Manusia akan memenuhi berbagai macam kebutuhan hingga mencapai tingkat intensitas yang sama", "Setiap manusia selalu bertindak rasional dalam mengalokasikan pendapatannya", "Permintaan akan naik jika harga barang turun", "Semua kebutuhan pokok harus dipenuhi sebelum kebutuhan sekunder"],
    c: "A",
    exp: "Hukum Gossen I (Hukum Utilitas Marjinal yang Menurun) menjelaskan bahwa konsumsi berulang atas barang yang sama akan mengalami penurunan kepuasan marginal."
  },
  {
    q: "Peran Rumah Tangga Konsumen (RTK) dalam diagram arus melingkar kegiatan ekonomi (circular flow) adalah...",
    opts: ["Menyediakan faktor produksi dan menerima balas jasa pendapatan", "Memproduksi barang dan jasa publik untuk masyarakat", "Menarik pajak dari perusahaan swasta", "Mengatur peredaran uang kartal di pasar", "Mengimpor bahan baku dari luar negeri"],
    c: "A",
    exp: "RTK berperan sebagai penyedia faktor produksi (tanah, tenaga kerja, modal) kepada RTP dan sebagai konsumen barang/jasa."
  },
  {
    q: "Balas jasa yang diterima oleh Rumah Tangga Konsumen (RTK) atas penyerahan faktor produksi berupa tenaga kerja disebut...",
    opts: ["Sewa (Rent)", "Upah/Gaji (Wage)", "Bunga modal (Interest)", "Laba/Keuntungan (Profit)", "Dividen"],
    c: "B",
    exp: "Balas jasa tenaga kerja adalah upah/gaji (wage). Sewa untuk tanah, bunga untuk modal, dan laba untuk kewirausahaan."
  },
  {
    q: "Pemerintah memberikan subsidi pupuk dan membangun bendungan irigasi untuk petani di OKU Timur. Dalam hal ini pemerintah bertindak sebagai...",
    opts: ["Konsumen murni", "Pengatur (Regulator) dan Penyedia Fasilitas Publik", "Distributor tunggal", "Investor spekulatif", "Pemilik faktor produksi swasta"],
    c: "B",
    exp: "Pemerintah berperan sebagai regulator (pengatur) dan produsen fasilitas publik guna mensejahterakan masyarakat."
  },
  {
    q: "Ciri utama dari benda konsumsi adalah...",
    opts: ["Digunakan untuk menghasilkan barang modal lain", "Diperlukan pengorbanan untuk memperolehnya dan nilai gunanya habis/berkurang saat dipakai", "Tersedia melimpah di alam tanpa perlu dibeli", "Hanya bisa dimiliki oleh badan usaha resmi", "Harganya selalu naik setiap tahun"],
    c: "B",
    exp: "Benda konsumsi didapat melalui pengorbanan ekonomi dan nilai guna atau manfaatnya habis/berkurang saat digunakan memenuhi kebutuhan."
  },
  {
    q: "Fungsi pokok distribusi yang berkaitan dengan perpindahan barang secara fisik dari tempat produksi ke tempat konsumen yang membutuhkan disebut...",
    opts: ["Fungsi penyimpanan (storage)", "Fungsi pengangkutan (transportation)", "Fungsi penstandaran kualitas", "Fungsi penanggung risiko", "Fungsi promosi"],
    c: "B",
    exp: "Fungsi pengangkutan (transportasi) memindahkan barang dari sentra produksi ke sentra konsumsi."
  },
  {
    q: "Contoh saluran distribusi semi langsung dalam perdagangan hasil bumi adalah...",
    opts: ["Petani memakan hasil panen padinya sendiri", "Petani menjual beras kepada konsumen melalui toko resmi milik kelompok taninya sendiri", "Petani menjual gabah ke tengkulak, lalu ke pedagang besar, ke pengecer, baru ke konsumen", "Pabrik menjual mesin ke agen luar negeri", "Pedagang keliling membeli sayur di pasar induk"],
    c: "B",
    exp: "Distribusi semi langsung menggunakan perantara yang merupakan bagian dari organisasi atau milik produsen itu sendiri."
  },
  {
    q: "Pernyataan yang paling tepat mengenai keterkaitan antara kegiatan produksi, distribusi, dan konsumsi adalah...",
    opts: ["Produksi dapat berjalan lancar meskipun tidak ada kegiatan distribusi", "Ketiganya merupakan siklus yang saling bergantung; tanpa distribusi, barang produksi tidak akan bernilai guna bagi konsumen", "Konsumsi selalu mendahului produksi dan tidak memerlukan saluran distribusi", "Distribusi adalah kegiatan yang berdiri sendiri tanpa dipengaruhi oleh daya beli konsumen", "Produksi hanya bertumpu pada sektor jasa tersier"],
    c: "B",
    exp: "Ketiga kegiatan ekonomi membentuk rantai nilai terpadu: produksi menciptakan barang, distribusi mengantarkan, dan konsumsi memanfaatkannya."
  },
  {
    q: "Seorang perajin anyaman bambu di Martapura membutuhkan modal usaha, bahan baku bambu, dan tenaga kerja pembantu. Seluruh unsur tersebut dikategorikan sebagai...",
    opts: ["Faktor konsumsi", "Input / Faktor produksi", "Output produksi", "Komoditas tersier", "Barang bebas"],
    c: "B",
    exp: "Bahan baku, modal, tenaga kerja, dan keahlian merupakan input atau faktor-faktor yang digunakan dalam proses produksi."
  },
  {
    q: "Perilaku konsumen yang rasional ditunjukkan oleh tindakan...",
    opts: ["Membeli barang karena tergiur potongan harga sesaat meskipun barang tersebut tidak dibutuhkan", "Menyusun skala prioritas kebutuhan dan membandingkan harga serta kualitas barang sebelum membeli", "Membeli barang mewah demi gengsi dan status sosial di lingkungan pergaulan", "Menghabiskan seluruh uang saku untuk jajan di hari pertama", "Memilih barang impor yang mahal daripada produk lokal yang mutunya sama"],
    c: "B",
    exp: "Konsumen rasional bertindak berdasarkan pertimbangan kebutuhan nyata, skala prioritas, serta perbandingan manfaat dan biaya."
  },
  {
    q: "Salah satu indikator yang membedakan barang ekonomi dengan barang bebas adalah...",
    opts: ["Barang ekonomi memiliki wujud fisik, barang bebas tidak berwujud", "Barang ekonomi memerlukan pengorbanan untuk memperolehnya, barang bebas tersedia melimpah dari alam", "Barang ekonomi hanya diproduksi oleh BUMN, barang bebas oleh swasta", "Barang ekonomi harganya tetap, barang bebas selalu berubah", "Barang ekonomi tidak memiliki nilai guna sama sekali"],
    c: "B",
    exp: "Barang ekonomi jumlahnya terbatas dan butuh pengorbanan untuk mendapatkannya, sedangkan barang bebas (seperti udara/sinar matahari) tersedia melimpah."
  },
  {
    q: "Di sebuah desa di Madang Suku II, limbah sekam padi dari penggilingan diolah menjadi briket bahan bakar ramah lingkungan. Nilai guna yang tercipta pada peristiwa ini adalah...",
    opts: ["Form Utility (Nilai guna bentuk)", "Place Utility (Nilai guna tempat)", "Time Utility (Nilai guna waktu)", "Ownership Utility (Nilai guna kepemilikan)", "Element Utility (Nilai guna unsur)"],
    c: "A",
    exp: "Form utility terjadi ketika suatu benda ditingkatkan nilai gunanya setelah diubah bentuk dan fungsinya (dari sekam menjadi briket)."
  },
  {
    q: "Gabah kering giling yang disimpan di lumbung desa saat musim panen raya lalu dijual beberapa bulan kemudian saat harga membaik memiliki keunggulan nilai guna...",
    opts: ["Form utility", "Place utility", "Time utility (Nilai guna waktu)", "Service utility", "Ownership utility"],
    c: "C",
    exp: "Time utility adalah peningkatan nilai guna barang karena digunakan atau dijual pada waktu yang tepat."
  },
  {
    q: "Agen pupuk resmi di kecamatan menyalurkan pupuk bersubsidi dari gudang produsen pupuk ke kelompok tani. Peran agen dalam alur distribusi ini adalah...",
    opts: ["Konsumen perantara", "Lembaga perantara distribusi pedagang besar/khusus", "Produsen pupuk nasional", "Pengecer eceran mikro", "Regulator sistem pasar"],
    c: "B",
    exp: "Agen bertindak sebagai perantara yang menyalurkan barang atas nama produsen kepada pembeli atau kelompok tani."
  },
  {
    q: "Jika pendapatan masyarakat di suatu daerah meningkat, kecenderungan yang umumnya terjadi pada pola konsumsi makanan pokok adalah...",
    opts: ["Porsi pengeluaran untuk makanan pokok akan melonjak jauh melebihi barang tersier", "Persentase pengeluaran untuk kebutuhan makanan cenderung menurun, sedangkan pengeluaran untuk barang sekunder/tersier meningkat (Hukum Engel)", "Masyarakat berhenti mengonsumsi beras sama sekali", "Pola konsumsi tidak terpengaruh oleh pendapatan", "Pengeluaran tabungan menjadi nol"],
    c: "B",
    exp: "Hukum Engel menyatakan bahwa seiring naiknya pendapatan, proporsi belanja untuk makanan cenderung menurun sedangkan proporsi untuk non-makanan meningkat."
  },
  {
    q: "Seorang wirausahawan pemula memproduksi keripik tempe. Yang termasuk biaya tetap (fixed cost) dalam usaha produksinya adalah...",
    opts: ["Kedelai dan ragi", "Minyak goreng", "Biaya sewa tempat dan penyusutan mesin pemotong", "Kemasan plastik", "Upah lembur harian pekerja"],
    c: "C",
    exp: "Fixed cost adalah biaya yang jumlahnya tidak berubah meskipun volume produksi naik atau turun, seperti sewa tempat dan penyusutan alat."
  },
  {
    q: "Biaya variabel (variable cost) dalam operasional usaha jasa cuci motor di Belitang adalah...",
    opts: ["Sewa ruko tahunan", "Gaji manajer tetap", "Shampo motor, air, dan sabun pembersih", "Biaya izin usaha", "Penyusutan kompresor angin"],
    c: "C",
    exp: "Biaya variabel berubah sebanding dengan volume jasa/barang yang dikerjakan (makin banyak motor dicuci, makin banyak shampo/air dipakai)."
  },
  {
    q: "Hukum pertambahan hasil yang semakin berkurang (The Law of Diminishing Marginal Returns) dikemukakan oleh...",
    opts: ["Adam Smith", "David Ricardo", "John Maynard Keynes", "Alfred Marshall", "Karl Marx"],
    c: "B",
    exp: "David Ricardo mengemukakan The Law of Diminishing Returns, di mana penambahan input variabel terus-menerus pada input tetap akhirnya menurunkan hasil marjinal."
  },
  {
    q: "Sektor ekonomi yang berperan sebagai 'jembatan' yang mempertemukan produsen bahan baku dan industri manufaktur dengan konsumen pemakai akhir adalah...",
    opts: ["Sektor primer", "Sektor sekunder", "Sektor tersier", "Sektor tradisional", "Sektor agrikultur"],
    c: "C",
    exp: "Sektor tersier (perdagangan, transportasi, logistik) menjembatani arus barang dari hulu (produsen) ke hilir (konsumen)."
  },
  {
    q: "Suatu kegiatan ekonomi dikatakan efektif dan efisien apabila...",
    opts: ["Menghasilkan barang sebanyak-banyaknya tanpa memedulikan biaya yang terbuang", "Mencapai target output yang direncanakan dengan pengorbanan biaya dan waktu seminimal mungkin", "Hanya menggunakan tenaga kerja manual tanpa bantuan teknologi", "Menjual produk dengan harga setinggi mungkin kepada konsumen miskin", "Menghabiskan modal usaha dalam waktu singkat"],
    c: "B",
    exp: "Efisien berarti meminimalkan pemborosan sumber daya (biaya/waktu), sedangkan efektif berarti tepat mencapai tujuan atau target yang ditentukan."
  },
  {
    q: "Karakteristik utama barang substitusi dalam konsumsi sehari-hari adalah...",
    opts: ["Barang yang saling melengkapi pemakaiannya (seperti kopi dan gula)", "Barang yang dapat saling menggantikan fungsinya (seperti jagung menggantikan beras)", "Barang yang hanya bisa dikonsumsi oleh kalangan elit", "Barang yang tidak memiliki nilai jual di pasar", "Barang yang harus dibeli bersamaan"],
    c: "B",
    exp: "Barang substitusi adalah barang pengganti yang memiliki fungsi serupa (misal: beras dan jagung, teh dan kopi)."
  },
  {
    q: "Berikut ini yang merupakan contoh barang komplementer adalah...",
    opts: ["Beras dengan singkong", "Bensin dengan sepeda motor", "Pulpen dengan pensil", "Ikan nila dengan ikan patin", "Minyak goreng dengan mentega"],
    c: "B",
    exp: "Barang komplementer adalah barang yang saling melengkapi; sepeda motor tidak dapat berjalan tanpa bensin."
  },
  {
    q: "Tindakan spekulasi ekonomi seperti menimbun beras saat panen raya demi menaikkan harga secara tidak wajar merupakan tindakan yang...",
    opts: ["Menciptakan efisiensi pasar yang sempurna", "Merugikan konsumen, melanggar etika bisnis, dan mengacaukan stabilitas distribusi pangan", "Sangat dianjurkan dalam teori ekonomi modern", "Membantu petani kecil meningkatkan kesejahteraan", "Merupakan bagian dari sektor primer resmi"],
    c: "B",
    exp: "Penimbunan spekulatif merusak mekanisme distribusi yang adil, menciptakan kelangkaan semu, dan merugikan masyarakat luas."
  },
  {
    q: "Peran Rumah Tangga Produsen (RTP) dalam kaitannya dengan penerimaan pemerintah adalah...",
    opts: ["Menerima gaji dari kas negara", "Membayar pajak badan usaha / pajak penghasilan perusahaan ke kas negara", "Menyusun undang-undang ketenagakerjaan", "Mencetak uang kertas Rupiah", "Mengatur suku bunga acuan kredit"],
    c: "B",
    exp: "RTP memberikan kontribusi penerimaan negara melalui pembayaran pajak badan, pajak ekspor, dan retribusi usaha."
  },
  {
    q: "Di era digital saat ini, saluran distribusi online melalui marketplace dan media sosial terbukti...",
    opts: ["Menambah panjang rantai perantara sehingga harga barang makin mahal", "Memperpendek rantai distribusi, mempercepat transaksi, dan menghubungkan produsen desa langsung ke konsumen nasional", "Menghilangkan kegiatan produksi pangan secara total", "Hanya menguntungkan pihak luar negeri", "Membuat barang produksi kehilangan kualitas aslinya"],
    c: "B",
    exp: "Digitalisasi memotong mata rantai distribusi yang berliku (disintermediasi), sehingga produsen mendapat margin lebih baik dan konsumen harga wajar."
  },
  {
    q: "Prinsip ekonomi yang benar menyatakan bahwa manusia bertindak ekonomi dengan...",
    opts: ["Pengorbanan sekecil-kecilnya untuk memperoleh hasil yang sebesar-besarnya tanpa batas", "Pengorbanan tertentu untuk memperoleh hasil yang maksimal, atau hasil tertentu dengan pengorbanan seminimal mungkin", "Menghamburkan seluruh modal demi laba instan", "Menghindari segala macam bentuk risiko dengan tidak bekerja", "Membeli barang mewah agar dihormati masyarakat"],
    c: "B",
    exp: "Prinsip ekonomi yang tepat adalah: dengan pengorbanan tertentu untuk memperoleh hasil maksimal, atau hasil tertentu dengan pengorbanan rasional seminimal mungkin."
  },
  {
    q: "Seorang pengusaha penggilingan padi merekrut 10 tenaga kerja lokal dan membeli mesin pemisah batu modern. Kombinasi faktor produksi ini bertujuan untuk...",
    opts: ["Menurunkan kualitas beras agar cepat laku", "Meningkatkan produktivitas, mutu produk, dan efisiensi waktu kerja", "Menghentikan peredaran gabah di pasar", "Menambah biaya produksi setinggi mungkin", "Menghindari pencatatan pembukuan kas"],
    c: "B",
    exp: "Perpaduan teknologi mesin dan tenaga kerja terlatih meningkatkan efisiensi dan kualitas output yang dihasilkan."
  },
  {
    q: "Aktivitas pemeliharaan ikan patin dalam kolam tanah di Desa Karang Anyar OKU Timur termasuk dalam subsektor...",
    opts: ["Perikanan tangkap laut", "Perikanan budidaya air tawar (Akuakultur)", "Pertambangan air", "Industri kimia", "Sektor pariwisata bahari"],
    c: "B",
    exp: "Pemeliharaan ikan di kolam/tambak darat tergolong perikanan budidaya air tawar (akuakultur) di sektor primer."
  },
  {
    q: "Hubungan timbal balik antara rumah tangga konsumen dan rumah tangga produsen di pasar faktor produksi melibatkan...",
    opts: ["Arus barang jadi dari produsen ke konsumen", "Arus penyerahan tenaga kerja/lahan dari konsumen dan arus uang balas jasa (gaji/sewa) dari produsen", "Arus ekspor impor barang luar negeri", "Arus penarikan pajak oleh bank sentral", "Arus pembagian dividen koperasi"],
    c: "B",
    exp: "Di pasar faktor produksi, RTK menawarkan tanah/tenaga kerja dan RTP membayar upah/sewa sebagai balas jasanya."
  },
  {
    q: "Dampak positif dari kelancaran jalur distribusi pangan dari OKU Timur ke kota Palembang adalah...",
    opts: ["Terjadinya inflasi tinggi di sentra produksi", "Harga beras di kota tetap stabil dan hasil panen petani desa terserap dengan harga yang layak", "Petani dilarang menjual hasil panennya ke luar daerah", "Terjadi penumpukan gabah yang membusuk di gudang desa", "Biaya logistik melonjak tanpa kendali"],
    c: "B",
    exp: "Distribusi yang lancar menjaga stabilitas pasokan pangan di perkotaan dan kepastian harga bagi petani di pedesaan."
  },
  {
    q: "Karakteristik penting dari seorang produsen yang memiliki etika bisnis yang baik adalah...",
    opts: ["Mengurangi timbangan demi mengejar keuntungan pribadi", "Menjaga kualitas kejujuran produk, ramah lingkungan, dan adil terhadap pekerja serta konsumen", "Menggunakan zat pewarna berbahaya agar produk tampak cerah", "Memaksa pembeli membeli dalam jumlah banyak", "Menolak mencatat transaksi pemasukan dan pengeluaran"],
    c: "B",
    exp: "Etika produsen mencakup kejujuran timbangan, keamanan pangan bagi konsumen, serta kelestarian lingkungan dan keadilan tenaga kerja."
  }
];

// ==========================================
// INDIKATOR B: SOAL 41 s.d. 80
// ==========================================
const indB_topics = [
  {
    q: "Menurut Otoritas Jasa Keuangan (OJK), yang dimaksud dengan literasi keuangan (financial literacy) adalah...",
    opts: ["Kemampuan mencetak uang kertas sendiri", "Pengetahuan, keterampilan, dan keyakinan yang mempengaruhi sikap untuk meningkatkan kualitas pengambilan keputusan keuangan demi mencapai kesejahteraan", "Kemampuan meminjam uang sebanyak-banyaknya dari bank", "Kegiatan menimbun uang tunai di bawah kasur", "Keahlian berdagang saham spekulatif tanpa izin"],
    c: "B",
    exp: "Literasi keuangan mencakup pengetahuan, keyakinan, dan keterampilan dalam mengelola keuangan untuk mencapai stabilitas dan kesejahteraan finansial."
  },
  {
    q: "Klasifikasi keuangan yang berfokus pada perencanaan anggaran belanja keluarga, tabungan pendidikan, dan proteksi asuransi anggota rumah tangga tergolong...",
    opts: ["Public Finance (Keuangan Negara)", "Corporate Finance (Keuangan Korporasi)", "Personal Finance (Keuangan Pribadi/Keluarga)", "International Finance", "Fiscal Policy"],
    c: "C",
    exp: "Personal Finance (keuangan pribadi) mengatur manajemen uang individu dan rumah tangga, mencakup anggaran, tabungan, dan proteksi."
  },
  {
    q: "Pengelolaan keuangan yang berhubungan dengan penerimaan APBD, pajak daerah, dan alokasi anggaran pembangunan jalan oleh Pemerintah Daerah OKU Timur tergolong...",
    opts: ["Personal Finance", "Public Finance (Keuangan Publik/Negara)", "Corporate Finance", "Micro Finance", "Household Finance"],
    c: "B",
    exp: "Public Finance mempelajari pendapatan, belanja, dan utang pemerintah dalam rangka pelayanan publik dan pembangunan wilayah."
  },
  {
    q: "Seorang siswa SMA menerima uang saku mingguan sebesar Rp 100.000. Penerimaan ini dikategorikan sebagai...",
    opts: ["Arus kas keluar (Cash Outflow)", "Arus kas masuk (Cash Inflow)", "Utang jangka panjang", "Beban penyusutan", "Aset tidak lancar"],
    c: "B",
    exp: "Cash inflow adalah seluruh penerimaan uang tunai yang menambah saldo kas."
  },
  {
    q: "Dalam metode penganggaran populer 50/30/20, alokasi 50% dari pemasukan bersih idealnya digunakan untuk...",
    opts: ["Kebutuhan pokok sehari-hari (Needs)", "Keinginan dan hiburan (Wants)", "Tabungan dan investasi masa depan (Savings)", "Membayar denda keterlambatan", "Membeli barang bermerek"],
    c: "A",
    exp: "Aturan 50/30/20: 50% untuk kebutuhan dasar (makan, transportasi, tagihan), 30% untuk keinginan, dan 20% untuk tabungan/investasi/dana darurat."
  },
  {
    q: "Alokasi 20% dalam formula budgeting 50/30/20 difokuskan untuk...",
    opts: ["Jajan makanan cepat saji", "Membeli pakaian pesta model terbaru", "Membangun dana darurat, tabungan, dan investasi masa depan", "Membayar ongkos nongkrong bersama teman", "Membeli skin game online"],
    c: "C",
    exp: "Porsi 20% adalah pos pembentukan ketahanan masa depan: dana darurat, cicilan utang produktif, tabungan, dan investasi."
  },
  {
    q: "Fungsi utama dari pembentukan Dana Darurat (Emergency Fund) adalah...",
    opts: ["Untuk modal liburan mewah di akhir tahun", "Sebagai penyangga finansial saat terjadi musibah tak terduga (sakit mendadak, kehilangan pekerjaan, bencana)", "Untuk membeli gadget baru yang sedang viral", "Dihabiskan saat ada diskon besar di toko daring", "Sebagai jaminan pinjaman konsumtif"],
    c: "B",
    exp: "Dana darurat dirancang khusus untuk membiayai situasi krisis tak terduga tanpa harus berutang atau menjual aset berharga."
  },
  {
    q: "Besaran ideal dana darurat bagi seorang individu yang belum berkeluarga umumnya berkisar antara...",
    opts: ["1 kali gaji harian", "3 sampai 6 kali pengeluaran rutin bulanan", "10 kali pendapatan kotor tahunan", "Tidak memerlukan dana darurat sama sekali", "Cukup Rp 50.000 saja"],
    c: "B",
    exp: "Standar perencana keuangan merekomendasikan dana darurat sebesar 3-6 kali pengeluaran bulanan bagi lajang, dan 6-12 kali bagi yang berkeluarga."
  },
  {
    q: "Perbedaan mendasar antara 'Kebutuhan' (Needs) dan 'Keinginan' (Wants) dalam pengelolaan keuangan pribadi adalah...",
    opts: ["Kebutuhan jika tidak dipenuhi akan mengganggu kelangsungan hidup, sedangkan keinginan jika tidak dipenuhi hidup tetap berjalan baik", "Kebutuhan harganya selalu mahal, keinginan selalu murah", "Kebutuhan hanya dimiliki orang tua, keinginan hanya dimiliki remaja", "Keduanya memiliki prioritas yang sama persis", "Kebutuhan tidak perlu dianggarkan"],
    c: "A",
    exp: "Kebutuhan esensial untuk bertahan hidup dan bekerja (makan, tempat tinggal, kesehatan), sedangkan keinginan bersifat pelengkap kepuasan diri."
  },
  {
    q: "Seorang petani karet di Semendawai Barat menyisihkan sebagian hasil sadapan setiap minggu ke rekening bank. Manfaat menabung di lembaga perbankan resmi adalah...",
    opts: ["Uang dijamin oleh LPS (Lembaga Penjamin Simpanan), aman dari risiko pencurian/kebakaran, dan tercatat rapi", "Uang akan berlipat ganda menjadi 100 kali dalam sebulan", "Bebas dari segala macam potongan administrasi selamanya", "Dapat ditarik oleh siapa saja tanpa kartu identitas", "Tidak memiliki bunga simpanan"],
    c: "A",
    exp: "Menabung di bank resmi dijamin oleh LPS hingga Rp 2 miliar per nasabah per bank, aman dari bahaya fisik, dan mempermudah rekam jejak keuangan."
  },
  {
    q: "Kenaikan harga barang dan jasa secara umum dan terus-menerus yang menyebabkan penurunan daya beli uang disebut...",
    opts: ["Deflasi", "Inflasi", "Devaluasi", "Apresiasi", "Depresiasi"],
    c: "B",
    exp: "Inflasi adalah kecenderungan naiknya harga-harga secara umum dan berkelanjutan, yang mengikis nilai riil uang dari waktu ke waktu."
  },
  {
    q: "Jika laju inflasi rata-rata 4% per tahun dan bunga tabungan biasa hanya 1% per tahun, maka nilai riil uang tabungan Anda setelah dipotong pajak dan inflasi akan...",
    opts: ["Mengalami peningkatan daya beli yang tinggi", "Mengalami penurunan daya beli secara riil (tergerus inflasi)", "Tetap stabil tidak terpengaruh", "Menggandakan kekayaan secara instan", "Menjadi nol dalam setahun"],
    c: "B",
    exp: "Jika imbal hasil simpanan lebih rendah dari tingkat inflasi, daya beli uang tabungan secara riil akan menurun seiring waktu."
  },
  {
    q: "Prinsip dasar investasi 'High Risk, High Return' memiliki makna bahwa...",
    opts: ["Instrumen investasi yang berpotensi menghasilkan keuntungan tinggi umumnya juga disertai risiko kerugian yang tinggi pula", "Investasi yang aman dari risiko pasti memberikan keuntungan paling besar", "Semua jenis investasi pasti menghasilkan keuntungan tanpa risiko", "Risiko tinggi dapat dihilangkan dengan meminjam uang di rentenir", "Investor pemula sebaiknya langsung memilih instrumen berisiko tertinggi"],
    c: "A",
    exp: "High Risk High Return menyatakan hubungan searah antara potensi laba dan risiko: peluang laba besar sebanding dengan potensi rugi yang besar."
  },
  {
    q: "Contoh instrumen investasi yang tergolong berisiko rendah dan cocok untuk pemula adalah...",
    opts: ["Saham gorengan di pasar spekulatif", "Kripto aset yang fluktuatif", "Deposito perbankan dan Surat Berharga Negara (SBN) ritel", "Trading valas ilegal dengan leverage tinggi", "Arisan berantai tanpa legalitas"],
    c: "C",
    exp: "Deposito bank yang dijamin LPS dan SBN yang dijamin negara merupakan contoh instrumen berisiko sangat rendah yang aman bagi pemula."
  },
  {
    q: "Tindakan mendiversifikasi investasi dengan pepatah 'Jangan menaruh semua telur dalam satu keranjang' bertujuan untuk...",
    opts: ["Mempercepat proses transaksi", "Meminimalkan risiko kerugian total jika salah satu instrumen mengalami kejatuhan", "Membayar pajak lebih banyak ke pemerintah", "Menghindari pencatatan pembukuan kas", "Menghabiskan modal usaha sekaligus"],
    c: "B",
    exp: "Diversifikasi menyebarkan dana ke berbagai jenis aset (misal: emas, reksadana, deposito) agar kerugian di satu aset dapat ditutup oleh keuntungan di aset lain."
  },
  {
    q: "Perbedaan mendasar antara 'Utang Produktif' dan 'Utang Konsumtif' adalah...",
    opts: ["Utang produktif digunakan untuk menghasilkan arus kas/keuntungan baru, sedangkan utang konsumtif digunakan untuk membeli barang yang nilainya menyusut tanpa menghasilkan pendapatan", "Utang produktif bunganya lebih tinggi dari utang rentenir", "Utang konsumtif selalu dijamin oleh pemerintah", "Utang produktif hanya boleh dipinjam oleh pejabat", "Keduanya memiliki dampak yang sama bagi kekayaan"],
    c: "A",
    exp: "Utang produktif menghasilkan nilai tambah atau pendapatan (misal modal beli mesin panen), sedangkan utang konsumtif menghabiskan uang untuk kepuasan sesaat (misal beli HP terbaru demi gaya)."
  },
  {
    q: "Batas aman rasio cicilan utang bulanan terhadap total pendapatan bulanan (Debt Service Ratio) yang dianjurkan perencana keuangan adalah maksimal...",
    opts: ["100% dari penghasilan", "70% dari penghasilan", "30% sampai 35% dari penghasilan", "Tidak ada batas maksimal", "10% dari tabungan darurat"],
    c: "C",
    exp: "Rasio beban cicilan utang maksimal yang sehat adalah 30-35% dari total pemasukan rutin agar arus kas tidak terancam macet."
  },
  {
    q: "Bahaya utama dari jeratan Pinjaman Online Ilegal (Pinjol Ilegal) bagi masyarakat desa adalah...",
    opts: ["Bunga sangat rendah dan tenor sangat panjang", "Bunga harian mencekik, biaya administrasi tersembunyi, teror penagihan kasar, dan penyebaran data pribadi", "Diawasi ketat oleh OJK dan Bank Indonesia", "Memberikan modal usaha gratis tanpa perlu dikembalikan", "Membantu meningkatkan skor kredit perbankan"],
    c: "B",
    exp: "Pinjol ilegal tidak terdaftar di OJK, menetapkan bunga tinggi tanpa batas, melakukan teror psikologis, dan menyalahgunakan kontak HP nasabah."
  },
  {
    q: "Lembaga resmi di Indonesia yang bertugas mengawasi, mengatur, dan melindungi konsumen sektor jasa keuangan (perbankan, pasar modal, asuransi, leasing) adalah...",
    opts: ["Badan Pusat Statistik (BPS)", "Otoritas Jasa Keuangan (OJK)", "Kementerian Hukum dan HAM", "Komisi Pemilihan Umum (KPU)", "Kementerian Perdagangan"],
    c: "B",
    exp: "OJK (Otoritas Jasa Keuangan) adalah lembaga independen yang berwenang mengatur, mengawasi, memeriksa, dan melindungi konsumen di sektor jasa keuangan."
  },
  {
    q: "Untuk memastikan apakah sebuah entitas penawaran investasi atau pinjaman daring itu legal, masyarakat dapat memeriksa status perizinannya melalui kanal resmi...",
    opts: ["Media sosial tanpa centang biru", "Kontak OJK 157 dan situs resmi www.ojk.go.id", "Brosur yang ditempel di tiang listrik", "Grup obrolan WhatsApp yang menjanjikan keuntungan kilat", "Komentar akun anonim di internet"],
    c: "B",
    exp: "Masyarakat dapat mengecek legalitas lembaga keuangan melalui Kontak OJK 157, WhatsApp resmi OJK 081157157157, atau web resmi OJK."
  },
  {
    q: "Pernyataan berikut ini yang merupakan ciri-ciri investasi bodong / penipuan finansial adalah...",
    opts: ["Menjanjikan imbal hasil keuntungan sangat tinggi dalam waktu singkat dan bebas risiko sama sekali", "Memiliki izin edar resmi dari OJK dan Bappebti", "Menjelaskan potensi risiko kerugian secara transparan", "Memiliki kantor operasional dan pengurus yang jelas", "Imbal hasil yang ditawarkan masuk akal sesuai suku bunga pasar"],
    c: "A",
    exp: "Investasi bodong selalu memikat korban dengan prinsip 2L palsu (tidak Logis dan tidak Legal): janji untung besar instan tanpa risiko."
  },
  {
    q: "Seorang siswa yang bijak dalam mengelola uang sakunya akan melakukan langkah pertama, yaitu...",
    opts: ["Membeli barang yang sedang tren di media sosial", "Mencatat pemasukan dan membuat rencana anggaran belanja mingguan sebelum uang dibelanjakan", "Meminjamkan uang kepada teman tanpa batas", "Menghabiskan uang saku untuk jajan di hari Senin", "Mengabaikan sisa uang kembalian belanja"],
    c: "B",
    exp: "Langkah awal literasi keuangan pribadi adalah mencatat arus kas dan merencanakan alokasi anggaran (budgeting) sebelum berbelanja."
  },
  {
    q: "Pencatatan pembukuan kas sederhana bagi pelaku UMKM memiliki manfaat penting, yaitu...",
    opts: ["Membuat usaha terlihat rumit dan menambah beban pikiran", "Mengetahui posisi keuntungan bersih riil usaha dan memisahkan uang pribadi dengan uang operasional bisnis", "Menghindari kewajiban membayar utang dagang", "Agar bisa menarik modal usaha untuk foya-foya", "Menolak konsumen yang ingin membayar tunai"],
    c: "B",
    exp: "Pembukuan memisahkan keuangan pribadi vs usaha, memberikan data laba rugi riil, dan menjadi syarat penting saat mengajukan kredit bank."
  },
  {
    q: "Seorang pedagang kelontong di Belitang mencampurkan uang hasil penjualan warung dengan uang belanja dapur rumah tangganya di satu dompet yang sama. Risiko dari kebiasaan ini adalah...",
    opts: ["Usaha akan berkembang sangat cepat", "Modal usaha tanpa sadar terpakai untuk konsumsi pribadi sehingga bisnis terancam kekurangan modal kulakan (bubar)", "Pencatatan pembukuan menjadi sangat rapi", "Mendapat kemudahan pinjaman tanpa bunga dari bank", "Tidak ada risiko sama sekali"],
    c: "B",
    exp: "Mencampur aduk keuangan pribadi dan bisnis adalah penyebab utama bangkrutnya UMKM karena modal kerja tergerus untuk konsumsi pribadi."
  },
  {
    q: "Salah satu bentuk mitigasi risiko keuangan terhadap aset berharga (seperti rumah atau kendaraan bermotor) dari ancaman kebakaran atau kecelakaan adalah dengan...",
    opts: ["Menyimpan uang di brankas baja", "Mengikutsertakan aset dalam program asuransi kerugian resmi", "Menghindari pemakaian aset selamanya", "Menjual aset dengan harga murah", "Meminjamkan aset kepada tetangga"],
    c: "B",
    exp: "Asuransi adalah mekanisme pengalihan risiko finansial dari tertanggung kepada perusahaan asuransi dengan membayar premi berkala."
  },
  {
    q: "Dalam transaksi perbankan digital, kode rahasia satu kali pakai yang dikirimkan melalui SMS/WhatsApp untuk otentikasi transaksi disebut...",
    opts: ["PIN Kartu", "OTP (One-Time Password)", "CVV/CVC", "User ID", "Nomor Rekening"],
    c: "B",
    exp: "OTP (One-Time Password) adalah kode verifikasi dinamis sekali pakai yang bersifat sangat rahasia untuk memvalidasi transaksi digital."
  },
  {
    q: "Sikap keamanan digital yang paling tepat ketika menerima pesan dari nomor tak dikenal yang meminta kode OTP atau tautan APK dengan dalih kurir paket adalah...",
    opts: ["Segera mengirimkan kode OTP tersebut agar paket cepat sampai", "Mengabaikan, memblokir nomor tersebut, dan tidak pernah membagikan OTP kepada siapa pun", "Mengklik tautan APK dan memasukkan password akun bank", "Meneruskan pesan ke seluruh grup keluarga", "Menghubungi nomor tersebut dan memberikan nomor kartu ATM"],
    c: "B",
    exp: "Kode OTP, PIN, dan password bersifat rahasia mutlak. Membagikan OTP atau menginstal APK bodong memicu peretasan rekening (phishing/sniffing)."
  },
  {
    q: "Skor kredit (credit score) yang tercatat dalam Sistem Layanan Informasi Keuangan (SLIK OJK) akan dinilai buruk apabila debitur...",
    opts: ["Selalu membayar cicilan pinjaman tepat waktu sebelum jatuh tempo", "Mengalami keterlambatan atau menunggak pembayaran cicilan pokok dan bunga kredit", "Tidak pernah berutang kepada rentenir", "Menyimpan uang tabungan dalam jumlah besar", "Memiliki usaha produktif yang menguntungkan"],
    c: "B",
    exp: "SLIK OJK mencatat riwayat kelancaran pembayaran kredit nasabah. Riwayat menunggak (kolektibilitas macet) merusak reputasi kredit di masa depan."
  },
  {
    q: "Dampak buruk dari perilaku konsumtif yang berlebihan (*impulsive buying*) bagi masa depan generasi muda adalah...",
    opts: ["Memiliki aset produktif yang melimpah", "Sulit membangun tabungan, rentan terjebak utang berbunga tinggi, dan tidak memiliki kesiapan finansial jangka panjang", "Meningkatkan daya tahan terhadap inflasi", "Mendapat penghargaan sebagai konsumen teladan", "Menjadi investor yang sukses"],
    c: "B",
    exp: "Perilaku konsumtif impulsif menguras pendapatan untuk barang yang nilainya terdepresiasi, menyebabkan ketiadaan tabungan dan jeratan utang."
  },
  {
    q: "Pernyataan yang tepat mengenai konsep 'Waktu adalah Uang' (*Time Value of Money*) dalam literasi keuangan adalah...",
    opts: ["Nilai uang Rp 100.000 saat ini lebih berharga daripada nilai uang Rp 100.000 sepuluh tahun mendatang karena potensi pertumbuhan dan pengaruh inflasi", "Nilai uang tidak pernah berubah sepanjang masa", "Uang di masa depan selalu lebih tinggi daya belinya daripada uang hari ini", "Waktu tidak memiliki pengaruh terhadap bunga pinjaman", "Membeli barang hari ini pasti lebih rugi daripada menunda selamanya"],
    c: "A",
    exp: "Nilai waktu dari uang menyatakan bahwa sejumlah uang saat ini bernilai lebih tinggi dibanding jumlah yang sama di masa depan karena potensi hasil dan inflasi."
  },
  {
    q: "Seorang petani padi membeli alat perontok padi (power thresher) seharga Rp 15.000.000 dengan memanfaatkan kredit usaha rakyat (KUR) berbunga rendah. Keputusan ini tergolong utang produktif karena...",
    opts: ["Menaikkan gengsi petani di mata warga desa", "Mempercepat proses panen, menekan kehilangan gabah, dan menghasilkan pendapatan sewa jasa perontokan bagi petani lain", "Dapat dibiarkan macet tanpa ditagih bank", "Harga mesin akan turun drastis dalam setahun", "Tidak memerlukan biaya perawatan"],
    c: "B",
    exp: "Utang tersebut menghasilkan efisiensi kerja dan pemasukan baru yang mampu membayar kembali cicilan pokok sekaligus memberi laba bersih."
  },
  {
    q: "Seorang pelajar SMA membeli sepatu bermerek seharga Rp 2.500.000 menggunakan fasilitas PayLater (bayar nanti) padahal uang sakunya sebulan hanya Rp 400.000. Tindakan ini mencerminkan...",
    opts: ["Keputusan finansial yang cerdas dan visioner", "Ketidakseimbangan literasi keuangan, terjebak utang konsumtif di luar kemampuan bayar, dan ancaman gagal bayar", "Penerapan formula budgeting 50/30/20 yang tepat", "Langkah investasi jangka panjang yang menguntungkan", "Tindakan pencegahan inflasi yang efektif"],
    c: "B",
    exp: "Mengambil pinjaman konsumtif dengan cicilan melampaui kemampuan pendapatan adalah jebakan finansial yang memicu tunggakan dan denda tinggi."
  },
  {
    q: "Berikut ini yang merupakan contoh pemasukan pasif (passive income) adalah...",
    opts: ["Gaji bulanan dari bekerja sebagai buruh tani harian", "Upah lembur mengemudikan traktor sawah", "Bagi hasil dividen dari penyertaan modal di Koperasi dan imbal hasil bunga obligasi", "Pendapatan dari menjual tenaga fisik seharian", "Hadiah undian berhadiah sesaat"],
    c: "C",
    exp: "Pemasukan pasif diperoleh dari aset atau modal yang bekerja (dividen koperasi, royalti, sewa properti) tanpa menuntut kehadiran fisik aktif harian."
  },
  {
    q: "Tujuan utama seseorang melakukan perencanaan pensiun (dana hari tua) sejak usia muda adalah...",
    opts: ["Agar bisa pensiun dan bermalas-malasan tanpa beribadah", "Memastikan kemandirian finansial di masa tua tanpa menjadi beban generasi penerus (memutus rantai sandwich generation)", "Menghindari pembayaran pajak penghasilan", "Menghabiskan seluruh uang sebelum hari tua tiba", "Membeli tanah di setiap desa"],
    c: "B",
    exp: "Perencanaan dana pensiun mandiri mencegah ketergantungan hidup pada anak/keluarga di masa depan sehingga memutus rantai generasi roti lapis."
  },
  {
    q: "Dalam istilah perbankan, agunan atau jaminan kebendaan (seperti sertifikat tanah atau BPKB) yang diserahkan nasabah saat meminjam dana berfungsi untuk...",
    opts: ["Menjadi milik bank secara otomatis begitu akad ditandatangani", "Memberikan jaminan kepastian pelunasan kredit bagi bank apabila nasabah melakukan wanprestasi/gagal bayar", "Sebagai syarat formalitas yang tidak memiliki nilai hukum", "Dihibahkan kepada nasabah lain yang membutuhkan", "Dilelang tanpa pemberitahuan kepada peminjam"],
    c: "B",
    exp: "Agunan adalah jaminan pelunasan kewajiban debitur kepada kreditur (bank) jika debitur tidak melunasi pinjaman sesuai perjanjian."
  },
  {
    q: "Manfaat utama dari memiliki rekening tabungan khusus yang terpisah antara 'Rekening Harian' dan 'Rekening Tabungan Masa Depan' adalah...",
    opts: ["Menambah biaya administrasi bank sebanyak-banyaknya", "Mencegah uang tabungan terpakai tanpa sadar untuk pengeluaran belanja harian", "Membuat pemilik bingung mengingat nomor rekening", "Agar kartu ATM sering hilang", "Menghindari verifikasi data identitas"],
    c: "B",
    exp: "Memisahkan rekening belanja rutin dan tabungan komitmen menjaga kedisiplinan finansial agar tabungan tidak bocor untuk keperluan sesaat."
  },
  {
    q: "Seseorang yang memiliki tingkat literasi keuangan 'Well Literate' menurut standar OJK ditandai dengan...",
    opts: ["Hanya memiliki pengetahuan tentang lembaga keuangan tanpa pernah menggunakan produknya", "Memiliki pengetahuan, keyakinan, dan keterampilan menggunakan produk serta layanan jasa keuangan secara bijak dan bertanggung jawab", "Sama sekali tidak tahu tentang produk perbankan", "Hanya percaya pada sistem pinjaman uang tunai informal", "Menolak bertransaksi dengan bank"],
    c: "B",
    exp: "Kategori 'Well Literate' memiliki pengetahuan lengkap dan keterampilan aplikatif dalam memanfaatkan produk jasa keuangan secara aman dan terukur."
  },
  {
    q: "Kebiasaan memeriksa struk belanja dan mutasi rekening secara berkala bertujuan untuk...",
    opts: ["Mencari kesalahan kasir agar mendapat ganti rugi", "Memantau ketepatan transaksi, mendeteksi potensi pemotongan liar/keliru, dan mengontrol pengeluaran", "Menyimpan kertas struk sebagai koleksi", "Mengetahui saldo teman yang bertransaksi", "Menolak membayar pajak pertambahan nilai"],
    c: "B",
    exp: "Mengecek mutasi rekening secara rutin adalah kebiasaan pengawasan mandiri untuk memastikan tidak ada transaksi mencurigakan atau kekeliruan sistem."
  },
  {
    q: "Jika seseorang terlanjur memiliki beberapa utang berbunga tinggi, strategi penyelesaian utang dengan metode 'Debt Snowball' dilakukan dengan cara...",
    opts: ["Membayar utang dari saldo yang paling kecil terlebih dahulu hingga lunas agar terbangun motivasi psikologis, baru beralih ke utang yang lebih besar", "Mengabaikan seluruh utang sampai penagih lelah datang", "Mengambil pinjaman baru yang lebih besar di pinjol lain untuk menutup utang lama (gali lubang tutup lubang)", "Membayar utang dengan bunga terbesar terlebih dahulu tanpa peduli saldo pokok", "Melarikan diri ke luar kota"],
    c: "A",
    exp: "Metode Debt Snowball melunasi utang dari nominal saldo terkecil lebih dulu untuk menciptakan momentum keberhasilan psikologis menuju utang yang lebih besar."
  },
  {
    q: "Tujuan hakiki dari belajar literasi finansial bagi pelajar SMA di OKU Timur adalah...",
    opts: ["Menjadi pribadi yang kikir dan pelit terhadap sesama manusia", "Mampu mengambil keputusan keuangan yang cerdas, bertanggung jawab, mandiri secara ekonomi, dan berkontribusi bagi masyarakat", "Mencari cara cepat kaya tanpa perlu bekerja keras", "Menghitung kekayaan orang lain", "Membeli barang mewah untuk pamer di media sosial"],
    c: "B",
    exp: "Tujuan utama literasi keuangan adalah membangun pola pikir bijak, mandiri, dan berintegritas dalam mengelola sumber daya ekonomi untuk masa depan yang sejahtera."
  }
];

// ==========================================
// INDIKATOR C: SOAL 81 s.d. 120
// ==========================================
const indC_topics = [
  {
    q: "Kedudukan Bank Indonesia (BI) dalam struktur ketatanegaraan Republik Indonesia berdasarkan UU No. 23 Tahun 1999 adalah sebagai...",
    opts: ["Kementerian di bawah Presiden langsung", "Lembaga negara independen yang bebas dari campur tangan pemerintah dan pihak lain dalam melaksanakan tugasnya", "Perusahaan BUMN pencetak laba", "Lembaga peradilan perbankan", "Bagian dari DPR RI"],
    c: "B",
    exp: "Bank Indonesia adalah lembaga negara yang independen dalam melaksanakan tugas dan wewenangnya, bebas dari campur tangan pihak luar."
  },
  {
    q: "Tujuan tunggal (single objective) Bank Indonesia sebagaimana diamanatkan undang-undang adalah...",
    opts: ["Mencari laba devisa setinggi-tingginya", "Mencapai dan memelihara kestabilan nilai Rupiah", "Menjadi bank umum penyedia kredit konsumsi terbesar", "Menentukan harga kebutuhan pokok di pasar tradisional", "Membayar utang luar negeri swasta"],
    c: "B",
    exp: "Tujuan tunggal BI adalah mencapai dan memelihara kestabilan nilai Rupiah, baik terhadap harga barang/jasa (inflasi) maupun terhadap valuta asing (kurs)."
  },
  {
    q: "Kestabilan nilai Rupiah yang menjadi tanggung jawab Bank Indonesia memiliki dua aspek penting, yaitu...",
    opts: ["Kestabilan terhadap harga emas dan perak", "Kestabilan terhadap barang dan jasa (inflasi) serta kestabilan terhadap mata uang negara lain (kurs/nilai tukar)", "Kestabilan harga beras di desa dan kota", "Kestabilan jumlah ATM dan buku tabungan", "Kestabilan gaji PNS dan TNI"],
    c: "B",
    exp: "Dua dimensi kestabilan Rupiah: internal (daya beli terhadap barang/jasa tercermin dari inflasi) dan eksternal (nilai tukar terhadap mata uang asing)."
  },
  {
    q: "Berikut ini yang BUKAN merupakan salah satu dari 3 pilar tugas utama Bank Indonesia adalah...",
    opts: ["Menetapkan dan melaksanakan kebijakan moneter", "Mengatur dan menjaga kelancaran sistem pembayaran", "Memelihara stabilitas sistem keuangan (makroprudensial)", "Memberikan pinjaman kredit modal langsung kepada masyarakat umum", "Mengelola cadangan devisa negara"],
    c: "D",
    exp: "Bank Indonesia adalah bank sentral (bank of issue & bankers' bank) dan TIDAK melayani simpan-pinjam masyarakat umum seperti bank umum komersial."
  },
  {
    q: "Kebijakan yang ditetapkan dan dilaksanakan oleh Bank Indonesia untuk mengendalikan jumlah uang yang beredar di masyarakat guna mencapai kestabilan nilai Rupiah disebut...",
    opts: ["Kebijakan fiskal", "Kebijakan moneter", "Kebijakan perdagangan internasional", "Kebijakan upah minimum", "Kebijakan tarif impor"],
    c: "B",
    exp: "Kebijakan moneter adalah wewenang eksklusif bank sentral untuk mengontrol pasokan uang dan tingkat suku bunga demi kestabilan ekonomi."
  },
  {
    q: "Ketika terjadi inflasi tinggi (kenaikan harga barang-barang secara tajam), langkah kebijakan moneter kontraktif (tight money policy) yang diambil Bank Indonesia adalah...",
    opts: ["Menurunkan suku bunga acuan BI-Rate", "Menaikkan suku bunga acuan (BI-Rate) dan menaikkan giro wajib minimum perbankan", "Mencetak uang kertas sebanyak-banyaknya", "Membeli surat berharga dari masyarakat", "Membebaskan bank dari cadangan kas"],
    c: "B",
    exp: "Untuk mengerem inflasi, BI menaikkan suku bunga acuan agar masyarakat terdorong menabung, menekan laju kredit, dan mengurangi peredaran uang."
  },
  {
    q: "Instrumen kebijakan moneter berupa kewajiban bagi bank umum untuk memelihara sejumlah saldo kas minimal di Bank Indonesia disebut...",
    opts: ["Operasi Pasar Terbuka", "Fasilitas Diskonto", "Giro Wajib Minimum (GWM)", "Moral Suasion (Himbauan Moral)", "Plafon Kredit"],
    c: "C",
    exp: "GWM (Giro Wajib Minimum) adalah jumlah dana cadangan likuiditas minimum yang wajib dipelihara oleh bank umum di Bank Indonesia."
  },
  {
    q: "Operasi Pasar Terbuka (Open Market Operation) dilakukan oleh Bank Indonesia dengan cara...",
    opts: ["Menjual atau membeli Surat Berharga Bank Indonesia (SBBI/SBN) di pasar uang", "Membuka pasar murah sembako di balai desa", "Menutup kantor cabang bank umum yang bermasalah", "Mengatur jam operasional pasar tradisional", "Menetapkan harga jual gabah di penggilingan"],
    c: "A",
    exp: "Operasi pasar terbuka mengendalikan likuiditas perbankan melalui jual/beli surat berharga pasar uang."
  },
  {
    q: "Bank Indonesia berperan sebagai 'Lender of Last Resort', yang memiliki arti...",
    opts: ["Pemberi pinjaman pertama bagi nasabah yang ingin membeli mobil", "Penyedia likuiditas darurat terakhir bagi bank umum yang mengalami krisis likuiditas jangka pendek guna mencegah keruntuhan sistemik", "Satu-satunya lembaga yang berhak menyita aset debitur macet", "Tempat penggadaian barang berharga milik negara", "Pemberi hibah tanpa syarat kepada perusahaan swasta"],
    c: "B",
    exp: "Lender of last resort adalah fungsi bank sentral sebagai benteng pertahanan terakhir penyedia pinjaman darurat bagi bank yang solvent namun illiquid."
  },
  {
    q: "Satu-satunya lembaga negara yang memiliki hak tunggal untuk mencetak, menerbitkan, dan mengedarkan uang Rupiah di wilayah Negara Kesatuan Republik Indonesia adalah...",
    opts: ["Kementerian Keuangan", "Otoritas Jasa Keuangan (OJK)", "Bank Indonesia (BI)", "PT Perum Peruri", "Lembaga Penjamin Simpanan (LPS)"],
    c: "C",
    exp: "Sesuai UU Mata Uang, Bank Indonesia adalah satu-satunya otoritas yang berhak mengeluarkan dan mengedarkan uang Rupiah sebagai alat pembayaran sah."
  },
  {
    q: "Uang kertas dan uang logam yang kita gunakan dalam transaksi sehari-hari di pasar tradisional Belitang dikategorikan sebagai...",
    opts: ["Uang giral", "Uang kartal", "Uang kuasi", "Uang komoditas", "Uang kripto"],
    c: "B",
    exp: "Uang kartal adalah alat pembayaran tunai sah yang terdiri atas uang kertas dan uang logam yang diterbitkan oleh bank sentral."
  },
  {
    q: "Uang yang tersimpan dalam bentuk saldo rekening giro di bank yang penarikannya dapat dilakukan sewaktu-waktu menggunakan cek atau bilyet giro disebut...",
    opts: ["Uang kartal", "Uang giral", "Uang barang", "Uang tanda", "Uang dinar"],
    c: "B",
    exp: "Uang giral adalah saldo dana simpanan di bank yang dapat dipindahtangankan sewaktu-waktu menggunakan cek, bilyet giro, atau transfer elektronik."
  },
  {
    q: "Metode mengenali keaslian uang kertas Rupiah yang disosialisasikan secara resmi oleh Bank Indonesia kepada masyarakat adalah gerakan...",
    opts: ["3M (Melihat, Memegang, Meraba)", "3D (Dilihat, Diraba, Diterawang)", "4T (Tanya, Tawar, Timbang, Tolak)", "5S (Senyum, Salam, Sapa, Sopan, Santun)", "2B (Bersih, Benar)"],
    c: "B",
    exp: "Metode 3D: Dilihat (perubahan warna & benang pengaman), Diraba (cetak kasar/tactile effect), Diterawang (tanda air/watermark pahlawan)."
  },
  {
    q: "Saat meraba uang kertas Rupiah asli pecahan Rp 100.000, sensasi tekstur kasar yang terasa pada gambar pahlawan dan angka nominal dibuat menggunakan teknologi...",
    opts: ["Cetak sablon biasa", "Intaglio printing (cetak dalam khusus)", "Cetak offset digital", "Fotokopi laser beresolusi tinggi", "Stempel timbul manual"],
    c: "B",
    exp: "Intaglio printing adalah teknik cetak uang resmi yang menghasilkan permukaan tinta timbul dan kasar saat diraba, sulit ditiru pemalsu."
  },
  {
    q: "Slogan edukasi Bank Indonesia yang mengajak seluruh warga negara untuk menghormati, menjaga, dan memperlakukan Rupiah dengan bijak adalah...",
    opts: ["Gemar Menabung Pangkal Kaya", "Cinta, Bangga, Paham Rupiah (CBP)", "Kedaulatan Finansial Merdeka", "Satu Nusa Satu Uang", "Rupiah Kuat Indonesia Jaya"],
    c: "B",
    exp: "Gerakan CBP (Cinta, Bangga, Paham Rupiah) menanamkan rasa cinta (merawat fisik uang), bangga (simbol kedaulatan negara), dan paham (bijak bertransaksi)."
  },
  {
    q: "Salah satu perilaku yang melanggar prinsip 'Cinta Rupiah' karena dapat merusak fisik uang kertas adalah...",
    opts: ["Menyimpan uang secara rapi dan tidak dilipat di dalam dompet", "Melipat-lipat, mencoret, menstapler, membasahi, dan meremas uang kertas Rupiah", "Menyetorkan uang tabungan ke bank", "Menukarkan uang lusuh di loket resmi Bank Indonesia", "Menggunakan Rupiah dalam setiap transaksi di NKRI"],
    c: "B",
    exp: "Perilaku '5 Jangan': Jangan dilipat, jangan dicoret, jangan distapler, jangan diremas, dan jangan dibasahi untuk menjaga usia edar uang Rupiah."
  },
  {
    q: "Inovasi sistem pembayaran non-tunai berbasis barcode dua dimensi yang distandardisasi oleh Bank Indonesia dan dapat digunakan lintas aplikasi dompet digital adalah...",
    opts: ["ATM Bersama", "EDC Mini", "QRIS (Quick Response Code Indonesian Standard)", "NFC Tap", "SWIFT Code"],
    c: "C",
    exp: "QRIS menyatukan berbagai penyedia jasa pembayaran (GoPay, OVO, Dana, mobile banking) dalam satu kode QR standar nasional terpadu."
  },
  {
    q: "Karakteristik utama dari transaksi pembayaran menggunakan QRIS bagi pedagang UMKM di OKU Timur adalah...",
    opts: ["Pedagang harus memiliki mesin kasir komputer super mahal", "Cukup satu kode QR di meja kasir, dapat menerima pembayaran dari seluruh aplikasi bank dan dompet digital mana pun tanpa uang kembalian", "Konsumen dikenakan potongan uang tunai yang sangat besar", "Uang baru masuk ke rekening pedagang satu bulan kemudian", "Transaksi hanya bisa dilakukan pada malam hari"],
    c: "B",
    exp: "Konsep QRIS adalah 'Satu QR untuk Semua'. Pedagang cukup memajang satu QRIS untuk menerima pembayaran dari puluhan aplikasi bank dan e-wallet."
  },
  {
    q: "Infrastruktur sistem transfer dana antar-bank ritel yang diluncurkan Bank Indonesia dengan biaya transfer murah Rp 2.500 dan beroperasi 24 jam sehari secara real-time adalah...",
    opts: ["RTGS (Real Time Gross Settlement)", "SKNBI Kliring Nasional", "BI-FAST", "Western Union", "Wesel Pos"],
    c: "C",
    exp: "BI-FAST adalah infrastruktur pembayaran ritel nasional yang memfasilitasi transfer dana antar-bank cepat, murah (Rp 2.500), aman, dan melayani 24/7."
  },
  {
    q: "Sistem penyelesaian transaksi pembayaran bernilai besar (di atas Rp 100 juta) yang bersifat segera dan seketika antar-bank di Bank Indonesia disebut...",
    opts: ["BI-RTGS (Real Time Gross Settlement)", "QRIS Mikro", "Tabungan Simpel", "Uang Elektronik Chip", "Cek Tunai Antar-Kecamatan"],
    c: "A",
    exp: "BI-RTGS melayani transfer dana bernilai besar (high value payment) dan bersifat urgen/kritis secara real-time bruto antar-bank."
  },
  {
    q: "Tujuan Bank Indonesia gencar menggalakkan Gerakan Nasional Non-Tunai (GNNT) adalah...",
    opts: ["Menghilangkan sama sekali peredaran uang kertas di seluruh Indonesia dalam sehari", "Menciptakan sistem pembayaran yang efisien, aman, transparan, higienis, dan mempercepat perputaran roda ekonomi", "Memaksa masyarakat membeli smartphone mahal", "Mengurangi pendapatan pedagang pasar tradisional", "Meniadakan peran bank umum"],
    c: "B",
    exp: "Transaksi non-tunai meningkatkan efisiensi nasional (menghemat biaya cetak/distribusi uang kartal), mencegah uang palsu, dan lebih transparan."
  },
  {
    q: "Bank Indonesia mengemban tugas dalam menjaga stabilitas makroprudensial, yang fokus pada...",
    opts: ["Pemeriksaan operasional harian satu per satu kantor cabang bank", "Mencegah dan memitigasi risiko sistemik pada keseluruhan sistem keuangan nasional agar krisis keuangan tidak melumpuhkan ekonomi", "Menetapkan besaran gaji karyawan swasta", "Menentukan tarif tiket bus antarkota", "Menyusun APBN bersama DPR"],
    c: "B",
    exp: "Kebijakan makroprudensial menjaga kesehatan sistem keuangan secara makro/keseluruhan untuk mencegah penularan krisis finansial sistemik."
  },
  {
    q: "Ketika rupiah mengalami pelemahan drastis terhadap Dolar Amerika Serikat, langkah intervensi pasar yang dapat dilakukan Bank Indonesia adalah...",
    opts: ["Menjual cadangan devisa Dolar AS ke pasar valas domestik dan instrumen moneter valas untuk menyeimbangkan penawaran dan permintaan", "Melarang perdagangan impor selamanya", "Menutup seluruh bank di perbatasan", "Membeli sebanyak-banyaknya mata uang asing di pasar gelap", "Menghentikan peredaran uang Rupiah"],
    c: "A",
    exp: "Intervensi valuta asing dengan melepas cadangan devisa (intervensi triple intervention) bertujuan menstabilkan fluktuasi nilai tukar Rupiah."
  },
  {
    q: "Dalam melaksanakan tugasnya, Dewan Gubernur Bank Indonesia dipimpin oleh seorang...",
    opts: ["Menteri Koordinator Bidang Perekonomian", "Gubernur Bank Indonesia", "Ketua Dewan Komisioner OJK", "Direktur Utama Bank Mandiri", "Menteri Keuangan"],
    c: "B",
    exp: "Bank Indonesia dipimpin oleh Dewan Gubernur yang terdiri dari Gubernur BI, Deputi Gubernur Senior, dan minimal 4 Deputi Gubernur."
  },
  {
    q: "Masa jabatan Gubernur Bank Indonesia dan anggota Dewan Gubernur lainnya sesuai undang-undang adalah...",
    opts: ["2 tahun tanpa perpanjangan", "5 tahun dan dapat diangkat kembali dalam jabatan yang sama paling banyak 1 kali masa jabatan berikutnya", "Seumur hidup", "Mengikuti masa jabatan kabinet menteri", "10 tahun sekaligus"],
    c: "B",
    exp: "Masa jabatan anggota Dewan Gubernur BI adalah 5 tahun dan dapat dipilih kembali maksimal untuk satu kali masa jabatan berikutnya."
  },
  {
    q: "Alasan mengapa Bank Indonesia harus independen dan bebas dari intervensi politik kekuasaan adalah...",
    opts: ["Agar pejabat bank sentral tidak perlu membayar pajak", "Agar kebijakan moneter dapat diambil secara objektif demi kestabilan jangka panjang tanpa tergoda kepentingan politik populis jangka pendek (seperti mencetak uang sembarangan)", "Supaya Bank Indonesia tidak diaudit oleh Badan Pemeriksa Keuangan", "Agar bank sentral bisa menguasai seluruh aset negara", "Supaya BI tidak perlu bekerja sama dengan pemerintah"],
    c: "B",
    exp: "Independensi mencegah pemerintah mencetak uang berlebihan untuk membiayai defisit anggaran yang terbukti memicu hiperinflasi di banyak negara."
  },
  {
    q: "Bentuk akuntabilitas dan transparansi Bank Indonesia kepada publik dan lembaga perwakilan rakyat diwujudkan melalui...",
    opts: ["Menyembunyikan laporan keuangan tahunan dari masyarakat", "Penyampaian laporan tahunan dan triwulanan pelaksanaan tugas kepada Presiden dan DPR serta dipublikasikan di media massa", "Menghentikan rilis data statistik ekonomi", "Hanya memberi laporan secara lisan tanpa bukti", "Melarang media meliput konferensi pers Dewan Gubernur"],
    c: "B",
    exp: "Meski independen, BI wajib transparan dan akuntabel dengan menyampaikan laporan resmi berkala kepada DPR, Presiden, dan masyarakat."
  },
  {
    q: "Di wilayah pedesaan OKU Timur yang belum terjangkau kantor cabang bank, Bank Indonesia dan OJK mendorong inklusi keuangan melalui program...",
    opts: ["Penutupan seluruh akses transaksi keuangan", "Layanan Keuangan Digital (LKD) dan Agen Laku Pandai (seperti Agen BRILink / Agen Bank)", "Mewajibkan warga desa datang ke kantor pusat di Jakarta", "Mengharuskan transaksi barter barang komoditas", "Melarang penggunaan smartphone di desa"],
    c: "B",
    exp: "Inklusi keuangan di desa diperluas lewat keagenan perbankan tanpa kantor (Laku Pandai / LKD) yang melayani setor-tarik tunai dan transfer di warung warga."
  },
  {
    q: "Salah satu fungsi uang sebagai 'Alat Tukar Umum' (Medium of Exchange) dapat dilihat dari peristiwa...",
    opts: ["Pak Budi menggunakan uang Rp 50.000 untuk membeli 3 kg beras di pasar Gumawang", "Bu Siti mencatat harga tanahnya senilai Rp 200.000.000", "Pak Wayan menabung uang di bank untuk biaya kuliah anaknya 5 tahun lagi", "Pak RT meminjamkan motor dengan jaminan BPKB", "Pemerintah menetapkan tarif pajak"],
    c: "A",
    exp: "Sebagai alat tukar (medium of exchange), uang mempermudah transaksi jual beli barang/jasa tanpa kerumitan sistem barter."
  },
  {
    q: "Ketika uang digunakan untuk menyatakan harga seekor sapi di pasar hewan Belitang seharga Rp 18.000.000, uang tersebut menjalankan fungsinya sebagai...",
    opts: ["Alat tukar", "Satuan hitung / Pengukur nilai (Unit of Account)", "Alat penimbun kekayaan", "Alat pembayaran utang masa lalu", "Alat spekulasi"],
    c: "B",
    exp: "Satuan hitung (unit of account) menetapkan nilai atau harga suatu barang/jasa dalam besaran angka mata uang secara seragam."
  },
  {
    q: "Tindakan merusak uang Rupiah (seperti merobek, menggunting, atau membakar) diancam dengan sanksi pidana dalam UU No. 7 Tahun 2011 tentang Mata Uang karena...",
    opts: ["Biaya kertas uang sangat mahal bagi swasta", "Rupiah adalah simbol kedaulatan negara dan identitas kehormatan bangsa yang dilindungi hukum", "Uang rusak tidak bisa dibakar dengan api biasa", "Hanya bank umum yang boleh merusak uang", "Membakar uang mencemari udara"],
    c: "B",
    exp: "Rupiah adalah lambang kedaulatan NKRI. Merusak uang secara sengaja adalah pelanggaran hukum pidana dengan ancaman denda dan penjara."
  },
  {
    q: "Uang Rupiah yang mengalami kerusakan fisik (robek, berlubang, atau terbakar) sebagian dapat ditukarkan di loket resmi Bank Indonesia dengan syarat...",
    opts: ["Harus dalam kondisi 100% utuh tanpa lecet sedikit pun", "Tanda keaslian uang masih dapat dikenali dan fisik uang kertas yang tersisa lebih besar dari 2/3 (dua pertiga) ukuran aslinya", "Wajib membawa surat pengantar dari kepolisian pusat", "Uang rusak diganti dengan potongan biaya 50%", "Hanya dilayani setahun sekali"],
    c: "B",
    exp: "BI melayani penukaran uang rusak secara gratis selama keasliannya terverifikasi dan sisa fisik uang kertas minimal lebih dari 2/3 (67%)."
  },
  {
    q: "Layanan kas keliling Bank Indonesia yang masuk ke pelosok daerah terpencil, perbatasan, dan kepulauan bertujuan untuk...",
    opts: ["Menarik kembali seluruh kekayaan warga desa", "Menjaga kualitas uang beredar (Clean Money Policy) dan menjamin ketersediaan uang layak edar bagi masyarakat", "Membagikan bantuan uang tunai cuma-cuma", "Memaksa pedagang mengganti sistem uang kartal", "Mencatat nama-nama pemilik rekening"],
    c: "B",
    exp: "Kas keliling menjamin implementasi 'Clean Money Policy' agar masyarakat di pelosok mendapatkan uang layak edar dan menukar uang lusuh."
  },
  {
    q: "Faktor yang menyebabkan inflasi dari sisi dorongan biaya produksi (Cost-Push Inflation) adalah...",
    opts: ["Meningkatnya permintaan belanja masyarakat saat hari raya Idulfitri", "Kenaikan harga bahan bakar minyak (BBM), tarif listrik, dan pupuk yang mendongkrak biaya produksi barang", "Jumlah uang beredar yang berkurang drastis di perbankan", "Penurunan harga barang-barang impor", "Banjir bantuan beras gratis dari pemerintah"],
    c: "B",
    exp: "Cost-push inflation dipicu oleh lonjakan ongkos produksi (kenaikan harga bahan baku, energi, logistik) yang memaksa produsen menaikkan harga jual."
  },
  {
    q: "Perbedaan fungsi antara Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) pasca pembagian kewenangan adalah...",
    opts: ["BI mengatur kebijakan moneter dan stabilitas makroprudensial sistem keuangan, sedangkan OJK mengawasi lembaga jasa keuangan individual (mikroprudensial) dan perlindungan konsumen", "BI mengawasi nasabah pinjol, OJK mencetak uang kertas", "Keduanya memiliki tugas dan kewenangan yang sama tanpa perbedaan", "BI berada di bawah naungan OJK", "OJK bertanggung jawab mengendalikan inflasi daerah"],
    c: "A",
    exp: "BI fokus pada stabilitas moneter dan makro (sistem keuangan menyeluruh & pembayaran), sedangkan OJK fokus pada mikro (kesehatan bank/lembaga keuangan perorangan)."
  },
  {
    q: "Keuntungan utama menggunakan dompet digital berbasis QRIS bagi seorang pelajar saat membeli makanan di kantin sekolah adalah...",
    opts: ["Pasti mendapat diskon 90% setiap hari", "Praktis tanpa repot membawa uang kembalian receh, higienis, dan pengeluaran tercatat otomatis di riwayat aplikasi", "Uang saku di dompet digital tidak akan pernah berkurang", "Dapat berutang tanpa perlu membayar kembali", "Bisa digunakan meski HP dalam keadaan mati"],
    c: "B",
    exp: "QRIS menawarkan kepraktisan tanpa repot uang kembalian, aman dari risiko kecopetan fisik, higienis, dan tercatat otomatis dalam histori transaksi."
  },
  {
    q: "Jika sebuah negara terlalu banyak mencetak uang tunai untuk membayar utang pemerintah tanpa diimbangi peningkatan produksi barang, dampak ekonomi yang akan terjadi adalah...",
    opts: ["Masyarakat menjadi makmur dan kaya raya seketika", "Terjadinya hiperinflasi di mana nilai mata uang jatuh bebas dan harga barang melambung tinggi tak terkendali (seperti di Zimbabwe atau Venezuela)", "Nilai tukar mata uang akan menguat tajam terhadap dolar", "Suku bunga bank menjadi nol persen", "Produksi pangan meningkat berlipat ganda"],
    c: "B",
    exp: "Mencetak uang tanpa sokongan pertumbuhan output riil barang/jasa hanya akan memicu hiperinflasi yang menghancurkan daya beli uang masyarakat."
  },
  {
    q: "Peran Bank Indonesia dalam Tim Pengendalian Inflasi Daerah (TPID) di tingkat kabupaten seperti di OKU Timur adalah...",
    opts: ["Menentukan vonis hukuman bagi pedagang nakal", "Bekerja sama dengan Pemerintah Daerah menjaga ketersediaan pasokan pangan, kelancaran distribusi logistik, dan keterjangkauan harga sembako (Strategi 4K)", "Menutup pasar yang menjual cabai mahal", "Membeli seluruh hasil panen petani secara paksa", "Menjadi pengawas pemilu kepala daerah"],
    c: "B",
    exp: "TPID bersama BI menjaga inflasi daerah lewat strategi 4K: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi efektif."
  },
  {
    q: "Konsep 'Uang Elektronik' (Electronic Money) berbeda dengan 'Uang Digital Bank Sentral' (Central Bank Digital Currency / CBDC / Digital Rupiah) dalam hal...",
    opts: ["Uang elektronik diterbitkan oleh bank umum/lembaga non-bank atas dasar simpanan dana tunai, sedangkan Digital Rupiah merupakan uang digital berdaulat yang diterbitkan langsung oleh Bank Indonesia sebagai kewajiban langsung bank sentral", "Uang elektronik memiliki wujud kertas, CBDC tidak berwujud", "Digital Rupiah hanya berlaku di luar negeri", "Uang elektronik tidak memiliki nilai nominal", "Keduanya tidak diakui oleh undang-undang"],
    c: "A",
    exp: "CBDC (Proyek Garuda / Digital Rupiah) adalah representasi digital dari mata uang resmi yang diterbitkan dan dijamin langsung oleh Bank Indonesia."
  },
  {
    q: "Sebagai generasi muda di Belitang, wujud nyata sikap mencerminkan pilar 'Paham Rupiah' dalam kehidupan sehari-hari adalah...",
    opts: ["Membeli barang secara berlebihan mumpung punya uang", "Menggunakan Rupiah untuk konsumsi bijak, berbelanja sesuai kebutuhan, rajin menabung, dan berinvestasi pada hal produktif", "Menukarkan seluruh tabungan rupiah ke mata uang asing untuk disimpan di rumah", "Menolak bertransaksi dengan pedagang yang memakai QRIS", "Menghabiskan uang untuk bermain judi online"],
    c: "B",
    exp: "Paham Rupiah tercermin dari kecakapan berperilaku bijak: berbelanja bijak (mengendalikan inflasi), berhemat menabung, dan berinvestasi produktif."
  }
];

// ==========================================
// INDIKATOR D: SOAL 121 s.d. 160
// ==========================================
const indD_topics = [
  {
    q: "Landasan konstitusional perekonomian Indonesia dan keberadaan Koperasi termaktub secara tegas dalam UUD 1945 Pasal...",
    opts: ["Pasal 27 ayat (2)", "Pasal 33 ayat (1)", "Pasal 34 ayat (1)", "Pasal 31 ayat (3)", "Pasal 28E ayat (1)"],
    c: "B",
    exp: "Pasal 33 ayat (1) UUD 1945 menyatakan: 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan'."
  },
  {
    q: "Undang-Undang Republik Indonesia yang menjadi landasan hukum utama penyelenggaraan perkoperasian di Indonesia saat ini adalah...",
    opts: ["UU No. 25 Tahun 1992", "UU No. 5 Tahun 1999", "UU No. 40 Tahun 2007", "UU No. 19 Tahun 2003", "UU No. 7 Tahun 2014"],
    c: "A",
    exp: "UU No. 25 Tahun 1992 tentang Perkoperasian adalah undang-undang dasar operasional koperasi di Indonesia."
  },
  {
    q: "Tokoh proklamator bangsa yang dikenal dan dihormati sebagai 'Bapak Koperasi Indonesia' atas gagasannya membangun ekonomi kerakyatan adalah...",
    opts: ["Ir. Soekarno", "Drs. Mohammad Hatta", "Ki Hadjar Dewantara", "Sutan Sjahrir", "Mr. Mohammad Yamin"],
    c: "B",
    exp: "Drs. Mohammad Hatta adalah Bapak Koperasi Indonesia yang gigih memperjuangkan koperasi sebagai soko guru perekonomian nasional."
  },
  {
    q: "Asas fundamental yang mendasari seluruh kegiatan operasional dan relasi keanggotaan dalam koperasi adalah...",
    opts: ["Asas kapitalisme murni", "Asas kekeluargaan dan gotong royong", "Asas persaingan bebas", "Asas kepemilikan modal terbesar", "Asas monopoli pasar"],
    c: "B",
    exp: "Koperasi berlandaskan asas kekeluargaan dan gotong royong demi kesejahteraan bersama anggotanya, bukan semata-mata mencari laba individu."
  },
  {
    q: "Perbedaan mendasar antara tujuan Koperasi dengan Perseroan Terbatas (PT) swasta terletak pada...",
    opts: ["Koperasi bertujuan memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya, sedangkan PT bertujuan memaksimalisasi keuntungan (laba) pemegang saham", "Koperasi hanya bergerak di bidang keagamaan, PT di bidang perdagangan", "Koperasi tidak memerlukan modal uang, PT memerlukan uang", "Koperasi dimiliki oleh pemerintah, PT dimiliki oleh warga desa", "Koperasi tidak memiliki izin usaha resmi"],
    c: "A",
    exp: "Tujuan utama koperasi adalah melayani dan menyejahterakan anggota, sedangkan PT berorientasi mencari laba maksimal bagi pemilik modal."
  },
  {
    q: "Kekuasaan tertinggi dalam tata kelola dan pengambilan keputusan strategis sebuah koperasi berada di tangan...",
    opts: ["Ketua Pengurus Koperasi", "Dewan Pengawas Koperasi", "Rapat Anggota (RAT)", "Kepala Dinas Koperasi Kabupaten", "Manajer Operasional"],
    c: "C",
    exp: "Rapat Anggota merupakan pemegang kekuasaan tertinggi dalam koperasi yang mencerminkan kedaulatan demokratis seluruh anggota."
  },
  {
    q: "Prinsip demokrasi dalam pengambilan suara pada Rapat Anggota Koperasi menganut sistem...",
    opts: ["Satu lembar saham satu suara (One share one vote)", "Satu anggota satu suara (One man one vote) tanpa memandang besar kecilnya simpanan modal", "Jumlah suara ditentukan oleh tingkat pendidikan anggota", "Hanya pengurus yang memiliki hak suara", "Suara terbanyak ditentukan oleh pejabat desa"],
    c: "B",
    exp: "Koperasi menjunjung kesetaraan: 'One man one vote' (setiap anggota punya 1 hak suara yang setara, tidak peduli berapa besar simpanannya)."
  },
  {
    q: "Modal sendiri (ekuitas internal) yang dimiliki oleh sebuah koperasi terdiri atas...",
    opts: ["Simpanan pokok, simpanan wajib, dana cadangan, dan hibah", "Pinjaman bank umum dan obligasi swasta", "Penyertaan modal modal ventura asing", "Kredit usaha rakyat dan pinjol", "Uang titipan pedagang pasar"],
    c: "A",
    exp: "Menurut UU 25/1992, modal sendiri koperasi terdiri dari simpanan pokok, simpanan wajib, dana cadangan, dan hibah."
  },
  {
    q: "Simpanan sejumlah uang yang sama banyaknya dan wajib dibayarkan oleh setiap anggota pada saat pertama kali resmi masuk menjadi anggota koperasi disebut...",
    opts: ["Simpanan wajib", "Simpanan pokok", "Simpanan sukarela", "Dana cadangan", "Sisa hasil usaha"],
    c: "B",
    exp: "Simpanan pokok dibayar sekali di awal saat masuk menjadi anggota dengan nominal sama rata, dan tidak dapat ditarik selama masih menjadi anggota."
  },
  {
    q: "Simpanan yang wajib dibayarkan oleh anggota koperasi secara rutin dalam jangka waktu tertentu (misalnya setiap bulan sekali) disebut...",
    opts: ["Simpanan pokok", "Simpanan wajib", "Simpanan sukarela", "Investasi modal", "Hadiah undian"],
    c: "B",
    exp: "Simpanan wajib dibayarkan secara teratur dalam jangka waktu tertentu (misal tiap bulan) dan tidak dapat ditarik selama masih berstatus anggota."
  },
  {
    q: "Simpanan yang dapat disetorkan dan ditarik kembali sewaktu-waktu oleh anggota sesuai perjanjian yang disepakati disebut...",
    opts: ["Simpanan pokok", "Simpanan wajib", "Simpanan sukarela", "Dana hibah", "Cadangan kerugian"],
    c: "C",
    exp: "Simpanan sukarela bersifat fleksibel, besarannya bebas, dan dapat disetor maupun ditarik kembali sewaktu-waktu sesuai ketentuan koperasi."
  },
  {
    q: "Pendapatan koperasi yang diperoleh dalam satu tahun buku dikurangi dengan biaya operasional, penyusutan, dan kewajiban lainnya termasuk pajak disebut...",
    opts: ["Dividen pemegang saham", "Sisa Hasil Usaha (SHU)", "Laba ditahan murni", "Bunga pinjaman", "Omzet kotor"],
    c: "B",
    exp: "SHU (Sisa Hasil Usaha) adalah laba bersih operasional koperasi dalam satu tahun buku setelah dikurangi seluruh beban kewajiban."
  },
  {
    q: "Pembagian Sisa Hasil Usaha (SHU) kepada anggota koperasi dilakukan secara adil berdasarkan prinsip...",
    opts: ["Dibagi rata sama banyak kepada seluruh warga desa", "Sebanding dengan besarnya jasa usaha dan kontribusi transaksi masing-masing anggota kepada koperasi", "Diberikan seluruhnya kepada pengurus koperasi", "Hanya diberikan kepada anggota yang paling kaya", "Ditentukan secara acak oleh panitia"],
    c: "B",
    exp: "SHU dibagikan proporsional berdasarkan kontribusi jasa modal (simpanan) dan jasa transaksi/belanja anggota kepada koperasi."
  },
  {
    q: "Pak Joko memiliki simpanan di Koperasi Tani Makmur sebesar 5% dari total simpanan anggota dan aktif berbelanja pupuk sebesar 10% dari total omzet penjualan koperasi. Pembagian SHU yang diterima Pak Joko akan dihitung dari...",
    opts: ["Hanya dari simpanannya saja tanpa melihat belanja", "Gabungan SHU Jasa Modal (atas simpanan) dan SHU Jasa Usaha (atas transaksi belanjanya)", "Diberikan nilai tetap Rp 100.000", "Ditentukan oleh ketua koperasi secara pribadi", "Tidak mendapatkan SHU karena petani"],
    c: "B",
    exp: "SHU anggota terdiri dari SHU Jasa Modal (porsi simpanan) ditambah SHU Jasa Anggota/Usaha (porsi keaktifan berbelanja/meminjam)."
  },
  {
    q: "Koperasi Unit Desa (KUD) di OKU Timur yang menyediakan pupuk, benih padi, pestisida, dan membeli gabah petani anggota dikategorikan sebagai...",
    opts: ["Koperasi simpan pinjam murni", "Koperasi produsen dan konsumsi serba usaha (KSU)", "Koperasi jasa asuransi", "Koperasi perumahan", "Koperasi impor barang mewah"],
    c: "B",
    exp: "Koperasi serba usaha (KSU) melayani penyediaan sarana produksi (konsumsi/produksi) sekaligus pemasaran hasil panen anggotanya."
  },
  {
    q: "Di sebuah sekolah di Belitang, Koperasi Siswa (Kopsis) menjual buku tulis, seragam, alat tulis, dan makanan sehat. Manfaat utama Koperasi Siswa adalah...",
    opts: ["Mencari keuntungan pribadi bagi pengurus kelas", "Menyediakan kebutuhan sekolah siswa dengan harga wajar serta menjadi sarana pendidikan karakter dan praktik wirausaha siswa", "Menggantikan peran kantin swasta secara paksa", "Mengharuskan siswa meminjam uang berbunga", "Menjadikan siswa pedagang keliling"],
    c: "B",
    exp: "Koperasi siswa melayani kebutuhan perlengkapan belajar peserta didik sekaligus menjadi laboratorium pendidikan ekonomi dan kerja sama."
  },
  {
    q: "Badan Usaha Milik Negara (BUMN) yang berbentuk 'Persero' (seperti PT Bank Rakyat Indonesia Tbk atau PT Pupuk Sriwidjaja) memiliki karakteristik utama, yaitu...",
    opts: ["Berorientasi murni memberikan layanan gratis tanpa memperhitungkan untung rugi", "Modal terbagi dalam saham yang minimal 51% dimiliki oleh Negara RI, dan bertujuan mengejar keuntungan (profit oriented) sekaligus pelayanan publik", "100% modal dimiliki oleh pihak swasta asing", "Tidak berbadan hukum", "Bebas dari kewajiban perpajakan"],
    c: "B",
    exp: "BUMN Persero berbadan hukum PT, saham mayoritas (>=51%) milik negara, dan berorientasi mencari laba profesional selain mendukung program negara."
  },
  {
    q: "Perum BULOG yang mengelola cadangan beras pemerintah dan menjaga harga dasar gabah di tingkat petani merupakan contoh BUMN yang berstatus...",
    opts: ["Persero murni pencari laba", "Perum (Perusahaan Umum) yang mengutamakan kemanfaatan umum bagi masyarakat luas", "Koperasi simpan pinjam", "Persekutuan Komanditer (CV)", "Badan Usaha Milik Swasta Asing"],
    c: "B",
    exp: "Perum (Perusahaan Umum) adalah BUMN yang seluruh modalnya milik negara dan mengutamakan kemanfaatan umum penyediaan barang/jasa berkualitas."
  },
  {
    q: "Badan Usaha Milik Daerah (BUMD) di Kabupaten OKU Timur (seperti Bank Sumsel Babel atau Perumda Air Minum Way Komering) didirikan dengan tujuan...",
    opts: ["Menyaingi usaha pedagang kecil di pasar tradisional", "Menyumbang Pendapatan Asli Daerah (PAD), mendorong pertumbuhan ekonomi daerah, dan melayani kebutuhan air bersih/perbankan warga", "Menghabiskan dana APBD kabupaten", "Menciptakan monopoli perdagangan beras swasta", "Menjual aset daerah kepada pihak luar"],
    c: "B",
    exp: "BUMD dibentuk oleh Pemerintah Daerah untuk memberi kontribusi terhadap PAD, menggerakkan roda ekonomi lokal, dan melayani utilitas publik."
  },
  {
    q: "Bentuk Badan Usaha Milik Swasta (BUMS) yang didirikan oleh dua orang atau lebih, di mana terdapat sekutu aktif (pengelola) dan sekutu pasif (penanam modal saja) disebut...",
    opts: ["Firma (Fa)", "Persekutuan Komanditer (CV - Commanditaire Vennootschap)", "Perseroan Terbatas (PT)", "Perusahaan Perseorangan", "Yayasan"],
    c: "B",
    exp: "CV memiliki sekutu aktif/komplementer (menjalankan usaha dengan tanggung jawab penuh) dan sekutu pasif/komanditer (hanya setor modal)."
  },
  {
    q: "Karakteristik penting dari bentuk badan usaha Perseroan Terbatas (PT) adalah...",
    opts: ["Tanggung jawab pemilik modal/pemegang saham bersifat terbatas sebesar modal saham yang disetor", "Jika perusahaan bangkrut, harta pribadi pemegang saham akan ikut disita bank", "Hanya boleh didirikan oleh satu keluarga sedarah", "Tidak memerlukan akta notaris resmi", "Keuntungan dibagi rata kepada seluruh karyawan"],
    c: "A",
    exp: "Ciri khas PT adalah 'Limited Liability' (tanggung jawab terbatas). Pemegang saham hanya bertanggung jawab sebatas nominal saham yang dimilikinya."
  },
  {
    q: "Di desa-desa di OKU Timur, lembaga ekonomi desa yang modalnya sebagian besar dimiliki oleh pemerintah desa dan warga untuk mengelola potensi lokal disebut...",
    opts: ["BUMN", "BUMD", "BUMDes (Badan Usaha Milik Desa)", "Kadin", "Holding Company"],
    c: "C",
    exp: "BUMDes (Badan Usaha Milik Desa) adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh desa guna meningkatkan PADesa."
  },
  {
    q: "Peran utama Koperasi Simpan Pinjam (KSP) yang sehat dalam membantu UMKM mikro di Belitang adalah...",
    opts: ["Mengenakan bunga harian berlipat ganda seperti rentenir", "Menyediakan akses pinjaman modal usaha yang mudah, terjangkau, dan mendidik anggota agar terbebas dari jeratan lintah darat", "Memaksa anggota membeli barang dagangan pengurus", "Menyita barang jaminan tanpa proses musyawarah", "Menyalurkan dana ke judi online"],
    c: "B",
    exp: "Koperasi simpan pinjam melindungi anggotanya dari rentenir dengan menyediakan pembiayaan yang mudah, bunga wajar, dan berasas tolong-menolong."
  },
  {
    q: "Prinsip kemandirian dalam jati diri koperasi internasional dan nasional berarti bahwa...",
    opts: ["Koperasi tidak boleh menerima bantuan atau bekerja sama dengan pihak luar sama sekali", "Koperasi dapat berdiri sendiri, berpijak pada kekuatan swadaya anggota, dan tidak bergantung pada belas kasihan pihak luar", "Pengurus koperasi bebas berbuat semaunya tanpa aturan", "Anggota dilarang mengikuti rapat tahunan", "Koperasi tidak perlu membayar pajak"],
    c: "B",
    exp: "Prinsip kemandirian berarti koperasi mampu mengelola organisasinya secara otonom dengan mengandalkan partisipasi aktif modal dan usaha anggota."
  },
  {
    q: "Perangkat organisasi koperasi yang bertugas menjalankan roda operasional harian, menyusun rencana kerja anggaran, dan mewakili koperasi di dalam dan di luar pengadilan adalah...",
    opts: ["Dewan Pengawas", "Pengurus Koperasi", "Rapat Anggota Luar Biasa", "Auditor Independen", "Kepala Desa"],
    c: "B",
    exp: "Pengurus koperasi dipilih oleh anggota untuk mengelola kegiatan operasional, memimpin organisasi, dan bertanggung jawab kepada Rapat Anggota."
  },
  {
    q: "Tugas utama dari Pengawas Koperasi adalah...",
    opts: ["Menyetujui pinjaman untuk keluarga sendiri", "Melakukan pengawasan terhadap pelaksanaan kebijakan dan pengelolaan koperasi serta membuat laporan tertulis untuk Rapat Anggota", "Menjual sembako di gerai koperasi", "Menggantikan ketua pengurus jika rapat berlangsung", "Menetapkan besaran simpanan pokok baru"],
    c: "B",
    exp: "Pengawas bertugas mengawasi jalannya roda organisasi dan keuangan koperasi agar transparan dan sesuai dengan keputusan Rapat Anggota."
  },
  {
    q: "Alasan mengapa Koperasi disebut sebagai 'Soko Guru Perekonomian Indonesia' adalah...",
    opts: ["Koperasi merupakan satu-satunya badan usaha yang boleh berdiri di Indonesia", "Koperasi mencerminkan kepribadian bangsa Indonesia (gotong royong) dan menempatkan kemakmuran bersama di atas kemakmuran orang-seorang", "Koperasi menyumbang pajak terbesar melebihi seluruh BUMN", "Koperasi hanya ada di Indonesia dan tidak ada di negara lain", "Gedung koperasi selalu bertingkat tinggi"],
    c: "B",
    exp: "Koperasi dianggap soko guru (tiang penyangga utama) karena strukturnya berakar pada asas kekeluargaan dan gotong royong asli bangsa Indonesia."
  },
  {
    q: "Jika seorang anggota koperasi mengundurkan diri secara resmi dan tidak lagi menjadi anggota, maka hak keuangannya adalah...",
    opts: ["Seluruh simpanan pokok dan simpanan wajibnya hangus disita pengurus", "Dapat menarik kembali simpanan pokok, simpanan wajib, dan simpanan sukarela miliknya setelah dipotong kewajiban utang (jika ada)", "Mendapat ganti rugi 10 kali lipat dari pemerintah", "Wajib membayar denda pengunduran diri yang besar", "Tidak boleh keluar dari koperasi selamanya"],
    c: "B",
    exp: "Anggota yang keluar berhak menerima kembali simpanan pokok, wajib, dan sukarela miliknya setelah menyelesaikan kewajiban pinjamannya."
  },
  {
    q: "Dana Cadangan dalam pembagian SHU koperasi dialokasikan dengan tujuan untuk...",
    opts: ["Dibagikan sebagai bonus tunai rahasia bagi ketua pengurus", "Memupuk modal sendiri koperasi dan menutup kemungkinan kerugian usaha di masa mendatang", "Membeli kado ulang tahun anggota", "Dihabiskan saat acara rekreasi pengurus", "Diserahkan ke kas desa"],
    c: "B",
    exp: "Dana cadangan disisihkan dari SHU untuk menambah modal sendiri dan mengantisipasi risiko kerugian usaha agar koperasi tetap stabil."
  },
  {
    q: "Koperasi Konsumsi memiliki fungsi utama melayani anggotanya dalam bentuk...",
    opts: ["Membeli gabah basah dari sawah", "Menyediakan kebutuhan barang konsumsi sehari-hari dengan mutu terjamin dan harga yang wajar bagi anggotanya", "Memproduksi mesin traktor tangan", "Menyalurkan tenaga kerja ke luar negeri", "Menyediakan kredit perumahan mewah"],
    c: "B",
    exp: "Koperasi konsumsi berfokus menyediakan barang kebutuhan pokok sehari-hari (sembako, alat tulis) bagi kenyamanan anggotanya."
  },
  {
    q: "Salah satu tantangan umum yang sering dihadapi oleh koperasi konvensional di era digital adalah...",
    opts: ["Terlalu banyak anak muda yang mendaftar menjadi pengurus", "Manajemen masih manual, pembukuan belum transparan berbasis aplikasi, dan regenerasi anggota muda yang lambat", "Bunga tabungan yang terlalu tinggi", "Aturan pemerintah yang terlalu bebas", "Banyaknya gerai minimarket yang bergabung menjadi anggota"],
    c: "B",
    exp: "Tantangan koperasi masa kini adalah modernisasi tata kelola digital, akuntabilitas laporan real-time, dan menarik minat generasi muda (Gen-Z)."
  },
  {
    q: "Koperasi Produksi adalah jenis koperasi yang anggotanya terdiri dari para produsen, contoh nyatanya di OKU Timur adalah...",
    opts: ["Koperasi pegawai negeri yang berbelanja pakaian", "Koperasi Peternak Sapi Potong yang mengolah pakan ternak bersama dan memasarkan daging sapi", "Koperasi simpan pinjam di pasar", "Koperasi jasa fotokopi kampus", "Koperasi perumahan rakyat"],
    c: "B",
    exp: "Koperasi produksi menampung produsen mandiri (peternak, petani, perajin) untuk memproduksi dan memasarkan komoditas secara kolektif."
  },
  {
    q: "Jika Koperasi Tani di Belitang berhasil melakukan pembelian bersama (bulk buying) pupuk dan obat pertanian langsung dari pabrik pupuk BUMN, keuntungan bagi petani adalah...",
    opts: ["Harga beli pupuk menjadi jauh lebih murah, terhindar dari kelangkaan, dan keaslian produk terjamin", "Petani diwajibkan membeli pupuk palsu", "Keuntungan pabrik pupuk menurun drastis", "Petani tidak boleh menanam padi lagi", "Pupuk disimpan di gudang tanpa dibagikan"],
    c: "A",
    exp: "Pembelian kolektif skala besar memangkas rantai calo perantara, menurunkan harga beli netto, dan menjamin keaslian saprotan."
  },
  {
    q: "Ciri khas badan usaha Firma (Fa) dalam pembagian tanggung jawab hukum adalah...",
    opts: ["Tanggung jawab sekutu terbatas hanya pada modal yang disetor", "Setiap anggota sekutu bertanggung jawab secara pribadi dan solider (tanggung renteng tak terbatas) hingga ke harta pribadi atas seluruh perikatan firma", "Firma dimiliki oleh minimal 100 orang pemegang saham", "Tidak ada anggota yang boleh mengelola usaha", "Firma dibubarkan setiap akhir tahun"],
    c: "B",
    exp: "Dalam Firma, tanggung jawab anggotanya bersifat tanggung renteng dan tidak terbatas, hingga menyentuh harta pribadi jika terjadi kerugian utang."
  },
  {
    q: "Kriteria Usaha Mikro menurut regulasi perundang-undangan di Indonesia didasarkan pada...",
    opts: ["Kekayaan bersih (aset) dan hasil penjualan tahunan (omzet) yang berada di bawah ambang batas skala usaha kecil/menengah", "Jumlah gedung kantor yang dimiliki", "Tingkat pendidikan pemilik usaha", "Keberadaan rekening valas di luar negeri", "Jumlah cabang di seluruh provinsi"],
    c: "A",
    exp: "Kategori UMKM diukur berdasarkan kriteria modal usaha/aset bersih di luar tanah/bangunan dan hasil penjualan tahunan (omzet)."
  },
  {
    q: "Peran BUMN strategis seperti PT PLN (Persero) dalam perekonomian Indonesia sesuai amanat Pasal 33 ayat (2) UUD 1945 adalah...",
    opts: ["Menguasai cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak agar dikelola demi sebesar-besarnya kemakmuran rakyat", "Menjual listrik dengan harga setinggi-tingginya kepada rakyat miskin", "Menyerahkan pengelolaan listrik kepada investor asing secara bebas", "Menghambat pembangunan industri di daerah", "Hanya menyuplai listrik di ibu kota saja"],
    c: "A",
    exp: "Pasal 33 ayat (2) UUD 1945 menegaskan cabang produksi penting yang menguasai hajat hidup publik dikuasai negara demi kesejahteraan rakyat."
  },
  {
    q: "Koperasi yang modern saat ini mulai menerapkan digitalisasi dengan meluncurkan aplikasi 'Koperasi Mobile', manfaatnya bagi anggota di pedesaan adalah...",
    opts: ["Anggota dapat melihat saldo simpanan, mengajukan pinjaman, dan membayar tagihan listrik/air secara mudah dari ponsel pintar tanpa antre di kantor", "Menghilangkan silaturahmi antar-warga desa selamanya", "Menaikkan bunga pinjaman secara sepihak", "Membatasi hak suara anggota saat rapat", "Menolak pendaftaran anggota baru"],
    c: "A",
    exp: "Aplikasi koperasi digital mempermudah transaksi, meningkatkan transparansi saldo anggota, dan memperluas layanan PPOB di desa."
  },
  {
    q: "Di sebuah koperasi simpan pinjam, modal pinjaman yang diperoleh dari pihak luar dapat bersumber dari...",
    opts: ["Simpanan pokok anggota sendiri", "Pinjaman bank, pinjaman dari koperasi lain, penerbitan obligasi surat utang, atau bantuan perkuatan permodalan pemerintah", "Simpanan wajib bulanan", "Penyusutan inventaris kantor", "Dana cadangan modal sendiri"],
    c: "B",
    exp: "Modal pinjaman berasal dari pihak eksternal, seperti kredit perbankan, pinjaman dari koperasi sekunder, atau lembaga pembiayaan pemerintah."
  },
  {
    q: "Tindakan pengurus koperasi yang menggunakan uang kas simpanan anggota untuk kepentingan pribadi tanpa izin Rapat Anggota merupakan tindakan...",
    opts: ["Pelanggaran hukum pidana penggelapan dalam jabatan yang dapat dituntut ke pengadilan", "Tindakan inovatif yang patut dicontoh", "Bagian dari hak istimewa ketua pengurus", "Bentuk kebebasan berkoperasi", "Diperbolehkan asalkan diganti dalam 10 tahun"],
    c: "A",
    exp: "Penyalahgunaan dana simpanan anggota oleh pengurus adalah tindak pidana korupsi/penggelapan yang melanggar hukum dan AD/ART koperasi."
  },
  {
    q: "Hubungan kemitraan yang ideal antara Badan Usaha Milik Negara (BUMN), Swasta (BUMS), dan Koperasi dalam sistem Demokrasi Ekonomi Pancasila adalah...",
    opts: ["Saling membunuh dan mematikan usaha satu sama lain dalam persaingan bebas", "Saling bekerja sama dan bersinergi harmonis di mana BUMN memegang sektor strategis, Swasta menggerakkan dinamika pasar, dan Koperasi memperkuat ekonomi rakyat", "BUMN harus menguasai seluruh warung kecil", "Swasta dilarang beroperasi di Indonesia", "Koperasi dibubarkan dan diganti menjadi BUMN"],
    c: "B",
    exp: "Tiga pilar ekonomi Indonesia (BUMN, BUMS, dan Koperasi) dirancang bersinergi harmonis saling menopang dalam sistem ekonomi kerakyatan."
  }
];

// ==========================================
// INDIKATOR E: SOAL 161 s.d. 200
// ==========================================
const indE_topics = [
  {
    q: "Kabupaten OKU Timur secara luas dikenal di tingkat provinsi Sumatera Selatan dan nasional dengan julukan utama sebagai...",
    opts: ["Kota Tambang Batubara Terbesar", "Lumbung Padi dan Sentra Pangan Sumatera Selatan", "Kota Industri Tekstil Modern", "Kawasan Wisata Bahari Kepulauan", "Pusat Kilang Minyak Lepas Pantai"],
    c: "B",
    exp: "OKU Timur adalah lumbung pangan utama Sumsel dengan surplus produksi beras ratusan ribu ton per tahun yang menyuplai berbagai provinsi."
  },
  {
    q: "Keberhasilan sektor pertanian padi sawah di kawasan Belitang tidak terlepas dari keberadaan sistem irigasi teknis yang bersumber dari aliran sungai...",
    opts: ["Sungai Musi", "Sungai Komering (Jaringan Irigasi Upper Komering)", "Sungai Ogan", "Sungai Lematang", "Sungai Batanghari"],
    c: "B",
    exp: "Sistem irigasi teknis Belitang bersumber dari Bendung Perjaya di Sungai Komering yang mengairi puluhan ribu hektare sawah teknis."
  },
  {
    q: "Dalam penamaan saluran irigasi di Belitang, kode 'BK' yang sangat familiar bagi warga masyarakat setempat (seperti BK 0, BK 9, BK 16) merupakan singkatan dari...",
    opts: ["Belitang Kulon", "Bendung Komering / Bangunan Komering", "Batas Kecamatan", "Bumi Kencana", "Banjir Kanal"],
    c: "B",
    exp: "Kode 'BK' adalah singkatan teknis dari Bangunan Komering / Saluran Sekunder Belitang yang menandai titik pintu bagi air irigasi."
  },
  {
    q: "Dengan adanya jaringan irigasi teknis yang teratur, pola indeks pertanaman (IP) padi di sawah irigasi Belitang dapat mencapai...",
    opts: ["IP 100 (Hanya panen 1 kali setahun)", "IP 200 hingga IP 300 (Dapat panen 2 sampai 3 kali dalam satu tahun)", "Hanya mengandalkan musim hujan (tadah hujan)", "Tidak bisa ditanami padi sawah", "Panen sekali setiap 3 tahun"],
    c: "B",
    exp: "Irigasi teknis memungkinkan petani menanam padi 2 kali (IP 200) bahkan hingga 3 kali (IP 300) setahun diselingi palawija."
  },
  {
    q: "Selain tanaman pangan padi, komoditas perkebunan rakyat yang menjadi sumber penghasilan utama warga di kawasan non-irigasi OKU Timur adalah...",
    opts: ["Karet alam dan Kelapa Sawit", "Cengkeh dan Pala", "Apel dan Stroberi", "Tembakau dan Gandum", "Kopi Robusta dataran tinggi"],
    c: "A",
    exp: "Perkebunan rakyat di OKU Timur didominasi oleh karet alam dan kelapa sawit yang menjadi penopang pendapatan di luar sentra sawah padi."
  },
  {
    q: "Kecamatan di Kabupaten OKU Timur yang menjadi pusat perdagangan grosir, perbankan, dan denyut nadi ekonomi paling ramai di Belitang adalah...",
    opts: ["Kecamatan Martapura", "Kecamatan Belitang (Kawasan Pasar Gumawang)", "Kecamatan Cempaka", "Kecamatan Semendawai Suku III", "Kecamatan Jayapura"],
    c: "B",
    exp: "Pasar Gumawang di Kecamatan Belitang adalah pusat perniagaan, jasa keuangan, dan distribusi barang terbesar bagi kawasan Belitang raya."
  },
  {
    q: "Potensi sektor peternakan yang berkembang pesat dan menjadi komoditas unggulan di OKU Timur hingga menyuplai kebutuhan luar daerah adalah...",
    opts: ["Peternakan unta", "Peternakan Sapi Potong (penggemukan dan pembibitan)", "Peternakan kuda pacu", "Peternakan burung unta", "Peternakan babi hutan"],
    c: "B",
    exp: "OKU Timur merupakan salah satu sentra populasi sapi potong terbesar di Sumsel dengan sistem integrasi sapi-sawit dan pakan jerami fermentasi."
  },
  {
    q: "Di sektor perikanan air tawar, komoditas ikan budidaya yang banyak dikembangkan di kolam-kolam air tenang warga OKU Timur adalah...",
    opts: ["Ikan Salmon dan Tuna", "Ikan Patin, Lele, dan Nila", "Ikan Kerapu dan Kakap Merah", "Ikan Bandeng air payau", "Ikan Hiu martil"],
    c: "B",
    exp: "Ikan patin, lele, dan nila adalah komoditas perikanan air tawar unggulan di OKU Timur yang dibudidayakan di kolam air tenang dan bioflok."
  },
  {
    q: "Keberadaan Rice Milling Unit (RMU) modern skala besar di Belitang memberikan nilai tambah bagi ekonomi lokal karena...",
    opts: ["Membuat beras menjadi cepat busuk", "Meningkatkan kualitas beras giling menjadi mutu premium/medium kemasan dan menyerap tenaga kerja lokal", "Mencegah beras dijual ke luar Belitang", "Menurunkan harga jual gabah petani", "Menghilangkan limbah sekam secara instan"],
    c: "B",
    exp: "RMU modern mengolah gabah menjadi beras kemasan standar premium/medium yang memiliki harga jual lebih tinggi dan daya simpan lebih tahan lama."
  },
  {
    q: "Layanan perbankan tanpa kantor (Branchless Banking) seperti Agen BRILink, Agen Mandiri, dan BSI Smart yang menjamur di desa-desa OKU Timur berperan penting dalam...",
    opts: ["Menyulitkan warga desa saat ingin mentransfer uang", "Memudahkan warga desa melakukan transaksi setor tunai, tarik tunai, transfer, dan pembayaran tagihan tanpa perlu jauh-jauh ke kota kecamatan", "Menggantikan peran pasar tradisional secara paksa", "Mewajibkan warga membayar sewa toko bulanan", "Menolak peredaran uang Rupiah"],
    c: "B",
    exp: "Agen bank di desa mendekatkan akses keuangan, memangkas ongkos transportasi warga ke kota kecamatan, dan meningkatkan perputaran uang di desa."
  },
  {
    q: "Salah satu tantangan utama yang kerap dihadapi petani padi di OKU Timur pada saat puncak Panen Raya adalah...",
    opts: ["Harga gabah melonjak terlalu tinggi tidak terjangkau", "Penurunan harga gabah di tingkat petani (anjlok) akibat melimpahnya pasokan dan keterbatasan kapasitas pengeringan saat musim hujan", "Kekurangan benih padi di kios resmi", "Dilarang memanen padi oleh pemerintah", "Tidak ada pembeli yang datang"],
    c: "B",
    exp: "Saat panen raya serentak, pasokan gabah membludak sehingga harga di tingkat petani rentan jatuh jika tidak didukung pengering (dryer) dan serapan Bulog."
  },
  {
    q: "Pemanfaatan jerami sisa panen padi di OKU Timur untuk pakan ternak sapi dan pembuatan pupuk kompos merupakan contoh penerapan prinsip...",
    opts: ["Perekonomian linier buang sekali pakai", "Ekonomi Sirkular (Circular Economy) dan integrasi tanaman-ternak ramah lingkungan", "Eksploitasi lahan secara berlebihan", "Pertanian monokultur tertutup", "Pemborosan sumber daya lokal"],
    c: "B",
    exp: "Ekonomi sirkular memanfaatkan limbah jerami pertanian menjadi pakan sapi, kotoran sapi menjadi biogas/pupuk organik sawah tanpa terbuang percuma."
  },
  {
    q: "Produk olahan pangan khas lokal berbasis hasil panen pertanian yang banyak diproduksi oleh UMKM rumahan di Belitang antara lain...",
    opts: ["Keripik pisang, sale pisang, rengginang beras ketan, dan kerupuk beras", "Cokelat batang Swiss", "Keju cheddar impor", "Kue pie apel impor", "Kurma madu"],
    c: "A",
    exp: "Hilirisasi pangan lokal Belitang melahirkan UMKM rengginang ketan, keripik pisang, sale pisang, dan aneka camilan berbasis panen setempat."
  },
  {
    q: "Pusat pemerintahan Kabupaten OKU Timur (kantor Bupati dan instansi dinas daerah) berlokasi di kecamatan...",
    opts: ["Kecamatan Belitang", "Kecamatan Martapura", "Kecamatan Buay Madang", "Kecamatan Madang Suku I", "Kecamatan Belitang Madang Raya"],
    c: "B",
    exp: "Kecamatan Martapura adalah ibu kota dan pusat administrasi pemerintahan resmi Kabupaten Ogan Komering Ulu Timur (OKU Timur)."
  },
  {
    q: "Peran jalur transportasi Jalan Lintas Tengah Sumatera dan jalur kereta api yang melintasi Martapura bagi perekonomian OKU Timur adalah...",
    opts: ["Hanya sebagai jalur penyeberangan pejalan kaki", "Memperlancar arus logistik komoditas pertanian dan barang niaga menuju Palembang, Lampung, dan Pulau Jawa", "Menghambat pergerakan pedagang antar-provinsi", "Menaikkan tarif distribusi sembako", "Mengisolasi desa-desa di pedalaman"],
    c: "B",
    exp: "Konektivitas jalan lintas dan stasiun kereta api Martapura mempermudah pengiriman hasil bumi dan mobilitas penumpang ke sentra ekonomi luar daerah."
  },
  {
    q: "Koperasi Unit Desa (KUD) di OKU Timur dapat membantu petani anggotanya dari permainan harga tengkulak dengan cara...",
    opts: ["Menolak membeli hasil panen anggota", "Menampung hasil panen gabah anggota dengan harga acuan pemerintah (HAP/HPP) yang adil dan transparan", "Meminjamkan uang dengan bunga harian", "Menutup akses jalan menuju sawah", "Menjual gabah ke luar negeri tanpa izin"],
    c: "B",
    exp: "Koperasi menjadi penstabil harga (buffer stock) yang membeli gabah petani sesuai harga acuan resmi sehingga petani terhindar dari pemerasan harga calo."
  },
  {
    q: "Keberadaan BUMDes di desa-desa OKU Timur yang mengelola unit usaha air bersih perdesaan (PAMSIMAS) dan sewa tenda pernikahan berkontribusi nyata dalam...",
    opts: ["Menciptakan perselisihan antar-warga desa", "Meningkatkan Pendapatan Asli Desa (PADesa), membuka lapangan kerja pemuda desa, dan memenuhi kebutuhan fasilitas warga", "Mengharuskan warga membayar upeti kepada perangkat desa", "Menghentikan dana transfer desa dari pusat", "Menjual aset tanah desa kepada swasta"],
    c: "B",
    exp: "BUMDes berorientasi ganda: memfasilitasi kebutuhan air/jasa warga sekaligus mencetak laba bersih yang disetor ke kas desa (PADesa)."
  },
  {
    q: "Hama tanaman padi yang sering menjadi ancaman serius bagi petani sawah di OKU Timur jika tidak dikendalikan secara terpadu adalah...",
    opts: ["Hama wereng batang coklat dan tikus sawah", "Hama kepiting laut", "Hama ulat sutera", "Hama lalat buah apel", "Hama rayap kayu jati"],
    c: "A",
    exp: "Wereng batang coklat (WBC) dan tikus sawah adalah dua organisme pengganggu tanaman (OPT) utama yang sering mengancam produktivitas padi sawah."
  },
  {
    q: "Peluang wirausaha digital (agripreneur) yang sangat prospektif bagi generasi muda di OKU Timur adalah...",
    opts: ["Menjadi penonton pasif saat panen raya tiba", "Membangun platform pemasaran beras organik lokal secara daring, jasa sewa drone semprot pertanian, dan konten kreator edukasi agribisnis", "Meninggalkan desa dan menganggur di kota besar", "Menjual pupuk subsidi di atas harga eceran tertinggi", "Menolak pemanfaatan internet di pedesaan"],
    c: "B",
    exp: "Generasi muda dapat memanfaatkan teknologi: pemasaran beras online langsung ke konsumen, jasa mekanisasi drone semprot pupuk, dan hilirisasi pangan."
  },
  {
    q: "Dalam manajemen keuangan usaha tani padi di Belitang, yang tergolong sebagai modal kerja musiman (biaya operasional per musim tanam) adalah...",
    opts: ["Biaya pembelian traktor roda empat", "Biaya pembuatan sertifikat tanah sawah", "Biaya pembelian benih, pupuk, obat hama, dan upah tenaga kerja tanam/panen", "Biaya pembangunan gedung rumah tinggal", "Pajak bumi dan bangunan tahunan"],
    c: "C",
    exp: "Modal kerja per musim tanam habis dalam satu siklus budidaya: benih, pupuk, pestisida, dan upah olah tanah/tanam/panen."
  },
  {
    q: "Keunggulan komparatif komoditas beras asal Belitang di pasaran dibandingkan beras dari daerah lain adalah...",
    opts: ["Tekstur nasi yang pulen, aroma alami yang wangi, dan jaminan pasokan yang melimpah", "Harganya selalu paling mahal sedunia", "Berasnya berwarna hitam pekat dan berbau apek", "Hanya bisa dimasak dengan tungku kayu kuno", "Beras tidak bisa dikonsumsi oleh anak-anak"],
    c: "A",
    exp: "Beras Belitang dikenal luas di Sumsel dan Lampung karena kualitas rasa yang pulen, putih bersih, dan ketersediaan stok yang stabil."
  },
  {
    q: "Peranan perempuan pedesaan dalam menopang ekonomi keluarga di OKU Timur sangat nyata, antara lain terlihat pada aktivitas...",
    opts: ["Menghalangi suami bekerja di ladang", "Keterlibatan dalam buruh tanam padi (tandur), pengolahan UMKM keripik rumahan, dan pengelolaan warung kelontong", "Hanya berdiam diri tanpa aktivitas produktif", "Melarang anak menuntut ilmu ke sekolah", "Menolak penggunaan uang rupiah di pasar"],
    c: "B",
    exp: "Perempuan pedesaan berkontribusi besar dalam penanaman padi (tandur), penyiangan, industri rumahan pangan, dan pengelolaan warung belanja keluarga."
  },
  {
    q: "Fasilitas perbankan yang memberikan kredit dengan subsidi bunga dari pemerintah untuk membantu permodalan petani dan UMKM di Belitang disebut...",
    opts: ["Kredit Konsumtif Tanpa Agunan", "Kredit Usaha Rakyat (KUR)", "Pinjaman Online Fintech Ilegal", "Kredit Valas Luar Negeri", "Pinjaman Rentenir Keliling"],
    c: "B",
    exp: "KUR (Kredit Usaha Rakyat) adalah program pembiayaan modal kerja/investasi pemerintah bersubsidi bunga untuk UMKM dan petani produktif."
  },
  {
    q: "Tindakan membakar jerami sisa panen padi di sawah secara sembarangan sangat tidak dianjurkan karena berdampak buruk terhadap...",
    opts: ["Membuat tanah sawah menjadi sangat subur seketika", "Mematikan mikroorganisme tanah yang bermanfaat, memicu polusi kabut asap di jalan desa, dan membuang potensi bahan pupuk organik", "Meningkatkan kandungan air dalam tanah", "Mempercepat pertumbuhan bibit padi berikutnya", "Membuat udara desa menjadi sejuk"],
    c: "B",
    exp: "Pembakaran jerami merusak struktur hara mikroorganisme tanah, mencemari udara, dan memboroskan biomassa yang harusnya dikembalikan ke tanah."
  },
  {
    q: "Pemanfaatan sistem pembayaran QRIS pada lapak pedagang sayur dan sembako di pasar Belitang membuktikan bahwa...",
    opts: ["Digitalisasi keuangan hanya cocok untuk mal mewah di kota metropolitan", "Masyarakat dan UMKM di tingkat pedesaan OKU Timur semakin melek teknologi finansial (fintech) dan siap bertransaksi modern", "Pedagang tradisional menolak sistem perbankan", "Uang tunai dilarang beredar di seluruh wilayah OKU Timur", "Koneksi internet di OKU Timur sudah tidak diperlukan lagi"],
    c: "B",
    exp: "Penggunaan QRIS di pasar rakyat membuktikan inklusi keuangan dan adaptasi digital telah merambah UMKM pedesaan secara nyata."
  },
  {
    q: "Lembaga penyedia bibit unggul, pupuk, dan penyuluhan pertanian yang mendampingi kelompok tani di tingkat kecamatan di OKU Timur adalah...",
    opts: ["Balai Penyuluhan Pertanian (BPP) Dinas Pertanian", "Kantor Urusan Agama", "Dinas Perhubungan Laut", "Kantor Pajak Pratama Luar Negeri", "Pengadilan Tata Usaha Negara"],
    c: "A",
    exp: "BPP (Balai Penyuluhan Pertanian) di kecamatan mendampingi petani terkait teknologi budidaya, hama penyakit, dan tata kelola kelompok tani."
  },
  {
    q: "Konsep 'Hilirisasi Pertanian' (Agro-industry Downstreaming) di OKU Timur bertujuan untuk...",
    opts: ["Menjual gabah basah langsung secepatnya tanpa diolah", "Mengolah komoditas mentah hasil panen menjadi produk olahan bernilai ekonomi lebih tinggi sebelum dipasarkan ke konsumen akhir", "Menghentikan seluruh aktivitas bercocok tanam", "Mengimpor beras dari luar negeri sebanyak-banyaknya", "Menurunkan harga jual produk lokal"],
    c: "B",
    exp: "Hilirisasi meningkatkan nilai tambah komoditas di dalam daerah (misal gabah jadi beras premium, jagung jadi pakan ternak, pisang jadi keripik)."
  },
  {
    q: "Kelompok Tani (Poktan) dan Gabungan Kelompok Tani (Gapoktan) di desa-desa Belitang memiliki fungsi ekonomi strategis sebagai...",
    opts: ["Tempat berkumpul tanpa tujuan yang jelas", "Wadah kerja sama pengelolaan air irigasi, pengajuan alokasi pupuk bersubsidi, dan pengorganisasian panen serentak", "Badan hukum yang berhak mencetak uang", "Lembaga penegak hukum peradilan desa", "Panitia pemilihan lurah"],
    c: "B",
    exp: "Poktan dan Gapoktan mengorganisasi petani dalam jadwal tanam serentak, pembagian air irigasi, dan usulan e-RDKK pupuk subsidi."
  },
  {
    q: "Sebuah keluarga petani di Belitang mengalokasikan hasil panen padinya: 60% dijual untuk biaya operasional dan sekolah anak, 30% disimpan di lumbung untuk makan 6 bulan ke depan, dan 10% untuk zakat serta dana darurat. Pola alokasi ini mencerminkan...",
    opts: ["Ketidakmampuan mengatur masa depan", "Manajemen keuangan pertanian yang bijak, seimbang antara kebutuhan produktif, ketahanan pangan keluarga, dan tanggung jawab sosial", "Pola hidup konsumtif yang berlebihan", "Pelanggaran aturan kelompok tani", "Tindakan spekulasi harga pasar"],
    c: "B",
    exp: "Pola pembagian ini mencerminkan kearifan lokal yang cerdas: menjaga likuiditas tunai, mengamankan pangan keluarga, dan mitigasi risiko."
  },
  {
    q: "Sektor pariwisata edukasi pertanian (Agrowisata) yang potensial dikembangkan di Belitang berbasis potensi lokal adalah...",
    opts: ["Wisata selancar ombak tsunami", "Wisata edukasi petik buah melon/semangka, budidaya ikan patin, dan pengenalan mekanisasi panen padi bagi pelajar", "Wisata ski salju musim dingin", "Wisata safari gurun pasir", "Wisata kapal selam samudra"],
    c: "B",
    exp: "Agrowisata sawah, petik buah hortikultura, dan edukasi mina-padi sangat relevan dengan keunggulan bentang alam agraris OKU Timur."
  },
  {
    q: "Keberadaan pabrik pupuk organik berbahan baku kotoran sapi dan sekam padi di OKU Timur dapat memberikan solusi atas permasalahan...",
    opts: ["Kelangkaan pupuk kimia dan mahalnya biaya pemupukan tanaman petani", "Kurangnya pasokan air irigasi di musim kemarau", "Kekurangan tenaga kerja pemanen padi", "Tingginya tarif angkutan kereta api", "Macetnya jalan raya perkotaan"],
    c: "A",
    exp: "Pupuk organik lokal mengurangi ketergantungan pada pupuk kimia bersubsidi, memperbaiki struktur biologi tanah, dan menekan biaya produksi petani."
  },
  {
    q: "Persebaran geografis kecamatan di OKU Timur yang berbatasan langsung dengan Provinsi Lampung (seperti Martapura dan Way Tuba) memberikan keuntungan ekonomi berupa...",
    opts: ["Mudahnya penyelundupan barang terlarang", "Posisi strategis sebagai pintu gerbang transit arus barang dan orang antar-provinsi Sumsel dan Lampung", "Rawan terjadi pemadaman listrik berkepanjangan", "Warga dilarang berbelanja ke luar desa", "Mata uang yang digunakan bukan Rupiah"],
    c: "B",
    exp: "Letak perbatasan strategis menjadikan kawasan tersebut simpul transit perdagangan dan jasa logistik lintas provinsi Sumsel–Lampung."
  },
  {
    q: "Dalam perencanaan investasi alat mesin pertanian (Alsintan) seperti mesin Combine Harvester (mesin pemanen padi terpadu), hal utama yang harus dihitung adalah...",
    opts: ["Warna cat bodi mesin agar menarik perhatian tetangga", "Perhitungan Break Even Point (titik impas balik modal), biaya bahan bakar, biaya perawatan rutin, dan tarif sewa per hektare sawah", "Berapa banyak orang yang bisa diajak berfoto di atas mesin", "Kecepatan mesin melaju di jalan tol", "Nama merek mesin buatan luar negeri"],
    c: "B",
    exp: "Investasi alsintan bernilai ratusan juta rupiah menuntut analisis finansial: BEP, biaya penyusutan, solar, suku cadang, dan luas lahan garapan."
  },
  {
    q: "Limbah dedak padi hasil pemisahan kulit gabah di penggilingan padi Belitang memiliki nilai ekonomi tinggi karena menjadi bahan baku utama pembuatan...",
    opts: ["Bahan bangunan beton bertulang", "Pakan konsentrat ternak unggas (ayam/bebek) dan pakan ikan air tawar", "Bahan bakar roket antariksa", "Minyak wangi sintetis", "Kertas cetak uang"],
    c: "B",
    exp: "Dedak/bekatul padi kaya nutrisi dan karbohidrat sehingga menjadi komoditas pakan utama bagi industri peternakan ayam, bebek, dan ikan."
  },
  {
    q: "Sikap mental wirausaha yang harus dimiliki pelajar OKU Timur agar mampu memajukan ekonomi daerah kelahirannya di masa depan adalah...",
    opts: ["Selalu mengeluh dan menunggu bantuan cuma-cuma dari pemerintah", "Kreatif, ulet, melek literasi teknologi dan finansial, serta bangga mengembangkan potensi agraris lokal menjadi produk unggulan berdaya saing", "Merasa rendah diri karena tinggal di daerah kabupaten agraris", "Menolak belajar teknologi modern", "Menjual seluruh tanah warisan untuk membeli gaya hidup konsumtif"],
    c: "B",
    exp: "Masa depan ketahanan pangan dan ekonomi OKU Timur bergantung pada pemuda yang kreatif, tangguh, adaptif digital, dan bangga pada potensi lokalnya."
  },
  {
    q: "Dampak positif dari adanya program sertifikasi tanah gratis (PTSL) dari pemerintah bagi para petani pemilik sawah di Belitang adalah...",
    opts: ["Tanah petani disita oleh kantor pertanahan", "Petani memiliki kepastian hukum atas hak milik tanahnya dan sertifikat dapat menjadi agunan resmi yang sah untuk mengakses modal perbankan", "Petani tidak boleh lagi menjual beras ke pasar", "Pajak tanah naik seratus kali lipat", "Sawah petani wajib diserahkan kepada pihak asing"],
    c: "B",
    exp: "Sertifikat tanah memberi kepastian hukum kepemilikan dan dapat dijaminkan ke bank resmi untuk mendapatkan modal kerja produktif berbunga rendah."
  },
  {
    q: "Salah satu indikator keberhasilan pembangunan ekonomi inklusif di Kabupaten OKU Timur adalah...",
    opts: ["Hanya sedikit pejabat yang bertambah kaya raya", "Menurunnya angka kemiskinan, meningkatnya pendapatan riil petani, dan meratanya akses fasilitas pendidikan, kesehatan, dan perbankan di seluruh kecamatan", "Seluruh sawah diubah menjadi perumahan mewah", "Masyarakat dilarang membentuk kelompok tani", "Menutup akses pedagang luar daerah masuk ke Belitang"],
    c: "B",
    exp: "Pertumbuhan inklusif ditandai dengan penurunan kemiskinan dan pemerataan kesejahteraan yang dirasakan langsung oleh petani dan warga perdesaan."
  },
  {
    q: "Fungsi utama pasar lelang komoditas karet (Bokar - Bahan Olah Karet) yang dikelola kelompok tani di OKU Timur adalah...",
    opts: ["Membuat petani karet saling bermusuhan", "Memotong perantara tengkulak sehingga petani memperoleh harga lelang karet yang transparan, kompetitif, dan mutu karet terjaga", "Menyimpan karet hingga rusak di gudang", "Melarang pabrik ban membeli karet lokal", "Menetapkan harga karet secara sepihak tanpa musyawarah"],
    c: "B",
    exp: "Pasar lelang UPPB (Unit Pengolahan dan Pemasaran Bokar) memberi kepastian timbangan jujur dan harga jual lebih tinggi bagi petani karet."
  },
  {
    q: "Korelasi antara pembangunan infrastruktur jalan cor beton antar-desa di OKU Timur dengan efisiensi biaya ekonomi petani adalah...",
    opts: ["Membuat biaya angkut hasil panen makin mahal", "Mempercepat waktu tempuh pengangkutan gabah dari sawah ke penggilingan dan menekan ongkos angkut logistik secara signifikan", "Menyebabkan kendaraan pengangkut gabah cepat rusak", "Mendorong petani pindah profesi", "Tidak ada pengaruhnya terhadap biaya ekonomi"],
    c: "B",
    exp: "Jalan desa yang mulus memperlancar truk/motor pengangkut gabah, menurunkan biaya perawatan kendaraan, dan menekan ongkos angkut panen."
  },
  {
    q: "Sebagai generasi penerus di SMAN 1 Belitang, kontribusi nyata yang dapat Anda lakukan saat ini untuk mendukung ketahanan pangan dan ekonomi OKU Timur adalah...",
    opts: ["Membeli beras impor dari luar negeri", "Belajar sungguh-sungguh menguasai sains, teknologi, dan literasi finansial FINCESTEM agar kelak mampu memajukan ekosistem pertanian lokal dengan inovasi modern", "Membiarkan lahan pekarangan rumah terbengkalai dipenuhi semak belukar", "Menyepelekan profesi mulia petani", "Mengabaikan kegiatan kokurikuler riset lapangan"],
    c: "B",
    exp: "Belajar tekun dalam program FINCESTEM membekali siswa dengan kompetensi sains, teknologi, rekayasa, dan literasi finansial untuk membangun OKU Timur."
  }
];

// GABUNGKAN SELURUH DATA BUTIR SOAL
let idCounter = 1;

// Indikator A (1 - 40)
indA_topics.forEach((item, idx) => {
  questions.push({
    id: idCounter++,
    day: 1,
    indicatorCode: 'A',
    indicatorKey: 'ind_kegiatan_ekonomi',
    indicatorName: 'Kegiatan Ekonomi & 3 Sektor Aktivitas',
    numberInIndicator: idx + 1,
    question: item.q,
    options: [
      { key: 'A', text: item.opts[0] },
      { key: 'B', text: item.opts[1] },
      { key: 'C', text: item.opts[2] },
      { key: 'D', text: item.opts[3] },
      { key: 'E', text: item.opts[4] }
    ],
    correct: item.c,
    explanation: item.exp
  });
});

// Indikator B (41 - 80)
indB_topics.forEach((item, idx) => {
  questions.push({
    id: idCounter++,
    day: 1,
    indicatorCode: 'B',
    indicatorKey: 'ind_literasi_finansial',
    indicatorName: 'Literasi & Pengelolaan Keuangan',
    numberInIndicator: idx + 1,
    question: item.q,
    options: [
      { key: 'A', text: item.opts[0] },
      { key: 'B', text: item.opts[1] },
      { key: 'C', text: item.opts[2] },
      { key: 'D', text: item.opts[3] },
      { key: 'E', text: item.opts[4] }
    ],
    correct: item.c,
    explanation: item.exp
  });
});

// Indikator C (81 - 120)
indC_topics.forEach((item, idx) => {
  questions.push({
    id: idCounter++,
    day: 1,
    indicatorCode: 'C',
    indicatorKey: 'ind_kebanksentralan',
    indicatorName: 'Kebanksentralan & Bank Indonesia',
    numberInIndicator: idx + 1,
    question: item.q,
    options: [
      { key: 'A', text: item.opts[0] },
      { key: 'B', text: item.opts[1] },
      { key: 'C', text: item.opts[2] },
      { key: 'D', text: item.opts[3] },
      { key: 'E', text: item.opts[4] }
    ],
    correct: item.c,
    explanation: item.exp
  });
});

// Indikator D (121 - 160)
indD_topics.forEach((item, idx) => {
  questions.push({
    id: idCounter++,
    day: 1,
    indicatorCode: 'D',
    indicatorKey: 'ind_badan_usaha_koperasi',
    indicatorName: 'Badan Usaha & Koperasi Indonesia',
    numberInIndicator: idx + 1,
    question: item.q,
    options: [
      { key: 'A', text: item.opts[0] },
      { key: 'B', text: item.opts[1] },
      { key: 'C', text: item.opts[2] },
      { key: 'D', text: item.opts[3] },
      { key: 'E', text: item.opts[4] }
    ],
    correct: item.c,
    explanation: item.exp
  });
});

// Indikator E (161 - 200)
indE_topics.forEach((item, idx) => {
  questions.push({
    id: idCounter++,
    day: 1,
    indicatorCode: 'E',
    indicatorKey: 'ind_potensi_oku_timur',
    indicatorName: 'Potensi Sektor Ekonomi OKU Timur',
    numberInIndicator: idx + 1,
    question: item.q,
    options: [
      { key: 'A', text: item.opts[0] },
      { key: 'B', text: item.opts[1] },
      { key: 'C', text: item.opts[2] },
      { key: 'D', text: item.opts[3] },
      { key: 'E', text: item.opts[4] }
    ],
    correct: item.c,
    explanation: item.exp
  });
});

console.log(`Berhasil menyusun ${questions.length} soal lengkap!`);
console.log(`Indikator A: ${questions.filter(q => q.indicatorCode === 'A').length} soal`);
console.log(`Indikator B: ${questions.filter(q => q.indicatorCode === 'B').length} soal`);
console.log(`Indikator C: ${questions.filter(q => q.indicatorCode === 'C').length} soal`);
console.log(`Indikator D: ${questions.filter(q => q.indicatorCode === 'D').length} soal`);
console.log(`Indikator E: ${questions.filter(q => q.indicatorCode === 'E').length} soal`);

// Susun isi berkas JS
const fileContent = `/**
 * FINCESTEM 2026 - Bank Soal Digital Asesmen Khusus Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur
 * Day 1: 200 Soal Pilihan Ganda (5 Indikator x 40 Soal)
 * Terkunci & Terisolasi Total (Bebas Konflik dengan Field Trip)
 * Versi: 20261029_nft_bs1
 */

(function(window) {
  'use strict';

  window.NFT_BANK_SOAL_INDICATORS = ${JSON.stringify(INDICATORS, null, 2)};

  window.NFT_BANK_SOAL_CONFIG = {
    totalQuestionsInBank: 200,
    questionsPerStudent: 50,
    questionsPerIndicator: 10,
    durationMinutes: 60,
    totalIndicators: 5
  };

  window.NFT_BANK_SOAL_DAYS = {
    1: ${JSON.stringify(questions, null, 2)}
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
`;

const outputPath = path.join(__dirname, '..', 'js', 'data', 'bank-soal-nonfieldtrip.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`File berhasil ditulis ke: ${outputPath}`);
