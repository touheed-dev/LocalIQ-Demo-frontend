<p align="center">
  <img src="public/logo.png" alt="LocalIQ Logo" width="320" />
</p>

<h1 align="center">LocalIQ — Discover Local. Smarter.</h1>

<p align="center">
  <strong>Feasibility-First Hyperlocal Experience Discovery Engine</strong><br />
  <em>Find experiences that are not just interesting — but realistically possible right now.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Demo%20Mode%20%C2%B7%20Simulated%20Real--Time%20Data-6366f1?style=for-the-badge" alt="Demo Mode Badge" />
  <img src="https://img.shields.io/badge/Platform-React%2018%20%2B%20Vite-06b6d4?style=for-the-badge" alt="Vite React Badge" />
  <img src="https://img.shields.io/badge/Pilot%20City-South%20Mumbai-f59e0b?style=for-the-badge" alt="South Mumbai Pilot" />
</p>

---

## 🌟 The Problem & The Solution

Most discovery platforms recommend places based purely on generic popularity, isolated ratings, or crowdsourced photos. They completely ignore real-world feasibility:

* **Travel time there and back** (users end up rushing or stranded).
* **Live micro-weather** (outdoor waterfront walks during heavy monsoon rain).
* **Operating schedules** (recommending markets when they are already closed).
* **Realistic budget windows** (entry tickets, hidden costs, food).

### LocalIQ’s Paradigm: Feasibility-First Discovery

LocalIQ does not just rank what is "popular". It performs **end-to-end feasibility calculation** before ranking:

$$\text{Total Time} = \text{Travel to Destination} + \text{Activity Duration} + \text{Return Journey Buffer}$$

$$\text{Achievable} = (\text{Total Time} \le \text{Available Time}) \land (\text{Cost} \le \text{Budget}) \land \text{IsOpen}(\text{Time}) \land \text{WeatherFit}(\text{Rain/Sunny})$$

Only options that survive this strict feasibility gate are presented as achievable right now, while others are transparently explained under *"Couldn't fit current conditions"*.

---

## 🧭 Live Demo Walkthrough (For Evaluators & Judges)

### 1. Default Preloaded Scenario (South Mumbai Pilot)
* **Constraints**: 2 Hours (`120 min`), `₹1,000` Budget, Active Rain (`rain`), `Couple`, Interests: `Culture + Food`.
* **Natural Engine Evaluation**:
  The discovery engine evaluates all 15 candidate experiences and visibly displays:
  > **`15 options found · 5 realistically achievable · adjusted for rain`**
* **The 5 Realistically Achievable Stops**:
  1. **Irani Café Trail** (Fort) — Cozy indoor rain refuge with hot cutting chai & bun maska (58 min total, ₹350).
  2. **Kala Ghoda Art Walk** (Fort) — Sheltered heritage colonnades & art bookstores (73 min total, ₹150).
  3. **Mani Bhavan Gandhi Museum** (Gamdevi) — Historical house museum, 100% indoors (77 min total, ₹50).
  4. **Colaba Causeway Food & Market** (Colaba) — Covered heritage awnings & hot street food (80 min total, ₹400).
  5. **Jehangir Art Gallery** (Kala Ghoda) — Modernist exhibition hall, fast indoor visit (55 min total, Free).
* **The 10 Infeasible Stops**:
  Transparently categorized with explicit reasons (e.g., *Marine Drive open seafront hazard during heavy rain*, *Gateway of India outdoor ferry cancelled*, *CSMVS 90m visit exceeds remaining buffer*, *Sassoon Dock closed at 2 PM*).

---

### 2. Dynamic Adaptation ("What-If" Scenario Simulation)

Experience discovery is dynamic. Evaluators can test LocalIQ's client-side adaptation engine in real time:

#### ⚡ Scenario A: The 60-Minute Rush
* Move the **Time Window slider: 120 min → 60 min** (or click the quick prompt *"Quick 1 Hour · ₹500"*).
* **Behavior**:
  * The card grid pulses with a re-ranking glow.
  * Longer walks drop into infeasible.
  * Quick, nearby indoor experiences (**Jehangir Art Gallery** at 55m and **Irani Café** at 58m) rise to the top.

