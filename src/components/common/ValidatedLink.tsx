
import React, { useState, useEffect } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { validateListingRoute } from '@/utils/runListingsVerification';
import { ListingType } from '@/utils/listingValidator';

interface ValidatedLinkProps extends LinkProps {
  listingId?: string;
  listingType?: ListingType;
  fallbackUrl?: string;
  preValidated?: boolean;
}

/**
 * A Link component that validates the destination before navigation
 * If the destination is invalid, it will redirect to a fallback URL
 */
const ValidatedLink: React.FC<ValidatedLinkProps> = ({
  to,
  listingId,
  listingType,
  fallbackUrl,
  preValidated = false,
  children,
  ...rest
}) => {
  const [actualTo, setActualTo] = useState<string | any>(to);
  const [isValidating, setIsValidating] = useState<boolean>(!preValidated);

  useEffect(() => {
    // If no validation is needed or already prevalidated, use the original URL
    if (!listingId || !listingType || preValidated) {
      setIsValidating(false);
      return;
    }

    const validateRoute = async () => {
      try {
        const isValid = await validateListingRoute(listingId, listingType);
        
        if (!isValid && fallbackUrl) {
          setActualTo(fallbackUrl);
        }
      } catch (error) {
        console.error('Error validating link:', error);
        if (fallbackUrl) {
          setActualTo(fallbackUrl);
        }
      } finally {
        setIsValidating(false);
      }
    };

    validateRoute();
  }, [listingId, listingType, fallbackUrl, preValidated]);

  // While validating, render a placeholder or the original link
  if (isValidating) {
    // You can render a loading state or just the children without the link
    return <span className="cursor-not-allowed opacity-70">{children}</span>;
  }

  return <Link to={actualTo} {...rest}>{children}</Link>;
};

export default ValidatedLink;
