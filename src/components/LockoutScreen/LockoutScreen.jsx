import { useAppState } from '../../context/AppStateContext';
import { useLockoutCountdown } from '../../hooks/useLockout';

export default function LockoutScreen() {
  const { lockoutTimestamp, maxAttempts } = useAppState();
  const { formatted } = useLockoutCountdown(lockoutTimestamp);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <img
        src="https://media1.tenor.com/m/iCf2IgJfq7IAAAAC/waiting-im.gif"
        alt="Bear waiting patiently"
        className="w-[clamp(160px,32vh,260px)] h-auto rounded-2xl shadow-md"
      />

      <div className="space-y-2">
        <h1
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          className="text-2xl md:text-3xl font-bold"
        >
          Too many attempts
        </h1>
        <p className="max-w-xs mx-auto" style={{ color: 'var(--color-text-soft)' }}>
          You've reached the limit of {maxAttempts} tries. Access unlocks
          automatically when the clock below hits zero.
        </p>
        <p
          className="max-w-xs mx-auto text-sm font-semibold"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          Don't panic, genius  go touch some grass, come back tomorrow,
          and actually use that big brain of yours this time.
        </p>
      </div>

      <div
        className="text-5xl md:text-6xl font-mono tabular-nums tracking-widest rounded-2xl px-8 py-6 shadow-xl"
        style={{
          color: 'var(--color-primary-dark)',
          background: 'var(--color-card)',
        }}
      >
        {formatted}
      </div>

      <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>
        This page will unlock itself — no need to refresh.
      </p>
    </div>
  );
}