#### ☀️ Scenario B: The Weather Clears
* Toggle **Weather: Rain → Sunny**.
* **Behavior**:
  * Feasible count instantly jumps from 5 to **9**.
  * Iconic outdoor waterfronts (**Marine Drive Sunset**, **Gateway of India**, **Worli Sea Face**, and **Haji Ali**) unlock immediately with boosted weather compatibility scores.

#### ⏱️ Scenario C: The Afternoon Expands
* Move the **Time Window slider: 60 min → 180 min**.
* **Behavior**:
  * Deeper cultural visits unlock (e.g. *Dr. Bhau Daji Lad Museum* and *CSMVS Museum*).
  * The mini-plan dynamically expands to accommodate multi-stop experiences.

#### 💎 Scenario D: Local Gems vs. Tourist Icons
* Drag the **Local Gems ↔ Touristy** slider.
* **Behavior**:
  * Re-weights ranking from global tourist icons (Gateway of India, Marine Drive) to authentic neighborhood cultural secrets (Irani cafes, Kala Ghoda book arcades).

---

### 3. Sequenced Itinerary ("My Plan")
* Navigate to **My Plan** in the top navigation bar.
* Pre-seeded with a realistic 2-stop South Mumbai afternoon:
  * **Stop 1: Irani Café Trail** (14:00 – 14:49)
  * **Walking Transit**: 7 minutes between Fort and Kala Ghoda
  * **Stop 2: Jehangir Art Gallery** (14:56 – 15:31)
  * **Safe Return Buffer**: Arrives back by 15:41 (Total: 101 min / 120 min window, ₹460 / ₹1,000 budget).
* Click **Re-check Plan** to simulate live route verification.
* Click **Reset to Demo Plan** to restore this state at any time.

---

### 4. Saved Experiences
* Navigate to **Saved** in the navbar to inspect pre-seeded bookmarks saved for longer or clearer windows (*CSMVS Museum* and *Marine Drive Sunset*).
* Click **Reset Demo Saves** to restore.

---

## 🏗️ Architecture: Prototype vs. Planned Production

### Current Prototype Architecture (100% Client-Side Simulation)
To guarantee high-speed, zero-dependency demo evaluation:

```
  React 18 + Vite UI Layer
            │
            ▼
  Local Mock Data Layer
    ├── experiences.js       (15 curated South Mumbai venues + HD photos + metadata)
    ├── weather.js           (Precipitation radar, temperature, traffic feeds)
    └── itinerary.js         (Pre-seeded sequence + transit matrix simulation)
            │
            ▼
  Client-Side Recommendation Engine (recommendations.js)
    ├── End-to-end feasibility validator (time, budget, hours, weather)
    ├── Multi-criteria scoring & re-ranking pipeline
    └── Transparent explanation generator ("Why this fits" + "Why ranked here")
            │
            ▼
  Interactive UI Views
    ├── Experience Cards (Feasibility badge, photo hero, quick actions)
    ├── Stylized South Mumbai SVG Map (Route lines, interactive pins)
    ├── What-If Sandbox Controls (Live time/budget/weather sliders)
    └── Mini-Plan Builder & Saved Experiences
```

> **Transparency Note**: The UI includes a subtle badge:  
> `Demo Mode · Simulated real-time data` to ensure complete clarity with judges.

---

### Planned Production Architecture (Target Backend)

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

## 📸 Authentic Visual Assets

* **Official LocalIQ Logo**: Features the Gateway of India skyline inside the magnifying "Q" pin with the signature purple-to-blue gradient.
* **Editorial Photography**: 13 high-definition authentic photographs of South Mumbai landmarks, colonial arcades, and culinary heritage (located in `public/images/`) with automatic SVG fallback resilience.

---

## 💻 Running the Demo Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/touheed-dev/LocalIQ-Demo-frontend.git
cd LocalIQ-Demo-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173/** in your browser.  
*(Optimized for desktop viewports at **1440×900**).*

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📄 License & Attribution
Developed for the **LocalIQ Project**. All South Mumbai location data, route benchmarks, and photography are calibrated for demonstration and evaluation.
