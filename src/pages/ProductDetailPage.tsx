import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Truck } from 'lucide-react';
import { type Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { Money } from '../components/Money';
import { RatingStars } from '../components/RatingStars';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuantityInput } from '../components/QuantityInput';
import { AddToCartButton } from '../components/AddToCartButton';
import { SimpleProductCard } from '../components/SimpleProductCard';
import { Skeleton } from '../components/Skeleton';
import { NotFoundPage } from './NotFoundPage';
import { SEO } from '../components/SEO';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const products = useProducts();
  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(product?.images[0]);
  const [displayImage, setDisplayImage] = useState<string | undefined>(product?.images[0]);
  const [mainLoaded, setMainLoaded] = useState(false);

  useEffect(() => {
    setSelectedColorIndex(0);
    setSelectedImage(product?.images[0]);
    setDisplayImage(product?.images[0]);
    setMainLoaded(false);
  }, [product?.id]);

  const currentColor = product?.colors[selectedColorIndex];
  const currentImages = currentColor?.images || product?.images || [];

  const relatives = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return <NotFoundPage />;
  }

  const handleSelectImage = (image: string) => {
    setMainLoaded(false);
    setSelectedImage(image);
    setDisplayImage(image);
  };

  const handleImageError = () => {
    setDisplayImage('https://placehold.co/800x800/0f172a/94a3b8?text=Dev+Mobile');
    setMainLoaded(true);
  };

  return (
    <>
      <SEO
        title={product.title}
        description={product.description}
        keywords={[product.brand, product.title, product.category, 'smartphone', 'mobile', 'electronics']}
        image={currentImages[0]}
        url={`/product/${product.slug}`}
        type="product"
        price={product.price}
        availability={product.inStock ? 'in stock' : 'out of stock'}
        brand={product.brand}
        category={product.category}
        sku={product.id}
      />
      <div className="space-y-16 pb-20">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: product.title }
            ]}
          />
          <div className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
              {!mainLoaded ? <Skeleton className="absolute inset-0" /> : null}
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={`${product.title} gallery image`}
                  className={`aspect-square h-full w-full object-contain p-8 transition ${
                    mainLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setMainLoaded(true)}
                  onError={handleImageError}
                />
              ) : null}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {currentImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => handleSelectImage(image)}
                  className={`overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-50 to-slate-100 ${
                    selectedImage === image ? 'border-brand-400' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} thumbnail`}
                    className="aspect-square w-full object-contain p-2"
                    onError={(event) => {
                      event.currentTarget.src =
                        'https://placehold.co/200x200/0f172a/94a3b8?text=Dev+Mobile';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-wide text-brand-200">{product.brand}</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{product.title}</h1>
            <p className="mt-3 text-sm text-slate-300">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <RatingStars rating={product.rating || 0} />
            <span className={`text-xs px-2 py-1 rounded ${product.inStock ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Color Selection */}
          {product.colors.length > 1 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-200">
                Color: {currentColor?.name}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setSelectedColorIndex(index);
                      setSelectedImage(color.images[0]);
                      setDisplayImage(color.images[0]);
                      setMainLoaded(false);
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColorIndex === index ? 'border-brand-400' : 'border-slate-600'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-brand-500/10 border border-brand-400/20 text-brand-200 text-xs font-semibold rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Money value={product.price} className="text-3xl font-semibold text-white" />
            {product.compareAtPrice ? (
              <Money value={product.compareAtPrice} className="text-base text-slate-500 line-through" />
            ) : null}
          </div>

          <div className="space-y-4">
            <QuantityInput value={quantity} onChange={setQuantity} max={99} />
            <AddToCartButton
              product={product}
              quantity={quantity}
              showOptions
              onAdded={() => setQuantity(1)}
            />
            <p className="text-xs text-slate-500">
              Need a faster turnaround? Message our specialists via the contact page and we’ll arrange personalised checkout.
            </p>
          </div>

          <div className="space-y-4">
            {product.specs && Object.keys(product.specs).length > 0 && (
              <details className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-4" open>
                <summary className="cursor-pointer text-sm font-semibold text-white">Specifications</summary>
                <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{key}</dt>
                      <dd className="text-sm text-slate-200">{value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            )}
            <details className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-white">Shipping & returns</summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Truck className="mt-0.5 h-4 w-4 text-brand-200" aria-hidden="true" />
                  Express EU-wide delivery in 2-4 business days with carbon-neutral carriers.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-200" aria-hidden="true" />
                  30-day returns plus manufacturer warranty coverage.
                </li>
              </ul>
            </details>
          </div>
        </div>
      </section>

      {relatives.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatives.map((item) => (
              <SimpleProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
    </>
  );
};
