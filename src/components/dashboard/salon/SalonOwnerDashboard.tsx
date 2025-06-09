
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Bell,
  Plus,
  MessageCircle,
  BarChart3,
  Gift,
  Crown,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const SalonOwnerDashboard = () => {
  const { user, userProfile, userRole } = useAuth();
  
  // GIANT DEBUG BANNER AND CONSOLE LOG
  console.log('🚨 RENDERING DASHBOARD FOR ROLE:', userRole, '— USING FILE: SalonOwnerDashboard.tsx (src/components/dashboard/salon/SalonOwnerDashboard.tsx)');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-6 text-center shadow-xl">
        <h1 className="text-4xl font-black mb-2">🏢 SALON OWNER DASHBOARD LOADED</h1>
        <p className="text-xl font-bold">FILE: SalonOwnerDashboard.tsx</p>
        <p className="text-lg">PATH: src/components/dashboard/salon/SalonOwnerDashboard.tsx</p>
        <p className="text-lg">USER ROLE: {userRole} | USER: {user?.email}</p>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={userProfile?.avatar_url} />
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {userProfile?.salon_name?.[0] || 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {userProfile?.salon_name || 'Your Premium Salon'}
              </h1>
              <p className="text-xl opacity-90 mb-4">
                Welcome back! Your business is thriving ✨
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Los Angeles, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>12 Staff Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">$12,450</div>
              <div className="text-sm opacity-80">This Month</div>
              <Badge className="mt-2 bg-green-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23%
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Today\'s Bookings', value: '24', icon: Calendar, color: 'from-blue-500 to-blue-600', change: '+12%' },
            { label: 'Active Staff', value: '12', icon: Users, color: 'from-green-500 to-green-600', change: '+2' },
            { label: 'Monthly Revenue', value: '$12.4K', icon: DollarSign, color: 'from-purple-500 to-purple-600', change: '+23%' },
            { label: 'Client Reviews', value: '98', icon: Star, color: 'from-yellow-500 to-yellow-600', change: '+15' }
          ].map((stat, idx) => (
            <Card key={idx} className="relative overflow-hidden border-0 shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 bg-gradient-to-br ${stat.color} text-white p-1.5 rounded-lg`} />
                  <Badge variant="secondary" className="text-green-600 bg-green-50">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Operations Center */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-6 h-6" />
              Operations Center
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: 'Add Booking', icon: Plus, color: 'bg-blue-500' },
                { label: 'Manage Staff', icon: Users, color: 'bg-green-500' },
                { label: 'Calendar', icon: Calendar, color: 'bg-purple-500' },
                { label: 'Reviews', icon: Star, color: 'bg-yellow-500' },
                { label: 'Messages', icon: MessageCircle, color: 'bg-pink-500' },
                { label: 'Analytics', icon: BarChart3, color: 'bg-indigo-500' }
              ].map((action, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`${action.color} text-white p-3 rounded-full group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FOMO & Growth Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Staff Referral Rewards</h3>
                  <p className="text-sm text-gray-600">Earn $100 for each staff member you onboard!</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress to next reward</span>
                  <span className="text-sm font-semibold">2/3 referrals</span>
                </div>
                <Progress value={67} className="h-3" />
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Invite Staff Member
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">VIP Upgrade Available</h3>
                  <p className="text-sm text-gray-600">Unlock premium features & analytics</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-purple-600">$49/month</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Advanced Analytics</li>
                  <li>• SMS Marketing</li>
                  <li>• Priority Support</li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Upgrade Now
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Live Activity Feed
              <Badge className="ml-auto bg-red-500 text-white animate-pulse">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { text: 'New booking: Sarah M. scheduled for tomorrow', time: '2 min ago', color: 'bg-green-100 text-green-800' },
                { text: 'Staff member Jessica received 5-star review', time: '5 min ago', color: 'bg-yellow-100 text-yellow-800' },
                { text: 'Payment received: $125 from client booking', time: '12 min ago', color: 'bg-blue-100 text-blue-800' },
                { text: 'New staff application received', time: '1 hour ago', color: 'bg-purple-100 text-purple-800' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge className={activity.color}>
                    New
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Coming Soon - VIP Early Access
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'AI Analytics', desc: 'Predictive business insights', icon: BarChart3 },
                { title: 'POS System', desc: 'Integrated point of sale', icon: DollarSign },
                { title: 'SMS Marketing', desc: 'Automated client campaigns', icon: Phone }
              ].map((feature, idx) => (
                <div key={idx} className="p-4 rounded-xl border-2 border-dashed border-gray-300 text-center opacity-75">
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <h4 className="font-semibold text-gray-700">{feature.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">{feature.desc}</p>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
