import React, { useState } from 'react';

interface LogoProps {
  name: string;
  logo: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  name, 
  logo, 
  alt, 
  className = "",
  onClick 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'press_logo_click', {
          event_category: 'engagement',
          event_label: name,
          outlet_name: name
        });
      }
    }
  };

  if (hasError) {
    // Fallback to text initials
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);

    return (
      <div 
        className={`flex items-center justify-center bg-muted/20 rounded-lg p-3 text-muted-foreground font-semibold text-sm transition-all duration-300 hover:bg-muted/40 cursor-pointer ${className}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {!isLoaded && (
        <div className="w-full h-16 bg-muted/10 animate-pulse rounded-lg" />
      )}
      <img
        src={logo}
        alt={alt}
        className={`w-full h-auto max-w-[120px] max-h-16 object-contain ${
          name === 'AP News' ? '' : 'filter grayscale hover:grayscale-0'
        } transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: '3/1' }}
      />
    </div>
  );
};

export default Logo;