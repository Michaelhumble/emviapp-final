
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Confetti } from '@/components/ui/confetti';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

const PostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState<string>('');
  const { t } = useTranslation();
  
  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const paymentLogId = searchParams.get('payment_log_id');
  const isFree = searchParams.get('free') === 'true';

  useEffect(() => {
    const loadPaymentData = async () => {
      if (!paymentLogId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('payment_logs')
          .select(`
            *,
            jobs:listing_id(title, pricing_tier)
          `)
          .eq('id', paymentLogId)
          .single();

        if (error) {
          console.error('Error fetching payment:', error);
          setLoading(false);
          return;
        }

        setPaymentData(data);
        
        // Extract job title if available
        if (data.jobs && typeof data.jobs === 'object' && data.jobs.title) {
          setJobTitle(data.jobs.title);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    loadPaymentData();
  }, [paymentLogId]);

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handlePostAnother = () => {
    navigate('/post-job');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-16 px-4">
          <div className="text-center">
            <p>{t({ english: "Loading...", vietnamese: "Đang tải..." })}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Confetti />
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <Card className="shadow-lg border-green-100">
          <CardHeader className="pb-4 text-center bg-gradient-to-r from-green-50 to-teal-50">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">
              {t({
                english: "Success!",
                vietnamese: "Thành công!"
              })}
            </CardTitle>
            <CardDescription className="text-lg text-green-700">
              {isFree ? (
                t({
                  english: "Your free job listing has been posted",
                  vietnamese: "Tin tuyển dụng miễn phí của bạn đã được đăng"
                })
              ) : (
                t({
                  english: "Your payment was processed successfully",
                  vietnamese: "Thanh toán của bạn đã được xử lý thành công"
                })
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4 text-center">
            <div className="mb-6">
              <h3 className="font-medium text-xl mb-2">
                {paymentData?.jobs?.title || jobTitle || t({
                  english: "Your job listing is now live!",
                  vietnamese: "Tin tuyển dụng của bạn đã được đăng tải!"
                })}
              </h3>
              <p className="text-gray-600">
                {isFree ? (
                  t({
                    english: "Your free job listing will be visible for 7 days",
                    vietnamese: "Tin tuyển dụng miễn phí của bạn sẽ hiển thị trong 7 ngày"
                  })
                ) : (
                  <span>
                    {paymentData?.jobs?.pricing_tier === 'diamond' ? (
                      t({
                        english: "Your Diamond plan listing will be visible for 12 months",
                        vietnamese: "Tin đăng gói Diamond của bạn sẽ hiển thị trong 12 tháng"
                      })
                    ) : (
                      t({
                        english: `Your listing will be visible until ${new Date(paymentData?.expires_at).toLocaleDateString()}`,
                        vietnamese: `Tin đăng của bạn sẽ hiển thị đến ${new Date(paymentData?.expires_at).toLocaleDateString()}`
                      })
                    )}
                  </span>
                )}
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md text-left mb-6">
              <h4 className="font-medium text-blue-800 mb-2">
                {t({
                  english: "What happens next?",
                  vietnamese: "Điều gì sẽ xảy ra tiếp theo?"
                })}
              </h4>
              <ul className="text-sm text-blue-700 space-y-2 pl-5 list-disc">
                <li>
                  {t({
                    english: "Your job is now visible to all users on EmviApp",
                    vietnamese: "Tin tuyển dụng của bạn đã hiển thị cho tất cả người dùng trên EmviApp"
                  })}
                </li>
                <li>
                  {t({
                    english: "You'll receive notifications when someone applies",
                    vietnamese: "Bạn sẽ nhận được thông báo khi có người ứng tuyển"
                  })}
                </li>
                <li>
                  {t({
                    english: "You can track your job performance in your dashboard",
                    vietnamese: "Bạn có thể theo dõi hiệu suất tin tuyển dụng trong bảng điều khiển"
                  })}
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-2 pb-6">
            <Button
              onClick={handleViewDashboard}
              className="w-full sm:w-auto"
              variant="outline"
            >
              {t({
                english: "View My Dashboard",
                vietnamese: "Xem Bảng Điều Khiển"
              })}
            </Button>
            <Button
              onClick={handlePostAnother}
              className="w-full sm:w-auto"
            >
              {t({
                english: "Post Another Job",
                vietnamese: "Đăng Tin Khác"
              })}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
