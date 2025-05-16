
import React from 'react';
import Logo from '@/components/ui/Logo';

interface EmviLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const EmviLogo: React.FC<EmviLogoProps> = (props) => {
  return <Logo {...props} />;
};

export default EmviLogo;
