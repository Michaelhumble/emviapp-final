
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<{
    post_id: string;
    post_type: string;
    pricing_tier: string;
    expires_at: string;
  } | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      toast.error(t("Invalid payment session", "Phiên thanh toán không hợp lệ"));
      navigate('/');
      return;
    }
    
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });
        
        if (error) {
          throw error;
        }
        
        if (data?.success) {
          setPostData({
            post_id: data.post_id,
            post_type: data.post_type || 'job',
            pricing_tier: data.pricing_tier || 'standard',
            expires_at: data.expires_at
          });
          
          toast.success(
            t("Payment successful!", "Thanh toán thành công!"), {
            description: t(
              "Your post has been published and is now live.",
              "Bài đăng của bạn đã được xuất bản và hiện đã hoạt động."
            )
          });
        } else {
          throw new Error("Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
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

  return (
    <Layout>
      <Container className="py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {loading ? (
            <div className="py-12">
              <div className="h-16 w-16 border-4 border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">{t("Verifying payment...", "Đang xác minh thanh toán...")}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  {t("Payment Successful!", "Thanh Toán Thành Công!")}
                </h1>
                <p className="text-gray-600 max-w-md">
                  {t(
                    "Your payment has been processed and your post is now published.",
                    "Thanh toán của bạn đã được xử lý và bài đăng của bạn đã được xuất bản."
                  )}
                </p>
              </div>
              
              {postData && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
                  <h3 className="font-medium mb-4 text-left">
                    {t("Order Summary", "Tóm Tắt Đơn Hàng")}
                  </h3>
                  <div className="space-y-2 text-left">
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
              
              <div className="space-y-4">
                <Button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto">
                  {t("Go to Dashboard", "Đi đến Bảng Điều Khiển")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-sm text-gray-500 mt-4">
                  {t(
                    "If you have any questions, please contact our support team.",
                    "Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi."
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccess;
