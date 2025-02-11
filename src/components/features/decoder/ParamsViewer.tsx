// src/components/features/decoder/ParamsViewer.tsx
import React from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ParamsViewerProps } from './types';

const ParameterValue: React.FC<{ value: unknown }> = ({ value }) => {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">null</span>;
  }

  if (typeof value === 'boolean') {
    return (
      <Badge variant={value ? 'default' : 'secondary'} className="font-mono">
        {String(value)}
      </Badge>
    );
  }

  if (typeof value === 'number') {
    return <span className="font-mono text-blue-600">{value}</span>;
  }

  return (
    <span className="font-mono text-gray-700 break-all text-sm">
      {String(value)}
    </span>
  );
};

export const ParamsViewer: React.FC<ParamsViewerProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);
  const [allSections, setAllSections] = React.useState<string[]>([]);

  // Function to collect all possible section IDs
  const collectSectionIds = React.useCallback(
    (obj: Record<string, unknown>, path = ''): string[] => {
      return Object.entries(obj).reduce((acc: string[], [key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            return [...acc, fullPath];
          } else {
            return [
              ...acc,
              fullPath,
              ...collectSectionIds(value as Record<string, unknown>, fullPath),
            ];
          }
        }
        return acc;
      }, []);
    },
    [],
  );

  // Initialize allSections when data changes
  React.useEffect(() => {
    const sections = collectSectionIds(data);
    setAllSections(sections);
  }, [data, collectSectionIds]);

  const handleExpandAll = () => {
    setExpandedSections(allSections);
  };

  const handleCollapseAll = () => {
    setExpandedSections([]);
  };

  const renderObjectContent = (
    obj: Record<string, unknown>,
    path = '',
  ): React.ReactNode => {
    return Object.entries(obj)
      .filter(([key]) => {
        const fullPath = path ? `${path}.${key}` : key;
        if (!searchTerm) return true;
        return (
          fullPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(obj[key]).toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .map(([key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return (
            <AccordionItem value={fullPath} key={fullPath}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm font-mono text-red-500">
                    {key}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-100/40 border-green-100/80 text-green-600 font-thin">
                    {Object.keys(value as Record<string, unknown>).length}{' '}
                    nested
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4">
                  {renderObjectContent(
                    value as Record<string, unknown>,
                    fullPath,
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        }

        if (Array.isArray(value)) {
          return (
            <AccordionItem value={fullPath} key={fullPath}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm font-mono">{key}</span>
                  <Badge variant="outline" className="text-xs">
                    {value.length} items
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 space-y-2">
                  {value.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1 text-xs">
                        {index}
                      </Badge>
                      {typeof item === 'object' && item !== null ? (
                        <div className="flex-1">
                          {renderObjectContent(
                            item as Record<string, unknown>,
                            `${fullPath}[${index}]`,
                          )}
                        </div>
                      ) : (
                        <ParameterValue value={item} />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        }

        return (
          <div
            key={fullPath}
            className="py-2 flex items-start justify-between gap-4">
            <span className="font-medium text-sm min-w-32 shrink-0 font-mono text-zinc-400">
              {key}
            </span>
            <ParameterValue value={value} />
          </div>
        );
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleExpandAll}
              className="shrink-0 text-xs gap-2">
              <ChevronDown className="h-4 w-4" />
              Expand All
            </Button>
            <Button
              variant="outline"
              onClick={handleCollapseAll}
              className="shrink-0 text-xs gap-2">
              <ChevronUp className="h-4 w-4" />
              Collapse All
            </Button>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full">
              {renderObjectContent(data)}
            </Accordion>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParamsViewer;
