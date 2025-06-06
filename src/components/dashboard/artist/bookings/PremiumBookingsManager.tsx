
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Search, 
  Filter, 
  TrendingUp, 
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useArtistBookings } from "@/hooks/artist/hooks/useArtistBookings";

const PremiumBookingsManager = () => {
  const { bookings, loading } = useArtistBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock premium analytics
  const analytics = {
    totalRevenue: bookings.length * 75,
    averageBookingValue: 75,
    completionRate: 94,
    rebookingRate: 67
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'accepted':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (booking.client_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (booking.service_type || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Analytics Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <DollarSign className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Revenue</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">${analytics.averageBookingValue}</div>
              <div className="text-sm opacity-90">Avg Booking</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <CheckCircle className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">{analytics.completionRate}%</div>
              <div className="text-sm opacity-90">Completion Rate</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <Users className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">{analytics.rebookingRate}%</div>
              <div className="text-sm opacity-90">Rebook Rate</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bookings Management */}
      <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Premium Bookings Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-purple-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('confirmed')}
              >
                Confirmed
              </Button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {(booking.client_name || 'C')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-900">
                          {booking.client_name || 'Client'}
                        </div>
                        <div className="text-gray-600">
                          {booking.service_type || 'Service'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {booking.date_requested 
                            ? new Date(booking.date_requested).toLocaleDateString()
                            : 'Date TBD'}
                          <Clock className="h-4 w-4 ml-2" />
                          {booking.time_requested || booking.appointment_time || 'Time TBD'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          ${Math.floor(Math.random() * 100) + 50}
                        </div>
                        <div className="text-sm text-gray-500">Service Fee</div>
                      </div>
                      <Badge 
                        className={`flex items-center gap-1 px-3 py-1 ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">No bookings found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumBookingsManager;
