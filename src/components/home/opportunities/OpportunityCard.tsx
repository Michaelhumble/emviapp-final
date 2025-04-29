
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Building, Star, Lock } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Job } from "@/types/job";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { isNailJob, isNailSalon, getNailSalonImage, getNailJobImage } from "@/utils/nailSalonImages";
import { isLashBrowJob, isLashSalon, getLashSalonImage } from '@/utils/lashBrowSalonImages';
import { isMassageJob, getMassageJobImage } from '@/utils/massageSalonImages';
import { isBarberJob, getBarberJobImage } from '@/utils/barberShopImages';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  const { isSignedIn } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Get the redirect path based on listing type
  const getListingPath = () => {
    if (listing.for_sale) {
      return `/salons/${listing.id}`;
    }
    return `/opportunities/${listing.id}`;
  };

  // Determine job type with priority order
  const isNailTechListing = isNailJob(listing.title || listing.company || '', listing.description || '');
  const isLashListing = !isNailTechListing && isLashBrowJob(listing.title || listing.company || '', listing.description || '') && 
    (listing.title || '').toLowerCase().includes('lash');
  const isLashSalonListing = !isNailTechListing && !isLashListing && isLashSalon(listing.title || listing.company || '', listing.description || '');
  const isBarberListing = !isNailTechListing && !isLashListing && !isLashSalonListing && 
    isBarberJob(listing.title || listing.company || '', listing.description || '');
  const isMassageListing = !isNailTechListing && !isLashListing && !isLashSalonListing && !isBarberListing && 
    isMassageJob(listing.title || listing.company || '', listing.description || '');
  
  // Get appropriate image based on listing type - ENHANCED LOGIC
  let listingImage = '';
  
  // First, check if the listing already has an assigned image
  if (listing.imageUrl && listing.imageUrl.includes('lovable-uploads')) {
    listingImage = listing.imageUrl;
  } 
  // Special cases based on exact listing titles
  else if (listing.title === "Nail Tech - Private Suite") {
    // Use new uploaded nail tech image
    listingImage = "/lovable-uploads/6d593f49-dc5d-4e4c-9685-87d13b4eb7ca.png";
  } 
  else if (listing.title === "Luxury Booth Rental") {
    // Use new uploaded luxury booth rental image
    listingImage = "/lovable-uploads/c53c9a68-de96-40d5-9284-c1cfbb878081.png";
  } 
  else if (listing.title === "Licensed Esthetician") {
    // Use new uploaded esthetician image
    listingImage = "/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png";
  } 
  else if (listing.title === "Experienced Tattoo Artist") {
    // Use new uploaded tattoo artist image
    listingImage = "/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png";
  }
  // Check for specific listing types
  else if (isNailTechListing) {
    listingImage = listing.for_sale ? getNailSalonImage() : getNailJobImage();
  } else if (isLashListing || isLashSalonListing) {
    listingImage = getLashSalonImage();
  } else if (isBarberListing) {
    listingImage = getBarberJobImage();
  } else if (isMassageListing) {
    listingImage = getMassageJobImage();
  } else if (listing.title?.toLowerCase().includes('tattoo') || 
            (listing.description || '').toLowerCase().includes('tattoo')) {
    // Generic tattoo specific images as fallback
    listingImage = "/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png";
  } else if (listing.title?.toLowerCase().includes('booth rental') || 
            (listing.description || '').toLowerCase().includes('booth rental')) {
    // Generic booth rental specific images as fallback
    listingImage = "/lovable-uploads/05b5cfda-2b58-4be2-ae65-315168048aa3.png";
  } else if (listing.title?.toLowerCase().includes('spa manager') || 
            (listing.description || '').toLowerCase().includes('spa manager')) {
    // Spa manager specific images
    listingImage = "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png";
  } else if (listing.title?.toLowerCase().includes('wellness') || 
            (listing.description || '').toLowerCase().includes('wellness')) {
    // Wellness studio images
    listingImage = "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png";
  } else {
    // Fall back to the generic categories system
    const category = determineSalonCategory(
      listing.description || '', 
      listing.title || listing.company || ''
    );
    listingImage = getDefaultSalonImage(category, !!listing.is_featured);
  }

  // Ensure we always have an image
  if (!listingImage) {
    // Ultimate fallback to high-quality beauty industry images
    const genericImages = [
      "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png",
      "/lovable-uploads/15bcad43-8797-40ed-ae8f-96eedb447b8f.png",
      "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png",
      "/lovable-uploads/072ab653-428c-4ec9-bd87-1bd6658d82de.png"
    ];
    const randomIndex = index % genericImages.length;
    listingImage = genericImages[randomIndex];
  }

  const handleViewDetails = () => {
    const path = getListingPath();
    if (!isSignedIn) {
      navigate(`/sign-in?redirect=${encodeURIComponent(path)}`);
      return;
    }
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card 
        className={`overflow-hidden border-gray-100 h-full flex flex-col transition-all duration-200 ${
          isHovered ? "shadow-md" : "shadow-sm"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={listingImage}
            alt={listing.title || listing.company || "Beauty Opportunity"}
            className="w-full h-full object-cover"
            fallbackImage={listingImage}
          />
        </div>
        
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-lg">{listing.title || listing.company}</h3>
            {listing.is_featured && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 mb-2 text-sm">
            {listing.company && listing.company !== listing.title && (
              <>
                <Building className="h-3.5 w-3.5 mr-1" />
                <span className="mr-3">{listing.company}</span>
              </>
            )}
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{listing.location}</span>
          </div>
          
          {listing.specialties && listing.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.specialties.slice(0, 2).map((specialty: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {listing.specialties.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{listing.specialties.length - 2} more
                </Badge>
              )}
            </div>
          )}
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-auto">
            {listing.description || "Contact for more information about this opportunity."}
          </p>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={handleViewDetails}>
              {isSignedIn ? (
                "View Details"
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-1" /> Sign in to View
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;
