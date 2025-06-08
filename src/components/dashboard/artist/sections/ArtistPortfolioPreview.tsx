
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Heart, Share } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useArtistPortfolio } from '@/hooks/useArtistPortfolio';

const ArtistPortfolioPreview = () => {
  const { portfolio, isLoading } = useArtistPortfolio();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const hasPortfolio = portfolio && portfolio.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-gray-800">Your Showcase 🎨</h3>
        {hasPortfolio && (
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        )}
      </div>

      {hasPortfolio ? (
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="p-4">
            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {portfolio.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200">
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-xs font-medium truncate">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{portfolio.length}</div>
                <div className="text-xs text-gray-600">Works</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-600">247</div>
                <div className="text-xs text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">43</div>
                <div className="text-xs text-gray-600">Likes</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Work
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Showcase Your Art! 🎨
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Upload your best work and watch clients fall in love! Artists with portfolios get <strong>5x more bookings</strong>. ✨
              </p>
            </motion.div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Upload Your First Work
              </Button>
              
              <div className="text-xs text-gray-500">
                📸 Tip: Photos with good lighting get 3x more views!
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-purple-100">
              <div className="text-xs text-purple-700 font-medium">
                🔥 Sarah uploaded 3 photos yesterday and got 12 new followers!
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistPortfolioPreview;
