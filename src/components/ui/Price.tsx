import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  compareAtValue?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'success' | 'danger' | 'neutral';
  showCurrency?: boolean;
  showDiscount?: boolean;
  discountType?: 'percentage' | 'amount';
}

const priceSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

const priceVariants = {
  default: 'text-white',
  success: 'text-success-400',
  danger: 'text-danger-400',
  neutral: 'text-neutral-300'
};

const formatPrice = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

const calculateDiscount = (price: number, compareAtPrice: number, type: 'percentage' | 'amount' = 'percentage') => {
  if (type === 'percentage') {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }
  return compareAtPrice - price;
};

export const Price = forwardRef<HTMLSpanElement, PriceProps>(({
  className,
  value,
  compareAtValue,
  currency = 'USD',
  size = 'md',
  variant = 'default',
  showCurrency = true,
  showDiscount = true,
  discountType = 'percentage',
  ...props
}, ref) => {
  const hasDiscount = compareAtValue && compareAtValue > value;
  const discountValue = hasDiscount ? calculateDiscount(value, compareAtValue, discountType) : 0;

  const priceText = showCurrency
    ? formatPrice(value, currency)
    : value.toFixed(2);

  const compareAtText = compareAtValue && showCurrency
    ? formatPrice(compareAtValue, currency)
    : compareAtValue?.toFixed(2);

  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-2 font-semibold',
        priceSizes[size],
        priceVariants[variant],
        className
      )}
      {...props}
    >
      {/* Current price */}
      <span>{priceText}</span>

      {/* Compare at price (strikethrough) */}
      {hasDiscount && compareAtText && (
        <span className="text-neutral-500 line-through font-normal text-sm">
          {compareAtText}
        </span>
      )}

      {/* Discount badge */}
      {hasDiscount && showDiscount && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-500/20 text-success-300 border border-success-500/30">
          -{discountValue}{discountType === 'percentage' ? '%' : ''}
        </span>
      )}
    </span>
  );
});

Price.displayName = 'Price';