import clsx from 'clsx';

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={clsx('animate-pulse rounded-xl bg-slate-800/60', className)} aria-hidden="true" />
);
