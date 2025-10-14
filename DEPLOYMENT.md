# Deployment Guide

## Deploying to Vercel

### Prerequisites
- GitHub account with repository access
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Step-by-Step Deployment

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: IV API Product Viewer"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**

   In the Vercel dashboard, add these environment variables:

   | Variable | Value | Description |
   |----------|-------|-------------|
   | `IV_API_BASE_URL` | Your API base URL | The base URL of the IV Internal API |
   | `IV_API_KEY` | `zL0o3UHEVw4HuGJSau9o418ZdQxNn3JC4IHpCj3G` | Your API key |
   | `IV_API_TIMEOUT` | `30000` | Request timeout in milliseconds |
   | `ENABLE_API_LOGGING` | `true` | Enable API request logging |
   | `NEXT_PUBLIC_APP_NAME` | `IV API Product Viewer` | Application name |
   | `NEXT_PUBLIC_APP_ENV` | `production` | Environment name |

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Post-Deployment

1. **Set up Custom Domain** (Optional)
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Configure Production Settings**
   - Review Analytics settings
   - Set up Error Tracking (optional)
   - Configure Edge Functions if needed

### Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deployment

### Environment-Specific Deployments

You can create different environments:

- **Production**: `main` branch
- **Staging**: `staging` branch (optional)
- **Development**: Preview deployments from PRs

### Monitoring

Access logs and analytics in the Vercel dashboard:
- Real-time logs
- Performance analytics
- Error tracking
- API usage metrics

### Rollback

If you need to rollback:
1. Go to your project in Vercel
2. Navigate to "Deployments"
3. Find the previous working deployment
4. Click the three dots menu
5. Select "Promote to Production"

### Troubleshooting

**Build Fails**
- Check the build logs in Vercel
- Verify all environment variables are set
- Run `npm run build` locally to test

**API Not Working**
- Verify `IV_API_KEY` is correct
- Check `IV_API_BASE_URL` is accessible from Vercel servers
- Review API proxy logs

**Type Errors**
- Run `npm run type-check` locally
- Fix any TypeScript errors before deploying

## Alternative Deployment Options

### Deploy to Other Platforms

The project can also be deployed to:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Each platform will require similar environment variable configuration.

### Docker Deployment

A Dockerfile can be created for containerized deployment if needed.
