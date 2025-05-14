
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Briefcase, Sparkles } from "lucide-react";
import { PolishedDescription } from '@/hooks/usePolishedDescriptions';

interface PolishedDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  polishedDescriptions: PolishedDescription[];
  onSelectVersion: (description: string) => void;
  isLoading: boolean;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionModalProps> = ({
  isOpen,
  onClose,
  originalDescription,
  polishedDescriptions,
  onSelectVersion,
  isLoading,
}) => {
  const getIconForStyle = (style: string) => {
    // You could extend this to have different icons for different styles
    return <Briefcase className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI-Polished Descriptions
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-4">
          Choose from these AI-enhanced versions of your job description, or continue with your original.
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3">Generating descriptions...</span>
          </div>
        ) : (
          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 gap-4">
              {polishedDescriptions.map((description, index) => (
                <Card key={index} className="border overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                    <div className="flex items-center gap-2 font-medium">
                      {getIconForStyle(description.style)}
                      {description.style}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-sm whitespace-pre-wrap">
                      {description.text}
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 bg-muted/10 border-t">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="w-full text-sm" 
                      onClick={() => onSelectVersion(description.text)}
                    >
                      Use this version
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
