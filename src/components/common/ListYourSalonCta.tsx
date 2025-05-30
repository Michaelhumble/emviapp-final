
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface ListYourSalonCtaProps {
  variant?: 'default' | 'navbar' | 'mobile';
  className?: string;
}

/**
 * Reusable "List Your Salon" CTA button component
 * Based on the original SalonListingCta component logic
 */
const ListYourSalonCta: React.FC<ListYourSalonCtaProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { t } = useTranslation();

  const buttonText = t({
    english: "List Your Salon",
    vietnamese: "Bán Tiệm"
  });

  const baseClasses = "bg-orange-500 hover:bg-orange-600 rounded-lg";
  
  const variantClasses = {
    default: "size-lg",
    navbar: "size-default",
    mobile: "w-full"
  };

  return (
    <Button 
      asChild 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <Link to="/signup">{buttonText}</Link>
    </Button>
  );
};

export default ListYourSalonCta;
