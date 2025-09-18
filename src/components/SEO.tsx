import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
  brand?: string;
  category?: string;
  sku?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO = {
  siteName: 'Dev Mobile',
  domain: 'https://devmobile.com',
  twitterHandle: '@devmobile',
  defaultTitle: 'Dev Mobile - Premium Phones & Accessories',
  defaultDescription: 'Discover the latest smartphones, accessories, and tech gear. Free shipping, 30-day returns, and expert support.',
  defaultImage: '/images/og-image.jpg',
  defaultKeywords: ['smartphones', 'phones', 'accessories', 'tech', 'mobile', 'electronics']
};

export const SEO = ({
  title,
  description = defaultSEO.defaultDescription,
  keywords = defaultSEO.defaultKeywords,
  image = defaultSEO.defaultImage,
  url,
  type = 'website',
  price,
  currency = 'USD',
  availability,
  brand,
  category,
  sku,
  noindex = false,
  nofollow = false
}: SEOProps) => {
  const pageTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;

  const fullUrl = url
    ? `${defaultSEO.domain}${url}`
    : defaultSEO.domain;

  const fullImageUrl = image.startsWith('http')
    ? image
    : `${defaultSEO.domain}${image}`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  // Generate structured data for products
  const getStructuredData = () => {
    if (type === 'product' && title && price) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title,
        "description": description,
        "image": [fullImageUrl],
        "brand": {
          "@type": "Brand",
          "name": brand || defaultSEO.siteName
        },
        "category": category,
        "sku": sku,
        "offers": {
          "@type": "Offer",
          "url": fullUrl,
          "priceCurrency": currency,
          "price": price,
          "availability": availability === 'in stock'
            ? "https://schema.org/InStock"
            : availability === 'out of stock'
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/PreOrder",
          "seller": {
            "@type": "Organization",
            "name": defaultSEO.siteName
          }
        }
      };
    }

    // Default organization schema
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": defaultSEO.siteName,
      "url": defaultSEO.domain,
      "logo": `${defaultSEO.domain}/images/logo.png`,
      "sameAs": [
        "https://twitter.com/devmobile",
        "https://instagram.com/devmobile",
        "https://facebook.com/devmobile"
      ]
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content={defaultSEO.siteName} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Product-specific Open Graph */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          {brand && <meta property="product:brand" content={brand} />}
          {category && <meta property="product:category" content={category} />}
          {availability && <meta property="product:availability" content={availability} />}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#5b68ff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Mobile App Meta */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={defaultSEO.siteName} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};