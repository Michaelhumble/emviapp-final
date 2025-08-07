import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Users, Calendar, Eye, Heart, Share2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { analytics } from '@/lib/analytics';

interface ConversionMetrics {
  viewToBooking: number;
  bookingCompletion: number;
  repeatBookingRate: number;
  referralConversion: number;
  socialShareRate: number;
  reviewConversion: number;
  loyaltyRetention: number;
}

interface UserFunnelData {
  pageViews: number;
  profileViews: number;
  bookingAttempts: number;
  completedBookings: number;
  referralsSent: number;
  referralsConverted: number;
  sharesCount: number;
  reviewsWritten: number;
}

const ConversionAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<ConversionMetrics>({
    viewToBooking: 0,
    bookingCompletion: 0,
    repeatBookingRate: 0,
    referralConversion: 0,
    socialShareRate: 0,
    reviewConversion: 0,
    loyaltyRetention: 0,
  });
  const [funnelData, setFunnelData] = useState<UserFunnelData>({
    pageViews: 0,
    profileViews: 0,
    bookingAttempts: 0,
    completedBookings: 0,
    referralsSent: 0,
    referralsConverted: 0,
    sharesCount: 0,
    reviewsWritten: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadConversionData();
    }
  }, [user]);

  const loadConversionData = async () => {
    try {
      setLoading(true);
      
      // Simulate analytics data - in production, this would fetch from analytics service
      const mockFunnelData: UserFunnelData = {
        pageViews: 245,
        profileViews: 89,
        bookingAttempts: 23,
        completedBookings: 18,
        referralsSent: 12,
        referralsConverted: 4,
        sharesCount: 31,
        reviewsWritten: 15,
      };

      // Calculate conversion rates
      const calculatedMetrics: ConversionMetrics = {
        viewToBooking: mockFunnelData.profileViews > 0 ? (mockFunnelData.bookingAttempts / mockFunnelData.profileViews) * 100 : 0,
        bookingCompletion: mockFunnelData.bookingAttempts > 0 ? (mockFunnelData.completedBookings / mockFunnelData.bookingAttempts) * 100 : 0,
        repeatBookingRate: mockFunnelData.completedBookings > 0 ? 65 : 0, // Mock repeat rate
        referralConversion: mockFunnelData.referralsSent > 0 ? (mockFunnelData.referralsConverted / mockFunnelData.referralsSent) * 100 : 0,
        socialShareRate: mockFunnelData.pageViews > 0 ? (mockFunnelData.sharesCount / mockFunnelData.pageViews) * 100 : 0,
        reviewConversion: mockFunnelData.completedBookings > 0 ? (mockFunnelData.reviewsWritten / mockFunnelData.completedBookings) * 100 : 0,
        loyaltyRetention: 78, // Mock retention rate
      };

      setFunnelData(mockFunnelData);
      setMetrics(calculatedMetrics);
      
      // Track analytics view (placeholder)
      console.log('Analytics viewed:', { userId: user?.id });
    } catch (error) {
      console.error('Error loading conversion analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMetricColor = (value: number, thresholds: { good: number; excellent: number }) => {
    if (value >= thresholds.excellent) return 'text-green-500';
    if (value >= thresholds.good) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-8 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <TrendingUp className="h-5 w-5 mr-2" />
          Conversion Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 text-center"
          >
            <Target className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className={`text-xl font-bold ${getMetricColor(metrics.viewToBooking, { good: 15, excellent: 25 })}`}>
              {formatPercentage(metrics.viewToBooking)}
            </div>
            <div className="text-xs opacity-75">View → Booking</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-lg p-4 text-center"
          >
            <Calendar className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className={`text-xl font-bold ${getMetricColor(metrics.bookingCompletion, { good: 70, excellent: 85 })}`}>
              {formatPercentage(metrics.bookingCompletion)}
            </div>
            <div className="text-xs opacity-75">Booking Complete</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-lg p-4 text-center"
          >
            <Users className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className={`text-xl font-bold ${getMetricColor(metrics.referralConversion, { good: 25, excellent: 40 })}`}>
              {formatPercentage(metrics.referralConversion)}
            </div>
            <div className="text-xs opacity-75">Referral Success</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-lg p-4 text-center"
          >
            <Heart className="h-6 w-6 mx-auto mb-2 text-pink-400" />
            <div className={`text-xl font-bold ${getMetricColor(metrics.loyaltyRetention, { good: 60, excellent: 80 })}`}>
              {formatPercentage(metrics.loyaltyRetention)}
            </div>
            <div className="text-xs opacity-75">Retention Rate</div>
          </motion.div>
        </div>

        {/* Funnel Visualization */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold mb-3 flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Your Conversion Funnel
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Page Views</span>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                {funnelData.pageViews}
              </Badge>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs">Profile Views</span>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                {funnelData.profileViews}
              </Badge>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                style={{ width: `${(funnelData.profileViews / funnelData.pageViews) * 100}%` }} 
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs">Booking Attempts</span>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                {funnelData.bookingAttempts}
              </Badge>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" 
                style={{ width: `${(funnelData.bookingAttempts / funnelData.pageViews) * 100}%` }} 
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs">Completed Bookings</span>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                {funnelData.completedBookings}
              </Badge>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" 
                style={{ width: `${(funnelData.completedBookings / funnelData.pageViews) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2 text-yellow-400" />
            Optimization Tips
          </h4>
          
          {metrics.viewToBooking < 25 && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-xs text-yellow-200">
                💡 Improve your profile completeness to increase booking conversions
              </p>
            </div>
          )}
          
          {metrics.referralConversion < 30 && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-xs text-blue-200">
                🚀 Share more personalized referral messages to boost conversion
              </p>
            </div>
          )}
          
          {metrics.reviewConversion < 80 && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-xs text-green-200">
                ⭐ Follow up with review reminders to earn more points and credibility
              </p>
            </div>
          )}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          onClick={() => console.log('Optimization clicked')}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Analytics Success
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConversionAnalytics;