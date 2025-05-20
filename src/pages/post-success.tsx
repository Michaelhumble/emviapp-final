
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState<boolean | null>(null);
  const [postDetails, setPostDetails] = useState<{
    post_id?: string;
    pricing_tier?: string;
    expires_at?: string;
  } | null>(null);
  
  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const paymentLogId = queryParams.get('payment_log_id');
  const isFreePost = queryParams.get('free') === 'true';
  
  useEffect(() => {
    // If this is a free post or we have a payment_log_id but no session_id,
    // we can assume payment is already verified
    if (isFreePost || (paymentLogId && !sessionId)) {
      setPaymentVerified(true);
      return;
    }
    
    // If we have a Stripe session ID, verify the payment
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId, paymentLogId, isFreePost]);
  
  const verifyPayment = async (sessionId: string) => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
        body: { sessionId }
      });
      
      if (error) {
        console.error('Payment verification failed:', error);
        setPaymentVerified(false);
        toast.error(t({
          english: 'Payment verification failed',
          vietnamese: 'Xác minh thanh toán thất bại'
        }));
        return;
      }
      
      console.log('Payment verification successful:', data);
      setPaymentVerified(true);
      setPostDetails({
        post_id: data.post_id,
        pricing_tier: data.pricing_tier,
        expires_at: data.expires_at
      });
      
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentVerified(false);
    } finally {
      setIsVerifying(false);
    }
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
            {isVerifying ? (
              // Loading state
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="text-lg">
                  {t({
                    english: 'Verifying your payment...',
                    vietnamese: 'Đang xác minh thanh toán của bạn...'
                  })}
                </p>
              </div>
            ) : paymentVerified === false ? (
              // Payment verification failed
              <>
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-center">
                  {t({
                    english: 'Payment Verification Failed',
                    vietnamese: 'Xác Minh Thanh Toán Thất Bại'
                  })}
                </h1>
                
                <p className="text-lg text-center text-gray-700 max-w-md">
                  {t({
                    english: 'There was a problem verifying your payment. Please contact support or try posting again.',
                    vietnamese: 'Đã xảy ra sự cố khi xác minh thanh toán của bạn. Vui lòng liên hệ với bộ phận hỗ trợ hoặc thử đăng lại.'
                  })}
                </p>
                
                <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/post-job')}
                  >
                    {t({
                      english: 'Try Again',
                      vietnamese: 'Thử Lại'
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
              </>
            ) : (
              // Success state (default or verified)
              <>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                
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
                
                {/* Display pricing tier info if available */}
                {postDetails?.pricing_tier && (
                  <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md">
                    <p className="font-medium text-center">
                      {t({
                        english: `${postDetails.pricing_tier.charAt(0).toUpperCase() + postDetails.pricing_tier.slice(1)} Tier`,
                        vietnamese: `Gói ${postDetails.pricing_tier.charAt(0).toUpperCase() + postDetails.pricing_tier.slice(1)}`
                      })}
                    </p>
                    
                    {postDetails.expires_at && (
                      <p className="text-sm text-center text-gray-600 mt-1">
                        {t({
                          english: `Active until: ${new Date(postDetails.expires_at).toLocaleDateString()}`,
                          vietnamese: `Hoạt động đến: ${new Date(postDetails.expires_at).toLocaleDateString()}`
                        })}
                      </p>
                    )}
                  </div>
                )}
                
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
              </>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
