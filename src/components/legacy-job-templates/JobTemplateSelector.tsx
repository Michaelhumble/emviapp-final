
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jobTemplates } from './jobTemplates';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: any) => void;
  isSubmitting?: boolean;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  onTemplateSelect, 
  isSubmitting = false 
}) => {
  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    if (typeof onTemplateSelect === 'function') {
      onTemplateSelect(template);
    } else {
      console.warn('onTemplateSelect is not a function');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobTemplates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{template.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <Button 
                onClick={() => handleTemplateSelect(template.data)}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Publishing...' : 'Use Template & Publish'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
