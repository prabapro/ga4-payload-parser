// src/components/layout/Layout.tsx

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import type { HistoryItem } from '@/hooks/useHistory';

interface LayoutProps {
  children: React.ReactNode;
  history: HistoryItem[];
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
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Sidebar
          history={history}
          onSelect={onHistorySelect}
          onDelete={onHistoryDelete}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
