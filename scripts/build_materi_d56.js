// FinCESTem 2026 - Generator Modul Materi Day 5 & Day 6 Non-Field Trip
// Video Presentasi Mandiri (5-10 Menit) - 7 Sektor Unggulan OKU Timur - Tanpa Wawancara

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let content = fs.readFileSync(filePath, 'utf8');

// Build Day 5 Config
const MATERI_DAY5 = {
  dayNum: 5,
  title: 'Modul Riset Day 5: Video Presentasi STEM (5–10 Menit): Sains & Teknologi Sektor',
  theme: 'Pilar Sains & Teknologi (Video Presentasi HP 7 Sektor)',
  gradientClass: 'from-amber-950 via-slate-900 to-purple-950 border-amber-700/40',
  tagColorClass: 'bg-white/20 text-amber-100',
  badgeColorClass: 'bg-amber-400 text-amber-950',
  subtitle: 'Panduan Pembuatan Rekaman Video Penjelasan Mandiri (5–10 Menit, Tanpa Wawancara): Pilar Sains (Kondisi Alami & Nutrisi/Biologi) dan Pilar Teknologi (Alat/Mesin Kerja) pada 7 Sektor Unggulan OKU Timur',
  inquiryIntro: 'Hari ini Anda ditugaskan menyusun dan merekam <strong>Video Penjelasan STEM Bagian 1: Sains & Teknologi</strong> berdurasi <strong>5–10 Menit</strong> menggunakan kamera HP. <strong>Perhatian Penting: TIDAK ADA WAWANCARA pedagang atau narasumber lain!</strong> Anda tampil berbicara di depan kamera HP (atau voice-over merekam objek) menerangkan sains bahan alami dan teknologi alat kerja sektor Anda.',
  sectors: {
    pertanian: {
      key: 'pertanian',
      name: 'Pertanian Padi Sawah',
      badge: 'Video Sains & Teknologi',
      icon: 'agriculture',
      desc: 'Sains Tanah Aluvial & Irigasi BK, Nutrisi Padi N-P-K, Traktor, Nozzle Sprayer & Combine Harvester (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Sawah Belitang (00:00–01:30)',
          subtitle: 'Menyusun sapaan pembuka santun, sebutkan nama/kelas, dan latar lokasi persawahan',
          guidedPoints: [
            'Sapa penonton dan perkenalkan diri secara jelas: "Halo semuanya, saya [Nama], siswa kelas X SMAN 1 Belitang, peserta Kokurikuler FINCESTEM 2026."',
            'Tunjukkan hamparan sawah di sekitar Anda dan jelaskan desa tempat sawah berada (misal BK 9, BK 10, dll).',
            'Sampaikan tujuan video: "Dalam video 5-10 menit ini, saya akan menjelaskan dua pilar utama di sektor pertanian padi, yaitu Sains kondisi alami dan Teknologi alat kerja modern."'
          ],
          placeholder: 'Tuliskan draf naskah bicara pembukaan video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rencana skrip rekaman kamera depan HP di persawahan BK 10',
          defaultExp: 'Halo semuanya, saya [Nama Siswa], siswa kelas X SMAN 1 Belitang. Pada video riset kokurikuler Day 5 ini, saya berada di areal persawahan irigasi Desa Sidomulyo BK 9. Selama 5-10 menit ke depan, saya akan menerangkan secara mandiri penerapan pilar Sains kondisi tanah dan air, serta pilar Teknologi mekanisasi alat kerja yang digunakan petani padi di lumbung pangan OKU Timur.',
          defaultSources: 'Draf Naskah Pembukaan Rekaman Video Mandiri Siswa (Klip 01_Intro_Pertanian.mp4).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Tanah, Air Irigasi & Nutrisi Padi (01:30–04:30)',
          subtitle: 'Menerangkan proses biologis/kimia tanah sawah dan kebutuhan pupuk tanpa membaca teks kaku',
          guidedPoints: [
            'Sorot atau tunjukkan tanah sawah dan air saluran irigasi BK yang mengalir ke petak sawah.',
            'Jelaskan mengapa tanah sawah harus berlumpur dan kedap air agar akar padi menyerap air dan pupuk secara maksimal.',
            'Terangkan fungsi pupuk Urea (Nitrogen) untuk daun dan anakan, serta pupuk NPK (Fosfor dan Kalium) untuk pengisian bulir gabah.'
          ],
          placeholder: 'Tuliskan poin penjelasan sains padi yang Anda ucapkan di depan kamera... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan tanah sawah dan buku teks Biologi Pertanian',
          defaultExp: 'Dari sisi Sains, tanah sawah di Belitang terbentuk dari endapan aluvial Sungai Komering yang sangat subur. Petani menjaga lapisan lumpur olah agar kedap air sehingga pupuk tidak hanyut ke bawah tanah. Pada umur muda, tanaman padi memerlukan banyak unsur Nitrogen dari pupuk Urea agar daun rimbun dan anakan banyak, lalu saat mulai bunting diberikan kalium agar bulir gabah padat berisi dan batang tidak mudah rebah.',
          defaultSources: 'Catatan Pengamatan Lapangan Sains Tanah dan Nutrisi Padi di BK 9.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Alat Mesin Pertanian Modern (04:30–07:30)',
          subtitle: 'Menyorot traktor pembajak, sprayer elektrik, pompa alkon, atau mesin combine harvester',
          guidedPoints: [
            'Arahkan kamera ke traktor, tangki semprot elektrik, atau mesin combine harvester di sawah/gudang.',
            'Jelaskan cara kerja alat tersebut: bagaimana mesin traktor mencacah tanah, atau bagaimana nosel semprot memecah cairan obat hama.',
            'Sampaikan bagaimana mesin-mesin ini mempercepat kerja petani dari berhari-hari menjadi hanya beberapa jam.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi alat kerja yang Anda sorot dan ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik mesin traktor roda dua dan combine harvester di sawah',
          defaultExp: 'Pilar Teknologi yang sangat menonjol di sawah ini adalah traktor bajak dan mesin panen combine harvester. Mesin traktor roda dua memutar pisau rotari berbahan bakar solar untuk membalik tanah keras menjadi lumpur siap tanam. Saat panen, mesin combine harvester mampu memotong malai, merontokkan bulir padi, dan membuang jerami sekaligus, sehingga memanen 1 hektar sawah hanya butuh waktu sekitar 3 jam saja.',
          defaultSources: 'Observasi Fisik Mesin Alsintan UPJA Tani Mandiri Belitang.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menyusun alur video 5-10 menit, kesimpulan sains-teknologi, dan cek kestabilan rekaman HP',
          guidedPoints: [
            'Simpulkan hubungan sains dan teknologi: mesin modern membuat sains pemupukan dan olah tanah bekerja lebih cepat dan efisien.',
            'Tutup video dengan kalimat ramah: "Sekian penjelasan Sains dan Teknologi pertanian padi dari saya, sampai jumpa di video Day 6."',
            'Pastikan footage rekaman video di HP berdurasi 5-10 menit, suara bicara jelas terdengar, dan resolusi video minimal 720p/1080p.'
          ],
          placeholder: 'Tuliskan kesimpulan penutup video dan daftar klip video HP yang berhasil Anda rekam... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File video VID_D5_PERTANIAN_01.mp4 s.d. 04.mp4 di galeri HP',
          defaultExp: 'Kesimpulannya, integrasi antara pemahaman sains kesuburan tanah dan mekanisasi alsintan modern adalah kunci keberhasilan panen raya di OKU Timur. Seluruh rekaman telah tersimpan rapi di HP dalam 4 klip video stabil berdurasi total 8 menit 20 detik dengan audio jernih, siap dirangkum ke formulir LKPD Day 5.',
          defaultSources: 'Log File Galeri Smartphone Peserta Didik (Proyek FINCESTEM Day 5).'
        }
      ]
    },
    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Rakyat',
      badge: 'Video Sains & Teknologi',
      icon: 'forest',
      desc: 'Sains Tekanan Turgor Lateks & Asam Format, Pisau Sadap, Galah Egrek & Lubang Rorak (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Kebun Karet/Sawit (00:00–01:30)',
          subtitle: 'Menyapa penonton, memperkenalkan diri, dan memperlihatkan latar kebun karet atau kelapa sawit',
          guidedPoints: [
            'Buka video dengan sapaan ceria dan kenalkan identitas diri lengkap (Nama, NISN, Kelas X SMAN 1 Belitang).',
            'Tunjukkan barisan pohon karet atau kelapa sawit di sekitar lokasi rekaman.',
            'Sampaikan bahwa dalam video 5-10 menit ini Anda akan membedah sains getah/buah dan teknologi alat perkebunan tanpa wawancara orang lain.'
          ],
          placeholder: 'Tuliskan naskah pembukaan video perkebunan Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di areal kebun karet rakyat Desa Karang Delima',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video Day 5 ini saya berada di kawasan perkebunan karet rakyat Desa Karang Delima. Dalam video berdurasi sekitar 7 menit ini, saya akan mempresentasikan secara langsung sains keluarnya getah karet dan teknologi alat sadap yang dipakai pekebun.',
          defaultSources: 'Draf Naskah Klip Pembuka Video Mandiri Kebun Karet (Klip D5_Perkebunan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Tekanan Turgor & Pembekuan Lateks (01:30–04:30)',
          subtitle: 'Menjelaskan sains mengapa getah disadap pagi hari dan reaksi asam semut pembeku getah',
          guidedPoints: [
            'Sorot mangkok getah karet atau tandan buah sawit yang sedang berbuah.',
            'Jelaskan sains biologis: mengapa pohon karet harus disadap pagi hari saat tekanan sel batang masih tinggi.',
            'Terangkan sains kimia: bagaimana cairan asam semut (asam format) menggumpalkan getah cair menjadi bekuan kenyal bermutu tinggi.'
          ],
          placeholder: 'Tuliskan penjelasan sains getah karet atau buah sawit yang Anda narasikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Observasi tetesan lateks di mangkok sadap dan reaksi asam koagulan',
          defaultExp: 'Secara sains biologi, getah karet keluar deras pada pagi hari pukul 5 hingga 7 karena tekanan turgor sel tanaman masih maksimal dan penguapan daun masih rendah. Sementara dari sisi kimia, petani menambahkan asam semut encer agar partikel getah karet saling mengikat dan membeku padat menjadi bokar berkualitas bersih tanpa merusak kelenturan karet.',
          defaultSources: 'Pengamatan Lapangan Biologi Tanaman Karet dan Proses Koagulasi Lateks.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Pisau Sadap, Talang Seng & Egrek (04:30–07:30)',
          subtitle: 'Menyorot alat pisau sadap dorong/tarik, cincin mangkok, atau galah egrek sabit sawit',
          guidedPoints: [
            'Tunjukkan pisau sadap ke arah kamera dan jelaskan bentuk mata pisaunya yang melengkung khusus.',
            'Jelaskan teknologi kemiringan sayatan sadap 30-40 derajat agar getah mengalir lancar mengikuti talang seng.',
            'Jika di kebun sawit, perlihatkan galah panjang aluminium alloy dan sabit egrek untuk memotong tandan buah di ketinggian.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi alat sadap atau panen sawit yang Anda rekam... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan fisik pisau sadap baja dan talang getah di pohon karet',
          defaultExp: 'Pilar teknologi pada kebun karet terlihat dari desain pisau sadap baja yang dibuat melengkung presisi. Pisau ini disayat dengan kemiringan 30 derajat ke kanan bawah agar memotong pembuluh getah sebanyak mungkin tanpa melukai kayu dalam (kambium). Lateks kemudian diarahkan oleh talang seng kecil langsung ke mangkok penampung sehingga getah tidak tercecer terbuang ke tanah.',
          defaultSources: 'Observasi Alat Sadap Tradisional dan Modern Pekebun Karet Belitang.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menutup video dengan kesimpulan sains-teknologi perkebunan dan verifikasi rekaman HP',
          guidedPoints: [
            'Simpulkan bahwa ketepatan waktu sadap dan keahlian menggunakan pisau sadap menentukan usia produktif kebun puluhan tahun.',
            'Sampaikan salam penutup yang ramah dan sopan.',
            'Periksa rekaman di galeri HP agar durasi berada di rentang 5-10 menit dengan pencahayaan terang dan stabil.'
          ],
          placeholder: 'Tuliskan kesimpulan video perkebunan Anda dan catatan file rekaman HP... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D5_KEBUN_TOTAL_07MIN.mp4 di folder video FINCESTEM',
          defaultExp: 'Kesimpulannya, perpaduan sains tekanan getah pagi hari dan ketelitian teknologi sayatan pisau sadap sangat menentukan kelangsungan hidup pohon karet hingga usia 25 tahun. Rekaman video mandiri telah saya selesaikan dengan durasi total 7 menit 45 detik, siap diunggah ke YouTube sebagai portofolio LKPD Day 5.',
          defaultSources: 'Catatan Manajemen Footage Video Galeri Smartphone Siswa.'
        }
      ]
    },
    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur',
      badge: 'Video Sains & Teknologi',
      icon: 'pets',
      desc: 'Sains Ruminansia Lambung Rumen & Silase, Mesin Chopper, Nipple Drinker & Sanitasi Kandang (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Peternakan (00:00–01:30)',
          subtitle: 'Menyapa ramah, menyebutkan identitas diri, dan memperlihatkan suasana kandang ternak',
          guidedPoints: [
            'Buka video dengan percaya diri: perkenalkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Arahkan kamera memperlihatkan sapi, kambing, atau unggas yang ada di peternakan desa.',
            'Tegaskan fokus video: menjelaskan sains pencernaan/pakan dan teknologi mesin pencacah pakan secara mandiri tanpa wawancara.'
          ],
          placeholder: 'Tuliskan draf pembukaan video peternakan Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di depan kandang sapi Desa Gumawang',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari SMAN 1 Belitang. Di video kokurikuler Day 5 ini, saya berada di sentra peternakan sapi rakyat Desa Gumawang. Dalam rekaman video 5-10 menit ini, saya akan menjelaskan sains sistem pencernaan sapi dan teknologi pengolahan pakan ternak modern yang diterapkan peternak di desa ini.',
          defaultSources: 'Draf Skrip Pembukaan Video Mandiri Peternakan (Klip D5_Peternakan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Lambung Rumen, Nutrisi & Fermentasi Silase (01:30–04:30)',
          subtitle: 'Menerangkan bagaimana sapi mencerna rumput kasar dan sains fermentasi bakteri asam laktat',
          guidedPoints: [
            'Tunjukkan tumpukan rumput gajah, dedak, atau drum silase pakan fermentasi.',
            'Jelaskan sains biologi: sapi memiliki 4 ruang lambung (rumen, retikulum, omasum, abomasum) yang dibantu miliaran bakteri untuk mengurai serat rumput.',
            'Terangkan sains fermentasi pakan: bagaimana bakteri asam laktat mengawetkan rumput di dalam drum tertutup rapat tanpa udara.'
          ],
          placeholder: 'Tuliskan penjelasan sains nutrisi ternak dan fermentasi silase yang Anda narasikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan drum silase dan materi Biologi Sistem Pencernaan Sapi',
          defaultExp: 'Secara sains biologi, sapi adalah hewan ruminansia yang memiliki lambung rumen istimewa. Di dalam rumen, mikroba alami mencerna serat rumput gajah menjadi energi. Peternak juga menerapkan sains biokimia dengan membuat pakan silase, yaitu memfermentasi cacahan rumput dicampur dedak dalam drum kedap udara agar awet berbulan-bulan dan gizinya meningkat.',
          defaultSources: 'Catatan Observasi Sains Pakan Ternak dan Fermentasi Anaerob.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Mesin Chopper & Sistem Sanitasi Kandang (04:30–07:30)',
          subtitle: 'Menyorot mesin pencacah rumput bermesin bensin dan kemiringan lantai kandang',
          guidedPoints: [
            'Arahkan kamera ke mesin pencacah rumput (chopper) dan jelaskan bagian mata pisau serta motor penggeraknya.',
            'Terangkan fungsi teknologi mesin: mencacah batang rumput keras menjadi serpihan 3 cm agar mudah dimakan sapi tanpa tersisa.',
            'Perlihatkan selokan pembuangan dan lantai semen miring 2-5 derajat agar air kencing langsung mengalir kering.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi mesin chopper dan kandang yang Anda tunjukkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik mesin chopper bensin dan desain selokan lantai kandang',
          defaultExp: 'Dari pilar teknologi, peternak sangat terbantu oleh mesin chopper bermotor bensin. Mesin ini memiliki bilah pisau berputar cepat yang mencacah batang rumput gajah tebal menjadi potongan kecil 2 hingga 4 cm, sehingga sapi memakan seluruh rumput tanpa ada yang terbuang. Selain itu, lantai kandang direkayasa miring agar urin langsung mengalir ke selokan pembuangan.',
          defaultSources: 'Pengamatan Teknis Mesin Chopper dan Konstruksi Kandang Sapi.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menyusun kesimpulan sains-teknologi ternak dan pemeriksaan klip rekaman HP',
          guidedPoints: [
            'Simpulkan bahwa perpaduan pakan fermentasi bergizi dan mesin pencacah mempercepat penggemukan sapi hingga 1 kg per hari.',
            'Tutup video dengan pesan positif tentang potensi peternakan di OKU Timur.',
            'Cek kelengkapan file video di galeri HP: durasi total berada pada rentang 5-10 menit dan suara vokal terdengar jelas.'
          ],
          placeholder: 'Tuliskan kalimat penutup video peternakan dan rincian video di memori HP... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Klip video VID_D5_TERNAK_FULL.mp4 di memori smartphone',
          defaultExp: 'Kesimpulannya, penerapan sains pakan silase dan mekanisasi mesin chopper mampu memangkas waktu kerja peternak serta meningkatkan bobot sapi secara sehat. Seluruh materi ini telah saya rekam secara mandiri dalam video berdurasi 8 menit 10 detik, siap dipublikasikan ke YouTube untuk LKPD Day 5.',
          defaultSources: 'Log File Rekaman Video Kamera Smartphone Siswa (Klip D5_Peternakan).'
        }
      ]
    },
    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Air Tawar',
      badge: 'Video Sains & Teknologi',
      icon: 'phishing',
      desc: 'Sains Kualitas Air DO/pH & Nutrisi Pelet, Kincir Aerator, Pipa Central Drain & Bak Sortir (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Kolam Perikanan (00:00–01:30)',
          subtitle: 'Menyapa pemirsa, mengenalkan identitas diri, dan memperlihatkan kolam patin/lele',
          guidedPoints: [
            'Buka video dengan ramah: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang peserta FINCESTEM 2026.',
            'Tunjukkan pemandangan kolam ikan patin atau kolam terpal lele yang menjadi objek riset Anda.',
            'Jelaskan bahwa video 5-10 menit ini akan mengupas tuntas sains kualitas air kolam dan teknologi kincir/aerasi.'
          ],
          placeholder: 'Tuliskan draf kalimat pembukaan video perikanan Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di tepi kolam patin Desa Tulus Ayu',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di kawasan sentra kolam budidaya ikan patin Desa Tulus Ayu. Selama 5-10 menit ke depan, saya akan menjelaskan pilar Sains mutu air kolam serta pilar Teknologi peralatan budidaya yang diterapkan pembudidaya ikan.',
          defaultSources: 'Draf Naskah Klip Pembuka Video Perikanan Air Tawar (Klip D5_Perikanan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Parameter Air, Oksigen DO & Nutrisi Pelet (01:30–04:30)',
          subtitle: 'Menerangkan kadar oksigen terlarut, derajat keasaman pH air, dan kadar protein pelet',
          guidedPoints: [
            'Sorot permukaan air kolam yang beriak dan sampel butiran pakan pelet terapung.',
            'Jelaskan sains kimia fisika: mengapa kadar oksigen terlarut (DO) dan pH air (6,5-8) sangat menentukan pernapasan dan nafsu makan ikan.',
            'Terangkan sains nutrisi: fungsi protein pelet 30-32% untuk membentuk daging ikan patin secara cepat.'
          ],
          placeholder: 'Tuliskan penjelasan sains air dan nutrisi pakan ikan yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan warna air kolam dan informasi kandungan protein karung pelet',
          defaultExp: 'Dari sudut pandang sains, kehidupan ikan patin sangat bergantung pada kualitas air. Kadar oksigen terlarut (DO) harus dijaga di atas 3 mg/L agar ikan tidak megap-megap di permukaan. Nilai keasaman pH air yang ideal berkisar 6,5 hingga 8. Pakan pelet terapung yang diberikan mengandung protein 30 persen untuk mempercepat pembentukan otot daging dan menjaga ketahanan tubuh ikan.',
          defaultSources: 'Observasi Kualitas Air Kolam dan Analisis Label Pakan Ikan Patin.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Kincir Aerasi & Saluran Central Drain (04:30–07:30)',
          subtitle: 'Menyorot kincir air elektrik, pompa alkon, pipa tengah kolam, atau bak grading sortir',
          guidedPoints: [
            'Arahkan kamera ke kincir air yang sedang berputar mengaduk air kolam.',
            'Jelaskan teknologi kincir: baling-baling memercikkan air ke udara agar oksigen dari atmosfer larut ke dalam air.',
            'Jika ada kolam bulat/terpal, tunjukkan teknologi lubang pembuangan tengah (central drain) yang membuang kotoran lumpur secara mudah.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi kincir dan pembuangan kolam yang Anda rekam... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik kincir air berputar dan ember sortir ukuran ikan',
          defaultExp: 'Pilar teknologi utama di kolam patin ini adalah kincir air aerator elektrik. Kincir berputar kencang memecah permukaan air menjadi butiran halus sehingga menyerap banyak oksigen dari udara. Selain itu, pembudidaya menggunakan pipa pembuangan tengah di dasar kolam untuk menyedot endapan kotoran sisa pakan secara berkala tanpa perlu menguras seluruh isi air kolam.',
          defaultSources: 'Pengamatan Lapangan Mesin Aerator Kincir dan Sistem Pembuangan Kolam.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menutup video dengan kesimpulan sains-teknologi kolam dan pengecekan klip HP',
          guidedPoints: [
            'Simpulkan bahwa perpaduan pemantauan air dan aerasi kincir menjaga ikan sehat dengan angka kematian di bawah 10%.',
            'Tutup dengan salam penutup dan ajakan menonton kelanjutan analisis finansial pada video Day 6.',
            'Pastikan file rekaman video di HP berdurasi 5-10 menit dengan gambar stabil dan audio suara jelas.'
          ],
          placeholder: 'Tuliskan kesimpulan video dan status file rekaman video di ponsel Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D5_PERIKANAN_TOTAL.mp4 di memori HP',
          defaultExp: 'Kesimpulannya, pemahaman sains parameter air yang didukung teknologi aerator kincir mampu menekan tingkat kematian benih patin dan melipatgandakan hasil panen. Seluruh video telah saya rekam mandiri selama 7 menit 50 detik dan siap diunggah ke YouTube sebagai bukti penyelesaian LKPD Day 5.',
          defaultSources: 'Log File Penyimpanan Video Portofolio FINCESTEM di Smartphone.'
        }
      ]
    },
    industri: {
      key: 'industri',
      name: 'Agro-Industri Pangan',
      badge: 'Video Sains & Teknologi',
      icon: 'precision_manufacturing',
      desc: 'Sains Rendemen Beras & Fermentasi Kedelai, Mesin Husker/Polisher, Boiler Uap & Sealer (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Pabrik Agro-Industri (00:00–01:30)',
          subtitle: 'Menyapa pemirsa, memperkenalkan diri, dan memperlihatkan pabrik RMU atau produksi tahu/kemplang',
          guidedPoints: [
            'Awali video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Tunjukkan pabrik penggilingan padi (RMU) atau sentra pembuatan tahu/kemplang di Belitang.',
            'Tegaskan isi video 5-10 menit: mengulas sains bahan pangan dan teknologi mesin pemrosesan secara mandiri.'
          ],
          placeholder: 'Tuliskan kalimat pembuka video agro-industri Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di depan kilang padi RMU Desa Mojosari',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di pabrik penggilingan padi dan beras RMU Desa Mojosari. Dalam video berdurasi 5-10 menit ini, saya akan menjelaskan proses sains perubahan gabah menjadi beras putih serta teknologi mesin giling modern yang digunakan di pabrik ini.',
          defaultSources: 'Draf Naskah Pembukaan Video Agro-Industri Pangan (Klip D5_Industri_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Struktur Bulir Padi & Pengolahan Bahan (01:30–04:30)',
          subtitle: 'Menerangkan sains anatomi bulir padi, lapisan aleuron bekatul, atau reaksi fermentasi kedelai',
          guidedPoints: [
            'Tunjukkan butiran gabah, beras pecah kulit cokelat, dan beras putih bersih di wadah piring.',
            'Jelaskan sains struktur biji: kulit sekam pelindung terluar, lapisan bekatul kaya nutrisi, dan inti pati endosperma putih.',
            'Jika di pabrik tahu/tempe, jelaskan sains fermentasi jamur tempe atau koagulasi sari kedelai dengan asam cuka.'
          ],
          placeholder: 'Tuliskan penjelasan sains bahan pangan yang Anda paparkan di depan kamera... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan fisik lapisan gabah dan beras hasil gilingan mesin',
          defaultExp: 'Dari sisi sains bahan pangan, sebutir gabah memiliki tiga lapisan utama: kulit sekam keras, lapisan aleuron atau bekatul kaya serat, dan endosperma pati putih. Proses pengolahan bertujuan melepaskan sekam dan mengikis sebagian bekatul agar beras tahan disimpan lama tidak cepat tengik dan menghasilkan tekstur pulen saat dimasak menjadi nasi.',
          defaultSources: 'Kajian Sains Anatomi Biji Pangan dan Uji Fisik Sampel Beras.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Mesin Husker, Polisher & Color Sorter (04:30–07:30)',
          subtitle: 'Menyorot mesin pemecah kulit rol karet, penyosoh beras, atau mesin ketel boiler',
          guidedPoints: [
            'Arahkan kamera ke mesin pecah kulit (husker) dengan dua rol karet yang berputar.',
            'Jelaskan bagaimana gaya gesek mekanik rol mengelupas kulit sekam tanpa memecahkan butir beras.',
            'Sorot mesin penyosoh (polisher) yang memutihkan beras, atau mesin ketel uap boiler penyuplai panas di pabrik.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi mesin pengolahan yang Anda rekam... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik mesin husker rol karet dan pipa konveyor beras',
          defaultExp: 'Pilar teknologi pada pabrik RMU ini bertumpu pada mesin pecah kulit rol karet berkecepatan putar berbeda. Perbedaan kecepatan ini menghasilkan gaya gesek yang mengelupas sekam gabah dengan mulus. Setelah itu beras dialirkan melalui lift konveyor ke mesin polisher untuk disosoh menjadi beras putih mengkilap dengan butir patah yang sangat minim.',
          defaultSources: 'Pengamatan Mesin Mekanik Penggilingan Padi RMU Belitang.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menyimpulkan peran mesin dalam meningkatkan nilai jual pangan dan verifikasi rekaman HP',
          guidedPoints: [
            'Simpulkan bahwa teknologi mesin giling berhasil menaikkan nilai jual gabah mentah menjadi beras kemasan bernilai tinggi.',
            'Sampaikan ucapan terima kasih dan salam penutup video.',
            'Periksa klip rekaman HP: durasi total berkisar 5-10 menit, gambar fokus, dan suara narasi jelas.'
          ],
          placeholder: 'Tuliskan kalimat penutup video industri dan laporan file rekaman HP Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D5_RMU_BERAS_FINAL.mp4 di galeri ponsel',
          defaultExp: 'Kesimpulannya, teknologi pengolahan pangan modern mampu mengolah hasil panen petani menjadi beras bermutu premium yang mengangkat ekonomi OKU Timur. Seluruh adegan video telah saya rekam secara mandiri selama 8 menit 30 detik dengan kualitas audio jernih, siap diunggah ke YouTube untuk LKPD Day 5.',
          defaultSources: 'Log File Video Portofolio FINCESTEM di Galeri HP Siswa.'
        }
      ]
    },
    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan & Saprotan',
      badge: 'Video Sains & Teknologi',
      icon: 'storefront',
      desc: 'Sains Sifat Kimia Pupuk & Racun Hama, Timbangan Sensor Digital, Aplikasi i-Pubers & Sistem FIFO (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Kios Saprotan/Toko (00:00–01:30)',
          subtitle: 'Menyapa pemirsa, memperkenalkan diri, dan memperlihatkan suasana toko perdagangan',
          guidedPoints: [
            'Buka video dengan sapaan sopan: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Tunjukkan etalase toko pupuk/saprotan atau toko sembako di pinggir jalan desa.',
            'Tegaskan topik video 5-10 menit: menjelaskan sifat sains bahan dagangan dan teknologi timbangan digital tanpa wawancara.'
          ],
          placeholder: 'Tuliskan kalimat pembuka video perdagangan Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di depan kios saprotan Desa Harjodadi',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video riset kokurikuler Day 5 ini, saya berada di kios perdagangan sarana pertanian Desa Harjodadi. Dalam video 5-10 menit ini, saya akan menerangkan sifat sains pupuk/pestisida serta teknologi digital timbangan dan aplikasi yang dipakai dalam tata kelola toko.',
          defaultSources: 'Draf Naskah Pembukaan Video Perdagangan Saprotan (Klip D5_Dagang_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Sifat Kimia Pupuk & Label Pestisida (01:30–04:30)',
          subtitle: 'Menerangkan sifat higroskopis pupuk urea dan arti kode warna bahaya botol racun hama',
          guidedPoints: [
            'Sorot karung pupuk urea dan botol insektisida/herbisida di rak toko.',
            'Jelaskan sains kimia: mengapa pupuk urea mudah menyerap uap air sehingga harus ditaruh di atas alas palet kayu agar tidak mencair.',
            'Terangkan sains racun: arti pita warna hijau/kuning/merah pada kemasan botol pestisida yang menunjukkan tingkat bahaya racun.'
          ],
          placeholder: 'Tuliskan penjelasan sains sifat kimia pupuk dan racun yang Anda ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan fisik karung pupuk di atas palet dan label botol herbisida',
          defaultExp: 'Dari sisi sains kimia, pupuk urea memiliki sifat higroskopis tinggi atau sangat cepat menyerap uap air dari udara dan lantai dingin. Oleh karena itu, karung pupuk wajib diletakkan di atas palet kayu agar tidak basah dan menggumpal keras. Pada botol pestisida, terdapat kode warna pita toksisitas yang menandakan tingkat kepekatan bahan aktif racun bagi keselamatan petani.',
          defaultSources: 'Catatan Kajian Sains Kimia Bahan Saprotan dan Toksikologi Pestisida.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Timbangan Digital & Aplikasi i-Pubers (04:30–07:30)',
          subtitle: 'Menyorot timbangan digital sensor load cell dan aplikasi smartphone pencatatan pupuk subsidi',
          guidedPoints: [
            'Arahkan kamera ke timbangan digital kasir dan tunjukkan angka layarnya yang sangat akurat.',
            'Jelaskan teknologi sensor load cell pada timbangan yang mengubah tekanan benda menjadi angka gram digital.',
            'Jelaskan pemanfaatan teknologi smartphone: aplikasi i-Pubers untuk verifikasi e-KTP petani saat menebus pupuk bersubsidi.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi timbangan dan aplikasi toko yang Anda sorot... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik timbangan digital dan antarmuka aplikasi i-Pubers di HP',
          defaultExp: 'Pilar teknologi pada kios ini terlihat dari penggunaan timbangan digital dengan sensor load cell presisi tinggi, memastikan takaran barang tidak berselisih satu gram pun. Selain itu, kios menggunakan smartphone beraplikasi i-Pubers yang terhubung ke jaringan internet kementerian untuk memindai NIK KTP petani secara real-time saat penebusan pupuk bersubsidi.',
          defaultSources: 'Observasi Teknologi Alat Ukur Metrologi dan Aplikasi Digital Kios.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menyimpulkan pentingnya sains bahan dan teknologi stok barang, serta cek video di HP',
          guidedPoints: [
            'Simpulkan bahwa pemahaman sifat bahan dan pencatatan digital menjamin kelancaran rantai pasok kebutuhan pokok warga.',
            'Ucapkan salam penutup yang sopan kepada fasilitator dan pemirsa.',
            'Pastikan rekaman di HP berdurasi 5-10 menit dengan kualitas gambar jelas dan tidak goyang berlebihan.'
          ],
          placeholder: 'Tuliskan kalimat penutup video dan status klip rekaman HP Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D5_PERDAGANGAN_7MIN.mp4 di galeri smartphone',
          defaultExp: 'Kesimpulannya, perpaduan pengetahuan sains karakteristik bahan dan penerapan teknologi timbangan serta pencatatan digital mampu menjaga kepercayaan konsumen dan keawetan stok barang dagangan. Rekaman mandiri ini telah saya tuntaskan berdurasi 7 menit 30 detik, siap diunggah ke YouTube untuk tugas LKPD Day 5.',
          defaultSources: 'Log File Galeri Smartphone Peserta Didik Proyek FINCESTEM Day 5.'
        }
      ]
    },
    formal: {
      key: 'formal',
      name: 'Jasa Keuangan Mikro',
      badge: 'Video Sains & Teknologi',
      icon: 'account_balance',
      desc: 'Sains Optik Lampu UV & Kertas Termal, Mesin EDC Chip Kriptografi, UPS Baterai & Brankas (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Pembukaan, Identitas Diri & Profil Gerai BRILink/BUMDes (00:00–01:30)',
          subtitle: 'Menyapa pemirsa, mengenalkan identitas diri, dan memperlihatkan konter layanan keuangan',
          guidedPoints: [
            'Buka video dengan santun: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Perlihatkan gerai agen perbankan desa (BRILink, BUMDes, atau loket pembayaran desa).',
            'Tegaskan tujuan video 5-10 menit: mengulas sains deteksi uang asli dan teknologi mesin transaksi tanpa mewawancarai orang lain.'
          ],
          placeholder: 'Tuliskan draf sapaan pembuka video jasa keuangan mikro Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di depan gerai agen BRILink Desa Bedilan',
          defaultExp: 'Halo semuanya, saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kokurikuler Day 5 ini, saya berada di gerai agen jasa keuangan mikro BRILink Desa Bedilan. Dalam video berdurasi 5-10 menit ini, saya akan menjelaskan prinsip sains deteksi uang kertas asli serta teknologi mesin transaksi perbankan digital di pedesaan.',
          defaultSources: 'Draf Naskah Pembukaan Video Layanan Keuangan Desa (Klip D5_Keuangan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Sains: Optik Sinar UV & Reaksi Kertas Termal (01:30–04:30)',
          subtitle: 'Menerangkan sains fluoresensi tinta fosfor uang asli dan kimia kertas struk tanpa tinta',
          guidedPoints: [
            'Sorot lampu detektor uang Ultraviolet (UV) dan lembaran uang kertas Rupiah.',
            'Jelaskan sains fisika optik: sinar UV memendarkan serat pengaman fosfor tak kasat mata pada uang asli.',
            'Sorot gulungan kertas struk putih dan jelaskan sains reaksi kimia termal: tulisan hitam muncul akibat panas jarum mesin tanpa memakai tinta basah.'
          ],
          placeholder: 'Tuliskan penjelasan sains optik uang dan kertas termal yang Anda paparkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Demonstrasi uang di bawah sinar lampu UV dan struk printer mini',
          defaultExp: 'Dari sisi sains fisika optik, lampu ultraviolet memancarkan radiasi yang membuat serat pengaman dan tinta fosfor pada uang Rupiah asli memendar bercahaya terang. Sementara pada kertas struk printer, terdapat lapisan kimia zat warna leuco yang bereaksi menghasilkan tulisan hitam saat terkena panas dari jarum termal mesin tanpa menggunakan tinta cair.',
          defaultSources: 'Observasi Sains Optik Fotoluminesensi Uang dan Kertas Termosensitif.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Teknologi: Mesin EDC Enkripsi Chip & Jaringan 4G (04:30–07:30)',
          subtitle: 'Menyorot mesin EDC nirkabel, slot chip kartu ATM, dan perangkat cadangan listrik UPS',
          guidedPoints: [
            'Arahkan kamera ke mesin EDC portabel dan perlihatkan slot gesek chip kartu ATM.',
            'Jelaskan teknologi keamanan: microchip emas kartu mengenkripsi data nasabah secara aman dari penyadapan.',
            'Jelaskan teknologi jaringan seluler 4G/LTE yang mengirim data transfer uang ke server bank dalam hitungan detik.'
          ],
          placeholder: 'Tuliskan penjelasan teknologi mesin EDC dan jaringan yang Anda ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Sorotan fisik mesin EDC tombol angka dan slot chip kartu debit',
          defaultExp: 'Pilar teknologi pada gerai perbankan desa ini bertumpu pada mesin EDC yang terhubung ke jaringan internet 4G. Mesin membaca microchip kartu debit nasabah yang dilengkapi sistem enkripsi keamanan tingkat tinggi sehingga data transaksi terlindungi dari pembajakan. Transaksi transfer atau tarik tunai diproses ke server bank hanya dalam tempo 3 hingga 5 detik.',
          defaultSources: 'Pengamatan Perangkat Fintech Mesin EDC dan Jaringan Telekomunikasi.'
        },
        {
          key: 'D',
          title: 'Runtutan Naskah Menit ke Menit & Manajemen Footage HP (07:30–10:00)',
          subtitle: 'Menyimpulkan peran teknologi dalam mempermudah transaksi desa dan memeriksa video di HP',
          guidedPoints: [
            'Simpulkan bahwa teknologi perbankan digital mendekatkan layanan bank ke desa tanpa warga harus pergi jauh ke kota.',
            'Ucapkan salam penutup yang santun kepada para penonton dan fasilitator.',
            'Cek total durasi rekaman video di memori HP agar memenuhi batas 5-10 menit dengan audio terdengar jelas.'
          ],
          placeholder: 'Tuliskan kalimat penutup video dan status rekaman video di memori HP Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File video D5_KEUANGAN_MIKRO_8MIN.mp4 di memori HP',
          defaultExp: 'Kesimpulannya, pemanfaatan sains deteksi keamanan fisik uang dan teknologi transaksi perbankan digital mampu memberikan layanan keuangan yang aman, cepat, dan terpercaya bagi warga pedesaan Belitang. Rekaman mandiri ini berdurasi total 8 menit 15 detik dan siap diunggah ke YouTube sebagai portofolio LKPD Day 5.',
          defaultSources: 'Log File Galeri Smartphone Peserta Didik Proyek FINCESTEM Day 5.'
        }
      ]
    }
  }
};

