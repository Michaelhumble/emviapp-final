import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Calendar, Users, Star, Trophy, Zap, 
  TrendingUp, Heart, Crown, Gift, Target, Lock,
  Eye, Sparkles, Award, MessageCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SuccessStory {
  id: string;
  type: 'booking' | 'earning' | 'milestone' | 'viral' | 'job_match' | 'contest_win' | 'level_up';
  user: {
    name: string;
    avatar: string;
    role: 'artist' | 'salon' | 'customer';
    level?: number;
  };
  achievement: {
    title: string;
    description: string;
    value?: number;
    metric?: string;
    image?: string;
  };
  timeAgo: string;
  isNew: boolean;
  isBlurred: boolean;
  unlockMessage?: string;
}

interface SuccessWallProps {
  onSignUp: () => void;
  onViewProfile: (userId: string) => void;
}

const SuccessWall: React.FC<SuccessWallProps> = ({ onSignUp, onViewProfile }) => {
  const { user } = useAuth();
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [liveStats, setLiveStats] = useState({
    activeDeals: 24,
    newJobs: 15,
    contestWinners: 7
  });

  // Mock success stories with blur logic
  const generateSuccessStories = (): SuccessStory[] => {
    const baseStories: Omit<SuccessStory, 'isBlurred' | 'unlockMessage'>[] = [
      {
        id: '1',
        type: 'earning',
        user: { name: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332fb6c?w=100&h=100&fit=crop', role: 'artist', level: 12 },
        achievement: { title: 'Earned $500 from one post!', description: 'Her nail art tutorial went viral and generated 23 bookings', value: 500, metric: 'USD' },
        timeAgo: '2 minutes ago',
        isNew: true
      },
      {
        id: '2',
        type: 'job_match',
        user: { name: 'Mike H.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', role: 'artist', level: 8 },
        achievement: { title: 'Matched with dream salon job!', description: 'Perfect match for Hair Stylist position in Beverly Hills', value: 75000, metric: 'annual' },
        timeAgo: '5 minutes ago',
        isNew: true
      },
      {
        id: '3',
        type: 'viral',
        user: { name: 'Emma S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'artist', level: 15 },
        achievement: { title: 'Post hit 10K likes!', description: 'Her makeup transformation broke all records', value: 10000, metric: 'likes', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop' },
        timeAgo: '12 minutes ago',
        isNew: false
      },
      {
        id: '4',
        type: 'milestone',
        user: { name: 'Luna Art', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', role: 'artist', level: 20 },
        achievement: { title: 'Reached 1K followers!', description: 'Her consistent content finally paid off', value: 1000, metric: 'followers' },
        timeAgo: '18 minutes ago',
        isNew: false
      },
      {
        id: '5',
        type: 'contest_win',
        user: { name: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', role: 'salon', level: 10 },
        achievement: { title: 'Won Weekly Beauty Battle!', description: '$1000 prize for best salon transformation', value: 1000, metric: 'prize' },
        timeAgo: '25 minutes ago',
        isNew: false
      },
      {
        id: '6',
        type: 'booking',
        user: { name: 'Jessica L.', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', role: 'customer', level: 5 },
        achievement: { title: 'Booked 5 appointments this week!', description: 'Found amazing artists through EmviApp', value: 5, metric: 'bookings' },
        timeAgo: '32 minutes ago',
        isNew: false
      },
      {
        id: '7',
        type: 'level_up',
        user: { name: 'David R.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', role: 'artist', level: 25 },
        achievement: { title: 'Reached Expert Level!', description: 'Unlocked exclusive VIP features and mentorship program', value: 25, metric: 'level' },
        timeAgo: '45 minutes ago',
        isNew: false
      },
      {
        id: '8',
        type: 'earning',
        user: { name: 'Sophie W.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', role: 'artist', level: 18 },
        achievement: { title: 'Monthly income hit $8K!', description: 'Best month ever thanks to community support', value: 8000, metric: 'monthly' },
        timeAgo: '1 hour ago',
        isNew: false
      }
    ];

    // Apply blur logic for non-users
    return baseStories.map((story, index) => ({
      ...story,
      isBlurred: !user && index >= 2, // Show first 2 unblurred for guests
      unlockMessage: !user ? 'Sign up to see all community wins and join the success!' : undefined
    }));
  };

  useEffect(() => {
    setSuccessStories(generateSuccessStories());
    
    // Calculate totals
    const earnings = generateSuccessStories()
      .filter(s => s.type === 'earning' && !s.isBlurred)
      .reduce((sum, story) => sum + (story.achievement.value || 0), 0);
    setTotalEarnings(earnings);
    
    const bookings = generateSuccessStories()
      .filter(s => s.type === 'booking' && !s.isBlurred)
      .reduce((sum, story) => sum + (story.achievement.value || 0), 0);
    setTotalBookings(bookings);

    // Simulate live updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStory = generateSuccessStories()[Math.floor(Math.random() * 3)];
        newStory.id = Date.now().toString();
        newStory.timeAgo = 'just now';
        newStory.isNew = true;
        
        setSuccessStories(prev => [newStory, ...prev.slice(0, 15)]);
        
        // Update live stats
        setLiveStats(prev => ({
          activeDeals: prev.activeDeals + Math.floor(Math.random() * 3),
          newJobs: prev.newJobs + Math.floor(Math.random() * 2),
          contestWinners: prev.contestWinners + (Math.random() > 0.8 ? 1 : 0)
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [user]);

  const getSuccessIcon = (type: string) => {
    switch (type) {
      case 'earning': return DollarSign;
      case 'booking': return Calendar;
      case 'milestone': return Star;
      case 'viral': return TrendingUp;
      case 'job_match': return Target;
      case 'contest_win': return Trophy;
      case 'level_up': return Crown;
      default: return Sparkles;
    }
  };

  const getSuccessColor = (type: string) => {
    switch (type) {
      case 'earning': return 'from-green-500 to-emerald-500';
      case 'booking': return 'from-blue-500 to-cyan-500';
      case 'milestone': return 'from-purple-500 to-pink-500';
      case 'viral': return 'from-orange-500 to-red-500';
      case 'job_match': return 'from-indigo-500 to-purple-500';
      case 'contest_win': return 'from-yellow-500 to-orange-500';
      case 'level_up': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Success Wall Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="h-8 w-8 text-yellow-500" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Live Success Wall
          </h2>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-6 w-6 text-yellow-500" />
          </motion.div>
        </motion.div>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real wins happening right now! Join thousands earning, growing, and succeeding together 🚀
        </p>
      </div>

      {/* Live Stats Banner */}
      <motion.div
        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-6 text-white"
        animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 200%' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <div className="text-sm opacity-80">Earned This Hour</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{liveStats.activeDeals}</div>
            <div className="text-sm opacity-80">Active Deals</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{liveStats.newJobs}</div>
            <div className="text-sm opacity-80">Jobs Posted Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{liveStats.contestWinners}</div>
            <div className="text-sm opacity-80">Contest Winners</div>
          </div>
        </div>
      </motion.div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {successStories.slice(0, visibleCount).map((story, index) => {
            const Icon = getSuccessIcon(story.type);
            
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <Card className={`
                  p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                  ${story.isNew ? 'ring-2 ring-green-400 shadow-lg' : ''}
                  ${story.isBlurred ? 'opacity-75' : ''}
                `}>
                  
                  {/* New Badge */}
                  {story.isNew && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                          NEW! 🔥
                        </Badge>
                      </motion.div>
                    </div>
                  )}

                  {/* Blur Overlay for Locked Content */}
                  {story.isBlurred && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="text-center p-4">
                        <Lock className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                        <p className="text-sm text-gray-700 font-medium mb-3">
                          {story.unlockMessage}
                        </p>
                        <Button 
                          onClick={onSignUp}
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          Unlock All Success Stories ✨
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Success Icon */}
                    <div className={`p-3 rounded-full bg-gradient-to-r ${getSuccessColor(story.type)} flex-shrink-0`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={story.user.avatar} />
                          <AvatarFallback>{story.user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-gray-900 truncate">{story.user.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {story.user.role}
                            </Badge>
                            {story.user.level && (
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                Level {story.user.level}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <h5 className="font-bold text-gray-900 mb-1">{story.achievement.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{story.achievement.description}</p>
                      
                      {/* Achievement Value */}
                      {story.achievement.value && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${getSuccessColor(story.type)} text-white`}>
                            {story.achievement.metric === 'USD' && '$'}
                            {story.achievement.value.toLocaleString()}
                            {story.achievement.metric && story.achievement.metric !== 'USD' && ` ${story.achievement.metric}`}
                          </Badge>
                        </div>
                      )}

                      {/* Achievement Image */}
                      {story.achievement.image && !story.isBlurred && (
                        <img 
                          src={story.achievement.image} 
                          alt="Achievement"
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{story.timeAgo}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (story.isBlurred) {
                              onSignUp();
                              return;
                            }
                            onViewProfile(story.user.name);
                          }}
                          className="text-xs hover:bg-purple-50"
                        >
                          {story.isBlurred ? 'Unlock' : 'View Profile'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Load More / Join CTA */}
      <div className="text-center space-y-4">
        {user && visibleCount < successStories.length && (
          <Button
            onClick={() => setVisibleCount(prev => prev + 8)}
            variant="outline"
            className="border-2 border-purple-300 hover:bg-purple-50"
          >
            Load More Success Stories
          </Button>
        )}

        {/* Main CTA for Non-Users */}
        {!user && (
          <motion.div
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="mb-6 opacity-90">
              Join {liveStats.activeDeals}+ beauty professionals who are earning, growing, and winning every day! 
              Your success story could be next on this wall! 🌟
            </p>
            <Button
              onClick={onSignUp}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 font-bold px-8 py-3"
            >
              Start Your Success Journey 🚀
            </Button>
          </motion.div>
        )}

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">10,247</div>
            <div className="text-sm text-gray-600">Total Success Stories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">$2.4M</div>
            <div className="text-sm text-gray-600">Community Earnings</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">15,892</div>
            <div className="text-sm text-gray-600">Jobs Matched</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">98.2%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessWall;