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
  level: number;
  setCurrentExperience: (currentExperience: number) => any;
  setChallengesCompleted: (challengesCompleted: number) => any;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};

export const ChallengesContext = createContext({} as TChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(
    null as TChallenge | null
  );
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [level, setLevel] = useState(1);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as TChallenge;
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    let newExperience = currentExperience + activeChallenge.amount;

    if (newExperience >= experienceToNextLevel) {
      newExperience = newExperience - experienceToNextLevel;
      setLevel(level + 1);
    }

    setCurrentExperience(newExperience);
    setChallengesCompleted(challengesCompleted + 1);
    resetChallenge();
  }

  const valueProvider: TChallengesContextData = {
    currentExperience,
    experienceToNextLevel,
    activeChallenge,
    challengesCompleted,
    level,
    setCurrentExperience,
    setChallengesCompleted,
    startNewChallenge,
    resetChallenge,
    completeChallenge,
  };

  return (
    <ChallengesContext.Provider value={valueProvider}>
      {children}
    </ChallengesContext.Provider>
  );
}
