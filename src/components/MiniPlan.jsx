import { CheckCircle2, Clock, Wallet, Route, CalendarClock, MapPin, Coffee, Footprints, X, ArrowRight } from "lucide-react";
import { buildItinerary, fmtTime, fmtDur } from "../mockData/itinerary";
import { timeLabel } from "../mockData/experiences";

const STOP_ICON = [MapPin, Coffee, Footprints];

export default function MiniPlan({ planIds, availableTime, onOpenPlan, onRemove }) {
  const it = buildItinerary(planIds, availableTime);
  const empty = !it;

  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <div>
          <div className="panel-card__title"><CalendarClock size={15} /> Today's mini-plan</div>
          <div className="panel-card__sub">
            {empty ? "Pick 2–3 experiences to build a plan" : `${planIds.length} stop${planIds.length > 1 ? "s" : ""} · ${fmtDur(it.totalMinutes)}`}
          </div>
        </div>
      </div>
      <div className="panel-card__body">
        {empty ? (
          <div className="miniplan__empty">
            <p>Select experiences with <b>Add to plan</b> and LocalIQ will sequence them into a feasible itinerary.</p>
            <button className="btn btn--soft btn--sm" onClick={onOpenPlan}>
              Go to My Plan <ArrowRight size={13} />
            </button>
          </div>
        ) : (
          <>
            <div className={`plan-fit ${it.fits ? "plan-fit--ok" : "plan-fit--over"}`}>
              {it.fits ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {it.fits
                ? `Fits your ${timeLabel(availableTime)} — ${fmtDur(it.totalMinutes)} / ${timeLabel(availableTime)}`
                : `Over by ${fmtDur(it.overflow)} — adjust or remove a stop`}
            </div>

            {it.stops.map((st, i) => {
              const Icon = STOP_ICON[i % STOP_ICON.length];
              return (
                <div className="miniplan__stop" key={st.expId}>
                  <span className="miniplan__time">{fmtTime(st.arrive)}</span>
                  <span className={`miniplan__icon ${i === 0 ? "miniplan__icon--teal" : i % 2 ? "miniplan__icon--violet" : "miniplan__icon--orange"}`}>
                    <Icon size={14} />
                  </span>
                  <div className="miniplan__stop-main" style={{ flex: 1 }}>
                    <b>{st.exp.name}</b>
                    <span>{fmtDur(st.duration)} · {st.transit} min away · {st.exp.price === 0 ? "Free" : `₹${st.exp.price.toLocaleString("en-IN")}`}</span>
                  </div>
                  <button className="icon-btn" title="Remove stop" onClick={() => onRemove(st.expId)} style={{ width: 26, height: 26 }}>
                    <X size={14} />
                  </button>
                </div>
              );
            })}

            <div className="miniplan__stop">
              <span className="miniplan__time">{fmtTime(it.returnEnd)}</span>
              <span className="miniplan__icon miniplan__icon--violet">
                <Route size={14} />
              </span>
              <div className="miniplan__stop-main">
                <b>Return / next destination</b>
                <span>{it.totalTravel} min total travel</span>
              </div>
            </div>

            <div className="miniplan__totals">
              <span className="meta-chip"><Clock size={13} /> {fmtDur(it.totalMinutes)}</span>
              <span className="meta-chip meta-chip--teal"><Wallet size={13} /> ₹{it.totalCost.toLocaleString("en-IN")}</span>
              <span className="meta-chip"><Route size={13} /> {it.totalTravel} min travel</span>
            </div>

            <div className="miniplan__foot">
              <button className="btn btn--royal btn--sm" style={{ flex: 1, justifyContent: "center" }} onClick={onOpenPlan}>
                Open full plan <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}