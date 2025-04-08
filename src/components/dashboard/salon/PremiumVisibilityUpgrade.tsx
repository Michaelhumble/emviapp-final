
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, Megaphone, Lock, Bell, Users, Timer, Percent, Strikethrough } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";
import { calculateBoostPricing } from "@/utils/pricing/salonBoostPricing";
import { useAuth } from "@/context/auth";

interface PremiumVisibilityUpgradeProps {
  localReach?: number;
  openDialog?: boolean;
  onOpenChange?: (open: boolean) => void;
  salonName?: string;
}

const PremiumVisibilityUpgrade = ({ 
  localReach = 243, 
  openDialog = false, 
  onOpenChange,
  salonName = "Your Salon" 
}: PremiumVisibilityUpgradeProps) => {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(openDialog);
  const [isPaid, setIsPaid] = useState(false);
  const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number}>({
    days: 0,
    hours: 0,
    minutes: 0
  });
  
  // Get pricing based on salon boost pricing logic
  const boostPricing = calculateBoostPricing(userProfile);
  const monthlyPrice = boostPricing.isDiscounted ? 15 : 25; // Adjust monthly price if discount applies
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };
  
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setTimeout(() => {
      handleOpenChange(false);
    }, 3000);
  };

  // Update countdown timer
  useEffect(() => {
    if (!boostPricing.launchOffer || !boostPricing.expiryDate) return;
    
    const updateCountdown = () => {
      const now = new Date();
      const expiry = new Date(boostPricing.expiryDate!);
      const difference = expiry.getTime() - now.getTime();
      
      if (difference <= 0) return;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown({ days, hours, minutes });
    };
    
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 60000); // Every minute
    
    return () => clearInterval(intervalId);
  }, [boostPricing]);
  
  const features = [
    {
      icon: <Megaphone className="h-5 w-5 text-primary" />,
      title: "Premium Visibility",
      description: "Your offers are shown to all customers in your area."
    },
    {
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: "Locked Position",
      description: "Secure a top spot in your area's search results."
    },
    {
      icon: <Bell className="h-5 w-5 text-primary" />,
      title: "Customer Notifications",
      description: "Send special offer alerts directly to nearby customers."
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Audience Targeting",
      description: "Reach customers most likely to visit your salon."
    }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {isPaid ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl text-center mb-2">Visibility Upgraded!</DialogTitle>
            <DialogDescription className="text-center">
              {salonName} is now visible to {localReach * 3}+ customers in your area.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Premium Visibility Upgrade
              </DialogTitle>
              <DialogDescription>
                {salonName} will be visible to {localReach * 3}+ customers in your area.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Monthly Subscription</span>
                  <div className="flex flex-col items-end">
                    {boostPricing.isDiscounted && (
                      <span className="text-sm line-through text-gray-400 flex items-center">
                        <Strikethrough className="h-3 w-3 mr-0.5" />
                        $25/mo
                      </span>
                    )}
                    <span className="text-lg font-bold">${monthlyPrice}/mo</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cancel anytime. Your visibility remains active until the end of your billing cycle.
                </p>
              </div>
              
              {boostPricing.launchOffer && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <div className="flex items-start gap-2">
                    <Timer className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Launch Special: {boostPricing.discountPercentage}% off your first 3 months!
                      </p>
                      {countdown.days > 0 && (
                        <p className="text-xs text-amber-700 mt-1">
                          Offer expires in: {countdown.days}d {countdown.hours}h {countdown.minutes}m
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                  <Megaphone className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Glow Beauty Salon</strong> just turned on visibility. Their offer is now shown to 243 customers nearby.
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col gap-3">
              <StripeCheckout 
                amount={monthlyPrice * 100} // Convert to cents for Stripe
                productName="EmviApp - Premium Visibility"
                isSubscription={true}
                subscriptionInterval="month"
                buttonText={boostPricing.isDiscounted ? `Activate Premium (${boostPricing.discountPercentage}% OFF)` : "Activate Premium Visibility"}
                onSuccess={handlePaymentSuccess}
              />
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4" />
                <span>No long-term commitment, cancel anytime</span>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PremiumVisibilityUpgrade;
