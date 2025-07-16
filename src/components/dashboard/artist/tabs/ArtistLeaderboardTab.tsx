import React from 'react';
import { motion } from 'framer-motion';
import ArtistLeaderboard from '../sections/ArtistLeaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Crown, Award, Zap } from 'lucide-react';

const ArtistLeaderboardTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">#3</div>
            <div className="text-sm text-muted-foreground">Local Rank</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Crown className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">Gold</div>
            <div className="text-sm text-muted-foreground">Tier Status</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">847</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistLeaderboard />
        </CardContent>
      </Card>

      {/* Achievement System */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="p-6 text-center">
          <Crown className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="text-lg font-semibold mb-2">Next Achievement</h3>
          <p className="text-muted-foreground mb-4">
            Complete 5 more bookings to unlock "Rising Star" badge
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="text-sm text-amber-600 font-medium mt-2">
            75% Complete
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistLeaderboardTab;