'use client';

import { AlertCircle, CheckCircle, XCircle, Check, X } from 'lucide-react';

interface ValidationFieldProps {
  label: string;
  value: string | number;
  field: string;
  validationResults: Record<string, { status: string; comment: string }>;
  onValidate: (field: string, status: string, comment: string) => void;
}

export function ValidationField({ label, value, field, validationResults, onValidate }: ValidationFieldProps) {
  const result = validationResults[field];
  const status = result?.status;
  const comment = result?.comment || '';

  const getValidationIcon = () => {
    if (!result) return <AlertCircle className="w-4 h-4 text-gray-400" />;
    if (result.status === 'pass') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (result.status === 'fail') return <XCircle className="w-4 h-4 text-red-500" />;
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getValidationIcon()}
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
          <div className="text-sm text-gray-900 ml-6 font-mono bg-gray-50 p-2 rounded">
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
          </div>
        </div>
        <div className="flex gap-1 ml-4">
          <button
            onClick={() => onValidate(field, 'pass', comment)}
            className={`p-1.5 rounded ${
              status === 'pass'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-green-100'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => onValidate(field, 'fail', comment)}
            className={`p-1.5 rounded ${
              status === 'fail'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-red-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {result && (
        <div className="ml-6 mt-2">
          <textarea
            placeholder="Add validation notes..."
            value={comment}
            onChange={(e) => onValidate(field, status, e.target.value)}
            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
