import type { AppProps } from 'next/app';
import '@/styles/fonts.css';
import '@/styles/tailwind.css';
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
