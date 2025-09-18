import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const badgeVariants = {
  default: 'bg-neutral-800 text-neutral-200 border-neutral-700',
  primary: 'bg-brand-500/20 text-brand-300 border-brand-500/30',
  success: 'bg-success-500/20 text-success-300 border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-300 border-warning-500/30',
  danger: 'bg-danger-500/20 text-danger-300 border-danger-500/30',
  neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200'
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';