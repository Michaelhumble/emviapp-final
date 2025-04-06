
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Users, Gift, CheckCircle, Coins, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const AffiliateReferralCard = () => {
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
    <Card className="border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg text-indigo-800">
          <Coins className="h-5 w-5 text-indigo-600" />
          💰 Earn Emvi Credits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-between mb-4 border border-indigo-100">
          <div className="flex items-center text-indigo-700">
            <Gift className="h-5 w-5 mr-2" />
            <span className="font-medium">You've Earned</span>
          </div>
          <div className="text-center grid grid-cols-1 gap-1">
            <div className="flex items-center justify-end text-lg font-bold text-indigo-700">
              <CreditCard className="h-4 w-4 mr-1" />
              💳 {referralStats.credits || userProfile?.referral_count || 0}
            </div>
            <div className="flex items-center justify-end text-sm text-indigo-600">
              <Users className="h-3 w-3 mr-1" />
              👥 {referralStats.count || userProfile?.referral_count || 0} Friends
            </div>
          </div>
        </div>
        
        <p className="text-sm text-indigo-700 italic mb-4">
          Every friend = more credits. More credits = more exposure, more clients, more money.
        </p>
        
        <div className="flex items-center space-x-2 mt-4">
          <input
            value={referralLink}
            readOnly
            className="flex-1 font-mono text-xs bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3"
          />
          <Button 
            size="sm" 
            className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateReferralCard;
