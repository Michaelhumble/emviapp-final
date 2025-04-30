
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { fetchLiveListings } from '@/utils/fetchLiveListings';

interface OpportunitiesSectionProps {
  diverseListings: Job[];
}

const OpportunitiesSection = ({ diverseListings }: OpportunitiesSectionProps) => {
  const [validatedListings, setValidatedListings] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch and validate listings from Supabase
    const fetchAndValidateListings = async () => {
      setIsLoading(true);
      
      try {
        // Get live listings directly from fetchLiveListings utility
        const liveListings = await fetchLiveListings({ 
          limit: 6,
          featured: false
        });
          
        if (liveListings && liveListings.length > 0) {
          console.log('Fetched live listings:', liveListings);
          setValidatedListings(liveListings);
        } else {
          // Fall back to diverseListings prop if no live listings found
          validateExistingListings();
        }
      } catch (error) {
        console.error('Error processing listings:', error);
        // Fall back to diverseListings prop if there's an exception
        validateExistingListings();
      } finally {
        setIsLoading(false);
      }
    };
    
    // Validate existing listings when not using live data
    const validateExistingListings = () => {
      // Filter listings to ensure they have required fields
      const validListings = diverseListings.filter(listing => 
        listing && 
        listing.id && 
        (listing.title || listing.company) &&
        listing.location &&
        (listing.type === 'salon' || listing.type === 'opportunity' || listing.type === 'job')
      );
      
      if (validListings.length < diverseListings.length) {
        console.log(`⚠️ Filtered out ${diverseListings.length - validListings.length} invalid listings from Opportunities section`);
      }
      
      setValidatedListings(validListings);
    };
    
    fetchAndValidateListings();
  }, [diverseListings]);

  // Helper function to determine the correct route path for each listing
  const getListingPath = (listing: Job): string => {
    // Debug: Log the ID to verify it's correct (DEV only)
    console.log(`Routing to listing ${listing.id} with type ${listing.type}`);
    
    // Use explicit type check for routing to ensure we always have a valid path
    if (listing.type === 'salon') {
      return `/salons/${listing.id}`;
    } else {
      // Default to opportunities for anything else
      return `/opportunities/${listing.id}`;
    }
  };

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
            // Loading placeholders
            Array(3).fill(0).map((_, index) => (
              <div key={`loading-${index}`} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
            ))
          ) : validatedListings.length > 0 ? (
            validatedListings.map((listing, index) => {
              // Get the correct link path
              const linkPath = getListingPath(listing);
              
              return (
                <AuthAction
                  key={`${listing.id}-${index}`}
                  onAction={() => true}
                  redirectPath={linkPath}
                  customTitle="Sign in to view full details"
                  creditMessage="Create a free account to access contact information and more details."
                >
                  <OpportunityCard 
                    key={listing.id} 
                    listing={listing} 
                    index={index}
                  />
                </AuthAction>
              );
            })
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
