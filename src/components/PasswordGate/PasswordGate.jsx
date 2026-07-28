import { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import CuteMascotBoy from '../shared/CuteMascotBoy';
import HintModal from './HintModal';
import WrongPinScreen from './WrongPinScreen';

const SECRET_KEY = '272146619';
// const SECRET_KEY = '111111111'; // For testing purposes only — change this to the real secret key in production.
const MAX_PIN_LENGTH = SECRET_KEY.length;

const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'enter'];

export default function PasswordGate() {
  const [pin, setPin] = useState('');
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [showWrongPin, setShowWrongPin] = useState(false);

  const {
    registerFailedAttempt,
    registerSuccessfulAttempt,
    remainingAttempts,
    maxAttempts,
    isHintAvailable,
  } = useAppState();

  const handleDigit = (digit) => {
    if (pin.length >= MAX_PIN_LENGTH) return;
    setPin((prev) => prev + digit);
  };

  const handleClear = () => setPin((prev) => prev.slice(0, -1));

  const handleEnter = () => {
    const normalized = pin.trim();

    if (normalized === SECRET_KEY) {
      registerSuccessfulAttempt();
      return;
    }

    registerFailedAttempt();
    setPin('');
    setShowWrongPin(true);
  };

  const handleKeyPress = (key) => {
    if (key === 'clear') return handleClear();
    if (key === 'enter') return handleEnter();
    return handleDigit(key);
  };

  if (showWrongPin) {
    return <WrongPinScreen onRetry={() => setShowWrongPin(false)} />;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
      style={{
        height: '100dvh',
        background:
          'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)',
        fontFamily: 'var(--font-body)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Mascot side */}
      <div className="flex-none md:flex-1 min-h-0 flex flex-col items-center justify-center gap-2 sm:gap-3 px-4 pt-4 pb-2 sm:py-2">
        <CuteMascotBoy className="w-[clamp(96px,28vh,340px)] h-[clamp(96px,28vh,340px)]" />
        <div
          className="relative bg-white rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-md"
          style={{ color: 'var(--color-text)' }}
        >
          <p
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-sm sm:text-base md:text-lg font-semibold text-center"
          >
            Enter the secret code~
          </p>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 md:hidden" />
        </div>
      </div>

      {/* PIN display + keypad side */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2.5 sm:gap-3 px-4 pb-4 pt-2 sm:py-2">
        {/* PIN display */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-[280px] sm:max-w-sm">
          {Array.from({ length: MAX_PIN_LENGTH }).map((_, i) => {
            const isFilled = i < pin.length;
            return (
              <div
                key={i}
                className={`w-[clamp(16px,3.6vh,32px)] h-[clamp(16px,3.6vh,32px)] rounded-full border-2 flex-shrink-0
                            ${isFilled ? 'animate-pin-pop' : ''}`}
                style={{
                  borderColor: 'var(--color-primary)',
                  background: isFilled ? 'var(--color-primary)' : 'transparent',
                }}
              />
            );
          })}
        </div>

        <p className="text-xs sm:text-sm md:text-base text-center" style={{ color: 'var(--color-text-soft)' }}>
          {remainingAttempts} of {maxAttempts} attempts remaining
        </p>

        {/* Big on-screen keypad */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[260px] sm:max-w-sm">
          {KEYPAD_KEYS.map((key) => {
            const isAction = key === 'clear' || key === 'enter';
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="aspect-square rounded-2xl text-2xl sm:text-3xl md:text-4xl font-bold shadow-sm
                           active:scale-95 transition-transform flex items-center justify-center
                           min-w-0 min-h-0 touch-manipulation select-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: isAction ? 'var(--color-secondary)' : 'var(--color-card)',
                  color: isAction ? '#FFFFFF' : 'var(--color-text)',
                }}
              >
                {key === 'clear' ? '⌫' : key === 'enter' ? '✓' : key}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsHintOpen(true)}
          disabled={!isHintAvailable}
          className="flex items-center gap-2 text-xs sm:text-sm md:text-base disabled:opacity-40 disabled:cursor-not-allowed py-1"
          style={{ color: 'var(--color-text-soft)' }}
        >
          <span role="img" aria-label="hint">💡</span>
          Hint
        </button>

        {!isHintAvailable && (
          <p className="text-xs text-center" style={{ color: 'var(--color-text-soft)' }}>
            Hint available again tomorrow
          </p>
        )}
      </div>

      {isHintOpen && <HintModal onClose={() => setIsHintOpen(false)} />}
    </div>
  );
}