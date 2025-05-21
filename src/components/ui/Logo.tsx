
import React from 'react';
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
  // Define the sizes for the logo
  const sizeClasses = {
    small: "h-12 w-auto",
    medium: "h-16 w-auto",
    large: "h-20 w-auto"
  };

  // The direct Supabase storage URL for the EmviApp logo
  const logoUrl = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png";

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <img
          src={logoUrl}
          alt="EmviApp Logo"
          className="h-full w-auto object-contain"
          onError={(e) => {
            console.error("Failed to load EmviApp logo:", e);
            // Fallback handling if needed in the future
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
