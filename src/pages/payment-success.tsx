
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';

interface VerificationState {
  isVerifying: boolean;
  isVerified: boolean;
  error: string | null;
  data: any;
}

const PaymentSuccess: React.FC = () => {
  const [verification, setVerification] = useState<VerificationState>({
    isVerifying: true,
    isVerified: false,
    error: null,
    data: null,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract session_id from URL
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        console.log('Payment success page - Session ID extracted from URL:', sessionId);
        
        if (!sessionId) {
          console.error('No session_id found in URL');
          setVerification({
            isVerifying: false,
            isVerified: false,
            error: 'No session ID found. Cannot verify payment.',
            data: null,
          });
          return;
        }
        
        // Call the edge function to verify payment
        console.log('Calling verify-checkout-session edge function with session ID:', sessionId);
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });
        
        console.log('Verification response:', data, error);
        
        if (error) {
          console.error('Payment verification failed:', error);
          setVerification({
            isVerifying: false,
            isVerified: false,
            error: error.message || 'Payment verification failed',
            data: null,
          });
          return;
        }
        
        if (!data.success) {
          console.error('Payment verification returned error:', data.error || 'Unknown error');
          setVerification({
            isVerifying: false,
            isVerified: false,
            error: data.error || 'Payment verification failed',
            data: null,
          });
          return;
        }
        
        // Payment verified successfully
        console.log('Payment verified successfully:', data);
        setVerification({
          isVerifying: false,
          isVerified: true,
          error: null,
          data,
        });
      } catch (error) {
        console.error('Error during payment verification:', error);
        setVerification({
          isVerifying: false,
          isVerified: false,
          error: error instanceof Error ? error.message : 'Unknown error during verification',
          data: null,
        });
      }
    };
    
    verifyPayment();
  }, []);
  
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          {verification.isVerifying ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h1 className="text-2xl font-bold text-center">
                {t('Verifying Your Payment', 'Đang xác minh thanh toán của bạn')}
              </h1>
              <p className="text-center text-gray-600">
                {t('Please wait while we verify your payment with Stripe...', 
                  'Vui lòng đợi trong khi chúng tôi xác minh thanh toán của bạn với Stripe...')}
              </p>
            </div>
          ) : verification.error ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="rounded-full bg-red-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-center">
                {t('Payment Verification Failed', 'Xác minh thanh toán thất bại')}
              </h1>
              <p className="text-center text-gray-600">
                {t('We encountered an issue while verifying your payment:', 'Chúng tôi gặp sự cố khi xác minh thanh toán của bạn:')}
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-red-700">
                {verification.error}
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/post-job')}
                >
                  {t('Try Again', 'Thử lại')}
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate('/dashboard')}
                >
                  {t('Go to Dashboard', 'Đi đến bảng điều khiển')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-center">
                {t('Payment Successful!', 'Thanh toán thành công!')}
              </h1>
              <p className="text-lg text-center text-gray-700 max-w-md">
                {t('Your job listing has been published and is now live. It will expire on', 
                  'Tin tuyển dụng của bạn đã được xuất bản và hiện đang hoạt động. Nó sẽ hết hạn vào')} {' '}
                <span className="font-semibold">
                  {verification.data?.expires_at ? new Date(verification.data.expires_at).toLocaleDateString() : 'N/A'}
                </span>.
              </p>
              <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/post-job')}
                >
                  {t('Post Another Job', 'Đăng thêm công việc')}
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate('/dashboard')}
                >
                  {t('Go to Dashboard', 'Đi đến bảng điều khiển')}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
