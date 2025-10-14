'use client';

import { useState, useRef } from 'react';
import { ExternalLink, MessageSquare, Check, X } from 'lucide-react';
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

  // Count sections for badges
  const detailsSectionCount = 9;
  const imageCount = product.banner ? 1 : 0; // We only have banner image in current API
  const pricingSectionCount = 6;

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
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              activeTab === 'images' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Images
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {imageCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              activeTab === 'pricing' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pricing
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {pricingSectionCount} sections
            </span>
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              activeTab === 'itinerary' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Itinerary
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {product.length || 0} days
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
        {/* DETAILS TAB */}
        {activeTab === 'details' && (
          <div>
            {/* Content Summary Card - BLUE */}
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
                  <div className="text-2xl font-bold text-blue-600">{product.tour_places ? product.tour_places.split(',').length : 0}</div>
                  <div className="text-xs text-gray-600">Destinations</div>
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
              <ValidationField label="Product ID" value={product.product_id} field="product_id" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Product Code" value={product.product_code || 'N/A'} field="product_code" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Product Name" value={product.product_name} field="product_name" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Status" value={product.status || 'N/A'} field="status" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Store" value={product.store || 'N/A'} field="store" validationResults={validationResults} onValidate={onValidate} />
            </div>

            {/* Description */}
            {product.feature_description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Description</h3>
                <ValidationField label="Feature Description" value={product.feature_description} field="feature_description" validationResults={validationResults} onValidate={onValidate} />
              </div>
            )}

            {/* Tour Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Tour Details</h3>
              <ValidationField label="Country" value={product.country || 'N/A'} field="country" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Length (days)" value={product.length || 'N/A'} field="length" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Pace" value={product.pace || 'N/A'} field="pace" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Escorted Type" value={product.escorted_type || 'N/A'} field="escorted_type" validationResults={validationResults} onValidate={onValidate} />
              {product.group_size && <ValidationField label="Group Size" value={product.group_size} field="group_size" validationResults={validationResults} onValidate={onValidate} />}
              {product.flight_type && <ValidationField label="Flight Type" value={product.flight_type} field="flight_type" validationResults={validationResults} onValidate={onValidate} />}
            </div>

            {/* Destinations */}
            {product.tour_places && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Destinations</h3>
                <ValidationField label="Tour Places" value={product.tour_places} field="tour_places" validationResults={validationResults} onValidate={onValidate} />
              </div>
            )}

            {/* URLs & Media */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">URLs & Media</h3>
              <ValidationField label="Product URL" value={product.product_url || 'N/A'} field="product_url" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Banner Image" value={product.banner || 'N/A'} field="banner" validationResults={validationResults} onValidate={onValidate} />
              {product.cdn_link && <ValidationField label="CDN Link" value={product.cdn_link} field="cdn_link" validationResults={validationResults} onValidate={onValidate} />}
            </div>

            {/* Dates */}
            {(product.departure_date_range || product.created_at) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Dates</h3>
                {product.departure_date_range && <ValidationField label="Departure Date Range" value={product.departure_date_range} field="departure_date_range" validationResults={validationResults} onValidate={onValidate} />}
                {product.created_at && <ValidationField label="Created At" value={product.created_at} field="created_at" validationResults={validationResults} onValidate={onValidate} />}
              </div>
            )}
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === 'images' && (
          <div>
            {/* Images Overview Card - ORANGE */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-orange-900 mb-3">Images Overview</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-orange-600">{imageCount}</div>
                  <div className="text-xs text-gray-600">Total Images</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-orange-600">{product.banner ? 1 : 0}</div>
                  <div className="text-xs text-gray-600">Banner Images</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-xs text-gray-600">Gallery Images</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-orange-600">{product.banner ? 1 : 0}</div>
                  <div className="text-xs text-gray-600">With Alt Text</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Product Images</h3>
              {product.banner ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative group">
                    <img
                      src={product.banner}
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="16"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Banner Image</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onValidate('banner_image', 'pass', '')}
                          className={`p-1.5 rounded ${validationResults['banner_image']?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onValidate('banner_image', 'fail', '')}
                          className={`p-1.5 rounded ${validationResults['banner_image']?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2 font-mono truncate">{product.banner}</div>
                    {validationResults['banner_image'] && (
                      <textarea
                        placeholder="Add image validation notes..."
                        value={validationResults['banner_image']?.comment || ''}
                        onChange={(e) => onValidate('banner_image', validationResults['banner_image'].status, e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No images available for this product</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Image Metadata</h3>
              <ValidationField label="Total Images" value={imageCount} field="image_count" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Banner URL" value={product.banner || 'N/A'} field="banner_url" validationResults={validationResults} onValidate={onValidate} />
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === 'pricing' && (
          <div>
            {/* Pricing Overview Card - GREEN */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-green-900 mb-3">Pricing Overview</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-green-600">${product.lead_in_price || 0}</div>
                  <div className="text-xs text-gray-600">Base Price</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-green-600">{product.currency_code || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Currency</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-green-600">{product.sales_price && product.sales_price !== '0.00' ? 'Yes' : 'No'}</div>
                  <div className="text-xs text-gray-600">On Sale</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-green-600">{product.status || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Status</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Base Pricing</h3>
              <ValidationField label="Lead In Price" value={product.lead_in_price ? `$${product.lead_in_price} ${product.currency_code || ''}` : 'N/A'} field="lead_in_price" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Regular Price" value={product.regular_price ? `$${product.regular_price} ${product.currency_code || ''}` : 'N/A'} field="regular_price" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Currency Code" value={product.currency_code || 'N/A'} field="currency_code" validationResults={validationResults} onValidate={onValidate} />
            </div>

            {product.sales_price && product.sales_price !== '0.00' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Sale Pricing</h3>
                <ValidationField label="Sales Price" value={`$${product.sales_price} ${product.currency_code || ''}`} field="sales_price" validationResults={validationResults} onValidate={onValidate} />
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">Availability</h3>
              {product.departure_date_range && <ValidationField label="Departure Date Range" value={product.departure_date_range} field="pricing_departure_dates" validationResults={validationResults} onValidate={onValidate} />}
              <ValidationField label="Product Status" value={product.status || 'N/A'} field="pricing_status" validationResults={validationResults} onValidate={onValidate} />
            </div>
          </div>
        )}

        {/* ITINERARY TAB */}
        {activeTab === 'itinerary' && (
          <div>
            {/* Itinerary Overview Card - PURPLE */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-purple-900 mb-3">Itinerary Overview</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-purple-600">{product.length || 0}</div>
                  <div className="text-xs text-gray-600">Days</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-purple-600">{product.tour_places ? product.tour_places.split(',').length : 0}</div>
                  <div className="text-xs text-gray-600">Destinations</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-purple-600">{product.pace || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Pace</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-2xl font-bold text-purple-600">{product.escorted_type || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Type</div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">Tour Information</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Tour Duration</h4>
                    <p className="text-sm text-blue-600 font-medium">{product.length || 'N/A'} days</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onValidate('tour_duration', 'pass', '')}
                      className={`p-1.5 rounded ${validationResults['tour_duration']?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onValidate('tour_duration', 'fail', '')}
                      className={`p-1.5 rounded ${validationResults['tour_duration']?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {validationResults['tour_duration'] && (
                  <textarea
                    placeholder="Add validation notes..."
                    value={validationResults['tour_duration']?.comment || ''}
                    onChange={(e) => onValidate('tour_duration', validationResults['tour_duration'].status, e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                )}
              </div>

              {product.tour_places && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">Destinations</h4>
                      <p className="text-sm text-gray-700 mt-1">{product.tour_places}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onValidate('tour_destinations', 'pass', '')}
                        className={`p-1.5 rounded ${validationResults['tour_destinations']?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onValidate('tour_destinations', 'fail', '')}
                        className={`p-1.5 rounded ${validationResults['tour_destinations']?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {validationResults['tour_destinations'] && (
                    <textarea
                      placeholder="Add validation notes..."
                      value={validationResults['tour_destinations']?.comment || ''}
                      onChange={(e) => onValidate('tour_destinations', validationResults['tour_destinations'].status, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  )}
                </div>
              )}

              {product.pace && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">Tour Pace</h4>
                      <p className="text-sm text-gray-700 mt-1">{product.pace}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onValidate('tour_pace', 'pass', '')}
                        className={`p-1.5 rounded ${validationResults['tour_pace']?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onValidate('tour_pace', 'fail', '')}
                        className={`p-1.5 rounded ${validationResults['tour_pace']?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {validationResults['tour_pace'] && (
                    <textarea
                      placeholder="Add validation notes..."
                      value={validationResults['tour_pace']?.comment || ''}
                      onChange={(e) => onValidate('tour_pace', validationResults['tour_pace'].status, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  )}
                </div>
              )}
            </div>

            {!product.length && !product.tour_places && (
              <p className="text-sm text-gray-500 text-center py-8">No itinerary information available for this product</p>
            )}
          </div>
        )}

        {/* RAW JSON TAB */}
        {activeTab === 'raw' && (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{JSON.stringify(product, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
