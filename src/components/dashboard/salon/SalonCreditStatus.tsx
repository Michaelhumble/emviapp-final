
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Plus, Award, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const SalonCreditStatus = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [credits, setCredits] = useState(0);
  const [isBoosted, setIsBoosted] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  
  // Fetch latest credits on mount
  useEffect(() => {
    if (userProfile) {
      setCredits(userProfile.credits || 0);
      setIsBoosted(!!userProfile.boosted_until && new Date(userProfile.boosted_until) > new Date());
    }
  }, [userProfile]);
  
  // Check for credit purchase success in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const creditStatus = urlParams.get('credits');
    const packageType = urlParams.get('package');
    
    if (creditStatus === 'success') {
      // Clear the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Show success message
      toast.success("Credits purchased successfully!", {
        description: "Your credits have been added to your account.",
      });
      
      // Refresh user profile to get updated credits
      refreshUserProfile();
    } else if (creditStatus === 'canceled') {
      // Clear the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      toast.info("Credit purchase canceled", {
        description: "You can try again anytime.",
      });
    }
  }, []);
  
  const handlePurchaseClick = () => {
    setIsPurchaseDialogOpen(true);
  };
  
  const buyCredits = async (packageSize: 'small' | 'medium' | 'large') => {
    if (!user) {
      toast.error("Please sign in to purchase credits");
      return;
    }
    
    setIsBuying(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-credit-checkout', {
        body: { 
          creditPackage: packageSize,
          userId: user.id
        }
      });
      
      if (error) throw error;
      
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to start checkout process", {
        description: "Please try again later."
      });
    } finally {
      setIsBuying(false);
      setIsPurchaseDialogOpen(false);
    }
  };
  
  return (
    <>
      <Card className="border-amber-100">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
            Credits & Visibility Boost
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-700 font-medium">Current Balance</p>
              <p className={`text-2xl font-bold flex items-center ${credits === 0 ? 'text-red-500' : ''}`}>
                {credits} Credits
                <Award className="h-4 w-4 text-amber-400 ml-1" />
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Bạn cần tín dụng để đăng công việc mới.
              </p>
            </div>
            <Button 
              className="bg-amber-500 hover:bg-amber-600" 
              size="sm"
              onClick={handlePurchaseClick}
            >
              <Plus className="h-4 w-4 mr-1" />
              Buy Credits
            </Button>
          </div>
          
          <div className={isBoosted ? "bg-blue-50 p-3 rounded-lg" : "bg-gray-50 p-3 rounded-lg"}>
            <div className="flex items-center">
              {isBoosted && (
                <div className="relative mr-3">
                  <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-1 bg-blue-200 rounded-full opacity-30 animate-ping"></div>
                </div>
              )}
              <div>
                {isBoosted ? (
                  <p className="text-blue-700 font-medium">
                    Your profile is boosted! <span className="text-sm font-normal">Expires in 5 days</span>
                  </p>
                ) : (
                  <p className="text-gray-700">
                    Your profile is not boosted. Use credits to increase visibility!
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
              Redeem Credits
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Purchase Credits Dialog */}
      <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-amber-500" />
              Purchase Credits
            </DialogTitle>
            <DialogDescription>
              Credits are used to post jobs and boost your salon's visibility
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-lg p-4 hover:border-amber-300 hover:bg-amber-50/50 transition-colors cursor-pointer" 
                onClick={() => buyCredits('small')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">5 Credits</h3>
                    <p className="text-sm text-gray-500">Basic package</p>
                  </div>
                  <div className="text-lg font-bold text-amber-600">$5</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-amber-300 hover:bg-amber-50/50 transition-colors cursor-pointer"
                onClick={() => buyCredits('medium')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">10 Credits</h3>
                    <p className="text-sm text-gray-500">Standard package</p>
                  </div>
                  <div className="text-lg font-bold text-amber-600">$10</div>
                </div>
              </div>
              
              <div className="border border-amber-300 rounded-lg p-4 bg-amber-50/30 relative hover:bg-amber-50 transition-colors cursor-pointer"
                onClick={() => buyCredits('large')}>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Best Value
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">20 Credits</h3>
                    <p className="text-sm text-gray-500">Premium package (10% discount)</p>
                  </div>
                  <div className="text-lg font-bold text-amber-600">$18</div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsPurchaseDialogOpen(false)}
              disabled={isBuying}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalonCreditStatus;
