
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface PostYourSalonButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClose?: () => void;
}

const PostYourSalonButton: React.FC<PostYourSalonButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  onClose
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Button 
      asChild
      variant={variant}
      size={size}
      className={className}
    >
      <Link to="/posting/salon" onClick={handleClick}>
        {t({
          english: "Post Your Salon",
          vietnamese: "Đăng Bán Tiệm"
        })}
      </Link>
    </Button>
  );
};

export default PostYourSalonButton;
