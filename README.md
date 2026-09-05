# LocalIQ — Discover Local. Smarter.

> **Feasibility-First Hyperlocal Experience Discovery Engine**  
> *Find experiences that are not just interesting — but realistically possible right now.*

---

## 🌟 Overview

Most discovery platforms recommend places based purely on generic popularity or reviews, completely ignoring real-world feasibility: **travel time there and back, active monsoon rain, opening hours, and budget windows**.

**LocalIQ** flips the paradigm with **Feasibility-First Discovery**:
1. **End-to-End Travel Math**: Computes `origin → travel → activity duration → return journey buffer` to ensure the user never gets stranded.
2. **Live Context Adaptation**: Dynamically factors in precipitation radar, operating hours, and neighborhood foot traffic.
3. **Transparent Explanations**: Surfaces explicit "Why this fits" facts and multi-criteria score breakdowns instead of black-box rankings.
4. **Dynamic What-If Sandbox**: Sliders for time, budget, and weather that re-rank and re-adapt recommendations instantly in real time.
5. **Sequential Mini-Plan Builder**: Turns candidate stops into a feasible, time-budgeted 2–3 stop itinerary with real-time route verification.

---

## 🧭 Live Demo Walkthrough (For Evaluators & Judges)

### 1. Default Preloaded Scenario (Mumbai Pilot)
- **Constraints**: 2 Hours (`120 min`), `₹1,000` Budget, Active Rain (`rain`), `Couple`, Interests: `Culture + Food`.
- **Observation**:
  - The results header displays: **`15 options found · 5 realistically achievable · adjusted for rain`**.
  - Top 5 Feasible Candidates naturally computed:
    1. **Irani Café Trail** (Fort) — Cozy indoor rain refuge with hot cutting chai & bun maska.
    2. **Kala Ghoda Art Walk** (Fort) — Sheltered heritage colonnades & art bookstores.
    3. **Mani Bhavan Gandhi Museum** (Gamdevi) — Preserved historical house museum, 100% indoors.
    4. **Colaba Causeway Food & Market** (Colaba) — Covered heritage awnings & hot street food.
    5. **Jehangir Art Gallery** (Kala Ghoda) — Modernist exhibition hall, fast indoor visit.
  - Infeasible candidates (e.g. *Gateway of India open ferries*, *Marine Drive open promenade*, *CSMVS 90m museum visit*, and *Sassoon Dock closed at 2 PM*) are cleanly separated into **"Couldn't fit current conditions (10)"** with exact transparent explanations.

### 2. Test Dynamic Adaptation (What-If Controls)
- **Scenario A (Quick 1-Hour Rush)**:
  - Drag the **Time Window slider from 120 min → 60 min** (or click the quick prompt *"Quick 1 Hour · ₹500"*).
  - *Result*: The card grid pulses with a re-rank animation. The longer walks drop out, and fast nearby stops (*Jehangir Art Gallery* and *Irani Café Quick Chai*) rise to the top.
- **Scenario B (Weather Clears to Sunny)**:
  - Toggle **Weather from Rain → Sunny**.
  - *Result*: Feasible count jumps from 5 to **9**. Iconic outdoor waterfronts (*Marine Drive Sunset*, *Gateway of India*, *Worli Sea Face*) immediately unlock with boosted weather scores.
- **Scenario C (Local Gems vs Tourist Highlights)**:
  - Slide the preference bar between **Local Gems** (score 90+ hidden spots) and **Touristy** (global icons).

### 3. Review Sequenced Itinerary (My Plan)
- Click **My Plan** in the top navigation.
- See the pre-seeded 2-stop South Mumbai afternoon:
  - **Stop 1: Irani Café Trail** (14:00 – 14:49)
  - **Stop 2: Jehangir Art Gallery** (14:49 – 15:31, with 7 min walking transit between Fort & Kala Ghoda)
  - **Return**: Arrives 15:41 (Total 101 min / 120 min window, ₹460 / ₹1000 budget).
- Click **Re-check Plan** to simulate live route verification.

### 4. Review Saved Experiences
- Click **Saved** in the navbar to see pre-seeded aspirational saves (*CSMVS Museum* and *Marine Drive Sunset*) saved for longer or clearer windows.

---

## 🏗️ Architecture & Production Roadmap

### Current Prototype (Fully Functional Frontend Simulation)
This demo is a self-contained, interactive client-side prototype:
- `src/mockData/experiences.js`: Simulated experience repository (15 curated Mumbai experiences with coordinates, operating hours, durations, accessibility tags, and high-definition photography).
- `src/mockData/recommendations.js`: Pure mathematical scoring and feasibility pipeline executing the full criteria checklist.
- `src/mockData/weather.js`: Simulated live context feeds (rain vs sunny, temperature, traffic).
- `src/mockData/itinerary.js`: Sequenced route builder and timeline generator.
- **UI & Design**: React 18 + Vite, custom CSS design system tailored to the official LocalIQ purple-to-blue gradient brand identity, responsive at **1440×900 desktop** down to mobile.

### Planned Production Architecture (Target Implementation)
```
  React 18 + Vite Frontend
            │ (REST / JSON & WebSockets)
            ▼
  FastAPI Backend Gateway (Python 3.11+)
    ├── PostgreSQL (Relational venue metadata, operating hours, pricing tiers, geofences)
    ├── Qdrant Vector DB (768-dim embeddings for natural language intent & semantic vibe queries)
    └── Real-Time External API Connectors:
          ├── Google Places API (live operating status, busy hour curves, verified ratings)
          ├── Google Maps / Routes API (real-time multimodal transit matrices & live delay buffers)
          └── Open-Meteo API (hourly radar, rain probability, heat index, and UV levels)
```

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 🎨 Brand Identity
- **Logo Asset**: Official LocalIQ logo featuring the Gateway of India skyline inside the magnifying "Q" pin with purple-to-blue gradient.
- **Typography**: Inter (UI body) + Space Grotesk (numerical scores and metrics).
- **Aesthetic**: Premium glassmorphism, contextual status badges, interactive stylized SVG South Mumbai map, and authentic editorial photography.
