// src/App.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useDecoder } from '@/hooks/useDecoder';
import { useHistory } from '@/hooks/useHistory';
import {
  DecoderInput,
  HighlightedInfo,
  ParamsViewer,
} from '@/components/features/decoder';
import InfoComponent from '@/components/features/InfoComponent';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
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

  const handleLoadSample = (payload: string) => {
    setInput(payload);
    decode(payload);
  };

  return (
    <Layout
      history={history}
      onHistorySelect={handleHistorySelect}
      onHistoryDelete={removeFromHistory}>
      <InfoComponent onLoadSample={handleLoadSample} />
      <Card>
        <CardHeader>
          <CardTitle>Decode GA4 Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <DecoderInput
              value={input}
              onChange={setInput}
              onDecode={handleDecode}
              error={error}
            />

            {decodedData && (
              <div className="space-y-6">
                <HighlightedInfo data={decodedData} />
                <ParamsViewer data={decodedData} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default App;
