import PropTypes from "prop-types";
import { IlustrasiBuku } from "./Ornament";

export default function EmptyState({ judul, teks, children = null }) {
  return (
    <div className="empty">
      <IlustrasiBuku />
      <h3>{judul}</h3>
      <p className="muted">{teks}</p>
      {children}
    </div>
  );
}

EmptyState.propTypes = {
  judul: PropTypes.string.isRequired,
  teks: PropTypes.string.isRequired,
  children: PropTypes.node,
};
