import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatFloatingBadgeProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
  userName?: string;
}

export const ChatFloatingBadge = ({ 
  onClick, 
  hasUnreadMessages = false,
  userName 
}: ChatFloatingBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 z-[1000]"
    >
      <Button
        onClick={onClick}
        className="relative h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 hover:from-amber-500 hover:via-orange-500 hover:to-pink-500 border-2 border-white/20"
        aria-label={`Chat with Sunshine${userName ? ` - Welcome back ${userName}!` : ' AI'}`}
      >
        <div className="relative">
          <Sparkles size={20} className="text-white" />
          {hasUnreadMessages && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white"
            />
          )}
        </div>
        
        {/* Floating sparkles around the badge */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 8, ease: "linear" },
              scale: { repeat: Infinity, duration: 3 }
            }}
            className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-300 rounded-full opacity-60"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 6, ease: "linear" },
              scale: { repeat: Infinity, duration: 4, delay: 1 }
            }}
            className="absolute -bottom-1 -left-2 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-60"
          />
        </div>
      </Button>
    </motion.div>
  );
};