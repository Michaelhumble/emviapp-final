
import React from 'react';
import { motion } from 'framer-motion';
import { Salon } from '@/types/salon';
import OpportunityCard from './opportunities/OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { Job } from '@/types/job';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';

interface NailListingsSectionProps {
  nailSalons: Salon[];
}

const NailListingsSection = ({ nailSalons }: NailListingsSectionProps) => {
  const navigate = useNavigate();
  const { session, user } = useSession();

  const handleCardClick = (listing: Job | Salon): boolean | Promise<boolean> => {
    if (session) {
      // User is authenticated, navigate to the appropriate detail page
      const route = 'type' in listing && listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`;
      navigate(route);
      return true;
    }
    // If not authenticated, AuthAction component will handle showing the login modal
    return false;
  };

  // Convert Salon objects to compatible Job objects for OpportunityCard
  // Conditionally include sensitive data ONLY for authenticated users
  const jobListings = nailSalons.map(salon => {
    // Base listing object with non-sensitive information
    const baseListing = {
      id: salon.id,
      title: salon.name,
      company: salon.name,
      location: salon.location,
      created_at: salon.created_at || new Date().toISOString(),
      image: salon.imageUrl || salon.image,
      type: 'salon' as 'salon',
    };

    // If user is authenticated, include full details
    if (session && user) {
      return {
        ...baseListing,
        description: salon.description,
        price: typeof salon.price === 'number' ? salon.price.toString() : salon.price,
        contact_info: salon.contact_info
      };
    } 
    
    // For non-authenticated users, provide limited information
    return {
      ...baseListing,
      description: salon.description ? `${salon.description.substring(0, 80)}...` : 'Sign in to view full details.',
      price: undefined, // No price info for non-authenticated users
      contact_info: undefined // No contact info for non-authenticated users
    };
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Nail Salon Listings — Preview Spaces</h2>
        <p className="text-center text-gray-600 mb-12">Explore premium nail salon jobs and spaces. Listings opening soon.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleCardClick(listing)}
              redirectPath={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}
              customTitle="Sign in to view full details"
              creditMessage="Create a free account to access contact information and more details."
              fallbackContent={
                <OpportunityCard 
                  listing={{
                    ...listing,
                    hideLink: true,
                    // Non-authenticated users already have limited description from jobListings
                  }} 
                  index={index} 
                />
              }
              authenticatedContent={
                <OpportunityCard 
                  listing={listing} 
                  index={index} 
                />
              }
            >
              {/* Child element is only used as fallback if fallbackContent is not provided */}
              <OpportunityCard 
                listing={{
                  ...listing,
                  hideLink: true,
                }} 
                index={index} 
              />
            </AuthAction>
          ))}
        </div>
        
        {!session && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">🔒 Contact information is locked</p>
            <p className="text-sm text-gray-500">Sign in to view full details including contact information and prices</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NailListingsSection;
