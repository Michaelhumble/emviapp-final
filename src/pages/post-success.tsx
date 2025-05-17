
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, TrendingUp, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import ThankYouModal from '@/components/posting/ThankYouModal';

const PostSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<any>(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  
  // Get session ID or payment log ID from URL
  const sessionId = searchParams.get('session_id');
  const paymentLogId = searchParams.get('payment_log_id');
  const isFree = searchParams.get('free') === 'true';
  
  useEffect(() => {
    // Helper function to verify checkout
    const verifyCheckout = async (sessionId: string) => {
      try {
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Error verifying checkout:', err);
        return null;
      }
    };
    
    // Helper function to get payment log details
    const getPaymentLogDetails = async (logId: string) => {
      try {
        const { data, error } = await supabase
          .from('payment_logs')
          .select('*, jobs(*)')
          .eq('id', logId)
          .single();
          
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Error fetching payment log:', err);
        return null;
      }
    };
    
    const verifyPayment = async () => {
      setIsLoading(true);
      
      try {
        // If it's a free post, we've already processed it
        if (isFree && paymentLogId) {
          const paymentData = await getPaymentLogDetails(paymentLogId);
          if (paymentData) {
            setPostData({
              post_id: paymentData.listing_id,
              post_type: paymentData.plan_type,
              pricing_tier: paymentData.pricing_tier,
              expires_at: paymentData.expires_at,
              job_details: paymentData.jobs
            });
          }
        } 
        // If we have a session ID, verify it with Stripe
        else if (sessionId) {
          const checkoutData = await verifyCheckout(sessionId);
          if (checkoutData?.success) {
            setPostData(checkoutData);
            
            // Show success celebration if not explicitly hidden
            if (!searchParams.get('nomodal')) {
              setShowThankYouModal(true);
            }
          } else {
            // Payment failed or couldn't be verified
            navigate('/post-canceled');
          }
        }
        // If we have a payment log ID but no session ID, get details directly
        else if (paymentLogId) {
          const paymentData = await getPaymentLogDetails(paymentLogId);
          if (paymentData && paymentData.payment_status === 'success') {
            setPostData({
              post_id: paymentData.listing_id,
              post_type: paymentData.plan_type,
              pricing_tier: paymentData.pricing_tier,
              expires_at: paymentData.expires_at
            });
          } else {
            // Payment not found or not successful
            navigate('/post-canceled');
          }
        }
      } catch (error) {
        console.error('Error in payment verification:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyPayment();
  }, [sessionId, paymentLogId, navigate, isFree, searchParams]);

  // Format expiration date if available
  const formattedExpiryDate = postData?.expires_at 
    ? format(new Date(postData.expires_at), 'MMMM d, yyyy') 
    : format(addDays(new Date(), 30), 'MMMM d, yyyy');
  
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t({
                english: 'Your Job Post is Live!',
                vietnamese: 'Tin Đăng Của Bạn Đã Được Đăng!'
              })}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {t({
                english: 'Your job posting has been successfully published. It will be visible to potential candidates right away.',
                vietnamese: 'Tin tuyển dụng của bạn đã được xuất bản thành công. Nó sẽ hiển thị với các ứng viên tiềm năng ngay lập tức.'
              })}
            </p>
            
            <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span>
                {t({
                  english: `Your post will be active until ${formattedExpiryDate}`,
                  vietnamese: `Tin đăng của bạn sẽ hoạt động đến ${formattedExpiryDate}`
                })}
              </span>
            </div>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/jobs')}
              >
                <ArrowLeft className="h-4 w-4" />
                {t({
                  english: 'View All Jobs',
                  vietnamese: 'Xem Tất Cả Công Việc'
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
              
              <Button 
                variant="secondary"
                className="flex items-center justify-center gap-2"
                onClick={() => setShowThankYouModal(true)}
              >
                <TrendingUp className="h-4 w-4" />
                {t({
                  english: 'Boost My Post',
                  vietnamese: 'Đẩy Tin Của Tôi'
                })}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <ThankYouModal 
        open={showThankYouModal}
        onOpenChange={setShowThankYouModal}
        postType="job"
        onBoostClick={() => navigate('/post-job?boost=true')}
      />
    </Layout>
  );
};

export default PostSuccess;
