
import React from 'react';
import Layout from '@/components/layout/Layout';

const SalonProfile = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Salon Profile</h1>
            <p className="text-gray-600">
              View salon details
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonProfile;
