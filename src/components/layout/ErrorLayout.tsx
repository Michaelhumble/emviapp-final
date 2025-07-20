
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="font-serif text-2xl font-bold text-orange-600">
            EmviApp
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {children}
        </div>
      </main>
      
      {/* FOOTER CLEAN STATE: No footers in the app. Do not add any until instructed. */}
    </div>
  );
};

export default ErrorLayout;
