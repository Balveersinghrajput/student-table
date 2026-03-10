import { useLocation } from "react-router-dom";
import "./Navbar.css";

const pageTitles = {
  "/dashboard":   { title: "Dashboard",     subtitle: "Overview of all student data" },
  "/students":    { title: "Students",       subtitle: "Manage all student records" },
  "/leaderboard": { title: "Leaderboard",    subtitle: "Top performing students" },
};

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();
  const current = pageTitles[location.pathname] || { title: "EduTrack", subtitle: "" };

  return (
    <header className="navbar">
      {/* Hamburger for mobile */}
      <button className="navbar-hamburger" onClick={onMenuToggle}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Page Title */}
      <div className="navbar-title-wrap">
        <h1 className="navbar-title">{current.title}</h1>
        <p className="navbar-subtitle">{current.subtitle}</p>
      </div>

      {/* Admin Info */}
      <div className="navbar-admin">
        <div className="navbar-admin-text">
          <div className="navbar-admin-name">Admin</div>
          <div className="navbar-admin-email">admin@school.com</div>
        </div>
        <div className="navbar-admin-avatar">A</div>
      </div>
    </header>
  );
}