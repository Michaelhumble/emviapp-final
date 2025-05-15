
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  professionalTemplates, 
  friendlyTemplates, 
  luxuryTemplates, 
  urgentTemplates,
  standardTemplates 
} from "@/constants/jobTemplates";
import { vietnameseNailTemplates } from "@/constants/vietnameseNailTemplates";
import { useTranslation } from "@/hooks/useTranslation";

export interface DescriptionTemplate {
  title: string;
  description: string;
}

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: string) => void;
  jobType?: string; // Add jobType prop
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  jobType
}) => {
  const [activeTab, setActiveTab] = useState("standard");
  const { isVietnamese } = useTranslation();
  
  // Check if it's a Nail Technician job type
  const isNailJob = jobType?.toLowerCase().includes("nail");
  
  // Determine if we should show the Vietnamese tab
  const showVietnameseTab = isVietnamese && isNailJob;

  const handleTemplateSelect = (description: string) => {
    onSelectTemplate(description);
    onClose();
  };

  const renderTemplates = (templates: DescriptionTemplate[]) => {
    return templates.map((template, index) => (
      <div
        key={index}
        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer mb-4"
        onClick={() => handleTemplateSelect(template.description)}
      >
        <h3 className="font-medium mb-2">{template.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
      </div>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose AI Polish Template</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex whitespace-nowrap">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="friendly">Friendly</TabsTrigger>
            <TabsTrigger value="luxury">Luxury</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            {showVietnameseTab && <TabsTrigger value="vietnamese">Tiếng Việt</TabsTrigger>}
          </TabsList>

          <TabsContent value="standard" className="space-y-4">
            {renderTemplates(standardTemplates)}
          </TabsContent>
          
          <TabsContent value="professional" className="space-y-4">
            {renderTemplates(professionalTemplates)}
          </TabsContent>
          
          <TabsContent value="friendly" className="space-y-4">
            {renderTemplates(friendlyTemplates)}
          </TabsContent>
          
          <TabsContent value="luxury" className="space-y-4">
            {renderTemplates(luxuryTemplates)}
          </TabsContent>
          
          <TabsContent value="urgent" className="space-y-4">
            {renderTemplates(urgentTemplates)}
          </TabsContent>
          
          {showVietnameseTab && (
            <TabsContent value="vietnamese" className="space-y-4">
              {renderTemplates(vietnameseNailTemplates)}
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
