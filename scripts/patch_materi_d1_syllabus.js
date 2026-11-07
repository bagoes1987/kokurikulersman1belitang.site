// scripts/patch_materi_d1_syllabus.js
// Script untuk merevisi NFT_MATERI_CONFIG[1] dan memperkaya tampilan modul Day 1 di js/modules/materi-nonfieldtrip.js

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let code = fs.readFileSync(targetFile, 'utf8');

console.log('Target file length before:', code.length);

// 1. Data Konfigurasi Day 1 yang baru dengan 100% kesesuaian silabus dan Bahan Bacaan Lengkap
const newDay1Config = `    1: {
      dayNum: 1,
      title: 'Modul Pembelajaran Day 1: Kegiatan Ekonomi, Literasi Finansial, Kebanksentralan, Badan Usaha & Potensi OKU Timur',
      theme: 'Pilar Financial & Economics',
      gradientClass: 'from-teal-800 via-teal-900 to-slate-950 border-teal-700/40',
      tagColorClass: 'bg-white/20 text-teal-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Kajian Ilmiah Terpadu: Hakikat Kegiatan Ekonomi (Produksi-Distribusi-Konsumsi & 3 Sektor Aktivitas), Literasi & Pengelolaan Finansial, Kebanksentralan Bank Indonesia, Badan Usaha & Koperasi UU 25/1992, serta Pemetaan Sektor Ekonomi Unggulan OKU Timur',
      inquiryIntro: 'Pelajarilah seluruh 5 materi pokok FINCESTEM Day 1 berikut secara saksama. Bacalah bahan ajar terstruktur pada setiap kartu, pahami keterkaitan konsep dengan kondisi riil di Kabupaten OKU Timur, lalu tuliskan sintesis pemahaman dan analisis kritis Anda pada kolom yang disediakan.',
      cards: [
        {
          key: 'A',
          title: 'A. Kegiatan Ekonomi',
          subtitle: 'Pengertian Kegiatan Ekonomi, Produksi-Distribusi-Konsumsi & Tiga Sektor Utama Aktivitas',
          syllabusItems: [
            '1. Pengertian kegiatan ekonomi',
            '2. Produksi, distribusi, dan konsumsi',
            '3. Sektor utama aktivitas ekonomi:\\n   - Sektor primer\\n   - Sektor sekunder\\n   - Sektor tersier'
          ],
          guidedPoints: [
            'Pengertian kegiatan ekonomi: Hakikat upaya dan tindakan rasional manusia dalam memenuhi berbagai kebutuhan hidup yang tak terbatas dengan mengoptimalkan sumber daya alam dan modal yang terbatas (kelangkaan / scarcity).',
            'Produksi, distribusi, dan konsumsi: Rantai nilai ekonomi yang saling terkait erat, mulai dari penciptaan faedah bentuk/tempat (produksi), penyaluran tepat waktu ke pasar (distribusi), hingga pemanfaatan nilai guna oleh masyarakat (konsumsi).',
            'Sektor utama aktivitas ekonomi di OKU Timur:\\n- Sektor Primer: Pemanfaatan langsung sumber daya alam tanpa olahan rumit (pertanian padi sawah, perkebunan karet/kelapa sawit, peternakan sapi/unggas, budidaya patin/lele).\\n- Sektor Sekunder: Pengolahan bahan mentah menjadi barang jadi/setengah jadi bernilai tambah (kilang beras RMU, industri pengolahan getah karet, pabrik pakan, pengolahan keripik pisang/kemplang).\\n- Sektor Tersier: Penyedia jasa, distribusi, dan keuangan (Pasar Gumawang Belitang, angkutan logistik truk panen, perbankan BRI/Bank Sumsel Babel, Agen BRILink, dan koperasi desa).'
          ],
          studyMaterial: \`
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <h5 class="font-extrabold text-teal-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-teal-800 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Pengertian Kegiatan Ekonomi</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Kegiatan ekonomi adalah segala bentuk usaha, tindakan, dan perilaku manusia yang ditujukan untuk memenuhi berbagai macam kebutuhan hidup yang beraneka ragam dan tidak terbatas, dengan memanfaatkan sumber daya yang ketersediaannya terbatas (konsep kelangkaan atau <em>scarcity</em>). Kegiatan ekonomi dilandasi oleh <strong>Prinsip Ekonomi</strong>, yaitu bertindak dengan pengorbanan tertentu untuk memperoleh hasil yang maksimal, atau dengan pengorbanan sekecil-kecilnya untuk memperoleh hasil tertentu yang diharapkan secara efisien dan bertanggung jawab.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <h5 class="font-extrabold text-sky-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-sky-800 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Produksi, Distribusi, dan Konsumsi</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>a. Produksi:</strong> Kegiatan menghasilkan barang/jasa atau meningkatkan nilai guna (<em>utility</em>) suatu benda. Nilai guna mencakup faedah bentuk (<em>form utility</em>), faedah tempat (<em>place utility</em>), dan faedah kepemilikan (<em>ownership utility</em>). Faktor produksi meliputi Sumber Daya Alam (lahan pertanian OKU Timur), Tenaga Kerja, Modal (mesin alsintan), dan Kewirausahaan (<em>entrepreneurship</em>).</li>
                  <li><strong>b. Distribusi:</strong> Kegiatan menyalurkan barang dan jasa dari produsen kepada konsumen. Bentuk saluran distribusi meliputi distribusi langsung (dari petani langsung ke pembeli), distribusi semi-langsung (melalui kios milik produsen), dan distribusi tidak langsung (melalui pedagang pengepul, grosir pasar Gumawang, hingga pedagang eceran).</li>
                  <li><strong>c. Konsumsi:</strong> Kegiatan mengurangi atau menghabiskan nilai guna suatu barang dan jasa guna memenuhi kebutuhan hidup sehari-hari. Pola konsumsi dipengaruhi tingkat pendapatan, harga barang, gaya hidup, dan perkiraan harga masa depan.</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <h5 class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-emerald-800 text-white flex items-center justify-center text-[11px] font-black">3</span>
                  <span>Sektor Utama Aktivitas Ekonomi</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Sektor Primer:</strong> Sektor hulu yang mengekstrak langsung bahan mentah dari alam. Di OKU Timur mencakup hamparan tanaman pangan padi sawah beririgasi Komering, kebun karet rakyat, kebun kelapa sawit, peternakan sapi potong, serta kolam budidaya ikan patin dan lele.</li>
                  <li><strong>- Sektor Sekunder:</strong> Sektor pengolahan dan manufaktur yang mengubah bahan mentah menjadi produk jadi bernilai jual tinggi. Di OKU Timur dicontohkan oleh pabrik kilang beras (<em>Rice Milling Unit</em> / RMU) yang memproses gabah menjadi beras kemasan premium, pengolahan lateks menjadi bokar lembaran sit asap/angin, pabrik pakan ikan mandiri, serta UMKM olahan keripik pisang dan kemplang.</li>
                  <li><strong>- Sektor Tersier:</strong> Sektor penyedia jasa dan distribusi yang mempertemukan produsen dengan konsumen. Mencakup aktivitas niaga di Pasar Gumawang Belitang, jasa transportasi angkutan hasil panen, lembaga perbankan (Bank BRI, Bank Sumsel Babel, Agen BRILink), kelembagaan Koperasi, serta jasa reparasi mekanik traktor.</li>
                </ul>
              </div>
            </div>
          \`,
          placeholder: 'Tuliskan telaah komprehensif Anda mengenai pengertian kegiatan ekonomi, keterkaitan rantai produksi-distribusi-konsumsi, serta pembagian tiga sektor (primer, sekunder, dan tersier) beserta contoh nyatanya di Kabupaten OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\\n1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab 1 Kegiatan Ekonomi.\\n2. Modul Teori Ekonomi Mikro Pengantar, Fakultas Ekonomi Universitas Sriwijaya.',
          defaultExp: 'Kajian komprehensif mengenai kegiatan ekonomi menegaskan bahwa aktivitas pemenuhan kebutuhan manusia tersusun atas rantai nilai organik produksi, distribusi, dan konsumsi. Di Kabupaten OKU Timur, keterpaduan tiga sektor tampak nyata: sektor primer (pertanian padi sawah beririgasi Belitang, perkebunan karet, dan peternakan sapi) berperan sebagai penyedia bahan mentah; sektor sekunder (industri penggilingan padi RMU dan olahan pangan) mengolah bahan mentah menjadi komoditas beras kemasan bernilai tambah tinggi; sedangkan sektor tersier (pasar grosir Gumawang, jasa logistik angkutan truk, dan jaringan perbankan/BRILink) menjamin kelancaran arus barang dan uang hingga ke konsumen akhir secara berkelanjutan.',
          defaultSources: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab 1 Kegiatan Ekonomi.\\n2. Modul Pengantar Teori Ekonomi Mikro dan Perencanaan Wilayah, Fakultas Ekonomi Universitas Sriwijaya.'
        },
        {
          key: 'B',
          title: 'B. Literasi dan Pengelolaan Keuangan (Financial Literacy)',
          subtitle: 'Empat Jenis Finansial & Lima Aspek Krusial Pengelolaan Arus Kas',
          syllabusItems: [
            '1. Jenis-jenis finansial:\\n   - Keuangan pribadi (personal finance)\\n   - Keuangan bisnis (business finance)\\n   - Keuangan publik (public finance)\\n   - Keuangan internasional (international finance)',
            '2. Aspek pengelolaan keuangan:\\n   - Pemasukan dan pengeluaran\\n   - Anggaran dan tabungan\\n   - Dana darurat\\n   - Investasi\\n   - Pengelolaan keuangan'
          ],
          guidedPoints: [
            'Jenis-jenis finansial:\\n- Keuangan pribadi (personal finance): Tata kelola anggaran individu/keluarga, kebutuhan vs keinginan, dan proteksi masa depan.\\n- Keuangan bisnis (business finance): Manajemen modal kerja usaha, profitabilitas, pemisahan rekening pribadi dan operasional usaha.\\n- Keuangan publik (public finance): Pengelolaan APBD OKU Timur untuk fasilitas publik, perbaikan saluran irigasi, dan subsidi pertanian.\\n- Keuangan internasional (international finance): Arus perdagangan ekspor komoditas (ekspor karet bokar/minyak sawit CPO) dan fluktuasi kurs mata uang asing.',
            'Aspek pengelolaan keuangan:\\n- Pemasukan dan pengeluaran: Pencatatan arus kas masuk-keluar secara tertib agar tercipta surplus kas.\\n- Anggaran dan tabungan: Formula alokasi dana tertulis (metode 50/30/20) dan disiplin menabung di awal (pay yourself first).\\n- Dana darurat: Cadangan simpanan likuid minimal 3-6 kali beban pengeluaran untuk mitigasi musibah tak terduga / gagal panen.\\n- Investasi: Penempatan modal pada aset produktif legal yang diawasi OJK (emas, reksadana, bibit ternak, alsintan).\\n- Pengelolaan keuangan & utang: Manajemen batas rasio utang aman (Debt Service Ratio < 30%), pemanfaatan kredit produktif resmi (KUR BRI), dan mitigasi bahaya pinjaman online ilegal atau rentenir.'
          ],
          studyMaterial: \`
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <h5 class="font-extrabold text-teal-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-teal-800 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Jenis-Jenis Finansial</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Keuangan Pribadi (<em>Personal Finance</em>):</strong> Tata kelola keputusan keuangan individu atau rumah tangga, mencakup pengelolaan pendapatan (uang saku/gaji), pemenuhan kebutuhan primer, pengendalian keinginan konsumtif, perencanaan tabungan terstruktur, dan perlindungan masa depan.</li>
                  <li><strong>- Keuangan Bisnis (<em>Business Finance</em>):</strong> Pengelolaan permodalan, arus kas operasional, dan alokasi aset pada suatu badan usaha (UMKM, perseroan, atau koperasi) guna membiayai produksi, pengadaan bahan baku, ekspansi usaha, serta pemisahan mutlak antara uang pribadi dan kas operasional usaha.</li>
                  <li><strong>- Keuangan Publik (<em>Public Finance</em>):</strong> Pengelolaan penerimaan daerah/negara (pajak, retribusi) dan belanja pemerintah melalui APBN/APBD. Di OKU Timur, keuangan publik diwujudkan dalam pembiayaan infrastruktur jalan usaha tani, perbaikan pintu air irigasi, dan bantuan sarana pertanian.</li>
                  <li><strong>- Keuangan Internasional (<em>International Finance</em>):</strong> Pengelolaan transaksi moneter lintas batas negara, meliputi perdagangan komoditas ekspor-impor (seperti penjualan komoditas karet alam dan minyak sawit CPO Indonesia ke pasar global), mekanisme Letter of Credit (L/C), serta mitigasi risiko fluktuasi nilai tukar valuta asing (kurs valas).</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <h5 class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-amber-800 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Aspek Pengelolaan Keuangan (Financial Management)</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Pemasukan dan Pengeluaran:</strong> Melakukan pencatatan arus kas (<em>cash flow</em>) harian secara akurat. Kondisi keuangan dinyatakan sehat apabila arus kas berada dalam posisi surplus (pemasukan lebih besar daripada pengeluaran).</li>
                  <li><strong>- Anggaran dan Tabungan:</strong> Merancang anggaran pembelanjaan dengan menerapkan aturan rasional seperti <strong>Metode 50/30/20</strong> (50% untuk kebutuhan pokok/needs, 30% untuk keinginan rasional/wants, dan 20% dialokasikan wajib untuk tabungan dan investasi masa depan di awal menerima uang / <em>pay yourself first</em>).</li>
                  <li><strong>- Dana Darurat (<em>Emergency Fund</em>):</strong> Simpanan kas likuid yang mudah dicairkan sewaktu-waktu, khusus digunakan untuk mengantisipasi kejadian darurat yang tak terduga (misalnya sakit, kecelakaan, atau perbaikan mesin produksi mendadak). Nilai idealnya berkisar antara 3 hingga 6 kali total pengeluaran rutin bulanan.</li>
                  <li><strong>- Investasi:</strong> Komitmen menempatkan sejumlah dana pada instrumen produktif yang memiliki potensi pertumbuhan nilai di masa depan guna melindungi daya beli dari inflasi. Contoh instrumen legal yang diawasi Otoritas Jasa Keuangan (OJK): reksadana, emas batangan, hewan ternak indukan, atau perlengkapan mesin usaha produktif.</li>
                  <li><strong>- Pengelolaan Keuangan & Utang:</strong> Tata kelola risiko utang agar tidak membebani arus kas. Utang hanya dianjurkan untuk tujuan produktif (misalnya Kredit Usaha Rakyat / KUR BRI dengan subsidi bunga) dengan rasio cicilan maksimal 30% dari pemasukan bulanan (<em>Debt Service Ratio</em>), serta wajib menghindari pinjol ilegal dan rentenir.</li>
                </ul>
              </div>
            </div>
          \`,
          placeholder: 'Uraikan pemahaman Anda mengenai 4 jenis finansial (pribadi, bisnis, publik, internasional) dan 5 aspek tata kelola keuangan (pemasukan/pengeluaran, anggaran/tabungan, dana darurat, investasi, serta pengelolaan utang/risiko)... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\\n1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI 2023).\\n2. Modul Manajemen Keuangan Keluarga & UMKM, Bank Indonesia.',
          defaultExp: 'Literasi keuangan merupakan kecakapan hidup mendasar yang mencakup pemahaman empat jenis finansial: keuangan pribadi (tata kelola uang individu/keluarga), keuangan bisnis (manajemen modal kerja UMKM tanpa mencampur kas pribadi), keuangan publik (alokasi APBD OKU Timur bagi infrastruktur irigasi), dan keuangan internasional (transaksi ekspor karet/sawit dan fluktuasi valas). Dalam tataran praktis, tata kelola keuangan bertumpu pada lima aspek utama: disiplin mencatat pemasukan-pengeluaran agar surplus kas, menyusun anggaran 50/30/20 dan menabung di awal, menyiapkan dana darurat 3-6 bulan pengeluaran untuk antisipasi risiko, berinvestasi pada instrumen legal berizin OJK, serta mengelola pinjaman produktif dengan rasio cicilan di bawah 30% seraya menjauhi pinjol ilegal dan rentenir.',
          defaultSources: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI 2023).\\n2. Modul Manajemen Keuangan Keluarga dan Pelaku Usaha Mikro, Bank Indonesia.'
        },
        {
          key: 'C',
          title: 'C. Kebanksentralan',
          subtitle: 'Pengertian Kebanksentralan, Tugas & Fungsi Bank Sentral, Mengenal Bank Indonesia & Stabilitas Rupiah',
          syllabusItems: [
            '1. Pengertian kebanksentralan',
            '2. Tugas dan fungsi utama bank sentral',
            '3. Mengenal Bank Indonesia',
            '4. Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah'
          ],
          guidedPoints: [
            'Pengertian kebanksentralan: Lembaga negara berdaulat yang memegang otoritas moneter tertinggi dan tidak berorientasi pada pencarian laba komersial.',
            'Tugas dan fungsi utama bank sentral: Menetapkan kebijakan moneter (pengendalian inflasi dan suku bunga BI-Rate), mengatur kelancaran sistem pembayaran nasional, dan memelihara stabilitas sistem keuangan (Lender of the Last Resort).',
            'Mengenal Bank Indonesia: Bank sentral Republik Indonesia yang memiliki kedudukan independen (UU No. 23/1999 jo UU No. 4/2023 tentang P2SK) dengan tujuan tunggal mencapai dan memelihara kestabilan nilai rupiah.',
            'Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah: Pengedaran uang tunai layak edar (Clean Money Policy & program Cinta Bangga Paham Rupiah), inovasi sistem pembayaran non-tunai (standarisasi QRIS dan BI-FAST yang telah meluas ke pasar rakyat OKU Timur), serta pengendalian inflasi pangan bersinergi dengan TPID.'
          ],
          studyMaterial: \`
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <h5 class="font-extrabold text-teal-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-teal-800 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Pengertian Kebanksentralan</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Kebanksentralan merujuk pada institusi dan otoritas moneter tertinggi di suatu negara yang bertanggung jawab memelihara kestabilan moneter, mengatur dan mengawasi sistem pembayaran, serta menjaga ketahanan sistem keuangan demi mewujudkan pertumbuhan ekonomi yang berkelanjutan. Berbeda dengan bank umum komersial, bank sentral tidak berorientasi pada pencarian keuntungan (<em>non-profit oriented</em>) dan tidak membuka rekening simpanan perorangan masyarakat umum, melainkan bertindak sebagai bank bagi perbankan komersial (<em>banker’s bank</em>).
                </p>
              </div>

              <div class="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                <h5 class="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-indigo-800 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Tugas dan Fungsi Utama Bank Sentral</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>a. Menetapkan dan Melaksanakan Kebijakan Moneter:</strong> Mengendalikan jumlah uang beredar dan tingkat suku bunga acuan (<em>BI-Rate</em>) melalui instrumen operasi pasar terbuka, suku bunga diskonto, dan cadangan wajib minimum (Giro Wajib Minimum / GWM) guna menekan laju inflasi.</li>
                  <li><strong>b. Mengatur dan Menjaga Kelancaran Sistem Pembayaran:</strong> Menetapkan penggunaan instrumen pembayaran tunai maupun nontunai, menyelenggarakan kliring nasional, serta mengoperasikan sistem penyelesaian akhir transaksi bernilai besar secara seketika (<em>BI-RTGS</em>).</li>
                  <li><strong>c. Memelihara Stabilitas Sistem Keuangan (Makroprudensial):</strong> Memantau dan mengendalikan risiko sistemik pada industri keuangan serta bertindak sebagai pemberi pinjaman likuiditas terakhir bagi perbankan saat terjadi krisis likuiditas (<em>Lender of the Last Resort</em>).</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <h5 class="font-extrabold text-purple-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-purple-800 text-white flex items-center justify-center text-[11px] font-black">3</span>
                  <span>Mengenal Bank Indonesia (BI)</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Bank Indonesia adalah Bank Sentral Republik Indonesia yang memiliki kedudukan sebagai lembaga negara yang independen, bebas dari campur tangan Pemerintah dan/atau pihak-pihak lainnya (sebagaimana ditegaskan dalam UU No. 23 Tahun 1999 dan disempurnakan melalui UU No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan / P2SK). Bank Indonesia memiliki <strong>Tujuan Tunggal</strong>: yaitu <em>mencapai dan memelihara kestabilan nilai rupiah</em>. Kestabilan nilai rupiah ini berdimensi ganda:
                  <br>• Kestabilan nilai mata uang terhadap harga barang dan jasa (tercermin pada laju inflasi yang rendah dan terkendali).
                  <br>• Kestabilan nilai mata uang terhadap mata uang negara lain (tercermin pada stabilitas kurs nilai tukar rupiah).
                  <br>Didukung oleh Kantor Perwakilan Bank Indonesia (KPw BI) di seluruh provinsi termasuk KPw BI Sumatera Selatan di Palembang.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
                <h5 class="font-extrabold text-cyan-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-cyan-800 text-white flex items-center justify-center text-[11px] font-black">4</span>
                  <span>Peran Bank Indonesia dalam Sistem Pembayaran &amp; Stabilitas Rupiah</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Sistem Pembayaran Tunai:</strong> Memegang hak tunggal (<em>hak oktroi</em>) menerbitkan dan mengedarkan Uang Rupiah (Pecahan TE 2022), menerapkan <em>Clean Money Policy</em>, serta mengedukasi masyarakat melalui program <strong>Cinta, Bangga, Paham (CBP) Rupiah</strong> untuk mengenali keaslian uang (3D: Dilihat, Diraba, Diterawang) dan merawat fisik rupiah (5J: Jangan dilipat, diremas, dicoret, dibasahi, distapler).</li>
                  <li><strong>- Sistem Pembayaran Digital (Nontunai):</strong> Mengembangkan inovasi infrastruktur pembayaran modern: <strong>QRIS (Quick Response Code Indonesian Standard)</strong> yang menyatukan transaksi nontunai pedagang UMKM pasar tradisional Belitang hanya dengan satu kode QR, serta layanan transfer antarbank <strong>BI-FAST</strong> yang beroperasi 24 jam sehari 7 hari seminggu dengan biaya murah (Rp2.500).</li>
                  <li><strong>- Stabilitas Rupiah &amp; Pengendalian Inflasi Pangan:</strong> BI berkolaborasi erat dengan Pemerintah Daerah OKU Timur melalui <strong>Tim Pengendali Inflasi Daerah (TPID)</strong> dalam program Gerakan Nasional Pengendalian Inflasi Pangan (GNPIP) guna mengamankan ketersediaan pasokan beras, kelancaran distribusi logistik, dan keterjangkauan harga pangan pokok bagi masyarakat.</li>
                </ul>
              </div>
            </div>
          \`,
          placeholder: 'Uraikan hasil analisis Anda mengenai konsep kebanksentralan, 3 pilar tugas utama bank sentral, kedudukan independen Bank Indonesia, serta peran strategis BI dalam mengawal sistem pembayaran (QRIS/BI-FAST) dan menjaga stabilitas nilai rupiah... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\\n1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) tentang Bank Indonesia.\\n2. Publikasi Resmi Bank Indonesia: Peran Bank Sentral dalam Sistem Pembayaran Digital.',
          defaultExp: 'Kebanksentralan merupakan fungsi otoritas moneter independen yang bertugas menjaga kestabilan nilai mata uang dan kelancaran sistem keuangan tanpa berorientasi komersial. Di Indonesia, Bank Indonesia (BI) bertindak sebagai bank sentral berdasar UU No. 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) dengan tujuan tunggal memelihara kestabilan nilai rupiah, baik terhadap harga barang (inflasi) maupun terhadap mata uang asing. Peran strategis BI diwujudkan melalui tiga pilar: pelaksanaan kebijakan moneter suku bunga BI-Rate, penjagaan stabilitas makroprudensial, serta pengaturan sistem pembayaran. Di Kabupaten OKU Timur, peran BI tampak nyata dalam pengedaran rupiah layak edar melalui edukasi Cinta Bangga Paham Rupiah, perluasan transaksi digital QRIS dan BI-FAST bagi pedagang UMKM pasar rakyat, serta pengendalian stabilitas harga pangan bersama Tim Pengendali Inflasi Daerah (TPID).',
          defaultSources: '1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 tentang Bank Indonesia (UU P2SK).\\n2. Publikasi Resmi Bank Indonesia: Peran Bank Sentral dan Transformasi Sistem Pembayaran Digital QRIS.'
        },
        {
          key: 'D',
          title: 'D. Badan Usaha dan Koperasi',
          subtitle: 'Pengertian Badan Usaha, Ragam Badan Usaha di Indonesia, Hakikat Perkoperasian UU 25/1992 & Motor Ekonomi Rakyat',
          syllabusItems: [
            '1. Pengertian badan usaha',
            '2. Jenis-jenis badan usaha di Indonesia',
            '3. Pengertian koperasi',
            '4. Dasar hukum koperasi',
            '5. Kegiatan dan prinsip koperasi',
            '6. Peran koperasi dalam perekonomian masyarakat'
          ],
          guidedPoints: [
            'Pengertian badan usaha: Kesatuan yuridis dan ekonomis faktor-faktor produksi yang bertujuan mencari keuntungan atau menyelenggarakan pelayanan masyarakat (berbeda dari perusahaan sebagai tempat teknis operasional).',
            'Jenis-jenis badan usaha di Indonesia: BUMN (Persero & Perum), BUMD, BUMDes, BUMS (Perseroan Terbatas/PT, CV, Firma, Perseorangan), dan Koperasi.',
            'Pengertian koperasi: Asosiasi sukarela individu yang bersatu untuk memperjuangkan kepentingan dan kesejahteraan ekonomi bersama berasaskan kekeluargaan dan gotong royong.',
            'Dasar hukum koperasi: Pasal 33 ayat (1) UUD 1945 ("Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan") serta Undang-Undang RI Nomor 25 Tahun 1992 tentang Perkoperasian.',
            'Kegiatan dan prinsip koperasi: 5 jenis usaha koperasi (Simpan Pinjam, Produsen/KUD, Konsumen, Pemasaran, Jasa) dan 7 prinsip koperasi Indonesia (keanggotaan sukarela terbuka, pengelolaan demokratis satu orang satu suara, pembagian SHU sebanding jasa usaha, kemandirian).',
            'Peran koperasi dalam perekonomian masyarakat: Memperkokoh posisi tawar petani dan UMKM OKU Timur dalam penyediaan pupuk/benih subsidi, fasilitasi permodalan tanpa bunga mencekik, dan membebaskan anggota dari jeratan tengkulak.'
          ],
          studyMaterial: \`
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <h5 class="font-extrabold text-teal-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-teal-800 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Pengertian Badan Usaha</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Badan usaha adalah kesatuan yuridis (hukum) dan ekonomis dari faktor-faktor produksi yang bertujuan untuk mencari keuntungan finansial atau memberikan pelayanan kepada kepentingan masyarakat. Penting membedakan antara <strong>badan usaha</strong> (organisasi resmi yang mengurus aspek legalitas hukum, modal, kepemilikan saham, dan tanggung jawab hukum) dengan <strong>perusahaan</strong> (unit teknis tempat berlangsungnya kegiatan operasional produksi barang atau jasa).
                </p>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <h5 class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-emerald-800 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Jenis-Jenis Badan Usaha di Indonesia</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>a. Badan Usaha Milik Negara (BUMN):</strong> Badan usaha yang seluruh atau sebagian besar modalnya dimiliki negara melalui kekayaan negara yang dipisahkan. Terbagi atas <em>Persero</em> (orientasi laba sekaligus layanan publik, contoh: PT Bank Rakyat Indonesia / BRI Tbk, PT Pupuk Sriwidjaja / Pusri) dan <em>Perum</em> (orientasi utama kemanfaatan publik, contoh: Perum BULOG yang mengelola stok cadangan pangan).</li>
                  <li><strong>b. Badan Usaha Milik Daerah (BUMD):</strong> Modal dimiliki pemerintah daerah (contoh: Bank Sumsel Babel, PDAM).</li>
                  <li><strong>c. Badan Usaha Milik Desa (BUMDes):</strong> Badan usaha yang seluruh atau sebagian modalnya dimiliki oleh desa guna mendayagunakan potensi desa dan menggerakkan perekonomian warga.</li>
                  <li><strong>d. Badan Usaha Milik Swasta (BUMS):</strong> Modal dimiliki oleh pihak swasta perorangan atau kelompok, berbentuk Perusahaan Perseorangan, Firma (Fa), CV (Persekutuan Komanditer), dan PT (Perseroan Terbatas).</li>
                  <li><strong>e. Koperasi:</strong> Badan usaha berbadan hukum yang beranggotakan orang-seorang berdasarkan asas kekeluargaan.</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <h5 class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-amber-800 text-white flex items-center justify-center text-[11px] font-black">3 &amp; 4</span>
                  <span>Pengertian &amp; Dasar Hukum Koperasi</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Menurut Bapak Koperasi Indonesia, Drs. Mohammad Hatta, koperasi adalah usaha bersama untuk memperbaiki nasib penghidupan ekonomi berdasarkan tolong-menolong. Koperasi bukan kumpulan modal, melainkan perhimpunan orang-orang yang memiliki aspirasi ekonomi yang sama.
                  <br><strong>Dasar Hukum Koperasi di Indonesia:</strong>
                  <br>• <strong>Pasal 33 ayat (1) UUD 1945:</strong> <em>"Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan."</em>
                  <br>• <strong>Undang-Undang RI Nomor 25 Tahun 1992 tentang Perkoperasian:</strong> Merupakan payung hukum utama yang mengatur tata cara pendirian, perangkat organisasi (Rapat Anggota, Pengurus, Pengawas), permodalan, dan pembagian Sisa Hasil Usaha (SHU).
                </p>
              </div>

              <div class="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <h5 class="font-extrabold text-sky-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-sky-800 text-white flex items-center justify-center text-[11px] font-black">5 &amp; 6</span>
                  <span>Kegiatan, Prinsip &amp; Peran Koperasi dalam Ekonomi Masyarakat</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>Jenis Kegiatan Usaha Koperasi:</strong> Koperasi Simpan Pinjam (KSP), Koperasi Produsen (KUD tani pengolah panen), Koperasi Konsumen (toko sembako anggota), Koperasi Pemasaran, dan Koperasi Jasa.</li>
                  <li><strong>Tujuh Prinsip Koperasi (Pasal 5 UU No. 25/1992):</strong> (1) Keanggotaan sukarela dan terbuka, (2) Pengelolaan demokratis (satu orang satu suara / <em>one person one vote</em>), (3) Pembagian SHU sebanding dengan jasa usaha anggota, (4) Pemberian balas jasa terbatas atas modal, (5) Kemandirian, (6) Pendidikan perkoperasian, (7) Kerja sama antarkoperasi.</li>
                  <li><strong>Peran Nyata Koperasi bagi Masyarakat OKU Timur:</strong> Menguatkan posisi tawar petani padi dan pekebun karet terhadap tengkulak, menyalurkan pupuk dan benih resmi subsidi tepat sasaran, memfasilitasi pinjaman permodalan musiman tanpa jaminan mencekik, serta menumbuhkan budaya gotong-royong dan pemerataan ekonomi pedesaan.</li>
                </ul>
              </div>
            </div>
          \`,
          placeholder: 'Uraikan hasil telaah Anda mengenai pengertian badan usaha, perbedaan BUMN/BUMS/Koperasi, dasar hukum koperasi UU 25/1992, tujuh prinsip koperasi, serta kontribusi konkret koperasi/KUD dalam memajukan perekonomian petani di OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\\n1. Undang-Undang RI Nomor 25 Tahun 1992 tentang Perkoperasian.\\n2. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab Badan Usaha & Koperasi.',
          defaultExp: 'Badan usaha merupakan kesatuan yuridis dan ekonomis faktor produksi yang berorientasi pada laba atau pelayanan masyarakat, yang terbagi atas BUMN, BUMD, BUMDes, BUMS, dan Koperasi. Koperasi menempati kedudukan istimewa dalam sistem ekonomi Indonesia sebagaimana diamanatkan Pasal 33 ayat (1) UUD 1945 dan diatur melalui UU No. 25 Tahun 1992 tentang Perkoperasian sebagai bangun usaha berlandaskan asas kekeluargaan dan gotong royong. Tujuh prinsip perkoperasian seperti keanggotaan sukarela terbuka, pengelolaan demokratis (one person one vote), dan pembagian SHU berkeadilan menjadi pembeda utama dari badan usaha permodalan murni. Di kawasan pedesaan OKU Timur, kelembagaan Koperasi Unit Desa (KUD) dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, menyediakan pinjaman modal usaha tani dengan bunga rendah, serta melindungi harga panen gabah petani dari eksploitasi tengkulak.',
          defaultSources: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.\\n2. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab Badan Usaha dan Koperasi.'
        },
        {
          key: 'E',
          title: 'E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur',
          subtitle: 'Pertanian & Perkebunan, Peternakan & Perikanan, Perdagangan & UMKM, Persebaran Wilayah & Produk Unggulan',
          syllabusItems: [
            '1. Pertanian dan perkebunan',
            '2. Peternakan dan perikanan',
            '3. Perdagangan dan UMKM',
            '4. Persebaran potensi ekonomi di OKU Timur',
            '5. Identifikasi produk unggulan di oku timur'
          ],
          guidedPoints: [
            'Pertanian dan perkebunan: Keunggulan mutlak OKU Timur sebagai lumbung pangan utama Sumsel melalui hamparan sawah beririgasi teknis Bendung Perjaya/Komering (BK 0 - BK 32), disusul komoditas perkebunan rakyat karet dan kelapa sawit.',
            'Peternakan dan perikanan: Sentra peternakan sapi terpadu (memanfaatkan jerami limbah sawah & menghasilkan pupuk kandang), kambing, unggas ayam dan bebek petelur, serta sentra budidaya perikanan air tawar (ikan patin dan lele).',
            'Perdagangan dan UMKM: Dinamika pusat perdagangan rakyat (Pasar Gumawang Belitang dan Pasar Martapura), geliat ribuan UMKM kilang beras modern (RMU), olahan patin, keripik pisang, serta jaringan Agen BRILink pedesaan.',
            'Persebaran potensi ekonomi di OKU Timur: Zonasi Belitang Raya (sawah irigasi teknis, kolam patin, perdagangan), Zonasi Madang Suku/Cempaka/Semendawai (perkebunan karet/sawit & peternakan sapi), Zonasi Martapura/Komering (pusat pemerintahan, simpul logistik & agribisnis buah).',
            'Identifikasi produk unggulan di OKU Timur: Beras premium/organik Belitang bersertifikat, lateks bokar karet bersih, TBS kelapa sawit, ikan patin segar & olahan abon patin, serta daging ternak sapi dan telur bebek asin Belitang.'
          ],
          studyMaterial: \`
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <h5 class="font-extrabold text-teal-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-teal-800 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Pertanian dan Perkebunan di OKU Timur</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Pertanian Padi Sawah:</strong> Kabupaten OKU Timur merupakan <strong>Lumbung Pangan Utama Provinsi Sumatera Selatan</strong> dan sentra beras nasional. Keunggulan ini ditopang jaringan Daerah Irigasi Komering (Bendung Perjaya) dari BK 0 hingga BK 32 yang mengaliri puluhan ribu hektar sawah beririgasi teknis. Pola tanam intensif mencapai 2 hingga 3 kali tanam dalam setahun (IP 200–300) dengan produktivitas tinggi 6–7 ton GKG per hektar. Disertai tanaman palawija jagung hibrida dan kedelai.</li>
                  <li><strong>- Perkebunan Rakyat:</strong> Didominasi oleh dua komoditas primadona tropis: <em>Karet (Hevea brasiliensis)</em> yang diusahakan ribuan pekebun mandiri penghasil bokar lateks beku berkualitas, dan <em>Kelapa Sawit (Elaeis guineensis)</em> dengan puluhan RAM timbangan TBS serta pabrik pengolahan kelapa sawit (PKS).</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <h5 class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-emerald-800 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Peternakan dan Perikanan di OKU Timur</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Peternakan:</strong> OKU Timur memiliki populasi ternak ruminansia besar yang menonjol di Sumsel, terutama <strong>Peternakan Sapi</strong> (Sapi Bali, Sapi PO, dan Simental). Pola peternakan terintegrasi erat dengan pertanian padi sawah, di mana jerami limbah panen diolah menjadi pakan silase dan kotoran ternak dijadikan pupuk organik kandang atau biogas. Diperkaya peternakan kambing, domba, ayam broiler/kampung, dan sentra bebek petelur di sepanjang tanggul saluran irigasi Belitang.</li>
                  <li><strong>- Perikanan Air Tawar:</strong> Ditetapkan secara nasional sebagai sentra budidaya perikanan air tawar unggulan. Sentra budidaya kolam air tenang dan air deras memproduksi komoditas utama <strong>Ikan Patin (Pangasius)</strong> dan <strong>Ikan Lele (Clarias)</strong> dengan volume produksi mencapai puluhan ton per hari untuk memasok kebutuhan pasar lokal, Palembang, hingga Pulau Jawa.</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <h5 class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-amber-800 text-white flex items-center justify-center text-[11px] font-black">3</span>
                  <span>Perdagangan dan UMKM</span>
                </h5>
                <p class="text-xs text-slate-700 leading-relaxed text-justify">
                  Aktivitas perdagangan berdenyut dinamis di pasar-pasar rakyat strategis seperti <strong>Pasar Gumawang Belitang</strong> (pusat perdagangan grosir terbesar di Belitang Raya), Pasar Martapura, dan Pasar Batumarta. Geliat UMKM didominasi oleh hilirisasi pascapanen: industri penggilingan padi modern (RMU) yang mengemas beras premium lokal, pengolahan filet ikan patin beku, abon patin, keripik pisang, kemplang panggang, pakan ternak mandiri, dan kerajinan pandai besi alsintan. Sektor ini diperkuat oleh ribuan Agen BRILink dan Bank Sumsel Babel Laku Pandai di pelosok desa sebagai penggerak inklusi keuangan mikro.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <h5 class="font-extrabold text-sky-950 text-xs flex items-center gap-1.5 mb-1">
                  <span class="w-5 h-5 rounded-md bg-sky-800 text-white flex items-center justify-center text-[11px] font-black">4 &amp; 5</span>
                  <span>Persebaran Potensi Wilayah &amp; Produk Unggulan Daerah</span>
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-700 text-justify">
                  <li><strong>- Persebaran Potensi Wilayah:</strong> Terbagi atas tiga zona koridor ekonomi: (1) <em>Zona Irigasi Padi & Perikanan Belitang Raya:</em> Belitang, Belitang II, Belitang III, Belitang Jaya, Belitang Madang Raya, Belitang Mulya, Buay Madang, Buay Madang Timur; (2) <em>Zona Perkebunan & Sapi:</em> Madang Suku I, Madang Suku II, Madang Suku III, Cempaka, Semendawai Barat, Semendawai Timur, Semendawai Suku III; (3) <em>Zona Transit, Pemerintahan & Agribisnis Komering:</em> Martapura, BP Peliung, BP Bangsa Raja, Bunga Mayang, Jayapura.</li>
                  <li><strong>- Identifikasi Produk Unggulan OKU Timur:</strong> (1) Beras Premium & Beras Organik Belitang (pulen, higienis, berlabel resmi), (2) Bahan Olahan Karet Rakyat (Bokar) Karet Bersih, (3) Tandan Buah Segar (TBS) dan Minyak Sawit CPO, (4) Ikan Patin Segar & Produk Olahan Abon/Filet Patin Belitang, (5) Daging Ternak Sapi Sehat & Telur Bebek Asin Belitang.</li>
                </ul>
              </div>
            </div>
          \`,
          placeholder: 'Uraikan profil lengkap perekonomian Kabupaten OKU Timur: keunggulan komparatif lumbung pangan padi sawah dan perkebunan, potensi peternakan sapi dan kolam patin, denyut perdagangan pasar/UMKM, pola persebaran spasial antar-kecamatan, serta 5 produk unggulan daerah... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\\n1. BPS Kabupaten OKU Timur: Publikasi Kabupaten OKU Timur Dalam Angka.\\n2. Laporan Profil Potensi Investasi dan Ekonomi Daerah, Bappeda Litbang OKU Timur.',
          defaultExp: 'Kabupaten Ogan Komering Ulu Timur (OKU Timur) memiliki keunggulan komparatif mutlak sebagai lumbung pangan utama Provinsi Sumatera Selatan berkat jaringan Daerah Irigasi Komering Bendung Perjaya (BK 0 s.d. BK 32) yang menopang sawah teknis berpola tanam IP 200-300 dengan produktivitas 6-7 ton/Ha, disandingkan perkebunan karet bokar dan kelapa sawit rakyat. Sektor peternakan sapi terintegrasi limbah jerami padi serta budidaya ikan patin dan lele air tawar menjadikan OKU Timur sebagai sentra pasokan protein hewani regional. Denyut ekonomi terdistribusi dinamis melalui Pasar Gumawang Belitang, ribuan UMKM kilang beras RMU dan hilirisasi pangan olahan, serta jejaring Agen BRILink di setiap desa. Secara spasial, potensi daerah terbagi atas Zona Irigasi Belitang Raya (padi dan patin), Zona Madang Suku dan Semendawai (perkebunan karet/sawit dan sapi), serta Zona Martapura (transit perdagangan dan pemerintahan). Lima produk unggulan utamanya adalah Beras Premium Belitang, Bokar Karet Bersih, TBS Kelapa Sawit, Ikan Patin/Olahan Abon, serta Daging Sapi dan Telur Bebek Asin.',
          defaultSources: '1. Badan Pusat Statistik (BPS) Kabupaten OKU Timur: Publikasi OKU Timur Dalam Angka.\\n2. Bappeda Litbang Kabupaten OKU Timur: Laporan Profil Potensi Ekonomi dan Komoditas Unggulan Daerah.'
        }
      ]
    },`;

// Cari posisi NFT_MATERI_CONFIG = { ... 1: { ... }
const regexDay1 = /1:\s*\{[\s\S]*?theme:\s*'Pilar Financial & Economics'[\s\S]*?cards:\s*\[[\s\S]*?key:\s*'E'[\s\S]*?\}\s*\]\s*\},/m;

if (!regexDay1.test(code)) {
  console.error('GAGAL menemukan blok Day 1 di materi-nonfieldtrip.js!');
  process.exit(1);
}

code = code.replace(regexDay1, newDay1Config);
console.log('BERHASIL mengganti konfigurasi Day 1 di NFT_MATERI_CONFIG[1].');

fs.writeFileSync(targetFile, code, 'utf8');
console.log('File materi-nonfieldtrip.js berhasil disimpan. Length now:', code.length);
