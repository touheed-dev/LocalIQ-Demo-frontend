import { Star, Check, X, AlertTriangle } from "lucide-react";
import { FEASIBILITY } from "../mockData/recommendations";

export function Chip({ active, onClick, children, small }) {
  return (
    <button
      type="button"
      className={`chip ${active ? "chip--active" : ""} ${small ? "chip--small" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Segmented({ options, value, onChange, size }) {
  return (
    <div className={`segmented ${size === "sm" ? "segmented--sm" : ""}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`segmented__opt ${value === opt ? "segmented__opt--on" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function MetaChip({ icon: Icon, children, tone }) {
  return (
    <span className={`meta-chip ${tone ? `meta-chip--${tone}` : ""}`}>
      {Icon && <Icon size={13} strokeWidth={2.2} />}
      <span>{children}</span>
    </span>
  );
}

export function Rating({ value, reviews }) {
  return (
    <span className="rating">
      <Star size={13} fill="currentColor" strokeWidth={0} />
      <b>{value.toFixed(1)}</b>
      {reviews ? <span className="rating__n">({reviews.toLocaleString("en-IN")})</span> : null}
    </span>
  );
}

export function ScoreBar({ label, value, icon: Icon }) {
  return (
    <div className="scorebar">
      <span className="scorebar__label">
        {Icon && <Icon size={13} strokeWidth={2.2} />}
        {label}
      </span>
      <div className="scorebar__track">
        <div className="scorebar__fill" style={{ width: `${value}%` }} />
      </div>
      <span className="scorebar__value">{value}</span>
    </div>
  );
}

export function FeasibilityBadge({ feasibility, compact }) {
  const map = {
    [FEASIBILITY.FITS]: { icon: Check, cls: "ok", label: "Fits your window" },
    [FEASIBILITY.TIGHT]: { icon: AlertTriangle, cls: "tight", label: "Tight fit" },
    [FEASIBILITY.DOES_NOT_FIT]: { icon: X, cls: "no", label: "Doesn't fit" },
  };
  const { icon: Icon, cls, label } = map[feasibility];
  return (
    <span className={`feas-badge feas-badge--${cls} ${compact ? "feas-badge--compact" : ""}`}>
      <Icon size={compact ? 12 : 13} strokeWidth={2.6} />
      {!compact && label}
    </span>
  );
}

export function LocalBadge({ exp, pref }) {
  const isLocal = exp.localScore >= 80 && pref < 55;
  const isTouristy = exp.touristScore >= 85 && pref >= 55;
  if (isLocal)
    return <span className="local-badge local-badge--gem">Local Gem</span>;
  if (isTouristy)
    return <span className="local-badge local-badge--tourist">Tourist Highlight</span>;
  return null;
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty">
      <div className="empty__icon">{Icon && <Icon size={26} strokeWidth={1.8} />}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}