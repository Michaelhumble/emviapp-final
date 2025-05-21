
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { jobDescriptionTemplates, IndustryTemplates, DescriptionTemplate } from '@/utils/templates/jobDescriptionTemplates';

interface TemplateSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectTemplate: (description: string, vietnameseDescription?: string) => void;
  industryType?: string;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  open,
  onClose,
  onSelectTemplate,
  industryType = 'nails'
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(industryType);

  const templates = useMemo(() => {
    return jobDescriptionTemplates.find(
      (industry) => industry.industry.toLowerCase() === selectedTab.toLowerCase()
    )?.templates || [];
  }, [selectedTab]);

  const handleSelectTemplate = (template: DescriptionTemplate) => {
    setSelectedTemplateId(template.id);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplateId) {
      const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
      if (selectedTemplate) {
        onSelectTemplate(selectedTemplate.description, selectedTemplate.vietnameseDescription);
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Polish Job Description with Templates
          </DialogTitle>
          <DialogDescription>
            Select a professional job description template to enhance your listing
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={industryType} 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
            <TabsTrigger value="nails">Nails</TabsTrigger>
            <TabsTrigger value="hair">Hair</TabsTrigger>
            <TabsTrigger value="lashes">Lashes</TabsTrigger>
            <TabsTrigger value="barber">Barber</TabsTrigger>
            <TabsTrigger value="skincare">Skincare</TabsTrigger>
            <TabsTrigger value="microblading">PMU</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplateId === template.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'hover:border-primary/20'
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <CardContent className="p-4 relative">
                    {selectedTemplateId === template.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                    
                    <h3 className="font-medium text-sm mb-2">{template.title}</h3>
                    <div className="text-sm text-muted-foreground line-clamp-3">
                      {template.description}
                    </div>

                    {template.vietnameseDescription && (
                      <>
                        <Separator className="my-3" />
                        <div className="text-sm text-muted-foreground italic line-clamp-3">
                          {template.vietnameseDescription}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="mt-4 flex gap-2 items-center">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleApplyTemplate}
            disabled={!selectedTemplateId}
          >
            Apply Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
