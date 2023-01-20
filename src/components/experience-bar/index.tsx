import { CSSProperties } from 'react';
import styles from './index.module.scss';

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

export function ExperienceBar() {
  return (
    <header className={`${styles.experienceBarContainer}`}>
      <span>{minLevelExperience} xp</span>
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
      <span>{maxLevelExperience} xp</span>
    </header>
  );
}
