// src/hooks/useDecoder.ts
import { useState } from 'react';

export interface DecodedData {
  en?: string;
  dl?: string;
  [key: string]: unknown;
}

export function useDecoder() {
  const [decodedData, setDecodedData] = useState<DecodedData | null>(null);
  const [error, setError] = useState<string>('');

  const extractQueryString = (input: string): string => {
    try {
      if (input.includes('http')) {
        const url = new URL(input);
        return url.search.slice(1);
      }
      return input;
    } catch (err) {
      throw new Error('Invalid URL format');
    }
  };

  const decodePayload = (payload: string): DecodedData => {
    try {
      const queryString = extractQueryString(payload);
      let params: URLSearchParams;

      // First try to parse as regular URL parameters
      params = new URLSearchParams(queryString);

      // Check if this might be an encoded payload
      const entries = Array.from(params.entries());
      if (entries.length === 1) {
        const [, value] = entries[0];
        const base64Regex = /^[A-Za-z0-9+/=_-]*$/;

        if (base64Regex.test(value)) {
          try {
            const urlDecoded = decodeURIComponent(value);
            const base64Decoded = atob(urlDecoded);

            if (base64Decoded.includes('=') && !base64Decoded.includes(';')) {
              const decodedParams = new URLSearchParams(base64Decoded);
              if (!decodedParams.entries().next().done) {
                params = decodedParams;
              }
            }
          } catch (e) {
            console.log(
              'Base64 decoding attempt failed, using original parameters',
            );
          }
        }
      }

      const paramObject: DecodedData = {};
      params.forEach((value, key) => {
        if (key.includes('.')) {
          const parts = key.split('.');
          let current: Record<string, any> = paramObject;
          for (let i = 0; i < parts.length - 1; i++) {
            if (!isNaN(Number(parts[i]))) {
              const parentKey = parts[i - 1];
              current[parentKey] = current[parentKey] || [];
              if (!current[parentKey][parseInt(parts[i])]) {
                current[parentKey][parseInt(parts[i])] = {};
              }
              current = current[parentKey][parseInt(parts[i])];
            } else {
              current[parts[i]] = current[parts[i]] || {};
              current = current[parts[i]];
            }
          }
          current[parts[parts.length - 1]] = value;
        } else {
          paramObject[key] = value;
        }
      });

      return paramObject;
    } catch (err) {
      const error = err as Error;
      throw new Error(`Invalid encoded payload: ${error.message}`);
    }
  };

  const decode = (input: string) => {
    try {
      const decoded = decodePayload(input);
      setDecodedData(decoded);
      setError('');
      return decoded;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setDecodedData(null);
      return null;
    }
  };

  return {
    decodedData,
    error,
    decode,
  };
}
