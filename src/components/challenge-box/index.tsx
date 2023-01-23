import { ChallengesContext } from '@/contexts/ChallengesContext';
import { CountdownContext } from '@/contexts/CountdownContext';
import { useContext } from 'react';
import styles from './index.module.scss';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } =
    useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={`${styles.challengeBoxContainer}`}>
      {activeChallenge && Object.keys(activeChallenge).length ? (
        <div className={`${styles.challengeIsActive}`}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img
              src={''.concat('icons/', activeChallenge.type, '.svg')}
              alt=""
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={`${styles.btn} ${styles.challengeFailedBtn}`}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.challengeSucceededBtn}`}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={`${styles.challengeNotActive}`}>
          <p>Inicie um ciclo para receber desafios</p>
          <p>
            <img
              src="icons/level-up.svg"
              alt="Level up"
            />
            Avance de level completando os desafios.
          </p>
        </div>
      )}
    </div>
  );
}
