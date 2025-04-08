
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { fetchSalonSaleById, formatCurrency } from "@/utils/salonSales";
import { formatDistanceToNow } from "date-fns";

interface SalonListingDetailProps {
  salon: SalonSale;
  onClose: () => void;
}

const SalonListingDetail = ({ salon, onClose }: SalonListingDetailProps) => {
  const [salonWithPhotos, setSalonWithPhotos] = useState<SalonSale | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalonDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchSalonSaleById(salon.id);
        if (data) {
          setSalonWithPhotos(data as SalonSale);
        }
      } catch (error) {
        console.error("Error loading salon details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSalonDetails();
  }, [salon.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{salon.salon_name}</DialogTitle>
          <DialogDescription className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {salon.city}, {salon.state}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          {/* Gallery */}
          <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
            {salonWithPhotos?.photos && salonWithPhotos.photos.length > 0 ? (
              <img
                src={salonWithPhotos.photos[0].photo_url}
                alt={salon.salon_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Store className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Thumbnail gallery if there are more photos */}
          {salonWithPhotos?.photos && salonWithPhotos.photos.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {salonWithPhotos.photos.slice(0, 4).map((photo) => (
                <div key={photo.id} className="aspect-square rounded-md overflow-hidden">
                  <img
                    src={photo.photo_url}
                    alt={salon.salon_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Price and details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Asking Price</h3>
              <div className="text-2xl text-primary font-bold">
                {formatCurrency(salon.asking_price)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Business Details</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="text-gray-600 w-1/2">Type:</span>
                  <span>{salon.business_type || "Salon"}</span>
                </div>
                {salon.size && (
                  <div className="flex items-center">
                    <span className="text-gray-600 w-1/2">Size:</span>
                    <span>{salon.size}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-gray-600 w-1/2">Listed:</span>
                  <span>{formatDate(salon.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div className="whitespace-pre-line bg-gray-50 p-4 rounded-md">
              {salon.description}
            </div>
          </div>

          {/* Tags and badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {salon.business_type && (
              <Badge variant="outline">{salon.business_type}</Badge>
            )}
            {salon.is_urgent && (
              <Badge className="bg-amber-400 hover:bg-amber-500">Urgent Sale</Badge>
            )}
            <Badge variant="outline">
              <Calendar className="h-3 w-3 mr-1" />
              Listed {formatDate(salon.created_at)}
            </Badge>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="sm:mr-auto"
          >
            Close
          </Button>
          <Button className="flex items-center">
            Contact Seller <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalonListingDetail;
