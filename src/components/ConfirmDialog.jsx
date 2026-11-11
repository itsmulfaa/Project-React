import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ConfirmDialog({ open, judul, teks, labelYa = "Ya, hapus", onConfirm, onCancel }) {
  const batal = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    batal.current?.focus();
    const tutup = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", tutup);
    return () => document.removeEventListener("keydown", tutup);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal__box" role="alertdialog" aria-modal="true" aria-labelledby="dlg-judul" onClick={(e) => e.stopPropagation()}>
        <div className="modal__icon"><AlertTriangle size={22} /></div>
        <h3 id="dlg-judul">{judul}</h3>
        <p className="muted">{teks}</p>
        <div className="modal__actions">
          <button ref={batal} className="btn btn--soft" onClick={onCancel}>Batal</button>
          <Button label={labelYa} variant="danger" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  judul: PropTypes.string.isRequired,
  teks: PropTypes.string.isRequired,
  labelYa: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
