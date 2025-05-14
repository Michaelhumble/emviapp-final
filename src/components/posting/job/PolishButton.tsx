
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface PolishButtonProps {
  onClick: () => void;
}

const PolishButton: React.FC<PolishButtonProps> = ({ onClick }) => {
  const { isVietnamese } = useTranslation();
  
  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={onClick}
      className="flex items-center gap-1"
    >
      <Wand2 size={16} />
      {isVietnamese ? 'Trợ giúp từ AI' : 'Polish with AI ✨'}
    </Button>
  );
};

export default PolishButton;
