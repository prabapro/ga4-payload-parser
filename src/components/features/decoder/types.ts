// src/components/features/decoder/types.ts
import type { DecodedData } from '@/hooks/useDecoder';

export interface DecoderInputProps {
  value: string;
  onChange: (value: string) => void;
  onDecode: () => void;
  error?: string;
}

export interface HighlightedInfoProps {
  data: DecodedData;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ParamsViewerProps {
  data: DecodedData;
}
