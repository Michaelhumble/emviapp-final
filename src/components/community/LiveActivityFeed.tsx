import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Heart, Share, UserPlus, Trophy, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'share' | 'like' | 'referral' | 'leaderboard' | 'hire' | 'join';
  user: string;
  action: string;
  icon: React.ReactNode;
  color: string;
  timestamp: Date;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [currentActivity, setCurrentActivity] = useState<ActivityItem | null>(null);

  // Mock activity data - in real app, this would come from real-time data
  const mockActivities: Omit<ActivityItem, 'id' | 'timestamp'>[] = [
    {
      type: 'share',
      user: 'Sofia',
      action: 'just shared her success story!',
      icon: <Share className="w-4 h-4" />,
      color: 'text-blue-500'
    },
    {
      type: 'referral',
      user: 'Maya',
      action: 'invited 3 friends to EmviApp!',
      icon: <UserPlus className="w-4 h-4" />,
      color: 'text-green-500'
    },
    {
      type: 'leaderboard',
      user: 'Alex',
      action: 'is climbing the leaderboard!',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-purple-500'
    },
    {
      type: 'hire',
      user: 'Emma',
      action: 'just got hired at Dream Salon!',
      icon: <Trophy className="w-4 h-4" />,
      color: 'text-yellow-500'
    },
    {
      type: 'like',
      user: 'James',
      action: 'hit 100 likes on his post!',
      icon: <Heart className="w-4 h-4" />,
      color: 'text-red-500'
    },
    {
      type: 'join',
      user: 'Lisa',
      action: 'just joined the community!',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-orange-500'
    }
  ];

  // Generate new activities periodically
  useEffect(() => {
    const generateActivity = () => {
      const template = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      const newActivity: ActivityItem = {
        ...template,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      
      setCurrentActivity(newActivity);
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep last 5 activities
    };

    // Generate initial activity
    generateActivity();

    // Generate new activity every 8-15 seconds
    const interval = setInterval(() => {
      generateActivity();
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide current activity after 5 seconds
  useEffect(() => {
    if (currentActivity) {
      const timeout = setTimeout(() => {
        setCurrentActivity(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentActivity]);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      {/* Current Activity Popup */}
      <AnimatePresence>
        {currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-4 p-4 bg-background/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl max-w-sm pointer-events-auto"
          >
            <div className="flex items-center space-x-3">
              {/* Activity Icon */}
              <motion.div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${
                  currentActivity.color.includes('blue') ? 'from-blue-400 to-blue-600' :
                  currentActivity.color.includes('green') ? 'from-green-400 to-green-600' :
                  currentActivity.color.includes('purple') ? 'from-purple-400 to-purple-600' :
                  currentActivity.color.includes('yellow') ? 'from-yellow-400 to-yellow-600' :
                  currentActivity.color.includes('red') ? 'from-red-400 to-red-600' :
                  'from-orange-400 to-orange-600'
                }`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white">
                  {currentActivity.icon}
                </span>
              </motion.div>

              {/* Activity Text */}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">{currentActivity.user}</span>
                  <span className="text-muted-foreground ml-1">{currentActivity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">just now</p>
              </div>

              {/* Live Indicator */}
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity History (Mini) */}
      <AnimatePresence>
        {activities.length > 0 && !currentActivity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-3 bg-background/80 backdrop-blur-md border border-border/30 rounded-xl shadow-lg pointer-events-auto"
          >
            <div className="flex items-center space-x-2 mb-2">
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium text-muted-foreground">LIVE ACTIVITY</span>
            </div>
            
            <div className="space-y-1">
              {activities.slice(0, 3).map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-xs"
                >
                  <span className={activity.color}>
                    {activity.icon}
                  </span>
                  <span className="text-muted-foreground truncate">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityFeed;