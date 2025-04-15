
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Facebook, Twitter, Gift, Sparkles, Share2 } from 'lucide-react';
import { useArtistData } from '../context/ArtistDataContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const ReferralWidget = () => {
  const { userCredits, artistProfile } = useArtistData();
  const [copied, setCopied] = useState(false);
  const [isHoveringCredits, setIsHoveringCredits] = useState(false);

  // Generate referral link based on user's profile or ID
  const referralLink = artistProfile?.affiliate_code 
    ? `https://emviapp.com/invite/${artistProfile.affiliate_code}`
    : 'https://emviapp.com/join';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOnTwitter = () => {
    const text = "Join me on EmviApp - the platform for nail artists and beauty professionals!";
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <motion.div 
        className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -left-12 -bottom-12 w-32 h-32 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full"
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl font-serif flex items-center">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="mr-2"
          >
            <Gift className="h-5 w-5 text-pink-500" />
          </motion.div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Invite & Earn Credits
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <p className="text-sm text-gray-600 mb-4">
          Share your unique link and earn 
          <motion.span 
            className="font-bold text-pink-600 mx-1 relative inline-block"
            onMouseEnter={() => setIsHoveringCredits(true)}
            onMouseLeave={() => setIsHoveringCredits(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            15 credits
            <AnimatePresence>
              {isHoveringCredits && (
                <motion.span
                  className="absolute inset-0 bg-pink-100 rounded-md -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
              )}
            </AnimatePresence>
            <motion.span 
              className="inline-block ml-0.5"
              initial={{ opacity: 0.8, y: 0 }}
              animate={{ opacity: [0.8, 1, 0.8], y: [-1, 1, -1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 inline text-amber-500" />
            </motion.span>
          </motion.span> 
          for every friend who joins EmviApp!
        </p>
        
        <motion.div 
          className="relative mb-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300" />
          
          <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-purple-100 rounded-lg p-3">
            <div className="flex-1 truncate text-sm text-purple-800 font-mono">
              {referralLink}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className={`transition-all duration-300 ${copied ? "text-green-600 border-green-200 bg-green-50" : "text-purple-600 border-purple-200 hover:bg-purple-50"}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </motion.div>
        
        <div className="flex justify-between items-center text-sm">
          <motion.div 
            className="text-gray-600 bg-white/90 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-3.5 w-3.5 inline mr-1 text-amber-500" /> 
            Your Credits: <span className="font-semibold text-purple-700">{userCredits || 0}</span>
          </motion.div>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2]/20 transition-colors"
              onClick={shareOnFacebook}
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Join me on EmviApp',
                    text: 'Check out EmviApp - the platform for nail artists and beauty professionals!',
                    url: referralLink,
                  }).catch(err => {
                    console.error('Error sharing:', err);
                    handleCopy();
                  });
                } else {
                  handleCopy();
                }
              }}
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralWidget;
