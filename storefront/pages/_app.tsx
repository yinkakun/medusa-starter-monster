import type { AppProps } from 'next/app';
import '@/styles/fonts.css';
import '@/styles/global.css';
import '@/styles/tailwind.css';

import { Fragment } from 'react';
import { DefaultSeo } from 'next-seo';
import { CartProvider } from '@/context/cart-context';
import { LenisProvider } from '@/context/lenis-context';

import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <DefaultSeo titleTemplate="%s | Monster" defaultTitle="Monster" />
      <LenisProvider>
        <CartProvider>
          <Toaster position="bottom-right" />
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        </CartProvider>
      </LenisProvider>
    </Fragment>
  );
}
