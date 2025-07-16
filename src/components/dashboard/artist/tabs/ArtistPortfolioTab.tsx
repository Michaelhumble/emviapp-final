import React from 'react';
import { motion } from 'framer-motion';
import ArtistPortfolioSection from '@/components/portfolio/ArtistPortfolioSection';
import ArtistPortfolioUploader from '@/components/profile/artist/ArtistPortfolioUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const ArtistPortfolioTab = () => {
  const { userProfile } = useAuth();
  const portfolioCount = userProfile?.portfolio_urls?.length || 0;
  
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
            <div className="text-2xl font-bold">{portfolioCount}</div>
            <div className="text-sm text-muted-foreground">Photos</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-sm text-center text-muted-foreground mt-2">Coming Soon</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Palette className="h-8 w-8 mx-auto mb-2 text-pink-500" />
            <div className="text-sm text-center text-muted-foreground mt-2">Coming Soon</div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Upload className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-sm text-center text-muted-foreground mt-2">Coming Soon</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Upload */}
      <ArtistPortfolioUploader />
      
      {/* Portfolio Gallery */}
      <ArtistPortfolioSection />
    </motion.div>
  );
};

export default ArtistPortfolioTab;