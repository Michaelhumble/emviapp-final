
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface OpportunityCardProps {
  listing: Job & { 
    hideLink?: boolean;
    buttonText?: string;
    descriptionPreview?: string;
  };
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  // Add comprehensive defensive checks for listing object
  if (!listing || typeof listing !== 'object') {
    console.warn('⚠️ [OPPORTUNITY-CARD] Invalid listing object:', listing);
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Invalid listing data</p>
      </div>
    );
  }

  // Ensure listing has minimum required fields
  if (!listing.id) {
    console.warn('⚠️ [OPPORTUNITY-CARD] Listing missing ID:', listing);
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Listing data missing ID</p>
      </div>
    );
  }

  // Format simple date display with null safety
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString || typeof dateString !== 'string') return 'Recently added';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video bg-gray-100">
          {(listing.image_url || listing.imageUrl || listing.image) ? (
            <ImageWithFallback 
              src={listing.image_url || listing.imageUrl || listing.image} 
              alt={listing.title || listing.company || "Beauty opportunity"} 
              className="w-full h-full object-cover"
              businessName={listing.title || listing.company}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-400 text-xl">No Image Available</span>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
              {listing.type === 'salon' ? 'Salon' : 
               listing.type === 'opportunity' ? 'Booth Rental' : 'Job Opening'}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-1">
            {(listing.title && typeof listing.title === 'string' ? listing.title : '') ||
             (listing.company && typeof listing.company === 'string' ? listing.company : '') || 
             "Untitled Opportunity"}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">
            {(listing.location && typeof listing.location === 'string' ? listing.location : '') || "Location not specified"}
          </p>
          
          {listing.price && typeof listing.price === 'string' && (
            <p className="text-sm text-orange-600 font-medium mb-2">
              {listing.price}
            </p>
          )}
          
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
            {(listing.descriptionPreview && typeof listing.descriptionPreview === 'string' ? listing.descriptionPreview : '') ||
             (listing.description && typeof listing.description === 'string' ? listing.description : '') || 
             "This opportunity is waiting to be discovered. Contact for more details."}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {listing.created_at ? formatDate(listing.created_at) : "Recently added"}
            </span>

            {!listing.hideLink && (
              <Link to={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}>
                <Button size="sm" variant="outline" className="gap-1">
                  <Eye className="h-3.5 w-3.5" /> View Details
                </Button>
              </Link>
            )}
            
            {listing.hideLink && (
              <Button size="sm" variant="outline" className="gap-1">
                <Eye className="h-3.5 w-3.5" /> {listing.buttonText || "More Info"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;
