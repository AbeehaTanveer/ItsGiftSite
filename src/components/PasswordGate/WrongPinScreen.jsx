import BearBonkScene from '../shared/BearBonkScene';

export default function WrongPinScreen({ onRetry }) {
  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 px-6 text-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <BearBonkScene className="w-[clamp(220px,48vh,420px)] h-auto" />

      {/* Big floating meme-style text */}
      <p
        className="animate-float-text text-4xl md:text-6xl font-black leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-primary-dark)',
          WebkitTextStroke: '2px var(--color-card)',
        }}
      >
        Try again, bruh 😭
      </p>

      <p className="text-sm md:text-base" style={{ color: 'var(--color-text-soft)' }}>
        Go back and enter the code again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="rounded-2xl px-8 py-3 text-lg font-bold shadow-sm active:scale-95 transition-transform"
        style={{
          fontFamily: 'var(--font-display)',
          background: 'var(--color-primary)',
          color: '#FFFFFF',
        }}
      >
        Try again
      </button>
    </div>
  );
}