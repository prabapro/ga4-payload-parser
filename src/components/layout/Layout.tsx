// src/components/layout/Layout.tsx
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  history: {
    id: string;
    timestamp: number;
    payload: string;
  }[];
  onHistorySelect: (payload: string) => void;
  onHistoryDelete: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  history,
  onHistorySelect,
  onHistoryDelete,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          history={history}
          onSelect={onHistorySelect}
          onDelete={onHistoryDelete}
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export * from './Header';
export * from './Sidebar';
export * from './Footer';
export * from './Layout';
