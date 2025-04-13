
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className, 
  fallbackClassName = "flex items-center justify-center bg-muted",
  ...props
}) => {
  const [error, setError] = useState(false);

  return error ? (
    <div className={`${className} ${fallbackClassName}`}>
      <User className="h-1/2 w-1/2 text-muted-foreground opacity-50" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
