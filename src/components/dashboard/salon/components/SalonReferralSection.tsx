
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Users, ArrowRight, Gift, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SalonReferralSection = () => {
  const { userProfile, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  
  // For demo purposes, generate a referral code if none exists
  const referralCode = userProfile?.affiliate_code || userProfile?.referral_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/sign-up?ref=${referralCode}`;
  
  // Fetch referral stats
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchReferralStats = async () => {
      try {
        // Get referred users count from referrals table
        const { data: referralsData, error: referralsError } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
        
        if (referralsError) {
          console.error('Error fetching referral stats:', referralsError);
          
          // Fallback query if the RPC fails
          const { count, error: countError } = await supabase
            .from('referrals')
            .select('*', { count: 'exact', head: true })
            .eq('referrer_id', user.id);
          
          if (!countError) {
            setReferrals(count || 0);
          }
        } else if (referralsData && referralsData.length > 0 && 'referral_count' in referralsData[0]) {
          setReferrals(referralsData[0].referral_count || 0);
        }
        
        // Get user credits
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .single();
        
        if (!userError && userData) {
          setCredits(userData.credits || 0);
        }
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };
    
    fetchReferralStats();
  }, [user?.id]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mb-6"
    >
      <Card className="border-blue-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
          <CardTitle className="flex items-center text-blue-800">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            Grow The Community
          </CardTitle>
          <CardDescription>
            Refer other salons and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
            <div className="flex-1 bg-blue-50 rounded-lg p-4 flex items-center">
              <Gift className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-blue-800">50 Credits Per Referral</h4>
                <p className="text-sm text-blue-600">
                  When salon owners you refer join EmviApp
                </p>
              </div>
            </div>
            <div className="flex-1 bg-indigo-50 rounded-lg p-4 flex items-center">
              <Share2 className="h-8 w-8 text-indigo-500 mr-3" />
              <div>
                <h4 className="font-medium text-indigo-800">Premium Visibility</h4>
                <p className="text-sm text-indigo-600">
                  Credits can be used to boost your salon profile
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Your Salon Referral Link
            </h4>
            <div className="flex">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                {referralLink}
              </div>
              <Button
                variant="outline"
                className="rounded-l-none border-gray-200"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Salons Referred</p>
              <p className="text-2xl font-bold text-blue-600">{referrals}</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Credits Earned</p>
              <p className="text-2xl font-bold text-indigo-600">{credits}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 px-6 flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Join me on EmviApp for Salon Owners",
                  text: "I'm using EmviApp to find nail artists, manage my salon, and grow my business. Join me!",
                  url: referralLink,
                });
              } else {
                copyToClipboard();
              }
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share with Salon Owners
          </Button>
          
          <Button asChild variant="default" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            <Link to="/resources/marketing">
              Get Marketing Materials
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SalonReferralSection;
