import { LevelUpModal } from '@/components/level-up-modal';
import challenges from '@base/challenges.json';
import Cookies from 'js-cookie';
import { ReactNode, createContext, useEffect, useState } from 'react';

export interface ChallengesProviderProps {
  children: ReactNode;
  cookies: ContextCookies;
}

interface ContextCookies {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
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
  closeLevelUpModal: () => void;
};

export const ChallengesContext = createContext({} as TChallengesContextData);

export function ChallengesProvider({ children, cookies }: ChallengesProviderProps) {
  const [level, setLevel] = useState(cookies.level || 1);
  const [currentExperience, setCurrentExperience] = useState(cookies.currentExperience || 0);
  const [challengesCompleted, setChallengesCompleted] = useState(cookies.challengesCompleted || 0);
  const [activeChallenge, setActiveChallenge] = useState(null as TChallenge | null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as TChallenge;

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('🔔 Novo desafio! 🔔', {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
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
      setIsLevelUpModalOpen(true);
    }

    setCurrentExperience(newExperience);
    setChallengesCompleted(challengesCompleted + 1);
    resetChallenge();
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
    closeLevelUpModal,
  };

  return (
    <ChallengesContext.Provider value={valueProvider}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
