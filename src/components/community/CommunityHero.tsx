
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles } from 'lucide-react';

const CommunityHero = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <Users className="h-6 w-6 text-purple-500" />
            <Sparkles className="h-6 w-6 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
            Welcome to Our Community
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Where beauty professionals connect, grow, and thrive together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            EmviApp isn't just a platform—it's a movement. We're building something beautiful 
            for the beauty industry, where authentic connections matter more than algorithms, 
            and where every artist, salon owner, and professional has a voice that's heard. 
            Join us in shaping the future of beauty hiring, one genuine connection at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHero;
