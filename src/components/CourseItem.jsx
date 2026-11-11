import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2, Pencil, Check, X } from "lucide-react";
import Field from "./Field";
import { validasiMk } from "../utils/validasi";

export default function CourseItem({ nama, sks, nilai, bobot, namaLain, onSave, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState({ nama, sks: String(sks), nilai });
  const [error, setError] = useState({});
  const daftar = Object.keys(bobot);

  const mulai = () => {
    setDraft({ nama, sks: String(sks), nilai });
    setError({});
    setEdit(true);
  };

  const simpan = (e) => {
    e.preventDefault();
    const err = validasiMk(draft, namaLain, daftar);
    setError(err);
    if (Object.keys(err).length) return;
    onSave({ nama: draft.nama.trim(), sks: Number(draft.sks), nilai: draft.nilai });
    setEdit(false);
  };

  const ubah = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  if (edit) {
    return (
      <li className="course course--edit">
        <form className="form" onSubmit={simpan} noValidate>
          <Field label="Nama" grow error={error.nama}>
            <input value={draft.nama} onChange={ubah("nama")} maxLength={80} autoFocus />
          </Field>
          <Field label="SKS" error={error.sks}>
            <select value={draft.sks} onChange={ubah("sks")}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Nilai" error={error.nilai}>
            <select value={draft.nilai} onChange={ubah("nilai")}>
              {daftar.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <div className="row-actions">
            <button type="submit" className="icon-btn icon-btn--ok" aria-label="Simpan perubahan"><Check size={18} /></button>
            <button type="button" className="icon-btn" onClick={() => setEdit(false)} aria-label="Batal edit"><X size={18} /></button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="course">
      <div className="course__info">
        <strong>{nama}</strong>
        <span className="muted">{sks} SKS, bobot {((bobot[nilai] ?? 0) * sks).toFixed(1)}</span>
      </div>
      <span className="course__grade">{nilai}</span>
      <button className="icon-btn" onClick={mulai} aria-label={`Edit ${nama}`}><Pencil size={16} /></button>
      <button className="icon-btn icon-btn--danger" onClick={onDelete} aria-label={`Hapus ${nama}`}><Trash2 size={16} /></button>
    </li>
  );
}

CourseItem.propTypes = {
  nama: PropTypes.string.isRequired,
  sks: PropTypes.number.isRequired,
  nilai: PropTypes.string.isRequired,
  bobot: PropTypes.objectOf(PropTypes.number).isRequired,
  namaLain: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
