
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, ExternalLink, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

const SalonListingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [listingId, setListingId] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setVerificationStatus('failed');
      return;
    }

    verifyPaymentAndPublish(sessionId);
  }, [searchParams]);

  const verifyPaymentAndPublish = async (sessionId: string) => {
    try {
      console.log('Verifying payment and publishing listing...', sessionId);

      // Call our backend function to verify payment and publish listing
      const { data, error } = await supabase.functions.invoke('publish-salon-listing', {
        body: { sessionId }
      });

      if (error) {
        console.error('Error verifying payment:', error);
        throw error;
      }

      if (data?.success && data?.listing_id) {
        setListingId(data.listing_id);
        setVerificationStatus('success');
        toast.success("Listing Published Successfully!", {
          description: "Your salon listing is now live and visible to customers."
        });
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setVerificationStatus('failed');
      toast.error("Publication Failed", {
        description: "There was an issue publishing your listing. Please contact support."
      });
    }
  };

  if (verificationStatus === 'verifying') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-semibold mb-2">Verifying Payment...</h2>
              <p className="text-gray-600">
                Please wait while we confirm your payment and publish your listing.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <Card className="border-red-200">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-red-700">Publication Failed</h2>
              <p className="text-gray-600 mb-6">
                There was an issue verifying your payment or publishing your listing.
                Please contact support or try again.
              </p>
              <div className="space-y-3">
                <Button onClick={() => navigate('/sell-salon')} variant="outline" className="w-full">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Success state
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-green-700">
              Listing Published Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-lg text-gray-700 mb-2">
                🎉 Your salon listing is now live and visible to customers!
              </p>
              <p className="text-sm text-gray-600">
                Tin đăng salon của bạn đã được xuất bản và khách hàng có thể xem được.
              </p>
            </div>

            <div className="bg-white border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>✅ Your listing is now searchable on EmviApp</li>
                <li>✅ Potential buyers can contact you directly</li>
                <li>✅ You'll receive notifications for inquiries</li>
                <li>✅ Track your listing performance in your dashboard</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/salons')} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Your Live Listing
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>

            <div className="text-xs text-gray-500 pt-4 border-t">
              <p>Listing ID: {listingId}</p>
              <p>Need help? Contact our support team.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SalonListingSuccess;
