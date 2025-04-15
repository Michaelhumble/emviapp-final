
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Copy, Share2, Award, ExternalLink, AlertCircle, Check } from 'lucide-react';
import { useArtistReferrals } from '@/hooks/useArtistReferrals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const ReferralSection: React.FC = () => {
  const { stats, isLoading, copyReferralLink } = useArtistReferrals();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  
  // Create referral link
  const referralLink = `${window.location.origin}/join?ref=${stats.referralCode}`;
  
  // Handle copy link
  const handleCopyLink = () => {
    const success = copyReferralLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Handle share (for mobile)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join EmviApp',
          text: 'Join EmviApp using my referral link!',
          url: referralLink,
        });
        toast.success('Thanks for sharing!');
      } catch (error) {
        console.error('Error sharing:', error);
        // Fall back to copy
        handleCopyLink();
      }
    } else {
      // Fall back to copy
      handleCopyLink();
    }
  };

  // Reward tiers
  const rewardTiers = [
    { count: 1, credits: 5, description: 'For each friend who signs up' },
    { count: 3, credits: 15, badge: 'Community Builder', description: 'Earn a special badge' },
    { count: 5, credits: 25, badge: 'EmviApp Ambassador', description: 'Unlock premium benefits' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-serif">
            <Link className="h-5 w-5 mr-2 text-purple-500" />
            Invite & Earn Credits
          </CardTitle>
          <CardDescription>
            Share your referral link with friends and earn rewards
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ) : stats.referralCode ? (
            <>
              <div className="bg-purple-50 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-2">Your Referral Link</h3>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-white"
                  />
                  {isMobile ? (
                    <Button onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCopyLink}
                      className="min-w-[100px]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <StatsCard
                  title="Your Referrals"
                  value={stats.referralCount}
                  icon={<Link className="h-5 w-5 text-purple-500" />}
                />
                <StatsCard
                  title="Credits Earned"
                  value={stats.creditsEarned}
                  icon={<Award className="h-5 w-5 text-green-500" />}
                />
                <StatsCard
                  title="Pending"
                  value={stats.pendingReferrals}
                  icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
                />
                <StatsCard
                  title="Your Code"
                  value={stats.referralCode}
                  icon={<Copy className="h-5 w-5 text-blue-500" />}
                  isCode
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Reward Tiers</h3>
                <div className="space-y-3">
                  {rewardTiers.map((tier) => (
                    <RewardTier
                      key={tier.count}
                      count={tier.count}
                      credits={tier.credits}
                      badge={tier.badge}
                      description={tier.description}
                      achieved={stats.referralCount >= tier.count}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <Link className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">No Referral Code Found</h3>
              <p className="text-gray-500 mb-4">
                You don't have a referral code yet. Generate one to start inviting friends.
              </p>
              <Button>
                Generate Referral Code
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex-col items-start pt-0">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              Invite friends to join EmviApp. When they sign up using your link, you'll both earn credits!
            </p>
            <a 
              href="/referral-terms" 
              className="text-purple-600 hover:underline flex items-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Referral Program Terms
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  isCode?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, isCode = false }) => {
  return (
    <div className="bg-gray-50 rounded-md p-3 border">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs font-medium text-gray-500">{title}</div>
        <div>{icon}</div>
      </div>
      <div className={`font-bold ${isCode ? 'text-sm' : 'text-xl'}`}>
        {value}
      </div>
    </div>
  );
};

// Reward Tier Component
interface RewardTierProps {
  count: number;
  credits: number;
  description: string;
  badge?: string;
  achieved: boolean;
}

const RewardTier: React.FC<RewardTierProps> = ({ 
  count, 
  credits, 
  description,
  badge,
  achieved 
}) => {
  return (
    <div className={`
      flex items-center justify-between p-3 rounded-md border
      ${achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50'}
    `}>
      <div className="flex items-center">
        <div className={`
          h-8 w-8 rounded-full flex items-center justify-center mr-3 text-white
          ${achieved ? 'bg-green-500' : 'bg-gray-400'}
        `}>
          {count}
        </div>
        <div>
          <div className="font-medium flex items-center">
            {count} {count === 1 ? 'Referral' : 'Referrals'}
            {badge && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-2">
                      <Award className="h-4 w-4 text-purple-500" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Earn "{badge}" badge</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      <div className="font-bold text-lg">
        +{credits} <span className="text-xs text-gray-500">credits</span>
      </div>
    </div>
  );
};

export default ReferralSection;
