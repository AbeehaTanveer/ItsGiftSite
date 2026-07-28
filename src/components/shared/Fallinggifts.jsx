const GIFT_COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent-yellow)'];

/**
 * FallingGifts
 * ------------
 * Renders `count` small gift-box emoji that rain down continuously from the
 * top of the screen — each one loops forever with its own randomized
 * horizontal position, negative start delay (so they're already mid-fall at
 * different points), and fall duration. Purely decorative — sits in an
 * absolutely-positioned, pointer-events-none layer.
 */
export default function FallingGifts({ count = 20 }) {
  const gifts = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 94 + 2; // vw
    const duration = Math.random() * 2 + 3;
    // Negative delay so gifts are already mid-fall at staggered points,
    // giving a continuous "rain" look from the very first frame.
    const delay = -Math.random() * duration;
    const size = Math.random() * 12 + 20;
    return { id: i, left, delay, duration, size, color: GIFT_COLORS[i % GIFT_COLORS.length] };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {gifts.map((gift) => (
        <span
          key={gift.id}
          className="absolute top-0 animate-gift-fall select-none"
          style={{
            left: `${gift.left}%`,
            fontSize: `${gift.size}px`,
            animationDelay: `${gift.delay}s`,
            animationDuration: `${gift.duration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            filter: `drop-shadow(0 0 0 ${gift.color})`,
          }}
          role="img"
          aria-hidden="true"
        >
          🎁
        </span>
      ))}
    </div>
  );
}