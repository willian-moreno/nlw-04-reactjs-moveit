import styles from './index.module.scss';
import { useContext, useState } from 'react';
import { ChallengesContext } from '@/contexts/ChallengesContext';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  const [isModalClosing, setIsModalClosing] = useState(false);

  function handleCloseModal() {
    setIsModalClosing(true);
    setTimeout(() => {
      closeLevelUpModal();
    }, 700);
  }

  return (
    <>
      <div className={`${styles.overlay} ${isModalClosing && styles.hide}`}>
        <div className={`${styles.levelUpModalContainer}`}>
          <header>{level}</header>
          <strong>Parabéns</strong>
          <p>Você alcançou um novo level!</p>

          <button
            type="button"
            onClick={handleCloseModal}
          >
            <img
              src="/icons/close.svg"
              alt="Fechar modal"
            />
          </button>
        </div>
      </div>
    </>
  );
}
