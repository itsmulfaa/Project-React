import PropTypes from "prop-types";

export const semestersType = PropTypes.arrayOf(
  PropTypes.shape({ id: PropTypes.number, nama: PropTypes.string, courses: PropTypes.array })
).isRequired;

export const pengaturanType = PropTypes.shape({
  targetIpk: PropTypes.number,
  bobot: PropTypes.objectOf(PropTypes.number),
  predikat: PropTypes.arrayOf(PropTypes.shape({ min: PropTypes.number, label: PropTypes.string })),
  predikatBawah: PropTypes.string,
}).isRequired;
