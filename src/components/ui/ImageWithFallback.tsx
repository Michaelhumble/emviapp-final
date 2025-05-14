
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  businessName?: string;
  category?: string;
  priority?: boolean;
  showPremiumBadge?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/fallback.png',
  businessName,
  category,
  priority,
  showPremiumBadge,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || (businessName ? `${businessName} image` : 'Listing image')}
      onError={handleError}
    />
  );
};

export { ImageWithFallback };
export default ImageWithFallback;
export type { ImageWithFallbackProps };
