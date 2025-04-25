import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, Gift, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreditRedemptionPage = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [referralHistory, setReferralHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
      setCredits(userProfile.credits || 0);
      setReferralCount(userProfile.referral_count || 0);
    }
  }, [userProfile]);

  useEffect(() => {
    if (user) {
      fetchReferralHistory();
    }
  }, [user]);

  const fetchReferralHistory = async () => {
    if (!user) return;

    setLoadingHistory(true);
    try {
      // Fetch referrals where this user is the referrer
      const { data: sentReferrals, error: sentError } = await supabase
        .from('referrals')
        .select('*, referred_user:referred_user_id(full_name, avatar_url)')
        .eq('referrer_user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch referrals where this user was referred
      const { data: receivedReferrals, error: receivedError } = await supabase
        .from('referrals')
        .select('*, referrer:referrer_user_id(full_name, avatar_url)')
        .eq('referred_user_id', user.id)
        .single();

      if (sentError) console.error("Error fetching sent referrals:", sentError);
      if (receivedError && receivedError.code !== 'PGRST116') {
        console.error("Error fetching received referrals:", receivedError);
      }

      // Combine and format the data
      const history = [];
      
      // Add sent referrals
      if (sentReferrals) {
        sentReferrals.forEach((ref: any) => {
          history.push({
            id: ref.id,
            type: 'sent',
            date: new Date(ref.created_at).toLocaleDateString(),
            user: ref.referred_user?.full_name || 'Unknown User',
            avatar: ref.referred_user?.avatar_url,
            credits: ref.credits_awarded || 0,
            status: ref.status || 'pending'
          });
        });
      }
      
      // Add received referral if it exists
      if (receivedReferrals) {
        history.push({
          id: receivedReferrals.id,
          type: 'received',
          date: new Date(receivedReferrals.created_at).toLocaleDateString(),
          user: receivedReferrals.referrer?.full_name || 'Unknown User',
          avatar: receivedReferrals.referrer?.avatar_url,
          credits: receivedReferrals.credits_awarded || 0,
          status: receivedReferrals.status || 'pending'
        });
      }

      setReferralHistory(history);
    } catch (error) {
      console.error("Error in fetchReferralHistory:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleRedeemReferral = async () => {
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to redeem a referral code");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Check if this user has already used a referral code
      const { data: existingReferral, error: checkError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referred_user_id', user.id)
        .single();

      if (existingReferral) {
        setError("You have already used a referral code");
        return;
      }

      // Find the referrer user by their referral code
      const { data: referrerData, error: referrerError } = await supabase
        .from('users')
        .select('id, credits, referral_count')
        .eq('referral_code', referralCode)
        .single();

      if (referrerError || !referrerData) {
        setError("Invalid referral code");
        return;
      }

      // Make sure user isn't referring themselves
      if (referrerData.id === user.id) {
        setError("You cannot use your own referral code");
        return;
      }

      // Create the referral record
      const { error: referralError } = await supabase
        .from('referrals')
        .insert({
          referrer_user_id: referrerData.id,
          referred_user_id: user.id,
          credits_awarded: 10, // Both users get 10 credits
          status: 'completed'
        });

      if (referralError) {
        console.error("Error creating referral:", referralError);
        setError("Failed to redeem referral code");
        return;
      }

      // Update referrer's credits and referral count
      const { error: updateReferrerError } = await supabase
        .from('users')
        .update({
          credits: (referrerData.credits || 0) + 10,
          referral_count: (referrerData.referral_count || 0) + 1
        })
        .eq('id', referrerData.id);

      if (updateReferrerError) {
        console.error("Error updating referrer:", updateReferrerError);
      }

      // Update current user's credits
      const { error: updateUserError } = await supabase
        .from('users')
        .update({
          credits: (userProfile?.credits || 0) + 10
        })
        .eq('id', user.id);

      if (updateUserError) {
        console.error("Error updating user credits:", updateUserError);
        setError("Failed to add credits to your account");
        return;
      }

      // Success!
      setSuccess(true);
      await refreshUserProfile();
      fetchReferralHistory();
      toast.success("Referral code redeemed successfully! You've earned 10 credits.");
    } catch (err) {
      console.error("Error in handleRedeemReferral:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Credits Summary Card */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Your Credits</CardTitle>
                  <CardDescription>
                    Use credits for premium features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">{credits}</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Available credits
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Referrals</div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">
                          Total referrals
                        </span>
                        <span className="font-medium">{referralCount}</span>
                      </div>
                    </div>
                    
                    {profile?.badges && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Array.isArray(profile.badges) ? (
                          // Process when badges is an array
                          profile.badges.map((badge: any, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {typeof badge === 'string' ? badge : badge.name || 'Badge'}
                            </Badge>
                          ))
                        ) : typeof profile.badges === 'object' ? (
                          // Process when badges is an object
                          Object.keys(profile.badges || {}).map((key) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {key}
                            </Badge>
                          ))
                        ) : null}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="redeem">
                <TabsList className="mb-4">
                  <TabsTrigger value="redeem">Redeem Code</TabsTrigger>
                  <TabsTrigger value="share">Share & Earn</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                {/* Redeem Tab */}
                <TabsContent value="redeem">
                  <Card>
                    <CardHeader>
                      <CardTitle>Redeem Referral Code</CardTitle>
                      <CardDescription>
                        Enter a referral code to earn 10 credits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {success ? (
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-800">Success!</AlertTitle>
                          <AlertDescription className="text-green-700">
                            You've successfully redeemed the referral code and earned 10 credits.
                            Both you and the referrer have received credits.
                          </AlertDescription>
                        </Alert>
                      ) : error ? (
                        <Alert className="bg-red-50 border-red-200 mb-4">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertTitle className="text-red-800">Error</AlertTitle>
                          <AlertDescription className="text-red-700">
                            {error}
                          </AlertDescription>
                        </Alert>
                      ) : null}
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="referralCode">Referral Code</Label>
                          <Input
                            id="referralCode"
                            placeholder="Enter referral code"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                            disabled={loading || success}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleRedeemReferral} 
                        disabled={loading || success || !referralCode.trim()}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Redeeming...
                          </>
                        ) : (
                          <>
                            <Gift className="mr-2 h-4 w-4" />
                            Redeem Code
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Share Tab */}
                <TabsContent value="share">
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Your Referral Code</CardTitle>
                      <CardDescription>
                        Earn 10 credits for each new user who signs up with your code
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="yourCode">Your Referral Code</Label>
                          <div className="flex">
                            <Input
                              id="yourCode"
                              value={userProfile?.referral_code || ""}
                              readOnly
                              className="rounded-r-none"
                            />
                            <Button
                              variant="secondary"
                              className="rounded-l-none"
                              onClick={() => {
                                navigator.clipboard.writeText(userProfile?.referral_code || "");
                                toast.success("Referral code copied to clipboard!");
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Share Link</Label>
                          <div className="flex">
                            <Input
                              value={`https://emviapp.com/signup?ref=${userProfile?.referral_code || ""}`}
                              readOnly
                              className="rounded-r-none text-xs sm:text-sm"
                            />
                            <Button
                              variant="secondary"
                              className="rounded-l-none"
                              onClick={() => {
                                navigator.clipboard.writeText(`https://emviapp.com/signup?ref=${userProfile?.referral_code || ""}`);
                                toast.success("Referral link copied to clipboard!");
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                        
                        <Alert>
                          <Gift className="h-4 w-4" />
                          <AlertTitle>How it works</AlertTitle>
                          <AlertDescription>
                            <p className="mb-2">
                              Share your referral code with friends and colleagues. When they sign up and enter your code:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>They get 10 credits</li>
                              <li>You get 10 credits</li>
                              <li>Credits can be used for premium features</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* History Tab */}
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Referral History</CardTitle>
                      <CardDescription>
                        Track your referral activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loadingHistory ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      ) : referralHistory.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No referral activity yet</p>
                          <p className="text-sm mt-2">Share your code to start earning credits</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {referralHistory.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b pb-4">
                              <div className="flex items-center gap-3">
                                {item.avatar ? (
                                  <img 
                                    src={item.avatar} 
                                    alt={item.user} 
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {item.user.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium">{item.user}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span>{item.type === 'sent' ? 'You referred' : 'Referred you'}</span>
                                    <span>•</span>
                                    <span>{item.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-green-600">+{item.credits} credits</div>
                                <Badge variant={item.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                                  {item.status === 'completed' ? 'Completed' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreditRedemptionPage;
