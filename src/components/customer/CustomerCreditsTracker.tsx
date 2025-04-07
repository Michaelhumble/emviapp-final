
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Bell, Award, Gift, Users, ChevronRight, Coins } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getCreditsHistory } from '@/utils/credits';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const CustomerCreditsTracker = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  // Get current credits from user profile or default to 0
  const currentCredits = userProfile?.credits || 0;
  
  // For the progress bar (100 credits = reward)
  const progressPercentage = Math.min(Math.floor((currentCredits % 100) / 100 * 100), 100);
  const rewardsAvailable = Math.floor(currentCredits / 100);
  
  // Fetch credit history on mount
  useEffect(() => {
    if (user?.id) {
      const fetchHistory = async () => {
        const historyData = await getCreditsHistory(user.id, 5);
        setHistory(historyData);
      };
      
      fetchHistory();
    }
  }, [user?.id]);
  
  // Function to redeem credits
  const handleRedeemCredits = async (type: string, amount: number) => {
    if (!user?.id) return;
    
    if (currentCredits < amount) {
      toast.error(`You need ${amount} credits to redeem this reward.`);
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.rpc('redeem_credits', {
        p_user_id: user.id,
        p_amount: amount,
        p_redemption_type: type
      });
      
      if (error) throw error;
      
      toast.success(`Successfully redeemed ${amount} credits for ${type}!`);
      
      // Refresh user profile to update credit count
      await refreshUserProfile();
      
      // Refresh history
      const historyData = await getCreditsHistory(user.id, 5);
      setHistory(historyData);
    } catch (error) {
      console.error('Error redeeming credits:', error);
      toast.error('Failed to redeem credits. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Emvi Credit Tracker
          </CardTitle>
          <div className="px-3 py-1 bg-white text-pink-600 rounded-full text-sm font-medium">
            {currentCredits} Credits
          </div>
        </div>
        <CardDescription className="text-pink-100">
          Earn credits through activity and redeem for rewards
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Progress tracker */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span>Progress to next reward</span>
            <span className="font-medium">{currentCredits % 100}/100 credits</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {rewardsAvailable > 0 && (
            <div className="mt-3 p-2 bg-pink-50 border border-pink-100 rounded-md text-sm text-pink-700 flex justify-between items-center">
              <span className="flex items-center">
                <Gift className="h-4 w-4 mr-2" />
                You have {rewardsAvailable} reward{rewardsAvailable > 1 ? 's' : ''} available!
              </span>
              <Button size="sm" variant="outline" className="h-7 text-xs border-pink-200 hover:bg-pink-100">
                Redeem Now
              </Button>
            </div>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Bạn có {currentCredits} điểm Emvi
        </div>
        
        {/* Ways to earn */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Ways to earn credits:</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <div className="text-xs font-medium">Bookmark Artist</div>
                <div className="text-xs text-muted-foreground">+2 credits</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium">Follow Artist</div>
                <div className="text-xs text-muted-foreground">+5 credits</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Award className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-medium">Leave Review</div>
                <div className="text-xs text-muted-foreground">+10 credits</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium">Refer Friend</div>
                <div className="text-xs text-muted-foreground">+20 credits</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent activity */}
        {history.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Recent activity:</h3>
            <div className="space-y-2">
              {history.slice(0, 3).map((item) => (
                <div key={item.id} className="text-xs flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium">{item.action_type.replace('_', ' ')}</span>
                    <span className="text-muted-foreground block">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <span className={item.value > 0 ? "text-green-600" : "text-red-600"}>
                    {item.value > 0 ? "+" : ""}{item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex flex-col space-y-4">
        <h3 className="text-sm font-medium mb-0">Redeem your credits:</h3>
        
        <TooltipProvider>
          {/* Redeem options */}
          <div className="grid grid-cols-1 gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="justify-between w-full"
                  disabled={currentCredits < 100 || loading}
                  onClick={() => handleRedeemCredits('discount', 100)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Gift className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium">$5 Booking Discount</div>
                      <div className="text-xs text-muted-foreground">100 credits</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Trade 100 credits for a $5 discount on your next booking
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="justify-between w-full"
                  disabled={currentCredits < 100 || loading}
                  onClick={() => handleRedeemCredits('giveaway', 100)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award className="h-3 w-3 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium">Service Giveaway Entry</div>
                      <div className="text-xs text-muted-foreground">100 credits</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Enter our monthly giveaway for a chance to win a free service
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        
        <Button 
          variant="link" 
          size="sm" 
          className="text-muted-foreground mx-auto"
        >
          View Credit History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerCreditsTracker;
