
import { useNavigate } from "react-router-dom";
import { SalonListing, Job } from "@/types/salon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, DollarSign, ArrowRight, Star } from "lucide-react";

interface SalonCardProps {
  salon: SalonListing | Job;
  featured?: boolean;
  index?: number;
  isExpired?: boolean;
  onViewDetails?: (salon: SalonListing | Job) => void;
}

const SalonCard = ({ salon, featured = false, index = 0, isExpired = false, onViewDetails }: SalonCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(salon);
    } else {
      navigate(`/salons/${salon.id}`);
    }
  };
  
  const formatPrice = (priceValue?: number | string, unit?: string) => {
    if (!priceValue) return "Not for sale";
    
    // Handle both string and number types
    let numericPrice: number;
    if (typeof priceValue === 'string') {
      // Extract numeric value from string
      numericPrice = parseFloat(priceValue.replace(/[^0-9.-]+/g, "") || "0");
    } else {
      numericPrice = priceValue;
    }
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
    
    if (unit === 'one-time') return formattedPrice;
    if (unit === 'monthly') return `${formattedPrice}/month`;
    if (unit === 'weekly') return `${formattedPrice}/week`;
    
    return formattedPrice;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'For Sale':
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case 'Booth Rental':
        return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
      case 'Full Salon':
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

  // Add animation delay for staggered entry
  const animationDelay = `${index * 150}ms`;

  // Get display name from either name or title property
  const getDisplayName = (): string => {
    if ('name' in salon && salon.name) {
      return salon.name;
    }
    if ('title' in salon && salon.title) {
      return salon.title;
    }
    if ('company' in salon && 'company' in salon) {
      return salon.company || '';
    }
    return "Salon Listing";
  };

  // Get price from either price or asking_price property
  const getPrice = (): string | number | undefined => {
    if ('price' in salon && salon.price !== undefined) {
      return salon.price;
    }
    if ('asking_price' in salon && salon.asking_price) {
      return salon.asking_price;
    }
    return undefined;
  };
  
  // Get price unit if available
  const getPriceUnit = (): string | undefined => {
    if ('priceUnit' in salon && typeof (salon as any).priceUnit === 'string') {
      return (salon as any).priceUnit;
    }
    return undefined;
  };

  const getType = (): string => {
    return (salon as any).type || 'Salon';
  };

  const getImage = (): string | undefined => {
    return (salon as any).image || salon.image_url;
  };

  const getFeatures = (): string[] | undefined => {
    return (salon as any).features || [];
  };

  const getShortDescription = (): string => {
    return (salon as any).shortDescription || salon.description || '';
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
        featured ? 'border-amber-200 shadow-amber-100/20' : ''
      } ${isExpired ? 'opacity-70' : ''}`}
      style={{ animationDelay }}
    >
      <div className="relative">
        {getImage() ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={getImage()}
              alt={getDisplayName()}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
        
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 text-white flex items-center gap-1 px-2 py-1">
              <Star className="h-3 w-3 fill-current" /> Featured
            </Badge>
          </div>
        )}
        
        {isExpired && (
          <div className="absolute inset-0 bg-gray-700 bg-opacity-40 flex items-center justify-center">
            <Badge className="bg-gray-800 text-white px-3 py-1">Expired</Badge>
          </div>
        )}
        
        <Badge 
          className={`absolute top-2 left-2 border ${getTypeColor(getType())}`}
        >
          {getType()}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <h3 
            className="font-playfair text-lg font-semibold mb-1 line-clamp-2 hover:cursor-pointer"
            onClick={handleViewDetails}
          >
            {getDisplayName()}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span>{salon.location}</span>
          </div>
          {getPrice() && (
            <div className="flex items-center text-green-700 font-medium">
              <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{formatPrice(getPrice(), getPriceUnit())}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {getShortDescription()}
        </p>
        
        {getFeatures() && getFeatures()!.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {getFeatures()!.slice(0, 3).map((feature, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs font-normal py-0"
              >
                {feature}
              </Badge>
            ))}
            {getFeatures()!.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs font-normal bg-gray-50 py-0"
              >
                +{getFeatures()!.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full font-medium"
          onClick={handleViewDetails}
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalonCard;
