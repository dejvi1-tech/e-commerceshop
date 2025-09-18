import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const cardVariants = {
  default: 'bg-neutral-900/40 border-neutral-800/60',
  elevated: 'bg-neutral-900/60 border-neutral-800/40 shadow-card',
  outlined: 'bg-transparent border-neutral-700',
  glass: 'bg-neutral-900/20 border-neutral-800/30 backdrop-blur-sm'
};

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

const cardHover = {
  default: 'hover:border-neutral-700/80 hover:bg-neutral-900/60',
  elevated: 'hover:shadow-card-hover hover:bg-neutral-900/80',
  outlined: 'hover:border-neutral-600 hover:bg-neutral-900/20',
  glass: 'hover:bg-neutral-900/40 hover:backdrop-blur-md'
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'rounded-2xl border transition-all duration-200',
        cardVariants[variant],
        cardPadding[padding],
        hover && cardHover[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={clsx('pb-4 mb-4 border-b border-neutral-800', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={clsx('space-y-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={clsx('pt-4 mt-4 border-t border-neutral-800', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';