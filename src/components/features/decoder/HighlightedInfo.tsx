// src/components/features/decoder/HighlightedInfo.tsx
import React from 'react';
import type { HighlightedInfoProps } from './types';

export const HighlightedInfo: React.FC<HighlightedInfoProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid gap-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-500 w-32">
            Event Name:
          </span>
          <span className="text-lg font-medium text-green-600">
            {data.en || 'N/A'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-500 w-32">
            Page Location:
          </span>
          <span className="text-lg font-medium text-indigo-600">
            {data.dl || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
