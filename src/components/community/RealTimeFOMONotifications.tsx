import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Eye, Clock, Users, Zap, Crown, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FOMONotification {
  id: string;
  type: 'booking' | 'battle_movement' | 'vip_activity' | 'collab_opportunity' | 'earnings';
  title: string;
  message: string;
  timestamp: Date;
  urgent: boolean;
  actionText?: string;
  actionLink?: string;
  avatar?: string;
  value?: string;
  timeLeft?: string;
}

interface RealTimeFOMONotificationsProps {
  onNotificationClick?: (notification: FOMONotification) => void;
}

const RealTimeFOMONotifications: React.FC<RealTimeFOMONotificationsProps> = ({
  onNotificationClick
}) => {
  const [notifications, setNotifications] = useState<FOMONotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(true);

  // Simulate real-time notifications
  useEffect(() => {
    const notificationTemplates: Omit<FOMONotification, 'id' | 'timestamp'>[] = [
      {
        type: 'booking',
        title: '🔥 Booking Just Made!',
        message: 'Sarah Chen just booked a $150 nail art session',
        urgent: true,
        actionText: 'Book Now',
        avatar: '/api/placeholder/32/32',
        value: '$150',
        timeLeft: '2 spots left today'
      },
      {
        type: 'battle_movement',
        title: '⚡ Leaderboard Alert!',
        message: 'You dropped to #4 in Nail Art Battle',
        urgent: true,
        actionText: 'Submit Entry',
        timeLeft: '6h left'
      },
      {
        type: 'vip_activity',
        title: '👑 VIP Event Starting',
        message: 'Exclusive masterclass begins in 15 minutes',
        urgent: false,
        actionText: 'Join Now',
        timeLeft: '15m left'
      },
      {
        type: 'collab_opportunity',
        title: '🤝 Collab Request',
        message: 'Top salon wants to collaborate with you',
        urgent: true,
        actionText: 'View Offer',
        value: 'Premium'
      },
      {
        type: 'earnings',
        title: '💰 Payment Received',
        message: 'You earned $85 from recent bookings',
        urgent: false,
        actionText: 'View Earnings',
        value: '$85'
      }
    ];

    const addRandomNotification = () => {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const newNotification: FOMONotification = {
        ...template,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 notifications
    };

    // Add initial notification
    addRandomNotification();

    // Add new notifications every 8-15 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to add notification
        addRandomNotification();
      }
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Zap className="h-4 w-4 text-green-500" />;
      case 'battle_movement': return <Users className="h-4 w-4 text-orange-500" />;
      case 'vip_activity': return <Crown className="h-4 w-4 text-purple-500" />;
      case 'collab_opportunity': return <Gift className="h-4 w-4 text-blue-500" />;
      case 'earnings': return <Zap className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string, urgent: boolean) => {
    if (urgent) return 'from-red-500 to-pink-500';
    switch (type) {
      case 'booking': return 'from-green-500 to-emerald-500';
      case 'battle_movement': return 'from-orange-500 to-yellow-500';
      case 'vip_activity': return 'from-purple-500 to-indigo-500';
      case 'collab_opportunity': return 'from-blue-500 to-cyan-500';
      case 'earnings': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!showNotifications || notifications.length === 0) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowNotifications(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
        >
          <Bell className="h-4 w-4 mr-2" />
          {notifications.length > 0 && (
            <Badge className="bg-red-500 text-white text-xs -mr-1 -mt-1">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          🔴 Live Updates
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotifications(false)}
          className="text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: 100 - index }}
          >
            <Card 
              className={`bg-gradient-to-r ${getNotificationColor(notification.type, notification.urgent)} 
                         border-none shadow-xl backdrop-blur-sm cursor-pointer group hover:scale-105 transition-transform`}
              onClick={() => onNotificationClick?.(notification)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between text-white">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {notification.urgent && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Badge className="bg-white/20 text-white text-xs">
                              URGENT
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      
                      <p className="text-white/90 text-xs mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/80">
                          {notification.avatar && (
                            <img 
                              src={notification.avatar} 
                              alt=""
                              className="w-4 h-4 rounded-full ring-1 ring-white/30"
                            />
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timeLeft || 'Just now'}
                          </span>
                          {notification.value && (
                            <span className="font-semibold text-white">
                              {notification.value}
                            </span>
                          )}
                        </div>
                        
                        {notification.actionText && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 text-xs h-6 px-2"
                          >
                            {notification.actionText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                    className="text-white/60 hover:text-white hover:bg-white/20 h-6 w-6 p-0 flex-shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RealTimeFOMONotifications;