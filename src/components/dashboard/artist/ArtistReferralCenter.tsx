
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Share2, Gift, ArrowRight, Copy, CheckCircle, CreditCard, Coins } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ArtistReferralCenter = () => {
  const { userProfile, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    count: 0,
    credits: 0
  });
  
  // Generate a referral code if none exists
  const referralCode = userProfile?.affiliate_code || userProfile?.referral_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/sign-up?ref=${referralCode}`;
  
  // Fetch referral stats from Supabase
  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!user) return;
      
      try {
        // Use either the database function or direct query to get referral stats
        const { data, error } = await supabase.rpc('get_user_referral_stats', {
          user_id: user.id
        });
        
        if (error) {
          console.error('Error fetching referral stats:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Get user credits (earned from referrals)
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('credits')
            .eq('id', user.id)
            .single();
            
          if (!userError && userData) {
            setReferralStats({
              count: data[0].referral_count || 0,
              credits: userData.credits || 0
            });
          }
        }
      } catch (err) {
        console.error('Unexpected error fetching referral stats:', err);
      }
    };
    
    fetchReferralStats();
  }, [user]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <div className="opacity-100">
      <Card className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center text-purple-800">
              <Coins className="h-5 w-5 text-purple-600 mr-2" />
              💰 Earn Emvi Credit That Feels Like Cash
            </h3>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-5 mb-6 border border-purple-200">
            <p className="text-purple-800 font-medium mb-4">
              Share your link. Get rewarded every time someone joins. Use credits to boost visibility, post jobs, or unlock premium features.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 text-center">
                <div className="text-xs text-purple-600 uppercase font-semibold mb-1">You've Earned</div>
                <div className="text-2xl font-bold text-purple-800 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                  💳 {referralStats.credits || userProfile?.referral_count || 0} <span className="text-base ml-1">Emvi Credits</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 text-center">
                <div className="text-xs text-purple-600 uppercase font-semibold mb-1">Network Growth</div>
                <div className="text-2xl font-bold text-purple-800 flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  👥 {referralStats.count || userProfile?.referral_count || 0} <span className="text-base ml-1">Friends Joined</span>
                </div>
              </div>
            </div>
            
            <p className="text-purple-700 text-sm italic mt-3">
              Every friend = more credits. More credits = more exposure, more clients, more money.
            </p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Your Referral Link
              </label>
              <div className="flex">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap font-mono">
                  {referralLink}
                </div>
                <Button 
                  variant="default"
                  className="rounded-l-none bg-purple-600 hover:bg-purple-700" 
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline"
                className="justify-between border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Join me on EmviApp",
                      text: "I'm using EmviApp for my beauty business. Join me!",
                      url: referralLink,
                    });
                  } else {
                    copyToClipboard();
                  }
                }}
              >
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" /> 
                  Share with friends
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="rounded-lg bg-purple-50 p-4 text-center border border-purple-100">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={copyToClipboard}
              >
                <Gift className="h-4 w-4 mr-2" />
                Copy Your Referral Link
              </Button>
              
              <p className="text-sm text-purple-600 mt-3">
                {referralStats.count > 0 
                  ? `You've invited ${referralStats.count} ${referralStats.count === 1 ? 'friend' : 'friends'} so far`
                  : "Start earning credits today! Share your link now."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistReferralCenter;
