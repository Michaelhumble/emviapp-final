
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, User, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSession } from '@/context/auth/hooks/useSession';
import { AuthAction } from '@/components/common/AuthAction';

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal: React.FC<SalonDetailModalProps> = ({ salon, isOpen, onClose }) => {
  const { session, user } = useSession();

  if (!salon) return null;

  // Create a filtered version of the salon data based on authentication state
  const filteredSalon = (() => {
    // Base listing with non-sensitive information
    const baseListing = {
      ...salon,
      description: salon.description 
        ? session && user 
          ? salon.description 
          : `${salon.description.substring(0, 60)}...`
        : 'No description available.',
    };

    // If user is authenticated, include full details
    if (session && user) {
      return {
        ...baseListing,
        price: salon.price,
        contact_info: salon.contact_info
      };
    }
    
    // For non-authenticated users, provide limited information
    return {
      ...baseListing,
      price: undefined, // No price info for non-authenticated users
      contact_info: undefined // No contact info for non-authenticated users
    };
  })();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold">{filteredSalon.title || filteredSalon.company || "Salon Listing"}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {filteredSalon.location && (
                <span className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {filteredSalon.location}
                </span>
              )}
              
              {filteredSalon.created_at && (
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(filteredSalon.created_at).toLocaleDateString()}
                </span>
              )}
              
              <Badge variant="outline" className="ml-auto">
                {filteredSalon.type === 'salon' ? 'Salon Space' : 'Job Opening'}
              </Badge>
            </div>
            
            {filteredSalon.image && (
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-6">
                <img 
                  src={filteredSalon.image} 
                  alt={filteredSalon.title || "Salon"} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{filteredSalon.description}</p>
              
              {!session && (
                <p className="text-orange-500 mt-2 text-sm font-medium">
                  🔒 Sign in to read full description
                </p>
              )}
            </div>
            
            {/* Features list if present */}
            {filteredSalon.salon_features && filteredSalon.salon_features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Salon Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredSalon.salon_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar - Right Side */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* Price */}
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">Price</h3>
                {filteredSalon.price ? (
                  <p className="text-xl font-bold text-orange-600">{filteredSalon.price}</p>
                ) : (
                  <p className="text-gray-500">
                    🔒 Sign in to view pricing
                  </p>
                )}
              </div>
              
              {/* Contact Info */}
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">Contact Information</h3>
                {filteredSalon.contact_info ? (
                  <div className="space-y-2">
                    {filteredSalon.contact_info.owner_name && (
                      <p className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        {filteredSalon.contact_info.owner_name}
                      </p>
                    )}
                    {filteredSalon.contact_info.phone && (
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {filteredSalon.contact_info.phone}
                      </p>
                    )}
                    {filteredSalon.contact_info.email && (
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        {filteredSalon.contact_info.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    🔒 Sign in to view contact info
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4">
                {session ? (
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Contact Seller
                  </Button>
                ) : (
                  <AuthAction
                    onAction={() => true}
                    customTitle="Sign in to view full details"
                    creditMessage="Create a free account to access contact information and more details."
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      View Full Details
                    </Button>
                  </AuthAction>
                )}
                
                <Button variant="outline" className="w-full mt-2" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
