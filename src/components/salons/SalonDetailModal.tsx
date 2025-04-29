
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Calendar, Clock, DollarSign } from "lucide-react";

interface SalonDetailsDialogProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailsDialog = ({
  salon,
  isOpen,
  onClose,
}: SalonDetailsDialogProps) => {
  if (!salon) {
    return null;
  }

  const formatPrice = (price: string | number | undefined): string => {
    if (!price) return 'Contact for price';
    
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    }
    
    return price.toString().includes('$') ? price : `$${price}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {salon.title || salon.company || "Salon Details"}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="mt-4">
          {/* Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
            <ImageWithFallback
              src={salon.image || ''}
              alt={salon.title || salon.company || "Salon image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{salon.location}</span>
              </div>
              {salon.price && (
                <div className="flex items-center mb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">{formatPrice(salon.price)}</span>
                </div>
              )}
              {salon.created_at && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Posted: {new Date(salon.created_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="mt-4 md:mt-0">
              {salon.contact_info && (
                <>
                  {salon.contact_info.phone && (
                    <Button variant="outline" className="mb-2 w-full">
                      <Phone className="h-4 w-4 mr-2" /> {salon.contact_info.phone}
                    </Button>
                  )}
                  {salon.contact_info.email && (
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" /> Contact via Email
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-line mb-6">
              {salon.description || "No description provided."}
            </p>
          </div>

          {/* Features */}
          {salon.salon_features && salon.salon_features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {salon.salon_features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA for interested buyers */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-2">Interested in this salon?</h3>
            <p className="text-gray-600 mb-4">
              Contact the owner directly to schedule a viewing or ask questions about this listing.
            </p>
            <Button className="w-full sm:w-auto">Contact Owner</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailsDialog;
