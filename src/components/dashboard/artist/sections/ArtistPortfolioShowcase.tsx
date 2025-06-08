
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Heart, Share2, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistPortfolioShowcase = () => {
  // Mock portfolio data - in real app this would come from API
  const portfolioItems = [
    {
      id: 1,
      image: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      title: "Luxury French Set",
      likes: 23,
      views: 145
    },
    {
      id: 2,
      image: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png", 
      title: "Gradient Ombré",
      likes: 31,
      views: 198
    },
    {
      id: 3,
      image: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      title: "Crystal Art Design",
      likes: 18,
      views: 89
    },
    {
      id: 4,
      image: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      title: "Minimalist Chic",
      likes: 27,
      views: 156
    }
  ];

  const hasPortfolio = portfolioItems.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            className="text-2xl"
          >
            🎨
          </motion.div>
          <h3 className="text-xl font-bold text-white">Your Showcase</h3>
        </div>
        {hasPortfolio && (
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        )}
      </div>

      {hasPortfolio ? (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <div className="p-6">
            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-sm font-medium mb-2 truncate">
                        {item.title}
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {item.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views}
                          </div>
                        </div>
                        <Share2 className="h-3 w-3" />
                      </div>
                    </div>
                  </div>

                  {/* Floating action */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-white"
                >
                  {portfolioItems.length}
                </motion.div>
                <div className="text-xs text-gray-300">Works</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-purple-300"
                >
                  588
                </motion.div>
                <div className="text-xs text-gray-300">Total Views</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-pink-300"
                >
                  99
                </motion.div>
                <div className="text-xs text-gray-300">Total Likes</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Work
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* FOMO Message */}
            <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
              <div className="text-sm text-green-200 text-center">
                🔥 <span className="font-semibold text-white">Artists with 4+ photos get 67% more bookings!</span>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Showcase Your Magic! ✨
              </h4>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Upload your best work and watch clients fall in love! Artists with portfolios get <strong className="text-white">5x more bookings</strong>.
              </p>
            </motion.div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 mb-4">
              <Plus className="h-5 w-5 mr-2" />
              Upload Your First Work
            </Button>
            
            <div className="text-xs text-purple-200">
              📸 Tip: Photos with good lighting get 3x more views!
            </div>

            {/* Social Proof */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-sm text-purple-100">
                🚀 <span className="font-semibold text-white">Sarah uploaded 3 photos yesterday and got 12 new followers!</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistPortfolioShowcase;
