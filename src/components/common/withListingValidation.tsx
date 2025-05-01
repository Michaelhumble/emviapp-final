
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateListingData, ListingType } from '@/utils/listingValidator';

interface WithListingValidationProps {
  id: string;
  listingType: ListingType;
  onInvalidListing?: () => void;
  fallbackRoute?: string;
  requireFields?: string[];
}

/**
 * HOC that wraps listing components with validation logic
 */
export function withListingValidation<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ValidatedComponent({
    id,
    listingType,
    onInvalidListing,
    fallbackRoute,
    requireFields = ['id', 'name', 'location'], // Common minimum fields
    ...props
  }: WithListingValidationProps & P) {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);

    // Handle click events on the listing
    const handleListingInteraction = (e: React.MouseEvent, targetUrl?: string) => {
      // If we're already determined it's invalid, redirect to fallback
      if (!isValid) {
        e.preventDefault();
        if (fallbackRoute) {
          navigate(fallbackRoute);
        } else {
          // Determine fallback based on listing type
          const defaultFallback = getDefaultFallback(listingType);
          navigate(defaultFallback);
        }
        return;
      }
      
      // Validate data before allowing navigation
      if (!validateListingData(props as any, requireFields)) {
        e.preventDefault();
        setIsValid(false);
        
        // Call onInvalidListing callback if provided
        if (onInvalidListing) {
          onInvalidListing();
        } else {
          // Navigate to appropriate fallback
          const fallback = fallbackRoute || getDefaultFallback(listingType);
          navigate(fallback);
        }
      }
    };
    
    // If the listing is already known to be invalid, show fallback content
    if (!isValid) {
      return <InvalidListingFallback listingType={listingType} />;
    }

    // Return the wrapped component with the click handler
    return (
      <div onClick={handleListingInteraction}>
        <WrappedComponent {...props as P} />
      </div>
    );
  };
}

/**
 * Get default fallback route based on listing type
 */
function getDefaultFallback(listingType: ListingType): string {
  switch (listingType) {
    case 'salon':
      return '/salon-not-found';
    case 'job':
    case 'opportunity':
      return '/opportunity-not-found';
    case 'booth':
      return '/booth-not-found';
    default:
      return '/not-found';
  }
}

/**
 * Simple fallback component for invalid listings
 */
function InvalidListingFallback({ listingType }: { listingType: ListingType }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-gray-500 text-center">This listing is no longer available</p>
    </div>
  );
}

/**
 * Utility function to safely access nested properties in a listing object
 */
export function safeGetListingProperty<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  fallback: T[K]
): T[K] {
  if (!obj) return fallback;
  return (obj[key] !== undefined && obj[key] !== null) ? obj[key] : fallback;
}
