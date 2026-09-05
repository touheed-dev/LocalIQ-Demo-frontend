// ---------------------------------------------------------------------------
// LocalIQ — simulated live context (weather, day, time, traffic).
// Mock values stand in for weather APIs + live transit feeds.
// ---------------------------------------------------------------------------

export const WEATHER_MODES = {
  rain: {
    key: "rain",
    label: "Rain expected",
    temp: 28,
    icon: "rain",
    message: "Outdoor experiences have been deprioritized.",
    detail: "Indoor picks — museums, cafés, galleries — are ranked first.",
  },
  sunny: {
    key: "sunny",
    label: "Sunny · 31°C",
    temp: 31,
    icon: "sun",
    message: "Great conditions for walking.",
    detail: "Outdoor experiences are boosted in the ranking.",
  },
};

export const DEMO_CONTEXT = {
  location: "Mumbai, Maharashtra",
  locationShort: "Mumbai",
  day: "Monday",
  date: "5 Sep",
  timeLabel: "2:00 PM",
  hour: 14, // 24h
  traffic: "Moderate traffic",
  trafficLevel: "moderate",
};