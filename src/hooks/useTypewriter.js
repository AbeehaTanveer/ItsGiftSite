import { useEffect, useState } from 'react';

const DEFAULT_INTERVAL_MS = 50;

/**
 * useTypewriter
 * -------------
 * Splits `text` into a character array and reveals it one character at a
 * time on a fixed interval. Returns the currently-visible substring and
 * whether the animation has finished.
 */
export function useTypewriter(text, intervalMs = DEFAULT_INTERVAL_MS) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);

    const characters = Array.from(text);
    let index = 0;

    const intervalId = setInterval(() => {
      index += 1;
      setVisibleCount(index);

      if (index >= characters.length) {
        clearInterval(intervalId);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [text, intervalMs]);

  const displayedText = Array.from(text).slice(0, visibleCount).join('');
  const isComplete = visibleCount >= Array.from(text).length;

  return { displayedText, isComplete };
}