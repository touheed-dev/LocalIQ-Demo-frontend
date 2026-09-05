import {
  X, CheckCircle2, XCircle, AlertTriangle, MapPin, Route, Clock, Wallet,
  CalendarClock, CloudRain, Accessibility, Bookmark, BookmarkCheck,
  PlusCircle, MinusCircle, Navigation, Sparkles, ShieldAlert,
} from "lucide-react";
import ExperienceArt from "./ExperienceArt";
import { Rating, MetaChip, FeasibilityBadge, LocalBadge } from "./ui";
import { whyThisFits, contextChecks } from "../mockData/recommendations";
import { fmtDur } from "../mockData/itinerary";

export default function ExperienceDetail({
  exp, opts, onClose, saved, onToggleSave, onAddToPlan, inPlan,
}) {
  const reasons = whyThisFits(exp, opts);
  const checks = contextChecks(exp, opts);

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="detail" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={exp.name}>
        <div className="detail__hero">
          {exp.image ? (
            <div className="detail__photo-wrap">
              <img src={exp.image} alt={exp.name} className="detail__photo-img" />
              <div className="detail__photo-scrim" />
            </div>
          ) : (
            <ExperienceArt art={exp.art} size={220} />
          )}
          <button className="icon-btn detail__close" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </div>
        <div className="detail__body">
          <div className="detail__cats">
            <span className="exp-card__cat">{exp.category}</span>
            <LocalBadge exp={exp} pref={opts.pref} />
            <FeasibilityBadge feasibility={exp.feasibility} />
          </div>
          <h2>{exp.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <Rating value={exp.rating} reviews={exp.reviews} />
            <span className={`open-dot ${exp.isOpen ? "open-dot--open" : "open-dot--closed"}`}>
              {exp.isOpen ? "Open now" : "Closed right now"}
            </span>
          </div>

          <p className="detail__desc" style={{ marginTop: 12 }}>{exp.description}</p>

          <div className="detail__grid">
            <div className="detail-fact"><span><MapPin size={11} /> Area</span><b>{exp.area}</b></div>
            <div className="detail-fact"><span><Route size={11} /> Distance</span><b>{exp.travelTime} min away</b></div>
            <div className="detail-fact"><span><Clock size={11} /> Duration</span><b>{fmtDur(exp.duration)}</b></div>
            <div className="detail-fact"><span><Wallet size={11} /> Price</span><b>{exp.price === 0 ? "Free" : `₹${exp.price.toLocaleString("en-IN")}`}</b></div>
            <div className="detail-fact"><span><CalendarClock size={11} /> Hours</span><b>{exp.openingHours}</b></div>
            <div className="detail-fact"><span><Accessibility size={11} /> Accessibility</span><b>Walking + transit</b></div>
          </div>

          <div className="feas" style={{ marginTop: 4 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: "100%" }}>
              <div className="feas__title" style={{ color: "inherit" }}>
                {exp.fits ? (
                  <><CheckCircle2 size={16} /> Feasibility — {exp.total} / {opts.time} minutes{exp.feasibility === "tight" ? " · tight" : ""}</>
                ) : (
                  <><XCircle size={16} /> Feasibility — {exp.feasibilityTitle || "Doesn't fit current conditions"}</>
                )}
              </div>
              <div className="feas__flow">
                {exp.feasibilityReason ? (
                  <span>{exp.feasibilityReason}</span>
                ) : (
                  <>{exp.travelTime} min travel → {exp.duration} min experience → {exp.travelTime} min return (Total {exp.total} / {opts.time} min)</>
                )}
              </div>
            </div>
          </div>

          <div className="detail__h3"><Sparkles size={13} /> Why LocalIQ recommends it</div>
          <ul className="why-list">
            {reasons.map((r, i) => (
              <li key={i} className={r.startsWith("Doesn't") || r.startsWith("exceeds") || (r.startsWith("₹") && r.includes("exceeds")) ? "warn" : ""}>
                <CheckCircle2 size={14} strokeWidth={2.4} />
                {r}
              </li>
            ))}
          </ul>

          <div className="detail__h3"><ShieldAlert size={13} /> Context check <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--muted)" }}>(demo indicators)</span></div>
          <ul className="check-list">
            {checks.map((c) => (
              <li key={c.label} className={c.ok ? "ok" : "bad"}>
                {c.ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                <span>
                  {c.label}
                  <span className="detail">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          {exp.safetyNote && (
            <div className="detail__safety">
              <AlertTriangle size={15} />
              {exp.safetyNote}
            </div>
          )}

          <div className="detail__actions">
            <button
              className={`btn ${inPlan ? "btn--soft" : "btn--royal"}`}
              onClick={() => onAddToPlan(exp.id)}
            >
              {inPlan ? <MinusCircle size={16} /> : <PlusCircle size={16} />}
              {inPlan ? "In mini-plan" : "Add to mini-plan"}
            </button>
            <button
              className="btn btn--outline"
              onClick={() => onToggleSave(exp.id)}
              title={saved ? "Remove from saved" : "Save"}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
          </div>
          <button
            className="btn btn--soft btn--block"
            style={{ marginTop: 8 }}
            onClick={() => alert("Get Directions is a demo interaction — route shown on the map instead.")}
          >
            <Navigation size={15} /> Get Directions
          </button>
        </div>
      </aside>
    </div>
  );
}