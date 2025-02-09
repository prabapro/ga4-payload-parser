// src/components/features/decoder/DecoderInput.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { DecoderInputProps } from './types';

export const DecoderInput: React.FC<DecoderInputProps> = ({
  value,
  onChange,
  onDecode,
  error,
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your encoded URL or query string here..."
        className="min-h-24"
      />
      <div className="flex items-center gap-4">
        <Button variant="default" onClick={onDecode}>
          Decode
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};
