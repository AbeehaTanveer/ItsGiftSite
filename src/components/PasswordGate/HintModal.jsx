import { useEffect, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const HINT_TEXT =
  "Numbers don't lie. A man who trusts math must look at his own signature, walk through the alphabet, and take 1 steps forward in life";

const SELF_DESTRUCT_MS = 10000;

export default function HintModal({ onClose }) {
  const { markHintOpened } = useAppState();
  const [secondsLeft, setSecondsLeft] = useState(SELF_DESTRUCT_MS / 1000);

  const handleClose = () => {
    markHintOpened();
    onClose();
  };

  useEffect(() => {
    // Self-destruct timeout - closes the modal automatically.
    const destructTimer = setTimeout(() => {
      handleClose();
    }, SELF_DESTRUCT_MS);

    // Visual countdown, updated every second.
    const intervalTimer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(destructTimer);
      clearInterval(intervalTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-700
                   p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-400">
            Hint
          </h2>
          <span className="text-xs text-neutral-500 tabular-nums">
            closing in {secondsLeft}s
          </span>
        </div>

        <p className="text-neutral-100 leading-relaxed">{HINT_TEXT}</p>

        <button
          type="button"
          onClick={handleClose}
          className="w-full rounded-lg bg-neutral-800 hover:bg-neutral-700
                     text-neutral-200 text-sm font-medium py-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}