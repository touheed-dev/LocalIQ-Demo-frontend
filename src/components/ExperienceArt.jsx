// ---------------------------------------------------------------------------
// LocalIQ — stylized editorial illustrations for experience thumbnails.
// Self-contained SVGs (no external images): each scene matches a category.
// ---------------------------------------------------------------------------

const PALETTE = {
  navy: "#16325C",
  royal: "#2D5BFF",
  violet: "#7A5CFF",
  teal: "#1B9E9E",
  orange: "#E07B39",
  pink: "#D9588A",
  gold: "#C99B3F",
  ink: "#23395F",
  line: "#C9D8EF",
  sand: "#F6E7CE",
};

const BG = { from: "#EEF3FC", to: "#DFE9F8" };

function Frame({ children, from = BG.from, to = BG.to }) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="14" fill="url(#bg)" />
      {children}
    </svg>
  );
}

const gallery = (
  <Frame>
    <rect x="18" y="26" width="60" height="44" rx="4" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <circle cx="40" cy="46" r="8" fill={PALETTE.orange} opacity="0.85" />
    <path d="M56 42 L70 54 L58 62 Z" fill={PALETTE.violet} opacity="0.85" />
    <rect x="84" y="34" width="22" height="30" rx="3" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <circle cx="95" cy="46" r="6" fill={PALETTE.teal} opacity="0.8" />
    <path d="M30 92 h60" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    <path d="M34 84 h20 l6 8 h-20 z" fill={PALETTE.royal} opacity="0.85" />
  </Frame>
);

const cafe = (
  <Frame>
    <rect x="30" y="34" width="60" height="10" rx="5" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <path d="M58 24 q3 -8 -2 -12 M72 24 q3 -8 -2 -12" stroke={PALETTE.violet} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M90 40 h8 a6 6 0 0 1 0 12 h-8" fill="none" stroke={PALETTE.royal} strokeWidth="4" />
    <rect x="44" y="52" width="34" height="26" rx="6" fill={PALETTE.sand} stroke={PALETTE.gold} strokeWidth="2" />
    <path d="M48 62 h26 M52 70 h16" stroke={PALETTE.gold} strokeWidth="2" strokeLinecap="round" />
    <rect x="32" y="84" width="56" height="8" rx="4" fill={PALETTE.ink} opacity="0.5" />
  </Frame>
);

const museum = (
  <Frame>
    <path d="M22 74 L60 30 L98 74 Z" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="34" y="70" width="52" height="18" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="46" y="34" width="28" height="14" rx="7" fill={PALETTE.violet} opacity="0.8" />
    <circle cx="60" cy="28" r="6" fill={PALETTE.gold} />
    <rect x="42" y="78" width="8" height="10" fill={PALETTE.navy} opacity="0.6" />
    <rect x="56" y="78" width="8" height="10" fill={PALETTE.navy} opacity="0.6" />
    <rect x="70" y="78" width="8" height="10" fill={PALETTE.navy} opacity="0.6" />
    <path d="M20 92 h80" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
  </Frame>
);

