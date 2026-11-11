import { useState } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import SemesterCard from "../components/SemesterCard";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import Button from "../components/Button";
import { hitungIps, totalSks, statusProgres } from "../utils/hitung";
import { semestersType, pengaturanType } from "./propTypesUmum";

export default function Semester({ semesters, pengaturan, onAdd, onDelete }) {
  const [hapus, setHapus] = useState(null);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Semester</h1>
          <p className="lead">Setiap semester adalah satu bab dari perjalananmu.</p>
        </div>
        <Button label="Tambah semester" icon={Plus} onClick={onAdd} />
      </div>

      {semesters.length === 0 ? (
        <section className="panel">
          <EmptyState judul="Belum ada semester" teks="Mulai perjalananmu dengan menambahkan semester pertama.">
            <Button label="Tambah semester" icon={Plus} onClick={onAdd} />
          </EmptyState>
        </section>
      ) : (
        <div className="stack">
          {semesters.map((s) => {
            const ips = hitungIps(s.courses, pengaturan.bobot);
            return (
              <SemesterCard
                key={s.id}
                id={s.id}
                title={s.nama}
                ips={ips}
                totalSks={totalSks(s.courses)}
                jumlahMk={s.courses.length}
                status={statusProgres(ips, pengaturan.targetIpk, s.courses.length > 0)}
                onDelete={() => setHapus(s)}
              />
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(hapus)}
        judul={`Hapus ${hapus?.nama ?? "semester"}?`}
        teks={`Semua mata kuliah di dalamnya (${hapus?.courses.length ?? 0}) ikut terhapus dan tidak bisa dikembalikan.`}
        onCancel={() => setHapus(null)}
        onConfirm={() => {
          onDelete(hapus.id);
          setHapus(null);
        }}
      />
    </>
  );
}

Semester.propTypes = {
  semesters: semestersType,
  pengaturan: pengaturanType,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
