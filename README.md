
#Gradie. — Kalkulator IPK

Gradie. merupakan aplikasi web kalkulator IPK yang dikembangkan untuk membantu mahasiswa mencatat nilai mata kuliah, menghitung Indeks Prestasi Semester (IPS) dan Indeks Prestasi Kumulatif (IPK), serta merencanakan pencapaian target IPK.

Aplikasi ini dibuat menggunakan React sebagai proyek praktikum mata kuliah **Desain dan Pemrograman Web (DPW)**.


✨Fitur Utama
1. Dashboard
- Menampilkan IPK saat ini.
- Menampilkan total SKS, jumlah semester, dan jumlah mata kuliah.
- Menampilkan progress akademik dan perkembangan IPS setiap semester.
- Menampilkan status perkembangan akademik.

2. Manajemen Semester
- Menambahkan semester baru.
- Menampilkan daftar semester beserta IPS dan total SKS.
- Menghapus semester dengan konfirmasi.

3. Manajemen Mata Kuliah
- Menambahkan mata kuliah berdasarkan nama, jumlah SKS, dan nilai.
- Mengedit informasi mata kuliah.
- Menghapus mata kuliah dengan konfirmasi.
- Melakukan validasi input untuk mencegah data yang tidak sesuai.

4. Simulasi Target IPK
- Menghitung IPS yang dibutuhkan untuk mencapai target IPK.
- Menggunakan data akademik yang sudah tersimpan.
- Memungkinkan pengguna mengubah nilai IPK, SKS, dan target untuk mencoba berbagai skenario.
- Menampilkan tingkat kemungkinan pencapaian target.

5. Rekap Hasil Studi
- Menampilkan rekap nilai seluruh semester.
- Menampilkan IPK, IPS, total SKS, dan rincian mata kuliah.
- Menyimpan rekap hasil studi dalam format PDF melalui fitur cetak browser.

6. Pengaturan
- Mengubah target IPK.
- Menyesuaikan bobot nilai sesuai ketentuan kampus.
- Mengatur batas dan nama predikat kelulusan.
- Mengembalikan pengaturan ke nilai awal.
- Mereset seluruh data akademik dengan konfirmasi.

🛠️ Teknologi yang Digunakan
- React 18 — membangun antarmuka menggunakan komponen.
- Vite — sebagai development server dan build tool.
- React Router DOM — mengatur navigasi dan perpindahan halaman.
- PropTypes — memvalidasi tipe props pada komponen.
- Lucide React — menyediakan ikon pada antarmuka.
- CSS — mengatur tampilan, tata letak, dan responsivitas aplikasi.
- LocalStorage — menyimpan data akademik dan pengaturan pada browser.


📚 Materi yang Diterapkan
Beberapa konsep React dan JavaScript yang diterapkan dalam pengembangan aplikasi ini meliputi:
- **Component:** membagi antarmuka menjadi komponen-komponen yang dapat digunakan kembali.
- **Props:** mengirimkan data dan fungsi antar-komponen.
- **State (`useState`):** mengelola perubahan data dan tampilan aplikasi.
- **Effect (`useEffect`):** menjalankan efek samping, seperti menyimpan data ke LocalStorage.
- **Event Handling:** menangani interaksi pengguna melalui `onClick`, `onChange`, dan `onSubmit`.
- **Conditional Rendering:** menampilkan komponen berdasarkan kondisi tertentu.
- **List Rendering:** menampilkan data semester dan mata kuliah menggunakan `.map()`.
- **React Router:** mengatur navigasi antarhalaman.
- **Link dan NavLink:** menyediakan navigasi menuju halaman lain.
- **Dynamic Route:** menggunakan parameter URL seperti `/semester/:id`.
- **Wildcard Route:** menangani halaman yang tidak ditemukan melalui halaman 404.
- **Custom Hook:** membuat hook `useLocalStorage` untuk mengelola penyimpanan data.
- **PropTypes:** memeriksa tipe data props yang diterima komponen.


📁 Struktur Folder
src/
├── components/
│   ├── Button.jsx
│   ├── ConfirmDialog.jsx
│   ├── CourseForm.jsx
│   ├── CourseItem.jsx
│   ├── EmptyState.jsx
│   ├── Field.jsx
│   ├── Navbar.jsx
│   ├── Ornament.jsx
│   ├── ProgressBar.jsx
│   ├── SemesterCard.jsx
│   ├── StatCard.jsx
│   └── TrendBars.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Semester.jsx
│   ├── SemesterDetail.jsx
│   ├── Simulasi.jsx
│   ├── Rekap.jsx
│   ├── Pengaturan.jsx
│   ├── NotFound.jsx
│   └── propTypesUmum.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── data/
│   └── default.js
│
├── utils/
│   ├── hitung.js
│   └── validasi.js
│
├── App.jsx
├── main.jsx
└── index.css


🚀 Cara Menjalankan Proyek
Pastikan Node.js dan npm sudah terpasang pada komputer.
1. Buka folder proyek melalui Visual Studio Code.
2. Buka terminal pada folder proyek.
3. Jalankan perintah berikut untuk memasang dependencies:
    npm install
4. Jalankan aplikasi dalam mode pengembangan:
    npm run dev
5. Buka alamat lokal yang muncul pada terminal melalui browser.
   Untuk membuat versi build aplikasi, jalankan:
    npm run build


🧮 Rumus Perhitungan
Indeks Prestasi Semester (IPS) dan Indeks Prestasi Kumulatif (IPK):
- IPS/IPK = total (bobot nilai x SKS) / total SKS

IPS yang dibutuhkan untuk mencapai target IPK:
- IPS dibutuhkan = (target x (SKS lama + SKS baru) - IPK lama x SKS lama) / SKS baru


💾 Penyimpanan Data
Gradie. menggunakan LocalStorage pada browser untuk menyimpan data semester, mata kuliah, dan pengaturan pengguna. Dengan demikian, data tetap tersedia ketika halaman dimuat ulang pada browser yang sama.
Data disimpan secara lokal pada perangkat pengguna dan tidak menggunakan database atau server backend.

---

*Gradie. — Small progress is still progress. ✦*

