
import React, { useEffect, useState } from 'react';
import { Job } from '@/types/job';
import { getValidatedDiverseListings, isListingDisplayable, enhanceListingWithImage } from '@/utils/listingsVerification';

// Component implementation with proper imports
const LatestIndustryOpportunities: React.FC = () => {
  const [listings, setListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const fetchedListings = await getValidatedDiverseListings();
        // Filter listings to ensure they're displayable
        const validListings = fetchedListings.filter(isListingDisplayable);
        setListings(validListings);
      } catch (error) {
        console.error('Error loading industry listings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Latest Industry Opportunities</h2>
      
      {loading ? (
        <div className="flex justify-center">
          <p>Loading opportunities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Listing card content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <p className="text-gray-600">{listing.location}</p>
              </div>
            </div>
          ))}
          
          {listings.length === 0 && !loading && (
            <div className="col-span-3 text-center">
              <p>No opportunities available at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestIndustryOpportunities;
