import { useEffect, useRef } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useTypewriter } from '../../hooks/useTypewriter';

const LETTER_TEXT = `Hi Zameer,
Here is your official welcome gift. I hope you like it. If you don’t, I honestly don’t care, but we both know that is impossible. My taste is flawless, and you are lucky to experience it.

We are officially friends now, but my boundaries are strictly non-negotiable. Cheap things have no boundaries because anyone can access them, but valuable things are always protected. I truly want to see you become incredibly successful in life, and success requires discipline.

This brings us to my absolute first rule. The exact second a girl enters your life or you start catching feelings, I get the exclusive first report. No secrets and no delays. A smart person knows that a hidden truth eventually becomes a loud lie, and I don’t tolerate lies.

Enjoy the gift, Zameer. Stay smart, match my energy, and never make me regret picking you.

Best,
AZ`;

export default function TypewriterLetter() {
  const { goToNextStep } = useAppState();
  const { displayedText, isComplete } = useTypewriter(LETTER_TEXT, 40);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [displayedText]);

  const lines = displayedText.split('\n');

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 py-16 md:py-24 min-h-[70vh]"
       >
      <div className="text-center space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400/70">
          Your Letter 💌
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-700">
          A special message for you
        </h1>
      </div>

      <div
        className="w-full max-w-lg max-h-[50vh] overflow-y-auto rounded-2xl
                   bg-white/90 backdrop-blur-sm border border-blue-200 shadow-xl p-6 md:p-8
                   font-serif leading-relaxed whitespace-pre-wrap"
      >
        {lines.map((line, i) => (
          <p key={i} className="min-h-[1.5em] text-blue-800 text-sm md:text-base">
            {line}
            {i === lines.length - 1 && !isComplete && (
              <span className="inline-block w-[2px] h-[1em] bg-blue-400 ml-0.5 align-middle animate-pulse" />
            )}
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      {isComplete && (
        <button
          type="button"
          onClick={goToNextStep}
          className="rounded-xl bg-blue-400 hover:bg-blue-300 active:bg-blue-500
                     text-white font-medium px-6 py-3 transition-colors animate-pulse
                     shadow-lg hover:shadow-xl"
        >
       This is End See ya..🎁
        </button>
      )}
    </div>
  );
}