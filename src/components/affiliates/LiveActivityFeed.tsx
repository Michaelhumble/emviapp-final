import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, UserPlus, TrendingUp, Award } from 'lucide-react';

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
    <div className="fixed bottom-24 right-6 z-40 pointer-events-none">
      <AnimatePresence>
        {isVisible && currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl
                           bg-white/95 backdrop-blur-xl
                           border border-black/10
                           shadow-2xl shadow-black/20
                           min-w-[280px]">
              {/* Icon */}
              <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${currentActivity.color} 
                             flex items-center justify-center shadow-lg`}>
                <currentActivity.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[hsl(var(--ink-900))] truncate">
                  {currentActivity.name}
                </p>
                <p className="text-xs text-[hsl(var(--ink-600))] truncate">
                  {currentActivity.detail}
                </p>
              </div>

              {/* Live indicator */}
              <div className="shrink-0 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-xs text-[hsl(var(--ink-600))] font-medium">
                  Live
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityFeed;
