
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, FileText, Plus } from 'lucide-react';
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
  const isFreePost = searchParams.get('free') === 'true';
  
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
              post_id: typedData.listing_id,
              expires_at: typedData.expires_at,
              post_type: typedData.plan_type,
              pricing_tier: 'free',
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
        } else if (isFreePost) {
          // For free posts without specific IDs
          setPostData({
            post_type: searchParams.get('post_type') || 'job',
            pricing_tier: 'free',
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          });
        } else {
          // No identifiers, probably direct navigation
          console.warn('No session_id, payment_log_id or free flag found in URL');
        }
      } catch (err) {
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostDetails();
  }, [paymentLogId, sessionId, isFreePost, searchParams]);
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  
  const navigateToJobs = () => {
    navigate('/jobs');
  };
  
  const navigateToPostJob = () => {
    navigate('/post-job');
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
        <Card className="p-8 border-purple-100 shadow-lg bg-gradient-to-b from-white to-purple-50">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
              {t('🎉 Your Job Post is Live!', '🎉 Tin Đăng Của Bạn Đã Hiển Thị!')}
            </h1>
            
            <p className="text-xl text-center text-gray-700">
              {t('Artists in your area are being notified right now.', 'Các nghệ sĩ trong khu vực của bạn đang được thông báo ngay bây giờ.')}
            </p>
            
            <p className="text-md text-center text-gray-600 max-w-lg">
              {t('Thank you for trusting EmviApp. You\'re helping raise the bar for beauty professionals everywhere.', 
                'Cảm ơn bạn đã tin tưởng EmviApp. Bạn đang góp phần nâng cao tiêu chuẩn cho các chuyên gia làm đẹp ở khắp mọi nơi.')}
            </p>
            
            {postData?.expires_at && (
              <div className="flex items-center justify-center bg-white px-4 py-3 rounded-lg border border-purple-100 shadow-sm">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                <span className="text-gray-700">
                  {t('Your listing expires on', 'Tin đăng của bạn hết hạn vào')}: 
                  <strong className="ml-1">{new Date(postData.expires_at).toLocaleDateString()}</strong>
                </span>
              </div>
            )}
            
            <div className="w-full flex flex-col md:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                className="flex-1 bg-white hover:bg-gray-50 border-gray-200"
                onClick={navigateToJobs}
              >
                <FileText className="mr-2 h-4 w-4" />
                {t('View My Post', 'Xem Bài Đăng Của Tôi')}
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1 bg-white hover:bg-gray-50 border-gray-200"
                onClick={navigateToPostJob}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('Post Another Job', 'Đăng Tin Khác')}
              </Button>
              
              <Button 
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                onClick={navigateToDashboard}
              >
                {t('Back to Dashboard', 'Về Trang Quản Lý')}
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
