
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { IndustryType } from './jobTemplates';

interface AIPolishButtonProps {
  description?: string;
  industry?: IndustryType;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ description, industry }) => {
  const { t } = useTranslation();
  
  const handlePolish = () => {
    // AI logic would go here
    console.log('Polishing description with AI');
  };
  
  return (
    <Button 
      type="button" 
      variant="ghost" 
      size="sm" 
      onClick={handlePolish}
      className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
    >
      <Wand2 className="h-3 w-3" />
      {t({
        english: 'AI Polish',
        vietnamese: 'AI Làm đẹp'
      })}
    </Button>
  );
};

export default AIPolishButton;
