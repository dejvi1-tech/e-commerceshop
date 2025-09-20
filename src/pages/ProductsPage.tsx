import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SimpleProductCard } from '../components/SimpleProductCard';
import { ProductFilters, type FilterState } from '../components/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import { SEO } from '../components/SEO';

const parseCategory = (value: string | null): FilterState['category'] => {
  if (value === 'phones' || value === 'accessories') return value;
  return 'all';
};

const parseSort = (value: string | null): FilterState['sort'] => {
  if (value === 'price-asc' || value === 'price-desc' || value === 'newest') {
    return value;
  }
  return 'featured';
};

const parseNumber = (value: string | null, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useProducts();

  const priceValues = products.map((product) => product.price);
  const priceBounds = {
    min: Math.floor(Math.min(...priceValues) / 10) * 10,
    max: Math.ceil(Math.max(...priceValues) / 10) * 10
  };

  const brands = Array.from(new Set(products.map((product) => product.brand))).sort();
  const colors = Array.from(new Set(products.flatMap((product) => product.colors.map(c => c.name)))).sort();

  const filters: FilterState = {
    search: searchParams.get('search') ?? '',
    category: parseCategory(searchParams.get('category')),
    brand: searchParams.get('brand') ?? 'all',
    color: searchParams.get('color') ?? 'all',
    sort: parseSort(searchParams.get('sort')),
    priceMin: parseNumber(searchParams.get('min'), priceBounds.min),
    priceMax: parseNumber(searchParams.get('max'), priceBounds.max)
  };

  const handleFilterChange = (next: Partial<FilterState>) => {
    const merged: FilterState = { ...filters, ...next };
    const params: Record<string, string> = {};

    if (merged.search) params.search = merged.search;
    if (merged.category !== 'all') params.category = merged.category;
    if (merged.brand && merged.brand !== 'all') params.brand = merged.brand;
    if (merged.color && merged.color !== 'all') params.color = merged.color;
    if (merged.sort !== 'featured') params.sort = merged.sort;
    if (merged.priceMin !== priceBounds.min) params.min = String(merged.priceMin);
    if (merged.priceMax !== priceBounds.max) params.max = String(merged.priceMax);

    setSearchParams(params, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (filters.category !== 'all' && product.category !== filters.category) {
          return false;
        }
        if (filters.brand !== 'all' && product.brand !== filters.brand) {
          return false;
        }
        if (filters.color !== 'all' && !product.colors.some(color => color.name === filters.color)) {
          return false;
        }
        if (filters.search) {
          const needle = filters.search.toLowerCase();
          const haystack = `${product.title} ${product.brand} ${product.description}`.toLowerCase();
          if (!haystack.includes(needle)) {
            return false;
          }
        }
        if (product.price < filters.priceMin || product.price > filters.priceMax) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return products.indexOf(b) - products.indexOf(a);
          default:
            return products.indexOf(a) - products.indexOf(b);
        }
      });
  }, [filters.category, filters.brand, filters.color, filters.priceMax, filters.priceMin, filters.search, filters.sort]);

  // Generate dynamic SEO based on filters
  const generateSEOTitle = () => {
    const parts = [];
    if (filters.category !== 'all') parts.push(filters.category === 'phones' ? 'Smartphones' : 'Accessories');
    if (filters.brand !== 'all') parts.push(filters.brand);
    if (filters.search) parts.push(`"${filters.search}"`);
    parts.push('- Dev Mobile');
    return parts.join(' ');
  };

  const generateSEODescription = () => {
    let description = 'Shop ';
    if (filters.category !== 'all') {
      description += filters.category === 'phones' ? 'premium smartphones ' : 'phone accessories ';
    } else {
      description += 'smartphones and accessories ';
    }
    if (filters.brand !== 'all') {
      description += `from ${filters.brand} `;
    }
    description += `at Dev Mobile. ${filteredProducts.length} products available with free shipping and expert support.`;
    return description;
  };

  return (
    <>
      <SEO
        title={generateSEOTitle()}
        description={generateSEODescription()}
        keywords={['products', 'smartphones', 'accessories', filters.category, filters.brand, filters.search].filter(Boolean)}
        url="/products"
        type="website"
      />
      <div className="grid gap-6 pb-20 lg:grid-cols-[280px_1fr] lg:gap-10">
      <div className="lg:sticky lg:top-24 lg:h-max">
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} brands={brands} colors={colors} priceBounds={priceBounds} />
      </div>
      <section className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-white">All products</h1>
            <p className="text-sm text-slate-400">
              Showing {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'} curated for you
            </p>
          </div>
        </header>
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-800/60 bg-slate-900/50 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">No matching products</p>
            <p className="max-w-md text-sm text-slate-400">
              Try adjusting your filters or search terms. New arrivals land weekly, so check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
    </>
  );
};
