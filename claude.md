# IV API Product Viewer - Test Harness

## Project Overview
A Next.js application deployed on Vercel for testing and viewing product data from the IV Internal API. This test harness allows users to query products, inspect API responses, and validate data structures.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Deployment**: Vercel
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query for API state
- **API Client**: Fetch API with custom wrapper
- **Testing**: Vitest + React Testing Library

### Project Structure
```
/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page with API explorer
│   ├── products/
│   │   ├── page.tsx              # Product listing
│   │   └── [id]/
│   │       └── page.tsx          # Product detail view
│   └── api/
│       └── proxy/
│           └── [...path]/
│               └── route.ts      # API proxy to avoid CORS
├── components/
│   ├── api/
│   │   ├── ApiExplorer.tsx       # Interactive API testing interface
│   │   ├── EndpointSelector.tsx  # Dropdown for endpoint selection
│   │   ├── RequestBuilder.tsx    # Form for building API requests
│   │   └── ResponseViewer.tsx    # JSON viewer with syntax highlighting
│   ├── products/
│   │   ├── ProductCard.tsx       # Product display card
│   │   ├── ProductList.tsx       # Product grid/list view
│   │   └── ProductFilter.tsx     # Filter and search controls
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── JsonViewer.tsx        # Reusable JSON display component
├── lib/
│   ├── api/
│   │   ├── client.ts             # API client configuration
│   │   ├── endpoints.ts          # Endpoint definitions
│   │   ├── types.ts              # TypeScript types for API responses
│   │   └── hooks.ts              # React Query hooks
│   ├── utils/
│   │   ├── formatters.ts         # Data formatting utilities
│   │   └── validators.ts         # Input validation
│   └── constants.ts              # App-wide constants
├── types/
│   ├── api.ts                    # API-specific types
│   └── products.ts               # Product data types
└── config/
    └── api-config.ts             # API configuration (base URL, auth, etc.)
```

## Core Features

### 1. API Explorer
Interactive interface for testing API endpoints:
- Endpoint selection dropdown
- Dynamic parameter input based on endpoint
- Request method selector (GET, POST, PUT, DELETE)
- Headers and authentication configuration
- Raw request/response viewer
- Response time and status tracking
- History of recent requests

### 2. Product Viewer
Dedicated interface for browsing products:
- Product listing with pagination
- Search and filter capabilities
- Product detail view with all related data
- Side-by-side comparison of multiple products
- Export product data (JSON/CSV)

### 3. Data Inspector
Tools for analyzing API responses:
- Syntax-highlighted JSON viewer
- Collapsible/expandable tree view
- Copy to clipboard functionality
- Difference viewer for comparing responses
- Schema validation display

### 4. Test Scenarios
Pre-configured test scenarios:
- Common query patterns
- Edge case testing
- Performance benchmarking
- Error handling validation

## Technical Implementation

### API Client (`lib/api/client.ts`)
```typescript
// Centralized API client with:
// - Base URL configuration
// - Authentication handling
// - Request/response interceptors
// - Error handling
// - Retry logic
// - Request cancellation
```

### React Query Integration
- Automatic caching and revalidation
- Background refetching
- Optimistic updates
- Prefetching for improved UX
- Query invalidation strategies

### API Proxy Route (`app/api/proxy/[...path]/route.ts`)
- Server-side API calls to avoid CORS issues
- Secure credential handling
- Request logging
- Rate limiting protection
- Error transformation

### Environment Configuration
```
NEXT_PUBLIC_APP_NAME=IV API Product Viewer
NEXT_PUBLIC_APP_ENV=development

# API Configuration
IV_API_BASE_URL=<internal-api-url>
IV_API_KEY=<api-key>
IV_API_TIMEOUT=30000

# Optional: Enable request logging
ENABLE_API_LOGGING=true
```

## Security Considerations
- API credentials stored in environment variables
- Server-side API proxy to hide credentials from client
- Input sanitization for all user inputs
- Rate limiting on API proxy
- HTTPS only in production
- Secure headers configuration

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Code Quality
- TypeScript strict mode
- ESLint + Prettier configuration
- Pre-commit hooks with Husky
- Component documentation with JSDoc

### Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for API client
- E2E tests for critical user flows
- Manual testing checklist for API scenarios

## Deployment on Vercel

### Configuration
- Automatic deployments from main branch
- Preview deployments for PRs
- Environment variables configured in Vercel dashboard
- Custom domain (if required)

### Performance Optimization
- Server Components for initial page loads
- Route caching strategies
- Image optimization
- Bundle size monitoring
- Edge runtime for API routes where applicable

## Future Enhancements
- Authentication for test harness access
- Saved test collections
- Automated test scheduling
- API response mocking
- GraphQL support (if API evolves)
- Webhook testing
- Real-time collaboration features
- Export test reports
- API version comparison

## API Integration Notes

**Note**: The provided API documentation URL returned unexpected content. Once the correct API documentation is available, the following should be updated:

1. **Endpoint Definitions** (`lib/api/endpoints.ts`): Map all available endpoints
2. **Type Definitions** (`types/api.ts`): Create TypeScript interfaces for all API responses
3. **API Client Configuration** (`lib/api/client.ts`): Configure base URL and authentication
4. **React Query Hooks** (`lib/api/hooks.ts`): Create hooks for each endpoint
5. **Test Scenarios**: Build realistic test cases based on actual API behavior

### Questions to Resolve
- What is the correct API base URL?
- What authentication method is used? (API Key, OAuth, JWT, etc.)
- Are there rate limits we need to handle?
- What are the main product-related endpoints?
- What related data is available for products? (images, pricing, inventory, etc.)
- Are there any webhooks or real-time features?

## Design Principles
- **Developer-First UX**: Prioritize functionality and data visibility over aesthetics
- **Performance**: Fast load times and responsive interactions
- **Reliability**: Robust error handling and retry mechanisms
- **Maintainability**: Clear code organization and comprehensive documentation
- **Flexibility**: Easy to add new endpoints and test scenarios
- **Security**: Never expose credentials to the client
