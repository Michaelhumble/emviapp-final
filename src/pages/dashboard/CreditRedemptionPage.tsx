
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, Gift, ChevronRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { UserProfile } from '@/context/auth/types';
import { Json } from '@/integrations/supabase/types';
import Layout from '@/components/layout/Layout';

// Define more specific interfaces for our data
interface ReferredUser {
  full_name?: string | null;
  avatar_url?: string | null; 
}

interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: string;
  status: string | null;
  milestone_reached: boolean | null;
  milestone_type: string | null;
  milestone_value: Json | null;
  verified_at: string | null;
  credits_awarded?: number;
  referred_user?: ReferredUser;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon: React.ReactNode;
}

const CreditRedemptionPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Function that gets correctly typed data from Supabase
  const fetchReferrals = async (): Promise<Referral[]> => {
    // Using an explicit join approach instead of nested objects
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        id, referrer_id, referred_id, created_at, status, 
        milestone_reached, milestone_type, milestone_value, verified_at
      `)
      .eq('referrer_id', userProfile?.id || '')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching referrals:', error);
      return [];
    }
    
    // Get the referred users in a separate query to avoid the relationship issue
    const referralsWithUsers = await Promise.all((data || []).map(async (referral) => {
      // Get user details for each referred user
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('full_name, avatar_url')
        .eq('id', referral.referred_id)
        .single();
      
      return {
        ...referral,
        // Add a default credits amount based on status
        credits_awarded: referral.status === 'completed' ? 10 : 0,
        // Include the user data or a default empty object
        referred_user: userError ? { full_name: 'Unknown User', avatar_url: null } : userData
      } as Referral;
    }));
    
    return referralsWithUsers;
  };
  
  useEffect(() => {
    const loadReferrals = async () => {
      setLoading(true);
      try {
        const data = await fetchReferrals();
        setReferrals(data);
      } catch (err) {
        console.error('Error loading referral data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (userProfile?.id) {
      loadReferrals();
    }
  }, [userProfile?.id]);
  
  const createReferralDemo = async () => {
    setSubmitting(true);
    try {
      // Use the correct column name: referrer_id instead of referrer_user_id
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: userProfile?.id,
          referred_id: '00000000-0000-0000-0000-000000000000', // Demo user ID
          status: 'pending'
        });
        
      if (error) throw error;
      
      // Refresh referrals after creating a new one
      const updatedReferrals = await fetchReferrals();
      setReferrals(updatedReferrals);
    } catch (err) {
      console.error('Error creating demo referral:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Available rewards for credit redemption
  const availableRewards: Reward[] = [
    {
      id: 'profile-boost',
      name: 'Profile Boost',
      description: 'Boost your profile visibility for 30 days',
      creditCost: 50,
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />
    },
    {
      id: 'featured-listing',
      name: 'Featured Listing',
      description: 'Get your profile featured on the homepage',
      creditCost: 100,
      icon: <Award className="h-5 w-5 text-purple-500" />
    }
  ];
  
  // Safely check if badges are an array
  const hasBadges = Array.isArray(userProfile?.badges) && userProfile.badges.length > 0;
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Credit Redemption Center</h1>
        
        {/* Credit Balance Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-pink-500" />
              Your Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-3xl font-bold text-pink-600">
                  {userProfile?.credits || 0}
                </div>
                <p className="text-gray-500">Available credits</p>
              </div>
              
              <div className="flex gap-2">
                {hasBadges && userProfile?.badges.map((badge: any, idx: number) => (
                  <Badge key={idx} variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                    {typeof badge === 'string' ? badge : badge?.name || 'Badge'}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Rewards Section */}
        <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableRewards.map((reward) => (
            <Card key={reward.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{reward.name}</h3>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-blue-600">{reward.creditCost}</span>
                  <span className="text-xs text-gray-500">credits</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Referrals Section */}
        <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="py-4">Loading referrals...</div>
            ) : referrals.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-gray-500 mb-4">You haven't referred anyone yet.</p>
                <Button 
                  variant="outline" 
                  onClick={createReferralDemo}
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Demo Referral'}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {referrals.map((referral) => (
                  <div 
                    key={referral.id} 
                    className="flex justify-between items-center p-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage 
                          src={referral.referred_user?.avatar_url || ''} 
                          alt={referral.referred_user?.full_name || 'User'} 
                        />
                        <AvatarFallback>
                          {(referral.referred_user?.full_name || 'U').charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{referral.referred_user?.full_name || 'Anonymous User'}</p>
                        <p className="text-xs text-gray-500">
                          Joined on {new Date(referral.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant={referral.status === 'completed' ? 'default' : 'outline'}
                        className={referral.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                      >
                        {referral.status === 'completed' ? 'Completed' : 'Pending'}
                      </Badge>
                      {referral.credits_awarded ? (
                        <span className="ml-2 bg-pink-50 text-pink-700 text-sm px-2 py-1 rounded">
                          +{referral.credits_awarded} credits
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreditRedemptionPage;
