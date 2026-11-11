import { useState } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import Button from "./Button";
import Field from "./Field";
import { validasiMk } from "../utils/validasi";

export default function CourseForm({ onAdd, daftarNilai, namaLain }) {
  const [form, setForm] = useState({ nama: "", sks: "3", nilai: daftarNilai[0] });
  const [error, setError] = useState({});

  const ubah = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const kirim = (e) => {
    e.preventDefault();
    const err = validasiMk(form, namaLain, daftarNilai);
    setError(err);
    if (Object.keys(err).length) return;
    onAdd({ nama: form.nama.trim(), sks: Number(form.sks), nilai: form.nilai });
    setForm({ ...form, nama: "" });
  };

  return (
    <form className="form" onSubmit={kirim} noValidate>
      <Field label="Nama mata kuliah" grow error={error.nama}>
        <input value={form.nama} onChange={ubah("nama")} placeholder="Contoh: Pemrograman Web" maxLength={80} />
      </Field>
      <Field label="SKS" error={error.sks}>
        <select value={form.sks} onChange={ubah("sks")}>
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
        </select>
      </Field>
      <Field label="Nilai" error={error.nilai}>
        <select value={form.nilai} onChange={ubah("nilai")}>
          {daftarNilai.map((n) => <option key={n}>{n}</option>)}
        </select>
      </Field>
      <Button type="submit" label="Tambah" icon={Plus} />
    </form>
  );
}

CourseForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  daftarNilai: PropTypes.arrayOf(PropTypes.string).isRequired,
  namaLain: PropTypes.arrayOf(PropTypes.string).isRequired,
};
