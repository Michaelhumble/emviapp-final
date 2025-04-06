
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, Copy, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';

const ArtistReferralCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Generate a referral link based on the user ID
  const referralLink = user ? `https://emviapp.com/join?ref=${user.id.substring(0, 8)}` : '';

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share this link with friends and colleagues",
      });
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="pb-2 relative overflow-hidden">
        {/* Vietnamese referral text addition */}
        <p className="text-gray-500 text-sm italic mb-2">
          <span className="block">Giới thiệu bạn bè và nhận thưởng từ Emvi.</span>
          <span className="block">Invite friends and earn rewards from Emvi.</span>
        </p>
        
        <CardTitle className="text-xl font-serif flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          Referral Program
        </CardTitle>
        
        <motion.div 
          className="absolute -right-8 -top-10 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-pink-200/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">
          Earn Emvi Credits when someone joins using your link. Credits can be redeemed for profile boosts and visibility upgrades.
        </p>
        
        <div className="flex items-center bg-purple-50 border border-purple-100 rounded-lg p-3 mb-4">
          <div className="flex-1 truncate text-sm text-purple-800 font-mono">
            {referralLink}
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            className={`ml-2 ${copied ? 'text-green-600' : 'text-purple-600'}`}
            onClick={handleCopyLink}
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Earn 3 credits per referral</span>
          <span>Unlimited referrals</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistReferralCenter;
