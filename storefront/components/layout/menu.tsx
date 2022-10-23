import { Dialog, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment } from 'react';
import { ProductCollection } from '@medusajs/medusa';
import { medusaClient } from '@/lib/medusa-client';
import { useLenis } from '@/context/lenis-context';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const [collections, setCollections] = useState<ProductCollection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const { collections } = await medusaClient.collections.list();
      setCollections(collections);
    };

    fetchCollections();
  }, []);

  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    }

    if (!isOpen) {
      lenis?.start();
    }
  }, [isOpen]);

  return (
    <Fragment>
      <button
        onClick={openMenu}
        className={`font-alt-sans text-xs uppercase tracking-widest opacity-80 ${
          isOpen && 'pointer-events-none'
        }`}
      >
        Shop
      </button>
      <MenuModal
        isOpen={isOpen}
        closeMenu={closeMenu}
        collections={collections}
      />
    </Fragment>
  );
};

interface MenuModalProps {
  isOpen: boolean;
  closeMenu: () => void;
  collections: ProductCollection[];
}

const MenuModal = ({ collections, isOpen, closeMenu }: MenuModalProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeMenu} className="relative z-50" as="div">
        <Overlay />
        <div className="fixed bottom-0 top-auto w-full lg:left-10 lg:bottom-auto lg:top-10 lg:max-w-sm">
          <Transition.Child
            as={Fragment}
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            enter="ease duration-500"
            leave="ease-in duration-300"
            leaveTo="opacity-0 lg:-translate-x-10 lg:-translate-y-10 translate-y-10"
            enterFrom="opacity-0 lg:-translate-x-10 lg:-translate-y-10 translate-y-10"
          >
            <Dialog.Panel className="h-full w-full rounded-t-2xl border  border-white border-opacity-30 bg-noir p-4 lg:rounded-none">
              <div className="flex h-full w-full flex-col gap-4">
                <div className="track w-full border-b border-white border-opacity-20 pb-2  font-alt-sans text-sm uppercase opacity-80">
                  <h3>Shop</h3>
                </div>

                <motion.div
                  animate="show"
                  initial="hidden"
                  variants={container}
                  className="flex flex-col gap-6 py-3 lg:gap-10"
                >
                  <motion.div variants={item}>
                    <Link href="/shop">
                      <a className="text-xl capitalize opacity-80 duration-300 hover:text-monster-green-300 lg:text-3xl">
                        All Monsters
                      </a>
                    </Link>
                  </motion.div>
                  {collections.map((collection) => {
                    return (
                      <motion.div key={collection.id} variants={item}>
                        <Link href={`/shop/collections/${collection.handle}`}>
                          <a className="text-xl capitalize opacity-80 duration-300 hover:text-monster-green-300 lg:text-3xl">
                            {collection.title}
                          </a>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const Overlay = () => {
  return (
    <Transition.Child
      as={Fragment}
      leaveTo="opacity-0"
      enterTo="opacity-100"
      enterFrom="opacity-0"
      leaveFrom="opacity-100"
      enter="linear duration-500"
      leave="ease-in duration-300"
    >
      <div className="linear fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-500" />
    </Transition.Child>
  );
};
