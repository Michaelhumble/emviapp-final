import React from 'react';
import { motion } from 'framer-motion';
import ArtistPortfolioSection from '@/components/portfolio/ArtistPortfolioSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArtistPortfolioTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Camera className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Photos</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">1.2K</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Palette className="h-8 w-8 mx-auto mb-2 text-pink-500" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Likes</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Upload className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Portfolio Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
            <Button variant="outline">
              <Palette className="h-4 w-4 mr-2" />
              Organize Gallery
            </Button>
          </div>
          
          <ArtistPortfolioSection />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistPortfolioTab;