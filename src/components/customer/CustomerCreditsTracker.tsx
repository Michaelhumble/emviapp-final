
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreditWalletOverview from './credits/CreditWalletOverview';
import CreditEarningMethods from './credits/CreditEarningMethods';
import CreditHistory from './credits/CreditHistory';
import CreditRewards from './credits/CreditRewards';
import { CreditHistoryItem, CreditStats } from './credits/types';
import { getCreditsHistory } from '@/utils/credits';
import { Sparkles } from 'lucide-react';

const CustomerCreditsTracker: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [history, setHistory] = useState<CreditHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('earn');
  const [processingOpportunity, setProcessingOpportunity] = useState(false);
  const [rewardsAvailable, setRewardsAvailable] = useState(0);
  const [creditStats, setCreditStats] = useState<CreditStats>({
    earned: 0,
    spent: 0,
    supported: 0
  });
  
  useEffect(() => {
    const fetchCreditHistory = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const creditHistory = await getCreditsHistory(user.id, 50);
        setHistory(creditHistory as CreditHistoryItem[]);
        
        // Calculate credit statistics
        let earned = 0;
        let spent = 0;
        let supported = 0;
        
        creditHistory.forEach((item: any) => {
          if (item.action_type.includes('redemption_') || item.value < 0) {
            spent += Math.abs(item.value);
            
            // Track artist support specifically
            if (item.action_type.includes('support_artist')) {
              supported += Math.abs(item.value);
            }
          } else {
            earned += item.value;
          }
        });
        
        setCreditStats({
          earned,
          spent,
          supported
        });
        
        // Set available rewards (number of 100 credit increments)
        const currentCredits = userProfile?.credits || 0;
        setRewardsAvailable(Math.floor(currentCredits / 100));
        
        // Simulate processing opportunity for psychological effect (25% chance)
        if (Math.random() < 0.25 && !processingOpportunity) {
          setProcessingOpportunity(true);
          setTimeout(() => setProcessingOpportunity(false), 5000);
        }
        
      } catch (error) {
        console.error("Error fetching credit history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreditHistory();
    // Re-fetch every 60 seconds to create the feeling of a live system
    const interval = setInterval(fetchCreditHistory, 60000);
    
    return () => clearInterval(interval);
  }, [user?.id, userProfile?.credits]);
  
  // Handle redeeming credits
  const handleRedeemClick = () => {
    setActiveTab('rewards');
  };
  
  // Show support tab when clicking on support artist option
  const handleSupportTabClick = () => {
    // This would navigate to artist support page in a full implementation
    console.log("Support artist clicked");
  };
  
  // Get current credits with "almost there" psychology 
  const getCurrentCredits = () => {
    const credits = userProfile?.credits || 0;
    // If user has less than 10 credits, show them as having a tiny amount
    // to encourage earning more
    return credits < 10 && credits > 0 ? credits + 2 : credits;
  };
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    const credits = userProfile?.credits || 0;
    return (credits % 100) + (credits < 15 ? 5 : 0); // Small boost for low-credit users
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Emvi Credits
          <Sparkles className="h-4 w-4 text-amber-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreditWalletOverview 
          currentCredits={getCurrentCredits()}
          progressPercentage={getProgressPercentage()}
          rewardsAvailable={rewardsAvailable}
          stats={creditStats}
          onRedeemClick={handleRedeemClick}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earn">Earn Credits</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earn" className="pt-4">
            <CreditEarningMethods 
              processingOpportunity={processingOpportunity}
            />
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <CreditHistory 
              history={history} 
              loading={loading} 
            />
          </TabsContent>
          
          <TabsContent value="rewards" className="pt-4">
            <CreditRewards 
              currentCredits={getCurrentCredits()}
              loading={loading}
              onSupportTabClick={handleSupportTabClick}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerCreditsTracker;
