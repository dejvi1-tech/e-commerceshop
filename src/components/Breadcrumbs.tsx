import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
      <ol className="flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="rounded-full px-2 py-1 transition hover:text-slate-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="rounded-full px-2 py-1 text-slate-300">{item.label}</span>
              )}
              {!isLast ? (
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
