
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

// Enhanced default fallback images for different business types
const FALLBACK_IMAGES = {
  default: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800",
  salon: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
  nail: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=800",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  barber: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800",
  tattoo: "https://images.unsplash.com/photo-1583516537377-affb9e9f4e53?q=80&w=800",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800"
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className = "", 
  fallbackClassName = "flex items-center justify-center bg-muted",
  businessName = "",
  fallbackImage,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finalSrc, setFinalSrc] = useState<string | undefined>(src);

  // Determine the most appropriate fallback image based on business name or type
  const getFallbackImage = () => {
    if (fallbackImage) return fallbackImage;
    
    const lowerBusinessName = businessName?.toLowerCase() || '';
    
    if (lowerBusinessName.includes('nail') || lowerBusinessName.includes('manicure')) {
      return FALLBACK_IMAGES.nail;
    } else if (lowerBusinessName.includes('spa') || lowerBusinessName.includes('massage')) {
      return FALLBACK_IMAGES.spa;
    } else if (lowerBusinessName.includes('salon') || lowerBusinessName.includes('hair')) {
      return FALLBACK_IMAGES.salon;
    } else if (lowerBusinessName.includes('restaurant') || lowerBusinessName.includes('café') || 
               lowerBusinessName.includes('cafe') || lowerBusinessName.includes('food')) {
      return FALLBACK_IMAGES.restaurant;
    } else if (lowerBusinessName.includes('barber') || lowerBusinessName.includes('cut')) {
      return FALLBACK_IMAGES.barber;
    } else if (lowerBusinessName.includes('tattoo') || lowerBusinessName.includes('ink')) {
      return FALLBACK_IMAGES.tattoo;
    } else if (lowerBusinessName.includes('coffee') || lowerBusinessName.includes('tea') || 
               lowerBusinessName.includes('boba')) {
      return FALLBACK_IMAGES.coffee;
    }
    
    return FALLBACK_IMAGES.default;
  };

  // Handle the case when src is null, undefined, or empty string
  useEffect(() => {
    if (!src || src === '') {
      setError(true);
    } else {
      setFinalSrc(src);
      setError(false);
      setLoaded(false);
    }
  }, [src]);

  // Generate a reliable alt text
  const altText = alt || (businessName ? `${businessName} image` : "Business image");

  if (error) {
    // If there's an error with the original image, show the fallback
    return (
      <div className={`${className} ${fallbackClassName} overflow-hidden`}>
        <img 
          src={getFallbackImage()}
          alt={altText}
          className="w-full h-full object-cover"
          onError={() => {
            console.log("Fallback image failed to load, using default fallback");
            // If even the fallback fails, use the default one
            if (getFallbackImage() !== FALLBACK_IMAGES.default) {
              setFinalSrc(FALLBACK_IMAGES.default);
            } else {
              // If default also fails, show a user icon
              setError(true);
              setLoaded(true);
            }
          }}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Loading state */}
      {!loaded && (
        <div className={`absolute inset-0 ${fallbackClassName} flex items-center justify-center bg-gray-100 animate-pulse`}>
          <User className="h-1/5 w-1/5 text-muted-foreground opacity-20" />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={finalSrc}
        alt={altText}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={() => {
          console.log("Image failed to load:", finalSrc);
          setError(true);
          setLoaded(false);
        }}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
