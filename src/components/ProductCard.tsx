import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Product } from '../data/products';
import { Money } from './Money';
import { RatingStars } from './RatingStars';
import { AddToCartButton } from './AddToCartButton';
import { Skeleton } from './Skeleton';
import { Card, Badge, Rating } from './ui';

export const ProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [src, setSrc] = useState(product.images[0]);

  useEffect(() => {
    setSrc(product.images[0]);
    setImageLoaded(false);
  }, [product.id]);

  const handleError = () => {
    setSrc('https://placehold.co/600x600/0f172a/94a3b8?text=Dev+Mobile');
    setImageLoaded(true);
  };

  return (
    <Card className="flex h-full flex-col justify-between hover:border-brand-400/40 hover:shadow-brand-500/10" hover>
      <Link to={`/product/${product.slug}`} className="group relative block overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100">
        {!imageLoaded ? <Skeleton className="h-64 w-full rounded-none" /> : null}
        <img
          src={src}
          alt={`${product.title} product photo`}
          loading="lazy"
          className={clsx(
            'h-64 w-full object-contain p-4 transition duration-700 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          onError={handleError}
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.compareAtPrice && (
            <Badge variant="danger" size="sm">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </Badge>
          )}
          {product.badges?.map((badge) => (
            <Badge key={badge} variant="primary" size="sm">
              {badge}
            </Badge>
          ))}
          {!product.inStock && (
            <Badge variant="neutral" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-brand-200">{product.brand}</p>
          <Link to={`/product/${product.slug}`} className="text-lg font-semibold leading-tight text-slate-100 hover:text-brand-300 transition-colors">
            {product.title}
          </Link>
          <p className="line-clamp-2 text-sm text-slate-400">{product.description}</p>
        </div>

        {product.rating && (
          <Rating value={product.rating} size="sm" showValue />
        )}

        <div className="mt-auto space-y-3">
          <Money
            value={product.price}
            compareAtValue={product.compareAtPrice}
            size="lg"
            className="text-white"
          />
          <AddToCartButton product={product} showOptions={false} />
        </div>
      </div>
    </Card>
  );
};

export const ProductCardSkeleton = () => (
  <Card className="flex h-full flex-col gap-4">
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-5 w-48" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-2/3" />
    <Skeleton className="h-10 w-full" />
  </Card>
);
