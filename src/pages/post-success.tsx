
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const PostSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [postData, setPostData] = useState<PostSuccessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');
  const paymentLogId = searchParams.get('payment_log_id');
  const isFreePost = searchParams.get('free') === 'true';
  
  // Retrieve stored data from session storage to handle Chrome cross-domain issues
  const storedPostType = sessionStorage.getItem('emvi_checkout_postType');
  
  useEffect(() => {
    // If we have payment info in the URL, fetch the details
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        if (paymentLogId) {
          // For free posts that have payment_log_id in the URL
          console.log("Fetching payment log details for ID:", paymentLogId);
          const { data, error } = await supabase
            .from('payment_logs')
            .select('*')
            .eq('id', paymentLogId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            console.log("Payment log found:", data);
            // Cast to avoid type errors
            const typedData = data as any;
            setPostData({
              post_id: typedData.listing_id,
              expires_at: typedData.expires_at,
              post_type: typedData.plan_type || storedPostType,
              pricing_tier: 'free',
              payment_log_id: typedData.id
            });
            
            // Clear session storage
            sessionStorage.removeItem('emvi_checkout_postType');
            sessionStorage.removeItem('emvi_checkout_pricingTier');
            sessionStorage.removeItem('emvi_checkout_duration');
            sessionStorage.removeItem('emvi_checkout_autoRenew');
          }
        } else if (sessionId) {
          // For Stripe payments that redirect back with session_id
          console.log("Redirecting to payment success page with session ID:", sessionId);
          navigate(`/payment-success?session_id=${sessionId}`, { replace: true });
          return;
        } else if (isFreePost) {
          // For free posts without specific IDs
          console.log("Processing free post success");
          const postType = searchParams.get('post_type') || storedPostType || 'job';
          
          // Calculate expiration date (30 days for free tier)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          
          setPostData({
            post_type: postType,
            pricing_tier: 'free',
            expires_at: expirationDate.toISOString()
          });
          
          // Clear session storage
          sessionStorage.removeItem('emvi_checkout_postType');
          sessionStorage.removeItem('emvi_checkout_pricingTier');
          sessionStorage.removeItem('emvi_checkout_duration');
          sessionStorage.removeItem('emvi_checkout_autoRenew');
        } else {
          // No identifiers, probably direct navigation
          console.warn('No session_id, payment_log_id or free flag found in URL');
          setError("Missing post information. Please check your dashboard to verify your post status.");
        }
      } catch (err: any) {
        console.error('Error fetching post details:', err);
        setError(err.message || "Failed to retrieve post details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostDetails();
  }, [paymentLogId, sessionId, isFreePost, searchParams, navigate, storedPostType]);
  
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
              <h1 className="text-xl font-medium">Loading your post details...</h1>
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
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
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
  
  // Post success view
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t('Congratulations!', 'Chúc mừng!')}
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

export default PostSuccess;
