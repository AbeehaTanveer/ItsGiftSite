import { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const FLOWER_GIF_URL = 'https://i.pinimg.com/originals/71/02/e1/7102e1771b31ce3665a3f15522a603b6.gif';

export default function RoseScreen() {
  const { goToNextStep } = useAppState();
  const [isGiving, setIsGiving] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

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
        background:
          'radial-gradient(circle at 50% 0%, #fff5f7, #ffe4e9 70%)',
        fontFamily: 'var(--font-body)',
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'translateX(-70px)' : 'translateX(0)',
        transition: 'opacity 0.5s ease-in, transform 0.5s ease-in',
      }}
    >
      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center gap-1 text-center px-4 max-w-md mx-auto">
        
        {/* Small Label */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-rose-400/70">
          For you ❤️
        </p>
        
        {/* Main Heading */}
        <h1
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-xl md:text-2xl font-bold text-rose-700"
        >
          {isGiving ? 'Here you go! 🌸' : 'Please Take it Bruh 🌹'}
        </h1>

        {/* GIF Button Container */}
        <button
          type="button"
          onClick={handleGive}
          aria-label="Give the flower"
          className="relative group flex flex-col items-center gap-0.5 mt-0.5 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {/* Soft Glowing Background Effect */}
          <div className="absolute inset-0 -z-10 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
               style={{ 
                 background: 'radial-gradient(circle, #fbc4d5, #f8a4c8)',
                 borderRadius: '50%',
                 width: '120%',
                 height: '120%',
                 left: '-10%',
                 top: '-10%'
               }}
          />
          
          {/* GIF Image with Animation */}
          <img
            src={FLOWER_GIF_URL}
            alt="Bear holding out a flower for you"
            className="w-[clamp(160px,30vh,280px)] h-auto relative z-10 left-[-30px]"
            style={{
              transform: isGiving ? 'translateX(60px) scale(1.1) rotate(3deg)' : 'translateX(0) scale(1) rotate(0deg)',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: isGiving ? 'drop-shadow(0 0 30px rgba(251,196,213,0.6))' : 'drop-shadow(0 0 20px rgba(251,196,213,0.3))'
            }}
          />
          
          {/* Floating Hearts Animation */}
          {isGiving && (
            <>
              <span className="absolute -top-4 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💖</span>
              <span className="absolute -top-2 -right-4 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>❤️</span>
              <span className="absolute bottom-0 -left-6 text-lg animate-bounce" style={{ animationDelay: '0.6s' }}>💕</span>
              <span className="absolute bottom-2 -right-6 text-xl animate-bounce" style={{ animationDelay: '0.9s' }}>💗</span>
            </>
          )}
          
          {/* Cute Text Below GIF */}
          <span 
            className={`text-xs font-medium transition-all duration-500 relative z-10 ${
              isGiving ? 'text-rose-500 scale-110' : 'text-rose-400/80 animate-pulse left-[-10px]'
            }`}
          >
            {isGiving ? 'Take it! 🥰' : "Don't shy take it 🤪"}
          </span>
        </button>

   
      </div>
    </div>
  );
}