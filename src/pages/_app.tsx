import { ChallengesProvider } from '@/contexts/ChallengesContext';
import '@/styles/global.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}
