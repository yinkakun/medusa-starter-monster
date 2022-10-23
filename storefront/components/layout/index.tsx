import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { CustomCursor } from './custom-cursor';
import { motion, Variants } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';
import { useIsomorphicLayoutEffect } from '@/hooks/use-layout-effect';

const transitionAnimation: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: 'anticipate',
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  exit: {
    opacity: 1,
  },
};

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Layout = ({ children, title }: LayoutProps) => {
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    const setViewHeight = () => {
      document.documentElement.style.setProperty(
        '--vh',
        window.innerHeight * 0.01 + 'px',
      );
    };

    window.addEventListener('resize', setViewHeight);
    setViewHeight();

    return () => {
      window.removeEventListener('resize', setViewHeight);
    };
  }, []);

  const isTouchDevice = useIsTouchDevice();

  return (
    <Fragment>
      <NextSeo title={title} />
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <main className="flex h-full grow flex-col pt-16">{children}</main>
        {!isTouchDevice && <CustomCursor />}
        <motion.div
          key={router.asPath}
          className="fixed inset-0 z-[100] flex flex-grow items-center justify-center bg-noir px-4 py-4"
          exit="exit"
          initial="initial"
          animate="animate"
          variants={transitionAnimation}
        />
        <Footer />
      </div>
    </Fragment>
  );
};
