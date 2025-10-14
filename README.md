# IV API Product Viewer

A Next.js test harness for viewing and testing product data from the IV Internal API.

## Features

- Browse and search products
- View detailed product information
- Interactive API explorer
- JSON response viewer
- React Query for efficient data fetching
- Dark mode support
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- IV API credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IV-AP-Product-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your API credentials:
```
IV_API_BASE_URL=<your-api-base-url>
IV_API_KEY=<your-api-key>
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── proxy/         # API proxy to avoid CORS
│   ├── products/          # Product pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query provider
├── components/            # React components
│   ├── api/              # API-related components
│   ├── products/         # Product components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and helpers
│   ├── api/             # API client and hooks
│   └── utils/           # Utility functions
├── types/               # TypeScript type definitions
└── config/              # Configuration files
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Deployment**: Vercel

## Deployment on Vercel

1. Push your code to GitHub

2. Import the project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - Add `IV_API_BASE_URL`
   - Add `IV_API_KEY`
   - Add any other required variables

4. Deploy!

## API Configuration

The application uses a server-side proxy (`/api/proxy`) to make API calls. This prevents CORS issues and keeps your API credentials secure.

To add new endpoints, update:
- `lib/api/endpoints.ts` - Define endpoint paths
- `lib/api/hooks.ts` - Create React Query hooks
- `types/` - Add TypeScript types for responses

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Documentation

For detailed architecture and implementation details, see [claude.md](./claude.md).

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and type checking
4. Submit a pull request

## License

Private - Inspiring Vacations Internal Tool
