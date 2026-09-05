import { Bookmark, Trash2, MapPin, Clock } from "lucide-react";
import ExperienceArt from "./ExperienceArt";
import { EXPERIENCE_BY_ID } from "../mockData/experiences";
import { EmptyState } from "./ui";

export default function SavedView({ saved, onRemove, onExplore, onResetSaved }) {
  return (
    <div className="container">
      <div className="view-head">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1>Your saved experiences</h1>
            <p>Keep the ones you love — revisit them in your next window.</p>
          </div>
          {onResetSaved && (
            <button className="btn btn--soft btn--sm" onClick={onResetSaved}>
              Reset Demo Saves
            </button>
          )}
        </div>
      </div>

      {saved.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, marginTop: 22 }}>
          <EmptyState
            icon={Bookmark}
            title="No saved experiences yet"
            text="Tap the bookmark on any experience card and it will show up here, ready for your next plan."
            action={
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn btn--royal" onClick={onExplore}>
                  Explore experiences
                </button>
                {onResetSaved && (
                  <button className="btn btn--outline" onClick={onResetSaved}>
                    Load Demo Saves
                  </button>
                )}
              </div>
            }
          />
        </div>
      ) : (
        <div className="saved-grid">
          {saved.map((s) => {
            const exp = EXPERIENCE_BY_ID[s.id];
            return (
              <article className="saved-card" key={s.id}>
                <ExperienceArt art={exp.art} image={exp.image} name={exp.name} size={110} />
                <div className="saved-card__body">
                  <h3>{exp.name}</h3>
                  <div className="saved-card__meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={12} /> {exp.area}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Clock size={12} /> {exp.duration} min
                    </span>
                  </div>
                  <div className="saved-card__foot">
                    <span className="meta-chip meta-chip--teal">
                      {exp.price === 0 ? "Free" : `₹${exp.price.toLocaleString("en-IN")}`}
                    </span>
                    <button className="icon-btn" title="Remove" onClick={() => onRemove(s.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>
                    Saved {s.date}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}