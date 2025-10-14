'use client';

import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface ValidationSummaryProps {
  validationResults: Record<string, { status: string; comment: string }>;
}

export function ValidationSummary({ validationResults }: ValidationSummaryProps) {
  const results = Object.values(validationResults);
  const passedCount = results.filter(r => r.status === 'pass').length;
  const failedCount = results.filter(r => r.status === 'fail').length;
  const totalFields = results.length;
  const validationNotes = results.filter(r => r.comment.trim() !== '');

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Total Fields</span>
            <span className="text-2xl font-bold text-blue-600">{totalFields}</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Passed</span>
            </div>
            <span className="text-2xl font-bold text-green-600">{passedCount}</span>
          </div>
          {totalFields > 0 && (
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(passedCount / totalFields) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-900">Failed</span>
            </div>
            <span className="text-2xl font-bold text-red-600">{failedCount}</span>
          </div>
          {totalFields > 0 && (
            <div className="w-full bg-red-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${(failedCount / totalFields) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {validationNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Validation Notes</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(validationResults)
              .filter(([, result]) => result.comment.trim() !== '')
              .map(([field, result]) => (
                <div
                  key={field}
                  className={`p-3 rounded-lg border ${
                    result.status === 'pass'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {result.status === 'pass' ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-1">
                        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </p>
                      <p className="text-xs text-gray-700">{result.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {validationNotes.length === 0 && totalFields > 0 && (
        <div className="text-center text-gray-400 text-sm mt-8">
          <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No validation notes yet</p>
        </div>
      )}
    </div>
  );
}
