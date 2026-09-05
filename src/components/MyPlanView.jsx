import { useState } from "react";
import {
  CalendarClock, Clock, Wallet, Route, MapPin, Coffee, Footprints,
  RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, TrainFront, Sparkles,
} from "lucide-react";
import ExperienceArt from "./ExperienceArt";
import { buildItinerary, recheckPlan, fmtTime, fmtDur } from "../mockData/itinerary";
import { timeLabel, EXPERIENCE_BY_ID } from "../mockData/experiences";
import { EmptyState } from "./ui";

const STOP_ICON = [MapPin, Coffee, Footprints];

export default function MyPlanView({ planIds, availableTime, weather, onUpdatePlan, onExplore }) {
  const [note, setNote] = useState(null);
  const it = buildItinerary(planIds, availableTime);
  const [checked, setChecked] = useState(false);

  const handleRecheck = () => {
    const res = recheckPlan(it, planIds, availableTime, weather.key);
    setChecked(true);
    if (res.adjusted) {
      onUpdatePlan(res.plan);
      setNote({ kind: "warn", text: res.note });
    } else {
      setNote({ kind: "ok", text: res.note });
    }
  };

  if (!it) {
    return (
      <div className="container">
        <div className="view-head">
          <h1>My Plan</h1>
          <p>Build today's mini-plan from the experiences that fit.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, marginTop: 22 }}>
          <EmptyState
            icon={CalendarClock}
            title="No plan yet"
            text="Head to Explore, pick 2–3 experiences that fit your window, and LocalIQ will sequence them into a feasible plan."
            action={
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn btn--royal" onClick={onExplore}>
                  Explore experiences <ArrowRight size={15} />
                </button>
                <button className="btn btn--outline" onClick={() => onUpdatePlan(["e2", "e9"])}>
                  Load Demo Plan (2 stops)
                </button>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="view-head">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1>My Plan</h1>
            <p>Your sequenced, feasibility-checked mini-itinerary for today.</p>
          </div>
          <button className="btn btn--soft btn--sm" onClick={() => onUpdatePlan(["e2", "e9"])}>
            Reset to Demo Plan
          </button>
        </div>
      </div>

      <div className="plan-layout">
        <div className="timeline">
          <div className="tl-row">
            <div className="tl-rail">
              <span className="tl-time">{fmtTime(it.stops[0].depart)}</span>
              <span className="tl-node tl-node--start">
                <MapPin size={16} />
              </span>
              <span className="tl-line" />
            </div>
            <div className="tl-card">
              <h3>Start: Fort, Mumbai</h3>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Depart {fmtTime(it.stops[0].depart)} · moderate traffic</div>
            </div>
          </div>

          {it.stops.map((st, i) => {
            const Icon = STOP_ICON[i] || MapPin;
            return (
              <div key={st.expId}>
                <div className="tl-row">
                  <div className="tl-rail">
                    <span className="tl-time">{fmtTime(st.arrive)}</span>
                    <span className="tl-node" style={{ background: "var(--royal-soft)", color: "var(--royal)" }}>
                      <Icon size={16} />
                    </span>
                    <span className="tl-line" />
                  </div>
                  <div className="tl-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <ExperienceArt art={st.exp.art} image={st.exp.image} name={st.exp.name} size={64} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3>{st.exp.name}</h3>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{st.exp.area}</div>
                      <div className="meta-row">
                        <span className="meta-chip"><Clock size={12} /> {fmtDur(st.duration)}</span>
                        <span className="meta-chip"><Wallet size={12} /> {st.exp.price === 0 ? "Free" : `₹${st.exp.price.toLocaleString("en-IN")}`}</span>
                        {st.exp.isIndoor && <span className="meta-chip meta-chip--teal">Indoor</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tl-row tl-row--transit">
                  <div className="tl-rail">
                    <span className="tl-line" style={{ minHeight: 18, marginTop: 2 }} />
                  </div>
                  <div className="tl-transit">
                    <TrainFront size={13} />
                    {st.transit} min transit · arrive {fmtTime(st.arrive)}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="tl-row">
            <div className="tl-rail">
              <span className="tl-time">{fmtTime(it.returnStart)}</span>
              <span className="tl-node" style={{ background: "var(--violet-soft)", color: "var(--violet)" }}>
                <Route size={16} />
              </span>
              <span className="tl-line" />
            </div>
            <div className="tl-card">
              <h3>Return / next destination</h3>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Arrive {fmtTime(it.returnEnd)} · {it.totalTravel} min total travel</div>
            </div>
          </div>

          {note && (
            <div className="plan-note" style={note.kind === "warn" ? { background: "var(--amber-soft)", borderColor: "#eed9ae", color: "#7a500b" } : {}}>
              {note.kind === "ok" ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
              {note.text}
            </div>
          )}

          <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
            <button className="btn btn--primary" onClick={handleRecheck}>
              <RefreshCw size={15} /> Re-check Plan
            </button>
            <button
              className="btn btn--soft"
              onClick={() => setChecked(false)}
              disabled={!checked}
            >
              Clear status
            </button>
          </div>
        </div>

        <aside>
          <div className="summary-card">
            <div className="panel-card__title"><Sparkles size={15} /> Plan summary</div>
            <div className="summary-grid">
              <div className="summary-fact"><span><Clock size={11} /> Total time</span><b>{fmtDur(it.totalMinutes)}</b></div>
              <div className="summary-fact"><span><Route size={11} /> Travel</span><b>{it.totalTravel} min</b></div>
              <div className="summary-fact"><span><Wallet size={11} /> Est. cost</span><b>₹{it.totalCost.toLocaleString("en-IN")}</b></div>
              <div className="summary-fact"><span><MapPin size={11} /> Stops</span><b>{it.stops.length + 1}</b></div>
            </div>
            <div className={`plan-fit ${it.fits ? "plan-fit--ok" : "plan-fit--no"}`} style={{ marginBottom: 0 }}>
              {it.fits ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {it.fits
                ? `${fmtDur(it.totalMinutes)} used of ${timeLabel(availableTime)} — ${fmtDur(availableTime - it.totalMinutes)} to spare`
                : `Exceeds window by ${fmtDur(it.overflow)} — re-check to adapt`}
            </div>
          </div>

          <div className="summary-card" style={{ marginTop: 14 }}>
            <div className="panel-card__title"><CalendarClock size={15} /> Planned stops</div>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              {it.stops.map((st) => (
                <ExperienceArt key={st.expId} art={EXPERIENCE_BY_ID[st.expId].art} size={64} />
              ))}
              <ExperienceArt art="seafront" size={64} className="" />
            </div>
            <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 12, lineHeight: 1.5 }}>
              Demo plan built from mock transit times. In production, live routing and crowds would re-validate each stop.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}