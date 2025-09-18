import { Minus, Plus } from 'lucide-react';
import clsx from 'clsx';

type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  id?: string;
};

export const QuantityInput = ({ value, onChange, min = 1, max = 99, size = 'md', id }: QuantityInputProps) => {
  const buttonClasses = clsx(
    'flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/70 text-slate-200 transition hover:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-50',
    size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  );

  const handleStep = (delta: number) => {
    const next = value + delta;
    if (next < min || next > max) return;
    onChange(next);
  };

  return (
    <div className="inline-flex items-center gap-2" aria-label="Quantity selector">
      <button
        type="button"
        onClick={() => handleStep(-1)}
        className={buttonClasses}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (Number.isNaN(parsed)) return;
          const next = Math.min(Math.max(parsed, min), max);
          onChange(next);
        }}
        className={clsx(
          'w-12 rounded-full border border-slate-800 bg-slate-900/70 text-center text-sm font-semibold text-slate-100 focus-visible:border-brand-300',
          size === 'sm' ? 'h-8' : 'h-10'
        )}
        aria-live="polite"
      />
      <button
        type="button"
        onClick={() => handleStep(1)}
        className={buttonClasses}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
    </div>
  );
};
