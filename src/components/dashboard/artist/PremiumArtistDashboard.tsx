
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star, 
  BookOpen,
  MessageCircle,
  Settings,
  BarChart3,
  Clock
} from 'lucide-react';
import ArtistDashboardWidgets from './ArtistDashboardWidgets';
import PremiumBookingCalendar from './calendar/PremiumBookingCalendar';
import PremiumBookingsManager from './bookings/PremiumBookingsManager';
import { useArtistData } from './context/ArtistDataContext';

const PremiumArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { artistProfile } = useArtistData();

  const tabs = [
    { id: 'overview', label: 'Empire Overview', icon: BarChart3 },
    { id: 'calendar', label: 'Booking Calendar', icon: Calendar },
    { id: 'bookings', label: 'Manage Bookings', icon: BookOpen },
    { id: 'earnings', label: 'Revenue Center', icon: DollarSign },
    { id: 'clients', label: 'Client Empire', icon: Users },
    { id: 'portfolio', label: 'Showcase', icon: Star },
    { id: 'messages', label: 'Communications', icon: MessageCircle },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Premium stats for demonstration
  const premiumStats = {
    monthlyRevenue: 12450,
    growthRate: 34,
    clientCount: 89,
    rating: 4.9,
    bookingRate: 92
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/50 to-pink-50/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-800 text-white"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Welcome back, {artistProfile?.full_name?.split(' ')[0] || 'Artist'}
                  </h1>
                  <p className="text-purple-200">Your beauty empire awaits</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-amber-500 text-white border-0 px-3 py-1">
                  💎 Diamond Tier
                </Badge>
                <Badge className="bg-emerald-500 text-white border-0 px-3 py-1">
                  🔥 Top Performer
                </Badge>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">${premiumStats.monthlyRevenue.toLocaleString()}</div>
                <div className="text-sm text-purple-200">Monthly Revenue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">+{premiumStats.growthRate}%</div>
                <div className="text-sm text-purple-200">Growth Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{premiumStats.rating}</div>
                <div className="text-sm text-purple-200">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium Navigation */}
      <motion.div 
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-shrink-0 px-6 py-4 rounded-none border-b-2 transition-all
                    ${activeTab === tab.id 
                      ? 'border-purple-600 text-purple-600 bg-purple-50' 
                      : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                    }
                  `}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        className="container mx-auto px-6 py-8"
        variants={itemVariants}
      >
        {activeTab === 'overview' && <ArtistDashboardWidgets />}
        {activeTab === 'calendar' && <PremiumBookingCalendar />}
        {activeTab === 'bookings' && <PremiumBookingsManager />}
        {activeTab === 'earnings' && (
          <div className="text-center py-20">
            <DollarSign className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
            <h3 className="text-2xl font-bold mb-2">Revenue Center</h3>
            <p className="text-gray-600">Advanced earnings analytics coming soon</p>
          </div>
        )}
        {activeTab === 'clients' && (
          <div className="text-center py-20">
            <Users className="h-16 w-16 mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold mb-2">Client Empire</h3>
            <p className="text-gray-600">Advanced client management coming soon</p>
          </div>
        )}
        {activeTab === 'portfolio' && (
          <div className="text-center py-20">
            <Star className="h-16 w-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-2xl font-bold mb-2">Portfolio Showcase</h3>
            <p className="text-gray-600">Advanced portfolio management coming soon</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="text-center py-20">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-purple-500" />
            <h3 className="text-2xl font-bold mb-2">Communications Hub</h3>
            <p className="text-gray-600">Advanced messaging system coming soon</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PremiumArtistDashboard;
