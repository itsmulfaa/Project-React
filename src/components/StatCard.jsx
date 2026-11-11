import PropTypes from "prop-types";

export default function StatCard({ label, value, hint = "", icon: Icon, warna = "anggur" }) {
  return (
    <div className={`stat lift stat--${warna}`}>
      <div className="stat__icon">
        <Icon size={20} />
      </div>
      <p className="stat__label">{label}</p>
      <p className="stat__value">{value}</p>
      {hint && <p className="stat__hint">{hint}</p>}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hint: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  warna: PropTypes.oneOf(["emas", "anggur", "rose", "abu"]),
};
