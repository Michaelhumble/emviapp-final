import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trophy, Star, Copy, Share2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { toast } from 'sonner';

interface InviteEverywhereProps {
  variant?: 'small' | 'large' | 'minimal';
  context?: 'feed' | 'profile' | 'comment' | 'floating';
}

const InviteEverywhere: React.FC<InviteEverywhereProps> = ({ 
  variant = 'small', 
  context = 'feed' 
}) => {
  const { referralLink, referralStats, copyReferralLink } = useReferralSystem();
  const [showDetails, setShowDetails] = useState(false);

  const handleInvite = () => {
    if (referralLink) {
      copyReferralLink();
      toast.success('Invite link copied! Share and earn rewards! 🎉');
    }
  };

  const shareText = `Join me on EmviApp - the beauty community where your talent shines! ✨ Use my code to get started: ${referralLink}`;

  const handleShareToSocial = (platform: string) => {
    const url = encodeURIComponent(referralLink || '');
    const text = encodeURIComponent(shareText);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      instagram: `https://www.instagram.com/`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
    toast.success(`Opening ${platform}! Share your invite! 🚀`);
  };

  if (variant === 'minimal') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleInvite}
        className="text-primary hover:text-primary/80 p-1 h-auto"
      >
        <UserPlus size={16} />
      </Button>
    );
  }

  if (variant === 'large') {
    return (
      <motion.div 
        className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setShowDetails(true)}
        onHoverEnd={() => setShowDetails(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <Gift className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Invite & Earn</h3>
              <p className="text-sm text-muted-foreground">Share EmviApp, Get Rewards</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{referralStats?.referralCount || 0}</div>
            <div className="text-xs text-muted-foreground">Invited</div>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">+10</div>
                  <div className="text-xs text-green-600">Credits per invite</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">#{Math.floor(Math.random() * 100) + 1}</div>
                  <div className="text-xs text-purple-600">Your rank</div>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">🔥</div>
                  <div className="text-xs text-yellow-600">On fire!</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <Button onClick={handleInvite} className="w-full" size="sm">
            <Copy size={16} className="mr-2" />
            Copy Invite Link
          </Button>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleShareToSocial('whatsapp')}>
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShareToSocial('facebook')}>
              Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShareToSocial('instagram')}>
              Instagram
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default small variant
  return (
    <motion.div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleInvite}
        className="text-primary border-primary/30 hover:bg-primary/10"
      >
        <UserPlus size={16} className="mr-1" />
        Invite
      </Button>
      {context === 'floating' && (
        <motion.div
          className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          +10 credits
        </motion.div>
      )}
    </motion.div>
  );
};

export default InviteEverywhere;