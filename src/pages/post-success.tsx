
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import PostSuccessAnimation from '@/components/posting/PostSuccessAnimation';

interface PaymentLogDetails {
  id: string;
  listing_id: string;
  user_id: string;
  payment_date: string;
  expires_at: string;
  created_at: string;
  plan_type: string;
  payment_status: string;
  stripe_payment_id: string;
  auto_renew_enabled: boolean;
  pricing_tier?: string; // Make pricing_tier optional
  jobs?: any;
}

const PostSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentLogId = searchParams.get('payment_log_id');
  const isFreePost = searchParams.get('free') === 'true';
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentLogDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentLogId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('payment_logs')
          .select('*, jobs(*)')
          .eq('id', paymentLogId)
          .single();

        if (error) throw error;

        setPaymentDetails(data as PaymentLogDetails);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentLogId]);

  // Determine pricing tier display name
  const getPricingTierDisplayName = () => {
    if (!paymentDetails) return '';
    
    // If pricing_tier exists directly on the payment log, use that
    const tier = paymentDetails.pricing_tier || 'standard';
    
    switch (tier.toLowerCase()) {
      case 'diamond':
        return t({
          english: 'Diamond',
          vietnamese: 'Kim Cương'
        });
      case 'premium':
        return t({
          english: 'Premium',
          vietnamese: 'Cao Cấp'
        });
      case 'gold':
        return t({
          english: 'Gold',
          vietnamese: 'Vàng'
        });
      case 'standard':
        return t({
          english: 'Standard',
          vietnamese: 'Tiêu Chuẩn'
        });
      case 'free':
        return t({
          english: 'Free',
          vietnamese: 'Miễn Phí'
        });
      default:
        return t({
          english: 'Standard',
          vietnamese: 'Tiêu Chuẩn'
        });
    }
  };

  // Function to handle redirecting to the jobs page
  const handleViewJobs = () => {
    navigate('/jobs');
  };

  // Function to handle redirecting to the dashboard
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <PostSuccessAnimation />
            
            <h1 className="text-3xl font-bold text-center">
              {isFreePost ? t({
                english: 'Your Free Post is Live!',
                vietnamese: 'Tin Đăng Miễn Phí Của Bạn Đã Trực Tuyến!'
              }) : t({
                english: 'Payment Successful!',
                vietnamese: 'Thanh Toán Thành Công!'
              })}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {t({
                english: 'Your job post has been published and is now live for candidates to see.',
                vietnamese: 'Tin tuyển dụng của bạn đã được xuất bản và hiện đã sẵn sàng cho ứng viên xem.'
              })}
            </p>
            
            {paymentDetails && (
              <div className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg my-4">
                <h3 className="font-semibold mb-2">
                  {t({
                    english: 'Post Details',
                    vietnamese: 'Chi Tiết Tin Đăng'
                  })}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">
                      {t({
                        english: 'Plan',
                        vietnamese: 'Gói'
                      })}
                    </dt>
                    <dd className="font-medium">{getPricingTierDisplayName()}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">
                      {t({
                        english: 'Expires',
                        vietnamese: 'Hết Hạn'
                      })}
                    </dt>
                    <dd className="font-medium">
                      {new Date(paymentDetails.expires_at).toLocaleDateString()} 
                      <span className="text-xs ml-1 text-gray-500">
                        ({formatDistanceToNow(new Date(paymentDetails.expires_at), { addSuffix: true })})
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">
                      {t({
                        english: 'Auto-Renew',
                        vietnamese: 'Tự Động Gia Hạn'
                      })}
                    </dt>
                    <dd className="font-medium">
                      {paymentDetails.auto_renew_enabled ? 
                        t({english: 'Enabled', vietnamese: 'Đã Bật'}) : 
                        t({english: 'Disabled', vietnamese: 'Đã Tắt'})}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
            
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleViewJobs}
              >
                {t({
                  english: 'View Job Listings',
                  vietnamese: 'Xem Danh Sách Việc Làm'
                })}
              </Button>
              
              <Button 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleGoToDashboard}
              >
                {t({
                  english: 'Go to Dashboard',
                  vietnamese: 'Đi đến Bảng Điều Khiển'
                })}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
