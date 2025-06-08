
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, TrendingUp, Users, Calendar, Share2 } from 'lucide-react';
import { useAuth } from '@/context/auth';

const ArtistWelcomeHero = () => {
  const { userProfile } = useAuth();
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const messages = {
    en: {
      welcome: "Welcome back, Superstar!",
      subtitle: "Your empire is growing beautifully",
      trending: "🔥 Trending now! 7 new clients this week!",
      status: "Top 1% in your city",
      cta: "Share Your Success"
    },
    vi: {
      welcome: "Chào mừng trở lại, Siêu sao!",
      subtitle: "Đế chế của bạn đang phát triển tuyệt vời",
      trending: "🔥 Đang hot! 7 khách hàng mới tuần này!",
      status: "Top 1% trong thành phố",
      cta: "Chia sẻ thành công"
    }
  };

  const currentMsg = messages[language];
  const displayName = userProfile?.full_name || "Superstar Artist";

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.origin + '/artist/' + (userProfile?.id || 'profile'));
    // Show toast or modal for sharing
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 text-white shadow-2xl"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -40, -20],
              x: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-300/60" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Language Toggle */}
        <div className="absolute top-0 right-0">
          <button
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
          >
            {language === 'en' ? 'EN' : 'VI'}
          </button>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-yellow-400/20 rounded-xl border border-yellow-400/30">
              <Crown className="h-8 w-8 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{currentMsg.welcome.replace('Superstar', displayName)}</h1>
              <p className="text-purple-100 text-lg">{currentMsg.subtitle}</p>
            </div>
          </motion.div>

          {/* Status & Trending */}
          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full backdrop-blur-sm border border-white/20 w-fit"
            >
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-sm font-medium">{currentMsg.status}</span>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="px-4 py-2 bg-orange-400/20 rounded-full backdrop-blur-sm border border-orange-400/30 w-fit"
            >
              <span className="text-sm font-medium">{currentMsg.trending}</span>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
          >
            <div className="text-2xl font-bold">$3,240</div>
            <div className="text-xs text-purple-200">This Month</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
          >
            <div className="text-2xl font-bold">127</div>
            <div className="text-xs text-purple-200">Happy Clients</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
          >
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-xs text-purple-200">Rating</div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShareProfile}
          className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-xl font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          {currentMsg.cta}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
