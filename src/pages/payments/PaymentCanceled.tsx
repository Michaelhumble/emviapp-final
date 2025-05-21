
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/post-job');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <Helmet>
        <title>Payment Canceled | EmviApp</title>
      </Helmet>
      <div className="container max-w-lg mx-auto py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <XCircle className="h-16 w-16 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Payment Canceled</h2>
            <p className="text-gray-600 text-center mb-8">
              Your payment was canceled and your job post has not been created. 
              You can try again or go back to your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleTryAgain}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={handleGoToDashboard}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentCanceled;
