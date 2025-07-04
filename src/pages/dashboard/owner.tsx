
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building2, Calendar, Copy, ExternalLink, Eye, MessageSquare, Plus, Share2, Star, Users, Zap, Clock, Trophy, Target, Sparkles, Bell, Settings, BarChart3, TrendingUp, Heart, Gift, Crown, Lightbulb, Rocket, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const SalonOwner = () => {
  const { userProfile } = useAuth();
  const [copiedLink, setCopiedLink] = useState(false);
  
  const salonName = userProfile?.business_name || userProfile?.full_name || 'Your Salon';
  const publicSalonLink = `https://emviapp.com/salon/${userProfile?.id || 'your-salon'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicSalonLink);
      setCopiedLink(true);
      toast.success('Salon profile link copied!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShareDashboard = async () => {
    try {
      await navigator.clipboard.writeText(publicSalonLink);
      toast.success('Dashboard link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy dashboard link');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      {/* Header Section */}
      <div 
        className="relative px-4 py-8 mb-6"
        style={{ background: 'linear-gradient(90deg, #8743FF 0%, #FF8CFF 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {salonName}!
              </h1>
              <p className="text-white/80 text-lg">
                Your business. Your future. All in one place.
              </p>
            </div>
            <Button
              onClick={handleShareDashboard}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Share & Viral Growth */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <ExternalLink className="h-5 w-5 mr-2 text-[#8743FF]" />
              Share Your Salon Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#555555]">
                Share your salon profile to attract talent and new customers!
              </p>
              <div className="flex items-center space-x-2 p-3 bg-[#F6F6F7] rounded-lg">
                <code className="flex-1 text-sm text-[#1A1A1A] font-mono">
                  {publicSalonLink}
                </code>
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  className="bg-[#6F3AFF] hover:bg-[#8743FF]"
                >
                  {copiedLink ? 'Copied!' : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-[#8743FF] text-[#8743FF] hover:bg-[#8743FF] hover:text-white"
                >
                  <Link to={`/salon/${userProfile?.id}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Profile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button
                asChild
                className="h-20 flex-col"
                style={{ background: 'linear-gradient(90deg, #8743FF 0%, #FF8CFF 100%)' }}
              >
                <Link to="/post-job">
                  <Briefcase className="h-6 w-6 mb-2" />
                  Post a Job
                </Link>
              </Button>
              <Button
                asChild
                className="h-20 flex-col"
                style={{ background: 'linear-gradient(90deg, #8743FF 0%, #FF8CFF 100%)' }}
              >
                <Link to="/sell-salon">
                  <Building2 className="h-6 w-6 mb-2" />
                  Post Your Salon
                </Link>
              </Button>
              <Button
                disabled
                className="h-20 flex-col bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                <Zap className="h-6 w-6 mb-2" />
                Boost My Listing
                <Badge className="mt-1 bg-[#FFB800] text-white text-xs">Coming Soon</Badge>
              </Button>
              <Button
                className="h-20 flex-col bg-[#6F3AFF] hover:bg-[#8743FF]"
              >
                <Plus className="h-6 w-6 mb-2" />
                Buy Credits
              </Button>
              <Button
                className="h-20 flex-col bg-[#6F3AFF] hover:bg-[#8743FF]"
              >
                <Crown className="h-6 w-6 mb-2" />
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Credit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-[#ECECEC] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm">Credit Balance</p>
                  <p className="text-2xl font-bold text-[#8743FF]">250</p>
                </div>
                <Plus className="h-8 w-8 text-[#FFB800]" />
              </div>
              <Button size="sm" className="w-full mt-3 bg-[#6F3AFF] hover:bg-[#8743FF]">
                Purchase Credits
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-[#8743FF]">1,247</p>
                </div>
                <Eye className="h-8 w-8 text-[#FFB800]" />
              </div>
              <p className="text-xs text-green-600 mt-2">+12% this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm">New Applicants</p>
                  <p className="text-2xl font-bold text-[#8743FF]">8</p>
                </div>
                <Users className="h-8 w-8 text-[#FFB800]" />
              </div>
              <p className="text-xs text-green-600 mt-2">+3 today</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#ECECEC] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#555555] text-sm">Team Rating</p>
                  <p className="text-2xl font-bold text-[#8743FF]">4.8</p>
                </div>
                <Star className="h-8 w-8 text-[#FFB800]" />
              </div>
              <p className="text-xs text-[#555555] mt-2">Based on 42 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Bookings */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#8743FF]" />
              Today's Bookings
            </CardTitle>
            <Button size="sm" className="bg-[#6F3AFF] hover:bg-[#8743FF]">
              <Plus className="h-4 w-4 mr-2" />
              Add Booking
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F6F6F7] rounded-lg">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Sarah Johnson - Haircut & Color</p>
                  <p className="text-sm text-[#555555]">with Maria • 10:00 AM</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F6F6F7] rounded-lg">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Emily Chen - Manicure</p>
                  <p className="text-sm text-[#555555]">with Lisa • 2:30 PM</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F6F6F7] rounded-lg">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Jessica Martinez - Facial</p>
                  <p className="text-sm text-[#555555]">with Anna • 4:00 PM</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team & Reviews */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#8743FF]" />
              Team & Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-[#F6F6F7] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Maria Rodriguez</p>
                    <p className="text-sm text-[#555555]">Senior Stylist</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#FFB800] fill-current" />
                      <span className="text-sm text-[#555555] ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#F6F6F7] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-full flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Lisa Chang</p>
                    <p className="text-sm text-[#555555]">Nail Technician</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#FFB800] fill-current" />
                      <span className="text-sm text-[#555555] ml-1">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#F6F6F7] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8743FF] to-[#FF8CFF] rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Anna Kim</p>
                    <p className="text-sm text-[#555555]">Esthetician</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#FFB800] fill-current" />
                      <span className="text-sm text-[#555555] ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                disabled
                variant="outline" 
                className="border-gray-300 text-gray-400 cursor-not-allowed"
              >
                Write Team Review
                <Badge className="ml-2 bg-[#FFB800] text-white text-xs">Coming Soon</Badge>
              </Button>
              <Button className="bg-[#6F3AFF] hover:bg-[#8743FF]">
                <Plus className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages & Internal Chat */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-[#8743FF]" />
              Salon Chat & Messages
              <Badge className="ml-3 bg-[#FFB800] text-white">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-[#F6F6F7] rounded-lg opacity-60">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#555555]">Maria: "Can someone cover my 3 PM appointment?"</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#555555]">Lisa: "I can take it! Moving my break."</p>
                    <p className="text-xs text-gray-400">1 minute ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Management */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Settings className="h-5 w-5 mr-2 text-[#8743FF]" />
              AI Service Management
              <Badge className="ml-3 bg-[#FFB800] text-white">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="opacity-60">
              <p className="text-[#555555] mb-4">Revolutionary AI-powered features coming to your salon:</p>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-[#8743FF]" />
                  Smart scheduling optimization
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-[#8743FF]" />
                  Dynamic price optimization
                </li>
                <li className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-[#8743FF]" />
                  Customer preference learning
                </li>
                <li className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#8743FF]" />
                  Performance analytics
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Calendar */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#8743FF]" />
              Advanced Calendar & Reminders
              <Badge className="ml-3 bg-[#FFB800] text-white">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="opacity-60">
              <p className="text-[#555555] mb-4">Next-generation scheduling system with:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-[#8743FF]" />
                  <span className="text-sm text-[#555555]">Smart reminders</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#8743FF]" />
                  <span className="text-sm text-[#555555]">Time optimization</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-[#8743FF]" />
                  <span className="text-sm text-[#555555]">Team coordination</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-[#8743FF]" />
                  <span className="text-sm text-[#555555]">Goal tracking</span>
                </div>
              </div>
              <Button 
                disabled
                className="mt-4 bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                Preview Features
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revolutionary Features & Upgrades */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Rocket className="h-5 w-5 mr-2 text-[#8743FF]" />
              Revolutionary Features & Upgrades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">AI Assistant</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Personal AI for business optimization</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
              
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">Smart Analytics</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Deep insights into your business</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
              
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">Auto Marketing</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Automated social media & ads</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
              
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <Heart className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">Loyalty Engine</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Automated customer retention</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
              
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <Gift className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">Reward System</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Gamified employee incentives</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
              
              <div className="p-4 bg-[#F6F6F7] rounded-lg border border-[#ECECEC]">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-[#8743FF] mr-2" />
                  <h3 className="font-medium text-[#1A1A1A]">Business Insurance</h3>
                </div>
                <p className="text-sm text-[#555555] mb-3">Integrated protection plans</p>
                <Button size="sm" variant="outline" className="border-[#8743FF] text-[#8743FF]">
                  Notify Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-[#8743FF]" />
              Your Recent Listings/Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-[#ECECEC] rounded-lg p-4">
                <h3 className="font-medium text-[#1A1A1A] mb-2">My Job Posts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#F6F6F7] rounded">
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Senior Hair Stylist Position</p>
                      <p className="text-sm text-[#555555]">Posted 3 days ago • 12 applications</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View/Edit</Button>
                      <Button size="sm" className="bg-[#6F3AFF] hover:bg-[#8743FF]">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F6F6F7] rounded">
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Part-time Receptionist</p>
                      <p className="text-sm text-[#555555]">Posted 1 week ago • 8 applications</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View/Edit</Button>
                      <Button size="sm" className="bg-[#6F3AFF] hover:bg-[#8743FF]">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#ECECEC] rounded-lg p-4">
                <h3 className="font-medium text-[#1A1A1A] mb-2">My Salon Listings</h3>
                <p className="text-sm text-[#555555] mb-3">No active salon listings</p>
                <Button 
                  disabled
                  size="sm" 
                  className="bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  Quick Promote
                  <Badge className="ml-2 bg-[#FFB800] text-white text-xs">Coming Soon</Badge>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust & Community */}
        <Card className="bg-white border-[#ECECEC] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] text-xl font-bold flex items-center">
              <Heart className="h-5 w-5 mr-2 text-[#8743FF]" />
              Trust & Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gradient-to-r from-[#8743FF]/10 to-[#FF8CFF]/10 rounded-lg border border-[#ECECEC]">
              <blockquote className="text-[#1A1A1A] italic mb-4">
                "EmviApp has transformed our salon operations. We've hired 3 amazing stylists through the platform and our bookings have increased by 40%!"
              </blockquote>
              <p className="text-sm text-[#555555]">— Sarah M., Luxe Beauty Salon, Los Angeles</p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="border-[#8743FF] text-[#8743FF]">
                <MessageSquare className="h-4 w-4 mr-2" />
                Need help? Contact EmviApp Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t border-[#ECECEC]">
          <p className="text-sm text-[#555555]">
            Inspired by Sunshine ☀️ | EmviApp
          </p>
          <p className="text-xs text-gray-400 mt-1">Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default SalonOwner;
