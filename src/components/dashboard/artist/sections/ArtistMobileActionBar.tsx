import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Image, 
  Star, 
  Settings, 
  Calendar,
  Share2,
  Plus,
  Heart
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileActionBarProps {
  onAction: (action: string) => void;
  unreadNotifications?: number;
}

const ArtistMobileActionBar = ({ onAction, unreadNotifications = 0 }: MobileActionBarProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const actions = [
    { 
      id: 'portfolio', 
      icon: Camera, 
      label: 'Portfolio',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'bookings', 
      icon: Calendar, 
      label: 'Bookings',
      gradient: 'from-blue-500 to-cyan-500',
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    { 
      id: 'reviews', 
      icon: Star, 
      label: 'Reviews',
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'share', 
      icon: Share2, 
      label: 'Share',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      gradient: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 nav-bottom-glow"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <motion.div
              key={action.id}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 p-3 h-auto min-w-[64px] relative"
                onClick={() => onAction(action.id)}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">{action.label}</span>
                
                {/* Notification Badge */}
                {action.badge && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    {action.badge}
                  </Badge>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Add Floating Action Button */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300"
          onClick={() => onAction('upload')}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ArtistMobileActionBar;