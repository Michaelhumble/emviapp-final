
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

const ArtistReferralCenter = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on the user ID
  const referralLink = user ? `https://emviapp.com/join?ref=${user.id.substring(0, 8)}` : '';

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success(t("Copied to clipboard!"), {
        description: t("Share this link with friends and colleagues")
      });
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Card className="border-purple-100 overflow-hidden relative">
        <motion.div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <CardHeader className="pb-2 relative overflow-hidden">
          <p className="text-gray-500 text-sm italic mb-2">
            <span className="block">
              {t("Invite friends and earn rewards from Emvi.")}
            </span>
          </p>
          
          <CardTitle className="text-xl font-serif flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            {t("Referral Program")}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-gray-600 mb-4">
            {t("Earn Emvi Credits when someone joins using your link. Credits can be redeemed for profile boosts and visibility upgrades.")}
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
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`ml-2 ${copied ? 'text-green-600 border-green-200' : 'text-purple-600'}`}
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t("Copied!")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {t("Copy Link")}
                    </>
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-600"
                  asChild
                >
                  <a href={`mailto:?subject=${encodeURIComponent(t("Join me on EmviApp!"))}&body=${encodeURIComponent(
                      t(`Hey! I'm using EmviApp for my nail art business. Join using my referral link: ${referralLink}`)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {t("Earn 3 credits per referral")}
            </span>
            <span className="text-gray-500">
              {t("Unlimited referrals")}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistReferralCenter;
