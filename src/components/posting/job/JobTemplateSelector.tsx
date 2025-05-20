
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getJobTemplateByType, JobTemplateType } from '@/utils/jobs/jobTemplates';
import { JobFormValues } from './jobFormSchema';

interface TemplateCardProps {
  title: string;
  description: string;
  templateType: JobTemplateType;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, templateType, onSelect }) => {
  return (
    <Card className="w-full h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Template preview content here */}
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={onSelect} 
          variant="outline" 
          className="w-full"
        >
          Use This Template
        </Button>
      </CardFooter>
    </Card>
  );
};

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues, templateType: JobTemplateType) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const handleTemplateSelect = (templateType: JobTemplateType) => {
    const template = getJobTemplateByType(templateType);
    onTemplateSelect(template, templateType);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Select a Job Template</h1>
        <p className="text-gray-600 mt-1">Choose a template to get started or create a custom job post</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemplateCard
          title="Nail Technician"
          description="Template for nail tech positions including acrylic, gel, and regular manicures."
          templateType="nail-tech"
          onSelect={() => handleTemplateSelect("nail-tech")}
        />
        <TemplateCard
          title="Hair Stylist"
          description="Template for hair stylists with experience in cuts, color, and styling."
          templateType="hair-stylist"
          onSelect={() => handleTemplateSelect("hair-stylist")}
        />
        <TemplateCard
          title="Esthetician"
          description="Template for licensed estheticians with facial and skin treatment experience."
          templateType="esthetician"
          onSelect={() => handleTemplateSelect("esthetician")}
        />
        <TemplateCard
          title="Massage Therapist"
          description="Template for licensed massage therapists with various massage techniques."
          templateType="massage-therapist"
          onSelect={() => handleTemplateSelect("massage-therapist")}
        />
        <TemplateCard
          title="Waxing Specialist"
          description="Template for waxing specialists with all types of waxing services."
          templateType="waxing-specialist"
          onSelect={() => handleTemplateSelect("waxing-specialist")}
        />
        <TemplateCard
          title="Custom Job Post"
          description="Create a job post from scratch with your own requirements and details."
          templateType="custom"
          onSelect={() => handleTemplateSelect("custom")}
        />
      </div>
    </div>
  );
};

export { JobTemplateSelector };
export type { JobTemplateType };
export default JobTemplateSelector;

