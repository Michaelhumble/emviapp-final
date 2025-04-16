
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className, 
  fallbackClassName = "flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-50",
  businessName,
  fallbackImage = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800",
  ...props
}) => {
  const [error, setError] = useState(false);

  const defaultImage = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800";

  // Try to load the provided fallback first, if that fails use the default
  const handleError = () => {
    if (src !== defaultImage) {
      setError(true);
    }
  };

  return error ? (
    <div className={`relative overflow-hidden ${className}`}>
      <img 
        src={fallbackImage || defaultImage}
        alt={alt || businessName || "Business"}
        className={`w-full h-full object-cover ${className}`}
        onError={() => setError(true)}
        {...props}
      />
      {businessName && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-xl font-medium">{businessName.charAt(0)}</span>
        </div>
      )}
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
