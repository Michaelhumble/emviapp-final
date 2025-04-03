
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Phone, DollarSign, Users, Building, Ruler, 
  Mail, Home, Calendar, Check, Clock, Info 
} from "lucide-react";
import { Job } from "@/types/job";
import { Separator } from "@/components/ui/separator";

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal = ({ salon, isOpen, onClose }: SalonDetailModalProps) => {
  if (!salon) return null;
  
  const isExpired = false; // This would be determined by checking dates in a real implementation
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{salon.company}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div 
              className="h-64 rounded-md bg-center bg-cover"
              style={{ backgroundImage: `url(${salon.image})` }}
            ></div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Salon Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Asking: {salon.asking_price}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Rent: {salon.monthly_rent}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.square_feet} sqft</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.number_of_stations} stations</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Rev: {salon.revenue}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <div className="italic text-gray-700 mb-2">{salon.vietnamese_description}</div>
              <div className="text-gray-600">{salon.description}</div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {salon.salon_features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50">
                    {feature}
                  </Badge>
                ))}
                
                {salon.has_housing && (
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    <Home className="w-3 h-3 mr-1" />
                    Housing Available
                  </Badge>
                )}
                
                {salon.has_wax_room && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    <Check className="w-3 h-3 mr-1" />
                    Wax Room
                  </Badge>
                )}
                
                {salon.has_dining_room && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-800">
                    <Check className="w-3 h-3 mr-1" />
                    Dining Room
                  </Badge>
                )}
                
                {salon.has_laundry && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-800">
                    <Check className="w-3 h-3 mr-1" />
                    Washer/Dryer
                  </Badge>
                )}
                
                {salon.owner_will_train && (
                  <Badge variant="outline" className="bg-cyan-50 text-cyan-800">
                    <Check className="w-3 h-3 mr-1" />
                    Owner Will Train
                  </Badge>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Reason For Selling</h3>
              <div className="flex items-center">
                <Info className="w-4 h-4 mr-2 text-gray-500" />
                <span>{salon.reason_for_selling || "Not specified"}</span>
              </div>
            </div>
            
            <Separator />
            
            {!isExpired && (
              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  {salon.contact_info?.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{salon.contact_info.phone}</span>
                    </div>
                  )}
                  {salon.contact_info?.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{salon.contact_info.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            Listed on {new Date().toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            {!isExpired && (
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
