import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { enhanceListingWithImage } from '@/utils/listingsVerification';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

/**
 * OpportunityCard displays job or salon listings with appropriate styling
 */
const OpportunityCard: React.FC<OpportunityCardProps> = ({ listing, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Special image mappings for specific titles - ensure all mappings are correct
  const getSpecialImage = (title: string): string | null => {
    const titleMappings: Record<string, string> = {
      "Nail Tech - Private Suite": "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
      "Luxury Booth Rental": "/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png",
      "Licensed Esthetician": "/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png",
      "Experienced Tattoo Artist": "/lovable-uploads/21d69945-acea-4057-9ff0-df824cd3c607.png"
    };
    
    return titleMappings[title] || null;
  };

  // Determine the appropriate image for the listing
  const getListingImage = () => {
    // Check for specific title-based images first
    if (listing.title) {
      const specialImage = getSpecialImage(listing.title);
      if (specialImage) return specialImage;
    }
    
    // If listing already has a valid image URL, use it
    if (listing.imageUrl && listing.imageUrl.includes('lovable-uploads')) {
      return listing.imageUrl;
    }
    
    // Otherwise use the image from the enhanced listing
    const enhancedListing = enhanceListingWithImage({ ...listing });
    return enhancedListing.imageUrl;
  };

  // Define motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: index * 0.1 
      } 
    }
  };

  // Format price for display
  const formatPrice = () => {
    if (listing.asking_price) {
      if (typeof listing.asking_price === 'string' && listing.asking_price.includes('$')) {
        return listing.asking_price;
      }
      return `$${listing.asking_price}`;
    }
    
    if (listing.price) {
      if (typeof listing.price === 'string' && listing.price.includes('$')) {
        return listing.price;
      }
      return `$${listing.price}`;
    }
    
    return listing.for_sale ? 'Contact for price' : '';
  };

  // Determine card link based on listing type and ensure it's valid
  const getCardLink = () => {
    if (!listing.id) {
      console.error('Listing is missing ID:', listing);
      return '#'; // Fallback for listings with no ID
    }
    
    if (!listing.type) {
      console.error('Listing is missing type:', listing);
      return `/opportunities/${listing.id}`; // Default fallback
    }
    
    // Log the link details for debugging
    const link = listing.type === 'salon' ? `/salons/${listing.id}` : `/opportunities/${listing.id}`;
    console.log(`Card link for ${listing.title || listing.company}:`, link);
    return link;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <div 
        className={`bg-white rounded-lg shadow-sm overflow-hidden h-full border border-gray-100 transition-all duration-300 ${isHovered ? 'shadow-md transform-gpu -translate-y-1' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={getCardLink()} className="block">
          <div className="w-full aspect-[5/3] overflow-hidden">
            <ImageWithFallback
              src={getListingImage()}
              alt={listing.title || listing.company || "Opportunity listing"}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              businessName={listing.company || ""}
              category={listing.specialties && listing.specialties.length > 0 ? listing.specialties[0] : undefined}
            />
          </div>
        </Link>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{listing.title}</h3>
            {listing.for_sale && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">For Sale</Badge>
            )}
          </div>
          
          {listing.company && (
            <div className="flex items-center text-gray-700 mb-1.5">
              <Briefcase className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-sm">{listing.company}</span>
            </div>
          )}
          
          {listing.location && (
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-sm">{listing.location}</span>
            </div>
          )}
          
          {listing.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{listing.description}</p>
          )}

          <div className="mt-3 flex items-center justify-between">
            {formatPrice() && (
              <div className="flex items-center font-medium text-emerald-700">
                <DollarSign className="h-4 w-4 mr-0.5 flex-shrink-0" />
                <span>{formatPrice()}</span>
              </div>
            )}
            
            <div className="text-xs text-gray-500 flex items-center ml-auto">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Posted recently</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OpportunityCard;
