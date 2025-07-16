import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Trophy, Star, UserPlus, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface TopInviter {
  id: string;
  full_name: string;
  avatar_url: string;
  referral_count: number;
  credits_earned: number;
  rank: number;
  badge: string;
}

const TopInvitersLeaderboard: React.FC = () => {
  const { user } = useAuth();
  const [topInviters, setTopInviters] = useState<TopInviter[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopInviters();
  }, []);

  const fetchTopInviters = async () => {
    try {
      // Get top inviters (mock data for now, replace with real query)
      const mockData: TopInviter[] = [
        {
          id: '1',
          full_name: 'Sarah Beauty Queen',
          avatar_url: '/placeholder-avatar.jpg',
          referral_count: 47,
          credits_earned: 470,
          rank: 1,
          badge: 'Viral Champion'
        },
        {
          id: '2', 
          full_name: 'Mike Nail Artist',
          avatar_url: '/placeholder-avatar.jpg',
          referral_count: 32,
          credits_earned: 320,
          rank: 2,
          badge: 'Community Builder'
        },
        {
          id: '3',
          full_name: 'Jessica Hair Guru',
          avatar_url: '/placeholder-avatar.jpg',
          referral_count: 28,
          credits_earned: 280,
          rank: 3,
          badge: 'Growth Master'
        },
        {
          id: '4',
          full_name: 'Alex Makeup Pro',
          avatar_url: '/placeholder-avatar.jpg',
          referral_count: 21,
          credits_earned: 210,
          rank: 4,
          badge: 'Rising Star'
        },
        {
          id: '5',
          full_name: 'Emma Salon Owner',
          avatar_url: '/placeholder-avatar.jpg',
          referral_count: 18,
          credits_earned: 180,
          rank: 5,
          badge: 'Networker'
        }
      ];

      setTopInviters(mockData);
      setUserRank(Math.floor(Math.random() * 50) + 6); // Mock user rank
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top inviters:', error);
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Trophy className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-amber-600" size={20} />;
      default:
        return <Star className="text-primary" size={16} />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const displayedInviters = showAll ? topInviters : topInviters.slice(0, 3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-full">
            <UserPlus className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Top Inviters</h3>
            <p className="text-sm text-muted-foreground">Community Champions</p>
          </div>
        </div>
        <motion.div
          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥 Live Rankings
        </motion.div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {displayedInviters.map((inviter, index) => (
            <motion.div
              key={inviter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                inviter.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20' : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(inviter.rank)}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <span className="font-bold text-sm text-primary">
                    {inviter.full_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{inviter.full_name}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getRankBadgeColor(inviter.rank)}`}>
                    {inviter.badge}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-primary">{inviter.referral_count}</div>
                <div className="text-xs text-muted-foreground">invites</div>
                <div className="text-xs text-green-600 font-medium">+{inviter.credits_earned} credits</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* User's Current Rank */}
      {userRank && (
        <motion.div
          className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="text-primary" size={16} />
              <span className="font-medium">Your Rank: #{userRank}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Keep inviting to climb higher! 🚀
            </div>
          </div>
        </motion.div>
      )}

      {topInviters.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `View All ${topInviters.length} Champions`}
          </Button>
        </div>
      )}

      {/* Motivation CTA */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl text-center"
        whileHover={{ scale: 1.02 }}
      >
        <div className="font-medium mb-2">🎯 Join the Champions!</div>
        <div className="text-sm text-muted-foreground mb-3">
          Every invite earns you +10 credits and moves you up the leaderboard
        </div>
        <Button size="sm" className="w-full">
          <UserPlus size={16} className="mr-2" />
          Start Inviting Now
        </Button>
      </motion.div>
    </Card>
  );
};

export default TopInvitersLeaderboard;