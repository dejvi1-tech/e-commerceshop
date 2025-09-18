import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  productId: string;
  title: string;
  price: number;
  qty: number;
  image: string;
};

type ShippingSpeed = 'standard' | 'express';

type CartState = {
  items: CartItem[];
  promoCode?: string;
  shipping: ShippingSpeed;
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  setShipping: (shipping: ShippingSpeed) => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  subtotal: () => number;
  discount: () => number;
  shippingTotal: () => number;
  tax: () => number;
  total: () => number;
};

const PROMO_CODES: Record<string, number> = {
  PROMO10: 0.1
};

const SHIPPING_RATES: Record<ShippingSpeed, number> = {
  standard: 6.5,
  express: 18
};

const TAX_RATE = 0.19;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: undefined,
      shipping: 'standard',
      add: (item, qty = 1) => {
        set((state) => {
          const existing = state.items.find((cartItem) => cartItem.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.productId === item.productId
                  ? { ...cartItem, qty: cartItem.qty + qty }
                  : cartItem
              )
            };
          }

          return {
            items: [...state.items, { ...item, qty }]
          };
        });
      },
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        })),
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId)
          }));
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, qty } : item
          )
        }));
      },
      clear: () => set({ items: [], promoCode: undefined, shipping: 'standard' }),
      setShipping: (shipping) => set({ shipping }),
      applyPromo: (code) => {
        const formatted = code.trim().toUpperCase();
        if (!formatted) {
          set({ promoCode: undefined });
          return { success: true, message: 'Promo code cleared.' };
        }

        if (!PROMO_CODES[formatted]) {
          return { success: false, message: 'Promo code not recognized.' };
        }

        set({ promoCode: formatted });
        return { success: true, message: 'Promo applied! 10% off your subtotal.' };
      },
      subtotal: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
      discount: () => {
        const rate = get().promoCode ? PROMO_CODES[get().promoCode!] ?? 0 : 0;
        return get().subtotal() * rate;
      },
      shippingTotal: () => {
        const hasPhysicalItems = get().items.length > 0;
        if (!hasPhysicalItems) {
          return 0;
        }

        return SHIPPING_RATES[get().shipping];
      },
      tax: () => {
        const taxable = get().subtotal() - get().discount();
        return Math.max(taxable, 0) * TAX_RATE;
      },
      total: () => {
        const subtotal = get().subtotal();
        const discount = get().discount();
        const shipping = get().shippingTotal();
        const tax = get().tax();
        return subtotal - discount + shipping + tax;
      }
    }),
    {
      name: 'dev-mobile-cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export type { CartItem };
