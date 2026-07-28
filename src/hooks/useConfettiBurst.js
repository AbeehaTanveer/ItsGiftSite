import { useCallback, useRef } from 'react';

const COLORS = ['#fb7185', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#f472b6'];
const PARTICLE_COUNT = 140;
const GRAVITY = 0.18;
const DURATION_MS = 2600;

function makeParticle(width, height) {
  return {
    x: width / 2,
    y: height / 3,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    size: Math.random() * 6 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 12,
  };
}

/**
 * useConfettiBurst
 * ----------------
 * Returns a `fire(canvas)` function that plays a single confetti burst
 * on the given <canvas> element using the native 2D Canvas API.
 */
export function useConfettiBurst() {
  const rafRef = useRef(null);

  const fire = useCallback((canvas) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const particles = Array.from({ length: PARTICLE_COUNT }, () =>
      makeParticle(width, height)
    );

    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (elapsed < DURATION_MS) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);
  }, []);

  return fire;
}