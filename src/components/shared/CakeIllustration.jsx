/**
 * CakeIllustration
 * ----------------
 * An original SVG cake illustration (three-tier, blue/white cricket-jersey
 * palette) with the celebration text arcing along a curve above it, plus
 * small cricket-bat and football fondant decorations.
 *
 * The curved text is sized and fitted dynamically so the full message
 * ("Happy Friendship Day <name>!") always renders completely along the
 * arc, no matter how long the name is — nothing gets clipped or cut off.
 */
export default function CakeIllustration({ name = 'Zameer', className = '' }) {
  const message = `${name} Ahmed!`;

  // The "cakeArc" path below (M 15 165 A 260 260 0 0 1 445 165) has a fixed,
  // known geometry, so its arc length can be computed analytically instead
  // of measured at runtime: chord = 430, radius = 260 =>
  // centralAngle = 2*asin(chord / (2*radius)) ≈ 1.951 rad => length ≈ R * angle ≈ 507.
  const ARC_LENGTH = 507;
  const SAFE_ARC_LENGTH = ARC_LENGTH * 0.94; // margin so text never touches the path ends

  // Rough average glyph width for a bold display face, as a fraction of font-size.
  const AVG_CHAR_WIDTH_FACTOR = 0.56;

  const rawFontSize = SAFE_ARC_LENGTH / (message.length * AVG_CHAR_WIDTH_FACTOR);
  const fontSize = Math.min(34, Math.max(16, rawFontSize));

  // How wide the message is estimated to render at the chosen font size.
  const estimatedWidth = message.length * AVG_CHAR_WIDTH_FACTOR * fontSize;
  // Only ever compress (never stretch) short names beyond their natural width.
  const textLength = Math.min(estimatedWidth, SAFE_ARC_LENGTH);

  return (
    <svg
      viewBox="0 0 460 420"
      className={className}
      role="img"
      aria-label={message}
    >
      <defs>
        <path id="cakeArc" d="M 15 165 A 260 260 0 0 1 445 165" fill="none" />
      </defs>

      {/* Curved celebration text, arcing above the cake. Sized and
          length-fitted above so the whole message always fits the arc. */}
      <text
        fill="var(--color-primary-dark)"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize={fontSize}
        style={{ paintOrder: 'stroke' }}
        stroke="#FFFFFF"
        strokeWidth="6"
      >
        <textPath
          href="#cakeArc"
          startOffset="50%"
          textAnchor="middle"
          textLength={textLength}
          lengthAdjust="spacingAndGlyphs"
        >
          {message}
        </textPath>
      </text>

      {/* Cake body, shifted to re-center within the enlarged viewBox */}
      <g transform="translate(30 40)">
        {/* Cake shadow */}
        <ellipse cx="200" cy="358" rx="130" ry="12" fill="#00000014" />

        {/* Bottom tier */}
        <rect x="70" y="270" width="260" height="80" rx="14" fill="var(--color-primary)" />
        <rect x="70" y="270" width="260" height="16" rx="8" fill="#FFFFFF" />

        {/* Middle tier */}
        <rect x="105" y="205" width="190" height="70" rx="12" fill="#FFFFFF" stroke="var(--color-primary)" strokeWidth="3" />
        <rect x="105" y="205" width="190" height="14" rx="7" fill="var(--color-primary)" />

        {/* Top tier */}
        <rect x="140" y="150" width="120" height="60" rx="10" fill="var(--color-primary)" />
        <rect x="140" y="150" width="120" height="12" rx="6" fill="#FFFFFF" />

        {/* Fondant cricket bat + ball on the bottom tier */}
        <g transform="translate(115 300) rotate(-20)">
          <rect x="0" y="0" width="7" height="30" rx="2" fill="#D9A45B" />
          <rect x="-1.5" y="26" width="10" height="16" rx="3" fill="#B97A3A" />
        </g>
        <circle cx="150" cy="322" r="9" fill="#A62639" stroke="#6E1522" strokeWidth="1.2" />

        {/* Fondant football on the bottom tier */}
        <circle cx="255" cy="318" r="12" fill="#FFFFFF" stroke="#16233A" strokeWidth="1.2" />
        <path d="M247 312 L255 318 L263 312 M247 324 L255 318 L263 324" stroke="#16233A" strokeWidth="1" fill="none" />

        {/* Little dots / sprinkles on the middle tier */}
        <circle cx="130" cy="235" r="3" fill="var(--color-accent-yellow)" />
        <circle cx="150" cy="245" r="3" fill="var(--color-secondary)" />
        <circle cx="270" cy="235" r="3" fill="var(--color-accent-yellow)" />
        <circle cx="250" cy="248" r="3" fill="var(--color-secondary)" />

        {/* Candles on top */}
        <g>
          <rect x="165" y="120" width="6" height="32" fill="var(--color-accent-yellow)" />
          <path d="M168 112 C172 118 172 124 168 128 C164 124 164 118 168 112 Z" fill="#F2B90F" />

          <rect x="197" y="112" width="6" height="40" fill="var(--color-secondary)" />
          <path d="M200 104 C204 110 204 116 200 120 C196 116 196 110 200 104 Z" fill="#2E9E5B" />

          <rect x="229" y="120" width="6" height="32" fill="var(--color-primary)" />
          <path d="M232 112 C236 118 236 124 232 128 C228 124 228 118 232 112 Z" fill="#1D5FBF" />
        </g>
      </g>
    </svg>
  );
}