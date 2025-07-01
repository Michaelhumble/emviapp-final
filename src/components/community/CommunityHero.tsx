
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityHero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-90" />
      <div className="absolute inset-0 bg-black opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl animate-bounce" />
      
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Users className="h-8 w-8" />
            <MessageCircle className="h-6 w-6 text-yellow-300" />
            <Eye className="h-6 w-6 text-pink-300" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Where Beauty Pros
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Connect & Thrive
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of beauty professionals sharing their journey, celebrating wins, 
            and building the future of beauty together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-8 py-3 text-lg"
            >
              Ask a Question
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg"
            >
              Browse All Q&As
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHero;
