import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, UserPlus, TrendingUp, Award, Sparkles } from 'lucide-react';

interface Activity {
  id: string;
  type: 'earning' | 'signup' | 'tier' | 'milestone';
  name: string;
  detail: string;
  icon: typeof DollarSign;
  color: string;
}

const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const activities: Activity[] = [
    { id: '1', type: 'earning', name: 'Sarah M.', detail: '$180 commission', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
    { id: '2', type: 'signup', name: 'New affiliate', detail: 'joined from California', icon: UserPlus, color: 'from-blue-500 to-cyan-500' },
    { id: '3', type: 'tier', name: 'Mike T.', detail: 'reached Gold tier', icon: Award, color: 'from-amber-500 to-yellow-500' },
    { id: '4', type: 'earning', name: 'Jessica L.', detail: '$340 commission', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
    { id: '5', type: 'milestone', name: 'Alex R.', detail: '$5K milestone', icon: TrendingUp, color: 'from-purple-500 to-fuchsia-500' },
    { id: '6', type: 'earning', name: 'David K.', detail: '$120 commission', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
    { id: '7', type: 'signup', name: 'New affiliate', detail: 'joined from Texas', icon: UserPlus, color: 'from-blue-500 to-cyan-500' },
    { id: '8', type: 'earning', name: 'Emma S.', detail: '$280 commission', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
  ];

  useEffect(() => {
    let activityIndex = 0;

    const showActivity = () => {
      setCurrentActivity(activities[activityIndex]);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // Move to next activity
      activityIndex = (activityIndex + 1) % activities.length;
    };

    // Show first activity after 3 seconds
    const initialTimeout = setTimeout(showActivity, 3000);

    // Then show new activity every 8 seconds
    const interval = setInterval(showActivity, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-6 md:right-8 z-40 pointer-events-none">
      <AnimatePresence>
        {isVisible && currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20,
              opacity: { duration: 0.3 }
            }}
            className="pointer-events-auto"
          >
            <motion.div 
              className="relative bg-gradient-to-br from-white via-white to-violet-50/50 backdrop-blur-xl 
                         border-2 border-violet-200/50 rounded-2xl shadow-2xl p-5 overflow-hidden min-w-[300px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-50" />
              
              <div className="flex items-start gap-4 relative z-10">
                {/* Icon */}
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${currentActivity.color} 
                               flex items-center justify-center shadow-lg relative`}>
                  <currentActivity.icon className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base text-[hsl(var(--ink-900))] truncate">
                    {currentActivity.name}
                  </p>
                  <p className="text-sm text-[hsl(var(--ink-700))] mt-1 font-medium truncate">
                    {currentActivity.detail}
                  </p>
                </div>

                {/* Live indicator */}
                <div className="shrink-0 pt-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-br from-violet-500 to-fuchsia-500"></span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityFeed;
