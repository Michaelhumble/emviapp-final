
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Eye, TrendingUp, Plus } from 'lucide-react';

const ArtistPortfolioPreview = () => {
  // Mock check for portfolio - in real app, this would come from data
  const hasPortfolio = false; // Set to true to show portfolio, false to show FOMO card

  if (!hasPortfolio) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4"
          >
            <Camera className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Your Portfolio is Your Superpower! 🎨
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            Artists with portfolios get <span className="font-bold text-purple-600">5x more bookings</span> and earn <span className="font-bold text-green-600">$2,000+ more per month</span>. Show off your amazing work!
          </p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-2 border-dashed border-purple-300">
                <Plus className="h-6 w-6 text-purple-400" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold">
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First Photos
            </Button>
            
            <div className="text-xs text-gray-500 bg-white/60 p-3 rounded-lg">
              💡 <strong>Pro Tip:</strong> Upload 6+ high-quality photos of your best work to unlock premium features!
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Portfolio exists - show preview
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Your Portfolio ✨</CardTitle>
              <p className="text-sm text-gray-600">Showcasing your amazing work</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-lg bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-bold text-indigo-600">1,247</p>
            <p className="text-xs text-gray-600">Views</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">89</p>
            <p className="text-xs text-gray-600">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">23</p>
            <p className="text-xs text-gray-600">Bookings</p>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Photos
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioPreview;
