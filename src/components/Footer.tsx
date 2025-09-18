import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Privacy Policy', to: '/policies#privacy' },
  { label: 'Returns', to: '/policies#returns' },
  { label: 'Shipping', to: '/policies#shipping' }
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-slate-500">© {new Date().getFullYear()} Dev Mobile. All rights reserved.</p>
        <nav className="flex flex-wrap items-center gap-4">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to} className="transition hover:text-slate-200">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
