/**
 * FINCESTEM 2026 - Modal Pedoman & Kriteria Penilaian Harian
 * Mencakup: Non-Field Trip (OKU Timur) & Field Trip (Jawa)
 * Khusus Portal Administrator, Fasilitator & Koordinator
 * (DILARANG Ditampilkan di Portal Siswa)
 */

(function(window) {
  'use strict';

  let currentActiveTab = 'nonft'; // 'nonft' | 'ft'

  function createModalDOM() {
    let existing = document.getElementById('modalKriteriaPenilaian');
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.id = 'modalKriteriaPenilaian';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 transition-all duration-300 opacity-0 pointer-events-none';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
        
        <!-- Header Modal -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/60">
          <div class="flex items-center gap-3">
            <div id="kriteriaHeaderIcon" class="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-2xl">fact_check</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-amber-950">Pedoman Guru &amp; Fasil</span>
                <span id="kriteriaHeaderSub" class="text-xs text-indigo-200">FINCESTEM Day 1 – 7</span>
              </div>
              <h3 id="kriteriaHeaderTitle" class="font-black text-base sm:text-lg text-white leading-tight mt-0.5">
                Kriteria &amp; Pedoman Penilaian Harian
              </h3>
            </div>
          </div>
          <button type="button" onclick="closeKriteriaModal()" class="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Tutup">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- Tab Navigation (Non-Field Trip vs Field Trip) -->
        <div class="flex border-b border-slate-200 bg-slate-100/80 px-4 pt-2 gap-2 text-xs font-bold">
          <button id="tabBtnKriteriaNonFT" type="button" onclick="switchKriteriaTab('nonft')" class="px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer bg-white text-indigo-900 border-indigo-600 shadow-xs">
            <span class="material-symbols-outlined text-base text-indigo-600">home_pin</span>
            <span>Non-Field Trip (OKU Timur)</span>
          </button>
          <button id="tabBtnKriteriaFT" type="button" onclick="switchKriteriaTab('ft')" class="px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 border-transparent">
            <span class="material-symbols-outlined text-base text-emerald-600">directions_bus</span>
            <span>Field Trip (Jawa)</span>
          </button>
        </div>

        <!-- Body Scrollable -->
        <div class="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed no-scrollbar flex-1">
          
          <!-- KONTEN TAB 1: NON-FIELD TRIP -->
          <div id="contentKriteriaNonFT" class="space-y-4">
            
            <!-- Box Rumus Resmi Non-FT -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white flex flex-col items-center text-center gap-1.5 shadow-md border border-indigo-800/40">
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Rumus Resmi Nilai Akhir Harian (NA) Non-Field Trip:</span>
              <div class="font-mono text-sm sm:text-base font-black text-sky-300 bg-black/30 px-3 py-1.5 rounded-xl border border-sky-400/30 w-full text-center">
                NA = (20% × Waktu Modul) + (30% × LKPD) + (35% × Asesmen) + (15% × Geotag)
              </div>
              <span class="text-[10.5px] text-slate-300">Akumulasi skala 0 – 100 otomatis dikonversikan ke peringkat Bintang 1 sampai Bintang 5.</span>
            </div>

            <!-- Parameter Jam Pengisian Modul (Bobot 20%) -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-indigo-600">schedule</span>
                  <span>1. Parameter Jam Pengisian Modul Pagi (Bobot 20%):</span>
                </span>
                <span class="text-[10.5px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">Indikator Awal Siswa Bekerja</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Sistem FINCESTEM membaca jam submit Modul Belajar (5 Kartu Riset Mandiri) secara otomatis per detik:
              </p>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-200/70 text-slate-800 font-bold">
                      <th class="p-2 border border-slate-300 text-center">Rentang Jam Submit</th>
                      <th class="p-2 border border-slate-300 text-center">Poin</th>
                      <th class="p-2 border border-slate-300">Status Kedisiplinan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="bg-emerald-50/50">
                      <td class="p-2 border border-slate-300 text-center font-bold">07.00 – 09.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-emerald-700">100</td>
                      <td class="p-2 border border-slate-300 font-semibold text-emerald-800">Sangat Disiplin (Pagi Penuh)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">09.01 – 12.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-600">88</td>
                      <td class="p-2 border border-slate-300 font-semibold text-emerald-700">Baik (Menjelang Siang)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">12.01 – 15.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">85</td>
                      <td class="p-2 border border-slate-300 font-semibold text-amber-800">Cukup Disiplin (Siang Hari)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">15.01 – 16.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">80</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Toleransi Sore 1 (Mulai Terlambat)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">16.01 – 17.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-600">70</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Toleransi Sore 2 (Waktu Observasi Sedikit)</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">17.01 – 18.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-600">60</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Mepet Batas Akhir Jam Riset</td>
                    </tr>
                    <tr class="bg-rose-50/50">
                      <td class="p-2 border border-slate-300 text-center font-bold text-rose-700">&gt; 18.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-rose-700">50</td>
                      <td class="p-2 border border-slate-300 font-semibold text-rose-800">Terlambat (Lewat Jam Riset Resmi)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Matriks 4 Komponen & Bobot -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex flex-col gap-1">
                <span class="font-extrabold text-indigo-950 text-xs flex items-center justify-between">
                  <span>Kualitas LKPD Lapangan</span>
                  <span class="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-black text-[10px]">Bobot 30%</span>
                </span>
                <p class="text-[11.5px] text-slate-600 leading-snug">
                  Dinilai dari kelengkapan 6 kartu, catatan orisinal wawancara narasumber, 9 observasi lapangan nyata, dan 6 analisis kritis HOTS (wajib ketik mandiri).
                </p>
              </div>
              <div class="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex flex-col gap-1">
                <span class="font-extrabold text-teal-950 text-xs flex items-center justify-between">
                  <span>Skor Kuis Asesmen CBT</span>
                  <span class="px-2 py-0.5 rounded-full bg-teal-200 text-teal-900 font-black text-[10px]">Bobot 35%</span>
                </span>
                <p class="text-[11.5px] text-slate-600 leading-snug">
                  Nilai murni hasil tes kuis objektif kognitif Bloom C1–C4 (50 butir soal teracak acak per siswa dari Bank Soal 200).
                </p>
              </div>
            </div>

            <!-- Aturan Google Tagging GPS & Sanksi Pinalti -->
            <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col gap-2">
              <span class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-amber-600">location_on</span>
                <span>Integritas Google Tagging GPS (Bobot 15% &amp; Gatekeeper Lapangan):</span>
              </span>
              <ul class="text-[11.5px] text-slate-700 space-y-1 font-medium list-disc list-inside">
                <li><strong>Foto Kamera Valid OKU Timur (Skor 100):</strong> Foto wajib diambil langsung kamera HP dengan GPS berada di wilayah OKU Timur.</li>
                <li><strong class="text-rose-700">Sanksi Pinalti Foto Galeri / Tanpa GPS (Skor 30 / Maksimal Bintang 1):</strong> Foto galeri tanpa GPS, foto internet, atau di luar OKU Timur tanpa izin dispensasi resmi otomatis terkena Pinalti Geotag = 30 dan <strong>Maksimal Bintang 1 (⭐☆☆☆☆)</strong> karena tidak terbukti terjun ke lapangan!</li>
              </ul>
            </div>

          </div>

          <!-- KONTEN TAB 2: FIELD TRIP -->
          <div id="contentKriteriaFT" class="space-y-4 hidden">
            
            <!-- Box Filosofi FT -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white flex flex-col items-center text-center gap-1.5 shadow-md border border-emerald-800/40">
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Prinsip Resmi Penilaian Harian Field Trip (Jawa):</span>
              <div class="font-mono text-sm sm:text-base font-black text-emerald-300 bg-black/30 px-3 py-1.5 rounded-xl border border-emerald-400/30 w-full text-center">
                Nilai Harian FT = 100% Berbasis Jam Pengumpulan (On-Time Submission)
              </div>
              <span class="text-[10.5px] text-slate-300">Karena siswa berada dalam rombongan armada bus sekolah dengan jadwal objek wisata yang ketat.</span>
            </div>

            <!-- Tabel Skema Jam Field Trip -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-emerald-600">schedule</span>
                  <span>Skema Penilaian Jam Submit Field Trip (js/core.js):</span>
                </span>
                <span class="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Batas Standar: 16.00 WIB</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-200/70 text-slate-800 font-bold">
                      <th class="p-2 border border-slate-300 text-center">Jam Submit</th>
                      <th class="p-2 border border-slate-300 text-center">Nilai</th>
                      <th class="p-2 border border-slate-300 text-center">Bintang</th>
                      <th class="p-2 border border-slate-300">Keterangan Aktivitas Siswa</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="bg-emerald-50/50">
                      <td class="p-2 border border-slate-300 text-center font-bold">07.00 – 16.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-emerald-700">100</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-800">⭐⭐⭐⭐⭐ (B5)</td>
                      <td class="p-2 border border-slate-300 font-semibold text-emerald-800">Tuntas di lokasi sebelum jam kunjungan objek ditutup.</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">16.01 – 21.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-600">95 – 99</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-emerald-700">⭐⭐⭐⭐⭐ (B5)</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Tuntas di bus/rest area (turun 1 poin per jam keterlambatan).</td>
                    </tr>
                    <tr>
                      <td class="p-2 border border-slate-300 text-center font-bold">21.01 – 24.00 WIB</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-600">90 – 94</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-amber-700">⭐⭐⭐⭐☆ (B4)</td>
                      <td class="p-2 border border-slate-300 text-slate-700">Tuntas malam hari saat tiba di hotel/penginapan rombongan.</td>
                    </tr>
                    <tr class="bg-orange-50/50">
                      <td class="p-2 border border-slate-300 text-center font-bold">&gt; 24.00 WIB / Besok</td>
                      <td class="p-2 border border-slate-300 text-center font-black text-orange-700">85</td>
                      <td class="p-2 border border-slate-300 text-center font-bold text-orange-700">⭐⭐⭐⭐☆ (B4)</td>
                      <td class="p-2 border border-slate-300 font-semibold text-orange-800">Pengumpulan terlambat pada keesokan harinya.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Fitur Darurat Admin & Integritas Lapangan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col gap-1">
                <span class="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-amber-600">bolt</span>
                  <span>Koreksi Darurat Admin (Override)</span>
                </span>
                <p class="text-[11.5px] text-slate-700 leading-snug">
                  Jika terjadi kendala sinyal blank-spot (misal Kaldera Bromo) atau siswa sakit, Admin/Koordinator berhak melakukan override nilai manual dengan catatan alasan resmi.
                </p>
              </div>
              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex flex-col gap-1">
                <span class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base text-emerald-600">verified</span>
                  <span>Bebas Pinalti Geotag</span>
                </span>
                <p class="text-[11.5px] text-slate-700 leading-snug">
                  Siswa Field Trip tidak dikenakan pinalti Google Tagging karena seluruh pergerakan berada dalam pengawasan fisik guru pendamping dan tour leader.
                </p>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer Modal Aksi -->
        <div class="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-[11px] text-slate-500 font-medium text-center sm:text-left">
            <span id="kriteriaFooterNote">Tersedia dokumen resmi standar cetak A4 (1 lembar).</span>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <!-- Tombol Buka PDF Non-FT -->
            <button id="btnOpenPdfNonFT" type="button" onclick="openKriteriaNonFTPdf()" class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">picture_as_pdf</span>
              <span>Buka PDF Non-Field Trip (1 Lembar)</span>
            </button>
            <!-- Tombol Buka PDF FT -->
            <button id="btnOpenPdfFT" type="button" onclick="openKriteriaFTPdf()" class="hidden flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">picture_as_pdf</span>
              <span>Buka PDF Field Trip (1 Lembar)</span>
            </button>
            <button type="button" onclick="closeKriteriaModal()" class="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all cursor-pointer">
              <span>Tutup</span>
            </button>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  window.switchKriteriaTab = function(tab) {
    currentActiveTab = tab;
    const tabNonFT = document.getElementById('tabBtnKriteriaNonFT');
    const tabFT = document.getElementById('tabBtnKriteriaFT');
    const contentNonFT = document.getElementById('contentKriteriaNonFT');
    const contentFT = document.getElementById('contentKriteriaFT');
    const btnPdfNonFT = document.getElementById('btnOpenPdfNonFT');
    const btnPdfFT = document.getElementById('btnOpenPdfFT');
    const headerTitle = document.getElementById('kriteriaHeaderTitle');
    const headerSub = document.getElementById('kriteriaHeaderSub');
    const headerIcon = document.getElementById('kriteriaHeaderIcon');

    if (tab === 'ft') {
      // Aktifkan Tab FT
      if (tabNonFT) {
        tabNonFT.className = 'px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 border-transparent';
      }
      if (tabFT) {
        tabFT.className = 'px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer bg-white text-emerald-900 border-emerald-600 shadow-xs';
      }
      if (contentNonFT) contentNonFT.classList.add('hidden');
      if (contentFT) contentFT.classList.remove('hidden');
      if (btnPdfNonFT) btnPdfNonFT.classList.add('hidden');
      if (btnPdfFT) btnPdfFT.classList.remove('hidden');

      if (headerTitle) headerTitle.textContent = 'Kriteria Penilaian Harian Field Trip';
      if (headerSub) headerSub.textContent = 'Studi Wisata Jawa (Day 1 – 7)';
      if (headerIcon) {
        headerIcon.className = 'w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0';
      }
    } else {
      // Aktifkan Tab Non-FT
      if (tabNonFT) {
        tabNonFT.className = 'px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer bg-white text-indigo-900 border-indigo-600 shadow-xs';
      }
      if (tabFT) {
        tabFT.className = 'px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 border-transparent';
      }
      if (contentNonFT) contentNonFT.classList.remove('hidden');
      if (contentFT) contentFT.classList.add('hidden');
      if (btnPdfNonFT) btnPdfNonFT.classList.remove('hidden');
      if (btnPdfFT) btnPdfFT.classList.add('hidden');

      if (headerTitle) headerTitle.textContent = 'Kriteria Penilaian Harian Non-Field Trip';
      if (headerSub) headerSub.textContent = 'Riset Mandiri OKU Timur (Day 1 – 7)';
      if (headerIcon) {
        headerIcon.className = 'w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0';
      }
    }
  };

  window.openKriteriaModal = function(initialTab) {
    const modal = createModalDOM();
    if (initialTab) {
      window.switchKriteriaTab(initialTab);
    }
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
  };

  window.openKriteriaNonFTModal = function() {
    window.openKriteriaModal('nonft');
  };

  window.openKriteriaFTModal = function() {
    window.openKriteriaModal('ft');
  };

  window.closeKriteriaModal = function() {
    const modal = document.getElementById('modalKriteriaPenilaian');
    if (modal) {
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  };

  window.closeKriteriaNonFTModal = window.closeKriteriaModal;

  window.openKriteriaNonFTPdf = function() {
    const isSubdir = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/guru/') || window.location.pathname.includes('/siswa/');
    const pdfUrl = isSubdir ? '../KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf' : 'KRITERIA_PENILAIAN_NON_FIELDTRIP_2026.pdf';
    window.open(pdfUrl, '_blank');
  };

  window.openKriteriaFTPdf = function() {
    const isSubdir = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/guru/') || window.location.pathname.includes('/siswa/');
    const pdfUrl = isSubdir ? '../KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf' : 'KRITERIA_PENILAIAN_FIELDTRIP_2026.pdf';
    window.open(pdfUrl, '_blank');
  };

})(window);