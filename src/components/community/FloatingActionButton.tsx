import React, { useState } from 'react';
import { Plus, Camera, Video, MessageSquare, Hash, Star, Sparkles, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface FABProps {
  onCreatePost: (type: string) => void;
  className?: string;
}

const FloatingActionButton: React.FC<FABProps> = ({ onCreatePost, className = '' }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const postTypes = [
    { type: 'story', icon: Edit3, label: 'Story', color: 'from-blue-500 to-cyan-500' },
    { type: 'showcase', icon: Camera, label: 'Showcase', color: 'from-purple-500 to-pink-500' },
    { type: 'tip', icon: Sparkles, label: 'Pro Tip', color: 'from-yellow-500 to-orange-500' },
    { type: 'question', icon: Hash, label: 'Question', color: 'from-green-500 to-emerald-500' },
    { type: 'video', icon: Video, label: 'Video', color: 'from-red-500 to-pink-500' },
  ];

  const handleMainButtonClick = () => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }
    // Direct action: open post modal immediately
    onCreatePost('story');
  };

  const handlePostTypeSelect = (type: string) => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }
    setIsExpanded(false);
    onCreatePost(type);
  };

  return (
    <>
      {/* Backdrop for expanded menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {/* Post Type Options - Only show on long press/right click */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 space-y-2 min-w-[240px]"
            >
              {postTypes.map((postType, index) => {
                const IconComponent = postType.icon;
                return (
                  <motion.div
                    key={postType.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handlePostTypeSelect(postType.type);
                        toast.success(`Creating ${postType.label.toLowerCase()}... ✨`, {
                          description: 'Let your creativity shine!'
                        });
                      }}
                      className="w-full justify-start gap-3 px-4 py-6 text-left bg-background/95 backdrop-blur-lg border border-border/50 hover:bg-accent transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-primary/20 rounded-xl shadow-xl"
                      aria-label={`Create ${postType.label}`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${postType.color} shadow-lg`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-foreground">{postType.label}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
        >
          <Button
            onClick={handleMainButtonClick}
            onMouseDown={(e) => {
              // Long press for options menu
              const timeoutId = setTimeout(() => {
                setIsExpanded(true);
              }, 500);
              
              const handleMouseUp = () => {
                clearTimeout(timeoutId);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mouseup', handleMouseUp);
            }}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 focus:ring-4 focus:ring-primary/30 focus:outline-none relative overflow-hidden group"
            size="icon"
            aria-label="Create new post"
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Plus className="h-6 w-6 text-white" />
            </motion.div>

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </Button>
        </motion.div>

        {/* Floating hint text */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-lg border border-border/50 rounded-full px-4 py-2 shadow-lg pointer-events-none"
            >
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                Create Post
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingActionButton;