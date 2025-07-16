import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Users, Calendar, MapPin } from 'lucide-react';

const RealTimeActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      icon: CheckCircle,
      user: 'Sarah',
      action: 'just booked a session at',
      location: 'Luxe Hair Studio',
      time: '2 min ago',
      color: 'text-green-600'
    },
    {
      icon: Users,
      user: 'Marcus',
      action: 'joined as a tattoo artist in',
      location: 'Austin, TX',
      time: '5 min ago',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      user: 'Jessica',
      action: 'completed their 50th booking at',
      location: 'Nail Bar SF',
      time: '8 min ago',
      color: 'text-purple-600'
    },
    {
      icon: CheckCircle,
      user: 'David',
      action: 'received a 5-star review at',
      location: 'Miami Beach Salon',
      time: '12 min ago',
      color: 'text-amber-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/30 max-w-md mx-auto">
      <div className="text-center mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground font-inter">
          🔥 Live Activity
        </h3>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentActivity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className={`p-2 rounded-full bg-gray-50`}>
            {React.createElement(activities[currentActivity].icon, {
              className: `h-4 w-4 ${activities[currentActivity].color}`
            })}
          </div>
          <div className="flex-1 text-sm">
            <span className="font-semibold text-foreground font-inter">
              {activities[currentActivity].user}
            </span>
            <span className="text-muted-foreground font-inter">
              {' '}{activities[currentActivity].action}{' '}
            </span>
            <span className="font-medium text-foreground font-inter">
              {activities[currentActivity].location}
            </span>
            <div className="text-xs text-muted-foreground font-inter">
              {activities[currentActivity].time}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RealTimeActivity;