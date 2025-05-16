
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarClock, CheckCircle, RefreshCw, Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { format, addMonths } from 'date-fns';

interface PaymentSummaryProps {
  basePrice: number;
  duration: number;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  onProceedToPayment: () => void;
  isFreePlan?: boolean;
  isSubmitting?: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  basePrice,
  duration,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
  onProceedToPayment,
  isFreePlan = false,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const expiryDate = addMonths(new Date(), duration);
  
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg">
          {isFreePlan 
            ? t({
                english: "Free Listing Summary",
                vietnamese: "Tóm tắt đăng tin miễn phí"
              })
            : t({
                english: "Payment Summary",
                vietnamese: "Tóm tắt thanh toán"
              })
          }
        </h3>
        
        {isFreePlan ? (
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium">{t({
                  english: "Free listing valid for 30 days",
                  vietnamese: "Đăng tin miễn phí có hiệu lực trong 30 ngày"
                })}</p>
                <p className="text-sm text-gray-600">{t({
                  english: "Expires",
                  vietnamese: "Hết hạn"
                })}: {format(addMonths(new Date(), 1), 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium">{t({
                  english: "Limited visibility",
                  vietnamese: "Hiển thị hạn chế"
                })}</p>
                <p className="text-sm text-gray-600">{t({
                  english: "Standard placement in listings",
                  vietnamese: "Vị trí tiêu chuẩn trong danh sách"
                })}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start">
              <CalendarClock className="h-5 w-5 text-purple-500 mt-0.5 mr-2" /> 
              <div>
                <p className="font-medium">
                  {duration === 1 
                    ? t({
                        english: "1 month listing",
                        vietnamese: "1 tháng đăng tin"
                      })
                    : t({
                        english: `${duration} months listing`,
                        vietnamese: `${duration} tháng đăng tin`
                      })
                  }
                </p>
                <p className="text-sm text-gray-600">
                  {t({
                    english: "Expires on",
                    vietnamese: "Hết hạn vào"
                  })}: {format(expiryDate, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            {autoRenew && (
              <div className="flex items-start">
                <RefreshCw className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">{t({
                    english: "Auto-renewal enabled",
                    vietnamese: "Tự động gia hạn được bật"
                  })}</p>
                  <p className="text-sm text-gray-600">
                    {t({
                      english: "Your subscription will automatically renew on", 
                      vietnamese: "Đăng ký của bạn sẽ tự động gia hạn vào"
                    })}: {format(expiryDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">{t({
                  english: "Original price",
                  vietnamese: "Giá gốc"
                })}:</span>
                <span className="text-gray-600">${originalPrice.toFixed(2)}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t({
                    english: "Discount",
                    vietnamese: "Giảm giá"
                  })} ({discountPercentage}%):</span>
                  <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg">
                <span>{t({
                  english: "Total",
                  vietnamese: "Tổng cộng"
                })}:</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={onProceedToPayment} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>{isFreePlan ? t({
              english: "Submitting...",
              vietnamese: "Đang gửi..."
            }) : t({
              english: "Processing...",
              vietnamese: "Đang xử lý..."
            })}</span>
          ) : (
            <>
              {isFreePlan 
                ? t({
                    english: "Complete Free Listing",
                    vietnamese: "Hoàn tất đăng tin miễn phí"
                  })
                : t({
                    english: "Proceed to Payment",
                    vietnamese: "Tiến hành thanh toán"
                  })
              }
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
