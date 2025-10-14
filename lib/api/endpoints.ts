// API Endpoints
// Update these with actual endpoints once API documentation is available

export const endpoints = {
  // Product endpoints
  products: {
    list: '/products',
    detail: (id: string | number) => `/products/${id}`,
    search: '/products/search',
    categories: '/products/categories',
  },

  // Add more endpoints as discovered from the API documentation
  // Example:
  // inventory: {
  //   list: '/inventory',
  //   detail: (id: string | number) => `/inventory/${id}`,
  // },
} as const;

export type EndpointPath = string;
