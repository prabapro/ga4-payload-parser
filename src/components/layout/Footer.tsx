// src/components/layout/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t py-4 px-6  border-gray-100 bg-white">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Made with ❤️ by{' '}
          <a
            href="https://measureschool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary">
            MeasureSchool
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GA4 Payload Parser
        </p>
      </div>
    </footer>
  );
};
