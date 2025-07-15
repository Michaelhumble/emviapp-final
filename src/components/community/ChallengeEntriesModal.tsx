import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Trophy, Users } from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface ChallengeEntriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
  challengeTitle: string;
}

const ChallengeEntriesModal: React.FC<ChallengeEntriesModalProps> = ({
  isOpen,
  onClose,
  challengeId,
  challengeTitle
}) => {
  const { entries, voteForEntry, fetchChallengeEntries } = useChallenges();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isOpen && challengeId) {
      fetchChallengeEntries(challengeId);
    }
  }, [isOpen, challengeId]);

  const handleVote = async (entryId: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to vote');
      return;
    }
    await voteForEntry(entryId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            {challengeTitle} - Entries
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
              <p className="text-gray-500">Be the first to submit your entry!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    {/* Entry Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                            U
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Community Member</span>
                      </div>
                      {entry.is_winner && (
                        <Badge className="bg-yellow-500 text-white">
                          <Trophy className="h-3 w-3 mr-1" />
                          Winner
                        </Badge>
                      )}
                    </div>

                    {/* Entry Content */}
                    {entry.post?.content && (
                      <p className="text-gray-700 text-sm">{entry.post.content}</p>
                    )}

                    {/* Entry Images */}
                    {entry.post?.image_urls && entry.post.image_urls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {entry.post.image_urls.slice(0, 4).map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Entry ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    {/* Vote Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{entry.votes_count} votes</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(entry.id)}
                        className="text-xs"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Vote
                      </Button>
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

export default ChallengeEntriesModal;