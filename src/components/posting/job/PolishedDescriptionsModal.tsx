
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { PolishedDescription } from '@/hooks/usePolishedDescriptions';

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  descriptions: PolishedDescription[];
  isLoading: boolean;
  onApply: (description: string) => void;
}

export const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  originalDescription,
  descriptions,
  isLoading,
  onApply,
}) => {
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Reset selected description on modal open and when new descriptions arrive
  useEffect(() => {
    if (descriptions.length > 0 && !selectedStyle) {
      setSelectedDescription(descriptions[0].text);
      setSelectedStyle(descriptions[0].style);
    }
  }, [descriptions, selectedStyle]);

  const handleStyleSelect = (style: string, text: string) => {
    setSelectedStyle(style);
    setSelectedDescription(text);
  };

  const handleClose = () => {
    setSelectedStyle(null);
    setSelectedDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Enhanced Job Description</DialogTitle>
          <DialogDescription>
            Choose from AI-enhanced versions of your job description.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Enhancing your description with AI...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden flex-grow">
            <div className="md:col-span-1 overflow-y-auto border-r pr-4 space-y-2 max-h-[50vh]">
              <div className="font-medium text-sm mb-2">Original Text:</div>
              <div className="border rounded-md p-3 bg-muted/20 text-muted-foreground text-sm mb-4">
                {originalDescription}
              </div>
              
              <div className="font-medium text-sm mb-2">Style Options:</div>
              <div className="space-y-1">
                {descriptions.map((desc) => (
                  <Button
                    key={desc.style}
                    variant={selectedStyle === desc.style ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-left font-normal text-sm mb-1"
                    onClick={() => handleStyleSelect(desc.style, desc.text)}
                  >
                    {desc.style}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 overflow-hidden flex flex-col">
              <div className="font-medium text-sm mb-2">
                {selectedStyle ? `${selectedStyle} Version:` : 'Enhanced Version:'}
              </div>
              <Textarea 
                value={selectedDescription} 
                onChange={(e) => setSelectedDescription(e.target.value)}
                className="min-h-[300px] flex-grow resize-none overflow-y-auto"
              />
            </div>
          </div>
        )}
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => onApply(selectedDescription)}
            disabled={isLoading || !selectedDescription}
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
