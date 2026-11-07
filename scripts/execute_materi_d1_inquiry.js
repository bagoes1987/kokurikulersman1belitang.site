// scripts/execute_materi_d1_inquiry.js
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let code = fs.readFileSync(targetFile, 'utf8');

console.log('Target file length before:', code.length);

// 1. Perbarui konfigurasi Day 1 di NFT_MATERI_CONFIG
const newDay1Config = `    1: {
      dayNum: 1,
      title: 'Modul Riset Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur',
      theme: 'Pilar Financial & Economics',
      gradientClass: 'from-teal-800 via-teal-900 to-slate-950 border-teal-700/40',
      tagColorClass: 'bg-white/20 text-teal-100',
      badgeColorClass: 'bg-amber-400 text-amber-950',
      subtitle: 'Penelusuran Mandiri: Hakikat Kegiatan Ekonomi, Literasi Finansial, Kebanksentralan Bank Indonesia, Badan Usaha & Koperasi, serta Pemetaan Sektor Ekonomi Unggulan Daerah OKU Timur',
      inquiryIntro: 'Sebagai peserta <strong>Non-Field Trip</strong>, Anda tidak disajikan teks materi siap saji di layar. Anda <strong>diwajibkan meneliti dan mencari materi sendiri</strong> dari berbagai sumber (buku teks ekonomi kurikulum merdeka, modul literasi keuangan OJK, website Bank Indonesia, undang-undang perkoperasian, maupun data BPS OKU Timur). Jawablah pertanyaan pada setiap kolom jawaban dan cantumkan sumber rujukan yang Anda temukan (dapat lebih dari 1 sumber).',
      cards: [
        {
          key: 'A',
          title: 'A. Kegiatan Ekonomi',
          subtitle: 'Produksi, Distribusi, Konsumsi & Tiga Sektor Aktivitas Ekonomi',
          taskInstruction: 'Sebutkan pengertian dan berikan contoh:',
          items: [
            '1. Pengertian kegiatan ekonomi',
            '2. Produksi, distribusi, dan konsumsi',
            '3. Sektor utama aktivitas ekonomi:\\n   - Sektor primer\\n   - Sektor sekunder\\n   - Sektor tersier'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan berikan contoh:\\n1. Pengertian kegiatan ekonomi\\n2. Produksi, distribusi, dan konsumsi\\n3. Sektor utama aktivitas ekonomi:\\n   - Sektor primer\\n   - Sektor sekunder\\n   - Sektor tersier'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh kegiatan ekonomi, alur produksi-distribusi-konsumsi, serta sektor primer, sekunder, dan tersier di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\n1. Contoh: Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 15-22',
          defaultExp: 'Kajian komprehensif mengenai kegiatan ekonomi menegaskan bahwa aktivitas pemenuhan kebutuhan manusia tersusun atas rantai nilai organik produksi, distribusi, dan konsumsi. Di Kabupaten OKU Timur, keterpaduan tiga sektor tampak nyata: sektor primer (pertanian padi sawah beririgasi Belitang, perkebunan karet, dan peternakan sapi) berperan sebagai penyedia bahan mentah; sektor sekunder (industri penggilingan padi RMU dan olahan pangan) mengolah bahan mentah menjadi komoditas beras kemasan bernilai tambah tinggi; sedangkan sektor tersier (pasar grosir Gumawang, jasa logistik angkutan truk, dan jaringan perbankan/BRILink) menjamin kelancaran arus barang dan uang hingga ke konsumen akhir secara berkelanjutan.',
          defaultSources: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Kegiatan Ekonomi.'
        },
        {
          key: 'B',
          title: 'B. Literasi dan Pengelolaan Keuangan (Financial Literacy)',
          subtitle: 'Empat Jenis Finansial & Lima Aspek Pengelolaan Keuangan',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Jenis-jenis finansial:\\n   - Keuangan pribadi (personal finance)\\n   - Keuangan bisnis (business finance)\\n   - Keuangan publik (public finance)\\n   - Keuangan internasional (international finance)',
            '2. Aspek pengelolaan keuangan:\\n   - Pemasukan dan pengeluaran\\n   - Anggaran dan tabungan\\n   - Dana darurat\\n   - Investasi\\n   - Pengelolaan keuangan'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\\n1. Jenis-jenis finansial:\\n   - Keuangan pribadi (personal finance)\\n   - Keuangan bisnis (business finance)\\n   - Keuangan publik (public finance)\\n   - Keuangan internasional (international finance)\\n2. Aspek pengelolaan keuangan:\\n   - Pemasukan dan pengeluaran\\n   - Anggaran dan tabungan\\n   - Dana darurat\\n   - Investasi\\n   - Pengelolaan keuangan'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh 4 jenis finansial serta 5 aspek pengelolaan keuangan di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\n1. Contoh: Buku Saku Literasi Keuangan, Otoritas Jasa Keuangan (OJK RI)',
          defaultExp: 'Literasi keuangan merupakan kecakapan hidup mendasar yang mencakup pemahaman empat jenis finansial: keuangan pribadi (tata kelola uang individu/keluarga), keuangan bisnis (manajemen modal kerja UMKM tanpa mencampur kas pribadi), keuangan publik (alokasi APBD OKU Timur bagi infrastruktur irigasi), dan keuangan internasional (transaksi ekspor karet/sawit dan fluktuasi valas). Dalam tataran praktis, tata kelola keuangan bertumpu pada lima aspek utama: disiplin mencatat pemasukan-pengeluaran agar surplus kas, menyusun anggaran 50/30/20 dan menabung di awal, menyiapkan dana darurat 3-6 bulan pengeluaran untuk antisipasi risiko, berinvestasi pada instrumen legal berizin OJK, serta mengelola pinjaman produktif dengan rasio cicilan di bawah 30% seraya menjauhi pinjol ilegal dan rentenir.',
          defaultSources: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, Otoritas Jasa Keuangan (OJK RI).'
        },
        {
          key: 'C',
          title: 'C. Kebanksentralan',
          subtitle: 'Tugas, Fungsi Bank Sentral, Bank Indonesia & Stabilitas Rupiah',
          taskInstruction: 'Sebutkan dan berikan contoh:',
          items: [
            '1. Pengertian kebanksentralan',
            '2. Tugas dan fungsi utama bank sentral',
            '3. Mengenal Bank Indonesia',
            '4. Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah'
          ],
          guidedPoints: [
            'Sebutkan dan berikan contoh:\\n1. Pengertian kebanksentralan\\n2. Tugas dan fungsi utama bank sentral\\n3. Mengenal Bank Indonesia\\n4. Peran Bank Indonesia dalam sistem pembayaran dan stabilitas rupiah'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian kebanksentralan, tugas bank sentral, kedudukan Bank Indonesia, serta sistem pembayaran (QRIS/BI-FAST) dan stabilitas rupiah di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\n1. Contoh: Publikasi Bank Indonesia (bi.go.id), Mengenal Bank Sentral dan Kebijakan Moneter',
          defaultExp: 'Kebanksentralan merupakan fungsi otoritas moneter independen yang bertugas menjaga kestabilan nilai mata uang dan kelancaran sistem keuangan tanpa berorientasi komersial. Di Indonesia, Bank Indonesia (BI) bertindak sebagai bank sentral berdasar UU No. 23 Tahun 1999 jo UU No. 4 Tahun 2023 (P2SK) dengan tujuan tunggal memelihara kestabilan nilai rupiah, baik terhadap harga barang (inflasi) maupun terhadap mata uang asing. Peran strategis BI diwujudkan melalui tiga pilar: pelaksanaan kebijakan moneter suku bunga BI-Rate, penjagaan stabilitas makroprudensial, serta pengaturan sistem pembayaran. Di Kabupaten OKU Timur, peran BI tampak nyata dalam pengedaran rupiah layak edar melalui edukasi Cinta Bangga Paham Rupiah, perluasan transaksi digital QRIS dan BI-FAST bagi pedagang UMKM pasar rakyat, serta pengendalian stabilitas harga pangan bersama Tim Pengendali Inflasi Daerah (TPID).',
          defaultSources: '1. Undang-Undang RI Nomor 23 Tahun 1999 jo UU No. 4 Tahun 2023 tentang Bank Indonesia (UU P2SK).'
        },
        {
          key: 'D',
          title: 'D. Badan Usaha dan Koperasi',
          subtitle: 'Badan Usaha di Indonesia, Prinsip Perkoperasian UU 25/1992 & Ekonomi Masyarakat',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Pengertian badan usaha',
            '2. Jenis-jenis badan usaha di Indonesia',
            '3. Pengertian koperasi',
            '4. Dasar hukum koperasi',
            '5. Kegiatan dan prinsip koperasi',
            '6. Peran koperasi dalam perekonomian masyarakat'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\\n1. Pengertian badan usaha\\n2. Jenis-jenis badan usaha di Indonesia\\n3. Pengertian koperasi\\n4. Dasar hukum koperasi\\n5. Kegiatan dan prinsip koperasi\\n6. Peran koperasi dalam perekonomian masyarakat'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran Anda mengenai pengertian dan contoh badan usaha di Indonesia, pengertian koperasi, landasan hukum UU 25/1992, prinsip koperasi, dan perannya bagi masyarakat di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan materi Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\n1. Contoh: Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian',
          defaultExp: 'Badan usaha merupakan kesatuan yuridis dan ekonomis faktor produksi yang berorientasi pada laba atau pelayanan masyarakat, yang terbagi atas BUMN, BUMD, BUMDes, BUMS, dan Koperasi. Koperasi menempati kedudukan istimewa dalam sistem ekonomi Indonesia sebagaimana diamanatkan Pasal 33 ayat (1) UUD 1945 dan diatur melalui UU No. 25 Tahun 1992 tentang Perkoperasian sebagai bangun usaha berlandaskan asas kekeluargaan dan gotong royong. Tujuh prinsip perkoperasian seperti keanggotaan sukarela terbuka, pengelolaan demokratis (one person one vote), dan pembagian SHU berkeadilan menjadi pembeda utama dari badan usaha permodalan murni. Di kawasan pedesaan OKU Timur, kelembagaan Koperasi Unit Desa (KUD) dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, menyediakan pinjaman modal usaha tani dengan bunga rendah, serta melindungi harga panen gabah petani dari eksploitasi tengkulak.',
          defaultSources: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.'
        },
        {
          key: 'E',
          title: 'E. Kegiatan dan Potensi Sektor Ekonomi OKU Timur',
          subtitle: 'Pertanian, Perkebunan, Peternakan, Perikanan, Perdagangan, UMKM & Produk Unggulan',
          taskInstruction: 'Sebutkan pengertian dan contoh:',
          items: [
            '1. Pertanian dan perkebunan',
            '2. Peternakan dan perikanan',
            '3. Perdagangan dan UMKM',
            '4. Persebaran potensi ekonomi di OKU Timur',
            '5. Identifikasi produk unggulan di OKU Timur'
          ],
          guidedPoints: [
            'Sebutkan pengertian dan contoh:\\n1. Pertanian dan perkebunan\\n2. Peternakan dan perikanan\\n3. Perdagangan dan UMKM\\n4. Persebaran potensi ekonomi di OKU Timur\\n5. Identifikasi produk unggulan di OKU Timur'
          ],
          placeholder: 'Ketikkan jawaban hasil penelusuran data daerah Anda mengenai potensi pertanian, perkebunan, peternakan, perikanan, perdagangan, UMKM, persebaran wilayah, dan produk unggulan OKU Timur di sini... (Minimal 300 karakter)',
          sourcePlaceholder: 'Tuliskan sumber rujukan data Anda (Bisa lebih dari 1 sumber, tekan tombol \"+ Tambah Sumber Rujukan Lain\"):\n1. Contoh: Badan Pusat Statistik (BPS) Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka',
          defaultExp: 'Kabupaten Ogan Komering Ulu Timur (OKU Timur) memiliki keunggulan komparatif mutlak sebagai lumbung pangan utama Provinsi Sumatera Selatan berkat jaringan Daerah Irigasi Komering Bendung Perjaya (BK 0 s.d. BK 32) yang menopang sawah teknis berpola tanam IP 200-300 dengan produktivitas 6-7 ton/Ha, disandingkan perkebunan karet bokar dan kelapa sawit rakyat. Sektor peternakan sapi terintegrasi limbah jerami padi serta budidaya ikan patin dan lele air tawar menjadikan OKU Timur sebagai sentra pasokan protein hewani regional. Denyut ekonomi terdistribusi dinamis melalui Pasar Gumawang Belitang, ribuan UMKM kilang beras RMU dan hilirisasi pangan olahan, serta jejaring Agen BRILink di setiap desa. Secara spasial, potensi daerah terbagi atas Zona Irigasi Belitang Raya (padi dan patin), Zona Madang Suku dan Semendawai (perkebunan karet/sawit dan sapi), serta Zona Martapura (transit perdagangan dan pemerintahan). Lima produk unggulan utamanya adalah Beras Premium Belitang, Bokar Karet Bersih, TBS Kelapa Sawit, Ikan Patin/Olahan Abon, serta Daging Sapi dan Telur Bebek Asin.',
          defaultSources: '1. Badan Pusat Statistik (BPS) Kabupaten OKU Timur: Publikasi OKU Timur Dalam Angka.'
        }
      ]
    },`;

