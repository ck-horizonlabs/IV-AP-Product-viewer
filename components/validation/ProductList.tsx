'use client';

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import type { Product, ProductFilters } from '@/types/products';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  selectedProductId: number | null;
  onSelectProduct: (id: number) => void;
  onFilterChange: (filters: ProductFilters) => void;
}

export function ProductList({
  products,
  isLoading,
  error,
  selectedProductId,
  onSelectProduct,
  onFilterChange,
}: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Product Validation</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="p-4 text-sm text-gray-500">Loading products...</div>
        )}

        {error && (
          <div className="p-4 text-sm text-red-600">Error loading products</div>
        )}

        {!isLoading && !error && filteredProducts.map(product => (
          <div
            key={product.product_id}
            onClick={() => onSelectProduct(product.product_id)}
            className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
              selectedProductId === product.product_id
                ? 'bg-blue-50 border-l-4 border-l-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {product.product_name}
                </h3>
                <p className="text-xs text-gray-500">{product.country}</p>
                <div className="flex items-center gap-3 mt-2">
                  {product.lead_in_price && (
                    <span className="text-xs font-semibold text-green-600">
                      ${product.lead_in_price}
                    </span>
                  )}
                  {product.length && (
                    <span className="text-xs text-gray-500">{product.length} days</span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
            </div>
          </div>
        ))}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
