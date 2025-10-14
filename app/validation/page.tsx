'use client';

import { useState } from 'react';
import { useProducts } from '@/lib/api/hooks';
import { ProductList as ValidationProductList } from '@/components/validation/ProductList';
import { ProductDetails } from '@/components/validation/ProductDetails';
import { ValidationSummary } from '@/components/validation/ValidationSummary';
import { ProductFilters } from '@/types/products';

export default function ValidationPage() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [validationResults, setValidationResults] = useState<Record<string, { status: string; comment: string }>>({});

  const { data: products, isLoading, error } = useProducts(filters);

  const selectedProduct = products?.find(p => p.product_id === selectedProductId);

  const handleValidation = (field: string, status: string, comment: string) => {
    setValidationResults(prev => ({
      ...prev,
      [field]: { status, comment }
    }));
  };

  const clearResults = () => {
    setValidationResults({});
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-gray-100 -mx-4 -my-8 sm:-mx-6 lg:-mx-8">
      {/* Left Sidebar - Product List */}
      <ValidationProductList
        products={products || []}
        isLoading={isLoading}
        error={error}
        selectedProductId={selectedProductId}
        onSelectProduct={setSelectedProductId}
        onFilterChange={setFilters}
      />

      {/* Center - Product Details */}
      <ProductDetails
        product={selectedProduct}
        validationResults={validationResults}
        onValidate={handleValidation}
      />

      {/* Right Sidebar - Validation Summary */}
      <ValidationSummary
        validationResults={validationResults}
        onClearResults={clearResults}
      />
    </div>
  );
}
