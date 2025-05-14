
import { ArrowRight, Building, Calendar, MapPin, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { determineSalonCategory } from "@/utils/salonImageFallbacks";

interface SalonCardProps {
  salon: {
    id: number;
    name: string;
    location: string;
    price: number;
    monthlyRent: number;
    staff: number;
    revenue: number;
    willTrain: boolean;
    featured: boolean;
    image?: string;
    photo?: string;
    images?: string[];
    description?: {
      en: string;
      vi: string;
    };
  };
  viewDetails: () => void;
}

export const SalonCard = ({ salon, viewDetails }: SalonCardProps) => {
  const priceAnalysis = (() => {
    const marketAvg = 180000;
    const priceDiff = (salon.price - marketAvg) / marketAvg * 100;
    
    if (priceDiff < -10) return { text: "Good Deal", color: "bg-green-100 text-green-800" };
    if (priceDiff > 10) return { text: "Premium", color: "bg-orange-100 text-orange-800" };
    return { text: "Fair Price", color: "bg-blue-100 text-blue-800" };
  })();

  // Get salon image, prioritizing photo field first
  const getSalonImage = () => {
    // First check the photo field, which is our standard
    if (salon.photo && salon.photo.trim() !== '') {
      return salon.photo;
    }
    
    // Then check image field
    if (salon.image && salon.image.trim() !== '') {
      return salon.image;
    }
    
    // If we have images array with valid URLs, use the first one
    if (salon.images && salon.images.length > 0 && salon.images[0].trim() !== '') {
      return salon.images[0];
    }
    
    // Only if no image exists, use appropriate fallback based on salon type
    const salonCategory = determineSalonCategory(
      salon.description?.en || '',
      salon.name
    );
    
    // Fallback to our global fallback
    return '/images/fallback.png';
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative">
        <div className="aspect-video bg-gray-100 w-full overflow-hidden">
          <ImageWithFallback 
            src={getSalonImage()} 
            alt={salon.name} 
            className="w-full h-full object-cover"
            businessName={salon.name}
            fallbackSrc="/images/fallback.png"
          />
        </div>
        {salon.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" /> Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{salon.name}</h3>
          <span className="font-bold text-lg whitespace-nowrap">{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(salon.price)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" /> 
          <span className="line-clamp-1">{salon.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" /> {salon.staff} Staff
          </div>
          <div className="flex items-center">
            <Building className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" /> ${salon.monthlyRent}/mo
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" /> ${salon.revenue/1000}k Revenue
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" /> {salon.willTrain ? "Will Train" : "No Training"}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`text-xs px-2 py-1 rounded-full ${priceAnalysis.color}`}>
            {priceAnalysis.text}
          </span>
          <Button variant="outline" size="sm" onClick={viewDetails}>
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
