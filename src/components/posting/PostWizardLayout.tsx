
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import LanguageToggle from '@/components/layout/LanguageToggle';

interface PostWizardLayoutProps {
  children: React.ReactNode;
}

const PostWizardLayout: React.FC<PostWizardLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {t({
            english: 'Create Job Posting',
            vietnamese: 'Đăng Tin Tuyển Dụng'
          })}
        </h1>
        <LanguageToggle />
      </div>
      
      <Card className="border shadow-sm">
        <CardContent className="p-6 sm:p-8">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostWizardLayout;
