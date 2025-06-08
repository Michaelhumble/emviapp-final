
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Heart, Share2, X } from 'lucide-react';

const ArtistPortfolioShowcase = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Real sample portfolio images for beauty/nail/hair work
  const portfolioImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
      title: "French Manicure Perfection",
      likes: 234,
      views: 1890
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1562141960-e7d2e38c08e6?w=400",
      title: "Nail Art Design",
      likes: 187,
      views: 1456
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400",
      title: "Color Blend Nails",
      likes: 312,
      views: 2134
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1588467850691-3c4659b71bc6?w=400",
      title: "Glamour Set",
      likes: 289,
      views: 1967
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Portfolio Showcase</h2>
          <p className="text-gray-600 font-inter">Your best work that wins clients</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-inter font-medium"
        >
          <Plus className="h-5 w-5" />
          Add New Work
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {portfolioImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            onClick={() => setSelectedImage(image.id)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-inter font-medium text-sm mb-2 truncate">
                  {image.title}
                </h3>
                <div className="flex items-center justify-between text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{image.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{image.views}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 bg-white/20 rounded-full"
                  >
                    <Share2 className="h-3 w-3" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={portfolioImages.find(img => img.id === selectedImage)?.url}
                alt={portfolioImages.find(img => img.id === selectedImage)?.title}
                className="w-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6 text-center"
      >
        <div className="text-lg font-playfair font-bold text-gray-900 mb-2">
          📸 Show off your artistry
        </div>
        <div className="text-sm text-gray-600 font-inter mb-4">
          Artists with complete portfolios get 3x more bookings
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-inter font-medium"
        >
          Complete Portfolio
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ArtistPortfolioShowcase;
