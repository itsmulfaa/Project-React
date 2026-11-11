const WARNA_PREDIKAT = ["emas", "anggur", "rose"];

export const daftarNilai = (bobot) => Object.keys(bobot);
export const skalaMaks = (bobot) => Math.max(...Object.values(bobot));

export function totalSks(courses) {
  return courses.reduce((jumlah, mk) => jumlah + mk.sks, 0);
}

export function hitungIps(courses, bobot) {
  const sks = totalSks(courses);
  if (sks === 0) return 0;
  const total = courses.reduce((jumlah, mk) => jumlah + (bobot[mk.nilai] ?? 0) * mk.sks, 0);
  return total / sks;
}

export function hitungIpk(semesters, bobot) {
  return hitungIps(semesters.flatMap((s) => s.courses), bobot);
}

/** Predikat kelulusan mengikuti aturan kampus di pengaturan. */
export function predikat(ipk, pengaturan) {
  if (ipk <= 0) return { label: "Belum ada data", warna: "abu" };
  const urut = [...pengaturan.predikat].sort((a, b) => b.min - a.min);
  const i = urut.findIndex((p) => ipk + 1e-9 >= p.min);
  if (i >= 0) return { label: urut[i].label, warna: WARNA_PREDIKAT[i] ?? "rose" };
  return { label: pengaturan.predikatBawah, warna: "abu" };
}

/** Badge penyemangat berdasarkan jarak ke target. */
export function statusProgres(nilai, target, adaData = true) {
  if (!adaData) return { label: "Let's Start", warna: "rose", pesan: "Small progress is still progress." };
  if (nilai + 1e-9 >= target) return { label: "On Track", warna: "emas", pesan: "Great job, keep it up!" };
  if (nilai >= target - 0.3) return { label: "Great Progress", warna: "anggur", pesan: "Great progress ♡" };
  return { label: "Keep Going", warna: "rose", pesan: "Small progress is still progress." };
}

/**
 * IPS yang dibutuhkan semester depan agar IPK mencapai target.
 * (target * (SKS lama + SKS baru) - IPK lama * SKS lama) / SKS baru
 */
export function hitungTarget({ ipkLama, sksLama, target, sksBaru, skala }) {
  const total = sksLama + sksBaru;
  const dibutuhkan = Math.round(((target * total - ipkLama * sksLama) / sksBaru) * 1e4) / 1e4;
  const ipkMaks = (ipkLama * sksLama + skala * sksBaru) / total;

  let status = "mungkin";
  if (dibutuhkan <= 0) status = "aman";
  else if (dibutuhkan > skala) status = "tidak-realistis";
  else if (dibutuhkan >= skala - 0.3) status = "berat";

  // Semester minimal bila tiap semester ambil sksBaru dan nilainya sempurna.
  let semesterMinimal = null;
  if (status === "tidak-realistis" && target < skala) {
    semesterMinimal = Math.max(2, Math.ceil((sksLama * (target - ipkLama)) / (sksBaru * (skala - target))));
  }
  return { dibutuhkan, ipkMaks, status, semesterMinimal };
}
