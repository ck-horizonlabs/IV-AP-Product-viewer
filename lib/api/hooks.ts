import { useQuery, useMutation, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { endpoints } from './endpoints';
import type { Product, ProductDetails, ProductFilters } from '@/types/products';
import type { PaginatedResponse } from '@/types/api';

// Query keys
export const queryKeys = {
  products: ['products'] as const,
  productsList: (filters?: ProductFilters) => [...queryKeys.products, 'list', filters] as const,
  productDetail: (id: string | number) => [...queryKeys.products, 'detail', id] as const,
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
  options?: Omit<UseQueryOptions<ProductDetails>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.productDetail(id),
    queryFn: async () => {
      const response = await apiClient.get<ProductDetails>(endpoints.products.detail(id));
      return response.data;
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
