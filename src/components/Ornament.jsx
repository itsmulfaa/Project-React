import PropTypes from "prop-types";

export function Bunga({ ukuran = 24, className = "" }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 40 40" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="9.5" rx="6" ry="9" fill="currentColor" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4.5" fill="#cdb07a" />
    </svg>
  );
}

export function Bintang({ ukuran = 24, className = "" }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" fill="currentColor" />
    </svg>
  );
}

const propTypes = { ukuran: PropTypes.number, className: PropTypes.string };
Bunga.propTypes = propTypes;
Bintang.propTypes = propTypes;

export function IlustrasiBuku() {
  return (
    <svg width="150" height="120" viewBox="0 0 150 120" aria-hidden="true">
      <ellipse cx="75" cy="106" rx="52" ry="7" fill="#e9d6d6" />
      <path d="M75 34c-12-9-34-10-52-4v64c18-6 40-5 52 4 12-9 34-10 52-4V30c-18-6-40-5-52 4Z" fill="#5e1f33" />
      <path d="M75 40c-11-8-30-9-46-4v54c16-5 35-4 46 4 11-8 30-9 46-4V36c-16-5-35-4-46 4Z" fill="#fffdf8" />
      <path d="M75 40v54" stroke="#e9d6d6" strokeWidth="2" />
      <path d="M40 52c9-2 18-1 27 3M40 64c9-2 18-1 27 3M83 55c9-4 18-5 27-3M83 67c9-4 18-5 27-3" stroke="#d9a5ad" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <g transform="translate(104 8)" color="#cdb07a"><Bintang ukuran={26} /></g>
      <g transform="translate(14 14)" color="#d9a5ad"><Bunga ukuran={24} /></g>
      <g transform="translate(124 44)" color="#d9a5ad"><Bintang ukuran={12} /></g>
    </svg>
  );
}
