'use client';

import { useState, useRef } from 'react';
import { ExternalLink, MessageSquare, Check, X } from 'lucide-react';
import type { Product } from '@/types/products';
import { ValidationField } from './ValidationField';
import { useMediaAssets, useDepartures, useItineraries } from '@/lib/api/hooks';

interface ProductDetailsProps {
  product: Product | undefined;
  validationResults: Record<string, { status: string; comment: string }>;
  onValidate: (field: string, status: string, comment: string) => void;
}

export function ProductDetails({ product, validationResults, onValidate }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch data for each tab
  const { data: mediaAssets, isLoading: isLoadingMedia } = useMediaAssets(product?.product_id);
  const { data: departures, isLoading: isLoadingDepartures } = useDepartures(product?.product_id);
  const { data: itineraries, isLoading: isLoadingItineraries } = useItineraries(product?.product_id);

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
  const imageCount = mediaAssets?.length || 0;
  const pricingSectionCount = departures?.length || 0;

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
              {itineraries?.length || product.length || 0} days
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
              {isLoadingMedia ? (
                <div className="text-center py-4 text-gray-500">Loading images...</div>
              ) : (
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-orange-600">{mediaAssets?.length || 0}</div>
                    <div className="text-xs text-gray-600">Total Images</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-orange-600">{mediaAssets?.filter(m => m.is_primary).length || 0}</div>
                    <div className="text-xs text-gray-600">Primary Images</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-orange-600">{mediaAssets?.filter(m => !m.is_primary).length || 0}</div>
                    <div className="text-xs text-gray-600">Gallery Images</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-orange-600">{mediaAssets?.filter(m => m.alt_text).length || 0}</div>
                    <div className="text-xs text-gray-600">With Alt Text</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Product Images</h3>
              {isLoadingMedia ? (
                <div className="text-center py-8 text-gray-500">Loading images...</div>
              ) : mediaAssets && mediaAssets.length > 0 ? (
                <div className="space-y-4">
                  {mediaAssets.map((media, index) => (
                    <div key={media.media_id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 relative group">
                        <img
                          src={media.url}
                          alt={media.alt_text || media.title || product.product_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="16"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        {media.is_primary && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                            Primary
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">
                            {media.title || `Image ${index + 1}`} • {media.media_type}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => onValidate(`media_${media.media_id}`, 'pass', '')}
                              className={`p-1.5 rounded ${validationResults[`media_${media.media_id}`]?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onValidate(`media_${media.media_id}`, 'fail', '')}
                              className={`p-1.5 rounded ${validationResults[`media_${media.media_id}`]?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        {media.caption && (
                          <div className="text-xs text-gray-600 mb-2">{media.caption}</div>
                        )}
                        <div className="text-xs text-gray-500 mb-2 font-mono truncate" title={media.url}>
                          {media.url}
                        </div>
                        {media.alt_text && (
                          <div className="text-xs text-gray-600 mb-2">
                            <span className="font-semibold">Alt text:</span> {media.alt_text}
                          </div>
                        )}
                        {validationResults[`media_${media.media_id}`] && (
                          <textarea
                            placeholder="Add image validation notes..."
                            value={validationResults[`media_${media.media_id}`]?.comment || ''}
                            onChange={(e) => onValidate(`media_${media.media_id}`, validationResults[`media_${media.media_id}`].status, e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={2}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No images available for this product</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Image Metadata</h3>
              <ValidationField label="Total Images" value={imageCount} field="image_count" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Primary Images" value={mediaAssets?.filter(m => m.is_primary).length || 0} field="primary_image_count" validationResults={validationResults} onValidate={onValidate} />
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === 'pricing' && (
          <div>
            {/* Pricing Overview Card - GREEN */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-green-900 mb-3">Pricing Overview</h3>
              {isLoadingDepartures ? (
                <div className="text-center py-4 text-gray-500">Loading pricing...</div>
              ) : (
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-green-600">{departures?.length || 0}</div>
                    <div className="text-xs text-gray-600">Total Departures</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-green-600">{departures?.filter(d => d.status === 'active' || d.status === 'available').length || 0}</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-green-600">
                      {departures && departures.length > 0 ? `$${Math.min(...departures.map(d => parseFloat(d.price) || 0))}` : '$0'}
                    </div>
                    <div className="text-xs text-gray-600">Lowest Price</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-green-600">{product.currency_code || departures?.[0]?.currency_code || 'N/A'}</div>
                    <div className="text-xs text-gray-600">Currency</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Departures & Pricing</h3>
              {isLoadingDepartures ? (
                <div className="text-center py-8 text-gray-500">Loading departures...</div>
              ) : departures && departures.length > 0 ? (
                <div className="space-y-3">
                  {departures.map((departure) => (
                    <div key={departure.departure_id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {new Date(departure.departure_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            {departure.return_date && (
                              <span className="text-sm text-gray-600">
                                → {new Date(departure.return_date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              departure.status === 'active' || departure.status === 'available'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {departure.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-bold text-green-600">
                              {departure.currency_code || product.currency_code} ${departure.price}
                            </span>
                            {departure.available_seats && (
                              <span className="text-gray-600">
                                {departure.available_seats} seats available
                              </span>
                            )}
                            {departure.store && (
                              <span className="text-gray-500 text-xs">
                                Store: {departure.store}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button
                            onClick={() => onValidate(`departure_${departure.departure_id}`, 'pass', '')}
                            className={`p-1.5 rounded ${validationResults[`departure_${departure.departure_id}`]?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onValidate(`departure_${departure.departure_id}`, 'fail', '')}
                            className={`p-1.5 rounded ${validationResults[`departure_${departure.departure_id}`]?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {validationResults[`departure_${departure.departure_id}`] && (
                        <textarea
                          placeholder="Add departure validation notes..."
                          value={validationResults[`departure_${departure.departure_id}`]?.comment || ''}
                          onChange={(e) => onValidate(`departure_${departure.departure_id}`, validationResults[`departure_${departure.departure_id}`].status, e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={2}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No departures available for this product</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Pricing Summary</h3>
              <ValidationField label="Total Departures" value={departures?.length || 0} field="total_departures" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Available Departures" value={departures?.filter(d => d.status === 'active' || d.status === 'available').length || 0} field="available_departures" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField
                label="Price Range"
                value={departures && departures.length > 0
                  ? `$${Math.min(...departures.map(d => parseFloat(d.price) || 0))} - $${Math.max(...departures.map(d => parseFloat(d.price) || 0))}`
                  : 'N/A'
                }
                field="price_range"
                validationResults={validationResults}
                onValidate={onValidate}
              />
            </div>
          </div>
        )}

        {/* ITINERARY TAB */}
        {activeTab === 'itinerary' && (
          <div>
            {/* Itinerary Overview Card - PURPLE */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-purple-900 mb-3">Itinerary Overview</h3>
              {isLoadingItineraries ? (
                <div className="text-center py-4 text-gray-500">Loading itinerary...</div>
              ) : (
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-purple-600">{itineraries?.length || product.length || 0}</div>
                    <div className="text-xs text-gray-600">Days</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-purple-600">
                      {itineraries ? new Set(itineraries.map(i => i.location).filter(Boolean)).size : (product.tour_places ? product.tour_places.split(',').length : 0)}
                    </div>
                    <div className="text-xs text-gray-600">Locations</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-purple-600">
                      {itineraries?.filter(i => i.meals).length || 0}
                    </div>
                    <div className="text-xs text-gray-600">Days w/ Meals</div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-2xl font-bold text-purple-600">
                      {itineraries?.filter(i => i.accommodation).length || 0}
                    </div>
                    <div className="text-xs text-gray-600">Nights Included</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Day-by-Day Itinerary</h3>
              {isLoadingItineraries ? (
                <div className="text-center py-8 text-gray-500">Loading itinerary...</div>
              ) : itineraries && itineraries.length > 0 ? (
                <div className="space-y-4">
                  {itineraries.sort((a, b) => a.day_number - b.day_number).map((day) => (
                    <div key={day.itinerary_id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <div className="bg-purple-50 px-4 py-2 border-b border-purple-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-purple-900">Day {day.day_number}</span>
                            {day.location && (
                              <span className="text-sm text-purple-700 ml-2">• {day.location}</span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => onValidate(`itinerary_day_${day.itinerary_id}`, 'pass', '')}
                              className={`p-1.5 rounded ${validationResults[`itinerary_day_${day.itinerary_id}`]?.status === 'pass' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-100'}`}
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onValidate(`itinerary_day_${day.itinerary_id}`, 'fail', '')}
                              className={`p-1.5 rounded ${validationResults[`itinerary_day_${day.itinerary_id}`]?.status === 'fail' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        {day.title && (
                          <h4 className="text-base font-semibold text-gray-900 mb-2">{day.title}</h4>
                        )}
                        {day.description && (
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{day.description}</p>
                        )}
                        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                          {day.meals && (
                            <div>
                              <div className="text-xs font-semibold text-gray-600 mb-1">Meals</div>
                              <div className="text-sm text-gray-800">{day.meals}</div>
                            </div>
                          )}
                          {day.accommodation && (
                            <div>
                              <div className="text-xs font-semibold text-gray-600 mb-1">Accommodation</div>
                              <div className="text-sm text-gray-800">{day.accommodation}</div>
                            </div>
                          )}
                          {day.activities && day.activities.length > 0 && (
                            <div>
                              <div className="text-xs font-semibold text-gray-600 mb-1">Activities</div>
                              <div className="text-sm text-gray-800">{day.activities.join(', ')}</div>
                            </div>
                          )}
                        </div>
                        {validationResults[`itinerary_day_${day.itinerary_id}`] && (
                          <textarea
                            placeholder="Add day validation notes..."
                            value={validationResults[`itinerary_day_${day.itinerary_id}`]?.comment || ''}
                            onChange={(e) => onValidate(`itinerary_day_${day.itinerary_id}`, validationResults[`itinerary_day_${day.itinerary_id}`].status, e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                            rows={2}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No itinerary information available for this product</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Itinerary Summary</h3>
              <ValidationField label="Total Days" value={itineraries?.length || product.length || 0} field="itinerary_total_days" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Locations Covered" value={itineraries ? new Set(itineraries.map(i => i.location).filter(Boolean)).size : 0} field="itinerary_locations" validationResults={validationResults} onValidate={onValidate} />
              <ValidationField label="Tour Pace" value={product.pace || 'N/A'} field="tour_pace" validationResults={validationResults} onValidate={onValidate} />
            </div>
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
