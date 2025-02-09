// src/hooks/useHistory.ts
import { useLocalStorage } from './useLocalStorage';

export interface HistoryItem {
  id: string;
  timestamp: number;
  payload: string;
}

const MAX_HISTORY_ITEMS = 10;

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    'ga4-decoder-history',
    [],
  );

  const addToHistory = (payload: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      payload,
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
