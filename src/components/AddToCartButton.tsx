import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { toast } from '../store/toastStore';

type OptionState = {
  color?: string;
  variant?: string;
};

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
  showOptions?: boolean;
  onAdded?: () => void;
};

export const AddToCartButton = ({
  product,
  quantity = 1,
  className,
  showOptions = false,
  onAdded
}: AddToCartButtonProps) => {
  const add = useCartStore((state) => state.add);
  const [options, setOptions] = useState<OptionState>({
    color: product.colors?.[0]?.name,
    variant: product.variants?.[0]?.storage || product.variants?.[0]?.sku
  });

  const isOutOfStock = !product.inStock;

  const optionSummary = useMemo(() => {
    return [options.color, options.variant].filter(Boolean).join(' · ');
  }, [options.color, options.variant]);

  const handleAdd = () => {
    add(
      {
        productId: product.id,
        title: optionSummary && showOptions ? `${product.title} (${optionSummary})` : product.title,
        price: product.price,
        image: product.images[0] ?? 'https://placehold.co/600x600/0f172a/94a3b8?text=Dev+Mobile'
      },
      quantity
    );
    toast.success('Added to cart', `${product.title} is now in your bag.`);
    onAdded?.();
  };

  return (
    <div className={clsx('space-y-3', className)}>
      {showOptions && (product.colors?.length > 1 || product.variants?.length) ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {product.colors && product.colors.length > 1 ? (
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              <span className="font-semibold text-slate-200">Color</span>
              <select
                className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-100"
                value={options.color}
                onChange={(event) => setOptions((prev) => ({ ...prev, color: event.target.value }))}
              >
                {product.colors.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {product.variants && product.variants.length > 0 ? (
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              <span className="font-semibold text-slate-200">Variant</span>
              <select
                className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-100"
                value={options.variant}
                onChange={(event) => setOptions((prev) => ({ ...prev, variant: event.target.value }))}
              >
                {product.variants.map((variant) => (
                  <option key={variant.sku || `${variant.storage}-${variant.color}`} value={variant.storage || variant.sku}>
                    {variant.storage || variant.sku}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleAdd}
        disabled={isOutOfStock}
        className={clsx(
          'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 focus-visible:ring-2 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-60'
        )}
      >
        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
      </button>
      {showOptions && optionSummary ? (
        <p className="text-xs text-slate-400">Selected: {optionSummary}</p>
      ) : null}
    </div>
  );
};
