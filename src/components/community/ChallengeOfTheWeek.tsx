import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Users, Clock, Zap, Star, Crown, Medal } from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/context/auth';
import ChallengeEntriesModal from './ChallengeEntriesModal';
import ChallengeWinnersModal from './ChallengeWinnersModal';
import { toast } from 'sonner';

interface ChallengeOfTheWeekProps {
  onJoinChallenge?: () => void;
}

const ChallengeOfTheWeek: React.FC<ChallengeOfTheWeekProps> = ({ onJoinChallenge }) => {
  const { currentChallenge, userEntry, getTimeRemaining, winners, isLoading } = useChallenges();
  const { isSignedIn } = useAuth();
  const [showEntries, setShowEntries] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-xl animate-pulse">
        <CardContent className="p-4">
          <div className="h-24 bg-white/20 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!currentChallenge) {
    return (
      <Card className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white border-0 shadow-xl">
        <CardContent className="p-4 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
          <h3 className="font-bold mb-1">No Active Challenge</h3>
          <p className="text-white/90 text-sm">Check back soon for the next weekly challenge!</p>
        </CardContent>
      </Card>
    );
  }

  const handleJoinChallenge = () => {
    if (!isSignedIn) {
      toast.error('Please sign in to join the challenge');
      return;
    }
    if (onJoinChallenge) {
      onJoinChallenge();
    }
  };

  const timeLeft = getTimeRemaining(currentChallenge.end_date);

  return (
    <>
      <Card className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-xl overflow-hidden">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-pulse opacity-30 blur-sm"></div>
        <div className="absolute inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg"></div>
        
        <CardContent className="relative p-4 z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-300 animate-bounce" />
              <span className="font-bold text-sm">CHALLENGE OF THE WEEK</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              {timeLeft} left
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
                <span>{currentChallenge.participant_count} joined</span>
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

              <div className="flex gap-2">
                {userEntry ? (
                  <Badge className="bg-green-500/20 text-green-100 border-green-300/30 text-xs">
                    ✓ Entered
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleJoinChallenge}
                    className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Enter Challenge
                  </Button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEntries(true)}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs"
              >
                <Star className="h-3 w-3 mr-1" />
                View Entries
              </Button>
              
              {winners.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWinners(true)}
                  className="bg-yellow-500/20 text-yellow-100 border-yellow-300/30 hover:bg-yellow-500/30 text-xs"
                >
                  <Crown className="h-3 w-3 mr-1" />
                  Past Winners
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Entries Modal */}
      <ChallengeEntriesModal
        isOpen={showEntries}
        onClose={() => setShowEntries(false)}
        challengeId={currentChallenge.id}
        challengeTitle={currentChallenge.title}
      />

      {/* Winners Modal */}
      <ChallengeWinnersModal
        isOpen={showWinners}
        onClose={() => setShowWinners(false)}
      />
    </>
  );
};

export default ChallengeOfTheWeek;