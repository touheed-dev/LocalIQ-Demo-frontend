// ---------------------------------------------------------------------------
// LocalIQ — mini-plan (itinerary) builder. Pure functions over mock data.
// ---------------------------------------------------------------------------

import { EXPERIENCE_BY_ID } from "./experiences.js";

export const DEMO_START = { label: "2:00 PM", hour: 14, minute: 0 };

const pad = (n) => String(n).padStart(2, "0");

export function fmtTime(totalMinutes) {
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(m)} ${period}`;
}

export function fmtDur(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${pad(m)}m` : `${h}h`;
}

export function buildItinerary(planIds, availableMinutes) {
  if (!planIds.length) return null;

  let cursor = DEMO_START.hour * 60 + DEMO_START.minute;
  const stops = [];

  for (let i = 0; i < planIds.length; i++) {
    const id = planIds[i];
    const exp = EXPERIENCE_BY_ID[id];
    const prev = i > 0 ? stops[i - 1].exp : null;
    
    // Calculate realistic transit: origin-to-first, or inter-stop walking/transit
    let transit = exp.travelTime;
    if (prev) {
      const nearby = prev.location === exp.location || 
                    (prev.area.includes("Fort") && exp.area.includes("Kala Ghoda")) ||
                    (prev.area.includes("Colaba") && exp.area.includes("Fort"));
      transit = nearby ? 7 : Math.round((prev.travelTime + exp.travelTime) * 0.35);
    }

    const depart = cursor;
    const arrive = depart + transit;
    const end = arrive + exp.duration;
    stops.push({
      expId: id,
      exp,
      depart,
      arrive,
      end,
      transit,
      duration: exp.duration,
    });
    cursor = end;
  }

  const last = stops[stops.length - 1];
  const returnStart = last.end;
  const returnEnd = returnStart + EXPERIENCE_BY_ID[last.expId].travelTime;

  const totalMinutes = returnEnd - (DEMO_START.hour * 60 + DEMO_START.minute);
  const totalCost = planIds.reduce(
    (sum, id) => sum + EXPERIENCE_BY_ID[id].price,
    0
  );
  const totalTravel = stops.reduce((s, st) => s + st.transit, 0) +
    EXPERIENCE_BY_ID[last.expId].travelTime;
  const totalExperience = stops.reduce((s, st) => s + st.duration, 0);

  const fits = totalMinutes <= availableMinutes;

  return {
    stops,
    returnStart,
    returnEnd,
    totalMinutes,
    totalCost,
    totalTravel,
    totalExperience,
    fits,
    overflow: Math.max(0, totalMinutes - availableMinutes),
  };
}

export function recheckPlan(itinerary, planIds, availableMinutes, weatherKey) {
  if (!itinerary) return { plan: planIds, note: null, adjusted: false };

  if (itinerary.fits) {
    return {
      plan: planIds,
      adjusted: false,
      note:
        weatherKey === "rain"
          ? "All stops verified: routes passable and weather-compatible (demo check)."
          : "All stops verified: routes and timing still hold (demo check).",
    };
  }

  // Simulated adaptation: drop the last stop to make the plan fit.
  const dropped = planIds[planIds.length - 1];
  const newPlan = planIds.slice(0, -1);
  const rebuilt = buildItinerary(newPlan, availableMinutes);
  return {
    plan: newPlan,
    rebuilt,
    adjusted: true,
    note: `One experience now overlaps — ${EXPERIENCE_BY_ID[dropped].name} was removed to fit your window.`,
  };
}