
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import JobTemplates from './JobTemplates';
import { JobFormValues } from './jobFormSchema';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { t } = useTranslation();

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
            english: 'Start with a professional template designed for your industry and customize it to your needs',
            vietnamese: 'Bắt đầu với mẫu chuyên nghiệp được thiết kế cho ngành của bạn và tùy chỉnh theo nhu cầu của bạn'
          })}
        </p>
      </motion.div>

      <JobTemplates onSelectTemplate={onTemplateSelect} />
    </div>
  );
};

export default JobTemplateSelector;
