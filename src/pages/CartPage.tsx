import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { Money } from '../components/Money';
import { QuantityInput } from '../components/QuantityInput';
import { toast } from '../store/toastStore';

const shippingLabels: Record<'standard' | 'express', string> = {
  standard: 'Standard (2-4 business days)',
  express: 'Express (1-2 business days)'
};

export const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const setQty = useCartStore((state) => state.setQty);
  const clear = useCartStore((state) => state.clear);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const shippingTotal = useCartStore((state) => state.shippingTotal());
  const tax = useCartStore((state) => state.tax());
  const total = useCartStore((state) => state.total());
  const promoCode = useCartStore((state) => state.promoCode);
  const shipping = useCartStore((state) => state.shipping);
  const setShipping = useCartStore((state) => state.setShipping);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const [code, setCode] = useState('');

  const handleApplyPromo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = applyPromo(code);
    if (result.success) {
      toast.success('Promo updated', result.message);
    } else {
      toast.error('Promo failed', result.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-800/60 bg-slate-900/50 px-6 py-20 text-center">
        <p className="text-2xl font-semibold text-white">Your cart is empty</p>
        <p className="max-w-md text-sm text-slate-400">
          When you add products, they’ll appear here. We’re preparing our in-app checkout—reach out via the contact page to complete a purchase in the meantime.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 pb-20 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-white">Your cart</h1>
          <button
            type="button"
            onClick={() => {
              clear();
              toast.show('Cart cleared', 'All items have been removed.');
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200"
          >
            Clear cart
          </button>
        </header>
        <ul className="space-y-4">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            const slug = product?.slug;
            return (
              <li
                key={item.productId}
                className="flex flex-col gap-4 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-4 sm:flex-row sm:items-center"
              >
              <img
                src={item.image}
                alt={`${item.title} thumbnail`}
                className="h-24 w-24 rounded-2xl object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://placehold.co/200x200/0f172a/94a3b8?text=Dev+Mobile';
                }}
              />
                <div className="flex-1 space-y-2">
                  {slug ? (
                    <Link to={`/product/${slug}`} className="text-base font-semibold text-white">
                      {item.title}
                    </Link>
                  ) : (
                    <p className="text-base font-semibold text-white">{item.title}</p>
                  )}
                  <Money value={item.price} className="text-sm text-slate-300" />
                  <QuantityInput
                    value={item.qty}
                    onChange={(qty) => setQty(item.productId, qty)}
                    size="sm"
                    min={1}
                  />
                </div>
                <div className="flex flex-col items-end justify-between gap-3 text-right">
                  <Money value={item.price * item.qty} className="text-base font-semibold text-white" />
                  <button
                    type="button"
                    onClick={() => {
                      remove(item.productId);
                      toast.show('Removed from cart', `${item.title} removed.`);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1 text-xs font-semibold text-slate-400 transition hover:border-rose-500/30 hover:text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <aside className="space-y-5">
        <section className="space-y-4 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold text-white">Order summary</h2>
          <form className="flex items-center gap-2" onSubmit={handleApplyPromo}>
            <label htmlFor="promo" className="sr-only">
              Promo code
            </label>
            <input
              id="promo"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="Promo code"
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-400"
            >
              Apply
            </button>
          </form>
          {promoCode ? (
            <p className="text-xs text-brand-200">Active promo: {promoCode}</p>
          ) : null}
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <Money value={subtotal} />
            </div>
            <div className="flex justify-between text-emerald-300">
              <span>Discount</span>
              <Money value={-discount} />
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <div className="space-y-2 text-right">
                <Money value={shippingTotal} />
                <div className="flex flex-col gap-2 text-xs text-slate-400">
                  {(Object.keys(shippingLabels) as Array<'standard' | 'express'>).map((option) => (
                    <label key={option} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value={option}
                        checked={shipping === option}
                        onChange={() => setShipping(option)}
                      />
                      <span>{shippingLabels[option]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Tax (19%)</span>
              <Money value={tax} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-base font-semibold text-white">
            <span>Total</span>
            <Money value={total} />
          </div>
          <div className="space-y-2">
            <Link
              to="/checkout"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 hover:bg-brand-400 px-4 py-3 text-sm font-semibold text-white transition-colors"
            >
              Proceed to Checkout
            </Link>
            <p className="text-xs text-slate-400">
              Secure checkout with SSL encryption and 30-day money-back guarantee.
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
};
