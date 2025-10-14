'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface ValidationFieldProps {
  label: string;
  value: string | number;
  field: string;
  validationResults: Record<string, { status: string; comment: string }>;
  onValidate: (field: string, status: string, comment: string) => void;
}

export function ValidationField({ label, value, field, validationResults, onValidate }: ValidationFieldProps) {
  const [comment, setComment] = useState(validationResults[field]?.comment || '');
  const status = validationResults[field]?.status;

  const handleValidation = (newStatus: string) => {
    onValidate(field, newStatus, comment);
  };

  return (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <div className="text-sm text-gray-900 break-words">{value}</div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => handleValidation('pass')}
            className={`p-2 rounded-lg transition ${
              status === 'pass'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
            }`}
            title="Mark as Pass"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleValidation('fail')}
            className={`p-2 rounded-lg transition ${
              status === 'fail'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
            }`}
            title="Mark as Fail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      {status && (
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={() => onValidate(field, status, comment)}
          placeholder="Add validation notes..."
          className="w-full mt-2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      )}
    </div>
  );
}
