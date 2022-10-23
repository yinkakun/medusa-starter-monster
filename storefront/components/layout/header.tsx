import Link from 'next/link';
import { CartButton } from '@/components/cart';
import { MenuButton } from './menu';

import { Container } from '@/components/layout/container';

export const Header = () => {
  return (
    <div className="fixed inset-x-0 z-50 flex h-16 items-center border-b border-white border-opacity-10 bg-noir bg-opacity-40 font-alt-sans backdrop-blur-md">
      <Container>
        <header className="flex w-full items-center justify-between text-sm uppercase tracking-widest">
          <MenuButton />

          <Link href="/">
            <a className="text-lg lowercase opacity-80">Monster.</a>
          </Link>

          <CartButton />
        </header>
      </Container>
    </div>
  );
};
