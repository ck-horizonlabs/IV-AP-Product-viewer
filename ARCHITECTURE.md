# IV API Product Viewer - Architecture Documentation

## Overview

This application is a comprehensive Next.js-based test harness and validation tool for the IV Internal API. It follows Material Design principles and provides QA teams with systematic validation capabilities.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **State Management**: TanStack Query (React Query) for server state
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
IV-AP-Product-viewer/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── proxy/[...path]/      # Server-side API proxy
│   │       └── route.ts
│   ├── products/                 # Product pages
│   │   ├── [id]/
│   │   │   └── page.tsx          # Product detail page
│   │   └── page.tsx              # Product list page
│   ├── validation/               # QA validation interface
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout with nav
│   ├── page.tsx                  # Homepage
│   └── providers.tsx             # React Query provider
├── components/
│   ├── products/                 # Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilter.tsx
│   │   ├── ProductList.tsx
│   │   └── index.ts
│   ├── validation/               # Validation interface components
│   │   ├── ProductList.tsx       # Validation product selector
│   │   ├── ProductDetails.tsx    # Tabbed detail view
│   │   ├── ValidationField.tsx   # Individual field validation
│   │   ├── ValidationSummary.tsx # Results summary panel
│   │   └── index.ts
│   └── ui/                       # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── JsonViewer.tsx
├── hooks/                        # Custom React hooks
│   ├── useValidation.ts          # Validation state management
│   ├── useKeyboardShortcuts.ts   # Keyboard shortcut handler
│   └── index.ts
├── lib/
│   ├── api/                      # API client layer
│   │   ├── client.ts             # HTTP client
│   │   ├── endpoints.ts          # API endpoint definitions
│   │   └── hooks.ts              # React Query hooks
│   └── utils/
│       └── formatters.ts         # Utility functions
├── utils/                        # Business logic utilities
│   └── exportReport.ts           # Report export functionality
├── types/                        # TypeScript definitions
│   ├── api.ts
│   └── products.ts
└── config/
    └── api-config.ts             # API configuration

```

## Architecture Patterns

### 1. Server-Side API Proxy

**Purpose**: Hide API credentials, avoid CORS, enable caching

```typescript
// Client makes requests to /api/proxy/*
fetch('/api/proxy/products')

// Server proxy forwards to actual API with credentials
// app/api/proxy/[...path]/route.ts
const response = await fetch(`${IV_API_BASE_URL}/${path}`, {
  headers: { 'x-api-key': IV_API_KEY }
});
```

**Benefits**:
- API key never exposed to client
- No CORS issues
- Centralized error handling
- Can add server-side caching

### 2. React Query for Data Management

**Usage**:
```typescript
// Define hook in lib/api/hooks.ts
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiClient.get('/products', { params: filters })
  });
}

// Use in components
const { data, isLoading, error } = useProducts({ store: 'au' });
```

**Benefits**:
- Automatic caching and deduplication
- Loading/error states built-in
- Background refetching
- Optimistic updates

### 3. Custom Hooks Pattern

#### useValidation Hook
Manages validation state and provides helper methods:

```typescript
const {
  validationResults,      // Current validation state
  handleValidation,       // Mark field as pass/fail
  clearValidations,       // Reset all validations
  getSummary,            // Get statistics
  exportResults          // Generate report data
} = useValidation();
```

#### useKeyboardShortcuts Hook
Handles application-wide keyboard shortcuts:

```typescript
useKeyboardShortcuts({
  onExport: handleExportReport,  // Ctrl/Cmd + S
  onClear: handleClearResults,   // Ctrl/Cmd + E
  onEscape: handleCloseModal     // Esc
});
```

### 4. Component Organization

#### Barrel Exports (index.ts)
Clean imports using index files:

```typescript
// Instead of:
import { ProductList } from '@/components/validation/ProductList';
import { ProductDetails } from '@/components/validation/ProductDetails';

// Use:
import { ProductList, ProductDetails } from '@/components/validation';
```

#### Component Structure
- **Presentational Components**: UI-only, receive props
- **Container Components**: Data fetching, state management
- **Page Components**: Route handlers with layouts

## Data Flow

### Product Browsing Flow
```
User navigates to /products
    ↓
