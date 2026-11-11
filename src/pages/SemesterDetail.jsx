import { useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sigma } from "lucide-react";
import CourseForm from "../components/CourseForm";
import CourseItem from "../components/CourseItem";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import ProgressBar from "../components/ProgressBar";
import NotFound from "./NotFound";
import { hitungIps, totalSks, statusProgres, skalaMaks, daftarNilai } from "../utils/hitung";
import { semestersType, pengaturanType } from "./propTypesUmum";

export default function SemesterDetail({ semesters, pengaturan, onAddMk, onDeleteMk, onEditMk }) {
  const { id } = useParams();
  const [hapus, setHapus] = useState(null);
  const semester = semesters.find((s) => s.id === Number(id));

  if (!semester) return <NotFound pesan="Semester ini tidak ditemukan. Mungkin sudah dihapus." />;

  const { bobot, targetIpk } = pengaturan;
  const ips = hitungIps(semester.courses, bobot);
  const status = statusProgres(ips, targetIpk, semester.courses.length > 0);
  const semuaNama = semester.courses.map((m) => m.nama);

  return (
    <>
      <Link to="/semester" className="back"><ArrowLeft size={16} /> Semua semester</Link>
      <div className="page-head">
        <div>
          <h1 className="h-page">{semester.nama}</h1>
          <span className={`badge badge--${status.warna}`}>{status.label}</span>
        </div>
      </div>

      <section className="grid-3">
        <StatCard label="IPS semester ini" value={semester.courses.length ? ips.toFixed(2) : "-"} icon={Sigma} warna="anggur" />
        <StatCard label="Total SKS" value={totalSks(semester.courses)} icon={BookOpen} warna="rose" />
      </section>

      {semester.courses.length > 0 && (
        <section className="panel lift">
          <ProgressBar
            judul={`IPS dibanding target ${targetIpk.toFixed(2)}`}
            persen={(ips / targetIpk) * 100}
            nilaiLabel={`${Math.min(Math.round((ips / targetIpk) * 100), 100)}%`}
            hint={status.pesan}
          />
        </section>
      )}

      <section className="panel">
        <h2>Tambah mata kuliah</h2>
        <CourseForm onAdd={(mk) => onAddMk(semester.id, mk)} daftarNilai={daftarNilai(bobot)} namaLain={semuaNama} />
      </section>

      <section className="panel">
        <h2>Daftar mata kuliah</h2>
        {semester.courses.length === 0 ? (
          <EmptyState judul="Belum ada mata kuliah" teks="Mulai dari satu mata kuliah. Small progress is still progress." />
        ) : (
          <ul className="courses">
            {semester.courses.map((mk) => (
              <CourseItem
                key={mk.id}
                nama={mk.nama}
                sks={mk.sks}
                nilai={mk.nilai}
                bobot={bobot}
                namaLain={semester.courses.filter((m) => m.id !== mk.id).map((m) => m.nama)}
                onSave={(data) => onEditMk(semester.id, mk.id, data)}
                onDelete={() => setHapus(mk)}
              />
            ))}
          </ul>
        )}
      </section>

      <ConfirmDialog
        open={Boolean(hapus)}
        judul={`Hapus ${hapus?.nama ?? "mata kuliah"}?`}
        teks="Mata kuliah ini akan dihapus dari semester dan IPS dihitung ulang."
        onCancel={() => setHapus(null)}
        onConfirm={() => {
          onDeleteMk(semester.id, hapus.id);
          setHapus(null);
        }}
      />
    </>
  );
}

SemesterDetail.propTypes = {
  semesters: semestersType,
  pengaturan: pengaturanType,
  onAddMk: PropTypes.func.isRequired,
  onDeleteMk: PropTypes.func.isRequired,
  onEditMk: PropTypes.func.isRequired,
};
