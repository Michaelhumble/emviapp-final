
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { POLISH_TEMPLATES, POLISH_TEMPLATES_VI } from "./jobFormConstants";

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (text: string) => void;
  jobType: string;
  currentText: string;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  jobType = "nail-technician",
  currentText = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("professional");
  const { isVietnamese } = useTranslation();
  
  // Set up templates based on language
  const templates = isVietnamese ? POLISH_TEMPLATES_VI : POLISH_TEMPLATES;
  
  // Get the job-specific templates or fallback to a default
  const jobTemplates = templates[jobType as keyof typeof templates] || templates["nail-technician"];

  useEffect(() => {
    if (isOpen) {
      // Simulate loading for a better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleSelectTemplate = (template: { id: string; title: string; description: string }) => {
    onSelect(template.description);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isVietnamese ? 'Trợ Giúp AI: Cải Thiện Mô Tả Công Việc' : 'AI Polish: Enhance Job Description'}
          </DialogTitle>
          <DialogDescription>
            {isVietnamese 
              ? 'Chọn một phong cách để cải thiện mô tả công việc của bạn'
              : 'Choose a style to enhance your job description'}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              {isVietnamese ? 'Đang chuẩn bị mẫu mô tả...' : 'Preparing description templates...'}
            </p>
          </div>
        ) : (
          <Tabs defaultValue="professional" value={selectedTab} onValueChange={setSelectedTab}>
            <div className="overflow-x-auto pb-2">
              <TabsList className="flex min-w-max gap-2 mb-6">
                {jobTemplates.map(template => (
                  <TabsTrigger 
                    key={template.id} 
                    value={template.id} 
                    className="px-4 py-2.5 min-w-[115px] text-xs sm:text-sm whitespace-nowrap"
                  >
                    {template.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {jobTemplates.map(template => (
              <TabsContent key={template.id} value={template.id} className="space-y-4">
                <div className="border rounded-lg p-6 bg-muted/30">
                  <h3 className="font-medium mb-3">{template.title} {isVietnamese ? 'Phong Cách' : 'Style'}</h3>
                  <div className="whitespace-pre-wrap text-sm">{template.description}</div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>
                    {isVietnamese ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button onClick={() => handleSelectTemplate(template)}>
                    {isVietnamese ? 'Sử Dụng Mẫu Này' : 'Use This Template'}
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

export default PolishedDescriptionsModal;
