// src/components/features/decoder/HighlightedInfo.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Globe, Hash } from 'lucide-react';
import type { HighlightedInfoProps } from './types';

export const HighlightedInfo: React.FC<HighlightedInfoProps> = ({ data }) => {
  if (!data) return null;

  const highlightedParams = [
    {
      id: 'event',
      icon: <Wand2 className="h-5 w-5 text-green-500" />,
      label: 'Event Name',
      value: data.en,
      valueClassName: 'text-green-600',
    },
    {
      id: 'page',
      icon: <Globe className="h-5 w-5 text-indigo-500" />,
      label: 'Page Location',
      value: data.dl,
      valueClassName: 'text-indigo-600',
    },
    {
      id: 'tid',
      icon: <Hash className="h-5 w-5 text-orange-500" />,
      label: 'Measurement ID',
      value: data.tid,
      valueClassName: 'text-orange-600',
    },
  ];

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'N/A';
    return String(value);
  };

  return (
    <Card>
      <CardContent className="grid gap-4 p-6">
        {highlightedParams.map(({ id, icon, label, value, valueClassName }) => (
          <div key={id} className="flex items-start gap-4">
            {icon}
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {label}
              </p>
              <p
                className={`text-base font-semibold font-mono break-all ${valueClassName}`}>
                {formatValue(value)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
