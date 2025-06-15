
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <Users className="mr-2 h-4 w-4" />
              12,847 Active Members
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-['Playfair_Display']"
          >
            Where Beauty
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Professionals{" "}
            </span>
            Connect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-['Inter']"
          >
            Join the most trusted community of nail artists, stylists, and beauty entrepreneurs 
            sharing real experiences, building careers, and supporting each other's success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Share Your Story
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg font-semibold"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask the Community
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center space-x-8 text-sm text-gray-500"
          >
            <div className="flex items-center">
              <Award className="mr-1 h-4 w-4 text-yellow-500" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-blue-500" />
              <span>Real Success Stories</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4 text-green-500" />
              <span>Active Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
