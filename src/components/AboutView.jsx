import {
  Crosshair, ShieldCheck, MessagesSquare, ArrowRight, Compass,
  CloudRain, Info,
} from "lucide-react";

const PILLARS = [
  {
    icon: CloudRain,
    color: "#2D5BFF",
    bg: "#edf2fe",
    title: "Real-world context",
    text: "Weather, time of day, traffic and opening hours are folded into every recommendation — not bolted on after.",
  },
  {
    icon: ShieldCheck,
    color: "#15946B",
    bg: "#e4f6ee",
    title: "Feasibility first",
    text: "We check the math before we recommend: travel there, experience it, travel back — inside your window.",
  },
  {
    icon: MessagesSquare,
    color: "#7A5CFF",
    bg: "#f0edff",
    title: "Explained choices",
    text: "Every ranking comes with a 'why': scores across time, budget, interest, distance and context.",
  },
];

const FLOW = [
  { label: "Input", sub: "what you want" },
  { label: "Intent", sub: "parse + extract" },
  { label: "Discovery", sub: "candidate pool" },
  { label: "Context", sub: "weather, time, traffic" },
  { label: "Feasibility", sub: "travel + duration math" },
  { label: "Ranking", sub: "multi-criteria score" },
  { label: "Explanation", sub: "why this fits" },
  { label: "Adaptation", sub: "what-if re-ranking" },
  { label: "Mini-Plan", sub: "a day that works" },
];

export default function AboutView() {
  return (
    <div className="container">
      <div className="about">
        <div className="about__hero">
          <div className="about__logo-wrap">
            <img src="/logo.png" alt="LocalIQ Logo" className="about__logo-img" />
          </div>
          <h1>Find experiences that are not just interesting — but realistically possible right now.</h1>
          <p>
            LocalIQ takes what you want, your constraints, and live real-world context, then
            checks what's actually achievable, ranks the best options, explains why, and adapts
            when your plans change.
          </p>
        </div>

        <div className="about__pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.title}>
              <div className="pillar__icon" style={{ background: p.bg, color: p.color }}>
                <p.icon size={20} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 19, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <Crosshair size={18} style={{ color: "var(--royal)" }} /> How a recommendation is made
        </h2>
        <div className="flow">
          {FLOW.map((f, i) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center" }}>
              <div className="flow__step">
                <span className="flow__dot">
                  {i === 8 ? <Compass size={15} /> : <span style={{ fontSize: 13, fontWeight: 700 }}>{i + 1}</span>}
                </span>
                <b>{f.label}</b>
                <span>{f.sub}</span>
              </div>
              {i < FLOW.length - 1 && <ArrowRight size={14} className="flow__arrow" />}
            </div>
          ))}
        </div>

        <div className="about__note">
          <Info size={16} />
          <span>
            <b>Demo Mode · Simulated Real-Time Data:</b> This prototype runs completely client-side in React with a high-fidelity scoring engine and simulated Mumbai context. The planned production architecture is <b>React → FastAPI → PostgreSQL + Qdrant → Google Places API + Google Maps/Routes + Open-Meteo</b>, designed to plug in cleanly with zero UI redesign.
          </span>
        </div>
      </div>
    </div>
  );
}