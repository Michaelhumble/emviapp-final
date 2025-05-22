import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { JobFormValues } from './jobFormSchema';
import { getJobTemplates as getJobTemplate, JobTemplateType } from '@/utils/jobs/jobTemplates';
import { 
  Scissors, 
  Fingerprint, 
  PenTool, 
  UserCircle, 
  Brush, 
  Heart, 
  Phone, 
  ClipboardList, 
  User, 
  Paintbrush, 
  Store, 
  UserCheck 
} from 'lucide-react';

interface JobTemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const JobTemplateCard: React.FC<JobTemplateCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-700">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues, templateType: JobTemplateType) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const handleTemplateSelect = (templateType: JobTemplateType) => {
    const template = getJobTemplate(templateType);
    onTemplateSelect(template, templateType);
  };

  const templates = [
    {
      type: 'nails' as JobTemplateType,
      title: 'Nail Technician',
      description: 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
      icon: <Fingerprint size={24} />
    },
    {
      type: 'hair' as JobTemplateType,
      title: 'Hair Stylist',
      description: 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
      icon: <Scissors size={24} />
    },
    {
      type: 'lashes' as JobTemplateType,
      title: 'Lash Technician',
      description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
      icon: <PenTool size={24} />
    },
    {
      type: 'barber' as JobTemplateType,
      title: 'Barber',
      description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
      icon: <Scissors size={24} strokeWidth={3} />
    },
    {
      type: 'skincare' as JobTemplateType,
      title: 'Esthetician',
      description: 'For spas and salons seeking skincare specialists for facials and treatments.',
      icon: <Brush size={24} />
    },
    {
      type: 'spa' as JobTemplateType,
      title: 'Spa Technician',
      description: 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
      icon: <Heart size={24} />
    },
    {
      type: 'receptionist' as JobTemplateType,
      title: 'Salon Receptionist',
      description: 'For salons seeking front desk staff to manage scheduling, client check-ins, and salon operations.',
      icon: <Phone size={24} />
    },
    {
      type: 'manager' as JobTemplateType,
      title: 'Salon Manager',
      description: 'For businesses seeking experienced professionals to oversee salon operations and team leadership.',
      icon: <ClipboardList size={24} />
    },
    {
      type: 'massage' as JobTemplateType,
      title: 'Massage Therapist',
      description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
      icon: <User size={24} />
    },
    {
      type: 'tattoo' as JobTemplateType,
      title: 'Tattoo Artist',
      description: 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
      icon: <PenTool size={24} strokeWidth={3} />
    },
    {
      type: 'makeup' as JobTemplateType,
      title: 'Makeup Artist',
      description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
      icon: <Paintbrush size={24} />
    },
    {
      type: 'booth' as JobTemplateType,
      title: 'Booth Rental Available',
      description: 'For salon owners offering booth rental space to independent beauty professionals.',
      icon: <Store size={24} />
    },
    {
      type: 'beauty' as JobTemplateType,
      title: 'Other Beauty Professional',
      description: 'For businesses seeking specialized beauty services such as microblading, threading, or waxing.',
      icon: <UserCheck size={24} />
    },
    {
      type: 'custom' as JobTemplateType,
      title: 'Other / Custom',
      description: 'Create a custom job posting for any beauty industry position with your own details.',
      icon: <UserCircle size={24} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">Choose a Job Template</h2>
        <p className="text-gray-600">Select a template to start with pre-filled industry-specific details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <JobTemplateCard
            key={template.type}
            title={template.title}
            description={template.description}
            icon={template.icon}
            onClick={() => handleTemplateSelect(template.type)}
          />
        ))}
      </div>

      <Separator className="my-6" />

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          You'll be able to customize all details after selecting a template
        </p>
      </div>
    </div>
  );
};

export default JobTemplateSelector;
