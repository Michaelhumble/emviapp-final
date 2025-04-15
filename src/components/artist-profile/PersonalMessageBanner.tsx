
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Heart, Sparkles } from 'lucide-react';

interface PersonalMessageBannerProps {
  message?: string;
  artistName?: string;
}

const PersonalMessageBanner: React.FC<PersonalMessageBannerProps> = ({ 
  message = "Thank you for visiting my profile! I'm passionate about making you look and feel your absolute best. I can't wait to create something beautiful together!",
  artistName = "Your Artist"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        delay: 0.3 
      }}
    >
      <Card className="border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-white p-2 shadow-sm">
              <Heart className="h-5 w-5 text-pink-500" />
            </div>
            
            <div>
              <motion.p 
                className="text-gray-700 italic mb-2 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-3xl text-purple-300 absolute -left-4 -top-2">"</span>
                {message}
                <span className="text-3xl text-purple-300">"</span>
              </motion.p>
              
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-sm font-medium text-purple-700">
                  {artistName}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalMessageBanner;
