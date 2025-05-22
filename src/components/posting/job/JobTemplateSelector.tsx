
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jobTemplates, mapTemplateToFormValues } from './jobTemplates';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JobFormValues } from './jobFormSchema';
import { JobTemplate } from './jobFormSchema';
import { Card, CardContent } from '@/components/ui/card';

interface JobTemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateSelect: (values: Partial<JobFormValues>) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  open, 
  onOpenChange, 
  onTemplateSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter templates by category
  const filteredTemplates = selectedCategory 
    ? jobTemplates.filter(template => template.industry === selectedCategory)
    : jobTemplates;
  
  // Get unique categories
  const categories = Array.from(
    new Set(jobTemplates.map(template => template.industry))
  );

  // Handle template selection
  const handleSelectTemplate = (template: JobTemplate) => {
    const formValues = mapTemplateToFormValues(template);
    onTemplateSelect({
      ...formValues,
      vietnamese_description: template.vietnamese_description
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Select a Job Template</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 my-4">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {filteredTemplates.map(template => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:border-primary transition-all"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{template.industry.charAt(0).toUpperCase() + template.industry.slice(1)} • {template.salonName}</p>
                  <p className="text-sm line-clamp-3">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default JobTemplateSelector;
