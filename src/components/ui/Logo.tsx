
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
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Define the sizes for the logo
  const sizeClasses = {
    small: "h-8 w-auto",
    medium: "h-10 w-auto",
    large: "h-12 w-auto"
  };

  // The direct Supabase storage URL for the EmviApp logo
  const logoUrl = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png";
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className={sizeClasses[size]}>
        {imageError ? (
          <div className="rounded bg-gray-100 h-full w-full flex items-center justify-center">
            <span className="text-[#FF7743] font-bold">Emvi</span>
          </div>
        ) : (
          <img
            src={logoUrl}
            alt="EmviApp Logo"
            className="h-full w-auto object-contain"
            onError={() => setImageError(true)}
          />
        )}
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
