
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { t } = useTranslation();

  const jobTemplates = [
    {
      id: 'nail-tech',
      title: t({
        english: 'Nail Technician',
        vietnamese: 'Thợ Nail'
      }),
      description: t({
        english: 'Find experienced nail technicians for your salon',
        vietnamese: 'Tìm thợ nail có kinh nghiệm cho salon của bạn'
      }),
      template: {
        title: "Experienced Nail Technician Needed",
        description: "Looking for skilled nail technicians to join our team. We offer a great working environment, competitive pay, and flexible hours. Experience with acrylics, gel, and nail art preferred.",
        vietnameseDescription: "Cần thợ nail có kinh nghiệm để tham gia đội ngũ của chúng tôi. Chúng tôi cung cấp môi trường làm việc tuyệt vời, mức lương cạnh tranh và giờ làm việc linh hoạt. Ưu tiên kinh nghiệm với bột, gel và nail art.",
        location: "",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-rose-50 to-rose-50",
      borderClass: "border-rose-100",
    },
    {
      id: 'hair-stylist',
      title: t({
        english: 'Hair Stylist',
        vietnamese: 'Thợ Làm Tóc'
      }),
      description: t({
        english: 'Hire skilled hairstylists for your salon',
        vietnamese: 'Thuê thợ làm tóc có kỹ năng cho salon của bạn'
      }),
      template: {
        title: "Professional Hair Stylist Position",
        description: "We are looking for talented hair stylists to join our growing team. Must have experience with various cutting techniques, color services, and styling. Great opportunity to build clientele in a busy location.",
        location: "",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-amber-50 to-amber-50",
      borderClass: "border-amber-100",
    },
    {
      id: 'lash-artist',
      title: t({
        english: 'Lash Artist',
        vietnamese: 'Nghệ Sĩ Nối Mi'
      }),
      description: t({
        english: 'Connect with certified lash technicians',
        vietnamese: 'Kết nối với kỹ thuật viên nối mi được chứng nhận'
      }),
      template: {
        title: "Lash Artist / Lash Tech Wanted",
        description: "Seeking certified lash artists to provide premium lash extensions. Experience with classic, volume, and hybrid sets required. Must have great attention to detail and excellent client service skills.",
        location: "",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-violet-50 to-violet-50",
      borderClass: "border-violet-100",
    },
    {
      id: 'massage-therapist',
      title: t({
        english: 'Massage Therapist',
        vietnamese: 'Chuyên Viên Massage'
      }),
      description: t({
        english: 'Recruit licensed massage professionals',
        vietnamese: 'Tuyển dụng chuyên gia massage có giấy phép'
      }),
      template: {
        title: "Licensed Massage Therapist Needed",
        description: "Seeking licensed massage therapists to provide relaxation and therapeutic massages. Experience with various modalities preferred. Must be customer-focused and professional.",
        location: "",
        jobType: "part-time",
        experience_level: "experienced",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-blue-50 to-blue-50",
      borderClass: "border-blue-100",
    },
    {
      id: 'barber',
      title: t({
        english: 'Barber',
        vietnamese: 'Thợ Cắt Tóc Nam'
      }),
      description: t({
        english: 'Find skilled barbers for your barbershop',
        vietnamese: 'Tìm thợ cắt tóc có kỹ năng cho tiệm của bạn'
      }),
      template: {
        title: "Experienced Barber Position Available",
        description: "Looking for talented barbers with experience in traditional and modern cuts, fades, beard trims, and hot towel shaves. Great opportunity to work in a busy shop with established clientele.",
        location: "",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-neutral-50 to-neutral-50",
      borderClass: "border-neutral-100",
    },
    {
      id: 'makeup-artist',
      title: t({
        english: 'Makeup Artist',
        vietnamese: 'Chuyên Viên Trang Điểm'
      }),
      description: t({
        english: 'Hire professional makeup artists',
        vietnamese: 'Thuê chuyên gia trang điểm chuyên nghiệp'
      }),
      template: {
        title: "Makeup Artist Wanted",
        description: "Seeking skilled makeup artists with experience in bridal, special event, and editorial makeup. Portfolio required. Must be creative, detail-oriented, and able to work well under pressure.",
        location: "",
        jobType: "contract",
        experience_level: "intermediate",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-pink-50 to-pink-50",
      borderClass: "border-pink-100",
    },
    {
      id: 'brow-artist',
      title: t({
        english: 'Brow Artist',
        vietnamese: 'Chuyên Viên Chăm Sóc Lông Mày'
      }),
      description: t({
        english: 'Find skilled brow specialists',
        vietnamese: 'Tìm chuyên gia lông mày có kỹ năng'
      }),
      template: {
        title: "Brow Artist / Specialist Position",
        description: "Hiring experienced brow specialists skilled in shaping, tinting, lamination, and microblading. Must have an eye for symmetry and facial proportions. Great earning potential.",
        location: "",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-amber-50 to-amber-50",
      borderClass: "border-amber-100",
    },
    {
      id: 'skincare-specialist',
      title: t({
        english: 'Skincare Specialist',
        vietnamese: 'Chuyên Viên Chăm Sóc Da'
      }),
      description: t({
        english: 'Recruit licensed estheticians',
        vietnamese: 'Tuyển dụng chuyên viên thẩm mỹ có giấy phép'
      }),
      template: {
        title: "Licensed Esthetician / Skincare Specialist",
        description: "Seeking licensed estheticians to provide facials, peels, and other skincare treatments. Knowledge of professional product lines and current skincare technologies required.",
        location: "",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-teal-50 to-teal-50",
      borderClass: "border-teal-100",
    },
    {
      id: 'tattoo-artist',
      title: t({
        english: 'Tattoo Artist',
        vietnamese: 'Nghệ Sĩ Xăm'
      }),
      description: t({
        english: 'Connect with professional tattoo artists',
        vietnamese: 'Kết nối với nghệ sĩ xăm chuyên nghiệp'
      }),
      template: {
        title: "Tattoo Artist Position Available",
        description: "Looking for talented tattoo artists to join our studio. Must have a strong portfolio showing range and technical ability. Experience with various styles preferred.",
        location: "",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-gray-50 to-gray-50",
      borderClass: "border-gray-100",
    },
    {
      id: 'custom',
      title: t({
        english: 'Custom Job',
        vietnamese: 'Công Việc Tùy Chỉnh'
      }),
      description: t({
        english: 'Create a custom job listing',
        vietnamese: 'Tạo danh sách công việc tùy chỉnh'
      }),
      template: {
        title: "",
        description: "",
        location: "",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
      },
      bgClass: "bg-gradient-to-br from-purple-50 to-purple-50",
      borderClass: "border-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          {t({
            english: 'Select a Job Template',
            vietnamese: 'Chọn Mẫu Công Việc'
          })}
        </h2>
        <p className="text-gray-600 mb-6">
          {t({
            english: 'Choose a template to quickly create your job posting',
            vietnamese: 'Chọn một mẫu để nhanh chóng tạo bài đăng việc làm của bạn'
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ translateY: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)" }}
            transition={{ duration: 0.15 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTemplateSelect(template.template)}
            className={`cursor-pointer rounded-2xl border overflow-hidden ${template.borderClass}`}
            style={{ 
              background: "#FDFDFD",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.035)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Card className={`p-5 h-full border-0 bg-transparent flex flex-col justify-between`}>
              <div className="space-y-2 text-left">
                <h3 className="font-playfair text-xl font-bold tracking-tight text-gray-900">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {template.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center pt-8 pb-2">
        <p className="text-sm italic text-gray-500">
          Inspired by Sunshine ☀️
        </p>
      </div>
    </div>
  );
};

export default JobTemplateSelector;
