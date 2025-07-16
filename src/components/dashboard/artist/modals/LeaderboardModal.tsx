import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, Star, TrendingUp, Award, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
}

const LeaderboardModal = ({ open, onClose }: LeaderboardModalProps) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [category, setCategory] = useState<'overall' | 'bookings' | 'reviews' | 'earnings'>('overall');

  // Mock leaderboard data - replace with real data
  const leaderboardData = {
    overall: [
      { rank: 1, name: "You", points: 2847, avatar: "YU", change: "+12", isUser: true, badge: "Crown", earnings: "$3,240", bookings: 89, rating: 4.9 },
      { rank: 2, name: "Elite Professional", points: 2634, avatar: "EP", change: "+8", isUser: false, badge: "Gold", earnings: "$2,890", bookings: 76, rating: 4.8 },
      { rank: 3, name: "Master Artist", points: 2240, avatar: "MA", change: "-2", isUser: false, badge: "Silver", earnings: "$2,450", bookings: 65, rating: 4.7 },
      { rank: 4, name: "Creative Genius", points: 2100, avatar: "CG", change: "+5", isUser: false, badge: "Bronze", earnings: "$2,100", bookings: 58, rating: 4.8 },
      { rank: 5, name: "Style Maven", points: 1980, avatar: "SM", change: "+3", isUser: false, badge: "Bronze", earnings: "$1,950", bookings: 52, rating: 4.6 }
    ]
  };

  const achievements = [
    {
      id: 'top-rated',
      title: 'Top Rated Artist',
      description: 'Maintain 4.8+ rating for 3 months',
      icon: Star,
      earned: true,
      progress: 100,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'booking-master',
      title: 'Booking Master',
      description: 'Complete 100 bookings',
      icon: Calendar,
      earned: true,
      progress: 100,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'community-leader',
      title: 'Community Leader',
      description: 'Be in top 3 for consecutive months',
      icon: Users,
      earned: false,
      progress: 75,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'revenue-champion',
      title: 'Revenue Champion',
      description: 'Earn $5,000+ in a month',
      icon: Trophy,
      earned: false,
      progress: 65,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const getBadgeIcon = (rank: number) => {
    if (rank === 1) return Crown;
    if (rank === 2) return Medal;
    if (rank === 3) return Trophy;
    return Award;
  };

  const getBadgeColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-500";
    if (rank === 3) return "text-orange-500";
    return "text-blue-500";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Leaderboard & Achievements
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Time and Category Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <Button
                variant={timeframe === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe('week')}
              >
                This Week
              </Button>
              <Button
                variant={timeframe === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe('month')}
              >
                This Month
              </Button>
              <Button
                variant={timeframe === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe('all')}
              >
                All Time
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={category === 'overall' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory('overall')}
              >
                Overall
              </Button>
              <Button
                variant={category === 'bookings' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory('bookings')}
              >
                Bookings
              </Button>
              <Button
                variant={category === 'reviews' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory('reviews')}
              >
                Reviews
              </Button>
              <Button
                variant={category === 'earnings' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory('earnings')}
              >
                Earnings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Top Artists This {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </h3>
                  <div className="space-y-3">
                    {leaderboardData.overall.map((artist, index) => {
                      const BadgeIcon = getBadgeIcon(artist.rank);
                      return (
                        <motion.div
                          key={artist.rank}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            artist.isUser 
                              ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 ring-2 ring-purple-300' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            artist.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            artist.rank === 2 ? 'bg-gray-100 text-gray-700' :
                            artist.rank === 3 ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {artist.rank}
                          </div>
                          
                          <BadgeIcon className={`h-5 w-5 ${getBadgeColor(artist.rank)}`} />
                          
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {artist.avatar}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{artist.name}</div>
                              {artist.isUser && (
                                <Badge className="bg-purple-500 text-white">You</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span>{artist.points.toLocaleString()} pts</span>
                              <span>⭐ {artist.rating}</span>
                              <span>📅 {artist.bookings}</span>
                              <span>💰 {artist.earnings}</span>
                            </div>
                          </div>
                          
                          <div className={`text-sm font-medium ${
                            artist.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {artist.change}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Your Achievements
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-xl border-2 ${
                            achievement.earned 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.bgColor}`}>
                              <IconComponent className={`h-5 w-5 ${achievement.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                                {achievement.earned && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                    Earned
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              {!achievement.earned && (
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${achievement.progress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2">Fantastic Performance!</h3>
              <p className="text-muted-foreground mb-4">
                You're ranked #1 this month with incredible growth. Keep up the amazing work!
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-bold text-purple-600">+156</div>
                  <div className="text-muted-foreground">Points This Week</div>
                </div>
                <div>
                  <div className="font-bold text-green-600">+12</div>
                  <div className="text-muted-foreground">Rank Change</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">89%</div>
                  <div className="text-muted-foreground">Consistency Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;