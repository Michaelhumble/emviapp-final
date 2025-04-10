
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeDollarSign, Rocket, Plus, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

const SalonBoostCreditPanel = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [boosting, setBoosting] = useState(false);
  const [boostStatus, setBoostStatus] = useState<{
    isActive: boolean;
    expiresAt: Date | null;
  }>({
    isActive: false,
    expiresAt: null
  });
  const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchCreditData();
      fetchBoostStatus();
    }
  }, [user]);

  const fetchCreditData = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user?.id)
        .single();
        
      if (error) throw error;
      
      setCredits(data?.credits || 0);
    } catch (err) {
      console.error("Error fetching credit data:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBoostStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user?.id)
        .single();
        
      if (error) throw error;
      
      const boostedUntil = data?.boosted_until ? new Date(data.boosted_until) : null;
      const isActive = boostedUntil ? boostedUntil > new Date() : false;
      
      setBoostStatus({
        isActive,
        expiresAt: boostedUntil
      });
    } catch (err) {
      console.error("Error fetching boost status:", err);
    }
  };
  
  const handleBuyCredits = () => {
    // In a real implementation, this would open a payment modal or redirect to a payment page
    toast.info("Credit purchase functionality coming soon!");
  };
  
  const handleBoost = async () => {
    if (credits < 10) {
      toast.error("Not enough credits! You need at least 10 credits to boost your listing.");
      return;
    }
    
    setBoosting(true);
    
    try {
      // Calculate boost expiration (7 days from now)
      const boostExpiration = new Date();
      boostExpiration.setDate(boostExpiration.getDate() + 7);
      
      // Update the database
      const { error } = await supabase
        .from('users')
        .update({ 
          boosted_until: boostExpiration.toISOString(),
          credits: credits - 10
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      // Update local state
      setCredits(prev => prev - 10);
      setBoostStatus({
        isActive: true,
        expiresAt: boostExpiration
      });
      
      toast.success("Your listing has been boosted for 7 days!");
      setIsBoostDialogOpen(false);
    } catch (err) {
      console.error("Error boosting listing:", err);
      toast.error("Failed to boost your listing. Please try again.");
    } finally {
      setBoosting(false);
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  const getDaysRemaining = () => {
    if (!boostStatus.expiresAt) return 0;
    
    const now = new Date();
    const diff = boostStatus.expiresAt.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  return (
    <Card className="border-purple-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BadgeDollarSign className="h-5 w-5 text-purple-500 mr-2" />
          Boost & Credits
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {loading ? (
          <div className="py-4 text-center text-gray-500">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
            <p>Loading credit data...</p>
          </div>
        ) : (
          <>
            {/* Credit Balance */}
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-purple-800">Credit Balance</h3>
                <p className="text-2xl font-bold text-purple-700">{credits}</p>
              </div>
              <Button 
                variant="outline" 
                className="border-purple-200 hover:bg-purple-100"
                onClick={handleBuyCredits}
              >
                <Plus className="h-4 w-4 mr-2" />
                Buy Credits
              </Button>
            </div>
            
            {/* Boost Status */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <Rocket className="h-4 w-4 mr-1" />
                    Listing Boost
                  </h3>
                  <p className="text-sm text-blue-600">
                    {boostStatus.isActive 
                      ? `Active until ${formatDate(boostStatus.expiresAt)}`
                      : "Inactive"}
                  </p>
                </div>
                
                {boostStatus.isActive ? (
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {getDaysRemaining()} days left
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                    disabled={credits < 10}
                    onClick={() => setIsBoostDialogOpen(true)}
                  >
                    <Rocket className="h-3 w-3 mr-1" />
                    Boost Now
                  </Button>
                )}
              </div>
              
              {boostStatus.isActive && (
                <Progress
                  value={Math.min((getDaysRemaining() / 7) * 100, 100)}
                  className="h-2 bg-blue-100"
                />
              )}
              
              <div className="mt-2 text-xs text-blue-700 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                <span>10 credits for 7 days of premium visibility</span>
              </div>
            </div>
            
            {/* Boost Benefits */}
            <div className="mt-2 space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Boost Benefits:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>3x higher visibility in search results</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>Featured in "Recommended Salons" section</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>Priority placement in salon listings</span>
                </li>
              </ul>
            </div>
          </>
        )}
        
        {/* Boost Confirmation Dialog */}
        <Dialog open={isBoostDialogOpen} onOpenChange={setIsBoostDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Boost Your Salon Listing</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center justify-center mb-6">
                <Rocket className="h-12 w-12 text-blue-500" />
              </div>
              
              <p className="text-center mb-4">
                Boost your salon's visibility for 7 days for just <strong>10 credits</strong>.
              </p>
              
              <div className="bg-blue-50 p-3 rounded-md mb-4">
                <p className="text-sm text-blue-700">
                  Your salon will appear at the top of search results and be featured in the "Recommended Salons" section.
                </p>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="text-gray-700">Your current balance:</span>
                <span className={`font-bold ${credits < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {credits} credits
                </span>
              </div>
              
              {credits < 10 && (
                <div className="mt-4 bg-red-50 p-3 rounded-md text-red-700 text-sm">
                  You don't have enough credits. You need at least 10 credits to boost your listing.
                </div>
              )}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleBoost} 
                disabled={credits < 10 || boosting}
              >
                {boosting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Boost Now (10 credits)
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalonBoostCreditPanel;
