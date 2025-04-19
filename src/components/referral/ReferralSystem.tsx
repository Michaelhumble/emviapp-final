
import React, { useState } from "react";
import { Copy, CheckCircle2, Facebook, Twitter, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { toast } from "sonner";
import { motion } from "framer-motion";

const shareOptions = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    url: (link: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "#1DA1F2",
    url: (link: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
  },
  {
    name: "Email",
    icon: Mail,
    color: "#EA4335",
    url: (link: string) => `mailto:?subject=Check out EmviApp!&body=Sign up using my referral link: ${encodeURIComponent(link)}`,
  },
];

const ReferralSystem = () => {
  const { userProfile } = useAuth();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    referralCode, 
    referralLink, 
    referralStats, 
    referralProgress, 
    loading,
    getMotivationalMessage
  } = useReferralSystem();

  const completedPercentage = referralProgress?.percentage || 0;
  const nextMilestoneIn = referralProgress?.nextMilestoneIn || 0;
  
  const referralMessage = userProfile?.preferred_language 
    ? getMotivationalMessage(referralStats?.completedReferrals || 0, nextMilestoneIn, userProfile.preferred_language) 
    : getMotivationalMessage(referralStats?.completedReferrals || 0, nextMilestoneIn);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast.success('Referral link copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast.error('Failed to copy link. Please try again.');
      });
  };

  if (loading) {
    return (
      <Card className="border-indigo-100 overflow-hidden">
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading referral data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-100 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2 space-x-0 sm:space-x-4">
        <CardTitle className="text-lg font-semibold">Referral Program</CardTitle>
        {referralStats?.credits ? (
          <Badge variant="outline">
            Credits: {referralStats?.credits}
          </Badge>
        ) : null}
      </CardHeader>
      
      <CardContent className="py-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Share your referral link with friends and colleagues to earn rewards!
          </p>
          
          <div className="flex items-center justify-between bg-gray-50 rounded-md border border-gray-200 px-4 py-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="bg-transparent text-sm text-gray-700 w-full focus:outline-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyReferralLink}
              disabled={copied}
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Or use your referral code:
          </p>
          <div className="bg-gray-50 rounded-md border border-gray-200 px-4 py-2">
            <p className="text-sm text-gray-700">{referralCode}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Share directly via:
          </p>
          <div className="flex items-center space-x-3">
            {shareOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.url(referralLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:opacity-80 transition-opacity"
                style={{ backgroundColor: option.color }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Share on ${option.name}`}
              >
                <option.icon className="h-5 w-5 text-white m-1" />
              </motion.a>
            ))}
            <Button variant="outline" size="icon" onClick={toggleShareOptions}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Referral Progress</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{referralStats?.completedReferrals || 0} / {referralProgress?.nextMilestone || 5} referrals completed</span>
            <span>{completedPercentage}%</span>
          </div>
          <Progress value={completedPercentage} />
          <p className="text-xs text-muted-foreground mt-1">
            {referralMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;
