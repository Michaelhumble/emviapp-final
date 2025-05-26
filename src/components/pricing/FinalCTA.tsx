
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Star, Diamond } from 'lucide-react';

const FinalCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="relative z-10 text-center py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-bold font-playfair text-gray-900 leading-tight">
            Ready to Transform Your 
            <span className="block bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Salon's Future?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Join thousands of salon owners who've already unlocked their potential. 
            Your next breakthrough is just one click away.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 my-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium">30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Diamond className="h-5 w-5 text-cyan-500" />
              <span className="font-medium">Premium Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Choose Your Plan Now
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-700 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Talk to Sales
            </Button>
          </div>

          {/* Final Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 mt-6"
          >
            Trusted by over 10,000+ beauty professionals worldwide
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
