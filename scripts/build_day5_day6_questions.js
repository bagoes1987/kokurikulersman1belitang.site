// FinCESTem 2026 - Generator Soal Day 5 & Day 6 Non-Field Trip
// Day 5: 10 Soal PG per Sektor (Sains & Teknologi) x 7 Sektor = 70 Soal
// Day 6: 10 Soal PG per Sektor (Rekayasa & Matematika Finansial) x 7 Sektor = 70 Soal

const fs = require('fs');
const path = require('path');

const SECTORS = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'industri', 'perdagangan', 'formal'];

// 1. DATA SOAL DAY 5 (SAINS & TEKNOLOGI)
const DAY5_DATA = {
  pertanian: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video mengenai sains tanah sawah irigasi di Belitang, mengapa lapisan lumpur olah (puddle layer) yang kedap air sangat krusial bagi pertumbuhan padi sawah?',
      options: [
        { key: 'A', text: 'Mencegah perkolasi air yang berlebihan ke lapisan tanah bawah sehingga genangan air dan nutrisi pupuk tetap terjaga di zona perakaran' },
        { key: 'B', text: 'Membuat tanah menjadi kering dan retak-retak sehingga akar padi dapat menyerap udara secara maksimal' },
        { key: 'C', text: 'Memudahkan bulir gabah yang jatuh agar dapat tenggelam ke dalam tanah dan tumbuh menjadi bibit baru' },
        { key: 'D', text: 'Menaikkan suhu tanah hingga di atas 50 derajat Celcius guna mematikan seluruh mikroorganisme alami' },
        { key: 'E', text: 'Mencegah cacing tanah bergerak bebas agar tidak memakan pupuk urea yang ditebar petani' }
      ],
      correct: 'A',
      explanation: 'Lapisan kedap (hardpan/puddle layer) menahan air agar tidak hilang merembes ke bawah, menjaga kondisi jenuh air yang diperlukan padi sawah.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Siswa menjelaskan bahwa air irigasi yang bersumber dari Sungai Komering melalui saluran sekunder BK kaya akan sedimen lumpur aluvial. Dampak sains positif dari lumpur aluvial tersebut adalah...',
      options: [
        { key: 'A', text: 'Membawa mineral alami hasil pelapukan batuan vulkanik dari hulu yang memperkaya unsur hara tanah sawah' },
        { key: 'B', text: 'Menghilangkan kebutuhan tanaman padi terhadap sinar matahari untuk proses fotosintesis' },
        { key: 'C', text: 'Mengubah rasa nasi menjadi asin secara alami tanpa perlu menambahkan garam saat memasak' },
        { key: 'D', text: 'Mempercepat umur panen padi dari 115 hari menjadi hanya 15 hari' },
        { key: 'E', text: 'Mensterilkan air sehingga tidak ada mikroorganisme atau ikan kecil yang dapat hidup di parit' }
      ],
      correct: 'A',
      explanation: 'Sedimen aluvial Sungai Komering membawa partikel mineral subur yang memperkaya kandungan lempung dan unsur hara tanah sawah Belitang.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Pada segmen sains nutrisi tanaman, siswa menerangkan peranan penting unsur Nitrogen (N) dari pupuk Urea bagi tanaman padi pada fase vegetatif (0–45 HST), yaitu...',
      options: [
        { key: 'A', text: 'Merangsang pembentukan klorofil daun, pertumbuhan anakan produktif, dan perbanyakan daun hijau' },
        { key: 'B', text: 'Mempercepat pengeringan bulir gabah saat siap dipanen di sawah' },
        { key: 'C', text: 'Mengeraskan kulit gabah agar tidak dapat digiling oleh mesin RMU' },
        { key: 'D', text: 'Mengusir burung pemakan padi secara biologis melalui bau yang dihasilkan' },
        { key: 'E', text: 'Mencegah air irigasi menguap ke udara saat cuaca panas' }
      ],
      correct: 'A',
      explanation: 'Unsur Nitrogen (Urea) memacu pembelahan sel vegetatif, pembentukan daun hijau berklorofil, dan jumlah anakan produktif.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Mengapa pada fase generatif (bunting hingga pengisian bulir), tanaman padi membutuhkan rasio unsur Fosfor (P) dan Kalium (K) yang lebih tinggi dibandingkan Nitrogen?',
      options: [
        { key: 'A', text: 'Kalium berperan mentranslokasikan karbohidrat hasil fotosintesis ke bulir padi serta memperkokoh dinding sel batang agar tidak mudah rebah' },
        { key: 'B', text: 'Kalium mengubah warna daun padi menjadi ungu gelap agar tidak disukai oleh serangga wereng' },
        { key: 'C', text: 'Fosfor membuat akar padi berhenti menyerap air sehingga tanah sawah cepat mengering' },
        { key: 'D', text: 'Kombinasi P dan K membuat tanaman padi tidak perlu disiram air irigasi selama 2 bulan' },
        { key: 'E', text: 'Unsur P dan K berfungsi sebagai pestisida kimia pembunuh tikus sawah' }
      ],
      correct: 'A',
      explanation: 'Kalium (K) memperkuat dinding sel tanaman agar tahan rebah dan mengangkut asimilat gula/pati ke bulir padi.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot mesin traktor roda dua (hand tractor) dengan implement singkal dan glebeg. Prinsip teknologi mekanik dari pengolahan tanah putar (rotari) adalah...',
      options: [
        { key: 'A', text: 'Memotong, membalik, dan mencacah gumpalan tanah serta jerami menjadi lumpur halus siap tanam dengan tenaga putar mesin diesel' },
        { key: 'B', text: 'Menyemprotkan air bertekanan tinggi untuk melubangi tanah sawah tanpa menyentuh tanah' },
        { key: 'C', text: 'Memancarkan gelombang elektromagnetik untuk membunuh biji gulma di dalam tanah' },
        { key: 'D', text: 'Menyedot tanah sawah ke dalam tangki lalu menyaringnya seperti vacuum cleaner' },
        { key: 'E', text: 'Membakar jerami di dalam tanah menggunakan api berbahan bakar solar secara tertutup' }
      ],
      correct: 'A',
      explanation: 'Pisau bajak putar (rotary blade) memotong dan membalik tanah menjadi lumpur homogen, mempermudah penanaman bibit.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada segmen teknologi panen modern, siswa menunjukkan keunggulan mesin Combine Harvester. Mesin ini mengintegrasikan tiga fungsi sekaligus dalam satu lintasan kerja, yaitu...',
      options: [
        { key: 'A', text: 'Memotong tegakan batang padi, merontokkan bulir gabah dari malai, dan membersihkan gabah dari kotoran jerami' },
        { key: 'B', text: 'Membajak sawah, menanam bibit padi, dan menyemprotkan pupuk cair' },
        { key: 'C', text: 'Memotong padi, menumbuk gabah menjadi beras putih, dan langsung mengemasnya ke karung bermerek' },
        { key: 'D', text: 'Menyerap air genangan sawah, membakar sekam padi, dan mendinginkan gabah' },
        { key: 'E', text: 'Memotong rumput tanggul sawah, mencuci pakaian petani, dan mengukur kadar pestisida' }
      ],
      correct: 'A',
      explanation: 'Combine harvester menggabungkan fungsi reaping (pemotongan), threshing (perontokan), dan winnowing/cleaning (pembersihan gabah).'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Saat mengulas alat semprot elektrik (battery sprayer), siswa menjelaskan mengapa nozzle (ujung semprot) tipe kipas datar (flat fan) lebih disukai untuk aplikasi herbisida dibanding nozzle kerucut (cone)?',
      options: [
        { key: 'A', text: 'Menghasilkan sebaran butiran droplet yang rata dan terarah ke permukaan tanah/gulma dengan risiko drift terbawa angin lebih rendah' },
        { key: 'B', text: 'Membuat cairan semprot keluar dalam bentuk uap panas bersuhu 100 derajat Celcius' },
        { key: 'C', text: 'Dapat menampung cairan semprot lebih banyak hingga 100 liter di dalam nosel' },
        { key: 'D', text: 'Mengubah racun kimia menjadi air mineral segar yang aman diminum seketika' },
        { key: 'E', text: 'Menghasilkan suara nyaring untuk menakut-nakuti hama tikus' }
      ],
      correct: 'A',
      explanation: 'Nozzle flat fan mendistribusikan semprotan berbentuk pita merata dengan ukuran droplet seragam yang efektif mengenai gulma sasaran.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menerangkan bahwa alat ukur kadar air gabah digital (grain moisture tester) digunakan sebelum gabah disimpan di gudang. Mengapa kadar air gabah harus berada di bawah 14%?',
      options: [
        { key: 'A', text: 'Mencegah pertumbuhan jamur Aspergillus flavus yang menghasilkan racun aflatoksin dan mencegah pembusukan serta panas tumpukan' },
        { key: 'B', text: 'Membuat gabah menjadi sangat ringan agar mudah ditiup angin masuk ke karung' },
        { key: 'C', text: 'Menghilangkan karbohidrat di dalam beras agar tidak manis' },
        { key: 'D', text: 'Membuat kulit sekam berubah warna menjadi keemasan mengkilap' },
        { key: 'E', text: 'Menghentikan proses respirasi sehingga beras berubah menjadi beras ketan' }
      ],
      correct: 'A',
      explanation: 'Kadar air maksimal 14% adalah standar aman penyimpanan pangan guna menekan respirasi biji dan mencegah kapang mikotoksin.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada menit 07:30–10:00 video siswa merangkum pengaruh teknologi terhadap sains pertanian. Kalimat kesimpulan siswa yang paling tepat dan berbobot ilmiah adalah...',
      options: [
        { key: 'A', text: 'Pemanfaatan traktor dan combine harvester berhasil menghemat waktu olah tanah dan panen, sementara pemahaman sains tanah dan nutrisi menjamin produktivitas padi Belitang mencapai 6–7 ton per hektar' },
        { key: 'B', text: 'Penggunaan mesin pertanian membuktikan bahwa petani tidak lagi membutuhkan air dan pupuk sama sekali untuk bercocok tanam' },
        { key: 'C', text: 'Teknologi pertanian di OKU Timur sebaiknya dihentikan karena membuat tanah sawah menjadi tidak subur lagi' },
        { key: 'D', text: 'Tanaman padi di Belitang dapat tumbuh subur murni karena doa tanpa memerlukan analisis sains unsur hara' },
        { key: 'E', text: 'Mesin panen modern menggantikan sinar matahari sebagai sumber energi fotosintesis tanaman' }
      ],
      correct: 'A',
      explanation: 'Kesimpulan komprehensif mengintegrasikan efisiensi mekanisasi alsintan dengan prinsip agronomis kesuburan tanah.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Dalam video presentasi mandiri tanpa wawancara, teknik visual yang paling efektif ditunjukkan siswa saat menerangkan sains bagian bulir padi dan teknologi mesin kerja adalah...',
      options: [
        { key: 'A', text: 'Menunjukkan close-up bulir padi di tangan sambil menjelaskan malai dan gabah, kemudian mengarahkan kamera ke alat kerja yang sedang diamati' },
        { key: 'B', text: 'Membaca teks panjang dari layar HP lain tanpa pernah melihat ke arah kamera atau objek' },
        { key: 'C', text: 'Memutar musik latar dengan volume maksimal sehingga suara penjelasan tertutup sepenuhnya' },
        { key: 'D', text: 'Merekam pemandangan langit kosong selama 10 menit penuh tanpa ada objek pertanian' },
        { key: 'E', text: 'Menyuruh orang lain berbicara sementara siswa hanya berdiri diam di samping traktor' }
      ],
      correct: 'A',
      explanation: 'Teknik demonstrasi langsung dengan sorotan visual close-up memperjelas penjelasan sains dan teknologi kepada penonton.'
    }
  ],

  perkebunan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains perkebunan karet di Belitang, siswa menerangkan bahwa getah karet (lateks) keluar paling lancar pada pukul 05.00–07.00 pagi. Faktor sains biologis yang mendasari fenomena ini adalah...',
      options: [
        { key: 'A', text: 'Tekanan turgor sel pembuluh lateks mencapai titik tertinggi pada pagi hari karena transpirasi daun masih rendah dan tanah masih lembap' },
        { key: 'B', text: 'Cahaya matahari pagi mengandung sinar gamma yang mencairkan getah di bawah kulit kayu' },
        { key: 'C', text: 'Pohon karet tidur di malam hari dan baru bangun ketika fajar menyingsing' },
        { key: 'D', text: 'Suhu dingin pagi hari membekukan kulit pohon sehingga pisau sadap menjadi lebih tajam' },
        { key: 'E', text: 'Kandungan oksigen di udara pagi mengubah getah karet menjadi cairan alkohol' }
      ],
      correct: 'A',
      explanation: 'Tekanan turgor jaringan tanaman maksimum pada pagi hari saat kehilangan air lewat daun minimal, menghasilkan aliran lateks optimal.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Pada komoditas kelapa sawit, siswa menjelaskan bahwa kematangan Tandan Buah Segar (TBS) ditandai dengan membrondolnya buah ke piringan. Prinsip sains biokimia di balik proses pematangan ini adalah...',
      options: [
        { key: 'A', text: 'Terbentuknya gas etilen alami yang memicu degradasi dinding sel tangkai buah dan akumulasi kadar asam lemak minyak (CPO) mencapai titik optimal' },
        { key: 'B', text: 'Buah sawit kehabisan air sehingga terlepas dari tandan karena mengering akibat panas' },
        { key: 'C', text: 'Semut merah menggigit tangkai buah sawit hingga putus dan jatuh ke tanah' },
        { key: 'D', text: 'Kadar klorofil daun sawit berubah menjadi minyak pelumas mesin secara spontan' },
        { key: 'E', text: 'Tekanan angin kencang merontokkan buah sawit yang masih muda' }
      ],
      correct: 'A',
      explanation: 'Hormon etilen mengatur pematangan buah klimakterik/sawit yang meningkatkan rendemen CPO optimal saat buah membrondol 3–5 butir.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa memperagakan proses pembekuan getah lateks menggunakan asam semut (asam format) dibanding tawas. Mengapa asam format menghasilkan lateks bermutu tinggi (Kadar Karet Kering/KKK tinggi)?',
      options: [
        { key: 'A', text: 'Menurunkan pH lateks hingga titik isoelektrik sehingga partikel karet menggumpal alami tanpa merusak elastisitas polimer poliisoprena' },
        { key: 'B', text: 'Menyerap air sebanyak mungkin ke dalam gumpalan getah agar bobot timbangan karet bertambah berat' },
        { key: 'C', text: 'Mengubah getah karet menjadi lempengan plastik keras yang tahan api' },
        { key: 'D', text: 'Membuat getah karet berbau harum seperti buah jeruk manis' },
        { key: 'E', text: 'Menghilangkan warna putih lateks menjadi transparan bening seperti kaca' }
      ],
      correct: 'A',
      explanation: 'Koagulasi pada titik isoelektrik menetralkan muatan negatif selaput protein partikel karet, menghasilkan bekuan karet kenyal dan bersih.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Pada perkebunan kelapa sawit rakyat di tanah podsolik merah kuning OKU Timur, pemberian pupuk Dolomit (kalsium magnesium) sangat diperlukan karena...',
      options: [
        { key: 'A', text: 'Menaikkan pH tanah yang masam, menetralkan keracunan aluminium, dan menyuplai Magnesium inti klorofil daun' },
        { key: 'B', text: 'Mengubah tanah liat merah menjadi pasir putih pantai yang gembur' },
        { key: 'C', text: 'Mencegah rumput liar tumbuh di seluruh areal perkebunan selamanya' },
        { key: 'D', text: 'Membuat buah sawit menghasilkan aroma vanila saat direbus' },
        { key: 'E', text: 'Menggantikan peran sinar matahari dalam memproduksi minyak kelapa sawit' }
      ],
      correct: 'A',
      explanation: 'Dolomit (CaMg(CO3)2) menaikkan pH tanah masam dan menyediakan unsur hara Mg untuk fotosintesis tanaman sawit.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot pisau sadap karet tipe dorong dan tarik. Aspek teknologi sudut kemiringan sayatan sadap yang ideal adalah 30–40 derajat ke arah kanan bawah. Alasan teknisnya adalah...',
      options: [
        { key: 'A', text: 'Memotong pembuluh lateks yang tersusun spiral miring ke kiri atas secara tegak lurus sehingga lateks mengalir lancar menuju talang getah' },
        { key: 'B', text: 'Membuat goresan artistik seperti kaligrafi pada batang pohon karet' },
        { key: 'C', text: 'Mencegah semut berjalan menaiki batang pohon karet' },
        { key: 'D', text: 'Menghemat tenaga petani sadap agar pisau tidak perlu diasah' },
        { key: 'E', text: 'Mempercepat pengelupasan seluruh kulit kayu sampai ke inti kayu putih' }
      ],
      correct: 'A',
      explanation: 'Pembuluh lateks mengarah miring 3,7 derajat ke kanan atas; irisan sadap miring 30–40 derajat dari kiri atas ke kanan bawah memotong pembuluh terbanyak.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada panen kelapa sawit tinggi (di atas 5 meter), petani menggunakan galah teleskopik berbahan aluminium alloy berujung pisau Egrek sabit. Keunggulan material teknologi ini adalah...',
      options: [
        { key: 'A', text: 'Bobot sangat ringan namun memiliki modulus elastisitas tinggi dan kaku sehingga presisi saat memotong tangkai TBS di ketinggian' },
        { key: 'B', text: 'Dapat menarik petir untuk mematangkan buah sawit lebih cepat' },
        { key: 'C', text: 'Galah dapat memanjang sendiri secara otomatis menggunakan sensor sonar' },
        { key: 'D', text: 'Membuat buah sawit yang dipotong tidak jatuh ke tanah melainkan melayang di udara' },
        { key: 'E', text: 'Galah aluminium kebal terhadap karat air asam dan tidak perlu dibersihkan' }
      ],
      correct: 'A',
      explanation: 'Aluminium alloy memberikan kekuatan struktural tinggi dengan bobot ringan, mengurangi kelelahan otot pemanen sawit.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menjelaskan pentingnya teknik penyadapan yang tidak melukai lapisan kambium kayu pohon karet. Dampak sains jika kambium tergores pisau sadap adalah...',
      options: [
        { key: 'A', text: 'Timbul luka tonjolan (knop) cacat pada bidang sadap pulihan yang merusak susunan pembuluh lateks masa depan' },
        { key: 'B', text: 'Pohon karet langsung mati seketika dalam waktu 24 jam' },
        { key: 'C', text: 'Getah karet yang keluar berubah warna menjadi hitam pekat beracun' },
        { key: 'D', text: 'Daun pohon karet berubah menjadi daun pohon kelapa sawit' },
        { key: 'E', text: 'Akar pohon karet membusuk dan roboh tersapu angin sepoi-sepoi' }
      ],
      correct: 'A',
      explanation: 'Kambium adalah titik tumbuh kulit baru; melukainya menyebabkan nekrosis kayu bergelombang yang sulit disadap kembali.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam pemeliharaan kebun sawit, siswa menunjukkan lubang biopori rorak di antara gawangan pohon. Fungsi teknologi lingkungan rorak ini adalah...',
      options: [
        { key: 'A', text: 'Menampung air limpasan hujan dan seresah pelepah sawit untuk mempertahankan kelembaban tanah serta resapan hara' },
        { key: 'B', text: 'Sebagai tempat persembunyian babi hutan agar tidak merusak tanaman sawit' },
        { key: 'C', text: 'Mengalirkan air keluar dari kebun sawit secepat-cepatnya agar tanah menjadi kering kerontang' },
        { key: 'D', text: 'Menampung minyak sawit mentah yang keluar dari akar pohon sawit' },
        { key: 'E', text: 'Tempat membakar sampah plastik sisa karung pupuk kimia' }
      ],
      correct: 'A',
      explanation: 'Rorak berfungsi sebagai perangkap sedimentasi, penampung air hujan, dan wadah daur ulang bahan organik pelepah kelapa sawit.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada akhir video rekaman 5–10 menit, siswa merangkum integrasi sains dan teknologi pada perkebunan rakyat. Narasi yang mencerminkan pemahaman mendalam adalah...',
      options: [
        { key: 'A', text: 'Ketepatan sains waktu sadap pagi dan penggunaan asam semut berpadu dengan teknologi pisau sadap presisi, menjaga usia produktif pohon karet hingga 25 tahun' },
        { key: 'B', text: 'Perkebunan karet tidak membutuhkan perawatan pupuk karena pohon karet dapat memproduksi getah sendiri tanpa henti' },
        { key: 'C', text: 'Teknologi perkebunan karet di Belitang sebaiknya diganti dengan menanam padi di bawah naungan pohon karet' },
        { key: 'D', text: 'Semakin tebal kulit pohon karet yang disayat pisau, maka semakin kaya pekebun karet di masa depan' },
        { key: 'E', text: 'Pohon karet dapat menghasilkan getah berkualitas tinggi meskipun disadap di siang hari yang terik' }
      ],
      correct: 'A',
      explanation: 'Menyintesiskan biologi turgor, kimia koagulan, dan mekanika sadap dalam menghasilkan produktivitas lateks berkelanjutan.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Siswa menyampaikan naskah video dengan memperlihatkan mangkok sadap, talang seng, dan cairan lateks yang menetes. Keunggulan penyajian mandiri seperti ini adalah...',
      options: [
        { key: 'A', text: 'Memberikan bukti visual konkret atas fenomena sains debit aliran lateks tanpa membutuhkan rekayasa wawancara orang lain' },
        { key: 'B', text: 'Membuat video terlihat seperti rekaman berita televisi komersial berbayar' },
        { key: 'C', text: 'Mempercepat durasi video agar selesai kurang dari 1 menit' },
        { key: 'D', text: 'Menghindari keharusan siswa memahami materi yang disampaikan' },
        { key: 'E', text: 'Menyembunyikan wajah siswa agar tidak dikenali oleh guru fasilitator' }
      ],
      correct: 'A',
      explanation: 'Presentasi langsung berbasis bukti fisik objek memperkuat validitas saintifik narasi video kokurikuler.'
    }
  ],

  peternakan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains peternakan sapi potong di Belitang, siswa menguraikan sistem pencernaan poligastrik ruminansia. Mengapa sapi mampu mencerna serat kasar rumput gajah yang keras?',
      options: [
        { key: 'A', text: 'Lambung rumen sapi mengandung miliaran mikroba simbiotik (bakteri selulolitik dan protozoa) yang memfermentasi selulosa menjadi Volatile Fatty Acids (VFA)' },
        { key: 'B', text: 'Gigi geraham sapi memiliki lapisan intan yang mampu menggerus rumput menjadi abu halus' },
        { key: 'C', text: 'Sapi menghasilkan asam lambung berkadar racun tinggi yang melelehkan seluruh tanaman' },
        { key: 'D', text: 'Sapi meminum air panas bersuhu 100 derajat Celcius setelah memakan rumput' },
        { key: 'E', text: 'Rumput gajah yang dimakan sapi berubah menjadi daging secara otomatis tanpa proses metabolisme' }
      ],
      correct: 'A',
      explanation: 'Mikroorganisme rumen memecah ikatan beta-1,4-glikosida pada selulosa serat hijauan menjadi VFA sebagai sumber energi utama sapi.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Pada komoditas unggas petelur/pedaging, siswa menerangkan pentingnya ventilasi udara kandang panggung. Gas berbahaya apa yang harus dibuang dari tumpukan kotoran ayam di bawah kandang?',
      options: [
        { key: 'A', text: 'Gas amonia (NH3) dan hidrogen sulfida (H2S) yang dapat mengiritasi saluran pernapasan unggas dan memicu penyakit CRD' },
        { key: 'B', text: 'Gas oksigen (O2) murni yang menyebabkan ayam menjadi terlalu gemuk dan malas bergerak' },
        { key: 'C', text: 'Gas helium yang membuat suara kokok ayam menjadi cempreng dan melengking' },
        { key: 'D', text: 'Gas klorin pemutih bulu ayam yang dihasilkan dari sisa pakan jagung' },
        { key: 'E', text: 'Gas nitrogen monoksida yang membuat telur ayam berubah warna menjadi hijau' }
      ],
      correct: 'A',
      explanation: 'Amonia hasil dekomposisi asam urat feses unggas bersifat korosif terhadap membran mukosa pernapasan ayam.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa memperlihatkan drum silase pakan fermentasi hijauan rumput gajah dan bekatul. Sains biokimia yang terjadi selama fermentasi silase anaerob adalah...',
      options: [
        { key: 'A', text: 'Bakteri asam laktat (BAL) memfermentasi karbohidrat terlarut menghasilkan asam laktat yang menurunkan pH hingga 3,8–4,2 guna mengawetkan nutrisi pakan' },
        { key: 'B', text: 'Jamur beracun berkembang biak untuk mematikan bakteri menguntungkan di dalam drum' },
        { key: 'C', text: 'Kadar protein pakan berubah menjadi gas yang menguap ke udara bebas' },
        { key: 'D', text: 'Kandungan serat kasar meningkat hingga pakan mengeras menjadi kayu padat' },
        { key: 'E', text: 'Fermentasi menghasilkan alkohol berkadar 70% yang membuat sapi tertidur sepanjang hari' }
      ],
      correct: 'A',
      explanation: 'Fermentasi anaerob oleh BAL menghasilkan asam laktat, menciptakan suasana asam yang menghambat bakteri pembusuk (Clostridium).'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Dalam sains nutrisi sapi penggemukan, siswa menjelaskan mengapa pemberian pakan konsentrat (dedak padi, ampas tahu, bungkil sawit) harus diimbangi serat hijauan minimal 10% bobot badan?',
      options: [
        { key: 'A', text: 'Mencegah terjadinya asidosis subakut di dalam rumen dan menjaga fungsi pengunyahan kembali (ruminasi) agar pH rumen tetap stabil (6,2–6,8)' },
        { key: 'B', text: 'Konsentrat yang terlalu banyak akan membuat daging sapi berubah warna menjadi hitam pekat' },
        { key: 'C', text: 'Serat hijauan berfungsi untuk memutihkan gigi sapi sebelum dijual ke pasar hewan' },
        { key: 'D', text: 'Sapi hanya menyukai aroma rumput dan menolak pakan konsentrat pabrikan' },
        { key: 'E', text: 'Menghilangkan lemak pada sapi agar bobot timbangan sapi menjadi sangat ringan' }
      ],
      correct: 'A',
      explanation: 'Serat efektif merangsang sekresi saliva kaya bikarbonat saat memamah biak (ruminasi) yang menetralkan asam pada rumen sapi.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot mesin pencacah rumput (copper/chaff cutter) bertenaga mesin bensin. Prinsip teknologi mekanik mesin ini dalam efisiensi pakan ternak adalah...',
      options: [
        { key: 'A', text: 'Memotong batang rumput gajah yang keras menjadi ukuran 2–5 cm sehingga luas permukaan kontak meningkat, disukai ternak, dan tidak ada pakan terbuang' },
        { key: 'B', text: 'Mengubah rumput mentah menjadi tepung halus seperti bedak bayi dalam sekejap' },
        { key: 'C', text: 'Memasak rumput menggunakan uap panas mesin sebelum diberikan kepada ternak' },
        { key: 'D', text: 'Memisahkan rumput hijau dari rumput kuning secara otomatis dengan kamera AI' },
        { key: 'E', text: 'Menghilangkan seluruh kandungan air rumput hingga kering dalam hitungan detik' }
      ],
      correct: 'A',
      explanation: 'Pencacahan mekanik memperkecil ukuran partikel hijauan, meningkatkan palatabilitas dan efisiensi konsumsi tanpa sisa batang keras.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada peternakan ayam broiler, siswa menerangkan teknologi sistem minum otomatis tempat minum puting (nipple drinker). Keunggulan teknologi ini dibanding mangkok terbuka adalah...',
      options: [
        { key: 'A', text: 'Menjaga air minum tetap steril dari kontaminasi debu dan kotoran feses serta lantai sekam tetap kering tidak becek' },
        { key: 'B', text: 'Membuat ayam meminum air sebanyak 10 liter per menit tanpa henti' },
        { key: 'C', text: 'Mendinginkan suhu tubuh ayam seperti pendingin ruangan AC di dalam kandang' },
        { key: 'D', text: 'Mengubah air sumur menjadi susu segar kaya kalsium secara otomatis' },
        { key: 'E', text: 'Menghitung detak jantung ayam setiap kali ayam mematuk nipple' }
      ],
      correct: 'A',
      explanation: 'Nipple drinker tertutup mencegah tumpahan air ke litter kandang dan menghindarkan infeksi silang patogen lewat air minum.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menjelaskan penerapan biosekuriti kandang menggunakan foot dipping (celup alas kaki desinfektan) dan penyemprotan kandang. Landasan teknologi pencegahan penyakit ini adalah...',
      options: [
        { key: 'A', text: 'Memutus rantai transmisi virus dan bakteri patogen (seperti virus PMK atau Newcastle Disease) yang terbawa oleh alas kaki atau pakaian pengunjung' },
        { key: 'B', text: 'Membuat aroma kandang menjadi wangi seperti parfum toko bunga' },
        { key: 'C', text: 'Membersihkan kotoran yang menempel di sepatu agar terlihat mengkilap' },
        { key: 'D', text: 'Mendinginkan suhu kaki peternak saat bekerja di kandang yang panas' },
        { key: 'E', text: 'Mencegah lalat betina bertelur di dalam sepatu bot peternak' }
      ],
      correct: 'A',
      explanation: 'Biosekuriti ketat pada pintu masuk kandang menginaktivasi agen penular penyakit sebelum memasuki zona steril pemeliharaan.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam pemantauan performa ternak, siswa menunjukkan pita ukur lingkar dada (rondo/meteran bobot sapi). Prinsip sains matematika dari alat ukur ini adalah...',
      options: [
        { key: 'A', text: 'Terdapat korelasi matematis erat (regresi linier) antara lingkar dada sapi dengan volume karkas dan bobot badan hidup sapi' },
        { key: 'B', text: 'Pita ukur mengandung sensor magnetik yang menimbang massa atom tubuh sapi secara nirkabel' },
        { key: 'C', text: 'Pita ukur menghitung jumlah rumput yang telah dimakan sapi dalam 24 jam terakhir' },
        { key: 'D', text: 'Pita ukur mengukur panjang umur sapi sampai siap dipotong' },
        { key: 'E', text: 'Alat tersebut hanya berfungsi untuk memilih baju seragam bagi sapi kontes' }
      ],
      correct: 'A',
      explanation: 'Rumus Schoorl atau Winter memanfaatkan lingkar rongga dada untuk menduga bobot badan sapi secara akurat dan non-invasif.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada kesimpulan video berdurasi 5–10 menit, siswa merangkum sains nutrisi dan teknologi kandang. Kalimat sintesis terbaik yang diucapkan siswa adalah...',
      options: [
        { key: 'A', text: 'Sinergi antara fermentasi pakan silase berbasis sains mikrobiologi dan mesin chopper modern terbukti melipatgandakan pertambahan bobot harian (ADG) sapi di OKU Timur' },
        { key: 'B', text: 'Peternakan sapi di pedesaan tidak perlu membersihkan kotoran karena kotoran sapi akan hilang dengan sendirinya' },
        { key: 'C', text: 'Pakan konsentrat pabrik dapat digantikan 100% dengan air putih biasa tanpa mengurangi bobot ternak' },
        { key: 'D', text: 'Mesin chopper membuat peternak tidak perlu lagi menanam rumput di kebun hijauan pakan' },
        { key: 'E', text: 'Ternak sapi yang sehat adalah ternak yang tidak pernah diberikan vaksinasi penyakit' }
      ],
      correct: 'A',
      explanation: 'Kesimpulan mengaitkan teknologi pengolahan pakan dengan respons biologis pertumbuhan ternak secara terukur.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Kesesuaian format video Day 5 tanpa wawancara narasumber pada sektor peternakan diwujudkan siswa melalui...',
      options: [
        { key: 'A', text: 'Siswa berbicara langsung menghadap kamera menerangkan proses fermentasi pakan silase sambil membuka drum dan memperlihatkan tekstur aromanya' },
        { key: 'B', text: 'Siswa mengajak pemilik peternakan mengobrol santai mengenai hobi masa kecil pemilik' },
        { key: 'C', text: 'Siswa hanya mengambil rekaman gambar sapi dari kejauhan tanpa memberikan suara narasi penjelasan' },
        { key: 'D', text: 'Siswa membaca berita koran mengenai harga daging sapi nasional tanpa mengaitkannya dengan objek kandang lokal' },
        { key: 'E', text: 'Siswa mematikan mikrofon HP dan menggantinya dengan rekaman lagu dangdut selama 10 menit' }
      ],
      correct: 'A',
      explanation: 'Format video mandiri mengandalkan siswa sebagai presenter ilmiah yang mendemonstrasikan fenomena STEM objek riset.'
    }
  ],

  perikanan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains perikanan kolam air tawar di Belitang, siswa mengulas parameter kualitas air kolam patin. Mengapa kadar Oksigen Terlarut (Dissolved Oxygen/DO) minimal harus dijaga di atas 3–4 mg/liter?',
      options: [
        { key: 'A', text: 'Mendukung proses respirasi aerobik ikan, menjaga nafsu makan, dan mempercepat metabolisme pencernaan pakan pelet' },
        { key: 'B', text: 'Membuat air kolam menjadi manis sehingga ikan patin tidak merasa lapar' },
        { key: 'C', text: 'Mengubah sisik ikan patin menjadi mengkilap seperti perak' },
        { key: 'D', text: 'Mencegah air kolam meluap saat terjadi hujan lebat di malam hari' },
        { key: 'E', text: 'Membuat ikan patin dapat hidup di darat tanpa memerlukan air' }
      ],
      correct: 'A',
      explanation: 'Kadar DO cukup menjamin respirasi seluler ikan dan menekan stres metabolik sehingga pakan tercerna menjadi biomassa daging.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Siswa menjelaskan bahwa air hujan asam yang turun secara tiba-tiba dapat menyebabkan kematian massal ikan lele/patin. Prinsip sains kimia air yang mendasari peristiwa tersebut adalah...',
      options: [
        { key: 'A', text: 'Penurunan drastis nilai pH air (asidosis) merusak sel epitel insang ikan dan mengganggu keseimbangan ionik osmoregulasi tubuh' },
        { key: 'B', text: 'Air hujan membawa partikel es dingin yang membekukan darah ikan seketika' },
        { key: 'C', text: 'Hujan menaikkan kadar oksigen air hingga ikan mengalami ledakan paru-paru' },
        { key: 'D', text: 'Air hujan mengubah air kolam menjadi air laut asin yang membunuh ikan air tawar' },
        { key: 'E', text: 'Ikan lele ketakutan mendengar suara gemuruh guntur sehingga tenggelam' }
      ],
      correct: 'A',
      explanation: 'Drop pH akibat air hujan asam mengiritasi lamela insang dan menyebabkan syok osmotik parah pada ikan budidaya.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Pada segmen pakan ikan, siswa membedah komposisi protein pada karung pelet terapung (floating feed). Mengapa benih ikan lele/patin kecil membutuhkan kadar protein tinggi (30–35%)?',
      options: [
        { key: 'A', text: 'Asam amino esensial dari protein diperlukan sebagai bahan baku utama pembentukan jaringan otot, organ tubuh, dan perbanyakan sel selama fase pertumbuhan pesat' },
        { key: 'B', text: 'Protein membuat pelet dapat menyala di dalam air gelap agar mudah dilihat ikan' },
        { key: 'C', text: 'Protein berfungsi sebagai racun alami pembunuh bakteri di dalam lambung ikan' },
        { key: 'D', text: 'Pelet berprotein tinggi membuat air kolam berubah menjadi bening seperti akuarium' },
        { key: 'E', text: 'Agar ikan tidak perlu lagi membuang kotoran feses ke dalam air kolam' }
      ],
      correct: 'A',
      explanation: 'Fase fingerling membutuhkan retensi protein tinggi untuk sintesis jaringan tubuh somatik dan pertumbuhan bobot maksimal.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa mengulas aplikasi probiotik bakteri menguntungkan (Bacillus sp. dan Lactobacillus) yang dicampurkan ke air kolam. Peran sains biologis probiotik ini adalah...',
      options: [
        { key: 'A', text: 'Menguraikan endapan lumpur sisa pakan dan feses di dasar kolam menjadi senyawa anorganik tidak beracun serta menekan amonia bebas' },
        { key: 'B', text: 'Menggantikan peran pakan pelet sehingga peternak tidak perlu memberi makan ikan selama sebulan' },
        { key: 'C', text: 'Membuat ikan patin bertelur setiap hari tanpa melalui proses pemijahan' },
        { key: 'D', text: 'Menaikkan suhu air kolam hingga mencapai titik didih 80 derajat Celcius' },
        { key: 'E', text: 'Mencegah burung bangau mendekati kawasan kolam budidaya' }
      ],
      correct: 'A',
      explanation: 'Bakteri heterotrof probiotik merombak bahan organik limbah nitrogen (amonia/nitrit) di dasar kolam melalui proses bioremediasi.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot kincir air aerator (paddle wheel aerator) bertenaga motor listrik yang berputar di permukaan kolam patin. Fungsi sains teknologi alat ini adalah...',
      options: [
        { key: 'A', text: 'Memecah permukaan air menjadi percikan droplet halus guna memaksimalkan difusi oksigen atmosfer ke dalam badan air dan menciptakan sirkulasi arus' },
        { key: 'B', text: 'Mendorong ikan patin agar berenang lebih cepat seperti arena perlombaan' },
        { key: 'C', text: 'Menghangatkan air kolam saat malam hari menggunakan energi gesekan baling-baling' },
        { key: 'D', text: 'Menangkap ikan patin yang melompat keluar dari air secara otomatis' },
        { key: 'E', text: 'Menghaluskan lumut kolam agar dapat diminum langsung oleh ikan lele' }
      ],
      correct: 'A',
      explanation: 'Kincir mengaduk kolom air, meningkatkan luas bidang kontak air-udara untuk transfer oksigen dan membuang gas CO2/amonia terlarut.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada kolam terpal bulat intensif, siswa menerangkan teknologi pipa pembuangan dasar tengah (central drain). Keunggulan rekayasa teknologi ini adalah...',
      options: [
        { key: 'A', text: 'Mengandalkan gaya sentripetal pusaran air untuk mengumpulkan kotoran feses dan sisa pakan ke titik pusat sehingga mudah dibuang secara berkala' },
        { key: 'B', text: 'Membuat air kolam tidak bisa berkurang meskipun kran pipa dibuka lebar-lebar' },
        { key: 'C', text: 'Menyedot ikan patin yang sakit keluar kolam secara otomatis tanpa campur tangan manusia' },
        { key: 'D', text: 'Mengubah kotoran ikan menjadi pelet baru yang dapat dimakan kembali oleh ikan' },
        { key: 'E', text: 'Menghubungkan kolam Belitang langsung ke saluran pipa laut Samudra Hindia' }
      ],
      correct: 'A',
      explanation: 'Central drain memanfaatkan pusaran arus untuk gravitasi self-cleaning kotoran padat di dasar kolam bulat.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menunjukkan alat tes pH digital (pH meter pen). Mengapa peternak ikan di Belitang rutin menaburkan kapur pertanian (Dolomit/Kaptan) ke kolam tanah?',
      options: [
        { key: 'A', text: 'Menaikkan alkalinitas air kolam sebagai penyangga (buffer) agar pH tidak anjlok drastis saat terjadi hujan deras malam hari' },
        { key: 'B', text: 'Membuat air kolam berubah menjadi putih susu agar burung pemangsa tidak bisa melihat ikan' },
        { key: 'C', text: 'Mengeraskan sisik ikan patin agar tahan terhadap benturan batu dasar kolam' },
        { key: 'D', text: 'Menghilangkan rasa amis pada daging ikan sebelum dipanen' },
        { key: 'E', text: 'Mempercepat air kolam meresap hilang ke dalam lapisan tanah' }
      ],
      correct: 'A',
      explanation: 'Pengapuran kolam meningkatkan daya sangga (alkalinitas) air kolam terhadap fluktuasi keasaman mendadak.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam manajemen pemberian pakan, siswa menerangkan pentingnya teknik pakan secukupnya (ad libitum terkontrol). Dampak sains jika pakan pelet ditebar berlebihan (overfeeding) adalah...',
      options: [
        { key: 'A', text: 'Pelet yang tidak termakan akan membusuk di dasar kolam, meningkatkan gas beracun amonia (NH3) dan menghabiskan oksigen terlarut' },
        { key: 'B', text: 'Ikan patin akan tumbuh menjadi raksasa dengan berat 100 kg dalam seminggu' },
        { key: 'C', text: 'Air kolam berubah menjadi kristal es bening karena kelebihan karbohidrat' },
        { key: 'D', text: 'Ikan lele akan berhenti berenang dan berubah warna menjadi merah menyala' },
        { key: 'E', text: 'Tanah dasar kolam mengering menjadi ladang rumput hijau subur' }
      ],
      correct: 'A',
      explanation: 'Dekomposisi anaerob pakan berlebih menguras oksigen terlarut dan melepas gas beracun amonia bebas yang mematikan ikan.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada bagian penutup video 5–10 menit, siswa merangkum sains air dan teknologi budidaya perikanan air tawar. Kalimat kesimpulan yang paling tepat adalah...',
      options: [
        { key: 'A', text: 'Pengendalian sains mutu air (DO dan pH) yang dipadukan dengan aerasi kincir dan central drain terbukti menekan angka mortalitas benih hingga di bawah 10% di sentra perikanan Belitang' },
        { key: 'B', text: 'Budidaya ikan lele tidak membutuhkan pergantian air sama sekali karena ikan lele kebal terhadap semua racun' },
        { key: 'C', text: 'Kincir air hanya berfungsi sebagai hiasan kolam agar video terlihat menarik bagi guru fasilitator' },
        { key: 'D', text: 'Ikan patin dapat dipanen dalam waktu 3 hari jika air kolam dicampur dengan pupuk urea sawah' },
        { key: 'E', text: 'Peternak ikan air tawar sebaiknya mengeringkan kolamnya saat musim hujan tiba' }
      ],
      correct: 'A',
      explanation: 'Sintesis menghubungkan sains fisika-kimia air dengan teknologi mekanik budidaya dalam meningkatkan survival rate (SR).'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Format video mandiri yang ramah anak SMA diwujudkan siswa saat menerangkan teknologi penyortiran ukuran ikan (grading) dengan cara...',
      options: [
        { key: 'A', text: 'Menunjukkan bak ember sortir berlubang ke arah kamera dan mendemonstrasikan bagaimana ikan kecil lolos sedangkan ikan besar tertahan di atas saringan' },
        { key: 'B', text: 'Mewawancarai sopir truk pengangkut ikan mengenai rute jalan tol Palembang' },
        { key: 'C', text: 'Menyajikan gambar animasi bergerak dari internet tanpa ada rekaman kolam nyata' },
        { key: 'D', text: 'Membaca buku biologi perikanan tanpa pernah memperlihatkan ikan atau kolam' },
        { key: 'E', text: 'Menyuruh teman sekelas melompat ke dalam kolam ikan untuk membuktikan kedalaman air' }
      ],
      correct: 'A',
      explanation: 'Demonstrasi visual alat sortir grading memperjelas konsep pemisahan fraksi ukuran ikan secara mandiri dan interaktif.'
    }
  ],

  industri: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains pengolahan pangan di pabrik Rice Milling Unit (RMU) Belitang, siswa mengulas struktur anatomi bulir padi. Bagian apakah yang dilepaskan pada tahap penyosohan (polishing) untuk menghasilkan beras putih bersih?',
      options: [
        { key: 'A', text: 'Lapisan aleuron (bekatul/bran) yang kaya protein, lemak nabati, dan vitamin B kompleks' },
        { key: 'B', text: 'Kulit sekam kasar yang terbuat dari silika keras' },
        { key: 'C', text: 'Bagian endosperma pati pati yang menjadi inti beras' },
        { key: 'D', text: 'Akar lembaga padi yang mengering di dasar karung' },
        { key: 'E', text: 'Kandungan air murni di dalam inti beras putih' }
      ],
      correct: 'A',
      explanation: 'Tahap polishing mengikis lapisan aleuron bekatul agar beras tidak cepat tengik dan menghasilkan penampakan beras putih mengkilap.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Pada agro-industri pembuatan tahu-tempe kedelai lokal, siswa menerangkan sains fermentasi tempe. Mikroorganisme apakah yang berperan merajut kedelai menjadi massa padat kompak berwarna putih?',
      options: [
        { key: 'A', text: 'Kapang Rhizopus oligosporus yang miselium putihnya menembus dan menghidrolisis protein kedelai menjadi peptida sederhana' },
        { key: 'B', text: 'Bakteri Escherichia coli yang hidup di air sumur perendaman kedelai' },
        { key: 'C', text: 'Khamir Saccharomyces cerevisiae penghasil gelembung alkohol' },
        { key: 'D', text: 'Jamur Aspergillus flavus penghasil racun kapang kuning' },
        { key: 'E', text: 'Bakteri asam cuka yang mengencerkan protein tahu' }
      ],
      correct: 'A',
      explanation: 'Miselium Rhizopus mengikat biji kedelai dan mensekresikan enzim protease yang meningkatkan daya cerna protein tempe.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa menjelaskan fenomena sains saat adonan kemplang panggang/goreng mengembang renyah saat terkena panas api. Prinsip sains fisika-kimia bahan yang terjadi adalah...',
      options: [
        { key: 'A', text: 'Gelatinisasi pati tapioka dan penguapan air secara instan yang terperangkap dalam matriks adonan menghasilkan struktur rongga udara berpori renyah' },
        { key: 'B', text: 'Daging ikan tenggiri mencair menjadi gelembung sabun yang ditiup panas' },
        { key: 'C', text: 'Garam dapur meledak di dalam minyak panas membentuk serpihan putih' },
        { key: 'D', text: 'Bahan kemplang menyerap minyak goreng hingga bobotnya menjadi lima kali lipat lebih berat' },
        { key: 'E', text: 'Abu pembakaran arang menempel dan mengkristal di permukaan kerupuk kemplang' }
      ],
      correct: 'A',
      explanation: 'Ekspansi termal air menjadi uap mendesak matriks pati tapioka yang telah tergelatinisasi, menghasilkan tekstur renyah mengembang.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Pada proses pembuatan tahu, siswa menyorot penambahan asam cuka atau batu tahu (kalsium sulfat/CaSO4) ke dalam susu kedelai panas. Reaksi kimia sains yang terjadi adalah...',
      options: [
        { key: 'A', text: 'Koagulasi protein kedelai (glisinin) akibat perubahan muatan listrik pada titik isoelektrik sehingga menggumpal menjadi curd tahu padat' },
        { key: 'B', text: 'Penghancuran seluruh protein kedelai hingga hilang menguap bersama asap masakan' },
        { key: 'C', text: 'Pembentukan kristal gula manis yang membuat rasa tahu menjadi seperti permen' },
        { key: 'D', text: 'Pewarnaan alami agar tahu berubah warna menjadi kuning kunyit tanpa pewarna' },
        { key: 'E', text: 'Pengurangan volume air hingga kedelai berubah kembali menjadi biji kering' }
      ],
      correct: 'A',
      explanation: 'Penurunan pH atau ion kalsium divalent menetralkan muatan molekul protein kedelai, menyebabkan denaturasi dan presipitasi curd tahu.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot mesin pecah kulit gabah (husker) dengan dua rol karet (rubber roll) yang berputar berlawanan arah dengan kecepatan berbeda. Prinsip teknologi gesek ini adalah...',
      options: [
        { key: 'A', text: 'Memberikan gaya gesek dan tarikan mekanik pada kulit sekam gabah sehingga sekam terkelupas tanpa memecahkan butir beras pecah kulit (brown rice)' },
        { key: 'B', text: 'Memanaskan gabah hingga meletup seperti brondong jagung (popcorn)' },
        { key: 'C', text: 'Menghancurkan gabah beserta sekamnya menjadi bubur tepung pakan ternak' },
        { key: 'D', text: 'Menyedot debu sawah yang menempel pada permukaan karung gabah' },
        { key: 'E', text: 'Memotong gabah menjadi dua bagian yang sama besar menggunakan pisau silet' }
      ],
      correct: 'A',
      explanation: 'Diferensial kecepatan putar dua rol karet menimbulkan gaya geser (shearing force) yang mengelupas sekam gabah dengan aman.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada industri pengolahan tahu, siswa menunjukkan penggunaan mesin ketel uap boiler berbahan bakar sekam padi. Keunggulan teknologi konversi energi ini adalah...',
      options: [
        { key: 'A', text: 'Menghasilkan uap panas bertekanan tinggi untuk memasak bubur kedelai secara merata tanpa risiko gosong dan memanfaatkan limbah sekam RMU sebagai bahan bakar murah' },
        { key: 'B', text: 'Menggantikan pemakaian listrik PLN dengan tenaga angin di dalam pabrik' },
        { key: 'C', text: 'Membuat pabrik tahu menjadi dingin seperti ruang pendingin es batu' },
        { key: 'D', text: 'Menyaring air sungai menjadi air minum mineral isi ulang' },
        { key: 'E', text: 'Menghilangkan bau asap pembuangan boiler hingga tidak mengeluarkan asap sama sekali' }
      ],
      correct: 'A',
      explanation: 'Pemasakan uap tidak langsung (steam injection) mencegah hangus dasar wajan dan mendaur ulang biomassa sekam padi lokal.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menerangkan mesin pemilah beras berdasarkan warna (color sorter optic). Prinsip teknologi sensor optik yang digunakan mesin modern ini adalah...',
      options: [
        { key: 'A', text: 'Kamera digital berkecepatan tinggi mendeteksi butir beras kuning, hitam, atau batu kecil, lalu katup semprotan udara pneumatik menembak butir cacat tersebut keluar jalur' },
        { key: 'B', text: 'Magnet raksasa menarik beras yang mengandung mineral besi ke dalam wadah khusus' },
        { key: 'C', text: 'Sinar laser membakar butir beras kuning hingga hancur menjadi abu di udara' },
        { key: 'D', text: 'Mesin mencelupkan seluruh beras ke dalam larutan pewarna putih pakaian' },
        { key: 'E', text: 'Timbangan mini menimbang satu per satu butir beras dengan kecepatan 1 butir per detik' }
      ],
      correct: 'A',
      explanation: 'Sensor CCD dan ejektor pneumatik memisahkan butir abnormal secara real-time berdasarkan perbedaan spektrum pantulan cahaya.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam penanganan limbah cair agro-industri tahu, siswa mengulas bak Instalasi Pengolahan Air Limbah (IPAL) anaerob. Fungsi teknologi pengolahan limbah ramah lingkungan ini adalah...',
      options: [
        { key: 'A', text: 'Menurunkan kadar BOD dan COD air buangan sisa tahu dengan bantuan bakteri anaerob sehingga air buangan aman dan tidak mencemari parit desa' },
        { key: 'B', text: 'Mengubah air limbah berbau menjadi minyak goreng baru yang siap pakai' },
        { key: 'C', text: 'Mengalirkan air limbah langsung ke sumur warga sekitar agar sumur tidak kering' },
        { key: 'D', text: 'Membekukan air limbah tahu menjadi balok es pendingin ikan' },
        { key: 'E', text: 'Menyembunyikan air limbah di dalam tanah agar tidak terlihat oleh petugas dinas' }
      ],
      correct: 'A',
      explanation: 'Digester anaerobik mereduksi beban organik cemaran (BOD/COD) dan menghilangkan bau asam menyengat limbah whey tahu.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada segmen kesimpulan video 5–10 menit, siswa merangkum pengaruh teknologi mesin terhadap nilai tambah sains bahan pangan lokal. Kalimat narasi yang paling tepat adalah...',
      options: [
        { key: 'A', text: 'Penerapan teknologi mesin modern dari husker hingga color sorter di Belitang berhasil menaikkan rendemen beras giling hingga 65% dengan pecahan butir rendah, mengangkat derajat gabah lokal menjadi beras premium' },
        { key: 'B', text: 'Pabrik penggilingan padi membuktikan bahwa sekam padi lebih berharga dan lebih mahal dibanding beras putih' },
        { key: 'C', text: 'Mesin RMU sebaiknya ditinggalkan dan petani kembali menumbuk padi dengan alu kayu tradisional' },
        { key: 'D', text: 'Beras hasil gilingan mesin modern tidak mengandung karbohidrat sehingga aman dikonsumsi penderita diabetes tanpa takaran' },
        { key: 'E', text: 'Semakin banyak beras yang patah dan hancur, maka harga jual beras kemasan akan semakin tinggi di pasaran' }
      ],
      correct: 'A',
      explanation: 'Sintesis mengaitkan presisi mekanik RMU dengan parameter agronomi rendemen beras kepala dan mutu komersial pangan.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Siswa merekam video mandiri dengan memperlihatkan mesin pengemas segel plastik (continuous band sealer). Bukti penjelasan teknologi yang disampaikan siswa adalah...',
      options: [
        { key: 'A', text: 'Menerangkan bagaimana pemanas pita teflon melelehkan plastik kemasan dengan suhu terkontrol untuk menciptakan segel kedap udara anti bocor' },
        { key: 'B', text: 'Membuka plastik kemasan dan membagikan isinya kepada orang yang lewat di jalan raya' },
        { key: 'C', text: 'Merekam merk HP kamera yang digunakan selama 5 menit berturut-turut' },
        { key: 'D', text: 'Menyanyikan lagu daerah tanpa ada narasi mengenai cara kerja mesin penyegel' },
        { key: 'E', text: 'Menyuruh operator pabrik menjelaskan seluruh materi sementara siswa duduk di kursi' }
      ],
      correct: 'A',
      explanation: 'Penjelasan prinsip termoplastik dan pemanasan terkontrol pada band sealer mendemonstrasikan penguasaan materi teknologi kemasan.'
    }
  ],

  perdagangan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains kios sarana produksi pertanian (saprotan) di Belitang, siswa mengulas sifat higroskopis pupuk Urea. Mengapa karung pupuk urea harus disimpan di atas palet kayu dan tidak boleh menyentuh lantai semen basah?',
      options: [
        { key: 'A', text: 'Urea sangat mudah menyerap uap air dari udara/lantai dingin yang menyebabkan butiran pupuk mencair, menggumpal membatu (caking), dan rusak' },
        { key: 'B', text: 'Lantai semen dapat memakan butiran pupuk urea hingga karung menjadi kosong' },
        { key: 'C', text: 'Palet kayu membuat pupuk urea berubah warna menjadi emas yang lebih mahal' },
        { key: 'D', text: 'Menghindari pupuk urea dimakan oleh rayap kayu di dalam gudang' },
        { key: 'E', text: 'Mencegah pupuk urea meledak akibat gesekan lantai semen' }
      ],
      correct: 'A',
      explanation: 'Sifat higroskopis urea menarik uap air pada kelembaban kritis relatif (CRH) 75%, membentuk ikatan kristal keras yang merusak butiran.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Pada toko sembako bahan pangan, siswa menerangkan sains penyimpanan beras dan tepung terigu. Mengapa sirkulasi udara dan pengendalian kelembaban ruangan (RH < 70%) sangat menentukan keawetan stok barang?',
      options: [
        { key: 'A', text: 'Kelembaban tinggi memicu respirasi bahan pangan, pertumbuhan kutu beras (Sitophilus oryzae), dan perkembangan kapang perusak' },
        { key: 'B', text: 'Udara lembap membuat tepung terigu berubah menjadi adonan roti yang sudah matang' },
        { key: 'C', text: 'Kelembaban rendah membuat timbangan beras bertambah berat dua kali lipat' },
        { key: 'D', text: 'Kutu beras hanya bisa hidup jika ruangan toko dipasangi pendingin AC' },
        { key: 'E', text: 'Mencegah kemasan karung beras robek akibat tiupan angin kencang' }
      ],
      correct: 'A',
      explanation: 'Kelembaban udara tinggi mendorong metabolisme serangga hama gudang dan spora kapang yang menurunkan kualitas mutu simpan pangan.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa membedah label botol pestisida di kios pertanian. Ia menjelaskan arti tanda pita warna peringatan pada botol pestisida (pita merah, kuning, biru, hijau). Prinsip sains toksikologi yang diterangkan adalah...',
      options: [
        { key: 'A', text: 'Pita warna menunjukkan tingkat bahaya racun akut berdasarkan nilai Lethal Dose 50 (LD50), dari merah (sangat berbahaya) hingga hijau (kehati-hatian)' },
        { key: 'B', text: 'Warna pita menunjukkan jenis aroma wangi buah yang ada di dalam botol pestisida' },
        { key: 'C', text: 'Pita hijau berarti racun tersebut aman diminum seperti sirup manis' },
        { key: 'D', text: 'Pita merah berarti pestisida tersebut khusus untuk membasmi tanaman mawar merah' },
        { key: 'E', text: 'Warna pita ditentukan berdasarkan kesukaan pemilik toko saprotan' }
      ],
      correct: 'A',
      explanation: 'Klasifikasi WHO/Kementan menggunakan kode pita warna untuk mengindikasikan kelas toksisitas oral/dermal LD50 bahan aktif pestisida.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Di toko ritel sembako, siswa menjelaskan prinsip pengawetan produk susu kemasan UHT (Ultra High Temperature). Prinsip sains termal pengolahan ini adalah...',
      options: [
        { key: 'A', text: 'Pemanasan cepat pada suhu 135–145 derajat Celcius selama 2–4 detik membunuh seluruh spora bakteri tanpa merusak nutrisi, dikemas aseptik kedap cahaya' },
        { key: 'B', text: 'Pemberian es batu kutub utara ke dalam kemasan kotak susu agar tahan 1 tahun' },
        { key: 'C', text: 'Penambahan bahan pengawet boraks dan formalin dalam dosis tinggi' },
        { key: 'D', text: 'Penyinaran menggunakan sinar radioaktif nuklir di dalam gudang toko' },
        { key: 'E', text: 'Pengurangan kadar air susu hingga susu berubah menjadi serbuk kering' }
      ],
      correct: 'A',
      explanation: 'Proses UHT membunuh spora tahan panas Clostridium botulinum dan pengemasan aseptik tetra pak mencegah rekontaminasi mikroba.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot timbangan digital elektronik di kasir toko sembako. Prinsip sains teknologi sensor load cell pada timbangan digital adalah...',
      options: [
        { key: 'A', text: 'Massa benda menekan strain gauge logam lentur yang mengubah deformasi mekanik menjadi perubahan hambatan listrik, dikonversi menjadi angka gram digital' },
        { key: 'B', text: 'Timbangan memiliki lensa kamera mikro yang menghitung butiran gula pasir satu per satu' },
        { key: 'C', text: 'Timbangan menggunakan pegas raksasa yang berbunyi saat barang diletakkan di atasnya' },
        { key: 'D', text: 'Timbangan membaca barcode harga barang lalu menebak berat barang secara acak' },
        { key: 'E', text: 'Timbangan menyedot gravitasi bumi agar barang terasa lebih berat di atas meja kasir' }
      ],
      correct: 'A',
      explanation: 'Strain gauge load cell mengubah regangan fisik akibat beban menjadi sinyal tegangan listrik mikro yang diproses mikrokontroler.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada kios pupuk bersubsidi resmi di Belitang, siswa menerangkan penggunaan aplikasi i-Pubers (Integrasi Pupuk Bersubsidi). Aspek teknologi digital yang dimanfaatkan aplikasi ini adalah...',
      options: [
        { key: 'A', text: 'Pemindaian e-KTP petani dengan verifikasi data e-Alokasi Kementan secara real-time via koneksi internet smartphone dan foto bukti transaksi' },
        { key: 'B', text: 'Mencetak pupuk urea dari printer 3D kantor desa dalam bentuk kertas' },
        { key: 'C', text: 'Mengirim pupuk langsung ke sawah petani menggunakan pesawat drone tempur' },
        { key: 'D', text: 'Menghapus utang petani secara otomatis di bank' },
        { key: 'E', text: 'Mengubah pupuk palsu menjadi pupuk bersubsidi asli' }
      ],
      correct: 'A',
      explanation: 'Aplikasi i-Pubers mengintegrasikan data NIK KTP dengan kuota elektronik e-Alokasi untuk penyaluran pupuk presisi dan akuntabel.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menerangkan penerapan sistem penataan stok FIFO (First In, First Out) pada rak toko kelontong. Keunggulan manajemen logistik sains teknologi ini adalah...',
      options: [
        { key: 'A', text: 'Barang stok lama yang lebih dulu masuk gudang akan diletakkan di depan agar terjual lebih awal, mencegah kerugian barang kedaluwarsa (expired)' },
        { key: 'B', text: 'Menyembunyikan barang dagangan yang rusak di bawah meja kasir agar tidak terlihat pembeli' },
        { key: 'C', text: 'Menjual barang paling mahal terlebih dahulu tanpa memperhatikan tanggal kadaluarsa' },
        { key: 'D', text: 'Membongkar seluruh rak toko setiap hari dan menata ulang secara acak' },
        { key: 'E', text: 'Membuang separuh stok barang ke tempat sampah setiap pergantian bulan' }
      ],
      correct: 'A',
      explanation: 'Prinsip FIFO menjamin rotasi perputaran barang sesuai tanggal kedaluwarsa, meminimalkan susut nilai akibat kerusakan produk.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam penanganan bahan kimia pestisida di kios saprotan, siswa menyorot alat keselamatan kerja K3 (masker karbon aktif dan sarung tangan nitril). Mengapa masker kain biasa tidak cukup untuk uap pestisida?',
      options: [
        { key: 'A', text: 'Masker kain hanya menyaring debu kasar, sedangkan karbon aktif mampu mengadsorpsi uap kimia organik volatil berbahaya ke pori-pori mikronya' },
        { key: 'B', text: 'Masker kain memiliki warna putih yang tidak disukai oleh serangga hama' },
        { key: 'C', text: 'Karbon aktif mengubah uap pestisida menjadi parfum wangi melati' },
        { key: 'D', text: 'Masker kain dapat meleleh saat terkena hembusan napas manusia' },
        { key: 'E', text: 'Karbon aktif membuat pemakainya tidak perlu bernapas selama bekerja di toko' }
      ],
      correct: 'A',
      explanation: 'Karbon aktif memiliki luas permukaan adsorpsi sangat luas yang efektif mengikat gas dan uap pelarut kimia pestisida organik.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada akhir video rekaman 5–10 menit, siswa merangkum sains bahan kimia saprotan dan teknologi tata kelola toko. Poin kesimpulan siswa yang paling tepat adalah...',
      options: [
        { key: 'A', text: 'Pemahaman sains sifat kimia pupuk dan pestisida yang dipadukan dengan digitalisasi i-Pubers dan timbangan presisi menjamin ketersediaan sarana produksi berkualitas tinggi bagi petani OKU Timur' },
        { key: 'B', text: 'Pedagang saprotan tidak perlu memahami dosis bahan aktif pestisida karena petani sudah tahu sendiri racun yang dibutuhkannya' },
        { key: 'C', text: 'Timbangan digital di toko perdagangan sebaiknya disetel agar mengurangi timbangan petani untuk melipatgandakan laba' },
        { key: 'D', text: 'Pupuk bersubsidi dapat disimpan di tempat terbuka terkena hujan tanpa merusak kandungannya' },
        { key: 'E', text: 'Aplikasi smartphone hanya memperlambat proses transaksi jual beli barang di pedesaan' }
      ],
      correct: 'A',
      explanation: 'Sintesis menghubungkan sains toksikologi/kimia bahan dengan digitalisasi pelayanan dan integritas alat ukur metrologi.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Dalam video tanpa wawancara narasumber pada sektor perdagangan, siswa mendemonstrasikan keaslian pupuk urea bersubsidi dengan cara...',
      options: [
        { key: 'A', text: 'Memperlihatkan warna merah muda (pink) pupuk urea bersubsidi dan butiran prill seragam ke arah kamera sambil menjelaskan senyawa pewarna anti-penyelewengan' },
        { key: 'B', text: 'Mewawancarai pembeli di toko mengenai rencana belanja bulanan keluarganya' },
        { key: 'C', text: 'Merekam deretan mobil yang lewat di jalan depan toko selama 8 menit penuh' },
        { key: 'D', text: 'Menghitung uang kas pedagang di depan kamera tanpa menjelaskan produknya' },
        { key: 'E', text: 'Menyuruh adik kecil membawa karung pupuk sambil tertawa di depan kamera' }
      ],
      correct: 'A',
      explanation: 'Demonstrasi visual ciri fisik pewarna merah muda (pink) pada urea subsidi menjelaskan regulasi sains kontrol distribusi pupuk nasional.'
    }
  ],

  formal: [
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Dalam penjelasan video sains layanan jasa keuangan mikro di gerai BRILink/BUMDes Belitang, siswa mengulas teknologi detektor uang palsu lampu Ultraviolet (UV). Prinsip sains fisika optik yang bekerja adalah...',
      options: [
        { key: 'A', text: 'Radiasi sinar UV dengan panjang gelombang 365 nm memicu pendaran fluoresensi pada serat pengaman dan tinta fosfor tak kasat mata di lembar uang Rupiah asli' },
        { key: 'B', text: 'Sinar UV membakar kertas uang palsu hingga langsung hangus menjadi abu' },
        { key: 'C', text: 'Sinar UV mengubah warna uang kertas Rp100.000 menjadi berwarna ungu permanen' },
        { key: 'D', text: 'Lampu UV menghasilkan magnet yang menyedot logam di dalam dompet nasabah' },
        { key: 'E', text: 'Sinar UV mendinginkan suhu uang agar tidak menularkan kuman penyakit' }
      ],
      correct: 'A',
      explanation: 'Fotoluminesensi bahan kimia fosfor pada serat pengaman uang asli tereksitasi oleh foton energi tinggi sinar UV gelombang panjang (UV-A).'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Sains Bahan Baku & Kondisi Alami',
      question: 'Siswa meneliti kertas struk bukti transfer yang keluar dari mesin EDC/printer mobile. Prinsip sains kimia dari kertas termal (thermal paper) tanpa tinta adalah...',
      options: [
        { key: 'A', text: 'Kertas dilapisi zat kimia leuco dye dan pengembang asam (asam bisphenol/BPA) yang berubah warna menjadi hitam pekat saat terkena panas dari head print pin termal' },
        { key: 'B', text: 'Kertas mengandung tinta basah yang disemprotkan dari jarum mikro di dalam mesin' },
        { key: 'C', text: 'Kertas menyerap cahaya matahari dan mengubahnya menjadi tulisan alfabet hitam' },
        { key: 'D', text: 'Tulisan pada kertas struk muncul karena adanya bakteri yang memakan permukaan kertas' },
        { key: 'E', text: 'Kertas termal dilapisi arang kayu yang digores oleh jarum mekanik' }
      ],
      correct: 'A',
      explanation: 'Reaksi termokimiawi antara zat warna leuco dan asam padat terpicu oleh energi kalor lokal head printer, membentuk warna kontras.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Siswa menjelaskan teknologi chip emas (microchip) pada kartu ATM/debit yang menggantikan pita magnetik hitam lama. Keunggulan sains keamanan kriptografi kartu chip adalah...',
      options: [
        { key: 'A', text: 'Memiliki mikroprosesor internal yang mengenkripsi data transaksi secara dinamis (standar EMV) sehingga data kartu mustahil diduplikasi (anti-skimming)' },
        { key: 'B', text: 'Chip emas dapat dicairkan menjadi perhiasan perhiasan berharga tinggi jika kartu rusak' },
        { key: 'C', text: 'Chip emas membuat saldo di dalam rekening bank otomatis bertambah setiap minggu' },
        { key: 'D', text: 'Membuat kartu ATM kebal terhadap api bersuhu 1.000 derajat Celcius' },
        { key: 'E', text: 'Chip memancarkan sinyal radio yang membuat mesin ATM mengeluarkan uang gratis' }
      ],
      correct: 'A',
      explanation: 'Chip standar EMV menghasilkan kriptogram dinamis unik per sesi transaksi, meniadakan risiko kloning data pita magnetik statis.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
      question: 'Pada segmen keamanan digital perbankan desa, siswa menerangkan konsep Two-Factor Authentication (2FA) dan kode OTP. Prinsip sains matematika komputasi di balik kode OTP adalah...',
      options: [
        { key: 'A', text: 'Algoritma kriptografi berbasis waktu (Time-based One-Time Password / TOTP) yang menghasilkan kombinasi angka acak unik dan hangus dalam hitungan detik' },
        { key: 'B', text: 'Kode angka yang ditebak oleh operator bank berdasarkan tanggal lahir nasabah' },
        { key: 'C', text: 'Kode angka permanen yang sama selamanya untuk seluruh nasabah di Indonesia' },
        { key: 'D', text: 'Angka yang dihitung dari jumlah uang yang pernah ditarik oleh nasabah di mesin ATM' },
        { key: 'E', text: 'Kode rahasia yang hanya boleh diketahui oleh tetangga nasabah' }
      ],
      correct: 'A',
      explanation: 'TOTP menggunakan kunci rahasia bersama dan stempel waktu UTC terkuantisasi untuk membangkitkan kode hash sekali pakai yang aman.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Siswa menyorot mesin EDC (Electronic Data Capture) nirkabel dan smartphone agen BRILink. Prinsip teknologi jaringan telekomunikasi yang digunakan untuk memproses transfer antarbank adalah...',
      options: [
        { key: 'A', text: 'Modem SIM-card 4G LTE mentransmisikan paket data terenkripsi melalui protokol SSL/TLS ke server gerbang pembayaran (payment gateway) bank secara real-time' },
        { key: 'B', text: 'Mesin EDC memancarkan kabel tak kasat mata langsung ke kantor pusat bank di Jakarta' },
        { key: 'C', text: 'Mesin EDC menyimpan uang tunai fisik di dalam wadah baterainya' },
        { key: 'D', text: 'Data transaksi dikirimkan melalui gelombang suara radio FM yang didengarkan teller bank' },
        { key: 'E', text: 'Mesin EDC menggunakan tenaga uap air panas untuk menggerakkan tombol angka' }
      ],
      correct: 'A',
      explanation: 'Konektivitas data seluler aman (HTTPS/TLS) menghubungkan terminal transaksi ke sistem core banking dalam hitungan detik.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Teknologi Alat Kerja & Mekanisasi Produksi',
      question: 'Pada gerai keuangan desa, siswa menunjukkan perangkat UPS (Uninterruptible Power Supply) yang terhubung ke mesin EDC dan router internet. Fungsi teknologi perlindungan perangkat ini adalah...',
      options: [
        { key: 'A', text: 'Menyediakan daya cadangan baterai seketika dan menstabilkan lonjakan tegangan (surge protector) saat listrik PLN padam mendadak di pedesaan' },
        { key: 'B', text: 'Menggandakan kecepatan transfer uang menjadi dua kali lebih banyak dari nominal asli' },
        { key: 'C', text: 'Mendinginkan ruangan kantor agen seperti fungsi pendingin ruangan AC' },
        { key: 'D', text: 'Mencetak uang tunai baru saat mesin EDC kehabisan uang di laci' },
        { key: 'E', text: 'Membuat suara alarm nyaring saat nasabah lupa membawa kartu identitas' }
      ],
      correct: 'A',
      explanation: 'Inverter baterai UPS mencegah transaksi gantung (pending reversal) dan kerusakan sirkuit chip mesin saat pemadaman listrik.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Siswa menerangkan mesin penghitung uang otomatis (friction currency counter) yang dilengkapi sensor magnetik (MG) dan inframerah (IR). Keunggulan teknologi mekanik ini adalah...',
      options: [
        { key: 'A', text: 'Menghitung ratusan lembar uang tunai per menit secara presisi sekaligus mendeteksi ketebalan ganda lembaran (double note) dan keberadaan pita magnetik uang' },
        { key: 'B', text: 'Mencuci lembaran uang kotor menjadi bersih mengkilap seperti baru keluar dari percetakan' },
        { key: 'C', text: 'Mengubah uang pecahan Rp2.000 menjadi pecahan Rp100.000 secara mekanis' },
        { key: 'D', text: 'Memisahkan uang milik nasabah laki-laki dan nasabah perempuan secara otomatis' },
        { key: 'E', text: 'Menghitung jumlah utang warga desa yang belum dibayar kepada pedagang sembako' }
      ],
      correct: 'A',
      explanation: 'Rol gesek dan sensor multidetektor (IR/MG) mempercepat verifikasi jumlah fisik dan keaslian uang saat transaksi nominal besar.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
      question: 'Dalam manajemen brankas penyimpanan kas agen keuangan, siswa menunjukkan brankas berlapis baja tahan api (fireproof safe). Aspek teknologi perlindungan fisik brankas adalah...',
      options: [
        { key: 'A', text: 'Konstruksi dinding baja ganda berisi lapisan insulasi busa semen tahan panas serta sistem kunci kombinasi digital anti-manipulasi' },
        { key: 'B', text: 'Brankas dilengkapi roket pendorong yang dapat terbang saat ada pencuri masuk' },
        { key: 'C', text: 'Brankas dapat menyusut menjadi ukuran kecil seperti dompet saku' },
        { key: 'D', text: 'Pintu brankas hanya bisa dibuka menggunakan sihir mantra pemilik agen' },
        { key: 'E', text: 'Brankas memancarkan gas beracun ke seluruh desa saat ada orang mendekat' }
      ],
      correct: 'A',
      explanation: 'Sertifikasi ketahanan api (UL Class) dan baut pengunci baja masif mengamankan likuiditas uang tunai dari kebakaran dan pencurian.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Pada akhir rekaman video 5–10 menit, siswa merangkum sains material uang dan teknologi perbankan digital. Pernyataan sintesis yang paling tepat adalah...',
      options: [
        { key: 'A', text: 'Integrasi sains deteksi fisik uang (lampu UV dan kertas termal) dengan teknologi mesin EDC 4G enkripsi chip berhasil membawa layanan perbankan modern ke jantung pedesaan OKU Timur secara aman dan instan' },
        { key: 'B', text: 'Agen perbankan desa tidak perlu menggunakan mesin EDC karena transfer uang dapat ditulis di buku tulis biasa' },
        { key: 'C', text: 'Penerapan teknologi digital perbankan sebaiknya dihentikan karena warga desa lebih suka menyimpan uang di bawah kasur' },
        { key: 'D', text: 'Lampu UV membuktikan bahwa uang palsu lebih banyak beredar di desa dibanding uang asli' },
        { key: 'E', text: 'Mesin EDC perbankan dapat memproses transaksi meskipun tidak memiliki jaringan sinyal internet' }
      ],
      correct: 'A',
      explanation: 'Menyintesiskan sains pengaman dokumen fisik uang tunai dengan teknologi telekomunikasi fintech inklusi keuangan pedesaan.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Sains-Teknologi dalam Narasi Video',
      question: 'Bentuk rekaman video mandiri tanpa wawancara yang ramah siswa SMA pada sektor jasa keuangan mikro ditunjukkan melalui...',
      options: [
        { key: 'A', text: 'Siswa berdiri di depan meja konter memperagakan cara meletakkan uang di bawah sinar UV dan menggesek kartu uji ke slot chip mesin EDC sambil menjelaskan prinsip kerjanya' },
        { key: 'B', text: 'Siswa merekam wajah nasabah yang sedang memasukkan nomor PIN rahasia ATM' },
        { key: 'C', text: 'Siswa mewawancarai satpam bank mengenai gaji bulanannya' },
        { key: 'D', text: 'Siswa mengambil rekaman video dari dalam kendaraan yang melaju kencang tanpa suara' },
        { key: 'E', text: 'Siswa menari di depan kantor agen perbankan tanpa menjelaskan materi apa pun' }
      ],
      correct: 'A',
      explanation: 'Demonstrasi fungsional langsung menjaga etika privasi nasabah sekaligus memenuhi standar ilmiah presentasi video STEM.'
    }
  ]
};

