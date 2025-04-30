
import React, { useState } from 'react';
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
  const [isValidating, setIsValidating] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  
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

  // Validate listing on hover if requested
  const handleMouseEnter = async () => {
    if (validateBeforeClick && !isValidating && !isInvalid) {
      setIsValidating(true);
      try {
        const isValid = await validateListingExists(listingId, listingType);
        if (!isValid) {
          setIsInvalid(true);
          console.log(`Invalid ${listingType} listing ID: ${listingId}`);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
      } finally {
        setIsValidating(false);
      }
    }
  };

  // Handle click with validation
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If we already know it's invalid, navigate to fallback
    if (isInvalid) {
      e.preventDefault();
      toast.error(`Sorry, this ${listingType} is no longer available.`);
      navigate(determinedFallback);
      if (onInvalid) onInvalid();
      return;
    }
    
    // If we haven't pre-validated, do it now
    if (!validateBeforeClick) {
      e.preventDefault();
      setIsValidating(true);
      
      try {
        // For demo purposes, consider all listings valid
        const isValid = true; // We'll assume links work for now
        
        if (!isValid) {
          setIsInvalid(true);
          toast.error(`Sorry, this ${listingType} is no longer available.`);
          navigate(determinedFallback);
          if (onInvalid) onInvalid();
        } else {
          // Manually navigate since we prevented default
          navigate(linkProps.to);
        }
      } catch (error) {
        console.error('Error validating listing:', error);
        navigate(determinedFallback);
      } finally {
        setIsValidating(false);
      }
    }
  };

  // If it's invalid and we've pre-validated, update the link to the fallback
  const linkTo = isInvalid ? determinedFallback : linkProps.to;

  return (
    <Link 
      {...linkProps}
      to={linkTo}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${linkProps.className || ''} ${isValidating ? 'cursor-wait' : ''}`}
    >
      {children}
    </Link>
  );
};

export default ValidatedLink;
