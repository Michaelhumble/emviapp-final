
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
  // Determine logo size based on prop
  const sizeClasses = {
    small: "h-8 w-auto",
    medium: "h-10 w-auto",
    large: "h-16 w-auto"
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
