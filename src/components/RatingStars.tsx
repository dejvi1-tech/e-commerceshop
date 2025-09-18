import { Star } from 'lucide-react';

type RatingStarsProps = {
  rating: number;
  showLabel?: boolean;
};

export const RatingStars = ({ rating, showLabel = true }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(Math.min(rating - index, 1), 0);
        return (
          <span key={index} className="relative inline-flex">
            <Star className="h-4 w-4 text-slate-600" aria-hidden="true" />
            <Star
              className="absolute inset-0 h-4 w-4 text-amber-400"
              aria-hidden="true"
              style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
            />
          </span>
        );
      })}
      {showLabel ? <span className="ml-1 text-xs text-slate-400">{rating.toFixed(1)}</span> : null}
    </div>
  );
};
