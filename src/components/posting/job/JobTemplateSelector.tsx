
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { JobFormValues } from './jobFormSchema';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { t } = useTranslation();
  
  // Template options with industry-specific content
  const jobTemplates = [
    {
      id: 'nails',
      title: t({
        english: 'Nail Technician',
        vietnamese: 'Thợ Nail'
      }),
      subtitle: t({
        english: 'Hire skilled nail artists and technicians',
        vietnamese: 'Tuyển thợ làm móng tay chân có tay nghề'
      }),
      color: 'bg-blue-50',
      template: {
        title: 'Experienced Nail Technician Needed',
        description: 'We are looking for an experienced nail technician to join our team. Must have at least 2 years of experience and be skilled in acrylic, gel, and nail art.',
        vietnameseDescription: 'Cần thợ nail có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Phải có ít nhất 2 năm kinh nghiệm và thành thạo kỹ năng làm bột, gel và vẽ móng.',
        location: '',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        specialties: ['Acrylic', 'Gel', 'Nail Art'],
        requirements: ['2+ years experience', 'Nail art skills', 'Customer service oriented']
      }
    },
    {
      id: 'hair',
      title: t({
        english: 'Hair Stylist',
        vietnamese: 'Thợ Tóc'
      }),
      subtitle: t({
        english: 'Find professional hair stylists and colorists',
        vietnamese: 'Tìm thợ làm tóc và thợ nhuộm chuyên nghiệp'
      }),
      color: 'bg-purple-50',
      template: {
        title: 'Professional Hair Stylist Position',
        description: 'Seeking a talented hair stylist with cutting, coloring, and styling expertise. Must have excellent customer service and ability to build clientele.',
        location: '',
        jobType: 'full-time',
        experience_level: 'intermediate',
        contactEmail: '',
        specialties: ['Cutting', 'Coloring', 'Styling'],
        requirements: ['Cosmetology license', 'Portfolio of work', 'Strong communication skills']
      }
    },
    {
      id: 'lashes',
      title: t({
        english: 'Lash Artist',
        vietnamese: 'Thợ Mi'
      }),
      subtitle: t({
        english: 'Recruit specialized eyelash extension experts',
        vietnamese: 'Tuyển chuyên gia nối mi chuyên nghiệp'
      }),
      color: 'bg-pink-50',
      template: {
        title: 'Lash Artist / Eyelash Extension Specialist',
        description: 'Looking for a certified lash artist with experience in classic and volume lash extensions. Must have attention to detail and good time management.',
        location: '',
        jobType: 'part-time',
        experience_level: 'intermediate',
        contactEmail: '',
        specialties: ['Classic Lashes', 'Volume Lashes', 'Lash Lifts'],
        requirements: ['Lash certification', 'Minimum 1 year experience', 'Portfolio of work']
      }
    },
    {
      id: 'barber',
      title: t({
        english: 'Barber',
        vietnamese: 'Thợ Cắt Tóc Nam'
      }),
      subtitle: t({
        english: 'Hire skilled barbers for your shop',
        vietnamese: 'Tuyển thợ cắt tóc nam có kỹ năng'
      }),
      color: 'bg-amber-50',
      template: {
        title: 'Experienced Barber Wanted',
        description: 'Seeking skilled barber with experience in modern cuts, fades, and traditional techniques. Must have strong client communication skills.',
        location: '',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        specialties: ['Fades', 'Beard Trims', 'Hot Towel Shaves'],
        requirements: ['Barber license', '2+ years experience', 'Knowledge of current trends']
      }
    },
    {
      id: 'makeup',
      title: t({
        english: 'Makeup Artist',
        vietnamese: 'Chuyên Gia Trang Điểm'
      }),
      subtitle: t({
        english: 'Find professional makeup artists',
        vietnamese: 'Tìm chuyên gia trang điểm chuyên nghiệp'
      }),
      color: 'bg-rose-50',
      template: {
        title: 'Makeup Artist Position Available',
        description: 'Looking for a talented makeup artist with experience in bridal, editorial, and everyday makeup. Must have a diverse portfolio and excellent client skills.',
        location: '',
        jobType: 'part-time',
        experience_level: 'intermediate',
        contactEmail: '',
        specialties: ['Bridal', 'Editorial', 'Special Events'],
        requirements: ['Makeup certification', 'Portfolio showcasing diverse styles', 'Own professional kit']
      }
    },
    {
      id: 'massage',
      title: t({
        english: 'Massage Therapist',
        vietnamese: 'Chuyên Viên Massage'
      }),
      subtitle: t({
        english: 'Recruit licensed massage professionals',
        vietnamese: 'Tuyển chuyên viên massage có giấy phép'
      }),
      color: 'bg-green-50',
      template: {
        title: 'Licensed Massage Therapist Needed',
        description: 'Seeking a licensed massage therapist with experience in various modalities including Swedish, deep tissue, and hot stone massage.',
        location: '',
        jobType: 'full-time',
        experience_level: 'experienced',
        contactEmail: '',
        specialties: ['Swedish', 'Deep Tissue', 'Hot Stone'],
        requirements: ['Massage therapy license', 'Minimum 2 years experience', 'Knowledge of multiple techniques']
      }
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
          {t({
            english: 'Make Your Job Post Stand Out',
            vietnamese: 'Làm Nổi Bật Bài Đăng Việc Làm Của Bạn'
          })}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Start with a professional template designed for your industry',
            vietnamese: 'Bắt đầu với mẫu chuyên nghiệp được thiết kế cho ngành của bạn'
          })}
        </p>
      </motion.div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4">
        {jobTemplates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-shadow hover:shadow-md border rounded-xl overflow-hidden ${template.color}`}
            onClick={() => onTemplateSelect(template.template)}
          >
            <CardContent className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-1.5">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-6">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
