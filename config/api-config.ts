export const apiConfig = {
  baseUrl: process.env.IV_API_BASE_URL || '',
  apiKey: process.env.IV_API_KEY || '',
  timeout: parseInt(process.env.IV_API_TIMEOUT || '30000', 10),
  enableLogging: process.env.ENABLE_API_LOGGING === 'true',
} as const;

export const isConfigValid = () => {
  return !!(apiConfig.baseUrl && apiConfig.apiKey);
};
