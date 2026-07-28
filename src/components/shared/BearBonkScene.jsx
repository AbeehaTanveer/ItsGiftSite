/**
 * BearBonkScene
 * -------------
 * An original, self-contained animated illustration (SVG + CSS, no external
 * video/gif needed): a white bear bonks a black bear on the head, on a loop.
 * Purely cartoonish slapstick — no real characters, no external assets.
 */
export default function BearBonkScene({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      role="img"
      aria-label="Cartoon white bear bonking a black bear on the head"
    >
      {/* Ground shadow */}
      <ellipse cx="200" cy="222" rx="150" ry="10" fill="#00000012" />

      {/* --- Black bear (recipient), right side --- */}
      <g className="animate-bonk-recipient">
        <circle cx="272" cy="70" r="20" fill="#2B2620" />
        <circle cx="308" cy="70" r="20" fill="#2B2620" />
        <circle cx="272" cy="70" r="9" fill="#4A4238" />
        <circle cx="308" cy="70" r="9" fill="#4A4238" />

        <circle cx="290" cy="120" r="55" fill="#332D25" />
        <ellipse cx="290" cy="138" rx="30" ry="22" fill="#4A4238" />

        <ellipse cx="290" cy="205" rx="46" ry="34" fill="#2B2620" />

        {/* Dazed x_x eyes */}
        <g stroke="#E8E3D8" strokeWidth="3" strokeLinecap="round">
          <line x1="270" y1="112" x2="280" y2="122" />
          <line x1="280" y1="112" x2="270" y2="122" />
          <line x1="300" y1="112" x2="310" y2="122" />
          <line x1="310" y1="112" x2="300" y2="122" />
        </g>

        {/* wavy dazed mouth */}
        <path
          d="M278 145 Q284 150 290 145 Q296 140 302 145"
          stroke="#2B2620"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Dazed swirl stars above head */}
        <g className="animate-dazed-swirl" style={{ transformBox: 'fill-box' }}>
          <text x="278" y="42" fontSize="18">✦</text>
          <text x="298" y="36" fontSize="12">✧</text>
        </g>
      </g>

      {/* Impact "POW" burst between the bears */}
      <g className="animate-bonk-impact" style={{ transformBox: 'fill-box', transformOrigin: '250px 90px' }}>
        <path
          d="M250 60 L258 82 L280 78 L262 96 L272 118 L250 104 L228 118 L238 96 L220 78 L242 82 Z"
          fill="var(--color-accent-yellow)"
          stroke="#2B2620"
          strokeWidth="2"
        />
      </g>

      {/* --- White bear (attacker), left side --- */}
      <g>
        <circle cx="92" cy="70" r="20" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
        <circle cx="128" cy="70" r="20" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
        <circle cx="92" cy="70" r="9" fill="#EDE9DE" />
        <circle cx="128" cy="70" r="9" fill="#EDE9DE" />

        <circle cx="110" cy="120" r="55" fill="#FAF8F3" stroke="#D9D4C6" strokeWidth="2" />
        <ellipse cx="110" cy="138" rx="30" ry="22" fill="#FFFFFF" />

        <ellipse cx="110" cy="205" rx="46" ry="34" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />

        {/* Determined eyes */}
        <ellipse cx="98" cy="115" rx="4" ry="6" fill="#2B2620" />
        <ellipse cx="122" cy="115" rx="4" ry="6" fill="#2B2620" />

        {/* Little grin */}
        <path
          d="M100 142 Q110 148 120 142"
          stroke="#2B2620"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Raised bonking arm */}
        <g className="animate-bonk-arm" style={{ transformBox: 'fill-box' }}>
          <ellipse cx="150" cy="110" rx="13" ry="34" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
          <circle cx="150" cy="80" r="12" fill="#FAF8F3" stroke="#D9D4C6" strokeWidth="2" />
        </g>

        {/* Other arm, resting on hip */}
        <ellipse cx="72" cy="180" rx="12" ry="22" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
      </g>
    </svg>
  );
}