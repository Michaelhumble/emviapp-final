import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Crown, 
  Calendar, 
  Users, 
  Star,
  TrendingUp,
  Bell,
  Plus,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface FloatingAction {
  id: string;
  icon: any;
  label: string;
  action: () => void;
  gradient: string;
  urgent?: boolean;
}

export const PremiumMobileExperience: React.FC = () => {
  const { userProfile } = useAuth();
  const [showFOMO, setShowFOMO] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(1240);
  const [liveBookings, setLiveBookings] = useState(3);

  useEffect(() => {
    // FOMO triggers
    const fomoInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowFOMO(true);
        setTimeout(() => setShowFOMO(false), 5000);
      }
    }, 10000);

    // Live updates
    const updateInterval = setInterval(() => {
      setTodayEarnings(prev => prev + Math.floor(Math.random() * 50));
      if (Math.random() > 0.8) {
        setLiveBookings(prev => prev + 1);
        triggerBookingAlert();
      }
    }, 20000);

    return () => {
      clearInterval(fomoInterval);
      clearInterval(updateInterval);
    };
  }, []);

  const triggerBookingAlert = () => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    
    toast.success('🎉 New booking received!', {
      description: 'Premium client just booked a VIP service',
      action: {
        label: 'View',
        onClick: () => console.log('Navigate to booking')
      }
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const floatingActions: FloatingAction[] = [
    {
      id: 'quick-book',
      icon: Calendar,
      label: 'Quick Book',
      action: () => toast.info('Opening quick booking...'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'add-staff',
      icon: Plus,
      label: 'Add Staff',
      action: () => toast.info('Adding team member...'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'earnings',
      icon: DollarSign,
      label: 'Earnings',
      action: () => triggerEarningsGesture(),
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Alerts',
      action: () => toast.info('Checking notifications...'),
      gradient: 'from-orange-500 to-red-500',
      urgent: true
    }
  ];

  const triggerEarningsGesture = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4']
    });
    toast.success(`💰 Today's earnings: $${todayEarnings.toLocaleString()}!`);
  };

  const handleSwipeGesture = (direction: 'left' | 'right' | 'up' | 'down') => {
    switch (direction) {
      case 'up':
        triggerEarningsGesture();
        break;
      case 'right':
        toast.info('📊 Opening analytics...');
        break;
      case 'left':
        toast.info('📅 Opening calendar...');
        break;
      case 'down':
        toast.info('👥 Opening team management...');
        break;
    }
  };

  return (
    <div className="relative">
      {/* FOMO Notification */}
      {showFOMO && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 left-4 right-4 z-50 md:hidden"
        >
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">🔥 TRENDING NOW</p>
                    <p className="text-xs opacity-90">12 clients viewing your salon</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowFOMO(false)}
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Live Stats Banner */}
      <div className="fixed bottom-20 left-4 right-4 z-40 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-sm text-white rounded-xl p-3 border border-white/20"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live: {liveBookings} bookings today</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span>${todayEarnings.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <div className="flex flex-col gap-3">
          {floatingActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="sm"
                className={`
                  relative w-14 h-14 rounded-full bg-gradient-to-r ${action.gradient} 
                  shadow-xl border-2 border-white/30 backdrop-blur-sm
                  hover:shadow-2xl transition-all duration-300
                `}
                onClick={action.action}
              >
                <action.icon className="h-6 w-6 text-white" />
                
                {action.urgent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                )}
              </Button>
            </motion.div>
          ))}
          
          {/* Main Premium Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="
                w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 
                shadow-2xl border-4 border-yellow-300/50 relative overflow-hidden
                hover:from-yellow-500 hover:to-orange-600 transition-all duration-300
              "
              onClick={() => {
                triggerEarningsGesture();
                toast.success('👑 Premium features activated!');
              }}
            >
              <Crown className="h-8 w-8 text-white" />
              
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-orange-500/50 animate-pulse"></div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Swipe Gesture Hints */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
        >
          👆 Swipe for quick actions
        </motion.div>
      </div>

      {/* Touch gesture area */}
      <div 
        className="fixed inset-0 z-10 md:hidden pointer-events-auto"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          const startY = touch.clientY;
          
          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endTouch = endEvent.changedTouches[0];
            const deltaX = endTouch.clientX - startX;
            const deltaY = endTouch.clientY - startY;
            const threshold = 50;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              if (deltaX > threshold) {
                handleSwipeGesture('right');
              } else if (deltaX < -threshold) {
                handleSwipeGesture('left');
              }
            } else {
              if (deltaY > threshold) {
                handleSwipeGesture('down');
              } else if (deltaY < -threshold) {
                handleSwipeGesture('up');
              }
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
          };
          
          document.addEventListener('touchend', handleTouchEnd);
        }}
      />
    </div>
  );
};