// 2. DATA SOAL DAY 6 (REKAYASA & MATEMATIKA FINANSIAL)
const DAY6_DATA = {
  pertanian: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa pertanian sawah di Belitang, siswa mengulas teknik tata letak pola tanam Jajar Legowo (misal 2:1 atau 4:1). Prinsip rekayasa agronomis dari sistem lorong tanam ini adalah...',
      options: [
        { key: 'A', text: 'Menciptakan efek tanaman pinggir (border effect) yang memaksimalkan penyerapan radiasi matahari dan sirkulasi angin serta mempermudah pemeliharaan/pemupukan' },
        { key: 'B', text: 'Membuat petak sawah terlihat seperti lapangan sepak bola mini' },
        { key: 'C', text: 'Mengurangi jumlah tanaman padi hingga tinggal separuh agar hemat bibit' },
        { key: 'D', text: 'Mencegah burung terbang melintasi petak sawah' },
        { key: 'E', text: 'Membuat air irigasi mengalir berputar membentuk pusaran air di tengah sawah' }
      ],
      correct: 'A',
      explanation: 'Pola Jajar Legowo meningkatkan intersepsi radiasi matahari dan aerasi kanopi tanaman sehingga fotosintesis maksimal dan kelembaban kanopi turun.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Siswa menerangkan rekayasa pintu air pembagi tersier (proporsional weir) pada parit irigasi sawah Belitang. Aspek rekayasa hidrolika yang dijelaskan siswa adalah...',
      options: [
        { key: 'A', text: 'Memanfaatkan perbedaan lebar ambang pintu air dan gaya gravitasi bumi agar debit air terbagi secara adil ke tiap petak sawah tanpa membutuhkan pompa bahan bakar' },
        { key: 'B', text: 'Mengubah aliran air irigasi yang keruh menjadi air jernih yang berbusa sabun' },
        { key: 'C', text: 'Menaikkan air sawah ke atas bukit dengan melawan hukum gravitasi' },
        { key: 'D', text: 'Menyaring ikan lele liar agar tidak masuk ke petak sawah petani tetangga' },
        { key: 'E', text: 'Menutup aliran air secara otomatis jika ada petani yang malas bekerja' }
      ],
      correct: 'A',
      explanation: 'Ambang ukur proporsional membagi debit aliran air secara volumetrik sesuai luas hamparan sawah binaan secara pasif berbasis gravitasi.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi serangan hama tikus sawah tanpa racun berbahaya, siswa mempresentasikan rekayasa Trap Barrier System (TBS) dengan tanaman perangkap awal. Cara kerja rekayasa fisik ini adalah...',
      options: [
        { key: 'A', text: 'Menanam petak padi 3 minggu lebih awal yang dikelilingi pagar plastik berpagar perangkap bubu perangkap, memikat tikus masuk ke dalam perangkap bubu satu arah' },
        { key: 'B', text: 'Memasang pengeras suara musik keras di sekeliling pematang sawah sepanjang malam' },
        { key: 'C', text: 'Mengecat bulir padi dengan cat warna merah agar ditakuti tikus' },
        { key: 'D', text: 'Menyiram seluruh sawah dengan minyak tanah agar tikus tergelincir' },
        { key: 'E', text: 'Membangun jembatan bambu di atas sawah untuk tempat tidur kucing' }
      ],
      correct: 'A',
      explanation: 'TBS memanfaatkan tanaman aroma pemikat lebih awal dan pagar plastik bersekat cerobong perangkap bubu untuk menangkap populasi tikus awal musim.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa memaparkan rekayasa pemanfaatan jerami padi sisa panen combine harvester. Daripada dibakar yang mencemari udara, jerami direkayasa menjadi...',
      options: [
        { key: 'A', text: 'Mulsa penutup tanah dan kompos organik trichoderma di lahan sawah untuk mengembalikan silika (Si) dan kalium (K) alami ke struktur tanah' },
        { key: 'B', text: 'Bahan baku pembuatan genteng beton atap rumah' },
        { key: 'C', text: 'Pengganti solar untuk menggerakkan mesin traktor pembajak sawah' },
        { key: 'D', text: 'Bahan pengisi kasur tidur yang dijual ke pasar tradisional' },
        { key: 'E', text: 'Bahan peledak pemecah batu saluran irigasi' }
      ],
      correct: 'A',
      explanation: 'Daur ulang jerami in-situ mengembalikan hara kalium dan silika esensial bagi ketahanan batang padi terhadap patah dan serangan hama.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam kalkulasi finansial 1 hektar sawah padi, siswa merinci biaya operasional: olah tanah traktor Rp1.200.000, benih padi Rp400.000, pupuk berimbang Rp1.600.000, pestisida Rp800.000, tenaga kerja tanam dan semprot Rp2.000.000. Total Biaya Operasional (BOP) budidaya sebelum panen adalah...',
      options: [
        { key: 'A', text: 'Rp6.000.000' },
        { key: 'B', text: 'Rp4.000.000' },
        { key: 'C', text: 'Rp8.500.000' },
        { key: 'D', text: 'Rp10.000.000' },
        { key: 'E', text: 'Rp3.200.000' }
      ],
      correct: 'A',
      explanation: 'Perhitungan: 1.200.000 + 400.000 + 1.600.000 + 800.000 + 2.000.000 = Rp6.000.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika biaya sewa mesin panen Combine Harvester adalah sistem bagi hasil 1:8 (petani mendapat 8 bagian, pemilik mesin mendapat 1 bagian dari total gabah), berapa kg gabah bagian pemilik mesin jika panen menghasilkan 6.300 kg Gabah Kering Panen (GKP)?',
      options: [
        { key: 'A', text: '700 kg gabah (karena 6.300 kg dibagi 9 bagian total)' },
        { key: 'B', text: '1.200 kg gabah' },
        { key: 'C', text: '350 kg gabah' },
        { key: 'D', text: '2.000 kg gabah' },
        { key: 'E', text: '500 kg gabah' }
      ],
      correct: 'A',
      explanation: 'Sistem bawon 1:8 berarti total bagian adalah 1 + 8 = 9. Bagian mesin = (1/9) x 6.300 = 700 kg.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Seorang petani di Belitang memperoleh hasil bersih panen padi 5.600 kg GKP setelah dipotong bagi hasil panen. Jika gabah tersebut dijual ke tengkulak dengan harga Rp6.500 per kg, berapa total Omzet kotor yang diterima petani?',
      options: [
        { key: 'A', text: 'Rp36.400.000' },
        { key: 'B', text: 'Rp28.500.000' },
        { key: 'C', text: 'Rp42.000.000' },
        { key: 'D', text: 'Rp30.000.000' },
        { key: 'E', text: 'Rp22.400.000' }
      ],
      correct: 'A',
      explanation: 'Omzet kotor = 5.600 kg x Rp6.500 = Rp36.400.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Dengan total Omzet kotor Rp36.400.000 dan total Biaya Operasional (BOP) prapanen Rp6.400.000, berapakah Laba Bersih (net profit) yang dikantongi petani untuk masa tanam 4 bulan tersebut?',
      options: [
        { key: 'A', text: 'Rp30.000.000 (setara Rp7.500.000 per bulan)' },
        { key: 'B', text: 'Rp20.000.000 (setara Rp5.000.000 per bulan)' },
        { key: 'C', text: 'Rp15.000.000 (setara Rp3.750.000 per bulan)' },
        { key: 'D', text: 'Rp36.400.000 (setara Rp9.100.000 per bulan)' },
        { key: 'E', text: 'Rp10.000.000 (setara Rp2.500.000 per bulan)' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih = Omzet - BOP = Rp36.400.000 - Rp6.400.000 = Rp30.000.000. Rata-rata per bulan = Rp30.000.000 / 4 = Rp7.500.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada akhir video Day 6 (menit 07:30–10:00), siswa mengusulkan gagasan solusi inovasi hilirisasi gabah. Gagasan nilai tambah finansial yang paling rasional adalah...',
      options: [
        { key: 'A', text: 'Menggiling gabah sendiri di RMU lokal dan mengemasnya dalam karung beras premium berlabel lokal 5 kg sehingga harga jual meningkat dari Rp6.500/kg gabah menjadi setara Rp14.000/kg beras' },
        { key: 'B', text: 'Menjual seluruh sawah dan beralih membeli mata uang kripto' },
        { key: 'C', text: 'Menimbun gabah di sawah saat musim hujan lebat tanpa atap penutup' },
        { key: 'D', text: 'Membuang sekam padi ke jalan raya agar jalan menjadi licin' },
        { key: 'E', text: 'Menjual gabah dengan sistem ijon bunga tinggi kepada rentenir keliling' }
      ],
      correct: 'A',
      explanation: 'Hilirisasi beras kemasan meningkatkan margin margin nilai tambah rantai pasok langsung ke konsumen akhir.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Ciri video mandiri Day 6 yang memenuhi kriteria rubrik FINCESTEM tanpa wawancara narasumber adalah...',
      options: [
        { key: 'A', text: 'Siswa menampilkan lembar kalkulasi papan tulis/kertas yang merinci angka modal, omzet, dan laba bersih sambil menjelaskan perhitungan tersebut secara runtut di depan kamera' },
        { key: 'B', text: 'Siswa memaksa petani di jalan untuk menandatangani kuitansi pinjaman uang' },
        { key: 'C', text: 'Siswa hanya merekam kalkulator di HP tanpa memberikan narasi penjelasan cara menghitungnya' },
        { key: 'D', text: 'Siswa menyalin artikel Wikipedia tentang sejarah pertanian dunia tanpa ada hitungan rupiah lokal' },
        { key: 'E', text: 'Siswa mengakhiri rekaman video pada detik ke-30' }
      ],
      correct: 'A',
      explanation: 'Demonstrasi matematis dengan media visual kalkulasi mempermudah audiens memahami struktur laba rugi usaha.'
    }
  ],

  perkebunan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa kebun kelapa sawit di Belitang, siswa mengulas rekayasa sistem penanaman pola segitiga sama sisi (mata lima). Keunggulan rekayasa tata ruang ini adalah...',
      options: [
        { key: 'A', text: 'Mengoptimalkan jarak tangkapan sinar matahari antar tajuk daun pelepah kelapa sawit dan menampung populasi pohon hingga 136–143 pohon per hektar secara efisien' },
        { key: 'B', text: 'Membuat kebun kelapa sawit tampak seperti bentuk bintang dari luar angkasa' },
        { key: 'C', text: 'Memudahkan babi hutan berlari lurus tanpa menabrak pohon' },
        { key: 'D', text: 'Mencegah daun kelapa sawit rontok saat musim kemarau' },
        { key: 'E', text: 'Mengurangi kebutuhan pupuk sawit hingga 90%' }
      ],
      correct: 'A',
      explanation: 'Pola mata lima memaksimalkan luas penerimaan radiasi surya tanpa kanopi saling tumpang tindih berlebih pada densitas kanopi optimal.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada kebun karet rakyat, siswa mempresentasikan rekayasa talang getah dari lempeng seng dan kawat cincin mangkok gantung. Fungsi rekayasa mekanik ini adalah...',
      options: [
        { key: 'A', text: 'Mengarahkan tetesan lateks tepat ke dasar mangkok penampung tanpa merembes ke kulit batang serta menjaga mangkok tidak tumpah saat tersenggol angin' },
        { key: 'B', text: 'Menghasilkan aliran listrik mikro yang merangsang getah karet keluar lebih cepat' },
        { key: 'C', text: 'Sebagai perangkap serangga nyamuk kebun' },
        { key: 'D', text: 'Membuat mangkok karet berbunyi denting seperti lonceng saat penuh' },
        { key: 'E', text: 'Menutup seluruh batang pohon karet dari paparan udara' }
      ],
      correct: 'A',
      explanation: 'Talang dan cincin kawat elastis memandu cairan lateks secara gravitasi tepat ke titik tampung mangkok tanpa kehilangan ceceran getah.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala air sadapan karet tersiram air hujan di musim basah, siswa menerangkan rekayasa talang pelindung hujan (rain gutter) dari plastik di atas irisan sadap. Manfaat rekayasa ini adalah...',
      options: [
        { key: 'A', text: 'Mengalihkan aliran air hujan dari batang atas sehingga bidang sadap tetap kering dan penyadapan tetap dapat dilakukan tanpa getah hanyut terbuang' },
        { key: 'B', text: 'Membuat pohon karet menjadi hangat seperti memakai mantel musim dingin' },
        { key: 'C', text: 'Menampung air hujan untuk diminum oleh pekerja kebun di siang hari' },
        { key: 'D', text: 'Mengubah air hujan menjadi asam semut koagulan lateks secara otomatis' },
        { key: 'E', text: 'Membuat getah karet kering di atas pohon sebelum menetes ke mangkok' }
      ],
      correct: 'A',
      explanation: 'Rain gutter mencegah air hujan membasahi alur sadap, meniadakan risiko getah meluber keluar talang dan pembusukan kulit sadap.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Pada kebun sawit rakyat, siswa mengulas rekayasa susunan pelepah sengkleh (pruning) yang ditumpuk rapi di gawangan mati berbentuk letter U. Fungsi rekayasa lingkungan ini adalah...',
      options: [
        { key: 'A', text: 'Mencegah erosi tanah, menekan pertumbuhan gulma lalang, dan melapuk menjadi bahan organik alami kaya kalium bagi pohon sawit' },
        { key: 'B', text: 'Menyediakan tempat istirahat tidur bagi pekerja kebun setelah makan siang' },
        { key: 'C', text: 'Menghalangi jalan pemanen sawit agar tidak bisa membawa buah keluar kebun' },
        { key: 'D', text: 'Membuat kebun kelapa sawit menjadi seperti labirin permainan' },
        { key: 'E', text: 'Menghasilkan gas beracun pembasmi hama tikus kebun' }
      ],
      correct: 'A',
      explanation: 'Tumpukan pelepah di gawangan mati (pruning stacks) berfungsi sebagai penahan air limpasan, mulsa organik, dan penyumbang hara daur ulang.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam kalkulasi finansial kebun karet seluas 2 hektar (sekitar 800 pohon produktif), siswa merinci biaya bulanan: asam semut pembeku Rp150.000, pembersihan piringan herbisida Rp300.000, pupuk NPK Rp600.000, asah pisau dan mangkok Rp50.000. Total Biaya Operasional (BOP) bulanan adalah...',
      options: [
        { key: 'A', text: 'Rp1.100.000 per bulan' },
        { key: 'B', text: 'Rp2.500.000 per bulan' },
        { key: 'C', text: 'Rp800.000 per bulan' },
        { key: 'D', text: 'Rp3.000.000 per bulan' },
        { key: 'E', text: 'Rp500.000 per bulan' }
      ],
      correct: 'A',
      explanation: 'BOP bulanan = 150.000 + 300.000 + 600.000 + 50.000 = Rp1.100.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika kebun karet disadap dengan sistem bagi hasil 50:50 antara pemilik kebun dan pekerja penyadap, berapa kg bagian yang didapat pemilik jika kebun menghasilkan 600 kg bekuan karet bersih (bokar) dalam sebulan?',
      options: [
        { key: 'A', text: '300 kg untuk pemilik kebun dan 300 kg untuk penyadap' },
        { key: 'B', text: '400 kg untuk pemilik kebun dan 200 kg untuk penyadap' },
        { key: 'C', text: '150 kg untuk pemilik kebun dan 450 kg untuk penyadap' },
        { key: 'D', text: '600 kg seluruhnya untuk pemilik kebun' },
        { key: 'E', text: '500 kg untuk pemilik kebun dan 100 kg untuk penyadap' }
      ],
      correct: 'A',
      explanation: 'Sistem bagi hasil 50:50 membagi rata hasil produksi: 600 kg x 50% = 300 kg.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Pekebun menjual 300 kg bokar karet bersih hasil bagiannya ke Unit Pengolahan dan Pemasaran Bokar (UPPB) lelang dengan harga Rp13.000 per kg. Berapa total Omzet kotor yang diterima pekebun?',
      options: [
        { key: 'A', text: 'Rp3.900.000 per bulan' },
        { key: 'B', text: 'Rp2.600.000 per bulan' },
        { key: 'C', text: 'Rp5.200.000 per bulan' },
        { key: 'D', text: 'Rp1.950.000 per bulan' },
        { key: 'E', text: 'Rp4.500.000 per bulan' }
      ],
      correct: 'A',
      explanation: 'Omzet kotor = 300 kg x Rp13.000 = Rp3.900.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Jika Omzet penjualan bokar adalah Rp3.900.000 dan pekebun menanggung biaya pupuk serta herbisida kebun sebesar Rp900.000 per bulan, berapakah Laba Bersih pasif yang dikantongi pemilik kebun setiap bulannya?',
      options: [
        { key: 'A', text: 'Rp3.000.000 per bulan' },
        { key: 'B', text: 'Rp1.500.000 per bulan' },
        { key: 'C', text: 'Rp2.100.000 per bulan' },
        { key: 'D', text: 'Rp4.800.000 per bulan' },
        { key: 'E', text: 'Rp900.000 per bulan' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih = Omzet - Biaya Operasional = Rp3.900.000 - Rp900.000 = Rp3.000.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada akhir video rekaman 5–10 menit, siswa mengemukakan solusi inovasi kebun karet bersih (bokar bersih tanpa tatal dan tanah). Alasan finansial utama dari inovasi ini adalah...',
      options: [
        { key: 'A', text: 'Bokar bersih menghasilkan Kadar Karet Kering (KKK) di atas 60% sehingga pabrik/UPPB lelang berani membeli dengan harga Rp2.000–Rp3.000 lebih mahal per kg dibanding karet kotor rendam kolam' },
        { key: 'B', text: 'Bokar bersih membuat getah karet dapat dimakan seperti permen karet' },
        { key: 'C', text: 'Pabrik karet akan memberikan mobil baru secara gratis kepada pekebun' },
        { key: 'D', text: 'Pohon karet akan berhenti menghasilkan getah jika getahnya terlalu bersih' },
        { key: 'E', text: 'Karet bersih tidak membutuhkan biaya angkutan ke pabrik' }
      ],
      correct: 'A',
      explanation: 'Kualitas KKK tinggi tanpa kontaminan tatal/air rendaman memberikan insentif harga premium saat lelang UPPB.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Dalam video presentasi mandiri Day 6, cara siswa menerangkan alur perputaran uang kebun kelapa sawit/karet secara interaktif tanpa wawancara adalah...',
      options: [
        { key: 'A', text: 'Menjelaskan diagram alur finansial di buku catatan sambil menunjuk angka perbandingan antara harga jual tengkulak desa versus harga jual lelang kelompok tani' },
        { key: 'B', text: 'Merekam pohon kelapa sawit dari bawah sampai atas tanpa berbicara sepatah kata pun' },
        { key: 'C', text: 'Menyuruh teman memegang uang tunai palsu sambil menari di kebun sawit' },
        { key: 'D', text: 'Membacakan teks laporan keuangan perusahaan sawit nasional yang sangat panjang' },
        { key: 'E', text: 'Mengeluh tentang cuaca panas di kebun selama 10 menit penuh' }
      ],
      correct: 'A',
      explanation: 'Penyajian diagram perbandingan harga langsung memperjelas margin efisiensi saluran distribusi lelang kepada pemirsa.'
    }
  ],

  peternakan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa kandang sapi potong di Belitang, siswa mengulas kemiringan lantai kandang sebesar 2–5 derajat ke arah selokan belakang. Prinsip rekayasa drainase kandang ini adalah...',
      options: [
        { key: 'A', text: 'Memanfaatkan gravitasi agar air kencing dan air pembersihan kandang mengalir cepat ke saluran limbah sehingga lantai pijakan sapi selalu kering dan terhindar dari penyakit kuku (foot rot)' },
        { key: 'B', text: 'Membuat sapi dapat berseluncur saat bermain di dalam kandang' },
        { key: 'C', text: 'Membuat tempat pakan sapi berada lebih tinggi dari atap kandang' },
        { key: 'D', text: 'Mencegah sapi tidur di malam hari agar terus makan pakan konsentrat' },
        { key: 'E', text: 'Mengalirkan kotoran sapi langsung ke jalan raya desa' }
      ],
      correct: 'A',
      explanation: 'Kemiringan lantai mempermudah sanitasi harian dan meminimalkan kontak kuku sapi dengan kelembaban urin pemicu infeksi kuku.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada kandang ayam broiler modern, siswa menerangkan rekayasa ventilasi terowongan (tunnel ventilation) dengan tirai samping dan blower kipas exhaust. Prinsip rekayasa fluida udara ini adalah...',
      options: [
        { key: 'A', text: 'Menciptakan efek pendinginan angin (wind chill effect) berkecepatan 2–2,5 m/s untuk membuang panas tubuh ayam dan gas amonia dari dalam kandang tertutup' },
        { key: 'B', text: 'Menerbangkan ayam ke udara agar otot sayap ayam menjadi lebih kekar' },
        { key: 'C', text: 'Meniup pakan ayam dari ujung kandang ke ujung lainnya secara otomatis' },
        { key: 'D', text: 'Membuat suhu kandang menjadi minus 10 derajat Celcius seperti di kutub' },
        { key: 'E', text: 'Menggantikan peran lampu penerangan kandang di malam hari' }
      ],
      correct: 'A',
      explanation: 'Ventilasi terowongan menurunkan temperatur efektif (wind chill) dan memperbarui udara segar secara masif di kandang tertutup.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala kelangkaan rumput segar saat musim kemarau di OKU Timur, siswa memaparkan rekayasa pengolahan jerami amoniasi urea. Manfaat rekayasa kimia sederhana ini adalah...',
      options: [
        { key: 'A', text: 'Urea memutus ikatan lignoselulosa jerami padi kering yang keras, meningkatkan daya cerna (TDN) dan kandungan protein kasar dari 3% menjadi 7–8%' },
        { key: 'B', text: 'Mengubah jerami kering menjadi rumput gajah segar berwarna hijau menyala' },
        { key: 'C', text: 'Membuat jerami memiliki rasa daging sapi panggang yang disukai ternak' },
        { key: 'D', text: 'Menghilangkan kebutuhan air minum sapi selama musim kemarau' },
        { key: 'E', text: 'Membuat kotoran sapi tidak berbau selamanya' }
      ],
      correct: 'A',
      explanation: 'Amoniasi meregangkan ikatan lignin jerami padi dan menyuplai nitrogen bukan protein (NPN) untuk sintesis protein mikroba rumen.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa menunjukkan rekayasa instalasi reaktor biogas kubah beton (fixed dome) dari kotoran sapi. Keuntungan rekayasa energi terbarukan ini bagi peternak adalah...',
      options: [
        { key: 'A', text: 'Menghasilkan gas metana (CH4) gratis untuk bahan bakar kompor memasak rumah tangga dan menghasilkan pupuk organik cair/padat (slurry) bermutu tinggi' },
        { key: 'B', text: 'Menghasilkan bensin beroktan 98 untuk mengisi mobil peternak' },
        { key: 'C', text: 'Membuat kotoran sapi membeku menjadi batu permata' },
        { key: 'D', text: 'Menghilangkan seluruh kotoran sapi tanpa meninggalkan ampas sama sekali' },
        { key: 'E', text: 'Mengubah kandang sapi menjadi pembangkit listrik tenaga nuklir desa' }
      ],
      correct: 'A',
      explanation: 'Digester biogas mengubah limbah feses sapi menjadi energi gas metana bersih dan bio-slurry kaya hara tanah.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam usaha penggemukan 2 ekor sapi potong selama 100 hari (3,3 bulan), siswa merinci modal: pembelian 2 ekor pedet bakalan Rp24.000.000 (Rp12.000.000/ekor), pakan konsentrat & mineral Rp4.000.000, obat/vaksin Rp400.000, biaya angkut/tenaga Rp1.600.000. Total Modal Kerja yang dikeluarkan adalah...',
      options: [
        { key: 'A', text: 'Rp30.000.000' },
        { key: 'B', text: 'Rp25.000.000' },
        { key: 'C', text: 'Rp35.000.000' },
        { key: 'D', text: 'Rp28.000.000' },
        { key: 'E', text: 'Rp20.000.000' }
      ],
      correct: 'A',
      explanation: 'Total modal = 24.000.000 + 4.000.000 + 400.000 + 1.600.000 = Rp30.000.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika sapi mengalami pertambahan bobot badan harian (Average Daily Gain/ADG) sebesar 1,0 kg per hari, berapakah kenaikan total bobot hidup untuk 2 ekor sapi selama masa pemeliharaan 100 hari?',
      options: [
        { key: 'A', text: '200 kg total kenaikan bobot (100 kg per ekor)' },
        { key: 'B', text: '100 kg total kenaikan bobot' },
        { key: 'C', text: '300 kg total kenaikan bobot' },
        { key: 'D', text: '500 kg total kenaikan bobot' },
        { key: 'E', text: '50 kg total kenaikan bobot' }
      ],
      correct: 'A',
      explanation: 'Kenaikan bobot total = 2 ekor x 1,0 kg/hari x 100 hari = 200 kg.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Setelah 100 hari digemukkan, kedua ekor sapi tersebut dijual menjelang Idul Adha dengan harga Rp19.500.000 per ekor. Berapa total Omzet penjualan yang diperoleh peternak?',
      options: [
        { key: 'A', text: 'Rp39.000.000' },
        { key: 'B', text: 'Rp35.000.000' },
        { key: 'C', text: 'Rp42.000.000' },
        { key: 'D', text: 'Rp30.000.000' },
        { key: 'E', text: 'Rp25.000.000' }
      ],
      correct: 'A',
      explanation: 'Omzet total = 2 ekor x Rp19.500.000 = Rp39.000.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Dengan Omzet penjualan Rp39.000.000 dan total modal kerja yang telah dikeluarkan Rp30.000.000, berapakah Laba Bersih peternak untuk periode pemeliharaan 100 hari tersebut?',
      options: [
        { key: 'A', text: 'Rp9.000.000 (setara Rp2.700.000 per bulan atau Rp4.500.000 keuntungan per ekor)' },
        { key: 'B', text: 'Rp5.000.000' },
        { key: 'C', text: 'Rp12.000.000' },
        { key: 'D', text: 'Rp7.000.000' },
        { key: 'E', text: 'Rp3.000.000' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih = Omzet - Modal Kerja = Rp39.000.000 - Rp30.000.000 = Rp9.000.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada penutup video Day 6, siswa mengusulkan ide inovasi nilai tambah dari limbah kotoran sapi. Gagasan finansial yang paling menguntungkan dan ramah lingkungan adalah...',
      options: [
        { key: 'A', text: 'Mengolah kotoran padat sapi menjadi pupuk kompos bokashi terfermentasi yang dikemas dalam karung 20 kg seharga Rp25.000/karung, menghasilkan tambahan pendapatan sampingan peternak' },
        { key: 'B', text: 'Membuang seluruh kotoran ke parit desa di malam hari saat hujan agar tidak perlu membeli karung' },
        { key: 'C', text: 'Membakar kotoran sapi mentah di tengah pemukiman warga' },
        { key: 'D', text: 'Mengganti ransum pakan sapi dengan kotorannya sendiri' },
        { key: 'E', text: 'Menjual pedet bakalan sebelum sempat digemukkan di kandang' }
      ],
      correct: 'A',
      explanation: 'Monetisasi limbah pupuk kompos bokashi menciptakan sirkular ekonomi terpadu (zero waste livestock farming).'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Saat menyajikan naskah bicara 5–10 menit di depan kamera tanpa wawancara, bagaimana siswa menjelaskan rincian biaya pakan konsentrat secara meyakinkan?',
      options: [
        { key: 'A', text: 'Siswa memegang sampel pakan konsentrat di tangan sambil menyebutkan harga per karung Rp180.000 dan menghitung kebutuhan harian 3 kg per ekor secara lugas' },
        { key: 'B', text: 'Siswa berbisik-bisik agar pemilik peternakan tidak mendengar harga pakan yang disebutkan' },
        { key: 'C', text: 'Siswa mengarang angka triliunan rupiah yang tidak masuk akal untuk peternakan desa' },
        { key: 'D', text: 'Siswa meminta teman sekelasnya untuk berakting pura-pura menjadi pembeli sapi' },
        { key: 'E', text: 'Siswa merekam rumput liar di pinggir jalan tanpa menampilkan dirinya sama sekali' }
      ],
      correct: 'A',
      explanation: 'Visualisasi sampel bahan pakan disertai rincian biaya riil unit cost mencerminkan kompetensi literasi finansial siswa.'
    }
  ],

  perikanan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa kolam budidaya patin di Belitang, siswa mengulas konstruksi tanggul tanah dengan kemiringan talud 1:1,5 dan dilapisi anyaman bambu/waring. Alasan rekayasa konstruksi ini adalah...',
      options: [
        { key: 'A', text: 'Mencegah longsornya dinding tanggul akibat gerusan ombak kincir aerator dan rembesan air tanah yang labil di musim hujan' },
        { key: 'B', text: 'Membuat kolam tampak indah untuk tempat memancing wisatawan kota' },
        { key: 'C', text: 'Membuat ikan patin tidak bisa melihat bayangan manusia di atas tanggul' },
        { key: 'D', text: 'Menaikkan suhu air kolam agar ikan cepat matang' },
        { key: 'E', text: 'Menghemat tanah timbunan pematang kolam' }
      ],
      correct: 'A',
      explanation: 'Talud miring berlapis perkuatan menahan stabilitas geser tanggul tanah dari beban hidrostatis air dan erosi turbulensi kincir.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada kolam terpal bioflok lele, siswa menerangkan rekayasa pipa pembuangan sistem monik/standpipe bertingkat. Fungsi rekayasa hidrolika ini adalah...',
      options: [
        { key: 'A', text: 'Membuang endapan kotoran dasar kolam yang pekat saat pipa dalam dicabut tanpa menguras air lapisan atas yang kaya mikroba bioflok' },
        { key: 'B', text: 'Membuat air kolam mengalir ke atas seperti air mancur menari' },
        { key: 'C', text: 'Menyedot lumut kolam untuk dijadikan pakan burung' },
        { key: 'D', text: 'Mencegah hujan masuk ke dalam kolam bioflok' },
        { key: 'E', text: 'Sebagai tempat persembunyian lele saat hendak ditangkap' }
      ],
      correct: 'A',
      explanation: 'Pipa ganda standpipe memungkinkan pembuangan lumpur anaerob dasar secara selektif dengan mempertahankan volume bioflok produktif.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala mahalnya harga pelet pabrik yang memakan 70% biaya budidaya, siswa mempresentasikan rekayasa pakan alternatif mandiri berbasis Maggot BSF (Black Soldier Fly). Keunggulan rekayasa pakan ini adalah...',
      options: [
        { key: 'A', text: 'Larva maggot kaya protein kasar (40–44%) dan asam lemak yang dibudidayakan dari limbah organik pasar/dapur dengan biaya sangat murah' },
        { key: 'B', text: 'Maggot membuat ikan lele berubah warna menjadi putih seperti ikan koi' },
        { key: 'C', text: 'Larva maggot dapat hidup di dalam perut ikan selamanya tanpa dicerna' },
        { key: 'D', text: 'Menghilangkan kebutuhan ikan terhadap oksigen di dalam air' },
        { key: 'E', text: 'Membuat ikan patin bertelur emas di dasar kolam' }
      ],
      correct: 'A',
      explanation: 'Biokonversi limbah organik oleh maggot BSF menghasilkan pakan biomassa protein tinggi bernilai nutrisi setara tepung ikan impor.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa mengulas rekayasa peneduh paranet 60% di atas kolam pendederan benih patin. Fungsi rekayasa proteksi cuaca ini adalah...',
      options: [
        { key: 'A', text: 'Mereduksi intensitas sinar matahari terik di siang hari agar suhu air tidak melonjak ekstrem dan memecah benturan tetesan air hujan lebat yang dapat merusak benih halus' },
        { key: 'B', text: 'Menangkap serangga kelelawar malam agar tidak jatuh ke kolam' },
        { key: 'C', text: 'Membuat suasana kolam menjadi gelap gulita selama 24 jam' },
        { key: 'D', text: 'Mencegah air kolam mengalir ke saluran pembuangan' },
        { key: 'E', text: 'Sebagai jemuran pakaian pekerja tambak di tepi kolam' }
      ],
      correct: 'A',
      explanation: 'Shading net meredam fluktuasi suhu permukaan (termoklin) dan melunakkan impak mekanik air hujan yang memicu mortalitas larva patin.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam 1 siklus budidaya ikan patin 1 kolam (tebar 3.000 ekor benih selama 6 bulan), siswa merinci modal: benih patin ukuran 2 inci Rp750.000 (Rp250/ekor), pakan pelet komersial 1.500 kg (50 sak) Rp6.500.000, listrik pompa/kincir Rp600.000, probiotik & garam krosok Rp350.000. Total Biaya Operasional (BOP) adalah...',
      options: [
        { key: 'A', text: 'Rp8.200.000' },
        { key: 'B', text: 'Rp6.000.000' },
        { key: 'C', text: 'Rp10.500.000' },
        { key: 'D', text: 'Rp7.000.000' },
        { key: 'E', text: 'Rp5.500.000' }
      ],
      correct: 'A',
      explanation: 'Total BOP = 750.000 + 6.500.000 + 600.000 + 350.000 = Rp8.200.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika dari 3.000 benih yang ditebar diperoleh tingkat kelulushidupan (Survival Rate/SR) sebesar 85% dengan bobot rata-rata saat panen 500 gram (0,5 kg) per ekor, berapa kg total tonase panen ikan patin yang dihasilkan?',
      options: [
        { key: 'A', text: '1.275 kg ikan patin (2.550 ekor hidup x 0,5 kg)' },
        { key: 'B', text: '1.500 kg ikan patin' },
        { key: 'C', text: '1.000 kg ikan patin' },
        { key: 'D', text: '2.000 kg ikan patin' },
        { key: 'E', text: '850 kg ikan patin' }
      ],
      correct: 'A',
      explanation: 'Jumlah ikan panen = 3.000 x 85% = 2.550 ekor. Total bobot panen = 2.550 x 0,5 kg = 1.275 kg.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Hasil panen 1.275 kg ikan patin tersebut dijual ke pedagang pengepul pasar Belitang dengan harga Rp11.000 per kg. Berapa total Omzet kotor yang diperoleh pembudidaya?',
      options: [
        { key: 'A', text: 'Rp14.025.000' },
        { key: 'B', text: 'Rp11.500.000' },
        { key: 'C', text: 'Rp16.200.000' },
        { key: 'D', text: 'Rp12.000.000' },
        { key: 'E', text: 'Rp9.800.000' }
      ],
      correct: 'A',
      explanation: 'Omzet kotor = 1.275 kg x Rp11.000 = Rp14.025.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Dengan Omzet penjualan Rp14.025.000 dan total Biaya Operasional (BOP) sebesar Rp8.200.000, berapakah Laba Bersih yang diperoleh peternak untuk siklus 6 bulan tersebut?',
      options: [
        { key: 'A', text: 'Rp5.825.000 (setara laba margin 41,5% dari modal biaya)' },
        { key: 'B', text: 'Rp3.500.000' },
        { key: 'C', text: 'Rp7.200.000' },
        { key: 'D', text: 'Rp4.000.000' },
        { key: 'E', text: 'Rp2.100.000' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih = Omzet - BOP = Rp14.025.000 - Rp8.200.000 = Rp5.825.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada akhir video 5–10 menit, siswa merumuskan gagasan hilirisasi hasil panen patin untuk meningkatkan margin laba. Ide inovasi nilai tambah yang paling tepat adalah...',
      options: [
        { key: 'A', text: 'Mengolah sebagian ikan patin segar menjadi produk olahan bernilai tinggi seperti fillet patin beku, abon ikan, dan kerupuk kemplang ikan patin khas Belitang' },
        { key: 'B', text: 'Membuang ikan patin ke sungai jika harga di pasar turun Rp500 per kg' },
        { key: 'C', text: 'Menjual kolam ikan kepada pengembang perumahan mewah' },
        { key: 'D', text: 'Membiarkan ikan patin di dalam kolam selama 5 tahun tanpa dipanen' },
        { key: 'E', text: 'Mengganti air kolam dengan air soda manis berwarna merah' }
      ],
      correct: 'A',
      explanation: 'Diversifikasi produk olahan fillet dan kemplang patin menyerap kelebihan pasokan saat panen raya dan mendongkrak margin penjualan.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Bagaimana siswa menyajikan perhitungan rasio pakan FCR (Feed Conversion Ratio) di dalam video mandiri tanpa mewawancarai orang lain?',
      options: [
        { key: 'A', text: 'Siswa menuliskan rumus FCR = Total Pakan / Total Bobot Ikan di kertas chart, lalu membagikan 1.500 kg pakan dengan 1.275 kg hasil panen hingga didapat FCR 1,17 yang sangat efisien' },
        { key: 'B', text: 'Siswa menanyakan rumus FCR kepada orang yang sedang memancing di sebelah kolam' },
        { key: 'C', text: 'Siswa menyalin angka dari kalkulator tanpa menjelaskan makna angka FCR tersebut' },
        { key: 'D', text: 'Siswa menebak angka FCR berdasarkan warna air kolam' },
        { key: 'E', text: 'Siswa melewati pembahasan pakan dan langsung mengakhiri video' }
      ],
      correct: 'A',
      explanation: 'Perhitungan matematis FCR secara runtut menunjukkan penguasaan efisiensi biokonversi pakan budidaya perikanan.'
    }
  ],

  industri: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa pabrik Rice Milling Unit (RMU) di Belitang, siswa mengulas rekayasa sistem konveyor mangkok (bucket elevator) bertingkat. Keunggulan rekayasa otomasi pemindahan bahan ini adalah...',
      options: [
        { key: 'A', text: 'Mengangkut gabah dan beras secara vertikal antarmesin (dari husker ke polisher) secara gravitasi dan mekanik kontinu tanpa tenaga angkat manual karung' },
        { key: 'B', text: 'Sebagai wahana permainan luncuran untuk anak-anak di sekitar pabrik' },
        { key: 'C', text: 'Mengubah beras pecah kulit menjadi beras ketan hitam' },
        { key: 'D', text: 'Mendinginkan suhu ruangan pabrik RMU menjadi sangat sejuk' },
        { key: 'E', text: 'Menghilangkan sekam padi dengan cara ditiup angin kipas kecil' }
      ],
      correct: 'A',
      explanation: 'Bucket elevator memindahkan material ruah secara vertikal efisien, menyambungkan alur proses giling tanpa hambatan logistik manual.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada pabrik pembuatan kemplang panggang, siswa menerangkan rekayasa tungku pemanggang arang berputar (rotary grill). Prinsip rekayasa termal alat ini adalah...',
      options: [
        { key: 'A', text: 'Memutar kemplang secara konstan di atas bara arang kelapa sehingga pemanasan merata di kedua sisi, mencegah bagian gosong, dan kemplang mengembang sempurna' },
        { key: 'B', text: 'Menghilangkan kebutuhan arang kayu sehingga kemplang matang dengan tenaga angin' },
        { key: 'C', text: 'Mengubah kemplang ikan menjadi kerupuk udang' },
        { key: 'D', text: 'Membuat asap arang terserap ke dalam kemplang hingga berwarna hitam arang' },
        { key: 'E', text: 'Membuat kemplang tidak bisa basi selama 50 tahun' }
      ],
      correct: 'A',
      explanation: 'Distribusi panas rotasional menjamin paparan radiasi inframerah bara arang seragam ke seluruh permukaan matriks adonan kemplang.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala tingginya persentase beras patah (menir) saat musim hujan karena gabah kurang kering, siswa memaparkan rekayasa mesin pengering sirkulasi (circulating flat-bed dryer). Cara kerja rekayasa termal ini adalah...',
      options: [
        { key: 'A', text: 'Menghembuskan udara panas terkontrol (40–45 derajat Celcius) dari tungku sekam melintasi tumpukan gabah berputar lambat, menurunkan kadar air seragam tanpa keretakan beras' },
        { key: 'B', text: 'Membakar gabah dengan api langsung bersuhu 300 derajat Celcius agar kering dalam 1 menit' },
        { key: 'C', text: 'Menyimpan gabah di dalam kulkas pembeku es batu' },
        { key: 'D', text: 'Menjemur gabah di bawah sinar lampu senter baterai' },
        { key: 'E', text: 'Menyiram gabah dengan alkohol murni agar airnya menguap seketika' }
      ],
      correct: 'A',
      explanation: 'Pengeringan mekanik suhu rendah terkendali mencegah tegangan termal (thermal stress crack) pada endosperma beras gabah.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa mengulas rekayasa siklon pemisah debu sekam (cyclone dust collector) pada cerobong RMU. Keuntungan rekayasa lingkungan ini bagi masyarakat sekitar pabrik adalah...',
      options: [
        { key: 'A', text: 'Gaya sentrifugal memisahkan partikel debu sekam dan abu dari aliran udara buangan, mengendapkannya ke penampungan bawah sehingga udara sekitar pabrik tetap bersih tidak berdebu' },
        { key: 'B', text: 'Mengubah debu sekam menjadi asap wangi parfum ruangan' },
        { key: 'C', text: 'Membuat mesin RMU tidak mengeluarkan suara bising sama sekali' },
        { key: 'D', text: 'Menaikkan produksi beras menjadi sepuluh kali lipat lebih banyak' },
        { key: 'E', text: 'Menghilangkan kebutuhan cerobong asap pada pabrik' }
      ],
      correct: 'A',
      explanation: 'Siklon mengendapkan partikulat padat debu sekam berbasis inersia sentrifugasi, menjaga kualitas baku mutu udara lingkungan permukiman.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam 1 hari operasional penggilingan padi kapasitas kecil di Belitang (menggiling 4.000 kg GKP), siswa merinci biaya harian: pembelian gabah Rp26.000.000 (Rp6.500/kg), solar mesin diesel 15 liter Rp180.000, upah 2 orang operator Rp250.000, karung kemasan 250 lembar Rp375.000, penyusutan mesin Rp100.000. Total Biaya Operasional harian adalah...',
      options: [
        { key: 'A', text: 'Rp26.905.000' },
        { key: 'B', text: 'Rp24.500.000' },
        { key: 'C', text: 'Rp28.000.000' },
        { key: 'D', text: 'Rp25.000.000' },
        { key: 'E', text: 'Rp22.800.000' }
      ],
      correct: 'A',
      explanation: 'Total BOP harian = 26.000.000 + 180.000 + 250.000 + 375.000 + 100.000 = Rp26.905.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika rendemen penggilingan padi adalah 65% beras putih (beras kepala dan patah), berapa kg beras putih yang dihasilkan dari penggilingan 4.000 kg GKP tersebut?',
      options: [
        { key: 'A', text: '2.600 kg beras putih (setara 260 karung isi 10 kg)' },
        { key: 'B', text: '2.000 kg beras putih' },
        { key: 'C', text: '3.000 kg beras putih' },
        { key: 'D', text: '1.800 kg beras putih' },
        { key: 'E', text: '3.500 kg beras putih' }
      ],
      correct: 'A',
      explanation: 'Hasil beras = 4.000 kg x 65% = 2.600 kg.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Beras putih sebanyak 2.600 kg tersebut dijual dengan harga Rp11.500 per kg, dan hasil samping bekatul sebanyak 320 kg dijual seharga Rp3.000 per kg ke peternak sapi. Berapakah total Omzet kotor yang diperoleh pabrik RMU hari itu?',
      options: [
        { key: 'A', text: 'Rp30.860.000 (Rp29.900.000 dari beras + Rp960.000 dari bekatul)' },
        { key: 'B', text: 'Rp28.500.000' },
        { key: 'C', text: 'Rp32.000.000' },
        { key: 'D', text: 'Rp29.900.000' },
        { key: 'E', text: 'Rp25.000.000' }
      ],
      correct: 'A',
      explanation: 'Omzet beras = 2.600 x 11.500 = Rp29.900.000. Omzet bekatul = 320 x 3.000 = Rp960.000. Total = Rp30.860.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Dengan Omzet harian Rp30.860.000 dan total Biaya Operasional (BOP) Rp26.905.000, berapakah Laba Bersih harian pengusaha RMU tersebut?',
      options: [
        { key: 'A', text: 'Rp3.955.000 per hari operasi' },
        { key: 'B', text: 'Rp2.100.000 per hari operasi' },
        { key: 'C', text: 'Rp5.000.000 per hari operasi' },
        { key: 'D', text: 'Rp1.500.000 per hari operasi' },
        { key: 'E', text: 'Rp2.800.000 per hari operasi' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih = Omzet - BOP = Rp30.860.000 - Rp26.905.000 = Rp3.955.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada akhir video 5–10 menit, siswa merumuskan gagasan komersialisasi limbah sekam padi sisa gilingan RMU. Inovasi finansial yang diajukan siswa adalah...',
      options: [
        { key: 'A', text: 'Memadatkan sekam padi menjadi briket arang biomassa padat bernilai kalor tinggi yang dijual ke industri tahu dan rumah makan sebagai pengganti gas elpiji' },
        { key: 'B', text: 'Menimbun sekam di pinggir jalan umum sampai menggunung tinggi' },
        { key: 'C', text: 'Menghanyutkan sekam padi ke saluran irigasi BK Belitang' },
        { key: 'D', text: 'Menjual sekam padi ke luar negeri dengan harga Rp1.000.000 per kg' },
        { key: 'E', text: 'Mencampurkan sekam mentah ke dalam beras kemasan untuk menambah bobot' }
      ],
      correct: 'A',
      explanation: 'Densifikasi sekam menjadi briket bio-arang mendaur ulang limbah padat menjadi sumber pendapatan energi alternatif bernilai ekonomi.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Cara penyampaian siswa yang paling komunikatif saat membedah HPP beras per kg di dalam rekaman video mandiri adalah...',
      options: [
        { key: 'A', text: 'Menjelaskan perbandingan biaya gabah mentah per kg dibagi persentase rendemen beras (Rp6.500 / 0,65 = Rp10.000 HPP) secara lugas di papan tulis ringkas' },
        { key: 'B', text: 'Merekam mesin penggiling yang sedang berputar bising tanpa ada suara bicara manusia' },
        { key: 'C', text: 'Menyuruh operator pabrik menjawab pertanyaan ujian siswa' },
        { key: 'D', text: 'Membaca deretan angka tanpa menyebutkan satuan rupiah' },
        { key: 'E', text: 'Menghentikan rekaman video saat baru berjalan 1 menit' }
      ],
      correct: 'A',
      explanation: 'Penjabaran rumus HPP berbasis faktor rendemen membuktikan pemahaman matematika finansial operasional manufaktur agro-industri.'
    }
  ],

  perdagangan: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa kios perdagangan saprotan di Belitang, siswa mengulas rekayasa tata letak (layout) gudang palet bertingkat. Prinsip rekayasa ruang penyimpanan ini adalah...',
      options: [
        { key: 'A', text: 'Memanfaatkan ruang vertikal gudang dengan jarak antar-lorong minimal 1,2 meter untuk manuver gerobak angkut dan ventilasi silang pencegah kelembaban pupuk' },
        { key: 'B', text: 'Menumpuk karung pupuk setinggi mungkin sampai menyentuh genteng atap toko' },
        { key: 'C', text: 'Menaruh seluruh barang dagangan di halaman luar toko terkena terik matahari' },
        { key: 'D', text: 'Membuat gudang gelap tanpa lampu penerangan sama sekali' },
        { key: 'E', text: 'Mengunci pintu gudang selamanya agar barang tidak berkurang' }
      ],
      correct: 'A',
      explanation: 'Ergonomi tata letak lorong dan batas ketinggian tumpukan palet menjamin keselamatan pekerja serta sirkulasi udara pencegah caking pupuk.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada toko sembako dan grosir, siswa menerangkan rekayasa etalase kasir dengan jalur antrean satu arah (single line queue). Keunggulan rekayasa antrean ini adalah...',
      options: [
        { key: 'A', text: 'Mencegah penumpukan pembeli yang saling berebut, mempercepat waktu pelayanan per transaksi, dan memposisikan barang implusif (permen/snack) di sepanjang jalur antre' },
        { key: 'B', text: 'Membuat pembeli bosan dan membatalkan niat belanja' },
        { key: 'C', text: 'Memaksa pembeli untuk berlari saat membayar di meja kasir' },
        { key: 'D', text: 'Menghalangi jalan masuk bagi pembeli yang membawa uang tunai' },
        { key: 'E', text: 'Menutup kasir toko saat pembeli mulai ramai' }
      ],
      correct: 'A',
      explanation: 'Sistem antrean satu arah menerapkan antrean adil FIFO dan mendongkrak penjualan impulsif pada rak pembatas jalur kasir.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala pencatatan manual stok barang yang rawan selisih dan hilang, siswa memaparkan rekayasa sistem barcode scanner dan software kasir Point of Sale (POS) di smartphone. Cara kerja rekayasa digital ini adalah...',
      options: [
        { key: 'A', text: 'Scanner membaca kode barcode produk secara instan, memotong jumlah stok di database secara otomatis, dan mencatat nilai omzet kas harian tanpa risiko salah hitung' },
        { key: 'B', text: 'Scanner mencetak uang kertas baru setiap kali barang dibeli' },
        { key: 'C', text: 'Software kasir menebak harga barang tanpa perlu dimasukkan datanya' },
        { key: 'D', text: 'Barcode scanner membunyikan musik dangdut saat kasir dibuka' },
        { key: 'E', text: 'Aplikasi menghapus seluruh utang toko kepada distributor secara sepihak' }
      ],
      correct: 'A',
      explanation: 'Sistem barcode POS mengotomasi pemutakhiran stok kartu persediaan (perpetual inventory) dan mencegah kebocoran kas kasir.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa mengulas rekayasa pengemasan ulang (repacking) komoditas curah seperti gula pasir dan beras dari karung 50 kg menjadi kemasan standing pouch 1 kg dan 500 gram berlabel toko. Manfaat rekayasa kemasan ini adalah...',
      options: [
        { key: 'A', text: 'Memberikan kepraktisan bagi konsumen rumah tangga harian, menjaga higienitas anti semut/debu, dan menghasilkan margin keuntungan per kg lebih tinggi' },
        { key: 'B', text: 'Mengurangi berat gula menjadi hanya 800 gram per kemasan 1 kg secara curang' },
        { key: 'C', text: 'Membuat gula pasir berubah rasa menjadi garam asin' },
        { key: 'D', text: 'Membuat kemasan mudah sobek saat dipegang pembeli' },
        { key: 'E', text: 'Menghilangkan kebutuhan timbangan pada saat transaksi' }
      ],
      correct: 'A',
      explanation: 'Repacking fraksionasi ritel menambah utilitas bentuk bagi pembeli eceran dan menghasilkan margin unit lebih tebal dibanding grosir utuh.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam kalkulasi finansial toko sembako, siswa merinci modal kulakan mingguan: beras 500 kg Rp5.500.000, minyak goreng 20 dus Rp3.600.000, gula pasir 200 kg Rp3.000.000, telur ayam 10 peti Rp2.500.000, tepung & mie Rp1.400.000. Total Biaya Kulakan Stok (Harga Pokok Penjualan/HPP barang) adalah...',
      options: [
        { key: 'A', text: 'Rp16.000.000 per minggu' },
        { key: 'B', text: 'Rp12.500.000 per minggu' },
        { key: 'C', text: 'Rp18.000.000 per minggu' },
        { key: 'D', text: 'Rp14.000.000 per minggu' },
        { key: 'E', text: 'Rp20.000.000 per minggu' }
      ],
      correct: 'A',
      explanation: 'Total HPP kulakan = 5.500.000 + 3.600.000 + 3.000.000 + 2.500.000 + 1.400.000 = Rp16.000.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Jika biaya operasional mingguan toko (listrik penerangan & kulkas Rp150.000, kantong kresek/kemasan Rp100.000, bensin angkut motor roda tiga Rp150.000) adalah Rp400.000, berapa total modal perputaran yang dibutuhkan untuk siklus 1 minggu?',
      options: [
        { key: 'A', text: 'Rp16.400.000' },
        { key: 'B', text: 'Rp15.000.000' },
        { key: 'C', text: 'Rp17.500.000' },
        { key: 'D', text: 'Rp16.000.000' },
        { key: 'E', text: 'Rp14.500.000' }
      ],
      correct: 'A',
      explanation: 'Total modal perputaran = Rp16.000.000 (kulakan) + Rp400.000 (operasional) = Rp16.400.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Toko menerapkan rata-rata margin keuntungan 15% di atas harga kulakan barang. Jika seluruh barang kulakan Rp16.000.000 tersebut habis terjual dalam tempo 1 minggu, berapa total Omzet penjualan kotor toko?',
      options: [
        { key: 'A', text: 'Rp18.400.000 (modal Rp16.000.000 + margin Rp2.400.000)' },
        { key: 'B', text: 'Rp17.000.000' },
        { key: 'C', text: 'Rp19.500.000' },
        { key: 'D', text: 'Rp16.500.000' },
        { key: 'E', text: 'Rp20.000.000' }
      ],
      correct: 'A',
      explanation: 'Omzet kotor = HPP + (15% x HPP) = 16.000.000 + 2.400.000 = Rp18.400.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Dari Omzet kotor Rp18.400.000, dikurangi modal kulakan Rp16.000.000 dan biaya operasional mingguan Rp400.000, berapakah Laba Bersih yang diperoleh pedagang toko dalam 1 minggu?',
      options: [
        { key: 'A', text: 'Rp2.000.000 per minggu (setara Rp8.000.000 per bulan)' },
        { key: 'B', text: 'Rp1.200.000 per minggu (setara Rp4.800.000 per bulan)' },
        { key: 'C', text: 'Rp2.800.000 per minggu (setara Rp11.200.000 per bulan)' },
        { key: 'D', text: 'Rp3.500.000 per minggu (setara Rp14.000.000 per bulan)' },
        { key: 'E', text: 'Rp800.000 per minggu (setara Rp3.200.000 per bulan)' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih mingguan = Rp18.400.000 - Rp16.000.000 - Rp400.000 = Rp2.000.000. Dalam 1 bulan (4 minggu) = Rp8.000.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada penutup video Day 6 (menit 07:30–10:00), siswa mengusulkan solusi inovasi pembayaran nontunai QRIS dan layanan pesan antar WhatsApp desa. Manfaat inovasi finansial ini adalah...',
      options: [
        { key: 'A', text: 'Memperluas jangkauan pelanggan rumah tangga sibuk di desa, mempermudah uang pas tanpa repot kembalian receh, dan uang penjualan langsung masuk ke rekening aman dari risiko pencurian kasir' },
        { key: 'B', text: 'Membuat pembeli tidak perlu membayar barang belanjaannya selamanya' },
        { key: 'C', text: 'Menghilangkan keharusan toko memiliki stok barang fisik' },
        { key: 'D', text: 'Membuat toko kelontong di desa dapat bersaing dengan mall di luar negeri tanpa modal' },
        { key: 'E', text: 'Mengubah nama pemilik toko menjadi nama pejabat bank' }
      ],
      correct: 'A',
      explanation: 'Inovasi omni-channel WhatsApp ordering dan QRIS meningkatkan perputaran omzet dan menekan risiko human error uang kembalian.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Dalam format video mandiri tanpa wawancara, bagaimana siswa menampilkan pemahaman kendala piutang kasbon di desa secara bijak dan solutif?',
      options: [
        { key: 'A', text: 'Menjelaskan risiko macetnya modal perputaran akibat kasbon warga, lalu mengusulkan SOP batas plafon maksimal kasbon Rp200.000 per warga dan jadwal pelunasan pascapanen padi' },
        { key: 'B', text: 'Menempelkan foto wajah warga yang berutang di dinding depan toko sambil memarahinya' },
        { key: 'C', text: 'Menyuruh warga desa berdemonstrasi di depan kantor kecamatan' },
        { key: 'D', text: 'Menghapus seluruh catatan utang dan menutup toko kelontong selamanya' },
        { key: 'E', text: 'Mengajak penonton video berkelahi di jalan raya' }
      ],
      correct: 'A',
      explanation: 'Usulan SOP manajemen plafon piutang membuktikan kemampuan berpikir kritis finansial memitigasi risiko kredit usaha pedesaan.'
    }
  ],

  formal: [
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Dalam penjelasan video rekayasa gerai agen BRILink/BUMDes di Belitang, siswa mengulas rekayasa loket meja transaksi bersekat akrilik dengan celah baki geser (cash pass-through tray). Prinsip rekayasa keselamatan fisik ini adalah...',
      options: [
        { key: 'A', text: 'Membatasi jangkauan tangan orang luar ke area laci uang dan mesin EDC serta melindungi kerahasiaan nominal dan tombol PIN nasabah saat bertransaksi' },
        { key: 'B', text: 'Membuat gerai agen terlihat seperti loket tiket wahana rekreasi' },
        { key: 'C', text: 'Mencegah suara nasabah terdengar oleh petugas loket' },
        { key: 'D', text: 'Mencegah udara segar masuk ke dalam ruangan agen' },
        { key: 'E', text: 'Menghindari keharusan agen tersenyum kepada nasabah' }
      ],
      correct: 'A',
      explanation: 'Physical barrier akrilik dan cash tray mengamankan perimeter kerja agen dari aksi kejahatan perampasan serta menjaga privasi transaksi.'
    },
    {
      indicatorCode: 'A',
      indicatorName: 'Rekayasa Teknis & Desain Solusi Lapangan',
      question: 'Pada jaringan internet agen perbankan desa yang sering terganggu cuaca mendung, siswa menerangkan rekayasa sistem Dual-SIM failover router pada mesin transaksi. Cara kerja rekayasa jaringan ini adalah...',
      options: [
        { key: 'A', text: 'Router secara otomatis mengalihkan koneksi data dari Provider A ke Provider B dalam hitungan detik jika sinyal utama drop sehingga transaksi transfer tidak terputus' },
        { key: 'B', text: 'Menggandakan saldo rekening agen menjadi dua kali lipat saat sinyal internet lemah' },
        { key: 'C', text: 'Menghubungkan mesin EDC ke satelit luar angkasa secara manual menggunakan kawat jemuran' },
        { key: 'D', text: 'Mematikan seluruh lampu di desa saat transaksi sedang berlangsung' },
        { key: 'E', text: 'Mengubah sinyal internet menjadi uang tunai kertas' }
      ],
      correct: 'A',
      explanation: 'Redundansi jaringan multi-SIM failover menjamin ketersediaan sistem transaksi (high availability SLA) di wilayah blankspot pedesaan.'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Untuk mengatasi kendala modus penipuan bukti transfer editan (struk palsu via WA), siswa mempresentasikan rekayasa SOP verifikasi mutasi rekening real-time. Cara kerja rekayasa prosedur kerja ini adalah...',
      options: [
        { key: 'A', text: 'Agen wajib memeriksa notifikasi mutasi saldo masuk pada aplikasi internet banking resmi sendiri terlebih dahulu sebelum menyerahkan uang tunai fisik kepada pelanggan' },
        { key: 'B', text: 'Agen mempercayai tangkapan layar HP pelanggan tanpa perlu memeriksa rekening bank' },
        { key: 'C', text: 'Agen menelepon kantor pusat polisi setiap kali ada nasabah yang hendak menarik uang' },
        { key: 'D', text: 'Agen meminta KTP nasabah lalu menyimpannya di brankas selama satu tahun' },
        { key: 'E', text: 'Agen menolak melayani seluruh nasabah yang membawa smartphone' }
      ],
      correct: 'A',
      explanation: 'SOP verifikasi internal mutasi rekening mutlak diperlukan untuk menangkal rekayasa sosial manipulasi bukti transfer digital (fake receipt).'
    },
    {
      indicatorCode: 'B',
      indicatorName: 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
      question: 'Siswa mengulas rekayasa pengamanan penataan laci kasir dua tingkat (dual-drawer security). Aspek rekayasa pengamanan kas tunai ini adalah...',
      options: [
        { key: 'A', text: 'Laci atas hanya menampung uang receh dan uang operasional harian terbatas (Rp2–3 juta), sedangkan uang nominal besar segera dimasukkan ke brankas bawah bersandi tersembunyi' },
        { key: 'B', text: 'Menaruh seluruh uang tunai puluhan juta rupiah di atas meja kasir agar terlihat ramai oleh warga yang lewat' },
        { key: 'C', text: 'Menyimpan uang tunai di dalam bungkus makanan ringan agar tidak dikenali' },
        { key: 'D', text: 'Membagikan uang tunai kepada orang yang sedang mengantre di gerai' },
        { key: 'E', text: 'Mengunci laci kasir dan membuang anak kuncinya ke dalam sungai' }
      ],
      correct: 'A',
      explanation: 'Sistem laci berganda membatasi eksposur kerugian maksimal (exposure limit) jika terjadi tindak kriminalitas pemaksaan di konter loket.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Dalam kalkulasi likuiditas gerai agen BRILink desa, siswa merinci modal kerja: saldo rekening giro bank Rp35.000.000 dan kas tunai di brankas Rp25.000.000. Berapakah total Modal Likuiditas yang dikelola agen untuk melayani transaksi warga desa?',
      options: [
        { key: 'A', text: 'Rp60.000.000' },
        { key: 'B', text: 'Rp50.000.000' },
        { key: 'C', text: 'Rp75.000.000' },
        { key: 'D', text: 'Rp40.000.000' },
        { key: 'E', text: 'Rp30.000.000' }
      ],
      correct: 'A',
      explanation: 'Total modal likuiditas = Saldo Bank (Rp35.000.000) + Kas Tunai (Rp25.000.000) = Rp60.000.000.'
    },
    {
      indicatorCode: 'C',
      indicatorName: 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
      question: 'Agen melayani rata-rata 40 transaksi per hari dengan pembagian biaya admin jasa Rp5.000 per transaksi. Berapa total Omzet kotor pendapatan fee administrasi agen dalam 1 hari?',
      options: [
        { key: 'A', text: 'Rp200.000 per hari (setara Rp6.000.000 per bulan 30 hari)' },
        { key: 'B', text: 'Rp150.000 per hari (setara Rp4.500.000 per bulan)' },
        { key: 'C', text: 'Rp300.000 per hari (setara Rp9.000.000 per bulan)' },
        { key: 'D', text: 'Rp100.000 per hari (setara Rp3.000.000 per bulan)' },
        { key: 'E', text: 'Rp250.000 per hari (setara Rp7.500.000 per bulan)' }
      ],
      correct: 'A',
      explanation: 'Omzet kotor harian = 40 transaksi x Rp5.000 = Rp200.000. Dalam 1 bulan (30 hari) = Rp6.000.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Jika dari fee Rp5.000 per transaksi, sistem bank induk memotong bagi hasil resmi Rp2.000 per transaksi, dan sisa fee bersih yang diterima agen adalah Rp3.000 per transaksi, berapa pendapatan fee bersih agen untuk 40 transaksi per hari?',
      options: [
        { key: 'A', text: 'Rp120.000 per hari (setara Rp3.600.000 per bulan)' },
        { key: 'B', text: 'Rp80.000 per hari (setara Rp2.400.000 per bulan)' },
        { key: 'C', text: 'Rp150.000 per hari (setara Rp4.500.000 per bulan)' },
        { key: 'D', text: 'Rp200.000 per hari (setara Rp6.000.000 per bulan)' },
        { key: 'E', text: 'Rp100.000 per hari (setara Rp3.000.000 per bulan)' }
      ],
      correct: 'A',
      explanation: 'Pendapatan fee bersih = 40 transaksi x Rp3.000 = Rp120.000 per hari. Sebulan = Rp120.000 x 30 = Rp3.600.000.'
    },
    {
      indicatorCode: 'D',
      indicatorName: 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
      question: 'Jika biaya operasional bulanan agen (kuota internet SIM 4G Rp150.000, kertas thermal struk 10 roll Rp80.000, listrik gerai Rp120.000, penyusutan alat Rp150.000) adalah Rp500.000, berapakah Laba Bersih akhir yang diperoleh agen per bulan dari pendapatan fee bersih Rp3.600.000?',
      options: [
        { key: 'A', text: 'Rp3.100.000 per bulan' },
        { key: 'B', text: 'Rp2.500.000 per bulan' },
        { key: 'C', text: 'Rp3.600.000 per bulan' },
        { key: 'D', text: 'Rp1.800.000 per bulan' },
        { key: 'E', text: 'Rp2.200.000 per bulan' }
      ],
      correct: 'A',
      explanation: 'Laba Bersih bulanan = Rp3.600.000 (fee bersih) - Rp500.000 (operasional) = Rp3.100.000.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Pada akhir video 5–10 menit, siswa merumuskan gagasan solusi inovasi manajemen likuiditas saat musim panen raya padi di Belitang. Solusi finansial yang paling cerdas adalah...',
      options: [
        { key: 'A', text: 'Bekerja sama dengan kelompok tani dan pedagang penebas gabah untuk menjadwalkan penarikan uang tunai bertahap serta menyiapkan pasokan kas dari bank cabang 2 hari sebelum transaksi raya' },
        { key: 'B', text: 'Menolak melayani seluruh petani yang hendak menarik uang hasil panen' },
        { key: 'C', text: 'Menaikkan tarif fee admin menjadi Rp100.000 per transaksi penarikan' },
        { key: 'D', text: 'Menutup gerai agen selama 1 bulan penuh saat panen raya tiba' },
        { key: 'E', text: 'Meminjam uang dari rentenir gelap berbunga tinggi untuk mengisi kas agen' }
      ],
      correct: 'A',
      explanation: 'Manajemen perputaran likuiditas terjadwal menjaga cashflow agen tetap aman saat lonjakan penarikan tunai musiman.'
    },
    {
      indicatorCode: 'E',
      indicatorName: 'Sintesis Rekayasa Finansial dalam Narasi Video',
      question: 'Ciri video mandiri siswa pada sektor jasa keuangan mikro Day 6 yang memenuhi etika akademik dan ramah SMA adalah...',
      options: [
        { key: 'A', text: 'Siswa memperlihatkan contoh kertas coretan simulasi fee admin dan pembukuan kas di depan kamera sambil menerangkan pentingnya literasi menabung bagi petani tanpa menampilkan data pribadi nasabah' },
        { key: 'B', text: 'Siswa memamerkan tumpukan uang tunai asli milik nasabah sambil menyebutkan nama-nama pemilik uang' },
        { key: 'C', text: 'Siswa mengambil foto rahasia buku tabungan nasabah lain' },
        { key: 'D', text: 'Siswa merekam layar monitor bank yang menampilkan nomor rekening rahasia' },
        { key: 'E', text: 'Siswa berpura-pura menjadi polisi yang sedang menangkap petugas agen' }
      ],
      correct: 'A',
      explanation: 'Penyampaian data finansial secara anonim dengan media simulasi mencerminkan kepatuhan terhadap kode etik perlindungan data pribadi perbankan.'
    }
  ]
};

