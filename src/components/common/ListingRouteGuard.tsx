
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateListingExists, ListingType } from '@/utils/listingValidator';
import { toast } from 'sonner';

interface ListingRouteGuardProps {
  children: ReactNode;
  listingType: ListingType;
  loadingComponent?: ReactNode;
  fallbackRoute?: string;
  notifyOnInvalid?: boolean;
}

/**
 * A route guard component that validates listing IDs before rendering children
 * Will redirect to a fallback route if the listing doesn't exist
 */
const ListingRouteGuard: React.FC<ListingRouteGuardProps> = ({ 
  children, 
  listingType,
  loadingComponent,
  fallbackRoute,
  notifyOnInvalid = false
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Determine fallback route based on listing type if not provided
  const determinedFallback = fallbackRoute || (() => {
    switch (listingType) {
      case 'salon': return '/salon-not-found';
      case 'job':
      case 'opportunity': return '/opportunity-not-found';
      case 'booth': return '/booth-not-found';
      default: return '/not-found';
    }
  })();

  useEffect(() => {
    const validateListing = async () => {
      if (!id) {
        console.log(`ListingRouteGuard: No ID parameter found, redirecting to ${determinedFallback}`);
        navigate(determinedFallback);
        if (notifyOnInvalid) {
          toast.error(`Invalid listing: missing ID parameter`);
        }
        return;
      }

      try {
        setIsValidating(true);
        console.log(`ListingRouteGuard: Validating ${listingType} with ID ${id}...`);
        const exists = await validateListingExists(id, listingType);
        
        if (!exists) {
          console.log(`ListingRouteGuard: Invalid ${listingType} ID ${id}, redirecting to ${determinedFallback}`);
          if (notifyOnInvalid) {
            toast.error(`The requested ${listingType} listing could not be found`);
          }
          navigate(determinedFallback);
        } else {
          console.log(`ListingRouteGuard: Valid ${listingType} ID ${id}`);
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
        if (notifyOnInvalid) {
          toast.error(`Error validating listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        navigate(determinedFallback);
      } finally {
        setIsValidating(false);
      }
    };

    validateListing();
  }, [id, listingType, navigate, determinedFallback, notifyOnInvalid]);

  // Show loading component while validating
  if (isValidating) {
    return <>{loadingComponent || <div className="flex justify-center items-center p-8">Validating listing...</div>}</>;
  }

  // Only render children if the listing is valid
  return isValid ? <>{children}</> : null;
};

export default ListingRouteGuard;
