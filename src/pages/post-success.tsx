
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Loader2 } from "lucide-react";
import { format, addDays } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import { useAutoRenew } from '@/hooks/payments/useAutoRenew';

const PostSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, isVietnamese } = useTranslation();
  const { toggleAutoRenew, isUpdating } = useAutoRenew();
  
  const [purchaseDetails, setPurchaseDetails] = useState({
    listingType: searchParams.get('tier') || 'standard',
    autoRenew: searchParams.get('autoRenew') === 'true',
    purchaseDate: new Date(),
    expirationDate: addDays(new Date(), 30),
    stripePaymentId: searchParams.get('payment_intent') || null,
  });
  
  // Format dates for display
  const formatDate = (date: Date) => {
    return format(date, 'MMMM dd, yyyy');
  };

  // Navigate to dashboard
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  // Toggle auto-renew
  const handleToggleAutoRenew = async () => {
    if (!purchaseDetails.stripePaymentId) {
      return; // Cannot toggle without payment ID
    }
    
    const newAutoRenewState = await toggleAutoRenew(
      purchaseDetails.stripePaymentId, 
      !purchaseDetails.autoRenew
    );
    
    // Only update state if we got a valid response
    if (newAutoRenewState !== null) {
      setPurchaseDetails(prev => ({
        ...prev,
        autoRenew: newAutoRenewState
      }));
    }
  };

  // Get tier display name
  const getTierDisplayName = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'featured':
        return 'Gold Featured';
      case 'premium':
        return 'Premium';
      case 'free':
        return 'Free';
      case 'diamond':
        return 'Top Diamond';
      default:
        return 'Standard';
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-playfair mb-4">
            {t(
              "Your post has been submitted successfully!",
              "Tin của bạn đã đăng thành công!"
            )}
          </h1>
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="ml-2 text-green-700">
              {isVietnamese ? 
                "Chúc mừng! Tin của bạn đã được đăng thành công và hiện đã hiển thị trực tuyến." : 
                "Congratulations! Your listing has been successfully posted and is now visible online."}
            </AlertDescription>
          </Alert>
        </div>

        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              {t("Purchase Summary", "Thông tin mua hàng")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 py-2 border-b">
              <span className="text-gray-600">{t("Listing Type", "Loại tin đăng")}:</span>
              <span className="font-medium">{getTierDisplayName(purchaseDetails.listingType)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 py-2 border-b">
              <span className="text-gray-600">{t("Purchase Date", "Ngày mua")}:</span>
              <span>{formatDate(purchaseDetails.purchaseDate)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 py-2 border-b">
              <span className="text-gray-600">{t("Expiration Date", "Ngày hết hạn")}:</span>
              <span>{formatDate(purchaseDetails.expirationDate)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 py-2">
              <span className="text-gray-600">{t("Auto-Renew", "Tự động gia hạn")}:</span>
              <span className={`font-medium ${purchaseDetails.autoRenew ? 'text-green-600' : 'text-gray-600'}`}>
                {purchaseDetails.autoRenew ? t("ON", "BẬT") : t("OFF", "TẮT")}
              </span>
            </div>
          </CardContent>
        </Card>

        {purchaseDetails.autoRenew && purchaseDetails.listingType !== 'free' && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-blue-800 font-medium mb-1">
                    {t("Next billing date", "Ngày thanh toán tiếp theo")}: {formatDate(addDays(purchaseDetails.purchaseDate, 30))}
                  </p>
                  <p className="text-sm text-blue-700">
                    {t("Your listing will be automatically renewed to maintain visibility", "Tin đăng của bạn sẽ được tự động gia hạn để duy trì hiển thị")}
                  </p>
                </div>
                <Button 
                  onClick={handleToggleAutoRenew}
                  variant="outline" 
                  disabled={isUpdating || !purchaseDetails.stripePaymentId}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("Processing...", "Đang xử lý...")}
                    </>
                  ) : (
                    t("Turn off Auto-Renew", "Tắt tự động gia hạn")
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!purchaseDetails.autoRenew && purchaseDetails.listingType !== 'free' && purchaseDetails.stripePaymentId && (
          <Card className="mb-6 bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-800 font-medium mb-1">
                    {t("Your listing will expire on", "Tin của bạn sẽ hết hạn vào")}: {formatDate(purchaseDetails.expirationDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("Enable auto-renew to keep your listing visible", "Bật tự động gia hạn để giữ tin của bạn hiển thị")}
                  </p>
                </div>
                <Button 
                  onClick={handleToggleAutoRenew}
                  variant="outline" 
                  disabled={isUpdating}
                  className="border-gray-300 hover:bg-gray-100"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("Processing...", "Đang xử lý...")}
                    </>
                  ) : (
                    t("Enable Auto-Renew", "Bật tự động gia hạn")
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mt-8">
          <Button onClick={handleGoToDashboard} className="px-8">
            {t("Go to My Dashboard", "Đi đến bảng điều khiển")}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccessPage;
