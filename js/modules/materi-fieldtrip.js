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
              <li class="break-words max-w-full"><strong>Kebutuhan Riil di Jalan:</strong> Obat anti-mabuk perjalanan (Antimo/minyak angin), air mineral saat darurat haus di bus, dan kuota telepon untuk mengabarkan orang tua bahwa Anda selamat melintasi Selat Sunda.</li>
              <li class="break-words max-w-full"><strong>Keinginan yang Wajib Dikendalikan:</strong> Membeli snack/camilan mahal berulang di minimarket rest area tol Trans-Jawa, membeli suvenir kapal ferry yang tidak berguna, atau membeli makanan cepat saji padahal waktu makan rombongan yang disiapkan biro perjalanan segera tiba.</li>
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
            <li class="break-words max-w-full">Pisahkan uang: simpan uang jajan harian di dompet/saku depan, dan simpan uang oleh-oleh di amplop terpisah di dalam tas ransel.</li>
            <li class="break-words max-w-full">Hindari memegang atau menghitung uang lembaran banyak di tempat umum atau keramaian pelabuhan.</li>
            <li class="break-words max-w-full">Lakukan evaluasi sisa uang setiap malam sebelum tidur untuk mencocokkan dengan rencana awal.</li>
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
                try {
                  const mObj = { conclusion: content, savedAt: task.submitted_at || task.updated_at || new Date().toISOString() };
                  idVars.forEach(id => {
                    localStorage.setItem('fincestem_materi_ft_day1_' + id, JSON.stringify(mObj));
                  });
                } catch(e) {}
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
      const cleanNisn = String(nisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idVars = Array.from(new Set([cleanNisn, unpadded, padded, nisn])).filter(Boolean);

      let saved = null;
      for (const id of idVars) {
        const s = localStorage.getItem('fincestem_materi_ft_day1_' + id);
        if (s) { saved = s; break; }
      }

      if (!saved && window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['1_materi']) {
        const mTask = window.currentStudentProgress.task_map['1_materi'];
        const mObj = {
          conclusion: sanitizeConclusionText(mTask.content),
          savedAt: mTask.submitted_at || mTask.updated_at || new Date().toISOString()
        };
        saved = JSON.stringify(mObj);
        idVars.forEach(id => {
          try { localStorage.setItem('fincestem_materi_ft_day1_' + id, saved); } catch(e) {}
        });
      }

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
                <li class="break-words max-w-full"><strong>Menyelenggarakan pendidikan pembentukan perwira Polri</strong> melalui kegiatan pengajaran, pelatihan, dan pengasuhan secara bertahap dan berkesinambungan pada setiap tingkat pendidikan.</li>
                <li class="break-words max-w-full"><strong>Menyelenggarakan kegiatan penelitian</strong> dalam upaya pengembangan ilmu pengetahuan dan teknologi yang terkait dengan bidang kepolisian.</li>
                <li class="break-words max-w-full"><strong>Menyelenggarakan kegiatan pengabdian masyarakat</strong> yang terkait dengan bidang kepolisian.</li>
                <li class="break-words max-w-full"><strong>Menyelenggarakan tata kelola institusi</strong> yang berorientasi kepada pelayanan prima dan berkembang menjadi pusat unggulan (<em>centre of excellence</em>).</li>
                <li class="break-words max-w-full"><strong>Mengembangkan kerjasama dan jejaring kerja</strong> dengan berbagai lembaga di dalam dan luar negeri.</li>
              </ol>
            </div>

            <!-- III. PROFIL, KEDUDUKAN & LANDASAN HUKUM -->
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex flex-col gap-2.5 shadow-2xs">
              <h4 class="font-black text-sm text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-blue-700">account_balance</span>
                <span>III. Profil, Kedudukan &amp; Landasan Hukum</span>
              </h4>
              <ul class="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                <li class="break-words max-w-full">• <strong>Pengertian &amp; Kedudukan Organisasi:</strong> Akademi Kepolisian (Akpol) adalah lembaga pendidikan kedinasan tinggi untuk mencetak Perwira Polri di bawah naungan <strong>Lemdiklat Polri</strong> (Lembaga Pendidikan dan Pelatihan Polri). Terakreditasi <strong>Unggul</strong> oleh BAN-PT, berlokasi di Jl. Sultan Agung No. 131, Candi Baru, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah.</li>
                <li class="break-words max-w-full">• <strong>Landasan Regulasi &amp; Masa Studi:</strong> Berdasarkan <strong>Perkap No. 21 Tahun 2010</strong>, masa pendidikan Akpol ditempuh selama <strong>4 tahun (8 semester)</strong>.</li>
                <li class="break-words max-w-full">• <strong>Output Kelulusan:</strong> Menyandang gelar akademik <strong>Sarjana Terapan Kepolisian (S.Tr.K.)</strong> dan dilantik resmi menjadi perwira pertama Polri berpangkat <strong>Inspektur Polisi Dua (Ipda)</strong>.</li>
                <li class="break-words max-w-full">• <strong>Pendekatan Tri-Tunggal Pendidikan:</strong>
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
                <li class="break-words max-w-full">• <strong>Afiliasi Internasional (INTERPA):</strong> Tergabung aktif sebagai anggota <em>International Association of Police Academies</em> (INTERPA) bersama akademi kepolisian dari <strong>36 negara dunia</strong>.</li>
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
                  <li class="break-words max-w-full"><strong>Warga Negara Indonesia (WNI).</strong></li>
                  <li class="break-words max-w-full"><strong>Beriman dan bertakwa</strong> kepada Tuhan Yang Maha Esa.</li>
                  <li class="break-words max-w-full"><strong>Setia kepada Negara Kesatuan Republik Indonesia</strong> berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.</li>
                  <li class="break-words max-w-full"><strong>Berumur paling rendah 18 (delapan belas) tahun</strong> pada saat diangkat menjadi anggota Polri.</li>
                  <li class="break-words max-w-full"><strong>Sehat jasmani, rohani dan bebas narkoba</strong> (surat keterangan bebas narkoba dari instansi yang berwenang).</li>
                  <li class="break-words max-w-full"><strong>Tidak sedang terlibat kasus pidana</strong> atau pernah dipidana karena melakukan suatu kejahatan yang dibuktikan dengan Surat Keterangan Catatan Kepolisian (SKCK) dari Polres setempat.</li>
                  <li class="break-words max-w-full"><strong>Berwibawa, jujur, adil,</strong> dan berkelakuan tidak tercela.</li>
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
                  <li class="break-words max-w-full"><strong>Status Peserta:</strong> Pria/wanita, bukan anggota/mantan anggota TNI/Polri dan ASN, dan belum pernah mengikuti pendidikan pembentukan Polri, TNI, atau Sekolah Kedinasan lainnya.</li>
                  <li class="break-words max-w-full"><strong>Pendidikan Formal:</strong> Berijazah serendah-rendahnya SMA/MA (bukan lulusan dan atau berijazah Paket A, B, dan C). Untuk lulusan SMA/MA IPA/IPS dan lulusan SMA/MA dengan kurikulum Merdeka dibuktikan dengan ijazah Kemendikdasmen, serta lulusan PDF/SPM dengan ijazah Kemenag.</li>
                  <li class="break-words max-w-full"><strong>Batas Usia:</strong> Berumur minimal 16 tahun dan maksimal 22 tahun 0 hari pada saat pembukaan pendidikan.</li>
                  <li class="break-words max-w-full"><strong>Standar Tinggi &amp; Berat Badan:</strong> Tinggi badan minimal (dengan berat badan seimbang menurut ketentuan yang berlaku):
                    <div class="mt-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 flex flex-col sm:flex-row gap-2 sm:gap-6">
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-blue-600 text-sm">male</span> Pria: Minimal 165 (seratus enam puluh lima) cm</span>
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-pink-600 text-sm">female</span> Wanita: Minimal 163 (seratus enam puluh tiga) cm</span>
                    </div>
                  </li>
                  <li class="break-words max-w-full"><strong>Status Pernikahan:</strong> Belum pernah menikah secara hukum positif/agama/adat, belum pernah hamil/melahirkan, belum pernah memiliki anak biologis (anak kandung), dan sanggup untuk tidak menikah selama dalam masa pendidikan pembentukan.</li>
                  <li class="break-words max-w-full"><strong>Tato &amp; Tindik:</strong> Tidak bertato dan tidak memiliki tindik telinga atau anggota badan lainnya, kecuali yang disebabkan oleh ketentuan adat/agama resmi.</li>
                  <li class="break-words max-w-full">Bagi peserta calon Taruna/i Akpol yang telah gagal/TMS dalam proses tes karena melakukan tindak pidana yang telah berkekuatan hukum tetap (inkrah) tidak dapat mendaftar kembali.</li>
                  <li class="break-words max-w-full">Bagi peserta calon Taruna/i Akpol yang telah gagal/TMS di tahapan tes PMK pada tahun sebelumnya tidak dapat mendaftar kembali.</li>
                  <li class="break-words max-w-full">Bagi peserta calon Taruna/i Akpol yang diberhentikan dari proses pendidikan pembentukan TNI/Polri atau Sekolah Kedinasan lainnya tidak dapat mendaftar.</li>
                  <li class="break-words max-w-full">Mantan Taruna/i atau Siswa/i yang diberhentikan tidak dengan hormat dari proses pendidikan oleh lembaga pendidikan yang dibiayai oleh anggaran negara tidak dapat mendaftar.</li>
                  <li class="break-words max-w-full">Dinyatakan bebas narkoba berdasarkan hasil pemeriksaan kesehatan oleh Panpus/Panda.</li>
                  <li class="break-words max-w-full">Tidak mendukung atau ikut serta dalam organisasi atau paham yang bertentangan dengan Pancasila, Undang-Undang Dasar 1945, NKRI, dan Bhinneka Tunggal Ika.</li>
                  <li class="break-words max-w-full">Membuat surat pernyataan bermaterai, untuk tidak melakukan perbuatan yang melanggar norma agama, norma kesusilaan, norma sosial, dan norma hukum.</li>
                  <li class="break-words max-w-full">Membuat surat pernyataan bermaterai bersedia ditempatkan di seluruh wilayah NKRI pada semua bidang tugas kepolisian, ditandatangani oleh peserta dan diketahui orang tua/wali.</li>
                  <li class="break-words max-w-full">Membuat surat pernyataan bermaterai, untuk tidak mempercayai pihak-pihak yang menawarkan, menjanjikan, dan menjamin dapat membantu meluluskan dalam proses tes penerimaan, yang ditandatangani oleh calon peserta dan diketahui oleh orang tua/wali.</li>
                  <li class="break-words max-w-full">Bagi calon Taruna/i Akpol Tahun Anggaran 2025/2026 yang berusaha menggunakan sponsor/koneksi dengan cara menghubungi lewat telepon/surat atau dalam bentuk apapun kepada panitia/pejabat yang berwenang melalui orang tua/wali/keluarga atau pihak lain akan didiskualifikasi.</li>
                  <li class="break-words max-w-full">Bagi yang memperoleh ijazah dari sekolah di luar negeri, harus mendapat pengesahan dari Kemendikdasmen.</li>
                  <li class="break-words max-w-full"><strong>Ketentuan Domisili:</strong>
                    <ul class="list-disc list-outside pl-4 mt-1.5 space-y-1.5 text-slate-600">
                      <li class="break-words max-w-full">Peserta berdomisili minimal 2 tahun di wilayah Polda tempat mendaftar (terhitung pada saat pembukaan pendidikan) dengan melampirkan Kartu Keluarga dan Kartu Tanda Penduduk atau Kartu Identitas Anak (terhitung mulai tercatat di domisili baru), dengan verifikasi oleh Panitia Daerah dan Dinas Kependudukan dan Pencatatan Sipil.</li>
                      <li class="break-words max-w-full">Bagi peserta yang berdomisili kurang dari 2 tahun, dapat mendaftar di Polda sesuai tempat pendidikan/sekolah SMA/MA peserta dengan ketentuan:
                        <p class="pl-2 mt-0.5">• Minimal 2 tahun pada riwayat rapor sekolah SMA/MA (terhitung saat buka pendidikan) bagi yang bertempat tinggal tidak mengikuti orang tua, dibuktikan melalui rapor sekolah SMA/MA peserta dengan menyertakan KK peserta.</p>
                        <p class="pl-2 mt-0.5">• Minimal 1 tahun terakhir pada riwayat rapor sekolah SMA/MA (terhitung saat Buka Dik) bagi yang bertempat tinggal mengikuti orang tua, dibuktikan melalui KK dan rapor sekolah SMA/MA peserta.</p>
                      </li>
                      <li class="break-words max-w-full">Bagi peserta yang tidak memenuhi persyaratan di atas, dapat mendaftar di Polda sesuai domisili sebelumnya (terhitung mulai dengan riwayat pada domisili sebelumnya), dengan verifikasi oleh Panitia Daerah dan Dinas Kependudukan dan Pencatatan Sipil.</li>
                      <li class="break-words max-w-full">Bagi peserta dari SMA Taruna Nusantara dan SMA Krida Nusantara yang masih kelas XII, dapat mendaftar di Polda sesuai asal domisili, atau untuk peserta dari SMA Taruna Nusantara dapat mendaftar di Polda Jateng atau Polda DIY, sedangkan untuk peserta dari SMA Krida Nusantara dapat mendaftar di Polda Jabar, dengan ketentuan mengikuti kuota kelulusan berdasarkan peringkat pada Polda sesuai persyaratan domisili.</li>
                    </ul>
                  </li>
                  <li class="break-words max-w-full">Bersedia menjalani Ikatan Dinas Pertama (IDP) selama 10 (sepuluh) tahun terhitung saat diangkat menjadi Perwira Polri.</li>
                  <li class="break-words max-w-full">Memperoleh persetujuan resmi dari orang tua/wali.</li>
                  <li class="break-words max-w-full">Tidak terikat perjanjian Ikatan Dinas dengan suatu instansi lain.</li>
                  <li class="break-words max-w-full">Bagi calon Taruna/i yang dinyatakan lulus terpilih agar melampirkan kartu BPJS Kesehatan yang aktif.</li>
                  <li class="break-words max-w-full">Bagi yang sudah bekerja secara tetap sebagai pegawai/karyawan:
                    <p class="pl-2 mt-0.5">• Mendapat persetujuan/rekomendasi dari kepala instansi yang bersangkutan.</p>
                    <p class="pl-2 mt-0.5">• Bersedia diberhentikan dari status pegawai/karyawan bila diterima dan mengikuti pendidikan pembentukan Taruna/i Akpol.</p>
                  </li>
                  <li class="break-words max-w-full">Mengikuti dan dinyatakan lulus pada seluruh tahapan pemeriksaan/pengujian seleksi.</li>
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

                <div class="pt-1">
                  <!-- Rincian Alur Jadwal Seleksi Lengkap Step-by-Step -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">9 – 30 Maret 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">PENDAFTARAN ONLINE DAN VERIFIKASI</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">31 Maret 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">PAKTA INTEGRITAS</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">31 Maret – 4 April 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">RIKMIN AWAL</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">7 April – 11 April 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">RIKKES I</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">23 April – 25 April 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">CAT PSIKOLOGI I</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">6 Mei – 11 Mei 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">CAT UJI AKADEMIK</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">7</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">17 Mei – 19 Mei 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">PELAKSANAAN EKG</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">8</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">21 Mei – 24 Mei 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">UJI JASMANI DAN ANTRO</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">9</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">4 Juni 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">SIDANG MENUJU RIKKES II</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">10</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">5 Juni – 6 Juni 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">RIKKES II</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">11</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">13 Juni – 15 Juni 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">PMK DAN PSI II</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">12</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">16 Juni – 17 Juni 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">RIKMIN AKHIR</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">13</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-blue-900">26 Juni 2026</span>
                        <span class="text-[11.5px] text-slate-800 font-bold leading-snug">SIDANG AKHIR PANDA</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-300 flex items-start gap-2.5 shadow-2xs">
                      <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">14</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-black text-amber-900">3 Juli – 27 Juli 2026</span>
                        <span class="text-[11.5px] text-amber-950 font-black leading-snug">SELEKSI TK PANPUS (AKPOL SEMARANG)</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center gap-2.5 shadow-xs">
                      <span class="w-6 h-6 rounded-lg bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0">15</span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-[10px] font-extrabold text-emerald-200 uppercase">1 Agustus 2026</span>
                        <strong class="text-xs font-black text-white leading-snug">BUKA DIK AKPOL</strong>
                      </div>
                    </div>
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
                <li class="break-words max-w-full">• <strong>Manajemen Waktu Presisi (Military Time Management):</strong> Meneladani disiplin bangun pukul 04.00 WIB dan beraktivitas tepat waktu tanpa penundaan.</li>
                <li class="break-words max-w-full">• <strong>Integritas &amp; Moralitas:</strong> Menjunjung tinggi kejujuran dan prinsip bebas suap (BETAH: Bersih, Transparan, Akuntabel, Humanis).</li>
                <li class="break-words max-w-full">• <strong>Jiwa Korsa &amp; Kekompakan:</strong> Saling mendukung dalam tim riset lapangan Field Trip serta menjaga martabat almamater sekolah.</li>
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
          <div class="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5 max-w-full overflow-hidden">
            <div class="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg border-b border-slate-200 pb-2.5">
              <span class="material-symbols-outlined text-slate-600 text-2xl">menu_book</span>
              <span>5. Sumber Jurnal dan Rujukan Ilmiah</span>
            </div>
            <ol class="list-decimal list-outside ml-4 sm:ml-5 space-y-2 text-[11px] sm:text-xs text-slate-700 leading-relaxed break-words max-w-full">
              <li class="break-words max-w-full">
                <strong>Hilyah, A., Fajar, M. H. M., Ikmaluhakim, D. R., Hawan, S. I., Purwanto, M. S., &amp; Bahri, A. S. (2021).</strong> <em>Studi Geologi dan Geofisika Batuan Gunung Bromo dan Sekitarnya.</em> Jurnal SEWAGATI ITS, 5(2), 156–163. <a href="https://doi.org/10.12962/j26139960.v5i2.8248" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://doi.org/10.12962/j26139960.v5i2.8248</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/fungsi/?page=2&amp;fungsi=TN" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://ksdae.kehutanan.go.id/kawasan-konservasi/fungsi/?page=2&amp;fungsi=TN</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Multidisciplinary study with quantitative analysis of isotopic data for the assessment of recharge and functioning of volcanic aquifers: Case of Bromo-Tengger volcano, Indonesia.</strong> <a href="https://hal.science/hal-02410291/file/1-s2.0-S2214581819300941-main-1.pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://hal.science/hal-02410291/file/1-s2.0-S2214581819300941-main-1.pdf</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal GEOID ITS.</strong> <em>Rancang Bangun Sistem Informasi Bencana Gunung Bromo Berbasis WebGIS.</em> <a href="https://journal.its.ac.id/index.php/geoid/article/download/1329/1037" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://journal.its.ac.id/index.php/geoid/article/download/1329/1037</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Avicennia UMM.</strong> <em>Kajian lingkungan kawasan Bromo.</em> <a href="https://ejournal.umm.ac.id/index.php/avicennia/article/download/9406/pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://ejournal.umm.ac.id/index.php/avicennia/article/download/9406/pdf</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Nisa, R. K., Wisanti, Putri, E. K., Kuntjoro S., &amp; Artaka T. (2021).</strong> <em>Keanekaragaman Spesies Anggrek di Ranu Darungan Taman Nasional Bromo Tengger Semeru.</em> LenteraBio, 10(1), 1–9. <a href="https://journal.unesa.ac.id/index.php/lenterabio/article/download/9943/6006/46901" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://journal.unesa.ac.id/index.php/lenterabio/article/download/9943/6006/46901</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Silvikultur Tropika, IPB.</strong> <em>Kajian flora dan fauna TNBTS.</em> <a href="https://journal.ipb.ac.id/index.php/jsilvik/article/download/50332/26338" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://journal.ipb.ac.id/index.php/jsilvik/article/download/50332/26338</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Tropical Biodiversity and Biotechnology, UGM (2024).</strong> <em>The First Record of an Hourglass Toad (Leptophryne borbonica) in the Core Zone of Bromo Tengger Semeru National Park and Its Ecological Aspects.</em> <a href="https://journal.ugm.ac.id/jtbb/article/view/93938" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://journal.ugm.ac.id/jtbb/article/view/93938</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Proceeding of National Conference on Accounting &amp; Finance, UII.</strong> <em>Mengungkap Akuntansi Budaya atas Pembiayaan Ritual.</em> <a href="https://journal.uii.ac.id/NCAF/article/download/22314/pdf" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://journal.uii.ac.id/NCAF/article/download/22314/pdf</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Artikel pada Temu Ilmiah Nasional PERSAGI.</strong> <em>Pengaruh budaya terhadap kebiasaan makan dan gaya hidup.</em> <a href="https://tin.persagi.org/index.php/tin/article/download/85/77/127" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://tin.persagi.org/index.php/tin/article/download/85/77/127</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal Sabbhata Yatra.</strong> <em>Wisata Budaya dan Kuliner Suku Tengger di Desa Wisata Ngadas, TNBTS.</em> <a href="https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.radenwijaya.ac.id/index.php/sabbhata_yatra/article/download/1524/747/</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Jurnal AS, Universitas Sebelas Maret.</strong> <em>Konstruksi Sosial Upacara Adat Karo Suku Tengger.</em> <a href="https://jurnal.uns.ac.id/jas/article/download/42103/28384" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jurnal.uns.ac.id/jas/article/download/42103/28384</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Direktorat Jenderal KSDAE, Kementerian Kehutanan.</strong> <em>Profil Taman Nasional Bromo Tengger Semeru.</em> <a href="https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://ksdae.kehutanan.go.id/kawasan-konservasi/100242021/</a>
              </li>
              <li class="break-words max-w-full">
                <strong>Indonesia Travel.</strong> <em>Bromo Tengger Semeru National Park.</em> <a href="https://www.indonesia.travel/id/id/destination/java/east-java/bromo-tengger-semeru-national-park" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://www.indonesia.travel/id/id/destination/java/east-java/bromo-tengger-semeru-national-park</a>
              </li>
              <li class="break-words max-w-full">
                <strong>ANTARA Jawa Timur (2012).</strong> <em>Mengemas Bromo Menjadi Paket Wisata Satu Destinasi.</em> <a href="https://jatim.antaranews.com/berita/90497/mengemas-bromo-menjadi-paket-wisata-satu-destinasi" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all inline-block max-w-full">https://jatim.antaranews.com/berita/90497/mengemas-bromo-menjadi-paket-wisata-satu-destinasi</a>
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

    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 5 (YOGYAKARTA)
    // Sesi 1: Candi Prambanan (Pilar: EXPLORATION 100%)
    // Sesi 2: Batik Benang Ratu (Pilar: STEM)
    // Sesi 3: Kampus UNY (Wawasan & Refleksi)
    // ==========================================
    let currentD5Session = 1;

    function checkIsD5Sesi1Done(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier].filter(Boolean);

        for (const id of ids) {
          if (localStorage.getItem('fincestem_dok_ft_day5_prambanan_' + id) === 'true') return true;
          const lkpdRaw = localStorage.getItem('fincestem_lkpd_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_lkpd_ft_day5_' + id);
          if (lkpdRaw) {
            try {
              const p = JSON.parse(lkpdRaw);
              if (p && (p.submitted || p.candiDekat || p.ceritaRelief)) return true;
            } catch(e) {}
          }
          const materiRaw = localStorage.getItem('fincestem_materi_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_materi_ft_day5_' + id);
          if (materiRaw) {
            try {
              const m = JSON.parse(materiRaw);
              if (m && (m.conclusion || m.text)) return true;
            } catch(e) {}
          }
        }

        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_lkpd_prambanan'] || tm['5_materi_prambanan'] || tm['5_lkpd'] || tm['5_materi']) return true;
        }
      } catch(e) {}
      return false;
    }


    function checkIsD5Sesi1RefleksiDone(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);

        for (const id of ids) {
          const rawRefl = localStorage.getItem('fincestem_refleksi_ft_day5_prambanan_' + id) || 
                          localStorage.getItem('fincestem_refleksi_ft_day5_' + id) ||
                          localStorage.getItem('fincestem_refl_ft_day5_' + id);
          if (rawRefl) {
            try {
              const parsed = JSON.parse(rawRefl);
              if (parsed && (parsed.submitted || parsed.content || parsed.submitted_at)) return true;
            } catch(e) {
              if (typeof rawRefl === 'string' && rawRefl.trim().length > 5) return true;
            }
          }
        }

        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_refleksi_prambanan'] || tm['5_refleksi']) {
            const task = tm['5_refleksi_prambanan'] || tm['5_refleksi'];
            if (task && (task.status === 'submitted' || task.content)) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function checkIsD5Sesi2MateriDone(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);
        for (const id of ids) {
          const raw = localStorage.getItem('fincestem_materi_ft_day5_batik_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) return true;
            } catch(e) {}
          }
        }
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_materi_batik']) return true;
        }
      } catch(e) {}
      return false;
    }

    function checkIsD5Sesi3MateriDone(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);
        for (const id of ids) {
          const raw = localStorage.getItem('fincestem_materi_ft_day5_uny_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) return true;
            } catch(e) {}
          }
        }
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_materi_uny']) return true;
        }
      } catch(e) {}
      return false;
    }

    function switchD5Session(targetSesi) {
      currentD5Session = Number(targetSesi);
      const mainEl = document.querySelector('main');
      if (mainEl) renderDay5FieldTripModule(mainEl, currentD5Session);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch(e) {}
    }

    function renderDay5FieldTripModule(mainEl, targetSesi) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      const isS1Done = checkIsD5Sesi1Done(cleanNisn);
      const isS1RefleksiDone = checkIsD5Sesi1RefleksiDone(cleanNisn);
      const isS2MateriDone = checkIsD5Sesi2MateriDone(cleanNisn);
      const isS3MateriDone = checkIsD5Sesi3MateriDone(cleanNisn);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD5Session = Number(targetSesi);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const reqSesi = parseInt(urlParams.get('sesi'));
        if (reqSesi === 2 || reqSesi === 3) {
          currentD5Session = reqSesi;
        } else {
          currentD5Session = 1;
        }
      }

      // Tab navigasi 3 Sesi Day 5
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <!-- TAB 1: CANDI PRAMBANAN (EXPLORATION) -->
          <button type="button" onclick="switchD5Session(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5Session === 1 ? 'bg-purple-700 text-white shadow-xs ring-2 ring-purple-400/40' : 'bg-slate-50 hover:bg-purple-50 text-purple-950 border border-purple-200'}">
            <span class="material-symbols-outlined text-base ${currentD5Session === 1 ? 'text-amber-300' : 'text-purple-600'}">temple_hindu</span>
            <span class="truncate">Sesi 1: Candi Prambanan</span>
            ${isS1Done ? '<span class="text-[11px] text-purple-200 font-bold ml-1">✓</span>' : (currentD5Session === 1 ? '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>' : '')}
          </button>

          <!-- TAB 2: BATIK BENANG RATU (STEM) -->
          <button type="button" onclick="switchD5Session(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5Session === 2 ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40' : (isS1RefleksiDone ? 'bg-slate-50 hover:bg-amber-50 text-amber-950 border border-amber-300' : 'bg-slate-100 text-slate-400 border border-slate-200')}">
            <span class="material-symbols-outlined text-base ${currentD5Session === 2 ? 'text-amber-200' : (isS1RefleksiDone ? 'text-amber-700' : 'text-slate-400')}">${isS1RefleksiDone ? 'palette' : 'lock'}</span>
            <span class="truncate">Sesi 2: Seni Batik</span>
            ${isS2MateriDone ? '<span class="text-[11px] text-amber-200 font-bold ml-1">✓</span>' : (!isS1RefleksiDone ? '<span class="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold ml-1">Kunci</span>' : (currentD5Session === 2 ? '<span class="w-2 h-2 rounded-full bg-amber-300 animate-pulse ml-0.5"></span>' : ''))}
          </button>

          <!-- TAB 3: KAMPUS UNY (REFLEKSI STUDI LANJUT) -->
          <button type="button" onclick="switchD5Session(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5Session === 3 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
            <span class="material-symbols-outlined text-base ${currentD5Session === 3 ? 'text-amber-300' : 'text-blue-600'}">school</span>
            <span class="truncate">Sesi 3: Kampus UNY</span>
            ${isS3MateriDone ? '<span class="text-[11px] text-blue-200 font-bold ml-1">✓</span>' : (currentD5Session === 3 ? '<span class="w-2 h-2 rounded-full bg-blue-300 animate-pulse ml-0.5"></span>' : '')}
          </button>
        </div>
      `;

      if (currentD5Session === 2) {
        if (!isS1RefleksiDone) {
          // KONDISI TERKUNCI: WAJIB SELESAIKAN REFLEKSI SESI 1 TERLEBIH DAHULU
          mainEl.innerHTML = `
            ${tabNavHtml}
            <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                  Field Trip • Day 5 • Sesi 2
                </span>
                <span class="text-xs font-bold text-amber-200">Pukul 11.00 - 12.45 WIB</span>
              </div>
              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                Sesi 2: Laboratorium Praktik Sains Membatik
              </h2>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-200 font-extrabold text-xs w-fit">
                <span class="material-symbols-outlined text-base">science</span>
                <span>Pilar Murni: STEM (Sains Kimia Lilin Malam, Termodinamika & Pelorotan)</span>
              </div>
              <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                Laboratorium sains dan rekayasa tekstil nusantara di Sentra Batik Benang Ratu Yogyakarta: membuktikan sifat rintang lilin malam hidrofobik, termodinamika suhu kerja canting tembaga, kapilaritas fluida, siklus rekayasa proses pewarnaan, dan hukum Archimedes pada pelorotan lilin (nglorod).
              </p>
            </div>

            <div class="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-amber-300 shadow-sm flex flex-col items-center text-center gap-3.5">
              <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center ring-4 ring-amber-200/80 shadow-2xs">
                <span class="material-symbols-outlined text-3xl">lock</span>
              </div>
              <div class="flex flex-col gap-1 max-w-md">
                <h3 class="font-black text-lg text-slate-900">Sesi 2 (Batik Benang Ratu) Masih Terkunci</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sesuai alur kurikulum kegiatan lapangan, Anda wajib menyelesaikan seluruh rangkaian <strong>Sesi 1 Candi Prambanan</strong> hingga pengisian <strong>Jurnal Refleksi Sesi 1</strong> sebelum dapat membuka modul &amp; LKPD Sesi 2 Batik.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full max-w-sm justify-center">
                <button type="button" onclick="switchD5Session(1)" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">arrow_back</span>
                  <span>Kembali ke Sesi 1</span>
                </button>
                <a href="dashboard.html?day=5&task=refleksi" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">psychology</span>
                  <span>Buka Jurnal Refleksi Sesi 1</span>
                </a>
              </div>
            </div>
          `;
          return;
        }

        // KONDISI TERBUKA: SISWA TELAH MENYELESAIKAN REFLEKSI SESI 1!
        renderD5S2BatikModule(mainEl, tabNavHtml, cleanNisn);
        return;
      }

      if (currentD5Session === 3) {
        renderD5S3UnyModule(mainEl, tabNavHtml, cleanNisn);
        return;
      }

      // ==========================================
      // SESI 1: CANDI PRAMBANAN (MURNI EXPLORATION 100%)
      // ==========================================
      mainEl.innerHTML = `
        ${tabNavHtml}

        <!-- BANNER MODUL FIELD TRIP DAY 5 SESI 1 -->
        <div class="bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-purple-100 backdrop-blur-md">
              Field Trip • Day 5 • Sesi 1
            </span>
            <span class="text-xs font-bold text-purple-200">Jumat, 13 November 2026</span>
          </div>
          <h2 class="font-black text-xl sm:text-2xl leading-tight">
            Eksplorasi Mahakarya Candi Prambanan
          </h2>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-400/20 text-purple-200 font-extrabold text-xs w-fit">
            <span class="material-symbols-outlined text-base">explore</span>
            <span>Pilar Utama: EXPLORATION (100% Cagar Budaya & Sejarah)</span>
          </div>
          <p class="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-medium">
            Jelajahi keagungan gugusan candi Hindu terbesar di Indonesia, petakan tata ruang Candi Trimurti dan Candi Wahana, serta telusuri epos relief petualangan Ramayana melalui tradisi pradaksina.
          </p>
          <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-purple-200 font-semibold flex-wrap">
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span>08.00 - 10.30 WIB</span>
            </span>
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">location_on</span>
              <span>Kompleks Candi Prambanan, Sleman, D.I. Yogyakarta</span>
            </span>
          </div>
        </div>

        <!-- TIMELINE RUNDOWN EKSPLORASI SESI 1 -->
        <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2 text-purple-950 font-black text-sm sm:text-base border-b border-slate-100 pb-2">
            <span class="material-symbols-outlined text-purple-700 text-xl">route</span>
            <span>Agenda Rute Eksplorasi Candi Prambanan</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div class="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <div>
                <strong class="text-purple-950 block">08.00 - 08.30 WIB</strong>
                <span class="text-slate-600 text-[11px]">Tiba di kawasan Candi Prambanan, pengondisian tim & aktivasi GPS aplikasi.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <div>
                <strong class="text-purple-950 block">08.30 - 09.30 WIB</strong>
                <span class="text-slate-600 text-[11px]">Eksplorasi Pelataran Pusat: Mengamati Candi Siwa (47m), Candi Brahma, Candi Wisnu & Candi Wahana Nandi.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <div>
                <strong class="text-purple-950 block">09.30 - 10.15 WIB</strong>
                <span class="text-slate-600 text-[11px]">Berburu relief Ramayana di dinding lorong Candi Siwa dengan jalan memutar searah jarum jam (pradaksina).</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
              <div>
                <strong class="text-purple-950 block">10.15 - 10.30 WIB</strong>
                <span class="text-slate-600 text-[11px]">Pengisian checklist LKPD sederhana & foto geotag di pelataran utama.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- KONTEN MATERI BAB 1 S.D. BAB 4 -->
        <div class="flex flex-col gap-4">

          <!-- BAB 1 -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-purple-950 border-b border-slate-100 pb-2">
              <div class="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-xs shrink-0">1</div>
              <h3 class="font-extrabold text-base text-slate-900">Eksplorasi Sejarah Mataram Kuno (Abad ke-9 Masehi)</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Candi Prambanan dibangun sekitar tahun <strong>850 Masehi oleh Rakai Pikatan</strong> dari Wangsa Sanjaya pada era Kerajaan Mataram Kuno, kemudian disempurnakan oleh raja-raja penerusnya seperti Raja Lokapala dan Raja Balitung.
            </p>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Berdasarkan <strong>Prasasti Shivagrha (856 M)</strong>, candi megah ini dinamai <em>Shivagrha</em> (artinya Rumah Dewa Siwa) untuk memuliakan Dewa Siwa sebagai dewa tertinggi dalam tradisi Hindu Siwa. Candi ini menjadi bukti puncak keemasan peradaban dan kemampuan pengorganisasian bangsa Indonesia tempo dulu.
            </p>
          </div>

          <!-- BAB 2 -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-purple-950 border-b border-slate-100 pb-2">
              <div class="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-xs shrink-0">2</div>
              <h3 class="font-extrabold text-base text-slate-900">Eksplorasi Tata Letak Gugusan Candi (Trimurti & Wahana)</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Kompleks Candi Prambanan aslinya menaungi 240 candi. Di pelataran pusat berdiri megah tiga candi utama pemujaan Trimurti yang menghadap ke timur:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-black text-purple-900">1. Candi Wisnu (Utara)</span>
                <span class="text-slate-600 text-[11.5px]">Tinggi 33 meter, dipersembahkan untuk Dewa Wisnu sang pemelihara alam semesta.</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-purple-50 border border-purple-300 flex flex-col gap-1">
                <span class="font-black text-purple-950">2. Candi Siwa (Tengah)</span>
                <span class="text-slate-700 text-[11.5px]">Candi terbesar & tertinggi mencapai <strong>47 meter</strong>, menaungi arca Siwa Mahadewa di bilik utamanya.</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-black text-purple-900">3. Candi Brahma (Selatan)</span>
                <span class="text-slate-600 text-[11.5px]">Tinggi 33 meter, dipersembahkan untuk Dewa Brahma sang pencipta alam semesta.</span>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pt-1">
              Tepat di seberang ketiga candi utama berdiri tiga <strong>Candi Wahana</strong> (hewan tunggangan dewa):
            </p>
            <ul class="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1 font-medium pl-1">
              <li><strong>Candi Nandi:</strong> Berada di depan Candi Siwa, menaungi arca lembu jantan Nandi (lambang ketabahan).</li>
              <li><strong>Candi Angsa:</strong> Berada di depan Candi Brahma, wahana burung angsa (lambang kebijaksanaan).</li>
              <li><strong>Candi Garuda:</strong> Berada di depan Candi Wisnu, wahana burung garuda sakti (lambang keberanian).</li>
            </ul>
          </div>

          <!-- BAB 3 -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-purple-950 border-b border-slate-100 pb-2">
              <div class="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-xs shrink-0">3</div>
              <h3 class="font-extrabold text-base text-slate-900">Eksplorasi Alur Cerita Relief Epos Ramayana</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Dinding pagar langkan Candi Siwa dan Candi Brahma dihiasi pahatan relief mahakarya epos <strong>Ramayana</strong>.
            </p>
            <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex flex-col gap-1">
              <strong>🧭 Tradisi Berjalan Pradaksina:</strong>
              <span>Untuk membaca cerita relief secara urut, naiklah ke teras Candi Siwa melalui tangga sisi timur, lalu berjalanlah menyusuri lorong <strong>searah jarum jam (berputar ke arah kiri)</strong>. Cerita dimulai dari sayembara Rama memenangkan Shinta, pengasingan ke hutan Dandaka, penculikan Shinta oleh Rahwana, perjumpaan dengan kera putih Hanoman, hingga perang di Alengka.</span>
            </div>
          </div>

          <!-- BAB 4 -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-purple-950 border-b border-slate-100 pb-2">
              <div class="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-xs shrink-0">4</div>
              <h3 class="font-extrabold text-base text-slate-900">Eksplorasi Penemuan Kembali & Warisan UNESCO</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Candi Prambanan sempat terbengkalai selama ratusan tahun akibat gempa bumi besar pada abad ke-16 serta letusan Gunung Merapi purba.
            </p>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Situs ini ditemukan kembali oleh penjelajah Inggris (Colin Mackenzie) tahun 1733, mulai dipugar bertahap, dan peresmian pemugaran Candi Siwa dilakukan oleh Presiden Pertama RI Ir. Soekarno pada tahun 1953. Pada tahun <strong>1991</strong>, UNESCO resmi menetapkan Kompleks Candi Prambanan sebagai <strong>Situs Warisan Budaya Dunia (World Heritage No. 642)</strong>.
            </p>
          </div>

        </div>

        <!-- FORM RESUME MODUL SESI 1 (SYARAT BUKA LKPD SESI 1) -->
        <div id="ftD5S1ResumeCard" class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border-2 border-purple-300 shadow-sm flex flex-col gap-3.5 mt-2">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
              <h3 class="font-extrabold text-base text-purple-950">Resume Pemahaman Eksplorasi Candi Prambanan</h3>
            </div>
            <span id="ftD5S1StatusBadge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Wajib Disimpan (Tahap 1)
            </span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Tuliskan ringkasan pemahaman Anda mengenai raja pembangun Candi Prambanan dan susunan 3 candi utama Trimurti yang ada di pelataran pusat (minimal 15 kata):
          </p>

          <textarea id="ftD5S1ConclusionInput" rows="3" class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" placeholder="Contoh: Candi Prambanan dibangun oleh Rakai Pikatan dari Kerajaan Mataram Kuno pada tahun 850 Masehi. Di pelataran pusat terdapat 3 candi utama yaitu Candi Siwa setinggi 47 meter di tengah, Candi Brahma di sisi selatan, dan Candi Wisnu di sisi utara..."></textarea>

          <div class="flex items-center justify-between gap-2 flex-wrap pt-1">
            <span id="ftD5S1SavedTime" class="text-xs text-slate-500 font-medium">
              Belum disimpan
            </span>
            <button id="btnSaveD5S1Materi" type="button" onclick="saveMateriConclusionD5S1()" class="px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span class="material-symbols-outlined text-lg">save</span>
              <span id="btnSaveD5S1MateriText">Simpan Kesimpulan & Buka LKPD Prambanan</span>
            </button>
          </div>
        </div>

        <!-- KARTU AKSES MENUJU LKPD SESI 1 -->
        <div id="ftD5S1LkpdAccessBox" class="p-5 rounded-3xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span id="ftD5S1LkpdLockIcon" class="material-symbols-outlined text-amber-300 text-2xl">lock</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase text-purple-700 tracking-wider">Tahap 2 Lapangan</span>
              <h4 id="ftD5S1LkpdLockTitle" class="text-sm sm:text-base font-extrabold text-slate-900">LKPD Eksplorasi Candi Prambanan</h4>
              <p id="ftD5S1LkpdLockDesc" class="text-xs text-slate-500">Simpan kesimpulan modul di atas terlebih dahulu untuk membuka lembar kerja eksplorasi.</p>
            </div>
          </div>
          <button id="btnGoToD5S1Lkpd" type="button" onclick="handleGoToLkpdD5S1()" class="px-5 py-3 rounded-2xl bg-slate-300 text-slate-500 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-not-allowed">
            <span id="btnGoToD5S1LkpdText">LKPD Masih Terkunci</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      `;

      // Cek apakah kesimpulan Sesi 1 sudah pernah disimpan
      checkInitialMateriConclusionD5S1();
    }

    function checkInitialMateriConclusionD5S1() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), nisn];

      let saved = null;
      for (const id of idVars) {
        const stored = localStorage.getItem('fincestem_materi_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_materi_ft_day5_' + id);
        if (stored) {
          try { saved = JSON.parse(stored); break; } catch(e) {}
        }
      }

      if (saved) {
        applyMateriConclusionStateD5S1(saved.conclusion || saved.text || '', saved.savedAt);
      } else if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        const task = tm['5_materi_prambanan'] || tm['5_materi'];
        if (task && task.content) {
          let cText = (typeof task.content === 'object') ? (task.content.conclusion || task.content.text) : task.content;
          if (cText) applyMateriConclusionStateD5S1(cText, task.submitted_at);
        }
      }
    }

    function applyMateriConclusionStateD5S1(text, savedAt) {
      if (!text) return;
      const txtArea = document.getElementById('ftD5S1ConclusionInput');
      const badge = document.getElementById('ftD5S1StatusBadge');
      const savedTimeEl = document.getElementById('ftD5S1SavedTime');
      const saveBtn = document.getElementById('btnSaveD5S1Materi');
      const btnSaveText = document.getElementById('btnSaveD5S1MateriText');
      const lockIcon = document.getElementById('ftD5S1LkpdLockIcon');
      const lockTitle = document.getElementById('ftD5S1LkpdLockTitle');
      const lockDesc = document.getElementById('ftD5S1LkpdLockDesc');
      const btnGo = document.getElementById('btnGoToD5S1Lkpd');
      const btnGoText = document.getElementById('btnGoToD5S1LkpdText');

      if (txtArea) {
        txtArea.value = text;
        txtArea.setAttribute('disabled', 'disabled');
        txtArea.classList.add('bg-slate-100', 'cursor-not-allowed', 'text-slate-600');
      }
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300';
        badge.textContent = '🔒 Kesimpulan Disimpan & Terkunci';
      }
      if (savedTimeEl) {
        const dtStr = savedAt ? new Date(savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Tersimpan';
        savedTimeEl.textContent = `Tersimpan pada ${dtStr}`;
      }
      if (saveBtn) {
        saveBtn.classList.add('pointer-events-none', 'opacity-70');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-lg">lock</span><span>Kesimpulan Telah Terkunci</span>';
      } else if (btnSaveText) {
        btnSaveText.textContent = 'Kesimpulan Telah Terkunci';
      }

      if (lockIcon) {
        lockIcon.textContent = 'lock_open';
        lockIcon.className = 'material-symbols-outlined text-emerald-400 text-2xl';
      }
      if (lockTitle) lockTitle.textContent = 'Tahap 2 Terbuka: LKPD Eksplorasi Candi Prambanan';
      if (lockDesc) lockDesc.textContent = 'Kesimpulan modul telah tersimpan. Silakan lanjutkan pengisian lembar kerja eksplorasi di pelataran candi.';
      if (btnGo) {
        btnGo.className = 'px-5 py-3 rounded-2xl bg-purple-700 text-white hover:bg-purple-800 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer';
        btnGo.onclick = function() {
          window.location.href = 'lkpd.html?day=5&sesi=1';
        };
      }
      if (btnGoText) btnGoText.textContent = 'Buka LKPD Candi Prambanan';
    }

    function saveMateriConclusionD5S1() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txtArea = document.getElementById('ftD5S1ConclusionInput');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 15) {
        FincestemCore.ui.toast('Tuliskan ringkasan pemahaman Candi Prambanan Anda minimal 15-20 kata!', 'error');
        return;
      }

      const saveBtn = document.getElementById('btnSaveD5S1Materi');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), nisn];
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_materi_ft_day5_prambanan_' + id, JSON.stringify(record));
          localStorage.setItem('fincestem_materi_ft_day5_' + id, JSON.stringify(record));
        } catch(e) {}
      });

      applyMateriConclusionStateD5S1(text, record.savedAt);

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 5, 'materi_prambanan', record, function() {
          FincestemCore.progress.submitTask(cleanNisn, 5, 'materi', record, function() {
            if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
              FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Kesimpulan Telah Terkunci', 'lock');
            }
            FincestemCore.ui.toast('Kesimpulan Candi Prambanan berhasil disimpan! LKPD Sesi 1 sekarang telah terbuka.', 'success');
          });
        });
      } else {
        FincestemCore.ui.toast('Kesimpulan Candi Prambanan berhasil disimpan! LKPD Sesi 1 sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdD5S1() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), nisn];

      let saved = null;
      for (const id of idVars) {
        const s = localStorage.getItem('fincestem_materi_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_materi_ft_day5_' + id);
        if (s) { saved = s; break; }
      }

      if (!saved && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        if (tm['5_materi_prambanan'] || tm['5_materi']) saved = 'true';
      }

      if (!saved) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan kesimpulan di atas sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftD5S1ConclusionInput');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=5&sesi=1';
    }

    // ==========================================
    // MODUL LENGKAP DAY 5 SESI 2: SENTRA BATIK BENANG RATU (STEM 100%)
    // ==========================================
    function renderD5S2BatikModule(mainEl, tabNavHtml, cleanNisn) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = cleanNisn || user.nisn || user.identifier || '';
      const idVars = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);

      // Cek apakah kesimpulan materi Sesi 2 sudah pernah disimpan
      let savedConclusion = '';
      let savedTime = '';
      for (const id of idVars) {
        const raw = localStorage.getItem('fincestem_materi_ft_day5_batik_' + id);
        if (raw) {
          try {
            const p = JSON.parse(raw);
            if (p && (p.conclusion || p.text || p.content)) {
              savedConclusion = p.conclusion || p.text || p.content;
              savedTime = p.savedAt || p.time || '';
              break;
            }
          } catch(e) {}
        }
      }

      if (!savedConclusion && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        const task = tm['5_materi_batik'];
        if (task && task.content) {
          let p = task.content;
          if (typeof p === 'string') {
            try { p = JSON.parse(p); } catch(e) {}
          }
          if (p && typeof p === 'object') {
            savedConclusion = p.conclusion || p.text || p.content || '';
            savedTime = p.savedAt || task.updated_at || '';
          }
        }
      }

      mainEl.innerHTML = `
        ${tabNavHtml}

        <!-- BANNER MODUL FIELD TRIP DAY 5 SESI 2 -->
        <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
              Field Trip • Day 5 • Sesi 2
            </span>
            <span class="text-xs font-bold text-amber-200">Jumat, 13 November 2026</span>
          </div>
          <h2 class="font-black text-xl sm:text-2xl leading-tight">
            Laboratorium Sains &amp; Rekayasa Batik (Sentra Batik Benang Ratu)
          </h2>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-200 font-extrabold text-xs w-fit">
            <span class="material-symbols-outlined text-base">science</span>
            <span>Pilar Murni: 🔬 STEM (Sains, Teknologi, Rekayasa, Matematika)</span>
          </div>
          <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
            Selamat datang di Sentra Kerajinan Batik Benang Ratu Yogyakarta! Di sesi ini, kita akan membongkar rahasia sains di balik mahakarya batik nusantara: reaksi kimia rintang hidrofobik lilin malam, termodinamika suhu kerja canting tembaga, fenomena kapilaritas fluida, siklus rekayasa proses pewarnaan kain mori, serta hukum Archimedes saat proses pelorotan malam (nglorod).
          </p>
          <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-amber-200 font-semibold flex-wrap">
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span>11.00 - 12.45 WIB</span>
            </span>
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">location_on</span>
              <span>Sentra Batik Benang Ratu, Yogyakarta</span>
            </span>
          </div>
        </div>

        <!-- TIMELINE RUNDOWN PRAKTIK MEMBATIK SESI 2 -->
        <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
          <div class="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base border-b border-slate-100 pb-2">
            <span class="material-symbols-outlined text-amber-700 text-xl">precision_manufacturing</span>
            <span>Agenda Tahapan Praktikum Sains Membatik</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <div>
                <strong class="text-amber-950 block">11.00 - 11.20 WIB</strong>
                <span class="text-slate-600 text-[11px]">Pengenalan alat canting tembaga, formula lilin malam, serta demonstrasi sains rintang kimiawi.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <div>
                <strong class="text-amber-950 block">11.20 - 12.00 WIB</strong>
                <span class="text-slate-600 text-[11px]">Praktik Nyanting: Menguji termodinamika suhu kerja lilin 60°C - 70°C dan kapilaritas cucuk canting pada kain mori.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <div>
                <strong class="text-amber-950 block">12.00 - 12.25 WIB</strong>
                <span class="text-slate-600 text-[11px]">Pencelupan Zat Warna Dingin &amp; Fiksasi Kimia: Membuktikan sifat hidrofobik malam menolak partikel zat warna polar.</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
              <div>
                <strong class="text-amber-950 block">12.25 - 12.45 WIB</strong>
                <span class="text-slate-600 text-[11px]">Proses Nglorod (Air 100°C): Mengamati hukum Archimedes saat lilin malam meleleh dan mengapung di permukaan air.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- WIDGET AUDIO GUIDE TTS -->
        <div class="p-4 rounded-3xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span class="material-symbols-outlined text-xl">headphones</span>
            </span>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-black text-amber-950 truncate">Panduan Suara Modul Sesi 2</span>
              <span class="text-[11px] text-amber-800/80 font-medium truncate">Dengarkan penjelasan sains STEM membatik</span>
            </div>
          </div>
          <button type="button" onclick="speakFieldTripText('Selamat datang di Sentra Kerajinan Batik Benang Ratu Yogyakarta. Pada Sesi 2 ini, kita mempelajari empat bab sains STEM membatik: sifat hidrofobik lilin malam, termodinamika canting tembaga pada suhu 60 hingga 70 derajat celsius, lima siklus rekayasa batik, serta hukum Archimedes saat proses nglorod.')" class="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0">
            <span class="material-symbols-outlined text-base">volume_up</span>
            <span>Putar Audio</span>
          </button>
        </div>

        <!-- KONTEN MATERI BAB 1 S.D. BAB 4 (MURNI 100% STEM) -->
        <div class="flex flex-col gap-4">

          <!-- BAB 1: SAINS KIMIA BATIK -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-black text-sm">01</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Sains Kimia: Sifat Hidrofobik Lilin Malam (Wax Barrier)</h3>
                <span class="text-[11px] font-bold text-amber-800">Prinsip Resist Dyeing &amp; Interaksi Molekul Non-Polar</span>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col gap-2.5">
              <p>
                Kunci utama mahakarya seni batik terletak pada fenomena kimia rintang warna (<em>resist dyeing</em>). Lilin malam batik bukan sekadar lilin biasa, melainkan formulasi kimiawi yang tersusun dari campuran <strong>parafin</strong> (hidrokarbon jenuh rantai panjang CnH2n+2), <strong>gondorukem</strong> (asam resinat dari getah pinus), dan <strong>lilin lebah (beeswax)</strong>.
              </p>
              <div class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col gap-1.5 text-xs">
                <span class="font-extrabold text-amber-950 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-700">water_drop</span>
                  Prinsip Polaritas "Like Dissolves Like":
                </span>
                <p class="text-slate-600 text-[11px] leading-relaxed">
                  • <strong>Lilin Malam (Non-Polar / Hidrofobik):</strong> Molekul malam didominasi ikatan kovalen non-polar C-C dan C-H tanpa momen dipol listrik, sehingga secara alami <strong>menolak molekul air</strong>.<br>
                  • <strong>Zat Pewarna Tekstil (Polar / Hidrofilik):</strong> Zat pewarna batik (Naphtol, Indigosol, atau zat warna reaktif) dilarutkan dalam media air (H2O) yang bersifat sangat polar.<br>
                  • <strong>Hasil Reaksi Lapangan:</strong> Saat kain mori katun (selulosa) dicelupkan ke dalam larutan pewarna dingin, air dan pigmen warna tidak dapat menembus atau membasahi area kain yang dilapisi lilin malam padat. Daerah ini terlindungi sempurna dan tetap berwarna putih bersih!
                </p>
              </div>
            </div>
          </div>

          <!-- BAB 2: FISIKA TERAPAN & TEKNOLOGI CANTING -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-black text-sm">02</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Fisika Terapan &amp; Teknologi Canting: Termodinamika &amp; Kapilaritas</h3>
                <span class="text-[11px] font-bold text-orange-800">Konduktivitas Termal Logam Tembaga &amp; Suhu Kerja Ideal</span>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col gap-2.5">
              <p>
                Canting tulis adalah inovasi teknologi kearifan lokal yang menerapkan hukum termodinamika dan mekanika fluida:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div class="p-3 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col gap-1">
                  <span class="font-extrabold text-orange-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-base text-orange-600">hardware</span>
                    Metalurgi Canting Tembaga (Cu)
                  </span>
                  <p class="text-slate-600 text-[11px] leading-relaxed">
                    Canting dibuat dari lempengan tembaga murni karena tembaga memiliki konduktivitas termal sangat tinggi (k ≈ 401 W/m·K). Tembaga mentransfer panas wajan secara cepat dan merata ke ujung cucuk (paruh canting), menjaga lilin tetap cair saat digoreskan.
                  </p>
                </div>
                <div class="p-3 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col gap-1">
                  <span class="font-extrabold text-orange-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-base text-orange-600">fluid_med</span>
                    Fenomena Kapilaritas Fluida
                  </span>
                  <p class="text-slate-600 text-[11px] leading-relaxed">
                    Lilin malam mengalir turun melalui pipa cucuk sempit berkat gaya adhesi dan tegangan permukaan fluida (kapilaritas). Kemiringan pegangan canting (45° – 60°) mengatur laju debit tetesan ke pori serat kain.
                  </p>
                </div>
              </div>

              <!-- Termodinamika Suhu Kerja -->
              <div class="p-3.5 rounded-2xl bg-white border border-orange-200 flex flex-col gap-1.5 text-xs">
                <span class="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-orange-600">device_thermostat</span>
                  Tiga Zona Termodinamika Suhu Kerja Lilin Malam:
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col gap-0.5">
                    <strong class="text-blue-950 text-xs">Zona Dingin (&lt; 60°C)</strong>
                    <span class="text-[11px] text-slate-600">Viskositas terlalu tinggi (kental). Cucuk tersumbat dan malam tidak meresap ke serat kain sehingga gampang rontok saat pewarnaan.</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 ring-1 ring-emerald-300 flex flex-col gap-0.5">
                    <strong class="text-emerald-950 text-xs">Zona Ideal (60°C – 70°C) ✓</strong>
                    <span class="text-[11px] text-slate-600">Viskositas fluida optimum. Malam mengalir mulus, meresap tembus ke dua sisi kain mori (tembus bolak-balik) mengunci serat selulosa.</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col gap-0.5">
                    <strong class="text-rose-950 text-xs">Zona Panas (&gt; 80°C)</strong>
                    <span class="text-[11px] text-slate-600">Viskositas terlalu encer, lilin mendidih berasap, meleber merusak garis pola motif (nyelepet), dan kain katun bisa rapuh terbakar.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BAB 3: REKAYASA (ENGINEERING) SIKLUS PRODUKSI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0 font-black text-sm">03</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Rekayasa (Engineering): Siklus 5 Tahapan Produksi Batik</h3>
                <span class="text-[11px] font-bold text-yellow-800">Manajemen Alur Kerja Proses Tekstil Presisi Tinggi</span>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col gap-2.5">
              <p>
                Proses pembuatan batik merupakan runtutan rekayasa manufaktur tekstil berulang (<em>cyclic engineering process</em>) yang membutuhkan kedisiplinan dan presisi bertahap:
              </p>
              <div class="flex flex-col gap-2 text-xs">
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <span class="px-2 py-1 rounded-md bg-amber-600 text-white font-extrabold text-[11px] shrink-0">1. Nyorek</span>
                  <span class="text-slate-700 text-[11px]">Membuat sketsa motif geometri atau flora-fauna pada kain mori primissima menggunakan pensil lunak sesuai skala proporsional.</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <span class="px-2 py-1 rounded-md bg-amber-600 text-white font-extrabold text-[11px] shrink-0">2. Nyanting</span>
                  <span class="text-slate-700 text-[11px]">Mengaplikasikan lilin malam cair menggunakan canting tembaga untuk mengunci garis kontur luar (nglowong) dan ornamen ornamen isen-isen.</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <span class="px-2 py-1 rounded-md bg-amber-600 text-white font-extrabold text-[11px] shrink-0">3. Nyelup (Medel)</span>
                  <span class="text-slate-700 text-[11px]">Mencelupkan kain ke larutan zat warna dingin. Difusi warna hanya berlangsung pada area serat mori yang tidak tertutup malam.</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <span class="px-2 py-1 rounded-md bg-amber-600 text-white font-extrabold text-[11px] shrink-0">4. Fiksasi Kimia</span>
                  <span class="text-slate-700 text-[11px]">Mengunci ikatan kimia kovalen antara zat warna dan serat selulosa katun (menggunakan waterglass sodium silikat atau asam) agar warna permanen tahan cuci.</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <span class="px-2 py-1 rounded-md bg-amber-600 text-white font-extrabold text-[11px] shrink-0">5. Nglorod</span>
                  <span class="text-slate-700 text-[11px]">Meluruhkan seluruh lilin malam rintang di dalam air mendidih untuk mengekspos kontras warna dan motif batik secara utuh.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BAB 4: SAINS PELOROTAN & DENSITAS ARCHIMEDES -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-black text-sm">04</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Sains Pelorotan (Nglorod) &amp; Fisika Densitas Archimedes</h3>
                <span class="text-[11px] font-bold text-teal-800">Termofisika Perubahan Wujud &amp; Prinsip Pemisahan Massa Jenis</span>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col gap-2.5">
              <p>
                Bagaimana lilin malam yang merekat kuat pada serat kain katun dapat dibersihkan tanpa merusak warna kain? Di sinilah penerapan prinsip sains pelorotan (<em>nglorod</em>):
              </p>
              <div class="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex flex-col gap-2 text-xs">
                <div class="flex items-center gap-2 text-teal-950 font-extrabold">
                  <span class="material-symbols-outlined text-base text-teal-700">science</span>
                  <span>1. Termofisika Peleburan Lilin (Titik Lebur &lt; 100°C)</span>
                </div>
                <p class="text-slate-600 text-[11px] leading-relaxed">
                  Titik lebur lilin malam berada pada rentang 55°C – 65°C. Ketika kain dicelupkan ke kancah air mendidih bersuhu 100°C, lilin seketika meleleh kembali menjadi cairan encer dan terlepas sempurna dari jalinan serat katun.
                </p>

                <div class="flex items-center gap-2 text-teal-950 font-extrabold pt-2 border-t border-teal-200/60">
                  <span class="material-symbols-outlined text-base text-teal-700">bubble_chart</span>
                  <span>2. Hukum Archimedes &amp; Perbedaan Massa Jenis (ρ_lilin &lt; ρ_air)</span>
                </div>
                <p class="text-slate-600 text-[11px] leading-relaxed">
                  • Massa jenis lilin malam: <strong>ρ_lilin ≈ 0,88 – 0,93 g/cm³</strong>.<br>
                  • Massa jenis air mendidih: <strong>ρ_air ≈ 0,96 – 1,00 g/cm³</strong>.<br>
                  • Karena <strong>ρ_lilin &lt; ρ_air</strong>, cairan lilin yang terlepas dari kain otomatis terdorong ke atas oleh gaya apung Archimedes dan <strong>mengapung di permukaan air</strong>!<br>
                  • Pengrajin dengan sangat mudah menyaring atau menyerok lapisan malam mengapung tersebut untuk dimurnikan dan dicetak ulang (<em>sustainable recycling</em>), sedangkan kain batik dibilas air dingin menjadi bersih tuntas tanpa sisa lilin.
                </p>
              </div>
            </div>
          </div>

        </div>

        <!-- FORM RESUME & SIMPAN KESIMPULAN SESI 2 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-amber-300/80 shadow-xs flex flex-col gap-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-700 text-xl">edit_note</span>
              <h3 class="font-extrabold text-sm sm:text-base text-slate-900">Resume &amp; Kesimpulan Sesi 2: Sains STEM Membatik</h3>
            </div>
            <span class="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">Prasyarat Membuka LKPD Sesi 2</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">
            Tuliskan intisari prinsip sains STEM yang Anda pelajari dari modul di atas (misal: sifat hidrofobik lilin malam yang menolak pewarna air, suhu ideal canting 60°C - 70°C, atau alasan lilin mengapung saat nglorod karena massa jenisnya lebih ringan dari air):
          </p>
          <textarea id="ftD5S2ConclusionInput" rows="3" class="w-full p-3 rounded-2xl border border-amber-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Tuliskan kesimpulan sains STEM membatik Anda di sini (minimal 15 kata)...">${savedConclusion}</textarea>

          <div id="ftD5S2ConclusionStatus" class="hidden p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2 text-xs">
            <span class="text-emerald-900 font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
              <span>Kesimpulan Sesi 2 Berhasil Disimpan</span>
            </span>
            <span id="ftD5S2ConclusionSavedTime" class="text-[11px] text-emerald-700 font-medium"></span>
          </div>

          <div id="ftD5S2ConclusionActionRow" class="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <button id="ftD5S2SaveConclusionBtn" type="button" onclick="saveMateriConclusionD5S2()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all">
              <span class="material-symbols-outlined text-base">save</span>
              <span>Simpan Kesimpulan Modul Sesi 2</span>
            </button>
            <button id="ftD5S2GoLkpdBtn" type="button" onclick="handleGoToLkpdD5S2()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all opacity-50 pointer-events-none">
              <span class="material-symbols-outlined text-base">arrow_forward</span>
              <span>Lanjut ke LKPD Sesi 2: Praktik Membatik</span>
            </button>
          </div>
        </div>
      `;

      if (savedConclusion) {
        applyMateriConclusionStateD5S2(savedConclusion, savedTime);
      }
    }

    function saveMateriConclusionD5S2() {
      const input = document.getElementById('ftD5S2ConclusionInput');
      const text = input ? input.value.trim() : '';
      if (!text || text.length < 15) {
        FincestemCore.ui.toast('Tuliskan kesimpulan sains STEM membatik minimal 15 kata!', 'warning');
        return;
      }
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const idVars = Array.from(new Set([cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), nisn])).filter(Boolean);
      const record = {
        conclusion: text,
        savedAt: new Date().toISOString()
      };
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_materi_ft_day5_batik_' + id, JSON.stringify(record));
        } catch(e) {}
      });
      applyMateriConclusionStateD5S2(text, record.savedAt);
      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 5, 'materi_batik', record, function() {
          FincestemCore.ui.toast('Kesimpulan Sains STEM Membatik Berhasil Disimpan! LKPD Sesi 2 kini telah dibuka.', 'success');
        });
      } else {
        FincestemCore.ui.toast('Kesimpulan Sains STEM Membatik Berhasil Disimpan! LKPD Sesi 2 kini telah dibuka.', 'success');
      }
    }

    function applyMateriConclusionStateD5S2(savedText, savedTime) {
      const input = document.getElementById('ftD5S2ConclusionInput');
      const saveBtn = document.getElementById('ftD5S2SaveConclusionBtn');
      const statusBox = document.getElementById('ftD5S2ConclusionStatus');
      const timeBox = document.getElementById('ftD5S2ConclusionSavedTime');
      const nextBtn = document.getElementById('ftD5S2GoLkpdBtn');

      if (input) {
        input.value = savedText;
        input.disabled = true;
        input.classList.add('bg-slate-100', 'text-slate-600', 'cursor-not-allowed');
      }
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.classList.remove('bg-amber-600', 'hover:bg-amber-700', 'cursor-pointer');
        saveBtn.classList.add('bg-emerald-600', 'text-white', 'cursor-default');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-base">check_circle</span><span>Kesimpulan Telah Disimpan</span>';
      }
      if (statusBox) statusBox.classList.remove('hidden');
      if (timeBox && savedTime) {
        try {
          timeBox.textContent = new Date(savedTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        } catch (e) {
          timeBox.textContent = savedTime;
        }
      }
      if (nextBtn) {
        nextBtn.classList.remove('opacity-50', 'pointer-events-none');
        nextBtn.classList.add('animate-pulse');
      }
    }

    function handleGoToLkpdD5S2() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      if (!checkIsD5Sesi2MateriDone(cleanNisn)) {
        FincestemCore.ui.toast('Harap simpan kesimpulan modul Sesi 2 terlebih dahulu sebelum membuka LKPD!', 'warning');
        const txt = document.getElementById('ftD5S2ConclusionInput');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=5&sesi=2';
    }

    // ==========================================
    // MODUL BELAJAR DAY 5 SESI 3: KAMPUS UNY
    // (Inspirasi Studi Lanjut & Cita-Cita Masa Depan - Murni Refleksi Mandiri)
    // ==========================================
    function renderD5S3UnyModule(mainEl, tabNavHtml, cleanNisn) {
      const user = FincestemCore.auth.getUser() || {};
      mainEl.innerHTML = `
        ${tabNavHtml}

        <!-- BANNER MODUL FIELD TRIP DAY 5 SESI 3 -->
        <div class="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-blue-100 backdrop-blur-md">
              Field Trip • Day 5 • Sesi 3
            </span>
            <span class="text-xs font-bold text-blue-200">Pukul 14.30 - 17.00 WIB</span>
          </div>
          <h2 class="font-black text-xl sm:text-2xl leading-tight">
            Sesi 3: Kunjungan Edukasi Kampus UNY (Inspirasi Studi Lanjut)
          </h2>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-400/20 text-blue-200 font-extrabold text-xs w-fit">
            <span class="material-symbols-outlined text-base">school</span>
            <span>Inspirasi Masa Depan: 🎓 Refleksi Studi Lanjut PTN (Murni Refleksi Mandiri)</span>
          </div>
          <p class="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
            Mengenal atmosfer akademik dan fasilitas unggulan Universitas Negeri Yogyakarta (UNY), memetakan potensi diri, serta menumbuhkan motivasi kuat menembus perguruan tinggi negeri impian sejak kelas X.
          </p>
        </div>

        <!-- 3 BAB MATERI EDUKASI KAMPUS UNY -->
        <div class="flex flex-col gap-4">

          <!-- BAB 1: PROFIL & REPUTASI UNY -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">1</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Mengenal Universitas Negeri Yogyakarta (UNY)</h3>
                <span class="text-[11px] font-bold text-blue-800">Kampus Pendidikan &amp; Sains Teknologi Bereputasi Dunia</span>
              </div>
            </div>
            <div class="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Universitas Negeri Yogyakarta (UNY) bermula dari IKIP Yogyakarta yang berdiri sejak 1964 dan kini bertransformasi menjadi salah satu <strong>Perguruan Tinggi Negeri Berbadan Hukum (PTN-BH)</strong> terkemuka di Indonesia. UNY memiliki reputasi unggul baik dalam bidang kependidikan (pencetak guru &amp; tenaga pendidik profesional) maupun non-kependidikan (ilmu murni sains, teknik, ekonomi, seni, bahasa, dan keolahragaan).
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div class="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col gap-1">
                  <span class="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-blue-600">local_library</span>
                    <span>Fasilitas Akademik Modern</span>
                  </span>
                  <span class="text-[11px] text-slate-600">Digital Library modern, laboratorium riset terpadu, pusat pembelajaran mikro (Microteaching Lab), dan sport center berstandar internasional.</span>
                </div>
                <div class="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col gap-1">
                  <span class="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-indigo-600">domain</span>
                    <span>Atmosfer Kota Pendidikan</span>
                  </span>
                  <span class="text-[11px] text-slate-600">Terletak strategis di kawasan Karangmalang, Yogyakarta, dikelilingi komunitas ilmiah, perpustakaan daerah, dan pusat kebudayaan nusantara.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BAB 2: FAKULTAS UNGGULAN & JALUR PENERIMAAN PTN -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">2</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Eksplorasi Fakultas, Program Studi &amp; Jalur Masuk PTN</h3>
                <span class="text-[11px] font-bold text-blue-800">Menemukan Jurusan yang Sesuai Minat &amp; Bakat</span>
              </div>
            </div>
            <div class="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                UNY menaungi 8 Fakultas dan 1 Sekolah Vokasi dengan puluhan program studi sarjana (S1) dan terapan (D4):
              </p>
              <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700">
                <li><strong>FIP (Fakultas Ilmu Pendidikan &amp; Psikologi)</strong>: PGSD, PGPAUD, Manajemen Pendidikan, Psikologi, Bimbingan Konseling.</li>
                <li><strong>FMIPA (Fakultas Matematika &amp; Ilmu Pengetahuan Alam)</strong>: Pendidikan Matematika/Fisika/Kimia/Biologi, Sains Data, Biologi, Kimia, Fisika, Matematika Murni.</li>
                <li><strong>FT (Fakultas Teknik)</strong>: Teknik Elektro, Teknik Mesin, Teknik Sipil, Pendidikan Teknik Informatika, Arsitektur.</li>
                <li><strong>FEB (Fakultas Ekonomi &amp; Bisnis)</strong>: Manajemen, Akuntansi, Pendidikan Ekonomi, Bisnis Digital.</li>
                <li><strong>FBSB (Fakultas Bahasa, Seni &amp; Budaya)</strong>: Sastra Indonesia/Inggris, Pendidikan Bahasa, Seni Rupa, Seni Musik, Tari.</li>
                <li><strong>FISHIPOL &amp; FIKK</strong>: Ilmu Komunikasi, Hukum, Sosiologi, Pendidikan Olahraga, Kepelatihan Olahraga.</li>
              </ul>
              <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex flex-col gap-1.5 mt-1">
                <span class="font-bold text-amber-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-amber-700">door_open</span>
                  <span>3 Jalur Masuk Perguruan Tinggi Negeri (PTN):</span>
                </span>
                <span class="text-slate-700 leading-relaxed">
                  <strong>1. SNBP (Seleksi Nasional Berdasarkan Prestasi)</strong>: Seleksi nilai rapor semester 1-5 + prestasi pendukung tanpa tes tulis.<br>
                  <strong>2. SNBT (Seleksi Nasional Berdasarkan Tes)</strong>: UTBK Tes Potensi Skolastik, Literasi Bahasa Indonesia/Inggris, dan Penalaran Matematika.<br>
                  <strong>3. Seleksi Mandiri UNY</strong>: Jalur Prestasi Akademik/Olahraga/Seni, Skor UTBK, dan CBT Kampus.
                </span>
              </div>
            </div>
          </div>

          <!-- BAB 3: MEMBANGUN KOMITMEN DAN IKHTIAR SEJAK KELAS X -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
              <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">3</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Membangun Komitmen &amp; Ikhtiar Nyata di Sekolah</h3>
                <span class="text-[11px] font-bold text-blue-800">Strategi Sukses Menuju Kampus Impian Mulai Hari Ini</span>
              </div>
            </div>
            <div class="flex flex-col gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Meraih kursi di perguruan tinggi negeri impian bukanlah hasil keberuntungan semalam, melainkan akumulasi ikhtiar konsisten sejak awal SMA:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1 text-xs">
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong class="text-slate-900 block mb-1">1. Nilai Rapor Stabil &amp; Meningkat</strong>
                  <span class="text-slate-600 text-[11px]">Pertahankan tren nilai positif sejak semester 1 agar masuk kuota eligible siswa terbaik sekolah pada seleksi SNBP.</span>
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong class="text-slate-900 block mb-1">2. Literasi &amp; Berpikir Kritis</strong>
                  <span class="text-slate-600 text-[11px]">Latih daya nalar matematis dan pemahaman bacaan kritis untuk kesiapan UTBK SNBT serta pemecahan masalah nyata.</span>
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong class="text-slate-900 block mb-1">3. Karakter &amp; Portofolio</strong>
                  <span class="text-slate-600 text-[11px]">Aktif dalam kegiatan kokurikuler riset FINCESTEM, lomba karya tulis, dan organisasi untuk memperkaya portofolio prestasi.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- FORM RESUME / CATATAN INSPIRASI MODUL SESI 3 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-xs flex flex-col gap-3.5">
          <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">edit_note</span>
            </span>
            <div>
              <h3 class="font-black text-sm sm:text-base">Catatan Inspirasi Kunjungan Kampus UNY</h3>
              <span class="text-[11px] font-bold text-blue-800">Simpan resume singkat pemahaman materi sebelum lanjut ke LKPD</span>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Tuliskan rangkuman singkat atau hal paling menginspirasi yang Anda pelajari mengenai kampus UNY, pilihan program studi, dan persiapan studi lanjut Anda:
          </p>
          <textarea id="ftD5S3ConclusionInput" rows="3" class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white" placeholder="Contoh: UNY menginspirasi saya karena fasilitas risetnya yang lengkap. Saya ingin mempersiapkan nilai rapor sejak semester 1 agar bisa mendaftar prodi impian..."></textarea>
          
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div id="ftD5S3ConclusionStatus" class="hidden text-xs text-emerald-700 font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">check_circle</span>
              <span>Tersimpan di sistem (<span id="ftD5S3ConclusionSavedTime">-</span>)</span>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto ml-auto">
              <button id="ftD5S3SaveConclusionBtn" type="button" onclick="saveMateriConclusionD5S3()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all">
                <span class="material-symbols-outlined text-base">save</span>
                <span>Simpan Catatan Inspirasi</span>
              </button>
              <button id="ftD5S3GoLkpdBtn" type="button" onclick="handleGoToLkpdD5S3()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all opacity-50 pointer-events-none">
                <span>Buka LKPD Sesi 3 UNY</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      `;

      // Cek apakah siswa sudah pernah menyimpan catatan resume Sesi 3
      try {
        const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), user.nis, user.identifier];
        let savedText = '';
        let savedTime = '';
        for (const id of idVars) {
          if (!id) continue;
          const raw = localStorage.getItem('fincestem_materi_ft_day5_uny_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) {
                savedText = p.conclusion || p.text || p.content;
                savedTime = p.savedAt || p.date || '';
                break;
              }
            } catch(e) {}
          }
        }
        if (!savedText && window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_materi_uny']) {
            const task = tm['5_materi_uny'];
            if (task.content) {
              try {
                const p = JSON.parse(task.content);
                savedText = p.conclusion || p.text || task.content;
              } catch(e) {
                savedText = task.content;
              }
            }
          }
        }
        if (savedText) {
          applyMateriConclusionStateD5S3(savedText, savedTime);
        }
      } catch(e) {}
    }

    function saveMateriConclusionD5S3() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txt = (document.getElementById('ftD5S3ConclusionInput')?.value || '').trim();

      if (!txt || txt.length < 5) {
        FincestemCore.ui.toast('Tuliskan catatan inspirasi kunjungan UNY Anda minimal beberapa kata!', 'warning');
        const el = document.getElementById('ftD5S3ConclusionInput');
        if (el) el.focus();
        return;
      }

      const now = new Date().toISOString();
      const payload = {
        conclusion: txt,
        savedAt: now
      };

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), user.nis, user.identifier].filter(Boolean);
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_materi_ft_day5_uny_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 5, 'materi_uny', payload, function() {
          applyMateriConclusionStateD5S3(txt, now);
          FincestemCore.ui.toast('Catatan inspirasi Modul Sesi 3 UNY berhasil disimpan!', 'success');
        });
      } else {
        applyMateriConclusionStateD5S3(txt, now);
        FincestemCore.ui.toast('Catatan inspirasi Modul Sesi 3 UNY berhasil disimpan!', 'success');
      }
    }

    function applyMateriConclusionStateD5S3(savedText, savedTime) {
      const input = document.getElementById('ftD5S3ConclusionInput');
      const saveBtn = document.getElementById('ftD5S3SaveConclusionBtn');
      const statusBox = document.getElementById('ftD5S3ConclusionStatus');
      const timeBox = document.getElementById('ftD5S3ConclusionSavedTime');
      const nextBtn = document.getElementById('ftD5S3GoLkpdBtn');

      if (input) {
        input.value = savedText;
        input.disabled = true;
        input.classList.add('bg-slate-100', 'text-slate-600', 'cursor-not-allowed');
      }
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
        saveBtn.classList.add('bg-emerald-600', 'text-white', 'cursor-default');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-base">check_circle</span><span>Catatan Telah Disimpan</span>';
      }
      if (statusBox) statusBox.classList.remove('hidden');
      if (timeBox && savedTime) {
        try {
          timeBox.textContent = new Date(savedTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        } catch (e) {
          timeBox.textContent = savedTime;
        }
      }
      if (nextBtn) {
        nextBtn.classList.remove('opacity-50', 'pointer-events-none');
        nextBtn.classList.add('animate-pulse');
      }
    }

    function handleGoToLkpdD5S3() {
      window.location.href = 'lkpd.html?day=5&sesi=3';
    }

    window.renderDay5FieldTripModule = renderDay5FieldTripModule;
    window.switchD5Session = switchD5Session;
    window.saveMateriConclusionD5S1 = saveMateriConclusionD5S1;
    window.handleGoToLkpdD5S1 = handleGoToLkpdD5S1;
    window.renderD5S2BatikModule = renderD5S2BatikModule;
    window.saveMateriConclusionD5S2 = saveMateriConclusionD5S2;
    window.applyMateriConclusionStateD5S2 = applyMateriConclusionStateD5S2;
    window.handleGoToLkpdD5S2 = handleGoToLkpdD5S2;
    window.renderD5S3UnyModule = renderD5S3UnyModule;
    window.saveMateriConclusionD5S3 = saveMateriConclusionD5S3;
    window.applyMateriConclusionStateD5S3 = applyMateriConclusionStateD5S3;
    window.handleGoToLkpdD5S3 = handleGoToLkpdD5S3;
    window.checkIsD5Sesi1RefleksiDone = checkIsD5Sesi1RefleksiDone;
    window.checkIsD5Sesi2MateriDone = checkIsD5Sesi2MateriDone;
    window.checkIsD5Sesi3MateriDone = checkIsD5Sesi3MateriDone;


    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 6
    // Sesi 1: Pabrik Bakpia Jogja (Pilar: FINANCIAL 100% - Simple & Praktis)
    // Sesi 2: Pantai Drini & Drini Park (Pilar: EXPLORATION)
    // ==========================================
    let currentD6Session = 1;

    function checkIsD6Sesi1Done(cleanNisn) {
      try {
        const user = FincestemCore.auth.getUser() || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);
        for (const id of ids) {
          const raw = localStorage.getItem('fincestem_materi_ft_day6_bakpia_' + id) || localStorage.getItem('fincestem_materi_ft_day6_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) return true;
            } catch(e) {}
          }
        }
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['6_materi_bakpia'] || tm['6_materi']) return true;
        }
      } catch(e) {}
      return false;
    }

    function switchD6Session(targetSesi) {
      currentD6Session = Number(targetSesi);
      const mainEl = document.querySelector('main');
      if (mainEl) renderDay6FieldTripModule(mainEl, currentD6Session);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch(e) {}
    }

    function renderDay6FieldTripModule(mainEl, targetSesi) {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      const isS1Done = checkIsD6Sesi1Done(cleanNisn);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD6Session = Number(targetSesi);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const reqSesi = parseInt(urlParams.get('sesi'));
        if (reqSesi === 2) {
          currentD6Session = reqSesi;
        } else {
          currentD6Session = 1;
        }
      }

      // Tab navigasi 2 Sesi Day 6
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
          <!-- TAB 1: PABRIK BAKPIA JOGJA (FINANCIAL) -->
          <button type="button" onclick="switchD6Session(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD6Session === 1 ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40' : 'bg-slate-50 hover:bg-amber-50 text-amber-950 border border-amber-200'}">
            <span class="material-symbols-outlined text-base ${currentD6Session === 1 ? 'text-amber-200' : 'text-amber-600'}">bakery_dining</span>
            <span class="truncate">Sesi 1: Pabrik Bakpia Jogkem</span>
            ${isS1Done ? '<span class="text-[11px] text-amber-200 font-bold ml-1">✓</span>' : (currentD6Session === 1 ? '<span class="w-2 h-2 rounded-full bg-amber-300 animate-pulse ml-0.5"></span>' : '')}
          </button>

          <!-- TAB 2: PANTAI DRINI & DRINI PARK (EXPLORATION) -->
          <button type="button" onclick="switchD6Session(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD6Session === 2 ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-400/40' : 'bg-slate-50 hover:bg-teal-50 text-teal-950 border border-teal-200'}">
            <span class="material-symbols-outlined text-base ${currentD6Session === 2 ? 'text-teal-200' : 'text-teal-600'}">beach_access</span>
            <span class="truncate">Sesi 2: Pantai Drini &amp; Park</span>
          </button>
        </div>
      `;

      if (currentD6Session === 2) {
        // PREVIEW SESI 2: PANTAI DRINI & DRINI PARK
        mainEl.innerHTML = `
          ${tabNavHtml}
          <div class="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md">
                Field Trip • Day 6 • Sesi 2
              </span>
              <span class="text-xs font-bold text-teal-200">Pukul 11.30 - 15.30 WIB</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Sesi 2: Eksplorasi Ekosistem Karst &amp; Bahari Pantai Drini
            </h2>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-400/20 text-teal-200 font-extrabold text-xs w-fit">
              <span class="material-symbols-outlined text-base">beach_access</span>
              <span>Pilar Murni: 🧭 EXPLORATION (Geomorfologi Karst &amp; Ekowisata)</span>
            </div>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
              Eksplorasi bentang alam karst Pegunungan Sewu, fenomena pulau karang pemecah ombak, dan observasi tata kelola wisata pesisir terpadu Drini Park.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-surface-container-lowest border border-teal-200/80 shadow-xs flex flex-col items-center text-center gap-3">
            <div class="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <span class="material-symbols-outlined text-3xl">beach_access</span>
            </div>
            <h3 class="font-extrabold text-base text-slate-900">Sesi 2: Kunjungan Pantai Drini &amp; Park</h3>
            <p class="text-xs text-slate-600 max-w-sm">
              Sesi ini dibuka pada siang hari pukul 11.30 WIB setelah rombongan tiba di kawasan pesisir Gunungkidul.
            </p>
            <button type="button" onclick="switchD6Session(1)" class="mt-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer transition-all">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>Buka Sesi 1 Pabrik Bakpia</span>
            </button>
          </div>
        `;
        return;
      }

      // ==========================================
      // SESI 1: PABRIK BAKPIA JOGJA (MURNI FINANCIAL 100%)
      // ==========================================
      renderD6S1BakpiaModule(mainEl, tabNavHtml, cleanNisn);
    }

    function renderD6S1BakpiaModule(mainEl, tabNavHtml, cleanNisn) {
      const user = FincestemCore.auth.getUser() || {};
      mainEl.innerHTML = `
        ${tabNavHtml}

        <!-- BANNER MODUL FIELD TRIP DAY 6 SESI 1 -->
        <div class="bg-gradient-to-br from-amber-600 via-orange-700 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
              Field Trip • Day 6 • Sesi 1
            </span>
            <span class="text-xs font-bold text-amber-200 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span>Pukul 08.00 - 10.30 WIB</span>
            </span>
          </div>
          
          <div>
            <h2 class="font-black text-xl sm:text-2xl lg:text-3xl leading-tight">
              Bakpia: Perjalanan Akulturasi Cina–Indonesia dalam Makanan Khas Yogyakarta
            </h2>
            <p class="text-xs sm:text-sm text-amber-100/90 mt-1.5 font-medium leading-relaxed">
              Kajian Etnografi Kuliner, Harmoni Lintas Budaya, dan Strategi Kewirausahaan Finansial Tradisional Menjadi Ikon Oleh-Oleh Daerah
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-white/15 text-[11px] font-semibold text-amber-100">
            <span class="px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-200 font-extrabold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">palette</span>
              <span>Pilar Budaya (Akulturasi)</span>
            </span>
            <span class="px-2.5 py-1 rounded-xl bg-emerald-400/20 text-emerald-200 font-extrabold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">payments</span>
              <span>Pilar Finansial (Kewirausahaan)</span>
            </span>
            <span class="text-white/80 italic ml-auto">
              Sumber: Multikultura UI (Vol. 3 No. 3, Juli 2024, hlm. 366–385)
            </span>
          </div>
        </div>

        <!-- PROFIL DESTINASI KUNJUNGAN EDUKATIF: BAKPIA JOGKEM -->
        <div class="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 rounded-3xl p-5 sm:p-6 border-2 border-amber-300/80 shadow-xs flex flex-col gap-4">
          <div class="flex items-start sm:items-center justify-between gap-3 flex-wrap border-b border-amber-200/80 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
                <span class="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-black text-base sm:text-lg text-slate-900">
                    Profil Destinasi Riset: Bakpia Jogkem
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-amber-600 text-white shadow-2xs">
                    Lokasi Kunjungan Lapangan
                  </span>
                </div>
                <span class="text-xs font-bold text-amber-800 italic mt-0.5">
                  “Jogja Ngangeni, Jogja Kembali”
                </span>
              </div>
            </div>
            
            <a href="https://bakpiajogkem.id/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 font-extrabold text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer">
              <span>Website Resmi Jogkem</span>
              <span class="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>

          <!-- Rincian Profil -->
          <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Bakpia Jogkem</strong> merupakan usaha kuliner unggulan di Yogyakarta yang bergerak di bidang produksi dan penjualan bakpia berkualitas sebagai oleh-oleh khas daerah. Nama <strong>"Jogkem"</strong> merupakan akronim resmi dari <strong>"Jogja Kembali"</strong>, yang disandingkan dengan slogan hangat <em>“Jogja Ngangeni, Jogja Kembali”</em>—mencerminkan kerinduan mendalam wisatawan untuk selalu pulang dan kembali ke Yogyakarta.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <!-- Kartu 1: Sejarah & Perjalanan -->
              <div class="p-3.5 rounded-2xl bg-white border border-amber-200 flex flex-col gap-1.5 shadow-2xs">
                <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <span class="material-symbols-outlined text-amber-700 text-base">history_edu</span>
                  <span>Perintisan &amp; Usia Usaha</span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">
                  Mulai dirintis pada tahun <strong>2013</strong> dan memperingati usia ke-12 tahun pada Desember 2025. Terus bertumbuh pesat menjadi salah satu sentra oleh-oleh modern terfavorit di Yogyakarta.
                </p>
              </div>

              <!-- Kartu 2: Karakteristik & Varian Rasa -->
              <div class="p-3.5 rounded-2xl bg-white border border-amber-200 flex flex-col gap-1.5 shadow-2xs">
                <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <span class="material-symbols-outlined text-amber-700 text-base">bakery_dining</span>
                  <span>Ciri Khas &amp; Varian Rasa</span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">
                  Terkenal dengan <strong>tekstur isian yang lembut dan kulit pastry yang tipis</strong>. Menawarkan varian inovatif: <em>kacang hijau, kumbu hitam, cokelat, keju, green tea, cappuccino, tiramisu, susu</em>, serta varian buah-buahan segar.
                </p>
              </div>

              <!-- Kartu 3: Open Kitchen Edukasi -->
              <div class="p-3.5 rounded-2xl bg-white border border-amber-200 flex flex-col gap-1.5 shadow-2xs">
                <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <span class="material-symbols-outlined text-amber-700 text-base">visibility</span>
                  <span>Konsep Open Kitchen</span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">
                  Mengembangkan fasilitas dapur terbuka (<em>open kitchen</em>), di mana peserta didik dapat melihat langsung proses pengadukan, pencetakan kulit, penumisan isian, dan pemanggangan higienis.
                </p>
              </div>
            </div>

            <!-- Relevansi dengan FINCESTEM & Kunjungan Edukatif -->
            <div class="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 flex flex-col gap-1.5">
              <strong class="text-xs flex items-center gap-1.5 text-amber-900">
                <span class="material-symbols-outlined text-sm text-amber-800">school</span>
                <span>Fokus Pembelajaran FINCESTEM di Bakpia Jogkem:</span>
              </strong>
              <p class="text-xs text-slate-700 leading-relaxed">
                Kunjungan edukatif ke Bakpia Jogkem membekali siswa untuk mempelajari manajemen wirausaha kuliner, inovasi varian produk, pengoperasian mesin oven &amp; peralatan produksi, standarisasi kemasan higienis, serta strategi pemasaran modern. Kunjungan ini menghubungkan materi <strong>akulturasi budaya</strong> dengan implementasi nyata <strong>Sains, Teknologi, Rekayasa, dan Matematika (STEM)</strong> dalam industri pangan.
              </p>
              <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200 text-[10.5px] text-slate-600">
                <span class="font-bold text-slate-800">Sumber Informasi Resmi:</span>
                <a href="https://bakpiajogkem.id/" target="_blank" rel="noopener noreferrer" class="text-amber-800 underline font-medium hover:text-amber-950">Website Resmi Jogkem</a> •
                <a href="https://www.bisnisjogja.id/bakpia-jogkem-12-tahun-jogja-ngangeni-jogja-kembali/" target="_blank" rel="noopener noreferrer" class="text-amber-800 underline font-medium hover:text-amber-950">Bisnis Jogja (HUT ke-12)</a> •
                <a href="https://jogja-ngangkring.com/news/show/0905202537-launching-bakpia-jogkem-jakal" target="_blank" rel="noopener noreferrer" class="text-amber-800 underline font-medium hover:text-amber-950">Jogja Ngangkring (Soft Opening Jakal)</a>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
              <span class="material-symbols-outlined text-amber-700 text-base shrink-0">arrow_downward</span>
              <span>
                <strong>Panduan Belajar:</strong> Sebelum mengamati langsung di lokasi Bakpia Jogkem, pelajari terlebih dahulu kajian ilmiah mengenai sejarah akulturasi budaya dan proses pembuatan bakpia pada materi di bawah ini:
              </span>
            </div>
          </div>
        </div>

        <!-- DAFTAR MATERI A SAMPAI I -->
        <div class="flex flex-col gap-4">

          <!-- A. PENGERTIAN AKULTURASI BUDAYA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">A</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Pengertian Akulturasi Budaya</h3>
                <span class="text-[11px] font-bold text-amber-800">Pertemuan dua kebudayaan yang saling melengkapi</span>
              </div>
            </div>
            <div class="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Akulturasi budaya</strong> adalah proses pertemuan dua kebudayaan atau lebih yang saling memengaruhi secara timbal balik. Proses ini berlangsung bertahap hingga unsur budaya yang berasal dari luar diterima dan berpadu secara harmonis menjadi bagian tak terpisahkan dari kehidupan masyarakat setempat tanpa menghilangkan kepribadian kebudayaan asli.
              </p>
              <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
                <span class="material-symbols-outlined text-amber-700 shrink-0 text-lg mt-0.5">diversity_3</span>
                <p class="text-xs text-amber-950">
                  Akulturasi dapat dijumpai dalam berbagai ranah kehidupan: tarian tradisional, busana adat, perayaan tradisi, bahasa percakapan, hingga ragam kuliner khas. Salah satu bukti akulturasi budaya Cina dan Indonesia yang paling lekat dan terkenal adalah <strong>bakpia</strong>, yang kini diakui sebagai makanan khas Yogyakarta.
                </p>
              </div>
            </div>
          </div>

          <!-- B. SEJARAH DAN ASAL-USUL BAKPIA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">B</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Sejarah dan Asal-Usul Bakpia di Yogyakarta</h3>
                <span class="text-[11px] font-bold text-amber-800">Dua tokoh perintis tahun 1940-an: Kwik Sun Kok &amp; Liem Bok Sing</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Bakpia berakar dari pengaruh kuliner Tionghoa dan mulai bersemi di Yogyakarta sekitar dekade <strong>1940-an</strong>. Berdasarkan telaah artikel ilmiah, terdapat dua tokoh perintis utama yang meletakkan fondasi produksi bakpia:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <strong class="text-slate-900 text-xs sm:text-sm">Kwik Sun Kok &amp; Niti Gurnito</strong>
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Kwik Sun Kok merupakan keturunan Cina kelahiran Wonogiri yang menimba ilmu pembuatan bakpia langsung di Cina. Sekembalinya ke Indonesia, ia mulai merintis usaha di Tamansari Yogyakarta dengan menyewa tanah milik <strong>Niti Gurnito</strong>. Ketika Kwik berpindah lokasi, ia mewariskan resep rahasia dan tenaga kerja kepada Niti Gurnito, yang kemudian melegenda dengan merek <em>Bakpia M Niti Gurnito</em>.
                  </p>
                </div>
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <strong class="text-slate-900 text-xs sm:text-sm">Liem Bok Sing (Cikal Bakal Pathuk)</strong>
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Liem Bok Sing merupakan perantau dari Cina yang mengembangkan produksi bakpia di kawasan Pathuk. Usahanya menjadi pelopor lahirnya sentra industri <em>Bakpia Pathuk</em> yang kini identik dengan penomoran rumah toko (seperti Bakpia Pathuk 25, 75, dll).
                  </p>
                </div>
              </div>
              <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 text-xs flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-700 text-base shrink-0">info</span>
                <span><strong>Fakta Sejarah:</strong> Kwik Sun Kok dan Liem Bok Sing adalah dua sosok berbeda dan bukan saudara kandung, namun dedikasi keduanya membentuk fondasi lahirnya industri bakpia di Yogyakarta.</span>
              </div>
            </div>
          </div>

          <!-- C. PROSES AKULTURASI BUDAYA CINA-INDONESIA PADA BAKPIA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">C</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Proses Akulturasi Budaya Cina–Indonesia pada Bakpia</h3>
                <span class="text-[11px] font-bold text-amber-800">Adaptasi resep, penggantian bahan non-halal, dan penerimaan lokal</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Bakpia menjadi teladan sempurna dari akulturasi karena mengalami transformasi resep, bahan baku, dan cita rasa agar selaras dengan kearifan lokal masyarakat Yogyakarta:
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col gap-1.5">
                  <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <span class="material-symbols-outlined text-base text-amber-700">bakery_dining</span>
                    <span>1. Pengaruh Kuliner Cina</span>
                  </div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Diduga kuat terinspirasi dari kue bulan khas Cina, terutama <em>Sūshì yuèbǐng</em> (kue bulan gaya Suzhou) yang memiliki kulit pastry berlapis-lapis dan awalnya berisi daging babi.
                  </p>
                </div>

                <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col gap-1.5">
                  <div class="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                    <span class="material-symbols-outlined text-base text-emerald-700">swap_horiz</span>
                    <span>2. Penyesuaian Resep &amp; Bahan</span>
                  </div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Isian daging babi diganti dengan <strong>kacang hijau manis</strong>. Minyak babi yang awalnya dipakai untuk melembutkan kulit diganti dengan <strong>minyak kelapa</strong> nabati agar halal dan sesuai nilai masyarakat Jawa.
                  </p>
                </div>

                <div class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex flex-col gap-1.5">
                  <div class="flex items-center gap-1.5 text-indigo-900 font-bold text-xs">
                    <span class="material-symbols-outlined text-base text-indigo-700">verified</span>
                    <span>3. Terbentuknya Identitas Lokal</span>
                  </div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Setelah beradaptasi, bakpia diterima luas oleh warga Yogyakarta dari berbagai kalangan, hingga menjelma menjadi identitas kuliner khas daerah dan buah tangan wajib wisatawan Nusantara.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- D. PERKEMBANGAN BAKPIA DI YOGYAKARTA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">D</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Perkembangan Bakpia di Yogyakarta</h3>
                <span class="text-[11px] font-bold text-amber-800">5 Tahap transformasi dari usaha rumahan hingga industri oleh-oleh</span>
              </div>
            </div>
            <div class="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Seiring bergulirnya waktu, usaha bakpia berevolusi melalui 5 tahapan strategis:
              </p>
              <div class="space-y-2">
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span class="px-2 py-0.5 rounded-md bg-amber-600 text-white font-extrabold text-[10px] shrink-0 mt-0.5">Tahap 1</span>
                  <div class="text-xs">
                    <strong class="text-slate-900">Perintisan Usaha:</strong> Kwik Sun Kok merintis di kawasan Tamansari, sedangkan Liem Bok Sing membuka usaha di kawasan Pathuk secara mandiri.
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span class="px-2 py-0.5 rounded-md bg-amber-600 text-white font-extrabold text-[10px] shrink-0 mt-0.5">Tahap 2</span>
                  <div class="text-xs">
                    <strong class="text-slate-900">Penyebaran Resep:</strong> Kwik mewariskan resep ke Niti Gurnito. Generasi penerus Liem Bok Sing juga murah hati mengajarkan resep kepada tetangga sekitar Pathuk.
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span class="px-2 py-0.5 rounded-md bg-amber-600 text-white font-extrabold text-[10px] shrink-0 mt-0.5">Tahap 3</span>
                  <div class="text-xs">
                    <strong class="text-slate-900">Perluasan Pemasaran:</strong> Bakpia dipasarkan tidak hanya di toko, melainkan dijajakan oleh pedagang keliling yang memikul keranjang bakpia ke berbagai sudut kota.
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span class="px-2 py-0.5 rounded-md bg-amber-600 text-white font-extrabold text-[10px] shrink-0 mt-0.5">Tahap 4</span>
                  <div class="text-xs">
                    <strong class="text-slate-900">Pertumbuhan Sentra Produksi:</strong> Bertambah banyaknya warga yang memproduksi bakpia menjadikan kawasan Pathuk sebagai sentra klaster industri bakpia terbesar di Indonesia.
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span class="px-2 py-0.5 rounded-md bg-amber-600 text-white font-extrabold text-[10px] shrink-0 mt-0.5">Tahap 5</span>
                  <div class="text-xs">
                    <strong class="text-slate-900">Penguatan Identitas Daerah:</strong> Seiring maraknya pariwisata Yogyakarta, bakpia bertransformasi menjadi komoditas ekonomi utama dan cinderamata wajib bagi pelancong.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- E. BAHAN DAN PROSES PEMBUATAN BAKPIA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">E</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Bahan dan 5 Tahapan Proses Pembuatan Bakpia</h3>
                <span class="text-[11px] font-bold text-amber-800">Formula bahan baku dan langkah pengolahan higienis</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <!-- 1. Bahan Dasar -->
              <div>
                <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-amber-700 text-sm">shopping_cart</span>
                  <span>1. Bahan Dasar Pembuatan Bakpia</span>
                </h4>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center flex flex-col items-center">
                    <span class="material-symbols-outlined text-amber-700 text-lg mb-1">grain</span>
                    <strong class="text-[11px] text-amber-950">Kacang Hijau</strong>
                    <span class="text-[10px] text-slate-500">Kupas, bahan isian utama</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center flex flex-col items-center">
                    <span class="material-symbols-outlined text-amber-700 text-lg mb-1">nutrition</span>
                    <strong class="text-[11px] text-amber-950">Gula Pasir</strong>
                    <span class="text-[10px] text-slate-500">Pemberi rasa manis &amp; awet</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center flex flex-col items-center">
                    <span class="material-symbols-outlined text-amber-700 text-lg mb-1">cookie</span>
                    <strong class="text-[11px] text-amber-950">Tepung Terigu</strong>
                    <span class="text-[10px] text-slate-500">Bahan adonan kulit berlapis</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center flex flex-col items-center">
                    <span class="material-symbols-outlined text-amber-700 text-lg mb-1">opacity</span>
                    <strong class="text-[11px] text-amber-950">Minyak Kelapa</strong>
                    <span class="text-[10px] text-slate-500">Melembutkan kulit adonan</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center flex flex-col items-center col-span-2 sm:col-span-1">
                    <span class="material-symbols-outlined text-amber-700 text-lg mb-1">water_drop</span>
                    <strong class="text-[11px] text-amber-950">Air Panas</strong>
                    <span class="text-[10px] text-slate-500">Membantu elastisitas kulit</span>
                  </div>
                </div>
              </div>

              <!-- 2. Tahapan Pembuatan -->
              <div class="pt-2 border-t border-slate-100">
                <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-amber-700 text-sm">precision_manufacturing</span>
                  <span>2. 5 Tahapan Pembuatan Bakpia</span>
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div class="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">1</div>
                    <strong class="text-xs text-slate-900 mt-1">Mengukus</strong>
                    <p class="text-[11px] text-slate-600">Kacang hijau kupas dikukus hingga matang dan lunak agar mudah diolah.</p>
                  </div>
                  <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div class="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">2</div>
                    <strong class="text-xs text-slate-900 mt-1">Menghaluskan</strong>
                    <p class="text-[11px] text-slate-600">Digiling menggunakan alat giling silinder/kayu agar tekstur tidak terlalu hancur.</p>
                  </div>
                  <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div class="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">3</div>
                    <strong class="text-xs text-slate-900 mt-1">Membuat Isian</strong>
                    <p class="text-[11px] text-slate-600">Kacang hijau ditumis bersama gula hingga membentuk adonan isian kumbu yang kalis.</p>
                  </div>
                  <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div class="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">4</div>
                    <strong class="text-xs text-slate-900 mt-1">Membentuk</strong>
                    <p class="text-[11px] text-slate-600">Kulit terigu dibentuk, diisi adonan kacang, ditutup rapi, dan dipipihkan.</p>
                  </div>
                  <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div class="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">5</div>
                    <strong class="text-xs text-slate-900 mt-1">Memanggang</strong>
                    <p class="text-[11px] text-slate-600">Dipanggang menggunakan oven atau tungku tradisional hingga kuning keemasan.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- F. INOVASI PRODUK BAKPIA -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">F</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Inovasi Produk Bakpia Modern</h3>
                <span class="text-[11px] font-bold text-amber-800">Menjawab selera konsumen masa kini tanpa kehilangan identitas tradisional</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Pada mulanya, bakpia hanya mengenal satu rasa yaitu <strong>kacang hijau (original)</strong>. Agar dapat bersaing dan memenuhi ragam preferensi konsumen lintas generasi, industri bakpia terus berinovasi memunculkan varian:
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs">🌿 Original Kacang Hijau</span>
                <span class="px-3 py-1 rounded-xl bg-yellow-100 text-yellow-900 font-bold text-xs">🧀 Keju Gurih</span>
                <span class="px-3 py-1 rounded-xl bg-amber-900 text-white font-bold text-xs">🍫 Cokelat Lumer</span>
                <span class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs">🍵 Green Tea (Matcha)</span>
                <span class="px-3 py-1 rounded-xl bg-orange-100 text-orange-900 font-bold text-xs">🌟 Durian Wangi</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                <strong class="text-xs text-slate-900">Perbedaan Cara Inovasi Antar Produsen (Hasil Kajian Ilmiah):</strong>
                <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li><strong>Bakpia Lestari:</strong> Menggunakan isian cokelat atau keju murni <em>tanpa</em> campuran kacang hijau.</li>
                  <li><strong>Bakpia M Niti Gurnito:</strong> Menambahkan cokelat atau keju langsung pada adonan dasar kacang hijau sehingga tekstur kumbu khas tetap dipertahankan.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- G. BAKPIA SEBAGAI PELUANG USAHA & KEWIRAUSAHAAN (FINANSIAL) -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">G</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Bakpia sebagai Peluang Usaha &amp; Literasi Finansial</h3>
                <span class="text-[11px] font-bold text-amber-800">Kunci sukses bisnis, margin harga, dan belanja cerdas</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Perjalanan bakpia membuktikan bahwa keberhasilan bisnis tidak semata-mata mengandalkan produk yang lezat, tetapi ditentukan oleh kejelian membaca pasar dan pengelolaan modal:
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-1 text-xs">
                  <strong class="text-amber-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-700">target</span>
                    <span>1. Paham Kebutuhan Konsumen</span>
                  </strong>
                  <span class="text-slate-600 text-[11px]">Menyesuaikan bahan halal dan cita rasa yang disukai lidah masyarakat lokal.</span>
                </div>
                <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-1 text-xs">
                  <strong class="text-amber-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-700">lightbulb</span>
                    <span>2. Kreatif Berinovasi</span>
                  </strong>
                  <span class="text-slate-600 text-[11px]">Menciptakan varian rasa kekinian agar pembeli memiliki lebih banyak opsi pilihan.</span>
                </div>
                <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-1 text-xs">
                  <strong class="text-amber-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-700">storefront</span>
                    <span>3. Perluas Saluran Pemasaran</span>
                  </strong>
                  <span class="text-slate-600 text-[11px]">Memadukan gerai sentra oleh-oleh dengan jaringan pedagang keliling.</span>
                </div>
                <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-1 text-xs">
                  <strong class="text-amber-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-700">share</span>
                    <span>4. Berbagi Pengetahuan</span>
                  </strong>
                  <span class="text-slate-600 text-[11px]">Membagikan resep ke tetangga sehingga tercipta klaster sentra industri Pathuk yang kuat.</span>
                </div>
                <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-1 text-xs col-span-1 sm:col-span-2 lg:col-span-2">
                  <strong class="text-amber-950 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-amber-700">flight_takeoff</span>
                    <span>5. Memanfaatkan Peluang Pariwisata</span>
                  </strong>
                  <span class="text-slate-600 text-[11px]">Menjadikan bakpia sebagai oleh-oleh legendaris yang wajib dibeli oleh jutaan wisatawan yang bertandang ke Yogyakarta.</span>
                </div>
              </div>

              <!-- Simulasi Finansial Praktis Bagi Siswa -->
              <div class="p-4 rounded-2xl bg-amber-100/60 border border-amber-300 flex flex-col gap-2 mt-1">
                <span class="font-black text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-amber-800">calculate</span>
                  <span>Simulasi Finansial Praktis di Pabrik:</span>
                </span>
                <p class="text-xs text-slate-700">
                  Rata-rata modal bahan baku dan kemasan 1 kotak bakpia (HPP) adalah <strong>Rp 18.000 – Rp 20.000</strong>. Di toko oleh-oleh, bakpia dijual seharga <strong>Rp 35.000 – Rp 40.000</strong>. Selisih margin kotor sebesar <strong>Rp 15.000 – Rp 20.000</strong> digunakan untuk membayar gaji karyawan, listrik/AC gerai, kemasan kotak cantik, dan penyediaan <strong>tester gratis</strong> bagi pengunjung.
                </p>
                <div class="pt-2 border-t border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">savings</span>
                  <span><strong>Tips Belanja Cerdas Siswa:</strong> Jangan tergiur belanja kalap! Catat titipan keluarga dan pastikan selalu menyisihkan uang bekal (Rp 30.000 – Rp 50.000) untuk makan di rest area saat perjalanan pulang Day 7.</span>
                </div>
              </div>

            </div>
          </div>

          <!-- H. NILAI-NILAI YANG DAPAT DIPELAJARI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">H</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Nilai-Nilai Luhur yang Dapat Dipelajari</h3>
                <span class="text-[11px] font-bold text-amber-800">6 Sikap teladan dari sejarah perkembangan bakpia</span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-amber-100/70 text-amber-950 font-bold border-b border-amber-200">
                    <th class="p-3 rounded-l-xl w-32 sm:w-40">Nilai</th>
                    <th class="p-3 rounded-r-xl">Penjelasan Makna &amp; Penerapan</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">handshake</span>
                      <span>Toleransi</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Menghargai perbedaan budaya, kepercayaan, dan kebiasaan masyarakat tanpa memandang latar belakang etnis.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">lock_open</span>
                      <span>Keterbukaan</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Menerima pengaruh budaya lain secara positif dan mampu menyesuaikannya dengan norma setempat.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">palette</span>
                      <span>Kreativitas</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Mengembangkan resep, memodifikasi bahan baku, dan menciptakan variasi rasa produk yang diminati pasar.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">group</span>
                      <span>Kerja Sama</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Saling berbagi ilmu pengetahuan dan resep untuk memajukan perekonomian bersama di lingkungan sekitar.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">trending_up</span>
                      <span>Kewirausahaan</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Pintar menangkap peluang bisnis, mengelola biaya modal produksi, dan mengembangkan strategi pemasaran.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-amber-700 text-base">temple_buddhist</span>
                      <span>Pelestarian Budaya</span>
                    </td>
                    <td class="p-3 text-xs leading-relaxed">Mempertahankan dan merawat kuliner hasil akulturasi agar tetap lestari sebagai warisan identitas daerah.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- I. KESIMPULAN & REFERENSI ILMIAH RESMI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-3 text-amber-950 border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-sm">I</span>
              <div>
                <h3 class="font-black text-sm sm:text-base">Kesimpulan &amp; Referensi Ilmiah Resmi</h3>
                <span class="text-[11px] font-bold text-amber-800">Sintesis riset dan sitasi akademik</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Kesimpulan:</strong> Bakpia adalah monumen hidup dari akulturasi budaya Cina dan Indonesia yang telah mengakar kuat menjadi identitas kuliner Yogyakarta. Proses ini tercermin nyata dari adaptasi bahan baku dan resep, penerimaan hangat masyarakat, serta evolusi usaha dari dapur rumahan menjadi industri oleh-oleh pariwisata yang menghidupi ribuan keluarga. Keberhasilan bakpia mengajarkan betapa pentingnya keharmonisan sosial, kreativitas inovasi, serta etos kewirausahaan yang tangguh.
              </p>

              <!-- KOTAK SITASI JURNAL ILMIAH RESMI -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-amber-700 text-2xl shrink-0 mt-0.5">menu_book</span>
                  <div class="flex flex-col text-xs">
                    <span class="font-bold text-slate-900">Rujukan Sumber Utama Artikel Ilmiah:</span>
                    <span class="text-slate-600 mt-0.5 leading-relaxed">
                      Rato, M. N. R., &amp; Hadi, R. P. (2024). <em>Bakpia: Perjalanan Akulturasi Cina-Indonesia dalam Makanan Khas Yogyakarta</em>. <strong>Multikultura</strong>, 3(3), 366–385. DOI: 10.7454/multikultura.v3i3.1034.
                    </span>
                  </div>
                </div>
                <a href="https://scholarhub.ui.ac.id/multikultura/vol3/iss3/5/" target="_blank" rel="noopener noreferrer" class="shrink-0 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                  <span>Buka Jurnal UI</span>
                  <span class="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- FORM RESUME / CATATAN SINGKAT SESI 1 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-amber-300 shadow-xs flex flex-col gap-3 mt-1">
          <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
            <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">edit_note</span>
            </span>
            <div>
              <h3 class="font-black text-sm sm:text-base">Catatan Pemahaman Sesi 1</h3>
              <span class="text-[11px] font-bold text-amber-800">Simpan resume singkat pemahaman Anda sebelum membuka LKPD</span>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Tuliskan 1 hal penting yang paling berkesan bagi Anda mengenai proses akulturasi bakpia, sejarah perintisnya, atau nilai kewirausahaannya:
          </p>
          <textarea id="ftD6S1ConclusionInput" rows="3" class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-white" placeholder="Contoh: Saya belajar bahwa bakpia merupakan wujud akulturasi budaya Cina dan Indonesia (terinspirasi dari kue bulan yang disesuaikan bahannya dengan kacang hijau dan minyak kelapa agar halal), serta menjadi sentra usaha kerakyatan di Pathuk..."></textarea>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div id="ftD6S1ConclusionStatus" class="hidden text-xs text-emerald-700 font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">check_circle</span>
              <span>Tersimpan di sistem (<span id="ftD6S1ConclusionSavedTime">-</span>)</span>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto ml-auto">
              <button id="ftD6S1SaveConclusionBtn" type="button" onclick="saveMateriConclusionD6S1()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all">
                <span class="material-symbols-outlined text-base">save</span>
                <span>Simpan Catatan</span>
              </button>
              <button id="ftD6S1GoLkpdBtn" type="button" onclick="handleGoToLkpdD6S1()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all opacity-50 pointer-events-none">
                <span>Buka LKPD Sesi 1 Bakpia</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      `;

      // Hydrate saved conclusion
      try {
        const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), user.nis, user.identifier];
        let savedText = '';
        let savedTime = '';
        for (const id of idVars) {
          if (!id) continue;
          const raw = localStorage.getItem('fincestem_materi_ft_day6_bakpia_' + id) || localStorage.getItem('fincestem_materi_ft_day6_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) {
                savedText = p.conclusion || p.text || p.content;
                savedTime = p.savedAt || p.date || '';
                break;
              }
            } catch(e) {}
          }
        }
        if (!savedText && window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          const task = tm['6_materi_bakpia'] || tm['6_materi'];
          if (task && task.content) {
            try {
              const p = JSON.parse(task.content);
              savedText = p.conclusion || p.text || task.content;
            } catch(e) {
              savedText = task.content;
            }
          }
        }
        if (savedText) {
          applyMateriConclusionStateD6S1(savedText, savedTime);
        }
      } catch(e) {}
    }

    function saveMateriConclusionD6S1() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txt = (document.getElementById('ftD6S1ConclusionInput')?.value || '').trim();

      if (!txt || txt.length < 5) {
        FincestemCore.ui.toast('Tuliskan catatan pemahaman singkat Anda minimal beberapa kata!', 'warning');
        const el = document.getElementById('ftD6S1ConclusionInput');
        if (el) el.focus();
        return;
      }

      const now = new Date().toISOString();
      const payload = {
        conclusion: txt,
        savedAt: now
      };

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), user.nis, user.identifier].filter(Boolean);
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_materi_ft_day6_bakpia_' + id, JSON.stringify(payload));
          localStorage.setItem('fincestem_materi_ft_day6_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 6, 'materi_bakpia', payload, function() {
          FincestemCore.progress.submitTask(cleanNisn, 6, 'materi', payload, function() {
            applyMateriConclusionStateD6S1(txt, now);
            FincestemCore.ui.toast('Catatan pemahaman Modul Sesi 1 Bakpia berhasil disimpan! LKPD Sesi 1 sekarang telah terbuka.', 'success');
          });
        });
      } else {
        applyMateriConclusionStateD6S1(txt, now);
        FincestemCore.ui.toast('Catatan pemahaman Modul Sesi 1 Bakpia berhasil disimpan! LKPD Sesi 1 sekarang telah terbuka.', 'success');
      }
    }

    function applyMateriConclusionStateD6S1(savedText, savedTime) {
      const input = document.getElementById('ftD6S1ConclusionInput');
      const saveBtn = document.getElementById('ftD6S1SaveConclusionBtn');
      const statusBox = document.getElementById('ftD6S1ConclusionStatus');
      const timeBox = document.getElementById('ftD6S1ConclusionSavedTime');
      const nextBtn = document.getElementById('ftD6S1GoLkpdBtn');

      if (input) {
        input.value = savedText;
        input.disabled = true;
        input.classList.add('bg-slate-100', 'text-slate-600', 'cursor-not-allowed');
      }
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.classList.remove('bg-amber-600', 'hover:bg-amber-700', 'cursor-pointer');
        saveBtn.classList.add('bg-emerald-600', 'text-white', 'cursor-default');
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-base">check_circle</span><span>Catatan Telah Disimpan</span>';
      }
      if (statusBox) statusBox.classList.remove('hidden');
      if (timeBox && savedTime) {
        try {
          timeBox.textContent = new Date(savedTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        } catch (e) {
          timeBox.textContent = savedTime;
        }
      }
      if (nextBtn) {
        nextBtn.classList.remove('opacity-50', 'pointer-events-none');
        nextBtn.classList.add('animate-pulse');
      }
    }

    function handleGoToLkpdD6S1() {
      window.location.href = 'lkpd.html?day=6&sesi=1';
    }

    window.renderDay6FieldTripModule = renderDay6FieldTripModule;
    window.switchD6Session = switchD6Session;
    window.renderD6S1BakpiaModule = renderD6S1BakpiaModule;
    window.saveMateriConclusionD6S1 = saveMateriConclusionD6S1;
    window.applyMateriConclusionStateD6S1 = applyMateriConclusionStateD6S1;
    window.handleGoToLkpdD6S1 = handleGoToLkpdD6S1;
    window.checkIsD6Sesi1Done = checkIsD6Sesi1Done;


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
                try {
                  const mObj = { conclusion: content, savedAt: task.submitted_at || task.updated_at || new Date().toISOString() };
                  idVars.forEach(id => {
                    localStorage.setItem(`fincestem_materi_ft_day${dayNum}_` + id, JSON.stringify(mObj));
                    localStorage.setItem(`fincestem_materi_day${dayNum}_` + id, JSON.stringify(mObj));
                  });
                } catch(e) {}
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

    // ==========================================
    // MODUL BELAJAR KHUSUS FIELD TRIP DAY 7
    // Tema: Pulang Membawa Cerita, Berjumpa dengan Keluarga
    // Pilar: FINANCIAL (Tutup Buku Kas Saku) & KARAKTER MANDIRI
    // ==========================================
    function renderDay7FieldTripModule(mainEl) {
      if (!mainEl) return;
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), user.nis, user.identifier].filter(Boolean);
      let savedText = '';
      let savedTime = '';
      for (const id of idVars) {
        if (!id) continue;
        const raw = localStorage.getItem('fincestem_materi_ft_day7_' + id);
        if (raw) {
          try {
            const p = JSON.parse(raw);
            if (p && (p.conclusion || p.text || p.content)) {
              savedText = p.conclusion || p.text || p.content;
              savedTime = p.savedAt || p.date || '';
              break;
            }
          } catch(e) {}
        }
      }

      mainEl.innerHTML = `
        <div class="flex flex-col gap-5 pb-12 max-w-4xl mx-auto w-full">
          <!-- HERO BANNER DAY 7 -->
          <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col gap-3 relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-emerald-200 backdrop-blur-md flex items-center gap-1.5 shadow-2xs">
                <span class="material-symbols-outlined text-sm">home</span>
                Field Trip • Day 7 • Hari Kepulangan &amp; Tutup Buku
              </span>
              <span class="text-xs font-bold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-lg">Tol Trans-Sumatera &rarr; SMAN 1 Belitang</span>
            </div>

            <div class="flex flex-col gap-1.5 mt-1">
              <h1 class="font-black text-xl sm:text-2xl md:text-3xl leading-snug">
                Pulang Membawa Cerita, Berjumpa dengan Keluarga
              </h1>
              <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium max-w-2xl">
                Menenun Kenangan Menjadi Karakter: Audit Kas Saku Mandiri, Adab Menyambut Orang Tua, dan Refleksi 7 Hari Ekspedisi Menembus Pulau Jawa.
              </p>
            </div>

            <div class="flex items-center gap-2 flex-wrap pt-2 border-t border-emerald-700/50">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-200 font-extrabold text-[11px]">
                <span class="material-symbols-outlined text-sm">account_balance_wallet</span>
                <span>Pilar Utama: 💰 FINANCIAL (Tutup Buku Kas Saku)</span>
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-200 font-extrabold text-[11px]">
                <span class="material-symbols-outlined text-sm">family_restroom</span>
                <span>Nilai Karakter: Mandiri, Jujur &amp; Berbakti</span>
              </span>
            </div>
          </div>

          <!-- JADWAL ITINERARY KEPULANGAN RESMI -->
          ${renderFieldTripScheduleCard(7)}

          <!-- BAGIAN A: FILOSOFI PERJALANAN (THE JOURNEY OF GROWTH) -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-emerald-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">psychology</span>
              </span>
              <span>A. Filosofi Perjalanan: Dari Berangkat Hingga Pulang Menjadi Pribadi Baru</span>
            </div>
            
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Perjalanan ribuan kilometer yang telah Anda tempuh sejak meninggalkan gerbang <strong>SMAN 1 Belitang</strong> pada Day 1, menyeberangi Selat Sunda, melintasi Tol Trans-Jawa menuju Semarang, mendaki dinginnya lautan pasir Bromo, menelusuri megastruktur Candi Prambanan di Yogyakarta, hingga menatap ombak Samudra Hindia di Pantai Drini bukanlah sekadar tamasya melepas lelah.
            </p>

            <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed flex flex-col gap-2">
              <span class="font-extrabold flex items-center gap-1 text-emerald-900">
                <span class="material-symbols-outlined text-base text-emerald-600">verified</span>
                <span>4 Nilai Kedewasaan yang Telah Anda Buktikan Selama 7 Hari:</span>
              </span>
              <ul class="list-disc list-inside space-y-1 text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                <li><strong>Kemandirian Total:</strong> Mampu merawat diri sendiri, menata koper/tas, bangun subuh tepat waktu, dan menjaga kesehatan tanpa disuruh orang tua.</li>
                <li><strong>Toleransi &amp; Empati:</strong> Belajar berbagi tempat duduk di bus, mengantre giliran makan dan mandi dengan sabar, serta saling menolong saat teman kelelahan.</li>
                <li><strong>Integritas Finansial:</strong> Menjaga dompet dan uang saku titipan orang tua, menghitung kembalian belanja, dan menolak godaan membeli barang yang tak berguna.</li>
                <li><strong>Ketahanan Fisik &amp; Mental:</strong> Mampu menyesuaikan diri dengan suhu ekstrem (dinginnya Bromo hingga teriknya pesisir Drini) dengan tetap ceria dan santun.</li>
              </ul>
            </div>
          </div>

          <!-- BAGIAN B: TUTUP BUKU KAS SAKU & REKONSILIASI KEUANGAN -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-slate-900 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">savings</span>
              </span>
              <span>B. Rekonsiliasi Finansial: Mengapa Pelajar Wajib Tutup Buku Kas?</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Dalam pilar <strong>Financial FINCESTEM</strong>, siklus manajemen uang saku memiliki awal dan akhir yang terukur:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-900 w-fit">HARI KE-1</span>
                <span class="font-extrabold text-xs text-slate-900">Perencanaan (Budgeting)</span>
                <p class="text-[11px] text-slate-600 leading-relaxed">Membuat pos alokasi (jajan, darurat, oleh-oleh) agar uang tidak langsung habis di hari-hari awal.</p>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-900 w-fit">HARI KE-6</span>
                <span class="font-extrabold text-xs text-slate-900">Belanja Cerdas (Smart Shopper)</span>
                <p class="text-[11px] text-slate-600 leading-relaxed">Menghitung HPP, membandingkan harga per kotak bakpia/suvenir, dan menyisihkan bekal pulang.</p>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col gap-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white w-fit">HARI KE-7</span>
                <span class="font-extrabold text-xs text-emerald-950">Audit &amp; Tutup Buku Kas</span>
                <p class="text-[11px] text-slate-700 leading-relaxed">Menghitung fisik sisa saldo uang di dompet riil vs total belanjaan yang telah dikeluarkan.</p>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>💡 Hikmah Finansial:</strong> Seorang pelajar yang hebat bukanlah yang menghabiskan seluruh uang sakunya sampai nol rupiah demi gengsi, melainkan yang mampu <em>membawa pulang sisa saldo kas</em> dengan selamat untuk ditabung atau diserahkan kembali kepada orang tua.
            </div>
          </div>

          <!-- BAGIAN C: ADAB & ETIKA KEPULANGAN BERSAMA KELUARGA -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 text-slate-900 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">volunteer_activism</span>
              </span>
              <span>C. Adab Kepulangan: Menyambut Cinta dan Doa Orang Tua</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Selama 7 hari Anda bersenang-senang mengeksplorasi tempat wisata megah, ingatlah bahwa di rumah ada Ayah dan Ibu yang selalu cemas mendoakan keselamatan Anda di setiap sujud dan helaan nafas mereka. Mereka telah menyisihkan rezeki keringat mereka agar Anda bisa mengikuti program pembelajaran berharga ini.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-col gap-1.5">
                <span class="font-extrabold text-xs text-rose-900 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-rose-600">handshake</span>
                  1. Cium Tangan &amp; Peluk Orang Tua
                </span>
                <p class="text-[11.5px] text-slate-700 leading-relaxed">
                  Begitu Anda tiba di gerbang sekolah dan dijemput orang tua, sambutlah mereka dengan senyum terindah. Ucapkan terima kasih yang tulus: <em>"Terima kasih Ayah/Ibu, saya pulang dengan selamat dan sangat bahagia."</em>
                </p>
              </div>

              <div class="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col gap-1.5">
                <span class="font-extrabold text-xs text-teal-900 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-teal-600">redeem</span>
                  2. Serahkan Oleh-Oleh &amp; Laporan Kas
                </span>
                <p class="text-[11.5px] text-slate-700 leading-relaxed">
                  Serahkan oleh-oleh bakpia atau buah apel yang Anda bawa dengan kedua tangan. Jika masih ada sisa uang saku, laporkan dengan jujur sebagai bukti anak yang amanah.
                </p>
              </div>
            </div>
          </div>

          <!-- BAGIAN D: KILAS BALIK 4 PILAR FINCESTEM -->
          <div class="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3.5">
            <div class="flex items-center gap-2 border-b border-white/10 pb-3">
              <span class="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">4</span>
              <span class="font-black text-base sm:text-lg">Kilas Balik Prestasi Riset 4 Pilar FINCESTEM</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Anda telah mengukir jejak riset nyata di setiap jengkal destinasi:
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col gap-1">
                <span class="text-[10px] font-black uppercase text-amber-300 tracking-wider">💰 Financial</span>
                <span class="text-xs font-bold leading-tight">Literasi Saku &amp; HPP Pabrik Bakpia</span>
              </div>
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col gap-1">
                <span class="text-[10px] font-black uppercase text-purple-300 tracking-wider">🏛️ Culture</span>
                <span class="text-xs font-bold leading-tight">AKPOL, Lawang Sewu &amp; Prambanan</span>
              </div>
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col gap-1">
                <span class="text-[10px] font-black uppercase text-cyan-300 tracking-wider">🧭 Exploration</span>
                <span class="text-xs font-bold leading-tight">Kaldera Bromo &amp; Karst Pantai Drini</span>
              </div>
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col gap-1">
                <span class="text-[10px] font-black uppercase text-emerald-300 tracking-wider">🔬 STEM</span>
                <span class="text-xs font-bold leading-tight">Fisika JTP, Mesin Otomotif &amp; Batik</span>
              </div>
            </div>
          </div>

          <!-- FORM RESUME & KOMITMEN KEPULANGAN HARI KE-7 -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-md flex flex-col gap-4">
            <div class="flex items-center gap-2.5 text-emerald-950 font-black text-base sm:text-lg border-b border-emerald-100 pb-3">
              <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">draw</span>
              </span>
              <span>Lembar Komitmen Kepulangan Day 7 (Wajib Diisi untuk Buka LKPD)</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Tuliskan <strong>1 Kalimat Reflektif</strong> mengenai komitmen pribadi Anda saat tiba di rumah bersama keluarga dan bagaimana Anda memanfaatkan pengalaman 7 hari ini untuk menjadi anak yang lebih mandiri dan berbakti:
            </p>

            <div class="relative">
              <textarea id="ftMateriDay7Conclusion" rows="3" placeholder="Contoh: Saya bersyukur dapat pulang dengan selamat dan berkomitmen untuk lebih mandiri mengatur waktu, menjaga amanah uang saku, serta semakin menyayangi dan berbakti kepada kedua orang tua di rumah..." class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm leading-relaxed outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all font-normal placeholder:text-slate-400 bg-slate-50/50">${savedText ? savedText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : ''}</textarea>
            </div>

            <div id="ftMateriDay7StateBox" class="${savedText ? 'flex' : 'hidden'} p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                <span><strong>Status:</strong> Resume Modul Day 7 Berhasil Tersimpan!</span>
              </div>
              <span id="ftMateriDay7TimeBadge" class="text-[11px] text-emerald-800 font-semibold">${savedTime ? 'Tersimpan' : ''}</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button id="btnSaveMateriDay7Conclusion" type="button" onclick="saveDay7MateriConclusion()" class="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer">
                <span class="material-symbols-outlined text-lg">task_alt</span>
                <span>${savedText ? 'Perbarui Komitmen Modul Day 7' : 'Simpan Komitmen Modul Day 7'}</span>
              </button>

              <button id="btnGoToLkpdDay7" type="button" onclick="handleGoToLkpdDay7()" class="py-3.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer">
                <span>Lanjut ke LKPD Day 7 (Tutup Buku Kas)</span>
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function saveDay7MateriConclusion() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const txtArea = document.getElementById('ftMateriDay7Conclusion');
      const text = txtArea ? txtArea.value.trim() : '';

      if (!text || text.length < 15) {
        FincestemCore.ui.toast('Silakan tuliskan komitmen kepulangan Anda minimal 1 kalimat sebelum melanjutkan!', 'warning');
        return;
      }

      const saveBtn = document.getElementById('btnSaveMateriDay7Conclusion');
      if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
        FincestemCore.ui.setBtnLoading(saveBtn, true, 'Menyimpan...');
      }

      const payload = {
        day_number: 7,
        location: 'Perjalanan Tol Trans-Sumatera menuju Belitang',
        conclusion: text,
        savedAt: new Date().toISOString()
      };

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), user.nis, user.identifier].filter(Boolean);
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_materi_ft_day7_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      const box = document.getElementById('ftMateriDay7StateBox');
      const badge = document.getElementById('ftMateriDay7TimeBadge');
      if (box) box.classList.remove('hidden');
      if (badge) badge.textContent = 'Baru saja disimpan';

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(cleanNisn, 7, 'materi', payload, function() {
          if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
            FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Komitmen Modul Day 7', 'task_alt');
          }
          FincestemCore.ui.toast('Komitmen Modul Day 7 berhasil disimpan! LKPD Day 7 (Tutup Buku Kas) sekarang telah terbuka.', 'success');
        });
      } else {
        if (saveBtn && FincestemCore.ui && FincestemCore.ui.setBtnLoading) {
          FincestemCore.ui.setBtnLoading(saveBtn, false, '', 'Perbarui Komitmen Modul Day 7', 'task_alt');
        }
        FincestemCore.ui.toast('Komitmen Modul Day 7 berhasil disimpan! LKPD Day 7 (Tutup Buku Kas) sekarang telah terbuka.', 'success');
      }
    }

    function handleGoToLkpdDay7() {
      const user = FincestemCore.auth.getUser() || {};
      const nisn = user.nisn || user.identifier || '';
      const cleanNisn = String(nisn).trim();
      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), user.nis, user.identifier].filter(Boolean);
      let isDone = false;
      for (const id of idVars) {
        const raw = localStorage.getItem('fincestem_materi_ft_day7_' + id);
        if (raw) {
          try {
            const p = JSON.parse(raw);
            if (p && (p.conclusion || p.text)) { isDone = true; break; }
          } catch(e) {}
        }
      }
      if (!isDone) {
        FincestemCore.ui.toast('Anda wajib membaca modul dan menyimpan komitmen Day 7 sebelum membuka lembar LKPD!', 'warning');
        const txt = document.getElementById('ftMateriDay7Conclusion');
        if (txt) {
          txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
          txt.focus();
        }
        return;
      }
      window.location.href = 'lkpd.html?day=7';
    }

    window.renderDay7FieldTripModule = renderDay7FieldTripModule;
    window.saveDay7MateriConclusion = saveDay7MateriConclusion;
    window.handleGoToLkpdDay7 = handleGoToLkpdDay7;