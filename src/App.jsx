import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { CheckCircle2, Mic } from "lucide-react";
import Navbar from "./components/Navbar";
import ContextBar from "./components/ContextBar";
import SearchHero from "./components/SearchHero";
import ConstraintPanel from "./components/ConstraintPanel";
import ExperienceResults from "./components/ExperienceResults";
import MapView from "./components/MapView";
import WhatIfPanel from "./components/WhatIfPanel";
import MiniPlan from "./components/MiniPlan";
import ExperienceDetail from "./components/ExperienceDetail";
import SavedView from "./components/SavedView";
import MyPlanView from "./components/MyPlanView";
import AboutView from "./components/AboutView";
import { EXPERIENCES, EXPERIENCE_BY_ID, DEFAULT_QUERY, VOICE_QUERY } from "./mockData/experiences";
import { WEATHER_MODES, DEMO_CONTEXT } from "./mockData/weather";
import { rankExperiences } from "./mockData/recommendations";
import { timeLabel } from "./mockData/experiences";

const BASE = { time: 120, budget: 1000, weather: "rain" };

export default function App() {
  const [view, setView] = useState("explore");
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [searched, setSearched] = useState(true); // preloaded demo scenario
  const [constraints, setConstraints] = useState({
    time: BASE.time,
    budget: BASE.budget,
    interests: ["Culture", "Food"],
    group: "Couple",
    accessibility: "any",
    pref: 20, // 0 = Local Gems ... 100 = Tourist Highlights
  });
  const [weather, setWeather] = useState("rain");
  const [selectedId, setSelectedId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  // Pre-seeded demo states for judges
  const [saved, setSaved] = useState([
    { id: "e3", date: "Today" },
    { id: "e7", date: "Today" },
  ]);
  const [plan, setPlan] = useState(["e2", "e9"]);
  const [rerankPulse, setRerankPulse] = useState(false);
  const [listening, setListening] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const triggerPulse = () => {
    setRerankPulse(true);
    setTimeout(() => setRerankPulse(false), 450);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const weatherObj = WEATHER_MODES[weather];

  const opts = useMemo(
    () => ({
      ...constraints,
      weather: weatherObj,
      timeLabel: timeLabel(constraints.time),
    }),
    [constraints, weatherObj]
  );

  const ranked = useMemo(() => {
    let pool = EXPERIENCES;
    if (constraints.accessibility !== "any") {
      pool = pool.filter((e) => e.accessibility.includes(constraints.accessibility));
    }
    return rankExperiences(pool, {
      time: constraints.time,
      budget: constraints.budget,
      interests: constraints.interests,
      group: constraints.group,
      pref: constraints.pref,
      weather: weatherObj,
      now: DEMO_CONTEXT.hour,
    });
  }, [constraints, weatherObj]);

  const selected = selectedId ? EXPERIENCE_BY_ID[selectedId] : null;

  const updateConstraint = (key, value) => {
    setConstraints((c) => ({ ...c, [key]: value }));
    triggerPulse();
    if (key === "pref") return;
    notify("Recommendations updated");
  };

  const handleSearch = () => {
    setSearched(true);
    setView("explore");
    triggerPulse();
    notify("Searching local experiences…");
  };

  const handlePrompt = (apply, label) => {
    setQuery(`Looking for ${label.toLowerCase()} — something realistic for today.`);
    setConstraints((c) => ({
      ...c,
      time: apply.time ?? c.time,
      budget: apply.budget ?? c.budget,
      interests: apply.interests ?? c.interests,
      group: apply.group ?? c.group,
    }));
    if (apply.weather) setWeather(apply.weather);
    setSearched(true);
    triggerPulse();
    notify(`Scenario loaded: ${label}`);
  };

  const handleMic = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      setQuery(VOICE_QUERY);
      setConstraints((c) => ({ ...c, time: 120, budget: 700, interests: ["Culture", "Local Life"] }));
      setSearched(true);
      triggerPulse();
      notify("Voice input understood (demo)");
    }, 1500);
  };

  const handleWhatIf = (key, value) => {
    if (key === "weather") setWeather(value);
    else setConstraints((c) => ({ ...c, [key]: value }));
    triggerPulse();
    notify("Recommendations updated");
  };

  const handleWhatIfReset = () => {
    setConstraints((c) => ({ ...c, time: BASE.time, budget: BASE.budget }));
    setWeather(BASE.weather);
    triggerPulse();
    notify("Reset to demo scenario");
  };

  const toggleSave = (id) => {
    setSaved((s) => {
      const exists = s.find((x) => x.id === id);
      if (exists) {
        notify("Removed from saved");
        return s.filter((x) => x.id !== id);
      }
      const d = new Date();
      notify("Saved for later");
      return [...s, { id, date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) }];
    });
  };

  const togglePlan = (id) => {
    setPlan((p) => {
      if (p.includes(id)) {
        notify("Removed from mini-plan");
        return p.filter((x) => x !== id);
      }
      if (p.length >= 3) {
        notify("Mini-plan supports up to 3 stops");
        return p;
      }
      notify("Added to mini-plan");
      return [...p, id];
    });
  };

  const removeFromPlan = (id) => {
    setPlan((p) => {
      notify("Removed from mini-plan");
      return p.filter((x) => x !== id);
    });
  };

  const whatIfValues = { time: constraints.time, budget: constraints.budget, weather };
  const savedIds = saved.map((s) => s.id);

  return (
    <div className="app">
      <Navbar
        view={view}
        onNavigate={setView}
        planCount={plan.length}
        savedCount={saved.length}
        location={DEMO_CONTEXT.location}
      />

      {view === "explore" && (
        <>
          <ContextBar weather={weatherObj} />
          <SearchHero
            compact={searched}
            query={query}
            onQuery={setQuery}
            onSearch={handleSearch}
            onMic={handleMic}
            onPrompt={handlePrompt}
          />
          <main className="explore-main">
            <div className="container">
              <ConstraintPanel constraints={constraints} onUpdate={updateConstraint} />
              <div className="explore-grid" style={{ marginTop: 16 }}>
                <ExperienceResults
                  ranked={ranked}
                  opts={{ ...opts, onPref: (v) => updateConstraint("pref", v) }}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onHover={setHoverId}
                  savedIds={savedIds}
                  onToggleSave={toggleSave}
                  onAddToPlan={togglePlan}
                  planIds={plan}
                  rerankPulse={rerankPulse}
                />
                <aside className="rail">
                  <MapView
                    ranked={ranked}
                    selectedId={selectedId}
                    hoverId={hoverId}
                    onSelect={setSelectedId}
                    onHover={setHoverId}
                  />
                  <WhatIfPanel
                    values={whatIfValues}
                    base={BASE}
                    onChange={handleWhatIf}
                    onReset={handleWhatIfReset}
                  />
                  <MiniPlan
                    planIds={plan}
                    availableTime={constraints.time}
                    onOpenPlan={() => setView("plan")}
                    onRemove={removeFromPlan}
                  />
                </aside>
              </div>
            </div>
          </main>
        </>
      )}

      {view === "plan" && (
        <MyPlanView
          planIds={plan}
          availableTime={constraints.time}
          weather={weatherObj}
          onUpdatePlan={setPlan}
          onExplore={() => setView("explore")}
        />
      )}

      {view === "saved" && (
        <SavedView
          saved={saved}
          onRemove={(id) => toggleSave(id)}
          onExplore={() => setView("explore")}
          onResetSaved={() => {
            setSaved([
              { id: "e3", date: "Today" },
              { id: "e7", date: "Today" },
            ]);
            notify("Reset to demo saved experiences");
          }}
        />
      )}

      {view === "about" && <AboutView />}

      {selected && (
        <ExperienceDetail
          exp={selected}
          opts={opts}
          onClose={() => setSelectedId(null)}
          saved={savedIds.includes(selected.id)}
          onToggleSave={toggleSave}
          onAddToPlan={togglePlan}
          inPlan={plan.includes(selected.id)}
        />
      )}

      {listening && (
        <div className="voice-overlay">
          <div className="voice-card">
            <div className="voice-card__mic">
              <Mic size={26} />
            </div>
            <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: 15 }}>Listening…</p>
            <p>Say what you want to experience</p>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}
    </div>
  );
}