import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Users, Star, Target, MessageSquare, TrendingUp,
  Award, Plus, Zap, Crown, Sparkles, ChevronRight
} from 'lucide-react';


interface SalonStatsOverviewProps {
  stats: any;
  loading: boolean;
  salonId?: string;
  todayBookings: any[];
  reviews: any[];
  offers: any[];
}

const SalonStatsOverview: React.FC<SalonStatsOverviewProps> = ({ 
  stats, 
  loading, 
  salonId, 
  todayBookings = [], 
  reviews = [], 
  offers = [] 
}) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Today's Schedule */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Schedule
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  {todayBookings.length} bookings
                </Badge>
              </CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayBookings.length > 0 ? (
              todayBookings.slice(0, 3).map((booking, index) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {booking.customer?.full_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="font-medium">{booking.client_name || booking.customer?.full_name || 'Walk-in'}</p>
                      <p className="text-sm text-gray-600">{booking.service_type || 'Service'} • {booking.artist?.full_name || 'Staff'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{booking.appointment_time || 'TBD'}</p>
                    <Badge className={`
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                      ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                      ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
                    `}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No bookings scheduled for today</p>
                <Button className="mt-4" variant="outline">Schedule First Booking</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Reviews */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Recent Reviews
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  {stats.averageRating} avg rating
                </Badge>
              </CardTitle>
              <Button size="sm" variant="outline">
                View All Reviews
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.length > 0 ? (
              reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.customer?.full_name?.charAt(0) || 'C'}
                      </div>
                      <span className="font-medium">{review.customer?.full_name || 'Anonymous'}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.review_text}</p>
                  {!review.response_text && (
                    <Button size="sm" variant="outline" className="mt-2">
                      Reply to Review
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No reviews yet</p>
                <p className="text-sm">Encourage customers to leave reviews!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-500 rounded-lg inline-block mb-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-green-900 mb-1">Messages</h3>
              <p className="text-sm text-green-700">3 unread</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-500 rounded-lg inline-block mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-1">Invite Artist</h3>
              <p className="text-sm text-purple-700">Find talent</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-orange-500 rounded-lg inline-block mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-orange-900 mb-1">Create Offer</h3>
              <p className="text-sm text-orange-700">Boost sales</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-amber-500 rounded-lg inline-block mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-1">AI Insights</h3>
              <p className="text-sm text-amber-700">Get smart tips</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Level Progress */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-yellow-300" />
                <div>
                  <h3 className="text-xl font-bold">Salon Level 3</h3>
                  <p className="text-purple-100">Elite Salon Status</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{stats.totalCredits}</div>
                <div className="text-sm text-purple-100">Credits Available</div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
              <div className="bg-yellow-300 h-3 rounded-full w-3/4"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Progress to Level 4</span>
              <span>750 / 1000 XP</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SalonStatsOverview;