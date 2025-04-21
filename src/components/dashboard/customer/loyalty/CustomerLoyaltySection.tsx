
import React from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Heart, Star, UserPlus, Clock, CheckCircle } from "lucide-react";

const CustomerLoyaltySection: React.FC = () => {
  const { userProfile } = useAuth();
  const credits = userProfile?.credits || 0;
  const progress = (credits % 100) / 100 * 100;
  
  // Mock recent transactions
  const recentTransactions = [
    { id: 1, type: "earned", amount: 5, reason: "Left review for Amy's Nail Salon", date: "2 days ago" },
    { id: 2, type: "earned", amount: 10, reason: "Friend referral: Samantha joined", date: "1 week ago" },
    { id: 3, type: "redeemed", amount: -15, reason: "Discount on Hair Treatment", date: "2 weeks ago" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-6">
          <CardTitle className="text-xl font-serif flex items-center gap-2 text-gray-800">
            <Gift className="h-5 w-5 text-purple-500" />
            Your Loyalty Journey
          </CardTitle>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress to next reward</span>
              <span className="text-sm font-medium">{credits % 100}/100 credits</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2.5 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-pink-400 to-purple-500"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">{credits}</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Total Credits
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Redeem Credits
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-5">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {recentTransactions.map((tx) => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-full bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      {tx.type === "earned" ? (
                        <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </span>
                      ) : (
                        <span className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <Star className="h-3.5 w-3.5 text-purple-600" />
                        </span>
                      )}
                      <div className="text-sm">
                        <span className="font-medium">{tx.reason}</span>
                        <span className="text-gray-500 text-xs block">
                          <Clock className="inline h-3 w-3 mr-1" />{tx.date}
                        </span>
                      </div>
                    </div>
                    <span className={`font-medium ${tx.type === "earned" ? "text-green-600" : "text-purple-600"}`}>
                      {tx.type === "earned" ? "+" : ""}{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Earn More Credits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 rounded-xl flex flex-col items-center gap-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Star className="h-6 w-6 text-amber-500" />
                  <span className="text-gray-700">Leave a review</span>
                  <span className="text-amber-600 font-medium">+5 credits</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 rounded-xl flex flex-col items-center gap-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                >
                  <UserPlus className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Invite a friend</span>
                  <span className="text-blue-600 font-medium">+10 credits</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 rounded-xl flex flex-col items-center gap-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Heart className="h-6 w-6 text-pink-500" />
                  <span className="text-gray-700">Complete profile</span>
                  <span className="text-pink-600 font-medium">+5 credits</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerLoyaltySection;
