
import { useNavigate } from "react-router-dom";
import { SalonListing } from "@/types/salon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, DollarSign, ArrowRight, Star } from "lucide-react";

interface SalonCardProps {
  salon: SalonListing;
  featured?: boolean;
  index?: number;
}

const SalonCard = ({ salon, featured = false, index = 0 }: SalonCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/salons/${salon.id}`);
  };
  
  const formatPrice = (price?: number, unit?: string) => {
    if (!price) return "Not for sale";
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    
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

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
        featured ? 'border-amber-200 shadow-amber-100/20' : ''
      }`}
      style={{ animationDelay }}
    >
      <div className="relative">
        {salon.image ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={salon.image}
              alt={salon.name}
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
        
        <Badge 
          className={`absolute top-2 left-2 border ${getTypeColor(salon.type)}`}
        >
          {salon.type}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <h3 
            className="font-playfair text-lg font-semibold mb-1 line-clamp-2 hover:cursor-pointer"
            onClick={handleViewDetails}
          >
            {salon.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span>{salon.location}</span>
          </div>
          {salon.price && (
            <div className="flex items-center text-green-700 font-medium">
              <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{formatPrice(salon.price, salon.priceUnit)}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {salon.shortDescription || salon.description}
        </p>
        
        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {salon.features.slice(0, 3).map((feature, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs font-normal py-0"
              >
                {feature}
              </Badge>
            ))}
            {salon.features.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs font-normal bg-gray-50 py-0"
              >
                +{salon.features.length - 3} more
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