// Build Day 6 Config
const MATERI_DAY6 = {
  dayNum: 6,
  title: 'Modul Riset Day 6: Video Presentasi STEM (5–10 Menit): Rekayasa & Finansial Sektor',
  theme: 'Pilar Rekayasa & Finansial (Video Presentasi HP 7 Sektor)',
  gradientClass: 'from-teal-950 via-slate-900 to-blue-950 border-teal-700/40',
  tagColorClass: 'bg-white/20 text-teal-100',
  badgeColorClass: 'bg-cyan-400 text-cyan-950',
  subtitle: 'Panduan Pembuatan Rekaman Video Penjelasan Mandiri (5–10 Menit, Tanpa Wawancara): Pilar Rekayasa (Trik Praktis Penanganan Kendala) dan Pilar Matematika Finansial (Modal, HPP, Omzet & Laba Bersih) pada 7 Sektor Unggulan OKU Timur',
  inquiryIntro: 'Hari ini Anda ditugaskan menyusun dan merekam <strong>Video Penjelasan STEM Bagian 2: Rekayasa & Finansial</strong> berdurasi <strong>5–10 Menit</strong> menggunakan kamera HP. <strong>Perhatian Penting: TIDAK ADA WAWANCARA narasumber lain!</strong> Anda tampil berbicara di depan kamera HP (atau voice-over) menerangkan rekayasa solusi kendala teknis dan kalkulasi hitungan laba-rugi sektor yang Anda teliti.',
  sectors: {
    pertanian: {
      key: 'pertanian',
      name: 'Pertanian Padi Sawah',
      badge: 'Video Rekayasa & Finansial',
      icon: 'agriculture',
      desc: 'Rekayasa Jajar Legowo & Pintu Air, Trik Perangkap Tikus TBS, Modal BOP Tani, HPP & Laba Panen (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video dengan menyapa ramah, menyebut identitas diri, dan kilas balik sektor padi sawah',
          guidedPoints: [
            'Sapa pemirsa: perkenalkan Nama, NISN, Kelas X SMAN 1 Belitang, peserta FINCESTEM 2026.',
            'Kilas balik singkat: "Pada video Day 5 kemarin, saya telah membahas sains tanah dan teknologi alat di sawah ini."',
            'Sampaikan fokus video Day 6: "Hari ini dalam video 5-10 menit, saya akan mengupas tuntas rekayasa solusi kendala sawah dan hitungan matematika finansial untung-rugi petani padi."'
          ],
          placeholder: 'Tuliskan kalimat pembuka video Day 6 sektor pertanian... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di tepi petak sawah yang siap dianalisis',
          defaultExp: 'Halo semuanya, berjumpa lagi dengan saya [Nama Siswa] dari kelas X SMAN 1 Belitang. Pada video kelanjutan Day 6 ini, saya kembali mengulas sektor pertanian padi sawah di Desa Sidomulyo. Selama 5-10 menit ke depan, saya akan menjelaskan pilar Rekayasa cara mengatasi kendala air dan hama, serta pilar Matematika Finansial mengenai modal dan keuntungan panen petani.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Pertanian (Klip D6_Pertanian_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Trik Praktis & Solusi Kendala Sawah (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa pola tanam Jajar Legowo, pintu air parit, dan perangkap hama tikus TBS',
          guidedPoints: [
            'Tunjukkan barisan tanaman padi yang tertata dengan lorong kosong (pola Jajar Legowo 2:1 atau 4:1).',
            'Jelaskan rekayasa lorong: mempermudah pemupukan, memperbanyak sinar matahari, dan memudahkan angin berhembus.',
            'Jelaskan rekayasa perangkap tikus berpagar plastik dan bubu (TBS) untuk menangkap tikus tanpa racun kimia.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa solusi kendala sawah yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan pola tanam Jajar Legowo dan pagar perangkap tikus',
          defaultExp: 'Dari pilar Rekayasa, petani Belitang menerapkan pola tanam Jajar Legowo dengan membuat lorong kosong berselang dua baris tanaman. Rekayasa tata letak ini memperbanyak intensitas sinar matahari dan memudahkan sirkulasi udara sehingga populasi hama jamur berkurang. Untuk mengatasi tikus, petani memasang pagar plastik pembatas dan perangkap bubu kawat di sudut sawah tanpa mencemari lingkungan.',
          defaultSources: 'Kajian Rekayasa Lapangan Pola Tanam Legowo dan Manajemen Hama Terpadu.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan catatan angka hitungan modal benih/pupuk, bagi hasil panen, dan omzet gabah',
          guidedPoints: [
            'Tunjukkan kertas catatan hitungan atau papan kecil ke kamera HP.',
            'Rinci modal operasional (BOP) 1 hektar: bajak tanah Rp1,2 juta, benih Rp400 ribu, pupuk Rp1,6 juta, pestisida Rp800 ribu, tenaga kerja Rp2 juta (Total Rp6 juta).',
            'Hitung hasil panen 6 ton gabah dijual Rp6.500/kg menghasilkan omzet Rp39 juta, dipotong biaya panen dan operasional menghasilkan laba bersih sekitar Rp28–30 juta.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial padi yang Anda ucapkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel coretan simulasi biaya operasional dan keuntungan panen gabah',
          defaultExp: 'Dari sisi Matematika Finansial, modal operasional budidaya padi per hektar berkisar Rp6.000.000 untuk pengolahan lahan, benih, pupuk, dan perawatan. Saat panen raya menghasilkan sekitar 6.000 kg gabah kering panen. Jika dijual dengan harga Rp6.500 per kg, omzet kotor mencapai Rp39.000.000. Setelah dipotong biaya mesin panen dan modal awal, petani memperoleh laba bersih sekitar Rp28.000.000 per musim tanam 4 bulan.',
          defaultSources: 'Kalkulasi Keuangan Usaha Tani Padi Sawah OKU Timur.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide pengemasan beras mandiri, penutup video, dan cek durasi footage HP',
          guidedPoints: [
            'Ajukan ide inovasi: petani jangan hanya menjual gabah basah ke tengkulak, tetapi menggilingnya sendiri dan mengemas beras 5 kg berlabel merek desa.',
            'Tutup video dengan kalimat bersemangat tentang kemandirian pangan generasi muda Belitang.',
            'Periksa rekaman di HP agar durasi genap 5-10 menit dengan suara jernih dan tampilan angka yang mudah terbaca.'
          ],
          placeholder: 'Tuliskan gagasan inovasi beras dan penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman video D6_PERTANIAN_FINANSIAL.mp4 di memori ponsel',
          defaultExp: 'Sebagai gagasan inovasi, petani disarankan menghilirisasi gabah menjadi beras kemasan 5 kg berlabel lokal Belitang agar keuntungan bertambah 30 persen dibanding menjual gabah basah. Rekaman video mandiri Day 6 ini telah tuntas berdurasi 8 menit 40 detik, siap diunggah ke YouTube sebagai kelengkapan tugas LKPD Day 6.',
          defaultSources: 'Rencana Inovasi Hilirisasi Beras dan Log File Video HP Siswa.'
        }
      ]
    },
    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Rakyat',
      badge: 'Video Rekayasa & Finansial',
      icon: 'forest',
      desc: 'Rekayasa Talang Pelindung Hujan & Rorak, Bagi Hasil Sadap 50:50, Margin Lelang Bokar UPPB (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebut identitas diri, dan kilas balik sektor perkebunan karet/sawit',
          guidedPoints: [
            'Buka video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains getah karet dan alat sadap.',
            'Tegaskan fokus video Day 6: mengupas rekayasa pelindung hujan batang karet dan hitungan pendapatan bulanan pekebun.'
          ],
          placeholder: 'Tuliskan draf sapaan pembuka video Day 6 perkebunan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di sela tegakan pohon karet',
          defaultExp: 'Halo semuanya, kembali lagi bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan materi perkebunan karet sebelumnya, pada video 5-10 menit ini saya akan menjelaskan rekayasa perlindungan pohon dari air hujan serta rincian matematika finansial pembagian hasil getah karet di OKU Timur.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Perkebunan (Klip D6_Perkebunan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Talang Pelindung Hujan & Konservasi Rorak (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa talang plastik penahan hujan dan parit rorak penahan air kebun',
          guidedPoints: [
            'Tunjukkan bagian batang pohon karet di atas alur sayatan sadap.',
            'Jelaskan rekayasa talang plastik pelindung hujan (rain gutter) yang mencegah air hujan merusak aliran getah.',
            'Jelaskan rekayasa parit rorak penampung seresah daun pelepah sawit/karet agar kebun tidak gersang saat kemarau.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa penanganan kendala kebun yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan talang plastik pelindung bidang sadap dan rorak resapan',
          defaultExp: 'Dari pilar Rekayasa, pekebun karet mengatasi kendala musim hujan dengan memasang talang plastik pelindung di atas irisan sadap. Rekayasa sederhana ini membelokkan air hujan agar tidak membasahi bidang sadap sehingga getah tidak hanyut terbawa air. Selain itu, dibuat lubang rorak di antara barisan pohon untuk menampung air hujan dan pupuk alami dari daun yang membusuk.',
          defaultSources: 'Kajian Rekayasa Lapangan Talang Sadap Hujan dan Rorak Kebun Karet.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan coretan hitungan bagi hasil penyadap 50:50 dan harga lelang UPPB',
          guidedPoints: [
            'Tunjukkan kertas coretan perhitungan ke arah kamera HP.',
            'Rinci hasil getah karet: kebun 2 hektar menghasilkan 600 kg bokar bekuan sebulan.',
            'Hitung sistem bagi hasil 50:50: pemilik mendapat 300 kg dan penyadap mendapat 300 kg. Jika dijual ke UPPB Rp13.000/kg, pemilik mengantongi omzet Rp3,9 juta dipotong biaya pupuk Rp900 ribu menjadi laba bersih Rp3 juta sebulan.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial kebun karet yang Anda ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Simulasi pembagian hasil panen bokar karet per bulan',
          defaultExp: 'Secara Matematika Finansial, kebun karet seluas 2 hektar mampu menghasilkan sekitar 600 kg bekuan karet bersih dalam sebulan. Dengan sistem bagi hasil 50:50, pemilik kebun menerima bagian 300 kg. Jika dijual melalui lelang UPPB seharga Rp13.000 per kg, omzet yang diperoleh sebesar Rp3.900.000. Setelah dipotong biaya pupuk dan herbisida Rp900.000, laba bersih pemilik mencapai Rp3.000.000 per bulan.',
          defaultSources: 'Kalkulasi Keuangan Bagi Hasil dan Lelang Karet UPPB OKU Timur.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide penjualan lelang UPPB bokar bersih dan penutup video rekaman HP',
          guidedPoints: [
            'Ajukan ide inovasi: pekebun wajib bersatu menjual karet lewat lelang UPPB kelompok tani agar harga tidak dimainkan tengkulak perorangan.',
            'Tutup video dengan pesan santun dan motivasi mengelola perkebunan secara berkelanjutan.',
            'Pastikan rekaman di HP berdurasi 5-10 menit dengan pencahayaan jelas dan intonasi suara tegas.'
          ],
          placeholder: 'Tuliskan ide inovasi lelang karet dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_KEBUN_FINANSIAL.mp4 di galeri smartphone',
          defaultExp: 'Sebagai gagasan inovasi, petani karet dianjurkan menghentikan kebiasaan merendam karet di kolam dan beralih ke bokar bersih lelang UPPB agar harga jual naik hingga Rp3.000 per kg. Seluruh pemaparan ini telah saya rekam mandiri selama 7 menit 40 detik dan siap diunggah ke YouTube untuk tugas LKPD Day 6.',
          defaultSources: 'Rencana Inovasi Pemasaran Bokar Bersih dan Log File Video HP.'
        }
      ]
    },
    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur',
      badge: 'Video Rekayasa & Finansial',
      icon: 'pets',
      desc: 'Rekayasa Ventilasi Kandang & Biogas, Modal Penggemukan Bakalan, Laba Sapi Kurban (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebut identitas diri, dan kilas balik sektor peternakan sapi/kambing',
          guidedPoints: [
            'Buka video dengan sapaan ramah: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains pakan fermentasi dan mesin chopper.',
            'Tegaskan topik video Day 6: mengulas rekayasa pengolahan kotoran biogas dan kalkulasi keuntungan usaha ternak sapi.'
          ],
          placeholder: 'Tuliskan draf sapaan pembuka video Day 6 peternakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di depan peternakan sapi desa',
          defaultExp: 'Halo semuanya, kembali bersama saya [Nama Siswa] dari SMAN 1 Belitang pada video kokurikuler Day 6. Melanjutkan observasi peternakan sapi kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa pengolahan limbah biogas serta kalkulasi matematika finansial modal dan keuntungan penggemukan sapi potong.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Peternakan (Klip D6_Ternak_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Ventilasi Kandang & Reaktor Biogas (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa atap monitor udara dan instalasi biogas penampung kotoran sapi',
          guidedPoints: [
            'Tunjukkan bentuk atap kandang bertingkat (monitor roof) yang membuang udara panas ke atas.',
            'Jelaskan rekayasa bak reaktor biogas beton di belakang kandang: kotoran sapi dialirkan ke dalam tangki tertutup untuk memproduksi gas memasak.',
            'Terangkan bagaimana rekayasa ini membuat kandang tidak berbau dan menghemat pengeluaran elpiji rumah tangga.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa ventilasi dan biogas kandang yang Anda tuturkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan atap ventilasi kandang dan tabung reaktor biogas',
          defaultExp: 'Dari sisi Rekayasa, kandang sapi dirancang dengan model atap bertingkat agar sirkulasi udara panas dan gas amonia langsung terbuang ke atas. Selain itu, peternak merekayasa saluran selokan menuju tabung reaktor biogas tertutup. Di dalam reaktor, kotoran sapi diubah oleh bakteri anaerob menjadi gas metana gratis yang dialirkan melalui pipa untuk kompor memasak di dapur.',
          defaultSources: 'Kajian Rekayasa Bangunan Kandang dan Reaktor Energi Biogas Desa.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan tabel coretan modal beli bakalan, pakan, dan harga jual sapi siap potong',
          guidedPoints: [
            'Tunjukkan lembar kertas catatan hitungan ke arah kamera HP.',
            'Rinci modal penggemukan 2 ekor sapi selama 100 hari: beli 2 pedet bakalan Rp24 juta, pakan konsentrat Rp4 juta, obat/perawatan Rp2 juta (Total modal Rp30 juta).',
            'Hitung penjualan: 2 ekor sapi dijual saat Idul Adha seharga Rp19,5 juta per ekor (Omzet Rp39 juta), sehingga laba bersih mencapai Rp9 juta (Rp4,5 juta per ekor).'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial penggemukan sapi yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel simulasi biaya penggemukan dan keuntungan panen sapi',
          defaultExp: 'Secara Matematika Finansial, penggemukan 2 ekor sapi selama 100 hari memerlukan modal beli bakalan Rp24.000.000, biaya pakan konsentrat dan dedak Rp4.000.000, serta obat dan perawatan Rp2.000.000, sehingga total modal Rp30.000.000. Menjelang hari raya, kedua sapi terjual seharga Rp19.500.000 per ekor menghasilkan omzet Rp39.000.000. Laba bersih yang diperoleh peternak mencapai Rp9.000.000.',
          defaultSources: 'Kalkulasi Keuangan Penggemukan Sapi Potong OKU Timur.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide komersialisasi pupuk bokashi kemasan dan penutup rekaman HP',
          guidedPoints: [
            'Ajukan ide inovasi: ampas kotoran biogas jangan dibuang, melainkan dikeringkan dan difermentasi menjadi pupuk bokashi kemasan karung seharga Rp25 ribu.',
            'Tutup video dengan kalimat ajakan berwirausaha peternakan modern bagi generasi muda.',
            'Pastikan file rekaman di HP memenuhi durasi 5-10 menit dengan kualitas video stabil dan jelas.'
          ],
          placeholder: 'Tuliskan ide inovasi pupuk bokashi dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_PETERNAKAN_FINANSIAL.mp4 di galeri ponsel',
          defaultExp: 'Sebagai gagasan inovasi, peternak dapat mengolah ampas padat kotoran sapi menjadi pupuk organik bokashi kemasan 20 kg seharga Rp25.000 per karung, memberikan tambahan pemasukan hingga jutaan rupiah. Seluruh video mandiri Day 6 ini telah saya tuntaskan berdurasi 8 menit 15 detik, siap diunggah ke YouTube untuk penilaian LKPD.',
          defaultSources: 'Rencana Inovasi Pupuk Organik Bokashi dan Log File Video HP Siswa.'
        }
      ]
    },
    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Air Tawar',
      badge: 'Video Rekayasa & Finansial',
      icon: 'phishing',
      desc: 'Rekayasa Tanggul Kolam & Central Drain, Rasio FCR Pakan, Modal Benih & Laba Panen Patin (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebutkan identitas diri, dan kilas balik sektor budidaya ikan patin/lele',
          guidedPoints: [
            'Buka video dengan percaya diri: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains mutu air dan teknologi aerator kincir.',
            'Tegaskan topik video Day 6: mengulas rekayasa kemiringan dasar kolam dan perhitungan matematika finansial panen ikan.'
          ],
          placeholder: 'Tuliskan kalimat pembuka video Day 6 perikanan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di samping kolam ikan patin',
          defaultExp: 'Halo semuanya, kembali lagi bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan pembahasan perikanan air tawar kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa saluran pembuangan kolam serta kalkulasi matematika finansial biaya pakan dan keuntungan panen ikan patin di Belitang.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Perikanan (Klip D6_Perikanan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Kemiringan Kolam & Budidaya Pakan Maggot (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa dasar kolam miring ke pipa tengah dan biopori pakan maggot BSF',
          guidedPoints: [
            'Tunjukkan bentuk kolam dan jelaskan rekayasa dasar kolam yang dibuat miring ke arah pipa tengah (central drain).',
            'Jelaskan bagaimana gaya gravitasi air mengumpulkan kotoran padat ke tengah sehingga mudah dibuang saat pipa diangkat.',
            'Jelaskan rekayasa kandang lalat BSF untuk memproduksi larva maggot gratis sebagai pengganti separuh pakan pelet pabrik yang mahal.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa kolam dan pakan alternatif maggot yang Anda ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan desain dasar kolam miring dan kotak budidaya maggot BSF',
          defaultExp: 'Dari pilar Rekayasa, dasar kolam tanah sengaja dibangun miring 2 persen mengarah ke pipa pembuangan tengah. Rekayasa hidrolika gravitasi ini mengendapkan kotoran feses ikan tepat di lubang pipa sehingga mudah dibuang tanpa menyedot air bersih. Untuk menyiasati mahalnya pakan pabrik, peternak membudidayakan maggot BSF dari limbah sayur pasar yang kaya protein dan hemat biaya.',
          defaultSources: 'Kajian Rekayasa Konstruksi Kolam dan Budidaya Maggot BSF Alternatif.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan coretan hitungan benih, biaya karung pelet FCR, dan omzet panen',
          guidedPoints: [
            'Tunjukkan lembar kertas hitungan ke arah kamera HP.',
            'Rinci modal 1 kolam tebar 3.000 ekor benih: beli benih Rp750 ribu, pakan pelet 1.500 kg Rp6,5 juta, listrik/probiotik Rp950 ribu (Total BOP Rp8,2 juta).',
            'Hitung panen dengan kelulushidupan 85% menghasilkan 1.275 kg patin. Dijual Rp11.000/kg menghasilkan omzet Rp14.025.000, dipotong modal Rp8,2 juta menghasilkan laba bersih Rp5.825.000 per siklus.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi finansial panen patin yang Anda paparkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel simulasi biaya pakan FCR dan omzet penjualan ikan patin',
          defaultExp: 'Secara Matematika Finansial, budidaya 3.000 benih patin membutuhkan biaya operasional Rp8.200.000 untuk benih, 50 sak pelet, dan listrik pompa. Saat panen dengan tingkat hidup 85 persen, diperoleh hasil 1.275 kg ikan patin. Dijual ke pengepul seharga Rp11.000 per kg, omzet yang masuk mencapai Rp14.025.000. Laba bersih yang dikantongi peternak adalah Rp5.825.000 per siklus 6 bulan.',
          defaultSources: 'Kalkulasi Keuangan Budidaya Patin dan Analisis Rasio Pakan FCR.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide hilirisasi fillet ikan patin beku dan penutup rekaman video HP',
          guidedPoints: [
            'Ajukan ide inovasi: jangan hanya menjual ikan patin hidup, tetapi olah menjadi daging fillet beku tanpa tulang atau kerupuk kemplang patin agar keuntungan berlipat ganda.',
            'Tutup video dengan pesan santun dan motivasi kemandirian perikanan pedesaan.',
            'Pastikan rekaman di HP berdurasi 5-10 menit dengan kualitas gambar terang dan audio terdengar jelas.'
          ],
          placeholder: 'Tuliskan ide inovasi olahan patin dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_PERIKANAN_FINANSIAL.mp4 di memori ponsel',
          defaultExp: 'Sebagai gagasan inovasi, pembudidaya dapat mengolah ikan patin segar menjadi produk fillet beku tanpa duri dan abon ikan berlabel lokal Belitang untuk menembus pasar swalayan dengan harga dua kali lipat. Pemaparan video mandiri Day 6 ini telah saya selesaikan berdurasi 8 menit tepat, siap diserahkan ke YouTube untuk LKPD Day 6.',
          defaultSources: 'Rencana Inovasi Hilirisasi Fillet Ikan dan Log File Video HP Siswa.'
        }
      ]
    },
    industri: {
      key: 'industri',
      name: 'Agro-Industri Pangan',
      badge: 'Video Rekayasa & Finansial',
      icon: 'precision_manufacturing',
      desc: 'Rekayasa Konveyor Pabrik & Siklon Debu, Modal Giling Gabah, HPP Beras & Margin Laba (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebut identitas diri, dan kilas balik sektor pengolahan pangan RMU/tahu',
          guidedPoints: [
            'Buka video dengan percaya diri: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains rendemen beras dan mesin rol karet husker.',
            'Tegaskan topik video Day 6: mengulas rekayasa cerobong debu pabrik dan kalkulasi laba harian giling gabah.'
          ],
          placeholder: 'Tuliskan kalimat pembuka video Day 6 agro-industri pangan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di area gudang beras pabrik RMU',
          defaultExp: 'Halo semuanya, kembali bersama saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan observasi pabrik penggilingan padi kemarin, di video 5-10 menit ini saya akan menjelaskan rekayasa saluran pembuangan debu sekam serta perhitungan matematika finansial modal pembelian gabah dan laba penjualan beras kemasan.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Agro-Industri (Klip D6_Industri_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Konveyor Mangkok & Siklon Pengendali Debu (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa lift pemindah beras otomatis dan corong siklon penyaring abu sekam',
          guidedPoints: [
            'Tunjukkan pipa tegak lift konveyor yang menghubungkan mesin pecah kulit ke mesin penyosoh.',
            'Jelaskan rekayasa otomatisasi: mangkok berjalan mengangkat beras secara vertikal tanpa tenaga angkat kuli.',
            'Sorot corong siklon di luar pabrik yang memutar udara buangan agar debu sekam jatuh ke bawah dan udara desa tetap bersih.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa konveyor dan siklon debu yang Anda paparkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan fisik pipa lift elevator vertikal dan tabung siklon debu',
          defaultExp: 'Dari sisi Rekayasa, pabrik RMU menerapkan sistem konveyor mangkok vertikal tertutup yang memindahkan beras antarmesin secara otomatis mengandalkan gaya gravitasi. Untuk menjaga lingkungan sekitar tetap sehat, cerobong pembuangan sekam dipasangi tabung siklon pemisah debu yang memanfaatkan gaya sentrifugal untuk mengendapkan abu sekam ke bawah sehingga tidak berhamburan ke rumah warga.',
          defaultSources: 'Kajian Rekayasa Alur Logistik Mesin RMU dan Pengendalian Emisi Siklon.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan tabel coretan pembelian 4 ton gabah, solar, upah giling, dan omzet beras',
          guidedPoints: [
            'Tunjukkan kertas coretan perhitungan ke arah kamera HP.',
            'Rinci biaya operasional giling 4.000 kg gabah: beli gabah Rp26 juta (Rp6.500/kg), solar Rp180 ribu, upah operator Rp250 ribu, karung Rp375 ribu, perawatan Rp100 ribu (Total Rp26,9 juta).',
            'Hitung hasil giling rendemen 65% menghasilkan 2.600 kg beras (dijual Rp11.500/kg = Rp29,9 juta) ditambah bekatul 320 kg (dijual Rp3.000/kg = Rp960 ribu). Total omzet Rp30,86 juta menghasilkan laba bersih Rp3,95 juta per hari operasi.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial giling padi yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel simulasi biaya giling gabah harian dan omzet beras RMU',
          defaultExp: 'Secara Matematika Finansial, dalam satu hari operasi menggiling 4.000 kg gabah dibutuhkan modal beli gabah Rp26.000.000 ditambah biaya solar, karung, dan upah operator sebesar Rp905.000, total biaya Rp26.905.000. Dari rendemen 65 persen dihasilkan 2.600 kg beras bernilai Rp29.900.000 dan bekatul senilai Rp960.000, sehingga omzet mencapai Rp30.860.000 dengan laba bersih Rp3.955.000 per hari.',
          defaultSources: 'Kalkulasi Keuangan Operasional Pabrik Giling Padi RMU Belitang.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide briket arang dari limbah sekam dan penutup video rekaman HP',
          guidedPoints: [
            'Ajukan ide inovasi: sekam padi jangan dibakar percuma, tetapi dipadatkan menjadi briket arang sekam sebagai bahan bakar murah rumah makan.',
            'Tutup video dengan pesan santun dan dorongan memajukan industri pangan lokal.',
            'Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas visual jelas dan suara narasi bersih.'
          ],
          placeholder: 'Tuliskan ide briket arang sekam dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_INDUSTRI_FINANSIAL.mp4 di galeri ponsel',
          defaultExp: 'Sebagai gagasan inovasi, limbah sekam padi yang melimpah dapat diolah menjadi briket arang padat berkalori tinggi untuk dijual ke industri tahu dan kuliner sebagai pengganti gas elpiji. Pemaparan video mandiri Day 6 ini telah saya tuntaskan berdurasi 8 menit 20 detik, siap dikirimkan ke YouTube untuk kelengkapan LKPD Day 6.',
          defaultSources: 'Rencana Inovasi Briket Sekam Padi dan Log File Video HP Siswa.'
        }
      ]
    },
    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan & Saprotan',
      badge: 'Video Rekayasa & Finansial',
      icon: 'storefront',
      desc: 'Rekayasa Gudang Palet & Antrean Kasir, Modal Kulakan Barang, HPP Ritel & Laba Bersih Toko (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebut identitas diri, dan kilas balik sektor perdagangan/kios',
          guidedPoints: [
            'Buka video dengan sapaan hangat: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains sifat kimia pupuk dan timbangan digital.',
            'Tegaskan topik video Day 6: mengulas rekayasa tata letak lorong toko dan perhitungan matematika margin keuntungan kulakan.'
          ],
          placeholder: 'Tuliskan draf sapaan pembuka video Day 6 perdagangan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di lorong rak barang dagangan',
          defaultExp: 'Halo semuanya, berjumpa kembali dengan saya [Nama Siswa] dari SMAN 1 Belitang di video kokurikuler Day 6. Melanjutkan observasi toko perdagangan kemarin, pada video 5-10 menit ini saya akan menjelaskan rekayasa tata letak etalase barang serta perhitungan matematika finansial modal kulakan dan laba bersih penjualan sembako/saprotan.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Perdagangan (Klip D6_Dagang_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Tata Letak FIFO & Repacking Kemasan Ritel (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa penataan barang lama di depan (FIFO) dan kemasan eceran 1 kg',
          guidedPoints: [
            'Tunjukkan deretan barang di rak etalase dan jelaskan rekayasa First In First Out (FIFO).',
            'Jelaskan mengapa barang yang masuk lebih awal ditaruh paling depan agar terjual duluan sebelum kedaluwarsa.',
            'Tunjukkan rekayasa kemasan repacking: mengemas gula atau beras dari karung 50 kg menjadi bungkusan 1 kg agar terjangkau dan menguntungkan.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa tata letak toko dan repacking yang Anda ceritakan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan susunan rak barang FIFO dan plastik repacking berlabel',
          defaultExp: 'Dari pilar Rekayasa, pemilik toko menata barang dengan sistem First In First Out (FIFO) di mana stok lama digeser ke baris paling depan agar dibeli konsumen lebih awal sehingga menghindari risiko kedaluwarsa. Selain itu, toko melakukan rekayasa repacking dengan mengemas ulang karung gula pasir 50 kg menjadi kemasan praktis 1 kg higienis yang disukai ibu rumah tangga dan bernilai jual lebih tinggi.',
          defaultSources: 'Kajian Rekayasa Tata Kelola Gudang Ritel dan Sistem FIFO Toko.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan coretan hitungan modal kulakan mingguan Rp16 juta, margin 15%, dan laba toko',
          guidedPoints: [
            'Tunjukkan lembar kertas hitungan ke arah kamera HP.',
            'Rinci modal kulakan mingguan sembako: beras, minyak, gula, telur, mie instan total Rp16.000.000 ditambah operasional listrik/kresek Rp400.000 (Total modal Rp16,4 juta).',
            'Hitung penjualan dengan margin laba 15%: omzet kotor mencapai Rp18.400.000. Laba bersih yang diperoleh pemilik toko adalah Rp2.000.000 per minggu atau Rp8.000.000 per bulan.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial toko yang Anda sampaikan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel coretan kalkulasi perputaran modal kulakan dan laba mingguan',
          defaultExp: 'Secara Matematika Finansial, perputaran stok mingguan memerlukan modal kulakan sebesar Rp16.000.000 untuk beras, minyak, dan telur, ditambah biaya operasional Rp400.000. Toko menetapkan margin keuntungan rata-rata 15 persen di atas harga distributor, menghasilkan omzet penjualan Rp18.400.000 per minggu. Setelah dipotong modal dan operasional, laba bersih yang diperoleh adalah Rp2.000.000 per minggu atau Rp8.000.000 per bulan.',
          defaultSources: 'Kalkulasi Keuangan Ritel dan Margin Keuntungan Toko Sembako Belitang.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide layanan pesan antar WhatsApp desa dan penutup rekaman HP',
          guidedPoints: [
            'Ajukan ide inovasi: toko membuka layanan pesan antar belanja via WhatsApp gratis ongkir untuk radius 2 km dan menyediakan pembayaran QRIS.',
            'Tutup video dengan pesan santun dan motivasi pentingnya kejujuran timbangan dalam berniaga.',
            'Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas gambar fokus dan suara narasi bersih.'
          ],
          placeholder: 'Tuliskan ide pesan antar WhatsApp dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_DAGANG_FINANSIAL.mp4 di memori ponsel',
          defaultExp: 'Sebagai gagasan inovasi, toko dapat meluncurkan layanan pesan antar belanja kebutuhan harian melalui grup WhatsApp desa dengan pembayaran QRIS untuk mempermudah warga yang sibuk bekerja di sawah. Seluruh video mandiri Day 6 ini telah saya tuntaskan berdurasi 7 menit 50 detik, siap dikirim ke YouTube untuk penilaian LKPD.',
          defaultSources: 'Rencana Inovasi Digital Toko Desa dan Log File Video HP Siswa.'
        }
      ]
    },
    formal: {
      key: 'formal',
      name: 'Jasa Keuangan Mikro',
      badge: 'Video Rekayasa & Finansial',
      icon: 'account_balance',
      desc: 'Rekayasa Loket Akrilik & Dual-SIM Router, Likuiditas Kas Tunai, Omzet Fee Admin Transaksi (5-10 Menit)',
      cards: [
        {
          key: 'A',
          title: 'Kilas Balik Sektor & Gambaran Umum Masalah (00:00–01:30)',
          subtitle: 'Membuka video, menyebut identitas diri, dan kilas balik sektor jasa keuangan agen BRILink/BUMDes',
          guidedPoints: [
            'Buka video dengan santun: sebutkan Nama, NISN, Kelas X SMAN 1 Belitang.',
            'Kilas balik singkat materi Day 5 mengenai sains deteksi lampu UV dan teknologi mesin EDC.',
            'Tegaskan topik video Day 6: mengulas rekayasa keamanan konter transaksi dan perhitungan matematika pendapatan fee admin.'
          ],
          placeholder: 'Tuliskan kalimat pembuka video Day 6 jasa keuangan mikro... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Rekaman kamera depan HP di dekat meja konter agen keuangan',
          defaultExp: 'Halo semuanya, berjumpa kembali dengan saya [Nama Siswa] dari SMAN 1 Belitang pada video kokurikuler Day 6. Melanjutkan observasi agen BRILink kemarin, pada video 5-10 menit ini saya akan menjelaskan rekayasa keamanan loket dan cadangan sinyal internet, serta perhitungan matematika finansial modal likuiditas dan keuntungan fee admin bulanan.',
          defaultSources: 'Draf Naskah Pembukaan Video Finansial Agen Keuangan (Klip D6_Keuangan_01).'
        },
        {
          key: 'B',
          title: 'Penjelasan Mandiri Pilar Rekayasa: Loket Akrilik & Dual-SIM Failover Router (01:30–04:30)',
          subtitle: 'Menerangkan rekayasa baki geser laci kasir dan router dua kartu SIM anti sinyal hilang',
          guidedPoints: [
            'Tunjukkan loket konter bersekat kaca/akrilik dan celah baki geser untuk menyerahkan uang tunai.',
            'Jelaskan rekayasa keselamatan: menjaga jarak aman agen dan melindungi tombol PIN nasabah dari pengintaian orang lain.',
            'Tunjukkan router internet dengan dua kartu SIM (Dual-SIM) yang otomatis beralih operator jika sinyal salah satu kartu melemah.'
          ],
          placeholder: 'Tuliskan penjelasan rekayasa keamanan loket dan jaringan internet yang Anda tuturkan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Pengamatan fisik loket bersekat akrilik dan lampu indikator router 4G',
          defaultExp: 'Dari sisi Rekayasa, meja loket agen dirancang dengan sekat akrilik transparan dan baki geser uang tunai untuk menjamin privasi tombol PIN nasabah serta menjaga keamanan dari aksi pencurian. Untuk mengatasi kendala sinyal internet desa yang sering drop saat hujan, agen memasang router Dual-SIM failover yang otomatis memindahkan koneksi ke operator cadangan dalam hitungan detik tanpa memutus transaksi.',
          defaultSources: 'Kajian Rekayasa Fisik Loket Transaksi dan Keandalan Jaringan Dual-SIM.'
        },
        {
          key: 'C',
          title: 'Penjelasan Mandiri Pilar Matematika Finansial: Modal, Omzet & Laba Bersih (04:30–07:30)',
          subtitle: 'Memperlihatkan coretan hitungan modal likuiditas Rp60 juta, 40 transaksi harian, dan laba fee admin',
          guidedPoints: [
            'Tunjukkan lembar kertas hitungan ke arah kamera HP.',
            'Rinci modal likuiditas: saldo rekening bank Rp35 juta dan uang tunai di laci Rp25 juta (Total Rp60 juta modal putar).',
            'Hitung pendapatan fee: 40 transaksi sehari dengan fee bersih Rp3.000 per transaksi menghasilkan Rp120.000 per hari (Rp3.600.000 per bulan). Dipotong biaya kuota dan kertas Rp500.000 menghasilkan laba bersih Rp3.100.000 per bulan.'
          ],
          placeholder: 'Tuliskan rincian kalkulasi matematika finansial agen perbankan yang Anda jelaskan... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: Tabel coretan simulasi fee administrasi harian dan laba bulanan',
          defaultExp: 'Secara Matematika Finansial, agen mengelola modal likuiditas perputaran sebesar Rp60.000.000 yang terbagi atas saldo rekening bank Rp35 juta dan uang tunai brankas Rp25 juta. Dengan melayani rata-rata 40 transaksi per hari dan bagian fee bersih agen Rp3.000 per transaksi, diperoleh pemasukan Rp120.000 per hari atau Rp3.600.000 per bulan. Setelah dikurangi biaya operasional kuota dan kertas Rp500.000, laba bersih agen mencapai Rp3.100.000 per bulan.',
          defaultSources: 'Kalkulasi Keuangan Fee Transaksi dan Likuiditas Agen BRILink Belitang.'
        },
        {
          key: 'D',
          title: 'Gagasan Inovasi Nilai Tambah & Naskah Lengkap Video (07:30–10:00)',
          subtitle: 'Merumuskan ide manajemen kas saat panen raya padi dan penutup video rekaman HP',
          guidedPoints: [
            'Ajukan ide inovasi: saat musim panen raya tiba, agen berkoordinasi dengan kelompok tani untuk menjadwalkan pencairan uang agar persediaan kas tunai tidak mendadak habis.',
            'Tutup video dengan pesan santun dan dorongan literasi keuangan bagi masyarakat desa.',
            'Pastikan file rekaman di HP berdurasi 5-10 menit dengan kualitas visual jelas dan suara narasi bersih.'
          ],
          placeholder: 'Tuliskan ide manajemen kas panen raya dan kalimat penutup video Anda... (Minimal 80 karakter)',
          sourcePlaceholder: 'Contoh: File rekaman D6_KEUANGAN_FINANSIAL.mp4 di galeri ponsel',
          defaultExp: 'Sebagai gagasan inovasi, agen dapat membentuk kesepakatan jadwal penarikan tunai bertahap dengan kelompok tani saat musim panen raya padi tiba agar perputaran kas tidak mengalami kekosongan mendadak. Pemaparan video mandiri Day 6 ini telah saya selesaikan berdurasi 8 menit 10 detik, siap diserahkan ke YouTube untuk penilaian LKPD Day 6.',
          defaultSources: 'Rencana Inovasi Manajemen Kas Likuiditas dan Log File Video HP Siswa.'
        }
      ]
    }
  }
};

