
import { Building, Calendar, DollarSign, MapPin, TrendingUp, Users, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { track } from '@/lib/telemetry';

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
    willTrain: boolean;
    description: {
      vi: string;
      en: string;
    };
    // Optional fields for expiry logic
    created_at?: string;
    status?: string;
  } | null;
}

export const SalonDetailsDialog = ({ isOpen, onOpenChange, salon }: SalonDetailsDialogProps) => {
  const { isSignedIn } = useAuth();
  
  if (!salon) return null;

  // Derived expired state: status==='active' && created_at within 30d
  const now = new Date();
  const createdAt = (salon as any).created_at ? new Date((salon as any).created_at) : null;
  const status = (salon as any).status ?? 'active';
  const isActive = status === 'active' && (createdAt ? (createdAt.getTime() > now.getTime() - 30 * 24 * 60 * 60 * 1000) : true);
  const isExpired = !isActive;

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
        
        {isExpired && (
          <div className="mb-4 rounded-lg border bg-muted/30 p-4">
            <h2 className="text-lg font-semibold">This listing is no longer available.</h2>
            <p className="text-sm text-muted-foreground mt-1">Recently sold. Sign in to see similar listings or post your salon for sale.</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => { window.location.href = '/auth/signin?redirect=/salons'; }}>Sign in to see similar</Button>
              <Button variant="outline" onClick={() => { track('salons_expired_detail_cta_click', { cta: 'post_listing', salon_id: salon.id }); window.location.href = '/salon-owners'; }}>Post a listing</Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video bg-gray-200 mb-4 rounded-md overflow-hidden">
              <img 
                src="/src/assets/beauty-salon-interior.jpg" 
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
            
            {isExpired ? (
              <div className="space-y-2">
                <Button className="w-full" onClick={() => { window.location.href = '/auth/signin?redirect=/salons'; }}>Sign in to see similar</Button>
                <Button variant="outline" className="w-full" onClick={() => { track('salons_expired_detail_cta_click', { cta: 'post_listing', salon_id: salon.id }); window.location.href = '/salon-owners'; }}>Post a listing</Button>
                <Button variant="outline" disabled className="w-full opacity-60 cursor-not-allowed">Contact Seller (Unavailable)</Button>
              </div>
            ) : isSignedIn ? (
              <Button className="w-full">Contact Seller</Button>
            ) : (
              <AuthAction
                customTitle="Sign in to contact seller"
                onAction={() => true}
                redirectPath="/marketplace"
                fallbackContent={
                  <Button variant="outline" className="w-full">
                    <LockIcon className="w-4 h-4 mr-2" />
                    Sign in to Contact Seller
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
