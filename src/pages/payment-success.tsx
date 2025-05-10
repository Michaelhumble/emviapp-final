
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface PostSuccessData {
  id?: string;
  post_id?: string;
  expires_at?: string;
  post_type?: string;
  payment_log_id?: string;
  pricing_tier?: string;
}

const PaymentSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [postData, setPostData] = useState<PostSuccessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState(0);
  const maxRetries = 3;
  
  const sessionId = searchParams.get('session_id');
  
  // Recover data from session storage if available (for cross-browser compatibility)
  const storedPostType = sessionStorage.getItem('emvi_checkout_postType');
  const storedPricingTier = sessionStorage.getItem('emvi_checkout_pricingTier');
  
  useEffect(() => {
    // If we have a session ID, verify the checkout session
    const verifyCheckoutSession = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (sessionId) {
          console.log("Verifying checkout session:", sessionId);
          const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
            body: { sessionId }
          });
          
          if (error) {
            console.error("Verification error:", error);
            throw error;
          }
          
          if (data) {
            console.log("Verification successful:", data);
            setPostData({
              post_id: data.post_id,
              expires_at: data.expires_at,
              post_type: data.post_type || storedPostType || 'job',
              pricing_tier: data.pricing_tier || storedPricingTier || 'standard',
              payment_log_id: data.payment_log_id
            });
            
            // Clear session storage after successful verification
            sessionStorage.removeItem('emvi_checkout_postType');
            sessionStorage.removeItem('emvi_checkout_pricingTier');
            sessionStorage.removeItem('emvi_checkout_duration');
            sessionStorage.removeItem('emvi_checkout_autoRenew');
            
            setLoading(false);
          } else {
            throw new Error("No data returned from verification");
          }
        } else {
          // No session ID - redirect to post success page
          console.log("No session ID found, redirecting to post success");
          navigate('/post-success', { replace: true });
        }
      } catch (err: any) {
        console.error("Error in verification:", err);
        
        // If we haven't exceeded max retries, try again
        if (retries < maxRetries) {
          console.log(`Retrying verification (${retries + 1}/${maxRetries})...`);
          setRetries(prev => prev + 1);
          setTimeout(verifyCheckoutSession, 1500); // Wait 1.5 seconds before retry
        } else {
          setError(err.message || "Failed to verify payment. Please check your dashboard for status.");
          setLoading(false);
        }
      }
    };
    
    verifyCheckoutSession();
  }, [sessionId, navigate, retries, storedPostType, storedPricingTier]);
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  
  const navigateToJobs = () => {
    navigate('/jobs');
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container max-w-4xl py-12">
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h1 className="text-xl font-medium">Verifying your payment...</h1>
              <p className="text-muted-foreground">Please wait while we confirm your payment with Stripe.</p>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container max-w-4xl py-12">
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Payment verification error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <p className="text-center">
                Your payment may still have been processed. Please check your dashboard to confirm your listing status.
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
                <Button onClick={navigateToDashboard}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Payment success view
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t('Payment Successful!', 'Thanh toán thành công!')}
            </h1>
            
            <p className="text-xl text-center text-gray-700">
              {postData?.post_type === 'job'
                ? t('Your job listing has been successfully published!', 'Tin tuyển dụng của bạn đã được đăng thành công!')
                : t('Your salon listing has been successfully published!', 'Thông tin về salon của bạn đã được đăng thành công!')}
            </p>
            
            {postData?.pricing_tier && (
              <p className="text-center font-medium">
                {t('Plan', 'Gói')}: {postData.pricing_tier.charAt(0).toUpperCase() + postData.pricing_tier.slice(1)}
              </p>
            )}
            
            {postData?.expires_at && (
              <p className="text-gray-600">
                {t('Your listing expires on', 'Tin của bạn hết hạn vào')}: {new Date(postData.expires_at).toLocaleDateString()}
              </p>
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
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
