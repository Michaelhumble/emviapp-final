
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Facebook, Twitter, Gift, Sparkles } from 'lucide-react';
import { useArtistData } from '../context/ArtistDataContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ReferralWidget = () => {
  const { userCredits, artistProfile } = useArtistData();
  const [copied, setCopied] = useState(false);

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
    <Card className="overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 shadow-sm">
      <motion.div 
        className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200/70 to-purple-200/70 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl font-serif flex items-center">
          <Gift className="h-5 w-5 text-pink-500 mr-2" />
          Invite & Earn Credits
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <p className="text-sm text-gray-600 mb-4">
          Share your unique link and earn <motion.span 
            className="font-bold text-pink-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >15 credits</motion.span> for 
          every friend who joins EmviApp! <Sparkles className="h-4 w-4 inline text-amber-500" />
        </p>
        
        <motion.div 
          className="relative mb-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300" />
          
          <div className="relative flex items-center bg-white/80 backdrop-blur-sm border border-purple-100 rounded-lg p-3">
            <div className="flex-1 truncate text-sm text-purple-800 font-mono">
              {referralLink}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className={copied ? "text-green-600 border-green-200 bg-green-50" : "text-purple-600 border-purple-200"}
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
            className="text-gray-600 bg-white/80 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-3.5 w-3.5 inline mr-1 text-amber-500" /> 
            Your Credits: <span className="font-semibold text-purple-700">{userCredits || 0}</span>
          </motion.div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
              onClick={shareOnTwitter}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#4267B2] hover:bg-[#4267B2]/10"
              onClick={shareOnFacebook}
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralWidget;
