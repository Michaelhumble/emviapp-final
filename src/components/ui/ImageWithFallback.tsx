
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

const defaultFallbackImage = "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className, 
  fallbackClassName = "flex items-center justify-center bg-muted",
  businessName,
  fallbackImage = "https://emvi.app/images/fallback-profile.jpg",
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Use a more reliable fallback strategy
  const actualFallbackImage = fallbackImage || defaultFallbackImage;
  
  // Generate a reliable alt text
  const altText = alt || (businessName ? `${businessName} image` : "Image");

  return error ? (
    <div className={`${className} ${fallbackClassName} overflow-hidden`}>
      <img 
        src={actualFallbackImage} 
        alt={altText}
        className="w-full h-full object-cover"
        onError={() => {
          console.log("Even fallback image failed to load");
          // If even the fallback fails, show the icon
          setError(true);
        }}
      />
    </div>
  ) : (
    <div className={`${className} relative overflow-hidden`}>
      {!loaded && (
        <div className={`absolute inset-0 ${fallbackClassName} flex items-center justify-center bg-gray-100 animate-pulse`}>
          <User className="h-1/4 w-1/4 text-muted-foreground opacity-20" />
        </div>
      )}
      <img
        src={src || actualFallbackImage}
        alt={altText}
        className={`${className} object-cover w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
