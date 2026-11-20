import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
} from "lucide-react";

import Field from "../components/Field";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { Bintang } from "../components/Ornament";

import {
  hitungIpk,
  totalSks,
  hitungTarget,
  hitungTargetLulus,
  skalaMaks,
} from "../utils/hitung";

import {
  parseAngka,
  validasiSimulasi,
} from "../utils/validasi";

import {
  semestersType,
  pengaturanType,
} from "./propTypesUmum";

const PESAN = {
  aman: {
    icon: CheckCircle2,
    judul: "Target sudah aman",
    teks: "IPK-mu sudah melewati target. Pertahankan nilai dengan baik.",
    kelas: "emas",
  },
  mungkin: {
    icon: CheckCircle2,
    judul: "Target realistis",
    teks: "Target ini masih bisa dicapai dengan konsisten.",
    kelas: "emas",
  },
  berat: {
    icon: AlertTriangle,
    judul: "Target menantang",
    teks: "Kamu membutuhkan nilai yang tinggi untuk mencapai target.",
    kelas: "rose",
  },
  "tidak-realistis": {
    icon: XCircle,
    judul: "Target belum realistis",
    teks: "Nilai yang dibutuhkan melebihi skala nilai maksimal.",
    kelas: "anggur",
  },
};

export default function Simulasi({ semesters, pengaturan }) {
  const { bobot, targetIpk } = pengaturan;

  const skala = skalaMaks(bobot);
  const totalSksLulus = pengaturan.totalSksLulus ?? 144;

  const semuaMk = semesters.flatMap((s) => s.courses);

  const dariData = () => ({
    ipkLama: hitungIpk(semesters, bobot).toFixed(2),
    sksLama: String(totalSks(semuaMk)),
    target: String(targetIpk),
    sksBaru: "20",
  });

  const [mode, setMode] = useState("semester");
  const [form, setForm] = useState(dariData);
  const [sentuh, setSentuh] = useState({});

  const ubah = (k) => (e) => {
    setForm({
      ...form,
      [k]: e.target.value,
    });

    setSentuh({
      ...sentuh,
      [k]: true,
    });
  };

  const error = validasiSimulasi(form, skala);
  const valid = Object.keys(error).length === 0;

  const tampil = (k) => (sentuh[k] ? error[k] : "");

  const ipkLama = parseAngka(form.ipkLama);
  const sksLama = parseAngka(form.sksLama);
  const target = parseAngka(form.target);
  const sksBaru = parseAngka(form.sksBaru);

  const hasilSemester = valid
    ? hitungTarget({
        ipkLama,
        sksLama,
        target,
        sksBaru,
        skala,
      })
    : null;

  const hasilLulus = valid
    ? hitungTargetLulus({
        ipkLama,
        sksLama,
        target,
        totalSksLulus,
        skala,
      })
    : null;

  const hasil =
    mode === "semester" ? hasilSemester : hasilLulus;

  const pesan =
    hasil && hasil.status !== "selesai"
      ? PESAN[hasil.status]
      : null;

  const Ikon = pesan?.icon;

  const resetForm = () => {
    setForm(dariData());
    setSentuh({});
  };

  const gantiMode = (e) => {
    setMode(e.target.value);
    setForm(dariData());
    setSentuh({});
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Simulasi target IPK</h1>
          <p className="lead">
            Rencanakan pencapaian IPK-mu untuk semester depan
            maupun sampai kelulusan.
          </p>
        </div>
      </div>

      <div className="sim">
        <section className="panel">
          <h2>Jenis Simulasi</h2>

          <Field label="Pilih simulasi">
            <select value={mode} onChange={gantiMode}>
              <option value="semester">
                Semester Berikutnya
              </option>
              <option value="lulus">
                Sampai Lulus
              </option>
            </select>
          </Field>

          <div className="panel__gap" />

          <h2>Data Kamu</h2>

          <div className="form form--col">
            <Field
              label="IPK saat ini"
              error={tampil("ipkLama")}
            >
              <input
                inputMode="decimal"
                value={form.ipkLama}
                onChange={ubah("ipkLama")}
              />
            </Field>

            <Field
              label="SKS yang sudah ditempuh"
              error={tampil("sksLama")}
            >
              <input
                inputMode="numeric"
                value={form.sksLama}
                onChange={ubah("sksLama")}
              />
            </Field>

            <Field
              label="Target IPK"
              error={tampil("target")}
            >
              <input
                inputMode="decimal"
                value={form.target}
                onChange={ubah("target")}
              />
            </Field>

            {mode === "semester" && (
              <Field
                label="SKS semester depan"
                error={tampil("sksBaru")}
              >
                <input
                  inputMode="numeric"
                  value={form.sksBaru}
                  onChange={ubah("sksBaru")}
                />
              </Field>
            )}

            {mode === "lulus" && (
              <Field label="Target total SKS kelulusan">
                <input
                  value={totalSksLulus}
                  readOnly
                />
              </Field>
            )}
          </div>

          <div className="sim__reset">
            <Button
              label="Pakai data saya"
              icon={RotateCcw}
              variant="soft"
              onClick={resetForm}
            />
          </div>

          <p className="muted small">
            Nilai awal diambil dari data semester yang sudah
            kamu masukkan. Kamu tetap bisa mengubah data
            untuk mencoba skenario lain.
          </p>
        </section>

        <section className="panel result">
          <Bintang
            ukuran={22}
            className="result__bintang"
          />

          <h2>Hasil Simulasi</h2>

          {!valid ? (
            <p className="muted">
              Lengkapi data dengan angka yang valid untuk
              melihat hasil simulasi.
            </p>
          ) : mode === "semester" ? (
            <>
              <div className="result__num">
                <strong>
                  {hasilSemester.dibutuhkan > 0
                    ? hasilSemester.dibutuhkan.toFixed(2)
                    : "0.00"}
                </strong>

                <span>
                  IPS yang dibutuhkan semester depan
                </span>
              </div>

              {hasilSemester.status !== "aman" && (
                <ProgressBar
                  judul="Beban terhadap nilai sempurna"
                  persen={
                    (hasilSemester.dibutuhkan / skala) * 100
                  }
                  nilaiLabel={`${Math.round(
                    (hasilSemester.dibutuhkan / skala) * 100
                  )}%`}
                />
              )}

              <div
                className={`notice notice--${pesan.kelas}`}
              >
                <Ikon size={20} />
                <div>
                  <h3>{pesan.judul}</h3>
                  <p>
                    {hasilSemester.status ===
                    "tidak-realistis"
                      ? `IPS yang dibutuhkan melebihi batas maksimal ${skala.toFixed(
                          2
                        )}.`
                      : pesan.teks}
                  </p>
                </div>
              </div>

              <p className="muted small">
                IPK tertinggi yang bisa dicapai semester depan
                jika semua nilai sempurna adalah{" "}
                {hasilSemester.ipkMaks.toFixed(2)}.
              </p>
            </>
          ) : hasilLulus.status === "selesai" ? (
            <div className="notice notice--emas">
              <CheckCircle2 size={20} />
              <div>
                <h3>Target SKS sudah tercapai</h3>
                <p>
                  SKS yang tercatat sudah mencapai atau
                  melebihi target kelulusan. Tidak ada sisa
                  SKS untuk disimulasikan.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="result__num">
                <strong>
                  {hasilLulus.dibutuhkan > 0
                    ? hasilLulus.dibutuhkan.toFixed(2)
                    : "0.00"}
                </strong>

                <span>
                  Rata-rata IPK yang dibutuhkan dari sisa SKS
                </span>
              </div>

              <ProgressBar
                judul="Beban terhadap nilai sempurna"
                persen={
                  (hasilLulus.dibutuhkan / skala) * 100
                }
                nilaiLabel={`${Math.round(
                  (hasilLulus.dibutuhkan / skala) * 100
                )}%`}
              />

              <div
                className={`notice notice--${pesan.kelas}`}
              >
                <Ikon size={20} />
                <div>
                  <h3>{pesan.judul}</h3>
                  <p>
                    {pesan.teks}
                  </p>
                </div>
              </div>

              <p className="muted small">
                Sisa SKS: {hasilLulus.sisa} SKS. IPK tertinggi
                yang mungkin dicapai saat lulus adalah{" "}
                {hasilLulus.ipkMaks.toFixed(2)}.
              </p>
            </>
          )}
        </section>
      </div>
    </>
  );
}

Simulasi.propTypes = {
  semesters: semestersType,
  pengaturan: pengaturanType,
};