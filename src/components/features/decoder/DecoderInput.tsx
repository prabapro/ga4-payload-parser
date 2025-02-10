// src/components/features/decoder/DecoderInput.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eraser, Code } from 'lucide-react';
import type { DecoderInputProps } from './types';

export const DecoderInput: React.FC<DecoderInputProps> = ({
  value,
  onChange,
  onDecode,
  error,
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your encoded URL or query string here..."
        className="min-h-24"
      />
      <div className="flex items-center gap-3">
        <Button
          variant="default"
          onClick={onDecode}
          className="gap-2"
          disabled={!value}>
          <Code className="h-4 w-4" />
          Decode
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          className="gap-2"
          disabled={!value}>
          <Eraser className="h-4 w-4" />
          Clear
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};
