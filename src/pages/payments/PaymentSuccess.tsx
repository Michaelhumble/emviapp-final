
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyCheckoutSession, isLoading } = usePostPayment();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    const isFree = queryParams.get('free') === 'true';
    
    const verifyPayment = async () => {
      if (isFree) {
        // Free posts don't need verification
        setVerificationStatus('success');
        return;
      }
      
      if (!sessionId) {
        setVerificationStatus('error');
        setErrorMessage('No payment session ID found');
        return;
      }
      
      try {
        const result = await verifyCheckoutSession(sessionId);
        
        if (result.success) {
          setVerificationStatus('success');
          setJobId(result.job_id || null);
          toast.success('Payment confirmed successfully!');
        } else {
          setVerificationStatus('error');
          setErrorMessage(result.error || 'Payment verification failed');
          toast.error(result.error || 'Payment verification failed');
        }
      } catch (error: any) {
        console.error('Error verifying payment:', error);
        setVerificationStatus('error');
        setErrorMessage(error.message || 'An error occurred during verification');
      }
    };
    
    verifyPayment();
  }, [location.search]);

  const handleViewPost = () => {
    if (jobId) {
      navigate(`/jobs/${jobId}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <Helmet>
        <title>Payment Result | EmviApp</title>
      </Helmet>
      <div className="container max-w-lg mx-auto py-12">
        <Card className="p-8">
          {verificationStatus === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verifying your payment</h2>
              <p className="text-gray-500 text-center">
                Please wait while we confirm your payment and activate your job post...
              </p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 text-center mb-8">
                Your job post has been successfully created and is now live on our platform. 
                You can view and manage it from your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleViewPost}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  View Your Job Post
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleDashboard}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verification Error</h2>
              <p className="text-red-600 text-center mb-2">
                We couldn't verify your payment:
              </p>
              <p className="text-gray-600 text-center mb-8">
                {errorMessage || 'An unknown error occurred during payment verification.'}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                If your payment was successful, your job post will still be created. 
                You can check your dashboard for updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleDashboard}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/post-job')}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
