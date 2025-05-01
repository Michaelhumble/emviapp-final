
import { DollarSign, MapPin, Calendar, SquareDot, Users, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Job } from "@/types/job"; // Import Job type

interface SalonDetailsDialogProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose: () => void; // Added onClose prop
  salon: Job | null;
}

export const SalonDetailsDialog = ({ isOpen, onOpenChange, onClose, salon }: SalonDetailsDialogProps) => {
  if (!salon) return null;

  const formatPrice = (price: string | number | undefined) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
    
    if (numericPrice === undefined || isNaN(Number(numericPrice))) {
      return 'Price not available';
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(numericPrice));
  };

  const getPriceAnalysis = (salon: Job) => {
    const askingPrice = typeof salon.asking_price === 'string' 
      ? parseFloat(salon.asking_price.replace(/[^0-9.-]+/g, ""))
      : salon.asking_price;
    
    // Default market average if we can't determine salon price
    const marketAvg = 180000;
    
    // If we can't determine price, return default assessment
    if (askingPrice === undefined || isNaN(Number(askingPrice))) {
      return {
        assessment: "Market average estimate",
        suggestion: "Contact seller for detailed financial information.",
        color: "text-blue-500"
      };
    }

    const priceDiff = (Number(askingPrice) - marketAvg) / marketAvg * 100;
    
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

  // Get staff count or default to "Not specified"
  const staffCount = salon.number_of_stations || 'Not specified';
  
  // Extract monthly rent or show not available
  const monthlyRent = salon.monthly_rent || 'Not available';
  
  // Extract revenue or show not available
  const revenue = salon.revenue || 'Not available';
  
  // Extract square footage
  const size = salon.square_feet || 'Not specified';
  
  // Extract owner will train
  const willTrain = salon.owner_will_train !== undefined ? salon.owner_will_train : false;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
      if (onOpenChange) onOpenChange(open);
    }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{salon.company || salon.title || "Salon for Sale"}</DialogTitle>
          <DialogDescription className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {salon.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video bg-gray-200 mb-4 rounded-md overflow-hidden">
              {salon.image ? (
                <img 
                  src={salon.image} 
                  alt={salon.company || "Salon"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/placeholder.svg" 
                  alt={salon.company || "Salon"} 
                  className="w-full h-full object-cover"
                />
              )}
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
                <div className="font-semibold">{formatPrice(salon.asking_price)}</div>
                
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" /> Monthly Rent
                </div>
                <div>{formatPrice(monthlyRent)}</div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Staff
                </div>
                <div>{staffCount} stations</div>
                
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" /> Monthly Revenue
                </div>
                <div>{formatPrice(revenue)}</div>
                
                <div className="flex items-center">
                  <SquareDot className="h-4 w-4 mr-2" /> Size
                </div>
                <div>{size} sq ft</div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Will Train
                </div>
                <div>{willTrain ? "Yes" : "No"}</div>
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
                <p className="mb-2 text-gray-800">
                  {salon.vietnamese_description || ""}
                </p>
                <p className="text-gray-600">
                  {salon.description || "No description available"}
                </p>
              </div>
            </div>
            
            <Button className="w-full">Contact Seller</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add default export
export default SalonDetailsDialog;
