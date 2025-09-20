import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useProducts } from '../hooks/useProducts';
import { Money } from './Money';
import { QuantityInput } from './QuantityInput';
import { toast } from '../store/toastStore';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useAnnouncer } from '../hooks/useAnnouncer';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const products = useProducts();
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const setQty = useCartStore((state) => state.setQty);
  const subtotal = useCartStore((state) => state.subtotal());
  const total = useCartStore((state) => state.total());

  const drawerRef = useRef<HTMLDivElement>(null);
  const { announce } = useAnnouncer();

  useKeyboardNavigation(drawerRef, {
    onEscape: onClose,
    trapFocus: isOpen,
    autoFocus: isOpen
  });

  const handleRemove = (productId: string, title: string) => {
    remove(productId);
    announce(`${title} removed from cart`, 'polite');
    toast.show('Removed from cart', `${title} removed.`);
  };

  const handleQuantityChange = (productId: string, qty: number, title: string) => {
    setQty(productId, qty);
    announce(`${title} quantity updated to ${qty}`, 'polite');
  };

  // Close drawer when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-xl z-50 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-400" aria-hidden="true" />
            <h2 id="cart-title" className="text-lg font-semibold text-white">
              Shopping Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close shopping cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingBag className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400 mb-2">Your cart is empty</p>
              <p className="text-sm text-slate-500 mb-4">
                Add some products to get started
              </p>
              <Link
                to="/products"
                onClick={onClose}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const slug = product?.slug;

                return (
                  <div
                    key={item.productId}
                    className="flex gap-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x200/0f172a/94a3b8?text=Dev+Mobile';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      {slug ? (
                        <Link
                          to={`/product/${slug}`}
                          onClick={onClose}
                          className="block text-sm font-medium text-white hover:text-brand-300 truncate"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <p className="text-sm font-medium text-white truncate">
                          {item.title}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <Money value={item.price} className="text-sm text-slate-300" />
                        <div className="flex items-center gap-2">
                          <QuantityInput
                            value={item.qty}
                            onChange={(qty) => setQty(item.productId, qty)}
                            size="sm"
                            min={1}
                          />
                          <button
                            onClick={() => {
                              remove(item.productId);
                              toast.show('Removed', `${item.title} removed from cart`);
                            }}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-1">
                        <Money
                          value={item.price * item.qty}
                          className="text-sm font-medium text-white"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 p-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <Money value={subtotal} />
              </div>
              <div className="flex justify-between font-semibold text-white">
                <span>Total</span>
                <Money value={total} />
              </div>
            </div>

            <div className="space-y-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white text-center rounded-lg transition-colors"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full px-4 py-3 bg-brand-500 hover:bg-brand-400 text-white text-center rounded-lg transition-colors font-semibold"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};