
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const PaymentCanceledPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container max-w-lg py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              {t("Payment Canceled", "Thanh toán bị hủy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <XCircle size={50} className="text-amber-500" />
              <div>
                <p className="mb-2 text-lg font-medium">
                  {t("Your payment was canceled", "Thanh toán của bạn đã bị hủy")}
                </p>
                <p className="text-muted-foreground">
                  {t(
                    "No worries! Your job post has been saved. You can continue the payment process whenever you're ready.",
                    "Đừng lo lắng! Tin tuyển dụng của bạn đã được lưu. Bạn có thể tiếp tục quá trình thanh toán bất cứ khi nào bạn sẵn sàng."
                  )}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/post-job')}>
                {t("Try Again", "Thử lại")}
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                {t("Go to Dashboard", "Đi đến Trang chủ")}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentCanceledPage;
