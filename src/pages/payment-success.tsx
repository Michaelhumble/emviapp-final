
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Check, ArrowRight, Home, Share2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const PaymentSuccess: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          console.error('Payment verification error:', error);
          toast.error(t({ english: "Payment verification failed", vietnamese: "Xác minh thanh toán thất bại" }));
          setIsLoading(false);
          return;
        }

        if (data?.success) {
          setPaymentData(data);
          toast.success(t({ english: "Payment successful! Your listing is now live.", vietnamese: "Thanh toán thành công! Tin đăng của bạn đã được đăng." }));
        } else {
          toast.error(t({ english: "Payment verification failed", vietnamese: "Xác minh thanh toán thất bại" }));
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error(t({ english: "Failed to verify payment", vietnamese: "Không thể xác minh thanh toán" }));
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, t]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {t({ english: "Verifying payment...", vietnamese: "Đang xác minh thanh toán..." })}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>
          {t({ english: "Payment Successful | EmviApp", vietnamese: "Thanh toán thành công | EmviApp" })}
        </title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t({ english: "Payment Successful!", vietnamese: "Thanh toán thành công!" })}
            </h1>
            <p className="text-xl text-gray-600">
              {t({ 
                english: "Your salon listing has been published and is now live on EmviApp",
                vietnamese: "Tin đăng tiệm của bạn đã được đăng và hiện đang hoạt động trên EmviApp"
              })}
            </p>
          </div>

          {/* Payment Details */}
          {paymentData && (
            <Card className="mb-8 border-green-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Check className="w-5 h-5" />
                  {t({ english: "Payment Details", vietnamese: "Chi tiết thanh toán" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">
                      {t({ english: "Listing ID", vietnamese: "Mã tin đăng" })}:
                    </span>
                    <span className="ml-2 font-mono text-sm">{paymentData.post_id}</span>
                  </div>
                  <div>
                    <span className="font-medium">
                      {t({ english: "Plan Type", vietnamese: "Loại gói" })}:
                    </span>
                    <Badge variant="outline" className="ml-2">
                      {paymentData.pricing_tier || t({ english: "Standard", vietnamese: "Tiêu chuẩn" })}
                    </Badge>
                  </div>
                  {paymentData.expires_at && (
                    <div className="md:col-span-2">
                      <span className="font-medium">
                        {t({ english: "Listing expires", vietnamese: "Tin đăng hết hạn" })}:
                      </span>
                      <span className="ml-2">
                        {new Date(paymentData.expires_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {t({ english: "What's Next?", vietnamese: "Tiếp theo là gì?" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {t({ english: "Your listing is now visible", vietnamese: "Tin đăng của bạn hiện đã hiển thị" })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t({ 
                        english: "Potential buyers can now view and contact you about your salon",
                        vietnamese: "Người mua tiềm năng hiện có thể xem và liên hệ với bạn về tiệm nail"
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Share2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {t({ english: "Share your listing", vietnamese: "Chia sẻ tin đăng" })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t({ 
                        english: "Share the link with your network to reach more potential buyers",
                        vietnamese: "Chia sẻ liên kết với mạng lưới của bạn để tiếp cận nhiều người mua tiềm năng hơn"
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {t({ english: "Manage your listing", vietnamese: "Quản lý tin đăng" })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t({ 
                        english: "You can edit or update your listing anytime from your dashboard",
                        vietnamese: "Bạn có thể chỉnh sửa hoặc cập nhật tin đăng bất cứ lúc nào từ bảng điều khiển"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/salons-for-sale">
                {t({ english: "View All Salon Listings", vietnamese: "Xem tất cả tin đăng tiệm" })}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">
                {t({ english: "Go to Dashboard", vietnamese: "Đến bảng điều khiển" })}
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                {t({ english: "Return Home", vietnamese: "Về trang chủ" })}
              </Link>
            </Button>
          </div>

          {/* Support Note */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              {t({ 
                english: "Need help? Contact our support team at support@emviapp.com",
                vietnamese: "Cần hỗ trợ? Liên hệ đội ngũ hỗ trợ tại support@emviapp.com"
              })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
