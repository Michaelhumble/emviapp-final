
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PolishedDescription } from '@/hooks/usePolishedDescriptions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle } from 'lucide-react';

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  descriptions: PolishedDescription[];
  onSelectVersion: (text: string) => void;
  error: string | null;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  descriptions,
  onSelectVersion,
  error,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">AI Description Polish</DialogTitle>
          <DialogDescription>
            Choose a version that best represents your job opportunity.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Generating polished descriptions...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 p-4 rounded-md text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {descriptions.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50 py-3">
                  <CardTitle className="text-lg font-serif">{item.style}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 max-h-48 overflow-y-auto">
                  <p className="text-sm">{item.text}</p>
                </CardContent>
                <Separator />
                <CardFooter className="bg-muted/30 py-2 flex justify-end">
                  <Button 
                    size="sm"
                    onClick={() => onSelectVersion(item.text)}
                  >
                    Use This
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
