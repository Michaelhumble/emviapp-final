
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const SalonProfile = () => {
  const { salonId } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Salon Profile</h1>
        <p className="text-gray-600">Salon ID: {salonId}</p>
      </div>
    </Layout>
  );
};

export default SalonProfile;
