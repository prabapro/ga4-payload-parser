// src/components/features/decoder/ParamsViewer.tsx
import React from 'react';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
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

  // Function to check if a value matches the search term
  const matchesSearch = React.useCallback(
    (value: unknown, path: string): boolean => {
      if (!searchTerm) return true;
      const termLower = searchTerm.toLowerCase();

      // Check if the current path matches
      if (path.toLowerCase().includes(termLower)) return true;

      // If it's a primitive value, check if it matches
      if (typeof value !== 'object' || value === null) {
        return String(value).toLowerCase().includes(termLower);
      }

      // For arrays, check each element
      if (Array.isArray(value)) {
        return value.some((item) => matchesSearch(item, path));
      }

      // For objects, check each property
      return Object.entries(value as Record<string, unknown>).some(
        ([key, val]) => {
          const fullPath = path ? `${path}.${key}` : key;
          return matchesSearch(val, fullPath);
        },
      );
    },
    [searchTerm],
  );

  // Function to get all parent paths of a matching item
  const getParentPaths = (path: string): string[] => {
    const parts = path.split('.');
    return parts.reduce((acc: string[], _, index) => {
      if (index === 0) return acc;
      acc.push(parts.slice(0, index).join('.'));
      return acc;
    }, []);
  };

  // Function to collect all section IDs and auto-expand matching sections
  const collectSectionIds = React.useCallback(
    (obj: Record<string, unknown>, path = ''): string[] => {
      return Object.entries(obj).reduce((acc: string[], [key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            // Include array paths and check if they match search
            const shouldInclude = matchesSearch(value, fullPath);
            return shouldInclude ? [...acc, fullPath] : acc;
          } else {
            // Include object paths and their nested paths if they match search
            const nestedPaths = collectSectionIds(
              value as Record<string, unknown>,
              fullPath,
            );
            const shouldInclude = matchesSearch(value, fullPath);
            return shouldInclude
              ? [...acc, fullPath, ...nestedPaths]
              : [...acc, ...nestedPaths];
          }
        }
        return acc;
      }, []);
    },
    [matchesSearch],
  );

  // Update sections and set initial expansion state
  React.useEffect(() => {
    const sections = collectSectionIds(data as Record<string, unknown>);
    setAllSections(sections);

    if (searchTerm) {
      // Get all matching sections and their parent paths for search
      const matchingSections = sections.filter((section) =>
        matchesSearch(data, section),
      );
      const parentSections = matchingSections.flatMap(getParentPaths);

      // Combine and deduplicate sections to expand
      const sectionsToExpand = [
        ...new Set([...matchingSections, ...parentSections]),
      ];
      setExpandedSections(sectionsToExpand);
    } else {
      // If no search term, expand all sections by default
      setExpandedSections(sections);
    }
  }, [data, searchTerm, collectSectionIds, matchesSearch]);

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
      .filter(([key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;
        return matchesSearch(value, fullPath);
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
                    className="text-xs bg-green-100/40 border-green-100/80 text-green-500/70">
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
                  {value
                    .filter((item, index) =>
                      matchesSearch(item, `${fullPath}[${index}]`),
                    )
                    .map((item, index) => (
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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-8 w-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7 hover:bg-transparent"
                  onClick={() => setSearchTerm('')}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
            <div className="flex justify-center md:justify-start gap-3">
              <Button
                variant="outline"
                onClick={handleExpandAll}
                className="text-xs gap-2">
                <ChevronDown className="h-4 w-4" />
                Expand All
              </Button>
              <Button
                variant="outline"
                onClick={handleCollapseAll}
                className="text-xs gap-2">
                <ChevronUp className="h-4 w-4" />
                Collapse All
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full">
              {renderObjectContent(data as Record<string, unknown>)}
            </Accordion>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParamsViewer;
