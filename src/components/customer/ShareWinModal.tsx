import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, Heart, Sparkles, Trophy, Star, Camera, 
  MessageSquare, Users, Zap, Gift, X 
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface ShareWinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareWinModal: React.FC<ShareWinModalProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedWin, setSelectedWin] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const winTemplates = [
    {
      id: 'booking',
      icon: Heart,
      title: 'Amazing Booking Experience',
      message: 'Just had the most incredible beauty experience! Thank you EmviApp for connecting me with such talented artists! ✨',
      color: 'from-pink-500 to-rose-500',
      points: 25
    },
    {
      id: 'milestone',
      icon: Trophy,
      title: 'Reached New Milestone',
      message: 'Just hit a new beauty milestone on EmviApp! So excited to continue this amazing journey! 🎉',
      color: 'from-amber-500 to-orange-500',
      points: 50
    },
    {
      id: 'review',
      icon: Star,
      title: 'Left Amazing Review',
      message: 'Love helping fellow beauty lovers discover amazing artists! Just shared my latest review on EmviApp! 💝',
      color: 'from-purple-500 to-pink-500',
      points: 15
    },
    {
      id: 'referral',
      icon: Users,
      title: 'Friend Joined',
      message: 'Another friend just joined the EmviApp beauty community! The more the merrier! 👯‍♀️',
      color: 'from-green-500 to-emerald-500',
      points: 50
    }
  ];

  const handleShare = async () => {
    if (!selectedWin && !customMessage.trim()) {
      toast.error('Please select a win template or write a custom message');
      return;
    }

    setLoading(true);
    try {
      // Simulate sharing process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981']
      });
      
      toast.success('Your win has been shared to the community! 🎉');
      
      // Navigate to community after a short delay
      setTimeout(() => {
        navigate('/community');
        onClose();
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to share your win');
    } finally {
      setLoading(false);
    }
  };

  const handleToCommunity = () => {
    onClose();
    navigate('/community');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 border-purple-500/30 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            Share Your Beautiful Win! 
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </DialogTitle>
          <p className="text-purple-200 text-center">
            Celebrate your beauty journey and inspire the community!
          </p>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Win Templates */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-200">Choose Your Win Type:</h3>
            <div className="grid grid-cols-1 gap-3">
              {winTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWin === template.id
                      ? 'border-white bg-white/10'
                      : 'border-purple-300/30 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedWin(template.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                      <template.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{template.title}</h4>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          +{template.points} pts
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-200">{template.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-200">Or Write Your Own:</h3>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Share your unique beauty win with the community... ✨"
              className="bg-white/10 border-purple-300/30 text-white placeholder-purple-300/50 min-h-[100px]"
            />
          </div>

          {/* Preview */}
          {(selectedWin || customMessage.trim()) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 rounded-lg p-4 border border-purple-300/30"
            >
              <h4 className="text-sm font-semibold text-purple-200 mb-2">Preview:</h4>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {userProfile?.full_name?.charAt(0) || 'B'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{userProfile?.full_name || 'Beauty Lover'}</div>
                    <div className="text-xs text-purple-300">EmviApp Community</div>
                  </div>
                </div>
                <p className="text-sm">
                  {customMessage.trim() || winTemplates.find(t => t.id === selectedWin)?.message}
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-500/20"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            
            <Button
              variant="outline"
              onClick={handleToCommunity}
              className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-500/20"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Browse Community
            </Button>
            
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleShare}
                disabled={loading || (!selectedWin && !customMessage.trim())}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full mr-2" />
                    Sharing...
                  </div>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Win
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWinModal;