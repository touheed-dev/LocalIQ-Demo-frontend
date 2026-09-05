import { SlidersHorizontal, Clock, Wallet, CloudRain, Sun, RotateCcw, ArrowRight } from "lucide-react";
import { timeLabel } from "../mockData/experiences";

export default function WhatIfPanel({ values, base, onChange, onReset }) {
  const timeChanged = values.time !== base.time;
  const budgetChanged = values.budget !== base.budget;
  const weatherChanged = values.weather !== base.weather;
  const anything = timeChanged || budgetChanged || weatherChanged;

  const delta = (changed, cur, orig) =>
    changed ? <span className="whatif__delta">{orig} → {cur}</span> : null;

  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <div>
          <div className="panel-card__title">
            <SlidersHorizontal size={15} />
            What if your plans change?
          </div>
          <div className="panel-card__sub">Adjust live — recommendations re-rank instantly</div>
        </div>
        {anything && (
          <button className="whatif__reset" onClick={onReset}>
            <RotateCcw size={13} /> Reset
          </button>
        )}
      </div>
      <div className="panel-card__body">
        <div className="whatif__row">
          <label><Clock size={14} /> Time window</label>
          <div className="whatif__ctrl">
            <input
              className="range"
              type="range" min={60} max={180} step={15}
              value={values.time}
              onChange={(e) => onChange("time", Number(e.target.value))}
            />
            <span className="whatif__value">{timeLabel(values.time)}</span>
          </div>
          {delta(timeChanged, timeLabel(values.time), timeLabel(base.time))}
        </div>

        <div className="whatif__row">
          <label><Wallet size={14} /> Budget</label>
          <div className="whatif__ctrl">
            <input
              className="range"
              type="range" min={300} max={2500} step={100}
              value={values.budget}
              onChange={(e) => onChange("budget", Number(e.target.value))}
            />
            <span className="whatif__value">₹{values.budget.toLocaleString("en-IN")}</span>
          </div>
          {delta(budgetChanged, `₹${values.budget.toLocaleString("en-IN")}`, `₹${base.budget.toLocaleString("en-IN")}`)}
        </div>

        <div className="whatif__row">
          <label>{values.weather === "rain" ? <CloudRain size={14} /> : <Sun size={14} />} Weather</label>
          <div className="whatif__ctrl">
            <div className="segmented segmented--sm">
              <button
                className={`segmented__opt ${values.weather === "rain" ? "segmented__opt--on" : ""}`}
                onClick={() => onChange("weather", "rain")}
              >
                <CloudRain size={12} style={{ display: "inline", verticalAlign: -2 }} /> Rain
              </button>
              <button
                className={`segmented__opt ${values.weather === "sunny" ? "segmented__opt--on" : ""}`}
                onClick={() => onChange("weather", "sunny")}
              >
                <Sun size={12} style={{ display: "inline", verticalAlign: -2 }} /> Sunny
              </button>
            </div>
          </div>
          {delta(weatherChanged, values.weather === "rain" ? "Rain" : "Sunny", base.weather === "rain" ? "Rain" : "Sunny")}
        </div>

        {anything && (
          <p className="whatif__note">
            <ArrowRight size={12} style={{ flex: "0 0 auto", marginTop: 2, color: "var(--violet)" }} />
            Recommendations updated for your new constraints — infeasible experiences are moved out of the top list.
          </p>
        )}
      </div>
    </div>
  );
}