'use client';

import { CheckCircle, XCircle } from 'lucide-react';

interface ValidationSummaryProps {
  validationResults: Record<string, { status: string; comment: string }>;
  onClearResults?: () => void;
}

export function ValidationSummary({ validationResults, onClearResults }: ValidationSummaryProps) {
  const passedCount = Object.values(validationResults).filter(r => r.status === 'pass').length;
  const failedCount = Object.values(validationResults).filter(r => r.status === 'fail').length;
  const totalCount = Object.keys(validationResults).length;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Validation Summary</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{passedCount}</div>
            <div className="text-xs text-green-700 mt-1">Passed</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
            <div className="text-xs text-red-700 mt-1">Failed</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-gray-600">{totalCount}</div>
            <div className="text-xs text-gray-700 mt-1">Total</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Validation Notes</h3>
          {Object.entries(validationResults).map(([field, result]) => (
            result.comment && (
              <div key={field} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  {result.status === 'pass' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs font-medium text-gray-700">{field}</span>
                </div>
                <p className="text-xs text-gray-600 ml-6">{result.comment}</p>
              </div>
            )
          ))}
          {totalCount === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">
              No validations yet. Start checking fields to track results.
            </p>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
            Export Report
          </button>
          {onClearResults && (
            <button
              onClick={onClearResults}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
            >
              Clear Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
