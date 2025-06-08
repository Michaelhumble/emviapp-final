
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Camera, Heart, Eye, Share } from 'lucide-react';

const ArtistPortfolioShowcase = () => {
  const portfolioItems = [
    {
      id: 1,
      image: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
      title: 'French Ombré Perfection',
      likes: 342,
      views: 1247
    },
    {
      id: 2,
      image: '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png',
      title: 'Artistic Floral Design',
      likes: 289,
      views: 956
    },
    {
      id: 3,
      image: '/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png',
      title: 'Bold Color Fusion',
      likes: 425,
      views: 1834
    },
    {
      id: 4,
      image: '/lovable-uploads/f9c0a9f2-e45c-4c98-8413-6fd84624a578.png',
      title: 'Minimalist Elegance',
      likes: 198,
      views: 743
    }
  ];

  const totalLikes = portfolioItems.reduce((sum, item) => sum + item.likes, 0);
  const totalViews = portfolioItems.reduce((sum, item) => sum + item.views, 0);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Your Showcase 🎨</h2>
          <p className="text-lg text-gray-600 font-inter">Your artistry speaks volumes</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Camera className="h-5 w-5" />
          Add Masterpiece
        </motion.button>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">{portfolioItems.length}</div>
          <div className="text-sm text-gray-600 font-inter">Masterpieces</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">{totalLikes.toLocaleString()}</div>
          <div className="text-sm text-gray-600 font-inter">Total Likes</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">{totalViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600 font-inter">Total Views</div>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <Eye className="h-4 w-4 text-gray-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <Share className="h-4 w-4 text-gray-700" />
                </motion.button>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <span className="text-sm font-inter font-medium">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-inter font-medium">{item.views}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-playfair font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-inter">{item.likes} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span className="font-inter">{item.views}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Upload Slots */}
        {[...Array(2)].map((_, index) => (
          <motion.div
            key={`upload-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (portfolioItems.length + index) * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer group"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow mb-3"
            >
              <Plus className="h-8 w-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </motion.div>
            <p className="text-sm font-inter text-gray-600 group-hover:text-purple-700 text-center px-4 font-medium">
              {index === 0 ? "Upload 2 more photos to unlock Pro features!" : "Show your creativity"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FOMO Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border border-yellow-200/50 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="font-playfair font-bold text-gray-900 mb-2 text-lg">🚀 Portfolio Power-Up</h3>
            <p className="text-gray-700 font-inter">
              Artists with 10+ portfolio photos get <strong>5x more bookings</strong> and earn 3x more on average!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-inter font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Upload More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistPortfolioShowcase;
