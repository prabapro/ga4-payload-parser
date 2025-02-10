// src/components/layout/Header.tsx
import React from 'react';
import { Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Terminal className="h-8 w-8" />
          <h1 className="text-xl font-semibold">
            <a href="/">GA4 Payload Parser</a>
          </h1>
        </div>
      </div>
    </header>
  );
};
