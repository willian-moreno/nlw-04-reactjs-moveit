import styles from '@/pages/index.module.scss';
import { ExperienceBar } from '@/components/experience-bar';
import { Profile } from '@/components/profile';
import { CompletedChallenges } from '@/components/completed-challenges';
import { Countdown } from '@/components/countdown';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | Move.it</title>
      </Head>
      <div className={`${styles.container}`}>
        <ExperienceBar />
        <section className={`${styles.mainSection}`}>
          <div className={`${styles.leftContainer}`}>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div className={`${styles.rightContainer}`}></div>
        </section>
      </div>
    </>
  );
}
