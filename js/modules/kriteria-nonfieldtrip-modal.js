/**
 * FINCESTEM 2026 - Modal Kriteria Penilaian Kokurikuler
 * Menampilkan 3 Tab Mandiri & Download PDF Masing-Masing:
 * 1. Field Trip (Jawa) -> Download: KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf (Murni FT 1 Lembar)
 * 2. Non - Field Trip (OKU Timur) -> Download: KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf (Murni NFT + 3 Simulasi Kasus 1 Lembar)
 * 3. Nilai Rapor (Mahir, Cakap, Berkembang) -> Download: KRITERIA_PREDIKAT_RAPOR_2026.pdf (Murni Rapor 1 Lembar)
 *
 * KHUSUS: Portal Administrator, Fasilitator & Koordinator
 * (DILARANG KERAS Ditampilkan di Portal Siswa!)
 */

(function(window) {
  'use strict';

  let currentActiveTab = 'ft'; // 'ft' | 'nonft' | 'rapor'

  function createModalDOM() {
    let existing = document.getElementById('modalKriteriaKokurikuler');
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.id = 'modalKriteriaKokurikuler';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-5 transition-all duration-300 opacity-0 pointer-events-none';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
        
        <!-- Header Modal -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/60 shrink-0">
          <div class="flex items-center gap-3">
            <div id="kriteriaIconWrapper" class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-2xl">directions_bus</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-amber-950 tracking-wide uppercase">Pedoman Penilai</span>
                <span id="kriteriaSubtitle" class="text-xs text-indigo-200 font-medium">Field Trip (Studi Wisata Jawa)</span>
              </div>
              <h3 id="kriteriaMainTitle" class="font-black text-base sm:text-lg text-white leading-tight mt-0.5">
                Kriteria Penilaian Kokurikuler
              </h3>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="btnDownloadHeader" type="button" onclick="downloadKriteriaKokurikulerPdf()" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer" title="Download Versi PDF 1 Lembar Sesuai Tab Aktif">
              <span class="material-symbols-outlined text-base">download</span>
              <span id="btnDownloadHeaderLabel">Download PDF Field Trip</span>
            </button>
            <button type="button" onclick="closeKriteriaKokurikulerModal()" class="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Tutup">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        <!-- 3 Tab Navigation: Field Trip, Non-Field Trip, Nilai Rapor -->
        <div class="flex border-b border-slate-200 bg-slate-100/90 px-3 sm:px-5 pt-2.5 gap-1.5 sm:gap-2 text-xs font-bold overflow-x-auto no-scrollbar shrink-0">
          <button id="tabBtn_FT" type="button" onclick="switchKriteriaTab('ft')" class="px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer bg-white text-emerald-900 border-emerald-600 shadow-xs">
            <span class="material-symbols-outlined text-base text-emerald-600">directions_bus</span>
            <span>Field Trip (Jawa)</span>
          </button>
          <button id="tabBtn_NonFT" type="button" onclick="switchKriteriaTab('nonft')" class="px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer text-slate-600 hover:text-slate-900 border-transparent">
            <span class="material-symbols-outlined text-base text-indigo-600">home_pin</span>
            <span>Non - Field Trip (OKU Timur)</span>
          </button>
          <button id="tabBtn_Rapor" type="button" onclick="switchKriteriaTab('rapor')" class="px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer text-slate-600 hover:text-slate-900 border-transparent">
            <span class="material-symbols-outlined text-base text-amber-600">military_tech</span>
            <span>Nilai Rapor (Mahir, Cakap, Berkembang)</span>
          </button>
        </div>

        <!-- Body Scrollable Content -->
        <div class="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed no-scrollbar flex-1">
          
          <!-- ==================== TAB 1: FIELD TRIP ==================== -->
          <div id="contentTab_FT" class="space-y-4">
            
            <!-- Box Prinsip Field Trip -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white flex flex-col items-center text-center gap-1.5 shadow-md border border-emerald-800/40">
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Konsep Penilaian Resmi Field Trip (Studi Wisata Jawa):</span>
              <div class="font-mono text-sm sm:text-base font-black text-emerald-300 bg-black/40 px-4 py-2 rounded-xl border border-emerald-400/30 w-full text-center">
                100% Murni Berbasis Jam Pengumpulan Tugas (On-Time Submission)
              </div>
              <span class="text-[11px] text-slate-300">
                Siswa bergerak dalam rombongan armada bus sekolah dengan jadwal objek wisata yang ketat (Semarang, Malang, Bromo, Yogyakarta). Batas standar pengumpulan adalah pukul <strong>16.00 WIB</strong> (sebelum jam operasional objek wisata ditutup).
              </span>
            </div>

            <!-- Tabel Skema Jam Pengumpulan Field Trip -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <span class="material-symbols-outlined text-base text-emerald-600">schedule</span>
                  <span>Tabel Rentang Jam Pengumpulan &amp; Poin Nilai Harian:</span>
                </span>
                <span class="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Batas Standar: 16.00 WIB</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-200/80 text-slate-800 font-bold">
                      <th class="p-2 border border-slate-300 text-center">Jam Pengumpulan</th>
                      <th class="p-2 border border-slate-300 text-center">Nilai</th>
                      <th class="p-2 border border-slate-300 text-center">Peringkat Bintang</th>
                      <th class="p-2 border border-slate-300">Status &amp; Keterangan Lapangan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="bg-emerald-50/60">
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-950">07.00 – 16.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-emerald-700 text-sm">100</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-800">⭐⭐⭐⭐⭐ (B5)</td>
                      <td class="p-2 border border-slate-300 font-semibold text-emerald-900">
                        <strong>Sangat Baik (Sempurna):</strong> Tugas tuntas langsung di lokasi objek riset sebelum jam kunjungan selesai / bus bergeser.
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">16.01 – 21.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-600">95 – 99</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-700">⭐⭐⭐⭐⭐ (B5)</td>
                      <td class="p-2 border border-slate-300 text-slate-700">
                        <strong>Sangat Baik:</strong> Tuntas sore/petang selama perjalanan bus menuju hotel atau singgah di Rest Area tol Trans-Jawa <em>(skor berkurang 1 poin per jam keterlambatan)</em>.
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">21.01 – 24.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">90 – 94</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-700">⭐⭐⭐⭐☆ (B4)</td>
                      <td class="p-2 border border-slate-300 text-slate-700">
                        <strong>Baik:</strong> Tuntas malam hari saat tiba dan istirahat di hotel rombongan (21–22: 94/93, 22–23: 92/91, 23–24: 90).
                      </td>
                    </tr>
                    <tr class="bg-orange-50/50">
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-900">&gt; 24.00 WIB / Besok</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-orange-700 text-sm">85</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-700">⭐⭐⭐⭐☆ (B4)</td>
                      <td class="p-2 border border-slate-300 font-semibold text-orange-800">
                        <strong>Cukup:</strong> Pengumpulan terlambat pada keesokan harinya sebelum kegiatan berikutnya dimulai.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Fitur Khusus: Koreksi Darurat Admin & Bebas Pinalti Geotag -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col gap-1.5">
                <span class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-600">bolt</span>
                  <span>Koreksi Darurat Admin (Emergency Manual Override)</span>
                </span>
                <p class="text-[11.5px] text-slate-700 leading-snug">
                  Jika terjadi kendala sinyal <em>blank-spot</em> seluler (seperti di Laut Pasir Kaldera Gunung Bromo atau perbukitan) atau siswa mengalami sakit selama perjalanan, Admin/Koordinator memiliki hak memberikan dispensasi nilai manual dengan alasan resmi yang tercatat di sistem audit.
                </p>
              </div>
              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex flex-col gap-1.5">
                <span class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-emerald-600">verified</span>
                  <span>Integritas Lapangan (Bebas Pinalti Geotag)</span>
                </span>
                <p class="text-[11.5px] text-slate-700 leading-snug">
                  Siswa Field Trip <strong>tidak dikenakan pinalti Google Tagging GPS</strong> karena seluruh pergerakan fisik siswa dipantau langsung oleh Guru Pendamping, Fasilitator Armada Bus, dan Tour Leader resmi sekolah.
                </p>
              </div>
            </div>

            <!-- Rute Riset Day 1 - 7 -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 text-xs">
              <span class="font-extrabold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-base text-teal-600">route</span>
                <span>Destinasi &amp; Objek Riset Field Trip Day 1 – 7:</span>
              </span>
              <p class="text-[11.5px] text-slate-600 leading-relaxed">
                Day 1 (Bandara &amp; Budgeting) • Day 2 (Kota Lama &amp; Lawang Sewu) • Day 3 (JTP 1 Sains Terapan &amp; Museum) • Day 4 (Vulkanologi &amp; Ekosistem Bromo) • Day 5 (Arkeologi Prambanan &amp; Batik) • Day 6 (Malioboro &amp; Industri Bakpia) • Day 7 (Evaluasi Portofolio Kepulangan).
              </p>
            </div>

          </div>

          <!-- ==================== TAB 2: NON - FIELD TRIP ==================== -->
          <div id="contentTab_NonFT" class="space-y-4 hidden">
            
            <!-- Box Rumus Non-Field Trip -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white flex flex-col items-center text-center gap-1.5 shadow-md border border-indigo-800/40">
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Rumus Resmi Nilai Akhir Harian (NA) Non-Field Trip:</span>
              <div class="font-mono text-sm sm:text-base font-black text-sky-300 bg-black/40 px-4 py-2 rounded-xl border border-sky-400/30 w-full text-center">
                NA = (20% × Waktu Modul) + (30% × LKPD) + (35% × Asesmen) + (15% × Geotag)
              </div>
              <span class="text-[11px] text-slate-300">
                Akumulasi komposit 4 pilar skala 0 – 100 otomatis dikonversikan oleh sistem menjadi peringkat Bintang 1 hingga Bintang 5 harian.
              </span>
            </div>

            <!-- Parameter Jam Pengisian Modul Pagi (Bobot 20%) -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <span class="material-symbols-outlined text-base text-indigo-600">schedule</span>
                  <span>1. Parameter Jam Pengisian Modul Pagi (Bobot 20%):</span>
                </span>
                <span class="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">Indikator Awal Siswa Bekerja</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pengisian <strong>Modul Belajar (5 Kartu Riset Mandiri)</strong> wajib dituntaskan di pagi hari sebagai bukti awal keaktifan siswa sebelum turun ke lapangan OKU Timur:
              </p>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-200/80 text-slate-800 font-bold">
                      <th class="p-2 border border-slate-300 text-center">Rentang Jam Submit Modul</th>
                      <th class="p-2 border border-slate-300 text-center">Poin Waktu</th>
                      <th class="p-2 border border-slate-300">Status Kedisiplinan Kerja</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="bg-emerald-50/60">
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-950">07.00 – 09.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-emerald-700 text-sm">100</td>
                      <td class="p-2 border border-slate-300 font-semibold text-emerald-900">Sangat Disiplin (Pagi Penuh, langsung siap observasi)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">09.01 – 12.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-600">88</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Baik (Pagi menjelang siang, ritme belajar tertib)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">12.01 – 15.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">85</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Cukup Disiplin (Siang hari, waktu lapangan mulai berkurang)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">15.01 – 16.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">80</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Toleransi Sore 1 (Mulai terlambat turun ke lapangan)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">16.01 – 17.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-600">70</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Toleransi Sore 2 (Waktu observasi dan wawancara sempit)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold text-slate-800">17.01 – 18.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-600">60</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Mepet Batas Akhir Jam Riset Resmi</td>
                    </tr>
                    <tr class="bg-rose-50/60">
                      <td class="p-2 border border-slate-300 text-center font-bold text-rose-900">&gt; 18.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-rose-700 text-sm">50</td>
                      <td class="p-2 border border-slate-300 font-semibold text-rose-900">Terlambat (Melewati batas resmi kegiatan lapangan harian)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Matriks Komposisi LKPD & Asesmen -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col gap-1">
                <span class="font-extrabold text-indigo-950 text-xs flex items-center justify-between">
                  <span>2. Kualitas LKPD Lapangan</span>
                  <span class="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-black text-[10px]">Bobot 30%</span>
                </span>
                <p class="text-[11.5px] text-slate-600 leading-snug">
                  Dinilai dari kelengkapan 6 kartu: identitas sektor, wawancara narasumber orisinal, 9 observasi lapangan nyata, dan 6 analisis kritis HOTS (wajib ketik mandiri, bukan klik-klik instan).
                </p>
              </div>
              <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col gap-1">
                <span class="font-extrabold text-teal-950 text-xs flex items-center justify-between">
                  <span>3. Skor Kuis Asesmen CBT</span>
                  <span class="px-2 py-0.5 rounded-full bg-teal-200 text-teal-900 font-black text-[10px]">Bobot 35%</span>
                </span>
                <p class="text-[11.5px] text-slate-600 leading-snug">
                  Nilai tes objektif kognitif Bloom C1–C4 (50 butir soal acak terstandar per siswa dari Bank Soal 200 soal harian).
                </p>
              </div>
            </div>

            <!-- Validasi Google Tagging GPS & Sanksi Keras -->
            <div class="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-col gap-2">
              <span class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-amber-600">location_on</span>
                <span>4. Integritas Google Tagging GPS (Bobot 15% &amp; Gatekeeper Lapangan):</span>
              </span>
              <ul class="text-[11.5px] text-slate-700 space-y-1.5 font-medium list-disc list-inside">
                <li><strong>Foto Kamera Valid OKU Timur (Skor 100):</strong> Foto wajib diambil langsung kamera aplikasi dengan koordinat GPS valid di wilayah OKU Timur (atau izin dispensasi domisili resmi Admin).</li>
                <li><strong class="text-rose-700">Sanksi Pinalti Foto Galeri / Tanpa GPS (Skor 30 &amp; Maksimal Bintang 1):</strong> Siswa yang mengunggah foto galeri tanpa GPS, foto internet, atau di luar OKU Timur tanpa dispensasi otomatis terkena Pinalti Geotag = 30 dan <strong>Maksimal Bintang 1 (⭐☆☆☆☆)</strong> karena tidak terbukti melakukan riset nyata di lapangan!</li>
              </ul>
            </div>

            <!-- ==================== 5. SIMULASI KASUS PERHITUNGAN NILAI SISWA ==================== -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-indigo-200 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="font-black text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <span class="material-symbols-outlined text-base text-indigo-600">calculate</span>
                  <span>5. Simulasi 3 Kasus Riil Perhitungan Nilai Siswa (Non-Field Trip):</span>
                </span>
                <span class="text-[10px] font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-300">Contoh Lapangan</span>
              </div>

              <!-- Kartu Simulasi 1 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-emerald-300 shadow-xs flex flex-col gap-1.5">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <span class="font-black text-xs text-emerald-950 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>KASUS 1: SISWA DISIPLIN &amp; INVESTIGASI MENDALAM</span>
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                    HASIL: BINTANG 5 (⭐⭐⭐⭐⭐)
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100">
                  <div>• Jam Modul: <strong class="text-slate-900">08.15 WIB</strong> (Poin: 100)</div>
                  <div>• Nilai LKPD: <strong class="text-slate-900">92</strong> (6 Kartu)</div>
                  <div>• Nilai Asesmen: <strong class="text-slate-900">90</strong></div>
                  <div>• Geotag: <strong class="text-emerald-700">Valid Belitang</strong> (100)</div>
                </div>
                <div class="text-[11.5px] font-bold text-indigo-900 bg-indigo-50/80 px-2.5 py-1.5 rounded-lg border border-indigo-200">
                  Perhitungan: NA = (0.20 × 100) + (0.30 × 92) + (0.35 × 90) + (0.15 × 100) = 20 + 27.6 + 31.5 + 15 = <span class="text-emerald-700 font-black">94.1 → BINTANG 5 (⭐⭐⭐⭐⭐)</span>
                </div>
              </div>

              <!-- Kartu Simulasi 2 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-amber-300 shadow-xs flex flex-col gap-1.5">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <span class="font-black text-xs text-amber-950 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>KASUS 2: ASESMEN TINGGI TETAPI MODUL SORE HARI</span>
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                    HASIL: BINTANG 4 (⭐⭐⭐⭐☆)
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 bg-amber-50/40 p-2 rounded-lg border border-amber-100">
                  <div>• Jam Modul: <strong class="text-slate-900">16.30 WIB</strong> (Poin: 70)</div>
                  <div>• Nilai LKPD: <strong class="text-slate-900">80</strong> (Cukup)</div>
                  <div>• Nilai Asesmen: <strong class="text-slate-900">86</strong></div>
                  <div>• Geotag: <strong class="text-emerald-700">Valid Belitang</strong> (100)</div>
                </div>
                <div class="text-[11.5px] font-bold text-amber-950 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200">
                  Perhitungan: NA = (0.20 × 70) + (0.30 × 80) + (0.35 × 86) + (0.15 × 100) = 14 + 24 + 30.1 + 15 = <span class="text-amber-800 font-black">83.1 → BINTANG 4 (⭐⭐⭐⭐☆)</span>
                </div>
              </div>

              <!-- Kartu Simulasi 3 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-rose-300 shadow-xs flex flex-col gap-1.5">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <span class="font-black text-xs text-rose-950 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>KASUS 3: TANPA GOOGLE TAGGING (PINALTI FOTO GALERI)</span>
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">
                    HASIL: PINALTI BINTANG 1 (⭐☆☆☆☆)
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 bg-rose-50/40 p-2 rounded-lg border border-rose-100">
                  <div>• Jam Modul: <strong class="text-slate-900">08.30 WIB</strong> (Poin: 100)</div>
                  <div>• Nilai LKPD: <strong class="text-slate-900">85</strong></div>
                  <div>• Nilai Asesmen: <strong class="text-slate-900">80</strong></div>
                  <div>• Geotag: <strong class="text-rose-700">Foto Galeri / Tanpa GPS</strong> (30)</div>
                </div>
                <div class="text-[11.5px] font-bold text-rose-950 bg-rose-50/80 px-2.5 py-1.5 rounded-lg border border-rose-200">
                  Perhitungan: NA = (0.20 × 100) + (0.30 × 85) + (0.35 × 80) + (0.15 × 30) = 20 + 25.5 + 28 + 4.5 = 78.0 → <span class="text-rose-800 font-black">Pinalti Geotag Maksimal: BINTANG 1 (⭐☆☆☆☆)</span>
                </div>
              </div>

              <!-- LIVE INTERACTIVE CALCULATOR UNTUK GURU -->
              <div class="p-4 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white flex flex-col gap-3 shadow-md border border-indigo-700/60 mt-1">
                <div class="flex items-center justify-between">
                  <span class="font-black text-xs sm:text-sm text-sky-200 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-sky-400">tune</span>
                    <span>Kalkulator Simulasi Interaktif (Coba Langsung):</span>
                  </span>
                  <span class="text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded">Live Real-time</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                  <div>
                    <label class="block text-[10.5px] font-bold text-indigo-200 mb-1">Jam Modul (20%):</label>
                    <select id="simJamModul" onchange="runLiveNonFTSimulation()" class="w-full bg-slate-800 border border-indigo-400/40 rounded-lg p-2 text-white font-bold text-xs focus:ring-2 focus:ring-sky-400 outline-none cursor-pointer">
                      <option value="100">07.00 – 09.00 WIB (100 Poin)</option>
                      <option value="88">09.01 – 12.00 WIB (88 Poin)</option>
                      <option value="85">12.01 – 15.00 WIB (85 Poin)</option>
                      <option value="80">15.01 – 16.00 WIB (80 Poin)</option>
                      <option value="70">16.01 – 17.00 WIB (70 Poin)</option>
                      <option value="60">17.01 – 18.00 WIB (60 Poin)</option>
                      <option value="50">&gt; 18.00 WIB (50 Poin)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10.5px] font-bold text-indigo-200 mb-1">Skor LKPD (30%):</label>
                    <input id="simSkorLKPD" type="number" min="0" max="100" value="85" oninput="runLiveNonFTSimulation()" class="w-full bg-slate-800 border border-indigo-400/40 rounded-lg p-2 text-white font-bold text-xs focus:ring-2 focus:ring-sky-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-[10.5px] font-bold text-indigo-200 mb-1">Skor Asesmen (35%):</label>
                    <input id="simSkorAsesmen" type="number" min="0" max="100" value="85" oninput="runLiveNonFTSimulation()" class="w-full bg-slate-800 border border-indigo-400/40 rounded-lg p-2 text-white font-bold text-xs focus:ring-2 focus:ring-sky-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-[10.5px] font-bold text-indigo-200 mb-1">Google Tagging (15%):</label>
                    <select id="simGeotag" onchange="runLiveNonFTSimulation()" class="w-full bg-slate-800 border border-indigo-400/40 rounded-lg p-2 text-white font-bold text-xs focus:ring-2 focus:ring-sky-400 outline-none cursor-pointer">
                      <option value="100">Valid Kamera OKU Timur (100)</option>
                      <option value="30">Foto Galeri / Tanpa GPS (Pinalti 30)</option>
                    </select>
                  </div>
                </div>

                <!-- Hasil Kalkulasi Interaktif -->
                <div class="p-3 rounded-xl bg-black/50 border border-sky-400/30 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="text-slate-300">Rincian Komposit:</span>
                    <span id="simResFormula" class="font-mono text-sky-300 font-bold text-xs">(20.0) + (25.5) + (29.8) + (15.0)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span id="simResScore" class="font-black text-sm text-yellow-300">Nilai Akhir: 90.3</span>
                    <span id="simResStars" class="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs">⭐⭐⭐⭐⭐ Bintang 5</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- ==================== TAB 3: NILAI RAPOR ==================== -->
          <div id="contentTab_Rapor" class="space-y-4 hidden">
            
            <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span class="font-black text-xs sm:text-sm text-amber-950">Standar Resmi Ambang Batas Predikat Rapor FINCESTEM</span>
                <p class="text-[11px] text-amber-900/80">Kalkulasi kumulatif Day 1 hingga Day 7 (Maksimal Akumulasi 35 ⭐ Bintang)</p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-200 text-amber-950 border border-amber-300">
                Akumulasi 7 Hari
              </span>
            </div>

            <!-- KARTU 1: MAHIR -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-50/90 via-amber-100/50 to-amber-50/80 border-2 border-amber-300 flex flex-col gap-2 shadow-xs">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-amber-200">
                <div class="flex items-center gap-2">
                  <span class="text-base sm:text-lg">🏆</span>
                  <span class="font-black text-sm sm:text-base text-amber-950">PREDIKAT MAHIR</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-200 text-amber-950 border border-amber-300">
                    30 – 35 ⭐ Bintang
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Nilai Rata-rata: ≥ 85.0
                  </span>
                </div>
              </div>
              <p class="text-xs sm:text-[12.5px] text-amber-950 leading-relaxed text-justify mt-1">
                <strong>Narasi Capaian Rapor Siswa:</strong> Peserta didik mampu menganalisis data hasil eksplorasi lapangan secara mendalam dan objektif, memecahkan masalah melalui integrasi sains dan teknologi, serta mengevaluasi penggunaan anggaran keuangan secara tepat. Dalam kreativitas, peserta didik mampu menghasilkan karya orisinal berbasis STEM yang mengangkat nilai dan filosofi budaya lokal, serta menyajikan hasil eksplorasi melalui video dokumenter dan infografis yang menarik, informatif, dan berkualitas. Dalam aspek kewargaan, peserta didik menunjukkan keteladanan dalam menghargai kearifan lokal, menjunjung toleransi, dan menginisiasi kegiatan pelestarian lingkungan. Dalam kemandirian, peserta didik menunjukkan tanggung jawab, disiplin dalam menyelesaikan tugas, integritas, serta pengelolaan keuangan yang jujur dan transparan.
              </p>
            </div>

            <!-- KARTU 2: CAKAP -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-emerald-100/50 to-emerald-50/80 border-2 border-emerald-300 flex flex-col gap-2 shadow-xs">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-emerald-200">
                <div class="flex items-center gap-2">
                  <span class="text-base sm:text-lg">🌟</span>
                  <span class="font-black text-sm sm:text-base text-emerald-950">PREDIKAT CAKAP</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-200 text-emerald-950 border border-emerald-300">
                    21 – 29 ⭐ Bintang
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-100 text-sky-900 border border-sky-300">
                    Nilai Rata-rata: 70.0 – 84.9
                  </span>
                </div>
              </div>
              <p class="text-xs sm:text-[12.5px] text-emerald-950 leading-relaxed text-justify mt-1">
                <strong>Narasi Capaian Rapor Siswa:</strong> Peserta didik mampu menganalisis data hasil eksplorasi lapangan, memahami prinsip dasar STEM, serta menyusun pembukuan keuangan secara logis dan mandiri. Dalam kreativitas, peserta didik mampu menghasilkan karya berbasis STEM yang memadukan kearifan lokal serta menyajikan hasil eksplorasi melalui infografis atau video pendek yang informatif. Dalam aspek kewargaan, peserta didik mampu menghormati keberagaman budaya, menjaga etika dan kesopanan, serta berperan aktif dalam menjaga kelestarian lingkungan. Dalam kemandirian, peserta didik mampu mengatur waktu, bertanggung jawab atas barang bawaan, menyelesaikan tugas harian dengan disiplin, dan mengelola anggaran pribadi secara mandiri.
              </p>
            </div>

            <!-- KARTU 3: BERKEMBANG -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 via-blue-100/50 to-blue-50/80 border-2 border-blue-300 flex flex-col gap-2 shadow-xs">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-blue-200">
                <div class="flex items-center gap-2">
                  <span class="text-base sm:text-lg">🌱</span>
                  <span class="font-black text-sm sm:text-base text-blue-950">PREDIKAT BERKEMBANG</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-200 text-blue-950 border border-blue-300">
                    ≤ 20 ⭐ Bintang
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-300">
                    Nilai Rata-rata: &lt; 70.0
                  </span>
                </div>
              </div>
              <p class="text-xs sm:text-[12.5px] text-blue-950 leading-relaxed text-justify mt-1">
                <strong>Narasi Capaian Rapor Siswa:</strong> Peserta didik mulai mampu mengumpulkan data hasil eksplorasi lapangan dan memahami konsep dasar STEM, tetapi masih memerlukan bimbingan dalam menganalisis fenomena sains dan mengevaluasi pembukuan keuangan. Dalam kreativitas, peserta didik mulai mengembangkan karya berbasis STEM dan mempraktikkan keterampilan budaya lokal, meskipun pembuatan video dan infografis masih memerlukan pendampingan. Dalam aspek kewargaan, peserta didik mulai mematuhi aturan dan menghargai nilai-nilai budaya setempat, tetapi masih perlu diingatkan untuk menjaga kelestarian lingkungan. Dalam kemandirian, peserta didik mulai belajar mengelola uang saku dan masih memerlukan dorongan untuk menyelesaikan serta mengumpulkan tugas harian tepat waktu.
              </p>
            </div>

            <!-- Rubrik 4 Pilar Seimbang 25% -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
              <span class="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-indigo-600">balance</span>
                <span>Panduan Rubrik 4 Pilar FINCESTEM (Bobot Seimbang 25% Masing-Masing):</span>
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-1">
                  <span class="font-extrabold text-amber-900">1. Pilar Financial (Bobot 25%)</span>
                  <span class="text-[11px] text-slate-600 leading-snug">Pengelolaan kas saku pribadi, pembukuan neraca harian jujur &amp; transparan, kalkulasi efisiensi, dan pemahaman struktur biaya (HPP).</span>
                </div>
                <div class="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col gap-1">
                  <span class="font-extrabold text-purple-900">2. Pilar Culture (Bobot 25%)</span>
                  <span class="text-[11px] text-slate-600 leading-snug">Apresiasi sejarah akulturasi, tata krama etika terhadap warga/narasumber, tradisi gotong royong sambatan, dan pelestarian budaya nusantara.</span>
                </div>
                <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-1">
                  <span class="font-extrabold text-emerald-900">3. Pilar Exploration (Bobot 25%)</span>
                  <span class="text-[11px] text-slate-600 leading-snug">Ketangkasan navigasi lapangan, observasi objek fisik/ekosistem, kedisiplinan pengumpulan, dan ketahanan fisik dalam riset mandiri.</span>
                </div>
                <div class="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-1">
                  <span class="font-extrabold text-blue-900">4. Pilar STEM (Bobot 25%)</span>
                  <span class="text-[11px] text-slate-600 leading-snug">Penerapan mekanika fisika, ekosistem biologi, rekayasa teknologi, pengolahan data numerik, dan pemecahan masalah ilmiah secara objektif.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer Modal Aksi -->
        <div class="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div class="text-[11px] text-slate-500 font-medium text-center sm:text-left">
            <span id="kriteriaFooterNote">Tersedia dokumen resmi format ringkas 1 lembar tanpa kop &amp; tanpa tanda tangan.</span>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button id="btnDownloadFooter" type="button" onclick="downloadKriteriaKokurikulerPdf()" class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">download</span>
              <span id="btnDownloadFooterLabel">Download PDF Kriteria Field Trip (1 Lembar)</span>
            </button>
            <button type="button" onclick="closeKriteriaKokurikulerModal()" class="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all cursor-pointer">
              <span>Tutup</span>
            </button>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  window.runLiveNonFTSimulation = function() {
    const wModulEl = document.getElementById('simJamModul');
    const sLKPDEl = document.getElementById('simSkorLKPD');
    const sAsesEl = document.getElementById('simSkorAsesmen');
    const sGeoEl = document.getElementById('simGeotag');

    if (!wModulEl || !sLKPDEl || !sAsesEl || !sGeoEl) return;

    const wModul = parseFloat(wModulEl.value) || 100;
    const sLKPD = Math.max(0, Math.min(100, parseFloat(sLKPDEl.value) || 0));
    const sAses = Math.max(0, Math.min(100, parseFloat(sAsesEl.value) || 0));
    const sGeo = parseFloat(sGeoEl.value) || 100;

    const partModul = 0.20 * wModul;
    const partLKPD = 0.30 * sLKPD;
    const partAses = 0.35 * sAses;
    const partGeo = 0.15 * sGeo;

    const na = Math.round((partModul + partLKPD + partAses + partGeo) * 10) / 10;

    let starLabel = '⭐⭐⭐⭐⭐ Bintang 5';
    let badgeColor = 'bg-amber-400 text-amber-950';

    if (sGeo === 30) {
      starLabel = '⭐☆☆☆☆ Pinalti Bintang 1';
      badgeColor = 'bg-rose-500 text-white';
    } else {
      if (na >= 90) {
        starLabel = '⭐⭐⭐⭐⭐ Bintang 5 (Sangat Baik)';
        badgeColor = 'bg-amber-400 text-amber-950';
      } else if (na >= 80) {
        starLabel = '⭐⭐⭐⭐☆ Bintang 4 (Baik)';
        badgeColor = 'bg-amber-300 text-amber-950';
      } else if (na >= 70) {
        starLabel = '⭐⭐⭐☆☆ Bintang 3 (Cukup)';
        badgeColor = 'bg-sky-400 text-slate-900';
      } else if (na >= 60) {
        starLabel = '⭐⭐☆☆☆ Bintang 2 (Kurang)';
        badgeColor = 'bg-orange-400 text-slate-900';
      } else {
        starLabel = '⭐☆☆☆☆ Bintang 1 (Sangat Kurang)';
        badgeColor = 'bg-rose-500 text-white';
      }
    }

    const formulaEl = document.getElementById('simResFormula');
    const scoreEl = document.getElementById('simResScore');
    const starsEl = document.getElementById('simResStars');

    if (formulaEl) formulaEl.textContent = `(${partModul.toFixed(1)}) + (${partLKPD.toFixed(1)}) + (${partAses.toFixed(1)}) + (${partGeo.toFixed(1)})`;
    if (scoreEl) scoreEl.textContent = `Nilai Akhir: ${na.toFixed(1)}`;
    if (starsEl) {
      starsEl.textContent = starLabel;
      starsEl.className = `px-2.5 py-0.5 rounded-full font-black text-xs ${badgeColor}`;
    }
  };

  window.switchKriteriaTab = function(tab) {
    currentActiveTab = tab;
    const tabFT = document.getElementById('tabBtn_FT');
    const tabNonFT = document.getElementById('tabBtn_NonFT');
    const tabRapor = document.getElementById('tabBtn_Rapor');

    const contentFT = document.getElementById('contentTab_FT');
    const contentNonFT = document.getElementById('contentTab_NonFT');
    const contentRapor = document.getElementById('contentTab_Rapor');

    const headerSub = document.getElementById('kriteriaSubtitle');
    const iconWrapper = document.getElementById('kriteriaIconWrapper');

    const btnHeader = document.getElementById('btnDownloadHeader');
    const labelHeader = document.getElementById('btnDownloadHeaderLabel');
    const btnFooter = document.getElementById('btnDownloadFooter');
    const labelFooter = document.getElementById('btnDownloadFooterLabel');
    const noteFooter = document.getElementById('kriteriaFooterNote');

    // Reset styles
    const inactiveClass = 'px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer text-slate-600 hover:text-slate-900 border-transparent';
    if (tabFT) tabFT.className = inactiveClass;
    if (tabNonFT) tabNonFT.className = inactiveClass;
    if (tabRapor) tabRapor.className = inactiveClass;

    if (contentFT) contentFT.classList.add('hidden');
    if (contentNonFT) contentNonFT.classList.add('hidden');
    if (contentRapor) contentRapor.classList.add('hidden');

    if (tab === 'nonft') {
      if (tabNonFT) tabNonFT.className = 'px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer bg-white text-indigo-900 border-indigo-600 shadow-xs';
      if (contentNonFT) contentNonFT.classList.remove('hidden');
      if (headerSub) headerSub.textContent = 'Non-Field Trip (Riset Mandiri OKU Timur)';
      if (iconWrapper) {
        iconWrapper.className = 'w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0';
        iconWrapper.innerHTML = '<span class="material-symbols-outlined text-2xl">home_pin</span>';
      }
      if (btnHeader) btnHeader.className = 'hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer';
      if (labelHeader) labelHeader.textContent = 'Download PDF Non-Field Trip';
      if (btnFooter) btnFooter.className = 'flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer';
      if (labelFooter) labelFooter.textContent = 'Download PDF Kriteria Non-Field Trip (1 Lembar)';
      if (noteFooter) noteFooter.textContent = 'Tersedia dokumen resmi Non-Field Trip 1 lembar memuat rumus, bobot & simulasi 3 kasus siswa.';
      setTimeout(window.runLiveNonFTSimulation, 50);
    } else if (tab === 'rapor') {
      if (tabRapor) tabRapor.className = 'px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer bg-white text-amber-900 border-amber-600 shadow-xs';
      if (contentRapor) contentRapor.classList.remove('hidden');
      if (headerSub) headerSub.textContent = 'Predikat Rapor & Rubrik 4 Pilar';
      if (iconWrapper) {
        iconWrapper.className = 'w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0';
        iconWrapper.innerHTML = '<span class="material-symbols-outlined text-2xl">military_tech</span>';
      }
      if (btnHeader) btnHeader.className = 'hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer';
      if (labelHeader) labelHeader.textContent = 'Download PDF Kriteria Rapor';
      if (btnFooter) btnFooter.className = 'flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer';
      if (labelFooter) labelFooter.textContent = 'Download PDF Kriteria Rapor (1 Lembar)';
      if (noteFooter) noteFooter.textContent = 'Tersedia dokumen resmi Predikat Rapor 1 lembar memuat Mahir, Cakap, Berkembang & Rubrik 4 Pilar.';
    } else {
      // default: ft
      if (tabFT) tabFT.className = 'px-3.5 sm:px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer bg-white text-emerald-900 border-emerald-600 shadow-xs';
      if (contentFT) contentFT.classList.remove('hidden');
      if (headerSub) headerSub.textContent = 'Field Trip (Studi Wisata Jawa)';
      if (iconWrapper) {
        iconWrapper.className = 'w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0';
        iconWrapper.innerHTML = '<span class="material-symbols-outlined text-2xl">directions_bus</span>';
      }
      if (btnHeader) btnHeader.className = 'hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer';
      if (labelHeader) labelHeader.textContent = 'Download PDF Field Trip';
      if (btnFooter) btnFooter.className = 'flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer';
      if (labelFooter) labelFooter.textContent = 'Download PDF Kriteria Field Trip (1 Lembar)';
      if (noteFooter) noteFooter.textContent = 'Tersedia dokumen resmi Field Trip 1 lembar tanpa kop & tanpa tanda tangan.';
    }
  };

  window.openKriteriaKokurikulerModal = function(initialTab) {
    const modal = createModalDOM();
    window.switchKriteriaTab(initialTab || 'ft');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
  };

  window.closeKriteriaKokurikulerModal = function() {
    const modal = document.getElementById('modalKriteriaKokurikuler');
    if (modal) {
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  };

  // Helper trigger unduhan berkas PDF spesifik
  function triggerPdfDownload(fileName) {
    const isSubdir = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/guru/') || window.location.pathname.includes('/siswa/');
    const basePdf = (isSubdir ? '../' : '') + fileName;
    const freshUrl = basePdf + '?v=' + Date.now();

    try {
      const link = document.createElement('a');
      link.href = freshUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(function() {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 100);
    } catch(e) {
      window.open(freshUrl, '_blank');
    }
  }

  window.downloadKriteriaKokurikulerPdf = function() {
    if (currentActiveTab === 'nonft') {
      triggerPdfDownload('KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf');
    } else if (currentActiveTab === 'rapor') {
      triggerPdfDownload('KRITERIA_PREDIKAT_RAPOR_2026.pdf');
    } else {
      triggerPdfDownload('KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf');
    }
  };

  window.downloadKriteriaFTPdf = function() { triggerPdfDownload('KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf'); };
  window.downloadKriteriaNonFTPdf = function() { triggerPdfDownload('KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf'); };
  window.downloadKriteriaRaporPdf = function() { triggerPdfDownload('KRITERIA_PREDIKAT_RAPOR_2026.pdf'); };

  // Backward compatibility alias
  window.openKriteriaModal = window.openKriteriaKokurikulerModal;
  window.closeKriteriaModal = window.closeKriteriaKokurikulerModal;
  window.openKriteriaNonFTModal = function() { window.openKriteriaKokurikulerModal('nonft'); };
  window.openKriteriaFTModal = function() { window.openKriteriaKokurikulerModal('ft'); };
  window.closeKriteriaNonFTModal = window.closeKriteriaKokurikulerModal;
  window.openKriteriaNonFTPdf = function() { triggerPdfDownload('KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf'); };
  window.openKriteriaFTPdf = function() { triggerPdfDownload('KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf'); };

})(window);