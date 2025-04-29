
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Building, Star, Lock } from "lucide-react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { isNailSalon, isNailJob, getNailSalonImage, getNailJobImage } from "@/utils/nailSalonImages";
import { isLashSalon, isBrowSalon, isLashBrowJob, getLashSalonImage, getBrowSalonImage, getLashBrowJobImage } from "@/utils/lashBrowSalonImages";
import { isMassageJob, getMassageJobImage } from '@/utils/massageSalonImages';
import { isBarberJob, getBarberJobImage } from '@/utils/barberShopImages';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ListingCardProps {
  listing: any;
  index: number;
}

const ListingCard = ({ listing, index }: ListingCardProps) => {
  const { isSignedIn } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Get the redirect path based on listing type
  const getListingPath = () => {
    if (listing.type === 'salon' || listing.for_sale) {
      return `/salons/${listing.id}`;
    }
    return listing.type === 'job' ? `/jobs/${listing.id}` : `/opportunities/${listing.id}`;
  };

  // Determine job type with priority order
  const isNailTechListing = listing.for_sale 
    ? isNailSalon(listing.title || listing.company || '', listing.description || '')
    : isNailJob(listing.title || listing.company || '', listing.description || '');

  const isLashListing = !isNailTechListing && listing.for_sale 
    ? isLashSalon(listing.title || listing.company || '', listing.description || '')
    : isLashBrowJob(listing.title || listing.company || '', listing.description || '') &&
      (listing.title || '').toLowerCase().includes('lash');
    
  const isBrowListing = !isNailTechListing && !isLashListing && listing.for_sale 
    ? isBrowSalon(listing.title || listing.company || '', listing.description || '')
    : isLashBrowJob(listing.title || listing.company || '', listing.description || '') &&
      (listing.title || '').toLowerCase().includes('brow');

  const isBarberListing = !isNailTechListing && !isLashListing && !isBrowListing && 
    (isBarberJob(listing.title || listing.company || '', listing.description || ''));
      
  const isMassageListing = !isNailTechListing && !isLashListing && !isBrowListing && !isBarberListing && 
    (isMassageJob(listing.title || listing.company || '', listing.description || ''));
  
  // Get appropriate image based on listing type - ensure we ALWAYS have an image
  let listingImage = '';
  
  if (isNailTechListing) {
    listingImage = listing.for_sale ? getNailSalonImage(false, true) : getNailJobImage();
  } else if (isLashListing) {
    listingImage = listing.for_sale ? getLashSalonImage(true) : getLashBrowJobImage(true);
  } else if (isBrowListing) {
    listingImage = listing.for_sale ? getBrowSalonImage(true) : getLashBrowJobImage(false);
  } else if (isBarberListing) {
    listingImage = getBarberJobImage(true);
  } else if (isMassageListing) {
    listingImage = getMassageJobImage(true);
  } else if (listing.title?.toLowerCase().includes('tattoo') || 
            (listing.description || '').toLowerCase().includes('tattoo')) {
    // Tattoo specific images
    listingImage = "/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png";
  } else {
    // Use high-quality beauty industry images as fallback
    const genericImages = [
      "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png",
      "/lovable-uploads/15bcad43-8797-40ed-ae8f-96eedb447b8f.png",
      "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png",
      "/lovable-uploads/072ab653-428c-4ec9-bd87-1bd6658d82de.png"
    ];
    const randomIndex = index % genericImages.length;
    listingImage = genericImages[randomIndex];
  }

  // Handle view details click with proper redirect
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
        {/* Image section - Always use high-quality images */}
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={listingImage}
            alt={listing.title || listing.company || (
              isNailTechListing ? "Nail Salon" :
              isLashListing ? "Lash Studio" :
              isBrowListing ? "Brow Studio" :
              isBarberListing ? "Barber Shop" :
              isMassageListing ? "Massage Spa" :
              "Beauty Business"
            )}
            className="w-full h-full object-cover"
            priority={true}
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

export default ListingCard;
