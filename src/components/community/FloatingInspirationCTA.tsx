import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, X, Lightbulb, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';

interface FloatingInspirationCTAProps {
  onTriggerAI: () => void;
  onOpenPostComposer: () => void;
}

const FloatingInspirationCTA: React.FC<FloatingInspirationCTAProps> = ({ 
  onTriggerAI, 
  onOpenPostComposer 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check if user has posted recently (mock logic - in real app, check from database)
    const hasPostedRecently = localStorage.getItem(`user_posted_${user.id}`);
    const dismissedKey = `inspiration_dismissed_${user.id}`;
    const wasDismissed = localStorage.getItem(dismissedKey);

    if (!hasPostedRecently && !wasDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    if (user) {
      localStorage.setItem(`inspiration_dismissed_${user.id}`, 'true');
    }
  };

  const handleGetInspiration = () => {
    onTriggerAI();
    setIsVisible(false);
  };

  const handleStartPosting = () => {
    onOpenPostComposer();
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
      >
        <Card className="w-80 max-w-[calc(100vw-32px)] bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-full">
                  <Lightbulb className="h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
                <span className="font-bold text-sm">Need Inspiration?</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-white/90 text-sm">
                ✨ Get AI-powered beauty tips and post ideas to share with the community!
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleGetInspiration}
                  className="bg-white/20 text-white hover:bg-white/30 border-white/30 flex-1"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Ask AI Expert
                </Button>
                <Button
                  size="sm"
                  onClick={handleStartPosting}
                  className="bg-white text-purple-600 hover:bg-white/90 flex-1"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Start Posting
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-teal-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-white/80 text-xs">
                  Join 10,000+ beauty professionals sharing daily!
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingInspirationCTA;