'use client';

import { useState } from 'react';
import { useProducts } from '@/lib/api/hooks';
import { ProductList as ValidationProductList, ProductDetails, ValidationSummary } from '@/components/validation';
import { useKeyboardShortcuts } from '@/hooks';
import { downloadValidationReport } from '@/utils/exportReport';
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

  const handleExport = () => {
    if (Object.keys(validationResults).length === 0) {
      alert('No validation results to export');
      return;
    }
    downloadValidationReport(
      selectedProduct?.product_id,
      selectedProduct?.product_name,
      validationResults
    );
  };

  // Keyboard shortcuts: Ctrl/Cmd+S to export, Ctrl/Cmd+E to clear
  useKeyboardShortcuts({
    onExport: handleExport,
    onClear: clearResults,
  });

  return (
    <div className="flex h-screen bg-gray-100 ">
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
        onExportReport={handleExport}
      />
    </div>
  );
}
