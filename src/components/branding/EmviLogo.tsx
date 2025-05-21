
import React from 'react';
import Logo from '@/components/ui/Logo';

interface EmviLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const EmviLogo: React.FC<EmviLogoProps> = ({
  className,
  size = "large",
  showText = true
}) => {
  return (
    <Logo 
      className={className}
      size={size}
      showText={showText}
    />
  );
};

export default EmviLogo;
