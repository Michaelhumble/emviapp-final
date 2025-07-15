import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, TrendingUp, Medal, Zap, Target } from 'lucide-react';

interface TopSharer {
  id: string;
  name: string;
  avatar: string;
  shares: number;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  badge?: string;
}

interface ContestEntry {
  id: string;
  name: string;
  avatar: string;
  votes: number;
  contestEntry: string;
  badge?: string;
}

interface TopSharersLeaderboardProps {
  showContestEntries?: boolean;
}

const TopSharersLeaderboard: React.FC<TopSharersLeaderboardProps> = ({ showContestEntries = false }) => {
  const [topSharers, setTopSharers] = useState<TopSharer[]>([]);
  const [topContestEntries, setTopContestEntries] = useState<ContestEntry[]>([]);
  const [currentWeek, setCurrentWeek] = useState('');
  const [activeTab, setActiveTab] = useState<'sharers' | 'contest'>('sharers');

  // Mock data - in real app, this would come from your database
  useEffect(() => {
    const mockData: TopSharer[] = [
      {
        id: '1',
        name: 'Sofia Bella',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face',
        shares: 47,
        level: 'Diamond',
        badge: 'Viral Queen'
      },
      {
        id: '2',
        name: 'Maya Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        shares: 34,
        level: 'Platinum',
        badge: 'Community Star'
      },
      {
        id: '3',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        shares: 28,
        level: 'Gold',
        badge: 'Rising Star'
      },
      {
        id: '4',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        shares: 22,
        level: 'Silver'
      },
      {
        id: '5',
        name: 'James Park',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        shares: 18,
        level: 'Bronze'
      }
    ];

    setTopSharers(mockData);

    // Mock contest entries data
    const mockContestData: ContestEntry[] = [
      {
        id: '1',
        name: 'Sofia Bella',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face',
        votes: 234,
        contestEntry: 'My salon transformation journey!',
        badge: 'Contest Leader'
      },
      {
        id: '2',
        name: 'Maya Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        votes: 189,
        contestEntry: 'First day at dream job',
        badge: 'Rising Star'
      },
      {
        id: '3',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        votes: 156,
        contestEntry: '6 months of growth',
        badge: 'Community Favorite'
      },
      {
        id: '4',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        votes: 134,
        contestEntry: 'Opened my nail studio!'
      },
      {
        id: '5',
        name: 'James Park',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        votes: 98,
        contestEntry: 'Best week ever at work'
      }
    ];

    setTopContestEntries(mockContestData);
    
    // Set current week
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    setCurrentWeek(`${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`);
  }, []);

  const getLevelIcon = (level: string, position: number) => {
    if (position === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (position === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (position === 2) return <Medal className="w-5 h-5 text-orange-600" />;
    
    switch (level) {
      case 'Diamond': return <Star className="w-4 h-4 text-blue-500" />;
      case 'Platinum': return <Zap className="w-4 h-4 text-purple-500" />;
      case 'Gold': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'Silver': return <Medal className="w-4 h-4 text-gray-400" />;
      default: return <TrendingUp className="w-4 h-4 text-orange-500" />;
    }
  };

  const getLevelColors = (level: string) => {
    switch (level) {
      case 'Diamond': return 'from-blue-400 to-cyan-400';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      default: return 'from-orange-400 to-orange-600';
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0: return 'ring-4 ring-yellow-400/50 scale-110';
      case 1: return 'ring-3 ring-gray-400/50 scale-105';
      case 2: return 'ring-3 ring-orange-600/50 scale-105';
      default: return 'ring-2 ring-primary/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-border/50 rounded-3xl p-6 mb-8 overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60" />
      <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{ 
              rotate: 360,
              boxShadow: [
                "0 0 15px rgba(245, 158, 11, 0.4)",
                "0 0 25px rgba(249, 115, 22, 0.6)",
                "0 0 15px rgba(245, 158, 11, 0.4)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Community Leaders
            </h3>
            <p className="text-sm text-muted-foreground">{currentWeek}</p>
          </div>
        </div>
        
        <motion.div
          className="px-4 py-2 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 rounded-full backdrop-blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">🏆 HALL OF FAME</span>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex space-x-2 mb-6 p-1 bg-background/40 rounded-2xl border border-border/30">
        <button
          onClick={() => setActiveTab('sharers')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            activeTab === 'sharers' 
              ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">Top Sharers</span>
        </button>
        <button
          onClick={() => setActiveTab('contest')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            activeTab === 'contest' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Target className="w-4 h-4" />
          <span className="font-medium">Contest Entries</span>
        </button>
      </div>

      {/* Leaderboard */}
      <div className="relative z-10 space-y-3">
        {(activeTab === 'sharers' ? topSharers : topContestEntries).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/30 hover:bg-background/80 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              {/* Position */}
              <div className="flex items-center justify-center w-8 h-8 font-bold text-lg">
                {index < 3 ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </motion.div>
                ) : (
                  <span className="text-muted-foreground">#{index + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${getPositionStyle(index)}`}
                />
                {activeTab === 'sharers' && (
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getLevelColors((item as TopSharer).level)} flex items-center justify-center`}>
                    {getLevelIcon((item as TopSharer).level, index)}
                  </div>
                )}
                {activeTab === 'contest' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  {item.badge && (
                    <span className="px-2 py-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full text-xs font-medium text-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'sharers' 
                    ? `${(item as TopSharer).level} Level` 
                    : `"${(item as ContestEntry).contestEntry}"`}
                </p>
              </div>
            </div>

            {/* Count */}
            <div className="text-right">
              <div className="flex items-center space-x-1">
                {activeTab === 'sharers' ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-lg">{(item as TopSharer).shares}</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-lg">{(item as ContestEntry).votes}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeTab === 'sharers' ? 'shares' : 'votes'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-6 text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20"
      >
        <p className="text-sm text-muted-foreground mb-2">
          {activeTab === 'sharers' 
            ? 'Share your wins to climb the leaderboard! 🚀' 
            : 'Enter this week\'s challenge to compete! 🎯'}
        </p>
        <p className="text-xs text-muted-foreground">
          {activeTab === 'sharers' 
            ? 'Top sharers get exclusive badges, rewards, and recognition in the community'
            : 'Contest winners get featured spotlights and amazing prizes!'}
        </p>
      </motion.div>

      {/* Floating sparkles */}
      <motion.div
        className="absolute top-8 right-16 w-2 h-2 bg-yellow-400/70 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.4, 1, 0.4] 
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-12 left-20 w-1.5 h-1.5 bg-orange-400/60 rounded-full"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.3, 0.8, 0.3] 
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
      />
    </motion.div>
  );
};

export default TopSharersLeaderboard;