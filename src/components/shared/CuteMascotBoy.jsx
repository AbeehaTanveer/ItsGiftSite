/**
 * CuteMascotBoy
 * -------------
 * An original chibi-style boy character (not based on any existing artwork
 * or IP) — messy dark hair, green eyes, blue & white cricket jersey, holding
 * a cricket bat. Gently bobs and blinks to feel alive without being distracting.
 */
export default function CuteMascotBoy({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 260"
      className={`animate-mascot-bob ${className}`}
      role="img"
      aria-label="Cute anime boy character in a cricket jersey, waving hello"
    >
      {/* Body / cricket jersey */}
      <ellipse cx="120" cy="208" rx="56" ry="44" fill="var(--color-primary)" />

      {/* White V-neck collar */}
      <path
        d="M98 176 L120 200 L142 176 L142 186 L120 210 L98 186 Z"
        fill="#FFFFFF"
      />

      {/* Side stripe accents, jersey-style */}
      <path d="M66 190 L74 244" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M174 190 L166 244" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

      {/* Waving arm (jersey sleeve) */}
      <g>
        <ellipse cx="181" cy="168" rx="14" ry="26" fill="var(--color-primary)" />
        <path d="M172 152 L190 152" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="189" cy="146" r="10" fill="#F3D4BE" />
      </g>

      {/* Other arm, resting — holding a cricket bat */}
      <ellipse cx="59" cy="184" rx="13" ry="24" fill="var(--color-primary-dark)" />
      <g transform="rotate(18 50 205)">
        <rect x="46" y="150" width="8" height="58" rx="3" fill="#D9A45B" />
        <rect x="45" y="204" width="10" height="30" rx="4" fill="#B97A3A" />
        <line x1="50" y1="204" x2="50" y2="234" stroke="#8C5A28" strokeWidth="1.5" />
      </g>

      {/* Head */}
      <circle cx="120" cy="112" r="60" fill="#F3D4BE" />

      {/* Ears */}
      <circle cx="61" cy="114" r="8" fill="#F3D4BE" />
      <circle cx="179" cy="114" r="8" fill="#F3D4BE" />

      {/* Messy dark hair, longer fringe swept to one side */}
      <path
        d="M58 108
           C50 68 78 34 120 36
           C158 34 190 62 182 104
           C176 84 166 96 156 82
           C150 100 132 90 126 74
           C118 96 100 88 92 100
           C86 84 70 90 66 108 Z"
        fill="#2B2620"
      />
      <path
        d="M96 66 C104 50 118 44 128 46 C118 52 108 62 104 76 Z"
        fill="#332D25"
      />
      <path
        d="M150 60 C158 52 168 52 176 60 C168 60 160 66 156 76 Z"
        fill="#332D25"
      />

      {/* Blush */}
      <ellipse cx="90" cy="128" rx="8" ry="5" fill="#F0A98C" opacity="0.55" />
      <ellipse cx="150" cy="128" rx="8" ry="5" fill="#F0A98C" opacity="0.55" />

      {/* Eyes — green, with blink animation */}
      <g className="animate-mascot-blink">
        <ellipse cx="100" cy="118" rx="7" ry="9.5" fill="#4E7B4E" />
        <ellipse cx="140" cy="118" rx="7" ry="9.5" fill="#4E7B4E" />
        <ellipse cx="100" cy="118" rx="3" ry="4" fill="#1E1B16" />
        <ellipse cx="140" cy="118" rx="3" ry="4" fill="#1E1B16" />
        <circle cx="102.5" cy="114" r="2" fill="#FFFFFF" />
        <circle cx="142.5" cy="114" r="2" fill="#FFFFFF" />
      </g>

      {/* Straight brows, slightly relaxed */}
      <line x1="91" y1="103" x2="107" y2="101" stroke="#2B2620" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="133" y1="101" x2="149" y2="103" stroke="#2B2620" strokeWidth="2.5" strokeLinecap="round" />

      {/* Small smile */}
      <path
        d="M110 138 Q120 144 130 138"
        stroke="#7A4A38"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}