import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Share2, Trophy, Users, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const shareOptions = [
  {
    name: "Text Message",
    icon: "📱",
    action: (link: string) => {
      window.open(`sms:?&body=Join me on EmviApp, the nail industry's top platform! ${link}`);
    }
  },
  {
    name: "Email",
    icon: "📧",
    action: (link: string) => {
      window.open(`mailto:?subject=Join me on EmviApp&body=I've been using EmviApp and thought you might like it. Use my referral link to join: ${link}`);
    }
  },
  {
    name: "Facebook",
    icon: "👥",
    action: (link: string) => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`);
    }
  },
  {
    name: "Instagram",
    icon: "📸",
    action: (link: string) => {
      // For Instagram, we can only copy to clipboard since direct sharing isn't supported
      navigator.clipboard.writeText(link);
      return "Copied! Paste in your Instagram story or post";
    }
  }
];

const ReferralSystem = () => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const { 
    loading, 
    referralCode, 
    referralLink, 
    referralStats, 
    referralProgress, 
    copyReferralLink,
    getMotivationalMessage
  } = useReferralSystem();
  
  const handleShare = (option: typeof shareOptions[0]) => {
    const result = option.action(referralLink);
    if (result) {
      toast({
        title: "Sharing prepared",
        description: result
      });
    }
    setShowShareOptions(false);
  };

  const handleCopyReferralLink = () => {
    const result = copyReferralLink(referralLink);
    if (result) {
      result.then((success) => {
        if (success) {
          setCopied(true);
          toast.success('Referral link copied to clipboard!');
          setTimeout(() => setCopied(false), 3000);
        } else {
          toast.error('Failed to copy link. Please try again.');
        }
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Referral Program</CardTitle>
          <CardDescription>Loading your referral details...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-8 w-1/2 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Artist Referral Program</CardTitle>
        <CardDescription>
          Earn rewards by inviting other artists and clients to EmviApp
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Referral Link Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-purple-100 p-4">
            <p className="text-sm text-indigo-700 mb-2 font-medium">Your personal referral link:</p>
            <div className="flex">
              <Input 
                value={referralLink} 
                readOnly 
                className="bg-white border-purple-200"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-2 bg-white border-purple-200 hover:bg-purple-50"
                onClick={handleCopyReferralLink}
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center mt-3 justify-between">
              <div className="flex items-center space-x-1 text-xs text-purple-700">
                <Users className="h-3.5 w-3.5" />
                <span>Referral Code: <span className="font-bold">{referralCode}</span></span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 text-xs"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
              </Button>
            </div>
          </div>
          
          {/* Share Options */}
          {showShareOptions && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shareOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className="flex flex-col h-auto py-3 justify-center items-center"
                    onClick={() => handleShare(option)}
                  >
                    <span className="text-2xl mb-1">{option.icon}</span>
                    <span className="text-xs">{option.name}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {referralStats.completedReferrals}
              </div>
              <div className="text-sm text-green-700">Successful Referrals</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {referralStats.credits}
              </div>
              <div className="text-sm text-blue-700">Credits Earned</div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-100">
              <div className="text-2xl font-bold text-amber-600 mb-1">
                ${referralStats.estimatedEarnings}
              </div>
              <div className="text-sm text-amber-700">Estimated Value</div>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-medium">Referral Progress</span>
              </div>
              <span className="text-sm text-gray-500">
                Level {referralProgress.level}
              </span>
            </div>
            
            <Progress value={referralProgress.percentage} className="h-2" />
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{referralProgress.currentMilestone} referrals</span>
              <span>{referralProgress.nextMilestone} referrals</span>
            </div>
            
            <div className="mt-3 text-sm text-center text-indigo-600 bg-indigo-50 p-2 rounded">
              {getMotivationalMessage(userProfile?.preferred_language || 'English')}
            </div>
          </div>
          
          {/* How It Works Section */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Gift className="h-4 w-4 mr-2 text-purple-500" />
              How the Referral Program Works
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Share your unique referral link with other artists and clients</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>When they sign up using your link, you get credited once they complete their profile</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Earn 20 credits per successful referral, redeemable for premium features and rewards</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <span>Reach new levels to unlock special badges and exclusive benefits</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;
