export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  category?: string;
  status?: string;
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
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  perPage?: number;
}
