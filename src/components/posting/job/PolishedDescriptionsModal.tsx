
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

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
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  
  // Get descriptions for the current tab/style
  const getFilteredDescriptions = () => {
    if (!descriptions || descriptions.length === 0) return [];
    
    // If we have 10 descriptions, split them into 5 style groups of 2 variations each
    const totalStyles = STYLE_TABS.length;
    const descriptionsPerStyle = Math.max(1, Math.floor(descriptions.length / totalStyles));
    
    const styleIndex = STYLE_TABS.findIndex(tab => tab.value === selectedTab);
    const startIndex = styleIndex !== -1 ? styleIndex * descriptionsPerStyle : 0;
    
    return descriptions.slice(startIndex, startIndex + descriptionsPerStyle);
  };

  const filteredDescriptions = getFilteredDescriptions();

  const handleSelectDescription = (description: string) => {
    setSelectedDescription(description);
  };

  const handleUseDescription = () => {
    if (selectedDescription) {
      onSelect(selectedDescription);
    }
  };

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
