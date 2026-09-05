import { Compass, MapPin, ChevronDown, FlaskConical } from "lucide-react";

const LINKS = [
  { key: "explore", label: "Explore" },
  { key: "plan", label: "My Plan" },
  { key: "saved", label: "Saved" },
  { key: "about", label: "About" },
];

export default function Navbar({ view, onNavigate, planCount, savedCount, location }) {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <button className="brand" onClick={() => onNavigate("explore")} style={{ border: "none", background: "none", cursor: "pointer" }}>
          <img
            src="/logo.png"
            alt="LocalIQ Logo"
            className="brand__img"
          />
          <span className="brand__text">
            <span className="brand__word">Local<span className="brand__highlight">IQ</span></span>
            <span className="brand__tag">Discover Local. Smarter.</span>
          </span>
        </button>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <button
              key={l.key}
              className={`nav__link ${view === l.key ? "nav__link--on" : ""}`}
              onClick={() => onNavigate(l.key)}
            >
              {l.label}
              {l.key === "plan" && planCount > 0 && (
                <span className="nav__count">{planCount}</span>
              )}
              {l.key === "saved" && savedCount > 0 && (
                <span className="nav__count">{savedCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="nav__spacer" />

        <div className="nav__right">
          <span className="demo-badge" title="Fully interactive client-side prototype. Production roadmap includes FastAPI, Qdrant, Google APIs & Open-Meteo.">
            <FlaskConical size={12} strokeWidth={2.4} />
            Demo Mode · Simulated real-time data
          </span>
          <button className="location-picker" title="Simulated GPS coordinate in South Mumbai (Fort / Colaba)">
            <MapPin size={14} strokeWidth={2.2} />
            {location}
            <ChevronDown size={13} strokeWidth={2.2} />
          </button>
          <span className="avatar" title="Demo User: Ananya S.">AS</span>
        </div>
      </div>
    </header>
  );
}