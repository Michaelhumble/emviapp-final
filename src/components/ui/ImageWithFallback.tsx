
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    // Return a gradient placeholder with first letter of alt text
    const firstLetter = alt.charAt(0).toUpperCase() || 'J';
    return (
      <div className={`flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 ${className}`}>
        <span className="text-3xl font-semibold text-gray-500">{firstLetter}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;
