import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// TODO: PostSuccessAnimation component doesn't exist yet. 
// We need to implement this component or restore it if it was accidentally removed.
// import PostSuccessAnimation from '@/components/posting/PostSuccessAnimation';

interface PaymentLogDetails {
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  payment_intent_id: string;
  stripe_customer_id: string;
  metadata: {
    listing_id?: string;
    listing_type?: string;
    booth_id?: string;
    pricing_tier?: string;
  };
}

const PostSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>
          {t({
            english: 'Post Successful | EmviApp',
            vietnamese: 'Đăng Thành Công | EmviApp'
          })}
        </title>
      </Helmet>
      
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            
            {/* The animation component was used here, keeping the space for it */}
            {/* <PostSuccessAnimation /> */}
            
            <h1 className="text-3xl font-bold text-center">
              {t({
                english: 'Your Post is Live!',
                vietnamese: 'Bài Đăng Của Bạn Đã Hoạt Động!'
              })}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {t({
                english: 'Your job posting has been published successfully and is now visible to potential candidates.',
                vietnamese: 'Tin tuyển dụng của bạn đã được đăng thành công và hiện đang hiển thị cho các ứng viên tiềm năng.'
              })}
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                onClick={() => navigate('/jobs')}
              >
                {t({
                  english: 'View All Jobs',
                  vietnamese: 'Xem Tất Cả Việc Làm'
                })}
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
              >
                {t({
                  english: 'Go to Dashboard',
                  vietnamese: 'Đi đến Bảng Điều Khiển'
                })}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
