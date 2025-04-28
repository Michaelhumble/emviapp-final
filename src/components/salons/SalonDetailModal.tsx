
import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  User, 
  Phone, 
  Mail,
  ArrowRight, 
  CalendarClock
} from "lucide-react";
import { Job } from "@/types/job";
import { useEffect as useEffectExperimental } from "react";
import { cn } from "@/lib/utils";
import { PremiumBadge } from "@/components/salons/PremiumBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal: React.FC<SalonDetailModalProps> = ({
  salon,
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // In a real app, this would check user authentication status
  useEffect(() => {
    // Simulated authentication check
    const checkAuth = () => {
      // This would normally check localStorage, cookies, or an auth context
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  if (!salon) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogin = () => {
    // In a real app, this would redirect to login
    // For demo purposes, we'll simulate logging in
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Helper function to parse price string to number
  const parsePriceString = (priceString: string | undefined): number => {
    if (!priceString) return 0;
    // Remove non-numeric characters and parse as float
    const numericValue = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericValue) || 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] p-0">
        <div className="relative w-full aspect-video overflow-hidden">
          <ImageWithFallback
            src={salon.image || "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80"}
            alt={salon.company || "Salon"}
            fallbackImage="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80"
            className="w-full h-full object-cover"
          />
          {salon.is_featured && (
            <div className="absolute top-4 right-4">
              <PremiumBadge />
            </div>
          )}
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              {salon.company || "Unnamed Salon"}
            </DialogTitle>
            <DialogDescription className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {salon.location}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Price Section */}
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span className="text-xl font-semibold">
                {formatCurrency(parsePriceString(salon.asking_price))}
              </span>
            </div>

            {/* Posted Date */}
            <div className="flex items-center space-x-2 text-gray-600">
              <CalendarClock className="h-4 w-4" />
              <span>Listed {formatDate(salon.created_at || salon.posted_at || "")}</span>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {salon.description ||
                  "No detailed description provided for this listing."}
              </p>
            </div>

            {/* Salon Features */}
            {salon.salon_features && salon.salon_features.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Salon Features</h3>
                <div className="flex flex-wrap gap-2">
                  {salon.salon_features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 text-gray-600">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Salon Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {salon.square_feet && (
                <div className="border p-3 rounded-lg text-center">
                  <div className="text-gray-500 text-sm">Size</div>
                  <div className="font-medium">{salon.square_feet} sq ft</div>
                </div>
              )}
              
              {salon.number_of_stations && (
                <div className="border p-3 rounded-lg text-center">
                  <div className="text-gray-500 text-sm">Stations</div>
                  <div className="font-medium">{salon.number_of_stations}</div>
                </div>
              )}
              
              {salon.reason_for_selling && (
                <div className="border p-3 rounded-lg text-center col-span-2">
                  <div className="text-gray-500 text-sm">Reason for Selling</div>
                  <div className="font-medium">{salon.reason_for_selling}</div>
                </div>
              )}
            </div>

            {/* Contact Information (Gated) */}
            <div className={cn(
              "border rounded-lg p-4",
              isAuthenticated ? "bg-white" : "bg-gray-50"
            )}>
              <h3 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Contact Information
              </h3>
              
              {isAuthenticated ? (
                <div className="space-y-2">
                  {salon.contact_info?.owner_name && (
                    <div className="flex items-center">
                      <span className="font-medium w-24">Owner:</span>
                      <span>{salon.contact_info.owner_name}</span>
                    </div>
                  )}
                  
                  {salon.contact_info?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-600" />
                      <span>{salon.contact_info.phone}</span>
                    </div>
                  )}
                  
                  {salon.contact_info?.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-600" />
                      <span>{salon.contact_info.email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Alert className="bg-purple-50 border-purple-100">
                    <AlertDescription>
                      Sign in to view contact details and connect with the seller.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={handleLogin} 
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                  >
                    Sign In to View Contact Info
                  </Button>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="sm:mr-auto"
            >
              Close
            </Button>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            >
              Contact Seller <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