const market = (
  <Frame>
    <rect x="20" y="40" width="34" height="34" fill={PALETTE.orange} opacity="0.9" />
    <rect x="62" y="36" width="34" height="38" fill={PALETTE.teal} opacity="0.85" />
    <path d="M20 40 l8 -10 l8 10 Z" fill={PALETTE.orange} opacity="0.55" />
    <path d="M62 36 l8 -10 l8 10 Z" fill={PALETTE.teal} opacity="0.55" />
    <rect x="27" y="46" width="20" height="6" rx="3" fill="#fff" opacity="0.85" />
    <rect x="69" y="42" width="20" height="6" rx="3" fill="#fff" opacity="0.85" />
    <circle cx="70" cy="62" r="5" fill={PALETTE.violet} />
    <circle cx="84" cy="62" r="5" fill={PALETTE.pink} />
    <path d="M26 78 q6 5 12 0 q6 5 12 0" stroke={PALETTE.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
  </Frame>
);

const food = (
  <Frame>
    <circle cx="60" cy="56" r="28" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <circle cx="60" cy="56" r="20" fill={PALETTE.sand} />
    <path d="M60 36 a20 20 0 0 1 14 34" stroke={PALETTE.orange} strokeWidth="4" fill="none" opacity="0.9" />
    <circle cx="46" cy="62" r="4" fill={PALETTE.teal} />
    <circle cx="68" cy="48" r="4" fill={PALETTE.pink} />
    <circle cx="70" cy="64" r="3.5" fill={PALETTE.royal} />
    <path d="M40 96 h40" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
    <path d="M92 30 q4 -6 8 -2 M84 24 q4 -6 8 -2" stroke={PALETTE.violet} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
  </Frame>
);

const landmark = (
  <Frame>
    <path d="M46 84 V62 a14 10 0 0 1 28 0 V84 Z" fill="#fff" stroke={PALETTE.line} strokeWidth="2.5" />
    <rect x="44" y="84" width="32" height="6" fill={PALETTE.navy} opacity="0.75" />
    <path d="M40 88 h40" stroke={PALETTE.navy} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M32 34 q2 8 10 10 q-8 2 -10 10 q-2 -8 -10 -10 q8 -2 10 -10 Z" fill={PALETTE.royal} opacity="0.8" />
    <path d="M88 40 q1.5 6 7.5 7.5 q-6 1.5 -7.5 7.5 q-1.5 -6 -7.5 -7.5 q6 -1.5 7.5 -7.5 Z" fill={PALETTE.violet} opacity="0.75" />
  </Frame>
);

const seafront = (
  <Frame>
    <path d="M8 66 q14 -14 30 -8 q16 6 30 -6 q14 -12 44 -4 v38 H8 Z" fill={PALETTE.royal} opacity="0.22" />
    <path d="M8 62 q14 -14 30 -8 q16 6 30 -6 q14 -12 44 -4" fill="none" stroke={PALETTE.royal} strokeWidth="3.5" opacity="0.65" />
    <path d="M14 74 q4 -3 8 0 q4 3 8 0 M44 74 q4 -3 8 0 q4 3 8 0" stroke={PALETTE.teal} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
    <circle cx="96" cy="24" r="9" fill={PALETTE.gold} opacity="0.85" />
    <path d="M86 24 h20 M96 14 v20" stroke={PALETTE.gold} strokeWidth="2" opacity="0.6" />
  </Frame>
);

const heritage = (
  <Frame>
    <rect x="28" y="44" width="64" height="44" rx="3" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="52" y="30" width="16" height="14" rx="2" fill={PALETTE.violet} opacity="0.75" />
    <circle cx="60" cy="22" r="7" fill={PALETTE.gold} />
    <rect x="36" y="50" width="12" height="16" rx="2" fill={PALETTE.royal} opacity="0.7" />
    <rect x="72" y="50" width="12" height="16" rx="2" fill={PALETTE.royal} opacity="0.7" />
    <rect x="36" y="72" width="48" height="3" fill={PALETTE.ink} opacity="0.35" />
    <path d="M24 90 q12 -5 24 0 q12 5 24 0 q12 -5 24 0" stroke={PALETTE.teal} strokeWidth="2.5" fill="none" opacity="0.6" />
  </Frame>
);

const art = (
  <Frame>
    <rect x="16" y="30" width="88" height="56" rx="4" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="24" y="38" width="22" height="22" rx="2" fill={PALETTE.teal} opacity="0.7" />
    <rect x="52" y="38" width="22" height="22" rx="2" fill={PALETTE.pink} opacity="0.6" />
    <rect x="80" y="38" width="16" height="22" rx="2" fill={PALETTE.violet} opacity="0.6" />
    <rect x="24" y="66" width="22" height="12" rx="2" fill={PALETTE.orange} opacity="0.7" />
    <rect x="52" y="66" width="44" height="12" rx="2" fill={PALETTE.royal} opacity="0.6" />
    <path d="M20 96 h80" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
  </Frame>
);

const docks = (
  <Frame>
    <path d="M10 76 h100 v10 H10 Z" fill={PALETTE.royal} opacity="0.25" />
    <path d="M10 76 q8 -5 16 0 q8 5 16 0 q8 -5 16 0" stroke={PALETTE.teal} strokeWidth="2.5" fill="none" opacity="0.7" />
    <path d="M30 84 q0 -22 6 -34 h26 q6 12 6 34 Z" fill={PALETTE.orange} opacity="0.85" />
    <path d="M36 84 q0 -16 4 -26 h18 q4 10 4 26 Z" fill={PALETTE.sand} opacity="0.9" />
    <path d="M30 50 l14 -6 l14 6 v8 l-14 -4 l-14 4 Z" fill={PALETTE.navy} opacity="0.6" />
    <path d="M62 46 l-4 -10 h6 l4 10 Z" fill={PALETTE.pink} opacity="0.7" />
    <path d="M76 34 q2 -4 4 -2 M70 40 q2 -4 4 -2" stroke={PALETTE.ink} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" />
  </Frame>
);

const mall = (
  <Frame>
    <rect x="18" y="34" width="46" height="50" rx="3" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="24" y="40" width="16" height="14" fill={PALETTE.royal} opacity="0.65" />
    <rect x="44" y="40" width="14" height="14" fill={PALETTE.teal} opacity="0.65" />
    <rect x="24" y="60" width="34" height="18" fill={PALETTE.violet} opacity="0.45" />
    <rect x="70" y="26" width="32" height="58" rx="3" fill="#fff" stroke={PALETTE.line} strokeWidth="2" />
    <rect x="75" y="32" width="22" height="18" rx="2" fill={PALETTE.orange} opacity="0.65" />
    <rect x="75" y="56" width="22" height="22" rx="2" fill={PALETTE.pink} opacity="0.55" />
    <path d="M22 92 h76" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
  </Frame>
);

import { useState } from "react";

const SCENES = {
  gallery,
  cafe,
  museum,
  market,
  food,
  landmark,
  seafront,
  heritage,
  art,
  docks,
  mall,
};

export default function ExperienceArt({
  art = "gallery",
  size = 96,
  image = null,
  name = "",
  className = "",
}) {
  const [hasError, setHasError] = useState(false);

  if (image && !hasError) {
    return (
      <div
        className={`art art--photo ${className}`}
        style={{ width: size, height: size, flex: `0 0 ${size}px` }}
      >
        <img
          src={image}
          alt={name || "Experience"}
          className="art__img"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`art ${className}`}
      style={{ width: size, height: size, flex: `0 0 ${size}px` }}
    >
      {SCENES[art] || gallery}
    </div>
  );
}

export { SCENES, PALETTE };