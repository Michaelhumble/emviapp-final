
import React from 'react';
import Layout from '@/components/layout/Layout';

const SalonListingSuccess = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Salon Listed Successfully!</h1>
        <p className="text-gray-600">Your salon listing has been published.</p>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;
