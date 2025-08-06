import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, Flame, Users, TrendingUp, Star, Trophy, 
  MessageCircle, Heart, Eye, ArrowUp, Gift, Crown, 
  Sparkles, Target, Bell, Calendar, DollarSign, Award 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FOMOEngagementProps {
  onJoinNow: () => void;
  onViewChallenge: () => void;
  onViewLeaderboard: () => void;
}

const FOMOEngagement: React.FC<FOMOEngagementProps> = ({ 
  onJoinNow, 
  onViewChallenge, 
  onViewLeaderboard 
}) => {
  const [liveStats, setLiveStats] = useState({
    activeNow: 847,
    postsToday: 234,
    trendingtopic: "Nail Art Magic",
    contestEnds: "2h 34m",
    newMembers: 156,
    totalEarnings: "$12,450"
  });

  const [recentActivity, setRecentActivity] = useState([
    { user: "Sarah K.", action: "earned $500 in contest", time: "2 min ago", type: "earning" },
    { user: "Mike H.", action: "got 50+ likes", time: "5 min ago", type: "viral" },
    { user: "Emma S.", action: "joined community", time: "8 min ago", type: "new" },
    { user: "Luna Art", action: "hit 1K followers", time: "12 min ago", type: "milestone" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeNow: prev.activeNow + Math.floor(Math.random() * 10 - 5),
        postsToday: prev.postsToday + Math.floor(Math.random() * 3),
      }));

      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const activities = [
          { user: "Jessica M.", action: "earned $300 tip", time: "just now", type: "earning" },
          { user: "Alex T.", action: "got featured", time: "just now", type: "viral" },
          { user: "Nina B.", action: "joined community", time: "just now", type: "new" },
        ];
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        setRecentActivity(prev => [newActivity, ...prev.slice(0, 3)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'earning': return DollarSign;
      case 'viral': return Flame;
      case 'new': return Users;
      case 'milestone': return Crown;
      default: return Star;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'earning': return 'text-green-500';
      case 'viral': return 'text-orange-500';
      case 'new': return 'text-blue-500';
      case 'milestone': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Live Activity Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-1"
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ backgroundSize: '200% 200%' }}
      >
        <div className="bg-black/90 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="flex items-center space-x-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-lg font-bold">{liveStats.activeNow} online now</span>
              </motion.div>
              
              <div className="h-6 w-px bg-white/30" />
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-400" />
                <span className="font-medium">{liveStats.postsToday} posts today</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onJoinNow}
                className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-2"
              >
                Join the Action 🚀
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* FOMO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Trending Topic Card */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-gray-900">Trending Now</span>
              </div>
              <Badge className="bg-orange-500 text-white animate-pulse">
                HOT 🔥
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">#{liveStats.trendingtopic}</h3>
            <p className="text-gray-600 mb-4">2.3K posts, 15K likes in 24hrs</p>
            <Button 
              onClick={() => onViewChallenge()}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Join Trend <ArrowUp className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </motion.div>

        {/* Contest Urgency Card */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-purple-500" />
                <span className="font-bold text-gray-900">Live Contest</span>
              </div>
              <Badge className="bg-red-500 text-white animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                {liveStats.contestEnds}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">$500 Prize</h3>
            <p className="text-gray-600 mb-4">137 entries, ending soon!</p>
            <Button 
              onClick={onViewChallenge}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Enter Contest <Zap className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </motion.div>

        {/* Community Growth Card */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-500" />
                <span className="font-bold text-gray-900">New Members</span>
              </div>
              <Badge className="bg-green-500 text-white">
                +{liveStats.newMembers}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">This Week</h3>
            <p className="text-gray-600 mb-4">Join 10K+ professionals</p>
            <Button 
              onClick={onJoinNow}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Be Part of Growth <Target className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Live Activity Feed */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-purple-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Live Activity</h3>
            <Badge className="bg-purple-100 text-purple-700">Real-time</Badge>
          </div>
          <span className="text-sm text-gray-500">Updates every few seconds</span>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={`${activity.user}-${activity.time}-${index}`}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-gray-100 ${getActivityColor(activity.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600 ml-1">{activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-6 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <Button 
            onClick={onJoinNow}
            variant="outline" 
            className="w-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Don't Miss Out - Join the Community
          </Button>
        </motion.div>
      </Card>

      {/* Success Stories Ticker */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="h-6 w-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Members Are Earning</h3>
          <Badge className="bg-green-500 text-white">
            {liveStats.totalEarnings} this month
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-green-600">$2,340</div>
            <div className="text-sm text-gray-600">Avg monthly earning</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">847</div>
            <div className="text-sm text-gray-600">Bookings this week</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">96%</div>
            <div className="text-sm text-gray-600">Success rate</div>
          </div>
        </div>
        <motion.div className="mt-4 text-center">
          <Button 
            onClick={onJoinNow}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-bold"
          >
            Start Earning Too 💰
          </Button>
        </motion.div>
      </Card>
    </div>
  );
};

export default FOMOEngagement;