import { ChevronDown, ChevronUp, Frown } from "lucide-react";
import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { partitionResults } from "../mockData/recommendations";

export default function ExperienceResults({
  ranked, opts, selectedId, onSelect, onHover, savedIds, onToggleSave, onAddToPlan, planIds, rerankPulse,
}) {
  const { feasible, infeasible } = partitionResults(ranked);
  const [showMore, setShowMore] = useState(false);
  const [showInfeasible, setShowInfeasible] = useState(false);

  const visible = showMore ? feasible : feasible.slice(0, 6);
  const hidden = feasible.length - visible.length;

  return (
    <div>
      <div className="results-head">
        <div>
          <h2>Experiences that fit your time</h2>
          <p className="results-head__line">
            {ranked.length} options found · <b>{feasible.length} realistically achievable</b>
            {opts.weather.key === "rain" && " · adjusted for rain"}
          </p>
        </div>
        <div className="pref-slider-wrap">
          <span>Local Gems</span>
          <input
            className="pref-slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={opts.pref}
            onChange={(e) => opts.onPref(Number(e.target.value))}
            aria-label="Experience style: local gems to tourist highlights"
          />
          <span>Touristy</span>
        </div>
      </div>

      <div className={`cards-grid ${rerankPulse ? "cards-grid--pulse" : ""}`}>
        {visible.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            rank={i + 1}
            opts={opts}
            selected={selectedId === exp.id}
            onSelect={onSelect}
            onHover={onHover}
            saved={savedIds.includes(exp.id)}
            onToggleSave={onToggleSave}
            onAddToPlan={onAddToPlan}
            inPlan={planIds.includes(exp.id)}
          />
        ))}
      </div>

      {hidden > 0 && (
        <button className="more-toggle" onClick={() => setShowMore(!showMore)}>
          {showMore ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {showMore ? "Show fewer" : `Show ${hidden} more options that fit`}
        </button>
      )}

      {infeasible.length > 0 && (
        <div className="section-gap">
          <button className="more-toggle" onClick={() => setShowInfeasible(!showInfeasible)}>
            {showInfeasible ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {showInfeasible
              ? "Hide"
              : `Couldn't fit your window (${infeasible.length}) — see why`}
          </button>
          {showInfeasible && (
            <>
              <p className="infeasible-note">
                <Frown size={13} />
                These are great experiences, but the math doesn't work for your window. That's
                the LocalIQ difference — we check feasibility before recommending.
              </p>
              <div className="cards-grid">
                {infeasible.map((exp, i) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    rank={feasible.length + i + 1}
                    opts={opts}
                    selected={selectedId === exp.id}
                    onSelect={onSelect}
                    onHover={onHover}
                    saved={savedIds.includes(exp.id)}
                    onToggleSave={onToggleSave}
                    onAddToPlan={onAddToPlan}
                    inPlan={planIds.includes(exp.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}