
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
  const [retryCount, setRetryCount] = useState<number>(0);
  
  // Define the sizes for the logo
  const sizeClasses = {
    small: "h-12 w-auto",
    medium: "h-16 w-auto",
    large: "h-20 w-auto"
  };

  // The direct Supabase storage URL for the EmviApp logo
  const logoUrl = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png";
  
  // Clear any cached errors on component mount or URL change
  useEffect(() => {
    setImageError(null);
    setImageLoaded(false);
    
    console.log("Logo component mounted, using URL:", logoUrl);
    
    // Test image loading with fetch API to check if the image is accessible
    fetch(logoUrl, { 
      method: 'HEAD',
      cache: 'no-cache' // Force a fresh request to avoid any cache issues
    })
      .then(response => {
        if (response.ok) {
          console.log("Image URL is accessible via fetch HEAD request");
        } else {
          console.error("Image URL returned status:", response.status);
          setImageError(`Image URL returned status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error("Error making fetch request to image URL:", error);
        setImageError("Network error when accessing image URL");
      });
    
    // Additional XMLHttpRequest to double-check accessibility
    const xhr = new XMLHttpRequest();
    xhr.open('GET', logoUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Image URL is accessible via XHR");
        // Create a temporary URL to test if the image data is valid
        const blob = xhr.response;
        if (blob && blob.type.startsWith('image/')) {
          console.log("Received valid image data of type:", blob.type);
        } else {
          console.error("Response is not a valid image:", blob?.type || 'unknown');
        }
      } else {
        console.error("XHR request returned status:", xhr.status);
        setImageError(`XHR request returned status: ${xhr.status}`);
      }
    };
    xhr.onerror = function() {
      console.error("Error making XHR request to image URL");
      setImageError("Network error when accessing image URL via XHR");
    };
    xhr.send();
    
    return () => {
      console.log("Logo component unmounted");
    };
  }, [logoUrl, retryCount]);

  // Function to retry loading if it fails
  const handleRetry = () => {
    console.log("Retrying logo image load...");
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {imageError && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-100 rounded p-1">
            <span className="text-xs text-red-500 text-center">{imageError.substring(0, 50)}</span>
            <button 
              className="text-[10px] mt-1 text-blue-500 hover:text-blue-700" 
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        )}
        <img
          src={`${logoUrl}?t=${retryCount}`} // Add cache-busting parameter
          alt="EmviApp Logo"
          className={cn("h-full w-auto object-contain", !imageLoaded && !imageError ? "opacity-0" : "opacity-100")}
          onLoad={(e) => {
            console.log("Logo image loaded successfully", e.currentTarget);
            setImageLoaded(true);
            setImageError(null);
          }}
          onError={(e) => {
            const error = `Failed to load EmviApp logo: ${e instanceof Error ? e.message : 'unknown error'}`;
            console.error(error);
            console.error("Target:", e.currentTarget);
            console.error("Complete URL:", e.currentTarget.src);
            setImageError(error);
            setImageLoaded(false);
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
