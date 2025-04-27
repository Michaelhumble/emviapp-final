
import React from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Globe, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonContactSectionProps {
  salon: Salon;
}

const SalonContactSection: React.FC<SalonContactSectionProps> = ({ salon }) => {
  return (
    <section className="max-w-5xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <MapPin className="h-5 w-5 mr-2 text-purple-600" />
            Find Us
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Preview */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4 aspect-video shadow-sm">
                <img 
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+9b87f5(${-73.856077},${40.848447})/${-73.856077},${40.848447},14,0/600x300?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbG9ta2JoZXkwYm80MmtwZ2RibjZiNGplIn0.SXjj3MdIiEVvrQYKjN2XFA`} 
                  alt={`Map of ${salon.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{salon.neighborhood || salon.city}</p>
                    <p className="text-xs text-gray-500">{salon.city}</p>
                  </div>
                </div>
                
                {salon.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                    <a 
                      href={`tel:${salon.phone}`} 
                      className="text-sm hover:text-purple-700 transition-colors"
                    >
                      {salon.phone}
                    </a>
                  </div>
                )}
                
                {salon.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                    <a 
                      href={`mailto:${salon.email}`} 
                      className="text-sm hover:text-purple-700 transition-colors"
                    >
                      {salon.email}
                    </a>
                  </div>
                )}
                
                {salon.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                    <a 
                      href={salon.website.startsWith('http') ? salon.website : `https://${salon.website}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-purple-700 transition-colors flex items-center"
                    >
                      {salon.website.replace(/^https?:\/\//, '')}
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                
                <Button 
                  className="mt-4 w-full sm:w-auto"
                  onClick={() => {
                    // Open in Google Maps
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.name + ' ' + salon.city)}`, '_blank');
                  }}
                >
                  Get Directions
                </Button>
              </div>
            </div>
            
            {/* Hours */}
            <div>
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2 text-purple-600" />
                <h3 className="font-semibold">Opening Hours</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(salon.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between border-b border-gray-100 pb-2">
                    <div className="font-medium capitalize text-sm">{day}</div>
                    <div className="text-sm">
                      {hours === 'Closed' ? (
                        <span className="text-red-500">Closed</span>
                      ) : (
                        hours
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Amenities */}
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {salon.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Payment Methods */}
              {salon.paymentMethods && salon.paymentMethods.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-sm mb-2">We Accept</h3>
                  <div className="flex flex-wrap gap-2">
                    {salon.paymentMethods.map((method, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonContactSection;
