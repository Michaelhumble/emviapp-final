
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

// Update the template interface to include the icon property
interface Template {
  id: string;
  title: string;
  description: string;
  icon?: string; // Make icon optional
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

  const handleSelectTemplate = (template: Template) => {
    onSelect(template.description);
    onClose();
  };

  // Display a message if no templates are available in the selected language for this job type
  const hasTemplates = jobTemplates && jobTemplates.length > 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center sm:text-left">
            {isVietnamese ? 'Trợ Giúp AI: Cải Thiện Mô Tả Công Việc' : 'AI Polish: Enhance Job Description'}
          </DialogTitle>
          <DialogDescription className="text-center sm:text-left">
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
        ) : !hasTemplates ? (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-center text-muted-foreground">
              {isVietnamese 
                ? 'Chức năng đang cập nhật cho loại công việc này. Vui lòng thử lại sau.'
                : 'Templates for this job type are being updated. Please try again later.'}
            </p>
            <Button onClick={onClose} className="mt-4">
              {isVietnamese ? 'Đóng' : 'Close'}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="professional" value={selectedTab} onValueChange={setSelectedTab}>
            <div className="overflow-x-auto pb-4 mb-6">
              <TabsList className="flex min-w-max gap-4 p-1.5">
                {jobTemplates.map((template: Template) => (
                  <TabsTrigger 
                    key={template.id} 
                    value={template.id} 
                    className="px-6 py-3.5 min-w-[130px] text-base whitespace-nowrap flex items-center gap-2 font-medium"
                  >
                    {/* Check if icon exists before rendering it */}
                    {template.icon && <span>{template.icon}</span>}
                    {template.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {jobTemplates.map((template: Template) => (
              <TabsContent key={template.id} value={template.id} className="space-y-5">
                <div className="border rounded-2xl p-8 bg-muted/30 shadow-xl hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg mb-4">{template.title} {isVietnamese ? 'Phong Cách' : 'Style'}</h3>
                  <div className="whitespace-pre-wrap text-base leading-relaxed">{template.description}</div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
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
