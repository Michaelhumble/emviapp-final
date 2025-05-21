
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "medium",
  showText = false
}) => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  // Define the sizes for the logo
  const sizeClasses = {
    small: "h-12 w-auto",
    medium: "h-16 w-auto",
    large: "h-20 w-auto"
  };

  // The direct Supabase storage URL for the EmviApp logo
  const logoUrl = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png";
  
  useEffect(() => {
    console.log("Logo component mounted, using URL:", logoUrl);
    // Test image loading with XMLHttpRequest to check if the image is accessible
    const xhr = new XMLHttpRequest();
    xhr.open('GET', logoUrl, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Image URL is accessible via XHR");
      } else {
        console.error("Image URL returned status:", xhr.status);
        setImageError(`Image URL returned status: ${xhr.status}`);
      }
    };
    xhr.onerror = function() {
      console.error("Error making request to image URL");
      setImageError("Network error when accessing image URL");
    };
    xhr.send();
    
    return () => {
      console.log("Logo component unmounted");
    };
  }, [logoUrl]);

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {imageError && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100 rounded">
            <span className="text-xs text-red-500">Error loading logo</span>
          </div>
        )}
        <img
          src={logoUrl}
          alt="EmviApp Logo"
          className={cn("h-full w-auto object-contain", !imageLoaded && !imageError ? "opacity-0" : "opacity-100")}
          onLoad={() => {
            console.log("Logo image loaded successfully");
            setImageLoaded(true);
          }}
          onError={(e) => {
            const error = `Failed to load EmviApp logo: ${e instanceof Error ? e.message : 'unknown error'}`;
            console.error(error);
            console.error("Target:", e.currentTarget);
            setImageError(error);
          }}
        />
      </div>
      
      {showText && (
        <div className={cn(
          "font-bold tracking-tight ml-2",
          size === "small" ? "text-xl" : 
          size === "medium" ? "text-2xl" : "text-3xl"
        )}>
          <span className="text-[#FF7743]">Emvi</span>
          <span className="text-[#3D3D3D]">.App</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
