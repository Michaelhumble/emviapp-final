
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Star, DollarSign } from 'lucide-react';

interface SuccessNotification {
  id: string;
  message: string;
  icon: string;
  type: 'booking' | 'milestone' | 'achievement';
}

const SuccessNotifications = () => {
  const [notifications, setNotifications] = useState<SuccessNotification[]>([]);
  
  const successMessages = [
    { message: "💰 Sarah in NY just booked a $500 client!", icon: "💰", type: "booking" as const },
    { message: "🌟 Jennifer from LA hit 10k followers today!", icon: "🌟", type: "milestone" as const },
    { message: "🔥 Marcus just completed his 100th booking!", icon: "🔥", type: "achievement" as const },
    { message: "💎 Isabella earned Diamond status!", icon: "💎", type: "achievement" as const },
    { message: "💰 Elena in Miami landed a $750 bridal party!", icon: "💰", type: "booking" as const },
    { message: "⭐ David reached 5-star rating average!", icon: "⭐", type: "achievement" as const }
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
      const notification: SuccessNotification = {
        id: Date.now().toString(),
        ...randomMessage
      };
      
      setNotifications(prev => [...prev, notification]);
      
      // Auto remove after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);
    
    // Then show notifications every 15-25 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to show notification
        showNotification();
      }
    }, Math.random() * 10000 + 15000); // Random between 15-25 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm relative overflow-hidden"
          >
            {/* Gradient background based on type */}
            <div className={`absolute inset-0 opacity-5 ${
              notification.type === 'booking' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              notification.type === 'milestone' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              'bg-gradient-to-r from-orange-500 to-red-500'
            }`} />
            
            <div className="relative flex items-center gap-3">
              <div className="flex-shrink-0">
                <span className="text-xl">{notification.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Animated progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-1 ${
                notification.type === 'booking' ? 'bg-green-500' :
                notification.type === 'milestone' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuccessNotifications;
