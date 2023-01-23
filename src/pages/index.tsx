import { ChallengeBox } from '@/components/challenge-box';
import { CompletedChallenges } from '@/components/completed-challenges';
import { Countdown } from '@/components/countdown';
import { ExperienceBar } from '@/components/experience-bar';
import { Profile } from '@/components/profile';
import { ChallengesProvider } from '@/contexts/ChallengesContext';
import { CountdownProvider } from '@/contexts/CountdownContext';
import styles from '@/pages/index.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  challengesContextCookies: {
    level: number;
    challengesCompleted: number;
    currentExperience: number;
  };
}

export default function Home({ challengesContextCookies }: HomeProps) {
  return (
    <>
      <ChallengesProvider cookies={challengesContextCookies}>
        <Head>
          <title>Início | Move.it</title>
        </Head>
        <div className={`${styles.container}`}>
          <ExperienceBar />
          <CountdownProvider>
            <section className={`${styles.mainSection}`}>
              <div className={`${styles.leftContainer}`}>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div className={`${styles.rightContainer}`}>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, challengesCompleted, currentExperience } = context.req.cookies;

  const challengesContextCookies = {
    level: Number(level),
    challengesCompleted: Number(challengesCompleted),
    currentExperience: Number(currentExperience),
  };

  return {
    props: {
      challengesContextCookies,
    } as HomeProps,
  };
};
