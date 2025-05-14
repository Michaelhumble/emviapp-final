import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { POLISHED_DESCRIPTIONS } from './jobFormConstants';

const STYLE_TABS = [
  { value: "professional", label: "Professional", labelVi: "Chuyên nghiệp" },
  { value: "friendly", label: "Friendly", labelVi: "Thân thiện" },
  { value: "luxury", label: "Luxury", labelVi: "Cao cấp" },
  { value: "casual", label: "Casual", labelVi: "Thoải mái" },
  { value: "detailed", label: "Detailed", labelVi: "Chi tiết" }
];

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  descriptions: string[];
  onSelect: (description: string) => void;
  isLoading: boolean;
  selectedTemplate?: string;
}

const PolishedDescriptionsModal = ({
  isOpen,
  onClose,
  descriptions,
  onSelect,
  isLoading,
  selectedTemplate = "nail-technician"
}: PolishedDescriptionsModalProps) => {
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  const [selectedTab, setSelectedTab] = useState("professional");
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  
  // Get template-based descriptions for the current tab/style
  const getFilteredDescriptions = () => {
    if (isLoading || !selectedTemplate) {
      return [];
    }
    
    // If we have AI-generated descriptions from the API, use those
    if (descriptions && descriptions.length > 0) {
      // If we have 10 descriptions (2 per style), split them into 5 style groups of 2 variations each
      const totalStyles = STYLE_TABS.length;
      const descriptionsPerStyle = Math.max(1, Math.floor(descriptions.length / totalStyles));
      
      const styleIndex = STYLE_TABS.findIndex(tab => tab.value === selectedTab);
      const startIndex = styleIndex !== -1 ? styleIndex * descriptionsPerStyle : 0;
      
      return descriptions.slice(startIndex, startIndex + descriptionsPerStyle);
    }
    
    // Otherwise, fall back to pre-defined templates based on job type and language
    const templateKey = selectedTemplate || 'nail-technician';
    if (isVietnamese) {
      // Get Vietnamese templates for the selected style
      const styleKey = `${selectedTab}Vi` as keyof typeof POLISHED_DESCRIPTIONS;
      const templateDescriptions = POLISHED_DESCRIPTIONS[styleKey];
      
      return templateDescriptions && templateDescriptions[templateKey] 
        ? [templateDescriptions[templateKey]] 
        : [POLISHED_DESCRIPTIONS.professionalVi['nail-technician']]; // Fallback
    } else {
      // Get English templates for the selected style
      const templateDescriptions = POLISHED_DESCRIPTIONS[selectedTab as keyof typeof POLISHED_DESCRIPTIONS];
      
      return templateDescriptions && templateDescriptions[templateKey]
        ? [templateDescriptions[templateKey]]
        : [POLISHED_DESCRIPTIONS.professional['nail-technician']]; // Fallback
    }
  };

  const filteredDescriptions = getFilteredDescriptions();

  const handleSelectDescription = (description: string) => {
    setSelectedDescription(description);
  };

  const handleUseDescription = () => {
    if (selectedDescription) {
      onSelect(selectedDescription);
      onClose();
    }
  };

  // Reset selected description when tab changes
  useEffect(() => {
    setSelectedDescription(null);
  }, [selectedTab]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">
            {isVietnamese ? "Gợi ý từ AI" : "AI Suggestions"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center text-muted-foreground">
              {isVietnamese ? "AI đang hoàn thiện mô tả của bạn..." : "AI is polishing your description..."}
            </p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="professional" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-5 mb-4">
                {STYLE_TABS.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {isVietnamese ? tab.labelVi : tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedTab} className="mt-0">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {filteredDescriptions.length > 0 ? (
                      filteredDescriptions.map((description, index) => (
                        <div 
                          key={index}
                          className={`p-4 border rounded-md cursor-pointer transition-colors ${
                            selectedDescription === description 
                              ? 'border-primary/70 bg-primary/5 shadow-sm' 
                              : 'hover:border-primary/40'
                          }`}
                          onClick={() => handleSelectDescription(description)}
                        >
                          <p className="whitespace-pre-wrap">{description}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        {isVietnamese 
                          ? "Không có gợi ý nào. Vui lòng thử lại với mô tả dài hơn." 
                          : "No suggestions available. Please try again with a longer description."}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            
            {selectedDescription && (
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleUseDescription} 
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  {isVietnamese ? 'Dùng mô tả này' : 'Use This Description'}
                </Button>
              </div>
            )}
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
