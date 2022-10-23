import { useCart } from '@/context/cart-context';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, Fragment } from 'react';
import { CartSummary } from './cart-summary';
import { EmptyCart } from './empty-cart';
import { useLenis } from '@/context/lenis-context';

interface CartModalProps {
  isOpen: boolean;
  closeCart: () => void;
}

export const CartModal = ({ isOpen, closeCart }: CartModalProps) => {
  const lenis = useLenis();
  const { totalCartItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    }

    if (!isOpen) {
      lenis?.start();
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeCart} className="relative z-50" as="div">
        <Overlay />
        <div className="fixed bottom-0 top-auto h-[500px] w-full lg:right-10 lg:bottom-auto lg:top-10 lg:max-w-sm">
          <Transition.Child
            as={Fragment}
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            enter="ease duration-500"
            leave="ease-in duration-300"
            leaveTo="opacity-0 lg:translate-x-10 lg:-translate-y-10 translate-y-10"
            enterFrom="opacity-0 lg:translate-x-10 lg:-translate-y-10 translate-y-10"
          >
            <Dialog.Panel className="h-full w-full rounded-t-2xl border border-white border-opacity-20 bg-noir p-4 lg:rounded-none">
              {totalCartItems > 0 ? <CartSummary /> : <EmptyCart />}
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
      leave="ease-in duration-300"
      enter="linear duration-500"
    >
      <div className="linear fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-500" />
    </Transition.Child>
  );
};
