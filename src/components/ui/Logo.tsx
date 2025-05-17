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
  // Use the same large size everywhere to match the footer
  // Footer uses "large" size, so we'll make all sizes match that
  const sizeClasses = {
    small: "h-20 w-auto",
    // Now matches large
    medium: "h-20 w-auto",
    // Now matches large
    large: "h-20 w-auto" // Already the right size
  };
  return <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <img src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png" alt="EmviApp Logo" className="h-full w-auto object-contain" />
      </div>
      
      {showText && <div className={cn("font-bold tracking-tight ml-2", "text-3xl" // Always use the large text size for consistency
    )}>
          <span className="text-[#FF7743] text-xl">Emvi</span>
          <span className="text-[#3D3D3D] text-xl">.App</span>
        </div>}
    </div>;
};
export default Logo;