import PropTypes from "prop-types";

export default function ProgressBar({ judul, persen, hint = "", nilaiLabel }) {
  const aman = Math.max(0, Math.min(100, persen));
  return (
    <div className="progress">
      <div className="progress__head">
        <h3>{judul}</h3>
        <span>{nilaiLabel ?? `${Math.round(aman)}%`}</span>
      </div>
      <div className="progress__track" role="progressbar" aria-valuenow={Math.round(aman)} aria-valuemin={0} aria-valuemax={100} aria-label={judul}>
        <div className="progress__bar" style={{ width: `${aman}%` }} />
      </div>
      {hint && <p className="muted">{hint}</p>}
    </div>
  );
}

ProgressBar.propTypes = {
  judul: PropTypes.string.isRequired,
  persen: PropTypes.number.isRequired,
  hint: PropTypes.string,
  nilaiLabel: PropTypes.string,
};
