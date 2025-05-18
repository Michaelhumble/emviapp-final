
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { JobFormValues } from './jobFormSchema';
import { IndustryType } from '@/components/posting/job/jobFormSchema';

// Premium job templates with luxury styling
interface JobTemplate {
  id: string;
  title: string;
  description: string;
  industry: IndustryType;
  initialValues: JobFormValues;
  backgroundColor: string;
  borderColor: string;
}

const templates: JobTemplate[] = [
  {
    id: 'nail-technician',
    title: 'Nail Technician',
    description: 'Find skilled nail artists for your salon',
    industry: 'nails',
    backgroundColor: 'bg-[#f9f5f0]',
    borderColor: 'border-[#e2d1c3]',
    initialValues: {
      title: 'Nail Technician',
      description: 'We are looking for an experienced nail technician to join our team.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Experience with acrylic', 'Customer service skills'],
      specialties: ['Acrylic', 'Gel', 'Manicure'],
    },
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    description: 'Recruit talented hair professionals',
    industry: 'hair',
    backgroundColor: 'bg-[#f5f0eb]',
    borderColor: 'border-[#e5d6c9]',
    initialValues: {
      title: 'Hair Stylist',
      description: 'Join our upscale salon as a professional hair stylist.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Cosmetology license', 'Portfolio of work'],
      specialties: ['Color', 'Cutting', 'Styling'],
    },
  },
  {
    id: 'lash-artist',
    title: 'Lash Artist',
    description: 'Hire lash extension specialists',
    industry: 'lashes',
    backgroundColor: 'bg-[#f2edf2]',
    borderColor: 'border-[#e0d5e0]',
    initialValues: {
      title: 'Lash Technician',
      description: 'Seeking a certified lash artist with attention to detail.',
      location: '',
      jobType: 'part-time',
      experience_level: 'intermediate',
      contactEmail: '',
      requirements: ['Lash certification', 'Customer service skills'],
      specialties: ['Classic Lashes', 'Volume Lashes', 'Hybrid Lashes'],
    },
  },
  {
    id: 'massage-therapist',
    title: 'Massage Therapist',
    description: 'Find licensed massage professionals',
    industry: 'massage',
    backgroundColor: 'bg-[#efeae4]',
    borderColor: 'border-[#dfd6ca]',
    initialValues: {
      title: 'Massage Therapist',
      description: 'Licensed massage therapist needed for our wellness center.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Massage license', 'Knowledge of multiple techniques'],
      specialties: ['Deep Tissue', 'Swedish', 'Hot Stone'],
    },
  },
  {
    id: 'barber',
    title: 'Barber',
    description: 'Recruit skilled barbers for your shop',
    industry: 'barber',
    backgroundColor: 'bg-[#eeece6]',
    borderColor: 'border-[#dcd8cc]',
    initialValues: {
      title: 'Barber',
      description: 'Experienced barber wanted for modern barbershop.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Barber license', 'Experience with diverse hair types'],
      specialties: ['Fades', 'Beard Trimming', 'Hot Towel Shaves'],
    },
  },
  {
    id: 'makeup-artist',
    title: 'Makeup Artist',
    description: 'Hire professional makeup artists',
    industry: 'makeup',
    backgroundColor: 'bg-[#f5f0eb]',
    borderColor: 'border-[#e5d6c9]',
    initialValues: {
      title: 'Makeup Artist',
      description: 'Creative makeup artist needed for our beauty team.',
      location: '',
      jobType: 'part-time',
      experience_level: 'intermediate',
      contactEmail: '',
      requirements: ['Portfolio of work', 'Experience with various skin tones'],
      specialties: ['Bridal', 'Special Events', 'Editorial'],
    },
  },
  {
    id: 'brow-artist',
    title: 'Brow Artist',
    description: 'Find specialists in eyebrow shaping',
    industry: 'brows',
    backgroundColor: 'bg-[#f2edf2]',
    borderColor: 'border-[#e0d5e0]',
    initialValues: {
      title: 'Brow Artist',
      description: 'Seeking a talented brow artist for our growing team.',
      location: '',
      jobType: 'part-time',
      experience_level: 'intermediate',
      contactEmail: '',
      requirements: ['Experience with microblading', 'Attention to detail'],
      specialties: ['Microblading', 'Waxing', 'Threading'],
    },
  },
  {
    id: 'skincare-specialist',
    title: 'Skincare Specialist',
    description: 'Hire estheticians and skin experts',
    industry: 'skincare',
    backgroundColor: 'bg-[#efeae4]',
    borderColor: 'border-[#dfd6ca]',
    initialValues: {
      title: 'Esthetician',
      description: 'Licensed esthetician needed for our spa.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Esthetician license', 'Product knowledge'],
      specialties: ['Facials', 'Chemical Peels', 'Skin Analysis'],
    },
  },
  {
    id: 'tattoo-artist',
    title: 'Tattoo Artist',
    description: 'Find talented tattoo professionals',
    industry: 'tattoo',
    backgroundColor: 'bg-[#eeece6]',
    borderColor: 'border-[#dcd8cc]',
    initialValues: {
      title: 'Tattoo Artist',
      description: 'Creative tattoo artist wanted for our studio.',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: ['Strong portfolio', 'Excellent drawing skills'],
      specialties: ['Traditional', 'Japanese', 'Realism'],
    },
  },
  {
    id: 'custom-job',
    title: 'Custom Job',
    description: 'Create a completely custom listing',
    industry: 'nails',
    backgroundColor: 'bg-[#f9f5f0]',
    borderColor: 'border-[#e2d1c3]',
    initialValues: {
      title: '',
      description: '',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      requirements: [],
      specialties: [],
    },
  },
];

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const navigate = useNavigate();

  const handleSelectTemplate = (template: JobFormValues) => {
    onTemplateSelect(template);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-2">Select a Job Template</h2>
        <p className="text-gray-600">Choose a template to get started quickly</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border ${template.borderColor} ${template.backgroundColor} group hover:translate-y-[-2px]`}
            style={{
              borderRadius: '18px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(5px)',
            }}
            onClick={() => handleSelectTemplate(template.initialValues)}
          >
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="font-playfair text-xl font-bold tracking-tight">{template.title}</h3>
                <p className="text-gray-600 font-inter text-sm">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-12">
        <span>Inspired by Sunshine ☀️</span>
      </div>
    </div>
  );
};

export default JobTemplateSelector;
