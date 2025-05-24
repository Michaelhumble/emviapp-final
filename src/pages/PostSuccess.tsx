
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PostSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');
  const isFree = searchParams.get('free') === 'true';

  useEffect(() => {
    if (isFree) {
      setIsVerifying(false);
      setVerificationResult({ success: true, post_type: 'job' });
      return;
    }

    if (!sessionId) {
      setError('No payment session found');
      setIsVerifying(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setVerificationResult(data);
          toast.success('Payment verified successfully!');
        } else {
          setError(data.error || 'Payment verification failed');
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'Failed to verify payment');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, isFree]);

  if (isVerifying) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h1 className="font-playfair text-2xl font-bold mb-4">Verifying Your Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your payment and activate your job post.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="font-playfair text-2xl font-bold mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/post-job')} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Post Successfully Created | EmviApp</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-playfair text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              🎉 Your Job Post is Live!
            </h1>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Congratulations! Your job posting has been successfully created and is now visible to thousands of beauty professionals on EmviApp.
            </p>
          </div>

          {/* Success Details Card */}
          <Card className="mb-8 border-green-200 bg-green-50/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active & Live
                  </span>
                </div>
                {verificationResult?.pricing_tier && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Plan:</span>
                    <span className="capitalize font-medium">
                      {verificationResult.pricing_tier} Plan
                    </span>
                  </div>
                )}
                {verificationResult?.expires_at && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Expires:</span>
                    <span className="font-medium">
                      {new Date(verificationResult.expires_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-playfair text-2xl font-semibold mb-4">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Your job is now visible</h3>
                    <p className="text-gray-600 text-sm">Beauty professionals across the platform can now discover and apply to your position.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Receive applications</h3>
                    <p className="text-gray-600 text-sm">You'll get notifications when professionals apply. Check your dashboard regularly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Connect with candidates</h3>
                    <p className="text-gray-600 text-sm">Use our messaging system to communicate with potential hires directly.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/listings')} 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Your Job Post
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')} 
              variant="outline"
              className="px-8 py-3 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Tips */}
          <Card className="mt-8 bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-3 text-blue-800">💡 Pro Tips for Success</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Respond to applications quickly to show professionalism</li>
                <li>• Keep your job description updated if requirements change</li>
                <li>• Use our messaging system to ask candidates relevant questions</li>
                <li>• Consider promoting your post for even more visibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccess;
