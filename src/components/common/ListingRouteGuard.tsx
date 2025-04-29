
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateListingExists, ListingType } from '@/utils/listingValidator';

interface ListingRouteGuardProps {
  children: React.ReactNode;
  listingType: ListingType;
  loadingComponent?: React.ReactNode;
  idParam?: string; // URL parameter name, defaults to 'id'
  fallbackPath?: string; // Custom fallback path
}

/**
 * Component to validate listing route parameters before rendering children
 */
const ListingRouteGuard: React.FC<ListingRouteGuardProps> = ({
  children,
  listingType,
  loadingComponent,
  idParam = 'id',
  fallbackPath
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  
  // Get the ID from route params
  const id = params[idParam];
  
  // Default fallback paths based on listing type
  const getDefaultFallback = () => {
    switch (listingType) {
      case 'salon': return '/salon-not-found';
      case 'job':
      case 'opportunity': return '/opportunity-not-found';
      case 'booth': return '/booth-not-found';
      default: return '/not-found';
    }
  };

  useEffect(() => {
    async function validateRoute() {
      if (!id) {
        navigate(fallbackPath || getDefaultFallback());
        return;
      }
      
      try {
        setIsValidating(true);
        const exists = await validateListingExists(id, listingType);
        
        if (!exists) {
          navigate(fallbackPath || getDefaultFallback());
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating listing route:', error);
        navigate(fallbackPath || getDefaultFallback());
      } finally {
        setIsValidating(false);
      }
    }
    
    validateRoute();
  }, [id, listingType, navigate, fallbackPath]);
  
  // Show loading state while validating
  if (isValidating) {
    return loadingComponent || <div className="p-12 text-center">Validating listing...</div>;
  }
  
  // Only render children if the listing is valid
  return isValid ? <>{children}</> : null;
};

export default ListingRouteGuard;
