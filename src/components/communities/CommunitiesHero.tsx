
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunitiesHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 py-24">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <Globe className="mr-2 h-4 w-4" />
              47,000+ Beauty Professionals Connected
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-playfair"
          >
            Where the Beauty Industry
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Gathers, Grows & Inspires
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
          >
            Join exclusive communities, share your journey, learn from the best, 
            and build the career you've always dreamed of
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Create Your Community
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Users className="mr-2 h-5 w-5" />
              Explore Communities
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
          >
            <div>
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="text-white/80 text-sm">Active Communities</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$12.5M</div>
              <div className="text-white/80 text-sm">Members Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesHero;
