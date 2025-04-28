import { DollarSign, MapPin, Calendar, SquareDot, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SalonDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  salon: {
    id: number;
    name: string;
    location: string;
    price: number;
    monthlyRent: number;
    staff: number;
    revenue: number;
		size: string;
    willTrain: boolean;
    description: {
      vi: string;
      en: string;
    };
  } | null;
}

export const SalonDetailsDialog = ({ isOpen, onOpenChange, salon }: SalonDetailsDialogProps) => {
  if (!salon) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPriceAnalysis = (salon: any) => {
    const marketAvg = 180000;
    const priceDiff = (salon.price - marketAvg) / marketAvg * 100;
    
    if (priceDiff < -10) {
      return {
        assessment: "Below market average",
        suggestion: "Potential good deal. Consider fast action.",
        color: "text-green-600"
      };
    } else if (priceDiff > 10) {
      return {
        assessment: "Above market average",
        suggestion: "Premium location or high-end clientele may justify price.",
        color: "text-orange-500"
      };
    } else {
      return {
        assessment: "At market average",
        suggestion: "Fair pricing for the area and business size.",
        color: "text-blue-500"
      };
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{salon.name}</DialogTitle>
          <DialogDescription className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {salon.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video bg-gray-200 mb-4 rounded-md overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt={salon.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-200 aspect-square rounded-md"></div>
              <div className="bg-gray-200 aspect-square rounded-md"></div>
              <div className="bg-gray-200 aspect-square rounded-md"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-xl font-serif mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" /> Asking Price
                </div>
                <div className="font-semibold">{formatPrice(salon.price)}</div>
                
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" /> Monthly Rent
                </div>
                <div>{formatPrice(salon.monthlyRent)}</div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Staff
                </div>
                <div>{salon.staff} people</div>
                
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" /> Monthly Revenue
                </div>
                <div>{formatPrice(salon.revenue)}</div>
                
								<div className="flex items-center">
                  <SquareDot className="h-4 w-4 mr-2" /> Size
                </div>
                <div>{salon.size}</div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Will Train
                </div>
                <div>{salon.willTrain ? "Yes" : "No"}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl font-serif mb-2">AI Price Analysis</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className={`font-semibold ${getPriceAnalysis(salon).color}`}>
                  {getPriceAnalysis(salon).assessment}
                </div>
                <p className="text-sm text-gray-600">{getPriceAnalysis(salon).suggestion}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-xl font-serif">Description</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="mb-2 text-gray-800">{salon.description.vi}</p>
                <p className="text-gray-600">{salon.description.en}</p>
              </div>
            </div>
            
            <Button className="w-full">Contact Seller</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
