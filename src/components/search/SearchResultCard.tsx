
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, MapPin, Clock, DollarSign, Briefcase, Scissors, Store, User } from 'lucide-react';
import { toast } from 'sonner';

interface SearchResultCardProps {
  item: any;
  type: string;
}

const SearchResultCard = ({ item, type }: SearchResultCardProps) => {
  const handleShare = () => {
    const url = `${window.location.origin}/${type}/${item.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const getIcon = () => {
    switch (type) {
      case 'job': return <Briefcase className="h-5 w-5" />;
      case 'salon': return <Store className="h-5 w-5" />;
      case 'service': return <Scissors className="h-5 w-5" />;
      case 'artist': return <User className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'job': return item.title;
      case 'salon': return item.salon_name;
      case 'service': return item.title;
      case 'artist': return item.full_name;
      default: return 'Unknown';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'job': return item.location;
      case 'salon': return item.location || item.address;
      case 'service': return item.users?.full_name || 'Artist';
      case 'artist': return item.role;
      default: return '';
    }
  };

  const getPrice = () => {
    switch (type) {
      case 'service': return item.price ? `$${item.price}` : null;
      case 'salon': return null;
      case 'job': return item.compensation_details || null;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getIcon()}
            <Badge variant="secondary" className="text-xs">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleShare}
            className="h-8 w-8 p-0"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {getTitle()}
        </h3>

        {getSubtitle() && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">
            {getSubtitle()}
          </p>
        )}

        {item.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description || item.content}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          {item.location && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
          )}
          
          {getPrice() && (
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <DollarSign className="h-4 w-4" />
              <span>{getPrice()}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            disabled
            title="Coming Soon"
          >
            {type === 'job' ? 'Apply' : type === 'service' ? 'Book Now' : 'Contact'}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            disabled
            title="Coming Soon"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultCard;
