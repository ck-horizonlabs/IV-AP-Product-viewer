'use client';

import { useState, useRef } from 'react';
import { ExternalLink, MessageSquare } from 'lucide-react';
import type { Product } from '@/types/products';
import { ValidationField } from './ValidationField';

interface ProductDetailsProps {
  product: Product | undefined;
  validationResults: Record<string, { status: string; comment: string }>;
  onValidate: (field: string, status: string, comment: string) => void;
}

export function ProductDetails({ product, validationResults, onValidate }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Count sections for badge
  const detailsSectionCount = 9;

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
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              activeTab === 'details' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Details
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {detailsSectionCount} sections
            </span>
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

      <div className="flex-1 overflow-y-auto p-6" ref={contentRef}>
        {activeTab === 'details' && (
          <div>
            {/* Content Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">Content Summary</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-blue-600">{product.length || 0}</div>
                  <div className="text-xs text-gray-600">Days</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-blue-600">{product.country ? 1 : 0}</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-blue-600">{product.lead_in_price ? 1 : 0}</div>
                  <div className="text-xs text-gray-600">Prices</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-blue-600">{product.status ? 1 : 0}</div>
                  <div className="text-xs text-gray-600">Status</div>
                </div>
              </div>
            </div>

            {/* Basic Product Information */}
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
                label="Product Code"
                value={product.product_code || 'N/A'}
                field="product_code"
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

            {/* Description */}
            {product.feature_description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                  Description
                </h3>
                <ValidationField
                  label="Feature Description"
                  value={product.feature_description}
                  field="feature_description"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              </div>
            )}

            {/* Tour Details */}
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
              {product.group_size && (
                <ValidationField
                  label="Group Size"
                  value={product.group_size}
                  field="group_size"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              )}
              {product.flight_type && (
                <ValidationField
                  label="Flight Type"
                  value={product.flight_type}
                  field="flight_type"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              )}
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                Pricing
              </h3>
              <ValidationField
                label="Lead In Price"
                value={product.lead_in_price ? `$${product.lead_in_price} ${product.currency_code || ''}` : 'N/A'}
                field="lead_in_price"
                validationResults={validationResults}
                onValidate={onValidate}
              />
              {product.regular_price && (
                <ValidationField
                  label="Regular Price"
                  value={`$${product.regular_price} ${product.currency_code || ''}`}
                  field="regular_price"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              )}
              {product.sales_price && product.sales_price !== '0.00' && (
                <ValidationField
                  label="Sales Price"
                  value={`$${product.sales_price} ${product.currency_code || ''}`}
                  field="sales_price"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              )}
              <ValidationField
                label="Currency Code"
                value={product.currency_code || 'N/A'}
                field="currency_code"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>

            {/* Destinations */}
            {product.tour_places && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                  Destinations
                </h3>
                <ValidationField
                  label="Tour Places"
                  value={product.tour_places}
                  field="tour_places"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              </div>
            )}

            {/* URLs & Media */}
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
              {product.cdn_link && (
                <ValidationField
                  label="CDN Link"
                  value={product.cdn_link}
                  field="cdn_link"
                  validationResults={validationResults}
                  onValidate={onValidate}
                />
              )}
            </div>

            {/* Dates */}
            {(product.departure_date_range || product.created_at) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
                  Dates
                </h3>
                {product.departure_date_range && (
                  <ValidationField
                    label="Departure Date Range"
                    value={product.departure_date_range}
                    field="departure_date_range"
                    validationResults={validationResults}
                    onValidate={onValidate}
                  />
                )}
                {product.created_at && (
                  <ValidationField
                    label="Created At"
                    value={product.created_at}
                    field="created_at"
                    validationResults={validationResults}
                    onValidate={onValidate}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{JSON.stringify(product, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
