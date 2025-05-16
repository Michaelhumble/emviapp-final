import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/context/subscription";
import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { useAutoRenew } from "@/hooks/payments/useAutoRenew";

const SubscriptionManagement = ({ /* ... existing props ... */ }) => {
  const { t } = useTranslation();
  
  // Example changes for translation function calls
  const currentPlanText = t({
    english: "Current Plan",
    vietnamese: "Gói hiện tại"
  });
  
  const autoRenewText = t({
    english: "Auto-renew",
    vietnamese: "Tự động gia hạn"
  });
  
  const { currentPlan, hasActiveSubscription, cancelSubscription, refreshSubscriptionStatus } = useSubscription();
  const navigate = useNavigate();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { isVietnamese } = useTranslation();
  const { toggleAutoRenew, isUpdating } = useAutoRenew();
  
  // We'll use this state to track any active stripe payment ID from the current plan
  const [stripePaymentId] = useState(() => {
    // In a real app, this would be stored in or derived from the subscription data
    // This is just a placeholder. You should fetch the actual payment ID from your data
    return localStorage.getItem('latest_payment_intent') || '';
  });
  
  // Track auto-renew state
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(
    localStorage.getItem('auto_renew_enabled') === 'true'
  );
  
  if (!currentPlan) return null;
  
  const handleUpgrade = () => {
    navigate("/checkout");
  };
  
  const handleCancelSubscription = async () => {
    await cancelSubscription();
    setCancelDialogOpen(false);
  };
  
  const handleToggleAutoRenew = async () => {
    if (!stripePaymentId) {
      console.error("No stripe payment ID available");
      return;
    }
    
    const newAutoRenewState = await toggleAutoRenew(stripePaymentId, !autoRenewEnabled);
    
    if (newAutoRenewState !== null) {
      setAutoRenewEnabled(newAutoRenewState);
      localStorage.setItem('auto_renew_enabled', newAutoRenewState.toString());
      
      // Refresh subscription status to get latest data
      refreshSubscriptionStatus();
    }
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          {hasActiveSubscription ? (
            <Crown className="h-5 w-5 mr-2 text-primary" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2 text-gray-400" />
          )}
          {t("Subscription Management", "Quản lý Đăng ký")}
        </CardTitle>
        <CardDescription>
          {hasActiveSubscription 
            ? t(`You're currently on the ${currentPlan.name} plan`, `Bạn đang sử dụng gói ${currentPlan.name}`)
            : t("You're currently on the free plan", "Bạn đang sử dụng gói miễn phí")
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasActiveSubscription ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{currentPlan.name} Plan</p>
                <p className="text-sm text-muted-foreground">
                  ${currentPlan.price}/month
                </p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                {t("Active", "Đang hoạt động")}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("Plan benefits:", "Quyền lợi gói:")}</p>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, i) => (
                  <li key={i} className="text-sm flex">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {stripePaymentId && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{t("Auto-Renew", "Tự động gia hạn")}</p>
                    <p className="text-sm text-muted-foreground">
                      {autoRenewEnabled 
                        ? t("Your subscription will automatically renew", "Đăng ký của bạn sẽ tự động gia hạn") 
                        : t("Your subscription will expire at the end of the billing period", "Đăng ký của bạn sẽ hết hạn vào cuối kỳ thanh toán")}
                    </p>
                  </div>
                  <Button 
                    onClick={handleToggleAutoRenew}
                    variant="outline" 
                    size="sm"
                    disabled={isUpdating}
                    className={autoRenewEnabled ? "text-amber-600 border-amber-200" : "text-blue-600 border-blue-200"}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : autoRenewEnabled ? (
                      t("Turn Off", "Tắt")
                    ) : (
                      t("Turn On", "Bật")
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {currentPlan.tier !== "premium" && (
              <Alert className="bg-primary/5 border-primary/20">
                <AlertDescription className="text-sm">
                  {t("Upgrade to Premium for additional features and priority support.", "Nâng cấp lên Premium để có thêm tính năng và hỗ trợ ưu tiên.")}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("Your access is limited with the free plan", "Quyền truy cập của bạn bị hạn chế với gói miễn phí")}
              </AlertDescription>
            </Alert>
            
            <p className="text-sm">
              {t("Subscribe to a paid plan to unlock all features and get the most out of EmviApp.", "Đăng ký gói trả phí để mở khóa tất cả các tính năng và tận dụng tối đa EmviApp.")}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleUpgrade}
          className="w-full" 
          variant={hasActiveSubscription ? "outline" : "default"}
        >
          {hasActiveSubscription 
            ? currentPlan.tier !== "premium" 
              ? t("Upgrade to Premium", "Nâng cấp lên Premium") 
              : t("Change Plan", "Thay đổi gói")
            : t("Subscribe Now", "Đăng ký ngay")
          }
        </Button>
        
        {hasActiveSubscription && (
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setCancelDialogOpen(true)}
          >
            {t("Cancel Subscription", "Hủy đăng ký")}
          </Button>
        )}
      </CardFooter>
      
      {/* Cancellation Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Cancel Subscription?", "Hủy đăng ký?")}</DialogTitle>
            <DialogDescription>
              {t(
                `Are you sure you want to cancel your ${currentPlan?.name} subscription? You'll lose access to premium features.`,
                `Bạn có chắc chắn muốn hủy đăng ký ${currentPlan?.name} không? Bạn sẽ mất quyền truy cập vào các tính năng cao cấp.`
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t(
                  "Your access will continue until the end of the current billing period.",
                  "Quyền truy cập của bạn sẽ tiếp tục cho đến cuối kỳ thanh toán hiện tại."
                )}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              {t("Keep Subscription", "Giữ đăng ký")}
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              {t("Cancel Subscription", "Hủy đăng ký")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SubscriptionManagement;
