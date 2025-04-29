
import React, { useState, useEffect } from 'react';
import { Salon } from '@/types/salon';
import { Job } from '@/types/job';
import SimpleSalonCard from './SimpleSalonCard';
import { validateListingExists } from '@/utils/listingValidator';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ValidatedSalonCardProps {
  salon: Salon | Job;
  listingType?: 'salon' | 'job' | 'opportunity' | 'booth';
}

/**
 * A wrapper component that validates a salon listing before rendering it
 * If the listing is invalid, displays a placeholder "Listing Unavailable" card
 */
const ValidatedSalonCard: React.FC<ValidatedSalonCardProps> = ({ 
  salon, 
  listingType = 'salon'
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert Job to Salon if needed - ALWAYS PRESERVE ALL ORIGINAL IMAGES
  const convertedSalon: Salon = 'company' in salon ? {
    id: salon.id,
    name: salon.company || salon.title || 'Unnamed Salon',
    location: salon.location || '',
    price: typeof salon.price === 'number' ? salon.price : 
           typeof salon.price === 'string' ? parseFloat(salon.price) || 0 : 0,
    imageUrl: salon.image || salon.imageUrl || '', // Preserve original image
    description: salon.description || '',
    image: salon.image || salon.imageUrl || '', // Preserve original image
    featured: 'is_featured' in salon ? salon.is_featured : false
  } as Salon : {
    ...salon as Salon,
    // Ensure price is a number
    price: typeof salon.price === 'number' ? salon.price : 
           typeof salon.price === 'string' ? parseFloat(salon.price) || 0 : 0
  };

  useEffect(() => {
    const validateSalon = async () => {
      try {
        setIsLoading(true);
        // Only perform validation if we have an ID
        if (!salon.id) {
          setIsValid(false);
          return;
        }
        
        // Check if the listing exists
        const exists = await validateListingExists(salon.id, listingType);
        setIsValid(exists);
      } catch (error) {
        console.error('Error validating salon:', error);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    validateSalon();
  }, [salon.id, listingType]);
  
  // Show loading state while validating
  if (isLoading) {
    return (
      <Card className="overflow-hidden h-full border-dashed border-gray-200 opacity-70">
        <CardContent className="p-4 flex-1 flex flex-col items-center justify-center h-64">
          <div className="animate-pulse bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
        </CardContent>
      </Card>
    );
  }
  
  // If invalid, show placeholder card
  if (isValid === false) {
    return (
      <Card className="overflow-hidden h-full border-dashed border-gray-200 bg-gray-50">
        <CardContent className="p-4 flex-1 flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium text-center">Listing Unavailable</p>
          <p className="text-gray-400 text-sm text-center mt-1">This listing is no longer active</p>
        </CardContent>
      </Card>
    );
  }
  
  // If valid, render the actual salon card - WITH ORIGINAL IMAGES
  return <SimpleSalonCard salon={convertedSalon} />;
};

export default ValidatedSalonCard;
