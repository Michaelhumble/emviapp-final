
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  Share, 
  Plus,
  Eye,
  TrendingUp,
  MessageSquare,
  Settings,
  BarChart3,
  MapPin,
  Clock,
  Award,
  Heart,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

const OwnerDashboard = () => {
  const { userProfile } = useAuth();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareDashboard = async () => {
    const salonLink = `https://emviapp.com/salon/${userProfile?.salon_name?.toLowerCase().replace(/\s+/g, '-') || 'your-salon'}`;
    try {
      await navigator.clipboard.writeText(salonLink);
      setCopiedLink(true);
      toast.success('Salon page link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const ComingSoonBadge = () => (
    <Badge 
      variant="secondary" 
      className="bg-[#F6F6F7] text-[#8A898C] border-[#ECECEC] text-xs font-medium px-2 py-1"
    >
      Coming Soon
    </Badge>
  );

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      {/* Hero Section */}
      <div 
        className="relative px-6 py-12 text-white"
        style={{ background: 'linear-gradient(90deg, #8743FF 0%, #FF8CFF 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {userProfile?.salon_name || 'Your Salon'}
              </h1>
              <p className="text-white/90 text-lg">
                Manage your salon, track performance, and grow your business
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleShareDashboard}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white"
              >
                {copiedLink ? <Copy className="w-4 h-4 mr-2" /> : <Share className="w-4 h-4 mr-2" />}
                {copiedLink ? 'Copied!' : 'Share Salon'}
              </Button>
              <Button className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-[#ECECEC] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm font-medium">Total Bookings</p>
                  <p className="text-2xl font-bold text-[#8743FF]">127</p>
                  <p className="text-xs text-[#555555]">+12% this month</p>
                </div>
                <Calendar className="w-8 h-8 text-[#8743FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-[#8743FF]">$12,450</p>
                  <p className="text-xs text-[#555555]">+8% this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#8743FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm font-medium">Active Artists</p>
                  <p className="text-2xl font-bold text-[#8743FF]">8</p>
                  <p className="text-xs text-[#555555]">2 new this month</p>
                </div>
                <Users className="w-8 h-8 text-[#8743FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm font-medium">Rating</p>
                  <p className="text-2xl font-bold text-[#FFB800]">4.8</p>
                  <p className="text-xs text-[#555555]">Based on 124 reviews</p>
                </div>
                <Star className="w-8 h-8 text-[#FFB800]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Bookings */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Recent Bookings</CardTitle>
                <Button variant="outline" size="sm" className="border-[#ECECEC]">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#F6F6F7] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#8743FF] rounded-full flex items-center justify-center text-white font-semibold">
                          C{i}
                        </div>
                        <div>
                          <p className="font-medium text-[#1A1A1A]">Client {i}</p>
                          <p className="text-sm text-[#555555]">Nail Art & Manicure</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1A1A1A]">$85</p>
                        <p className="text-sm text-[#555555]">Today 2:30 PM</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Artist Performance */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Artist Performance</CardTitle>
                <ComingSoonBadge />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Sarah Johnson', 'Maria Garcia', 'Ashley Chen'].map((name, i) => (
                    <div key={name} className="flex items-center justify-between p-4 bg-[#F6F6F7] rounded-lg opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#8A898C] rounded-full flex items-center justify-center text-white font-semibold">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-[#8A898C]">{name}</p>
                          <p className="text-sm text-[#8A898C]">Nail Technician</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#8A898C]">${(1200 + i * 300).toLocaleString()}</p>
                        <p className="text-sm text-[#8A898C]">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Recent Posts</CardTitle>
                <Button 
                  className="bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] hover:from-[#6F3AFF] hover:to-[#FF8CFF] text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F6F6F7] rounded-lg">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-8 h-8 text-[#8743FF] mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1A1A] mb-2">
                          ✨ New nail art designs just dropped! Check out our latest spring collection...
                        </p>
                        <div className="flex items-center gap-4 text-sm text-[#555555]">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            24 likes
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            5 comments
                          </span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-[#8A898C]">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Share your salon's latest work and updates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1A1A1A]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] hover:from-[#6F3AFF] hover:to-[#FF8CFF] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Artist
                </Button>
                <Button variant="outline" className="w-full justify-start border-[#ECECEC]">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start border-[#ECECEC]">
                  <Settings className="w-4 h-4 mr-2" />
                  Salon Settings
                </Button>
              </CardContent>
            </Card>

            {/* Analytics Preview */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold text-[#1A1A1A]">Analytics</CardTitle>
                <ComingSoonBadge />
              </CardHeader>
              <CardContent>
                <div className="space-y-4 opacity-60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#8A898C]" />
                      <span className="text-sm text-[#8A898C]">Weekly Growth</span>
                    </div>
                    <span className="text-sm font-medium text-[#8A898C]">+15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#8A898C]" />
                      <span className="text-sm text-[#8A898C]">Peak Hours</span>
                    </div>
                    <span className="text-sm font-medium text-[#8A898C]">2-4 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8A898C]" />
                      <span className="text-sm text-[#8A898C]">Top Location</span>
                    </div>
                    <span className="text-sm font-medium text-[#8A898C]">Downtown</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-white border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1A1A1A]">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-[#FFB800] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">New Review</p>
                        <p className="text-xs text-[#555555]">5-star review from Sarah M.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#8743FF]/10 border border-[#8743FF]/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#8743FF] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">Booking Alert</p>
                        <p className="text-xs text-[#555555]">3 new bookings today</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#F6F6F7] border border-[#ECECEC] rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#555555] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">Reminder</p>
                        <p className="text-xs text-[#555555]">Update service menu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
