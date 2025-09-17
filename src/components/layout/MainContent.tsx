import React from 'react';
import { SkipToContent } from '@/components/seo/AccessibilityHelpers';

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({ children, className = '' }) => {
  return (
    <>
      <SkipToContent />
      <main 
        id="main-content" 
        role="main"
        className={`focus:outline-none ${className}`}
        tabIndex={-1}
      >
        {children}
      </main>
    </>
  );
};