
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/context/auth/types";

// Import all the component sections we've created
import ArtistWelcomeBanner from "./ArtistWelcomeBanner";
import ArtistDashboardProfile from "./ArtistDashboardProfile";
import ArtistPerformanceMetrics from "./ArtistPerformanceMetrics";
import ArtistToolkitSection from "./ArtistToolkitSection";
import DashboardStatusWidgets from "./DashboardStatusWidgets";
import ArtistPortfolioGrid from "./ArtistPortfolioGrid";
import ArtistServicesGrid from "./ArtistServicesGrid";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistCreditsRedemption from "./ArtistCreditsRedemption";
import ArtistBookingCalendar from "./ArtistBookingCalendar";
import ArtistUpgradeSection from "./ArtistUpgradeSection";

const ArtistDashboard = () => {
  const { user, userProfile: authUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artistProfile, setArtistProfile] = useState<UserProfile | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Fetch user profile data from Supabase
  useEffect(() => {
    const fetchArtistProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching artist profile:', error);
          setError('Failed to load your profile data. Please try again later.');
          toast.error('Could not load profile data');
        } else if (data) {
          // Cast to match UserProfile type, adding missing referral_count property
          const profileWithReferrals = {
            ...data,
            referral_count: data.credits || 0,
            affiliate_code: data.referral_code || '',
          } as UserProfile;
          
          setArtistProfile(profileWithReferrals);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again later.');
        toast.error('Could not load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtistProfile();
  }, [user]);
  
  // Copy referral link
  const handleCopyReferralLink = () => {
    const referralCode = artistProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  // Format first name for greeting
  const firstName = artistProfile?.full_name ? artistProfile.full_name.split(' ')[0] : "Artist";
  
  // Show loading state
  if (loading && !artistProfile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error && !artistProfile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Couldn't Load Your Dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Get credits from the raw database data to avoid TypeScript errors
  const userCredits = artistProfile?.referral_count || 0;
  
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 1. Welcome Banner */}
      <ArtistWelcomeBanner firstName={firstName} />
      
      {/* 2. Profile Header */}
      <ArtistDashboardProfile artistProfile={artistProfile} />
      
      {/* 3. Performance Metrics */}
      <ArtistPerformanceMetrics profileViews={artistProfile?.profile_views || 245} />
      
      {/* 4. Artist Toolkit */}
      <ArtistToolkitSection onCopyReferralLink={handleCopyReferralLink} />
      
      {/* 5. Dashboard Status Widgets */}
      <DashboardStatusWidgets />
      
      {/* 6. Portfolio Grid */}
      <ArtistPortfolioGrid />
      
      {/* 7. Services Grid */}
      <ArtistServicesGrid />
      
      {/* 8. Referral Center */}
      <ArtistReferralCenter />
      
      {/* 9. NEW - Credits Redemption Section */}
      <section className="mb-8" id="credits-redemption">
        <h2 className="text-xl font-serif font-semibold mb-4">Redeem Emvi Credits</h2>
        <ArtistCreditsRedemption credits={userCredits} />
      </section>
      
      {/* 10. Booking Calendar */}
      <section className="mb-8" id="calendar">
        <h2 className="text-xl font-serif font-semibold mb-4">Booking Calendar</h2>
        <ArtistBookingCalendar />
      </section>
      
      {/* 11. Upgrade Section */}
      <section id="upgrade">
        <h2 className="text-xl font-serif font-semibold mb-4">Unlock Premium Features</h2>
        <ArtistUpgradeSection />
      </section>
    </div>
  );
};

export default ArtistDashboard;
