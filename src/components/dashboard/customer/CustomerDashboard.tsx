
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Heart, 
  Users, 
  Gift, 
  Star, 
  TrendingUp, 
  Share2, 
  Sparkles, 
  Crown, 
  Zap,
  Lock,
  Eye,
  MessageCircle,
  Award,
  Target,
  ChevronRight,
  Copy,
  Send
} from 'lucide-react';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import CustomerWelcomeHeader from './CustomerWelcomeHeader';
import CustomerBookingsSection from './CustomerBookingsSection';
import CustomerFavoritesSection from './favorites/CustomerFavoritesSection';
import CustomerReferralCard from './CustomerReferralCard';
import CustomerLoyaltySection from './loyalty/CustomerLoyaltySection';
import CustomerFeedbackCard from './feedback/CustomerFeedbackCard';
import CustomerMilestonesCard from './milestones/CustomerMilestonesCard';
import StickyInviteTracker from './viral/StickyInviteTracker';
import ComingSoonVIPCard from './coming-soon/ComingSoonVIPCard';
import { toast } from 'sonner';

const CustomerDashboard: React.FC = () => {
  const { 
    bookings, 
    upcomingBookings, 
    previousBookings, 
    favorites, 
    loading, 
    error 
  } = useCustomerDashboard();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Loading Dashboard...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Fetching your data, please wait.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="container mx-auto p-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <CustomerWelcomeHeader />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomerBookingsSection 
            upcomingBookings={upcomingBookings} 
            previousBookings={previousBookings}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomerFavoritesSection favorites={favorites} />
        </motion.div>

        {/* New FOMO Features Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerFeedbackCard />
          <CustomerMilestonesCard />
        </motion.div>

        {/* Coming Soon VIP Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComingSoonVIPCard
            title="AI Beauty Assistant"
            description="Get personalized beauty recommendations powered by AI"
            features={[
              "Custom skincare routines",
              "AI-powered style matching",
              "Virtual consultations",
              "Trend predictions"
            ]}
            estimatedLaunch="Q2 2024"
            type="beta"
          />
          <ComingSoonVIPCard
            title="VIP Concierge Service"
            description="Personal beauty concierge for ultimate luxury experience"
            features={[
              "24/7 personal assistant",
              "Exclusive salon access",
              "Priority booking guarantee",
              "Luxury gift packages"
            ]}
            estimatedLaunch="Coming Soon"
            type="vip"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomerReferralCard />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomerLoyaltySection />
        </motion.div>

        {/* Achievement Share Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Trophy className="h-6 w-6" />
                    Share Your Beauty Journey
                  </h3>
                  <p className="text-emerald-100 mb-4">
                    Inspire others and earn 10 credits for every share that gets engagement!
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-emerald-600 hover:bg-gray-100"
                    onClick={() => toast.success('Shareable achievement card coming soon! 🎉')}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Create Achievement Card
                  </Button>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl"
                >
                  ✨
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Quote with Special Offer */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">
                  "Your beauty journey is just beginning..."
                </h3>
                <p className="text-pink-100 mb-4 text-lg">
                  Every booking brings you closer to discovering your true radiance ✨
                </p>
                <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                  🔥 Limited Time: Book today & get 2x credits on your next service!
                </Badge>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Sticky Invite Tracker */}
      <StickyInviteTracker />
    </>
  );
};

export default CustomerDashboard;
