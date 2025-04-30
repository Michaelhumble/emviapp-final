
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { getValidatedDiverseListings } from '@/utils/listingsVerification';

interface OpportunitiesSectionProps {
  diverseListings?: Job[];
}

const OpportunitiesSection = ({ diverseListings: propListings }: OpportunitiesSectionProps) => {
  const [listings, setListings] = useState<Job[]>(propListings || []);
  const [isLoading, setIsLoading] = useState<boolean>(!propListings);

  // Fetch listings if not provided as props
  useEffect(() => {
    if (!propListings) {
      setIsLoading(true);
      
      getValidatedDiverseListings()
        .then(validatedListings => {
          console.log(`Loaded ${validatedListings.length} validated listings`);
          setListings(validatedListings);
        })
        .catch(error => console.error("Error loading listings:", error))
        .finally(() => setIsLoading(false));
    }
  }, [propListings]);
  
  // Enhanced validation to ensure we only show valid listings with necessary data
  const validListings = listings.filter(listing => 
    listing && 
    listing.id && 
    (listing.title || listing.company) &&
    listing.location &&
    // Additional validation to ensure listing has a type for proper routing
    listing.type &&
    // Ensure there's at least an imageUrl or a category/specialty for fallback images
    (listing.imageUrl || 
     (listing.specialties && listing.specialties.length > 0) || 
     // Check for category using type guard
     ('category' in listing && listing.category))
  );
  
  // Log any issues with listings for debugging
  if (validListings.length < listings.length) {
    console.log(`⚠️ Filtered out ${listings.length - validListings.length} invalid listings from Opportunities section`);
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-playfair font-bold mb-6 text-[#1A1A1A]">
            Right Now on EmviApp — The Listings Everyone's Talking About
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white rounded-lg shadow-sm p-4 h-[300px] animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded mb-4" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            ))
          ) : validListings.length > 0 ? (
            validListings.map((listing, index) => (
              <AuthAction
                key={listing.id}
                onAction={() => {
                  console.log(`Clicked listing: ${listing.id}, type: ${listing.type}`);
                  return true;
                }}
                redirectPath={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}
                customTitle="Sign in to view full details"
                creditMessage="Create a free account to access contact information and more details."
              >
                <OpportunityCard 
                  key={listing.id} 
                  listing={listing} 
                  index={index}
                />
              </AuthAction>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 mb-4">No opportunities available at the moment.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="font-medium">
              <Building className="mr-2 h-4 w-4" />
              Browse All Salons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