// 3. SUSUN DAN INJEKSIKAN KE JS/DATA/BANK-SOAL-NONFIELDTRIP.JS
console.log('Generating questions...');
let d5Count = 0;
let d6Count = 0;

for (const sec of SECTORS) {
  if (!DAY5_DATA[sec] || DAY5_DATA[sec].length !== 10) {
    console.error(`Day 5 sector ${sec} has ${DAY5_DATA[sec] ? DAY5_DATA[sec].length : 0} questions! Need exactly 10.`);
    process.exit(1);
  }
  if (!DAY6_DATA[sec] || DAY6_DATA[sec].length !== 10) {
    console.error(`Day 6 sector ${sec} has ${DAY6_DATA[sec] ? DAY6_DATA[sec].length : 0} questions! Need exactly 10.`);
    process.exit(1);
  }
  d5Count += DAY5_DATA[sec].length;
  d6Count += DAY6_DATA[sec].length;
}

console.log(`Day 5 total questions: ${d5Count} (10 x 7 sectors)`);
console.log(`Day 6 total questions: ${d6Count} (10 x 7 sectors)`);

// Assign explicit IDs and metadata
let d5Id = 5001;
for (const sec of SECTORS) {
  DAY5_DATA[sec].forEach((q, idx) => {
    q.id = d5Id++;
    q.day = 5;
    q.sector = sec;
  });
}

