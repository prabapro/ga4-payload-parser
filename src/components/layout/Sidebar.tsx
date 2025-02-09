// src/components/layout/Sidebar.tsx
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: number;
  payload: string;
}

interface SidebarProps {
  history: HistoryItem[];
  onSelect: (payload: string) => void;
  onDelete: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  history,
  onSelect,
  onDelete,
}) => {
  return (
    <div className="pb-12 w-64 border-r h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">History</h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {history.length === 0 ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                No history yet
              </div>
            ) : (
              <div className="space-y-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <Button
                      variant="ghost"
                      className="h-auto px-2 flex-grow justify-start"
                      onClick={() => onSelect(item.payload)}>
                      <span className="truncate">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
