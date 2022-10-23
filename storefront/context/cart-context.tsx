import { Cart } from '@medusajs/medusa';
import { medusaClient } from '@/lib/medusa-client';
import { createContext, useContext, useEffect, useState } from 'react';

type CartState = Omit<Cart, 'refundable_amount' | 'refunded_total'> | null;

const initialCartState: CartState = null;

interface CartContext {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_ID = 'cart_id';
const isBrowser = typeof window !== 'undefined';

const cartId = isBrowser ? localStorage.getItem(CART_ID) : null;

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartIsInit, setCartIsInit] = useState(false);
  const [cart, setCart] = useState<CartState>(initialCartState);

  useEffect(() => {
    if (cartIsInit) return;

    const initializeCart = async () => {
      const cartId = isBrowser && window.localStorage.getItem(CART_ID);

      const setCartId = (cartId: string) => {
        if (isBrowser) {
          window.localStorage.setItem(CART_ID, cartId);
        }
      };

      const DEFAULT_REGION_ID = await (
        await medusaClient.regions.list()
      ).regions[0].id;

      if (!cartId) {
        const { cart } = await medusaClient.carts.create({
          region_id: DEFAULT_REGION_ID,
        });

        if (!cart || cart.completed_at) {
          setCartId('');
          setCart(initialCartState);
        }
        setCartId(cart.id);
        setCart(cart);
      }

      if (cartId) {
        const { cart } = await medusaClient.carts.retrieve(cartId);
        setCart((prev) => ({ ...prev, ...cart }));
      }
    };

    initializeCart();
    setCartIsInit(true);
  }, [cart, setCart, cartIsInit, setCartIsInit]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

interface AddItemParams {
  variantId: string;
  quantity: number;
}

interface UpdateItemParams {
  lineId: string;
  quantity: number;
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined || context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, setCart } = context;

  const addItem = async ({ variantId, quantity }: AddItemParams) => {
    if (cartId) {
      const { cart } = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: variantId,
        quantity,
      });
      setCart(cart);
    }
  };

  const updateItem = async ({ lineId, quantity }: UpdateItemParams) => {
    if (cartId) {
      const { cart } = await medusaClient.carts.lineItems.update(
        cartId,
        lineId,
        {
          quantity,
        },
      );
      setCart(cart);
    }
  };

  const removeItem = async (lineId: string) => {
    if (cartId) {
      const { cart } = await medusaClient.carts.lineItems.delete(
        cartId,
        lineId,
      );
      setCart(cart);
    }
  };

  const totalCartItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const emptyCart = async () => {
    if (cartId) {
    }
  };

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    emptyCart,
    totalCartItems,
  };
};
