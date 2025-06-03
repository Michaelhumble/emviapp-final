
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Gift, Calendar } from "lucide-react";

const BeautyJourneyStats: React.FC = () => {
  // Mock data - replace with real data from context/API
  const journeyData = {
    creditsEarned: 145,
    badgesUnlocked: 3,
    currentStreak: 7,
    recentRewards: [
      { id: 1, name: "Profile Complete", credits: 25, icon: "🎯" },
      { id: 2, name: "First Booking", credits: 50, icon: "✨" },
      { id: 3, name: "Friend Invited", credits: 20, icon: "👥" }
    ]
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-600" />
          My Beauty Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
              <Gift className="h-6 w-6 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{journeyData.creditsEarned}</div>
            <div className="text-sm text-gray-600">Credits Earned</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{journeyData.badgesUnlocked}</div>
            <div className="text-sm text-gray-600">Badges Unlocked</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{journeyData.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Recent Rewards</h4>
          <div className="space-y-2">
            {journeyData.recentRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{reward.icon}</span>
                  <span className="text-sm font-medium">{reward.name}</span>
                </div>
                <Badge className="bg-amber-100 text-amber-700">+{reward.credits}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeautyJourneyStats;
