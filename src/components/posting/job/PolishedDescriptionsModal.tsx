
import React, { useState } from 'react';
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

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  onApply: (description: string) => void;
}

export const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  originalDescription,
  onApply,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [polishedDescription, setPolishedDescription] = useState('');

  // Simulate AI enhancement - in a real implementation, this would call an API
  React.useEffect(() => {
    if (isOpen && originalDescription && !polishedDescription) {
      setIsGenerating(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        // This is a placeholder for the actual AI enhancement
        // In a real implementation, we would call an AI service
        const enhanced = enhanceDescription(originalDescription);
        setPolishedDescription(enhanced);
        setIsGenerating(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, originalDescription, polishedDescription]);

  // Simple enhancement function - would be replaced by AI service call
  const enhanceDescription = (description: string): string => {
    // This is just a simple example enhancement - in reality you'd use an AI service
    let enhanced = description;
    
    // Add some professional touch
    if (!enhanced.includes("competitive")) {
      enhanced += "\n\nWe offer competitive compensation and a supportive work environment.";
    }
    
    if (!enhanced.includes("experience")) {
      enhanced += " The ideal candidate will have relevant experience and excellent customer service skills.";
    }
    
    // Add clear call to action
    if (!enhanced.includes("apply")) {
      enhanced += "\n\nApply now to join our team of professionals!";
    }
    
    return enhanced;
  };

  const handleClose = () => {
    setPolishedDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enhanced Job Description</DialogTitle>
          <DialogDescription>
            We've polished your job description to make it more appealing to candidates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Enhancing your description with AI...</p>
            </div>
          ) : (
            <>
              <div>
                <h4 className="mb-2 font-medium">Original Text:</h4>
                <div className="border rounded-md p-3 bg-muted/20 text-muted-foreground">
                  {originalDescription}
                </div>
              </div>
              
              <div>
                <h4 className="mb-2 font-medium">Enhanced Version:</h4>
                <Textarea 
                  value={polishedDescription} 
                  onChange={(e) => setPolishedDescription(e.target.value)}
                  className="min-h-32"
                />
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => onApply(polishedDescription)}
            disabled={isGenerating}
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
