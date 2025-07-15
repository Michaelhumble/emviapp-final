import React, { useState } from 'react';
import { Plus, Camera, Video, MessageSquare, Hash, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface FABProps {
  onCreatePost: (type: string) => void;
  className?: string;
}

const FloatingActionButton: React.FC<FABProps> = ({ onCreatePost, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const postTypes = [
    { type: 'story', icon: Camera, label: 'Story', color: 'from-blue-500 to-cyan-500' },
    { type: 'tip', icon: Sparkles, label: 'Pro Tip', color: 'from-purple-500 to-pink-500' },
    { type: 'showcase', icon: Star, label: 'Showcase', color: 'from-yellow-500 to-orange-500' },
    { type: 'question', icon: Hash, label: 'Question', color: 'from-green-500 to-emerald-500' },
    { type: 'video', icon: Video, label: 'Video', color: 'from-red-500 to-pink-500' },
  ];

  const handlePostTypeSelect = (type: string) => {
    setIsExpanded(false);
    onCreatePost(type);
  };

  return (
    <div className={`fixed bottom-20 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
              <CardContent className="p-2">
                <div className="space-y-1">
                  {postTypes.map((postType, index) => {
                    const IconComponent = postType.icon;
                    return (
                      <motion.div
                        key={postType.type}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant="ghost"
                          onClick={() => handlePostTypeSelect(postType.type)}
                          className="w-full justify-start gap-3 px-3 py-6 text-left hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${postType.color}`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700">{postType.label}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 border-0"
          size="icon"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6 text-white" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;