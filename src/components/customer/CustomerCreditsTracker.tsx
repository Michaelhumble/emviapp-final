
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bell, Award, Gift, Users, ChevronRight, Coins, ArrowUp, ArrowDown, BadgeCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getCreditsHistory } from '@/utils/credits';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CreditHistoryItem {
  id: string;
  user_id: string;
  action_type: string;
  value: number;
  description?: string;
  created_at: string;
}

const CustomerCreditsTracker = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CreditHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState('wallet');
  
  // Get current credits from user profile or default to 0
  const currentCredits = userProfile?.credits || 0;
  
  // For the progress bar (100 credits = reward)
  const progressPercentage = Math.min(Math.floor((currentCredits % 100) / 100 * 100), 100);
  const rewardsAvailable = Math.floor(currentCredits / 100);
  
  // Credit statistics
  const [creditStats, setCreditStats] = useState({
    earned: 0,
    spent: 0,
    supported: 0
  });
  
  // Fetch credit history and calculate stats on mount
  useEffect(() => {
    if (user?.id) {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const historyData = await getCreditsHistory(user.id, 20);
          setHistory(historyData);
          
          // Calculate stats from history
          let earned = 0;
          let spent = 0;
          let supported = 0;
          
          historyData.forEach((item: CreditHistoryItem) => {
            if (item.value > 0) {
              earned += item.value;
            } else if (item.action_type.includes('redemption_support_artist')) {
              supported += Math.abs(item.value);
            } else if (item.value < 0) {
              spent += Math.abs(item.value);
            }
          });
          
          setCreditStats({ earned, spent, supported });
        } catch (error) {
          console.error('Error fetching credit history:', error);
        } finally {
          setLoading(false);
        }
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
      // Use type assertion to work around TypeScript issue
      const { error } = await supabase.rpc('redeem_credits' as any, {
        p_user_id: user.id,
        p_amount: amount,
        p_redemption_type: type
      });
      
      if (error) throw error;
      
      toast.success(`Successfully redeemed ${amount} credits for ${type}!`);
      
      // Refresh user profile to update credit count
      await refreshUserProfile();
      
      // Refresh history
      const historyData = await getCreditsHistory(user.id, 20);
      setHistory(historyData);
    } catch (error) {
      console.error('Error redeeming credits:', error);
      toast.error('Failed to redeem credits. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format action type for display
  const formatActionType = (actionType: string) => {
    if (!actionType) return 'Unknown';
    
    // Replace underscores with spaces and capitalize each word
    return actionType
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  // Get icon for action type
  const getActionIcon = (actionType: string) => {
    if (actionType.includes('follow')) return <Bell className="h-3 w-3 text-blue-500" />;
    if (actionType.includes('bookmark')) return <Heart className="h-3 w-3 text-pink-500" />;
    if (actionType.includes('review')) return <BadgeCheck className="h-3 w-3 text-green-500" />;
    if (actionType.includes('referral')) return <Users className="h-3 w-3 text-purple-500" />;
    if (actionType.includes('redemption')) return <ArrowUp className="h-3 w-3 text-red-500" />;
    if (actionType.includes('received_support')) return <Gift className="h-3 w-3 text-amber-500" />;
    if (actionType.includes('support_artist')) return <Heart className="h-3 w-3 text-red-500" />;
    return <Coins className="h-3 w-3 text-gray-500" />;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Emvi Wallet
          </CardTitle>
          <div className="px-3 py-1 bg-white text-pink-600 rounded-full text-sm font-medium">
            {currentCredits} Credits
          </div>
        </div>
        <CardDescription className="text-pink-100">
          Earn, spend, and support artists with Emvi credits
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-6">
          <TabsList className="w-full">
            <TabsTrigger value="wallet" className="flex-1">Wallet</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
            <TabsTrigger value="rewards" className="flex-1">Rewards</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="wallet" className="p-6 pt-4">
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs border-pink-200 hover:bg-pink-100"
                  onClick={() => setActiveTab('rewards')}
                >
                  Redeem Now
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            Bạn có {currentCredits} điểm Emvi
          </div>
          
          {/* Credit statistics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <ArrowDown className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-xl font-medium text-green-600">{creditStats.earned}</div>
              <div className="text-xs text-muted-foreground">Earned</div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Heart className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-xl font-medium text-amber-600">{creditStats.supported}</div>
              <div className="text-xs text-muted-foreground">Supported</div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <ArrowUp className="h-4 w-4 text-red-600" />
              </div>
              <div className="text-xl font-medium text-red-600">{creditStats.spent}</div>
              <div className="text-xs text-muted-foreground">Spent</div>
            </div>
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
        </TabsContent>
        
        <TabsContent value="history" className="p-6 pt-4">
          {loading ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">Loading credit history...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getActionIcon(item.action_type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{formatActionType(item.action_type)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()} • {new Date(item.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <span className={item.value > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {item.value > 0 ? "+" : ""}{item.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">No credit history found.</p>
              <p className="text-xs text-muted-foreground mt-1">Start earning credits by interacting with artists!</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rewards" className="p-6 pt-4">
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
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="justify-between w-full bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100"
                    disabled={currentCredits < 50 || loading}
                    onClick={() => setActiveTab('support')}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-pink-200 flex items-center justify-center">
                        <Heart className="h-3 w-3 text-pink-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-medium">Support Artists</div>
                        <div className="text-xs text-muted-foreground">Use your credits to support artists</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Support your favorite artists by sending them credits
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          
          <div className="text-center mt-5">
            <p className="text-xs text-muted-foreground">
              Redeeming credits helps support the Emvi community
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CustomerCreditsTracker;
