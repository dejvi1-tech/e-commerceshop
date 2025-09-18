# Dev Mobile — React Storefront

A production-ready React 18 single-page app for a modern phones and accessories store. Built with accessibility, performance, and developer experience as top priorities. The storefront is frontend-only, optimised for speed, SEO, and easy future integration with your preferred checkout provider.

## ✨ Features

### Core Functionality
- **Product Catalog**: Advanced filtering by brand, category, price, and color
- **Product Details**: Image galleries, color variants, and specifications
- **Shopping Cart**: Persistent cart with real-time calculations
- **Checkout Flow**: Complete checkout process with form validation
- **Admin Panel**: Full CRUD operations for product management

### Performance & Quality
- **Lighthouse Score**: Optimized for ≥95 performance score
- **Accessibility**: WCAG AA compliant with screen reader support
- **SEO**: Dynamic meta tags, structured data, and sitemap
- **Testing**: Comprehensive test suite with 18+ tests
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with comprehensive design system
- **State Management**: Zustand with localStorage persistence
- **Routing**: React Router DOM 6 with client-side navigation
- **Forms**: React Hook Form with validation
- **Testing**: Vitest + Testing Library + Accessibility tests
- **SEO**: React Helmet Async with structured data
- **Icons**: Lucide React (tree-shakeable)
- **Linting**: ESLint + Accessibility rules + Tailwind plugin

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the dev server**

   ```bash
   npm run dev
   ```

   Vite will print a local URL. The SPA uses client-side routing, so use the `npm run dev -- --host` flag if you need LAN access for device testing.

3. **Lint the project**

   ```bash
   npm run lint
   ```

4. **Run tests and quality checks**

   ```bash
   npm run test               # Run tests in watch mode
   npm run test:run          # Run tests once
   npm run lint              # Check code quality
   npm run type-check        # TypeScript validation
   ```

5. **Create a production build**

   ```bash
   npm run build
   npm run preview    # optional: serve the dist build locally
   ```

### Project structure

```
src/
  components/        // Reusable UI components
    ui/             // Design system components (Button, Card, Modal, etc.)
    __tests__/      // Component tests
  data/              // Product data and TypeScript types
  hooks/             // Custom React hooks (keyboard navigation, announcements)
  pages/             // Route-level screens
  store/             // Zustand stores (cart, toasts)
  test/              // Test utilities and setup
  lib/               // Helper utilities (currency formatting)
```

## 🗂 Product Management

### Admin Panel
Access the admin panel at `/admin` to:
- **Add Products**: Create new products with full details
- **Edit Products**: Update existing product information
- **Manage Colors**: Add color variants with hex codes
- **Import/Export**: Backup and restore product data

### Data Structure
- Products are defined in [`src/data/products.json`](src/data/products.json)
- Each product includes: title, brand, category, price, colors, images, specs, and more
- TypeScript interfaces ensure type safety
- See `HOW_TO_EDIT_PRODUCTS.md` for detailed instructions

### Image Guidelines
- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 600x600px, recommended 1200x1200px
- **Optimization**: Target <200KB per image
- **CDN**: Use external CDN or local `/public/images/` directory

## Promo code demo

The cart supports a simple hard-coded promo code: `PROMO10` → 10% off the subtotal. Update logic in [`src/store/cartStore.ts`](src/store/cartStore.ts) if you need more codes.

## ♿ Accessibility & UX

### WCAG Compliance
- **AA Color Contrast**: All text meets contrast requirements
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Screen Readers**: ARIA labels, roles, and live regions
- **Skip Navigation**: Skip links for efficient navigation

### Advanced Features
- **Focus Trapping**: Modal and drawer focus management
- **Announcements**: Screen reader announcements for actions
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

### User Experience
- **Mobile-First**: Responsive design from 320px upwards
- **Progressive Enhancement**: Works without JavaScript
- **Loading States**: Skeleton placeholders and loading indicators
- **Error Handling**: Graceful error states and recovery
- **Toast Notifications**: Non-intrusive feedback system

## 🧪 Testing

### Test Suite
- **Unit Tests**: Component and hook testing
- **Integration Tests**: User interaction flows
- **Accessibility Tests**: Automated a11y checks
- **Type Checking**: Full TypeScript validation

### Coverage
- 18+ tests covering critical functionality
- Button, ProductCard, and hook testing
- Accessibility-focused test queries
- Mock external dependencies

### Running Tests
```bash
npm run test           # Watch mode
npm run test:run       # Single run
npm run test:ui        # Visual test runner
npm run test:coverage  # Coverage report
```

## 🚀 Deployment

### Build Process
1. **Quality Checks**
   ```bash
   npm run lint           # Code quality
   npm run type-check     # TypeScript validation
   npm run test:run       # Test suite
   ```

2. **Production Build**
   ```bash
   npm run build          # Generate optimized bundle
   npm run preview        # Test build locally
   ```

3. **Deploy Static Files**
   - Upload `dist/` folder to your hosting provider
   - Configure proper redirects for SPA routing
   - Set up CDN for optimal performance

### Hosting Recommendations
- **Vercel**: Zero-config deployment with performance monitoring
- **Netlify**: Easy setup with form handling capabilities
- **Cloudflare Pages**: Global CDN with excellent performance
- **AWS S3 + CloudFront**: Enterprise-grade hosting solution

## 📚 Documentation

- `HOW_TO_EDIT_PRODUCTS.md` - Product management guide
- `DESIGN_SYSTEM.md` - Design system documentation
- `PERF_NOTES.md` - Performance optimization notes

## 🔮 Future Enhancements

### Planned Features
- Real backend API integration
- Payment processing (Stripe/PayPal)
- User authentication system
- Product reviews and ratings
- Advanced search with AI
- Internationalization (i18n)

### Technical Improvements
- Service worker for offline support
- Advanced image optimization
- Real-time inventory updates
- A/B testing framework
- Performance monitoring

---

**Built with ❤️ using modern web technologies**
# e-commerceshop
