// src/components/layout/Header.tsx
import React from 'react';
import { SquareTerminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <SquareTerminal className="h-8 w-8 text-red-400" />
          <h1 className="text-xl font-bold">
            <a href="/">GA4 Payload Parser</a>
          </h1>
        </div>
      </div>
    </header>
  );
};
