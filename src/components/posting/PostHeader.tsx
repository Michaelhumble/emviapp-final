
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface PostHeaderProps {
  title: string;
  subtitle: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, subtitle }) => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-3 text-gray-900">
        {t(title)}
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {t(subtitle)}
      </p>
    </div>
  );
};

export default PostHeader;
