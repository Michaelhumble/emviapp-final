
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Facebook, Twitter } from 'lucide-react';
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
    <Card className="overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-70" />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl font-serif flex items-center">
          <span role="img" aria-label="gift" className="mr-2">🎁</span>
          Invite & Earn Credits
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <p className="text-sm text-gray-600 mb-4">
          Share your unique link and earn <span className="font-medium text-pink-600">15 credits</span> for 
          every friend who joins EmviApp! <span role="img" aria-label="sparkles">✨</span>
        </p>
        
        <div className="relative mb-4 group">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative flex items-center bg-white border border-purple-100 rounded-lg p-3">
            <div className="flex-1 truncate text-sm text-purple-800 font-mono">
              {referralLink}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className={copied ? "text-green-600 border-green-200" : "text-purple-600"}
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
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            <span role="img" aria-label="credits">💎</span> Your Credits: {userCredits || 0}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#1DA1F2]"
              onClick={shareOnTwitter}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#4267B2]"
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
