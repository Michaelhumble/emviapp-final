
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Home, AlertCircle } from 'lucide-react';

const CheckoutFallback = () => {
  const navigate = useNavigate();
  const { t, isVietnamese } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <Alert variant="destructive" className="max-w-md w-full mb-6">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>
          {t("Invalid Checkout Path", "Đường Dẫn Thanh Toán Không Hợp Lệ")}
        </AlertTitle>
        <AlertDescription>
          {t(
            "You're not supposed to access this page directly. Please return to the payment flow.",
            "Bạn không nên truy cập trực tiếp vào trang này. Vui lòng quay lại quy trình thanh toán."
          )}
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("Go Back", "Quay Lại")}
        </Button>
        
        <Button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          {t("Return to Home", "Về Trang Chủ")}
        </Button>
      </div>
      
      <p className="mt-12 text-sm text-muted-foreground max-w-md text-center">
        {isVietnamese 
          ? "Nếu bạn đang cố gắng thanh toán, vui lòng quay lại màn hình trước đó và thực hiện lại quy trình thanh toán."
          : "If you were trying to make a payment, please go back to the previous screen and follow the payment process again."
        }
      </p>
    </div>
  );
};

export default CheckoutFallback;
