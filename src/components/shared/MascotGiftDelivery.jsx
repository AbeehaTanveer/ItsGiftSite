import CuteMascotBoy from './CuteMascotBoy';
import CricketGiftBasket from './CricketGiftBasket';

/**
 * MascotGiftDelivery
 * -------------------
 * Giant basket delivery animation.
 * Mascot walks in carrying a large gift basket, places it in the center,
 * then walks away.
 *
 * Each piece (basket, mascot) is wrapped in TWO divs:
 *   - an outer div that does the actual screen-centering
 *     (top/left: 50% + transform: translate(-50%, -50%), untouched by
 *     any animation) — this keeps both pieces truly centered on every
 *     screen size, mobile included.
 *   - an inner div that carries the walk-in/set-down animation
 * This matters because the animation itself also animates `transform`.
 * If centering and animation both live on the same element and both use
 * `transform`, the animation's value wins and the centering offset is
 * lost the moment the animation starts. Splitting them onto separate
 * elements means the two `transform`s compose instead of overwriting
 * each other.
 *
 * Once `basketClickable` is true, the basket becomes a real tappable
 * button (the rest of this layer stays pointer-events-none so it never
 * blocks taps elsewhere on the screen).
 */
export default function MascotGiftDelivery({
  active = false,
  name = 'Zameer',
  basketClickable = false,
  onBasketClick,
}) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes basketSetDown {
          0% {
            transform: translateX(70vw) scale(0.9);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          46% {
            transform: translateX(0) scale(0.95);
          }

          50% {
            transform: translateX(0) scale(1.05);
          }

          54% {
            transform: translateX(0) scale(1);
          }

          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        .basket-set-down {
          animation: basketSetDown 3.5s cubic-bezier(0.33, 0.7, 0.4, 1) forwards;
        }

        @keyframes mascotWalkThrough {
          0% {
            transform: translateX(85vw) scaleX(-1);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          46% {
            transform: translateX(18vw) scaleX(-1);
          }

          54% {
            transform: translateX(18vw) scaleX(-1);
          }

          100% {
            transform: translateX(-110vw) scaleX(-1);
            opacity: 1;
          }
        }

        .mascot-walk-through {
          animation: mascotWalkThrough 3.5s cubic-bezier(0.4, 0.1, 0.3, 1) forwards;
        }

        @keyframes basketInviteWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        .basket-clickable {
          animation: basketInviteWiggle 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* Basket — outer div centers it (both axes, on every screen size),
          inner div animates it. Width is a clamp(min, preferred, max):
          tweak these three numbers to make the basket bigger/smaller. */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 55vw, 560px)',
        }}
      >
        <div className="basket-set-down">
          {basketClickable ? (
            <button
              type="button"
              onClick={onBasketClick}
              aria-label="Take the gift basket"
              className="basket-clickable block w-full bg-transparent border-0 p-0 pointer-events-auto active:scale-95 transition-transform"
            >
              <CricketGiftBasket name={name} className="w-full" />
            </button>
          ) : (
            <CricketGiftBasket name={name} className="w-full" />
          )}
        </div>
      </div>

      {/* Mascot — outer div centers it (both axes, on every screen size),
          inner div animates it. Nudged up slightly (48% instead of 50%)
          so it sits just above the basket instead of exactly on top of it. */}
      <div
        className="absolute"
        style={{
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
       
      </div>
    </div>
  );
}