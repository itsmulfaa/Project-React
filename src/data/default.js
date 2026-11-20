// Pengaturan awal. Semua nilai ini bisa diubah dari halaman Pengaturan.
export const DEFAULT_PENGATURAN = {
  targetIpk: 3.5,
  bobot: {
    A: 4.00,
    "A-": 3.75,
    "B+": 3.50,
    B: 3.00,
    "B-": 2.75,
    "C+": 2.50,
    C: 2.00,
    D: 1.00,
    E: 0.00,
    T: 0.00,
  },
  // Urut dari batas tertinggi. IPK di bawah batas terakhir memakai predikatBawah.
  predikat: [
    { min: 3.5, label: "Dengan Pujian" },
    { min: 3.0, label: "Sangat Memuaskan" },
    { min: 2.5, label: "Memuaskan" },
  ],
  predikatBawah: "Perlu Ditingkatkan",
};

export const DATA_AWAL = [
  {
    id: 1,
    nama: "Semester 1",
    courses: [
      { id: 101, nama: "Pemrograman Dasar", sks: 3, nilai: "A" },
      { id: 102, nama: "Matematika Diskrit", sks: 3, nilai: "B+" },
      { id: 103, nama: "Pengantar Teknologi Informasi", sks: 2, nilai: "A" },
      { id: 104, nama: "Bahasa Inggris", sks: 2, nilai: "B" },
    ],
  },
  {
    id: 2,
    nama: "Semester 2",
    courses: [
      { id: 201, nama: "Basis Data", sks: 3, nilai: "A" },
      { id: 202, nama: "Struktur Data", sks: 3, nilai: "B" },
      { id: 203, nama: "Desain Antarmuka Web", sks: 3, nilai: "A" },
      { id: 204, nama: "Statistika", sks: 2, nilai: "C+" },
    ],
  },
];