// Ganti konfigurasi Day 1 di NFT_MATERI_CONFIG
const regexD1 = /1:\s*\{[\s\S]*?theme:\s*'Pilar Financial & Economics'[\s\S]*?cards:\s*\[[\s\S]*?key:\s*'E'[\s\S]*?\}\s*\]\s*\},/m;
code = code.replace(regexD1, newDay1Config);
console.log('BERHASIL mengganti konfigurasi Day 1.');

// Hapus fungsi loadDefaultNftSynthesis jika ada
code = code.replace(/\s*\/\/ Helper Memuat Rangkuman Intisari Otomatis ke Kartu Siswa[\s\S]*?window\.loadDefaultNftSynthesis\s*=\s*function[\s\S]*?\};\n/g, '\n');

// 2. Perbarui blok kartu di template renderNonFieldTripDayModule agar bersih dan fokus pada Arahan, Jawaban, dan Sumber (>1 sumber)
const oldCardSearch = /<div id="cardBoxD\${dayNum}_\${k}"[\s\S]*?<!-- Panduan Poin Riset[\s\S]*?<!-- Kolom Esai Analisis Siswa[\s\S]*?<!-- Kolom Sumber Rujukan[\s\S]*?<\/div>\s*<\/div>\s*`;/m;

const newCardTemplate = `<div id="cardBoxD\${dayNum}_\${k}" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
                
                <!-- HEADER IDENTITAS KARTU -->
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">\${k}</span>
                    <div>
                      <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">\${c.title}</h3>
                      <span class="text-[11px] text-slate-500 font-medium">\${c.subtitle}</span>
                    </div>
                  </div>
                  <span id="badgeCardStatusD\${dayNum}_\${k}" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
                </div>

                <!-- 1. KOTAK ARAHAN TUGAS PENCARIAN MATERI SISWA -->
                <div class="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs text-amber-950 flex flex-col gap-2 shadow-2xs">
                  <div class="flex items-center gap-2 font-black text-amber-900 text-xs sm:text-sm">
                    <span class="material-symbols-outlined text-amber-700 text-base">travel_explore</span>
                    <span>Arahan Tugas Pencarian Materi Siswa:</span>
                  </div>
                  <div class="font-black text-amber-950 text-xs pl-1">
                    \${c.taskInstruction || 'Sebutkan pengertian dan berikan contoh:'}
                  </div>
                  <div class="space-y-1.5 text-xs text-slate-800 font-semibold leading-relaxed pl-1">
                    \${(c.items || c.guidedPoints).map(it => \`<div class="whitespace-pre-line">\${it}</div>\`).join('')}
                  </div>
                </div>

                <!-- 2. KOLOM UNTUK MENJAWAB HASIL PENCARIAN -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">edit_note</span>
                    <span>Kolom Jawaban Hasil Pencarian Anda:</span>
                  </label>
                  <textarea id="nftD\${dayNum}Text\${k}" rows="7" \${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(\${dayNum}, '\${k}')" placeholder="\${c.placeholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify \${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">\${dataK.text || ''}</textarea>
                  <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                    <span id="msgValidationD\${dayNum}_\${k}" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                    <span id="counterD\${dayNum}_\${k}" class="text-slate-400 font-bold">0 / 300</span>
                  </div>
                </div>

                <!-- 3. KOLOM UNTUK MENJAWAB SUMBER RUJUKAN (BISA LEBIH DARI 1 SUMBER) -->
                <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                      <span>Sumber Rujukan Materi (Buku / Modul / Website / Jurnal):</span>
                    </label>
                    \${!isSubmitted ? \`
                      <button type="button" onclick="appendNextSourceForDay(\${dayNum}, '\${k}')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                        <span class="material-symbols-outlined text-xs">add_circle</span>
                        <span>+ Tambah Sumber Rujukan Lain</span>
                      </button>
                    \` : ''}
                  </div>
                  <textarea id="nftD\${dayNum}Source\${k}" rows="2" \${isSubmitted ? 'readonly' : ''} oninput="onNftCardInputUnified(\${dayNum}, '\${k}')" placeholder="\${c.sourcePlaceholder}" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all text-justify \${isSubmitted ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">\${dataK.source || ''}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgSourceD\${dayNum}_\${k}" class="text-slate-400 font-medium">Cantumkan judul buku/modul/link yang Anda jadikan rujukan. Tekan tombol \"+ Tambah Sumber Rujukan Lain\" jika menggunakan lebih dari 1 sumber.</span>
                  </div>
                </div>
              </div>
            \`;`;

// Cari posisi render template kartu
const templateStart = code.indexOf('${activeCards.map(c => {');
const templateEnd = code.indexOf('}).join(\'\')}', templateStart);

if (templateStart !== -1 && templateEnd !== -1) {
  const currentBlock = code.substring(templateStart, templateEnd + 12);
  const replacementBlock = `\${activeCards.map(c => {
            const k = c.key;
            const dataK = cardDataMap[k] || { text: '', source: '' };
            return ` + newCardTemplate + `
          }).join('')}`;
  
  code = code.substring(0, templateStart) + replacementBlock + code.substring(templateEnd + 12);
  console.log('BERHASIL mengganti template perenderan kartu.');
} else {
  console.error('GAGAL menemukan posisi template kartu!');
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log('File materi-nonfieldtrip.js updated successfully. Length now:', code.length);
