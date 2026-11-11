import PropTypes from "prop-types";

export default function Button({ label, onClick, variant = "primary", icon: Icon, type = "button", disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`btn btn--${variant}`}>
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "soft", "ghost", "danger", "gold"]),
  icon: PropTypes.elementType,
  type: PropTypes.oneOf(["button", "submit"]),
  disabled: PropTypes.bool,
};
