
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Briefcase, Sparkles } from "lucide-react";

interface PolishedDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  polishedVersions: Array<{
    theme: string;
    icon: JSX.Element;
    description: string;
  }>;
  onSelectVersion: (description: string) => void;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionModalProps> = ({
  isOpen,
  onClose,
  originalDescription,
  polishedVersions,
  onSelectVersion,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI-Polished Description
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-4">
          Here's an AI-enhanced version of your job description. You can select it or continue using your original.
        </div>
        
        <ScrollArea className="h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 gap-4">
            {polishedVersions.map((version, index) => (
              <Card key={index} className="border overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                  <div className="flex items-center gap-2 font-medium">
                    {version.icon}
                    {version.theme}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm whitespace-pre-wrap">
                    {version.description}
                  </div>
                </CardContent>
                <CardFooter className="p-3 bg-muted/10 border-t">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="w-full text-sm" 
                    onClick={() => onSelectVersion(version.description)}
                  >
                    Use this version
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
