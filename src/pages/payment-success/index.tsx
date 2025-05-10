
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const PaymentSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract session ID from URL
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        console.log("Retrieved session ID:", sessionId);
        
        if (!sessionId) {
          console.error("No session ID found in URL");
          setError("Payment verification failed: No session ID found");
          setIsLoading(false);
          return;
        }

        // Call verify-checkout-session edge function
        console.log("Calling verify-checkout-session with session ID:", sessionId);
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        console.log("verify-checkout-session response:", data, "error:", error);

        if (error) {
          console.error("Edge function error:", error);
          setError(`Payment verification failed: ${error.message || "Unknown error"}`);
          setIsLoading(false);
          return;
        }

        if (!data?.success) {
          console.error("Payment not successful:", data);
          setError(`Payment verification failed: ${data?.error || "Payment not completed"}`);
          setIsLoading(false);
          return;
        }

        // Payment verified successfully
        console.log("Payment verified successfully:", data);
        setJobId(data.post_id);
        setIsVerified(true);
        toast.success(t(
          "Payment successful! Your job listing is now active.",
          "Thanh toán thành công! Tin tuyển dụng của bạn đã được kích hoạt."
        ));
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setError(`An unexpected error occurred: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      verifyPayment();
    } else {
      // If not logged in, redirect to login
      navigate('/login', { replace: true });
    }
  }, [user, navigate, t]);

  return (
    <Layout>
      <div className="container max-w-lg py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              {isLoading ? t("Processing Payment...", "Đang xử lý thanh toán...") : 
               isVerified ? t("Payment Successful!", "Thanh toán thành công!") :
               t("Payment Verification Failed", "Xác minh thanh toán thất bại")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 size={50} className="animate-spin text-primary" />
                <p>{t("Verifying your payment...", "Đang xác minh thanh toán của bạn...")}</p>
              </div>
            ) : isVerified ? (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle size={50} className="text-green-500" />
                <div>
                  <p className="mb-2 text-lg font-medium">
                    {t("Your job post has been activated!", "Tin tuyển dụng của bạn đã được kích hoạt!")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("Your listing is now live and visible to potential candidates.", 
                      "Tin đăng của bạn hiện đã xuất hiện và có thể nhìn thấy bởi các ứng viên tiềm năng.")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <XCircle size={50} className="text-red-500" />
                <div>
                  <p className="mb-2 text-lg font-medium">{t("Something went wrong", "Đã xảy ra lỗi")}</p>
                  <p className="text-muted-foreground">{error || t("Unable to verify payment", "Không thể xác minh thanh toán")}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {isVerified ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => navigate(`/jobs/${jobId}`)}>
                  {t("View My Job Post", "Xem tin tuyển dụng")}
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  {t("Go to Dashboard", "Đi đến Trang chủ")}
                </Button>
              </div>
            ) : !isLoading && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => navigate('/post-job')}>
                  {t("Try Again", "Thử lại")}
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  {t("Go to Dashboard", "Đi đến Trang chủ")}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
