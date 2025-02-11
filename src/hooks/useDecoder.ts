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

  const cleanPayload = (input: string): string => {
    // Remove any unwanted whitespace while preserving encoded spaces
    return input
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/(\w+)\s*=\s*/g, '$1=') // Remove spaces around '='
      .replace(/\s*&\s*/g, '&') // Remove spaces around '&'
      .trim();
  };

  const cleanUrl = (url: string): string => {
    try {
      // Remove unwanted spaces and hyphens in domain
      const cleanedUrl = url
        .replace(/(\w+)-\s*(\w+)/g, '$1-$2') // Fix broken hyphenated words
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/®/g, '') // Remove ® symbol
        .replace(/@/g, '/') // Replace @ with /
        .replace(/\[/g, '') // Remove [
        .replace(/\]/g, '') // Remove ]
        .replace(/с/g, 'c') // Replace Cyrillic с with Latin c
        .replace(/х/g, 'x') // Replace Cyrillic х with Latin x
        .replace(/\u0435/g, 'e') // Replace Cyrillic е with Latin e
        .replace(/\u0456/g, 'i') // Replace Cyrillic і with Latin i
        .replace(/\u0430/g, 'a') // Replace Cyrillic а with Latin a
        .replace(/[\u0080-\uFFFF]/g, ''); // Remove other non-ASCII characters

      // Try to parse and reconstruct the URL
      const parsedUrl = new URL(cleanedUrl);
      return parsedUrl.toString();
    } catch (e) {
      console.error('URL cleaning failed:', e);
      return url; // Return original if cleaning fails
    }
  };

  const extractDomainFromDL = (dlParam: string): string | null => {
    try {
      const cleanedDL = cleanUrl(decodeURIComponent(dlParam));
      const url = new URL(cleanedDL);
      return url.hostname;
    } catch {
      return null;
    }
  };

  const extractQueryString = (input: string): string => {
    try {
      // Clean the input first
      const cleanedInput = cleanPayload(input);

      // Case 1: Full URL - extract query string normally
      if (cleanedInput.startsWith('http')) {
        const url = new URL(cleanedInput);
        return url.search.slice(1);
      }

      // Case 2: GA4 collect endpoint format (/g/collect?...)
      if (cleanedInput.startsWith('/g/collect?')) {
        return cleanedInput.split('?')[1];
      }

      // Case 3: Query string starting with '?' - remove the leading '?'
      if (cleanedInput.startsWith('?')) {
        return cleanedInput.slice(1);
      }

      // Case 4: Query string with 'key=value' format - use as is
      if (cleanedInput.includes('=')) {
        return cleanedInput;
      }

      throw new Error('Invalid input format');
    } catch (err) {
      if (err instanceof Error && err.message === 'Invalid input format') {
        throw err;
      }
      throw new Error('Invalid URL or query string format');
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
        // Special handling for dl parameter
        if (key === 'dl') {
          try {
            const decodedDL = decodeURIComponent(value);
            const cleanedDL = cleanUrl(decodedDL);
            paramObject[key] = cleanedDL;
          } catch (e) {
            paramObject[key] = value; // Keep original if cleaning fails
          }
        } else {
          // Clean up other parameter values
          const cleanedValue = value.replace(/\s+/g, ' ').trim();

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
            current[parts[parts.length - 1]] = cleanedValue;
          } else {
            paramObject[key] = cleanedValue;
          }
        }
      });

      // Extract and store the domain
      if (paramObject.dl) {
        const domain = extractDomainFromDL(paramObject.dl as string);
        if (domain) {
          paramObject._extracted_domain = domain;
        }
      }

      return paramObject;
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to decode payload: ${error.message}`);
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
    setDecodedData,
    setError,
  };
}
