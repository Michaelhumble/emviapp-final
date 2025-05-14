
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

const STYLE_TABS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "luxury", label: "Luxury" },
  { value: "casual", label: "Casual" },
  { value: "detailed", label: "Detailed" }
];

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  descriptions: string[];
  onSelect: (description: string) => void;
  isLoading: boolean;
}

const PolishedDescriptionsModal = ({
  isOpen,
  onClose,
  descriptions,
  onSelect,
  isLoading
}: PolishedDescriptionsModalProps) => {
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  const [selectedTab, setSelectedTab] = useState("professional");
  
  // Get descriptions for the current tab/style
  const getFilteredDescriptions = () => {
    if (!descriptions.length) return [];
    
    // If we have 10 descriptions, split them into 5 style groups of 2 variations each
    const totalStyles = STYLE_TABS.length;
    const descriptionsPerStyle = Math.max(1, Math.floor(descriptions.length / totalStyles));
    
    const styleIndex = STYLE_TABS.findIndex(tab => tab.value === selectedTab);
    const startIndex = styleIndex * descriptionsPerStyle;
    
    return descriptions.slice(startIndex, startIndex + descriptionsPerStyle);
  };

  const filteredDescriptions = getFilteredDescriptions();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{t.polishResultLabel}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>{t.loadingPolish}</p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="professional" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-5 mb-4">
                {STYLE_TABS.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedTab} className="mt-0">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {filteredDescriptions.map((description, index) => (
                      <div 
                        key={index}
                        className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors"
                        onClick={() => onSelect(description)}
                      >
                        <p className="whitespace-pre-wrap">{description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isVietnamese ? 'Huỷ' : 'Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
