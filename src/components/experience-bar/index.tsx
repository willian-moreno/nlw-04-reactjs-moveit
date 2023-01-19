import { CSSProperties } from 'react';
import './index.scss';

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
    <header className="experience-bar">
      <span>{minLevelExperience} xp</span>
      <div className="bar">
        <div
          className="bar experience"
          style={experienceBarStyle}
        />
        <span
          className="current-experience"
          style={currentExperienceStyle}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{maxLevelExperience} xp</span>
    </header>
  );
}
