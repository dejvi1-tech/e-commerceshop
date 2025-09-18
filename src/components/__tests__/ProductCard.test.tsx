import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../data/products';

const mockProduct: Product = {
  id: 'test-product',
  slug: 'test-product',
  title: 'Test Product',
  brand: 'Test Brand',
  category: 'phones',
  description: 'A great test product for testing purposes.',
  price: 999,
  compareAtPrice: 1099,
  colors: [
    {
      name: 'Space Gray',
      hex: '#1C1C1E',
      images: ['https://example.com/image1.jpg']
    }
  ],
  images: ['https://example.com/main-image.jpg'],
  inStock: true,
  badges: ['New', 'Popular'],
  rating: 4.5,
  specs: {
    'Display': '6.1" OLED',
    'Storage': '256GB'
  }
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('A great test product for testing purposes.')).toBeInTheDocument();
  });

  it('displays price correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('$999.00')).toBeInTheDocument();
  });

  it('shows discount badge when compareAtPrice exists', () => {
    render(<ProductCard product={mockProduct} />);

    const discountBadge = screen.getByText(/Save \d+%/);
    expect(discountBadge).toBeInTheDocument();

    // Calculate expected discount percentage
    const expectedDiscount = Math.round(((1099 - 999) / 1099) * 100);
    expect(discountBadge).toHaveTextContent(`Save ${expectedDiscount}%`);
  });

  it('displays product badges', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('shows out of stock badge when not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('displays rating when available', () => {
    render(<ProductCard product={mockProduct} />);

    // Check for rating component (should show 5 since we round up 4.5)
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('has accessible product image', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Product product photo');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('provides accessible link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);

    const titleLink = screen.getByRole('link', { name: 'Test Product' });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/product/test-product');
  });

  it('renders add to cart button', () => {
    render(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
  });

  it('applies hover effects on card', () => {
    render(<ProductCard product={mockProduct} />);

    // The Card component renders a div, so we'll look for the outer container
    const cardContainer = document.querySelector('.hover\\:border-brand-400\\/40');
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer).toHaveClass('hover:border-brand-400/40');
  });
});