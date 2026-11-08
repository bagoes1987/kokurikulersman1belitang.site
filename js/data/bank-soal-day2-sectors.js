/**
 * BANK SOAL ASESMEN NON-FIELD TRIP DAY 2 - KHUSUS SEKTOR MATA PENCAHARIAN
 * SMAN 1 BELITANG - KOKURIKULER 2026
 * 6 Sektor Tambahan x 35 Soal = 210 Soal (Sektor Pangan ada di bank-soal-nonfieldtrip.js Day 2)
 */

(function() {
  'use strict';

  var SECTORS = {
  "perkebunan": [
    {
      "id": 2101,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Penderes karet di desa-desa OKU Timur memiliki kebiasaan budaya berangkat menyadap getah sebelum fajar menyingsing (sekitar pukul 04.30–06.00 WIB). Alasan biologis dan teknis dari kebiasaan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tekanan turgor sel pembuluh lateks tanaman karet berada pada titik tertinggi sebelum matahari terbit sehingga getah mengalir lebih deras"
        },
        {
          "key": "B",
          "text": "Suhu dingin pagi hari membekukan getah karet secara instan di dalam mangkok sadap"
        },
        {
          "key": "C",
          "text": "Pohon karet tidak dapat menghasilkan lateks jika terkena embun pagi hari"
        },
        {
          "key": "D",
          "text": "Aktivitas menyadap dilarang dilakukan saat angin bertiup dari arah selatan"
        },
        {
          "key": "E",
          "text": "Getah karet hanya mengandung air murni jika disadap setelah matahari berada di atas kepala"
        }
      ],
      "correct": "A",
      "explanation": "Pada dini hari sebelum fajar, tekanan turgor sel pembuluh lateks maksimal karena penguapan (transpirasi) belum terjadi, membuat aliran lateks paling deras."
    },
    {
      "id": 2102,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam lembar observasi peralatan kerja penderes karet, pisau sadap/deres yang digunakan penderes memiliki sudut kelengkungan khusus. Penggunaan pisau sadap yang tepat bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mengiris kulit batang sedalam 1–1,5 mm mendekati kambium tanpa melukai lapisan kayu kambium agar kulit dapat pulih kembali"
        },
        {
          "key": "B",
          "text": "Memotong seluruh lapisan kulit kayu hingga inti batang pohon karet terbelah"
        },
        {
          "key": "C",
          "text": "Menghaluskan lumut yang menempel pada batang bagian atas pohon karet"
        },
        {
          "key": "D",
          "text": "Membuat lubang penampungan getah di dalam rongga kayu pohon karet"
        },
        {
          "key": "E",
          "text": "Mempercepat pengelupasan kulit kering pohon karet secara menyeluruh"
        }
      ],
      "correct": "A",
      "explanation": "Penyadapan yang benar hanya mengiris kulit luar dan pembuluh lateks tanpa melukai kambium, sehingga kulit pulihan (bark renewal) dapat terbentuk dengan baik."
    },
    {
      "id": 2103,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan perlengkapan sadap getah karet meliputi talang sadap seng dan mangkok penampung. Pemasangan talang sadap diatur dengan kemiringan tertentu agar...",
      "options": [
        {
          "key": "A",
          "text": "Mengarahkan tetesan lateks dari alur irisan secara efisien masuk tepat ke dalam mangkok penampung tanpa tumpah"
        },
        {
          "key": "B",
          "text": "Menahan air hujan agar tidak merendam akar pohon karet"
        },
        {
          "key": "C",
          "text": "Mencegah serangga merayap naik ke dahan pohon karet"
        },
        {
          "key": "D",
          "text": "Mempercepat pembekuan getah karet saat masih menempel di kulit batang"
        },
        {
          "key": "E",
          "text": "Menandai batas kepemilikan tanah perkebunan dengan kebun tetangga"
        }
      ],
      "correct": "A",
      "explanation": "Talang sadap berfungsi mengalirkan cairan lateks dari parit sadap menuju mangkok penampung dengan gravitasi."
    },
    {
      "id": 2104,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Untuk membekukan lateks cair di mangkok atau bak pembeku, bahan pembeku yang direkomendasikan penyuluh pertanian karena menghasilkan bokar bersih dan elastis adalah...",
      "options": [
        {
          "key": "A",
          "text": "Asam format (asam semut / cuka getah) dengan dosis yang terukur"
        },
        {
          "key": "B",
          "text": "Asam sulfat (air aki / asam cuka pekat liar) dosis tinggi"
        },
        {
          "key": "C",
          "text": "Garam dapur kasar yang dicampur dengan tatal kayu"
        },
        {
          "key": "D",
          "text": "Pupuk urea yang dilarutkan ke dalam air lumpur"
        },
        {
          "key": "E",
          "text": "Deterjen pembersih pakaian dengan pewangi sintetis"
        }
      ],
      "correct": "A",
      "explanation": "Asam format/asam semut adalah koagulan lateks resmi yang tidak merusak rantai polimer karet dan tidak menimbulkan bau busuk berlebih."
    },
    {
      "id": 2105,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Dalam tradisi budaya sosial ekonomi masyarakat perkebunan OKU Timur, hubungan kerja sama antara pemilik kebun karet dengan penyadap sering menggunakan sistem 'tengah duo' atau 'maro', yang bermakna...",
      "options": [
        {
          "key": "A",
          "text": "Sistem bagi hasil setara 50:50 dari total hasil panen getah yang diperoleh setelah dikurangi biaya operasional"
        },
        {
          "key": "B",
          "text": "Penyadap menyewa tanah perkebunan dengan pembayaran tunai di muka setiap awal tahun"
        },
        {
          "key": "C",
          "text": "Pemilik kebun menerima seluruh hasil panen tanpa memberikan imbalan kepada buruh sadap"
        },
        {
          "key": "D",
          "text": "Penyadap wajib menjual seluruh tanah kebun kepada koperasi desa"
        },
        {
          "key": "E",
          "text": "Sistem kerja upah harian tanpa memperhitungkan jumlah getah yang dihasilkan"
        }
      ],
      "correct": "A",
      "explanation": "Sistem maro/tengah duo adalah kearifan lokal bagi hasil 50% untuk pemilik lahan dan 50% untuk penggarap/penyadap."
    },
    {
      "id": 2106,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Saat musim hujan lebat, penderes karet di Belitang dan sekitarnya pantang menyadap saat kulit batang karet masih basah kuyup. Dampak negatif utama jika pemaksaan sadap tetap dilakukan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Lateks akan mengalir meluber keluar alur serta bidang sadap rentan terinfeksi jamur garis hitam (black stripe)"
        },
        {
          "key": "B",
          "text": "Daun karet akan langsung rontok dan pohon mengering secara permanen"
        },
        {
          "key": "C",
          "text": "Akar pohon karet akan membusuk seketika dalam waktu 24 jam"
        },
        {
          "key": "D",
          "text": "Getah karet yang dihasilkan akan berubah warna menjadi ungu pekat"
        },
        {
          "key": "E",
          "text": "Tanah perkebunan akan kehilangan kandungan nitrogen secara drastis"
        }
      ],
      "correct": "A",
      "explanation": "Batang basah membuat getah tercecer dan kelembapan tinggi memicu serangan patogen jamur Phytophthora (penyakit garis hitam)."
    },
    {
      "id": 2107,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Pada komoditas kelapa sawit rakyat di OKU Timur, alat panen tradisional berbentuk sabit/pahat tajam bergagang pendek yang digunakan khusus untuk pohon sawit muda (tinggi di bawah 3 meter) disebut...",
      "options": [
        {
          "key": "A",
          "text": "Dodos"
        },
        {
          "key": "B",
          "text": "Egrek"
        },
        {
          "key": "C",
          "text": "Tojok"
        },
        {
          "key": "D",
          "text": "Cangkul garpu"
        },
        {
          "key": "E",
          "text": "Parang tebas"
        }
      ],
      "correct": "A",
      "explanation": "Dodos adalah alat dorong berbilah mata tajam lurus untuk memotong tangkai TBS pada tanaman sawit muda."
    },
    {
      "id": 2108,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Ketika pohon kelapa sawit sudah berumur tua dan tingginya mencapai lebih dari 4–10 meter, alat panen yang digunakan adalah 'egrek', yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Pisau lengkung berbentuk sabit yang dipasang pada ujung pipa aluminium atau fiber panjang yang dapat disambung"
        },
        {
          "key": "B",
          "text": "Gergaji mesin berbahan bakar bensin berbobot ringan"
        },
        {
          "key": "C",
          "text": "Kait besi dengan tali tambang katun yang ditarik dari bawah"
        },
        {
          "key": "D",
          "text": "Gunting hidrolik bertenaga aki yang dioperasikan dengan remote"
        },
        {
          "key": "E",
          "text": "Kapak baja bergagang kayu pendek untuk membelah batang"
        }
      ],
      "correct": "A",
      "explanation": "Egrek bermata sabit dipasang pada galah panjang untuk menjangkau tandan buah sawit pada pohon tinggi."
    },
    {
      "id": 2109,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan mekanis sederhana yang terbuat dari pipa besi berujung runcing melengkung yang digunakan petani sawit untuk menusuk dan mengangkat tandan buah sawit ke dalam angkong disebut...",
      "options": [
        {
          "key": "A",
          "text": "Tojok"
        },
        {
          "key": "B",
          "text": "Linggis"
        },
        {
          "key": "C",
          "text": "Gancu"
        },
        {
          "key": "D",
          "text": "Cacuk"
        },
        {
          "key": "E",
          "text": "Baji"
        }
      ],
      "correct": "A",
      "explanation": "Tojok adalah tombak berujung kait besi yang dipakai mengangkat tandan buah segar (TBS) sawit secara ergonomis."
    },
    {
      "id": 2110,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Kriteria kematangan Tandan Buah Segar (TBS) kelapa sawit yang sudah siap dipanen secara teknis ditandai dengan...",
      "options": [
        {
          "key": "A",
          "text": "Adanya minimal 5 hingga 10 butir berondolan buah sawit yang terlepas secara alami dan jatuh di piringan pohon"
        },
        {
          "key": "B",
          "text": "Seluruh pelepah daun kelapa sawit telah menguning dan patah ke tanah"
        },
        {
          "key": "C",
          "text": "Kulit buah sawit berwarna hijau tua mengkilap tanpa ada buah yang jatuh"
        },
        {
          "key": "D",
          "text": "Tandan buah mengeluarkan aroma harum menyengat seperti buah mangga"
        },
        {
          "key": "E",
          "text": "Pohon sawit berhenti mengeluarkan pelepah daun baru selama 2 bulan"
        }
      ],
      "correct": "A",
      "explanation": "Derajat kematangan fraksi panen optimal ditandai dengan jatuhnya (memberondol) sedikitnya 5 butir buah sawit di piringan."
    },
    {
      "id": 2111,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Rotasi atau siklus panen kelapa sawit rakyat yang umum diterapkan petani mandiri di OKU Timur agar kualitas rendemen minyak sawit (CPO) tetap prima adalah...",
      "options": [
        {
          "key": "A",
          "text": "Setiap 10 hingga 14 hari sekali dalam satu putaran areal kebun"
        },
        {
          "key": "B",
          "text": "Setiap 2 bulan sekali menunggu seluruh pohon berbuah bersamaan"
        },
        {
          "key": "C",
          "text": "Setiap hari tanpa henti pada blok kebun yang persis sama"
        },
        {
          "key": "D",
          "text": "Hanya sekali dalam setahun saat musim kemarau panjang"
        },
        {
          "key": "E",
          "text": "Setiap 40 hari sekali bersamaan dengan siklus panen padi sawah"
        }
      ],
      "correct": "A",
      "explanation": "Rotasi panen 10–14 hari menjaga asam lemak bebas (ALB/FFA) tetap rendah dan mencegah buah lewat matang membusuk."
    },
    {
      "id": 2112,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Tempat penampungan hasil panen kelapa sawit sementara di pinggir jalan kebun sebelum diangkut truk menuju Pabrik Kelapa Sawit (PKS) disebut Tempat Pengumpulan Hasil (TPH) atau Loading Ramp, yang berfungsi untuk...",
      "options": [
        {
          "key": "A",
          "text": "Melakukan sortasi mutu kematangan, penimbangan awal, dan pemuatan buah ke bak truk secara efisien"
        },
        {
          "key": "B",
          "text": "Mencuci buah sawit dengan sabun cair agar terbebas dari debu"
        },
        {
          "key": "C",
          "text": "Menyimpan buah sawit selama minimal 2 minggu agar kadar minyak meningkat"
        },
        {
          "key": "D",
          "text": "Membakar tandan kosong sawit untuk dijadikan abu arang"
        },
        {
          "key": "E",
          "text": "Mengemas buah sawit ke dalam kardus tertutup berukuran kecil"
        }
      ],
      "correct": "A",
      "explanation": "TPH/loading ramp adalah fasilitas logistik kebun untuk menata, menyortir buah mentah/busuk, dan menaikkan TBS ke armada truk."
    },
    {
      "id": 2113,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Di beberapa kecamatan di OKU Timur seperti Semendawai Barat dan Madang Suku, petani sawit membentuk Koperasi Unit Desa (KUD) mitra Peremajaan Sawit Rakyat (PSR). Peran utama koperasi dalam program ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengakomodasi bantuan bibit bersertifikat, pembiayaan replanting dari BPDPKS, dan penyediaan pupuk berkualitas"
        },
        {
          "key": "B",
          "text": "Mengambil alih seluruh sertifikat tanah petani menjadi milik pengurus koperasi"
        },
        {
          "key": "C",
          "text": "Melarang petani menjual hasil panen ke pabrik kelapa sawit mana pun"
        },
        {
          "key": "D",
          "text": "Menetapkan harga sewa lahan yang wajib dibayar petani kepada pemerintah desa"
        },
        {
          "key": "E",
          "text": "Mengganti seluruh komoditas kelapa sawit dengan tanaman kehutanan sengon"
        }
      ],
      "correct": "A",
      "explanation": "KUD pekebun sawit menjadi kelembagaan legal penyalur dana hibah PSR BPDPKS dan penyedia bibit kultur jaringan bersertifikat."
    },
    {
      "id": 2114,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Perawatan piringan pohon kelapa sawit (weeding) dengan radius 1,5 meter dari pangkal batang bertujuan vital untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencegah persaingan gulma dalam menyerap pupuk dan mempermudah pengutipan butir berondolan panen"
        },
        {
          "key": "B",
          "text": "Membuat batang sawit tumbuh melengkung ke arah cahaya matahari"
        },
        {
          "key": "C",
          "text": "Mencegah air hujan meresap ke dalam tanah sekitar akar sawit"
        },
        {
          "key": "D",
          "text": "Menghilangkan lapisan tanah humus agar akar sawit tampak di permukaan"
        },
        {
          "key": "E",
          "text": "Mempercepat pengeringan daun kelapa sawit bagian bawah"
        }
      ],
      "correct": "A",
      "explanation": "Piringan bersih membebaskan zona perakaran dari kompetisi gulma dan memastikan tidak ada berondolan yang tertinggal di semak."
    },
    {
      "id": 2115,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Petani perkebunan sawit di OKU Timur sering mengaplikasikan pupuk dolomit (kapur magnesium) selain pupuk NPK. Fungsi utama aplikasi pupuk dolomit tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menaikkan pH tanah masam di lahan perkebunan serta menyediakan unsur hara Kalsium (Ca) dan Magnesium (Mg) bagi daun"
        },
        {
          "key": "B",
          "text": "Membasmi seluruh mikroorganisme pengurai di dalam tanah secara kimia"
        },
        {
          "key": "C",
          "text": "Mempercepat pembusukan tandan buah sawit sebelum waktu panen"
        },
        {
          "key": "D",
          "text": "Mencegah pohon sawit menyerap air tanah secara berlebihan"
        },
        {
          "key": "E",
          "text": "Menggantikan peran sinar matahari dalam proses fotosintesis kelapa sawit"
        }
      ],
      "correct": "A",
      "explanation": "Dolomit menetralkan keasaman tanah podsolik merah kuning di OKU Timur dan menyuplai Magnesium esensial untuk klorofil daun sawit."
    },
    {
      "id": 2116,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Pengendalian hama kumbang tanduk (Oryctes rhinoceros) yang sering menyerang pucuk sawit muda di areal replanting dapat dilakukan secara terpadu melalui teknik...",
      "options": [
        {
          "key": "A",
          "text": "Pemasangan perangkap feromon (ferotrap) dan pemanfaatan jamur entomopatogen Metarhizium anisopliae"
        },
        {
          "key": "B",
          "text": "Pembakaran seluruh sisa tumpukan batang kelapa sawit di tengah perkebunan"
        },
        {
          "key": "C",
          "text": "Penyemprotan herbisida sistemik pada seluruh permukaan daun sawit muda"
        },
        {
          "key": "D",
          "text": "Penenggelaman areal kebun kelapa sawit selama 1 bulan penuh"
        },
        {
          "key": "E",
          "text": "Penebangan seluruh pohon sawit yang tingginya di bawah 2 meter"
        }
      ],
      "correct": "A",
      "explanation": "Perangkap feromon sintetis memikat kumbang dewasa, sementara jamur Metarhizium menginfeksi larva kumbang di tumpukan cacahan batang."
    },
    {
      "id": 2117,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pada perkebunan karet rakyat, penyakit Jamur Akar Putih (JAP) yang disebabkan oleh Rigidoporus microporus merupakan ancaman serius. Gejala awal serangan penyakit ini terlihat dari...",
      "options": [
        {
          "key": "A",
          "text": "Daun tajuk memudar kusam, layu menguning perlahan, dan terdapat benang jamur putih seperti jaring menempel di leher akar"
        },
        {
          "key": "B",
          "text": "Batang karet mengeluarkan getah berwarna merah menyala di malam hari"
        },
        {
          "key": "C",
          "text": "Kulit pohon karet mengelupas secara melingkar sempurna seperti cincin"
        },
        {
          "key": "D",
          "text": "Pohon karet mengeluarkan bunga beraroma wangi mawar di bagian akar"
        },
        {
          "key": "E",
          "text": "Akar pohon karet membesar menjadi umbi seperti singkong manis"
        }
      ],
      "correct": "A",
      "explanation": "Miselia putih jamur merusak kambium akar, menghalangi translokasi air sehingga daun kusam dan pohon akhirnya tumbang."
    },
    {
      "id": 2118,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Di beberapa sentra karet OKU Timur, kelompok tani mengadakan Pasar Lelang Karet Mingguan (Unit Pengolahan dan Pemasaran Bokar / UPPB). Keunggulan sistem lelang ini bagi petani dibanding menjual ke pedagang perantara adalah...",
      "options": [
        {
          "key": "A",
          "text": "Petani memperoleh posisi tawar harga yang transparan dan lebih tinggi sesuai kadar karet kering tanpa manipulasi timbangan"
        },
        {
          "key": "B",
          "text": "Petani dibebaskan dari kewajiban memelihara kebun karet masing-masing"
        },
        {
          "key": "C",
          "text": "Petani tidak perlu menyadap karet tetapi tetap menerima uang tunai setiap minggu"
        },
        {
          "key": "D",
          "text": "Pedagang pabrik wajib membeli getah karet busuk dengan harga dua kali lipat"
        },
        {
          "key": "E",
          "text": "Semua hasil panen karet ditukar dengan kupon sembako tanpa uang tunai"
        }
      ],
      "correct": "A",
      "explanation": "UPPB memutus rantai tengkulak nakal, menghargai mutu bokar bersih dengan kadar karet kering (KKK) tinggi secara lelang terbuka."
    },
    {
      "id": 2119,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Kadar Karet Kering (KKK) merupakan parameter utama penetapan harga bokar di pabrik crumb rubber. Kebiasaan buruk merendam bokar di kolam lumpur atau memasukkan potongan kayu/batu akan berakibat...",
      "options": [
        {
          "key": "A",
          "text": "Menurunkan persentase KKK secara drastis, merusak mesin giling pabrik, dan menurunkan harga jual karet petani"
        },
        {
          "key": "B",
          "text": "Menaikkan harga beli karet di tingkat eksportir internasional"
        },
        {
          "key": "C",
          "text": "Mempercepat pengeringan bokar saat disimpan di dalam gudang terbuka"
        },
        {
          "key": "D",
          "text": "Membuat karet menjadi lebih elastis dan tahan terhadap suhu panas"
        },
        {
          "key": "E",
          "text": "Menghilangkan bau asam yang dihasilkan dari pembekuan getah karet"
        }
      ],
      "correct": "A",
      "explanation": "Kontaminasi kotoran tatal kayu, lumpur, dan air rendaman menurunkan KKK serta ditolak atau dipotong harganya secara tajam oleh pabrik."
    },
    {
      "id": 2120,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Dalam aspek Keselamatan dan Kesehatan Kerja (K3) pada lembar observasi perkebunan karet, perlengkapan pelindung diri (APD) esensial yang wajib dipakai penderes subuh hari adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sepatu bot karet sol tebal anti-selip dan pelindung gigitan ular serta lampu senter kepala (headlamp)"
        },
        {
          "key": "B",
          "text": "Baju wol tebal berlapis baja dan helm astronot kedap udara"
        },
        {
          "key": "C",
          "text": "Sandal jepit terbuka dan payung kain bergagang panjang"
        },
        {
          "key": "D",
          "text": "Kacamata renang silikon dan sarung tangan kain rajut tipis"
        },
        {
          "key": "E",
          "text": "Rompi pelampung air dan jas hujan parasut tebal berlapis lilin"
        }
      ],
      "correct": "A",
      "explanation": "Kondisi kebun subuh yang gelap dan semak lembap menuntut headlamp penerang jalan dan sepatu bot tinggi pelindung gigitan reptil berbisa."
    },
    {
      "id": 2121,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Saat mengamati pemanen kelapa sawit di lapangan, APD krusial yang wajib digunakan untuk melindungi kepala dari bahaya jatuhnya tandan buah berduri atau serpihan pelepah kering adalah...",
      "options": [
        {
          "key": "A",
          "text": "Helm proyek standar keselamatan (safety helmet) dan kacamata pelindung (safety goggles)"
        },
        {
          "key": "B",
          "text": "Topi anyaman pandan tipis tanpa tali dagu"
        },
        {
          "key": "C",
          "text": "Kain sorban katun yang dililitkan di sekeliling kepala"
        },
        {
          "key": "D",
          "text": "Penutup telinga busa tanpa pelindung tempurung kepala"
        },
        {
          "key": "E",
          "text": "Masker scuba kain tipis penutup hidung dan mulut"
        }
      ],
      "correct": "A",
      "explanation": "Tandan sawit berbobot 15–25 kg yang jatuh dari ketinggian 6 meter dapat berakibat fatal tanpa helm pengaman berstandar keselamatan."
    },
    {
      "id": 2122,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pada kebun sawit atau karet yang baru ditanam (fase Tanaman Belum Menghasilkan / TBM), petani OKU Timur sering memanfaatkan sela antar-barisan tanaman dengan teknik tumpang sari. Tanaman sela yang ideal ditanam adalah...",
      "options": [
        {
          "key": "A",
          "text": "Jagung manis, kedelai, atau kacang tanah yang berumur pendek dan tidak menaungi bibit utama"
        },
        {
          "key": "B",
          "text": "Pohon bambu betung yang memiliki akar lebat menjalar"
        },
        {
          "key": "C",
          "text": "Pohon jati emas yang tajuk daunnya sangat rimbun dan tinggi"
        },
        {
          "key": "D",
          "text": "Pohon sawit lain yang ditanam rapat dengan jarak 50 cm"
        },
        {
          "key": "E",
          "text": "Semak belukar berduri liar tanpa perawatan berkala"
        }
      ],
      "correct": "A",
      "explanation": "Legum dan palawija semusim memberikan pendapatan antara bagi petani sebelum tanaman pokok panen, serta menyuburkan tanah dengan bintil akar rhizobium."
    },
    {
      "id": 2123,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Komoditas perkebunan karet alam sangat bergantung pada harga pasar global SICOM / bursa komoditas. Ketika harga getah karet merosot tajam, dampak sosial budaya yang sering terjadi pada keluarga petani adalah...",
      "options": [
        {
          "key": "A",
          "text": "Petani beralih sementara menjadi buruh serabutan atau mencari komoditas sampingan sambil tetap merawat pohon karet"
        },
        {
          "key": "B",
          "text": "Seluruh petani serentak menebang pohon karet dan mengosongkan tanah kebun"
        },
        {
          "key": "C",
          "text": "Keluarga petani berhenti mengonsumsi beras dan beralih ke makanan kaleng impor"
        },
        {
          "key": "D",
          "text": "Seluruh anak petani diwajibkan berhenti sekolah secara serentak"
        },
        {
          "key": "E",
          "text": "Pemerintah desa menutup seluruh akses jalan keluar masuk perkebunan"
        }
      ],
      "correct": "A",
      "explanation": "Diversifikasi mata pencaharian sampingan (buruh bangunan, ojek, perikanan) menjadi strategi resiliensi keluarga petani saat siklus harga karet jatuh."
    },
    {
      "id": 2124,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "A",
      "cognitiveLevel": "C4",
      "question": "Salah satu tantangan budaya regenerasi yang dihadapi narasumber perkebunan karet di OKU Timur saat ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Minat generasi muda yang menurun terhadap profesi penderes karena dianggap pekerjaan berlumpur, beraroma menyengat, dan bangun dini hari"
        },
        {
          "key": "B",
          "text": "Larangan adat desa bagi pemuda untuk memasuki areal perkebunan karet"
        },
        {
          "key": "C",
          "text": "Kurangnya lahan kebun karet yang tersedia di seluruh Kabupaten OKU Timur"
        },
        {
          "key": "D",
          "text": "Pohon karet tidak lagi mampu memproduksi getah lateks di era modern"
        },
        {
          "key": "E",
          "text": "Perusahaan internasional melarang penggunaan tenaga kerja usia produktif"
        }
      ],
      "correct": "A",
      "explanation": "Stigma pekerjaan kotor dan preferensi kerja formal/perkotaan memicu krisis regenerasi penyadap terampil di perdesaan."
    },
    {
      "id": 2125,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Penyediaan bibit tanaman karet berkualitas dilakukan melalui teknik okulasi (bud grafting) mata tunas klon unggul (seperti PB 260 atau IRR 118). Keunggulan bibit okulasi klonal dibanding bibit asal biji (sapihan) adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pertumbuhan seragam, waktu mulai sadap lebih cepat (4,5–5 tahun), dan produktivitas getah per hektar jauh lebih tinggi"
        },
        {
          "key": "B",
          "text": "Pohon karet tidak memerlukan pemupukan sama sekali seumur hidup"
        },
        {
          "key": "C",
          "text": "Batang pohon karet tidak akan pernah terkena serangan jamur akar"
        },
        {
          "key": "D",
          "text": "Kulit pohon karet tidak akan pernah habis meskipun disadap secara sembarangan"
        },
        {
          "key": "E",
          "text": "Pohon karet dapat disadap meskipun belum memiliki daun sama sekali"
        }
      ],
      "correct": "A",
      "explanation": "Okulasi klon anjuran mewariskan sifat unggul genetik induk: produksi lateks tinggi, lingkar lilit batang cepat tercapai, dan resisten angin."
    },
    {
      "id": 2126,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Konsep pengelolaan 'konsumsi kulit' (bark consumption) pada penyadapan karet mengatur ketebalan irisan kulit harian sebesar 1,5–2 mm per penyadapan. Tujuan pembatasan konsumsi kulit ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menjaga agar satu panel sadap dapat digunakan selama 5–6 tahun sebelum berpindah panel, sehingga kulit pulihan memiliki waktu matang sempurna"
        },
        {
          "key": "B",
          "text": "Membuat getah karet mengalir lambat agar tidak cepat memenuhi mangkok"
        },
        {
          "key": "C",
          "text": "Mencegah pisau sadap cepat tumpul akibat terlalu banyak memotong serat kulit"
        },
        {
          "key": "D",
          "text": "Membuat batang karet tumbuh lebih kurus agar mudah dipanjat"
        },
        {
          "key": "E",
          "text": "Menghindari teguran dari pemilik kebun mengenai berat mangkok getah"
        }
      ],
      "correct": "A",
      "explanation": "Manajemen konsumsi kulit yang hemat menjamin keberlanjutan masa produktif pohon karet hingga mencapai usia 25–30 tahun."
    },
    {
      "id": 2127,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Tata ruang penanaman bibit kelapa sawit di kebun rakyat menggunakan pola jarak tanam segitiga sama sisi (mata lima) dengan ukuran 9 m x 9 m x 9 m. Keuntungan agronomis dari pola tanam ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pemanfaatan ruang dan penangkapan sinar matahari merata pada seluruh tajuk pohon sawit dengan populasi optimal sekitar 143 pohon/ha"
        },
        {
          "key": "B",
          "text": "Membuat jalan kebun menjadi sempit agar tidak dapat dilalui oleh kendaraan pencuri"
        },
        {
          "key": "C",
          "text": "Mempercepat pohon sawit tumbuh kerdil agar mudah dipanen tanpa galah"
        },
        {
          "key": "D",
          "text": "Mencegah air tanah menguap ke udara selama musim kemarau berlangsung"
        },
        {
          "key": "E",
          "text": "Mengurangi kebutuhan pupuk dasar hingga nol persen per hektar lahan"
        }
      ],
      "correct": "A",
      "explanation": "Pola segitiga 9x9 m mengoptimalkan intersepsi radiasi surya tanpa tumpang tindih tajuk (overlap) yang berlebihan pada populasi 136–143 pokok/ha."
    },
    {
      "id": 2128,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Setelah memotong pelepah sawit saat panen (pruning), pelepah tersebut disusun rapi di antara gawangan pohon (gawangan mati / letter U). Nilai ekologis dan agronomi dari tindakan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sebagai mulsa organik yang menahan erosi tanah, menjaga kelembapan mikro tanah, dan menambah bahan organik saat melapuk"
        },
        {
          "key": "B",
          "text": "Sebagai pagar pembatas yang dilarang dilintasi oleh pemilik kebun sawit"
        },
        {
          "key": "C",
          "text": "Sebagai bahan bakar untuk dibakar di tempat agar asap mengusir serangga"
        },
        {
          "key": "D",
          "text": "Sebagai penanda bahwa buah sawit pada blok tersebut sudah habis dipetik"
        },
        {
          "key": "E",
          "text": "Sebagai media penimbun batu karang agar jalan kebun meninggi"
        }
      ],
      "correct": "A",
      "explanation": "Penyusunan pelepah di gawangan mati mengembalikan biomassa hara (terutama Kalium), menahan laju aliran permukaan air hujan, dan menekan gulma."
    },
    {
      "id": 2129,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pada lembar observasi aspek teknologi informasi dan pencatatan, petani kebun yang tertib mencatat buku panen harian (berat timbangan, tanggal panen, dan upah buruh). Manfaat paling nyata dari pembukuan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Dapat memonitor tren produktivitas tanaman per blok, mengevaluasi efisiensi biaya, dan merencanakan pemupukan secara tepat"
        },
        {
          "key": "B",
          "text": "Menghindari kewajiban membayar pajak penghasilan kepada pemerintah daerah"
        },
        {
          "key": "C",
          "text": "Membuat pedagang perantara wajib membayar dua kali lipat dari harga pasar"
        },
        {
          "key": "D",
          "text": "Mencegah tanaman kebun terserang hama ulat api dan jamur daun"
        },
        {
          "key": "E",
          "text": "Menggantikan peran penyuluh perkebunan dalam menentukan jenis bibit unggul"
        }
      ],
      "correct": "A",
      "explanation": "Pencatatan produksi dan arus kas menjadi dasar kalkulasi laba-rugi riil dan deteksi dini jika terjadi penurunan produktivitas kebun."
    },
    {
      "id": 2130,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Fenomena El Nino atau kemarau panjang sering melanda wilayah Sumatera Selatan termasuk OKU Timur. Dampak fisiologis kekeringan ekstrem pada tanaman kelapa sawit adalah...",
      "options": [
        {
          "key": "A",
          "text": "Terjadinya aborsi bunga betina (gugur bunga) dan peningkatan proporsi bunga jantan, sehingga produksi TBS anjlok 5–10 bulan kemudian"
        },
        {
          "key": "B",
          "text": "Produksi buah sawit meningkat secara drastis hingga dua kali lipat"
        },
        {
          "key": "C",
          "text": "Pohon sawit menghasilkan minyak sawit berkualitas tanpa perlu disterilisasi di pabrik"
        },
        {
          "key": "D",
          "text": "Akar tanaman sawit berubah menjadi parasit pemakan serangga tanah"
        },
        {
          "key": "E",
          "text": "Kulit buah sawit mengelupas sendiri tanpa perlu dipotong menggunakan dodos"
        }
      ],
      "correct": "A",
      "explanation": "Water deficit memicu water stress fisiologis: pembentukan bunga betina terhambat (diferensiasi seks condong ke bunga jantan) dan buah muda gugur."
    },
    {
      "id": 2131,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Pola kemitraan antara kelompok tani perkebunan sawit mandiri dengan Pabrik Kelapa Sawit (PKS) diatur melalui Surat Perjanjian Kerja Sama (SPKS). Keuntungan utama bagi petani bermitra adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kepastian pasar penyerapan TBS dengan harga penetapan Dinas Perkebunan (harga indeks K) yang transparan"
        },
        {
          "key": "B",
          "text": "Pabrik membebaskan petani dari kewajiban memanen buah secara rutin"
        },
        {
          "key": "C",
          "text": "Petani berhak mengambil alih kepemilikan mesin pabrik sewaktu-waktu"
        },
        {
          "key": "D",
          "text": "Seluruh tenaga kerja kebun ditanggung gajinya oleh manajemen pabrik"
        },
        {
          "key": "E",
          "text": "Petani diperbolehkan mencampur buah busuk tanpa terkena potongan timbangan"
        }
      ],
      "correct": "A",
      "explanation": "Kemitraan resmi memberi proteksi harga TBS sesuai formula resmi Tim Penetapan Harga Provinsi dan kuota antrean bongkar di pabrik."
    },
    {
      "id": 2132,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Pemanfaatan aplikasi perpesanan WhatsApp dalam komunitas pekebun sawit dan karet di OKU Timur saat ini banyak digunakan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menyebarkan informasi harian mengenai harga beli TBS di pabrik terdekat dan jadwal pembagian pupuk kelompok"
        },
        {
          "key": "B",
          "text": "Menggantikan proses pemotongan pelepah sawit di kebun secara otomatis"
        },
        {
          "key": "C",
          "text": "Mengirimkan getah karet cair melalui koneksi jaringan internet 4G"
        },
        {
          "key": "D",
          "text": "Mengukur kadar air tanah secara langsung tanpa alat sensor lapangan"
        },
        {
          "key": "E",
          "text": "Menolak kedatangan penyuluh pertanian lapangan ke perkebunan"
        }
      ],
      "correct": "A",
      "explanation": "Grup chat petani menjadi kanal pertukaran informasi agribisnis cepat: update harga peron/PKS, jadwal panen, dan distribusi sarana produksi."
    },
    {
      "id": 2133,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Etos kerja pekebun di OKU Timur mencerminkan nilai ketabahan dan kesabaran tinggi. Hal ini tercermin dari realitas budidaya komoditas perkebunan, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Petani harus berinvestasi modal, tenaga, dan waktu merawat bibit selama 3 hingga 5 tahun tanpa penghasilan sebelum tanaman menghasilkan panen perdana"
        },
        {
          "key": "B",
          "text": "Petani dapat memetik hasil panen melimpah hanya dalam waktu 3 minggu setelah tanam"
        },
        {
          "key": "C",
          "text": "Pekerjaan kebun tidak memerlukan pemeliharaan rutin sama sekali"
        },
        {
          "key": "D",
          "text": "Petani dijamin selalu untung tanpa pernah terpengaruh oleh faktor cuaca"
        },
        {
          "key": "E",
          "text": "Tanaman perkebunan selalu tumbuh subur di segala jenis tanah tanpa perlu dipupuk"
        }
      ],
      "correct": "A",
      "explanation": "Karakter komoditas tahunan menuntut modal mental jangka panjang (gestation period) selama fase TBM sebelum menghasilkan arus kas positif."
    },
    {
      "id": 2134,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Infrastruktur jalan kebun (jalan poros dan jalan rintis) di wilayah perkebunan OKU Timur sering diperkeras menggunakan material sirtu (pasir batu) atau batu belah. Urgensi perkerasan jalan kebun ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memastikan truk pengangkut TBS dan bokar tidak terperosok amblas lumpur saat musim hujan sehingga hasil panen tidak tertahan membusuk"
        },
        {
          "key": "B",
          "text": "Sebagai arena balapan sepeda motor para pemuda desa di akhir pekan"
        },
        {
          "key": "C",
          "text": "Mencegah debu berterbangan ke arah tajuk daun kelapa sawit"
        },
        {
          "key": "D",
          "text": "Mempercepat aliran air hujan agar langsung mengalir ke laut lepas"
        },
        {
          "key": "E",
          "text": "Mengubah status jalan kebun menjadi jalan tol berbayar"
        }
      ],
      "correct": "A",
      "explanation": "Aksesibilitas jalan produksi kebun sangat krusial; keterlambatan angkut TBS > 48 jam akan menaikkan asam lemak bebas dan merusak mutu minyak."
    },
    {
      "id": 2135,
      "day": 2,
      "sector": "perkebunan",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Gagasan hilirisasi komoditas karet alam dan kelapa sawit di tingkat Kabupaten OKU Timur agar tidak hanya bergantung pada penjualan bahan mentah adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mendorong pendirian industri pengolahan ban vulkanisir, sarung tangan karet, dan pabrik minyak goreng kemasan lokal skala UMKM/BUMDes"
        },
        {
          "key": "B",
          "text": "Menghentikan seluruh aktivitas ekspor dan menimbun hasil panen di gudang desa"
        },
        {
          "key": "C",
          "text": "Mewajibkan seluruh petani membakar pohon karet yang sedang berproduksi"
        },
        {
          "key": "D",
          "text": "Mengimpor minyak sawit dan karet mentah dari negara lain dengan harga mahal"
        },
        {
          "key": "E",
          "text": "Menghapus mata pelajaran ekonomi dan kewirausahaan di seluruh sekolah kejuruan"
        }
      ],
      "correct": "A",
      "explanation": "Hilirisasi menciptakan nilai tambah ekonomi ganda di daerah, membuka lapangan kerja baru bagi generasi muda, dan menstabilkan pendapatan pekebun."
    }
  ],
  "peternakan": [
    {
      "id": 2201,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "A",
      "indicatorKey": "etos_merumat_ternak",
      "indicatorName": "Budaya, Nilai Sosial & Falsafah Beternak di Pedesaan OKU Timur",
      "cognitiveLevel": "C2",
      "question": "Di kalangan masyarakat petani dan perdesaan OKU Timur, memelihara ternak (sapi, kambing, maupun unggas ayam) memiliki nilai sosial-budaya yang mendalam selain sekadar mencari uang. Istilah lokal \"merumat ternak\" mencerminkan filosofi hidup berupa...",
      "options": [
        {
          "key": "A",
          "text": "Ketelatenan, kesabaran, dan kasih sayang merawat makhluk hidup secara disiplin dari fajar hingga malam"
        },
        {
          "key": "B",
          "text": "Upaya mengejar keuntungan instan tanpa perlu memperhatikan sanitasi kandang dan pakan"
        },
        {
          "key": "C",
          "text": "Kebiasaan membiarkan hewan ternak berkeliaran bebas mencari makan di pekarangan tetangga"
        },
        {
          "key": "D",
          "text": "Perilaku gengsi sosial untuk memamerkan jumlah hewan kurban di media sosial"
        },
        {
          "key": "E",
          "text": "Ketergantungan penuh petani pada bantuan subsidi bibit ternak dari pemerintah pusat"
        }
      ],
      "correct": "A",
      "explanation": "Filosofi \"merumat ternak\" mencerminkan etos ketelatenan, disiplin jadwal pakan/minum, pembersihan kandang, dan empati kesejahteraan hewan (animal welfare)."
    },
    {
      "id": 2202,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "tata_letak_kandang",
      "indicatorName": "Manajemen Tata Ruang Kandang Ternak & Unggas",
      "cognitiveLevel": "C3",
      "question": "Berdasarkan lembar observasi kesehatan lingkungan peternakan di OKU Timur, penataan arah membujur kandang sapi, kambing, maupun kandang ayam yang paling tepat adalah membujur dari timur ke barat dengan tujuan...",
      "options": [
        {
          "key": "A",
          "text": "Menghindari tiupan angin kencang dari arah persawahan saat musim hujan lebat"
        },
        {
          "key": "B",
          "text": "Memperoleh sinar matahari pagi yang cukup untuk membunuh kuman penyakit tanpa menyebabkan suhu kandang terlalu panas saat siang"
        },
        {
          "key": "C",
          "text": "Menyesuaikan arah aliran parit irigasi teknis di sepanjang jalan desa"
        },
        {
          "key": "D",
          "text": "Memudahkan kendaraan truk pengangkut pakan membongkar muatan di depan kandang"
        },
        {
          "key": "E",
          "text": "Menghemat kebutuhan tiang kayu penyangga dan konstruksi atap seng kandang"
        }
      ],
      "correct": "B",
      "explanation": "Orientasi kandang timur-barat memaksimalkan masuknya sinar ultraviolet matahari pagi (membantu sintesis vitamin D dan sanitasi alami) serta menghindari panas terik menyengat di siang hari."
    },
    {
      "id": 2203,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "mekanisasi_peternakan",
      "indicatorName": "Teknologi & Mekanisasi Peralatan Peternakan Modern",
      "cognitiveLevel": "C2",
      "question": "Pada observasi teknologi peternakan modern di OKU Timur, mesin chopper rumput digunakan pada kandang ruminansia (sapi/kambing), sedangkan pada kandang unggas ayam broiler/petelur modern dipasang peralatan otomatis berupa...",
      "options": [
        {
          "key": "A",
          "text": "Traktor roda empat dan bajak singkal pembalik sekam kandang"
        },
        {
          "key": "B",
          "text": "Nipple drinker (tempat minum tetes otomatis) dan exhaust fan pengatur sirkulasi udara"
        },
        {
          "key": "C",
          "text": "Mesin perontok padi dan ayakan gabah manual"
        },
        {
          "key": "D",
          "text": "Kompresor udara tekanan tinggi pencuci bulu ayam"
        },
        {
          "key": "E",
          "text": "Mesin pemanen gabah combine harvester berskala mini"
        }
      ],
      "correct": "B",
      "explanation": "Pada kandang ayam broiler/layer modern, nipple drinker otomatis menyediakan air higienis tanpa tumpah, dan exhaust fan (kipas penyedot) menjaga sirkulasi udara dan suhu kandang tetap sejuk."
    },
    {
      "id": 2204,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "mesin_chopper_rumput",
      "indicatorName": "Sistem Kerja Mesin Chopper Hijauan Pakan Ternak",
      "cognitiveLevel": "C4",
      "question": "Mesin chopper perajang rumput digerakkan oleh motor bensin 6,5 HP. Prinsip kerja teknis mesin ini yang memberikan dampak efisiensi konsumsi pakan pada sapi dan kambing adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mencampur rumput dengan bahan kimia pewarna agar ternak lebih bernafsu makan"
        },
        {
          "key": "B",
          "text": "Memotong serat rumput menjadi ukuran pendek (2–5 cm) sehingga memperluas bidang sentuh mikroba rumen dan ternak tidak menyisakan batang keras"
        },
        {
          "key": "C",
          "text": "Memanaskan rumput hingga matang agar terhindar dari kuman pembusuk"
        },
        {
          "key": "D",
          "text": "Mengeringkan kadar air rumput segar seketika hingga menjadi tepung pelet kering"
        },
        {
          "key": "E",
          "text": "Menghilangkan kandungan serat kasar rumput gajah secara total"
        }
      ],
      "correct": "B",
      "explanation": "Pencacahan rumput menjadi ukuran 2-5 cm mempermudah ternak mengunyah, memperluas fermentasi mikroba rumen, dan mencegah ternak hanya memilih daun serta membuang batang keras."
    },
    {
      "id": 2205,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "fermentasi_jerami_padi",
      "indicatorName": "Pengolahan Limbah Jerami Padi Sawah Belitang untuk Pakan",
      "cognitiveLevel": "C3",
      "question": "Kawasan Belitang OKU Timur menghasilkan limbah jerami padi pascapanen dalam jumlah masif. Metode bioteknologi tepat guna untuk meningkatkan nilai kecernaan dan kadar protein jerami padi kering agar layak dijadikan pakan sapi dan kambing adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pembakaran jerami di petak sawah hingga menjadi abu gosok kandang"
        },
        {
          "key": "B",
          "text": "Amoniasi menggunakan urea atau fermentasi anaerob dengan inokulan mikroba (silase jerami)"
        },
        {
          "key": "C",
          "text": "Perendaman jerami dalam air saluran irigasi selama 30 hari hingga membusuk"
        },
        {
          "key": "D",
          "text": "Penggilingan jerami bercampur pasir dan tanah lempung sawah"
        },
        {
          "key": "E",
          "text": "Penjemuran jerami di atas aspal jalan raya sampai kering rapuh"
        }
      ],
      "correct": "B",
      "explanation": "Amoniasi urea atau fermentasi silase memecah ikatan lignoselulosa jerami yang alot, meningkatkan kecernaan serat, serta menaikkan kadar protein kasar pakan ternak."
    },
    {
      "id": 2206,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "pemanfaatan_dedak_padi",
      "indicatorName": "Pemanfaatan Dedak dan Bekatul Hasil RMU Belitang",
      "cognitiveLevel": "C2",
      "question": "Pabrik Penggilingan Padi (RMU) di Belitang melimpah menghasilkan dedak dan bekatul halus. Dalam manajemen nutrisi peternakan, dedak padi ini menjadi pakan sangat strategis bagi sapi, kambing, maupun ayam/bebek karena kaya akan...",
      "options": [
        {
          "key": "A",
          "text": "Kalsium murni dan zat pewarna kuning alami"
        },
        {
          "key": "B",
          "text": "Energi metabolis, karbohidrat, dan vitamin B kompleks dengan harga relatif terjangkau"
        },
        {
          "key": "C",
          "text": "Klorofil daun dan antibiotik sintetis dosis tinggi"
        },
        {
          "key": "D",
          "text": "Zat pengawet kimia yang membuat pakan tahan hingga 5 tahun"
        },
        {
          "key": "E",
          "text": "Zat racun alami yang mampu membasmi lalat kandang"
        }
      ],
      "correct": "B",
      "explanation": "Dedak padi kaya akan karbohidrat/energi, protein nabati (11-13%), dan vitamin B, menjadikannya bahan pakan utama ransum sapi comboran, kambing, serta pakan unggas ayam dan bebek."
    },
    {
      "id": 2207,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "inseminasi_buatan_ib",
      "indicatorName": "Penerapan Teknologi Inseminasi Buatan (IB) pada Sapi",
      "cognitiveLevel": "C3",
      "question": "Dalam peningkatan mutu genetik sapi potong di OKU Timur, petugas Poskeswan rutin melakukan program Inseminasi Buatan (IB/kawin suntik). Keunggulan utama program IB dibandingkan kawin alami pemacek jantan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Biaya anakan sapi hasil IB otomatis disubsidi gratis oleh bank daerah"
        },
        {
          "key": "B",
          "text": "Mempercepat perbaikan mutu genetik (Limousin, Simmental, Brahman) tanpa perlu membeli pejantan unggul yang sangat mahal"
        },
        {
          "key": "C",
          "text": "Menjamin induk sapi pasti melahirkan anak kembar tiga setiap tahun"
        },
        {
          "key": "D",
          "text": "Menghilangkan kewajiban peternak membersihkan kotoran kandang"
        },
        {
          "key": "E",
          "text": "Membuat sapi kebal terhadap semua jenis gigitan nyamuk dan lalat kandang"
        }
      ],
      "correct": "B",
      "explanation": "Inseminasi Buatan (IB) memungkinkan peternak rakyat menghasilkan pedet persilangan unggul berbobot besar (Limousin/Simmental) dari pejantan elit bersertifikat dengan biaya murah."
    },
    {
      "id": 2208,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "manajemen_brooding_ayam",
      "indicatorName": "Fase Pemeliharaan Brooding pada Peternakan Ayam Broiler",
      "cognitiveLevel": "C3",
      "question": "Pada budidaya ayam broiler (pedaging) di OKU Timur, fase \"brooding\" (pemeliharaan anak ayam umur 1–14 hari) merupakan periode paling kritis. Peternak memasang tirai melingkar (chick guard) dan alat pemanas (brooder/gasolec) bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menjaga suhu lingkungan hangat (32°–35°C) karena termoregulasi tubuh anak ayam DOC belum sempurna"
        },
        {
          "key": "B",
          "text": "Memaksa anak ayam tidur terus sepanjang hari agar pakan tidak cepat habis"
        },
        {
          "key": "C",
          "text": "Mencegah ayam melihat lingkungan luar agar tidak berkokok di malam hari"
        },
        {
          "key": "D",
          "text": "Mengurangi kebutuhan air minum hingga separuh takaran standar"
        },
        {
          "key": "E",
          "text": "Membuat bulu anak ayam berubah warna menjadi putih berkilau"
        }
      ],
      "correct": "A",
      "explanation": "Anak ayam (DOC) belum mampu mengatur suhu tubuhnya sendiri (termoregulasi belum matang). Pemanas brooder menjaga suhu hangat 32-35°C agar DOC tidak kedinginan, tidak menumpuk, dan saluran pencernaannya tumbuh optimal."
    },
    {
      "id": 2209,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "desain_lantai_kandang",
      "indicatorName": "Rancang Bangun Konstruksi Lantai Kandang Sapi, Kambing & Ayam",
      "cognitiveLevel": "C4",
      "question": "Hasil analisis komparatif konstruksi lantai kandang menunjukkan perbedaan spesifik: kandang sapi memakai lantai semen beralur dengan kemiringan 2°–5°, kandang kambing memakai panggung bilah kayu bercelah 1,5 cm, sedangkan kandang ayam broiler memakai lantai postal sekam padi. Alasan teknis digunakannya sekam padi pada kandang ayam broiler adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sebagai bahan makanan pokok tambahan pengganti jagung giling"
        },
        {
          "key": "B",
          "text": "Menyerap kelembapan feses/kotoran, menjaga kehangatan kaki ayam, dan mencegah luka pada dada (blister)"
        },
        {
          "key": "C",
          "text": "Membuat feses ayam mengeras seperti batu bata bangunan"
        },
        {
          "key": "D",
          "text": "Mencegah ayam bertelur sebelum waktunya tiba"
        },
        {
          "key": "E",
          "text": "Menghemat kebutuhan atap pelindung seng kandang"
        }
      ],
      "correct": "B",
      "explanation": "Sekam padi padi sawah Belitang berfungsi sebagai bedding/litter yang menyerap air kotoran ayam, memberi isolasi termal hangat, dan menjaga permukaan empuk agar dada/kaki ayam broiler tidak lecet/blister."
    },
    {
      "id": 2210,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "ventilasi_atap_kandang",
      "indicatorName": "Arsitektur Atap Sistem Monitor untuk Kelancaran Sirkulasi Udara",
      "cognitiveLevel": "C3",
      "question": "Bentuk atap kandang tipe monitor (atap bertingkat dengan ventilasi udara di puncaknya) sangat banyak diterapkan pada peternakan sapi dan kandang ayam open house di OKU Timur. Keuntungan aerodinamika dari model atap ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menampung air hujan secara maksimal untuk dialirkan ke bak minum"
        },
        {
          "key": "B",
          "text": "Memfasilitasi udara panas dan gas amonia yang bermassa jenis lebih ringan untuk keluar secara alami lewat puncak atap"
        },
        {
          "key": "C",
          "text": "Mencegah masuknya burung liar dan kelelawar secara permanen"
        },
        {
          "key": "D",
          "text": "Mengurangi beban tiang pancang dari goncangan gempa bumi"
        },
        {
          "key": "E",
          "text": "Membuat suara petir teredam sehingga ternak tidak kaget"
        }
      ],
      "correct": "B",
      "explanation": "Udara panas dan gas amonia di dalam kandang akan naik ke atas (efek cerobong termal). Ventilasi atap monitor memungkinkan gas amonia keluar lancar sehingga udara di lantai kandang tetap segar."
    },
    {
      "id": 2211,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "biosekuriti_sanitasi_kandang",
      "indicatorName": "Penerapan Prosedur Biosekuriti 3 Zona di Peternakan",
      "cognitiveLevel": "C4",
      "question": "Pencegahan wabah penyakit menular pada peternakan ayam pedaging/petelur maupun kandang sapi di OKU Timur menerapkan konsep biosekuriti ketat. Salah satu implementasi biosekuriti konseptual di pintu masuk kandang adalah penyediaan \"foot bath\", yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Bak air hangat untuk merendam kaki ternak yang pegal setelah merumput"
        },
        {
          "key": "B",
          "text": "Bak berisi larutan desinfektan untuk mencelupkan sepatu boot pekerja/tamu sebelum melangkah masuk ke area kandang"
        },
        {
          "key": "C",
          "text": "Saluran pembuangan kotoran cair menuju kolam ikan lele"
        },
        {
          "key": "D",
          "text": "Tempat mencuci peralatan mesin chopper rumput setelah dipakai"
        },
        {
          "key": "E",
          "text": "Bak penampung air minum otomatis bagi ayam yang kehausan"
        }
      ],
      "correct": "B",
      "explanation": "Foot bath (bak celup kaki) berisi larutan desinfektan mematikan virus, bakteri, dan patogen yang menempel pada alas kaki pekerja atau tamu sebelum memasuki zona bersih kandang."
    },
    {
      "id": 2212,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "vaksinasi_pencegahan_penyakit",
      "indicatorName": "Jadwal Vaksinasi & Pengendalian Penyakit Viral Ternak",
      "cognitiveLevel": "C3",
      "question": "Penyakit viral pada peternakan unggas dan ternak besar tidak dapat diobati dengan antibiotik, melainkan harus dicegah melalui program vaksinasi terjadwal. Pasangan penyakit dan jenis ternak yang tepat di bawah ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Penyakit Tetelo/ND (Newcastle Disease) pada ayam, dan Penyakit Mulut dan Kuku (PMK) pada sapi/kambing"
        },
        {
          "key": "B",
          "text": "Penyakit Mulut dan Kuku (PMK) pada ayam broiler, dan Flu Burung pada sapi potong"
        },
        {
          "key": "C",
          "text": "Penyakit Gumboro pada sapi perah, dan Penyakit Antraks pada bebek petelur"
        },
        {
          "key": "D",
          "text": "Penyakit Ngorok (SE) pada ayam pedaging, dan Cacing Hati pada burung puyuh"
        },
        {
          "key": "E",
          "text": "Penyakit Rabies pada kambing etawa, dan Penyakit Surra pada ayam joper"
        }
      ],
      "correct": "A",
      "explanation": "ND (Newcastle Disease/Tetelo) dan AI (Avian Influenza) adalah penyakit viral fatal pada unggas, sedangkan PMK (Foot and Mouth Disease) dan LSD (Lumpy Skin Disease) menyerang ternak ruminansia sapi dan kambing."
    },
    {
      "id": 2213,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "kalkulasi_fcr_pakan",
      "indicatorName": "Konsep Matematis & Efisiensi FCR (Feed Conversion Ratio)",
      "cognitiveLevel": "C4",
      "question": "Dalam evaluasi finansial usaha peternakan ayam broiler maupun penggemukan sapi di Belitang, dikenal indikator FCR (Feed Conversion Ratio). Jika seekor ayam broiler mengonsumsi total pakan 3,0 kg dan menghasilkan bobot badan hidup 2,0 kg, maka nilai FCR dan maknanya adalah...",
      "options": [
        {
          "key": "A",
          "text": "FCR 0,67; artinya setiap 0,67 kg bobot ayam butuh 2 kg pakan"
        },
        {
          "key": "B",
          "text": "FCR 1,50; artinya dibutuhkan 1,5 kg pakan untuk menghasilkan 1 kg pertambahan bobot badan"
        },
        {
          "key": "C",
          "text": "FCR 5,00; artinya ayam mengalami pemborosan pakan 5 kali lipat"
        },
        {
          "key": "D",
          "text": "FCR 6,00; artinya keuntungan peternak mencapai 6 kali modal bibit"
        },
        {
          "key": "E",
          "text": "FCR 1,00; artinya seluruh pakan berubah menjadi daging tanpa ada kotoran"
        }
      ],
      "correct": "B",
      "explanation": "FCR dihitung dari Total Pakan : Bobot Hidup = 3,0 kg : 2,0 kg = 1,50. Semakin kecil nilai FCR, semakin efisien dan hemat penggunaan pakan ternak tersebut."
    },
    {
      "id": 2214,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "manajemen_air_minum_unggas",
      "indicatorName": "Penyediaan Air Minum Nipple Drinker & Kualitas Air Ternak",
      "cognitiveLevel": "C3",
      "question": "Penyediaan air minum pada peternakan ayam modern menggunakan sistem pipa tertutup dengan \"nipple drinker\". Keunggulan sistem ini dibandingkan tempat minum manual berbentuk galon gantung adalah...",
      "options": [
        {
          "key": "A",
          "text": "Air minum tidak mudah tumpah sehingga lantai sekam tetap kering dan bebas bau amonia menyengat"
        },
        {
          "key": "B",
          "text": "Air di dalam pipa berubah menjadi manis secara otomatis tanpa gula"
        },
        {
          "key": "C",
          "text": "Ayam tidak perlu minum air setiap hari karena nipple menyimpan cadangan air di tubuh ayam"
        },
        {
          "key": "D",
          "text": "Membuat ayam tidak buang kotoran selama masa pemeliharaan"
        },
        {
          "key": "E",
          "text": "Menggantikan fungsi kipas blower pendingin kandang"
        }
      ],
      "correct": "A",
      "explanation": "Nipple drinker hanya meneteskan air saat dipatuk ayam, menjaga air tetap steril dari debu/feses, dan mencegah air tumpah membasahi litter sekam padi, sehingga menekan pembentukan gas amonia."
    },
    {
      "id": 2215,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "pupuk_kandang_organik",
      "indicatorName": "Pengolahan Limbah Kotoran Ternak Menjadi Pupuk Organik Kompos",
      "cognitiveLevel": "C3",
      "question": "Pengolahan limbah kotoran padat sapi, kambing, atau kotoran ayam menjadi pupuk kandang matang sebelum diaplikasikan ke sawah padi Belitang harus melalui proses fermentasi/pematangan terlebih dahulu karena...",
      "options": [
        {
          "key": "A",
          "text": "Kotoran segar mengeluarkan bau wangi yang mengundang hama tikus sawah"
        },
        {
          "key": "B",
          "text": "Kotoran segar masih mengalami proses dekomposisi bersuhu tinggi dan menghasilkan gas beracun yang dapat membakar perakaran tanaman padi"
        },
        {
          "key": "C",
          "text": "Kotoran ternak segar dilarang oleh peraturan adat desa Belitang"
        },
        {
          "key": "D",
          "text": "Fermentasi membuat volume kotoran bertambah sepuluh kali lipat"
        },
        {
          "key": "E",
          "text": "Kotoran segar tidak laku dijual di pasar hewan mingguan"
        }
      ],
      "correct": "B",
      "explanation": "Kotoran ternak segar memiliki rasio C/N tinggi dan masih panas (mengeluarkan gas amonia dan metana) akibat aktivitas bakteri pengurai. Fermentasi mendinginkan suhu dan mematangkan unsur hara agar siap diserap akar tanaman."
    },
    {
      "id": 2216,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "kotoran_ayam_sekam",
      "indicatorName": "Nilai Ekonomis Kotoran Ayam Bercampur Sekam Padi",
      "cognitiveLevel": "C2",
      "question": "Limbah kotoran ayam broiler yang bercampur sekam padi saat masa panen di OKU Timur sangat diminati oleh para petani hortikultura dan palawija karena...",
      "options": [
        {
          "key": "A",
          "text": "Mengandung kadar nitrogen (N), fosfor (P), dan kalium (K) yang relatif tinggi serta memperbaiki struktur kegemburan tanah"
        },
        {
          "key": "B",
          "text": "Mampu membasmi gulma rumput teki secara instan tanpa herbisida"
        },
        {
          "key": "C",
          "text": "Dapat digunakan sebagai bahan baku pengganti semen plester dinding"
        },
        {
          "key": "D",
          "text": "Membuat warna daun sayuran berubah menjadi keemasan"
        },
        {
          "key": "E",
          "text": "Mencegah terjadinya banjir genangan di petak sawah irigasi"
        }
      ],
      "correct": "A",
      "explanation": "Kotoran ayam merupakan pupuk kandang dengan kandungan unsur hara makro (N, P, K) tertinggi di antara kotoran ternak lainnya, dan sekam padi membantu menggemburkan aerasi tanah pertanian."
    },
    {
      "id": 2217,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "reaktor_biogas_kotoran",
      "indicatorName": "Teknologi Energi Mandiri Reaktor Biogas Kotoran Sapi",
      "cognitiveLevel": "C4",
      "question": "Peternak sapi inovatif di desa peternakan OKU Timur membangun reaktor biogas (biodigester) dari kotoran sapi. Gas yang dihasilkan dari proses fermentasi anaerobik di dalam kubah biodigester dan dapat menyalakan kompor masak adalah gas...",
      "options": [
        {
          "key": "A",
          "text": "Oksigen (O2) murni"
        },
        {
          "key": "B",
          "text": "Metana (CH4) dan Karbon Dioksida (CO2)"
        },
        {
          "key": "C",
          "text": "Klorin dan Freon pendingin"
        },
        {
          "key": "D",
          "text": "Nitrogen monoksida cair"
        },
        {
          "key": "E",
          "text": "Helium pengisi balon udara"
        }
      ],
      "correct": "B",
      "explanation": "Bakteri metanogenik mengurai materi organik kotoran ternak dalam kondisi kedap udara (anaerob) menghasilkan biogas yang didominasi oleh gas metana (CH4 55-70%) yang mudah terbakar sebagai energi terbarukan."
    },
    {
      "id": 2218,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "kandang_panggung_kambing",
      "indicatorName": "Rancang Bangun Kandang Panggung Kambing & Domba",
      "cognitiveLevel": "C3",
      "question": "Pada peternakan kambing dan domba di OKU Timur, konstruksi kandang yang paling banyak dianjurkan adalah model panggung setinggi 50–100 cm dari tanah. Manfaat biologis dan ergonomis dari kandang panggung ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menghindarkan kambing dari predator harimau sumatera secara permanen"
        },
        {
          "key": "B",
          "text": "Memisahkan ternak dari kotoran dan air kencingnya sendiri sehingga kaki tetap kering, bebas kutu, dan terhindar dari penyakit kuku busuk (foot rot)"
        },
        {
          "key": "C",
          "text": "Membuat kambing rajin memanjat tiang kayu agar otot kakinya kekar"
        },
        {
          "key": "D",
          "text": "Memudahkan kambing melompat ke luar kandang saat siang hari"
        },
        {
          "key": "E",
          "text": "Mengurangi kebutuhan genteng atap pelindung panas"
        }
      ],
      "correct": "B",
      "explanation": "Lantai panggung berkisi membuat kotoran padat dan air kencing langsung jatuh ke kolong tanah, menjaga lantai pijakan kambing tetap kering, higienis, serta mencegah penyakit kuku busuk dan cacingan."
    },
    {
      "id": 2219,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "kandang_baterai_layer",
      "indicatorName": "Sistem Kandang Baterai pada Budidaya Ayam Petelur (Layer)",
      "cognitiveLevel": "C3",
      "question": "Pada usaha ayam petelur (layer) komersial di OKU Timur, peternak menggunakan kandang sistem baterai (sekat individual/ganda dengan lantai berkemiringan khusus). Fungsi utama lantai miring pada kandang baterai tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memaksa ayam terus berdiri agar lemak tubuhnya terbakar"
        },
        {
          "key": "B",
          "text": "Agar telur yang baru dikeluarkan induk langsung menggelinding perlahan ke talang depan sehingga tidak terinjak, tidak kotor, dan mudah diambil"
        },
        {
          "key": "C",
          "text": "Memudahkan sirkulasi angin sejuk dari kipas angin lantai"
        },
        {
          "key": "D",
          "text": "Mencegah ayam mematuk wadah pakan konsentrat di depannya"
        },
        {
          "key": "E",
          "text": "Membuat suara ayam berkokok menjadi lebih merdu"
        }
      ],
      "correct": "B",
      "explanation": "Kemiringan lantai kawat kandang baterai (±7-8 derajat) dirancang agar saat ayam bertelur, telur otomatis menggelinding ke penampung depan tanpa pecah atau terinjak oleh kaki ayam."
    },
    {
      "id": 2220,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "indicatorKey": "siklus_ekonomi_peternakan",
      "indicatorName": "Dinamika Pasar & Permintaan Musiman Komoditas Ternak",
      "cognitiveLevel": "C3",
      "question": "Siklus ekonomi peternak di OKU Timur sangat dipengaruhi oleh momentum hari besar keagamaan dan tradisi lokal. Pola penjualan yang mencerminkan kecerdasan finansial peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menjual seluruh sapi betina produktif saat harga daging sapi sedang anjlok"
        },
        {
          "key": "B",
          "text": "Menyiapkan panen sapi/kambing jantan untuk Idul Adha (kurban) dan panen ayam potong/telur menjelang Hari Raya Idul Fitri saat harga puncak"
        },
        {
          "key": "C",
          "text": "Memborong pakan konsentrat dengan hutang bunga tinggi saat musim paceklik panen padi"
        },
        {
          "key": "D",
          "text": "Menjual telur ayam hanya kepada tetangga dekat secara barter dengan gabah"
        },
        {
          "key": "E",
          "text": "Menolak menjual ternak meskipun usia ternak sudah melewati masa produktif optimum"
        }
      ],
      "correct": "B",
      "explanation": "Peternak yang cerdas mengatur siklus penggemukan dan populasi kandang agar panen bertepatan dengan lonjakan permintaan tertinggi (Idul Adha untuk kurban ruminansia, Lebaran untuk ayam/telur)."
    },
    {
      "id": 2221,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "indicatorKey": "rantai_pasok_ternak",
      "indicatorName": "Peran Lembaga Pemasaran & Lembaga Perantara di OKU Timur",
      "cognitiveLevel": "C2",
      "question": "Dalam pemasaran hasil peternakan rakyat di Belitang, perputaran sapi dan kambing banyak melibatkan \"blantik\" (pedagang perantara hewan), sedangkan peternakan ayam broiler umumnya bermitra dengan \"bakul ayam/broker\". Peran positif pedagang perantara ini bagi peternak desa adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menetapkan harga sepihak di bawah biaya pokok produksi peternak"
        },
        {
          "key": "B",
          "text": "Menyediakan akses pasar yang cepat mencairkan uang tunai (likuiditas) dan menanggung biaya transportasi angkutan hewan ke luar daerah"
        },
        {
          "key": "C",
          "text": "Mengambil alih kepemilikan sertifikat tanah kandang peternak"
        },
        {
          "key": "D",
          "text": "Melarang peternak menjual hewan ternaknya kepada warga sekitar"
        },
        {
          "key": "E",
          "text": "Menghapuskan kewajiban surat keterangan kesehatan hewan (SKKH) dari dinas"
        }
      ],
      "correct": "B",
      "explanation": "Pedagang perantara (blantik/bakul) menghubungkan peternak di pelosok desa dengan pasar hewan kota/konsumen besar, menyediakan armada truk angkut, dan memberikan pembayaran tunai seketika."
    },
    {
      "id": 2222,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "k3_peternakan_unggas_ternak",
      "indicatorName": "Penerapan K3 (Kesehatan & Keselamatan Kerja) di Area Kandang",
      "cognitiveLevel": "C3",
      "question": "Saat mengamati aktivitas harian pekerja di kandang ayam broiler atau kandang sapi penggemukan di Belitang, Alat Pelindung Diri (APD) mutlak yang wajib dipakai pekerja saat membersihkan kotoran kandang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Jas hujan plastik tebal dan helm pelindung kepala sepeda motor"
        },
        {
          "key": "B",
          "text": "Masker respirator penyaring partikel/amonia, sarung tangan karet, dan sepatu boot tahan air"
        },
        {
          "key": "C",
          "text": "Kacamata hitam gaya dan sarung tangan kain rajut tipis"
        },
        {
          "key": "D",
          "text": "Sepatu kets olahraga beralas licin dan celana pendek"
        },
        {
          "key": "E",
          "text": "Topi caping anyaman bambu tanpa alas kaki"
        }
      ],
      "correct": "B",
      "explanation": "Masker respirator melindungi paru-paru dari gas amonia dan debu sekam/pakan, sarung tangan karet melindungi dari kuman patogen feses, dan sepatu boot karet mencegah tergelincir serta infeksi kuman."
    },
    {
      "id": 2223,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "pengendalian_bau_dan_lalat",
      "indicatorName": "Pengendalian Bau Gas Amonia dan Hama Lalat Kandang",
      "cognitiveLevel": "C3",
      "question": "Salah satu tantangan sosial peternakan yang berlokasi dekat pemukiman warga adalah bau amonia dan kerumunan lalat. Langkah bioteknologi ramah lingkungan yang dilakukan peternak untuk menekan bau kandang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menyemprotkan parfum kimia sintetis sebanyak mungkin ke tubuh ternak setiap pagi"
        },
        {
          "key": "B",
          "text": "Pemberian probiotik pengurai pada air minum/pakan dan penyemprotan mikroba dekomposer (seperti EM4) pada alas kotoran secara berkala"
        },
        {
          "key": "C",
          "text": "Membakar ban bekas di sekitar pagar kandang sepanjang malam"
        },
        {
          "key": "D",
          "text": "Mengurangi ventilasi kandang dengan menutup seluruh dinding rapat-rapat memakai seng"
        },
        {
          "key": "E",
          "text": "Menghentikan pemberian air minum pada ternak selama tiga hari berturut-turut"
        }
      ],
      "correct": "B",
      "explanation": "Probiotik (bakteri menguntungkan seperti Lactobacillus) memperbaiki pencernaan protein sehingga feses tidak berbau busuk, dan penyemprotan dekomposer menekan pembentukan gas amonia dan perkembangbiakan belatung lalat."
    },
    {
      "id": 2224,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "hijauan_makanan_ternak_hmt",
      "indicatorName": "Budidaya Hijauan Makanan Ternak Unggul (Rumput Odot & Pakchong)",
      "cognitiveLevel": "C3",
      "question": "Untuk menjamin pasokan pakan serat berkualitas bagi sapi dan kambing tanpa bergantung pada rumput liar pinggir jalan, peternak maju di OKU Timur membudidayakan rumput unggul seperti Rumput Odot dan Rumput Pakchong di pematang sawah. Keunggulan Rumput Odot adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tumbuh merambat di atas pohon kelapa sawit setinggi 10 meter"
        },
        {
          "key": "B",
          "text": "Berdaun lembut, batang empuk disukai ternak, kandungan protein relatif tinggi (12–14%), dan cepat bertunas kembali setelah dipangkas"
        },
        {
          "key": "C",
          "text": "Dapat menghasilkan beras merah saat dipanen di musim hujan"
        },
        {
          "key": "D",
          "text": "Tidak membutuhkan air dan pupuk sama sekali sepanjang tahun"
        },
        {
          "key": "E",
          "text": "Mempunyai duri tajam yang melindungi dari serangan hama serangga"
        }
      ],
      "correct": "B",
      "explanation": "Rumput Odot (Pennisetum purpureum cv. Mott) berbatang empuk dan pendek, tidak berbulu gatal, sangat disukai sapi/kambing, dan memiliki rasio daun terhadap batang yang sangat tinggi."
    },
    {
      "id": 2225,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "estimasi_bobot_dan_hdp",
      "indicatorName": "Kalkulasi Produktivitas Harian Ternak (ADG & Hen Day Production)",
      "cognitiveLevel": "C4",
      "question": "Pada peternakan sapi, penambahan berat badan harian diukur dengan ADG (Average Daily Gain). Sedangkan pada peternakan ayam petelur (layer) di Belitang, produktivitas bertelur diukur dengan rumus HDP (Hen Day Production). Jika dari 1.000 ekor ayam layer yang dipelihara dihasilkan 850 butir telur pada hari itu, maka persentase HDP kandang tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "8,5%"
        },
        {
          "key": "B",
          "text": "85%"
        },
        {
          "key": "C",
          "text": "117%"
        },
        {
          "key": "D",
          "text": "850%"
        },
        {
          "key": "E",
          "text": "75%"
        }
      ],
      "correct": "B",
      "explanation": "HDP dihitung dari: (Jumlah Butir Telur : Jumlah Ekor Ayam Hidup) x 100% = (850 : 1.000) x 100% = 85%. Nilai HDP di atas 80% menunjukkan performa produksi telur yang sangat baik dan menguntungkan."
    },
    {
      "id": 2226,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "nutrisi_kalsium_ayam_layer",
      "indicatorName": "Pentingnya Unsur Kalsium (Ca) pada Pembentukan Cangkang Telur",
      "cognitiveLevel": "C3",
      "question": "Peternak ayam petelur di OKU Timur menambahkan grit batu kapur atau tepung kulit kerang ke dalam pakan konsentrat terutama pada sore hari. Tujuan biologis penambahan suplemen ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Membuat kuning telur berwarna oranye pekat seperti wortel"
        },
        {
          "key": "B",
          "text": "Memenuhi kebutuhan kalsium (Ca) yang tinggi untuk proses kalsifikasi pembentukan kerabang/cangkang telur yang berlangsung di malam hari"
        },
        {
          "key": "C",
          "text": "Mencegah ayam bersuara ribut saat malam hari"
        },
        {
          "key": "D",
          "text": "Membuat ukuran telur bertambah berat menjadi 200 gram per butir"
        },
        {
          "key": "E",
          "text": "Mengurangi kebutuhan air minum ayam hingga separuhnya"
        }
      ],
      "correct": "B",
      "explanation": "Sekitar 95% cangkang telur tersusun atas kalsium karbonat (CaCO3). Penambahan grit kalsium berbutir kasar pada sore hari menyediakan pelepasan kalsium lambat di saluran pencernaan saat uterus membentuk cangkang di malam hari."
    },
    {
      "id": 2227,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "pencegahan_parasit_dan_stres",
      "indicatorName": "Pencegahan Parasit & Manajemen Stres Cuaca Ekstrem (Pancaroba)",
      "cognitiveLevel": "C3",
      "question": "Saat pergantian musim kemarau ke musim hujan (pancaroba) di OKU Timur, ternak ruminansia dan unggas rentan mengalami stres dan penurunan imunitas. Tindakan pemeliharaan preventif yang lazim dilakukan peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memberikan obat cacing secara berkala dan menambahkan vitamin antistres (seperti vitamin C dan elektrolit) ke dalam air minum"
        },
        {
          "key": "B",
          "text": "Memandikan ayam potong dengan air es setiap tengah hari"
        },
        {
          "key": "C",
          "text": "Menghentikan pemberian pakan hijauan segar selama satu bulan penuh"
        },
        {
          "key": "D",
          "text": "Menyalakan pengeras suara musik dengan volume keras di dalam kandang"
        },
        {
          "key": "E",
          "text": "Mengunci pintu kandang rapat-rapat tanpa ventilasi udara sama sekali"
        }
      ],
      "correct": "A",
      "explanation": "Obat cacing (anthelmintik) membasmi parasit internal yang menyerap nutrisi tubuh, sementara vitamin antistres dan elektrolit menstabilkan metabolisme tubuh saat terjadi fluktuasi suhu dan kelembapan ekstrem."
    },
    {
      "id": 2228,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "indicatorKey": "kemitraan_inti_plasma",
      "indicatorName": "Pola Kemitraan Inti-Plasma pada Usaha Ayam Broiler",
      "cognitiveLevel": "C4",
      "question": "Banyak peternak ayam broiler di OKU Timur bergabung dalam sistem \"Kemitraan Inti-Plasma\" dengan perusahaan peternakan (integrator). Dalam perjanjian kemitraan ini, pembagian peran yang adil dan benar adalah...",
      "options": [
        {
          "key": "A",
          "text": "Peternak plasma wajib menanggung kerugian jika harga ayam di pasar jatuh bebas tanpa batas"
        },
        {
          "key": "B",
          "text": "Perusahaan inti menyediakan sarana produksi (bibit DOC, pakan, obat/vaksin, dan bimbingan teknis), sedangkan peternak plasma menyediakan kandang, peralatan, listrik/air, dan tenaga pemeliharaan"
        },
        {
          "key": "C",
          "text": "Peternak plasma bebas menjual ayam panen ke pasar gelap tanpa sepengetahuan perusahaan inti"
        },
        {
          "key": "D",
          "text": "Perusahaan inti mengambil 100% laba hasil panen tanpa memberikan upah jasa pemeliharaan"
        },
        {
          "key": "E",
          "text": "Peternak plasma bertugas sebagai sopir truk pengantar pakan ke seluruh wilayah provinsi"
        }
      ],
      "correct": "B",
      "explanation": "Pola kemitraan inti-plasma melindungi peternak rakyat dari fluktuasi harga pasar yang tajam, di mana inti menjamin pasokan sapronak berkualitas dan membeli kembali hasil panen sesuai kontrak harga garansi."
    },
    {
      "id": 2229,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "recording_dan_digitalisasi",
      "indicatorName": "Pentingnya Pencatatan Data Harian (Recording) di Kandang",
      "cognitiveLevel": "C4",
      "question": "Peternak sapi, kambing, maupun peternak ayam komersial yang tertib manajemen selalu memiliki papan atau buku \"recording kandang\". Manfaat utama pencatatan recording harian ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sebagai syarat formalitas agar kandang bisa difoto untuk pameran desa"
        },
        {
          "key": "B",
          "text": "Memantau jumlah konsumsi pakan, angka kematian (mortalitas), pertambahan bobot, riwayat vaksinasi, dan menghitung keuntungan secara presisi"
        },
        {
          "key": "C",
          "text": "Menghafal nama-nama panggilan unik untuk setiap ekor ayam di dalam kandang"
        },
        {
          "key": "D",
          "text": "Mencegah petugas dinas peternakan datang memeriksa kandang"
        },
        {
          "key": "E",
          "text": "Menggantikan kewajiban peternak memberi pakan di pagi hari"
        }
      ],
      "correct": "B",
      "explanation": "Recording adalah dasar manajemen profesional peternakan. Tanpa pencatatan akurat, peternak tidak dapat mendeteksi dini gejala penyakit, kebocoran pakan, maupun mengevaluasi keuntungan finansial."
    },
    {
      "id": 2230,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "program_pencahayaan_unggas",
      "indicatorName": "Manajemen Pencahayaan (Lighting Program) pada Peternakan Ayam",
      "cognitiveLevel": "C4",
      "question": "Pada kandang ayam petelur (layer) dan broiler di OKU Timur, peternak mengatur jadwal penyalaan lampu penerangan (lighting program). Efek fisiologis pencahayaan lampu pada ayam petelur adalah merangsang...",
      "options": [
        {
          "key": "A",
          "text": "Kelenjar hipotalamus dan pituitari di otak untuk memproduksi hormon reproduksi yang memicu ovulasi pembentukan telur"
        },
        {
          "key": "B",
          "text": "Pertumbuhan bulu ekor ayam agar menjadi lebih panjang dan indah"
        },
        {
          "key": "C",
          "text": "Ayam untuk meminum air sebanyak mungkin hingga perutnya membesar"
        },
        {
          "key": "D",
          "text": "Perubahan jenis kelamin ayam betina menjadi pejantan tangguh"
        },
        {
          "key": "E",
          "text": "Ayam agar tidur lelap selama 20 jam per hari"
        }
      ],
      "correct": "A",
      "explanation": "Cahaya yang ditangkap mata ayam diteruskan ke hipotalamus, merangsang sekresi hormon FSH dan LH dari kelenjar pituitari, yang sangat vital untuk perkembangan folikel ovarium dan keteraturan siklus bertelur."
    },
    {
      "id": 2231,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "A",
      "indicatorKey": "karakter_pemuda_peternak",
      "indicatorName": "Pendidikan Karakter & Regenerasi Peternak Muda Milenial",
      "cognitiveLevel": "C2",
      "question": "Berdasarkan wawancara dengan tokoh peternak di OKU Timur, keterlibatan pelajar dan generasi muda dalam mengelola peternakan (sapi, kambing, atau ayam) menumbuhkan karakter profil pelajar pancasila yang nyata, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Kemandirian, etos kerja pantang menyerah, rasa tanggung jawab merawat kehidupan, dan jiwa kewirausahaan berbasis potensi desa"
        },
        {
          "key": "B",
          "text": "Sikap konsumtif dan ketergantungan pada pinjaman uang tanpa bekerja"
        },
        {
          "key": "C",
          "text": "Keinginan untuk cepat kaya tanpa melalui proses belajar dan ketekunan"
        },
        {
          "key": "D",
          "text": "Rasa malu dan gengsi jika harus membersihkan lingkungan kandang"
        },
        {
          "key": "E",
          "text": "Sikap mengabaikan kelestarian lingkungan demi mengejar uang semata"
        }
      ],
      "correct": "A",
      "explanation": "Aktivitas peternakan melatih disiplin harian, kepekaan terhadap makhluk hidup, kemandirian ekonomi, dan kemampuan memecahkan masalah praktis di lapangan."
    },
    {
      "id": 2232,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "indicatorKey": "ayam_kampung_unggul",
      "indicatorName": "Budidaya Ayam Kampung Unggul (KUB/Joper) Semi-Intensif",
      "cognitiveLevel": "C3",
      "question": "Selain ayam broiler ras pedaging, peternakan ayam kampung unggul (seperti Ayam KUB atau Joper / Jowo Super) kian marak di pekarangan rumah pedesaan OKU Timur. Alasan utama peternak memilih ayam kampung unggul daripada ayam kampung liar tradisional adalah...",
      "options": [
        {
          "key": "A",
          "text": "Ayam kampung unggul tidak memerlukan pakan dan air minum sama sekali"
        },
        {
          "key": "B",
          "text": "Waktu panen jauh lebih cepat (60–75 hari bobot 0,8–1,0 kg) dengan cita rasa daging gurih khas ayam kampung asli yang berharga jual tinggi"
        },
        {
          "key": "C",
          "text": "Ayam kampung unggul dapat dipelihara di dalam kamar tidur rumah"
        },
        {
          "key": "D",
          "text": "Telur ayam kampung unggul berukuran sebesar buah kelapa"
        },
        {
          "key": "E",
          "text": "Ayam kampung unggul dapat berkokok menirukan suara sirine ambulans"
        }
      ],
      "correct": "B",
      "explanation": "Ayam KUB dan Joper diseleksi secara genetik agar tumbuh jauh lebih cepat dibandingkan ayam kampung liar (yang butuh 5-6 bulan), namun tetap mempertahankan tekstur daging padat dan gurih yang disukai konsumen lokal."
    },
    {
      "id": 2233,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "indicatorKey": "kandang_closed_house",
      "indicatorName": "Teknologi Kandang Sistem Tertutup (Closed House) di Iklim Tropis",
      "cognitiveLevel": "C4",
      "question": "Modernisasi peternakan ayam broiler di Belitang kini mulai beralih ke sistem \"Closed House\" (kandang tertutup berpemanas dan berpendingin). Komponen utama yang bekerja mendinginkan udara kandang saat terik siang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Penyiraman lantai sekam dengan air lumpur irigasi"
        },
        {
          "key": "B",
          "text": "Kipas penyedot udara (exhaust fan) di ujung belakang dan bantalan pendingin basah (cooling pad / evaporative pad) di ujung depan kandang"
        },
        {
          "key": "C",
          "text": "Bongkahan es batu yang digantung di setiap tiang kandang"
        },
        {
          "key": "D",
          "text": "Pemasangan ratusan unit AC kamar tidur berdaya listrik tinggi"
        },
        {
          "key": "E",
          "text": "Membuka seluruh dinding terpal selebar-lebarnya saat angin kencang"
        }
      ],
      "correct": "B",
      "explanation": "Sistem evaporative cooling memanfaatkan exhaust fan berdaya besar untuk menarik udara luar melewati cooling pad basah. Penguapan air di bantalan menyerap panas udara, menurunkan suhu kandang 4-7°C lebih sejuk."
    },
    {
      "id": 2234,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "A",
      "indicatorKey": "solidaritas_kelompok_ternak",
      "indicatorName": "Tradisi Sambatan & Solidaritas Kelompok Peternak Desa",
      "cognitiveLevel": "C2",
      "question": "Di desa-desa sentra peternakan OKU Timur, ketika seorang peternak hendak mendirikan bangunan kandang baru atau menghadapi ternaknya sakit, warga sekitar datang membantu secara sukarela tanpa meminta upah harian. Nilai kearifan lokal ini merupakan wujud tradisi...",
      "options": [
        {
          "key": "A",
          "text": "Sambatan atau gotong royong sosial yang mempererat kerukunan antar-warga perdesaan"
        },
        {
          "key": "B",
          "text": "Sistem ijon pinjaman rentenir perdesaan yang mengikat peternak"
        },
        {
          "key": "C",
          "text": "Persaingan dagang tidak sehat antar-pemilik hewan ternak"
        },
        {
          "key": "D",
          "text": "Monopoli usaha peternakan oleh keluarga kepala desa"
        },
        {
          "key": "E",
          "text": "Kewajiban upeti hasil ternak kepada aparat keamanan setempat"
        }
      ],
      "correct": "A",
      "explanation": "Tradisi gotong royong sambatan adalah modal sosial berharga di OKU Timur yang memangkas biaya modal pembangunan kandang dan memperkokoh solidaritas masyarakat petani-peternak."
    },
    {
      "id": 2235,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "indicatorKey": "integrasi_tanaman_ternak_sitt",
      "indicatorName": "Model Ekonomi Sirkular Sistem Integrasi Tanaman-Ternak (SITT)",
      "cognitiveLevel": "C4",
      "question": "Konsep Sistem Integrasi Tanaman-Ternak (SITT) atau \"Crop-Livestock System\" di OKU Timur mengintegrasikan persawahan padi irigasi dengan peternakan (sapi, kambing, dan unggas). Hubungan simbiosis mutualisme ekonomi sirkular yang terwujud adalah...",
      "options": [
        {
          "key": "A",
          "text": "Peternak membiarkan ternaknya memakan tanaman padi muda milik tetangga sampai habis"
        },
        {
          "key": "B",
          "text": "Limbah jerami dan dedak padi sawah dimanfaatkan sebagai pakan murah berkualitas, sedangkan limbah kotoran ternak diolah menjadi pupuk organik yang menyuburkan kembali tanah sawah"
        },
        {
          "key": "C",
          "text": "Petani menjual seluruh tanah sawahnya untuk dijadikan area pembuangan kotoran ayam"
        },
        {
          "key": "D",
          "text": "Peternak mewajibkan penggilingan padi membagikan beras gratis setiap bulan"
        },
        {
          "key": "E",
          "text": "Penanaman padi dihentikan sepenuhnya dan diganti dengan kolam pembuangan limbah kandang"
        }
      ],
      "correct": "B",
      "explanation": "Sistem integrasi tanaman-ternak (SITT) menciptakan ekonomi sirkular tanpa limbah (zero waste): jerami dan dedak padi menjadi pakan ternak, dan kotoran ternak menjadi pupuk organik kaya hara bagi tanah sawah Belitang."
    }
  ],
  "perikanan": [
    {
      "id": 2301,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Kabupaten OKU Timur ditetapkan oleh Kementerian Kelautan dan Perikanan sebagai salah satu sentra Kawasan Minapolitan Patin di Sumatera Selatan (khususnya Belitang Madang Raya dan sekitarnya). Faktor pendukung utama penetapan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Ketersediaan debit air tawar berlimpah sepanjang tahun dari jaringan saluran irigasi teknis Bendung Perjaya dan topografi tanah lempung liat yang cocok untuk kolam"
        },
        {
          "key": "B",
          "text": "Wilayah OKU Timur berbatasan langsung dengan garis pantai samudera lepas"
        },
        {
          "key": "C",
          "text": "Air kolam di OKU Timur memiliki rasa asin alami seperti air laut"
        },
        {
          "key": "D",
          "text": "Seluruh warga desa diwajibkan hanya memakan ikan patin setiap hari"
        },
        {
          "key": "E",
          "text": "Ikan patin merupakan satu-satunya hewan yang dapat hidup di persawahan OKU Timur"
        }
      ],
      "correct": "A",
      "explanation": "Sinergi jaringan irigasi Komering-Belitang dengan jenis tanah liat kedap air menciptakan daya dukung optimal bagi ribuan hektar kolam budidaya patin."
    },
    {
      "id": 2302,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Tipe konstruksi kolam budidaya patin yang paling dominan diamati di sentra perikanan Belitang adalah kolam tanah berukuran luas (1.000–2.500 m2). Keunggulan kolam tanah alami ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mendukung tumbuhnya pakan alami (plankton dan bentos), biaya konstruksi ekonomis, dan volume air yang besar menjaga kestabilan suhu habitat patin"
        },
        {
          "key": "B",
          "text": "Air kolam tidak akan pernah berkurang meskipun terjadi kebocoran tanggul"
        },
        {
          "key": "C",
          "text": "Kolam tanah dapat berpindah lokasi secara otomatis mengikuti arah angin"
        },
        {
          "key": "D",
          "text": "Ikan patin tidak perlu diberi makan pelet sama sekali hingga masa panen"
        },
        {
          "key": "E",
          "text": "Mencegah seluruh jenis burung pemakan ikan mendekati kawasan kolam"
        }
      ],
      "correct": "A",
      "explanation": "Kolam tanah berdaya sangga lingkungan tinggi, menumbuhkan mikroorganisme pakan alami, dan meredam fluktuasi suhu air harian secara alami."
    },
    {
      "id": 2303,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Infrastruktur tata air kolam perikanan di Belitang memanfaatkan saluran pemasukan (intake) dan saluran pengeluaran (monik / outlet). Fungsi pintu monik bertingkat adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengatur kedalaman air kolam secara fleksibel dan membuang lapisan air bawah yang kotor mengandung endapan amonia kotoran ikan"
        },
        {
          "key": "B",
          "text": "Sebagai pintu jebakan untuk menangkap ikan liar yang masuk dari sungai"
        },
        {
          "key": "C",
          "text": "Mencegah air kolam mengalir keluar menuju saluran drainase desa"
        },
        {
          "key": "D",
          "text": "Menghangatkan air kolam pada waktu tengah malam menggunakan listrik"
        },
        {
          "key": "E",
          "text": "Menyaring oksigen murni dari udara bebas masuk ke dasar kolam"
        }
      ],
      "correct": "A",
      "explanation": "Sistem pintu monik papan sekat bertingkat memungkinkan penggantian air lapisan dasar (bottom drainage) tanpa menguras ikan di lapisan atas."
    },
    {
      "id": 2304,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Peralatan mekanisasi kincir air aerator (paddle wheel aerator) bertenaga listrik yang berputar di permukaan kolam patin berfungsi esensial untuk...",
      "options": [
        {
          "key": "A",
          "text": "Meningkatkan kadar Oksigen Terlarut (Dissolved Oxygen / DO) di dalam air dan menciptakan arus agar kotoran mengumpul di dasar tengah kolam"
        },
        {
          "key": "B",
          "text": "Menggiling ikan patin menjadi adonan bakso ikan secara langsung di kolam"
        },
        {
          "key": "C",
          "text": "Menghalau buaya dan ular air agar tidak masuk ke pemukiman warga"
        },
        {
          "key": "D",
          "text": "Mendinginkan suhu air kolam hingga mendekati titik beku nol derajat"
        },
        {
          "key": "E",
          "text": "Mempercepat penguapan air kolam saat terjadi banjir bandang musim hujan"
        }
      ],
      "correct": "A",
      "explanation": "Putaran sudu kincir memecah permukaan air, melarutkan oksigen atmosferik (menjaga DO > 3-4 ppm), dan membentuk arus sirkulasi pembersihan dasar."
    },
    {
      "id": 2305,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Kualitas derajat keasaman (pH) air kolam patin yang ideal di Belitang berada pada rentang 6,5 hingga 8,0. Jika air kolam terlalu asam (pH di bawah 6,0) akibat limpasan air hujan, tindakan teknis yang wajib dilakukan peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menaburkan kapur tohor (CaCO3 / dolomit) secara merata ke seluruh permukaan kolam untuk menaikkan pH ke batas aman"
        },
        {
          "key": "B",
          "text": "Menambahkan cuka getah asam format pekat ke dalam air kolam"
        },
        {
          "key": "C",
          "text": "Membuang seluruh ikan patin ke sungai dan mengeringkan kolam seketika"
        },
        {
          "key": "D",
          "text": "Menyiram air kolam dengan larutan deterjen pencuci piring berbusa"
        },
        {
          "key": "E",
          "text": "Membiarkan air asam mengendap tanpa melakukan penanganan apa pun"
        }
      ],
      "correct": "A",
      "explanation": "Pengapuran dengan dolomit/kalsit menetralkan ion H+ asam, meningkatkan kapasitas penyangga alkalinitas, dan mengendapkan partikel lumpur tersuspensi."
    },
    {
      "id": 2306,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pembudidaya patin menggunakan alat termometer air apung untuk memantau suhu air kolam. Pengaruh fluktuasi suhu air dingin ekstrem di bawah 24°C terhadap fisiologi ikan patin adalah...",
      "options": [
        {
          "key": "A",
          "text": "Laju metabolisme dan aktivitas enzim pencernaan ikan menurun drastis sehingga nafsu makan ikan merosot"
        },
        {
          "key": "B",
          "text": "Ikan patin akan tumbuh dua kali lebih cepat daripada suhu normal"
        },
        {
          "key": "C",
          "text": "Kulit ikan patin berubah menjadi keras bersisik tebal seperti buaya"
        },
        {
          "key": "D",
          "text": "Ikan patin berhenti bernapas menggunakan insang dan beralih ke paru-paru"
        },
        {
          "key": "E",
          "text": "Warna daging ikan patin berubah menjadi hijau neon menyala"
        }
      ],
      "correct": "A",
      "explanation": "Sebagai hewan poikiloterm (berdarah dingin), penurunan suhu air melambatkan metabolisme; pemberian pakan berlebih saat dingin memicu pembusukan di dasar kolam."
    },
    {
      "id": 2307,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pakan pelet apung komersial yang diberikan pada ikan patin fase pembesaran di Belitang memiliki standar kadar protein berkisar antara...",
      "options": [
        {
          "key": "A",
          "text": "28% hingga 32% protein kasar agar pertumbuhan bobot daging optimal dan efisien"
        },
        {
          "key": "B",
          "text": "Kurang dari 5% protein kasar yang setara dengan serbuk gergaji"
        },
        {
          "key": "C",
          "text": "100% protein murni tanpa mengandung serat, karbohidrat, atau lemak"
        },
        {
          "key": "D",
          "text": "Hanya mengandung zat pewarna buatan tanpa ada nutrisi pakan"
        },
        {
          "key": "E",
          "text": "Pelet tidak perlu mengandung protein karena patin memakan air bersih"
        }
      ],
      "correct": "A",
      "explanation": "Kadar protein 28-32% adalah level optimal kebutuhan asam amino esensial ikan patin (Pangasius hypophthalmus) untuk sintesis jaringan otot."
    },
    {
      "id": 2308,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Parameter efisiensi pakan yang sangat diperhitungkan pembudidaya ikan patin adalah FCR (Feed Conversion Ratio). Jika FCR kolam bernilai 1,2, artinya...",
      "options": [
        {
          "key": "A",
          "text": "Dibutuhkan 1,2 kilogram pakan pelet untuk menghasilkan 1 kilogram pertambahan bobot daging ikan patin"
        },
        {
          "key": "B",
          "text": "Ikan patin memakan 1,2 butir pelet dalam waktu satu bulan pemeliharaan"
        },
        {
          "key": "C",
          "text": "Setiap 1 kilogram pakan pelet akan menghasilkan 12 kilogram daging ikan"
        },
        {
          "key": "D",
          "text": "Pembudidaya mengalami kerugian finansial sebesar 1,2 persen dari modal"
        },
        {
          "key": "E",
          "text": "Kolam ikan hanya boleh diisi 12 ekor ikan patin per meter persegi"
        }
      ],
      "correct": "A",
      "explanation": "FCR = Pakan Total (kg) / Biomassa Panen (kg). Semakin kecil nilai FCR (mendekati 1.0-1.2), semakin efisien pakan dikonversi menjadi daging."
    },
    {
      "id": 2309,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Teknik pemberian pakan pelet patin yang efisien dan ramah lingkungan di kolam tanah Belitang dilakukan dengan cara...",
      "options": [
        {
          "key": "A",
          "text": "Menaburkan pelet bertahap sedikit demi sedikit di satu titik feeding station hingga respon makan ikan melemah (sekenyangnya bersyarat) agar pelet tidak tenggelam membusuk"
        },
        {
          "key": "B",
          "text": "Menumpahkan sekaligus 5 karung pelet ke tengah kolam saat tengah malam"
        },
        {
          "key": "C",
          "text": "Membiarkan pelet terendam di dalam karung selama 1 minggu sebelum ditebar"
        },
        {
          "key": "D",
          "text": "Menembakkan pelet menggunakan ketapel ke arah dahan pohon di pinggir kolam"
        },
        {
          "key": "E",
          "text": "Hanya memberi pakan setiap dua minggu sekali saat bulan purnama"
        }
      ],
      "correct": "A",
      "explanation": "Pemberian pakan bersyarat (at satiation) mencegah sisa pakan mengendap di dasar kolam menjadi gas beracun amonia (NH3) dan hidrogen sulfida (H2S)."
    },
    {
      "id": 2310,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Inovasi pakan mandiri yang kini banyak dikembangkan pembudidaya ikan di OKU Timur untuk menyiasati mahalnya harga pelet pabrik adalah budidaya larva lalat Black Soldier Fly (Maggot BSF). Keunggulan maggot BSF adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kandungan protein tinggi (40–45%), mudah dibiakkan menggunakan limbah organik dapur/buah, dan mampu menekan biaya operasional pakan hingga 30%"
        },
        {
          "key": "B",
          "text": "Maggot BSF dapat hidup tanpa memakan bahan organik sama sekali"
        },
        {
          "key": "C",
          "text": "Membuat ikan patin berubah menjadi ikan predator pemakan manusia"
        },
        {
          "key": "D",
          "text": "Maggot menghasilkan racun yang mematikan seluruh lumut kolam secara instan"
        },
        {
          "key": "E",
          "text": "Menghilangkan bau amis ikan patin menjadi aroma bunga melati"
        }
      ],
      "correct": "A",
      "explanation": "Biokonversi limbah organik oleh maggot BSF menghasilkan pakan berprotein tinggi dan asam laurat antimikroba alami yang memacu imunitas ikan."
    },
    {
      "id": 2311,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Alat penangkapan ikan utama saat panen raya kolam patin di Belitang adalah pukat tarik kantong besar (seine net / jaring kantong). Pengoperasian jaring tarik ini membutuhkan...",
      "options": [
        {
          "key": "A",
          "text": "Tenaga kerja gotong royong terampil sebanyak 8 hingga 12 orang yang menarik kedua sayap jaring secara serempak menyusuri dasar kolam"
        },
        {
          "key": "B",
          "text": "Satu orang anak kecil yang menarik tali jaring menggunakan sepeda onthel"
        },
        {
          "key": "C",
          "text": "Dua ekor kerbau yang dilatih berenang menarik jaring dari dalam air"
        },
        {
          "key": "D",
          "text": "Mesin pancing otomatis yang dioperasikan melalui satelit GPS"
        },
        {
          "key": "E",
          "text": "Bahan peledak dinamit kecil yang dilemparkan ke tengah kolam"
        }
      ],
      "correct": "A",
      "explanation": "Panen borongan patin menuntut koordinasi kekompakan tim penarik jaring agar tali ris bawah (lead line) tidak terangkat dan ikan tidak lolos kabur."
    },
    {
      "id": 2312,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Momen panen raya ikan kolam di pedesaan Belitang sarat dengan nilai budaya sosial gotong royong masyarakat. Hal ini terlihat dari tradisi...",
      "options": [
        {
          "key": "A",
          "text": "Keterlibatan warga sekitar sebagai tenaga panen borongan, tradisi makan bersama di gubuk kolam, dan pemberian ikan segar (iwak lelehan) kepada tetangga"
        },
        {
          "key": "B",
          "text": "Larangan bagi warga desa untuk melihat proses penimbangan ikan panen"
        },
        {
          "key": "C",
          "text": "Kewajiban membakar seluruh jaring panen setelah selesai digunakan"
        },
        {
          "key": "D",
          "text": "Menjual ikan panen hanya kepada warga yang memiliki hubungan sedarah"
        },
        {
          "key": "E",
          "text": "Menutup akses jalan desa selama proses pemanenan berlangsung"
        }
      ],
      "correct": "A",
      "explanation": "Panen kolam adalah peristiwa sosial ekonomi desa yang merajut kerukunan, pembagian rezeki (bontotan/lelehan ikan), dan solidaritas paguyuban."
    },
    {
      "id": 2313,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Setelah jaring ditarik ke tepi kolam, ikan patin dipindahkan ke meja sortasi berlubang halus. Tujuan proses sortasi panen ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memilah ikan patin berdasarkan ukuran bobot standar pasar konsumsi (misal 600–800 gram per ekor) dan memisahkan ikan yang cacat/luka"
        },
        {
          "key": "B",
          "text": "Menghitung jumlah sirip ikan patin secara teliti satu per satu"
        },
        {
          "key": "C",
          "text": "Mengecat kulit ikan patin agar tampak berkilau perak seperti ikan hias"
        },
        {
          "key": "D",
          "text": "Mengeringkan ikan patin di atas meja menggunakan pengering rambut"
        },
        {
          "key": "E",
          "text": "Menyuntikkan cairan garam ke dalam perut ikan agar timbangan bertambah berat"
        }
      ],
      "correct": "A",
      "explanation": "Grading ukuran menjaga keseragaman kemasan bak sortir dan memenuhi spesifikasi pesanan pedagang pengumpul atau pabrik fillet."
    },
    {
      "id": 2314,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Selain kolam tanah patin, sebagian pemuda tani di OKU Timur mengembangkan kolam terpal bundar dengan sistem Bioflok untuk budidaya ikan lele dan nila. Prinsip kerja sistem bioflok adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pemanfaatan bakteri probiotik heterotrof pengurai limbah amonia menjadi gumpalan flok protein yang dapat dimakan kembali oleh ikan"
        },
        {
          "key": "B",
          "text": "Penggunaan air laut buatan yang dicampur dengan garam krosok berkadar tinggi"
        },
        {
          "key": "C",
          "text": "Menutup kolam terpal dengan kaca kedap udara tanpa adanya sirkulasi oksigen"
        },
        {
          "key": "D",
          "text": "Mengalirkan air kolam melalui kawat beraliran listrik tegangan rendah"
        },
        {
          "key": "E",
          "text": "Memberi makan ikan lele hanya dengan daun pisang kering tanpa pelet"
        }
      ],
      "correct": "A",
      "explanation": "Bioflok mengonversi nitrogen anorganik (feses/sisa pakan) menjadi biomassa sel mikroba kaya protein dengan aerasi kuat dan penambahan sumber karbon (molase)."
    },
    {
      "id": 2315,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pompa air celup berdaya dorong besar (submersible sludge pump) atau pompa lumpur diesel digunakan pembudidaya kolam setelah masa panen untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menyedot endapan lumpur hitam pekat yang mengandung sisa kotoran beracun di dasar kolam agar kolam bersih kembali untuk siklus tebar berikutnya"
        },
        {
          "key": "B",
          "text": "Memompa udara segar langsung ke dalam liang tanah dasar kolam"
        },
        {
          "key": "C",
          "text": "Mencampur air kolam dengan pasir sungai berkerikil tajam"
        },
        {
          "key": "D",
          "text": "Mengisi air kolam secara otomatis saat air pasang laut tiba"
        },
        {
          "key": "E",
          "text": "Menghancurkan pematang tanggul kolam agar kolam menjadi rata"
        }
      ],
      "correct": "A",
      "explanation": "Penyedotan sedimen organik mencegah penumpukan gas anaerobik toksik yang dapat meracuni benih ikan pada siklus tebar baru."
    },
    {
      "id": 2316,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Tahap pengeringan dan penjemuran dasar kolam tanah di bawah terik matahari selama 5–7 hari hingga tanah dasar retak-retak bertujuan vital untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menguapkan gas beracun (amonia dan H2S), membunuh bibit patogen parasit penyakit ikan, dan mengoksidasi mineral tanah"
        },
        {
          "key": "B",
          "text": "Membuat dasar kolam berubah menjadi bebatuan marmer licin"
        },
        {
          "key": "C",
          "text": "Memudahkan penanaman bibit jagung manis di dasar kolam"
        },
        {
          "key": "D",
          "text": "Mencegah air hujan membasahi kembali wilayah pedesaan"
        },
        {
          "key": "E",
          "text": "Menghilangkan seluruh kandungan tanah liat dari dasar kolam"
        }
      ],
      "correct": "A",
      "explanation": "Oksidasi tanah dasar membakar senyawa sulfur beracun, memutus siklus hidup parasit/bakteri patogen, dan meregenerasi daya dukung kolam."
    },
    {
      "id": 2317,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Pemasangan waring nilon keliling setinggi 1 meter di atas tanggul kolam ikan di Belitang berfungsi teknis untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencegah predator hama seperti biawak, berang-berang (linsang), ular air, dan katak masuk ke dalam kolam memakan benih ikan"
        },
        {
          "key": "B",
          "text": "Menahan hembusan angin puting beliung agar tidak menerpa kolam"
        },
        {
          "key": "C",
          "text": "Sebagai tempat menjemur pakaian kerja pembudidaya kolam"
        },
        {
          "key": "D",
          "text": "Menyaring air hujan agar tidak jatuh ke dalam kolam ikan"
        },
        {
          "key": "E",
          "text": "Tanda bahwa kolam tersebut sudah dibeli oleh investor asing"
        }
      ],
      "correct": "A",
      "explanation": "Biosekuriti fisik pagar waring (crab/otter net) efektif menekan mortalitas benih akibat serangan predator karnivora air tawar."
    },
    {
      "id": 2318,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Penyakit bintik merah (Motile Aeromonas Septicemia / MAS) yang disebabkan oleh bakteri Aeromonas hydrophila sering menyerang ikan patin saat pergantian musim. Tindakan pencegahan ramah lingkungan yang dilakukan pembudidaya adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pemberian ekstrak herbal alami (daun sirih, bawang putih, atau meniran) yang dicampurkan ke dalam pakan pelet sebagai imunostimulan alami"
        },
        {
          "key": "B",
          "text": "Menaburkan bubuk deterjen pemutih pakaian ke dalam air kolam"
        },
        {
          "key": "C",
          "text": "Menyuntikkan pestisida herbisida ke dalam daging ikan satu per satu"
        },
        {
          "key": "D",
          "text": "Menguras seluruh air kolam dan membiarkan ikan hidup tanpa air selama 3 hari"
        },
        {
          "key": "E",
          "text": "Memberikan makan ikan dengan bangkai hewan yang sudah membusuk"
        }
      ],
      "correct": "A",
      "explanation": "Allicin pada bawang putih dan tanin/flavonoid daun sirih berfungsi sebagai fitobiotik antibakteri alami tanpa memicu resistensi antibiotik."
    },
    {
      "id": 2319,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Timbangan digital gantung berkapasitas 100–150 kg yang dipasang pada tiang bambu kaki tiga di tepi kolam panen berfungsi untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menimbang keranjang panen ikan patin secara cepat, akurat, dan transparan di hadapan pembudidaya dan pedagang pengumpul"
        },
        {
          "key": "B",
          "text": "Mengukur berat badan pembudidaya sebelum memasuki air kolam"
        },
        {
          "key": "C",
          "text": "Menimbang berat jaring tarik saat masih basah terendam lumpur"
        },
        {
          "key": "D",
          "text": "Menahan beban mobil pick-up agar tidak tergelincir ke dalam kolam"
        },
        {
          "key": "E",
          "text": "Mengukur suhu air kolam bagian dalam secara digital"
        }
      ],
      "correct": "A",
      "explanation": "Timbangan gantung digital bersertifikat tera menjamin akurasi transaksi gross-tare-netto secara cepat untuk meminimalkan waktu ikan di luar air."
    },
    {
      "id": 2320,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Logistik pengiriman ikan patin segar hidup dari Belitang menuju pasar induk Palembang dan Lampung menggunakan armada mobil pick-up dengan teknologi...",
      "options": [
        {
          "key": "A",
          "text": "Bak fiber berlapis isolator yang dilengkapi sistem aerasi tabung oksigen murni (sistem transportasi basah sistem terbuka)"
        },
        {
          "key": "B",
          "text": "Kardus mie instan kering tanpa ada air sama sekali di dalam bak mobil"
        },
        {
          "key": "C",
          "text": "Ember plastik terbuka yang diikat pada sepeda motor pengantar"
        },
        {
          "key": "D",
          "text": "Bak terbuka yang dipanaskan menggunakan api kompor gas elpiji"
        },
        {
          "key": "E",
          "text": "Kantong semen kertas yang dijahit rapat menggunakan kawat besi"
        }
      ],
      "correct": "A",
      "explanation": "Sistem live transport bak fiber beroksigen terkompresi mempertahankan tingkat kelangsungan hidup (survival rate > 95%) hingga sampai di pasar tujuan."
    },
    {
      "id": 2321,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Kemitraan antara kelompok pembudidaya patin Belitang dengan pabrik pengolahan fillet ikan (dori lokal) memberikan kepastian usaha berupa...",
      "options": [
        {
          "key": "A",
          "text": "Jaminan penyerapan hasil panen patin ukuran standar industri (800–1.200 gram) dengan standar harga kontrak yang stabil tanpa terombang-ambing pasar eceran"
        },
        {
          "key": "B",
          "text": "Pabrik mewajibkan petani memberikan ikannya secara cuma-cuma tanpa bayaran"
        },
        {
          "key": "C",
          "text": "Pembudidaya dilarang mengembangbiakkan ikan patin di kolam sendiri"
        },
        {
          "key": "D",
          "text": "Pabrik mengambil alih seluruh kolam tanah menjadi milik direksi perusahaan"
        },
        {
          "key": "E",
          "text": "Ikan patin yang ditolak pabrik wajib dibuang ke tengah hutan"
        }
      ],
      "correct": "A",
      "explanation": "Off-taker industri fillet menyerap panen skala puluhan ton dengan spesifikasi berat daging tebal (meat yield tinggi) dan kepastian harga kontrak."
    },
    {
      "id": 2322,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Pada unit pembenihan mandiri (hatchery / UPR) di Belitang, perbanyakan benih patin dilakukan melalui teknik induced breeding (kawin suntik hormon). Hormon yang disuntikkan pada induk patin matang gonad adalah...",
      "options": [
        {
          "key": "A",
          "text": "Hormon Ovaprim (kombinasi GnRH analog dan antidopamin) untuk merangsang proses ovulasi pelepasan sel telur dan sperma"
        },
        {
          "key": "B",
          "text": "Cairan vitamin C dosis tinggi yang dilarutkan ke dalam air kolam"
        },
        {
          "key": "C",
          "text": "Minyak kelapa sawit murni yang disuntikkan ke dalam sirip punggung"
        },
        {
          "key": "D",
          "text": "Antibiotik kimia sintesis penumbuh sisik ikan hias"
        },
        {
          "key": "E",
          "text": "Pestisida insektisida perangsang pertumbuhan sel darah"
        }
      ],
      "correct": "A",
      "explanation": "Ovaprim memicu lonjakan gonadotropin endogen pada kelenjar pituitari ikan, mempercepat pematangan akhir oosit (ovulasi) dalam waktu 8-12 jam."
    },
    {
      "id": 2323,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Wadah penetasan telur ikan patin di hatchery menggunakan corong penetasan fiber (hatching funnel) dengan aliran air sirkulasi dari bawah. Tujuan teknis dari sistem ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menjaga butiran telur patin tetap melayang teraduk perlahan dalam air kaya oksigen tanpa mengendap di dasar yang menyebabkan pembusukan"
        },
        {
          "key": "B",
          "text": "Membekukan telur ikan patin agar tidak menetas sebelum waktunya"
        },
        {
          "key": "C",
          "text": "Membuat cangkang telur patin menjadi keras seperti telur ayam"
        },
        {
          "key": "D",
          "text": "Memisahkan kuning telur dari putih telur patin secara mekanik"
        },
        {
          "key": "E",
          "text": "Menyinari telur ikan menggunakan lampu sinar-X berenergi tinggi"
        }
      ],
      "correct": "A",
      "explanation": "Upwelling funnel aerasi lembut mencegah telur demersal berperekat saling menempel dan mati akibat asfiksia (kekurangan oksigen) di dasar corong."
    },
    {
      "id": 2324,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Dalam lembar observasi K3 perikanan, pekerja kolam yang menangani ikan patin dan lele harus mewaspadai bahaya fisik berupa...",
      "options": [
        {
          "key": "A",
          "text": "Tusukan patil sirip dada dan punggung ikan yang tajam bergerigi dan dapat menimbulkan rasa nyeri demam jika tertusuk"
        },
        {
          "key": "B",
          "text": "Gigitan gigi taring buas pada rahang mulut ikan patin"
        },
        {
          "key": "C",
          "text": "Sengatan aliran listrik berkekuatan 220 volt dari tubuh ikan patin"
        },
        {
          "key": "D",
          "text": "Semprotan bisa racun kobra dari mata ikan patin"
        },
        {
          "key": "E",
          "text": "Timbunan bulu tebal ikan patin yang menyebabkan alergi kulit"
        }
      ],
      "correct": "A",
      "explanation": "Patil sirip pektoral lele dan patin dilapisi lendir berprotein racun ringan yang menyebabkan rasa sakit berdenyut, pembengkakan, dan peradangan jika melukai kulit."
    },
    {
      "id": 2325,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Bau lumpur (off-flavor) pada daging ikan patin kolam tanah disebabkan oleh senyawa geosmin dan MIB yang dihasilkan alga biru (Cyanobacteria). Cara alami yang dilakukan pembudidaya untuk menghilangkan bau lumpur sebelum dipanen adalah...",
      "options": [
        {
          "key": "A",
          "text": "Melakukan teknik pemberokan (purging) di kolam air jernih mengalir selama 2 hingga 3 hari tanpa pemberian pakan pelet"
        },
        {
          "key": "B",
          "text": "Merendam ikan hidup di dalam larutan parfum pewangi pakaian"
        },
        {
          "key": "C",
          "text": "Menaburkan bedak bayi beraroma buah ke dalam air kolam pemeliharaan"
        },
        {
          "key": "D",
          "text": "Memasak ikan patin langsung di dalam kolam menggunakan kompor induksi"
        },
        {
          "key": "E",
          "text": "Membiarkan ikan patin dijemur di atas tanah kering selama 5 jam"
        }
      ],
      "correct": "A",
      "explanation": "Depurasi di air mengalir bersih tanpa pakan memicu proses metabolisme pelepasan senyawa geosmin lipofilik dari jaringan lemak daging patin."
    },
    {
      "id": 2326,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Selain ikan patin, komoditas ikan air tawar yang banyak dibudidayakan petani di OKU Timur adalah ikan nila varietas unggul, seperti...",
      "options": [
        {
          "key": "A",
          "text": "Nila Nirwana, Nila Sultana, dan Nila Merah Gesit yang bertubuh padat dan cepat besar"
        },
        {
          "key": "B",
          "text": "Ikan hiu martil air tawar"
        },
        {
          "key": "C",
          "text": "Ikan piranha pemakan daging dari sungai Amazon"
        },
        {
          "key": "D",
          "text": "Ikan salmon kutub yang hanya bertelur di salju"
        },
        {
          "key": "E",
          "text": "Ikan buntal beracun mematikan"
        }
      ],
      "correct": "A",
      "explanation": "Nila Nirwana (Nila Ras Wanayasa) dan Nila Merah hasil seleksi genetik memiliki konversi pakan sangat baik dan toleran terhadap kondisi kolam perdesaan."
    },
    {
      "id": 2327,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Waktu siklus budidaya pembesaran ikan patin di kolam tanah Belitang dari penebaran benih ukuran 2 inci hingga mencapai ukuran panen konsumsi rata-rata membutuhkan waktu...",
      "options": [
        {
          "key": "A",
          "text": "6 hingga 8 bulan masa pemeliharaan teratur"
        },
        {
          "key": "B",
          "text": "Hanya 1 minggu sejak benih ditebar ke air kolam"
        },
        {
          "key": "C",
          "text": "10 hingga 15 tahun masa pemeliharaan tanpa henti"
        },
        {
          "key": "D",
          "text": "Setiap 2 hari sekali kolam wajib dipanen habis"
        },
        {
          "key": "E",
          "text": "Waktu budidaya tidak dapat dihitung karena patin tidak menua"
        }
      ],
      "correct": "A",
      "explanation": "Masa pemeliharaan patin 6-8 bulan menghasilkan bobot target konsumsi 600-800 gram/ekor dengan kelangsungan hidup (SR) 80-90%."
    },
    {
      "id": 2328,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam lembar observasi aspek pencatatan finansial usaha kolam, pembudidaya yang profesional tertib mencatat rincian biaya variabel terbesar, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Biaya pembelian pakan pelet komersial yang menyerap sekitar 70% hingga 80% dari total modal operasional per siklus"
        },
        {
          "key": "B",
          "text": "Biaya pengecatan gubuk kolam dengan cat minyak warna-warni"
        },
        {
          "key": "C",
          "text": "Biaya pembelian seragam batik bagi seluruh pekerja penarik jaring"
        },
        {
          "key": "D",
          "text": "Biaya pembelian lampu hias dekorasi kolam untuk pesta malam hari"
        },
        {
          "key": "E",
          "text": "Biaya langganan siaran televisi kabel berbayar di pondok kolam"
        }
      ],
      "correct": "A",
      "explanation": "Komponen pakan adalah faktor penentu utama profitabilitas agribisnis perikanan; kontrol FCR yang ketat menjaga margin laba pembudidaya."
    },
    {
      "id": 2329,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Saat puncak musim kemarau di mana debit air irigasi Belitang digilir atau mengecil, strategi manajemen kolam yang diterapkan pembudidaya adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengurangi padat tebar benih, mengoptimalkan kincir aerator, dan tidak memaksakan penambahan kolam baru guna menjaga kualitas air"
        },
        {
          "key": "B",
          "text": "Menambah benih ikan hingga sepuluh kali lipat dari kapasitas normal"
        },
        {
          "key": "C",
          "text": "Mengisi air kolam dengan air limbah deterjen rumah tangga"
        },
        {
          "key": "D",
          "text": "Menutup kolam tanah menggunakan seng baja rapat kedap udara"
        },
        {
          "key": "E",
          "text": "Memindahkan ikan patin ke dalam pot tanaman hias pekarangan"
        }
      ],
      "correct": "A",
      "explanation": "Penurunan debit air menuntut reduksi biomass loading dan peningkatan sirkulasi mekanis aerator untuk menghindari anoksia massal (kematian mendadak)."
    },
    {
      "id": 2330,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Kelompok wanita tani / ibu-ibu pembudidaya di sentra perikanan Belitang mengembangkan diversifikasi produk olahan berbahan dasar ikan patin, seperti...",
      "options": [
        {
          "key": "A",
          "text": "Abon ikan patin, kerupuk kulit ikan patin krispi, bakso ikan, dan nugget patin kemasan vakum"
        },
        {
          "key": "B",
          "text": "Kain tenun sutra berbahan benang tulang ikan patin"
        },
        {
          "key": "C",
          "text": "Minyak wangi mawar berbahan sari empedu ikan patin"
        },
        {
          "key": "D",
          "text": "Bahan bakar bensin oktan tinggi dari rebusan sisik ikan"
        },
        {
          "key": "E",
          "text": "Obat nyamuk bakar berbahan lumut dasar kolam ikan"
        }
      ],
      "correct": "A",
      "explanation": "Pengolahan pascapanen hilir memberi nilai tambah ekonomi bagi keluarga pembudidaya dan menyerap ikan patin afkir/berukuran terlalu besar."
    },
    {
      "id": 2331,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Endapan lumpur dasar kolam ikan patin yang telah dikeruk saat pengeringan memiliki nilai manfaat agronomi tinggi karena...",
      "options": [
        {
          "key": "A",
          "text": "Sangat kaya unsur hara Nitrogen, Fosfor, dan bahan organik yang sangat baik dijadikan pupuk tanaman buah pisang, kelapa, dan sayuran di tanggul"
        },
        {
          "key": "B",
          "text": "Dapat digunakan sebagai pengganti semen plester tembok rumah"
        },
        {
          "key": "C",
          "text": "Dapat langsung dimakan oleh manusia sebagai pengganti nasi putih"
        },
        {
          "key": "D",
          "text": "Mengandung butiran emas murni yang dapat ditambang secara massal"
        },
        {
          "key": "E",
          "text": "Mampu menyalakan lampu listrik tanpa memerlukan kawat kabel"
        }
      ],
      "correct": "A",
      "explanation": "Lumpur kolam kaya fiksasi mineral feses ikan yang terkomposkan alami, ideal untuk pupuk organik tanaman hortikultura tanggul (dike cropping)."
    },
    {
      "id": 2332,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Pemasaran hasil panen ikan patin kolam di era digital di OKU Timur memanfaatkan saluran komunikasi media sosial dan WhatsApp grup untuk...",
      "options": [
        {
          "key": "A",
          "text": "Berbagi informasi jadwal panen antar-anggota kelompok, negosiasi harga dengan agen pedagang luar kota, dan memantau stok pakan pabrik"
        },
        {
          "key": "B",
          "text": "Mengirimkan ikan patin hidup melalui pesan gambar WhatsApp"
        },
        {
          "key": "C",
          "text": "Mengukur kedalaman air kolam secara langsung tanpa alat sensor"
        },
        {
          "key": "D",
          "text": "Menolak kedatangan truk pengangkut ikan yang datang dari Palembang"
        },
        {
          "key": "E",
          "text": "Mengubah air kolam keruh menjadi jernih dalam sekejap mata"
        }
      ],
      "correct": "A",
      "explanation": "Komunikasi digital menghubungkan rantai pasok hulu-hilir (pembudidaya-tengkulak-ekspeditur) sehingga panen dapat diangkut tepat waktu."
    },
    {
      "id": 2333,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Peran Penyuluh Perikanan Lapangan (PPL) dari dinas perikanan di wilayah sentra Belitang yang sangat dirasakan manfaatnya oleh pembudidaya kolam adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memberikan bimbingan teknis formulasi pakan mandiri, sertifikasi Cara Budidaya Ikan yang Baik (CBIB), dan pendampingan bantuan sarana perikanan"
        },
        {
          "key": "B",
          "text": "Mengambil alih seluruh keuntungan panen ikan untuk kas pribadi penyuluh"
        },
        {
          "key": "C",
          "text": "Mewajibkan pembudidaya membeli pakan dengan harga paling mahal"
        },
        {
          "key": "D",
          "text": "Melarang warga desa memelihara ikan patin di pekarangan rumah"
        },
        {
          "key": "E",
          "text": "Menutup seluruh toko pakan ikan resmi yang beroperasi di kecamatan"
        }
      ],
      "correct": "A",
      "explanation": "PPL memfasilitasi sertifikasi CBIB/Good Aquaculture Practices (GAP), menjamin mutu keamanan pangan ikan, dan melatih teknologi budidaya adaptif."
    },
    {
      "id": 2334,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Etos kerja disiplin pembudidaya ikan patin di OKU Timur tercermin dari ketelatenan rutinitas harian, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Konsistensi bangun pagi mengamati respon ikan di kolam, ketepatan jadwal pemberian pakan, dan kejelian mengecek kincir air di tengah malam"
        },
        {
          "key": "B",
          "text": "Hanya melihat kolam ikan sekali dalam setahun saat panen raya tiba"
        },
        {
          "key": "C",
          "text": "Membiarkan kincir air mati saat malam hari tanpa dilakukan pengecekan"
        },
        {
          "key": "D",
          "text": "Menyerahkan seluruh perawatan kolam kepada orang yang tidak dikenal"
        },
        {
          "key": "E",
          "text": "Tidur sepanjang hari di pinggir kolam tanpa memberi makan ikan"
        }
      ],
      "correct": "A",
      "explanation": "Budidaya perikanan membutuhkan ketekunan biologis tinggi: pengawasan dini hari saat DO kritis dan kedisiplinan pemberian pakan teratur."
    },
    {
      "id": 2335,
      "day": 2,
      "sector": "perikanan",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Gagasan hilirisasi kawasan Minapolitan Patin OKU Timur agar mampu bersaing di pasar ekspor internasional adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pembangunan pabrik pengolahan fillet patin berstandar Hazard Analysis Critical Control Point (HACCP) dan cold storage modern di sentra Belitang"
        },
        {
          "key": "B",
          "text": "Menghentikan budidaya ikan patin dan mengubah seluruh kolam menjadi lapangan golf"
        },
        {
          "key": "C",
          "text": "Melarang penjualan ikan patin ke luar batas wilayah Kabupaten OKU Timur"
        },
        {
          "key": "D",
          "text": "Membuang seluruh hasil panen ikan patin ke sungai Komering"
        },
        {
          "key": "E",
          "text": "Mengharuskan seluruh ikan patin dikonsumsi mentah tanpa dimasak terlebih dahulu"
        }
      ],
      "correct": "A",
      "explanation": "Rantai dingin (cold chain) terpadu dengan standar sertifikasi HACCP membuka akses pasar ekspor fillet patin (white meat) ke Timur Tengah dan Eropa."
    }
  ],
  "industri": [
    {
      "id": 2401,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Pabrik Penggilingan Padi (Rice Milling Unit / RMU) di Belitang memegang peranan vital dalam sistem agro-industri pangan OKU Timur karena...",
      "options": [
        {
          "key": "A",
          "text": "Mengolah gabah panen petani menjadi beras putih siap konsumsi bernilai ekonomi tinggi serta menghasilkan bekatul dan sekam sebagai produk sampingan"
        },
        {
          "key": "B",
          "text": "Menghancurkan seluruh bulir gabah menjadi abu hitam tak berguna"
        },
        {
          "key": "C",
          "text": "Menimbun gabah selama puluhan tahun agar membusuk di dalam gudang"
        },
        {
          "key": "D",
          "text": "Mengubah beras lokal menjadi gandum impor kualitas rendah"
        },
        {
          "key": "E",
          "text": "Hanya melayani penggilingan gabah milik pejabat pemerintah"
        }
      ],
      "correct": "A",
      "explanation": "RMU adalah industri primer hilirisasi gabah padi yang mentransformasi bahan mentah petani menjadi komoditas pangan pokok strategis nasional."
    },
    {
      "id": 2402,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin pembersih awal (Paddy Cleaner) yang berada di pintu masuk alur proses penggilingan padi berfungsi teknis untuk...",
      "options": [
        {
          "key": "A",
          "text": "Memisahkan kotoran fisik seperti jerami, potongan ranting, tanah, debu, dan kerikil dari gabah sebelum masuk ke mesin pemecah kulit"
        },
        {
          "key": "B",
          "text": "Memasak gabah dengan uap panas bersuhu 100 derajat Celsius"
        },
        {
          "key": "C",
          "text": "Mengecat kulit gabah menjadi warna kuning emas mengkilap"
        },
        {
          "key": "D",
          "text": "Memisahkan bulir gabah berdasarkan kandungan air di dalamnya"
        },
        {
          "key": "E",
          "text": "Menghancurkan batu penggiling beras agar menjadi bubuk semen"
        }
      ],
      "correct": "A",
      "explanation": "Pre-cleaner melindungi rol karet husker dari keausan cepat akibat gesekan batu/kerikil dan menjamin kebersihan beras pecah kulit."
    },
    {
      "id": 2403,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Mesin pemecah kulit gabah (Husker / Dehuller) bekerja mengupas sekam padi menggunakan komponen utama berupa...",
      "options": [
        {
          "key": "A",
          "text": "Dua silinder rol karet (rubber roll) yang berputar berlawanan arah dengan kecepatan putar (RPM) yang berbeda sehingga menimbulkan gaya gesek kupas"
        },
        {
          "key": "B",
          "text": "Mata pisau baja berputar tajam yang memotong gabah menjadi dua bagian"
        },
        {
          "key": "C",
          "text": "Dua lempengan magnet besar yang menarik sekam gabah secara magnetis"
        },
        {
          "key": "D",
          "text": "Semburan air bertekanan tinggi yang melunakkan sekam padi"
        },
        {
          "key": "E",
          "text": "Batu asah kasar yang membakar kulit sekam dengan percikan api"
        }
      ],
      "correct": "A",
      "explanation": "Perbedaan kecepatan linier antara rol cepat dan rol lambat menciptakan differential shear force yang mengelupas sekam gabah tanpa meremukkan butir beras."
    },
    {
      "id": 2404,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Setelah melalui mesin husker, campuran gabah yang belum terkupas dan beras pecah kulit (brown rice) dipisahkan oleh mesin Paddy Separator berdasarkan...",
      "options": [
        {
          "key": "A",
          "text": "Perbedaan berat jenis, elastisitas pantulan, dan tekstur permukaan antara gabah berkulit kasar dengan beras pecah kulit yang licin"
        },
        {
          "key": "B",
          "text": "Perbedaan aroma wangi antara gabah dan beras"
        },
        {
          "key": "C",
          "text": "Suhu panas yang dipancarkan oleh masing-masing butiran padi"
        },
        {
          "key": "D",
          "text": "Warna cahaya yang diserap oleh kedua jenis butiran tersebut"
        },
        {
          "key": "E",
          "text": "Kemampuan butiran gabah untuk terapung di udara hampa"
        }
      ],
      "correct": "A",
      "explanation": "Paddy separator memanfaatkan perbedaan densitas dan gaya gesek pada meja goyang bertingkat untuk mengembalikan gabah belum terkelupas ke husker."
    },
    {
      "id": 2405,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Mesin pemutih dan pengilap beras (Rice Whitener / Polisher) mengikis lapisan aleuron bekatul dari beras pecah kulit menjadi beras putih bersih. Prinsip kerja mesin ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Gesekan antara butiran beras dengan batu gerinda abrasif serta hembusan udara kompresor yang membuang serbuk bekatul keluar saringan"
        },
        {
          "key": "B",
          "text": "Pencelupan beras ke dalam larutan klorin pemutih pakaian"
        },
        {
          "key": "C",
          "text": "Pemanasan beras di atas wajan besi dengan suhu tinggi"
        },
        {
          "key": "D",
          "text": "Penyinaran beras menggunakan lampu sinar ultraviolet selama 24 jam"
        },
        {
          "key": "E",
          "text": "Penaburan bubuk kapur putih tebal di atas permukaan beras"
        }
      ],
      "correct": "A",
      "explanation": "Milling chamber bertekanan dengan batu amril dan hembusan jet-air blower mengikis dedak bekatul secara merata dan mendinginkan beras agar tidak patah."
    },
    {
      "id": 2406,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Pada RMU modern skala besar di Belitang, mesin Color Sorter (pemilah warna digital) digunakan pada tahap akhir pemrosesan. Cara kerja sensor optik pada mesin ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kamera digital berkecepatan tinggi mendeteksi butir beras kuning, hitam, kapur, atau benda asing, lalu katup pneumatik (ejector) menembakkan angin untuk membuangnya"
        },
        {
          "key": "B",
          "text": "Menggunakan magnet untuk menarik butiran beras yang berwarna gelap"
        },
        {
          "key": "C",
          "text": "Operator manual mengambil butir beras hitam satu per satu menggunakan pinset"
        },
        {
          "key": "D",
          "text": "Mewarnai seluruh beras menggunakan cat pewarna makanan kuning seragam"
        },
        {
          "key": "E",
          "text": "Menghancurkan butiran beras yang warnanya tidak sesuai menjadi tepung"
        }
      ],
      "correct": "A",
      "explanation": "CCD/CMOS optoelectronic sensors mendeteksi cacat warna butiran dalam aliran jatuh cepat, dan micro-ejector menyemprotkan angin mikro bertekanan tinggi."
    },
    {
      "id": 2407,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin pengayak beras putar (Rice Grader / Ayakan Bertingkat) memisahkan beras hasil gilingan menjadi beberapa fraksi mutu, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Beras kepala (utuh), beras patah (patahan besar), dan beras menir (butir remuk kecil)"
        },
        {
          "key": "B",
          "text": "Beras kering, beras basah, dan beras beku"
        },
        {
          "key": "C",
          "text": "Beras manis, beras asin, dan beras pahit"
        },
        {
          "key": "D",
          "text": "Beras mahal, beras sedang, dan beras gratis"
        },
        {
          "key": "E",
          "text": "Beras lokal, beras nasional, dan beras internasional"
        }
      ],
      "correct": "A",
      "explanation": "Rotary screen grader memilah fraksi ukuran beras (head rice > 0.8 bagian utuh, broken rice, dan menir) untuk penentuan kelas mutu SNI."
    },
    {
      "id": 2408,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Parameter rendemen giling beras di RMU Belitang rata-rata berkisar antara 63% hingga 68%. Jika seorang petani menggiling 1.000 kg Gabah Kering Giling (GKG) dengan rendemen 65%, maka beras putih yang dihasilkan adalah...",
      "options": [
        {
          "key": "A",
          "text": "650 kilogram beras putih bersih"
        },
        {
          "key": "B",
          "text": "65 kilogram beras putih bersih"
        },
        {
          "key": "C",
          "text": "1.650 kilogram beras putih bersih"
        },
        {
          "key": "D",
          "text": "350 kilogram beras putih bersih"
        },
        {
          "key": "E",
          "text": "100 kilogram beras putih bersih"
        }
      ],
      "correct": "A",
      "explanation": "Rendemen (%) = (Berat Beras / Berat GKG) x 100%. Maka: 1.000 kg x 65% = 650 kg beras putih."
    },
    {
      "id": 2409,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pada musim hujan di mana penjemuran di lantai semen terkendala cuaca, RMU Belitang mengoperasikan mesin pengering mekanis (Box Dryer / Bed Dryer). Sumber panas ramah lingkungan yang digunakan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tungku pembakaran sekam padi (biomassa limbah giling) yang panasnya dialirkan melalui pipa penukar panas (heat exchanger)"
        },
        {
          "key": "B",
          "text": "Bahan bakar solar industri murni yang disemprotkan langsung ke atas gabah"
        },
        {
          "key": "C",
          "text": "Lampu bohlam pijar 5 watt yang digantung di atas tumpukan gabah"
        },
        {
          "key": "D",
          "text": "Api unggun terbuka dari pembakaran ban mobil bekas"
        },
        {
          "key": "E",
          "text": "Reaksi kimia asam sulfat pekat yang disiramkan pada gabah"
        }
      ],
      "correct": "A",
      "explanation": "Pemanfaatan sekam padi sebagai biomassa tungku heat exchanger menghemat biaya bahan bakar fosil dan menjaga gabah terbebas dari jelaga asap pembakaran."
    },
    {
      "id": 2410,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Limbah sekam padi yang melimpah dari pabrik penggilingan padi diolah masyarakat OKU Timur menjadi arang sekam dan abu silika. Manfaat arang sekam bagi pertanian adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sebagai media tanam penyemai bibit yang gembur, porous, steril, dan mampu mengikat air serta unsur hara"
        },
        {
          "key": "B",
          "text": "Sebagai pengganti bahan makanan pokok manusia saat beras habis"
        },
        {
          "key": "C",
          "text": "Sebagai racun pembasmi hama tikus sawah di dalam liang tanah"
        },
        {
          "key": "D",
          "text": "Sebagai bahan pelapis cat tembok bangunan rumah warga"
        },
        {
          "key": "E",
          "text": "Sebagai bahan campuran pakan pelet ikan terapung"
        }
      ],
      "correct": "A",
      "explanation": "Karbonisasi sekam menjadi biochar arang sekam memperbaiki aerasi media tanam hortikultura dan meningkatkan Kapasitas Tukar Kation (KTK) tanah."
    },
    {
      "id": 2411,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Berdasarkan lembar observasi K3 di lingkungan pabrik RMU, operator mesin wajib memakai masker respirator anti-debu (particulate respirator). Bahaya kesehatan kerja utama dari paparan debu sekam adalah...",
      "options": [
        {
          "key": "A",
          "text": "Penyakit pernapasan kronis silikosis dan asma akibat menghirup debu silika sekam yang tajam dan mikroskopis"
        },
        {
          "key": "B",
          "text": "Patah tulang kaki akibat tertimpa butiran beras"
        },
        {
          "key": "C",
          "text": "Kebutaan mata permanen akibat suara bising mesin diesel"
        },
        {
          "key": "D",
          "text": "Infeksi saluran pencernaan akibat bau dedak bekatul"
        },
        {
          "key": "E",
          "text": "Penyakit malaria tropika akibat gigitan serangga gabah"
        }
      ],
      "correct": "A",
      "explanation": "Debu sekam padi mengandung kristalin silika amorf yang dapat memicu iritasi bronkus dan fibrosis paru (pneumokoniosis/silikosis) tanpa masker APD."
    },
    {
      "id": 2412,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan keselamatan mesin berputar di pabrik RMU meliputi pemasangan penutup vanbelt (belt guard). Pemasangan pengaman ini bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencegah pakaian, jari, atau anggota tubuh pekerja tersangkut ke dalam roda puli dan tali ban mesin yang sedang berputar kencang"
        },
        {
          "key": "B",
          "text": "Membuat mesin berputar lebih cepat melampaui batas kecepatan maksimal"
        },
        {
          "key": "C",
          "text": "Mendinginkan suhu puli besi agar tidak terasa panas saat disentuh"
        },
        {
          "key": "D",
          "text": "Mengurangi pemakaian bahan bakar solar pada mesin diesel penggerak"
        },
        {
          "key": "E",
          "text": "Menghilangkan suara bising mesin diesel secara total seratus persen"
        }
      ],
      "correct": "A",
      "explanation": "Machine guarding adalah standar keselamatan mekanikal K3 wajib untuk mencegah risiko kecelakaan terjepit pada transmisi sabuk dan roda putar."
    },
    {
      "id": 2413,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pabrik RMU modern memasang instalasi pipa pengumpul debu siklon (cyclone dust collector). Prinsip fisika yang mendasari pemisahan debu pada siklon adalah...",
      "options": [
        {
          "key": "A",
          "text": "Gaya sentrifugal yang melemparkan partikel debu berat ke dinding tabung silinder hingga jatuh ke corong bawah, sementara udara bersih keluar dari cerobong atas"
        },
        {
          "key": "B",
          "text": "Gaya gravitasi bumi yang menarik udara bersih masuk ke dalam tanah"
        },
        {
          "key": "C",
          "text": "Daya hisap magnetik yang menarik partikel debu sekam besi"
        },
        {
          "key": "D",
          "text": "Pembakaran debu di udara menggunakan semburan gas elpiji"
        },
        {
          "key": "E",
          "text": "Penyaringan debu menggunakan jaring kain katun berlubang besar"
        }
      ],
      "correct": "A",
      "explanation": "Gaya sentrifugal pada pusaran vortex memisahkan partikel debu densitas tinggi dari aliran udara sebelum dibuang ke lingkungan luar."
    },
    {
      "id": 2414,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pada sentra agro-industri UMKM tahu dan tempe di Belitang, tahapan proses pembuatan tahu secara berurutan meliputi...",
      "options": [
        {
          "key": "A",
          "text": "Sortasi kedelai, perendaman air bersih, penggilingan bubur kedelai, perebusan, penyaringan sari kedelai, pengendapan gumpalan tahu, dan pengepresan"
        },
        {
          "key": "B",
          "text": "Penggorengan kedelai kering, penjemuran di terik matahari, dan pengemasan"
        },
        {
          "key": "C",
          "text": "Pencelupan kedelai ke dalam minyak panas, pendinginan, dan pembekuan"
        },
        {
          "key": "D",
          "text": "Penaburan ragi tape ke atas kedelai basah, pembungkusan daun, dan perebusan"
        },
        {
          "key": "E",
          "text": "Penyemprotan pewarna kuning ke atas kedelai mentah di dalam karung"
        }
      ],
      "correct": "A",
      "explanation": "SOP pengolahan tahu tradisional meliputi ekstraksi protein kedelai melalui penggilingan-pemasakan, penyaringan ampas, dan koagulasi whey."
    },
    {
      "id": 2415,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin penggiling kedelai pada industri rumah tangga tahu bekerja menggunakan komponen batu asah melingkar vertikal/horizontal. Fungsi penambahan kucuran air mengalir saat proses penggilingan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mendinginkan gesekan batu giling agar tidak panas serta melarutkan protein kedelai menjadi bubur emulsi halus yang mudah disaring"
        },
        {
          "key": "B",
          "text": "Membuat batu giling berkarat dan aus lebih cepat"
        },
        {
          "key": "C",
          "text": "Mengubah kedelai menjadi minyak goreng cair"
        },
        {
          "key": "D",
          "text": "Mencegah suara bising motor listrik penggerak batu"
        },
        {
          "key": "E",
          "text": "Menghilangkan seluruh kandungan protein dari biji kedelai"
        }
      ],
      "correct": "A",
      "explanation": "Kucuran air saat grinding bertindak sebagai pelumas termal (mencegah denaturasi protein akibat panas gesekan) dan media ekstraksi sari kedelai."
    },
    {
      "id": 2416,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Pada proses pengendapan bubur kedelai matang untuk membentuk dadih tahu (curd), bahan koagulan alami yang lazim ditambahkan pengrajin tahu Belitang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Air biang tahu (whey asam sisa pengendapan kemarin) atau larutan kalsium sulfat (batu tahu / gipsum pangan)"
        },
        {
          "key": "B",
          "text": "Minyak tanah murni yang dicampur dengan deterjen bubuk"
        },
        {
          "key": "C",
          "text": "Larutan pupuk urea berkonsentrasi pekat"
        },
        {
          "key": "D",
          "text": "Garam dapur kasar dalam jumlah berlebihan hingga asin pekat"
        },
        {
          "key": "E",
          "text": "Pewarna kain sintetis berwarna kuning terang"
        }
      ],
      "correct": "A",
      "explanation": "Asam laktat pada air biang (whey) atau ion kalsium pada kalsium sulfat menurunkan pH mendekati titik isoelektrik protein kedelai (pH 4.5), menggumpalkan kasein kedelai."
    },
    {
      "id": 2417,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Alat pengepres tahu tradisional di bengkel UMKM menggunakan meja kayu berpori kain belacu dengan pemberat batu atau tuas ulir. Fungsi utama pengepresan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengeluarkan kelebihan air dadih (whey) dari gumpalan tahu dan memadatkan tekstur tahu menjadi balok cetakan yang kokoh"
        },
        {
          "key": "B",
          "text": "Mengeringkan tahu hingga menjadi kerupuk renyah"
        },
        {
          "key": "C",
          "text": "Menghancurkan tahu menjadi butiran tepung kedelai kering"
        },
        {
          "key": "D",
          "text": "Mendinginkan tahu menggunakan tekanan udara dingin"
        },
        {
          "key": "E",
          "text": "Memberikan garis-garis motif hiasan pada permukaan tahu"
        }
      ],
      "correct": "A",
      "explanation": "Tekanan mekanis membuang kelebihan cairan interstisial, mengatur tingkat kepadatan (firmness) tahu sesuai standar tahu putih/tahu sayur."
    },
    {
      "id": 2418,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Limbah cair industri tahu mengandung beban organik tinggi (BOD dan COD). Penanganan limbah cair yang ramah lingkungan agar tidak mencemari parit desa adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengalirkannya ke dalam Instalasi Pengolahan Air Limbah (IPAL) anaerobik bersekat untuk difermentasi menjadi biogas dan air olahan jernih"
        },
        {
          "key": "B",
          "text": "Membuangnya langsung ke saluran irigasi sawah saat musim kemarau"
        },
        {
          "key": "C",
          "text": "Menyiramkan limbah cair panas ke halaman rumah tetangga"
        },
        {
          "key": "D",
          "text": "Menampung limbah di dalam tong plastik terbuka hingga membusuk dan berbelatung"
        },
        {
          "key": "E",
          "text": "Meminumkan limbah cair langsung kepada anak-anak sekolah"
        }
      ],
      "correct": "A",
      "explanation": "IPAL anaerobik digester menguraikan protein terlarut limbah whey tahu menjadi gas metana, menurunkan BOD > 80% sebelum air dibuang ke badan perairan."
    },
    {
      "id": 2419,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Produk samping berupa ampas padat tahu (ampas kedelai) memiliki potensi ekonomi bernilai tinggi bagi masyarakat pedesaan OKU Timur karena...",
      "options": [
        {
          "key": "A",
          "text": "Dapat dimanfaatkan langsung sebagai pakan ternak sapi/kambing bergizi tinggi serta diolah menjadi bahan pangan tempe gembus/oncom"
        },
        {
          "key": "B",
          "text": "Dapat digunakan sebagai pengganti bahan bakar bensin kendaraan bermotor"
        },
        {
          "key": "C",
          "text": "Dapat diawetkan menjadi batu bata bangunan rumah"
        },
        {
          "key": "D",
          "text": "Wajib dibakar di pinggir jalan raya agar abunya beterbangan"
        },
        {
          "key": "E",
          "text": "Dibuang ke sungai Komering sebagai makanan ikan buas"
        }
      ],
      "correct": "A",
      "explanation": "Ampas tahu masih mengandung serat kasar dan protein sekitar 15-20%, menjadikannya konsentrat pakan murah peningkat bobot sapi potong."
    },
    {
      "id": 2420,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Komoditas agro-industri UMKM khas Belitang yang sangat terkenal adalah kerupuk kemplang ikan. Bahan baku utama dalam formulasi adonan kemplang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tepung tapioka (singkong), daging ikan giling (ikan patin atau gabus), garam, bawang putih, dan air es"
        },
        {
          "key": "B",
          "text": "Tepung terigu protein tinggi, cokelat bubuk, dan susu kental manis"
        },
        {
          "key": "C",
          "text": "Daging ayam cincang, keju parut, dan minyak zaitun impor"
        },
        {
          "key": "D",
          "text": "Tepung beras ketan hitam, madu lebah hutan, dan santan kelapa"
        },
        {
          "key": "E",
          "text": "Bubuk agar-agar rumput laut dan gula aren pekat"
        }
      ],
      "correct": "A",
      "explanation": "Perpaduan pati tapioka dengan protein gelatinosa ikan air tawar lokal (patin/gabus) menghasilkan adonan elastis yang mekar renyah saat dipanaskan."
    },
    {
      "id": 2421,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin pengaduk adonan (mixer horizontal / molen kemplang) bertenaga motor listrik di bengkel UMKM berfungsi untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencampur tepung tapioka, daging ikan, dan bumbu secara merata hingga terbentuk adonan kalis homogen yang mudah dibentuk silinder"
        },
        {
          "key": "B",
          "text": "Memanggang kerupuk di dalam ruang oven bersuhu tinggi"
        },
        {
          "key": "C",
          "text": "Mengemas kerupuk ke dalam plastik berlabel merek dagang"
        },
        {
          "key": "D",
          "text": "Memotong kerupuk menjadi lempengan tipis secara otomatis"
        },
        {
          "key": "E",
          "text": "Menimbang bobot kerupuk kering sebelum dipasarkan"
        }
      ],
      "correct": "A",
      "explanation": "Pencampuran mekanis bilah spiral menghasilkan dispersi matriks pati-protein yang homogen tanpa gumpalan tepung kering."
    },
    {
      "id": 2422,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Setelah adonan kemplang dikukus matang dan didinginkan (diinapkan semalam), adonan dipotong tipis menggunakan mesin slicer pisau piringan berputar. Manfaat penggunaan mesin pemotong ini dibanding pisau manual adalah...",
      "options": [
        {
          "key": "A",
          "text": "Ketebalan irisan keping kemplang seragam (1–2 mm), kapasitas potong jauh lebih cepat, dan menghasilkan pemekaran yang merata saat digoreng"
        },
        {
          "key": "B",
          "text": "Membuat kemplang langsung matang dan siap dimakan seketika"
        },
        {
          "key": "C",
          "text": "Menghilangkan aroma ikan dari adonan kerupuk"
        },
        {
          "key": "D",
          "text": "Menambah berat timbangan kemplang menjadi sepuluh kali lipat"
        },
        {
          "key": "E",
          "text": "Membuat adonan kemplang berubah warna menjadi merah jambu"
        }
      ],
      "correct": "A",
      "explanation": "Keseragaman ketebalan irisan irisan pisau piringan menjamin waktu pengeringan yang serentak dan tingkat kemekaran (expansion ratio) yang konsisten."
    },
    {
      "id": 2423,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Proses penjemuran irisan kemplang basah di atas widik bambu bertingkat di bawah sinar matahari langsung bertujuan teknis untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menurunkan kadar air keping kemplang hingga di bawah 10% agar awet disimpan lama dan mekar sempurna saat dipanggang/digoreng"
        },
        {
          "key": "B",
          "text": "Membuat kemplang menjadi gosong dan beraroma arang"
        },
        {
          "key": "C",
          "text": "Mengundang lalat dan debu jalanan menempel pada kerupuk"
        },
        {
          "key": "D",
          "text": "Mengubah bentuk kemplang bulat menjadi bentuk segitiga"
        },
        {
          "key": "E",
          "text": "Menghilangkan seluruh kandungan garam dapur dari adonan"
        }
      ],
      "correct": "A",
      "explanation": "Kadar air kritis kerupuk mentah (gelatinized starch) sebelum digoreng adalah 9-11%; kadar air berlebih menyebabkan kerupuk bantat (tidak mekar)."
    },
    {
      "id": 2424,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Di Belitang dikenal dua teknik pematangan kerupuk kemplang, salah satunya adalah 'kemplang sangrai' (kemplang tunu pasir). Media penghantar panas yang digunakan pada teknik sangrai ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pasir sungai bersih yang telah diayak dan dicuci higienis, dipanaskan di atas wajan besi tebal tanpa minyak goreng"
        },
        {
          "key": "B",
          "text": "Minyak kelapa sawit curah yang mendidih bersuhu 200 derajat"
        },
        {
          "key": "C",
          "text": "Air mendidih yang dicampur dengan garam dapur"
        },
        {
          "key": "D",
          "text": "Asap pembakaran kayu basah di dalam cerobong tertutup"
        },
        {
          "key": "E",
          "text": "Uap panas radiator mesin traktor sawah"
        }
      ],
      "correct": "A",
      "explanation": "Konduksi termal butiran pasir silika panas mematangkan kerupuk secara kering bebas kolesterol minyak (oil-free snack) beraroma khas panggang."
    },
    {
      "id": 2425,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pada teknik penggorengan kemplang minyak, pengrajin sering menggunakan sistem dua wajan penggorengan dengan suhu berbeda. Fungsi wajan pertama bersuhu hangat (medium heat) adalah...",
      "options": [
        {
          "key": "A",
          "text": "Melunakkan dan mengembangkan awal keping kemplang mentah sebelum dipindahkan ke wajan kedua bersuhu panas tinggi untuk pemekaran maksimal"
        },
        {
          "key": "B",
          "text": "Mendinginkan kerupuk yang sudah matang agar cepat dikemas"
        },
        {
          "key": "C",
          "text": "Mencuci sisa minyak goreng dengan air sabun"
        },
        {
          "key": "D",
          "text": "Menghilangkan warna putih pada kerupuk kemplang"
        },
        {
          "key": "E",
          "text": "Tempat menampung kerupuk yang gosong dan rusak"
        }
      ],
      "correct": "A",
      "explanation": "Metode two-stage frying: wajan 1 (suhu 120-140°C) melunakkan struktur pati glassy, wajan 2 (suhu 180°C) meletupkan uap air seketika (puffing mekar)."
    },
    {
      "id": 2426,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Peralatan pengemasan kemplang menggunakan mesin Continuous Band Sealer elektrik. Keunggulan mesin sealer pita pemanas ini dibanding lilin manual adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menghasilkan segel rekatan plastik yang rapat kedap udara, rapi seragam, cepat, dan dilengkapi cetak kode tanggal kedaluwarsa otomatis"
        },
        {
          "key": "B",
          "text": "Dapat memotong kerupuk kemplang menjadi potongan kecil"
        },
        {
          "key": "C",
          "text": "Membakar plastik kemasan hingga kerupuk di dalamnya hangus"
        },
        {
          "key": "D",
          "text": "Mengubah plastik tipis menjadi kaleng aluminium tebal"
        },
        {
          "key": "E",
          "text": "Mesin dapat bekerja tanpa membutuhkan aliran listrik"
        }
      ],
      "correct": "A",
      "explanation": "Band sealer dengan teflon belt menghasilkan hermetic seal kedap udara dan nitrogen flush guna memperpanjang kerenyahan (shelf-life) produk."
    },
    {
      "id": 2427,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Legalitas resmi yang wajib dimiliki oleh unit usaha UMKM pengolahan pangan tahu dan kemplang di OKU Timur agar produknya dapat masuk ke pasar modern dan minimarket adalah...",
      "options": [
        {
          "key": "A",
          "text": "Nomor Induk Berusaha (NIB), Sertifikat P-IRT dari Dinas Kesehatan, dan Sertifikat Halal resmi dari BPJPH"
        },
        {
          "key": "B",
          "text": "Surat Izin Mengemudi (SIM A) pengemudi truk gilingan"
        },
        {
          "key": "C",
          "text": "Sertifikat kelulusan sekolah dasar pemilik pabrik"
        },
        {
          "key": "D",
          "text": "Surat pernyataan tidak akan menjual produk ke luar desa"
        },
        {
          "key": "E",
          "text": "Kupon jaminan sembako gratis dari dinas sosial"
        }
      ],
      "correct": "A",
      "explanation": "NIB berbasis risiko OSS, SPP-PIRT (Pangan Industri Rumah Tangga), dan sertifikasi Halal menjamin standar higienitas dan keamanan pangan bagi konsumen."
    },
    {
      "id": 2428,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Penerapan standar Cara Produksi Pangan Olahan yang Baik (CPPOB) pada bengkel kemplang dan tahu di Belitang mewajibkan pekerja kemasan memakai...",
      "options": [
        {
          "key": "A",
          "text": "Celemek bersih, penutup kepala (hairnet), masker mulut, dan sarung tangan plastik higienis"
        },
        {
          "key": "B",
          "text": "Jaket mantel bulu tebal musim dingin"
        },
        {
          "key": "C",
          "text": "Kacamata hitam gelap dan topi koboi"
        },
        {
          "key": "D",
          "text": "Perhiasan emas cincin dan gelang tangan berlebihan"
        },
        {
          "key": "E",
          "text": "Sepatu hak tinggi berbahan kulit licin"
        }
      ],
      "correct": "A",
      "explanation": "Personal hygiene pekerja (hairnet, masker, celemek) mencegah kontaminasi fisik (rambut/ketombe) dan mikrobiologis (droplet) pada makanan siap santap."
    },
    {
      "id": 2429,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Budaya kerja perajin tahu dan tempe di Belitang menuntut etos kedisiplinan waktu yang sangat tinggi. Hal ini dibuktikan dengan jadwal kerja harian, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Mulai beraktivitas memasak kedelai sejak pukul 01.30–03.00 dini hari agar tahu hangat segar siap didistribusikan ke pasar subuh Gumawang dan Belitang"
        },
        {
          "key": "B",
          "text": "Hanya mulai bekerja setelah matahari terbenam pada sore hari"
        },
        {
          "key": "C",
          "text": "Bekerja santai pada siang hari setelah seluruh pasar tutup"
        },
        {
          "key": "D",
          "text": "Hanya memproduksi tahu sekali dalam sebulan saat ada pesanan"
        },
        {
          "key": "E",
          "text": "Menyerahkan proses memasak kedelai kepada robot otomatis tanpa pengawasan"
        }
      ],
      "correct": "A",
      "explanation": "Karakter produk tahu segar yang berkadar air tinggi dan mudah basi menuntut siklus produksi dini hari agar sampai ke pasar tradisional dalam kondisi hangat."
    },
    {
      "id": 2430,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Hubungan kerja antara pemilik usaha UMKM pangan di pedesaan OKU Timur dengan para karyawannya berlandaskan pada nilai budaya...",
      "options": [
        {
          "key": "A",
          "text": "Kekeluargaan dan gotong royong, di mana tenaga kerja direkrut dari tetangga sekitar dengan sistem upah yang adil dan saling membantu saat hajatan"
        },
        {
          "key": "B",
          "text": "Persaingan permusuhan yang ketat tanpa saling menyapa"
        },
        {
          "key": "C",
          "text": "Sistem kerja paksa tanpa memberikan istirahat dan makan siang"
        },
        {
          "key": "D",
          "text": "Perekrutan tenaga kerja khusus yang didatangkan dari luar negeri"
        },
        {
          "key": "E",
          "text": "Karyawan dilarang berbicara dengan pemilik usaha seumur hidup"
        }
      ],
      "correct": "A",
      "explanation": "Social capital kekeluargaan menciptakan loyalitas kerja tinggi, suasana kerja harmonis, dan penyerapan tenaga kerja lokal inklusif di perdesaan."
    },
    {
      "id": 2431,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Alat ukur timbangan digital meja di bagian pengemasan kemplang yang telah ditera resmi oleh Dinas Perindustrian dan Perdagangan berfungsi untuk...",
      "options": [
        {
          "key": "A",
          "text": "Menjamin ketepatan berat bersih (netto) kemasan 250 gram atau 500 gram secara jujur sesuai label merek"
        },
        {
          "key": "B",
          "text": "Mengukur suhu ruangan di dalam bengkel pengemasan"
        },
        {
          "key": "C",
          "text": "Menghitung jumlah butir kerupuk di dalam kantong plastik"
        },
        {
          "key": "D",
          "text": "Memotong kantong plastik kemasan yang terlalu panjang"
        },
        {
          "key": "E",
          "text": "Menghapus cap kedaluwarsa pada kemasan produk"
        }
      ],
      "correct": "A",
      "explanation": "Akurasi timbangan tera metrologi melindungi hak konsumen dari pengurangan takaran dan memenuhi etika kejujuran perniagaan."
    },
    {
      "id": 2432,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Fluktuasi harga bahan baku impor (seperti kedelai untuk tahu-tempe dan minyak goreng) sering menjadi tantangan berat UMKM pangan. Strategi bertahan yang dilakukan pengrajin tanpa menurunkan mutu rasa adalah...",
      "options": [
        {
          "key": "A",
          "text": "Melakukan penyesuaian ukuran potongan tahu secara proporsional atau mengefisienkan proses pembakaran tanpa mengurangi takaran kedelai asli"
        },
        {
          "key": "B",
          "text": "Mencampur kedelai dengan bubuk semen putih agar tahu mengeras"
        },
        {
          "key": "C",
          "text": "Menggunakan minyak jelantah hitam bekas pakai berkali-kali"
        },
        {
          "key": "D",
          "text": "Menutup pabrik secara permanen dan menolak memproduksi tahu"
        },
        {
          "key": "E",
          "text": "Mewajibkan konsumen membayar sepuluh kali lipat dari harga normal"
        }
      ],
      "correct": "A",
      "explanation": "Penyesuaian ukuran fisik tanpa mengorbankan kualitas organoleptik (shrinkflation terkontrol) dan efisiensi energi menjaga loyalitas pelanggan saat krisis bahan baku."
    },
    {
      "id": 2433,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Jaringan distribusi produk kerupuk kemplang Belitang telah berkembang luas menembus luar daerah melalui rantai pasok...",
      "options": [
        {
          "key": "A",
          "text": "Penyaluran ke toko oleh-oleh khas Palembang, kios rest area jalan tol Trans Sumatera, dan penjualan daring e-commerce"
        },
        {
          "key": "B",
          "text": "Hanya dijual kepada tetangga di sebelah kanan rumah produksi"
        },
        {
          "key": "C",
          "text": "Dibuang ke sungai Komering jika tidak habis terjual dalam satu jam"
        },
        {
          "key": "D",
          "text": "Ditukarkan dengan batu kali di pinggir jembatan desa"
        },
        {
          "key": "E",
          "text": "Disimpan di dalam peti besi terkunci tanpa pernah dijual"
        }
      ],
      "correct": "A",
      "explanation": "Konektivitas jalan tol Trans-Sumatera mempercepat distribusi oleh-oleh kemplang Belitang ke gerai ritel modern di Palembang, Lampung, dan Jakarta."
    },
    {
      "id": 2434,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin continuous band sealer sering dilengkapi dengan pita pencetak kode tinta panas (hot ribbon coding printer) yang berfungsi mencantumkan...",
      "options": [
        {
          "key": "A",
          "text": "Kode produksi dan tanggal kedaluwarsa (Expired Date) secara permanen pada lipatan kemasan plastik"
        },
        {
          "key": "B",
          "text": "Nomor telepon genggam seluruh karyawan pabrik"
        },
        {
          "key": "C",
          "text": "Lirik lagu kebangsaan Indonesia Raya"
        },
        {
          "key": "D",
          "text": "Peta rute jalan menuju kebun singkong"
        },
        {
          "key": "E",
          "text": "Nomor plat kendaraan dinas bupati OKU Timur"
        }
      ],
      "correct": "A",
      "explanation": "Pencantuman batch number dan expiration date adalah regulasi wajib BPOM untuk jaminan keterlacakan dan keamanan konsumsi masyarakat."
    },
    {
      "id": 2435,
      "day": 2,
      "sector": "industri",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Gagasan inovasi modernisasi bagi sentra agro-industri pangan kemplang dan beras Belitang agar memiliki daya saing unggul di pasar ritel nasional adalah...",
      "options": [
        {
          "key": "A",
          "text": "Penggunaan kemasan standing pouch aluminium foil kedap udara berdesain modern, pendaftaran merek HKI, dan penjualan di platform marketplace nasional"
        },
        {
          "key": "B",
          "text": "Membungkus kerupuk kemplang menggunakan kertas koran bekas berminyak"
        },
        {
          "key": "C",
          "text": "Menghilangkan nama merek dan identitas produsen pada bungkus kemasan"
        },
        {
          "key": "D",
          "text": "Melarang pemanfaatan jaringan internet bagi pemasaran produk lokal"
        },
        {
          "key": "E",
          "text": "Menolak pembinaan mutu dan pelatihan kewirausahaan dari dinas koperasi"
        }
      ],
      "correct": "A",
      "explanation": "Kemasan barrier foil modern, branding terdaftar HAKI, dan omnichannel e-commerce mengangkat citra produk UMKM daerah ke kelas premium nasional."
    }
  ],
  "perdagangan": [
    {
      "id": 2501,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Kios Sarana Produksi Pertanian (Saprotan) resmi memiliki posisi strategis dalam ekosistem pertanian OKU Timur karena...",
      "options": [
        {
          "key": "A",
          "text": "Menjadi ujung tombak penyalur pupuk bersubsidi, benih unggul, pestisida terdaftar, dan peralatan alsintan langsung kepada petani di pedesaan"
        },
        {
          "key": "B",
          "text": "Menjual barang-barang perhiasan emas dan pakaian bermerek impor"
        },
        {
          "key": "C",
          "text": "Menyediakan tiket penerbangan pesawat internasional ke luar negeri"
        },
        {
          "key": "D",
          "text": "Melarang petani membeli pupuk saat musim tanam padi tiba"
        },
        {
          "key": "E",
          "text": "Hanya melayani pembelian bahan bangunan semen dan pasir cor"
        }
      ],
      "correct": "A",
      "explanation": "Kios saprotan resmi menjamin ketersediaan input produksi pertanian vital secara tepat waktu, tepat mutu, dan sesuai HET pemerintah."
    },
    {
      "id": 2502,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Sistem tata kelola distribusi pupuk bersubsidi saat ini menggunakan basis data digital 'e-Alokasi'. Fungsi utama dari sistem e-Alokasi ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menentukan jatah kuota pupuk bersubsidi secara tepat sasaran per petani berdasarkan data NIK KTP yang terdaftar dalam e-RDKK kelompok tani"
        },
        {
          "key": "B",
          "text": "Menghapus seluruh alokasi bantuan pupuk untuk petani di luar Jawa"
        },
        {
          "key": "C",
          "text": "Mengundi pemenang kupon pupuk gratis setiap minggu secara acak"
        },
        {
          "key": "D",
          "text": "Menaikkan harga pupuk bersubsidi sepuluh kali lipat tanpa pemberitahuan"
        },
        {
          "key": "E",
          "text": "Menggantikan peran pupuk kimia dengan air garam laut"
        }
      ],
      "correct": "A",
      "explanation": "e-Alokasi mengintegrasikan NIK petani dengan luasan sawah garapan (maksimal 2 ha per musim) untuk mencegah kebocoran kuota subsidi."
    },
    {
      "id": 2503,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Saat petani di Belitang menebus pupuk bersubsidi di Kios Pupuk Lengkap (KPL), prosedur digital resmi yang diterapkan melalui aplikasi iPubers (Integrasi Pupuk Bersubsidi) adalah...",
      "options": [
        {
          "key": "A",
          "text": "Petani menunjukkan KTP asli, difoto wajah bersama KTP dan pupuk tebusan oleh pemilik kios, lalu menandatangani bukti transaksi digital di smartphone"
        },
        {
          "key": "B",
          "text": "Petani wajib menyanyikan lagu mars pertanian di depan kasir kios"
        },
        {
          "key": "C",
          "text": "Petani menitipkan sertifikat tanah sawah asli sebagai jaminan"
        },
        {
          "key": "D",
          "text": "Petani cukup mengirimkan pesan suara WhatsApp tanpa perlu menunjukkan KTP"
        },
        {
          "key": "E",
          "text": "Penebusan pupuk diwakilkan kepada anak di bawah umur tanpa identitas"
        }
      ],
      "correct": "A",
      "explanation": "Aplikasi iPubers menggunakan teknologi geotagging foto dan pencocokan KTP/face recognition untuk verifikasi pertanggungjawaban penyaluran pupuk subsidi."
    },
    {
      "id": 2504,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Dua jenis pupuk bersubsidi yang difasilitasi pemerintah bagi petani tanaman pangan (padi, jagung, kedelai) di OKU Timur adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pupuk Urea (kandungan Nitrogen 46%) dan NPK Phonska (formula N-P-K berimbang 15-10-12)"
        },
        {
          "key": "B",
          "text": "Pupuk kalsium murni dan abu gosok dapur"
        },
        {
          "key": "C",
          "text": "Garam inggris dan serbuk kapur tohor dinding"
        },
        {
          "key": "D",
          "text": "Pupuk cair beralkohol dan minyak tanah"
        },
        {
          "key": "E",
          "text": "Bubuk mesiu dan sulfur klorin industri"
        }
      ],
      "correct": "A",
      "explanation": "Sesuai Permentan No. 10/2022 jo. No. 01/2024, pupuk bersubsidi difokuskan pada Urea (sumber N) dan NPK (hara makro majemuk lengkap)."
    },
    {
      "id": 2505,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Legalitas resmi yang wajib dipenuhi oleh sebuah toko pertanian untuk dapat beroperasi sebagai Kios Pengecer Resmi (KPL) di wilayah OKU Timur adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memiliki Nomor Induk Berusaha (NIB), Surat Izin Usaha Perdagangan, dan Surat Perjanjian Jual Beli (SPJB) resmi dari distributor pupuk terdaftar"
        },
        {
          "key": "B",
          "text": "Memiliki sertifikat izin mendirikan bangunan bertingkat sepuluh"
        },
        {
          "key": "C",
          "text": "Memiliki mobil mewah yang dipajang di depan etalase toko"
        },
        {
          "key": "D",
          "text": "Mendapat izin dari seluruh pedagang kaki lima di pasar kecamatan"
        },
        {
          "key": "E",
          "text": "Membebaskan seluruh pembeli dari kewajiban membayar nota belanja"
        }
      ],
      "correct": "A",
      "explanation": "KPL adalah lembaga penyalur resmi lini IV yang terikat SPJB kontraktual dengan distributor resmi pupuk holding Pupuk Indonesia."
    },
    {
      "id": 2506,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam lembar observasi gudang penyimpanan kios pupuk, karung pupuk ditumpuk di atas palet kayu dengan jarak minimal 30 cm dari dinding tembok. Prosedur standar ini bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencegah kelembapan dinding dan lantai meresap ke dalam karung yang dapat menyebabkan pupuk mencair atau menggumpal membatu"
        },
        {
          "key": "B",
          "text": "Memberikan ruang bagi tikus untuk berlarian di belakang tumpukan"
        },
        {
          "key": "C",
          "text": "Membuat tumpukan karung mudah roboh saat tersenggol pekerja"
        },
        {
          "key": "D",
          "text": "Mendinginkan ruangan gudang seperti lemari es pendingin"
        },
        {
          "key": "E",
          "text": "Sebagai pembatas wilayah tempat tidur penjaga malam gudang"
        }
      ],
      "correct": "A",
      "explanation": "Sifat higroskopis pupuk (terutama urea) menyerap uap air; palet kayu dan celah sirkulasi dinding menjaga karung tetap kering dan tidak menggumpal (caking)."
    },
    {
      "id": 2507,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Obat-obatan pertanian (pestisida) yang dijual di kios saprotan diklasifikasikan berdasarkan fungsinya. Pestisida yang diformulasikan khusus untuk membasmi rumput liar atau gulma di sawah disebut...",
      "options": [
        {
          "key": "A",
          "text": "Herbisida"
        },
        {
          "key": "B",
          "text": "Insektisida"
        },
        {
          "key": "C",
          "text": "Fungisida"
        },
        {
          "key": "D",
          "text": "Rodentisida"
        },
        {
          "key": "E",
          "text": "Akarisida"
        }
      ],
      "correct": "A",
      "explanation": "Herbisida (racun rumput) mengendalikan gulma, insektisida mengendalikan serangga, fungisida mengendalikan jamur, dan rodentisida mengendalikan tikus."
    },
    {
      "id": 2508,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Pada kemasan botol pestisida di kios, terdapat pita warna peringatan toksisitas (merah, kuning, biru, atau hijau). Pita warna merah tua dengan simbol tengkorak memiliki makna bahaya...",
      "options": [
        {
          "key": "A",
          "text": "Tingkat bahaya sangat beracun tinggi (Kelas Ia/Ib) yang membutuhkan kehati-hatian ekstra dan APD lengkap saat penanganan"
        },
        {
          "key": "B",
          "text": "Bahan pangan manis yang aman diminum langsung oleh manusia"
        },
        {
          "key": "C",
          "text": "Produk pupuk organik cair yang terbuat dari sari buah segar"
        },
        {
          "key": "D",
          "text": "Bahan kimia yang sama sekali tidak memiliki efek racun"
        },
        {
          "key": "E",
          "text": "Pewarna pakaian batik tradisional ramah lingkungan"
        }
      ],
      "correct": "A",
      "explanation": "Standar WHO dan Kementan menetapkan pita merah sebagai kategori racun akut sangat berbahaya yang memerlukan SOP penyimpanan dan aplikasi ketat."
    },
    {
      "id": 2509,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Penerapan K3 di kios sarana pertanian mewajibkan pemisahan tegas antara rak penyimpanan pestisida dengan rak barang lain. Aturan keselamatan yang tidak boleh dilanggar adalah...",
      "options": [
        {
          "key": "A",
          "text": "Dilarang keras meletakkan racun pestisida berdekatan dengan bahan makanan pokok (sembako), pakan ternak, dan sumber air minum"
        },
        {
          "key": "B",
          "text": "Pestisida wajib disimpan di dalam toples kaca transparan terbuka"
        },
        {
          "key": "C",
          "text": "Botol racun pestisida wajib dibuka tutupnya agar baunya menyebar"
        },
        {
          "key": "D",
          "text": "Pekerja dilarang mencuci tangan setelah mengangkat botol pestisida bocor"
        },
        {
          "key": "E",
          "text": "Pestisida diletakkan di lantai area bermain anak-anak"
        }
      ],
      "correct": "A",
      "explanation": "Pencegahan kontaminasi silang (cross-contamination) racun berbahaya ke komoditas pangan pokok adalah prinsip mutlak K3 pergudangan ritel."
    },
    {
      "id": 2510,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Alat ukur timbangan duduk mekanik jarum atau timbangan digital lantai di kios dan toko sembako wajib memiliki segel tera resmi dari Dinas Perindustrian dan Perdagangan. Fungsi tera metrologi ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memastikan kalibrasi timbangan akurat, mencegah kecurangan pengurangan timbangan, dan melindungi hak keadilan bagi pembeli"
        },
        {
          "key": "B",
          "text": "Membuat timbangan dapat menimbang barang secara otomatis tanpa diletakkan beban"
        },
        {
          "key": "C",
          "text": "Menambah berat timbangan sebesar 20 persen agar pedagang untung berlipat"
        },
        {
          "key": "D",
          "text": "Mengubah angka timbangan menjadi huruf aksara tradisional"
        },
        {
          "key": "E",
          "text": "Sebagai hiasan stiker berwarna emas di meja kasir"
        }
      ],
      "correct": "A",
      "explanation": "Tera ulang berkala UU No. 2/1981 tentang Metrologi Legal menjamin kepastian ukuran, timbangan, dan takaran yang jujur dalam transaksi perniagaan."
    },
    {
      "id": 2511,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Toko sembako dan kios pertanian modern di Belitang memanfaatkan barcode scanner dan software Point of Sale (POS) di meja kasir. Keuntungan sistem digital ini dibanding pembukuan manual nota kertas adalah...",
      "options": [
        {
          "key": "A",
          "text": "Transaksi cepat tanpa antrean lama, pengurangan stok barang tercatat otomatis saat barang di-scan, dan laporan laba harian terhitung akurat"
        },
        {
          "key": "B",
          "text": "Pembeli dibebaskan dari kewajiban membayar harga barang yang dibeli"
        },
        {
          "key": "C",
          "text": "Menghilangkan kebutuhan listrik dan internet di dalam toko"
        },
        {
          "key": "D",
          "text": "Membuat barang dagangan tidak pernah kedaluwarsa selamanya"
        },
        {
          "key": "E",
          "text": "Menggantikan peran penjaga toko dengan robot pembersih lantai"
        }
      ],
      "correct": "A",
      "explanation": "Aplikasi kasir POS mengintegrasikan scan barcode harga dengan update real-time kartu stok gudang dan rekapitulasi omzet otomatis."
    },
    {
      "id": 2512,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Dalam hubungan sosial budaya antara pemilik kios pertanian dengan petani di desa OKU Timur, terdapat sistem kepercayaan transaksi 'tempo panen' atau 'bon panen', yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Petani mengambil pupuk dan benih di awal musim tanam secara kredit, lalu melunasi pembayarannya setelah panen padi selesai"
        },
        {
          "key": "B",
          "text": "Petani wajib menyerahkan sertifikat sawah sebagai jaminan utang satu karung pupuk"
        },
        {
          "key": "C",
          "text": "Pemilik kios mengambil alih hak garap sawah petani selama lima musim berturut-turut"
        },
        {
          "key": "D",
          "text": "Petani membayar harga pupuk setiap hari dengan bunga sepuluh persen"
        },
        {
          "key": "E",
          "text": "Sistem barter antara pupuk bersubsidi dengan mobil mewah milik petani"
        }
      ],
      "correct": "A",
      "explanation": "Sistem tempo panen (yarnen/bayar panen) berbasis modal sosial kepercayaan (trust) yang menopang likuiditas petani di masa tanam sebelum panen tiba."
    },
    {
      "id": 2513,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Pasar Gumawang di Kecamatan Belitang dikenal sebagai pasar tradisional dan grosir terbesar di Kabupaten OKU Timur. Karakteristik utama Pasar Gumawang dalam perekonomian regional adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pusat distribusi grosir komoditas sembako, sayuran, pakaian, dan sarana pertanian yang melayani pasokan ke pasar-pasar kecamatan di sekitarnya"
        },
        {
          "key": "B",
          "text": "Pasar khusus yang hanya beroperasi selama 10 menit setiap hari Minggu"
        },
        {
          "key": "C",
          "text": "Pasar internasional yang hanya menggunakan mata uang dollar Amerika"
        },
        {
          "key": "D",
          "text": "Pasar lelang kendaraan bermotor mewah tanpa menjual bahan pangan"
        },
        {
          "key": "E",
          "text": "Pasar terapung di atas perahu di tengah danau Ranau"
        }
      ],
      "correct": "A",
      "explanation": "Pasar Gumawang adalah hub logistik perdagangan primer OKU Timur yang menghubungkan arus pasokan produsen lokal dengan distributor antarkabupaten."
    },
    {
      "id": 2514,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Di wilayah OKU Timur juga hidup tradisi budaya 'pasar kalangan' atau pasar tumpah mingguan (misal Kalangan Selasa, Kalangan Kamis). Ciri khas pasar kalangan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Hari pasar berlangsung bergilir secara periodik seminggu sekali di desa tertentu, di mana pedagang keliling berkumpul menjajakan aneka barang kebutuhan warga"
        },
        {
          "key": "B",
          "text": "Pasar yang hanya dibuka pada waktu tengah malam gelap gulita"
        },
        {
          "key": "C",
          "text": "Seluruh barang dagangan dibagikan secara gratis kepada warga desa"
        },
        {
          "key": "D",
          "text": "Pasar yang khusus menjual hewan ternak buas liar"
        },
        {
          "key": "E",
          "text": "Dilarang ada transaksi tawar-menawar antara penjual dan pembeli"
        }
      ],
      "correct": "A",
      "explanation": "Pasar kalangan adalah pola perniagaan agraris tradisional Sumatera Selatan yang berpindah hari sesuai jadwal pasar mingguan antardesa."
    },
    {
      "id": 2515,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Dalam rantai pasok perdagangan komoditas beras di OKU Timur, pedagang pengumpul desa (pengepul gabah) memiliki fungsi penting berupa...",
      "options": [
        {
          "key": "A",
          "text": "Menjemput gabah langsung dari petak sawah petani, menimbang di tempat, membayar tunai, dan menyalurkannya ke pabrik penggilingan padi besar"
        },
        {
          "key": "B",
          "text": "Memaksa petani membakar gabah hasil panen di hadapan warga"
        },
        {
          "key": "C",
          "text": "Mengimpor beras dari luar negeri untuk dijual kembali ke petani lokal"
        },
        {
          "key": "D",
          "text": "Menghentikan pengoperasian seluruh truk pengangkut gabah desa"
        },
        {
          "key": "E",
          "text": "Menetapkan kadar air gabah secara sepihak tanpa alat pengukur"
        }
      ],
      "correct": "A",
      "explanation": "Pengepul gabah lokal menjembatani keterbatasan akses logistik petani kecil menuju fasilitas penggilingan RMU besar."
    },
    {
      "id": 2516,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Tata letak barang dagangan (merchandising) di toko grosir sembako diatur secara strategis. Penempatan barang kebutuhan sehari-hari yang berputar cepat (fast moving consumer goods seperti beras, minyak, gula) di area depan bertujuan...",
      "options": [
        {
          "key": "A",
          "text": "Mempermudah akses pelanggan, mempercepat arus antrean bongkar muat barang, dan menarik perhatian pembeli yang melintas"
        },
        {
          "key": "B",
          "text": "Membiarkan barang basah terkena cipratan air hujan dari jalan raya"
        },
        {
          "key": "C",
          "text": "Menghalangi jalan masuk bagi pelanggan yang ingin berbelanja"
        },
        {
          "key": "D",
          "text": "Membuat barang dagangan cepat rusak terkena terik matahari langsung"
        },
        {
          "key": "E",
          "text": "Menyembunyikan barang dagangan dari pengawasan kasir toko"
        }
      ],
      "correct": "A",
      "explanation": "Visual merchandising toko ritel menempatkan fast-moving essentials di zona aksesibilitas tinggi untuk perputaran persediaan (inventory turnover) yang lancar."
    },
    {
      "id": 2517,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pengendalian hama kutu beras (Sitophilus oryzae) di gudang toko beras dilakukan pedagang dengan menerapkan teknik fumigasi yang aman atau menjaga sirkulasi udara kering. Alasan utamanya adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kutu beras merusak bulir beras dari dalam hingga menjadi bubuk berdebu dan menurunkan berat timbangan serta harga jual beras"
        },
        {
          "key": "B",
          "text": "Kutu beras dapat menggigit pembeli yang datang ke toko hingga pingsan"
        },
        {
          "key": "C",
          "text": "Kutu beras membuat karung beras berubah menjadi karung plastik"
        },
        {
          "key": "D",
          "text": "Kutu beras mengubah beras putih menjadi beras merah organik"
        },
        {
          "key": "E",
          "text": "Kutu beras membuat aroma beras menjadi seperti parfum wangi"
        }
      ],
      "correct": "A",
      "explanation": "Weevil infestation melubangi endosperma beras, meningkatkan fraksi butir menir patah, menimbulkan panas metabolik, dan merusak nilai jual beras."
    },
    {
      "id": 2518,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Manajemen persediaan barang sembako di gudang toko wajib menerapkan metode FIFO (First In First Out), yang memiliki makna...",
      "options": [
        {
          "key": "A",
          "text": "Barang yang pertama kali masuk gudang harus menjadi barang yang pertama kali dikeluarkan dan dijual kepada pelanggan guna menghindari kedaluwarsa"
        },
        {
          "key": "B",
          "text": "Barang yang paling mahal harganya harus disimpan selamanya di gudang"
        },
        {
          "key": "C",
          "text": "Barang yang baru datang kemarin harus dijual terlebih dahulu"
        },
        {
          "key": "D",
          "text": "Seluruh barang di gudang wajib dibagikan secara gratis kepada warga"
        },
        {
          "key": "E",
          "text": "Barang yang mendekati tanggal kedaluwarsa disembunyikan di bawah meja"
        }
      ],
      "correct": "A",
      "explanation": "Prinsip FIFO rotasi persediaan mencegah barang lama tertimbun di dasar tumpukan hingga melewati masa simpan aman (shelf life expiration)."
    },
    {
      "id": 2519,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan mekanis portable yang digunakan di toko beras untuk menjahit bibir karung goni/plastik 50 kg dan 10 kg dengan jahitan rantai rapi dan kuat adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mesin jahit karung elektrik portabel (portable bag closer)"
        },
        {
          "key": "B",
          "text": "Mesin bordir baju kebaya modern"
        },
        {
          "key": "C",
          "text": "Stapler kertas ukuran kecil"
        },
        {
          "key": "D",
          "text": "Pistol lem tembak silikon panas"
        },
        {
          "key": "E",
          "text": "Gunting pemotong kuku manual"
        }
      ],
      "correct": "A",
      "explanation": "Bag closer machine menghasilkan jahitan rantai tunggal (single thread chain stitch) yang kuat menahan beban angkut beras puluhan kilogram."
    },
    {
      "id": 2520,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Alat pengangkut barang manual beroda besi dengan garpu hidrolik yang digunakan di gudang toko pertanian untuk memindahkan palet muatan pupuk satu ton disebut...",
      "options": [
        {
          "key": "A",
          "text": "Hand Pallet Truck"
        },
        {
          "key": "B",
          "text": "Sepeda ontel gandeng"
        },
        {
          "key": "C",
          "text": "Becak kayuh tradisional"
        },
        {
          "key": "D",
          "text": "Kereta dorong bayi"
        },
        {
          "key": "E",
          "text": "Papan seluncur salju"
        }
      ],
      "correct": "A",
      "explanation": "Hand pallet hidrolik manual memungkinkan satu orang pekerja memindahkan muatan palet berat 1-2 ton dengan aman dan efisien secara ergonomis."
    },
    {
      "id": 2521,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Arus kas (cash flow) bisnis kios pertanian di OKU Timur memiliki karakter musiman yang sangat kuat. Pola fluktuasi penjualan tahunan yang dialami pemilik kios adalah...",
      "options": [
        {
          "key": "A",
          "text": "Lonjakan omzet tajam saat awal musim sebar pupuk tanam padi (musim tanam rendeng dan gadu), dan masa perputaran lambat saat jeda tunggu panen"
        },
        {
          "key": "B",
          "text": "Penjualan selalu stabil seratus persen persis sama setiap detik sepanjang tahun"
        },
        {
          "key": "C",
          "text": "Kios hanya buka sehari dalam setahun saat malam pergantian tahun baru"
        },
        {
          "key": "D",
          "text": "Omzet tertinggi selalu terjadi pada saat terjadi banjir bandang musim hujan"
        },
        {
          "key": "E",
          "text": "Kios tidak pernah menerima pembayaran uang tunai dari para pembeli"
        }
      ],
      "correct": "A",
      "explanation": "Seasonal cycle agribisnis: peak demand pada bulan pemupukan I dan II, diikuti masa paceklik penjualan yang memerlukan manajemen likuiditas kas matang."
    },
    {
      "id": 2522,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Nilai budaya pelayanan dalam perniagaan di toko pertanian pedesaan OKU Timur tidak hanya sebatas jual beli barang, melainkan juga berfungsi sebagai...",
      "options": [
        {
          "key": "A",
          "text": "Pusat konsultasi informal di mana pemilik kios mengedukasi petani mengenai takaran dosis pupuk berimbang dan cara penanganan hama sawah yang benar"
        },
        {
          "key": "B",
          "text": "Tempat bertengkar memperdebatkan harga barang di hadapan khalayak"
        },
        {
          "key": "C",
          "text": "Tempat menjelek-jelekkan hasil panen milik kelompok tani tetangga"
        },
        {
          "key": "D",
          "text": "Arena pertaruhan uang tunai antar-pembeli yang sedang antre"
        },
        {
          "key": "E",
          "text": "Tempat mengurung pembeli yang menawar harga terlalu murah"
        }
      ],
      "correct": "A",
      "explanation": "Pemilik kios bertindak sebagai advisory partner informal terpercaya bagi petani dalam mendiagnosis gejala serangan hama dan rekomendasi dosis agronomi."
    },
    {
      "id": 2523,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Untuk menghindari kerugian akibat peredaran uang palsu saat transaksi tunai bernilai besar di toko grosir, alat deteksi cepat yang digunakan di meja kasir adalah...",
      "options": [
        {
          "key": "A",
          "text": "Lampu detektor ultraviolet (UV) dan penerapan teknik manual 3D (Dilihat, Diraba, Diterawang)"
        },
        {
          "key": "B",
          "text": "Mencelupkan seluruh lembaran uang ke dalam air sabun panas"
        },
        {
          "key": "C",
          "text": "Membakar ujung lembaran uang menggunakan korek api gas"
        },
        {
          "key": "D",
          "text": "Menggunting lembaran uang menjadi dua bagian sama besar"
        },
        {
          "key": "E",
          "text": "Menimbang berat lembaran uang menggunakan timbangan badan"
        }
      ],
      "correct": "A",
      "explanation": "Fluoresensi tinta bercahaya di bawah sinar UV dan fitur rabaan intaglio serta benang pengaman Bank Indonesia menjadi SOP kasir pencegah fraud uang palsu."
    },
    {
      "id": 2524,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pemasangan stiker barcode QRIS (Quick Response Code Indonesian Standard) di meja toko kelontong Belitang memberikan kemudahan bagi pembeli generasi muda berupa...",
      "options": [
        {
          "key": "A",
          "text": "Pembayaran nontunai secara instan dari aplikasi dompet digital atau mobile banking tanpa perlu repot menyiapkan uang kembalian pecahan kecil"
        },
        {
          "key": "B",
          "text": "Potongan harga seratus persen sehingga barang menjadi gratis"
        },
        {
          "key": "C",
          "text": "Kemampuan mengambil barang dagangan tanpa perlu izin pemilik toko"
        },
        {
          "key": "D",
          "text": "Menghilangkan kewajiban pemilik toko mencatat transaksi harian"
        },
        {
          "key": "E",
          "text": "Mengubah smartphone pembeli menjadi mesin cetak uang kertas"
        }
      ],
      "correct": "A",
      "explanation": "Interoperabilitas QRIS mempercepat settlement pembayaran non-tunai, mengeliminasi risiko uang palsu, dan menghilangkan kerepotan uang receh kembalian."
    },
    {
      "id": 2525,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Dinamika fluktuasi harga komoditas cabai, telur ayam, dan minyak goreng di Pasar Gumawang sangat dipengaruhi oleh hukum ekonomi dasar, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Hukum permintaan dan penawaran; harga naik saat pasokan langka dan permintaan tinggi menjelang hari raya, dan harga turun saat panen raya serentak melimpah"
        },
        {
          "key": "B",
          "text": "Keputusan sepihak satu orang pedagang keliling di pasar"
        },
        {
          "key": "C",
          "text": "Warna cat genteng bangunan pasar tradisional"
        },
        {
          "key": "D",
          "text": "Arah tiupan angin kencang di atas atap pasar"
        },
        {
          "key": "E",
          "text": "Jumlah kucing liar yang berkeliaran di los pedagang ikan"
        }
      ],
      "correct": "A",
      "explanation": "Elastisitas harga pangan segar sangat sensitif terhadap shock pasokan musiman cuaca dan lonjakan konsumsi masyarakat saat hari besar keagamaan."
    },
    {
      "id": 2526,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Pemerintah menetapkan regulasi Harga Eceran Tertinggi (HET) untuk pupuk bersubsidi. Sanksi tegas bagi KPL yang terbukti menjual pupuk bersubsidi di atas HET resmi atau menimbun barang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pencabutan izin operasional sebagai pengecer resmi pupuk bersubsidi dan diproses secara hukum pidana perundang-undangan"
        },
        {
          "key": "B",
          "text": "Diberikan penghargaan sertifikat toko teladan oleh bupati"
        },
        {
          "key": "C",
          "text": "Diberikan tambahan kuota pupuk gratis sebanyak sepuluh truk"
        },
        {
          "key": "D",
          "text": "Diwajibkan membagi-bagikan uang tunai kepada pemilik distributor"
        },
        {
          "key": "E",
          "text": "Tidak ada sanksi apa pun karena harga bebas ditentukan pedagang"
        }
      ],
      "correct": "A",
      "explanation": "Pelanggaran HET dan penyelewengan barang subsidi melanggar UU Perdagangan dan Kepmentan dengan ancaman delik pidana ekonomi dan pemutusan SPJB."
    },
    {
      "id": 2527,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Jika terdapat karung pupuk bersubsidi yang robek atau kemasan pestisida yang bocor saat proses pengiriman dari distributor ke kios, SOP pergudangan yang benar adalah...",
      "options": [
        {
          "key": "A",
          "text": "Segera mengisolasi produk rusak ke area karantina retur, menampung tumpahan agar tidak mencemari toko, dan mengajukan klaim penggantian (retur) resmi"
        },
        {
          "key": "B",
          "text": "Menyiram tumpahan racun kimia ke dalam parit depan rumah warga"
        },
        {
          "key": "C",
          "text": "Mencampur pupuk rusak dengan pasir untuk dijual ke petani miskin"
        },
        {
          "key": "D",
          "text": "Menyembunyikan karung robek di bawah tumpukan karung baru"
        },
        {
          "key": "E",
          "text": "Membiarkan cairan kimia tumpah membasahi beras sembako"
        }
      ],
      "correct": "A",
      "explanation": "Penanganan karantina retur mencegah kontaminasi toksik pada lingkungan kerja toko dan menjaga integritas kualitas barang dagangan."
    },
    {
      "id": 2528,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Paguyuban pedagang di los pasar tradisional OKU Timur memiliki nilai modal sosial kebersamaan yang terwujud dalam bentuk...",
      "options": [
        {
          "key": "A",
          "text": "Iuran kebersihan bersama, ronda malam menjaga keamanan los pasar, dan saling menjaga lapak dagangan tetangga saat pemiliknya sedang salat/istirahat"
        },
        {
          "key": "B",
          "text": "Upaya saling mencuri timbangan milik pedagang sebelah"
        },
        {
          "key": "C",
          "text": "Perkelahian massal memperebutkan lorong jalan pasar"
        },
        {
          "key": "D",
          "text": "Kesepakatan menjual barang-barang kedaluwarsa secara diam-diam"
        },
        {
          "key": "E",
          "text": "Melarang warga luar kecamatan untuk berbelanja di pasar"
        }
      ],
      "correct": "A",
      "explanation": "Solidaritas paguyuban pasar tradisional (social capital) menopang keamanan lingkungan, kebersihan fasilitas umum, dan rasa aman berusaha."
    },
    {
      "id": 2529,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pembukuan keuangan harian sederhana yang wajib dibuat pemilik kios meliputi pencatatan Buku Kas Masuk, Buku Kas Keluar, dan Buku Piutang. Manfaat utama pemisahan ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memisahkan secara jelas antara uang modal usaha dengan uang belanja pribadi keluarga, serta memantau tagihan piutang petani yang jatuh tempo"
        },
        {
          "key": "B",
          "text": "Menghabiskan persediaan kertas tulis di meja kasir"
        },
        {
          "key": "C",
          "text": "Membuat petugas pajak bingung menghitung penghasilan toko"
        },
        {
          "key": "D",
          "text": "Mencegah pembeli mengetahui nama pemilik toko pertanian"
        },
        {
          "key": "E",
          "text": "Menggantikan kewajiban melayani pembeli yang datang berbelanja"
        }
      ],
      "correct": "A",
      "explanation": "Pemisahan uang pribadi dan uang bisnis (financial literacy) adalah fondasi ketahanan UMKM agar modal kerja tidak tergerus konsumsi keluarga."
    },
    {
      "id": 2530,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Menjamurnya jaringan minimarket waralaba modern di jalan-jalan poros Belitang menjadi tantangan bagi toko kelontong tradisional. Strategi keunggulan kompetitif yang dapat dipertahankan toko lokal adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menyediakan layanan utang/tempo bagi warga sekitar, hubungan kekeluargaan yang akrab, dan jam buka yang lebih fleksibel"
        },
        {
          "key": "B",
          "text": "Merusak papan nama toko minimarket modern di malam hari"
        },
        {
          "key": "C",
          "text": "Melarang warga desa berbelanja di toko minimarket ber-AC"
        },
        {
          "key": "D",
          "text": "Menutup toko kelontong dan pindah ke luar pulau Sumatera"
        },
        {
          "key": "E",
          "text": "Menaikkan harga barang dua kali lipat lebih mahal dari minimarket"
        }
      ],
      "correct": "A",
      "explanation": "Kedekatan emosional personal, fleksibilitas kredit tanpa bunga perbankan, dan pemahaman kebutuhan spesifik warga desa menjadi parit pertahanan toko kelontong."
    },
    {
      "id": 2531,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Pemanfaatan media WhatsApp grup pelanggan oleh pemilik kios pupuk di Belitang memberikan efisiensi komunikasi berupa...",
      "options": [
        {
          "key": "A",
          "text": "Mengabarkan jadwal kedatangan truk pasokan pupuk baru secara serentak sehingga petani tidak perlu bolak-balik datang ke kios saat stok masih kosong"
        },
        {
          "key": "B",
          "text": "Mengirimkan karung pupuk secara gaib melalui pesan internet"
        },
        {
          "key": "C",
          "text": "Mengubah harga pupuk sesuka hati tanpa sepengetahuan pemerintah"
        },
        {
          "key": "D",
          "text": "Menyebarkan berita bohong (hoaks) seputar cuaca buruk"
        },
        {
          "key": "E",
          "text": "Memblokir kontak pelanggan yang menanyakan ketersediaan barang"
        }
      ],
      "correct": "A",
      "explanation": "Broadcast WhatsApp komunitas memangkas biaya transportasi petani, mengurai antrean panjang saat pupuk tiba, dan menjamin transparansi stok."
    },
    {
      "id": 2532,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Dalam lembar observasi K3 kegiatan bongkar muat barang di toko pertanian, kuli panggul yang mengangkat karung pupuk 50 kg dianjurkan memakai perlengkapan pelindung...",
      "options": [
        {
          "key": "A",
          "text": "Sabuk penopang pinggang (back support belt / korset kerja), kain alas pundak tebal, dan sepatu kerja berpelindung"
        },
        {
          "key": "B",
          "text": "Kacamata renang silikon dan baju renang ketat"
        },
        {
          "key": "C",
          "text": "Sepatu hak tinggi kulit dan sarung tangan sutra"
        },
        {
          "key": "D",
          "text": "Jas hujan parasut berlapis bulu domba tebal"
        },
        {
          "key": "E",
          "text": "Topi pesta ulang tahun berujung kerucut"
        }
      ],
      "correct": "A",
      "explanation": "Back support belt menstabilkan ruas tulang belakang lumbal saat mengangkat beban aksial 50 kg guna mencegah cedera fatal saraf terjepit (HNP)."
    },
    {
      "id": 2533,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Kios saprotan di daerah Belitang juga menyediakan suku cadang sarana pengairan sawah, antara lain...",
      "options": [
        {
          "key": "A",
          "text": "Mesin pompa air alkon bensin/solar, selang buang spiral, pipa PVC paralon, kran air, dan klep hisap pompa"
        },
        {
          "key": "B",
          "text": "Jangkar kapal laut samudra dan baling-baling kapal pesiar"
        },
        {
          "key": "C",
          "text": "Sayap pesawat terbang dan ban roda pesawat komersial"
        },
        {
          "key": "D",
          "text": "Roda kereta api uap dan rel bantalan besi baja"
        },
        {
          "key": "E",
          "text": "Pipa penyulingan minyak bumi lepas pantai"
        }
      ],
      "correct": "A",
      "explanation": "Ketersediaan pompa alkon dan selang hisap/buang sangat krusial saat petani membutuhkan pompanisasi air darurat saat kemarau gadu."
    },
    {
      "id": 2534,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Nilai etika religius dan budaya kejujuran yang dipegang teguh oleh narasumber pedagang pasar di OKU Timur tercermin dari prinsip...",
      "options": [
        {
          "key": "A",
          "text": "Menyempurnakan takaran dan timbangan secara adil, tidak menjual barang palsu/rusak, dan meyakini kejujuran sebagai sumber keberkahan rezeki keluarga"
        },
        {
          "key": "B",
          "text": "Mengurangi timbangan 1 ons setiap kilogram untuk memperkaya diri"
        },
        {
          "key": "C",
          "text": "Mencampur beras bagus dengan beras busuk berbau apek"
        },
        {
          "key": "D",
          "text": "Memaksa pembeli membayar dengan mata uang asing kuno"
        },
        {
          "key": "E",
          "text": "Menolak pembeli yang berasal dari suku atau agama yang berbeda"
        }
      ],
      "correct": "A",
      "explanation": "Etika perniagaan berakar pada nilai religius masyarakat OKU Timur yang menempatkan kejujuran takaran sebagai amanah moral dan pilar reputasi bisnis jangka panjang."
    },
    {
      "id": 2535,
      "day": 2,
      "sector": "perdagangan",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Gagasan modernisasi rantai pasok perdagangan komoditas pertanian dan beras Belitang berbasis digital di masa depan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Integrasi platform logistik e-commerce agribisnis lokal yang menghubungkan langsung gabungan kelompok tani (Gapoktan) dengan konsumen luar kota tanpa perantara panjang"
        },
        {
          "key": "B",
          "text": "Menghapus seluruh pasar tradisional dan melarang transaksi jual beli"
        },
        {
          "key": "C",
          "text": "Mewajibkan seluruh pembayaran hasil pertanian menggunakan emas batangan murni"
        },
        {
          "key": "D",
          "text": "Melarang petani mengetahui harga pasaran beras di kota besar"
        },
        {
          "key": "E",
          "text": "Menghentikan seluruh aktivitas distribusi beras ke luar wilayah kecamatan"
        }
      ],
      "correct": "A",
      "explanation": "Disintermediasi rantai pasok berbasis platform agritech memangkas margin tengkulak, mendongkrak harga di tingkat petani, dan menurunkan harga akhir di konsumen."
    }
  ],
  "formal": [
    {
      "id": 2601,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Keberadaan Agen Laku Pandai (seperti Agen BRILink, Agen BNI 46, Agen Mandiri) di pelosok desa OKU Timur membawa transformasi besar dalam inklusi keuangan masyarakat karena...",
      "options": [
        {
          "key": "A",
          "text": "Mendekatkan layanan transaksi perbankan resmi tanpa kantor fisik, sehingga petani di pelosok desa tidak perlu menempuh perjalanan jauh berjam-jam ke ibu kota kecamatan"
        },
        {
          "key": "B",
          "text": "Mewajibkan seluruh petani menutup rekening bank dan kembali menyimpan uang di bawah kasur"
        },
        {
          "key": "C",
          "text": "Melarang warga desa melakukan transaksi pengiriman uang ke luar daerah"
        },
        {
          "key": "D",
          "text": "Mengambil alih seluruh uang tabungan nasabah menjadi milik pribadi agen"
        },
        {
          "key": "E",
          "text": "Hanya melayani transaksi pinjaman bernilai ratusan miliar rupiah"
        }
      ],
      "correct": "A",
      "explanation": "Branchless banking Agen Laku Pandai meruntuhkan hambatan geografis dan psikologis masyarakat desa terhadap akses layanan jasa keuangan formal."
    },
    {
      "id": 2602,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan teknologi utama yang diamati di meja loket Agen BRILink perdesaan adalah mesin EDC (Electronic Data Capture). Fungsi pokok mesin EDC tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Membaca data chip kartu ATM debit/kredit, memproses otorisasi transaksi keuangan secara elektronik real-time, dan mencetak struk bukti pembayaran"
        },
        {
          "key": "B",
          "text": "Menimbang bobot gabah panen petani yang dibawa ke loket agen"
        },
        {
          "key": "C",
          "text": "Memindai sidik jari seluruh warga desa yang melintas di jalan raya"
        },
        {
          "key": "D",
          "text": "Mendinginkan suhu ruangan loket kasir saat udara terasa panas"
        },
        {
          "key": "E",
          "text": "Menghancurkan kartu ATM yang dimasukkan ke dalam slot mesin"
        }
      ],
      "correct": "A",
      "explanation": "Terminal EDC terhubung ke server perbankan melalui SIM card seluler (GPRS/4G) untuk memproses kliring transaksi debet/kredit secara aman."
    },
    {
      "id": 2603,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Mesin EDC agen dilengkapi dengan printer mini yang menggunakan kertas khusus tanpa tinta (kertas thermal). Prinsip kerja pencetakan pada kertas thermal adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kepala pemanas mikro (thermal print head) memanaskan titik-titik lapisan zat kimia peka panas pada kertas hingga berubah warna menjadi hitam pekat"
        },
        {
          "key": "B",
          "text": "Menyemprotkan tinta cair berwarna menggunakan jarum suntik mikro"
        },
        {
          "key": "C",
          "text": "Pita karbon hitam yang diketik menggunakan palu jarum mekanik"
        },
        {
          "key": "D",
          "text": "Sinar laser berdaya tinggi yang membakar kertas hingga berlubang"
        },
        {
          "key": "E",
          "text": "Menempelkan stiker huruf satu per satu secara otomatis"
        }
      ],
      "correct": "A",
      "explanation": "Termoreaksi kimia pada lapisan leuco dye kertas thermal menghasilkan cetakan teks struk transaksi yang cepat tanpa memerlukan cartridge pita/tinta."
    },
    {
      "id": 2604,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Selain mesin EDC, pengelola agen keuangan mikro juga mengoperasikan aplikasi mobile banking keagenan di smartphone. Pemanfaatan ganda ini bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Sebagai alternatif cadangan transaksi jika mesin EDC mengalami gangguan sinyal, serta melayani pembayaran tagihan digital yang lebih lengkap"
        },
        {
          "key": "B",
          "text": "Bermain game online bersama nasabah yang sedang mengantre di loket"
        },
        {
          "key": "C",
          "text": "Merekam wajah nasabah secara diam-diam tanpa izin"
        },
        {
          "key": "D",
          "text": "Menghapus saldo rekening nasabah tanpa meninggalkan jejak mutasi"
        },
        {
          "key": "E",
          "text": "Membuat smartphone nasabah mati secara otomatis saat masuk loket"
        }
      ],
      "correct": "A",
      "explanation": "Aplikasi keagenan berbasis smartphone (mobile apps) menjamin kelangsungan bisnis (business continuity) saat hardware EDC terkendala teknis."
    },
    {
      "id": 2605,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Jenis layanan perbankan yang paling sering dilakukan oleh petani padi dan sawit di loket Agen BRILink OKU Timur adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tarik tunai hasil transferan penjualan panen, transfer uang biaya kuliah anak ke luar kota, dan pembayaran angsuran kendaraan/kredit"
        },
        {
          "key": "B",
          "text": "Membeli mata uang kripto dan saham perusahaan tambang luar negeri"
        },
        {
          "key": "C",
          "text": "Menyewa brankas bawah tanah untuk menyimpan batangan perak"
        },
        {
          "key": "D",
          "text": "Membuat paspor perjalanan keliling dunia antarbenua"
        },
        {
          "key": "E",
          "text": "Menukar uang rupiah dengan koin emas kuno kerajaan Sriwijaya"
        }
      ],
      "correct": "A",
      "explanation": "Cash-in, cash-out, remitansi keluarga anak rantau/kuliah, dan installment payment adalah transaksi primer likuiditas harian masyarakat agraris."
    },
    {
      "id": 2606,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Saat musim panen raya padi di Belitang, perputaran uang di loket agen keuangan mikro melonjak sangat tajam. Fenomena likuiditas yang dihadapi pengelola agen adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kebutuhan penyediaan uang tunai fisik yang meningkat berlipat-lipat karena petani dan buruh panen berbondong-bondong mencairkan uang hasil upah panen"
        },
        {
          "key": "B",
          "text": "Seluruh warga desa berhenti menggunakan uang dan kembali ke sistem barter batu kali"
        },
        {
          "key": "C",
          "text": "Kios agen harus ditutup selama 3 bulan karena tidak ada nasabah yang datang"
        },
        {
          "key": "D",
          "text": "Bank induk melarang peredaran uang kertas di seluruh wilayah OKU Timur"
        },
        {
          "key": "E",
          "text": "Nilai mata uang rupiah turun menjadi nol persen di tingkat pedesaan"
        }
      ],
      "correct": "A",
      "explanation": "Seasonal cash-out surge: likuiditas kas fisik menjadi komoditas krusial saat panen raya karena pembeli gabah mentransfer dana ke rekening petani/buruh."
    },
    {
      "id": 2607,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Manajemen permodalan kas pada usaha agen perbankan menuntut keseimbangan antara dua pos modal harian, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Ketersediaan saldo deposit di rekening penampung bank (modal digital) dan ketersediaan uang tunai fisik di laci brankas kasir"
        },
        {
          "key": "B",
          "text": "Ketersediaan beras di dapur rumah dan ketersediaan bensin di tangki motor"
        },
        {
          "key": "C",
          "text": "Jumlah pakaian dinas di lemari dan jumlah sepatu di rak depan rumah"
        },
        {
          "key": "D",
          "text": "Luas halaman parkir mobil dan tinggi pagar besi pembatas jalan"
        },
        {
          "key": "E",
          "text": "Jumlah piala penghargaan di dinding dan jumlah jam dinding di ruangan"
        }
      ],
      "correct": "A",
      "explanation": "Dual-liquidity balancing: saldo rekening bank menjamin keberhasilan transaksi tarik tunai/transfer, sementara uang kas fisik melayani penarikan riil nasabah."
    },
    {
      "id": 2608,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam aspek pencegahan risiko operasional (mitigasi fraud), pengelola agen keuangan mikro di Belitang menerapkan prosedur pemeriksaan keaslian uang tunai menggunakan...",
      "options": [
        {
          "key": "A",
          "text": "Lampu detektor ultraviolet (UV) untuk melihat pendaran benang pengaman dan sensasi rabaan cetak timbul (intaglio) pada angka nominal"
        },
        {
          "key": "B",
          "text": "Mencelupkan uang ke dalam minyak tanah untuk menguji ketahanan kertas"
        },
        {
          "key": "C",
          "text": "Menjemur uang di bawah terik matahari hingga berubah warna"
        },
        {
          "key": "D",
          "text": "Menggunakan jasa peramal tradisional untuk membaca aura uang"
        },
        {
          "key": "E",
          "text": "Menggosokkan uang ke aspal jalan raya hingga menipis"
        }
      ],
      "correct": "A",
      "explanation": "Pemeriksaan fitur keamanan uang rupiah (watermark, security thread UV, intaglio print) melindungi agen dari risiko kerugian menerima uang palsu."
    },
    {
      "id": 2609,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Standar Prosedur Operasional (SOP) keamanan yang wajib ditegakkan agen saat nasabah melakukan transaksi gesek kartu ATM adalah...",
      "options": [
        {
          "key": "A",
          "text": "Nasabah wajib mengetikkan sendiri 6 digit nomor PIN rahasia pada keypad mesin EDC dengan tangan ditutup dan agen tidak boleh melihat"
        },
        {
          "key": "B",
          "text": "Nasabah wajib memberitahukan nomor PIN kepada seluruh orang di antrean"
        },
        {
          "key": "C",
          "text": "Agen mencatat nomor PIN nasabah pada buku dinding yang terbuka"
        },
        {
          "key": "D",
          "text": "Nomor PIN diganti dengan nomor kartu keluarga nasabah"
        },
        {
          "key": "E",
          "text": "Mesin EDC diletakkan di tempat gelap tanpa penerangan lampu"
        }
      ],
      "correct": "A",
      "explanation": "Kerahasiaan Personal Identification Number (PIN) adalah tanggung jawab keamanan nasabah; agen dilarang keras menanyakan atau mengetikkan PIN nasabah."
    },
    {
      "id": 2610,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam lembar observasi infrastruktur keamanan fisik loket agen keuangan mikro, fasilitas pengamanan minimal yang dipasang pengelola adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kamera CCTV pengawas 24 jam yang menyorot area kasir dan parkir, brankas besi terkunci ganda, serta sekat kaca loket"
        },
        {
          "key": "B",
          "text": "Pagar kawat berduri dialiri listrik tegangan tinggi pemati manusia"
        },
        {
          "key": "C",
          "text": "Parit air buatan yang dihuni oleh buaya rawa di depan pintu masuk"
        },
        {
          "key": "D",
          "text": "Tirai kain transparan tipis tanpa adanya pintu kunci"
        },
        {
          "key": "E",
          "text": "Tembok beton tanpa pintu masuk bagi para pelanggan"
        }
      ],
      "correct": "A",
      "explanation": "CCTV surveillance, physical cash safe (brankas), dan barrier fisik meminimalkan risiko kriminalitas perampokan di lokasi loket ritel perdesaan."
    },
    {
      "id": 2611,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Struktur pendapatan yang diperoleh pemilik agen laku pandai dari setiap transaksi resmi yang berhasil diatur dalam bentuk...",
      "options": [
        {
          "key": "A",
          "text": "Komisi biaya jasa (fee based income) resmi per transaksi yang dibagi secara sistem oleh bank induk dan biaya administrasi wajar yang disepakati nasabah"
        },
        {
          "key": "B",
          "text": "Gaji tetap bulanan sebesar seratus juta rupiah dari presiden"
        },
        {
          "key": "C",
          "text": "Pemberian tanah sawah seluas satu hektar setiap melayani 10 nasabah"
        },
        {
          "key": "D",
          "text": "Mengambil seluruh uang kembalian belanja milik nasabah"
        },
        {
          "key": "E",
          "text": "Memotong saldo tabungan nasabah sebesar lima puluh persen per hari"
        }
      ],
      "correct": "A",
      "explanation": "Model bisnis keagenan perbankan bertumpu pada fee-sharing per volume transaksi sukses (volume-driven revenue model)."
    },
    {
      "id": 2612,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Selain transaksi perbankan dasar, loket agen keuangan mikro di desa juga melayani pembayaran tagihan rutin masyarakat (Payment Point Online Bank / PPOB), seperti...",
      "options": [
        {
          "key": "A",
          "text": "Token listrik PLN prabayar, tagihan air PDAM, iuran BPJS Kesehatan, pulsa kuota internet, dan angsuran leasing sepeda motor"
        },
        {
          "key": "B",
          "text": "Pajak impor kapal selam antarnegara"
        },
        {
          "key": "C",
          "text": "Sewa satelit ruang angkasa internasional"
        },
        {
          "key": "D",
          "text": "Iuran keanggotaan klub sepak bola luar negeri"
        },
        {
          "key": "E",
          "text": "Pembelian tiket roket perjalanan ke planet Mars"
        }
      ],
      "correct": "A",
      "explanation": "Layanan PPOB terpadu menjadikan loket agen sebagai one-stop financial hub bagi segala kebutuhan pembayaran tagihan utilitas rumah tangga desa."
    },
    {
      "id": 2613,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Peran Koperasi Simpan Pinjam (KSP) atau Koperasi Jasa Keuangan Syariah di pedesaan OKU Timur bagi para petani kecil adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menyediakan pinjaman permodalan musiman untuk membeli pupuk dan benih dengan prosedur kekeluargaan tanpa syarat jaminan sertifikat yang rumit"
        },
        {
          "key": "B",
          "text": "Menyita seluruh perhiasan emas milik warga desa secara paksa"
        },
        {
          "key": "C",
          "text": "Melarang anggotanya menabung uang di lembaga keuangan"
        },
        {
          "key": "D",
          "text": "Mewajibkan anggota membayar bunga pinjaman harian sebesar seratus persen"
        },
        {
          "key": "E",
          "text": "Mengubah nama anggota menjadi nama pengurus koperasi"
        }
      ],
      "correct": "A",
      "explanation": "Koperasi simpan pinjam perdesaan menjembatani jurang unbankable bagi petani gurem yang tidak memiliki collateral agunan formal perbankan."
    },
    {
      "id": 2614,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Landasan hukum utama perkoperasian di Indonesia yang menjadi pedoman operasional seluruh KSP di OKU Timur adalah...",
      "options": [
        {
          "key": "A",
          "text": "Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian"
        },
        {
          "key": "B",
          "text": "Undang-Undang Lalu Lintas dan Angkutan Jalan Raya"
        },
        {
          "key": "C",
          "text": "Peraturan Menteri Pendidikan tentang Kurikulum Sekolah"
        },
        {
          "key": "D",
          "text": "Kitab Undang-Undang Hukum Pidana Masa Kolonial Belanda"
        },
        {
          "key": "E",
          "text": "Dekrit Presiden tentang Pembangunan Industri Berat"
        }
      ],
      "correct": "A",
      "explanation": "UU No. 25/1992 menjadi payung hukum statutori legalitas badan usaha koperasi berasaskan kekeluargaan dan demokrasi ekonomi dari, oleh, dan untuk anggota."
    },
    {
      "id": 2615,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Forum kekuasaan tertinggi di dalam tata kelola Koperasi Simpan Pinjam di mana pertanggungjawaban pengurus dievaluasi dan Sisa Hasil Usaha (SHU) dibagikan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Rapat Anggota Tahunan (RAT)"
        },
        {
          "key": "B",
          "text": "Rapat rahasia direksi di hotel mewah luar kota"
        },
        {
          "key": "C",
          "text": "Sidang pengadilan negeri tingkat banding"
        },
        {
          "key": "D",
          "text": "Musyawarah perwakilan camat se-kabupaten"
        },
        {
          "key": "E",
          "text": "Pesta perayaan ulang tahun ketua koperasi"
        }
      ],
      "correct": "A",
      "explanation": "RAT adalah perwujudan kedaulatan tertinggi anggota koperasi untuk menilai kinerja neraca keuangan dan menetapkan alokasi pembagian SHU secara demokratis."
    },
    {
      "id": 2616,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Sumber permodalan internal koperasi simpan pinjam yang dibayarkan sekali saat pertama kali mendaftar menjadi anggota dan tidak dapat ditarik selama masih menjadi anggota disebut...",
      "options": [
        {
          "key": "A",
          "text": "Simpanan Pokok"
        },
        {
          "key": "B",
          "text": "Simpanan Wajib"
        },
        {
          "key": "C",
          "text": "Simpanan Sukarela"
        },
        {
          "key": "D",
          "text": "Dana Cadangan"
        },
        {
          "key": "E",
          "text": "Hibah Pemerintah"
        }
      ],
      "correct": "A",
      "explanation": "Simpanan pokok adalah modal ekuitas dasar anggota koperasi yang disetor satu kali pada awal keanggotaan dengan besaran yang sama untuk tiap anggota."
    },
    {
      "id": 2617,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Badan Usaha Milik Desa (BUMDes) di beberapa desa maju di OKU Timur mengembangkan unit usaha jasa keuangan dan penyewaan alsintan. Peran strategis BUMDes bagi pendapatan desa adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mendayagunakan potensi aset desa, menyumbang Pendapatan Asli Desa (PADes), dan membuka lapangan kerja bagi pemuda desa setempat"
        },
        {
          "key": "B",
          "text": "Menghabiskan seluruh dana desa tanpa memberikan laporan pertanggungjawaban"
        },
        {
          "key": "C",
          "text": "Mengambil alih seluruh tanah pekarangan milik warga secara sepihak"
        },
        {
          "key": "D",
          "text": "Mewajibkan warga desa membayar pajak tanah dua kali lipat"
        },
        {
          "key": "E",
          "text": "Melarang warga desa mendirikan usaha warung makan mandiri"
        }
      ],
      "correct": "A",
      "explanation": "BUMDes berfungsi ganda sebagai lembaga sosial (social institution) yang melayani kebutuhan warga dan lembaga komersial (commercial institution) penyumbang PADes."
    },
    {
      "id": 2618,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Status hukum pendirian BUMDes di era saat ini semakin kuat sebagai badan hukum resmi yang diatur dalam...",
      "options": [
        {
          "key": "A",
          "text": "Peraturan Pemerintah Nomor 11 Tahun 2021 tentang Badan Usaha Milik Desa"
        },
        {
          "key": "B",
          "text": "Surat edaran kepala dusun tentang jadwal posyandu balita"
        },
        {
          "key": "C",
          "text": "Undang-Undang Kepolisian Negara Republik Indonesia"
        },
        {
          "key": "D",
          "text": "Peraturan Menteri Perhubungan tentang Jalur Kereta Api"
        },
        {
          "key": "E",
          "text": "Keputusan Mahkamah Konstitusi tentang Pemilihan Umum"
        }
      ],
      "correct": "A",
      "explanation": "PP No. 11/2021 menegaskan BUMDes sebagai entitas badan hukum mandiri yang berhak mendaftarkan nama badan usaha di Kemenkumham dan menjalin kontrak bisnis resmi."
    },
    {
      "id": 2619,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Sebagai mitra perbankan formal, agen keuangan mikro sering menjadi rujukan referral bagi penyaluran Kredit Usaha Rakyat (KUR) sektor pertanian. Keunggulan fasilitas KUR pemerintah bagi petani adalah...",
      "options": [
        {
          "key": "A",
          "text": "Suku bunga pinjaman yang sangat rendah (disubsidi pemerintah sebesar 6% per tahun) dengan pola angsuran musiman yang disesuaikan jadwal panen padi"
        },
        {
          "key": "B",
          "text": "Petani tidak perlu mengembalikan uang pinjaman yang telah dicairkan"
        },
        {
          "key": "C",
          "text": "Pinjaman KUR hanya diberikan dalam bentuk kupon undian berhadiah"
        },
        {
          "key": "D",
          "text": "Bunga pinjaman bertambah seratus persen setiap minggunya"
        },
        {
          "key": "E",
          "text": "Petani diwajibkan menyerahkan seluruh hasil panen kepada pegawai bank"
        }
      ],
      "correct": "A",
      "explanation": "KUR Mikro Pertanian berbunga rendah 6% p.a. dengan skema grace period dan pembayaran yarnen (bayar setelah panen) melindungi petani dari rentenir."
    },
    {
      "id": 2620,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Sebelum menyetujui pembiayaan modal usaha bagi petani, petugas lembaga keuangan mikro melakukan verifikasi lapangan (analisis 5C). Aspek 'Capacity' (kemampuan) dinilai melalui...",
      "options": [
        {
          "key": "A",
          "text": "Luas lahan sawah/kebun yang produktif, estimasi hasil panen riil, dan kalkulasi arus kas untuk memastikan petani mampu mengangsur cicilan"
        },
        {
          "key": "B",
          "text": "Jumlah teman yang dimiliki petani di akun media sosialnya"
        },
        {
          "key": "C",
          "text": "Merek pakaian yang dikenakan petani saat berkunjung ke loket"
        },
        {
          "key": "D",
          "text": "Koleksi burung berkicau yang digantung di teras rumah petani"
        },
        {
          "key": "E",
          "text": "Warna cat dinding ruang tamu rumah tempat tinggal petani"
        }
      ],
      "correct": "A",
      "explanation": "Prinsip 5C (Capacity) mengukur kemampuan pembayaran (repayment ability) debitur berdasarkan rasio arus kas operasi bersih terhadap beban cicilan pokok bunga."
    },
    {
      "id": 2621,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Agen laku pandai di Belitang turut berperan dalam gerakan literasi menabung sejak dini. Layanan pembukaan rekening tabungan bersyarat mudah yang ditawarkan bagi pelajar dan warga desa adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tabungan Simpedes atau TabunganKu dengan setoran awal ringan, bebas biaya administrasi bulanan, dan tanpa saldo mengendap yang besar"
        },
        {
          "key": "B",
          "text": "Rekening giro internasional berbunga dollar Amerika"
        },
        {
          "key": "C",
          "text": "Tabungan khusus yang mewajibkan setoran minimal satu miliar rupiah"
        },
        {
          "key": "D",
          "text": "Buku tabungan yang wajib disimpan di kantor kepolisian resor"
        },
        {
          "key": "E",
          "text": "Tabungan yang dananya tidak boleh ditarik selama seratus tahun"
        }
      ],
      "correct": "A",
      "explanation": "Inklusi keuangan TabunganKu/Simpedes U-Save memfasilitasi kebiasaan menabung masyarakat lapisan unbanked dengan persyaratan verifikasi NIK sederhana."
    },
    {
      "id": 2622,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Jika saat transaksi gesek kartu ATM terjadi kendala status 'transaksi menggantung' (pending / connection timeout) tetapi saldo nasabah terpotong, SOP yang wajib dilakukan agen adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mencetak struk transaksi terakhir (reprint), melakukan pengecekan menu mutasi saldo rekening agen, dan menenangkan nasabah dengan janji penyelesaian resmi bank induk"
        },
        {
          "key": "B",
          "text": "Memarahi nasabah dan menyuruhnya segera pulang meninggalkan loket"
        },
        {
          "key": "C",
          "text": "Membanting mesin EDC ke lantai hingga hancur berkeping-keping"
        },
        {
          "key": "D",
          "text": "Menghapus rekaman kamera CCTV di dalam ruangan loket"
        },
        {
          "key": "E",
          "text": "Menyita kartu ATM nasabah dan memotongnya menjadi dua bagian"
        }
      ],
      "correct": "A",
      "explanation": "SOP dispute transaction: pencetakan mini audit summary/reprint dan rekonsiliasi e-journal log membuktikan status reversal otomatis pada sistem host bank."
    },
    {
      "id": 2623,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Nilai budaya keramahan dan keakraban lokal menjadi kunci sukses hubungan usaha agen keuangan mikro dengan nasabah desa di OKU Timur. Hal ini tercermin dari sikap narasumber pengelola agen, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Sabar memandu petani lanjut usia yang belum paham teknologi, menggunakan tutur bahasa daerah yang santun, dan melayani dengan senyum ramah"
        },
        {
          "key": "B",
          "text": "Menolak melayani warga desa yang datang mengenakan sandal jepit kotor"
        },
        {
          "key": "C",
          "text": "Berbicara dengan nada membentak dan mengejek kebodohan nasabah"
        },
        {
          "key": "D",
          "text": "Hanya melayani pembeli yang membawa mobil berharga mahal"
        },
        {
          "key": "E",
          "text": "Memasang papan larangan berbicara di depan meja kasir loket"
        }
      ],
      "correct": "A",
      "explanation": "Pendekatan interpersonal human-touch dan bahasa ibu lokal (Jawa/Komering) mengikis rasa canggung/intimidasi warga desa terhadap dunia perbankan modern."
    },
    {
      "id": 2624,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Kepatuhan terhadap Undang-Undang Perlindungan Data Pribadi (UU PDP) diterapkan pengelola agen keuangan mikro dengan cara...",
      "options": [
        {
          "key": "A",
          "text": "Tidak pernah mencatat atau menyebarkan nomor kartu ATM, nomor CVV, dan nomor telepon nasabah kepada pihak mana pun untuk tujuan promosi liar"
        },
        {
          "key": "B",
          "text": "Memfotokopi kartu ATM nasabah dan menempelkannya di dinding jalan raya"
        },
        {
          "key": "C",
          "text": "Menjual daftar nomor telepon petani kepada sindikat penipuan daring"
        },
        {
          "key": "D",
          "text": "Memaksa nasabah memberitahukan seluruh rahasia keluarganya"
        },
        {
          "key": "E",
          "text": "Mengharuskan nasabah menyerahkan kata sandi email pribadi"
        }
      ],
      "correct": "A",
      "explanation": "Kerahasiaan data transaksi finansial (PCI-DSS standards) adalah kewajiban etis dan yuridis agen perbankan untuk melindungi privasi konsumen dari phising/skimming."
    },
    {
      "id": 2625,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C4",
      "question": "Dampak sosial ekonomi paling positif dari keberadaan Agen BRILink dan KSP resmi di pedesaan OKU Timur terhadap kesejahteraan petani adalah...",
      "options": [
        {
          "key": "A",
          "text": "Membebaskan petani dari jeratan praktik rentenir liar (bank keliling / bank emok) yang mengenakan bunga pinjaman mencekik leher"
        },
        {
          "key": "B",
          "text": "Membuat seluruh petani tidak perlu lagi bekerja membajak sawah"
        },
        {
          "key": "C",
          "text": "Mewajibkan seluruh petani berhutang setiap hari kepada bank"
        },
        {
          "key": "D",
          "text": "Menutup seluruh toko sembako yang beroperasi di wilayah desa"
        },
        {
          "key": "E",
          "text": "Menghapus mata pencaharian bertani menjadi pedagang uang asing"
        }
      ],
      "correct": "A",
      "explanation": "Penyediaan alternatif pembiayaan mikro yang berkeadilan memotong ketergantungan jerat lintah darat (loan shark) yang kerap menyita lahan garapan petani."
    },
    {
      "id": 2626,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Untuk mengantisipasi pemadaman listrik PLN yang kadang terjadi di perdesaan, pengelola agen keuangan mikro melengkapi loketnya dengan infrastruktur daya cadangan, berupa...",
      "options": [
        {
          "key": "A",
          "text": "Uninterruptible Power Supply (UPS) atau baterai powerbank berkapasitas besar dan modem Wi-Fi cadangan agar transaksi mesin EDC tidak terputus"
        },
        {
          "key": "B",
          "text": "Lampu lilin minyak tanah yang diletakkan di atas mesin EDC"
        },
        {
          "key": "C",
          "text": "Kipas angin bambu yang digerakkan menggunakan tali tambang"
        },
        {
          "key": "D",
          "text": "Kompor minyak tanah untuk memanaskan sirkuit mesin"
        },
        {
          "key": "E",
          "text": "Menutup loket dan membatalkan seluruh transaksi yang sedang antre"
        }
      ],
      "correct": "A",
      "explanation": "Redundansi daya UPS dan dual-SIM router internet menjaga Service Level Agreement (SLA) operasional keagenan tetap aktif melayani transaksi warga saat blackout."
    },
    {
      "id": 2627,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Di akhir jam operasional setiap hari, pengelola agen melakukan rekonsiliasi kas (settlement harian). Prosedur rekonsiliasi kas ini bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Mencocokkan jumlah uang fisik riil di laci kasir dengan selisih mutasi debit-kredit pada laporan transaksi mesin EDC agar pembukuan seimbang"
        },
        {
          "key": "B",
          "text": "Membagi-bagikan uang kasir kepada warga yang sedang lewat di jalan"
        },
        {
          "key": "C",
          "text": "Membakar seluruh struk kertas transaksi yang keluar hari itu"
        },
        {
          "key": "D",
          "text": "Mengganti seluruh uang kertas di kasir dengan uang logam kuno"
        },
        {
          "key": "E",
          "text": "Menghapus catatan utang pelanggan tanpa seizin pemilik agen"
        }
      ],
      "correct": "A",
      "explanation": "Daily settlement closing mencocokkan e-journal perbankan dengan cash counting fisik untuk mendeteksi selisih lebih (overage) atau selisih kurang (shortage) kas."
    },
    {
      "id": 2628,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Keunggulan waktu jam operasional agen perbankan laku pandai di pedesaan dibanding kantor cabang bank formal di kota adalah...",
      "options": [
        {
          "key": "A",
          "text": "Jam operasional yang sangat fleksibel, buka dari pagi hingga malam hari serta tetap melayani di hari Sabtu-Minggu dan hari libur nasional"
        },
        {
          "key": "B",
          "text": "Agen hanya buka selama 15 menit setiap hari Senin pagi"
        },
        {
          "key": "C",
          "text": "Agen tidak pernah melayani transaksi di luar jam kantor dinas"
        },
        {
          "key": "D",
          "text": "Agen hanya melayani transaksi saat turun hujan lebat saja"
        },
        {
          "key": "E",
          "text": "Nasabah wajib mengantre selama 7 hari berturut-turut di loket"
        }
      ],
      "correct": "A",
      "explanation": "Aksesibilitas 7 hari seminggu (extended hours) selaras dengan pola aktivitas petani yang baru sempat bertransaksi keuangan sepulang dari sawah/kebun sore hari."
    },
    {
      "id": 2629,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Dalam pengelolaan uang tunai, jika agen menerima lembaran uang rupiah yang sudah sobek, berlubang, atau lusuh parah (Uang Tidak Layak Edar / UTLE), tindakan yang tepat adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memisahkan uang lusuh tersebut dari kas edar harian dan menyetorkannya kembali ke kantor cabang bank induk untuk diganti dengan uang layak edar"
        },
        {
          "key": "B",
          "text": "Membuang uang lusuh ke tempat sampah di depan loket"
        },
        {
          "key": "C",
          "text": "Membakar uang lusuh menggunakan korek api gas"
        },
        {
          "key": "D",
          "text": "Menyambung uang sobek menggunakan lem semen bangunan"
        },
        {
          "key": "E",
          "text": "Memaksa nasabah lain untuk menerima uang yang sudah rusak parah"
        }
      ],
      "correct": "A",
      "explanation": "Clean Money Policy Bank Indonesia: agen berkewajiban menyortir UTLE (fit/unfit sortation) untuk disetorkan kembali ke bank umum guna dimusnahkan resmi oleh BI."
    },
    {
      "id": 2630,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Peran agen laku pandai dalam mendukung program pemerintah berupa penyaluran Bantuan Pangan Non Tunai (BPNT) atau Program Keluarga Harapan (PKH) adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menjadi e-Warong resmi yang melayani pencairan bantuan sosial non-tunai kartu KKS bagi Keluarga Penerima Manfaat (KPM) secara transparan"
        },
        {
          "key": "B",
          "text": "Mengambil potongan uang bantuan bansos sebesar lima puluh persen"
        },
        {
          "key": "C",
          "text": "Mengganti bantuan sembako dengan kupon permainan anak-anak"
        },
        {
          "key": "D",
          "text": "Melarang warga miskin mencairkan bantuan sosial di loket desa"
        },
        {
          "key": "E",
          "text": "Menolak perintah resmi dari kementerian sosial republik indonesia"
        }
      ],
      "correct": "A",
      "explanation": "Penyaluran bansos via EDC kartu KKS menjamin prinsip 6T (Tepat Sasaran, Tepat Jumlah, Tepat Harga, Tepat Waktu, Tepat Kualitas, Tepat Administrasi) tanpa pungli."
    },
    {
      "id": 2631,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Edukasi pembayaran digital nontunai yang dipelopori agen di pasar dan warung kopi pedesaan OKU Timur saat ini adalah sosialisasi penggunaan QRIS. Manfaat utama bagi pedagang warung adalah...",
      "options": [
        {
          "key": "A",
          "text": "Uang pembayaran pembeli langsung masuk secara aman ke rekening tanpa risiko kemalingan atau menerima uang palsu di laci kasir"
        },
        {
          "key": "B",
          "text": "Membuat seluruh makanan di warung kopi menjadi dingin seketika"
        },
        {
          "key": "C",
          "text": "Mengharuskan pedagang membagi-bagikan kopi gratis setiap hari"
        },
        {
          "key": "D",
          "text": "Menghapus kewajiban pembeli membayar tagihan minuman"
        },
        {
          "key": "E",
          "text": "Mengubah warung kopi menjadi stasiun pengisian bahan bakar umum"
        }
      ],
      "correct": "A",
      "explanation": "Merchant QRIS desa menikmati rekonsiliasi kas digital tanpa repot menghitung uang fisik, higienis, dan membangun riwayat transaksi (credit profiling) untuk KUR."
    },
    {
      "id": 2632,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Dalam lembar observasi aspek K3 kenyamanan ruang pelayanan loket agen keuangan mikro, fasilitas pendukung kenyamanan nasabah meliputi...",
      "options": [
        {
          "key": "A",
          "text": "Pencahayaan ruangan yang terang untuk ketelitian memeriksa uang, kursi antrean tunggu yang bersih, kipas angin pendingin, dan air minum kemasan"
        },
        {
          "key": "B",
          "text": "Lantai berlubang lumpur yang licin dan gelap gulita"
        },
        {
          "key": "C",
          "text": "Asap knalpot motor yang diarahkan langsung ke wajah nasabah antre"
        },
        {
          "key": "D",
          "text": "Lagu bising suara sirene perang berputar tanpa henti"
        },
        {
          "key": "E",
          "text": "Kandang ayam jantan yang diletakkan di atas meja mesin EDC"
        }
      ],
      "correct": "A",
      "explanation": "Ergonomi dan kenyamanan fisik loket (pencahayaan lux memadai, ventilasi sejuk, tempat duduk higienis) menunjang fokus kerja kasir dan kepuasan nasabah."
    },
    {
      "id": 2633,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Dukungan agen keuangan mikro terhadap kegiatan sosial kemasyarakatan di desa tercermin dari kemudahan yang diberikan, seperti...",
      "options": [
        {
          "key": "A",
          "text": "Melayani pembayaran iuran kas kematian rukun tetangga, donasi masjid desa, dan sedekah zakat fitrah tanpa membebankan biaya jasa tambahan"
        },
        {
          "key": "B",
          "text": "Melarang warga desa bergotong royong membersihkan makam leluhur"
        },
        {
          "key": "C",
          "text": "Menyita seluruh uang kas masjid desa untuk keperluan pribadi agen"
        },
        {
          "key": "D",
          "text": "Mewajibkan panitia pembangunan masjid membayar sewa loket bulanan"
        },
        {
          "key": "E",
          "text": "Menutup loket saat ada warga desa yang sedang tertimpa musibah"
        }
      ],
      "correct": "A",
      "explanation": "Corporate Social Responsibility (CSR) informal agen laku pandai memperkuat ikatan emosional dan reputasi moral di tengah komunitas paguyuban warga desa."
    },
    {
      "id": 2634,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Integritas moral dan kejujuran tinggi yang diamati pada narasumber pengelola agen keuangan mikro di Belitang ditunjukkan melalui tindakan nyata...",
      "options": [
        {
          "key": "A",
          "text": "Segera mengembalikan kelebihan uang tunai milik nasabah yang tertinggal di loket atau mentransfer kembali jika terjadi kelebihan setor"
        },
        {
          "key": "B",
          "text": "Menyembunyikan kelebihan uang nasabah untuk dibelanjakan pakaian baru"
        },
        {
          "key": "C",
          "text": "Menyalahkan nasabah atas kesalahan perhitungan yang dilakukan agen"
        },
        {
          "key": "D",
          "text": "Mematikan telepon saat dihubungi oleh nasabah yang uangnya tertinggal"
        },
        {
          "key": "E",
          "text": "Mengakui uang orang lain sebagai milik nenek moyang sendiri"
        }
      ],
      "correct": "A",
      "explanation": "Prinsip kejujuran dan amanah fidusia adalah modal reputasi tak ternilai (invaluable trust capital) yang menjadi pilar kelangsungan bisnis jasa keuangan."
    },
    {
      "id": 2635,
      "day": 2,
      "sector": "formal",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Visi transformasi inklusi keuangan di pedesaan Kabupaten OKU Timur di masa mendatang adalah terwujudnya ekosistem desa digital terpadu, yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Seluruh rantai agribisnis petani (pembelian pupuk, penjualan gabah, tabungan, asuransi tani, hingga pembiayaan KUR) terhubung secara nontunai digital yang transparan dan aman"
        },
        {
          "key": "B",
          "text": "Menutup seluruh jaringan internet di desa dan melarang kepemilikan smartphone"
        },
        {
          "key": "C",
          "text": "Mewajibkan seluruh petani menyimpan uang di dalam kendi tanah liat"
        },
        {
          "key": "D",
          "text": "Menghentikan operasional seluruh perbankan nasional di wilayah provinsi"
        },
        {
          "key": "E",
          "text": "Menolak segala bentuk inovasi teknologi dalam kehidupan bermasyarakat"
        }
      ],
      "correct": "A",
      "explanation": "Integrated rural fintech ecosystem mengolaborasikan asuransi tani Jasindo, KUR klaster pangan, dan cashless supply chain untuk kesejahteraan petani berkelanjutan."
    }
  ]
};

  if (typeof window !== 'undefined') {
    window.NFT_DAY2_SECTOR_QUESTIONS = SECTORS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SECTORS;
  }
})();
