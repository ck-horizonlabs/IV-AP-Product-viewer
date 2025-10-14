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
  product_name: string;
  store: string;
  product_status: string;
  external_id: number;
  cms_external_id: string;
  departure_date: string;
  end_date?: string;
  seats_available?: number;
  seats_total?: number;
  price: string;
  twin_price?: string;
  single_supplement_cost?: string;
  status: string;
  currency?: string;
  updated_at?: string;
}

// Itinerary data
export interface Itinerary {
  product_id: number;
  store: string;
  product_status: string;
  day: number;
  name: string;
  destination: string;
  description: string;
  hotel_name?: string;
  star_rating?: string;
  rating?: number;
  website?: string;
  meals?: string | null;
  breakfast_count?: number;
  lunch_count?: number;
  dinner_count?: number;
}

// Media/Image assets
export interface MediaAsset {
  media_asset_id: string;
  product_id: number;
  external_id: number;
  store: string;
  product_status: string;
  directus_files_id: string;
  cms_external_id: number;
  media_type: string;
  cdn_type: string;
  cdn_url: string;
  title?: string;
  width?: number;
  height?: number;
  sort_order?: number | null;
  is_primary?: boolean | null;
  ordinal?: number;
  created_at?: string;
  updated_at?: string | null;
}
