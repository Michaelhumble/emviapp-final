
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArtistCreditsRedemption from "@/components/dashboard/artist/credits/ArtistCreditsRedemption";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { useTypedQuery } from "@/hooks/useTypedQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CREDIT_COSTS } from "@/utils/credits";
import { Badge } from "@/components/ui/badge";

// Define types for the referrals data to avoid deep type instantiation
interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: string;
  status: string;
  verified_at: string | null;
  milestone_type: string | null;
  milestone_reached: boolean;
  milestone_value: any;
  referrer?: any; // Keep this simple to avoid deep type instantiation
  referred_user?: {
    full_name?: string;
    avatar_url?: string;
  };
}

// Define types for rewards to avoid deep type instantiation
interface Reward {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  isAvailable: boolean;
}

const CreditRedemptionPage = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("spend");
  
  // Use simplified type for referrals data
  const { data: referrals, isLoading: referralsLoading } = useTypedQuery<Referral[]>({
    queryKey: ["referrals", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          *,
          referred_user:referred_id(full_name, avatar_url)
        `)
        .eq("referrer_id", user.id);
      
      if (error) {
        console.error("Error fetching referrals:", error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Use simplified type for rewards
  const { data: availableRewards, isLoading: rewardsLoading } = useTypedQuery<Reward[]>({
    queryKey: ["rewards"],
    queryFn: async () => {
      // Simulate fetching rewards from API
      return [
        {
          id: "profile_boost",
          name: "Profile Boost",
          description: "Boost your profile visibility for 7 days",
          creditCost: CREDIT_COSTS.BOOST_ARTIST_PROFILE,
          isAvailable: true
        },
        {
          id: "featured_listing",
          name: "Featured Listing",
          description: "Get your profile featured in search results",
          creditCost: CREDIT_COSTS.FEATURED_LISTING,
          isAvailable: true
        }
      ];
    }
  });
  
  useEffect(() => {
    document.title = "Credits & Rewards | EmviApp";
  }, []);
  
  // Function to format date in a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to submit a new referral
  const submitReferral = async (email: string) => {
    if (!user) return;
    
    try {
      // Check if user exists with that email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      if (userError || !userData) {
        console.error("User not found:", userError);
        return;
      }
      
      // Create referral record
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referred_id: userData.id
        });
      
      if (error) {
        console.error("Error creating referral:", error);
      }
    } catch (err) {
      console.error("Error in submitReferral:", err);
    }
  };
  
  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Credits & Rewards</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use your credits to boost your profile, get featured in search results, or access premium features.
          </p>
          <div className="flex justify-center mt-4">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full">
              <span className="text-lg">Your Balance: </span>
              <span className="text-xl font-bold text-indigo-700">{userProfile?.credits || 0} Credits</span>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="spend">Spend Credits</TabsTrigger>
            <TabsTrigger value="earn">Earn Credits</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spend" className="space-y-8">
            <ArtistCreditsRedemption />
          </TabsContent>
          
          <TabsContent value="earn" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Refer Friends
                  </CardTitle>
                  <CardDescription>
                    Earn credits when you refer other artists, salons, or clients to EmviApp.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Your referral code</p>
                    <div className="flex items-center">
                      <div className="bg-white border border-gray-200 rounded px-3 py-2 flex-1 mr-2 font-mono">
                        {userProfile?.referral_code || "Generate code"}
                      </div>
                      <button
                        className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded hover:bg-indigo-200 transition"
                        onClick={() => {
                          if (userProfile?.referral_code) {
                            navigator.clipboard.writeText(userProfile.referral_code);
                          }
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Rewards:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Badge className="mr-2 bg-green-100 text-green-700 hover:bg-green-100">10 Credits</Badge>
                        <span>Per artist or salon that joins</span>
                      </li>
                      <li className="flex items-center">
                        <Badge className="mr-2 bg-green-100 text-green-700 hover:bg-green-100">5 Credits</Badge>
                        <span>Per client that joins</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Complete Actions
                  </CardTitle>
                  <CardDescription>
                    Earn credits by completing tasks and being active on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Complete your profile</p>
                        <p className="text-sm text-gray-600">Add all required information</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">15 Credits</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Upload portfolio</p>
                        <p className="text-sm text-gray-600">Add at least 5 portfolio items</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">10 Credits</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Connect Instagram</p>
                        <p className="text-sm text-gray-600">Link your Instagram account</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">5 Credits</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
                <CardDescription>
                  People who have joined using your referral code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {referralsLoading ? (
                  <div className="text-center py-4">Loading referrals...</div>
                ) : referrals && referrals.length > 0 ? (
                  <div className="space-y-4">
                    {referrals.map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={referral.referred_user?.avatar_url || ''} alt="User" />
                            <AvatarFallback>{referral.referred_user?.full_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{referral.referred_user?.full_name || 'User'}</p>
                            <p className="text-sm text-gray-500">{formatDate(referral.created_at)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={referral.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {referral.status === 'completed' ? 'Completed' : 'Pending'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {referral.status === 'completed' ? '10 credits earned' : 'Verification pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>You haven't referred anyone yet.</p>
                    <p className="text-sm mt-2">Share your referral code to earn credits!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreditRedemptionPage;
