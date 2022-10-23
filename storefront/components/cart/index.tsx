import { CartModal } from './cart-modal';
import { useCart } from '@/context/cart-context';
import { useState, useEffect, useRef, Fragment } from 'react';

export const CartButton = () => {
  const { totalCartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  return (
    <Fragment>
      <button
        onClick={openCart}
        className={`font-alt-sans text-xs uppercase tracking-widest opacity-80 ${
          isOpen && 'pointer-events-none'
        }`}
      >
        Cart [{totalCartItems}]
      </button>
      <CartModal isOpen={isOpen} closeCart={closeCart} />
    </Fragment>
  );
};
