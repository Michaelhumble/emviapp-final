
import React, { useState, useEffect } from 'react';
import { SalonListing } from '@/types/salon';
import SalonListingsManagement from '@/components/dashboard/salon/SalonListingsManagement';
import { getSalonsForSale } from '@/utils/featuredContent';

const OwnerDashboard = () => {
  const [salonListings, setSalonListings] = useState<SalonListing[]>([]);
  
  useEffect(() => {
    // Fetch salons on component mount
    const fetchSalons = async () => {
      try {
        const salons = getSalonsForSale(5).map(salon => {
          return {
            id: salon.id || '',
            name: salon.salon_name || salon.name || '',
            location: salon.location || `${salon.city || ''}, ${salon.state || ''}`,
            listing_type: salon.type as 'For Sale' | 'Booth Rental' | 'Partnership' || 'For Sale',
            description: salon.description || '',
            price: typeof salon.price === 'number' ? salon.price : 
                 typeof salon.asking_price === 'number' ? salon.asking_price :
                 parseFloat((salon.asking_price || '0').toString().replace(/[^0-9.-]+/g, '') || '0'),
            contact_hidden: salon.contact_hidden || false,
            created_at: salon.created_at || new Date().toISOString(),
            image: salon.image || undefined,
            is_featured: salon.is_featured || false
          } as SalonListing;
        });
        setSalonListings(salons);
      } catch (error) {
        console.error('Error fetching salon listings:', error);
      }
    };
    
    fetchSalons();
  }, []);
  
  const handleFeatureListing = (salonId: string) => {
    console.log("Feature listing:", salonId);
    // Update the featured status in state for immediate UI feedback
    setSalonListings(prevListings => 
      prevListings.map(salon => 
        salon.id === salonId 
          ? { ...salon, is_featured: !salon.is_featured } 
          : salon
      )
    );
  };
  
  const handleEditListing = (salon: SalonListing) => {
    console.log("Edit listing:", salon.id);
    // Implement edit listing functionality
  };
  
  const handleDeleteListing = (salonId: string) => {
    console.log("Delete listing:", salonId);
    // Remove the listing from state for immediate UI feedback
    setSalonListings(prevListings => 
      prevListings.filter(salon => salon.id !== salonId)
    );
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
