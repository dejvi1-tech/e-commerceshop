import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEdges?: boolean;
  siblingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getPageNumbers = (currentPage: number, totalPages: number, siblingCount: number = 1, showEdges: boolean = true) => {
  const totalPageNumbers = siblingCount + 5; // start + siblings + current + siblings + end

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'dots', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'dots', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, 'dots', ...middleRange, 'dots', totalPages];
  }

  return [];
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showEdges = true,
  siblingCount = 1,
  size = 'md',
  className
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount, showEdges);

  const buttonSizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={clsx('flex items-center justify-center space-x-2', className)}
      aria-label="Pagination navigation"
    >
      {/* Previous button */}
      <Button
        variant="ghost"
        size={size}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx('rounded-lg', buttonSizes[size])}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 'dots') {
          return (
            <div
              key={`dots-${index}`}
              className={clsx(
                'flex items-center justify-center text-neutral-400',
                buttonSizes[size]
              )}
              aria-hidden="true"
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          );
        }

        const isActive = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isActive ? 'primary' : 'ghost'}
            size={size}
            onClick={() => onPageChange(pageNumber as number)}
            className={clsx('rounded-lg', buttonSizes[size])}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next button */}
      <Button
        variant="ghost"
        size={size}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx('rounded-lg', buttonSizes[size])}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};