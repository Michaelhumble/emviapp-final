
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t("Post a Job | EmviApp", "Đăng việc | EmviApp")}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold">
            {t("Post a New Job", "Đăng tin tuyển dụng mới")}
          </h1>
          <EmviLogo size="small" />
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form className="space-y-6">
              {/* Form will go here */}
              <p className="text-gray-600">
                {t(
                  "Job posting form is currently being built. Please check back soon!", 
                  "Mẫu đăng tin tuyển dụng đang được xây dựng. Vui lòng quay lại sau!"
                )}
              </p>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  {t("Cancel", "Hủy")}
                </Button>
                <Button
                  disabled
                  onClick={() => navigate('/post-success')}
                >
                  {t("Post Job", "Đăng việc")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default JobPost;
