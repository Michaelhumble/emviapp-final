
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Camera, ExternalLink, Heart } from 'lucide-react';

const ArtistPortfolioShowcase = () => {
  // Sample portfolio items with beautiful nail/beauty art
  const portfolioItems = [
    {
      id: 1,
      image: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
      title: 'Elegant French Tips',
      likes: 247
    },
    {
      id: 2,
      image: '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png',
      title: 'Artistic Nail Design',
      likes: 189
    },
    {
      id: 3,
      image: '/lovable-uploads/f9c0a9f2-e45c-4c98-8413-6fd84624a578.png',
      title: 'Creative Patterns',
      likes: 312
    },
    {
      id: 4,
      image: '/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png',
      title: 'Bold Color Mix',
      likes: 156
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Your Portfolio</h2>
          <p className="text-gray-600 font-inter">Showcase your best work to attract clients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-inter font-medium flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          Add Work
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                >
                  <ExternalLink className="h-4 w-4 text-gray-700" />
                </motion.button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-playfair font-semibold text-gray-900 mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-inter">{item.likes} likes</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty slots with FOMO messaging */}
        {[...Array(2)].map((_, index) => (
          <motion.div
            key={`empty-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (portfolioItems.length + index) * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl aspect-square flex flex-col items-center justify-center hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow"
            >
              <Plus className="h-6 w-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </motion.div>
            <p className="text-sm font-inter text-gray-600 group-hover:text-purple-700 mt-3 text-center px-4">
              {index === 0 ? "Upload 3 more photos to unlock Pro features!" : "Show your best work"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Portfolio CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="font-playfair font-bold text-gray-900 mb-1">💎 Portfolio Power-Up</h3>
            <p className="text-sm text-gray-600 font-inter">
              Artists with 10+ portfolio photos get 3x more bookings on average
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-inter font-medium"
          >
            Upload More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistPortfolioShowcase;
