
import React from 'react';
import Logo from '@/components/ui/Logo';

interface EmviLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

// Updated to always use the large size to match the footer
const EmviLogo: React.FC<EmviLogoProps> = (props) => {
  // Override any size prop to always use 'large'
  return <Logo {...props} size="large" />;
};

export default EmviLogo;
