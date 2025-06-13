
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCTAInteractions } from '@/hooks/useCTAInteractions';

interface CTAButtonProps {
  type: 'vote_now' | 'enter_contest' | 'apply_now' | 'join_waitlist' | 'upgrade_premium';
  children: React.ReactNode;
  storyId?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  type, 
  children, 
  storyId, 
  className,
  variant = 'default',
  size = 'default'
}) => {
  const { handleCTAClick, isLoading } = useCTAInteractions();

  const handleClick = async () => {
    await handleCTAClick(type, storyId);
  };

  return (
    <Button 
      onClick={handleClick}
      disabled={isLoading}
      className={className}
      variant={variant}
      size={size}
    >
      {isLoading ? 'Processing...' : children}
    </Button>
  );
};

export default CTAButton;
