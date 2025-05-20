
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

const PostSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const isFreePost = searchParams.get('free') === 'true';
  const paymentLogId = searchParams.get('payment_log_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      setLoading(true);
      try {
        // For free posts, just get payment log details
        if (isFreePost && paymentLogId) {
          const { data: paymentLog, error: paymentLogError } = await supabase
            .from('payment_logs')
            .select('*, jobs(*)')
            .eq('id', paymentLogId)
            .single();
          
          if (paymentLogError) {
            throw paymentLogError;
          }
          
          setPaymentDetails({
            success: true,
            postId: paymentLog.listing_id,
            title: paymentLog.jobs?.title || 'your post',
            expiresAt: paymentLog.expires_at,
            postType: paymentLog.plan_type,
            pricingTier: 'free'
          });
          return;
        }
        
        // For paid posts with a session ID, verify with Stripe
        if (sessionId) {
          const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
            body: { 
              sessionId: sessionId 
            }
          });

          if (error) {
            throw error;
          }
          
          // Format data more cleanly
          setPaymentDetails({
            success: data.success,
            postId: data.post_id,
            title: data.title || 'your post',
            expiresAt: data.expires_at,
            postType: data.post_type,
            pricingTier: data.pricing_tier
          });
        } else if (paymentLogId && !isFreePost) {
          // If we have a payment log ID but no session ID and not a free post,
          // fetch the payment log directly
          const { data: paymentLog, error: paymentLogError } = await supabase
            .from('payment_logs')
            .select('*, jobs(*)')
            .eq('id', paymentLogId)
            .single();
          
          if (paymentLogError) {
            throw paymentLogError;
          }
          
          // Check if payment was successful
          if (paymentLog.payment_status !== 'success') {
            throw new Error('Payment has not been completed');
          }
          
          setPaymentDetails({
            success: true,
            postId: paymentLog.listing_id,
            title: paymentLog.jobs?.title || 'your post',
            expiresAt: paymentLog.expires_at,
            postType: paymentLog.plan_type,
            pricingTier: paymentLog.pricing_tier
          });
        } else {
          throw new Error('Missing session ID or payment log ID');
        }
      } catch (error: any) {
        console.error('Error verifying payment:', error);
        setError(error.message || 'Failed to verify payment');
        toast.error('Error verifying payment', {
          description: error.message || 'Please try again or contact support'
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [isFreePost, paymentLogId, sessionId]);

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handlePostAnother = () => {
    if (paymentDetails?.postType === 'job') {
      navigate('/post-job');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{t({
          english: "Post Successful",
          vietnamese: "Đăng tin thành công"
        })} | EmviApp</title>
      </Helmet>

      <div className="container max-w-3xl mx-auto py-10">
        <Card className="text-center p-8 shadow-lg">
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex flex-col items-center">
                <Clock className="h-16 w-16 text-blue-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold mb-4">{t({
                  english: "Verifying your payment...",
                  vietnamese: "Đang xác minh thanh toán của bạn..."
                })}</h2>
                <p className="text-gray-500">{t({
                  english: "This will only take a moment",
                  vietnamese: "Điều này sẽ chỉ mất một chút thời gian"
                })}</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-red-100 p-3 mb-4">
                  <Clock className="h-10 w-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{t({
                  english: "Payment Verification Error",
                  vietnamese: "Lỗi xác minh thanh toán"
                })}</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <div className="flex space-x-4">
                  <Button onClick={handleViewDashboard} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    {t({
                      english: "View Dashboard",
                      vietnamese: "Xem bảng điều khiển"
                    })}
                  </Button>
                </div>
              </div>
            ) : paymentDetails?.success ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{t({
                  english: `${isFreePost ? 'Free Post' : 'Payment'} Successful!`,
                  vietnamese: `${isFreePost ? 'Đăng tin miễn phí' : 'Thanh toán'} thành công!`
                })}</h2>
                <p className="text-gray-500 mb-6">
                  {t({
                    english: `Your ${paymentDetails.title} has been published. ${
                      isFreePost 
                        ? "It will be visible on EmviApp for 7 days." 
                        : `It's now visible to potential ${paymentDetails.postType === 'job' ? 'employees' : 'customers'}.`
                    }`,
                    vietnamese: `${paymentDetails.title} của bạn đã được đăng. ${
                      isFreePost 
                        ? "Nó sẽ được hiển thị trên EmviApp trong 7 ngày." 
                        : `Nó hiện đã hiển thị cho ${paymentDetails.postType === 'job' ? 'nhân viên tiềm năng' : 'khách hàng tiềm năng'}.`
                    }`
                  })}
                </p>
                <div className="flex space-x-4">
                  <Button onClick={handleViewDashboard} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {t({
                      english: "View Dashboard",
                      vietnamese: "Xem bảng điều khiển"
                    })}
                  </Button>
                  <Button onClick={handlePostAnother} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {t({
                      english: `Post Another ${paymentDetails.postType === 'job' ? 'Job' : 'Listing'}`,
                      vietnamese: `Đăng ${paymentDetails.postType === 'job' ? 'việc làm' : 'tin'} khác`
                    })}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-4">
                  <Clock className="h-10 w-10 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{t({
                  english: "Processing Your Request",
                  vietnamese: "Đang xử lý yêu cầu của bạn"
                })}</h2>
                <p className="text-gray-500 mb-6">
                  {t({
                    english: "We're processing your request. This may take a moment.",
                    vietnamese: "Chúng tôi đang xử lý yêu cầu của bạn. Điều này có thể mất một lúc."
                  })}
                </p>
                <div className="flex space-x-4">
                  <Button onClick={handleViewDashboard} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    {t({
                      english: "View Dashboard",
                      vietnamese: "Xem bảng điều khiển"
                    })}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
