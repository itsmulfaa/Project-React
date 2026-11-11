import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Save, RotateCcw, Trash2 } from "lucide-react";
import Field from "../components/Field";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { parseAngka, validasiPengaturan } from "../utils/validasi";
import { pengaturanType } from "./propTypesUmum";

const keDraft = (p) => ({
  targetIpk: String(p.targetIpk),
  bobot: Object.fromEntries(Object.entries(p.bobot).map(([k, v]) => [k, String(v)])),
  predikat: p.predikat.map((x) => ({ min: String(x.min), label: x.label })),
  predikatBawah: p.predikatBawah,
});

export default function Pengaturan({ pengaturan, onSave, onResetPengaturan, onResetData }) {
  const [draft, setDraft] = useState(() => keDraft(pengaturan));
  const [error, setError] = useState({});
  const [tersimpan, setTersimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(null);

  useEffect(() => {
    setDraft(keDraft(pengaturan));
  }, [pengaturan]);

  useEffect(() => {
    if (!tersimpan) return undefined;
    const t = setTimeout(() => setTersimpan(false), 2500);
    return () => clearTimeout(t);
  }, [tersimpan]);

  const simpan = (e) => {
    e.preventDefault();
    const err = validasiPengaturan(draft);
    setError(err);
    if (Object.keys(err).length) return;
    onSave({
      targetIpk: parseAngka(draft.targetIpk),
      bobot: Object.fromEntries(Object.entries(draft.bobot).map(([k, v]) => [k, parseAngka(v)])),
      predikat: draft.predikat.map((x) => ({ min: parseAngka(x.min), label: x.label.trim() })),
      predikatBawah: draft.predikatBawah.trim(),
    });
    setTersimpan(true);
  };

  const ubahPred = (i, k) => (e) =>
    setDraft({ ...draft, predikat: draft.predikat.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)) });

  const jalankan = () => {
    if (konfirmasi === "data") onResetData();
    if (konfirmasi === "pengaturan") {
      onResetPengaturan();
      setError({});
    }
    setKonfirmasi(null);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Pengaturan</h1>
          <p className="lead">Sesuaikan bobot nilai dan predikat dengan aturan kampusmu.</p>
        </div>
      </div>

      <form onSubmit={simpan} noValidate className="stack">
        <section className="panel">
          <h2>Target IPK</h2>
          <div className="form">
            <Field label="Target yang ingin dicapai" error={error.targetIpk}>
              <input inputMode="decimal" value={draft.targetIpk} onChange={(e) => setDraft({ ...draft, targetIpk: e.target.value })} />
            </Field>
          </div>
        </section>

        <section className="panel">
          <h2>Bobot nilai</h2>
          <p className="muted small">Urut dari nilai tertinggi. Ubah angkanya bila kampusmu memakai bobot berbeda.</p>
          <div className="form grid-fields">
            {Object.keys(draft.bobot).map((k) => (
              <Field key={k} label={`Nilai ${k}`} error={error[`bobot.${k}`]}>
                <input inputMode="decimal" value={draft.bobot[k]} onChange={(e) => setDraft({ ...draft, bobot: { ...draft.bobot, [k]: e.target.value } })} />
              </Field>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Predikat kelulusan</h2>
          <p className="muted small">IPK dari batas ini ke atas mendapat predikat yang sesuai.</p>
          <div className="stack stack--tight">
            {draft.predikat.map((x, i) => (
              <div className="form" key={i}>
                <Field label="Batas IPK" error={error[`pred.${i}`]}>
                  <input inputMode="decimal" value={x.min} onChange={ubahPred(i, "min")} />
                </Field>
                <Field label="Nama predikat" grow>
                  <input value={x.label} onChange={ubahPred(i, "label")} />
                </Field>
              </div>
            ))}
            <Field label="Predikat di bawah batas terendah" error={error.predikatBawah}>
              <input value={draft.predikatBawah} onChange={(e) => setDraft({ ...draft, predikatBawah: e.target.value })} />
            </Field>
          </div>
        </section>

        <div className="save-bar">
          <Button type="submit" label="Simpan pengaturan" icon={Save} />
          {tersimpan && <span className="toast" role="status">Pengaturan tersimpan ✦</span>}
        </div>
      </form>

      <section className="panel panel--danger">
        <h2>Zona data</h2>
        <p className="muted">Tindakan di bawah ini tidak bisa dibatalkan.</p>
        <div className="hero__actions">
          <Button label="Kembalikan pengaturan awal" icon={RotateCcw} variant="soft" onClick={() => setKonfirmasi("pengaturan")} />
          <Button label="Reset semua data" icon={Trash2} variant="danger" onClick={() => setKonfirmasi("data")} />
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(konfirmasi)}
        judul={konfirmasi === "data" ? "Reset semua data?" : "Kembalikan pengaturan awal?"}
        teks={konfirmasi === "data" ? "Semua semester dan mata kuliah akan dihapus permanen dari browser ini." : "Bobot nilai, predikat, dan target akan kembali ke nilai awal."}
        labelYa={konfirmasi === "data" ? "Ya, reset semua" : "Ya, kembalikan"}
        onCancel={() => setKonfirmasi(null)}
        onConfirm={jalankan}
      />
    </>
  );
}

Pengaturan.propTypes = {
  pengaturan: pengaturanType,
  onSave: PropTypes.func.isRequired,
  onResetPengaturan: PropTypes.func.isRequired,
  onResetData: PropTypes.func.isRequired,
};
