import React, { useState } from 'react';
import { SalonListing } from '@/types/salon';
import SalonListingsManagement from '@/components/dashboard/salon/SalonListingsManagement';

const OwnerDashboard = () => {
  const [salonListings, setSalonListings] = useState<SalonListing[]>([]);
  
  const handleFeatureListing = (salonId: string) => {
    console.log("Feature listing:", salonId);
    // Implement feature listing functionality
  };
  
  const handleEditListing = (salon: SalonListing) => {
    console.log("Edit listing:", salon.id);
    // Implement edit listing functionality
  };
  
  const handleDeleteListing = (salonId: string) => {
    console.log("Delete listing:", salonId);
    // Implement delete listing functionality
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Salon Owner Dashboard</h1>
      
      <SalonListingsManagement 
        salons={salonListings}
        onFeature={handleFeatureListing}
        onEdit={handleEditListing}
        onDelete={handleDeleteListing}
      />
    </div>
  );
};

export default OwnerDashboard;
