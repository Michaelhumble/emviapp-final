import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Clock, Zap } from 'lucide-react';

const ChallengeOfTheWeek = () => {
  const currentChallenge = {
    title: 'Winter Nail Art Challenge',
    description: 'Create stunning winter-themed nail designs and share your creativity!',
    prize: '$500 + Feature',
    participants: 847,
    timeLeft: '3 days',
    category: 'Nails',
    difficulty: 'Intermediate',
    emoji: '❄️💅'
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-300" />
            <span className="font-bold text-sm">CHALLENGE OF THE WEEK</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            <Clock className="h-3 w-3 mr-1" />
            {currentChallenge.timeLeft} left
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold mb-1">
              {currentChallenge.emoji} {currentChallenge.title}
            </h3>
            <p className="text-white/90 text-sm">
              {currentChallenge.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{currentChallenge.participants} joined</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-300" />
              <span>{currentChallenge.prize}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                {currentChallenge.category}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                {currentChallenge.difficulty}
              </Badge>
            </div>

            <Button
              size="sm"
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
            >
              <Zap className="h-4 w-4 mr-1" />
              Join Challenge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeOfTheWeek;