
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Lock, Calendar } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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

  const handleViewDetails = () => {
    if (listing.id) {
      navigate(`/opportunities/${listing.id}`);
    }
  };

  return (
    <Card 
      className="group overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-white"
      onClick={handleViewDetails}
    >
      <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center relative">
        <Building className="h-12 w-12 text-gray-200" />
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
