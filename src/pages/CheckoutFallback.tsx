
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import Layout from '@/components/layout/Layout';

const CheckoutFallback: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-orange-800">
              {t({ english: "Payment Processing Issue", vietnamese: "Vấn đề xử lý thanh toán" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-orange-700">
              {t({ 
                english: "We encountered an issue while processing your payment. This could be due to a temporary connection problem or an interrupted checkout session.",
                vietnamese: "Chúng tôi gặp sự cố khi xử lý thanh toán của bạn. Điều này có thể do sự cố kết nối tạm thời hoặc phiên thanh toán bị gián đoạn."
              })}
            </p>
            
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                {t({ english: "What you can do:", vietnamese: "Bạn có thể làm gì:" })}
              </h3>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li>• {t({ english: "Try refreshing this page", vietnamese: "Thử làm mới trang này" })}</li>
                <li>• {t({ english: "Return to the previous page and try again", vietnamese: "Quay lại trang trước và thử lại" })}</li>
                <li>• {t({ english: "Contact support if the issue persists", vietnamese: "Liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục" })}</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t({ english: "Refresh Page", vietnamese: "Làm mới trang" })}
              </Button>
              
              <Button asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {t({ english: "Return Home", vietnamese: "Về trang chủ" })}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutFallback;
