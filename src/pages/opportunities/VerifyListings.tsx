
import React from 'react';
import Layout from '@/components/layout/Layout';
import { salonListings } from '@/data/salonData';

const VerifyListings = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Verify Listings</h1>
        <div className="grid gap-4">
          {salonListings.map((listing) => (
            <div key={listing.id} className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold">{listing.name}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-gray-500 mt-2">{listing.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default VerifyListings;
