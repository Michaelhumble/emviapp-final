
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import TemplateSelectionModal from './TemplateSelectionModal';

interface AIPolishButtonProps {
  text?: string;
  onPolish: (polishedText: string, polishedVietnameseText?: string) => void;
  industryType?: string;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ text, onPolish, industryType = 'nails' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectTemplate = (description: string, vietnameseDescription?: string) => {
    onPolish(description, vietnameseDescription);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1 whitespace-nowrap text-xs md:text-sm"
        onClick={handleOpenModal}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Polish with AI
      </Button>

      <TemplateSelectionModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSelectTemplate={handleSelectTemplate}
        industryType={industryType}
      />
    </>
  );
};

export default AIPolishButton;
