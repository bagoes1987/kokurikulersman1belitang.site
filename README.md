# FINCESTEM 2026 - SMA Negeri 1 Belitang
### Aplikasi Web Kokurikuler Terpadu (Financial • Culture • Exploration • STEM)

Selamat datang di repositori resmi **FINCESTEM 2026 SMAN 1 Belitang, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan**.

🌐 **Domain Resmi:** [kokurikulersman1belitang.site](https://kokurikulersman1belitang.site)  
📦 **Repositori GitHub:** [bagoes1987/kokurikulersman1belitang.site](https://github.com/bagoes1987/kokurikulersman1belitang.site)

---

## 🌟 Tentang Program FINCESTEM 2026

Kegiatan kokurikuler bertema **FINCESTEM (Financial, Culture, Exploration, and STEM)** adalah pembelajaran berbasis pengalaman nyata (*experiential deep learning*) yang menghubungkan kurikulum sekolah dengan potensi lokal OKU Timur serta wawasan global:
- **Financial (01):** Literasi finansial, tata niaga beras Belitang, kalkulasi HPP petani, dan manajemen perbankan daerah.
- **Culture (02):** Kearifan lokal Sumatera Selatan, sejarah transmigrasi Blok Kurungan (BK) 1937, dan harmoni gotong royong sambatan.
- **Exploration (03):** Geografi spasial Daerah Aliran Sungai (DAS) Komering, elevasi Bendungan Perjaya, dan pemetaan rute lapangan.
- **STEM (04):** Uji baku mutu kualitas air irigasi (pH, kekeruhan, suhu), kalkulasi debit kontinu Romijn ($Q = A \times v$), dan rekayasa agro-teknologi terapan.

---

## 🏗️ Struktur Proyek Modular (Zero-Collision Architecture)

Aplikasi dibangun dengan arsitektur modular mandiri untuk mencegah konflik kode (*coding collision*) saat pengembangan paralel:

```text
APP FINCESTEM/
├── index.html                    # Beranda Utama, Profil Sekolah, 4 Gerbang Portal & Sponsor Kegiatan
├── panduan.html                  # Panduan, Silabus 4 Pilar, Rute OKU Timur & Rute Luar OKU
├── index.monolith.backup.html    # Cadangan aman berkas sebelum refaktorisasi
│
├── siswa/                        # PORTAL SISWA
│   ├── index.html                # Form Login NISN Dapodik
│   ├── dashboard.html            # Beranda Siswa, Progres 4 Pilar & Jadwal Ekspedisi
│   ├── materi.html               # Modul Pembelajaran Digital 4 Pilar Lengkap
│   ├── lkpd.html                 # Pengerjaan & Pengumpulan Lembar Kerja Siswa (LKPD)
│   └── dokumentasi.html          # Galeri Jurnal Lapangan & Unggah Foto Terverifikasi
│
├── guru/                         # PORTAL PENDIDIK & PEMBINA
│   ├── koordinator.html          # Monitoring 1.165 Siswa, Validasi Rute & Rekap Ekspedisi
│   └── fasilitator.html          # Rubrik Penilaian 4 Pilar, Evaluasi LKPD & Presensi Siswa
│
├── admin/                        # PORTAL ADMINISTRATOR IT
│   └── index.html                # Manajemen Akun Dapodik, Konfigurasi Sistem & Audit Log
│
├── js/                           # LOGIKA & PENYIMPANAN
│   ├── data-mock.js              # Jembatan Database Lokal Real-Time (LocalStorage Synchronizer)
│   └── core.js                   # Utilitas Autentikasi Sesi, Toast Notifikasi & Modal Lightbox
│
├── css/
│   └── style.css                 # Master Stylesheet, Animasi & Scrollbar Kustom
│
└── logo sponsor/                 # Logo Sponsor Resmi Kegiatan (1.png s.d. 6.png)
```

---

## 🚀 Panduan Menjalankan Secara Lokal

### Menggunakan Python HTTP Server:
```powershell
# Buka direktori proyek
cd "d:\Aplikasi Web AI\KOKULIKULER 2026\APP FINCESTEM"

# Jalankan server lokal
python -m http.server 8000
```
Lalu buka peramban Anda pada alamat:
[http://localhost:8000](http://localhost:8000)

---

## 🔑 Kredensial Demo Cepat (1-Click Instant Fill)

1. **Portal Siswa** (`siswa/index.html`):
   - **NISN**: `007261944`
   - **Password**: `Belitang2026!`
   - **Nama**: Anindya Putri Rahayu (XI MIPA 1, Kelompok 4)
2. **Portal Koordinator** (`guru/koordinator.html`):
   - **NIP**: `197508142000031002`
   - **Password**: `Koordinator2026!`
   - **Nama**: Drs. H. Suryanto, M.Pd.
3. **Portal Fasilitator** (`guru/fasilitator.html`):
   - **NIP**: `198203152008011005`
   - **Password**: `Fasilitator2026!`
   - **Nama**: Rahmat Hidayat, S.Pd., Gr.
4. **Portal Administrator** (`admin/index.html`):
   - **Username**: `admin_fincestem`
   - **Password**: `AdminBelitang2026!`

---

## 🏛️ Identitas Institusi
**SMA Negeri 1 Belitang**  
Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan  
Jl. M.P. Bangsa Raja No. 1001, Gumawang, Kec. Belitang, Kab. OKU Timur, Prov. Sumsel  
Tel/Faks: (0735) 450106 | Website: [www.sman1belitang.sch.id](http://www.sman1belitang.sch.id) | Email: sman1belitang@gmail.com | Kode Pos: 32182

© 2026 Kurikulum SMAN 1 Belitang. All Rights Reserved.
