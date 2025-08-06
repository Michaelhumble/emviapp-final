import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Flame, Trophy, Users, DollarSign, Star, 
  Heart, MessageCircle, Award, Crown, Zap, Gift 
} from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'trending' | 'contest' | 'earning' | 'social' | 'milestone' | 'urgent';
  title: string;
  message: string;
  time: string;
  urgent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface LiveNotificationsProps {
  onJoinNow: () => void;
  onViewTrending: () => void;
  onViewContest: () => void;
}

const LiveNotifications: React.FC<LiveNotificationsProps> = ({
  onJoinNow,
  onViewTrending,
  onViewContest
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationTemplates = [
    {
      type: 'trending' as const,
      title: '🔥 Trending Alert',
      message: 'Nail Art Magic is exploding! Join 2.3K others posting now',
      urgent: true,
      action: { label: 'Join Trend', onClick: onViewTrending }
    },
    {
      type: 'contest' as const,
      title: '⏰ Contest Ending Soon',
      message: '$500 prize contest ends in 2 hours. Only 137 entries!',
      urgent: true,
      action: { label: 'Enter Contest', onClick: onViewContest }
    },
    {
      type: 'earning' as const,
      title: '💰 Someone Just Earned',
      message: 'Sarah K. just earned $500 from the community contest!',
      urgent: false,
      action: { label: 'Learn How', onClick: onJoinNow }
    },
    {
      type: 'social' as const,
      title: '❤️ Viral Post Alert',
      message: 'A post just hit 100+ likes in 10 minutes!',
      urgent: false,
      action: { label: 'See Post', onClick: onViewTrending }
    },
    {
      type: 'milestone' as const,
      title: '🎉 Community Milestone',
      message: 'We just hit 10,000 active members this week!',
      urgent: false,
      action: { label: 'Celebrate', onClick: onJoinNow }
    },
    {
      type: 'urgent' as const,
      title: '⚡ Limited Spots',
      message: 'Featured Artist spotlight - only 3 spots left this month!',
      urgent: true,
      action: { label: 'Apply Now', onClick: onJoinNow }
    }
  ];

  // Generate notifications at random intervals
  useEffect(() => {
    const generateNotification = () => {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...template,
        time: 'just now'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);

      // Show urgent notifications as toasts
      if (template.urgent) {
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-lg max-w-md"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {template.type === 'trending' && <Flame className="h-5 w-5" />}
                {template.type === 'contest' && <Trophy className="h-5 w-5" />}
                {template.type === 'urgent' && <Zap className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{template.title}</h4>
                <p className="text-sm opacity-90 mt-1">{template.message}</p>
                {template.action && (
                  <button
                    onClick={() => {
                      template.action!.onClick();
                      toast.dismiss(t);
                    }}
                    className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                  >
                    {template.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => toast.dismiss(t)}
                className="flex-shrink-0 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ), {
          duration: 8000,
        });
      }
    };

    // Generate first notification immediately
    generateNotification();

    // Then generate notifications at intervals
    const interval = setInterval(generateNotification, Math.random() * 15000 + 10000); // 10-25 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trending': return Flame;
      case 'contest': return Trophy;
      case 'earning': return DollarSign;
      case 'social': return Heart;
      case 'milestone': return Crown;
      case 'urgent': return Zap;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, urgent = false) => {
    if (urgent) return 'from-red-500 to-pink-500';
    switch (type) {
      case 'trending': return 'from-orange-500 to-red-500';
      case 'contest': return 'from-purple-500 to-blue-500';
      case 'earning': return 'from-green-500 to-emerald-500';
      case 'social': return 'from-pink-500 to-rose-500';
      case 'milestone': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      {/* Floating Notification Bell */}
      <motion.div
        className="fixed top-4 right-4 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="h-6 w-6 text-purple-600" />
          {notifications.length > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {notifications.length}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-4 z-45 w-80 bg-white rounded-lg shadow-2xl border"
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Live Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No new notifications
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full bg-gradient-to-r ${getNotificationColor(notification.type, notification.urgent)}`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                              {notification.action && (
                                <button
                                  onClick={() => {
                                    notification.action!.onClick();
                                    setShowNotifications(false);
                                  }}
                                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
                                >
                                  {notification.action.label}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveNotifications;