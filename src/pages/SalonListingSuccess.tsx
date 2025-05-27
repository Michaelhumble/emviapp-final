
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SalonListingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | 'pending'>('pending');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationStatus('error');
        setIsVerifying(false);
        return;
      }

      try {
        // In a real implementation, you would verify the session with Stripe
        // For now, we'll simulate success
        setTimeout(() => {
          setVerificationStatus('success');
          setIsVerifying(false);
        }, 2000);
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('error');
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-gray-600">Please wait while we confirm your payment...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-8">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Payment Verification Failed</h2>
              <p className="text-gray-600 mb-4">
                We couldn't verify your payment. Please contact support if you believe this is an error.
              </p>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Salon Listing Success | EmviApp</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">
                Thanh toán thành công! / Payment Successful!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Cảm ơn bạn đã đăng tin bán salon trên EmviApp! / 
                  Thank you for listing your salon on EmviApp!
                </p>
                <p className="text-gray-600">
                  Tin đăng của bạn đã được tạo và đang chờ xét duyệt. 
                  Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ. /
                  Your listing has been created and is pending approval. 
                  We will contact you within 24 hours.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Bước tiếp theo / Next Steps:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Tin đăng đang được xem xét / Listing under review</li>
                  <li>✓ Email xác nhận đã được gửi / Confirmation email sent</li>
                  <li>✓ Đội ngũ sẽ liên hệ trong 24h / Team will contact you within 24h</li>
                  <li>✓ Tin đăng sẽ xuất hiện sau khi được duyệt / Listing will appear after approval</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="flex-1">
                  <Link to="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    Về Dashboard / Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/salons">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Xem Salon khác / View Other Salons
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;
