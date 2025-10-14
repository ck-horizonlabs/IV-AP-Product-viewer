// API Endpoints

export const endpoints = {
  // Product endpoints
  products: {
    list: '/products',
    detail: (id: string | number) => `/products/${id}`,
    search: '/products/search',
    categories: '/products/categories',
  },

  // Departures/Pricing endpoints
  departures: {
    list: '/departures',
  },

  // Itinerary endpoints
  itineraries: {
    list: '/itineraries',
  },

  // Media/Images endpoints
  mediaAssets: {
    list: '/media-assets',
  },
} as const;

export type EndpointPath = string;
