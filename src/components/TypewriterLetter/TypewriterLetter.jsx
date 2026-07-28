import { useEffect, useRef } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useTypewriter } from '../../hooks/useTypewriter';

const LETTER_TEXT = `Hi Zameer,

This is your official welcome gift. I hope you like it. But if you don't... well, I still think my choice is perfect. 😌

Now we are officially friends. That means one thing: respect my boundaries. Good people always have boundaries, and I am one of them.

My first rule is very simple. The day you start liking a girl, or a girl comes into your life, I want to know first. No hiding. No late updates. I like honesty more than excuses.

I really want to see you do well in life. Work hard, stay focused, and don't lose yourself for anyone.

Enjoy your gift. Match my energy, stay real, and don't make me regret choosing you as my friend.

— AZ 🤍
`;

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