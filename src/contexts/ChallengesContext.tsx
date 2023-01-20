import challenges from '@base/challenges.json';
import { ReactNode, createContext, useEffect, useState } from 'react';

export interface ChallengesProviderProps {
  children: ReactNode;
}

export type TChallenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
};

export type TChallengesContextData = {
  currentExperience: number;
  experienceToNextLevel: number;
  activeChallenge: TChallenge | null;
  challengesCompleted: number;
  countdownFinished: boolean;
  level: number;
  setCurrentExperience: (currentExperience: number) => any;
  setChallengesCompleted: (challengesCompleted: number) => any;
  setCountdownFinished: (countdownFinished: boolean) => any;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  challengeCompleted: () => void;
};

export const ChallengesContext = createContext({} as TChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(
    null as TChallenge | null
  );
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [level, setLevel] = useState(1);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as TChallenge;
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function challengeCompleted() {
    const addExperience = activeChallenge
      ? currentExperience + activeChallenge.amount
      : currentExperience;
    setCurrentExperience(addExperience);
    setChallengesCompleted(challengesCompleted + 1);
    resetChallenge();
  }

  useEffect(() => {
    if (currentExperience >= experienceToNextLevel) {
      const experienceRest = currentExperience - experienceToNextLevel;
      levelUp();
      setCurrentExperience(experienceRest);
    }
  }, [currentExperience]);

  const valueProvider: TChallengesContextData = {
    currentExperience,
    experienceToNextLevel,
    setCurrentExperience,
    activeChallenge,
    challengesCompleted,
    setChallengesCompleted,
    countdownFinished,
    setCountdownFinished,
    level,
    levelUp,
    startNewChallenge,
    resetChallenge,
    challengeCompleted,
  };

  return (
    <ChallengesContext.Provider value={valueProvider}>
      {children}
    </ChallengesContext.Provider>
  );
}
