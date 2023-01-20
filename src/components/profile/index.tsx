import styles from './index.module.scss';

export function Profile() {
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
          Level 1
        </p>
      </div>
    </div>
  );
}
