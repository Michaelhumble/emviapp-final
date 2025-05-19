
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCircle2, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

const PostSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<any>(null);
  
  // Check for query parameters
  const paymentLogId = searchParams.get('payment_log_id');
  const isFree = searchParams.get('free') === 'true';
  const isWaitlisted = searchParams.get('waitlist') === 'true';
  const tier = searchParams.get('tier');
  const isDiamond = tier === 'diamond';

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (paymentLogId) {
        try {
          const { data, error } = await supabase
            .from('payment_logs')
            .select('*, jobs(*)')
            .eq('id', paymentLogId)
            .single();
            
          if (error) throw error;
          setPostDetails(data);
        } catch (error) {
          console.error("Error fetching payment details:", error);
        }
      }
      setIsLoading(false);
    };
    
    fetchPaymentDetails();
  }, [paymentLogId]);
  
  // Determine what message to show based on the payment type
  const getSuccessTitle = () => {
    if (isDiamond || isWaitlisted) {
      return t({
        english: 'Application Received!',
        vietnamese: 'Đơn Đăng Ký Đã Nhận!'
      });
    }
    
    return t({
      english: 'Your Post is Live!',
      vietnamese: 'Bài Đăng Của Bạn Đã Hoạt Động!'
    });
  };
  
  const getSuccessMessage = () => {
    if (isDiamond || isWaitlisted) {
      return t({
        english: 'Your diamond tier application has been received. Our team will review it and contact you shortly.',
        vietnamese: 'Đơn đăng ký gói kim cương của bạn đã được nhận. Đội ngũ của chúng tôi sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.'
      });
    }
    
    if (isFree) {
      return t({
        english: 'Your free post has been published successfully and is now visible to potential candidates.',
        vietnamese: 'Tin miễn phí của bạn đã được đăng thành công và hiện đang hiển thị cho các ứng viên tiềm năng.'
      });
    }
    
    return t({
      english: 'Your job posting has been published successfully and is now visible to potential candidates.',
      vietnamese: 'Tin tuyển dụng của bạn đã được đăng thành công và hiện đang hiển thị cho các ứng viên tiềm năng.'
    });
  };
  
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
            <div className={`rounded-full ${isDiamond ? "bg-blue-100" : "bg-green-100"} p-3`}>
              {isDiamond || isWaitlisted ? (
                <Clock className="h-12 w-12 text-blue-600" />
              ) : (
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {getSuccessTitle()}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {getSuccessMessage()}
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
