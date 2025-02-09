// src/components/features/decoder/ParamsViewer.tsx
import React from 'react';
import { SearchInput } from './SearchInput';
import type { ParamsViewerProps } from './types';

export const ParamsViewer: React.FC<ParamsViewerProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">null</span>;
    }

    if (Array.isArray(value)) {
      return (
        <div className="ml-4">
          {value.map((item, index) => (
            <div key={index} className="my-1">
              <span className="font-medium text-purple-600">[{index}]</span>
              <div className="ml-4 inline">
                {typeof item === 'object' && item !== null ? (
                  renderObject(item)
                ) : (
                  <span className="text-gray-700">{String(item)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return renderObject(value as Record<string, unknown>);
    }

    return <span className="text-gray-700">{String(value)}</span>;
  };

  const renderObject = (
    obj: Record<string, unknown>,
    isTopLevel = false,
  ): React.ReactNode => {
    if (!obj || typeof obj !== 'object') {
      return <span className="text-gray-700">{String(obj)}</span>;
    }

    const searchFilter = (key: string): boolean => {
      if (!searchTerm) return true;
      const valueStr = String(obj[key]).toLowerCase();
      return (
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        valueStr.includes(searchTerm.toLowerCase())
      );
    };

    return (
      <div className={isTopLevel ? '' : 'ml-4'}>
        {Object.entries(obj)
          .filter(([key]) => searchFilter(key))
          .map(([key, value]) => (
            <div key={key} className="my-1">
              <span className="font-medium text-blue-600">{key}: </span>
              {renderValue(value)}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search parameters..."
      />
      <div className="bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-2">All Parameters:</h3>
        {renderObject(data, true)}
      </div>
    </div>
  );
};
