import { useCallback, useRef } from 'react';

const BAT_IMAGE_URL =
  'https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/cricket-bat-icon.png';

const PARTICLE_COUNT = 90;
const GRAVITY = 0.22;
const DURATION_MS = 3200;

let cachedImage = null;
function loadBatImage() {
  if (cachedImage) return Promise.resolve(cachedImage);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      cachedImage = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = BAT_IMAGE_URL;
  });
}

function makeParticle(width, height) {
  return {
    x: width / 2 + (Math.random() - 0.5) * 40,
    y: height / 2,
    vx: (Math.random() - 0.5) * 16,
    vy: Math.random() * -14 - 6,
    size: Math.random() * 22 + 22,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 14,
  };
}

/**
 * useBatBurst
 * -----------
 * Returns a `fire(canvas)` function that rains a large burst of real
 * cricket-bat images (sourced from UXWing, free for commercial use) across
 * the given <canvas>, since the user has a cricket obsession.
 */
export function useBatBurst() {
  const rafRef = useRef(null);

  const fire = useCallback(async (canvas) => {
    if (!canvas) return;
    const img = await loadBatImage().catch(() => null);
    if (!img) return;

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
        ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
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