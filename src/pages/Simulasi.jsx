import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, RotateCcw } from "lucide-react";
import Field from "../components/Field";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { Bintang } from "../components/Ornament";
import { hitungIpk, totalSks, hitungTarget, skalaMaks } from "../utils/hitung";
import { parseAngka, validasiSimulasi } from "../utils/validasi";
import { semestersType, pengaturanType } from "./propTypesUmum";

const PESAN = {
  aman: { icon: CheckCircle2, judul: "Target sudah aman", teks: "IPK-mu sudah melewati target. Cukup jaga nilai tetap stabil.", kelas: "emas" },
  mungkin: { icon: CheckCircle2, judul: "Target realistis", teks: "Dengan konsisten, target ini bisa kamu capai semester depan.", kelas: "emas" },
  berat: { icon: AlertTriangle, judul: "Target menantang", teks: "Hampir semua mata kuliah harus bernilai terbaik. Butuh usaha ekstra, tapi masih mungkin.", kelas: "rose" },
  "tidak-realistis": { icon: XCircle, judul: "Belum realistis dalam satu semester", teks: "", kelas: "anggur" },
};

export default function Simulasi({ semesters, pengaturan }) {
  const { bobot, targetIpk } = pengaturan;
  const skala = skalaMaks(bobot);
  const dariData = () => ({
    ipkLama: hitungIpk(semesters, bobot).toFixed(2),
    sksLama: String(totalSks(semesters.flatMap((s) => s.courses))),
    target: String(targetIpk),
    sksBaru: "20",
  });

  const [form, setForm] = useState(dariData);
  const [sentuh, setSentuh] = useState({});

  const ubah = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setSentuh({ ...sentuh, [k]: true });
  };

  const error = validasiSimulasi(form, skala);
  const valid = Object.keys(error).length === 0;
  const tampil = (k) => (sentuh[k] ? error[k] : "");

  const ipkLama = parseAngka(form.ipkLama);
  const sksLama = parseAngka(form.sksLama);
  const target = parseAngka(form.target);
  const sksBaru = parseAngka(form.sksBaru);
  const hasil = valid ? hitungTarget({ ipkLama, sksLama, target, sksBaru, skala }) : null;
  const pesan = hasil ? PESAN[hasil.status] : null;
  const Ikon = pesan?.icon;

  const teksTidakRealistis = () => {
    if (!hasil.semesterMinimal) return `Target setinggi ${target} tidak bisa dicapai kecuali semua nilaimu sempurna sejak awal.`;
    return `IPS yang dibutuhkan melebihi ${skala.toFixed(2)}. Jika tiap semester kamu ambil ${sksBaru} SKS dengan nilai sempurna, target tercapai dalam minimal ${hasil.semesterMinimal} semester.`;
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Simulasi target IPK</h1>
          <p className="lead">Berapa IPS yang kamu butuhkan semester depan untuk mencapai IPK impianmu?</p>
        </div>
      </div>

      <div className="sim">
        <section className="panel">
          <h2>Data kamu</h2>
          <div className="form form--col">
            <Field label="IPK saat ini" error={tampil("ipkLama")}>
              <input inputMode="decimal" value={form.ipkLama} onChange={ubah("ipkLama")} />
            </Field>
            <Field label="SKS yang sudah ditempuh" error={tampil("sksLama")}>
              <input inputMode="numeric" value={form.sksLama} onChange={ubah("sksLama")} />
            </Field>
            <Field label="Target IPK" error={tampil("target")}>
              <input inputMode="decimal" value={form.target} onChange={ubah("target")} />
            </Field>
            <Field label="SKS semester depan" error={tampil("sksBaru")}>
              <input inputMode="numeric" value={form.sksBaru} onChange={ubah("sksBaru")} />
            </Field>
          </div>
          <div className="sim__reset">
            <Button label="Pakai data saya" icon={RotateCcw} variant="soft" onClick={() => { setForm(dariData()); setSentuh({}); }} />
          </div>
          <p className="muted small">Nilai awal diambil dari semester yang sudah kamu isi. Boleh diubah untuk mencoba skenario lain.</p>
        </section>

        <section className="panel result">
          <Bintang ukuran={22} className="result__bintang" />
          <h2>Hasil</h2>
          {hasil ? (
            <>
              <div className="result__num">
                <strong>{hasil.dibutuhkan > 0 ? hasil.dibutuhkan.toFixed(2) : "0.00"}</strong>
                <span>IPS yang kamu butuhkan semester depan</span>
              </div>
              {hasil.status !== "aman" && (
                <ProgressBar
                  judul="Beban terhadap nilai sempurna"
                  persen={(hasil.dibutuhkan / skala) * 100}
                  nilaiLabel={`${Math.min(Math.round((hasil.dibutuhkan / skala) * 100), 999)}%`}
                />
              )}
              <div className={`notice notice--${pesan.kelas}`}>
                <Ikon size={20} />
                <div>
                  <h3>{pesan.judul}</h3>
                  <p>{hasil.status === "tidak-realistis" ? teksTidakRealistis() : pesan.teks}</p>
                </div>
              </div>
              <p className="muted small">Jika semester depan semua nilaimu sempurna, IPK tertinggi yang bisa dicapai adalah {hasil.ipkMaks.toFixed(2)}.</p>
            </>
          ) : (
            <p className="muted">Lengkapi data di sebelah kiri dengan angka yang valid untuk melihat hasilnya.</p>
          )}
        </section>
      </div>
    </>
  );
}

Simulasi.propTypes = { semesters: semestersType, pengaturan: pengaturanType };
