import { Cart } from '@medusajs/medusa';
import { medusaClient } from '@/lib/medusa-client';
import { createContext, useContext, useEffect, useState } from 'react';

type CartState = Omit<Cart, 'refundable_amount' | 'refunded_total'> | null;

const initialCartState: CartState = null;

interface CartContext {
  cart: CartState;
  cartId: string;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_ID = 'cart_id';
const isBrowser = typeof window !== 'undefined';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartIsInit, setCartIsInit] = useState(false);
  const [cart, setCart] = useState<CartState>(initialCartState);
  const [cartId, setCartId] = useState<string>('');

  useEffect(() => {
    if (cartIsInit) return;
    const cartId = isBrowser && window.localStorage.getItem(CART_ID);

    const saveCartId = (cartId: string) => {
      if (isBrowser) {
        window.localStorage.setItem(CART_ID, cartId);
        setCartId(cartId);
      }
    };

    const createNewCart = async () => {
      const DEFAULT_REGION_ID = await (
        await medusaClient.regions.list()
      ).regions[0].id;

      const { cart } = await medusaClient.carts.create({
        region_id: DEFAULT_REGION_ID,
      });

      saveCartId(cart.id);
      setCart(cart);
    };

    const initializeCart = async () => {
      if (!cartId) {
        createNewCart();
      }

      if (cartId) {
        const { cart } = await medusaClient.carts.retrieve(cartId);

        if (!cart || cart.completed_at) {
          createNewCart();
        }

        setCart(cart);
      }
    };

    initializeCart();
    setCartIsInit(true);
  }, [cart, setCart, cartIsInit]);

  return (
    <CartContext.Provider value={{ cart, setCart, cartId }}>
      {children}
    </CartContext.Provider>
  );
};

interface AddItemParams {
  variantId: string;
  quantity: number;
  onError?: () => void;
  onSuccess?: () => void;
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

  const { cart, setCart, cartId } = context;

  const addItem = async ({
    variantId,
    quantity,
    onError,
    onSuccess,
  }: AddItemParams) => {
    if (!cartId) {
      throw new Error('No cart id found');
    }

    try {
      const { cart } = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: variantId,
        quantity,
      });
      setCart(cart);
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      onError && onError();
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
