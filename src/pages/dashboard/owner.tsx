
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Share2,
  Plus,
  Eye,
  MessageCircle,
  DollarSign,
  Clock,
  Award,
  Camera,
  Settings,
  BarChart3,
  Target
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const SalonOwnerDashboard = () => {
  const { userProfile } = useAuth();

  const handleShareDashboard = () => {
    const salonUrl = `${window.location.origin}/salon/${userProfile?.id}`;
    navigator.clipboard.writeText(salonUrl);
    toast.success('Salon link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] text-white p-8 rounded-b-3xl"
        style={{ background: 'linear-gradient(90deg, #8743FF 0%, #FF8CFF 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {userProfile?.salon_name || 'Salon Owner'}! 👋
              </h1>
              <p className="text-lg opacity-90">
                Your beauty empire awaits. Let's grow together today.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleShareDashboard}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outline"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Dashboard
              </Button>
              <Button className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#555555] text-sm font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-[#1A1A1A]">127</p>
                <p className="text-green-600 text-sm">+12% this month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#555555] text-sm font-medium">Team Members</p>
                <p className="text-2xl font-bold text-[#1A1A1A]">8</p>
                <p className="text-blue-600 text-sm">2 new this week</p>
              </div>
              <div className="p-3 bg-[#6F3AFF] rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#555555] text-sm font-medium">Revenue</p>
                <p className="text-2xl font-bold text-[#1A1A1A]">$24,580</p>
                <p className="text-green-600 text-sm">+18% this month</p>
              </div>
              <div className="p-3 bg-[#FFB800] rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#555555] text-sm font-medium">Rating</p>
                <p className="text-2xl font-bold text-[#1A1A1A]">4.9</p>
                <p className="text-green-600 text-sm">+0.2 this month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bookings */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Bookings</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="flex items-center justify-between p-4 bg-[#F6F6F7] rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">Sarah Johnson</p>
                          <p className="text-[#555555] text-sm">Hair Cut & Color</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1A1A1A]">Today 2:30 PM</p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Team Performance */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Team Performance</h2>
                  <Badge className="bg-[#F6F6F7] text-[#8A898C]">Coming Soon</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F6F6F7] rounded-xl opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-[#8A898C]">Jessica Martinez</p>
                        <p className="text-[#8A898C] text-sm">Top Performer</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F6F6F7] rounded-xl opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-[#8A898C]">Michael Chen</p>
                        <p className="text-[#8A898C] text-sm">Rising Star</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Posts */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Posts</h2>
                  <Button 
                    className="bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] text-white hover:opacity-90"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-[#F6F6F7] rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-xl flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A]">New Hair Transformation</p>
                      <p className="text-[#555555] text-sm">Posted 2 hours ago</p>
                    </div>
                    <div className="flex items-center space-x-4 text-[#555555]">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">127</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">23</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] text-white hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Service
                  </Button>
                  <Button className="w-full bg-[#6F3AFF] text-white hover:bg-[#6F3AFF]/90">
                    <Users className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                  <Button className="w-full bg-[#FFB800] text-black hover:bg-[#FFB800]/90">
                    <Star className="h-4 w-4 mr-2" />
                    Boost Profile
                  </Button>
                </div>
              </div>
            </Card>

            {/* Salon Profile */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Salon Profile</h2>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-[#8743FF]" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Location</p>
                      <p className="text-[#555555] text-sm">{userProfile?.location || 'Not set'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#8743FF]" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Phone</p>
                      <p className="text-[#555555] text-sm">{userProfile?.phone || 'Not set'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#8743FF]" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Hours</p>
                      <p className="text-[#555555] text-sm">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Analytics Preview */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Analytics</h2>
                  <Badge className="bg-[#F6F6F7] text-[#8A898C]">Coming Soon</Badge>
                </div>
                
                <div className="space-y-4 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A898C]">Profile Views</span>
                    <span className="font-semibold text-[#8A898C]">342</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A898C]">Booking Rate</span>
                    <span className="font-semibold text-[#8A898C]">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A898C]">Customer Retention</span>
                    <span className="font-semibold text-[#8A898C]">92%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Goals & Achievements */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Goals</h2>
                  <Target className="h-5 w-5 text-[#FFB800]" />
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-[#8743FF]/10 to-[#FF8CFF]/10 rounded-xl border border-[#8743FF]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1A1A1A]">Monthly Revenue</span>
                      <Award className="h-4 w-4 text-[#FFB800]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">82%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[#FFB800]/10 rounded-xl border border-[#FFB800]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1A1A1A]">New Clients</span>
                      <TrendingUp className="h-4 w-4 text-[#FFB800]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#FFB800] h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
