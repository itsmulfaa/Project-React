import PropTypes from "prop-types";

export default function TrendBars({ data, skala = 4 }) {
  return (
    <div className="trend">
      {data.map((d) => (
        <div key={d.id} className="trend__col">
          <span className="trend__num">{d.ips.toFixed(2)}</span>
          <div className="trend__track">
            <div className="trend__bar" style={{ height: `${(d.ips / skala) * 100}%` }} />
          </div>
          <span className="trend__name">{d.nama.replace("Semester ", "Smt ")}</span>
        </div>
      ))}
    </div>
  );
}

TrendBars.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama: PropTypes.string.isRequired,
      ips: PropTypes.number.isRequired,
    })
  ).isRequired,
  skala: PropTypes.number,
};
