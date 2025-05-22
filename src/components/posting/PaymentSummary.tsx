
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '../ui/button';

export interface PriceData {
  basePrice: number;
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  discountedPrice?: number; // Same as finalPrice, but explicit
  discountLabel?: string;   // Label for the discount
  isFoundersDiscount?: boolean; // Special flag for founders discount
}

interface PaymentSummaryProps {
  priceData: PriceData;
  planName: string;
  durationMonths: number;
  autoRenew: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  onProceed: () => void;
  isLoading?: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  priceData,
  planName,
  durationMonths,
  autoRenew,
  isNationwide,
  fastSalePackage,
  showAtTop,
  onProceed,
  isLoading = false
}) => {
  const { t } = useTranslation();
  
  if (!priceData) return null;
  
  const { 
    basePrice, 
    originalPrice, 
    finalPrice, 
    discountAmount, 
    discountPercentage,
    isFoundersDiscount
  } = priceData;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {t({
            english: "Payment Summary",
            vietnamese: "Tóm Tắt Thanh Toán"
          })}
        </CardTitle>
        <CardDescription>
          {t({
            english: "Review your plan details before proceeding",
            vietnamese: "Xem lại chi tiết gói trước khi tiến hành"
          })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-medium">
            {planName} - {durationMonths} {t({
              english: durationMonths === 1 ? "month" : "months",
              vietnamese: "tháng" 
            })}
          </div>
          <div className="font-medium">
            {formatCurrency(basePrice)}/mo
          </div>
        </div>
        
        {isNationwide && (
          <div className="flex justify-between text-sm">
            <span>
              {t({
                english: "Nationwide Visibility",
                vietnamese: "Hiển Thị Toàn Quốc"
              })}
            </span>
            <span>+$5</span>
          </div>
        )}
        
        {fastSalePackage && (
          <div className="flex justify-between text-sm">
            <span>
              {t({
                english: "Fast Sale Package",
                vietnamese: "Gói Bán Nhanh"
              })}
            </span>
            <span>+$15</span>
          </div>
        )}
        
        {showAtTop && (
          <div className="flex justify-between text-sm">
            <span>
              {t({
                english: "Premium Placement",
                vietnamese: "Vị Trí Cao Cấp"
              })}
            </span>
            <span>+$10</span>
          </div>
        )}
        
        {discountPercentage > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>
                {t({
                  english: durationMonths > 1 
                    ? `${durationMonths}-Month Discount` 
                    : "Monthly Plan",
                  vietnamese: durationMonths > 1 
                    ? `Giảm Giá ${durationMonths} Tháng` 
                    : "Gói Hàng Tháng"
                })}
              </span>
            </div>
            <span>
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}
        
        {autoRenew && (
          <div className="flex justify-between text-sm text-green-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>
                {t({
                  english: "Auto-Renew Discount",
                  vietnamese: "Giảm Giá Tự Động Gia Hạn"
                })}
              </span>
            </div>
            <span>-5%</span>
          </div>
        )}
        
        {isFoundersDiscount && (
          <div className="flex justify-between text-sm text-purple-600 font-medium">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>
                {t({
                  english: "Founders Discount",
                  vietnamese: "Giảm Giá Đặc Biệt"
                })}
              </span>
            </div>
            <span>Applied</span>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="font-medium">
              {t({
                english: "Subtotal",
                vietnamese: "Tạm Tính"
              })}
            </div>
            <div className="text-xl font-bold">
              {discountPercentage > 0 && (
                <span className="line-through text-gray-400 text-base mr-2">
                  {formatCurrency(originalPrice)}
                </span>
              )}
              {formatCurrency(finalPrice)}
            </div>
          </div>
          
          {finalPrice === 0 && (
            <div className="text-center mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {t({
                  english: "First Post Free Promotion",
                  vietnamese: "Khuyến Mãi Bài Đăng Đầu Tiên Miễn Phí"
                })}
              </Badge>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            {finalPrice > 0 ? (
              autoRenew ? (
                t({
                  english: `Your subscription will automatically renew every ${durationMonths} ${durationMonths === 1 ? 'month' : 'months'}.`,
                  vietnamese: `Gói của bạn sẽ tự động gia hạn mỗi ${durationMonths} tháng.`
                })
              ) : (
                t({
                  english: `One-time payment valid for ${durationMonths} ${durationMonths === 1 ? 'month' : 'months'}.`,
                  vietnamese: `Thanh toán một lần có hiệu lực trong ${durationMonths} tháng.`
                })
              )
            ) : (
              t({
                english: "Free promotional offer for your first posting.",
                vietnamese: "Ưu đãi khuyến mãi miễn phí cho bài đăng đầu tiên của bạn."
              })
            )}
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onProceed}
          disabled={isLoading}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          {finalPrice > 0 ? (
            t({
              english: "Proceed to Payment",
              vietnamese: "Tiến Hành Thanh Toán"
            })
          ) : (
            t({
              english: "Publish for Free",
              vietnamese: "Đăng Miễn Phí"
            })
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummary;
