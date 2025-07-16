import React from 'react';
import { motion } from 'framer-motion';
import ArtistFeatureVoting from '../sections/ArtistFeatureVoting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Users, TrendingUp, MessageSquare } from 'lucide-react';

const ArtistFeatureVotingTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Voting Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Vote className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-muted-foreground">Votes Cast</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">1.2K</div>
            <div className="text-sm text-muted-foreground">Community</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">89%</div>
            <div className="text-sm text-muted-foreground">Influence</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">47</div>
            <div className="text-sm text-muted-foreground">Suggestions</div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Voting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Shape EmviApp's Future
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistFeatureVoting />
        </CardContent>
      </Card>

      {/* Community Impact */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
          <p className="text-muted-foreground mb-4">
            Your voice matters! Help us build features that artists actually need.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-600">Top Voted Features</div>
              <div className="text-muted-foreground">Advanced scheduling, Portfolio templates</div>
            </div>
            <div>
              <div className="font-semibold text-indigo-600">Your Impact</div>
              <div className="text-muted-foreground">High influence voter</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistFeatureVotingTab;