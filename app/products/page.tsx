'use client';

import { useState } from 'react';
import { ProductList } from '@/components/products/ProductList';
import { ProductFilter } from '@/components/products/ProductFilter';
import { useProducts } from '@/lib/api/hooks';
import type { ProductFilters } from '@/types/products';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data, isLoading, error } = useProducts(filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        {data && (
          <p className="text-gray-600 dark:text-gray-400">
            {data.length} product{data.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      <ProductFilter onFilterChange={setFilters} />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error loading products: {error.message}
          </p>
        </div>
      )}

      <ProductList products={data || []} isLoading={isLoading} />
    </div>
  );
}
