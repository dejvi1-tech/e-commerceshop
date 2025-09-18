import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-800/60 bg-slate-900/50 px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">404</p>
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="max-w-md text-sm text-slate-400">
        The page you requested doesn’t exist. Explore our catalog or return to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Go home
        </Link>
        <Link
          to="/products"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-400 hover:text-brand-200"
        >
          View products
        </Link>
      </div>
    </div>
  );
};
