
import { useState, useEffect } from 'react';
import { Copy, Heart, Gift, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface InviteBannerProps {
  className?: string;
}

const InviteBanner = ({ className }: InviteBannerProps) => {
  const { user, userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  
  // Mock viral stats - in real app would come from API
  const [viralStats, setViralStats] = useState({
    totalReferrals: userProfile?.referral_count || 0,
    recentJoins: 3,
    creditsEarned: userProfile?.credits || 0,
    isTopPerformer: (userProfile?.referral_count || 0) > 5
  });
  
  // Generate a referral link based on user ID
  const referralLink = `https://emviapp.com/invite/${user?.id?.substring(0, 8)}`;
  
  // Pulse animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#EC4899', '#F59E0B']
    });
    
    toast.success('🎉 Referral link copied! Share and earn rewards!');
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on EmviApp - The future of beauty!',
        text: `I'm growing my beauty business on EmviApp! Join me and let's build together 💅✨`,
        url: referralLink
      });
    } else {
      handleCopy();
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 text-white shadow-2xl ${className}`}
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-black/5"></div>
          <motion.div 
            className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{ 
              scale: pulseAnimation ? [1, 1.2, 1] : 1,
              opacity: pulseAnimation ? [0.3, 0.6, 0.3] : 0.3
            }}
            transition={{ duration: 2 }}
          ></motion.div>
          
          <div className="relative z-10">
            {/* Header with viral badges */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: pulseAnimation ? [0, 15, -15, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Gift className="h-6 w-6 text-yellow-300" />
                </motion.div>
                <h3 className="text-xl font-bold">Grow Your Empire</h3>
                {viralStats.isTopPerformer && (
                  <Badge className="bg-yellow-400 text-yellow-900 border-none">
                    🏆 Top 5%
                  </Badge>
                )}
              </div>
              
              <motion.button
                onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white/80 text-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Viral stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <motion.div 
                className="bg-white/10 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="h-4 w-4 mx-auto mb-1 text-blue-300" />
                <div className="text-lg font-bold">{viralStats.totalReferrals}</div>
                <div className="text-xs text-white/80">Friends Invited</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-green-300" />
                <div className="text-lg font-bold">{viralStats.recentJoins}</div>
                <div className="text-xs text-white/80">Joined Today</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-4 w-4 mx-auto mb-1 text-yellow-300" />
                <div className="text-lg font-bold">{viralStats.creditsEarned}</div>
                <div className="text-xs text-white/80">Credits Earned</div>
              </motion.div>
            </div>
            
            <p className="text-purple-100 text-sm mb-4">
              Share your unique link and earn <strong>10 credits</strong> when friends join! 
              <Heart className="h-3 w-3 inline ml-1 text-red-400" />
            </p>
            
            {/* Referral link with copy/share */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm flex-1 truncate backdrop-blur-sm">
                {referralLink}
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-white hover:bg-white/90 text-purple-600 border-none"
                  disabled={copied}
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  onClick={handleShare}
                  className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-none"
                >
                  <Heart className="h-4 w-4" />
                  Share
                </Button>
              </motion.div>
            </div>

            {/* Social proof message */}
            {viralStats.recentJoins > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-400/30 rounded-lg p-2 text-center"
              >
                <div className="text-sm font-medium text-green-100">
                  🔥 {viralStats.recentJoins} artists joined from referrals today!
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteBanner;
