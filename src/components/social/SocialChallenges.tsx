import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Target, Users, Trophy, Calendar, Share2, Heart, Star, Zap, Gift, 
  Crown, Sparkles, TrendingUp, CheckCircle, Clock, Flame 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community' | 'viral';
  category: 'referral' | 'booking' | 'engagement' | 'streak' | 'social';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  participants: number;
  maxParticipants?: number;
  progress: number;
  target: number;
  unit: string;
  reward: {
    points: number;
    credits?: number;
    badge?: string;
    special?: string;
  };
  timeLeft: string;
  icon: string;
  isActive: boolean;
  isCompleted: boolean;
  leaderboard?: Array<{
    id: string;
    name: string;
    avatar: string;
    progress: number;
  }>;
}

const SocialChallenges: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      
      // Mock challenges data with viral growth focus
      const mockChallenges: Challenge[] = [
        {
          id: '1',
          title: 'Viral Beauty Squad',
          description: 'Refer 5 friends this week and unlock exclusive VIP rewards',
          type: 'viral',
          category: 'referral',
          difficulty: 'medium',
          participants: 1247,
          maxParticipants: 2000,
          progress: 2,
          target: 5,
          unit: 'referrals',
          reward: {
            points: 500,
            credits: 50,
            badge: '🦋 Squad Leader',
            special: 'VIP Beauty Box'
          },
          timeLeft: '4 days',
          icon: '👥',
          isActive: true,
          isCompleted: false,
          leaderboard: [
            { id: '1', name: 'Emma', avatar: '', progress: 5 },
            { id: '2', name: 'Sofia', avatar: '', progress: 4 },
            { id: '3', name: 'Mia', avatar: '', progress: 3 }
          ]
        },
        {
          id: '2',
          title: 'Beauty Streak Master',
          description: 'Maintain a 14-day login streak for ultimate rewards',
          type: 'individual',
          category: 'streak',
          difficulty: 'hard',
          participants: 892,
          progress: 8,
          target: 14,
          unit: 'days',
          reward: {
            points: 1000,
            credits: 100,
            badge: '⚡ Streak Legend',
            special: 'Premium Feature Unlock'
          },
          timeLeft: '6 days',
          icon: '🔥',
          isActive: true,
          isCompleted: false
        },
        {
          id: '3',
          title: 'Community Love Fest',
          description: 'Write 10 reviews to spread beauty community love',
          type: 'community',
          category: 'engagement',
          difficulty: 'easy',
          participants: 2156,
          progress: 6,
          target: 10,
          unit: 'reviews',
          reward: {
            points: 300,
            credits: 30,
            badge: '💝 Love Spreader'
          },
          timeLeft: '2 days',
          icon: '💕',
          isActive: true,
          isCompleted: false
        },
        {
          id: '4',
          title: 'Booking Champion',
          description: 'Complete 3 appointments this month for exclusive perks',
          type: 'individual',
          category: 'booking',
          difficulty: 'medium',
          participants: 734,
          progress: 1,
          target: 3,
          unit: 'bookings',
          reward: {
            points: 750,
            credits: 75,
            badge: '👑 Booking Royalty',
            special: 'Priority Booking Access'
          },
          timeLeft: '12 days',
          icon: '📅',
          isActive: true,
          isCompleted: false
        },
        {
          id: '5',
          title: 'Social Butterfly',
          description: 'Share 15 beauty posts across social media',
          type: 'viral',
          category: 'social',
          difficulty: 'easy',
          participants: 1834,
          progress: 12,
          target: 15,
          unit: 'shares',
          reward: {
            points: 400,
            credits: 40,
            badge: '🦋 Social Star'
          },
          timeLeft: '5 days',
          icon: '📱',
          isActive: true,
          isCompleted: false
        }
      ];

      setChallenges(mockChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'legendary': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return <Target className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'viral': return <TrendingUp className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      toast.success(`🎯 Joined "${challenge.title}"! Let's do this!`);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B']
      });
    }
  };

  const handleShareChallenge = (challenge: Challenge) => {
    const message = `🏆 Join me in the "${challenge.title}" challenge on EmviApp! ${challenge.reward.points} points up for grabs! 💪✨`;
    navigator.clipboard.writeText(message);
    toast.success('Challenge shared! Invite your friends! 🎉');
  };

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-white/20 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
          Social Challenges
        </CardTitle>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', icon: Star },
            { key: 'referral', label: 'Referral', icon: Users },
            { key: 'booking', label: 'Booking', icon: Calendar },
            { key: 'engagement', label: 'Social', icon: Heart },
            { key: 'streak', label: 'Streak', icon: Flame }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={`${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 border-white/30 hover:bg-white/20'
              }`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all border ${
                challenge.isCompleted ? 'border-green-500/50' : 'border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{challenge.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white flex items-center">
                      {challenge.title}
                      {getTypeIcon(challenge.type)}
                      <span className="ml-2"></span>
                    </h3>
                    <p className="text-sm text-white/70">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  {challenge.isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/70">
                    Progress: {challenge.progress} / {challenge.target} {challenge.unit}
                  </span>
                  <span className="text-white/70 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {challenge.timeLeft} left
                  </span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.target) * 100}
                  className="h-2 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-purple-400 [&>div]:to-pink-500"
                />
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400" />
                    <span>{challenge.reward.points} pts</span>
                  </div>
                  {challenge.reward.credits && (
                    <div className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                      <span>{challenge.reward.credits} credits</span>
                    </div>
                  )}
                  {challenge.reward.badge && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {challenge.reward.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-white/60">
                  <Users className="h-3 w-3 mr-1" />
                  {challenge.participants} joined
                </div>
              </div>

              {/* Special Reward */}
              {challenge.reward.special && (
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-lg p-2 mb-3">
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 mr-2 text-amber-400" />
                    <span className="text-sm text-amber-200">Bonus: {challenge.reward.special}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {challenge.isCompleted ? (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    {challenge.isActive ? 'Continue' : 'Join Challenge'}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareChallenge(challenge)}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Mini Leaderboard for viral challenges */}
              {challenge.type === 'viral' && challenge.leaderboard && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-white/60 mb-2">Top Performers:</p>
                  <div className="flex space-x-2">
                    {challenge.leaderboard.slice(0, 3).map((leader, idx) => (
                      <div key={leader.id} className="flex items-center space-x-1 text-xs">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={leader.avatar} />
                          <AvatarFallback className="text-xs">{leader.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{leader.name}</span>
                        <Badge className="bg-white/10 text-white text-xs">
                          {leader.progress}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default SocialChallenges;