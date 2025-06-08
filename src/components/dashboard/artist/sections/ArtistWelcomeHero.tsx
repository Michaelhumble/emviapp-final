import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, ArrowRight } from 'lucide-react';

const ArtistWelcomeHero = () => {
  const handleGetStarted = () => {
    // Scroll to portfolio section
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-3xl p-8 lg:p-12 border border-purple-100 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Sparkles className="h-8 w-8 text-purple-500" />
          <div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900">
              EmviApp Artist Dashboard
            </h2>
            <p className="text-gray-600 font-inter">
              Chào mừng bạn đến với trang quản lý
            </p>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="text-right">
          <h3 className="text-xl font-playfair font-semibold text-purple-700">
            Chào buổi sáng, Sarah!
          </h3>
          <p className="text-gray-600 font-inter">
            Bạn có 3 lịch hẹn mới hôm nay
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Chào mừng đến với
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Empire của bạn ✨
              </span>
            </h1>
            <p className="text-xl text-gray-700 font-inter leading-relaxed">
              Welcome to your beauty empire! 
              <span className="text-purple-600 font-medium"> Bạn đang xây dựng một thương hiệu tuyệt vời!</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
              <Crown className="h-6 w-6 text-emerald-600" />
              <span className="text-emerald-800 font-inter font-medium">
                🇻🇳 Top 15% artists in Ho Chi Minh City
              </span>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-blue-800 font-inter font-medium">
                💎 Premium profile views increased 340% this month
              </span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-inter font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            Bắt Đầu Ngay
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Right Content - Stats Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-playfair font-bold text-gray-900 mb-4">
              📈 Your Growth Today
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">+7</div>
                <div className="text-sm text-gray-600">New views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">+3</div>
                <div className="text-sm text-gray-600">Bookings</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">🔥 Trending</div>
              <p className="text-orange-800 font-inter">
                Your nail art style is viral in District 1! 
                <span className="font-bold"> 127 artists</span> want to learn from you.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
