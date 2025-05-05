
import React from 'react';
import { motion } from 'framer-motion';
import { Salon } from '@/types/salon';
import OpportunityCard from './opportunities/OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { Job } from '@/types/job';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';

interface TattooListingsSectionProps {
  tattooStudios: Salon[];
}

const TattooListingsSection = ({ tattooStudios }: TattooListingsSectionProps) => {
  const navigate = useNavigate();
  const { session } = useSession();

  // Define the studio images using the uploaded images
  const tattooStudioImages = [
    "public/lovable-uploads/6af7cc02-b6cf-4c54-9c03-9510d543d3f1.png",  // Image 1
    "public/lovable-uploads/7af46f7a-c8f1-497f-a8e6-271856b882eb.png",  // Image 2  
    "public/lovable-uploads/cd91684d-63c1-444f-baea-5814694edf50.png",  // Image 3
    "public/lovable-uploads/f5696d4d-294d-42d6-b633-ab23dcacc6d2.png",  // Image 4
    "public/lovable-uploads/1d1e2a21-2e5b-452d-a583-57240e114a67.png",  // Image 5
  ];

  const handleCardClick = (listing: Job | Salon): boolean | Promise<boolean> => {
    if (session) {
      // User is authenticated, navigate to the appropriate detail page
      const route = 'type' in listing && listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`;
      navigate(route);
      return true;
    }
    // If not authenticated, AuthAction component will handle showing the login modal
    return true;
  };

  // Convert Salon objects to compatible Job objects for OpportunityCard
  // Use the new images in the mapping process
  const jobListings = tattooStudios.map((studio, index) => ({
    id: studio.id,
    title: studio.name,
    company: studio.name,
    location: studio.location,
    created_at: studio.created_at || new Date().toISOString(),
    description: studio.description,
    image: tattooStudioImages[index] || studio.imageUrl || studio.image, // Use the new image
    price: typeof studio.price === 'number' ? studio.price.toString() : studio.price,
    type: 'salon' as 'salon'
  }));

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Tattoo Listings — Preview Spaces</h2>
        <p className="text-center text-gray-600 mb-12">Discover top-rated tattoo studios and job opportunities. Listings opening soon.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleCardClick(listing)}
              redirectPath={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}
              customTitle="Sign in to view full details"
              creditMessage="Create a free account to access contact information and more details."
              // Pass the authenticated content prop to hide the link when not signed in
              fallbackContent={<OpportunityCard listing={{...listing, hideLink: true}} index={index} />}
              authenticatedContent={<OpportunityCard listing={listing} index={index} />}
            >
              <OpportunityCard listing={{...listing, hideLink: true}} index={index} />
            </AuthAction>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TattooListingsSection;
