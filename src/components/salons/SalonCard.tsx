import { ArrowRight, Building, Calendar, MapPin, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { determineSalonCategory } from "@/utils/salonImageFallbacks";

interface SalonCardProps {
  salon: {
    id: number;
    name: string;
    location: string;
    price: string | number;
    monthlyRent: number;
    staff: number;
    revenue: number;
    willTrain: boolean;
    featured: boolean;
    image?: string;
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
    // Convert price to number for comparison
    const priceNum = typeof salon.price === 'string' ? parseFloat(salon.price.replace(/[^0-9.]/g, '')) : salon.price;
    // Only calculate if we have a valid number
    const priceDiff = !isNaN(priceNum) ? (priceNum - marketAvg) / marketAvg * 100 : 0;
    
    if (priceDiff < -10) return { text: "Good Deal", color: "bg-green-100 text-green-800" };
    if (priceDiff > 10) return { text: "Premium", color: "bg-orange-100 text-orange-800" };
    return { text: "Fair Price", color: "bg-blue-100 text-blue-800" };
  })();

  // Format price to display properly regardless of string or number type
  const formatPrice = (price: string | number) => {
    // If already a string with $ sign, return as is
    if (typeof price === 'string' && price.includes('$')) return price;
    
    // Otherwise format as currency
    const priceNum = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(priceNum);
  }

  // Get salon image, always prioritizing the original image
  const salonImage = salon.image || (salon.images && salon.images.length > 0 ? salon.images[0] : '');

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative">
        <div className="aspect-video bg-gray-100 w-full overflow-hidden">
          <img 
            src={salonImage || "/images/fallback.png"} 
            alt={salon.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/fallback.png";
            }}
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
          <span className="font-bold text-lg whitespace-nowrap">{formatPrice(salon.price)}</span>
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
