'use client';

import { use } from 'react';
import Link from 'next/link';
import { useProduct } from '@/lib/api/hooks';
import { JsonViewer } from '@/components/ui/JsonViewer';
import { formatCurrency } from '@/lib/utils/formatters';

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

  const price = product.lead_in_price ? parseFloat(product.lead_in_price) : null;
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const salesPrice = product.sales_price ? parseFloat(product.sales_price) : null;
  const currency = product.currency_code || 'AUD';

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {product.product_name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {product.country && (
                <span className="text-gray-600 dark:text-gray-400">
                  📍 {product.country}
                </span>
              )}
              {product.length && (
                <span className="text-gray-600 dark:text-gray-400">
                  📅 {product.length} days
                </span>
              )}
              {product.store && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                  {product.store}
                </span>
              )}
              {product.pace && (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                  {product.pace}
                </span>
              )}
            </div>
          </div>
          {product.status && (
            <span
              className={`px-3 py-1 text-sm rounded whitespace-nowrap ${
                product.status.toLowerCase() === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : product.status.toLowerCase() === 'closed'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {product.status}
            </span>
          )}
        </div>

        {product.feature_description && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h2>
            <div
              className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: product.feature_description }}
            />
          </div>
        )}

        {(price || regularPrice || salesPrice) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pricing
            </h2>
            <div className="space-y-2">
              {price && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">From: </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(price, currency)}
                  </span>
                </div>
              )}
              {regularPrice && regularPrice > 0 && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Regular Price: </span>
                  <span className="text-gray-600 dark:text-gray-400 line-through">
                    {formatCurrency(regularPrice, currency)}
                  </span>
                </div>
              )}
              {salesPrice && salesPrice > 0 && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sale Price: </span>
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(salesPrice, currency)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {product.tour_places && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Places Visited
            </h2>
            <div className="flex flex-wrap gap-2">
              {JSON.parse(product.tour_places).map((place: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm"
                >
                  {place}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.escorted_type && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Tour Type</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.escorted_type}</p>
            </div>
          )}
          {product.group_size && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Group Size</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.group_size}</p>
            </div>
          )}
          {product.flight_type && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Flights</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.flight_type}</p>
            </div>
          )}
          {product.departure_date_range && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Departures</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.departure_date_range}</p>
            </div>
          )}
        </div>

        {product.product_url && (
          <div>
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View on Inspiring Vacations →
            </a>
          </div>
        )}

        {product.created_at && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Created: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <JsonViewer data={product} title="Raw Product Data" />
    </div>
  );
}
