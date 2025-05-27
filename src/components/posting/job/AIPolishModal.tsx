
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Check } from 'lucide-react';
import { aiPolishTemplates } from './aiPolishTemplates';

interface AIPolishModalProps {
  open: boolean;
  onClose: () => void;
  currentDescription: string;
  jobTitle: string;
  onApply: (polishedText: string) => void;
}

export const AIPolishModal: React.FC<AIPolishModalProps> = ({
  open,
  onClose,
  currentDescription,
  jobTitle,
  onApply
}) => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customizedText, setCustomizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('professional');
  
  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setSelectedTemplate('');
      setCustomizedText(currentDescription);
      setIsLoading(false);
    }
  }, [open, currentDescription]);
  
  // Set customized text when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      setCustomizedText(selectedTemplate);
    }
  }, [selectedTemplate]);
  
  const handleGenerateAI = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const templates = aiPolishTemplates.find(t => t.style === activeTab)?.templates || [];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setSelectedTemplate(randomTemplate);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-start gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <DialogTitle>{t("AI Polish Your Job Description")}</DialogTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {t("Select a style that best represents your salon and attracts your ideal candidates")}
          </p>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <Tabs defaultValue="professional" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="professional" className="flex-1">{t("Professional")}</TabsTrigger>
              <TabsTrigger value="friendly" className="flex-1">{t("Friendly & Warm")}</TabsTrigger>
              <TabsTrigger value="vietnamese" className="flex-1">{t("Vietnamese")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="professional" className="space-y-4">
              <p className="text-sm">
                {t("Polished, professional tone with clear qualifications and responsibilities")}
              </p>
              
              <Button
                type="button"
                onClick={handleGenerateAI}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                    {t("Polishing...")}
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t("Generate Professional Description")}
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="friendly" className="space-y-4">
              <p className="text-sm">
                {t("Warm, inviting tone that emphasizes salon culture and team atmosphere")}
              </p>
              
              <Button
                type="button"
                onClick={handleGenerateAI}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                    {t("Polishing...")}
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t("Generate Friendly Description")}
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="vietnamese" className="space-y-4">
              <p className="text-sm">
                {t("Professionally written Vietnamese language description")}
              </p>
              
              <Button
                type="button"
                onClick={handleGenerateAI}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                    {t("Polishing...")}
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t("Generate Vietnamese Description")}
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
          
          {selectedTemplate && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{t("AI Enhanced Description")}</h3>
                <span className="text-xs text-green-600 flex items-center">
                  <Check className="h-3 w-3 mr-1" /> {t("Optimized for engagement")}
                </span>
              </div>
              
              <Textarea
                value={customizedText}
                onChange={(e) => setCustomizedText(e.target.value)}
                rows={12}
                className="text-base resize-none"
              />
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            {t("Cancel")}
          </Button>
          <Button 
            type="button" 
            onClick={() => onApply(customizedText)}
            disabled={!selectedTemplate}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {t("Apply Enhanced Description")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
