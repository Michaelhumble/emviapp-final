
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

const PostSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [postType, setPostType] = useState<string>('job');
  const [title, setTitle] = useState<string>('');
  const [pricingTier, setPricingTier] = useState<string>('');
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentLogId = queryParams.get('payment_log_id');
    const sessionId = queryParams.get('session_id');
    const freeParam = queryParams.get('free');
    
    if (freeParam === 'true') {
      setIsFree(true);
      setLoading(false);
      setSessionSuccess(true);
      
      if (paymentLogId) {
        fetchPaymentDetails(paymentLogId);
      } else {
        toast.error('Missing payment information');
      }
      return;
    }

    if (sessionId) {
      verifyCheckoutSession(sessionId);
    } else if (paymentLogId) {
      fetchPaymentDetails(paymentLogId);
    } else {
      setLoading(false);
      toast.error('Missing payment information');
    }
  }, [location.search]);

  const fetchPaymentDetails = async (paymentLogId: string) => {
    try {
      const { data, error } = await supabase
        .from('payment_logs')
        .select('*, jobs:listing_id(*)')
        .eq('id', paymentLogId)
        .single();

      if (error) throw error;
      
      setPostType(data.plan_type || 'job');
      if (data.jobs) {
        setTitle(data.jobs.title || '');
      }
      setPricingTier(data.pricing_tier || '');
      setSessionSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error('Could not retrieve payment details');
      setLoading(false);
    }
  };

  const verifyCheckoutSession = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
        body: { sessionId }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setPostType(data.post_type || 'job');
        setTitle(data.title || '');
        setPricingTier(data.pricing_tier || '');
        setSessionSuccess(true);
      } else {
        toast.error('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying checkout session:', error);
      toast.error('Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleCreateAnother = () => {
    navigate('/post-job');
  };

  return (
    <Layout>
      <Helmet>
        <title>{t({
          english: 'Post Success',
          vietnamese: 'Đăng thành công'
        })} | EmviApp</title>
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-md">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t({
                english: 'Processing your payment...',
                vietnamese: 'Đang xử lý thanh toán của bạn...'
              })}</h2>
              <p className="text-gray-500 text-center">
                {t({
                  english: 'Please wait while we verify your payment and publish your post.',
                  vietnamese: 'Vui lòng đợi trong khi chúng tôi xác minh thanh toán và xuất bản bài đăng của bạn.'
                })}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {sessionSuccess ? (
                <>
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    {t({
                      english: isFree ? 'Your post has been published!' : 'Payment Successful!',
                      vietnamese: isFree ? 'Bài đăng của bạn đã được xuất bản!' : 'Thanh toán thành công!'
                    })}
                  </h2>
                  
                  <p className="text-lg text-center mb-6">
                    {t({
                      english: `Your ${title ? `"${title}"` : postType} has been successfully ${isFree ? 'published' : 'paid for and published'}.`,
                      vietnamese: `${title ? `"${title}"` : postType} của bạn đã được ${isFree ? 'xuất bản' : 'thanh toán và xuất bản'} thành công.`
                    })}
                  </p>
                  
                  {pricingTier && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 w-full max-w-md">
                      <h3 className="font-medium mb-2">
                        {t({
                          english: 'Post Details',
                          vietnamese: 'Chi tiết bài đăng'
                        })}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {t({
                              english: 'Type',
                              vietnamese: 'Loại'
                            })}:
                          </span>
                          <span className="font-medium">{postType.charAt(0).toUpperCase() + postType.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {t({
                              english: 'Plan',
                              vietnamese: 'Gói'
                            })}:
                          </span>
                          <span className="font-medium">{pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {t({
                              english: 'Status',
                              vietnamese: 'Trạng thái'
                            })}:
                          </span>
                          <span className="text-green-600 font-medium">
                            {t({
                              english: 'Active',
                              vietnamese: 'Đang hoạt động'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <Button 
                      onClick={handleGoToDashboard}
                      className="flex-1"
                    >
                      {t({
                        english: 'Go to Dashboard',
                        vietnamese: 'Đi đến bảng điều khiển'
                      })}
                    </Button>
                    <Button 
                      onClick={handleCreateAnother} 
                      variant="outline"
                      className="flex-1"
                    >
                      {t({
                        english: 'Post Another Job',
                        vietnamese: 'Đăng một công việc khác'
                      })}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">
                      {t({
                        english: 'Payment Processing Error',
                        vietnamese: 'Lỗi xử lý thanh toán'
                      })}
                    </h2>
                    <p className="text-gray-500 mb-6">
                      {t({
                        english: 'We couldn\'t verify your payment. Please try again or contact support if the problem persists.',
                        vietnamese: 'Chúng tôi không thể xác minh thanh toán của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.'
                      })}
                    </p>
                    <Button onClick={() => navigate('/post-job')}>
                      {t({
                        english: 'Try Again',
                        vietnamese: 'Thử lại'
                      })}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
