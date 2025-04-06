
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Share2, Gift, ArrowRight, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CustomerReferralCenter = () => {
  const { userProfile, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    count: 0,
    credits: 0
  });
  
  // For demo purposes, generate a referral code if none exists
  const referralCode = userProfile?.affiliate_code || userProfile?.referral_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/sign-up?ref=${referralCode}`;
  
  // Fetch referral stats from Supabase
  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!user) return;
      
      try {
        // Get referred users count
        const { count: referralCount, error: countError } = await supabase
          .from('users')
          .select('id', { count: 'exact', head: true })
          .eq('referred_by', referralCode);
        
        if (countError) {
          console.error('Error fetching referral count:', countError);
          return;
        }
        
        // Get user credits
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user credits:', userError);
          return;
        }
        
        setReferralStats({
          count: referralCount || 0,
          credits: userData?.credits || 0
        });
      } catch (err) {
        console.error('Unexpected error fetching referral stats:', err);
      }
    };
    
    fetchReferralStats();
  }, [user, referralCode]);
  
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
      <Card className="border-pink-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 text-pink-500 mr-2" />
              Referral Center
            </h3>
          </div>
          
          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center text-pink-700">
                  <Gift className="h-5 w-5 mr-2" />
                  <span className="font-medium">Earn Credits</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Invite friends and earn Emvi Credits you can use to boost your profile, find premium services, or access exclusive beauty deals in the future.
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-700">
                  {referralStats.count || 0}
                </div>
                <div className="text-xs text-gray-500">Friends Joined</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Your Referral Link
              </label>
              <div className="flex">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {referralLink}
                </div>
                <Button 
                  variant="outline"
                  className="rounded-l-none" 
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="justify-between"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Join me on EmviApp",
                      text: "I'm using EmviApp to discover amazing beauty services. Join me!",
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
            
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">
                {referralStats.count > 0 
                  ? `You've invited ${referralStats.count} ${referralStats.count === 1 ? 'friend' : 'friends'} so far`
                  : "Invite friends to earn Emvi Credits"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReferralCenter;
