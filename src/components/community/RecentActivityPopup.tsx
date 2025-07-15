import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, Star, X } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'hired' | 'booked' | 'joined';
  user: string;
  detail: string;
  timeAgo: string;
  avatar?: string;
}

const RecentActivityPopup = () => {
  const [currentActivity, setCurrentActivity] = useState<ActivityItem | null>(null);
  const [activityQueue, setActivityQueue] = useState<ActivityItem[]>([]);

  // Mock activity data - in real app, this would come from your real-time system
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'hired',
      user: 'Sarah M.',
      detail: 'just got hired at Bloom Salon!',
      timeAgo: 'now',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      type: 'booked',
      user: 'Jessica L.',
      detail: 'booked 3 appointments today',
      timeAgo: '2m ago'
    },
    {
      id: '3',
      type: 'joined',
      user: 'Marcus T.',
      detail: 'joined EmviApp community',
      timeAgo: '5m ago'
    },
    {
      id: '4',
      type: 'hired',
      user: 'Lily K.',
      detail: 'landed her dream nail tech job!',
      timeAgo: '8m ago'
    },
    {
      id: '5',
      type: 'booked',
      user: 'David R.',
      detail: 'fully booked this week',
      timeAgo: '12m ago'
    }
  ];

  useEffect(() => {
    // Initialize with activities
    setActivityQueue(activities);
  }, []);

  useEffect(() => {
    if (activityQueue.length === 0) return;

    const showNextActivity = () => {
      const nextActivity = activityQueue[0];
      setCurrentActivity(nextActivity);
      
      // Remove the shown activity from queue
      setActivityQueue(prev => prev.slice(1));
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setCurrentActivity(null);
      }, 5000);
    };

    // Show first activity immediately, then every 15 seconds
    const timer = setTimeout(showNextActivity, currentActivity ? 15000 : 0);
    
    return () => clearTimeout(timer);
  }, [activityQueue, currentActivity]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hired': return <Briefcase className="w-4 h-4 text-green-500" />;
      case 'booked': return <Star className="w-4 h-4 text-blue-500" />;
      case 'joined': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Star className="w-4 h-4 text-primary" />;
    }
  };

  const getActivityEmoji = (type: string) => {
    switch (type) {
      case 'hired': return '🎉';
      case 'booked': return '⭐';
      case 'joined': return '👋';
      default: return '✨';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'hired': return 'from-green-500 to-emerald-500';
      case 'booked': return 'from-blue-500 to-sky-500';
      case 'joined': return 'from-purple-500 to-violet-500';
      default: return 'from-primary to-accent';
    }
  };

  const handleDismiss = () => {
    setCurrentActivity(null);
  };

  return (
    <AnimatePresence>
      {currentActivity && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <motion.div
            className="bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            layout
          >
            {/* Progress bar */}
            <motion.div
              className={`h-1 bg-gradient-to-r ${getActivityColor(currentActivity.type)}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <motion.span
                    className="text-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {getActivityEmoji(currentActivity.type)}
                  </motion.span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentActivity.timeAgo}
                  </span>
                </div>
                
                <button
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start space-x-3">
                {currentActivity.avatar && (
                  <img
                    src={currentActivity.avatar}
                    alt={currentActivity.user}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getActivityIcon(currentActivity.type)}
                    <span className="font-semibold text-foreground text-sm truncate">
                      {currentActivity.user}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentActivity.detail}
                  </p>
                </div>
              </div>

              {/* FOMO message */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  {currentActivity.type === 'hired' ? 
                    '🔥 Jobs are filling fast!' : 
                    currentActivity.type === 'booked' ? 
                    '💼 Artists are in high demand!' : 
                    '🚀 Community is growing!'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentActivityPopup;