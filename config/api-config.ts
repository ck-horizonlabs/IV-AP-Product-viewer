// Client-side API config - uses the API proxy route
export const apiConfig = {
  // Use the API proxy route for client-side requests
  baseUrl: '/api/proxy',
  timeout: 30000,
  enableLogging: process.env.NEXT_PUBLIC_APP_ENV === 'development',
} as const;

// Server-side API config - used by the proxy route
export const serverApiConfig = {
  baseUrl: process.env.IV_API_BASE_URL || '',
  apiKey: process.env.IV_API_KEY || '',
  timeout: parseInt(process.env.IV_API_TIMEOUT || '30000', 10),
  enableLogging: process.env.ENABLE_API_LOGGING === 'true',
} as const;

export const isConfigValid = () => {
  return !!(serverApiConfig.baseUrl && serverApiConfig.apiKey);
};