// Replace NFT_MATERI_CONFIG[5] and [6] in content
console.log('Replacing NFT_MATERI_CONFIG 5 and 6...');
const d5Regex = /5:\s*\{[\s\S]*?\},(?=\s*6:\s*\{)/;
const d6Regex = /6:\s*\{[\s\S]*?\},(?=\s*7:\s*\{)/;

const d5Code = `5: ${JSON.stringify(MATERI_DAY5, null, 6)},`;
const d6Code = `6: ${JSON.stringify(MATERI_DAY6, null, 6)},`;

if (d5Regex.test(content)) {
  content = content.replace(d5Regex, d5Code);
  console.log('Replaced MATERI_CONFIG[5] successfully.');
} else {
  console.error('Failed to match MATERI_CONFIG[5]');
  process.exit(1);
}

if (d6Regex.test(content)) {
  content = content.replace(d6Regex, d6Code);
  console.log('Replaced MATERI_CONFIG[6] successfully.');
} else {
  console.error('Failed to match MATERI_CONFIG[6]');
  process.exit(1);
}

// Now update sector handling in renderNonFieldTripDayModule for Day 5 and Day 6!
// 1. Detection of selectedSector
const oldSectorDetect = /if \(dayNum === 3 \|\| dayNum === 4\) \{\r?\n\s*if \(savedOfficial && savedOfficial\.selectedSector && cfg\.sectors && cfg\.sectors\[savedOfficial\.selectedSector\]\) \{\r?\n\s*selectedSector = savedOfficial\.selectedSector;\r?\n\s*\} else \{\r?\n\s*const localSec = \(dayNum === 4\)[\s\S]*?\}\r?\n\s*\}\r?\n\s*\}/;

const newSectorDetect = `if (dayNum >= 3 && dayNum <= 6) {
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
    }`;

if (oldSectorDetect.test(content)) {
  content = content.replace(oldSectorDetect, newSectorDetect);
  console.log('Replaced selectedSector detection successfully.');
} else {
  console.warn('Could not match oldSectorDetect');
}

// 2. activeCards definition:
content = content.replace(
  /const activeCards = \(\(dayNum === 3 \|\| dayNum === 4\) && cfg\.sectors && cfg\.sectors\[selectedSector\]\)/g,
  'const activeCards = ((dayNum >= 3 && dayNum <= 6) && cfg.sectors && cfg.sectors[selectedSector])'
);

// 3. Dropdown UI block rendering:
content = content.replace(
  /\$\{\(dayNum === 3 \|\| dayNum === 4\) \? \`/g,
  '${(dayNum >= 3 && dayNum <= 6) ? `'
);

// 4. Dropdown onchange in render:
content = content.replace(
  /onchange="\$\{dayNum === 4 \? 'selectDay4Sector\(this\.value\)' : 'selectDay3Sector\(this\.value\)'\}"/g,
  'onchange="${dayNum === 6 ? \'selectDay6Sector(this.value)\' : (dayNum === 5 ? \'selectDay5Sector(this.value)\' : (dayNum === 4 ? \'selectDay4Sector(this.value)\' : \'selectDay3Sector(this.value)\'))}"'
);

// 5. Section titles and descriptions in single focus card:
content = content.replace(
  /badge: dayNum === 4 \? 'Jelajah Sawah & Saluran Irigasi' : 'Lumbung Pangan Komering'/g,
  "badge: (dayNum === 6 ? 'Video Rekayasa & Finansial' : (dayNum === 5 ? 'Video Sains & Teknologi' : (dayNum === 4 ? 'Jelajah Sawah & Saluran Irigasi' : 'Lumbung Pangan Komering')))"
);

content = content.replace(
  /desc: dayNum === 4 \? 'Akses Jalan Usaha Tani, Hamparan Sawah Irigasi, Pasokan Pupuk & Angkutan Panen' : 'Padi Sawah, Saluran Irigasi BK, Traktor\/Combine & Ubinan HPP'/g,
  "desc: (dayNum >= 5 ? 'Video Presentasi Mandiri HP (5-10 Menit), Sains-Teknologi atau Rekayasa-Finansial Sektor Padi' : (dayNum === 4 ? 'Akses Jalan Usaha Tani, Hamparan Sawah Irigasi, Pasokan Pupuk & Angkutan Panen' : 'Padi Sawah, Saluran Irigasi BK, Traktor/Combine & Ubinan HPP'))"
);

// 6. Character limit checks:
content = content.replace(
  /\(dayNum === 3 \|\| dayNum === 4\) \? 50 : 100/g,
  '(dayNum >= 3 && dayNum <= 6) ? 50 : 100'
);

content = content.replace(
  /\(dayNum === 3 \|\| dayNum === 4\) \? 80 : 300/g,
  '(dayNum >= 3 && dayNum <= 6) ? 80 : 300'
);

content = content.replace(
  /\(dayNum === 3 \|\| dayNum === 4\) \? 10 : 20/g,
  '(dayNum >= 3 && dayNum <= 6) ? 10 : 20'
);

content = content.replace(
  /\(dayNum === 3\) \? '4' : '5'/g,
  '(dayNum >= 3 && dayNum <= 6) ? \'4\' : \'5\''
);

content = content.replace(
  /\(dayNum === 3\) \? '80' : '300'/g,
  '(dayNum >= 3 && dayNum <= 6) ? \'80\' : \'300\''
);

// 7. Add selectDay5Sector & selectDay6Sector helpers before renderDay0NonFieldTripModule
const sectorHelpers = `
  window.selectDay5Sector = function(sectorKey) {
    if (window[\`isNftD5Submitted\`]) {
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
    if (window[\`isNftD6Submitted\`]) {
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
`;

if (!content.includes('window.selectDay5Sector')) {
  content = content.replace('window.renderDay0NonFieldTripModule = renderDay0NonFieldTripModule;', sectorHelpers + '\n  window.renderDay0NonFieldTripModule = renderDay0NonFieldTripModule;');
  console.log('Added selectDay5Sector and selectDay6Sector helpers.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('materi-nonfieldtrip.js updated and written successfully!');
