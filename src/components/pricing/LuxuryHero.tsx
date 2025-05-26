
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, CheckCircle } from 'lucide-react';

const LuxuryHero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Luxury Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>
      
      <div className="relative z-10 text-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <motion.h1 
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-gray-900">Supercharge Your</span>
            <motion.span 
              className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Salon's Success
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Choose your plan and unlock elite visibility, real bookings, and a proven growth engine—
            <span className="font-semibold text-gray-800">risk-free, with zero hidden fees.</span>
          </motion.p>
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-center gap-8 mt-12"
          >
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-2 bg-green-100 rounded-full">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium">Secure PCI-compliant checkout</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-2 bg-purple-100 rounded-full">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <span className="font-medium">No hidden fees</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-2 bg-blue-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryHero;
