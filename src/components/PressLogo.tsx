import React, { useState } from 'react';
import { getLogoSource } from '@/lib/pressLogoMap';
import { Building2 } from 'lucide-react';

interface PressLogoProps {
  publisherName: string;
  className?: string;
  href?: string;
  isClickable?: boolean;
}

const PressLogo: React.FC<PressLogoProps> = ({ 
  publisherName, 
  className = '', 
  href,
  isClickable = true 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const logoSrc = getLogoSource(publisherName);
  const isPlaceholder = logoSrc.includes('placeholder-logo.svg');

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Render fallback icon if error or placeholder
  const renderFallback = () => (
    <div className="flex items-center justify-center">
      <Building2 className="h-6 w-6 text-slate-400" />
    </div>
  );

  // Logo container with homepage styling
  const logoContent = (
    <div className={`group inline-flex h-20 w-20 items-center justify-center rounded-full bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {hasError || isPlaceholder ? (
        renderFallback()
      ) : (
        <>
          {!isLoaded && (
            <div className="h-10 w-10 bg-slate-100 animate-pulse rounded" />
          )}
          <img
            src={logoSrc}
            alt={publisherName}
            className={`h-10 w-10 object-contain transition-opacity ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            width={40}
            height={40}
            onError={handleError}
            onLoad={handleLoad}
          />
        </>
      )}
    </div>
  );

  // Wrap in link if clickable and href provided
  if (isClickable && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener nofollow"
        aria-label={`${publisherName} coverage`}
        className="inline-block"
      >
        {logoContent}
      </a>
    );
  }

  return logoContent;
};

export default PressLogo;