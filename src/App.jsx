import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Semester from "./pages/Semester";
import SemesterDetail from "./pages/SemesterDetail";
import Simulasi from "./pages/Simulasi";
import Rekap from "./pages/Rekap";
import Pengaturan from "./pages/Pengaturan";
import NotFound from "./pages/NotFound";
import useLocalStorage from "./hooks/useLocalStorage";
import { DATA_AWAL, DEFAULT_PENGATURAN } from "./data/default";

export default function App() {
  const [semesters, setSemesters] = useLocalStorage("gradie-semesters", DATA_AWAL);
  const [pengaturan, setPengaturan] = useLocalStorage("gradie-pengaturan", DEFAULT_PENGATURAN);

  const tambahSemester = () =>
    setSemesters([...semesters, { id: Date.now(), nama: `Semester ${semesters.length + 1}`, courses: [] }]);
  const hapusSemester = (id) => setSemesters(semesters.filter((s) => s.id !== id));

  const ubahCourses = (semId, fn) =>
    setSemesters(semesters.map((s) => (s.id === semId ? { ...s, courses: fn(s.courses) } : s)));
  const tambahMk = (semId, mk) => ubahCourses(semId, (l) => [...l, { id: Date.now(), ...mk }]);
  const hapusMk = (semId, mkId) => ubahCourses(semId, (l) => l.filter((m) => m.id !== mkId));
  const ubahMk = (semId, mkId, data) => ubahCourses(semId, (l) => l.map((m) => (m.id === mkId ? { ...m, ...data } : m)));

  const resetData = () => setSemesters([]);
  const resetPengaturan = () => setPengaturan(DEFAULT_PENGATURAN);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home semesters={semesters} pengaturan={pengaturan} />} />
          <Route
            path="/semester"
            element={<Semester semesters={semesters} pengaturan={pengaturan} onAdd={tambahSemester} onDelete={hapusSemester} />}
          />
          <Route
            path="/semester/:id"
            element={
              <SemesterDetail semesters={semesters} pengaturan={pengaturan} onAddMk={tambahMk} onDeleteMk={hapusMk} onEditMk={ubahMk} />
            }
          />
          <Route path="/simulasi" element={<Simulasi semesters={semesters} pengaturan={pengaturan} />} />
          <Route path="/rekap" element={<Rekap semesters={semesters} pengaturan={pengaturan} />} />
          <Route
            path="/pengaturan"
            element={
              <Pengaturan pengaturan={pengaturan} onSave={setPengaturan} onResetPengaturan={resetPengaturan} onResetData={resetData} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">Small progress is still progress ✦ Data tersimpan di browser kamu.</footer>
    </>
  );
}
