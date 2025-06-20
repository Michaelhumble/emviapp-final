
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Star, 
  Clock, 
  DollarSign, 
  Target, 
  Award, 
  MessageSquare, 
  Settings,
  Plus,
  Eye,
  Zap,
  Brain,
  Headphones,
  BarChart3,
  Mail,
  UserPlus,
  CheckCircle,
  Heart,
  Crown,
  Sparkles
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({ children }) => {
  const { toast } = useToast();
  const [currentSalonName] = useState("Milano Nail Spa"); // Demo salon name

  const handleFeatureClick = (featureName: string, isLive: boolean = false) => {
    if (isLive) {
      toast({
        title: `${featureName} Launched!`,
        description: "This feature is now available for your salon.",
        variant: "default"
      });
    } else {
      toast({
        title: "Coming Soon!",
        description: `Thanks for your interest in ${featureName}. We'll notify you when it's ready!`,
        variant: "default"
      });
    }
  };

  const handleVoteFeature = (featureName: string) => {
    toast({
      title: "Vote Recorded!",
      description: `Your vote for ${featureName} has been counted. We'll prioritize based on demand!`,
      variant: "success"
    });
  };

  const handleNotifyMe = (featureName: string) => {
    toast({
      title: "Notification Set!",
      description: `We'll notify you as soon as ${featureName} is available.`,
      variant: "info"
    });
  };

  const handleAddBooking = () => {
    toast({
      title: "Add Booking",
      description: "Booking system coming soon! For now, manage bookings manually.",
      variant: "default"
    });
  };

  const handleInviteTeam = () => {
    toast({
      title: "Invite Sent!",
      description: "Team invitation feature is being prepared. Check back soon!",
      variant: "success"
    });
  };

  const liveFeatures = [
    { icon: Zap, name: "Instant Bookings", description: "Accept bookings 24/7" },
    { icon: Brain, name: "AI-Optimized Scheduling", description: "Smart appointment optimization" },
    { icon: Award, name: "Team Leaderboard", description: "Motivate your staff" },
    { icon: BarChart3, name: "Pro Analytics", description: "Advanced insights & metrics" },
    { icon: DollarSign, name: "Instant Payouts", description: "Get paid immediately" },
    { icon: Crown, name: "VIP Client Profiles", description: "Premium client management" },
    { icon: Calendar, name: "Live Availability Sync", description: "Real-time scheduling" },
    { icon: Target, name: "Smart Marketing", description: "Automated customer outreach" }
  ];

  const comingSoonFeatures = [
    { icon: Brain, name: "AI Business Coach", description: "Personal growth advisor" },
    { icon: Headphones, name: "VR Consultations", description: "Virtual beauty sessions" },
    { icon: BarChart3, name: "Smart Analytics", description: "Predictive business insights" },
    { icon: Mail, name: "Auto Marketing", description: "Intelligent campaign management" },
    { icon: Users, name: "Premium CRM", description: "Advanced client relationships" },
    { icon: Star, name: "Social Media Manager", description: "Automated content creation" },
    { icon: Sparkles, name: "Beauty AI Assistant", description: "Personalized recommendations" },
    { icon: TrendingUp, name: "Revenue Optimizer", description: "Maximize your earnings" },
    { icon: Settings, name: "Custom Integrations", description: "Connect your favorite tools" },
    { icon: Heart, name: "Client Loyalty Engine", description: "Automated retention system" }
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "Senior Nail Artist", badge: "Employee of the Month", badgeColor: "bg-yellow-500" },
    { name: "Maria Rodriguez", role: "Nail Technician", badge: "Rising Star", badgeColor: "bg-purple-500" },
    { name: "Jennifer Kim", role: "Receptionist", badge: "Client Favorite", badgeColor: "bg-pink-500" },
    { name: "Lisa Wong", role: "Nail Artist", badge: "Team Player", badgeColor: "bg-blue-500" }
  ];

  const todayBookings = [
    { name: "Emma Thompson", service: "Gel Manicure", time: "9:00 AM", status: "Confirmed" },
    { name: "David Kim", service: "Pedicure", time: "10:30 AM", status: "In Progress" },
    { name: "Sofia Martinez", service: "Nail Art", time: "2:00 PM", status: "Confirmed" },
    { name: "James Wilson", service: "Basic Manicure", time: "3:30 PM", status: "Pending" },
    { name: "Anna Lee", service: "Gel Polish", time: "5:00 PM", status: "Confirmed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* 1. Animated Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Welcome back, {currentSalonName}! 
            </h1>
            <p className="text-2xl opacity-90 animate-fade-in">
              Your billion-dollar future starts here ✨
            </p>
          </div>
        </div>

        {/* 2. Billion-Dollar Features (LIVE) Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            Billion-Dollar Features
            <Badge className="bg-green-500 text-white">LIVE</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-2 border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-8 w-8 text-green-600" />
                    <Badge className="bg-green-500 text-white text-xs">LIVE</Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <Button 
                    onClick={() => handleFeatureClick(feature.name, true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 3. Revolutionary "Coming Soon" Features Gallery */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Star className="text-purple-500" />
            Revolutionary Features Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {comingSoonFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-2 border-purple-200 bg-purple-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                    <Badge className="bg-purple-500 text-white text-xs">COMING SOON</Badge>
                  </div>
                  <CardTitle className="text-sm">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 mb-3">{feature.description}</p>
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleVoteFeature(feature.name)}
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Vote
                    </Button>
                    <Button 
                      onClick={() => handleNotifyMe(feature.name)}
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. Success Metrics / Quick Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-500" />
            Success Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Active Applicants", value: "47", icon: Users, color: "blue" },
              { label: "Profile Views", value: "1,247", icon: Eye, color: "green" },
              { label: "This Week's Bookings", value: "89", icon: Calendar, color: "purple" },
              { label: "Growth Score", value: "94%", icon: TrendingUp, color: "yellow" },
              { label: "Credit Balance", value: "$2,450", icon: DollarSign, color: "emerald" },
              { label: "Team Rating", value: "4.9★", icon: Star, color: "pink" }
            ].map((metric, index) => (
              <Card key={index} className="text-center p-4">
                <metric.icon className={`h-8 w-8 mx-auto mb-2 text-${metric.color}-500`} />
                <div className={`text-2xl font-bold text-${metric.color}-600 mb-1`}>{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Dream Team & Employee Recognition */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="text-indigo-500" />
            My Dream Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                <Badge className={`${member.badgeColor} text-white`}>
                  {member.badge}
                </Badge>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={handleInviteTeam}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
          </div>
        </div>

        {/* 6. Messages & Internal Chat */}
        <div className="mb-8">
          <Card className="p-6 border-2 border-orange-200 bg-orange-50">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-orange-500" />
              <h3 className="text-2xl font-bold mb-2">Messages & Internal Chat</h3>
              <Badge className="bg-orange-500 text-white mb-4">COMING SOON</Badge>
              <p className="text-gray-600 mb-4">
                Seamless communication with your team and clients
              </p>
              <Button 
                onClick={() => handleVoteFeature("Messages & Internal Chat")}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Vote for Priority Access
              </Button>
            </div>
          </Card>
        </div>

        {/* 7. Service Management */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Settings className="text-teal-500" />
            Service Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="text-teal-500" />
                Service Catalog
              </h3>
              <p className="text-gray-600 mb-4">Manage your service offerings</p>
              <Button 
                onClick={() => handleFeatureClick("Service Catalog")}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Manage Services
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="text-teal-500" />
                Pricing Optimizer
              </h3>
              <p className="text-gray-600 mb-4">AI-powered pricing recommendations</p>
              <Button 
                onClick={() => handleVoteFeature("Pricing Optimizer")}
                variant="outline"
                className="border-teal-500 text-teal-600 hover:bg-teal-50"
              >
                Vote for This Feature
              </Button>
            </Card>
          </div>
        </div>

        {/* 8. Bookings Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="text-rose-500" />
            Today's Bookings
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              {todayBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold">{booking.name}</div>
                    <div className="text-sm text-gray-600">{booking.service}</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">{booking.time}</div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={
                        booking.status === 'Confirmed' ? 'bg-green-500' :
                        booking.status === 'In Progress' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                onClick={handleAddBooking}
                className="bg-rose-600 hover:bg-rose-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </Card>
        </div>

        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
