
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Loader2, Clock, Users, Share2, Gift, ArrowRight, Copy, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ArtistCreditsRedemption from "./ArtistCreditsRedemption";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";

const ArtistDashboard = () => {
  const { userProfile, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeMessage, setActiveMessage] = useState(0);
  const [referralStats, setReferralStats] = useState({
    count: 0,
    credits: 0
  });
  
  // Welcome messages
  const welcomeMessages = [
    { id: 1, text: "Behind every beautiful nail set is a dream. Let's build yours." },
    { id: 2, text: "You're not alone. EmviApp is your business partner." },
    { id: 3, text: "The hustle is real—but you've got support now." }
  ];
  
  // Format first name for greeting
  const firstName = userProfile?.full_name ? userProfile.full_name.split(' ')[0] : "Artist";
  
  // Generate a referral code if none exists
  const referralCode = userProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/sign-up?ref=${referralCode}`;
  
  // Fetch referral stats from Supabase
  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!userProfile) return;
      
      try {
        // Get user credits (earned from referrals)
        const { data, error } = await supabase
          .from('users')
          .select('credits, referral_count')
          .eq('id', userProfile.id)
          .single();
          
        if (!error && data) {
          setReferralStats({
            count: data.referral_count || 0,
            credits: data.credits || 0
          });
        }
      } catch (err) {
        console.error('Unexpected error fetching referral stats:', err);
      }
    };
    
    if (!loading && userProfile) {
      fetchReferralStats();
    }
  }, [userProfile, loading]);
  
  // Rotate welcome messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [welcomeMessages.length]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  // Show loading state while user data loads
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }
  
  // Calculate user's credits
  const userCredits = userProfile?.credits !== undefined 
    ? userProfile.credits 
    : (userProfile?.referral_count || 0);
  
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Welcome Banner */}
      <section className="mb-8">
        <Card className="border-none bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-purple-900">
                  Welcome back, {firstName}!
                </h1>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.5 }}
                    className="text-purple-700 mt-2"
                  >
                    {welcomeMessages[activeMessage].text}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-purple-700">
                  <Clock className="h-4 w-4 inline mr-1" /> 
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Dashboard Widgets */}
          <section className="mb-8">
            <ArtistDashboardWidgets />
          </section>
        </div>
        
        <div className="lg:col-span-1">
          {/* Referral Center */}
          <section className="mb-8">
            <Card className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-800">Referral Center</h3>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 mb-5 border border-purple-200">
                  <p className="text-purple-800 mb-3">
                    Share your link. Get rewarded every time someone joins.
                  </p>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 text-center mb-3">
                    <div className="text-xs text-purple-600 uppercase font-semibold mb-1">You've Earned</div>
                    <div className="text-2xl font-bold text-purple-800">
                      {referralStats.credits || userProfile?.referral_count || 0} <span className="text-base">Emvi Credits</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 text-center">
                    <div className="text-xs text-purple-600 uppercase font-semibold mb-1">Network Growth</div>
                    <div className="text-2xl font-bold text-purple-800 flex items-center justify-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      {referralStats.count || 0} <span className="text-base ml-1">Friends Joined</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Your Referral Link
                    </label>
                    <div className="flex">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
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
          </section>
        </div>
      </div>
      
      {/* Credits Redemption */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold mb-4">Redeem Emvi Credits</h2>
        <ArtistCreditsRedemption credits={userCredits} />
      </section>
    </div>
  );
};

export default ArtistDashboard;
