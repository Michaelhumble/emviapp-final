import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Crown, Zap, Target, Users, TrendingUp, Award, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';

interface GamificationSystemProps {
  className?: string;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({ className = '' }) => {
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(150);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadUserProgress();
    loadLeaderboard();
    loadCurrentChallenge();
    loadAchievements();
  }, [user]);

  const loadUserProgress = () => {
    // Simulate user progress data
    const xp = 1250;
    const level = Math.floor(xp / 500) + 1;
    const xpInCurrentLevel = xp % 500;
    
    setUserLevel(level);
    setUserXP(xpInCurrentLevel);
    
    // Load user badges
    const badges = [
      { id: 1, name: 'First Post', icon: '🎯', earned: true, rarity: 'common' },
      { id: 2, name: 'Viral Creator', icon: '🚀', earned: true, rarity: 'rare' },
      { id: 3, name: 'Community Helper', icon: '💝', earned: true, rarity: 'uncommon' },
      { id: 4, name: 'Trendsetter', icon: '✨', earned: false, rarity: 'epic' },
      { id: 5, name: 'AI Pioneer', icon: '🤖', earned: true, rarity: 'legendary' },
    ];
    setUserBadges(badges);
  };

  const loadLeaderboard = () => {
    // Simulate leaderboard data
    const data = [
      { id: 1, name: 'Sarah Chen', level: 8, xp: 4250, avatar: '/api/placeholder/40/40', badge: '👑' },
      { id: 2, name: 'Maria Rodriguez', level: 7, xp: 3890, avatar: '/api/placeholder/40/40', badge: '🥈' },
      { id: 3, name: 'Ashley Kim', level: 7, xp: 3654, avatar: '/api/placeholder/40/40', badge: '🥉' },
      { id: 4, name: 'You', level: userLevel, xp: 1250, avatar: '/api/placeholder/40/40', badge: '⭐', isCurrentUser: true },
      { id: 5, name: 'Jessica Liu', level: 6, xp: 2980, avatar: '/api/placeholder/40/40', badge: '🌟' },
    ].sort((a, b) => b.xp - a.xp);
    
    setLeaderboard(data);
  };

  const loadCurrentChallenge = () => {
    const challenge = {
      id: 1,
      title: 'Weekly Beauty Challenge',
      description: 'Share your best nail art creation this week',
      timeLeft: '3 days left',
      progress: 65,
      totalParticipants: 1247,
      prize: '500 XP + Exclusive Badge',
      difficulty: 'Medium',
      category: 'Nails'
    };
    setCurrentChallenge(challenge);
  };

  const loadAchievements = () => {
    const achievementData = [
      { 
        id: 1, 
        title: 'Rising Star', 
        description: 'Get 100 likes on a single post', 
        progress: 75, 
        target: 100, 
        reward: '250 XP',
        icon: '⭐'
      },
      { 
        id: 2, 
        title: 'Community Builder', 
        description: 'Comment on 50 posts', 
        progress: 32, 
        target: 50, 
        reward: 'Helper Badge',
        icon: '🏗️'
      },
      { 
        id: 3, 
        title: 'Viral Sensation', 
        description: 'Get 1000 shares across all posts', 
        progress: 234, 
        target: 1000, 
        reward: 'Viral Badge + 1000 XP',
        icon: '🚀'
      }
    ];
    setAchievements(achievementData);
  };

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'uncommon': return 'bg-green-100 text-green-700 border-green-200';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getXPForNextLevel = () => {
    return 500; // XP needed for next level
  };

  const NewBadgeAnimation = ({ badge }: { badge: any }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-8 mx-4 max-w-sm text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-6xl mb-4"
        >
          {badge.icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">New Badge Earned!</h3>
        <p className="text-lg text-purple-600 font-semibold mb-4">{badge.name}</p>
        <Button onClick={() => setShowNewBadge(false)} className="bg-gradient-to-r from-purple-500 to-pink-500">
          Awesome!
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* User Level & XP */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Level {userLevel}</h3>
              <p className="text-purple-100">Beauty Enthusiast</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userXP}</div>
              <div className="text-sm text-purple-100">/{getXPForNextLevel()} XP</div>
            </div>
          </div>
          
          <Progress 
            value={(userXP / getXPForNextLevel()) * 100} 
            className="h-3 bg-purple-700"
          />
          
          <div className="flex items-center justify-between mt-4 text-sm text-purple-100">
            <span>Next level in {getXPForNextLevel() - userXP} XP</span>
            <span>Total: {(userLevel - 1) * 500 + userXP} XP</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Challenge */}
      {currentChallenge && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">{currentChallenge.title}</CardTitle>
              <Badge variant="outline" className="ml-auto">
                {currentChallenge.timeLeft}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{currentChallenge.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentChallenge.totalParticipants}</div>
                <div className="text-sm text-gray-500">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{currentChallenge.progress}%</div>
                <div className="text-sm text-gray-500">Your Progress</div>
              </div>
            </div>
            
            <Progress value={currentChallenge.progress} className="mb-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Gift className="h-4 w-4" />
                <span>Prize: {currentChallenge.prize}</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                Join Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Weekly Leaderboard</CardTitle>
            <Badge className="ml-auto bg-gradient-to-r from-yellow-500 to-orange-500">
              Top Creators
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  user.isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-xl">{user.badge}</span>
                </div>
                
                <img 
                  src={user.avatar || '/api/placeholder/32/32'} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">Level {user.level} • {user.xp} XP</div>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg">Badge Collection</CardTitle>
            <Badge variant="outline" className="ml-auto">
              {userBadges.filter(b => b.earned).length}/{userBadges.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {userBadges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  badge.earned 
                    ? getBadgeRarityColor(badge.rarity)
                    : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium">{badge.name}</div>
                {badge.rarity === 'legendary' && badge.earned && (
                  <div className="text-xs mt-1 font-bold">LEGENDARY</div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Achievements */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Active Achievements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {achievement.reward}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{achievement.progress}/{achievement.target}</span>
                    <span className="text-purple-600">{Math.round((achievement.progress / achievement.target) * 100)}%</span>
                  </div>
                  <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Badge Animation */}
      <AnimatePresence>
        {showNewBadge && (
          <NewBadgeAnimation badge={userBadges.find(b => b.name === 'AI Pioneer')} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationSystem;