
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OpportunityCardProps {
  listing: Job & { 
    hideLink?: boolean;
  };
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  // Format simple date display
  const formatDate = (dateString: string) => {
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
          {listing.image ? (
            <img 
              src={listing.image} 
              alt={listing.title || listing.company || "Beauty opportunity"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-400 text-xl">No Image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white text-black hover:bg-white rounded-full">
                {listing.type === 'salon' ? 'Salon' : 
                 listing.type === 'opportunity' ? 'Booth Rental' : 'Job Opening'}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold line-clamp-2 mb-1">
            {listing.title || listing.company || "Untitled Opportunity"}
          </h3>
          
          <p className="text-sm text-gray-500 mb-2">
            {listing.location || "Location not specified"}
          </p>
          
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
            {listing.description || 
             "This opportunity is waiting to be discovered. Contact for more details."}
          </p>
          
          {/* Only show contact information if available */}
          {listing.contact_info && listing.contact_info.phone && (
            <p className="text-sm text-gray-700 mb-2">
              Contact: {listing.contact_info.phone}
            </p>
          )}
          
          {/* Only show price if available */}
          {listing.price && (
            <p className="text-sm font-medium text-gray-700 mb-2">
              {listing.price}
            </p>
          )}
          
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
                <Eye className="h-3.5 w-3.5" /> More Info
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;
