import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'filled' | 'outlined';
  selectSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helper?: string;
  placeholder?: string;
}

const selectVariants = {
  default: 'bg-neutral-950/70 border-neutral-800 focus:border-brand-500',
  filled: 'bg-neutral-800 border-transparent focus:border-brand-500',
  outlined: 'bg-transparent border-neutral-600 focus:border-brand-400'
};

const selectSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base'
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  variant = 'default',
  selectSize = 'md',
  error = false,
  errorMessage,
  label,
  helper,
  placeholder,
  children,
  ...props
}, ref) => {
  const selectId = props.id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-neutral-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'w-full rounded-xl border transition-colors duration-200 appearance-none',
            'text-neutral-200 pr-10 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            selectVariants[variant],
            selectSizes[selectSize],
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
          <ChevronDown className="h-4 w-4" />
        </div>
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

Select.displayName = 'Select';