let d6Id = 6001;
for (const sec of SECTORS) {
  DAY6_DATA[sec].forEach((q, idx) => {
    q.id = d6Id++;
    q.day = 6;
    q.sector = sec;
  });
}

// Add aliases for backward compatibility
DAY5_DATA.keuangan = DAY5_DATA.formal;
DAY5_DATA.jasa = DAY5_DATA.industri;
DAY6_DATA.keuangan = DAY6_DATA.formal;
DAY6_DATA.jasa = DAY6_DATA.industri;

const bankSoalPath = path.join(__dirname, '..', 'js', 'data', 'bank-soal-nonfieldtrip.js');
let bankSoalContent = fs.readFileSync(bankSoalPath, 'utf8');

// Build code string
const d5Code = `window.NFT_DAY5_SECTOR_QUESTIONS = ${JSON.stringify(DAY5_DATA, null, 2)};\n`;
const d6Code = `window.NFT_DAY6_SECTOR_QUESTIONS = ${JSON.stringify(DAY6_DATA, null, 2)};\n`;

// Let's check if window.NFT_DAY5_SECTOR_QUESTIONS is already in bankSoalContent
if (bankSoalContent.includes('window.NFT_DAY5_SECTOR_QUESTIONS')) {
  console.log('NFT_DAY5_SECTOR_QUESTIONS already exists, updating...');
  bankSoalContent = bankSoalContent.replace(/window\.NFT_DAY5_SECTOR_QUESTIONS\s*=\s*[\s\S]*?;\n(?=window\.NFT_DAY6_SECTOR_QUESTIONS|window\.getNftBankSoalByDay)/, d5Code);
} else {
  // Insert before window.getNftBankSoalByDay
  const target = '  window.getNftBankSoalByDay = function(dayNum, sectorKey) {';
  if (!bankSoalContent.includes(target)) {
    console.error('Cannot find window.getNftBankSoalByDay in bank-soal-nonfieldtrip.js');
    process.exit(1);
  }
  bankSoalContent = bankSoalContent.replace(target, d5Code + '\n' + d6Code + '\n' + target);
}

