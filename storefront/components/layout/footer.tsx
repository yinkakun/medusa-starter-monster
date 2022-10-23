import { Container } from '@/components/layout/container';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Shop',
    href: '/shop',
  },
  {
    label: 'About',
    href: '/about',
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white border-opacity-10 bg-noir">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-10 py-6">
          <div className="flex flex-col gap-4 text-xs uppercase">
            <h3>Monster</h3>
            {NAV_LINKS.map(({ label, href }) => {
              return (
                <Link key={label} href={href}>
                  <a className="text-white opacity-60 hover:opacity-100">
                    {label}
                  </a>
                </Link>
              );
            })}
          </div>

          <div>
            <div className="flex flex-col gap-4 text-xs uppercase">
              <h3>Socials</h3>
              {SOCIAL_LINKS.map(({ label, href }) => {
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white opacity-60 hover:opacity-100"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 text-xs uppercase">
            <a href="medusajs.com" target="_blank">
              <div className="w-full max-w-[200px]">
                <Image
                  src="/images/powered-by-medusa.svg"
                  width={154}
                  height={24}
                />
              </div>
            </a>
            <div className="flex gap-1">
              <span className="font-alt-sans opacity-80">
                Design and development by
              </span>
              <a href="https://twitter.com/yinkakun">Yinka</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
