import clsx from 'clsx';

type Category = 'all' | 'phones' | 'accessories';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

type FilterState = {
  search: string;
  category: Category;
  brand: string;
  color: string;
  sort: SortOption;
  priceMin: number;
  priceMax: number;
};

type ProductFiltersProps = {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
  brands: string[];
  colors: string[];
  priceBounds: {
    min: number;
    max: number;
  };
};

const categoryFilters: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Phones', value: 'phones' },
  { label: 'Accessories', value: 'accessories' }
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest arrivals', value: 'newest' }
];

export const ProductFilters = ({ filters, onFilterChange, brands, colors, priceBounds }: ProductFiltersProps) => {
  const handleRangeChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      onFilterChange({ priceMin: Math.min(value, filters.priceMax) });
    } else {
      onFilterChange({ priceMax: Math.max(value, filters.priceMin) });
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Filters</h2>
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              search: '',
              category: 'all',
              brand: 'all',
              color: 'all',
              sort: 'featured',
              priceMin: priceBounds.min,
              priceMax: priceBounds.max
            })
          }
          className="text-xs font-semibold text-brand-200 hover:text-brand-100"
        >
          Reset
        </button>
      </div>
      <div className="mt-4 space-y-6 text-sm">
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-200">Search</span>
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onFilterChange({ search: event.target.value })}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500"
            placeholder="Find products"
          />
        </label>
        <div className="space-y-2">
          <p className="font-semibold text-slate-200">Category</p>
          <div className="inline-flex flex-wrap gap-2">
            {categoryFilters.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => onFilterChange({ category: category.value })}
                className={clsx(
                  'rounded-full border border-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
                  filters.category === category.value
                    ? 'border-brand-400/60 bg-brand-500/10 text-brand-100'
                    : 'text-slate-400 hover:border-brand-400/30 hover:text-slate-200'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-200">Brand</span>
          <select
            value={filters.brand}
            onChange={(event) => onFilterChange({ brand: event.target.value })}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200"
          >
            <option value="all">All brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-200">Color</span>
          <select
            value={filters.color}
            onChange={(event) => onFilterChange({ color: event.target.value })}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200"
          >
            <option value="all">All colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
            <span>Price</span>
            <span>
              €{filters.priceMin} - €{filters.priceMax}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={filters.priceMin}
              onChange={(event) => handleRangeChange('min', Number(event.target.value))}
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={filters.priceMax}
              onChange={(event) => handleRangeChange('max', Number(event.target.value))}
              aria-label="Maximum price"
            />
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-200">Sort by</span>
          <select
            value={filters.sort}
            onChange={(event) => onFilterChange({ sort: event.target.value as SortOption })}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
};

export type { FilterState };
