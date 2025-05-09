
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

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
  
  const sessionId = searchParams.get('session_id');
  const paymentLogId = searchParams.get('payment_log_id');
  
  useEffect(() => {
    // If we have payment info in the URL, fetch the details
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        if (paymentLogId) {
          // For free posts that have payment_log_id in the URL
          const { data, error } = await supabase
            .from('payment_logs')
            .select('*')
            .eq('id', paymentLogId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            // Cast to avoid type errors
            const typedData = data as any;
            setPostData({
              post_id: typedData.related_id,
              expires_at: typedData.expires_at,
              post_type: typedData.payment_type,
              pricing_tier: typedData.pricing_tier,
              payment_log_id: typedData.id
            });
          }
        } else if (sessionId) {
          // For Stripe payments that redirect back with session_id
          const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
            body: { sessionId }
          });
          
          if (error) throw error;
          
          if (data) {
            setPostData({
              post_id: data.post_id,
              expires_at: data.expires_at,
              post_type: data.post_type,
              pricing_tier: data.pricing_tier,
              payment_log_id: data.payment_log_id
            });
          }
        } else {
          // No identifiers, probably direct navigation
          console.warn('No session_id or payment_log_id found in URL');
        }
      } catch (err) {
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostDetails();
  }, [paymentLogId, sessionId]);
  
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
              <div className="animate-pulse h-8 w-64 bg-gray-200 rounded"></div>
              <div className="animate-pulse h-4 w-48 bg-gray-200 rounded"></div>
              <div className="animate-pulse h-10 w-32 bg-gray-200 rounded mt-4"></div>
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
