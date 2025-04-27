
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Lock } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  const { isSignedIn } = useAuth();

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
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
        
        {listing.specialties && listing.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.specialties.slice(0, 2).map((specialty, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {listing.vietnamese_description || listing.description}
        </p>

        {!isSignedIn && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Lock className="h-3.5 w-3.5 mr-1" />
            Sign in to view contact details
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
