import { Search, Mic, Clock, UtensilsCrossed, Gem, Users, CloudRain, Zap } from "lucide-react";
import { QUICK_PROMPTS } from "../mockData/experiences";

const PROMPT_ICONS = {
  clock: Clock,
  food: UtensilsCrossed,
  gem: Gem,
  family: Users,
  rain: CloudRain,
};

export default function SearchHero({ compact, query, onQuery, onSearch, onMic, onPrompt }) {
  return (
    <section className={`hero ${compact ? "hero--compact" : ""}`}>
      <div className="container">
        <div className="hero__inner">
          <div>
            <h1>What do you want to experience?</h1>
            <p className="hero__sub">
              Tell us what you have in mind. We'll find what actually fits.
            </p>
          </div>
          <div className="search-row">
            <div className="search-box">
              <Search size={17} className="search-box__icon" strokeWidth={2.2} />
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="I have 2 hours in Mumbai, ₹1000 budget, and want something local and indoors."
                aria-label="Describe your experience"
              />
              <button className="mic-btn" onClick={onMic} title="Voice input (demo)" aria-label="Voice input">
                <Mic size={18} strokeWidth={2.2} />
              </button>
            </div>
            <button className="btn btn--royal" onClick={onSearch}>
              <Search size={16} strokeWidth={2.4} />
              Find Experiences
            </button>
          </div>
          <div className="quick-row">
            <span className="quick-row__label">
              <Zap size={12} /> Try scenario:
            </span>
            {QUICK_PROMPTS.map((p) => {
              const Icon = PROMPT_ICONS[p.icon] || Zap;
              return (
                <button
                  key={p.label}
                  className="chip"
                  onClick={() => onPrompt(p.apply, p.label)}
                >
                  <Icon size={12} />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}