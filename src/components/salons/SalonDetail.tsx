
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalonListing } from "@/types/salon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, DollarSign, Phone, Mail, ArrowLeft, Lock, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/auth";

interface SalonDetailProps {
  salon: SalonListing;
}

const SalonDetail = ({ salon }: SalonDetailProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isContactVisible, setIsContactVisible] = useState(false);
  
  useEffect(() => {
    // Show contact info only for logged-in users
    setIsContactVisible(!!user);
  }, [user]);
  
  const goBack = () => {
    navigate(-1);
  };
  
  const formatPrice = (price?: number, unit?: string) => {
    if (!price) return "Not for sale";
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    
    if (unit === 'one-time') return formattedPrice;
    if (unit === 'monthly') return `${formattedPrice}/month`;
    if (unit === 'weekly') return `${formattedPrice}/week`;
    
    return formattedPrice;
  };

  const handleInquire = () => {
    if (!user) {
      // Redirect to sign in page
      navigate('/sign-in', { state: { from: `/salons/${salon.id}` } });
      return;
    }
    
    // If user is logged in, show contact info or open a modal
    // For now, just scroll to contact section
    document.getElementById('contact-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 text-gray-600"
        onClick={goBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Salons
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-8">
            {salon.image ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-sm">No image available</span>
              </div>
            )}
            
            <div className="mb-2">
              <Badge className="mb-2">{salon.type}</Badge>
              <h1 className="font-playfair text-3xl font-semibold mb-2">{salon.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location}</span>
              </div>
              
              {salon.price && (
                <div className="flex items-center text-green-700 font-medium text-lg">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span>{formatPrice(salon.price, salon.priceUnit)}</span>
                </div>
              )}
            </div>
            
            {salon.features && salon.features.length > 0 && (
              <div className="flex flex-wrap gap-2 my-4">
                {salon.features.map((feature, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="py-1.5 px-3"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="mt-6 space-y-4">
              <h2 className="font-playfair text-xl font-semibold">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {salon.description}
              </p>
              
              {salon.established && (
                <p className="text-gray-700">
                  <strong>Established:</strong> {salon.established}
                </p>
              )}
              
              {salon.squareFeet && (
                <p className="text-gray-700">
                  <strong>Size:</strong> {salon.squareFeet} sq ft
                </p>
              )}
              
              {salon.chairs && (
                <p className="text-gray-700">
                  <strong>Stations/Chairs:</strong> {salon.chairs}
                </p>
              )}
            </div>
            
            <div id="contact-section" className="mt-8 pt-4 border-t">
              <h2 className="font-playfair text-xl font-semibold mb-4">Contact Information</h2>
              
              {isContactVisible ? (
                <div className="space-y-3">
                  {salon.contactName && (
                    <p className="text-gray-700">
                      <strong>Contact:</strong> {salon.contactName}
                    </p>
                  )}
                  
                  {salon.contactPhone && (
                    <p className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <a 
                        href={`tel:${salon.contactPhone}`} 
                        className="hover:text-primary"
                      >
                        {salon.contactPhone}
                      </a>
                    </p>
                  )}
                  
                  {salon.contactEmail && (
                    <p className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a 
                        href={`mailto:${salon.contactEmail}`} 
                        className="hover:text-primary"
                      >
                        {salon.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              ) : (
                <Card className="p-4 bg-gray-50 flex flex-col items-center justify-center text-center">
                  <Lock className="h-5 w-5 text-amber-500 mb-2" />
                  <h3 className="text-gray-700 font-medium mb-2">Contact information is hidden</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Sign in to view contact details and inquire about this listing
                  </p>
                  <Button 
                    onClick={() => navigate('/sign-in', { state: { from: `/salons/${salon.id}` } })}
                    size="sm"
                  >
                    Sign In
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-playfair text-lg font-medium">Interested in this listing?</h3>
                <p className="text-gray-600 text-sm">
                  Contact the owner for more details or to schedule a viewing.
                </p>
                
                <Button 
                  className="w-full"
                  onClick={handleInquire}
                >
                  {user ? 'Contact Now' : 'Sign In to Inquire'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Response typically within 24-48 hours
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t">
                <h4 className="font-medium text-sm mb-3">Listing Details</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{salon.type}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{salon.location}</span>
                  </li>
                  {salon.price && (
                    <li className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium">{formatPrice(salon.price, salon.priceUnit)}</span>
                    </li>
                  )}
                  {salon.established && (
                    <li className="flex justify-between">
                      <span className="text-gray-500">Established:</span>
                      <span className="font-medium">{salon.established}</span>
                    </li>
                  )}
                </ul>
              </div>
            </Card>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-sm"
                onClick={() => navigate('/salons')}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                See more salon listings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
