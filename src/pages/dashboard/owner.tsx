
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Copy, 
  Eye, 
  Users, 
  Calendar, 
  Star, 
  Plus, 
  CreditCard, 
  Crown,
  MessageSquare,
  Settings,
  Briefcase,
  Building2,
  TrendingUp,
  Clock,
  UserPlus,
  Zap,
  Bell,
  Heart,
  Award,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const SalonOwnerDashboard = () => {
  const { userProfile } = useAuth();
  const salonName = userProfile?.salon_name || 'Your Salon';
  
  // Mock data for demo purposes
  const salonSlug = salonName.toLowerCase().replace(/\s+/g, '-');
  const publicSalonUrl = `https://emvi.app/salon/${salonSlug}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicSalonUrl);
    toast.success('Salon profile link copied to clipboard!');
  };

  const handleNotifyMe = (feature: string) => {
    toast.success(`You'll be notified when ${feature} launches!`);
  };

  const todayBookings = [
    { id: 1, name: 'Sarah Chen', service: 'Manicure & Pedicure', staff: 'Anna', status: 'confirmed' },
    { id: 2, name: 'Jessica Park', service: 'Full Set Nails', staff: 'Sophia', status: 'pending' },
    { id: 3, name: 'Emily Rodriguez', service: 'Nail Art', staff: 'David', status: 'completed' },
    { id: 4, name: 'Ashley Kim', service: 'Gel Manicure', staff: 'Anna', status: 'confirmed' }
  ];

  const teamMembers = [
    { id: 1, name: 'Anna Chen', role: 'Senior Nail Tech', rating: 4.9 },
    { id: 2, name: 'Sophia Lee', role: 'Nail Artist', rating: 4.8 },
    { id: 3, name: 'David Park', role: 'Manicurist', rating: 4.7 }
  ];

  const futureFeatures = [
    { name: 'AI Assistant', description: 'Smart booking & customer service', votes: 342 },
    { name: 'Smart Analytics', description: 'Revenue insights & predictions', votes: 298 },
    { name: 'Auto Marketing', description: 'Automated social media & ads', votes: 275 },
    { name: 'Loyalty Engine', description: 'Customer retention system', votes: 203 },
    { name: 'VR Consultations', description: 'Virtual nail design previews', votes: 189 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Logo size="medium" showText={true} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-playfair text-gray-900">
              Welcome back, {salonName}! ☀️
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Your business. Your future. All in one place.
            </p>
          </div>
        </div>

        {/* Share & Viral Growth */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Share2 className="h-6 w-6 text-purple-600" />
              Share Your Salon Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-700 font-medium">
              Share your salon profile to attract talent and new customers!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex-1 bg-white p-3 rounded-lg border text-sm font-mono text-gray-600">
                {publicSalonUrl}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCopyLink} className="bg-purple-600 hover:bg-purple-700">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/salon/${salonSlug}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Profile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button asChild className="h-16 bg-blue-600 hover:bg-blue-700">
            <Link to="/post-job">
              <div className="text-center">
                <Briefcase className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Post a Job</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16 border-orange-200 hover:bg-orange-50">
            <Link to="/sell-salon">
              <div className="text-center">
                <Building2 className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Post Your Salon</span>
              </div>
            </Link>
          </Button>
          <Button disabled className="h-16 bg-gray-200 text-gray-500 cursor-not-allowed">
            <div className="text-center">
              <Zap className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Boost Listing</span>
              <Badge variant="secondary" className="text-xs mt-1">Coming Soon</Badge>
            </div>
          </Button>
          <Button variant="outline" className="h-16 border-green-200 hover:bg-green-50">
            <div className="text-center">
              <CreditCard className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Buy Credits</span>
            </div>
          </Button>
          <Button className="h-16 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
            <div className="text-center">
              <Crown className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Upgrade to Pro</span>
            </div>
          </Button>
        </div>

        {/* Performance & Credit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Credit Balance</p>
                  <p className="text-2xl font-bold">450</p>
                  <Button size="sm" className="mt-2 bg-white text-purple-600 hover:bg-gray-100">
                    Purchase Credits
                  </Button>
                </div>
                <CreditCard className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-blue-600">2,847</p>
                  <p className="text-green-600 text-sm">+12% this week</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">New Applicants</p>
                  <p className="text-2xl font-bold text-green-600">24</p>
                  <p className="text-green-600 text-sm">+8 this week</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Bookings</p>
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-green-600 text-sm">+5% today</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Team Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">4.8</p>
                  <p className="text-green-600 text-sm">Top rated!</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Bookings
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.service} • {booking.staff}</p>
                  </div>
                  <Badge 
                    variant={booking.status === 'confirmed' ? 'default' : 
                            booking.status === 'completed' ? 'secondary' : 'outline'}
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{member.rating}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Team Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-600 mb-3">Write and manage team reviews</p>
                  <Button disabled className="bg-gray-200 text-gray-500">
                    Write Review
                    <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages & Internal Chat */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <MessageSquare className="h-5 w-5" />
              Salon Chat & Messages
              <Badge variant="secondary">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 space-y-3">
              <div className="bg-white p-4 rounded-lg border-dashed border border-gray-300">
                <p className="text-gray-500 italic">"Hey team, don't forget our staff meeting at 3 PM!"</p>
                <p className="text-xs text-gray-400 mt-2">Preview message (demo only)</p>
              </div>
              <p className="text-gray-600">Internal team chat and customer messaging coming soon!</p>
            </div>
          </CardContent>
        </Card>

        {/* Service Management */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Settings className="h-5 w-5" />
              AI Service Management
              <Badge variant="secondary">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-600">Advanced service management with AI-powered features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
                <li>Smart scheduling optimization</li>
                <li>Dynamic price recommendations</li>
                <li>Service popularity analytics</li>
                <li>Automated service descriptions</li>
                <li>Customer preference matching</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Calendar */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              Advanced Calendar & Reminders
              <Badge variant="secondary">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 space-y-4">
              <div className="grid grid-cols-7 gap-1 max-w-xs mx-auto">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs text-gray-400">
                    {i + 1}
                  </div>
                ))}
              </ul>
              <p className="text-gray-600">Smart calendar with automated reminders and scheduling</p>
              <Button disabled variant="outline" className="text-gray-500">
                Preview Features
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revolutionary Features & Upgrades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Revolutionary Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {futureFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{feature.votes} votes</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleNotifyMe(feature.name)}
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Recent Listings/Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Recent Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  My Job Posts
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border">
                    <p className="font-medium text-sm">Senior Nail Technician - Full Time</p>
                    <p className="text-xs text-gray-600">Posted 3 days ago • 12 applicants</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">View/Edit</Button>
                      <Button size="sm" variant="ghost">Share</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/post-job">Post New Job</Link>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  My Salon Listings
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-orange-50 rounded-lg border text-center">
                    <p className="text-sm text-gray-600 mb-2">No active salon listings</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/sell-salon">List Your Salon</Link>
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button disabled size="sm" variant="ghost" className="text-gray-500">
                      Boost Listing
                      <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust & Community */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Heart className="h-8 w-8 text-green-600 mx-auto" />
              <blockquote className="text-lg italic text-green-800">
                "EmviApp helped me find the perfect team and grow my salon business by 300% in just 6 months!"
              </blockquote>
              <p className="text-sm text-green-600">— Maria S., Luxury Nails & Spa</p>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                Need help? Contact EmviApp Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Inspired by Sunshine ☀️ | EmviApp
          </p>
          <p className="text-xs text-gray-400 mt-1">
            v2.1.0 • Built with love for salon owners
          </p>
        </div>

      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
