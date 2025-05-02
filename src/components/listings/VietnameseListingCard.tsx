
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

interface VietnameseListingCardProps {
  listing: Job | Salon;
  onViewDetails: () => void;
}

const VietnameseListingCard = ({ listing, onViewDetails }: VietnameseListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const getCardImage = () => {
    // Get appropriate image for the listing
    let listingImage = 'imageUrl' in listing ? listing.imageUrl : '';
    
    // If no image, use a default one based on salon type
    if (!listingImage) {
      if ('salon_type' in listing && listing.salon_type) {
        switch(listing.salon_type.toLowerCase()) {
          case 'nail':
            return "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";
          case 'hair':
            return "/lovable-uploads/8c34a207-742d-484a-8967-d0eb8091cb96.png";
          case 'barber':
            return "/lovable-uploads/45fbe8fa-1758-43e5-a8b0-bbf55a601a41.png";
          case 'lash':
          case 'eyelash':
            return "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png";
          case 'spa':
          case 'massage':
            return "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png";
          default:
            return "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png";
        }
      }
      
      // Default to a nail salon image
      return "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";
    }
    
    return listingImage;
  };

  const handleViewDetails = () => {
    if (isSignedIn) {
      onViewDetails();
    } else {
      navigate("/sign-in");
    }
  };

  const formatPrice = () => {
    if ('price' in listing && listing.price) {
      const price = typeof listing.price === 'string' 
        ? listing.price 
        : `$${listing.price.toLocaleString()}`;
      return price;
    }
    
    if ('asking_price' in listing && listing.asking_price) {
      return `$${listing.asking_price}`;
    }
    
    return '';
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 h-full flex flex-col ${
        isHovered ? 'shadow-md' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="aspect-video overflow-hidden relative">
        <ImageWithFallback
          src={getCardImage()}
          alt={'title' in listing ? listing.title : ('name' in listing ? listing.name : "Listing")}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          category={'salon_type' in listing ? listing.salon_type : undefined}
        />
        {!isSignedIn && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/80 rounded-md py-1 px-2 backdrop-blur-sm">
              <Lock className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Sign in to view details</p>
            </div>
          </div>
        )}
        
        {/* For sale badge */}
        {'for_sale' in listing && listing.for_sale && (
          <Badge className="absolute top-2 right-2 bg-blue-600" variant="secondary">
            For Sale
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {'title' in listing ? listing.title : ('name' in listing ? listing.name : "Listing")}
        </h3>
        
        {/* Company name */}
        {'company' in listing && listing.company && (
          <div className="text-gray-600 mb-2 text-sm">
            {listing.company}
          </div>
        )}
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        
        {/* Price if available */}
        {formatPrice() && (
          <div className="flex items-center mb-3 text-sm">
            <DollarSign className="h-3.5 w-3.5 mr-1 text-green-600 flex-shrink-0" />
            <span className="font-medium text-green-700">{formatPrice()}</span>
          </div>
        )}
        
        {/* Description preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {listing.description}
        </p>
        
        {/* Posted time */}
        {'created_at' in listing && listing.created_at && (
          <div className="text-xs text-gray-500 mb-4 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
          </div>
        )}
        
        {/* CTA Button */}
        <Button 
          className="w-full" 
          onClick={handleViewDetails}
          variant={isSignedIn ? "default" : "secondary"}
        >
          {isSignedIn ? "View Details" : (
            <div className="flex items-center">
              <Lock className="h-3.5 w-3.5 mr-2" />
              <span>Sign In to View</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VietnameseListingCard;
