'use client';

import { use } from 'react';
import Link from 'next/link';
import { useProduct } from '@/lib/api/hooks';
import { JsonViewer } from '@/components/ui/JsonViewer';
import { formatCurrency, formatDateTime } from '@/lib/utils/formatters';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Products
        </Link>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            Error Loading Product
          </h2>
          <p className="text-red-700 dark:text-red-300">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-4">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Products
        </Link>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <p className="text-yellow-800 dark:text-yellow-200">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← Back to Products
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              {product.category && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Category: {product.category}
                </p>
              )}
              {product.store && (
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                  Store: {product.store.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          {product.status && (
            <span
              className={`px-3 py-1 text-sm rounded ${
                product.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {product.status}
            </span>
          )}
        </div>

        {product.description && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
        )}

        {product.price && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Price
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price, product.currency)}
            </p>
          </div>
        )}

        {product.inventory && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Inventory
            </h2>
            <div className="space-y-1">
              <p className="text-gray-700 dark:text-gray-300">
                Quantity: {product.inventory.quantity}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Available: {product.inventory.available ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        )}

        {(product.createdAt || product.updatedAt) && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              {product.createdAt && (
                <div>
                  <span className="font-medium">Created:</span>{' '}
                  {formatDateTime(product.createdAt)}
                </div>
              )}
              {product.updatedAt && (
                <div>
                  <span className="font-medium">Updated:</span>{' '}
                  {formatDateTime(product.updatedAt)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <JsonViewer data={product} title="Raw Product Data" />
    </div>
  );
}
