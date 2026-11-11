import { NavLink, Link } from "react-router-dom";
import { GraduationCap, Home, Layers, Target, FileText, Settings } from "lucide-react";

const MENU = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/semester", label: "Semester", icon: Layers },
  { to: "/simulasi", label: "Simulasi", icon: Target },
  { to: "/rekap", label: "Rekap", icon: FileText },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="brand">
          <span className="brand__logo"><GraduationCap size={20} /></span>
          <span className="brand__name">Gradie.</span>
        </Link>
        <nav className="navbar__menu" aria-label="Menu utama">
          {MENU.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className="navlink" aria-label={label}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
