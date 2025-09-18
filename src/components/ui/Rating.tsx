import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Star } from 'lucide-react';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  readonly?: boolean;
  precision?: number; // 0.5 for half stars, 1 for whole stars
  onChange?: (value: number) => void;
}

const ratingSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
};

export const Rating = forwardRef<HTMLDivElement, RatingProps>(({
  className,
  value,
  max = 5,
  size = 'md',
  showValue = false,
  readonly = true,
  precision = 1,
  onChange,
  ...props
}, ref) => {
  const handleStarClick = (starValue: number) => {
    if (!readonly && onChange) {
      onChange(starValue);
    }
  };

  const getStarFill = (starIndex: number) => {
    const starValue = starIndex + 1;
    if (value >= starValue) {
      return 'full';
    } else if (value >= starValue - 0.5 && precision === 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-2',
        !readonly && 'cursor-pointer',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const fill = getStarFill(index);
          const starValue = index + 1;

          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              onClick={() => handleStarClick(starValue)}
              className={clsx(
                'relative transition-colors duration-150',
                !readonly && 'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-sm',
                readonly && 'cursor-default'
              )}
              aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
            >
              {fill === 'half' ? (
                <div className="relative">
                  <Star
                    className={clsx(
                      ratingSizes[size],
                      'text-neutral-600 fill-neutral-600'
                    )}
                  />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star
                      className={clsx(
                        ratingSizes[size],
                        'text-warning-400 fill-warning-400'
                      )}
                    />
                  </div>
                </div>
              ) : (
                <Star
                  className={clsx(
                    ratingSizes[size],
                    fill === 'full'
                      ? 'text-warning-400 fill-warning-400'
                      : 'text-neutral-600 fill-neutral-600'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className={clsx('font-medium text-neutral-300', textSizes[size])}>
          {value.toFixed(precision === 0.5 ? 1 : 0)}
        </span>
      )}
    </div>
  );
});

Rating.displayName = 'Rating';