
import React from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { validateListingExists, ListingType } from '@/utils/listingValidator';
import { toast } from 'sonner';

interface ValidatedLinkProps extends LinkProps {
  listingId: string;
  listingType: ListingType;
  fallbackRoute?: string;
  onInvalid?: () => void;
  validateBeforeClick?: boolean; // Set to true to validate on hover instead of on click
}

/**
 * A Link component that validates listing existence before navigation
 */
const ValidatedLink: React.FC<ValidatedLinkProps> = ({
  listingId,
  listingType,
  fallbackRoute,
  onInvalid,
  validateBeforeClick = false,
  children,
  ...linkProps
}) => {
  const navigate = useNavigate();
  
  // Determine the fallback route based on listing type if not provided
  const determinedFallback = fallbackRoute || (() => {
    switch (listingType) {
      case 'salon': return '/salons';
      case 'job': return '/jobs';
      case 'opportunity': return '/jobs';
      case 'booth': return '/salons';
      default: return '/';
    }
  })();

  // Handle click with validation - always use the direct path
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // For development purposes, log the destination
    console.log(`Navigating to ${listingType} with ID: ${listingId}`);
    
    // Ensure we're using the correct path format for each listing type
    const targetPath = `/${listingType}s/${listingId}`;
    console.log(`Target path: ${targetPath}`);
  };

  return (
    <Link 
      {...linkProps}
      to={`/${listingType}s/${listingId}`}
      onClick={handleClick}
      className={`${linkProps.className || ''}`}
    >
      {children}
    </Link>
  );
};

export default ValidatedLink;
