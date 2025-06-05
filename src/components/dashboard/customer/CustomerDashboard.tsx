import React from 'react';
import { useAuth } from '@/context/auth';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import DashboardGreeting from '@/components/dashboard/common/DashboardGreeting';
import CustomerBookingsSection from './CustomerBookingsSection';
import CustomerFavoritesSection from './favorites/CustomerFavoritesSection';
import CustomerFeedbackCard from './feedback/CustomerFeedbackCard';
import CustomerMilestonesCard from './milestones/CustomerMilestonesCard';
import StickyInviteTracker from './viral/StickyInviteTracker';
import ComingSoonVIPCard from './coming-soon/ComingSoonVIPCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  Star, 
  Crown, 
  Gift, 
  Users, 
  Sparkles, 
  Trophy,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

const CustomerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const { upcomingBookings, favorites, loading } = useCustomerDashboard();

  const referralLink = `https://emviapp.com/join?ref=${userProfile?.referral_code || 'beauty2024'}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on EmviApp!',
        text: 'I found the most amazing beauty platform! Join me and get credits 💎',
        url: referralLink
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardGreeting />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bookings Section */}
            <CustomerBookingsSection upcomingBookings={upcomingBookings} />
            
            {/* Favorites Section */}
            <CustomerFavoritesSection favorites={favorites} />
            
            {/* Milestones & Achievements */}
            <CustomerMilestonesCard />
            
            {/* VIP Coming Soon Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ComingSoonVIPCard
                title="Personal Beauty AI"
                description="Get personalized recommendations based on your style, skin tone, and preferences."
                features={[
                  "AI-powered color matching",
                  "Personalized product suggestions",
                  "Style recommendations",
                  "Trend forecasting"
                ]}
                type="vip"
                estimatedLaunch="Q2 2024"
              />
              
              <ComingSoonVIPCard
                title="Beauty Marketplace"
                description="Exclusive deals on premium beauty products from top brands."
                features={[
                  "Member-only discounts",
                  "Early access to new products",
                  "Professional-grade tools",
                  "Free shipping perks"
                ]}
                type="early-access"
                estimatedLaunch="Q1 2024"
              />
            </div>
          </div>

          {/* Right Column - Engagement & FOMO */}
          <div className="space-y-6">
            {/* Feedback & Feature Voting */}
            <CustomerFeedbackCard />
            
            {/* Profile Completion & Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-blue-500" />
                  Quick Wins
                  <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
                    +Credits
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Complete your profile</span>
                    <span className="text-blue-600 font-medium">+15 credits</span>
                  </div>
                  <Progress value={75} className="h-2 bg-blue-100" />
                </div>
                
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Add Profile Photo (+5 credits)
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-blue-300">
                    Write Bio (+10 credits)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof & Community */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-green-500" />
                  Community Love
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12,847</div>
                  <div className="text-sm text-green-700">Happy customers this month</div>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Sarah M.</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    "Found my dream nail artist in 5 minutes! EmviApp changed my beauty routine completely! 💅✨"
                  </p>
                </div>
                
                <Button size="sm" variant="outline" className="w-full border-green-300">
                  <Heart className="h-4 w-4 mr-2" />
                  Share Your Story (+20 credits)
                </Button>
              </CardContent>
            </Card>

            {/* Surprise & Delight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <CardContent className="p-4 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-bold mb-1">Surprise Unlock!</h3>
                  <p className="text-sm text-purple-100 mb-3">
                    You've been amazing! Here's a special reward 🎁
                  </p>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Claim Mystery Reward
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky Invite Tracker - Bottom Right */}
      <StickyInviteTracker />
    </div>
  );
};

export default CustomerDashboard;
