import { ChallengesContext } from '@/contexts/ChallengesContext';
import { CSSProperties, useContext } from 'react';
import styles from './index.module.scss';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } =
    useContext(ChallengesContext);

  const percentageToNextLevel =
    (currentExperience / experienceToNextLevel) * 100;

  const experienceBarStyle: CSSProperties = {
    width: `${percentageToNextLevel}%`,
    transition: 'width 0.5s ease',
  };

  const currentExperienceStyle: CSSProperties = {
    left: `${percentageToNextLevel}%`,
    transition: 'left 0.5s ease',
  };

  return (
    <header className={`${styles.experienceBarContainer}`}>
      <span>0 xp</span>
      <div className={`${styles.bar}`}>
        <div
          className={`${styles.bar} ${styles.experience}`}
          style={experienceBarStyle}
        />
        <span
          className={`${styles.currentExperience}`}
          style={currentExperienceStyle}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
