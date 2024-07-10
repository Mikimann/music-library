import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { dmSans, dmSerifDisplay } from '@/styles/fonts/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
