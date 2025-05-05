
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
  const { session } = useSession();

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

  // Create preview-only listings with absolutely no sensitive data for non-authenticated users
  const previewListings = nailSalons.map(salon => {
    return {
      id: salon.id,
      title: salon.name,
      company: salon.name,
      location: salon.location,
      created_at: salon.created_at || new Date().toISOString(),
      image: salon.imageUrl || salon.image,
      type: 'salon' as 'salon',
      description: "🔒 Sign in to view full details",
      hideLink: true,
      // No sensitive fields included at all
    };
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Nail Salon Listings — Preview Spaces</h2>
        <p className="text-center text-gray-600 mb-12">Explore premium nail salon jobs and spaces. Listings opening soon.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleCardClick(listing)}
              redirectPath={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}
              customTitle="Sign in to view full details"
              creditMessage="Create a free account to access contact information and more details."
            >
              <OpportunityCard 
                listing={{
                  ...listing,
                  buttonText: "Sign In to View",
                }} 
                index={index} 
              />
            </AuthAction>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">🔒 Contact information is locked</p>
          <p className="text-sm text-gray-500">Sign in to view full details including contact information and prices</p>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
