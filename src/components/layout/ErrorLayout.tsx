
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ 
  children,
  showHeader = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && (
        <header className="py-4 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png" 
                alt="EmviApp"
                className="h-10"
              />
            </Link>
          </div>
        </header>
      )}
      
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-16">
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-gray-200 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EmviApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ErrorLayout;
