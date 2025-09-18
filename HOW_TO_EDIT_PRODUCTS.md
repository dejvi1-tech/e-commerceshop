# How to Edit Products

This guide explains how to manage products in your e-commerce application.

## Product Data Structure

Each product follows this TypeScript interface:

```typescript
type Product = {
  id: string;                    // Unique identifier
  slug: string;                  // URL-friendly version of title
  title: string;                 // Product name
  brand: string;                 // Brand name (Apple, Samsung, etc.)
  category: 'phones' | 'accessories'; // Product category
  description: string;           // Full product description
  price: number;                 // Price in USD
  compareAtPrice?: number;       // Optional original price for sales
  colors: {                      // Available color variants
    name: string;                // Color name (e.g., "Space Gray")
    hex: string;                 // Hex color code (e.g., "#1C1C1E")
    images: string[];            // Array of image URLs for this color
  }[];
  images: string[];              // Main product images
  inStock: boolean;              // Availability status
  badges?: string[];             // Optional product badges
  specs?: Record<string, string>; // Technical specifications
  rating?: number;               // Average rating (0-5)
  variants?: {                   // Product variants (storage, etc.)
    storage?: string;
    color?: string;
    sku?: string;
  }[];
};
```

## Methods to Edit Products

### 1. Using the Admin Panel (Recommended)

1. **Access**: Navigate to `/admin` in your browser
2. **Create**: Click "Add Product" to create new products
3. **Edit**: Click the edit icon (pencil) next to any product
4. **Delete**: Click the trash icon to remove products
5. **Export**: Click "Export" to download the current products.json
6. **Import**: Click "Import" to upload a products.json file

**Features:**
- Visual interface with forms
- Color picker for hex values
- Real-time preview
- Data validation
- Automatic localStorage sync in development

### 2. Direct JSON Editing

Edit `/src/data/products.json` directly:

```json
{
  "id": "unique-product-id",
  "slug": "product-url-slug",
  "title": "Product Name",
  "brand": "Brand Name",
  "category": "phones",
  "description": "Detailed product description...",
  "price": 999,
  "compareAtPrice": 1099,
  "rating": 4.8,
  "inStock": true,
  "badges": ["Flagship", "New"],
  "colors": [
    {
      "name": "Space Gray",
      "hex": "#1C1C1E",
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    }
  ],
  "images": [
    "https://example.com/main-image.jpg"
  ],
  "specs": {
    "Display": "6.1\" OLED",
    "Processor": "A17 Pro",
    "Storage": "128GB, 256GB, 512GB"
  },
  "variants": [
    {
      "storage": "128GB",
      "color": "Space Gray",
      "sku": "PROD-128-SG"
    }
  ]
}
```

### 3. TypeScript Data (Development)

For development, you can also edit `/src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 'new-product-001',
    slug: 'new-product',
    title: 'New Product',
    // ... rest of product data
  }
];
```

## Image Management

### Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 600x600px, recommended 1200x1200px
- **Aspect Ratio**: Square (1:1) for best results
- **Compression**: Optimize for web (target <200KB per image)

### Image Conventions

1. **Naming**: Use descriptive names
   - `iphone-15-pro-natural-titanium-front.jpg`
   - `samsung-s24-ultra-titanium-black-back.jpg`

2. **Color-Specific Images**: Each color variant should have its own image set
   ```json
   "colors": [
     {
       "name": "Natural Titanium",
       "hex": "#8E8D89",
       "images": [
         "/images/iphone-15-pro-natural-front.jpg",
         "/images/iphone-15-pro-natural-back.jpg"
       ]
     }
   ]
   ```

3. **Main Images**: Should represent the product generally
   ```json
   "images": [
     "/images/iphone-15-pro-hero.jpg",
     "/images/iphone-15-pro-features.jpg"
   ]
   ```

### Image Hosting

- **Development**: Use placeholder services like Unsplash
- **Production**: Use a CDN like Cloudinary, AWS S3, or Vercel
- **Local**: Place images in `/public/images/` directory

## Color Swatches

### Hex Color Guidelines

Use accurate hex codes that represent the actual product colors:

```json
{
  "name": "Space Black",
  "hex": "#1C1C1E"
},
{
  "name": "Silver",
  "hex": "#E3E4E6"
},
{
  "name": "Gold",
  "hex": "#FAE7B3"
},
{
  "name": "Deep Purple",
  "hex": "#5F4B8B"
}
```

### Finding Hex Colors

1. Use brand style guides (Apple, Samsung official colors)
2. Color picker tools like:
   - Adobe Color
   - Coolors.co
   - Browser developer tools
3. Extract from official product images

## Admin Page Usage

### Creating Products

1. Click "Add Product"
2. Fill required fields (marked with *)
3. Add color variants:
   - Enter color name
   - Pick hex color
   - Add image URLs for that color
4. Set specifications using key-value pairs
5. Click "Create"

### Editing Products

1. Click edit icon on any product
2. Modify any field
3. Add/remove colors using respective buttons
4. Click "Update"

### Data Persistence

- **Development**: Data stored in localStorage
- **Production**: Edit products.json and redeploy
- **Export**: Download merged data from admin panel

### Import/Export

**Export:**
- Downloads current product data as JSON
- Includes all localStorage changes
- Use this file for production deployment

**Import:**
- Upload a valid products.json file
- Replaces all current data
- Validates JSON structure before import

## Best Practices

### Product IDs
- Use descriptive, unique IDs: `ip15-pro-max-256gb`
- Keep consistent naming conventions
- Never change IDs of existing products (breaks cart references)

### Slugs
- URL-friendly, lowercase, hyphenated
- Should match the product title: `iphone-15-pro-max`
- Must be unique across all products

### Descriptions
- Write compelling, detailed descriptions
- Include key features and benefits
- Keep consistent tone and style
- Mention compatibility, specifications

### Pricing
- Use whole numbers for USD prices
- Set `compareAtPrice` for sale items
- Ensure pricing is competitive and accurate

### Categories
- Currently supports: `phones`, `accessories`
- Keep consistent categorization
- Plan category structure before adding many products

### Specifications
- Use consistent key names across similar products
- Common keys: `Display`, `Processor`, `Camera`, `Battery`, `Storage`
- Keep values concise but informative

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs are accessible
2. **Invalid JSON**: Use a JSON validator before importing
3. **Missing required fields**: Ensure all required fields are filled
4. **Duplicate slugs**: Each product needs a unique slug
5. **Color hex validation**: Use valid 6-character hex codes with #

### Validation

The admin panel validates:
- Required fields (id, slug, title, brand, category)
- Unique IDs and slugs
- Valid hex colors
- Image URL format
- JSON structure on import

### Data Recovery

- Export data regularly as backup
- Check localStorage for unsaved changes
- Git track the products.json file
- Keep backup copies of working configurations

## Performance Considerations

- Limit image sizes (optimize before upload)
- Use appropriate image formats (WebP for modern browsers)
- Don't exceed 100 products without pagination
- Consider lazy loading for large catalogs
- Optimize product descriptions length