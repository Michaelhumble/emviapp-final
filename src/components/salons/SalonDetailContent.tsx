
import React from 'react';
import { MapPin, DollarSign, Calendar, Clock, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { Link } from 'react-router-dom';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  const { userProfile, isSignedIn } = useAuth();

  if (!salon) return null;

  // Use correct image property based on what's available
  const imageUrl = salon.image || '';
  
  // Format price as currency
  const formattedPrice = salon.price ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(parseFloat(salon.price)) : 'Price on request';

  // Extract features
  const features = [...(salon.salon_features || []), ...(salon.features || [])];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/salons" className="text-primary hover:text-primary/80 flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Salon Listings
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photos and Details */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="bg-gray-200 rounded-xl overflow-hidden mb-6 aspect-video">
            {imageUrl ? (
              <img src={imageUrl} alt={salon.company || 'Salon'} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Salon Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
              {salon.company || 'Unnamed Salon'}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {salon.location}
            </div>
            
            <div className="border-b mb-4 pb-4">
              <div className="flex items-center text-primary text-xl md:text-2xl font-semibold">
                <DollarSign className="h-6 w-6 mr-1" />
                {formattedPrice}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {salon.description || 'No description available.'}
              </p>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Salon Features</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="flex items-center bg-gray-50">
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {salon.number_of_stations && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Stations</h3>
                  <p>{salon.number_of_stations}</p>
                </div>
              )}
              
              {salon.square_feet && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Square Footage</h3>
                  <p>{salon.square_feet} sq ft</p>
                </div>
              )}
              
              {salon.created_at && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Listed Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(salon.created_at).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-xl p-4 h-64 mb-6 flex items-center justify-center">
            <p className="text-gray-500">Map view of {salon.location}</p>
          </div>
        </div>
        
        {/* Right Column: Contact and CTA */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            {isSignedIn ? (
              <div className="space-y-4 mb-6">
                {salon.contact_info?.owner_name && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                    <p>{salon.contact_info.owner_name}</p>
                  </div>
                )}
                
                {salon.contact_info?.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p>{salon.contact_info.phone}</p>
                  </div>
                )}
                
                {salon.contact_info?.email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{salon.contact_info.email}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-center text-gray-600">
                  Sign in to view contact details
                </p>
              </div>
            )}
            
            <Button 
              className="w-full mb-4" 
              size="lg"
              onClick={() => window.location.href = `mailto:${salon.contact_info?.email || 'info@emviapp.com'}?subject=Inquiry about ${salon.company || 'your salon listing'}`}
            >
              Contact Seller
            </Button>
            
            {!isSignedIn && (
              <div className="text-center text-sm text-gray-500">
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link> or <Link to="/signup" className="text-primary hover:underline">
                  create an account
                </Link> to contact the seller directly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailContent;
