
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  Award, 
  Gift, 
  Bell,
  Plus,
  UserPlus,
  MessageSquare,
  Settings,
  Target,
  Zap,
  Crown,
  Share2,
  ChevronRight,
  MapPin,
  Clock,
  Trophy,
  Heart,
  Sparkles,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SalonOwnerDashboard = () => {
  const { user, userProfile, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [voteCount, setVoteCount] = useState(127);

  // Console log for debugging
  console.log('SalonOwnerDashboard rendered for user:', user?.email, userRole);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setVoteCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (feature: string) => {
    setVoteCount(prev => prev + 1);
    toast.success(`Voted for ${feature}! ${voteCount + 1} total votes.`);
  };

  const handleQuickAction = (action: string) => {
    toast.info(`${action} - Coming soon in next update!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Router Error Fixed Banner */}
      <div className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center font-bold shadow-lg">
        ✅ Router Error Fixed — No More Nested Router! ✅
      </div>

      {/* Debug Banner */}
      <div className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-center font-bold shadow-lg">
        🏢 SALON OWNER DASHBOARD LOADED SUCCESSFULLY 🏢
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white/20">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-white/20 text-white text-xl">
                      {userProfile?.full_name?.[0] || user?.email?.[0] || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Welcome back, {userProfile?.full_name || userProfile?.salon_name || 'Salon Owner'}! 👑
                    </h1>
                    <p className="text-white/80 text-lg">
                      Your salon empire is thriving. Let's make today even better.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">$2,847</div>
                    <div className="text-sm text-white/80">Today's Revenue</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-white/80">Appointments</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm text-white/80">Rating</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-white/80">Active Staff</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FOMO & Viral Growth Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">#1 Trending Salon</h3>
                  <p className="text-white/80">This week in your area!</p>
                </div>
              </div>
              <Button className="w-full bg-white text-orange-600 hover:bg-white/90">
                <Share2 className="h-4 w-4 mr-2" />
                Share Success
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Invite Staff</h3>
                  <p className="text-white/80">Earn $25 per referral</p>
                </div>
              </div>
              <Progress value={67} className="mb-4 bg-white/20" />
              <Button 
                className="w-full bg-white text-emerald-600 hover:bg-white/90"
                onClick={() => handleQuickAction('Staff Invite')}
              >
                <Gift className="h-4 w-4 mr-2" />
                Invite & Earn
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Refer a Salon</h3>
                  <p className="text-white/80">Get $50 credit</p>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">3/5 referrals</div>
              <Button 
                className="w-full bg-white text-rose-600 hover:bg-white/90"
                onClick={() => handleQuickAction('Salon Referral')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Refer Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Operations
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Intelligence
            </TabsTrigger>
            <TabsTrigger value="coming-soon" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Coming Soon
            </TabsTrigger>
            <TabsTrigger value="inspiration" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Inspiration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Operations Command Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    Staff Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gold text-white">🥇</Badge>
                        <span className="font-medium">Sarah M.</span>
                      </div>
                      <span className="text-green-600 font-bold">47 bookings</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-400 text-white">🥈</Badge>
                        <span className="font-medium">Mike L.</span>
                      </div>
                      <span className="text-blue-600 font-bold">41 bookings</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-400 text-white">🥉</Badge>
                        <span className="font-medium">Jenny K.</span>
                      </div>
                      <span className="text-purple-600 font-bold">38 bookings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-green-500 rounded"></div>
                      <div>
                        <div className="font-medium">9:00 AM - Maria S.</div>
                        <div className="text-sm text-gray-600">Manicure + Pedicure</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-blue-500 rounded"></div>
                      <div>
                        <div className="font-medium">11:30 AM - John D.</div>
                        <div className="text-sm text-gray-600">Nail Art Design</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-purple-500 rounded"></div>
                      <div>
                        <div className="font-medium">2:00 PM - Lisa R.</div>
                        <div className="text-sm text-gray-600">Full Set Acrylics</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleQuickAction('Add Booking')}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Book Client
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickAction('Add Staff')}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add Staff
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleQuickAction('Send Announcement')}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Announce
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickAction('Request Supplies')}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Supplies
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-red-600" />
                    Next Milestone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">4.9★</div>
                    <p className="text-sm text-gray-600 mb-3">Unlock homepage feature!</p>
                    <Progress value={87} className="mb-3" />
                    <p className="text-xs text-gray-500">13% away from goal</p>
                    <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                      <Crown className="h-4 w-4 mr-1" />
                      Boost Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Activity Feed */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                  >
                    <Star className="h-5 w-5 text-green-600" />
                    <span><strong>Sarah M.</strong> just received a 5-star review from Maria S.!</span>
                    <Badge className="bg-green-600 text-white">+$5 bonus</Badge>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>New client <strong>Jennifer L.</strong> booked with Mike for tomorrow 2 PM</span>
                    <Badge className="bg-blue-600 text-white">New Client</Badge>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                  >
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <span><strong>Jenny K.</strong> reached 50 completed services this month!</span>
                    <Badge className="bg-purple-600 text-white">Achievement</Badge>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Staff Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage your team, schedules, and payroll</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Team
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Service Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Update pricing and service offerings</p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Services
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">$18,492</div>
                  <div className="text-blue-100">Monthly Revenue</div>
                  <div className="text-sm text-blue-200 mt-1">↗ +23% vs last month</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-emerald-100">Total Clients</div>
                  <div className="text-sm text-emerald-200 mt-1">↗ +12% new clients</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-purple-100">Average Rating</div>
                  <div className="text-sm text-purple-200 mt-1">247 reviews this month</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-orange-100">Return Rate</div>
                  <div className="text-sm text-orange-200 mt-1">Clients come back</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coming-soon" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'POS Integration', icon: DollarSign, votes: 89 },
                { name: 'SMS Marketing', icon: MessageSquare, votes: 76 },
                { name: 'Calendar Sync', icon: Calendar, votes: 124 },
                { name: 'QuickBooks Export', icon: BarChart3, votes: 45 },
                { name: 'Payroll Management', icon: Users, votes: 67 },
                { name: 'Auto Client Invites', icon: UserPlus, votes: 93 }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                    <Badge className="mb-4 bg-yellow-500 text-black">Coming Soon</Badge>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{feature.votes + Math.floor(Math.random() * 10)}</div>
                    <p className="text-sm text-gray-600 mb-4">votes to unlock</p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleVote(feature.name)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Vote to Unlock
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inspiration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Daily Business Tip</h3>
                  <p className="text-lg mb-6">
                    "Send follow-up texts 24 hours after appointments to increase client retention by 40%"
                  </p>
                  <Button className="bg-white text-rose-600 hover:bg-white/90">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Crown className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Motivational Quote</h3>
                  <p className="text-lg italic mb-6">
                    "Success in beauty is not just about talent, it's about creating experiences that make people feel amazing."
                  </p>
                  <Button className="bg-white text-purple-600 hover:bg-white/90">
                    <Heart className="h-4 w-4 mr-2" />
                    Share Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Sticky Footer */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button size="sm" className="flex flex-col gap-1 h-auto py-2">
              <Plus className="h-4 w-4" />
              <span className="text-xs">Book</span>
            </Button>
            <Button size="sm" variant="outline" className="flex flex-col gap-1 h-auto py-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Pay</span>
            </Button>
            <Button size="sm" variant="outline" className="flex flex-col gap-1 h-auto py-2">
              <Gift className="h-4 w-4" />
              <span className="text-xs">Refer</span>
            </Button>
            <Button size="sm" variant="outline" className="flex flex-col gap-1 h-auto py-2">
              <Settings className="h-4 w-4" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>

        {/* Desktop Sidebar Placeholder */}
        <div className="hidden md:block fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 z-40">
          <Button size="sm" className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700">
            <Plus className="h-5 w-5" />
          </Button>
          <Button size="sm" variant="outline" className="w-12 h-12 rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button size="sm" variant="outline" className="w-12 h-12 rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
