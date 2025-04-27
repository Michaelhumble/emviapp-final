
import React from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook 
} from 'lucide-react';

interface SalonContactSectionProps {
  salon: Salon;
}

const SalonContactSection: React.FC<SalonContactSectionProps> = ({ salon }) => {
  const openingHours = salon.hours ? salon.hours : {
    monday: '10:00 AM - 7:00 PM',
    tuesday: '10:00 AM - 7:00 PM',
    wednesday: '10:00 AM - 7:00 PM',
    thursday: '10:00 AM - 7:00 PM',
    friday: '10:00 AM - 8:00 PM',
    saturday: '9:00 AM - 6:00 PM',
    sunday: 'Closed'
  };
  
  const address = salon.location || '123 Main Street, Denver, CO 80202';
  
  // Format phone number for display
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };
  
  // Open Google Maps with the salon's location
  const openInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };
  
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <MapPin className="h-5 w-5 mr-2 text-purple-600" />
            Location & Contact
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Address</h3>
                <p className="text-gray-600">{address}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={openInMaps}
                >
                  Get Directions
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium mb-2">Contact Information</h3>
                {salon.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    <a 
                      href={`tel:${salon.phone}`} 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {formatPhone(salon.phone)}
                    </a>
                  </div>
                )}
                
                {salon.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    <a 
                      href={`mailto:${salon.email}`} 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {salon.email}
                    </a>
                  </div>
                )}
                
                {salon.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-500 mr-3" />
                    <a 
                      href={salon.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {salon.website.replace(/^https?:\/\//i, '')}
                    </a>
                  </div>
                )}
              </div>
              
              {salon.socialMedia && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-3">
                    {salon.socialMedia.instagram && (
                      <a 
                        href={salon.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-purple-100 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-gray-700" />
                      </a>
                    )}
                    {salon.socialMedia.facebook && (
                      <a 
                        href={salon.socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-purple-100 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-gray-700" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Hours of Operation</h3>
              <div className="space-y-2">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                    <span className="capitalize">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-purple-50 rounded-md">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 text-purple-700 mr-2" />
                  <span className="font-medium text-purple-700">Today's Hours</span>
                </div>
                <p className="text-purple-800">
                  {openingHours[new Date().toLocaleDateString('en-US', { weekday: 'lowercase' })] || 'Call for hours'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonContactSection;
