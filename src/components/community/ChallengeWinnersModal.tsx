import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Trophy, Calendar } from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import { formatDistanceToNow } from 'date-fns';

interface ChallengeWinnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChallengeWinnersModal: React.FC<ChallengeWinnersModalProps> = ({
  isOpen,
  onClose
}) => {
  const { winners } = useChallenges();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Challenge Winners
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {winners.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No winners yet</h3>
              <p className="text-gray-500">Check back after challenges end to see the winners!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {winners.map((winner, index) => (
                <Card key={winner.id} className="p-6 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                  <div className="space-y-4">
                    {/* Winner Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                              U
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                            <Crown className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Community Member</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>Won {formatDistanceToNow(new Date(winner.submitted_at), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500 text-white">
                        #{index + 1} Winner
                      </Badge>
                    </div>

                    {/* Challenge Info */}
                    {(winner as any).challenge && (
                      <div className="bg-white/50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900">{(winner as any).challenge.title}</h5>
                        <p className="text-sm text-gray-600">Prize: {(winner as any).challenge.prize}</p>
                      </div>
                    )}

                    {/* Winner's Entry Content */}
                    {winner.post?.content && (
                      <p className="text-gray-700">{winner.post.content}</p>
                    )}

                    {/* Winner's Entry Images */}
                    {winner.post?.image_urls && winner.post.image_urls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {winner.post.image_urls.slice(0, 4).map((url, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={url}
                            alt={`Winner entry ${imgIndex + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-yellow-300"
                          />
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>{winner.votes_count} votes</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeWinnersModal;