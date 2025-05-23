
import React from 'react';
import JobTemplateSelector from './JobTemplateSelector';

interface JobTemplatesProps {
  onTemplateSelect: (template: any) => void;
  isSubmitting?: boolean;
}

const JobTemplates: React.FC<JobTemplatesProps> = ({ onTemplateSelect, isSubmitting = false }) => {
  return (
    <div className="space-y-8">
      <JobTemplateSelector 
        onTemplateSelect={onTemplateSelect} 
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default JobTemplates;
