# Design System

This document outlines the design system components and tokens used throughout the e-commerce application.

## Color Tokens

### Brand Colors
- **Primary**: `brand-500` (#5b68ff) - Main brand color for CTAs and highlights
- **Variants**: `brand-50` to `brand-950` - Full spectrum for various UI states

### Semantic Colors
- **Success**: `success-500` (#22c55e) - Confirmations, positive states
- **Warning**: `warning-500` (#f59e0b) - Alerts, cautionary states
- **Danger**: `danger-500` (#ef4444) - Errors, destructive actions
- **Neutral**: `neutral-50` to `neutral-950` - Grays for text and borders

### Usage Guidelines
```css
/* Primary actions */
.btn-primary { @apply bg-brand-500 hover:bg-brand-400; }

/* Success states */
.status-success { @apply text-success-400 bg-success-500/20; }

/* Text hierarchy */
.text-primary { @apply text-white; }
.text-secondary { @apply text-neutral-300; }
.text-muted { @apply text-neutral-400; }
```

## Typography

### Font Families
- **Sans**: Inter - Primary UI font
- **Mono**: JetBrains Mono - Code and numbers

### Text Sizes
- `text-xs` (12px) - Captions, badges
- `text-sm` (14px) - Body text, labels
- `text-base` (16px) - Default body
- `text-lg` (18px) - Subheadings
- `text-xl` (20px) - Headings
- `text-2xl` (24px) - Page titles

## Spacing Tokens

### Standard Scale
- `space-1` (4px) - Tight spacing
- `space-2` (8px) - Small gaps
- `space-4` (16px) - Default spacing
- `space-6` (24px) - Section spacing
- `space-8` (32px) - Large sections

### Custom Additions
- `space-18` (72px) - Extra large spacing
- `space-88` (352px) - Layout columns
- `space-112` (448px) - Wide content areas

## Border Radius

### Standard Scale
- `rounded-xs` (2px) - Subtle rounding
- `rounded-lg` (8px) - Buttons, inputs
- `rounded-xl` (12px) - Cards, modals
- `rounded-2xl` (16px) - Large cards
- `rounded-3xl` (24px) - Hero sections

### Custom Additions
- `rounded-4xl` (32px) - Extra large elements
- `rounded-5xl` (40px) - Decorative elements
- `rounded-6xl` (48px) - Brand elements

## Shadows

### Elevation System
- `shadow-card` - Default card elevation
- `shadow-card-hover` - Hover state elevation
- `shadow-button` - Button depth
- `shadow-button-hover` - Button hover depth
- `shadow-inner-border` - Subtle inner borders

## Component Library

### Button
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="lg">
  Primary Action
</Button>

// Variants: primary, secondary, ghost, danger, success
// Sizes: sm, md, lg, xl
```

### Badge
```tsx
import { Badge } from './components/ui/Badge';

<Badge variant="success" size="sm">
  New
</Badge>

// Variants: default, primary, success, warning, danger, neutral
// Sizes: sm, md, lg
```

### Card
```tsx
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/Card';

<Card variant="elevated" hover>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>

// Variants: default, elevated, outlined, glass
// Padding: none, sm, md, lg, xl
```

### Input
```tsx
import { Input } from './components/ui/Input';

<Input
  label="Email"
  placeholder="Enter email"
  error={hasError}
  errorMessage="Email is required"
  leftIcon={<Mail />}
/>

// Variants: default, filled, outlined
// Sizes: sm, md, lg
```

### Select
```tsx
import { Select } from './components/ui/Select';

<Select label="Country" placeholder="Select country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</Select>
```

### Modal
```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from './components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Action"
  size="md"
>
  <ModalBody>
    Are you sure?
  </ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Cancel</Button>
    <Button variant="danger">Delete</Button>
  </ModalFooter>
</Modal>

// Sizes: sm, md, lg, xl, full
```

### Rating
```tsx
import { Rating } from './components/ui/Rating';

<Rating
  value={4.5}
  size="md"
  showValue
  readonly={false}
  onChange={handleRatingChange}
/>

// Sizes: sm, md, lg
// Precision: 0.5 (half stars), 1 (whole stars)
```

### Price
```tsx
import { Price } from './components/ui/Price';

<Price
  value={999}
  compareAtValue={1199}
  size="lg"
  showDiscount
  discountType="percentage"
/>

// Sizes: sm, md, lg, xl
// Variants: default, success, danger, neutral
```

### Breadcrumbs
```tsx
import { Breadcrumbs } from './components/ui/Breadcrumbs';

const items = [
  { label: 'Products', href: '/products' },
  { label: 'Phones', href: '/products?category=phones' },
  { label: 'iPhone 15 Pro', current: true }
];

<Breadcrumbs items={items} showHome />
```

### Pagination
```tsx
import { Pagination } from './components/ui/Pagination';

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  siblingCount={1}
  showEdges
/>
```

## Animations

### Keyframes
- `fade-in` - Smooth fade entrance
- `slide-up` - Slide up from bottom
- `slide-down` - Slide down from top
- `scale-in` - Scale from center
- `bounce-subtle` - Gentle bounce effect

### Usage
```css
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
.animate-slide-up { animation: slideUp 0.3s ease-out; }
.animate-scale-in { animation: scaleIn 0.2s ease-out; }
```

## Responsive Breakpoints

### Tailwind Defaults
- `sm`: 640px - Small tablets
- `md`: 768px - Tablets
- `lg`: 1024px - Laptops
- `xl`: 1280px - Desktops
- `2xl`: 1536px - Large screens

### Mobile-First Approach
```css
/* Mobile default */
.container { @apply px-4; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { @apply px-6; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { @apply px-8; }
}
```

## Accessibility

### Focus States
- All interactive elements have visible focus indicators
- Focus rings use `focus:ring-2 focus:ring-brand-500`
- Focus offset for better visibility: `focus:ring-offset-2`

### Color Contrast
- Primary text on dark backgrounds: 14:1 ratio
- Secondary text: 7:1 ratio
- Accent colors meet WCAG AA standards

### Screen Reader Support
- Semantic HTML elements
- ARIA labels for complex interactions
- Skip navigation links
- Proper heading hierarchy

## Dark Mode Support

The design system is built dark-first with optional light mode tokens available:

```css
/* Dark mode (default) */
.bg-surface { @apply bg-neutral-900; }
.text-primary { @apply text-white; }

/* Light mode (optional) */
.light .bg-surface { @apply bg-white; }
.light .text-primary { @apply text-neutral-900; }
```

## Performance Considerations

### Bundle Size
- Tree-shakeable component imports
- Optimized Tailwind CSS purging
- Icon library tree-shaking

### Runtime Performance
- Minimal re-renders with proper React patterns
- Optimized animations using CSS transforms
- Lazy loading for non-critical components

## Usage Guidelines

### Component Composition
```tsx
// Good: Compose components for flexibility
<Card>
  <CardHeader>
    <h2>Product Details</h2>
    <Badge variant="success">New</Badge>
  </CardHeader>
  <CardContent>
    <Price value={999} compareAtValue={1199} />
  </CardContent>
</Card>

// Avoid: Monolithic components
<ProductCard {...allProps} />
```

### Consistent Spacing
```tsx
// Good: Use consistent spacing scale
<div className="space-y-4">
  <div className="space-y-2">
    <h3>Title</h3>
    <p>Description</p>
  </div>
  <Button>Action</Button>
</div>

// Avoid: Arbitrary values
<div className="mb-[13px] mt-[7px]">
```

### Color Usage
```tsx
// Good: Semantic color usage
<Button variant="danger">Delete</Button>
<Badge variant="success">Active</Badge>

// Avoid: Direct color classes
<button className="bg-red-500">Delete</button>
```

## Extending the System

### Adding New Components
1. Create component in `/src/components/ui/`
2. Follow existing patterns for props and variants
3. Add to `/src/components/ui/index.ts`
4. Update documentation

### Custom Variants
```tsx
// Extend existing variants
const buttonVariants = {
  ...existing,
  custom: 'bg-purple-500 hover:bg-purple-400 text-white'
};
```

### New Color Tokens
```ts
// Add to tailwind.config.ts
colors: {
  custom: {
    50: '#...',
    500: '#...',
    900: '#...'
  }
}
```

## Migration Guide

### From Custom Styles
```tsx
// Before
<div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5">

// After
<Card padding="lg">
```

### From Old Components
```tsx
// Before
<Money value={price} className="text-xl font-semibold" />

// After
<Price value={price} size="xl" />
```

## Best Practices

1. **Consistency**: Use design tokens instead of arbitrary values
2. **Accessibility**: Include focus states and ARIA labels
3. **Performance**: Prefer CSS over JavaScript animations
4. **Maintainability**: Document component usage and variants
5. **Testing**: Test components across different screen sizes
6. **Progressive Enhancement**: Ensure functionality without JavaScript

---

**Last Updated**: September 17, 2025
**Version**: 1.0.0