
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

const SalonListingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    listingId?: string;
    message?: string;
    error?: string;
  } | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationResult({
          success: false,
          error: 'No payment session found'
        });
        setIsVerifying(false);
        return;
      }

      try {
        console.log('🔍 Verifying payment session:', sessionId);
        
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          console.error('❌ Verification error:', error);
          setVerificationResult({
            success: false,
            error: error.message || 'Payment verification failed'
          });
        } else {
          console.log('✅ Verification successful:', data);
          setVerificationResult({
            success: true,
            listingId: data.listing_id,
            message: data.message || 'Your salon listing has been published successfully!'
          });
          
          toast.success('🎉 Payment successful! Your listing is now live.');
        }
      } catch (error) {
        console.error('❌ Verification failed:', error);
        setVerificationResult({
          success: false,
          error: 'Failed to verify payment. Please contact support.'
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-16 w-16 animate-spin text-purple-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Processing Payment...</h2>
                <p className="text-gray-600 text-center">
                  Please wait while we verify your payment and publish your listing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!verificationResult?.success) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-6 w-6" />
                  Payment Verification Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {verificationResult?.error || 'There was an issue verifying your payment.'}
                </p>
                <div className="space-y-2">
                  <Button onClick={() => navigate('/sell-salon')} className="w-full">
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/contact')} className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 text-center">
                <CheckCircle className="h-8 w-8" />
                🎉 Salon Listing Published Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Congratulations! Your salon listing is now live and visible to thousands of potential buyers.
                </p>
                <p className="text-gray-600">
                  {verificationResult.message}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Your listing is now visible to buyers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    You'll receive notifications for inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Manage your listing from your dashboard
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  View Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate('/opportunities')} className="w-full">
                  Browse Other Listings
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help? <a href="/contact" className="text-purple-600 hover:underline">Contact our support team</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;
