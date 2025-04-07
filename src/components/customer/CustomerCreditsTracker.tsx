
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins } from 'lucide-react';
import { getCreditsHistory } from '@/utils/credits';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CreditHistoryItem, CreditStats } from './credits/types';
import CreditWalletOverview from './credits/CreditWalletOverview';
import CreditEarningMethods from './credits/CreditEarningMethods';
import CreditHistory from './credits/CreditHistory';
import CreditRewards from './credits/CreditRewards';

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
  const [creditStats, setCreditStats] = useState<CreditStats>({
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
          <CreditWalletOverview 
            currentCredits={currentCredits}
            progressPercentage={progressPercentage}
            rewardsAvailable={rewardsAvailable}
            creditStats={creditStats}
            onRedeemClick={() => setActiveTab('rewards')}
          />
          
          <CreditEarningMethods />
        </TabsContent>
        
        <TabsContent value="history" className="p-6 pt-4">
          <CreditHistory history={history} loading={loading} />
        </TabsContent>
        
        <TabsContent value="rewards" className="p-6 pt-4">
          <CreditRewards 
            currentCredits={currentCredits} 
            loading={loading}
            onRedeemCredit={handleRedeemCredits}
            onSupportTabClick={() => setActiveTab('support')}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CustomerCreditsTracker;
