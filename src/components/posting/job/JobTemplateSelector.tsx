
import React from 'react';
import { motion } from 'framer-motion';
import { JobFormValues } from './jobFormSchema';
import { Card } from '@/components/ui/card';
import { luxuryGradients, luxuryBorders } from './luxuryGradients';
import LuxuryJobCard from './LuxuryJobCard';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const handleTemplateSelect = (template: JobFormValues) => {
    onTemplateSelect(template);
  };

  const templates: { 
    id: string;
    title: string;
    description: string;
    gradient: string;
    border: string;
    template: JobFormValues;
  }[] = [
    {
      id: 'nails',
      title: 'Nail Technician',
      description: 'Post jobs for skilled nail technicians and specialists.',
      gradient: luxuryGradients.champagne,
      border: luxuryBorders.champagne,
      template: {
        title: 'Nail Technician Needed',
        description: 'Looking for experienced Nail Technician with a positive attitude to join our growing team. Must have strong acrylic and pedicure skills.',
        vietnameseDescription: 'Đang tìm Kỹ thuật viên Nail có kinh nghiệm với thái độ tích cực để tham gia đội ngũ đang phát triển của chúng tôi. Phải có kỹ năng mạnh mẽ về đắp bột và làm chân.',
        location: '',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
      }
    },
    {
      id: 'hair',
      title: 'Hair Stylist',
      description: 'Post jobs for skilled hair stylists and colorists.',
      gradient: luxuryGradients.softBlush,
      border: luxuryBorders.softBlush,
      template: {
        title: 'Hair Stylist Position',
        description: 'Upscale salon seeking experienced Hair Stylist. Must be skilled in cutting, styling, and coloring. Looking for someone with a strong clientele and passion for the industry.',
        location: '',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
      }
    },
    {
      id: 'lashes',
      title: 'Lash Artist',
      description: 'Post jobs for lash extension specialists.',
      gradient: luxuryGradients.paleRose,
      border: luxuryBorders.paleRose,
      template: {
        title: 'Experienced Lash Artist',
        description: 'Seeking skilled Lash Artist for busy studio. Experience with classic and volume sets required. Strong attention to detail and excellent client service skills a must.',
        location: '',
        jobType: 'part-time',
        experience_level: 'experienced',
        contactEmail: '',
      }
    },
    {
      id: 'massage',
      title: 'Massage Therapist',
      description: 'Post jobs for licensed massage therapists.',
      gradient: luxuryGradients.cashmere,
      border: luxuryBorders.cashmere,
      template: {
        title: 'Licensed Massage Therapist',
        description: 'Now hiring Licensed Massage Therapists. Seeking skilled therapists with experience in various massage techniques. Must have valid license and professional demeanor.',
        location: '',
        jobType: 'part-time',
        experience_level: 'intermediate',
        contactEmail: '',
      }
    },
    {
      id: 'barber',
      title: 'Barber',
      description: 'Post jobs for professional barbers.',
      gradient: luxuryGradients.paleMocha,
      border: luxuryBorders.paleMocha,
      template: {
        title: 'Professional Barber Wanted',
        description: 'Modern barbershop looking for professional Barber with skills in traditional and modern cuts, fades, and beard grooming. Strong portfolio and reliable work ethic required.',
        location: '',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
      }
    },
    {
      id: 'makeup',
      title: 'Makeup Artist',
      description: 'Post jobs for makeup artists and consultants.',
      gradient: luxuryGradients.pearl,
      border: luxuryBorders.pearl,
      template: {
        title: 'Freelance Makeup Artist',
        description: 'Hiring Makeup Artists for bridal and special events. Must have strong portfolio showing versatility in different makeup styles and experience with diverse skin types.',
        location: '',
        jobType: 'contract',
        experience_level: 'experienced',
        contactEmail: '',
      }
    },
    {
      id: 'brows',
      title: 'Brow Artist',
      description: 'Post jobs for brow specialists and technicians.',
      gradient: luxuryGradients.cream,
      border: luxuryBorders.cream,
      template: {
        title: 'Brow Artist Position',
        description: 'Seeking skilled Brow Artist with experience in microblading, threading, and tinting. Attention to detail and ability to shape according to face structure essential.',
        location: '',
        jobType: 'part-time',
        experience_level: 'experienced',
        contactEmail: '',
      }
    },
    {
      id: 'skincare',
      title: 'Skincare Specialist',
      description: 'Post jobs for estheticians and skincare experts.',
      gradient: luxuryGradients.ivory,
      border: luxuryBorders.ivory,
      template: {
        title: 'Licensed Esthetician',
        description: 'Luxury spa seeking Licensed Esthetician with knowledge of advanced skin treatments and product lines. Experience with facials, peels, and skin analysis required.',
        location: '',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
      }
    },
    {
      id: 'tattoo',
      title: 'Tattoo Artist',
      description: 'Post jobs for professional tattoo artists.',
      gradient: luxuryGradients.paleRose,
      border: luxuryBorders.paleRose,
      template: {
        title: 'Tattoo Artist Needed',
        description: 'Professional tattoo studio looking for experienced Tattoo Artist. Strong portfolio, excellent line work, and versatile style range required. Health certification a must.',
        location: '',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
      }
    },
    {
      id: 'custom',
      title: 'Custom Job',
      description: 'Create a custom job posting for any position.',
      gradient: luxuryGradients.champagne,
      border: luxuryBorders.champagne,
      template: {
        title: '',
        description: '',
        location: '',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
      }
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">Select Job Template</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Choose a template to jumpstart your job posting. You can customize all details in the next step.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <LuxuryJobCard
            key={template.id}
            title={template.title}
            description={template.description}
            onClick={() => handleTemplateSelect(template.template)}
            gradientClass={template.gradient}
            className={template.border}
          />
        ))}
      </div>
      
      <div className="text-center mt-8 text-xs italic text-gray-400">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
