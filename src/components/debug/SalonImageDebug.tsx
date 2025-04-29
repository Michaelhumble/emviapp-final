
import React from 'react';
import BarberImageStatus from './BarberImageStatus';
import HairSalonImageStatus from './HairSalonImageStatus';
import LashBrowImageStatus from './LashBrowImageStatus';

/**
 * Combined debug component for salon image systems
 * Only shown in development
 */
const SalonImageDebug: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="container mx-auto p-4 bg-white border rounded-md mb-8">
      <h2 className="text-lg font-bold mb-4">Salon Image System Debug (Dev Only)</h2>
      <div className="space-y-4">
        <BarberImageStatus />
        <HairSalonImageStatus />
        <LashBrowImageStatus />
      </div>
    </div>
  );
};

export default SalonImageDebug;
