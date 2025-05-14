
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Globe } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { POLISHED_DESCRIPTIONS_EN, POLISHED_DESCRIPTIONS_VI } from './jobFormConstants';
import { getLanguagePreference } from '@/utils/languagePreference';

interface PolishedDescriptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDescription: (description: string) => void;
  jobType: string;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  open,
  onOpenChange,
  onSelectDescription,
  jobType,
}) => {
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [languagePreference, setLanguagePreference] = useState(getLanguagePreference());

  // Get the appropriate descriptions based on job type and language
  const getDescriptions = () => {
    const normalizedJobType = jobType.toLowerCase();
    let jobCategory = 'other';
    
    if (normalizedJobType.includes('nail')) {
      jobCategory = 'nail';
    } else if (normalizedJobType.includes('hair') || normalizedJobType.includes('stylist')) {
      jobCategory = 'hair';
    } else if (normalizedJobType.includes('spa') || normalizedJobType.includes('massage')) {
      jobCategory = 'spa';
    } else if (normalizedJobType.includes('recept')) {
      jobCategory = 'receptionist';
    }

    return languagePreference === 'vi' 
      ? (POLISHED_DESCRIPTIONS_VI[jobCategory as keyof typeof POLISHED_DESCRIPTIONS_VI] || [])
      : (POLISHED_DESCRIPTIONS_EN[jobCategory as keyof typeof POLISHED_DESCRIPTIONS_EN] || []);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguagePreference(prev => prev === 'en' ? 'vi' : 'en');
  };
  
  const descriptions = getDescriptions();

  useEffect(() => {
    if (descriptions.length > 0 && !selectedDescription) {
      setSelectedDescription(descriptions[0].description);
    }
  }, [descriptions, selectedDescription]);

  const handleConfirm = () => {
    if (selectedDescription) {
      onSelectDescription(selectedDescription);
      onOpenChange(false);
    }
  };

  if (descriptions.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {languagePreference === 'en' ? 'Polish with AI' : 'Trợ Giúp Từ AI'}
            </DialogTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>{languagePreference === 'en' ? 'English' : 'Tiếng Việt'}</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {languagePreference === 'en' 
              ? 'Choose a style that matches your brand voice' 
              : 'Chọn phong cách phù hợp với thương hiệu của bạn'}
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
          <div className="col-span-1 border rounded-md h-[60vh] overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4">
                <h3 className="font-medium mb-3">
                  {languagePreference === 'en' ? 'Select a Style' : 'Chọn phong cách'}
                </h3>
                <div className="space-y-1.5">
                  {descriptions.map((item, index) => (
                    <Button
                      key={index}
                      variant={selectedDescription === item.description ? "default" : "ghost"}
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setSelectedDescription(item.description)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{item.title}</span>
                        {selectedDescription === item.description && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          
          <div className="col-span-1 md:col-span-2 border rounded-md h-[60vh]">
            <ScrollArea className="h-full p-4">
              <div className="p-2">
                <h3 className="font-medium mb-3">
                  {languagePreference === 'en' ? 'Preview' : 'Xem trước'}
                </h3>
                <div className="whitespace-pre-wrap">
                  {selectedDescription}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {languagePreference === 'en' ? 'Cancel' : 'Hủy'}
          </Button>
          <Button onClick={handleConfirm}>
            {languagePreference === 'en' ? 'Use This Style' : 'Sử dụng phong cách này'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
