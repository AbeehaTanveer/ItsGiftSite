import { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

const FLOWER_GIF_URL = 'https://i.pinimg.com/originals/71/02/e1/7102e1771b31ce3665a3f15522a603b6.gif';
const MESSAGE = "This little rose is here to make your day a bit sweeter... just for you 🌹";

export default function RoseScreen() {
  const { goToNextStep } = useAppState();
  const [stage, setStage] = useState('ask'); // ask -> given -> leaving
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [typedMsg, setTypedMsg] = useState('');
  const [confetti, setConfetti] = useState([]);
  const containerRef = useRef(null);

  // Timer/interval ids are kept in refs (not effect state) so that setting
  // `stage` later can't trigger a React effect-cleanup that cancels them
  // early — that was the bug: `stage` was previously an effect dependency,
  // so calling setStage('leaving') mid-sequence caused React to clean up
  // the very effect that had scheduled the goToNextStep() timer, canceling
  // it before it ever fired.
  const typeIntervalRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const nextTimerRef = useRef(null);

  // Only responsible for cleanup on unmount — not tied to `stage`.
  useEffect(() => {
    return () => {
      clearInterval(typeIntervalRef.current);
      clearTimeout(leaveTimerRef.current);
      clearTimeout(nextTimerRef.current);
    };
  }, []);

  const handleYes = () => {
    if (stage !== 'ask') return;
    setStage('given');

    const pieces = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: Math.random() * 1.5 + 2,
      emoji: ['🌸', '💗', '✨', '💕', '⭐'][Math.floor(Math.random() * 5)],
      size: Math.random() * 14 + 14,
      drift: (Math.random() - 0.5) * 80,
    }));
    setConfetti(pieces);

    let i = 0;
    typeIntervalRef.current = setInterval(() => {
      i++;
      setTypedMsg(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) clearInterval(typeIntervalRef.current);
    }, 32);

    // Same flow as before: brief pause, then leave, then move to the next
    // page (cake screen). These now live in the click handler instead of a
    // `stage`-dependent effect, so nothing cancels them early.
    leaveTimerRef.current = setTimeout(() => setStage('leaving'), 2400);
    nextTimerRef.current = setTimeout(() => goToNextStep(), 2950);
  };

  const dodgeNo = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width * 0.26;
    const maxY = rect.height * 0.1;
    setNoBtnPos({
      x: (Math.random() - 0.5) * 2 * maxX,
      y: (Math.random() - 0.5) * 2 * maxY,
    });
    setDodgeCount((c) => c + 1);
  };

  const noLabels = ['No 🙅', 'You sure?', 'Try again 😏', 'Nope', 'Catch me first', 'Nice try', 'Never 😂', 'Give up?'];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #fff5f7, #ffe1ea 60%, #ffd0dd 100%)',
        fontFamily: 'var(--font-body)',
        opacity: stage === 'leaving' ? 0 : 1,
        transform: stage === 'leaving' ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.5s ease-in, transform 0.5s ease-in',
      }}
    >
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .petal { animation: petalFall linear infinite; }

        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .gif-float { animation: floatUpDown 3s ease-in-out infinite; }

        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popIn 0.5s ease-out; }

        @keyframes confettiFall {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(70vh) translateX(var(--drift)) rotate(400deg); opacity: 0; }
        }
        .confetti-piece { animation: confettiFall ease-in forwards; }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pulse-btn { animation: gentlePulse 1.8s ease-in-out infinite; }

        @keyframes shimmer {
          0% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(0.95); }
        }
        .shimmer { animation: shimmer 3s ease-in-out infinite; }

        .no-btn { transition: top 0.25s ease, left 0.25s ease; }

        .gif-frame {
          position: relative;
          width: clamp(190px, 55vw, 300px);
          margin: 0 auto;
        }
        .gif-glow {
          position: absolute;
          inset: -18%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,196,213,0.55), rgba(248,164,200,0));
          z-index: 0;
        }
      `}</style>

      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none petal"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 14 + 12}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 7}s`,
          }}
        >
          🌸
        </div>
      ))}

      <div className="absolute top-5 left-5 text-xl shimmer">✨</div>
      <div className="absolute top-5 right-5 text-xl shimmer" style={{ animationDelay: '1s' }}>✨</div>

      {stage === 'given' &&
        confetti.map((c) => (
          <div
            key={c.id}
            className="absolute pointer-events-none confetti-piece"
            style={{
              left: `${c.x}%`,
              top: 0,
              fontSize: `${c.size}px`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              '--drift': `${c.drift}px`,
            }}
          >
            {c.emoji}
          </div>
        ))}

      <div className="w-full max-w-[380px] px-5 flex flex-col items-center justify-center gap-3 text-center relative z-10">
        {stage === 'ask' && (
          <>
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400/80">
              For You ❤️
            </p>

            <h1
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
              className="font-bold text-rose-700 leading-tight"
            >
              Please Take It, Bruh 🌹
            </h1>

            <p className="text-sm text-rose-400/70">
              {dodgeCount === 0 ? 'Tap the flower to accept 💫' : `That button ran away ${dodgeCount} time${dodgeCount > 1 ? 's' : ''} 😅`}
            </p>

            <div className="gif-frame gif-float">
              <div className="gif-glow" />
              <img
                src={FLOWER_GIF_URL}
                alt="Bear holding out a flower"
                className="w-full h-auto relative rounded-2xl block"
                style={{ zIndex: 1, filter: 'drop-shadow(0 8px 24px rgba(225,29,94,0.25))' }}
              />
            </div>

            <div className="relative w-full flex items-center justify-center gap-4 mt-2" style={{ minHeight: 60 }}>
              <button
                type="button"
                onClick={handleYes}
                className="pulse-btn"
                style={{
                  background: '#e11d5e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(225,29,94,0.35)',
                }}
              >
                Take It! 💗
              </button>

              <button
                type="button"
                onClick={dodgeNo}
                onMouseEnter={dodgeNo}
                className="no-btn"
                style={{
                  position: dodgeCount > 0 ? 'absolute' : 'static',
                  top: dodgeCount > 0 ? `calc(50% + ${noBtnPos.y}px)` : 'auto',
                  left: dodgeCount > 0 ? `calc(50% + ${noBtnPos.x}px)` : 'auto',
                  background: 'transparent',
                  color: '#b45',
                  border: '1.5px solid rgba(200,60,100,0.35)',
                  borderRadius: '999px',
                  padding: '10px 22px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {noLabels[Math.min(dodgeCount, noLabels.length - 1)]}
              </button>
            </div>
          </>
        )}

        {stage !== 'ask' && (
          <div className="pop-in flex flex-col items-center gap-3">
            <div className="gif-frame">
              <div className="gif-glow" />
              <img
                src={FLOWER_GIF_URL}
                alt="Bear holding out a flower"
                className="w-full h-auto relative rounded-2xl block"
                style={{ zIndex: 1, filter: 'drop-shadow(0 0 40px rgba(251,196,213,0.8))' }}
              />
            </div>
            <h1
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 6vw, 2.1rem)' }}
              className="font-bold text-rose-700"
            >
              Here You Go! 🎉
            </h1>
            <p className="text-[15px] text-rose-600/90 leading-relaxed min-h-[3.5em] px-2">
              {typedMsg}
              <span className="opacity-50">{typedMsg.length < MESSAGE.length ? '|' : ''}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}