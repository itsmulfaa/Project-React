export const parseAngka = (v) => (String(v).trim() === "" ? NaN : Number(String(v).trim().replace(",", ".")));

export function validasiMk({ nama, sks, nilai }, namaLain, daftar) {
  const e = {};
  const n = String(nama).trim();
  if (!n) e.nama = "Nama mata kuliah wajib diisi.";
  else if (n.length < 3) e.nama = "Nama minimal 3 karakter.";
  else if (n.length > 60) e.nama = "Nama maksimal 60 karakter.";
  else if (namaLain.some((x) => x.toLowerCase() === n.toLowerCase())) e.nama = "Mata kuliah ini sudah ada di semester ini.";
  const s = Number(sks);
  if (!Number.isInteger(s) || s < 1 || s > 6) e.sks = "SKS harus 1 sampai 6.";
  if (!daftar.includes(nilai)) e.nilai = "Pilih nilai yang tersedia.";
  return e;
}

export function validasiSimulasi(f, skala) {
  const e = {};
  const ipk = parseAngka(f.ipkLama);
  const sl = parseAngka(f.sksLama);
  const t = parseAngka(f.target);
  const sb = parseAngka(f.sksBaru);
  if (Number.isNaN(ipk)) e.ipkLama = "Isi dengan angka, misalnya 3.25.";
  else if (ipk < 0 || ipk > skala) e.ipkLama = `IPK harus antara 0 dan ${skala}.`;
  if (!Number.isInteger(sl) || sl < 0) e.sksLama = "Isi dengan bilangan bulat 0 atau lebih.";
  if (Number.isNaN(t)) e.target = "Isi dengan angka, misalnya 3.50.";
  else if (t <= 0 || t > skala) e.target = `Target harus di atas 0 dan maksimal ${skala}.`;
  if (!Number.isInteger(sb) || sb < 1 || sb > 40) e.sksBaru = "SKS semester depan harus 1 sampai 40.";
  return e;
}

export function validasiPengaturan(d) {
  const e = {};
  const nilai = Object.keys(d.bobot);
  let sebelumnya = Infinity;
  nilai.forEach((k) => {
    const b = parseAngka(d.bobot[k]);
    if (Number.isNaN(b) || b < 0 || b > 4) e[`bobot.${k}`] = "Isi angka 0 sampai 4.";
    else if (b > sebelumnya) e[`bobot.${k}`] = "Tidak boleh lebih besar dari nilai di atasnya.";
    else sebelumnya = b;
  });
  const skala = Math.max(...nilai.map((k) => parseAngka(d.bobot[k])).filter((x) => !Number.isNaN(x)), 0);
  const t = parseAngka(d.targetIpk);
  if (Number.isNaN(t) || t <= 0 || t > (skala || 4)) e.targetIpk = `Target harus di atas 0 dan maksimal ${skala || 4}.`;
  let batas = Infinity;
  d.predikat.forEach((p, i) => {
    const m = parseAngka(p.min);
    if (!p.label.trim()) e[`pred.${i}`] = "Nama predikat wajib diisi.";
    else if (Number.isNaN(m) || m <= 0 || m > (skala || 4)) e[`pred.${i}`] = "Batas IPK tidak valid.";
    else if (m >= batas) e[`pred.${i}`] = "Batas harus lebih kecil dari predikat di atasnya.";
    else batas = m;
  });
  if (!d.predikatBawah.trim()) e.predikatBawah = "Nama predikat wajib diisi.";
  return e;
}
