import React from 'react';
import { motion } from 'framer-motion';
import ArtistInstagramPortfolio from '../sections/ArtistInstagramPortfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Palette, TrendingUp, Eye, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const ArtistPortfolioTab = () => {
  const { userProfile } = useAuth();
  
  // Mock engagement stats - replace with real data
  const stats = {
    photos: 12,
    totalViews: 15420,
    totalLikes: 1247,
    uploadsThisWeek: 3
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Enhanced Portfolio Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center card-luxury bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <Camera className="h-10 w-10 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-purple-700">{stats.photos}</div>
              <div className="text-sm font-medium text-purple-600">Masterpieces</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center card-luxury bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <Eye className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold text-blue-700">{stats.totalViews.toLocaleString()}</div>
              <div className="text-sm font-medium text-blue-600">Portfolio Views</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="text-center card-luxury bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-6">
              <Heart className="h-10 w-10 mx-auto mb-3 text-pink-600" />
              <div className="text-3xl font-bold text-pink-700">{stats.totalLikes.toLocaleString()}</div>
              <div className="text-sm font-medium text-pink-600">Total Likes</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="text-center card-luxury bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold text-green-700">{stats.uploadsThisWeek}</div>
              <div className="text-sm font-medium text-green-600">This Week</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Instagram-Style Portfolio */}
      <ArtistInstagramPortfolio />
    </motion.div>
  );
};

export default ArtistPortfolioTab;