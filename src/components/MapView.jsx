import { Map, Compass, Navigation } from "lucide-react";
import { FEASIBILITY } from "../mockData/recommendations";

const USER = { x: 214, y: 246 };
const SEALINK_PYLONS = [[82, 112], [74, 98], [66, 84], [58, 70], [52, 58]];

const PIN_COLOR = {
  [FEASIBILITY.FITS]: "#2D5BFF",
  [FEASIBILITY.TIGHT]: "#C07A12",
  [FEASIBILITY.DOES_NOT_FIT]: "#9AA8C2",
};

function Pin({ exp, active, dim, onClick, onEnter, onLeave, showLabel }) {
  const color = PIN_COLOR[exp.feasibility];
  return (
    <g
      className={`map-pin ${active ? "map-pin--active" : ""} ${dim ? "map-pin--dim" : ""}`}
      transform={`translate(${exp.mapX}, ${exp.mapY})`}
      onClick={(e) => { e.stopPropagation(); onClick(exp.id); }}
      onMouseEnter={() => onEnter(exp.id)}
      onMouseLeave={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`${exp.name} (${exp.area}) — ${exp.feasibility}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          onClick(exp.id);
        }
      }}
      style={{ cursor: "pointer", outline: "none" }}
    >
      {active && <circle r={12} fill="none" stroke="#4B21E7" strokeWidth={2.5} opacity={0.65} />}
      <path d="M-4.5,4 L4.5,4 L0,11 Z" fill={color} stroke="#fff" strokeWidth={1} />
      <circle r={5.5} fill={active ? "#4B21E7" : color} stroke="#fff" strokeWidth={1.8} />
      {showLabel && (
        <text y={-12} textAnchor="middle" className="map-pin__label">{exp.name}</text>
      )}
    </g>
  );
}

export default function MapView({ ranked, selectedId, hoverId, onSelect, onHover }) {
  const focus = ranked.find((e) => e.id === selectedId) || ranked.find((e) => e.id === hoverId) || null;
  const routeExp = focus && focus.fits ? focus : null;
  const midX = (USER.x + (routeExp?.mapX ?? USER.x)) / 2;
  const midY = (USER.y + (routeExp?.mapY ?? USER.y)) / 2 - 26;

  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <div>
          <div className="panel-card__title"><Map size={15} /> Live map — South Mumbai</div>
          <div className="panel-card__sub">Stylized demo map · pins match the cards</div>
        </div>
        <span className="icon-btn" title="Map orientation (demo)">
          <Compass size={16} />
        </span>
      </div>

      <div className="map-card">
        <svg viewBox="0 0 420 360" role="img" aria-label="Stylized map of South Mumbai with experience markers">
          {/* land */}
          <rect width="420" height="360" fill="#f4f8fe" />
          {/* sea */}
          <path
            d="M0,0 H118 C104,58 116,108 98,150 C86,180 104,232 90,276 C80,306 96,334 118,360 H0 Z"
            fill="#cfe6f8"
          />
          <path
            d="M118,0 C104,58 116,108 98,150 C86,180 104,232 90,276 C80,306 96,334 118,360"
            fill="none" stroke="#6fa3dd" strokeWidth="2" opacity="0.7"
          />
          {/* waves */}
          {[40, 70, 100, 130].map((y) => (
            <path key={y} d={`M16,${y} q10,-6 20,0 q10,6 20,0`} stroke="#9cc4ea" strokeWidth="1.5" fill="none" opacity="0.7" />
          ))}
          {/* roads */}
          <g stroke="#bfcfe8" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M140,0 C150,90 130,150 150,220 C165,270 140,320 160,360" />
            <path d="M300,0 C290,80 310,160 295,240 C285,300 310,330 320,360" />
            <path d="M30,110 L260,95 L420,85" />
            <path d="M60,300 L320,285 L420,280" />
          </g>
          <g stroke="#d8e3f5" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M180,0 C185,90 175,180 190,270 C198,310 185,345 200,360" />
            <path d="M90,40 L340,55 L420,50" />
            <path d="M30,200 L280,190 L420,195" />
          </g>
          {/* railway */}
          <path d="M40,352 C160,322 300,300 402,268" stroke="#9fb2d4" strokeWidth="2.5" strokeDasharray="6 5" fill="none" />
          {/* Marine Drive crescent */}
          <path d="M126,150 C136,182 133,232 152,282" stroke="#6fa3dd" strokeWidth="4" fill="none" opacity="0.8" />
          {/* Sea Link */}
          <path d="M88,118 L52,44" stroke="#8fb0dc" strokeWidth="4" fill="none" opacity="0.9" />
          {SEALINK_PYLONS.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={2.6} fill="#5b7199" />
          ))}
          {/* Haji Ali causeway + islet */}
          <path d="M124,206 L100,200" stroke="#8fb0dc" strokeWidth="2.5" fill="none" opacity="0.7" />
          <circle cx="96" cy="199" r="5" fill="#eef4fc" stroke="#8fb0dc" strokeWidth="2" />

          {/* landmarks */}
          <g>
            <path d="M144,330 h16 a8,5 0 0 0 -16,0 Z" fill="#d9e5f7" stroke="#8ba1c4" strokeWidth="1.5" />
            <rect x="141" y="333" width="22" height="4" fill="#c3d2ea" />
            <circle cx="218" cy="250" r="4" fill="#d9e5f7" stroke="#8ba1c4" strokeWidth="1.5" />
            <rect x="211" y="254" width="14" height="6" fill="#c3d2ea" />
          </g>

          {/* labels */}
          <text x="200" y="240" className="map-label map-label--strong">Fort</text>
          <text x="160" y="296" className="map-label">Colaba</text>
          <text x="262" y="156" className="map-label">Byculla</text>
          <text x="138" y="26" className="map-label">Bandra</text>
          <text x="306" y="50" className="map-label">BKC</text>
          <text x="84" y="20" className="map-label">Juhu</text>
          <text x="120" y="118" className="map-label" transform="rotate(-72 120 118)">Marine Dr</text>
          <text x="30" y="226" className="map-label map-label--strong" transform="rotate(-90 30 226)">Arabian Sea</text>
          <text x="132" y="340" className="map-label" transform="rotate(-14 132 340)">Gateway</text>

          {/* route */}
          {routeExp && (
            <g>
              <path
                d={`M${USER.x},${USER.y} Q${midX},${midY} ${routeExp.mapX},${routeExp.mapY}`}
                className="map-route"
              />
              <circle cx={midX} cy={midY} r={9} fill="#0f9d9d" opacity={0.95} />
              <text x={midX} y={midY + 3} textAnchor="middle" className="map-travel-tag">
                {routeExp.travelTime}m
              </text>
            </g>
          )}

          {/* user */}
          <g transform={`translate(${USER.x}, ${USER.y})`}>
            <circle r={12} fill="#2D5BFF" opacity={0.18} className="map-user" />
            <circle r={6} fill="#0C2340" stroke="#fff" strokeWidth={2.2} />
            <text y={-11} textAnchor="middle" className="map-pin__label">You</text>
          </g>

          {/* experience pins */}
          {ranked.map((exp) => {
            const active = selectedId === exp.id;
            const isHover = hoverId === exp.id;
            return (
              <Pin
                key={exp.id}
                exp={exp}
                active={active || isHover}
                dim={focus && exp.id !== focus.id}
                onClick={onSelect}
                onEnter={onHover}
                onLeave={() => onHover(null)}
                showLabel={active || isHover}
              />
            );
          })}
        </svg>
      </div>

      <div className="map-legend">
        <span className="map-legend__item"><span className="map-legend__dot" style={{ background: "#2D5BFF" }} />Feasible</span>
        <span className="map-legend__item"><span className="map-legend__dot" style={{ background: "#C07A12" }} />Tight</span>
        <span className="map-legend__item"><span className="map-legend__dot" style={{ background: "#9AA8C2" }} />Doesn't fit</span>
        <span className="map-legend__item"><span className="map-legend__dot" style={{ background: "#0C2340" }} />You</span>
      </div>
      <p className="map-hint">
        {routeExp
          ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Navigation size={11} style={{ color: "#0f9d9d" }} />Route shown to {routeExp.name} — {routeExp.travelTime} min one-way</span>
          : "Hover a card or tap a pin to trace the route."}
      </p>
    </div>
  );
}