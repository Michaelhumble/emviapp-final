
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Lock, Calendar } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { isLashBrowJob, getLashBrowJobImage } from '@/utils/lashBrowSalonImages';
import { isMassageJob, getMassageJobImage } from '@/utils/massageSalonImages';
import { isNailJob, NAIL_SALON_IMAGES, getNailJobImage } from '@/utils/nailSalonImages';
import { getBarberJobImage, isBarberJob } from '@/utils/barberShopImages';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  // Determine job type with priority order
  const isNailTechJob = isNailJob(listing.title || '', listing.description || '');
  const isBarberShopJob = !isNailTechJob && isBarberJob(listing.title || '', listing.description || '');
  const isLashJob = !isNailTechJob && !isBarberShopJob && isLashBrowJob(listing.title || '', listing.description || '') && 
                   (listing.title || '').toLowerCase().includes('lash');
  const isBrowJob = !isNailTechJob && !isBarberShopJob && !isLashJob && 
                    isLashBrowJob(listing.title || '', listing.description || '') && 
                   (listing.title || '').toLowerCase().includes('brow');
  const isMassageTherapistJob = !isNailTechJob && !isBarberShopJob && !isLashJob && !isBrowJob && 
                               isMassageJob(listing.title || '', listing.description || '');
  
  // Get appropriate image for the job type with better image selection
  let jobImage = '';
  
  if (isNailTechJob) {
    // For nail jobs, select a high-quality image based on index for variety
    const nailJobImages = [
      NAIL_SALON_IMAGES.artGallery,
      NAIL_SALON_IMAGES.executiveNails,
      NAIL_SALON_IMAGES.minimalist,
      NAIL_SALON_IMAGES.modernDeluxe,
      "/lovable-uploads/0bc39cbb-bdd3-4843-ace0-3cf730af576f.png",  // Added new nail image
      "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",  // Added new nail image
      "/lovable-uploads/1bc30225-0249-44a2-8086-c0a8ecbd57c2.png"   // Added new nail image
    ];
    jobImage = nailJobImages[index % nailJobImages.length];
  } else if (isBarberShopJob) {
    jobImage = getBarberJobImage(true); // Force premium barber image
  } else if (isLashJob) {
    jobImage = getLashBrowJobImage(true);
  } else if (isBrowJob) {
    jobImage = getLashBrowJobImage(false);
  } else if (isMassageTherapistJob) {
    jobImage = getMassageJobImage(true); // Force randomization for variety
  } else if (listing.title?.toLowerCase().includes('tattoo') || 
            (listing.description || '').toLowerCase().includes('tattoo')) {
    // Tattoo specific images
    jobImage = "/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png";
  } else if (listing.title?.toLowerCase().includes('beauty supply') || 
            listing.title?.toLowerCase().includes('retail')) {
    // Beauty retail specific images
    jobImage = "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png";
  } else if (listing.for_sale) {
    // For business listings for sale
    const saleImages = [
      "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png",
      "/lovable-uploads/179dbed5-2209-4b12-8e72-ef20d1818d46.png",
      "/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png"
    ];
    jobImage = saleImages[index % saleImages.length];
  } else {
    // Generic beauty industry images as fallback - never show blank
    const genericImages = [
      "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png",
      "/lovable-uploads/11d11587-a1b4-4f8f-a93b-b792a672b16b.png",
      "/lovable-uploads/15bcad43-8797-40ed-ae8f-96eedb447b8f.png",
      "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png", 
      "/lovable-uploads/072ab653-428c-4ec9-bd87-1bd6658d82de.png"
    ];
    jobImage = genericImages[index % genericImages.length];
  }

  // Store the image URL in the job object for detail view consistency
  if (jobImage && !listing.imageUrl) {
    listing.imageUrl = jobImage;
  }

  const handleViewDetails = () => {
    if (listing.id) {
      // Determine the correct route based on listing type
      const route = listing.type === 'salon' ? 
                   `/salons/${listing.id}` : 
                   `/opportunities/${listing.id}`;
      navigate(route);
    }
  };

  return (
    <Card 
      className="group overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-white"
      onClick={handleViewDetails}
    >
      <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center relative">
        <ImageWithFallback
          src={jobImage}
          alt={listing.title || (
            isNailTechJob ? "Nail Technician Job" :
            isBarberShopJob ? "Barber Job" :
            isLashJob ? "Lash Artist Job" : 
            isBrowJob ? "Brow Specialist Job" : 
            isMassageTherapistJob ? "Massage Therapist Job" : 
            "Industry Opportunity"
          )}
          className="h-full w-full object-cover"
          priority={true}
          fallbackImage={jobImage} // Add fallback for reliability
        />
        
        {listing.is_featured && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-white/90 text-primary shadow-sm"
          >
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-xl text-gray-900 line-clamp-2 flex-grow">
            {listing.title || listing.company}
          </h3>
          {listing.for_sale && (
            <Badge variant="secondary" className="ml-2 bg-emvi-accent/10 text-emvi-accent whitespace-nowrap">
              For Sale
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Building className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{listing.company}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Posted {formatDate(listing.created_at)}</span>
          </div>
        </div>
        
        {listing.specialties && listing.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {listing.specialties.slice(0, 3).map((specialty, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="bg-gray-50/50 text-gray-600 border-gray-200"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-grow">
          {listing.vietnamese_description || listing.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          {!isSignedIn ? (
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Sign in to view contact details</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <p className="text-sm text-gray-600">
                  Create a free account to access full listing details and contact information.
                </p>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary-dark w-full justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              View Full Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
