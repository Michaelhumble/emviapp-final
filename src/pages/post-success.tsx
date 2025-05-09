import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Share2, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<any>(null);
  
  useEffect(() => {
    const checkPostStatus = async () => {
      setIsLoading(true);
      
      try {
        // Check if we have state from free post creation
        if (location.state && location.state.postType) {
          setPostDetails({
            type: location.state.postType,
            details: location.state.postDetails,
            pricing: location.state.pricingDetails,
            data: location.state.postData
          });
          setIsLoading(false);
          return;
        }
        
        // Otherwise, check URL parameters for Stripe redirect
        const params = new URLSearchParams(location.search);
        const referenceId = params.get('reference');
        const status = params.get('status');
        
        if (referenceId && status === 'success') {
          // Fetch checkout session details from our database
          const { data: checkoutData, error: checkoutError } = await supabase
            .from('checkout_sessions')
            .select('*')
            .eq('reference_id', referenceId)
            .single();
          
          if (checkoutError || !checkoutData) {
            console.error('Error fetching checkout data:', checkoutError);
            toast.error(t('Could not verify your payment', 'Không thể xác nhận thanh toán của bạn'));
            navigate('/');
            return;
          }
          
          // Fetch the created post details
          const tableName = checkoutData.post_type === 'job' ? 'jobs' : 'salons';
          const { data: postData, error: postError } = await supabase
            .from(tableName)
            .select('*')
            .eq('user_id', userProfile?.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          
          if (postError || !postData) {
            console.error('Error fetching post data:', postError);
            // Don't block the success page if we can't fetch post details
          }
          
          setPostDetails({
            type: checkoutData.post_type,
            checkout: checkoutData,
            post: postData
          });
        } else {
          // If no reference or state, redirect to home
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('Error in post success page:', error);
        toast.error(t('An error occurred', 'Đã xảy ra lỗi'));
      } finally {
        setIsLoading(false);
      }
    };
    
    checkPostStatus();
  }, [location, navigate, userProfile, t]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <p>{t('Verifying your submission...', 'Đang xác nhận đơn của bạn...')}</p>
      </div>
    );
  }
  
  const postType = postDetails?.type === 'job' ? 
    t('job post', 'tin tuyển dụng') : 
    t('salon post', 'tin salon');
  
  const isPaidPost = postDetails?.pricing?.selectedPricingTier !== 'free' && 
                     postDetails?.checkout?.pricing_tier !== 'free';
  
  const autoRenewEnabled = postDetails?.pricing?.autoRenew || 
                           postDetails?.checkout?.auto_renew || 
                           false;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">
          {t('Post Published Successfully!', 'Đăng tin thành công!')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t(
            `Your ${postType} has been published and is now live.`,
            `${postType.charAt(0).toUpperCase() + postType.slice(1)} của bạn đã được xuất bản và hiển thị công khai.`
          )}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t('Post Details', 'Chi tiết tin đăng')}
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">{t('Plan', 'Gói')}</span>
            <span className="font-medium">{postDetails?.pricing?.selectedPricingTier || postDetails?.checkout?.pricing_tier || 'Standard'}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">{t('Duration', 'Thời hạn')}</span>
            <span className="font-medium">
              {postDetails?.pricing?.durationMonths || postDetails?.checkout?.duration_months || 1} {t('months', 'tháng')}
            </span>
          </div>
          
          {isPaidPost && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">{t('Auto-Renew', 'Tự động gia hạn')}</span>
              <span className="font-medium">
                {autoRenewEnabled ? 
                  t('Enabled', 'Bật') : 
                  t('Disabled', 'Tắt')}
              </span>
            </div>
          )}
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">{t('Status', 'Trạng thái')}</span>
            <span className="font-medium text-green-600">{t('Active', 'Hoạt động')}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-4 w-4" />
          {t('Go to Dashboard', 'Đến Bảng Điều Khiển')}
        </Button>
        
        <Button 
          className="flex items-center gap-2"
          onClick={() => {
            // Here you could add share functionality
            toast.info(t('Share functionality coming soon', 'Chức năng chia sẻ sẽ sớm ra mắt'));
          }}
        >
          <Share2 className="h-4 w-4" />
          {t('Share Your Post', 'Chia Sẻ Tin')}
        </Button>
      </div>
    </div>
  );
};

export default PostSuccess;
