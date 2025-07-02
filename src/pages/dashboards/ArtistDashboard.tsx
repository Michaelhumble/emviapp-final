
import React from 'react';
import Layout from '@/components/layout/Layout';

const ArtistDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Artist Dashboard</h1>
        <p className="text-gray-600">Manage your artist profile and bookings.</p>
      </div>
    </Layout>
  );
};

export default ArtistDashboard;
