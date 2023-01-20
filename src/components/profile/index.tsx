import { ChallengesContext } from '@/contexts/ChallengesContext';
import { useContext } from 'react';
import styles from './index.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={`${styles.profileContainer}`}>
      <img
        className={`${styles.photo}`}
        src="https://github.com/willian-moreno.png"
        alt="Profile image"
        referrerPolicy="no-referrer"
      />
      <div className={`${styles.details}`}>
        <strong className={`${styles.name}`}>Willian Moreno</strong>
        <p className={`${styles.level}`}>
          <img
            src="icons/level.svg"
            alt="Level"
          />
          Level {level}
        </p>
      </div>
    </div>
  );
}
