
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateListingExists, ListingType } from '@/utils/listingValidator';

interface ListingRouteGuardProps {
  children: ReactNode;
  listingType: ListingType;
  loadingComponent?: ReactNode;
  fallbackRoute?: string;
}

/**
 * A route guard component that validates listing IDs before rendering children
 * Will redirect to a fallback route if the listing doesn't exist
 */
const ListingRouteGuard: React.FC<ListingRouteGuardProps> = ({ 
  children, 
  listingType,
  loadingComponent,
  fallbackRoute 
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
        navigate(determinedFallback);
        return;
      }

      try {
        setIsValidating(true);
        const exists = await validateListingExists(id, listingType);
        
        if (!exists) {
          navigate(determinedFallback);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
        navigate(determinedFallback);
      } finally {
        setIsValidating(false);
      }
    };

    validateListing();
  }, [id, listingType, navigate, determinedFallback]);

  // Show loading component while validating
  if (isValidating) {
    return <>{loadingComponent || <div>Validating listing...</div>}</>;
  }

  // Only render children if the listing is valid
  return isValid ? <>{children}</> : null;
};

export default ListingRouteGuard;
