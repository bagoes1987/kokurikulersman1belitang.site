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
      "cognitiveLevel": "C2",
      "question": "Di kalangan masyarakat petani dan pedesaan OKU Timur, memelihara sapi mandiri sering disebut sebagai tradisi memelihara 'rojokoyo'. Nilai budaya dan fungsi ekonomi utama dari tradisi rojokoyo ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Ternak diposisikan sebagai aset tabungan hidup keluarga yang bernilai tinggi dan dapat dicairkan sewaktu-waktu untuk biaya pendidikan anak atau modal usaha"
        },
        {
          "key": "B",
          "text": "Ternak wajib disembelih seluruhnya setiap kali musim panen padi tiba"
        },
        {
          "key": "C",
          "text": "Ternak hanya digunakan sebagai hewan aduan dalam pesta rakyat tahunan"
        },
        {
          "key": "D",
          "text": "Ternak dianggap sebagai simbol mistis penolak hujan di wilayah persawahan"
        },
        {
          "key": "E",
          "text": "Ternak dilarang diperjualbelikan kepada sesama warga desa seumur hidup"
        }
      ],
      "correct": "A",
      "explanation": "Istilah Jawa-Komering rojokoyo bermakna 'raja kaya' atau sumber kekayaan riil penyimpan nilai (store of value) yang tahan inflasi bagi keluarga tani."
    },
    {
      "id": 2202,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Berdasarkan lembar observasi sistem pemeliharaan peternakan sapi di OKU Timur, perbedaan mendasar antara sistem intensif (feedlot/kandang penuh) dengan sistem semi-intensif adalah...",
      "options": [
        {
          "key": "A",
          "text": "Sistem intensif memelihara sapi terus-menerus di dalam kandang dengan pakan dan minum diantar penuh oleh peternak, sedangkan semi-intensif menggabungkan kandang malam dengan gembala siang"
        },
        {
          "key": "B",
          "text": "Sistem intensif tidak memberikan pakan rumput sama sekali pada ternak sapi"
        },
        {
          "key": "C",
          "text": "Sistem semi-intensif hanya memelihara sapi liar yang dibiarkan hidup di hutan"
        },
        {
          "key": "D",
          "text": "Sistem intensif khusus diperuntukkan bagi ternak kambing pedaging saja"
        },
        {
          "key": "E",
          "text": "Sistem semi-intensif mewajibkan kandang sapi berada di dalam rumah pemilik"
        }
      ],
      "correct": "A",
      "explanation": "Sistem intensif/cut and carry mengontrol penuh asupan nutrisi pakan di kandang untuk target penggemukan cepat (feedlot)."
    },
    {
      "id": 2203,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Peralatan mekanisasi utama yang diamati di kandang peternakan sapi modern mandiri adalah mesin chopper (mesin perajang rumput/pakan). Fungsi pokok mesin chopper tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mencacah rumput gajah, jerami, dan tebon jagung menjadi potongan kecil (2–5 cm) agar mudah dikunyah, meningkatkan palatabilitas, dan mempermudah proses fermentasi"
        },
        {
          "key": "B",
          "text": "Memisahkan daging sapi dari tulang belulang secara otomatis di dalam kandang"
        },
        {
          "key": "C",
          "text": "Memompa kotoran cair sapi menuju sungai terdekat agar kandang selalu kering"
        },
        {
          "key": "D",
          "text": "Memanaskan suhu ruangan kandang sapi pada saat musim hujan dingin"
        },
        {
          "key": "E",
          "text": "Menghaluskan butiran garam jilat menjadi debu halus konsentrat"
        }
      ],
      "correct": "A",
      "explanation": "Chopping memperkecil ukuran partikel hijauan (2-5 cm), memecah serat kasar, mengurangi sisa pakan terbuang, dan memaksimalkan luas permukaan kontak fermentasi."
    },
    {
      "id": 2204,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Mesin chopper pakan ternak digerakkan oleh motor penggerak bensin atau diesel melalui mekanisme transmisi puli dan v-belt. Prinsip kerja pisau di dalam ruang perajang adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pisau baja berputar dengan kecepatan tinggi memotong batang hijauan yang didorong oleh rol penarik (feeder roll) ke arah landasan pisau (counter blade)"
        },
        {
          "key": "B",
          "text": "Menggunakan tekanan uap panas untuk melunakkan serat rumput secara kimiawi"
        },
        {
          "key": "C",
          "text": "Batu gerinda bundar yang saling bergesekan menumbuk rumput hingga hancur"
        },
        {
          "key": "D",
          "text": "Sinar laser berdaya rendah yang membelah daun rumput secara presisi"
        },
        {
          "key": "E",
          "text": "Kawat baja statis yang ditarik manual menggunakan tuas tangan oleh operator"
        }
      ],
      "correct": "A",
      "explanation": "Rotary blades memotong batang rumput berkecepatan tinggi terhadap stationary anvil/counter blade, menghasilkan cacahan berukuran homogen."
    },
    {
      "id": 2205,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "OKU Timur menghasilkan limbah jerami padi pascapanen yang sangat melimpah. Peternak sapi terampil mengolah jerami tersebut menjadi pakan awetan berkualitas melalui teknik silase/fermentasi dengan tujuan...",
      "options": [
        {
          "key": "A",
          "text": "Memecah dinding sel lignin dan selulosa jerami yang keras sehingga protein kasarnya meningkat dan daya cerna ternak menjadi jauh lebih tinggi"
        },
        {
          "key": "B",
          "text": "Mengubah jerami padi menjadi butiran pelet ikan yang terapung di air"
        },
        {
          "key": "C",
          "text": "Menghilangkan seluruh kandungan serat dari jerami agar sapi tidak cepat kenyang"
        },
        {
          "key": "D",
          "text": "Membuat jerami mengering seketika dalam waktu 5 menit tanpa bantuan udara"
        },
        {
          "key": "E",
          "text": "Mencegah jerami dimakan oleh hama tikus sawah di dalam gudang terbuka"
        }
      ],
      "correct": "A",
      "explanation": "Fermentasi anaerob oleh bakteri asam laktat merenggangkan ikatan lignoselulosa jerami, melunakkan tekstur, dan menaikkan kecernaan (TDN)."
    },
    {
      "id": 2206,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Bahan aditif starter yang dicampurkan peternak saat membuat silase jerami atau tebon jagung di dalam drum/silo anaerobik adalah...",
      "options": [
        {
          "key": "A",
          "text": "Tetes tebu (molase) dan dedak halus bekatul sebagai sumber karbohidrat terlarut bagi bakteri fermentasi"
        },
        {
          "key": "B",
          "text": "Pestisida insektisida cair dosis tinggi untuk membunuh serangga mikro"
        },
        {
          "key": "C",
          "text": "Minyak tanah dan bensin untuk mematikan jamur pembusuk di dalam drum"
        },
        {
          "key": "D",
          "text": "Kapur tohor pekat yang dicampur dengan tatal kayu gergaji"
        },
        {
          "key": "E",
          "text": "Cuka getah asam format murni yang digunakan pada pembekuan karet"
        }
      ],
      "correct": "A",
      "explanation": "Molase menyediakan gula sederhana (WSC/water soluble carbohydrates) sebagai substrat energi mikroba pembentuk asam laktat dalam kondisi anaerob."
    },
    {
      "id": 2207,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Dalam peningkatan mutu genetik sapi potong di OKU Timur, dinas peternakan gencar menerapkan teknologi Inseminasi Buatan (IB) atau 'kawin suntik'. Keuntungan utama IB bagi peternak rakyat adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memperoleh anakan sapi unggul berbobot besar (Simental, Limousin, Brahman) dari pejantan elit tanpa peternak harus memelihara pejantan pemacek mahal"
        },
        {
          "key": "B",
          "text": "Induk sapi dijamin pasti melahirkan anak kembar tiga setiap tahun"
        },
        {
          "key": "C",
          "text": "Induk sapi tidak perlu diberi makan konsentrat selama masa kebuntingan"
        },
        {
          "key": "D",
          "text": "Menghilangkan masa kebuntingan sapi dari 9 bulan menjadi hanya 2 bulan"
        },
        {
          "key": "E",
          "text": "Biaya kawin suntik sepenuhnya gratis tanpa perlu menghubungi petugas mantri"
        }
      ],
      "correct": "A",
      "explanation": "Inseminasi buatan menggunakan straw sperma beku pejantan unggul bersertifikat untuk menghasilkan anakan heterosis silangan berpertumbuhan pesat."
    },
    {
      "id": 2208,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Ketepatan waktu inseminasi buatan sangat ditentukan oleh kejelian peternak mendeteksi tanda birahi induk sapi yang dikenal dengan istilah kearifan lokal '3A', yaitu...",
      "options": [
        {
          "key": "A",
          "text": "Abang (merah), Aboh (bengkak), dan Anget (hangat pada bagian vulva ternak)"
        },
        {
          "key": "B",
          "text": "Agresif, Amuk, dan Anjlok (sapi mengamuk menabrak dinding kandang)"
        },
        {
          "key": "C",
          "text": "Abadi, Aman, dan Akurat (sapi tertidur pulas sepanjang hari)"
        },
        {
          "key": "D",
          "text": "Amanah, Adil, dan Asli (sapi berhenti mengunyah pakan rumput)"
        },
        {
          "key": "E",
          "text": "Aktif, Anggun, dan Anteng (sapi melompat keluar dari pagar pembatas)"
        }
      ],
      "correct": "A",
      "explanation": "Gejala klinis estrus 3A (Abang, Aboh, Anget) disertai keluarnya lendir bening transparan adalah waktu optimal bagi mantri ternak menyuntikkan semen beku."
    },
    {
      "id": 2209,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Desain konstruksi lantai kandang sapi yang memenuhi standar sanitasi dan ergonomis di pedesaan OKU Timur memiliki ciri teknis...",
      "options": [
        {
          "key": "A",
          "text": "Permukaan semen kasar anti-selip dengan kemiringan 2–3 derajat mengarah ke saluran parit pembuangan kotoran di belakang"
        },
        {
          "key": "B",
          "text": "Lantai keramik licin mengkilap tanpa adanya saluran pembuangan air"
        },
        {
          "key": "C",
          "text": "Tanah lumpur becek yang dibiarkan tergenang air kotoran setinggi 30 cm"
        },
        {
          "key": "D",
          "text": "Papan kayu lapuk yang berlubang besar di bawah kaki ternak sapi"
        },
        {
          "key": "E",
          "text": "Lantai aspal jalan raya yang dilapisi pasir pantai halus"
        }
      ],
      "correct": "A",
      "explanation": "Kemiringan 2-3% memperlancar drainase urin dan air cuci kandang ke gutter, sementara tekstur semen kasar mencegah sapi terpeleset (cedera terkilir)."
    },
    {
      "id": 2210,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Model atap kandang sapi yang banyak dijumpai pada peternak maju adalah model 'monitor' (atap bertingkat dengan celah ventilasi di puncak). Keunggulan model atap ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Memperlancar sirkulasi pembuangan gas panas dan gas amonia ke atas sehingga ruangan kandang tetap sejuk dan sapi terhindar dari stres panas"
        },
        {
          "key": "B",
          "text": "Menampung air hujan agar langsung jatuh membasahi punggung sapi"
        },
        {
          "key": "C",
          "text": "Membuat suara petir terdengar lebih keras di dalam kandang"
        },
        {
          "key": "D",
          "text": "Mencegah burung terbang melintasi area sekitar peternakan"
        },
        {
          "key": "E",
          "text": "Mempercepat seng atap berkarat agar menyatu dengan alam perdesaan"
        }
      ],
      "correct": "A",
      "explanation": "Efek cerobong termal pada atap monitor mengalirkan gas amonia dan panas tubuh ternak keluar melalui ventilasi puncak, menjaga iklim mikro kandang."
    },
    {
      "id": 2211,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Tindakan biosekuriti dan sanitasi kandang yang wajib dilakukan peternak sapi untuk mencegah penularan wabah Penyakit Mulut dan Kuku (PMK) meliputi...",
      "options": [
        {
          "key": "A",
          "text": "Penyemprotan desinfektan berkala pada kandang, mencuci kaki sapi dengan larutan klorin/citric acid, dan menaburkan kapur tohor di gerbang masuk"
        },
        {
          "key": "B",
          "text": "Mengundang seluruh warga desa masuk ke kandang untuk melihat sapi yang sedang sakit"
        },
        {
          "key": "C",
          "text": "Membiarkan kotoran sapi menumpuk hingga setinggi lutut sapi dewasa"
        },
        {
          "key": "D",
          "text": "Mencampur air minum sapi dengan air comberan saluran irigasi"
        },
        {
          "key": "E",
          "text": "Menutup seluruh jendela kandang secara rapat menggunakan terpal plastik hitam"
        }
      ],
      "correct": "A",
      "explanation": "Desinfeksi rutin, footbath celup kaki dengan asam sitrat/desinfektan resmi, dan pembatasan tamu luar adalah standar SOP biosekuriti anti-PMK."
    },
    {
      "id": 2212,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Tanda-tanda klinis khas pada sapi yang terindikasi terserang virus Penyakit Mulut dan Kuku (PMK) yang harus segera dilaporkan kepada mantri hewan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Demam tinggi, keluar lendir busa berlebihan dari mulut (hipersalivasi), serta lepuh luka melepuh pada gusi, lidah, dan celah kuku kaki"
        },
        {
          "key": "B",
          "text": "Bulu sapi berubah warna menjadi keemasan dan tanduk tumbuh memanjang"
        },
        {
          "key": "C",
          "text": "Sapi mampu melompat pagar kandang setinggi 3 meter secara lincah"
        },
        {
          "key": "D",
          "text": "Nafsu makan sapi meningkat empat kali lipat dari porsi harian normal"
        },
        {
          "key": "E",
          "text": "Kotoran sapi berubah mengeras seperti batu karang hitam di dalam perut"
        }
      ],
      "correct": "A",
      "explanation": "Vesikel (lepuh) pada mukosa mulut dan korona kuku menyebabkan sapi kesakitan saat mengunyah (drooling/busa saliva) dan pincang berdiri."
    },
    {
      "id": 2213,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Komposisi pakan konsentrat tambahan buatan mandiri yang umum diracik peternak sapi penggemukan di OKU Timur untuk mencukupi kebutuhan protein dan energi adalah...",
      "options": [
        {
          "key": "A",
          "text": "Campuran bekatul padi, jagung giling, bungkil kelapa/sawit, molase, dan mineral premiks dengan perbandingan terukur"
        },
        {
          "key": "B",
          "text": "Campuran pasir sungai, abu gosok, garam dapur, dan semen putih"
        },
        {
          "key": "C",
          "text": "Nasi basi sisa warung makan yang dicampur air sabun deterjen"
        },
        {
          "key": "D",
          "text": "Potongan plastik kemasan yang dicelupkan ke dalam minyak goreng bekas"
        },
        {
          "key": "E",
          "text": "Dedaunan kering pohon karet yang disiram dengan air cuka pekat"
        }
      ],
      "correct": "A",
      "explanation": "Konsentrat berbasis by-product pertanian lokal (bekatul, bungkil sawit, jagung) menyuplai Total Digestible Nutrients (TDN) dan Protein Kasar (CP) 12-14%."
    },
    {
      "id": 2214,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Penyediaan air minum untuk ternak sapi potong di kandang harus menganut prinsip 'ad libitum', yang artinya...",
      "options": [
        {
          "key": "A",
          "text": "Tersedia secara terus-menerus dan bebas dikonsumsi kapan saja sapi merasa haus (sekitar 40–60 liter per ekor per hari)"
        },
        {
          "key": "B",
          "text": "Hanya diberikan satu gelas kecil pada waktu tengah malam"
        },
        {
          "key": "C",
          "text": "Diberikan hanya jika sapi telah selesai membajak sawah selama 5 jam"
        },
        {
          "key": "D",
          "text": "Air minum dicampur dengan es batu beku setiap 10 menit sekali"
        },
        {
          "key": "E",
          "text": "Sapi dilarang minum air bersih sebelum berusia di atas 3 tahun"
        }
      ],
      "correct": "A",
      "explanation": "Kebutuhan air ad libitum (unrestricted) sangat vital untuk metabolisme rumen, regulasi suhu tubuh, dan pencernaan serat hijauan."
    },
    {
      "id": 2215,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pengolahan limbah kotoran padat sapi menjadi pupuk organik bokashi bernilai jual tinggi dilakukan peternak dengan cara...",
      "options": [
        {
          "key": "A",
          "text": "Mencampur kotoran padat dengan sekam, dedak, dan larutan mikroba dekomposer (EM4), lalu ditutup terpal untuk proses fermentasi aerob-anaerob"
        },
        {
          "key": "B",
          "text": "Membuang kotoran langsung ke dalam saluran irigasi primer BK Belitang"
        },
        {
          "key": "C",
          "text": "Membakar kotoran basah menggunakan minyak tanah di tengah jalan desa"
        },
        {
          "key": "D",
          "text": "Menjemur kotoran di bawah terik matahari hingga berubah menjadi debu pasir"
        },
        {
          "key": "E",
          "text": "Menyimpan kotoran di dalam kulkas bersama bahan makanan rumah tangga"
        }
      ],
      "correct": "A",
      "explanation": "Dekomposisi terkontrol oleh mikroorganisme EM4 menghasilkan pupuk kompos matang dengan C/N rasio rendah (< 20) tanpa bau menyengat."
    },
    {
      "id": 2216,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Limbah cair urine sapi yang ditampung dalam tandon penampung dapat difermentasi menjadi pupuk organik cair (POC / biourine). Keunggulan biourine bagi tanaman cabai dan padi adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mengandung unsur Nitrogen alami, Kalium, dan zat pengatur tumbuh (fitohormon auksin) yang merangsang pertumbuhan daun serta mengusir hama serangga"
        },
        {
          "key": "B",
          "text": "Dapat membasmi seluruh cacing tanah yang menyuburkan lahan persawahan"
        },
        {
          "key": "C",
          "text": "Membuat tanah sawah mengeras seperti semen beton cor"
        },
        {
          "key": "D",
          "text": "Mengubah warna gabah padi menjadi ungu gelap kehitaman"
        },
        {
          "key": "E",
          "text": "Menghilangkan seluruh kebutuhan air pada tanaman padi sawah"
        }
      ],
      "correct": "A",
      "explanation": "Urin sapi kaya urea organik, asam amino, dan hormon alami yang setelah fermentasi bau amonianya hilang dan efektif sebagai pupuk daun bio-repelen."
    },
    {
      "id": 2217,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C4",
      "question": "Peternak inovatif di beberapa desa Belitang membangun reaktor biogas dari kotoran sapi. Energi alternatif biogas yang dihasilkan berupa gas metana (CH4) bermanfaat langsung untuk...",
      "options": [
        {
          "key": "A",
          "text": "Bahan bakar kompor memasak di dapur keluarga dan penerangan lampu biogas, menghemat pengeluaran gas elpiji 3 kg"
        },
        {
          "key": "B",
          "text": "Mengisi daya baterai smartphone secara nirkabel dari jarak jauh"
        },
        {
          "key": "C",
          "text": "Mendinginkan ruangan rumah seperti pendingin udara (AC)"
        },
        {
          "key": "D",
          "text": "Menghilangkan bau badan pemilik peternakan saat memerah susu"
        },
        {
          "key": "E",
          "text": "Menggantikan peran air minum bersih bagi ternak di kandang"
        }
      ],
      "correct": "A",
      "explanation": "Anaerobic digester mengubah kotoran menjadi gas metana bersih untuk substitusi LPG rumah tangga dan menghasilkan pupuk ampas (slurry/bioslurry)."
    },
    {
      "id": 2218,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pada peternakan kambing dan domba di OKU Timur, konstruksi kandang yang paling direkomendasikan penyuluh adalah model kandang panggung berlantai celah (slat) 50–70 cm dari tanah. Alasan utamanya adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kotoran dan urine langsung jatuh ke kolong bawah sehingga lantai kandang selalu kering, mencegah penyakit kuku busuk (foot rot) dan kudis (scabies)"
        },
        {
          "key": "B",
          "text": "Membuat kambing dapat melompat lebih tinggi saat bermain di dalam kandang"
        },
        {
          "key": "C",
          "text": "Memudahkan pemilik kandang tidur bersama ternak di kolong panggung"
        },
        {
          "key": "D",
          "text": "Menghindari kambing terkena hembusan angin sepoi-sepoi di pedesaan"
        },
        {
          "key": "E",
          "text": "Mempercepat kambing berubah menjadi ternak sapi pedaging"
        }
      ],
      "correct": "A",
      "explanation": "Lantai panggung berjarak celah 1.5-2 cm menjaga kuku kambing tetap kering, higienis, terbebas dari genangan amonia, dan memudahkan panen pupuk kandang."
    },
    {
      "id": 2219,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C2",
      "question": "Jenis kambing pedaging unggul yang banyak dibudidayakan peternak rakyat di Belitang karena pertumbuhannya cepat dan bertubuh tegap besar adalah...",
      "options": [
        {
          "key": "A",
          "text": "Kambing Peranakan Etawa (PE), kambing Boer, dan kambing Jawa Randu"
        },
        {
          "key": "B",
          "text": "Kambing kerdil hutan lindung"
        },
        {
          "key": "C",
          "text": "Kambing gunung es kutub utara"
        },
        {
          "key": "D",
          "text": "Domba merino wol tebal iklim dingin eropa"
        },
        {
          "key": "E",
          "text": "Kambing liar pemakan semak rawa gambut"
        }
      ],
      "correct": "A",
      "explanation": "Kambing PE dan persilangan Boer memiliki konversi pakan baik, toleran terhadap iklim tropis OKU Timur, dan sangat diminati untuk hewan qurban."
    },
    {
      "id": 2220,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Siklus ekonomi peternak sapi dan kambing di OKU Timur sangat dipengaruhi oleh momentum budaya keagamaan Hari Raya Idul Adha (Kurban). Strategi bisnis yang dijalankan peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Mempersiapkan sapi dan kambing jantan berumur cukup (poel gigi) melalui program penggemukan intensif 3–6 bulan menjelang hari raya kurban"
        },
        {
          "key": "B",
          "text": "Menjual seluruh induk sapi betina produktif yang sedang bunting"
        },
        {
          "key": "C",
          "text": "Menghentikan pemberian pakan ternak satu bulan sebelum hari raya"
        },
        {
          "key": "D",
          "text": "Menolak pembelian hewan ternak dari panitia masjid desa sekitar"
        },
        {
          "key": "E",
          "text": "Menurunkan bobot sapi agar harga jual menjadi lebih murah"
        }
      ],
      "correct": "A",
      "explanation": "Peak demand Idul Adha memberikan margin keuntungan tertinggi bagi peternak yang berhasil menyediakan ternak sehat dan telah poel (cukup umur syar'i)."
    },
    {
      "id": 2221,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "cognitiveLevel": "C2",
      "question": "Di Pasar Hewan Belitang (atau pasar hewan mingguan OKU Timur), terdapat tradisi budaya transaksi jual beli sapi unik di mana pembeli dan belantik (makelar) saling bersalaman di balik sarung atau topi. Tujuan tradisi ini adalah...",
      "options": [
        {
          "key": "A",
          "text": "Melakukan tawar-menawar harga secara rahasia dan saling menghargai tanpa diketahui oleh pembeli lain di sekitar lokasi pasar"
        },
        {
          "key": "B",
          "text": "Memastikan tangan pedagang dalam kondisi bersih tanpa terkena lumpur kandang"
        },
        {
          "key": "C",
          "text": "Menguji kekuatan genggaman tangan antara pedagang dan pembeli sapi"
        },
        {
          "key": "D",
          "text": "Menghindari kewajiban membayar retribusi pasar kepada pengelola"
        },
        {
          "key": "E",
          "text": "Tanda bahwa transaksi jual beli dibatalkan secara sepihak"
        }
      ],
      "correct": "A",
      "explanation": "Tradisi tawar sarung/maro rego adalah kode etik negosiasi privat tradisional untuk menjaga harga pasar dan etika persaingan antarpedagang hewan."
    },
    {
      "id": 2222,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Dalam lembar observasi K3 peternakan, peternak yang sedang membantu kelahiran pedet (anak sapi) atau membersihkan plasenta induk wajib memakai alat pelindung...",
      "options": [
        {
          "key": "A",
          "text": "Sarung tangan palpasi panjang (obstetri) higienis dan sepatu bot karet anti-air"
        },
        {
          "key": "B",
          "text": "Sarung tangan kain rajut berpori tipis tanpa antiseptik"
        },
        {
          "key": "C",
          "text": "Sandal jepit busa dan celana pendek kain katun"
        },
        {
          "key": "D",
          "text": "Helm las pelindung percikan api besi"
        },
        {
          "key": "E",
          "text": "Kacamata renang silikon kedap air laut"
        }
      ],
      "correct": "A",
      "explanation": "Sarung tangan obstetri panjang melindungi tangan peternak dari risiko penularan zoonosis (misal Brucellosis) dan mencegah infeksi rahim induk sapi."
    },
    {
      "id": 2223,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Populasi lalat kandang (Stomoxys calcitrans) yang terlalu padat dapat membuat sapi gelisah dan bobot badan turun. Pengendalian lalat ramah lingkungan yang diterapkan peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pemasangan perangkap lalat lem kuning, menjaga kebersihan lantai kandang, dan pengasapan serai wangi di sekitar kandang sore hari"
        },
        {
          "key": "B",
          "text": "Menyemprotkan racun serangga dosis tinggi langsung ke pakan dan mata sapi"
        },
        {
          "key": "C",
          "text": "Membiarkan lalat menghisap darah sapi hingga kenyang"
        },
        {
          "key": "D",
          "text": "Menangkap lalat satu per satu menggunakan tangan kosong"
        },
        {
          "key": "E",
          "text": "Menenggelamkan seluruh tubuh sapi ke dalam lumpur sawah"
        }
      ],
      "correct": "A",
      "explanation": "Manajemen kotoran kering, perangkap mekanis lem kuning, dan pengasapan herbal repellent efektif menekan lalat tanpa residu kimia berbahaya."
    },
    {
      "id": 2224,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Untuk menjamin ketersediaan pakan hijauan sepanjang tahun, peternak mandiri di OKU Timur membudidayakan tanaman bank pakan di pematang sawah atau lahan pekarangan, seperti...",
      "options": [
        {
          "key": "A",
          "text": "Rumput Odot, Rumput Pakchong, Rumput Gajah Taiwan, dan legum tanaman Indigofera"
        },
        {
          "key": "B",
          "text": "Pohon kaktus berduri dan semak ilalang kering"
        },
        {
          "key": "C",
          "text": "Pohon pinus hutan dan pohon jati belanda"
        },
        {
          "key": "D",
          "text": "Tanaman eceng gondok rawa beracun"
        },
        {
          "key": "E",
          "text": "Tanaman padi liar yang tidak berbulir gabah"
        }
      ],
      "correct": "A",
      "explanation": "Rumput Odot dan Indigofera memiliki biomassa tinggi, daun lunak disukai ternak, dan kandungan protein kasar tinggi (16-24%)."
    },
    {
      "id": 2225,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Untuk memperkirakan berat badan sapi hidup di kandang peternak tanpa timbangan mekanik lantai yang mahal, alat ukur praktis yang digunakan adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pita ukur Rondo / pita meteran lingkar dada sapi yang dikonversikan dengan rumus Schoorl atau rumus Denmark"
        },
        {
          "key": "B",
          "text": "Timbangan gantung pegas kapasitas 10 kilogram"
        },
        {
          "key": "C",
          "text": "Alat ukur tinggi badan anak sekolah bergaris centimeter"
        },
        {
          "key": "D",
          "text": "Termometer raksa pengukur suhu badan ketiak"
        },
        {
          "key": "E",
          "text": "Penggaris plastik segitiga berukuran 30 cm"
        }
      ],
      "correct": "A",
      "explanation": "Lingkar dada (heart girth) memiliki korelasi linear kuat dengan massa tubuh riil sapi; rumus Schoorl: Bobot (kg) = (Lingkar Dada + 22)^2 / 100."
    },
    {
      "id": 2226,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Dalam manajemen penggemukan sapi potong (feedlot) selama 90 hari, target Pertambahan Bobot Badan Harian (PBBH) yang ideal untuk sapi persilangan Simental/Limousin adalah...",
      "options": [
        {
          "key": "A",
          "text": "0,9 hingga 1,4 kg per ekor per hari dengan efisiensi pakan yang baik"
        },
        {
          "key": "B",
          "text": "10 hingga 15 kg per ekor per hari dalam waktu 24 jam"
        },
        {
          "key": "C",
          "text": "Hanya 0,05 kg per ekor per hari tanpa penambahan daging"
        },
        {
          "key": "D",
          "text": "Bobot sapi harus konstan tidak boleh mengalami penambahan"
        },
        {
          "key": "E",
          "text": "Bobot sapi wajib berkurang separuh agar daging menjadi padat"
        }
      ],
      "correct": "A",
      "explanation": "ADG (Average Daily Gain) sapi silangan eksotis mencapai 0.9-1.4 kg/hari dengan rasio pakan konsentrat-hijauan 60:40."
    },
    {
      "id": 2227,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Pemberian obat cacing (anthelmintik) seperti Albendazole atau Ivermectin secara berkala setiap 3–4 bulan sekali pada ternak sapi dan kambing bertujuan untuk...",
      "options": [
        {
          "key": "A",
          "text": "Membasmi parasit cacing hati (Fasciola hepatica) dan cacing saluran pencernaan agar nutrisi pakan terserap optimal menjadi daging"
        },
        {
          "key": "B",
          "text": "Mencegah bulu sapi rontok saat terkena air hujan di kandang"
        },
        {
          "key": "C",
          "text": "Membuat suara lenguhan sapi terdengar lebih nyaring di pagi hari"
        },
        {
          "key": "D",
          "text": "Mengubah tanduk sapi menjadi lebih lunak agar aman bagi peternak"
        },
        {
          "key": "E",
          "text": "Menggantikan kewajiban peternak memberikan pakan rumput segar"
        }
      ],
      "correct": "A",
      "explanation": "Infestasi cacing saluran cerna dan cacing hati parasitik menyebabkan anemia, malnutrisi, dan penurunan konversi pakan secara drastis."
    },
    {
      "id": 2228,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "cognitiveLevel": "C3",
      "question": "Keberadaan Kelompok Peternak Mandiri di desa-desa OKU Timur memberikan manfaat ekonomi bersama bagi anggotanya, antara lain...",
      "options": [
        {
          "key": "A",
          "text": "Pembelian pakan konsentrat/mineral secara grosir dengan harga murah dan kemudahan akses bantuan pejantan/vaksin dari dinas peternakan"
        },
        {
          "key": "B",
          "text": "Mewajibkan seluruh anggota menyerahkan sapi miliknya kepada ketua kelompok"
        },
        {
          "key": "C",
          "text": "Melarang peternak menjual sapi kepada panitia kurban masjid luar desa"
        },
        {
          "key": "D",
          "text": "Mengambil potongan keuntungan 90 persen dari setiap penjualan ternak"
        },
        {
          "key": "E",
          "text": "Menghapus kepemilikan pribadi kandang ternak di wilayah desa"
        }
      ],
      "correct": "A",
      "explanation": "Kelompok peternak menciptakan skala ekonomi bersama (collective bargaining power) dalam pengadaan input dan kemitraan pemerintah."
    },
    {
      "id": 2229,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C3",
      "question": "Pencatatan data ternak (recording) yang tertib pada peternakan sapi mandiri mencakup informasi penting berupa...",
      "options": [
        {
          "key": "A",
          "text": "Kartu identitas ternak yang mencatat tanggal lahir, silsilah induk/pejantan, tanggal kawin/IB, riwayat vaksinasi, dan riwayat bobot badan"
        },
        {
          "key": "B",
          "text": "Daftar nama-nama warna cat kayu yang digunakan pada tiang kandang"
        },
        {
          "key": "C",
          "text": "Jumlah kendaraan bermotor yang melintas di depan jalan kandang"
        },
        {
          "key": "D",
          "text": "Daftar harga sembako di pasar tradisional kecamatan tetangga"
        },
        {
          "key": "E",
          "text": "Buku catatan ramalan cuaca tradisional tanpa data ternak riil"
        }
      ],
      "correct": "A",
      "explanation": "Recording ternak yang rapi mencegah inbreeding (kawin sedarah), menghitung estimasi tanggal partus (melahirkan), dan memantau efisiensi pakan."
    },
    {
      "id": 2230,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C4",
      "question": "Pada musim kemarau panjang, ketersediaan rumput gajah segar di persawahan OKU Timur sering menyusut drastis. Solusi cadangan pakan darurat yang disiapkan peternak adalah...",
      "options": [
        {
          "key": "A",
          "text": "Pemanfaatan cadangan pakan kering (hay), amoniasi jerami padi yang disimpan di lumbung pakan, dan pelepah sawit cacah"
        },
        {
          "key": "B",
          "text": "Membiarkan sapi kelaparan hingga musim hujan tiba kembali"
        },
        {
          "key": "C",
          "text": "Memberikan makan kayu balok dan kertas koran bekas kepada ternak"
        },
        {
          "key": "D",
          "text": "Memindahkan seluruh sapi ke dalam hutan lindung tanpa pengawasan"
        },
        {
          "key": "E",
          "text": "Menjual seluruh sapi dengan harga obral murah tanpa menimbang bobot"
        }
      ],
      "correct": "A",
      "explanation": "Teknologi pengawetan pakan hay (rumput kering) dan amoniasi jerami menjamin kontinuitas pakan bernutrisi saat paceklik rumput hijau."
    },
    {
      "id": 2231,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "A",
      "cognitiveLevel": "C4",
      "question": "Berdasarkan wawancara aspek sosial budaya Day 2, peran generasi muda petani (pemuda desa) dalam modernisasi sektor peternakan sapi di OKU Timur adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menerapkan teknologi digital recording, manajemen pakan fermentasi terukur, dan pemasaran hewan kurban daring melalui media sosial"
        },
        {
          "key": "B",
          "text": "Meninggalkan seluruh desa dan melarang pemeliharaan ternak sapi di desa"
        },
        {
          "key": "C",
          "text": "Menolak penggunaan mesin chopper dan kembali ke cara manual sabit tumpul"
        },
        {
          "key": "D",
          "text": "Membatasi penjualan hewan ternak hanya kepada kerabat sedarah satu marga"
        },
        {
          "key": "E",
          "text": "Menggantikan seluruh sapi lokal dengan hewan peliharaan hias impor"
        }
      ],
      "correct": "A",
      "explanation": "Pemuda tani berperan sebagai agen modernisasi: adopsi mekanisasi, formulasi nutrisi presisi, dan penetrasi pasar qurban berbasis konten digital."
    },
    {
      "id": 2232,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "C",
      "cognitiveLevel": "C3",
      "question": "Peternak sering menggantung 'mineral block' (batu garam jilat) di tiang kandang sapi. Manfaat penting dari mineral block tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Menyediakan asupan makro dan mikromineral (Kalsium, Fosfor, Natrium, Seng, Selenium) guna mencegah defisiensi mineral dan kelumpuhan pascamelahirkan"
        },
        {
          "key": "B",
          "text": "Sebagai mainan agar sapi tidak bersuara keras saat malam hari"
        },
        {
          "key": "C",
          "text": "Membuat gigi sapi menjadi tumpul agar tidak merusak palungan kayu"
        },
        {
          "key": "D",
          "text": "Mendinginkan lidah sapi saat udara siang hari terasa sangat panas"
        },
        {
          "key": "E",
          "text": "Mengubah warna kulit sapi menjadi belang putih hitam seperti sapi perah"
        }
      ],
      "correct": "A",
      "explanation": "Mineral lick block mencegah penyakit milk fever (hipokalsemia), pica (kebiasaan makan tanah/kayu), dan mengoptimalkan fungsi enzim pencernaan."
    },
    {
      "id": 2233,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "D",
      "cognitiveLevel": "C2",
      "question": "Telinga sapi yang terdata resmi di OKU Timur kini dipasangi anting kuning ber-barcode (ear tag). Fungsi identifikasi digital ear tag tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text": "Merekam data vaksinasi PMK, riwayat kepemilikan, dan status kesehatan ternak secara nasional melalui aplikasi terintegrasi"
        },
        {
          "key": "B",
          "text": "Sebagai perhiasan telinga agar sapi terlihat cantik saat dijual di pasar"
        },
        {
          "key": "C",
          "text": "Mencegah telinga sapi digigit oleh nyamuk dan lalat kandang"
        },
        {
          "key": "D",
          "text": "Membuat sapi dapat mendengarkan siaran radio musik peternakan"
        },
        {
          "key": "E",
          "text": "Menandai bahwa sapi tersebut dilarang untuk disembelih selamanya"
        }
      ],
      "correct": "A",
      "explanation": "Ear-tag QR-code terhubung dengan database Identik PKH Kementan RI untuk ketertelusuran (traceability) lalu lintas hewan dan status vaksinasi."
    },
    {
      "id": 2234,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "A",
      "cognitiveLevel": "C2",
      "question": "Tradisi gotong royong mencari rumput bersama ('ngarit bareng') di areal persawahan atau tanggul saluran irigasi mencerminkan nilai budaya...",
      "options": [
        {
          "key": "A",
          "text": "Solidaritas sosial, kerukunan antar-warga peternak, dan sarana saling bertukar informasi seputar perawatan hewan ternak"
        },
        {
          "key": "B",
          "text": "Persaingan bermusuhan memperebutkan lahan rumput dengan kekerasan"
        },
        {
          "key": "C",
          "text": "Kewajiban upeti rumput yang harus diserahkan kepada kepala desa"
        },
        {
          "key": "D",
          "text": "Upaya mengumpulkan rumput untuk dijual ke luar negeri dengan kapal kargo"
        },
        {
          "key": "E",
          "text": "Larangan bagi peternak untuk merawat sapinya di rumah sendiri"
        }
      ],
      "correct": "A",
      "explanation": "Aktivitas ngarit bareng mempererat kohesi sosial paguyuban peternak desa dan menjadi media informal transfer pengetahuan agribisnis."
    },
    {
      "id": 2235,
      "day": 2,
      "sector": "peternakan",
      "indicatorCode": "B",
      "cognitiveLevel": "C5",
      "question": "Konsep integrasi tanaman-ternak (Crop-Livestock System) antara persawahan padi Belitang dengan peternakan sapi mandiri mewujudkan ekonomi sirkular ramah lingkungan karena...",
      "options": [
        {
          "key": "A",
          "text": "Jerami padi sawah diolah menjadi pakan sapi, sementara kotoran sapi difermentasi menjadi pupuk organik yang menyuburkan sawah kembali (zero waste)"
        },
        {
          "key": "B",
          "text": "Sapi dilepaskan memakan seluruh tanaman padi yang sedang berbuah di sawah"
        },
        {
          "key": "C",
          "text": "Petani tidak perlu menanam padi lagi dan hanya mengandalkan bantuan daging sapi"
        },
        {
          "key": "D",
          "text": "Lahan sawah diubah seluruhnya menjadi kolam kubangan kotoran sapi"
        },
        {
          "key": "E",
          "text": "Seluruh jerami padi dibakar habis agar abu menutupi pemukiman warga"
        }
      ],
      "correct": "A",
      "explanation": "Sistem integrasi padi-sapi (CLS) memutus ketergantungan pupuk kimia sintetis, menekan emisi pembakaran jerami, dan melipatgandakan pendapatan petani."
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
