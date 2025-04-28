
import React from 'react';

interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-12 text-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ErrorLayout;
