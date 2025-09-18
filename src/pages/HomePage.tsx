import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

const featuredCollections = [
  {
    title: 'Flagship Phones',
    description: 'Experience the latest from Apple, Samsung, Google, and more.',
    to: '/products?category=phones',
    icon: <Sparkles className="h-5 w-5" aria-hidden="true" />
  },
  {
    title: 'Smart Accessories',
    description: 'Keep your devices powered and protected with curated gear.',
    to: '/products?category=accessories',
    icon: <Headphones className="h-5 w-5" aria-hidden="true" />
  },
  {
    title: 'Fresh Deals',
    description: 'Limited-time offers and bundles while stocks last.',
    to: '/products?sort=price-asc',
    icon: <Truck className="h-5 w-5" aria-hidden="true" />
  }
];

const sellingPoints = [
  {
    title: '2-year warranty',
    description: 'Every device ships with our extended warranty and hassle-free support.'
  },
  {
    title: 'Carbon-neutral shipping',
    description: 'Express EU-wide shipping with emissions offset on every order.'
  },
  {
    title: 'Authentic inventory',
    description: 'We work directly with manufacturers to deliver sealed, original products.'
  }
];

export const HomePage = () => {
  const featuredProducts = products.slice(0, 4);
  const heroPhones = products.filter((product) => product.category === 'phones').slice(0, 3);

  return (
    <>
      <SEO
        title="Premium Phones & Accessories"
        description="Discover flagship smartphones, premium accessories, and tech gear with expert support and free shipping. Shop iPhone, Samsung Galaxy, accessories and more."
        keywords={['smartphones', 'phones', 'iPhone', 'Samsung Galaxy', 'accessories', 'tech gear', 'mobile devices', 'electronics']}
        type="website"
        url="/"
      />
      <div className="space-y-16 pb-20">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-16 shadow-card sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 text-center">
          <div className="space-y-5">
            <span className="inline-flex items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-200">
              Phones & accessories, hand-picked for you
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-5xl">
              Level up your everyday tech with Dev Mobile
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              Discover flagship phones, premium audio, and powerful chargers with concierge support for
              personalised checkout and delivery.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Shop the catalog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-500 hover:text-brand-200"
            >
              Talk to a specialist
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroPhones.map((phone) => (
              <figure
                key={phone.id}
                className="group overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 p-3"
              >
                <img
                  src={phone.images[0]}
                  alt={`${phone.title} promotional photo`}
                  className="h-48 w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = 'https://placehold.co/600x400/0f172a/94a3b8?text=Dev+Mobile';
                  }}
                />
                <figcaption className="mt-3 text-sm font-semibold text-slate-200">
                  {phone.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-y-0 left-1/2 w-1/2 rounded-full bg-brand-500/5 blur-3xl" />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Featured collections</h2>
          <Link to="/products" className="text-sm font-semibold text-brand-200 hover:text-brand-100">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredCollections.map((collection) => (
            <Link
              key={collection.title}
              to={collection.to}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 transition hover:border-brand-400/40 hover:bg-slate-900/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-200">
                {collection.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{collection.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{collection.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">
                Shop now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Bestsellers</h2>
          <Link to="/products?sort=newest" className="text-sm font-semibold text-brand-200 hover:text-brand-100">
            New arrivals
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:grid-cols-3">
        {sellingPoints.map((point) => (
          <div key={point.title} className="space-y-2">
            <h3 className="flex items-center gap-2 text-base font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-brand-200" aria-hidden="true" />
              {point.title}
            </h3>
            <p className="text-sm text-slate-400">{point.description}</p>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};
