
import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';

interface OpportunitiesSectionProps {
  diverseListings: Job[];
}

const OpportunitiesSection = ({ diverseListings }: OpportunitiesSectionProps) => {
  // Enhanced validation to ensure we only show valid listings with necessary data
  const validListings = diverseListings.filter(listing => 
    listing && 
    listing.id && 
    (listing.title || listing.company) &&
    listing.location &&
    // Additional validation to ensure listing has a type for proper routing
    (listing.type || 'salon')
  );
  
  // Log any issues with listings for debugging
  if (validListings.length < diverseListings.length) {
    console.log(`⚠️ Filtered out ${diverseListings.length - validListings.length} invalid listings from Opportunities section`);
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
          {validListings.length > 0 ? (
            validListings.map((listing, index) => (
              <div key={listing.id || index}>
                <ValidatedLink 
                  to={listing.type === 'salon' ? `/salons/${listing.id}` : `/opportunities/${listing.id}`}
                  listingId={listing.id}
                  listingType={listing.type || 'salon'}
                >
                  <OpportunityCard 
                    listing={listing} 
                    index={index}
                  />
                </ValidatedLink>
              </div>
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
