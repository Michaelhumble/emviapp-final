
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Share2, 
  Copy, 
  Eye, 
  Plus, 
  Building2, 
  TrendingUp, 
  CreditCard, 
  Crown, 
  Calendar, 
  Users, 
  MessageSquare, 
  Star, 
  Zap,
  Lock,
  ExternalLink,
  Settings,
  BarChart3,
  Heart,
  Brain,
  Sparkles,
  Target
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import Logo from '@/components/ui/Logo';

const SalonOwnerDashboard = () => {
  const { userProfile } = useAuth();
  const [copiedLink, setCopiedLink] = useState(false);
  
  const salonName = userProfile?.salon_name || "Your Salon";
  const salonSlug = userProfile?.salon_name?.toLowerCase().replace(/\s+/g, '-') || 'your-salon';
  const profileLink = `https://emvi.app/salon/${salonSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileLink);
    setCopiedLink(true);
    toast.success("Profile link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mock data for demo
  const todaysBookings = [
    { name: "Sarah Chen", service: "Hair Cut & Style", staff: "Anna", status: "confirmed", time: "10:00 AM" },
    { name: "Jessica Park", service: "Nail Art", staff: "Sophia", status: "pending", time: "11:30 AM" },
    { name: "Emily Rodriguez", service: "Facial Treatment", staff: "David", status: "confirmed", time: "2:00 PM" },
    { name: "Ashley Kim", service: "Hair Color", staff: "Anna", status: "completed", time: "9:00 AM" }
  ];

  const teamMembers = [
    { name: "Anna Chen", role: "Senior Stylist", rating: 4.9, avatar: "/placeholder-avatar.jpg" },
    { name: "Sophia Lee", role: "Nail Technician", rating: 4.8, avatar: "/placeholder-avatar.jpg" },
    { name: "David Park", role: "Esthetician", rating: 4.7, avatar: "/placeholder-avatar.jpg" }
  ];

  const revolutionaryFeatures = [
    { title: "AI Assistant", description: "Smart salon management", votes: 234, icon: Brain },
    { title: "Smart Analytics", description: "Revenue insights", votes: 189, icon: BarChart3 },
    { title: "Auto Marketing", description: "Social media automation", votes: 156, icon: Target },
    { title: "Loyalty Engine", description: "Customer retention", votes: 143, icon: Heart },
    { title: "Premium CRM", description: "Client management", votes: 98, icon: Users }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* 1. Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <Logo size="medium" showText={true} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {salonName}! ☀️
            </h1>
            <p className="text-gray-600 text-lg">
              Your business. Your future. All in one place.
            </p>
          </motion.div>

          {/* 2. Share & Viral Growth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Share2 className="h-6 w-6" />
                  Share Your Salon Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-100">
                  Share your salon profile to attract talent and new customers!
                </p>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm font-mono text-purple-100">{profileLink}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleCopyLink}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedLink ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button size="sm" variant="secondary" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Preview Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center gap-1">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Post a Job</span>
              </Button>
              <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center gap-1">
                <Building2 className="h-5 w-5" />
                <span className="text-xs">Post Your Salon</span>
              </Button>
              <Button 
                className="h-16 bg-gray-400 cursor-not-allowed flex flex-col items-center gap-1"
                disabled
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Boost Listing</span>
                <span className="text-[10px] text-gray-300">Coming Soon</span>
              </Button>
              <Button className="h-16 bg-orange-600 hover:bg-orange-700 flex flex-col items-center gap-1">
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Buy Credits</span>
              </Button>
              <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center gap-1">
                <Crown className="h-5 w-5" />
                <span className="text-xs">Upgrade to Pro</span>
              </Button>
            </div>
          </motion.div>

          {/* 4. Performance & Credit Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">450</div>
                  <div className="text-sm text-purple-100">Credits</div>
                  <Button size="sm" variant="secondary" className="mt-2 text-xs">
                    Purchase Credits
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                  <div className="text-xs text-green-600">+12% this week</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-gray-600">New Applicants</div>
                  <div className="text-xs text-green-600">+8 today</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">156</div>
                  <div className="text-sm text-gray-600">Active Bookings</div>
                  <div className="text-xs text-blue-600">Next: 10:00 AM</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                    4.8 <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div className="text-sm text-gray-600">Team Rating</div>
                  <div className="text-xs text-green-600">Excellent!</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* 5. Today's Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Bookings
                    </span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Booking
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todaysBookings.map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{booking.name}</div>
                          <div className="text-sm text-gray-600">{booking.service} • {booking.staff}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{booking.time}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 7. Messages & Internal Chat */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-500">
                    <MessageSquare className="h-5 w-5" />
                    Salon Chat & Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 opacity-50">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
                      <div>
                        <div className="font-medium text-sm">Anna Chen</div>
                        <div className="text-sm text-gray-600">Ready for the 2 PM appointment with Emily!</div>
                        <div className="text-xs text-gray-400">Just now</div>
                      </div>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                      Advanced team messaging coming soon...
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 9. Advanced Calendar */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-5 w-5" />
                    Advanced Calendar & Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 opacity-50">
                    <div className="text-sm text-gray-600">• Smart scheduling optimization</div>
                    <div className="text-sm text-gray-600">• Automated reminder system</div>
                    <div className="text-sm text-gray-600">• Multi-staff calendar sync</div>
                    <div className="text-sm text-gray-600">• Client preference tracking</div>
                    <Button size="sm" variant="outline" disabled className="mt-3">
                      <Lock className="h-4 w-4 mr-1" />
                      Preview Features
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* 6. Team & Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team & Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        Write Team Review
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Invite Team Member
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8. Service Management */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-500">
                    <Settings className="h-5 w-5" />
                    AI Service Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 opacity-50">
                    <div className="text-sm text-gray-600">• Smart scheduling optimization</div>
                    <div className="text-sm text-gray-600">• Dynamic price optimization</div>
                    <div className="text-sm text-gray-600">• Service recommendation engine</div>
                    <div className="text-sm text-gray-600">• Resource allocation AI</div>
                  </div>
                </CardContent>
              </Card>

              {/* 11. Your Recent Listings/Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Your Recent Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">Senior Hair Stylist Position</div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Posted 3 days ago • 12 applicants</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View/Edit</Button>
                        <Button size="sm" variant="outline">Share</Button>
                        <Button size="sm" variant="outline" disabled>
                          Boost <span className="text-xs ml-1">(Coming Soon)</span>
                        </Button>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Post New Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 10. Revolutionary Features & Upgrades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  Revolutionary Features & Upgrades
                </CardTitle>
                <p className="text-center text-gray-600">Vote for features you want to see next!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {revolutionaryFeatures.map((feature, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm text-gray-600">{feature.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{feature.votes} votes</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          Notify Me
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 12. Trust & Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <blockquote className="text-lg italic text-gray-700 mb-2">
                    "EmviApp transformed how we manage our salon. We've hired 3 amazing stylists and our bookings increased 40%!"
                  </blockquote>
                  <cite className="text-sm text-gray-600">— Maria Santos, Luxe Beauty Salon</cite>
                </div>
                <Button variant="outline" className="flex items-center gap-2 mx-auto">
                  <MessageSquare className="h-4 w-4" />
                  Need help? Contact EmviApp Support
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 13. Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-sm text-gray-500"
          >
            <p>Inspired by Sunshine ☀️ | EmviApp</p>
            <p className="mt-1">Version 2.1.0 • Built with ❤️ for salon owners</p>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
};

export default SalonOwnerDashboard;
