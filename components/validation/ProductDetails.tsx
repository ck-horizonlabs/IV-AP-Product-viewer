'use client';

import { useState } from 'react';
import { ExternalLink, MessageSquare } from 'lucide-react';
import type { Product } from '@/types/products';
import { ValidationField } from './ValidationField';
import { JsonViewer } from '@/components/ui/JsonViewer';

interface ProductDetailsProps {
  product: Product | undefined;
  validationResults: Record<string, { status: string; comment: string }>;
  onValidate: (field: string, status: string, comment: string) => void;
}

export function ProductDetails({ product, validationResults, onValidate }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center text-gray-400">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-3" />
          <p>Select a product to begin validation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{product.product_name}</h2>
            <p className="text-sm text-gray-500 mt-1">Product ID: {product.product_id}</p>
          </div>
          {product.product_url && (
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              View Website <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'details' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'raw' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'details' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                Basic Product Information
              </h3>
              <ValidationField
                label="Product ID"
                value={product.product_id}
                field="product_id"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Product Name"
                value={product.product_name}
                field="product_name"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Product Code"
                value={product.product_code || 'N/A'}
                field="product_code"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Status"
                value={product.status || 'N/A'}
                field="status"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Store"
                value={product.store || 'N/A'}
                field="store"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                Tour Details
              </h3>
              <ValidationField
                label="Country"
                value={product.country || 'N/A'}
                field="country"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Length (days)"
                value={product.length || 'N/A'}
                field="length"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Pace"
                value={product.pace || 'N/A'}
                field="pace"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Escorted Type"
                value={product.escorted_type || 'N/A'}
                field="escorted_type"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                Pricing
              </h3>
              <ValidationField
                label="Lead In Price"
                value={product.lead_in_price ? `$${product.lead_in_price} ${product.currency_code}` : 'N/A'}
                field="lead_in_price"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Regular Price"
                value={product.regular_price ? `$${product.regular_price} ${product.currency_code}` : 'N/A'}
                field="regular_price"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Sales Price"
                value={product.sales_price && product.sales_price !== '0.00' ? `$${product.sales_price} ${product.currency_code}` : 'N/A'}
                field="sales_price"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>

            {product.tour_places && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                  Tour Places
                </h3>
                <ValidationField
                  label="Destinations"
                  value={product.tour_places}
                  field="tour_places"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                URLs & Media
              </h3>
              <ValidationField
                label="Product URL"
                value={product.product_url || 'N/A'}
                field="product_url"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="Banner Image"
                value={product.banner || 'N/A'}
                field="banner"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              <ValidationField
                label="CDN Link"
                value={product.cdn_link || 'N/A'}
                field="cdn_link"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>
          </div>
        )}

        {activeTab === 'raw' && (
          <JsonViewer data={product} title="Product Data" />
        )}
      </div>
    </div>
  );
}
