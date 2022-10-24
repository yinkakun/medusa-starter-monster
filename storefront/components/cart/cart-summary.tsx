import Link from 'next/link';
import { Minus, Plus, X } from 'react-feather';
import { useCart } from '@/context/cart-context';
import { LineItem } from '@medusajs/medusa';
import Image from 'next/image';

export const CartSummary = () => {
  const { cart } = useCart();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="track w-full border-b border-white border-opacity-20 pb-2 text-center font-alt-sans text-sm uppercase opacity-80">
        <h3>Shopping Cart</h3>
      </div>

      <div
        data-lenis-prevent
        className="scrollbar-hide flex grow flex-col gap-4 overflow-y-scroll overscroll-contain"
      >
        {cart?.items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>

      <div className="mt-auto w-full">
        <div className="flex w-full items-center justify-between py-2 font-alt-sans text-sm uppercase">
          <span>Total</span>
          <span>${((cart?.total || 0) / 100).toFixed(2)}</span>
        </div>
        <Link href="/checkout">
          <a className="flex w-full items-center justify-center border border-white border-opacity-50 p-2 text-center text-xs uppercase duration-300 hover:border-monster-green-300 hover:text-monster-green-300">
            <span>Continue To Checkout</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateItem } = useCart();
  const itemQuantity = item.quantity;

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  const decreaseQuantity = () => {
    if (itemQuantity > 1) {
      updateItem({
        lineId: item.id,
        quantity: itemQuantity - 1,
      });
    } else {
      removeItem(item.id);
    }
  };

  const increaseQuantity = () => {
    updateItem({
      lineId: item.id,
      quantity: itemQuantity + 1,
    });
  };

  return (
    <div data-lenis-prevent>
      <div className="flex items-center justify-between gap-4 font-alt-sans text-white text-opacity-90">
        <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center border-white border-opacity-20 bg-white bg-opacity-10">
          <Image src={item.thumbnail || ''} width={20} height={50} />
        </div>

        <div className="flex grow flex-col gap-2 text-sm">
          <div className="text-sm">{item.title}</div>
          <div className="flex items-center gap-4 text-xs">
            <div>${(item.unit_price / 100).toFixed(2)}</div>

            <div className="flex divide-x divide-white divide-opacity-20 border border-white border-opacity-20">
              <button
                onClick={decreaseQuantity}
                className="flex items-center justify-center p-1"
              >
                <Minus size={16} className="" />
              </button>
              <div className="flex items-center justify-center p-1 px-2">
                <span> {item.quantity}</span>
              </div>
              <button
                onClick={increaseQuantity}
                className="flex items-center justify-center p-1"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleRemoveItem}
            className="text-xs uppercase underline hover:text-monster-green-300"
          >
            <span className="sr-only">Remove Item</span>
            <X size={24} strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
};
