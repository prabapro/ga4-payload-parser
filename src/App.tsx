// src/App.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useDecoder } from '@/hooks/useDecoder';
import { useHistory } from '@/hooks/useHistory';
import type { DecodedData } from '@/hooks/useDecoder';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { decodedData, error, decode } = useDecoder();
  const { history, addToHistory, removeFromHistory } = useHistory();

  const handleDecode = (): void => {
    const decoded = decode(input);
    if (decoded) {
      addToHistory(input);
    }
  };

  const handleHistorySelect = (payload: string) => {
    setInput(payload);
    decode(payload);
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
    <Layout
      history={history}
      onHistorySelect={handleHistorySelect}
      onHistoryDelete={removeFromHistory}>
      <Card>
        <CardHeader>
          <CardTitle>Decode GA4 Payload</CardTitle>
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
                  <h3 className="text-lg font-semibold mb-2">
                    All Parameters:
                  </h3>
                  {renderObject(decodedData, true)}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default App;
