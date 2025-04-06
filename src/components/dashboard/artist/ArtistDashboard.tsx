
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import ArtistCreditsRedemption from "./ArtistCreditsRedemption";

const ArtistDashboard = () => {
  const { user, userProfile } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Fetch user profile data from Supabase directly
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Failed to load profile data");
        } else if (data) {
          setProfileData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Format first name for greeting
  const getFirstName = () => {
    // Try to get name from our fetched profile first
    if (profileData?.full_name) {
      return profileData.full_name.split(' ')[0];
    }
    // Fall back to userProfile from context
    if (userProfile?.full_name) {
      return userProfile.full_name.split(' ')[0];
    }
    return "Artist";
  };

  // Get credits safely from either source
  const getCredits = () => {
    // First check profileData (directly from database)
    if (profileData && typeof profileData.credits === 'number') {
      return profileData.credits;
    }
    // Then check userProfile from context
    if (userProfile && typeof userProfile.credits === 'number') {
      return userProfile.credits;
    }
    // Default value
    return 0;
  };

  // Copy referral link
  const handleCopyReferralLink = () => {
    // Get referral code from either source, or generate a placeholder
    const referralCode = 
      profileData?.referral_code || 
      userProfile?.referral_code || 
      userProfile?.affiliate_code || 
      `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
      
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-64"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Card */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-indigo-100">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {getFirstName()}! 👋
          </h1>
          <p className="text-gray-600">
            Your talent deserves to be seen. Let's make it happen today.
          </p>
        </CardContent>
      </Card>
      
      {/* Dashboard Widgets */}
      <div className="mb-8">
        <ArtistDashboardWidgets />
      </div>
      
      {/* Credits and Referrals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Credits */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-amber-100 text-amber-700 p-1 rounded-full mr-2">💳</span>
              Your Emvi Credits
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100 mb-4">
              <div className="text-3xl font-bold text-center text-amber-700">
                {getCredits()}
              </div>
              <p className="text-center text-gray-500 text-sm">Available Credits</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Total Credits</span>
                <span className="font-medium">{getCredits()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Used Credits</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Referral */}
        <Card className="border-indigo-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 p-1 rounded-full mr-2">👥</span>
              Invite & Earn
            </h2>
            <p className="text-gray-600 mb-4">
              Share your referral link with friends and earn 5 Emvi Credits for each sign-up!
            </p>
            <div className="flex">
              <input
                type="text"
                value={`https://emviapp.com/join?ref=${profileData?.referral_code || "INVITE_CODE"}`}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm font-mono"
                readOnly
              />
              <Button 
                variant="default"
                className="rounded-l-none bg-indigo-600 hover:bg-indigo-700" 
                onClick={handleCopyReferralLink}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Redeem Credits Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Redeem Your Credits</h2>
        <ArtistCreditsRedemption credits={getCredits()} />
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Button asChild className="h-auto py-3 bg-purple-600 hover:bg-purple-700">
          <Link to="/portfolio/create">
            <span className="flex flex-col">
              <span className="text-lg">Update Portfolio</span>
              <span className="text-xs font-normal">Showcase your best work</span>
            </span>
          </Link>
        </Button>
        <Button asChild className="h-auto py-3 bg-indigo-600 hover:bg-indigo-700">
          <Link to="/bookings">
            <span className="flex flex-col">
              <span className="text-lg">View Bookings</span>
              <span className="text-xs font-normal">Manage your appointments</span>
            </span>
          </Link>
        </Button>
        <Button asChild className="h-auto py-3 bg-pink-600 hover:bg-pink-700">
          <Link to="/profile/edit">
            <span className="flex flex-col">
              <span className="text-lg">Edit Profile</span>
              <span className="text-xs font-normal">Update your information</span>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ArtistDashboard;
