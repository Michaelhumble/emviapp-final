
import React from 'react';
import { Job } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, Phone, Mail, Clock, DollarSign, Users, SquareFoot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  const { user } = useAuth();
  
  if (!salon) return null;
  
  const handleContactClick = () => {
    if (!user) {
      toast.error("Please sign in to view contact information", {
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login"
        }
      });
    } else {
      toast.success("Contact information is now visible below");
    }
  };
  
  // Format price with commas and dollar sign
  const formatPrice = (price: string | number | undefined) => {
    if (!price) return "Price not available";
    
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.-]+/g, "")) 
      : price;
      
    if (isNaN(Number(numericPrice))) return "Price not available";
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(numericPrice));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2">
          {/* Salon Hero Image - Full width on mobile and desktop */}
          <div className="w-full mb-6 rounded-xl overflow-hidden shadow-md">
            <div className="w-full h-[300px] md:h-[400px]">
              <ImageWithFallback 
                src={salon.image || ''} 
                alt={salon.title || salon.company || 'Salon image'} 
                className="w-full h-full object-cover" 
                businessName={salon.company}
                category={salon.salon_type}
                priority={true}
              />
            </div>
          </div>
          
          {/* Salon Details */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold mb-2">{salon.title || salon.company || 'Salon for Sale'}</h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location || 'Location not specified'}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div className="prose max-w-none">
                {salon.description ? (
                  <p>{salon.description}</p>
                ) : (
                  <p className="text-muted-foreground italic">No description available yet.</p>
                )}
                
                {salon.vietnamese_description && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="text-md font-medium mb-2">Vietnamese Description</h3>
                    <p>{salon.vietnamese_description}</p>
                  </div>
                )}
              </div>
              
              {/* Features/Amenities */}
              {salon.salon_features && salon.salon_features.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {salon.salon_features.map((feature, index) => (
                      <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Sidebar */}
        <div>
          {/* Price Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                {formatPrice(salon.asking_price || salon.price)}
              </div>
              
              <div className="space-y-4">
                {/* Salon Stats */}
                <div className="grid grid-cols-2 gap-y-3">
                  {salon.square_feet && (
                    <>
                      <div className="flex items-center text-sm">
                        <SquareFoot className="h-4 w-4 mr-2" /> Size
                      </div>
                      <div className="text-sm font-medium">{salon.square_feet} sq ft</div>
                    </>
                  )}
                  
                  {salon.number_of_stations && (
                    <>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" /> Stations
                      </div>
                      <div className="text-sm font-medium">{salon.number_of_stations}</div>
                    </>
                  )}
                  
                  {salon.monthly_rent && (
                    <>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" /> Monthly Rent
                      </div>
                      <div className="text-sm font-medium">{formatPrice(salon.monthly_rent)}</div>
                    </>
                  )}
                  
                  {salon.revenue && (
                    <>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" /> Revenue
                      </div>
                      <div className="text-sm font-medium">{formatPrice(salon.revenue)}</div>
                    </>
                  )}
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={handleContactClick}>
                Contact Seller
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Card - Conditionally show based on auth */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              {user ? (
                <div className="space-y-3">
                  {salon.contact_info?.owner_name && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{salon.contact_info.owner_name}</span>
                    </div>
                  )}
                  
                  {salon.contact_info?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${salon.contact_info.phone}`} className="hover:underline">
                        {salon.contact_info.phone}
                      </a>
                    </div>
                  )}
                  
                  {salon.contact_info?.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${salon.contact_info.email}`} className="hover:underline">
                        {salon.contact_info.email}
                      </a>
                    </div>
                  )}
                  
                  {!salon.contact_info?.owner_name && !salon.contact_info?.phone && !salon.contact_info?.email && (
                    <p className="text-muted-foreground italic">No contact information available yet.</p>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-secondary rounded-md text-center">
                  <p className="mb-3">Sign in to view contact information</p>
                  <Link to="/login">
                    <Button size="sm">Sign In</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailContent;
