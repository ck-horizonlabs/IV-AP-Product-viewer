import { useQuery, useMutation, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { endpoints } from './endpoints';
import type { Product, ProductDetails, ProductFilters, Departure, Itinerary, MediaAsset } from '@/types/products';
import type { PaginatedResponse } from '@/types/api';

// Query keys
export const queryKeys = {
  products: ['products'] as const,
  productsList: (filters?: ProductFilters) => [...queryKeys.products, 'list', filters] as const,
  productDetail: (id: string | number) => [...queryKeys.products, 'detail', id] as const,
  departures: ['departures'] as const,
  departuresList: (productId?: number, filters?: ProductFilters) => [...queryKeys.departures, 'list', productId, filters] as const,
  itineraries: ['itineraries'] as const,
  itinerariesList: (productId?: number, filters?: ProductFilters) => [...queryKeys.itineraries, 'list', productId, filters] as const,
  mediaAssets: ['mediaAssets'] as const,
  mediaAssetsList: (productId?: number, filters?: ProductFilters) => [...queryKeys.mediaAssets, 'list', productId, filters] as const,
};

// Products hooks
export function useProducts(
  filters?: ProductFilters,
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.productsList(filters),
    queryFn: async () => {
      const response = await apiClient.get<Product[]>(
        endpoints.products.list,
        { params: filters as Record<string, string | number | boolean> }
      );
      // API returns array directly, not wrapped in pagination object
      return response.data;
    },
    ...options,
  });
}

export function useProduct(
  id: string | number,
  options?: Omit<UseQueryOptions<Product | undefined>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.productDetail(id),
    queryFn: async () => {
      // API doesn't have individual product endpoint, fetch all and filter
      const response = await apiClient.get<Product[]>(endpoints.products.list);
      const product = response.data.find(p => p.product_id === Number(id));
      return product;
    },
    enabled: !!id,
    ...options,
  });
}

// Generic API hook for testing any endpoint
export function useApiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: unknown
) {
  return useMutation({
    mutationFn: async () => {
      let response;
      switch (method) {
        case 'POST':
          response = await apiClient.post<T>(endpoint, body);
          break;
        case 'PUT':
          response = await apiClient.put<T>(endpoint, body);
          break;
        case 'DELETE':
          response = await apiClient.delete<T>(endpoint);
          break;
        case 'PATCH':
          response = await apiClient.patch<T>(endpoint, body);
          break;
        default:
          response = await apiClient.get<T>(endpoint);
      }
      return response.data;
    },
  });
}

// Departures hooks
export function useDepartures(
  productId?: number,
  filters?: ProductFilters,
  options?: Omit<UseQueryOptions<Departure[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.departuresList(productId, filters),
    queryFn: async () => {
      const params = { product_id: productId, ...filters };
      const response = await apiClient.get<Departure[]>(
        endpoints.departures.list,
        { params: params as Record<string, string | number | boolean> }
      );
      return response.data;
    },
    enabled: !!productId,
    ...options,
  });
}

// Itineraries hooks
export function useItineraries(
  productId?: number,
  filters?: ProductFilters,
  options?: Omit<UseQueryOptions<Itinerary[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.itinerariesList(productId, filters),
    queryFn: async () => {
      const params = { product_id: productId, ...filters };
      const response = await apiClient.get<Itinerary[]>(
        endpoints.itineraries.list,
        { params: params as Record<string, string | number | boolean> }
      );
      return response.data;
    },
    enabled: !!productId,
    ...options,
  });
}

// Media Assets hooks
export function useMediaAssets(
  productId?: number,
  filters?: ProductFilters,
  options?: Omit<UseQueryOptions<MediaAsset[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.mediaAssetsList(productId, filters),
    queryFn: async () => {
      const params = { product_id: productId, ...filters };
      const response = await apiClient.get<MediaAsset[]>(
        endpoints.mediaAssets.list,
        { params: params as Record<string, string | number | boolean> }
      );
      return response.data;
    },
    enabled: !!productId,
    ...options,
  });
}
