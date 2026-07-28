import { AppStateProvider, useAppState } from './context/AppStateContext';

// NOTE: These screens are stubs for now. Each will be replaced with its
// full implementation in subsequent files (File #2 - File #6).
import LockoutScreen from './components/LockoutScreen/LockoutScreen';
import PasswordGate from './components/PasswordGate/PasswordGate';
import RoseScreen from './components/RoseScreen/RoseScreen';
import CakeScreen from './components/CakeScreen/CakeScreen';
import EnvelopeScreen from './components/EnvelopeScreen/EnvelopeScreen';
import TypewriterLetter from './components/TypewriterLetter/TypewriterLetter';

/**
 * StepRouter
 * ----------
 * Pure presentational switch over `activeStep`. Keeping this logic isolated
 * from AppStateContext means the state machine itself has zero knowledge of
 * what gets rendered - it only tracks *which* step is active.
 */
function StepRouter() {
  const { activeStep, isLockedOut } = useAppState();

  // Lockout overrides every other screen, regardless of activeStep.
  if (isLockedOut) {
    return <LockoutScreen />;
  }

  switch (activeStep) {
    case 1:
      return <PasswordGate />;
    case 2:
      return <RoseScreen />;
    case 3:
      return <CakeScreen />;
    case 4:
      return <EnvelopeScreen />;
    case 5:
      return <TypewriterLetter />;
    default:
      return <PasswordGate />;
  }
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen w-full flex items-center justify-center overflow-hidden"
           style={{
             background: 'radial-gradient(circle at 50% 0%, var(--color-bg-soft), var(--color-bg) 70%)'
           }}>
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl px-4">
          <StepRouter />
        </div>
      </div>
    </AppStateProvider>
  );
}