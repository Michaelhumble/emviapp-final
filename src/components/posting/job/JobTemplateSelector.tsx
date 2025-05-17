
import React, { useState, useEffect } from 'react';
import TemplateCarousel from './TemplateCarousel';
import { IndustryType, JobTemplate, jobTemplatesByIndustry } from './jobTemplates';
import { JobFormValues } from './jobFormSchema';

interface JobTemplateSelectorProps {
  selectedIndustry: IndustryType | '';
  onSelectTemplate: (templateData: Partial<JobFormValues>) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  selectedIndustry,
  onSelectTemplate
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show template selector only when an industry is selected
    if (selectedIndustry) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedIndustry]);
  
  const handleSelectTemplate = (template: JobTemplate) => {
    // Convert template format to job form values format
    const formValues: Partial<JobFormValues> = {
      title: template.title,
      industry: template.industry,
      location: template.location,
      description: template.description.join('\n\n'),
      requirements: template.requirements,
      benefits: template.benefits,
      salary_range: template.salary_range,
      schedule: template.schedule,
      employment_type: template.employment_type
    };
    
    onSelectTemplate(formValues);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <TemplateCarousel 
      selectedIndustry={selectedIndustry as IndustryType}
      onSelectTemplate={handleSelectTemplate}
    />
  );
};

export default JobTemplateSelector;
