
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const PostCanceled: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-amber-100 p-3">
              <AlertTriangle className="h-12 w-12 text-amber-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t('Payment Cancelled')}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {t('Your payment process was cancelled, but your post has been saved. You can complete the payment anytime from your dashboard.')}
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/post-job')}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('Back to Post Creation')}
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
              >
                {t('Go to Dashboard')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostCanceled;
