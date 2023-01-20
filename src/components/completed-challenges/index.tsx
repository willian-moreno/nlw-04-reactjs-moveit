import styles from './index.module.scss';

export function CompletedChallenges() {
  return (
    <div className={`${styles.completedChallengesContainer}`}>
      <span className={`${styles.title}`}>Desafios Completos</span>
      <span className={`${styles.quantity}`}>5</span>
    </div>
  );
}
