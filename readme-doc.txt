# API Product Validation UI

A comprehensive React/TypeScript application for validating API product data against website content. Built with Material Design principles using Tailwind CSS.

## Features

- ✅ **Product List View** - Search and browse products
- ✅ **Comprehensive Details View** - 9 organized sections covering all API fields
- ✅ **Image Gallery** - View and validate product images with lightbox
- ✅ **Pricing Validation** - Verify pricing tiers, discounts, and availability
- ✅ **Itinerary Review** - Day-by-day validation of routes and activities
- ✅ **Validation Tracking** - Pass/fail marking with comment notes
- ✅ **Export Reports** - JSON export of validation results
- ✅ **Keyboard Shortcuts** - Quick actions for power users

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Custom Hooks** - State management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd api-validation-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ProductList/    # Product listing
│   ├── ProductDetails/ # Details view and tabs
│   ├── ValidationField/# Field validation UI
│   ├── ValidationSummary/ # Results summary
│   └── ImageLightbox/  # Image viewer
├── hooks/              # Custom React hooks
│   ├── useValidation.ts
│   └── useKeyboardShortcuts.ts
├── types/              # TypeScript definitions
│   ├── product.types.ts
│   └── validation.types.ts
├── data/               # Mock data
│   └── mockProducts.ts
└── App.tsx             # Main application
```

## Usage

### Basic Workflow

1. **Select a Product** - Click any product in the left panel
2. **Review Details** - Navigate through tabs (Details, Images, Pricing, Itinerary)
3. **Validate Fields** - Mark each field as ✅ Pass or ❌ Fail
4. **Add Comments** - Document any discrepancies
5. **Export Report** - Generate validation report (Ctrl/Cmd + S)

### Keyboard Shortcuts

- **Esc** - Close image lightbox
- **Ctrl/Cmd + S** - Export validation report
- **Ctrl/Cmd + E** - Clear all validation results

## Customization

### Connecting to Real API

Replace mock data in `src/data/mockProducts.ts` with API calls:

```typescript
// src/services/api.ts
export const fetchProducts = async () => {
  const response = await fetch('YOUR_API_URL/products');
  return response.json();
};

export const fetchProductDetails = async (id: number) => {
  const response = await fetch(`YOUR_API_URL/products/${id}`);
  return response.json();
};
```

### Adding New Validation Sections

1. Define types in `src/types/product.types.ts`
2. Add new tab component in `src/components/ProductDetails/`
3. Update `TabType` in `src/types/validation.types.ts`
4. Import and use in `ProductDetailsView.tsx`

### Styling

Modify `tailwind.config.js` to customize colors and theme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        // ...
      }
    }
  }
}
```

## API Data Structure

The application expects product data in the following format:

```typescript
interface ApiProductResponse {
  id: number;
  productCode: string;
  name: string;
  // ... see src/types/product.types.ts for full schema
}
```

## Validation Report Format

Exported reports contain:

```json
{
  "timestamp": "2025-10-15T12:00:00Z",
  "summary": {
    "total": 45,
    "passed": 42,
    "failed": 3
  },
  "results": {
    "fieldName": {
      "status": "pass",
      "comment": "Validation notes"
    }
  }
}
```

## Component Documentation

### ValidationField

Reusable component for validating individual fields:

```typescript
<ValidationField
  label="Product Name"
  value={product.name}
  field="product_name"
  validationResults={results}
  onValidate={handleValidation}
/>
```

### useValidation Hook

Custom hook managing validation state:

```typescript
const {
  validationResults,
  handleValidation,
  clearValidations,
  getPassedCount,
  exportResults
} = useValidation();
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@yourcompany.com

## Roadmap

- [ ] Bulk validation operations
- [ ] Comparison view (side-by-side API vs Website)
- [ ] Validation templates
- [ ] Team collaboration features
- [ ] Historical validation tracking
- [ ] PDF report export
- [ ] API integration wizard

---

Built with ❤️ by the Inspiring Vacations team
