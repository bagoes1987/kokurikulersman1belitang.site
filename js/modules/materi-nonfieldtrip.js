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
            '3. Sektor utama aktivitas ekonomi:\n   - Sektor primer\n   - Sektor sekunder\n   - Sektor tersier'
          ],
          guidedPoints: [
            'Pengertian kegiatan ekonomi: Hakikat upaya dan tindakan rasional manusia dalam memenuhi berbagai kebutuhan hidup yang tak terbatas dengan mengoptimalkan sumber daya alam dan modal yang terbatas (kelangkaan / scarcity).',
            'Produksi, distribusi, dan konsumsi: Rantai nilai ekonomi yang saling terkait erat, mulai dari penciptaan faedah bentuk/tempat (produksi), penyaluran tepat waktu ke pasar (distribusi), hingga pemanfaatan nilai guna oleh masyarakat (konsumsi).',
            'Sektor utama aktivitas ekonomi di OKU Timur:\n- Sektor Primer: Pemanfaatan langsung sumber daya alam tanpa olahan rumit (pertanian padi sawah, perkebunan karet/kelapa sawit, peternakan sapi/unggas, budidaya patin/lele).\n- Sektor Sekunder: Pengolahan bahan mentah menjadi barang jadi/setengah jadi bernilai tambah (kilang beras RMU, industri pengolahan getah karet, pabrik pakan, pengolahan keripik pisang/kemplang).\n- Sektor Tersier: Penyedia jasa, distribusi, dan keuangan (Pasar Gumawang Belitang, angkutan logistik truk panen, perbankan BRI/Bank Sumsel Babel, Agen BRILink, dan koperasi desa).'
          ],
          studyMaterial: `
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
          `,
          placeholder: 'Tuliskan telaah komprehensif Anda mengenai pengertian kegiatan ekonomi, keterkaitan rantai produksi-distribusi-konsumsi, serta pembagian tiga sektor (primer, sekunder, dan tersier) beserta contoh nyatanya di Kabupaten OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab 1 Kegiatan Ekonomi.\n2. Modul Teori Ekonomi Mikro Pengantar, Fakultas Ekonomi Universitas Sriwijaya.',
          defaultExp: 'Kajian komprehensif mengenai kegiatan ekonomi menegaskan bahwa aktivitas pemenuhan kebutuhan manusia tersusun atas rantai nilai organik produksi, distribusi, dan konsumsi. Di Kabupaten OKU Timur, keterpaduan tiga sektor tampak nyata: sektor primer (pertanian padi sawah beririgasi Belitang, perkebunan karet, dan peternakan sapi) berperan sebagai penyedia bahan mentah; sektor sekunder (industri penggilingan padi RMU dan olahan pangan) mengolah bahan mentah menjadi komoditas beras kemasan bernilai tambah tinggi; sedangkan sektor tersier (pasar grosir Gumawang, jasa logistik angkutan truk, dan jaringan perbankan/BRILink) menjamin kelancaran arus barang dan uang hingga ke konsumen akhir secara berkelanjutan.',
          defaultSources: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab 1 Kegiatan Ekonomi.\n2. Modul Pengantar Teori Ekonomi Mikro dan Perencanaan Wilayah, Fakultas Ekonomi Universitas Sriwijaya.'
        },
        {
          key: 'B',
          title: 'B. Literasi dan Pengelolaan Keuangan (Financial Literacy)',
          subtitle: 'Empat Jenis Finansial & Lima Aspek Krusial Pengelolaan Arus Kas',
          syllabusItems: [
            '1. Jenis-jenis finansial:\n   - Keuangan pribadi (personal finance)\n   - Keuangan bisnis (business finance)\n   - Keuangan publik (public finance)\n   - Keuangan internasional (international finance)',
            '2. Aspek pengelolaan keuangan:\n   - Pemasukan dan pengeluaran\n   - Anggaran dan tabungan\n   - Dana darurat\n   - Investasi\n   - Pengelolaan keuangan'
          ],
          guidedPoints: [
            'Jenis-jenis finansial:\n- Keuangan pribadi (personal finance): Tata kelola anggaran individu/keluarga, kebutuhan vs keinginan, dan proteksi masa depan.\n- Keuangan bisnis (business finance): Manajemen modal kerja usaha, profitabilitas, pemisahan rekening pribadi dan operasional usaha.\n- Keuangan publik (public finance): Pengelolaan APBD OKU Timur untuk fasilitas publik, perbaikan saluran irigasi, dan subsidi pertanian.\n- Keuangan internasional (international finance): Arus perdagangan ekspor komoditas (ekspor karet bokar/minyak sawit CPO) dan fluktuasi kurs mata uang asing.',
            'Aspek pengelolaan keuangan:\n- Pemasukan dan pengeluaran: Pencatatan arus kas masuk-keluar secara tertib agar tercipta surplus kas.\n- Anggaran dan tabungan: Formula alokasi dana tertulis (metode 50/30/20) dan disiplin menabung di awal (pay yourself first).\n- Dana darurat: Cadangan simpanan likuid minimal 3-6 kali beban pengeluaran untuk mitigasi musibah tak terduga / gagal panen.\n- Investasi: Penempatan modal pada aset produktif legal yang diawasi OJK (emas, reksadana, bibit ternak, alsintan).\n- Pengelolaan keuangan & utang: Manajemen batas rasio utang aman (Debt Service Ratio < 30%), pemanfaatan kredit produktif resmi (KUR BRI), dan mitigasi bahaya pinjaman online ilegal atau rentenir.'
          ],
          studyMaterial: `
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
          `,
          placeholder: 'Uraikan pemahaman Anda mengenai 4 jenis finansial (pribadi, bisnis, publik, internasional) dan 5 aspek tata kelola keuangan (pemasukan/pengeluaran, anggaran/tabungan, dana darurat, investasi, serta pengelolaan utang/risiko)... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI 2023).\n2. Modul Manajemen Keuangan Keluarga & UMKM, Bank Indonesia.',
          defaultExp: 'Literasi keuangan merupakan kecakapan hidup mendasar yang mencakup pemahaman empat jenis finansial: keuangan pribadi (tata kelola uang individu/keluarga), keuangan bisnis (manajemen modal kerja UMKM tanpa mencampur kas pribadi), keuangan publik (alokasi APBD OKU Timur bagi infrastruktur irigasi), dan keuangan internasional (transaksi ekspor karet/sawit dan fluktuasi valas). Dalam tataran praktis, tata kelola keuangan bertumpu pada lima aspek utama: disiplin mencatat pemasukan-pengeluaran agar surplus kas, menyusun anggaran 50/30/20 dan menabung di awal, menyiapkan dana darurat 3-6 bulan pengeluaran untuk antisipasi risiko, berinvestasi pada instrumen legal berizin OJK, serta mengelola pinjaman produktif dengan rasio cicilan di bawah 30% seraya menjauhi pinjol ilegal dan rentenir.',
          defaultSources: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI 2023).\n2. Modul Manajemen Keuangan Keluarga dan Pelaku Usaha Mikro, Bank Indonesia.'
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
          studyMaterial: `
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
          `,
          placeholder: 'Uraikan hasil analisis Anda mengenai konsep kebanksentralan, 3 pilar tugas utama bank sentral, kedudukan independen Bank Indonesia, serta peran strategis BI dalam mengawal sistem pembayaran (QRIS/BI-FAST) dan menjaga stabilitas nilai rupiah... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) tentang Bank Indonesia.\n2. Publikasi Resmi Bank Indonesia: Peran Bank Sentral dalam Sistem Pembayaran Digital.',
          defaultExp: 'Kebanksentralan merupakan fungsi otoritas moneter independen yang bertugas menjaga kestabilan nilai mata uang dan kelancaran sistem keuangan tanpa berorientasi komersial. Di Indonesia, Bank Indonesia (BI) bertindak sebagai bank sentral berdasar UU No. 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) dengan tujuan tunggal memelihara kestabilan nilai rupiah, baik terhadap harga barang (inflasi) maupun terhadap mata uang asing. Peran strategis BI diwujudkan melalui tiga pilar: pelaksanaan kebijakan moneter suku bunga BI-Rate, penjagaan stabilitas makroprudensial, serta pengaturan sistem pembayaran. Di Kabupaten OKU Timur, peran BI tampak nyata dalam pengedaran rupiah layak edar melalui edukasi Cinta Bangga Paham Rupiah, perluasan transaksi digital QRIS dan BI-FAST bagi pedagang UMKM pasar rakyat, serta pengendalian stabilitas harga pangan bersama Tim Pengendali Inflasi Daerah (TPID).',
          defaultSources: '1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 tentang Bank Indonesia (UU P2SK).\n2. Publikasi Resmi Bank Indonesia: Peran Bank Sentral dan Transformasi Sistem Pembayaran Digital QRIS.'
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
          studyMaterial: `
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
          `,
          placeholder: 'Uraikan hasil telaah Anda mengenai pengertian badan usaha, perbedaan BUMN/BUMS/Koperasi, dasar hukum koperasi UU 25/1992, tujuh prinsip koperasi, serta kontribusi konkret koperasi/KUD dalam memajukan perekonomian petani di OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Undang-Undang RI Nomor 25 Tahun 1992 tentang Perkoperasian.\n2. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab Badan Usaha & Koperasi.',
          defaultExp: 'Badan usaha merupakan kesatuan yuridis dan ekonomis faktor produksi yang berorientasi pada laba atau pelayanan masyarakat, yang terbagi atas BUMN, BUMD, BUMDes, BUMS, dan Koperasi. Koperasi menempati kedudukan istimewa dalam sistem ekonomi Indonesia sebagaimana diamanatkan Pasal 33 ayat (1) UUD 1945 dan diatur melalui UU No. 25 Tahun 1992 tentang Perkoperasian sebagai bangun usaha berlandaskan asas kekeluargaan dan gotong royong. Tujuh prinsip perkoperasian seperti keanggotaan sukarela terbuka, pengelolaan demokratis (one person one vote), dan pembagian SHU berkeadilan menjadi pembeda utama dari badan usaha permodalan murni. Di kawasan pedesaan OKU Timur, kelembagaan Koperasi Unit Desa (KUD) dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, menyediakan pinjaman modal usaha tani dengan bunga rendah, serta melindungi harga panen gabah petani dari eksploitasi tengkulak.',
          defaultSources: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.\n2. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemendikbudristek 2023), Bab Badan Usaha dan Koperasi.'
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
          studyMaterial: `
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
          `,
          placeholder: 'Uraikan profil lengkap perekonomian Kabupaten OKU Timur: keunggulan komparatif lumbung pangan padi sawah dan perkebunan, potensi peternakan sapi dan kolam patin, denyut perdagangan pasar/UMKM, pola persebaran spasial antar-kecamatan, serta 5 produk unggulan daerah... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur: Publikasi Kabupaten OKU Timur Dalam Angka.\n2. Laporan Profil Potensi Investasi dan Ekonomi Daerah, Bappeda Litbang OKU Timur.',
          defaultExp: 'Kabupaten Ogan Komering Ulu Timur (OKU Timur) memiliki keunggulan komparatif mutlak sebagai lumbung pangan utama Provinsi Sumatera Selatan berkat jaringan Daerah Irigasi Komering Bendung Perjaya (BK 0 s.d. BK 32) yang menopang sawah teknis berpola tanam IP 200-300 dengan produktivitas 6-7 ton/Ha, disandingkan perkebunan karet bokar dan kelapa sawit rakyat. Sektor peternakan sapi terintegrasi limbah jerami padi serta budidaya ikan patin dan lele air tawar menjadikan OKU Timur sebagai sentra pasokan protein hewani regional. Denyut ekonomi terdistribusi dinamis melalui Pasar Gumawang Belitang, ribuan UMKM kilang beras RMU dan hilirisasi pangan olahan, serta jejaring Agen BRILink di setiap desa. Secara spasial, potensi daerah terbagi atas Zona Irigasi Belitang Raya (padi dan patin), Zona Madang Suku dan Semendawai (perkebunan karet/sawit dan sapi), serta Zona Martapura (transit perdagangan dan pemerintahan). Lima produk unggulan utamanya adalah Beras Premium Belitang, Bokar Karet Bersih, TBS Kelapa Sawit, Ikan Patin/Olahan Abon, serta Daging Sapi dan Telur Bebek Asin.',
          defaultSources: '1. Badan Pusat Statistik (BPS) Kabupaten OKU Timur: Publikasi OKU Timur Dalam Angka.\n2. Bappeda Litbang Kabupaten OKU Timur: Laporan Profil Potensi Ekonomi dan Komoditas Unggulan Daerah.'
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
            'Diversifikasi usaha tani terpadu melalui perikanan kolam air tawar (patin/lele) dan peternakan sapi sebagai pilar stabilitas pendapatan harian keluarga.'
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
      title: 'Modul Riset Day 3: Analisis STEM pada Pertanian & Sektor Unggulan OKU Timur',
      theme: 'Pilar Industry & STEM',
      gradientClass: 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-700/40',
      tagColorClass: 'bg-white/20 text-emerald-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Kajian Terpadu Integrasi Science, Technology, Engineering, dan Mathematics pada Sektor Pertanian Pangan, Perkebunan Rakyat, Perikanan Air Tawar, dan Peternakan Pedesaan Kabupaten OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda dipersilakan <strong>memilih 1 dari 4 Sektor Unggulan OKU Timur</strong> yang paling dekat dengan lingkungan Anda untuk diteliti secara mendalam melalui 4 pilar STEM (Science, Technology, Engineering, Mathematics). Kartu panduan riset di bawah akan otomatis menyesuaikan dengan sektor pilihan Anda.',
      sectors: {
        pertanian: {
          key: 'pertanian',
          name: 'Pertanian Padi Sawah',
          badge: 'Lumbung Pangan Komering',
          icon: 'agriculture',
          desc: 'Padi Sawah, Irigasi Saluran BK, Alsintan Traktor/Combine, Ubinan & Laba Petani',
          cards: [
            {
              key: 'A',
              title: 'Science: Karakteristik Tanah Sawah, Air Irigasi Komering & Fisiologi Padi',
              subtitle: 'Sifat Fisika-Kimia Tanah Sawah Belitang, pH Asam, Kualitas Air Bendung Perjaya & Varietas Unggul',
              guidedPoints: [
                'Karakteristik tanah sawah aluvial di Belitang: dampak kejenuhan pupuk kimia berlebih (urea) yang menurunkan pH ke 4.5-5.5 (asam) serta peranan kapur dolomit dan bahan organik dalam memulihkan kesuburan tanah.',
                'Kualitas air irigasi teknis dari Bendung Perjaya (Sungai Komering): tingkat sedimentasi lumpur penyubur alami dan dampak penutupan pintu air saat jadwal pengeringan berkala saluran sekunder/tersier.',
                'Pengaruh unsur cuaca (suhu harian 28-32 derajat Celcius, kelembapan, curah hujan) terhadap fase vegetatif dan generatif padi pada Musim Tanam 1 (MT 1 / Rendeng) dan Musim Tanam 2 (MT 2 / Gadu).',
                'Karakteristik agronomi varietas unggul lokal (Inpari 32, Ciherang, Mekongga) serta ketahanan biologisnya melawan hama wereng batang coklat (WBC), tikus sawah, dan penyakit hawar daun bakteri (kresek).'
              ],
              placeholder: 'Uraikan hasil telaah sains Anda mengenai sifat fisik-kimia tanah sawah di OKU Timur, kebutuhan kapur dolomit, kualitas air irigasi Komering, serta ketahanan varietas Inpari 32 melawan hama... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel, Karakteristik Tanah Sawah OKU Timur\n2. BBPadi Kementan RI, Deskripsi Varietas Inpari 32',
              defaultExp: 'Kajian sains pertanian di Kabupaten OKU Timur menegaskan bahwa tanah sawah aluvial Belitang yang diolah secara intensif memerlukan pemupukan berimbang dan pemberian kapur dolomit guna menetralkan pH tanah yang cenderung masam akibat residu urea. Pasokan air irigasi dari Bendung Perjaya kaya sedimen lumpur organik yang sangat menunjang pertumbuhan varietas Inpari 32, namun petani harus mewaspadai dinamika kelembapan udara yang memicu perkembangbiakan hama wereng batang coklat.',
              defaultSources: '1. Publikasi BPTP Sumatera Selatan: Pengelolaan Kesuburan Lahan Sawah Irigasi Komering.\n2. Balai Besar Penelitian Tanaman Padi (BBPadi) Kementan RI.'
            },
            {
              key: 'B',
              title: 'Technology: Mekanisasi Alsintan Modern & Peralatan Digital Pemantau Lahan',
              subtitle: 'Traktor Roda 2 vs Roda 4 UPJA, Mesin Tanam Transplanter, Pompa Alkon & Combine Harvester',
              guidedPoints: [
                'Spesifikasi dan efisiensi kerja Traktor Roda 2 (Quick/Kubota) untuk petak sawah bertingkat dibandingkan Traktor Roda 4 (Yanmar/Kubota) UPJA dalam percepatan olah tanah sebelum jadwal air masuk.',
                'Perbandingan teknis antara mesin tanam pindah bibit (Rice Transplanter) dengan tanam manual pola Jajar Legowo (2:1 atau 4:1) menggunakan caplak kayu berjarak presisi.',
                'Peranan mesin pompa air sentrifugal/disel (alkon Dongfeng bahan bakar solar/bensin) dalam menyedot air dari saluran buang atau sungai kecil saat jatah giliran air irigasi sedang kecil.',
                'Adopsi mesin panen raksasa Combine Harvester (memotong, merontok, dan mengarungi gabah sekaligus), alat Grain Moisture Tester digital, serta sprayer mesin gendong (mist blower).'
              ],
              placeholder: 'Tuliskan hasil kajian teknologi Anda mengenai peran traktor roda 4 UPJA, keunggulan Rice Transplanter vs Jajar Legowo manual, efisiensi Combine Harvester, dan pompa alkon di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Pemanfaatan Alat dan Mesin Pertanian (Alsintan), Ditjen PSP Kementan RI\n2. Petunjuk Teknis Operasional Combine Harvester dan Transplanter',
              defaultExp: 'Penerapan teknologi alsintan modern di sentra persawahan OKU Timur terbukti memangkas waktu olah tanah dan menekan biaya tenaga kerja secara signifikan. Pemanfaatan traktor roda 4 sewaan UPJA mempercepat pembajakan lahan, sementara mesin tanam Rice Transplanter dan panen Combine Harvester mampu menurunkan susut panen (losses) di bawah 2% serta menghasilkan gabah panen yang lebih bersih dan seragam.',
              defaultSources: '1. Pedoman Pengelolaan Alsintan UPJA, Dinas Pertanian OKU Timur.\n2. Petunjuk Teknis Mekanisasi Pertanian Padi Modern, Kementan RI.'
            },
            {
              key: 'C',
              title: 'Engineering: Rekayasa Jaringan Irigasi BK & Sumur Pantek Sawah Mandiri',
              subtitle: 'Tata Kelola Saluran Primer-Sekunder-Tersier P3A, Pintu Air Sorong & Teknologi AWD Hemat Air',
              guidedPoints: [
                'Desain rekayasa pembagian air dari Saluran Sekunder BK (seperti BK 0 sampai BK 12 Belitang) menuju Saluran Tersier dan Saluran Cacing petak sawah menggunakan pintu sorong dan balok sekat bambu/kayu yang dikelola P3A.',
                'Rekayasa sumur bor sawah (sumur pantek) kedalaman 12-24 meter pipa PVC yang disedot mesin pompa alkon sebagai penyelamat tanaman padi saat jadwal penutupan saluran irigasi utama.',
                'Penerapan teknik irigasi berselang (Alternate Wetting and Drying / AWD): pengairan kering-basah bergantian dengan pipa pemantau muka air yang menghemat air hingga 25% tanpa mengurangi hasil panen.',
                'Rekayasa parit keliling dan tanggul pematang sawah yang diperkuat untuk mencegah genangan banjir ekstrem serta memudahkan pembuangan air saat menjelang panen.'
              ],
              placeholder: 'Uraikan hasil analisis rekayasa Anda mengenai tata kelola saluran irigasi BK oleh P3A, rancangan sumur pantek saat kemarau, dan teknik irigasi berselang AWD di sawah Belitang... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Besar Wilayah Sungai Sumatera (BBWSS) VIII, Pedoman Operasi Jaringan Irigasi Komering\n2. Panduan Rekayasa Irigasi Berselang (AWD) Balitbangtan',
              defaultExp: 'Rekayasa tata kelola air di persawahan Belitang mengandalkan jaringan saluran bertingkat yang dikawal pintu air sorong P3A secara bergiliran. Untuk mengantisipasi jadwal pengeringan saluran induk oleh BBWSS VIII, para petani merekayasa sumur bor pantek sedalam 15-20 meter dengan pipa PVC dan pompa disel, serta menerapkan metode irigasi berselang (AWD) guna mempertahankan kelembapan akar secara efisien.',
              defaultSources: '1. Balai Besar Wilayah Sungai Sumatera VIII: Tata Kelola Jaringan Irigasi Komering.\n2. Pedoman Rekayasa Tata Air Sawah Berkelanjutan, Balitbangtan Kementan RI.'
            },
            {
              key: 'D',
              title: 'Mathematics: Kalkulasi Ubinan Panen, Biaya Produksi HPP & Laba Usahatani',
              subtitle: 'Rumus Konversi Ubinan 2.5m x 2.5m ke Ton/Ha, Modal per Hektar, Penerimaan & Kelayakan R/C Ratio',
              guidedPoints: [
                'Rumus perhitungan produktivitas ubinan ukuran 2,5 m x 2,5 m (6,25 m2): bobot gabah ubinan (kg) dikalikan konstanta 1.600 untuk menghasilkan estimasi ton Gabah Kering Panen (GKP) per hektar.',
                'Rincian modal produksi riil 1 hektar sawah di OKU Timur: sewa traktor (Rp1,2 jt), benih Inpari 32 (Rp400 rb), upah tanam (Rp1,3 jt), pupuk subsidi Urea/Phonska + pestisida (Rp3,0 jt), sewa Combine Harvester (Rp1,6 jt), dan air/tenaga kerja (Rp1,0 jt) dengan total modal sekitar Rp8.500.000.',
                'Perhitungan Total Penerimaan (TR): estimasi hasil panen 6.000 kg (6 ton) dikalikan harga jual riil gabah di tingkat tengkulak/penebas Rp6.500 per kg menghasilkan Rp39.000.000.',
                'Perhitungan laba bersih usahatani (TR - TC = Rp30.500.000 per musim tanam 3-4 bulan) serta uji kelayakan rasio penerimaan terhadap biaya (R/C Ratio = Rp39 jt / Rp8,5 jt = 4,58 > 1 / sangat menguntungkan).'
              ],
              placeholder: 'Tuliskan hasil perhitungan matematis Anda mengenai konversi ubinan ke ton/ha, rincian biaya modal Rp8,5 juta per hektar, penerimaan hasil panen, laba bersih, dan nilai R/C ratio... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Statistik Pertanian Tanaman Pangan & Survei Ubinan\n2. Buku Analisis Finansial Usahatani Padi Sawah Daerah',
              defaultExp: 'Kalkulasi matematis pada usahatani padi sawah seluas 1 hektar di Belitang menunjukkan produktivitas rata-rata 6,0 hingga 6,7 ton per hektar dari hasil ubinan 3,8-4,2 kg. Dengan struktur modal operasional sekitar Rp8.500.000 dan harga jual gabah kering panen Rp6.500 per kg, petani memperoleh penerimaan kotor Rp39.000.000 dan keuntungan bersih Rp30.500.000 per musim, menghasilkan R/C Ratio 4,58 yang membuktikan efisiensi finansial tinggi.',
              defaultSources: '1. BPS Kabupaten OKU Timur: Hasil Survei Ubinan dan Analisis Biaya Pertanian.\n2. Modul Analisis Usahatani Berkelanjutan, Fakultas Pertanian Universitas Sriwijaya.'
            },
            {
              key: 'E',
              title: 'Sintesis STEM: Solusi Terpadu Menghadapi Kelangkaan Pupuk & Perubahan Iklim',
              subtitle: 'Integrasi Sains Pupuk Organik, Alsintan Presisi, Sumur Pantek & Pembukuan Arus Kas Mandiri',
              guidedPoints: [
                'Keterpaduan pilar Sains (uji tanah cepat dan pembuatan pupuk kompos/bokashi jerami) dalam menanggulangi pembatasan kuota pupuk subsidi kimia.',
                'Keterpaduan Teknologi dan Rekayasa: penjadwalan olah tanah mekanis dengan ketersediaan air saluran BK serta kesiapsiagaan sumur pantek menghadapi musim kemarau ekstrem (El Nino).',
                'Pilar Matematika: pentingnya pencatatan arus kas dan penghitungan HPP agar petani tidak terjebak skema ijon atau pinjaman tengkulak berbunga tinggi.',
                'Rekomendasi aksi nyata bagi generasi muda SMA dalam mengembangkan wirausaha agribisnis modern (smart farming) di desa-desa Kabupaten OKU Timur.'
              ],
              placeholder: 'Uraikan sintesis solusi terpadu STEM yang Anda usulkan untuk membantu petani OKU Timur mengatasi kendala pupuk, kemarau, dan pembukuan finansial modern... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Rencana Strategis Dinas Pertanian Kabupaten OKU Timur\n2. Modul Inovasi Pertanian Cerdas (Smart Farming) Berbasis Kearifan Lokal',
              defaultExp: 'Sintesis terpadu empat pilar STEM memberikan peta jalan solutif bagi kemandirian petani OKU Timur. Pendekatan sains pemupukan organik berbasis jerami mampu menekan biaya beli pupuk kimia, disinergikan dengan rekayasa sumur pantek saat kemarau, adopsi alsintan combine harvester yang efisien, serta disiplin pembukuan matematika finansial yang melindungi petani dari jeratan ijon demi tercapainya kedaulatan pangan lokal.',
              defaultSources: '1. Rencana Strategis Peningkatan Produktivitas Pertanian Dinas Pertanian OKU Timur.\n2. Naskah Kebijakan Smart Farming Berkelanjutan, Balitbangtan RI.'
            }
          ]
        },
        perkebunan: {
          key: 'perkebunan',
          name: 'Perkebunan Karet & Sawit',
          badge: 'Komoditas Unggulan Perkebunan',
          icon: 'forest',
          desc: 'Lateks Karet, Panen TBS Sawit, Rorak Konservasi Lahan & Analisis Finansial Pekebun',
          cards: [
            {
              key: 'A',
              title: 'Science: Fisiologi Pembuluh Lateks Karet & Kebutuhan Nutrisi Kelapa Sawit',
              subtitle: 'Tekanan Turgor Aliran Getah Dini Hari, Jamur Bidang Sadap & Penyerbukan Alami Kumbang Sawit',
              guidedPoints: [
                'Fisiologi pembuluh latisifer tanaman karet (Hevea brasiliensis): hubungan suhu udara dingin dini hari (22-26 derajat Celcius) dengan tingginya tekanan turgor yang melancarkan aliran getah lateks.',
                'Identifikasi dan penanganan penyakit bidang sadap karet: jamur upas, Jamur Akar Putih (JAP), dan penyakit alur sadap (kering alur sadap / KAS) akibat over-sadap.',
                'Kebutuhan agronomi kelapa sawit (Elaeis guineensis): penyerapan hara N, P, K, Mg pada tanah mineral/gambut OKU Timur dan peranan serangga kumbang penyerbuk Elaeidobius kamerunicus.',
                'Kriteria kematangan biologis Tandan Buah Segar (TBS) kelapa sawit: indikator brondolan lepas alami di piringan (minimal 5 butir) untuk menjamin rendemen minyak sawit mentah (CPO) maksimal.'
              ],
              placeholder: 'Uraikan hasil kajian sains Anda mengenai fisiologi getah karet, pengaruh cuaca dini hari, pencegahan jamur bidang sadap, serta penyerbukan buah sawit di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Penelitian Karet Sembawa Sumsel, Petunjuk Teknis Penyadapan Karet\n2. Pusat Penelitian Kelapa Sawit (PPKS) Medan, Buku Saku Budidaya Kelapa Sawit',
              defaultExp: 'Kajian sains perkebunan di OKU Timur membuktikan bahwa aktivitas penyadapan karet ideal dilakukan pada dini hari pukul 05.00-06.30 WIB saat tekanan turgor pembuluh lateks mencapai puncaknya. Sementara pada tanaman kelapa sawit, keberadaan populasi kumbang Elaeidobius kamerunicus sangat vital dalam menjamin persentase pembentukan buah (fruit set) di atas 80% sehingga tandan buah segar padat dan berbobot optimal.',
              defaultSources: '1. Balai Penelitian Getah Karet Sembawa Banyuasin: Pedoman Fisiologi Penyadapan.\n2. Pusat Penelitian Kelapa Sawit (PPKS) Medan: Standar Agronomi Tanaman Sawit.'
            },
            {
              key: 'B',
              title: 'Technology: Inovasi Pisau Sadap Ergonomis, Koagulan Asam Semut & Alat Panen Sawit',
              subtitle: 'Pisau Deres Tarik/Dorong, Asam Format Ramah Lingkungan, Dodos/Egrek Fiber & Alat Uji DRC',
              guidedPoints: [
                'Inovasi desain pisau sadap karet (pisau deres model dorong dan tarik) yang presisi mengatur ketebalan irisan kulit (1,5 - 2 mm) tanpa melukai lapisan kambium kayu.',
                'Teknologi bahan pembeku getah karet: keunggulan penggunaan asam semut (asam format) ramah lingkungan yang menghasilkan bekuan karet (lump) elastis dan tidak berbau busuk dibandingkan tawas/cuka para.',
                'Mekanisasi panen kelapa sawit: penggunaan dodos baja untuk pohon muda, egrek bergagang pipa fiber fleksibel hingga 12 meter, dan mesin egrek bermotor (motorized palm cutter).',
                'Pemanfaatan timbangan gantung digital dan alat pengukur Kadar Karet Kering (Dry Rubber Content / DRC meter) dalam transaksi penjualan hasil panen di tingkat pengepul (RAM).'
              ],
              placeholder: 'Tuliskan hasil telaah teknologi Anda mengenai pisau sadap ergonomis, keunggulan koagulan asam semut, alat egrek panen sawit, dan timbangan digital di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Pengolahan Bahan Olah Karet (BOKAR) Bersih, Ditjen Perkebunan Kementan\n2. Petunjuk Penggunaan Alat Panen Kelapa Sawit Ergonomis',
              defaultExp: 'Modernisasi peralatan perkebunan rakyat di OKU Timur mendorong peningkatan mutu bahan olah karet (Bokar) dan efisiensi panen sawit. Penerapan asam semut sebagai koagulan resmi menghasilkan bekuan lateks bersih dengan elastisitas tinggi yang dihargai lebih mahal oleh pabrik ban, sementara penggunaan egrek bergagang fiber ringan meningkatkan keselamatan kerja pemanen sawit.',
              defaultSources: '1. Pedoman Standardisasi Bahan Olah Karet Rakyat, Dinas Perkebunan Provinsi Sumsel.\n2. Petunjuk Teknis Peralatan Panen Kelapa Sawit Berkelanjutan, PPKS.'
            },
            {
              key: 'C',
              title: 'Engineering: Rekayasa Terasering Konservasi Lahan & Jalur Angkut Logistik Kebun',
              subtitle: 'Rorak Resapan Air, Penataan Piringan Sawit, Mulsa Tankos & Jalan Pasar Pikul Angkrong',
              guidedPoints: [
                'Rekayasa terasering bangku dan pembuatan lubang rorak resapan air pada kebun karet/sawit di kontur tanah bergelombang untuk mencegah erosi lapisan top soil dan hanyutnya butiran pupuk.',
                'Penataan sanitasi piringan pohon sawit diameter 2-3 meter serta pemanfaatan mulsa tandan kosong kelapa sawit (tankos) untuk menjaga kelembapan tanah dan menekan pertumbuhan gulma.',
                'Desain rancang bangun jalur jalan lorong angkut (pasar pikul) dan gorong-gorong drainase parit agar gerobak sorong (angkrong) atau sepeda motor gandeng lancar mengangkut TBS ke TPH.',
                'Rekayasa kolam embung mini penampung air hujan di kebun sebagai sumber air penyemprotan herbisida dan langkah antisipasi kebakaran kebun saat musim kemarau kering.'
              ],
              placeholder: 'Uraikan hasil analisis rekayasa Anda mengenai pembuatan rorak resapan di lahan bergelombang, penataan jalur pasar pikul sawit, dan kolam embung kebun di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Teknis Konservasi Tanah dan Air Lahan Perkebunan, Kementan RI\n2. Panduan Tata Kelola Infrastruktur Kebun Sawit Rakyat',
              defaultExp: 'Rekayasa konservasi tanah di area perkebunan rakyat OKU Timur diwujudkan melalui pembuatan rorak berdimensi 2x0.5x0.5 meter di antara barisan pohon guna menjebak aliran air permukaan dan menampung seresah daun lapuk. Penataan jalan pasar pikul berfondasi tanah padat sangat krusial mempercepat evakuasi tandan buah segar ke tempat pengumpulan hasil sebelum asam lemak bebas (ALB) buah meningkat.',
              defaultSources: '1. Pedoman Konservasi Tanah dan Tata Air Lahan Perkebunan Berkelanjutan, Balittri.\n2. Standar Manajemen Kebun Kelapa Sawit Swadaya, Ditjen Perkebunan.'
            },
            {
              key: 'D',
              title: 'Mathematics: Kalkulasi Bobot Kering Getah (DRC), Panen TBS & Keuntungan Bulanan',
              subtitle: 'Rumus Konversi Getah Basah ke DRC 50%, Estimasi Tonase TBS per Hektar & Analisis Arus Kas',
              guidedPoints: [
                'Perhitungan bobot efektif getah karet: rumus konversi berat bekuan getah basah (misal 120 kg) dengan Kadar Karet Kering (DRC = 50-60%) menjadi bobot kering yang dibayarkan pabrik.',
                'Perhitungan produktivitas kelapa sawit per hektar: estimasi 136 pohon per hektar dengan rata-rata 1.5 tandan per pohon per bulan dan berat rata-rata 16 kg per janjang (estimasi 3.2 ton TBS/bulan).',
                'Struktur rincian modal pengeluaran kebun: pembelian pupuk NPK/KCl, herbisida pembersih gulma, upah deres sistem bagi hasil 2:1 atau sewa jasa angkut truk ke RAM.',
                'Kalkulasi penerimaan kotor dan laba bersih bulanan pekebun berdasarkan fluktuasi harga karet harian (Rp11.000 - Rp13.000/kg) dan harga TBS di RAM pengepul OKU Timur (Rp2.300 - Rp2.600/kg).'
              ],
              placeholder: 'Tuliskan hasil perhitungan matematis Anda mengenai rumus DRC karet, estimasi panen 3,2 ton TBS/bulan, rincian biaya pupuk, dan keuntungan bersih pekebun... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Statistik Perkebunan Karet dan Kelapa Sawit\n2. Buku Analisis Finansial Usaha Perkebunan Rakyat',
              defaultExp: 'Analisis matematika pada kebun kelapa sawit rakyat umur produktif 8 tahun di OKU Timur menghasilkan rata-rata panen 3,2 ton TBS per hektar per bulan. Dengan tingkat harga jual di RAM pengepul lokal sebesar Rp2.400 per kg, diperoleh penerimaan kotor Rp7.680.000 per bulan. Setelah dikurangi biaya pupuk dan upah panen angkut sebesar Rp2.500.000, pekebun menikmati keuntungan bersih Rp5.180.000 per hektar setiap bulannya.',
              defaultSources: '1. BPS Kabupaten OKU Timur: Statistik Harga Komoditas Perkebunan Daerah.\n2. Laporan Analisis Kelayakan Usaha Perkebunan Rakyat, Dinas Perkebunan Sumsel.'
            },
            {
              key: 'E',
              title: 'Sintesis STEM: Integrasi Peremajaan Kebun (Replanting) & Pola Tumpangsari',
              subtitle: 'Solusi Pohon Tua Rusak, Pemanfaatan Bibit Klon Unggul PPKS/Sembawa & Tumpangsari Jagung',
              guidedPoints: [
                'Keterpaduan pilar Sains dan Rekayasa dalam merencanakan program peremajaan kebun (replanting) bagi tegakan pohon karet tua atau kebun sawit yang produktivitasnya telah merosot.',
                'Pemilihan bibit tersertifikasi unggul: bibit karet klon PB 260 / IRR dari Balit Sembawa dan bibit kelapa sawit Dami Mas / Marihat dari Pusat Penelitian Kelapa Sawit (PPKS).',
                'Penerapan pilar Matematika dan Ekonomi: mengoptimalkan lahan sela kebun muda (usia 1-3 tahun) dengan tanaman tumpangsari jagung atau kedelai untuk menjaga ketersediaan arus kas keluarga pekebun.',
                'Rekomendasi strategis bagi generasi muda OKU Timur dalam mengelola kebun keluarga secara profesional dan terukur berbasis ilmu pengetahuan modern.'
              ],
              placeholder: 'Uraikan sintesis solusi terpadu STEM yang Anda usulkan mengenai program replanting kebun, adopsi bibit bersertifikat, dan tumpangsari tanaman sela... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Program Peremajaan Sawit Rakyat (PSR), BPDPKS\n2. Naskah Kebijakan Diversifikasi Usaha Perkebunan Berkelanjutan',
              defaultExp: 'Sintesis empat pilar STEM pada sektor perkebunan OKU Timur menawarkan solusi terpadu dalam menghadapi tantangan penuaan tanaman dan fluktuasi harga komoditas global. Pemanfaatan bibit bersertifikasi unggul hasil riset sains, penataan terasering presisi, serta optimalisasi tanaman tumpangsari pangan pada masa tanaman belum menghasilkan (TBM) mampu menjaga stabilitas finansial pekebun secara berkesinambungan.',
              defaultSources: '1. Badan Pengelola Dana Perkebunan Kelapa Sawit (BPDPKS): Pedoman Peremajaan Kebun.\n2. Jurnal Rekayasa dan Kebijakan Perkebunan Berkelanjutan, Balitbangtan.'
            }
          ]
        },
        perikanan: {
          key: 'perikanan',
          name: 'Perikanan Air Tawar',
          badge: 'Sentra Patin & Lele Sumsel',
          icon: 'phishing',
          desc: 'Budidaya Patin/Lele, Siklus Kualitas Air/Amonia, Aerasi Kincir, Bioflok & FCR Pakan',
          cards: [
            {
              key: 'A',
              title: 'Science: Kualitas Air Kolam Budidaya, Siklus Amonia & Fisiologi Ikan Air Tawar',
              subtitle: 'Batas Ideal pH Air 6.5-8.0, Suhu, Oksigen Terlarut (DO), Toksisitas Amonia & Pernapasan Tambahan',
              guidedPoints: [
                'Parameter fisika-kimia air kolam budidaya di OKU Timur: batas ideal pH air (6,5 - 8,0), suhu optimal (27 - 30 derajat Celcius), dan kadar Dissolved Oxygen (DO minimal 4 mg/L).',
                'Siklus biogeokimia amonia di dasar kolam: pembentukan senyawa gas amonia beracun (NH3) dari timbunan kotoran ikan dan sisa pelet pakan yang membusuk secara anaerobik.',
                'Fisiologi respirasi ikan patin (Pangasius) dan lele (Clarias): adaptasi organ pernapasan tambahan (arborescent organ) saat kadar oksigen terlarut kolam menurun drastis di malam hari.',
                'Pencegahan penyakit endemik ikan air tawar: infeksi bakteri Aeromonas hydrophila, jamur kulit Saprolegnia, dan kutu air melalui pengapuran dasar kolam dan aplikasi probiotik lactobacillus.'
              ],
              placeholder: 'Uraikan hasil kajian sains Anda mengenai parameter pH dan DO air kolam, bahaya endapan amonia, serta cara kerja organ pernapasan tambahan ikan patin/lele di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Riset Perikanan Budidaya Air Tawar (BRPBAT), Manajemen Kualitas Air Kolam Patin\n2. Buku Fisiologi Ikan Air Tawar dan Pengendalian Penyakit Endemik',
              defaultExp: 'Kajian sains perikanan di sentra budidaya Belitang menegaskan bahwa keberhasilan pembesaran ikan patin sangat dipengaruhi stabilitas parameter air kolam, terutama kadar oksigen terlarut (DO) di atas 4 mg/L dan pH netral 7.0. Akumulasi sisa pakan pelet di dasar kolam berisiko memicu ledakan senyawa amonia toksik yang menghambat pertumbuhan ikan, sehingga diperlukan aplikasi mikroba probiotik pengurai limbah organik.',
              defaultSources: '1. Balai Riset Perikanan Budidaya Air Tawar dan Penyuluhan Perikanan (BRPBATPP) Bogor.\n2. Pedoman Pengelolaan Kualitas Air Budidaya Patin, Dinas Perikanan dan Peternakan OKU Timur.'
            },
            {
              key: 'B',
              title: 'Technology: Mesin Aerator Kincir Air, Mesin Pelet Apung Mandiri & Monitoring Digital',
              subtitle: 'Kincir Air Paddle Wheel, Mesin Extruder Pakan Mandiri, Automatic Feeder & pH Meter Digital',
              guidedPoints: [
                'Prinsip kerja mesin aerasi mekanis: kincir air (paddle wheel), aerator celup blower, dan venturi injector dalam melarutkan oksigen udara bebas ke dalam badan air kolam.',
                'Teknologi mesin pencetak pelet pakan apung mandiri (mesin extruder): pemanfaatan suhu dan tekanan tinggi untuk mematangkan pati pakan sehingga pelet mengapung stabil dan tidak mudah hancur.',
                'Pemanfaatan alat automatic fish feeder (pelontar pakan otomatis berpengatur waktu digital) guna mendistribusikan pakan secara merata sesuai ritme nafsu makan ikan.',
                'Penggunaan alat ukur instrumen digital portabel lapangan: pH meter digital, DO meter celup, dan refraktometer untuk memantau kelayakan air kolam secara harian.'
              ],
              placeholder: 'Tuliskan hasil telaah teknologi Anda mengenai cara kerja kincir air aerator, mesin pembuat pakan pelet apung mandiri, automatic feeder, dan alat ukur digital... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Petunjuk Rancang Bangun Mesin Pembuat Pakan Ikan Mandiri, KKP RI\n2. Panduan Pengoperasian Aerator dan Kincir Air Kolam Intensif',
              defaultExp: 'Adopsi teknologi budidaya perikanan modern di OKU Timur memegang peranan krusial dalam menekan biaya operasional pembudidaya. Penggunaan mesin pembuat pelet mandiri berbasis bahan baku lokal mampu menurunkan pengeluaran pakan pabrik hingga 30%, sementara pengoperasian kincir air aerator di malam hari menjaga ketersediaan oksigen terlarut sehingga laju konversi pakan ikan tetap optimal.',
              defaultSources: '1. Balai Besar Perikanan Budidaya Air Tawar (BBPBAT) Sukabumi: Rekayasa Pakan Mandiri.\n2. Petunjuk Teknis Peralatan Aerasi Kolam Ikan Air Tawar, Kementerian Kelautan dan Perikanan.'
            },
            {
              key: 'C',
              title: 'Engineering: Rekayasa Sirkulasi Air Bertingkat, Kolam Bioflok & Pembuangan Sentral',
              subtitle: 'Kolam Bundar Terpal Bioflok, Saluran Pipa Central Drain, Sirkulasi Gravitasi & Kolam Pengendapan',
              guidedPoints: [
                'Desain tata letak kolam air mengalir bertingkat yang memanfaatkan perbedaan ketinggian gravitasi dari saluran sekunder irigasi Komering menuju kolam pembesaran.',
                'Rekayasa kolam bundar terpal berbasis sistem Bioflok: penumbuhan konsorsium mikroorganisme heterotrof pembentuk flok untuk mengubah amonia menjadi gumpalan protein pakan alami ikan.',
                'Desain instalasi pembuangan kotoran terpusat di dasar kolam (Central Drain / Bottom Drain) dengan pipa siphon bersusun untuk menyedot endapan feses tanpa perlu menguras kolam.',
                'Rekayasa kolam sedimentasi pengendapan lumpur dan biofilter tanaman eceng gondok sebelum air buangan kolam dialirkan kembali ke saluran umum agar tidak mencemari lingkungan.'
              ],
              placeholder: 'Uraikan hasil analisis rekayasa Anda mengenai tata letak saluran gravitasi kolam, cara kerja kolam bundar bioflok, dan sistem pipa central drain di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Rekayasa Konstruksi Kolam Ikan Bioflok, Direktorat Jenderal Perikanan Budidaya\n2. Petunjuk Teknis Pengelolaan Limbah Kolam Budidaya Ikan Berkelanjutan',
              defaultExp: 'Rekayasa instalasi kolam di kawasan budidaya patin Belitang diarahkan pada efisiensi ruang dan keberlanjutan lingkungan. Penerapan sistem kolam terpal bulat dengan saluran pembuangan sentral (central drain) memudahkan pembuangan endapan lumpur feses setiap pagi secara gravitasi, disinergikan dengan kolam pengendapan tanaman air yang menyaring air buangan sebelum kembali ke badan sungai.',
              defaultSources: '1. Pedoman Rancang Bangun Kolam Bioflok Budidaya Air Tawar, Ditjen Perikanan Budidaya KKP.\n2. Modul Rekayasa Pengolahan Air dan Limbah Budidaya Perikanan, Institut Pertanian Bogor.'
            },
            {
              key: 'D',
              title: 'Mathematics: Kalkulasi Nilai FCR, Tingkat Kelangsungan Hidup (SR) & Laba Panen Patin',
              subtitle: 'Rumus Rasio Konversi Pakan (FCR), Persentase Survival Rate (SR), Modal Pelet & Margin Penjualan',
              guidedPoints: [
                'Rumus perhitungan rasio konversi pakan (Feed Conversion Ratio / FCR): bobot total pakan yang dihabiskan dibagi pertambahan bobot total daging ikan (target ideal patin 1.1 - 1.3).',
                'Rumus tingkat kelangsungan hidup (Survival Rate / SR): jumlah ekor ikan yang dipanen dibagi jumlah benih awal yang ditebar dikalikan 100% (target minimal di atas 85%).',
                'Kalkulasi struktur modal riil budidaya 1 petak kolam patin (2.000 ekor benih, 1.600 kg pakan pelet, probiotik, dan listrik/bahan bakar pompa air).',
                'Perhitungan hasil panen (1.500 kg x Rp18.000/kg = Rp27.000.000), pengurangan modal biaya operasional, keuntungan bersih per siklus 6 bulan, dan perhitungan rasio kelayakan R/C ratio.'
              ],
              placeholder: 'Tuliskan hasil perhitungan matematis Anda mengenai rumus FCR pakan, target SR 85%, rincian modal 2.000 ekor benih, total penerimaan Rp27 juta, dan laba bersihnya... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Statistik Perikanan Budidaya Air Tawar\n2. Buku Panduan Analisis Ekonomi Usaha Budidaya Ikan Patin Skala Rakyat',
              defaultExp: 'Perhitungan matematis menjadi tolok ukur utama efisiensi budidaya patin di Belitang, di mana angka FCR pakan ditargetkan pada kisaran 1,15-1,25 dengan tingkat kelangsungan hidup (SR) mencapai 88%. Dengan modal produksi Rp18.500.000 untuk 2.000 ekor ikan dan perolehan panen 1.500 kg seharga Rp18.000 per kg, pembudidaya meraih penerimaan Rp27.000.000 dengan laba bersih Rp8.500.000 per siklus kolam.',
              defaultSources: '1. BPS Kabupaten OKU Timur: Statistik Produksi dan Nilai Tambah Perikanan Air Tawar.\n2. Laporan Analisis Finansial Usaha Budidaya Ikan Air Tawar, Fakultas Perikanan Unsri.'
            },
            {
              key: 'E',
              title: 'Sintesis STEM: Solusi Efisiensi Biaya Pakan Mandiri & Hilirisasi Produk Olahan Patin',
              subtitle: 'Formulasi Dedak Padi Lokal, Mesin Pelet Extruder, Sirkulasi Biofilter & Wirausaha Fillet Patin',
              guidedPoints: [
                'Keterpaduan pilar Sains nutrisi dan Teknologi mesin pelet: meracik formula pakan mandiri berbahan dedak padi lokal Belitang, tepung ikan rucah, dan bungkil kedelai berprotein 28-30%.',
                'Keterpaduan Rekayasa dan Lingkungan: penerapan kolam sirkulasi biofilter yang mengurangi frekuensi pergantian air kolam dan menekan risiko stres kematian bibit ikan.',
                'Pilar Matematika dan Wirausaha: strategi hilirisasi dari sekadar menjual ikan basah segar menjadi produk olahan fillet patin beku, abon ikan, dan kerupuk patin bernilai jual dua kali lipat.',
                'Peluang kolaborasi siswa dan kelompok pembudidaya ikan dalam membangun ekosistem agribisnis perikanan modern yang tangguh di Kabupaten OKU Timur.'
              ],
              placeholder: 'Uraikan sintesis solusi terpadu STEM yang Anda usulkan mengenai formulasi pakan mandiri dedak Belitang, rekayasa sirkulasi air, dan hilirisasi produk olahan patin... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Petunjuk Teknis Hilirisasi Komoditas Patin Nasional, KKP RI\n2. Modul Wirausaha Pengolahan Hasil Perikanan Air Tawar Berkelanjutan',
              defaultExp: 'Sintesis empat pilar STEM pada sektor perikanan air tawar OKU Timur membuktikan bahwa pemanfaatan dedak padi hasil kilang beras Belitang sebagai bahan baku pelet apung mandiri secara drastis menekan ketergantungan pakan pabrik. Disertai rekayasa sistem pembuangan lumpur sentral dan hilirisasi pengolahan daging patin menjadi produk beku higienis, usaha perikanan lokal mampu berkembang menjadi industri unggulan berdaya saing tinggi.',
              defaultSources: '1. Pedoman Hilirisasi dan Nilai Tambah Produk Perikanan Budidaya, KKP RI.\n2. Naskah Riset Terapan Formulasi Pakan Berbasis Biomassa Lokal, BRPBAT.'
            }
          ]
        },
        peternakan: {
          key: 'peternakan',
          name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',
          badge: 'Ternak & Bioenergi Pedesaan',
          icon: 'pets',
          desc: 'Sapi, Kambing, Unggas Ayam & Bebek, Fermentasi Jerami Silase, Chopper Pakan, Reaktor Biogas & ADG/FCR',
          cards: [
            {
              key: 'A',
              title: 'Science: Nutrisi Ruminansia/Unggas, Fermentasi Jerami Silase & Biosekuriti Ternak',
              subtitle: 'Mikroba Rumen Sapi, Bakteri Asam Laktat Silase Pakan, Fisiologi Metabolisme Unggas & Vaksinasi PMK',
              guidedPoints: [
                'Fisiologi sistem pencernaan poligastrik pada sapi (rumen, retikulum, omasum, abomasum): peranan mikroba rumen dalam mencerna serat kasar selulosa dari limbah hijauan.',
                'Sains bioteknologi fermentasi pakan ternak: pemanfaatan inokulan bakteri asam laktat (Lactobacillus) dan molase tetes tebu dalam fermentasi jerami padi sawah dan rumput gajah/odot menjadi silase berkualitas tinggi.',
                'Fisiologi metabolisme ternak unggas (ayam petelur/pedaging): pengaruh stres panas cuaca (heat stress) terhadap penurunan nafsu makan dan penurunan produksi telur/daging.',
                'Prosedur pencegahan penyakit menular ternak (Penyakit Mulut dan Kuku / PMK pada sapi, flu burung / ND pada ayam) melalui sanitasi kandang, isolasi karantina, dan vaksinasi berkala.'
              ],
              placeholder: 'Uraikan hasil kajian sains Anda mengenai sistem pencernaan sapi, cara kerja fermentasi jerami silase, pencegahan stres panas ayam, dan vaksinasi PMK di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Penelitian Ternak (Balitnak) Ciawi, Pedoman Nutrisi dan Pakan Peternakan Sapi\n2. Petunjuk Teknis Pengendalian Penyakit Mulut dan Kuku (PMK), Kementan RI',
              defaultExp: 'Kajian sains peternakan di perdesaan OKU Timur menekankan optimalisasi jerami padi sawah yang melimpah melalui fermentasi anaerobik menggunakan bakteri asam laktat dan molase. Proses silase ini meningkatkan kecernaan serat kasar di dalam rumen sapi serta menyediakan cadangan pakan bernutrisi saat musim kemarau, sekaligus penerapan sanitasi kandang yang ketat guna membendung penularan virus PMK.',
              defaultSources: '1. Publikasi Balai Penelitian Ternak (Balitnak): Teknologi Pengolahan Limbah Pertanian untuk Pakan Ruminansia.\n2. Petunjuk Teknis Manajemen Kesehatan Ternak, Dinas Peternakan dan Perikanan OKU Timur.'
            },
            {
              key: 'B',
              title: 'Technology: Mesin Chopper Perajang Rumput, Inkubator Penetas & Timbangan Digital',
              subtitle: 'Mesin Perajang Rumput Disel, Mesin Penetas Telur Otomatis, Timbangan Palet Sapi & Nipple Drinker',
              guidedPoints: [
                'Prinsip kerja mesin perajang rumput dan limbah jerami (chopper bermesin bensin/disel): memotong hijauan menjadi ukuran seragam (2-5 cm) untuk meningkatkan palatabilitas dan daya cerna sapi.',
                'Teknologi mesin penetas telur (inkubator digital otomatis): pengaturan suhu thermostat presisi (37,5 - 38,5 derajat Celcius), pemutar rak otomatis (egg turner), dan kelembapan konstan.',
                'Peralatan timbangan digital ternak: penggunaan timbangan gantung digital untuk ayam dan timbangan palet alas berkapasitas 1 ton untuk memantau kenaikan bobot harian sapi secara akurat.',
                'Inovasi instalasi air minum otomatis: penggunaan sistem mangkuk klep otomatis (automatic water bowl) pada sapi dan nipple drinker pada kandang ayam yang higienis serta mencegah air terbuang.'
              ],
              placeholder: 'Tuliskan hasil telaah teknologi Anda mengenai cara kerja mesin chopper perajang rumput, inkubator penetas telur otomatis, timbangan palet digital, dan instalasi air minum ternak... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Penggunaan Mesin dan Peralatan Peternakan Modern, Kementan RI\n2. Petunjuk Operasional Inkubator Penetas Telur dan Chopper Pakan',
              defaultExp: 'Pemanfaatan teknologi peralatan peternakan di sentra peternakan OKU Timur meningkatkan efisiensi waktu kerja dan pemantauan bobot ternak. Mesin chopper mekanis mempermudah pencampuran pakan konsentrat dengan hijauan terpotong halus, sementara timbangan palet digital memungkinkan peternak mengukur laju pertumbuhan harian secara presisi tanpa menduga-duga.',
              defaultSources: '1. Pedoman Mekanisasi dan Peralatan Peternakan Rakyat, Balai Besar Pengujian Alsintan.\n2. Modul Penerapan Teknologi Tepat Guna Peternakan, Balitnak Kementan RI.'
            },
            {
              key: 'C',
              title: 'Engineering: Rekayasa Reaktor Biogas Kotoran Sapi & Desain Kandang Sehat Drainase Miring',
              subtitle: 'Instalasi Biogas Kubah Beton, Gas Metana Kompor Petani, Lantai Miring Pemisah Urine & Ventilasi Kandang',
              guidedPoints: [
                'Rancang bangun instalasi reaktor Biogas kotoran sapi (model kubah beton fixed dome atau drum tertutup): proses dekomposisi anaerobik menghasilkan gas metana (CH4) sebagai energi kompor memasak rumah tangga peternak.',
                'Desain lantai kandang panggung sehat berkemiringan 2-3 derajat: pemisahan alami kotoran padat dan urine sapi secara gravitasi menuju parit penampung pupuk organik cair.',
                'Rekayasa sistem ventilasi udara alami dan tirai buka-tutup pada kandang ayam guna memastikan sirkulasi oksigen lancar dan mengurangi konsentrasi gas amonia berbau menyengat.',
                'Desain bak fermentasi pupuk kompos kotoran sapi padat (solid manure) menjadi pupuk bokashi siap pakai untuk menyuburkan lahan sawah padi di sekitar kandang (konsep circular zero waste).'
              ],
              placeholder: 'Uraikan hasil analisis rekayasa Anda mengenai instalasi reaktor biogas dari kotoran sapi, desain lantai miring pemisah urine, dan bak fermentasi kompos kandang di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Rancang Bangun Reaktor Biogas Skala Rumah Tangga Peternak, Kementerian ESDM\n2. Petunjuk Teknis Konstruksi Kandang Peternakan Sapi Sehat dan Ramah Lingkungan',
              defaultExp: 'Rekayasa instalasi reaktor biogas kotoran sapi di perdesaan OKU Timur memberikan manfaat ganda dalam hal sanitasi lingkungan dan penyediaan energi alternatif terbarukan. Gas metana yang dihasilkan dialirkan langsung ke kompor masak petani untuk menghemat elpiji, sementara desain lantai kandang berkemiringan khusus memisahkan urine sapi menuju parit fermentasi pupuk cair tanaman pangan.',
              defaultSources: '1. Pedoman Rancang Bangun Instalasi Biogas Peternakan Berkelanjutan, Kementerian ESDM.\n2. Pedoman Konstruksi Kandang Sehat Ruminansia, Direktorat Jenderal Peternakan dan Kesehatan Hewan.'
            },
            {
              key: 'D',
              title: 'Mathematics: Kalkulasi Pertambahan Bobot Harian (ADG), FCR Ayam & Margin Keuntungan',
              subtitle: 'Rumus ADG Peternakan Sapi (kg/hari), Rasio Pakan FCR Ayam Broiler, Modal Bakalan & Nilai Jual Qurban',
              guidedPoints: [
                'Rumus perhitungan Pertambahan Bobot Badan Harian (Average Daily Gain / ADG) sapi: bobot akhir dikurangi bobot awal dibagi durasi hari masa penggemukan (target ideal peternakan sapi 0,8 - 1,2 kg/hari).',
                'Rumus rasio konversi pakan ternak unggas (FCR ayam broiler): total pakan dikonsumsi dibagi total bobot daging panen (target FCR 1,5 - 1,6 pada umur panen 35 hari bobot 2 kg).',
                'Kalkulasi rincian modal usaha penggemukan sapi bakalan lokal di OKU Timur: pembelian bibit bakalan bobot 250 kg (Rp13,0 jt), pakan konsentrat dedak + obat 4 bulan (Rp3,3 jt), dan tenaga kerja (Rp700 rb) dengan total modal Rp17.000.000.',
                'Perhitungan hasil penjualan sapi bobot 380 kg saat momen Idul Adha atau pasar ternak (harga jual Rp22.500.000), laba bersih usahatani (Rp5.500.000 per ekor), dan rasio kelayakan R/C ratio usahatani.'
              ],
              placeholder: 'Tuliskan hasil perhitungan matematis Anda mengenai rumus ADG sapi, target FCR ayam, rincian modal bakalan sapi, total penerimaan penjualan qurban, dan laba bersihnya... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Populasi Ternak dan Analisis Usaha Penggemukan Sapi\n2. Buku Analisis Finansial Usaha Peternakan Sapi dan Unggas Pedesaan',
              defaultExp: 'Kalkulasi matematis pada usaha peternakan sapi di Belitang menunjukkan capaian ADG rata-rata 0,95 kg per hari dengan perlakuan pakan konsentrat dedak dan silase jerami. Selama periode penggemukan 120 hari dengan total modal produksi Rp17.000.000 per ekor, penjualan sapi berbobot 380 kg pada momen hari raya menghasilkan penerimaan Rp22.500.000 dengan keuntungan bersih Rp5.500.000 per ekor.',
              defaultSources: '1. BPS Kabupaten OKU Timur: Statistik Peternakan dan Penjualan Hewan Qurban.\n2. Laporan Analisis Finansial Peternakan Rakyat, Fakultas Peternakan Universitas Gadjah Mada.'
            },
            {
              key: 'E',
              title: 'Sintesis STEM: Integrasi Tanaman-Ternak (Crop-Livestock System) & Nol Limbah (Zero Waste)',
              subtitle: 'Sinergi Jerami Padi Sawah, Pakan Ternak Sapi, Pupuk Organik Bokashi & Kemandirian Energi Gas',
              guidedPoints: [
                'Keterpaduan 4 pilar STEM dalam sistem integrasi tanaman-ternak (Crop-Livestock System): jerami sisa panen sawah diolah menjadi pakan sapi silase, kotoran sapi diproses menjadi biogas dan pupuk organik sawah.',
                'Keterpaduan Teknologi dan Rekayasa: penggunaan mesin chopper untuk penyeragaman pakan dan reaktor biogas anaerobik yang mewujudkan prinsip nol limbah (zero waste farming).',
                'Pilar Matematika dan Efisiensi: kalkulasi penghematan biaya pupuk kimia sawah hingga 40% berkat substitusi pupuk kompos kotoran sapi dan penghematan biaya gas kompor memasak.',
                'Peluang wirausaha mandiri pemuda pedesaan OKU Timur dalam penyediaan bakalan ternak qurban berstandar kesehatan resmi dan produksi pupuk organik kemasan komersial.'
              ],
              placeholder: 'Uraikan sintesis solusi terpadu STEM yang Anda usulkan mengenai integrasi padi-sapi (Crop-Livestock System), penghematan pupuk kompos, biogas, dan wirausaha peternakan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Panduan Pengembangan Sistem Integrasi Tanaman-Ternak (SITT) Kementan RI\n2. Naskah Inovasi Pertanian-Peternakan Sirkular Berkelanjutan',
              defaultExp: 'Sintesis empat pilar STEM pada sektor peternakan OKU Timur mewujudkan model pertanian sirkular yang sangat menguntungkan melalui sistem integrasi tanaman-ternak (Crop-Livestock Integration). Limbah jerami padi dimanfaatkan sebagai pakan ruminansia berkualitas, sementara kotoran sapi diolah kembali menjadi biogas dan pupuk bokashi penyubur sawah, menciptakan ekosistem usaha mandiri yang bebas limbah dan berkelanjutan.',
              defaultSources: '1. Pedoman Sistem Integrasi Tanaman-Ternak (SITT), Direktorat Jenderal Peternakan Kementan RI.\n2. Jurnal Ilmu Peternakan dan Pertanian Sirkular Berkelanjutan, Balitnak.'
            }
          ]
        }
      },
      // Default fallback cards points to pertanian
      cards: [
        {
          key: 'A',
          title: 'Science: Karakteristik Tanah Sawah, Air Irigasi Komering & Fisiologi Padi',
          subtitle: 'Sifat Fisika-Kimia Tanah Sawah Belitang, pH Asam, Kualitas Air Bendung Perjaya & Varietas Unggul',
          guidedPoints: [
            'Karakteristik tanah sawah aluvial di Belitang: dampak kejenuhan pupuk kimia berlebih (urea) yang menurunkan pH ke 4.5-5.5 (asam) serta peranan kapur dolomit dan bahan organik dalam memulihkan kesuburan tanah.',
            'Kualitas air irigasi teknis dari Bendung Perjaya (Sungai Komering): tingkat sedimentasi lumpur penyubur alami dan dampak penutupan pintu air saat jadwal pengeringan berkala saluran sekunder/tersier.',
            'Pengaruh unsur cuaca (suhu harian 28-32 derajat Celcius, kelembapan, curah hujan) terhadap fase vegetatif dan generatif padi pada Musim Tanam 1 (MT 1 / Rendeng) dan Musim Tanam 2 (MT 2 / Gadu).',
            'Karakteristik agronomi varietas unggul lokal (Inpari 32, Ciherang, Mekongga) serta ketahanan biologisnya melawan hama wereng batang coklat (WBC), tikus sawah, dan penyakit hawar daun bakteri (kresek).'
          ],
          placeholder: 'Uraikan hasil telaah sains Anda mengenai sifat fisik-kimia tanah sawah di OKU Timur, kebutuhan kapur dolomit, kualitas air irigasi Komering, serta ketahanan varietas Inpari 32 melawan hama... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel, Karakteristik Tanah Sawah OKU Timur\n2. BBPadi Kementan RI, Deskripsi Varietas Inpari 32',
          defaultExp: 'Kajian sains pertanian di Kabupaten OKU Timur menegaskan bahwa tanah sawah aluvial Belitang yang diolah secara intensif memerlukan pemupukan berimbang dan pemberian kapur dolomit guna menetralkan pH tanah yang cenderung masam akibat residu urea. Pasokan air irigasi dari Bendung Perjaya kaya sedimen lumpur organik yang sangat menunjang pertumbuhan varietas Inpari 32, namun petani harus mewaspadai dinamika kelembapan udara yang memicu perkembangbiakan hama wereng batang coklat.',
          defaultSources: '1. Publikasi BPTP Sumatera Selatan: Pengelolaan Kesuburan Lahan Sawah Irigasi Komering.\n2. Balai Besar Penelitian Tanaman Padi (BBPadi) Kementan RI.'
        },
        {
          key: 'B',
          title: 'Technology: Mekanisasi Alsintan Modern & Peralatan Digital Pemantau Lahan',
          subtitle: 'Traktor Roda 2 vs Roda 4 UPJA, Mesin Tanam Transplanter, Pompa Alkon & Combine Harvester',
          guidedPoints: [
            'Spesifikasi dan efisiensi kerja Traktor Roda 2 (Quick/Kubota) untuk petak sawah bertingkat dibandingkan Traktor Roda 4 (Yanmar/Kubota) UPJA dalam percepatan olah tanah sebelum jadwal air masuk.',
            'Perbandingan teknis antara mesin tanam pindah bibit (Rice Transplanter) dengan tanam manual pola Jajar Legowo (2:1 atau 4:1) menggunakan caplak kayu berjarak presisi.',
            'Peranan mesin pompa air sentrifugal/disel (alkon Dongfeng bahan bakar solar/bensin) dalam menyedot air dari saluran buang atau sungai kecil saat jatah giliran air irigasi sedang kecil.',
            'Adopsi mesin panen raksasa Combine Harvester (memotong, merontok, dan mengarungi gabah sekaligus), alat Grain Moisture Tester digital, serta sprayer mesin gendong (mist blower).'
          ],
          placeholder: 'Tuliskan hasil kajian teknologi Anda mengenai peran traktor roda 4 UPJA, keunggulan Rice Transplanter vs Jajar Legowo manual, efisiensi Combine Harvester, dan pompa alkon di OKU Timur... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Pemanfaatan Alat dan Mesin Pertanian (Alsintan), Ditjen PSP Kementan RI\n2. Petunjuk Teknis Operasional Combine Harvester dan Transplanter',
          defaultExp: 'Penerapan teknologi alsintan modern di sentra persawahan OKU Timur terbukti memangkas waktu olah tanah dan menekan biaya tenaga kerja secara signifikan. Pemanfaatan traktor roda 4 sewaan UPJA mempercepat pembajakan lahan, sementara mesin tanam Rice Transplanter dan panen Combine Harvester mampu menurunkan susut panen (losses) di bawah 2% serta menghasilkan gabah panen yang lebih bersih dan seragam.',
          defaultSources: '1. Pedoman Pengelolaan Alsintan UPJA, Dinas Pertanian OKU Timur.\n2. Petunjuk Teknis Mekanisasi Pertanian Padi Modern, Kementan RI.'
        },
        {
          key: 'C',
          title: 'Engineering: Rekayasa Jaringan Irigasi BK & Sumur Pantek Sawah Mandiri',
          subtitle: 'Tata Kelola Saluran Primer-Sekunder-Tersier P3A, Pintu Air Sorong & Teknologi AWD Hemat Air',
          guidedPoints: [
            'Desain rekayasa pembagian air dari Saluran Sekunder BK (seperti BK 0 sampai BK 12 Belitang) menuju Saluran Tersier dan Saluran Cacing petak sawah menggunakan pintu sorong dan balok sekat bambu/kayu yang dikelola P3A.',
            'Rekayasa sumur bor sawah (sumur pantek) kedalaman 12-24 meter pipa PVC yang disedot mesin pompa alkon sebagai penyelamat tanaman padi saat jadwal penutupan saluran irigasi utama.',
            'Penerapan teknik irigasi berselang (Alternate Wetting and Drying / AWD): pengairan kering-basah bergantian dengan pipa pemantau muka air yang menghemat air hingga 25% tanpa mengurangi hasil panen.',
            'Rekayasa parit keliling dan tanggul pematang sawah yang diperkuat untuk mencegah genangan banjir ekstrem serta memudahkan pembuangan air saat menjelang panen.'
          ],
          placeholder: 'Uraikan hasil analisis rekayasa Anda mengenai tata kelola saluran irigasi BK oleh P3A, rancangan sumur pantek saat kemarau, dan teknik irigasi berselang AWD di sawah Belitang... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Balai Besar Wilayah Sungai Sumatera (BBWSS) VIII, Pedoman Operasi Jaringan Irigasi Komering\n2. Panduan Rekayasa Irigasi Berselang (AWD) Balitbangtan',
          defaultExp: 'Rekayasa tata kelola air di persawahan Belitang mengandalkan jaringan saluran bertingkat yang dikawal pintu air sorong P3A secara bergiliran. Untuk mengantisipasi jadwal pengeringan saluran induk oleh BBWSS VIII, para petani merekayasa sumur bor pantek sedalam 15-20 meter dengan pipa PVC dan pompa disel, serta menerapkan metode irigasi berselang (AWD) guna mempertahankan kelembapan akar secara efisien.',
          defaultSources: '1. Balai Besar Wilayah Sungai Sumatera VIII: Tata Kelola Jaringan Irigasi Komering.\n2. Pedoman Rekayasa Tata Air Sawah Berkelanjutan, Balitbangtan Kementan RI.'
        },
        {
          key: 'D',
          title: 'Mathematics: Kalkulasi Ubinan Panen, Biaya Produksi HPP & Laba Usahatani',
          subtitle: 'Rumus Konversi Ubinan 2.5m x 2.5m ke Ton/Ha, Modal per Hektar, Penerimaan & Kelayakan R/C Ratio',
          guidedPoints: [
            'Rumus perhitungan produktivitas ubinan ukuran 2,5 m x 2,5 m (6,25 m2): bobot gabah ubinan (kg) dikalikan konstanta 1.600 untuk menghasilkan estimasi ton Gabah Kering Panen (GKP) per hektar.',
            'Rincian modal produksi riil 1 hektar sawah di OKU Timur: sewa traktor (Rp1,2 jt), benih Inpari 32 (Rp400 rb), upah tanam (Rp1,3 jt), pupuk subsidi Urea/Phonska + pestisida (Rp3,0 jt), sewa Combine Harvester (Rp1,6 jt), dan air/tenaga kerja (Rp1,0 jt) dengan total modal sekitar Rp8.500.000.',
            'Perhitungan Total Penerimaan (TR): estimasi hasil panen 6.000 kg (6 ton) dikalikan harga jual riil gabah di tingkat tengkulak/penebas Rp6.500 per kg menghasilkan Rp39.000.000.',
            'Perhitungan laba bersih usahatani (TR - TC = Rp30.500.000 per musim tanam 3-4 bulan) serta uji kelayakan rasio penerimaan terhadap biaya (R/C Ratio = Rp39 jt / Rp8,5 jt = 4,58 > 1 / sangat menguntungkan).'
          ],
          placeholder: 'Tuliskan hasil perhitungan matematis Anda mengenai konversi ubinan ke ton/ha, rincian biaya modal Rp8,5 juta per hektar, penerimaan hasil panen, laba bersih, dan nilai R/C ratio... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. BPS Kabupaten OKU Timur, Statistik Pertanian Tanaman Pangan & Survei Ubinan\n2. Buku Analisis Finansial Usahatani Padi Sawah Daerah',
          defaultExp: 'Kalkulasi matematis pada usahatani padi sawah seluas 1 hektar di Belitang menunjukkan produktivitas rata-rata 6,0 hingga 6,7 ton per hektar dari hasil ubinan 3,8-4,2 kg. Dengan struktur modal operasional sekitar Rp8.500.000 dan harga jual gabah kering panen Rp6.500 per kg, petani memperoleh penerimaan kotor Rp39.000.000 dan keuntungan bersih Rp30.500.000 per musim, menghasilkan R/C Ratio 4,58 yang membuktikan efisiensi finansial tinggi.',
          defaultSources: '1. BPS Kabupaten OKU Timur: Hasil Survei Ubinan dan Analisis Biaya Pertanian.\n2. Modul Analisis Usahatani Berkelanjutan, Fakultas Pertanian Universitas Sriwijaya.'
        },
        {
          key: 'E',
          title: 'Sintesis STEM: Solusi Terpadu Menghadapi Kelangkaan Pupuk & Perubahan Iklim',
          subtitle: 'Integrasi Sains Pupuk Organik, Alsintan Presisi, Sumur Pantek & Pembukuan Arus Kas Mandiri',
          guidedPoints: [
            'Keterpaduan pilar Sains (uji tanah cepat dan pembuatan pupuk kompos/bokashi jerami) dalam menanggulangi pembatasan kuota pupuk subsidi kimia.',
            'Keterpaduan Teknologi dan Rekayasa: penjadwalan olah tanah mekanis dengan ketersediaan air saluran BK serta kesiapsiagaan sumur pantek menghadapi musim kemarau ekstrem (El Nino).',
            'Pilar Matematika: pentingnya pencatatan arus kas dan penghitungan HPP agar petani tidak terjebak skema ijon atau pinjaman tengkulak berbunga tinggi.',
            'Rekomendasi aksi nyata bagi generasi muda SMA dalam mengembangkan wirausaha agribisnis modern (smart farming) di desa-desa Kabupaten OKU Timur.'
          ],
          placeholder: 'Uraikan sintesis solusi terpadu STEM yang Anda usulkan untuk membantu petani OKU Timur mengatasi kendala pupuk, kemarau, dan pembukuan finansial modern... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Rencana Strategis Dinas Pertanian Kabupaten OKU Timur\n2. Modul Inovasi Pertanian Cerdas (Smart Farming) Berbasis Kearifan Lokal',
          defaultExp: 'Sintesis terpadu empat pilar STEM memberikan peta jalan solutif bagi kemandirian petani OKU Timur. Pendekatan sains pemupukan organik berbasis jerami mampu menekan biaya beli pupuk kimia, disinergikan dengan rekayasa sumur pantek saat kemarau, adopsi alsintan combine harvester yang efisien, serta disiplin pembukuan matematika finansial yang melindungi petani dari jeratan ijon demi tercapainya kedaulatan pangan lokal.',
          defaultSources: '1. Rencana Strategis Peningkatan Produktivitas Pertanian Dinas Pertanian OKU Timur.\n2. Naskah Kebijakan Smart Farming Berkelanjutan, Balitbangtan RI.'
        }
      ]
    },

    4: {
      dayNum: 4,
      title: 'Modul Riset Day 4: Eksplorasi Peralatan, Perlengkapan Kerja & Mekanisasi Sektor Unggulan Berbasis STEM',
      theme: 'Pilar Exploration & STEM in Action',
      gradientClass: 'from-emerald-950 via-slate-900 to-cyan-950 border-emerald-700/40',
      tagColorClass: 'bg-white/20 text-emerald-100',
      badgeColorClass: 'bg-emerald-400 text-emerald-950',
      subtitle: 'Kajian Komprehensif Peralatan Kerja, Perlengkapan Pelindung, Mesin Mekanisasi & Analisis 4 Dimensi STEM (Science, Technology, Engineering, Mathematics) pada Sektor Pilihan Day 3',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, pada Day 4 ini Anda melanjutkan eksplorasi dari <strong>sektor unggulan yang telah Anda pilih di Day 3</strong>. Fokus utama Anda adalah membedah <strong>peralatan, perlengkapan kerja, dan mesin mekanisasi</strong> yang digunakan pelaku usaha, lalu mengaitkan cara kerja setiap peralatan tersebut secara langsung dengan <strong>4 dimensi STEM: Science (Sains), Technology (Teknologi), Engineering (Rekayasa), dan Mathematics (Matematika)</strong>.',
      sectors: {
        pertanian: {
          key: 'pertanian',
          name: 'Pertanian Padi Sawah & Tanaman Pangan',
          icon: 'agriculture',
          badge: 'Alsintan Sawah & RMU Padi',
          cards: [
            {
              key: 'A',
              title: 'Eksplorasi Peralatan, Perlengkapan Kerja & Alsintan Padi Sawah',
              subtitle: 'Inventarisasi Alat Pengolahan Tanah, Tanam, Perawatan, Panen, Pascapanen & Alat Pelindung Diri (APD)',
              guidedPoints: [
                'Identifikasi peralatan pengolahan lahan dan tanam padi di OKU Timur: perbandingan alat tradisional (cangkul, bajak singkal, caplak kayu) dengan alsintan modern (Traktor Tangan / Hand Tractor, Traktor Roda Empat, dan Rice Transplanter).',
                'Peralatan perawatan tanaman dan pengendalian OPT: Knapsack Sprayer manual vs Elektrik/Baterai, Drone Sprayer pertanian, pompa air irigasi, serta perlengkapan kerja petani (sepatu boot lumpur, masker respirator pestisida, sarung tangan karet, caping/topi pelindung UV).',
                'Mesin panen dan pengolahan pascapanen: sabit bergerigi dan Power Thresher (perontok gabah) vs Combine Harvester (potong-rontok-bersih terpadu), serta mesin penggilingan Rice Milling Unit (RMU) dua fase (Husker & Polisher) dan Bed Dryer.'
              ],
              placeholder: 'Tuliskan inventarisasi lengkap peralatan, perlengkapan kerja (APD), dan mesin alsintan yang digunakan pada sektor Pertanian Padi Sawah dari tahap olah tanah hingga pascapanen... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Teknis Alat dan Mesin Pertanian (Alsintan) Padi, Kementerian Pertanian RI.\n2. Observasi Lapangan UPJA (Usaha Pelayanan Jasa Alsintan) Kabupaten OKU Timur.',
              defaultExp: 'Sektor pertanian padi sawah di Kabupaten OKU Timur mengintegrasikan berbagai peralatan dan perlengkapan kerja mulai dari hulu hingga hilir. Pada tahap pengolahan tanah digunakan Hand Tractor beroda besi (cage wheel) dan traktor roda empat; tahap perawatan memakai electric knapsack sprayer beserta perlengkapan APD (sepatu boot, masker respirator, sarung tangan); sedangkan tahap panen dan pascapanen mengandalkan Combine Harvester beroda crawler serta mesin penggilingan RMU modern.',
              defaultSources: '1. Katalog Alat dan Mesin Pertanian (Alsintan) Tanaman Pangan, Kementerian Pertanian RI.\n2. Data UPJA Dinas Pertanian Kabupaten OKU Timur.'
            },
            {
              key: 'B',
              title: 'Analisis SCIENCE: Prinsip Fisika, Kimia & Biologi pada Peralatan Pertanian',
              subtitle: 'Hukum Tekanan Hidrostatis & Permukaan Roda, Gaya Sentrifugal, Atomisasi Fluida & Biologi Benih/Gabah',
              guidedPoints: [
                'Prinsip Fisika Mekanika Tanah & Tekanan (P = F / A): Mengapa roda rantai (crawler track) pada Combine Harvester dan roda besi bersirip (cage wheel) pada traktor memperluas bidang tekan (A) sehingga tekanan ke lumpur sawah mengecil dan mesin tidak amblas.',
                'Prinsip Fisika Fluida & Gaya Sentrifugal: Bagaimana tekanan pompa pada nozzle sprayer mengubah cairan pupuk/pestisida menjadi butiran kabut halus (atomisasi aerosol) agar menempel merata di stomata daun, serta gaya sentrifugal & hembusan angin blower pada drum thresher yang memisahkan gabah bernas (massa jenis besar) dari gabah hampa.',
                'Prinsip Kimia & Biologi Pascapanen: Proses pembakaran hidrokarbon (solar/bensin) pada mesin penggerak, pengendalian kadar air gabah (14%) pada mesin pengering (dryer) untuk menghentikan respirasi biologis jamur Aspergillus, serta gesekan karet roll husker yang mengupas sekam tanpa memecahkan endosperma beras.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai prinsip Sains (Fisika, Kimia, Biologi) yang bekerja di balik peralatan dan perlengkapan pertanian padi sawah... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Fisika Terapan dan Mekanika Pertanian, IPB Press.\n2. Jurnal Keteknikan Pertanian: Analisis Fisika Perontokan dan Pengeringan Gabah.',
              defaultExp: 'Secara ilmiah (Science), peralatan pertanian bekerja menggunakan hukum fisika, kimia, dan biologi terapan. Roda crawler Combine Harvester menerapkan rumus tekanan P = F/A di mana perluasan penampang sabuk rantai menurunkan tekanan tanah sehingga mesin seberat 2 ton tidak tenggelam di lumpur. Mesin thresher memanfaatkan gaya sentrifugal dan perbedaan massa jenis pada blower angin untuk memisahkan bulir padi bernas dari jerami hampa, sedangkan nozzle sprayer menerapkan prinsip fluida Bernoulli untuk menghasilkan kabut mikroskopis.',
              defaultSources: '1. Buku Mekanika Tanah dan Fisika Alat Pertanian, Fakultas Teknologi Pertanian.\n2. Jurnal Teknik Pertanian: Prinsip Aerodinamika Pemisahan Gabah.'
            },
            {
              key: 'C',
              title: 'Analisis TECHNOLOGY: Sistem Penggerak, Transmisi, Material & Otomasi Alsintan',
              subtitle: 'Motor Diesel 4-Tak, Pompa Hidrolik, Baterai Lithium Sprayer, Sensor Moisture Meter & GPS',
              guidedPoints: [
                'Teknologi motor penggerak: penggunaan mesin diesel 4-tak berpendingin air (radiator/hopper) pada traktor dan Combine Harvester yang menghasilkan torsi besar pada putaran rendah, serta sistem transmisi roda gigi (gearbox), kopling kemudi, dan V-belt.',
                'Teknologi energi elektrik dan penyemprotan presisi: peralihan sprayer pompa tangan manual ke sprayer elektrik berbasis baterai Lithium/Aki kering 12V dengan pompa diafragma otomatis, hingga teknologi Drone Pertanian dengan pemetaan GPS waypoint.',
                'Teknologi instrumen ukur dan material: penggunaan alat Grain Moisture Meter digital (sensor kapasitansi dielektrik) untuk mengukur persentase kadar air gabah secara instan, serta material baja tahan karat (stainless steel) dan karet poliuretan pada komponen RMU.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Teknologi (sistem mesin, transmisi, kelistrikan, sensor digital, dan material) pada peralatan pertanian padi... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Modul Teknologi Motor Penggerak dan Mekanisasi Pertanian, Balai Besar Pengembangan Mekanisasi Pertanian.\n2. Jurnal Otomasi dan Instrumentasi Pertanian Presisi.',
              defaultExp: 'Dari sisi Teknologi, peralatan pertanian modern di OKU Timur menerapkan inovasi motor diesel 4-tak injeksi langsung yang hemat solar namun bertorsi tinggi, dipadukan sistem hidrolik pengangkat meja potong (header) pada Combine Harvester. Pada perawatan tanaman, petani beralih ke teknologi sprayer elektrik bertenaga baterai 12V DC dan pompa diafragma bertekanan konstan, sedangkan di tingkat RMU digunakan sensor digital Grain Moisture Meter untuk menguji kadar air gabah secara presisi.',
              defaultSources: '1. Balai Besar Pengembangan Mekanisasi Pertanian (BBPektan) Kementan RI.\n2. Buku Teknologi Alat dan Mesin Pascapanen Padi.'
            },
            {
              key: 'D',
              title: 'Analisis ENGINEERING: Rancang Bangun Mekanis, Ergonomi & Konstruksi Alat',
              subtitle: 'Desain Sirip Bajak, Mekanisme Cutter Bar, Konstruksi Silinder Perontok & Ergonomi Operator',
              guidedPoints: [
                'Rekayasa rancang bangun pengolahan tanah: desain lengkungan bajak singkal (moldboard plow) dan susunan pisau putar (rotary blade) yang dirancang dengan sudut potong khusus agar mampu membalik tanah liat sawah sekaligus membenamkan jerami.',
                'Rekayasa mekanisme panen terpadu pada Combine Harvester: sinkronisasi gerak reel pengait batang padi, pisau potong bolak-balik (reciprocating cutter bar), ulir pembawa (auger), silinder perontok bergigi (threshing drum), dan saringan getar (vibrating sieve).',
                'Rekayasa ergonomi dan keselamatan kerja: desain tangki sprayer yang mengikuti lekuk punggung manusia, posisi tuas kopling kemudi traktor yang mudah dijangkau tangan, serta prosedur perawatan rekayasa (pelumasan oli gardan, pengaturan ketegangan sabuk V-belt, dan pengasahan mata sabit/pisau).'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Engineering (rancang bangun mekanis, sudut pisau/bajak, ergonomi alat, dan rekayasa perawatan) pada peralatan pertanian... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Rancang Bangun dan Rekayasa Alat Mesin Pertanian, UGM Press.\n2. Pedoman Pemeliharaan dan Rekayasa Teknis Alsintan UPJA.',
              defaultExp: 'Dalam dimensi Engineering (Rekayasa), setiap lekukan dan komponen alat pertanian dirancang secara presisi. Bajak singkal dan pisau rotary dirancang dengan sudut kemiringan spesifik untuk meminimalkan hambatan gesek tanah liat. Pada Combine Harvester, rekayasa mekanis menyatukan lima proses sekaligus (pengaitan, pemotongan cutter bar, pengangkutan auger, perontokan drum, dan pembersihan ayakan getar) dalam satu sasis seimbang dengan pusat gravitasi rendah agar stabil di medan berlumpur.',
              defaultSources: '1. Buku Rekayasa dan Rancang Bangun Mesin Pertanian, UGM Press.\n2. Jurnal Ergonomi dan Keselamatan Kerja Pertanian.'
            },
            {
              key: 'E',
              title: 'Analisis MATHEMATICS: Kalkulasi Kapasitas Kerja, Konsumsi BBM & Efisiensi Biaya',
              subtitle: 'Perhitungan Jam Kerja per Hektar, Rasio BBM Solar/Bensin, Susut Panen (Losses) & Sewa Alat vs Manual',
              guidedPoints: [
                'Perhitungan Kapasitas Kerja Efektif Alat (Ha/jam atau jam/Ha): membandingkan waktu olah tanah 1 hektar menggunakan cangkul manual (30–40 Hari Orang Kerja) vs Hand Tractor (12–16 jam atau 2 hari) vs Traktor Roda Empat (3–4 jam).',
                'Kalkulasi konsumsi energi/BBM dan kapasitas panen: kebutuhan solar traktor (sekitar 15–20 liter/Ha) atau Combine Harvester (25–30 liter/Ha dengan waktu panen hanya 2–3 jam/Ha), serta penurunan angka kehilangan hasil (losses) dari 8–10% (cara gebot manual) menjadi di bawah 2% dengan Combine.',
                'Analisis matematis penghematan biaya operasional petani: perbandingan total biaya sewa alsintan per hektar (misal Rp 1.200.000/Ha olah tanah atau Rp 2.200.000/Ha panen Combine) dibandingkan upah tenaga buruh manual, serta perhitungan titik impas (Break Even Point) bagi pemilik alat.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai perhitungan Matematika (kapasitas kerja per jam/Ha, konsumsi BBM, persentase susut panen, dan perbandingan biaya sewa alat vs manual)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Analisis Ekonomi dan Kapasitas Kerja Alsintan Padi Sawah, Litbang Pertanian.\n2. Wawancara Tarif Sewa UPJA dan Kalkulasi Usaha Tani Kabupaten OKU Timur.',
              defaultExp: 'Secara Matematis, mekanisasi peralatan pertanian memberikan lompatan efisiensi waktu dan biaya yang terukur jelas. Pengolahan lahan 1 hektar dengan traktor tangan membutuhkan sekitar 15 liter solar (Rp 102.000) dan selesai dalam 2 hari kerja dengan biaya sewa Rp 1.200.000/Ha, menghemat lebih dari 40% dibanding upah cangkul manual. Pada saat panen, Combine Harvester memangkas waktu panen 1 hektar menjadi 2,5 jam dan menekan susut tercecer (losses) hingga selisih 6% atau menyelamatkan sekitar 360 kg gabah senilai Rp 2.340.000 per hektar.',
              defaultSources: '1. Jurnal Sosial Ekonomi Pertanian: Analisis Efisiensi Biaya Alsintan Padi.\n2. Standar Tarif Jasa Alsintan UPJA Kabupaten OKU Timur.'
            }
          ]
        },
        perkebunan: {
          key: 'perkebunan',
          name: 'Perkebunan Karet & Kelapa Sawit',
          icon: 'forest',
          badge: 'Alat Sadap Karet & Panen TBS Sawit',
          cards: [
            {
              key: 'A',
              title: 'Eksplorasi Peralatan & Perlengkapan Kerja Perkebunan Karet dan Sawit',
              subtitle: 'Inventarisasi Pisau Sadap, Mangkok Lateks, Dodos, Egrek Galah Teleskopik, Angkong & APD Pekebun',
              guidedPoints: [
                'Peralatan utama perkebunan karet rakyat di OKU Timur: pisau sadap tarik/dorong (jebong), mal ukur kemiringan sadap, talang sadap seng/aliminium, mangkok penampung lateks (cup), cincin kawat penyangga, serta bak pembekuan koagulum.',
                'Peralatan utama panen dan perawatan kelapa sawit: Dodos (pahat bergagang untuk pohon sawit rendah < 5 meter), Egrek (sabit lengkung bergalah panjang untuk pohon tinggi > 5 meter), galah bambu vs galah pipa aluminium/fiber teleskopik, kampak potong tangkai, dan tojok besi pengangkat tandan.',
                'Peralatan angkut kebun dan Alat Pelindung Diri (APD): gerobak dorong satu roda (angkong/lori), keranjang rotan/goni, timbangan gantung/duduk digital TBS, serta APD wajib pekebun (helm proyek pelindung kejatuhan brondolan/pelepah, kacamata safety, sepatu boot anti-duri, sarung tangan kulit, dan lampu kepala/headlamp untuk penyadap subuh).'
              ],
              placeholder: 'Tuliskan inventarisasi lengkap peralatan sadap karet, peralatan panen kelapa sawit, alat angkut kebun, serta perlengkapan APD yang digunakan pekebun di OKU Timur... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Teknis Peralatan Penyadapan Karet dan Panen Kelapa Sawit, Ditjen Perkebunan.\n2. Observasi Lapangan Perkebunan Rakyat Kabupaten OKU Timur.',
              defaultExp: 'Sektor perkebunan karet dan kelapa sawit di OKU Timur menggunakan perangkat kerja spesifik yang menentukan produktivitas panen. Pada kebun karet digunakan pisau sadap jebong berbilah tajam, talang seng, mangkok sadap plastik, dan lampu kepala (headlamp) untuk menyadap dini hari. Pada kebun kelapa sawit digunakan dodos untuk tanaman muda, egrek bergalah pipa aluminium teleskopik untuk tanaman tinggi, tojok besi, gerobak angkong untuk evakuasi TBS, serta APD berupa helm safety, kacamata pelindung mata dari serbuk sari/duri, dan sepatu boot.',
              defaultSources: '1. Pedoman Teknis Budidaya dan Panen Kelapa Sawit & Karet, Ditjen Perkebunan Kementan RI.\n2. Pusat Penelitian Karet Sembawa & PPKS Medan.'
            },
            {
              key: 'B',
              title: 'Analisis SCIENCE: Prinsip Fisika, Kimia & Biologi pada Alat Perkebunan',
              subtitle: 'Anatomi Pembuluh Lateks & Kambium, Kimia Koagulasi Asam Semut, Mekanika Torsi Galah & Pesawat Sederhana',
              guidedPoints: [
                'Prinsip Biologi Anatomi Tanaman pada Pisau Sadap: kulit pohon karet memiliki jaringan pembuluh lateks (laticifer) yang tersusun miring dari kiri bawah ke kanan atas; mata pisau sadap harus mengiris kulit sedalam 1–1,5 mm sebelum menyentuh lapisan kambium agar getah mengalir deras dari tekanan turgor sel tanpa merusak kambium kayu.',
                'Prinsip Kimia Koagulasi pada Wadah Pembeku Lateks: lateks segar merupakan koloid karet bermuatan negatif (pH ±6,9); penambahan koagulan asam format (asam semut HCOOH) atau asam sitrat ramah lingkungan dalam bak pembeku menurunkan pH ke titik isoelektrik (±4,7) sehingga partikel karet menggumpal sempurna tanpa bau busuk.',
                'Prinsip Fisika Mekanika pada Egrek, Tojok & Angkong: galah egrek menerapkan konsep momen gaya/torsi dan kelenturan elastisitas pipa, sedangkan gerobak angkong menerapkan hukum Pesawat Sederhana Tuas Jenis Kedua (roda sebagai titik tumpu, muatan TBS di tengah, dan tangan pendorong sebagai kuasa) yang melipatgandakan keuntungan mekanis.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai prinsip Sains (Biologi anatomi kambium, Kimia pembekuan lateks, dan Fisika pesawat sederhana/torsi) pada peralatan perkebunan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Biologi Fisiologi Lateks dan Kimia Pengolahan Karet, Balai Penelitian Sembawa.\n2. Fisika Mekanika Terapan pada Alat Panen Perkebunan.',
              defaultExp: 'Peralatan perkebunan bekerja selaras dengan prinsip Science (Biologi, Kimia, dan Fisika). Ketajaman dan bentuk siku pisau sadap dirancang mengikuti biologi anatomi pohon karet agar memotong pembuluh lateks tanpa melukai jaringan meristem kambium. Dalam bak pembeku, proses kimia penurunan pH menggunakan asam format menetralkan muatan ion protein pelindung koloid lateks. Sementara itu, gerobak angkong dan tojok sawit menerapkan fisika pesawat sederhana pengungkit yang memperkecil gaya angkat beban tandan sawit seberat 25–40 kg.',
              defaultSources: '1. Monograf Penyadapan dan Pengolahan Karet Rakyat, Balit Sembawa.\n2. Fisika Dasar: Mekanika Torsi dan Pesawat Sederhana dalam Agrikultur.'
            },
            {
              key: 'C',
              title: 'Analisis TECHNOLOGY: Inovasi Material Baja Karbon, Galah Teleskopik & Alat Modern',
              subtitle: 'Metalurgi Baja Pegas Egrek, Pipa Aluminium Alloy/Carbon Fiber, Mesin Potong Rumput & Timbangan Digital',
              guidedPoints: [
                'Teknologi metalurgi mata pisau sadap, dodos, dan egrek: penggunaan baja karbon tinggi (high carbon spring steel) yang melalui proses penempaan dan penyepuhan panas (heat treatment/quenching) agar bilah memiliki kekerasan tinggi, tidak mudah tumpul saat menebas pelepah sawit keras, namun tidak getas/patah.',
                'Teknologi galah panen modern: inovasi penggantian galah bambu berat dengan pipa Aluminium Alloy High-Grade atau Carbon Fiber bersistem pengunci teleskopik (klem pengunci cepat 2–3 tingkat hingga panjang 12–15 meter) yang jauh lebih ringan, lurus, dan tahan karat.',
                'Teknologi mesin perawatan kebun dan transaksi: penggunaan mesin potong rumput gendong (brush cutter 2-tak/4-tak) untuk pembersihan piringan pohon, sprayer herbisida elektrik, serta timbangan digital elektronik (load cell) pada pengumpulan hasil panen TBS dan bokar.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Teknologi (material baja karbon, galah teleskopik aluminium/fiber, mesin perawatan kebun, dan sensor timbangan) pada perkebunan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Inovasi Peralatan Panen Kelapa Sawit Modern, Pusat Penelitian Kelapa Sawit (PPKS).\n2. Teknologi Material Metalurgi Alat Pertanian dan Perkebunan.',
              defaultExp: 'Aspek Teknologi pada peralatan perkebunan tampak nyata pada inovasi material dan mekanisasi. Mata egrek dan dodos modern dibuat dari baja pegas karbon tinggi (spring steel) melalui perlakuan panas presisi sehingga tajam lebih lama. Galah panen telah berevolusi dari bambu konvensional menuju galah teleskopik berbahan Aluminium Alloy atau serat karbon (Carbon Fiber) yang mereduksi bobot alat hingga 50%, dilengkapi klem pengunci sambungan cepat serta timbangan load cell digital untuk akurasi transaksi TBS.',
              defaultSources: '1. Jurnal Penelitian Kelapa Sawit: Evolusi Teknologi Alat Panen Egrek dan Galah, PPKS.\n2. Buku Teknologi Bahan dan Metalurgi Alat Pertanian.'
            },
            {
              key: 'D',
              title: 'Analisis ENGINEERING: Rancang Bangun Sudut Alat, Ergonomi & Konstruksi Mekanis',
              subtitle: 'Desain Sudut Lengkung Egrek, Geometri Alur Sadap 30–45°, Keseimbangan Angkong & Perawatan Batu Asah',
              guidedPoints: [
                'Rekayasa geometri pisau sadap karet: bentuk ujung pisau sadap berbentuk huruf V/U berparuh pengarah dirancang agar penyadap dapat menjaga ketebalan irisan kulit (1,5–2 mm per sadap) dengan sudut kemiringan alur sadap 30° hingga 45° sehingga aliran getah cepat masuk ke talang tanpa meluber.',
                'Rekayasa lengkung mata egrek dan lebar mata dodos: sudut kelengkungan sabit egrek dirancang khusus agar saat ditarik dari bawah ke atas langsung mengunci pangkal pelepah/tangkai tandan sawit dengan satu hentakan tarik, sedangkan lebar mata dodos (8–14 cm) disesuaikan dengan umur pohon agar tidak melukai batang.',
                'Rekayasa ergonomi dan pemeliharaan alat: penggunaan ban hidup bertekanan angin atau ban mati karet padat pada angkong untuk melewati jalan kebun bergelombang, serta teknik pengasahan pisau sadap dan egrek menggunakan batu asah silikon karbida berair untuk menjaga sudut ketajaman mikro.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Engineering (rekayasa bentuk sudut pisau sadap/egrek, desain ergonomi angkong, dan teknik pemeliharaan alat kebun)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Kajian Ergonomi dan Rekayasa Desain Alat Panen Kelapa Sawit, Jurnal Teknik Industri.\n2. Standar Operasional Penyadapan Karet dan Perawatan Pisau Sadap.',
              defaultExp: 'Dari sudut pandang Engineering (Rekayasa), geometri alat perkebunan dirancang sangat fungsional. Pisau sadap memiliki paruh penuntun (guide) di ujungnya untuk membatasi kedalaman sayatan kulit agar konstan 1,5 mm dan sudut miring 30°–45°. Sabit egrek dirancang dengan sudut lengkung spesifik terhadap poros galah sehingga gaya tarik vertikal pemanen langsung berubah menjadi gaya iris melintang pada tangkai tandan sawit, dipadukan desain angkong beroda tunggal yang lincah bermanuver di jalan setapak kebun.',
              defaultSources: '1. Jurnal Keteknikan Pertanian dan Ergonomi Alat Panen Sawit.\n2. Panduan Teknis Sadap Karet Berkelanjutan, Ditjenbun.'
            },
            {
              key: 'E',
              title: 'Analisis MATHEMATICS: Kalkulasi Kapasitas Panen, Norma Kerja & Efisiensi Biaya Alat',
              subtitle: 'Perhitungan Jumlah Pohon per Jam, Konsumsi Kulit Karet, Kapasitas Angkut Angkong & Umur Ekonomis Alat',
              guidedPoints: [
                'Perhitungan kapasitas kerja penyadapan karet: rata-rata waktu sadap 1 pohon karet menggunakan pisau sadap tajam (30–45 detik/pohon), sehingga dalam 4 jam kerja pagi seorang penyadap mampu menyelesaikan 300–400 pohon, serta perhitungan konsumsi kulit karet per tahun (irisan 1,5 mm x 150 hari sadap = 22,5 cm/tahun) agar kulit pulihan bertahan >15 tahun.',
                'Perhitungan produktivitas panen sawit dengan Egrek Teleskopik & Angkong: perbandingan output pemanen menggunakan galah aluminium ringan (mampu memanen 1,5–2,5 ton TBS/hari atau 80–120 tandan) dibandingkan galah bambu berat, serta kapasitas sekali angkut angkong (3–4 tandan setara 80–100 kg) yang menghemat tenaga pikul.',
                'Kalkulasi biaya investasi dan penyusutan alat: menghitung total modal pembelian perlengkapan kebun (harga egrek + galah Rp 650.000, angkong Rp 550.000, pisau sadap + mangkok Rp 350.000), umur pakai alat (2–5 tahun), dan biaya penyusutan alat per bulan terhadap pendapatan bersih pekebun.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai perhitungan Matematika (kapasitas pohon/jam, ketebalan konsumsi kulit sadap, tonase angkut angkong, dan efisiensi biaya investasi alat kebun)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Analisis Norma Kerja dan Produktivitas Pemanen Kelapa Sawit & Karet, PPKS / Balit Sembawa.\n2. Wawancara Kalkulasi Biaya Peralatan Pekebun Rakyat Kabupaten OKU Timur.',
              defaultExp: 'Melalui analisis Mathematics, efisiensi peralatan perkebunan dapat dihitung secara presisi. Pada kebun karet, ketebalan irisan pisau sadap 1,5 mm dengan frekuensi sadap d/2 (150 hari/tahun) menghabiskan 22,5 cm kulit per tahun, menjamin siklus sadap berkelanjutan. Pada kebun sawit, penggunaan galah egrek aluminium dan gerobak angkong berkapasitas 100 kg meningkatkan produktivitas pemanen dari 1 ton menjadi 2 ton TBS per hari, sehingga investasi pembelian alat senilai Rp 1.200.000 dapat kembali modal (BEP) hanya dalam waktu kurang dari satu bulan panen.',
              defaultSources: '1. Standar Norma Kerja dan Kapasitas Panen Perkebunan, Ditjen Perkebunan.\n2. Analisis Finansial Usaha Perkebunan Rakyat Kabupaten OKU Timur.'
            }
          ]
        },
        perikanan: {
          key: 'perikanan',
          name: 'Budidaya Perikanan Air Tawar (Patin & Lele)',
          icon: 'phishing',
          badge: 'Alat Kualitas Air, Aerator & Kolam Ikan',
          cards: [
            {
              key: 'A',
              title: 'Eksplorasi Peralatan, Perlengkapan & Mesin Budidaya Perikanan Air Tawar',
              subtitle: 'Inventarisasi Pompa Air, Kincir/Blower Aerasi, pH/TDS Meter, Mesin Pelet, Bak Grading & Jaring Panen',
              guidedPoints: [
                'Peralatan konstruksi dan tata air kolam di OKU Timur: pompa air sentrifugal/submersible (celup), jaringan pipa PVC inlet dan pipa monik/sifon outlet pembuangan lumpur dasar, serta terpal HDPE/geomembran pada kolam bundar maupun kolam tanah.',
                'Peralatan pemantauan kualitas air dan pemberian pakan: pH Meter digital, TDS/Thermometer digital, DO (Dissolved Oxygen) kit, timbangan pakan, mesin pencetak pelet mandiri (pelletizer) & penepung bahan baku, atau alat pelontar pakan otomatis (auto-feeder).',
                'Peralatan aerasi, penyortiran, dan panen: kincir air (paddle wheel aerator), blower aerasi (root blower/hi-blow) dengan selang batu aerasi/uniring, bak sortir ukuran ikan (grading basket berlubang milimeter), jaring tarik (seine net), serok halus (scoop net), tabung oksigen, dan sepatu boot/waders kolam.'
              ],
              placeholder: 'Tuliskan inventarisasi lengkap peralatan tata air, alat ukur kualitas air, mesin aerasi/pakan, serta perlengkapan sortir dan panen pada budidaya ikan Patin/Lele... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Petunjuk Teknis Peralatan Budidaya Ikan Air Tawar (Patin & Lele), Kementerian Kelautan dan Perikanan (KKP).\n2. Observasi Lapangan Sentra Perikanan Air Tawar Kabupaten OKU Timur.',
              defaultExp: 'Budidaya perikanan air tawar patin dan lele di OKU Timur ditopang oleh peralatan teknis mulai dari persiapan air hingga panen. Peralatan utama meliputi pompa air sentrifugal dan pipa sifon PVC untuk sirkulasi air, pH meter dan termometer digital untuk pemantauan kualitas air, mesin kincir air (paddle wheel) atau hi-blow aerator untuk suplai oksigen, mesin pencetak pelet mandiri, keranjang grading berlubang untuk sortir ukuran benih, serta jaring tarik (waring) dan tabung oksigen untuk pengemasan panen.',
              defaultSources: '1. Pedoman Teknis Sarana dan Prasarana Budidaya Ikan Air Tawar, KKP RI.\n2. Dinas Perikanan dan Peternakan Kabupaten OKU Timur.'
            },
            {
              key: 'B',
              title: 'Analisis SCIENCE: Prinsip Fisika, Kimia & Biologi pada Peralatan Perikanan',
              subtitle: 'Difusi Oksigen Terlarut (DO), Prinsip Elektrokimia pH, Tekanan Hidrostatis Sifon & Biologi Metabolisme Ikan',
              guidedPoints: [
                'Prinsip Fisika & Kimia Difusi Gas pada Aerator/Kincir Air: percikan air dari daun kincir atau gelembung mikro dari selang uniring memperluas luas permukaan kontak antara air dan udara atmosfer, mempercepat laju difusi gas Oksigen (O2) ke dalam air (menjaga DO > 4 mg/L) sekaligus melepaskan gas beracun Amonia (NH3) dan H2S ke udara.',
                'Prinsip Fisika Tekanan Hidrostatis (P = rho * g * h) dan Bejana Berhubungan pada Pipa Sifon/Outlet Dasar: mengapa pipa pembuangan sistem monik/central drain memanfaatkan tekanan kolom air untuk menyedot endapan kotoran feses ikan dan sisa pakan di dasar kolam secara otomatis tanpa menguras seluruh air.',
                'Prinsip Kimia Elektroda pada pH Meter & Biologi Ikan pada Alat Grading: bagaimana sensor elektroda kaca pH meter mendeteksi konsentrasi ion Hidrogen (H+) di air kolam (ideal pH 6,5–8,0), serta fungsi biologis keranjang grading dalam memisahkan ukuran lele/patin agar tidak terjadi sifat kanibalisme dan kompetisi pakan.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai prinsip Sains (Fisika difusi oksigen & tekanan hidrostatis sifon, Kimia pH air, dan Biologi metabolisme/kanibalisme ikan) pada alat perikanan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Kualitas Air dan Fisika-Kimia Akuakultur, IPB Press.\n2. Jurnal Akuakultur Indonesia: Dinamika Oksigen Terlarut dan Sistem Aerasi Kolam.',
              defaultExp: 'Secara ilmiah (Science), peralatan perikanan bekerja mengendalikan parameter fisika, kimia, dan biologi ekosistem kolam. Kincir air dan diffuser aerator menerapkan hukum difusi gas Fick dengan memecah air menjadi butiran halus agar oksigen atmosfer larut cepat ke dalam air (DO > 5 ppm) dan menguapkan gas amonia beracun. Pipa central drain menerapkan hukum tekanan hidrostatis P = rho.g.h untuk mendorong endapan lumpur dasar keluar secara gravitasi, sedangkan bak sortir (grading) mencegah stres biologis dan sifat kanibalisme pada benih lele.',
              defaultSources: '1. Buku Pengelolaan Kualitas Air dalam Budidaya Perairan, IPB Press.\n2. Jurnal Riset Akuakultur: Efektivitas Aerasi dan Sistem Central Drain.'
            },
            {
              key: 'C',
              title: 'Analisis TECHNOLOGY: Motor Pompa, Sensor Kualitas Air Digital, Pelet Terapung & Auto-Feeder',
              subtitle: 'Pompa Submersible Magnetik, Sensor Elektroda Digital, Ekstruder Pelet & Timer Otomatis',
              guidedPoints: [
                'Teknologi pompa air dan aerasi elektrik: penggunaan motor listrik induksi kedap air pada pompa celup (submersible pump) dan pompa sentrifugal berimpeler tertutup, serta teknologi kompresor membran elektromagnetik (hi-blow) dan selang mikropori (aerotube/uniring) yang menghasilkan gelembung udara ukuran mikron.',
                'Teknologi instrumentasi digital akuakultur: penggunaan pH meter digital dan TDS/EC meter berbasis mikrokontroler yang mengubah sinyal potensial listrik dan konduktivitas ion terlarut menjadi angka digital akurat dalam hitungan detik dibandingkan kertas lakmus manual.',
                'Teknologi mesin pakan (Pelletizer/Extruder) dan Auto-Feeder: teknologi ulir penekan bertekanan dan suhu tinggi pada mesin pencetak pelet yang membuat pati mengalami gelatinisasi sehingga pelet dapat mengapung di air, serta penggunaan timer digital dan motor pelontar sentrifugal pada alat pemberi pakan otomatis.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Teknologi (motor pompa/blower, selang mikropori, sensor pH/TDS digital, mesin ekstruder pelet, dan auto-feeder) pada perikanan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Teknologi dan Instrumentasi Akuakultur Modern, Balai Riset Perikanan Budidaya Air Tawar.\n2. Jurnal Rekayasa dan Teknologi Mesin Pakan Ikan.',
              defaultExp: 'Dari sisi Teknologi, pembudidaya ikan di OKU Timur memanfaatkan inovasi pompa air berefisiensi tinggi, aerator hi-blow dengan selang nanopori (uniring), serta alat ukur digital pH dan TDS meter berbasis sensor mikroelektronik. Dalam penyediaan pakan, teknologi mesin pencetak pelet (extruder/pelletizer) memanfaatkan panas gesekan ulir (screw) untuk mencetak pelet apung bernutrisi seimbang, yang dapat dikombinasikan dengan teknologi auto-feeder berpengatur waktu (timer) digital.',
              defaultSources: '1. Balai Riset Perikanan Budidaya Air Tawar dan Penyuluhan Perikanan (BRPBATPP).\n2. Buku Teknologi Rekayasa Akuakultur dan Mesin Pakan.'
            },
            {
              key: 'D',
              title: 'Analisis ENGINEERING: Rancang Bangun Kolam, Hidrodinamika Kincir, Pipa Sifon & Alat Grading',
              subtitle: 'Desain Kemiringan Dasar Kolam (Central Drain), Sudut Daun Kincir, Konstruksi Bak Sortir & Jaring Halus',
              guidedPoints: [
                'Rekayasa konstruksi kolam dan pemipaan (plumbing engineering): desain dasar kolam berbentuk kerucut miring (kemiringan 2–5%) menuju titik tengah (central drain) yang terhubung dengan pipa tegak luar (standpipe) sehingga ketinggian muka air kolam dapat diatur hanya dengan memiringkan pipa luar.',
                'Rekayasa mekanis daun kincir (paddle wheel) dan mesin pelet: desain sudut kemiringan dan lubang-lubang pada kipas kincir air beserta pelampung HDPE agar menghasilkan arus memutar di kolam yang mengumpulkan kotoran ke titik tengah, serta desain saringan cetakan (die plate) baja berlubang 2 mm, 3 mm, dan 4 mm pada mesin pelet sesuai bukaan mulut ikan.',
                'Rekayasa alat sortir (grading) dan panen ramah ikan: desain keranjang/meja sortir dengan kisi-kisi pipa aluminium/plastik halus berjarak presisi (ukuran 3-5 cm, 5-7 cm, 7-9 cm) serta jaring panen tanpa simpul (knotless net) agar kulit dan lendir ikan patin/lele tidak lecet dan bebas infeksi jamur.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Engineering (rancang bangun central drain, hidrodinamika kincir air, cetakan mesin pelet, dan desain alat sortir/jaring ramah ikan)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Rekayasa Konstruksi Kolam dan Wadah Budidaya Perikanan, KKP.\n2. Jurnal Keteknikan Perikanan: Desain Hidrodinamika Aerator dan Grading Ikan.',
              defaultExp: 'Dimensi Engineering (Rekayasa) pada peralatan perikanan terlihat pada rancang bangun sistem central drain dan pipa standpipe luar yang menerapkan mekanika fluida untuk membuang limbah dasar kolam secara praktis. Kipas kincir air dirancang secara hidrodinamis untuk menciptakan arus melingkar yang menyapu endapan ke pusat pembuangan. Selain itu, alat grading dan jaring panen tanpa simpul (knotless) direkayasa dengan permukaan licin tanpa sudut tajam agar tidak menggores lapisan mukus (lendir pelindung) tubuh ikan.',
              defaultSources: '1. Petunjuk Teknis Konstruksi Kolam Terpal dan Tanah Sistem Central Drain, KKP.\n2. Jurnal Teknik Perikanan dan Kelautan: Rekayasa Wadah Akuakultur.'
            },
            {
              key: 'E',
              title: 'Analisis MATHEMATICS: Kalkulasi Debit Pompa, Konsumsi Listrik, FCR Pakan & Efisiensi Biaya',
              subtitle: 'Perhitungan Volume Air Kolam, Lama Pengisian Pompa, Biaya kWh Aerator & Penghematan Mesin Pelet Mandiri',
              guidedPoints: [
                'Perhitungan geometri volume kolam dan waktu kerja pompa air: menghitung volume air kolam persegi panjang ($V = p \\times l \\times t$) atau kolam bundar ($V = \\pi \\times r^2 \\times t$), lalu membaginya dengan kapasitas debit pompa (liter/menit atau $m^3$/jam) untuk menentukan berapa jam pompa harus dinyalakan saat pergantian air.',
                'Kalkulasi konsumsi energi listrik (kWh) peralatan perikanan: menghitung biaya listrik bulanan pompa dan aerator/blower (Daya Watt $\\times$ Jam nyala per hari $\\times$ 30 hari $\\div$ 1.000 $\\times$ Tarif Rp/kWh) terhadap peningkatan padat tebar dan tingkat kelulushidupan ikan (Survival Rate / SR > 90%).',
                'Analisis matematis efisiensi mesin pakan dan FCR (Feed Conversion Ratio): membandingkan biaya produksi pakan mandiri menggunakan mesin pencetak pelet (Rp 7.500–8.500/kg) vs harga pakan pabrik (Rp 12.000–13.500/kg), serta bagaimana takaran timbangan pakan akurat menjaga rasio FCR di angka 1,0–1,2 sehingga menghemat jutaan rupiah per siklus panen.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai perhitungan Matematika (volume kolam vs debit pompa, kalkulasi kWh listrik aerator, rasio FCR timbangan pakan, dan penghematan mesin pelet)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Analisis Usaha dan Kalkulasi Teknis Budidaya Ikan Patin & Lele, KKP.\n2. Wawancara Perhitungan Biaya Operasional Pembudidaya Ikan Kabupaten OKU Timur.',
              defaultExp: 'Pendekatan Mathematics memungkinkan pembudidaya ikan menghitung efisiensi setiap peralatan secara eksak. Misalnya, untuk mengisi kolam berukuran 10 m x 5 m dengan kedalaman air 1,2 m (volume 60 m3 = 60.000 liter) menggunakan pompa berdebit 500 liter/menit dibutuhkan waktu tepat 120 menit (2 jam). Penggunaan blower aerasi berdaya 100 Watt selama 24 jam hanya menghabiskan 2,4 kWh/hari (sekitar Rp 3.500/hari), namun mampu melipatgandakan padat tebar ikan hingga 2 kali lipat dan menjaga nilai FCR pakan tetap efisien di angka 1,1.',
              defaultSources: '1. Pedoman Analisis Finansial dan Teknis Budidaya Ikan Air Tawar, KKP.\n2. Data Statistik Perikanan Budidaya Kabupaten OKU Timur.'
            }
          ]
        },
        peternakan: {
          key: 'peternakan',
          name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',
          icon: 'pets',
          badge: 'Mesin Chopper, Kandang & Biogas',
          cards: [
            {
              key: 'A',
              title: 'Eksplorasi Peralatan, Perlengkapan & Mesin Peternakan Terpadu (Sapi, Kambing & Unggas)',
              subtitle: 'Inventarisasi Mesin Chopper Rumput, Drum Silase, Nipple Drinker, Pemanas Brooder, Biogas & APD Kandang',
              guidedPoints: [
                'Peralatan pengolahan pakan dan pemeliharaan pada peternakan sapi di OKU Timur: sabit rumput, Mesin Pencacah Hijauan Pakan Ternak (Chopper Machine), tong/drum plastik kedap udara (silo) untuk fermentasi silase, gerobak dorong pakan, sekop pembersih kotoran, pompa semprot desinfektan (power sprayer), dan timbangan ternak / pita ukur lingkar dada (Rondo).',
                'Peralatan dan perlengkapan kandang unggas (ayam petelur/pedaging & itik): tempat pakan gantung/talang (feeder), instalasi air minum otomatis (Nipple Drinker & regulator tekanan air), pemanas anak ayam (Gasolec/Brooder pemanas infra merah), kipas sirkulasi udara (exhaust fan/blower), termohigrometer kandang, serta egg tray (rak telur).',
                'Peralatan pengolahan limbah dan kesehatan ternak: instalasi reaktor Biogas (kubah biodigester, pipa penyalur gas metana, manometer tekanan, kompor biogas), alat suntik vaksinasi otomatis (socorex syringe), gun Inseminasi Buatan (IB) beserta termos nitrogen cair, serta APD peternak (sepatu boot kandang, masker amonia, wearpack, dan sarung tangan lateks).'
              ],
              placeholder: 'Tuliskan inventarisasi lengkap peralatan pengolahan pakan (mesin chopper, drum silase), peralatan kandang unggas/sapi, instalasi biogas, serta perlengkapan APD peternakan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Teknis Sarana dan Peralatan Peternakan Sapi & Unggas, Ditjen PKH Kementan RI.\n2. Observasi Lapangan Peternakan Rakyat Kabupaten OKU Timur.',
              defaultExp: 'Sektor peternakan sapi dan unggas di Kabupaten OKU Timur menggunakan rangkaian peralatan produktif mulai dari penyediaan pakan hingga sanitasi kandang. Pada peternakan sapi digunakan mesin pencacah rumput (chopper), tong plastik kedap udara untuk fermentasi silase, pita ukur bobot badan, serta instalasi reaktor biogas pengolah limbah kotoran. Pada peternakan unggas digunakan sistem minum otomatis nipple drinker, pemanas brooder DOC, termohigrometer, alat suntik vaksin socorex, serta perlengkapan APD biosekuriti kandang.',
              defaultSources: '1. Direktorat Jenderal Peternakan dan Kesehatan Hewan (Ditjen PKH) Kementan RI.\n2. Dinas Perikanan dan Peternakan Kabupaten OKU Timur.'
            },
            {
              key: 'B',
              title: 'Analisis SCIENCE: Prinsip Fisika, Kimia & Biologi pada Peralatan Peternakan',
              subtitle: 'Biologi Fermentasi Anaerob Silase & Biogas, Fisika Katup Nipple Drinker, Termodinamika Brooder & Biosekuriti',
              guidedPoints: [
                'Prinsip Biologi & Kimia pada Mesin Chopper dan Drum Silase: pencacahan rumput gajah/jerami oleh mesin chopper menjadi ukuran 2–3 cm memperluas permukaan serat selulosa sehingga mudah dicerna mikroba rumen sapi; penyimpanan dalam drum silase kedap udara memicu bakteri asam laktat (Lactobacillus) melakukan fermentasi anaerob yang menurunkan pH ke 3,8–4,2 sehingga pakan awet berbulan-bulan.',
                'Prinsip Fisika Mekanika Fluida & Termodinamika di Kandang: katup Nipple Drinker bekerja berdasarkan hukum tekanan hidrostatis dan tegangan permukaan air (air hanya menetes saat pin baja dipatok paruh ayam sehingga litter sekam tetap kering bebas gas amonia NH3); sedangkan pemanas Brooder menerapkan perpindahan kalor radiasi dan konveksi untuk menjaga suhu tubuh DOC (32°–34°C).',
                'Prinsip Biokimia Metanogenesis pada Reaktor Biogas & Kriogenik Termos IB: bakteri metanogenik menguraikan bahan organik kotoran sapi di dalam tabung biodigester anaerob menghasilkan gas Metana ($CH_4$) sebagai bahan bakar bersih; sedangkan termos Inseminasi Buatan menggunakan Nitrogen cair bersuhu ekstrem (-196°C) untuk membekukan dan menjaga daya hidup sel sperma sapi unggul.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai prinsip Sains (Biologi pencernaan rumen & fermentasi anaerob, Kimia biogas/amonia, dan Fisika katup nipple/termodinamika brooder) pada alat peternakan... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Ilmu Nutrisi Ruminansia dan Bioteknologi Fermentasi Pakan, IPB Press.\n2. Fisika Lingkungan Kandang dan Teknologi Biogas Peternakan.',
              defaultExp: 'Setiap peralatan peternakan bekerja di atas prinsip Science yang kuat. Mesin chopper memperkecil ukuran partikel hijauan agar enzim mikroba rumen sapi bekerja optimal, sementara tong silase menciptakan kondisi anaerob bagi bakteri asam laktat untuk mengawetkan pakan secara biologis. Pada kandang unggas, katup nipple drinker menerapkan fisika tekanan fluida satu arah untuk mencegah tumpahan air pemicu gas amonia (NH3), sedangkan biodigester memanfaatkan reaksi biokimia metanogenesis untuk mengubah limbah kotoran menjadi energi gas metana (CH4).',
              defaultSources: '1. Buku Teknologi Pengolahan Pakan dan Limbah Peternakan, Fakultas Peternakan UGM.\n2. Jurnal Ilmu Ternak dan Veteriner: Biosekuriti dan Mikroklimat Kandang.'
            },
            {
              key: 'C',
              title: 'Analisis TECHNOLOGY: Mesin Penggerak Chopper, Otomasi Kandang & Bioteknologi IB',
              subtitle: 'Motor Bensin/Diesel Chopper, Sistem Regulator Nipple, Kipas Exhaust Otomatis & Inseminasi Buatan',
              guidedPoints: [
                'Teknologi mesin pencacah pakan (Chopper) dan pengaduk konsentrat (Mixer): penggunaan mesin penggerak bensin 5,5–7 HP atau motor diesel yang memutar poros utama berkecepatan 1.500–2.800 RPM melalui transmisi puli dan sabuk V-belt untuk mencacah batang rumput gajah, tebon jagung, dan pelepah sawit secara cepat.',
                'Teknologi otomasi mikroklimat kandang unggas: integrasi sensor suhu digital (thermostat), kipas hisap (exhaust fan), dan tirai kandang untuk mengatur sirkulasi udara otomatis, serta sistem perpipaan Nipple Drinker bertekanan rendah yang dilengkapi regulator air dan tabung medikator pencampur vitamin otomatis (Dosatron).',
                'Teknologi reproduksi dan kesehatan veteriner: penggunaan peralatan Inseminasi Buatan (IB) modern (kontainer kriogenik vakum berlapis ganda, straw semen beku, dan insemination gun stainless steel) serta alat suntik vaksinasi berulang otomatis (automatic repeater syringe) yang mengatur dosis mililiter secara presisi.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Teknologi (mesin penggerak chopper, sistem perpipaan nipple otomatis, pengatur suhu kandang, dan teknologi peralatan IB/vaksinasi)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Modul Mekanisasi dan Otomasi Peralatan Peternakan Modern, Kementan RI.\n2. Buku Teknologi Reproduksi Inseminasi Buatan dan Manajemen Kandang.',
              defaultExp: 'Dari dimensi Teknologi, modernisasi peternakan di OKU Timur ditandai oleh penggunaan mesin chopper berpenggerak motor bensin/diesel 6,5 HP yang mampu mencacah ratusan kilogram rumput dalam waktu singkat. Di sektor perunggasan, teknologi instalasi nipple drinker ber-regulator tekanan dan medikator otomatis menjamin suplai air minum higienis ke ribuan ekor ayam sekaligus, sedangkan teknologi kontainer nitrogen cair vakum dan gun Inseminasi Buatan memungkinkan peningkatan mutu genetik ternak sapi lokal menjadi sapi unggul Simental dan Limousin.',
              defaultSources: '1. Balai Besar Inseminasi Buatan (BBIB) & Ditjen PKH Kementan RI.\n2. Jurnal Teknologi Peternakan dan Mekanisasi Pakan.'
            },
            {
              key: 'D',
              title: 'Analisis ENGINEERING: Rancang Bangun Pisau Chopper, Konstruksi Kandang & Biodigester',
              subtitle: 'Desain Rotor Pisau Baja, Kemiringan Lantai Kandang Sapi, Konstruksi Kubah Biogas & Ergonomi Alat',
              guidedPoints: [
                'Rekayasa mekanis Mesin Chopper: susunan pisau putar (moving blades) dari baja karbon tinggi yang dipasang miring terhadap pisau tetap (counter blade) pada piringan flywheel berat (roda gila) untuk menciptakan efek gunting berkecepatan tinggi sekaligus gaya lontar sentrifugal menuju corong keluar.',
                'Rekayasa konstruksi kandang sehat dan instalasi air/pakan: desain kemiringan lantai kandang sapi (kemiringan 2°–5° ke arah selokan belakang) agar urine dan air cucian langsung mengalir ke bak penampungan tanpa menggenangi kuku sapi, serta rekayasa ketinggian gantung pipa nipple drinker yang dapat dinaikkan bertahap sesuai pertambahan tinggi punggung ayam.',
                'Rekayasa konstruksi reaktor Biogas (Fixed Dome / Floating Drum): rancang bangun kubah beton kedap gas di bawah tanah dengan pipa inlet pengaduk (slurry mixer), ruang fermentasi anaerob, pipa penyalur gas ber-water trap (penjebak uap air), dan lubang pengeluaran ampas organik (bio-slurry) yang siap dijadikan pupuk.'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai aspek Engineering (rekayasa susunan pisau/flywheel mesin chopper, desain kemiringan lantai kandang, ketinggian nipple, dan konstruksi kubah biogas)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Rancang Bangun Mesin Pencacah Pakan dan Konstruksi Kandang Ternak.\n2. Pedoman Teknis Rekayasa Instalasi Biogas Skala Rumah Tangga, Kementerian ESDM.',
              defaultExp: 'Dalam tinjauan Engineering (Rekayasa), mesin chopper mengandalkan desain piringan roda gila (flywheel) yang menyimpan momen inersia putaran dan susunan pisau baja bersudut miring (heliks) agar pemotongan batang rumput keras berlangsung mulus tanpa menghentikan mesin. Konstruksi lantai kandang sapi direkayasa dengan kemiringan terukur menuju parit saluran bio-slurry yang terhubung langsung ke kubah reaktor biogas kedap udara, menciptakan sistem rekayasa terpadu tanpa limbah (zero-waste engineering).',
              defaultSources: '1. Jurnal Keteknikan Pertanian: Analisis Rancang Bangun Mesin Chopper Pakan Ternak.\n2. Pedoman Teknis Konstruksi Kandang dan Biogas, Kementan RI.'
            },
            {
              key: 'E',
              title: 'Analisis MATHEMATICS: Kalkulasi Kapasitas Chopper, Ransum Pakan, ADG & Efisiensi Biaya',
              subtitle: 'Perhitungan Kg/Jam Mesin Chopper, Kebutuhan Pakan 10% Bobot Sapi, Konversi Pakan Unggas & Penghematan Biogas',
              guidedPoints: [
                'Perhitungan kapasitas kerja Mesin Chopper vs Sabit Manual: mesin chopper mampu mencacah 500–1.000 kg rumput per jam dengan konsumsi bensin hanya ±1 liter (Rp 10.000), dibandingkan mencacah manual dengan golok/sabit yang membutuhkan waktu 3–4 jam kerja melelahkan untuk 200 kg rumput.',
                'Kalkulasi matematis kebutuhan pakan harian dan pertambahan bobot sapi (ADG - Average Daily Gain): menghitung ransum hijauan segar sebesar 10% dari bobot badan sapi (misal sapi 300 kg butuh 30 kg hijauan/hari; untuk 10 ekor sapi dibutuhkan 300 kg/hari atau 9 ton/bulan), serta estimasi bobot sapi dari rumus Schrool menggunakan pita ukur lingkar dada ($\\text{Bobot} = (\\text{LD} + 22)^2 / 100$) dan perhitungan ADG $(W_t - W_0) / t$.',
                'Analisis efisiensi biaya peralatan kandang dan energi biogas: perbandingan pemakaian Nipple Drinker yang menghemat tenaga kerja angkat air hingga 80% dan menekan angka kematian unggas, serta penghematan ekonomi reaktor biogas dari 3–4 ekor sapi yang menghasilkan $\\pm 2\\text{ m}^3$ gas/hari (setara penghematan 3–4 tabung gas LPG 3 kg per bulan bagi keluarga peternak).'
              ],
              placeholder: 'Tuliskan analisis mendalam mengenai perhitungan Matematika (kapasitas kg/jam mesin chopper, rumus ransum 10% bobot badan, rumus bobot pita ukur/ADG, dan penghematan biaya LPG/tenaga kerja)... (Minimal 300 karakter)',
              sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Analisis Matematis Ransum Pakan, Bobot Badan (Rumus Schrool) dan Usaha Peternakan, Ditjen PKH.\n2. Wawancara Kalkulasi Operasional Peternak Sapi/Unggas Kabupaten OKU Timur.',
              defaultExp: 'Melalui perhitungan Mathematics, manfaat mekanisasi peralatan peternakan dapat dikuantifikasi secara akurat. Seekor sapi berbobot 350 kg membutuhkan pakan hijauan 10% bobot badan (35 kg/hari); untuk kandang berisi 10 ekor sapi diperlukan 350 kg/hari yang dapat dicacah menggunakan mesin chopper hanya dalam waktu 25–30 menit dengan biaya BBM kurang dari Rp 7.000. Selain itu, penggunaan pakan silase terukur meningkatkan pertambahan bobot harian (ADG) sapi mencapai 0,9–1,2 kg/hari, sedangkan instalasi biogas menghemat pengeluaran bahan bakar dapur peternak hingga Rp 100.000 per bulan.',
              defaultSources: '1. Pedoman Perhitungan Ransum dan Evaluasi Produktivitas Peternakan Sapi, Ditjen PKH.\n2. Jurnal Sosial Ekonomi Peternakan: Efisiensi Mesin Chopper dan Biogas.'
            }
          ]
        }
      },
      cards: [
        {
          key: 'A',
          title: 'Eksplorasi Peralatan, Perlengkapan Kerja & Mesin Mekanisasi Sektor Pilihan',
          subtitle: 'Inventarisasi Alat Tradisional vs Mesin Modern, Fungsi Operasional & Alat Pelindung Diri (APD)',
          guidedPoints: [
            'Identifikasi seluruh peralatan utama, perkakas tangan, dan mesin mekanisasi yang digunakan pelaku usaha pada sektor pilihan Anda (Pertanian / Perkebunan / Perikanan / Peternakan) dari tahap awal hingga panen/pascapanen.',
            'Perbandingan peralatan tradisional dengan peralatan/mesin modern yang kini digunakan masyarakat di Kabupaten OKU Timur.',
            'Inventarisasi perlengkapan keselamatan dan Alat Pelindung Diri (APD) seperti sepatu boot, helm/topi pelindung, masker respirator, sarung tangan, dan kacamata kerja.'
          ],
          placeholder: 'Tuliskan inventarisasi lengkap peralatan, perlengkapan kerja (APD), dan mesin mekanisasi yang digunakan pada sektor pilihan Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Pedoman Teknis Alat dan Mesin Sektor Agrikultur, Kementerian Pertanian / KKP RI.\n2. Observasi Lapangan Pelaku Usaha di Kabupaten OKU Timur.',
          defaultExp: 'Eksplorasi peralatan dan perlengkapan kerja pada sektor unggulan di Kabupaten OKU Timur mencakup perpaduan perkakas manual, mesin mekanisasi modern, serta perlengkapan Alat Pelindung Diri (APD) yang menunjang produktivitas dan keselamatan kerja dari hulu hingga hilir.',
          defaultSources: '1. Pedoman Teknis Mekanisasi dan Peralatan Agrikultur, Kementerian Pertanian RI.\n2. Data Observasi Lapangan Kabupaten OKU Timur.'
        },
        {
          key: 'B',
          title: 'Analisis SCIENCE: Prinsip Fisika, Kimia & Biologi pada Peralatan Kerja',
          subtitle: 'Hukum Tekanan, Mekanika Fluida, Gaya Sentrifugal, Reaksi Kimia & Proses Biologis Komoditas',
          guidedPoints: [
            'Prinsip Fisika yang bekerja pada alat (seperti rumus tekanan permukaan P = F/A pada roda traktor/combine, pesawat sederhana tuas pada angkong/tojok, tekanan hidrostatis pipa kolam, atau gaya sentrifugal perontok/pencacah).',
            'Prinsip Kimia yang terkait dengan pengoperasian alat (pembakaran BBM pada motor, kimia koagulasi asam pada bak lateks, pengukuran pH air, atau pembentukan gas metana pada biogas).',
            'Prinsip Biologi yang dijaga oleh alat (menjaga kambium pohon karet saat disadap, mencegah kanibalisme ikan dengan bak grading, fermentasi bakteri asam laktat pada drum silase, atau menjaga viabilitas benih/gabah).'
          ],
          placeholder: 'Tuliskan analisis mendalam mengenai prinsip Sains (Fisika, Kimia, Biologi) yang bekerja di balik peralatan dan perlengkapan pada sektor pilihan Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Fisika dan Biologi Terapan dalam Keteknikan Pertanian.\n2. Jurnal Sains Terapan Agrikultur Indonesia.',
          defaultExp: 'Secara ilmiah (Science), peralatan kerja pada sektor unggulan menerapkan hukum fisika mekanika dan fluida untuk memperingan beban kerja, prinsip kimia dalam pengolahan hasil dan bahan bakar, serta prinsip biologi fisiologis untuk menjaga mutu tanaman, ikan, maupun ternak.',
          defaultSources: '1. Buku Sains Terapan dan Mekanika Alat Pertanian.\n2. Jurnal Penelitian Keteknikan Agrikultur.'
        },
        {
          key: 'C',
          title: 'Analisis TECHNOLOGY: Sistem Penggerak, Transmisi, Material & Sensor Alat',
          subtitle: 'Motor Diesel/Bensin/Listrik, Inovasi Material Baja/Aluminium/HDPE & Instrumentasi Digital',
          guidedPoints: [
            'Teknologi sumber penggerak dan transmisi tenaga pada mesin (motor diesel 4-tak, motor bensin, motor listrik pompa/blower, baterai lithium sprayer, gearbox, puli, dan V-belt).',
            'Teknologi material pembentuk alat (baja karbon tinggi tahan aus pada mata pisau/egrek/chopper, pipa aluminium alloy/carbon fiber teleskopik, atau terpal geomembran HDPE).',
            'Teknologi instrumentasi ukur dan otomasi (sensor Grain Moisture Meter, pH/TDS meter digital, timbangan digital load cell, thermostat, atau katup otomatis nipple drinker).'
          ],
          placeholder: 'Tuliskan analisis mendalam mengenai aspek Teknologi (sistem penggerak, transmisi, material modern, dan sensor digital) pada peralatan sektor pilihan Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Katalog Teknologi Mekanisasi dan Instrumentasi Pertanian Modern.\n2. Jurnal Teknologi dan Rekayasa Mesin Agrikultur.',
          defaultExp: 'Dari aspek Teknologi, peralatan modern mengintegrasikan motor penggerak hemat energi, sistem transmisi mekanis/hidrolik, material logam baja karbon dan polimer tahan karat, serta sensor digital presisi untuk meningkatkan akurasi dan kecepatan kerja.',
          defaultSources: '1. Balai Besar Pengembangan Mekanisasi Pertanian (BBPektan).\n2. Jurnal Teknologi dan Instrumentasi Agrikultur.'
        },
        {
          key: 'D',
          title: 'Analisis ENGINEERING: Rancang Bangun Mekanis, Ergonomi & Pemeliharaan Alat',
          subtitle: 'Geometri Sudut Pisau/Bajak/Kincir, Konstruksi Sasis, Kenyamanan Operator & Perawatan Teknis',
          guidedPoints: [
            'Rekayasa rancang bangun dan geometri komponen utama (sudut kemiringan mata bajak/pisau sadap/egrek/chopper, mekanisme cutter bar, desain hidrodinamika kincir air, atau konstruksi central drain/biodigester).',
            'Rekayasa ergonomi dan keselamatan pengguna (keseimbangan titik berat alat, desain gendongan/pegangan peredam getaran, dan kemudahan manuver di medan lapangan).',
            'Rekayasa pemeliharaan dan troubleshooting teknis (pengasahan berkala, pelumasan oli/gemuk bearing, penyetelan ketegangan sabuk, dan pembersihan pascakerja agar alat berumur panjang).'
          ],
          placeholder: 'Tuliskan analisis mendalam mengenai aspek Engineering (rancang bangun mekanis, sudut pisau/komponen, ergonomi, dan perawatan teknis) pada peralatan sektor pilihan Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Buku Rancang Bangun dan Ergonomi Alat Mesin Pertanian.\n2. Pedoman Pemeliharaan Teknis Peralatan Lapangan.',
          defaultExp: 'Dalam dimensi Engineering (Rekayasa), setiap peralatan dirancang dengan geometri sudut potong, distribusi beban sasis, dan fitur ergonomi yang presisi agar aman dioperasikan, mudah dirawat, dan tahan menghadapi medan kerja lapangan.',
          defaultSources: '1. Buku Rekayasa dan Rancang Bangun Alat Pertanian, UGM Press.\n2. Jurnal Ergonomi dan Keselamatan Kerja.'
        },
        {
          key: 'E',
          title: 'Analisis MATHEMATICS: Kalkulasi Kapasitas Kerja, Konsumsi Energi & Efisiensi Biaya',
          subtitle: 'Perhitungan Output per Jam, Pemakaian BBM/Listrik, Penurunan Losses & Perbandingan Biaya Manual',
          guidedPoints: [
            'Perhitungan kapasitas kerja efektif peralatan (hektar per jam, pohon per jam, meter kubik air per jam, atau kilogram pakan per jam) dibandingkan kecepatan kerja tenaga manual.',
            'Kalkulasi konsumsi bahan bakar (liter solar/bensin) atau daya listrik (kWh) per siklus operasional alat.',
            'Analisis matematis penghematan biaya operasional, penurunan persentase kehilangan hasil (losses), serta perhitungan titik impas (Break Even Point) investasi peralatan.'
          ],
          placeholder: 'Tuliskan analisis mendalam mengenai perhitungan Matematika (kapasitas kerja per jam, konsumsi BBM/listrik, dan perbandingan efisiensi biaya alat vs manual)... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Analisis Ekonomi dan Kapasitas Kerja Mekanisasi Agrikultur.\n2. Wawancara Kalkulasi Biaya Operasional Pelaku Usaha di Kabupaten OKU Timur.',
          defaultExp: 'Melalui analisis Mathematics, penggunaan peralatan mekanis terbukti meningkatkan kapasitas kerja per jam secara berlipat ganda, menghemat biaya tenaga kerja dan konsumsi energi per unit produk, serta menekan kehilangan hasil panen secara signifikan.',
          defaultSources: '1. Jurnal Sosial Ekonomi Pertanian: Analisis Efisiensi Mekanisasi.\n2. Data Kalkulasi Usaha Lapangan Kabupaten OKU Timur.'
        }
      ]
    },

    5: {
      dayNum: 5,
      title: 'Modul Riset Day 5: Video Observasi YouTube (5–10 Menit): Penerapan STEM & Eksplorasi Alat',
      theme: 'Pilar Culture, Exploration & STEM (Video YouTube 7 Sektor)',
      gradientClass: 'from-amber-950 via-slate-900 to-purple-950 border-amber-700/40',
      tagColorClass: 'bg-white/20 text-amber-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Panduan Teknis Perekaman Video HP: Wawancara Ekonomi Pasar/UMKM Lokal, Bukti Pembukuan Transaksi Belanja, Tata Krama Adat Komering, dan Akulturasi Budaya Desa',
      inquiryIntro: 'Hari ini adalah <strong>Hari Produksi Rekaman Video Lapangan Bagian 1</strong>. Anda ditugaskan mengambil rekaman video berkualitas menggunakan kamera HP untuk mendokumentasikan dua pilar utama: <strong>FINANCIAL</strong> (kegiatan ekonomi, wawancara pedagang, transaksi tunai/QRIS) dan <strong>CULTURE</strong> (kearifan lokal, etika sosial, tradisi dan kebersamaan warga OKU Timur). Ikuti panduan adegan di bawah ini!',
      cards: [
        {
          key: 'A',
          title: 'Panduan Rekaman Video Pilar Financial (Ekonomi & Transaksi)',
          subtitle: 'Pengambilan Adegan Wawancara Pedagang/UMKM (30-60 Detik) & Bukti Transaksi Belanja',
          guidedPoints: [
            'Wawancara pedagang warung/toko/pasar Belitang mengenai perputaran modal, margin laba barang, atau penggunaan metode pembayaran non-tunai (QRIS).',
            'Rekaman close-up transaksi pembelian siswa (pembayaran tunai/QRIS) beserta bukti struk/nota belanja harian untuk kebutuhan riset.',
            'Teknik audio jernih: posisikan mikrofon HP dekat dengan narasumber (jarak 50-80 cm) dan hindari kebisingan angin berlebih.'
          ],
          placeholder: 'Tuliskan deskripsi adegan video pilar Financial yang telah Anda rekam: nama pedagang, lokasi warung/pasar, topik permodalan/omzet yang ditanyakan, serta ringkasan percakapan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil rekaman wawancara lapangan dengan pedagang Pasar Belitang.\n2. Bukti nota/struk belanja harian riset siswa.',
          defaultExp: 'Perekaman video pilar Financial difokuskan pada wawancara pedagang sembako di pasar tradisional mengenai fluktuasi harga komoditas pangan pokok, perputaran modal harian, serta adopsi pembayaran digital QRIS perbankan. Siswa juga mendokumentasikan transaksi belanja riil dengan bukti fisik struk pembukuan kas.',
          defaultSources: '1. Log Rekaman Video Lapangan HP (Folder FIN_VIDEO_D5).\n2. Struk dan Nota Pembelian Kebutuhan Riset Harian.'
        },
        {
          key: 'B',
          title: 'Panduan Rekaman Video Pilar Culture (Kearifan Lokal & Adat)',
          subtitle: 'Dokumentasi Tata Krama Tabik Bun, Arsitektur Rumah Komering & Kehidupan Harmonis Desa',
          guidedPoints: [
            'Rekaman interaksi sosial yang santun mencerminkan kearifan lokal Komering (ucapan tabik pun/sapaan hormat saat bertamu).',
            'Dokumentasi visual arsitektur rumah panggung tradisional Komering atau keunikan ornamen rumah warga transmigran (Jawa/Bali/Sunda).',
            'Wawancara singkat tokoh adat/sesepuh warga tentang nilai gotong royong dan sejarah perkembangan desa.'
          ],
          placeholder: 'Tuliskan deskripsi adegan video pilar Culture yang telah Anda rekam: lokasi rumah adat/warga, tokoh yang diwawancarai, nilai kearifan lokal atau tradisi yang diangkat... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil rekaman wawancara tokoh adat/sesepuh warga setempat.\n2. Observasi visual budaya dan rumah tradisional desa.',
          defaultExp: 'Perekaman video pilar Culture mengangkat kehangatan sapaan santun adat Komering dan keharmonisan hidup bersama warga transmigran di Belitang. Kamera merekam detail arsitektur rumah kayu tradisional bertiang tinggi serta penjelasan tetua warga mengenai tradisi rembuk desa dan gotong royong lumbung bersama.',
          defaultSources: '1. Log Rekaman Video Lapangan HP (Folder CULT_VIDEO_D5).\n2. Catatan Wawancara Tokoh Masyarakat & Tetua Adat Desa.'
        },
        {
          key: 'C',
          title: 'Manajemen File Footage HP, Storyboard & Draf Narasi Suara',
          subtitle: 'Pengecekan Kualitas Klip, Resolusi Kamera (1080p/720p) & Draf Naskah Voice-Over',
          guidedPoints: [
            'Pemeriksaan kualitas rekaman video: stabil (tidak goyang berlebih), pencahayaan cukup (pagi/sore hari), dan suara narasumber terdengar jelas.',
            'Penyimpanan klip video secara teratur di folder galeri HP khusus proyek FINCESTEM dengan penamaan file yang mudah dikenali.',
            'Penyusunan kerangka teks suara latar (voice-over) yang menghubungkan analisis pilar Finansial dan pilar Budaya untuk diedit pada Day 7.'
          ],
          placeholder: 'Tuliskan daftar klip video yang berhasil direkam hari ini (nama file, durasi, ringkasan adegan) serta draf kalimat narasi suara latar yang Anda siapkan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Log catatan durasi dan daftar file video di memori HP.\n2. Draf naskah skrip narasi video dokumenter kokurikuler.',
          defaultExp: 'Seluruh footage video Day 5 diarsipkan dalam folder penyimpanan internal dengan resolusi 1080p pada kecepatan 30 fps. Naskah narasi suara latar (voice-over) disusun dengan menekankan sinergi antara kerja keras ekonomi masyarakat pedesaan dan keteguhan memegang nilai moral budaya leluhur.',
          defaultSources: '1. Manajemen Galeri Media Smartphone Peserta Didik.\n2. Draf Naskah Skrip Suara Dokumenter FINCESTEM 2026.'
        }
      ]
    },

    6: {
      dayNum: 6,
      title: 'Modul Riset Day 6: Video Analisis YouTube (5–10 Menit): Finansial, Kendala & Solusi Inovasi',
      theme: 'Pilar Financial, Evaluasi Kendala & Solusi Inovasi FINCESTEM (Video YouTube 7 Sektor)',
      gradientClass: 'from-teal-950 via-slate-900 to-blue-950 border-teal-700/40',
      tagColorClass: 'bg-white/20 text-teal-100',
      badgeColorClass: 'bg-cyan-400 text-cyan-950',
      subtitle: 'Panduan Teknis Perekaman Video HP: Lanskap Persawahan Belitang, Saluran Irigasi Komering, Stempel Koordinat GPS/Elevasi, dan Mekanisasi Alat Mesin Pertanian (Alsintan)',
      inquiryIntro: 'Hari ini adalah <strong>Hari Produksi Rekaman Video Lapangan Bagian 2</strong>. Anda ditugaskan mengambil rekaman video menggunakan HP untuk mendokumentasikan dua pilar berikutnya: <strong>EXPLORATION</strong> (pemandangan bentang alam sawah, pintu air irigasi, pembacaan koordinat GPS) dan <strong>STEM</strong> (sains tanah/air dan operasional mesin alsintan traktor/combine/RMU).',
      cards: [
        {
          key: 'A',
          title: 'Panduan Rekaman Video Pilar Exploration (Bentang Alam & GPS)',
          subtitle: 'Pengambilan Panorama Lanskap Sawah, Saluran Primer/Sekunder & Pembacaan Koordinat GPS',
          guidedPoints: [
            'Perekaman lanskap bentang alam sawah terhampar luas di Belitang dengan teknik pergerakan kamera panning mendatar secara perlahan dan halus.',
            'Dokumentasi pintu air irigasi saluran primer/sekunder disertai rekaman aplikasi kamera GPS timestamp yang memunculkan koordinat lintang, bujur, dan elevasi (mdpl).',
            'Perekaman aliran air yang mengalir secara alami mengandalkan gaya gravitasi bumi menuju petak persawahan.'
          ],
          placeholder: 'Tuliskan deskripsi adegan video pilar Exploration yang Anda rekam: lokasi saluran air/persawahan, koordinat GPS yang tercatat, dan gambaran bentang alam sekitarnya... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil rekaman video geospasial kamera HP dengan stempel GPS.\n2. Pengamatan langsung pada saluran irigasi persawahan Belitang.',
          defaultExp: 'Footage pilar Exploration menampilkan pemandangan luas persawahan hijau Belitang dan derasnya aliran air pada saluran irigasi sekunder. Kamera merekam stempel koordinat satelit GPS secara nyata yang menunjukkan elevasi topografi tanah dan posisi geografis petak sawah yang menjadi objek riset.',
          defaultSources: '1. Log Rekaman Video Kamera GPS (Folder EXP_VIDEO_D6).\n2. Catatan Geospasial Titik Koordinat Pengamatan Lapangan.'
        },
        {
          key: 'B',
          title: 'Panduan Rekaman Video Pilar STEM (Sains & Mesin Alsintan)',
          subtitle: 'Dokumentasi Operasi Mesin Traktor/Combine Harvester/RMU & Analisis Sains Pertanian',
          guidedPoints: [
            'Rekaman mesin alsintan yang sedang bekerja di sawah (traktor roda putar, combine harvester pemotong padi) atau mesin penggilingan padi (RMU).',
            'Penjelasan sains visual: proses pemisahan gabah dan sekam pada mesin, mekanisme pembajakan tanah, atau pengujian tekstur tanah sawah basah.',
            'Pencatatan estimasi efisiensi mekanisasi alsintan (kecepatan pengerjaan lahan per jam dibanding tenaga manual).'
          ],
          placeholder: 'Tuliskan deskripsi adegan video pilar STEM yang Anda rekam: jenis mesin alsintan yang diamati, cara kerja mekanisnya, penjelasan sains yang Anda sampaikan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil rekaman operasional alat mesin pertanian (alsintan) di sawah/RMU.\n2. Penjelasan teknis mekanik/operator mesin pertanian setempat.',
          defaultExp: 'Video pilar STEM mendokumentasikan mesin combine harvester yang sedang memanen padi dengan memadukan fungsi pemotong, perontok bulir gabah, dan pembersih jerami secara simultan. Siswa merekam detail mekanisme bilah pisau dan blower angin serta menjelaskan efisiensi waktu kerja alsintan modern.',
          defaultSources: '1. Log Rekaman Video Alsintan HP (Folder STEM_VIDEO_D6).\n2. Panduan Spesifikasi Mesin Pertanian Modern dari Operator.'
        },
        {
          key: 'C',
          title: 'Kurasi Klip Footage, Manajemen File & Kesiapan Editing Final',
          subtitle: 'Penyortiran Adegan Terbaik Day 5 & Day 6 untuk Digabungkan Menjadi Video Utuh Day 7',
          guidedPoints: [
            'Memilah klip video terbaik dari Day 5 (Finansial & Budaya) dan Day 6 (Eksplorasi & STEM) dengan total durasi bahan mentah 5-8 menit.',
            'Memastikan setiap adegan memiliki durasi minimal 5-10 detik yang stabil agar mudah dipotong dan ditransisikan saat proses editing.',
            'Pengecekan kesiapan aplikasi video editor di HP (CapCut / VN / Canva / KineMaster) untuk proses editing puncak pada Day 7.'
          ],
          placeholder: 'Tuliskan daftar total klip yang siap Anda bawa ke tahap editing Day 7, aplikasi editor yang akan digunakan, dan konsep alur cerita video dokumenter Anda... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Daftar inventarisasi file klip video tersimpan di HP.\n2. Rencana alur cerita (timeline) video dokumenter FINCESTEM.',
          defaultExp: 'Kurasi klip telah menyelesaikan seleksi 12 potongan rekaman terbaik yang mewakili keseimbangan 4 pilar FINCESTEM. Seluruh footage telah dipindahkan ke timeline proyek aplikasi editing video CapCut/VN dan siap diberikan teks intro, transisi halus, serta narasi suara pada Day 7.',
          defaultSources: '1. Master Folder Video Kokurikuler di Memori Eksternal HP.\n2. Rencana Alur Editing Video Portofolio FINCESTEM 2026.'
        }
      ]
    },

    7: {
      dayNum: 7,
      title: 'Modul Riset Day 7: Final Editing, Link Video YouTube & Audit Kas',
      theme: 'Sintesis Komprehensif 4 Pilar FINCESTEM',
      gradientClass: 'from-amber-950 via-slate-900 to-indigo-950 border-amber-700/40',
      tagColorClass: 'bg-white/20 text-amber-100',
      badgeColorClass: 'bg-rose-400 text-rose-950',
      subtitle: 'Panduan Penggabungan Video Dokumenter Riset (CapCut/VN), Tata Cara Unggah YouTube (Publik/Unlisted), Penginputan Link Video di FINCESTEM, serta Rekonsiliasi Tutup Buku Kas Riset Mandiri',
      inquiryIntro: 'Selamat datang di <strong>Hari Puncak Riset Mandiri FINCESTEM 2026!</strong> Hari ini Anda akan menyatukan rekaman video Day 5 dan Day 6 menjadi 1 karya video dokumenter utuh (durasi 3–5 menit), mengunggahnya ke YouTube, menyalin tautan link video ke formulir pengumpulan aplikasi, serta menyusun laporan rekonsiliasi tutup buku kas riset mandiri.',
      cards: [
        {
          key: 'A',
          title: 'Panduan Pascaproduksi & Editing Video di HP (CapCut / VN / Canva)',
          subtitle: 'Penggabungan 4 Pilar, Penambahan Teks Identitas, Narasi Suara Latar & Musik Bebas Copyright',
          guidedPoints: [
            'Langkah penggabungan klip video Day 5 (Finansial & Budaya) dan Day 6 (Eksplorasi & STEM) ke dalam timeline berurutan dengan durasi akhir 3 hingga 5 menit.',
            'Penambahan teks judul pada intro video: Judul Riset, Nama Lengkap Siswa, NISN, Kelas, Nama Fasilitator, dan Logo SMAN 1 Belitang.',
            'Penyisipan rekaman suara penjelasan (voice-over) yang jernih, transisi adegan yang rapi, serta pemilihan musik latar dengan volume proporsional (20-30%).',
            'Ekspor hasil video dengan resolusi standar YouTube 720p atau 1080p Full HD.'
          ],
          placeholder: 'Tuliskan laporan proses editing video Anda: aplikasi yang digunakan, judul video dokumenter yang dipilih, durasi akhir video, dan kendala teknis yang berhasil diatasi... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Hasil ekspor file video final pada memori smartphone.\n2. Lembar kerja storyboard dan skrip narasi video.',
          defaultExp: 'Proses editing video dokumenter diselesaikan menggunakan aplikasi CapCut mobile dengan merangkai adegan 4 pilar secara harmonis. Video diawali opening title kartu identitas siswa dan SMAN 1 Belitang, narasi voice-over penjelasan 4 pilar berurutan, latar audio instrumen bebas copyright, dan diekspor pada resolusi Full HD 1080p.',
          defaultSources: '1. File Master Video Dokumenter FINCESTEM 2026 (MP4 Full HD).\n2. Catatan Riwayat Editing Proyek Video CapCut/VN.'
        },
        {
          key: 'B',
          title: 'Panduan Unggah ke YouTube & Pengisian Link Tautan Resmi',
          subtitle: 'Setelan Privasi YouTube (Publik / Unlisted), Penyalinan URL Video & Penulisan Sinopsis Riset',
          guidedPoints: [
            'Prosedur mengunggah file video ke channel YouTube pribadi/kelompok menggunakan aplikasi YouTube di smartphone.',
            'Pemilihan setelan visibilitas: disarankan opsi Publik atau "Tidak Terdaftar" (Unlisted - hanya yang memiliki tautan yang bisa menonton agar privasi siswa terjaga).',
            'Penyalinan tautan resmi video (contoh: https://youtu.be/... atau https://www.youtube.com/watch?v=...) dan penempelan pada formulir LKPD Day 7 aplikasi FINCESTEM.',
            'Penyusunan sinopsis temuan riset (deskripsi 2-3 paragraf) yang menjelaskan intisari riset 4 pilar di OKU Timur.'
          ],
          placeholder: 'Tuliskan link YouTube video karya Anda, judul video di YouTube, serta sinopsis ringkas temuan riset 4 pilar yang Anda sajikan dalam video... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. URL Link Video YouTube Resmi karya peserta didik.\n2. Deskripsi dan sinopsis tayangan video di YouTube.',
          defaultExp: 'Video dokumenter telah berhasil diunggah ke YouTube dengan status visibilitas Unlisted sehingga dewan fasilitator dapat langsung mengakses dan menilai melalui tautan resmi yang disematkan pada portal FINCESTEM. Sinopsis video menguraikan korelasi antara kekuatan ekonomi daerah, kearifan budaya leluhur, bentang alam irigasi, dan modernisasi teknologi pertanian.',
          defaultSources: '1. Tautan URL Video YouTube Karya Siswa (https://youtu.be/...).\n2. Deskripsi Publikasi Video pada Channel YouTube.'
        },
        {
          key: 'C',
          title: 'Rekonsiliasi Tutup Buku Kas & Audit Keuangan Riset Mandiri',
          subtitle: 'Pencocokan Rencana Anggaran Day 1 vs Realisasi Pengeluaran Nyata & Sisa Saldo Kas',
          guidedPoints: [
            'Pencatatan rekapitulasi seluruh pengeluaran riil selama 7 hari pelaksanaan riset (transportasi lokal, konsumsi, pembelian alat/kuota, dan biaya observasi).',
            'Perhitungan selisih antara Rencana Anggaran Biaya (RAB) yang disusun pada Day 1 dengan realisasi belanja fisik lapangan.',
            'Penetapan sisa saldo kas akhir serta refleksi mandiri mengenai efektivitas pengelolaan uang dan disiplin anggaran dalam kehidupan sehari-hari.'
          ],
          placeholder: 'Tuliskan rekapitulasi tutup buku kas riset Anda: total dana awal, total realisasi pengeluaran 7 hari, sisa saldo kas riil, serta pelajaran penting dalam mengelola keuangan... (Minimal 300 karakter)',
          sourcePlaceholder: 'Contoh rujukan valid (Minimal 20 karakter):\n1. Lembar Rekonsiliasi Kas Mandiri dan Nota Bukti Pengeluaran 7 Hari.\n2. Rencana Anggaran Biaya (RAB) Day 1 di Aplikasi FINCESTEM.',
          defaultExp: 'Rekonsiliasi pembukuan kas riset mandiri menunjukkan seluruh pengeluaran selama 7 hari tercatat tertib dengan bukti kuitansi nota terlampir. Perbandingan antara rencana anggaran Day 1 dengan realisasi riil menunjukkan efisiensi belanja yang terukur dan menghasilkan sisa saldo kas yang dikembalikan sebagai tabungan pribadi siswa.',
          defaultSources: '1. Buku Kas Pembantu Pengeluaran Riset 7 Hari Siswa.\n2. Rekapitulasi Nota/Kuitansi Belanja Fisik Lapangan.'
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

    // Helper Memuat Rangkuman Intisari Otomatis ke Kartu Siswa
  window.loadDefaultNftSynthesis = function(dayNum, cardKey) {
    dayNum = parseInt(dayNum) || 1;
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    let targetCard = null;
    if ((dayNum === 3 || dayNum === 4) && cfg.sectors) {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      const curSec = (dayNum === 4) 
        ? (localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian')
        : (localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian');
      const secObj = cfg.sectors[curSec] || cfg.sectors.pertanian;
      targetCard = (secObj && secObj.cards) ? secObj.cards.find(x => x.key === cardKey) : null;
    } else if (cfg.cards) {
      targetCard = cfg.cards.find(x => x.key === cardKey);
    }
    if (!targetCard) return;

    const txtEl = document.getElementById(`nftD${dayNum}Text${cardKey}`);
    const srcEl = document.getElementById(`nftD${dayNum}Source${cardKey}`);
    if (txtEl) {
      txtEl.value = targetCard.defaultExp || '';
    }
    if (srcEl && (!srcEl.value || srcEl.value.trim().length < 20)) {
      srcEl.value = targetCard.defaultSources || '';
    }
    if (typeof window.onNftCardInputUnified === 'function') {
      window.onNftCardInputUnified(dayNum, cardKey);
    }
    if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
      FincestemCore.ui.toast(`Rangkuman materi resmi untuk Kartu ${cardKey} berhasil dimuat! Anda dapat menyempurnakannya.`, 'success');
    }
  };

  // 3. ENGINE UNIVERSAL RENDER MODUL RISET NON-FIELD TRIP (DAY 1 S.D. DAY 7)
  function renderNonFieldTripDayModule(container, dayNum) {
    dayNum = parseInt(dayNum) || 1;
    if (!container) return;
    if (dayNum === 5 || dayNum === 6) {
      renderDay5Or6VideoModule(container, dayNum);
      return;
    }

    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

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

    // Khusus Day 3 & Day 4: Deteksi Sektor Pilihan Siswa
    let selectedSector = 'pertanian';
    if (dayNum === 3 || dayNum === 4) {
      if (savedOfficial && savedOfficial.selectedSector && cfg.sectors && cfg.sectors[savedOfficial.selectedSector]) {
        selectedSector = savedOfficial.selectedSector;
      } else {
        const localSec = (dayNum === 4)
          ? (localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn))
          : localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
        if (localSec && cfg.sectors && cfg.sectors[localSec]) selectedSector = localSec;
      }
    }

    const activeCards = ((dayNum === 3 || dayNum === 4) && cfg.sectors && cfg.sectors[selectedSector])
      ? cfg.sectors[selectedSector].cards
      : cfg.cards;

    const cardDataMap = {};
    activeCards.forEach(cardCfg => {
      const k = cardCfg.key;
      const rawCard = (savedOfficial && savedOfficial['card' + k]) || (draft && draft['card' + k]) || { text: '', source: '' };
      cardDataMap[k] = isSubmitted ? expandCardIfShort(rawCard, cardCfg.title, cardCfg.defaultExp, cardCfg.defaultSources) : rawCard;
    });

    const savedConclusion = (savedOfficial && (savedOfficial.userConclusion || savedOfficial.conclusion || savedOfficial.summary)) ||
                            (draft && draft.conclusion) || '';

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

        ${(dayNum === 3 || dayNum === 4) ? `
          <!-- CARD PILIHAN SEKTOR KHUSUS DAY ${dayNum} (PERSONALIZED STEM TRACK) -->
          <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-2 border-emerald-500/50 shadow-sm flex flex-col gap-3.5">
            <div class="flex items-center justify-between gap-2 border-b border-emerald-200/80 pb-3 flex-wrap">
              <div class="flex items-center gap-2.5">
                <span class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
                  <span class="material-symbols-outlined text-xl">hub</span>
                </span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-emerald-950 leading-tight">${dayNum === 4 ? 'Sektor Eksplorasi Peralatan &amp; Perlengkapan Kerja (Melanjutkan Pilihan Day 3):' : 'Pilih Sektor Riset Unggulan OKU Timur:'}</h3>
                  <p class="text-xs text-emerald-800/90 font-medium">${dayNum === 4 ? 'Sistem otomatis mendeteksi sektor pilihan Anda di Day 3. Analisis peralatan kerja sektor ini dengan 4 dimensi STEM!' : 'Pilih 1 sektor yang paling relevan dengan lingkungan Anda untuk dianalisis melalui 4 pilar STEM'}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-2xs">
                Sektor Aktif: ${(cfg.sectors && cfg.sectors[selectedSector]) ? cfg.sectors[selectedSector].name : 'Pertanian Padi Sawah'}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              ${[
                { key: 'pertanian', name: 'Pertanian Padi Sawah', badge: dayNum === 4 ? 'Alsintan Sawah & RMU' : 'Lumbung Pangan Komering', icon: 'agriculture', desc: dayNum === 4 ? 'Traktor, Sprayer, Combine Harvester, RMU & APD Sawah dalam Analisis STEM' : 'Padi Sawah, Saluran Irigasi BK, Traktor/Combine & Ubinan HPP' },
                { key: 'perkebunan', name: 'Perkebunan Rakyat', badge: dayNum === 4 ? 'Alat Sadap & Panen TBS' : 'Karet & Kelapa Sawit', icon: 'forest', desc: dayNum === 4 ? 'Pisau Sadap, Mangkok Lateks, Dodos, Egrek Teleskopik & Angkong dalam Analisis STEM' : 'Lateks Karet, Panen TBS Sawit, Rorak Lahan & Laba Pekebun' },
                { key: 'perikanan', name: 'Perikanan Air Tawar', badge: dayNum === 4 ? 'Aerator & Alat Kualitas Air' : 'Sentra Patin & Lele Sumsel', icon: 'phishing', desc: dayNum === 4 ? 'Pompa Air, Kincir Aerasi, pH/TDS Meter, Mesin Pelet & Grading dalam Analisis STEM' : 'Budidaya Patin/Lele, Kualitas Air, Kincir Aerasi & FCR Pakan' },
                { key: 'peternakan', name: 'Peternakan Pedesaan', badge: dayNum === 4 ? 'Mesin Chopper & Biogas' : 'Peternakan Sapi & Unggas', icon: 'pets', desc: dayNum === 4 ? 'Mesin Chopper Pakan, Drum Silase, Nipple Drinker, Brooder & Biogas dalam Analisis STEM' : 'Peternakan Sapi, Unggas, Silase Pakan, Chopper, Biogas & ADG' }
              ].map(sec => {
                const isActive = (selectedSector === sec.key);
                const clickHandler = dayNum === 4 ? `selectDay4Sector('${sec.key}')` : `selectDay3Sector('${sec.key}')`;
                return `
                  <div onclick="${clickHandler}" class="p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${isActive ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/30 shadow-md' : 'bg-white/80 border-slate-200 hover:border-teal-400 hover:bg-white shadow-2xs'}">
                    <div class="flex items-start justify-between gap-2">
                      <div class="w-10 h-10 rounded-xl ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0 shadow-2xs">
                        <span class="material-symbols-outlined text-2xl">${sec.icon}</span>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-slate-100 text-slate-600'}">${sec.badge}</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <h4 class="font-black text-xs sm:text-sm text-slate-900 leading-tight">${sec.name}</h4>
                      <p class="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">${sec.desc}</p>
                    </div>
                    <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold ${isActive ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}">
                      <span>${isActive ? '✓ Sektor Terpilih' : 'Klik untuk Memilih'}</span>
                      <span class="material-symbols-outlined text-sm">${isActive ? 'check_circle' : 'touch_app'}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- PROGRESS BAR INDIKATOR HARI INI -->
        <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-700 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-600">checklist</span>
              <span>Progres Kelengkapan Kartu Riset &amp; Kesimpulan Day ${dayNum}:</span>
            </span>
            <span id="lblNftD${dayNum}ProgressCount" class="font-black text-teal-800">0 / 6 Terpenuhi</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div id="barNftD${dayNum}Progress" class="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- FORMULIR KARTU RISET (A, B, C, D, E) -->
        <form id="formNftDay${dayNum}Cards" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          ${activeCards.map(c => {
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

                <!-- Pokok Silabus Resmi (Jika Didefinisikan) -->
                ${c.syllabusItems && c.syllabusItems.length > 0 ? `
                  <div class="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-xs text-teal-950 flex flex-col gap-1.5 shadow-2xs">
                    <span class="font-black text-teal-900 text-xs flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-teal-700">menu_book</span>
                      <span>Pokok Bahasan Silabus Resmi:</span>
                    </span>
                    <div class="space-y-1.5 text-xs text-slate-800 font-semibold leading-relaxed">
                      ${c.syllabusItems.map(item => `<div class="whitespace-pre-line pl-1">${item}</div>`).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Panduan Poin Riset dengan Penomoran Numbering Rapi Rata Kanan-Kiri -->
                <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">fact_check</span>
                    <span>Poin Wajib yang Harus Anda Pahami &amp; Analisis:</span>
                  </span>
                  <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium text-justify">
                    ${c.guidedPoints.map(p => `<li class="pl-1 text-justify leading-relaxed whitespace-pre-line">${p}</li>`).join('')}
                  </ol>
                </div>

                <!-- Bahan Bacaan & Rangkuman Materi Pembelajaran Lengkap (Jika Tersedia) -->
                ${c.studyMaterial ? `
                  <div class="rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/40 via-white to-slate-50/70 shadow-2xs overflow-hidden">
                    <div class="p-3.5 bg-gradient-to-r from-teal-800/10 via-teal-700/5 to-transparent border-b border-teal-200/80 flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-teal-700 text-base">local_library</span>
                        <h4 class="font-black text-xs sm:text-sm text-teal-950">Bahan Bacaan &amp; Kajian Materi Pembelajaran Lengkap:</h4>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-700 text-white shrink-0">Bahan Ajar Resmi</span>
                    </div>
                    <div class="p-4 text-xs leading-relaxed text-slate-800 space-y-3 font-medium text-justify">
                      ${c.studyMaterial}
                    </div>
                  </div>
                ` : ''}

                <!-- Kolom Esai Analisis Siswa (Rata Kanan-Kiri) -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between gap-2">
                    <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
                    ${!isSubmitted ? `
                      <button type="button" onclick="loadDefaultNftSynthesis(${dayNum}, '${k}')" class="px-2.5 py-1 rounded-xl text-[10.5px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                        <span class="material-symbols-outlined text-xs">auto_fix_high</span>
                        <span>Gunakan Rangkuman Intisari</span>
                      </button>
                    ` : ''}
                  </div>
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

          <!-- CARD KESIMPULAN AKHIR MODUL (WAJIB MINIMAL 100 KARAKTER SEBELUM LANJUT KE LKPD) -->
          <div id="cardBoxD${dayNum}_Conclusion" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                  <span class="material-symbols-outlined text-lg">psychology</span>
                </span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kesimpulan Akhir &amp; Sintesis Modul Day ${dayNum}</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Uraikan intisari pemahaman dan kesimpulan menyeluruh hasil riset mandiri Anda</span>
                </div>
              </div>
              <span id="badgeCardStatusD${dayNum}_Conclusion" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex flex-col gap-1.5 shadow-2xs">
              <span class="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-amber-700">info</span>
                <span>Panduan Pengisian Kesimpulan Modul:</span>
              </span>
              <p class="text-xs text-amber-950/90 leading-relaxed font-medium text-justify">
                Tuliskan rangkuman kesimpulan Anda sendiri: apa poin penting yang Anda pelajari dari kelima kartu STEM di atas, bagaimana keterkaitan sains, teknologi, rekayasa, dan matematika saling mendukung, serta bagaimana hasil riset ini dapat diterapkan untuk kemajuan sektor unggulan OKU Timur.
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Kesimpulan Menyeluruh Anda (Minimal 100 karakter):</label>
              <textarea id="nftD${dayNum}Conclusion" rows="4" ${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(${dayNum}, 'Conclusion')" placeholder="Tuliskan kesimpulan akhir Anda mengenai pembelajaran Modul Day ${dayNum}... (Minimal 100 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify ${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${savedConclusion}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD${dayNum}_Conclusion" class="text-rose-600 font-semibold">Minimal 100 karakter</span>
                <span id="counterD${dayNum}_Conclusion" class="text-slate-400 font-bold">0 / 100</span>
              </div>
            </div>
          </div>

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

    if (key === 'Conclusion') {
      const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
      const boxEl = document.getElementById(`cardBoxD${dayNum}_Conclusion`);
      const badgeEl = document.getElementById(`badgeCardStatusD${dayNum}_Conclusion`);
      const countEl = document.getElementById(`counterD${dayNum}_Conclusion`);
      const msgValEl = document.getElementById(`msgValidationD${dayNum}_Conclusion`);
      if (!concEl) return true;

      const val = concEl.value.trim();
      const len = val.length;
      if (countEl) countEl.textContent = `${len} / 100`;

      if (isSubmitted || len >= 100) {
        if (boxEl) {
          boxEl.classList.remove('border-slate-200', 'border-rose-400');
          boxEl.classList.add('border-emerald-500', 'bg-emerald-50/20');
        }
        if (badgeEl) {
          badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-800 shrink-0';
          badgeEl.textContent = '✓ Lengkap';
        }
        if (msgValEl) {
          msgValEl.className = 'text-emerald-700 font-bold';
          msgValEl.textContent = `✓ ${len} karakter (Memenuhi syarat minimal 100 karakter).`;
        }
        if (autoSave) saveNftDraftThrottledUnified(dayNum);
        return true;
      } else {
        if (boxEl) {
          boxEl.classList.remove('border-emerald-500', 'bg-emerald-50/20');
          boxEl.classList.add('border-slate-200');
        }
        if (badgeEl) {
          badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
          badgeEl.textContent = 'Belum Lengkap';
        }
        if (msgValEl) {
          msgValEl.className = 'text-rose-600 font-semibold';
          msgValEl.textContent = len === 0 ? 'Wajib diisi minimal 100 karakter.' : `Kurang ${100 - len} karakter lagi (Minimal 100 karakter).`;
        }
        if (autoSave) saveNftDraftThrottledUnified(dayNum);
        return false;
      }
    }

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

    const hasConc = !!document.getElementById(`nftD${dayNum}Conclusion`);
    let isConclusionDone = true;
    if (hasConc) {
      isConclusionDone = evaluateCardForDay(dayNum, 'Conclusion', false);
    }
    const totalItems = hasConc ? (keys.length + 1) : keys.length;
    let totalCompleted = completedCount + (hasConc && isConclusionDone ? 1 : 0);

    if (isSubmitted) {
      completedCount = 5;
      totalCompleted = totalItems;
    }

    const pct = Math.round((totalCompleted / totalItems) * 100);

    const barEl = document.getElementById(`barNftD${dayNum}Progress`);
    const lblProg = document.getElementById(`lblNftD${dayNum}ProgressCount`);
    const lblSummary = document.getElementById(`lblSummaryProgressD${dayNum}`);
    const btnSubmit = document.getElementById(`btnSubmitNftMateriD${dayNum}`);

    if (barEl) barEl.style.width = pct + '%';
    if (lblProg) {
      lblProg.textContent = hasConc
        ? `${totalCompleted} / ${totalItems} Komponen Terpenuhi (${pct}%)`
        : `${completedCount} / 5 Kartu Terpenuhi (${pct}%)`;
    }
    if (lblSummary) {
      lblSummary.textContent = hasConc
        ? `${totalCompleted} dari ${totalItems} Komponen (5 Kartu + Kesimpulan) Terpenuhi (${pct}%)`
        : `${completedCount} dari 5 Kartu Riset Memenuhi Syarat (${pct}%)`;
    }

    if (btnSubmit) {
      if (isSubmitted) {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-default';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">verified</span>
          <span>✓ Riset Day ${dayNum} Telah Terkirim Resmi ke Fasilitator</span>
        `;
      } else if (completedCount === keys.length && (!hasConc || isConclusionDone)) {
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

      const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
      draftObj.conclusion = concEl ? concEl.value : '';
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

    const concEl = document.getElementById(`nftD${dayNum}Conclusion`);
    const concVal = concEl ? concEl.value.trim() : '';
    if (concEl && concVal.length < 100) {
      invalidKeys.push('Kesimpulan Modul (Min 100 Karakter)');
    }

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

    let curSec = 'pertanian';
    if (dayNum === 3) {
      curSec = localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    } else if (dayNum === 4) {
      curSec = localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian';
    }

    const officialPayload = {
      day: dayNum,
      selectedSector: curSec,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      userConclusion: concVal
    };

    const activeCardsForSubmit = ((dayNum === 3 || dayNum === 4) && cfg.sectors && cfg.sectors[curSec])
      ? cfg.sectors[curSec].cards
      : cfg.cards;

    activeCardsForSubmit.forEach(c => {
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
      // 6B. MODUL ORIENTASI & SIMULASI KHUSUS DAY 0 (GLADI BERSIH ALUR FINCESTEM)
  // =========================================================================
  function renderDay0NonFieldTripModule(container) {
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Kokurikuler';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    let savedOfficial = null;
    try {
      const raw = localStorage.getItem('fincestem_materi_nft_day0_' + cleanNisn) ||
                  localStorage.getItem('fincestem_materi_day0_' + cleanNisn);
      if (raw) savedOfficial = JSON.parse(raw);
    } catch(e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.summary || savedOfficial.conclusion));
    const cardAData = (savedOfficial && savedOfficial.cardA) || { answer: '', sources: [''] };
    const cardBData = (savedOfficial && savedOfficial.cardB) || { answer: '', sources: [''] };
    const savedResume = (savedOfficial && (savedOfficial.summary || savedOfficial.conclusion || savedOfficial.text)) || '';

    const sourcesA = (Array.isArray(cardAData.sources) && cardAData.sources.length > 0) ? cardAData.sources : [''];
    const sourcesB = (Array.isArray(cardBData.sources) && cardBData.sources.length > 0) ? cardBData.sources : [''];

    container.innerHTML = `
      <div class="flex flex-col gap-4 max-w-3xl mx-auto w-full pb-16">
        <!-- BANNER HEADER DAY 0 -->
        <div class="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white shadow-xl border border-amber-500/50 flex flex-col gap-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-300 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">model_training</span>
              <span>Day 0 • Gladi Bersih</span>
            </span>
            <span class="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/15 text-amber-100 border border-white/20">
              Simulasi Alur &amp; Orientasi
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              Simulasi Alur &amp; Orientasi FINCESTEM 2026/2027
            </h1>
            <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium mt-1">
              Pahami 6 alur pengerjaan harian, jawab pertanyaan tema &amp; 4 pilar, serta tuliskan resume simulasi.
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="p-3 rounded-2xl bg-black/25 border border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-inner">
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

        <!-- 1. ALUR PENGERJAAN HARIAN WEB KOKURIKULER (RINGKAS) -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">route</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">1. Alur Pengerjaan Harian Web Kokurikuler</h3>
              <p class="text-[11px] text-slate-500">Urutan berjenjang yang wajib diselesaikan setiap hari kegiatan:</p>
            </div>
          </div>

          <!-- Step Indicators Ringkas & Rapi -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">1</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Modul Belajar</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">2</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">LKPD Observasi</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">3</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Asesmen CBT</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">4</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Dokumentasi GPS</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-[11px] flex items-center justify-center shadow-xs">5</span>
              <span class="text-slate-800 text-xs font-bold leading-tight">Jurnal Refleksi</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col items-center gap-1 shadow-2xs">
              <span class="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center shadow-xs">6</span>
              <span class="text-amber-950 text-xs font-extrabold leading-tight">Penilaian Fasil</span>
            </div>
          </div>
        </div>

        <!-- 2. PERTANYAAN TEMA & DIMENSI (LANGSUNG PERTANYAAN, TANPA TEKS MATERI, TANPA TULISAN CARD) -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">quiz</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">2. Pertanyaan Tema &amp; Dimensi Profil Lulusan</h3>
              <p class="text-[11px] text-slate-500">Jawab pertanyaan berikut secara mandiri berdasarkan pemahaman Anda:</p>
            </div>
          </div>

          <!-- PERTANYAAN 1: TEMA KEGIATAN KOKURIKULER -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                1. Apa Tema Kegiatan kokurikuler tahun ajaran 2026-2027?
              </h4>
              <span class="text-[11px] text-slate-500 font-semibold">Wajib • Min. 20 Karakter</span>
            </div>

            <textarea id="nftD0CardAAnswer" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${cardAData.answer || ''}</textarea>
            <span id="nftD0CardACounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>

            <!-- SUMBER REFERENSI PERTANYAAN 1 (BISA LEBIH DARI 1) -->
            <div class="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-teal-700">bookmark</span>
                  <span>Sumber Referensi (Bisa memasukkan lebih dari 1 sumber):</span>
                </label>
                ${!isSubmitted ? `
                  <button type="button" onclick="addDay0SourceField('A')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center gap-1 border border-teal-200 cursor-pointer transition-all">
                    <span class="material-symbols-outlined text-xs">add</span>
                    <span>+ Tambah Sumber</span>
                  </button>
                ` : ''}
              </div>

              <div id="nftD0CardASourcesContainer" class="flex flex-col gap-2">
                ${sourcesA.map((s, idx) => `
                  <div class="flex items-center gap-2 source-item-a">
                    <input type="text" value="${escapeHtml(s)}" ${isSubmitted ? 'readonly' : ''} placeholder="" class="input-source-a flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
                    ${(!isSubmitted && sourcesA.length > 1) ? `
                      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
                        &times;
                      </button>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- PERTANYAAN 2: 4 DIMENSI PROFIL LULUSAN -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                2. Sebutkan 4 Dimensi Profil Lulusan Kegiatan kokurikuler tahun ajaran 2026-2027!
              </h4>
              <span class="text-[11px] text-slate-500 font-semibold">Wajib • Min. 20 Karakter</span>
            </div>

            <textarea id="nftD0CardBAnswer" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${cardBData.answer || ''}</textarea>
            <span id="nftD0CardBCounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>

            <!-- SUMBER REFERENSI PERTANYAAN 2 (BISA LEBIH DARI 1) -->
            <div class="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-teal-700">bookmark</span>
                  <span>Sumber Referensi (Bisa memasukkan lebih dari 1 sumber):</span>
                </label>
                ${!isSubmitted ? `
                  <button type="button" onclick="addDay0SourceField('B')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center gap-1 border border-teal-200 cursor-pointer transition-all">
                    <span class="material-symbols-outlined text-xs">add</span>
                    <span>+ Tambah Sumber</span>
                  </button>
                ` : ''}
              </div>

              <div id="nftD0CardBSourcesContainer" class="flex flex-col gap-2">
                ${sourcesB.map((s, idx) => `
                  <div class="flex items-center gap-2 source-item-b">
                    <input type="text" value="${escapeHtml(s)}" ${isSubmitted ? 'readonly' : ''} placeholder="" class="input-source-b flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
                    ${(!isSubmitted && sourcesB.length > 1) ? `
                      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
                        &times;
                      </button>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 3. RESUME SIMULASI DAY 0 -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              <span class="material-symbols-outlined text-base">edit_note</span>
            </span>
            <div>
              <h3 class="font-black text-xs sm:text-sm text-slate-900">3. Resume Simulasi Modul Day 0</h3>
              <p class="text-[11px] text-slate-500">Tuliskan rangkuman dan kesiapan sebelum lanjut ke LKPD:</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <textarea id="nftD0MateriSummary" rows="3" ${isSubmitted ? 'readonly' : ''} class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all ${isSubmitted ? 'bg-slate-100 text-slate-600' : 'bg-white'}" placeholder="">${savedResume}</textarea>
            <span id="nftD0MateriCounter" class="text-[11px] text-slate-500 font-medium">Minimal 20 karakter.</span>
          </div>

          <!-- TOMBOL LANJUT KE LKPD 0 (TAMPILAN RAPI & TIDAK BERTUMPUK) -->
          ${isSubmitted ? `
            <div class="mt-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
              <div class="flex items-center gap-2.5 text-emerald-950 font-bold text-xs sm:text-sm">
                <span class="material-symbols-outlined text-emerald-600 text-2xl shrink-0">check_circle</span>
                <span>Modul Simulasi Day 0 Selesai!</span>
              </div>
              <a href="lkpd.html?day=0" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0">
                <span>Lanjut ke LKPD Day 0</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          ` : `
            <div class="mt-3 flex flex-col gap-2">
              <button type="button" onclick="submitDay0NonFieldTripMateri()" id="btnSubmitD0Materi" class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
                <span>Simpan &amp; Lanjut ke LKPD Day 0</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    // Pasang listener real-time counter karakter jika belum submit
    if (!isSubmitted) {
      const attachCounter = (txtId, counterId, minLen) => {
        const txt = document.getElementById(txtId);
        const counter = document.getElementById(counterId);
        if (txt && counter) {
          txt.addEventListener('input', () => {
            const len = txt.value.trim().length;
            if (len < minLen) {
              counter.textContent = `Kurang ${minLen - len} karakter lagi (Minimal ${minLen} karakter).`;
              counter.className = 'text-[11px] text-rose-600 font-semibold';
            } else {
              counter.textContent = `✓ ${len} karakter (Memenuhi syarat).`;
              counter.className = 'text-[11px] text-emerald-600 font-bold';
            }
          });
        }
      };

      attachCounter('nftD0CardAAnswer', 'nftD0CardACounter', 20);
      attachCounter('nftD0CardBAnswer', 'nftD0CardBCounter', 20);
      attachCounter('nftD0MateriSummary', 'nftD0MateriCounter', 20);
    }
  }

  // Helper Dinamis Tambah/Hapus Sumber Referensi
  window.addDay0SourceField = function(cardType) {
    const containerId = cardType === 'A' ? 'nftD0CardASourcesContainer' : 'nftD0CardBSourcesContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    const row = document.createElement('div');
    row.className = `flex items-center gap-2 source-item-${cardType.toLowerCase()}`;
    row.innerHTML = `
      <input type="text" placeholder="" class="input-source-${cardType.toLowerCase()} flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white">
      <button type="button" onclick="removeDay0SourceField(this)" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-200 cursor-pointer shrink-0" title="Hapus sumber ini">
        &times;
      </button>
    `;
    container.appendChild(row);
  };

  window.removeDay0SourceField = function(btn) {
    if (!btn) return;
    const row = btn.closest('.source-item-a, .source-item-b');
    if (row) row.remove();
  };

  window.submitDay0NonFieldTripMateri = function() {
    const cardAAns = ((document.getElementById('nftD0CardAAnswer') ? document.getElementById('nftD0CardAAnswer').value : '') || '').trim();
    const cardBAns = ((document.getElementById('nftD0CardBAnswer') ? document.getElementById('nftD0CardBAnswer').value : '') || '').trim();
    const resumeAns = ((document.getElementById('nftD0MateriSummary') ? document.getElementById('nftD0MateriSummary').value : '') || '').trim();

    // Validasi Pertanyaan 1 (min 20 karakter)
    if (cardAAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 1: Jawaban tema kokurikuler minimal 20 karakter!', 'warning');
      } else {
        alert('Pertanyaan 1: Jawaban tema kokurikuler minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0CardAAnswer'); if (_el1) _el1.focus();;
      return;
    }

    // Validasi Sumber Pertanyaan 1
    const sourcesA = [];
    document.querySelectorAll('.input-source-a').forEach(inp => {
      const v = (inp.value || '').trim();
      if (v) sourcesA.push(v);
    });
    if (sourcesA.length === 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 1: Masukkan minimal 1 sumber referensi!', 'warning');
      } else {
        alert('Pertanyaan 1: Masukkan minimal 1 sumber referensi!');
      }
      var _el2 = document.querySelector('.input-source-a'); if (_el2) _el2.focus();;
      return;
    }

    // Validasi Pertanyaan 2 (min 20 karakter)
    if (cardBAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 2: Jawaban 4 dimensi profil lulusan minimal 20 karakter!', 'warning');
      } else {
        alert('Pertanyaan 2: Jawaban 4 dimensi profil lulusan minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0CardBAnswer'); if (_el1) _el1.focus();;
      return;
    }

    // Validasi Sumber Pertanyaan 2
    const sourcesB = [];
    document.querySelectorAll('.input-source-b').forEach(inp => {
      const v = (inp.value || '').trim();
      if (v) sourcesB.push(v);
    });
    if (sourcesB.length === 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pertanyaan 2: Masukkan minimal 1 sumber referensi!', 'warning');
      } else {
        alert('Pertanyaan 2: Masukkan minimal 1 sumber referensi!');
      }
      var _el2 = document.querySelector('.input-source-b'); if (_el2) _el2.focus();;
      return;
    }

    // Validasi Resume Simulasi (min 20 karakter)
    if (resumeAns.length < 20) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Resume Simulasi minimal 20 karakter!', 'warning');
      } else {
        alert('Resume Simulasi minimal 20 karakter!');
      }
      var _el1 = document.getElementById('nftD0MateriSummary'); if (_el1) _el1.focus();;
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const payload = {
      submitted: true,
      submitted_at: new Date().toISOString(),
      cardA: {
        title: 'Tema Kegiatan Kokurikuler TP 2026-2027',
        answer: cardAAns,
        sources: sourcesA
      },
      cardB: {
        title: '4 Dimensi Profil Lulusan Kegiatan',
        answer: cardBAns,
        sources: sourcesB
      },
      summary: resumeAns,
      conclusion: resumeAns
    };

    const idList = new Set([cleanNisn]);
    if (cleanNisn) {
      const unp = cleanNisn.replace(/^0+/, '');
      idList.add(unp);
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) idList.add(cleanNisn.padStart(10, '0'));
    }
    idList.forEach(id => {
      try {
        localStorage.setItem('fincestem_materi_nft_day0_' + id, JSON.stringify(payload));
        localStorage.setItem('fincestem_materi_day0_' + id, JSON.stringify(payload));
      } catch(e) {}
    });

    // Rekam progress tahap 1 tuntas
    if (window.FincestemCore && FincestemCore.progress && cleanNisn) {
      if (typeof FincestemCore.progress.submitTask === 'function') {
        FincestemCore.progress.submitTask(cleanNisn, 0, 'materi', payload, function() {
          if (window.FincestemCore && FincestemCore.ui) {
            FincestemCore.ui.toast('Simulasi Modul Day 0 Selesai! LKPD kini terbuka.', 'success');
          }
        });
      } else if (typeof FincestemCore.progress.saveTaskProgress === 'function') {
        FincestemCore.progress.saveTaskProgress(0, 'materi', payload);
      }
    }

    // Modal transisi rapi ke LKPD Day 0
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
            Tahap 1 Tuntas • Modul Day 0
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day 0 Berhasil Diselesaikan!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-center">
            Jawaban pertanyaan dan resume Anda telah tersimpan. Silakan lanjutkan ke <strong>LKPD Observasi Lapangan Day 0</strong>.
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=0" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut ke LKPD Day 0</span>
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

    
  // =========================================================================
  // 6C. PANDUAN VIDEO OBSERVASI & ANALISIS FINCESTEM 7 SEKTOR (DAY 5 & DAY 6)
  // Durasi Video: 5 - 10 Menit | Tanpa Wawancara Narasumber | Upload YouTube
  // =========================================================================
  const NFT_VIDEO_SECTORS_GUIDE = {
    pertanian: {
      key: 'pertanian',
      name: 'Pertanian Tanaman Pangan & Hortikultura',
      shortName: '🌾 Pertanian',
      badge: 'Sawah Padi, Jagung & Sayuran',
      icon: 'agriculture',
      objectExamples: 'Lahan Sawah Padi Irigasi BK, Kebun Jagung/Cabai/Sayuran, Gudang Alsintan atau Kilang Padi (RMU) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Pertanian',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di depan kamera tanpa mewawancarai petani/pemilik lahan. Anda menyorot lokasi persawahan/pertanian dan peralatan kerja, lalu menjelaskan langsung kaitan Culture, Exploration Alat, serta 4 Unsur STEM (Science, Technology, Engineering, Mathematics).',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Pertanian',
            desc: 'Tampil di depan kamera di area persawahan/lahan tani atau tempat alat pertanian. Sebutkan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama lokasi lahan/tempat pertanian dan komoditas yang diamati (misal: padi sawah irigasi Belitang).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kerja & Kearifan Lokal Tani)',
            desc: 'Sorot suasana sekitar lahan sawah dan jelaskan secara mandiri budaya kerja petani di OKU Timur: tradisi gotong royong (sambatan/rewang), disiplin waktu turun ke sawah pagi hari, pembagian air irigasi bersama (P3A/Mitra Cai), atau sistem tanam serempak.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan, Mesin & APD Pertanian)',
            desc: 'Arahkan kamera menyorot langsung peralatan/mesin pertanian yang ada di lokasi (seperti cangkul, sabit bergerigi, sprayer elektrik, traktor tangan/rotary, pompa air, combine harvester, atau mesin giling RMU) beserta perlengkapan keselamatan kerja (APD: sepatu boot lumpur, caping/topi lebar, masker, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Pertanian (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk tanaman dan peralatan di lapangan, jelaskan keempat unsur STEM secara berurutan sesuai panduan di bawah ini (Sains biologi/fisika/kimia lahan & alat, Teknologi mekanisasi/benih, Rekayasa irigasi/jajar legowo/desain alat, dan Matematika kapasitas kerja & hasil panen).'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Produksi Pertanian dari Hulu ke Hilir',
            desc: 'Jelaskan secara ringkas tahapan proses kerja di lokasi tersebut: mulai dari pengolahan tanah, penyemaian, penanaman, pemupukan, pengendalian hama, hingga pemanenan dan penggilingan gabah menjadi beras.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum manfaat penerapan ilmu STEM dan peralatan modern dalam meringankan beban kerja petani di OKU Timur, lalu tutup video dengan salam santun.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan proses fotosintesis tanaman padi/sayuran, peran unsur hara pupuk (N, P, K) dan pH tanah sawah, siklus biologi hama/gulma, serta prinsip Fisika tekanan permukaan (P = F/A) pada roda besi traktor/crawler combine agar tidak amblas di lumpur dan tekanan udara/fluida pada nozzle sprayer.',
          technology: 'Jelaskan teknologi alat dan budidaya yang diamati: peralihan dari sabit/cangkul manual ke mesin Traktor Tangan, Sprayer Elektrik baterai Lithium, Combine Harvester, atau Mesin Penggilingan Padi (RMU), serta penggunaan varietas benih unggul bersertifikat (Inpari/Ciherang).',
          engineering: 'Jelaskan rekayasa tata ruang dan rancang bangun alat: rekayasa pola tanam Jajar Legowo (2:1 atau 4:1) untuk ruang tumbuh dan cahaya matahari, rekayasa saluran irigasi gravitasi (tersier/kuarter), serta desain kemiringan mata bajak/pisau pemotong mesin panen.',
          mathematics: 'Jelaskan hitungan matematis di lapangan: luas lahan (hektar atau rante), jarak tanam (misal 25 cm x 25 cm), takaran dosis pupuk per hektar, perbandingan kecepatan kerja mesin vs tenaga manual (jam/hektar), serta estimasi tonase hasil panen gabah per hektar.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Pertanian',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda kembali menjelaskan mandiri di depan kamera (tanpa wawancara narasumber) dengan memfokuskan bahasan pada perhitungan ekonomi/finansial usaha tani, analisis risiko/kendala lapangan, serta gagasan inovasi berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Pertanian yang Diamati',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah kelayakan Finansial, Kendala Risiko, dan Solusi Inovasi FINCESTEM pada objek pertanian yang Anda amati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Awal, Biaya Operasional, HPP & Keuntungan)',
            desc: 'Jelaskan di depan kamera rincian perputaran uang usaha tani per musim tanam: estimasi modal beli benih, pupuk, pestisida, BBM/sewa alsintan, upah panen, hingga perhitungan total penjualan gabah/beras (Omzet) dikurangi total biaya untuk mendapatkan Laba Bersih petani.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Alam & Masalah Pemasaran',
            desc: 'Tunjukkan kondisi di lapangan dan analisis kendala nyata yang dihadapi usaha pertanian tersebut: serangan hama wereng/tikus/jamur, cuaca ekstrem (banjir/kekeringan), kelangkaan/mahalnya pupuk, kerusakan mesin alsintan, atau anjloknya harga gabah basah saat panen raya.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan ide solusi kreatif Anda sebagai pelajar SMAN 1 Belitang: pemanfaatan jerami/sekam menjadi kompos/arang sekam (biochar), penggunaan pestisida nabati ramah lingkungan, pengeringan gabah/hilirisasi beras kemasan berlabel untuk menaikkan nilai jual, serta pencatatan pembukuan keuangan tani.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir Kelayakan Usaha & Penutup',
            desc: 'Simpulkan apakah usaha pertanian tersebut layak dan menguntungkan secara finansial jika dikelola dengan inovasi STEM yang tepat, lalu tutup video dengan salam.'
          }
        ],
        finPoints: {
          financial: 'Uraikan estimasi biaya tetap & biaya variabel per hektar/musim (benih, pupuk, obat pertanian, sewa traktor/combine, tenaga kerja), harga jual Gabah Kering Panen (GKP) vs Beras per kg, serta perhitungan Laba Bersih dan R/C Ratio.',
          constraints: 'Identifikasi masalah utama: penyusutan hasil panen (losses), serangan organisme pengganggu tanaman (OPT), ketergantungan pada tengkulak saat panen raya, atau tingginya biaya perawatan mesin.',
          innovation: 'Usulkan inovasi nilai tambah (added value): pengolahan gabah menjadi beras premium kemasan 5 kg/10 kg berlabel lokal OKU Timur, pemanfaatan limbah sekam/bekatul untuk pakan/pupuk organik, serta adopsi pembayaran/pencatatan kas digital.'
        }
      }
    },

    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Karet, Sawit & Komoditas',
      shortName: '🌴 Perkebunan',
      badge: 'Karet, Kelapa Sawit, Singkong & Buah',
      icon: 'forest',
      objectExamples: 'Kebun Karet Rakyat, Kebun Kelapa Sawit, Lahan Singkong/Tebu, atau Kebun Buah (Duku/Jeruk/Semangka) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perkebunan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda menjelaskan secara mandiri di area kebun (karet/sawit/buah) tanpa wawancara narasumber. Sorot pohon/tanaman kebun dan peralatan sadap/panen, lalu kupas aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Perkebunan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta tunjukkan lokasi kebun yang diamati (misal: kebun karet atau kelapa sawit rakyat di kecamatan Anda).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etos Kerja Pekebun & Tradisi Lokal)',
            desc: 'Jelaskan budaya kerja pekebun di OKU Timur: disiplin menyadap karet sejak subuh agar aliran lateks maksimal, budaya merawat piringan pohon, sistem bagi hasil kebun, atau kebersamaan saat panen dan penimbangan komoditas.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Sadap/Panen & APD Kebun)',
            desc: 'Sorot langsung peralatan kerja perkebunan: pisau sadap karet, talang dan mangkok lateks, bak pembeku, dodos, egrek bergalah aluminium/teleskopik, tojok besi, dan gerobak angkong, beserta APD pekebun (helm pelindung kepala, sepatu boot tinggi anti-duri/ular, sarung tangan karet/kulit, senter kepala).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perkebunan (Science, Technology, Engineering, Mathematics)',
            desc: 'Tunjukkan pohon dan alat perkebunan sambil memaparkan analisis Science, Technology, Engineering, dan Mathematics secara sistematis sesuai panduan sektor perkebunan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Proses Pemeliharaan, Panen & Pascapanen Kebun',
            desc: 'Jelaskan alur kerja di kebun: mulai dari pembersihan gulma piringan, pemupukan, proses penyadapan getah lateks / pemotongan tandan buah segar (TBS) sawit, pembekuan getah, hingga pengangkutan ke tempat pengumpulan.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Simpulkan peran penting pemahaman sains tanaman dan ketepatan rekayasa alat panen dalam menjaga umur tanaman perkebunan, lalu tutup dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan biologi pembuluh lateks dan tekanan turgor sel pohon karet yang tinggi di pagi hari (serta keharusan menjaga lapisan kambium batang), kriteria kematangan fisiologis buah sawit (brondolan merah-oranye kaya minyak CPO), kimia pembekuan (koagulasi) lateks dengan asam semut/asap cair, serta fisika tuas pengungkit pada angkong/tojok.',
          technology: 'Jelaskan teknologi peralatan kebun: penggunaan galah Egrek berbahan pipa Aluminium Alloy / Carbon Fiber yang ringan dan kaku dibanding bambu tradisional, baja karbon tinggi (per baja) pada mata dodos/pisau sadap, serta penggunaan bibit klon karet unggul (PB 260/IRR) atau bibit sawit bersertifikat.',
          engineering: 'Jelaskan rekayasa teknik di kebun: desain sudut kemiringan alur sadap karet (30°–45°) agar getah mengalir lancar ke mangkok tanpa merusak kayu, pola tanam segitiga sama sisi (mata lima) pada sawit agar tajuk daun mendapat cahaya merata, serta pembuatan lubang rorak penahan air dan kompos.',
          mathematics: 'Jelaskan perhitungan matematis kebun: populasi jumlah pohon per hektar (misal 130–143 pohon sawit/ha atau 450–500 pohon karet/ha), siklus rotasi panen (sadap 2 hari sekali atau panen sawit tiap 10–14 hari), berat rata-rata per tandan (kg), serta estimasi tonase hasil per bulan.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perkebunan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda membedah secara mandiri perhitungan biaya perawatan & pendapatan kebun, kendala fluktuasi harga/mutu komoditas, serta gagasan inovasi nilai tambah berbasis STEM dan Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perkebunan',
            desc: 'Sampaikan salam, identitas lengkap (Nama, NISN, Kelas, Fasilitator), dan tujuan video Day 6 untuk menganalisis aspek Finansial, Kendala, dan Solusi Inovasi pada kebun yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Biaya Perawatan, Panen, Harga Jual & Laba Bersih)',
            desc: 'Uraikan di depan kamera perhitungan ekonomi kebun per bulan: biaya pupuk NPK/Dolomit, herbisida, asam pembeku karet, upah penyadap/pemanen dan angkut, dibandingkan dengan hasil penjualan bokar/TBS sawit (kg x harga per kg) hingga diperoleh pendapatan bersih pekebun.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Lapangan & Risiko Usaha Perkebunan',
            desc: 'Jelaskan kendala nyata di kebun tersebut: penyakit gugur daun/jamur akar putih pada karet, penurunan produksi saat musim gugur daun/kemarau (trek), potongan timbangan (refraksi kadar air), kerusakan alat panen, atau fluktuasi harga karet/sawit dunia.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: penerapan bokar bersih (tanpa tatal/tanah) dengan pembeku asap cair agar kadar karet kering (KKK) tinggi dan dihargai mahal melalui Unit Pengolahan dan Pemasaran Bokar (UPPB/Lelang), pemanfaatan pelepah sawit cacah untuk pakan ternak/kompos, serta pola tumpang sari (intercropping).'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Rangkum bagaimana kombinasi manajemen mutu STEM dan tata kelola keuangan yang sehat mampu meningkatkan kesejahteraan pekebun OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Jelaskan rincian biaya pemeliharaan kebun (pupuk, perawatan piringan, perawatan alat), sistem bagi hasil atau upah panen, pengaruh persentase Kadar Karet Kering (KKK) / rendemen sawit terhadap harga jual per kg, serta hitungan laba bersih bulanan.',
          constraints: 'Analisis masalah utama: harga jual rendah akibat mutu bokar basah/kotor, serangan penyakit kulit sadap (kering alur sadap / KAS), mahalnya pupuk kimia, atau jalan kebun rusak saat musim hujan.',
          innovation: 'Gagasan inovasi: penggunaan koagulan ramah lingkungan (asap cair/asam format) untuk menghasilkan bokar bersih bernilai jual premium, penjualan kolektif lewat UPPB/Koperasi Desa, serta diversifikasi pendapatan kebun.'
        }
      }
    },

    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Sapi, Kambing & Unggas',
      shortName: '🐄 Peternakan',
      badge: 'Peternakan Sapi, Kambing, Ayam & Bebek',
      icon: 'pets',
      objectExamples: 'Peternakan Sapi, Kandang Kambing/Domba, Peternakan Ayam Petelur/Pedaging (Broiler), atau Budidaya Bebek/Itik di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Peternakan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di area kandang/peternakan tanpa wawancara pemilik. Sorot ternak, konstruksi kandang, dan peralatan pakan/sanitasi, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Peternakan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan lokasi kandang dan jenis hewan ternak yang Anda amati (peternakan sapi, kambing, ayam petelur/pedaging, atau bebek).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kerja Peternak & Etika Pemeliharaan)',
            desc: 'Jelaskan kebiasaan dan budaya kerja peternak di OKU Timur: kedisiplinan jadwal pemberian pakan dan minum pagi-sore, kebersihan sanitasi kandang agar tidak mengganggu warga sekitar, serta tradisi tabungan ternak keluarga untuk masa depan/hari raya.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Pakan, Kandang & APD Peternak)',
            desc: 'Sorot langsung peralatan peternakan di lokasi: sabit rumput, mesin pencacah rumput (chopper), tong/drum fermentasi silase, tempat pakan/minum otomatis (nipple drinker), pemanas brooder/kipas kandang, sprayer desinfektan, sekop kotoran, serta APD (sepatu boot kandang, masker penahan bau amonia, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Peternakan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjukkan kondisi kandang dan pakan, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor peternakan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Manajemen Pemeliharaan Harian di Kandang',
            desc: 'Jelaskan alur perawatan ternak harian: penyediaan/pencacahan pakan, pemberian air minum dan vitamin, pembersihan lantai kandang, hingga pengelolaan limbah kotoran ternak.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penerapan sains nutrisi dan rekayasa kandang sehat membuat ternak tumbuh optimal dan bebas penyakit, lalu tutup video dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan biologi sistem pencernaan dan nutrisi ternak (kebutuhan serat hijauan dan protein konsentrat), proses biokimia fermentasi anaerob oleh bakteri asam laktat (Lactobacillus) pada pembuatan pakan silase/fermentasi, pengendalian gas amonia (NH3) dari kotoran, serta biosekuriti pencegahan virus/bakteri.',
          technology: 'Jelaskan teknologi peternakan yang diamati: Mesin Chopper pencacah rumput berpenggerak motor bensin/diesel, instalasi air minum otomatis (Nipple Drinker), alat pengatur suhu pemanas (Brooder/Thermostat), teknologi Inseminasi Buatan (IB/kawin suntik) bibit unggul, atau reaktor Biogas.',
          engineering: 'Jelaskan rekayasa konstruksi kandang dan alat: desain kemiringan lantai kandang (2°–5°) agar urine dan air cucian langsung mengalir ke saluran pembuangan sehingga kuku/lantai tetap kering, rekayasa ventilasi atap (monitor) untuk sirkulasi udara segar, serta desain pisau putar pada mesin chopper.',
          mathematics: 'Jelaskan perhitungan matematis di kandang: takaran pakan harian (misal hijauan 10% dari bobot badan sapi, atau gram pakan per ekor ayam), kapasitas kandang (jumlah ekor per meter persegi), estimasi pertambahan bobot harian (ADG) atau persentase produksi telur harian (Hen Day Production).'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Peternakan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri struktur modal bibit/bakalan, biaya pakan harian, potensi keuntungan penjualan ternak/telur, kendala penyakit/pakan, serta solusi inovasi Zero-Waste berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Peternakan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan jelaskan fokus video Day 6 yaitu membedah analisis Finansial, Risiko Usaha, dan Inovasi Nilai Tambah pada peternakan yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Bibit, Biaya Pakan, Harga Jual & Laba Bersih)',
            desc: 'Paparkan di depan kamera perhitungan ekonomi peternakan: harga beli bibit/bakalan (DOC/pedet/bakalan sapi), biaya pakan harian (komponen biaya terbesar 60–70%), biaya obat/vaksin & listrik, dibandingkan dengan harga jual panen ternak/telur hingga didapat Laba Bersih.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Penyakit & Fluktuasi Harga Pakan',
            desc: 'Analisis tantangan nyata yang dihadapi peternak: mahalnya harga pakan konsentrat/pelet pabrikan, kesulitan mencari rumput segar saat musim kemarau, risiko penyakit ternak (PMK, kembung/bloat, tetelo/flu burung), atau bau limbah kotoran kandang.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Sampaikan ide inovasi Anda: pembuatan Bank Pakan Silase/Fermentasi dari limbah jerami padi atau pelepah sawit lokal OKU Timur untuk memangkas biaya pakan, pengolahan kotoran ternak menjadi Pupuk Organik Kompos/Bokashi Granul bernilai jual atau Biogas, serta budidaya Maggot BSF sebagai pakan alternatif unggas.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha peternakan tersebut dan bagaimana inovasi pengolahan pakan/limbah mampu melipatgandakan keuntungan peternak, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Hitung rincian modal pembelian bibit/bakalan, total biaya pakan selama satu siklus pemeliharaan, biaya kesehatan/operasional, rasio konversi pakan (FCR), total penerimaan penjualan, serta keuntungan bersih peternak.',
          constraints: 'Identifikasi kendala kritis: kenaikan harga pakan pabrikan yang menggerus margin laba, risiko kematian (mortalitas) akibat cuaca/penyakit, serta belum optimalnya pengolahan limbah kotoran.',
          innovation: 'Usulkan inovasi konkret: substitusi pakan dengan silase/fermentasi bahan baku lokal (jerami/dedak/bungkil), komersialisasi pupuk kandang bokashi kemasan karung untuk petani kebun, dan manajemen pencatatan keuangan kandang.'
        }
      }
    },

    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Budidaya Air Tawar',
      shortName: '🐟 Perikanan',
      badge: 'Kolam Patin, Lele, Nila & Gurame',
      icon: 'phishing',
      objectExamples: 'Kolam Tanah/Terpal Budidaya Ikan Patin, Lele, Nila, Gurame, Tempat Pembenihan Ikan, atau Usaha Pengolahan Ikan (Pindang/Asap/Kemplang) di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perikanan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda menjelaskan mandiri di tepi kolam perikanan tanpa mewawancarai pemilik kolam. Sorot konstruksi kolam, air, ikan, dan peralatan perikanan, lalu uraikan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Kolam Perikanan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan lokasi kolam budidaya dan jenis ikan air tawar yang diamati (patin, lele, nila, atau gurame).'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Budidaya Ikan & Kuliner Khas Komering)',
            desc: 'Jelaskan budaya masyarakat OKU Timur dalam memelihara ikan air tawar sebagai sumber protein utama dan bahan baku kuliner khas daerah (seperti pindang patin, tempoyak, pempek, dan kerupuk kemplang ikan), serta ketekunan pembudidaya menjaga kualitas air kolam.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Kolam, Aerasi, Pakan & APD)',
            desc: 'Sorot langsung peralatan perikanan di lokasi: pompa air listrik/alkon, pipa pemasukan (inlet) dan pembuangan (outlet/central drain), kincir air/blower aerator, jaring waring/hapa, bak sortir ukuran ikan (grading), timbangan pakan, alat ukur pH/suhu air, serta APD (sepatu boot air, topi/wearpack, sarung tangan).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perikanan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk air kolam dan peralatan budidaya, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor perikanan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Tahapan Budidaya Ikan dari Tebar Benih hingga Panen',
            desc: 'Jelaskan siklus kerja di kolam: pengeringan dan pengapuran dasar kolam, pengisian air dan penumbuhan plankton, penebaran benih (bibit), jadwal pemberian pelet harian, penyortiran ukuran (grading), hingga pemanenan.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum betapa pentingnya pengendalian kualitas air berbasis sains dan rekayasa kolam bagi keberhasilan panen ikan di OKU Timur, lalu tutup dengan salam.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan parameter fisika, kimia, dan biologi ekosistem kolam: kadar oksigen terlarut (DO > 5 ppm), derajat keasaman air (pH ideal 6,5–8,0), bahaya racun gas amonia (NH3) dari sisa pakan dan kotoran ikan di dasar kolam, peran fitoplankton/probiotik, serta sifat biologis ikan (seperti kanibalisme pada lele jika ukuran tidak seragam).',
          technology: 'Jelaskan teknologi akuakultur yang diamati: pompa air submersible/sentrifugal, kincir air atau aerator blower untuk menyuplai oksigen, teknologi pelet terapung hasil mesin ekstruder (agar pakan tidak tenggelam membusuk di lumpur), sensor pH/TDS meter digital, atau mesin pencetak pelet mandiri.',
          engineering: 'Jelaskan rekayasa rancang bangun kolam: konstruksi pematang/tanggul kolam tanah atau rangka kolam terpal bundar/persegi, desain kemiringan dasar kolam menuju pipa pembuangan tengah (central drain / pipa sifon standpipe) yang memanfaatkan tekanan hidrostatis untuk membuang endapan lumpur kotor, serta desain keranjang grading ramah lendir ikan.',
          mathematics: 'Jelaskan perhitungan matematis kolam: rumus volume air kolam (Panjang x Lebar x Kedalaman air, atau phi x r^2 x t), kepadatan tebar benih per meter persegi (misal 20–30 ekor patin/m2 atau 100 ekor lele/m2), persentase takaran pakan harian (3%–5% dari biomassa bobot ikan), serta tingkat kelulushidupan (Survival Rate / SR).'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perikanan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri modal benih, biaya pakan pelet, perhitungan FCR & keuntungan panen ikan, kendala kualitas air/harga pakan, serta gagasan inovasi pakan mandiri dan hilirisasi olahan ikan.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perikanan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini memfokuskan analisis pada Pilar Financial, Kendala Risiko, dan Solusi Inovasi FINCESTEM di sektor perikanan.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Benih, Biaya Pakan/FCR, Omzet Panen & Laba Bersih)',
            desc: 'Jelaskan di depan kamera rincian finansial satu siklus panen (3–6 bulan): biaya pembelian ribuan ekor benih ikan, total karung pakan pelet yang dihabiskan (beserta nilai FCR), biaya listrik pompa/kapur/probiotik, dibandingkan dengan hasil penjualan tonase ikan segar (kg x harga per kg) hingga diperoleh Laba Bersih.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Lapangan & Risiko Budidaya Ikan',
            desc: 'Analisis kendala nyata yang dihadapi pembudidaya: tingginya harga pelet pabrikan yang mencapai 70% dari biaya produksi, perubahan pH air mendadak saat hujan deras yang memicu stres/kematian ikan, penyakit jamur/bakteri Aeromonas, atau harga jual ikan mentah yang ditekan tengkulak.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: pembuatan pelet mandiri berbahan baku lokal (dedak halus, tepung ikan rucah, bungkil kedelai/ampas tahu, atau budidaya Maggot BSF & Azolla) untuk menghemat biaya pakan hingga 30%, aplikasi sistem Bioflok/Probiotik EM4 perikanan, serta pengolahan hasil panen menjadi produk bernilai tambah tinggi (fillet patin beku, bakso ikan, abon, atau kemplang).'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan usaha perikanan tersebut dan bagaimana efisiensi FCR pakan serta hilirisasi produk olahan mampu mendongkrak keuntungan pembudidaya di OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan perhitungan biaya benih, total biaya pakan pelet, perhitungan Feed Conversion Ratio (FCR = Total Pakan kg / Total Bobot Panen Ikan kg), Harga Pokok Produksi (HPP) per kg ikan vs harga jual pasar, serta Laba Bersih per siklus.',
          constraints: 'Identifikasi masalah utama: mahalnya harga pakan komersial, kematian benih di awal tebar, penurunan kualitas air (amonia tinggi/DO rendah), serta fluktuasi harga jual ikan konsumsi.',
          innovation: 'Usulkan inovasi STEM-Finansial: pakan alternatif berprotein tinggi (Maggot BSF / Azolla / pelet mandiri), manajemen air probiotik/central drain untuk menekan FCR ke angka 1,0–1,2, serta diversifikasi produk olahan ikan khas OKU Timur.'
        }
      }
    },

    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan, Pasar, Toko & UMKM Kuliner',
      shortName: '🏪 Perdagangan & UMKM',
      badge: 'Pasar, Toko Sembako, Warung & Kuliner',
      icon: 'storefront',
      objectExamples: 'Toko Sembako/Grosir, Kios Pasar Tradisional (Gumawang/Martapura/Belitang), Warung Makan/UMKM Kuliner, Toko Bangunan, atau Toko Sarana Pertanian di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Perdagangan / UMKM',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi toko/warung/tempat usaha UMKM tanpa mewawancarai pemilik/pedagang. Sorot penataan barang, peralatan dagang/produksi, dan fasilitas pembayaran, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Toko / UMKM',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama toko/warung/unit UMKM, lokasi desa/kecamatan, dan jenis barang dagangan atau produk kuliner yang dijual.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etika Pelayanan, Kejujuran Dagang & Budaya Konsumen Lokal)',
            desc: 'Jelaskan budaya pelayanan di tempat usaha tersebut: keramahan menyapa pembeli (senyum, sapa, santun adat lokal), kejujuran takaran timbangan, keunikan cita rasa kuliner lokal yang disukai warga OKU Timur, serta hubungan saling percaya antara pedagang dan pelanggan tetap.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Peralatan Ukur, Display, Kemasan & Higienitas)',
            desc: 'Sorot langsung peralatan kerja di toko/UMKM: timbangan digital/mekanik, mesin kasir/kalkulator, barcode QRIS, etalase kaca/rak display barang, lemari pendingin (showcase/freezer), alat pengemas (hand sealer/vacuum sealer), kompor/alat masak UMKM, serta perlengkapan kebersihan/APD (celemek/apron, sarung tangan plastik makanan, penjepit makanan, masker).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Perdagangan & UMKM (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk produk dan peralatan toko/UMKM, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor perdagangan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Pengadaan Stok, Penyimpanan & Pelayanan Pembeli',
            desc: 'Jelaskan bagaimana alur operasional usaha tersebut berjalan setiap hari: mulai dari belanja bahan baku/stok barang dari distributor, pemeriksaan kualitas, penataan di rak/etalase, hingga proses melayani transaksi pembeli.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penerapan sains pengawetan produk, teknologi timbangan/kasir digital, dan tata ruang toko membuat usaha perdagangan/UMKM berjalan higienis dan profesional, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan aspek Sains pada produk dan penyimpanan: pengendalian suhu dingin (termodinamika lemari pendingin/freezer 0°–4°C) untuk menghambat pertumbuhan bakteri pembusuk pada bahan pangan/minuman, perlindungan produk kering (beras/tepung/kerupuk) dari kelembaban udara dan jamur (oksidasi/ketengikan minyak), serta standar higienitas pangan.',
          technology: 'Jelaskan teknologi perdagangan yang digunakan: pemakaian Timbangan Digital bersensor Load Cell yang akurat hingga satuan gram, mesin perekat kemasan plastik (Impulse Heat Sealer), penggunaan kode pembayaran digital QRIS / aplikasi kasir POS di smartphone, serta pemanfaatan media sosial (WhatsApp/Facebook/Instagram) untuk katalog dan pesan-antar.',
          engineering: 'Jelaskan rekayasa tata letak (Layout Engineering) dan kemasan: rekayasa penataan rak barang dengan prinsip FIFO (First In First Out — barang yang masuk lebih dulu diletakkan di bagian depan agar terjual lebih dulu sebelum kedaluwarsa), pengelompokan barang sesuai kategori, sirkulasi udara/pencahayaan ruang toko, serta desain kemasan kedap udara.',
          mathematics: 'Jelaskan penerapan Matematika di toko/UMKM: konversi satuan berat dan volume (ton, kuintal, karung 50 kg, lusin, gros ke eceran kilogram/ons/liter), perhitungan stok persediaan minimum (reorder point) agar barang laris tidak kehabisan, serta kecepatan perputaran barang harian.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Perdagangan / UMKM',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda membedah secara mandiri perputaran modal kulakan/bahan baku, perhitungan Harga Pokok Penjualan (HPP), margin keuntungan per produk, kendala persaingan/barang rusak, serta inovasi digitalisasi dan kemasan UMKM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Perdagangan / UMKM',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini mengupas tuntas analisis Finansial, Risiko Usaha, dan Inovasi Pengembangan pada toko/UMKM yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Kulakan, HPP, Margin Keuntungan & Omzet Harian)',
            desc: 'Jelaskan di depan kamera perhitungan keuangan toko/UMKM: modal belanja stok barang/bahan baku (HPP), biaya operasional (listrik freezer/lampu, plastik kemasan, gas, transportasi), cara menentukan harga jual (persentase markup/margin laba per item, misal 10%–30%), hingga estimasi omzet kotor dan Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Usaha, Risiko Barang Rusak & Persaingan Pasar',
            desc: 'Analisis kendala nyata yang dihadapi usaha tersebut: risiko barang kedaluwarsa/ penyusutan (shrinkage) atau makanan basi jika tidak habis terjual, kenaikan harga bahan baku pokok dari distributor, piutang pembeli yang kasbon/macet, pencatatan uang usaha yang masih tercampur dengan uang dapur keluarga, atau persaingan dengan ritel modern/toko online.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan gagasan solusi Anda: pemisahan tegas antara rekening/kas usaha dengan keuangan pribadi rumah tangga, penerapan pembukuan kas harian digital, inovasi pengemasan modern berlabel merek dan izin PIRT/Halal agar tahan lama dan bernilai jual lebih tinggi, penyediaan pembayaran non-tunai QRIS, serta layanan pesan-antar (delivery order) via WhatsApp Bisnis.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial toko/UMKM tersebut dan bagaimana inovasi manajemen stok STEM serta disiplin pembukuan keuangan dapat membuat usaha naik kelas, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Jelaskan perhitungan Harga Pokok Penjualan (HPP), selisih harga beli grosir vs harga jual eceran (Margin Laba Kotor), biaya operasional bulanan, perhitungan titik impas (Break Even Point / BEP), serta estimasi Laba Bersih usaha.',
          constraints: 'Identifikasi masalah utama: tercampurnya uang modal usaha dengan pengeluaran pribadi keluarga, barang rusak/kedaluwarsa karena kurang kontrol stok, piutang/bon pelanggan yang menghambat perputaran kas, atau kemasan produk yang masih sederhana.',
          innovation: 'Usulkan inovasi konkret: manajemen stok FIFO terstruktur, redesain kemasan kedap udara berlabel menarik untuk memperpanjang masa simpan (shelf-life), adopsi pembayaran QRIS, dan promosi digital lokal.'
        }
      }
    },

    keuangan: {
      key: 'keuangan',
      name: 'Koperasi, Agen BRI-Link & Jasa Keuangan',
      shortName: '🏦 Koperasi & BRI-Link',
      badge: 'Agen BRI-Link, Koperasi, BUMDes & Bank',
      icon: 'account_balance',
      objectExamples: 'Gerai Agen BRI-Link / Agen Laku Pandai Perbankan, Koperasi Simpan Pinjam / KUD / Koperasi Sekolah, atau Unit Jasa Keuangan BUMDes di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Koperasi / BRI-Link',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi gerai Agen BRI-Link / Koperasi / BUMDes tanpa mewawancarai pengelola/nasabah. Sorot ruang layanan, spanduk tarif/informasi, dan perangkat transaksi, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Koperasi / Agen BRI-Link',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama gerai Agen BRI-Link / Koperasi / BUMDes, lokasi desa/kecamatan, dan jenis layanan keuangan yang tersedia bagi warga.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Budaya Kepercayaan, Inklusi Keuangan & Kekeluargaan)',
            desc: 'Jelaskan nilai budaya di lembaga keuangan mikro/agen perbankan desa: pentingnya integritas dan kepercayaan (trust) dalam memegang amanah uang masyarakat, asas kekeluargaan dan gotong royong pada koperasi, serta bagaimana kehadiran Agen BRI-Link/Koperasi membantu petani dan warga desa bertransaksi dekat rumah tanpa harus jauh ke bank di pusat kota.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Perangkat Transaksi, Keamanan & Sarana Layanan)',
            desc: 'Sorot langsung peralatan kerja di gerai (tanpa merekam data rahasia/PIN nasabah): mesin EDC (Electronic Data Capture) / Android POS, printer struk termal Bluetooth, mesin penghitung uang (money counter), lampu UV pendeteksi uang asli/palsu, brankas/laci kas berpelindung, kamera pengawas CCTV, papan informasi tarif resmi, serta buku/aplikasi register transaksi.'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Koperasi & BRI-Link (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk perangkat layanan di lokasi, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics pada jasa keuangan sesuai panduan di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Layanan Transaksi Keuangan Masyarakat',
            desc: 'Jelaskan ragam layanan yang berjalan setiap hari: setor dan tarik tunai tabungan, transfer antarbank, pembayaran tagihan listrik PLN/token, BPJS, cicilan, top-up dompet digital, penyaluran bantuan pemerintah, atau layanan simpanan dan pinjaman modal usaha di koperasi.'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Simpulkan peran teknologi finansial (fintech) dan sains pengamanan uang dalam mempercepat perputaran ekonomi masyarakat pedesaan OKU Timur, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan prinsip Sains (Fisika Optik & Kimia Material) pada peralatan keuangan: pemanfaatan gelombang sinar Ultraviolet (UV) untuk memendarkan tinta fosfor dan benang pengaman saat menguji keaslian uang kertas Rupiah (3D: Dilihat, Diraba, Diterawang), serta reaksi kimia pemanasan pada kertas struk termal (thermal paper) yang mencetak tulisan tanpa tinta cair.',
          technology: 'Jelaskan Teknologi Finansial (Fintech & Telekomunikasi) yang bekerja: sistem mesin EDC dan aplikasi mobile banking agen yang membaca chip kartu ATM/debit, transmisi data transaksi terenkripsi secara real-time melalui jaringan seluler 4G/Wi-Fi ke server pusat bank, pemindaian kode matriks QRIS, serta printer termal nirkabel (Bluetooth).',
          engineering: 'Jelaskan Rekayasa Sistem Keamanan & Tata Ruang Layanan (Security & Service Engineering): desain tata letak meja loket berteralis/kaca pelindung, penempatan sudut pandang kamera CCTV yang mengawasi area transaksi, penyimpanan brankas kas yang aman, serta rekayasa alur antrean dan verifikasi berlapis (kartu + PIN + bukti struk cetak) agar bebas salah kirim.',
          mathematics: 'Jelaskan penerapan Matematika Keuangan di gerai: ketelitian menghitung nominal pecahan uang tunai dengan cepat, perhitungan struktur biaya administrasi (fee) per tingkatan nominal transaksi, perhitungan persentase jasa simpan-pinjam atau pembagian Sisa Hasil Usaha (SHU) di koperasi, serta rekonsiliasi pencocokan saldo kas fisik vs saldo mutasi digital.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Koperasi / BRI-Link',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri manajemen modal likuiditas (saldo rekening vs uang tunai di laci), perhitungan pendapatan dari fee transaksi/SHU, evaluasi risiko uang palsu/penipuan/kredit macet, serta solusi inovasi literasi keuangan.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Koperasi / Agen BRI-Link',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah model bisnis Finansial, Manajemen Risiko, dan Inovasi Layanan pada Agen BRI-Link / Koperasi yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Manajemen Modal Likuiditas, Fee Transaksi/SHU & Laba Bersih)',
            desc: 'Jelaskan di depan kamera bagaimana usaha jasa keuangan memperoleh keuntungan: keseimbangan modal kerja antara Saldo Mengendap di Rekening Bank (untuk melayani setor tunai/transfer) dan Uang Tunai Fisik di Laci (untuk melayani tarik tunai), perhitungan pendapatan dari biaya admin (fee per transaksi x jumlah transaksi harian, dikurangi bagi hasil fee ke bank pusat), serta biaya operasional (kuota internet, kertas struk, listrik) hingga didapat Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Operasional & Risiko Keamanan Keuangan',
            desc: 'Analisis risiko dan kendala nyata di lapangan: gangguan sinyal internet/server bank saat jam sibuk, kehabisan uang tunai (likuiditas) saat musim panen raya ketika banyak petani tarik tunai besar, risiko peredaran uang palsu, modus penipuan bukti transfer palsu (struk editan), atau risiko kredit macet (NPL) pada pinjaman koperasi.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan solusi inovatif Anda: penerapan SOP ketat "Cek Mutasi Masuk di Aplikasi Sebelum Serahkan Uang Tunai" dan wajib uji lampu UV pada setiap uang masuk, penyediaan koneksi internet cadangan (dual-provider), sistem pencatatan buku kas ganda (digital & manual) untuk tutup buku harian, serta edukasi literasi keuangan dan tabungan hasil panen bagi warga desa.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha Agen BRI-Link/Koperasi tersebut dan perannya sebagai penggerak inklusi keuangan di Kabupaten OKU Timur, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan manajemen perputaran modal likuiditas (kas tunai vs saldo rekening), rata-rata jumlah transaksi harian dikalikan tarif jasa (fee admin) atau margin jasa simpan-pinjam koperasi, biaya operasional bulanan, serta estimasi Laba Bersih.',
          constraints: 'Identifikasi risiko utama: ketidakseimbangan kas saat penarikan tunai membludak, gangguan jaringan internet/EDC error, ancaman uang palsu dan penipuan rekayasa sosial (social engineering), atau tunggakan angsuran anggota koperasi.',
          innovation: 'Usulkan inovasi STEM-Finansial: protokol verifikasi mutasi real-time & detektor UV wajib, integrasi layanan pembayaran berbagai tagihan satu pintu (one-stop payment), pembukuan rekonsiliasi kas harian otomatis, dan program edukasi gemar menabung/anti-pinjol ilegal.'
        }
      }
    },

    jasa: {
      key: 'jasa',
      name: 'Jasa Teknik, Bengkel & Produksi Kerajinan',
      shortName: '🔧 Jasa & Kerajinan',
      badge: 'Bengkel Motor/Alsintan, Las & Kerajinan',
      icon: 'build',
      objectExamples: 'Bengkel Sepeda Motor/Mobil/Alsintan, Bengkel Las & Bubut, Usaha Pertukangan/Meubel Kayu, Percetakan/Fotokopi, Barbershop/Salon, atau Produksi Kerajinan/Batu Bata di OKU Timur',
      day5: {
        focusTitle: 'Panduan Video Day 5: Observasi Culture, Exploration Alat & 4 Unsur STEM pada Sektor Jasa Teknik / Kerajinan',
        summaryFocus: 'Pada video Day 5 (durasi 5–10 menit), Anda tampil mandiri di lokasi bengkel/tempat jasa teknik/produksi kerajinan tanpa mewawancarai mekanik/pemilik. Sorot peralatan kerja, mesin, dan proses pengerjaan, lalu jelaskan aspek Culture, Exploration Alat, dan 4 Unsur STEM.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan, Identitas Diri & Profil Lokasi Usaha Jasa / Kerajinan',
            desc: 'Sampaikan salam, Nama Lengkap, NISN, Kelas, Nama Guru Fasilitator, serta perkenalkan nama bengkel/usaha jasa teknik/kerajinan, lokasi desa/kecamatan, dan jenis layanan atau produk yang dikerjakan.'
          },
          {
            time: '01:00 – 02:15',
            title: '2. Penjelasan Pilar Culture (Etos Kerja Ketelitian, Kejujuran Servis & Kepuasan Pelanggan)',
            desc: 'Jelaskan budaya kerja pada usaha jasa/teknik tersebut: ketelitian dan kesabaran dalam mendiagnosis kerusakan atau merakit produk, kejujuran mengganti suku cadang asli (tidak membohongi pelanggan), ketepatan waktu pengerjaan, serta budaya menjaga kerapian tempat kerja.'
          },
          {
            time: '02:15 – 03:45',
            title: '3. Penjelasan Pilar Exploration (Sorot Perkakas Kerja, Mesin & APD Keselamatan Kerja K3)',
            desc: 'Sorot langsung peralatan kerja di lokasi: kunci pas/ring/shock (torsi), kompresor udara, mesin las listrik (inverter), gerinda tangan, mesin bor/gergaji ukir, alat ukur (jangka sorong/mikrometer/multimeter/meteran), serta Alat Pelindung Diri (APD K3: topeng/kacamata las, kacamata pelindung percikan gerinda, sarung tangan kulit, sepatu safety/tertutup, masker debu/asap).'
          },
          {
            time: '03:45 – 06:30',
            title: '4. Bedah Inti 4 Unsur STEM pada Jasa Teknik & Kerajinan (Science, Technology, Engineering, Mathematics)',
            desc: 'Sambil menunjuk peralatan bengkel/produksi, jelaskan secara berurutan unsur Science, Technology, Engineering, dan Mathematics sesuai panduan sektor jasa teknik di bawah.'
          },
          {
            time: '06:30 – 08:30',
            title: '5. Gambaran Umum Alur Pengerjaan Servis / Produksi dari Awal hingga Selesai',
            desc: 'Jelaskan tahapan kerja di tempat tersebut: mulai dari penerimaan pesanan/pemeriksaan keluhan pelanggan, pengukuran bahan/pembongkaran komponen, proses perbaikan/perakitan/pengelasan, hingga uji coba akhir (quality control).'
          },
          {
            time: '08:30 – 10:00',
            title: '6. Kesimpulan Observasi STEM Day 5 & Penutup Video',
            desc: 'Rangkum bagaimana penguasaan ilmu fisika mekanika, teknologi mesin perkakas, dan keselamatan kerja K3 menjadi kunci utama keberhasilan usaha jasa teknik/kerajinan di OKU Timur, lalu tutup video.'
          }
        ],
        stemPoints: {
          science: 'Jelaskan prinsip Sains (Fisika & Kimia) yang bekerja: hukum momen gaya/torsi (tau = F x r) saat mengencangkan baut dengan kunci bergagang panjang, hukum Boyle dan tekanan udara pada tabung kompresor, perpindahan panas dan peleburan logam (metalurgi) oleh busur listrik pada mesin las, fungsi kimia oli pelumas untuk mengurangi gaya gesek dan keausan mesin, serta bahaya sinar UV/percikan api tanpa APD.',
          technology: 'Jelaskan Teknologi Peralatan yang digunakan: mesin las inverter hemat daya berbasis komponen elektronika IGBT, perkakas listrik putaran tinggi (power tools: gerinda, bor listrik, impact wrench baterai), kompresor otomatis ber-pressure switch, atau alat scanner injeksi/multimeter digital.',
          engineering: 'Jelaskan Rekayasa Teknik (Mechanical & Structural Engineering): proses troubleshooting (mencari sumber kerusakan mesin secara sistematis), rekayasa penyambungan rangka besi/kayu dengan sudut siku presisi agar konstruksi kuat menahan beban, serta penataan papan perkakas (tool rack) yang ergonomis.',
          mathematics: 'Jelaskan perhitungan Matematika Teknik di lapangan: ketelitian pengukuran dimensi bahan dalam satuan milimeter (mm), sentimeter, atau inci menggunakan meteran/jangka sorong, perhitungan sudut potong (45° atau 90°), rasio perbandingan campuran bahan (misal cat dengan tiner atau semen dengan pasir), serta estimasi waktu pengerjaan per unit.'
        }
      },
      day6: {
        focusTitle: 'Panduan Video Day 6: Analisis Financial, Evaluasi Kendala & Solusi Inovasi pada Sektor Jasa Teknik / Kerajinan',
        summaryFocus: 'Pada video Day 6 (durasi 5–10 menit), Anda menganalisis secara mandiri struktur biaya investasi alat, biaya bahan habis pakai/suku cadang, tarif jasa keahlian, kendala operasional/K3, serta gagasan inovasi layanan berbasis STEM & Finansial.',
        segments: [
          {
            time: '00:00 – 01:00',
            title: '1. Pembukaan & Kilas Balik Objek Jasa Teknik / Kerajinan',
            desc: 'Perkenalkan diri (Nama, NISN, Kelas, Fasilitator) dan sampaikan bahwa video Day 6 ini membedah analisis Finansial, Evaluasi Kendala, dan Solusi Inovasi pada usaha jasa teknik/bengkel/kerajinan yang diamati.'
          },
          {
            time: '01:00 – 03:30',
            title: '2. Analisis Pilar Financial (Modal Peralatan, Biaya Bahan/Suku Cadang, Tarif Jasa & Laba)',
            desc: 'Jelaskan di depan kamera perhitungan keuangan usaha jasa/kerajinan: investasi awal pembelian mesin/perkakas kerja (dan biaya penyusutan/perawatannya), biaya variabel bahan habis pakai (kawat las, mata gerinda, oli, suku cadang, kayu/besi, tagihan listrik), cara menentukan tarif ongkos jasa servis/harga jual produk, hingga estimasi pendapatan kotor dan Laba Bersih bulanan.'
          },
          {
            time: '03:30 – 06:00',
            title: '3. Evaluasi Kendala Teknis, Risiko Kecelakaan Kerja (K3) & Pemasaran',
            desc: 'Analisis kendala nyata yang dihadapi usaha tersebut: pemadaman listrik atau daya listrik tidak stabil saat mengelas/mengoperasikan mesin, keausan/kerusakan mata perkakas, kenaikan harga bahan baku besi/suku cadang, kurangnya kesadaran memakai APD lengkap (risiko sakit mata/terluka), atau fluktuasi jumlah pelanggan harian.'
          },
          {
            time: '06:00 – 08:30',
            title: '4. Gagasan Solusi & Inovasi Berbasis STEM + Finansial',
            desc: 'Paparkan gagasan solusi Anda: penerapan standar Keselamatan dan Kesehatan Kerja (K3) wajib dan penataan bengkel metode 5R (Ringkas, Rapi, Resik, Rawat, Rajin) agar kerja lebih cepat dan aman, daur ulang sisa potongan besi/kayu (scrap) menjadi produk kerajinan bernilai jual tambahan, pemberian garansi servis dan pengingat servis berkala via WhatsApp, serta pencatatan nota digital.'
          },
          {
            time: '08:30 – 10:00',
            title: '5. Kesimpulan Akhir & Penutup Video',
            desc: 'Simpulkan kelayakan finansial usaha jasa teknik/kerajinan tersebut dan bagaimana kombinasi keahlian STEM, disiplin K3, serta manajemen keuangan yang rapi dapat mengembangkan usaha, lalu tutup video.'
          }
        ],
        finPoints: {
          financial: 'Uraikan pemisahan antara harga modal suku cadang/bahan baku dengan pendapatan murni Ongkos Jasa Keahlian, perhitungan biaya listrik & perawatan alat (penyusutan), serta kalkulasi Laba Bersih bulanan.',
          constraints: 'Identifikasi masalah utama: risiko kecelakaan kerja akibat abai memakai APD (kacamata las/gerinda), penumpukan limbah sisa bahan/oli bekas, keterbatasan peralatan modern, atau pencatatan keuangan yang belum rapi.',
          innovation: 'Usulkan inovasi STEM-Finansial: tata kelola bengkel standar 5R & K3, pemanfaatan limbah potongan bahan menjadi produk kreatif bernilai ekonomis, katalog portofolio hasil karya/jasa di media sosial, serta sistem kartu pelanggan/pengingat servis.'
        }
      }
    }
  };

  window.NFT_VIDEO_SECTORS_GUIDE = NFT_VIDEO_SECTORS_GUIDE;

  // Render Modul Khusus Day 5 & Day 6: Panduan Interaktif Video 7 Sektor + Form Resume Rencana Video
  function renderDay5Or6VideoModule(container, dayNum) {
    dayNum = parseInt(dayNum) || 5;
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();

    let fasilName = '';
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
      const m = window.FincestemMentorship.getMentorsForStudent(cleanNisn, studentClass);
      if (m && m.facilitator && m.facilitator !== '-' && m.facilitator !== 'Belum Ditentukan') {
        fasilName = m.facilitator;
      }
    }
    if (!fasilName && window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator) {
      const sf = FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass);
      if (sf && sf !== 'Belum Ditentukan' && sf !== 'Tim Fasilitator SMAN 1 Belitang') fasilName = sf;
    }
    if (!fasilName && u.facilitator_name && u.facilitator_name !== 'Belum Ditentukan' && u.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang' && !u.facilitator_name.includes('\n')) {
      fasilName = u.facilitator_name;
    }
    if (!fasilName) fasilName = 'Tim Fasilitator SMAN 1 Belitang';

    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                     localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    if (!savedOfficial) {
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
            if (typeof c === 'object' && c) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = { day: dayNum, submitted: true, conclusion: c, summary: c };
            }
          }
        }
      } catch(eHyd) {}
    }

    let draft = {};
    try {
      const rawDraft = localStorage.getItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt || savedOfficial.conclusion || savedOfficial.summary));
    window[`isNftD${dayNum}Submitted`] = isSubmitted;

    // Deteksi sektor pilihan siswa (bisa dari Day 5/6, atau warisan dari Day 4/3)
    let selectedSector = 'pertanian';
    const candidateSec = (savedOfficial && savedOfficial.selectedSector) ||
                         (draft && draft.selectedSector) ||
                         localStorage.getItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
    if (candidateSec && NFT_VIDEO_SECTORS_GUIDE[candidateSec]) {
      selectedSector = candidateSec;
    }

    const secGuide = NFT_VIDEO_SECTORS_GUIDE[selectedSector] || NFT_VIDEO_SECTORS_GUIDE.pertanian;
    const dayGuide = (dayNum === 6) ? secGuide.day6 : secGuide.day5;

    const savedObjectName = (savedOfficial && savedOfficial.objectName) || (draft && draft.objectName) || '';
    const savedConclusion = (savedOfficial && (savedOfficial.userConclusion || savedOfficial.conclusion || savedOfficial.summary)) ||
                            (draft && draft.conclusion) || '';

    const isDay5 = (dayNum === 5);
    const headerGradient = isDay5
      ? 'from-amber-900 via-teal-950 to-slate-950 border-amber-600/40'
      : 'from-teal-900 via-indigo-950 to-slate-950 border-teal-600/40';
    const badgeColor = isDay5 ? 'bg-amber-400 text-slate-950' : 'bg-cyan-400 text-slate-950';

    const sectorKeys = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'perdagangan', 'keuangan', 'jasa'];

    container.innerHTML = `
      <div class="flex flex-col gap-5 pb-12 max-w-4xl mx-auto w-full">

        <!-- BANNER STATUS TERKIRIM JIKA SUDAH SUBMIT -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-emerald-800 tracking-wider">Modul Panduan Video Day ${dayNum} Tuntas</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Resume &amp; Rencana Video Day ${dayNum} Telah Tersimpan Resmi ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5 leading-relaxed">
                  Sektor Pilihan: <strong>${escapeHtml(secGuide.name)}</strong>. Anda tetap dapat membaca panduan urutan video di bawah ini atau langsung menuju LKPD Day ${dayNum} untuk mengumpulkan link YouTube.
                </p>
              </div>
            </div>
            <a href="lkpd.html?day=${dayNum}" class="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer transition-all">
              <span>Buka LKPD Day ${dayNum}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ` : ''}

        <!-- HEADER MODUL PANDUAN VIDEO DAY 5 / DAY 6 -->
        <div class="bg-gradient-to-br ${headerGradient} rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col gap-3.5 border">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-amber-200 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">smart_display</span>
                <span>Non-Field Trip • Modul Day ${dayNum}</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeColor}">
                ${isDay5 ? 'Video Observasi Lapangan & 4 Unsur STEM (5–10 Menit)' : 'Video Analisis Finansial, Risiko & Inovasi (5–10 Menit)'}
              </span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Modul Selesai' : 'Panduan Produksi Video YouTube'}
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              ${isDay5
                ? 'Modul Day 5: Panduan Pembuatan Video Observasi Culture, Exploration Alat & Penerapan STEM'
                : 'Modul Day 6: Panduan Pembuatan Video Analisis Financial, Evaluasi Kendala & Inovasi Solusi'}
            </h1>
            <p class="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-medium mt-1.5 text-justify">
              ${isDay5
                ? 'Pada Day 5 ini, Anda ditugaskan membuat video observasi lapangan berdurasi minimal 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube. Pilih salah satu dari 7 sektor usaha di bawah ini untuk memunculkan panduan urutan isi video menit demi menit!'
                : 'Pada Day 6 ini, Anda melanjutkan pembuatan video analisis berdurasi minimal 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube dengan fokus membedah perputaran modal/keuntungan (Financial), kendala usaha, dan solusi inovasi FINCESTEM pada sektor pilihan Anda.'}
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Nama Peserta Didik</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentName)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentNisn)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Kelas / Rombel</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(studentClass)}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-slate-300 text-[10px] font-medium">Guru Fasilitator</span>
              <span class="font-extrabold truncate text-white">${escapeHtml(fasilName)}</span>
            </div>
          </div>
        </div>

        <!-- ATURAN TEKNIS VIDEO YOUTUBE (5-10 MENIT, TANPA WAWANCARA) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-950 flex flex-col gap-2.5 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-900">
            <span class="material-symbols-outlined text-rose-600 text-lg">videocam</span>
            <span>KETENTUAN WAJIB PEMBUATAN VIDEO YOUTUBE DAY ${dayNum}:</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center shrink-0">5-10m</span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Durasi Minimal 5–10 Menit</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Rekam penjelasan secara utuh dan runtut mengikuti panduan menit ke menit.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-base">person_Check</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Tanpa Wawancara Narasumber</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Tidak perlu mewawancarai pemilik usaha. Anda sendiri yang menjelaskan &amp; menyorot objek/alat!</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-white border border-rose-200 flex items-start gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-base">cloud_upload</span>
              </span>
              <div class="text-xs">
                <strong class="text-slate-900 block">Upload ke YouTube</strong>
                <span class="text-slate-600 text-[11px] leading-snug">Setel visibilitas ke <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong>, lalu kirim link-nya di LKPD.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- LANGKAH 1: PILIH MENU SEKTOR USAHA (7 PILIHAN INTERAKTIF) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-500/50 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Pilih Sektor Objek Video Anda (Klik Salah Satu Menu):</h2>
                <p class="text-[11px] text-slate-500 font-medium">Begitu Anda memilih menu sektor di bawah ini, panduan urutan video dan materi bahasan akan otomatis menyesuaikan!</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-300">
              Terpilih: ${escapeHtml(secGuide.shortName)}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            ${sectorKeys.map(k => {
              const s = NFT_VIDEO_SECTORS_GUIDE[k];
              const isAct = (k === selectedSector);
              return `
                <button type="button" onclick="selectNftVideoSector(${dayNum}, '${k}')" class="text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${isAct ? 'bg-teal-50/70 border-teal-600 ring-2 ring-teal-500/30 shadow-md' : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50/60'}">
                  <div class="flex items-center justify-between gap-1.5 w-full">
                    <span class="w-9 h-9 rounded-xl ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-xl">${s.icon}</span>
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}">${isAct ? '✓ Aktif' : 'Pilih'}</span>
                  </div>
                  <div>
                    <div class="font-black text-xs sm:text-sm text-slate-900 leading-tight">${s.shortName}</div>
                    <div class="text-[10.5px] text-slate-500 font-medium mt-0.5 line-clamp-1">${s.badge}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <div class="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-teal-700 text-lg shrink-0 mt-0.5">location_on</span>
            <div>
              <strong class="font-black">Contoh Objek / Tempat yang Bisa Direkam pada Sektor ${escapeHtml(secGuide.name)}:</strong>
              <p class="text-teal-900/90 mt-0.5 leading-relaxed">${escapeHtml(secGuide.objectExamples)}</p>
            </div>
          </div>
        </div>

        <!-- LANGKAH 2: PANDUAN URUTAN ISI VIDEO (STORYBOARD MENIT KE MENIT SESUAI SEKTOR) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-400/70 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">2</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">${escapeHtml(dayGuide.focusTitle)}</h2>
                <p class="text-[11px] text-slate-600 font-medium">Ikuti urutan langkah menit demi menit berikut saat Anda berbicara dan mengambil gambar di lapangan:</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300">
              Durasi Total: 5 – 10 Menit
            </span>
          </div>

          <p class="text-xs text-slate-700 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 leading-relaxed font-medium text-justify">
            💡 <strong>Intisari Tugas Video Day ${dayNum}:</strong> ${escapeHtml(dayGuide.summaryFocus)}
          </p>

          <!-- Daftar Segmen Menit ke Menit -->
          <div class="grid grid-cols-1 gap-3">
            ${dayGuide.segments.map((seg, idx) => `
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-start gap-3 hover:border-amber-400 transition-all">
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono font-black text-xs shrink-0 self-start flex items-center gap-1.5 shadow-2xs">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>${escapeHtml(seg.time)}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-black text-xs sm:text-sm text-slate-900">${escapeHtml(seg.title)}</h4>
                  <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">${escapeHtml(seg.desc)}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Rincian Materi Spesifik Sektor yang Harus Dijelaskan di Dalam Video -->
          ${isDay5 ? `
            <div class="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">science</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">ConTek / Panduan Materi 4 Unsur STEM Sektor ${escapeHtml(secGuide.shortName)} (Untuk Dijelaskan pada Menit 03:45 – 06:30):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                  <div class="font-black text-sky-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-sky-600 text-white flex items-center justify-center text-[11px]">S</span>
                    <span>SCIENCE (Sains — Fisika, Kimia, Biologi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.science)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
                  <div class="font-black text-teal-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[11px]">T</span>
                    <span>TECHNOLOGY (Teknologi Alat &amp; Digital)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.technology)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <div class="font-black text-amber-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px]">E</span>
                    <span>ENGINEERING (Rekayasa Desain &amp; Konstruksi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.engineering)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <div class="font-black text-purple-950 flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[11px]">M</span>
                    <span>MATHEMATICS (Kalkulasi &amp; Efisiensi)</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.stemPoints.mathematics)}</p>
                </div>
              </div>
            </div>
          ` : `
            <div class="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-700 text-lg">payments</span>
                <h3 class="font-black text-xs sm:text-sm text-slate-900">ConTek / Panduan Materi Analisis Finansial &amp; Inovasi Sektor ${escapeHtml(secGuide.shortName)} (Untuk Dijelaskan di Video Day 6):</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div class="font-black text-emerald-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-emerald-700">account_balance_wallet</span>
                    <span>1. Analisis Pilar Financial</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.financial)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                  <div class="font-black text-rose-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-rose-700">warning</span>
                    <span>2. Evaluasi Kendala &amp; Risiko</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.constraints)}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <div class="font-black text-indigo-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-indigo-700">lightbulb</span>
                    <span>3. Solusi &amp; Inovasi FINCESTEM</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed text-[11.5px] text-justify">${escapeHtml(dayGuide.finPoints.innovation)}</p>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- LANGKAH 3: FORM RESUME & RENCANA ALUR VIDEO SISWA (SYARAT MEMBUKA LKPD) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-black text-sm shadow-xs">3</span>
              <div>
                <h2 class="font-black text-sm sm:text-base text-slate-900">Isi Resume &amp; Rencana Video Day ${dayNum} Anda</h2>
                <p class="text-[11px] text-slate-500 font-medium">Tuliskan objek yang akan Anda rekam beserta ringkasan poin penjelasan Anda untuk membuka LKPD Day ${dayNum}.</p>
              </div>
            </div>
            <span id="badgeVideoModStatusD${dayNum}" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black ${isSubmitted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
              ${isSubmitted ? '✓ Tersimpan Resmi' : 'Wajib Diisi'}
            </span>
          </div>

          <input type="hidden" id="nftVideoModSectorD${dayNum}" value="${escapeHtml(selectedSector)}">

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-800">
              Nama Objek / Tempat Usaha pada Sektor ${escapeHtml(secGuide.shortName)} yang Akan/Telah Anda Rekam: <span class="text-rose-600">*</span>
            </label>
            <input type="text" id="nftVideoModObjectD${dayNum}" value="${escapeHtml(savedObjectName)}" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="Contoh: ${escapeHtml(secGuide.objectExamples.split(',')[0])} di Desa ..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">
          </div>

          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <label class="text-xs font-bold text-slate-800">
                ${isDay5
                  ? 'Resume Rencana Alur Video Day 5 (Peralatan yang Disorot & Poin Science, Technology, Engineering, Mathematics yang Dijelaskan):'
                  : 'Resume Rencana Alur Video Day 6 (Rincian Modal/Laba Financial, Kendala Usaha & Ide Solusi Inovasi yang Dijelaskan):'} <span class="text-rose-600">*</span>
              </label>
              <span id="counterVideoModD${dayNum}" class="text-[11px] font-bold text-slate-500">Min. 80 karakter</span>
            </div>
            <textarea id="nftVideoModResumeD${dayNum}" rows="5" ${isSubmitted ? 'readonly' : ''} oninput="onNftVideoModInput(${dayNum})" placeholder="${isDay5
              ? 'Tuliskan ringkasan rencana isi video Day 5 Anda: peralatan apa saja yang akan Anda tunjukkan di kamera, serta apa poin Sains, Teknologi, Rekayasa (Engineering), dan Matematika yang akan Anda jelaskan pada sektor ' + secGuide.shortName + '... (Minimal 80 karakter)'
              : 'Tuliskan ringkasan rencana isi video Day 6 Anda: bagaimana gambaran modal, biaya operasional, dan keuntungan usaha tersebut, apa kendala utamanya, serta apa ide inovasi STEM & Finansial yang Anda tawarkan... (Minimal 80 karakter)'}" class="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm leading-relaxed focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none ${isSubmitted ? 'bg-slate-50 text-slate-700' : 'bg-white'}">${escapeHtml(savedConclusion)}</textarea>
            <span id="msgVideoModValidationD${dayNum}" class="text-[11px] text-slate-500 font-medium">Minimal 80 karakter (sekitar 15–20 kata).</span>
          </div>

          ${isSubmitted ? `
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button type="button" onclick="enableEditNftVideoMod(${dayNum})" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                <span class="material-symbols-outlined text-sm">edit</span>
                <span>Ubah Sektor / Edit Resume Modul</span>
              </button>
              <a href="lkpd.html?day=${dayNum}" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all">
                <span class="material-symbols-outlined text-base">smart_display</span>
                <span>Lanjut ke LKPD Day ${dayNum} (Kirim Link YouTube)</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          ` : `
            <div class="pt-2">
              <button type="button" id="btnSubmitVideoModD${dayNum}" onclick="submitNftVideoModule(${dayNum})" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all">
                <span class="material-symbols-outlined text-lg">check_circle</span>
                <span>Simpan Resume Modul Day ${dayNum} &amp; Lanjut ke LKPD</span>
              </button>
            </div>
          `}
        </div>

      </div>
    `;

    setTimeout(() => {
      updateNftVideoModCounter(dayNum);
    }, 40);
  }

  function updateNftVideoModCounter(dayNum) {
    const resumeEl = document.getElementById(`nftVideoModResumeD${dayNum}`);
    const cntEl = document.getElementById(`counterVideoModD${dayNum}`);
    const msgEl = document.getElementById(`msgVideoModValidationD${dayNum}`);
    if (!resumeEl) return;
    const len = resumeEl.value.trim().length;
    if (cntEl) {
      cntEl.textContent = len >= 80 ? `✓ ${len} / 80 karakter` : `${len} / 80 karakter`;
      cntEl.className = len >= 80 ? 'text-[11px] font-black text-emerald-700' : 'text-[11px] font-bold text-slate-500';
    }
    if (msgEl) {
      if (len >= 80) {
        msgEl.textContent = '✓ Resume rencana video telah memenuhi batas minimal karakter.';
        msgEl.className = 'text-[11px] text-emerald-700 font-bold';
      } else {
        msgEl.textContent = len === 0
          ? 'Wajib diisi minimal 80 karakter sebelum lanjut ke LKPD.'
          : `Kurang ${80 - len} karakter lagi (Minimal 80 karakter).`;
        msgEl.className = 'text-[11px] text-rose-600 font-semibold';
      }
    }
  }

  window.onNftVideoModInput = function(dayNum) {
    updateNftVideoModCounter(dayNum);
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return;
      const sectorKey = (document.getElementById(`nftVideoModSectorD${dayNum}`) ? document.getElementById(`nftVideoModSectorD${dayNum}`).value : '') || 'pertanian';
      const objectName = (document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '';
      const conclusion = (document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '';
      localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
        day: dayNum,
        selectedSector: sectorKey,
        objectName: objectName,
        conclusion: conclusion,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {}
  };

  window.selectNftVideoSector = function(dayNum, sectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const objVal = (document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '';
    const resVal = (document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '';

    try {
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, sectorKey);
      localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
        day: dayNum,
        selectedSector: sectorKey,
        objectName: objVal,
        conclusion: resVal,
        updatedAt: new Date().toISOString()
      }));
      // Jika sudah pernah submit, perbarui juga pilihan sektor di record tersimpan agar tampilan langsung berubah
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      if (rawOff) {
        const parsed = JSON.parse(rawOff);
        parsed.selectedSector = sectorKey;
        localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(parsed));
      }
    } catch (e) {}

    const sGuide = NFT_VIDEO_SECTORS_GUIDE[sectorKey] || NFT_VIDEO_SECTORS_GUIDE.pertanian;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast(`Panduan Video Day ${dayNum} disesuaikan ke sektor: ${sGuide.name}`, 'info');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
  };

  window.enableEditNftVideoMod = function(dayNum) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    try {
      const rawOff = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      if (rawOff) {
        const parsed = JSON.parse(rawOff);
        localStorage.setItem(`fincestem_draft_nft_materi_d${dayNum}_` + cleanNisn, JSON.stringify({
          day: dayNum,
          selectedSector: parsed.selectedSector || 'pertanian',
          objectName: parsed.objectName || '',
          conclusion: parsed.userConclusion || parsed.conclusion || ''
        }));
        delete parsed.submitted;
        delete parsed.submittedAt;
        localStorage.removeItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn);
      }
    } catch (e) {}
    window[`isNftD${dayNum}Submitted`] = false;
    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
  };

  window.submitNftVideoModule = function(dayNum) {
    dayNum = parseInt(dayNum) || 5;
    const sectorKey = (document.getElementById(`nftVideoModSectorD${dayNum}`) ? document.getElementById(`nftVideoModSectorD${dayNum}`).value : '') || 'pertanian';
    const objectName = ((document.getElementById(`nftVideoModObjectD${dayNum}`) ? document.getElementById(`nftVideoModObjectD${dayNum}`).value : '') || '').trim();
    const resumeText = ((document.getElementById(`nftVideoModResumeD${dayNum}`) ? document.getElementById(`nftVideoModResumeD${dayNum}`).value : '') || '').trim();

    if (objectName.length < 3) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Tuliskan nama objek atau tempat usaha yang akan Anda rekam (minimal 3 karakter)!', 'warning');
      } else {
        alert('Tuliskan nama objek atau tempat usaha yang akan Anda rekam!');
      }
      var _fEl1 = document.getElementById(`nftVideoModObjectD${dayNum}`); if (_fEl1) _fEl1.focus();
      return;
    }

    if (resumeText.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Resume rencana video Day ${dayNum} minimal 80 karakter (saat ini ${resumeText.length} karakter).`, 'warning');
      } else {
        alert(`Resume rencana video Day ${dayNum} minimal 80 karakter!`);
      }
      var _fEl2 = document.getElementById(`nftVideoModResumeD${dayNum}`); if (_fEl2) _fEl2.focus();
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    const secGuide = NFT_VIDEO_SECTORS_GUIDE[sectorKey] || NFT_VIDEO_SECTORS_GUIDE.pertanian;

    const summaryFull = `[Modul Video Day ${dayNum} - ${secGuide.name}] Objek: ${objectName} | Rencana Alur Video: ${resumeText}`;
    const nowIso = new Date().toISOString();

    const payload = {
      day: dayNum,
      isVideoModule: true,
      selectedSector: sectorKey,
      sectorName: secGuide.name,
      objectName: objectName,
      userConclusion: resumeText,
      conclusion: summaryFull,
      summary: summaryFull,
      submitted: true,
      submittedAt: nowIso,
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      cardA: {
        title: `Rencana Video Day ${dayNum} (${secGuide.shortName}): ${objectName}`,
        text: resumeText,
        source: `Observasi Lapangan Mandiri Sektor ${secGuide.name} - Kabupaten OKU Timur`
      }
    };

    try {
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, sectorKey);
      localStorage.setItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn, JSON.stringify(payload));
      localStorage.setItem(`fincestem_materi_day${dayNum}_` + cleanNisn, JSON.stringify(payload));
      localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + cleanNisn, JSON.stringify({ conclusion: summaryFull, savedAt: nowIso }));
    } catch (e) {}

    window[`isNftD${dayNum}Submitted`] = true;

    const onDone = function() {
      showSuccessNftMateriModalUnified(dayNum);
      const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
      if (mainEl) renderDay5Or6VideoModule(mainEl, dayNum);
    };

    if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'materi', payload, function() {
        onDone();
      });
    } else {
      onDone();
    }
  };


  // 7. EKSPOR FUNGSI KE WINDOW GLOBAL (SEMUA HARI DAY 0 S.D. DAY 7)
  window.selectDay3Sector = function(sectorKey) {
    if (window[`isNftD3Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, sectorKey);

    const cfg3 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[3]) || {};
    const secName = (cfg3.sectors && cfg3.sectors[sectorKey]) ? cfg3.sectors[sectorKey].name : sectorKey;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor riset Day 3 diubah ke: ' + secName + '. Kartu panduan STEM telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 3);
    }
  };

  window.selectDay4Sector = function(sectorKey) {
    if (window[`isNftD4Submitted`]) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Sektor ini telah dikirim resmi bersama laporan riset Day 4 Anda.', 'info');
      }
      return;
    }
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    localStorage.setItem('fincestem_nft_sector_d4_' + cleanNisn, sectorKey);

    const cfg4 = (window.NFT_MATERI_CONFIG && window.NFT_MATERI_CONFIG[4]) || {};
    const secName = (cfg4.sectors && cfg4.sectors[sectorKey]) ? cfg4.sectors[sectorKey].name : sectorKey;
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast('Sektor eksplorasi peralatan Day 4 diubah ke: ' + secName + '. Kartu analisis STEM telah disesuaikan!', 'success');
    }

    const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
    if (mainEl && typeof renderNonFieldTripDayModule === 'function') {
      renderNonFieldTripDayModule(mainEl, 4);
    }
  };

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
  window.NFT_MATERI_CONFIG = NFT_MATERI_CONFIG;

})(window);
