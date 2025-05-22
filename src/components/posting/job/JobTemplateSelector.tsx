
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IndustryType, JobFormValues } from './jobFormSchema';

export interface JobTemplateSelectorProps {
  onSelect: (template: JobFormValues, templateType: IndustryType) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onSelect }) => {
  // Template categories
  const templates = [
    { id: 'nails', name: 'Nail Salon', icon: '💅' },
    { id: 'hair', name: 'Hair Salon', icon: '✂️' },
    { id: 'lashes', name: 'Lash Studio', icon: '👁️' },
    { id: 'massage', name: 'Massage', icon: '👐' },
    { id: 'tattoo', name: 'Tattoo Studio', icon: '🎨' },
    { id: 'brows', name: 'Brows Studio', icon: '🧿' },
    { id: 'skincare', name: 'Skincare', icon: '✨' },
    { id: 'barber', name: 'Barber Shop', icon: '💈' },
    { id: 'makeup', name: 'Makeup Artist', icon: '🧑‍🎨' },
    { id: 'custom', name: 'Start From Scratch', icon: '📝' }
  ];
  
  const handleTemplateSelect = (templateId: string) => {
    onSelect({
      industry: templateId,
      templateType: templateId
    } as JobFormValues, templateId as IndustryType);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-semibold text-gray-900">Choose a Template</h2>
        <p className="text-muted-foreground mt-2">Select an industry to get started with a pre-filled job posting</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{template.icon}</div>
              <h3 className="text-lg font-medium">{template.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
