# Testing Guide

## Pre-Deployment Testing

Before deploying to Vercel, test the application locally to ensure everything works correctly.

## 1. Start Development Server

```bash
npm run dev
```

The application should start at http://localhost:3000

## 2. Test Pages

### Home Page
- Navigate to http://localhost:3000
- Verify the home page loads with:
  - Header with "IV API Product Viewer" title
  - Navigation links (Home, Products)
  - Feature cards
  - Quick Start section

### Products Page
- Click "Browse Products" or navigate to http://localhost:3000/products
- Expected behavior:
  - If API is configured correctly: Product list will load
  - If API has issues: Error message will display
- Test the search and filter functionality

### Product Detail Page
- Click on any product card (if products load)
- Or navigate to http://localhost:3000/products/1
- Verify:
  - Back button works
  - Product details display (if available)
  - Raw JSON viewer shows API response

## 3. Test API Proxy

### Using Browser DevTools

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to Products page
4. Look for API calls to `/api/proxy/...`
5. Check:
   - Status codes (200 = success, 404 = not found, 500 = error)
   - Response data structure
   - Request/response times

### Using curl

Test the API proxy directly:

```bash
# Test products endpoint
curl http://localhost:3000/api/proxy/products

# Test with authentication
curl -H "x-api-key: zL0o3UHEVw4HuGJSau9o418ZdQxNn3JC4IHpCj3G" \
  http://localhost:3000/api/proxy/products
```

## 4. Test React Query DevTools

1. Start the development server
2. Look for the React Query DevTools icon (floating icon in bottom corner)
3. Click to open
4. Verify:
   - Query keys are structured correctly
   - Cache is working
   - Queries show proper states (loading, success, error)

## 5. Check Console Logs

With `ENABLE_API_LOGGING=true`, you should see logs like:

```
[API Client] GET https://your-api-url/products
[API Client] Response 200 {...}
```

## 6. Test Error Handling

### Test with Invalid API Key

1. Edit `.env.local` and change the API key to something invalid
2. Restart the dev server
3. Navigate to Products page
4. Verify error message displays correctly

### Test with Invalid Endpoint

1. Navigate to http://localhost:3000/products/invalid-id
2. Verify error handling displays properly

## 7. Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

Should complete with no errors.

## 8. Linting

Run ESLint:

```bash
npm run lint
```

Should complete with no errors or warnings.

## 9. Build Test

Test production build:

```bash
npm run build
npm start
```

Visit http://localhost:3000 and verify everything works.

## 10. Test Dark Mode

1. Open the application
2. Change your system theme to dark mode
3. Verify the UI adapts correctly

## Common Issues and Solutions

### Issue: API Returns 404

**Possible Causes:**
- Incorrect API base URL
- Endpoint doesn't exist
- API is not accessible

**Solution:**
- Verify `IV_API_BASE_URL` in `.env.local`
- Check API documentation for correct endpoints
- Test API directly with curl or Postman

### Issue: CORS Errors

**This should NOT happen** since we're using a server-side proxy. If you see CORS errors:
- Ensure you're calling `/api/proxy/...` not the API directly
- Check the API proxy implementation

### Issue: Type Errors

**Solution:**
- Run `npm run type-check` to see all errors
- Update type definitions in `types/` to match actual API responses
- Use `unknown` type temporarily while exploring API structure

### Issue: Build Fails

**Solution:**
- Check error messages carefully
- Run `npm run lint` to find linting issues
- Ensure all environment variables are set

### Issue: Products Don't Load

**Possible Causes:**
- API endpoint is incorrect
- Authentication is failing
- API response structure doesn't match types

**Debug Steps:**
1. Check browser console for errors
2. Check Network tab for API responses
3. Verify API credentials are correct
4. Check server logs (terminal where `npm run dev` is running)

## Testing Checklist

Before deploying to production:

- [ ] Home page loads correctly
- [ ] Products page loads
- [ ] Product detail page works
- [ ] Navigation works correctly
- [ ] API proxy functions properly
- [ ] Error handling displays correctly
- [ ] Loading states work
- [ ] Dark mode works
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Production build succeeds
- [ ] All links work
- [ ] No console errors
- [ ] Mobile responsive design works

## Mock Data for Testing

If the API is not ready, you can temporarily mock data by:

1. Creating a mock API response in `lib/api/client.ts`
2. Or using a service like JSONPlaceholder
3. Or creating a local API mock with `json-server`

Example mock data structure:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Sample Product",
      "description": "This is a sample product",
      "price": 99.99,
      "currency": "USD",
      "category": "Electronics",
      "status": "active"
    }
  ],
  "page": 1,
  "perPage": 20,
  "total": 1,
  "totalPages": 1
}
```

## Performance Testing

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### Load Time

First page load should be:
- Development: < 2 seconds
- Production: < 1 second

## Next Steps

After local testing is complete and successful:
1. Commit your changes
2. Push to GitHub
3. Deploy to Vercel (see DEPLOYMENT.md)
4. Test the production deployment
