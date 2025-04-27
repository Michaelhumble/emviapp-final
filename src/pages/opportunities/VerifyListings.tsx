
import React, { useEffect, useState } from 'react';
import { salonListings } from '@/components/home/SalonJobListingsShowcase';

const VerifyListings = () => {
  const [verificationResults, setVerificationResults] = useState({
    totalListings: 0,
    uniqueIds: 0,
    duplicateIds: [] as string[],
    missingIds: [] as number[]
  });
  
  useEffect(() => {
    // Check if all listings have unique IDs
    const ids = salonListings.map(listing => listing.id);
    const uniqueIds = new Set(ids);
    
    // Check for missing IDs
    const missingIds: number[] = [];
    salonListings.forEach((listing, index) => {
      if (!listing.id) missingIds.push(index);
    });
    
    // Check for duplicate IDs
    const duplicateIds: string[] = [];
    ids.forEach(id => {
      if (id && ids.filter(i => i === id).length > 1 && !duplicateIds.includes(id)) {
        duplicateIds.push(id);
      }
    });
    
    setVerificationResults({
      totalListings: salonListings.length,
      uniqueIds: uniqueIds.size,
      duplicateIds,
      missingIds
    });
    
    // Log verification results
    console.log("Listings Verification Results:", {
      totalListings: salonListings.length,
      uniqueIds: uniqueIds.size,
      hasDuplicateIds: duplicateIds.length > 0,
      duplicateIds,
      hasMissingIds: missingIds.length > 0,
      missingIds
    });
    
  }, []);
  
  return null; // This is a utility component for verification, doesn't render anything
};

export default VerifyListings;
