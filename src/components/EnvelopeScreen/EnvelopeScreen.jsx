import { useRef, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useConfettiBurst } from '../../hooks/useConfettiBurst';

export default function EnvelopeScreen() {
  const { goToNextStep } = useAppState();
  const fireConfetti = useConfettiBurst();
  const canvasRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    fireConfetti(canvasRef.current);
    
    setTimeout(() => {
      goToNextStep();
    }, 1500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 py-16 md:py-24 min-h-[70vh]"
         style={{
           background: 'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)'
         }}>
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* Decorative floating elements - hide when open */}
      {!isOpen && (
        <>
          <div className="absolute top-10 left-10 text-4xl opacity-20 animate-pulse">✉️</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse delay-1000">💌</div>
          <div className="absolute top-1/2 left-5 text-3xl opacity-10 animate-bounce">✨</div>
          <div className="absolute top-1/3 right-5 text-3xl opacity-10 animate-bounce delay-700">⭐</div>
        </>
      )}

      {/* Text Content - Hide when open */}
      {!isOpen && (
        <div className="text-center space-y-3 relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600/70 font-medium">
            A Special Surprise
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            Open the Envelope
          </h1>
          <p className="text-sm text-blue-600/60 animate-pulse">
            Tap to reveal your message 💫
          </p>
        </div>
      )}

      {/* Envelope - New Design */}
      <div
        className={`relative w-80 h-52 md:w-[400px] md:h-64 cursor-pointer select-none transition-all duration-700 ${
          isOpen ? 'scale-110' : 'scale-100'
        }`}
        style={{ perspective: '1200px' }}
        onClick={handleOpen}
        role="button"
        aria-label="Open envelope"
      >
        {/* Envelope shadow */}
        <div className={`absolute -inset-4 blur-2xl rounded-full transition-all duration-700 ${
          isOpen ? 'bg-blue-400/40' : 'bg-blue-400/20'
        }`} />
        
        {/* Envelope body with new design */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-1 rounded-xl border-2 border-blue-400/30 border-dashed" />
          
          {/* Inner decorative lines */}
          <div className="absolute inset-x-8 top-1/3 h-0.5 bg-blue-400/20 -translate-y-1/2" />
          <div className="absolute inset-x-8 top-1/3 h-0.5 bg-blue-400/20 translate-y-4" />
          <div className="absolute inset-x-8 top-1/3 h-0.5 bg-blue-400/20 translate-y-8" />

          {/* Decorative stamp */}
          <div className="absolute top-3 right-3 w-10 h-12 bg-blue-400/20 rounded-sm border border-blue-400/30 flex items-center justify-center text-xs text-blue-600/40 font-serif rotate-6">
            ✉️
          </div>

          {/* Address lines */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="w-3/4 h-2 bg-blue-400/20 rounded-full mx-auto" />
            <div className="w-1/2 h-2 bg-blue-400/20 rounded-full mx-auto mt-1" />
          </div>
        </div>

        {/* Envelope flap - New design */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 origin-top
                     bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100
                     shadow-lg transition-transform duration-700 ease-out
                     rounded-t-2xl"
          style={{
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }}
        >
          {/* Flap decorative line */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-blue-400/30 flex items-center justify-center">
              <span className="text-2xl">{isOpen ? '✨' : '💙'}</span>
            </div>
          </div>
        </div>

        {/* Bottom flap */}
        <div
          className="absolute inset-x-4 bottom-0 h-1/3 origin-bottom
                     bg-gradient-to-t from-blue-200 to-blue-100
                     shadow-inner transition-transform duration-700 ease-out
                     rounded-b-2xl"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: isOpen ? 'rotateX(0deg)' : 'rotateX(180deg)',
            opacity: isOpen ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-2 relative z-10">
          <p className="text-sm text-blue-600/70 animate-pulse font-medium">
            Opening your letter... ✨
          </p>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}

      {/* Decorative bottom text - Hide when open */}
      {!isOpen && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/40 mt-2 relative z-10">
          A message just for you 💫
        </p>
      )}
    </div>
  );
}