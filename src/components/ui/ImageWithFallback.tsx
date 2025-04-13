
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  businessName?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  businessName,
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(!src);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 ${fallbackClassName || className}`}
      >
        <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
        <div className="text-center px-4">
          <p className="text-sm font-medium text-gray-500">Coming soon</p>
          {businessName && (
            <p className="text-xs text-gray-400 mt-1">{businessName}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
