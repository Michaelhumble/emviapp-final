
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, MapPin } from 'lucide-react';
import { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-gray-100">
        <img
          src={listing.image || '/placeholder.svg'}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              ${listing.price.toLocaleString()}
            </span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/listing/${listing.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
