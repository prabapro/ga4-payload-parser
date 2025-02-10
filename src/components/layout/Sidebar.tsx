// src/components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  Activity,
  Globe,
} from 'lucide-react';
import type { HistoryItem } from '@/hooks/useHistory';

interface SidebarProps {
  history: HistoryItem[];
  onSelect: (payload: string) => void;
  onDelete: (id: string) => void;
}

const getDomainFromUrl = (url: string) => {
  try {
    // First try with the original URL
    const urlObj = new URL(decodeURIComponent(url));
    return urlObj.hostname;
  } catch (e) {
    try {
      // If that fails, try prepending http://
      return new URL('http://' + url).hostname;
    } catch (e) {
      // If all parsing fails, return the original string
      return url;
    }
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  history,
  onSelect,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
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
          ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full md:translate-x-0 w-0 md:w-16'}
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
          h-full w-80
          ${!isOpen && 'md:hidden'}
        `}>
          <div className="px-4 py-4 h-full">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              History
            </h2>
            <ScrollArea className="h-[calc(100%-3rem)]">
              {history.length === 0 ? (
                <div className="py-4 text-sm text-muted-foreground">
                  No history yet
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => {
                    const domain = item.pageLocation
                      ? getDomainFromUrl(item.pageLocation)
                      : 'Unknown Domain';

                    return (
                      <div
                        key={item.id}
                        className="group relative bg-muted/40 hover:bg-muted/80 rounded-lg p-3 transition-colors">
                        <Button
                          variant="ghost"
                          className="w-full h-auto p-0 flex flex-col items-start gap-1 font-normal"
                          onClick={() => onSelect(item.payload)}>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Activity className="h-4 w-4 text-primary" />
                            {item.eventName}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            {domain}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    );
                  })}
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
              title={item.eventName}>
              <Activity className="h-4 w-4" />
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
