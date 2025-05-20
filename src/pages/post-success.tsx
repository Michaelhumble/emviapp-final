
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { Sparkle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { formatDistance } from 'date-fns';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const sessionId = searchParams.get('session_id');
  const paymentLogId = searchParams.get('payment_log_id');
  const isFree = searchParams.get('free') === 'true';
  const [isLoading, setIsLoading] = useState(!isFree);
  const [postDetails, setPostDetails] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    // If free post (no Stripe session), get details from payment log
    if (isFree && paymentLogId) {
      fetchFreePostDetails(paymentLogId);
    } 
    // If Stripe session, verify payment and get details
    else if (sessionId) {
      verifyCheckoutSession(sessionId);
    }
  }, [sessionId, paymentLogId, isFree]);

  const fetchFreePostDetails = async (logId: string) => {
    try {
      const { data, error } = await supabase
        .from('payment_logs')
        .select(`
          *, 
          jobs:listing_id(*)
        `)
        .eq('id', logId)
        .single();

      if (error) throw error;
      
      setPostDetails({
        id: data.jobs?.id,
        title: data.jobs?.title,
        expires_at: data.expires_at,
        pricing_tier: data.pricing_tier,
        type: data.plan_type
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching post details:', error);
      toast.error(t({
        english: "Error loading post details",
        vietnamese: "Lỗi khi tải thông tin bài đăng"
      }));
      setIsLoading(false);
    }
  };

  const verifyCheckoutSession = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
        body: { sessionId }
      });

      if (error) throw error;
      
      if (data.success) {
        setPostDetails({
          id: data.post_id,
          expires_at: data.expires_at,
          pricing_tier: data.pricing_tier,
          type: data.post_type
        });
        toast.success(t({
          english: "Payment successful!",
          vietnamese: "Thanh toán thành công!"
        }));
      } else {
        toast.error(t({
          english: "Payment verification failed",
          vietnamese: "Xác minh thanh toán thất bại"
        }));
      }
    } catch (error) {
      console.error('Error verifying checkout:', error);
      toast.error(t({
        english: "Payment verification failed",
        vietnamese: "Xác minh thanh toán thất bại"
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedExpiry = (expiryDate: string) => {
    try {
      const date = new Date(expiryDate);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch {
      return 'unknown date';
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'free': return t({
        english: "Free",
        vietnamese: "Miễn phí"
      });
      case 'standard': return t({
        english: "Standard",
        vietnamese: "Tiêu chuẩn"
      });
      case 'premium': return t({
        english: "Premium",
        vietnamese: "Cao cấp"
      });
      case 'gold': return t({
        english: "Gold",
        vietnamese: "Vàng"
      });
      case 'diamond': return t({
        english: "Diamond",
        vietnamese: "Kim cương"
      });
      default: return tier;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return "bg-gray-100 text-gray-800";
      case 'standard': return "bg-blue-100 text-blue-800";
      case 'premium': return "bg-purple-100 text-purple-800";
      case 'gold': return "bg-amber-100 text-amber-800";
      case 'diamond': return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {t({
            english: "Payment Success | EmviApp",
            vietnamese: "Thanh toán thành công | EmviApp"
          })}
        </title>
      </Helmet>
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl">
                {t({
                  english: "Success!",
                  vietnamese: "Thành công!"
                })}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 pb-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
                <p className="text-lg text-gray-600">
                  {t({
                    english: "Verifying your payment...",
                    vietnamese: "Đang xác minh thanh toán của bạn..."
                  })}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                    <Sparkle className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold">
                    {isFree ? (
                      t({
                        english: "Your free post has been published!",
                        vietnamese: "Bài đăng miễn phí của bạn đã được xuất bản!"
                      })
                    ) : (
                      t({
                        english: "Your payment was successful!",
                        vietnamese: "Thanh toán của bạn đã thành công!"
                      })
                    )}
                  </h2>
                  
                  <p className="text-gray-600">
                    {t({
                      english: "Your job post is now live and visible to candidates",
                      vietnamese: "Bài đăng việc làm của bạn đã được hiển thị và ứng viên có thể xem được"
                    })}
                  </p>
                </div>
                
                {postDetails && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-medium">
                      {t({
                        english: "Post Details",
                        vietnamese: "Chi tiết bài đăng"
                      })}
                    </h3>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t({
                          english: "Type",
                          vietnamese: "Loại"
                        })}
                      </span>
                      <span>
                        {postDetails.type === 'job' ? (
                          t({
                            english: "Job Posting",
                            vietnamese: "Đăng tuyển dụng"
                          })
                        ) : (
                          t({
                            english: "Salon Listing",
                            vietnamese: "Đăng tin tiệm"
                          })
                        )}
                      </span>
                    </div>
                    
                    {postDetails.title && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t({
                            english: "Title",
                            vietnamese: "Tiêu đề"
                          })}
                        </span>
                        <span className="font-medium">{postDetails.title}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t({
                          english: "Plan",
                          vietnamese: "Gói"
                        })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getTierColor(postDetails.pricing_tier)}`}>
                        {getTierName(postDetails.pricing_tier)}
                      </span>
                    </div>
                    
                    {postDetails.expires_at && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t({
                            english: "Expires",
                            vietnamese: "Hết hạn"
                          })}
                        </span>
                        <span>{getFormattedExpiry(postDetails.expires_at)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2 pb-6">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/dashboard">
                {t({
                  english: "Go to Dashboard",
                  vietnamese: "Đi đến Bảng điều khiển"
                })}
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to={postDetails?.id ? `/jobs/${postDetails.id}` : '/jobs'}>
                {t({
                  english: "View Post",
                  vietnamese: "Xem bài đăng"
                })}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
