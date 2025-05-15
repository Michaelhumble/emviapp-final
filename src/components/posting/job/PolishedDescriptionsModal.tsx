
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/hooks/useTranslation';
import { POLISHED_DESCRIPTIONS_EN, POLISHED_DESCRIPTIONS_VI } from './jobFormConstants';

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDescription: (description: string) => void;
  jobType: string;
  aiPolishButton: string;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectDescription,
  jobType,
  aiPolishButton
}) => {
  const { isVietnamese } = useTranslation();
  const descriptionsByType = isVietnamese ? POLISHED_DESCRIPTIONS_VI : POLISHED_DESCRIPTIONS_EN;

  // Map job types to categories in the descriptions object
  const getDescriptionCategory = (type: string): keyof typeof descriptionsByType => {
    if (type.toLowerCase().includes('nail')) return 'nail';
    if (type.toLowerCase().includes('hair')) return 'hair';
    if (type.toLowerCase().includes('spa')) return 'spa';
    return 'other';
  };

  const category = getDescriptionCategory(jobType);
  const descriptions = descriptionsByType[category] || descriptionsByType.other;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{aiPolishButton}</DialogTitle>
          <DialogDescription className="text-center">
            {isVietnamese 
              ? 'Chọn một trong những mẫu mô tả được viết chuyên nghiệp' 
              : 'Choose one of these professionally written descriptions'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[400px] pr-4">
          <div className="space-y-4">
            {descriptions.map((desc, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 hover:border-primary/50 transition-colors p-4 cursor-pointer"
                onClick={() => onSelectDescription(desc.description)}
              >
                <h4 className="text-sm font-medium mb-2">{desc.title}</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{desc.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            {isVietnamese ? 'Đóng' : 'Close'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
