import { useState, useCallback } from 'react';

export interface ValidationResult {
  status: 'pass' | 'fail';
  comment: string;
}

export interface ValidationResults {
  [field: string]: ValidationResult;
}

export interface ValidationSummary {
  total: number;
  passed: number;
  failed: number;
}

export function useValidation() {
  const [validationResults, setValidationResults] = useState<ValidationResults>({});

  const handleValidation = useCallback((field: string, status: 'pass' | 'fail', comment: string) => {
    setValidationResults(prev => ({
      ...prev,
      [field]: { status, comment }
    }));
  }, []);

  const clearValidations = useCallback(() => {
    setValidationResults({});
  }, []);

  const getPassedCount = useCallback(() => {
    return Object.values(validationResults).filter(r => r.status === 'pass').length;
  }, [validationResults]);

  const getFailedCount = useCallback(() => {
    return Object.values(validationResults).filter(r => r.status === 'fail').length;
  }, [validationResults]);

  const getTotalCount = useCallback(() => {
    return Object.keys(validationResults).length;
  }, [validationResults]);

  const getSummary = useCallback((): ValidationSummary => {
    return {
      total: getTotalCount(),
      passed: getPassedCount(),
      failed: getFailedCount(),
    };
  }, [getTotalCount, getPassedCount, getFailedCount]);

  const exportResults = useCallback((productId?: number, productName?: string) => {
    const summary = getSummary();
    const report = {
      timestamp: new Date().toISOString(),
      productId,
      productName,
      summary,
      results: validationResults,
    };

    return report;
  }, [validationResults, getSummary]);

  return {
    validationResults,
    handleValidation,
    clearValidations,
    getPassedCount,
    getFailedCount,
    getTotalCount,
    getSummary,
    exportResults,
  };
}
