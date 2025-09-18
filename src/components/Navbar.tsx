import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Smartphone, Search, X } from 'lucide-react';
import clsx from 'clsx';
import { useCartStore } from '../store/cartStore';
import { CartDrawer } from './CartDrawer';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Deals', to: '/products?category=accessories&sort=price-asc' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.qty, 0)
  );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-md"
      role="banner"
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6"
        id="navigation"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full p-2 text-slate-300 hover:text-slate-100 focus-visible:ring-2 sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300">
              <Smartphone className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="hidden sm:inline">Dev Mobile</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-full px-3 py-2 transition hover:text-brand-200 focus-visible:ring-2',
                  isActive && 'bg-brand-500/10 text-brand-200'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <form
            className="relative hidden sm:flex"
            onSubmit={handleSearch}
            aria-label="Search products"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-10 w-48 rounded-full border border-slate-800 bg-slate-900/70 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:border-brand-400"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              name="query"
            />
          </form>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/70 text-slate-200 transition hover:border-brand-400"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'border-t border-slate-800/60 bg-slate-950/95 shadow-lg transition-all sm:hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        <div className="space-y-4 px-4 py-4">
          <form onSubmit={handleSearch} className="relative" aria-label="Search products">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-11 w-full rounded-full border border-slate-800 bg-slate-900/70 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500"
              placeholder="Search the store"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              name="query"
            />
          </form>
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'rounded-xl px-3 py-2 transition hover:bg-slate-900/80',
                    isActive && 'bg-brand-500/10 text-brand-200'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
