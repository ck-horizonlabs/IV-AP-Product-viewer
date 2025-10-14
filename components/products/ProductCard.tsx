import Link from 'next/link';
import type { Product } from '@/types/products';
import { formatCurrency } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition p-4"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          {product.price && (
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price, product.currency)}
            </span>
          )}
          {product.status && (
            <span
              className={`px-2 py-1 text-xs rounded ${
                product.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {product.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {product.category && (
            <span>Category: {product.category}</span>
          )}
          {product.store && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded">
              {product.store.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
