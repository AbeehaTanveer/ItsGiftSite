import { useEffect, useState } from 'react';

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * useLockoutCountdown
 * --------------------
 * Ticks down from `targetTimestamp` to zero, updating every second.
 * Returns a formatted HH:MM:SS string and whether the countdown has expired.
 */
export function useLockoutCountdown(targetTimestamp) {
  const [remainingMs, setRemainingMs] = useState(() =>
    targetTimestamp ? targetTimestamp - Date.now() : 0
  );

  useEffect(() => {
    if (!targetTimestamp) return;

    const intervalId = setInterval(() => {
      setRemainingMs(targetTimestamp - Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTimestamp]);

  return {
    formatted: formatDuration(remainingMs),
    isExpired: remainingMs <= 0,
  };
}