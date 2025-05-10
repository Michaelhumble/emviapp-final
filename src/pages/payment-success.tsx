
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<{
    post_id: string;
    post_type: string;
    pricing_tier: string;
    expires_at: string;
  } | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const paymentLogId = searchParams.get('payment_log_id');
    const isFreePost = searchParams.get('free') === 'true';
    
    // Handle different payment verification paths
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        if (isFreePost) {
          // For free posts, we just need to get the payment log info
          if (paymentLogId) {
            const { data, error } = await supabase
              .from('payment_logs')
              .select('*')
              .eq('id', paymentLogId)
              .single();
              
            if (error) throw error;
            
            if (data) {
              setPostData({
                post_id: data.listing_id,
                post_type: data.plan_type,
                pricing_tier: 'free',
                expires_at: data.expires_at
              });
              
              toast.success(
                t("Your free post has been published!", "Bài đăng miễn phí của bạn đã được xuất bản!"), {
                description: t(
                  "Your post is now live and visible to everyone.",
                  "Bài đăng của bạn hiện đã xuất bản và hiển thị với tất cả mọi người."
                )
              });
            }
          } else {
            // Generic free post success without specific ID
            setPostData({
              post_id: '',
              post_type: searchParams.get('post_type') || 'job',
              pricing_tier: 'free',
              expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            });
          }
        } else if (sessionId) {
          // For paid posts, verify the payment status with Stripe
          console.log("Verifying Stripe session:", sessionId);
          
          const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
            body: { sessionId }
          });
          
          if (error) {
            throw error;
          }
          
          if (data?.success) {
            setPostData({
              post_id: data.post_id || '',
              post_type: data.post_type || 'job',
              pricing_tier: data.pricing_tier || 'standard',
              expires_at: data.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            });
            
            toast.success(
              t("Payment successful!", "Thanh toán thành công!"), {
              description: t(
                "Your post has been published and is now live.",
                "Bài đăng của bạn đã được xuất bản và hiện đã hoạt động."
              )
            });
          } else {
            throw new Error(data?.error || "Payment verification failed");
          }
        } else {
          // No identifiers, probably direct navigation
          setError("No payment information found. Please try posting again.");
          toast.error(t("Invalid payment information", "Thông tin thanh toán không hợp lệ"));
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setError(error.message || "There was an issue verifying your payment");
        toast.error(
          t("Payment verification failed", "Xác minh thanh toán thất bại"), {
          description: t(
            "There was an issue verifying your payment. Please contact support.",
            "Đã xảy ra sự cố khi xác minh thanh toán của bạn. Vui lòng liên hệ hỗ trợ."
          )
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [searchParams, navigate, t]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };
  
  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return t('Diamond', 'Kim Cương');
      case 'premium':
        return t('Premium', 'Cao Cấp');
      case 'gold':
        return t('Gold', 'Vàng');
      case 'standard':
        return t('Standard', 'Tiêu Chuẩn');
      case 'free':
        return t('Free', 'Miễn Phí');
      default:
        return tier;
    }
  };
  
  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'job':
        return t('Job Post', 'Đăng Việc Làm');
      case 'salon':
        return t('Salon Listing', 'Đăng Tiệm');
      default:
        return t('Post', 'Bài Đăng');
    }
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  
  const navigateToJobs = () => {
    navigate('/jobs');
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-12 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="py-12">
              <div className="h-16 w-16 border-4 border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600 text-center">{t("Verifying payment...", "Đang xác minh thanh toán...")}</p>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="py-12 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-center">
                {t("Payment Verification Error", "Lỗi Xác Minh Thanh Toán")}
              </h1>
              <p className="text-red-600 text-center max-w-md">
                {t(error, error)}
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/post-job')} variant="default">
                  {t("Try Again", "Thử Lại")}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
  
  // Post success view
  return (
    <Layout>
      <Container className="py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t('Congratulations!', 'Chúc mừng!')}
            </h1>
            
            <p className="text-xl text-center text-gray-700">
              {postData?.post_type === 'job'
                ? t('Your job listing has been successfully published!', 'Tin tuyển dụng của bạn đã được đăng thành công!')
                : t('Your salon listing has been successfully published!', 'Thông tin về salon của bạn đã được đăng thành công!')}
            </p>
            
            {postData?.expires_at && (
              <p className="text-gray-600">
                {t('Your listing expires on', 'Tin của bạn hết hạn vào')}: {formatDate(postData.expires_at)}
              </p>
            )}
            
            {postData && (
              <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md">
                <h3 className="font-medium mb-4">
                  {t("Post Details", "Chi Tiết Bài Đăng")}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("Type", "Loại")}:</span>
                    <span className="font-medium">{getPostTypeLabel(postData.post_type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("Tier", "Cấp")}:</span>
                    <span className="font-medium">{getTierLabel(postData.pricing_tier)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("Expires", "Hết hạn")}:</span>
                    <span className="font-medium">{formatDate(postData.expires_at)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="w-full flex flex-col md:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={navigateToJobs}
              >
                {t('View All Listings', 'Xem tất cả tin đăng')}
              </Button>
              
              <Button 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={navigateToDashboard}
              >
                {t('Go to Dashboard', 'Đi đến bảng điều khiển')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccess;
