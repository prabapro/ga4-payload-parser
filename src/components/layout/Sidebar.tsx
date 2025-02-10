// src/components/layout/Sidebar.tsx

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, PanelLeftClose, PanelLeft } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    const checkWidth = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    // Set initial state
    checkWidth();

    // Add listener for window resize
    window.addEventListener('resize', checkWidth);

    // Cleanup
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 h-10 w-10 rounded-full shadow-lg md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:sticky
          top-0 md:top-auto
          h-full md:h-[calc(100vh-8rem)]
          z-40
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-0 md:w-16'}
          bg-background border-r
          overflow-hidden
        `}>
        {/* Desktop Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-2 hidden md:flex
            ${!isOpen && 'left-2 right-auto'}`}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Sidebar Content - Full View */}
        <div
          className={`
          ${!isOpen && 'invisible md:visible'}
          h-full w-64
          ${!isOpen && 'md:hidden'}
        `}>
          <div className="px-3 py-2 h-full">
            <h2 className="mb-2 px-4 text-lg font-semibold">History</h2>
            <ScrollArea className="h-[calc(100%-3rem)]">
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

        {/* Sidebar Content - Minimized View */}
        <div
          className={`
          hidden md:flex flex-col items-center pt-16 space-y-4
          ${isOpen && 'md:hidden'}
        `}>
          {history.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className="w-10 h-10"
              onClick={() => onSelect(item.payload)}
              title={new Date(item.timestamp).toLocaleString()}>
              <Clock className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
