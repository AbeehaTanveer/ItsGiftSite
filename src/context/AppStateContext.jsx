import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * AppStateContext
 * ----------------
 * Central state machine for the progressive-reveal birthday app.
 *
 * activeStep values:
 *   0 = Lockout Screen      (conditional override, shown when attempts >= 5)
 *   1 = Password Gate       (initial state)
 *   2 = Rose Gesture Screen
 *   3 = Big Birthday Cake Screen
 *   4 = Confetti Burst & Envelope Screen
 *   5 = Typewriter Letter Screen (final destination)
 *
 * Persistence keys (localStorage):
 *   failed_attempts    - number of consecutive failed password attempts
 *   lockout_timestamp  - epoch ms marking when lockout expires
 *   hint_last_opened   - toDateString() of the last time the hint was viewed
 */

const STORAGE_KEYS = {
  FAILED_ATTEMPTS: 'failed_attempts',
  LOCKOUT_TIMESTAMP: 'lockout_timestamp',
  HINT_LAST_OPENED: 'hint_last_opened',
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const AppStateContext = createContext(null);

function readNumber(key, fallback = 0) {
  const raw = localStorage.getItem(key);
  const parsed = raw === null ? fallback : Number(raw);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function AppStateProvider({ children }) {
  // --- Core step state -----------------------------------------------
  const [activeStep, setActiveStep] = useState(1);

  // --- Lockout engine state --------------------------------------------
  const [failedAttempts, setFailedAttempts] = useState(() =>
    readNumber(STORAGE_KEYS.FAILED_ATTEMPTS, 0)
  );
  const [lockoutTimestamp, setLockoutTimestamp] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCKOUT_TIMESTAMP);
    return raw ? Number(raw) : null;
  });
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Re-evaluate lockout status on mount, whenever the timestamp changes, and
  // on a 1s interval while locked out so the screen clears itself the moment
  // the countdown hits zero (no page refresh required).
  useEffect(() => {
    if (!lockoutTimestamp) {
      setIsLockedOut(false);
      return;
    }

    const evaluate = () => {
      if (Date.now() > lockoutTimestamp) {
        // Lockout window has expired - reset everything.
        localStorage.removeItem(STORAGE_KEYS.LOCKOUT_TIMESTAMP);
        localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, '0');
        setFailedAttempts(0);
        setLockoutTimestamp(null);
        setIsLockedOut(false);
        return true;
      }
      setIsLockedOut(true);
      return false;
    };

    if (evaluate()) return;

    const intervalId = setInterval(() => {
      if (evaluate()) clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lockoutTimestamp]);

  // Keep activeStep pinned to the lockout screen while locked out.
  useEffect(() => {
    if (isLockedOut) {
      setActiveStep(0);
    } else if (activeStep === 0) {
      setActiveStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLockedOut]);

  const registerFailedAttempt = useCallback(() => {
    setFailedAttempts((prev) => {
      const next = prev + 1;
      localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, String(next));

      if (next >= MAX_ATTEMPTS) {
        const expiry = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem(STORAGE_KEYS.LOCKOUT_TIMESTAMP, String(expiry));
        setLockoutTimestamp(expiry);
        setIsLockedOut(true);
        setActiveStep(0);
      }

      return next;
    });
  }, []);

  const registerSuccessfulAttempt = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, '0');
    setFailedAttempts(0);
    setActiveStep(2);
  }, []);

  const remainingAttempts = Math.max(0, MAX_ATTEMPTS - failedAttempts);

  // --- Hint modal cooldown state ---------------------------------------
  const [hintLastOpened, setHintLastOpened] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.HINT_LAST_OPENED)
  );

  const isHintAvailable = hintLastOpened !== new Date().toDateString();

  const markHintOpened = useCallback(() => {
    const today = new Date().toDateString();
    localStorage.setItem(STORAGE_KEYS.HINT_LAST_OPENED, today);
    setHintLastOpened(today);
  }, []);

  // --- Step navigation helpers ------------------------------------------
  const goToNextStep = useCallback(() => {
    setActiveStep((prev) => (prev < 5 ? prev + 1 : prev));
  }, []);

  const goToStep = useCallback((step) => {
    setActiveStep(step);
  }, []);

  const value = {
    // step machine
    activeStep,
    goToNextStep,
    goToStep,

    // lockout engine
    isLockedOut,
    lockoutTimestamp,
    failedAttempts,
    remainingAttempts,
    maxAttempts: MAX_ATTEMPTS,
    registerFailedAttempt,
    registerSuccessfulAttempt,

    // hint modal
    isHintAvailable,
    markHintOpened,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return ctx;
}

export { STORAGE_KEYS, MAX_ATTEMPTS, LOCKOUT_DURATION_MS };