
import React from "react";
import CustomerWelcomeHeader from "./CustomerWelcomeHeader";
import CustomerReferralCard from "./CustomerReferralCard";
import CustomerBookingsCenter from "./bookings/CustomerBookingsCenter";
import CustomerLoyaltySection from "./loyalty/CustomerLoyaltySection";
import CustomerFavoritesSection from "./favorites/CustomerFavoritesSection";
import RecommendedServicesSection from "./services/RecommendedServicesSection";
import SuggestedServicesSection from "./services/SuggestedServicesSection";
import CustomerBrowseCategories from "./categories/CustomerBrowseCategories";
import CustomerGlamGoalsPanel from "./glam-goals/CustomerGlamGoalsPanel";
import InviteSalonSection from "./InviteSalonSection";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Crown, Gift, Heart, Calendar, Users, Zap, Lock } from "lucide-react";

const CustomerDashboard: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      {/* Premium Welcome Header */}
      <CustomerWelcomeHeader />

      {/* Referral Credits Card */}
      <TooltipProvider>
        <CustomerReferralCard />
      </TooltipProvider>

      <div className="space-y-8 md:space-y-12">
        {/* Bookings Panel with Tabs */}
        <CustomerBookingsCenter />

        {/* Invite Artists/Salons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InviteSalonSection />
          
          {/* Invite Artist Card */}
          <Card className="border-gradient-to-r from-purple-200 to-pink-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-purple-500" />
                Invite an Artist
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 ml-auto">
                  <Gift className="h-3 w-3 mr-1" />
                  +15 Credits
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Know a talented nail artist? Invite them to join EmviApp and get priority booking access!
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Share Invite Link
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  <Crown className="h-3 w-3 inline mr-1" />
                  Get VIP status when your artist joins
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loyalty & Credits Section */}
        <CustomerLoyaltySection />

        {/* Smart Booking Suggestions */}
        <SuggestedServicesSection />

        {/* Browse Categories */}
        <CustomerBrowseCategories />

        {/* Glam Goals Panel */}
        <CustomerGlamGoalsPanel />

        {/* Coming Soon FOMO Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Premium Membership */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge className="bg-amber-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Star className="h-5 w-5" />
                VIP Membership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700 mb-4">
                Get priority booking, exclusive discounts, and VIP treatment at partner salons.
              </p>
              <Button disabled className="w-full" variant="outline">
                <Lock className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* AI Style Recommendations */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-500 text-white">
                <Zap className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Zap className="h-5 w-5" />
                AI Style Match
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700 mb-4">
                Get personalized nail art recommendations based on your style preferences and occasions.
              </p>
              <Button disabled className="w-full" variant="outline">
                <Lock className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Beauty Calendar */}
          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge className="bg-pink-500 text-white">
                <Calendar className="h-3 w-3 mr-1" />
                Smart
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-800">
                <Calendar className="h-5 w-5" />
                Beauty Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-pink-700 mb-4">
                Plan your beauty routine with smart reminders for touch-ups, special occasions, and seasonal trends.
              </p>
              <Button disabled className="w-full" variant="outline">
                <Lock className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Section */}
        <CustomerFavoritesSection />

        {/* Help & Support Section */}
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Heart className="h-5 w-5 text-red-500" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Calendar className="h-6 w-6 text-blue-500" />
                <span>Booking Help</span>
                <span className="text-xs text-muted-foreground">Get help with appointments</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Users className="h-6 w-6 text-green-500" />
                <span>Find Artists</span>
                <span className="text-xs text-muted-foreground">Discover new talent</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Gift className="h-6 w-6 text-purple-500" />
                <span>Rewards Help</span>
                <span className="text-xs text-muted-foreground">Learn about credits</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
