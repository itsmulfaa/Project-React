import { Link } from "react-router-dom";
import { Award, BookOpen, Calendar, Layers, Target } from "lucide-react";
import StatCard from "../components/StatCard";
import TrendBars from "../components/TrendBars";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import { Bunga, Bintang } from "../components/Ornament";
import { hitungIpk, hitungIps, totalSks, predikat, statusProgres, skalaMaks } from "../utils/hitung";
import { semestersType, pengaturanType } from "./propTypesUmum";

export default function Home({ semesters, pengaturan }) {
  const { bobot, targetIpk } = pengaturan;
  const skala = skalaMaks(bobot);
  const semuaMk = semesters.flatMap((s) => s.courses);
  const ipk = hitungIpk(semesters, bobot);
  const adaData = semuaMk.length > 0;
  const status = statusProgres(ipk, targetIpk, adaData);
  const p = predikat(ipk, pengaturan);
  const tren = semesters.map((s) => ({ id: s.id, nama: s.nama, ips: hitungIps(s.courses, bobot) }));
  const persenTarget = (ipk / targetIpk) * 100;
  const sisa = Math.max(targetIpk - ipk, 0);

  return (
    <>
      <section className="hero">
        <Bunga ukuran={64} className="hero__bunga hero__bunga--a" />
        <Bintang ukuran={26} className="hero__bintang hero__bintang--a" />
        <Bintang ukuran={14} className="hero__bintang hero__bintang--b" />
        <Bunga ukuran={30} className="hero__bunga hero__bunga--b" />
        <div className="hero__text">
          <p className="hero__eyebrow">Your academic journey <Bintang ukuran={12} /></p>
          <h1>
            Keep growing,
            <em>one grade at a time.</em>
          </h1>
          <p className="hero__lead">Pantau perkembangan akademikmu di sini.</p>
          <div className="hero__card">
            <span className="hero__card-label">IPK saat ini</span>
            <strong>{adaData ? ipk.toFixed(2) : "-"}</strong>
            <span className={`badge badge--${status.warna}`}>{status.label}</span>
            <span className="hero__card-note">{status.pesan}</span>
          </div>
        </div>
        <div className="hero__side">
          <p className="hero__keep">Keep it up!</p>
          <span className="hero__predikat">{p.label}</span>
          <Link to="/simulasi"><Button label="Coba simulasi target" icon={Target} variant="gold" /></Link>
        </div>
      </section>

      <section className="grid-3">
        <StatCard label="Total SKS" value={totalSks(semuaMk)} icon={BookOpen} warna="anggur" />
        <StatCard label="Semester" value={semesters.length} icon={Calendar} warna="rose" />
        <StatCard label="Mata kuliah" value={semuaMk.length} icon={Award} warna="emas" />
      </section>

      <section className="panel lift">
        <ProgressBar
          judul="Academic progress"
          persen={(ipk / skala) * 100}
          nilaiLabel={`${Math.round((ipk / skala) * 100)}%`}
          hint="A little progress every day adds up."
        />
        <div className="panel__gap" />
        <ProgressBar
          judul={`Menuju target IPK ${targetIpk.toFixed(2)}`}
          persen={persenTarget}
          nilaiLabel={`${Math.min(Math.round(persenTarget), 100)}%`}
          hint={!adaData ? "Isi nilai pertamamu untuk mulai melacak target." : sisa === 0 ? "Target tercapai. Pertahankan ya!" : `Tinggal ${sisa.toFixed(2)} poin lagi. Kamu bisa!`}
        />
      </section>

      <section className="panel lift">
        <div className="panel__head">
          <h2>Perkembangan IPS</h2>
          <Layers size={20} className="muted" />
        </div>
        {tren.length > 0 ? (
          <TrendBars data={tren} skala={skala} />
        ) : (
          <p className="muted">Tambahkan semester pertama untuk melihat grafiknya.</p>
        )}
      </section>
    </>
  );
}

Home.propTypes = { semesters: semestersType, pengaturan: pengaturanType };