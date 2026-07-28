import { useEffect, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import CakeIllustration from '../shared/CakeIllustration';
import FallingGifts from "../shared/FallingPetals";
import MascotGiftDelivery from '../shared/MascotGiftDelivery';

// How long the "someone took a bite" effect plays before the cake is
// swapped out for the gift delivery.
const EAT_DURATION_MS = 900;
// Must match the animation duration inside MascotGiftDelivery — used to
// know when the mascot has finished walking off so the basket becomes
// tappable and the note appears.
const DELIVERY_DURATION_MS = 3500;
// How long the "take me" note stays on screen before fading away by itself.
const NOTE_VISIBLE_DURATION_MS = 3000;

// Name shown in the curved cake text — update this for whoever the app is for.
const FRIEND_NAME = 'Zameer';

export default function CakeScreen() {
  const { goToNextStep } = useAppState();

  const [isBeingEaten, setIsBeingEaten] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [isBasketReady, setIsBasketReady] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const handleCakeTap = () => {
    if (isBeingEaten || hasOpenedGift) return;

    // Play the "bite taken out of it" effect first...
    setIsBeingEaten(true);

    // ...then swap the cake out for the gift delivery once that finishes.
    setTimeout(() => {
      setHasOpenedGift(true);
    }, EAT_DURATION_MS);
  };

  useEffect(() => {
    if (!hasOpenedGift) return undefined;

    // Once the mascot has walked off and left the basket behind: the
    // basket becomes tappable, and the note pops up...
    const readyTimer = setTimeout(() => {
      setIsBasketReady(true);
      setShowNote(true);
    }, DELIVERY_DURATION_MS);

    return () => clearTimeout(readyTimer);
  }, [hasOpenedGift]);

  useEffect(() => {
    if (!showNote) return undefined;

    // ...and disappears again on its own after a few seconds (the basket
    // stays tappable either way).
    const hideNoteTimer = setTimeout(() => {
      setShowNote(false);
    }, NOTE_VISIBLE_DURATION_MS);

    return () => clearTimeout(hideNoteTimer);
  }, [showNote]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden animate-screen-slide-in-right"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="relative flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-4 px-6 overflow-hidden">
        {/* Scoped keyframes for the "someone took a bite" effect and the
            note's fade in/out. */}
        <style>{`
          @keyframes biteMarkPop {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .bite-mark {
            animation: biteMarkPop 0.22s ease-out forwards;
          }
          .bite-mark-small {
            animation: biteMarkPop 0.22s ease-out 0.08s forwards;
          }

          @keyframes cakeDevoured {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            30% { transform: scale(1.04) rotate(-2deg); opacity: 1; }
            60% { transform: scale(0.9) rotate(2deg); opacity: 1; }
            100% { transform: scale(0.55) rotate(0deg); opacity: 0; }
          }
          .cake-being-eaten {
            animation: cakeDevoured ${EAT_DURATION_MS}ms ease-in forwards;
          }

          @keyframes noteFade {
            0% { opacity: 0; transform: translateY(6px) scale(0.96); }
            15% { opacity: 1; transform: translateY(0) scale(1); }
            85% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-6px) scale(0.96); }
          }
          .note-fade {
            animation: noteFade ${NOTE_VISIBLE_DURATION_MS}ms ease-in-out forwards;
          }
        `}</style>

        {/* Gifts rain down continuously, for as long as this screen is up */}
        <FallingGifts count={20} />

        {/* Once the bite effect finishes: the mascot walks in carrying the
            basket, sets it down center-stage, then walks off — leaving the
            basket behind, tappable, once isBasketReady is true. */}
        <MascotGiftDelivery
          active={hasOpenedGift}
          name={FRIEND_NAME}
          basketClickable={isBasketReady}
          onBasketClick={goToNextStep}
        />

        {!hasOpenedGift && (
          <button
            type="button"
            onClick={handleCakeTap}
            aria-label="Take a bite of the cake"
            className={`relative bg-transparent border-0 p-0 ${
              isBeingEaten ? 'cake-being-eaten' : 'animate-cake-drop-in'
            }`}
          >
            <CakeIllustration
              name={FRIEND_NAME}
              className="w-[clamp(260px,60vh,460px)] h-auto"
            />

            {isBeingEaten && (
              <>
                {/* Bite cutouts near the top-right of the cake, colored to
                    match the page background so they read as "missing" bites. */}
                <div
                  className="absolute rounded-full bite-mark"
                  style={{
                    top: '18%',
                    right: '16%',
                    width: '18%',
                    aspectRatio: '1 / 1',
                    background: 'var(--color-bg-soft)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
                  }}
                />
                <div
                  className="absolute rounded-full bite-mark-small"
                  style={{
                    top: '26%',
                    right: '10%',
                    width: '9%',
                    aspectRatio: '1 / 1',
                    background: 'var(--color-bg-soft)',
                    boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.15)',
                  }}
                />
              </>
            )}
          </button>
        )}

        {showNote && (
          <div
            className="relative z-40 bg-white rounded-2xl px-6 py-3 shadow-md note-fade pointer-events-none"
            style={{ color: 'var(--color-text)' }}
          >
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-base font-bold">
              pleasee... take me, I'm all yours! 🎁
            </p>
          </div>
        )}
      </div>
    </div>
  );
}