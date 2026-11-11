import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

export default function NotFound({ pesan = "Alamat yang kamu buka tidak ada di aplikasi ini." }) {
  return (
    <section className="panel">
      <EmptyState judul="Halaman tidak ditemukan" teks={pesan}>
        <Link to="/"><Button label="Kembali ke dashboard" icon={Home} /></Link>
      </EmptyState>
    </section>
  );
}

NotFound.propTypes = { pesan: PropTypes.string };
