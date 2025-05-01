
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingType, validateListingExists, getListingFallbackRoute } from '@/utils/listingValidator';
import { toast } from '@/components/ui/use-toast';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

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

  useEffect(() => {
    const validateListingRoute = async () => {
      if (!id) {
        console.error(`ListingRouteGuard: No ID parameter found`);
        if (notifyOnInvalid) {
          toast({
            title: "Error",
            description: `Invalid listing: missing ID parameter`,
            variant: "destructive"
          });
        }
        navigate(fallbackRoute || getListingFallbackRoute(listingType));
        return;
      }

      try {
        setIsValidating(true);
        console.log(`ListingRouteGuard: Validating ${listingType} with ID ${id}...`);
        
        const exists = await validateListingExists(id, listingType);
        
        if (!exists) {
          console.log(`ListingRouteGuard: Invalid ${listingType} ID ${id}`);
          if (notifyOnInvalid) {
            toast({
              title: "Not Found",
              description: `The requested ${listingType} listing could not be found`,
              variant: "destructive"
            });
          }
          navigate(fallbackRoute || getListingFallbackRoute(listingType));
        } else {
          console.log(`ListingRouteGuard: Valid ${listingType} ID ${id}`);
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
        if (notifyOnInvalid) {
          toast({
            title: "Error",
            description: `Error validating listing: ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive"
          });
        }
        navigate(fallbackRoute || getListingFallbackRoute(listingType));
      } finally {
        setIsValidating(false);
      }
    };

    validateListingRoute();
  }, [id, listingType, navigate, fallbackRoute, notifyOnInvalid]);

  // Show loading component while validating
  if (isValidating) {
    return <>{loadingComponent || <SimpleLoadingFallback message={`Validating ${listingType}...`} />}</>;
  }

  // Only render children if the listing is valid
  return isValid ? <>{children}</> : null;
};

export default ListingRouteGuard;
