export interface Product {
  // API returns product_id and product_name
  product_id: number;
  product_name: string;
  // Map to common fields
  id?: string | number;
  name?: string;
  description?: string;
  // Pricing
  lead_in_price?: string;
  regular_price?: string;
  sales_price?: string;
  currency_code?: string;
  price?: number;
  currency?: string;
  // Status and location
  status?: string;
  store?: string;
  country?: string;
  // Tour details
  length?: number;
  pace?: string;
  escorted_type?: string;
  tour_places?: string;
  group_size?: string;
  flight_type?: string;
  feature_description?: string;
  // URLs
  product_url?: string;
  cdn_link?: string;
  banner?: string;
  // Dates
  created_at?: string;
  departure_date_range?: string;
  // Other
  product_code?: string;
  product_style?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ProductDetails extends Product {
  images?: string[];
  specifications?: Record<string, unknown>;
  inventory?: {
    quantity: number;
    available: boolean;
  };
  relatedProducts?: string[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: string;
  store?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  perPage?: number;
}

// Departure/Pricing data
export interface Departure {
  departure_id: number;
  product_id: number;
  departure_date: string;
  return_date?: string;
  price: string;
  available_seats?: number;
  status: string;
  store?: string;
  currency_code?: string;
}

// Itinerary data
export interface Itinerary {
  itinerary_id: number;
  product_id: number;
  day_number: number;
  title: string;
  description: string;
  location?: string;
  meals?: string;
  accommodation?: string;
  activities?: string[];
}

// Media/Image assets
export interface MediaAsset {
  media_id: number;
  product_id: number;
  media_type: string; // 'image', 'video', etc.
  url: string;
  title?: string;
  alt_text?: string;
  caption?: string;
  sort_order?: number;
  is_primary?: boolean;
}
