import { Printer } from "lucide-react";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { hitungIpk, hitungIps, totalSks, predikat } from "../utils/hitung";
import { semestersType, pengaturanType } from "./propTypesUmum";

export default function Rekap({ semesters, pengaturan }) {
  const { bobot } = pengaturan;
  const ipk = hitungIpk(semesters, bobot);
  const semuaMk = semesters.flatMap((s) => s.courses);
  const p = predikat(ipk, pengaturan);
  const tanggal = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <div className="page-head no-print">
        <div>
          <h1 className="h-page">Rekap hasil studi</h1>
          <p className="lead">Pada dialog cetak, pilih &quot;Save as PDF&quot; sebagai printer untuk menyimpan PDF.</p>
        </div>
        <Button label="Unduh PDF" icon={Printer} onClick={() => window.print()} disabled={semesters.length === 0} />
      </div>

      {semesters.length === 0 ? (
        <section className="panel no-print">
          <EmptyState judul="Belum ada yang direkap" teks="Tambahkan semester dan mata kuliah dulu, lalu kembali ke sini." />
        </section>
      ) : (
        <article className="rekap panel">
          <header className="rekap__head">
            <div>
              <h2>Rekap Hasil Studi</h2>
              <p className="muted">Dibuat pada {tanggal} lewat Gradie.</p>
            </div>
            <div className="rekap__ipk">
              <strong>{ipk.toFixed(2)}</strong>
              <span>IPK, {p.label}</span>
              <span>{totalSks(semuaMk)} SKS</span>
            </div>
          </header>

          {semesters.map((s) => (
            <section key={s.id} className="rekap__sem">
              <h3>{s.nama} <span className="muted">IPS {hitungIps(s.courses, bobot).toFixed(2)}, {totalSks(s.courses)} SKS</span></h3>
              {s.courses.length === 0 ? (
                <p className="muted">Belum ada mata kuliah.</p>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>Mata kuliah</th><th>SKS</th><th>Nilai</th><th>Bobot x SKS</th></tr>
                    </thead>
                    <tbody>
                      {s.courses.map((mk) => (
                        <tr key={mk.id}>
                          <td>{mk.nama}</td><td>{mk.sks}</td><td>{mk.nilai}</td><td>{((bobot[mk.nilai] ?? 0) * mk.sks).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </article>
      )}
    </>
  );
}

Rekap.propTypes = { semesters: semestersType, pengaturan: pengaturanType };
