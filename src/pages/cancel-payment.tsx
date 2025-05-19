
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CancelPayment: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  // Get payment log ID from query parameter
  const paymentLogId = searchParams.get('payment_log_id');
  
  return (
    <Layout>
      <Helmet>
        <title>
          {t({
            english: 'Payment Cancelled | EmviApp',
            vietnamese: 'Thanh Toán Đã Hủy | EmviApp'
          })}
        </title>
      </Helmet>
      
      <div className="container max-w-4xl py-12">
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-center">
              {t({
                english: 'Payment Cancelled',
                vietnamese: 'Thanh Toán Đã Bị Hủy'
              })}
            </h1>
            
            <p className="text-lg text-center text-gray-700 max-w-md">
              {t({
                english: 'Your payment has been cancelled. Your job posting has not been published.',
                vietnamese: 'Thanh toán của bạn đã bị hủy. Tin tuyển dụng của bạn chưa được đăng.'
              })}
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline"
                onClick={() => navigate(-1)}
              >
                {t({
                  english: 'Go Back',
                  vietnamese: 'Quay Lại'
                })}
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
              >
                {t({
                  english: 'Go to Dashboard',
                  vietnamese: 'Đi đến Bảng Điều Khiển'
                })}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CancelPayment;
