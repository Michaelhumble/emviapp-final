
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';

const ArtistMotivationalQuote = () => {
  const { t, isVietnamese } = useTranslation();
  const { userProfile } = useAuth();
  
  // Quotes in both languages
  const quotes: Translation[] = [
    {
      english: "Behind every beautiful set is a beautiful hustle.",
      vietnamese: "Đằng sau mỗi bộ móng đẹp là một sự cố gắng tuyệt vời."
    },
    {
      english: "Your art speaks when words can't.",
      vietnamese: "Nghệ thuật của bạn lên tiếng khi lời nói không thể."
    },
    {
      english: "Each client is a canvas for your creativity.",
      vietnamese: "Mỗi khách hàng là một tấm canvas cho sự sáng tạo của bạn."
    }
  ];
  
  // Use the first quote as the featured one
  const featuredQuote = quotes[0];
  
  return (
    <motion.div
      className="mb-8 py-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.blockquote
        className="relative z-10 max-w-2xl mx-auto px-8 text-2xl font-serif text-gray-700 italic"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 -z-10 opacity-5 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute top-0 -left-4 text-6xl text-purple-300">"</div>
          <div className="absolute bottom-0 -right-4 text-6xl text-purple-300">"</div>
        </motion.div>
        
        {t(featuredQuote)}
        
        {isVietnamese && (
          <motion.p 
            className="mt-2 text-lg text-gray-500 font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {featuredQuote.english}
          </motion.p>
        )}
      </motion.blockquote>
    </motion.div>
  );
};

export default ArtistMotivationalQuote;
