
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Search, Star, Ticket, Users, Gift } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CustomerProfileSection = () => {
  const { userProfile, user } = useAuth();
  const [referralCount, setReferralCount] = useState(0);
  const [credits, setCredits] = useState(0);
  
  // Mock customer data
  const favoriteArtists = 3;
  const favoriteSalons = 2;
  const lastAppointment = "2 weeks ago";
  
  // Fetch referral stats
  useEffect(() => {
    if (!user) return;
    
    const fetchReferralStats = async () => {
      const referralCode = userProfile?.affiliate_code || userProfile?.referral_code;
      
      if (!referralCode) return;
      
      try {
        // Get referred users count
        const { count, error: countError } = await supabase
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
        
        setReferralCount(count || 0);
        setCredits(userData?.credits || 0);
      } catch (err) {
        console.error('Unexpected error fetching referral stats:', err);
      }
    };
    
    fetchReferralStats();
    
    // Don't re-run this effect on userProfile changes to prevent fluctuations
  }, [user]);
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-gray-100 shadow-sm hover-scale">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 pb-2">
          <CardTitle className="font-serif text-xl flex items-center">
            <Calendar className="h-5 w-5 text-rose-500 mr-2" />
            Appointment History
          </CardTitle>
          <CardDescription>Your recent beauty services</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {lastAppointment ? (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Last appointment:</p>
              <p className="font-medium">{lastAppointment}</p>
              <div className="mt-4 flex gap-2">
                <Button asChild>
                  <Link to="/appointments/book">Book Next Appointment</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/appointments/history">View History</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">No appointments yet. Ready to book your first one?</p>
              <Button asChild>
                <Link to="/appointments/book">Find Next Appointment</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-100 shadow-sm hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Heart className="h-5 w-5 text-pink-500 mr-2" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between py-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-1">{favoriteArtists}</p>
                <p className="text-gray-500 text-sm">Favorite Artists</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-1">{favoriteSalons}</p>
                <p className="text-gray-500 text-sm">Favorite Salons</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/favorites">Manage Favorites</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-sm hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Gift className="h-5 w-5 text-amber-500 mr-2" />
              Referral Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between py-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-1">{credits}</p>
                <p className="text-gray-500 text-sm">Emvi Credits</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-1">{referralCount}</p>
                <p className="text-gray-500 text-sm">Friends Referred</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/referrals">Invite Friends</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-gray-100 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-serif text-lg text-gray-800 flex items-center">
                <Search className="h-5 w-5 text-violet-500 mr-2" />
                Discover New Services
              </h3>
              <p className="text-gray-600 max-w-md">
                Find new salons, artists, and services near you
              </p>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              Explore Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfileSection;
