import { useState } from "react";
import {
  CheckCircle2, XCircle, AlertTriangle, ChevronDown, ArrowRight,
  Clock, Wallet, Route, Bookmark, BookmarkCheck, PlusCircle, MinusCircle,
  MapPin, Sparkles, ListOrdered, HelpCircle,
} from "lucide-react";
import ExperienceArt from "./ExperienceArt";
import { Rating, MetaChip, FeasibilityBadge, LocalBadge, ScoreBar } from "./ui";
import { FEASIBILITY, whyThisFits } from "../mockData/recommendations";

function FeasibilityBox({ exp, opts }) {
  const { feasibility, total, travelTime, duration, feasibilityReason, feasibilityTitle } = exp;
  const available = opts.time;

  if (feasibility === FEASIBILITY.DOES_NOT_FIT) {
    const overflow = total - available;
    return (
      <div className="feas feas--no">
        <XCircle size={16} strokeWidth={2.4} />
        <div>
          <div className="feas__title">{feasibilityTitle || `Doesn't fit current conditions`}</div>
          <div className="feas__flow">
            {feasibilityReason ? (
              <span>{feasibilityReason}</span>
            ) : (
              <>
                Total <b>{total}</b> / <b>{available}</b> min — return journey exceeds your available time
                {overflow > 0 && <> by <b>{overflow}</b> min</>}.
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`feas ${feasibility === FEASIBILITY.TIGHT ? "feas--tight" : "feas--ok"}`}>
      {feasibility === FEASIBILITY.TIGHT ? (
        <AlertTriangle size={16} strokeWidth={2.4} />
      ) : (
        <CheckCircle2 size={16} strokeWidth={2.4} />
      )}
      <div>
        <div className="feas__title">
          {feasibility === FEASIBILITY.TIGHT ? "Tight fit — just makes it" : "Fits your window"}
          {feasibility === FEASIBILITY.TIGHT && <> · <span style={{ fontWeight: 500, opacity: 0.85 }}>plan carefully</span></>}
        </div>
        <div className="feas__flow">
          {travelTime} min travel <span className="arrow">→</span> {duration} min experience
          <span className="arrow">→</span> {travelTime} min return
          <br />
          Total <b>{total}</b> / <b>{available}</b> min available
        </div>
      </div>
    </div>
  );
}

function WhyAccordion({ exp, opts }) {
  const [open, setOpen] = useState(false);
  const reasons = whyThisFits(exp, opts);
  return (
    <div className="card-acc">
      <button
        className={`acc-head ${open ? "acc-head--open" : ""}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        <HelpCircle size={14} />
        Why this fits
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="acc-body">
          <ul className="why-list">
            {reasons.map((r, i) => (
              <li key={i} className={r.startsWith("Doesn't") || r.startsWith("exceeds") || (r.startsWith("₹") && r.includes("exceeds")) || r.includes("Outdoor") || r.includes("Closed") ? "warn" : ""}>
                <CheckCircle2 size={13} strokeWidth={2.4} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RankAccordion({ exp }) {
  const [open, setOpen] = useState(false);
  const s = exp.scores;
  return (
    <div className="card-acc">
      <button
        className={`acc-head ${open ? "acc-head--open" : ""}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        <ListOrdered size={14} />
        Why ranked here
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="acc-body breakdown">
          <div className="breakdown-head">
            <span className="breakdown-score num">{exp.matchScore}%</span>
            <span>match score · weighted across criteria</span>
          </div>
          <ScoreBar label="Time fit" value={s.timeFit} icon={Clock} />
          <ScoreBar label="Budget fit" value={s.budgetFit} icon={Wallet} />
          <ScoreBar label="Interest match" value={s.interestMatch} icon={Sparkles} />
          <ScoreBar label="Distance" value={s.distance} icon={Route} />
          <ScoreBar label="Context fit" value={s.context} icon={AlertTriangle} />
        </div>
      )}
    </div>
  );
}

export default function ExperienceCard({
  exp, rank, opts, selected, onSelect, onHover, onToggleSave, saved, onAddToPlan, inPlan,
}) {
  const infeasible = !exp.fits;
  return (
    <article
      className={`exp-card ${selected ? "exp-card--selected" : ""} ${infeasible ? "exp-card--muted" : ""}`}
      onClick={() => onSelect(exp.id)}
      onMouseEnter={() => onHover && onHover(exp.id)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{ animationDelay: `${Math.min(rank * 40, 400)}ms` }}
    >
      {rank <= 5 && <span className="exp-card__rank">#{rank}</span>}
      <ExperienceArt art={exp.art} image={exp.image} name={exp.name} size={112} />
      <div className="exp-card__body">
        <div className="exp-card__top">
          <div style={{ minWidth: 0 }}>
            <h3 className="exp-card__name">{exp.name}</h3>
            <div className="exp-card__cats">
              <span className="exp-card__cat">{exp.category}</span>
              <LocalBadge exp={exp} pref={opts.pref} />
              <span className={`open-dot ${exp.isOpen ? "open-dot--open" : "open-dot--closed"}`}>
                {exp.isOpen ? "Open" : "Closed now"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
            <Rating value={exp.rating} reviews={exp.reviews} />
            <FeasibilityBadge feasibility={exp.feasibility} compact />
          </div>
        </div>

        <div className="exp-card__meta">
          <MetaChip icon={MapPin}>{exp.area}</MetaChip>
          <MetaChip icon={Route}>{exp.travelTime} min away</MetaChip>
          <MetaChip icon={Clock}>{exp.duration} min</MetaChip>
          <MetaChip icon={Wallet} tone={exp.price === 0 ? "teal" : exp.price > opts.budget ? "red" : ""}>
            {exp.price === 0 ? "Free" : `₹${exp.price.toLocaleString("en-IN")}`}
          </MetaChip>
        </div>

        <p className="exp-card__desc">{exp.tagline}</p>

        <FeasibilityBox exp={exp} opts={opts} />

        <div className="exp-card__actions">
          <div className="acc-zone">
            <WhyAccordion exp={exp} opts={opts} />
            <RankAccordion exp={exp} />
          </div>
          <button
            className="icon-btn"
            title={saved ? "Remove from saved" : "Save"}
            onClick={(e) => { e.stopPropagation(); onToggleSave(exp.id); }}
          >
            {saved ? <BookmarkCheck size={17} className="icon-btn--on" /> : <Bookmark size={17} />}
          </button>
          <button
            className={`btn btn--sm ${inPlan ? "btn--soft" : "btn--outline"}`}
            onClick={(e) => { e.stopPropagation(); onAddToPlan(exp.id); }}
          >
            {inPlan ? <MinusCircle size={14} /> : <PlusCircle size={14} />}
            {inPlan ? "In plan" : "Add to plan"}
          </button>
        </div>
      </div>
    </article>
  );
}