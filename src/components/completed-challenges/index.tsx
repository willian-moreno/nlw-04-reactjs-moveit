import { ChallengesContext } from '@/contexts/ChallengesContext';
import { useContext } from 'react';
import styles from './index.module.scss';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={`${styles.completedChallengesContainer}`}>
      <span className={`${styles.title}`}>Desafios Completos</span>
      <span className={`${styles.quantity}`}>{challengesCompleted}</span>
    </div>
  );
}