Page component fetches data via useProducts() hook
    ↓
React Query checks cache
    ↓
If not cached, makes request to /api/proxy/products
    ↓
Server proxy forwards to IV API with credentials
    ↓
Response cached by React Query
    ↓
ProductList component renders products
```

### Validation Flow
```
User selects product in validation interface
    ↓
Product details fetched and displayed
    ↓
User marks fields as pass/fail with comments
    ↓
Validation state updated in local component state
    ↓
ValidationSummary shows real-time statistics
    ↓
User exports report (Ctrl+S or button click)
    ↓
JSON report generated and downloaded
```

## Key Features

### 1. Validation Interface

**Three-Panel Layout**:
- **Left**: Product selector with search
- **Center**: Product details with validation controls
- **Right**: Validation summary and statistics

**Validation Field Component**:
- Status indicators (AlertCircle, CheckCircle, XCircle)
- Pass/fail buttons
- Comment textarea
- Gray background for values

**Keyboard Shortcuts**:
- `Ctrl/Cmd + S`: Export validation report
- `Ctrl/Cmd + E`: Clear all validations
- `Esc`: Close modals/lightboxes

### 2. Material Design Implementation

**Color Palette**:
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Yellow (#F59E0B)
- Neutral: Gray scale

**Design Principles**:
- Cards for content grouping
- Rounded corners (rounded-lg)
- Shadows for elevation
- Hover states for interactivity
- Icons for visual communication

### 3. Type Safety

Full TypeScript coverage:
```typescript
// Product type matches API response
interface Product {
  product_id: number;
  product_name: string;
  status?: string;
  // ... all fields typed
}

// Validation types
interface ValidationResult {
  status: 'pass' | 'fail';
  comment: string;
}
```

## API Integration

### Endpoints Used

- `GET /products` - List products with filters
  - Query params: `store`, `status`, `page`, `perPage`

### Error Handling

```typescript
try {
  const response = await apiClient.get('/products');
  return response.data;
} catch (error) {
  console.error('API Error:', error);
  throw error; // React Query handles error state
}
```

## Environment Variables

Required variables in `.env.local`:

```env
IV_API_BASE_URL=https://otcoj6zl4b.execute-api.ap-southeast-2.amazonaws.com/v1
IV_API_KEY=your-api-key-here
IV_API_TIMEOUT=30000
ENABLE_API_LOGGING=false
```

## Deployment

### Vercel Configuration

1. Environment variables set in Vercel dashboard
2. Automatic deployments from GitHub main branch
3. Production URL: https://iv-api-product-viewer.vercel.app

### Build Process

```bash
npm run build    # Next.js build
npm start        # Production server
```

## Performance Optimizations

1. **React Query Caching**: Reduces unnecessary API calls
2. **Server Components**: Default to server-side rendering
3. **Code Splitting**: Automatic via Next.js
4. **Image Optimization**: Next.js Image component
5. **Static Generation**: Where possible

## Future Enhancements

- [ ] Images tab for product image validation
- [ ] Pricing tab with detailed breakdown
- [ ] Itinerary tab for day-by-day routes
- [ ] Image lightbox for full-screen viewing
- [ ] PDF report export
- [ ] Bulk validation operations
- [ ] Historical validation tracking
- [ ] Team collaboration features

## Development Guidelines

### Adding New Features

1. Create component in appropriate directory
2. Add TypeScript types
3. Create custom hook if needed
4. Add tests (future)
5. Update documentation

### Code Style

- Use functional components
- Prefer hooks over class components
- Use TypeScript strictly
- Follow existing naming conventions
- Add comments for complex logic

### Testing Strategy (Future)

- Unit tests for utilities
- Integration tests for hooks
- E2E tests for critical paths
- Visual regression tests

## Troubleshooting

### Common Issues

1. **API Key Not Working**: Check environment variables in Vercel
2. **CORS Errors**: Ensure using `/api/proxy` not direct API
3. **Build Failures**: Check TypeScript errors with `npm run type-check`
4. **Styling Issues**: Verify Tailwind CSS v4 configuration

---

Built for Inspiring Vacations by Horizon Labs
