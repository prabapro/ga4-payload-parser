// src/App.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface DecodedData {
  en?: string;
  dl?: string;
  [key: string]: unknown;
}

interface HighlightedInfoProps {
  data: DecodedData;
}

const HighlightedInfo: React.FC<HighlightedInfoProps> = ({ data }) => {
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

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [decodedData, setDecodedData] = useState<DecodedData | null>(null);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const extractQueryString = (input: string): string => {
    try {
      if (input.includes('http')) {
        const url = new URL(input);
        return url.search.slice(1);
      }
      return input;
    } catch (err) {
      throw new Error('Invalid URL format');
    }
  };

  const decodePayload = (payload: string): DecodedData => {
    try {
      const queryString = extractQueryString(payload);
      let params: URLSearchParams;

      // First try to parse as regular URL parameters
      params = new URLSearchParams(queryString);

      // Check if this might be an encoded payload:
      // 1. If there's only one parameter
      // 2. Its value looks like base64 (contains mostly letters, numbers, and base64 padding)
      const entries = Array.from(params.entries());
      if (entries.length === 1) {
        const [, value] = entries[0];
        const base64Regex = /^[A-Za-z0-9+/=_-]*$/;

        if (base64Regex.test(value)) {
          try {
            // Attempt base64 decoding
            const urlDecoded = decodeURIComponent(value);
            const base64Decoded = atob(urlDecoded);

            // Check if the decoded result looks like a query string
            if (base64Decoded.includes('=') && !base64Decoded.includes(';')) {
              const decodedParams = new URLSearchParams(base64Decoded);
              if (!decodedParams.entries().next().done) {
                params = decodedParams;
              }
            }
          } catch (e) {
            // If base64 decoding fails, use the original params
            console.log(
              'Base64 decoding attempt failed, using original parameters',
            );
          }
        }
      }

      const paramObject: DecodedData = {};
      params.forEach((value, key) => {
        if (key.includes('.')) {
          const parts = key.split('.');
          let current: Record<string, any> = paramObject;
          for (let i = 0; i < parts.length - 1; i++) {
            if (!isNaN(Number(parts[i]))) {
              const parentKey = parts[i - 1];
              current[parentKey] = current[parentKey] || [];
              if (!current[parentKey][parseInt(parts[i])]) {
                current[parentKey][parseInt(parts[i])] = {};
              }
              current = current[parentKey][parseInt(parts[i])];
            } else {
              current[parts[i]] = current[parts[i]] || {};
              current = current[parts[i]];
            }
          }
          current[parts[parts.length - 1]] = value;
        } else {
          paramObject[key] = value;
        }
      });

      return paramObject;
    } catch (err) {
      const error = err as Error;
      throw new Error(`Invalid encoded payload: ${error.message}`);
    }
  };

  const handleDecode = (): void => {
    try {
      const decoded = decodePayload(input);
      setDecodedData(decoded);
      setError('');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setDecodedData(null);
    }
  };

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
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>URL and Base64 Decoder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <textarea
              className="w-full p-2 border rounded-md min-h-24"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your encoded URL or query string here..."
            />
          </div>

          <Button variant="default" onClick={handleDecode}>
            Decode
          </Button>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          {decodedData && (
            <div className="mt-4">
              <HighlightedInfo data={decodedData} />

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search parameters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-semibold mb-2">All Parameters:</h3>
                {renderObject(decodedData, true)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default App;
