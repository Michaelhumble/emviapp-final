
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues } from './jobFormSchema';
import { IndustryType } from '@/utils/posting/types';

interface JobTemplateProps {
  onSelectTemplate: (template: JobFormValues) => void;
}

const JobTemplates: React.FC<JobTemplateProps> = ({ onSelectTemplate }) => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  const handleSelectTemplate = (template: JobFormValues, industryId: string) => {
    setSelectedTemplate(industryId);
    onSelectTemplate(template);
  };

  // Template data for different industries
  const templates: {
    id: string;
    industry: IndustryType;
    title: string;
    subtitle: string;
    color: string;
    template: JobFormValues;
  }[] = [
    {
      id: 'nails',
      industry: 'nails',
      title: 'Nail Technician',
      subtitle: 'Find experienced nail artists for your salon',
      color: 'bg-blue-50',
      template: {
        title: 'Nail Technician Wanted',
        description: 'Looking for an experienced nail technician to join our friendly salon. Full-time position with competitive pay and flexible schedule.',
        vietnameseDescription: 'Cần thợ nail có kinh nghiệm để tham gia tiệm salon thân thiện của chúng tôi. Công việc toàn thời gian với mức lương cạnh tranh và lịch trình linh hoạt.',
        location: '',
        compensation_details: 'Weekly pay with tips',
        salary_range: '$700-1200/week',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        requirements: ['Valid license', 'At least 1 year experience', 'Acrylic and gel experience'],
        specialties: ['Acrylic', 'Gel', 'Dipping powder', 'Nail art']
      }
    },
    {
      id: 'hair',
      industry: 'hair',
      title: 'Hair Stylist',
      subtitle: 'Find creative stylists for your salon',
      color: 'bg-purple-50',
      template: {
        title: 'Hair Stylist Needed',
        description: 'Seeking talented hair stylist with color and cutting expertise to join our team. Commission-based with existing clientele preferred.',
        location: '',
        compensation_details: 'Commission based + product bonus',
        salary_range: '60% commission',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
        requirements: ['Cosmetology license', 'Portfolio of work', 'Customer service skills'],
        specialties: ['Color', 'Cutting', 'Styling', 'Extensions']
      }
    },
    {
      id: 'lashes',
      industry: 'lashes',
      title: 'Lash Technician',
      subtitle: 'Find skilled lash artists for your studio',
      color: 'bg-pink-50',
      template: {
        title: 'Lash Artist Needed',
        description: 'Looking for a certified lash artist to join our beauty studio. Experience with volume lashes preferred.',
        location: '',
        compensation_details: 'Base pay + commission',
        salary_range: '$600-1000/week',
        jobType: 'part-time',
        experience_level: 'intermediate',
        contactEmail: '',
        requirements: ['Lash certification', 'Attention to detail', 'Professional demeanor'],
        specialties: ['Classic lashes', 'Volume lashes', 'Hybrid sets']
      }
    },
    {
      id: 'massage',
      industry: 'massage',
      title: 'Massage Therapist',
      subtitle: 'Find licensed therapists for your spa',
      color: 'bg-green-50', 
      template: {
        title: 'Licensed Massage Therapist',
        description: 'Seeking licensed massage therapist for upscale day spa. Experience in various modalities required.',
        location: '',
        compensation_details: 'Hourly + tips',
        salary_range: '$25-35/hour + tips',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        requirements: ['Valid massage license', 'Insurance', 'Physical stamina'],
        specialties: ['Deep tissue', 'Swedish', 'Hot stone', 'Prenatal']
      }
    },
    {
      id: 'brows',
      industry: 'brows',
      title: 'Brow Artist',
      subtitle: 'Find eyebrow specialists for your salon',
      color: 'bg-yellow-50',
      template: {
        title: 'Eyebrow Specialist Needed',
        description: 'Seeking experienced brow artist skilled in microblading, tinting, and shaping for our beauty studio.',
        location: '',
        compensation_details: 'Hourly + commission',
        salary_range: '$18-25/hour + commission',
        jobType: 'part-time',
        experience_level: 'experienced',
        contactEmail: '',
        requirements: ['Esthetician license', 'Microblading certification', 'Portfolio'],
        specialties: ['Microblading', 'Lamination', 'Tinting', 'Threading']
      }
    },
    {
      id: 'skincare',
      industry: 'skincare',
      title: 'Esthetician',
      subtitle: 'Find skincare specialists for your spa',
      color: 'bg-orange-50',
      template: {
        title: 'Licensed Esthetician Wanted',
        description: 'Seeking licensed esthetician with facial treatment expertise and excellent customer service skills.',
        location: '',
        compensation_details: 'Base + commission',
        salary_range: '$16-22/hour + commission',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
        requirements: ['Esthetician license', 'Product knowledge', 'Customer service skills'],
        specialties: ['Facials', 'Chemical peels', 'Microdermabrasion', 'Waxing']
      }
    },
    {
      id: 'barber',
      industry: 'barber',
      title: 'Barber',
      subtitle: 'Find professional barbers for your shop',
      color: 'bg-indigo-50',
      template: {
        title: 'Experienced Barber Needed',
        description: 'Looking for skilled barber proficient in modern cuts, fades, and beard grooming to join our team.',
        location: '',
        compensation_details: 'Commission based + tips',
        salary_range: '60-70% commission',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        requirements: ['Barber license', 'Cutting expertise', 'Professional attitude'],
        specialties: ['Fades', 'Beard grooming', 'Hot towel shaves', 'Line-ups']
      }
    },
    {
      id: 'makeup',
      industry: 'makeup',
      title: 'Makeup Artist',
      subtitle: 'Find talented makeup artists for your studio',
      color: 'bg-rose-50',
      template: {
        title: 'Makeup Artist Position',
        description: 'Seeking creative makeup artist with experience in bridal, special occasion, and photoshoot makeup.',
        location: '',
        compensation_details: 'Per client + retail commission',
        salary_range: '$25-40/hour + commission',
        jobType: 'part-time',
        experience_level: 'intermediate',
        contactEmail: '',
        requirements: ['Professional makeup kit', 'Portfolio', 'Reliable transportation'],
        specialties: ['Bridal', 'Special occasion', 'Natural looks', 'Dramatic looks']
      }
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">
          {t({
            english: 'Select a Job Template',
            vietnamese: 'Chọn Mẫu Công Việc'
          })}
        </h2>
        <p className="text-gray-600">
          {t({
            english: 'Choose the industry for your job posting',
            vietnamese: 'Chọn ngành nghề cho bài đăng việc làm của bạn'
          })}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 snap-x scrollbar-none">
        {templates.map((item) => (
          <motion.div
            key={item.id}
            className={`rounded-lg p-5 cursor-pointer shadow-sm border transition-all duration-200 h-36 flex flex-col justify-center text-center ${
              selectedTemplate === item.id 
              ? `${item.color} border-primary ring-2 ring-primary/20` 
              : `${item.color} border-transparent hover:shadow-md`
            }`}
            whileHover={{ y: -2 }}
            onClick={() => handleSelectTemplate(item.template, item.id)}
          >
            <h3 className="text-lg font-bold mb-1.5">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500 pt-2">
        <p>Inspired by Sunshine ☀️</p>
      </div>
    </div>
  );
};

export default JobTemplates;
