
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Plus, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ArtistBookingWidget = () => {
  // Mock upcoming bookings - in real app this would come from API
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Sarah Chen",
      service: "Gel Manicure + Art",
      date: "Today",
      time: "2:30 PM",
      duration: "1h 30m",
      price: "$85",
      status: "confirmed",
      clientAvatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png"
    },
    {
      id: 2,
      clientName: "Maria Rodriguez",
      service: "French Manicure",
      date: "Tomorrow",
      time: "11:00 AM",
      duration: "1h",
      price: "$65",
      status: "confirmed",
      clientAvatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png"
    },
    {
      id: 3,
      clientName: "Jessica Kim",
      service: "Full Set + Design",
      date: "Wed",
      time: "3:00 PM",
      duration: "2h",
      price: "$120",
      status: "pending",
      clientAvatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png"
    }
  ];

  const hasBookings = upcomingBookings.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            📅
          </motion.div>
          <h3 className="text-xl font-bold text-white">Upcoming Bookings</h3>
          {hasBookings && (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              {upcomingBookings.length} this week
            </Badge>
          )}
        </div>
      </div>

      {hasBookings ? (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <div className="p-5">
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    booking.status === 'confirmed' 
                      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30' 
                      : 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.clientAvatar}
                      alt={booking.clientName}
                      className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-white">
                          {booking.clientName}
                        </div>
                        <div className="text-lg font-bold text-green-300">
                          {booking.price}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-300 mb-2">
                        {booking.service}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {booking.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {booking.status === 'pending' && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        Reschedule
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Schedule
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Phone className="h-4 w-4" />
              </Button>
            </div>

            {/* Weekly Earnings */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-200">This Week's Earnings</div>
                  <div className="text-2xl font-bold text-white">$270</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-200">+24% vs last week</div>
                  <div className="text-xs text-green-300">🔥 On fire!</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Ready for Bookings! 📅
              </h4>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Your calendar is open and ready. Share your profile to start getting booked by amazing clients!
              </p>
            </motion.div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 mb-4">
              <Plus className="h-5 w-5 mr-2" />
              Share Your Profile
            </Button>
            
            <div className="text-xs text-blue-200 mb-4">
              💡 Tip: Artists who share get their first booking within 24 hours!
            </div>

            {/* FOMO Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-lg font-bold text-white">127</div>
                <div className="text-xs text-blue-200">Clients nearby</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-lg font-bold text-white">$85</div>
                <div className="text-xs text-blue-200">Avg. booking</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
              <div className="text-sm text-green-200">
                🚀 <span className="font-semibold text-white">Maria got 5 bookings in her first week!</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistBookingWidget;
