import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SlideInCharacters } from '@/components/animations/slide-in-characters';

export const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-80px)]  items-center overflow-hidden border-b border-white border-opacity-10">
      <Container>
        <div className="relative h-[85vh] overflow-hidden border border-white  border-opacity-10">
          <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center gap-4   border-sky-100 px-4 text-center">
            <h1 className=" bg-opacity-70 py-3 text-5xl uppercase leading-snug tracking-widest lg:text-4xl xl:text-8xl">
              <SlideInCharacters text="Unleash The Beast!" />
            </h1>

            <Link href="/shop">
              <a className="hover-border-black flex items-center justify-center border border-white bg-black  px-6 py-3 font-alt-sans text-xl uppercase leading-none tracking-widest text-white transition-colors duration-500 hover:border-monster-green-300 hover:bg-monster-green-900 hover:text-monster-green-300 lg:text-2xl xl:text-3xl">
                <span>Shop Now</span>
              </a>
            </Link>
          </div>

          <Image
            priority
            alt="hero"
            layout="fill"
            objectFit="cover"
            src="/images/hero.webp"
            className="scale-110"
          />

          <motion.div
            variants={infiniteRotate}
            animate="rotate"
            className="absolute bottom-5 right-5 rotate-180 text-white lg:bottom-10 lg:right-10"
          >
            <div className="scale-75 lg:scale-100">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100px"
                height="100px"
                viewBox="0 0 300 300"
                xmlSpace="preserve"
              >
                <defs>
                  <path
                    id="circlePath"
                    d=" M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0"
                  />
                </defs>

                <g>
                  <use xlinkHref="#circlePath" fill="none" />
                  <text fill="#fff">
                    <textPath xlinkHref="#circlePath" fontSize="2rem">
                      SCROLL TO EXPLORE - SCROLL TO EXPLORE -
                    </textPath>
                  </text>
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

const infiniteRotate: Variants = {
  rotate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: 'linear',
    },
  },
};
