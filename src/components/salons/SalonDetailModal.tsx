
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail,
  Calendar,
  SquareFoot,
  Users,
  TagIcon,
  Lock,
  Info,
  CheckCircle
} from "lucide-react";

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal: React.FC<SalonDetailModalProps> = ({ 
  salon, 
  isOpen, 
  onClose
}) => {
  const [showContact, setShowContact] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!salon) return null;

  // Format currency with proper handling for string prices
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Helper function to parse price string to number
  const parsePriceString = (priceString: string | undefined): number => {
    if (!priceString) return 0;
    // Remove non-numeric characters and parse as float
    const numericValue = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericValue) || 0;
  };

  // Get a formatted date
  const getFormattedDate = (dateStr: string | undefined) => {
    if (!dateStr) return "Recently";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleShowContact = () => {
    if (!isAuthenticated) {
      // In a real implementation, this would redirect to login/sign up
      alert("Please log in or sign up to view contact information.");
      // Simulating authentication for the demo
      setIsAuthenticated(true);
      return;
    }
    setShowContact(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] p-0">
        <div className="relative">
          {/* Salon image */}
          <div 
            className="w-full h-[240px] bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), 
              url(${salon.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80'})`
            }}
          >
            {salon.is_featured && (
              <Badge className="absolute top-4 right-4 bg-purple-600 text-white border-none">
                Featured Listing
              </Badge>
            )}
            
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-white text-2xl md:text-3xl font-playfair font-semibold">
                {salon.company || salon.title || "Salon For Sale"}
              </h2>
              <div className="flex items-center text-white/90 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span className="text-xl font-semibold">
                      {formatCurrency(parsePriceString(salon.asking_price))}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {salon.salon_type && (
                      <Badge variant="outline" className="bg-purple-50">
                        {salon.salon_type}
                      </Badge>
                    )}
                    
                    {salon.has_housing && (
                      <Badge variant="outline" className="bg-blue-50">
                        Housing Available
                      </Badge>
                    )}
                    
                    {salon.status && (
                      <Badge 
                        className={`${salon.status === 'active' ? 'bg-green-100 text-green-800' : 
                        salon.status === 'expired' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                      >
                        {salon.status.charAt(0).toUpperCase() + salon.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {salon.description || "Detailed description not available. Please contact the seller for more information about this salon opportunity."}
                  </p>
                  
                  {salon.vietnamese_description && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100">
                      <h4 className="text-sm font-semibold mb-1">Vietnamese Description</h4>
                      <p className="text-gray-700 text-sm">{salon.vietnamese_description}</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Salon Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salon.square_feet && (
                      <div className="flex items-center">
                        <SquareFoot className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Square Footage</p>
                          <p className="font-medium">{salon.square_feet}</p>
                        </div>
                      </div>
                    )}
                    
                    {salon.number_of_stations && (
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Stations</p>
                          <p className="font-medium">{salon.number_of_stations}</p>
                        </div>
                      </div>
                    )}
                    
                    {salon.created_at && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Posted On</p>
                          <p className="font-medium">{getFormattedDate(salon.created_at)}</p>
                        </div>
                      </div>
                    )}
                    
                    {salon.salon_type && (
                      <div className="flex items-center">
                        <TagIcon className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Salon Type</p>
                          <p className="font-medium">{salon.salon_type}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {salon.salon_features && Array.isArray(salon.salon_features) && salon.salon_features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {salon.salon_features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-gray-50 text-gray-700 px-3 py-1 rounded-full">
                          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-purple-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Information Section */}
              <div className="w-full md:w-72 md:shrink-0">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  {showContact ? (
                    <div className="space-y-4">
                      {salon.contact_info?.owner_name && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Owner</p>
                          <p className="font-medium">{salon.contact_info.owner_name}</p>
                        </div>
                      )}
                      
                      {salon.contact_info?.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-green-600" />
                          <a 
                            href={`tel:${salon.contact_info.phone}`} 
                            className="font-medium hover:text-purple-600 transition-colors"
                          >
                            {salon.contact_info.phone}
                          </a>
                        </div>
                      )}
                      
                      {salon.contact_info?.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          <a 
                            href={`mailto:${salon.contact_info.email}`}
                            className="font-medium hover:text-purple-600 transition-colors"
                          >
                            {salon.contact_info.email}
                          </a>
                        </div>
                      )}
                      
                      {salon.contact_info?.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-500 mb-1">Additional Notes</p>
                          <p className="text-sm">{salon.contact_info.notes}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-amber-500" />
                        <p className="text-gray-600 text-sm">Contact info is private</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-500" />
                        <p className="text-gray-600 text-sm">Sign in to view contact details</p>
                      </div>
                      
                      <Button 
                        onClick={handleShowContact}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        View Contact Info
                      </Button>
                      
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Your information will remain private
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-semibold mb-2">Interested in this salon?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Schedule a viewing or ask for more details about this opportunity.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Request More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
