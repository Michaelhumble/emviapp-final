
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Crown, Star, Trophy, Gift, Sparkles, Lock, Users } from 'lucide-react';
import { useAuth } from '@/context/auth';

const CustomerMilestonesCard: React.FC = () => {
  const { userProfile } = useAuth();
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  // Mock current progress (in real app, this would come from user data)
  const currentBookings = 3;
  const currentReferrals = 1;
  const currentCredits = userProfile?.credits || 0;

  const milestones = [
    {
      id: 'beauty-explorer',
      title: 'Beauty Explorer',
      description: 'Complete 5 bookings',
      icon: Star,
      progress: Math.min((currentBookings / 5) * 100, 100),
      current: currentBookings,
      target: 5,
      reward: 'Exclusive "Explorer" badge + 50 bonus credits',
      unlocked: currentBookings >= 5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'community-builder',
      title: 'Community Builder',
      description: 'Refer 3 friends',
      icon: Users,
      progress: Math.min((currentReferrals / 3) * 100, 100),
      current: currentReferrals,
      target: 3,
      reward: 'VIP status + priority booking access',
      unlocked: currentReferrals >= 3,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'credit-collector',
      title: 'Credit Collector',
      description: 'Earn 1000 credits',
      icon: Trophy,
      progress: Math.min((currentCredits / 1000) * 100, 100),
      current: currentCredits,
      target: 1000,
      reward: 'Lifetime premium features unlock',
      unlocked: currentCredits >= 1000,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'emvi-legend',
      title: 'EmviApp Legend',
      description: 'Achieve all milestones',
      icon: Crown,
      progress: 0, // Special calculation needed
      current: 0,
      target: 3,
      reward: '🏆 LIFETIME VIP + Custom Badge + Exclusive Perks',
      unlocked: false,
      color: 'from-gradient-to-r from-yellow-400 via-pink-500 to-purple-600',
      legendary: true
    }
  ];

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          Your Beauty Journey
          <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-700">
            Level Up!
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Unlock exclusive rewards as you explore the world of beauty ✨
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.id}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              milestone.unlocked
                ? 'border-green-300 bg-green-50'
                : milestone.legendary
                ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onHoverStart={() => setHoveredMilestone(milestone.id)}
            onHoverEnd={() => setHoveredMilestone(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${milestone.color}`}>
                {milestone.unlocked ? (
                  <Gift className="h-5 w-5 text-white" />
                ) : (
                  <milestone.icon className="h-5 w-5 text-white" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    {milestone.title}
                    {milestone.legendary && <Crown className="h-4 w-4 text-amber-500" />}
                    {milestone.unlocked && <Sparkles className="h-4 w-4 text-green-500" />}
                  </h4>
                  {milestone.unlocked ? (
                    <Badge className="bg-green-100 text-green-700">Unlocked!</Badge>
                  ) : (
                    <Badge variant="outline">
                      {milestone.current}/{milestone.target}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600">{milestone.description}</p>
                
                {!milestone.unlocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{Math.round(milestone.progress)}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                )}
                
                {(hoveredMilestone === milestone.id || milestone.unlocked) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm"
                  >
                    <div className={`p-3 rounded-lg ${
                      milestone.unlocked ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <span className="font-medium">Reward: </span>
                      <span className={milestone.unlocked ? 'text-green-700' : 'text-gray-700'}>
                        {milestone.reward}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            🔥 You're only <span className="font-bold text-purple-600">
              {5 - currentBookings} bookings
            </span> away from your next milestone!
          </p>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Book Now & Progress! 🚀
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerMilestonesCard;
