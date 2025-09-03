import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';
import PremiumBackground from './PremiumBackground';
import { prefersReducedMotion } from '@/utils/featureFlags';

const AffiliateHero = () => {
  const reduced = prefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-24 md:py-32 min-h-screen">
      <PremiumBackground className="absolute inset-0 -z-10 pointer-events-none" />
      
      {/* Premium gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/40 -z-5"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-16">
          {/* Ultra-Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-lg tracking-wide">
              💰 Elite Affiliate Program • Invitation Only
            </span>
          </motion.div>

          {/* Massive Premium Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-center">
              <span className="block text-white mb-4">Earn</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                $50,000+
              </span>
              <span className="block text-white/90 text-4xl md:text-5xl lg:text-6xl font-medium">
                monthly with beauty's
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                fastest platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Join an exclusive network of top-tier affiliates earning life-changing commissions. 
              <span className="block mt-2 font-medium text-emerald-300">
                30% recurring • Real-time payouts • Enterprise support
              </span>
            </p>
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 min-w-[240px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Apply Now
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
              </span>
            </motion.button>
            
            <button className="px-10 py-6 border-2 border-white/30 bg-white/5 backdrop-blur-xl text-white font-semibold text-xl rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]">
              View Earnings
            </button>
          </motion.div>

          {/* Trust Indicators - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-12 text-white/70"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <span className="font-medium">Stripe Enterprise</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </div>
              <span className="font-medium">Real-time Analytics</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <span className="font-medium">24/7 Premium Support</span>
            </div>
          </motion.div>
        </div>

        {/* Enterprise Stats - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24"
        >
          {[
            { number: '30%', label: 'Commission Rate', sublabel: 'Recurring Revenue', gradient: 'from-emerald-400 to-teal-400' },
            { number: '500+', label: 'Elite Partners', sublabel: 'Earning $10K+/mo', gradient: 'from-blue-400 to-indigo-400' },
            { number: '$2.5M+', label: 'Paid Out', sublabel: 'Last 12 months', gradient: 'from-purple-400 to-pink-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 cursor-pointer"
            >
              <div className="text-center space-y-4">
                <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-white transition-colors">
                  {stat.label}
                </div>
                <div className="text-white/60 font-medium">
                  {stat.sublabel}
                </div>
              </div>
              
              {/* Subtle glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 -z-10`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateHero;