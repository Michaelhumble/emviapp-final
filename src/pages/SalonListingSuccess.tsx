
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SalonListingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [listingData, setListingData] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        console.log('Verifying payment for session:', sessionId);
        
        // Call the verify-checkout-session function to confirm payment
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          console.error('Payment verification error:', error);
          setStatus('error');
          return;
        }

        console.log('Payment verification response:', data);

        if (data?.success && data?.listing_id) {
          setStatus('success');
          setListingData(data);
          console.log('✅ Payment verified and listing published:', data.listing_id);
        } else {
          console.error('Payment verification failed:', data);
          setStatus('error');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (status === 'verifying') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Clock className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-spin" />
          <h1 className="text-3xl font-bold mb-4">Processing Payment...</h1>
          <p className="text-gray-600 mb-2">
            Please wait while we verify your payment and publish your listing.
          </p>
          <p className="text-sm text-gray-500">
            This process ensures only paid listings go live. Do not refresh this page.
          </p>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">
            Your payment could not be verified. Your listing has NOT been published.
            Please try again or contact support if you believe this is an error.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/sell-salon')} variant="outline">
              Try Again
            </Button>
            <p className="text-xs text-gray-500">
              Session ID: {sessionId} - Save this for support reference
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
          
          <h1 className="text-4xl font-bold mb-4">
            🎉 Payment Verified & Listing Published!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your salon listing is now live and visible to potential buyers across our platform.
          </p>

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">✅ Your listing is LIVE</h3>
                    <p className="text-sm text-gray-600">
                      Only after payment verification, your listing is now visible to buyers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">📧 Email notifications</h3>
                    <p className="text-sm text-gray-600">
                      You'll receive email notifications when buyers show interest.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">📊 Dashboard access</h3>
                    <p className="text-sm text-gray-600">
                      Manage your listing and view analytics from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/salons')}
              variant="outline"
            >
              View All Salons
            </Button>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>✅ Payment Confirmed:</strong> Session ID {sessionId}
            </p>
            {listingData?.listing_id && (
              <p className="text-sm text-green-800">
                <strong>📝 Listing ID:</strong> {listingData.listing_id}
              </p>
            )}
            <p className="text-xs text-green-600 mt-2">
              🔒 Your listing was published only after backend payment verification
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;
