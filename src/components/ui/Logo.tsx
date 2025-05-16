
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
  // Determine logo size based on prop - increased by 20%
  const sizeClasses = {
    small: "h-10 w-auto", // Increased from h-8
    medium: "h-12 w-auto", // Increased from h-10
    large: "h-20 w-auto"  // Increased from h-16
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <img
          src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png"
          alt="EmviApp Logo"
          className="h-full w-auto object-contain"
        />
      </div>
      
      {showText && (
        <div className={cn(
          "font-bold tracking-tight ml-2",
          size === "small" ? "text-xl" : size === "large" ? "text-3xl" : "text-2xl"
        )}>
          <span className="text-[#FF7743]">Emvi</span>
          <span className="text-[#3D3D3D]">.App</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
