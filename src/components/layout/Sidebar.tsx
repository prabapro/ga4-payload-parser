// src/components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Clock,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  FileCode2,
  Globe,
  CalendarClock,
} from 'lucide-react';
import { isEcommerceEvent } from '@/lib/utils';
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
    console.error(e);
    try {
      // If that fails, try prepending http://
      return new URL('http://' + url).hostname;
    } catch (e) {
      console.error(e);
      // If all parsing fails, return the original string
      return url;
    }
  }
};

const formatDateTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
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
        className="fixed top-5 right-4 h-6 w-6 md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
        ) : (
          <PanelLeft className="h-4 w-4 text-muted-foreground" />
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
          bg-background border-r border-muted
        `}>
        {/* Desktop Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-6 hidden md:flex text-zinc-400
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
          overflow-hidden
        `}>
          <div className="px-4 py-4 h-full mt-4">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2 text-zinc-500">
              <Clock className="h-5 w-5 text-zinc-500" />
              Recent Payloads
            </h2>
            <ScrollArea className="h-[calc(100%-3rem)]">
              {history.length === 0 ? (
                <div className="py-4 text-xs text-muted-foreground">
                  Nothing here yet...
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => {
                    const domain = item.pageLocation
                      ? getDomainFromUrl(item.pageLocation)
                      : 'Unknown Domain';
                    const isEcom = isEcommerceEvent(item.eventName);

                    return (
                      <div
                        key={item.id}
                        className="group relative bg-muted/60 hover:bg-muted/90 rounded-lg p-3 transition-colors">
                        <Button
                          variant="ghost"
                          className="w-full h-auto p-0 flex flex-col items-start gap-1 font-normal"
                          onClick={() => onSelect(item.payload)}>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <FileCode2 className="h-3 w-3 text-zinc-300" />
                            <div className="flex items-center gap-2">
                              <span>{item.eventName}</span>
                              {isEcom && (
                                <Badge
                                  variant="outline"
                                  className="h-5 text-[10px] bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                                  ecom event
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3 text-zinc-300" />
                            {domain}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarClock className="h-3 w-3 text-zinc-300" />
                            {formatDateTime(item.timestamp)}
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

        {/* Sidebar Content - Minimized View with Tooltips */}
        <TooltipProvider>
          <div
            className={`
              hidden md:flex flex-col items-center pt-24 space-y-6
              ${isOpen && 'md:hidden'}
            `}>
            {history.map((item) => {
              const domain = item.pageLocation
                ? getDomainFromUrl(item.pageLocation)
                : 'Unknown Domain';
              const isEcom = isEcommerceEvent(item.eventName);

              return (
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => onSelect(item.payload)}>
                      <FileCode2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={10}
                    className="z-[60] p-3 space-y-2 bg-white border shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.eventName}</span>
                      {isEcom && (
                        <Badge
                          variant="outline"
                          className="h-5 text-[10px] bg-green-50 text-green-700 border-green-200">
                          ecom event
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        {domain}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarClock className="h-3 w-3" />
                        {formatDateTime(item.timestamp)}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
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
