import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronRight, Trash2 } from "lucide-react";

export default function SemesterCard({ id, title, ips, totalSks, jumlahMk, status, onDelete }) {
  return (
    <article className="semcard lift">
      <Link to={`/semester/${id}`} className="semcard__link">
        <div>
          <h3>{title}</h3>
          <p className="muted">{jumlahMk} mata kuliah, {totalSks} SKS</p>
          <span className={`badge badge--${status.warna}`}>{status.label}</span>
        </div>
        <div className="semcard__ips">
          <strong>{ips.toFixed(2)}</strong>
          <span>IPS</span>
        </div>
        <ChevronRight size={20} className="semcard__arrow" />
      </Link>
      <button className="icon-btn" onClick={onDelete} aria-label={`Hapus ${title}`}>
        <Trash2 size={17} />
      </button>
    </article>
  );
}

SemesterCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  ips: PropTypes.number.isRequired,
  totalSks: PropTypes.number.isRequired,
  jumlahMk: PropTypes.number.isRequired,
  status: PropTypes.shape({ label: PropTypes.string, warna: PropTypes.string }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
