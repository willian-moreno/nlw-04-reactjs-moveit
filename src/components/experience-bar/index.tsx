import { CSSProperties } from 'react';
import styles from './index.module.scss';

export function ExperienceBar() {
  const minLevelExperience = 0;
  const maxLevelExperience = 600;
  const currentPercentage = 60;
  const experienceBarStyle: CSSProperties = {
    width: `${currentPercentage}%`,
  };
  const currentExperienceStyle: CSSProperties = {
    left: `${currentPercentage}%`,
  };

  const currentExperience = (600 * currentPercentage) / 100;

  return (
    <header className={`${styles['experience-bar']}`}>
      <span>{minLevelExperience} xp</span>
      <div className={`${styles.bar}`}>
        <div
          className={`${styles.bar} ${styles.experience}`}
          style={experienceBarStyle}
        />
        <span
          className={`${styles['current-experience']}`}
          style={currentExperienceStyle}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{maxLevelExperience} xp</span>
    </header>
  );
}
