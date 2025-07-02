
import React from 'react';
import { useParams } from 'react-router-dom';

const SalonProfile = () => {
  const { salonId } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Salon Profile</h1>
        <p className="text-gray-600">Salon ID: {salonId}</p>
      </div>
    </div>
  );
};

export default SalonProfile;
