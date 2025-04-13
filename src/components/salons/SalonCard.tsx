
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Grid, ExternalLink, Info, Home, Building, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import AuthGuard from "@/components/auth/AuthGuard";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export interface SalonCardProps {
  salon: Job;
  onViewDetails: (salon: Job) => void;
  index: number;
  isExpired?: boolean;
}

// Name replacement mapping to avoid legal issues
const nameReplacements: Record<string, string> = {
  "Pho 88": "Lotus Noodle House",
  "San Jose": "San Benito",
  "Kim's Nail & Spa": "Daisy & Co. Nail Studio",
  "Amy Nguyen": "Amber L.",
  "Trang's Studio": "Glowroom by Tara",
  "Anh Salon": "Honey & Clay Beauty Bar",
  "Happy Nails": "Serene Nail Boutique",
  "Lucky Nails": "Lush & Lovely Nails",
  "Perfect Nails": "Pristine Nail Artistry",
  "Luxury Nails": "Luminous Nail Bar",
  "Star Nails": "Stellar Beauty Lounge",
  "VIP Nails": "Velvet Touch Nail Spa"
};

// Replace potentially problematic business names
const sanitizeBusinessName = (name: string): string => {
  let sanitized = name;
  
  Object.entries(nameReplacements).forEach(([original, replacement]) => {
    sanitized = sanitized.replace(new RegExp(original, 'gi'), replacement);
  });
  
  return sanitized;
};

const SalonCard = ({ salon, onViewDetails, index, isExpired = false }: SalonCardProps) => {
  const { isSignedIn } = useAuth();
  
  // Sanitize business name and location
  const sanitizedCompany = sanitizeBusinessName(salon.company || "");
  const sanitizedLocation = sanitizeBusinessName(salon.location || "");
  
  // Function to format currency 
  const formatCurrency = (value?: string) => {
    if (!value) return "N/A";
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return numericValue ? `$${numericValue.toLocaleString()}` : value;
  };

  // Determine if this is a Vietnamese salon
  const isVietnameseSalon = salon.vietnamese_description || (salon.id && salon.id.startsWith('vn-salon'));

  return (
    <Card 
      className={`h-full flex flex-col ${isExpired ? 'opacity-70' : ''} transition-all duration-300 hover:shadow-md`}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <CardContent className="flex flex-col h-full p-4">
        <div className="mb-4">
          <ImageWithFallback
            src={salon.image}
            alt={sanitizedCompany || "Salon for Sale"}
            className="h-40 w-full object-cover rounded-md"
            fallbackImage="https://emvi.app/images/fallback-profile.jpg"
            businessName={sanitizedCompany}
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg font-serif">{sanitizedCompany || "Salon for Sale"}</h3>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              For Sale
            </Badge>
          </div>
          
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{sanitizedLocation || "Location not specified"}</span>
            </div>
            
            {salon.asking_price && (
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span>Asking: {formatCurrency(salon.asking_price)}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {salon.number_of_stations && (
                <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <span>{salon.number_of_stations} stations</span>
                </div>
              )}
              
              {salon.square_feet && (
                <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <span>{salon.square_feet} sq ft</span>
                </div>
              )}
              
              {salon.has_wax_room && (
                <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  <span>Wax Room</span>
                </div>
              )}
              
              {salon.has_housing && (
                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Home className="h-3 w-3 mr-1" />
                  <span>Housing</span>
                </div>
              )}
            </div>
          </div>
          
          {isVietnameseSalon && salon.vietnamese_description ? (
            <div className="mt-3 italic text-sm text-gray-700 line-clamp-2 bg-amber-50 px-2 py-1 rounded">
              {salon.vietnamese_description.split('.')[0]}.
            </div>
          ) : (
            <p className="mt-3 line-clamp-3 text-gray-600 text-sm">
              {salon.description}
            </p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          {isExpired ? (
            <div className="text-center text-amber-600 text-sm font-medium">
              This listing has expired
            </div>
          ) : (
            <AuthGuard
              requiresAuth={false}
              blurContent={false}
              fallback={
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => onViewDetails(salon)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Sign in to view details</span>
                </Button>
              }
            >
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => onViewDetails(salon)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="font-medium">View Details</span>
              </Button>
            </AuthGuard>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
