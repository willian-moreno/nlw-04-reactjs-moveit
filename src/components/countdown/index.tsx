import { CountdownContext } from '@/contexts/CountdownContext';
import { useContext } from 'react';
import styles from './index.module.scss';

export function Countdown() {
  const { minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown } =
    useContext(CountdownContext);

  const [minuteDecimal, minuteUnity] = String(minutes).padStart(2, '0').split('');
  const [secondDecimal, secondUnity] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={`${styles.countdownContainer}`}>
        <div className={`${styles.counter}`}>
          <span>{minuteDecimal}</span>
          <span>{minuteUnity}</span>
        </div>
        <span>:</span>
        <div className={`${styles.counter}`}>
          <span>{secondDecimal}</span>
          <span>{secondUnity}</span>
        </div>
      </div>
      <button
        type="button"
        className={`
          ${styles.countdownBtn} 
          ${(hasFinished && '') || (isActive && styles.active) || ''}
          `}
        disabled={hasFinished}
        onClick={() => (isActive ? resetCountdown() : startCountdown())}
      >
        {(hasFinished && 'Ciclo encerrado') ||
          (isActive && 'Abandonar ciclo') ||
          'Iniciar um ciclo'}
      </button>
    </>
  );
}
