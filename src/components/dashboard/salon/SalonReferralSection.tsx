
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Share2, Copy, Users } from 'lucide-react';

const SalonReferralSection = () => {
  const { userProfile } = useAuth();
  const [copying, setCopying] = useState(false);
  
  // Generate a referral code based on user ID
  const referralCode = userProfile?.referral_code || 
    (userProfile?.id ? `EMVI${userProfile.id.substring(0, 6)}` : 'EMVICODE');
  
  // Create the full referral link
  const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
  
  // Fetch referral stats
  const { data: referralStats } = useQuery({
    queryKey: ['referral-stats', userProfile?.id],
    queryFn: async () => {
      if (!userProfile?.id) return { referral_count: 0 };
      
      // For now, we'll use a simpler query to get just the count
      const { data, error } = await supabase
        .rpc('get_user_referral_stats', { user_id: userProfile.id });
      
      if (error) {
        console.error("Error fetching referral stats:", error);
        return { referral_count: 0 };
      }
      
      return data?.[0] || { referral_count: 0 };
    },
    enabled: !!userProfile?.id,
  });
  
  const referralCount = referralStats?.referral_count || 0;
  
  const copyReferralLink = () => {
    setCopying(true);
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link");
      })
      .finally(() => {
        setTimeout(() => setCopying(false), 1500);
      });
  };
  
  return (
    <Card className="border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center text-blue-800">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Earn Rewards with Referrals
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Share your code and earn 25 credits for each new salon owner that joins
            </p>
            
            <div className="flex items-center mt-3">
              <div className="text-xs text-blue-600 mr-2">Your referrals:</div>
              <div className="bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-md text-sm">
                {referralCount} referral{referralCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex items-center">
              <div className="bg-white/80 border border-blue-200 rounded px-3 py-2 text-sm font-mono text-blue-800 flex-grow">
                {referralLink}
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute right-1 h-7 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                onClick={copyReferralLink}
              >
                {copying ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button 
              onClick={copyReferralLink} 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add the missing Check icon component
const Check = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default SalonReferralSection;
