
import React from 'react';
import { JobFormValues } from './jobFormSchema';

interface JobTemplatesProps {
  onSelectTemplate: (template: Partial<JobFormValues>) => void;
}

const JobTemplates: React.FC<JobTemplatesProps> = ({ onSelectTemplate }) => {
  // Sample template data
  const templates = [
    {
      id: 'nail-tech',
      title: 'Nail Technician',
      salonName: 'Example Salon',
      description: 'We are looking for experienced nail technicians to join our team. Must be skilled in acrylic, gel, and nail art.',
      vietnamese_description: 'Chúng tôi đang tìm kiếm các kỹ thuật viên làm móng có kinh nghiệm để tham gia vào đội ngũ của chúng tôi.',
      location: 'Los Angeles, CA',
      jobType: 'full-time',
      compensation_type: 'commission',
      compensation_details: '60% commission + tips',
      weekly_pay: true,
      has_housing: false,
      requirements: ['At least 2 years experience', 'Valid license']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map(template => (
        <div
          key={template.id}
          onClick={() => onSelectTemplate(template)}
          className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
        >
          <h3 className="font-medium text-lg">{template.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.salonName}</p>
          <p className="text-sm mt-2 line-clamp-3">{template.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobTemplates;
