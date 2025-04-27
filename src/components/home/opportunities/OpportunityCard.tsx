
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Lock, Calendar } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  const { isSignedIn } = useAuth();
  
  // Format the created date to a more readable format
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

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer">
      {/* Add image if available */}
      {listing.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={listing.image}
            alt={listing.title || listing.company || "Opportunity"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{listing.title || listing.company}</h3>
          {listing.for_sale && (
            <Badge variant="secondary">For Sale</Badge>
          )}
        </div>
        
        <div className="flex items-center text-gray-500 mb-2 text-sm">
          <Building className="h-3.5 w-3.5 mr-1" />
          <span className="mr-3 line-clamp-1">{listing.company}</span>
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3 text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Posted {formatDate(listing.created_at)}</span>
        </div>
        
        {listing.specialties && listing.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.specialties.slice(0, 2).map((specialty, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            
            {listing.specialties.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{listing.specialties.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {listing.vietnamese_description || listing.description}
        </p>

        <CardFooter className="px-0 pt-3 pb-0 mt-auto border-t border-gray-50">
          {!isSignedIn ? (
            <div className="flex items-center text-sm text-gray-500 w-full justify-between">
              <Lock className="h-3.5 w-3.5 mr-1" />
              <span className="flex-grow">Sign in to view contact details</span>
              <Button variant="ghost" size="sm" className="text-primary ml-2">
                View Details
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" className="text-primary ml-auto">
              View Details
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
