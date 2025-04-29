
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
    if (listing.for_sale) {
      return `/salons/${listing.id}`;
    }
    return `/jobs/${listing.id}`;
  };

  // Determine if this is a lash/brow-related listing
  const isLashListing = listing.for_sale 
    ? isLashSalon(listing.title || listing.company || '', listing.description || '')
    : isLashBrowJob(listing.title || listing.company || '', listing.description || '') &&
      (listing.title || '').toLowerCase().includes('lash');
    
  const isBrowListing = listing.for_sale 
    ? isBrowSalon(listing.title || listing.company || '', listing.description || '')
    : isLashBrowJob(listing.title || listing.company || '', listing.description || '') &&
      (listing.title || '').toLowerCase().includes('brow');
  
  // Determine if this is a nail-related listing (fallback)
  const isNailListing = !isLashListing && !isBrowListing && (
    listing.for_sale 
      ? isNailSalon(listing.title || listing.company || '', listing.description || '')
      : isNailJob(listing.title || listing.company || '', listing.description || '')
  );
    
  // Get appropriate image based on listing type
  let listingImage = '';
  if (isLashListing) {
    listingImage = listing.for_sale ? getLashSalonImage(true) : getLashBrowJobImage(true);
  } else if (isBrowListing) {
    listingImage = listing.for_sale ? getBrowSalonImage(true) : getLashBrowJobImage(false);
  } else if (isNailListing) {
    listingImage = listing.for_sale ? getNailSalonImage() : getNailJobImage();
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
        {/* Image section - Use our high-quality images when appropriate */}
        {isLashListing || isBrowListing || isNailListing ? (
          <div className="aspect-video w-full overflow-hidden">
            <ImageWithFallback
              src={listingImage}
              alt={listing.title || listing.company || (
                isLashListing ? "Lash Studio" :
                isBrowListing ? "Brow Studio" :
                "Nail Salon"
              )}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
        ) : (
          listing.image ? (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title || listing.company || "Industry listing"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
              <Building className="h-12 w-12 text-gray-300" />
            </div>
          )
        )}
        
        <CardContent className={`p-5 flex-1 flex flex-col ${!listing.image ? 'pt-6' : 'pt-5'}`}>
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-lg">{listing.title || listing.company}</h3>
            {listing.is_featured && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 mb-2 text-sm">
            {listing.company && (
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
            {isSignedIn ? (
              <Button variant="outline" className="w-full" onClick={handleViewDetails}>
                View Details
              </Button>
            ) : (
              <Button variant="outline" className="w-full" onClick={handleViewDetails}>
                <Lock className="h-4 w-4 mr-1" /> Sign in to View
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ListingCard;
