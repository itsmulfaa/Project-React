import PropTypes from "prop-types";

export default function Field({ label, error = "", grow = false, hint = "", children }) {
  return (
    <label className={`field${grow ? " field--grow" : ""}${error ? " field--error" : ""}`}>
      <span>{label}</span>
      {children}
      {error ? <small className="field__error" role="alert">{error}</small> : hint && <small className="field__hint">{hint}</small>}
    </label>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  grow: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
