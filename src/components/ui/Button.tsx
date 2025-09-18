import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-brand-500 hover:bg-brand-400 text-white shadow-button hover:shadow-button-hover border-transparent',
  secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 hover:border-neutral-600',
  ghost: 'bg-transparent hover:bg-neutral-800/50 text-neutral-300 hover:text-white border-transparent',
  danger: 'bg-danger-500 hover:bg-danger-400 text-white border-transparent',
  success: 'bg-success-500 hover:bg-success-400 text-white border-transparent'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-6 py-3 text-base font-semibold',
  xl: 'px-8 py-4 text-lg font-semibold'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center gap-2 rounded-full border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-neutral-950',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {!isLoading && leftIcon && leftIcon}
      {children}
      {!isLoading && rightIcon && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';