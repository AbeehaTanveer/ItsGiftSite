/**
 * GiftBoxIllustration
 * --------------------
 * An original SVG wrapped gift box (box + lid + ribbon + bow) in the app's
 * theme colors. Meant to be shown big and tappable, with a gentle pulse so
 * it visibly invites a tap without needing any extra label or button.
 */
export default function GiftBoxIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label="Gift box">
      {/* Shadow */}
      <ellipse cx="150" cy="272" rx="95" ry="14" fill="#00000018" />

      {/* Box base */}
      <rect x="55" y="140" width="190" height="120" rx="10" fill="var(--color-primary)" />
      <rect x="55" y="140" width="190" height="120" rx="10" fill="#00000010" />

      {/* Box lid */}
      <rect x="42" y="105" width="216" height="46" rx="10" fill="var(--color-secondary)" />

      {/* Vertical ribbon */}
      <rect x="132" y="105" width="36" height="155" fill="#FFFFFF" />
      {/* Horizontal ribbon across lid */}
      <rect x="42" y="118" width="216" height="20" fill="#FFFFFF" />

      {/* Bow */}
      <g transform="translate(150 100)">
        <path
          d="M0 0 C -10 -34 -55 -34 -50 -4 C -47 16 -20 14 0 0 Z"
          fill="#FFFFFF"
        />
        <path
          d="M0 0 C 10 -34 55 -34 50 -4 C 47 16 20 14 0 0 Z"
          fill="#FFFFFF"
        />
        <circle cx="0" cy="-2" r="11" fill="var(--color-accent-yellow)" />
      </g>
    </svg>
  );
}