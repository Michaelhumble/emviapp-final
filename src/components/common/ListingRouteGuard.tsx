
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingType } from '@/utils/listingValidator';
import { toast } from 'sonner';
import { validateListing } from '@/utils/routing/routeValidation';

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
 * Now uses the centralized validation utilities
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

  useEffect(() => {
    const validateListingRoute = async () => {
      if (!id) {
        console.log(`ListingRouteGuard: No ID parameter found`);
        if (notifyOnInvalid) {
          toast.error(`Invalid listing: missing ID parameter`);
        }
        navigate(fallbackRoute || '/not-found');
        return;
      }

      try {
        setIsValidating(true);
        console.log(`ListingRouteGuard: Validating ${listingType} with ID ${id}...`);
        
        // Use the centralized validation function
        const result = await validateListing(id, listingType);
        
        if (!result.isValid) {
          console.log(`ListingRouteGuard: Invalid ${listingType} ID ${id}`);
          if (notifyOnInvalid) {
            toast.error(`The requested ${listingType} listing could not be found`);
          }
          navigate(fallbackRoute || result.fallbackRoute);
        } else {
          console.log(`ListingRouteGuard: Valid ${listingType} ID ${id}`);
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
        if (notifyOnInvalid) {
          toast.error(`Error validating listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        navigate(fallbackRoute || '/not-found');
      } finally {
        setIsValidating(false);
      }
    };

    validateListingRoute();
  }, [id, listingType, navigate, fallbackRoute, notifyOnInvalid]);

  // Show loading component while validating
  if (isValidating) {
    return <>{loadingComponent || <div className="flex justify-center items-center p-8">Validating listing...</div>}</>;
  }

  // Only render children if the listing is valid
  return isValid ? <>{children}</> : null;
};

export default ListingRouteGuard;
