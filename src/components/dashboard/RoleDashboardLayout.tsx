
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  DollarSign,
  Target,
  Zap,
  Crown
} from 'lucide-react';

const RoleDashboardLayout = () => {
  const { userRole, userProfile } = useAuth();
  
  // Get role-specific greeting
  const getRoleGreeting = () => {
    switch (userRole) {
      case 'owner':
      case 'salon':
        return 'Salon Owner';
      case 'supplier':
      case 'vendor':
      case 'beauty supplier':
        return 'Beauty Supplier';
      case 'customer':
        return 'Beauty Enthusiast';
      case 'artist':
      case 'nail technician/artist':
      case 'freelancer':
        return 'Beauty Artist';
      default:
        return 'Beauty Professional';
    }
  };

  // Feature cards based on role
  const getFeatureCards = () => {
    if (userRole === 'owner' || userRole === 'salon') {
      return [
        {
          icon: Users,
          title: 'Team Management',
          description: 'Manage your staff and their schedules',
          value: '12 Active',
          color: 'text-blue-600'
        },
        {
          icon: Calendar,
          title: 'Bookings Today',
          description: 'Appointments scheduled for today',
          value: '24 Booked',
          color: 'text-green-600'
        },
        {
          icon: DollarSign,
          title: 'Revenue This Month',
          description: 'Total earnings for the current month',
          value: '$12,450',
          color: 'text-purple-600'
        },
        {
          icon: TrendingUp,
          title: 'Growth Rate',
          description: 'Month-over-month growth',
          value: '+23%',
          color: 'text-emerald-600'
        }
      ];
    }
    
    // Default feature cards for other roles
    return [
      {
        icon: Star,
        title: 'Profile Views',
        description: 'People who viewed your profile',
        value: '156',
        color: 'text-yellow-600'
      },
      {
        icon: Target,
        title: 'Goals Completed',
        description: 'Monthly objectives achieved',
        value: '8/10',
        color: 'text-blue-600'
      },
      {
        icon: Zap,
        title: 'Active Projects',
        description: 'Current ongoing projects',
        value: '4',
        color: 'text-orange-600'
      },
      {
        icon: Crown,
        title: 'Premium Status',
        description: 'Your membership level',
        value: 'Active',
        color: 'text-purple-600'
      }
    ];
  };

  const featureCards = getFeatureCards();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile?.full_name || 'Beauty Professional'}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {getRoleGreeting()}
                </Badge>
                {userProfile?.is_premium && (
                  <Badge className="bg-gradient-to-r from-gold to-yellow-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featureCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{card.value}</div>
                <p className="text-xs text-gray-500">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Dashboard Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Dashboard Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">
                  Your Billion-Dollar Beauty Empire Starts Here
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  This is your new command center. Advanced features and analytics are being built to help you dominate the beauty industry.
                </p>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2">
                  Coming Soon: Advanced Analytics
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Side Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Get personalized recommendations for your business growth.
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  Coming Soon
                </Badge>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Smart Scheduling</h4>
                <p className="text-sm text-green-700 mb-3">
                  AI-powered appointment optimization and client management.
                </p>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  In Development
                </Badge>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Revenue Insights</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Advanced analytics to maximize your earning potential.
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  Beta Testing
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
