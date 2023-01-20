import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

export interface CountdownProviderProps {
  children: ReactNode;
}

export type TCountdownContextData = {
  minutes: number;
  seconds: number;

  hasFinished: boolean;
  isActive: boolean;

  resetCountdown: () => void;
  startCountdown: () => void;
};

export const CountdownContext = createContext({} as TCountdownContextData);

let timeout: NodeJS.Timeout;
const initialTime = 0.05 * 60;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge, activeChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    if (hasFinished) return;

    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(timeout);
    setIsActive(false);
    setTime(initialTime);
    setHasFinished(false);
  }

  useEffect(() => {
    if (hasFinished && !activeChallenge) {
      resetCountdown();
      return;
    }

    if (isActive) {
      if (time > 0) {
        timeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        clearTimeout(timeout);
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
      }
    }
  }, [isActive, time, activeChallenge, hasFinished]);

  const valueProvider: TCountdownContextData = {
    minutes,
    seconds,
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown,
  };

  return (
    <CountdownContext.Provider value={valueProvider}>
      {children}
    </CountdownContext.Provider>
  );
}
