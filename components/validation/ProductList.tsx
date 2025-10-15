'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
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
  const [storeFilter, setStoreFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Update filters whenever filter state changes
  useEffect(() => {
    const filters: ProductFilters = {
      page: currentPage,
    };
    if (searchQuery) filters.search = searchQuery;
    if (storeFilter) filters.store = storeFilter;
    if (statusFilter) filters.status = statusFilter;

    onFilterChange(filters);
  }, [searchQuery, storeFilter, statusFilter, currentPage, onFilterChange]);

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get distinct stores and statuses from current products
  const availableStores = Array.from(new Set(products.map(p => p.store).filter(Boolean))) as string[];
  const availableStatuses = Array.from(new Set(products.map(p => p.status).filter(Boolean))) as string[];

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const hasMorePages = filteredProducts.length >= 10; // Assuming 10 items per page

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Product Validation</h1>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Store Filter */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Store</label>
          <select
            value={storeFilter}
            onChange={(e) => {
              setStoreFilter(e.target.value);
              setCurrentPage(1); // Reset to page 1 when filter changes
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Stores</option>
            {availableStores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset to page 1 when filter changes
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {availableStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-500">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} • Page {currentPage}
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
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {product.lead_in_price && (
                    <span className="text-xs font-semibold text-green-600">
                      ${product.lead_in_price}
                    </span>
                  )}
                  {product.length && (
                    <span className="text-xs text-gray-500">{product.length} days</span>
                  )}
                  {product.status && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      product.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                      product.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                      product.status === 'Private' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status}
                    </span>
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

      {/* Pagination Controls */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!hasMorePages || isLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
