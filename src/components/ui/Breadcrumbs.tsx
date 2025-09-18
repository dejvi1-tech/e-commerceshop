import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const breadcrumbSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

export const Breadcrumbs = ({
  className,
  items,
  showHome = true,
  separator,
  size = 'sm',
  ...props
}: BreadcrumbsProps) => {
  const allItems = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  const defaultSeparator = (
    <ChevronRight className={clsx('text-neutral-500', iconSizes[size])} aria-hidden="true" />
  );

  return (
    <nav
      className={clsx('flex items-center space-x-2', className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => (
          <Fragment key={index}>
            <li className="flex items-center">
              {item.href && !item.current ? (
                <Link
                  to={item.href}
                  className={clsx(
                    'inline-flex items-center gap-1 transition-colors duration-150',
                    'text-neutral-400 hover:text-neutral-200',
                    breadcrumbSizes[size]
                  )}
                >
                  {showHome && index === 0 && (
                    <Home className={iconSizes[size]} aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    'inline-flex items-center gap-1',
                    item.current ? 'text-white font-medium' : 'text-neutral-300',
                    breadcrumbSizes[size]
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {showHome && index === 0 && (
                    <Home className={iconSizes[size]} aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              )}
            </li>

            {/* Separator */}
            {index < allItems.length - 1 && (
              <li className="flex items-center" aria-hidden="true">
                {separator || defaultSeparator}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};