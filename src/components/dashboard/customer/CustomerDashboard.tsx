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

      <motion.div variants={itemVariants}>
        <CustomerReferralCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CustomerLoyaltySection />
      </motion.div>
    </motion.div>
  );
};

export default CustomerDashboard;
