import { useState, useEffect } from 'react';
import styles from './index.module.scss';

export function Countdown() {
  let timeout: NodeJS.Timeout;
  const initialTime = 0.05 * 60;

  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteDecimal, minuteUnity] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondDecimal, secondUnity] = String(seconds)
    .padStart(2, '0')
    .split('');

  function startCountdown() {
    if (hasFinished) return;
    
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(timeout);
    setIsActive(false);
    setTime(initialTime);
  }

  useEffect(() => {
    if (isActive) {
      if (time > 0) {
        timeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        clearTimeout(timeout);
        setHasFinished(true);
        setIsActive(false);
      }
    }
  }, [isActive, time]);

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
