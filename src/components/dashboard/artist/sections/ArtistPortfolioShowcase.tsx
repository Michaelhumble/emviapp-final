
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Heart, Share2, Eye } from 'lucide-react';

const ArtistPortfolioShowcase = () => {
  const portfolioItems = [
    {
      id: 1,
      image: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      title: "Summer Vibes Collection",
      likes: 234,
      views: 1847,
      isNew: true
    },
    {
      id: 2,
      image: "/lovable-uploads/fd96a86c-48b2-4f28-ba97-69d71c651a97.png",
      title: "Elegant Marble Design",
      likes: 189,
      views: 1456,
      isNew: false
    },
    {
      id: 3,
      image: "/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png",
      title: "Custom Floral Art",
      likes: 312,
      views: 2103,
      isNew: false
    },
    {
      id: 4,
      image: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      title: "Minimalist Chic",
      likes: 156,
      views: 923,
      isNew: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl border border-pink-500/30"
          >
            <Camera className="h-6 w-6 text-pink-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white">Portfolio Showcase</h2>
            <p className="text-sm text-gray-400">Your best work</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Upload</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* New Badge */}
              {item.isNew && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  NEW
                </motion.div>
              )}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-pink-400" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-400" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full"
                  >
                    <Share2 className="h-3 w-3" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">5.2K</div>
            <div className="text-xs text-gray-400">Total Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">891</div>
            <div className="text-xs text-gray-400">Total Likes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-xs text-gray-400">Bookings</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistPortfolioShowcase;
