
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Grid, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SalonCardProps {
  salon: Job;
  onViewDetails: (salon: Job) => void;
  index: number;
  isExpired?: boolean;
}

const SalonCard = ({ salon, onViewDetails, index, isExpired = false }: SalonCardProps) => {
  // Function to format currency 
  const formatCurrency = (value?: string) => {
    if (!value) return "N/A";
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return numericValue ? `$${numericValue.toLocaleString()}` : value;
  };

  return (
    <Card 
      className={`h-full flex flex-col ${isExpired ? 'opacity-70' : ''}`}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <CardContent className="flex flex-col h-full p-4">
        <div className="mb-4">
          {salon.image ? (
            <div
              className="h-40 w-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${salon.image})` }}
            />
          ) : (
            <div className="h-40 w-full bg-gradient-to-r from-pink-100 to-blue-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{salon.company || "Salon for Sale"}</h3>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              For Sale
            </Badge>
          </div>
          
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{salon.location || "Location not specified"}</span>
            </div>
            
            {salon.asking_price && (
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span>Asking Price: {formatCurrency(salon.asking_price)}</span>
              </div>
            )}
            
            {salon.square_feet && (
              <div className="flex items-center text-gray-600">
                <Grid className="h-4 w-4 mr-2 text-gray-400" />
                <span>{salon.square_feet} sq ft</span>
              </div>
            )}
          </div>
          
          <p className="mt-3 line-clamp-3 text-gray-600 text-sm">
            {salon.description}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          {isExpired ? (
            <div className="text-center text-amber-600 text-sm font-medium">
              This listing has expired
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => onViewDetails(salon)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
