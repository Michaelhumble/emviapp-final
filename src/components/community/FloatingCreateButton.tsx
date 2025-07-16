import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Camera, Edit3, HelpCircle, Briefcase, Star, X } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface CreateOption {
  id: string;
  label: string;
  icon: any;
  description: string;
  color: string;
  action: () => void;
}

interface Props {
  onCreatePost: () => void;
  onCreateJob: () => void;
  onAskCommunity: () => void;
  onApplySponsor: () => void;
  className?: string;
}

const FloatingCreateButton: React.FC<Props> = ({
  onCreatePost,
  onCreateJob,
  onAskCommunity,
  onApplySponsor,
  className = ''
}) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const createOptions: CreateOption[] = [
    {
      id: 'post',
      label: 'Post/Story',
      icon: Edit3,
      description: 'Share your thoughts or showcase work',
      color: 'from-blue-500 to-purple-600',
      action: () => {
        onCreatePost();
        setIsExpanded(false);
      }
    },
    {
      id: 'showcase',
      label: 'Showcase Work',
      icon: Camera,
      description: 'Upload photos/videos of your work',
      color: 'from-purple-500 to-pink-600',
      action: () => {
        onCreatePost(); // Same as post but with media focus
        setIsExpanded(false);
      }
    },
    {
      id: 'question',
      label: 'Ask Community',
      icon: HelpCircle,
      description: 'Get help from the community',
      color: 'from-green-500 to-teal-600',
      action: () => {
        onAskCommunity();
        setIsExpanded(false);
      }
    },
    {
      id: 'job',
      label: 'List Job',
      icon: Briefcase,
      description: 'Post a job opportunity',
      color: 'from-orange-500 to-red-600',
      action: () => {
        onCreateJob();
        setIsExpanded(false);
      }
    },
    {
      id: 'sponsor',
      label: 'Apply as Sponsor',
      icon: Star,
      description: 'Join our brand partnership program',
      color: 'from-yellow-500 to-orange-600',
      action: () => {
        onApplySponsor();
        setIsExpanded(false);
      }
    }
  ];

  const handleMainButtonClick = () => {
    if (!user) {
      toast.error('Please sign in to create content');
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option: CreateOption) => {
    if (!user) {
      toast.error('Please sign in to create content');
      return;
    }
    option.action();
  };

  return (
    <>
      {/* Backdrop */}
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

      {/* Floating Button Container */}
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {/* Create Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-20 right-0 space-y-3"
            >
              {createOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="group flex items-center space-x-3 bg-background border border-border rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[280px]"
                    initial={{ opacity: 0, x: 20, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 20, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {option.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="w-6 h-6 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      whileHover={{ x: 2 }}
                    >
                      <div className="w-2 h-2 border-r-2 border-t-2 border-foreground rotate-45 transform" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          onClick={handleMainButtonClick}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl hover:shadow-2xl flex items-center justify-center text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isExpanded ? 45 : 0,
            boxShadow: isExpanded 
              ? "0 20px 40px -10px rgba(59, 130, 246, 0.4)"
              : "0 10px 30px -10px rgba(59, 130, 246, 0.3)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse effect when not expanded */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

    </>
  );
};

export default FloatingCreateButton;