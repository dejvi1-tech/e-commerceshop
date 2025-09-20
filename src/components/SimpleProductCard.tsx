import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Product } from '../data/products';
import { Money } from './Money';
import { RatingStars } from './RatingStars';
import { AddToCartButton } from './AddToCartButton';
import { Card, Badge } from './ui';

export const SimpleProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState('');

  const defaultImage = '/images/placeholder-phone.svg';
  const productImages = product.images || [];
  const currentImage = productImages[currentImageIndex] || defaultImage;

  // Force re-render when currentImage changes
  useEffect(() => {
    setImageLoaded(false);
    setImageSrc(currentImage);
    console.log('Setting image source:', currentImage, 'for product:', product.title);
  }, [currentImage, product.title]);

  const handleImageError = () => {
    console.error('Image failed to load:', currentImage);
    console.error('Product images array:', productImages);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentImage);
    setImageLoaded(true);
  };

  return (
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden hover:border-brand-400/40 hover:shadow-brand-500/10" hover>
      {/* Image Section */}
      <Link to={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          <img
            src={imageSrc || currentImage}
            alt={`${product.title} product photo`}
            loading="lazy"
            className={clsx(
              'h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-slate-400 text-sm font-medium">Loading...</div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.compareAtPrice && (
            <Badge variant="danger" size="sm">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </Badge>
          )}
          {product.badges?.slice(0, 2).map((badge) => (
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

        {/* Image Navigation Dots */}
        {productImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {productImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                  setImageLoaded(false);
                }}
                className={clsx(
                  'h-2 w-2 rounded-full transition-all',
                  currentImageIndex === index
                    ? 'bg-brand-500'
                    : 'bg-white/60 hover:bg-white/80'
                )}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-brand-200 font-medium">{product.brand}</p>
          <Link
            to={`/product/${product.slug}`}
            className="text-lg font-semibold leading-tight text-slate-100 hover:text-brand-300 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          <p className="line-clamp-2 text-sm text-slate-400">{product.description}</p>
        </div>

        {product.rating && (
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-slate-500">({product.rating})</span>
          </div>
        )}

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2">
            <Money
              value={product.price}
              className="text-xl font-bold text-white"
            />
            {product.compareAtPrice && (
              <Money
                value={product.compareAtPrice}
                className="text-sm text-slate-500 line-through"
              />
            )}
          </div>

          <AddToCartButton
            product={product}
            showOptions={false}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export const SimpleProductCardSkeleton = () => (
  <Card className="flex h-full flex-col">
    <div className="aspect-square w-full bg-slate-800 animate-pulse" />
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="h-3 w-16 bg-slate-800 rounded animate-pulse" />
      <div className="h-5 w-3/4 bg-slate-800 rounded animate-pulse" />
      <div className="h-3 w-full bg-slate-800 rounded animate-pulse" />
      <div className="h-3 w-2/3 bg-slate-800 rounded animate-pulse" />
      <div className="mt-auto space-y-3">
        <div className="h-6 w-20 bg-slate-800 rounded animate-pulse" />
        <div className="h-10 w-full bg-slate-800 rounded animate-pulse" />
      </div>
    </div>
  </Card>
);