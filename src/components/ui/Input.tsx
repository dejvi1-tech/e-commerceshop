import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helper?: string;
}

const inputVariants = {
  default: 'bg-neutral-950/70 border-neutral-800 focus:border-brand-500',
  filled: 'bg-neutral-800 border-transparent focus:border-brand-500',
  outlined: 'bg-transparent border-neutral-600 focus:border-brand-400'
};

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base'
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  variant = 'default',
  inputSize = 'md',
  error = false,
  errorMessage,
  leftIcon,
  rightIcon,
  label,
  helper,
  type = 'text',
  ...props
}, ref) => {
  const inputId = props.id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={clsx(
            'w-full rounded-xl border transition-colors duration-200',
            'text-neutral-200 placeholder:text-neutral-500',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            inputVariants[variant],
            inputSizes[inputSize],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-sm text-danger-400 animate-slide-down">
          {errorMessage}
        </p>
      )}

      {!error && helper && (
        <p className="text-sm text-neutral-400">
          {helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';