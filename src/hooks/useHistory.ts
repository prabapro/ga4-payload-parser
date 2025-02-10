// src/hooks/useHistory.ts
import { useLocalStorage } from './useLocalStorage';
import { useDecoder } from './useDecoder';

export interface HistoryItem {
  id: string;
  timestamp: number;
  payload: string;
  eventName: string;
  pageLocation: string;
}

const MAX_HISTORY_ITEMS = 10;

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    'ga4-decoder-history',
    [],
  );
  const { decode } = useDecoder();

  const extractDecodedInfo = (payload: string) => {
    const decodedData = decode(payload);
    if (!decodedData) return { eventName: 'Unknown Event', pageLocation: 'Unknown Page' };

    return {
      eventName: decodedData.en || 'Unknown Event',
      pageLocation: decodedData.dl || 'Unknown Page'
    };
  };

  const addToHistory = (payload: string) => {
    const { eventName, pageLocation } = extractDecodedInfo(payload);

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      payload,
      eventName,
      pageLocation,
    };

    setHistory((prev) => [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS));
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
