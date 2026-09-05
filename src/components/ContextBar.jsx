import { CloudRain, Sun, CalendarDays, Clock, TrafficCone, MapPin, Sparkles } from "lucide-react";
import { DEMO_CONTEXT } from "../mockData/weather";

export default function ContextBar({ weather }) {
  const W = weather.key === "rain" ? CloudRain : Sun;
  const isRain = weather.key === "rain";
  return (
    <div className="context-bar">
      <div className="container context-bar__inner">
        <span className="ctx-item">
          <MapPin size={13} />
          <b>{DEMO_CONTEXT.location}</b>
        </span>
        <span className="ctx-item">
          <CalendarDays size={13} />
          {DEMO_CONTEXT.day}, {DEMO_CONTEXT.date}
        </span>
        <span className="ctx-item">
          <Clock size={13} />
          {DEMO_CONTEXT.timeLabel}
        </span>
        <span className="ctx-weather">
          <W size={13} />
          <b>{weather.temp}°C</b> · {weather.label}
        </span>
        <span className="ctx-item">
          <TrafficCone size={13} />
          {DEMO_CONTEXT.traffic}
        </span>
        <span className="ctx-msg">
          <Sparkles size={12} />
          {isRain
            ? "Outdoor experiences deprioritized · indoor picks ranked first"
            : "Great conditions · outdoor picks boosted"}
        </span>
      </div>
    </div>
  );
}