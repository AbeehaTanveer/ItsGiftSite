/**
 * BearFlowerScene
 * ---------------
 * An original, self-contained animated illustration (SVG + CSS): the white
 * bear hands a flower to the black bear, surrounded by floating balloons.
 * `isGiving` triggers the arm-extend + flower-travel + heart-pop animations.
 */
export default function BearFlowerScene({ className = '', isGiving = false }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="Cartoon white bear handing a flower to a black bear, with a cricket ball, football, and balloons floating around"
    >
      {/* Ground shadow */}
      <ellipse cx="200" cy="238" rx="150" ry="10" fill="#00000012" />

      {/* Floating cricket ball + football, plus a couple of balloons */}
      <g className="animate-balloon-float" style={{ animationDelay: '0s' }}>
        <circle cx="55" cy="82" r="16" fill="#A62639" stroke="#6E1522" strokeWidth="1.5" />
        <path d="M55 66 A16 16 0 0 1 55 98" stroke="#F2E4D8" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
      </g>
      <g className="animate-balloon-float" style={{ animationDelay: '0.6s' }}>
        <circle cx="340" cy="70" r="17" fill="#FFFFFF" stroke="#16233A" strokeWidth="1.5" />
        <path d="M328 60 L340 70 L352 60 M328 80 L340 70 L352 80" stroke="#16233A" strokeWidth="1.2" fill="none" />
        <polygon points="340,58 345,66 336,66" fill="#16233A" />
      </g>
      <g className="animate-balloon-float" style={{ animationDelay: '1.1s' }}>
        <line x1="30" y1="60" x2="34" y2="34" stroke="#B99B77" strokeWidth="2" />
        <ellipse cx="34" cy="26" rx="12" ry="15" fill="var(--color-accent-yellow)" />
        <path d="M30 40 L34 45 L38 40" fill="var(--color-accent-yellow)" />
      </g>
      <g className="animate-balloon-float" style={{ animationDelay: '1.7s' }}>
        <line x1="370" y1="150" x2="374" y2="122" stroke="#B99B77" strokeWidth="2" />
        <ellipse cx="374" cy="114" rx="13" ry="16" fill="var(--color-secondary)" />
        <path d="M369 129 L374 134 L379 129" fill="var(--color-secondary)" />
      </g>

      {/* --- White bear (giver), left side --- */}
      <g>
        <circle cx="92" cy="100" r="18" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
        <circle cx="126" cy="100" r="18" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
        <circle cx="92" cy="100" r="8" fill="#EDE9DE" />
        <circle cx="126" cy="100" r="8" fill="#EDE9DE" />

        <circle cx="109" cy="146" r="50" fill="#FAF8F3" stroke="#D9D4C6" strokeWidth="2" />
        <ellipse cx="109" cy="162" rx="27" ry="20" fill="#FFFFFF" />

        <ellipse cx="109" cy="222" rx="42" ry="30" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />

        {/* Happy eyes */}
        <path d="M96 142 Q101 136 106 142" stroke="#2B2620" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M112 142 Q117 136 122 142" stroke="#2B2620" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="98" cy="152" rx="6" ry="4" fill="#F0A98C" opacity="0.5" />
        <ellipse cx="120" cy="152" rx="6" ry="4" fill="#F0A98C" opacity="0.5" />

        {/* Smile */}
        <path d="M99 166 Q109 172 119 166" stroke="#2B2620" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Extending arm holding the flower */}
        <g className={isGiving ? 'animate-arm-extend' : ''}>
          <ellipse cx="150" cy="150" rx="11" ry="30" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />

          {/* Flower, travels toward the other bear once given */}
          <g className={isGiving ? 'animate-flower-travel' : ''}>
            <g transform="translate(150 118)">
              <line x1="0" y1="0" x2="0" y2="18" stroke="#6E7F52" strokeWidth="2.5" />
              <circle cx="0" cy="-6" r="4" fill="var(--color-accent-yellow)" />
              <ellipse cx="-8" cy="-2" rx="6" ry="4" fill="#E9707D" transform="rotate(-30 -8 -2)" />
              <ellipse cx="8" cy="-2" rx="6" ry="4" fill="#E9707D" transform="rotate(30 8 -2)" />
              <ellipse cx="-6" cy="-12" rx="6" ry="4" fill="#E9707D" transform="rotate(-60 -6 -12)" />
              <ellipse cx="6" cy="-12" rx="6" ry="4" fill="#E9707D" transform="rotate(60 6 -12)" />
              <ellipse cx="0" cy="-14" rx="5" ry="5" fill="#F2919C" />
            </g>
          </g>
        </g>

        {/* Other arm, resting */}
        <ellipse cx="68" cy="196" rx="11" ry="20" fill="#F5F3ED" stroke="#D9D4C6" strokeWidth="2" />
      </g>

      {/* --- Black bear (receiver), right side --- */}
      <g>
        <circle cx="272" cy="100" r="18" fill="#2B2620" />
        <circle cx="306" cy="100" r="18" fill="#2B2620" />
        <circle cx="272" cy="100" r="8" fill="#4A4238" />
        <circle cx="306" cy="100" r="8" fill="#4A4238" />

        <circle cx="289" cy="146" r="50" fill="#332D25" />
        <ellipse cx="289" cy="162" rx="27" ry="20" fill="#4A4238" />

        <ellipse cx="289" cy="222" rx="42" ry="30" fill="#2B2620" />

        {/* Delighted eyes */}
        <path d="M276 142 Q281 136 286 142" stroke="#E8E3D8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M292 142 Q297 136 302 142" stroke="#E8E3D8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="278" cy="152" rx="6" ry="4" fill="#E9707D" opacity="0.4" />
        <ellipse cx="300" cy="152" rx="6" ry="4" fill="#E9707D" opacity="0.4" />

        {/* Smile */}
        <path d="M279 166 Q289 174 299 166" stroke="#E8E3D8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Arms open to receive */}
        <ellipse cx="248" cy="150" rx="11" ry="28" fill="#332D25" transform="rotate(-15 248 150)" />
        <ellipse cx="330" cy="196" rx="11" ry="20" fill="#332D25" />
      </g>

      {/* Hearts pop up once the flower has been given */}
      {isGiving && (
        <g className="animate-heart-pop" style={{ animationDelay: '0.6s' }}>
          <text x="205" y="70" fontSize="22" fill="#E9707D">♥</text>
          <text x="225" y="55" fontSize="14" fill="#E9707D">♥</text>
        </g>
      )}
    </svg>
  );
}