if (bankSoalContent.includes('window.NFT_DAY6_SECTOR_QUESTIONS')) {
  console.log('NFT_DAY6_SECTOR_QUESTIONS already exists, updating...');
  bankSoalContent = bankSoalContent.replace(/window\.NFT_DAY6_SECTOR_QUESTIONS\s*=\s*[\s\S]*?;\n(?=window\.getNftBankSoalByDay)/, d6Code);
}

// Now update getNftBankSoalByDay in bank-soal-nonfieldtrip.js for Day 5 and Day 6!
// Let's inspect the Day 5 and Day 6 blocks in getNftBankSoalByDay
const oldD5D6Regex = /\/\/ KHUSUS DAY 5 \(VIDEO OBSERVASI[\s\S]*?\/\/ KHUSUS DAY 7/;
const newD5D6Replacement = `// KHUSUS DAY 5 (10 SOAL PG SPESIFIK SEKTOR TERPILIH: SAINS & TEKNOLOGI)
    if (dayNum === 5) {
      let sec = (sectorKey || 'pertanian').toLowerCase().trim();
      if (sec === 'jasa') sec = 'industri';
      if (sec === 'keuangan') sec = 'formal';
      if (window.NFT_DAY5_SECTOR_QUESTIONS && window.NFT_DAY5_SECTOR_QUESTIONS[sec]) {
        return window.NFT_DAY5_SECTOR_QUESTIONS[sec];
      }
      if (window.NFT_DAY5_SECTOR_QUESTIONS && window.NFT_DAY5_SECTOR_QUESTIONS.pertanian) {
        return window.NFT_DAY5_SECTOR_QUESTIONS.pertanian;
      }
    }

    // KHUSUS DAY 6 (10 SOAL PG SPESIFIK SEKTOR TERPILIH: REKAYASA & FINANSIAL)
    if (dayNum === 6) {
      let sec = (sectorKey || 'pertanian').toLowerCase().trim();
      if (sec === 'jasa') sec = 'industri';
      if (sec === 'keuangan') sec = 'formal';
      if (window.NFT_DAY6_SECTOR_QUESTIONS && window.NFT_DAY6_SECTOR_QUESTIONS[sec]) {
        return window.NFT_DAY6_SECTOR_QUESTIONS[sec];
      }
      if (window.NFT_DAY6_SECTOR_QUESTIONS && window.NFT_DAY6_SECTOR_QUESTIONS.pertanian) {
        return window.NFT_DAY6_SECTOR_QUESTIONS.pertanian;
      }
    }

    // KHUSUS DAY 7`;

if (oldD5D6Regex.test(bankSoalContent)) {
  bankSoalContent = bankSoalContent.replace(oldD5D6Regex, newD5D6Replacement);
  console.log('Updated getNftBankSoalByDay for Day 5 & Day 6 successfully.');
} else {
  console.warn('Could not match oldD5D6Regex in bankSoalContent, please inspect manually.');
}

// Update indicators helper for Day 5 & Day 6 in getNftBankSoalIndicators
const oldIndDay5Regex = /if \(dayNum === 5 && window\.NFT_BANK_SOAL_INDICATORS_DAY5\)[\s\S]*?if \(dayNum === 6 && window\.NFT_BANK_SOAL_INDICATORS_DAY6\)\s*\{\s*return window\.NFT_BANK_SOAL_INDICATORS_DAY6;\s*\}/;
const newIndDay5Day6 = `if (dayNum === 5) {
      return {
        'A': 'Sains Bahan Baku & Kondisi Alami',
        'B': 'Sains Nutrisi, Kimia & Biologi Pertumbuhan / Mutu',
        'C': 'Teknologi Alat Kerja & Mekanisasi Produksi',
        'D': 'Teknologi Pemeliharaan, Efisiensi & Kontrol',
        'E': 'Sintesis Sains-Teknologi dalam Narasi Video'
      };
    }
    if (dayNum === 6) {
      return {
        'A': 'Rekayasa Teknis & Desain Solusi Lapangan',
        'B': 'Rekayasa Penanganan Kendala & Efisiensi Energi/Bahan',
        'C': 'Matematika Finansial: Modal Kerja & Biaya Operasional (BOP)',
        'D': 'Matematika Finansial: HPP, Omzet & Laba Bersih Sektor',
        'E': 'Sintesis Rekayasa Finansial dalam Narasi Video'
      };
    }`;

if (oldIndDay5Regex.test(bankSoalContent)) {
  bankSoalContent = bankSoalContent.replace(oldIndDay5Regex, newIndDay5Day6);
  console.log('Updated getNftBankSoalIndicators for Day 5 & Day 6 successfully.');
}

// Also check filter condition in line: if ((dayNum === 3 || dayNum === 4) && sectorKey)
bankSoalContent = bankSoalContent.replace(
  'if ((dayNum === 3 || dayNum === 4) && sectorKey)',
  'if ((dayNum >= 3 && dayNum <= 6) && sectorKey)'
);

fs.writeFileSync(bankSoalPath, bankSoalContent, 'utf8');
console.log('bank-soal-nonfieldtrip.js updated and written successfully!');
