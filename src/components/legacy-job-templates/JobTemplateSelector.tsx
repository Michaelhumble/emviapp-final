
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: any) => void;
}

const jobTemplates = [
  {
    id: 'nail-tech',
    title: 'Nail Technician',
    description: 'Perfect for hiring experienced nail technicians',
    data: {
      title: 'Nail Technician',
      company: 'Beauty Salon',
      location: 'City, State',
      employmentType: 'Full-time',
    }
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    description: 'Great template for hair styling positions',
    data: {
      title: 'Hair Stylist',
      company: 'Hair Salon',
      location: 'City, State',
      employmentType: 'Part-time',
    }
  }
];

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobTemplates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <Button onClick={() => onTemplateSelect(template.data)}>
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
