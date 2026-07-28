const ROSE_COLORS = ['#ff6b8a', '#ff4d6d', '#ff8fa3', '#ffb3c6', '#ff99b5'];

/**
 * FallingPetals
 * ------------
 * Renders `count` rose petals that rain down like drops from the top of the screen.
 * Each petal falls straight down with a slight natural drift, like rain.
 */
export default function FallingPetals({ count = 40 }) {
  const petals = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 96 + 2;
    const duration = Math.random() * 1.5 + 1.5; // 1.5-3 seconds
    const delay = -Math.random() * duration;
    const size = Math.random() * 8 + 12; // 12-20px
    const opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7
    const color = ROSE_COLORS[i % ROSE_COLORS.length];
    
    return { 
      id: i, 
      left, 
      delay, 
      duration, 
      size,
      opacity,
      color 
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-0 select-none"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            opacity: petal.opacity,
            filter: `drop-shadow(0 2px 4px ${petal.color}40)`,
            transform: `rotate(${Math.random() * 360}deg)`,
            willChange: 'transform',
          }}
          role="img"
          aria-hidden="true"
          className="absolute top-0 select-none animate-rain-petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
            filter: `drop-shadow(0 2px 4px ${petal.color}40)`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}