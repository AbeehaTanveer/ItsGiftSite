import { useEffect, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import CakeIllustration from '../shared/CakeIllustration';
import FallingPetals from "../shared/FallingPetals";
import MascotGiftDelivery from '../shared/MascotGiftDelivery';

const EAT_DURATION_MS = 900;
const DELIVERY_DURATION_MS = 3500;
const NOTE_VISIBLE_DURATION_MS = 3000;
const FRIEND_NAME = 'Zameer';

export default function CakeScreen() {
  const { goToNextStep } = useAppState();

  const [isBeingEaten, setIsBeingEaten] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [isBasketReady, setIsBasketReady] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showHearts, setShowHearts] = useState([]);

  const handleCakeTap = () => {
    if (isBeingEaten || hasOpenedGift) return;

    setIsBeingEaten(true);

    // Generate floating hearts on bite
    const hearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 60 + 20,
      y: Math.random() * 40 + 10,
      delay: Math.random() * 0.3,
      size: Math.random() * 20 + 16,
    }));
    setShowHearts(hearts);

    setTimeout(() => {
      setHasOpenedGift(true);
    }, EAT_DURATION_MS);
  };

  useEffect(() => {
    if (!hasOpenedGift) return undefined;

    const readyTimer = setTimeout(() => {
      setIsBasketReady(true);
      setShowNote(true);
    }, DELIVERY_DURATION_MS);

    return () => clearTimeout(readyTimer);
  }, [hasOpenedGift]);

  useEffect(() => {
    if (!showNote) return undefined;

    const hideNoteTimer = setTimeout(() => {
      setShowNote(false);
    }, NOTE_VISIBLE_DURATION_MS);

    return () => clearTimeout(hideNoteTimer);
  }, [showNote]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="relative flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-4 px-6 overflow-hidden">
        <style>{`
          @keyframes biteMarkPop {
            0% { transform: scale(0) rotate(-20deg); opacity: 0; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .bite-mark {
            animation: biteMarkPop 0.22s ease-out forwards;
          }
          .bite-mark-small {
            animation: biteMarkPop 0.22s ease-out 0.08s forwards;
          }

          @keyframes cakeDevoured {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            30% { transform: scale(1.08) rotate(-3deg); opacity: 1; }
            60% { transform: scale(0.9) rotate(3deg); opacity: 1; }
            100% { transform: scale(0.5) rotate(5deg); opacity: 0; }
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

          @keyframes floatHeart {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-120px) scale(1.5) rotate(20deg); opacity: 0; }
          }
          .float-heart {
            animation: floatHeart 1.2s ease-out forwards;
          }

          @keyframes cakeBounce {
            0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
            60% { transform: scale(1.1) rotate(2deg); opacity: 1; }
            80% { transform: scale(0.95) rotate(-1deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .cake-bounce-in {
            animation: cakeBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          @keyframes sparkleTwinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          }
          .sparkle-twinkle {
            animation: sparkleTwinkle 2s ease-in-out infinite;
          }

          @keyframes gentleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .gentle-bounce {
            animation: gentleBounce 2s ease-in-out infinite;
          }
        `}</style>

        {/* Rose Petals falling instead of gifts */}
        <FallingPetals count={25} />

        {/* Floating Hearts on bite */}
        {showHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute pointer-events-none float-heart"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            {['❤️', '💖', '💕', '💗', '💝'][heart.id % 5]}
          </div>
        ))}

        {/* Decorative Sparkles */}
        <div className="absolute top-10 left-10 text-2xl sparkle-twinkle">✨</div>
        <div className="absolute top-10 right-10 text-2xl sparkle-twinkle" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-20 left-5 text-xl sparkle-twinkle" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-20 right-5 text-xl sparkle-twinkle" style={{ animationDelay: '1.5s' }}>⭐</div>

        <MascotGiftDelivery
          active={hasOpenedGift}
          name={FRIEND_NAME}
          basketClickable={isBasketReady}
          onBasketClick={goToNextStep}
        />

        {!hasOpenedGift && (
          <>
            {/* Cute Header */}
            <div className="text-center space-y-1 z-10 gentle-bounce">
              <p className="text-sm uppercase tracking-[0.3em] text-rose-400/70">
                🎂 Something Special
              </p>
              <p className="text-xs text-rose-400/50 animate-pulse">
                Tap the cake to take a bite... 👆
              </p>
            </div>

            <button
              type="button"
              onClick={handleCakeTap}
              aria-label="Take a bite of the cake"
              className={`relative bg-transparent border-0 p-0 ${
                isBeingEaten ? 'cake-being-eaten' : 'cake-bounce-in'
              }`}
            >
              <CakeIllustration
                name={FRIEND_NAME}
                className="w-[clamp(240px,55vh,420px)] h-auto"
              />

              {isBeingEaten && (
                <>
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
                  
                  {/* Cute Yum! Emoji */}
                  <div className="absolute -top-12 right-0 text-4xl animate-bounce">
                    😋
                  </div>
                </>
              )}

              {!isBeingEaten && (
                <>
                  <div className="absolute -top-4 -right-4 text-3xl animate-pulse">💫</div>
                  <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌸</div>
                </>
              )}
            </button>

            {/* Bottom cute message */}
            {!isBeingEaten && (
              <p className="text-xs text-rose-400/40 mt-1">
                Go ahead, take a bite! 🍰
              </p>
            )}
          </>
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