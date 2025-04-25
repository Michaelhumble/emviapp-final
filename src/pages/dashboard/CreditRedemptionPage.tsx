
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Define proper interfaces for our data
interface ReferredUser {
  full_name?: string;
  avatar_url?: string;
}

interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: string;
  status: string | null;
  milestone_type: string | null;
  milestone_reached: boolean | null;
  milestone_value: any;
  verified_at: string | null;
  referred_user?: ReferredUser;
}

interface Reward {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
  type: string;
  source_id: string | null;
  status: string;
}

const CreditRedemptionPage = () => {
  const { user, userProfile } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch referrals made by the user
  const fetchReferrals = async (): Promise<Referral[]> => {
    try {
      if (!user) return [];

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id);

      if (error) throw error;

      // Now fetch user info for each referred user
      const referralsWithUsers = await Promise.all((data || []).map(async (referral) => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('full_name, avatar_url')
          .eq('id', referral.referred_id)
          .single();

        return {
          ...referral,
          referred_user: userError ? {} : userData
        };
      }));

      return referralsWithUsers as Referral[];
    } catch (err) {
      console.error('Error fetching referrals:', err);
      setError('Failed to load referral data');
      return [];
    }
  };

  // Fetch credit rewards earned by the user
  const fetchRewards = async (): Promise<Reward[]> => {
    try {
      if (!user) return [];

      const { data, error } = await supabase
        .from('credit_earnings')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'approved');

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching rewards:', err);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fetchedReferrals, fetchedRewards] = await Promise.all([
          fetchReferrals(),
          fetchRewards(),
        ]);
        
        setReferrals(fetchedReferrals);
        setRewards(fetchedRewards);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Function to get rewards for a specific referral
  const getRewardsForReferral = (referralId: string) => {
    return rewards.filter(reward => reward.source_id === referralId);
  };

  // Format the reward amount
  const formatRewardAmount = (rewards: Reward[]) => {
    const total = rewards.reduce((sum, reward) => sum + reward.amount, 0);
    return total > 0 ? `${total} credits` : 'Pending';
  };

  // Handle referral status
  const handleReferralStatus = async (referralId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('referrals')
        .update({ status })
        .eq('id', referralId);

      if (error) throw error;
      
      // Refresh referrals
      const updatedReferrals = await fetchReferrals();
      setReferrals(updatedReferrals);
      
      toast.success(`Referral ${status} successfully`);
    } catch (err) {
      console.error('Error updating referral:', err);
      toast.error('Failed to update referral status');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading your rewards...</span>
        </div>
      </Layout>
    );
  }

  // Handle error
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <Card>
            <CardContent className="py-6">
              <div className="text-center text-red-500">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                >
                  Try Again
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // If user has badges, render them
  let badges: any[] = [];
  if (userProfile?.badges) {
    if (Array.isArray(userProfile.badges)) {
      badges = userProfile.badges;
    } else if (typeof userProfile.badges === 'object') {
      badges = Object.values(userProfile.badges);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Your Referrals & Rewards</h1>

        {/* Display user's current credit balance */}
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Current Credits</h2>
                <p className="text-gray-500">Credits earned through referrals and activities</p>
              </div>
              <div className="text-4xl font-bold">{userProfile?.credits || 0}</div>
            </div>
          </CardContent>
        </Card>

        {/* Display referrals */}
        <h2 className="text-2xl font-semibold mb-4">Your Referrals</h2>
        {referrals.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-gray-500">
              You haven't made any referrals yet. Invite friends to earn credits!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referrals.map((referral) => {
              const referralRewards = getRewardsForReferral(referral.id);
              return (
                <Card key={referral.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {referral.referred_user?.avatar_url ? (
                          <img src={referral.referred_user.avatar_url} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl text-gray-500">
                            {(referral.referred_user?.full_name || 'User')[0]?.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="font-medium">{referral.referred_user?.full_name || 'User'}</p>
                        <p className="text-sm text-gray-500">Joined {new Date(referral.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatRewardAmount(referralRewards)}
                        </p>
                        <p className={`text-sm ${
                          referral.status === 'completed' ? 'text-green-500' :
                          referral.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'
                        }`}>
                          {referral.status === 'completed' ? 'Completed' :
                          referral.status === 'pending' ? 'Pending' : referral.status}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreditRedemptionPage;
