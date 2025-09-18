import clsx from 'clsx';
import { formatCurrency } from '../lib/money';
import { Price, type PriceProps } from './ui/Price';

type MoneyProps = {
  value: number;
  className?: string;
  compareAtValue?: number;
  showDiscount?: boolean;
  size?: PriceProps['size'];
  variant?: PriceProps['variant'];
};

export const Money = ({
  value,
  className,
  compareAtValue,
  showDiscount = true,
  size = 'md',
  variant = 'default'
}: MoneyProps) => {
  // If using enhanced features, use the new Price component
  if (compareAtValue || size !== 'md' || variant !== 'default') {
    return (
      <Price
        value={value}
        compareAtValue={compareAtValue}
        size={size}
        variant={variant}
        showDiscount={showDiscount}
        className={clsx('tabular-nums', className)}
      />
    );
  }

  // Fallback to simple display for backward compatibility
  return <span className={clsx('tabular-nums', className)}>{formatCurrency(value)}</span>;
};
