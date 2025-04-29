import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { MapPin, DollarSign, Phone, Mail, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface SalonDetailsDialogProps {
  salon: Job | Salon | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailsDialog: React.FC<SalonDetailsDialogProps> = ({
  salon,
  isOpen,
  onClose,
}) => {
  if (!salon) return null;
  
  // Get the name/title depending on salon type
  const getName = () => {
    if ('name' in salon && salon.name) return salon.name;
    if ('title' in salon && salon.title) return salon.title;
    if ('company' in salon && salon.company) return salon.company;
    return 'Unnamed Salon';
  };

  // Get the image URL depending on salon type
  const getImageUrl = () => {
    if ('image' in salon && salon.image) return salon.image;
    if ('imageUrl' in salon && salon.imageUrl) return salon.imageUrl;
    return '';
  };

  // Get the formatted price with fallback
  const getFormattedPrice = () => {
    let price;
    
    if ('asking_price' in salon && salon.asking_price) {
      price = salon.asking_price;
    } else if ('price' in salon && salon.price) {
      price = salon.price;
    } else {
      return 'Contact for Price';
    }
    
    if (typeof price === 'string') {
      // If the price already has a $ sign, return it as is
      if (price.includes('$')) return price;
      // Otherwise, add the $ sign
      return `$${price}`;
    } else if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    
    return 'Contact for Price';
  };

  // Get features list
  const getFeaturesList = () => {
    if ('features' in salon && Array.isArray(salon.features)) return salon.features;
    if ('salon_features' in salon && Array.isArray(salon.salon_features)) return salon.salon_features;
    return [];
  };

  // Get contact info
  const getContactInfo = () => {
    if ('contact_info' in salon && salon.contact_info) {
      return {
        name: salon.contact_info.owner_name || 'Salon Owner',
        phone: salon.contact_info.phone || '',
        email: salon.contact_info.email || '',
      };
    }
    
    return {
      name: 'Salon Owner',
      phone: '',
      email: '',
    };
  };

  const name = getName();
  const imageUrl = getImageUrl();
  const price = getFormattedPrice();
  const features = getFeaturesList();
  const contact = getContactInfo();
  const postedDate = 'created_at' in salon && salon.created_at 
    ? formatDistanceToNow(new Date(salon.created_at), { addSuffix: true })
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{salon.location}</span>
              {postedDate && (
                <div className="flex items-center ml-4">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>Posted {postedDate}</span>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <div className="rounded-md overflow-hidden">
              <ImageWithFallback
                src={imageUrl}
                alt={name}
                className="w-full aspect-video object-cover"
                businessName={name}
              />
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-lg mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {'description' in salon && salon.description ? salon.description : 'No description available'}
              </p>
            </div>

            {features.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-lg mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="border rounded-lg p-4">
              <div className="flex items-center text-xl font-semibold text-emerald-700 mb-4">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>{price}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact</h4>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span>{contact.name}</span>
                  </div>
                </div>

                {contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1.5 text-gray-400" />
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="text-primary hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1.5 text-gray-400" />
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Link to={`/salons/${salon.id}`}>
            <Button>View Full Details</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailsDialog;
