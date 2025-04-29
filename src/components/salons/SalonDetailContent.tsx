
import React from 'react';
import { MapPin, DollarSign, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { isNailSalon, isNailJob, getNailSalonImage } from '@/utils/nailSalonImages';
import { isBarberShop, getBarberShopImage } from '@/utils/barberShopImages';
import { isHairSalon, getHairSalonImage } from '@/utils/hairSalonImages';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  const { isSignedIn } = useAuth();

  if (!salon) return null;

  // Check if this is a barbershop first (prioritize barber category)
  const isBarber = isBarberShop(salon.title || salon.company || '', salon.description || '');
  
  // Check if this is a hair salon second
  const isHair = !isBarber && isHairSalon(salon.title || salon.company || '', salon.description || '');
  
  // Finally check if this is a nail salon 
  const isNail = !isBarber && !isHair && (
    isNailSalon(salon.title || salon.company || '', salon.description || '') ||
    isNailJob(salon.title || salon.company || '', salon.description || '')
  );
  
  // IMPORTANT: Use the stored imageUrl from the salon object if available
  // Otherwise, use the correct image or fallback to the image property
  const imageUrl = salon.imageUrl || 
                  (isBarber ? getBarberShopImage(true, true) : 
                   isHair ? getHairSalonImage(true, true) :
                   isNail ? getNailSalonImage(false, true, true) : 
                   salon.image || '');
  
  // Format price as currency
  const formattedPrice = salon.price ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(parseFloat(salon.price)) : 'Price on request';
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <a href="/salons" className="text-primary hover:text-primary/80 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Salon Listings
        </a>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photos and Details */}
        <div className="lg:col-span-2">
          {/* Main Image - Use our high-quality salon images when appropriate */}
          <div className="bg-gray-200 rounded-xl overflow-hidden mb-6 aspect-video">
            {imageUrl ? (
              <ImageWithFallback
                src={imageUrl}
                alt={salon.company || (
                  isBarber ? 'Barbershop' :
                  isHair ? 'Hair Salon' :
                  isNail ? 'Nail Salon' : 'Salon'
                )}
                className="w-full h-full object-cover"
                priority={true}
              />
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
            {salon.salon_features && salon.salon_features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Salon Features</h2>
                <div className="flex flex-wrap gap-2">
                  {salon.salon_features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            >
              Contact Seller
            </Button>
            
            {!isSignedIn && (
              <div className="text-center text-sm text-gray-500">
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a> or <a href="/signup" className="text-primary hover:underline">
                  create an account
                </a> to contact the seller directly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailContent;
