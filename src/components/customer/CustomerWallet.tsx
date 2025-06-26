
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// Removed the WalletConfetti import since it was deleted

interface CustomerWalletProps {
  credits: number;
  onRedeemCredits: () => void;
  recentTransactions?: Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
    date: string;
  }>;
}

const CustomerWallet: React.FC<CustomerWalletProps> = ({
  credits,
  onRedeemCredits,
  recentTransactions = []
}) => {
  return (
    <Card className="border-purple-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Coins className="h-5 w-5" />
            Your EmviApp Credits
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Credit Balance */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {credits.toLocaleString()}
          </div>
          <p className="text-gray-600">Available Credits</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onRedeemCredits}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Gift className="h-4 w-4 mr-2" />
            Redeem Credits
          </Button>
          
          <Button variant="outline" className="border-purple-200 text-purple-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            View History
          </Button>
        </div>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {recentTransactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerWallet;
