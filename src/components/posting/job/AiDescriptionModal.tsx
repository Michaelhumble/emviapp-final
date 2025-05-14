
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PolishedDescriptionStyle, usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';

interface AiDescriptionModalProps {
  jobType: string;
  onSelectDescription: (description: string) => void;
}

const AiDescriptionModal: React.FC<AiDescriptionModalProps> = ({ 
  jobType,
  onSelectDescription
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isVietnamese, t } = useTranslation();

  const {
    isLoading,
    handleOpenChange,
    activeStyle,
    handleSelectStyle,
    styleLabels,
    getDescriptionForStyle
  } = usePolishedDescriptions({
    jobType,
    isOpen,
    onOpenChange: setIsOpen,
    onSelect: onSelectDescription
  });

  const handleUseDescription = (style: PolishedDescriptionStyle) => {
    const description = getDescriptionForStyle(style);
    if (description) {
      onSelectDescription(description);
      setIsOpen(false);
    }
  };

  const styles: PolishedDescriptionStyle[] = ['professional', 'friendly', 'luxury', 'casual', 'detailed'];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1"
        >
          <Wand2 size={16} />
          {isVietnamese ? 'Trợ giúp từ AI' : 'Polish with AI ✨'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            {isVietnamese ? 'Mẫu mô tả cho công việc của bạn' : 'Suggested descriptions for your job post'}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="professional" className="w-full mt-4">
            <TabsList className="grid grid-cols-5 mb-6">
              {styles.map((style) => (
                <TabsTrigger 
                  key={style} 
                  value={style}
                  onClick={() => handleSelectStyle(style)}
                  className="text-sm"
                >
                  {isVietnamese ? styleLabels[style].vi : styleLabels[style].en}
                </TabsTrigger>
              ))}
            </TabsList>

            {styles.map((style) => (
              <TabsContent key={style} value={style} className="focus:outline-none">
                <ScrollArea className="h-[400px] rounded-md border p-6 mb-4">
                  <div className="font-inter text-base whitespace-pre-line">
                    {getDescriptionForStyle(style)}
                  </div>
                </ScrollArea>
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={() => handleUseDescription(style)}
                    className="font-medium"
                  >
                    {isVietnamese ? 'Dùng mô tả này' : 'Use This'}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiDescriptionModal;
