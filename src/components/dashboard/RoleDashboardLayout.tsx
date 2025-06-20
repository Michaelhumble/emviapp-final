
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Eye, 
  CreditCard, 
  MessageSquare,
  Star,
  Heart,
  Sparkles,
  Crown,
  Zap,
  Bell,
  Vote,
  Plus,
  ArrowRight,
  Target,
  Palette,
  Shield,
  Clock,
  Gift
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  role?: "salon" | "artist" | "customer" | "freelancer" | "supplier" | "manager";
  headerContent?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({
  children,
  role = "salon",
  headerContent
}) => {
  const { toast } = useToast();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  // Revolutionary features for FOMO
  const revolutionaryFeatures = [
    { id: 1, title: "AI Assistant", icon: Sparkles, description: "Smart booking optimization", votes: 1247 },
    { id: 2, title: "VR Consultations", icon: Eye, description: "Virtual style previews", votes: 892 },
    { id: 3, title: "Smart Analytics", icon: TrendingUp, description: "Predictive insights", votes: 1456 },
    { id: 4, title: "Auto Marketing", icon: Target, description: "AI-powered campaigns", votes: 743 },
    { id: 5, title: "Premium CRM", icon: Crown, description: "Client relationship mastery", votes: 1189 },
    { id: 6, title: "Dynamic Pricing", icon: Zap, description: "Revenue optimization", votes: 667 },
    { id: 7, title: "Style Generator", icon: Palette, description: "AI trend predictions", votes: 934 },
    { id: 8, title: "Security Suite", icon: Shield, description: "Advanced protection", votes: 512 },
    { id: 9, title: "Time Master", icon: Clock, description: "Smart scheduling", votes: 876 },
    { id: 10, title: "Loyalty Engine", icon: Gift, description: "Customer retention", votes: 1023 }
  ];

  // Demo stats data
  const salonStats = [
    { label: "New Applicants", value: "24", change: "+12%", icon: Users, color: "from-blue-500 to-purple-600" },
    { label: "Profile Views", value: "2,847", change: "+23%", icon: Eye, color: "from-green-500 to-emerald-600" },
    { label: "Active Bookings", value: "156", change: "+8%", icon: Calendar, color: "from-orange-500 to-red-600" },
    { label: "Monthly Growth", value: "34%", change: "+5%", icon: TrendingUp, color: "from-pink-500 to-rose-600" },
    { label: "Credit Balance", value: "450", change: "+15", icon: CreditCard, color: "from-violet-500 to-purple-600" },
    { label: "Team Rating", value: "4.9", change: "+0.2", icon: Star, color: "from-yellow-500 to-amber-600" }
  ];

  // Demo bookings data
  const demoBookings = [
    { id: 1, client: "Sarah Chen", service: "Hair Color", time: "10:00 AM", status: "confirmed", artist: "Maria" },
    { id: 2, client: "Jessica Park", service: "Manicure", time: "11:30 AM", status: "pending", artist: "Anna" },
    { id: 3, client: "Emily Rodriguez", service: "Facial", time: "2:00 PM", status: "confirmed", artist: "Sophia" },
    { id: 4, client: "Ashley Kim", service: "Massage", time: "3:30 PM", status: "completed", artist: "David" }
  ];

  // Demo team data
  const demoTeam = [
    { name: "Maria Santos", role: "Senior Stylist", avatar: "MS", rating: 4.9, isEmployeeOfMonth: true },
    { name: "Anna Chen", role: "Nail Technician", avatar: "AC", rating: 4.8, isEmployeeOfMonth: false },
    { name: "Sophia Lee", role: "Esthetician", avatar: "SL", rating: 4.7, isEmployeeOfMonth: false },
    { name: "David Park", role: "Massage Therapist", avatar: "DP", rating: 4.9, isEmployeeOfMonth: false }
  ];

  const handleFeatureVote = (featureId: number, featureTitle: string) => {
    toast({
      title: "Vote Recorded! 🗳️",
      description: `Thank you for voting for ${featureTitle}! We'll notify you when it's ready.`,
      variant: "success"
    });
  };

  const handleNotifyMe = (featureTitle: string) => {
    toast({
      title: "Notification Set! 🔔",
      description: `You'll be the first to know when ${featureTitle} launches!`,
      variant: "success"
    });
  };

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon! ✨",
      description: `${feature} is in development. Stay tuned for updates!`,
      variant: "info"
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-inter"
    >
      {/* Premium Animated Header */}
      <motion.div 
        variants={itemVariants}
        className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              Welcome back, <span className="text-yellow-300">Luxe Salon!</span>
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Your future starts here. ✨ Build something extraordinary.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Revolutionary Features FOMO Gallery */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
              Revolutionary Features Coming Soon
            </h2>
            <p className="text-gray-600">Vote for your favorites and be the first to experience the future</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {revolutionaryFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-4 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFeatureVote(feature.id, feature.title)}
                        className="text-xs"
                      >
                        <Vote className="h-3 w-3 mr-1" />
                        Vote ({feature.votes})
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleNotifyMe(feature.title)}
                        className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Stats Row */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Salon Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {salonStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <CardContent className="p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bookings & Calendar Preview */}
        <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Today's Bookings
              </CardTitle>
              <Button size="sm" onClick={() => handleComingSoon("Add Booking")}>
                <Plus className="h-4 w-4 mr-1" />
                Add Booking
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">{booking.client}</p>
                      <p className="text-sm text-gray-600">{booking.service} • {booking.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.time}</p>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'outline'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                Calendar Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">Advanced calendar features coming soon!</p>
                <Button variant="outline" onClick={() => handleComingSoon("Calendar Overview")}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* My Team & Recognition */}
        <motion.section variants={itemVariants}>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                My Team & Recognition
              </CardTitle>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Employee Recognition
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {demoTeam.map((member) => (
                      <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold mr-3">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{member.rating}</span>
                          {member.isEmployeeOfMonth && (
                            <Badge className="ml-2 bg-gradient-to-r from-yellow-500 to-orange-500">
                              <Crown className="h-3 w-3 mr-1" />
                              EOTM
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 mx-auto text-pink-300 mb-4" />
                  <h3 className="font-semibold mb-2">Team Reviews</h3>
                  <p className="text-gray-600 mb-4">Write and manage team reviews</p>
                  <Button variant="outline" onClick={() => handleComingSoon("Team Reviews")}>
                    <Star className="h-4 w-4 mr-2" />
                    Write Review (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Service Management */}
        <motion.section variants={itemVariants}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-purple-600" />
                Service Management
                <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 mx-auto text-purple-300 mb-4" />
                <h3 className="font-semibold mb-2">Advanced Service Management</h3>
                <p className="text-gray-600 mb-4">Manage your services with AI-powered pricing and scheduling</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => handleFeatureVote(11, "Service Management")}>
                    <Vote className="h-4 w-4 mr-2" />
                    Vote for Priority
                  </Button>
                  <Button onClick={() => handleNotifyMe("Service Management")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Get Notified
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Credit Balance & Pro Plan */}
        <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Credit Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">450 Credits</p>
                <p className="opacity-90 mb-4">Available for premium features</p>
                <Button variant="secondary" onClick={() => handleComingSoon("Credit Purchase")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Purchase Credits
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700 mb-2">Unlock Everything</p>
                <p className="text-gray-600 mb-4">Get access to all premium features</p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" onClick={() => handleComingSoon("Pro Upgrade")}>
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Messages & Internal Chat */}
        <motion.section variants={itemVariants}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Messages & Internal Chat
                <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto text-blue-300 mb-4" />
                <h3 className="font-semibold mb-2">Advanced Communication Hub</h3>
                <p className="text-gray-600 mb-4">Team chat, client messages, and automated notifications</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => handleFeatureVote(12, "Communication Hub")}>
                    <Vote className="h-4 w-4 mr-2" />
                    Vote to Prioritize
                  </Button>
                  <Button onClick={() => handleNotifyMe("Communication Hub")}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

      </div>
    </motion.div>
  );
};

export default RoleDashboardLayout;
