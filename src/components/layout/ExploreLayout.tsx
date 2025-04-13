
import React, { ReactNode } from 'react';
import Layout from './Layout';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface ExploreLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const ExploreLayout: React.FC<ExploreLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Fixed language toggle for mobile */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <div className="bg-white rounded-full shadow-md p-1.5">
            <LanguageToggle minimal={true} />
          </div>
        </div>
        
        {/* Header section with title and language toggle */}
        {(title || description) && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              {title && <h1 className="text-3xl font-serif font-bold mb-2">{title}</h1>}
              {description && <p className="text-gray-600">{description}</p>}
            </div>
            <div className="hidden md:block mt-4 md:mt-0">
              <LanguageToggle />
            </div>
          </div>
        )}
        
        {children}
      </div>
    </Layout>
  );
};

export default ExploreLayout;
