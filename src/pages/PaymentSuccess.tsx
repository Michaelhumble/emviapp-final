import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Add a delay to allow webhook processing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewJobs = () => {
    navigate('/nails');
  };

  const handlePostAnother = () => {
    navigate('/nails');
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert>
              <AlertDescription>
                Invalid payment session. Please try posting your job again.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button onClick={() => navigate('/post-job')} className="w-full">
                Post a Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
          </div>
          <CardTitle className="text-2xl text-green-600">
            {isLoading ? 'Processing Payment...' : 'Payment Successful!'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isLoading ? (
            <div className="space-y-2">
              <p className="text-gray-600">
                Your payment was successful. We're now creating your job posting...
              </p>
              <p className="text-sm text-gray-500">
                This usually takes a few seconds.
              </p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={handlePostAnother} className="w-full">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Your premium job posting has been created and is now live!
              </p>
              <p className="text-sm text-green-600 font-medium">
                Session ID: {sessionId.slice(-8)}
              </p>
              <div className="space-y-2">
                <Button onClick={handleViewJobs} className="w-full">
                  View All Jobs
                </Button>
                <Button 
                  onClick={handlePostAnother} 
                  variant="outline" 
                  className="w-full"
                >
                  Post Another Job
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}