
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plus, Eye, Heart, Share, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistPortfolioShowcase = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mock portfolio data - in real app this would come from API
  const portfolioItems = [
    {
      id: 1,
      image: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      title: "Holographic Nails",
      likes: 147,
      views: 892
    },
    {
      id: 2,
      image: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      title: "Galaxy Design",
      likes: 203,
      views: 1247
    },
    {
      id: 3,
      image: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      title: "Chrome Effect",
      likes: 189,
      views: 976
    },
    {
      id: 4,
      image: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      title: "Marble Art",
      likes: 156,
      views: 743
    }
  ];

  const hasPortfolio = portfolioItems.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            🎨
          </motion.div>
          <h3 className="text-lg font-bold text-white">Your Showcase</h3>
        </div>
        {hasPortfolio && (
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        )}
      </div>

      {hasPortfolio ? (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
          <div className="p-6">
            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImage(selectedImage === index ? null : index)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-white text-sm font-semibold truncate mb-1">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/80">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sparkle Animation */}
                  <motion.div
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      repeatDelay: 3
                    }}
                    className="absolute top-2 right-2"
                  >
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-purple-400">{portfolioItems.length}</div>
                <div className="text-xs text-gray-400">Masterpieces</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-pink-400">
                  {portfolioItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Total Views</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-red-400">
                  {portfolioItems.reduce((sum, item) => sum + item.likes, 0)}
                </div>
                <div className="text-xs text-gray-400">Hearts</div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Masterpiece
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
              >
                <Camera className="h-10 w-10 text-white" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-3">
                Time to Go Viral! 🚀
              </h4>
              <p className="text-purple-200 text-sm mb-4 leading-relaxed">
                Artists with portfolios get <span className="font-bold text-yellow-300">5x more bookings</span>! 
                Don't let your talent stay hidden. ✨
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 text-base font-semibold shadow-xl">
                <Plus className="h-5 w-5 mr-2" />
                Upload Your First Masterpiece
              </Button>
              
              <div className="text-xs text-purple-300">
                💡 Pro tip: Photos with good lighting get 3x more views!
              </div>
            </motion.div>

            {/* FOMO Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-white/5 rounded-lg border border-purple-500/20"
            >
              <div className="text-sm text-purple-200 font-medium">
                🔥 Sarah uploaded 3 photos yesterday and gained 47 new followers!
              </div>
            </motion.div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistPortfolioShowcase;
