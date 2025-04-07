
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

const CustomerCreditsTracker: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<CreditHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        console.error("Error fetching credit history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreditHistory();
  }, [user?.id]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Emvi Credits</CardTitle>
      </CardHeader>
      <CardContent>
        <CreditWalletOverview stats={creditStats} />
        
        <Tabs defaultValue="earn" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earn">Earn Credits</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earn" className="pt-4">
            <CreditEarningMethods />
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <CreditHistory history={history} loading={loading} />
          </TabsContent>
          
          <TabsContent value="rewards" className="pt-4">
            <CreditRewards />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerCreditsTracker;
