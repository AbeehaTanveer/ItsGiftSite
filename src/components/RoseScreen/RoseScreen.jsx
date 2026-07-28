import { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

const FLOWER_GIF_URL = 'https://i.pinimg.com/originals/71/02/e1/7102e1771b31ce3665a3f15522a603b6.gif';

export default function RoseScreen() {
  const { goToNextStep } = useAppState();
  const [isGiving, setIsGiving] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [floatingPetals, setFloatingPetals] = useState([]);

  useEffect(() => {
    const petals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 4 + 6,
      rotation: Math.random() * 360,
    }));
    setFloatingPetals(petals);
  }, []);

  const handleGive = () => {
    if (isGiving) return;
    setIsGiving(true);

    setTimeout(() => {
      setIsLeaving(true);
    }, 1600);

    setTimeout(() => {
      goToNextStep();
    }, 2150);
  };

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #fff5f7, #ffe4e9 70%, #fddde6 100%)',
        fontFamily: 'var(--font-body)',
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.5s ease-in, transform 0.5s ease-in',
      }}
    >
      <style>{`
        @keyframes floatPetal {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-10vh) rotate(${360 * 2}deg) scale(1);
            opacity: 0;
          }
        }
        .float-petal {
          animation: floatPetal linear infinite;
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .gentle-bounce {
          animation: gentleBounce 2.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(0.95); }
        }
        .shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scale(1.2);
            opacity: 0;
          }
        }
        .float-heart {
          animation: floatHeart 1.2s ease-out forwards;
        }
      `}</style>

      {/* Floating Petals Background */}
      {floatingPetals.map((petal) => (
        <div
          key={petal.id}
          className="absolute pointer-events-none float-petal"
          style={{
            left: `${petal.x}%`,
            fontSize: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0.35,
          }}
        >
          🌸
        </div>
      ))}

      {/* Decorative Shimmer Elements */}
      <div className="absolute top-6 left-6 text-2xl shimmer">✨</div>
      <div className="absolute top-6 right-6 text-2xl shimmer" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-6 left-6 text-xl shimmer" style={{ animationDelay: '2s' }}>💗</div>
      <div className="absolute bottom-6 right-6 text-xl shimmer" style={{ animationDelay: '1.5s' }}>💖</div>

      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center gap-3 px-4 max-w-md mx-auto relative z-10">
        
        {/* Small Label */}
        <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400/80 gentle-bounce">
          For You ❤️
        </p>
        
        {/* Main Heading */}
        <h1
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-3xl md:text-4xl font-bold text-rose-700"
        >
          {isGiving ? 'Here You Go! 🌸' : 'Please Take It, Bruh 🌹'}
        </h1>

        {/* Sub Text */}
        {!isGiving && (
          <p className="text-sm text-rose-400/70 animate-pulse">
            Click the bear to accept the flower 💫
          </p>
        )}

        {/* GIF Button Container - Centered */}
        <button
          type="button"
          onClick={handleGive}
          aria-label="Give the flower"
          className="relative group flex flex-col items-center gap-2 mt-2 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {/* Soft Glowing Background Effect */}
          <div 
            className="absolute inset-0 -z-10 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
            style={{ 
              background: 'radial-gradient(circle, #fbc4d5, #f8a4c8)',
              borderRadius: '50%',
              width: '150%',
              height: '150%',
              left: '-25%',
              top: '-25%'
            }}
          />
          
          {/* GIF Image */}
          <img
            src={FLOWER_GIF_URL}
            alt="Bear holding out a flower"
            className="w-[clamp(200px,35vh,320px)] h-auto relative z-10 rounded-2xl"
            style={{
              transform: isGiving ? 'scale(1.1) rotate(3deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: isGiving 
                ? 'drop-shadow(0 0 50px rgba(251,196,213,0.8))' 
                : 'drop-shadow(0 0 30px rgba(251,196,213,0.3))'
            }}
          />
          
          {/* Floating Hearts on Give */}
          {isGiving && (
            <>
              <span className="absolute -top-8 -left-6 text-3xl float-heart" style={{ animationDelay: '0s' }}>💖</span>
              <span className="absolute -top-4 -right-6 text-2xl float-heart" style={{ animationDelay: '0.2s' }}>❤️</span>
              <span className="absolute bottom-2 -left-10 text-2xl float-heart" style={{ animationDelay: '0.4s' }}>💕</span>
              <span className="absolute bottom-4 -right-10 text-2xl float-heart" style={{ animationDelay: '0.6s' }}>💗</span>
              <span className="absolute top-1/2 -left-12 text-xl float-heart" style={{ animationDelay: '0.8s' }}>✨</span>
              <span className="absolute top-1/2 -right-12 text-xl float-heart" style={{ animationDelay: '1s' }}>⭐</span>
            </>
          )}
          
          {/* Cute Text Below GIF */}
          <span 
            className={`text-base font-medium transition-all duration-500 relative z-10 ${
              isGiving ? 'text-rose-600 scale-110' : 'text-rose-500/90 animate-pulse'
            }`}
          >
            {isGiving ? 'Take It! 🥰' : "Don't Be Shy, Take It 🤪"}
          </span>
        </button>

        {/* Extra Message */}
        {isGiving && (
          <div className="mt-1 text-sm text-rose-500/80 animate-pulse">
            It's All Yours! 💝
          </div>
        )}
      </div>
    </div>
  );
}