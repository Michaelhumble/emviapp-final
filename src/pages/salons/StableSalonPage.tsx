
import React from 'react';
import Layout from '@/components/layout/Layout';

/**
 * A stable and lightweight version of the salons page
 * This ensures the route doesn't break even if the main component has issues
 */
const StableSalonPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Salons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder content */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="font-bold text-lg">Salons Loading...</h2>
            <p className="text-gray-600 mt-2">Please wait while we load salon data.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StableSalonPage;
