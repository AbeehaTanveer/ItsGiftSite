const BAT_IMAGE_URL =
  'https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/cricket-bat-icon.png';

/**
 * BatShower
 * ---------
 * When `active`, scatters a large number of real cricket-bat images
 * (transparent PNG, sourced from UXWing — free for commercial use, no
 * attribution required) at random positions and rotations across the full
 * screen, popping in with a staggered fade/scale. Plain <img> elements
 * instead of canvas, so there's no async image-loading timing to get wrong.
 */
export default function BatShower({ active = false, count = 55 }) {
  if (!active) return null;

  const bats = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 92,
    left: Math.random() * 92,
    rotation: Math.random() * 360,
    size: Math.random() * 28 + 26,
    delay: Math.random() * 0.6,
  }));

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {bats.map((bat) => (
        <img
          key={bat.id}
          src={BAT_IMAGE_URL}
          alt=""
          className="absolute animate-pin-pop"
          style={{
            top: `${bat.top}%`,
            left: `${bat.left}%`,
            width: `${bat.size}px`,
            height: `${bat.size}px`,
            transform: `rotate(${bat.rotation}deg)`,
            animationDelay: `${bat.delay}s`,
          }}
        />
      ))}
    </div>
  );
}