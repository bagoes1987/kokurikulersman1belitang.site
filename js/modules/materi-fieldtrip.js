/**
 * FINCESTEM 2026 - Modul Belajar Digital Khusus Peserta Field Trip
 * Day 1 s.d. Day 7 (AKPOL, Lawang Sewu, Bromo, Malang, Jogja, Drini, Bakpia)
 * Terpisah dari Modul Riset Sekolah (Non-Field Trip)
 * Versi: 20261018
 */
    // Helper Render Kartu Jadwal Itinerary Field Trip Resmi (Format Persis Sesuai Day 2, Warna Kondisi Lapangan & Ikon Representatif)
    function renderFieldTripScheduleCard(dayNum) {
      const ftCfg = (window.FincestemCore && FincestemCore.schedule && FincestemCore.schedule.getFieldTripDayConfig) 
        ? FincestemCore.schedule.getFieldTripDayConfig(dayNum) 
        : null;
      if (!ftCfg || !ftCfg.sessions || !ftCfg.sessions.length) return '';

      // Pemetaan gaya & warna sesuai kondisi nyata di lapangan (Field-Condition Palette)
      const getFieldStyle = (hl, defaultIcon) => {
        switch (hl) {
          case 'blue': // Akademi Kepolisian & Perguruan Tinggi (AKPOL, Kampus UGM/UNY)
            return {
              box: 'p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between font-bold text-blue-900 shadow-2xs',
              icon: defaultIcon || 'military_tech',
              iconColor: 'text-blue-600',
              timeColor: 'text-blue-700/90 font-semibold'
            };
          case 'amber': // Heritage, Budaya, Cagar Budaya, Sunrise & UMKM (Lawang Sewu, Sunrise Bromo, Malioboro, Pabrik Bakpia)
            return {
              box: 'p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between font-bold text-amber-950 shadow-2xs',
              icon: defaultIcon || 'account_balance',
              iconColor: 'text-amber-600',
              timeColor: 'text-amber-800/90 font-semibold'
            };
          case 'indigo': // Perjalanan Bus Antarkota & Tol Trans-Jawa / Tol Trans-Sumatera
            return {
              box: 'p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between font-bold text-indigo-900 shadow-2xs',
              icon: defaultIcon || 'directions_bus',
              iconColor: 'text-indigo-600',
              timeColor: 'text-indigo-700/90 font-semibold'
            };
          case 'emerald': // Agribisnis Perkebunan, Hotel Istirahat & Kepulangan Sekolah (Petik Apel, Hotel, SMAN 1 Belitang)
            return {
              box: 'p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between font-bold text-emerald-950 shadow-2xs',
              icon: defaultIcon || 'hotel',
              iconColor: 'text-emerald-600',
              timeColor: 'text-emerald-800/90 font-semibold'
            };
          case 'purple': // Sains Eksperimen & Candi Sejarah Megah (Jatim Park 1, Candi Prambanan)
            return {
              box: 'p-2.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between font-bold text-purple-950 shadow-2xs',
              icon: defaultIcon || 'science',
              iconColor: 'text-purple-600',
              timeColor: 'text-purple-800/90 font-semibold'
            };
          case 'teal': // Perairan, Penyeberangan Ferry & Wahana Air (Selat Sunda, Drini Park)
            return {
              box: 'p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between font-bold text-teal-950 shadow-2xs',
              icon: defaultIcon || 'directions_boat',
              iconColor: 'text-teal-600',
              timeColor: 'text-teal-800/90 font-semibold'
            };
          case 'cyan': // Pantai & Pesisir Samudra Selatan (Pantai Drini)
            return {
              box: 'p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-between font-bold text-cyan-950 shadow-2xs',
              icon: defaultIcon || 'beach_access',
              iconColor: 'text-cyan-600',
              timeColor: 'text-cyan-800/90 font-semibold'
            };
          case 'rose':
          case 'red': // Gunung Berapi Aktif, Kaldera & Kawah Belerang (Kawah Bromo)
            return {
              box: 'p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between font-bold text-rose-950 shadow-2xs',
              icon: defaultIcon || 'volcano',
              iconColor: 'text-rose-600',
              timeColor: 'text-rose-800/90 font-semibold'
            };
          case 'orange': // Momen Makan Bersama (Sarapan, Makan Siang, Makan Malam)
            return {
              box: 'p-2.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between font-bold text-orange-950 shadow-2xs',
              icon: defaultIcon || 'lunch_dining',
              iconColor: 'text-orange-600',
              timeColor: 'text-orange-800/90 font-semibold'
            };
          case 'lime': // Padang Rumput Alami & Savana (Savana Bromo)
            return {
              box: 'p-2.5 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-between font-bold text-lime-950 shadow-2xs',
              icon: defaultIcon || 'grass',
              iconColor: 'text-lime-700',
              timeColor: 'text-lime-800/90 font-semibold'
            };
          case 'yellow': // Hamparan Lautan Pasir Vulkanik (Pasir Berbisik)
            return {
              box: 'p-2.5 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-between font-bold text-yellow-950 shadow-2xs',
              icon: defaultIcon || 'grain',
              iconColor: 'text-yellow-600',
              timeColor: 'text-yellow-800/90 font-semibold'
            };
          case 'sky': // Rekayasa Transportasi & Koordinasi Rombongan (Museum Angkut, Persiapan)
            return {
              box: 'p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between font-bold text-sky-950 shadow-2xs',
              icon: defaultIcon || 'commute',
              iconColor: 'text-sky-600',
              timeColor: 'text-sky-800/90 font-semibold'
            };
          case 'stone': // Armada Jeep Offroad 4x4 Kaldera Bromo
            return {
              box: 'p-2.5 rounded-xl bg-stone-100 border border-stone-300 flex items-center justify-between font-bold text-stone-900 shadow-2xs',
              icon: defaultIcon || 'airport_shuttle',
              iconColor: 'text-stone-600',
              timeColor: 'text-stone-700 font-semibold'
            };
          case 'slate': // Transit Segar, Mandi & Rehat Rest Area
          default:
            return {
              box: 'p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center justify-between font-bold text-slate-800 shadow-2xs',
              icon: defaultIcon || 'schedule',
              iconColor: 'text-slate-500',
              timeColor: 'text-slate-600 font-semibold'
            };
        }
      };

      const itemsHtml = ftCfg.sessions.map((sess, idx) => {
        const style = getFieldStyle(sess.highlight, sess.icon);
        const iconName = sess.icon || style.icon;

        return `
          <div class="${style.box}">
            <span class="flex items-center gap-1.5 min-w-0 pr-2">
              <span class="material-symbols-outlined text-sm ${style.iconColor} shrink-0">${iconName}</span>
              <span class="truncate">${idx + 1}. ${sess.title}</span>
            </span>
            <span class="${style.timeColor} shrink-0 text-xs">${sess.time}</span>
          </div>
        `;
      }).join('');

      return `
        <!-- JADWAL ITINERARY CARD (MODEL RESMI PERSIS DAY 2) -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-indigo-900 font-extrabold text-sm sm:text-base">
              <span class="material-symbols-outlined text-lg text-indigo-600">event_note</span>
              <span>Jadwal Kegiatan Resmi Day ${dayNum}</span>
            </div>
            <span class="text-xs font-bold text-slate-500">${ftCfg.date_formatted}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            ${itemsHtml}
          </div>
        </div>
      `;
    }

    function renderDay1FieldTripModule(mainEl) {
      mainEl.innerHTML = `
        <!-- BANNER MODUL FIELD TRIP DAY 1 -->
        <div class="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
              Field Trip • Day 1
            </span>
            <span class="text-xs font-bold text-amber-200">Pilar 01: Financial</span>
          </div>
          <h2 class="font-black text-lg sm:text-xl leading-tight">
            Literasi Finansial: Manajemen Uang Saku &amp; Seni Mengatur Pengeluaran 7 Hari Ekspedisi
          </h2>
          <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
            Rute: <strong>Belitang &rarr; Tol Trans-Sumatera &rarr; Selat Sunda &rarr; Tol Trans-Jawa &rarr; Semarang</strong>. Fasilitas utama (bus eksekutif, tol, kapal ferry, hotel, makan 3x sehari, dan tiket wisata) telah ditanggung penuh oleh biro perjalanan. Modul ini membimbing Anda mengelola uang saku pribadi secara mandiri dan bertanggung jawab.
          </p>
        </div>

        ${renderFieldTripScheduleCard(1)}

        <!-- BAGIAN 1: MINDSET FINANSIAL -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center font-black text-base shrink-0">1</div>
            <h3 class="font-extrabold text-base text-on-surface">Mindset Finansial: Hari Pertama Bukan Ajang Boros</h3>
          </div>
          <p class="text-sm text-on-surface-variant leading-relaxed text-justify card-readable">
            Perjalanan 7 hari melintasi 5 kota (Semarang, Batu, Bromo, Yogyakarta) adalah perjalanan panjang. Godaan terbesar di Hari Pertama adalah rasa lapar mata (<em>impulse buying</em>) saat bus berhenti di rest area jalan tol atau saat berada di atas kapal ferry.
          </p>
          <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex flex-col gap-1 leading-relaxed text-justify">
            <strong>💡 Ingat Prinsip Utama:</strong>
            <span>Makan utama 3 kali sehari sudah disiapkan biro perjalanan. Uang saku yang Anda bawa bukan untuk membeli makanan berat tambahan, melainkan untuk bekal darurat, oleh-oleh keluarga, dan tabungan sisa.</span>
          </div>
        </div>

        <!-- BAGIAN 2: KEBUTUHAN VS KEINGINAN -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3.5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-700 flex items-center justify-center font-black text-base shrink-0">2</div>
            <h3 class="font-extrabold text-base text-on-surface">Hakikat Finansial: Kebutuhan (Needs) vs Keinginan (Wants)</h3>
          </div>

          <!-- Pengertian Konseptual -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div class="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 flex flex-col gap-1.5 shadow-2xs">
              <span class="font-black text-emerald-800 text-sm flex items-center gap-1.5">
                <span class="material-symbols-outlined text-lg text-emerald-600">verified</span>
                Pengertian Kebutuhan (Needs)
              </span>
              <p class="leading-relaxed text-emerald-900/90 text-xs text-justify card-readable">
                Segala hal <strong>esensial dan mutlak diperlukan</strong> untuk kelangsungan hidup, kesehatan jasmani, keselamatan diri, serta kelancaran proses belajar/tugas. Jika kebutuhan ini tidak terpenuhi, akan timbul dampak negatif fatal atau mengganggu aktivitas pokok (misalnya: sakit, dehidrasi, kelaparan, atau terisolasi komunikasi).
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-rose-50/90 border border-rose-200/90 text-rose-950 flex flex-col gap-1.5 shadow-2xs">
              <span class="font-black text-rose-800 text-sm flex items-center gap-1.5">
                <span class="material-symbols-outlined text-lg text-rose-600">do_not_disturb_on</span>
                Pengertian Keinginan (Wants)
              </span>
              <p class="leading-relaxed text-rose-900/90 text-xs text-justify card-readable">
                Segala hasrat, preferensi selera pribadi, atau dorongan emosional tambahan yang sifatnya <strong>memuaskan kesenangan sesaat, gengsi pergaulan, atau tren</strong>. Jika keinginan ini tidak terpenuhi, kelangsungan hidup, kesehatan, dan keberhasilan kegiatan belajar tetap berlangsung aman dan normal tanpa gangguan berarti.
              </p>
            </div>
          </div>

          <!-- Contoh Konkret Kehidupan Sehari-hari Pelajar -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <span class="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base text-blue-600">compare_arrows</span>
              Studi Kasus: Perbandingan Nyata dalam Kehidupan Sehari-hari Siswa
            </span>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 font-bold">
                    <th class="py-2 pr-3">Aspek Pengeluaran</th>
                    <th class="py-2 pr-3 text-emerald-700">Kebutuhan Siswa (Needs)</th>
                    <th class="py-2 text-rose-700">Keinginan Sesaat (Wants)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200/70 text-slate-700 font-medium">
                  <tr>
                    <td class="py-2.5 pr-3 font-bold text-slate-900">Makanan &amp; Minuman</td>
                    <td class="py-2.5 pr-3 text-emerald-900">Makan siang sehat bergizi di kantin sekolah untuk konsentrasi belajar.</td>
                    <td class="py-2.5 text-rose-900">Membeli es boba / kopi kekinian / jajanan viral setiap jam istirahat.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-3 font-bold text-slate-900">Koneksi Internet</td>
                    <td class="py-2.5 pr-3 text-emerald-900">Paket kuota internet pokok untuk riset tugas, modul sekolah, &amp; kabar orang tua.</td>
                    <td class="py-2.5 text-rose-900">Top-up diamond game online, skin karakter, atau kado virtual media sosial.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-3 font-bold text-slate-900">Alas Kaki / Pakaian</td>
                    <td class="py-2.5 pr-3 text-emerald-900">Sepatu sekolah standar hitam yang nyaman, ergonomis, dan tahan lama.</td>
                    <td class="py-2.5 text-rose-900">Membeli sneakers branded mahal edisi terbatas hanya demi gengsi di hadapan teman.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-3 font-bold text-slate-900">Alat Tulis &amp; Belajar</td>
                    <td class="py-2.5 pr-3 text-emerald-900">Buku catatan bergaris dan pulpen yang fungsional untuk mencatat materi.</td>
                    <td class="py-2.5 text-rose-900">Mengoleksi stationery estetik impor berlebih yang jarang dipakai.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Penerapan di Day 1 Field Trip -->
          <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex flex-col gap-1.5 leading-relaxed">
            <span class="font-bold text-amber-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base text-amber-700">directions_bus</span>
              Penerapannya Pada Day 1 Field Trip (Belitang &rarr; Semarang):
            </span>
            <ul class="list-disc list-inside space-y-1 text-xs text-amber-950/90 font-medium">
              <li><strong>Kebutuhan Riil di Jalan:</strong> Obat anti-mabuk perjalanan (Antimo/minyak angin), air mineral saat darurat haus di bus, dan kuota telepon untuk mengabarkan orang tua bahwa Anda selamat melintasi Selat Sunda.</li>
              <li><strong>Keinginan yang Wajib Dikendalikan:</strong> Membeli snack/camilan mahal berulang di minimarket rest area tol Trans-Jawa, membeli suvenir kapal ferry yang tidak berguna, atau membeli makanan cepat saji padahal waktu makan rombongan yang disiapkan biro perjalanan segera tiba.</li>
            </ul>
          </div>
        </div>

        <!-- BAGIAN 3: FORMULA 50 - 30 - 20 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-700 flex items-center justify-center font-black text-base shrink-0">3</div>
            <h3 class="font-extrabold text-base text-on-surface">Formula Alokasi Uang Saku: 50 - 30 - 20</h3>
          </div>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            Bagi uang saku yang Anda bawa ke dalam 3 kantong anggaran utama:
          </p>
          <div class="flex flex-col gap-2 text-xs sm:text-sm">
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-extrabold text-purple-900">50% Pos Oleh-Oleh Keluarga</span>
                <span class="text-xs text-on-surface-variant">Kunci untuk beli Apel di Batu (Day 3) &amp; Bakpia di Jogja (Day 6)</span>
              </div>
              <span class="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 font-black text-xs shrink-0">Prioritas 1</span>
            </div>
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-extrabold text-blue-900">30% Pos Jajan &amp; Kebutuhan Harian</span>
                <span class="text-xs text-on-surface-variant">Bagi rata Rp 20.000 - Rp 30.000 per hari untuk camilan santai</span>
              </div>
              <span class="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 font-black text-xs shrink-0">Prioritas 2</span>
            </div>
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-extrabold text-emerald-900">20% Pos Tabungan Sisa / Darurat</span>
                <span class="text-xs text-on-surface-variant">Wajib utuh disimpan untuk dibawa pulang kembali ke Belitang</span>
              </div>
              <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs shrink-0">Wajib Ada</span>
            </div>
          </div>
        </div>

        <!-- BAGIAN 4: TIPS AMAN -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center font-black text-base shrink-0">4</div>
            <h3 class="font-extrabold text-base text-on-surface">Tips Mengamankan Uang Selama Perjalanan</h3>
          </div>
          <ul class="list-disc list-inside text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-1.5 font-medium">
            <li>Pisahkan uang: simpan uang jajan harian di dompet/saku depan, dan simpan uang oleh-oleh di amplop terpisah di dalam tas ransel.</li>
            <li>Hindari memegang atau menghitung uang lembaran banyak di tempat umum atau keramaian pelabuhan.</li>
            <li>Lakukan evaluasi sisa uang setiap malam sebelum tidur untuk mencocokkan dengan rencana awal.</li>
          </ul>
        </div>

        <!-- BAGIAN 5: FORM KESIMPULAN WAJIB MODUL SEBELUM BUKA LKPD -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border-2 border-primary/20 shadow-md flex flex-col gap-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap border-b border-surface-container pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                <span class="material-symbols-outlined text-lg">draw</span>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-primary">Resume Pemahaman Modul Belajar</h3>
                <span class="text-xs text-slate-500 font-medium">Syarat Wajib untuk Membuka LKPD Day 1</span>
              </div>
            </div>
            <span id="ftMateriStatusBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Belum Mengisi Kesimpulan
            </span>
          </div>

          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-medium">
            Setelah mempelajari modul literasi finansial di atas, tuliskan resume/kesimpulan pemahaman Anda (minimal 15 kata). Jelaskan pemahaman Anda mengenai perbedaan <strong>Kebutuhan vs Keinginan</strong>, komitmen pembagian formula <strong>50-30-20</strong>, dan bagaimana cara Anda menahan godaan <em>impulse buying</em> di rest area/kapal ferry:
          </p>

          <div>
            <textarea id="ftMateriConclusion" rows="4" placeholder="Tuliskan kesimpulan pemahaman Anda di sini... (Contoh: Kebutuhan adalah hal esensial seperti obat dan kuota, sedangkan keinginan adalah jajan camilan berlebih yang harus ditahan. Saya berkomitmen menyisihkan 50% untuk oleh-oleh orang tua dan 20% cadangan darurat...)" class="w-full p-3.5 rounded-2xl border border-outline-variant/60 text-xs sm:text-sm leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"></textarea>
          </div>

          <div class="flex items-center justify-between gap-3 flex-wrap pt-1">
            <span id="ftMateriSavedTime" class="text-[11px] text-slate-500 italic">Belum disimpan</span>
            <button id="btnSaveMateriConclusion" type="button" onclick="saveMateriConclusion()" class="px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer">
              <span class="material-symbols-outlined text-lg">task_alt</span>
              <span id="btnSaveMateriText">Simpan Kesimpulan &amp; Buka LKPD</span>
            </button>
          </div>
        </div>

        <!-- KARTU AKSES LKPD (TERKUNCI / TERBUKA BERDASARKAN KESIMPULAN) -->
        <div id="ftLkpdAccessBox" class="bg-gradient-to-r from-[#006a61] to-teal-700 rounded-3xl p-5 text-white shadow-md flex flex-col gap-3 text-center sm:text-left transition-all">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div class="flex items-center justify-center sm:justify-start gap-2">
                <span id="ftLkpdLockIcon" class="material-symbols-outlined text-amber-300 text-xl">lock</span>
                <h4 id="ftLkpdLockTitle" class="font-black text-base">Tahap 2: LKPD Budgeting Day 1</h4>
              </div>
              <p id="ftLkpdLockDesc" class="text-xs text-teal-100 mt-0.5">Selesaikan dan simpan kesimpulan modul di atas terlebih dahulu untuk membuka akses LKPD.</p>
            </div>
            <a id="btnGoToLkpd" href="javascript:void(0)" onclick="handleGoToLkpd()" class="px-5 py-3 rounded-2xl bg-white/40 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60">
              <span id="btnGoToLkpdText">LKPD Terkunci</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- Copyright Footer -->
        <div class="text-center pt-2 pb-4">
          <p class="font-label-sm text-label-sm text-outline text-xs">
            &copy; 2026 Kurikulum SMAN 1 Belitang
          </p>
        </div>
      `;

      // Inisialisasi status kesimpulan materi jika sudah pernah disimpan sebelumnya
      checkInitialMateriConclusion();
    }

    // Helper untuk mengekstrak teks kesimpulan bersih jika tersimpan dalam format objek atau string JSON
    function sanitizeConclusionText(val) {
      if (!val) return '';
      if (typeof val === 'object') {
        return sanitizeConclusionText(val.conclusion || val.text || '');
      }
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
          try {
            const parsed = JSON.parse(trimmed);
            if (parsed && typeof parsed === 'object') {
              return sanitizeConclusionText(parsed.conclusion || parsed.text || '');
            }
          } catch (e) {}
        }
        return val;
      }
      return String(val);
    }

    function checkInitialMateriConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idVars = Array.from(new Set([cleanNisn, unpadded, padded, nisn])).filter(Boolean);

      let saved = null;
      try {
        for (const id of idVars) {
          const stored = localStorage.getItem('fincestem_materi_ft_day1_' + id);
          if (stored) {
            saved = JSON.parse(stored);
            break;
          }
        }
      } catch (e) {}

      if (saved) {
        const cleanSaved = sanitizeConclusionText(saved.conclusion || saved);
        if (cleanSaved) {
          applyMateriConclusionState(cleanSaved, saved.savedAt);
        }
      }

      // Selalu verifikasi status server: jika server sudah di-reset (tidak ada '1_materi'), bersihkan local state
      if (FincestemCore.progress) {
        FincestemCore.progress.getStudentProgress(nisn, function(prog) {
          if (prog && prog.task_map) {
            if (prog.task_map['1_materi']) {
              const task = prog.task_map['1_materi'];
              const content = sanitizeConclusionText(task.content);
              if (content) {
                applyMateriConclusionState(content, task.submitted_at || 'Tersimpan di server');
              }
            } else if (!saved) {
              const txtArea = document.getElementById('ftMateriConclusion');
              if (txtArea) txtArea.value = '';
              const badge = document.getElementById('ftMateriStatusBadge');
              if (badge) {
                badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
                badge.textContent = 'Wajib Disimpan (Tahap 1)';
              }
              const savedTimeEl = document.getElementById('ftMateriSavedTime');
              if (savedTimeEl) savedTimeEl.textContent = 'Belum disimpan';
              const btnSaveText = document.getElementById('btnSaveMateriText');
              if (btnSaveText) btnSaveText.textContent = 'Simpan Kesimpulan & Buka LKPD';
              const lockIcon = document.getElementById('ftLkpdLockIcon');
              if (lockIcon) {
                lockIcon.textContent = 'lock';
                lockIcon.className = 'material-symbols-outlined text-amber-200 text-xl';
              }
              const lockTitle = document.getElementById('ftLkpdLockTitle');
              if (lockTitle) lockTitle.textContent = 'Tahap 2: LKPD Budgeting Day 1';
              const lockDesc = document.getElementById('ftLkpdLockDesc');
              if (lockDesc) lockDesc.textContent = 'Selesaikan dan simpan kesimpulan modul di atas terlebih dahulu untuk membuka akses LKPD.';
              const btnGo = document.getElementById('btnGoToLkpd');
              if (btnGo) {
                btnGo.className = 'px-5 py-3 rounded-2xl bg-white/40 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60';
                btnGo.onclick = function() { handleGoToLkpd(); };
              }
              const btnGoText = document.getElementById('btnGoToLkpdText');
              if (btnGoText) btnGoText.textContent = 'LKPD Terkunci';
            }
          }
        });
      }
    }

    function applyMateriConclusionState(text, savedAt) {
      text = sanitizeConclusionText(text);
      const txtArea = document.getElementById('ftMateriConclusion');
      const badge = document.getElementById('ftMateriStatusBadge');
      const savedTimeEl = document.getElementById('ftMateriSavedTime');
      const btnSaveText = document.getElementById('btnSaveMateriText');
      const saveBtn = document.getElementById('btnSaveMateriConclusion');
      const lkpdBox = document.getElementById('ftLkpdAccessBox');
      const lockIcon = document.getElementById('ftLkpdLockIcon');
      const lockTitle = document.getElementById('ftLkpdLockTitle');
      const lockDesc = document.getElementById('ftLkpdLockDesc');
      const btnGo = document.getElementById('btnGoToLkpd');
      const btnGoText = document.getElementById('btnGoToLkpdText');

      if (txtArea) {
        txtArea.value = text;
        txtArea.setAttribute('disabled', 'disabled');
        txtArea.classList.add('bg-slate-100', 'cursor-not-allowed', 'text-slate-600');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300';
        badge.textContent = '🔒 Kesimpulan Disimpan & Terkunci';
      }
      if (savedTimeEl) {
        const dtStr = savedAt ? new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Tersimpan';
        savedTimeEl.textContent = `Tersimpan pada ${dtStr}`;
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.classList.remove('hover:bg-[#004f48]', 'cursor-pointer');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Kesimpulan Telah Terkunci</span>';
      } else if (btnSaveText) {
        btnSaveText.textContent = 'Kesimpulan Telah Terkunci';
      }

      // Aktifkan Akses ke LKPD
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2 Terbuka: LKPD Budgeting Day 1';
      if (lockDesc) lockDesc.textContent = 'Kesimpulan modul telah tersimpan. Silakan lanjutkan menyusun reng-rengan alokasi uang saku Anda di lembar kerja.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-[#006a61] hover:bg-teal-50 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() {
          window.location.href = 'lkpd.html?day=1';
        };
      }
      if (btnGoText) btnGoText.textContent = 'Buka LKPD Budgeting Day 1';
    }

    function saveMateriConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const txtArea = document.getElementById('ftMateriConclusion');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan kesimpulan pemahaman Anda minimal 15-20 kata sebelum melanjutkan!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriConclusion');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day1_' + nisn, JSON.stringify(record));
      } catch (e) {}

      applyMateriConclusionState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(nisn, 1, 'materi', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
          }
          FincestemCore.ui.toast('Kesimpulan modul berhasil disimpan! Akses ke LKPD Day 1 sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
        }
        FincestemCore.ui.toast('Kesimpulan modul berhasil disimpan! Akses ke LKPD Day 1 sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpd() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const saved = localStorage.getItem('fincestem_materi_ft_day1_' + nisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan pemahaman di atas sebelum membuka LKPD!', 'warning');
        const txtArea = document.getElementById('ftMateriConclusion');
        if (txtArea) {
          txtArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txtArea.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=1';
    }

    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 2 (2 SESI BERURUTAN)
    // ==========================================
    let currentD2Session = 1;

    function renderDay2FieldTripModule(mainEl, targetSesi) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      // Cek status penyelesaian foto AKPOL untuk membuka Sesi 2
      const isFotoAkpolDone = checkIsFotoAkpolDone(cleanNisn);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD2Session = Number(targetSesi);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const reqSesi = parseInt(urlParams.get('sesi'));
        if (reqSesi === 2 || currentD2Session === 2) {
          currentD2Session = 2;
        } else {
          currentD2Session = 1;
        }
      }

      // TAB NAVIGASI KUNJUNGAN DAY 2 (INTERAKTIF & BEBAS BERPINDAH BOLAK-BALIK)
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-2 gap-1.5">
          <!-- TAB 1: KAMPUS AKPOL -->
          <button type="button" onclick="switchD2Session(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD2Session === 1 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
            <span class="material-symbols-outlined text-base ${currentD2Session === 1 ? 'text-amber-300' : 'text-blue-600'}">military_tech</span>
            <span class="truncate">Sesi 1: Kampus AKPOL</span>
            ${currentD2Session === 1 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
          </button>

          <!-- TAB 2: LAWANG SEWU -->
          <button type="button" onclick="switchD2Session(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD2Session === 2 ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40' : 'bg-slate-50 hover:bg-amber-50 text-amber-950 border border-amber-300'}">
            <span class="material-symbols-outlined text-base ${currentD2Session === 2 ? 'text-amber-200' : 'text-amber-700'}">account_balance</span>
            <span class="truncate">Sesi 2: Lawang Sewu</span>
            ${currentD2Session === 2 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
          </button>
        </div>
      `;

      // Banner & Sub-navigasi Eksklusif Sesuai Sesi Aktif
      let headerHtml = '';
      if (currentD2Session === 2) {
        headerHtml = `
          <!-- BANNER MODUL FIELD TRIP DAY 2 - SESI 2 (CAGAR BUDAYA LAWANG SEWU) -->
          <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                Field Trip • Day 2 • Sesi 2
              </span>
              <span class="text-xs font-bold text-amber-300">Pilar: Culture, STEM &amp; Exploration</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Eksplorasi Sains &amp; Cagar Budaya Lawang Sewu
            </h2>
            <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
              Studi sains arsitektur tropis ramah iklim Nederlandsch-Indische Spoorweg Maatschappij (NISM), karya seni kaca patri Kraemer-Schouten, nilai sejarah heroik Angkatan Muda Kereta Api (AMKA), serta persiapan perjalanan malam menuju Kota Malang.
            </p>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-amber-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">calendar_today</span>
                <span>Selasa, 10 November 2026</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>13.00 - 15.30 WIB (Kunjungan Sesi 2)</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">location_on</span>
                <span>Lawang Sewu &rarr; Perjalanan Malang</span>
              </span>
            </div>
          </div>

          </div>

          ${tabNavHtml}
        `;
      } else {
        headerHtml = `
          <!-- BANNER MODUL FIELD TRIP DAY 2 - SESI 1 (AKADEMI KEPOLISIAN) -->
          <div class="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-blue-100 backdrop-blur-md">
                Field Trip • Day 2 • Sesi 1
              </span>
              <span class="text-xs font-bold text-amber-300">Pilar: Character, Discipline &amp; Leadership</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Akademi Kepolisian (AKPOL) Semarang
            </h2>
            <p class="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
              Pembentukan karakter disiplin, kepemimpinan Bhayangkara, jenjang kepangkatan taruna (Perkap No. 21/2010), dan eksplorasi sarana prasarana resmi Kampus Akademi Kepolisian RI.
            </p>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-blue-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">calendar_today</span>
                <span>Selasa, 10 November 2026</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>09.00 - 12.00 WIB (Kunjungan Pagi)</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">location_on</span>
                <span>Kampus AKPOL Semarang</span>
              </span>
            </div>
          </div>

          ${tabNavHtml}
        `;
      }

      mainEl.innerHTML = `
        ${headerHtml}

        ${currentD2Session === 1 ? `
        <!-- CONTAINER KONTEN SESI 1 (AKPOL) -->
        <div id="containerD2Sesi1" class="flex flex-col gap-4">
          <!-- MATERI SESI 1: AKADEMI KEPOLISIAN (AKPOL) LENGKAP -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-xs flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span class="material-symbols-outlined text-2xl">shield</span>
              </div>
              <div>
                <span class="text-xs uppercase font-extrabold text-blue-700 tracking-wider">Sesi 1 • Kunjungan Pagi (09.00 – 12.00 WIB)</span>
                <h3 class="font-extrabold text-lg text-slate-900 leading-snug">Akademi Kepolisian (AKPOL) Semarang</h3>
                <span class="text-xs text-slate-500 font-medium">Karakter, Disiplin, &amp; Kepemimpinan Bhayangkara</span>
              </div>
            </div>

            <!-- I. VISI RESMI AKPOL -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex flex-col gap-2 shadow-xs">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-300 text-lg">flag</span>
                <h4 class="font-black text-xs uppercase tracking-wider text-amber-200">I. Visi Resmi Akademi Kepolisian</h4>
              </div>
              <p class="text-xs sm:text-sm text-blue-50 leading-relaxed italic font-medium text-justify">
                "Menjadi lembaga pendidikan tinggi yang menghasilkan perwira Polri profesional, cerdas, bermoral, dan modern yang berwawasan global dan berstandar internasional."
              </p>
            </div>

            <!-- II. 5 MISI RESMI AKPOL -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 shadow-2xs">
              <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-blue-600">format_list_bulleted</span>
                <span>II. Lima (5) Misi Utama AKPOL</span>
              </h4>
              <ol class="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-2 pl-1 leading-relaxed text-justify">
                <li><strong>Menyelenggarakan pendidikan pembentukan perwira Polri</strong> melalui kegiatan pengajaran, pelatihan, dan pengasuhan secara bertahap dan berkesinambungan pada setiap tingkat pendidikan.</li>
                <li><strong>Menyelenggarakan kegiatan penelitian</strong> dalam upaya pengembangan ilmu pengetahuan dan teknologi yang terkait dengan bidang kepolisian.</li>
                <li><strong>Menyelenggarakan kegiatan pengabdian masyarakat</strong> yang terkait dengan bidang kepolisian.</li>
                <li><strong>Menyelenggarakan tata kelola institusi</strong> yang berorientasi kepada pelayanan prima dan berkembang menjadi pusat unggulan (<em>centre of excellence</em>).</li>
                <li><strong>Mengembangkan kerjasama dan jejaring kerja</strong> dengan berbagai lembaga di dalam dan luar negeri.</li>
              </ol>
            </div>

            <!-- III. PROFIL, KEDUDUKAN & LANDASAN HUKUM -->
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex flex-col gap-2.5 shadow-2xs">
              <h4 class="font-black text-sm text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-blue-700">account_balance</span>
                <span>III. Profil, Kedudukan &amp; Landasan Hukum</span>
              </h4>
              <ul class="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                <li>• <strong>Pengertian &amp; Kedudukan Organisasi:</strong> Akademi Kepolisian (Akpol) adalah lembaga pendidikan kedinasan tinggi untuk mencetak Perwira Polri di bawah naungan <strong>Lemdiklat Polri</strong> (Lembaga Pendidikan dan Pelatihan Polri). Terakreditasi <strong>Unggul</strong> oleh BAN-PT, berlokasi di Jl. Sultan Agung No. 131, Candi Baru, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah.</li>
                <li>• <strong>Landasan Regulasi &amp; Masa Studi:</strong> Berdasarkan <strong>Perkap No. 21 Tahun 2010</strong>, masa pendidikan Akpol ditempuh selama <strong>4 tahun (8 semester)</strong>.</li>
                <li>• <strong>Output Kelulusan:</strong> Menyandang gelar akademik <strong>Sarjana Terapan Kepolisian (S.Tr.K.)</strong> dan dilantik resmi menjadi perwira pertama Polri berpangkat <strong>Inspektur Polisi Dua (Ipda)</strong>.</li>
                <li>• <strong>Pendekatan Tri-Tunggal Pendidikan:</strong>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1.5">
                    <div class="p-2.5 rounded-xl bg-white border border-blue-100">
                      <strong class="text-blue-900 block text-xs">1. Pembelajaran (Akademik)</strong>
                      <span class="text-[11px] text-slate-600 leading-snug">Ilmu kepolisian, hukum pidana, kriminologi, forensik, psikologi massa.</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-100">
                      <strong class="text-blue-900 block text-xs">2. Pelatihan (Taktis)</strong>
                      <span class="text-[11px] text-slate-600 leading-snug">Menembak presisi, bela diri Polri, patroli, rekayasa lalin, olah TKP.</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-100">
                      <strong class="text-blue-900 block text-xs">3. Pengasuhan (Mental)</strong>
                      <span class="text-[11px] text-slate-600 leading-snug">Doktrin Tribrata &amp; Catur Prasetya, etika kesatria, disiplin militer.</span>
                    </div>
                  </div>
                </li>
                <li>• <strong>Afiliasi Internasional (INTERPA):</strong> Tergabung aktif sebagai anggota <em>International Association of Police Academies</em> (INTERPA) bersama akademi kepolisian dari <strong>36 negara dunia</strong>.</li>
              </ul>
            </div>

            <!-- IV. SEJARAH SINGKAT -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2 shadow-2xs">
              <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-blue-600">history_edu</span>
                <span>IV. Sejarah Singkat Akademi Kepolisian</span>
              </h4>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                Cikal bakal pendidikan perwira kepolisian dimulai sejak proklamasi kemerdekaan Republik Indonesia melalui pendirian <em>Sekolah Polisi Bagian Tinggi</em> di Mertoyudan, Magelang pada 17 Agustus 1945. Setelah melalui dinamika integrasi dan pemisahan akademi angkatan bersenjata pada masa AKABRI, lembaga ini secara definitif berkedudukan di kawasan perbukitan <strong>Candi Baru, Semarang</strong>, menempati kampus terpadu modern sebagai pusat keunggulan pembentukan perwira Polri.
              </p>
            </div>

            <!-- V. JENJANG KEPANGKATAN TARUNA (PERKAP 21/2010) -->
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex flex-col gap-2.5 shadow-2xs">
              <h4 class="font-black text-sm text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-blue-700">military_tech</span>
                <span>V. Jenjang Kepangkatan Taruna AKPOL (Perkap No. 21 Tahun 2010)</span>
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Selama 4 tahun (8 semester) masa studi di Akpol, taruna menempuh jenjang kepangkatan secara bertahap:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-black text-blue-900">1. Bharatutar (Bhayangkara Satu Taruna)</span>
                  <span class="text-[11px] text-slate-500 font-bold">Tingkat I (Tingkat Dasar / Semester 1 &amp; 2)</span>
                  <p class="text-[11px] text-slate-600 leading-snug">Penyesuaian mental dari sipil menjadi taruna, kepatuhan dasar militer, dan pembentukan fisik prima.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-black text-blue-900">2. Brigdatar (Brigadir Dua Taruna)</span>
                  <span class="text-[11px] text-slate-500 font-bold">Tingkat II (Semester 3 &amp; 4)</span>
                  <p class="text-[11px] text-slate-600 leading-snug">Pendalaman ilmu dasar kepolisian, penguasaan hukum pidana, dan kepemimpinan tingkat regu.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-black text-blue-900">3. Brigtutar (Brigadir Satu Taruna)</span>
                  <span class="text-[11px] text-slate-500 font-bold">Tingkat III (Semester 5 &amp; 6)</span>
                  <p class="text-[11px] text-slate-600 leading-snug">Keterampilan taktis lanjutan, manajemen reserse, dan pengabdian praktik kerja di kesatuan kewilayahan.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-black text-blue-900">4. Brigtar (Brigadir Taruna)</span>
                  <span class="text-[11px] text-slate-500 font-bold">Tingkat IV (Tingkat Akhir / Semester 7 &amp; 8)</span>
                  <p class="text-[11px] text-slate-600 leading-snug">Latihan integrasi taruna wreda, penyusunan skripsi sarjana terapan, serta persiapan pelantikan perwira.</p>
                </div>
              </div>
              <p class="text-xs text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-1">
                ⭐ <strong>Pelantikan Perwira (Praspa):</strong> Lulusan dilantik Presiden RI menjadi Perwira Pertama Polri berpangkat <strong>Inspektur Polisi Dua (Ipda)</strong> dengan gelar akademik <strong>Sarjana Terapan Kepolisian (S.Tr.K.)</strong>.
              </p>
            </div>

            <!-- VI. STRUKTUR POKOK PIMPINAN AKPOL -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 shadow-2xs">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-blue-600">groups</span>
                  <span>VI. Struktur Pokok Pimpinan AKPOL</span>
                </h4>
                <span class="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">Data Resmi akpol.ac.id</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <span class="text-[10px] font-black uppercase text-blue-700 tracking-wider">Gubernur Akademi Kepolisian:</span>
                  <strong class="text-slate-900 text-xs sm:text-sm mt-0.5">IRJEN POL. R. YOSEPH WIHASTONO YOGA PRANOTO, S.I.K., M.Hum.</strong>
                  <span class="text-[11px] text-slate-500 leading-snug mt-1">Perwira Tinggi Polri lulusan Akpol 1991 berpengalaman di bidang reserse, memegang komando tertinggi penyelenggaraan pendidikan, pelatihan, dan pengasuhan taruna.</span>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <span class="text-[10px] font-black uppercase text-blue-700 tracking-wider">Wakil Gubernur AKPOL (Wagub):</span>
                  <strong class="text-slate-900 text-xs sm:text-sm mt-0.5">BRIGJEN POL. Dr. DENI S. UTOMO, S.H., S.I.K., M.Si.</strong>
                  <span class="text-[11px] text-slate-500 leading-snug mt-1">Membantu Gubernur Akpol dalam memimpin pembinaan pendidikan, tata kelola manajerial internal, dan kesiapan operasional akademi.</span>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <span class="text-[10px] font-black uppercase text-blue-700 tracking-wider">Kabag Renmin:</span>
                  <strong class="text-slate-900 text-xs sm:text-sm mt-0.5">KOMBES POL. MUHAMMAD ALDIAN, S.I.K., M.H.</strong>
                  <span class="text-[11px] text-slate-500 leading-snug mt-1">Penanggung jawab perumusan rencana strategis, anggaran, tata usaha administrasi kepegawaian, serta sarana prasarana logistik Akpol.</span>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <span class="text-[10px] font-black uppercase text-blue-700 tracking-wider">Direktur Akademik:</span>
                  <strong class="text-slate-900 text-xs sm:text-sm mt-0.5">KOMBES POL. GUNTUR AGUNG SUPONO, S.I.K., M.Si.</strong>
                  <span class="text-[11px] text-slate-500 leading-snug mt-1">Penanggung jawab kurikulum pengajaran, penjaminan mutu akademik perkuliahan, riset dosen/taruna, dan evaluasi hasil belajar.</span>
                </div>
                <div class="col-span-1 sm:col-span-2 p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <span class="text-[10px] font-black uppercase text-blue-700 tracking-wider">Direktur Pembinaan Taruna &amp; Latihan (Dir Bintarlat):</span>
                  <strong class="text-slate-900 text-xs sm:text-sm mt-0.5">KOMBES POL. MUHAMAD SYARIF HARJOSAPUTRO, S.H., M.Si.</strong>
                  <span class="text-[11px] text-slate-500 leading-snug mt-1">Penanggung jawab pembinaan kedisiplinan batalyon taruna sehari-hari, latihan integritas mental, jasmani, serta penegakan etika kehormatan taruna.</span>
                </div>
              </div>
            </div>

            <!-- VII. 9 FASILITAS UTAMA KAMPUS AKPOL -->
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex flex-col gap-2.5 shadow-2xs">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <h4 class="font-black text-sm text-blue-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-blue-700">domain</span>
                  <span>VII. Sembilan (9) Fasilitas Utama Kampus AKPOL</span>
                </h4>
                <span class="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">Sumber: akpol.ac.id/fasilitas/</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">adjust</span>
                    1. Lapangan Tembak Pratisara Wirya
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Fasilitas pelatihan menembak untuk membentuk ketangkasan, disiplin, dan ketahanan mental taruna. Dilengkapi lintasan senjata laras panjang maupun pistol.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">corporate_fare</span>
                    2. Gedung Tri Brata Utama
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Pusat komando dan administrasi tempat kerja Gubernur Akpol, Direktur Bintarlat, dan Direktur Akademik dalam menjalankan tugas pembinaan taruna.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">badge</span>
                    3. Gedung Resimen
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Pusat kegiatan pengasuhan dan pembinaan taruna yang mendukung pembentukan karakter, disiplin, serta kepemimpinan calon perwira Polri.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">palette</span>
                    4. Gedung Kreativita
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Fasilitas pendukung pengembangan kreativitas dan inovasi taruna dalam bidang seni, budaya, dan keterampilan non-akademik.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">stadium</span>
                    5. Stadion Taruna
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Fasilitas olahraga utama untuk pelatihan fisik, kesamaptaan jasmani, upacara resmi, serta ajang besar Porsimaptar.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">meeting_room</span>
                    6. Auditorium Cendekia
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Fasilitas multifungsi modern berkapasitas besar untuk kuliah umum, seminar nasional/internasional, pelatihan keilmuan, dan sidang akademik resmi.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">art_track</span>
                    7. Relief Tanggon Kosala
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Monumen artistik di area utama kampus yang menggambarkan nilai dasar kepolisian, menjadi latar penting upacara yudisium taruna dan penyambutan tamu kehormatan.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">apartment</span>
                    8. Flat Awaloedin Djamin
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Kompleks hunian asrama taruna modern dinamai untuk menghormati Jenderal Polisi (Purn.) Prof. Dr. Drs. Awaloedin Djamin, M.P.A., mantan Kapolri dan tokoh pembaruan Polri.</p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col">
                  <strong class="text-blue-950 font-black flex items-center gap-1.5 text-xs">
                    <span class="material-symbols-outlined text-sm text-blue-700">military_tech</span>
                    9. Patung Gajah Mada (Karya I Nyoman Nuarta)
                  </strong>
                  <p class="text-slate-600 text-[11px] mt-1 leading-relaxed">Monumen megah setinggi 17 meter berbobot 10 ton karya pematung legendaris I Nyoman Nuarta. Simbol keteladanan Mahapatih Gajah Mada pemimpin Bhayangkara.</p>
                </div>
              </div>
            </div>

            <!-- VIII. INFORMASI PENDAFTARAN & PERSYARATAN MASUK AKPOL -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-blue-50/60 border border-amber-300 flex flex-col gap-4 shadow-sm">
              <div class="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-amber-200/80">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <span class="material-symbols-outlined text-lg">how_to_reg</span>
                  </div>
                  <div>
                    <h4 class="font-black text-sm sm:text-base text-amber-950 leading-tight">VIII. Informasi Pendaftaran &amp; Persyaratan Masuk AKPOL</h4>
                    <span class="text-[11px] text-slate-600 font-medium">Panduan Resmi Penerimaan Calon Taruna/Taruni Akademi Kepolisian</span>
                  </div>
                </div>
                <a href="https://akpol.ac.id/info-pendaftaran/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs">
                  <span>Portal akpol.ac.id</span>
                  <span class="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>

              <!-- SUB 1: SYARAT UMUM -->
              <div class="p-4 rounded-xl bg-white border border-blue-200/90 flex flex-col gap-2.5 shadow-2xs">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <a href="https://akpol.ac.id/info-pendaftaran/#d302e53f5f7e23e18" target="_blank" rel="noopener noreferrer" class="font-black text-xs sm:text-sm text-blue-900 hover:underline flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-blue-700 text-base">verified</span>
                    <span>PERSYARATAN UMUM PENERIMAAN TARUNA AKPOL</span>
                  </a>
                  <span class="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">Pasal 21 UU No. 2 Tahun 2002</span>
                </div>
                <ol class="list-decimal list-outside pl-4 space-y-1.5 text-xs text-slate-700 leading-relaxed text-justify">
                  <li><strong>Warga Negara Indonesia (WNI).</strong></li>
                  <li><strong>Beriman dan bertakwa</strong> kepada Tuhan Yang Maha Esa.</li>
                  <li><strong>Setia kepada Negara Kesatuan Republik Indonesia</strong> berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.</li>
                  <li><strong>Berumur paling rendah 18 (delapan belas) tahun</strong> pada saat diangkat menjadi anggota Polri.</li>
                  <li><strong>Sehat jasmani, rohani dan bebas narkoba</strong> (surat keterangan bebas narkoba dari instansi yang berwenang).</li>
                  <li><strong>Tidak sedang terlibat kasus pidana</strong> atau pernah dipidana karena melakukan suatu kejahatan yang dibuktikan dengan Surat Keterangan Catatan Kepolisian (SKCK) dari Polres setempat.</li>
                  <li><strong>Berwibawa, jujur, adil,</strong> dan berkelakuan tidak tercela.</li>
                </ol>
              </div>

              <!-- SUB 2: SYARAT KHUSUS -->
              <div class="p-4 rounded-xl bg-white border border-amber-200/90 flex flex-col gap-2.5 shadow-2xs">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <a href="https://akpol.ac.id/info-pendaftaran/#e97bddc558df4d42f" target="_blank" rel="noopener noreferrer" class="font-black text-xs sm:text-sm text-amber-900 hover:underline flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-amber-700 text-base">rule</span>
                    <span>PERSYARATAN KHUSUS PENERIMAAN TARUNA AKPOL</span>
                  </a>
                  <span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Kualifikasi Fisik &amp; Administrasi</span>
                </div>
                <ol class="list-decimal list-outside pl-4 space-y-2 text-xs text-slate-700 leading-relaxed text-justify">
                  <li><strong>Status Peserta:</strong> Pria/wanita, bukan anggota/mantan anggota TNI/Polri dan ASN, dan belum pernah mengikuti pendidikan pembentukan Polri, TNI, atau Sekolah Kedinasan lainnya.</li>
                  <li><strong>Pendidikan Formal:</strong> Berijazah serendah-rendahnya SMA/MA (bukan lulusan dan atau berijazah Paket A, B, dan C). Untuk lulusan SMA/MA IPA/IPS dan lulusan SMA/MA dengan kurikulum Merdeka dibuktikan dengan ijazah Kemendikdasmen, serta lulusan PDF/SPM dengan ijazah Kemenag.</li>
                  <li><strong>Batas Usia:</strong> Berumur minimal 16 tahun dan maksimal 22 tahun 0 hari pada saat pembukaan pendidikan.</li>
                  <li><strong>Standar Tinggi &amp; Berat Badan:</strong> Tinggi badan minimal (dengan berat badan seimbang menurut ketentuan yang berlaku):
                    <div class="mt-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 flex flex-col sm:flex-row gap-2 sm:gap-6">
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-blue-600 text-sm">male</span> Pria: Minimal 165 (seratus enam puluh lima) cm</span>
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-pink-600 text-sm">female</span> Wanita: Minimal 163 (seratus enam puluh tiga) cm</span>
                    </div>
                  </li>
                  <li><strong>Status Pernikahan:</strong> Belum pernah menikah secara hukum positif/agama/adat, belum pernah hamil/melahirkan, belum pernah memiliki anak biologis (anak kandung), dan sanggup untuk tidak menikah selama dalam masa pendidikan pembentukan.</li>
                  <li><strong>Tato &amp; Tindik:</strong> Tidak bertato dan tidak memiliki tindik telinga atau anggota badan lainnya, kecuali yang disebabkan oleh ketentuan adat/agama resmi.</li>
                  <li>Bagi peserta calon Taruna/i Akpol yang telah gagal/TMS dalam proses tes karena melakukan tindak pidana yang telah berkekuatan hukum tetap (inkrah) tidak dapat mendaftar kembali.</li>
                  <li>Bagi peserta calon Taruna/i Akpol yang telah gagal/TMS di tahapan tes PMK pada tahun sebelumnya tidak dapat mendaftar kembali.</li>
                  <li>Bagi peserta calon Taruna/i Akpol yang diberhentikan dari proses pendidikan pembentukan TNI/Polri atau Sekolah Kedinasan lainnya tidak dapat mendaftar.</li>
                  <li>Mantan Taruna/i atau Siswa/i yang diberhentikan tidak dengan hormat dari proses pendidikan oleh lembaga pendidikan yang dibiayai oleh anggaran negara tidak dapat mendaftar.</li>
                  <li>Dinyatakan bebas narkoba berdasarkan hasil pemeriksaan kesehatan oleh Panpus/Panda.</li>
                  <li>Tidak mendukung atau ikut serta dalam organisasi atau paham yang bertentangan dengan Pancasila, Undang-Undang Dasar 1945, NKRI, dan Bhinneka Tunggal Ika.</li>
                  <li>Membuat surat pernyataan bermaterai, untuk tidak melakukan perbuatan yang melanggar norma agama, norma kesusilaan, norma sosial, dan norma hukum.</li>
                  <li>Membuat surat pernyataan bermaterai bersedia ditempatkan di seluruh wilayah NKRI pada semua bidang tugas kepolisian, ditandatangani oleh peserta dan diketahui orang tua/wali.</li>
                  <li>Membuat surat pernyataan bermaterai, untuk tidak mempercayai pihak-pihak yang menawarkan, menjanjikan, dan menjamin dapat membantu meluluskan dalam proses tes penerimaan, yang ditandatangani oleh calon peserta dan diketahui oleh orang tua/wali.</li>
                  <li>Bagi calon Taruna/i Akpol Tahun Anggaran 2025/2026 yang berusaha menggunakan sponsor/koneksi dengan cara menghubungi lewat telepon/surat atau dalam bentuk apapun kepada panitia/pejabat yang berwenang melalui orang tua/wali/keluarga atau pihak lain akan didiskualifikasi.</li>
                  <li>Bagi yang memperoleh ijazah dari sekolah di luar negeri, harus mendapat pengesahan dari Kemendikdasmen.</li>
                  <li><strong>Ketentuan Domisili:</strong>
                    <ul class="list-disc list-outside pl-4 mt-1.5 space-y-1.5 text-slate-600">
                      <li>Peserta berdomisili minimal 2 tahun di wilayah Polda tempat mendaftar (terhitung pada saat pembukaan pendidikan) dengan melampirkan Kartu Keluarga dan Kartu Tanda Penduduk atau Kartu Identitas Anak (terhitung mulai tercatat di domisili baru), dengan verifikasi oleh Panitia Daerah dan Dinas Kependudukan dan Pencatatan Sipil.</li>
                      <li>Bagi peserta yang berdomisili kurang dari 2 tahun, dapat mendaftar di Polda sesuai tempat pendidikan/sekolah SMA/MA peserta dengan ketentuan:
                        <p class="pl-2 mt-0.5">• Minimal 2 tahun pada riwayat rapor sekolah SMA/MA (terhitung saat buka pendidikan) bagi yang bertempat tinggal tidak mengikuti orang tua, dibuktikan melalui rapor sekolah SMA/MA peserta dengan menyertakan KK peserta.</p>
                        <p class="pl-2 mt-0.5">• Minimal 1 tahun terakhir pada riwayat rapor sekolah SMA/MA (terhitung saat Buka Dik) bagi yang bertempat tinggal mengikuti orang tua, dibuktikan melalui KK dan rapor sekolah SMA/MA peserta.</p>
                      </li>
                      <li>Bagi peserta yang tidak memenuhi persyaratan di atas, dapat mendaftar di Polda sesuai domisili sebelumnya (terhitung mulai dengan riwayat pada domisili sebelumnya), dengan verifikasi oleh Panitia Daerah dan Dinas Kependudukan dan Pencatatan Sipil.</li>
                      <li>Bagi peserta dari SMA Taruna Nusantara dan SMA Krida Nusantara yang masih kelas XII, dapat mendaftar di Polda sesuai asal domisili, atau untuk peserta dari SMA Taruna Nusantara dapat mendaftar di Polda Jateng atau Polda DIY, sedangkan untuk peserta dari SMA Krida Nusantara dapat mendaftar di Polda Jabar, dengan ketentuan mengikuti kuota kelulusan berdasarkan peringkat pada Polda sesuai persyaratan domisili.</li>
                    </ul>
                  </li>
                  <li>Bersedia menjalani Ikatan Dinas Pertama (IDP) selama 10 (sepuluh) tahun terhitung saat diangkat menjadi Perwira Polri.</li>
                  <li>Memperoleh persetujuan resmi dari orang tua/wali.</li>
                  <li>Tidak terikat perjanjian Ikatan Dinas dengan suatu instansi lain.</li>
                  <li>Bagi calon Taruna/i yang dinyatakan lulus terpilih agar melampirkan kartu BPJS Kesehatan yang aktif.</li>
                  <li>Bagi yang sudah bekerja secara tetap sebagai pegawai/karyawan:
                    <p class="pl-2 mt-0.5">• Mendapat persetujuan/rekomendasi dari kepala instansi yang bersangkutan.</p>
                    <p class="pl-2 mt-0.5">• Bersedia diberhentikan dari status pegawai/karyawan bila diterima dan mengikuti pendidikan pembentukan Taruna/i Akpol.</p>
                  </li>
                  <li>Mengikuti dan dinyatakan lulus pada seluruh tahapan pemeriksaan/pengujian seleksi.</li>
                </ol>
              </div>

              <!-- SUB 3: JADWAL & ALUR PENERIMAAN TARUNA AKPOL 2026 -->
              <div class="p-4 rounded-xl bg-white border border-amber-200/90 flex flex-col gap-3.5 shadow-2xs">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <h5 class="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-rose-600">calendar_month</span>
                    <span>Jadwal Penerimaan Taruna AKPOL Tahun Anggaran 2026</span>
                  </h5>
                  <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-blue-100 text-blue-900 border border-blue-200">Timeline Resmi Polri 2026</span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-1">
                  <!-- Kolom Kiri: Rincian Jadwal Step-by-Step (7 Kolom) -->
                  <div class="lg:col-span-7 relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-600">
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">9 Maret – 30 Maret 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">PENDAFTARAN ONLINE DAN VERIFIKASI</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">31 Maret 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">PAKTA INTEGRITAS</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">31 Maret – 4 April 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">RIKMIN AWAL</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">7 April – 11 April 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">RIKKES I</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">23 April – 25 April 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">CAT PSIKOLOGI I</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">6 Mei – 11 Mei 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">CAT UJI AKADEMIK</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">17 Mei – 19 Mei 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">PELAKSANAAN EKG</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">21 Mei – 24 Mei 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">UJI JASMANI DAN ANTRO</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">4 Juni 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">SIDANG MENUJU RIKKES II</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">5 Juni – 6 Juni 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">RIKKES II</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">13 Juni – 15 Juni 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">PMK DAN PSI II</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">16 Juni – 17 Juni 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">RIKMIN AKHIR</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      <span class="text-xs font-black text-blue-900 block">26 Juni 2026</span>
                      <span class="text-[11.5px] text-slate-800 font-bold">SIDANG AKHIR PANDA</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                      <span class="text-xs font-black text-amber-900 block">3 Juli – 27 Juli 2026</span>
                      <span class="text-[11.5px] text-amber-900 font-bold">SELEKSI TK PANPUS</span>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></div>
                      <span class="text-xs font-black text-emerald-900 block">1 Agustus 2026</span>
                      <span class="text-[12px] text-emerald-800 font-black">BUKA DIK AKPOL</span>
                    </div>
                  </div>

                  <!-- Kolom Kanan: Infografis Bagan Timeline Resmi (5 Kolom) -->
                  <div class="lg:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <span class="text-[11px] font-black text-slate-800 mb-2 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-blue-600">image</span>
                      <span>Bagan Timeline Penerimaan Taruna AKPOL 2026</span>
                    </span>
                    <a href="../jadwal_penerimaan_akpol_2026.png" target="_blank" class="block rounded-xl overflow-hidden border border-slate-300 shadow-xs hover:opacity-95 transition-all bg-white p-1">
                      <img src="../jadwal_penerimaan_akpol_2026.png" alt="Bagan Jadwal Penerimaan Taruna AKPOL 2026" class="w-full max-h-[560px] object-contain mx-auto">
                    </a>
                    <span class="text-[10px] text-slate-500 mt-2 text-center italic">Klik bagan di atas untuk memperbesar infografis seleksi resmi</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- IX. INSPIRASI NILAI BAGI SISWA SMAN 1 BELITANG -->
            <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/90 flex flex-col gap-2.5 shadow-2xs">
              <h4 class="font-black text-sm text-indigo-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-indigo-700">verified_user</span>
                <span>IX. Inspirasi Nilai Karakter Bagi Siswa SMAN 1 Belitang</span>
              </h4>
              <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                <li>• <strong>Manajemen Waktu Presisi (Military Time Management):</strong> Meneladani disiplin bangun pukul 04.00 WIB dan beraktivitas tepat waktu tanpa penundaan.</li>
                <li>• <strong>Integritas &amp; Moralitas:</strong> Menjunjung tinggi kejujuran dan prinsip bebas suap (BETAH: Bersih, Transparan, Akuntabel, Humanis).</li>
                <li>• <strong>Jiwa Korsa &amp; Kekompakan:</strong> Saling mendukung dalam tim riset lapangan Field Trip serta menjaga martabat almamater sekolah.</li>
              </ul>
            </div>
          </div>

          <!-- LEMBAR KESIMPULAN MODUL SESI 1: AKPOL -->
          <div class="bg-gradient-to-br from-[#006a61] to-[#004f48] text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col gap-4">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <span class="material-symbols-outlined text-2xl">rate_review</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs text-teal-200 font-bold uppercase tracking-wider">Prasyarat Gerbang LKPD AKPOL</span>
                  <h3 class="font-black text-base sm:text-lg">Kesimpulan Pemahaman Materi AKPOL</h3>
                </div>
              </div>
              <span id="ftMateriAkpolBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shrink-0">
                Wajib Diisi
              </span>
            </div>

            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Tuliskan intisari pemahaman Anda (minimal 15–20 kata) mengenai visi, disiplin taruna, dan fasilitas yang Anda pelajari dari Akademi Kepolisian (AKPOL) sebelum membuka LKPD AKPOL.
            </p>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-teal-100">Kesimpulan Anda (Minimal 30 karakter):</label>
              <textarea id="ftMateriAkpolConclusion" rows="4" placeholder="Tuliskan kesimpulan pemahaman Anda tentang AKPOL di sini (misal: Dari materi AKPOL saya memahami visi menghasilkan perwira profesional berintegritas, 4 jenjang kepangkatan taruna, serta kedisiplinan berpedoman pada Tribrata dan Catur Prasetya)..." class="w-full p-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm leading-relaxed outline-none border-2 border-transparent focus:border-teal-300 shadow-inner"></textarea>
              <div class="flex items-center justify-between text-[11px] text-teal-200 pt-0.5">
                <span id="ftMateriAkpolCharCount">0 karakter</span>
                <span id="ftMateriAkpolSavedTime">Belum disimpan</span>
              </div>
            </div>

            <div class="flex items-center justify-between gap-3 pt-1 flex-wrap">
              <button id="btnSaveMateriAkpol" onclick="saveMateriConclusionAkpol()" class="py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">save</span>
                <span id="btnSaveMateriAkpolText">Simpan Resume AKPOL &amp; Buka LKPD</span>
              </button>
            </div>

            <!-- STATUS AKSES KE LKPD AKPOL -->
            <div id="boxAccessLkpdAkpol" class="p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
              <div class="flex items-center gap-3">
                <span id="iconLkpdAkpolLock" class="material-symbols-outlined text-amber-300 text-xl">lock</span>
                <div class="flex flex-col">
                  <h4 id="titleLkpdAkpolLock" class="font-black text-sm sm:text-base">Tahap 1.2: LKPD AKPOL Semarang (5 Soal Esai)</h4>
                  <p id="descLkpdAkpolLock" class="text-xs text-teal-100 mt-0.5">Simpan kesimpulan di atas untuk membuka lembar kerja soal esai AKPOL.</p>
                </div>
              </div>
              <a id="btnGoToLkpdAkpol" href="javascript:void(0)" onclick="handleGoToLkpdAkpol()" class="px-5 py-3 rounded-2xl bg-white/40 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60">
                <span id="textGoToLkpdAkpol">LKPD Terkunci</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
        ` : `
        <!-- CONTAINER KONTEN SESI 2 (LAWANG SEWU) -->
        <div id="containerD2Sesi2" class="flex flex-col gap-4">
          <!-- MATERI SESI 2: LAWANG SEWU LENGKAP -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <span class="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <div>
                  <span class="text-xs uppercase font-extrabold text-amber-700 tracking-wider">Sesi 2 • Kunjungan Siang (13.00 – 14.30 WIB)</span>
                  <h3 class="font-extrabold text-lg text-slate-900 leading-snug">Cagar Budaya Nasional Lawang Sewu</h3>
                </div>
              </div>

              <!-- Poin 1: Status CB.30 & NISM -->
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-amber-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-700">train</span>
                  <span>1. Kantor Pusat NISM &amp; Cagar Budaya Nasional (CB.30)</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Gedung Lawang Sewu merupakan bangunan cagar budaya berperingkat nasional dengan nomor SK Mendikbud <strong>CB.30</strong>. Gedung megah ini mulai dibangun pada <strong>27 Februari 1904 dan selesai tahun 1907</strong> sebagai kantor administrasi pusat perusahaan kereta api swasta pertama di Hindia Belanda, yaitu <em>Nederlandsch-Indische Spoorweg Maatschappij (NISM)</em>. Berdiri tepat di bundaran Tugu Muda Semarang, saat ini Lawang Sewu dirawat dan dikelola secara profesional oleh PT Kereta Api Indonesia (Persero) melalui anak perusahaannya, KAI Wisata.
                </p>
              </div>

              <!-- Poin 2: Etimologi & Fakta 928 Pintu -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-600">door_front</span>
                  <span>2. Etimologi "Lawang Sewu" &amp; Fakta 928 Daun Pintu Fisik</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Masyarakat lokal Semarang menjuluki gedung ini <strong>"Lawang Sewu"</strong> (bahasa Jawa yang berarti <em>Seribu Pintu</em>) karena banyaknya pintu dan jendela lengkung berukuran raksasa dengan daun ganda yang menyerupai pintu. Meskipun dijuluki seribu pintu, secara fisik arsitektur bangunan ini memiliki <strong>928 bidang pintu</strong>. Julukan "sewu" mencerminkan kekaguman masyarakat terhadap kemegahan dan banyaknya bukaan sirkulasi udara pada gedung tersebut.
                </p>
              </div>

              <!-- Poin 3: Arsitek & Gaya Nieuwe Indische Bouwstijl -->
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-amber-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-700">architecture</span>
                  <span>3. Tokoh Arsitek &amp; Gaya Nieuwe Indische Bouwstijl</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Lawang Sewu dirancang oleh dua arsitek ternama asal Belanda, yaitu <strong>Prof. Jacob F. Klinkhamer</strong> (Guru Besar TH Delft) dan <strong>B.J. Ouëndag</strong>, serta penyelesaian pembangunannya dipimpin oleh arsitek <strong>Cosman Citroen</strong>. Mengusung gaya arsitektur <em>Nieuwe Indische Bouwstijl</em> (Rasionalisme Belanda yang diadaptasikan secara fungsional terhadap iklim tropis basah Nusantara), menggabungkan estetika kubah menara kembar Belanda dengan kepraktisan perlindungan hujan lebat dan panas terik.
                </p>
              </div>

              <!-- Poin 4: STEM Fisika Bangunan Tropis -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 shadow-2xs">
                <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-600">thermostat</span>
                  <span>4. Analisis STEM (Sains &amp; Fisika Pendinginan Pasif Tanpa AC)</span>
                </h4>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Para insinyur masa lampau merancang sistem termal gedung agar tetap dingin secara alami tanpa bantuan pendingin udara (AC):
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                    <span class="font-bold text-amber-950 flex items-center gap-1"><span>💨</span> Ventilasi Silang (Cross-Ventilation)</span>
                    <span class="text-slate-600 text-justify">Lorong ganda panjang dengan deretan pintu dan jendela berhadapan lurus memungkinkan angin laut pesisir Semarang berhembus bebas ke seluruh ruangan.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                    <span class="font-bold text-amber-950 flex items-center gap-1"><span>🌡️</span> Efek Cerobong (Thermal Stack Effect)</span>
                    <span class="text-slate-600 text-justify">Plafon setinggi 4 hingga 4,5 meter mendorong udara panas naik ke atas dan keluar melalui <em>bouvenlicht</em> (ventilasi atas), menjaga lantai bawah tetap sejuk.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                    <span class="font-bold text-amber-950 flex items-center gap-1"><span>💧</span> Basement Penampung Air (Cooling Floor)</span>
                    <span class="text-slate-600 text-justify">Ruang bawah tanah dirancang dialiri air sebagai penyerap panas alami dan isolator termal lantai bangunan di atasnya.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 shadow-2xs">
                    <span class="font-bold text-amber-950 flex items-center gap-1"><span>🧱</span> Dinding Bata Massif</span>
                    <span class="text-slate-600 text-justify">Ketebalan dinding bata khusus meredam penyerapan dan konduksi gelombang panas matahari siang secara efektif.</span>
                  </div>
                </div>
              </div>

              <!-- Poin 5: Kaca Patri Schouten -->
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-amber-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-700">palette</span>
                  <span>5. Mahakarya Kaca Patri (Stained Glass) Schouten</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Pada tangga utama gedung utama, terpasang mahakarya kaca patri spektakuler karya seniman <strong>Johannes Lourens Schouten</strong> dari Studio 't Prinsenhof, Delft. Kaca warna-warni ini menggambarkan lambang Dewi Fortuna (Dewi Kemakmuran), Dewi Venus, simbol kota Batavia dan Amsterdam, serta keanekaragaman flora-fauna Hindia Belanda. Selain estetika seni tinggi, kaca patri ini membiaskan sinar matahari langsung sehingga tidak menyilaukan dan mereduksi radiasi inframerah.
                </p>
              </div>

              <!-- Poin 6: Heroisme Pertempuran Lima Hari Semarang -->
              <div class="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-rose-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-rose-700">flag</span>
                  <span>6. Saksi Sejarah: Pertempuran Lima Hari di Semarang (Oktober 1945)</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Pada tanggal <strong>14 hingga 19 Oktober 1945</strong>, gedung Lawang Sewu menjadi benteng pertahanan sengit para pemuda <strong>Angkatan Muda Kereta Api (AMKA)</strong> dan pejuang kemerdekaan melawan tentara Jepang (batalion Kidō Butai). Belasan pegawai kereta api gugur dalam pertempuran berdarah mempertahankan kantor pusat perkeretaapian ini. Heroisme mereka diabadikan dalam monumen batu prasasti di halaman Lawang Sewu dan monumen Tugu Muda di seberangnya.
                </p>
              </div>

              <!-- Poin 7: Purna Pugar Cagar Budaya -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2 shadow-2xs">
                <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-600">verified</span>
                  <span>7. Konservasi &amp; Purna Pugar Modern (5 Juli 2011)</span>
                </h4>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  Setelah melalui proses konservasi dan pemugaran menyeluruh sejak tahun 2009 untuk mengembalikan keaslian material batuan dan ornamen aslinya, Lawang Sewu diresmikan Purna Pugar pada tanggal <strong>5 Juli 2011 oleh Ibu Negara Hj. Ani Bambang Yudhoyono</strong>. Kini Lawang Sewu menjadi ikon pariwisata edukasi sejarah, cagar budaya, dan arsitektur kebanggaan Kota Semarang.
                </p>
              </div>
            </div>

            <!-- LEMBAR KESIMPULAN MODUL SESI 2: LAWANG SEWU -->
            <div class="bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                    <span class="material-symbols-outlined text-2xl">rate_review</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs text-amber-200 font-bold uppercase tracking-wider">Prasyarat Gerbang LKPD Lawang Sewu</span>
                    <h3 class="font-black text-base sm:text-lg">Kesimpulan Pemahaman Materi Lawang Sewu</h3>
                  </div>
                </div>
                <span id="ftMateriLawangBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-amber-950 shrink-0">
                  Wajib Diisi
                </span>
              </div>

              <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                Tuliskan intisari pemahaman Anda (minimal 15–20 kata) mengenai rekayasa pendingin alami arsitektur Lawang Sewu dan sejarah perjuangan AMKA sebelum membuka LKPD Lawang Sewu.
              </p>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-amber-100">Kesimpulan Anda (Minimal 30 karakter):</label>
                <textarea id="ftMateriLawangConclusion" rows="4" placeholder="Tuliskan kesimpulan pemahaman Anda tentang Lawang Sewu di sini (misal: Dari kunjungan Lawang Sewu saya belajar rekayasa arsitektur pendinginan alami tanpa AC melalui plafon 4 meter, ventilasi silang, dan ruang bawah tanah, serta heroisme pemuda AMKA mempertahankan kantor kereta api)..." class="w-full p-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm leading-relaxed outline-none border-2 border-transparent focus:border-amber-300 shadow-inner"></textarea>
                <div class="flex items-center justify-between text-[11px] text-amber-200 pt-0.5">
                  <span id="ftMateriLawangCharCount">0 karakter</span>
                  <span id="ftMateriLawangSavedTime">Belum disimpan</span>
                </div>
              </div>

              <div class="flex items-center justify-between gap-3 pt-1 flex-wrap">
                <button id="btnSaveMateriLawang" onclick="saveMateriConclusionLawang()" class="py-3 px-5 rounded-2xl bg-white hover:bg-amber-100 text-amber-950 font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-lg">save</span>
                  <span id="btnSaveMateriLawangText">Simpan Resume Lawang Sewu &amp; Buka LKPD</span>
                </button>
              </div>

              <!-- STATUS AKSES KE LKPD LAWANG SEWU -->
              <div id="boxAccessLkpdLawang" class="p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
                <div class="flex items-center gap-3">
                  <span id="iconLkpdLawangLock" class="material-symbols-outlined text-amber-300 text-xl">lock</span>
                  <div class="flex flex-col">
                    <h4 id="titleLkpdLawangLock" class="font-black text-sm sm:text-base">Tahap 2.2: LKPD Lawang Sewu (5 Soal Esai)</h4>
                    <p id="descLkpdLawangLock" class="text-xs text-amber-100 mt-0.5">Simpan kesimpulan di atas untuk membuka lembar kerja soal esai Lawang Sewu.</p>
                  </div>
                </div>
                <a id="btnGoToLkpdLawang" href="javascript:void(0)" onclick="handleGoToLkpdLawang()" class="px-5 py-3 rounded-2xl bg-white/40 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60">
                  <span id="textGoToLkpdLawang">LKPD Terkunci</span>
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
        </div>
        `}

        <!-- Copyright Footer -->
        <div class="text-center pt-2 pb-4">
          <p class="font-label-sm text-label-sm text-outline text-xs">
            &copy; 2026 Kurikulum SMAN 1 Belitang
          </p>
        </div>
      `;

      initDay2ModuleListeners(cleanNisn, isFotoAkpolDone);
    }

    function checkIsFotoAkpolDone(nisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const cleanNisn = String(nisn || user.nisn || user.identifier || '').trim();
        const ids = [
          cleanNisn,
          cleanNisn.replace(/^0+/, ''),
          cleanNisn.padStart(10, '0'),
          user.nis,
          user.identifier,
          user.username
        ].filter(Boolean);

        // 1. Cek dari progres siswa (FincestemCore.progress)
        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(cleanNisn);
          if (prog) {
            if (FincestemCore.progress.isDayStudentTasksDone && FincestemCore.progress.isDayStudentTasksDone(prog, 2)) {
              return true;
            }
            const tm = prog.task_map || {};
            if (tm['2_dokumentasi'] && (tm['2_dokumentasi'].status === 'completed' || tm['2_dokumentasi'].status === 'submitted')) return true;
            if (tm['2_refleksi'] && (tm['2_refleksi'].status === 'completed' || tm['2_refleksi'].status === 'submitted')) return true;
          }
        }

        // 2. Cek LocalStorage harian
        for (const id of ids) {
          if (localStorage.getItem(`fincestem_dok_ft_day2_akpol_${id}`) === 'true') return true;
          if (localStorage.getItem(`fincestem_dok_ft_day2_${id}`) === 'true') return true;
          if (localStorage.getItem(`fincestem_dok_ft_day2_lawang_${id}`) === 'true') return true;
          if (localStorage.getItem(`fincestem_lkpd_ft_day2_lawangsewu_${id}`)) return true;
          if (localStorage.getItem(`fincestem_lkpd_ft_day2_lawang_${id}`)) return true;
          if (localStorage.getItem(`fincestem_lkpd_lawang_saved_${id}`) === 'true') return true;
          if (localStorage.getItem(`fincestem_materi_ft_day2_lawangsewu_${id}`)) return true;
          if (localStorage.getItem(`fincestem_materi_ft_day2_lawang_${id}`)) return true;
          if (localStorage.getItem(`fincestem_refl_ft_day2_${id}`)) return true;
        }

        // 3. Cek database dokumentasi foto umum
        const dbStr = localStorage.getItem('fincestem_db_2026_v1');
        if (dbStr) {
          const db = JSON.parse(dbStr);
          if (Array.isArray(db.documentation)) {
            const hasD2Photo = db.documentation.some(p => {
              const docDay = Number(p.day || p.day_number || 0);
              const docNisn = String(p.nisn || p.author_nisn || p.uploaded_by || '').trim();
              const matchId = ids.includes(docNisn) || ids.includes(docNisn.replace(/^0+/, ''));
              return docDay === 2 && matchId;
            });
            if (hasD2Photo) return true;
          }
        }
      } catch (e) {}
      return false;
    }

    function switchD2Session(sesi) {
      currentD2Session = Number(sesi);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('sesi', String(sesi));
        window.history.replaceState(null, '', url.toString());
      } catch (e) {}

      const mainEl = document.getElementById('mainContentArea') || document.querySelector('main');
      if (mainEl) {
        renderDay2FieldTripModule(mainEl, sesi);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function initDay2ModuleListeners(cleanNisn, isFotoAkpolDone) {
      // 1. Inisialisasi Sesi 1 (AKPOL)
      const txtAkpol = document.getElementById('ftMateriAkpolConclusion');
      const countAkpol = document.getElementById('ftMateriAkpolCharCount');
      if (txtAkpol && countAkpol) {
        txtAkpol.addEventListener('input', () => {
          const len = txtAkpol.value.trim().length;
          countAkpol.textContent = `${len} karakter ${len >= 30 ? '✅' : '(kurang ' + (30 - len) + ' lagi)'}`;
        });
      }

      // Muat data tersimpan AKPOL
      let savedAkpol = null;
      try {
        const raw = localStorage.getItem('fincestem_materi_ft_day2_akpol_' + cleanNisn) || localStorage.getItem('fincestem_materi_ft_day2_' + cleanNisn);
        if (raw) savedAkpol = JSON.parse(raw);
      } catch (e) {}

      if (savedAkpol && savedAkpol.conclusion) {
        applyMateriAkpolState(savedAkpol.conclusion, savedAkpol.savedAt);
      }

      // 2. Inisialisasi Sesi 2 (Lawang Sewu) jika ada di DOM
      if (isFotoAkpolDone) {
        const txtLawang = document.getElementById('ftMateriLawangConclusion');
        const countLawang = document.getElementById('ftMateriLawangCharCount');
        if (txtLawang && countLawang) {
          txtLawang.addEventListener('input', () => {
            const len = txtLawang.value.trim().length;
            countLawang.textContent = `${len} karakter ${len >= 30 ? '✅' : '(kurang ' + (30 - len) + ' lagi)'}`;
          });
        }

        let savedLawang = null;
        try {
          const raw = localStorage.getItem('fincestem_materi_ft_day2_lawang_' + cleanNisn);
          if (raw) savedLawang = JSON.parse(raw);
        } catch (e) {}

        if (savedLawang && savedLawang.conclusion) {
          applyMateriLawangState(savedLawang.conclusion, savedLawang.savedAt);
        }
      }
    }

    function applyMateriAkpolState(text, savedAt) {
      const txt = document.getElementById('ftMateriAkpolConclusion');
      const badge = document.getElementById('ftMateriAkpolBadge');
      const timeEl = document.getElementById('ftMateriAkpolSavedTime');
      const saveBtn = document.getElementById('btnSaveMateriAkpol');
      const lockIcon = document.getElementById('iconLkpdAkpolLock');
      const lockTitle = document.getElementById('titleLkpdAkpolLock');
      const lockDesc = document.getElementById('descLkpdAkpolLock');
      const btnGo = document.getElementById('btnGoToLkpdAkpol');
      const textGo = document.getElementById('textGoToLkpdAkpol');

      if (txt) {
        txt.value = text;
        txt.setAttribute('disabled', 'disabled');
        txt.classList.add('bg-slate-100', 'cursor-not-allowed', 'text-slate-600');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300';
        badge.textContent = '🔒 Resume AKPOL Terkunci';
      }
      if (timeEl && savedAt) {
        const dtStr = new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        timeEl.textContent = `Tersimpan pada ${dtStr}`;
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Resume AKPOL Telah Terkunci</span>';
      }
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 1.2 Terbuka: LKPD AKPOL Semarang';
      if (lockDesc) lockDesc.textContent = 'Resume AKPOL telah tersimpan. Silakan kerjakan 5 soal esai LKPD AKPOL.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-[#006a61] hover:bg-teal-50 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() { window.location.href = 'lkpd.html?day=2&sesi=1'; };
      }
      if (textGo) textGo.textContent = 'Buka LKPD AKPOL';
    }

    function saveMateriConclusionAkpol() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const txt = document.getElementById('ftMateriAkpolConclusion');
      const text = txt ? txt.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan kesimpulan pemahaman materi AKPOL minimal 15–20 kata (30 karakter)!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriAkpol');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day2_akpol_' + nisn, JSON.stringify(record));
        localStorage.setItem('fincestem_materi_ft_day2_' + nisn, JSON.stringify(record));
      } catch (e) {}

      applyMateriAkpolState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(nisn, 2, 'materi', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Resume AKPOL Telah Terkunci', 'lock');
          }
          FincestemCore.ui.toast('Resume materi AKPOL berhasil disimpan! LKPD AKPOL sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Resume AKPOL Telah Terkunci', 'lock');
        }
        FincestemCore.ui.toast('Resume materi AKPOL berhasil disimpan! LKPD AKPOL sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdAkpol() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const saved = localStorage.getItem('fincestem_materi_ft_day2_akpol_' + nisn) || localStorage.getItem('fincestem_materi_ft_day2_' + nisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan pemahaman AKPOL sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftMateriAkpolConclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=2&sesi=1';
    }

    function applyMateriLawangState(text, savedAt) {
      const txt = document.getElementById('ftMateriLawangConclusion');
      const badge = document.getElementById('ftMateriLawangBadge');
      const timeEl = document.getElementById('ftMateriLawangSavedTime');
      const saveBtn = document.getElementById('btnSaveMateriLawang');
      const lockIcon = document.getElementById('iconLkpdLawangLock');
      const lockTitle = document.getElementById('titleLkpdLawangLock');
      const lockDesc = document.getElementById('descLkpdLawangLock');
      const btnGo = document.getElementById('btnGoToLkpdLawang');
      const textGo = document.getElementById('textGoToLkpdLawang');

      if (txt) {
        txt.value = text;
        txt.setAttribute('disabled', 'disabled');
        txt.classList.add('bg-slate-100', 'cursor-not-allowed', 'text-slate-600');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-white text-amber-950 border border-amber-300';
        badge.textContent = '🔒 Resume Lawang Sewu Terkunci';
      }
      if (timeEl && savedAt) {
        const dtStr = new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        timeEl.textContent = `Tersimpan pada ${dtStr}`;
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Resume Lawang Sewu Telah Terkunci</span>';
      }
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-white text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2.2 Terbuka: LKPD Lawang Sewu';
      if (lockDesc) lockDesc.textContent = 'Resume Lawang Sewu telah tersimpan. Silakan kerjakan 5 soal esai LKPD Lawang Sewu.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-amber-900 hover:bg-amber-100 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() { window.location.href = 'lkpd.html?day=2&sesi=2'; };
      }
      if (textGo) textGo.textContent = 'Buka LKPD Lawang Sewu';
    }

    function saveMateriConclusionLawang() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const txt = document.getElementById('ftMateriLawangConclusion');
      const text = txt ? txt.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan kesimpulan pemahaman materi Lawang Sewu minimal 15–20 kata (30 karakter)!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriLawang');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day2_lawang_' + nisn, JSON.stringify(record));
      } catch (e) {}

      applyMateriLawangState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(nisn, 2, 'materi_lawang', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Resume Lawang Sewu Telah Terkunci', 'lock');
          }
          FincestemCore.ui.toast('Resume materi Lawang Sewu berhasil disimpan! LKPD Lawang Sewu sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Resume Lawang Sewu Telah Terkunci', 'lock');
        }
        FincestemCore.ui.toast('Resume materi Lawang Sewu berhasil disimpan! LKPD Lawang Sewu sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdLawang() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const saved = localStorage.getItem('fincestem_materi_ft_day2_lawang_' + nisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan Lawang Sewu sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftMateriLawangConclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=2&sesi=2';
    }

    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 3 (KOTA BATU)
    // Sesi 1: Kebun Petik Apel Mandiri (Pagi)
    // Sesi 2: Jatim Park 1 - Science Center (Siang)
    // Sesi 3: Museum Angkut Kota Batu (Sore)
    // ==========================================
    let currentD3Session = 1;

    function checkIsD3Sesi1Done(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier, user.username].filter(Boolean);

        for (const id of ids) {
          // 0. Cek Dokumentasi Petik Apel
          if (localStorage.getItem("fincestem_dok_ft_day3_apel_" + id) === "true") return true;
          // 1. Cek LKPD Petik Apel (disubmit atau tersimpan)
          const lkpdRaw = localStorage.getItem('fincestem_lkpd_ft_day3_apel_' + id) || localStorage.getItem('fincestem_lkpd_ft_day3_' + id);
          if (lkpdRaw) {
            try {
              const p = JSON.parse(lkpdRaw);
              if (p && (p.submitted || p.varietas || p.applesEaten !== undefined)) return true;
            } catch(e) {}
          }
          // 2. Cek Asesmen Day 3
          const asesmenRaw = localStorage.getItem('fincestem_asesmen_ft_day3_' + id);
          if (asesmenRaw) return true;
          // 3. Cek Kesimpulan Modul Petik Apel
          const materiRaw = localStorage.getItem('fincestem_materi_ft_day3_apel_' + id);
          if (materiRaw) {
            try {
              const p = JSON.parse(materiRaw);
              if (p && (p.conclusion || p.text)) return true;
            } catch(e) {}
          }
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd'] || prog.task_map['3_materi'] || prog.task_map['3_asesmen']) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function checkIsD3Sesi2Done(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier, user.username].filter(Boolean);

        for (const id of ids) {
          if (localStorage.getItem("fincestem_refleksi_ft_d3_sesi2_" + id)) return true;
          if (localStorage.getItem("fincestem_lkpd_ft_day3_jtp1_" + id)) return true;
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd_jtp1'] || prog.task_map['3_materi_jtp1'] || prog.task_map['3_refleksi_jtp1']) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function renderDay3FieldTripModule(mainEl, targetSesi) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      const isS1Done = checkIsD3Sesi1Done(cleanNisn);
      const isS2Done = checkIsD3Sesi2Done(cleanNisn);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD3Session = Number(targetSesi);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const reqSesi = parseInt(urlParams.get('sesi'));
        if ((reqSesi === 2 || currentD3Session === 2) && isS1Done) {
          currentD3Session = 2;
        } else if ((reqSesi === 3 || currentD3Session === 3) && isS2Done) {
          currentD3Session = 3;
        } else {
          currentD3Session = 1;
        }
      }

      // Validasi proteksi sekuensial
      if (currentD3Session === 2 && !isS1Done) {
        currentD3Session = 1;
      } else if (currentD3Session === 3 && !isS2Done) {
        currentD3Session = isS1Done ? 2 : 1;
      }

      // 1. MENU TAB NAVIGASI UTAMA 3 SESI (DI ATAS)
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <!-- TAB 1: KEBUN PETIK APEL (SELALU TERBUKA) -->
          <button type="button" onclick="switchD3Session(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3Session === 1 ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40' : 'bg-slate-50 hover:bg-emerald-50 text-emerald-950 border border-emerald-300'}">
            <span class="material-symbols-outlined text-base ${currentD3Session === 1 ? 'text-amber-300' : 'text-emerald-600'}">nutrition</span>
            <span class="truncate">Sesi 1: Petik Apel Batu</span>
            ${isS1Done ? '<span class="text-[11px] text-emerald-200 font-bold ml-1">✓</span>' : (currentD3Session === 1 ? '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>' : '')}
          </button>

          <!-- TAB 2: JATIM PARK 1 (TERKUNCI / TERBUKA JIKA SESI 1 SELESAI) -->
          ${isS1Done ? `
            <button type="button" onclick="switchD3Session(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3Session === 2 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
              <span class="material-symbols-outlined text-base ${currentD3Session === 2 ? 'text-amber-300' : 'text-blue-600'}">science</span>
              <span class="truncate">Sesi 2: Jatim Park 1</span>
              ${isS2Done ? '<span class="text-[11px] text-blue-200 font-bold ml-1">✓</span>' : (currentD3Session === 2 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : '')}
            </button>
          ` : `
            <button type="button" onclick="handleLockedD3SessionClick(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" title="Sesi 2 terbuka setelah Sesi 1 Petik Apel selesai">
              <span class="material-symbols-outlined text-base text-slate-400">lock</span>
              <span class="truncate">Sesi 2: Jatim Park 1</span>
            </button>
          `}

          <!-- TAB 3: MUSEUM ANGKUT (TERKUNCI / TERBUKA JIKA SESI 2 SELESAI) -->
          ${isS2Done ? `
            <button type="button" onclick="switchD3Session(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3Session === 3 ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-400/40' : 'bg-slate-50 hover:bg-purple-50 text-purple-950 border border-purple-200'}">
              <span class="material-symbols-outlined text-base ${currentD3Session === 3 ? 'text-amber-300' : 'text-purple-600'}">directions_car</span>
              <span class="truncate">Sesi 3: Museum Angkut</span>
              ${currentD3Session === 3 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
            </button>
          ` : `
            <button type="button" onclick="handleLockedD3SessionClick(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" title="Sesi 3 terbuka setelah Sesi 2 Jatim Park 1 selesai">
              <span class="material-symbols-outlined text-base text-slate-400">lock</span>
              <span class="truncate">Sesi 3: Museum Angkut</span>
            </button>
          `}
        </div>
      `;

      let headerHtml = '';
      let bodyHtml = '';

      if (currentD3Session === 1) {
        // SESI 1: WISATA PETIK APEL BATU
        headerHtml = `
          <!-- BANNER MODUL FIELD TRIP DAY 3 - SESI 1 (WISATA PETIK APEL BATU) -->
          <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5 border border-emerald-700/40">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-emerald-100 backdrop-blur-md">
                Field Trip • Day 3 • Sesi 1
              </span>
              <span class="text-xs font-bold text-amber-300">Pilar: Sains Hortikultura, Sensor GPS &amp; Rekayasa Pertanian</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Eksplorasi Agrobisnis &amp; Sains Hortikultura Apel Kota Batu
            </h2>
            <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Pelajari sejarah budidaya apel pegunungan, etika pemetikan buah yang benar, agroklimat dataran tinggi (≥800 mdpl), pemanfaatan sensor satelit GPS/altimeter HP, rekayasa pelengkungan cabang &amp; perompesan daun, serta perhitungan konsumsi apel praktis.
            </p>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-emerald-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>08.00 - 10.30 WIB</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">pin_drop</span>
                <span>Kebun Apel Mandiri / Agrowisata Rakyat Batu</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">landscape</span>
                <span>Elevasi: ±900 - 1.100 mdpl</span>
              </span>
            </div>
          </div>
        `;

        bodyHtml = `
          <!-- BAGIAN I: PENGANTAR & PROFIL KEBUN APEL BATU -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-emerald-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
              <span class="material-symbols-outlined text-emerald-600 text-2xl">history_edu</span>
              <span>Bagian I: Sejarah, Profil Kebun &amp; Etika Pemetikan Buah</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <!-- Kolom Kiri: Sejarah & Ciri Apel Masak -->
              <div class="flex flex-col gap-3">
                <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col gap-2">
                  <span class="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                    <span class="material-symbols-outlined text-emerald-700 text-base">auto_stories</span>
                    Sejarah Apel di Dataran Tinggi Batu (Sejak 1930)
                  </span>
                  <p>
                    Tanaman apel pertama kali dibawa dan dibudidayakan di Kota Batu sekitar tahun <strong>1930-an pada era kolonial Belanda</strong>. Kawasan lereng Gunung Panderman, Arjuno, dan Welirang dipilih karena memiliki kesamaan iklim sejuk dengan wilayah subtropis di Eropa. Sejak era 1960-an, budidaya apel bertransformasi menjadi komoditas rakyat kebanggaan Malang Raya hingga Batu dijuluki sebagai <em>"Kota Apel"</em>.
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col gap-2.5">
                  <span class="font-black text-teal-950 flex items-center gap-1.5 text-sm border-b border-teal-200/80 pb-1.5">
                    <span class="material-symbols-outlined text-teal-700 text-base">check_circle</span>
                    CIRI-CIRI APEL YANG MASAK
                  </span>
                  <div class="flex flex-col gap-2 pt-0.5">
                    <div class="flex items-start gap-2.5">
                      <span class="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">1</span>
                      <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Apel yang masak berwarna merah.</span>
                    </div>
                    <div class="flex items-start gap-2.5">
                      <span class="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">2</span>
                      <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Jika masih baru dipetik, rasanya masih ada rasa asam.</span>
                    </div>
                    <div class="flex items-start gap-2.5">
                      <span class="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">3</span>
                      <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Apel akan terasa lebih manis setelah disimpan selama 2–3 hari.</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Kolom Kanan: PETUNJUK MEMETIK APEL -->
              <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col gap-2.5 shadow-2xs">
                <div class="flex items-center justify-between flex-wrap gap-1 border-b border-amber-200/80 pb-2">
                  <span class="font-black text-amber-950 flex items-center gap-1.5 text-sm sm:text-base">
                    <span class="material-symbols-outlined text-amber-700 text-lg">pan_tool</span>
                    PETUNJUK MEMETIK APEL
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200/80 text-amber-900 uppercase">
                    SOP Kebun
                  </span>
                </div>

                <div class="flex flex-col gap-2.5 pt-1">
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">1</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Buah yang masak berwarna merah/kuning.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">2</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Tangan kiri memegang tangkai apel, tangan kanan memegang buah apel.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">3</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Buah diputar sampai apel terlepas.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">4</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Apabila buah bergerombol, cara memetiknya cukup diputar saja.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">5</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Jangan menarik terlalu kuat atau mematahkan tangkai, karena tangkai diperlukan untuk reproduksi apel yang baru.</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">6</span>
                    <span class="text-xs sm:text-[12.5px] text-slate-800 font-medium leading-relaxed">Jika ada buah yang terjatuh saat pemetikan, mohon kerja samanya untuk diambil dan dimasukkan ke dalam wadah.</span>
                  </div>
                </div>

                <div class="mt-1 p-2 rounded-xl bg-white/90 border border-amber-300 text-[11px] text-amber-900 font-semibold italic flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-amber-600 shrink-0">info</span>
                  <span>Tangkai buah diperlukan untuk reproduksi apel baru. Menjaga tangkai berarti menjaga kelangsungan panen kebun!</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BAGIAN II: INVESTIGASI 4 PILAR STEM PERKEBUNAN APEL -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div class="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
                <span class="material-symbols-outlined text-teal-600 text-2xl">hub</span>
                <span>Bagian II: Investigasi 4 Pilar FINCESTEM Kebun Apel</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                Science • Technology • Engineering • Math
              </span>
            </div>

            <!-- 1. SCIENCE (SAINS) -->
            <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-teal-950 font-extrabold text-sm sm:text-base">
                <span class="material-symbols-outlined text-teal-700 text-xl">biotech</span>
                <span>1. Sains Agroklimat &amp; 3 Varietas Apel Unggulan</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pohon apel membutuhkan agroklimat khusus: ketinggian <strong>≥ 800 s.d. 1.200 mdpl</strong>, suhu rata-rata <strong>16°C – 22°C</strong>, kelembaban udara 75–85%, dan jenis tanah vulkanik Andosol yang kaya bahan organik dari letusan gunung berapi. Selama proses pematangan, sinar matahari memicu fotosintesis aktif yang mengubah cadangan pati menjadi gula alami (glukosa dan fruktosa) sehingga buah menjadi manis dan berair.
              </p>

              <!-- Karakteristik 3 Varietas Apel -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div class="p-3 rounded-xl bg-white border border-emerald-300 flex flex-col gap-1.5 shadow-2xs">
                  <div class="flex items-center justify-between">
                    <span class="font-black text-emerald-900 text-sm">🍏 Apel Manalagi</span>
                    <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">Favorit Manis</span>
                  </div>
                  <p class="text-slate-600 text-[11.5px] leading-relaxed">
                    <strong>Ciri Fisik:</strong> Kulit hijau kekuningan dengan bintik pori putih halus. Bentuk agak bulat.<br>
                    <strong>Rasa &amp; Tekstur:</strong> Daging buah putih padat, renyah, beraroma sangat harum, rasa manis dominan tanpa asam.
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-white border border-rose-300 flex flex-col gap-1.5 shadow-2xs">
                  <div class="flex items-center justify-between">
                    <span class="font-black text-rose-900 text-sm">🍎 Rome Beauty</span>
                    <span class="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">Asam Segar</span>
                  </div>
                  <p class="text-slate-600 text-[11.5px] leading-relaxed">
                    <strong>Ciri Fisik:</strong> Kulit merah semburat hijau di pangkal buah, bentuk bulat agak pipih.<br>
                    <strong>Rasa &amp; Tekstur:</strong> Daging buah agak renyah berserat, kandungan air tinggi, rasa manis bercampur asam segar. Sangat cocok diolah menjadi sari apel.
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-white border border-red-300 flex flex-col gap-1.5 shadow-2xs">
                  <div class="flex items-center justify-between">
                    <span class="font-black text-red-900 text-sm">🍎 Apel Anna</span>
                    <span class="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-bold">Merona Eksotis</span>
                  </div>
                  <p class="text-slate-600 text-[11.5px] leading-relaxed">
                    <strong>Ciri Fisik:</strong> Kulit merah merona gradasi kuning kehijauan, bentuk agak lonjong dengan lekukan khas.<br>
                    <strong>Rasa &amp; Tekstur:</strong> Daging buah renyah berair, rasa asam-manis segar seimbang dengan aroma buah yang khas.
                  </p>
                </div>
              </div>
            </div>

            <!-- 2. TECHNOLOGY (TEKNOLOGI) -->
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-blue-950 font-extrabold text-sm sm:text-base">
                <span class="material-symbols-outlined text-blue-700 text-xl">satellite_alt</span>
                <span>2. Teknologi: Sensor Satelit GPS &amp; Altimeter Digital Smartphone</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Dalam riset lapangan ini, siswa membuktikan kondisi agroklimat kebun apel secara ilmiah menggunakan <strong>chip sensor satelit GNSS/GPS dan barometer altimeter digital</strong> yang tertanam pada perangkat smartphone masing-masing:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <div class="p-3 rounded-xl bg-white border border-blue-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-extrabold text-blue-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-blue-600 text-sm">my_location</span>
                    Penetapan Koordinat Geografis (Lintang &amp; Bujur)
                  </span>
                  <p class="text-[11.5px] text-slate-600 leading-relaxed">
                    Modul GPS smartphone menangkap sinyal dari minimal 4 satelit navigasi bumi untuk menghitung triangulasi posisi lintang (latitude) dan bujur (longitude) kebun apel dengan akurasi tinggi hingga ±3 meter.
                  </p>
                </div>
                <div class="p-3 rounded-xl bg-white border border-blue-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-extrabold text-blue-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-blue-600 text-sm">landscape</span>
                    Pengukuran Ketinggian Elevasi Altimeter (mdpl)
                  </span>
                  <p class="text-[11.5px] text-slate-600 leading-relaxed">
                    Sensor altimeter membaca ketinggian riil kebun di atas permukaan laut. Siswa mencocokkan hasil sensor untuk membuktikan kebenaran hipotesis sains bahwa kebun apel berada pada elevasi dataran tinggi pegunungan <strong>≥ 800 mdpl</strong>.
                  </p>
                </div>
              </div>
            </div>

            <!-- 3. ENGINEERING (REKAYASA BUDIDAYA PERTANIAN) -->
            <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-amber-950 font-extrabold text-sm sm:text-base">
                <span class="material-symbols-outlined text-amber-700 text-xl">precision_manufacturing</span>
                <span>3. Rekayasa Pertanian: Branch Bending, Perompesan Daun &amp; Okulasi</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pohon apel aslinya berasal dari negara 4 musim. Agar pohon apel mampu berbunga dan berbuah lebat di iklim tropis Indonesia, petani Kota Batu menerapkan 3 teknik rekayasa hortikultura cerdas:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-700">
                <div class="p-3 rounded-xl bg-white border border-amber-300 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-black text-amber-950 text-xs flex items-center gap-1">
                    <span class="material-symbols-outlined text-amber-600 text-sm">straighten</span>
                    Pelengkungan Cabang (Branch Bending)
                  </span>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Cabang primer dilengkungkan mendatar (sudut 60°–90°) menggunakan tali pengikat atau pemberat. Rekayasa ini memperlambat dominasi apikal hormon auksin ke atas, sehingga merangsang mata tunas bunga dan buah tumbuh merata di sepanjang ranting.
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-white border border-amber-300 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-black text-amber-950 text-xs flex items-center gap-1">
                    <span class="material-symbols-outlined text-amber-600 text-sm">content_cut</span>
                    Perompesan Daun (Defoliasi Buatan)
                  </span>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Karena Indonesia tidak memiliki musim gugur alami, petani merontokkan/merompes daun tua secara manual setelah panen. Defoliasi buatan ini memecah masa istirahat (dormansi) tunas, merangsang pembungaan serentak sehingga apel bisa dipanen <strong>2 kali setahun</strong>!
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-white border border-amber-300 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-black text-amber-950 text-xs flex items-center gap-1">
                    <span class="material-symbols-outlined text-amber-600 text-sm">join</span>
                    Sambung Okulasi (Grafting)
                  </span>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Menggabungkan batang bawah (rootstock) varietas liar yang perakarannya kokoh dan tahan penyakit tanah dengan mata tunas batang atas varietas unggul (Manalagi/Rome Beauty) untuk menghasilkan pohon kerdil cepat berbuah.
                  </p>
                </div>
              </div>
            </div>

            <!-- 4. MATHEMATICS (MATEMATIKA & FINANSIAL) -->
            <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-indigo-950 font-extrabold text-sm sm:text-base">
                <span class="material-symbols-outlined text-indigo-700 text-xl">calculate</span>
                <span>4. Matematika Praktis: Konversi Butir ke Kilogram &amp; Analisis Tiket Masuk</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Di dalam kebun apel, siswa tidak membawa timbangan duduk. Oleh karena itu, diterapkan estimasi matematika praktis berbasis rata-rata agrikultur:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-700">
                <div class="p-3 rounded-xl bg-white border border-indigo-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-extrabold text-indigo-950">Standar Rasio Butir : Kilogram</span>
                  <p class="text-[11.5px] text-slate-600 leading-relaxed">
                    Rata-rata <strong>1 kg apel berisi 8 butir buah</strong> ukuran sedang (bobot rata-rata 120–130 gram per butir). Rumus konversi berat:
                  </p>
                  <div class="p-1.5 rounded-lg bg-indigo-50 border border-indigo-200 font-mono text-[11px] text-indigo-900 font-bold text-center">
                    Berat (kg) = Jumlah Butir ÷ 8
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-white border border-indigo-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-extrabold text-indigo-950">Wawancara Harga Petani</span>
                  <p class="text-[11.5px] text-slate-600 leading-relaxed">
                    Siswa mewawancarai langsung petani pemilik kebun mengenai harga apel petik segar per kilogram (berkisar <strong>Rp 35.000 – Rp 40.000 / kg</strong>) untuk dimasukkan ke dalam perhitungan LKPD.
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-white border border-indigo-200 flex flex-col gap-1 shadow-2xs">
                  <span class="font-extrabold text-indigo-950">Analisis Titik Impas Tiket (BEP)</span>
                  <p class="text-[11.5px] text-slate-600 leading-relaxed">
                    Tiket masuk kebun berkisar <strong>Rp 25.000 / siswa</strong> (makan apel sepuasnya di kebun). Dengan harga apel kebun Rp 35.000 – Rp 40.000 / kg, jika siswa memakan 5–6 butir apel (sekitar 0,65 – 0,75 kg bernilai Rp 26.000 – Rp 30.000), siswa sudah mencapai titik impas (Break-Even Point) dari biaya tiket masuk yang dibayarkan!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- BAGIAN III: RANGKUMAN KESIMPULAN & PEMBUKAAN LKPD DAY 3 SESI 1 -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div class="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
                <span class="material-symbols-outlined text-emerald-600 text-2xl">edit_note</span>
                <span>Bagian III: Rangkuman Resume &amp; Pembukaan LKPD Petik Apel</span>
              </div>
              <span id="ftMateriApelStatusBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                Wajib Disimpan (Tahap 1)
              </span>
            </div>

            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Tuliskan resume pemahaman Anda mengenai prinsip agroklimat kebun apel, teknologi sensor GPS/altimeter HP, dan salah satu teknik rekayasa budidaya (branch bending / defoliasi) yang paling menarik perhatian Anda (minimal 15–20 kata). Resume ini wajib disimpan untuk membuka akses ke LKPD Day 3 Sesi 1.
            </p>

            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <label for="ftMateriApelConclusion" class="text-slate-800 font-bold">Resume Catatan Pemahaman Siswa:</label>
                <span id="ftMateriApelSavedTime" class="text-[11px] text-slate-400">Belum disimpan</span>
              </div>
              <textarea id="ftMateriApelConclusion" rows="4" class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400 leading-relaxed" placeholder="Contoh: Dari pengamatan kebun apel Batu, saya belajar bahwa pohon apel memerlukan suhu sejuk pegunungan (≥800 mdpl) dan tanah vulkanik. Petani melakukan pelengkungan cabang (branch bending) mendatar agar hormon auksin merata sehingga memicu pembungaan serentak di sepanjang ranting..."></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button id="btnSaveMateriApelConclusion" type="button" onclick="saveDay3PetikApelConclusion()" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">task_alt</span>
                <span id="btnSaveMateriApelText">Simpan Kesimpulan &amp; Buka LKPD Petik Apel</span>
              </button>

              <button type="button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-all">
                <span class="material-symbols-outlined text-base">arrow_upward</span>
                <span>Kembali ke Atas</span>
              </button>
            </div>

            <!-- Kartu Akses Terbuka ke LKPD Day 3 Sesi 1 -->
            <div id="ftLkpdApelAccessBox" class="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <span id="ftLkpdApelLockIcon" class="material-symbols-outlined text-amber-200 text-xl">lock</span>
                </div>
                <div class="flex flex-col">
                  <span id="ftLkpdApelLockTitle" class="font-extrabold text-sm sm:text-base leading-snug">
                    Tahap 2: LKPD Petik Apel Mandiri Day 3
                  </span>
                  <p id="ftLkpdApelLockDesc" class="text-xs text-emerald-100/90 leading-relaxed mt-0.5">
                    Selesaikan dan simpan kesimpulan modul di atas terlebih dahulu untuk membuka akses lembar kerja.
                  </p>
                </div>
              </div>
              <button id="btnGoToLkpdApel" type="button" onclick="handleGoToLkpdPetikApel()" class="px-5 py-3 rounded-2xl bg-white/40 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60">
                <span class="material-symbols-outlined text-base">assignment</span>
                <span id="btnGoToLkpdApelText">LKPD Terkunci</span>
              </button>
            </div>
          </div>
        `;
      } else if (currentD3Session === 2) {
        // SESI 2: JATIM PARK 1 (SCIENCE CENTER & REKREASI)
        headerHtml = `
          <div class="bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3 border border-blue-700/40">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-blue-100 backdrop-blur-md">
                Field Trip • Day 3 • Sesi 2
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-300 text-slate-950">
                Pilar: Sains, Budaya Nusantara &amp; Rekreasi Wisata
              </span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Eksplorasi Edukatif &amp; Wisata Rekreasi Jawa Timur Park 1
            </h2>
            <p class="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
              Eksplorasi Mandiri &amp; Wisata Bebas: Peragaan Fisika Science Stadium, Anatomi Manusia, Galeri Etnografi 38 Provinsi, serta Wahana Rekreasi dan Kekompakan Sahabat.
            </p>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-blue-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>13.00 - 15.30 WIB</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">pin_drop</span>
                <span>Jawa Timur Park 1, Kota Batu</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">attractions</span>
                <span>Wisata Murni (Bebas LKPD Hitungan)</span>
              </span>
            </div>
          </div>
        `;

        bodyHtml = `
          <div class="flex flex-col gap-5 sm:gap-6">
            <!-- PENGANTAR UMUM JATIM PARK 1 -->
            <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-3.5">
              <div class="flex items-center gap-2.5 text-blue-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                <span class="material-symbols-outlined text-blue-600 text-2xl">fort</span>
                <span>1. Mengenal Jawa Timur Park 1: Pelopor Edu-Tourism Indonesia</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Jawa Timur Park 1 (JTP 1)</strong> adalah pelopor taman rekreasi edukatif terpadu modern di Kota Batu yang beroperasi sejak tahun 2001. Mengusung konsep <em>Edu-Tourism</em>, tempat ini dirancang untuk memadukan laboratorium sains interaktif, museum etnografi kebudayaan Indonesia, serta puluhan wahana ketangkasan dan permainan luar ruang dalam satu kawasan yang menyenangkan.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col gap-1">
                  <div class="flex items-center gap-1.5 font-black text-blue-950">
                    <span class="material-symbols-outlined text-blue-600 text-base">science</span>
                    <span>Science Stadium</span>
                  </div>
                  <span class="text-slate-600 text-[11px] leading-snug">Laboratorium peraga hukum fisika, kimia, optik, dan biologi interaktif.</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-1">
                  <div class="flex items-center gap-1.5 font-black text-amber-950">
                    <span class="material-symbols-outlined text-amber-600 text-base">diversity_3</span>
                    <span>Galeri Budaya Etnik</span>
                  </div>
                  <span class="text-slate-600 text-[11px] leading-snug">Replika rumah adat, pakaian tradisional, dan artefak 38 provinsi nusantara.</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col gap-1">
                  <div class="flex items-center gap-1.5 font-black text-emerald-950">
                    <span class="material-symbols-outlined text-emerald-600 text-base">attractions</span>
                    <span>Amusement &amp; Waterpark</span>
                  </div>
                  <span class="text-slate-600 text-[11px] leading-snug">Wahana rekreasi ketangkasan pemacu adrenalin dan kolam renang air pegunungan.</span>
                </div>
              </div>
            </div>

            <!-- TIGA ZONA UTAMA EKSPLORASI -->
            <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
              <div class="flex items-center gap-2.5 text-blue-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                <span class="material-symbols-outlined text-indigo-600 text-2xl">explore</span>
                <span>2. Tiga Zona Wisata Edukasi yang Wajib Kamu Kunjungi</span>
              </div>

              <!-- Zona 1: Science Stadium -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <span class="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">A</span>
                    <span>Science Stadium: Menikmati Sains Secara Nyata</span>
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-100 text-blue-900">Pilar STEM</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Di zona ini, teori-teori fisika dan biologi yang ada di buku pelajaran dapat kamu coba langsung dengan tanganmu sendiri:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                    <span class="material-symbols-outlined text-blue-600 text-base mt-0.5">bolt</span>
                    <div>
                      <strong class="text-slate-900 block font-bold">Listrik Statis &amp; Magnet:</strong>
                      <span class="text-slate-600">Generator Van de Graaff yang membuat rambut berdiri dan peragaan induksi elektromagnetik.</span>
                    </div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                    <span class="material-symbols-outlined text-blue-600 text-base mt-0.5">cyclone</span>
                    <div>
                      <strong class="text-slate-900 block font-bold">Gaya Sentrifugal &amp; Fluida:</strong>
                      <span class="text-slate-600">Simulator tornado buatan, pipa venturi, dan lintasan gravitasi mekanika gerak.</span>
                    </div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                    <span class="material-symbols-outlined text-blue-600 text-base mt-0.5">visibility</span>
                    <div>
                      <strong class="text-slate-900 block font-bold">Ilusi Optika &amp; Resonansi:</strong>
                      <span class="text-slate-600">Cermin cekung/cembung tak hingga, ruang gravitasi terbalik, dan osilasi bunyi garputala.</span>
                    </div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                    <span class="material-symbols-outlined text-blue-600 text-base mt-0.5">skeleton</span>
                    <div>
                      <strong class="text-slate-900 block font-bold">Anatomi Manusia &amp; Geologi:</strong>
                      <span class="text-slate-600">Replika kerangka tulang, model organ sirkulasi/respirasi, serta diorama gunung api vulkanik Jawa Timur.</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Zona 2: Etnografi Budaya Nusantara -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <span class="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center">B</span>
                    <span>Galeri Etnografi Budaya: Keliling Nusantara dalam 1 Jam</span>
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-100 text-amber-900">Pilar Culture</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Menyajikan miniatur Indonesia yang luar biasa kaya. Kamu dapat mengamati secara langsung replika arsitektur rumah adat dari 38 provinsi (seperti Rumah Gadang Minangkabau, Tongkonan Toraja, Joglo Jawa, hingga Honai Papua), pakaian pernikahan adat daerah, dan aneka senjata pusaka nusantara. Ini adalah spot foto budaya terbaik untuk mengabadikan kebanggaan kita pada warisan bangsa!
                </p>
              </div>

              <!-- Zona 3: Rekreasi & Ketangkasan -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <span class="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">C</span>
                    <span>Wahana Rekreasi &amp; Melatih Keberanian</span>
                  </span>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">Pilar Exploration</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Bagi yang menyukai tantangan, puluhan wahana menanti untuk dicoba bersama sahabat: <em>Roller Coaster, Flying Tornado, 360° Pendulum, Sky Swinger, Sky Ride</em>, hingga area kolam renang air sejuk pegunungan. Wahana ini menguji nyali, melatih keberanian mengendalikan rasa takut, dan menciptakan momen kebersamaan yang tidak terlupakan seumur hidup!
                </p>
              </div>
            </div>

            <!-- ETIKA WISATAWAN PELAJAR BERADAB -->
            <div class="p-5 sm:p-6 rounded-3xl bg-amber-50/80 border border-amber-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg border-b border-amber-200/60 pb-2.5">
                <span class="material-symbols-outlined text-amber-700 text-2xl">verified_user</span>
                <span>3. Panduan Etika &amp; Keselamatan Pelajar di Jatim Park 1</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-800">
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-emerald-600 text-lg mt-0.5">delete_outline</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Zero Littering (Jaga Kebersihan):</strong>
                    <span>Selalu buang bungkus makanan, botol minuman, dan tisu ke tempat sampah yang tersedia.</span>
                  </div>
                </div>
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-blue-600 text-lg mt-0.5">group</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Tertib Antrean:</strong>
                    <span>Sabar mengantre di setiap wahana permainan. Jangan menyerobot antrean pengunjung lain.</span>
                  </div>
                </div>
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-rose-600 text-lg mt-0.5">health_and_safety</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Patuhi Syarat Wahana:</strong>
                    <span>Perhatikan batasan tinggi badan dan kondisi kesehatan (jantung/vertigo) sebelum menaiki wahana ekstrem.</span>
                  </div>
                </div>
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-purple-600 text-lg mt-0.5">schedule</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Tepat Waktu Berkumpul:</strong>
                    <span>Perhatikan jam kumpul yang ditentukan Tour Leader &amp; Guru Pendamping untuk keberangkatan ke Museum Angkut (Sesi 3).</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- KARTU INFORMASI WISATA MURNI & BEBAS LKPD -->
            <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-lg flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl text-amber-300">celebration</span>
                </div>
                <div>
                  <span class="text-xs font-black uppercase text-blue-200 tracking-wider">Waktu Rekreasi Bebas</span>
                  <h3 class="text-lg font-black text-white">Sesi 2 Murni Berwisata &amp; Eksplorasi Seru!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Di Sesi 2 ini, <strong>tidak ada lembar kerja tertulis (LKPD) yang membebani</strong>. Manfaatkan waktu ini sebaik-baiknya untuk menikmati wahana bersama teman-teman!
                <br>Setelah puas bermain dan berkeliling, cukup unggah <strong>1 foto dokumentasi kegiatan keseruanmu</strong> dan tuliskan <strong>refleksi singkat kesan berwisata</strong> di halaman Dokumentasi.
              </p>

              <div class="pt-2">
                <button type="button" onclick="handleGoToDokumentasiJtp1()" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-xl">photo_camera</span>
                  <span>Buka Dokumentasi &amp; Refleksi Rekreasi Sesi 2 &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        `;
      } else if (currentD3Session === 3) {
        // ==========================================
        // SESI 3: MUSEUM ANGKUT KOTA BATU (LENGKAP)
        // ==========================================
        headerHtml = `
          <div class="bg-gradient-to-br from-purple-800 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5 border border-purple-700/40">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-purple-100 backdrop-blur-md">
                Field Trip • Day 3 • Sesi 3
              </span>
              <span class="text-xs font-bold text-amber-300">Pilar Utama: STEM (Engineering &amp; Transportation)</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Eksplorasi Sains &amp; Rekayasa Transportasi Museum Angkut
            </h2>
            <p class="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-medium">
              Investigasi sejarah revolusi industri alat transportasi dunia, aerodinamika fluida, evolusi mesin pembakaran hingga mobil listrik, serta rekayasa keselamatan otomotif.
            </p>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-purple-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>15.45 - 18.30 WIB</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">pin_drop</span>
                <span>Museum Angkut Kota Batu</span>
              </span>
            </div>
          </div>
        `;

        bodyHtml = `
          <div class="flex flex-col gap-4 sm:gap-5">
            <!-- 1. SEKILAS MUSEUM ANGKUT -->
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3">
              <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
                <span class="material-symbols-outlined text-purple-600 text-2xl">museum</span>
                <span>1. Sekilas Museum Angkut Kota Batu</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Museum Angkut adalah museum transportasi pertama dan terbesar di Asia Tenggara dengan luas lebih dari 3,8 hektar dan menyimpan lebih dari 300 koleksi kendaraan tradisional hingga modern. Di museum ini, siswa diajak mempelajari lompatan peradaban manusia dalam memecahkan tantangan mobilitas jarak dan waktu melalui integrasi sains, teknologi mesin, rekayasa desain, dan matematika (<strong>STEM</strong>).
              </p>
            </div>

            <!-- 2. EMPAT ZONA EKSPLORASI UTAMA -->
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
              <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
                <span class="material-symbols-outlined text-purple-600 text-2xl">explore</span>
                <span>2. Empat Zona Eksplorasi Utama di Museum Angkut</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-800">
                <!-- Zona 1: Hall Batavia & Sejarah RI -->
                <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 text-purple-950 font-bold text-sm">
                    <span class="material-symbols-outlined text-purple-700 text-lg">flag</span>
                    <span>A. Hall Utama &amp; Koleksi Sejarah RI</span>
                  </div>
                  <p class="text-[11.5px] text-slate-700 leading-relaxed">
                    Menampilkan kendaraan bersejarah saksi kemerdekaan bangsa, termasuk <strong>Mobil Kepresidenan Pertama RI (Chrysler Windsor Limousine 1947)</strong> yang digunakan Presiden Ir. Soekarno, serta Helikopter Kepresidenan pertama Bell 47J Si Walet. Siswa dapat mengamati sasis baja kokoh dan rekayasa mesin 6-silinder tangguh di era awal kemerdekaan.
                  </p>
                </div>

                <!-- Zona 2: Edukasi & Rekayasa Mesin -->
                <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 text-blue-950 font-bold text-sm">
                    <span class="material-symbols-outlined text-blue-700 text-lg">precision_manufacturing</span>
                    <span>B. Zona Edukasi &amp; Rekayasa Mesin</span>
                  </div>
                  <p class="text-[11.5px] text-slate-700 leading-relaxed">
                    Menyajikan bedah mekanisme ruang bakar mesin: dari mesin uap eksternal (James Watt), mesin pembakaran dalam 4-tak (Internal Combustion Engine), hingga motor listrik modern. Siswa dapat memahami komponen transmisi, poros engkol, dan sistem injeksi bahan bakar elektronik (EFI).
                  </p>
                </div>

                <!-- Zona 3: Aviasi & Dirgantara -->
                <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 text-sky-950 font-bold text-sm">
                    <span class="material-symbols-outlined text-sky-700 text-lg">flight</span>
                    <span>C. Zona Aviasi &amp; Dirgantara (Rooftop)</span>
                  </div>
                  <p class="text-[11.5px] text-slate-700 leading-relaxed">
                    Menampilkan pesawat terbang komersial Boeing 737-200 dan helikopter di lantai atas. Siswa dapat mengamati langsung penampang sayap aerodinamis (airfoil), turbin jet pendorong, dan kokpit instrumen kendali penerbangan.
                  </p>
                </div>

                <!-- Zona 4: Mancanegara Broadway & Eropa -->
                <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 text-amber-950 font-bold text-sm">
                    <span class="material-symbols-outlined text-amber-700 text-lg">directions_car</span>
                    <span>D. Zona Mancanegara (USA &amp; Eropa)</span>
                  </div>
                  <p class="text-[11.5px] text-slate-700 leading-relaxed">
                    Menampilkan deretan mobil legendaris dunia: <em>Ford Model T (1908)</em> sebagai pionir produksi massal, mobil klasik Amerika era Gangster 1930, mobil balap Italia/Jerman, hingga bus tingkat klasik London, memperlihatkan evolusi bodi kendaraan dunia.
                  </p>
                </div>
              </div>
            </div>

            <!-- 3. EMPAT PILAR STEM TRANSPORTASI -->
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
              <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
                <span class="material-symbols-outlined text-emerald-600 text-2xl">science</span>
                <span>3. Empat Pilar STEM dalam Dunia Transportasi</span>
              </div>

              <div class="space-y-3 text-xs text-slate-800">
                <!-- Science -->
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span class="font-extrabold text-sm text-purple-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">S</span>
                    <span>SCIENCE: Aerodinamika Bodi &amp; Gaya Angkat Bernoulli</span>
                  </span>
                  <div class="text-[11.5px] text-slate-700 leading-relaxed space-y-1.5">
                    <p>• <strong>Gaya Hambat Udara (Drag Force):</strong> Mobil era 1920-an berbentuk kotak kaku dengan koefisien drag tinggi (Cd ≈ 0,8) sehingga boros bensin. Mobil modern berevolusi melengkung ramping (streamlined, Cd ≈ 0,28) membelah udara secara laminar, menghemat konsumsi energi lebih dari 30%.</p>
                    <p>• <strong>Hukum Bernoulli pada Pesawat Boeing 737:</strong> Penampang sayap atas yang melengkung membuat aliran udara bergerak lebih cepat dibanding sisi bawah sayap. Tekanan udara di atas sayap menjadi lebih rendah, menghasilkan gaya angkat (Lift Force) yang menerbangkan pesawat puluhan ton.</p>
                  </div>
                </div>

                <!-- Technology -->
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span class="font-extrabold text-sm text-blue-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">T</span>
                    <span>TECHNOLOGY: Powertrain Mesin Uap, ICE &amp; Mobil Listrik (EV)</span>
                  </span>
                  <div class="text-[11.5px] text-slate-700 leading-relaxed space-y-1.5">
                    <p>• <strong>Evolusi Mesin:</strong> Dari mesin uap eksternal (efisiensi termal rendah ~10%), mesin pembakaran dalam 4-tak (Internal Combustion Engine efisiensi ~25-35%), hingga motor induksi listrik (EV) bertenaga baterai Lithium-Ion dengan efisiensi konversi energi di atas 85% tanpa emisi gas buang langsung.</p>
                    <p>• <strong>Sensor &amp; ECU:</strong> Transisi dari karburator mekanik konvensional ke injeksi bahan bakar elektronik (EFI) yang dikontrol komputer mesin (Engine Control Unit) secara presisi tinggi.</p>
                  </div>
                </div>

                <!-- Engineering -->
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span class="font-extrabold text-sm text-emerald-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">E</span>
                    <span>ENGINEERING: Material Sasis Ringan &amp; Crumple Zone</span>
                  </span>
                  <div class="text-[11.5px] text-slate-700 leading-relaxed space-y-1.5">
                    <p>• <strong>Rekayasa Material:</strong> Bodi mobil antik era 1930 menggunakan pelat baja tebal masif yang sangat berat. Mobil modern merekayasa paduan aluminium (alloy) dan serat karbon (carbon fiber) yang berkekuatan tarik tinggi namun 50% lebih ringan.</p>
                    <p>• <strong>Crumple Zone (Zona Redam Benturan):</strong> Moncong mobil modern sengaja dibuat ringsek saat tabrakan keras. Berdasarkan hukum Impuls (F · Δt = m · Δv), dengan memperpanjang waktu deformasi (Δt), gaya benturan (F) yang dialami penumpang di kabin berkurang drastis sehingga menyelamatkan nyawa.</p>
                  </div>
                </div>

                <!-- Mathematics -->
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span class="font-extrabold text-sm text-amber-900 flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center">M</span>
                    <span>MATHEMATICS: Power-to-Weight Ratio &amp; Konsumsi Bahan Bakar</span>
                  </span>
                  <div class="text-[11.5px] text-slate-700 leading-relaxed space-y-1.5">
                    <p>• <strong>Power-to-Weight Ratio (PWR):</strong> Dihitung dengan rumus <code>PWR = Tenaga (HP) / Massa (kg)</code>. Makin tinggi nilai PWR, makin lincah akselerasi mobil dan makin efisien energi yang dibutuhkan untuk memindahkan beban.</p>
                    <p>• <strong>Perhitungan BBM:</strong> Dihitung dengan rumus <code>Kebutuhan Bensin (Liter) = Jarak Tempuh (km) / Efisiensi (km/liter)</code>.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. PANDUAN TATA TERTIB DI MUSEUM ANGKUT -->
            <div class="p-5 sm:p-6 rounded-3xl bg-amber-50/80 border border-amber-200 flex flex-col gap-3">
              <div class="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg border-b border-amber-200/60 pb-2.5">
                <span class="material-symbols-outlined text-amber-700 text-2xl">verified_user</span>
                <span>4. Panduan Etika &amp; Tata Tertib di Museum Angkut</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-800">
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-rose-600 text-lg mt-0.5">do_not_touch</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Jangan Sentuh/Naiki:</strong>
                    <span>Dilarang memanjat atau melewati batas pembatas (railing) kendaraan koleksi bersejarah.</span>
                  </div>
                </div>
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-blue-600 text-lg mt-0.5">flash_off</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Patuhi Rambu Foto:</strong>
                    <span>Matikan lampu kilat (flash) kamera pada spot koleksi bertanda khusus untuk melindungi cat antik.</span>
                  </div>
                </div>
                <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100">
                  <span class="material-symbols-outlined text-emerald-600 text-lg mt-0.5">schedule</span>
                  <div>
                    <strong class="text-amber-950 font-bold block">Disiplin Waktu Kumpul:</strong>
                    <span>Perhatikan instruksi jam berkumpul dari Guru Pendamping untuk persiapan keberangkatan menuju Bromo.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. FORM KESIMPULAN / CATATAN REFLEKTIF MODUL MUSEUM ANGKUT -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border-2 border-purple-300 shadow-md flex flex-col gap-3.5">
              <div class="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-purple-600 text-2xl">rate_review</span>
                  <h3 class="font-black text-base sm:text-lg text-primary">5. Catatan Reflektif Pemahaman Modul Sesi 3</h3>
                </div>
                <span id="ftMateriMuseumStatusBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  Belum Mengisi Kesimpulan
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Setelah mempelajari materi modul transportasi di atas, tuliskan resume pemahaman Anda (minimal 15–20 kata) mengenai penerapan konsep STEM pada kendaraan di Museum Angkut (misalnya pemahamanmu tentang bentuk aerodinamika bodi mobil, prinsip gaya angkat Bernoulli pada sayap pesawat, atau fungsi crumple zone bagi keselamatan penumpang):
              </p>

              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <label for="ftMateriMuseumConclusion" class="text-slate-800 font-bold">Resume Catatan Pemahaman Siswa:</label>
                  <span id="ftMateriMuseumSavedTime" class="text-[11px] text-slate-400">Belum disimpan</span>
                </div>
                <textarea id="ftMateriMuseumConclusion" rows="4" class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400 leading-relaxed" placeholder="Contoh: Dari modul Museum Angkut, saya memahami bahwa bodi mobil modern berevolusi menjadi melengkung aerodinamis untuk mengurangi koefisien hambatan udara (drag force) sehingga hemat bahan bakar. Pada pesawat Boeing 737, gaya angkat tercipta karena perbedaan kecepatan aliran udara di atas dan bawah sayap (Prinsip Bernoulli). Selain itu, rekayasa crumple zone sengaja dibuat ringsek saat tabrakan untuk memperpanjang waktu benturan sehingga meredam gaya impak pada penumpang..."></textarea>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button id="btnSaveMateriMuseumConclusion" type="button" onclick="saveDay3MuseumConclusion()" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-lg">task_alt</span>
                  <span id="btnSaveMateriMuseumText">Simpan Kesimpulan &amp; Buka LKPD Sesi 3</span>
                </button>
              </div>
            </div>

            <!-- 6. KARTU AKSES LKPD SESI 3 (TERKUNCI / TERBUKA BERDASARKAN KESIMPULAN) -->
            <div id="ftLkpdMuseumAccessBox" class="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-5 text-white shadow-md flex flex-col gap-3 text-center sm:text-left transition-all">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div class="flex items-center justify-center sm:justify-start gap-2">
                    <span id="ftLkpdMuseumLockIcon" class="material-symbols-outlined text-purple-300 text-xl">lock</span>
                    <h4 id="ftLkpdMuseumLockTitle" class="font-extrabold text-sm sm:text-base text-white">Tahap 2: LKPD Digital Day 3 Sesi 3</h4>
                  </div>
                  <p id="ftLkpdMuseumLockDesc" class="text-xs text-purple-200 mt-0.5">Selesaikan dan simpan kesimpulan modul di atas terlebih dahulu untuk membuka akses LKPD.</p>
                </div>
                <a id="btnGoToLkpdMuseum" href="javascript:void(0)" onclick="handleGoToLkpdMuseum()" class="px-5 py-3 rounded-2xl bg-white/20 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-not-allowed opacity-60">
                  <span id="btnGoToLkpdMuseumText">LKPD Masih Terkunci</span>
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }

      // Gabungkan keseluruhan layout Modul Day 3
      mainEl.innerHTML = `
        <div class="flex flex-col gap-4 sm:gap-5">
          ${renderFieldTripScheduleCard(3)}
          ${tabNavHtml}
          ${headerHtml}
          ${bodyHtml}
        </div>
      `;

      // Jika Sesi 1 aktif, pulihkan kesimpulan tersimpan
      if (currentD3Session === 1) {
        let savedConclusion = '';
        let savedAt = '';
        try {
          const raw = localStorage.getItem('fincestem_materi_ft_day3_apel_' + cleanNisn) ||
                      localStorage.getItem('fincestem_materi_ft_day3_' + cleanNisn);
          if (raw) {
            const p = JSON.parse(raw);
            savedConclusion = p.conclusion || p.text || '';
            savedAt = p.savedAt || '';
          }
        } catch(e) {}

        if (savedConclusion) {
          applyDay3PetikApelConclusionState(savedConclusion, savedAt);
        }
      } else if (currentD3Session === 3) {
        let savedConclusion = '';
        let savedAt = '';
        try {
          const raw = localStorage.getItem('fincestem_materi_ft_day3_museum_' + cleanNisn);
          if (raw) {
            const p = JSON.parse(raw);
            savedConclusion = p.conclusion || p.text || '';
            savedAt = p.savedAt || '';
          }
        } catch(e) {}

        if (savedConclusion) {
          applyDay3MuseumConclusionState(savedConclusion, savedAt);
        }
      }
    }

    function switchD3Session(sesi) {
      const user = FincestemCore.auth.getUser() || {};
      const cleanNisn = String(user.nisn || user.identifier || '').trim();
      const isS1Done = checkIsD3Sesi1Done(cleanNisn);
      const isS2Done = checkIsD3Sesi2Done(cleanNisn);

      const target = Number(sesi);
      if (target === 2 && !isS1Done) {
        FincestemCore.ui.toast('Sesi 2 (Jatim Park 1) masih terkunci! Anda wajib menyelesaikan Sesi 1 Petik Apel terlebih dahulu.', 'warning');
        return;
      }
      if (target === 3 && !isS2Done) {
        FincestemCore.ui.toast('Sesi 3 (Museum Angkut) masih terkunci! Anda wajib menyelesaikan Sesi 2 Jatim Park 1 terlebih dahulu.', 'warning');
        return;
      }

      currentD3Session = target;
      const mainEl = document.querySelector('main');
      if (mainEl) {
        renderDay3FieldTripModule(mainEl, currentD3Session);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }

    function handleLockedD3SessionClick(sesi) {
      if (sesi === 2) {
        FincestemCore.ui.toast('Sesi 2 (Jatim Park 1) masih terkunci! Selesaikan Modul & LKPD Sesi 1 Petik Apel terlebih dahulu.', 'warning');
      } else if (sesi === 3) {
        FincestemCore.ui.toast('Sesi 3 (Museum Angkut) masih terkunci! Selesaikan Sesi 2 Jatim Park 1 terlebih dahulu.', 'warning');
      }
    }

        function applyDay3PetikApelConclusionState(text, savedAt) {
      text = sanitizeConclusionText(text);
      const txtArea = document.getElementById('ftMateriApelConclusion');
      const badge = document.getElementById('ftMateriApelStatusBadge');
      const savedTimeEl = document.getElementById('ftMateriApelSavedTime');
      const btnSaveText = document.getElementById('btnSaveMateriApelText');
      const saveBtn = document.getElementById('btnSaveMateriApelConclusion');
      const lockIcon = document.getElementById('ftLkpdApelLockIcon');
      const lockTitle = document.getElementById('ftLkpdApelLockTitle');
      const lockDesc = document.getElementById('ftLkpdApelLockDesc');
      const btnGo = document.getElementById('btnGoToLkpdApel');
      const btnGoText = document.getElementById('btnGoToLkpdApelText');

      if (txtArea) {
        txtArea.value = text;
        txtArea.setAttribute('readonly', 'readonly');
        txtArea.classList.add('bg-slate-100', 'text-slate-600', 'cursor-not-allowed');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
        badge.textContent = 'Telah Disimpan & Terkunci (Tahap 1 Selesai)';
      }
      if (savedTimeEl) {
        savedTimeEl.textContent = savedAt ? `Disimpan: ${new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : 'Tersimpan';
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.classList.remove('hover:bg-emerald-700', 'cursor-pointer');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Kesimpulan Telah Terkunci</span>';
      } else if (btnSaveText) {
        btnSaveText.textContent = 'Kesimpulan Telah Terkunci';
      }

      // Aktifkan Akses ke LKPD Petik Apel
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2 Terbuka: LKPD Petik Apel Day 3 Sesi 1';
      if (lockDesc) lockDesc.textContent = 'Kesimpulan modul telah tersimpan. Silakan lanjutkan mengerjakan lembar kerja investigasi petik apel.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() {
          window.location.href = 'lkpd.html?day=3&sesi=1';
        };
      }
      if (btnGoText) btnGoText.textContent = 'Buka LKPD Petik Apel';
    }

    function saveDay3PetikApelConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txtArea = document.getElementById('ftMateriApelConclusion');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan resume pemahaman Anda minimal 15–20 kata sebelum melanjutkan!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriApelConclusion');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        day_number: 3,
        session: 1,
        location: 'Kebun Petik Apel Mandiri Batu',
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day3_apel_' + cleanNisn, JSON.stringify(record));
        localStorage.setItem('fincestem_materi_ft_day3_' + cleanNisn, JSON.stringify(record));
      } catch(e) {}

      applyDay3PetikApelConclusionState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 3, 'materi', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
          }
          FincestemCore.ui.toast('Resume Modul Petik Apel berhasil disimpan! LKPD Petik Apel sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
        }
        FincestemCore.ui.toast('Resume Modul Petik Apel berhasil disimpan! LKPD Petik Apel sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdPetikApel() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const saved = localStorage.getItem('fincestem_materi_ft_day3_apel_' + cleanNisn) ||
                    localStorage.getItem('fincestem_materi_ft_day3_' + cleanNisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan petik apel sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftMateriApelConclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=3&sesi=1';
    }

    // ==========================================
    
    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 4: GUNUNG BROMO (EXPLORATION & CULTURE)
    // ==========================================
    function renderDay4FieldTripModule(mainEl) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      let savedConclusion = '';
      let savedAt = '';
      try {
        const raw = localStorage.getItem('fincestem_materi_ft_day4_' + cleanNisn);
        if (raw) {
          const p = JSON.parse(raw);
          savedConclusion = p.conclusion || p.text || '';
          savedAt = p.savedAt || '';
        }
      } catch(e) {}

      mainEl.innerHTML = `
        <div class="flex flex-col gap-4 sm:gap-5">
          <!-- BANNER IDENTITAS DAY 4 BROMO -->
          <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3 border border-amber-600/40">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                Field Trip • Day 4 • Exploration &amp; Culture
              </span>
              <span id="ftMateriDay4StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${savedConclusion ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white'}">
                ${savedConclusion ? '✓ Kesimpulan Telah Disimpan' : 'Modul Eksplorasi &amp; Budaya Bromo'}
              </span>
            </div>

            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Modul Belajar Day 4: Eksplorasi Bentang Alam Vulkanik Kaldera Tengger &amp; Etnografi Budaya Suku Tengger
            </h2>
            <span class="text-xs sm:text-sm font-semibold text-amber-200 leading-snug">
              Kajian Geologi Kaldera Tengger, Ekosistem Taman Nasional Bromo Tengger Semeru (TNBTS), Pertanian Sayur Lereng, dan Kearifan Budaya Masyarakat Suku Tengger.
            </span>

            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-amber-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>03.30 - Selesai WIB</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">landscape</span>
                <span>Taman Nasional Bromo Tengger Semeru (TNBTS)</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">explore</span>
                <span>Exploration (50%) • Culture (50%)</span>
              </span>
            </div>
          </div>

          <!-- BAB 1: KONDISI FISIK GUNUNG BROMO -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-amber-600 text-2xl">volcano</span>
              <span>1. Kondisi Fisik Gunung Bromo</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal text-justify">
              <p>
                Gunung Bromo merupakan gunung api aktif di Jawa Timur yang berada dalam kompleks pegunungan Tengger dan kawasan Taman Nasional Bromo Tengger Semeru (TNBTS). Secara geografis, Bromo berhubungan dengan wilayah Kabupaten Probolinggo, Pasuruan, Malang, dan Lumajang. Letaknya di dataran tinggi menyebabkan udara relatif sejuk, terutama pada malam hingga dini hari, disertai kabut dan perubahan cuaca yang cukup cepat.
              </p>
              <p>
                Secara geologis, Bromo merupakan kerucut vulkanik aktif yang tumbuh di dalam kaldera Tengger. Kompleks Tengger terbentuk melalui aktivitas vulkanik jangka panjang yang menghasilkan endapan piroklastik, leleran lava, tuff, serta material vulkanik yang mengalami pelapukan dan pengendapan. Kaldera Tengger dipahami sebagai cekungan vulkanik besar yang terbentuk melalui proses keruntuhan permukaan setelah pengosongan sebagian sistem magma. Di dalam kaldera terdapat kerucut pascakaldera seperti Gunung Bromo, Gunung Batok, Gunung Widodaren, Gunung Kursi, dan Gunung Watangan. Bromo memiliki kawah aktif yang dapat mengeluarkan gas, abu, dan material vulkanik. Material vulkanik hasil erupsi berkontribusi terhadap pembentukan Laut Pasir, yaitu dataran luas yang tertutup abu dan pasir vulkanik.
              </p>
              <p>
                Dari sisi topografi, Bromo memiliki bentang yang beragam. Bagian luar kawasan berupa lereng pegunungan yang landai hingga berbukit, sedangkan bagian dalam kaldera memiliki dinding yang curam. Dasar kaldera berupa Laut Pasir Tengger berada pada sekitar 2.100 meter di atas permukaan laut. Gunung Bromo berdiri di tengah bentang tersebut, sementara Gunung Batok berada di dekatnya. Kawasan ini juga memiliki savana yang menjadi bagian penting lanskap TNBTS. Elevasi puncak Gunung Bromo dicantumkan sekitar 2.329 meter di atas permukaan laut dalam kajian geologi ITS. Topografi yang bervariasi memengaruhi aliran air, pembentukan tanah, sebaran vegetasi, dan aksesibilitas wilayah. Lereng curam berpotensi mengalami limpasan dan erosi apabila tidak dikelola dengan baik. Kondisi fisik Bromo juga berkaitan dengan kehidupan masyarakat Tengger, terutama dalam pertanian, permukiman, dan pariwisata.
              </p>
            </div>
          </div>

          <!-- BAB 2: FLORA-FAUNA ENDEMIK DAN BUDAYA TENGGER -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-emerald-600 text-2xl">park</span>
              <span>2. Gunung Bromo: Flora–Fauna Endemik dan Budaya Tengger</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal text-justify">
              <p>
                Gunung Bromo berada dalam kawasan Taman Nasional Bromo Tengger Semeru (TNBTS) yang memiliki bentang ekosistem vulkanik, hutan pegunungan, savana, dan kawasan terbuka. Persebaran flora dan fauna tidak merata karena dipengaruhi ketinggian, iklim mikro, tanah, ketersediaan air, dan tingkat gangguan manusia. Flora khas yang disebut dalam kajian TNBTS meliputi jamuju (<em>Dacrycarpus imbricatus</em>), cemara gunung (<em>Casuarina sp.</em>), edelweis Jawa (<em>Anaphalis javanica</em>), anggrek, dan rumput langka <em>Styphelia pungieus</em>. Kajian anggrek di Ranu Darungan menemukan 44 spesies dari 28 marga, terdiri atas anggrek epifit, terestrial, dan saprofit.
              </p>
              <p>
                Fauna yang disebut dalam kajian TNBTS meliputi macan tutul Jawa (<em>Panthera pardus melas</em>), elang ular bido (<em>Spilornis cheela bido</em>), rangkong, serta amfibi <em>Leptophryne borbonica</em> yang tercatat pada zona inti. Keanekaragaman hayati perlu dilindungi karena habitat dan regenerasi spesies mudah terganggu oleh aktivitas manusia.
              </p>
              <p>
                Suku Tengger merupakan komunitas yang memiliki hubungan sosial, budaya, dan penghidupan dengan bentang Bromo. Tradisi Yadnya Kasada serta Pura Luhur Poten menunjukkan makna religius kawasan ini bagi masyarakat pendukungnya. Kisah Rara Anteng dan Jaka Seger dipahami sebagai tradisi lisan asal-usul, bukan bukti ilmiah pembentukan kaldera. Masyarakat Tengger umumnya menjalankan kehidupan melalui pertanian, peternakan, dan jasa wisata. Perkembangan pariwisata membuka peluang ekonomi, tetapi juga menuntut pengelolaan yang menghormati budaya dan kelestarian lingkungan.
              </p>
            </div>
          </div>

          <!-- BAB 3: KEGIATAN PEREKONOMIAN DI KAWASAN GUNUNG BROMO -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-blue-600 text-2xl">storefront</span>
              <span>3. Kegiatan Perekonomian di Kawasan Gunung Bromo</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal text-justify">
              <p>
                Kegiatan perekonomian di kawasan Gunung Bromo didorong oleh pertanian sayur dan pariwisata. Masyarakat Tengger umumnya mengembangkan usaha tani di dataran tinggi, terutama kentang, kubis, wortel, dan bawang prei. Komoditas tersebut menjadi sumber pangan, bahan persembahan dalam upacara adat, serta produk yang dapat dipasarkan ke luar kawasan. Kesuburan tanah vulkanik tidak otomatis menjamin hasil panen karena pertanian juga dipengaruhi air, bahan organik, unsur hara, kemiringan lereng, dan pengelolaan tanah. Kebun lereng memerlukan upaya konservasi seperti penutup tanah, pengaturan barisan mengikuti kontur, dan pengelolaan bahan organik untuk menekan limpasan serta erosi.
              </p>
              <p>
                Pariwisata menjadi sektor penting karena meningkatkan permintaan jasa transportasi, penginapan, pemandu, kuliner, dan produk pertanian. Penyewaan jip, homestay, serta pemasaran hasil pertanian merupakan contoh hubungan wisata dan ekonomi warga. Potensi sebaran tempat wisata di kawasan Bromo mencakup pemandangan kaldera dan Laut Pasir, savana, puncak pengamatan, serta ruang budaya seperti Pura Luhur Poten. Perkembangan wisata perlu dikelola secara berkelanjutan agar manfaat ekonomi tetap seimbang dengan kelestarian lingkungan dan penghormatan terhadap budaya lokal.
              </p>
            </div>
          </div>

          <!-- BAB 4: SEBARAN TEMPAT WISATA MENARIK DI KOMPLEKS GUNUNG BROMO -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-primary font-black text-base sm:text-lg border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-purple-600 text-2xl">explore</span>
              <span>4. Sebaran Tempat Wisata Menarik di Kompleks Gunung Bromo</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal text-justify">
              <p>
                Kompleks Gunung Bromo memiliki sebaran tempat wisata yang menarik dan beragam. Daya tarik utama berada di dalam kaldera Tengger, terutama Laut Pasir sebagai dataran luas yang menjadi ruang utama aktivitas wisatawan. Gunung Bromo menjadi pusat pengamatan kawah dan lanskap vulkanik, sedangkan Gunung Batok menawarkan bentuk kerucut vulkanik yang khas. Gunung Widodaren, Gunung Kursi, dan Gunung Watangan juga menjadi bagian bentang kaldera yang memperkaya pemandangan.
              </p>
              <p>
                Di sekitar kawasan terdapat savana yang menjadi ruang terbuka dengan vegetasi khas dataran tinggi. Puncak pengamatan seperti Penanjakan menjadi lokasi populer untuk menyaksikan lanskap kaldera dan aktivitas fajar. Ruang budaya seperti Pura Luhur Poten juga menjadi bagian penting karena berkaitan dengan kehidupan religius masyarakat Tengger. Sebaran wisata perlu dikelola secara berkelanjutan agar manfaat ekonomi tetap seimbang dengan kelestarian lingkungan dan penghormatan terhadap budaya lokal.
              </p>
            </div>
          </div>

          <!-- BAB 5: SUMBER JURNAL DAN RUJUKAN (20 REFERENSI LENGKAP) -->
          <div class="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg border-b border-slate-200 pb-2.5">
              <span class="material-symbols-outlined text-slate-600 text-2xl">menu_book</span>
              <span>5. Sumber Jurnal dan Rujukan Ilmiah</span>
            </div>
            <ol class="list-decimal list-outside ml-4 sm:ml-5 space-y-2 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
              <li>
                <strong>Hilyah, A., Fajar, M. H. M., Ikmaluhakim, D. R., Hawan, S. I., Purwanto, M. S., &amp; Bahri, A. S. (2021).</strong> <em>Studi Geologi dan Geofisika Batuan Gunung Bromo dan Sekitarnya.</em> Jurnal SEWAGATI ITS, 5(2), 156–163. <a href="https://doi.org/10.12962/j26139960.v5i2.8248" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://doi.org/10.12962/j26139960.v5i2.8248</a>
              </li>
              <li>
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/fungsi/?page=2&amp;fungsi=TN" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://ksdae.kehutanan.go.id/kawasan-konservasi/fungsi/?page=2&amp;fungsi=TN</a>
              </li>
              <li>
                <strong>Multidisciplinary study with quantitative analysis of isotopic data for the assessment of recharge and functioning of volcanic aquifers: Case of Bromo-Tengger volcano, Indonesia.</strong> <a href="https://hal.science/hal-02410291/file/1-s2.0-S2214581819300941-main-1.pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://hal.science/hal-02410291/file/1-s2.0-S2214581819300941-main-1.pdf</a>
              </li>
              <li>
                <strong>Jurnal GEOID ITS.</strong> <em>Rancang Bangun Sistem Informasi Bencana Gunung Bromo Berbasis WebGIS.</em> <a href="https://journal.its.ac.id/index.php/geoid/article/download/1329/1037" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://journal.its.ac.id/index.php/geoid/article/download/1329/1037</a>
              </li>
              <li>
                <strong>Jurnal Avicennia UMM.</strong> <em>Kajian lingkungan kawasan Bromo.</em> <a href="https://ejournal.umm.ac.id/index.php/avicennia/article/download/9406/pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://ejournal.umm.ac.id/index.php/avicennia/article/download/9406/pdf</a>
              </li>
              <li>
                <strong>Nisa, R. K., Wisanti, Putri, E. K., Kuntjoro S., &amp; Artaka T. (2021).</strong> <em>Keanekaragaman Spesies Anggrek di Ranu Darungan Taman Nasional Bromo Tengger Semeru.</em> LenteraBio, 10(1), 1–9. <a href="https://journal.unesa.ac.id/index.php/lenterabio/article/download/9943/6006/46901" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://journal.unesa.ac.id/index.php/lenterabio/article/download/9943/6006/46901</a>
              </li>
              <li>
                <strong>Jurnal Silvikultur Tropika, IPB.</strong> <em>Kajian flora dan fauna TNBTS.</em> <a href="https://journal.ipb.ac.id/index.php/jsilvik/article/download/50332/26338" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://journal.ipb.ac.id/index.php/jsilvik/article/download/50332/26338</a>
              </li>
              <li>
                <strong>Jurnal Tropical Biodiversity and Biotechnology, UGM (2024).</strong> <em>The First Record of an Hourglass Toad (Leptophryne borbonica) in the Core Zone of Bromo Tengger Semeru National Park and Its Ecological Aspects.</em> <a href="https://journal.ugm.ac.id/jtbb/article/view/93938" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://journal.ugm.ac.id/jtbb/article/view/93938</a>
              </li>
              <li>
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li>
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li>
                <strong>Proceeding of National Conference on Accounting &amp; Finance, UII.</strong> <em>Mengungkap Akuntansi Budaya atas Pembiayaan Ritual.</em> <a href="https://journal.uii.ac.id/NCAF/article/download/22314/pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://journal.uii.ac.id/NCAF/article/download/22314/pdf</a>
              </li>
              <li>
                <strong>Artikel pada Temu Ilmiah Nasional PERSAGI.</strong> <em>Pengaruh budaya terhadap kebiasaan makan dan gaya hidup.</em> <a href="https://tin.persagi.org/index.php/tin/article/download/85/77/127" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://tin.persagi.org/index.php/tin/article/download/85/77/127</a>
              </li>
              <li>
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li>
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li>
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/</a>
              </li>
              <li>
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li>
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li>
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/</a>
              </li>
              <li>
                <strong>Indonesia Travel.</strong> <em>Bromo Tengger Semeru National Park.</em> <a href="https://www.indonesia.travel/id/id/destination/java/east-java/bromo-tengger-semeru-national-park" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://www.indonesia.travel/id/id/destination/java/east-java/bromo-tengger-semeru-national-park</a>
              </li>
              <li>
                <strong>ANTARA Jawa Timur (2012).</strong> <em>Mengemas Bromo Menjadi Paket Wisata Satu Destinasi.</em> <a href="https://jatim.antaranews.com/berita/90497/mengemas-bromo-menjadi-paket-wisata-satu-destinasi" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center gap-0.5">https://jatim.antaranews.com/berita/90497/mengemas-bromo-menjadi-paket-wisata-satu-destinasi</a>
              </li>
            </ol>
          </div>

          <!-- BAB 6: FORM CATATAN REFLEKTIF PEMAHAMAN MODUL BROMO (SYARAT BUKA LKPD DAY 4) -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md flex flex-col gap-3.5">
            <div class="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-600 text-2xl">rate_review</span>
                <h3 class="font-black text-base sm:text-lg text-primary">6. Catatan Reflektif Pemahaman Modul Day 4</h3>
              </div>
              <span id="ftMateriDay4Badge" class="px-2.5 py-1 rounded-full text-xs font-bold ${savedConclusion ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}">
                ${savedConclusion ? 'Telah Disimpan &amp; Terbuka' : 'Wajib Disimpan untuk Buka LKPD'}
              </span>
            </div>

            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Setelah membaca materi modul bentang alam Bromo dan budaya Tengger di atas, tuliskan resume pemahaman Anda (minimal 15–20 kata) mengenai: <strong>proses geologis pembentukan Kaldera Tengger &amp; Laut Pasir</strong>, keanekaragaman <strong>flora/fauna endemik TNBTS</strong>, serta <strong>makna upacara Yadnya Kasada bagi masyarakat Suku Tengger</strong>:
            </p>

            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <label for="ftMateriDay4Conclusion" class="text-slate-800 font-bold">Resume Catatan Pemahaman Siswa:</label>
                <span id="ftMateriDay4SavedTime" class="text-[11px] text-slate-400">${savedAt ? 'Tersimpan pada ' + new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Belum disimpan'}</span>
              </div>
              <textarea id="ftMateriDay4Conclusion" rows="4" class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-slate-400 leading-relaxed" placeholder="Contoh: Dari modul ini saya memahami bahwa Kaldera Tengger dan Laut Pasir terbentuk melalui proses keruntuhan permukaan akibat pengosongan sebagian sistem magma, dengan kerucut aktif Gunung Bromo di dalamnya. Kawasan TNBTS memiliki flora khas seperti Edelweis Jawa dan cemara gunung, serta satwa dilindungi seperti macan tutul Jawa. Selain itu, masyarakat Suku Tengger menjunjung tinggi tradisi Yadnya Kasada sebagai wujud rasa syukur kepada Tuhan dan penghormatan kepada leluhur..."></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button id="btnSaveMateriDay4Conclusion" type="button" onclick="saveDay4BromoConclusion()" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">task_alt</span>
                <span id="btnSaveMateriDay4Text">${savedConclusion ? 'Perbarui Kesimpulan Modul' : 'Simpan Kesimpulan &amp; Buka LKPD Day 4'}</span>
              </button>
            </div>
          </div>

          <!-- KARTU AKSES LKPD DAY 4 (TERKUNCI / TERBUKA BERDASARKAN KESIMPULAN) -->
          <div id="ftLkpdDay4AccessBox" class="bg-gradient-to-r ${savedConclusion ? 'from-emerald-700 to-teal-800' : 'from-amber-800 to-orange-950'} rounded-3xl p-5 text-white shadow-md flex flex-col gap-3 text-center sm:text-left transition-all">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div class="flex items-center justify-center sm:justify-start gap-2">
                  <span id="ftLkpdDay4LockIcon" class="material-symbols-outlined text-amber-200 text-xl">${savedConclusion ? 'lock_open' : 'lock'}</span>
                  <h4 id="ftLkpdDay4LockTitle" class="font-extrabold text-sm sm:text-base text-white">
                    ${savedConclusion ? 'Tahap 2 Terbuka: LKPD Digital Day 4' : 'Tahap 2: LKPD Digital Day 4'}
                  </h4>
                </div>
                <p id="ftLkpdDay4LockDesc" class="text-xs text-amber-100/90 mt-0.5">
                  ${savedConclusion ? 'Kesimpulan modul tersimpan. Silakan lanjutkan pengerjaan lembar kerja observasi Bromo.' : 'Selesaikan dan simpan kesimpulan modul di atas terlebih dahulu untuk membuka akses LKPD.'}
                </p>
              </div>
              <a id="btnGoToLkpdDay4" href="${savedConclusion ? 'lkpd.html?day=4' : 'javascript:void(0)'}" onclick="${savedConclusion ? '' : 'handleGoToLkpdDay4Locked()'}" class="px-5 py-3 rounded-2xl ${savedConclusion ? 'bg-white text-emerald-900 hover:bg-emerald-50' : 'bg-white/20 text-white cursor-not-allowed opacity-60'} font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0">
                <span id="btnGoToLkpdDay4Text">${savedConclusion ? 'Buka LKPD Day 4 Bromo' : 'LKPD Masih Terkunci'}</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      `;

      if (savedConclusion) {
        applyDay4BromoConclusionState(savedConclusion, savedAt);
      }
    }

    function applyDay4BromoConclusionState(text, savedAt) {
      const txtArea = document.getElementById('ftMateriDay4Conclusion');
      const badge = document.getElementById('ftMateriDay4StatusBadge');
      const savedTimeEl = document.getElementById('ftMateriDay4SavedTime');
      const btnSaveText = document.getElementById('btnSaveMateriDay4Text');
      const lockIcon = document.getElementById('ftLkpdDay4LockIcon');
      const lockTitle = document.getElementById('ftLkpdDay4LockTitle');
      const lockDesc = document.getElementById('ftLkpdDay4LockDesc');
      const accessBox = document.getElementById('ftLkpdDay4AccessBox');
      const btnGo = document.getElementById('btnGoToLkpdDay4');
      const btnGoText = document.getElementById('btnGoToLkpdDay4Text');

      if (txtArea) {
        txtArea.value = text;
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900';
        badge.textContent = '✓ Kesimpulan Telah Disimpan';
      }
      if (savedTimeEl && savedAt) {
        savedTimeEl.textContent = 'Tersimpan pada ' + new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      }
      if (btnSaveText) btnSaveText.textContent = 'Perbarui Kesimpulan Modul';
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2 Terbuka: LKPD Digital Day 4';
      if (lockDesc) lockDesc.textContent = 'Kesimpulan modul tersimpan. Silakan lanjutkan pengerjaan lembar kerja observasi Bromo.';
      if (accessBox) {
        accessBox.className = 'bg-gradient-to-r from-emerald-700 to-teal-800 rounded-3xl p-5 text-white shadow-md flex flex-col gap-3 text-center sm:text-left transition-all';
      }
      if (btnGo) {
        btnGo.href = 'lkpd.html?day=4';
        btnGo.onclick = null;
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
      }
      if (btnGoText) btnGoText.textContent = 'Buka LKPD Day 4 Bromo';
    }

    function saveDay4BromoConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txtArea = document.getElementById('ftMateriDay4Conclusion');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan resume pemahaman Anda minimal 15–20 kata sebelum melanjutkan!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriDay4Conclusion');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        day_number: 4,
        location: 'Taman Nasional Bromo Tengger Semeru',
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day4_' + cleanNisn, JSON.stringify(record));
      } catch(e) {}

      applyDay4BromoConclusionState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 4, 'materi', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
          }
          FincestemCore.ui.toast('Resume Modul Bromo berhasil disimpan! LKPD Day 4 sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
        }
        FincestemCore.ui.toast('Resume Modul Bromo berhasil disimpan! LKPD Day 4 sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdDay4Locked() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const saved = localStorage.getItem('fincestem_materi_ft_day4_' + cleanNisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan di atas sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftMateriDay4Conclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=4';
    }

    window.renderDay4FieldTripModule = renderDay4FieldTripModule;
    window.applyDay4BromoConclusionState = applyDay4BromoConclusionState;
    window.saveDay4BromoConclusion = saveDay4BromoConclusion;
    window.handleGoToLkpdDay4Locked = handleGoToLkpdDay4Locked;

    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 4 S.D. 7
    // ==========================================
    function renderGenericFieldTripModule(mainEl, dayNum) {
      const ftCfg = (FincestemCore.schedule && FincestemCore.schedule.getFieldTripDayConfig) 
        ? FincestemCore.schedule.getFieldTripDayConfig(dayNum) 
        : null;

      const title = ftCfg ? ftCfg.title : `Day ${dayNum}: Ekspedisi Riset Lapangan Field Trip`;
      const theme = ftCfg ? ftCfg.theme : 'Investigasi 4 Pilar FINCESTEM Lapangan';
      const route = ftCfg ? ftCfg.route : 'Rute Resmi Ekspedisi Field Trip 2026';
      const date = ftCfg ? ftCfg.date_formatted : `Day ${dayNum}`;
      const time = ftCfg ? ftCfg.time_range : '07.00 - 21.00 WIB';
      const desc = ftCfg ? ftCfg.description : 'Pelajari panduan observasi, etika kunjungan, dan pencatatan data di setiap titik lokasi riset hari ini.';
      const sessions = (ftCfg && ftCfg.sessions) ? ftCfg.sessions : [];

      // Ambil kesimpulan yang tersimpan
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      let savedConclusion = '';
      let savedAt = '';
      try {
        const raw = localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + nisn);
        if (raw) {
          const parsed = JSON.parse(raw);
          savedConclusion = parsed.conclusion || '';
          savedAt = parsed.savedAt || '';
        }
      } catch (e) {}

      mainEl.innerHTML = `
        <!-- BANNER MODUL FIELD TRIP DAY ${dayNum} -->
        <div class="bg-gradient-to-br from-teal-700 via-[#006a61] to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md">
              Field Trip • Day ${dayNum}
            </span>
            <span class="text-xs font-bold text-teal-200">${date}</span>
          </div>
          <h2 class="font-black text-xl sm:text-2xl leading-tight">
            ${title}
          </h2>
          <span class="text-xs sm:text-sm font-semibold text-teal-200/90 leading-snug">
            ${theme}
          </span>
          <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
            ${desc}
          </p>
          <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-teal-200 font-semibold flex-wrap">
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span>${time}</span>
            </span>
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">alt_route</span>
              <span>${route}</span>
            </span>
          </div>
        </div>

        ${renderFieldTripScheduleCard(dayNum)}

        <!-- PANDUAN OBSERVASI 4 PILAR FINCESTEM -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3.5">
          <div class="flex items-center gap-2.5 text-teal-950">
            <div class="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              <span class="material-symbols-outlined text-lg">explore</span>
            </div>
            <h3 class="font-extrabold text-base text-on-surface">Panduan Observasi Lapangan 4 Pilar Terpadu</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
              <span class="font-black text-emerald-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">science</span> 1. Pilar Sains &amp; Lingkungan
              </span>
              <p class="leading-relaxed text-[11.5px] text-slate-600">Amati fenomena alam, kondisi suhu/geologi rute, keanekaragaman flora/fauna, serta penerapan prinsip sains di titik destinasi.</p>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
              <span class="font-black text-blue-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">precision_manufacturing</span> 2. Pilar Teknologi &amp; Rekayasa
              </span>
              <p class="leading-relaxed text-[11.5px] text-slate-600">Perhatikan mekanika alat transportasi, mesin manufaktur, teknologi konservasi, serta verifikasi GPS kamera geotag Anda.</p>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
              <span class="font-black text-amber-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">payments</span> 3. Pilar Literasi Finansial
              </span>
              <p class="leading-relaxed text-[11.5px] text-slate-600">Catat setiap pos belanja uang saku harian, pertahankan alokasi hemat 50-30-20, dan cegah pengeluaran impulsif yang tidak terencana.</p>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
              <span class="font-black text-purple-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">diversity_3</span> 4. Pilar Budaya &amp; Karakter
              </span>
              <p class="leading-relaxed text-[11.5px] text-slate-600">Jaga sopan santun, ketertiban kelompok, kekompakan tim, dan hargai kearifan lokal masyarakat tempat yang dikunjungi.</p>
            </div>
          </div>
        </div>

        <!-- BAGIAN KESIMPULAN / RESUME MODUL (SYARAT BUKA LKPD TAHAP 2) -->
        <div id="ftMateriConclusionCardGeneric" class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-teal-300 shadow-sm flex flex-col gap-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
              <h3 class="font-extrabold text-base text-teal-950">Resume &amp; Rencana Kegiatan Siswa Day ${dayNum}</h3>
            </div>
            <span id="ftMateriStatusBadgeGeneric" class="px-2.5 py-1 rounded-full text-xs font-bold ${savedConclusion ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}">
              ${savedConclusion ? 'Kesimpulan Telah Disimpan' : 'Wajib Disimpan (Tahap 1)'}
            </span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Tuliskan ringkasan pemahaman Anda mengenai sasaran rute, etika, dan rencana observasi kelompok pada kegiatan <strong>Day ${dayNum}</strong> di bawah ini (minimal 20 kata). Kesimpulan ini menjadi syarat wajib untuk membuka lembar kerja LKPD Digital.
          </p>

          <textarea id="ftMateriConclusionGeneric" rows="4" class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all" placeholder="Tuliskan pemahaman modul dan target kegiatan Anda di Day ${dayNum} di sini...">${savedConclusion}</textarea>

          <div class="flex items-center justify-between gap-2 flex-wrap pt-1">
            <span id="ftMateriSavedTimeGeneric" class="text-xs text-slate-500 font-medium">
              ${savedAt ? 'Tersimpan pada ' + new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Belum disimpan'}
            </span>
            <button id="btnSaveMateriConclusionGeneric" type="button" onclick="saveMateriConclusionGeneric(${dayNum})" class="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span class="material-symbols-outlined text-lg">save</span>
              <span id="btnSaveMateriTextGeneric">${savedConclusion ? 'Perbarui Kesimpulan Modul' : 'Simpan Kesimpulan & Buka LKPD'}</span>
            </button>
          </div>
        </div>

        <!-- CALL TO ACTION: BUKA LKPD DIGITAL DAY ${dayNum} (TAHAP 2) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <span id="ftLkpdLockIconGeneric" class="material-symbols-outlined ${savedConclusion ? 'text-emerald-300' : 'text-amber-200'} text-xl">${savedConclusion ? 'lock_open' : 'lock'}</span>
            </div>
            <div class="flex flex-col">
              <span id="ftLkpdLockTitleGeneric" class="font-black text-sm sm:text-base leading-tight">
                ${savedConclusion ? `Tahap 2 Terbuka: LKPD Digital Day ${dayNum}` : `Tahap 2: LKPD Digital Day ${dayNum}`}
              </span>
              <span id="ftLkpdLockDescGeneric" class="text-xs text-teal-100/90 leading-snug mt-0.5">
                ${savedConclusion ? `Kesimpulan modul tersimpan. Silakan lanjutkan ke pengerjaan lembar kerja Day ${dayNum}.` : 'Simpan kesimpulan modul di atas untuk membuka LKPD Digital ini.'}
              </span>
            </div>
          </div>
          <button id="btnGoToLkpdGeneric" type="button" onclick="handleGoToLkpdGeneric(${dayNum})" class="w-full sm:w-auto px-5 py-3 rounded-2xl ${savedConclusion ? 'bg-white text-teal-900 hover:bg-teal-50' : 'bg-white/20 text-white hover:bg-white/30'} font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer">
            <span class="material-symbols-outlined text-lg">edit_document</span>
            <span id="btnGoToLkpdTextGeneric">${savedConclusion ? `Buka LKPD Digital Day ${dayNum}` : 'LKPD Masih Terkunci'}</span>
          </button>
        </div>
      `;

      checkInitialMateriConclusionGeneric(dayNum);
    }

    function checkInitialMateriConclusionGeneric(dayNum) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idVars = Array.from(new Set([cleanNisn, unpadded, padded, nisn])).filter(Boolean);

      let saved = null;
      try {
        for (const id of idVars) {
          const stored = localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + id);
          if (stored) {
            saved = JSON.parse(stored);
            break;
          }
        }
      } catch (e) {}

      if (saved) {
        const cleanSaved = sanitizeConclusionText(saved.conclusion || saved);
        if (cleanSaved) {
          applyMateriConclusionStateGeneric(dayNum, cleanSaved, saved.savedAt);
        }
      }

      if (FincestemCore.progress) {
        FincestemCore.progress.getStudentProgress(nisn, function(prog) {
          if (prog && prog.task_map) {
            const taskKey = dayNum + '_materi';
            if (prog.task_map[taskKey]) {
              const task = prog.task_map[taskKey];
              const content = sanitizeConclusionText(task.content);
              if (content) {
                applyMateriConclusionStateGeneric(dayNum, content, task.submitted_at || 'Tersimpan di server');
              }
            } else if (!saved) {
              const txtArea = document.getElementById('ftMateriConclusionGeneric');
              if (txtArea) txtArea.value = '';
              const badge = document.getElementById('ftMateriStatusBadgeGeneric');
              if (badge) {
                badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
                badge.textContent = 'Wajib Disimpan (Tahap 1)';
              }
              const savedTimeEl = document.getElementById('ftMateriSavedTimeGeneric');
              if (savedTimeEl) savedTimeEl.textContent = 'Belum disimpan';
              const btnSaveText = document.getElementById('btnSaveMateriTextGeneric');
              if (btnSaveText) btnSaveText.textContent = 'Simpan Kesimpulan & Buka LKPD';
              const lockIcon = document.getElementById('ftLkpdLockIconGeneric');
              if (lockIcon) {
                lockIcon.textContent = 'lock';
                lockIcon.className = 'material-symbols-outlined text-amber-200 text-xl';
              }
              const lockTitle = document.getElementById('ftLkpdLockTitleGeneric');
              if (lockTitle) lockTitle.textContent = `Tahap 2: LKPD Digital Day ${dayNum}`;
              const lockDesc = document.getElementById('ftLkpdLockDescGeneric');
              if (lockDesc) lockDesc.textContent = 'Simpan kesimpulan modul di atas untuk membuka LKPD Digital ini.';
              const btnGo = document.getElementById('btnGoToLkpdGeneric');
              if (btnGo) {
                btnGo.className = 'w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/20 text-white hover:bg-white/30 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
                btnGo.onclick = function() { handleGoToLkpdGeneric(dayNum); };
              }
              const btnGoText = document.getElementById('btnGoToLkpdTextGeneric');
              if (btnGoText) btnGoText.textContent = 'LKPD Masih Terkunci';
            }
          }
        });
      }
    }

    function saveMateriConclusionGeneric(dayNum) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const txtArea = document.getElementById('ftMateriConclusionGeneric');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 20) {
        FincestemCore.ui.toast(`Silakan tuliskan kesimpulan pemahaman Anda untuk Day ${dayNum} minimal beberapa kalimat!`, 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriConclusionGeneric');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + nisn, JSON.stringify(record));
      } catch (e) {}

      applyMateriConclusionStateGeneric(dayNum, text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(nisn, dayNum, 'materi', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'save');
          }
          FincestemCore.ui.toast(`Kesimpulan modul Day ${dayNum} berhasil disimpan! Akses ke LKPD Day ${dayNum} sekarang telah terbuka.`, 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'save');
        }
        FincestemCore.ui.toast(`Kesimpulan modul Day ${dayNum} berhasil disimpan! Akses ke LKPD Day ${dayNum} sekarang telah terbuka.`, 'success');
      }
    }

    function applyMateriConclusionStateGeneric(dayNum, text, savedAt) {
      text = sanitizeConclusionText(text);
      const txtArea = document.getElementById('ftMateriConclusionGeneric');
      const badge = document.getElementById('ftMateriStatusBadgeGeneric');
      const savedTimeEl = document.getElementById('ftMateriSavedTimeGeneric');
      const lockIcon = document.getElementById('ftLkpdLockIconGeneric');
      const lockTitle = document.getElementById('ftLkpdLockTitleGeneric');
      const lockDesc = document.getElementById('ftLkpdLockDescGeneric');
      const btnGo = document.getElementById('btnGoToLkpdGeneric');
      const btnGoText = document.getElementById('btnGoToLkpdTextGeneric');

      if (txtArea) {
        txtArea.value = text;
        txtArea.setAttribute('disabled', 'disabled');
        txtArea.classList.add('bg-slate-100', 'cursor-not-allowed', 'text-slate-600');
      }
      const saveBtn = document.getElementById('btnSaveMateriConclusionGeneric');
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.classList.remove('hover:bg-teal-700', 'cursor-pointer');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Kesimpulan Telah Terkunci</span>';
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300';
        badge.textContent = '🔒 Kesimpulan Disimpan & Terkunci';
      }
      if (savedTimeEl) {
        const dtStr = savedAt ? new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Tersimpan';
        savedTimeEl.textContent = `Tersimpan pada ${dtStr}`;
      }
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = `Tahap 2 Terbuka: LKPD Digital Day ${dayNum}`;
      if (lockDesc) lockDesc.textContent = `Kesimpulan modul telah tersimpan. Silakan lanjutkan mengerjakan lembar kerja Day ${dayNum}.`;
      if (btnGo) {
        btnGo.className = 'w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-teal-900 hover:bg-teal-50 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() {
          window.location.href = `lkpd.html?day=${dayNum}`;
        };
      }
      if (btnGoText) btnGoText.textContent = `Buka LKPD Digital Day ${dayNum}`;
    }

    function handleGoToLkpdGeneric(dayNum) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const saved = localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + nisn);
      if (!saved) {
        FincestemCore.ui.toast(`Anda wajib membaca modul dan menyimpan kesimpulan pemahaman di atas sebelum membuka LKPD Day ${dayNum}!`, 'warning');
        const txtArea = document.getElementById('ftMateriConclusionGeneric');
        if (txtArea) {
          txtArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txtArea.focus();
        }
        return;
      }
      window.location.href = `lkpd.html?day=${dayNum}`;
    }

    function handleGoToDokumentasiJtp1() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      const record = {
        day_number: 3,
        session: 2,
        location: 'Jawa Timur Park 1, Kota Batu',
        status: 'read',
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day3_jtp1_' + cleanNisn, JSON.stringify(record));
      } catch(e) {}

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 3, 'materi_jtp1', record);
      }

      FincestemCore.ui.toast('Modul Jatim Park 1 terbaca. Menuju Dokumentasi & Refleksi...', 'success');
      setTimeout(() => {
        window.location.href = 'dokumentasi.html?day=3&sesi=2';
      }, 400);
    }
    window.handleGoToDokumentasiJtp1 = handleGoToDokumentasiJtp1;

    // ==========================================
    // HANDLERS KESIMPULAN MODUL SESI 3 (MUSEUM ANGKUT)
    // ==========================================
    function applyDay3MuseumConclusionState(text, savedAt) {
      text = sanitizeConclusionText(text);
      const txtArea = document.getElementById('ftMateriMuseumConclusion');
      const badge = document.getElementById('ftMateriMuseumStatusBadge');
      const savedTimeEl = document.getElementById('ftMateriMuseumSavedTime');
      const btnSaveText = document.getElementById('btnSaveMateriMuseumText');
      const saveBtn = document.getElementById('btnSaveMateriMuseumConclusion');
      const lockIcon = document.getElementById('ftLkpdMuseumLockIcon');
      const lockTitle = document.getElementById('ftLkpdMuseumLockTitle');
      const lockDesc = document.getElementById('ftLkpdMuseumLockDesc');
      const btnGo = document.getElementById('btnGoToLkpdMuseum');
      const btnGoText = document.getElementById('btnGoToLkpdMuseumText');

      if (txtArea) {
        txtArea.value = text;
        txtArea.setAttribute('readonly', 'readonly');
        txtArea.classList.add('bg-slate-100', 'text-slate-600', 'cursor-not-allowed');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800';
        badge.textContent = 'Telah Disimpan & Terkunci (Tahap 1 Selesai)';
      }
      if (savedTimeEl) {
        savedTimeEl.textContent = savedAt ? `Disimpan: ${new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : 'Tersimpan';
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.classList.remove('hover:bg-purple-700', 'cursor-pointer');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Kesimpulan Telah Terkunci</span>';
      } else if (btnSaveText) {
        btnSaveText.textContent = 'Kesimpulan Telah Terkunci';
      }

      // Aktifkan Akses ke LKPD Museum Angkut
      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-purple-300 text-xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2 Terbuka: LKPD Museum Angkut Day 3 Sesi 3';
      if (lockDesc) lockDesc.textContent = 'Kesimpulan modul telah tersimpan. Silakan lanjutkan mengerjakan LKPD investigasi Museum Angkut.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-white text-purple-950 hover:bg-purple-50 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer';
        btnGo.onclick = function() {
          window.location.href = 'lkpd.html?day=3&sesi=3';
        };
      }
      if (btnGoText) btnGoText.textContent = 'Buka LKPD Museum Angkut';
    }

    function saveDay3MuseumConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txtArea = document.getElementById('ftMateriMuseumConclusion');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 30) {
        FincestemCore.ui.toast('Silakan tuliskan resume pemahaman Anda minimal 15–20 kata sebelum melanjutkan!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriMuseumConclusion');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        day_number: 3,
        session: 3,
        location: 'Museum Angkut Kota Batu',
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('fincestem_materi_ft_day3_museum_' + cleanNisn, JSON.stringify(record));
      } catch(e) {}

      applyDay3MuseumConclusionState(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 3, 'materi_museum', record, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
          }
          FincestemCore.ui.toast('Resume Modul Museum Angkut berhasil disimpan! LKPD Sesi 3 sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Kesimpulan Modul', 'task_alt');
        }
        FincestemCore.ui.toast('Resume Modul Museum Angkut berhasil disimpan! LKPD Sesi 3 sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdMuseum() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const saved = localStorage.getItem('fincestem_materi_ft_day3_museum_' + cleanNisn);
      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan Museum Angkut sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftMateriMuseumConclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=3&sesi=3';
    }

    window.saveDay3MuseumConclusion = saveDay3MuseumConclusion;
    window.handleGoToLkpdMuseum = handleGoToLkpdMuseum;
    window.applyDay3MuseumConclusionState = applyDay3MuseumConclusionState;