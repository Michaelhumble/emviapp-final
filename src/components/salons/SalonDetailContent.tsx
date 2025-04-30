
import React, { useState } from 'react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, DollarSign, Calendar, SquareDot, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  const { user } = useAuth();
  const [showContact, setShowContact] = useState(false);

  if (!salon) return null;

  const handleContactReveal = () => {
    if (user) {
      setShowContact(true);
      toast.success("Contact information revealed");
    } else {
      toast.error("Please sign in to view contact information", {
        description: "Create an account or sign in to connect with this salon owner",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth/signin?redirect=" + encodeURIComponent(window.location.pathname)
        }
      });
    }
  };

  // Format price display with commas and dollar sign - Updated to handle string | number | undefined
  const formatPrice = (price: string | number | undefined) => {
    if (!price) return "Price not available";
    
    // If it's a string that might contain non-numeric characters
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
      : price;
    
    if (isNaN(numericPrice)) {
      return "Price not available";
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(numericPrice);
  };

  const displayedPrice = formatPrice(salon.price);
  
  // Get the creation date if available
  const creationDate = salon.created_at 
    ? new Date(salon.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : "Recently added";

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{salon.title || salon.company || "Salon for Sale"}</h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {salon.location || "Location not specified"}
            </span>
            
            <span className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {creationDate}
            </span>
            
            <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-700 hover:bg-orange-100">
              For Sale
            </Badge>
          </div>
          
          <div className="mb-8 w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {salon.image ? (
              <img 
                src={salon.image} 
                alt={salon.title || "Salon"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No image available
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">About This Salon</h2>
            {salon.description ? (
              <div className="prose max-w-none">
                <p className="text-gray-700">{salon.description}</p>
              </div>
            ) : (
              <p className="text-muted-foreground italic">No description available yet.</p>
            )}
          </div>
          
          {salon.salon_features && salon.salon_features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">Salon Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {salon.salon_features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <SquareDot className="h-4 w-4 mr-2 text-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-orange-600">{displayedPrice}</h2>
                <p className="text-sm text-muted-foreground">Asking Price</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                {showContact && salon.contact_info ? (
                  <div className="space-y-3">
                    <p className="font-medium">{salon.contact_info.owner_name || "Salon Owner"}</p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {salon.contact_info.phone || "Phone not available"}
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {salon.contact_info.email || "Email not available"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleContactReveal}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      Reveal Contact Info
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {user ? "Click to show seller details" : "Sign in required to view contact details"}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 pt-4">
                <Link to="/salons/post">
                  <Button variant="outline" className="w-full">
                    List Your Salon
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailContent;
