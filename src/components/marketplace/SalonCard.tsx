
import { ArrowRight, Building, Calendar, MapPin, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-video bg-gray-200">
          <img 
            src="/placeholder.svg" 
            alt={salon.name} 
            className="w-full h-full object-cover"
          />
        </div>
        {salon.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" /> Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{salon.name}</h3>
          <span className="font-bold text-lg">{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(salon.price)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-3 w-3 mr-1" /> {salon.location}
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-gray-500" /> {salon.staff} Staff
          </div>
          <div className="flex items-center">
            <Building className="h-3 w-3 mr-1 text-gray-500" /> ${salon.monthlyRent}/mo
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-gray-500" /> ${salon.revenue/1000}k Revenue
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-500" /> {salon.willTrain ? "Will Train" : "No Training"}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
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
